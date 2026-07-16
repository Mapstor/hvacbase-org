# Robots / Sitemap / Indexability

## robots.txt (verbatim)

```
# Robots.txt for hvacbase.org
# Allow all crawlers full access

User-agent: *
Allow: /
Crawl-delay: 0

# Sitemap location
Sitemap: https://www.hvacbase.org/sitemap.xml

# Allow CSS/JS for proper rendering
Allow: /_next/static/css/
Allow: /_next/static/chunks/
Allow: /_next/static/media/

# Block only internal API routes
Disallow: /api/internal/
Disallow: /api/admin/
```

No disallow on any real content route. `Crawl-delay: 0` is polite. Correct sitemap URL. Nothing broken here.

## sitemap.xml

- File location: `public/sitemap.xml` (static)
- No `app/sitemap.ts` file present — the sitemap is committed as static XML, not generated at build. This means adds/removes/renames of MDX don't automatically sync.
- Total `<loc>` entries: **373** (including `https://www.hvacbase.org/`)
- Valid XML — no parse errors.

### Sitemap-only entries (404 risk in production)

Three entries in sitemap have no built route:

| URL | Cause |
|---|---|
| `https://www.hvacbase.org/mini-split-in-cold-climates` | MDX exists at `content/mini-split-air-conditioners/mini-split-in-cold-climates.mdx` but has no `slug:` in frontmatter → `getAllSlugs()` skips it → not built |
| `https://www.hvacbase.org/mini-split-amps` | Same cause: MDX at `content/mini-split-air-conditioners/mini-split-amps.mdx` has no `slug:` |
| `https://www.hvacbase.org/what-is-a-heat-pump` | Neither MDX nor built HTML exists. Straight 404. |

### Built-but-not-in-sitemap

Three real routes are not indexed via sitemap:

| Route | Notes |
|---|---|
| `/calculators` | Hub page for calculator tools. Missing from sitemap. |
| `/hvac-efficiency-texas` | Content route (MDX exists). Missing from sitemap. |
| `/trane-vs-carrier` | Content route (MDX exists). Missing from sitemap. |

## Indexability directives

- Root layout `robots` config: `index: true, follow: true, googleBot: { index: true, follow: true, ... }`. Confirmed applied to every page unless overridden. No page-level `noindex` overrides detected via grep on `noindex\|nofollow` in `app/**/*.tsx` and `content/**/*.mdx`.
- No `<meta name="robots" content="noindex">` in any built HTML (spot-checked; no page overrides).

## Canonical

- Root layout metadata does not set canonical.
- `app/[slug]/page.tsx` `generateMetadata` sets `alternates.canonical` per article (verified: `<link rel="canonical" href="https://www.hvacbase.org/{slug}">` on every article).
- `app/page.tsx` sets `alternates.canonical: 'https://www.hvacbase.org/'`.
- 13 static pages that DO NOT set canonical: about, brand-reviews, buying-guides, calculators, contact, cost-guides, disclaimer, editorial-policy, how-to, hvac-dictionary, privacy, terms, troubleshooting.

Impact: Google may treat those pages' canonical as the requested URL with query strings preserved, or may pick another cluster page as canonical. Add `alternates.canonical` metadata blocks to each.

## Robots + Search Console indexation implication

Given ~1 of 353 indexed (per CLAUDE.md brief):

- The sitemap is delivering 3 URLs that 404
- The canonical is missing on 13 static pages
- 234 pages are unreachable via internal-link BFS from `/` (only the ~140 that Header/Footer or hub cards link to are 1-hop reachable). See `links_internal.md`.
- FAQ schema is client-only, so Article + FAQPage rich results aren't unified at crawl-time on first render.
- Article `image` (schema) points to a missing file — Article rich-result eligibility likely denied.
- SearchAction (WebSite) points to a missing route.

Combined, this is the indexation blockade. Nothing in robots or sitemap is HARD-blocking; the blockade is discovery + schema+asset invalidation + duplicate-canonical potential.
