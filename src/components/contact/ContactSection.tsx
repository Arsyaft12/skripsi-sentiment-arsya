'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  MessageSquare, 
  Sparkles, 
  User, 
  CheckCircle, 
  Clock, 
  Phone, 
  Pin 
} from 'lucide-react';

import { portfolioConfig } from '@/config/portfolio.config';

interface Comment {
  id: string;
  name: string;
  message: string;
  time: string;
  isPinned?: boolean;
}

export function ContactSection() {
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Live Guestbook Comments State with LocalStorage persistence
  const [comments, setComments] = useState<Comment[]>(portfolioConfig.guestbookDefaultComments);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentMessage, setNewCommentMessage] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio_guestbook_comments_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setComments(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 800);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentMessage.trim()) return;

    setIsPostingComment(true);
    setTimeout(() => {
      const newEntry: Comment = {
        id: Date.now().toString(),
        name: newCommentName.trim(),
        message: newCommentMessage.trim(),
        time: 'Just now',
      };
      const updated = [comments[0], newEntry, ...comments.slice(1)];
      setComments(updated);
      try {
        localStorage.setItem('portfolio_guestbook_comments_v2', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      setNewCommentName('');
      setNewCommentMessage('');
      setIsPostingComment(false);
    }, 500);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Konsultasi &amp; Reservasi Jadwal</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Jadwal &amp; <span className="grad-vi">Konsultasi Klinis</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Jadwalkan asesmen klinis, program sports rehabilitation, dry needling, atau workshop korporat di Private Practice / THE BOX PHYSIO Gading Serpong.
          </p>
        </div>

        {/* 2-Column Grid: Contact Form (Left) & Live Guestbook Comments (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 p-7 sm:p-9 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
                <Mail className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span>Kirim Pesan / Konsultasi</span>
              </div>
              
              {portfolioConfig.contact.whatsappLink && (
                <a
                  href={portfolioConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Langsung</span>
                </a>
              )}
            </div>

            {submitSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>Pesan konsultasi Anda berhasil dikirim! Saya akan segera merespons via email atau WhatsApp.</span>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Email / Nomor WhatsApp</label>
                <input
                  type="text"
                  required
                  placeholder="nama@email.com atau 0812xxxx"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Keluhan Klinis / Kebutuhan Terapi</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Jelaskan keluhan nyeri, riwayat cedera, kondisi pascaoperasi, atau tujuan rehabilitasi Anda..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-md hover:scale-[1.01] transition-transform"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Mengirim Pesan...' : 'Kirim Pesan Konsultasi'}</span>
              </button>
            </form>
          </motion.div>

          {/* RIGHT: Live Interactive Guestbook */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-6 p-7 sm:p-9 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-6 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
                  <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span>Buku Tamu &amp; Testimoni Publik</span>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{comments.length} Catatan</span>
              </div>

              {/* Comment Input Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-3 mb-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda / Organisasi"
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Tulis catatan singkat atau testimoni..."
                    value={newCommentMessage}
                    onChange={(e) => setNewCommentMessage(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-purple-400"
                  />
                  <button
                    type="submit"
                    disabled={isPostingComment}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all shrink-0 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim</span>
                  </button>
                </div>
              </form>

              {/* Live Comment Stream */}
              <div className="space-y-3 max-h-[270px] overflow-y-auto pr-1">
                {comments.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      item.isPinned
                        ? 'bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/30'
                        : 'bg-slate-50/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</span>
                        {item.isPinned && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 text-[10px] font-semibold">
                            <Pin className="w-2.5 h-2.5" />
                            Disematkan
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.time === 'Pinned' ? 'Disematkan' : item.time === 'Just now' ? 'Baru saja' : item.time}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 text-center border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              Buku tamu interaktif tersimpan otomatis pada sesi pengunjung.
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
