#!/usr/bin/env python3
"""
BEASTINDEX - K-Means Athlete Profiler (Phase 9)
Trains K-Means clustering on the synthetic population to discover athlete archetypes.
"""
import json
import numpy as np
import pandas as pd
from pathlib import Path
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score, calinski_harabasz_score, davies_bouldin_score, adjusted_rand_score
import joblib

BASE = Path(__file__).resolve().parent.parent
DATA_DIR = BASE / "data" / "synthetic"
MODELS_DIR = BASE / "models"
MODELS_DIR.mkdir(parents=True, exist_ok=True)

def dots_coeff(bw, sex):
    # Simplified DOTS approximation for synthetic scoring purposes
    # In production, empirical curves are used. Here we just standardize the strength.
    return 1.0 # Placeholder for this script, we'll just standardize the raw lifts directly

def load_and_preprocess():
    df = pd.read_csv(DATA_DIR / 'synthetic_population.csv')
    
    # We need a FIT, STRONG, and FAST feature.
    # We will normalize them such that higher is better.
    
    # STRONG: Sum of lifts
    df['strong_total'] = df['squat'] + df['bench'] + df['deadlift'] + df.get('overhead_press', 0)
    
    # FAST: Inverse of marathon time
    df['fast_speed'] = 1 / df['marathon_time']
    
    # FIT: Average of z-scores of situps, jump, reach
    for col in ['situps', 'jump', 'reach']:
        df[col + '_z'] = (df[col] - df[col].mean()) / df[col].std()
    df['fit_total'] = df['situps_z'] + df['jump_z'] + df['reach_z']
    
    features = ['strong_total', 'fast_speed', 'fit_total']
    
    scaler = StandardScaler()
    X = scaler.fit_transform(df[features])
    
    return df, X, scaler, features

def evaluate_k(X, max_k=6):
    # Use a subset for faster silhouette score
    X_sample = X[np.random.choice(X.shape[0], 10000, replace=False)]
    
    results = []
    for k in range(2, max_k + 1):
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        labels_sample = kmeans.fit_predict(X_sample)
        
        sil = silhouette_score(X_sample, labels_sample)
        ch = calinski_harabasz_score(X_sample, labels_sample)
        db = davies_bouldin_score(X_sample, labels_sample)
        
        results.append({'k': k, 'silhouette': sil, 'calinski_harabasz': ch, 'davies_bouldin': db})
        print(f"K={k}: Silhouette={sil:.3f}, CH={ch:.1f}, DB={db:.3f}")
        
    return results

def train_and_save(X, scaler, df, features, k=4):
    print(f"\nTraining final K-Means with K={k}")
    
    # Stability test
    seeds = [42, 123, 2026, 3407, 7777]
    labels_all = []
    for seed in seeds:
        kmeans = KMeans(n_clusters=k, random_state=seed, n_init=10)
        labels_all.append(kmeans.fit_predict(X))
        
    ari_scores = []
    for i in range(1, len(seeds)):
        ari_scores.append(adjusted_rand_score(labels_all[0], labels_all[i]))
    
    mean_ari = np.mean(ari_scores)
    print(f"Mean Adjusted Rand Index (Stability): {mean_ari:.3f}")
    
    # Final Model
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(X)
    
    # Save model and scaler
    joblib.dump(kmeans, MODELS_DIR / 'kmeans-v1.0.0.joblib')
    joblib.dump(scaler, MODELS_DIR / 'kmeans-scaler-v1.0.0.joblib')
    
    # Interpret Centroids
    centroids = kmeans.cluster_centers_
    archetypes = []
    for i, center in enumerate(centroids):
        # Interpret based on z-scores
        s, f, ft = center
        profile = "Mixed"
        if s > 0.5 and f < -0.5:
            profile = "Strength Dominant"
        elif f > 0.5 and s < -0.5:
            profile = "Endurance Dominant"
        elif s > 0.5 and f > 0.5 and ft > 0.5:
            profile = "Balanced Athlete"
        elif s < -0.5 and f < -0.5 and ft < -0.5:
            profile = "Developing Athlete"
        else:
            if s > f and s > ft: profile = "Strength Biased"
            elif f > s and f > ft: profile = "Endurance Biased"
            else: profile = "Fitness Biased"
            
        archetypes.append({
            'cluster': i,
            'label': profile,
            'centroid': {'strong': float(s), 'fast': float(f), 'fit': float(ft)}
        })
        
    with open(MODELS_DIR / 'kmeans_archetypes.json', 'w') as f:
        json.dump(archetypes, f, indent=2)
        
    print(f"Saved model and archetypes to {MODELS_DIR}")

if __name__ == "__main__":
    df, X, scaler, features = load_and_preprocess()
    print("Evaluating K...")
    evaluate_k(X)
    # Based on general fitness data, K=4 usually provides a good split (Strength, Endurance, Balanced, Developing)
    train_and_save(X, scaler, df, features, k=4)
