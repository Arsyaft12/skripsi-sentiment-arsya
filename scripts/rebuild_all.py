#!/usr/bin/env python3
"""
BEASTINDEX - Rebuild All Pipeline
Executes the full data and ML pipeline: Synthetic Generation -> K-Means Training -> Regression Training.
Note: Empirical data generation is handled by data/build_reference.py. This script handles the ML aspects.
"""
import subprocess
from pathlib import Path
import sys

BASE = Path(__file__).resolve().parent

def run_script(name):
    script_path = BASE / name
    print(f"\n======================================")
    print(f"Running {name}...")
    print(f"======================================\n")
    # Determine the python executable based on venv
    venv_python = BASE.parent / ".venv" / "Scripts" / "python.exe"
    if not venv_python.exists():
        venv_python = "python"
    
    result = subprocess.run([str(venv_python), str(script_path)])
    if result.returncode != 0:
        print(f"Error executing {name}!")
        sys.exit(1)

def main():
    print("Starting BEASTINDEX ML Pipeline...\n")
    
    run_script("generate_synthetic_population.py")
    run_script("train_kmeans.py")
    run_script("train_regression.py")
    
    print("\n✅ Pipeline completed successfully!")

if __name__ == "__main__":
    main()
