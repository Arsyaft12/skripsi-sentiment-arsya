'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  HeartPulse, 
  Crosshair, 
  ShieldCheck, 
  Layers, 
  TrendingUp, 
  Dumbbell, 
  Zap, 
  Flame, 
  Building2, 
  Stethoscope, 
  Sparkles,
  MapPin,
  Phone,
  CalendarCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { PHYSIOTHERAPY_SERVICES, PhysiotherapyService, PRIVATE_PRACTICE_LOCATION } from '@/lib/clinicalData';

export function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { key: 'All', label: 'Semua Layanan' },
    { key: 'Sports & Performance', label: 'Cedera Olahraga & Performa' },
    { key: 'Pain & Spine', label: 'Nyeri & Tulang Belakang' },
    { key: 'Specialized & Rehab', label: 'Rehabilitasi Khusus' },
    { key: 'Wellness & Corporate', label: 'Wellness & Ergonomi' }
  ];

  const filteredServices = selectedCategory === 'All'
    ? PHYSIOTHERAPY_SERVICES
    : PHYSIOTHERAPY_SERVICES.filter((s) => s.category === selectedCategory);

  const getServiceIcon = (iconName: string) => {
    const iconClass = "w-6 h-6";
    switch (iconName) {
      case 'Activity': return <Activity className={iconClass} />;
      case 'HeartPulse': return <HeartPulse className={iconClass} />;
      case 'Crosshair': return <Crosshair className={iconClass} />;
      case 'ShieldCheck': return <ShieldCheck className={iconClass} />;
      case 'Layers': return <Layers className={iconClass} />;
      case 'TrendingUp': return <TrendingUp className={iconClass} />;
      case 'Dumbbell': return <Dumbbell className={iconClass} />;
      case 'Zap': return <Zap className={iconClass} />;
      case 'Flame': return <Flame className={iconClass} />;
      case 'Building2': return <Building2 className={iconClass} />;
      case 'Stethoscope': return <Stethoscope className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section id="services" className="py-24 px-6 md:px-12 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 via-blue-600/5 to-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Stethoscope className="w-4 h-4" />
            <span>Lingkup Praktik &amp; Penanganan Klinis</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
            12 Layanan <span className="grad-vi">Fisioterapi</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Program evaluasi komprehensif, intervensi terapeutik aktif, dan rehabilitasi terukur dari fase akut hingga performa optimal.
          </p>
        </div>

        {/* Private Practice Highlight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold font-mono">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>{PRIVATE_PRACTICE_LOCATION.appointmentNote}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {PRIVATE_PRACTICE_LOCATION.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center justify-center md:justify-start gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{PRIVATE_PRACTICE_LOCATION.address}</span>
              <span className="hidden sm:inline">•</span>
              <span className="font-mono text-cyan-300">{PRIVATE_PRACTICE_LOCATION.phone}</span>
            </p>
          </div>

          <a
            href={PRIVATE_PRACTICE_LOCATION.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-transform shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>Konsultasi WhatsApp</span>
          </a>
        </motion.div>

        {/* Category Pills Filter */}
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-md scale-105'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 12 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (idx % 6) * 0.05 }}
              className="p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/60 transition-all duration-300 space-y-4 shadow-sm hover:shadow-2xl hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header: Num, Icon & Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-slate-300 dark:text-slate-700">
                      {service.num}
                    </span>
                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>
                  </div>

                  {service.badge && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Key Points */}
              {service.keyPoints && service.keyPoints.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                  {service.keyPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
