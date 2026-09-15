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
    github: string;
    linkedin: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
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

/**
 * =========================================================================
 * 🌟 TEMPLATE CONFIGURATION - GANTI DATA DI BAWAH INI UNTUK KUSTOMISASI 🌟
 * =========================================================================
 * Anda cukup mengubah objek `portfolioConfig` di bawah ini untuk mengganti
 * seluruh identitas, foto, kontak, teks Hero, About, dan SEO.
 */
export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: 'Alex Rivera',
    nickname: 'Alex',
    title: 'Full-Stack Software Engineer & Product Designer',
    roles: [
      'Full-Stack Software Engineer',
      'Mobile App Specialist (Flutter & React Native)',
      'AI & Machine Learning Enthusiast',
      'UI/UX & Product Design Specialist',
      'Open Source Contributor',
    ],
    statusBadge: 'Available for Full-time Roles & Freelance Projects',
    bioShort:
      'Passionate software engineer building high-performance web applications, scalable APIs, and delightful interactive user experiences.',
    bioLong:
      'Full-Stack Developer with over 4+ years of experience building modern web and mobile applications using Next.js, TypeScript, Flutter, and cloud architecture. Dedicated to clean code, high aesthetic standards, and measurable business results.',
    location: 'Jakarta, Indonesia',
    avatarUrl: '/assets/photos/Photo Profile.png',
    resumePdfUrl: '/assets/certificates/resume-sample.pdf',
  },

  contact: {
    email: 'alex.rivera@example.com',
    whatsappNumber: '+6281234567890',
    whatsappLink: 'https://wa.me/6281234567890',
  },

  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    twitter: 'https://twitter.com',
  },

  audioPlayer: {
    title: 'Chill Lofi Focus Beats',
    artist: 'Alex Rivera • Coding Flow',
    audioUrl: '/assets/audio/coding-focus.mp3',
    coverImageUrl: '/assets/photos/Photo Profile.png',
  },

  aboutPillars: [
    {
      num: '01',
      title: 'Full-Stack Architecture & Clean Code',
      tag: '4+ Years Track Record',
      tagColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
      body: 'Specialized in building resilient, modern web systems using Next.js, React, Node.js, and Supabase/PostgreSQL with rigorous automated testing and type safety.',
      highlights: ['Scalable Architecture', 'Clean Code & SOLID', 'Type Safety (TypeScript)'],
    },
    {
      num: '02',
      title: 'Cross-Platform Mobile Development',
      tag: 'iOS & Android',
      tagColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
      body: 'Delivering fluid 60fps mobile experiences using Flutter and React Native with native bridge integrations, offline-first state management, and push notification pipelines.',
      highlights: ['Flutter & Dart', 'React Native', 'App Store & Play Store Deployment'],
    },
    {
      num: '03',
      title: 'UI/UX Craftsmanship & Aesthetics',
      tag: 'Design Systems',
      tagColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
      body: 'Bridging the gap between engineering logic and world-class interface aesthetics through modern micro-animations (Framer Motion), dark-mode glassmorphism, and responsive design.',
      highlights: ['Framer Motion Animations', 'Tailwind CSS / Vanilla CSS', 'Figma to Code'],
    },
    {
      num: '04',
      title: 'AI & Machine Learning Integrations',
      tag: 'Intelligent Systems',
      tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      body: 'Deploying machine learning models, sentiment analytics engines, and LLM-powered API assistants directly into real-time web applications.',
      highlights: ['LLM & OpenAI APIs', 'Predictive ML Models', 'Real-time Dashboards'],
    },
  ],

  guestbookDefaultComments: [
    {
      id: 'pinned-1',
      name: 'Alex Rivera (Owner)',
      message: 'Welcome to my portfolio template! Drop a note, collaboration proposal, or just say hi 👋',
      time: 'Pinned',
      isPinned: true,
    },
    {
      id: '2',
      name: 'Sarah Connor',
      message: 'Clean and super smooth interface! Great work on this template.',
      time: '1d ago',
    },
    {
      id: '3',
      name: 'David Kim',
      message: 'Impressive animations and lightning-fast page speed. Keep it up!',
      time: '3d ago',
    },
  ],

  seo: {
    siteTitle: 'Alex Rivera — Full-Stack Software Engineer & Product Designer',
    titleTemplate: '%s | Alex Rivera Portfolio',
    description:
      'Official portfolio of Alex Rivera — Full-Stack Software Engineer specializing in Next.js, TypeScript, Mobile Apps, and Modern UI Design.',
    siteUrl: 'https://example-portfolio.vercel.app',
    keywords: [
      'Alex Rivera',
      'Software Engineer',
      'Full Stack Developer',
      'Next.js Portfolio',
      'Tailwind CSS',
      'React Developer',
      'Web Developer Portfolio',
    ],
    ogImage: '/assets/photos/Photo Profile.png',
  },
};
