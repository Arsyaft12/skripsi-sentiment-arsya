export type SkillCategoryType = 'all' | 'clinical' | 'modalities' | 'assessment';

export interface SkillItem {
  id: string;
  name: string;
  category: 'clinical' | 'modalities' | 'assessment';
  categoryLabel: string;
  icon?: string;
  lucideIconName?: string;
  color: string;
  description: string;
  badge?: string;
}

export const SKILL_CATEGORIES: { id: SkillCategoryType; label: string }[] = [
  { id: 'all', label: 'All Clinical Disciplines' },
  { id: 'clinical', label: 'Clinical & Sports Rehab' },
  { id: 'modalities', label: 'Therapeutic Modalities' },
  { id: 'assessment', label: 'Assessment & Science' },
];

export const ALL_SKILLS_DATA: SkillItem[] = [
  // ==========================================
  // 1. CLINICAL & SPORTS REHABILITATION
  // ==========================================
  {
    id: 'musculoskeletal_physio',
    name: 'Musculoskeletal Physiotherapy',
    category: 'clinical',
    categoryLabel: 'Orthopedic Core',
    color: '#0284C7',
    lucideIconName: 'Activity',
    description: 'Comprehensive evaluation & rehabilitation for spine, peripheral joint, and soft tissue pathologies.',
    badge: 'Core Practice',
  },
  {
    id: 'sports_injury_rehab',
    name: 'Sports Injury Rehabilitation',
    category: 'clinical',
    categoryLabel: 'Sports Science',
    color: '#2563EB',
    lucideIconName: 'Zap',
    description: 'End-to-end management of acute & chronic sports trauma from acute phase to full match fitness.',
    badge: 'SPRC Specialist',
  },
  {
    id: 'return_to_sport',
    name: 'Return to Sport & Activity (RTS)',
    category: 'clinical',
    categoryLabel: 'Functional Readiness',
    color: '#059669',
    lucideIconName: 'TrendingUp',
    description: 'Objective criteria-based testing and progressive functional loading protocols for safe return to competition.',
    badge: 'Protocol-Based',
  },
  {
    id: 'movement_optimization',
    name: 'Movement & Functional Optimization',
    category: 'clinical',
    categoryLabel: 'Biomechanics',
    color: '#7C3AED',
    lucideIconName: 'Flame',
    description: 'Kinematic movement pattern correction, neuromuscular control, and injury risk mitigation.',
    badge: 'Biomechanics',
  },
  {
    id: 'performance_rehab',
    name: 'Performance Rehabilitation',
    category: 'clinical',
    categoryLabel: 'Athletic Conditioning',
    color: '#DC2626',
    lucideIconName: 'Trophy',
    description: 'Bridging the gap between clinical discharge and peak athletic performance through periodized loading.',
    badge: 'High Performance',
  },
  {
    id: 'post_op_rehab',
    name: 'Post-Operative Rehabilitation',
    category: 'clinical',
    categoryLabel: 'Surgical Recovery',
    color: '#0891B2',
    lucideIconName: 'ShieldCheck',
    description: 'Phased recovery following ACL reconstruction, meniscal repair, arthroscopy, and spine surgeries.',
    badge: 'Surgical Recovery',
  },

  // ==========================================
  // 2. THERAPEUTIC MODALITIES & INTERVENTIONS
  // ==========================================
  {
    id: 'dry_needling',
    name: 'Certified Dry Needling (Cert.DN.)',
    category: 'modalities',
    categoryLabel: 'Invasive Modality',
    color: '#E11D48',
    lucideIconName: 'Crosshair',
    description: 'Intramuscular trigger point dry needling for rapid myofascial pain relief and neuromuscular reset.',
    badge: 'Cert.DN.',
  },
  {
    id: 'manual_therapy',
    name: 'Manual Therapy, Joint Mobilization & HVLA',
    category: 'modalities',
    categoryLabel: 'Hands-On Clinical',
    color: '#D97706',
    lucideIconName: 'Hand',
    description: 'HVLA thrust manipulation (Spine, Shoulder, SIJ) alongside Maitland, Cyriax, Kaltenborn & Mulligan mobilization.',
    badge: 'HVLA & Mobilization',
  },
  {
    id: 'aquatic_therapy',
    name: 'Aquatic Rehabilitation (Hydrotherapy)',
    category: 'modalities',
    categoryLabel: 'Hydrotherapy',
    color: '#06B6D4',
    lucideIconName: 'Waves',
    description: 'Water-based buoyant and resistive exercise therapy for early weight-bearing and pain modulation.',
  },
  {
    id: 'exercise_prescription',
    name: 'Therapeutic Exercise Prescription',
    category: 'modalities',
    categoryLabel: 'Active Rehab',
    color: '#16A34A',
    lucideIconName: 'Dumbbell',
    description: 'Targeted strength, hypertrophy, rate of force development (RFD), and endurance exercise design.',
    badge: 'Evidence-Based',
  },
  {
    id: 'trigger_point',
    name: 'Myofascial Trigger Point Therapy',
    category: 'modalities',
    categoryLabel: 'Tissue Release',
    color: '#9333EA',
    lucideIconName: 'Sparkles',
    description: 'Targeted ischemic compression and neuromuscular facilitation for chronic muscular dysfunction.',
  },
  {
    id: 'kinesio_taping',
    name: 'Rigid Taping & Biomechanical Strapping',
    category: 'modalities',
    categoryLabel: 'Support & Load',
    color: '#EA580C',
    lucideIconName: 'Layers',
    description: 'Functional taping, kinesiology taping, and joint stabilization for acute loading management.',
  },

  // ==========================================
  // 3. CLINICAL ASSESSMENT & SCIENCE
  // ==========================================
  {
    id: 'ebp_practice',
    name: 'Evidence-Based Practice (EBP)',
    category: 'assessment',
    categoryLabel: 'Clinical Methodology',
    color: '#4F46E5',
    lucideIconName: 'FileCheck2',
    description: 'Integrating the highest quality empirical scientific research with clinical expertise and patient values.',
    badge: 'Clinical Standard',
  },
  {
    id: 'clinical_reasoning',
    name: 'Clinical Reasoning & Differential Diagnosis',
    category: 'assessment',
    categoryLabel: 'Diagnostic Core',
    color: '#0284C7',
    lucideIconName: 'Stethoscope',
    description: 'Structured hypothesis testing, red flag screening, and musculoskeletal differential diagnosis.',
    badge: 'Diagnostic Core',
  },
  {
    id: 'biomechanical_gait',
    name: 'Biomechanical & Gait Analysis',
    category: 'assessment',
    categoryLabel: 'Kinematic Analysis',
    color: '#6366F1',
    lucideIconName: 'Eye',
    description: 'Static & dynamic movement pattern analysis, force-vector evaluation, and gait abnormality detection.',
  },
  {
    id: 'research_publication',
    name: 'Clinical Health Research (ORCID Indexed)',
    category: 'assessment',
    categoryLabel: 'Academic Science',
    color: '#059669',
    lucideIconName: 'GraduationCap',
    description: 'Peer-reviewed scientific inquiry, statistical data analysis, and academic publication standards.',
    badge: 'ORCID Researcher',
  },
  {
    id: 'load_monitoring',
    name: 'Objective Load & Readiness Monitoring',
    category: 'assessment',
    categoryLabel: 'Data-Driven Rehab',
    color: '#3B82F6',
    lucideIconName: 'BarChart2',
    description: 'Tracking acute-to-chronic workload ratios (ACWR), RPE scales, and objective functional milestones.',
  },
  {
    id: 'patient_education',
    name: 'Patient Education & Pain Neuroscience (PNE)',
    category: 'assessment',
    categoryLabel: 'Patient-Centered',
    color: '#10B981',
    lucideIconName: 'MessageSquareText',
    description: 'Empowering patients through pain neuroscience education, self-management strategies, and compliance.',
    badge: 'Patient-Centered',
  },
];

// Backward-compatibility export
export const TECH_STACK_ITEMS = ALL_SKILLS_DATA.filter((s) => s.category === 'clinical');
