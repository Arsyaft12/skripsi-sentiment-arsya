'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles, MapPin, GraduationCap, Award, ShieldCheck, BriefcaseBusiness } from 'lucide-react';

export function Hero() {
  const [activePhoto, setActivePhoto] = useState<1 | 2>(1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePhoto((current) => (current === 1 ? 2 : 1));
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  const highlights = [
    { label: 'Open to Opportunities', tone: 'emerald', icon: <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> },
    { label: 'Mobile Developer', tone: 'blue', icon: <BriefcaseBusiness className="h-3.5 w-3.5" /> },
    { label: 'IT Graduate', tone: 'amber', icon: <GraduationCap className="h-3.5 w-3.5" /> },
    { label: 'BNSP Certified', tone: 'purple', icon: <ShieldCheck className="h-3.5 w-3.5" /> },
    { label: 'BSD City', tone: 'slate', icon: <MapPin className="h-3.5 w-3.5" /> },
  ];

  const stats = [
    { value: 'Product', label: 'Mindset', detail: 'Business-focused execution' },
    { value: 'Mobile', label: 'Delivery', detail: 'Scalable user solutions' },
    { value: 'Impact', label: 'Driven', detail: 'Useful, measurable value' },
  ];

  const toneStyles: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60',
    blue: 'bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/60',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/60 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800/60',
    slate: 'bg-neutral-100 text-neutral-700 border-neutral-200/60 dark:bg-neutral-800/80 dark:text-neutral-300 dark:border-neutral-700/60',
  };

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pb-20 pt-28 sm:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),_transparent_30%)]" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 md:px-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 lg:col-span-7"
        >
          <div className="section-eyebrow w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Mobile Developer & IT Fresh Graduate</span>
          </div>

          <div className="space-y-5">
            <h1 className="text-4xl font-black leading-[0.96] tracking-[-0.06em] text-neutral-950 dark:text-white sm:text-5xl xl:text-7xl">
              Arsya Faturrahman
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-lg">
              Mobile Developer with a strong product mindset and hands-on experience building practical, user-friendly
              digital solutions. I combine technical execution with user-centered thinking to create apps that are
              functional, scalable, and aligned with real business needs. My portfolio reflects work in mobile product
              development, problem solving, and thoughtful design focused on measurable impact.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {highlights.map((item) => (
              <div key={item.label} className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${toneStyles[item.tone]}`}>
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="grid max-w-xl gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="section-shell rounded-2xl p-4 text-left">
                <div className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">{stat.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">{stat.label}</div>
                <div className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">{stat.detail}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-2.5 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>View My Work</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="/assets/certificates/Arsya Faturrahman CV.pdf"
              download="Arsya Faturrahman CV.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-neutral-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:border-blue-700 dark:hover:text-blue-400"
            >
              <span>📄 Download CV</span>
            </a>

            <a
              href="mailto:arsyaft12@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-neutral-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:border-blue-700 dark:hover:text-blue-400"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Me</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 lg:col-span-5 lg:items-end"
        >
          <div className="group relative h-[520px] w-full max-w-md overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-neutral-100 shadow-[0_30px_80px_rgba(15,23,42,0.18)] dark:border-neutral-800 dark:bg-neutral-900 sm:h-[580px]">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-indigo-500/10 to-violet-500/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className={`absolute inset-0 transition-opacity duration-500 ${activePhoto === 1 ? 'opacity-100' : 'opacity-0'}`}>
              <Image
                src="/assets/photos/Photo Profile.png"
                alt="Arsya Faturrahman — Professional Photo"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className={`absolute inset-0 transition-opacity duration-500 ${activePhoto === 2 ? 'opacity-100' : 'opacity-0'}`}>
              <Image
                src="/assets/photos/Photo Profile 2.png"
                alt="Arsya Faturrahman — Alternative Photo"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-90" />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-white/80 p-4 backdrop-blur-md dark:border-neutral-700 dark:bg-slate-900/80">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">Profile</p>
                  <p className="mt-1 text-base font-semibold text-neutral-900 dark:text-white">Arsya Faturrahman</p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                  <BriefcaseBusiness className="h-3 w-3" />
                  Available
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
