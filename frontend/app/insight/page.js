'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList,
         ResponsiveContainer, PieChart, Pie, Tooltip } from 'recharts'
import './insight.css'
const API = 'http://localhost:8000'

// ── PALET ──────────────────────────────────────────────
const INK    = '#0B0907'
const CREAM  = '#F5F0E8'
const MAROON = '#8B2E2E'
const GOLD   = '#C9A876'
const MUTED  = 'rgba(245,240,232,0.45)'

// Kata-per-kata reveal helper: bungkus tiap kata dalam <span> dengan delay bertingkat
function RevealLine({ text, delayStart = 0, className = '' }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="word-reveal" style={{ animationDelay: `${delayStart + i * 0.06}s` }}>
          <span style={{ animationDelay: `${delayStart + i * 0.06}s` }}>{w}&nbsp;</span>
        </span>
      ))}
    </span>
  )
}

export default function InsightPage() {
  const router  = useRouter()
  const [stats, setStats]   = useState(null)
  const [eval_, setEval]    = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [pertanyaan, setPertanyaan] = useState('')
  const [jawaban, setJawaban]       = useState('')
  const [askLoading, setAskLoading] = useState(false)
  const [askError, setAskError]     = useState('')

  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)
  const dotRef      = useRef(null)
  const ringRef     = useRef(null)
  const canvasRef   = useRef(null)
  const heroRef     = useRef(null)

  // Load data + auto-refresh berkala (polling) supaya insight ikut update
  // ketika ada analisis baru dari tab Analisis, tanpa perlu reload manual
  useEffect(() => {
    async function loadData() {
      try {
        const [s, e] = await Promise.all([
          axios.get(`${API}/statistik`),
          axios.get(`${API}/evaluasi`),
        ])
        setStats(s.data)
        setEval(e.data)
      } catch(err) {}
      setTimeout(() => setLoaded(true), 100)
    }
    loadData()
    const interval = setInterval(loadData, 8000) // refresh diam-diam tiap 8 detik
    return () => clearInterval(interval)
  }, [])

  // Custom cursor
  useEffect(() => {
    const moveCursor = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + 'px'
        ringRef.current.style.top  = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  // Parallax scroll (layered depth)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll reveal observer
  useEffect(() => {
    if (!loaded) return
    const refs = [section1Ref, section2Ref, section3Ref]
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.fade-up, .scale-in').forEach(el => {
            el.classList.add('visible')
          })
        }
      })
    }, { threshold: 0.12 })
    refs.forEach(r => { if (r.current) observer.observe(r.current) })
    return () => observer.disconnect()
  }, [loaded])

  // Canvas particle field — ribuan titik halus merepresentasikan ulasan individual,
  // bergerak perlahan dan menebal/menipis mengikuti rasio sentimen
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []
    let w, h

    function resize() {
      w = canvas.width  = canvas.offsetWidth * window.devicePixelRatio
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio
    }
    resize()
    window.addEventListener('resize', resize)

    const COUNT = 140
    const ratio = stats ? stats.positif / stats.total : 0.6
    for (let i = 0; i < COUNT; i++) {
      const positive = Math.random() < ratio
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.6 + 0.4) * window.devicePixelRatio,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        color: positive ? GOLD : MAROON,
        alpha: Math.random() * 0.35 + 0.15,
      })
    }

    function tick() {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      })
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [stats])

  const sentimentRatio = stats ? Math.round((stats.positif / stats.total) * 100) : 0

  async function tanyaInsight() {
    if (!pertanyaan.trim()) { setAskError('Tulis pertanyaan dulu.'); return }
    setAskLoading(true); setAskError(''); setJawaban('')
    try {
      const res = await axios.post(`${API}/insight/ask`, { pertanyaan })
      setJawaban(res.data.jawaban)
    } catch (err) {
      setAskError(err.response?.data?.detail || 'Gagal menghubungi layanan AI.')
    } finally {
      setAskLoading(false)
    }
  }

  const getHealth = () => {
    if (sentimentRatio >= 70) return { label: 'SANGAT BAIK', color: GOLD,   desc: 'Brand sentiment sangat kuat' }
    if (sentimentRatio >= 55) return { label: 'BAIK',        color: GOLD,   desc: 'Brand sentiment positif' }
    if (sentimentRatio >= 40) return { label: 'PERLU PERHATIAN', color: '#C97B3D', desc: 'Perlu perhatian segera' }
    return                             { label: 'KRITIS',    color: MAROON, desc: 'Brand sentiment kritis' }
  }
  const health = getHealth()

  const insights = [
    {
      no: '01', title: 'Dominasi Sentimen',
      body: stats
        ? `Dari ${stats.total.toLocaleString()} ulasan yang dianalisis, ${sentimentRatio}% bersifat positif. ${sentimentRatio >= 60 ? 'Pelanggan secara umum puas dengan produk dan layanan.' : 'Terdapat gap kepuasan yang perlu segera ditangani.'}`
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
      body: stats
        ? `Dengan ${stats.negatif.toLocaleString()} ulasan negatif (${100 - sentimentRatio}%), terdapat peluang perbaikan signifikan. Fokus pada area yang paling banyak mendapat feedback negatif.`
        : 'Memuat data...',
      action: 'Prioritaskan response time untuk ulasan negatif dan tingkatkan kualitas produk.',
    },
  ]

  const donutData = stats ? [
    { name: 'Positif', value: stats.positif, color: GOLD },
    { name: 'Negatif', value: stats.negatif, color: MAROON },
  ] : []

  const modelBarData = eval_ ? [
    { metrik: 'Akurasi',   nb: eval_.naive_bayes.akurasi,   svm: eval_.svm.akurasi },
    { metrik: 'Precision', nb: eval_.naive_bayes.precision, svm: eval_.svm.precision },
    { metrik: 'Recall',    nb: eval_.naive_bayes.recall,    svm: eval_.svm.recall },
    { metrik: 'F1-Score',  nb: eval_.naive_bayes.f1_score,  svm: eval_.svm.f1_score },
  ] : []

  // Magnetic hover handler — elemen mengikuti posisi cursor relatif secara halus
  function magnetMove(e) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const relX = (e.clientX - rect.left - rect.width / 2) * 0.25
    const relY = (e.clientY - rect.top - rect.height / 2) * 0.25
    el.style.transform = `translate(${relX}px, ${relY}px)`
  }
  function magnetLeave(e) {
    e.currentTarget.style.transform = 'translate(0, 0)'
    setIsHovering(false)
  }

  return (
    <div style={{ background: INK, minHeight: '100vh', color: CREAM, position: 'relative' }}>

      <div className="grain-overlay" />

      <div ref={dotRef} className="cursor-dot"/>
      <div ref={ringRef} className={`cursor-ring ${isHovering ? 'hovering' : ''}`}/>
      <div className="page-transition"/>

      <button
        className="btn-back"
        onClick={() => router.push('/')}
        onMouseMove={magnetMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={magnetLeave}
      >
        ← Dashboard
      </button>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 10vw 10vh',
        position: 'relative',
        overflow: 'hidden',
        background: `radial-gradient(ellipse 70% 60% at 78% 38%, rgba(139,46,46,0.16) 0%, ${INK} 62%)`,
      }}>

        {/* Particle field — parallax: bergerak lebih lambat dari scroll (layer jauh) */}
        <canvas ref={canvasRef} className="particle-canvas"
          style={{ transform: `translateY(${scrollY * 0.25}px)`, opacity: Math.max(0, 1 - scrollY / 500) }} />

        {/* Health Badge */}
        <div className="hero-text" style={{ marginBottom: '28px', position: 'relative', zIndex: 2 }}>
          <span className="tag" style={{
            background: `${health.color}1a`, color: health.color, border: `1px solid ${health.color}45`,
          }}>
            {health.label} — {health.desc}
          </span>
        </div>

        {/* Big Number — word-by-word reveal */}
        <h1 className="display-serif" style={{
          fontSize: 'clamp(52px, 9vw, 128px)', fontWeight: 600, lineHeight: 0.95,
          letterSpacing: '-0.02em', marginBottom: '48px', position: 'relative', zIndex: 2,
          transform: `translateY(${scrollY * 0.12}px)`,
        }}>
          <RevealLine text="Suara Pelanggan," delayStart={0.2} />
          <br/>
          <span className="word-reveal" style={{ animationDelay: '0.55s' }}>
            <span style={{ color: health.color, fontStyle: 'italic', fontWeight: 500, animationDelay: '0.55s' }}>
              {sentimentRatio}%
            </span>
          </span>
          {' '}
          <RevealLine text="Positif" delayStart={0.7} />
        </h1>

        {/* Stats Row */}
        <div className="hero-text" style={{
          display: 'flex', gap: '48px', flexWrap: 'wrap',
          borderTop: `1px solid rgba(245,240,232,0.1)`,
          paddingTop: '32px', position: 'relative', zIndex: 2,
        }}>
          {[
            { label: 'Total Ulasan',  val: stats?.total?.toLocaleString() || '...' },
            { label: 'Model Terbaik', val: 'SVM' },
            { label: 'Akurasi',       val: eval_ ? `${eval_.svm?.akurasi}%` : '...' },
            { label: 'Data Training', val: '7.926' },
          ].map(item => (
            <div key={item.label}>
              <p style={{ fontSize: '11px', color: 'rgba(245,240,232,0.4)',
                          letterSpacing: '0.15em', marginBottom: '8px', textTransform: 'uppercase' }}>
                {item.label}
              </p>
              <p className="display-serif" style={{ fontSize: '23px', fontWeight: 600 }}>
                {item.val}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          position: 'absolute', bottom: '48px', right: '10vw',
          fontSize: '11px', color: 'rgba(245,240,232,0.3)',
          letterSpacing: '0.2em', writingMode: 'vertical-rl',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          GULIR ↓
        </div>
      </section>

      <div className="divider"/>

      {/* ── SECTION 1: DISTRIBUSI ── */}
      <section ref={section1Ref} style={{ minHeight: '100vh', padding: '15vh 10vw', background: INK,
                display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '64px' }}>

        <div>
          <div className="fade-up sticky-label">
            <p style={{ fontSize: '11px', color: 'rgba(245,240,232,0.35)',
                        letterSpacing: '0.2em', marginBottom: '24px', textTransform: 'uppercase' }}>
              Distribusi Sentimen
            </p>
            <h2 className="display-serif" style={{ fontSize: 'clamp(32px, 4.2vw, 58px)',
                         fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.015em' }}>
              Bagaimana pelanggan<br/>
              <span style={{ color: 'rgba(245,240,232,0.3)', fontStyle: 'italic' }}>
                berbicara tentang brand
              </span>
            </h2>
          </div>
        </div>

        <div>
          {/* Donut chart besar dan dramatis — pengganti area kosong */}
          {stats && (
            <div className="fade-up scale-in" style={{ marginBottom: '40px' }}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={donutData} dataKey="value" cx="50%" cy="50%"
                       innerRadius={88} outerRadius={130} paddingAngle={3} stroke="none">
                    {donutData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#1a1512', border: '1px solid rgba(245,240,232,0.15)', borderRadius: 4 }}
                    itemStyle={{ color: CREAM, fontSize: 13 }}
                    formatter={(val, name) => [`${val.toLocaleString()} ulasan`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { label: 'Positif', val: stats?.positif || 0,
                pct: stats ? Math.round(stats.positif/stats.total*100) : 0, color: GOLD },
              { label: 'Negatif', val: stats?.negatif || 0,
                pct: stats ? Math.round(stats.negatif/stats.total*100) : 0, color: MAROON },
            ].map(item => (
              <div key={item.label} className="insight-card"
                onMouseMove={magnetMove} onMouseEnter={() => setIsHovering(true)} onMouseLeave={magnetLeave}>
                <p style={{ fontSize: '11px', color: 'rgba(245,240,232,0.4)',
                            letterSpacing: '0.15em', marginBottom: '16px', textTransform: 'uppercase' }}>
                  {item.label}
                </p>
                <p className="display-serif" style={{ fontSize: 'clamp(40px, 5vw, 64px)',
                            fontWeight: 600, color: item.color, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {item.pct}%
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(245,240,232,0.4)', marginTop: '10px' }}>
                  {item.val.toLocaleString()} ulasan
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* ── SECTION 2: INSIGHT ── */}
      <section ref={section2Ref} style={{ minHeight: '100vh', padding: '15vh 10vw', background: '#0E0B09' }}>
        <div className="fade-up">
          <p style={{ fontSize: '11px', color: 'rgba(245,240,232,0.35)',
                      letterSpacing: '0.2em', marginBottom: '24px', textTransform: 'uppercase' }}>
            Insight &amp; Strategi
          </p>
          <h2 className="display-serif" style={{ fontSize: 'clamp(34px, 5vw, 68px)',
                       fontWeight: 600, lineHeight: 1.08, marginBottom: '48px', letterSpacing: '-0.015em' }}>
            Rekomendasi untuk<br/>
            <span style={{ color: 'rgba(245,240,232,0.3)', fontStyle: 'italic' }}>manajemen internal</span>
          </h2>
        </div>

        {/* ── KOLOM SEARCH AI ── */}
        <div className="fade-up" style={{ marginBottom: '80px', maxWidth: '760px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            border: `1px solid ${jawaban || askError ? 'rgba(201,168,118,0.4)' : 'rgba(245,240,232,0.15)'}`,
            borderRadius: '100px', padding: '8px 8px 8px 28px',
            background: 'rgba(245,240,232,0.03)', transition: 'border-color 0.3s ease',
          }}>
            <input
              type="text"
              value={pertanyaan}
              onChange={e => setPertanyaan(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') tanyaInsight() }}
              placeholder="Tanyakan sesuatu tentang data ini…"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: CREAM, fontSize: '15px', fontFamily: 'Inter, sans-serif',
              }}
            />
            <button
              onClick={tanyaInsight}
              disabled={askLoading}
              onMouseMove={magnetMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={magnetLeave}
              style={{
                background: GOLD, color: INK, border: 'none', borderRadius: '100px',
                padding: '12px 26px', fontSize: '13px', fontWeight: 600, cursor: 'none',
                letterSpacing: '0.02em', whiteSpace: 'nowrap', opacity: askLoading ? 0.6 : 1,
              }}
            >
              {askLoading ? 'Memproses…' : 'Tanya'}
            </button>
          </div>

          {askError && (
            <p style={{ fontSize: '13px', color: MAROON, marginTop: '14px' }}>
              {askError}
            </p>
          )}

          {jawaban && (
            <div className="insight-card" style={{ marginTop: '20px', padding: '28px 32px' }}>
              <p style={{ fontSize: '10px', color: 'rgba(201,168,118,0.6)',
                          letterSpacing: '0.18em', marginBottom: '12px', textTransform: 'uppercase' }}>
                Jawaban
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(245,240,232,0.85)' }}>
                {jawaban}
              </p>
            </div>
          )}

          <p style={{ fontSize: '11px', color: 'rgba(245,240,232,0.25)', marginTop: '14px', letterSpacing: '0.02em' }}>
            Jawaban dihasilkan AI berdasarkan data riwayat &amp; evaluasi model yang sedang berjalan saat ini.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {insights.map((item) => (
            <div key={item.no} className="fade-up"
              onMouseMove={magnetMove} onMouseEnter={() => setIsHovering(true)} onMouseLeave={magnetLeave}
              style={{
                display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: '48px', alignItems: 'start',
                padding: '40px 0', borderBottom: '1px solid rgba(245,240,232,0.07)',
              }}
            >
              <p className="display-serif" style={{ fontSize: '13px', color: 'rgba(201,168,118,0.45)',
                          fontWeight: 600, letterSpacing: '0.05em', paddingTop: '4px' }}>
                {item.no}
              </p>
              <div>
                <h3 className="display-serif" style={{ fontSize: '22px', fontWeight: 600,
                             marginBottom: '16px', letterSpacing: '-0.005em' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(245,240,232,0.5)' }}>
                  {item.body}
                </p>
              </div>
              <div style={{ borderLeft: '1px solid rgba(245,240,232,0.09)', paddingLeft: '48px' }}>
                <p style={{ fontSize: '10px', color: 'rgba(245,240,232,0.3)',
                            letterSpacing: '0.18em', marginBottom: '14px', textTransform: 'uppercase' }}>
                  Tindak Lanjut
                </p>
                <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'rgba(245,240,232,0.7)' }}>
                  {item.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider"/>

      {/* ── SECTION 3: MODEL ── */}
      <section ref={section3Ref} style={{ minHeight: '90vh', padding: '15vh 10vw', background: INK }}>
        <div className="fade-up">
          <p style={{ fontSize: '11px', color: 'rgba(245,240,232,0.35)',
                      letterSpacing: '0.2em', marginBottom: '24px', textTransform: 'uppercase' }}>
            Performa Model AI
          </p>
          <h2 className="display-serif" style={{ fontSize: 'clamp(34px, 5vw, 68px)',
                       fontWeight: 600, lineHeight: 1.08, marginBottom: '64px', letterSpacing: '-0.015em' }}>
            Naive Bayes vs SVM<br/>
            <span style={{ color: 'rgba(245,240,232,0.3)', fontStyle: 'italic' }}>perbandingan akurasi</span>
          </h2>
        </div>

        {/* Bar chart besar — perbandingan 4 metrik, recharts */}
        {eval_ && (
          <div className="fade-up scale-in" style={{ marginBottom: '56px' }}>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={modelBarData} barGap={6}>
                <CartesianGrid strokeDasharray="2 6" stroke="rgba(245,240,232,0.08)" vertical={false} />
                <XAxis dataKey="metrik" tick={{ fill: 'rgba(245,240,232,0.5)', fontSize: 12 }} axisLine={{ stroke: 'rgba(245,240,232,0.1)' }} tickLine={false} />
                <YAxis domain={[80, 100]} tick={{ fill: 'rgba(245,240,232,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#1a1512', border: '1px solid rgba(245,240,232,0.15)', borderRadius: 4 }}
                  itemStyle={{ fontSize: 13 }}
                  formatter={(val) => `${val}%`}
                />
                <Bar dataKey="nb" name="Naive Bayes" fill="rgba(245,240,232,0.35)" radius={[2,2,0,0]} />
                <Bar dataKey="svm" name="SVM" fill={GOLD} radius={[2,2,0,0]}>
                  <LabelList dataKey="svm" position="top" formatter={(v) => `${v}%`} style={{ fill: GOLD, fontSize: 11 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: '24px', marginTop: '16px', fontSize: '12px', color: 'rgba(245,240,232,0.4)' }}>
              <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'rgba(245,240,232,0.35)', marginRight: 6 }}/>Naive Bayes</span>
              <span><span style={{ display: 'inline-block', width: 10, height: 10, background: GOLD, marginRight: 6 }}/>SVM</span>
            </div>
          </div>
        )}

        {eval_ && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { nama: 'Naive Bayes', data: eval_.naive_bayes, color: 'rgba(245,240,232,0.55)', winner: false },
              { nama: 'SVM',         data: eval_.svm,         color: GOLD, winner: true  },
            ].map(model => (
              <div key={model.nama} className="fade-up insight-card"
                onMouseMove={magnetMove} onMouseEnter={() => setIsHovering(true)} onMouseLeave={magnetLeave}
                style={{ borderColor: model.winner ? 'rgba(201,168,118,0.25)' : undefined }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <h3 className="display-serif" style={{ fontSize: '20px', fontWeight: 600 }}>{model.nama}</h3>
                  {model.winner && (
                    <span className="tag" style={{ background: `${GOLD}1a`, color: GOLD, border: `1px solid ${GOLD}45` }}>
                      Terbaik
                    </span>
                  )}
                </div>
                {[
                  ['Akurasi',   model.data?.akurasi],
                  ['Precision', model.data?.precision],
                  ['Recall',    model.data?.recall],
                  ['F1-Score',  model.data?.f1_score],
                ].map(([label, val]) => (
                  <div key={label} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.05em' }}>{label}</span>
                      <span className="display-serif" style={{ fontSize: '13px', fontWeight: 600, color: model.color }}>{val}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: loaded ? `${val}%` : '0%', background: model.color }}/>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: '80px 10vw', borderTop: '1px solid rgba(245,240,232,0.07)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: '#070504', flexWrap: 'wrap', gap: '24px',
      }}>
        <div>
          <p className="display-serif" style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '8px' }}>
            Sentimen<span style={{ color: GOLD, fontStyle: 'italic' }}>Pro</span>
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(245,240,232,0.3)', letterSpacing: '0.05em' }}>
            Ditenagai oleh Naive Bayes &amp; SVM
          </p>
        </div>
        <button
          className="magnetic-btn"
          onClick={() => router.push('/')}
          onMouseMove={e => {
            magnetMove(e)
            e.currentTarget.style.background = GOLD
            e.currentTarget.style.color = INK
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={e => {
            magnetLeave(e)
            e.currentTarget.style.background = CREAM
            e.currentTarget.style.color = INK
          }}
          style={{
            background: CREAM, color: INK, border: 'none', padding: '18px 40px',
            borderRadius: '100px', fontSize: '14px', fontWeight: 600, cursor: 'none',
            letterSpacing: '0.02em',
          }}
        >
          Kembali ke Dashboard →
        </button>
      </footer>
    </div>
  )
}