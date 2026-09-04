'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Terminal, Layers, Globe, Activity, Flame, Zap, Gauge, HeartPulse, Sparkles } from 'lucide-react';

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

  const lowerTitle = title.toLowerCase();

  // Bespoke preview graphics for our curated portfolio projects
  if (lowerTitle.includes('beastindex') || lowerTitle.includes('beast index')) {
    return <BeastIndexPreviewGraphic />;
  }

  if (lowerTitle.includes('sentimen') || lowerTitle.includes('sentisight')) {
    return <SentimentAiPreviewGraphic />;
  }

  if (lowerTitle.includes('toraks')) {
    return <ToraksAiPreviewGraphic />;
  }

  if (lowerTitle.includes('pitch')) {
    return <PitchCreativePreviewGraphic />;
  }

  // Tier 1: Render Live Iframe Embed if liveUrl exists and verified
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
          <div className="absolute inset-0 bg-transparent z-10" />
        </div>

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

  // Tier 3: Render Microlink API screenshot if liveUrl is present
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

  // Tier 4: Language Graphic Fallback
  return <FallbackGraphic title={title} language={language} />;
}

// 1. BEASTINDEX Custom Visual Graphic
function BeastIndexPreviewGraphic() {
  return (
    <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#0B0B0C] border border-[#2C2F34] p-5 flex flex-col justify-between text-[#F2F0EA] shadow-xl group/beast">
      {/* Background accents & tactical grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#2C2F34_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#C61F1F]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#1E5BE8]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badges */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded bg-[#1B1D20] border border-[#2C2F34] text-[10px] font-black tracking-widest uppercase text-[#F2F0EA] flex items-center gap-1.5">
            <Flame className="w-3 h-3 text-[#C61F1F]" />
            <span>BEASTINDEX</span>
          </div>
          <span className="text-[10px] font-mono text-[#8C9098]">v4.0 · Next.js 16</span>
        </div>
        
        <div className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>beastindex.com</span>
        </div>
      </div>

      {/* Visual Arena Metrics & Archetype Ladder */}
      <div className="relative z-10 grid grid-cols-3 gap-2.5 my-auto">
        <div className="p-2.5 rounded-xl bg-[#121315]/90 border border-[#C61F1F]/40 flex flex-col">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#C61F1F] uppercase tracking-wider">
            <span>STRONG</span>
            <Activity className="w-3 h-3" />
          </div>
          <div className="mt-1 text-sm font-black text-white">DOTS Parity</div>
          <div className="text-[10px] text-[#8C9098]">2.37M+ Meet Lifts</div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#121315]/90 border border-[#1E5BE8]/40 flex flex-col">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#1E5BE8] uppercase tracking-wider">
            <span>FAST</span>
            <Zap className="w-3 h-3" />
          </div>
          <div className="mt-1 text-sm font-black text-white">Riegel Equiv</div>
          <div className="text-[10px] text-[#8C9098]">56K+ NYC Splits</div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#121315]/90 border border-[#E8A722]/40 flex flex-col">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#E8A722] uppercase tracking-wider">
            <span>FIT</span>
            <Gauge className="w-3 h-3" />
          </div>
          <div className="mt-1 text-sm font-black text-white">KSPO Norms</div>
          <div className="text-[10px] text-[#8C9098]">Real Adult Pop</div>
        </div>
      </div>

      {/* Archetype Ladder Footer */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[#1B1D20] text-[11px]">
        <span className="font-mono text-xs text-[#8C9098]">
          Tier Archetypes: <span className="text-[#F2F0EA] font-semibold">Grizzly · Cheetah · Ox · Wolf</span>
        </span>
        <span className="text-[10px] font-mono text-[#E8A722] bg-[#E8A722]/10 px-2 py-0.5 rounded border border-[#E8A722]/30">
          6 Rung Ladder
        </span>
      </div>
    </div>
  );
}

// 2. SentimenAI Custom Visual Graphic
function SentimentAiPreviewGraphic() {
  return (
    <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-900 via-slate-900 to-indigo-950 border border-neutral-800 p-5 flex flex-col justify-between text-white shadow-xl">
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:18px_18px] opacity-15" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded bg-blue-600/30 border border-blue-400/30 text-[10px] font-bold tracking-wider uppercase text-blue-300">
            NLP · Sentiment Analysis
          </div>
          <span className="text-[10px] font-mono text-neutral-400">Skripsi IT</span>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Web App</span>
        </div>
      </div>

      {/* Interactive Polarity Meter Mockup */}
      <div className="relative z-10 my-auto space-y-2.5 bg-neutral-950/60 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-neutral-300">Classification Accuracy (1,000+ Reviews)</span>
          <span className="text-emerald-400 font-bold">85% Accuracy</span>
        </div>
        
        {/* Progress Bars */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-14 text-neutral-400 font-medium">Positive</span>
            <div className="flex-1 h-2 rounded-full bg-neutral-800 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '74%' }} />
            </div>
            <span className="font-mono text-neutral-300">74%</span>
          </div>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-14 text-neutral-400 font-medium">Negative</span>
            <div className="flex-1 h-2 rounded-full bg-neutral-800 overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: '18%' }} />
            </div>
            <span className="font-mono text-neutral-300">18%</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-neutral-400">
        <span>Naïve Bayes · SVM · Scikit-Learn</span>
        <span className="font-mono text-blue-400">Vercel Deployed</span>
      </div>
    </div>
  );
}

// 3. ToraksAI Custom Visual Graphic
function ToraksAiPreviewGraphic() {
  return (
    <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-zinc-900 to-cyan-950 border border-neutral-800 p-5 flex flex-col justify-between text-white shadow-xl">
      <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:18px_18px] opacity-15" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/40 text-[10px] font-bold tracking-wider uppercase text-cyan-300 flex items-center gap-1.5">
            <HeartPulse className="w-3 h-3 text-cyan-400" />
            <span>Clinical Decision Support</span>
          </div>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Diagnostics</span>
        </div>
      </div>

      {/* Visual Diagnostic Heatmap Mockup */}
      <div className="relative z-10 my-auto grid grid-cols-2 gap-3 bg-neutral-950/60 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
        <div className="space-y-1">
          <div className="text-[10px] font-semibold text-neutral-400 uppercase">Detection Focus</div>
          <div className="text-xs font-bold text-white">14 Thoracic Diseases</div>
          <div className="text-[10px] text-cyan-400 font-mono">Pneumonia · Effusion · Mass</div>
        </div>
        <div className="space-y-1 border-l border-white/10 pl-3">
          <div className="text-[10px] font-semibold text-neutral-400 uppercase">Explainable AI</div>
          <div className="text-xs font-bold text-white">Grad-CAM Heatmaps</div>
          <div className="text-[10px] text-emerald-400 font-mono">Attention Localization</div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-neutral-400">
        <span>Deep Learning CNN · Medical Imaging</span>
        <span className="font-mono text-cyan-400">Next.js Web Frontend</span>
      </div>
    </div>
  );
}

// 4. The Pitch Creative Custom Visual Graphic
function PitchCreativePreviewGraphic() {
  return (
    <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-950 via-stone-900 to-neutral-900 border border-neutral-800 p-5 flex flex-col justify-between text-white shadow-xl">
      <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:18px_18px] opacity-15" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="px-2.5 py-1 rounded bg-purple-950/70 border border-purple-500/40 text-[10px] font-bold tracking-wider uppercase text-purple-300 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Agency & Media Showcase</span>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>thepitchcreative.media</span>
        </div>
      </div>

      {/* Storytelling & Editorial Mockup */}
      <div className="relative z-10 my-auto bg-neutral-950/60 p-3 rounded-xl border border-white/10 backdrop-blur-sm space-y-1">
        <div className="text-xs font-bold text-white tracking-wide">
          The Pitch Creative — Digital Brand Experience
        </div>
        <p className="text-[11px] text-neutral-300 leading-relaxed">
          Modern editorial web build designed for brand storytelling, creative campaigns, and high-impact visual presentations.
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-neutral-400">
        <span>Next.js · Framer Motion · Tailwind</span>
        <span className="font-mono text-purple-400">Production Client Build</span>
      </div>
    </div>
  );
}

// 5. Fallback Language Graphic
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
      <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="px-3 py-1 rounded-full bg-black/35 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 border border-white/10">
          <Terminal className="w-3.5 h-3.5" />
          <span>{language || 'Software Repository'}</span>
        </div>
        <Layers className="w-5 h-5 opacity-70" />
      </div>

      <div className="relative z-10 space-y-1">
        <h4 className="text-xl sm:text-2xl font-black tracking-tight line-clamp-2 drop-shadow-md">
          {title}
        </h4>
        <p className="text-xs text-white/80 font-medium">Source Code & System Architecture</p>
      </div>
    </div>
  );
}

