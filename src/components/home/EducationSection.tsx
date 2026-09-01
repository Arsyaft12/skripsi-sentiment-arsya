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
    <section className="py-24 bg-neutral-100/40 dark:bg-neutral-900/30 border-t border-neutral-200/80 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
            Education & Honors
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Formal education, academic achievements, and honors.
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
              className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-6 shadow-xs hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
            >
              {/* Top Bar: Icon + Dates */}
              <div className="flex items-center justify-between gap-4">
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <BookOpen className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full border border-neutral-200/60 dark:border-neutral-700/60">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDateRange(edu.start_date, edu.end_date)}</span>
                </div>
              </div>

              {/* Title & Institution */}
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                  {edu.program}
                </h3>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {edu.institution}
                </p>

                {edu.major_or_focus && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                    Major: <span className="font-medium text-neutral-700 dark:text-neutral-300">{edu.major_or_focus}</span>
                  </p>
                )}
              </div>

              {/* Score & Honor Badges */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center gap-3">
                {edu.score_label && (
                  <span className="px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs font-bold border border-neutral-200 dark:border-neutral-700">
                    {edu.score_label}
                  </span>
                )}

                {edu.honor_note && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-200/60 dark:border-amber-800/60">
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
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
