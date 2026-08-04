# Deployment Gratis untuk Proyek Sentimen

## Ringkasan
Proyek ini terdiri dari dua aplikasi terpisah:
- `frontend/` — Next.js UI
- `backend/` — FastAPI API

## Siap untuk deploy gratis
Proyek sudah disiapkan untuk deployment gratis dengan konfigurasi berikut:
- `docker-compose.yml` untuk menjalankan `frontend` + `backend` secara lokal
- `frontend/Dockerfile` untuk membangun Next.js sebagai container
- `backend/Dockerfile` untuk menjalankan FastAPI sebagai container
- `backend/Procfile` untuk platform Python yang mendukung Procfile
- `backend/.env.example` dan `frontend/.env.example` untuk environment variables

## Opsi gratis disarankan

### 1. Frontend: Vercel
1. Buka https://vercel.com/
2. Pilih `New Project` > `Import Git Repository`
3. Pilih folder `frontend`
4. Di halaman Settings, pastikan project visibility/public access diset ke **Public** atau tidak dibatasi oleh tim/undangan.
5. Atur environment variable:
   - `NEXT_PUBLIC_API_URL=https://<backend-url>`
6. Deploy

> Catatan: Jangan gunakan URL preview internal yang hanya bisa diakses oleh akun Vercel yang terdaftar. Gunakan deployment URL publik yang muncul setelah proses deploy selesai.

### 2. Backend: Render (atau Fly.io)
1. Buka https://render.com/ atau https://fly.io/
2. Buat `Web Service` baru dari repo Git
3. Root project: `backend`
4. Build command:
   - `pip install -r requirements.txt`
5. Start command:
   - `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Tambahkan env jika ingin memakai Gemini (opsional):
   - `GEMINI_API_KEY=<kunci-opsional>`

> Catatan: endpoint `/ai/insight-chat` sudah memiliki fallback jika `GEMINI_API_KEY` tidak disediakan.

## Konfigurasi environment files

### `frontend/.env.example`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### `backend/.env.example`
```env
GEMINI_API_KEY=
```

## Jalankan lokal tanpa biaya
Jika ingin langsung mencoba lokal tanpa deploy publik:
1. Install Docker Desktop
2. Jalankan dari root proyek:
   - `docker compose up --build`
3. Akses:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000`

## Kendala saat ini
Lingkungan edit ini tidak menyediakan `docker` sehingga saya tidak bisa melakukan deployment publik langsung dari sini. Namun semua konfigurasi sudah siap untuk digunakan di layanan hosting gratis.
