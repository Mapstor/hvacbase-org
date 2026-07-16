# Per-Page Metadata Inventory

Ground truth: `.next/server/app/*.html` (as rendered by Next 14 build).

## Headline problems

- **366 of 373 pages emit NO `og:image` meta tag at all** (Article routes)
- **373 of 373 pages ship `twitter:image=/og-image.svg`** — SVG format that Twitter/Facebook/Slack renderers reject. Every share preview will fail.
- **373 of 373 pages ship generic `twitter:title` and `twitter:description`** — 'HVAC Base — Data-Driven HVAC Guides & Calculators' / 'Expert HVAC guides with interactive calculators and unbiased recommendations.' No per-article overrides anywhere.
- **13 static pages have no canonical URL emitted**: about, brand-reviews, buying-guides, calculators, contact, cost-guides, disclaimer, editorial-policy, how-to, hvac-dictionary, privacy, terms, troubleshooting
- **339 of 373 pages have `<title>` > 60 chars** (SERP truncation risk)
- **201 titles > 70 chars** (guaranteed truncation)
- Titles < 30 chars: 2
- Duplicate titles: 1 group (HVAC Base — Data-Driven HVAC Guides, Calculators & Comparisons x 4 — the 4 pages without their own `metadata`: `disclaimer`, `privacy`, `terms`, `/` (home))
- Duplicate descriptions: 1 group (same 4 pages inherit layout description)
- H1 count problems: 0 pages with zero H1, 0 pages with >1 H1 (all correct)

## Twitter template inheritance is the primary bug

Root cause is in `app/[slug]/page.tsx` `generateMetadata` — it sets `title`, `description`, `openGraph.title`, `openGraph.description`, `openGraph.type='article'`, `openGraph.publishedTime`, `openGraph.modifiedTime`, `alternates.canonical`. But it never sets `twitter` or `openGraph.images`. Next then falls back to the root layout defaults for those:

- `twitter.card = 'summary_large_image'`
- `twitter.title = 'HVAC Base — Data-Driven HVAC Guides & Calculators'`
- `twitter.description = 'Expert HVAC guides with interactive calculators and unbiased recommendations.'`
- `twitter.images = ['/og-image.svg']`
- `openGraph.images = [{ url: '/og-image.svg', ... }]`

Because the article template resets `openGraph` (partial spread), the `images` array is dropped for articles — that's why `og:image` is empty on 366 pages. On the 7 pages where it IS present (home, about, contact, disclaimer, editorial-policy, privacy, terms), it's the SVG.

Full trace covered in `meta_bugs.md`.

## Per-page table (title, description length, canonical presence, og image, twitter fields)

Excerpt (first 40 rows, ordered by title length descending). Full JSON dump at `AUDIT_INVENTORY/metadata_full.json`.

| Route | title len | desc len | canonical | og:image | tw:title override | tw:image |
|---|---|---|---|---|---|---|
| energy-star-tax-credits | 107 | 253 | yes | EMPTY | yes | SVG |
| hvac-tax-credits-2026 | 104 | 237 | yes | EMPTY | yes | SVG |
| hvac-refrigerant-phase-out | 101 | 185 | yes | EMPTY | yes | SVG |
| indoor-air-quality-guide | 101 | 181 | yes | EMPTY | yes | SVG |
| insulation-r-value-guide | 101 | 167 | yes | EMPTY | yes | SVG |
| whole-house-ventilation-systems | 100 | 190 | yes | EMPTY | yes | SVG |
| hvac-rebates-by-state | 97 | 203 | yes | EMPTY | yes | SVG |
| seer-rating-tax-credits | 96 | 281 | yes | EMPTY | yes | SVG |
| how-to-improve-indoor-air-quality | 95 | 180 | yes | EMPTY | yes | SVG |
| specific-heat-capacity-calculator | 95 | 208 | yes | EMPTY | yes | SVG |
| best-indoor-air-quality-monitors | 94 | 179 | yes | EMPTY | yes | SVG |
| refrigerant-types-explained | 94 | 218 | yes | EMPTY | yes | SVG |
| water-heater-guide | 93 | 202 | yes | EMPTY | yes | SVG |
| heat-pump-tax-credits-2026 | 92 | 249 | yes | EMPTY | yes | SVG |
| home-battery-backup-guide | 92 | 210 | yes | EMPTY | yes | SVG |
| how-long-does-water-heater-last | 91 | 193 | yes | EMPTY | yes | SVG |
| carbon-monoxide-detector-guide | 88 | 208 | yes | EMPTY | yes | SVG |
| hvac-noise-levels-explained | 88 | 227 | yes | EMPTY | yes | SVG |
| outdoor-portable-tankless-heaters | 88 | 192 | yes | EMPTY | yes | SVG |
| 25c-tax-credit-explained | 87 | 245 | yes | EMPTY | yes | SVG |
| electric-water-heating-cost | 87 | 217 | yes | EMPTY | yes | SVG |
| furnace-maintenance | 87 | 204 | yes | EMPTY | yes | SVG |
| 15-2-seer2-vs-16-seer | 86 | 204 | yes | EMPTY | yes | SVG |
| generator-cost-per-kwh | 86 | 185 | yes | EMPTY | yes | SVG |
| medify-air-purifiers | 86 | 221 | yes | EMPTY | yes | SVG |
| moisture-barrier-crawl-space | 86 | 178 | yes | EMPTY | yes | SVG |
| do-furnaces-have-pilot-lights | 85 | 187 | yes | EMPTY | yes | SVG |
| hvac-efficiency-texas | 85 | 183 | yes | EMPTY | yes | SVG |
| tankless-water-heater-cost | 85 | 204 | yes | EMPTY | yes | SVG |
| voc-in-home-sources | 85 | 201 | yes | EMPTY | yes | SVG |
| wire-gauge-chart | 85 | 186 | yes | EMPTY | yes | SVG |
| dyson-air-purifiers | 84 | 235 | yes | EMPTY | yes | SVG |
| heat-pump-water-heater-guide | 84 | 213 | yes | EMPTY | yes | SVG |
| home-energy-audit-diy | 84 | 201 | yes | EMPTY | yes | SVG |
| how-many-amps-does-generator-produce | 84 | 183 | yes | EMPTY | yes | SVG |
| how-to-identify-mold | 84 | 154 | yes | EMPTY | yes | SVG |
| levoit-air-purifiers | 84 | 195 | yes | EMPTY | yes | SVG |
| time-of-use-rates-explained | 84 | 202 | yes | EMPTY | yes | SVG |
| 16-seer-vs-14-seer | 83 | 187 | yes | EMPTY | yes | SVG |
| hot-water-recirculating-pump | 83 | 193 | yes | EMPTY | yes | SVG |

Total: **373 routes** covered. See metadata_full.json for the complete per-route dump.
