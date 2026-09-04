'use client';

import React from 'react';
import { Target, Zap, ShieldCheck } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-24 bg-neutral-100/50 dark:bg-neutral-900/30 border-t border-neutral-200/80 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            About & Core Values
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
            Analytical Mindset, Executive Communication & Strong Ownership.
          </h3>
        </div>

        {/* Right Column: Narrative */}
        <div className="lg:col-span-7 space-y-8 text-neutral-700 dark:text-neutral-300 text-base leading-relaxed font-normal">
          <p className="text-lg text-neutral-900 dark:text-white font-medium">
            IT Graduate (GPA 3.90/4.00, consistent Dean&apos;s List across 8 semesters) with proven engineering execution across empirical data platforms (BEASTINDEX, processing 2.4M+ benchmark records), and NLP classification systems (SentimenAI, 85% accuracy). BNSP Certified in English for Office Administrative — combining professional communication competency with modern full-stack development and cross-industry leadership.
          </p>
          <p>
            By combining technical discipline in software engineering (TypeScript, Next.js, Python, Flutter, REST APIs) with 5+ years of cross-industry leadership and executive stakeholder management, I deliver clean, scalable solutions built for real business impact.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h4 className="text-sm font-bold text-neutral-950 dark:text-white">Empirical & Full-Stack</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Statistical normalization & performance engines across 2.4M+ benchmark records.</p>
            </div>
            <div className="space-y-2">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h4 className="text-sm font-bold text-neutral-950 dark:text-white">85% NLP Accuracy</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">End-to-end sentiment classification on 1,000+ real customer reviews.</p>
            </div>
            <div className="space-y-2">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h4 className="text-sm font-bold text-neutral-950 dark:text-white">BNSP Certified</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Nationally certified in English for Office Administrative Assistant (BNSP).</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
