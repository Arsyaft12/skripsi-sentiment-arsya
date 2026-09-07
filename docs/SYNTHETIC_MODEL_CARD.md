# SYNTHETIC MODEL CARD

## Purpose
To generate a cross-domain fitness population (FIT + STRONG + FAST) for the same individuals, enabling the training of K-Means clustering and predictive regression models, which is impossible with disjoint public datasets.

## Generation Method
- Sampling from empirical marginal distributions (NHANES, OpenPowerlifting, KSPO, NYC Marathon).
- Using statistical correlation constraints (e.g., Gaussian Copula) to link variables.

## Source Distributions
- KSPO (FIT)
- OpenPowerlifting (STRONG)
- NHANES (VO2max, Bodyweight, Grip)
- NYC Marathon (FAST)

## Assumptions
- General physical preparedness (GPP) creates positive correlations across domains up to a certain point, after which specialization creates negative correlations (e.g., extreme powerlifters tend to have poor marathon times).
- Age affects all metrics monotonically after peak years (typically 25-35).

## Variables
- `age`, `sex`, `bodyweight`, `height`
- `squat`, `bench`, `deadlift`
- `marathon_time`, `weekly_km`, `average_pace`, `vo2max`
- `situps`, `jump`, `reach`

## Limitations
- Synthetic data cannot capture the "messiness" or unknown latent factors of the real world.
- Cannot be used to establish true world records or claim real-world population percentiles.

## Validation Results
- Validated against empirical distributions for marginal fit (KS test, Wasserstein distance).

## Allowed Use
- Training K-Means and preliminary regression models.
- Demonstrating cross-domain scoring logic.

## Forbidden Use
- Presenting the synthetic dataset as a real-world survey.
- Using synthetic distributions as the baseline for the empirical percentiles in production.
