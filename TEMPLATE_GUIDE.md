# 🚀 Portfolio Starter Template — Panduan Kustomisasi Lengkap

Selamat datang di **Next.js Modern Portfolio Template Pro**! Template ini dirancang untuk memudahkan Anda (atau klien Anda) memiliki website portofolio profesional, modern, responsif, dan interaktif dalam hitungan menit.

---

## ⚡ Quick Start (5 Menit Kustomisasi)

Anda **TIDAK PERLU** mengedit puluhan file React/TypeScript. Cukup buka satu file konfigurasi utama:

📁 **`src/config/portfolio.config.ts`**

### 1. Ubah Data Diri & Profil
```typescript
export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: 'Nama Lengkap Anda',
    nickname: 'Panggilan',
    title: 'Software Engineer & Product Designer',
    roles: [
      'Full-Stack Web Developer',
      'Mobile App Specialist (Flutter & React)',
      'UI/UX & Design Systems',
    ],
    statusBadge: 'Open for Full-time Roles & Freelance',
    bioShort: 'Ringkasan singkat tentang keahlian Anda.',
    bioLong: 'Deskripsi lengkap tentang pengalaman dan latar belakang Anda.',
    location: 'Jakarta, Indonesia',
    avatarUrl: '/assets/photos/Photo Profile.png',
    resumePdfUrl: '/assets/certificates/cv-anda.pdf',
  },
  ...
```

### 2. Ubah Kontak & Media Sosial
```typescript
  contact: {
    email: 'emailanda@example.com',
    whatsappNumber: '+6281234567890',
    whatsappLink: 'https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20portfolio%20Anda',
  },
  socialLinks: {
    github: 'https://github.com/username-anda',
    linkedin: 'https://linkedin.com/in/username-anda',
    instagram: 'https://instagram.com/username-anda',
    tiktok: 'https://tiktok.com/@username-anda',
  },
```

### 3. Ganti Audio Musik Lofi / BGM (Hero Widget)
```typescript
  audioPlayer: {
    title: 'Chill Lofi Focus Beats',
    artist: 'Nama Anda • Coding Flow',
    audioUrl: '/assets/audio/coding-focus.mp3',
    coverImageUrl: '/assets/photos/Photo Profile.png',
  },
```

---

## 📂 Mengganti Gambar & Aset (`/public`)

Simpan file foto, logo, CV PDF, dan lagu Anda di folder `/public`:
- **Foto Profil**: Ganti `/public/assets/photos/Photo Profile.png` (atau ubah path di `portfolio.config.ts`).
- **File CV / Resume**: Ganti `/public/assets/certificates/` dengan file PDF Anda.
- **File Musik**: Ganti `/public/assets/audio/coding-focus.mp3` dengan audio MP3 pilihan Anda.

---

## 🛠️ Mode Operasi: Static vs Supabase

### Mode 1: Static Local Mode (Default - Tanpa Database)
Template ini langsung berjalan 100% menggunakan data lokal di:
- `src/config/portfolio.config.ts` (Data utama)
- `src/lib/supabase.ts` (Daftar fallback project, skill, pengalaman, pendidikan, dan sertifikat)

### Mode 2: Dynamic Mode (Supabase + Live GitHub Sync)
Jika ingin mengelola portofolio via Supabase Database dan GitHub API live:
1. Copy `.env.example` menjadi `.env.local`:
   ```env
   NEXT_PUBLIC_GITHUB_USERNAME=username_github_anda
   NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
2. Jalankan query SQL dari file `supabase/schema.sql` di Supabase SQL Editor Anda.

---

## 🚀 Cara Deploy ke Vercel (1-Click)

1. Push repository ini ke GitHub Anda.
2. Buka [Vercel](https://vercel.com) dan klik **Add New Project**.
3. Import repository GitHub Anda.
4. (Opsional) Tambahkan Environment Variables jika menggunakan Supabase.
5. Klik **Deploy** 🎉 Website portofolio langsung online!

---

## 💻 Menjalankan di Lokal (Development)

```bash
# Install dependencies
npm install

# Jalankan server lokal
npm run dev

# Buka di browser
http://localhost:3000
```
