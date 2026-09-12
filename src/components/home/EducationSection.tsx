'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Education } from '@/types/portfolio';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';

interface EducationSectionProps {
  educationList: Education[];
}

export function EducationSection({ educationList }: EducationSectionProps) {
  const formatDateRange = (startDate: string, endDate?: string | null) => {
    try {
      const startYear = new Date(startDate).getFullYear();
      if (!endDate) return `${startYear} – 2026`;
      const endYear = new Date(endDate).getFullYear();
      return `${startYear} – ${endYear}`;
    } catch {
      return startDate;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight">
            Education & <span className="gradient-text">Honors</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Formal education, academic rigor, and undergraduate Informatics Engineering studies.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationList.map((edu, idx) => (
            <motion.div
              key={edu.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 transition-all duration-300 hover:border-cyan-500/40"
            >
              {/* Top Bar: Icon + Dates */}
              <div className="flex items-center justify-between gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 text-cyan-500 dark:text-cyan-300 border border-cyan-500/30">
                  <BookOpen className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>{formatDateRange(edu.start_date, edu.end_date)}</span>
                </div>
              </div>

              {/* Title & Institution */}
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                  {edu.program}
                </h3>
                <p className="text-sm font-semibold text-blue-600 dark:text-cyan-400">
                  {edu.institution}
                </p>

                {edu.major_or_focus && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                    Major / Focus: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{edu.major_or_focus}</span>
                  </p>
                )}
              </div>

              {/* Score & Honor Badges */}
              <div className="pt-4 border-t border-neutral-200/60 dark:border-white/10 flex flex-wrap items-center gap-3">
                {edu.score_label && (
                  <span className="px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-white/[0.05] text-neutral-900 dark:text-white text-xs font-bold border border-neutral-200 dark:border-white/10">
                    {edu.score_label}
                  </span>
                )}

                {edu.honor_note && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-300 text-xs font-bold border border-amber-500/30">
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{edu.honor_note}</span>
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
