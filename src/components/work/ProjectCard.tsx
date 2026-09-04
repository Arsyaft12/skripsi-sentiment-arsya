'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCardData } from '@/types/portfolio';
import { ProjectPreview } from './ProjectPreview';
import { ExternalLink, Star, Clock, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectCardData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Format relative timestamp in English
  const formatRelativeTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
      
      if (diffDays <= 0) return 'Updated today';
      if (diffDays === 1) return 'Updated yesterday';
      if (diffDays < 30) return `Updated ${diffDays}d ago`;
      const diffMonths = Math.floor(diffDays / 30);
      return `Updated ${diffMonths}mo ago`;
    } catch {
      return 'Recently updated';
    }
  };

  // Primary link: prefer live URL, fallback to GitHub
  const primaryUrl = (project.is_live && project.live_url) ? project.live_url : (project.live_url || project.github_url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm hover:shadow-xl hover:border-blue-300/60 dark:hover:border-blue-700/60 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
    >
      {/* Entire card is clickable — goes to primary URL */}
      <a
        href={primaryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl"
        aria-label={`Open ${project.title}`}
      />

      <div className="space-y-5 p-6">
        {/* Project Preview */}
        <ProjectPreview 
          title={project.title} 
          liveUrl={project.live_url}
          cachedThumbnailUrl={project.cached_thumbnail_url} 
          isLive={project.is_live}
          language={project.language} 
        />

        {/* Project Header & Badges */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {project.category && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200/60 dark:border-blue-800/60">
                  {project.category}
                </span>
              )}
              {project.badge && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  <span>{project.badge}</span>
                </span>
              )}
            </div>

            {project.stars > 0 && (
              <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-900/60">
                <Star className="w-3 h-3 fill-amber-500" />
                <span>{project.stars}</span>
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
            {project.title}
          </h3>

          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Key Metrics / Highlights (if present) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {project.metrics.map((m, mIdx) => (
              <div key={mIdx} className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 text-left">
                <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">{m.value}</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech_stack.slice(0, 6).map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions & Metadata */}
      <div className="px-6 pb-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-4">
        {/* Relative Time Badge */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatRelativeTime(project.pushed_at)}</span>
        </div>

        {/* Action Links */}
        <div className="relative z-20 flex items-center gap-2.5">
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white px-3 py-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>

          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 px-3.5 py-1.5 rounded-full shadow-xs transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>Visit App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

