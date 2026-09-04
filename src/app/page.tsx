import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { StatCounter } from '@/components/home/StatCounter';
import { SkillsGrid } from '@/components/home/SkillsGrid';
import { ExperienceTimeline } from '@/components/home/ExperienceTimeline';
import { EducationSection } from '@/components/home/EducationSection';
import { AboutSection } from '@/components/home/AboutSection';
import { fetchAchievements, fetchSkills, fetchExperience, fetchEducation } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Arsya Faturrahman | Software Engineer & Mobile Developer',
  description:
    'Software Engineer and Mobile Developer building empirical data platforms, NLP sentiment analysis systems, and high-performance digital products. Explore portfolio, certifications, and projects.',
  openGraph: {
    title: 'Arsya Faturrahman | Software Engineer & Mobile Developer',
    description:
      'Portfolio of Arsya Faturrahman, a software engineer and mobile developer with hands-on experience building empirical engines, NLP systems, and practical digital solutions.',
    images: ['/assets/photos/Photo Profile.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arsya Faturrahman | Software Engineer & Mobile Developer',
    description:
      'Portfolio of Arsya Faturrahman, a software engineer and mobile developer focused on empirical engines, AI, and business-aligned products.',
    images: ['/assets/photos/Photo Profile.png'],
  },
};

export default async function HomePage() {
  const [achievements, skills, experiences, educationList] = await Promise.all([
    fetchAchievements(),
    fetchSkills(),
    fetchExperience(),
    fetchEducation(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 selection:bg-blue-500 selection:text-white transition-colors">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <StatCounter achievements={achievements} />
        <SkillsGrid skills={skills} />
        <ExperienceTimeline experiences={experiences} />
        <EducationSection educationList={educationList} />
        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}
