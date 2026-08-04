'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import './insight.css'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function InsightPage() {
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [eval_, setEval] = useState(null)
  const [rek, setRek] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [error, setError] = useState('')
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiAnswer, setAiAnswer] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')

  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)
  const section4Ref = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        const [s, e, r] = await Promise.all([
          axios.get(`${API}/statistik`),
          axios.get(`${API}/evaluasi`),
          axios.get(`${API}/rekomendasi?limit=500`),
        ])

        if (!isMounted) return

        setStats(s?.data ?? null)
        setEval(e?.data ?? null)
        setRek(r?.data ?? null)
        setError('')
      } catch (err) {
        console.error('Gagal memuat data insight:', err)
        if (isMounted) {
          setError('Gagal memuat data insight. Pastikan koneksi backend publik aktif.')
        }
      } finally {
        if (isMounted) {
          window.setTimeout(() => setLoaded(true), 100)
        }
      }
    }

    loadData()
    return () => {
      isMounted = false
    }
  }, [])

  // Custom cursor
  useEffect(() => {
    const moveCursor = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
      if (ringRef.current) {
        setTimeout(() => {
          if (ringRef.current) {
            ringRef.current.style.left = e.clientX + 'px'
            ringRef.current.style.top = e.clientY + 'px'
          }
        }, 80)
      }
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  // Scroll observer
  useEffect(() => {
    if (!loaded || typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const refs = [section1Ref, section2Ref, section3Ref, section4Ref]
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.fade-up').forEach(el => {
            el.classList.add('visible')
          })
        }
      })
    }, { threshold: 0.1 })

    refs.forEach(r => { if (r.current) observer.observe(r.current) })
    return () => observer.disconnect()
  }, [loaded])

  const safeTotal = Number(stats?.total) || 0
  const safePositif = Number(stats?.positif) || 0
  const safeNegatif = Number(stats?.negatif) || 0
  const sentimentRatio = safeTotal > 0
    ? Math.round((safePositif / safeTotal) * 100)
    : 0
  const positivePct = safeTotal > 0 ? Math.round((safePositif / safeTotal) * 100) : 0
  const negativePct = safeTotal > 0 ? Math.round((safeNegatif / safeTotal) * 100) : 0

  const getHealth = () => {
    if (sentimentRatio >= 70) return { label: 'EXCELLENT', color: '#00ff88', desc: 'Brand sentiment sangat kuat' }
    if (sentimentRatio >= 55) return { label: 'GOOD', color: '#88ff00', desc: 'Brand sentiment positif' }
    if (sentimentRatio >= 40) return { label: 'WARNING', color: '#ffaa00', desc: 'Perlu perhatian segera' }
    return { label: 'CRITICAL', color: '#ff3344', desc: 'Brand sentiment kritis' }
  }
  const health = getHealth()
  const healthClass = sentimentRatio >= 70
    ? 'health-good'
    : sentimentRatio >= 55
      ? 'health-ok'
      : sentimentRatio >= 40
        ? 'health-warning'
        : 'health-critical'

  async function askInsightAi(e) {
    e.preventDefault()
    const question = aiQuestion.trim()
    if (!question) return

    setAiLoading(true)
    setAiError('')
    setAiAnswer('')

    try {
      const { data } = await axios.post(`${API}/ai/insight-chat`, {
        question,
        context: {
          stats,
          eval_: eval_,
          rek,
        },
      })
      setAiAnswer(data?.answer || 'Maaf, AI belum memberikan jawaban.')
    } catch (err) {
      setAiError(err.response?.data?.detail || err.message || 'Gagal menghubungkan AI Gemini.')
    } finally {
      setAiLoading(false)
    }
  }

  const aiSuggestions = [
    'Berikan solusi strategis untuk ulasan negatif yang paling sering muncul.',
    'Evaluasi performa model SVM dan Naive Bayes berdasarkan data saat ini.',
    'Apa prioritas tindakan terbaik untuk meningkatkan sentimen positif?',
  ]

  const insights = [
    {
      no: '01', title: 'Dominasi Sentimen',
      body: safeTotal > 0
        ? `Dari ${safeTotal.toLocaleString()} ulasan yang dianalisis, ${sentimentRatio}% bersifat positif. ${sentimentRatio >= 60
          ? 'Pelanggan secara umum puas dengan produk dan layanan.'
          : 'Terdapat gap kepuasan yang perlu segera ditangani.'
        }`
        : 'Memuat data...',
      action: sentimentRatio >= 60
        ? 'Pertahankan kualitas layanan dan produk yang sudah baik.'
        : 'Lakukan audit menyeluruh terhadap produk dan layanan.',
    },
    {
      no: '02', title: 'Performa Model AI',
      body: eval_
        ? `SVM mencapai akurasi ${eval_.svm?.akurasi}% dengan F1-Score ${eval_.svm?.f1_score}%, unggul dibandingkan Naive Bayes (${eval_.naive_bayes?.akurasi}%). Model terpilih mampu mengklasifikasikan sentimen dengan tingkat kepercayaan tinggi.`
        : 'Memuat data...',
      action: 'Gunakan model SVM sebagai engine utama untuk analisis sentimen real-time.',
    },
    {
      no: '03', title: 'Rekomendasi Strategis',
      body: rek
        ? `Dari ${Number(rek?.total_negatif || 0).toLocaleString()} ulasan negatif (${rek?.persen_negatif ?? 0}%), sistem mendeteksi pola keluhan yang perlu segera ditangani. ${rek?.ringkasan ?? 'Perlu tindakan segera.'}`
        : safeTotal > 0
          ? `Dengan ${safeNegatif.toLocaleString()} ulasan negatif (${100 - sentimentRatio}%), terdapat peluang perbaikan signifikan.`
          : 'Memuat data...',
      action: rek?.rekomendasi?.[0]?.aksi
        || 'Prioritaskan response time untuk ulasan negatif dan tingkatkan kualitas produk.',
    },
  ]

  return (
    <div className="insight-shell">
      <header className="insight-header">
        <button
          className="insight-back"
          onClick={() => router.push('/')}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          ← Kembali ke Dashboard
        </button>
        <span className="header-pill">Insight Analytics</span>
      </header>

      <main className="insight-main">
        <section className="hero-panel fade-up visible">
          <div className="hero-copy">
            <span className={`health-pill ${healthClass}`}>
              {health.label} • {health.desc}
            </span>
            <h1>
              Analisis sentimen<br />
              <span>{sentimentRatio}%</span> positif
            </h1>
            <p>
              Ringkasan performa brand, evaluasi model, dan prioritas tindakan yang paling relevan untuk tim Anda.
            </p>

            <div className="stat-grid">
              <div className="stat-card">
                <p>Total ulasan</p>
                <strong>{safeTotal.toLocaleString()}</strong>
              </div>
              <div className="stat-card">
                <p>Model terbaik</p>
                <strong>SVM</strong>
              </div>
              <div className="stat-card">
                <p>Akurasi SVM</p>
                <strong>{eval_ ? `${eval_.svm?.akurasi}%` : '—'}</strong>
              </div>
              <div className="stat-card">
                <p>Naive Bayes</p>
                <strong>{eval_ ? `${eval_.naive_bayes?.akurasi}%` : '—'}</strong>
              </div>
            </div>
          </div>

          <div className="ai-card">
            <label>AI Insight Assistant</label>
            <textarea
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              rows={4}
              placeholder="Tanyakan apa saja — solusi, evaluasi model, strategi, atau penjelasan umum..."
            />
            <div className="ai-actions">
              {aiSuggestions.map((suggestion) => (
                <button key={suggestion} type="button" className="ai-chip" onClick={() => setAiQuestion(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
            <button type="button" className="ai-submit" onClick={(e) => askInsightAi(e)} disabled={aiLoading}>
              {aiLoading ? 'Memproses...' : 'Tanya AI'}
            </button>
            {aiAnswer && <div className="ai-answer">{aiAnswer}</div>}
            {aiError && <div className="ai-answer" style={{ color: '#dc2626', borderColor: '#fecaca' }}>{aiError}</div>}
          </div>
        </section>

        <section className="section-card fade-up visible">
          <p className="section-kicker">01 — Distribusi Sentimen</p>
          <h2>Bagaimana pelanggan berbicara tentang brand</h2>
          <div className="section-grid">
            <div className="metric-card">
              <p className="metric-label">Positif</p>
              <p className="metric-value">{positivePct}%</p>
              <p className="metric-meta">{safePositif.toLocaleString()} ulasan</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${positivePct}%`, background: '#16a34a' }} />
              </div>
            </div>
            <div className="metric-card">
              <p className="metric-label">Negatif</p>
              <p className="metric-value">{negativePct}%</p>
              <p className="metric-meta">{safeNegatif.toLocaleString()} ulasan</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${negativePct}%`, background: '#dc2626' }} />
              </div>
            </div>
          </div>
        </section>

        <section className="section-card fade-up visible">
          <p className="section-kicker">02 — Insight & Strategi</p>
          <h2>Rekomendasi yang paling layak ditindaklanjuti</h2>
          <div>
            {insights.map((item) => (
              <div key={item.no} className="list-row">
                <div className="row-number">{item.no}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <div className="row-action">
                  <p style={{ fontSize: '12px', color: '#7a86a1', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Action Item
                  </p>
                  <p>{item.action}</p>
                </div>
              </div>
            ))}
          </div>

          {rek?.rekomendasi?.length > 0 && (
            <div className="recommend-grid">
              {rek.rekomendasi.map((r, i) => (
                <div key={i} className="recommend-card">
                  <div className="recommend-top">
                    <span>{r.icon || '•'}</span>
                    <div className="recommend-title">{r.kategori}</div>
                  </div>
                  <div className="tag" style={{ background: r.prioritas === 'TINGGI' ? '#fee2e2' : '#fef3c7', color: r.prioritas === 'TINGGI' ? '#b91c1c' : '#b45309', marginBottom: '8px' }}>
                    {r.prioritas}
                  </div>
                  <p className="recommend-text">{r.aksi}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="section-card fade-up visible">
          <p className="section-kicker">03 — Performa Model AI</p>
          <h2>Perbandingan model dan akurasi terbaru</h2>
          <div className="section-grid">
            {eval_ && eval_.naive_bayes && (
              [
                { nama: 'Naive Bayes', data: eval_.naive_bayes, color: '#2563eb', winner: false },
                { nama: 'SVM', data: eval_.svm, color: '#16a34a', winner: true },
              ].map((model) => (
                <div key={model.nama} className="metric-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <p className="metric-label">{model.nama}</p>
                    {model.winner && <span className="tag" style={{ background: '#dcfce7', color: '#15803d' }}>Terbaik</span>}
                  </div>
                  {[
                    ['Akurasi', model.data?.akurasi],
                    ['Precision', model.data?.precision],
                    ['Recall', model.data?.recall],
                    ['F1-Score', model.data?.f1_score],
                  ].map(([label, val]) => (
                    <div key={label} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: '#6b7a93', fontSize: '13px' }}>{label}</span>
                        <span style={{ color: model.color, fontWeight: 700 }}>{val}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${val || 0}%`, background: model.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </section>

        <footer className="insight-footer">
          <div>
            <strong>SentimenAI</strong>
            <span>Powered by Naive Bayes & SVM · Analisis 2026</span>
          </div>
          <button className="insight-back" onClick={() => router.push('/')}>
            Buka Dashboard →
          </button>
        </footer>
      </main>
    </div>
  )
}