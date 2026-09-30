import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CertificateList } from '@/components/achievements/CertificateList';
import { fetchCertificates } from '@/lib/supabase';
import { ShieldCheck, Sparkles } from 'lucide-react';

import { portfolioConfig } from '@/config/portfolio.config';

export const metadata: Metadata = {
  title: `Credentials & Academic Degrees | ${portfolioConfig.personal.name}`,
  description: `View verified clinical credentials, academic degrees (M.Ft., Ftr., S.Ftr.), and specialized certifications (Cert.DN., SPRC., CMSKuS.) for ${portfolioConfig.personal.name}.`,
  openGraph: {
    title: `Credentials & Academic Degrees | ${portfolioConfig.personal.name}`,
    description: `Official credentials and degrees for ${portfolioConfig.personal.name}.`,
    images: [portfolioConfig.seo.ogImage],
  },
};

export default async function AchievementsPage() {
  const certificates = await fetchCertificates();

  return (
    <div className="min-h-screen flex flex-col transition-colors">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-16">

          {/* Header Section */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Clinical Credibility & Documents</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight">
              Credentials & <span className="gradient-text">Degrees</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
              Official Master of Physical Therapy (M.Ft. GPA 4.00), Professional Physiotherapist (Ftr.), Bachelor (S.Ftr.), Certified Dry Needling (Cert.DN.), and Sports Performance Rehabilitation Specialist (SPRC), and Musculoskeletal Ultrasound (CMSKuS) credentials available for verification.
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
