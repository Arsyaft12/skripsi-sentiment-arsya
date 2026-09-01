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
    custom_title: 'SentimenAI — Dashboard Analisis Sentimen',
    custom_description: 'E-commerce sentiment analysis dashboard using NLP and machine learning to classify public reviews with high accuracy and actionable business insights.',
    live_url_override: 'https://frontend-h4q65ncub-arsyaft12-9212s-projects.vercel.app/',
    exclude_from_listing: false,
  },
  {
    id: '2',
    repo_name: 'toraksai',
    is_featured: true,
    display_order: 2,
    custom_title: 'ToraksAI — Sistem Deteksi Penyakit Toraks',
    custom_description: 'Clinical decision support web app for thoracic X-ray analysis with CNN+RNN-based detection and explainable AI visualization.',
    live_url_override: 'https://frontend-sable-one-90kmisglle.vercel.app',
    exclude_from_listing: false,
  },
  {
    id: '3',
    repo_name: 'the-pitch-creative',
    is_featured: true,
    display_order: 3,
    custom_title: 'The Pitch Creative — Digital Brand & Media Showcase',
    custom_description: 'A sleek digital brand website and editorial-style media presence where I contributed to the web build and visual storytelling for a modern creative company.',
    live_url_override: 'https://www.thepitchcreative.media/',
    exclude_from_listing: false,
  }
];

export const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', label: 'Academic Performance', value: '3.80 / 4.00', display_order: 1 },
  { id: '2', label: 'AI Interest', value: 'ML & NLP', display_order: 2 },
  { id: '3', label: 'Business Impact', value: '1,000+ Reviews', display_order: 3 },
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
    role_title: 'Food & Beverage Service Staff / Banquet Crew',
    organization: 'Hotel Santika Premiere ICE BSD',
    location: 'BSD City, Indonesia',
    start_date: '2020-07-01',
    end_date: '2022-02-28',
    highlights: [
      'Delivered hospitality service for corporate events, gala dinners, and international guest engagements.',
      'Managed banquet setup, food service, and guest handling for events with 100–500 attendees.',
      'Built strong communication and adaptability in high-pressure service environments while maintaining service quality.'
    ],
    display_order: 1
  },
  {
    id: '2',
    role_title: 'Crew Member → Operations Leader',
    organization: 'PT. Foresthree Waralaba Indonesia (Janji Jiwa / Tiger Sugar)',
    location: 'Tangerang, Indonesia',
    start_date: '2022-07-01',
    end_date: '2024-04-30',
    highlights: [
      'Promoted from crew member to Operations Leader within four months due to strong performance and leadership potential.',
      'Managed daily outlet operations, inventory control, team scheduling, workflow coordination, and SOP compliance.',
      'Supervised 5–8 crew members per shift and maintained service quality, operational efficiency, and customer satisfaction.'
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
      'Built mobile and web solutions for small business and project-based clients using Flutter, Python, and web technologies.',
      'Developed SentiSight, an NLP-based sentiment analysis system for business review classification with 85% accuracy.',
      'Designed APIs, integrated third-party services, and deployed projects to production platforms such as Vercel.'
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
      'Led business development efforts and client communication for creative and digital projects.',
      'Translating client goals into technical requirements, creative direction, and project execution plans.',
      'Bridged business needs with delivery timelines to ensure smooth collaboration and on-time execution.'
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
    end_date: '2026-08-31',
    score_label: 'GPA 3.80 / 4.00',
    honor_note: 'Consistent Dean\'s List — 8 Semesters',
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
    title: 'Academic Transcript - Informatics Engineering',
    issuer: 'Universitas Cendekia Abditama',
    issue_date: '2024-12-01',
    document_url: '/assets/certificates/KHS ARSYA FATURRAHMAN TI 1-6.pdf',
    category: 'Academic Records',
    display_order: 2,
  },
  {
    id: '3',
    title: 'Techling 2 Advanced Training Certificate',
    issuer: 'Techling Indonesia',
    issue_date: '2024-03-20',
    document_url: '/assets/certificates/SERTIFIKAT TECHLING 2_removed.pdf',
    category: 'Training & Workshops',
    display_order: 3,
  },
  {
    id: '4',
    title: 'Hotel & Hospitality Industrial Internship Certificate',
    issuer: 'Hotel Professional Partner',
    issue_date: '2023-11-10',
    document_url: '/assets/certificates/Sertifikat magang hotel.pdf',
    category: 'Internship & Industry',
    display_order: 4,
  },
  {
    id: '5',
    title: 'PMI First Aid & Organization Skills Certificate',
    issuer: 'Palang Merah Indonesia',
    issue_date: '2023-08-05',
    document_url: '/assets/certificates/Sertifikat_PMI.pdf',
    category: 'Organization & Social',
    display_order: 5,
  },
  {
    id: '6',
    title: 'Rindam Leadership & Discipline Certificate',
    issuer: 'Rindam TNI AD',
    issue_date: '2022-10-12',
    document_url: '/assets/certificates/sertifikat rindam.pdf',
    category: 'Training & Workshops',
    display_order: 6,
  },
  {
    id: '7',
    title: 'Vocational High School Diploma (TKJ)',
    issuer: 'SMK Negeri 7 Kabupaten Tangerang',
    issue_date: '2021-06-01',
    document_url: '/assets/certificates/ijazah smk (1).pdf',
    category: 'Formal Education',
    display_order: 7,
  }
];

export const FALLBACK_SOCIAL_CONTENT: SocialContent[] = [
  {
    id: '1',
    platform: 'instagram',
    category: 'Social Media',
    title: 'The Pitch Creative — Pitch deck storytelling reel',
    embed_url: 'https://www.instagram.com/reel/DW_sIdiERaD/?igsi=MTZtams2bGVteGJ6Zg==',
    thumbnail_url: null,
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
    thumbnail_url: null,
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
