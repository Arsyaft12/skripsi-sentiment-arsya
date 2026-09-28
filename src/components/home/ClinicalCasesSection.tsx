'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  Activity, 
  ChevronRight, 
  ArrowUpRight, 
  Target,
  Sparkles,
  ClipboardList,
  Flame,
  Award
} from 'lucide-react';
import { CLINICAL_CASES, ClinicalCase } from '@/lib/clinicalData';

export function ClinicalCasesSection() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CLINICAL_CASES[0].id);

  const activeCase = CLINICAL_CASES.find((c) => c.id === selectedCaseId) || CLINICAL_CASES[0];

  return (
    <section id="cases" className="py-24 px-6 md:px-12 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-purple-600/10 via-blue-600/5 to-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Laporan Kasus Berbasis Bukti Ilmiah</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
            Studi Kasus <span className="grad-vi">Klinis &amp; Hasil</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Dokumentasi komprehensif perjalanan rehabilitasi pasien, asesmen multidimensi, dan capaian hasil klinis objektif.
          </p>
        </div>

        {/* Case Selection Tabs (Case 01, Case 02, Case 03) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CLINICAL_CASES.map((item) => {
            const isSelected = selectedCaseId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCaseId(item.id)}
                className={`p-6 rounded-3xl text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white border-cyan-500/50 shadow-2xl scale-[1.02]'
                    : 'bg-white/70 dark:bg-slate-900/70 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    isSelected ? 'text-cyan-300' : 'text-cyan-600 dark:text-cyan-400'
                  }`}>
                    {item.caseNumber} • {item.category}
                  </span>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold line-clamp-1">
                  {item.title}
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${
                  isSelected ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {item.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Case Study Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="p-8 sm:p-10 rounded-[2.5rem] bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-10"
          >
            {/* Header of Active Case */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200/80 dark:border-slate-800 pb-8">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold font-mono">
                  <span>{activeCase.caseNumber}</span>
                  <span>•</span>
                  <span>{activeCase.category}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {activeCase.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
                  {activeCase.subtitle}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-semibold max-w-md lg:text-right">
                <span className="font-bold block text-slate-900 dark:text-white">Target Utama:</span>
                <span>{activeCase.clinicalGoal}</span>
              </div>
            </div>

            {/* 3-Column Breakdown: Initial Condition, Assessment, Rehabilitation Protocol */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Column 1: Initial Condition */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 space-y-3">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>Kondisi Awal Pasien</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeCase.initialCondition}
                </p>
              </div>

              {/* Column 2: Clinical Assessment */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 space-y-3">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                  <ClipboardList className="w-4 h-4" />
                  <span>Asesmen &amp; Pemeriksaan Klinis</span>
                </div>
                <div className="space-y-1.5">
                  {activeCase.clinicalAssessment.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Progressive Rehabilitation Program */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 space-y-3">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <Target className="w-4 h-4" />
                  <span>Program Rehabilitasi Progresif</span>
                </div>
                <div className="space-y-1.5">
                  {activeCase.rehabilitationProgram.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Objective Outcome Metrics Grid */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                <Award className="w-4 h-4 text-cyan-500" />
                <span>Capaian &amp; Metrik Klinis Objektif</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {activeCase.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border flex flex-col justify-between space-y-2 ${
                      metric.isHighlight
                        ? 'bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border-cyan-500/40'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800'
                    }`}
                  >
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {metric.label}
                    </span>

                    <div className="space-y-0.5">
                      {metric.before && (
                        <span className="text-[11px] text-slate-400 line-through block font-mono">
                          {metric.before}
                        </span>
                      )}
                      <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono text-cyan-600 dark:text-cyan-300">
                        {metric.after}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Clinical Summary Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/30 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 mr-2 font-mono uppercase tracking-wider">
                ✓ Ringkasan Hasil Klinis Terverifikasi:
              </span>
              <span>{activeCase.finalOutcome}</span>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
