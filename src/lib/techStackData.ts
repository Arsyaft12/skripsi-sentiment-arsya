export type SkillCategoryType = 'all' | 'tech' | 'bizdev' | 'creative';

export interface SkillItem {
  id: string;
  name: string;
  category: 'tech' | 'bizdev' | 'creative';
  categoryLabel: string;
  icon?: string; // Image URL if available
  lucideIconName?: string; // Fallback icon name
  color: string;
  description: string;
  badge?: string;
}

export const SKILL_CATEGORIES: { id: SkillCategoryType; label: string }[] = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'tech', label: 'Tech & Engineering' },
  { id: 'bizdev', label: 'Business Development' },
  { id: 'creative', label: 'Creative Lead & Media' },
];

export const ALL_SKILLS_DATA: SkillItem[] = [
  // ==========================================
  // 1. TECH & ENGINEERING
  // ==========================================
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'tech',
    categoryLabel: 'Mobile Dev',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    color: '#02569B',
    description: 'Cross-platform mobile apps with clean state management & fluid UI',
    badge: 'Mobile Core',
  },
  {
    id: 'nextjs',
    name: 'Next.js 16',
    category: 'tech',
    categoryLabel: 'Full-Stack Framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    color: '#38BDF8',
    description: 'App Router architecture, SSR/SSG, high-performance web engines',
    badge: 'Flagship Stack',
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'tech',
    categoryLabel: 'Frontend Library',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61DAFB',
    description: 'Interactive UI components, hooks, state orchestration & SPA architectures',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'tech',
    categoryLabel: 'Programming Language',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: '#3178C6',
    description: 'Type-safe scalable application development & robust interfaces',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'tech',
    categoryLabel: 'AI & Data Backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#3776AB',
    description: 'Machine Learning models, data mining, Scikit-learn, and backend APIs',
    badge: 'Thesis / AI',
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'tech',
    categoryLabel: 'Design & Styling',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    color: '#06B6D4',
    description: 'Modern glassmorphism, responsive systems, animations & dark modes',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'tech',
    categoryLabel: 'Backend as a Service',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',
    color: '#3ECF8E',
    description: 'PostgreSQL database, authentication, real-time listeners & storage',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'tech',
    categoryLabel: 'Backend Runtime',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#339933',
    description: 'Server-side runtime, API development & microservices integration',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'tech',
    categoryLabel: 'Version Control',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    color: '#F05032',
    description: 'Branching workflows, code reviews, semantic commits & CI/CD',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'tech',
    categoryLabel: 'Relational DB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: '#4169E1',
    description: 'Relational database schema modeling, indexing & performant queries',
  },
  {
    id: 'vercel',
    name: 'Vercel Deployment',
    category: 'tech',
    categoryLabel: 'Cloud & Edge',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',
    color: '#000000',
    description: 'Edge functions, CI/CD pipeline automation & cloud infrastructure',
  },
  {
    id: 'ml_nlp',
    name: 'Machine Learning & AI Models',
    category: 'tech',
    categoryLabel: 'Machine Learning',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    color: '#F7931E',
    description: 'Supervised algorithms, Scikit-learn, SVM, Naïve Bayes & data classification',
    badge: 'Published Author',
  },

  // ==========================================
  // 2. BUSINESS DEVELOPMENT & STRATEGY
  // ==========================================
  {
    id: 'client_pitching',
    name: 'Client Pitching & Presentation',
    category: 'bizdev',
    categoryLabel: 'Business Acquisition',
    color: '#3B82F6',
    lucideIconName: 'Presentation',
    description: 'Delivering compelling client pitch decks, technical storytelling & winning project proposals',
    badge: 'Agency Proven',
  },
  {
    id: 'market_research',
    name: 'Market & Competitor Analysis',
    category: 'bizdev',
    categoryLabel: 'Strategic Planning',
    color: '#6366F1',
    lucideIconName: 'TrendingUp',
    description: 'Analyzing industry market trends, consumer behavior, and identifying untapped growth opportunities',
  },
  {
    id: 'project_scoping',
    name: 'Technical Project Scoping (PRD)',
    category: 'bizdev',
    categoryLabel: 'Product Management',
    color: '#0EA5E9',
    lucideIconName: 'FileSpreadsheet',
    description: 'Translating complex client business requirements into actionable development timelines & PRDs',
    badge: 'Bridge Role',
  },
  {
    id: 'b2b_partnership',
    name: 'B2B Partnership & Negotiation',
    category: 'bizdev',
    categoryLabel: 'Partnership',
    color: '#8B5CF6',
    lucideIconName: 'Handshake',
    description: 'Structuring win-win commercial terms, partner alignment, and sustainable client contracts',
  },
  {
    id: 'stakeholder_mgmt',
    name: 'Stakeholder Communication',
    category: 'bizdev',
    categoryLabel: 'Account Management',
    color: '#10B981',
    lucideIconName: 'Users',
    description: 'Managing cross-functional expectations between engineering, design, and executive stakeholders',
  },
  {
    id: 'operations_sop',
    name: 'Operational SOP & Team Leadership',
    category: 'bizdev',
    categoryLabel: 'Operations',
    color: '#F59E0B',
    lucideIconName: 'CheckSquare',
    description: 'Implementing standardized operating procedures, workflow governance, and shift execution',
  },

  // ==========================================
  // 3. CREATIVE LEAD & DIGITAL MEDIA
  // ==========================================
  {
    id: 'creative_direction',
    name: 'Creative Direction & Concepting',
    category: 'creative',
    categoryLabel: 'Creative Leadership',
    color: '#EC4899',
    lucideIconName: 'Sparkles',
    description: 'Formulating end-to-end creative concepts, moodboards, and narrative hooks for digital campaigns',
    badge: 'Lead Role',
  },
  {
    id: 'visual_storytelling',
    name: 'Visual Storytelling & Copywriting',
    category: 'creative',
    categoryLabel: 'Content Strategy',
    color: '#F43F5E',
    lucideIconName: 'MessageSquareText',
    description: 'Crafting persuasive short-form copy, viral hooks, and high-converting visual media scripts',
  },
  {
    id: 'figma_uiux',
    name: 'Figma UI/UX Design',
    category: 'creative',
    categoryLabel: 'Design & Prototyping',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    color: '#F24E1E',
    description: 'Interactive wireframing, high-fidelity prototypes, design systems & micro-interactions',
    badge: 'Design System',
  },
  {
    id: 'short_form_media',
    name: 'Short-Form Video Campaigns (Reels/TikTok)',
    category: 'creative',
    categoryLabel: 'Social Growth',
    color: '#D946EF',
    lucideIconName: 'Video',
    description: 'Directing and executing social media campaigns reaching 300K+ organic views (TikTok/Instagram)',
    badge: '300K+ Reach',
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'creative',
    categoryLabel: 'Design & Pitch Decks',
    icon: 'https://cdn.simpleicons.org/canva/00C4CC',
    color: '#00C4CC',
    lucideIconName: 'Palette',
    description: 'High-converting pitch decks, marketing collaterals, social graphics & brand assets',
    badge: 'Pitch Specialist',
  },
  {
    id: 'capcut',
    name: 'CapCut',
    category: 'creative',
    categoryLabel: 'Video Editing & Motion',
    icon: 'https://cdn.simpleicons.org/capcut/00F0FF',
    color: '#00F0FF',
    lucideIconName: 'Video',
    description: 'Fast-paced video editing, dynamic motion typography, sound design & viral short-form pacing',
    badge: 'Viral Video',
  },
  {
    id: 'brand_positioning',
    name: 'Brand Identity & Positioning',
    category: 'creative',
    categoryLabel: 'Branding',
    color: '#A855F7',
    lucideIconName: 'Palette',
    description: 'Building cohesive visual identities, brand voice guidelines, and modern aesthetic consistency',
  },
  {
    id: 'campaign_mgmt',
    name: 'Multi-Channel Campaign Execution',
    category: 'creative',
    categoryLabel: 'Campaign Strategy',
    color: '#06B6D4',
    lucideIconName: 'Megaphone',
    description: 'Coordinating production schedules, talent direction, and post-campaign analytical reviews',
  },
];

// Backward-compatibility export
export const TECH_STACK_ITEMS = ALL_SKILLS_DATA.filter((s) => s.category === 'tech');
