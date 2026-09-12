'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from '@/types/portfolio';
import { X, ExternalLink, Calendar, Award, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  // Listen for Escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certificate) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
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
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-[2rem] bg-neutral-900/90 border border-white/15 shadow-2xl overflow-hidden backdrop-blur-2xl"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/60">
            <div className="flex items-center gap-3 pr-4">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white line-clamp-1">
                  {certificate.title}
                </h3>
                <p className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{certificate.issuer}</span>
                  <span>•</span>
                  <span className="text-purple-300">{certificate.category}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={certificate.document_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <span>Full View</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>

              <button
                onClick={onClose}
                aria-label="Close Lightbox Modal"
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Document Viewer Body */}
          <div className="flex-1 min-h-[420px] sm:min-h-[520px] bg-black/40 relative flex items-center justify-center overflow-auto p-3">
            {isPdf ? (
              <iframe
                src={`${certificate.document_url}#toolbar=0`}
                title={certificate.title}
                className="w-full h-full min-h-[520px] rounded-xl border-none shadow-inner"
              />
            ) : (
              /* Image Certificate Viewer */
              <div className="relative w-full h-full flex items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={certificate.document_url}
                  alt={certificate.title}
                  className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
                />
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3.5 border-t border-white/10 bg-neutral-900/60 flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Issue Date: <strong className="text-neutral-200">{certificate.issue_date}</strong></span>
            </div>
            <div className="hidden sm:block text-[11px] text-neutral-500">
              Press <kbd className="px-2 py-0.5 rounded-md bg-white/[0.08] border border-white/10 font-mono text-neutral-300">ESC</kbd> or click outside to close
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
