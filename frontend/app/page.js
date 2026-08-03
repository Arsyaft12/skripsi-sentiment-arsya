'use client'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList,
  LineChart, Line, AreaChart, Area
} from 'recharts'
import { useRouter } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://backend-ten-beta-64.vercel.app'

// ─── CUSTOM PIE LABEL ───────────────────────────────────
const RADIAN = Math.PI / 180
function CustomPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
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

// ─── CONFIDENCE BADGE ───────────────────────────────────
function ConfidenceBadge({ value }) {
  const color = value >= 80 ? 'bg-green-100 text-green-700 border-green-200'
    : value >= 60 ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
    : 'bg-red-100 text-red-700 border-red-200'
  const label = value >= 80 ? 'Sangat Yakin' : value >= 60 ? 'Cukup Yakin' : 'Kurang Yakin'
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"/>
      {value?.toFixed(1)}% — {label}
    </span>
  )
}

export default function Dashboard() {
  const [aktifTab, setAktifTab]         = useState('analisis')
  const [subTab, setSubTab]             = useState('manual')
  const [teksInput, setTeksInput]       = useState('')
  const [modelPilihan, setModelPilihan] = useState('svm')
  const [modeDual, setModeDual]         = useState(false)
  const [hasilPrediksi, setHasilPrediksi] = useState(null)
  const [hasilDual, setHasilDual]       = useState(null)
  const [loading, setLoading]           = useState(false)
  const [statistik, setStatistik]       = useState(null)
  const [riwayat, setRiwayat]           = useState([])
  const [infoDataset, setInfoDataset]   = useState(null)
  const [sampelDataset, setSampelDataset] = useState([])
  const [evaluasi, setEvaluasi]         = useState(null)
  const [detailPrep, setDetailPrep]     = useState(null)
  const [error, setError]               = useState('')

  // Trend
  const [trendData, setTrendData]       = useState([])
  const [periodeTrend, setPeriodeTrend] = useState('harian')
  const [loadingTrend, setLoadingTrend] = useState(false)

  // Rekomendasi
  const [rekomendasi, setRekomendasi]   = useState(null)
  const [loadingRek, setLoadingRek]     = useState(false)

  // CSV
  const [csvFile, setCsvFile]           = useState(null)
  const [csvLoading, setCsvLoading]     = useState(false)
  const [csvResult, setCsvResult]       = useState(null)
  const [csvRows, setCsvRows]           = useState([])
  const [modelCsv, setModelCsv]         = useState('svm')
  const fileInputRef                    = useRef(null)

  const router = useRouter()

  useEffect(() => { muatSemua() }, [])

  async function muatSemua() {
    try {
      const [stat, info, samp, eval_, riw] = await Promise.all([
        axios.get(`${API}/statistik`),
        axios.get(`${API}/dataset/info`),
        axios.get(`${API}/dataset/sampel?jumlah=10`),
        axios.get(`${API}/evaluasi`),
        axios.get(`${API}/riwayat?limit=10`),
      ])
      setStatistik(stat.data)
      setInfoDataset(info.data)
      setSampelDataset(samp.data.data || [])
      setEvaluasi(eval_.data)
      setRiwayat(riw.data.data || [])
    } catch (err) {}
  }

  // ─── ANALISIS MANUAL ──────────────────────────────────
  async function prediksiSentimen() {
    if (!teksInput.trim()) { setError('Masukkan teks dulu!'); return }
    setLoading(true); setError('')
    setHasilPrediksi(null); setHasilDual(null)
    try {
      if (modeDual) {
        const res = await axios.post(`${API}/prediksi/dual`, { teks: teksInput })
        setHasilDual(res.data)
        setDetailPrep(res.data.preprocessing)
      } else {
        const res = await axios.post(`${API}/prediksi`, { teks: teksInput, model: modelPilihan })
        setHasilPrediksi(res.data)
        setDetailPrep(res.data.preprocessing)
      }
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

  // ─── UPLOAD CSV ───────────────────────────────────────
  async function handleCsvFile(file) {
    if (!file || !file.name.endsWith('.csv')) { alert('File harus .csv'); return }
    setCsvFile(file); setCsvLoading(true); setCsvResult(null); setCsvRows([])
    try {
      const formData = new FormData()
      formData.append('file', file)
      const { data } = await axios.post(
        `${API}/upload-csv?model=${modelCsv}`,
        formData
      )
      setCsvResult(data); setCsvRows(data.hasil || [])
      const stat = await axios.get(`${API}/statistik`)
      setStatistik(stat.data)
    } catch (e) {
      alert('Gagal memproses CSV: ' + (e.response?.data?.detail || e.message))
    }
    setCsvLoading(false)
  }

  function exportCsv() {
    if (!csvRows.length) return
    const header = 'teks_asli,sentimen,confidence,model_digunakan,waktu\n'
    const rows = csvRows.map(r =>
      `"${(r.teks_asli||'').replace(/"/g,'""')}","${r.sentimen}","${r.confidence||0}%","${r.model_digunakan}","${r.waktu}"`
    ).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `hasil_sentimen_${new Date().toISOString().slice(0,10)}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  // ─── TREND ────────────────────────────────────────────
  async function muatTrend(periode) {
    setLoadingTrend(true)
    try {
      const res = await axios.get(`${API}/trend?periode=${periode}&limit=30`)
      setTrendData(res.data.data || [])
    } catch (err) {}
    setLoadingTrend(false)
  }

  // ─── REKOMENDASI ──────────────────────────────────────
  async function muatRekomendasi() {
    setLoadingRek(true)
    try {
      const res = await axios.get(`${API}/rekomendasi?limit=500`)
      setRekomendasi(res.data)
    } catch (err) {}
    setLoadingRek(false)
  }

  useEffect(() => {
    if (aktifTab === 'trend') muatTrend(periodeTrend)
    if (aktifTab === 'rekomendasi') muatRekomendasi()
  }, [aktifTab])

  useEffect(() => {
    if (aktifTab === 'trend') muatTrend(periodeTrend)
  }, [periodeTrend])

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

  const dataJurnalBar = [
    { name: 'Sanjaya et al.\n(2023)', 'Naive Bayes': 85.0, 'SVM': 81.0 },
    { name: 'Apriyani et al.\n(2024)', 'Naive Bayes': 85.0, 'SVM': 93.0 },
    { name: 'Ali et al.\n(2024)', 'Naive Bayes': 82.2, 'SVM': 89.7 },
    { name: 'Nugroho &\nHandayani (2022)', 'Naive Bayes': 80.0, 'SVM': 82.7 },
    { name: 'Analisis\n2026', 'Naive Bayes': evaluasi?.naive_bayes?.akurasi || 87.56, 'SVM': evaluasi?.svm?.akurasi || 88.44 },
  ]

  const tabs = [
    { id: 'analisis', label: 'Analisis', accent: '#2563eb', textColor: '#2563eb' },
    { id: 'dataset', label: 'Dataset', accent: '#0f766e', textColor: '#0f766e' },
    { id: 'evaluasi', label: 'Evaluasi', accent: '#7c3aed', textColor: '#7c3aed' },
    { id: 'trend', label: 'Trend', accent: '#db2777', textColor: '#db2777' },
    { id: 'rekomendasi', label: 'Rekomendasi', accent: '#ea580c', textColor: '#ea580c' },
    { id: 'riwayat', label: 'Riwayat', accent: '#0891b2', textColor: '#0891b2' },
  ]

  const overviewStats = [
    { label: 'Total data', value: (statistik?.total || infoDataset?.total_data || 0).toLocaleString(), tone: 'blue' },
    { label: 'Positif', value: (statistik?.positif || 0).toLocaleString(), tone: 'green' },
    { label: 'Negatif', value: (statistik?.negatif || 0).toLocaleString(), tone: 'red' },
    { label: 'Akurasi SVM', value: evaluasi?.svm?.akurasi ? `${evaluasi.svm.akurasi}%` : '—', tone: 'violet' },
  ]

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-kicker">Sentiment Intelligence Hub</span>
          <h1>Dashboard Analisis Sentimen 2026</h1>
          <p>
            Insight operasional terkini untuk ulasan e-commerce. Visualisasi ini dipadu dengan model SVM dan Naive Bayes untuk mendukung keputusan bisnis berbasis data.
          </p>
        </div>
        <button className="dashboard-button" onClick={() => router.push('/insight')}>
          ✦ Generate Insight →
        </button>
      </header>

      <div className="dashboard-tabbar">
        <div className="dashboard-tabs">
          {tabs.map(tab => {
            const active = aktifTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setAktifTab(tab.id)}
                className={`dashboard-tab ${active ? 'active' : ''}`}
                style={{
                  background: active ? tab.accent : 'transparent',
                  color: active ? '#fff' : tab.textColor,
                  boxShadow: active ? `0 12px 24px ${tab.accent}22` : 'none',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <main className="dashboard-main">
        <section className="dashboard-hero">
          <div>
            <span className="dashboard-kicker">Executive Summary</span>
            <h2>Ringkasan performa analisis sentimen</h2>
            <p>
              Analisis ini menggabungkan data sentiment, performa model, dan distribusi ulasan untuk memberikan gambaran prioritas perbaikan produk dan layanan.
            </p>
          </div>
          <div className="dashboard-hero-stats">
            {overviewStats.map((item) => (
              <div key={item.label} className={`dashboard-stat-card dashboard-stat-card--${item.tone}`}>
                <p>{item.label}</p>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* ══ ANALISIS ══ */}
        {aktifTab === 'analisis' && (
          <div className="space-y-6">
            <div className="dashboard-card">
              <div className="dashboard-subtabs">
                {[
                  { key: 'manual', label: 'Teks Ulasan Manual' },
                  { key: 'csv', label: 'Import CSV Eksternal' },
                ].map(t => (
                  <button
                    key={t.key}
                    onClick={() => setSubTab(t.key)}
                    className={`dashboard-subtab ${subTab === t.key ? 'active' : ''}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="p-6">

                {/* MANUAL */}
                {subTab === 'manual' && (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-700">Analisis Ulasan Baru</h2>
                      {/* Toggle Dual Mode */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span className="text-sm text-gray-500">Mode Dual NB+SVM</span>
                        <div onClick={() => setModeDual(!modeDual)}
                          className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer
                            ${modeDual ? 'bg-blue-600' : 'bg-gray-300'}`}>
                          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all
                            ${modeDual ? 'left-5' : 'left-0.5'}`}/>
                        </div>
                      </label>
                    </div>

                    <textarea
                      className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      rows={4} placeholder="Masukkan teks ulasan produk di sini..."
                      value={teksInput} onChange={e => setTeksInput(e.target.value)}
                    />

                    <div className="flex items-center gap-4 mt-3">
                      {!modeDual && (
                        <select className="border rounded-lg px-3 py-2 text-sm"
                          value={modelPilihan} onChange={e => setModelPilihan(e.target.value)}>
                          <option value="svm">Model: SVM (88.44%)</option>
                          <option value="naive_bayes">Model: Naive Bayes (87.56%)</option>
                        </select>
                      )}
                      {modeDual && (
                        <span className="text-sm text-blue-600 font-medium px-3 py-2 bg-blue-50 rounded-lg">
                          ⚡ Membandingkan NB + SVM sekaligus
                        </span>
                      )}
                      <button onClick={prediksiSentimen} disabled={loading}
                        className="bg-blue-700 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-800 disabled:opacity-50">
                        {loading ? 'Memproses...' : modeDual ? '⚡ Bandingkan Kedua Model' : '🔍 Analisis Sentimen'}
                      </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    {/* Hasil single model */}
                    {hasilPrediksi && !modeDual && (
                      <div className="mt-5">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${warnaBadge(hasilPrediksi.sentimen)}`}>
                            {hasilPrediksi.sentimen}
                          </span>
                          <span className="text-gray-500 text-sm">oleh {hasilPrediksi.model_digunakan}</span>
                          {hasilPrediksi.confidence > 0 && (
                            <ConfidenceBadge value={hasilPrediksi.confidence} />
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">&quot;{hasilPrediksi.teks_asli}&quot;</p>

                        {/* Confidence scores */}
                        {hasilPrediksi.confidence_scores && Object.keys(hasilPrediksi.confidence_scores).length > 0 && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-3">
                            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Distribusi Keyakinan Model</p>
                            {Object.entries(hasilPrediksi.confidence_scores).map(([label, pct]) => (
                              <div key={label} className="mb-2">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="capitalize text-gray-600">{label}</span>
                                  <span className="font-semibold">{pct}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className={`h-2 rounded-full ${label === 'positif' ? 'bg-green-500' : 'bg-red-400'}`}
                                    style={{ width: `${pct}%` }}/>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {detailPrep && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Preprocessing Step by Step</p>
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

                    {/* Hasil DUAL model */}
                    {hasilDual && modeDual && (
                      <div className="mt-5 space-y-4">
                        <p className="text-sm text-gray-500">&quot;{hasilDual.teks_asli}&quot;</p>

                        {/* Kartu perbandingan */}
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { key: 'naive_bayes', label: 'Naive Bayes', akurasi: '87.56%', color: 'blue' },
                            { key: 'svm',         label: 'SVM',         akurasi: '88.44%', color: 'indigo' },
                          ].map(m => {
                            const hasil = hasilDual[m.key]
                            return (
                              <div key={m.key}
                                className={`border-2 rounded-xl p-4 ${m.key === 'svm' ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold text-gray-700">{m.label}</span>
                                  {m.key === 'svm' && (
                                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Terbaik</span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-400 mb-3">Akurasi model: {m.akurasi}</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold uppercase mb-2 ${warnaBadge(hasil.sentimen)}`}>
                                  {hasil.sentimen}
                                </span>
                                <div className="mt-2">
                                  <ConfidenceBadge value={hasil.confidence} />
                                </div>
                                {/* Mini bar confidence */}
                                {hasil.confidence_scores && Object.entries(hasil.confidence_scores).map(([lbl, pct]) => (
                                  <div key={lbl} className="mt-2">
                                    <div className="flex justify-between text-xs text-gray-500 mb-0.5">
                                      <span className="capitalize">{lbl}</span>
                                      <span>{pct}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                      <div className={`h-1.5 rounded-full ${lbl === 'positif' ? 'bg-green-500' : 'bg-red-400'}`}
                                        style={{ width: `${pct}%` }}/>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )
                          })}
                        </div>

                        {/* Kesimpulan */}
                        <div className={`p-4 rounded-xl border ${hasilDual.kesimpulan.sepakat ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                          <p className="text-sm font-semibold text-gray-700 mb-1">
                            {hasilDual.kesimpulan.sepakat ? '✅ Kedua model sepakat' : '⚠️ Model berbeda pendapat'}
                          </p>
                          <p className="text-sm text-gray-600">{hasilDual.kesimpulan.catatan}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-gray-500">Sentimen final (SVM):</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${warnaBadge(hasilDual.kesimpulan.sentimen_final)}`}>
                              {hasilDual.kesimpulan.sentimen_final}
                            </span>
                            <ConfidenceBadge value={hasilDual.kesimpulan.confidence_final} />
                          </div>
                        </div>

                        {/* Preprocessing */}
                        {detailPrep && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Preprocessing Step by Step</p>
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

                {/* CSV IMPORT */}
                {subTab === 'csv' && (
                  <>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Import CSV Eksternal</h2>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                      Upload file CSV berisi kolom ulasan dari Shopee/Tokopedia/Lazada.
                      Sistem akan preprocessing → TF-IDF → prediksi + confidence score → simpan ke database.
                      <br/><span className="text-xs text-gray-400">Kolom yang dikenali: text, teks, ulasan, review, content, comment</span>
                    </p>

                    <div className="flex gap-3 mb-4">
                      {[{ key: 'svm', label: 'SVM (88.44%)' }, { key: 'naive_bayes', label: 'Naive Bayes (87.56%)' }].map(m => (
                        <button key={m.key} onClick={() => setModelCsv(m.key)}
                          className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors
                            ${modelCsv === m.key ? 'bg-blue-50 border-blue-400 text-blue-700' : 'border-gray-300 text-gray-600 hover:border-gray-400'}`}>
                          {m.label}
                        </button>
                      ))}
                    </div>

                    <input type="file" ref={fileInputRef} accept=".csv" className="hidden"
                      onChange={e => handleCsvFile(e.target.files[0])} />
                    <div onClick={() => fileInputRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor='#3b82f6' }}
                      onDragLeave={e => { e.currentTarget.style.borderColor='#d1d5db' }}
                      onDrop={e => { e.preventDefault(); handleCsvFile(e.dataTransfer.files[0]) }}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors">
                      <div className="text-4xl mb-3">📂</div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Klik atau drag & drop file CSV</p>
                      <p className="text-xs text-gray-400">Maksimal 5MB · Format: CSV dengan header kolom</p>
                    </div>

                    {csvLoading && (
                      <div className="text-center py-8">
                        <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"/>
                        <p className="text-sm text-gray-500">Memproses {csvFile?.name}...</p>
                      </div>
                    )}

                    {csvResult && !csvLoading && (
                      <div className="mt-5 space-y-4">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-sm font-semibold text-gray-700">{csvFile?.name}</p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {csvResult.total_diproses} ulasan · model: {modelCsv === 'svm' ? 'SVM' : 'Naive Bayes'}
                                {csvResult.rata_rata_confidence > 0 && ` · Rata-rata confidence: ${csvResult.rata_rata_confidence}%`}
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
                              { label: 'Positif', val: csvResult.positif, pct: csvResult.persen_positif, color: 'text-green-700' },
                              { label: 'Negatif', val: csvResult.negatif, pct: csvResult.persen_negatif, color: 'text-red-700' },
                            ].map(s => (
                              <div key={s.label} className="bg-white rounded-lg p-3 border">
                                <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                                {s.pct != null && <p className={`text-sm font-semibold ${s.color} mt-1`}>{s.pct}%</p>}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Preview Hasil (5 Pertama)</p>
                          <div className="space-y-2">
                            {csvRows.slice(0, 5).map((r, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ${warnaBadge(r.sentimen)}`}>
                                  {r.sentimen}
                                </span>
                                <span className="flex-1 truncate text-gray-600">{r.teks_asli}</span>
                                {r.confidence > 0 && (
                                  <span className="text-xs text-gray-400 shrink-0">{r.confidence?.toFixed(1)}%</span>
                                )}
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
                      <p className={`text-3xl font-bold ${item.txt}`}>{item.val?.toLocaleString()}</p>
                      <p className="text-gray-600 text-sm mt-1">{item.label}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-bold ${item.badge}`}>
                        {item.persen}%
                      </span>
                    </div>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={dataGrafik} cx="50%" cy="50%" outerRadius={100}
                         dataKey="value" labelLine={false} label={CustomPieLabel}>
                      {dataGrafik.map(entry => <Cell key={entry.name} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip formatter={(v, n) => [`${v?.toLocaleString()} ulasan`, n]} />
                    <Legend formatter={(value) => {
                      const item = dataGrafik.find(d => d.name === value)
                      const pct  = statistik.total > 0 ? ((item?.value||0)/statistik.total*100).toFixed(1) : '0'
                      return `${value} (${pct}%)`
                    }} />
                  </PieChart>
                </ResponsiveContainer>
              </section>
            )}
          </div>
        )}

        {/* ══ DATASET ══ */}
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
                <p className="text-sm text-gray-500">Sumber: <span className="font-medium text-blue-600">{infoDataset.sumber}</span></p>
              </section>
            )}
            <section className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Sampel Dataset</h2>
              <div className="space-y-3">
                {sampelDataset.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start border-b pb-3 last:border-0">
                    <span className={`px-2 py-1 rounded text-xs font-medium shrink-0 ${warnaBadge(item.label)}`}>{item.label}</span>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ══ EVALUASI ══ */}
        {aktifTab === 'evaluasi' && (
          <div className="space-y-6">
            {evaluasi && evaluasi.naive_bayes && (
              <>
                <section className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-1">Perbandingan Model — Analisis 2026</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Benchmark performa model pada dataset Indonesian_sentiment (Hugging Face) dengan 10.192 sampel. Model terpilih ditampilkan untuk rekomendasi implementasi.
                    <span className="font-bold text-blue-700 uppercase">{evaluasi.model_terbaik}</span>
                  </p>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={dataEvaluasi}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metrik" />
                      <YAxis domain={[80, 100]} tickFormatter={v => `${v}%`} />
                      <Tooltip formatter={val => `${val}%`} />
                      <Legend />
                      <Bar dataKey="nb" name="Naive Bayes" fill="#60a5fa">
                        <LabelList dataKey="nb" position="top" formatter={v => `${v}%`} style={{ fontSize: 11 }} />
                      </Bar>
                      <Bar dataKey="svm" name="SVM" fill="#1d4ed8">
                        <LabelList dataKey="svm" position="top" formatter={v => `${v}%`} style={{ fontSize: 11 }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </section>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { nama: 'Naive Bayes', data: evaluasi.naive_bayes, color: 'bg-blue-400' },
                    { nama: 'SVM',         data: evaluasi.svm,         color: 'bg-blue-700' },
                  ].map(model => (
                    <section key={model.nama} className="bg-white rounded-xl shadow p-6">
                      <h3 className="font-semibold text-gray-700 mb-4">{model.nama}</h3>
                      <div className="space-y-3">
                        {[['Akurasi', model.data.akurasi], ['Precision', model.data.precision],
                          ['Recall', model.data.recall], ['F1-Score', model.data.f1_score]].map(([label, val]) => (
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

                {/* Perbandingan dengan jurnal */}
                <section className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-1">Perbandingan dengan Literatur Akademik</h2>
                  <p className="text-sm text-gray-500 mb-4">Akurasi NB dan SVM dari jurnal referensi dibandingkan dengan hasil analisis 2026 ini.</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dataJurnalBar} margin={{ top: 20, right: 20, left: 0, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-10} textAnchor="end" height={70} />
                      <YAxis domain={[70, 100]} tickFormatter={v => `${v}%`} />
                      <Tooltip formatter={(val, name) => [`${val}%`, name]} />
                      <Legend />
                      <Bar dataKey="Naive Bayes" fill="#93c5fd">
                        <LabelList dataKey="Naive Bayes" position="top" formatter={v => `${v}%`} style={{ fontSize: 10 }} />
                      </Bar>
                      <Bar dataKey="SVM" fill="#1d4ed8">
                        <LabelList dataKey="SVM" position="top" formatter={v => `${v}%`} style={{ fontSize: 10 }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-700 leading-relaxed">
                      <strong>Sumber:</strong> Sanjaya et al. (2023) INFOTECH; Apriyani et al. (2024) Knowbase; Ali et al. (2024) Electronics MDPI; Nugroho & Handayani (2022) RESTI.
                    </p>
                  </div>
                </section>
              </>
            )}
          </div>
        )}

        {/* ══ TREND ══ */}
        {aktifTab === 'trend' && (
          <div className="space-y-6">
            <section className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Sentiment Trend Timeline</h2>
                  <p className="text-sm text-gray-500 mt-1">Tren sentimen berdasarkan waktu dari database</p>
                </div>
                <div className="flex gap-2">
                  {['harian', 'mingguan', 'bulanan'].map(p => (
                    <button key={p} onClick={() => setPeriodeTrend(p)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors capitalize
                        ${periodeTrend === p ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600 hover:border-blue-400'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {loadingTrend ? (
                <div className="flex items-center justify-center h-40">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"/>
                </div>
              ) : trendData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradPos" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="gradNeg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="tanggal" tick={{ fontSize: 10 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="positif" name="Positif" stroke="#22c55e"
                        fill="url(#gradPos)" strokeWidth={2} />
                      <Area type="monotone" dataKey="negatif" name="Negatif" stroke="#ef4444"
                        fill="url(#gradNeg)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>

                  {/* Trend % positif */}
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">% Positif per Periode</p>
                    <ResponsiveContainer width="100%" height={160}>
                      <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tanggal" tick={{ fontSize: 9 }} />
                        <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} />
                        <Tooltip formatter={v => `${v}%`} />
                        <Line type="monotone" dataKey="pct_positif" name="% Positif"
                          stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-4xl mb-3">📉</p>
                  <p className="text-sm">Belum ada data trend. Lakukan beberapa analisis terlebih dahulu.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ══ REKOMENDASI ══ */}
        {aktifTab === 'rekomendasi' && (
          <div className="space-y-6">
            <section className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Smart Recommendation Engine</h2>
                  <p className="text-sm text-gray-500 mt-1">Analisis pola ulasan negatif dan rekomendasi strategis otomatis</p>
                </div>
                <button onClick={muatRekomendasi}
                  className="px-4 py-2 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                  🔄 Refresh
                </button>
              </div>

              {loadingRek ? (
                <div className="flex items-center justify-center h-40">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"/>
                </div>
              ) : rekomendasi ? (
                <>
                  {/* Ringkasan */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'Total Analisis',  val: rekomendasi.total_analisis,                   color: 'text-gray-700', bg: 'bg-gray-50'   },
                      { label: 'Total Positif',   val: rekomendasi.total_positif,                    color: 'text-green-700', bg: 'bg-green-50'  },
                      { label: 'Total Negatif',   val: `${rekomendasi.total_negatif} (${rekomendasi.persen_negatif}%)`, color: 'text-red-700', bg: 'bg-red-50' },
                    ].map(s => (
                      <div key={s.label} className={`${s.bg} rounded-lg p-4 text-center border`}>
                        <p className={`text-xl font-bold ${s.color}`}>{s.val}</p>
                        <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg mb-6 border border-blue-100">
                    <p className="text-sm text-blue-700">{rekomendasi.ringkasan}</p>
                  </div>

                  {/* Kartu rekomendasi */}
                  <div className="space-y-4">
                    {rekomendasi.rekomendasi?.map((rek, i) => (
                      <div key={i} className="border rounded-xl p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{rek.icon}</span>
                            <div>
                              <h3 className="font-semibold text-gray-800">{rek.kategori}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                                ${rek.prioritas === 'TINGGI' ? 'bg-red-100 text-red-700'
                                  : rek.prioritas === 'SEDANG' ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-green-100 text-green-700'}`}>
                                Prioritas {rek.prioritas}
                              </span>
                            </div>
                          </div>
                          {rek.frekuensi > 0 && (
                            <span className="text-xs text-gray-400">Frekuensi: {rek.frekuensi}x</span>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                            <p className="text-xs font-semibold text-red-500 uppercase mb-1">Masalah Terdeteksi</p>
                            <p className="text-sm text-gray-700">{rek.masalah}</p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                            <p className="text-xs font-semibold text-green-600 uppercase mb-1">Rekomendasi Aksi</p>
                            <p className="text-sm text-gray-700">{rek.aksi}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Top kata negatif */}
                  {rekomendasi.top_kata_negatif?.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-gray-600 mb-3">Kata Paling Sering di Ulasan Negatif</p>
                      <div className="flex flex-wrap gap-2">
                        {rekomendasi.top_kata_negatif.map((k, i) => (
                          <span key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100 text-red-700 rounded-full text-sm">
                            {k.kata}
                            <span className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full font-semibold">{k.frekuensi}x</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-4xl mb-3">💡</p>
                  <p className="text-sm">Lakukan beberapa analisis terlebih dahulu untuk mendapatkan rekomendasi.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ══ RIWAYAT ══ */}
        {aktifTab === 'riwayat' && (
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Riwayat Analisis</h2>
            {riwayat.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">Belum ada riwayat.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600">
                    <th className="text-left px-4 py-2">Teks Ulasan</th>
                    <th className="text-left px-4 py-2">Sentimen</th>
                    <th className="text-left px-4 py-2">Confidence</th>
                    <th className="text-left px-4 py-2">Model</th>
                    <th className="text-left px-4 py-2">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {riwayat.slice().reverse().map((item, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 max-w-xs truncate">{item.teks_asli}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${warnaBadge(item.sentimen)}`}>
                          {item.sentimen}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-500">
                        {item.confidence > 0 ? `${item.confidence?.toFixed(1)}%` : '—'}
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

