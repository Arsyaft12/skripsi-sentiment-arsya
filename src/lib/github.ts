import { GitHubRepo, ProjectCardData, ProjectSetting } from '@/types/portfolio';
import { fetchProjectSettings } from '@/lib/supabase';
import { validateLiveUrl } from '@/lib/healthCheck';

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Arsyaft12';
const SELF_REPO_NAME = 'portfolio-arsya'; // Self-exclusion guard for current portfolio repository

// Fallback GitHub repos data if GitHub API is unreachable or rate limited
const FALLBACK_GITHUB_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: 'skripsi-sentiment-arsya',
    full_name: `${GITHUB_USERNAME}/skripsi-sentiment-arsya`,
    description: 'SentiSight — NLP Sentiment Analysis System with 85% Accuracy for Public Business Reviews.',
    html_url: `https://github.com/${GITHUB_USERNAME}/skripsi-sentiment-arsya`,
    homepage: 'https://sentiment-arsya.vercel.app',
    language: 'Python',
    topics: ['nlp', 'machine-learning', 'sentiment-analysis', 'flask', 'pandas'],
    stargazers_count: 14,
    forks_count: 3,
    pushed_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 102,
    name: 'Arsya-portfolio',
    full_name: `${GITHUB_USERNAME}/Arsya-portfolio`,
    description: 'Original interactive developer portfolio showcasing projects, certifications and technical experience.',
    html_url: `https://github.com/${GITHUB_USERNAME}/Arsya-portfolio`,
    homepage: null,
    language: 'HTML',
    topics: ['portfolio', 'html', 'css', 'javascript', 'responsive-design'],
    stargazers_count: 5,
    forks_count: 1,
    pushed_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 103,
    name: 'portofolio-arsya',
    full_name: `${GITHUB_USERNAME}/portofolio-arsya`,
    description: 'Developer Portfolio built with Next.js, Supabase, and Framer Motion.',
    html_url: `https://github.com/${GITHUB_USERNAME}/portofolio-arsya`,
    homepage: null,
    language: 'TypeScript',
    topics: ['nextjs', 'framer-motion', 'supabase', 'typescript'],
    stargazers_count: 8,
    forks_count: 1,
    pushed_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  }
];

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Arsya-Portfolio-App'
      }
    });

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}. Falling back to cached local repo data.`);
      return FALLBACK_GITHUB_REPOS;
    }

    const repos: GitHubRepo[] = await res.json();
    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return FALLBACK_GITHUB_REPOS;
  }
}

export async function getCuratedProjects(): Promise<ProjectCardData[]> {
  const [projectSettings, rawRepos] = await Promise.all([
    fetchProjectSettings(),
    getGitHubRepos()
  ]);

  // Filter only featured settings & apply repo self-exclusion guard
  const featuredSettings = projectSettings.filter(s => {
    if (!s.is_featured) return false;
    if (s.exclude_from_listing) return false;
    if (s.repo_name.toLowerCase() === SELF_REPO_NAME.toLowerCase()) return false;
    return true;
  });

  const curatedProjects: ProjectCardData[] = [];

  for (const setting of featuredSettings) {
    // Find matching GitHub repo by repo_name
    const githubRepo = rawRepos.find(r => r.name.toLowerCase() === setting.repo_name.toLowerCase());

    const title = setting.custom_title || (githubRepo ? githubRepo.name : setting.repo_name);
    const description = setting.custom_description || (githubRepo ? (githubRepo.description || 'Tidak ada deskripsi.') : 'Deskripsi proyek.');
    const github_url = githubRepo ? githubRepo.html_url : `https://github.com/${GITHUB_USERNAME}/${setting.repo_name}`;
    const targetLiveUrl = setting.live_url_override || (githubRepo ? githubRepo.homepage : null);
    
    const language = githubRepo?.language || null;
    const topics = githubRepo?.topics || [];
    
    // Combine primary language + topics as tech stack
    const techStackSet = new Set<string>();
    if (language) techStackSet.add(language);
    topics.forEach(t => techStackSet.add(t));

    // Health check URL validation before trusting live status
    let isLive = false;
    let validatedLiveUrl: string | null = null;

    if (targetLiveUrl && targetLiveUrl.trim() !== '') {
      const health = await validateLiveUrl(targetLiveUrl);
      if (health.isLive) {
        isLive = true;
        validatedLiveUrl = targetLiveUrl;
      }
    }

    curatedProjects.push({
      id: setting.id || setting.repo_name,
      repo_name: setting.repo_name,
      title,
      description,
      github_url,
      live_url: validatedLiveUrl,
      cached_thumbnail_url: setting.cached_thumbnail_url || null,
      is_live: isLive,
      tech_stack: Array.from(techStackSet),
      language,
      stars: githubRepo?.stargazers_count || 0,
      pushed_at: githubRepo?.pushed_at || new Date().toISOString(),
      is_featured: setting.is_featured,
      display_order: setting.display_order,
    });
  }

  // Sort by display_order
  curatedProjects.sort((a, b) => a.display_order - b.display_order);

  return curatedProjects;
}
