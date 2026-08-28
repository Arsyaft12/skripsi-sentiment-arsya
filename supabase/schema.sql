-- ==========================================
-- SUPABASE SCHEMA & MIGRATION FOR PORTFOLIO
-- Developer: Arsya Faturrahman (Arsyaft12)
-- Role: Mobile Developer | IT Undergraduate
-- Target OS / Database: Postgres (Supabase)
-- ==========================================

-- 1. Create project_settings table (GitHub API Curation Layer)
CREATE TABLE IF NOT EXISTS public.project_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repo_name TEXT NOT NULL UNIQUE,
    is_featured BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    custom_title TEXT,
    custom_description TEXT,
    live_url_override TEXT,
    cached_thumbnail_url TEXT,
    last_health_check_status TEXT DEFAULT 'unknown',
    last_health_check_at TIMESTAMPTZ,
    exclude_from_listing BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create social_content table (Digital Presence / Social Proof)
CREATE TABLE IF NOT EXISTS public.social_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform TEXT NOT NULL,
    title TEXT NOT NULL,
    embed_url TEXT NOT NULL,
    thumbnail_url TEXT,
    metric_label TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create certificates table (Credentials & Certifications)
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date DATE NOT NULL,
    document_url TEXT NOT NULL,
    category TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create skills table (Categorized Skills Grid)
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Create achievements table (Key Metrics / Stats)
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Create experience table (Work & Leadership Timeline)
CREATE TABLE IF NOT EXISTS public.experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_title TEXT NOT NULL,
    organization TEXT NOT NULL,
    location TEXT,
    start_date DATE NOT NULL,
    end_date DATE, -- NULL if current role ("Present")
    highlights TEXT[] DEFAULT '{}',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Create education table (Academic History)
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program TEXT NOT NULL,
    institution TEXT NOT NULL,
    major_or_focus TEXT,
    start_date DATE NOT NULL,
    end_date DATE, -- NULL if expected future graduation
    score_label TEXT,
    honor_note TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Public SELECT enabled, write restricted
-- ==========================================

ALTER TABLE public.project_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public Read Access project_settings" ON public.project_settings;
DROP POLICY IF EXISTS "Public Read Access social_content" ON public.social_content;
DROP POLICY IF EXISTS "Public Read Access certificates" ON public.certificates;
DROP POLICY IF EXISTS "Public Read Access skills" ON public.skills;
DROP POLICY IF EXISTS "Public Read Access achievements" ON public.achievements;
DROP POLICY IF EXISTS "Public Read Access experience" ON public.experience;
DROP POLICY IF EXISTS "Public Read Access education" ON public.education;

CREATE POLICY "Public Read Access project_settings" ON public.project_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Access social_content" ON public.social_content FOR SELECT USING (true);
CREATE POLICY "Public Read Access certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Access skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Access achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public Read Access experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public Read Access education" ON public.education FOR SELECT USING (true);

-- ==========================================
-- INITIAL SEED DATA FOR ARSYA FATURRAHMAN
-- ==========================================

-- Seed project_settings
INSERT INTO public.project_settings (repo_name, is_featured, display_order, custom_title, custom_description, live_url_override, exclude_from_listing)
VALUES 
    ('skripsi-sentiment-arsya', true, 1, 'SentiSight — Sentiment Analysis System', 'End-to-end NLP sentiment analysis system (85% Accuracy) processing 1,000+ real business reviews.', 'https://sentiment-arsya.vercel.app', false),
    ('toraksai', true, 2, 'ToraksAI — Chest X-Ray Diagnostics', 'Deep Learning Convolutional Neural Network (CNN) built to classify 14 thoracic diseases from chest X-rays with explainable Grad-CAM heatmaps.', 'https://toraksai.vercel.app', false),
    ('portfolio-arsya', false, 99, 'Interactive Developer Portfolio', 'Source code for this portfolio website.', 'https://portfolio-arsya.vercel.app', true)
ON CONFLICT (repo_name) DO UPDATE SET 
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order,
    exclude_from_listing = EXCLUDED.exclude_from_listing;

-- Seed achievements
INSERT INTO public.achievements (label, value, display_order)
VALUES
    ('Cumulative GPA (7x Dean''s List)', '3.80 / 4.00', 1),
    ('NLP Model Accuracy (SentiSight)', '85%', 2),
    ('Real Business Reviews Processed', '1,000+', 3),
    ('Cross-Industry Experience', '5+ Years', 4)
ON CONFLICT DO NOTHING;

-- Seed skills
INSERT INTO public.skills (category, name, display_order)
VALUES
    -- Mobile
    ('Mobile', 'Flutter', 1),
    ('Mobile', 'Dart (learning)', 2),
    ('Mobile', 'React Native (exposure)', 3),
    ('Mobile', 'Mobile UI/UX Principles', 4),

    -- Languages
    ('Languages', 'Python', 1),
    ('Languages', 'JavaScript', 2),
    ('Languages', 'C++', 3),
    ('Languages', 'C#', 4),
    ('Languages', 'HTML', 5),
    ('Languages', 'SQL', 6),

    -- Backend
    ('Backend', 'Flask (REST API)', 1),
    ('Backend', 'Web Service', 2),
    ('Backend', 'REST API Integration', 3),
    ('Backend', 'Streamlit', 4),

    -- ML/NLP
    ('ML/NLP', 'NLTK', 1),
    ('ML/NLP', 'spaCy', 2),
    ('ML/NLP', 'Scikit-learn', 3),
    ('ML/NLP', 'VADER', 4),
    ('ML/NLP', 'TextBlob', 5),
    ('ML/NLP', 'Naïve Bayes', 6),
    ('ML/NLP', 'SVM', 7),

    -- Data
    ('Data', 'Data Mining', 1),
    ('Data', 'Sentiment Analysis', 2),
    ('Data', 'Web Scraping', 3),
    ('Data', 'Pandas', 4),

    -- Engineering & Tooling
    ('Engineering & Tooling', 'Git (basic)', 1),
    ('Engineering & Tooling', 'Linux (basic)', 2),
    ('Engineering & Tooling', 'Black Box & White Box Testing', 3),
    ('Engineering & Tooling', 'UAT', 4),
    ('Engineering & Tooling', 'Dashboard Design', 5),

    -- Soft Skills
    ('Soft Skills', 'Analytical Thinking', 1),
    ('Soft Skills', 'Fast Learner', 2),
    ('Soft Skills', 'Problem Solving', 3),
    ('Soft Skills', 'Oral & Written Communication', 4)
ON CONFLICT DO NOTHING;

-- Seed experience timeline (Forward Chronological Order: Oldest at Top, Present at Bottom)
INSERT INTO public.experience (role_title, organization, location, start_date, end_date, highlights, display_order)
VALUES
    (
        'Banquet, Waiter & Bartender (Industrial Training)',
        'Hotel Santika Premiere ICE BSD',
        'BSD City, Indonesia',
        '2020-07-01',
        '2022-02-28',
        ARRAY[
            'Delivered VIP hospitality service for international events and corporate conferences.',
            'Developed crisis management, fast adaptability, and executive communication under high pressure.'
        ],
        1
    ),
    (
        'Operations Leader (Promoted from Crew in 4 Months)',
        'PT. Foresthree Waralaba Indonesia',
        'Tangerang, Indonesia',
        '2022-07-01',
        '2025-04-30',
        ARRAY[
            'Promoted to Operations Leader within 4 months due to exceptional leadership and performance.',
            'Managed daily operations, inventory auditing, team scheduling, and workflow optimization.'
        ],
        2
    ),
    (
        'Business Development & Creative Lead',
        'The Pitch Creative Agency',
        'BSD City, Indonesia',
        '2025-11-01',
        NULL, -- Present
        ARRAY[
            'Converted 3–5 new accounts through technical pitch proposals and end-to-end client demonstrations.',
            'Led technical requirement discussions and ensured 100% on-time project delivery.'
        ],
        3
    )
ON CONFLICT DO NOTHING;

-- Seed education
INSERT INTO public.education (program, institution, major_or_focus, start_date, end_date, score_label, honor_note, display_order)
VALUES
    (
        'S1 Informatics Engineering (Teknik Informatika)',
        'Universitas Cendekia Abditama',
        NULL,
        '2022-01-01',
        NULL, -- Expected 2026
        'GPA 3.80 / 4.00',
        'Consistent Dean''s List — 7 Semesters',
        1
    ),
    (
        'Vocational High School (SMK)',
        'SMK Negeri 7 Kab. Tangerang',
        'Hospitality Management',
        '2019-01-01',
        '2022-01-01',
        'Average Score 83.54',
        'Graduated with Distinction',
        2
    )
ON CONFLICT DO NOTHING;

-- Seed certificates
INSERT INTO public.certificates (title, issuer, issue_date, document_url, category, display_order)
VALUES
    ('BNSP Professional Certification - Software Engineering', 'Badan Nasional Sertifikasi Profesi (BNSP)', '2024-06-15', '/assets/certificates/Sertifikat BNSP.pdf', 'Professional Certifications', 1),
    ('Techling 2 Advanced Training Certificate', 'Techling Indonesia', '2024-03-20', '/assets/certificates/SERTIFIKAT TECHLING 2_removed.pdf', 'Training & Workshops', 2),
    ('Hotel & Hospitality Industrial Internship Certificate', 'Hotel Professional Partner', '2023-11-10', '/assets/certificates/Sertifikat magang hotel.pdf', 'Internship & Industry', 3),
    ('PMI First Aid & Organization Skills Certificate', 'Palang Merah Indonesia', '2023-08-05', '/assets/certificates/Sertifikat_PMI.pdf', 'Organization & Social', 4),
    ('Rindam Leadership & Discipline Certificate', 'Rindam TNI AD', '2022-10-12', '/assets/certificates/sertifikat rindam.pdf', 'Training & Workshops', 5),
    ('Vocational High School Diploma (TKJ)', 'Ministry of Education & Culture', '2021-06-01', '/assets/certificates/ijazah smk (1).pdf', 'Formal Education', 6)
ON CONFLICT DO NOTHING;

-- Seed social_content
INSERT INTO public.social_content (platform, title, embed_url, thumbnail_url, metric_label, display_order)
VALUES
    ('tiktok', 'Behind The Scenes: Membangun Mobile Sentiment Analysis App (@kejususuww)', 'https://www.tiktok.com/@kejususuww', '/assets/photos/Photo Profile.png', '270.2K Views', 1),
    ('tiktok', 'Career & Storytelling Content: Di Tabrak Jodoh (@kejususuww)', 'https://www.tiktok.com/@kejususuww', '/assets/photos/Photo Profile 2.png', '115.1K Views', 2),
    ('instagram', 'Mobile Developer Roadmap 2024 for Tech Fresh Graduates (@arsyaft)', 'https://www.instagram.com/arsyaft/', '/assets/photos/Photo Profile 2.png', '90K+ Impressions', 3),
    ('instagram', 'Foresthree Brand Campaign: Face of National Campaign (@arsyaft)', 'https://www.instagram.com/reel/C_KeOJmy_7P/', '/assets/photos/Photo Profile.png', 'Featured Campaign', 4)
ON CONFLICT DO NOTHING;
