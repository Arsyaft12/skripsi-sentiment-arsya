# BAB IV
# Hasil dan Pembahasan

## 4.1. Desain Pengujian Sistem

Setelah implementasi sistem analisis sentimen selesai, tahap selanjutnya adalah melakukan pengujian untuk mengevaluasi tingkat keberhasilan sistem dalam menjalankan fungsi utamanya. Pengujian dilakukan dengan tujuan untuk memastikan bahwa sistem dapat memberikan hasil analisis sentimen secara akurat, menampilkan informasi secara jelas melalui antarmuka, serta mampu mengintegrasikan fitur AI Assistant pada halaman insight dengan baik. Pengujian yang dilakukan meliputi pengujian fungsional, pengujian integrasi, pengujian akurasi model, dan pengujian antarmuka pengguna.

Pengujian dilakukan pada lingkungan lokal dengan arsitektur sistem yang terdiri atas frontend berbasis Next.js dan backend berbasis FastAPI. Sistem diuji menggunakan dataset yang telah tersedia dan hasil evaluasi model yang dihasilkan oleh sistem. Fokus utama pengujian adalah pada kemampuan sistem dalam memproses input ulasan, mengklasifikasikan sentimen, menampilkan hasil analisis, serta memberikan rekomendasi dan respons AI yang relevan.

## 4.2. Lingkungan Pengujian

Pengujian dilakukan pada perangkat dengan spesifikasi lingkungan sebagai berikut:

- Sistem operasi: Windows 11
- Frontend: Next.js 14
- Backend: FastAPI
- Bahasa pemrograman: Python dan JavaScript
- Basis data: SQLite
- Model klasifikasi: Naive Bayes dan SVM

Selain itu, pengujian juga dilakukan terhadap proses build frontend menggunakan perintah build pada aplikasi Next.js. Hasil pengujian menunjukkan bahwa aplikasi berhasil dibangun dengan status compile sukses, sehingga antarmuka dapat berjalan tanpa error utama pada tahap kompilasi.

## 4.3. Pengujian Fungsional Sistem

Pengujian fungsional bertujuan untuk memastikan bahwa setiap fitur utama sistem berjalan sesuai dengan kebutuhan pengguna. Pengujian dilakukan pada beberapa bagian utama sistem, yaitu halaman dashboard, halaman insight, fitur prediksi sentimen, fitur upload CSV, serta fitur AI Assistant.

### 4.3.1. Black Box Testing

Selain pengujian fungsional berbasis internal, sistem juga dilakukan pengujian black box testing. Pendekatan ini dilakukan dengan memandang sistem sebagai suatu kotak hitam, sehingga pengujian fokus pada masukan dan keluaran yang dihasilkan tanpa melihat struktur internal program. Tujuan utama black box testing adalah untuk memastikan bahwa sistem memberikan hasil sesuai kebutuhan pengguna ketika diberikan input tertentu.

Dalam penelitian ini, black box testing diterapkan pada beberapa skenario penting, yaitu pengujian input teks ulasan, pengujian unggah data CSV, pengujian akses halaman dashboard, pengujian akses halaman insight, serta pengujian pertanyaan AI Assistant. Setiap skenario diuji dengan membandingkan hasil yang muncul pada antarmuka dengan ekspektasi fungsional sistem. Hasil pengujian menunjukkan bahwa sistem memberikan respons yang sesuai untuk setiap input yang diberikan.

Contoh skenario black box testing yang dilakukan adalah sebagai berikut:

1. Pengguna memasukkan ulasan positif seperti “produk ini sangat bagus dan pelayanan sangat cepat”. Sistem diharapkan menghasilkan prediksi sentimen positif.
2. Pengguna memasukkan ulasan negatif seperti “pelayanan buruk dan kualitas produk sangat mengecewakan”. Sistem diharapkan menghasilkan prediksi sentimen negatif.
3. Pengguna mengunggah file CSV berisi beberapa ulasan. Sistem diharapkan memproses seluruh data dan menampilkan hasil prediksi untuk setiap baris data.
4. Pengguna membuka halaman insight. Sistem diharapkan menampilkan ringkasan analisis, rekomendasi, serta panel AI Assistant.
5. Pengguna mengajukan pertanyaan ke AI Assistant. Sistem diharapkan memberikan respons yang relevan berdasarkan konteks data yang tersedia.

Secara umum, hasil black box testing menunjukkan bahwa sistem telah memenuhi kebutuhan fungsionalnya pada level input-output. Dengan demikian, sistem dapat dikatakan telah berfungsi sesuai dengan spesifikasi yang ditetapkan.

### 4.3.2. Pengujian Halaman Dashboard

Halaman dashboard diuji untuk mengetahui apakah sistem mampu menampilkan informasi utama secara tepat. Pengujian mencakup beberapa aspek, yaitu tampilnya jumlah data, distribusi sentimen positif dan negatif, serta ringkasan performa model. Hasil pengujian menunjukkan bahwa halaman dashboard dapat menampilkan informasi secara konsisten dan mudah dipahami. Pengguna dapat melihat gambaran umum sistem secara cepat melalui elemen visual yang disajikan.

### 4.3.3. Pengujian Halaman Insight

Halaman insight diuji untuk memastikan bahwa halaman ini dapat menampilkan hasil analisis yang lebih terstruktur dibandingkan halaman utama. Pengujian dilakukan dengan mengamati tampilan distribusi sentimen, rekomendasi, evaluasi model, serta panel AI Assistant. Hasil pengujian menunjukkan bahwa halaman insight berhasil menampilkan informasi secara lebih terorganisir dan presentable. Selain itu, antarmuka halaman insight juga terbukti lebih menarik dan profesional karena menggunakan pembagian area yang jelas untuk setiap komponen.

### 4.3.4. Pengujian Fitur Prediksi Sentimen

Fitur prediksi sentimen diuji dengan memberikan input teks ulasan ke sistem. Hasil yang diharapkan adalah sistem dapat mengklasifikasikan apakah ulasan tersebut termasuk sentimen positif atau negatif. Pengujian ini menunjukkan bahwa sistem mampu menghasilkan keluaran prediksi yang sesuai dengan teks yang diberikan. Selain itu, sistem juga menampilkan nilai confidence score sebagai indikator tingkat keyakinan model terhadap hasil prediksi.

### 4.3.5. Pengujian Fitur Upload CSV

Pengujian dilakukan terhadap fitur unggah file CSV untuk melihat apakah sistem mampu memproses data secara batch. Hasil pengujian menunjukkan bahwa sistem dapat menerima file CSV, memproses isi data, dan menghasilkan output prediksi yang sesuai. Fitur ini sangat membantu dalam pemrosesan data dalam jumlah lebih besar dibandingkan pencatatan manual.

### 4.3.6. Pengujian AI Assistant

Fitur AI Assistant diuji dengan mengajukan beberapa pertanyaan terkait strategi perbaikan, evaluasi model, dan interpretasi sentimen. Pengujian ini bertujuan untuk memastikan bahwa sistem dapat memberikan respons yang relevan terhadap pertanyaan pengguna. Hasil pengujian menunjukkan bahwa AI Assistant mampu memberikan jawaban yang sesuai dengan konteks data yang tersedia. Ketika koneksi ke Gemini tidak tersedia, sistem tetap memberikan jawaban berbasis konteks lokal sehingga tetap dapat memberikan manfaat bagi pengguna.

## 4.4. Pengujian Integrasi Frontend dan Backend

Pengujian integrasi dilakukan untuk memastikan bahwa frontend dan backend dapat saling berkomunikasi dengan baik. Proses ini menguji koneksi antara antarmuka pengguna dan endpoint API yang tersedia. Pengujian berhasil menunjukkan bahwa data statistik, hasil evaluasi model, rekomendasi, serta respons AI dapat diterima dan ditampilkan oleh frontend secara benar.

Secara khusus, sistem berhasil mengakses endpoint penting seperti endpoint statistik, endpoint evaluasi, endpoint rekomendasi, serta endpoint AI insight chat. Keberhasilan integrasi ini menunjukkan bahwa arsitektur client-server yang diterapkan berjalan sesuai rencana dan mampu mendukung seluruh fitur utama aplikasi.

## 4.5. Pengujian Akurasi Model

Pengujian akurasi model dilakukan untuk mengevaluasi kualitas klasifikasi yang dihasilkan oleh dua model yang digunakan, yaitu Naive Bayes dan SVM. Pengujian ini dilakukan berdasarkan hasil evaluasi model yang telah disimpan dalam sistem. Nilai performa yang diperoleh disajikan pada Tabel 4.1.

Tabel 4.1. Perbandingan performa model Naive Bayes dan SVM

| Model | Akurasi (%) | Precision (%) | Recall (%) | F1-Score (%) | Keterangan |
|---|---:|---:|---:|---:|---|
| Naive Bayes | 87.56 | 87.46 | 87.56 | 87.48 | Model cukup baik, namun performanya sedikit lebih rendah dibandingkan SVM |
| SVM | 88.44 | 88.35 | 88.44 | 88.36 | Model terbaik dengan performa paling unggul |

Selain nilai rata-rata performa, pengujian juga dapat dilihat melalui confusion matrix yang menunjukkan jumlah data yang terklasifikasi dengan benar maupun salah. Pada model Naive Bayes, hasil klasifikasi menunjukkan 638 data negatif yang benar terklasifikasi sebagai negatif, 161 data negatif yang salah terklasifikasi sebagai positif, 121 data positif yang salah terklasifikasi sebagai negatif, serta 1346 data positif yang benar terklasifikasi sebagai positif. Sementara itu, model SVM menghasilkan 645 data negatif yang benar terklasifikasi sebagai negatif, 154 data negatif yang salah terklasifikasi sebagai positif, 108 data positif yang salah terklasifikasi sebagai negatif, serta 1359 data positif yang benar terklasifikasi sebagai positif.

Berdasarkan hasil evaluasi pada Tabel 4.1, model SVM menunjukkan performa yang lebih unggul dibandingkan Naive Bayes pada seluruh metrik evaluasi. Selisih akurasi antara kedua model tidak terlalu besar, namun SVM tetap menunjukkan hasil yang lebih baik sehingga model ini dipilih sebagai model utama dalam sistem. Hasil ini menunjukkan bahwa model yang digunakan mampu melakukan klasifikasi sentimen dengan tingkat akurasi yang baik dan layak digunakan untuk mendukung sistem analisis sentimen.

### 4.5.1. Contoh Pengujian Kode untuk Evaluasi Model

Berikut merupakan contoh kode sederhana yang dapat digunakan untuk melakukan pengujian dan evaluasi model secara terprogram:

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# y_true = label aktual
# y_pred = hasil prediksi model

accuracy = accuracy_score(y_true, y_pred)
precision = precision_score(y_true, y_pred, average='weighted')
recall = recall_score(y_true, y_pred, average='weighted')
f1 = f1_score(y_true, y_pred, average='weighted')

print("Akurasi:", accuracy)
print("Precision:", precision)
print("Recall:", recall)
print("F1-Score:", f1)
```

Kode di atas menunjukkan cara menghitung metrik evaluasi model secara sistematis. Nilai-nilai tersebut kemudian dapat dibandingkan antar model untuk menentukan model yang memiliki kinerja terbaik.

### 4.5.2. Contoh Pengujian Kode untuk Endpoint API

Selain evaluasi model, pengujian juga dapat dilakukan terhadap endpoint API yang digunakan oleh frontend. Contoh pengujian berikut menunjukkan bagaimana sistem diuji melalui request HTTP:

```python
import requests

payload = {
    "question": "Berikan strategi untuk menurunkan ulasan negatif",
    "context": {
        "stats": {"total": 100, "positif": 70, "negatif": 30},
        "eval_": {"svm": {"akurasi": 88.44}, "naive_bayes": {"akurasi": 87.56}}
    }
}

response = requests.post("http://127.0.0.1:8000/ai/insight-chat", json=payload)
print(response.status_code)
print(response.json())
```

Pengujian endpoint ini penting untuk memastikan bahwa frontend dapat berkomunikasi dengan backend dan menerima respons yang sesuai.

## 4.6. Pembahasan Hasil Pengujian

Hasil pengujian yang dilakukan menunjukkan bahwa sistem analisis sentimen yang dikembangkan telah memenuhi kebutuhan fungsional yang ditetapkan pada tahap perancangan. Pengujian black box testing menunjukkan bahwa setiap skenario input yang diberikan menghasilkan keluaran yang sesuai dengan harapan. Hal ini menandakan bahwa sistem mampu menjalankan fungsi utamanya dengan konsisten, baik pada bagian klasifikasi sentimen, pengolahan data CSV, penampilan dashboard, maupun interaksi AI Assistant.

Selain itu, pengujian fungsional juga menunjukkan bahwa fitur antarmuka pengguna dapat berjalan dengan baik dan memberikan pengalaman yang jelas bagi pengguna. Halaman dashboard mampu menyajikan informasi secara ringkas, halaman insight mampu menampilkan hasil analisis secara lebih terstruktur, dan AI Assistant mampu memberikan respons yang relevan terhadap pertanyaan pengguna. Secara keseluruhan, hasil ini menunjukkan bahwa sistem tidak hanya berfungsi secara teknis, tetapi juga telah mempertimbangkan aspek usability dan kemudahan pemahaman pengguna.

Dari sisi kualitas model, hasil evaluasi memperlihatkan bahwa model SVM memberikan performa lebih baik dibandingkan Naive Bayes pada semua metrik evaluasi. Perbedaan nilai yang tidak terlalu besar secara statistik tetap menunjukkan konsistensi bahwa SVM lebih unggul dalam mengklasifikasikan sentimen. Hal ini juga relevan karena sistem mengandalkan model tersebut sebagai model utama pada beberapa fitur analisis.

Keberadaan AI Assistant menjadi nilai tambah yang signifikan karena sistem tidak hanya mampu mengklasifikasikan data, tetapi juga membantu pengguna dalam memperoleh interpretasi, strategi, dan rekomendasi yang lebih mendalam. Meskipun respons AI bergantung pada ketersediaan koneksi eksternal, sistem tetap mampu memberikan respons alternatif berbasis konteks data lokal sehingga tetap dapat digunakan secara praktis.

Hasil pengujian menunjukkan bahwa sistem yang dibangun secara keseluruhan telah berjalan sesuai dengan tujuan awal penelitian. Fitur utama sistem, baik pada halaman dashboard maupun halaman insight, mampu menampilkan informasi yang relevan dan mudah dipahami oleh pengguna. Selain itu, integrasi antara frontend dan backend berjalan dengan baik sehingga data dapat diproses dan ditampilkan secara real-time.

Dari sisi performa model, hasil evaluasi memperlihatkan bahwa sistem mampu menghasilkan prediksi sentimen dengan akurasi yang cukup tinggi. Model SVM memberikan hasil yang sedikit lebih baik dibandingkan Naive Bayes, sehingga sistem dapat mengandalkan model ini sebagai pendekatan utama. Hal ini juga memperkuat validitas bahwa sistem yang dikembangkan tidak hanya berfungsi secara teknis, tetapi juga memiliki kualitas klasifikasi yang memadai.

Selain itu, fitur AI Assistant memberikan nilai tambah pada sistem karena memungkinkan pengguna untuk memperoleh insight lebih lanjut secara interaktif. Walaupun respons AI dapat bergantung pada kondisi koneksi eksternal, sistem tetap mampu memberikan jawaban berbasis konteks data lokal sehingga tetap bernilai untuk kebutuhan analisis. Keberadaan fitur ini memperluas manfaat sistem dari sekadar alat klasifikasi menjadi alat bantu analisis yang lebih cerdas dan informatif.

## 4.7. Kesimpulan Hasil Pengujian

Secara keseluruhan, pengujian yang telah dilakukan menunjukkan bahwa sistem analisis sentimen yang dikembangkan telah berhasil mencapai tujuan fungsionalnya. Sistem mampu menampilkan hasil analisis dengan baik, mengintegrasikan frontend dan backend secara efektif, menjalankan klasifikasi sentimen dengan akurasi yang memadai, serta menyediakan fitur AI Assistant yang membantu pengguna dalam memahami hasil analisis. Pengujian black box testing membuktikan bahwa sistem memberikan respons yang sesuai terhadap berbagai skenario input pengguna, sedangkan pengujian akurasi model menunjukkan bahwa model SVM memiliki performa paling baik dibandingkan model Naive Bayes.

Dengan demikian, sistem ini dapat dikatakan layak digunakan sebagai alat bantu analisis sentimen yang informatif, interaktif, dan profesional. Hasil pengujian juga menunjukkan bahwa sistem memiliki potensi yang baik untuk dikembangkan lebih lanjut, terutama dalam aspek perluasan fitur AI, peningkatan akurasi model, serta optimasi performa antarmuka pengguna.
