'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Achievement } from '@/types/portfolio';
import { Award, Brain, BarChart3, TrendingUp, Sparkles } from 'lucide-react';

interface StatCounterProps {
  achievements: Achievement[];
}

export function StatCounter({ achievements }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const getStatIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('gpa') || l.includes('academic') || l.includes('ipk')) {
      return <Award className="w-4 h-4 text-cyan-400" />;
    }
    if (l.includes('ai') || l.includes('ml') || l.includes('nlp') || l.includes('interest')) {
      return <Brain className="w-4 h-4 text-purple-400" />;
    }
    if (l.includes('reviews') || l.includes('processed') || l.includes('business') || l.includes('impact')) {
      return <BarChart3 className="w-4 h-4 text-blue-400" />;
    }
    return <TrendingUp className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-6 rounded-3xl space-y-3 transition-all hover:border-cyan-500/40"
            >
              {/* Stat Header Icon */}
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-white/[0.05] border border-neutral-200 dark:border-white/10">
                  {getStatIcon(item.label)}
                </div>
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400">
                  <Sparkles className="w-2.5 h-2.5" />
                  Verified
                </span>
              </div>

              {/* Stat Big Number */}
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white gradient-text whitespace-nowrap overflow-hidden text-ellipsis">
                {item.value}
              </div>

              {/* Stat Label */}
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
