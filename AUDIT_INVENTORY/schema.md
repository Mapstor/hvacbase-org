# Schema / JSON-LD Inventory

Ground truth: `.next/server/app/*.html` — reads emitted `<script type="application/ld+json">` blocks.

## Headline counts (across 373 built pages)

| `@type` | pages |
|---|---|
| SearchAction | 373 |
| WebSite | 373 |
| Organization | 355 |
| Person | 354 |
| ImageObject | 354 |
| WebPage | 353 |
| SpeakableSpecification | 353 |
| Article | 353 |
| ListItem | 353 |
| BreadcrumbList | 353 |
| PostalAddress | 1 (About page only) |
| CollegeOrUniversity | 1 (About page only) |

Pages with zero schema: **0**

## Critical schema bugs

### 1. Phantom SearchAction — 373/373 pages emit it

`lib/schema.ts:167` in `generateWebSiteSchema()`:

```
potentialAction: {
  '@type': 'SearchAction',
  target: `${SITE_URL}/search?q={search_term_string}`,
  ...
}
```

There is no `/search` page anywhere in `app/`. The route does not exist. Every page tells Google "we have a search endpoint at /search" — that endpoint returns 404 when tested. This is a false-signal E-E-A-T hit and Google will drop the potentialAction from Sitelinks eligibility.

Fix path: either delete the potentialAction from `generateWebSiteSchema()` or actually build `/search`.

### 2. `Article.image` and `publisher.logo` reference `/images/logo.png` — file does not exist

`lib/schema.ts:5` sets `LOGO_URL = 'https://www.hvacbase.org/images/logo.png'`.

`public/images/` directory does NOT exist. `public/logo.png` does NOT exist. See `assets.md`.

Emitted on 353 Article schemas (as `image` when `featuredImage` is unset, which is every article) AND on every `publisher.logo.url`. When Google validates the schema it 404s, and Article rich-result eligibility is lost sitewide.

Fix path: either add `public/images/logo.png` (or `public/logo.png`) OR change `LOGO_URL` to an existing file.

### 3. Organization/Publisher name mismatch

- Homepage `WebSite.name = "HVAC Base"` (from `SITE_NAME` in schema.ts:4)
- Every article's `Article.publisher.name = "Moving Data Systems d.o.o."` (from `PUBLISHER_NAME` in schema.ts:18)

There is no unifying `Organization` node with a stable `@id` that both the site and the publisher point to. Google's Publisher/Organization graph will see two distinct entities. Recommended: emit an Organization schema on `/about` with `@id`, then reference by `@id` from both `WebSite.publisher` and `Article.publisher`.

### 4. Breadcrumb second-level mislabelling

`app/[slug]/page.tsx:51` derives the second breadcrumb name by titlecasing `getClusterRoute(article.meta.cluster)`. But `getClusterRoute` returns `'articles'` as fallback for any cluster not in its `validRoutes` list. That means every article whose cluster is `window-air-conditioners`, `dehumidifiers-humidity`, `electrical-wiring`, `space-heaters-portable-heating`, `central-air-hvac-systems`, `seer-comparisons`, `smart-home-thermostats`, `air-purifier-brands`, `fireplaces-stoves`, `mold-moisture-control`, `ductwork-ventilation`, `evaporative-coolers-fans` gets breadcrumbs like `Home > Articles > [Title]` instead of `Home > Window Air Conditioners > [Title]`. Cluster-hub semantic signal lost for ~130 articles.

Verified by cross-ref of `routes.md` cluster distribution vs `lib/cluster-mapping.ts` validRoutes.

### 5. Article schema misses `wordCount` accuracy

`generateArticleSchema` computes `wordCount` from `readingTime * 200`. Reading time is computed from a body with imports/H1 stripped but includes JSX. Real word counts are much lower — see `content.md`. Not spam-inducing but low fidelity.

### 6. No `AggregateRating` / `Review` / `ratingValue` / `reviewCount` sitewide

Confirmed with grep across all HTML + all source files: zero hits. Good.

### 7. FAQPage schema — client-side only

`components/ui/FAQ.tsx` marks `'use client';` and injects `<Script>` with FAQPage JSON-LD. This means the schema is not present in the SSR HTML that Google crawls first. Google's crawler does run JS, but the FAQPage rich-result eligibility is unreliable when the schema is deferred to hydration.

Affected files that use `<FAQ items={...}>`: at least 9 known from grep (`ac-troubleshooting-guide`, `ac-not-cooling`, `portable-vs-window-ac`, `best-hvac-air-filters`, `heating-cost-calculator`, `boiler-vs-furnace`, `hvac-energy-saving-tips`, `furnace-maintenance`, `radiant-floor-heating-pros-cons`).

Recommendation: move FAQ schema generation server-side (via `<script type="application/ld+json">` from the article template using the `faqData` extracted in `lib/content.ts:63`).

### 8. Every non-article static page (13 of 20) missing canonical

See `metadata.md` — the 13 static pages that don't set `alternates.canonical` inherit `metadataBase` from the root layout but no explicit canonical is emitted in HTML.

## Per-page schema summary (from build)

Every article (353): `WebSite` (via layout) + `Article` + `BreadcrumbList`.
Every static page (20): `WebSite` (via layout) only, except `/about` which adds `Person` full node + `Organization` + `PostalAddress` + `CollegeOrUniversity`.

## Person schema — About page emits the full Person node with `@id`

`lib/schema.ts:generatePersonSchema()` builds it. Article schemas reference the same `@id`. Consistent.

## Files touched

- `lib/schema.ts` — the source of all listed bugs (SearchAction, LOGO_URL, publisher/name split).
- `app/[slug]/page.tsx` — cluster route mapping breaks breadcrumbs.
- `components/ui/FAQ.tsx` — client-side FAQ schema.
- `app/disclaimer/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/page.tsx` — no `export const metadata` (and therefore no canonical override).
