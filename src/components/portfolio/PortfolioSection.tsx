'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, 
  Award, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Cpu, 
  Trophy, 
  GraduationCap,
  ShieldCheck,
  Calendar,
  ExternalLink,
  CheckCircle2,
  FileText,
  Eye,
  Presentation,
  TrendingUp,
  FileSpreadsheet,
  Handshake,
  Users,
  CheckSquare,
  MessageSquareText,
  Video,
  Palette,
  Megaphone,
  Layers
} from 'lucide-react';
import { ProjectCardData, Certificate, SocialContent } from '@/types/portfolio';
import { ALL_SKILLS_DATA, SKILL_CATEGORIES, SkillCategoryType, SkillItem } from '@/lib/techStackData';
import { ProjectCard } from '@/components/work/ProjectCard';
import { CertificateCard } from '@/components/achievements/CertificateCard';
import { CertificateModal } from '@/components/achievements/CertificateModal';
import { CoverflowCarousel } from './CoverflowCarousel';

interface PortfolioSectionProps {
  projects: ProjectCardData[];
  certificates: Certificate[];
  socialContent: SocialContent[];
}

// Skill Icon with auto-fallback on load error
function SkillIconImage({ src, alt, fallback }: { src: string; alt: string; fallback: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  if (hasError) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-10 h-10 object-contain drop-shadow"
      onError={() => setHasError(true)}
    />
  );
}

// Canva Custom Vector Icon
function CanvaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className || "w-10 h-10"} fill="none">
      <circle cx="12" cy="12" r="11" fill="url(#canva-grad-pf)" />
      <path
        d="M15.8 8.2c-.8-.5-1.9-.7-3.1-.7-2.9 0-5.1 1.9-5.1 4.7 0 2.6 1.9 4.3 4.6 4.3 1.4 0 2.6-.4 3.4-1.1.3-.3.4-.6.2-.9-.2-.3-.5-.3-.9-.1-.7.5-1.6.8-2.7.8-2 0-3.3-1.2-3.4-3.1h7.1c.4 0 .7-.3.7-.7 0-1.4-.3-2.6-.8-3.2zm-5.7 3.3c.2-1.3 1.2-2.2 2.6-2.2 1.2 0 2.1.8 2.3 2.2h-4.9z"
        fill="white"
      />
      <defs>
        <linearGradient id="canva-grad-pf" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C4CC" />
          <stop offset="1" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// CapCut Custom Vector Icon
function CapCutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className || "w-10 h-10"} fill="none">
      <rect width="24" height="24" rx="6" fill="#0A0A0A" />
      <path d="M18.84 4.75a3.6 3.6 0 0 0-2.88 1.44L10.32 13.4a1.5 1.5 0 0 1-1.2.6H4.72A1.47 1.47 0 0 0 3.25 15.5v3.44c0 .8.67 1.47 1.47 1.47h3.4a3.6 3.6 0 0 0 2.88-1.44l5.64-7.21a1.5 1.5 0 0 1 1.2-.6h3.4a1.47 1.47 0 0 0 1.48-1.48V6.22a1.47 1.47 0 0 0-1.48-1.47h-3.4z" fill="#00F0FF" />
      <path d="M12.24 6.19a3.6 3.6 0 0 0-2.88-1.44H4.82A1.47 1.47 0 0 0 3.35 6.22v3.44c0 .8.67 1.48 1.47 1.48h3.4a1.5 1.5 0 0 1 1.2.6l5.64 7.21a3.6 3.6 0 0 0 2.88 1.44h3.4a1.47 1.47 0 0 0 1.48-1.5h-3.4a1.5 1.5 0 0 1-1.2-.6L12.24 6.19z" fill="#FFFFFF" />
    </svg>
  );
}

export function PortfolioSection({ projects, certificates, socialContent }: PortfolioSectionProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'credentials' | 'tech' | 'creative'>('projects');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [techCategoryFilter, setTechCategoryFilter] = useState<SkillCategoryType>('all');
  const [credentialFilter, setCredentialFilter] = useState<'all' | 'certs' | 'awards'>('all');

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 4);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, 6);

  const filteredSkills = techCategoryFilter === 'all' 
    ? ALL_SKILLS_DATA 
    : ALL_SKILLS_DATA.filter((s) => s.category === techCategoryFilter);

  // Awards list in professional English
  const awardsList = [
    {
      id: 'award-1',
      title: 'SeNTIK 10 National Scientific Conference Author',
      issuer: 'STMIK Jakarta STI&K & Univ. Cendekia Abditama',
      date: 'Aug 2026',
      badge: 'Academic Research',
      description: 'Lead author of published peer-reviewed research analyzing e-commerce review sentiments using Support Vector Machine & Naïve Bayes algorithms with 85% accuracy.',
    },
    {
      id: 'award-2',
      title: "Consistent Dean's List Academic Honours (8 Consecutive Semesters)",
      issuer: 'Universitas Cendekia Abditama',
      date: '2022 – 2026',
      badge: 'GPA 3.90 / 4.00',
      description: 'Awarded highest academic honours throughout the entire 8-semester Bachelor of Informatics Engineering program.',
    },
    {
      id: 'award-3',
      title: 'BNSP National Professional Certification — Office English & Administration',
      issuer: 'National Professional Certification Board (BNSP Indonesia)',
      date: 'Jun 2025',
      badge: 'National Credential',
      description: 'Standardized competency certification for corporate business communication, administrative precision, and professional documentation.',
    },
    {
      id: 'award-4',
      title: 'Techling 2 Advanced Software & AI Engineering Award',
      issuer: 'Techling Indonesia',
      date: 'Mar 2024',
      badge: 'Engineering Excellence',
      description: 'Recognized for top performance in modern application architecture, reactive design patterns, and AI data integrations.',
    },
  ];

  // Helper to render lucide icon for skills
  const renderSkillIcon = (skill: SkillItem) => {
    if (skill.id === 'canva') {
      return <CanvaIcon className="w-10 h-10 drop-shadow" />;
    }
    if (skill.id === 'capcut') {
      return <CapCutIcon className="w-10 h-10 drop-shadow" />;
    }

    const iconClass = "w-8 h-8";
    const getFallbackLucide = () => {
      switch (skill.lucideIconName) {
        case 'Presentation':
          return <Presentation className={iconClass} style={{ color: skill.color }} />;
        case 'TrendingUp':
          return <TrendingUp className={iconClass} style={{ color: skill.color }} />;
        case 'FileSpreadsheet':
          return <FileSpreadsheet className={iconClass} style={{ color: skill.color }} />;
        case 'Handshake':
          return <Handshake className={iconClass} style={{ color: skill.color }} />;
        case 'Users':
          return <Users className={iconClass} style={{ color: skill.color }} />;
        case 'CheckSquare':
          return <CheckSquare className={iconClass} style={{ color: skill.color }} />;
        case 'Sparkles':
          return <Sparkles className={iconClass} style={{ color: skill.color }} />;
        case 'MessageSquareText':
          return <MessageSquareText className={iconClass} style={{ color: skill.color }} />;
        case 'Video':
          return <Video className={iconClass} style={{ color: skill.color }} />;
        case 'Palette':
          return <Palette className={iconClass} style={{ color: skill.color }} />;
        case 'Megaphone':
          return <Megaphone className={iconClass} style={{ color: skill.color }} />;
        default:
          return <Layers className={iconClass} style={{ color: skill.color }} />;
      }
    };

    if (skill.icon) {
      return (
        <SkillIconImage
          src={skill.icon}
          alt={skill.name}
          fallback={getFallbackLucide()}
        />
      );
    }

    return getFallbackLucide();
  };

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Showcase & Verified Track Record</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
            Featured <span className="grad-vi">Works & Credentials</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Engineered platforms, verified national credentials & awards, commercial skill competencies, and viral creative media campaigns.
          </p>
        </div>

        {/* Unified 4 Sub-Tabs Navigation - Grand & Interactive */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center p-2 gap-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl">
            
            {/* 1. Projects */}
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects ({projects.length})</span>
            </button>

            {/* 2. Unified Certificates & Awards */}
            <button
              onClick={() => setActiveTab('credentials')}
              className={`flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all cursor-pointer ${
                activeTab === 'credentials'
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certificates & Awards</span>
            </button>

            {/* 3. Tech Stack */}
            <button
              onClick={() => setActiveTab('tech')}
              className={`flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all cursor-pointer ${
                activeTab === 'tech'
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Tech Stack & Skills</span>
            </button>

            {/* 4. Creative Campaigns */}
            <button
              onClick={() => setActiveTab('creative')}
              className={`flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all cursor-pointer ${
                activeTab === 'creative'
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Share2 className="w-4 h-4 text-purple-400" />
              <span>Creative Campaigns ({socialContent.length})</span>
            </button>

          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: FEATURED PROJECTS */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {displayedProjects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
              </div>

              {projects.length > 4 && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    className="btn-secondary px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 transition-transform"
                  >
                    <span>{showAllProjects ? 'Show Less' : `View All Projects (${projects.length})`}</span>
                    {showAllProjects ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: VERIFIED DOCUMENT CERTIFICATES */}
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
                      Verified Document Certificates ({certificates.length})
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Klik kartu sertifikat mana pun untuk langsung preview dokumen & bukti kompetensi
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 text-xs font-bold border border-cyan-500/20">
                    {certificates.length} Dokumen Tersedia
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

          {/* TAB 3: TECH STACK & BUSINESS COMPETENCIES (Dynamic Bento Tiles) */}
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

          {/* TAB 4: CREATIVE CAMPAIGNS (3D Coverflow) */}
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
                  3D Creative Campaigns & Visual Production Showcase
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Slide or use keyboard navigation to explore high-impact social campaigns and reels
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
