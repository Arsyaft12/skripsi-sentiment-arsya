import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CertificateList } from '@/components/achievements/CertificateList';
import { fetchCertificates } from '@/lib/supabase';
import { ShieldCheck, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col transition-colors">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">

          {/* Header Section */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Credibility & Documents</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight">
              Certifications & <span className="gradient-text">Achievements</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
              Official BNSP professional software engineering certificates, SeNTIK 10 national seminar publications, technical workshops, and verified academic transcripts available for instant interactive document review.
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
