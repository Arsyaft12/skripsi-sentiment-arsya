# backend/main.py
from fastapi import FastAPI, HTTPException, UploadFile, File
import csv
import io
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import joblib
import datetime
import json
import os
from dataset import muat_dataset, ambil_sampel
from preprocessing import bersihkan_teks, preprocessing_dengan_detail
from database import init_db, simpan_riwayat, ambil_riwayat, ambil_statistik, hapus_semua

app = FastAPI(
    title='Sentiment Analysis API',
    description='API klasifikasi sentimen ulasan e-commerce',
    version='2.0.0'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=False,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Inisialisasi database
init_db()

# Load model
model_nb  = joblib.load('model_naive_bayes.pkl')
model_svm = joblib.load('model_svm.pkl')
print('Model berhasil dimuat!')

# Load dataset
print('Memuat dataset...')
DATA = muat_dataset()
print('Dataset siap!')

class InputUlasan(BaseModel):
    teks: str
    model: str = 'svm'

# ─── ENDPOINT UTAMA ─────────────────────────────────────

@app.get('/')
def root():
    return {'status': 'API berjalan!', 'versi': '2.0.0'}

# ─── ENDPOINT DATASET ───────────────────────────────────

@app.get('/dataset/info')
def info_dataset():
    train = DATA['train']
    test  = DATA['test']
    return {
        'total_train': len(train),
        'total_test':  len(test),
        'total_data':  len(train) + len(test),
        'distribusi_train': {
            'positif': sum(1 for d in train if d['label'] == 1),
            'negatif': sum(1 for d in train if d['label'] == 0),
        },
        'distribusi_test': {
            'positif': sum(1 for d in test if d['label'] == 1),
            'negatif': sum(1 for d in test if d['label'] == 0),
        },
        'sumber': 'sepidmnorozy/Indonesian_sentiment (Hugging Face)'
    }

@app.get('/dataset/sampel')
def sampel_dataset(jumlah: int = 10, label: Optional[str] = None):
    sampel = ambil_sampel(DATA, jumlah=jumlah, label=label)
    return {'total': len(sampel), 'data': sampel}

# ─── ENDPOINT PREPROCESSING ─────────────────────────────

@app.post('/preprocessing/detail')
def preprocessing_detail(input: InputUlasan):
    detail = preprocessing_dengan_detail(input.teks)
    return {
        'teks_asli':            detail['teks_asli'],
        'step1_lowercase':      detail['step1_lower'],
        'step2_hapus_karakter': detail['step2_karakter'],
        'step3_hapus_stopword': detail['step3_stopword'],
        'step4_stemming':       detail['step4_stemming'],
        'hasil_akhir':          detail['step4_stemming']
    }

# ─── ENDPOINT PREDIKSI ──────────────────────────────────

@app.post('/prediksi')
def prediksi_sentimen(input: InputUlasan):
    if not input.teks.strip():
        raise HTTPException(status_code=400,
                           detail='Teks tidak boleh kosong!')

    detail      = preprocessing_dengan_detail(input.teks)
    teks_bersih = detail['step4_stemming']

    if input.model == 'naive_bayes':
        model      = model_nb
        nama_model = 'Naive Bayes'
    else:
        model      = model_svm
        nama_model = 'SVM'

    hasil     = model.predict([teks_bersih])[0]
    label_map = {0: 'negatif', 1: 'positif'}
    sentimen  = label_map.get(int(hasil), str(hasil))
    waktu     = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    data = {
        'teks_asli':       input.teks,
        'teks_bersih':     teks_bersih,
        'sentimen':        sentimen,
        'model_digunakan': nama_model,
        'waktu':           waktu,
        'preprocessing': {
            'step1': detail['step1_lower'],
            'step2': detail['step2_karakter'],
            'step3': detail['step3_stopword'],
            'step4': detail['step4_stemming'],
        }
    }

    # Simpan ke database permanen
    simpan_riwayat(data)
    return data

@app.post('/prediksi-batch')
def prediksi_batch(teks_list: List[str], model: str = 'svm'):
    hasil_list = []
    for teks in teks_list:
        hasil = prediksi_sentimen(InputUlasan(teks=teks, model=model))
        hasil_list.append(hasil)
    positif = sum(1 for h in hasil_list if h['sentimen'] == 'positif')
    negatif = sum(1 for h in hasil_list if h['sentimen'] == 'negatif')
    return {
        'total':   len(hasil_list),
        'positif': positif,
        'negatif': negatif,
        'hasil':   hasil_list
    }

# ─── ENDPOINT DATABASE ──────────────────────────────────

@app.get('/riwayat')
def lihat_riwayat(limit: int = 50):
    data = ambil_riwayat(limit)
    return {'total': len(data), 'data': data}

@app.get('/statistik')
def statistik():
    return ambil_statistik()

@app.delete('/riwayat/hapus')
def hapus_riwayat():
    hapus_semua()
    return {'pesan': 'Semua riwayat berhasil dihapus!'}

# ─── ENDPOINT UPLOAD CSV ────────────────────────────────
@app.post('/upload-csv')
async def upload_csv(
    file: UploadFile = File(...),
    model: str = 'svm'
):
    """Upload file CSV berisi banyak ulasan sekaligus"""

    # Validasi file harus .csv
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400,
                           detail='File harus berformat .csv!')

    # Baca isi file
    isi = await file.read()
    decoded = isi.decode('utf-8', errors='ignore')

    # Parse CSV
    reader = csv.DictReader(io.StringIO(decoded))
    kolom  = reader.fieldnames

    # Cari kolom teks otomatis
    kolom_teks = None
    for kemungkinan in ['text', 'teks', 'ulasan', 'review',
                        'content', 'comment', 'komentar']:
        if kolom and kemungkinan in [k.lower() for k in kolom]:
            kolom_teks = next(
                k for k in kolom if k.lower() == kemungkinan
            )
            break

    # Kalau tidak ketemu, pakai kolom pertama
    if not kolom_teks and kolom:
        kolom_teks = kolom[0]

    if not kolom_teks:
        raise HTTPException(status_code=400,
                           detail='Tidak ada kolom teks ditemukan!')

    # Proses setiap baris
    hasil_list = []
    error_list = []

    for i, baris in enumerate(reader):
        teks = baris.get(kolom_teks, '').strip()
        if not teks:
            continue

        try:
            hasil = prediksi_sentimen(
                InputUlasan(teks=teks, model=model)
            )
            hasil_list.append(hasil)
        except Exception as e:
            error_list.append({'baris': i+2, 'error': str(e)})

    if not hasil_list:
        raise HTTPException(status_code=400,
                           detail='Tidak ada data valid di CSV!')

    # Hitung statistik
    positif = sum(1 for h in hasil_list if h['sentimen'] == 'positif')
    negatif = sum(1 for h in hasil_list if h['sentimen'] == 'negatif')
    total   = len(hasil_list)

    return {
        'nama_file':      file.filename,
        'kolom_digunakan': kolom_teks,
        'total_diproses': total,
        'total_error':    len(error_list),
        'positif':        positif,
        'negatif':        negatif,
        'persen_positif': round(positif/total*100, 1),
        'persen_negatif': round(negatif/total*100, 1),
        'hasil':          hasil_list,
        'errors':         error_list
    }

# ─── ENDPOINT UPLOAD CSV EKSTERNAL ──────────────────────
# Cara 1: CSV dari luar (ulasan baru dari Shopee/Tokopedia)

@app.post('/upload-csv')
async def upload_csv(
    file: UploadFile = File(...),
    model: str = 'svm'
):
    """Upload CSV eksternal berisi ulasan baru"""
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400,
                           detail='File harus .csv!')

    isi      = await file.read()
    decoded  = isi.decode('utf-8', errors='ignore')
    reader   = csv.DictReader(io.StringIO(decoded))
    kolom    = reader.fieldnames

    # Cari kolom teks otomatis
    kolom_teks = None
    for kemungkinan in ['text', 'teks', 'ulasan', 'review',
                        'content', 'comment', 'komentar']:
        if kolom and kemungkinan in [k.lower() for k in kolom]:
            kolom_teks = next(
                k for k in kolom if k.lower() == kemungkinan
            )
            break
    if not kolom_teks and kolom:
        kolom_teks = kolom[0]
    if not kolom_teks:
        raise HTTPException(status_code=400,
                           detail='Kolom teks tidak ditemukan!')

    hasil_list = []
    for i, baris in enumerate(reader):
        teks = baris.get(kolom_teks, '').strip()
        if not teks:
            continue
        try:
            hasil = prediksi_sentimen(
                InputUlasan(teks=teks, model=model)
            )
            hasil_list.append(hasil)
        except Exception as e:
            continue

    if not hasil_list:
        raise HTTPException(status_code=400,
                           detail='Tidak ada data valid!')

    positif = sum(1 for h in hasil_list if h['sentimen'] == 'positif')
    negatif = sum(1 for h in hasil_list if h['sentimen'] == 'negatif')
    total   = len(hasil_list)

    return {
        'tipe':            'csv_eksternal',
        'nama_file':       file.filename,
        'kolom_digunakan': kolom_teks,
        'total_diproses':  total,
        'positif':         positif,
        'negatif':         negatif,
        'persen_positif':  round(positif/total*100, 1),
        'persen_negatif':  round(negatif/total*100, 1),
        'hasil':           hasil_list
    }

# ─── ENDPOINT UPLOAD CSV HASIL TRAINING ─────────────────
# Cara 2: Upload hasil_dataset_lengkap.csv ke database

@app.post('/upload-csv-training')
async def upload_csv_training(
    file: UploadFile = File(...)
):
    """Upload CSV hasil training model ke database"""
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400,
                           detail='File harus .csv!')

    isi     = await file.read()
    decoded = isi.decode('utf-8-sig', errors='ignore')
    reader  = csv.DictReader(io.StringIO(decoded))

    berhasil = 0
    gagal    = 0

    for baris in reader:
        try:
            # Ambil data dari CSV hasil training
            teks       = baris.get('text', '').strip()
            teks_bersih = baris.get('teks_bersih', '').strip()
            sentimen   = baris.get('prediksi_svm', '').strip()

            if not teks or not sentimen:
                gagal += 1
                continue

            import datetime
            data = {
                'teks_asli':       teks,
                'teks_bersih':     teks_bersih,
                'sentimen':        sentimen,
                'model_digunakan': 'SVM (Training)',
                'waktu': datetime.datetime.now().strftime(
                    '%Y-%m-%d %H:%M:%S'
                ),
                'preprocessing': {
                    'step1': teks.lower(),
                    'step2': teks_bersih,
                    'step3': teks_bersih,
                    'step4': teks_bersih,
                }
            }
            simpan_riwayat(data)
            berhasil += 1

        except Exception as e:
            gagal += 1
            continue

    stat = ambil_statistik()

    return {
        'tipe':              'csv_training',
        'nama_file':         file.filename,
        'total_berhasil':    berhasil,
        'total_gagal':       gagal,
        'statistik_database': stat
    }
# ─── ENDPOINT EVALUASI ──────────────────────────────────

@app.get('/evaluasi')
def hasil_evaluasi():
    if os.path.exists('hasil_evaluasi.json'):
        with open('hasil_evaluasi.json', 'r') as f:
            return json.load(f)
    return {'pesan': 'Jalankan train_model.py dulu!'}