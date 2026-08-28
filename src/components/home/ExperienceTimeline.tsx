'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '@/types/portfolio';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  // Sort experiences in forward chronological order (oldest display_order=1 first, newest at bottom)
  const sortedExperiences = [...experiences].sort((a, b) => a.display_order - b.display_order);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Present';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
      return dateString;
    }
  };

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200/80 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work Experience & Career Progression</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
            Professional Experience & Leadership
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            5+ years cross-industry track record demonstrating fast adaptability, rapid promotion, and executive communication.
          </p>
        </div>

        {/* Timeline Items (Chronological: Top to Bottom) */}
        <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-4 md:ml-6 space-y-12 pl-6 md:pl-10">
          {sortedExperiences.map((exp, idx) => {
            const isCurrentRole = !exp.end_date;
            return (
              <motion.div
                key={exp.id || idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot Indicator */}
                <div className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-neutral-900 border-4 ${
                  isCurrentRole 
                    ? 'border-emerald-500 scale-110 shadow-sm shadow-emerald-500/50' 
                    : 'border-blue-600 dark:border-blue-500'
                } group-hover:scale-125 transition-transform`} />

                <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-4 shadow-xs hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300">
                  {/* Header: Role & Dates */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                          {exp.role_title}
                        </h3>
                        {isCurrentRole && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            Present Role
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 pt-0.5">
                        {exp.organization}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-medium text-neutral-500 dark:text-neutral-400 shrink-0">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                        </span>
                      </div>

                      {exp.location && (
                        <div className="hidden sm:flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Highlights List */}
                  <ul className="space-y-2.5 pt-1">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
