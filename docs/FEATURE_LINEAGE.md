# FEATURE LINEAGE

This document traces the origin of every feature used in the BEASTINDEX ML V2 platform.

```text
age
← user input / dataset

sex
← user input / dataset

bodyweight
← user input / dataset

squat
← user input / dataset

bench
← user input / dataset

deadlift
← user input / dataset

dots_score
← squat / bench / deadlift + bodyweight + sex (via Kopayev et al. 2020 formula)

relative_strength
← (squat / bench / deadlift) / bodyweight

STRONG score
← empirical percentile curve from OpenPowerlifting (DOTS distribution)

5k_time
← user input

10k_time
← user input

half_marathon_time
← user input

marathon_time
← user input / NYC Marathon dataset

riegel_marathon_seconds
← distance_time * (42195 / original_distance)^1.06

FAST score
← empirical percentile curve from NYC Marathon (finish time distribution)

situps
← user input / KSPO dataset

jump
← user input / KSPO dataset

reach
← user input / KSPO dataset

FIT score
← empirical percentile curve from KSPO (metric distribution)

BEASTINDEX score
← Average(FIT score, STRONG score, FAST score)
```
