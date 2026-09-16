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
    repo_name: 'musculoskeletal-rehab',
    is_featured: true,
    display_order: 1,
    custom_title: 'Musculoskeletal Rehabilitation & Pain Management',
    custom_description: 'Comprehensive evidence-based clinical protocols for spinal, shoulder, and knee musculoskeletal conditions with targeted functional restoration and pain alleviation.',
    live_url_override: 'https://orcid.org/0009-0003-4571-3338',
    category: 'Clinical Physiotherapy',
    badge: 'Core Clinical Focus',
    metrics: [
      { label: 'Approach', value: 'Evidence-Based' },
      { label: 'Focus', value: 'Pain & Function' },
      { label: 'Method', value: 'Manual + Exercise' },
      { label: 'Setting', value: 'Hospital / Clinic' }
    ],
    exclude_from_listing: false,
  },
  {
    id: '2',
    repo_name: 'sports-injury-rts',
    is_featured: true,
    display_order: 2,
    custom_title: 'Sports Injury Rehabilitation & Return to Sport (RTS)',
    custom_description: 'Structured progressive loading and functional movement analysis designed to safely transition athletes from acute injury recovery back into peak athletic performance.',
    live_url_override: 'https://orcid.org/0009-0003-4571-3338',
    category: 'Sports & Performance',
    badge: 'Performance Protocol',
    metrics: [
      { label: 'Phase', value: 'Acute to RTS' },
      { label: 'Monitoring', value: 'Progressive Load' },
      { label: 'Outcome', value: 'Safe RTS' }
    ],
    exclude_from_listing: false,
  },
  {
    id: '3',
    repo_name: 'dry-needling-therapy',
    is_featured: true,
    display_order: 3,
    custom_title: 'Dry Needling (Cert.DN.) & Myofascial Trigger Point Therapy',
    custom_description: 'Targeted invasive neuromuscular modality for myofascial pain syndromes, muscle tone normalization, and rapid neuromusculoskeletal decompression.',
    live_url_override: 'https://orcid.org/0009-0003-4571-3338',
    category: 'Specialized Modality',
    badge: 'Certified Practice',
    metrics: [
      { label: 'Certification', value: 'Cert.DN.' },
      { label: 'Target', value: 'Trigger Points' },
      { label: 'Effect', value: 'Rapid Relief' }
    ],
    exclude_from_listing: false,
  },
  {
    id: '4',
    repo_name: 'movement-optimization',
    is_featured: true,
    display_order: 4,
    custom_title: 'Movement & Functional Assessment Protocol',
    custom_description: 'Biomechanical screening, gait & movement pattern optimization, and individualized therapeutic exercise prescription for sustainable physical capacity.',
    live_url_override: 'https://orcid.org/0009-0003-4571-3338',
    category: 'Functional Assessment',
    badge: 'Movement Screening',
    metrics: [
      { label: 'Screening', value: 'Biomechanical' },
      { label: 'Analysis', value: 'Kinematic Flow' },
      { label: 'Goal', value: 'Peak Function' }
    ],
    exclude_from_listing: false,
  }
];

export const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', label: 'Master Degree GPA', value: 'IPK 4.00 / 4.00', display_order: 1 },
  { id: '2', label: 'Clinical Experience', value: 'Hospital & Sports', display_order: 2 },
  { id: '3', label: 'Professional Certifications', value: 'Cert.DN. & SPRC.', display_order: 3 },
  { id: '4', label: 'Research Record', value: 'ORCID Indexed', display_order: 4 },
];

export const FALLBACK_SKILLS: Skill[] = [
  // Clinical Specializations
  { id: '1', category: 'Clinical Specializations', name: 'Musculoskeletal Physiotherapy', display_order: 1 },
  { id: '2', category: 'Clinical Specializations', name: 'Sports Injury Rehabilitation', display_order: 2 },
  { id: '3', category: 'Clinical Specializations', name: 'Return to Sport Strategy (RTS)', display_order: 3 },
  { id: '4', category: 'Clinical Specializations', name: 'Performance Rehabilitation', display_order: 4 },

  // Clinical Modalities
  { id: '5', category: 'Clinical Modalities', name: 'Certified Dry Needling (Cert.DN.)', display_order: 1 },
  { id: '6', category: 'Clinical Modalities', name: 'Manual Therapy & Joint Mobilization', display_order: 2 },
  { id: '7', category: 'Clinical Modalities', name: 'Aquatic Rehabilitation', display_order: 3 },
  { id: '8', category: 'Clinical Modalities', name: 'Therapeutic Exercise Prescription', display_order: 4 },
  { id: '9', category: 'Clinical Modalities', name: 'Pain Management Protocols', display_order: 5 },

  // Assessment & Science
  { id: '10', category: 'Assessment & Science', name: 'Movement & Functional Assessment', display_order: 1 },
  { id: '11', category: 'Assessment & Science', name: 'Clinical Reasoning & Decision Making', display_order: 2 },
  { id: '12', category: 'Assessment & Science', name: 'Objective Monitoring & Progressive Loading', display_order: 3 },
  { id: '13', category: 'Assessment & Science', name: 'Evidence-Based Practice (EBP)', display_order: 4 },
  { id: '14', category: 'Assessment & Science', name: 'Clinical Health Research', display_order: 5 },

  // Professional Focus
  { id: '15', category: 'Professional Focus', name: 'Patient-Centered Physiotherapy', display_order: 1 },
  { id: '16', category: 'Professional Focus', name: 'Functional Capacity Restoration', display_order: 2 },
  { id: '17', category: 'Professional Focus', name: 'Interprofessional Collaboration', display_order: 3 }
];

export const FALLBACK_EXPERIENCE: Experience[] = [
  {
    id: '1',
    role_title: 'Physiotherapist | Clinical Physiotherapy Services',
    organization: 'RS Mitra Keluarga Gading Serpong',
    location: 'Gading Serpong, Tangerang',
    start_date: '2022-01-01',
    end_date: '2024-12-31',
    highlights: [
      'Delivered clinical physiotherapy services with primary focus on pain management and functional improvement.',
      'Applied scientific knowledge and clinical technical skills to support restoration and optimization of patient movement capacity.',
      'Provided patient-centered physiotherapy care tailored to individual clinical conditions and rehabilitation goals.',
      'Contributed to interdisciplinary patient recovery through structured, clinically-oriented therapeutic protocols.'
    ],
    display_order: 1
  }
];

export const FALLBACK_EDUCATION: Education[] = [
  {
    id: '1',
    program: 'S2 Fisioterapi (Master of Physiotherapy)',
    institution: 'Universitas Esa Unggul',
    major_or_focus: 'Sports & Performance Rehabilitation Focus',
    start_date: '2024-01-01',
    end_date: '2026-08-31',
    score_label: 'IPK 4.00 / 4.00',
    honor_note: 'Perfect Academic Standing (GPA 4.00)',
    display_order: 1
  },
  {
    id: '2',
    program: 'Pendidikan Profesi Fisioterapi (Ftr.)',
    institution: 'Universitas \'Aisyiyah Yogyakarta',
    major_or_focus: 'Clinical Physiotherapy Professional Practice',
    start_date: '2020-01-01',
    end_date: '2022-08-31',
    score_label: 'IPK 3.82 / 4.00',
    honor_note: 'Graduated with Distinction',
    display_order: 2
  },
  {
    id: '3',
    program: 'S1 Fisioterapi (S.Ftr.)',
    institution: 'Universitas \'Aisyiyah Yogyakarta',
    major_or_focus: 'Physiotherapy Science & Clinical Foundations',
    start_date: '2016-01-01',
    end_date: '2020-08-31',
    score_label: 'IPK 3.73 / 4.00',
    honor_note: 'Bachelor Degree Honours',
    display_order: 3
  }
];

export const FALLBACK_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    title: 'M.Ft. — Magister Fisioterapi',
    issuer: 'Universitas Esa Unggul',
    issue_date: '2026-08-31',
    document_url: '#',
    thumbnail_url: null,
    category: 'Academic Degrees',
    display_order: 1,
  },
  {
    id: '2',
    title: 'Ftr. — Pendidikan Profesi Fisioterapi',
    issuer: 'Universitas \'Aisyiyah Yogyakarta',
    issue_date: '2022-08-31',
    document_url: '#',
    thumbnail_url: null,
    category: 'Professional Degrees',
    display_order: 2,
  },
  {
    id: '3',
    title: 'Cert.DN. — Certified Dry Needling Practitioner',
    issuer: 'Clinical Needling & Myofascial Institute',
    issue_date: '2023-05-15',
    document_url: '#',
    thumbnail_url: null,
    category: 'Clinical Certifications',
    display_order: 3,
  },
  {
    id: '4',
    title: 'SPRC. — Sports & Performance Rehabilitation Certified',
    issuer: 'Sports Physical Therapy & Performance Board',
    issue_date: '2023-10-20',
    document_url: '#',
    thumbnail_url: null,
    category: 'Specialized Credentials',
    display_order: 4,
  },
  {
    id: '5',
    title: 'S.Ftr. — Sarjana Fisioterapi',
    issuer: 'Universitas \'Aisyiyah Yogyakarta',
    issue_date: '2020-08-31',
    document_url: '#',
    thumbnail_url: null,
    category: 'Academic Degrees',
    display_order: 5,
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
