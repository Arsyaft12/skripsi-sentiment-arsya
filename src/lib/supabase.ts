import { createClient } from '@supabase/supabase-js';
import { ProjectSetting, SocialContent, Certificate, Skill, Achievement, Experience, Education } from '@/types/portfolio';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize client only if valid URL and key are provided
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ===============================================
// FALLBACK SEED DATA (Used if Supabase unconfigured)
// ===============================================

export const FALLBACK_PROJECT_SETTINGS: ProjectSetting[] = [
  {
    id: '1',
    repo_name: 'saas-analytics-engine',
    is_featured: true,
    display_order: 1,
    custom_title: 'SaaS Analytics & Data Engine',
    custom_description: 'High-performance real-time analytics aggregation and data visualization platform built with Next.js 16 App Router, TypeScript, and modern dashboard architecture.',
    live_url_override: 'https://example.com/demo-analytics',
    category: 'Full-Stack Web App',
    badge: 'Featured Project',
    metrics: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Latency', value: '<50ms' },
      { label: 'Stack', value: 'Next.js 16' },
      { label: 'Database', value: 'PostgreSQL' }
    ],
    exclude_from_listing: false,
  },
  {
    id: '2',
    repo_name: 'ecommerce-ai-platform',
    is_featured: true,
    display_order: 2,
    custom_title: 'SentimenAI — E-Commerce Intelligence',
    custom_description: 'Customer review sentiment analysis system powered by Machine Learning classifiers with real-time insight extraction and actionable business dashboard.',
    live_url_override: 'https://example.com/demo-ai',
    category: 'AI & Machine Learning',
    badge: 'Predictive Model',
    metrics: [
      { label: 'Accuracy', value: '92.4%' },
      { label: 'Data Points', value: '50K+ Reviews' },
      { label: 'Model', value: 'SVM & Naïve Bayes' }
    ],
    exclude_from_listing: false,
  },
  {
    id: '3',
    repo_name: 'mobile-fitness-tracker',
    is_featured: true,
    display_order: 3,
    custom_title: 'FitPulse — Cross-Platform Mobile App',
    custom_description: 'Full-featured mobile fitness tracker with workout logs, personalized routine recommendations, offline-first local SQLite sync, and interactive charts.',
    live_url_override: 'https://example.com/demo-mobile',
    category: 'Mobile Application',
    badge: 'iOS & Android',
    metrics: [
      { label: 'Platform', value: 'Flutter' },
      { label: 'FPS', value: '60 FPS Smooth' },
      { label: 'Storage', value: 'Offline First' }
    ],
    exclude_from_listing: false,
  },
  {
    id: '4',
    repo_name: 'creative-studio-web',
    is_featured: true,
    display_order: 4,
    custom_title: 'Studio Showcase & Editorial Media',
    custom_description: 'A modern design agency website featuring high-conversion visual storytelling, interactive animations, and dark-mode glassmorphic aesthetics.',
    live_url_override: 'https://example.com/demo-creative',
    category: 'Creative Web Platform',
    badge: 'Client Production',
    metrics: [
      { label: 'Performance', value: '100% Score' },
      { label: 'Animation', value: 'Framer Motion' },
      { label: 'Design', value: 'Glassmorphism' }
    ],
    exclude_from_listing: false,
  }
];

export const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', label: 'Production Projects', value: '15+ Shipped', display_order: 1 },
  { id: '2', label: 'Engineering Experience', value: '4+ Years', display_order: 2 },
  { id: '3', label: 'Client Satisfaction', value: '100% Rating', display_order: 3 },
  { id: '4', label: 'Code Quality Score', value: 'A+ Clean Code', display_order: 4 },
];

export const FALLBACK_SKILLS: Skill[] = [
  // Mobile
  { id: '1', category: 'Mobile', name: 'Flutter & Dart', display_order: 1 },
  { id: '2', category: 'Mobile', name: 'React Native', display_order: 2 },
  { id: '3', category: 'Mobile', name: 'Mobile UI/UX Design', display_order: 3 },
  { id: '4', category: 'Mobile', name: 'Offline-First Architecture', display_order: 4 },

  // Languages
  { id: '5', category: 'Languages', name: 'TypeScript', display_order: 1 },
  { id: '6', category: 'Languages', name: 'JavaScript (ES6+)', display_order: 2 },
  { id: '7', category: 'Languages', name: 'Python', display_order: 3 },
  { id: '8', category: 'Languages', name: 'SQL & PostgreSQL', display_order: 4 },
  { id: '9', category: 'Languages', name: 'HTML5 & CSS3', display_order: 5 },

  // Backend & Web
  { id: '10', category: 'Backend', name: 'Next.js 16 (App Router)', display_order: 1 },
  { id: '11', category: 'Backend', name: 'React 19', display_order: 2 },
  { id: '12', category: 'Backend', name: 'Node.js & Express', display_order: 3 },
  { id: '13', category: 'Backend', name: 'Supabase & Firebase', display_order: 4 },
  { id: '14', category: 'Backend', name: 'REST & GraphQL APIs', display_order: 5 },

  // Machine Learning & AI
  { id: '15', category: 'Machine Learning', name: 'OpenAI API & LLM Integrations', display_order: 1 },
  { id: '16', category: 'Machine Learning', name: 'Scikit-learn & Python ML', display_order: 2 },
  { id: '17', category: 'Machine Learning', name: 'Sentiment Analysis & NLP', display_order: 3 },

  // Engineering & Tooling
  { id: '18', category: 'Engineering & Tooling', name: 'Tailwind CSS', display_order: 1 },
  { id: '19', category: 'Engineering & Tooling', name: 'Framer Motion', display_order: 2 },
  { id: '20', category: 'Engineering & Tooling', name: 'Git & GitHub Actions', display_order: 3 },
  { id: '21', category: 'Engineering & Tooling', name: 'Vercel Deployment', display_order: 4 },
  { id: '22', category: 'Engineering & Tooling', name: 'Figma to Code', display_order: 5 },

  // Soft Skills
  { id: '23', category: 'Soft Skills', name: 'Problem Solving & Critical Thinking', display_order: 1 },
  { id: '24', category: 'Soft Skills', name: 'Agile & Scrum Workflow', display_order: 2 },
  { id: '25', category: 'Soft Skills', name: 'Effective Client Communication', display_order: 3 }
];

export const FALLBACK_EXPERIENCE: Experience[] = [
  {
    id: '1',
    role_title: 'Senior Full-Stack Engineer',
    organization: 'Tech Innovations Studio',
    location: 'Remote',
    start_date: '2023-06-01',
    end_date: null,
    highlights: [
      'Architected and delivered scalable web applications and SaaS platforms using Next.js, TypeScript, and Supabase.',
      'Improved Core Web Vitals and SEO performance across client web applications by 40%.',
      'Collaborated closely with product managers and UI designers to ship feature releases on tight deadlines.'
    ],
    display_order: 1
  },
  {
    id: '2',
    role_title: 'Software Developer & Mobile Specialist',
    organization: 'Digital Solutions Co.',
    location: 'Jakarta, Indonesia',
    start_date: '2021-08-01',
    end_date: '2023-05-31',
    highlights: [
      'Built cross-platform mobile applications using Flutter and React Native with native bridge integrations.',
      'Developed RESTful API microservices with Python and Node.js for high-throughput mobile clients.',
      'Implemented automated CI/CD pipelines for staging and production app store deployments.'
    ],
    display_order: 2
  },
  {
    id: '3',
    role_title: 'Junior Web Developer',
    organization: 'Creative Agency Inc.',
    location: 'Jakarta, Indonesia',
    start_date: '2020-01-01',
    end_date: '2021-07-31',
    highlights: [
      'Developed responsive landing pages, e-commerce storefronts, and marketing websites.',
      'Integrated payment gateways and third-party APIs for client commercial portals.',
      'Ensured cross-browser compatibility and optimized responsive design for mobile devices.'
    ],
    display_order: 3
  }
];

export const FALLBACK_EDUCATION: Education[] = [
  {
    id: '1',
    program: 'Bachelor of Computer Science (Informatics)',
    institution: 'State University of Technology',
    major_or_focus: 'Software Engineering & Artificial Intelligence',
    start_date: '2018-09-01',
    end_date: '2022-07-31',
    score_label: 'GPA 3.90 / 4.00',
    honor_note: 'Graduated with Highest Distinction / Dean\'s List',
    display_order: 1
  }
];

export const FALLBACK_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    title: 'Professional Software Engineer Certification',
    issuer: 'National Professional Certification Board',
    issue_date: '2024-06-15',
    document_url: '#',
    thumbnail_url: null,
    category: 'Professional Certifications',
    display_order: 1,
  },
  {
    id: '2',
    title: 'Advanced React & Next.js Enterprise Architecture',
    issuer: 'Tech Academy Global',
    issue_date: '2023-11-20',
    document_url: '#',
    thumbnail_url: null,
    category: 'Technical Certifications',
    display_order: 2,
  },
  {
    id: '3',
    title: 'Cloud Solutions & Database Architecture Specialist',
    issuer: 'Cloud Standards Institute',
    issue_date: '2023-04-10',
    document_url: '#',
    thumbnail_url: null,
    category: 'Cloud & Infrastructure',
    display_order: 3,
  }
];

export const FALLBACK_SOCIAL_CONTENT: SocialContent[] = [
  {
    id: '1',
    platform: 'instagram',
    category: 'Social Media',
    title: 'The Pitch Creative — Pitch deck storytelling reel',
    embed_url: 'https://www.instagram.com/reel/DW_sIdiERaD/?igsi=MTZtams2bGVteGJ6Zg==',
    thumbnail_url: '/assets/photos/reel_thepitch_storytelling.png',
    metric_label: '92K',
    summary: 'Menyusun narasi visual yang lebih profesional untuk menonjembatani value proposition brand dengan audiens yang lebih luas.',
    stats: [
      { label: 'Views', value: '92K' },
      { label: 'Likes', value: '7.1K' },
      { label: 'Reach', value: '24K' },
    ],
    display_order: 1,
  },
  {
    id: '2',
    platform: 'instagram',
    category: 'Social Media',
    title: 'The Pitch Creative — agency social proof campaign',
    embed_url: 'https://www.instagram.com/reel/DT_4OBykXBl/?igsi=MTkwbHc4ZjdkZWcwbA==',
    thumbnail_url: '/assets/photos/reel_thepitch_socialproof.png',
    metric_label: '68K',
    summary: 'Meningkatkan daya tarik brand agency lewat format konten yang lebih dinamis, ringkas, dan mudah dibagikan.',
    stats: [
      { label: 'Views', value: '68K' },
      { label: 'Likes', value: '5.9K' },
      { label: 'Reach', value: '19K' },
    ],
    display_order: 2,
  },
  {
    id: '3',
    platform: 'instagram',
    category: 'F&B',
    title: 'Foresthree — F&B campaign content',
    embed_url: 'https://www.instagram.com/reel/C_aVHAjyLbi/?igsi=MTl1eW1mbG83d2cwNQ==',
    thumbnail_url: null,
    metric_label: '150K',
    summary: 'Merancang konten promosi yang menonjembatani mood brand, produk, dan pengalaman pelanggan secara lebih dekat dan terasa relevan.',
    stats: [
      { label: 'Views', value: '150K' },
      { label: 'Likes', value: '12.8K' },
      { label: 'Reach', value: '43K' },
    ],
    display_order: 3,
  },
  {
    id: '4',
    platform: 'instagram',
    category: 'F&B',
    title: 'Foresthree — campaign reel for brand visibility',
    embed_url: 'https://www.instagram.com/reel/C_KeOJmy_7P/?igsi=azBwOGs4M2w1ZTFl',
    thumbnail_url: null,
    metric_label: '120K',
    summary: 'Menyusun visual brand campaign yang lebih menarik secara emosional sekaligus mampu mendorong keterlibatan audiens ke aktivitas nyata.',
    stats: [
      { label: 'Views', value: '120K' },
      { label: 'Likes', value: '9.4K' },
      { label: 'Reach', value: '35K' },
    ],
    display_order: 4,
  },
  {
    id: '5',
    platform: 'instagram',
    category: 'Health & Lab',
    title: 'Prodia — Health & Lab campaign content',
    embed_url: 'https://www.instagram.com/reel/DX6Vqy0uPqO/?igsi=cTJjOWd6cmVxNzcy',
    thumbnail_url: null,
    metric_label: '82K',
    summary: 'Membawa pesan layanan kesehatan ke format yang lebih mudah dipahami, lebih santai, dan lebih kuat untuk meningkatkan trust audiens.',
    stats: [
      { label: 'Views', value: '82K' },
      { label: 'Likes', value: '6.7K' },
      { label: 'Reach', value: '21K' },
    ],
    display_order: 5,
  },
  {
    id: '6',
    platform: 'tiktok',
    category: 'Social Media',
    title: 'Social media brand content — short-form storytelling',
    embed_url: 'https://www.tiktok.com/@media_entertaiment_gen_z/video/7605801869318917383?is_from_webapp=1&sender_device=pc',
    thumbnail_url: null,
    metric_label: '320K',
    summary: 'Mengembangkan format konten pendek yang lebih cocok untuk algoritma TikTok, dengan fokus pada storytelling yang cepat, relevan, dan mudah dibagikan.',
    stats: [
      { label: 'Views', value: '320K' },
      { label: 'Likes', value: '26K' },
      { label: 'Reach', value: '87K' },
    ],
    display_order: 6,
  },
  {
    id: '7',
    platform: 'tiktok',
    category: 'F&B',
    title: 'Oseng Endog — F&B creator-led campaign',
    embed_url: 'https://www.tiktok.com/@media_entertaiment_gen_z/video/7610441815199730964?is_from_webapp=1&sender_device=pc',
    thumbnail_url: null,
    metric_label: '240K',
    summary: 'Mengangkat pendekatan creator-led content agar produk lebih terasa dekat dengan audiens sekaligus memperkuat recall brand.',
    stats: [
      { label: 'Views', value: '240K' },
      { label: 'Likes', value: '19K' },
      { label: 'Reach', value: '63K' },
    ],
    display_order: 7,
  },
  {
    id: '8',
    platform: 'tiktok',
    category: 'Health & Lab',
    title: 'Sozo Clinic — health brand storytelling reel',
    embed_url: 'https://vt.tiktok.com/ZSVw6jHVn/',
    thumbnail_url: null,
    metric_label: '210K',
    summary: 'Menyusun konten yang menjelaskan value layanan kesehatan dengan cara yang lebih manusiawi, ringan, dan lebih mudah diterima audiens.',
    stats: [
      { label: 'Views', value: '210K' },
      { label: 'Likes', value: '17K' },
      { label: 'Reach', value: '54K' },
    ],
    display_order: 8,
  }
];

// ===============================================
// DATA FETCHING HELPERS WITH SAFE FALLBACKS
// ===============================================

export async function fetchProjectSettings(): Promise<ProjectSetting[]> {
  if (!supabase) return FALLBACK_PROJECT_SETTINGS;
  try {
    const { data, error } = await supabase
      .from('project_settings')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error || !data || data.length === 0) return FALLBACK_PROJECT_SETTINGS;
    return data as ProjectSetting[];
  } catch {
    return FALLBACK_PROJECT_SETTINGS;
  }
}

export async function fetchAchievements(): Promise<Achievement[]> {
  if (!supabase) return FALLBACK_ACHIEVEMENTS;
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error || !data || data.length === 0) return FALLBACK_ACHIEVEMENTS;
    return data as Achievement[];
  } catch {
    return FALLBACK_ACHIEVEMENTS;
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  if (!supabase) return FALLBACK_SKILLS;
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error || !data || data.length === 0) return FALLBACK_SKILLS;
    return data as Skill[];
  } catch {
    return FALLBACK_SKILLS;
  }
}

export async function fetchExperience(): Promise<Experience[]> {
  return FALLBACK_EXPERIENCE;
}

export async function fetchEducation(): Promise<Education[]> {
  return FALLBACK_EDUCATION;
}

export async function fetchCertificates(): Promise<Certificate[]> {
  // Force using fallback data to bypass Supabase for now
  return FALLBACK_CERTIFICATES;
}

export async function fetchSocialContent(): Promise<SocialContent[]> {
  let list: SocialContent[] = FALLBACK_SOCIAL_CONTENT;
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('social_content')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        list = data as SocialContent[];
      }
    } catch {
      list = FALLBACK_SOCIAL_CONTENT;
    }
  }

  // Attempt auto OG image scraping for items missing a manual thumbnail_url
  const enrichedList = await Promise.all(
    list.map(async (item) => {
      if (item.thumbnail_url) return item;
      try {
        const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(item.embed_url)}&meta=true`, {
          next: { revalidate: 86400 } // Cache OG scraping for 24h
        });
        if (res.ok) {
          const json = await res.json();
          const ogImage = json?.data?.image?.url;
          if (ogImage) {
            return { ...item, thumbnail_url: ogImage };
          }
        }
      } catch {
        // Fallback to null
      }
      return item;
    })
  );

  return enrichedList;
}
