'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/types/portfolio';
import { Smartphone, Code2, Server, Brain, Database, Wrench, UserCheck } from 'lucide-react';

interface SkillsGridProps {
  skills: Skill[];
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  // Order of categories matching master prompt specification
  const categoryOrder = [
    'Mobile',
    'Languages',
    'Backend',
    'ML/NLP',
    'Data',
    'Engineering & Tooling',
    'Soft Skills'
  ];

  // Group skills by category
  const existingCategories = Array.from(new Set(skills.map((s) => s.category)));
  
  // Sort categories according to specified categoryOrder
  const sortedCategories = categoryOrder.filter(c => existingCategories.includes(c));
  existingCategories.forEach(c => {
    if (!sortedCategories.includes(c)) sortedCategories.push(c);
  });

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'languages':
        return <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'backend':
        return <Server className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'ml/nlp':
        return <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'data':
        return <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'engineering & tooling':
        return <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'soft skills':
        return <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      default:
        return <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Skills & Technical Expertise
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
            Tools, languages, and frameworks used to build modern software systems.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-neutral-200/60 dark:border-neutral-800 pb-3">
                  {getCategoryIcon(category)}
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
                    {category}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2.5">
                  {catSkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700/80 shadow-xs hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:-translate-y-0.5 cursor-default"
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
