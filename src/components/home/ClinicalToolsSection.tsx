'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Eye, 
  ClipboardCheck, 
  Scan, 
  Ruler, 
  FileSpreadsheet, 
  Zap, 
  Activity, 
  Waves, 
  Flame, 
  Crosshair, 
  Layers, 
  Hand, 
  Dumbbell, 
  Sparkles, 
  Grid,
  ShieldCheck,
  Wrench
} from 'lucide-react';
import { ASSESSMENT_TOOLS, THERAPY_TOOLS, ClinicalToolItem } from '@/lib/clinicalData';

export function ClinicalToolsSection() {
  const [activeTab, setActiveTab] = useState<'assessment' | 'therapy'>('assessment');

  const toolsToDisplay = activeTab === 'assessment' ? ASSESSMENT_TOOLS : THERAPY_TOOLS;

  const renderToolIcon = (iconName: string) => {
    const iconClass = "w-6 h-6";
    switch (iconName) {
      case 'Compass': return <Compass className={iconClass} />;
      case 'Eye': return <Eye className={iconClass} />;
      case 'ClipboardCheck': return <ClipboardCheck className={iconClass} />;
      case 'Scan': return <Scan className={iconClass} />;
      case 'Ruler': return <Ruler className={iconClass} />;
      case 'FileSpreadsheet': return <FileSpreadsheet className={iconClass} />;
      case 'Zap': return <Zap className={iconClass} />;
      case 'Activity': return <Activity className={iconClass} />;
      case 'Waves': return <Waves className={iconClass} />;
      case 'Flame': return <Flame className={iconClass} />;
      case 'Crosshair': return <Crosshair className={iconClass} />;
      case 'Layers': return <Layers className={iconClass} />;
      case 'Hand': return <Hand className={iconClass} />;
      case 'Dumbbell': return <Dumbbell className={iconClass} />;
      case 'Grid': return <Grid className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section id="tools" className="py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Wrench className="w-4 h-4" />
            <span>Infrastruktur Diagnostik &amp; Intervensi Klinis</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
            Instrumen <span className="grad-vi">Asesmen &amp; Terapi</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Infrastruktur alat asesmen objektif dan modalitas intervensi fisioterapi berbasis bukti ilmiah.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl gap-1">
            <button
              onClick={() => setActiveTab('assessment')}
              className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'assessment'
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>A. Alat Asesmen Klinis ({ASSESSMENT_TOOLS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('therapy')}
              className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'therapy'
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>B. Modalitas &amp; Alat Terapi ({THERAPY_TOOLS.length})</span>
            </button>
          </div>
        </div>

        {/* Tools Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {toolsToDisplay.map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="p-6 sm:p-7 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/50 transition-all duration-300 space-y-3.5 shadow-sm hover:shadow-xl group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                      {renderToolIcon(tool.iconName)}
                    </div>

                    {tool.badge && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      {tool.categoryLabel}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {tool.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Clinical Grade</span>
                  </span>
                  <span className="font-mono text-[11px]">
                    {activeTab === 'assessment' ? 'Diagnostic Tool' : 'Intervention Tool'}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
