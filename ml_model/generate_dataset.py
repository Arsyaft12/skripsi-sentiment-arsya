# ml_model/generate_dataset.py
"""
Skrip Generator Dataset Rontgen Toraks Medis (Self-Contained & Reliable).
Menghasilkan dataset citra Rontgen Toraks beresolusi 224x224 piksel
untuk 4 kelas penyakit:
- Cardiomegaly
- Effusion
- Infiltration
- Normal
"""

import os
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

BASE_DIR = Path(__file__).resolve().parent
DATASET_DIR = BASE_DIR / "dataset"
CLASSES = ["Cardiomegaly", "Effusion", "Infiltration", "Normal"]
SAMPLES_PER_CLASS = 40

def generate_chest_xray(class_name: str, seed: int) -> Image.Image:
    """Menghasilkan citra medis Rontgen Toraks sintetis realistis"""
    np.random.seed(seed)
    width, height = 224, 224
    
    # 1. Base Grayscale Chest Background (Paru-paru & Rongga Dada)
    base = np.zeros((height, width), dtype=np.uint8)
    
    # Paru-paru kiri dan kanan (daerah gelap/hawa)
    y, x = np.ogrid[:height, :width]
    left_lung = ((x - 70)**2 / 30**2 + (y - 110)**2 / 60**2) <= 1
    right_lung = ((x - 154)**2 / 30**2 + (y - 110)**2 / 60**2) <= 1
    
    base[left_lung] = 40
    base[right_lung] = 40
    
    # Dinding dada & jaringan lunak (skala abu-abu terang)
    ribs = (np.sin(y / 10.0) * np.cos(x / 15.0) > 0.4) & ((x > 30) & (x < 194))
    base[ribs] = np.clip(base[ribs] + 60, 0, 255)
    
    # Tulang belakang (Spine)
    base[:, 108:116] = 180
    
    # Jantung (Heart Shadow) - Variasi berdasarkan kelas
    heart_radius_x = 45 if class_name == "Cardiomegaly" else 30
    heart_radius_y = 40 if class_name == "Cardiomegaly" else 28
    heart_mask = ((x - 125)**2 / heart_radius_x**2 + (y - 135)**2 / heart_radius_y**2) <= 1
    base[heart_mask] = 200
    
    # Effusion (Cairan di dasar paru-paru)
    if class_name == "Effusion":
        effusion_mask = (y > 150) & ((left_lung) | (right_lung))
        base[effusion_mask] = 190
        
    # Infiltration (Bercak opacity pada jaringan paru-paru)
    if class_name == "Infiltration":
        noise = np.random.randint(0, 100, (height, width), dtype=np.uint8)
        infilt_mask = (left_lung) & (noise > 50)
        base[infilt_mask] = np.clip(base[infilt_mask] + 100, 0, 255)
        
    # Smooth Gaussian blur untuk efek radiologi Rontgen alami
    img = Image.fromarray(base).convert("RGB")
    img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
    return img

def main():
    print("[INFO] Menyiapkan folder dataset Rontgen Toraks...")
    for cls in CLASSES:
        cls_dir = DATASET_DIR / cls
        cls_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"  - Menghasilkan 40 sampel citra medis untuk kelas '{cls}'...")
        for i in range(1, SAMPLES_PER_CLASS + 1):
            img = generate_chest_xray(cls, seed=hash(f"{cls}_{i}") % 1000000)
            img_path = cls_dir / f"{cls}_{i}.png"
            img.save(img_path)
            
    print(f"\n[OK] Dataset Rontgen Toraks berhasil disiapkan di: {DATASET_DIR}")

if __name__ == "__main__":
    main()
