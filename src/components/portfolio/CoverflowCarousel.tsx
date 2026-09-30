'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Play, Sparkles } from 'lucide-react';
import { SocialContent } from '@/types/portfolio';

interface CoverflowCarouselProps {
  items: SocialContent[];
}

export function CoverflowCarousel({ items }: CoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = items.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total]);

  const activeItem = items[activeIndex] || items[0];

  const handleCardClick = (index: number, url?: string) => {
    if (index === activeIndex && url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      
      {/* iOS-Safe Fluid Card Stage */}
      <div 
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative h-[360px] sm:h-[440px] w-full flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          {items.map((item, index) => {
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCurrent = offset === 0;
            const absOffset = Math.abs(offset);
            const isVisible = absOffset <= 2;

            if (!isVisible) return null;

            // Highly performant 2.5D transformations (GPU efficient, zero iOS crash)
            const translateX = offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : 160);
            const scale = isCurrent ? 1 : Math.max(0.78, 1 - absOffset * 0.14);
            const zIndex = 30 - absOffset * 5;
            const opacity = isCurrent ? 1 : Math.max(0.35, 1 - absOffset * 0.3);

            return (
              <motion.div
                key={item.id}
                onClick={() => handleCardClick(index, item.embed_url)}
                animate={{
                  x: translateX,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 30,
                  mass: 0.7,
                }}
                style={{
                  zIndex: zIndex,
                }}
                className={`absolute w-[250px] sm:w-[290px] h-[320px] sm:h-[380px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all ${
                  isCurrent 
                    ? 'ring-2 ring-cyan-400 shadow-cyan-500/30' 
                    : 'hover:brightness-110'
                }`}
              >
                {/* Card Background */}
                <div className="relative w-full h-full bg-slate-950">
                  {item.thumbnail_url ? (
                    <Image
                      src={item.thumbnail_url}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 250px, 300px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 flex items-center justify-center p-6 text-center">
                      <div className="space-y-2">
                        <Sparkles className="w-8 h-8 text-cyan-400 mx-auto" />
                        <span className="text-xs font-bold text-white line-clamp-3">{item.title}</span>
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 text-[10px] font-bold uppercase tracking-wider text-cyan-300 border border-white/15">
                      {item.platform}
                    </span>
                    {item.metric_label && (
                      <span className="px-2.5 py-0.5 rounded-full bg-pink-500/30 text-[10px] font-mono font-bold text-pink-200 border border-pink-500/40">
                        {item.metric_label}
                      </span>
                    )}
                  </div>

                  {/* Center Play Indicator on Active Card */}
                  {isCurrent && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-2">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/50 text-white">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-black/80 text-[10px] sm:text-[11px] font-bold text-cyan-300 border border-cyan-400/40">
                        Buka Konten ↗
                      </span>
                    </div>
                  )}

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 space-y-1 z-10 text-left bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                    <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 drop-shadow">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="absolute inset-x-2 sm:inset-x-8 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-40">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Slide Sebelumnya"
            className="p-2.5 sm:p-3 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-xl hover:scale-110 hover:border-cyan-400 transition-all pointer-events-auto cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Slide Berikutnya"
            className="p-2.5 sm:p-3 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-xl hover:scale-110 hover:border-cyan-400 transition-all pointer-events-auto cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Active Slide Details Card */}
      {activeItem && (
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="p-4 sm:p-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl"
        >
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                {activeItem.category} • {activeItem.platform}
              </span>
              <span className="text-xs text-slate-400">• Konten {activeIndex + 1} dari {total}</span>
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white">
              {activeItem.title}
            </h3>
            {activeItem.summary && (
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeItem.summary}
              </p>
            )}

            {/* Metrics */}
            {activeItem.stats && activeItem.stats.length > 0 && (
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs font-mono text-cyan-600 dark:text-cyan-300">
                {activeItem.stats.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                    <strong>{s.value}</strong> {s.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          <a
            href={activeItem.embed_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer shadow-md hover:scale-105 transition-transform"
          >
            <span>Buka di Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      )}

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Buka slide ${i + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              activeIndex === i 
                ? 'w-7 sm:w-8 bg-cyan-500' 
                : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-cyan-400/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
