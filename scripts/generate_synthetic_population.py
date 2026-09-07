#!/usr/bin/env python3
"""
BEASTINDEX - Synthetic Population Generator (Phase 7 & 8)
Generates a statistically valid synthetic population mapping FIT, STRONG, and FAST domains.
"""
import json
import numpy as np
import pandas as pd
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
DATA_DIR = BASE / "data" / "synthetic"
DATA_DIR.mkdir(parents=True, exist_ok=True)

N_SAMPLES = 250000

def generate_synthetic_data(n=N_SAMPLES, seed=42):
    np.random.seed(seed)
    print(f"Generating {n} synthetic individuals...")
    
    # 1. Base Demographics
    age = np.random.triangular(18, 30, 85, n)
    sex = np.random.choice(['M', 'F'], n, p=[0.55, 0.45])
    
    # 2. Latent traits (General Physical Preparedness - GPP, and Specialization)
    gpp = np.random.normal(0, 1, n)
    strength_spec = np.random.normal(0, 1, n)
    endurance_spec = np.random.normal(0, 1, n)
    
    # 3. Derived scores (These represent the underlying 'true' ability in each domain)
    # Strength = GPP + Specialization. Endurance = GPP - 0.5 * Strength Spec + Endurance Spec (Tradeoff)
    strong_score_latent = 0.6 * gpp + 0.8 * strength_spec
    fast_score_latent = 0.6 * gpp - 0.4 * strength_spec + 0.8 * endurance_spec
    fit_score_latent = 0.8 * gpp + 0.2 * strength_spec + 0.2 * endurance_spec
    
    # 4. Map to observable variables
    # Bodyweight is positively correlated with strength and negatively with endurance
    base_bw = np.where(sex == 'M', 80, 65)
    bw = base_bw + 10 * strong_score_latent - 5 * fast_score_latent + np.random.normal(0, 5, n)
    bw = np.clip(bw, 40, 200)
    
    # STRONG (OpenPowerlifting-ish distributions)
    # Squat (kg)
    squat_base = np.where(sex == 'M', 140, 80)
    squat = squat_base + 40 * strong_score_latent + 1.5 * (bw - base_bw) - 0.5 * (age - 30)
    squat = np.clip(squat, 20, 500)
    
    bench = squat * 0.7 + np.random.normal(0, 10, n)
    deadlift = squat * 1.15 + np.random.normal(0, 15, n)
    
    # FAST (Marathon in seconds)
    # Lower is better. Better fast_score_latent -> lower marathon time.
    mara_base = np.where(sex == 'M', 14400, 16200) # 4h vs 4.5h
    marathon_time = mara_base - 3600 * fast_score_latent + 30 * (age - 30) + 20 * (bw - base_bw)
    marathon_time = np.clip(marathon_time, 7200, 36000) # 2h to 10h
    
    # Other FAST metrics
    half_marathon_time = marathon_time / 2.11 + np.random.normal(0, 120, n)
    time_10k = marathon_time / 4.66 + np.random.normal(0, 60, n)
    time_5k = marathon_time / 9.8 + np.random.normal(0, 30, n)
    time_1k = time_5k / 5.2 + np.random.normal(0, 10, n)
    average_pace = (marathon_time / 42.195) / 60 # minutes per km
    
    # Physiology
    vo2max_base = np.where(sex == 'M', 45, 38)
    vo2max = vo2max_base + 8 * fast_score_latent - 0.3 * (age - 30) - 0.2 * (bw - base_bw)
    vo2max = np.clip(vo2max, 20, 85)
    
    resting_hr = 70 - 10 * fast_score_latent + 0.2 * (age - 30) + np.random.normal(0, 5, n)
    resting_hr = np.clip(resting_hr, 35, 100)
    
    max_hr = 220 - age + np.random.normal(0, 5, n)
    max_hr = np.clip(max_hr, 140, 210)
    
    # Training variables for regression
    weekly_km = 30 + 15 * fast_score_latent + np.random.normal(0, 10, n)
    weekly_km = np.clip(weekly_km, 0, 200)
    runs_per_week = np.clip(np.round(weekly_km / 10), 0, 7)
    
    training_consistency = 5 + 2 * gpp + 1 * fast_score_latent + 1 * strong_score_latent + np.random.normal(0, 1, n)
    training_consistency = np.clip(np.round(training_consistency), 1, 10)
    
    sleep_hours = 7 + 0.5 * training_consistency + np.random.normal(0, 1, n)
    sleep_hours = np.clip(np.round(sleep_hours, 1), 4, 10)
    
    overhead_press = bench * 0.65 + np.random.normal(0, 5, n)
    
    # FIT (KSPO)
    situps = 40 + 10 * fit_score_latent - 0.5 * (age - 30) + np.random.normal(0, 5, n)
    situps = np.clip(np.round(situps), 0, 100)
    
    jump = np.where(sex == 'M', 220, 160) + 30 * fit_score_latent - (age - 30) + np.random.normal(0, 10, n)
    jump = np.clip(jump, 50, 400)
    
    reach = 15 + 5 * fit_score_latent - 0.2 * (age - 30) + np.random.normal(0, 5, n)
    reach = np.clip(reach, -30, 40)
    
    df = pd.DataFrame({
        'person_id': range(1, n + 1),
        'age': np.round(age).astype(int),
        'sex': sex,
        'bodyweight': np.round(bw, 1),
        'squat': np.round(squat, 1),
        'bench': np.round(bench, 1),
        'deadlift': np.round(deadlift, 1),
        'overhead_press': np.round(overhead_press, 1),
        'marathon_time': np.round(marathon_time).astype(int),
        'half_marathon_time': np.round(half_marathon_time).astype(int),
        'time_10k': np.round(time_10k).astype(int),
        'time_5k': np.round(time_5k).astype(int),
        'time_1k': np.round(time_1k).astype(int),
        'average_pace': np.round(average_pace, 2),
        'vo2max': np.round(vo2max, 1),
        'resting_hr': np.round(resting_hr).astype(int),
        'max_hr': np.round(max_hr).astype(int),
        'weekly_km': np.round(weekly_km, 1),
        'runs_per_week': runs_per_week.astype(int),
        'training_consistency': training_consistency.astype(int),
        'sleep_hours': sleep_hours,
        'situps': situps.astype(int),
        'jump': np.round(jump, 1),
        'reach': np.round(reach, 1),
    })
    
    out_path = DATA_DIR / 'synthetic_population.csv'
    df.to_csv(out_path, index=False)
    print(f"Saved to {out_path}")
    
    # Validation
    val_path = BASE / "docs" / "SYNTHETIC_VALIDATION.md"
    with open(val_path, "w") as f:
        f.write("# SYNTHETIC VALIDATION REPORT\n\n")
        f.write("Generated using latent factor modeling to ensure appropriate cross-domain correlations.\n\n")
        f.write("## Descriptive Statistics\n")
        f.write(df.describe().to_markdown())
        f.write("\n\n## Key Correlations\n")
        f.write(df[['bodyweight', 'squat', 'marathon_time', 'weekly_km', 'situps']].corr().to_markdown())
    print(f"Validation report saved to {val_path}")

if __name__ == "__main__":
    generate_synthetic_data()
