'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Menu, X, ArrowUpRight, Sparkles, FolderGit2, Home, User, Mail, Stethoscope, Wrench, Activity, HelpCircle, Award } from 'lucide-react';

import { portfolioConfig } from '@/config/portfolio.config';

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Beranda', id: 'home', path: '/#home', icon: <Home className="w-3.5 h-3.5" /> },
    { name: 'Tentang', id: 'about', path: '/#about', icon: <User className="w-3.5 h-3.5" /> },
    { name: 'Layanan', id: 'services', path: '/#services', icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { name: 'Alat & Terapi', id: 'tools', path: '/#tools', icon: <Wrench className="w-3.5 h-3.5" /> },
    { name: 'Studi Kasus', id: 'cases', path: '/#cases', icon: <Activity className="w-3.5 h-3.5" /> },
    { name: 'Kredensial', id: 'portfolio', path: '/#portfolio', icon: <Award className="w-3.5 h-3.5" /> },
    { name: 'FAQ', id: 'philosophy', path: '/#philosophy', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { name: 'Kontak', id: 'contact', path: '/#contact', icon: <Mail className="w-3.5 h-3.5" /> },
  ];

  // Active scroll section tracking (ScrollSpy)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = ['home', 'about', 'services', 'tools', 'cases', 'portfolio', 'philosophy', 'contact'];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const handleHireMeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection('contact');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = contactSection.querySelector('input');
        if (input) input.focus();
      }, 500);
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <div className="w-full max-w-4xl rounded-full px-3.5 sm:px-5 py-2 flex items-center justify-between pointer-events-auto transition-all duration-300 bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xl shadow-slate-900/10 dark:shadow-black/40">
        
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

        {/* Center Desktop Navigation with Fluid Animated Pill Indicator */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 z-10 ${
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
        <div className="hidden md:flex items-center gap-2.5">
          {/* Day / Night Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 transition-all hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:scale-105 cursor-pointer shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
            )}
          </button>

          {/* Consultation CTA Button */}
          <button
            type="button"
            onClick={handleHireMeClick}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-cyan-500/25 transition-all duration-200 hover:scale-105 hover:shadow-cyan-500/40 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-cyan-200" />
            <span>KONSULTASI</span>
            <ArrowUpRight className="h-3 w-3 text-cyan-200" />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Ganti Tema"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka Menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-4 right-4 rounded-3xl p-5 md:hidden pointer-events-auto shadow-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-cyan-500 text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-cyan-500 dark:text-cyan-400'}>{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              );
            })}
            
            <button
              type="button"
              onClick={handleHireMeClick}
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>JADWALKAN KONSULTASI</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
