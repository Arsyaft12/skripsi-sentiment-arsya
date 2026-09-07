# DATA DICTIONARY

| Name | Type | Unit | Description | Source | Allowed Range | Missing Behavior | Derived/Original | Privacy Concern |
|------|------|------|-------------|--------|---------------|------------------|------------------|-----------------|
| `age` | Integer | Years | Subject's age at time of measurement | User/Dataset | 14-90 | Drop row if missing | Original | Low |
| `sex` | String | M/F | Subject's biological sex | User/Dataset | M, F | Drop row if missing | Original | Low |
| `bodyweight` | Float | kg | Subject's bodyweight | User/Dataset | 30-250 | Drop row if missing | Original | Low |
| `squat` | Float | kg | 1RM or estimated 1RM for Barbell Squat | User/Dataset | 0-600 | Treated as null/0 | Derived (if reps > 1) | Low |
| `bench` | Float | kg | 1RM or estimated 1RM for Barbell Bench Press | User/Dataset | 0-450 | Treated as null/0 | Derived (if reps > 1) | Low |
| `deadlift` | Float | kg | 1RM or estimated 1RM for Barbell Deadlift | User/Dataset | 0-550 | Treated as null/0 | Derived (if reps > 1) | Low |
| `marathon_time` | Float | seconds | Marathon finish time | User/Dataset | > 7200 | Excluded from evaluation | Original | Low |
| `riegel_marathon` | Float | seconds | Riegel-equivalent marathon time | Model | > 7200 | N/A | Derived | Low |
| `situps` | Integer | reps | Sit-ups in 1 minute | KSPO/User | 0-100 | N/A | Original | Low |
| `jump` | Float | cm | Standing broad jump distance | KSPO/User | 0-400 | N/A | Original | Low |
| `reach` | Float | cm | Sit-and-reach flexibility | KSPO/User | -50 to +50 | N/A | Original | Low |
| `dots_score` | Float | points | DOTS normalized strength score | Formula | 0-800 | N/A | Derived | Low |
