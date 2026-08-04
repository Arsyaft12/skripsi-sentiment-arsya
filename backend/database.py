# backend/database.py
# File ini mengatur koneksi dan operasi database SQLite

import csv
import sqlite3
import datetime
import json
import os
import shutil
import tempfile

ROOT_DIR = os.path.dirname(__file__)
BUNDLED_DB_FILE = os.path.join(ROOT_DIR, 'sentimen.db')
TMP_DB_FILE = os.path.join(tempfile.gettempdir(), 'sentimen.db')
CSV_SOURCE_FILE = os.path.join(ROOT_DIR, 'hasil_dataset_lengkap.csv')


def _ensure_temp_dir():
    temp_dir = os.path.dirname(TMP_DB_FILE)
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir, exist_ok=True)


def _get_db_file():
    if os.path.exists(BUNDLED_DB_FILE):
        if os.access(ROOT_DIR, os.W_OK):
            return BUNDLED_DB_FILE
        _ensure_temp_dir()
        if not os.path.exists(TMP_DB_FILE):
            shutil.copy2(BUNDLED_DB_FILE, TMP_DB_FILE)
        return TMP_DB_FILE

    _ensure_temp_dir()
    return TMP_DB_FILE


DB_FILE = _get_db_file()
print(f'✓ Database file path: {DB_FILE}')


def _seed_db_from_csv_if_empty():
    if not os.path.exists(CSV_SOURCE_FILE):
        print('⚠️ CSV seed source tidak ditemukan; database tidak di-seed.')
        return

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('SELECT COUNT(*) FROM riwayat_analisis')
    total_rows = cursor.fetchone()[0]
    if total_rows > 0:
        conn.close()
        print(f'✓ Database sudah berisi {total_rows} baris; seed CSV dilewati.')
        return

    print('⟳ Database kosong, memulai seed dari hasil_dataset_lengkap.csv ...')
    with open(CSV_SOURCE_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        batch = []
        inserted = 0
        for row in reader:
            teks_asli = (row.get('text') or '').strip()
            teks_bersih = (row.get('teks_bersih') or teks_asli).strip()
            sentimen = (row.get('prediksi_svm') or row.get('label_asli') or '').strip().lower()
            if sentimen not in ('positif', 'negatif') or not teks_asli:
                continue

            batch.append((
                teks_asli,
                teks_bersih,
                sentimen,
                'SVM (Imported)',
                teks_asli,
                teks_bersih,
                teks_bersih,
                teks_bersih,
                '2025-01-01 00:00:00'
            ))

            if len(batch) >= 500:
                cursor.executemany('''
                    INSERT INTO riwayat_analisis
                    (teks_asli, teks_bersih, sentimen, model_digunakan,
                     step1_lower, step2_karakter, step3_stopword, step4_stemming, waktu)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', batch)
                inserted += len(batch)
                batch.clear()

        if batch:
            cursor.executemany('''
                INSERT INTO riwayat_analisis
                (teks_asli, teks_bersih, sentimen, model_digunakan,
                 step1_lower, step2_karakter, step3_stopword, step4_stemming, waktu)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', batch)
            inserted += len(batch)

    conn.commit()
    conn.close()
    print(f'✓ Seed selesai. Baris ditambahkan: {inserted}')

def init_db():
    """Buat tabel jika belum ada"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS riwayat_analisis (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            teks_asli   TEXT NOT NULL,
            teks_bersih TEXT NOT NULL,
            sentimen    TEXT NOT NULL,
            model_digunakan TEXT NOT NULL,
            step1_lower TEXT,
            step2_karakter TEXT,
            step3_stopword TEXT,
            step4_stemming TEXT,
            waktu       TEXT NOT NULL,
            created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()
    conn.close()
    print(f'✓ Database siap: {DB_FILE}')
    _seed_db_from_csv_if_empty()

def simpan_riwayat(data: dict):
    """Simpan hasil analisis ke database"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    prep = data.get('preprocessing', {})
    cursor.execute('''
        INSERT INTO riwayat_analisis
        (teks_asli, teks_bersih, sentimen, model_digunakan,
         step1_lower, step2_karakter, step3_stopword, step4_stemming, waktu)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['teks_asli'],
        data['teks_bersih'],
        data['sentimen'],
        data['model_digunakan'],
        prep.get('step1', ''),
        prep.get('step2', ''),
        prep.get('step3', ''),
        prep.get('step4', ''),
        data['waktu']
    ))

    conn.commit()
    conn.close()

def ambil_riwayat(limit=50):
    """Ambil riwayat analisis dari database"""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute('''
        SELECT * FROM riwayat_analisis
        ORDER BY created_at DESC
        LIMIT ?
    ''', (limit,))

    rows = cursor.fetchall()
    conn.close()

    return [dict(row) for row in rows]

def ambil_statistik():
    """Hitung statistik dari database"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    cursor.execute('SELECT COUNT(*) FROM riwayat_analisis')
    total = cursor.fetchone()[0]

    if total == 0:
        conn.close()
        return {'pesan': 'Belum ada data'}

    cursor.execute(
        "SELECT COUNT(*) FROM riwayat_analisis WHERE sentimen='positif'")
    positif = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM riwayat_analisis WHERE sentimen='negatif'")
    negatif = cursor.fetchone()[0]

    conn.close()

    return {
        'total':          total,
        'positif':        positif,
        'negatif':        negatif,
        'persen_positif': round(positif/total*100, 1),
        'persen_negatif': round(negatif/total*100, 1),
    }

def hapus_semua():
    """Hapus semua riwayat (untuk reset)"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM riwayat_analisis')
    conn.commit()
    conn.close()

# Test jika dijalankan langsung
if __name__ == '__main__':
    init_db()
    print('✓ Database berhasil diinisialisasi!')

    # Test simpan data
    simpan_riwayat({
        'teks_asli':       'Produk bagus banget!',
        'teks_bersih':     'produk bagus',
        'sentimen':        'positif',
        'model_digunakan': 'SVM',
        'waktu':           datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'preprocessing': {
            'step1': 'produk bagus banget!',
            'step2': 'produk bagus banget',
            'step3': 'produk bagus',
            'step4': 'produk bagus',
        }
    })
    print('✓ Test data tersimpan!')

    stat = ambil_statistik()
    print(f'✓ Statistik: {stat}')

    riw = ambil_riwayat()
    print(f'✓ Riwayat: {len(riw)} data')