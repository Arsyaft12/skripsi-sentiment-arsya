import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { StatCounter } from '@/components/home/StatCounter';
import { SkillsGrid } from '@/components/home/SkillsGrid';
import { ExperienceTimeline } from '@/components/home/ExperienceTimeline';
import { EducationSection } from '@/components/home/EducationSection';
import { AboutSection } from '@/components/home/AboutSection';
import { fetchAchievements, fetchSkills, fetchExperience, fetchEducation } from '@/lib/supabase';

export const metadata = {
  title: 'Arsya Faturrahman — Mobile Developer | IT Fresh Graduate',
  description: 'Professional portfolio of Arsya Faturrahman, IT Fresh Graduate (GPA 3.80/4.00, Dean\'s List 7 Semesters) & Mobile Developer with BNSP Certification.',
  openGraph: {
    title: 'Arsya Faturrahman — Mobile Developer | IT Fresh Graduate',
    description: 'Professional portfolio of Arsya Faturrahman, IT Fresh Graduate & Mobile Developer with real NLP projects and BNSP Certification.',
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
