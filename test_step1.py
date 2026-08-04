import os
import subprocess
import re

def clean_lyx_to_text(lyx_content):
    lines = lyx_content.split('\n')
    text_lines = []
    in_header = True
    in_layout = False
    current_layout_type = ""
    lyx_control_regex = re.compile(r'^\\(lyxformat|begin_document|begin_header|save_transient_properties|origin|textclass|begin_preamble|end_preamble|use_default_options|maintain_unincluded_children|language|language_package|inputencoding|fontencoding|font_|use_non_tex_fonts|use_microtype|use_dash_ligatures|graphics|default_output_format|output_sync|bibtex_command|index_command|paperfontsize|spacing|use_hyperref|pdf_|papersize|use_geometry|use_package|use_bibtopic|use_indices|paperorientation|suppress_date|justification|use_refstyle|use_minted|index|shortcut|color|bibliography|bibliographystyle|end_header|end_document|begin_inset|end_inset|emph|lang|size|series|shape|family|bar|strikeout|uoline|uwave|noun|color|background|align|status|collapsed|filename|scale|caption|label|name|type|display|opts|key|target|literal|preview|features|quote|bibstyle|bibfiles|inset|column|row|plain_layout|row_top_space|row_bottom_space|row_interline_space|font|grid|alignment|valign|left_border|top_border|right_border|bottom_border|use_box|box_type|has_inner_box|inner_box_class|m_selected|use_makebox|makebox_width|makebox_height|makebox_height_type|makebox_position|use_parbox|use_minibackground|use_color|use_shadowbox|shadowbox_width|shadowbox_height|shadowbox_height_type|shadowbox_position|shadowbox_inner_box|shadowbox_inner_box_class|shadowbox_m_selected|shadowbox_use_makebox|shadowbox_use_shadowbox|shadowbox_shadowbox_width|shadowbox_shadowbox_height|shadowbox_shadowbox_height_type|shadowbox_shadowbox_position|shadowbox_shadowbox_inner_box|shadowbox_shadowbox_inner_box_class|shadowbox_shadowbox_m_selected|shadowbox_shadowbox_use_makebox|shadowbox_shadowbox_makebox_width|shadowbox_shadowbox_makebox_height|shadowbox_shadowbox_makebox_height_type|shadowbox_shadowbox_makebox_position|shadowbox_shadowbox_use_parbox|shadowbox_shadowbox_use_minibackground|shadowbox_shadowbox_use_color|shadowbox_shadowbox_use_shadowbox|shadowbox_shadowbox_shadowbox_width|shadowbox_shadowbox_shadowbox_height|shadowbox_shadowbox_shadowbox_height_type|shadowbox_shadowbox_shadowbox_position|shadowbox_shadowbox_shadowbox_inner_box|shadowbox_shadowbox_shadowbox_inner_box_class|shadowbox_shadowbox_shadowbox_m_selected|shadowbox_shadowbox_shadowbox_use_makebox|shadowbox_shadowbox_shadowbox_makebox_width|shadowbox_shadowbox_shadowbox_makebox_height|shadowbox_shadowbox_shadowbox_makebox_height_type|shadowbox_shadowbox_shadowbox_makebox_position|shadowbox_shadowbox_shadowbox_use_parbox|shadowbox_shadowbox_shadowbox_use_minibackground|shadowbox_shadowbox_shadowbox_use_color|shadowbox_shadowbox_shadowbox_use_shadowbox)')
    
    current_para = []
    for line in lines:
        stripped = line.strip()
        if in_header:
            if stripped == r'\end_header':
                in_header = False
            continue
        if stripped.startswith(r'\begin_layout'):
            in_layout = True
            current_layout_type = stripped.split()[1] if len(stripped.split()) > 1 else ""
            continue
        if stripped == r'\end_layout':
            in_layout = False
            if current_para:
                full_para = " ".join(current_para)
                full_para = re.sub(r'\\emph\s+\w+', '', full_para)
                full_para = re.sub(r'\\series\s+\w+', '', full_para)
                full_para = re.sub(r'\\size\s+\w+', '', full_para)
                full_para = re.sub(r'\\color\s+\w+', '', full_para)
                full_para = re.sub(r'\\bar\s+\w+', '', full_para)
                full_para = re.sub(r'\\noun\s+\w+', '', full_para)
                full_para = full_para.replace(r'\backslash', '\\')
                full_para = re.sub(r'\\begin_inset\s+\w+.*', '', full_para)
                full_para = re.sub(r'\\end_inset', '', full_para)
                full_para = re.sub(r'\s+', ' ', full_para).strip()
                if full_para:
                    text_lines.append((current_layout_type, full_para))
                current_para = []
            continue
        if in_layout:
            if stripped.startswith('\\') and lyx_control_regex.match(stripped):
                continue
            if stripped.startswith(r'\begin_inset') or stripped.startswith(r'\end_inset'):
                continue
            if stripped.startswith('\\emph') or stripped.startswith('\\series') or stripped.startswith('\\shape') or stripped.startswith('\\size'):
                continue
            cleaned_line = line
            cleaned_line = re.sub(r'\\emph\s+\w+', '', cleaned_line)
            cleaned_line = re.sub(r'\\series\s+\w+', '', cleaned_line)
            cleaned_line = re.sub(r'\\size\s+\w+', '', cleaned_line)
            cleaned_line = re.sub(r'\\shape\s+\w+', '', cleaned_line)
            cleaned_line = re.sub(r'\\family\s+\w+', '', cleaned_line)
            cleaned_line = re.sub(r'\\color\s+\w+', '', cleaned_line)
            cleaned_line = re.sub(r'\\bar\s+\w+', '', cleaned_line)
            cleaned_line = re.sub(r'\\\w+', ' ', cleaned_line)
            current_para.append(cleaned_line.strip())
    return text_lines

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
    tech_words.sort(key=len, reverse=True)
    for word in tech_words:
        pattern = re.compile(r'\b(' + re.escape(word) + r')\b', re.IGNORECASE)
        text = pattern.sub(r'\\emph on \1\\emph default ', text)
    text = re.sub(r'\s+', ' ', text)
    text = text.replace(r'\emph default \emph on', '')
    # Clean up double emph tags
    text = re.sub(r'\\emph\s+on\s+\\emph\s+on', r'\\emph on', text)
    text = re.sub(r'\\emph\s+default\s+\\emph\s+default', r'\\emph default', text)
    return text

def convert_to_lyx_layout(layout_type, text):
    text_formatted = italicize_tech_words(text)
    text_formatted = text_formatted.replace("'", "\\begin_inset Quotes qls\n\\end_inset ")
    text_formatted = text_formatted.replace('"', '\\begin_inset Quotes qld\n\\end_inset ')
    lyx = []
    lyx.append(f"\\begin_layout {layout_type}")
    lyx.append(text_formatted)
    lyx.append("\\end_layout")
    return "\n".join(lyx)

def main():
    lyx_path = r"c:\Users\LENOVO\Desktop\skripsi-sentimen\Template LYX\TEMPLATE-LYX-SKRIPSI-TI-UCA\TEMPLATE-LYX-SKRIPSI-TI-UCA\SKRIPSI_ARSYA_LYX_FINAL\SKRIPSI_ARSYA_LATEX.lyx"
    extracted_path = r"c:\Users\LENOVO\Desktop\skripsi-sentimen\Template LYX\TEMPLATE-LYX-SKRIPSI-TI-UCA\bab5_extracted.txt"
    
    # 1. Revert to original
    subprocess.run(["git", "checkout", "--", lyx_path], cwd=r"c:\Users\LENOVO\Desktop\skripsi-sentimen")
    print("Reverted to original.")
    
    # 2. Apply Bab 5 update only
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
            
    with open(lyx_path, 'r', encoding='utf-8') as f:
        lyx_content = f.read()
        
    chapter_start_marker = "\\begin_layout Chapter\nKesimpulan\n\\end_layout"
    chapter_end_marker = "\\begin_layout Chapter*\nDaftar Pustaka"
    start_idx = lyx_content.find(chapter_start_marker)
    end_idx = lyx_content.find(chapter_end_marker)
    
    new_chapter_text = "\n\n".join(new_lyx_paragraphs) + "\n\n"
    updated_lyx_content = lyx_content[:start_idx] + new_chapter_text + lyx_content[end_idx:]
    
    with open(lyx_path, 'w', encoding='utf-8') as f:
        f.write(updated_lyx_content)
    print("Applied Bab 5 update.")
    
    # 3. Test if LyX can open it by exporting
    lyx_exe = r"C:\Users\LENOVO\Downloads\LyX 2.5\bin\LyX.exe"
    cmd = [lyx_exe, "-e", "pdflatex", lyx_path]
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=20)
    print("Return code after Step 1:", result.returncode)

if __name__ == '__main__':
    main()
