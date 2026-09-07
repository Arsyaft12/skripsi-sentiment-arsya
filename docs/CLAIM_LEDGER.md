# CLAIM LEDGER

Setiap klaim yang muncul di UI harus dapat ditelusuri.

---

```text
Claim:
"You are stronger than X% of competitive lifters."

Source:
OpenPowerlifting

Method:
DOTS percentile look-up

Population:
Competitive lifters

Sample:
N = 2,373,441

Model version:
strong-v1.0.0
```

---

```text
Claim:
"Estimated benchmark: #X of 56,456."

Source:
NYC Marathon 2025

Method:
Predicted marathon time / Riegel converted time → empirical percentile

Status:
ESTIMATED

Model version:
fast-v1.0.0
```

---

```text
Claim:
"PROFILE: Strength Dominant"

Source:
Synthetic Population (N=100,000+)

Method:
K-Means Clustering on [FIT, STRONG, FAST] score vector

Status:
ESTIMATED

Model version:
kmeans-v1.0.0
```

---

```text
Claim:
"Predicted Marathon Time: XX:XX:XX"

Source:
Synthetic Training Population

Method:
Linear Regression on running + physiological + training variables

Status:
PREDICTED

Model version:
marathon-regression-v1.0.0
```
