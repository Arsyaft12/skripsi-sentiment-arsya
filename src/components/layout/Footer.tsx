import React from 'react';
import Link from 'next/link';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { portfolioConfig } from '@/config/portfolio.config';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200/60 dark:border-white/10 py-14 transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Info */}
        <div className="space-y-1.5 text-center md:text-left">
          <p className="text-sm font-bold text-neutral-950 dark:text-white flex items-center justify-center md:justify-start gap-2">
            <span>{portfolioConfig.personal.name}</span>
            <span className="text-cyan-500">•</span>
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{portfolioConfig.personal.title}</span>
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {portfolioConfig.personal.bioShort}
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex items-center gap-6 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
          <Link href="/#home" className="hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors">
            Beranda
          </Link>
          <Link href="/#services" className="hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors">
            Layanan
          </Link>
          <Link href="/#cases" className="hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors">
            Studi Kasus
          </Link>
          <Link href="/#portfolio" className="hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors">
            Kredensial &amp; STR
          </Link>
        </div>

        {/* Social Icons Dock */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-neutral-100/80 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/10">
          {portfolioConfig.socialLinks.github && (
            <a
              href={portfolioConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-white hover:bg-neutral-900 dark:hover:bg-cyan-500/20 dark:hover:text-cyan-300 hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}
          {portfolioConfig.socialLinks.instagram && (
            <a
              href={portfolioConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @zam_fisio"
              className="p-2.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          )}
          {portfolioConfig.socialLinks.linkedin && (
            <a
              href={portfolioConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-white hover:bg-[#0A66C2] dark:hover:bg-[#0A66C2]/30 dark:hover:text-[#70B5F9] hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
          {portfolioConfig.socialLinks.orcid && (
            <a
              href={portfolioConfig.socialLinks.orcid}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ORCID Scientific Record"
              className="px-2 py-1 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-white hover:bg-emerald-600 dark:hover:bg-emerald-500/20 hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              title="ORCID Profile"
            >
              iD
            </a>
          )}
          {portfolioConfig.contact.whatsappLink && (
            <a
              href={portfolioConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Appointment"
              className="p-2.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-white hover:bg-emerald-600 dark:hover:bg-emerald-500/20 dark:hover:text-emerald-300 hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.961.949 3.226.949 3.181 0 5.768-2.586 5.769-5.766.001-3.18-2.585-5.766-5.766-5.766zm9.969 5.766c0 5.503-4.477 9.98-9.98 9.98-1.748 0-3.385-.45-4.819-1.241l-5.201 1.363 1.388-5.074c-.879-1.488-1.368-3.218-1.368-5.028 0-5.503 4.477-9.98 9.98-9.98 5.503 0 9.98 4.477 9.98 9.98z"/>
              </svg>
            </a>
          )}
          {portfolioConfig.contact.email && (
            <a
              href={`mailto:${portfolioConfig.contact.email}`}
              aria-label="Send Email"
              className="p-2.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-white hover:bg-purple-600 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

    </footer>
  );
}
