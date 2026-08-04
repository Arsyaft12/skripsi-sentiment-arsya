Panduan cepat: Deploy Backend FastAPI (Publik)

Tujuan: memastikan backend dapat diakses publik tanpa permintaan akses khusus.

Opsi rekomendasi:

1) Render (mudah, gratis tier tersedia)
- Buka https://render.com dan buat account/public service
- Pilih "New -> Web Service" -> Connect repo Git
- Root: pilih folder `backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Add Env Var jika perlu: `GEMINI_API_KEY` (opsional)
- Deploy. Setelah deploy selesai, catat URL publik (misal `https://your-backend.onrender.com`) dan gunakan sebagai `NEXT_PUBLIC_API_URL` di frontend.

2) Fly.io
- Install `flyctl`, buat app: `fly launch` pada folder `backend` (ikuti wizard)
- Pastikan `Dockerfile` ada (sudah tersedia)
- Deploy: `fly deploy`
- Catat URL publik dan gunakan di frontend.

3) Vercel (gunakan Docker atau serverless builder)
- Jika ingin menggunakan Vercel: pilih "Import Project" -> pilih folder `backend`
- Di Settings > General > Visibility pastikan "Public"
- Di Vercel, gunakan Deploy with Docker (pilih `Dockerfile`) atau gunakan Render sebagai alternatif yang lebih straightforward untuk FastAPI.

Poin penting untuk akses publik:
- Pastikan menggunakan URL "production" (domain yang muncul di deployment), bukan preview/internal link yang membutuhkan login atau undangan.
- Pastikan repository/public project visibility di penyedia hosting tidak membatasi akses.

Periksa berkas ini sebelum deploy:
- `requirements.txt` ada? (ya)
- `Procfile` ada? (ya)
- `Dockerfile` ada? (ya)
- `main.py` menjalankan FastAPI dengan host 0.0.0.0? (ya saat menggunakan uvicorn)

Langkah pasca-deploy:
- Di Vercel (frontend), set env `NEXT_PUBLIC_API_URL` ke URL backend publik.
- Redeploy frontend.

Jika mau, saya bisa bantu membuat file `render.yaml` atau menyiapkan GitHub Actions untuk auto-deploy, beri tahu pilihan host Anda.