# backend/database.py
# File ini mengatur koneksi dan operasi database SQLite

import sqlite3
import datetime
import json
import os

DB_FILE = 'sentimen.db'

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