'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/types/portfolio';
import { Smartphone, Code2, Server, Brain, Database, Wrench, UserCheck, Sparkles } from 'lucide-react';

interface SkillsGridProps {
  skills: Skill[];
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  const categoryOrder = [
    'Mobile',
    'Languages',
    'Backend',
    'Machine Learning',
    'ML/NLP',
    'Data',
    'Engineering & Tooling',
    'Soft Skills'
  ];

  const existingCategories = Array.from(new Set(skills.map((s) => s.category)));
  
  const sortedCategories = categoryOrder.filter(c => existingCategories.includes(c));
  existingCategories.forEach(c => {
    if (!sortedCategories.includes(c)) sortedCategories.push(c);
  });

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case 'languages':
        return <Code2 className="w-4 h-4 text-blue-400" />;
      case 'backend':
        return <Server className="w-4 h-4 text-indigo-400" />;
      case 'machine learning':
      case 'ml/nlp':
        return <Brain className="w-4 h-4 text-purple-400" />;
      case 'data':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'engineering & tooling':
        return <Wrench className="w-4 h-4 text-amber-400" />;
      case 'soft skills':
        return <UserCheck className="w-4 h-4 text-rose-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech Stack & Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Modern tools, languages, and frameworks used to engineer scalable, high-performance software systems.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCategories.map((category, catIdx) => {
            const catSkills = skills
              .filter((s) => s.category === category)
              .sort((a, b) => a.display_order - b.display_order);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                className="glass-card p-6 sm:p-7 rounded-3xl space-y-5 transition-all hover:border-cyan-500/40"
              >
                {/* Category Header */}
                <div className="flex items-center gap-2.5 border-b border-neutral-200/60 dark:border-white/10 pb-3">
                  <div className="p-1.5 rounded-xl bg-neutral-100 dark:bg-white/[0.05]">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-800 dark:text-neutral-200">
                    {category}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {catSkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-neutral-100/90 dark:bg-white/[0.05] text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-white/10 shadow-xs hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
