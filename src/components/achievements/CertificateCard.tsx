'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Certificate } from '@/types/portfolio';
import { FileText, Calendar, Eye, ShieldCheck, ExternalLink } from 'lucide-react';

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
      className="glass-panel group relative flex flex-col justify-between rounded-3xl overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 transition-all duration-300 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/15 hover:-translate-y-1.5 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800"
    >
      {/* Real Document Preview Banner */}
      <div className="relative h-48 sm:h-52 w-full bg-slate-950 overflow-hidden border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-center">
        {certificate.thumbnail_url ? (
          <Image
            src={certificate.thumbnail_url}
            alt={certificate.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
            <FileText className="w-12 h-12" />
          </div>
        )}

        {/* Subtle Top & Bottom Gradient Shadows for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/60 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] sm:text-xs font-bold text-cyan-300 border border-cyan-500/40 shadow-sm">
            {certificate.category}
          </span>
          
          <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/20 flex items-center gap-1">
            <FileText className="w-3 h-3 text-cyan-400" />
            PDF
          </span>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-cyan-950/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-20">
          <span className="px-4 py-2 rounded-full bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-xl transform group-hover:scale-105 transition-transform">
            <Eye className="w-4 h-4" />
            <span>Lihat Dokumen Lengkap</span>
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
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
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
