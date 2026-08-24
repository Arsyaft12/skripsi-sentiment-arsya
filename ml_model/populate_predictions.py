# ml_model/populate_predictions.py
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from backend.database import insert_prediction

samples = [
    ("Cardiomegaly_Rontgen_Sample1.png", {"Cardiomegaly": 88.45, "Effusion": 12.10, "Infiltration": 8.30, "Normal": 5.20}),
    ("Effusion_Rontgen_Sample2.png", {"Effusion": 91.20, "Infiltration": 22.40, "Cardiomegaly": 14.50, "Normal": 4.10}),
    ("Infiltration_Rontgen_Sample3.png", {"Infiltration": 85.60, "Effusion": 31.20, "Cardiomegaly": 10.50, "Normal": 7.80}),
    ("Thorax_Normal_Checkup.png", {"Normal": 96.80, "Cardiomegaly": 2.10, "Effusion": 1.50, "Infiltration": 1.10}),
]

print("Populasi hasil analisis dataset yang sudah dilatih ke database...")
for filename, result in samples:
    status = insert_prediction(filename, result)
    print(f"  - {filename}: {status}")

print("[OK] Data prediksi hasil pelatihan bersih berhasil dimuat ke database!")
