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
    repo_name: 'skripsi-sentiment-arsya',
    is_featured: true,
    display_order: 1,
    custom_title: 'SentiSight — Sentiment Analysis System',
    custom_description: 'End-to-end NLP sentiment analysis system (85% Accuracy) built with Python, Flask, and Scikit-learn. Processes 1,000+ real business reviews with Naive Bayes & SVM classifiers.',
    live_url_override: null,
    exclude_from_listing: false,
  },
  {
    id: '2',
    repo_name: 'Arsya-portfolio',
    is_featured: true,
    display_order: 2,
    custom_title: 'Original Developer Portfolio (v1)',
    custom_description: 'Original HTML/CSS/JS interactive portfolio showcasing projects, certifications, and technical experience. Foundation for the current Next.js portfolio.',
    live_url_override: null,
    exclude_from_listing: false,
  },
  {
    id: '3',
    repo_name: 'portofolio-arsya',
    is_featured: true,
    display_order: 3,
    custom_title: 'Portfolio v2 — Next.js + Supabase',
    custom_description: 'High-impact developer portfolio built with Next.js, Supabase backend, Framer Motion animations, and GitHub REST API integration for live project data.',
    live_url_override: null,
    exclude_from_listing: false,
  }
];

export const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', label: 'Cumulative GPA (7x Dean\'s List)', value: '3.80 / 4.00', display_order: 1 },
  { id: '2', label: 'NLP Model Accuracy (SentiSight)', value: '85%', display_order: 2 },
  { id: '3', label: 'Real Business Reviews Processed', value: '1,000+', display_order: 3 },
  { id: '4', label: 'Cross-Industry Experience', value: '5+ Years', display_order: 4 },
];

export const FALLBACK_SKILLS: Skill[] = [
  // Mobile
  { id: '1', category: 'Mobile', name: 'Flutter', display_order: 1 },
  { id: '2', category: 'Mobile', name: 'Dart (learning)', display_order: 2 },
  { id: '3', category: 'Mobile', name: 'React Native (exposure)', display_order: 3 },
  { id: '4', category: 'Mobile', name: 'Mobile UI/UX Principles', display_order: 4 },

  // Languages
  { id: '5', category: 'Languages', name: 'Python', display_order: 1 },
  { id: '6', category: 'Languages', name: 'JavaScript', display_order: 2 },
  { id: '7', category: 'Languages', name: 'C++', display_order: 3 },
  { id: '8', category: 'Languages', name: 'C#', display_order: 4 },
  { id: '9', category: 'Languages', name: 'HTML', display_order: 5 },
  { id: '10', category: 'Languages', name: 'SQL', display_order: 6 },

  // Backend
  { id: '11', category: 'Backend', name: 'Flask (REST API)', display_order: 1 },
  { id: '12', category: 'Backend', name: 'Web Service', display_order: 2 },
  { id: '13', category: 'Backend', name: 'REST API Integration', display_order: 3 },
  { id: '14', category: 'Backend', name: 'Streamlit', display_order: 4 },

  // ML/NLP
  { id: '15', category: 'ML/NLP', name: 'NLTK', display_order: 1 },
  { id: '16', category: 'ML/NLP', name: 'spaCy', display_order: 2 },
  { id: '17', category: 'ML/NLP', name: 'Scikit-learn', display_order: 3 },
  { id: '18', category: 'ML/NLP', name: 'VADER', display_order: 4 },
  { id: '19', category: 'ML/NLP', name: 'TextBlob', display_order: 5 },
  { id: '20', category: 'ML/NLP', name: 'Naïve Bayes', display_order: 6 },
  { id: '21', category: 'ML/NLP', name: 'SVM', display_order: 7 },

  // Data
  { id: '22', category: 'Data', name: 'Data Mining', display_order: 1 },
  { id: '23', category: 'Data', name: 'Sentiment Analysis', display_order: 2 },
  { id: '24', category: 'Data', name: 'Web Scraping', display_order: 3 },
  { id: '25', category: 'Data', name: 'Pandas', display_order: 4 },

  // Engineering & Tooling
  { id: '26', category: 'Engineering & Tooling', name: 'Git (basic)', display_order: 1 },
  { id: '27', category: 'Engineering & Tooling', name: 'Linux (basic)', display_order: 2 },
  { id: '28', category: 'Engineering & Tooling', name: 'Black Box & White Box Testing', display_order: 3 },
  { id: '29', category: 'Engineering & Tooling', name: 'UAT', display_order: 4 },
  { id: '30', category: 'Engineering & Tooling', name: 'Dashboard Design', display_order: 5 },

  // Soft Skills
  { id: '31', category: 'Soft Skills', name: 'Analytical Thinking', display_order: 1 },
  { id: '32', category: 'Soft Skills', name: 'Fast Learner', display_order: 2 },
  { id: '33', category: 'Soft Skills', name: 'Problem Solving', display_order: 3 },
  { id: '34', category: 'Soft Skills', name: 'Oral & Written Communication', display_order: 4 }
];

export const FALLBACK_EXPERIENCE: Experience[] = [
  {
    id: '1',
    role_title: 'FnB Daily Worker (Banquet, Waiter & Bartender)',
    organization: 'Hotel Santika Premiere ICE BSD',
    location: 'BSD City, Indonesia',
    start_date: '2020-07-01',
    end_date: '2022-02-28',
    highlights: [
      'Delivered VIP hospitality service for international events, corporate conferences, and gala dinners.',
      'Handled banquet setup, food & beverage service, and bartending for 100–500 pax events.',
      'Developed crisis management, fast adaptability, and executive communication under high-pressure service environments.'
    ],
    display_order: 1
  },
  {
    id: '2',
    role_title: 'Crew Member → Operations Leader (Promoted in 4 Months)',
    organization: 'PT. Foresthree Waralaba Indonesia (Janji Jiwa / Tiger Sugar)',
    location: 'Tangerang, Indonesia',
    start_date: '2022-07-01',
    end_date: '2024-04-30',
    highlights: [
      'Promoted from crew to Operations Leader within 4 months due to exceptional performance and leadership.',
      'Managed daily store operations, inventory auditing, team scheduling, SOP enforcement, and workflow optimization.',
      'Supervised and coached 5–8 crew members per shift, maintaining consistent product quality and customer satisfaction.'
    ],
    display_order: 2
  },
  {
    id: '3',
    role_title: 'Freelance Mobile & Web Developer',
    organization: 'Self-Employed / Freelance',
    location: 'Remote, Indonesia',
    start_date: '2023-01-01',
    end_date: null,
    highlights: [
      'Developed full-stack mobile and web solutions for small business clients using Flutter and Python (Flask).',
      'Built and deployed the SentiSight NLP sentiment analysis system as a thesis project with 85% accuracy.',
      'Designed REST APIs, integrated third-party services, and deployed projects on Vercel and Heroku.'
    ],
    display_order: 3
  },
  {
    id: '4',
    role_title: 'Business Development & Creative Lead',
    organization: 'The Pitch Creative Agency',
    location: 'BSD City, Indonesia',
    start_date: '2025-11-01',
    end_date: null,
    highlights: [
      'Converted 3–5 new accounts through technical pitch proposals and end-to-end client demonstrations.',
      'Led technical requirement discussions, creative brief production, and ensured 100% on-time project delivery.',
      'Bridged client expectations with technical execution — managing both business relationships and project timelines.'
    ],
    display_order: 4
  }
];

export const FALLBACK_EDUCATION: Education[] = [
  {
    id: '1',
    program: 'S1 Informatics Engineering (Teknik Informatika)',
    institution: 'Universitas Cendekia Abditama',
    major_or_focus: null,
    start_date: '2022-01-01',
    end_date: null, // Expected 2026
    score_label: 'GPA 3.80 / 4.00',
    honor_note: 'Consistent Dean\'s List — 7 Semesters',
    display_order: 1
  },
  {
    id: '2',
    program: 'Vocational High School (SMK)',
    institution: 'SMK Negeri 7 Kab. Tangerang',
    major_or_focus: 'Hospitality Management',
    start_date: '2019-01-01',
    end_date: '2022-01-01',
    score_label: 'Average Score 83.54',
    honor_note: 'Graduated with Distinction',
    display_order: 2
  }
];

export const FALLBACK_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    title: 'BNSP Professional Certification - Software Engineering',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
    issue_date: '2024-06-15',
    document_url: '/assets/certificates/Sertifikat BNSP.pdf',
    category: 'Professional Certifications',
    display_order: 1,
  },
  {
    id: '2',
    title: 'Techling 2 Advanced Training Certificate',
    issuer: 'Techling Indonesia',
    issue_date: '2024-03-20',
    document_url: '/assets/certificates/SERTIFIKAT TECHLING 2_removed.pdf',
    category: 'Training & Workshops',
    display_order: 2,
  },
  {
    id: '3',
    title: 'Hotel & Hospitality Industrial Internship Certificate',
    issuer: 'Hotel Professional Partner',
    issue_date: '2023-11-10',
    document_url: '/assets/certificates/Sertifikat magang hotel.pdf',
    category: 'Internship & Industry',
    display_order: 3,
  },
  {
    id: '4',
    title: 'PMI First Aid & Organization Skills Certificate',
    issuer: 'Palang Merah Indonesia',
    issue_date: '2023-08-05',
    document_url: '/assets/certificates/Sertifikat_PMI.pdf',
    category: 'Organization & Social',
    display_order: 4,
  },
  {
    id: '5',
    title: 'Rindam Leadership & Discipline Certificate',
    issuer: 'Rindam TNI AD',
    issue_date: '2022-10-12',
    document_url: '/assets/certificates/sertifikat rindam.pdf',
    category: 'Training & Workshops',
    display_order: 5,
  },
  {
    id: '6',
    title: 'Vocational High School Diploma (TKJ)',
    issuer: 'Ministry of Education & Culture',
    issue_date: '2021-06-01',
    document_url: '/assets/certificates/ijazah smk (1).pdf',
    category: 'Formal Education',
    display_order: 6,
  }
];

export const FALLBACK_SOCIAL_CONTENT: SocialContent[] = [
  {
    id: '1',
    platform: 'tiktok',
    title: 'Behind The Scenes: Membangun Mobile Sentiment Analysis App (@kejususuww)',
    embed_url: 'https://www.tiktok.com/@kejususuww',
    thumbnail_url: null,
    metric_label: '270.2K Views',
    display_order: 1,
  },
  {
    id: '2',
    platform: 'tiktok',
    title: 'Career & Storytelling Content: Di Tabrak Jodoh (@kejususuww)',
    embed_url: 'https://www.tiktok.com/@kejususuww',
    thumbnail_url: null,
    metric_label: '115.1K Views',
    display_order: 2,
  },
  {
    id: '3',
    platform: 'instagram',
    title: 'Mobile Developer Roadmap 2024 for Tech Fresh Graduates (@arsyaft)',
    embed_url: 'https://www.instagram.com/arsyaft/',
    thumbnail_url: null,
    metric_label: '90K+ Impressions',
    display_order: 3,
  },
  {
    id: '4',
    platform: 'instagram',
    title: 'Foresthree Brand Campaign: Face of National Campaign (@arsyaft)',
    embed_url: 'https://www.instagram.com/reel/C_KeOJmy_7P/',
    thumbnail_url: null,
    metric_label: 'Featured Campaign',
    display_order: 4,
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
  if (!supabase) return FALLBACK_EXPERIENCE;
  try {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error || !data || data.length === 0) return FALLBACK_EXPERIENCE;
    return data as Experience[];
  } catch {
    return FALLBACK_EXPERIENCE;
  }
}

export async function fetchEducation(): Promise<Education[]> {
  if (!supabase) return FALLBACK_EDUCATION;
  try {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error || !data || data.length === 0) return FALLBACK_EDUCATION;
    return data as Education[];
  } catch {
    return FALLBACK_EDUCATION;
  }
}

export async function fetchCertificates(): Promise<Certificate[]> {
  if (!supabase) return FALLBACK_CERTIFICATES;
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error || !data || data.length === 0) return FALLBACK_CERTIFICATES;
    return data as Certificate[];
  } catch {
    return FALLBACK_CERTIFICATES;
  }
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
