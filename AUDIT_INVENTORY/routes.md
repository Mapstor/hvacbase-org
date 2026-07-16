# Route & Page Inventory

Ground truth: `.next/server/app/*.html` from the fresh local build.

## Headline counts

- Total real routes emitted by build: **373** (excludes `_not-found`)
- Home (`/`) built as `index.html`
- Static top-level pages: **20** (`/about`, `/air-conditioning`, `/air-quality`, `/articles`, `/brand-reviews`, `/buying-guides`, `/calculators`, `/contact`, `/cost-guides`, `/disclaimer`, `/editorial-policy`, `/energy-efficiency`, `/heat-pumps`, `/heating`, `/how-to`, `/hvac-dictionary`, `/privacy`, `/terms`, `/troubleshooting`, `/`)
- MDX articles routed through `app/[slug]/page.tsx`: **353** distinct slugs (unique, no dupes)
- Calculator-typed articles (contentType or slug contains "calculator"): 27

## MDX inventory

- Total `.mdx` files under `content/`: **355**
- MDX files with a `slug:` field: **353**
- MDX files WITHOUT `slug:` (silent build drop, never routed):
  - `content/mini-split-air-conditioners/mini-split-in-cold-climates.mdx`
  - `content/mini-split-air-conditioners/mini-split-amps.mdx`
  - Both are listed in the sitemap. Both 404 in production because `getAllSlugs()` never picks them up.
- Duplicate slugs across the corpus: **0**
- Slug ≠ filename base-name: **0** (excluding the two missing-slug files)

## Cluster distribution (35 clusters seen in frontmatter)

Top 10 by article count:

| Cluster | Articles |
|---|---|
| mini-split-air-conditioners | 26 |
| furnaces-heating | 25 |
| energy-efficiency-ratings | 24 |
| window-air-conditioners | 22 |
| air-purifiers-air-quality | 21 |
| ac-sizing-selection | 19 |
| dehumidifiers-humidity | 19 |
| portable-air-conditioners | 18 |
| tankless-water-heaters | 15 |
| electrical-wiring | 14 |

Note: `lib/cluster-mapping.ts` `validRoutes` list only recognizes 12 of these clusters. Any article whose `cluster` frontmatter doesn't map to a valid route falls through to `'articles'` for breadcrumb generation. Clusters like `window-air-conditioners`, `air-purifiers-air-quality`, `dehumidifiers-humidity`, `electrical-wiring`, `space-heaters-portable-heating`, `central-air-hvac-systems`, `seer-comparisons`, `smart-home-thermostats`, `air-purifier-brands`, `fireplaces-stoves`, `mold-moisture-control`, `ductwork-ventilation`, `evaporative-coolers-fans` all fall through — meaning their breadcrumbs point to `/articles` instead of a semantically correct hub. See `schema.md`.

## Route drift vs sitemap

Fully covered in `crawl.md`. Summary:

- Sitemap-only (404 risk in production): `mini-split-amps`, `mini-split-in-cold-climates`, `what-is-a-heat-pump`
- Built-only (missing from sitemap): `calculators`, `hvac-efficiency-texas`, `trane-vs-carrier`

## Route inventory grouped by type

- **Static** (20): about, air-conditioning, air-quality, articles, brand-reviews, buying-guides, calculators, contact, cost-guides, disclaimer, editorial-policy, energy-efficiency, heat-pumps, heating, how-to, hvac-dictionary, privacy, terms, troubleshooting, `/` (home)
- **Calculator-typed articles**: 27 (see `content/**/*calculator*.mdx` and articles with contentType=calculator)
- **Article/guide/reference/comparison**: ~326

## Orphan MDX

No orphan MDX files (all 353 with slugs are built). The two files without slugs are the only pure orphans on the content side.

## Notes for downstream fixes

- The two missing-`slug` MDX files should either get their slug added (and become real routes) or be removed from the sitemap.
- `what-is-a-heat-pump` sitemap entry references content that doesn't exist at all — no MDX, no built HTML. Straight 404 in prod (delete from sitemap OR create the content).
- `hvac-efficiency-texas` and `trane-vs-carrier` are real routes missing from sitemap — add them.
