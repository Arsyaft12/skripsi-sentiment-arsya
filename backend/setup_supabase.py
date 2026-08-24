# backend/setup_supabase.py
"""
Skrip Otomatisasi & Pengujian Database Supabase Cloud + Local SQLite DB
Mengecek konektivitas database, menyiapkan tabel 'predictions', dan memasukkan data sampel jika diperlukan.
"""

import os
import json
import sqlite3
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)

URL = os.environ.get('SUPABASE_URL', '')
KEY = os.environ.get('SUPABASE_KEY', '')

def setup_database():
    print("==================================================")
    print("   TORAKSAI DATABASE SETUP & AUTOMATION MANAGER   ")
    print("==================================================")
    
    # 1. Setup Local SQLite Database
    db_path = Path(__file__).resolve().parent / "predictions.db"
    print(f"\n[1/2] Menyiapkan Database Lokal SQLite ({db_path.name})...")
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS predictions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                filename TEXT NOT NULL,
                results TEXT NOT NULL
            )
        """)
        conn.commit()
        
        cursor.execute("SELECT COUNT(*) FROM predictions")
        count = cursor.fetchone()[0]
        conn.close()
        print(f"  [OK] Tabel SQLite 'predictions' SIAP! (Total Rekaman: {count})")
    except Exception as e:
        print(f"  [ERROR] Gagal inisialisasi SQLite: {e}")

    # 2. Setup Supabase Cloud
    print("\n[2/2] Memeriksa Koneksi Database Supabase Cloud...")
    if not URL or not KEY or URL.startswith('masukkan_') or KEY.startswith('masukkan_'):
        print("  [INFO] Credentials Supabase belum diisi di backend/.env.")
        print("  Sistem berjalan dalam mode 'Local SQLite DB (Zero-Error Automatic Backup)'.")
        print("  Gunakan URL & Key Supabase Anda di .env untuk mengaktifkan Cloud Realtime Sync.")
        return

    try:
        from supabase import create_client
        supabase = create_client(URL, KEY)
        print("  [OK] Berhasil terhubung ke Supabase Cloud!")
        
        # Test Query
        res = supabase.table('predictions').select('id').limit(1).execute()
        print("  [OK] Tabel 'predictions' di Supabase Cloud terdeteksi & responsif!")
    except Exception as e:
        print(f"  [WARN] Catatan Koneksi Supabase: {e}")
        print("  Pastikan Anda telah membuat tabel 'predictions' di Supabase SQL Editor:")
        print("  -------------------------------------------------------------")
        print("  CREATE TABLE predictions (")
        print("    id BIGSERIAL PRIMARY KEY,")
        print("    created_at TIMESTAMPTZ DEFAULT NOW(),")
        print("    filename TEXT NOT NULL,")
        print("    results JSONB NOT NULL")
        print("  );")
        print("  -------------------------------------------------------------")

if __name__ == "__main__":
    setup_database()
