'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Certificate } from '@/types/portfolio';
import { FileText, Calendar, Eye, ShieldCheck, Download, Award } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
  onSelect: (cert: Certificate) => void;
}

export function CertificateCard({ certificate, index, onSelect }: CertificateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onClick={() => onSelect(certificate)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(certificate);
        }
      }}
      className="glass-panel group relative flex flex-col justify-between rounded-3xl overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 transition-all duration-300 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
    >
      {/* Top Document Preview Banner / Thumbnail Representation */}
      <div className="relative h-36 w-full bg-gradient-to-br from-slate-100 via-slate-200 to-cyan-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-cyan-950/40 p-4 flex flex-col justify-between border-b border-slate-200/80 dark:border-slate-800 overflow-hidden">
        
        {/* Subtle Decorative Guilloche / Certificate Border Effect */}
        <div className="absolute inset-2 border border-dashed border-cyan-500/20 dark:border-cyan-400/20 rounded-xl pointer-events-none" />
        
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 text-[10px] sm:text-xs font-bold text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
            {certificate.category}
          </span>
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-sm">
            <FileText className="w-4 h-4" />
          </div>
        </div>

        {/* Center Document Emblem Preview */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-300 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Verified Document
            </p>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
              {certificate.issuer}
            </p>
          </div>
        </div>

        {/* Floating Quick Action Overlay on Hover */}
        <div className="absolute inset-0 bg-cyan-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 z-20">
          <span className="px-4 py-2 rounded-full bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transform group-hover:scale-105 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Document</span>
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
            {certificate.title}
          </h3>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="line-clamp-1">{certificate.issuer}</span>
          </p>
        </div>

        {/* Footer Info */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
            <span className="font-mono text-[11px]">{certificate.issue_date}</span>
          </div>

          <span className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-xs">
            <span>Buka PDF</span>
            <Eye className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
