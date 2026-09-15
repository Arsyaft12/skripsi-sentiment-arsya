import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectCard } from '@/components/work/ProjectCard';
import { SocialContentCard } from '@/components/work/SocialContentCard';
import { getCuratedProjects } from '@/lib/github';
import { fetchSocialContent } from '@/lib/supabase';
import { Code2, Share2, Sparkles, Award } from 'lucide-react';

import { portfolioConfig } from '@/config/portfolio.config';

export const metadata: Metadata = {
  title: `Projects & Works | ${portfolioConfig.personal.name}`,
  description: `Explore ${portfolioConfig.personal.name}’s portfolio of engineering projects, web applications, and software systems.`,
  openGraph: {
    title: `Projects & Works | ${portfolioConfig.personal.name}`,
    description: `Portfolio of software engineering, web apps, and mobile development projects by ${portfolioConfig.personal.name}.`,
    images: [portfolioConfig.seo.ogImage],
  },
};

export default async function WorkPage() {
  const [projects, socialContent] = await Promise.all([
    getCuratedProjects(),
    fetchSocialContent(),
  ]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
          
          {/* Page Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>Software Engineering & Systems</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Featured <span className="grad-vi">Projects & Works</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Empirical data engines, Machine Learning classification, clinical medical AI, and modern web systems. Built with clean architecture, statistical normalization, and production-ready UX.
            </p>
          </div>

          {/* Projects Grid Section */}
          <section className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {projects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>

            {projects.length === 0 && (
              <div className="p-12 text-center rounded-3xl glass-panel space-y-3">
                <p className="text-base font-semibold text-slate-200">
                  No projects are currently marked as featured.
                </p>
                <p className="text-xs text-slate-400">
                  Add a row in `project_settings` table in Supabase dashboard with `is_featured = true` and `repo_name` matching your GitHub repository.
                </p>
              </div>
            )}
          </section>

          {/* Digital Presence & Social Proof Section */}
          <section className="space-y-10 pt-12 border-t border-slate-800">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
                <Share2 className="w-3.5 h-3.5" />
                <span>Creative Campaign Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Digital Presence & <span className="grad-vi">Social Proof</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Real campaign storytelling, brand visibility, and performance-driven content strategy across Instagram and TikTok as Creative Lead & Business Development.
              </p>
            </div>

            <div className="glass-panel rounded-[32px] p-6 sm:p-8">
              <div className="flex justify-center">
                <div className="grid w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {socialContent.map((content, idx) => (
                    <SocialContentCard key={content.id} content={content} index={idx} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Closing CTA */}
          <div className="relative overflow-hidden p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-white/10">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-2 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-cyan-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Credentials</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Want to Verify My Certifications?</h3>
              <p className="text-sm sm:text-base text-blue-100 font-normal max-w-xl">
                Inspect official BNSP Software Engineering certificates, national seminar publications (SeNTIK 10), and verified transcripts.
              </p>
            </div>
            <Link
              href="/achievements"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-100 rounded-full transition-all shadow-lg hover:scale-105 active:scale-95 z-10"
            >
              <Award className="w-4 h-4 text-purple-600" />
              <span>View Certifications →</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
