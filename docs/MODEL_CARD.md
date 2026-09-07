# MODEL CARD

## General Information
- **Model Name:** BEASTINDEX Athlete Profiler (K-Means) & Marathon Predictor (Linear Regression)
- **Version:** v1.0.0
- **Purpose:** To classify user fitness into archetypes and estimate marathon performance.

## Training Data
- **Source:** Synthetic Population (generated from empirical marginal distributions and correlation constraints).
- **Features (K-Means):** FIT Score, STRONG Score, FAST Score.
- **Features (Regression):** age, sex, weekly_km, runs_per_week, average_pace, resting_hr, bodyweight, etc.
- **Target (Regression):** marathon_time (seconds).

## Algorithm
- **Clustering:** K-Means with multiple seed initialization and stability checks.
- **Regression:** Ordinary Least Squares (OLS) Linear Regression, with Ridge regularization if necessary.

## Metrics
- **Clustering:** Silhouette Score, Calinski-Harabasz, Davies-Bouldin, Adjusted Rand Index (for stability).
- **Regression:** MAE, RMSE, R² against a holdout test set (15%). Baseline comparison against Mean and Riegel estimates.

## Validation Strategy
- 70% Train, 15% Validation, 15% Test split.
- Group leakage prevented (no overlapping athlete IDs).
- Leakage Audit blocks training if `marathon_time` derivations are in features.

## Subgroup Performance
- Monitored across Sex and Age Bins. Will document any significant bias (e.g. if the model over-estimates marathon times for women over 50 compared to men).

## Limitations
- Predictions are based on a synthetic dataset which approximates real-world correlations but cannot perfectly capture all human physiological variance.
- OOD Inputs (e.g. running 500km/week) will result in unreliable predictions.

## Intended Use
- Fitness benchmarking and recreational goal-setting.

## Not Intended Use
- Medical diagnosis, professional race qualification screening, or absolute guarantees of performance.
