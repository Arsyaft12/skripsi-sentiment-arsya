import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { AboutSection } from '@/components/home/AboutSection';
import { PortfolioSection } from '@/components/portfolio/PortfolioSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { 
  fetchAchievements, 
  fetchExperience, 
  fetchEducation, 
  fetchCertificates,
  fetchSocialContent
} from '@/lib/supabase';
import { getCuratedProjects } from '@/lib/github';

export const metadata: Metadata = {
  title: 'Arsya Faturrahman | Software Engineer & Creative Lead',
  description:
    'Official portfolio of Arsya Faturrahman — Software Engineer, Mobile Developer, and Creative Lead. Turning ideas into measurable reality through empirical engines and modern digital UX.',
  openGraph: {
    title: 'Arsya Faturrahman | Software Engineer & Creative Lead',
    description:
      'Portfolio of Arsya Faturrahman, specializing in empirical benchmark engines, mobile apps, Machine Learning systems, creative campaigns, and verified credentials.',
    images: ['/assets/photos/Photo Profile.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arsya Faturrahman | Software Engineer & Creative Lead',
    description:
      'Explore projects, tech stack, creative campaigns, and verified credentials of Arsya Faturrahman.',
    images: ['/assets/photos/Photo Profile.png'],
  },
};

export default async function HomePage() {
  const [
    achievements, 
    experiences, 
    educationList, 
    projects, 
    certificates,
    socialContent
  ] = await Promise.all([
    fetchAchievements(),
    fetchExperience(),
    fetchEducation(),
    getCuratedProjects(),
    fetchCertificates(),
    fetchSocialContent(),
  ]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      
      <main className="flex-1 space-y-8">
        <Hero />
        <AboutSection 
          experiences={experiences} 
          educationList={educationList} 
          achievements={achievements} 
        />
        <PortfolioSection 
          projects={projects} 
          certificates={certificates} 
          socialContent={socialContent}
        />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
