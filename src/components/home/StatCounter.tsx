'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Achievement } from '@/types/portfolio';
import { Award, Brain, BarChart3, TrendingUp } from 'lucide-react';

interface StatCounterProps {
  achievements: Achievement[];
}

export function StatCounter({ achievements }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const getStatIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('gpa') || l.includes('academic') || l.includes('ipk')) {
      return <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
    if (l.includes('nlp') || l.includes('sentisight') || l.includes('accuracy')) {
      return <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
    if (l.includes('reviews') || l.includes('processed') || l.includes('data')) {
      return <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
    return <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
  };

  return (
    <section ref={ref} className="py-16 border-y border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/40 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs space-y-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
            >
              {/* Stat Header Icon */}
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60">
                  {getStatIcon(item.label)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Verified Metric
                </span>
              </div>

              {/* Stat Big Number - Never Wraps Awkwardly */}
              <div className="text-3xl sm:text-4xl xl:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                {item.value}
              </div>

              {/* Stat Label */}
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
