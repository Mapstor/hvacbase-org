import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/content';

const SITE_URL = 'https://www.hvacbase.org';

// Static routes (hubs + informational pages) — kept in sync with the pages that
// exist under app/. Add new hub / static page? Add its slug here.
const STATIC_ROUTES: Array<{ path: string; priority: number; freq: 'weekly' | 'monthly' }> = [
  { path: '', priority: 1.0, freq: 'weekly' },
  { path: 'about', priority: 0.7, freq: 'monthly' },
  { path: 'contact', priority: 0.5, freq: 'monthly' },
  { path: 'editorial-policy', priority: 0.5, freq: 'monthly' },
  { path: 'disclaimer', priority: 0.3, freq: 'monthly' },
  { path: 'privacy', priority: 0.3, freq: 'monthly' },
  { path: 'terms', priority: 0.3, freq: 'monthly' },
  // Hub pages
  { path: 'articles', priority: 0.8, freq: 'weekly' },
  { path: 'brand-reviews', priority: 0.8, freq: 'weekly' },
  { path: 'buying-guides', priority: 0.8, freq: 'weekly' },
  { path: 'calculators', priority: 0.8, freq: 'weekly' },
  { path: 'cost-guides', priority: 0.8, freq: 'weekly' },
  { path: 'how-to', priority: 0.8, freq: 'weekly' },
  { path: 'hvac-dictionary', priority: 0.7, freq: 'monthly' },
  { path: 'troubleshooting', priority: 0.8, freq: 'weekly' },
  // Cluster hub routes referenced by cluster-mapping.ts validRoutes
  { path: 'air-conditioning', priority: 0.8, freq: 'weekly' },
  { path: 'air-quality', priority: 0.8, freq: 'weekly' },
  { path: 'energy-efficiency', priority: 0.8, freq: 'weekly' },
  { path: 'heat-pumps', priority: 0.8, freq: 'weekly' },
  { path: 'heating', priority: 0.8, freq: 'weekly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path ? `/${r.path}` : ''}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  const articleEntries = getAllSlugs()
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
    .map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

  return [...staticEntries, ...articleEntries];
}
