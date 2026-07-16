# Audit Batch 3 — Template/Schema Fixes (PREVIEW)

Date: 2026-07-15
Scope: sitewide multipliers (template + schema + crawl). No source-file edits until per-group ruling.

Reads: `AUDIT_INVENTORY/{schema,metadata,meta_bugs,crawl,assets}.md` + `app/[slug]/page.tsx` + `app/layout.tsx` + `lib/schema.ts` + `lib/cluster-mapping.ts` + `components/ui/FAQ.tsx` + `next.config.mjs` + `public/sitemap.xml`.

Environment note: `next.config.mjs` does NOT set `output: 'export'` — the site uses standard Next 14 SSG (via `generateStaticParams`), which supports dynamic `next/og` ImageResponse at build.

---

## GROUP A — OG / Twitter metadata

Root cause (confirmed from `meta_bugs.md` + source): `app/[slug]/page.tsx:21-38` returns a partial `openGraph` with no `images` and no `twitter` block; Next merges by key, drops layout `openGraph.images`, and inherits layout `twitter` whole. Result: 366/373 pages emit EMPTY `og:image`; 373/373 pages ship the generic layout Twitter title + description + SVG image.

### A1 — Article template: add per-article twitter + openGraph.images

**File:** `app/[slug]/page.tsx:21-38`

**BEFORE:**
```tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      type: 'article',
      publishedTime: article.meta.datePublished,
      modifiedTime: article.meta.dateModified || article.meta.datePublished,
    },
    alternates: {
      canonical: `https://www.hvacbase.org/${article.meta.slug}`,
    },
  };
}
```

**AFTER:**
```tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const url = `https://www.hvacbase.org/${article.meta.slug}`;
  // Per-article dynamic OG image (see A2 for opengraph-image.tsx colocated route)
  const ogImage = `${url}/opengraph-image`;

  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      url,
      type: 'article',
      publishedTime: article.meta.datePublished,
      modifiedTime: article.meta.dateModified || article.meta.datePublished,
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta.title,
      description: article.meta.description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  };
}
```

**Blast radius:** 353 articles.
**Risk:** low — pure additive metadata + reference to A2 route.

### A2 — OG image strategy: RECOMMEND dynamic `next/og` ImageResponse

Two options evaluated:

**Option (a) — Static 1200×630 PNG fallback in `/public`.**
- Effort: ~30 min. Create `public/og-image.png` (branded template with site name + tagline).
- Every article and hub shares the same image. Zero per-article differentiation.
- CTR + social preview quality: low. AI-citation preview: low.
- Risk: none.

**Option (b) — Dynamic per-page OG via `next/og` (RECOMMENDED).**
- Effort: ~2 hours to build + tune template. New file `app/[slug]/opengraph-image.tsx` (Next 14 convention, colocated with page.tsx).
- Compatibility: **compatible with this repo's setup.** `next.config.mjs` has no `output: 'export'` — the site uses standard SSG via `generateStaticParams`. `next/og` `ImageResponse` runs at build time per static param and emits a real 1200×630 PNG per route into the build output. Verified compatible; no runtime edge functions required.
- Per-article title + brand rendered. Better CTR, better AI-preview citation, easier for social platforms to render.
- Similar file also needed for static pages (either colocated per-page or one shared route).

**Proposed opengraph-image.tsx (skeleton, per-article):**
```tsx
// app/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { getArticleBySlug } from '@/lib/content';

export const alt = 'HVAC Base article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  const title = article?.meta.title ?? 'HVAC Base';

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '80px',
        background: 'linear-gradient(135deg, #0891B2 0%, #164E63 100%)',
        color: 'white', fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{ fontSize: 32, opacity: 0.85 }}>hvacbase.org</div>
        <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.15 }}>{title}</div>
        <div style={{ fontSize: 28, opacity: 0.85 }}>Data-Driven HVAC Guides & Calculators</div>
      </div>
    ),
    { ...size }
  );
}
```

**Blast radius:** 353 article routes (one PNG generated per route at build).
**Risk:** low-medium — need to verify Inter font embed works (may need `Font` from `next/og`). Build time increases modestly. If Inter embed fails, fall back to system font.

**Featured-image inventory:** grep shows **0 MDX files currently have a `featuredImage:` frontmatter field.** (The 4 refs cited in `assets.md` have since been removed.) So Option (a) — one static PNG — would be uniform across all pages. Option (b) generates a title-differentiated PNG per article.

### A3 — Layout defaults: replace SVG with PNG (for the 7 static pages that inherit)

**File:** `app/layout.tsx:23-30, 36`

**BEFORE:**
```tsx
openGraph: {
  ...
  images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: '...' }],
},
twitter: {
  card: 'summary_large_image',
  ...
  images: ['/og-image.svg'],
},
```

**AFTER (pairs with Option b in A2):**
```tsx
openGraph: {
  ...
  images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'HVAC Base' }],
},
twitter: {
  ...
  images: ['/opengraph-image'],
},
```
Then add `app/opengraph-image.tsx` (colocated with `app/page.tsx`) rendering the site-level default OG image.

**AFTER (pairs with Option a in A2):**
Replace `/og-image.svg` → `/og-image.png` (both `openGraph.images` and `twitter.images`).

**Blast radius:** 7 static pages that currently inherit the SVG (home, about, contact, disclaimer, editorial-policy, privacy, terms) — plus any static hub page that inherits layout defaults (see B4/B5 for the 13 pages missing per-page metadata).
**Risk:** low.

**A group summary:** RECOMMEND Option (b) — dynamic ImageResponse — for both article template and layout default. Blast radius = 373 pages get a real, per-page-differentiated PNG at build. Ships with A1 as one atomic change.

---

## GROUP B — Schema correctness

### B1 — Phantom SearchAction

**File:** `lib/schema.ts:166-178` `generateWebSiteSchema()`

**BEFORE:**
```ts
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
```

**AFTER:**
```ts
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}
```
Strips the phantom SearchAction; adds `@id` so B3 (unified Organization) can reference it.

**Blast radius:** 373 pages (WebSite emits from layout).
**Risk:** none — removes a false signal; nothing depends on the phantom action.

### B2 — Article.image + publisher.logo pointing to missing `/images/logo.png`

**File:** `lib/schema.ts:5, 73, 85`

**BEFORE:**
```ts
const LOGO_URL = `${SITE_URL}/images/logo.png`;
// ...
image: meta.featuredImage ? `${SITE_URL}${meta.featuredImage}` : LOGO_URL,
// ...
publisher: {
  ...
  logo: { '@type': 'ImageObject', url: LOGO_URL },
},
```

**AFTER (pairs with Group A Option b):**
```ts
const OG_DEFAULT = `${SITE_URL}/opengraph-image`;  // site-level dynamic PNG (A3)
const LOGO_URL = `${SITE_URL}/logo.png`;            // real logo file — see below
// ...
image: `${SITE_URL}/${meta.slug}/opengraph-image`,  // per-article PNG from A2
// ...
publisher: {
  ...
  logo: { '@type': 'ImageObject', url: LOGO_URL, width: 512, height: 512 },
},
```

**Two required file additions:**
1. `public/logo.png` — 512×512 or larger square PNG (schema.org requires ≥112×112; recommended ≥600×60 for Google Article rich result). Currently missing.
2. Site-level `app/opengraph-image.tsx` from A3.

**Blast radius:** 353 Article schemas.
**Risk:** low — requires user to provide a real logo PNG (or accept a placeholder generated by dynamic route).

### B3 — Publisher/Organization mismatch — unify

**File:** `lib/schema.ts` (add function) + `lib/schema.ts:82-86` (reference from Article)

**BEFORE (current state):**
- `WebSite.name = "HVAC Base"` (no `@id`)
- `Article.publisher = { '@type': 'Organization', name: 'Moving Data Systems d.o.o.', logo: {...} }` (inline, no `@id`)
- No shared Organization node

**AFTER:**

Add a new `generateOrganizationSchema()`:
```ts
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: PUBLISHER_NAME,
    legalName: PUBLISHER_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: LOGO_URL, width: 512, height: 512 },
    address: PUBLISHER_ADDRESS,
    sameAs: [],  // add real LinkedIn / VAT registry URL when available
  };
}
```

Emit it once, from the About page (single canonical Organization node).

Change WebSite to reference it (already shown in B1 AFTER).
Change Article.publisher to a `@id` reference:
```ts
publisher: { '@id': `${SITE_URL}/#organization` },
```

Then site-name distinction is clean: `WebSite.name = "HVAC Base"` (the site brand), `Organization.name = "Moving Data Systems d.o.o."` (the publisher entity). Both nodes exist, and every reference resolves via `@id`.

**Blast radius:** 353 Article schemas + 373 WebSite emissions + 1 new Organization emission on `/about`.
**Risk:** low — pure identity graph consolidation.

### B4 — Breadcrumb second-level mislabelling — 13 clusters fall through to `articles`

**File:** `lib/cluster-mapping.ts` — 13 clusters exist in MDX frontmatter but are missing from both `clusterMap` and `validRoutes`, so they return `'articles'` (line 66 fallback).

**List of 13 fallthroughs (verified against grep of `content/**/*.mdx` frontmatter):**

| Cluster (as in MDX) | Current breadcrumb | Proposed correct label + route |
|---|---|---|
| `air-conditioners` | Articles | Air Conditioning → `air-conditioning` |
| `air-purifier-brands` | Articles | Air Quality → `air-quality` |
| `air-purifiers-air-quality` | Articles | Air Quality → `air-quality` (likely a typo of `air-quality`; alias) |
| `central-air-hvac-systems` | Articles | Air Conditioning → `air-conditioning` |
| `dehumidifiers-humidity` | Articles | Air Quality → `air-quality` |
| `ductwork-ventilation` | Articles | How-To → `how-to` |
| `hvac-costs-location` | Articles | Cost Guides → `cost-guides` |
| `hvac-noise` | Articles | Troubleshooting → `troubleshooting` |
| `mold-moisture-control` | Articles | Air Quality → `air-quality` |
| `seer-comparisons` | Articles | Energy Efficiency → `energy-efficiency` |
| `smart-home-thermostats` | Articles | Energy Efficiency → `energy-efficiency` |
| `space-heaters-portable-heating` | Articles | Heating → `heating` |
| `window-air-conditioners` | Articles | Air Conditioning → `air-conditioning` |

**Also worth cleaning up** (currently mapped to `articles` as intentional targets, but semantically same wrong-bucket signal for breadcrumbs):
- `generators` → currently maps to `articles` (would be better as its own hub if `generators` route existed, else keep)
- `tax-credits` → currently maps to `articles` (could route to `cost-guides` for better semantic grouping)

**AFTER:** add the 13 rows to `clusterMap` in `lib/cluster-mapping.ts`.

Separately, `app/[slug]/page.tsx:51` derives the breadcrumb NAME by titlecasing the ROUTE (`clusterRoute.split('-').map(...).join(' ')`). This works for simple routes ("Air Conditioning") but produces awkward labels for complex ones. **RECOMMEND**: replace with a display-name map keyed by route:

```ts
// lib/cluster-mapping.ts (add)
export const routeDisplayName: Record<string, string> = {
  'air-conditioning': 'Air Conditioning',
  'heating': 'Heating',
  'heat-pumps': 'Heat Pumps',
  'energy-efficiency': 'Energy Efficiency',
  'air-quality': 'Air Quality',
  'brand-reviews': 'Brand Reviews',
  'buying-guides': 'Buying Guides',
  'cost-guides': 'Cost Guides',
  'how-to': 'How-To Guides',
  'troubleshooting': 'Troubleshooting',
  'hvac-dictionary': 'HVAC Dictionary',
  'articles': 'Articles',
};
```

**Blast radius:** ~130 articles get proper breadcrumb labels (per schema.md inventory).
**Risk:** low.

### B5 — 13 static pages missing canonical

**Files:** `app/{about,brand-reviews,buying-guides,calculators,contact,cost-guides,disclaimer,editorial-policy,how-to,hvac-dictionary,privacy,terms,troubleshooting}/page.tsx`

**BEFORE:** none of these 13 pages export `metadata` with `alternates.canonical`. All inherit layout defaults (no canonical set at layout either).

**AFTER (per page):** add
```tsx
export const metadata: Metadata = {
  title: '...',                     // per-page (not layout inheritance)
  description: '...',               // per-page
  alternates: {
    canonical: 'https://www.hvacbase.org/<slug>',
  },
  openGraph: {
    title: '...', description: '...',
    url: 'https://www.hvacbase.org/<slug>',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: '...' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '...', description: '...',
    images: ['/opengraph-image'],
  },
};
```

**Blast radius:** 13 pages.
**Risk:** low (mechanical addition).

### B6 — FAQ_SCHEMA_SSR — move FAQPage JSON-LD server-side

**Files:** `components/ui/FAQ.tsx` (currently `'use client'`) + `app/[slug]/page.tsx` (currently emits Article + Breadcrumb schemas only)

**Current architecture:**
- `<FAQ items={faqData} />` is a client component. It renders a `next/script` FAQPage JSON-LD after hydration.
- Result: FAQPage schema NOT in initial SSR HTML. Non-JS crawlers (many AI citation crawlers, static-analysis SEO tools, some social preview bots) never see the FAQPage schema.
- ComparisonTable is also `'use client'` — table row content also not in initial SSR HTML.

**Proposed approach (RECOMMEND):**

1. **Extract FAQ items server-side.** MDX frontmatter parsing already extracts `faqData` (per audit `content.ts:63`). Additionally, parse the compiled MDX for `<FAQ items={[…]}>` calls at build time — or, simpler, add a `faq:` frontmatter field to MDX files that already have FAQ blocks and have `getArticleBySlug` populate it.

2. **Emit FAQPage JSON-LD from `app/[slug]/page.tsx`** alongside Article + Breadcrumb:
   ```tsx
   const schemas = [
     generateArticleSchema(article.meta),
     generateBreadcrumbSchema([...]),
     ...(article.faq && article.faq.length > 0 ? [generateFAQSchema(article.faq)] : []),
   ];
   ```

3. **Keep the client component for interactivity** (accordion open/close), but remove the JSON-LD Script emission (it moves to server-side page).

4. **ComparisonTable SSR** (same-class fix): split into a server component that renders the table markup at build time, with a small client-only wrapper for sort/filter interactivity. Effort ~4 hours; recommend as a separate follow-up batch, not bundled with FAQ.

**Effort assessment:**
- FAQPage schema SSR-ification: ~2-3 hours. Requires (a) frontmatter schema addition, (b) MDX parsing to hydrate `faq` field, (c) template emission, (d) removal of client `next/script` emission from FAQ.tsx. Test on 3 representative pages before rolling out.
- Risk: medium. FAQ items live in-MDX as JSX (`<FAQ items={[{…}]}/>`), not currently in frontmatter. Server-side extraction requires either MDX AST parsing or a build-time codegen step (extract `<FAQ items={…}>` array literals into a JSON sidecar). The cleaner path is to move FAQ definitions to frontmatter (`faq: [{...}]`), which is a content-migration lift for ~9+ articles.
- ComparisonTable SSR: ~4-6 hours. Higher effort because tables are more layout-varied and interactive-user-value is higher. Defer to a separate batch.

**Blast radius:** 9+ articles with FAQ blocks today; expands as more FAQs are added.
**Risk:** medium — content migration required.

**Alternative low-effort path:** replace FAQ component's `next/script` with a `<script type="application/ld+json" dangerouslySetInnerHTML=...>` that renders in the CLIENT DOM but is still discoverable by JS-executing crawlers (Google, most AI). This does NOT solve the non-JS crawler problem but reduces the ambiguity. Zero content-migration cost. Effort ~15 min. If Marko's primary AI-citation targets (Perplexity, ChatGPT with browsing) all execute JS, this may suffice.

**RECOMMEND for this batch: alternative low-effort path** (in-DOM script tag rather than `next/script`), OR defer to Batch 4. Full SSR-ification is a real content-model change and doesn't need to bundle with the templates-and-schema batch.

---

## GROUP C — Crawl / index

### C1 — Static `public/sitemap.xml` → generated `app/sitemap.ts`

**File:** `public/sitemap.xml` (static, 373 entries) → replace with `app/sitemap.ts` (Next 14 convention)

**Proposed `app/sitemap.ts`:**
```ts
import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/content';

const SITE_URL = 'https://www.hvacbase.org';

// Static routes (hubs + informational pages)
const STATIC_ROUTES = [
  '', 'about', 'articles', 'brand-reviews', 'buying-guides', 'calculators',
  'contact', 'cost-guides', 'disclaimer', 'editorial-policy', 'how-to',
  'hvac-dictionary', 'privacy', 'terms', 'troubleshooting',
  'air-conditioning', 'heating', 'heat-pumps', 'energy-efficiency', 'air-quality',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map(route => ({
    url: `${SITE_URL}${route ? `/${route}` : ''}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.7,
  }));

  const articleEntries = getAllSlugs().map(slug => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...articleEntries];
}
```

Then delete `public/sitemap.xml`. `robots.txt` sitemap reference stays valid (`/sitemap.xml` is now generated dynamically by the route).

**Blast radius:** sitemap drift permanently fixed. Sitemap always reflects `getAllSlugs()` reality.
**Risk:** low.

### C2 — Fix the 3 sitemap-only 404s

Two are fixable (MDX exists but missing frontmatter), one is genuinely absent.

| Sitemap entry | Cause | Proposed action |
|---|---|---|
| `/mini-split-in-cold-climates` | MDX exists at `content/mini-split-air-conditioners/mini-split-in-cold-climates.mdx` — verified live file — but has **no frontmatter block** (file starts with body prose, no `---` block). `getAllSlugs()` skips. | ADD full frontmatter: `slug: "mini-split-in-cold-climates"`, `title`, `description`, `cluster: "mini-split-air-conditioners"`, `role`, `priority`, `contentType`, `datePublished`, `dateModified`. Cluster confirmed by directory location. Content is substantial (visible body text on mini-splits + cold weather). |
| `/mini-split-amps` | MDX exists at `content/mini-split-air-conditioners/mini-split-amps.mdx` — verified — also **no frontmatter block**. | ADD full frontmatter as above. Content is a wire-sizing / amps table article. |
| `/what-is-a-heat-pump` | No MDX file exists anywhere in `content/`. Genuine 404. | REMOVE from sitemap (will happen automatically when C1 ships — generated sitemap only lists real slugs from `getAllSlugs()`). |

**Blast radius:** 2 previously-dropped MDX files get built + 1 orphan URL removed.
**Risk:** low. Note: user must supply a title + description for the 2 files being frontmatter-completed; the body content already exists.

### C3 — 3 built-but-not-in-sitemap routes

| Route | Cause | Proposed action |
|---|---|---|
| `/calculators` | Static hub at `app/calculators/page.tsx`. Missing from `public/sitemap.xml`. | Included automatically after C1 ships (STATIC_ROUTES list). |
| `/hvac-efficiency-texas` | Content route (MDX exists at `content/energy-efficiency-ratings/hvac-efficiency-texas.mdx`). Missing from sitemap. | Included automatically after C1 ships (via `getAllSlugs()`). |
| `/trane-vs-carrier` | Content route (MDX exists at `content/brand-reviews/trane-vs-carrier.mdx`). Missing from sitemap. | Included automatically after C1 ships. |

**Blast radius:** 3 real pages become discoverable via sitemap.
**Risk:** none.

### C4 — 6 referenced-but-missing assets

| Asset | Referenced from | Proposed action |
|---|---|---|
| `/favicon.ico` | `app/layout.tsx:41,68` | CREATE — generate 32×32 `.ico` from existing `public/favicon.svg` (small file, standard tooling). |
| `/apple-touch-icon.png` | `app/layout.tsx:44,69` | CREATE — 180×180 PNG from the same source as favicon. |
| `/images/logo.png` | `lib/schema.ts:5` (Article.image fallback + publisher.logo) | REPLACE reference — moves to `/logo.png` per B2. Also CREATE the file at `public/logo.png` (512×512 square PNG with brand mark). |
| `/images/heat-pump-vs-mini-split-comparison.jpg` | `content/heat-pumps/heat-pump-vs-mini-split.mdx:13` featuredImage | **NOT REFERENCED IN CURRENT MDX** — grep of `content/**/*.mdx` for `^featuredImage:` returns ZERO hits. The 4 references cited in `assets.md` have since been removed. Nothing to do. |
| `/images/hvac-allergen-control-guide.jpg` | (was `content/air-quality/allergen-control-guide.mdx:13`) | Same — no current MDX has `featuredImage`. Nothing to do. |
| `/images/insulation-r-value-guide.jpg` | (was `content/insulation/insulation-r-value-guide.mdx:13`) | Same. |
| `/images/uv-light-hvac-systems.jpg` | (was `content/air-quality/uv-light-hvac-systems.mdx:13`) | Same. |

**Actual asset actions needed (3 files):**
1. `public/favicon.ico`
2. `public/apple-touch-icon.png`
3. `public/logo.png`

Plus optional `public/og-image.png` if Group A goes with Option (a). If Group A goes with Option (b), the dynamic route replaces both `og-image.svg` and `og-image.png`.

**Blast radius:** removes 3 (formerly 6) live 404 references from every page's `<head>`.
**Risk:** low — requires user to supply/generate the 3 image files.

---

## Cross-group dependency map

```
GROUP A2 (opengraph-image.tsx per-article route)
  └─ enables A1 (per-article twitter + og.images with real image URL)
  └─ enables A3 (layout switches to /opengraph-image default)
  └─ enables B2 (Article.image points to per-article dynamic PNG)
  └─ enables B5 (13 static pages' openGraph.images points to /opengraph-image)

GROUP B1 (SearchAction removed, WebSite gets @id)
  └─ enables B3 (WebSite.publisher references Organization @id)

GROUP B3 (Organization schema on /about with @id)
  └─ enables B1 reference from WebSite
  └─ enables B2 reference from Article.publisher

GROUP C1 (generated sitemap)
  └─ resolves C2 (removes /what-is-a-heat-pump orphan automatically)
  └─ resolves C3 (adds the 3 missing routes automatically)

GROUP C2 (add frontmatter to 2 MDX files)
  └─ 2 more routes become build targets (both automatically appear in sitemap after C1)
```

## Suggested apply order

If all groups get greenlit:
1. **C4** — provide 3 asset files (logo.png, favicon.ico, apple-touch-icon.png). Independent of code.
2. **A2** — build the dynamic opengraph-image.tsx route(s). Verify build succeeds on 353 routes + static pages.
3. **A1** — update article template to reference the new OG image + add twitter block.
4. **A3** — update layout defaults.
5. **B1 + B3** — atomic: remove SearchAction from WebSite, add generateOrganizationSchema, unify via @id.
6. **B2** — update Article schema to reference per-article OG image + real logo.
7. **B4** — update cluster-mapping.ts with 13 fallthroughs + route display-name map.
8. **B5** — add metadata blocks to 13 static pages.
9. **B6** — decide: low-effort in-DOM script tag OR defer full SSR-ification.
10. **C2** — add frontmatter to 2 mini-split MDX files (user supplies title/description).
11. **C1** — replace static sitemap with generated route. Delete `public/sitemap.xml`.

Each numbered step above is a separate commit.

**Total blast radius (all groups applied):** 373 pages get fixed OG/Twitter + fixed schema + correct breadcrumbs + valid sitemap. 5 previously-invisible pages become discoverable (2 sitemap fixes + 3 built-but-unlisted). ~130 articles get semantically-correct breadcrumbs. Zero content edits (no MDX body strips in this batch).

---

## Awaiting your rulings

- **Group A:** OG image strategy — Option (a) static PNG OR Option (b) dynamic ImageResponse?
- **Group B:** approve B1-B5 as staged. **B6 FAQ SSR:** low-effort in-DOM script tag now, OR defer full SSR-ification to Batch 4?
- **Group C:** approve C1-C4. C2 needs your call on title/description for the 2 mini-split MDX files that lack frontmatter.

No edits until per-group ruling.
