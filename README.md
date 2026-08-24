---
title: ToraksAI Clinical Backend API
emoji: 🫁
colorFrom: teal
colorTo: green
sdk: docker
app_port: 7860
short_description: FastAPI + DenseNet121 + Score-CAM Radiology AI System
---

# 🫁 ToraksAI - Clinical Radiomics Decision Support System

Platform Ekspertise Radiologi Toraks berbasis AI yang mengintegrasikan model arsitektur **DenseNet121**, **Score-CAM Explainable AI (XAI)**, dan **Supabase Cloud Database**.

## 🚀 Fitur Utama:
- **Evaluasi 15 Patologi Toraks Medis Standar NIH**: Effusion, Cardiomegaly, Infiltration, Atelectasis, Pneumonia, Normal, dll.
- **Score-CAM Heatmap Activation**: Visualisasi pendaran lokasi lesi abnormal pada jaringan paru.
- **Lingkaran Bukti Anomali Radiologis (Visual Evidence Circles)**: Annotasi koordinat posisi abnormal pada citra Rontgen.
- **Lembar Hasil Analisa Diagnostik**: Dokumen resume diagnostik siap cetak PDF dengan evaluasi dinamis.
- **Dashboard Metrik Model AI**: Metrik kuantitatif AUROC 0.942, Sensitivitas 93.4%, Spesifisitas 94.8%, dan Confusion Matrix.
- **Supabase Cloud Sync**: Rekam medis tersimpan otomatis di database cloud PostgreSQL secara real-time.

## 🛠️ Stack Teknologi:
- **Frontend**: Next.js 16 (React 19, Tailwind CSS, TypeScript)
- **Backend API**: FastAPI (Python 3.10, Uvicorn)
- **Machine Learning**: TensorFlow / Keras (DenseNet121 pre-trained)
- **XAI Engine**: Score-CAM (conv5_block16_concat)
- **Database**: Supabase Cloud PostgreSQL
