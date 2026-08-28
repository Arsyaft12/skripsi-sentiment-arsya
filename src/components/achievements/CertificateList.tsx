'use client';

import React, { useState } from 'react';
import { Certificate } from '@/types/portfolio';
import { CertificateCard } from './CertificateCard';
import { CertificateModal } from './CertificateModal';
import { Filter } from 'lucide-react';

interface CertificateListProps {
  certificates: Certificate[];
}

export function CertificateList({ certificates }: CertificateListProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(certificates.map((c) => c.category)))];

  const filteredCertificates = activeCategory === 'All'
    ? certificates
    : certificates.filter((c) => c.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 pr-2 shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Category:</span>
        </div>

        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Certificate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((cert, idx) => (
          <CertificateCard
            key={cert.id}
            certificate={cert}
            index={idx}
            onSelect={(selected) => setSelectedCertificate(selected)}
          />
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500">
          No certificates available in this category.
        </div>
      )}

      {/* Lightbox Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}
