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
    end_date: '2022-01-19',
    score_label: 'IPK 3.82 / 4.00',
    honor_note: 'Graduated Cumlaude / Dengan Pujian',
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
    id: 'cert-str-kemenkes',
    title: 'Surat Tanda Registrasi (STR) Fisioterapis — Kemenkes RI / KTKI',
    issuer: 'Konsil Tenaga Kesehatan Indonesia (KTKI) - Kemenkes RI (No. Reg: TD00001081657778)',
    issue_date: '2024-02-20',
    document_url: '/assets/certificates/str-fisioterapi-kemenkes-ktki.pdf',
    thumbnail_url: '/assets/certificates/thumbnails/str-fisioterapi-kemenkes-ktki.jpg',
    category: 'Official License & Legal',
    display_order: 1,
  },
  {
    id: 'cert-hvla-techniques',
    title: 'Workshop High Velocity Low Amplitude (HVLA) Techniques (14.5 SKP)',
    issuer: 'Fakultas Fisioterapi Univ. Esa Unggul, RS Soeharto Heerdjan & Kesit Ivanali Education',
    issue_date: '2025-02-16',
    document_url: '/assets/certificates/sertifikat-hvla-techniques-esa-unggul.pdf',
    thumbnail_url: '/assets/certificates/thumbnails/sertifikat-hvla-techniques-esa-unggul.jpg',
    category: 'Manual Therapy & Joint Mobilization',
    display_order: 2,
  },
  {
    id: 'cert-upper-quadrant',
    title: 'Workshop Mobilisasi & Manipulasi Sendi Part I Upper Quadrant',
    issuer: 'PT Aktif Rehab Indonesia & Pengurus Pusat IFI (SKP: 1172/KEP-SKP/PP/IFI/I/2024)',
    issue_date: '2023-10-01',
    document_url: '/assets/certificates/sertifikat-workshop-mobilisasi-manipulasi-sendi.pdf',
    thumbnail_url: '/assets/certificates/thumbnails/sertifikat-workshop-mobilisasi-manipulasi-sendi.jpg',
    category: 'Manual Therapy & Joint Mobilization',
    display_order: 3,
  },
  {
    id: '1',
    title: 'SPRC. — Sport Physiotherapy Rehab. Certificate Program',
    issuer: 'Primephysio Training UK & Reframing Physiotherapy Indonesia (Senior Tutor: Hayat Mostafa)',
    issue_date: '2026-08-25',
    document_url: '/assets/certificates/certificate-sprc-sport-physiotherapy.svg',
    thumbnail_url: '/assets/certificates/thumbnails/certificate-sprc-sport-physiotherapy.svg',
    category: 'Sports & Performance Rehab',
    display_order: 4,
  },
  {
    id: '2',
    title: 'SPRC Official Designation & Notification Letter',
    issuer: 'Primephysio Training UK Ltd (Program Coordinator: Firmansyah Purwanto)',
    issue_date: '2026-08-25',
    document_url: '/assets/certificates/letter-sprc-designation.svg',
    thumbnail_url: '/assets/certificates/thumbnails/letter-sprc-designation.svg',
    category: 'Sports & Performance Rehab',
    display_order: 5,
  },
  {
    id: '3',
    title: 'CMSKuS — Certificate in Musculoskeletal Ultrasound',
    issuer: 'Academy of Physiotherapy-BD & Monroe Medical-UK (Assoc. Prof. S.M. Mustofa Kamal)',
    issue_date: '2026-06-21',
    document_url: '/assets/certificates/certificate-cmskus-ultrasound.svg',
    thumbnail_url: '/assets/certificates/thumbnails/certificate-cmskus-ultrasound.svg',
    category: 'Clinical Certifications',
    display_order: 6,
  },
  {
    id: '4',
    title: 'Interventional Pain Management (Intra-Articular Infiltration & Soft Tissue Injection)',
    issuer: 'Monroe Medical-UK & Academy of Physiotherapy-BD (CPD Member London UK)',
    issue_date: '2026-06-22',
    document_url: '/assets/certificates/certificate-interventional-pain-management.svg',
    thumbnail_url: '/assets/certificates/thumbnails/certificate-interventional-pain-management.svg',
    category: 'Clinical Certifications',
    display_order: 7,
  },
  {
    id: '5',
    title: 'Hydrotherapy for Rehabilitation based on Neurosensory System (C.HydroT)',
    issuer: 'AASM (Association Aquatic of Sport Medicine) & Neurosensory Institute USA',
    issue_date: '2024-09-08',
    document_url: '/assets/certificates/certificate-hydrotherapy-aasm.svg',
    thumbnail_url: '/assets/certificates/thumbnails/certificate-hydrotherapy-aasm.svg',
    category: 'Aquatic & Neuromuscular',
    display_order: 8,
  },
  {
    id: 'cert-transkrip-unisa',
    title: 'Transkrip Nilai Akademik Profesi Fisioterapi (Cumlaude IPK 3.82)',
    issuer: 'Universitas \'Aisyiyah Yogyakarta (No: 0024.03-SERPROF/PP-IFI/L-VII/I/2022)',
    issue_date: '2022-01-19',
    document_url: '/assets/certificates/transkrip-profesi-fisioterapi-unisa.pdf',
    thumbnail_url: '/assets/certificates/thumbnails/transkrip-profesi-fisioterapi-unisa.jpg',
    category: 'Academic Degrees',
    display_order: 9,
  },
  {
    id: '6',
    title: 'M.Ft. — Magister Fisioterapi (Master of Physiotherapy, IPK 4.00)',
    issuer: 'Universitas Esa Unggul (Predikat: Cum Laude / IPK 4.00)',
    issue_date: '2026-08-31',
    document_url: '/assets/certificates/ijazah-mft-esa-unggul.svg',
    thumbnail_url: '/assets/certificates/thumbnails/ijazah-mft-esa-unggul.svg',
    category: 'Academic Degrees',
    display_order: 10,
  },
  {
    id: '7',
    title: 'Ftr. — Pendidikan Profesi Fisioterapis (Cumlaude IPK 3.82)',
    issuer: 'Universitas \'Aisyiyah Yogyakarta (No: 0024.03-SERPROF/PP-IFI/L-VII/I/2022)',
    issue_date: '2022-01-19',
    document_url: '/assets/certificates/ijazah-profesi-ftr-unisa.svg',
    thumbnail_url: '/assets/certificates/thumbnails/ijazah-profesi-ftr-unisa.svg',
    category: 'Academic Degrees',
    display_order: 11,
  },
  {
    id: '8',
    title: 'S.Ftr. — Sarjana Fisioterapi (Bachelor of Physiotherapy)',
    issuer: 'Universitas \'Aisyiyah Yogyakarta (IPK 3.73 / 4.00)',
    issue_date: '2020-08-31',
    document_url: '/assets/certificates/ijazah-s1-sftr-unisa.svg',
    thumbnail_url: '/assets/certificates/thumbnails/ijazah-s1-sftr-unisa.svg',
    category: 'Academic Degrees',
    display_order: 12,
  }
];

export const FALLBACK_SOCIAL_CONTENT: SocialContent[] = [
  {
    id: '1',
    platform: 'instagram',
    category: 'Clinical Education',
    title: 'Clinical Practice & Evidence-Based Movement Rehabilitation',
    embed_url: 'https://www.instagram.com/p/DdRVjf_GBzu/?stkn=MXExeGJlcmpmbHBmcQ==',
    thumbnail_url: '/assets/photos/instagram-reel-ddrvjf.svg',
    metric_label: 'Instagram Reel',
    summary: 'Dokumentasi intervensi klinis aktif, analisis biomekanik gerak, dan edukasi rehabilitasi muskuloskeletal berbasis bukti ilmiah.',
    stats: [
      { label: 'Platform', value: 'Instagram Reel' },
      { label: 'Pendekatan', value: 'Evidence-Based' },
      { label: 'Kategori', value: 'Clinical Case' },
    ],
    display_order: 1,
  },
  {
    id: '2',
    platform: 'instagram',
    category: 'Health & Lab',
    title: 'Alina Bramanto (F45 Athlete) — Shoulder Recovery & Hybrid Race Prep',
    embed_url: 'https://www.instagram.com/zam_fisio',
    thumbnail_url: '/assets/photos/testimonial-f45-shoulder.jpg',
    metric_label: 'Penyelamat Shoulder',
    summary: '“Penyelamat shoulder @zam_fisio” — Targeted pre-competition musculoskeletal therapy and shoulder functional restoration 24 hours before hybrid race at F45 Gading Serpong.',
    stats: [
      { label: 'Atlet', value: 'Alina B.' },
      { label: 'Ajang', value: 'F45 Hybrid Race' },
      { label: 'Intervensi', value: 'Shoulder Recovery' },
    ],
    display_order: 2,
  },
  {
    id: '3',
    platform: 'instagram',
    category: 'Health & Lab',
    title: 'Kasus Klinis: Skrining Gerak Fungsional & Optimasi Biomekanik',
    embed_url: 'https://www.instagram.com/zam_fisio',
    thumbnail_url: '/assets/photos/clinical-case-kinematics.svg',
    metric_label: 'Kasus Klinis',
    summary: 'Asesmen kinematik berbasis bukti ilmiah dan progresi latihan terapeutik individual untuk atlet performa tinggi.',
    stats: [
      { label: 'Domain', value: 'Rehabilitasi Olahraga' },
      { label: 'Metode', value: 'Kinematik & FMS' },
      { label: 'Lokasi', value: 'Gading Serpong' },
    ],
    display_order: 3,
  },
  {
    id: '4',
    platform: 'instagram',
    category: 'Health & Lab',
    title: 'Dry Needling (Cert.DN.) & Dekompresi Myofascial Trigger Point',
    embed_url: 'https://www.instagram.com/zam_fisio',
    thumbnail_url: '/assets/photos/clinical-dry-needling.svg',
    metric_label: 'Cert.DN.',
    summary: 'Teknik dry needling neuromuskular terarah untuk meredakan ketegangan trigger point miofasial dan mengembalikan lingkup gerak optimal.',
    stats: [
      { label: 'Modalitas', value: 'Dry Needling' },
      { label: 'Sasaran', value: 'Trigger Points' },
      { label: 'Hasil', value: 'Meredakan Nyeri Cepat' },
    ],
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
