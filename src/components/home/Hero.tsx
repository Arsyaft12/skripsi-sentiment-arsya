'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles, MapPin, GraduationCap, Award, ShieldCheck } from 'lucide-react';

export function Hero() {
  const [activePhoto, setActivePhoto] = useState<1 | 2>(1);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Text & CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-8"
        >
          {/* Positioning Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>MOBILE DEVELOPER & IT FRESH GRADUATE</span>
          </div>

          {/* Large Hero Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.05]">
              Arsya Faturrahman
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 font-normal max-w-2xl leading-relaxed">
              IT Fresh Graduate (GPA 3.80/4.00, consistent Dean&apos;s List across 7 semesters) with hands-on experience building an end-to-end NLP system that achieved 85% classification accuracy on real business data. BNSP Certified Software Engineer with 5+ years of cross-industry experience, now focused on Mobile Development in the financial technology sector.
            </p>
          </div>

          {/* Quick Info Metadata — above CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Open to Opportunities</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">IT Fresh Graduate</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/60">
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Dean&apos;s List 7×</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/60">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-semibold text-purple-700 dark:text-purple-400">BNSP Certified</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
              <MapPin className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
              <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">BSD City</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-full transition-all duration-200 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="mailto:arsyaft12@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/60 rounded-full transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Dual Profile Photo with toggle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end gap-4"
        >
          {/* Photo Toggle Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/60">
            <button
              onClick={() => setActivePhoto(1)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activePhoto === 1
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              Photo 1
            </button>
            <button
              onClick={() => setActivePhoto(2)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activePhoto === 2
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              Photo 2
            </button>
          </div>

          {/* Main Photo Frame */}
          <div className="relative group w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
            {/* Glow backdrop */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
            
            {/* Photo 1 */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${activePhoto === 1 ? 'opacity-100' : 'opacity-0'}`}>
              <Image
                src="/assets/photos/Photo Profile.png"
                alt="Arsya Faturrahman — Professional Photo"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Photo 2 */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${activePhoto === 2 ? 'opacity-100' : 'opacity-0'}`}>
              <Image
                src="/assets/photos/Photo Profile 2.png"
                alt="Arsya Faturrahman — Alternative Photo"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Overlay gradient mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-90 pointer-events-none" />
            
            {/* Floating Bottom Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md border border-white/20 dark:border-neutral-800 shadow-lg">
              <p className="text-xs font-bold text-neutral-900 dark:text-white">Arsya Faturrahman</p>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-300 font-medium">Mobile Developer | IT Fresh Graduate · GPA 3.80/4.00</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
