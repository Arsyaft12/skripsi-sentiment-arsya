#!/usr/bin/env python3
"""
BEASTINDEX - Export ML models to JSON for TypeScript.
Extracts centroids, regression coefficients, and scaler params.
"""
import json
import joblib
import numpy as np
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE / "models"
OUT_DIR = BASE / "public" / "data"

def export_models():
    # K-Means
    kmeans = joblib.load(MODELS_DIR / 'kmeans-v1.0.0.joblib')
    k_scaler = joblib.load(MODELS_DIR / 'kmeans-scaler-v1.0.0.joblib')
    
    with open(MODELS_DIR / 'kmeans_archetypes.json', 'r') as f:
        archetypes = json.load(f)
        
    # Regression
    reg = joblib.load(MODELS_DIR / 'marathon-regression-v1.0.0.joblib')
    reg_scaler = joblib.load(MODELS_DIR / 'marathon-scaler-v1.0.0.joblib')
    
    with open(MODELS_DIR / 'marathon_meta.json', 'r') as f:
        reg_meta = json.load(f)
        
    export_data = {
        "kmeans": {
            "version": "kmeans-v1.0.0",
            "centroids": kmeans.cluster_centers_.tolist(),
            "archetypes": archetypes,
            "scaler": {
                "mean": k_scaler.mean_.tolist(),
                "scale": k_scaler.scale_.tolist()
            }
        },
        "regression": {
            "version": reg_meta['model_version'],
            "features": reg_meta['features'],
            "coefficients": reg.coef_.tolist(),
            "intercept": float(reg.intercept_),
            "metrics": reg_meta['metrics'],
            "uncertainty": reg_meta['uncertainty'],
            "scaler": {
                "mean": reg_scaler.mean_.tolist(),
                "scale": reg_scaler.scale_.tolist()
            }
        }
    }
    
    out_path = OUT_DIR / 'ml_models.json'
    with open(out_path, 'w') as f:
        json.dump(export_data, f, indent=2)
        
    print(f"Exported TS-compatible models to {out_path}")

if __name__ == "__main__":
    export_models()
