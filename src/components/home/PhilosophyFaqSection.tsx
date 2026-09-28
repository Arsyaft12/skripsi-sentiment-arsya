'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Quote, 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  Target, 
  ShieldCheck, 
  ArrowRight,
  Brain,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { PRACTICE_PHILOSOPHY, FAQ_ITEMS } from '@/lib/clinicalData';

export function PhilosophyFaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="philosophy" className="py-24 px-6 md:px-12 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* ========================================================================= */}
        {/* PHILOSOPHY OF PRACTICE SECTION */}
        {/* ========================================================================= */}
        <div className="space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <Brain className="w-4 h-4" />
              <span>Filosofi Praktik Klinis</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
              Rehabilitasi Aktif <br className="hidden sm:inline" />
              <span className="grad-vi">&amp; Clinical Reasoning</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              {PRACTICE_PHILOSOPHY.headline}
            </p>
          </div>

          {/* Grand Philosophy Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-12 lg:p-14 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white border border-cyan-500/30 shadow-2xl relative overflow-hidden space-y-10"
          >
            <Quote className="w-20 h-20 text-cyan-400/15 absolute -top-3 -left-3 pointer-events-none" />

            <div className="space-y-8 relative z-10 max-w-4xl mx-auto">
              <div className="text-center space-y-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono font-bold uppercase tracking-widest text-cyan-300">
                  Prinsip Klinis Utama • Rehabilitasi Aktif &amp; Kemandirian Gerak
                </span>

                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug tracking-tight text-white italic pt-2">
                  {PRACTICE_PHILOSOPHY.quote}
                </blockquote>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-normal text-left sm:text-justify border-t border-white/10 pt-6">
                <p>
                  Saya memandang fisioterapi sebagai proses klinis yang berorientasi pada pemulihan kapasitas dan pemberdayaan individu, bukan sekadar pemberian intervensi untuk mengurangi gejala.
                </p>
                <p>
                  Praktik fisioterapi harus berangkat dari <em>clinical assessment</em> yang komprehensif, <em>clinical reasoning</em> berbasis bukti, serta pengambilan keputusan yang berpusat pada pasien. Intervensi kemudian diarahkan untuk mengoptimalkan <em>physical capacity</em>, <em>movement quality</em>, <em>functional performance</em>, <em>load tolerance</em>, dan <em>self-management</em> sesuai kebutuhan serta tujuan individual pasien.
                </p>
                <p>
                  Keberhasilan rehabilitasi tidak hanya diukur dari berkurangnya nyeri atau membaiknya impairment, tetapi dari kemampuan seseorang untuk kembali bergerak, berfungsi, berpartisipasi, dan menjalankan aktivitas yang memiliki makna dalam kehidupannya dengan aman, percaya diri, dan mandiri.
                </p>
                <p className="font-semibold text-white">
                  Pada akhirnya, fisioterapi bukan tentang seberapa lama pasien membutuhkan treatment, tetapi tentang seberapa jauh pasien mampu membangun kapasitas untuk tidak lagi bergantung pada treatment.
                </p>
              </div>

              {/* Core Mantra & Progression Banner */}
              <div className="pt-2 flex flex-col items-center gap-3 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-mono font-black tracking-widest uppercase shadow-inner">
                  <span>ASSESS</span>
                  <span className="text-white/40">•</span>
                  <span>UNDERSTAND</span>
                  <span className="text-white/40">•</span>
                  <span>RESTORE</span>
                  <span className="text-white/40">•</span>
                  <span>EMPOWER</span>
                  <span className="text-white/40">•</span>
                  <span>PERFORM</span>
                </div>
                <p className="text-xs sm:text-sm font-mono font-bold text-emerald-400/90 tracking-wide">
                  From symptom management → to capacity development → to functional independence.
                </p>
              </div>
            </div>

            {/* 6-Step Clinical Framework Diagram */}
            <div className="pt-6 border-t border-white/10 relative z-10">
              <div className="text-center mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                  6 Tahapan Kerangka Kerja Clinical Reasoning
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {PRACTICE_PHILOSOPHY.frameworkSteps.map((step, idx) => (
                  <div
                    key={step.num}
                    className="p-6 rounded-3xl bg-white/[0.05] border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.08] transition-all flex flex-col justify-between space-y-4 text-left group shadow-lg"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-black border border-cyan-400/30">
                          {step.num}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                          Tahap {step.num}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {step.title}
                      </h4>
                      {step.subtitle && (
                        <p className="text-xs font-semibold text-cyan-400/90 leading-tight">
                          {step.subtitle}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
        {/* ========================================================================= */}
        <div className="space-y-10">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Panduan &amp; Informasi Pasien</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Pertanyaan yang <span className="grad-vi">Sering Diajukan (FAQ)</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Jawaban berbasis bukti klinis seputar waktu konsultasi, modalitas terapi, return to sport, pencegahan cedera, dan program rehabilitasi.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white dark:bg-slate-900 border-cyan-500/60 shadow-xl'
                      : 'bg-white/70 dark:bg-slate-900/70 border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/30'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono font-bold text-cyan-600 dark:text-cyan-400 px-3 py-1 rounded-xl bg-cyan-500/10">
                        {faq.num}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {faq.question}
                      </h4>
                    </div>

                    <div className={`p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-cyan-500 text-white dark:text-white' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-slate-100 dark:border-slate-800"
                      >
                        <div className="p-6 sm:p-7 pt-4 space-y-4">
                          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-normal">
                            {faq.answer}
                          </p>

                          {faq.keyHighlight && (
                            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs sm:text-sm font-bold text-cyan-800 dark:text-cyan-300 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4 text-cyan-500 shrink-0" />
                              <span>{faq.keyHighlight}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
