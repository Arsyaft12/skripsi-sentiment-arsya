import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectCard } from '@/components/work/ProjectCard';
import { SocialContentCard } from '@/components/work/SocialContentCard';
import { getCuratedProjects } from '@/lib/github';
import { fetchSocialContent } from '@/lib/supabase';
import { Code2, Share2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects & Works | Arsya Faturrahman',
  description:
    'Explore Arsya Faturrahman’s portfolio of mobile app projects, software engineering work, and digital presence across product and technical content.',
  openGraph: {
    title: 'Projects & Works | Arsya Faturrahman',
    description:
      'Portfolio of software engineering and mobile development projects by Arsya Faturrahman.',
    images: ['/assets/photos/Photo Profile.png'],
  },
};

export default async function WorkPage() {
  const [projects, socialContent] = await Promise.all([
    getCuratedProjects(),
    fetchSocialContent(),
  ]);

  const groupedSocialContent = socialContent.reduce(
    (acc, item) => {
      const platform = item.platform.toLowerCase() === 'instagram' ? 'Instagram' : item.platform.toLowerCase() === 'tiktok' ? 'TikTok' : item.platform;
      const category = item.category || 'Social Media';

      if (!acc[platform]) {
        acc[platform] = {} as Record<string, typeof socialContent>;
      }

      if (!acc[platform][category]) {
        acc[platform][category] = [];
      }

      acc[platform][category].push(item);
      return acc;
    },
    {} as Record<string, Record<string, typeof socialContent>>
  );

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 selection:bg-blue-500 selection:text-white transition-colors">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
          
          {/* Page Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>Software Engineering Projects & Open Source</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
              Projects & Works
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
              Curated and fetched dynamically via GitHub REST API. Featuring clean software architecture, Supabase backend integrations, and responsive UI design.
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
              <div className="p-12 text-center rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <p className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
                  No projects are currently marked as featured.
                </p>
                <p className="text-xs text-neutral-500">
                  Add a row in `project_settings` table in Supabase dashboard with `is_featured = true` and `repo_name` matching your GitHub repository.
                </p>
              </div>
            )}
          </section>

          {/* Digital Presence & Social Proof Section */}
          <section className="space-y-10 pt-12 border-t border-neutral-200/80 dark:border-neutral-800">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/60 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
                <Share2 className="w-3.5 h-3.5" />
                <span>Creative Campaign Portfolio</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Digital Presence & Social Proof
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Real campaign storytelling, brand visibility, and performance-driven content strategy across Instagram and TikTok.
              </p>
            </div>

            <div className="rounded-[32px] border border-neutral-200 bg-[#f5f5f5] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-[#111111]">
              <div className="flex justify-center">
                <div className="grid w-full max-w-[980px] grid-cols-1 gap-5 sm:grid-cols-2">
                  {socialContent.map((content, idx) => (
                    <SocialContentCard key={content.id} content={content} index={idx} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Closing CTA */}
          <div className="p-10 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold tracking-tight">Want to Verify My Credentials & Certifications?</h3>
              <p className="text-sm text-blue-100 font-medium">
                View official BNSP Software Engineering certificates and academic diploma documents on Page 3.
              </p>
            </div>
            <Link
              href="/achievements"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-blue-600 bg-white hover:bg-neutral-100 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>View Certifications →</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
