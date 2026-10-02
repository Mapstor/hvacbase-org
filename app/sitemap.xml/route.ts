import { getAllSlugs, getAllSlugDiagrams } from '@/lib/content';

// Custom /sitemap.xml route. Next 14.2's MetadataRoute.Sitemap serializer only
// emits url/alternates/lastmod/changefreq/priority and silently ignores the
// `images` field, so the Google image sitemap extension (image:image) is built
// here by hand. Prerendered at build time.
export const dynamic = 'force-static';

const SITE_URL = 'https://www.hvacbase.org';

// Static routes (hubs + informational pages), kept identical to the previous
// MetadataRoute sitemap so the page-URL set is unchanged.
const STATIC_ROUTES: Array<{ path: string; priority: number; freq: string }> = [
  { path: '', priority: 1.0, freq: 'weekly' },
  { path: 'about', priority: 0.7, freq: 'monthly' },
  { path: 'contact', priority: 0.5, freq: 'monthly' },
  { path: 'editorial-policy', priority: 0.5, freq: 'monthly' },
  { path: 'disclaimer', priority: 0.3, freq: 'monthly' },
  { path: 'privacy', priority: 0.3, freq: 'monthly' },
  { path: 'terms', priority: 0.3, freq: 'monthly' },
  { path: 'articles', priority: 0.8, freq: 'weekly' },
  { path: 'calculators', priority: 0.8, freq: 'weekly' },
  { path: 'cost-guides', priority: 0.8, freq: 'weekly' },
  { path: 'how-to', priority: 0.8, freq: 'weekly' },
  { path: 'hvac-dictionary', priority: 0.7, freq: 'monthly' },
  { path: 'troubleshooting', priority: 0.8, freq: 'weekly' },
  { path: 'air-conditioning', priority: 0.8, freq: 'weekly' },
  { path: 'air-quality', priority: 0.8, freq: 'weekly' },
  { path: 'energy-efficiency', priority: 0.8, freq: 'weekly' },
  { path: 'heat-pumps', priority: 0.8, freq: 'weekly' },
  { path: 'heating', priority: 0.8, freq: 'weekly' },
];

const xmlEscape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const absUrl = (s: string) => (/^https?:\/\//.test(s) ? s : `${SITE_URL}${s.startsWith('/') ? s : `/${s}`}`);

export function GET() {
  const now = new Date().toISOString();
  const diagramsBySlug = new Map(getAllSlugDiagrams().map((d) => [d.slug, d.diagrams]));

  type Entry = { url: string; priority: number; freq: string; images: string[] };
  const entries: Entry[] = [
    ...STATIC_ROUTES.map((r) => ({
      url: `${SITE_URL}${r.path ? `/${r.path}` : ''}`,
      priority: r.priority,
      freq: r.freq,
      images: [] as string[],
    })),
    ...getAllSlugs()
      .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
      .map((slug) => ({
        url: `${SITE_URL}/${slug}`,
        priority: 0.5,
        freq: 'monthly',
        images: (diagramsBySlug.get(slug) ?? []).map(absUrl),
      })),
  ];

  const hasImages = entries.some((e) => e.images.length > 0);
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  if (hasImages) xml += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
  xml += '>\n';
  for (const e of entries) {
    xml += '  <url>\n';
    xml += `    <loc>${xmlEscape(e.url)}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${e.freq}</changefreq>\n`;
    xml += `    <priority>${e.priority}</priority>\n`;
    for (const img of e.images) {
      xml += `    <image:image><image:loc>${xmlEscape(img)}</image:loc></image:image>\n`;
    }
    xml += '  </url>\n';
  }
  xml += '</urlset>\n';

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
