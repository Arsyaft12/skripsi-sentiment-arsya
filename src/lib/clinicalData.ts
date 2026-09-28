export interface PhysiotherapyService {
  id: string;
  num: string;
  title: string;
  category: 'Sports & Performance' | 'Pain & Spine' | 'Specialized & Rehab' | 'Wellness & Corporate';
  description: string;
  badge?: string;
  iconName: string;
  keyPoints?: string[];
}

export interface ClinicalToolItem {
  id: string;
  name: string;
  category: 'assessment' | 'therapy';
  categoryLabel: string;
  description: string;
  badge?: string;
  iconName: string;
}

export interface ClinicalCase {
  id: string;
  caseNumber: string;
  title: string;
  category: string;
  subtitle: string;
  initialCondition: string;
  clinicalAssessment: string[];
  rehabilitationProgram: string[];
  criteriaOrIntervention?: string[];
  metrics: Array<{
    label: string;
    before?: string;
    after: string;
    isHighlight?: boolean;
  }>;
  finalOutcome: string;
  clinicalGoal: string;
}

export interface FaqItem {
  id: string;
  num: string;
  question: string;
  answer: string;
  keyHighlight?: string;
}

// ===============================================
// 12 LAYANAN FISIOTERAPI
// ===============================================
export const PHYSIOTHERAPY_SERVICES: PhysiotherapyService[] = [
  {
    id: 'sports_injury_assessment',
    num: '01',
    title: 'Sports Injury Assessment',
    category: 'Sports & Performance',
    description: 'Asesmen cedera atlet, evaluasi fungsi gerak, identifikasi faktor risiko cedera, serta pemeriksaan untuk menentukan kebutuhan rehabilitasi dan latihan.',
    badge: 'Athletic Screening',
    iconName: 'Activity',
    keyPoints: ['Movement screening', 'Injury risk profiling', 'Functional testing']
  },
  {
    id: 'pain_management',
    num: '02',
    title: 'Pain Management',
    category: 'Pain & Spine',
    description: 'Penanganan nyeri pada kondisi muskuloskeletal, termasuk nyeri pascaoperasi, HNP, low back pain, neck pain, radicular pain, dan berbagai keluhan nyeri lainnya berdasarkan hasil pemeriksaan dan kebutuhan individu.',
    badge: 'Evidence-Based',
    iconName: 'HeartPulse',
    keyPoints: ['Spine & radicular pain', 'Post-operative pain', 'Targeted modulation']
  },
  {
    id: 'dry_needling_physio',
    num: '03',
    title: 'Dry Needling Physiotherapy',
    category: 'Specialized & Rehab',
    description: 'Dry needling berdasarkan hasil pemeriksaan dan indikasi klinis sebagai bagian dari program fisioterapi untuk membantu menangani keluhan nyeri dan gangguan neuromuskuloskeletal.',
    badge: 'Cert.DN. Practitioner',
    iconName: 'Crosshair',
    keyPoints: ['Trigger point release', 'Neuromuscular reset', 'Targeted clinical indication']
  },
  {
    id: 'post_op_rehab',
    num: '04',
    title: 'Post-Operative Rehabilitation',
    category: 'Specialized & Rehab',
    description: 'Rehabilitasi setelah operasi untuk membantu mengontrol nyeri, memulihkan range of motion (ROM), kekuatan, fungsi, mobilitas, dan kemampuan kembali melakukan aktivitas sehari-hari maupun aktivitas olahraga.',
    badge: 'Surgical Recovery',
    iconName: 'ShieldCheck',
    keyPoints: ['Phase-based recovery', 'ROM & strength restoration', 'Functional reintegration']
  },
  {
    id: 'hnp_spine_scoliosis',
    num: '05',
    title: 'HNP, Spine & Scoliosis Rehabilitation',
    category: 'Pain & Spine',
    description: 'Program fisioterapi untuk HNP (Hernia Nucleus Pulposus), low back pain, neck pain, gangguan tulang belakang, dan scoliosis, meliputi asesmen, edukasi, latihan terapeutik, peningkatan mobility dan strength, serta pengelolaan gejala sesuai kondisi dan kebutuhan individu.',
    badge: 'Spine & Posture',
    iconName: 'Layers',
    keyPoints: ['HNP & sciatica management', 'Scoliosis 3D corrective exercise', 'Core & spine stabilization']
  },
  {
    id: 'return_to_sport',
    num: '06',
    title: 'Return to Sport (RTS)',
    category: 'Sports & Performance',
    description: 'Pendampingan rehabilitasi secara bertahap hingga pasien siap kembali berlatih dan berkompetisi, dengan mempertimbangkan kapasitas fisik, tuntutan olahraga, dan kesiapan fungsional.',
    badge: 'SPRC Protocol',
    iconName: 'TrendingUp',
    keyPoints: ['Criterion-based testing', 'Limb Symmetry Index (LSI)', 'Sport-specific readiness']
  },
  {
    id: 'exercise_based_rehab',
    num: '07',
    title: 'Exercise-Based Rehabilitation',
    category: 'Specialized & Rehab',
    description: 'Program latihan terapeutik yang disesuaikan dengan kondisi, tujuan, dan kapasitas individu untuk membantu meningkatkan fungsi, strength, mobility, endurance, dan physical capacity.',
    badge: 'Active Rehab',
    iconName: 'Dumbbell',
    keyPoints: ['Individualized loading', 'Mobility & endurance', 'Capacity building']
  },
  {
    id: 'strength_and_conditioning',
    num: '08',
    title: 'Strength & Conditioning',
    category: 'Sports & Performance',
    description: 'Program peningkatan strength, mobility, conditioning, power, dan physical performance untuk atlet maupun individu aktif.',
    badge: 'High Performance',
    iconName: 'Zap',
    keyPoints: ['Power & RFD development', 'Athletic conditioning', 'Periodized training']
  },
  {
    id: 'injury_prevention',
    num: '09',
    title: 'Injury Prevention',
    category: 'Sports & Performance',
    description: 'Screening, movement assessment, identifikasi faktor risiko, serta program latihan yang dirancang untuk membantu mengurangi risiko cedera dan meningkatkan kesiapan fisik.',
    badge: 'Risk Mitigation',
    iconName: 'Flame',
    keyPoints: ['Biomechanical screening', 'Movement quality', 'Pre-season profiling']
  },
  {
    id: 'corporate_wellness',
    num: '10',
    title: 'Corporate Wellness',
    category: 'Wellness & Corporate',
    description: 'Program kesehatan dan kebugaran bagi perusahaan yang mencakup ergonomi, exercise program, edukasi kesehatan muskuloskeletal, workplace wellness, dan aktivitas pencegahan keluhan akibat pekerjaan.',
    badge: 'Workplace Ergonomics',
    iconName: 'Building2',
    keyPoints: ['Office ergonomics', 'Posture workshops', 'Occupational health']
  },
  {
    id: 'private_physiotherapy',
    num: '11',
    title: 'Private Physiotherapy',
    category: 'Specialized & Rehab',
    description: 'Konsultasi dan program fisioterapi individual berdasarkan hasil pemeriksaan, kondisi klinis, kebutuhan, serta tujuan pasien.',
    badge: '1-on-1 Dedicated',
    iconName: 'Stethoscope',
    keyPoints: ['Comprehensive 1-on-1 session', 'Custom rehab plan', 'Direct clinical supervision']
  },
  {
    id: 'speaker_and_workshop',
    num: '12',
    title: 'Speaker & Workshop',
    category: 'Wellness & Corporate',
    description: 'Narasumber dan fasilitator workshop dalam bidang fisioterapi, sports rehabilitation, pain management, injury prevention, exercise therapy, strength & conditioning, dan return to sport.',
    badge: 'Academic & Professional',
    iconName: 'Sparkles',
    keyPoints: ['Clinical CPD workshops', 'Sports seminar speaker', 'Interactive hands-on masterclass']
  }
];

// ===============================================
// CLINICAL TOOLS & EQUIPMENT (A & B)
// ===============================================
export const ASSESSMENT_TOOLS: ClinicalToolItem[] = [
  {
    id: 'digital_goniometer',
    name: 'Digital Goniometer',
    category: 'assessment',
    categoryLabel: 'Objective ROM Measurement',
    description: 'Pengukuran range of motion (ROM) sendi secara objektif untuk membantu evaluasi kondisi dan perkembangan pasien.',
    badge: 'Precise Kinematics',
    iconName: 'Compass'
  },
  {
    id: 'movement_gait_analysis',
    name: 'Movement & Gait Analysis',
    category: 'assessment',
    categoryLabel: 'Kinematic Screening',
    description: 'Analisis pola gerak dan gait berbasis observasi maupun video untuk mengevaluasi movement pattern dan aspek fungsional.',
    badge: 'Functional Flow',
    iconName: 'Eye'
  },
  {
    id: 'specific_physio_tests',
    name: 'Specific Physiotherapy Tests',
    category: 'assessment',
    categoryLabel: 'Clinical Special Tests',
    description: 'Berbagai pemeriksaan dan special tests fisioterapi yang disesuaikan dengan kondisi klinis, keluhan, dan kebutuhan pasien.',
    badge: 'Differential Diagnosis',
    iconName: 'ClipboardCheck'
  },
  {
    id: 'msk_ultrasound',
    name: 'Musculoskeletal Ultrasound (MSK Ultrasound)',
    category: 'assessment',
    categoryLabel: 'Diagnostic Imaging',
    description: 'Pemeriksaan menggunakan ultrasonografi untuk membantu evaluasi struktur muskuloskeletal tertentu sebagai bagian dari proses asesmen klinis.',
    badge: 'CMSKuS Certified',
    iconName: 'Scan'
  },
  {
    id: 'scoliometer',
    name: 'Scoliometer',
    category: 'assessment',
    categoryLabel: 'Scoliosis Assessment',
    description: 'Alat pengukuran untuk membantu menilai angle of trunk rotation dalam proses skrining dan evaluasi skoliosis.',
    badge: 'Spine Screening',
    iconName: 'Ruler'
  },
  {
    id: 'electronic_medical_record',
    name: 'Electronic Medical Record (e-Medical Record)',
    category: 'assessment',
    categoryLabel: 'Systematic Tracking',
    description: 'Sistem pencatatan digital untuk mendokumentasikan hasil asesmen, diagnosis fisioterapi, intervensi, perkembangan, dan evaluasi pasien secara sistematis.',
    badge: 'Data-Driven',
    iconName: 'FileSpreadsheet'
  }
];

export const THERAPY_TOOLS: ClinicalToolItem[] = [
  {
    id: 'eswt_shockwave',
    name: 'ESWT — Extracorporeal Shock Wave Therapy',
    category: 'therapy',
    categoryLabel: 'Acoustic Shockwave Modality',
    description: 'Modalitas terapi menggunakan gelombang kejut yang dapat digunakan pada kondisi tendinopati dan kronis sesuai indikasi klinis.',
    badge: 'Advanced Modality',
    iconName: 'Zap'
  },
  {
    id: 'tens_electrotherapy',
    name: 'TENS — Electrical Stimulation',
    category: 'therapy',
    categoryLabel: 'Pain Neuromodulation',
    description: 'Modalitas stimulasi listrik transkutan yang dapat digunakan sebagai bagian dari program pengelolaan nyeri akut dan kronis.',
    badge: 'Pain Management',
    iconName: 'Activity'
  },
  {
    id: 'therapeutic_ultrasound',
    name: 'Therapeutic Ultrasound',
    category: 'therapy',
    categoryLabel: 'Deep Thermal & Acoustic',
    description: 'Modalitas ultrasound terapeutik yang digunakan sesuai indikasi dan tujuan intervensi fisioterapi jaringan lunak.',
    badge: 'Tissue Healing',
    iconName: 'Waves'
  },
  {
    id: 'infrared_therapy',
    name: 'Infrared Therapy (IR)',
    category: 'therapy',
    categoryLabel: 'Superficial Heat',
    description: 'Modalitas panas superfisial yang digunakan sesuai kebutuhan dan indikasi klinis untuk relaksasi otot dan sirkulasi lokal.',
    badge: 'Thermal Modality',
    iconName: 'Flame'
  },
  {
    id: 'dry_needling_kit',
    name: 'Dry Needling Kit (Sterile Filiform Needles)',
    category: 'therapy',
    categoryLabel: 'Myofascial Trigger Decompression',
    description: 'Peralatan jarum filiform steril untuk pelaksanaan dry needling berdasarkan hasil pemeriksaan dan indikasi klinis terarah.',
    badge: 'Cert.DN.',
    iconName: 'Crosshair'
  },
  {
    id: 'kinesiology_tape',
    name: 'Kinesiology & Rigid Taping',
    category: 'therapy',
    categoryLabel: 'Biomechanical Strapping',
    description: 'Digunakan sebagai bagian dari pendekatan fisioterapi untuk propriosepsi, dekompresi, dan stabilisasi beban mekanis.',
    badge: 'Joint Support',
    iconName: 'Layers'
  },
  {
    id: 'iastm_tools',
    name: 'IASTM — Instrument-Assisted Soft Tissue Mobilization',
    category: 'therapy',
    categoryLabel: 'Myofascial Blade Release',
    description: 'Teknik mobilisasi jaringan lunak menggunakan instrumen ergonomis medis untuk mengurai restriksi fasial.',
    badge: 'Fascial Therapy',
    iconName: 'Hand'
  },
  {
    id: 'gym_rehab_tools',
    name: 'Gym & Rehabilitation Tools',
    category: 'therapy',
    categoryLabel: 'Progressive Loading Equipment',
    description: 'Berbagai peralatan latihan untuk strength, mobility, balance, coordination, conditioning, dan functional rehabilitation.',
    badge: 'Active Rehab',
    iconName: 'Dumbbell'
  },
  {
    id: 'reformer_pilates',
    name: 'Reformer & MET Pilates',
    category: 'therapy',
    categoryLabel: 'Therapeutic Pilates Approach',
    description: 'Peralatan dan pendekatan Pilates untuk therapeutic exercise, movement retraining, core training, mobility, strength, dan functional rehabilitation.',
    badge: 'Movement Retraining',
    iconName: 'Sparkles'
  },
  {
    id: 'scoliosis_wall_bar',
    name: 'Scoliosis Wall Bar (Stall Bars)',
    category: 'therapy',
    categoryLabel: '3D Postural & Scoliosis Equipment',
    description: 'Peralatan latihan untuk program scoliosis rehabilitation, postural training, spinal elongation mobility, breathing exercise, dan corrective exercise.',
    badge: 'Spine Specialization',
    iconName: 'Grid'
  }
];

// ===============================================
// 3 CLINICAL CASE STUDIES & OBJECTIVE OUTCOMES
// ===============================================
export const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'case-acl-reconstruction',
    caseNumber: 'CASE 01',
    category: 'SPORTS INJURY REHABILITATION',
    title: 'Post-ACL Reconstruction Return to Sport',
    subtitle: 'From Acute Post-Surgical Phase to Full Athletic Competition Readiness',
    initialCondition: 'Pasien pasca ACL Reconstruction dengan keluhan nyeri, knee stiffness, keterbatasan ROM, penurunan kekuatan quadriceps, gangguan neuromuscular control, dan belum mampu kembali melakukan aktivitas olahraga.',
    clinicalAssessment: [
      'Pain & joint effusion status',
      'Knee ROM (Flexion & Extension deficits)',
      'Quadriceps, hamstring & hip strength dynamics',
      'Movement quality & kinematic alignment',
      'Dynamic balance & proprioception',
      'Functional performance, running & landing mechanics'
    ],
    rehabilitationProgram: [
      'Pain & swelling management',
      'ROM restoration (terminal extension priority)',
      'Progressive resistance & hypertrophy training',
      'Neuromuscular control & balance drills',
      'Running progression & deceleration mechanics',
      'Plyometrics, landing mechanics & agility',
      'Sport-specific criterion-based drills'
    ],
    metrics: [
      { label: 'Pain (NPRS)', before: '6/10', after: '0/10', isHighlight: true },
      { label: 'Knee ROM', before: 'Restricted', after: 'Full ROM ✓', isHighlight: true },
      { label: 'Quadriceps LSI', before: '<60%', after: '96% LSI', isHighlight: true },
      { label: 'Hop Test LSI', before: 'Unsafe', after: '94% LSI' },
      { label: 'Joint Effusion', before: 'Grade 2+', after: 'None ✓' },
      { label: 'ACL-RSI Score', before: '35/100', after: '82/100' },
      { label: 'Sport-Specific Test', before: 'Failed', after: 'Passed ✓', isHighlight: true },
      { label: 'Full RTS Timeline', after: '10 Bulan' }
    ],
    finalOutcome: 'NPRS 6/10 → 0/10 | Full ROM ✓ | Quadriceps LSI 96% | Hop Test LSI 94% | Effusion None | ACL-RSI 82/100 | Sport-Specific Test Passed ✓ | Return to Sport: 10 bulan',
    clinicalGoal: 'Mencapai kapasitas fisik dan fungsi yang sesuai dengan tuntutan olahraga sebelum tahapan Return to Training → Full Training → Return to Competition.'
  },
  {
    id: 'case-chronic-neck-pain',
    caseNumber: 'CASE 02',
    category: 'PAIN MANAGEMENT',
    title: 'Chronic Neck Pain pada Pekerja Kantoran',
    subtitle: 'Multimodal Active Rehabilitation & Cervicoscapular Neuromuscular Control',
    initialCondition: 'Pasien dengan chronic neck pain yang berhubungan dengan prolonged sitting, sustained computer-based activity, dan repetitive occupational loading. Keluhan meliputi cervical pain, stiffness, keterbatasan cervical mobility, serta penurunan toleransi terhadap aktivitas kerja.',
    clinicalAssessment: [
      'Pain intensity & irritability — NPRS',
      'Cervical ROM (Flexion, Extension, Rotation, Lateral Flexion)',
      'Cervicoscapular movement control & scapular dyskinesis',
      'Muscle performance (deep neck flexors & scapular stabilizers)',
      'Postural & workstation ergonomic assessment',
      'Functional limitation score — Neck Disability Index (NDI)'
    ],
    rehabilitationProgram: [
      'Patient education & pain neuroscience understanding',
      'Ergonomic workstation modification & postural variation',
      'Cervical joint mobility & spinal decompression exercises',
      'Progressive deep neck flexor & scapular stabilizer strengthening',
      'Cervicoscapular motor-control training',
      'Adjunctive dry needling for myofascial trigger point tension relief'
    ],
    metrics: [
      { label: 'Pain (NPRS)', before: '7/10', after: '2/10', isHighlight: true },
      { label: 'Neck Disability (NDI)', before: '34%', after: '10%', isHighlight: true },
      { label: 'Cervical ROM', before: 'Stiff & Limited', after: 'Markedly Improved ✓' },
      { label: 'Cervicoscapular Control', before: 'Dysfunctional', after: 'Restored ✓' },
      { label: 'Work Tolerance', before: '<2 Hours', after: 'Full Shift Tolerant ✓', isHighlight: true },
      { label: 'Work Reintegration', after: 'Return to Normal Activity ✓' }
    ],
    finalOutcome: 'NPRS: 7/10 → 2/10 | NDI: 34% → 10% | Cervical ROM & Control Improved | Return to normal occupational activity ✓',
    clinicalGoal: 'Mengurangi pain-related disability, meningkatkan cervical mobility dan neuromuscular control, serta mengembalikan functional capacity dan toleransi terhadap tuntutan aktivitas kerja.'
  },
  {
    id: 'case-geriatric-functional-rehab',
    caseNumber: 'CASE 03',
    category: 'GERIATRIC & FUNCTIONAL REHABILITATION',
    title: 'Multidimensional Functional Rehabilitation pada Lansia',
    subtitle: 'Restoring Lower-Extremity Strength, Postural Balance, Gait Performance & ADL Independence',
    initialCondition: 'Pasien geriatri dengan age-related decline in physical performance yang ditandai dengan penurunan lower-extremity muscle strength, postural control, gait capacity, functional mobility, dan kemampuan melakukan activities of daily living (ADL), disertai peningkatan risiko jatuh (fall risk).',
    clinicalAssessment: [
      'Gait assessment — gait speed, gait pattern, dan walking tolerance',
      'Functional mobility — Timed Up and Go (TUG)',
      'Lower-extremity functional strength — 5 Times Sit-to-Stand (5xSTS)',
      'Static & dynamic balance — Berg Balance Scale (BBS)',
      'Lower-limb ROM & muscle performance',
      'Transfer & transitional movement assessment',
      'ADL performance & level of assistance screening'
    ],
    rehabilitationProgram: [
      'Mobility Training & gentle range of motion activation',
      'Progressive Resistance Training (PRT) for lower extremities',
      'Static & dynamic balance and postural perturbation training',
      'Task-specific gait training & stepping drills',
      'Transfer training (sit-to-stand, bed-to-chair, stairs)',
      'Functional task integration & home environmental safety adaptation'
    ],
    metrics: [
      { label: 'Timed Up and Go (TUG)', before: '14.2 sec', after: '10.8 sec', isHighlight: true },
      { label: '5x Sit-to-Stand (5xSTS)', before: '18.6 sec', after: '14.9 sec', isHighlight: true },
      { label: 'Gait Speed', before: '0.72 m/s', after: '0.88 m/s' },
      { label: 'Walking Distance', before: '280 m', after: '360 m' },
      { label: 'Berg Balance (BBS)', before: '43 / 56', after: '50 / 56', isHighlight: true },
      { label: 'Level of Assistance', before: 'Minimal Assist', after: 'Independent ✓', isHighlight: true },
      { label: 'Fall Risk', before: 'High', after: 'Significantly Reduced ✓' }
    ],
    finalOutcome: 'TUG: 14.2s → 10.8s | 5xSTS: 18.6s → 14.9s | Gait Speed: 0.88 m/s | BBS: 50/56 | ADL: Independent ✓ | Fall Risk: Reduced',
    clinicalGoal: 'Restore → Maintain → Optimize Functional Independence.'
  }
];

// ===============================================
// PHILOSOPHY & FREQUENTLY ASKED QUESTIONS
// ===============================================
export const PRACTICE_PHILOSOPHY = {
  headline: 'Active Rehabilitation. Clinical Reasoning. Functional Independence.',
  quote: '“The ultimate goal of physiotherapy is not to create dependence on treatment, but to restore the individual’s capacity, confidence, and self-efficacy to move, function, participate, and manage their health independently.”',
  statement: `Saya memandang fisioterapi sebagai proses klinis yang berorientasi pada pemulihan kapasitas dan pemberdayaan individu, bukan sekadar pemberian intervensi untuk mengurangi gejala.

Praktik fisioterapi harus berangkat dari clinical assessment yang komprehensif, clinical reasoning berbasis bukti, serta pengambilan keputusan yang berpusat pada pasien. Intervensi kemudian diarahkan untuk mengoptimalkan physical capacity, movement quality, functional performance, load tolerance, dan self-management sesuai kebutuhan serta tujuan individual pasien.

Keberhasilan rehabilitasi tidak hanya diukur dari berkurangnya nyeri atau membaiknya impairment, tetapi dari kemampuan seseorang untuk kembali bergerak, berfungsi, berpartisipasi, dan menjalankan aktivitas yang memiliki makna dalam kehidupannya dengan aman, percaya diri, dan mandiri.

Pada akhirnya, fisioterapi bukan tentang seberapa lama pasien membutuhkan treatment, tetapi tentang seberapa jauh pasien mampu membangun kapasitas untuk tidak lagi bergantung pada treatment.`,
  coreValues: 'ASSESS • UNDERSTAND • RESTORE • EMPOWER • PERFORM',
  trajectory: 'From symptom management → to capacity development → to functional independence.',
  frameworkSteps: [
    {
      num: '01',
      title: 'Comprehensive Assessment',
      subtitle: 'Integrated Evaluation of Impairments, Function & Movement',
      desc: 'Evaluasi sistematis terhadap struktur, fungsi, movement patterns, physical capacity, dan functional limitations untuk mengidentifikasi impairments serta faktor yang berkontribusi terhadap kondisi pasien.'
    },
    {
      num: '02',
      title: 'Clinical Reasoning & Clinical Impression',
      subtitle: 'Evidence-Based Analysis of Contributing Factors',
      desc: 'Integrasi temuan pemeriksaan melalui analisis pathoanatomical, biomechanical, neuromuscular, functional, dan biopsychosocial factors untuk membentuk clinical impression dan menentukan prioritas intervensi.'
    },
    {
      num: '03',
      title: 'Patient Education & Self-Management',
      subtitle: 'Understanding, Empowerment & Pain Education',
      desc: 'Memberikan edukasi berbasis evidence mengenai kondisi, mekanisme gejala, pain experience, prognosis, load management, dan self-management untuk meningkatkan pemahaman serta keterlibatan aktif pasien dalam proses rehabilitasi.'
    },
    {
      num: '04',
      title: 'Active & Targeted Intervention',
      subtitle: 'Individualized Therapeutic Exercise & Movement-Based Rehabilitation',
      desc: 'Implementasi intervensi yang individualized, goal-oriented, dan evidence-based, termasuk therapeutic exercise, neuromuscular training, movement retraining, manual therapy, dan modalitas yang sesuai indikasi klinis.'
    },
    {
      num: '05',
      title: 'Progressive Loading & Capacity Development',
      subtitle: 'Systematic Restoration of Physical Capacity',
      desc: 'Peningkatan beban latihan secara bertahap, terukur, dan terindividualisasi untuk mengembangkan tissue capacity, strength, power, endurance, motor control, dan load tolerance sesuai kebutuhan fungsional pasien.'
    },
    {
      num: '06',
      title: 'Functional Reintegration & Return to Performance',
      subtitle: 'Restoration of Function, Participation & Performance',
      desc: 'Integrasi progresif menuju functional independence, occupational demands, recreational activities, dan sport-specific performance, dengan menggunakan objective criteria, functional testing, dan graded exposure untuk mendukung safe return to activity and sport.'
    }
  ]
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    num: '01',
    question: 'Kapan saya perlu ke fisioterapis?',
    answer: 'Anda tidak harus menunggu sampai nyeri menjadi berat. Fisioterapi dapat dilakukan ketika terdapat pain, movement limitation, muscle weakness, balance impairment, sports injury, post-operative limitation, atau penurunan kemampuan melakukan aktivitas sehari-hari. Fisioterapi juga sangat berperan dalam injury prevention, exercise prescription, performance optimization, dan return to sport.\n\nPada kunjungan awal, kondisi akan dievaluasi secara menyeluruh untuk mengidentifikasi contributing factors, functional limitations, serta menentukan strategi penanganan yang paling tepat.',
    keyHighlight: 'Early intervention accelerates tissue healing and prevents compensatory chronic movement dysfunctions.'
  },
  {
    id: 'faq-2',
    num: '02',
    question: 'Apakah Dry Needling sakit?',
    answer: 'Dry Needling menggunakan jarum filiform halus steril yang ditempatkan pada jaringan otot/trigger point target berdasarkan hasil pemeriksaan klinis terarah.\n\nSensasi setiap pasien dapat berbeda: selama prosedur dapat muncul sensasi jarum singkat, tekanan lokal, atau kedutan otot sementara (local twitch response). Setelah treatment, dapat terjadi rasa pegal ringan (mild local soreness) yang umumnya bersifat sementara (24-48 jam).\n\nDry Needling tidak diberikan secara otomatis ke semua pasien, melainkan dipertimbangkan secara ketat berdasarkan indikasi klinis, keamanan, dan tujuan terapi.',
    keyHighlight: 'Targeted invasive neuromuscular reset — applied strictly upon clinical indication.'
  },
  {
    id: 'faq-3',
    num: '03',
    question: 'Berapa kali saya perlu fisioterapi?',
    answer: 'Tidak ada jumlah sesi kaku yang berlaku seragam untuk semua orang. Kebutuhan terapi dipengaruhi oleh jenis dan kompleksitas kondisi, durasi keluhan, keparahan (severity), fase penyembuhan jaringan, kapasitas fisik, dan respons terhadap program latihan.\n\nPerkembangan dievaluasi secara berkala menggunakan parameter klinis objektif (Pain ↓, ROM ↑, Strength ↑, Functional Capacity ↑). Frekuensi sesi akan disesuaikan seiring tercapainya target kemandirian.',
    keyHighlight: '“The goal is not more sessions. The goal is better function.”'
  }
];

export const PRIVATE_PRACTICE_LOCATION = {
  name: 'THE BOX PHYSIO',
  tagline: 'Private Practice & Sports Rehabilitation',
  address: 'Gading Serpong, Tangerang, Indonesia',
  phone: '085716513534',
  appointmentNote: 'By Appointment Only',
  whatsappUrl: 'https://wa.me/6285716513534?text=Halo%20Zaez,%20saya%20tertarik%20untuk%20booking%20jadwal%20fisioterapi%20di%20THE%20BOX%20PHYSIO%20Gading%20Serpong',
};
