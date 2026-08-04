import os
import re

def italicize_tech_words(text):
    tech_words = [
        r'e-commerce', r'datasets', r'dataset', r'pipeline', r'preprocessing',
        r'case folding', r'stopword removal', r'stemming', r'white box testing',
        r'cross validation', r'cross-validation', r'REST API', r'endpoints', r'endpoint',
        r'ai', r'dashboard', r'real-time', r'fallback', r'Gemini API', r'SQLite',
        r'server', r're-started', r'restart', r'GridSearchCV', r'stopword', r'stopwords',
        r'usability', r'heuristic evaluation', r'User Acceptance Testing', r'web scraping',
        r'fine-tuning', r'IndoBERT', r'class_weight balanced', r'deployment',
        r'load testing', r'response time', r'self-hosted', r'LLM', r'Transformer',
        r'LinearSVC', r'random seed', r'accuracy', r'precision', r'recall', r'F1-score',
        r'black box testing', r'boundary', r'usability'
    ]
    
    # Sort by length descending
    tech_words.sort(key=len, reverse=True)
    
    # We will format technical words as \emph on word \emph default
    for word in tech_words:
        pattern = re.compile(r'\b(' + re.escape(word) + r')\b', re.IGNORECASE)
        text = pattern.sub(r'\\emph on \1\\emph default ', text)
        
    text = re.sub(r'\s+', ' ', text)
    text = text.replace(r'\emph default \emph on', '')
    
    # Clean up any double formatting
    text = re.sub(r'\\emph\s+on\s+\\emph\s+on', r'\\emph on', text)
    text = re.sub(r'\\emph\s+default\s+\\emph\s+default', r'\\emph default', text)
    return text

def convert_to_lyx_layout(layout_type, text):
    text_formatted = italicize_tech_words(text)
    # We keep standard quotes as ASCII ' and " which are perfectly valid in LyX plain text layout content!
    lyx = []
    lyx.append(f"\\begin_layout {layout_type}")
    lyx.append(text_formatted)
    lyx.append("\\end_layout")
    return "\n".join(lyx)

def main():
    lyx_path = r"c:\Users\LENOVO\Desktop\skripsi-sentimen\Template LYX\TEMPLATE-LYX-SKRIPSI-TI-UCA\TEMPLATE-LYX-SKRIPSI-TI-UCA\SKRIPSI_ARSYA_LYX_FINAL\SKRIPSI_ARSYA_LATEX.lyx"
    extracted_path = r"c:\Users\LENOVO\Desktop\skripsi-sentimen\Template LYX\TEMPLATE-LYX-SKRIPSI-TI-UCA\bab5_extracted.txt"
    
    # 1. Revert to original version
    import subprocess
    subprocess.run(["git", "checkout", "--", lyx_path], cwd=r"c:\Users\LENOVO\Desktop\skripsi-sentimen")
    print("Reverted to original.")
    
    # 2. Parse extracted revised Bab 5
    with open(extracted_path, 'r', encoding='utf-8') as f:
        extracted_content = f.read()
    lines = [line.strip() for line in extracted_content.split('\n') if line.strip()]
    
    new_lyx_paragraphs = []
    new_lyx_paragraphs.append("\\begin_layout Chapter\nKesimpulan\n\\end_layout")
    
    for line in lines:
        if line.lower() in ["bab 5", "kesimpulan"] and not new_lyx_paragraphs:
            continue
        if line.startswith("5.1 Kesimpulan"):
            new_lyx_paragraphs.append("\\begin_layout Section\nKesimpulan\n\\end_layout")
            continue
        if line.startswith("Temuan Tambahan di Luar Rumusan Masalah"):
            new_lyx_paragraphs.append("\\begin_layout Standard\n\\series bold\nTemuan Tambahan di Luar Rumusan Masalah\n\\end_layout")
            continue
        if line.startswith("5.2 Threats to Validity"):
            new_lyx_paragraphs.append("\\begin_layout Section\nThreats to Validity\n\\end_layout")
            continue
        if line.startswith("5.2.1 Validitas Internal"):
            new_lyx_paragraphs.append("\\begin_layout Subsection\nValiditas Internal\n\\end_layout")
            continue
        if line.startswith("5.2.2 Validitas Eksternal"):
            new_lyx_paragraphs.append("\\begin_layout Subsection\nValiditas Eksternal\n\\end_layout")
            continue
        if line.startswith("5.2.3 Validitas Konstruk"):
            new_lyx_paragraphs.append("\\begin_layout Subsection\nValiditas Konstruk\n\\end_layout")
            continue
        if line.startswith("5.3 Saran"):
            new_lyx_paragraphs.append("\\begin_layout Section\nSaran\n\\end_layout")
            continue
        if line.startswith("DAFTAR PUSTAKA") or line.startswith("Daftar Pustaka"):
            break
            
        match_list = re.match(r'^(\d+)\.\s+(.*)', line)
        if match_list:
            num = match_list.group(1)
            rest_text = match_list.group(2)
            new_lyx_paragraphs.append(convert_to_lyx_layout("Quote", f"{num}. {rest_text}"))
        else:
            new_lyx_paragraphs.append(convert_to_lyx_layout("Standard", line))
            
    # Load original LyX
    with open(lyx_path, 'r', encoding='utf-8') as f:
        lyx_content = f.read()
        
    chapter_start_marker = "\\begin_layout Chapter\nKesimpulan\n\\end_layout"
    chapter_end_marker = "\\begin_layout Chapter*\nDaftar Pustaka"
    
    start_idx = lyx_content.find(chapter_start_marker)
    end_idx = lyx_content.find(chapter_end_marker)
    
    if start_idx == -1 or end_idx == -1:
        print("Error: Boundaries not found")
        return
        
    # Reconstruct LyX file with updated Chapter 5
    new_chapter_text = "\n\n".join(new_lyx_paragraphs) + "\n\n"
    lyx_updated = lyx_content[:start_idx] + new_chapter_text + lyx_content[end_idx:]
    
    # 3. Apply the BibTeX references update
    marker_bib = "\\begin_layout Chapter*\nDaftar Pustaka\n\\end_layout"
    idx_bib = lyx_updated.find(marker_bib)
    ert_end_marker = "\\backslash\naddcontentsline{toc}{chapter}{Daftar Pustaka}\n\\end_layout\n\n\\end_inset"
    ert_idx = lyx_updated.find(ert_end_marker, idx_bib)
    list_start_idx = lyx_updated.find("\\begin_layout Standard", ert_idx)
    end_body_marker = "\\end_body\n\\end_document"
    end_body_idx = lyx_updated.find(end_body_marker, list_start_idx)
    
    bibtex_inset = """\\begin_layout Standard
\\begin_inset CommandInset bibtex
LatexCommand bibtex
bibfiles "bibtex"
options "apalike"

\\end_inset


\\end_layout
"""
    
    final_lyx_content = lyx_updated[:list_start_idx] + bibtex_inset + "\n" + lyx_updated[end_body_idx:]
    
    with open(lyx_path, 'w', encoding='utf-8') as f:
        f.write(final_lyx_content)
    print("Successfully updated LyX file with both Chapter 5 and BibTeX references!")

if __name__ == '__main__':
    main()
