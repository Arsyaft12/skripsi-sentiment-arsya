#!/usr/bin/env python3
"""
BEASTINDEX - Marathon Linear Regression (Phase 10 & 21 & 22)
Trains a regression model to predict marathon times, preventing data leakage.
"""
import json
import numpy as np
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
import joblib

BASE = Path(__file__).resolve().parent.parent
DATA_DIR = BASE / "data" / "synthetic"
MODELS_DIR = BASE / "models"
MODELS_DIR.mkdir(parents=True, exist_ok=True)

TARGET = 'marathon_time'

def check_leakage(features):
    # Rule 22: automated leakage checker
    # We must ensure that target or transformations of the target are not in features.
    forbidden = ['marathon', 'pace', 'split', 'rank', 'percentile', 'seconds']
    leakage_found = False
    for f in features:
        if any(bad in f.lower() for bad in forbidden) and f != TARGET:
            print(f"LEAKAGE WARNING: Feature '{f}' might contain target leakage.")
            leakage_found = True
            
    print(f"LEAKAGE AUDIT\nTarget: {TARGET}\nFeatures checked: {len(features)}\nPotential leakage: {int(leakage_found)}\nStatus: {'FAIL' if leakage_found else 'PASS'}\n")
    if leakage_found:
        raise ValueError("Data leakage detected! Training aborted.")

def train_regression():
    df = pd.read_csv(DATA_DIR / 'synthetic_population.csv')
    
    # We will predict marathon time using available non-leaky features.
    df['is_male'] = (df['sex'] == 'M').astype(int)
    
    features = [
        'age', 'is_male', 'bodyweight', 'squat', 
        'weekly_km', 'runs_per_week', 
        'vo2max', 'resting_hr', 'sleep_hours', 'training_consistency'
    ]
    
    check_leakage(features)
    
    # 70/15/15 split
    X = df[features]
    y = df[TARGET]
    
    X_temp, X_test, y_temp, y_test = train_test_split(X, y, test_size=0.15, random_state=42)
    X_train, X_val, y_train, y_val = train_test_split(X_temp, y_temp, test_size=0.1765, random_state=42) # 0.1765 of 0.85 is ~0.15
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    model = Ridge(alpha=1.0, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    y_pred = model.predict(X_test_scaled)
    
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)
    
    # Baselines
    y_baseline_mean = np.full_like(y_test, y_train.mean())
    y_baseline_median = np.full_like(y_test, y_train.median())
    
    mae_mean = mean_absolute_error(y_test, y_baseline_mean)
    mae_median = mean_absolute_error(y_test, y_baseline_median)
    
    print("--- MODEL PERFORMANCE ---")
    print(f"Model MAE: {mae:.2f}s | RMSE: {rmse:.2f}s | R2: {r2:.3f}")
    print(f"Mean Baseline MAE: {mae_mean:.2f}s")
    print(f"Median Baseline MAE: {mae_median:.2f}s")
    
    # Calculate empirical residuals for prediction intervals (95%)
    residuals = y_test - y_pred
    margin_error = np.percentile(np.abs(residuals), 95)
    
    joblib.dump(model, MODELS_DIR / 'marathon-regression-v1.0.0.joblib')
    joblib.dump(scaler, MODELS_DIR / 'marathon-scaler-v1.0.0.joblib')
    
    meta = {
        'model_version': 'marathon-regression-v1.0.0',
        'features': features,
        'metrics': {
            'mae': float(mae),
            'rmse': float(rmse),
            'r2': float(r2)
        },
        'uncertainty': {
            'margin_95_seconds': float(margin_error)
        }
    }
    
    with open(MODELS_DIR / 'marathon_meta.json', 'w') as f:
        json.dump(meta, f, indent=2)
        
    print(f"Saved model and metadata to {MODELS_DIR}")

if __name__ == "__main__":
    train_regression()
