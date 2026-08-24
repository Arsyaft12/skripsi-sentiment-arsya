# backend/database.py
import os
import json
import sqlite3
from pathlib import Path
from supabase import create_client, Client
from dotenv import load_dotenv

# Membaca file .env secara otomatis dari folder backend
env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)

url: str = os.environ.get('SUPABASE_URL', '')
key: str = os.environ.get('SUPABASE_KEY', '')

# Inisialisasi Database Supabase
supabase: Client = None

if url and key and not url.startswith('masukkan_') and not key.startswith('masukkan_'):
    try:
        supabase = create_client(url, key)
        print("[OK] Database Supabase Terhubung!")
    except Exception as e:
        print("[ERROR] Gagal konek ke database Supabase:", e)
else:
    print("[INFO] Supabase belum terkonfigurasi di backend/.env. Menggunakan Database Lokal SQLite (predictions.db)...")

# Local SQLite Database Setup (Otomatis Aktif & Siap Pakai)
DB_PATH = Path(__file__).resolve().parent / "predictions.db"

def init_local_db():
    conn = sqlite3.connect(DB_PATH)
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
    conn.close()

init_local_db()

def insert_prediction(filename: str, results: dict):
    saved_status = []
    # 1. Simpan ke Supabase Cloud jika terhubung
    if supabase:
        try:
            supabase.table('predictions').insert({
                'filename': filename,
                'results': results
            }).execute()
            saved_status.append("Supabase Cloud")
        except Exception as e:
            print("Gagal simpan Supabase:", e)
            
    # 2. Simpan ke Local SQLite DB
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO predictions (filename, results) VALUES (?, ?)", (filename, json.dumps(results)))
        conn.commit()
        conn.close()
        saved_status.append("Database Lokal")
    except Exception as e:
        print("Gagal simpan Local DB:", e)
        
    return "Ter simpan di: " + (" & ".join(saved_status) if saved_status else "Gagal")

def fetch_predictions():
    if supabase:
        try:
            res = supabase.table('predictions').select('*').order('created_at', desc=True).limit(20).execute()
            if res.data and len(res.data) > 0:
                return res.data
        except Exception:
            pass
            
    # Fallback to local SQLite DB
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT id, created_at, filename, results FROM predictions ORDER BY created_at DESC LIMIT 20")
        rows = cursor.fetchall()
        conn.close()
        
        data = []
        for r in rows:
            results_val = r[3]
            if isinstance(results_val, str):
                try:
                    results_val = json.loads(results_val)
                except Exception:
                    pass
            data.append({
                "id": r[0],
                "created_at": r[1],
                "filename": r[2],
                "results": results_val
            })
        return data
    except Exception as e:
        print("Error fetch local DB:", e)
        return []

def delete_prediction(record_id: int):
    if supabase:
        try:
            supabase.table('predictions').delete().eq('id', record_id).execute()
        except Exception:
            pass
            
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("DELETE FROM predictions WHERE id = ?", (record_id,))
        conn.commit()
        conn.close()
    except Exception as e:
        print("Error delete local DB:", e)


        