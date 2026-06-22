 # backend/preprocessing.py
# Setiap langkah preprocessing dipisah agar bisa dipahami & ditampilkan

import re
import nltk
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory

nltk.download('punkt', quiet=True)

# Inisialisasi tools
factory_stop    = StopWordRemoverFactory()
stopword_remover = factory_stop.create_stop_word_remover()
factory_stemmer  = StemmerFactory()
stemmer          = factory_stemmer.create_stemmer()

# ─── STEP BY STEP ──────────────────────────────────────

def step1_lowercase(teks):
    """Step 1: Ubah semua huruf jadi huruf kecil"""
    return teks.lower()

def step2_hapus_karakter(teks):
    """Step 2: Hapus karakter khusus, angka, emoji, tanda baca"""
    teks = re.sub(r'[^a-zA-Z\s]', ' ', teks)
    teks = re.sub(r'\s+', ' ', teks).strip()
    return teks

def step3_hapus_stopword(teks):
    """Step 3: Hapus kata tidak penting (yang, di, ke, dari, dll)"""
    return stopword_remover.remove(teks)

def step4_stemming(teks):
    """Step 4: Ubah ke kata dasar (berlari->lari, makanan->makan)"""
    return stemmer.stem(teks)

# ─── FUNGSI UTAMA ──────────────────────────────────────

def bersihkan_teks(teks):
    """Jalankan semua step sekaligus"""
    teks = step1_lowercase(teks)
    teks = step2_hapus_karakter(teks)
    teks = step3_hapus_stopword(teks)
    teks = step4_stemming(teks)
    return teks

def preprocessing_dengan_detail(teks):
    """
    Preprocessing dengan menampilkan hasil setiap step.
    Berguna untuk demo ke penguji!
    """
    hasil = {
        'teks_asli':      teks,
        'step1_lower':    step1_lowercase(teks),
        'step2_karakter': step2_hapus_karakter(step1_lowercase(teks)),
        'step3_stopword': step3_hapus_stopword(
                            step2_hapus_karakter(
                              step1_lowercase(teks))),
        'step4_stemming': bersihkan_teks(teks),
    }
    return hasil

def preprocessing_dataset(data):
    """
    Preprocessing seluruh dataset.
    Tampilkan progress setiap 500 data.
    """
    print("=" * 50)
    print("LANGKAH 2: PREPROCESSING DATASET")
    print("=" * 50)

    def proses_split(split_data, nama):
        print(f"\n⟳ Memproses {nama} ({len(split_data)} data)...")
        teks_bersih = []
        label       = []
        for i, item in enumerate(split_data):
            teks_bersih.append(bersihkan_teks(str(item['text'])))
            label.append(item['label'])
            if (i + 1) % 500 == 0:
                print(f"   ✓ {i+1}/{len(split_data)} selesai diproses")
        print(f"   ✓ {nama} selesai!")
        return teks_bersih, label

    X_train, y_train = proses_split(data['train'], 'Training')
    X_test,  y_test  = proses_split(data['test'],  'Testing')

    # Tampilkan contoh hasil preprocessing
    print(f"\n📝 CONTOH HASIL PREPROCESSING:")
    for i in range(3):
        detail = preprocessing_dengan_detail(data['train'][i]['text'])
        print(f"\n  Data ke-{i+1}:")
        print(f"  ASLI     : {detail['teks_asli'][:60]}...")
        print(f"  Step 1   : {detail['step1_lower'][:60]}...")
        print(f"  Step 2   : {detail['step2_karakter'][:60]}...")
        print(f"  Step 3   : {detail['step3_stopword'][:60]}...")
        print(f"  Step 4   : {detail['step4_stemming'][:60]}...")

    print(f"\n✓ Preprocessing selesai!")
    return X_train, y_train, X_test, y_test

# Test jika file ini dijalankan langsung
if __name__ == '__main__':
    from dataset import muat_dataset
    data = muat_dataset()

    # Test preprocessing dengan detail 1 kalimat
    contoh = "Produk bagus banget, pengiriman cepat dan seller ramah!"
    print(f"\n🔍 TEST PREPROCESSING DETAIL:")
    print(f"Kalimat: {contoh}")
    detail = preprocessing_dengan_detail(contoh)
    print(f"\nStep 1 (lowercase)  : {detail['step1_lower']}")
    print(f"Step 2 (hapus char) : {detail['step2_karakter']}")
    print(f"Step 3 (stopword)   : {detail['step3_stopword']}")
    print(f"Step 4 (stemming)   : {detail['step4_stemming']}")

    # Preprocessing seluruh dataset
    X_train, y_train, X_test, y_test = preprocessing_dataset(data)
    print(f"\n✓ Total X_train: {len(X_train)}")
    print(f"✓ Total X_test : {len(X_test)}")