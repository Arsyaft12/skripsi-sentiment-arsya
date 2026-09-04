import { GitHubRepo, ProjectCardData } from '@/types/portfolio';
import { fetchProjectSettings } from '@/lib/supabase';
import { validateLiveUrl } from '@/lib/healthCheck';

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Arsyaft12';
const SELF_REPO_NAME = 'portfolio-arsya'; // Self-exclusion guard for current portfolio repository

// Fallback GitHub repos data if GitHub API is unreachable or rate limited
const FALLBACK_GITHUB_REPOS: GitHubRepo[] = [
  {
    id: 100,
    name: 'beastindex',
    full_name: `${GITHUB_USERNAME}/beastindex`,
    description: 'BEASTINDEX — Empirical fitness scoring and animal-archetype mapping engine built with Next.js 16 App Router, TypeScript, and statistical normalization (DOTS & Riegel).',
    html_url: `https://github.com/${GITHUB_USERNAME}/beastindex`,
    homepage: 'https://beastindex.com',
    language: 'TypeScript',
    topics: ['nextjs-16', 'typescript', 'tailwind-css', 'data-science', 'fitness-engine', 'empirical-curves'],
    stargazers_count: 24,
    forks_count: 5,
    pushed_at: new Date().toISOString(),
  },
  {
    id: 101,
    name: 'skripsi-sentiment-arsya',
    full_name: `${GITHUB_USERNAME}/skripsi-sentiment-arsya`,
    description: 'SentimenAI — e-commerce review sentiment analysis dashboard with NLP and model comparison.',
    html_url: `https://github.com/${GITHUB_USERNAME}/skripsi-sentiment-arsya`,
    homepage: 'https://frontend-h4q65ncub-arsyaft12-9212s-projects.vercel.app/',
    language: 'Python',
    topics: ['nlp', 'machine-learning', 'sentiment-analysis', 'flask', 'pandas'],
    stargazers_count: 14,
    forks_count: 3,
    pushed_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 102,
    name: 'toraksai',
    full_name: `${GITHUB_USERNAME}/toraksai`,
    description: 'ToraksAI — thoracic X-ray clinical decision support and explainable AI diagnostic dashboard.',
    html_url: `https://github.com/${GITHUB_USERNAME}/toraksai`,
    homepage: 'https://frontend-sable-one-90kmisglle.vercel.app',
    language: 'TypeScript',
    topics: ['ai', 'dashboard', 'healthcare', 'monitoring', 'nextjs'],
    stargazers_count: 6,
    forks_count: 1,
    pushed_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 103,
    name: 'the-pitch-creative',
    full_name: 'the-pitch-creative/the-pitch-creative-media',
    description: 'The Pitch Creative — Digital brand & media showcase with editorial storytelling.',
    html_url: 'https://www.thepitchcreative.media/',
    homepage: 'https://www.thepitchcreative.media/',
    language: 'TypeScript',
    topics: ['creative', 'media', 'editorial', 'nextjs', 'design'],
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  }
];

const DEFAULT_PROJECT_TECH: Record<string, { language: string; stack: string[] }> = {
  'beastindex': {
    language: 'TypeScript',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Python', 'DOTS Normalisation', 'Riegel Model']
  },
  'skripsi-sentiment-arsya': {
    language: 'Python',
    stack: ['Python', 'NLP', 'Scikit-learn', 'Flask', 'Pandas', 'Naïve Bayes', 'SVM']
  },
  'toraksai': {
    language: 'TypeScript',
    stack: ['TypeScript', 'Next.js', 'PyTorch / CNN', 'Grad-CAM Heatmaps', 'Medical AI']
  },
  'the-pitch-creative': {
    language: 'TypeScript',
    stack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Editorial Web']
  }
};

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

  // Build project metadata for all featured settings in parallel (no sequential await)
  const projectMetas = featuredSettings.map((setting) => {
    const githubRepo = rawRepos.find(r => r.name.toLowerCase() === setting.repo_name.toLowerCase());
    const fallbackMeta = DEFAULT_PROJECT_TECH[setting.repo_name.toLowerCase()];

    const title = setting.custom_title || (githubRepo ? githubRepo.name : setting.repo_name);
    const description = setting.custom_description || (githubRepo ? (githubRepo.description || 'No description.') : 'Project description.');
    const github_url = githubRepo ? githubRepo.html_url : `https://github.com/${GITHUB_USERNAME}/${setting.repo_name}`;
    const targetLiveUrl = setting.live_url_override || (githubRepo ? githubRepo.homepage : null);

    const language = githubRepo?.language || fallbackMeta?.language || null;
    const topics = githubRepo?.topics || [];

    const techStackSet = new Set<string>();
    if (language) techStackSet.add(language);
    topics.forEach(t => techStackSet.add(t));
    if (techStackSet.size <= 1 && fallbackMeta?.stack) {
      fallbackMeta.stack.forEach(item => techStackSet.add(item));
    }

    return {
      setting,
      githubRepo,
      title,
      description,
      github_url,
      targetLiveUrl: targetLiveUrl && targetLiveUrl.trim() !== '' ? targetLiveUrl : null,
      techStack: Array.from(techStackSet),
      language,
    };
  });

  // Run all health checks concurrently (max 2s each) instead of sequentially
  const healthResults = await Promise.all(
    projectMetas.map(async ({ targetLiveUrl }) => {
      if (!targetLiveUrl) return { isLive: false, validatedLiveUrl: null };
      try {
        const health = await validateLiveUrl(targetLiveUrl);
        return { isLive: health.isLive, validatedLiveUrl: targetLiveUrl };
      } catch {
        return { isLive: false, validatedLiveUrl: targetLiveUrl };
      }
    })
  );

  const curatedProjects: ProjectCardData[] = projectMetas.map((meta, idx) => {
    const { isLive, validatedLiveUrl } = healthResults[idx];
    const { setting, githubRepo, title, description, github_url, techStack, language } = meta;

    return {
      id: setting.id || setting.repo_name,
      repo_name: setting.repo_name,
      title,
      description,
      github_url,
      live_url: validatedLiveUrl,
      cached_thumbnail_url: setting.cached_thumbnail_url || null,
      is_live: isLive,
      tech_stack: techStack,
      language,
      stars: githubRepo?.stargazers_count || 0,
      pushed_at: githubRepo?.pushed_at || new Date().toISOString(),
      is_featured: setting.is_featured,
      display_order: setting.display_order,
      category: setting.category || null,
      badge: setting.badge || null,
      metrics: setting.metrics || null,
    };
  });

  // Sort by display_order
  curatedProjects.sort((a, b) => a.display_order - b.display_order);

  return curatedProjects;
}
