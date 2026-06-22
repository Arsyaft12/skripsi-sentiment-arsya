'use client'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList
} from 'recharts'
import { useRouter } from 'next/navigation'


const API = 'http://localhost:8000'


// ─── CUSTOM LABEL PIE ───────────────────────────────────
const RADIAN = Math.PI / 180
function CustomPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  if (percent < 0.05) return null
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  )
}


export default function Dashboard() {
  const [aktifTab, setAktifTab]           = useState('analisis')
  const [teksInput, setTeksInput]         = useState('')
  const [modelPilihan, setModelPilihan]   = useState('svm')
  const [hasilPrediksi, setHasilPrediksi] = useState(null)
  const [loading, setLoading]             = useState(false)
  const [statistik, setStatistik]         = useState(null)
  const [riwayat, setRiwayat]             = useState([])
  const [infoDataset, setInfoDataset]     = useState(null)
  const [sampelDataset, setSampelDataset] = useState([])
  const [evaluasi, setEvaluasi]           = useState(null)
  const [detailPrep, setDetailPrep]       = useState(null)
  const [error, setError]                 = useState('')


  // CSV state
  const [csvFile, setCsvFile]         = useState(null)
  const [csvLoading, setCsvLoading]   = useState(false)
  const [csvResult, setCsvResult]     = useState(null)
  const [csvRows, setCsvRows]         = useState([])
  const [modelCsv, setModelCsv]       = useState('svm')
  const [subTab, setSubTab]           = useState('manual') // 'manual' | 'csv'
  const fileInputRef                  = useRef(null)


  const router = useRouter()


  useEffect(() => { muatSemua() }, [])


  async function muatSemua() {
    try {
      const [stat, info, samp, eval_] = await Promise.all([
        axios.get(`${API}/statistik`),
        axios.get(`${API}/dataset/info`),
        axios.get(`${API}/dataset/sampel?jumlah=10`),
        axios.get(`${API}/evaluasi`),
      ])
      setStatistik(stat.data)
      setInfoDataset(info.data)
      setSampelDataset(samp.data.data || [])
      setEvaluasi(eval_.data)
    } catch (err) {}
  }


  // ─── ANALISIS TEKS MANUAL ───────────────────────────
  async function prediksiSentimen() {
    if (!teksInput.trim()) { setError('Masukkan teks dulu!'); return }
    setLoading(true); setError('')
    try {
      const res = await axios.post(`${API}/prediksi`, { teks: teksInput, model: modelPilihan })
      setHasilPrediksi(res.data)
      setDetailPrep(res.data.preprocessing)
      const [stat, riw] = await Promise.all([
        axios.get(`${API}/statistik`),
        axios.get(`${API}/riwayat?limit=10`),
      ])
      setStatistik(stat.data)
      setRiwayat(riw.data.data || [])
    } catch (err) {
      setError('Error: ' + (err.response?.data?.detail || err.message))
    } finally { setLoading(false) }
  }


  // ─── UPLOAD CSV EKSTERNAL ───────────────────────────
  async function handleCsvFile(file) {
    if (!file || !file.name.endsWith('.csv')) { alert('File harus .csv'); return }
    setCsvFile(file)
    setCsvLoading(true)
    setCsvResult(null)
    setCsvRows([])
    try {
      const formData = new FormData()
      formData.append('file', file)
      const { data } = await axios.post(
        `${API}/upload-csv?model=${modelCsv}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      setCsvResult(data)
      setCsvRows(data.hasil || [])
      const stat = await axios.get(`${API}/statistik`)
      setStatistik(stat.data)
    } catch (e) {
      alert('Gagal memproses CSV. Pastikan FastAPI berjalan di port 8000.')
    }
    setCsvLoading(false)
  }


  // ─── EXPORT CSV ─────────────────────────────────────
  function exportCsv() {
    if (!csvRows.length) return
    const header = 'teks_asli,teks_bersih,sentimen,model_digunakan,waktu\n'
    const rows = csvRows.map(r =>
      `"${(r.teks_asli||'').replace(/"/g,'""')}","${(r.teks_bersih||'').replace(/"/g,'""')}","${r.sentimen}","${r.model_digunakan}","${r.waktu}"`
    ).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `hasil_sentimen_${new Date().toISOString().slice(0,10)}.csv`
    a.click(); URL.revokeObjectURL(url)
  }


  function warnaBadge(s) {
    return s === 'positif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }


  const dataGrafik = statistik && statistik.total > 0 ? [
    { name: 'Positif', value: statistik.positif, fill: '#22c55e' },
    { name: 'Negatif', value: statistik.negatif, fill: '#ef4444' },
  ] : []


  const dataEvaluasi = evaluasi && evaluasi.naive_bayes ? [
    { metrik: 'Akurasi',   nb: evaluasi.naive_bayes.akurasi,   svm: evaluasi.svm.akurasi   },
    { metrik: 'Precision', nb: evaluasi.naive_bayes.precision, svm: evaluasi.svm.precision },
    { metrik: 'Recall',    nb: evaluasi.naive_bayes.recall,    svm: evaluasi.svm.recall    },
    { metrik: 'F1-Score',  nb: evaluasi.naive_bayes.f1_score,  svm: evaluasi.svm.f1_score  },
  ] : []


  // ─── DATA PERBANDINGAN JURNAL TERDAHULU ─────────────
  // Sumber: 10 jurnal referensi skripsi Arsya Faturrahman
  const dataJurnal = [
    // Jurnal 1: Sanjaya et al. 2023 — NB vs SVM Shopee
    { peneliti: 'Sanjaya et al.\n(2023)', nb: 85.0, svm: 81.0,
      keterangan: 'Shopee Google Play, 2000 data, 80:20' },
    // Jurnal 4: Apriyani et al. 2024 — NB vs SVM Mobile JKN
    { peneliti: 'Apriyani et al.\n(2024)', nb: 85.0, svm: 93.0,
      keterangan: 'Mobile JKN Twitter, 200 data, 80:20' },
    // Jurnal 2: Ali et al. 2024 — Amazon (MNB vs SVM, 3-class)
    { peneliti: 'Ali et al.\n(2024)', nb: 82.2, svm: 89.7,
      keterangan: 'Amazon e-commerce, 400.000 data, 3-class' },
    // Jurnal 7: Nugroho & Handayani 2022 — Hybrid NB+SVM
    { peneliti: 'Nugroho &\nHandayani (2022)', nb: 80.0, svm: 82.7,
      keterangan: 'Multi-domain Indonesia, Hybrid NB+SVM' },
    // Penelitian ini — hasil aktual training
    { peneliti: 'Penelitian\nIni (2025)', nb: evaluasi?.naive_bayes?.akurasi || 87.56,
      svm: evaluasi?.svm?.akurasi || 88.44,
      keterangan: 'Indonesian_sentiment Hugging Face, 10.192 data' },
  ]


  // Bar chart akurasi perbandingan jurnal (grouped)
  const dataJurnalBar = dataJurnal.map(j => ({
    name: j.peneliti,
    'Naive Bayes': j.nb,
    'SVM': j.svm,
    highlight: j.peneliti.includes('Penelitian'),
  }))


  const tabs = [
    { id: 'analisis', label: 'Analisis'  },
    { id: 'dataset',  label: 'Dataset'   },
    { id: 'evaluasi', label: 'Evaluasi'  },
    { id: 'riwayat',  label: 'Riwayat'  },
  ]


  return (
    <div className="min-h-screen bg-gray-50">


      {/* Header */}
      <header className="bg-blue-800 text-white py-5 px-8 shadow">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Analisis Sentimen</h1>
            <p className="text-blue-200 text-sm mt-1">
              Ulasan E-Commerce — Naive Bayes vs SVM | Dataset: {infoDataset?.total_data?.toLocaleString() || '...'} data
            </p>
          </div>
          <button
            onClick={() => router.push('/insight')}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', padding: '12px 28px', borderRadius: '100px',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              letterSpacing: '0.05em', transition: 'all 0.3s ease', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
          >
            ✦ Generate Insight →
          </button>
        </div>
      </header>


      {/* Tab Navigation */}
      <div className="bg-white border-b px-8">
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setAktifTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors
                ${aktifTab === tab.id ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>


      <main className="max-w-5xl mx-auto px-6 py-8">


        {/* ══ TAB ANALISIS ══ */}
        {aktifTab === 'analisis' && (
          <div className="space-y-6">


            {/* Sub-tab: Manual / CSV */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="flex border-b">
                {[
                  { key: 'manual', icon: '💬', label: 'Teks Ulasan Manual' },
                  { key: 'csv',    icon: '📄', label: 'Import CSV Eksternal' },
                ].map(t => (
                  <button key={t.key} onClick={() => setSubTab(t.key)}
                    className={`flex-1 py-3 text-sm font-medium transition-colors
                      ${subTab === t.key ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>


              <div className="p-6">


                {/* ── MANUAL INPUT ── */}
                {subTab === 'manual' && (
                  <>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Analisis Ulasan Baru</h2>
                    <textarea
                      className="w-full border rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      rows={4} placeholder="Masukkan teks ulasan produk di sini..."
                      value={teksInput} onChange={e => setTeksInput(e.target.value)}
                    />
                    <div className="flex items-center gap-4 mt-3">
                      <select className="border rounded-lg px-3 py-2 text-sm text-gray-800 bg-white"
                        value={modelPilihan} onChange={e => setModelPilihan(e.target.value)}>
                        <option value="svm">Model: SVM (88.44%)</option>
                        <option value="naive_bayes">Model: Naive Bayes (87.56%)</option>
                      </select>
                      <button onClick={prediksiSentimen} disabled={loading}
                        className="bg-blue-700 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-800 disabled:opacity-50">
                        {loading ? 'Memproses...' : 'Analisis Sentimen'}
                      </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


                    {/* Hasil prediksi manual */}
                    {hasilPrediksi && (
                      <div className="mt-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${warnaBadge(hasilPrediksi.sentimen)}`}>
                            {hasilPrediksi.sentimen}
                          </span>
                          <span className="text-gray-500 text-sm">oleh {hasilPrediksi.model_digunakan}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">"{hasilPrediksi.teks_asli}"</p>
                        {detailPrep && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs font-semibold text-gray-500 mb-3 uppercase">
                              Proses Preprocessing (Step by Step)
                            </p>
                            <div className="space-y-2">
                              {[
                                ['Step 1 — Lowercase',        detailPrep.step1],
                                ['Step 2 — Hapus karakter',   detailPrep.step2],
                                ['Step 3 — Hapus stopword',   detailPrep.step3],
                                ['Step 4 — Stemming (hasil)', detailPrep.step4],
                              ].map(([label, val]) => (
                                <div key={label} className="flex gap-3 text-sm">
                                  <span className="text-gray-400 w-44 shrink-0">{label}:</span>
                                  <span className="text-gray-700">{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}


                {/* ── CSV IMPORT ── */}
                {subTab === 'csv' && (
                  <>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Import CSV Eksternal</h2>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                      Upload file CSV berisi kolom ulasan dari platform eksternal (Shopee/Tokopedia/Lazada).
                      Sistem akan otomatis preprocessing → TF-IDF → prediksi sentimen untuk setiap baris,
                      lalu simpan ke database dan dapat diexport kembali.
                      <br/>
                      <span className="text-xs text-gray-400">Kolom yang dikenali: text, teks, ulasan, review, content, comment</span>
                    </p>


                    {/* Pilih model CSV */}
                    <div className="flex gap-3 mb-4">
                      {[
                        { key: 'svm',         label: 'SVM (88.44%)' },
                        { key: 'naive_bayes', label: 'Naive Bayes (87.56%)' },
                      ].map(m => (
                        <button key={m.key} onClick={() => setModelCsv(m.key)}
                          className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors
                            ${modelCsv === m.key ? 'bg-blue-50 border-blue-400 text-blue-700' : 'border-gray-300 text-gray-600 hover:border-gray-400'}`}>
                          {m.label}
                        </button>
                      ))}
                    </div>


                    {/* Drop zone */}
                    <input type="file" ref={fileInputRef} accept=".csv" className="hidden"
                      onChange={e => handleCsvFile(e.target.files[0])} />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = '#3b82f6' }}
                      onDragLeave={e => { e.currentTarget.style.borderColor = '#d1d5db' }}
                      onDrop={e => { e.preventDefault(); handleCsvFile(e.dataTransfer.files[0]) }}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                    >
                      <div className="text-4xl mb-3">📂</div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Klik atau drag & drop file CSV</p>
                      <p className="text-xs text-gray-400">Maksimal 5MB · Format: CSV dengan header kolom</p>
                    </div>


                    {/* Loading */}
                    {csvLoading && (
                      <div className="text-center py-8">
                        <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3" />
                        <p className="text-sm text-gray-500">Memproses {csvFile?.name}...</p>
                      </div>
                    )}


                    {/* Hasil CSV */}
                    {csvResult && !csvLoading && (
                      <div className="mt-5 space-y-4">
                        {/* Stats */}
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-sm font-semibold text-gray-700">{csvFile?.name}</p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {csvResult.total_diproses} ulasan diproses · model: {modelCsv === 'svm' ? 'SVM' : 'Naive Bayes'}
                              </p>
                            </div>
                            <button onClick={exportCsv}
                              className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-300 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                              ⬇ Ekspor CSV
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { label: 'Total Diproses', val: csvResult.total_diproses, pct: null, color: 'text-gray-700' },
                              { label: 'Positif',        val: csvResult.positif, pct: csvResult.persen_positif, color: 'text-green-700' },
                              { label: 'Negatif',        val: csvResult.negatif, pct: csvResult.persen_negatif, color: 'text-red-700'   },
                            ].map(s => (
                              <div key={s.label} className="bg-white rounded-lg p-3 border">
                                <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                                {s.pct != null && (
                                  <p className={`text-sm font-semibold ${s.color} mt-1`}>{s.pct}%</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>


                        {/* Preview 5 baris */}
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                            Preview Hasil (5 Pertama)
                          </p>
                          <div className="space-y-2">
                            {csvRows.slice(0, 5).map((r, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ${warnaBadge(r.sentimen)}`}>
                                  {r.sentimen}
                                </span>
                                <span className="flex-1 truncate text-gray-600">{r.teks_asli}</span>
                                <span className="text-gray-400 shrink-0 text-xs">{r.model_digunakan}</span>
                              </div>
                            ))}
                            {csvRows.length > 5 && (
                              <p className="text-center text-xs text-gray-400 py-2">
                                ...dan {csvRows.length - 5} ulasan lainnya tersimpan di database
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>


            {/* Distribusi Sentimen */}
            {statistik && statistik.total > 0 && (
              <section className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Distribusi Sentimen</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[
                    { label: 'Positif', val: statistik.positif, persen: statistik.persen_positif, bg: 'bg-green-50', txt: 'text-green-700', badge: 'bg-green-100 text-green-800' },
                    { label: 'Negatif', val: statistik.negatif, persen: statistik.persen_negatif, bg: 'bg-red-50',   txt: 'text-red-700',   badge: 'bg-red-100 text-red-800'   },
                  ].map(item => (
                    <div key={item.label} className={`${item.bg} rounded-lg p-4 text-center`}>
                      <p className={`text-3xl font-bold ${item.txt}`}>
                        {item.val?.toLocaleString()}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">{item.label}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-bold ${item.badge}`}>
                        {item.persen}%
                      </span>
                    </div>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={dataGrafik} cx="50%" cy="50%" outerRadius={100} dataKey="value"
                         labelLine={false} label={CustomPieLabel}>
                      {dataGrafik.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v, n) => [`${v?.toLocaleString()} ulasan`, n]} />
                    <Legend formatter={(value) => {
                      const item = dataGrafik.find(d => d.name === value)
                      const pct  = statistik.total > 0
                        ? ((item?.value || 0) / statistik.total * 100).toFixed(1)
                        : '0'
                      return `${value} (${pct}%)`
                    }} />
                  </PieChart>
                </ResponsiveContainer>
              </section>
            )}
          </div>
        )}


        {/* ══ TAB DATASET ══ */}
        {aktifTab === 'dataset' && (
          <div className="space-y-6">
            {infoDataset && (
              <section className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Informasi Dataset</h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Total Data',  val: infoDataset.total_data  },
                    { label: 'Data Train',  val: infoDataset.total_train },
                    { label: 'Data Test',   val: infoDataset.total_test  },
                  ].map(item => (
                    <div key={item.label} className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-blue-700">{item.val?.toLocaleString()}</p>
                      <p className="text-gray-600 text-sm">{item.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Sumber: <span className="font-medium text-blue-600">{infoDataset.sumber}</span>
                </p>
              </section>
            )}
            <section className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Sampel Dataset</h2>
              <div className="space-y-3">
                {sampelDataset.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start border-b pb-3 last:border-0">
                    <span className={`px-2 py-1 rounded text-xs font-medium shrink-0 ${warnaBadge(item.label)}`}>
                      {item.label}
                    </span>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}


        {/* ══ TAB EVALUASI ══ */}
        {aktifTab === 'evaluasi' && (
          <div className="space-y-6">
            {evaluasi && evaluasi.naive_bayes && (
              <>
                {/* Chart 1: Perbandingan model penelitian ini */}
                <section className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-1">Perbandingan Model — Penelitian Ini</h2>
                  <p className="text-sm text-gray-500 mb-1">
                    Dataset: Indonesian_sentiment (Hugging Face) · 10.192 data · Model terbaik:{' '}
                    <span className="font-bold text-blue-700 uppercase">{evaluasi.model_terbaik}</span>
                  </p>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={dataEvaluasi}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metrik" />
                      <YAxis domain={[80, 100]} tickFormatter={v => `${v}%`} />
                      <Tooltip formatter={(val) => `${val}%`} />
                      <Legend />
                      <Bar dataKey="nb"  name="Naive Bayes" fill="#60a5fa">
                        <LabelList dataKey="nb"  position="top" formatter={v => `${v}%`} style={{ fontSize: 11 }} />
                      </Bar>
                      <Bar dataKey="svm" name="SVM"         fill="#1d4ed8">
                        <LabelList dataKey="svm" position="top" formatter={v => `${v}%`} style={{ fontSize: 11 }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </section>


                {/* Progress bar per model */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { nama: 'Naive Bayes', data: evaluasi.naive_bayes, color: 'bg-blue-400' },
                    { nama: 'SVM',         data: evaluasi.svm,         color: 'bg-blue-700' },
                  ].map(model => (
                    <section key={model.nama} className="bg-white rounded-xl shadow p-6">
                      <h3 className="font-semibold text-gray-700 mb-4">{model.nama}</h3>
                      <div className="space-y-3">
                        {[
                          ['Akurasi',   model.data.akurasi],
                          ['Precision', model.data.precision],
                          ['Recall',    model.data.recall],
                          ['F1-Score',  model.data.f1_score],
                        ].map(([label, val]) => (
                          <div key={label}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">{label}</span>
                              <span className="font-semibold text-blue-700">{val}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className={`${model.color} h-2 rounded-full`} style={{ width: `${val}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>


                {/* Chart 2: Perbandingan dengan penelitian terdahulu */}
                <section className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-1">
                    Perbandingan Akurasi dengan Penelitian Terdahulu
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Perbandingan akurasi Naive Bayes dan SVM antara penelitian ini dengan penelitian terdahulu
                    yang dijadikan referensi skripsi.
                  </p>


                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={dataJurnalBar} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name"
                        tick={{ fontSize: 11 }}
                        interval={0}
                        angle={-10}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis domain={[70, 100]} tickFormatter={v => `${v}%`} />
                      <Tooltip
                        formatter={(val, name) => [`${val}%`, name]}
                        contentStyle={{ fontSize: 12 }}
                      />
                      <Legend />
                      <Bar dataKey="Naive Bayes" fill="#93c5fd">
                        <LabelList dataKey="Naive Bayes" position="top"
                          formatter={v => `${v}%`} style={{ fontSize: 10 }} />
                      </Bar>
                      <Bar dataKey="SVM" fill="#1d4ed8">
                        <LabelList dataKey="SVM" position="top"
                          formatter={v => `${v}%`} style={{ fontSize: 10 }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>


                  {/* Tabel keterangan */}
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-50">
                          <th className="text-left px-3 py-2 text-gray-600 font-semibold">Penelitian</th>
                          <th className="text-center px-3 py-2 text-gray-600 font-semibold">NB (%)</th>
                          <th className="text-center px-3 py-2 text-gray-600 font-semibold">SVM (%)</th>
                          <th className="text-left px-3 py-2 text-gray-600 font-semibold">Keterangan Dataset</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataJurnal.map((j, i) => (
                          <tr key={i}
                            className={`border-t ${j.peneliti.includes('Penelitian') ? 'bg-blue-50 font-semibold' : ''}`}>
                            <td className="px-3 py-2 text-gray-700 whitespace-pre-line text-xs">{j.peneliti}</td>
                            <td className="px-3 py-2 text-center text-blue-600">{j.nb}%</td>
                            <td className="px-3 py-2 text-center text-blue-800 font-bold">{j.svm}%</td>
                            <td className="px-3 py-2 text-gray-500 text-xs">{j.keterangan}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>


                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-700 leading-relaxed">
                      <strong>Catatan:</strong> Penelitian ini menggunakan dataset Indonesian_sentiment dari Hugging Face
                      dengan 10.192 data ulasan e-commerce berbahasa Indonesia. SVM mencapai akurasi{' '}
                      <strong>{evaluasi?.svm?.akurasi || 88.44}%</strong>, kompetitif dengan penelitian Apriyani et al. (2024)
                      yang mencapai 93% namun dengan dataset yang berbeda (Twitter, 200 data).
                      Sumber: Sanjaya et al. (2023) INFOTECH; Apriyani et al. (2024) Knowbase;
                      Ali et al. (2024) Electronics MDPI; Nugroho & Handayani (2022) RESTI.
                    </p>
                  </div>
                </section>
              </>
            )}
          </div>
        )}


        {/* ══ TAB RIWAYAT ══ */}
        {aktifTab === 'riwayat' && (
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Riwayat Analisis</h2>
            {riwayat.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">
                Belum ada riwayat. Coba analisis beberapa ulasan dulu!
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600">
                    <th className="text-left px-4 py-2">Teks Ulasan</th>
                    <th className="text-left px-4 py-2">Sentimen</th>
                    <th className="text-left px-4 py-2">Model</th>
                    <th className="text-left px-4 py-2">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {riwayat.slice().reverse().map((item, i) => (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-2 max-w-xs truncate">{item.teks_asli}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${warnaBadge(item.sentimen)}`}>
                          {item.sentimen}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-500">{item.model_digunakan}</td>
                      <td className="px-4 py-2 text-gray-400">{item.waktu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}


      </main>
    </div>
  )
}