# RAPTIVE_AUDIT.md

Comprehensive pre-Raptive/AdSense compliance audit of hvacbase.org — synthesis of 5 independent scans (A: fabricated claims; B: internal contradictions; C: AI-scale signals; D: content quality; E: technical/policy/monetization surface). Corpus: 374–375 pre-rendered HTML files under `.next/server/app/` and 355 MDX sources under `/workspace/content/`.

---

## Executive Summary

- **Overall verdict:** **BLOCKERS PRESENT** — the site is not ready for Raptive submission.
- **Findings by severity:** **28 BLOCKER · 18 SHOULD-FIX · 11 NOTE** (total 57).
- **Findings by category:** A = 11 · B = 1 · C = 7 · D = 32 · E = 6.
- **Corpus scanned:** 374 built HTML files, 354 rendered articles, 355 MDX sources, 6 policy pages, 1 sitemap (374 URLs).

### Top 5 risks (in monetization-review order)

1. **`public/ads.txt` is completely missing** (E5). Raptive will not activate monetization without it; AdSense flags the site as "not authorized to sell". Zero-day blocker.
2. **Zero original photography across 354 articles** (C3). No `<img>` inside any `<article>`; `/public/` contains only 2 author avatars + 1 logo + favicons. Single clearest AI-farm signature a manual reviewer will see.
3. **FAQ-count bimodal spike + universal chrome** (C1). 87.9% of articles land on exactly 8 or 10 FAQs (221 pages at 10, 90 at 8); 55.1% share the identical (10-FAQ + table + callout + sources) skeleton. Diagnostic of a generator template.
4. **4-page programmatic near-duplicate family**: `best-2/3/4/5-zone-mini-split` — H2 Jaccard = **1.00** across all 6 pairwise comparisons, first-sentence and section-openers identical modulo the digit, each under 800 words (D2 + C2). Direct match to Google's scaled-content-abuse policy.
5. **Two fabricated-credibility badges on `/buying-guides`** — "100% Unbiased Reviews" and "Editor's Choice" (A1) — directly contradict the site's own editorial-policy (sole author, no lab, no panel). Fix is a 2-line copy edit; the risk is that a reviewer clicks the About page and catches the contradiction.

Secondary risks worth flagging: 15 articles below the 800-word floor (D1); 28% of the corpus is >50% list/table/FAQ scaffolding vs prose (D3); one MDX orphan means the sitemap ships 354 articles instead of 355 (E5); About + Contact pages have no last-updated timestamp (E4).

---

## Summary Table

| Section | Check | BLOCKER | SHOULD-FIX | NOTE |
|---|---|---:|---:|---:|
| A — Fabricated / unverifiable claims | A1 self-credentials | 2 | 0 | 2 |
| A — Fabricated / unverifiable claims | A2 marketing absolutes | 0 | 1 | 5 |
| A — Fabricated / unverifiable claims | A3 first-person testing | 0 | 0 | 1 |
| A — Fabricated / unverifiable claims | A4/A5 stats + personas | 0 | 0 | 0 |
| **A subtotal** |  | **2** | **1** | **8** |
| B — Internal contradictions | B1 policy conflicts | 0 | 0 | 0 |
| B — Internal contradictions | B2 sitewide counts | 0 | 0 | 1 |
| B — Internal contradictions | B3 date consistency | 0 | 0 | 0 |
| **B subtotal** |  | **0** | **0** | **1** |
| C — AI-scale signals | C1 structural uniformity | 2 | 0 | 0 |
| C — AI-scale signals | C2 templated prose | 0 | 2 | 0 |
| C — AI-scale signals | C3 originality (photos / measurement / viz) | 2 | 1 | 0 |
| **C subtotal** |  | **4** | **3** | **0** |
| D — Content quality | D1 thin content (<800w) | 10 | 5 | 0 |
| D — Content quality | D2 duplicate / templated families | 1 | 2 | 0 |
| D — Content quality | D3 table/list-heavy scaffolding | 9 | 5 | 0 |
| **D subtotal** |  | **20** | **12** | **0** |
| E — Technical / policy | E1 metadata (title/desc/canonical/og) | 0 | 0 | 0 |
| E — Technical / policy | E2 JSON-LD schema | 0 | 1 | 0 |
| E — Technical / policy | E3 internal linking | 0 | 0 | 1 |
| E — Technical / policy | E4 policy surface | 0 | 1 | 0 |
| E — Technical / policy | E5 sitemap / robots / ads.txt | 2 | 0 | 1 |
| **E subtotal** |  | **2** | **2** | **2** |
| **TOTAL** |  | **28** | **18** | **11** |

---

## Section A — Fabricated / Unverifiable Claims

Corpus: all 375 pre-rendered `.html` under `/workspace/.next/server/app/`. The site is honestly framed overall — `about.html` and `editorial-policy.html` disclose a single author (Marko Visic), explicitly state "we do not run a testing laboratory", disclaim first-hand testing, and reserve "licensed / NATE / EPA-certified" language for reader advice (never as a site credential). A3 (first-person testing), A4 (fabricated stats), and A5 (personas / testimonials) came back clean after triage. Two concrete problems and one systemic marketing pattern remain.

### A1 — Self-credentials / staff claims

- **BLOCKER — `/workspace/app/buying-guides/page.tsx` (rendered `buying-guides.html`, hero section)**
  "**100% Unbiased Reviews**" badge is unfalsifiable and pattern-matches Google's AI-scaled-content signal. The editorial-policy grounds independence in the concrete policy "no affiliate links, no paid reviews" — the badge overstates that into an absolute claim.
  Fix: replace with the substantive line "No affiliate links. No paid placements."
  Context: `📐 Size Calculator ⚡ Energy Savings 🔧 Maintenance Guide 🛠️ Troubleshooting  100% Unbiased Reviews  2026 Updated Guides`

- **BLOCKER — `/workspace/app/buying-guides/page.tsx` ("Featured Buying Guides" section, `buying-guides.html`)**
  "**Editor's Choice**" label on the Furnace vs Heat Pump card implies an editorial staff/panel curated the pick. `about.html` and `editorial-policy.html` state Marko Visic is sole author and editor.
  Fix: rename to "Featured guide" or "Most-read comparison".
  Context: `Featured Buying Guides   Editor's Choice   Furnace vs Heat Pump: Which Is Better?`

- **NOTE — global footer on all 375 pages** — "Editorially Independent — No Affiliate Links" stat tile. Defensible because `editorial-policy.html` backs it with a concrete policy. Logged for the record.
- **NOTE — footer disclaimer on 375 pages + `about.html` + `disclaimer.html`** — every "licensed / NATE / EPA-certified" hit is reader advice or accurate regulatory statement, never a self-credential. Explicit disclaimer on `about.html`: "Marko is a physicist, not a licensed HVAC contractor — nothing here is a substitute for a licensed professional." No action.

### A2 — Marketing absolutes

- **SHOULD-FIX — systemic across ~12 pages** — self-labeling as "**the definitive** guide / reference / comparison / solution". Unfalsifiable; reads as marketing on a sole-author technical site.
  Affected slugs (marketing self-label uses, replace):
  `25c-tax-credit-explained` · `air-changes-per-hour-calculator` · `air-quality` (2 hits) · `dehumidifier-guide` · `electric-vs-gas-tankless` · `heating` · `indoor-air-quality-guide` · `most-energy-efficient-dehumidifiers` · `space-heater-guide` · `whole-house-ventilation-systems` · `window-air-conditioners` · `wire-for-220-volt`.
  Leave (objective/technical uses): `cracked-heat-exchanger`, `how-to-identify-mold`, `how-long-do-furnaces-last`, `what-wire-size-for-30-amp`.
  Fix: descriptive framing e.g. "A physics-grounded guide to X", "Full 2026 comparison of X".

- **NOTE — "100%" sitewide** — 120 files. After classification, every non-"unbiased" use is technical (100% capacity, 100% AFUE, 100% load, 100% on/off). Leave.
- **NOTE — "guaranteed" sitewide** — 7 files. All refer to manufacturer warranties ("Alen Forever Guarantee") or physics ("a HEPA filter in a box is guaranteed to work"). Leave.
- **NOTE — "always" sitewide** — 375 files. Dominated by the footer disclaimer "Always consult licensed HVAC professionals..."; in-body uses are correct safety/regulatory advice ("always derate per NEC 310"). Leave.
- **NOTE — "#1" sitewide** — 88 files. Ranking-list uses on ranking articles are defensible (methodology disclosed); "the #1 cause of X" is consumer voice. Leave.
- **NOTE — "proven" sitewide** — 53 files. All refer to established equipment/methods, not self-claims. Leave.

### A3 — First-person testing claims

- **NOTE — whole corpus** — CLEAN. Zero hits for "we tested", "we measured", "we monitored"; zero claims of an owned lab. No action.

### A4 — Statistics/citations

- Per Section A summary: ~30 EPA / DOE / ACCA / ASHRAE / ENERGY STAR statistics are individually verifiable and were flagged for spot-check only, not as defects.

### A5 — Personas / testimonials

- No fabricated personas, no fake testimonials, no invented team pages found. Clean.

---

## Section B — Internal Contradictions

Cross-referenced 375 built HTMLs against authoritative source claims in `/workspace/app/about/page.tsx` and `/workspace/app/editorial-policy/page.tsx`. All three subchecks came back CLEAN.

- **B1 policy conflicts:** 0. No page contradicts "no affiliate links", "not a licensed HVAC contractor", or "no testing lab / no first-person measurements".
- **B2 sitewide counts:** 1 distinct value each — 355 articles, 9 interactive calculators, 355 guides — uniform across every page's nav/footer.
- **B3 date consistency:** 375/375 article-footer "Updated <date>" strings exactly match the JSON-LD `dateModified`. 0 pages show a >12-month gap vs today. The two "updated regularly" claims (`index.html`, `hvac-rebates-by-state.html`) are backed by ≥20 commits in the past 7 days.

### The one informational note

- **NOTE — sitewide "9 interactive calculators" vs 17 files on disk (`/workspace/.next/server/app/`)**
  The claim "9 interactive calculators" is uniform across pages (passes the cross-page-consistency check that fixes 9 as truth), BUT the built app actually contains 17 files matching `*-calculator.html`:
  `3-phase-power`, `ac-tonnage`, `air-changes-per-hour`, `air-conditioner-btu`, `ductwork-sizing`, `furnace-sizing`, `heat-pump-running-cost`, `heat-pump-size`, `heating-cost`, `kwh-cost`, `mini-split-sizing`, `power-consumption`, `seer2-comparison`, `seer2-savings`, `solar-panel`, `specific-heat-capacity`, `water-heater-sizing`.
  Either the sitewide "9" is under-counting by ~8, or several files are non-canonical/duplicates. Recommend confirming which reading is correct before promoting/demoting.

---

## Section C — AI-Scale Signals

Scanned 354 rendered article HTMLs (355 MDX total; `mini-split-in-cold-climates.mdx` failed to render → excluded — see E5). The site pattern-matches an AI-scaled content farm on almost every axis a reviewer checks. Only word count looks natural.

### Quantitative signals

| Signal | Value | Interpretation |
|---|---|---|
| Articles with exactly 10 FAQs | 221 / 354 (62.4%) | Bimodal spike |
| Articles with exactly 8 FAQs | 90 / 354 (25.4%) | Bimodal spike |
| Articles landing on 8 or 10 FAQs | 87.9% | Diagnostic of generator template |
| FAQ-count stdev / mean / median | 1.93 / 8.91 / 10 | Suspiciously tight |
| Articles containing a `<table>` | 354 / 354 (100%) | Universal chrome |
| Articles containing a Callout / Key-Takeaway | 343 / 354 (96.9%) | Universal chrome |
| Articles containing a Sources heading | 314 / 354 (88.7%) | Universal chrome |
| Pages sharing (10-FAQ + table + callout + sources) skeleton | 195 / 354 (55.1%) | Template match |
| Pages matching one of top 2 compact skeletons | 280 / 354 (79.1%) | Template match |
| Distinct compact skeletons across corpus | 17 | Very low variety |
| Articles with any body `<img>` (original photo) | 0 / 354 | Zero originality |
| Total scene `<img>` tags in article bodies | 0 | Zero originality |
| Unique scene image URLs | 0 | Zero originality |
| `/public/` photo files (non-avatar / non-logo / non-favicon) | 0 | Zero originality |
| Articles with "we measured" or "I measured" | 0 / 354 | Zero measurement claims |
| Articles with any first-person anecdote pattern | 2 / 354 (0.6%) | Negligible |
| Articles with zero first-hand signal (no diagram, calc, anecdote, measurement) | 331 / 354 (93.5%) | Systemic |
| Articles with an original diagram component | 21 / 354 (5.9%) | Thin |
| Articles with a calculator embed | 59 / 354 (16.7%) | Thin |
| Articles with a large inline SVG | 43 / 354 | Thin |
| Body-word-count mean / median / stdev | 1,703 / 1,661 / 732 | Natural distribution |
| Full-article word-count mean / median / stdev | 1,931 / 1,900 / 754 | Natural distribution |
| Word-count spread | 386 – 4,536 | Natural spread |
| Verbatim first-sentence duplicates | 0 | Not caught by simple n-gram |
| Normalized first-sentence repeats ≥ 2 | 2 | Low |
| Verbatim section-opener repeats ≥ 3 | 5 | Low |

### C1 — Structural uniformity

- **BLOCKER — `/workspace/content/`, all article MDX** — **FAQ-count bimodal clustering.** 221/354 pages contain EXACTLY 10 FAQs, 90/354 contain EXACTLY 8 — together 87.9% of pages on one of two integers. Any reviewer running a schema-level histogram sees the 8/10 spike immediately.
  Fix: let FAQ count follow the topic (some pages 3, some 15, some 0); inline short Q&A within body text instead of forcing a boxed FAQ block on every page.
  Histogram: `{0:8, 4:2, 5:8, 6:17, 7:3, 8:90, 9:1, 10:221, 11:4}` — mean 8.91, median 10, stdev 1.93.

- **BLOCKER — `/workspace/content/`, all article MDX** — **Universal structural chrome.** 100% of articles have a `<table>`, 96.9% a Callout, 88.7% a Sources heading; 55.1% share the identical (10-FAQ + table + callout + sources) skeleton; only 17 distinct compact skeletons exist across the corpus.
  Fix: let layout vary with topic — a definition doesn't need a comparison table; a step-by-step doesn't need a Key-Takeaways box; a numeric explainer doesn't need 10 FAQs.
  Top compact skeletons: (10-FAQ+tbl+call+src) = 195 (55.1%); (8-FAQ+tbl+call+src) = 85 (24.0%); (10-FAQ+tbl+call+no-src) = 26 (7.3%).

### C2 — Templated prose

- **SHOULD-FIX — `/workspace/content/mini-split-air-conditioners/best-2-zone-mini-split.mdx` (+ 3-, 4-, 5-zone siblings)** — identical templated prose modulo the digit. All four articles open with: *"A N-zone mini split system connects one outdoor unit to N indoor air handlers, each in a separate room with independent temperature control."* and repeat: *"Multi-zone cost efficiency: A N-zone system costs 30-40% less per zone than installing N separate single-zone systems because the outdoor unit, electrical work, and setup are shared."* verbatim. This is exactly the pattern Google's scaled-content-abuse guidance flags.
  Fix: consolidate 2/3/4/5-zone into one canonical multi-zone comparison page with an N-selector, or fully rewrite each intro with a topic-specific hook (2-zone = master + guest; 3-zone = small home zoning; 4-zone = whole-home retrofit; 5-zone = large / multi-story).

- **SHOULD-FIX — `/workspace/components/calculators/BTUCalculator.tsx` + water-heater spec block** — shared component copy renders verbatim across many pages. *"Exact cooling capacity for any room. Updates as you change inputs."* appears on **26** article pages; the water-heater spec pattern *"UEF: X | Capacity: Y gal | FHR: Z gal | Warranty: N-year tank, N-year parts"* appears **5** times inside `/best-water-heaters` alone. Not prose duplication (UI chrome), but a spam n-gram model does not distinguish.
  Fix: vary the calculator description with the article's use-case, or move it to `alt` / `aria` attributes.

### C3 — Originality (photos, measurement, visualization)

- **BLOCKER — `/workspace/public/`** — **Zero original photography anywhere on the site.** Across 354 rendered article HTMLs, zero `<img>` tags appear inside `<article>`, and zero non-icon `<img>` tags exist anywhere in the page. The only images served are 64px / 256px Next/Image variants of `/authors/marko-visic.jpg`. `/public/` inventory = 2 avatars (`marko-visic.jpg`, `marko-visic-large.jpg`) + `logo.png` + favicons — no product shots, no installation photos, no anatomy diagrams, no test-setup photos. This is the single clearest AI-farm signature: an HVAC content site with 354 articles and zero photographs of any HVAC equipment.
  Fix: even one genuine photo per article (writer's own equipment, labeled anatomy photo, utility-bill screenshot) breaks the pattern.

- **BLOCKER — `/workspace/content/`, all article MDX** — **Zero measurement claims + negligible anecdote.** 0/354 articles contain any "we measured" / "I measured" construction. Only 2/354 (0.6%) match ANY first-person anecdote pattern. 331/354 (93.5%) have no first-hand signal at all. Combined with the photography finding, an auditor cannot point to a single article that demonstrably reflects hands-on experience.
  Fix: add a per-article "How we know" block with a concrete first-hand data point (runtime measurement, decibel reading, wattmeter number).

- **SHOULD-FIX — `/workspace/content/`, corpus-wide** — thin visualization coverage. Only 21/354 (5.9%) embed a diagram component (8 diagram components exist: `BatteryRuntimeByLoad`, `CarbonMonoxideDetectorPlacement`, `ComparisonChart`, `DataChart`, `DryModeVsCoolMode`, `EfficiencyCurve`, `RefrigerationCycle`, `ScaleDiagram`); only 59/354 (16.7%) embed a calculator. Portfolio-page-quality bar demands original data visualization on every page.
  Fix: raise custom-diagram coverage; every ranking/comparison/cost article should carry at least one topic-specific chart or diagram.

---

## Section D — Content Quality

Content-quality audit of 354 rendered SSR articles.

### Aggregate

| Metric | Count |
|---|---:|
| Total articles | 354 |
| Articles under 800 rendered words | 15 |
| Duplicate H2-skeleton pairs | 7 |
| Articles > 50% list/table/FAQ words | 100 (28%) |
| Articles shipping with 0 in-article images and 0 diagrams | 333 (94%) |
| Articles carrying an original SVG diagram (`viewBox="0 0 800 …"`) | 21 |
| Identical-H2 family (best-N-zone-mini-split) size | 4 |

### D1 — Thin content (rendered words inside `<article>`)

BLOCKER floor: < 800 words on a topic that demands depth.

| # | Slug | Words | Notes |
|---|---|---:|---|
| 1 | `app/cassette-ceiling-air-conditioners` | 371 | Thinnest page in corpus + 69.8% list/table |
| 2 | `app/ac-dry-mode-vs-dehumidifier` | 435 | |
| 3 | `app/mini-split-line-set-covers` | 439 | |
| 4 | `app/smallest-mini-splits` | 502 | |
| 5 | `app/best-mini-split-for-garage` | 519 | |
| 6 | `app/best-2-zone-mini-split` | 635 | + identical H2s to 3/4/5-zone |
| 7 | `app/best-3-zone-mini-split` | 649 | + identical H2s |
| 8 | `app/best-4-zone-mini-split` | 660 | + identical H2s |
| 9 | `app/low-profile-window-acs` | 661 | |
| 10 | `app/best-5-zone-mini-split` | 672 | + identical H2s |

SHOULD-FIX (664–789 words):
`app/senville-mini-split-reviews` (664, brand-review depth) · `app/smallest-window-acs` (719, 66.3% list/table) · `app/casement-window-air-conditioners` (753, 65.3% list/table) · `app/mrcool-3rd-gen-vs-4th-gen` (786) · `app/window-ac-with-heater` (789).

### D2 — Duplicate / templated families

- **BLOCKER — `app/best-2-zone-mini-split`, `app/best-3-zone-mini-split`, `app/best-4-zone-mini-split`, `app/best-5-zone-mini-split`** — 4-page programmatic family with IDENTICAL H2 skeleton. Jaccard(H2 sets) = **1.000** for all 6 pairwise comparisons. Combined with the C2 first-sentence duplication and D1 thin-content on all four members, this is a direct match for Google spam-policy scaled-content abuse.
  Fix: consolidate to one page with an N-selector, or rewrite each with N-specific H2s.

- **SHOULD-FIX — `app/ac-size-for-2500-sq-ft`, `app/ac-size-for-3000-sq-ft`** — Jaccard = **0.625**, second-highest overlap outside the mini-split family. Likely part of a wider `ac-size-for-Nsqft` template family (500/1000/1500/2000/2500/3000) that should be audited for the same pattern.

- **SHOULD-FIX — `app/best-10000-btu-air-conditioners`, `app/best-12000-btu-air-conditioners`** — second `best-N-X` family (`best-N-btu-air-conditioners`). Only 2 members currently but same programmatic-template risk — audit H2 similarity and roadmap before adding more BTU values.

### D3 — Table / list / FAQ scaffolding vs prose

Violates CLAUDE.md "every number explained in prose" and 3-sentence-paragraph rule when >50% of body words are non-prose.

BLOCKER (>70% list/table/FAQ):

| Slug | Words | Non-prose share |
|---|---:|---:|
| `app/indoor-air-quality-testing` | 1,433 | 81.5% |
| `app/mold-remediation-cost` | 2,078 | 76.9% |
| `app/radiant-floor-heating-pros-cons` | 2,246 | 76.6% |
| `app/portable-vs-window-ac` | 2,432 | 75.2% |
| `app/how-long-do-furnaces-last` | 983 | 74.7% (thin + scaffolded) |
| `app/moisture-barrier-crawl-space` | 2,541 | 73.0% |
| `app/ac-troubleshooting-guide` | 3,051 | 72.6% (flagship page) |
| `app/how-to-identify-mold` | 2,748 | 70.8% |

SHOULD-FIX (65–70%):
`app/window-too-small-for-ac` (69.7%) · `app/boiler-vs-furnace` (68.7%, comparison flagship) · `app/hvac-energy-saving-tips` (68.5%) · `app/best-hvac-air-filters` (68.1%) · `app/furnace-maintenance` (68.1%).

BLOCKER (corpus-wide):
- **`/workspace/content/`, systemic** — 100 of 354 articles (28%) are >50% list/table/FAQ. Almost certainly a template default that emits bullet lists by default. Audit the article template and change the default to prose blocks; keep tables only where genuinely helpful.

---

## Section E — Technical / Policy / Monetization

Metadata (E1) fully clean; JSON-LD (E2) nearly clean; internal linking (E3) clean; policy surface (E4) complete with two small dates missing; monetization prerequisites (E5) have one hard blocker (`ads.txt`) and one content gap (1 orphan MDX → sitemap 354 articles instead of 355).

### E1 — Metadata

| Check | Value |
|---|---:|
| Built HTMLs scanned | 374 |
| Missing `<title>` | 0 |
| Missing `<meta description>` | 0 |
| Missing `<link rel="canonical">` | 0 |
| Missing `og:image` | 0 |
| Duplicate title groups | 0 |
| Duplicate description groups | 0 |

### E2 — JSON-LD schema

| Check | Value |
|---|---:|
| Articles with `Article` schema | 354 / 354 |
| Articles with `Organization` schema | 354 / 354 |
| Articles with `BreadcrumbList` schema | 354 / 354 |
| Articles with `FAQPage` schema | 347 / 354 |
| Articles with visible FAQ but no `FAQPage` schema | **8** |
| Malformed JSON-LD blocks | 0 |
| Article-schema required-field misses | 0 |

- **SHOULD-FIX — visible FAQ but no `FAQPage` JSON-LD.** 8 pages render a "Frequently Asked Questions" heading without a matching schema script — they miss Q&A rich-result eligibility that the other 347 get. Affected slugs:
  `ac-troubleshooting-guide` · `best-hvac-air-filters` · `boiler-vs-furnace` · `furnace-maintenance` · `heating-cost-calculator` · `hvac-energy-saving-tips` · `portable-vs-window-ac` · `radiant-floor-heating-pros-cons`.
  Likely cause: ad-hoc FAQ section (headers + paragraphs) instead of the `<FAQ items={[...]}>` MDX component that generates FAQPage schema. Fix by converting each page's FAQ section to the FAQ component or by adding the FAQ items array to frontmatter.

### E3 — Internal linking

| Check | Value |
|---|---:|
| Total internal hrefs | 375 |
| Broken hrefs (real) | 0 |
| Broken hrefs including dynamic-route false positives | 1 |
| Orphan pages | 0 |

- **NOTE — `/sitemap.xml` reported as broken.** False positive: `/workspace/.next/server/app/sitemap.xml/route.js` exists as a dynamic Next.js metadata route generated from `app/sitemap.ts` (374-URL body). No action; teach the crawler to whitelist Next.js metadata routes (`sitemap.xml`, `robots.txt`, `opengraph-image`) next time.

### E4 — Policy surface

| Policy page | Present | Linked from Footer.tsx | Last-updated date |
|---|:-:|:-:|---|
| `privacy.html` | Yes | Yes | Feb 12 2026 |
| `terms.html` | Yes | Yes | Feb 12 2026 |
| `disclaimer.html` | Yes | Yes | Feb 12 2026 |
| `editorial-policy.html` | Yes | Yes | Jun 26 2026 |
| `about.html` | Yes | Yes | **MISSING** |
| `contact.html` | Yes | Yes | **MISSING** |

- **SHOULD-FIX — `about.html` + `contact.html` have no last-updated timestamp.** grep for "Last updated" / "Updated" / "Reviewed" returns 0 hits in the rendered HTML. Raptive and AdSense manual reviewers explicitly check the About page for a freshness signal.
  Fix: add "Last updated: <date>" line near the top of both pages so all six policy pages carry a verifiable date within the last 12 months.

### E5 — Sitemap / robots / ads.txt (monetization prerequisites)

| Check | Value |
|---|---|
| `public/ads.txt` present | **NO — BLOCKER** |
| `public/robots.txt` present | Yes |
| `robots.txt` references sitemap | Yes |
| Sitemap URL count (`grep -c '<url>'`) | 374 |
| Sitemap static entries | 20 |
| Sitemap article entries | 354 |
| MDX files on disk | 355 |
| MDX files with valid slug | 354 |
| MDX orphans (no frontmatter) | 1 |

- **BLOCKER — `/workspace/public/ads.txt` does not exist.** `find -name ads.txt` across the tree (excluding `node_modules`) returns 0 results. Raptive **requires** a valid `ads.txt` at the site root before it will monetize; AdSense flags sites without one as "not authorized to sell". Even an empty placeholder while approval is pending is better than a 404.
  Fix: create `/workspace/public/ads.txt` at minimum with a placeholder or the Raptive-supplied lines once onboarding starts.

- **BLOCKER — `/workspace/content/mini-split-air-conditioners/mini-split-in-cold-climates.mdx`** has no `---` frontmatter block (file begins with `**Protect the line set.**`). `lib/content.ts` filters MDX without a slug out of `getAllArticles()` (code comment even names this file: "Any MDX without a slug is either a WIP orphan (like mini-split-in-cold-climates)"). Consequence: 355 MDX → only 354 slugs → sitemap ships 354 article URLs instead of 355, and no `/mini-split-in-cold-climates` page exists.
  Fix: add the frontmatter block (slug, title, description, cluster, datePublished, author) so it ships — OR delete the file so it stops counting toward the article inventory.

- **NOTE — sitemap URL count vs task expectation.** Task expected sitemap ≈ 733 or ≈ 355. Actual = 374 (20 static + 354 article), which is fully consistent with the 374 built HTMLs (no orphans-in-sitemap, no missing-from-sitemap drift). The 733 target does not correspond to any current URL surface (no tag pages, no author pages, no paginated hubs). If 733 is the goal, an additional surface (`/authors/*`, `/tag/*`, paginated clusters) must be added; otherwise recalibrate the target to 355 (contingent on the mini-split MDX fix above).

---

## Recommended Fix Order

Ordered by monetization-review criticality: hard blockers to Raptive/AdSense approval first, then policy contradictions a reviewer will click into, then structural AI-farm signals, then content-quality cleanups.

### Phase 1 — Hard blockers to Raptive submission (do these first, none is more than a day)

1. **E5-1 · Create `/workspace/public/ads.txt`.** Empty placeholder acceptable pre-approval; Raptive will supply lines during onboarding.
2. **E5-2 · Resolve the MDX orphan.** Either add frontmatter to `content/mini-split-air-conditioners/mini-split-in-cold-climates.mdx` (slug, title, description, cluster, datePublished, author) — or delete the file.
3. **A1-1 · Remove "100% Unbiased Reviews" badge from `app/buying-guides/page.tsx`.** Replace with "No affiliate links. No paid placements."
4. **A1-2 · Rename "Editor's Choice" on the Furnace vs Heat Pump card** (`app/buying-guides/page.tsx`) to "Featured guide" or "Most-read comparison".

### Phase 2 — AI-farm signals a reviewer will clock in 30 seconds

5. **C3-1 · Ship at least one original photograph per article.** Any real image (author's own equipment, labeled anatomy shot, utility-bill screenshot) starts breaking the pattern. Highest-priority pages: hero rankings, product comparisons, brand reviews.
6. **C1-1 · Break the 8/10 FAQ default.** Refactor the article template so FAQ count follows topic depth (some pages 0, some 3, some 15). Inline short Q&A into body prose instead of forcing a boxed block.
7. **C1-2 · Vary structural chrome.** Table, callout, and sources heading should be topic-driven, not universal — target < 70% presence for any single component.
8. **D2-1 / C2-1 · Consolidate or rewrite the best-N-zone-mini-split family** (`best-2/3/4/5-zone-mini-split`). One canonical page with an N-selector, or four fully unique articles with N-specific H2s and intros.
9. **C3-2 · Add a "How we know" block per article** with one concrete first-hand data point (runtime measurement, decibel reading, wattmeter reading).

### Phase 3 — Content-quality cleanups (BLOCKER-tier, ship over 1–2 weeks)

10. **D1 · Rewrite or de-index the 10 sub-800-word articles** (see D1 table above). Prioritize the thinnest 5.
11. **D3 · Rewrite the 8 >70% list/table/FAQ pages** (see D3 table above) — convert bullet dumps into narrated prose with tables as supporting scaffold, not the main body.
12. **D3-corpus · Change the article template default from bullet-heavy to prose-heavy.** 100 pages (28%) currently trip the >50% non-prose threshold.

### Phase 4 — SHOULD-FIX (do alongside Phase 3)

13. **A2 · "Definitive guide" self-labeling** on the 12 marketing-use pages listed in A2 — swap for descriptive framing.
14. **C3-3 · Raise diagram / calculator coverage** above the current 5.9% / 16.7% baseline.
15. **C2-2 · Detune shared-component boilerplate** in `components/calculators/BTUCalculator.tsx` and the water-heater spec block.
16. **D2-2 / D2-3 · Audit the `ac-size-for-Nsqft` and `best-N-btu-air-conditioners` template families** before either grows.
17. **D1-should-fix · Beef up the 5 sub-800-word SHOULD-FIX articles** (senville reviews, smallest-window-acs, casement, mrcool 3rd-vs-4th, window-ac-with-heater).
18. **D3-should-fix · Rewrite the 5 65–70% non-prose SHOULD-FIX pages** (window-too-small, boiler-vs-furnace, hvac-energy-saving-tips, best-hvac-air-filters, furnace-maintenance).
19. **E2-1 · Add `FAQPage` schema to the 8 pages** with visible FAQ but no schema (list in E2).
20. **E4-1 · Add "Last updated: <date>" to `about.html` and `contact.html`.**

### Phase 5 — NOTES (worth resolving but not gating)

21. **B2 · Reconcile the "9 interactive calculators" claim** vs the 17 `*-calculator.html` files on disk. Either update the number or remove non-canonical calculator pages.
22. **E5-3 · Decide the true sitemap target** (355 vs 733). If 733, add tag / author / paginated-hub surfaces; otherwise, restate 355 as the target once the MDX orphan is fixed.
23. **E3-1 · Whitelist Next.js metadata routes** (`sitemap.xml`, `robots.txt`, `opengraph-image`) in the internal-link crawler to eliminate the `/sitemap.xml` false positive.
24. **A2-notes · No action** on the 100% / guaranteed / always / #1 / proven surveys — all uses are technical, warranty-related, or regulatory advice.
