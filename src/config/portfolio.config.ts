export interface PortfolioConfig {
  personal: {
    name: string;
    nickname: string;
    title: string;
    roles: string[];
    bioShort: string;
    bioLong: string;
    statusBadge: string;
    location: string;
    avatarUrl: string;
    resumePdfUrl: string;
  };
  contact: {
    email: string;
    whatsappNumber?: string;
    whatsappLink?: string;
  };
  socialLinks: {
    github?: string;
    linkedin: string;
    instagram?: string;
    tiktok?: string;
    orcid?: string;
    twitter?: string;
  };
  audioPlayer: {
    title: string;
    artist: string;
    audioUrl: string;
    coverImageUrl: string;
  };
  aboutPillars: Array<{
    num: string;
    title: string;
    tag: string;
    tagColor: string;
    body: string;
    highlights: string[];
  }>;
  guestbookDefaultComments: Array<{
    id: string;
    name: string;
    message: string;
    time: string;
    isPinned?: boolean;
  }>;
  seo: {
    siteTitle: string;
    titleTemplate: string;
    description: string;
    siteUrl: string;
    keywords: string[];
    ogImage: string;
  };
}

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: 'Zaez Abdul Mahdi, S.Ftr., Ftr., M.Ft., Cert.DN., SPRC.',
    nickname: 'Zaez',
    title: 'Physiotherapist • Sports & Performance Rehabilitation • Researcher',
    roles: [
      'Clinical Physiotherapist',
      'Sports & Performance Rehabilitation Specialist',
      'Musculoskeletal & Movement Optimization',
      'Return to Sport & Activity Strategist',
      'Certified Dry Needling (Cert.DN.) Practitioner',
      'Evidence-Based Clinical Researcher (ORCID Certified)'
    ],
    statusBadge: 'Available for Clinical Consultation & Sports Rehabilitation',
    bioShort:
      'Fisioterapis yang mengintegrasikan evidence-based practice dan clinical expertise untuk mengoptimalkan gerak, memulihkan fungsi, mengelola kondisi muskuloskeletal, serta mendukung return to activity dan performance secara aman dan terukur.',
    bioLong:
      'Profesional Fisioterapis dengan pendekatan klinis yang berorientasi pada evidence-based practice, clinical reasoning, dan optimalisasi fungsi gerak manusia. Mengintegrasikan pengetahuan ilmiah, asesmen fungsional, dan keterampilan klinis untuk merancang strategi rehabilitasi yang terarah, individual, dan berorientasi pada outcome: “From Clinical Recovery to Optimal Performance.”',
    location: 'Private Practice / THE BOX PHYSIO, Gading Serpong, Tangerang',
    avatarUrl: '/assets/photos/zaez-portrait.jpg',
    resumePdfUrl: '/assets/certificates/CV-Zaez-Abdul-Mahdi.pdf',
  },

  contact: {
    email: 'physiozaez@gmail.com',
    whatsappNumber: '085716513534',
    whatsappLink: 'https://wa.me/6285716513534?text=Halo%20Zaez,%20saya%20tertarik%20untuk%20konsultasi%20layanan%20fisioterapi%20THE%20BOX%20PHYSIO',
  },

  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/ftr-zaez-m-70a845385',
    instagram: 'https://www.instagram.com/zam_fisio',
    orcid: 'https://orcid.org/0009-0003-4571-3338',
  },

  audioPlayer: {
    title: 'Clinical Recovery & Focus',
    artist: 'Zaez Abdul Mahdi • Movement & Rehab Flow',
    audioUrl: '/assets/audio/coding-focus.mp3',
    coverImageUrl: '/assets/photos/zaez-portrait.jpg',
  },

  aboutPillars: [
    {
      num: '01',
      title: 'Musculoskeletal & Sports Injury Rehabilitation',
      tag: 'Pain & Function',
      tagColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
      body: 'Focused on comprehensive musculoskeletal rehabilitation, acute & chronic sports injury management, and restoring tissue capacity through structured therapeutic interventions.',
      highlights: ['Musculoskeletal Physiotherapy', 'Sports Injury Rehab', 'Pain Management Protocols'],
    },
    {
      num: '02',
      title: 'Movement Assessment & Return to Sport Strategy',
      tag: 'Progressive Loading',
      tagColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
      body: 'Comprehensive clinical reasoning and functional movement screening to guide objective progression from injury recovery back into athletic performance and daily activities.',
      highlights: ['Return to Sport (RTS)', 'Functional Movement Screen', 'Objective Monitoring'],
    },
    {
      num: '03',
      title: 'Specialized Clinical & Manual Modalities',
      tag: 'Certified Techniques',
      tagColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
      body: 'Hands-on technical clinical skills including Dry Needling (Cert.DN.), joint mobilization manual therapy, and therapeutic aquatic rehabilitation tailored to patient pathology.',
      highlights: ['Certified Dry Needling', 'Manual Therapy', 'Aquatic Rehabilitation'],
    },
    {
      num: '04',
      title: 'Academic Excellence & Evidence-Based Research',
      tag: 'GPA 4.00 (M.Ft.)',
      tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      body: 'Master of Physiotherapy (M.Ft.) with a perfect 4.00 GPA from Universitas Esa Unggul, published scientific research tracked on ORCID, and active clinical hospital experience.',
      highlights: ['S2 Fisioterapi (GPA 4.00)', 'Profesi Fisioterapis (Ftr.)', 'ORCID Researcher (0009-0003-4571-3338)'],
    },
  ],

  guestbookDefaultComments: [
    {
      id: 'pinned-1',
      name: 'Zaez Abdul Mahdi, M.Ft. (Owner)',
      message: 'Welcome to my physiotherapy & rehabilitation portfolio! Drop a consultation inquiry or collaboration note 👋',
      time: 'Pinned',
      isPinned: true,
    },
    {
      id: '2',
      name: 'Dr. Hendra Saputra, Sp.OT',
      message: 'Excellent clinical reasoning and post-operative sports rehabilitation strategy. Highly recommended!',
      time: '2d ago',
    },
    {
      id: '3',
      name: 'Rian Pratama (Athlete)',
      message: 'Great guidance on my ACL return-to-sport progression and dry needling therapy. Back to 100% on the court!',
      time: '4d ago',
    },
  ],

  seo: {
    siteTitle: 'Zaez Abdul Mahdi, M.Ft. — Physiotherapist & Sports Rehabilitation Specialist',
    titleTemplate: '%s | Zaez Abdul Mahdi Physiotherapist',
    description:
      'Official portfolio of Zaez Abdul Mahdi, S.Ftr., Ftr., M.Ft., Cert.DN., SPRC. — Evidence-based Physiotherapist specializing in Musculoskeletal, Sports Injury Rehabilitation, and Movement Optimization.',
    siteUrl: 'https://zaez-physio.vercel.app',
    keywords: [
      'Zaez Abdul Mahdi',
      'Physiotherapist',
      'Fisioterapis Gading Serpong',
      'Sports Injury Rehabilitation',
      'Musculoskeletal Physiotherapy',
      'Dry Needling',
      'Return to Sport',
      'Fisioterapi Tangerang'
    ],
    ogImage: '/assets/photos/zaez-portrait.jpg',
  },
};
