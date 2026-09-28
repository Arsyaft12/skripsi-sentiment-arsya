import { GitHubRepo, ProjectCardData } from '@/types/portfolio';
import { fetchProjectSettings } from '@/lib/supabase';
import { validateLiveUrl } from '@/lib/healthCheck';
import { portfolioConfig } from '@/config/portfolio.config';

const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
  portfolioConfig.socialLinks.github?.replace(/^https?:\/\/github\.com\/?/, '') ||
  'developer';
const SELF_REPO_NAME = 'portfolio-starter';

const FALLBACK_GITHUB_REPOS: GitHubRepo[] = [
  {
    id: 100,
    name: 'musculoskeletal-rehab',
    full_name: `${GITHUB_USERNAME}/musculoskeletal-rehab`,
    description: 'Evidence-based clinical protocols for spinal, shoulder, and knee musculoskeletal conditions with targeted functional restoration and pain alleviation.',
    html_url: `https://orcid.org/0009-0003-4571-3338`,
    homepage: 'https://orcid.org/0009-0003-4571-3338',
    language: 'Clinical Physiotherapy',
    topics: ['evidence-based', 'pain-management', 'manual-therapy', 'exercise-prescription'],
    stargazers_count: 32,
    forks_count: 6,
    pushed_at: new Date().toISOString(),
  },
  {
    id: 101,
    name: 'sports-injury-rts',
    full_name: `${GITHUB_USERNAME}/sports-injury-rts`,
    description: 'Structured progressive loading and functional movement analysis designed to safely transition athletes from acute injury recovery back into peak athletic performance.',
    html_url: `https://orcid.org/0009-0003-4571-3338`,
    homepage: 'https://orcid.org/0009-0003-4571-3338',
    language: 'Sports Rehabilitation',
    topics: ['sports-injury', 'return-to-sport', 'progressive-loading', 'kinematics'],
    stargazers_count: 28,
    forks_count: 4,
    pushed_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 102,
    name: 'dry-needling-therapy',
    full_name: `${GITHUB_USERNAME}/dry-needling-therapy`,
    description: 'Targeted invasive neuromuscular modality for myofascial pain syndromes, muscle tone normalization, and rapid neuromusculoskeletal decompression.',
    html_url: `https://orcid.org/0009-0003-4571-3338`,
    homepage: 'https://orcid.org/0009-0003-4571-3338',
    language: 'Specialized Modality',
    topics: ['dry-needling', 'cert-dn', 'trigger-points', 'neuromuscular'],
    stargazers_count: 24,
    forks_count: 3,
    pushed_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 103,
    name: 'movement-optimization',
    full_name: `${GITHUB_USERNAME}/movement-optimization`,
    description: 'Biomechanical screening, gait & movement pattern optimization, and individualized therapeutic exercise prescription for sustainable physical capacity.',
    html_url: `https://orcid.org/0009-0003-4571-3338`,
    homepage: 'https://orcid.org/0009-0003-4571-3338',
    language: 'Functional Assessment',
    topics: ['biomechanics', 'functional-screening', 'movement-analysis', 'rehab'],
    stargazers_count: 19,
    forks_count: 2,
    pushed_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  }
];

const DEFAULT_PROJECT_TECH: Record<string, { language: string; stack: string[] }> = {
  'musculoskeletal-rehab': {
    language: 'Clinical Practice',
    stack: ['Evidence-Based Practice', 'Joint Mobilization', 'Pain Management', 'Therapeutic Exercise']
  },
  'sports-injury-rts': {
    language: 'Sports Science',
    stack: ['Return to Sport (RTS)', 'Progressive Overload', 'Kinematic Analysis', 'Injury Prevention']
  },
  'dry-needling-therapy': {
    language: 'Certified Modality',
    stack: ['Cert.DN.', 'Myofascial Trigger Points', 'Neuromuscular Reset', 'Pain Alleviation']
  },
  'movement-optimization': {
    language: 'Kinematic Screening',
    stack: ['Functional Movement Screening', 'Gait Analysis', 'Postural Correction', 'Core Stability']
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
