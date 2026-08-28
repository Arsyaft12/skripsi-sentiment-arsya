'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Terminal, Layers, Globe } from 'lucide-react';

interface ProjectPreviewProps {
  title: string;
  liveUrl: string | null;
  cachedThumbnailUrl?: string | null;
  isLive?: boolean;
  language: string | null;
}

export function ProjectPreview({ title, liveUrl, cachedThumbnailUrl, isLive = false, language }: ProjectPreviewProps) {
  const [iframeFailed, setIframeFailed] = useState(false);
  const [microlinkFailed, setMicrolinkFailed] = useState(false);

  // If liveUrl exists AND isLive health check passed AND iframe hasn't failed, render Live Iframe Embed
  if (liveUrl && isLive && !iframeFailed) {
    return (
      <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 group-hover:border-blue-500/50 transition-colors">
        <div className="absolute inset-0 iframe-container">
          <iframe
            src={liveUrl}
            title={`${title} Live Preview`}
            loading="lazy"
            className="iframe-scaled"
            onError={() => setIframeFailed(true)}
          />
          {/* Transparent Overlay to capture clicks on card */}
          <div className="absolute inset-0 bg-transparent z-10" />
        </div>

        {/* Live Web Badge indicator */}
        <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-emerald-400 flex items-center gap-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Web</span>
        </div>
      </div>
    );
  }

  // Tier 2: Render cachedThumbnailUrl if available
  if (cachedThumbnailUrl && !microlinkFailed) {
    return (
      <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
        <Image
          src={cachedThumbnailUrl}
          alt={`${title} Preview Screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover object-top"
          onError={() => setMicrolinkFailed(true)}
        />
        <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-blue-400 flex items-center gap-1.5 shadow-md">
          <Globe className="w-3 h-3" />
          <span>Preview Screenshot</span>
        </div>
      </div>
    );
  }

  // Tier 3: Render Microlink API screenshot if liveUrl is present (even if not embeddable in iframe)
  if (liveUrl && !microlinkFailed) {
    const microlinkScreenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`;
    return (
      <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
        <Image
          src={microlinkScreenshotUrl}
          alt={`${title} Preview Screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover object-top"
          onError={() => setMicrolinkFailed(true)}
        />
      </div>
    );
  }

  // Tier 4: Redesigned Elegant Language Gradient Fallback Placeholder
  return <FallbackGraphic title={title} language={language} />;
}

function FallbackGraphic({ title, language }: { title: string; language: string | null }) {
  const getLanguageGradient = (lang: string | null) => {
    switch (lang?.toLowerCase()) {
      case 'typescript': return 'from-blue-600 via-indigo-600 to-cyan-500';
      case 'javascript': return 'from-amber-600 via-yellow-600 to-orange-500';
      case 'kotlin': return 'from-purple-600 via-indigo-600 to-violet-500';
      case 'dart': return 'from-sky-600 via-blue-600 to-cyan-500';
      case 'python': return 'from-emerald-600 via-teal-600 to-cyan-600';
      case 'c++':
      case 'c#': return 'from-slate-700 via-zinc-800 to-neutral-900';
      default: return 'from-blue-600 via-indigo-600 to-purple-600';
    }
  };

  return (
    <div className={`relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br ${getLanguageGradient(language)} p-6 flex flex-col justify-between text-white shadow-inner`}>
      {/* Decorative Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

      {/* Header Language Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="px-3 py-1 rounded-full bg-black/35 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 border border-white/10">
          <Terminal className="w-3.5 h-3.5" />
          <span>{language || 'Software Repository'}</span>
        </div>
        <Layers className="w-5 h-5 opacity-70" />
      </div>

      {/* Title Graphic */}
      <div className="relative z-10 space-y-1">
        <h4 className="text-xl sm:text-2xl font-black tracking-tight line-clamp-2 drop-shadow-md">
          {title}
        </h4>
        <p className="text-xs text-white/80 font-medium">Source Code & System Architecture</p>
      </div>
    </div>
  );
}
