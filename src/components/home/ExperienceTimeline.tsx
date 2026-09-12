'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '@/types/portfolio';
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

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
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Journey & Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            5+ years cross-industry track record demonstrating fast adaptability, technical problem solving, and team execution.
          </p>
        </div>

        {/* Timeline Items (Chronological: Top to Bottom) */}
        <div className="relative border-l-2 border-cyan-500/30 dark:border-purple-500/30 ml-4 md:ml-6 space-y-12 pl-6 md:pl-10">
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
                {/* Neon Timeline Node Indicator */}
                <div className={`absolute -left-[31px] md:-left-[47px] top-2 w-4 h-4 rounded-full bg-neutral-900 border-2 ${
                  isCurrentRole 
                    ? 'border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]' 
                    : 'border-cyan-400 group-hover:border-purple-400 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.8)]'
                } group-hover:scale-125 transition-all`} />

                <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-5 transition-all duration-300">
                  {/* Header: Role & Dates */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200/60 dark:border-white/10 pb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
                          {exp.role_title}
                        </h3>
                        {isCurrentRole && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-400">
                            <Sparkles className="w-2.5 h-2.5" />
                            Present
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-blue-600 dark:text-cyan-400 pt-1">
                        {exp.organization}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-medium text-neutral-500 dark:text-neutral-400 shrink-0">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/10">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        <span>
                          {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                        </span>
                      </div>

                      {exp.location && (
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/10">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Highlights List */}
                  <ul className="space-y-3 pt-1">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
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
