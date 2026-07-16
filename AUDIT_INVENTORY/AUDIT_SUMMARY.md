# hvacbase.org — Phase 0 Audit Summary

Read-only inventory across 373 built routes and 355 MDX articles. Zero source-file edits. Findings ranked by user's specified priority.

## 1. Broken internal links — 90 broken edges

Source: [`links_internal.md`](./links_internal.md)

- **90 broken outbound edges** across **87 unique target URLs**
- **8 source files carry broken links**; three hub pages account for 75 of 90:
  - `app/troubleshooting/page.tsx` — 26 (the known list — confirmed exact)
  - `app/buying-guides/page.tsx` — 26 (SITEWIDE EXPANSION — same subdir-vs-flat mismatch pattern)
  - `app/how-to/page.tsx` — 23 (same pattern)
  - `app/cost-guides/page.tsx` — 8
  - `app/brand-reviews/page.tsx` — 4
  - plus 3 stragglers
- **60 subdir-shaped targets** that can never match the flat `[slug]` route (`/thermostats/*`, `/troubleshooting/*`, `/air-quality/*`, `/airflow/*`, `/tools/*`, `/maintenance/*`, `/brand-reviews/*`, `/installation/*`, `/humidifiers/*`, `/insulation/*`, `/zoning/*`, `/space-heaters/*`, `/dehumidifiers/*`, `/heating/*`, `/heat-pumps/*`, `/repairs/*`, `/energy-efficiency/*`)
- **27 flat-shaped targets** referencing MDX slugs that don't exist (`/ac-freezing-up`, `/ac-short-cycling`, `/furnace-not-heating`, `/heat-pump-not-heating`, `/what-is-a-heat-pump`, `/ultimate-buying-guide`, `/best-boilers`, `/best-gas-furnaces`, `/mini-split-buying-guide`, `/central-ac-installation-cost`, `/diy-mini-split-installation`, etc.)

**Orphan pages (zero inbound internal links): 215 of 372 = 58% of the site.** BFS from `/` reaches only 140 of 374 pages; **234 pages unreachable via internal-link BFS**. Discovery is the primary blockade to indexation.

## 2. Body-prose fabrications — 88 primary hits across 353 pages

Source: [`prose_stats.md`](./prose_stats.md) + [`prose_hits_full.json`](./prose_hits_full.json)

Per-class totals (FAQ blocks excluded — Batch C.2 covered those):

| Class | Hits | Files |
|---|---|---|
| named-source-attributed | **63** | 43 |
| success-rate: N% | **12** | (multiple, exceeds ac-troubleshooting-guide) |
| sum-to-100 table columns | **9** | 8 |
| descending-heading integer sequences (>=4) | **4** | 4 |
| **Bare N% in prose (tier-2 tail)** | **5,250** | **329 of 353** |

**Per-article carrying-pattern count:** 51 articles carry at least one primary-class hit (named/success/sum/desc). **329 articles carry any bare N% in prose.** The Tier-2 tail is huge.

## 3. Named-source stats needing external verification

Source: prose_stats.md — full list with file:line + verbatim excerpt. 63 hits by source label:

| Source | Hits |
|---|---|
| EPA | 22 |
| AHRI | 12 |
| ENERGY STAR | 11 |
| DOE | 9 |
| ACCA | 4 |
| ASHRAE | 4 |
| NIST | 1 |

Confirmed-fabricated already: `ac-not-cooling.mdx:56` "ACCA data ... 32%", `ac-troubleshooting-guide.mdx:31` "ACCA ... 85%". Every other hit needs Marko-side primary-source check. See prose_stats.md for the complete list with figures and verbatim.

Note: EPA and AHRI counts include false positives where the source is cited in a legitimate context (e.g. AHRI Certified Ref# ID numbers, EPA amended final rule effective date "July 27"). Actual fabrication-risk subset after triage is likely ~30 of 63.

## 4. OG-image / Twitter template bug scope

Source: [`meta_bugs.md`](./meta_bugs.md)

- **373 of 373 built pages** ship `twitter:image = /og-image.svg` (SVG — rejected by most share renderers)
- **373 of 373 built pages** ship generic `twitter:title = "HVAC Base — Data-Driven HVAC Guides & Calculators"` and generic `twitter:description = "Expert HVAC guides with interactive calculators and unbiased recommendations."`
- **366 of 373 built pages** emit EMPTY `og:image` — no image meta tag at all
- Template origin: `app/[slug]/page.tsx:21-38` `generateMetadata` sets `openGraph.{title,description,type,publishedTime,modifiedTime}` and `alternates.canonical`, but does NOT set `twitter` block or `openGraph.images`
- Layout defaults at `app/layout.tsx:32-37`: Twitter card generic + SVG image
- No page anywhere overrides `openGraph.images` with a PNG/JPG
- Only 4 MDX files reference a `featuredImage` (all pointing to `/images/*.jpg` files that don't exist in `public/images/`)

## 5. Pages with no/broken schema

Source: [`schema.md`](./schema.md)

- **0 pages** with zero schema (schema always emits WebSite + WebPage + Article + BreadcrumbList on articles)
- **373 pages** emit a **phantom SearchAction** pointing to `/search?q=...` — no `/search` route exists (would 404)
- **353 Article schemas** emit `image = /images/logo.png` and `publisher.logo.url = /images/logo.png` — **file does not exist** (`public/images/` directory doesn't exist)
- **Organization/Publisher name mismatch**: `WebSite.name = "HVAC Base"` vs every `Article.publisher.name = "Moving Data Systems d.o.o."` — no unifying `@id`
- **Breadcrumb second-level mislabelling**: `getClusterRoute` falls through to `'articles'` for ~13 cluster names (window-air-conditioners, dehumidifiers-humidity, electrical-wiring, etc.) affecting ~130 articles — their breadcrumbs read `Home > Articles > [Title]` instead of the correct cluster hub
- **FAQPage schema is client-side only** (`components/ui/FAQ.tsx` uses `'use client'` + `<Script>`); at least 9 known articles have FAQ blocks that don't emit schema server-side
- **0 pages** with AggregateRating / Review / ratingValue / reviewCount — confirmed clean
- **13 static pages** missing `alternates.canonical`: about, brand-reviews, buying-guides, calculators, contact, cost-guides, disclaimer, editorial-policy, how-to, hvac-dictionary, privacy, terms, troubleshooting

## 6. Thin / duplicate pages

Source: [`content.md`](./content.md)

- **158 of 355 articles are thin (<600 words)** = 45% of corpus
- **214 of 355 articles are <1000 words** = 60% of corpus
- **0 inline images across all 355 MDX** — zero charts, diagrams, product photos, wiring diagrams anywhere
- Near-duplicate cluster candidates:
  - `energy-efficiency-ratings` SEER-comparison series (5 articles, high overlap)
  - `ac-sizing-selection` room-size series (500/1000/1500/2000/2500/3000 sq ft)
  - `air-quality` best-air-purifier variants (10+ articles)
  - `mini-split-air-conditioners` 26 articles, zone-count series + garage/small/DIY variants

## 7. Other findings

### Routes ([`routes.md`](./routes.md))
- 373 real routes emitted (353 articles + 20 static)
- 2 MDX files silently dropped from build because they lack `slug:` frontmatter: `mini-split-in-cold-climates.mdx`, `mini-split-amps.mdx`
- 0 duplicate slugs, 0 slug ≠ filename mismatches

### External links ([`links_external.md`](./links_external.md))
- 2,644 external `href` hits across **229 unique domains**
- Top authoritative citations: energy.gov (540), energystar.gov (439), eia.gov (166), ahridirectory.org (165), epa.gov (159), ashrae.org (121), acca.org (106) — good signal density
- Domain diversity is healthy

### Sitemap / crawl ([`crawl.md`](./crawl.md))
- `robots.txt` clean, no wrongful blocks
- 373 sitemap `<loc>` entries
- **3 sitemap-only entries returning 404 in prod**: `mini-split-amps`, `mini-split-in-cold-climates`, `what-is-a-heat-pump`
- **3 real routes missing from sitemap**: `/calculators`, `/hvac-efficiency-texas`, `/trane-vs-carrier`
- Sitemap is static (not `app/sitemap.ts` generated), so it will drift

### Assets ([`assets.md`](./assets.md))
- `public/` contains only: BingSiteAuth.xml, authors/{marko-visic.jpg, marko-visic-large.jpg}, favicon.svg, google verification, og-image.svg, robots.txt, site.webmanifest, sitemap.xml
- **6 referenced assets are MISSING**: `/apple-touch-icon.png`, `/favicon.ico`, `/images/logo.png`, plus 4 article `featuredImage` JPGs
- Zero PNG/JPG OG images anywhere on the site
- Zero body-content images

### E-E-A-T ([`eeat.md`](./eeat.md))
- Author images present (marko-visic.jpg, marko-visic-large.jpg)
- Byline consistency: PASS (physicist / BSc Physics / Founder & Author / sole author and editor — coherent across schema, AuthorBox, about, editorial-policy)
- **157 articles** have `datePublished == dateModified` strict; **211** have no distinct dateModified
- **184 articles** batch-stamped in 4-day launch window 2026-02-05..08 (52% of corpus)
- **114 articles** stamped on a single day (2026-02-05) — 32% of corpus with same date

## Files in this inventory

Detail files (one per section A–K):
- `routes.md`, `links_internal.md`, `links_external.md`, `schema.md`, `metadata.md`, `content.md`, `crawl.md`, `assets.md`, `prose_stats.md`, `meta_bugs.md`, `eeat.md`

Raw data:
- `metadata_full.json` — per-route emitted metadata
- `prose_hits_full.json` — every prose-stat hit with file/line/verbatim
- `orphans_full.txt` — full 215-page orphan list
- `external_by_domain.json` — external URLs grouped by domain
- `external_domains_full.txt` — 229 domains by frequency
- `dates_full.json` — every article's datePublished / dateModified

Total: 11 markdown detail files + 6 backing data files. All read-only.
