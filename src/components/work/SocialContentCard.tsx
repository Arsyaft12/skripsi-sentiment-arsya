'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SocialContent } from '@/types/portfolio';
import { ExternalLink } from 'lucide-react';

interface SocialContentCardProps {
  content: SocialContent;
  index: number;
}

function getPlatformConfig(platform: string) {
  switch (platform.toLowerCase()) {
    case 'tiktok':
      return {
        label: 'TikTok',
        accent: 'from-[#ff3b6f] via-[#ff8a00] to-[#ffd93d]',
        dot: 'bg-[#ff2d55]',
        icon: (
          <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.14v-3.5a6.37 6.37 0 1 0 6.34 6.37V8.7a8.3 8.3 0 0 0 4.77 1.49V6.69z"/>
          </svg>
        ),
      };
    case 'instagram':
      return {
        label: 'Instagram',
        accent: 'from-[#ff7a18] via-[#ff4d9d] to-[#734dff]',
        dot: 'bg-[#ff4d9d]',
        icon: (
          <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        ),
      };
    default:
      return {
        label: platform,
        accent: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
        dot: 'bg-[#2563eb]',
        icon: <ExternalLink className="h-4 w-4 text-white" />,
      };
  }
}

function getAuthorHandle(content: SocialContent) {
  const url = content.embed_url || '';

  if (content.id === '1' || content.id === '2' || content.id === '5') {
    return '@arsyaft';
  }

  if (content.id === '3' || content.id === '4') {
    return '@foresthreecoffeeofficial';
  }

  if (content.id === '6' || content.id === '7' || content.id === '8') {
    return '@media_entertaiment_gen_z';
  }

  if (content.platform.toLowerCase() === 'tiktok') {
    const match = url.match(/tiktok\.com\/@([^/?]+)/i);
    return match ? `@${match[1]}` : '@media_entertaiment_gen_z';
  }

  if (content.platform.toLowerCase() === 'instagram') {
    const match = url.match(/instagram\.com\/(?:reel\/)?@?([^/?]+)/i);
    if (match) return `@${match[1]}`;
    return '@arsyaft';
  }

  return '@arsyaft';
}

export function SocialContentCard({ content, index }: SocialContentCardProps) {
  const config = getPlatformConfig(content.platform);
  const caption = content.summary || content.title;
  const authorHandle = getAuthorHandle(content);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="relative mx-auto w-full max-w-[430px]"
    >
      <div className="relative overflow-hidden rounded-[24px] bg-slate-950 border border-slate-700/80 shadow-2xl">
        <div className={`relative aspect-[9/16] overflow-hidden bg-gradient-to-br ${config.accent}`}>
          {content.thumbnail_url ? (
            <Image
              src={content.thumbnail_url}
              alt={content.title}
              fill
              sizes="(max-width: 768px) 100vw, 430px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.18),_rgba(0,0,0,0.4)_70%)]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Top Platform & Category Header */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-4 z-10">
            <div className="flex items-center gap-2 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-md border border-white/10">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full ${config.dot}`}>
                {config.icon}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">{config.label}</span>
            </div>
            <div className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-200 backdrop-blur-md">
              {content.category}
            </div>
          </div>

          {/* Play Button Overlay */}
          <a
            href={content.embed_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Play ${content.title}`}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 shadow-2xl backdrop-blur-md transition hover:scale-110 hover:bg-white/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-white" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </a>

          {/* Bottom Card Narrative & Details */}
          <div className="absolute inset-x-0 bottom-0 p-4 space-y-2 z-10">
            <div className="flex items-center gap-2 text-slate-300 text-[11px] font-semibold">
              <span className="text-cyan-300 font-bold">{authorHandle}</span>
              <span>•</span>
              <span>{content.platform}</span>
            </div>
            <div className="text-base sm:text-lg font-bold leading-tight text-white drop-shadow">
              {content.title}
            </div>
            <div className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{caption}</div>

            {content.stats && (
              <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-cyan-300">
                {content.stats.map((s, sIdx) => (
                  <span key={sIdx}><strong>{s.value}</strong> {s.label}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-2 flex justify-end px-1 text-xs font-semibold text-slate-400">
        <a
          href={content.embed_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
        >
          <span>Open in {config.label}</span>
          <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
        </a>
      </div>
    </motion.article>
  );
}
