'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Play, Sparkles, Eye, Heart, Share2 } from 'lucide-react';
import { SocialContent } from '@/types/portfolio';

interface CoverflowCarouselProps {
  items: SocialContent[];
}

export function CoverflowCarousel({ items }: CoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = items.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
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

  return (
    <div 
      className="space-y-8 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Perspective Coverflow Stage */}
      <div 
        ref={containerRef}
        className="relative h-[420px] sm:h-[480px] w-full flex items-center justify-center overflow-hidden [perspective:1400px]"
      >
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center [transform-style:preserve-3d]">
          {items.map((item, index) => {
            // Calculate relative offset from activeIndex with circular wrapping
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCurrent = offset === 0;
            const absOffset = Math.abs(offset);
            const isVisible = absOffset <= 3; // Render center + 3 on each side

            if (!isVisible) return null;

            // 3D Transforms
            const translateX = offset * 180; // Distance between cards
            const translateZ = -absOffset * 140; // Depth back
            const rotateY = offset * -28; // Curved 3D rotation angle
            const scale = isCurrent ? 1.05 : Math.max(0.7, 1 - absOffset * 0.12);
            const zIndex = 30 - absOffset * 5;
            const opacity = isCurrent ? 1 : Math.max(0.35, 1 - absOffset * 0.22);

            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 28,
                  mass: 0.8,
                }}
                style={{
                  zIndex: zIndex,
                }}
                className={`absolute w-60 sm:w-72 h-[340px] sm:h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-shadow ${
                  isCurrent 
                    ? 'ring-2 ring-cyan-400 shadow-cyan-500/30' 
                    : 'hover:brightness-110'
                }`}
              >
                {/* Background Card Image / Graphic */}
                <div className="relative w-full h-full bg-slate-950">
                  {item.thumbnail_url ? (
                    <Image
                      src={item.thumbnail_url}
                      alt={item.title}
                      fill
                      sizes="300px"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-cyan-300 border border-white/15">
                      {item.platform}
                    </span>
                    {item.metric_label && (
                      <span className="px-2.5 py-1 rounded-full bg-pink-500/20 backdrop-blur-md text-[10px] font-mono font-bold text-pink-300 border border-pink-500/30">
                        {item.metric_label} Reach
                      </span>
                    )}
                  </div>

                  {/* Center Play Icon if Active */}
                  {isCurrent && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-cyan-500/80 backdrop-blur-md flex items-center justify-center shadow-lg shadow-cyan-500/50 text-white animate-pulse">
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 space-y-1.5 z-10 text-left">
                    <h4 className="text-sm font-bold text-white line-clamp-2 drop-shadow">
                      {item.title}
                    </h4>
                    {item.summary && (
                      <p className="text-[11px] text-slate-300 line-clamp-2 font-normal">
                        {item.summary}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="absolute inset-x-4 sm:inset-x-12 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-40">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-xl hover:scale-110 hover:border-cyan-400 transition-all pointer-events-auto cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-xl hover:scale-110 hover:border-cyan-400 transition-all pointer-events-auto cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Active Slide Details Card */}
      {activeItem && (
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glass-panel p-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left"
        >
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                {activeItem.category} • {activeItem.platform}
              </span>
              <span className="text-xs text-slate-400">• Slide {activeIndex + 1} of {total}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {activeItem.title}
            </h3>
            {activeItem.summary && (
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeItem.summary}
              </p>
            )}

            {/* Metrics */}
            {activeItem.stats && activeItem.stats.length > 0 && (
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs font-mono text-cyan-600 dark:text-cyan-300">
                {activeItem.stats.map((s, idx) => (
                  <span key={idx}><strong>{s.value}</strong> {s.label}</span>
                ))}
              </div>
            )}
          </div>

          <a
            href={activeItem.embed_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer"
          >
            <span>Watch Reel</span>
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
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              activeIndex === i 
                ? 'w-8 bg-cyan-500' 
                : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-cyan-400/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
