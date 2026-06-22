# backend/train_model.py
# Proses lengkap: load dataset → preprocessing → training → export CSV

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.metrics import (classification_report, accuracy_score,
                             confusion_matrix, precision_score,
                             recall_score, f1_score)
from sklearn.pipeline import Pipeline
import joblib
import json
import csv
from dataset import muat_dataset
from preprocessing import preprocessing_dataset

def train_dan_evaluasi():
    print("=" * 50)
    print("LANGKAH 1: MEMUAT DATASET")
    print("=" * 50)
    data = muat_dataset()

    print("\n" + "=" * 50)
    print("LANGKAH 2: PREPROCESSING")
    print("=" * 50)
    X_train, y_train, X_test, y_test = preprocessing_dataset(data)

    print("\n" + "=" * 50)
    print("LANGKAH 3: TRAINING MODEL")
    print("=" * 50)

    # Training Naive Bayes
    print("\n⟳ Training Naive Bayes...")
    model_nb = Pipeline([
        ('tfidf', TfidfVectorizer(max_features=10000, ngram_range=(1,2))),
        ('clf',   MultinomialNB(alpha=0.1))
    ])
    model_nb.fit(X_train, y_train)
    pred_nb    = model_nb.predict(X_test)
    akurasi_nb = accuracy_score(y_test, pred_nb)
    print(f"✓ Naive Bayes selesai! Akurasi: {akurasi_nb*100:.2f}%")

    # Training SVM
    print("\n⟳ Training SVM...")
    model_svm = Pipeline([
        ('tfidf', TfidfVectorizer(max_features=10000, ngram_range=(1,2))),
        ('clf',   LinearSVC(C=1.0, max_iter=2000))
    ])
    model_svm.fit(X_train, y_train)
    pred_svm    = model_svm.predict(X_test)
    akurasi_svm = accuracy_score(y_test, pred_svm)
    print(f"✓ SVM selesai! Akurasi: {akurasi_svm*100:.2f}%")

    # Evaluasi lengkap
    label_names = ['negatif', 'positif']
    hasil_evaluasi = {
        'naive_bayes': {
            'akurasi':          round(akurasi_nb * 100, 2),
            'precision':        round(precision_score(y_test, pred_nb,
                                      average='weighted') * 100, 2),
            'recall':           round(recall_score(y_test, pred_nb,
                                      average='weighted') * 100, 2),
            'f1_score':         round(f1_score(y_test, pred_nb,
                                      average='weighted') * 100, 2),
            'confusion_matrix': confusion_matrix(
                                  y_test, pred_nb).tolist(),
        },
        'svm': {
            'akurasi':          round(akurasi_svm * 100, 2),
            'precision':        round(precision_score(y_test, pred_svm,
                                      average='weighted') * 100, 2),
            'recall':           round(recall_score(y_test, pred_svm,
                                      average='weighted') * 100, 2),
            'f1_score':         round(f1_score(y_test, pred_svm,
                                      average='weighted') * 100, 2),
            'confusion_matrix': confusion_matrix(
                                  y_test, pred_svm).tolist(),
        },
        'model_terbaik': 'svm' if akurasi_svm > akurasi_nb
                         else 'naive_bayes'
    }

    # Tampilkan perbandingan
    print("\n" + "=" * 50)
    print("HASIL PERBANDINGAN MODEL")
    print("=" * 50)
    print(f"\n{'Metrik':<15} {'Naive Bayes':>12} {'SVM':>12}")
    print("-" * 40)
    for metrik in ['akurasi', 'precision', 'recall', 'f1_score']:
        nb_val  = hasil_evaluasi['naive_bayes'][metrik]
        svm_val = hasil_evaluasi['svm'][metrik]
        print(f"{metrik:<15} {nb_val:>11}% {svm_val:>11}%")
    print(f"\n🏆 Model terbaik: "
          f"{hasil_evaluasi['model_terbaik'].upper()}")

    print(f"\n📊 Classification Report Naive Bayes:")
    print(classification_report(y_test, pred_nb,
          target_names=label_names))
    print(f"\n📊 Classification Report SVM:")
    print(classification_report(y_test, pred_svm,
          target_names=label_names))

    # Simpan model
    print("\n⟳ Menyimpan model...")
    joblib.dump(model_nb,  'model_naive_bayes.pkl')
    joblib.dump(model_svm, 'model_svm.pkl')

    # Simpan evaluasi ke JSON
    with open('hasil_evaluasi.json', 'w') as f:
        json.dump(hasil_evaluasi, f, indent=2)

    print("✓ model_naive_bayes.pkl tersimpan")
    print("✓ model_svm.pkl tersimpan")
    print("✓ hasil_evaluasi.json tersimpan")

    return data, X_train, y_train, X_test, y_test, model_nb, model_svm, hasil_evaluasi

def export_ke_csv(data, X_train, y_train, X_test, y_test,
                  model_svm, model_nb):
    """
    LANGKAH 4: Export semua data ke CSV
    Berisi teks asli, teks bersih, label asli,
    prediksi SVM, prediksi NB, dan keterangan benar/salah
    """
    print("\n" + "=" * 50)
    print("LANGKAH 4: EXPORT DATA KE CSV")
    print("=" * 50)

    label_map = {0: 'negatif', 1: 'positif'}

    # Gabung train + test
    semua_teks_asli   = (
        [item['text'] for item in data['train']] +
        [item['text'] for item in data['test']]
    )
    semua_teks_bersih = list(X_train) + list(X_test)
    semua_label_asli  = list(y_train) + list(y_test)
    semua_split       = (
        ['train'] * len(X_train) +
        ['test']  * len(X_test)
    )

    total = len(semua_teks_asli)
    print(f"⟳ Memproses {total} data...")

    rows = []
    for i, (asli, bersih, label, split) in enumerate(zip(
        semua_teks_asli, semua_teks_bersih,
        semua_label_asli, semua_split
    )):
        pred_svm = model_svm.predict([bersih])[0]
        pred_nb  = model_nb.predict([bersih])[0]

        rows.append({
            'id':           i + 1,
            'split':        split,
            'text':         asli,
            'teks_bersih':  bersih,
            'label_asli':   label_map.get(label,        str(label)),
            'prediksi_svm': label_map.get(int(pred_svm), str(pred_svm)),
            'prediksi_nb':  label_map.get(int(pred_nb),  str(pred_nb)),
            'svm_benar':    'ya' if pred_svm == label else 'tidak',
            'nb_benar':     'ya' if pred_nb  == label else 'tidak',
        })

        if (i + 1) % 1000 == 0:
            print(f"   ✓ {i+1}/{total} selesai")

    # Simpan ke CSV
    nama_file = 'hasil_dataset_lengkap.csv'
    with open(nama_file, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)

    # Statistik akhir
    svm_benar = sum(1 for r in rows if r['svm_benar'] == 'ya')
    nb_benar  = sum(1 for r in rows if r['nb_benar']  == 'ya')

    print(f"\n✓ CSV berhasil: {nama_file}")
    print(f"✓ Total data  : {total}")
    print(f"✓ SVM benar   : {svm_benar} ({svm_benar/total*100:.1f}%)")
    print(f"✓ NB benar    : {nb_benar} ({nb_benar/total*100:.1f}%)")
    print(f"\n📋 Kolom CSV:")
    print(f"   id | split | text | teks_bersih")
    print(f"   label_asli | prediksi_svm | prediksi_nb")
    print(f"   svm_benar  | nb_benar")

    return nama_file

if __name__ == '__main__':
    # Jalankan semua proses
    (data, X_train, y_train,
     X_test, y_test,
     model_nb, model_svm,
     hasil_evaluasi) = train_dan_evaluasi()

    # Export ke CSV
    nama_file = export_ke_csv(
        data, X_train, y_train, X_test, y_test,
        model_svm, model_nb
    )

    print(f"\n{'='*50}")
    print(f"=== SEMUA PROSES SELESAI ===")
    print(f"{'='*50}")
    print(f"✓ Model    : model_svm.pkl, model_naive_bayes.pkl")
    print(f"✓ Evaluasi : hasil_evaluasi.json")
    print(f"✓ Dataset  : {nama_file}")
    print(f"\nNext: Upload {nama_file} ke API untuk masuk database!")