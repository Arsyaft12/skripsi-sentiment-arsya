# backend/main.py — versi lama yang sudah jalan
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import joblib
import datetime
import json
import os
import csv
import io
import requests
from dotenv import load_dotenv
from dataset import muat_dataset, ambil_sampel
from preprocessing import bersihkan_teks, preprocessing_dengan_detail
from database import init_db, simpan_riwayat, ambil_riwayat, ambil_statistik, hapus_semua

load_dotenv()  # baca file .env di folder backend untuk ambil GEMINI_API_KEY

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

# Inisialisasi
init_db()
model_nb  = joblib.load('model_naive_bayes.pkl')
model_svm = joblib.load('model_svm.pkl')
print('Model berhasil dimuat!')

print('Memuat dataset...')
DATA = muat_dataset()
print('Dataset siap!')

class InputUlasan(BaseModel):
    teks: str
    model: str = 'svm'

class InputPertanyaan(BaseModel):
    pertanyaan: str

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

# ─── ENDPOINT UTAMA ─────────────────────────────────────

@app.get('/')
def root():
    return {'status': 'API berjalan!', 'versi': '2.0.0'}

# ─── DATASET ────────────────────────────────────────────

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

# ─── PREPROCESSING ──────────────────────────────────────

@app.post('/preprocessing/detail')
def preprocessing_detail(input: InputUlasan):
    detail = preprocessing_dengan_detail(input.teks)
    return {
        'teks_asli':            detail['teks_asli'],
        'step1_lowercase':      detail['step1_lower'],
        'step2_hapus_karakter': detail['step2_karakter'],
        'step3_hapus_stopword': detail['step3_stopword'],
        'step4_stemming':       detail['step4_stemming'],
        'hasil_akhir':          detail['step4_stemming'],
        'preprocessing': {
            'step1': detail['step1_lower'],
            'step2': detail['step2_karakter'],
            'step3': detail['step3_stopword'],
            'step4': detail['step4_stemming'],
        }
    }

# ─── PREDIKSI ───────────────────────────────────────────

@app.post('/prediksi')
def prediksi_sentimen(input: InputUlasan):
    if not input.teks.strip():
        raise HTTPException(status_code=400, detail='Teks tidak boleh kosong!')

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
    simpan_riwayat(data)
    return data

# ─── UPLOAD CSV ─────────────────────────────────────────

# Batas baris CSV eksternal yang diproses sekaligus (jaga performa & response size)
MAKS_BARIS_CSV_EKSTERNAL = 500

@app.post('/upload-csv')
async def upload_csv(file: UploadFile = File(...), model: str = 'svm'):
    """
    Upload CSV eksternal (BUKAN dataset Hugging Face) untuk dianalisis sentimennya.
    Setiap baris diproses lewat pipeline yang SAMA dengan analisis manual:
    preprocessing 4 tahap -> representasi TF-IDF (di dalam Pipeline model) -> prediksi model
    terlatih (NB/SVM) -> hasil disimpan permanen ke SQLite -> insight dikembalikan ke frontend.
    """
    if not file.filename or not file.filename.lower().endswith('.csv'):
        raise HTTPException(status_code=400, detail='File harus berformat .csv!')

    if model not in ('svm', 'naive_bayes'):
        raise HTTPException(status_code=400, detail="Parameter model harus 'svm' atau 'naive_bayes'!")

    isi = await file.read()
    if not isi:
        raise HTTPException(status_code=400, detail='File CSV kosong!')

    try:
        decoded = isi.decode('utf-8-sig', errors='ignore')
    except Exception:
        raise HTTPException(status_code=400, detail='File CSV tidak dapat dibaca (encoding tidak valid)!')

    reader = csv.DictReader(io.StringIO(decoded))
    kolom  = reader.fieldnames or []

    if not kolom:
        raise HTTPException(status_code=400, detail='CSV tidak memiliki header kolom!')

    kolom_teks = None
    for kandidat in ['text', 'teks', 'ulasan', 'review', 'content', 'comment', 'komentar']:
        matches = [k for k in kolom if k.lower().strip() == kandidat]
        if matches:
            kolom_teks = matches[0]
            break
    if not kolom_teks:
        kolom_teks = kolom[0]

    nama_mdl  = 'Naive Bayes' if model == 'naive_bayes' else 'SVM'
    mdl       = model_nb if model == 'naive_bayes' else model_svm
    label_map = {0: 'negatif', 1: 'positif'}

    hasil_list     = []
    baris_dilewati = 0

    for baris in reader:
        if len(hasil_list) >= MAKS_BARIS_CSV_EKSTERNAL:
            break

        teks = (baris.get(kolom_teks) or '').strip()
        if not teks:
            baris_dilewati += 1
            continue

        try:
            # 1) Preprocessing 4 tahap (sama seperti endpoint /prediksi)
            detail      = preprocessing_dengan_detail(teks)
            teks_bersih = detail['step4_stemming']

            # 2) Representasi fitur (TF-IDF) + prediksi model terlatih (di dalam Pipeline)
            hasil    = mdl.predict([teks_bersih])[0]
            sentimen = label_map.get(int(hasil), str(hasil))
            waktu    = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            data = {
                'teks_asli':       teks,
                'teks_bersih':     teks_bersih,
                'sentimen':        sentimen,
                'model_digunakan': nama_mdl,
                'waktu':           waktu,
                'sumber':          'csv_eksternal',
                'preprocessing': {
                    'step1': detail['step1_lower'],
                    'step2': detail['step2_karakter'],
                    'step3': detail['step3_stopword'],
                    'step4': detail['step4_stemming'],
                }
            }
            # 3) Simpan permanen ke SQLite (riwayat_analisis), sama seperti prediksi manual
            simpan_riwayat(data)
            hasil_list.append(data)
        except Exception:
            baris_dilewati += 1
            continue

    if not hasil_list:
        raise HTTPException(
            status_code=400,
            detail='Tidak ada baris valid dalam CSV (cek kolom teks dan isi datanya)!'
        )

    positif = sum(1 for h in hasil_list if h['sentimen'] == 'positif')
    negatif = sum(1 for h in hasil_list if h['sentimen'] == 'negatif')
    total   = len(hasil_list)

    return {
        'tipe':               'csv_eksternal',
        'nama_file':          file.filename,
        'model_digunakan':    nama_mdl,
        'kolom_digunakan':    kolom_teks,
        'total_baris_csv':    total + baris_dilewati,
        'total_diproses':     total,
        'baris_dilewati':     baris_dilewati,
        'batas_baris':        MAKS_BARIS_CSV_EKSTERNAL,
        'positif':            positif,
        'negatif':            negatif,
        'persen_positif':     round(positif / total * 100, 1) if total else 0,
        'persen_negatif':     round(negatif / total * 100, 1) if total else 0,
        'hasil':              hasil_list,
        'statistik_database': ambil_statistik(),
    }

@app.post('/upload-csv-training')
async def upload_csv_training(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail='File harus .csv!')

    isi     = await file.read()
    decoded = isi.decode('utf-8-sig', errors='ignore')
    reader  = csv.DictReader(io.StringIO(decoded))

    berhasil = 0
    gagal    = 0
    for baris in reader:
        try:
            teks_asli   = (baris.get('text', '') or '').strip()
            teks_bersih = (baris.get('teks_bersih', '') or '').strip()
            sentimen    = (baris.get('prediksi_svm', '') or '').strip()
            if not teks_asli or not sentimen:
                gagal += 1
                continue
            simpan_riwayat({
                'teks_asli': teks_asli, 'teks_bersih': teks_bersih,
                'sentimen': sentimen, 'model_digunakan': 'SVM (Training)',
                'waktu': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'preprocessing': {'step1': '', 'step2': '', 'step3': '', 'step4': teks_bersih},
            })
            berhasil += 1
        except Exception:
            gagal += 1

    return {
        'tipe': 'csv_training',
        'nama_file': file.filename,
        'total_berhasil': berhasil,
        'total_gagal': gagal,
        'statistik_database': ambil_statistik(),
    }

# ─── RIWAYAT & STATISTIK ────────────────────────────────

@app.get('/riwayat')
def lihat_riwayat(limit: int = 50):
    data = ambil_riwayat(limit)
    return {'total': len(data), 'data': data}

@app.delete('/riwayat/hapus')
def hapus_riwayat():
    hapus_semua()
    return {'pesan': 'Semua riwayat berhasil dihapus!'}

@app.get('/statistik')
def statistik():
    return ambil_statistik()

# ─── EVALUASI ───────────────────────────────────────────

@app.get('/evaluasi')
def hasil_evaluasi():
    if os.path.exists('hasil_evaluasi.json'):
        with open('hasil_evaluasi.json', 'r') as f:
            return json.load(f)
    return {'pesan': 'Jalankan train_model.py terlebih dahulu!'}

# ─── INSIGHT AI (Gemini) ─────────────────────────────────

@app.post('/insight/ask')
def insight_ask(input: InputPertanyaan):
    """
    Kolom search di halaman Insight. Pertanyaan pengguna dijawab oleh Gemini API,
    dengan konteks data ASLI dari sistem (statistik riwayat & hasil evaluasi model)
    disisipkan ke prompt, supaya jawaban selalu mengacu pada data yang sebenarnya,
    bukan karangan model.
    """
    pertanyaan = input.pertanyaan.strip()
    if not pertanyaan:
        raise HTTPException(status_code=400, detail='Pertanyaan tidak boleh kosong!')

    if not GEMINI_API_KEY:
        raise HTTPException(
            status_code=500,
            detail='GEMINI_API_KEY belum diatur di file .env backend!'
        )

    stat = ambil_statistik()
    eval_data = {}
    if os.path.exists('hasil_evaluasi.json'):
        with open('hasil_evaluasi.json', 'r') as f:
            eval_data = json.load(f)

    konteks = f"""Kamu adalah asisten analitik untuk sebuah dashboard analisis sentimen ulasan e-commerce.
Jawab pertanyaan pengguna HANYA berdasarkan data berikut, dengan bahasa Indonesia yang singkat, jelas, dan profesional (maksimal 4 kalimat):

DATA STATISTIK RIWAYAT ANALISIS:
- Total ulasan dianalisis: {stat.get('total', 0)}
- Ulasan positif: {stat.get('positif', 0)} ({stat.get('persen_positif', 0)}%)
- Ulasan negatif: {stat.get('negatif', 0)} ({stat.get('persen_negatif', 0)}%)

DATA EVALUASI MODEL:
- Naive Bayes -> akurasi {eval_data.get('naive_bayes', {}).get('akurasi', 'N/A')}%, precision {eval_data.get('naive_bayes', {}).get('precision', 'N/A')}%, recall {eval_data.get('naive_bayes', {}).get('recall', 'N/A')}%, F1-score {eval_data.get('naive_bayes', {}).get('f1_score', 'N/A')}%
- SVM -> akurasi {eval_data.get('svm', {}).get('akurasi', 'N/A')}%, precision {eval_data.get('svm', {}).get('precision', 'N/A')}%, recall {eval_data.get('svm', {}).get('recall', 'N/A')}%, F1-score {eval_data.get('svm', {}).get('f1_score', 'N/A')}%
- Model terbaik: {eval_data.get('model_terbaik', 'N/A')}

Jika pertanyaan pengguna tidak berkaitan dengan data di atas, jawab dengan sopan bahwa kamu hanya bisa menjawab seputar data analisis sentimen ini.

PERTANYAAN PENGGUNA: {pertanyaan}"""

    try:
        resp = requests.post(
            f'{GEMINI_URL}?key={GEMINI_API_KEY}',
            json={'contents': [{'parts': [{'text': konteks}]}]},
            timeout=20,
        )
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=502, detail='Gagal terhubung ke layanan Gemini AI!')

    if resp.status_code != 200:
        raise HTTPException(
            status_code=502,
            detail=f'Gemini API error ({resp.status_code}): {resp.text[:200]}'
        )

    hasil = resp.json()
    try:
        jawaban = hasil['candidates'][0]['content']['parts'][0]['text'].strip()
    except (KeyError, IndexError):
        raise HTTPException(status_code=502, detail='Format respons Gemini tidak sesuai harapan!')

    return {
        'pertanyaan': pertanyaan,
        'jawaban': jawaban,
        'konteks_digunakan': {
            'total_ulasan': stat.get('total', 0),
            'model_terbaik': eval_data.get('model_terbaik', 'N/A'),
        },
    }