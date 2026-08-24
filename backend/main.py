# backend/main.py
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.database import supabase, insert_prediction, fetch_predictions, delete_prediction
from backend.model import analyze_xray

app = FastAPI(
    title='Toraks AI - Medical Diagnostic API',
    description='API Backend FastAPI untuk Deteksi Penyakit Toraks dan Integrasi Supabase Database & Local SQLite',
    version='1.0.0'
)

# Mengizinkan Frontend Next.js & Cross-Origin request dari jaringan lokal
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/api/health')
async def health_check():
    """Cek status kesehatan API dan koneksi Database"""
    db_connected = supabase is not None
    return {
        "status": "online",
        "service": "Toraks AI Backend",
        "database_connected": db_connected,
        "database_mode": "Supabase Cloud & Local SQLite" if db_connected else "Local SQLite DB"
    }

@app.post('/api/predict')
async def predict_thorax(file: UploadFile = File(...)):
    """Memproses unggahan gambar Rontgen Toraks, membuat Grad-CAM heatmap & menyimpan riwayat ke Database"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="File tidak valid")
        
    try:
        contents = await file.read()
        
        # 1. Jalankan Analisis AI Inferensi & Grad-CAM Heatmap
        hasil_ai = analyze_xray(contents, file.filename)
        probabilities = hasil_ai.get("probabilities", {})
        heatmap_image = hasil_ai.get("heatmap_image", "")
        
        # 2. Simpan riwayat ke Database (Supabase + Local SQLite)
        db_status = insert_prediction(file.filename, probabilities)
                
        return {
            'filename': file.filename,
            'prediction': probabilities,
            'heatmap_image': heatmap_image,
            'database': db_status,
            'db_saved': True
        }
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"Gagal memproses gambar: {str(err)}")


@app.get('/api/history')
async def get_history():
    """Mengambil riwayat prediksi dari Database"""
    try:
        data = fetch_predictions()
        return {"data": data, "message": "Berhasil mengambil riwayat"}
    except Exception as e:
        return {"data": [], "error": str(e)}

@app.delete('/api/history/{record_id}')
async def delete_history(record_id: int):
    """Menghapus item riwayat prediksi dari Database"""
    try:
        delete_prediction(record_id)
        return {"message": "Rekaman riwayat berhasil dihapus"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
