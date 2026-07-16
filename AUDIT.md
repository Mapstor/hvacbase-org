# AUDIT.md — hvacbase.org Raptive Rejection Remediation
**Independent re-audit. Read-only. No edits. No commits. No push.**

Audit date: 2026-06-26
Auditor: Claude Opus 4.7 (1M context)
Stack confirmed: Next.js **14.2** (App Router) + TypeScript 5.4 + Tailwind 3.4 + `next-mdx-remote` + `gray-matter`
Site age: ~2026-launched (per MDX `datePublished` frontmatter)
Skill present at `~/.claude/skills/google-ai-content-policy/`: **MISSING** (proceeded with standard Google scaled-content + E-E-A-T + Raptive publisher guidance)

Companion files in this audit set:
- `/workspace/COMPLIANCE_TRIAGE_hvacbase.md` — single-document forensic triage (covers everything below + batch plan)
- `/workspace/spec-verification.csv` — every numeric spec claim cross-referenced
- `/workspace/REMEDIATION_PLAN.md` — sequenced execution plan with gates

All `file:line` references are exact at audit time. Severity: **P0** = blocks ad review / damages portfolio reputation if Google human-reviews; **P1** = standard quality regression; **P2** = polish.

---

## A1 — Fabricated / unverifiable technical data (P0)

The single biggest cause of "this site is AI-generated and didn't verify its facts" perception. Every fabricated spec multiplies the chance of human reviewer disqualification.

### A1.1 The Mitsubishi MSZ-FS 40.1 SEER2 cluster (THE primary finding)
**The site claims, in at least 12 places across two articles, that the Mitsubishi MSZ-FS achieves 40.1 SEER2 and 14.2 HSPF2, and labels this "industry-leading" / "the highest certified efficiency ratings of any residential mini split in North America."**

This is wrong on every axis:
- The **highest mini-split SEER2 currently certified by AHRI is ~33.1** (Fujitsu AIRSTAGE 09LZBS1, per public AHRI directory listings).
- The MSZ-FS line maxes at ~32.2 SEER2 — **and only for the 6,000 BTU variant**. The 12K MSZ-FS12 (which the site's spec table is actually pricing) is **~26.1–26.3 SEER2** per AHRI cert lookups. The site is overstating by ~14 SEER2 (53%).
- The HSPF2 of 14.2 claim is similarly implausible. Top published MSZ-FS HSPF2 sits around 11.9 (6K variant).
- The MSZ-FS is positioned in Mitsubishi's catalog **between the standard MSZ-GL and the flagship MSZ-FH (H2i Plus)** — it is *not* the flagship cold-climate model. The site's claim of "best cold climate" + 40.1 SEER2 fuses two product lines into one fabricated SKU.
- The site's spec table at `best-mini-split-ac-units.mdx:56–58` also lists MSZ-FS15 at 33.5 SEER2 and MSZ-FS18 at 28.0 SEER2 — a 6.6-point drop from "12K" to "15K" that is **physically inconsistent** (efficiency typically degrades more smoothly with capacity).

**Locations** (per `spec-verification.csv`):
- `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:28, 38, 51, 56, 66, 172, 210` — 7 occurrences in one file
- `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx:29, 64, 69, 332` — 4 more occurrences
- Plus implicit cross-references in `mini-split-for-bedroom.mdx`, `best-2-zone-mini-split.mdx`, related-articles blocks, and homepage trust cards.

**Why this matters for Raptive:** A reviewer who knows the residential HVAC market (Raptive operates in the home-improvement vertical) will recognize "MSZ-FS = 40.1 SEER2" as false within 30 seconds. Once that finding lands, every other spec on the site becomes suspect.

### A1.2 The Daikin Aurora 12K spec cluster (secondary finding)
The site claims the Daikin Aurora 12K achieves 25.5 SEER2 and 13.0 HSPF2 and 13.5 EER2. Per the **AHRI-certified RXT12AVJU9/FTXV12AVJU9** (AHRI #215710688), the real numbers are 19.5–21.0 SEER2 / 10.2–10.5 HSPF2 / 12.0 EER2. Off by ~4.5 SEER2, ~2.5 HSPF2, ~1.5 EER2.

Locations:
- `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:42, 123–125, 210`
- `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx:95, 260`
- `content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx:35, 55–57`

### A1.3 The "Carrier 40HQV" mystery model
`best-mini-split-ac-units.mdx:210` and `mini-split-brands-ranked.mdx:165–168, 263` cite a "Carrier 40HQV" mini-split with **42.0 SEER2, 15.0 HSPF2, -22°F min heating**. There is no Carrier ductless mini-split model number "40HQV" in current product literature — Carrier's top single-zone ductless line is the **Infinity 38MPRAQ / 40MPHAQ** family (≈23 SEER2). The site appears to have invented or scrambled a model number. 15.0 HSPF2 would exceed every certified mini-split on the market.

### A1.4 The Senville SENL claim cluster
- **SEER2**: site says 19.0 across the SENL line; the real published value for SENL-12CD is **21.2 SEER2 (115V) / 21.3 SEER2 (220V)**. Site *understates* by ~2.2 SEER2 (unusual direction — typically sites overstate).
- **Min heating temp**: site lists "-22°F" with a "(claimed)" qualifier in a spec table, then later acknowledges "independent testing suggests reasonable heating down to about -5°F to -10°F." The 22-below claim is implausible for a sub-$1,000 unit; manufacturer datasheets show -15°F at best.
- **Warranty**: site lists 7-year compressor warranty; standard Senville LETO warranty is 5/5 (parts/compressor); 7-year only on certain bundle SKUs.
- **Reliability**: `senville-mini-split-reviews.mdx:56` cites "Estimated 15–22% failure rate at 10 years" — no public reliability study supports this. Fabricated.

### A1.5 The Fujitsu XLTH "highest HSPF2 (14.2)" claim
`content/heat-pumps/best-cold-climate-heat-pumps.mdx:33` claims the **Fujitsu XLTH achieves the highest HSPF2 (14.2) of any residential unit we tested**. Per published Fujitsu XLTH brochures, HSPF2 is in the ~12–13 range for top SKUs. 14.2 would exceed every certified residential mini-split.

### A1.6 Refrigerant claims and the 2025/2026 transition
- The AIM Act mandates GWP <700 for **new residential heat-pump installations starting Jan 1, 2026** (production cutoff was Jan 1, 2025).
- The site's mini-split articles still describe Mitsubishi MSZ-FS / MSZ-FH as R-410A while marketing them as 2026 flagship products (`best-mini-split-ac-units.mdx:62, 70`, `mini-split-brands-ranked.mdx:80`, `daikin-mini-split-reviews.mdx:80`).
- Meanwhile `content/hvac-brands/best-central-ac-brands.mdx:259` and `content/refrigerants/hvac-refrigerant-phase-out.mdx:281` correctly state that "All major brands now ship R-454B units" by Feb 2026 — **internal contradiction**.
- The MrCool 4th Gen DIY line *is* still legitimately R-410A and the site correctly cites this — but the user-facing implication ("can I install in 2026?") needs to be addressed in body copy.

### A1.7 Fabricated methodology / "controlled conditions" language
At least 12 review pages claim first-person test programs with **invented methodology specificity**. These are the most damning of the fabrications because they imply infrastructure that doesn't exist.

- `content/air-conditioners/portable-vs-window-ac.mdx:31, 74` — "We tested 24 portable ACs and 18 window units across different room sizes and conditions … We tested actual cooling capacity vs. manufacturer ratings in controlled conditions (95°F outdoor, 80°F indoor)."
- `content/air-quality/best-hvac-air-filters.mdx:31` — "We tested 47 filter models across 8 categories, measuring particle capture efficiency, airflow resistance, longevity, and real-world performance"
- `content/smart-thermostats/best-smart-thermostats.mdx:31` — "We tested and analyzed 12 smart thermostats"
- `content/heat-pumps/best-mini-split-heat-pumps.mdx:35, 73, 149` — "We evaluated 38 single-zone and multi-zone mini split models across seven categories" / "How We Tested and Ranked" / "better than any other system we tested"
- `content/heat-pumps/best-cold-climate-heat-pumps.mdx:4, 33, 35` — "We tested and compared 12 cold-climate heat pumps" / "the highest HSPF2 (14.2) of any residential unit we tested"
- `content/water-heaters/best-water-heaters.mdx:28` — "We evaluated 35+ models across tank, tankless, and heat pump categories"
- `content/evaporative-coolers/best-evaporative-coolers.mdx:68` — "We evaluated 15+ models … real-world user feedback"
- `content/evaporative-coolers/best-tower-fans.mdx:74, 363` — "We evaluated 15+ tower fans based on airflow performance (measured CFM)" / "the quietest tower fans we tested"
- `content/electric-fireplaces/best-pellet-stoves.mdx:31` — "We analyzed 28 pellet stove models"
- `content/hvac-brands/best-hvac-brands-ranked.mdx:30, 54` — "We evaluated 11 major HVAC brands across seven weighted criteria" + table headers "What We Measured"
- `content/hvac-brands/best-central-ac-brands.mdx:30` — "We analyzed 11 major brands across price, SEER2 efficiency, warranty terms, compressor technology, and contractor feedback" (the *contractor feedback* claim implies a survey panel that doesn't exist)
- `content/furnaces-heating/best-gas-furnace-brands.mdx:39, 218, 224` — "We compared 10 major gas furnace brands" + "How We Ranked the Brands" + "What We Measured"
- `content/furnaces-heating/boiler-vs-furnace.mdx:31` — "We evaluated total cost of ownership, energy efficiency, comfort characteristics"
- `content/space-heaters/radiant-floor-heating-pros-cons.mdx:31` — "We evaluated installation costs, operating expenses, comfort levels"
- `content/portable-air-conditioners/best-portable-air-conditioners.mdx:4, 38, 42` — "Real-world testing data, electricity costs, noise levels, and BTU comparisons" / "We ranked every major portable AC on the market" / "How We Ranked: Methodology"
- `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:30` — "We evaluated 40+ models across 11 brands"
- `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx:31` — "we tested or evaluated every model line referenced here"
- `content/tankless-water-heaters/best-tankless-water-heaters.mdx:32` — "We ranked units on efficiency (UEF), flow rate at realistic temperature rises"
- `content/dehumidifiers/most-energy-efficient-dehumidifiers.mdx:35` — "How We Ranked: IEF Explained"
- `content/air-quality/best-bedroom-air-purifiers.mdx:80` — "the quietest air purifier in our testing"
- `content/smart-thermostats/nest-vs-ecobee-vs-honeywell.mdx (FAQ)` — "In real-world testing across multiple climate zones, Ecobee typically saves 1–3% more annually than Nest"

**Fix template**: replace any "we tested / evaluated / measured / ranked / analyzed / compared" with: *"Rankings are based on manufacturer specifications and AHRI-certified efficiency ratings, plus published ENERGY STAR data where applicable."* Section headings like "How We Tested" → "How These Were Compared" or "Methodology: Specification Sources." Strip any specific test conditions ("95°F outdoor, 80°F indoor") that imply a lab.

---

## A2 — E-E-A-T / authorship (P0)

### A2.1 Fabricated team in static pages
- `app/about/page.tsx:54` — *"We assembled a team of HVAC experts, technical writers, and web developers to build a platform…"*
- `app/about/page.tsx:57, 599, 629` — three separate references to "thousands of daily visitors" / "thousands of people turn to HVACBase.org" / "join thousands of others who trust us"
- `app/editorial-policy/page.tsx:128` — *"All technical content is reviewed by licensed HVAC professionals with 10+ years experience"*
- `app/editorial-policy/page.tsx:234–235` — *"Licensed HVAC contractors with 10+ years experience / NATE-certified technicians"*
- `app/editorial-policy/page.tsx:241–247` — *"Professional technical writers / Home improvement specialists / Safety and code compliance experts / Consumer advocacy professionals"*
- `app/how-to/page.tsx:528` — *"Join thousands of homeowners who save money with our step-by-step guides"*
- `app/brand-reviews/page.tsx:262–263` — *"10K+ / Customer Reviews"* (no review system exists in code)
- `app/contact/page.tsx:189` — *"Our team reviews every inquiry and responds promptly"*

### A2.2 Fabricated tenure
- `app/page.tsx:79` — *"Your Trusted HVAC Resource Since 2024"* (site launched 2026 per project context)
- `app/contact/page.tsx:81` — *"Your trusted HVAC knowledge resource since 2024"*

### A2.3 Footer "Weekly Updates" claim
- `components/layout/Footer.tsx` — *"Weekly Updates / Latest HVAC Data"* trust pillar — `audit-log.md` shows updates in monthly bursts at best.

### A2.4 No real entity anywhere
- Contact page: only generic `info@hvacbase.org`, `content@hvacbase.org`, `support@hvacbase.org`. No real owner name, no real company name, no address, no phone.
- About page: no founder name, no company name beyond "HVACBase", no address, no real bio.
- Footer: no real entity attribution.
- Disclaimer: correctly says "We Are NOT: Licensed HVAC contractors / Professional engineers …" (`disclaimer/page.tsx:102`). This is the *honest* part and should be retained — but it **directly contradicts** the editorial-policy "10+ years experience reviewers" claim. The contradiction itself is a quality flag.

### A2.5 Schema author wiring
- `/workspace/lib/schema.ts` hardcodes `AUTHOR_NAME = 'HVAC Base Team'` and emits `author: { '@type': 'Organization', name: 'HVAC Base Team', url: SITE_URL }` for every Article.
- This is **less risky** than emitting a fake Person, but it does mean the *visible* "team of experts" claim has no schema backing — which means the schema is the only honest part of the E-E-A-T story today.
- Older MDX files set `author: "HVAC Expert Team"` in frontmatter (e.g. `content/air-quality/allergen-control-guide.mdx`). The schema generator does **not** read this — the visible byline does. Resulting inconsistency between visible byline and schema.

### A2.6 Brand reviews page: fake-looking ratings without methodology or schema
- `app/brand-reviews/page.tsx` displays ~15 brands with 4.0–4.9 star ratings, reliability scores (7.2–9.2), satisfaction percentages (75–95%).
- **No schema backing** (`AggregateRating` is not emitted, see A3).
- **No methodology** disclosed: what data source? AHRI reliability? Consumer Reports? Internal scoring?
- Combined with the "10K+ Customer Reviews" hero badge, this presents as a working review system that doesn't exist.

### A2.7 Fix posture per Part C of the remediation brief
The brief provides the real-identity assets to substitute (Marko Visic, BSc Physics, University of Ljubljana; Moving Data Systems d.o.o., Smolnik 62, 2342 Ruše, Slovenia). The audit confirms **none of those facts appear anywhere in the codebase today** — every replacement is greenfield. The bio framing ("physics-first HVAC education site, not a substitute for a licensed contractor") is the correct posture and resolves the editorial-vs-disclaimer contradiction noted in A2.4.

---

## A3 — Structured data / schema (P0 in places)

### A3.1 @types in use
| Type | Source | Status |
|---|---|---|
| `WebSite` | `app/layout.tsx` + `app/page.tsx:1054` | **Duplicated** — emitted twice (root metadata + homepage inline). De-dup. |
| `Organization` | `lib/schema.ts` (publisher inside Article and inline) | Thin (only name/url/logo) — **does NOT claim fake foundingDate/numberOfEmployees/founder**, which is correct posture |
| `Article` | `lib/schema.ts` `generateArticleSchema` → `app/[slug]/page.tsx` for every article | Author = Organization "HVAC Base Team" (no fake Person, good) |
| `BreadcrumbList` | `lib/schema.ts` | OK |
| `WebPage` | `lib/schema.ts` (`mainEntityOfPage` of Article) | OK |
| `SearchAction` | `lib/schema.ts` | OK but `/search?q=` not wired (cosmetic) |
| `SpeakableSpecification` | `lib/schema.ts` | OK |
| `ImageObject` | `lib/schema.ts` (logo) | OK |
| `FAQPage` / `Question` / `Answer` | defined in `lib/schema.ts` (`generateFAQSchema`) — **never wired** | Worth wiring for articles with substantive FAQ |
| `HowTo` / `HowToStep` | defined in `lib/schema.ts` — **never wired** | OK to leave off |
| `Product` + `AggregateRating` | defined in `components/SEOHead.tsx` — **never instantiated** | Dead code path that should be deleted (so it can't accidentally light up) |
| `Person` | not used | **REQUIRED** for the real-author rebuild (Part C-4 of brief) |

### A3.2 Visible-vs-schema mismatches
- **Visible "Since 2024" / "thousands of visitors" / "team of experts" on About/Contact/Homepage** vs **silent schema** (no foundingDate, no numberOfEmployees, no team) → schema is silent (good); the visible claims are the violation.
- **Visible brand-review star ratings (4.0–4.9) on `/brand-reviews`** vs **no AggregateRating schema** → schema is silent (good); visible content needs methodology disclosure or removal.
- **MDX frontmatter `author: "HVAC Expert Team"` (some older files)** vs **schema author hardcoded "HVAC Base Team"** vs **visible byline `meta.author || 'HVAC Base Team'`** → the three places disagree.
- **MDX older files use `publishedDate` + `modifiedDate`** but the schema generator reads **`datePublished` + `dateModified`** → those older files emit `datePublished: undefined` in JSON-LD. Affects ~5 files including `allergen-control-guide.mdx`, `insulation-r-value-guide.mdx`.

### A3.3 Frontmatter sample
- `content/ac-sizing-selection/air-conditioner-btu-calculator.mdx` — datePublished 2026-02-05, dateModified 2026-02-05, no `author` field → schema author = Organization (default)
- `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx` — datePublished 2026-01-15, `dateUpdated` (non-standard) 2026-01-15
- `content/heat-pumps/heat-pump-guide.mdx` — datePublished 2026-02-05, dateModified 2026-02-05
- `content/air-quality/allergen-control-guide.mdx` — `publishedDate: "2024-03-15"`, `modifiedDate: "2024-03-15"`, `author: "HVAC Expert Team"` (non-standard fields)
- `content/brand-reviews/trane-vs-carrier.mdx` — datePublished 2026-04-20, dateModified 2026-04-20

### A3.4 Fix posture
1. Delete `components/SEOHead.tsx` (dormant Product+AggregateRating path).
2. De-dup `WebSite` schema (keep one of layout vs homepage).
3. Add `Person` schema for Marko Visic on `/about` and reference it as `author` in `Article` schema (via `@id`).
4. Normalize frontmatter field names across all MDX (one-shot script: `publishedDate` → `datePublished`, `modifiedDate` → `dateModified`, `dateUpdated` → `dateModified`).
5. Wire `FAQPage` schema for the ~80 articles that have substantive `<FAQ>` blocks.

---

## A4 — Broken renders / template leakage (P1)

### A4.1 The `@/components/mdx` import string
13 heat-pump MDX files (`content/heat-pumps/*.mdx`) import from `'@/components/mdx'`, a path that does not resolve:
- No `components/mdx.ts(x)` file exists
- No `components/mdx/index.ts` file exists
- `components/index.ts` exists but TypeScript path resolution for `@/components/mdx` would target `./components/mdx` not `./components/index`

**However**: the `app/[slug]/page.tsx` dynamic route uses `next-mdx-remote/rsc`, which renders MDX **as a string with components injected via the `components` prop** — it does *not* execute the `import` statements at the top of MDX files the way `@next/mdx` would. The current build succeeds (per `audit-log.md` "376 static pages built, 87.9 kB First Load JS unchanged"), which means these imports are either compile-time-stripped or runtime-no-op.

**Verification step before deletion**: render `/heat-pump-guide` and `/heat-pump-tax-credits-2026` on localhost and confirm the `<TableOfContents>`, `<FAQ>`, `<ComparisonTable>`, `<Callout>`, `<SourcesBox>`, `<RelatedArticles>` components display correctly. If yes, the imports are confirmed-dead syntax — safe to delete from all 13 files. If no, the page is broken and needs the imports fixed (rewrite to `from '@/lib/mdx-components'`).

The 13 files:
```
content/heat-pumps/air-source-vs-ground-source-heat-pump.mdx:29
content/heat-pumps/best-cold-climate-heat-pumps.mdx:29
content/heat-pumps/best-mini-split-heat-pumps.mdx:29
content/heat-pumps/disadvantages-of-heat-pumps.mdx:29
content/heat-pumps/heat-pump-cop-explained.mdx:29
content/heat-pumps/heat-pump-cost-to-install.mdx:29
content/heat-pumps/heat-pump-electricity-usage.mdx:29
content/heat-pumps/heat-pump-guide.mdx:32
content/heat-pumps/heat-pump-in-cold-weather.mdx:29
content/heat-pumps/heat-pump-running-cost-calculator.mdx:29
content/heat-pumps/heat-pump-tax-credits-2026.mdx:29
content/heat-pumps/heat-pump-vs-ac.mdx:29
content/heat-pumps/heat-pump-vs-mini-split.mdx:18  (also imports from '@/components')
```

### A4.2 Empty FAQ / placeholder leak hunt
- No `items=[]`, `rows=[]`, `headers=[]` empty-component patterns found in MDX.
- No `TODO` / `FIXME` / `lorem` / `ipsum` / `{{}}` / `[brand]` / `[MODEL]` / `[PRICE]` / `PLACEHOLDER` / `FILLME` matches in MDX.
- The seed claim that `best-mini-split-ac-units.mdx` has an "FAQ heading with no content" was **not reproduced** in the audit — that file has 8 substantive Q&A items. (Possibly a transient state from an earlier conversation; current code is OK.)

### A4.3 Component export naming smell (LOW)
`/workspace/components/index.ts:6` exports `SourcesBox` from `./ui/SourceLink` (re-export of default `SourceLink` as `SourcesBox`). `lib/mdx-components.tsx` defines its own `SourcesBox`, so MDX renders use the latter, but the export naming is misleading. Cosmetic.

### A4.4 Unused calculators (false-positive flag)
30 of 31 calculators in `components/calculators/` are not directly imported anywhere — but they're loaded dynamically by `CalcWrapper` via a `type` prop. Intentional. Not dead code.

---

## A5 — Thin / duplicate / doorway pages (P0–P1)

### A5.1 Homepage doorway pattern (multi-anchor → one URL)
Confirmed via `grep -oE 'href="(/[a-zA-Z0-9-]+)"' app/page.tsx | sort | uniq -c | sort -rn`:

| URL | Anchor count on homepage |
|---|---|
| `/hvac-maintenance-checklist` | **4** |
| `/indoor-air-quality-testing` | **3** |
| `/heat-pump-size-calculator` | **3** |
| `/central-ac-cost-to-install` | **3** |
| `/best-smart-thermostats` | **3** |
| `/air-conditioner-btu-calculator` | **3** |
| `/ac-troubleshooting-guide` | **3** |
| `/seer2-savings-calculator` | 2 |
| `/seer2-rating-explained` | 2 |
| `/mini-split-sizing-calculator` | 2 |
| `/mini-split-installation-cost` | 2 |
| `/merv-rating-chart` | 2 |
| `/hspf2-rating-explained` | 2 |
| `/how-often-change-hvac-filter` | 2 |
| `/heat-pump-tax-credits-2026` | 2 |
| `/heat-pump-guide` | 2 |
| `/furnace-sizing-calculator` | 2 |
| `/furnace-maintenance` | 2 |
| `/furnace-installation-cost` | 2 |
| `/furnace-guide` | 2 |
| `/furnace-blowing-cold-air` | 2 |
| `/duct-leakage-testing` | 2 |
| `/best-mini-split-ac-units` | 2 |
| `/best-hvac-air-filters` | 2 |
| `/afue-rating-explained` | 2 |

The `/indoor-air-quality-testing` case is the most damning because the three anchor texts (IAQ Testing, VOC Sources, Radon Testing) name **conceptually distinct topics**, but the destination is a single page. Either build distinct pages (preferred for non-thin content) or collapse the three anchors to one. The `/hvac-maintenance-checklist` 4-anchor pattern, where the variation is mostly "Maintenance" + "DIY tasks" + "checklist," is closer to a "near-duplicate anchor" case that can be solved by anchor-text consolidation.

### A5.2 Thinnest MDX files (top 15 by line count)
| Lines | File |
|---|---|
| 87 | `content/mini-split-air-conditioners/mini-split-in-cold-climates.mdx` |
| 109 | `content/mini-split-air-conditioners/cassette-ceiling-air-conditioners.mdx` |
| 110 | `content/mini-split-air-conditioners/mini-split-line-set-covers.mdx` |
| 112 | `content/mini-split-air-conditioners/ac-dry-mode-vs-dehumidifier.mdx` |
| 112 | `content/mini-split-air-conditioners/smallest-mini-splits.mdx` |
| 118 | `content/mini-split-air-conditioners/senville-mini-split-reviews.mdx` |
| 128 | `content/mini-split-air-conditioners/best-mini-split-for-garage.mdx` |
| 130 | `content/mini-split-air-conditioners/mini-split-amps.mdx` |
| 134 | `content/mini-split-air-conditioners/mrcool-3rd-gen-vs-4th-gen.mdx` |
| 145 | `content/air-conditioners/low-profile-window-acs.mdx` |
| 167 | `content/energy-efficiency-ratings/hspf-rating-explained.mdx` |
| ~170 | (next ~15 fall in this range) |

After subtracting frontmatter (~22 lines), imports (~1), `<TableOfContents />` (~1), FAQ wrapper (~30–40), `<SourcesBox>` + `<RelatedArticles>` (~30–40), several of these files have **<50 lines of unique editorial body content**. Combined with a heavily templated FAQ pattern (see A5.3), they fit the scaled-content profile.

### A5.3 Templated FAQ boilerplate
A six-question template appears across 15+ files in the `mini-split-air-conditioners/` and other folders:
- "What should I know about [TOPIC]?"
- "How much does this cost?"
- "Which brand is best?"
- "Is professional installation required?"
- "What size do I need?"
- "Are there tax credits available?"

Sample offenders: `mini-split-air-conditioners/ac-dry-mode-vs-dehumidifier.mdx:69–95`, `senville-mini-split-reviews.mdx:75–101`. Action: replace template FAQ with article-specific Q&A or remove it entirely on the thinnest pages.

### A5.4 H2 template across an entire directory
`content/energy-efficiency-ratings/` (31 files) shows near-identical H2 structure: "What [Rating] Means → Categorizing Levels → What [Rating] Do You Need → Cost-Benefit → Calculator/Brand → Key Takeaways → FAQ → Sources." This is the template-pattern Google's scaled-content guidance specifically warns about.

### A5.5 Hub aggregator pages
| Hub | File | Approx lines | Content depth |
|---|---|---|---|
| `/buying-guides` | `app/buying-guides/page.tsx` | ~150 | Index + 4 cards |
| `/how-to` | `app/how-to/page.tsx` | ~120 | Index + 8 cards |
| `/hvac-dictionary` | `app/hvac-dictionary/page.tsx` | ~200 | 50+ terms listed, no definitions inline |
| `/cost-guides` | `app/cost-guides/page.tsx` | ~200 | 5 installation costs listed |
| `/brand-reviews` | `app/brand-reviews/page.tsx` | ~540 | 15 brands, but with the fake ratings issue (A2.6) |
| `/troubleshooting` | `app/troubleshooting/page.tsx` | ~200 | 12 problems listed |

All exist but are aggregator/index pages. Each is essentially a doorway to spoke pages with no original editorial content of its own. Not catastrophic individually, but in aggregate they reinforce the "thin hub" perception.

### A5.6 Orphan MDX sample
Within `mini-split-air-conditioners/` (28 files), only a fraction are linked from the corresponding hub `app/air-conditioning/page.tsx` or `app/heat-pumps/page.tsx`. The remainder rely on inter-MDX `<RelatedArticles>` linking. Top orphans (per inbound link sample):
- `mini-split-for-bedroom.mdx`
- `cassette-ceiling-air-conditioners.mdx`
- `how-much-does-mini-split-cost-to-run.mdx`
- `mini-split-maintenance-guide.mdx`
- `best-mini-split-for-garage.mdx`
- `ac-dry-mode-vs-dehumidifier.mdx`
- `best-5-zone-mini-split.mdx`, `best-4-zone-mini-split.mdx`
- `mrcool-diy-mini-split-review.mdx`

---

## A6 — Consistency constants (P1)

### A6.1 Article count
| Location | Claim |
|---|---|
| `app/layout.tsx:22` (root metadata description) | `339+ articles` |
| `app/about/page.tsx:57` (body) | `over 339 comprehensive articles` |
| `app/about/page.tsx:581` (stat badge) | `339+` |
| `app/page.tsx:1063` (homepage WebSite schema description) | `340+ expert guides` |
| `app/articles/page.tsx:8` (metadata description) | `350+ HVAC articles` |
| `components/layout/Footer.tsx:97` (trust pillar) | `339+ Guides` |
| **Reality** | **355 MDX files** in `/content/` |

Pick one — recommend `355 articles` everywhere; or, if some are not yet promoted from draft, pick the public-served count and document it.

### A6.2 Calculator count
| Location | Claim |
|---|---|
| `app/layout.tsx:22` | `15+ interactive calculators` |
| `app/page.tsx:109` (hero counter) | `15+` |
| `app/about/page.tsx:585` (stat badge) | `15+` |
| `components/layout/Footer.tsx:102` | `15+ Calculators` |
| **Reality** | **31 calculator components** in `/components/calculators/` |

The understatement is presumably legacy text from before the calculator expansion (per `audit-log.md` "All 31 calculator components redesigned with a unified design language" on 2026-05-11). Update to **31 calculators** site-wide.

### A6.3 Founding year
| Location | Claim | Reality |
|---|---|---|
| `app/page.tsx:79` | "Since 2024" | Site launched 2026 |
| `app/contact/page.tsx:81` | "since 2024" | Site launched 2026 |

### A6.4 Copyright year
- `app/terms/page.tsx:117, 119` references "Copyright & Ownership" generically — no hardcoded year found in footer.
- Recommend explicit "© 2026 Moving Data Systems d.o.o." in `components/layout/Footer.tsx` after Part C identity rebuild.

### A6.5 "10K+ Customer Reviews"
`app/brand-reviews/page.tsx:262–263` — needs removal regardless of methodology fix.

### A6.6 "Weekly Updates"
`components/layout/Footer.tsx` footer trust pillar — audit-log shows monthly bursts, not weekly. Either change to "Regularly Updated" / "Updated through 2026" or remove.

### A6.7 "50+" badges
- `app/about/page.tsx:593` — referent unclear (50+ what?)
- `app/brand-reviews/page.tsx:254` — "50+ Brands Reviewed" or similar — actual count is ~15 in the listing
Pick referents that match reality or remove the badges.

### A6.8 Affiliate-claim coherence (also flagged in compliance triage Step 5)
The site contains **at least 8 "no affiliate links / 100% unbiased / no financial relationships" claims** across homepage, About, Editorial, Footer, and individual articles. **One contradictory claim** at `app/editorial-policy/page.tsx:216` says "affiliate links are clearly marked." Pick one truth. Today, the "no affiliate links" position is technically accurate (no monetized URLs found in code). After Raptive lands, switch to *"display advertising is the only monetization on this site; we have no affiliate links, no sponsored content, no paid placements"* — accurate and survives review.

---

## A7 — YMYL factual currency (P0 — critical)

### A7.1 Federal HVAC tax credits — four contradictory narratives

**Ground truth** (verified via WebSearch against IRS, ENERGY STAR, Rewiring America, Cornell LII, and multiple HVAC-industry sources, as of 2026-06-26):
- The **Section 25C** Energy Efficient Home Improvement Credit was **terminated for installations after Dec 31, 2025** by the **One Big Beautiful Bill Act (OBBBA)** signed **July 4, 2025**.
- The **Section 25D** Residential Clean Energy Credit was likewise terminated for property placed in service after Dec 31, 2025 (some sources note 25D specifics for geothermal carry-forward).
- **2026 federal HVAC tax credits via 25C/25D: none.**
- IRA-funded **HOMES** and **HEAR/HEEHRA** rebate programs are state-administered and **still active in 2026** (with state-by-state rollout variability).
- Equipment **installed and placed in service on/before Dec 31, 2025** is still eligible for 25C on the **2025 tax return filed in 2026**.

**Site narratives** (in the codebase, today):

1. **`content/heat-pumps/heat-pump-tax-credits-2026.mdx` — wrong, pre-OBBBA narrative**
   - Line 33 (lead paragraph): "You can claim a federal tax credit of up to $2,000 for a qualifying heat pump installed in 2026 under the Inflation Reduction Act's Section 25C Energy Efficient Home Improvement Credit." (FALSE for 2026 installs)
   - Line 208–209 (FAQ): "How much is the heat pump tax credit in 2026? The federal tax credit for heat pumps in 2026 is 30% of the total installed cost, up to a maximum of $2,000." (FALSE)
   - Line 241 (FAQ): "The Section 25C credit is available through December 31, 2032 at the current 30% rate." (FALSE)
   - This entire page is the pre-OBBBA story. Every claim about claiming 25C in 2026 needs to come out.

2. **`content/tax-credits-rebates/hvac-tax-credits-2026.mdx` — mixed: post-OBBBA framing but with the wrong year throughout**
   - Line 33 (intro): "Federal HVAC tax credits are still available through December 31, 2026. Section 25C … offers up to $2,000 for qualifying heat pumps" (FALSE — should be Dec 31, 2025)
   - Line 59 (timeline): "OBBBA signed into law / July 4, 2026 / Accelerated termination of 25C, 25D" (OBBBA was signed July 4, **2025**)
   - Line 60: "25C and 25D expired / December 31, 2026 / No federal HVAC tax credits for 2026 installations" (should be Dec 31, **2025**)
   - Line 193: "If you installed a heat pump in 2024, 2026, or 2026 …" (text-generation artifact: should be "2024, 2025, or 2026")
   - Page contains the right concepts but every 2025 date is mis-typed as 2026 throughout — needs a sweep to flip every OBBBA-related "2026" to "2025."

3. **`content/tax-credits-rebates/25c-tax-credit-explained.mdx` — same date-flip error**
   - Line 31: "The Section 25C tax credit expired on December 31, 2026" (should be 2025)
   - Line 49: "the One Big Beautiful Bill Act (July 4, 2026) accelerated the termination to December 31, 2026" (both dates should be 2025)
   - Line 70: "Gas furnaces (≥95% AFUE through 2024, ≥97% AFUE from 2026)" (questionable — verify against IRS 25C tiers)

4. **`content/tax-credits-rebates/energy-star-tax-credits.mdx` — same**
   - Description: "Federal ENERGY STAR HVAC tax credits expired December 31, 2026" (should be 2025)

5. **`content/tax-credits-rebates/hvac-rebates-by-state.mdx`** — line 331: "Some [programs] have been active since 2024–2026; others haven't launched yet." — internally inconsistent date range; likely should be "2024–2026" or "2024–present."

**Why this is the highest-stakes finding outside A1**: telling a homeowner they can claim a $2,000 federal tax credit for a 2026 heat-pump install when in fact the credit has expired is **directly harmful financial advice** — the exact thing Google YMYL signals are designed to penalize, and the exact thing Raptive's compliance team will catch quickly because this is in the news cycle.

### A7.2 Rebate and incentive claims
The site contains many "up to $X,000" rebate claims across `/tax-credits-rebates/`, `/heat-pumps/`, `/hvac-rebates-by-state.mdx`, and other locations. Each needs to be checked against the current state-program reality — many states' HEAR/HOMES rollouts have shifted since the articles were written. Recommendation: pick a date-stamp ("verified as of [date]") and only keep specific dollar amounts you can cite to a state energy office page.

### A7.3 Health / IAQ claims (radon, mold, VOC)
These are also YMYL (medical). Sample read of `/content/indoor-air-quality-testing.mdx` and `/content/mold-prevention/*.mdx` did not surface specific dangerous-medical-advice claims, but the radon/mold/VOC space is high-risk; recommend a focused YMYL audit pass on those pages (out-of-scope for this audit cycle if it's not blocking ad review).

---

## A8 — Citations & provenance (P1)

The site **mentions DOE / EPA / ASHRAE / ACCA / AHRI / ENERGY STAR over 5,600 times** but the share of pages that *link to a primary source* is much smaller. Many "How We Tested / Methodology" sections reference authoritative bodies without citing a specific URL. `SourceLink` / `SourcesBox` components exist and are used in some pillar articles (`/content/heat-pumps/heat-pump-tax-credits-2026.mdx:250–257` has a real sources list), but adoption is not consistent.

**Recommendation**: after batch B (fabricated-data fix), every spec table should be followed by a `<SourceLink>` to the AHRI Directory listing for the model. Every YMYL claim should link to the primary regulator (IRS, EPA, ENERGY STAR). Every reliability/sentiment claim should either link to a study or be removed.

---

## A9 — Technical SEO & policy hygiene (P1)

### A9.1 robots.txt
- Present at `/public/robots.txt`
- Allows all crawlers, sitemap declared. OK.
- Blocks `/api/internal/` and `/api/admin/` — fine (those routes don't exist either, but harmless).

### A9.2 sitemap.xml
- **373 `<loc>` entries**, **372 unique slugs** (one duplicate — find and remove)
- Includes hub pages + 355 MDX-backed pages + policy/utility pages.
- Recommend: regenerate dynamically from filesystem rather than maintaining as a checked-in artifact, so the count automatically matches reality.

### A9.3 ads.txt
**MISSING.** Raptive requires this file at `public/ads.txt`. Even if everything else is approved, the absence of ads.txt blocks ad serving. Add **before** Raptive code lands; Raptive provides the file's required contents.

### A9.4 Canonical correctness
- `app/[slug]/page.tsx:35–37` sets `alternates.canonical: https://www.hvacbase.org/${slug}` — OK
- `app/layout.tsx` and hub `page.tsx` files set canonicals per recent commits (per audit-log "URL Standardization to www.hvacbase.org" 2026-04-20).
- All sitemap URLs use `www.` subdomain — consistent.

### A9.5 Linked-but-missing routes
Verified that the brief's list of suspect destinations all exist:
- `/buying-guides` ✓ — `app/buying-guides/page.tsx`
- `/how-to` ✓ — `app/how-to/page.tsx`
- `/hvac-dictionary` ✓
- `/cost-guides` ✓
- `/brand-reviews` ✓
- `/troubleshooting` ✓

(All are aggregator pages — see A5.5 for content-depth concerns.)

### A9.6 Broken internal links
Random sample of 30 internal links in MDX `<RelatedArticles>` and prose links: all targets resolve to a live MDX or app page. The previous LINK_ANALYSIS_REPORT.md and audit-log indicate prior link-fix sweeps. **Not a current blocker**.

### A9.7 Sample images and OG
- `public/og-image.svg` present (SVG, not PNG — some social platforms render SVG poorly but it's not a blocker)
- `public/favicon.svg` present
- `public/site.webmanifest` present
- Google + Bing site verification tokens in place.

### A9.8 Analytics & monetization
- Google Analytics 4 (`G-ZCKSNVFR5V`) installed in `app/layout.tsx`. Privacy page should reference GA explicitly if it doesn't already.
- **No AdSense / Raptive / Mediavine scripts** anywhere in the codebase — site is currently un-monetized. Once Raptive lands, add disclosure to `/privacy` and `/disclaimer`.

### A9.9 Date-stamp practice
Footer / about pages reference "Since 2024" and "Weekly Updates" — both wrong (see A2.2, A6.6). Recommend a single "Site established 2026 · Last updated [auto from build timestamp]" footer line.

---

## Findings not in the brief

### NF1 — `_shared.tsx` calculator design-system is well-built and should be protected
The audit-log entry for 2026-05-11 describes a unified design system (`components/calculators/_shared.tsx`) that powers all 31 calculators. This is genuinely the site's strongest differentiator and the most defensible "non-commodity" element per the skill's six-question test. **The remediation work should explicitly avoid touching calculator UI** — they're the asset that survives review easiest.

### NF2 — Duplicate `WebSite` JSON-LD on the homepage
Both `app/layout.tsx` (in `metadata`) and `app/page.tsx:1054` emit a `WebSite` schema. Validators won't fail on duplicates but it's redundant and increases mismatch risk. De-dup as part of batch F-schema.

### NF3 — Dormant `components/SEOHead.tsx` with `Product` + `AggregateRating` template
Never instantiated; component file should be **deleted**, not just left dormant. The brand-reviews page has fake star ratings *displayed* — the only thing preventing a hard ad-review fail today is that those ratings aren't wired into schema. A future maintainer could light up SEOHead with `reviewData` and convert the soft visible flag into a hard schema-fraud flag. Eliminate the temptation.

### NF4 — Calculator component duplication
Both `/components/calculators/CalcWrapper.tsx` and `/components/tools/CalcWrapper.tsx` exist; both `/components/calculators/BTUCalculator.tsx` and `/components/tools/BTUCalculator.tsx`; both SEERCalculator variants. The `_shared.tsx`-based new system is in `/calculators/`; the older `/tools/` versions appear to be legacy. Confirm which is in use (via the `index.tsx` re-exports and CalcWrapper's lookup map) and delete the dead set. **Not a Raptive concern**; codebase hygiene.

### NF5 — Frontmatter field-name drift
At least 5 older MDX files (sample: `air-quality/allergen-control-guide.mdx`, `air-quality/insulation-r-value-guide.mdx`) use `publishedDate` + `modifiedDate` + `author` (with an "HVAC Expert Team" string), while the schema generator and `ArticleMeta` interface require `datePublished` + `dateModified`. Those files emit Article schema with `datePublished: undefined`. One-shot rename script needed.

### NF6 — The empty subdirectory `content/{energy-efficiency,mini-splits,ac-sizing,heat-pumps,ac-troubleshooting}/`
A shell-brace-expansion artifact directory exists at `/workspace/content/{energy-efficiency,mini-splits,ac-sizing,heat-pumps,ac-troubleshooting}/`. Empty (0 files). Safe to delete; cosmetic.

### NF7 — Two more `{layout,[slug]}` artifact directory
Same pattern at `/workspace/app/{layout,[slug]}/`. Empty. Safe to delete; cosmetic.

### NF8 — CLAUDE.md says "Next.js 15"; `package.json` says `^14.2.0`
Minor doc drift. Either upgrade to 15 (test thoroughly) or fix the CLAUDE.md line.

### NF9 — `public/sitemap.xml` is static; should be dynamic
The sitemap is a checked-in 373-line XML file. It will drift the moment any MDX is added/removed (already off by one duplicate; off by 18 from MDX count). Should be a route handler that regenerates from `lib/content.ts::getAllSlugs()` at build time.

### NF10 — No author photo wiring exists yet
`Person` schema's `image` field will need `/workspace/public/authors/marko-visic.jpg` (or equivalent). The provided photo at `/workspace/1516504244885.jpeg` (~22 KB) must be copied/optimized into `/public/authors/marko-visic.jpg` (and a 2x for retina) — that step is on the C-identity batch checklist.

### NF11 — `audit-log.md` is short and easy to maintain
The append-only audit log convention is healthy. After remediation, every batch should append a dated entry summarizing the change and its verification (live URL curled + element grep), not just commit hashes.

### NF12 — The `ldjson` script tag in `app/[slug]/page.tsx` uses `<head>` inside RSC JSX
`app/[slug]/page.tsx:58–66` renders `<head>` inline within the component instead of using Next.js 13+ `metadata` export. This is unusual but not broken; consider migrating to `generateMetadata` + `Script` for schema, which is more idiomatic.

### NF13 — `lib/cluster-mapping.ts` is the single source of truth for breadcrumb topic-mapping
Worth a quick read during batch F-schema to make sure all cluster names in MDX frontmatter map to a sensible breadcrumb. (Not audited line-by-line in this pass.)

### NF14 — Mismatched dates on MDX files (cosmetic but inconsistent)
Most files use `datePublished: "2026-*"`. A handful have January 2026 dates and have been re-published several times since (per audit-log "calculator redesign on 2026-05-11"). `dateModified` should reflect the actual last touch, not the original publish date — many files have `dateModified` equal to `datePublished`.

---

## Aggregate severity rollup

| Lane | P0 issues | P1 issues | P2 issues |
|---|---|---|---|
| A1 (fabricated data) | **40+ rows in `spec-verification.csv`**, MSZ-FS 40.1 SEER2 cluster (~12 occurrences), Daikin Aurora overclaim cluster (~7 occurrences), Carrier 40HQV mystery model, Senville misclaims, fabricated methodology language (~20 files) | refrigerant transition narrative across 5 files | — |
| A2 (E-E-A-T) | fabricated team in About + Editorial (8 lines), fabricated tenure on homepage + Contact (2 lines), "thousands of visitors" (4 lines), "10K+ Customer Reviews" (1 line), no real entity (3 pages) | brand-reviews page fake-rating methodology | older MDX frontmatter `author: "HVAC Expert Team"` |
| A3 (schema) | dormant SEOHead.tsx AggregateRating path, no Person schema | duplicate WebSite, frontmatter date-field drift | unwired FAQPage / HowTo |
| A4 (renders) | — | 13 files with `@/components/mdx` import (verify-then-clean) | unused-component naming smell, empty `{...}` artifact dirs |
| A5 (thin/doorway) | homepage `/indoor-air-quality-testing` 3-anchor doorway, 30 thinnest MDX files, templated FAQ across 15+ files | hub aggregator depth, orphan MDX in mini-splits | empty `{layout,[slug]}` dir |
| A6 (constants) | "10K+ Customer Reviews" (also A2), "Since 2024" (also A2) | article-count drift (4 places), calculator-count drift (4 places), "Weekly Updates" footer claim, affiliate-claim contradiction | "50+" badges |
| A7 (YMYL) | **Section 25C narrative wrong across 4 MDX files** (heat-pump-tax-credits-2026, hvac-tax-credits-2026, 25c-tax-credit-explained, energy-star-tax-credits) | rebate amounts need date-stamping | health/IAQ pages need a focused pass (not blocking) |
| A8 (citations) | — | enforce SourceLink on every spec table | enforce sources on every YMYL claim |
| A9 (technical) | **MISSING ads.txt** | sitemap duplicate slug | sitemap static→dynamic, og-image SVG→PNG |

**Total P0 surface area**: ~60 distinct fixes spread across ~50 files. **Total P1**: another ~20 fixes across ~25 files.

---

## Reapply gate checklist (from the brief, with audit-confirmed status)

- [ ] `spec-verification.csv` has zero WRONG / UNVERIFIABLE rows → currently **many WRONG and ~20 UNVERIFIABLE** (see CSV)
- [ ] Zero fabricated expertise claims and zero fake first-person testing claims remain → currently **~80 occurrences across ~40 files**
- [ ] Real named author (Marko Visic, accurate credentials, photo, LinkedIn) live; real business identity on About/Contact → currently **none of this exists in the codebase**
- [ ] Affiliate position stated once, truthfully, everywhere → currently **8 versions of "no affiliate links" + 1 contradictory "affiliate links are clearly marked"**
- [ ] No fabricated history/traffic; founding presented honestly as 2026 → currently **"Since 2024" on homepage + Contact; "thousands of visitors" on About + How-To**
- [ ] Guide count / dates reconciled site-wide → currently **339+ vs 340+ vs 350+ vs 355 reality**; calculator count **15+ vs 31 reality**
- [ ] No empty/broken render blocks; no doorway duplication → currently **homepage 3-anchor doorway + 9 secondary 2-anchor cases**
- [ ] No fake schema (`aggregateRating`/`Review`/credentialed `Author`) → currently **none emitted** (visible-only fake ratings on `/brand-reviews` — fix visible, leave schema as is)
- [ ] Tax-credit / YMYL claims verified current against primary sources → currently **4 MDX files contain false 25C-still-available claims**
- [ ] Full `google-ai-content-policy` skill pass clean → skill **not mounted** in this audit environment; install before final sweep
- [ ] `public/ads.txt` present → currently **MISSING**

---

**END OF AUDIT — see `/workspace/REMEDIATION_PLAN.md` for the gated execution sequence. No edits performed.**
