export interface ProjectSetting {
  id?: string;
  repo_name: string;
  is_featured: boolean;
  display_order: number;
  custom_title?: string | null;
  custom_description?: string | null;
  live_url_override?: string | null;
  cached_thumbnail_url?: string | null;
  last_health_check_status?: 'live' | 'dead' | 'unknown' | string | null;
  last_health_check_at?: string | null;
  exclude_from_listing?: boolean;
  created_at?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
}

export interface ProjectCardData {
  id: string;
  repo_name: string;
  title: string;
  description: string;
  github_url: string;
  live_url: string | null;
  cached_thumbnail_url?: string | null;
  is_live: boolean;
  tech_stack: string[];
  language: string | null;
  stars: number;
  pushed_at: string;
  is_featured: boolean;
  display_order: number;
}

export interface SocialContent {
  id: string;
  platform: 'tiktok' | 'instagram' | 'youtube' | string;
  category: 'F&B' | 'Health & Lab' | 'Social Media';
  title: string;
  embed_url: string;
  thumbnail_url?: string | null;
  metric_label: string;
  achievement?: string;
  summary?: string;
  stats?: Array<{
    label: string;
    value: string;
  }>;
  display_order: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  document_url: string;
  category: string;
  display_order: number;
}

export interface Skill {
  id: string;
  category: 'Mobile' | 'Languages' | 'Backend' | 'ML/NLP' | 'Data' | 'Engineering & Tooling' | 'Soft Skills' | string;
  name: string;
  display_order: number;
}

export interface Achievement {
  id: string;
  label: string;
  value: string;
  display_order: number;
}

export interface Experience {
  id: string;
  role_title: string;
  organization: string;
  location?: string | null;
  start_date: string;
  end_date?: string | null; // null if current role ("Present")
  highlights: string[];
  display_order: number;
}

export interface Education {
  id: string;
  program: string;
  institution: string;
  major_or_focus?: string | null;
  start_date: string;
  end_date?: string | null; // null if future expected graduation
  score_label?: string | null;
  honor_note?: string | null;
  display_order: number;
}
