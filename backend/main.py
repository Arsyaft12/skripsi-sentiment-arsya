# backend/main.py — Update dengan fitur baru:
# 1. Confidence Score per prediksi
# 2. Perbandingan real-time NB vs SVM
# 3. Sentiment Trend Timeline
# 5. Smart Recommendation Engine

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
import json
import urllib.request
import numpy as np
from collections import Counter
from dataset import muat_dataset, ambil_sampel
from preprocessing import bersihkan_teks, preprocessing_dengan_detail
from database import init_db, simpan_riwayat, ambil_riwayat, ambil_statistik, hapus_semua

app = FastAPI(
    title='Sentiment Analysis API',
    description='API klasifikasi sentimen ulasan e-commerce — dengan Confidence Score, Dual Model, Trend & Smart Recommendation',
    version='3.0.0'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=False,
    allow_methods=['*'],
    allow_headers=['*'],
)

# ─── INISIALISASI ────────────────────────────────────────
init_db()
model_nb  = joblib.load('model_naive_bayes.pkl')
model_svm = joblib.load('model_svm.pkl')
print('✓ Model berhasil dimuat!')

print('✓ Memuat dataset...')
DATA = muat_dataset()
print('✓ Dataset siap!')

# ─── SCHEMA ──────────────────────────────────────────────
class InputUlasan(BaseModel):
    teks: str
    model: str = 'svm'

class InputDualModel(BaseModel):
    teks: str

class InsightChatInput(BaseModel):
    question: str
    context: Optional[dict] = None


def _load_gemini_api_key() -> Optional[str]:
    api_key = os.getenv('GEMINI_API_KEY')
    if api_key:
        return api_key

    env_path = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line.startswith('GEMINI_API_KEY='):
                    return line.split('=', 1)[1].strip().strip('"').strip("'")
    return None


GEMINI_API_KEY = _load_gemini_api_key()


def _build_insight_prompt(question: str, context: Optional[dict]) -> str:
    context = context or {}
    stats = context.get('stats') or {}
    eval_data = context.get('eval_') or context.get('evaluasi') or {}
    rek = context.get('rek') or context.get('rekomendasi') or {}

    total = stats.get('total') or 0
    positif = stats.get('positif') or 0
    negatif = stats.get('negatif') or 0
    ratio = round((positif / total) * 100, 1) if total else 0
    svm = eval_data.get('svm') or {}
    nb = eval_data.get('naive_bayes') or {}
    rekomendasi = rek.get('rekomendasi') or []
    ringkasan = rek.get('ringkasan') or ''

    insight_block = f"""
Data insight yang tersedia:
- Total ulasan: {total}
- Positif: {positif}
- Negatif: {negatif}
- Persentase positif: {ratio}%
- Akurasi SVM: {svm.get('akurasi', 'tidak tersedia')}%
- Akurasi Naive Bayes: {nb.get('akurasi', 'tidak tersedia')}%
- Rekomendasi sistem: {json.dumps(rekomendasi[:3], ensure_ascii=False)}
- Ringkasan rekomendasi: {ringkasan}
"""

    return f"""
Kamu adalah asisten AI yang bisa menjawab pertanyaan umum maupun pertanyaan khusus terkait dashboard analisis sentimen.
Jawab dalam bahasa Indonesia, singkat, jelas, dan ramah.

Pertanyaan pengguna: {question}

{insight_block if any([total, positif, negatif, rekomendasi, ringkasan]) else 'Tidak ada data insight yang cukup, jadi jawab berdasarkan pengetahuan umum.'}

Instruksi:
- Jika pertanyaan umum seperti pengertian, definisi, cara, atau saran umum, jawab langsung tanpa bergantung pada data insight.
- Jika pertanyaan terkait sentimen, evaluasi model, solusi, strategi, atau rekomendasi, gunakan data insight di atas bila relevan.
- Jangan mengarang data di luar konteks.
- Jika data tidak lengkap, sebutkan keterbatasannya secara jujur.
- Jangan terpaku pada satu pola jawaban; sesuaikan dengan maksud pertanyaan pengguna.
"""


def _build_contextual_fallback_answer(question: str, context: Optional[dict]) -> str:
    context = context or {}
    stats = context.get('stats') or {}
    eval_data = context.get('eval_') or context.get('evaluasi') or {}
    rek = context.get('rek') or context.get('rekomendasi') or {}

    total = stats.get('total') or 0
    positif = stats.get('positif') or 0
    negatif = stats.get('negatif') or 0
    ratio = round((positif / total) * 100, 1) if total else 0
    svm = eval_data.get('svm') or {}
    nb = eval_data.get('naive_bayes') or {}
    ringkasan = rek.get('ringkasan') or ''
    q = (question or '').lower()

    if any(k in q for k in ['solusi', 'cara', 'strategi', 'tindakan', 'perbaiki', 'atasi', 'prioritas']):
        if negatif > 0:
            return (
                f"Berdasarkan data saat ini, fokus utama adalah menurunkan ulasan negatif yang mencapai {negatif} data. "
                f"Prioritas terbaik adalah memperbaiki masalah yang paling sering muncul pada ulasan negatif, mempercepat respons pelanggan, "
                f"dan menguatkan kualitas layanan agar sentimen positif naik dari {ratio}% saat ini."
            )
        return f"Secara umum, saya sarankan memperkuat kualitas layanan dan menjaga konsistensi pengalaman pelanggan agar sentimen tetap positif di level {ratio}%."

    if any(k in q for k in ['evaluasi', 'model', 'akurasi', 'svm', 'naive', 'precision', 'recall', 'f1']):
        return (
            f"Performa model yang tersedia menunjukkan SVM {svm.get('akurasi', 'tidak tersedia')}% dan Naive Bayes {nb.get('akurasi', 'tidak tersedia')}%. "
            "Secara umum, model dengan akurasi lebih tinggi biasanya lebih cocok dipakai sebagai engine utama untuk analisis sentimen."
        )

    if any(k in q for k in ['apa itu', 'pengertian', 'arti', 'definisi', 'jelaskan']):
        return "Analisis sentimen adalah proses mengidentifikasi apakah ulasan atau pendapat bersifat positif, negatif, atau netral. Saya bisa membantu menjelaskan konsep ini, menilai hasil model, atau memberi saran tindakan berdasarkan data Anda."

    return (
        f"Saya bisa membantu menjawab pertanyaan Anda secara umum dan mengaitkannya dengan data saat ini. "
        f"Saat ini terdapat {total} ulasan dengan {ratio}% sentimen positif, dan saya dapat membantu meringkas, memberi strategi, atau menyarankan tindakan perbaikan."
    )


def _call_gemini(prompt: str) -> str:
    if not GEMINI_API_KEY:
        raise RuntimeError('GEMINI_API_KEY belum tersedia')

    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}'
    payload = {
        'contents': [{'parts': [{'text': prompt}]}],
        'generationConfig': {
            'temperature': 0.7,
            'topP': 0.9,
            'maxOutputTokens': 400,
        },
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST',
    )

    with urllib.request.urlopen(req, timeout=45) as response:
        data = json.loads(response.read().decode('utf-8'))

    candidates = data.get('candidates') or []
    if not candidates:
        raise RuntimeError('Respons Gemini kosong')

    parts = candidates[0].get('content', {}).get('parts', [])
    text = ''.join(part.get('text', '') for part in parts if isinstance(part, dict))
    if not text:
        raise RuntimeError('Tidak ada teks respons dari Gemini')

    return text.strip()


# ─── HELPER: CONFIDENCE SCORE ────────────────────────────
def get_confidence(model_pipeline, teks_bersih: str, label_map: dict) -> dict:
    """
    Hitung confidence score dari model.
    - SVM (LinearSVC): pakai decision_function → softmax
    - NB (MultinomialNB): pakai predict_proba
    """
    try:
        clf = model_pipeline.named_steps['clf']
        tfidf = model_pipeline.named_steps['tfidf']
        X = tfidf.transform([teks_bersih])

        # Cek apakah model support predict_proba (Naive Bayes)
        if hasattr(clf, 'predict_proba'):
            proba = clf.predict_proba(X)[0]
            pred_idx = int(np.argmax(proba))
            classes = clf.classes_
            scores = {
                label_map.get(int(c), str(c)): round(float(p) * 100, 2)
                for c, p in zip(classes, proba)
            }
            confidence = round(float(np.max(proba)) * 100, 2)

        # SVM: pakai decision_function → softmax
        elif hasattr(clf, 'decision_function'):
            decision = clf.decision_function(X)[0]
            pred_idx = int(clf.predict(X)[0])

            # Softmax untuk convert decision scores ke probability
            if isinstance(decision, (int, float, np.integer, np.floating)):
                # Binary SVM — satu nilai
                prob_pos = float(1 / (1 + np.exp(-decision)))
                prob_neg = 1 - prob_pos
                scores = {
                    'positif': round(prob_pos * 100, 2),
                    'negatif': round(prob_neg * 100, 2),
                }
                confidence = round(max(prob_pos, prob_neg) * 100, 2)
            else:
                # Multi-class
                e = np.exp(decision - np.max(decision))
                proba = e / e.sum()
                classes = clf.classes_
                scores = {
                    label_map.get(int(c), str(c)): round(float(p) * 100, 2)
                    for c, p in zip(classes, proba)
                }
                confidence = round(float(np.max(proba)) * 100, 2)
        else:
            scores = {}
            confidence = 0.0

        return {'confidence': confidence, 'scores': scores}

    except Exception as e:
        return {'confidence': 0.0, 'scores': {}}


# ─── HELPER: PREDIKSI LENGKAP ────────────────────────────
def _prediksi_lengkap(teks: str, model_key: str) -> dict:
    """Prediksi dengan confidence score, preprocessing detail, simpan ke DB."""
    detail      = preprocessing_dengan_detail(teks)
    teks_bersih = detail['step4_stemming']
    label_map   = {0: 'negatif', 1: 'positif'}

    if model_key == 'naive_bayes':
        mdl      = model_nb
        nama_mdl = 'Naive Bayes'
    else:
        mdl      = model_svm
        nama_mdl = 'SVM'

    hasil    = mdl.predict([teks_bersih])[0]
    sentimen = label_map.get(int(hasil), str(hasil))
    conf     = get_confidence(mdl, teks_bersih, label_map)
    waktu    = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    data = {
        'teks_asli':        teks,
        'teks_bersih':      teks_bersih,
        'sentimen':         sentimen,
        'model_digunakan':  nama_mdl,
        'waktu':            waktu,
        'confidence':       conf['confidence'],
        'confidence_scores': conf['scores'],
        'preprocessing': {
            'step1': detail['step1_lower'],
            'step2': detail['step2_karakter'],
            'step3': detail['step3_stopword'],
            'step4': detail['step4_stemming'],
        }
    }
    simpan_riwayat(data)
    return data


# ─── HELPER: SMART RECOMMENDATION ────────────────────────
def generate_rekomendasi(riwayat_data: list) -> dict:
    """
    Analisis pola dari riwayat ulasan negatif
    dan generate rekomendasi strategis otomatis.
    """
    if not riwayat_data:
        return {'rekomendasi': [], 'ringkasan': 'Belum ada data untuk dianalisis.'}

    negatif_data = [r for r in riwayat_data if r.get('sentimen') == 'negatif']
    positif_data = [r for r in riwayat_data if r.get('sentimen') == 'positif']
    total        = len(riwayat_data)
    pct_negatif  = round(len(negatif_data) / total * 100, 1) if total else 0

    # Ekstrak kata-kata kunci dari ulasan negatif
    kata_negatif = []
    for r in negatif_data:
        teks_bersih = r.get('teks_bersih', '')
        if teks_bersih:
            kata_negatif.extend(teks_bersih.split())

    # Kata-kata yang sering diasosiasikan dengan masalah tertentu
    kategori_masalah = {
        'Pengiriman & Logistik': ['kirim', 'paket', 'ekspedisi', 'lama', 'telat', 'lambat', 'kurir', 'ongkir'],
        'Kualitas Produk':       ['rusak', 'cacat', 'jelek', 'buruk', 'kualitas', 'bahan', 'pecah', 'patah'],
        'Kesesuaian Produk':     ['sesuai', 'foto', 'deskripsi', 'beda', 'palsu', 'asli', 'original', 'tipu'],
        'Pelayanan Seller':      ['respon', 'seller', 'penjual', 'balas', 'komplain', 'cs', 'ramah', 'sopan'],
        'Harga & Nilai':         ['mahal', 'harga', 'murah', 'worth', 'nilai', 'rugi', 'kecewa'],
    }

    temuan = {}
    counter = Counter(kata_negatif)
    for kategori, kata_kunci in kategori_masalah.items():
        skor = sum(counter.get(kata, 0) for kata in kata_kunci)
        if skor > 0:
            temuan[kategori] = skor

    # Sort berdasarkan frekuensi
    temuan_sorted = sorted(temuan.items(), key=lambda x: x[1], reverse=True)

    rekomendasi = []
    template_rekomendasi = {
        'Pengiriman & Logistik': {
            'icon': '🚚',
            'masalah': 'Banyak keluhan terkait pengiriman yang lambat atau paket bermasalah.',
            'aksi': 'Pertimbangkan bermitra dengan ekspedisi premium, aktifkan asuransi pengiriman, dan tambahkan fitur tracking real-time.'
        },
        'Kualitas Produk': {
            'icon': '📦',
            'masalah': 'Ditemukan keluhan tentang kualitas atau kondisi produk saat diterima.',
            'aksi': 'Tingkatkan standar QC sebelum pengiriman, perbaiki packaging, dan pertimbangkan garansi produk.'
        },
        'Kesesuaian Produk': {
            'icon': '🔍',
            'masalah': 'Produk tidak sesuai dengan foto atau deskripsi di platform.',
            'aksi': 'Perbarui foto produk dengan kondisi aktual, tambahkan deskripsi detail, dan hindari foto yang misleading.'
        },
        'Pelayanan Seller': {
            'icon': '💬',
            'masalah': 'Pelanggan mengeluhkan respons seller yang lambat atau kurang memuaskan.',
            'aksi': 'Tetapkan SLA respons maksimal 1 jam, latih tim CS, dan gunakan template jawaban untuk pertanyaan umum.'
        },
        'Harga & Nilai': {
            'icon': '💰',
            'masalah': 'Pelanggan merasa harga tidak sebanding dengan kualitas yang diterima.',
            'aksi': 'Review struktur harga, tambahkan value proposition yang jelas, dan pertimbangkan program loyalitas pelanggan.'
        },
    }

    for kategori, skor in temuan_sorted[:3]:  # Top 3 masalah
        if kategori in template_rekomendasi:
            tmpl = template_rekomendasi[kategori]
            rekomendasi.append({
                'kategori':  kategori,
                'icon':      tmpl['icon'],
                'frekuensi': skor,
                'masalah':   tmpl['masalah'],
                'aksi':      tmpl['aksi'],
                'prioritas': 'TINGGI' if skor > 5 else 'SEDANG',
            })

    # Jika tidak cukup masalah terdeteksi dari kata kunci
    if not rekomendasi:
        if pct_negatif < 20:
            rekomendasi.append({
                'kategori':  'Performa Baik',
                'icon':      '✅',
                'frekuensi': 0,
                'masalah':   f'Tingkat sentimen negatif hanya {pct_negatif}% — sangat baik!',
                'aksi':      'Pertahankan kualitas layanan dan terus tingkatkan jumlah ulasan positif.',
                'prioritas': 'RENDAH',
            })
        else:
            rekomendasi.append({
                'kategori':  'Perlu Investigasi',
                'icon':      '⚠️',
                'frekuensi': len(negatif_data),
                'masalah':   f'{pct_negatif}% ulasan bersifat negatif — perlu perhatian segera.',
                'aksi':      'Lakukan survei mendalam kepada pelanggan untuk mengidentifikasi akar masalah.',
                'prioritas': 'TINGGI',
            })

    # Kata negatif paling sering
    top_kata_negatif = [
        {'kata': kata, 'frekuensi': freq}
        for kata, freq in counter.most_common(10)
        if len(kata) > 2
    ]

    return {
        'total_analisis':    total,
        'total_negatif':     len(negatif_data),
        'total_positif':     len(positif_data),
        'persen_negatif':    pct_negatif,
        'rekomendasi':       rekomendasi,
        'top_kata_negatif':  top_kata_negatif,
        'ringkasan': (
            f"Dari {total} ulasan, {pct_negatif}% bersifat negatif. "
            f"{'Perlu tindakan segera.' if pct_negatif > 30 else 'Kondisi cukup baik.'}"
        )
    }


# ═══════════════════════════════════════════════════════
# ENDPOINTS
# ═══════════════════════════════════════════════════════

@app.get('/')
def root():
    return {
        'status': 'API berjalan!',
        'versi': '3.0.0',
        'fitur_baru': [
            'Confidence Score per prediksi',
            'Perbandingan dual model NB vs SVM real-time',
            'Sentiment Trend Timeline',
            'Smart Recommendation Engine',
        ]
    }

# ─── AI INSIGHT CHAT ───────────────────────────────────
@app.post('/ai/insight-chat')
def ai_insight_chat(payload: InsightChatInput):
    question = (payload.question or '').strip()
    if not question:
        raise HTTPException(status_code=400, detail='Pertanyaan tidak boleh kosong')

    prompt = _build_insight_prompt(question, payload.context)

    try:
        answer = _call_gemini(prompt)
        return {'answer': answer, 'source': 'gemini', 'status': 'ok'}
    except Exception as exc:
        fallback = _build_contextual_fallback_answer(question, payload.context)
        return {
            'answer': fallback,
            'source': 'fallback',
            'status': 'fallback',
            'error': str(exc),
        }


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

# ─── PREDIKSI TUNGGAL + CONFIDENCE SCORE ─────────────
@app.post('/prediksi')
def prediksi_sentimen(input: InputUlasan):
    """
    FITUR 1: Prediksi dengan Confidence Score.
    Response include: sentimen, confidence (%), confidence_scores, preprocessing detail.
    """
    if not input.teks.strip():
        raise HTTPException(status_code=400, detail='Teks tidak boleh kosong!')
    return _prediksi_lengkap(input.teks, input.model)

# ─── FITUR 2: DUAL MODEL COMPARISON ─────────────────
@app.post('/prediksi/dual')
def prediksi_dual_model(input: InputDualModel):
    """
    FITUR 2: Bandingkan hasil NB vs SVM secara real-time dalam satu request.
    Response: hasil dari kedua model + confidence masing-masing + perbandingan.
    """
    if not input.teks.strip():
        raise HTTPException(status_code=400, detail='Teks tidak boleh kosong!')

    detail      = preprocessing_dengan_detail(input.teks)
    teks_bersih = detail['step4_stemming']
    label_map   = {0: 'negatif', 1: 'positif'}

    # Prediksi NB
    hasil_nb     = model_nb.predict([teks_bersih])[0]
    sentimen_nb  = label_map.get(int(hasil_nb), str(hasil_nb))
    conf_nb      = get_confidence(model_nb, teks_bersih, label_map)

    # Prediksi SVM
    hasil_svm    = model_svm.predict([teks_bersih])[0]
    sentimen_svm = label_map.get(int(hasil_svm), str(hasil_svm))
    conf_svm     = get_confidence(model_svm, teks_bersih, label_map)

    # Simpan ke DB (pakai model terbaik = SVM)
    waktu = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    simpan_riwayat({
        'teks_asli':        input.teks,
        'teks_bersih':      teks_bersih,
        'sentimen':         sentimen_svm,
        'model_digunakan':  'Dual (NB+SVM)',
        'waktu':            waktu,
        'preprocessing': {
            'step1': detail['step1_lower'],
            'step2': detail['step2_karakter'],
            'step3': detail['step3_stopword'],
            'step4': detail['step4_stemming'],
        }
    })

    sepakat = sentimen_nb == sentimen_svm

    return {
        'teks_asli':    input.teks,
        'teks_bersih':  teks_bersih,
        'waktu':        waktu,
        'preprocessing': {
            'step1': detail['step1_lower'],
            'step2': detail['step2_karakter'],
            'step3': detail['step3_stopword'],
            'step4': detail['step4_stemming'],
        },
        'naive_bayes': {
            'sentimen':          sentimen_nb,
            'confidence':        conf_nb['confidence'],
            'confidence_scores': conf_nb['scores'],
            'akurasi_model':     87.56,
        },
        'svm': {
            'sentimen':          sentimen_svm,
            'confidence':        conf_svm['confidence'],
            'confidence_scores': conf_svm['scores'],
            'akurasi_model':     88.44,
        },
        'kesimpulan': {
            'sepakat':           sepakat,
            'model_terpilih':    'SVM',
            'sentimen_final':    sentimen_svm,
            'confidence_final':  conf_svm['confidence'],
            'catatan': (
                'Kedua model sepakat.' if sepakat
                else f'Model berbeda — NB: {sentimen_nb}, SVM: {sentimen_svm}. Gunakan SVM sebagai acuan (akurasi lebih tinggi).'
            )
        }
    }

# ─── FITUR 3: SENTIMENT TREND TIMELINE ──────────────
@app.get('/trend')
def sentiment_trend(
    periode: str = 'harian',  # 'harian' | 'mingguan' | 'bulanan'
    limit:   int = 30
):
    """
    FITUR 3: Trend sentimen berdasarkan waktu.
    Mengelompokkan data dari SQLite berdasarkan tanggal/minggu/bulan.
    """
    riwayat = ambil_riwayat(limit=1000)

    if not riwayat:
        return {'periode': periode, 'data': [], 'pesan': 'Belum ada data'}

    # Kelompokkan berdasarkan periode
    grup = {}
    for r in riwayat:
        try:
            dt = datetime.datetime.strptime(r['waktu'], '%Y-%m-%d %H:%M:%S')
            if periode == 'harian':
                key = dt.strftime('%Y-%m-%d')
            elif periode == 'mingguan':
                key = f"Minggu {dt.isocalendar()[1]} ({dt.strftime('%b %Y')})"
            elif periode == 'bulanan':
                key = dt.strftime('%b %Y')
            else:
                key = dt.strftime('%Y-%m-%d')

            if key not in grup:
                grup[key] = {'positif': 0, 'negatif': 0, 'total': 0}

            grup[key]['total'] += 1
            if r.get('sentimen') == 'positif':
                grup[key]['positif'] += 1
            else:
                grup[key]['negatif'] += 1
        except Exception:
            continue

    # Format untuk chart
    data_trend = []
    for tanggal, nilai in sorted(grup.items())[-limit:]:
        total = nilai['total']
        data_trend.append({
            'tanggal':       tanggal,
            'positif':       nilai['positif'],
            'negatif':       nilai['negatif'],
            'total':         total,
            'pct_positif':   round(nilai['positif'] / total * 100, 1) if total else 0,
            'pct_negatif':   round(nilai['negatif'] / total * 100, 1) if total else 0,
        })

    # Hitung trend (naik/turun)
    trend_arah = 'stabil'
    if len(data_trend) >= 2:
        pct_awal  = data_trend[0]['pct_positif']
        pct_akhir = data_trend[-1]['pct_positif']
        if pct_akhir > pct_awal + 5:
            trend_arah = 'naik'
        elif pct_akhir < pct_awal - 5:
            trend_arah = 'turun'

    return {
        'periode':    periode,
        'trend_arah': trend_arah,
        'total_data': sum(d['total'] for d in data_trend),
        'data':       data_trend,
    }

# ─── FITUR 5: SMART RECOMMENDATION ─────────────────
@app.get('/rekomendasi')
def smart_rekomendasi(limit: int = 500):
    """
    FITUR 5: Smart Recommendation Engine.
    Analisis pola ulasan negatif dan generate rekomendasi strategis.
    """
    riwayat = ambil_riwayat(limit=limit)
    return generate_rekomendasi(riwayat)

@app.post('/rekomendasi/analisis')
async def rekomendasi_dari_csv(file: UploadFile = File(...)):
    """Analisis rekomendasi dari file CSV yang diupload."""
    isi     = await file.read()
    decoded = isi.decode('utf-8', errors='ignore')
    reader  = csv.DictReader(io.StringIO(decoded))
    data    = [dict(row) for row in reader]

    # Normalisasi kolom
    hasil_norm = []
    for row in data:
        sentimen = (row.get('sentimen') or row.get('prediksi_svm') or '').lower().strip()
        teks_bersih = (row.get('teks_bersih') or row.get('text') or '').strip()
        if sentimen in ['positif', 'negatif']:
            hasil_norm.append({'sentimen': sentimen, 'teks_bersih': teks_bersih})

    return generate_rekomendasi(hasil_norm)

# ─── UPLOAD CSV ─────────────────────────────────────
@app.post('/upload-csv')
async def upload_csv(file: UploadFile = File(...), model: str = 'svm'):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail='File harus .csv!')

    isi     = await file.read()
    try:
        decoded = isi.decode('utf-8-sig', errors='ignore')
    except Exception:
        decoded = isi.decode('utf-8', errors='ignore')

    reader     = csv.DictReader(io.StringIO(decoded))
    kolom      = reader.fieldnames or []
    kolom_teks = None

    for kandidat in ['text', 'teks', 'ulasan', 'review', 'content', 'comment', 'komentar']:
        matches = [k for k in kolom if k.lower().strip() == kandidat]
        if matches:
            kolom_teks = matches[0]
            break
    if not kolom_teks and kolom:
        kolom_teks = kolom[0]
    if not kolom_teks:
        raise HTTPException(status_code=400, detail='Tidak ditemukan kolom teks dalam CSV!')

    hasil_list = []
    for baris in reader:
        teks = (baris.get(kolom_teks) or '').strip()
        if not teks:
            continue
        try:
            hasil_list.append(_prediksi_lengkap(teks, model))
        except Exception:
            continue

    if not hasil_list:
        raise HTTPException(status_code=400, detail='Tidak ada data valid dalam file CSV!')

    positif = sum(1 for h in hasil_list if h['sentimen'] == 'positif')
    negatif = sum(1 for h in hasil_list if h['sentimen'] == 'negatif')
    total   = len(hasil_list)
    avg_conf = round(sum(h.get('confidence', 0) for h in hasil_list) / total, 2) if total else 0

    return {
        'tipe':              'csv_eksternal',
        'nama_file':         file.filename,
        'kolom_digunakan':   kolom_teks,
        'total_diproses':    total,
        'positif':           positif,
        'negatif':           negatif,
        'persen_positif':    round(positif / total * 100, 1) if total else 0,
        'persen_negatif':    round(negatif / total * 100, 1) if total else 0,
        'rata_rata_confidence': avg_conf,
        'hasil':             hasil_list,
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
                'teks_asli':       teks_asli,
                'teks_bersih':     teks_bersih,
                'sentimen':        sentimen,
                'model_digunakan': 'SVM (Training)',
                'waktu':           datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'preprocessing':   {'step1': '', 'step2': '', 'step3': '', 'step4': teks_bersih},
            })
            berhasil += 1
        except Exception:
            gagal += 1

    return {
        'tipe':               'csv_training',
        'nama_file':          file.filename,
        'total_berhasil':     berhasil,
        'total_gagal':        gagal,
        'statistik_database': ambil_statistik(),
    }

# ─── RIWAYAT & STATISTIK ────────────────────────────
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

# ─── EVALUASI ───────────────────────────────────────
@app.get('/evaluasi')
def hasil_evaluasi():
    if os.path.exists('hasil_evaluasi.json'):
        with open('hasil_evaluasi.json', 'r') as f:
            return json.load(f)
    return {'pesan': 'Jalankan train_model.py terlebih dahulu!'}