import subprocess
import os

def main():
    lyx_path = r"c:\Users\LENOVO\Desktop\skripsi-sentimen\Template LYX\TEMPLATE-LYX-SKRIPSI-TI-UCA\TEMPLATE-LYX-SKRIPSI-TI-UCA\SKRIPSI_ARSYA_LYX_FINAL\SKRIPSI_ARSYA_LATEX.lyx"
    
    # 1. Read our current (corrupt) file
    with open(lyx_path, 'r', encoding='utf-8') as f:
        our_content = f.read()
        
    # 2. Get the original version from git
    cmd = ["git", "show", "HEAD:Template LYX/TEMPLATE-LYX-SKRIPSI-TI-UCA/TEMPLATE-LYX-SKRIPSI-TI-UCA/SKRIPSI_ARSYA_LYX_FINAL/SKRIPSI_ARSYA_LATEX.lyx"]
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd=r"c:\Users\LENOVO\Desktop\skripsi-sentimen")
    original_content = result.stdout
    
    print("Our content len:", len(our_content))
    print("Original content len:", len(original_content))
    
    # Compare line endings
    print("Our newlines (first 100 chars):", repr(our_content[:100]))
    print("Original newlines (first 100 chars):", repr(original_content[:100]))
    
    # Let's write the original content back to verify if LyX can open it when restored
    # This is to test if we can fix it by just restoring and doing a clean update
    print("Syntax verification on original:")
    orig_lines = original_content.split('\n')
    print("Original lines count:", len(orig_lines))

if __name__ == '__main__':
    main()
