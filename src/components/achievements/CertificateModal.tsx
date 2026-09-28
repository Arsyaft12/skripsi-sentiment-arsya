'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from '@/types/portfolio';
import { X, ExternalLink, Calendar, Award, ShieldCheck, Download, FileText } from 'lucide-react';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const [iframeError, setIframeError] = useState(false);

  // Listen for Escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certificate) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setIframeError(false);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const isPdf = certificate.document_url.toLowerCase().endsWith('.pdf');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-[2rem] bg-slate-900/95 border border-slate-700/80 shadow-2xl overflow-hidden backdrop-blur-2xl"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-3 pr-4">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white line-clamp-1">
                  {certificate.title}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="line-clamp-1">{certificate.issuer}</span>
                  <span>•</span>
                  <span className="text-cyan-300 shrink-0">{certificate.category}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={certificate.document_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-full transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
              >
                <span>Buka di Tab Baru</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                aria-label="Tutup Pratinjau Dokumen"
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Document Viewer Body */}
          <div className="flex-1 min-h-[420px] sm:min-h-[520px] bg-slate-950 relative flex items-center justify-center overflow-auto p-3">
            {isPdf && !iframeError ? (
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                <iframe
                  src={`${certificate.document_url}#toolbar=0`}
                  title={certificate.title}
                  onError={() => setIframeError(true)}
                  className="w-full h-full min-h-[500px] rounded-xl border-none shadow-inner"
                />
              </div>
            ) : (
              /* Image / SVG / Fallback Viewer */
              <div className="relative w-full h-full flex flex-col items-center justify-center p-4 space-y-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={certificate.thumbnail_url || certificate.document_url}
                  alt={certificate.title}
                  className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl border border-slate-800"
                />
                {isPdf && (
                  <a
                    href={certificate.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 text-white text-xs font-bold shadow-lg hover:bg-cyan-400 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh &amp; Lihat Dokumen PDF Lengkap</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Tanggal Penerbitan: <strong className="text-slate-200">{certificate.issue_date}</strong></span>
            </div>
            <div className="hidden sm:block text-[11px] text-slate-400">
              Tekan <kbd className="px-2 py-0.5 rounded-md bg-white/[0.08] border border-white/10 font-mono text-slate-300">ESC</kbd> atau klik di luar untuk menutup
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
