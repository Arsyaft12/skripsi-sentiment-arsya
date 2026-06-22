# backend/dataset.py
# File ini bertugas: mengambil dan menampilkan dataset dari Hugging Face

from datasets import load_dataset
import pandas as pd
import os
import json

DATASET_NAME = 'sepidmnorozy/Indonesian_sentiment'
CACHE_FILE   = 'dataset_cache.json'

def muat_dataset(simpan_cache=True):
    """
    Fungsi 1: Muat dataset dari Hugging Face
    Kalau sudah pernah didownload, pakai cache lokal
    """
    print("=" * 50)
    print("LANGKAH 1: MEMUAT DATASET")
    print("=" * 50)

    # Cek apakah cache sudah ada
    if os.path.exists(CACHE_FILE):
        print(f"✓ Cache ditemukan! Memuat dari file lokal...")
        with open(CACHE_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
        print(f"✓ Dataset dimuat dari cache!")
    else:
        print(f"⟳ Mendownload dari Hugging Face: {DATASET_NAME}")
        dataset = load_dataset(DATASET_NAME)

        data = {
            'train': [{'text': item['text'], 'label': item['label']}
                      for item in dataset['train']],
            'test':  [{'text': item['text'], 'label': item['label']}
                      for item in dataset['test']],
        }

        if simpan_cache:
            with open(CACHE_FILE, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"✓ Dataset disimpan ke cache lokal!")

    # Statistik dataset
    label_map = {0: 'negatif', 1: 'positif'}
    train_data = data['train']
    test_data  = data['test']

    print(f"\n📊 STATISTIK DATASET:")
    print(f"   Total data training : {len(train_data)}")
    print(f"   Total data testing  : {len(test_data)}")

    # Hitung distribusi label
    for split_name, split_data in [('Training', train_data), ('Testing', test_data)]:
        positif = sum(1 for d in split_data if d['label'] == 1)
        negatif = sum(1 for d in split_data if d['label'] == 0)
        print(f"\n   {split_name}:")
        print(f"   - Positif : {positif} ({positif/len(split_data)*100:.1f}%)")
        print(f"   - Negatif : {negatif} ({negatif/len(split_data)*100:.1f}%)")

    # Tampilkan 5 contoh data
    print(f"\n📝 CONTOH DATA (5 pertama):")
    for i, item in enumerate(train_data[:5]):
        label_str = label_map.get(item['label'], str(item['label']))
        print(f"   [{i+1}] [{label_str.upper()}] {item['text'][:80]}...")

    return data

def dataset_ke_dataframe(data):
    """
    Fungsi 2: Ubah dataset ke format tabel (DataFrame)
    Lebih mudah diolah dan ditampilkan
    """
    df_train = pd.DataFrame(data['train'])
    df_test  = pd.DataFrame(data['test'])

    df_train['label_text'] = df_train['label'].map({0: 'negatif', 1: 'positif'})
    df_test['label_text']  = df_test['label'].map({0: 'negatif', 1: 'positif'})

    df_train['split'] = 'train'
    df_test['split']  = 'test'

    return df_train, df_test

def ambil_sampel(data, jumlah=20, label=None):
    """
    Fungsi 3: Ambil sampel data untuk ditampilkan di dashboard
    """
    label_map = {0: 'negatif', 1: 'positif'}
    semua_data = data['train'] + data['test']

    if label is not None:
        label_int = 1 if label == 'positif' else 0
        semua_data = [d for d in semua_data if d['label'] == label_int]

    sampel = semua_data[:jumlah]
    return [
        {
            'text': item['text'],
            'label': label_map.get(item['label'], str(item['label'])),
            'label_int': item['label']
        }
        for item in sampel
    ]

# Test jika file ini dijalankan langsung
if __name__ == '__main__':
    data = muat_dataset()
    df_train, df_test = dataset_ke_dataframe(data)
    print(f"\n✓ DataFrame train shape: {df_train.shape}")
    print(f"✓ DataFrame test  shape: {df_test.shape}")
    print(f"\nContoh DataFrame:")
    print(df_train.head(3).to_string())