# BEASTINDEX ML V2 - AUDIT REPORT

## 1. Current Architecture
- **Framework:** Next.js 16 (App Router) with TypeScript and Tailwind CSS v4.
- **Frontend:** React components (`app/`, `components/Beast.tsx`) with dynamic client-side interactivity.
- **Backend/API:** Next.js Route Handlers (`app/api/score/route.ts`).
- **Scoring Engine:** Precomputed empirical percentile curves (`reference.json` and `countries.json`) loaded on the server and passed as props, ensuring no additional client round trips. The core logic is in `lib/scoring.ts`.
- **Data Processing:** Python scripts in `data/` (e.g., `build_reference.py`, `clean_strength.py`) that generate `reference.json`.

## 2. Current Data Sources
- **STRONG (Barbell):** OpenPowerlifting (2.3M+ rows, competitive lifters).
- **FAST (Running):** NYC Marathon 2025 finishers (56k rows) + NHANES VO2max (general population).
- **FIT (General):** Korea Sports Promotion Foundation (KSPO) dataset (sit-ups, broad jump, sit-and-reach).

## 3. Current Scoring Method
- **Methodology:** Lookup against empirical percentile curves.
- **STRONG:** Lifts are adjusted using the DOTS coefficient (removing bodyweight and sex bias) and compared against age-band percentiles.
- **FAST:** Distances (5K, 10K, Half) are converted to marathon-equivalents using Riegel's formula (T2 = T1 * (D2/D1)^1.06) before percentile lookup.
- **Bucketing:** Average percentile determines the Tier (0, 20, 40, 62, 80, 93) which maps to an Animal Archetype.

## 4. Current ML Components
- **In Production:** None. The system currently relies purely on empirical statistics and static table lookups.
- **Attempted/Rejected:** A two-stratum mixture model was tested for STRONG to convert competitive pools to general pools using NHANES physical activity rates (p=43%). It produced impossible distributions (compressing competitive lifters into the 57-100th percentile) and was disabled (`POOL_MIXTURE_ENABLED = false`).

## 5. Existing Strengths
- **Speed & Reliability:** The precomputed `reference.json` approach is extremely fast and robust.
- **Data Integrity:** Real datasets are used for the primary benchmarking. The data cleaning scripts (`clean_strength.py`) handle edge cases well (e.g., dropping negative failed attempts).
- **Transparency:** The UI provides explicit text explaining exactly which cohort a user is compared against (e.g., "Compared against 6,216 men aged 25-29 at 60-70 kg").

## 6. Existing Weaknesses
- **Cross-Domain Profiling:** No single dataset exists containing STRONG, FAST, and FIT data for the same individuals, blocking K-Means clustering implementation.
- **Prediction:** No real predictive model for marathon times; relies solely on Riegel's formula, which assumes marathon-appropriate endurance for all runners.
- **Population Bias:** Comparing casual gym-goers against OpenPowerlifting competitors results in severely deflated percentiles for the general public.

## 7. Placeholder Data
- The old prototypes (`web/` and `Beast/`) contained hardcoded `base` and `sd` values. The current Next.js implementation correctly uses `reference.json`.
- There are still "placeholder frames" for 21 missing animal illustrations in the UI.

## 8. Data Leakage Risks
- **Current Risk:** Low, as no ML models are actively training.
- **Future Risk (Regression):** High. When predicting `marathon_time`, we must strictly exclude variables like `marathon_pace`, `marathon_split`, or any future-derived information.

## 9. Population Bias Risks
- **OpenPowerlifting:** Represents a self-selected, highly competitive population. A 60th percentile lifter here is likely a 95th percentile lifter in the general population.
- **NYC Marathon:** Represents people fit enough to finish a marathon, skewing endurance percentiles compared to the general public.

## 10. Technical Debt
- Legacy files in `web/` and `Beast/` that might confuse new developers, though they serve as reference.
- Missing Supabase integration (POIN 2 from the old plan) for collecting user submissions.

## 11. Recommended Migration Plan
Following the Master Prompt, the migration should be executed in these high-level phases:
1. **Data Registry & Lineage:** Formalize dataset provenance and definitions.
2. **Synthetic Data Generation:** Build a statistically sound synthetic population representing all 3 arenas to unblock K-Means.
3. **ML Modeling:** Train K-Means (Archetypes) and Linear Regression (Marathon Prediction) with strict leakage checks.
4. **API & Engine Upgrade:** Update `/api/score` and `lib/scoring.ts` to integrate ML predictions, uncertainty, and benchmark rankings.
5. **UI/UX Enhancement:** Update `components/Beast.tsx` to surface predictions, warnings (OOD), and clear data provenance.

## 12. Files That Will Be Changed
- `app/api/score/route.ts` (API contract expansion)
- `lib/scoring.ts` (Integration of predictions and clusters)
- `lib/types.ts` (Type definitions for new model outputs)
- `components/Beast.tsx` (UI updates)
- `scripts/` (New pipeline, synthetic data, and training scripts)
- `docs/` (Extensive documentation as required)

## 13. Files That Must Not Be Broken
- The existing Next.js App Router setup (`app/page.tsx`, `app/layout.tsx`).
- The empirical percentile logic (`data/build_reference.py`, though it may be augmented).
- The Tailwind v4 design system (`app/globals.css`).
