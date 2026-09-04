import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CertificateList } from '@/components/achievements/CertificateList';
import { fetchCertificates } from '@/lib/supabase';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Certifications & Achievements | Arsya Faturrahman',
  description:
    'View verified certifications, academic credentials, and professional achievements for Arsya Faturrahman, including BNSP-backed software engineering credentials.',
  openGraph: {
    title: 'Certifications & Achievements | Arsya Faturrahman',
    description:
      'Official certifications and achievements for Arsya Faturrahman, including software engineering credentials and academic records.',
    images: ['/assets/photos/Photo Profile.png'],
  },
};

export default async function AchievementsPage() {
  const certificates = await fetchCertificates();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 selection:bg-blue-500 selection:text-white transition-colors">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">

          {/* Header Section */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Credibility & Official Documents</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
              Certifications & Achievements
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
              Official BNSP professional software engineering certificates, technical workshops, and academic diplomas available for direct interactive document review.
            </p>
          </div>

          {/* Certificates Grid List with Modal */}
          <CertificateList certificates={certificates} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
