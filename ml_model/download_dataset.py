# ml_model/download_dataset.py
"""
Skrip otomatis pengunduhan & pengorganisasian Dataset Rontgen Toraks Resmi NIH dari Kaggle.
Dataset diunduh menggunakan library official 'kagglehub' (nih-chest-xrays/sample)
dan ditata ke dalam folder:
- ml_model/dataset/Cardiomegaly/
- ml_model/dataset/Effusion/
- ml_model/dataset/Infiltration/
- ml_model/dataset/Normal/
"""

import os
import shutil
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
TARGET_DATASET_DIR = BASE_DIR / "dataset"
CLASSES = ["Cardiomegaly", "Effusion", "Infiltration", "Normal"]

def setup_directory_structure():
    """Membuat folder target kelas jika belum ada atau membersihkannya"""
    print("[INFO] Menyiapkan struktur folder dataset...")
    for cls in CLASSES:
        cls_dir = TARGET_DATASET_DIR / cls
        if cls_dir.exists():
            shutil.rmtree(cls_dir)
        cls_dir.mkdir(parents=True, exist_ok=True)
    print("[OK] Folder dataset disiapkan!")

def download_kaggle_nih_dataset():
    """Mengunduh dataset NIH Chest X-Ray dari Kaggle via kagglehub"""
    print("\n[INFO] Mengunduh dataset NIH Chest X-Ray dari Kaggle via kagglehub...")
    try:
        import kagglehub
        download_path = kagglehub.dataset_download("nih-chest-xrays/sample")
        print(f"[OK] Kagglehub berhasil mengunduh dataset ke: {download_path}")
        return Path(download_path)
    except Exception as e:
        print(f"[ERROR] Gagal mengunduh otomatis dari Kaggle via kagglehub: {e}")
        return None

def organize_nih_images(nih_path: Path):
    """Menata gambar Rontgen asli NIH ke dalam struktur folder kelas"""
    if not nih_path or not nih_path.exists():
        print("[ERROR] Path sumber dataset NIH Kaggle tidak ditemukan.")
        return

    print("\n[INFO] Menata foto Rontgen klinis asli NIH ke folder kelas...")
    
    csv_path = nih_path / "sample_labels.csv"
    if not csv_path.exists():
        csv_path = nih_path / "sample" / "sample_labels.csv"
        
    image_map = {f.name: f for f in nih_path.rglob("*.png")}
    print(f"Total gambar Rontgen asli terindeks: {len(image_map)}")

    if not csv_path.exists():
        print(f"[ERROR] CSV label tidak ditemukan di: {csv_path}")
        return

    df = pd.read_csv(csv_path)
    counts = {cls: 0 for cls in CLASSES}
    max_samples = 150

    for _, row in df.iterrows():
        img_name = row['Image Index']
        labels = str(row['Finding Labels'])
        
        src_file = image_map.get(img_name)
        if not src_file or not src_file.exists():
            continue
            
        target_cls = None
        if "Cardiomegaly" in labels and counts["Cardiomegaly"] < max_samples:
            target_cls = "Cardiomegaly"
        elif "Effusion" in labels and counts["Effusion"] < max_samples:
            target_cls = "Effusion"
        elif "Infiltration" in labels and counts["Infiltration"] < max_samples:
            target_cls = "Infiltration"
        elif labels == "No Finding" and counts["Normal"] < max_samples:
            target_cls = "Normal"
            
        if target_cls:
            dest_file = TARGET_DATASET_DIR / target_cls / img_name
            shutil.copy(src_file, dest_file)
            counts[target_cls] += 1
            
        if all(counts[c] >= max_samples for c in CLASSES):
            break

    print("\n[SUMMARY] Hasil Penataan Dataset Medis Asli NIH:")
    for cls, cnt in counts.items():
        print(f"  - {cls}: {cnt} foto Rontgen asli")
    
    print(f"\n[OK] Dataset Rontgen Toraks Medis Asli NIH siap digunakan di: {TARGET_DATASET_DIR}")

if __name__ == "__main__":
    setup_directory_structure()
    nih_path = download_kaggle_nih_dataset()
    if nih_path:
        organize_nih_images(nih_path)

