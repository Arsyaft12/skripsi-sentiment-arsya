import { GitHubRepo, ProjectCardData } from '@/types/portfolio';
import { fetchProjectSettings } from '@/lib/supabase';
import { validateLiveUrl } from '@/lib/healthCheck';
import { portfolioConfig } from '@/config/portfolio.config';

const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
  portfolioConfig.socialLinks.github.replace(/^https?:\/\/github\.com\/?/, '') ||
  'developer';
const SELF_REPO_NAME = 'portfolio-starter';

// Fallback GitHub repos data if GitHub API is unreachable or rate limited
const FALLBACK_GITHUB_REPOS: GitHubRepo[] = [
  {
    id: 100,
    name: 'saas-analytics-engine',
    full_name: `${GITHUB_USERNAME}/saas-analytics-engine`,
    description: 'Enterprise Analytics Engine — high-performance metrics aggregation and dashboard engine built with Next.js 16 App Router, TypeScript, and Tailwind CSS.',
    html_url: `https://github.com/${GITHUB_USERNAME}/saas-analytics-engine`,
    homepage: 'https://example.com/demo',
    language: 'TypeScript',
    topics: ['nextjs-16', 'typescript', 'tailwind-css', 'analytics', 'data-viz'],
    stargazers_count: 32,
    forks_count: 6,
    pushed_at: new Date().toISOString(),
  },
  {
    id: 101,
    name: 'ecommerce-ai-platform',
    full_name: `${GITHUB_USERNAME}/ecommerce-ai-platform`,
    description: 'E-Commerce AI Intelligence — intelligent review sentiment classifier and real-time recommendation system.',
    html_url: `https://github.com/${GITHUB_USERNAME}/ecommerce-ai-platform`,
    homepage: 'https://example.com/demo-ai',
    language: 'Python',
    topics: ['machine-learning', 'sentiment-analysis', 'scikit-learn', 'fastapi', 'python'],
    stargazers_count: 18,
    forks_count: 4,
    pushed_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 102,
    name: 'mobile-fitness-tracker',
    full_name: `${GITHUB_USERNAME}/mobile-fitness-tracker`,
    description: 'Mobile Fitness & Workout Engine — Cross-platform Flutter mobile application with offline-first local storage and charts.',
    html_url: `https://github.com/${GITHUB_USERNAME}/mobile-fitness-tracker`,
    homepage: 'https://example.com/demo-app',
    language: 'Dart',
    topics: ['flutter', 'dart', 'mobile-app', 'fitness', 'cross-platform'],
    stargazers_count: 15,
    forks_count: 2,
    pushed_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 103,
    name: 'creative-studio-web',
    full_name: `${GITHUB_USERNAME}/creative-studio-web`,
    description: 'Creative Agency Showcase — interactive agency web platform with editorial layouts and smooth animations.',
    html_url: `https://github.com/${GITHUB_USERNAME}/creative-studio-web`,
    homepage: 'https://example.com/demo-agency',
    language: 'TypeScript',
    topics: ['nextjs', 'framer-motion', 'creative', 'design', 'tailwind-css'],
    stargazers_count: 8,
    forks_count: 1,
    pushed_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  }
];

const DEFAULT_PROJECT_TECH: Record<string, { language: string; stack: string[] }> = {
  'saas-analytics-engine': {
    language: 'TypeScript',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Charts']
  },
  'ecommerce-ai-platform': {
    language: 'Python',
    stack: ['Python', 'Scikit-learn', 'FastAPI', 'Pandas', 'NLP']
  },
  'mobile-fitness-tracker': {
    language: 'Dart',
    stack: ['Flutter', 'Dart', 'Bloc', 'SQLite', 'Clean Architecture']
  },
  'creative-studio-web': {
    language: 'TypeScript',
    stack: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript']
  }
};

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Template-App'
    };
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 3600 },
      headers
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
