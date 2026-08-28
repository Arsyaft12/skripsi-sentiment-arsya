'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Certificate } from '@/types/portfolio';
import { FileText, Calendar, Eye, ShieldCheck } from 'lucide-react';

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
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={() => onSelect(certificate)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(certificate);
        }
      }}
      className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:shadow-lg hover:border-blue-500/60 dark:hover:border-blue-400/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="space-y-4">
        {/* Top Tag & Document Icon */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[11px] font-bold text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
            {certificate.category}
          </span>
          
          <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <FileText className="w-4 h-4" />
          </div>
        </div>

        {/* Certificate Metadata */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {certificate.title}
          </h3>
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>{certificate.issuer}</span>
          </p>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="pt-4 mt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{certificate.issue_date}</span>
        </div>

        <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 opacity-90 group-hover:opacity-100">
          <span>Preview Document</span>
          <Eye className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
}
