'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  BookOpen, 
  FileDown,
  FolderGit2,
  Cpu,
  Smartphone,
  Megaphone,
  TrendingUp,
  Lightbulb,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { Experience, Education, Achievement } from '@/types/portfolio';

import { portfolioConfig } from '@/config/portfolio.config';

interface AboutSectionProps {
  experiences: Experience[];
  educationList: Education[];
  achievements: Achievement[];
}

export function AboutSection({ experiences, educationList }: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState<'journey' | 'education'>('journey');

  const sortedExperiences = [...experiences].sort((a, b) => a.display_order - b.display_order);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Present';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
      return dateString;
    }
  };

  const formatDateRange = (startDate: string, endDate?: string | null) => {
    try {
      const startYear = new Date(startDate).getFullYear();
      if (!endDate) return `${startYear} – Present`;
      const endYear = new Date(endDate).getFullYear();
      return `${startYear} – ${endYear}`;
    } catch {
      return startDate;
    }
  };

  const corePillars = portfolioConfig.aboutPillars.map((p, idx) => {
    const icons = [
      <GraduationCap key="1" className="w-5 h-5 text-blue-500" />,
      <Briefcase key="2" className="w-5 h-5 text-purple-500" />,
      <Lightbulb key="3" className="w-5 h-5 text-cyan-500" />,
      <Building2 key="4" className="w-5 h-5 text-emerald-500" />,
    ];
    return {
      ...p,
      icon: icons[idx % icons.length],
    };
  });

  return (
    <section id="about" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Tag & Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Profil &amp; Filosofi Klinis</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
            Tentang <span className="grad-vi">Fisioterapis</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            {portfolioConfig.personal.title}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3-COLUMN HERO ABOUT (Clean, Breathable, High Contrast) */}
        {/* ========================================================================= */}
        <div className="relative pt-4 pb-8">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8 relative z-10">
            
            {/* LEFT COLUMN: Large Typography & Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-4 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start"
            >
              <div className="space-y-2">
                <span className="text-lg sm:text-xl font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                  Halo, Saya
                </span>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                  {portfolioConfig.personal.name}
                </h3>
              </div>

              <div className="space-y-1.5 text-slate-700 dark:text-slate-300 text-sm sm:text-base font-semibold">
                <div className="flex items-center justify-center lg:justify-start gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  <span>{portfolioConfig.personal.title}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  <span>{portfolioConfig.personal.location}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href={portfolioConfig.personal.resumePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer shadow-md hover:scale-105 transition-transform"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Unduh Resume / CV</span>
                </a>
              </div>
            </motion.div>

            {/* CENTER COLUMN: Clean Cutout Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 flex justify-center items-end"
            >
              <div className="relative w-72 sm:w-88 h-88 sm:h-[440px] rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/15 border border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-slate-100 dark:from-slate-900 to-slate-200 dark:to-slate-950 flex items-end justify-center group">
                <Image
                  src={portfolioConfig.personal.avatarUrl}
                  alt={portfolioConfig.personal.name}
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Executive Narrative Bio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-4 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start"
            >
              <p className="text-base sm:text-lg lg:text-xl text-slate-800 dark:text-slate-200 leading-relaxed font-normal whitespace-pre-line space-y-3">
                {portfolioConfig.personal.bioLong}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-600 dark:text-cyan-300 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm hover:scale-105"
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>Lihat Layanan</span>
                </a>

                <a
                  href="#contact"
                  className="btn-secondary px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform"
                >
                  <span>Hubungi Saya</span>
                </a>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4 CORE SYNTHESIS PILLARS (Minimalist Clean Cards, No Nested Boards) */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                Pilar &amp; Sintesis Kompetensi Klinis
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Profil &amp; Kualifikasi Praktik
              </h3>
            </div>
            <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
              Sorotan Akademik, Pengalaman Klinis &amp; Keterampilan Teknis
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {corePillars.map((pillar) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-7 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400/60 transition-all duration-300 space-y-4 shadow-sm hover:shadow-xl"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-slate-300 dark:text-slate-700">
                      {pillar.num}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-inner">
                      {pillar.icon}
                    </div>
                  </div>

                  <span className={`px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border ${pillar.tagColor}`}>
                    {pillar.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {pillar.title}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {pillar.body}
                  </p>
                </div>

                {pillar.highlights && pillar.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {pillar.highlights.map((h, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PROFESSIONAL REGISTRATION, AFFILIATIONS & REGULATORY BODIES (STR, IFI, MKEF) */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                Badan Regulasi &amp; Legalitas Resmi
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Surat Tanda Registrasi (STR), Afiliasi &amp; Etik
              </h3>
            </div>
            <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
              Registrasi Legal Kemenkes RI &amp; Pengakuan Ikatan Profesi Nasional
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* STR Kemenkes Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-4 sm:p-6 md:p-7 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                    Berlaku Seumur Hidup
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                    <span>Surat Tanda Registrasi (STR)</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    KTKI — Kemenkes RI
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Registrasi resmi praktik fisioterapi dari Konsil Tenaga Kesehatan Indonesia (KTKI - Kemenkes RI).
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  No Reg: <strong className="text-slate-800 dark:text-slate-200">TD00001081657778</strong>
                </p>
                <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  Kompetensi: Fisioterapis (Ftr.)
                </p>
              </div>
            </motion.div>

            {/* IFI Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-4 sm:p-6 md:p-7 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="relative w-14 h-16 rounded-2xl overflow-hidden bg-white dark:bg-slate-950 p-1 flex items-center justify-center border border-slate-200 dark:border-slate-700/50 shadow-sm">
                    <Image
                      src="/assets/photos/logo-ifi.jpg"
                      alt="Ikatan Fisioterapi Indonesia (IFI)"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
                    Anggota PP IFI
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[11px] font-bold">
                    <span>Asosiasi Profesi</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Ikatan Fisioterapi Indonesia (IFI)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Anggota teregistrasi Pengurus Pusat IFI, aktif terakreditasi dalam pengembangan keprofesian berkelanjutan (SKP).
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                  Akreditasi: Tervalidasi SKP IFI
                </p>
              </div>
            </motion.div>

            {/* MKEF Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="p-4 sm:p-6 md:p-7 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-purple-500/50 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="relative w-14 h-16 rounded-2xl overflow-hidden bg-white dark:bg-slate-950 p-1 flex items-center justify-center border border-slate-200 dark:border-slate-700/50 shadow-sm">
                    <Image
                      src="/assets/photos/logo-mkef.jpg"
                      alt="Majelis Kehormatan dan Etik Fisioterapi (MKEF)"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-bold font-mono">
                    Anggota MKEF 2026-2030
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[11px] font-bold">
                    <span>Etika &amp; Tata Kelola Profesi</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Majelis Kehormatan dan Etik Fisioterapi (MKEF)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Berkomitmen pada standar etika medis tertinggi, keselamatan pasien, kerahasiaan medik, dan penegakan tata kelola profesi fisioterapi nasional.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                <p className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                  <span>Jabatan: Sekretaris Periode 2026-2027</span>
                </p>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Keanggotaan: Anggota MKEF 2026-2030
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CAREER TIMELINE & EDUCATION SECTION */}
        {/* ========================================================================= */}
        <div className="space-y-8 pt-4">
          <div className="flex justify-center">
            <div className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex p-1.5 rounded-2xl sm:rounded-full bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl gap-1">
              <button
                onClick={() => setActiveTab('journey')}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'journey'
                    ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Pengalaman Profesional</span>
              </button>

              <button
                onClick={() => setActiveTab('education')}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'education'
                    ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Jejak Pendidikan &amp; Gelar</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'journey' && (
              <motion.div
                key="journey"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 max-w-4xl mx-auto"
              >
                {sortedExperiences.map((exp, idx) => {
                  const isCurrent = !exp.end_date;
                  return (
                    <div key={exp.id || idx} className="p-4 sm:p-6 md:p-7 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-purple-400/50 transition-all space-y-3.5 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{exp.role_title}</h3>
                            {isCurrent && (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                                Current Role
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400 pt-0.5">{exp.organization} • {exp.location}</p>
                        </div>

                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                          <span>{formatDate(exp.start_date)} — {formatDate(exp.end_date)}</span>
                        </div>
                      </div>

                      <ul className="space-y-2 pt-1">
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
              >
                {educationList.map((edu, idx) => (
                  <div key={edu.id || idx} className="p-4 sm:p-6 md:p-7 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400/50 transition-all space-y-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                        {formatDateRange(edu.start_date, edu.end_date)}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.program}</h3>
                      <p className="text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400">{edu.institution}</p>
                      {edu.major_or_focus && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">Specialization: {edu.major_or_focus}</p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                      {edu.score_label && (
                        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                          {edu.score_label}
                        </span>
                      )}
                      {edu.honor_note && (
                        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-600 dark:text-amber-400">
                          {edu.honor_note}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
