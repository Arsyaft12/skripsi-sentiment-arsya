'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowUpRight, 
  Sparkles, 
  Home, 
  User, 
  Stethoscope, 
  Wrench, 
  Activity, 
  HelpCircle, 
  Award, 
  PhoneCall,
  CalendarCheck
} from 'lucide-react';

import { portfolioConfig } from '@/config/portfolio.config';

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Beranda', id: 'home', path: '/#home', icon: <Home className="w-4 h-4" /> },
    { name: 'Tentang', id: 'about', path: '/#about', icon: <User className="w-4 h-4" /> },
    { name: 'Layanan', id: 'services', path: '/#services', icon: <Stethoscope className="w-4 h-4" /> },
    { name: 'Alat & Terapi', id: 'tools', path: '/#tools', icon: <Wrench className="w-4 h-4" /> },
    { name: 'Studi Kasus', id: 'cases', path: '/#cases', icon: <Activity className="w-4 h-4" /> },
    { name: 'Kredensial', id: 'portfolio', path: '/#portfolio', icon: <Award className="w-4 h-4" /> },
    { name: 'FAQ', id: 'philosophy', path: '/#philosophy', icon: <HelpCircle className="w-4 h-4" /> },
    { name: 'Kontak', id: 'contact', path: '/#contact', icon: <PhoneCall className="w-4 h-4" /> },
  ];

  // Scroll Spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const handleConsultationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (portfolioConfig.contact.whatsappLink) {
      window.open(portfolioConfig.contact.whatsappLink, '_blank');
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <div className="w-full max-w-5xl rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between pointer-events-auto transition-all duration-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xl shadow-slate-900/10 dark:shadow-black/40">
          
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, 'home')}
            className="group flex items-center gap-2 text-base font-black tracking-tight text-slate-900 dark:text-white transition-all duration-200 pl-1"
          >
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
            </span>
            <span className="text-slate-900 dark:text-white text-sm sm:text-base tracking-tight font-extrabold">
              {portfolioConfig.personal.nickname || portfolioConfig.personal.name}<span className="text-cyan-500 dark:text-cyan-400">.</span>
            </span>
          </Link>

          {/* Center Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 z-10 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 shadow-md -z-10"
                    />
                  )}
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Controls & CTA */}
          <div className="flex items-center gap-2">
            {/* Theme Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 transition-all hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:scale-105 cursor-pointer shadow-sm"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
              )}
            </button>

            {/* Desktop Consultation CTA Button */}
            <button
              type="button"
              onClick={handleConsultationClick}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-cyan-500/25 transition-all duration-200 hover:scale-105 hover:shadow-cyan-500/40 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-cyan-200" />
              <span>KONSULTASI</span>
              <ArrowUpRight className="h-3 w-3 text-cyan-200" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu Navigasi"
              className="inline-flex lg:hidden h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-md lg:hidden flex flex-col justify-between pt-20 pb-8 px-4 overflow-y-auto"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md mx-auto rounded-3xl p-4 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-2"
            >
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className={`flex items-center gap-2.5 rounded-2xl p-3 text-xs sm:text-sm font-bold transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-md'
                          : 'text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className={isActive ? 'text-white' : 'text-cyan-500 dark:text-cyan-400'}>{link.icon}</span>
                      <span className="truncate">{link.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Mobile Direct Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleConsultationClick}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4 text-emerald-100" />
                  <span>JADWALKAN KONSULTASI (WHATSAPP)</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-100" />
                </button>
              </div>
            </motion.div>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-2 rounded-full bg-slate-800/80 text-slate-300 text-xs font-bold border border-slate-700"
              >
                Tutup Menu ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
