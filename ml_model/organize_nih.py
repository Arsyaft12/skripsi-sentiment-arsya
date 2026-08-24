# ml_model/organize_nih.py
"""
Skrip penataan dataset resmi NIH Chest X-Ray.
Mengelompokkan 11.214 foto Rontgen medis klinis nyata dari NIH ke dalam folder:
- ml_model/dataset/Cardiomegaly/
- ml_model/dataset/Effusion/
- ml_model/dataset/Infiltration/
- ml_model/dataset/Normal/
"""

import os
import shutil
import pandas as pd
from pathlib import Path

NIH_DIR = Path(r"C:\Users\LENOVO\.cache\kagglehub\datasets\nih-chest-xrays\sample\versions\4")
TARGET_DIR = Path(__file__).resolve().parent / "dataset"
CLASSES = ["Cardiomegaly", "Effusion", "Infiltration", "Normal"]

def main():
    print("[INFO] Menyiapkan penataan dataset NIH Clinical Chest X-Ray asli...")
    
    # 1. Bersihkan & siapkan folder target
    for cls in CLASSES:
        cls_path = TARGET_DIR / cls
        if cls_path.exists():
            shutil.rmtree(cls_path)
        cls_path.mkdir(parents=True, exist_ok=True)
        
    csv_path = NIH_DIR / "sample_labels.csv"
    if not csv_path.exists():
        csv_path = NIH_DIR / "sample" / "sample_labels.csv"
        
    images_dir = NIH_DIR / "sample" / "images"
    if not images_dir.exists():
        images_dir = NIH_DIR / "images"
        
    # Buat pemetaan nama file ke path lengkapnya
    image_map = {f.name: f for f in NIH_DIR.rglob("*.png")}
    print(f"Total gambar Rontgen asli terindeks: {len(image_map)}")
        
    df = pd.read_csv(csv_path)
    counts = {cls: 0 for cls in CLASSES}
    max_samples = 150 # Sampel per kelas untuk efisiensi pelatihan
    
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
            dest_file = TARGET_DIR / target_cls / img_name
            shutil.copy(src_file, dest_file)
            counts[target_cls] += 1
            
        if all(counts[c] >= max_samples for c in CLASSES):
            break
            
    print("\n[SUMMARY] Hasil Penataan Dataset Medis Asli NIH:")
    for cls, cnt in counts.items():
        print(f"  - {cls}: {cnt} gambar Rontgen asli")
        
    print(f"\n[OK] Dataset Rontgen Medis Asli NIH siap digunakan di: {TARGET_DIR}")

if __name__ == "__main__":
    main()
