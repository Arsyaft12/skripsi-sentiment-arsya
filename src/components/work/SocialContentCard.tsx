'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SocialContent } from '@/types/portfolio';
import { ExternalLink, Eye, TrendingUp } from 'lucide-react';

interface SocialContentCardProps {
  content: SocialContent;
  index: number;
}

// Platform-specific config
function getPlatformConfig(platform: string) {
  switch (platform.toLowerCase()) {
    case 'tiktok':
      return {
        label: 'TikTok',
        gradient: 'from-slate-900 via-[#010101] to-[#69C9D0]',
        iconBg: 'bg-black',
        metricColor: 'text-[#69C9D0]',
        badgeBg: 'bg-black/80 border-white/10 text-white',
        icon: (
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.14v-3.5a6.37 6.37 0 1 0 6.34 6.37V8.7a8.3 8.3 0 0 0 4.77 1.49V6.69z"/>
          </svg>
        ),
      };
    case 'instagram':
      return {
        label: 'Instagram',
        gradient: 'from-purple-700 via-pink-600 to-orange-400',
        iconBg: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
        metricColor: 'text-pink-500',
        badgeBg: 'bg-white/90 border-pink-200/60 text-neutral-900',
        icon: (
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        ),
      };
    default:
      return {
        label: platform,
        gradient: 'from-blue-700 to-indigo-600',
        iconBg: 'bg-blue-600',
        metricColor: 'text-blue-500',
        badgeBg: 'bg-white/90 border-blue-200/60 text-neutral-900',
        icon: <ExternalLink className="w-5 h-5 text-white" />,
      };
  }
}

export function SocialContentCard({ content, index }: SocialContentCardProps) {
  const config = getPlatformConfig(content.platform);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Cover / Thumbnail Area */}
      <div className={`relative w-full h-48 bg-gradient-to-br ${config.gradient} overflow-hidden`}>
        {content.thumbnail_url ? (
          <Image
            src={content.thumbnail_url}
            alt={content.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          // Rich gradient cover with decorative elements
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className={`w-14 h-14 rounded-2xl ${config.iconBg} flex items-center justify-center shadow-lg`}>
              {config.icon}
            </div>
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full border-2 border-white/10 animate-ping [animation-duration:3s]" />
              <div className="absolute w-48 h-48 rounded-full border border-white/5" />
            </div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Platform badge top-left */}
        <div className={`absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border text-xs font-bold ${config.badgeBg}`}>
          <span className="scale-75">{config.icon}</span>
          <span>{config.label}</span>
        </div>

        {/* LARGE METRIC — bottom of cover */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
          <div className="flex items-end gap-2">
            <div className="flex items-center gap-1.5">
              {content.metric_label.toLowerCase().includes('view') ? (
                <Eye className="w-5 h-5 text-white/80" />
              ) : (
                <TrendingUp className="w-5 h-5 text-white/80" />
              )}
              <span className="text-3xl font-black text-white tracking-tight drop-shadow-lg">
                {content.metric_label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4">
        <div className="space-y-1.5">
          <h4 className="text-base font-bold text-neutral-950 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {content.title}
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            Personal Branding & Technical Storytelling
          </p>
        </div>

        {/* Action CTA */}
        <a
          href={content.embed_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <span>View Original Post</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
