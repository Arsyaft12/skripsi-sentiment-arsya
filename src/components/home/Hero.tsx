'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Play, 
  Pause, 
  Music, 
  Disc, 
  Send, 
  HeartPulse, 
  FileDown,
  Volume2,
  VolumeX,
} from 'lucide-react';

import { portfolioConfig } from '@/config/portfolio.config';

export function Hero() {
  const roles = portfolioConfig.personal.roles;

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(154);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(roleInterval);
  }, [roles.length]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio play prevented:', err);
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 md:px-12">
      
      {/* Real Background Audio Element */}
      <audio
        ref={audioRef}
        src={portfolioConfig.audioPlayer.audioUrl}
        preload="metadata"
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14">
        
        {/* Left Column: Headline, Role & Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-7/12 space-y-7 text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{portfolioConfig.personal.statusBadge}</span>
          </div>

          {/* Main Title - Punchy, Grand & High-Impact */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.06]">
              Dari Pemulihan Klinis
            </h1>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight grad-vi leading-[1.06]">
              Menuju Performa Optimal.
            </h2>
          </div>

          {/* Dynamic Role Ticker - Larger & Eye-Catching */}
          <div className="flex flex-wrap items-center gap-2 text-xl sm:text-2xl lg:text-3xl text-slate-800 dark:text-slate-200 font-medium">
            <span>Saya {portfolioConfig.personal.name},</span>
            <span className="font-extrabold text-cyan-600 dark:text-cyan-300 border-b-2 sm:border-b-3 border-cyan-400 pb-0.5 min-w-[260px] transition-all">
              {roles[currentRoleIndex]}
            </span>
          </div>

          {/* Narrative / Short Bio */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
            {portfolioConfig.personal.bioShort}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#services"
              className="btn-primary inline-flex items-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:scale-105 transition-transform"
            >
              <HeartPulse className="w-4 h-4 text-white" />
              <span>Jelajahi Layanan</span>
            </a>

            {portfolioConfig.contact.whatsappLink && (
              <a
                href={portfolioConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
              >
                <Send className="w-4 h-4 text-emerald-500" />
                <span>Jadwalkan Konsultasi</span>
              </a>
            )}

            <a
              href="#about"
              className="btn-secondary inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform"
            >
              <FileDown className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>STR &amp; Kredensial</span>
            </a>
          </div>

          {/* Social Links Dock */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {portfolioConfig.socialLinks.github && (
              <a
                href={portfolioConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 transition-all hover:scale-110 shadow-sm"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            )}

            {portfolioConfig.socialLinks.linkedin && (
              <a
                href={portfolioConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all hover:scale-110 shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}

            {portfolioConfig.socialLinks.instagram && (
              <a
                href={portfolioConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all hover:scale-110 shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            )}

            {portfolioConfig.socialLinks.orcid && (
              <a
                href={portfolioConfig.socialLinks.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all hover:scale-110 shadow-sm font-bold text-xs flex items-center justify-center min-w-[44px]"
                aria-label="ORCID"
                title="ORCID Scientific Record"
              >
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">iD</span>
              </a>
            )}

            <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 pl-2">Kanal Resmi</span>
          </div>
        </motion.div>

        {/* Right Column: Prominent Portrait & Integrated Focus Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-5/12 flex flex-col items-center lg:items-end gap-5"
        >
          {/* Main Hero Portrait Card */}
          <div className="w-full max-w-[370px] sm:max-w-[400px] rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-slate-100 dark:from-slate-900 to-slate-200 dark:to-slate-950 border border-slate-200/80 dark:border-slate-700/80 shadow-2xl relative group">
            
            {/* Ambient Lighting Behind Portrait */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-600/20 pointer-events-none" />

            {/* Photo Container */}
            <div className="relative w-full h-[400px] sm:h-[460px] flex items-end justify-center">
              <Image
                src="/assets/photos/zaez-portrait.jpg"
                alt={portfolioConfig.personal.name}
                fill
                priority
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />

              {/* Bottom Gradient Fade */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none" />

              {/* Top Floating Badge: STR License */}
              <div className="absolute top-4 left-4 z-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-xl">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>STR Kemenkes Terverifikasi</span>
                </div>
              </div>

              {/* Bottom Overlay Text */}
              <div className="absolute bottom-4 inset-x-4 z-20 flex items-end justify-between gap-2">
                <div className="space-y-0.5">
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                    {portfolioConfig.personal.name}
                  </h3>
                  <p className="text-xs text-cyan-300 font-mono font-semibold">
                    THE BOX PHYSIO • Gading Serpong
                  </p>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 text-[11px] font-mono font-bold text-cyan-300 shrink-0">
                  M.Ft. GPA 4.00
                </span>
              </div>
            </div>
          </div>

          {/* Docked Streamlined Focus Audio Player */}
          <div className="w-full max-w-[370px] sm:max-w-[400px] rounded-2xl p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl bg-cyan-500/10 text-cyan-500 ${isPlaying ? 'animate-pulse' : ''}`}>
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {portfolioConfig.audioPlayer.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {portfolioConfig.audioPlayer.artist}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-white" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Micro Progress Bar */}
            <div 
              onClick={handleSeek}
              className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden cursor-pointer hover:h-2 transition-all relative group"
            >
              <div 
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-100" 
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
