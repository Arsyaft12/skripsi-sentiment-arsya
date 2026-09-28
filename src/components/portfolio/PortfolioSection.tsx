'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Sparkles, 
  Share2, 
  Stethoscope, 
  Trophy, 
  GraduationCap,
  ShieldCheck,
  Activity,
  Zap,
  TrendingUp,
  Flame,
  Crosshair,
  Hand,
  Waves,
  Dumbbell,
  Layers,
  FileCheck2,
  Eye,
  BarChart2,
  MessageSquareText,
  HeartPulse
} from 'lucide-react';
import { ProjectCardData, Certificate, SocialContent } from '@/types/portfolio';
import { ALL_SKILLS_DATA, SKILL_CATEGORIES, SkillCategoryType, SkillItem } from '@/lib/techStackData';
import { CertificateCard } from '@/components/achievements/CertificateCard';
import { CertificateModal } from '@/components/achievements/CertificateModal';
import { CoverflowCarousel } from './CoverflowCarousel';

interface PortfolioSectionProps {
  projects?: ProjectCardData[];
  certificates: Certificate[];
  socialContent: SocialContent[];
}

export function PortfolioSection({ projects, certificates, socialContent }: PortfolioSectionProps) {
  const [activeTab, setActiveTab] = useState<'credentials' | 'tech' | 'creative'>('credentials');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [techCategoryFilter, setTechCategoryFilter] = useState<SkillCategoryType>('all');

  const filteredSkills = techCategoryFilter === 'all' 
    ? ALL_SKILLS_DATA 
    : ALL_SKILLS_DATA.filter((s) => s.category === techCategoryFilter);

  // Helper to render lucide icon for skills
  const renderSkillIcon = (skill: SkillItem) => {
    const iconClass = "w-8 h-8";
    switch (skill.lucideIconName) {
      case 'Activity':
        return <Activity className={iconClass} style={{ color: skill.color }} />;
      case 'Zap':
        return <Zap className={iconClass} style={{ color: skill.color }} />;
      case 'TrendingUp':
        return <TrendingUp className={iconClass} style={{ color: skill.color }} />;
      case 'Flame':
        return <Flame className={iconClass} style={{ color: skill.color }} />;
      case 'Trophy':
        return <Trophy className={iconClass} style={{ color: skill.color }} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} style={{ color: skill.color }} />;
      case 'Crosshair':
        return <Crosshair className={iconClass} style={{ color: skill.color }} />;
      case 'Hand':
        return <Hand className={iconClass} style={{ color: skill.color }} />;
      case 'Waves':
        return <Waves className={iconClass} style={{ color: skill.color }} />;
      case 'Dumbbell':
        return <Dumbbell className={iconClass} style={{ color: skill.color }} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} style={{ color: skill.color }} />;
      case 'Layers':
        return <Layers className={iconClass} style={{ color: skill.color }} />;
      case 'FileCheck2':
        return <FileCheck2 className={iconClass} style={{ color: skill.color }} />;
      case 'Stethoscope':
        return <Stethoscope className={iconClass} style={{ color: skill.color }} />;
      case 'Eye':
        return <Eye className={iconClass} style={{ color: skill.color }} />;
      case 'GraduationCap':
        return <GraduationCap className={iconClass} style={{ color: skill.color }} />;
      case 'BarChart2':
        return <BarChart2 className={iconClass} style={{ color: skill.color }} />;
      case 'MessageSquareText':
        return <MessageSquareText className={iconClass} style={{ color: skill.color }} />;
      default:
        return <HeartPulse className={iconClass} style={{ color: skill.color }} />;
    }
  };

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Praktik Klinis &amp; Rekam Jejak Terverifikasi</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
            Spesialisasi &amp; <span className="grad-vi">Praktik Klinis</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Protokol rehabilitasi berbasis bukti, ijazah profesi dan magister terakreditasi (M.Ft., Ftr., S.Ftr.), modalitas bersertifikasi (Cert.DN., SPRC.), serta riset ilmiah.
          </p>
        </div>

        {/* Unified Sub-Tabs Navigation - Grand & Interactive */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center p-2 gap-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl">

            {/* 1. Unified Certificates & Degrees */}
            <button
              onClick={() => setActiveTab('credentials')}
              className={`flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all cursor-pointer ${
                activeTab === 'credentials'
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Kredensial &amp; Ijazah ({certificates.length})</span>
            </button>

            {/* 2. Clinical Focus & Modalities */}
            <button
              onClick={() => setActiveTab('tech')}
              className={`flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all cursor-pointer ${
                activeTab === 'tech'
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-cyan-400" />
              <span>Kompetensi Klinis</span>
            </button>

            {/* 3. Clinical Media & Cases */}
            <button
              onClick={() => setActiveTab('creative')}
              className={`flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all cursor-pointer ${
                activeTab === 'creative'
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Share2 className="w-4 h-4 text-purple-400" />
              <span>Media Edukasi &amp; Kasus ({socialContent.length})</span>
            </button>

          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">

          {/* TAB 2: VERIFIED CREDENTIALS & DEGREES */}
          {activeTab === 'credentials' && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Header Info Banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      Kredensial Terverifikasi &amp; Ijazah Akademik ({certificates.length})
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Klik salah satu kartu dokumen untuk membuka pratinjau verifikasi resmi, rincian institusi, dan surat tanda registrasi
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 text-xs font-bold border border-cyan-500/20">
                    {certificates.length} Dokumen Resmi
                  </span>
                </div>
              </div>

              {/* Grid of Verified Document Certificate Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {certificates.map((cert, idx) => (
                  <CertificateCard
                    key={cert.id}
                    certificate={cert}
                    index={idx}
                    onSelect={(c) => setSelectedCertificate(c)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: CLINICAL FOCUS & MODALITIES */}
          {activeTab === 'tech' && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Category Filter */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {SKILL_CATEGORIES.map((cat) => {
                  const isSelected = techCategoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setTechCategoryFilter(cat.id)}
                      className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500 text-white shadow-md scale-105'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Bento Grid with Badges & Dynamic Visual Depth */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 max-w-7xl mx-auto">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400/80 flex flex-col items-center justify-between gap-3.5 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/15 cursor-pointer text-center group relative overflow-hidden"
                  >
                    {/* Badge Pill if Present */}
                    {skill.badge ? (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
                        {skill.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                        {skill.categoryLabel}
                      </span>
                    )}

                    <div className="w-14 h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-115">
                      {renderSkillIcon(skill)}
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 hidden sm:block font-normal">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: CLINICAL MEDIA & VISUAL PRODUCTION */}
          {activeTab === 'creative' && (
            <motion.div
              key="creative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Media Klinis, Studi Kasus &amp; Edukasi Pasien
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Presentasi kasus interaktif, video edukasi pemulihan gerak, dan wawasan klinis fisioterapi
                </p>
              </div>

              {/* 3D Coverflow Component */}
              <CoverflowCarousel items={socialContent} />
            </motion.div>
          )}

        </AnimatePresence>

        {/* Modal Viewer for Certificates */}
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />

      </div>
    </section>
  );
}
