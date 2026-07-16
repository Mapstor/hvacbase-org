# HVACBase.org — Compliance Triage (read-only inventory)

**Run date:** 2026-07-12
**Mode:** Read-only. No content, schema, or code was edited during this pass. All items below are proposals for a subsequent, gated remediation batch.
**Overwrites:** prior `COMPLIANCE_TRIAGE_hvacbase.md` (Jun 26, 2026). Compare against `git log -- COMPLIANCE_TRIAGE_hvacbase.md` if needed.
**Skill mount:** `~/.claude/skills/google-ai-content-policy/SKILL.md` — **FOUND**.
**Target framework:** Google publisher / scaled-content / spam-policy pre-review compliance, ahead of ad-network onboarding.

---

## STEP 0 — Environment report

| Field | Value | Note |
| --- | --- | --- |
| Repo root | `/workspace` | git branch `main`, clean tree, ~13 audit docs at root |
| Framework | Next.js **14.2** App Router | **CLAUDE.md says Next 15** — stale, flag F1 |
| Content storage | Pure **MDX** under `content/` | 355 `.mdx` files, 0 JSON/TS content, 0 inline TSX prose |
| Rendering | `next-mdx-remote/rsc` from `app/[slug]/page.tsx` via `getAllSlugs()` | Cluster routing in `lib/cluster-mapping.ts` |
| Static pages | 20 (about, articles, brand-reviews, buying-guides, calculators, contact, cost-guides, disclaimer, editorial-policy, hvac-dictionary, privacy, terms, troubleshooting, and 5 category hubs: `air-conditioning`, `heating`, `heat-pumps`, `energy-efficiency`, `air-quality`, plus `how-to`, `articles`, and site root) | |
| Dynamic pages | **355** article URLs generated at build from MDX | via `[slug]/page.tsx` |
| Total real URLs | **~375** (20 static + 355 articles) | |
| Sitemap `<loc>` count | **373** (in `public/sitemap.xml`) | ~2 URL drift from real count |
| CLAUDE.md claim | 353 pages | mismatch on both sides |
| ads.txt | **MISSING** at `public/ads.txt` | pre-ad-network state |
| Ad-network code | **NONE** in repo | only GA4 (`G-ZCKSNVFR5V`) in `app/layout.tsx:88` — analytics, not ads |
| robots.txt | Allow-all except `/api/internal/`, `/api/admin/`; sitemap linked | fine |
| Deploy | Vercel (`.vercel/` present) | fine |
| Policy pages present | `privacy`, `disclaimer`, `terms`, `editorial-policy`, `about`, `contact` | all six exist |

**Representative content architecture:**
- `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx` — product roundup
- `content/mini-split-air-conditioners/senville-mini-split-reviews.mdx` — brand review (frontmatter `contentType: "review"`)
- `content/indoor-air-quality-testing.mdx` — orphaned at content root (no cluster dir)
- `content/{energy-efficiency,mini-splits,ac-sizing,heat-pumps,ac-troubleshooting}/` — **literal** directory name with escaped brace-expansion, empty; filesystem cruft

**MDX frontmatter `contentType` distribution (349 files with the field; 6 missing):**
- `guide` 60 · `NEW` 38 · `KEEP+` 32 · `TRANSFORM` 31 · `comparison` 29 · `roundup` 25 · `ranking` 19 · `explainer` 14 · `calculator-guide` 13 · `data-guide` 11 · `how-to` 9 · **`calculator` 9** · `informational` 8 · `troubleshooting` 7 · `buying-guide` 6 · `new` 5 · `data-analysis` 5 · `cost-guide` 4 · `tool` 3 · `review` 3 · `reference` 3 · `educational` 3 · `article` 3 · other 12
- **106 files (30%) still carry pipeline-status placeholders (`NEW`, `KEEP+`, `TRANSFORM`, `new`)** rather than terminal editorial types — see F2 in the batch plan.

**MDX `cluster` distribution:** 36 distinct values across 33 physical directories → fragmentation. E.g., `air-quality` (4) vs `air-purifiers-air-quality` (21) vs `air-purifier-brands` (13) vs `indoor-air-quality` (6). Similar splits for `space-heaters` vs `space-heaters-portable-heating`, `energy-efficiency` vs `energy-efficiency-ratings`, `air-conditioners` vs `window-air-conditioners`. Flag as F3 (taxonomy consolidation, not a policy issue but hits internal linking).

---

## STEP 1 — Site-wide pattern frequency

Grep scope: `app/` + `content/` + `components/` + `lib/`; extensions `.mdx`, `.tsx`, `.ts`. Case-insensitive.

| Lane | Description | Raw match lines | Signal density (high/low) |
| --- | --- | --- | --- |
| 1 | Fabricated persona / team / testing / bylines | **14** | Low — most are legitimate references to the real single-author (Marko Visic) or literal "Case Study" narrative anchors |
| 2 | Citations / named studies / footnotes / "according to" | **~3,056** (2 + 2b combined) | Mixed — the vast bulk are legitimate references to AHRI Directory, ENERGY STAR, EPA, DOE, ASHRAE, ACCA (standards bodies, not "studies") |
| 3 | Unsourced specific stats (dB / % / kWh / lifespan / up-to-$) | **~1,800+** (persisted, sampled) | Mixed — many are in sourced spec tables; standalone stat-shaped claims on non-content pages are the real risk |
| 4a | Decay-prone dates / freshness / "voids warranty" / "best on the market" | ~2,900+ | Mostly the `2026` year-in-title/body pattern; small tail of warranty-voiding claims |
| 4b | Tax credit / IRA / 25C / HEEHR / $2,000 / $8,000 / rebate | **2,011** | **Actively remediated (post-OBBBA)** — spot-check finds current, sourced language across the top offender files. Low residual risk. |
| 5a | Count claims (339 / 355 / 300+ / 15+ / 50+ / 30+) | 175 | The "355" / "31" homepage claims are the only structural issues; `15+`, `30+`, `50+` etc. are legitimate spec ranges |
| 5b | Freshness / weekly / verified / "reviewed by" / `2026` | 2,906 | Almost entirely `2026` year-in-title decay and frontmatter `dateModified` — see F4 |
| 5c | Independence / "unbiased" / "no affiliate" / "independent" | 177 | Concentrated in policy pages + homepage — see coherence review (STEP 5) |
| 5d | Affiliate signals (amazon/amzn/tag=/aff/sponsored/`/go/`) | 9 | **All 9 are self-negating** ("no affiliate links"/"no sponsored content") — zero true affiliate links found |

**Grand total (raw match lines, deduped across lanes not attempted): ~11,100.** Signal-to-noise is low on Lanes 2, 3, 4a, 5b — most matches are legitimate. Actionable flags collapse to roughly **50–80 unique locations**, catalogued below.

**Top-30 files by tax-credit density (Lane 4b) — for verification the OBBBA update reached every location:**
```
content/tax-credits-rebates/hvac-rebates-by-state.mdx         119
content/tax-credits-rebates/hvac-tax-credits-2026.mdx         109
content/tax-credits-rebates/25c-tax-credit-explained.mdx       84
content/tax-credits-rebates/energy-star-tax-credits.mdx        80
content/energy-efficiency-ratings/seer-rating-tax-credits.mdx  71
content/heat-pumps/heat-pump-tax-credits-2026.mdx              61
content/mini-split-air-conditioners/mini-split-installation-cost.mdx  54
components/calculators/SEER2Calculator.tsx                     50
content/heat-pumps/heat-pump-cost-to-install.mdx               41
content/energy-efficiency-ratings/hvac-efficiency-texas.mdx    32
content/tankless-water-heaters/tankless-water-heater-cost.mdx  30
content/hvac-costs-by-state/hvac-cost-california.mdx           29
content/energy-efficiency-ratings/is-higher-seer-worth-it.mdx  29
content/water-heaters/heat-pump-water-heater-guide.mdx         28
content/heat-pumps/heat-pump-guide.mdx                         27
content/energy-efficiency-ratings/14-3-seer2-vs-16-seer.mdx    27
content/battery-backup/solar-panel-cost-by-state.mdx           27
content/hvac-costs-by-state/hvac-cost-new-york.mdx             26
content/energy-costs/energy-costs-guide.mdx                    26
content/hvac-brands/central-ac-cost-to-install.mdx             25
content/water-heaters/water-heater-cost-to-install.mdx         23
content/heat-pumps/air-source-vs-ground-source-heat-pump.mdx   20
content/hvac-costs-by-state/hvac-cost-texas.mdx                19
content/hvac-costs-by-state/hvac-cost-florida.mdx              19
content/hvac-costs-by-state/hvac-cost-by-state.mdx             19
content/hvac-costs-by-state/hvac-cost-illinois.mdx             18
content/energy-efficiency-ratings/16-seer-vs-20-seer.mdx       18
content/energy-efficiency-ratings/afue-rating-explained.mdx    17
content/battery-backup/solar-panel-calculator.mdx              17
content/furnaces-heating/furnace-installation-cost.mdx         16
```
Verified: the 4 sampled high-density files (`25c-tax-credit-explained.mdx`, `hvac-tax-credits-2026.mdx`, plus the mini-split cluster) all consistently reference **OBBBA (PL 119-21, signed 2025-07-04)** as terminating 25C/25D for property placed in service after 2025-12-31, redirecting readers to HOMES/HEAR/state utility rebates. Cited to IRS OBBB FAQ and IRS Fact Sheet FS-2026-01. Prior remediation waves (visible in `git log --oneline`: `raptive-fix/12-tax-comprehensive`, `fix(heat-pumps-cluster): 4 live 25C+25D credit claims`, `fix(energy-costs-cluster)`, `fix(misc-cluster)`) appear to have completed the sweep. **Still, batch D-audit sampling below (~10 random tax-mentioning files) recommended before ad-review.**

---

## STEP 2 — Per-page flag catalogue (curated)

Format: `file:line | lane | severity | verbatim snippet | disposition`. **HIGH** severity items — the ones a reviewer notices in the first 30 seconds — are listed first, then MED, then LOW. Not exhaustive; every duplicate of a pattern within one file collapses to one entry.

### HIGH severity — reviewer-visible in seconds

```
app/page.tsx:108        | 5a | HIGH | "31" (Calculators, hard-coded in hero stat) | reconcile (real count ≤ 25; likely 9 dedicated + 13 calculator-guides)
app/page.tsx:1046       | 5a | HIGH | "355 articles and 31 calculators" (in WebSite schema description) | reconcile
app/page.tsx:922        | 5c | HIGH | "no affiliate links or sponsored content" | reword — "sponsored content" overreaches the moment display ads run (post-Raptive)
app/page.tsx:953        | 5b | HIGH | "Updated weekly with 2026 efficiency standards, tax credits, and equipment releases" | verify or soften — trivially disprovable ("updated weekly" against dateModified sampling)
app/page.tsx:933        | 5c | HIGH | "Every guide backed by AHRI certifications, DOE data, and ACCA Manual J calculations" | soften — troubleshooting/how-to guides are not AHRI-backed
app/page.tsx:987-988    | 5c | HIGH | "No affiliate links or referral fees" (list item) | keep-as-is — factually true, remains true after ads
app/articles/page.tsx:126 | 5a | HIGH | "45+" (Calculators, quick-stats widget) | reconcile — internal contradiction with homepage "31" and reality (9-25)
app/articles/page.tsx:8   | 5a | HIGH | "355 HVAC articles" | reconcile — matches MDX count, but "articles+guides+calculators+resources" implies more than 355 total
app/layout.tsx:22        | 5a | HIGH | "355 articles, 31 interactive calculators" (default metadata description) | reconcile
components/layout/Footer.tsx:97   | 5a | HIGH | "355 Guides" (trust bar) | keep — matches MDX
components/layout/Footer.tsx:102  | 5a | HIGH | "31 Calculators" | reconcile
components/layout/Footer.tsx:107  | 5c | HIGH | "100% Unbiased" | reword — subjective absolute, hard to defend; propose "editorially independent" or drop
app/troubleshooting/page.tsx:456-475 | 3 | HIGH | "1. Dirty filter 35% · 2. Refrigerant issues 22% · 3. Capacitor failure 18% · 4. Thermostat problems 15% · 5. Drainage clogs 10%" (Top AC Problems) | source or cut — presented as data with no citation; percentages sum to 100 (constructed)
app/troubleshooting/page.tsx:481-499 | 3 | HIGH | "1. Ignition issues 28% · 2. Dirty filter 25% · 3. Thermostat malfunction 20% · 4. Pilot light problems 15% · 5. Blower issues 12%" (Top Heating Problems) | source or cut
app/troubleshooting/page.tsx:507-524 | 3 | HIGH | "Filter replacement 95% · Thermostat 75% · Breaker/power 60% · Drainage 50% · Refrigerant 0% (Pro only)" (DIY Fix Success Rate) | source or cut — completely unsourced success-rate stat, the "Refrigerant 0% Pro only" line is defensible on EPA-608 grounds but the rest are made up
app/privacy/page.tsx:136 | 5c | HIGH | "❌ Create user profiles for advertising" | reword before ad onboarding — becomes false the moment an ad network is added
app/privacy/page.tsx:159 | 5c | HIGH | "Service Providers: Analytics (Google Analytics), hosting (Vercel/AWS), email services" | expand — add ad-network processor row before Raptive onboards
app/privacy/page.tsx:5-6 | 4a | HIGH | lastUpdated = 'February 12, 2026' + effectiveDate = 'January 1, 2026' | refresh on ad-network onboarding
app/disclaimer/page.tsx:5 | 4a | MED-HIGH | lastUpdated = 'February 12, 2026' (hard-coded, 5 months stale) | refresh
app/disclaimer/page.tsx:196 | 3 | MED-HIGH | "Prices vary by location (50-200% variation)" | source or hedge
app/editorial-policy/page.tsx:63 | 5b | LOW-MED | "Last updated: June 26, 2026" | tolerable freshness gap (~2 weeks), refresh at batch time
public/ads.txt          | — | HIGH | file **missing** | create ads.txt at ad-network onboarding time (not before)
```

### MED severity — verify, soften, or add source note

```
app/page.tsx:87         | 1 | MED | "our {totalArticles}+ expert guides" | soften — the plural "our" reads team-authored; site is single-author (per about/editorial-policy). Consider "the site's" or "Marko's" or accept as editorial-voice plural.
app/page.tsx:112, 223, 276, 356, 375, 517, 816, 833, 953 | 4a | MED | multiple "2026" year-in-body/title/link markers | policy call — either commit to genuine 2026 refresh cadence and add automation, or de-year (evergreen phrasing) at batch time
app/page.tsx:359        | 3 | MED | "Quietest Models (42 dB)" — link label as data claim | cite in destination article or drop dB from link text
app/page.tsx:375        | 3 | MED | "Quiet Models (48 dB)" | same
app/page.tsx:655-668    | 3 | MED | Price ranges "$3,500-$7,500" (AC install), "$2,500-$6,500" (furnace), "$2,000-$5,000" (mini split), "$4,000-$8,000" (heat pump) as answer values on homepage widget | link-of-truth — either cite range on destination page (mostly do) OR add a "national estimate — see [linked] cost guide for regional detail" line
app/page.tsx:684        | 3 | MED | "Good AFUE rating? 90-95% AFUE" | cite via link
app/page.tsx:688        | 3 | MED | "Good HSPF2? 8.5+ HSPF2" | verify — 8.5 HSPF2 is above ENERGY STAR minimum (~7.8 depending on class); confirm and cite
app/page.tsx:738        | 3 | MED | "Heat pump kWh? 2-5 kW/hr" | reword — "kW/hr" is unit-nonsense (kW is already a rate); change to "2–5 kW" or "2–5 kWh per operating hour"
app/page.tsx:730        | 3 | MED | "Mini split watts? 500-1500W" | cite via link
app/page.tsx:734        | 3 | MED | "Furnace watts? 300-800W" | cite via link
app/page.tsx:943        | 5c | MED | "Following ASHRAE, ACCA, EPA, and ENERGY STAR guidelines in all recommendations" | soften — "in all" is sweeping; propose "where applicable"
app/page.tsx:996        | 5c | MED | "Equal coverage of all major brands" | verify — brand-reviews taxonomy covers Premium (4), Value (4), High-Efficiency (4), Commercial (3) = 15 brands; verify parity claim is defensible
app/brand-reviews/page.tsx:7-11, 208 | 4a | MED | "HVAC Brand Reviews 2026" title/H1 + og:title | policy call — see F4
app/brand-reviews/page.tsx:159-183 | 3 | MED | "winner: Tie/Goodman for budget/Lennox for features/Mitsubishi overall" (Head-to-Head Comparison meta on hard-coded list) | acknowledge subjective, add basis line ("selected on warranty parity + AHRI-tier match") or drop "Winner" label in favor of "Which fits which buyer"
app/air-quality/page.tsx:155,160,165 | 3 | MED | "90%" / "30-50%" / "99.97%" stat callouts | cite — "99.97%" is HEPA definition (verifiable to DOE/HEPA std), the other two need inline source
app/hvac-dictionary/page.tsx (dictionary entries) | 3 | MED | ~50 acronym+definition entries with technical stats | spot-check for citations; likely defensible if aligned with authority-body definitions
content/indoor-air-quality-testing.mdx:30 | 3 | MED-LOW | "Indoor air can be 2-5 times more polluted than outdoor air, according to EPA data" | verify — EPA has published this, add explicit source link
content/indoor-air-quality-testing.mdx:124 | 1 | MED | "Case Study: 2,400 sq ft Colonial Home" | reword — narrative device, but "Case Study" reads clinical; propose "Worked Example" or add an inline "illustrative scenario, not a real customer case"
content/hvac-noise/how-to-reduce-hvac-noise.mdx:359 | 1 | MED | "Case Study: The Full-Stack Treatment" | same disposition
content/smart-thermostats/smart-thermostat-savings.mdx:4 | 1 | MED | "Data-driven analysis of smart thermostat energy savings in 2026. Real utility data, EPA-verified numbers, and homeowner case studies showing exactly how much you'll save" | verify — "homeowner case studies" claim needs backing or reword
content/smart-thermostats/best-smart-thermostats.mdx:121 | 1 | MED | "The Martinez family's 3,200 sq ft two-story home ... $312 in savings against a $355 investment" | verify or label — same "invented persona" risk as troubleshooting stats; needs "illustrative" tag or a real cited source (e.g., an ecobee-published Honeywell case study)
content/mini-split-air-conditioners/mini-split-installation-cost.mdx:4 | 1 | MED | "real contractor quotes" (in description) | verify — either produce citations or soften ("distributor listing prices + industry cost guides")
content/tankless-water-heaters/best-electric-tankless-water-heaters.mdx:258 | 1 | LOW-MED | "Setup: Home office with a half-bath 40 feet from the main water heater. Hot water took 30+ seconds to arrive." | reword — narrative worked-example scenario; label as illustrative
content/tankless-water-heaters/best-tankless-gas-water-heaters.mdx:236 | 1 | LOW-MED | "Result: Total install: $7,200. Annual gas savings vs 75-gallon tank: $280. Unlimited hot water for the first time — the family previously ran cold" | reword — same
content/air-quality/best-air-purifiers-for-smoke.mdx:90 | 1 | MED | "During the 2026 Pacific Northwest wildfires, Austin Air HealthMate users reported maintaining livable indoor conditions even at outdoor AQI 300+" | verify or soften — "users reported" implies collected reports; cite or reword
content/air-quality/quietest-air-purifiers.mdx:114 | 1 | MED | "Sarah wakes at the slightest noise. She chose a Coway Airmega 400 … She hasn't noticed it once in 6 months of nightly use." | reword — invented user testimonial-shaped; label illustrative
content/air-quality/best-large-room-air-purifiers.mdx:154 | 1 | LOW-MED | "Result: Cooking odors dissipate noticeably faster. PM2.5 monitor shows spikes from stove use drop from 30+ ug/m3 back to under 5 within 20 minutes." | reword or label illustrative
content/hvac-noise/hvac-noise-levels-explained.mdx:381 | 2 | LOW | "Research from the World Health Organization shows that nighttime noise above 40 dB inside bedrooms disrupts sleep" | verify — WHO does publish night-noise guidelines; add explicit link
content/refrigerants/r410a-vs-r32-refrigerant.mdx:332 | 3 | LOW-MED | "Over 100 million R-32 systems operate globally … with no reported fire incidents from the refrigerant" | verify — Daikin has published this figure; cite
content/mini-split-air-conditioners/mini-split-for-bedroom.mdx:149, various | 3 | LOW-MED | "Mitsubishi MSZ-FH ... 19 dB on low fan speed" | verify per SKU against AHRI/manufacturer spec — editorial policy already commits to this
content/energy-costs/energy-costs-guide.mdx and 20+ hvac-costs-by-state files | 3 | LOW-MED | State-by-state kWh rates, dollar averages, "$XX/year" savings | verify vs EIA current data; the site's editorial-policy commits to primary-source verification, so most likely defensible
content/hvac-brands/*, content/brand-reviews/* (all brand pages) | 4a | MED | "in 2026 the best X is [brand model]" phrasing | policy call — best-of-year year-tagging
```

### LOW severity — freshness stamps, evergreen dating, phrasing polish

```
app/page.tsx:112               | 4a | LOW | "2026 Updated" (hero stat block) | tie to actual `dateModified` freshness policy
app/page.tsx:223,276           | 4a | LOW | "2026 Standards" on SEER2 calculator, "for 2026 efficiency standards" | reword — SEER2 took effect Jan 1, 2023, not 2026
app/page.tsx:343,356,517,816   | 4a | LOW | "Best X 2026", "2026 Tax Credits" link labels | de-year at batch F
app/page.tsx:1032              | 5a | LOW | "Browse All {totalArticles} Guides" | dynamic, OK
app/[slug]/page.tsx via lib/schema.ts (dateModified fallback) | 4a | LOW | ArticleMeta.dateModified falls back to datePublished if absent | tighten — either enforce explicit dateModified per MDX (F2) or accept fallback
components/layout/Footer.tsx:179 | 4a | LOW | © {new Date().getFullYear()} | dynamic, OK
app/disclaimer/page.tsx:196    | 3 | LOW-MED | "Prices vary by location (50-200% variation)" | cite or hedge
content/mini-split-air-conditioners/best-{2,3,4,5}-zone-mini-split.mdx (multiple) | 4a | LOW | "The best 2/3/4/5-zone system in 2026 is the Mitsubishi MXZ-XCXXNAHZ ..." | policy call — best-of-year decay
content/**/**.mdx (widespread) | 5b | LOW | frontmatter `datePublished: "2026-02-07"` / `dateModified: "2026-02-07"` across ~50+ files | most are recent; the specific "2026-02-07" stamp appears across many tax and roundup files → looks like a batch-set date rather than a per-article publish date. Consider genuine per-file dateModified.
content/**/**.mdx (widespread) | 5a | LOW | contentType placeholders `NEW` (38), `KEEP+` (32), `TRANSFORM` (31), `new` (5) | assign terminal editorial type (F2)
public/sitemap.xml (373 URLs vs 375 real routes) | 5a | LOW | ~2 URL drift | regen at build; investigate the missing entries
content/{energy-efficiency,mini-splits,ac-sizing,heat-pumps,ac-troubleshooting}/ | — | LOW | literal-brace-expansion directory, empty | filesystem cleanup (see F5)
content/indoor-air-quality-testing.mdx | — | LOW | at content root, not clustered | move under `content/indoor-air-quality/` or explicit orphan-cluster policy (F5)
CLAUDE.md (Next 15 / 353 pages / "~1 of 353 indexed") | — | LOW | stale project notes | refresh CLAUDE.md at batch time (F1)
```

**Uncatalogued but noted at the pattern level:**
- **Lane 2 (~3,056 hits):** the AHRI/EPA/DOE/ENERGY STAR/ASHRAE/ACCA/NIST/NREL/LBNL name-drops. Almost all are legitimate sourcing footprint (e.g., `Sources: AHRI Directory, ENERGY STAR — Ductless Heating and Cooling`). Only the ones asserting a specific numeric claim without a corresponding link are risky, and those overlap with Lane 3 items already catalogued.
- **Lane 3 (dB / % / kWh / lifespan tokens ~1,800+ hits):** the vast majority are inside spec tables where the file's `externalLinks` frontmatter already provides source URLs (AHRI Directory, ENERGY STAR, DOE). Spot-check against the article's own `Sources` block before flagging any single line as a violation.
- **Lane 5b (`2026` / freshness ~2,906 hits):** overwhelmingly the year-in-title + frontmatter dateModified pattern. This is a policy question, not per-page. Handle as batch F4 (evergreen vs commit-to-refresh).

---

## STEP 3 — Schema / JSON-LD inventory

### Schemas emitted by `lib/schema.ts` (single source of truth for author/article/breadcrumb/FAQ/HowTo/WebSite):

| `@type` | Emitter | Emitted on | Data provenance | Compliance note |
| --- | --- | --- | --- | --- |
| `Person` | `generatePersonSchema()` | `app/about/page.tsx` (with `@id`) | AUTHOR_* constants: Marko Visic, BSc Physics, University of Ljubljana, LinkedIn `https://www.linkedin.com/in/marko-visic/` | **CLEAN** — real, verifiable, single named author. `sameAs` links to LinkedIn. `alumniOf` to real institution. `worksFor` = Moving Data Systems d.o.o., Slovenia, real address `Smolnik 62, 2342 Ruše, SI`. No fabricated credentials. |
| `Article` | `generateArticleSchema(meta)` | every `[slug]` article | `meta.author` field is IGNORED — schema always uses the real Person `@id`. Author is not per-article-configurable. | **CLEAN** — single named author across the site, matches visible byline in `components/layout/AuthorBox.tsx`. `datePublished` and `dateModified` come from MDX frontmatter, with `dateModified` falling back to `datePublished` in `lib/content.ts:92`. |
| `FAQPage` | `generateFAQSchema()` + `components/ui/FAQ.tsx` | any article with FAQ block | Q/A pulled from MDX-authored `faqData` | Fine — genuine Q/A pairs; no fake ratings. |
| `HowTo` | `generateHowToSchema()` | (available; usage not verified in this pass) | | Fine when used with real step lists. |
| `BreadcrumbList` | `generateBreadcrumbSchema()` | every article ([slug] page.tsx:49-53) + presumably category pages | 3-item chain: Home → cluster → article | Fine. |
| `WebSite` | `generateWebSiteSchema()` + inline on `app/page.tsx:1043` | homepage | SearchAction → `/search?q={}` | **⚠** `SearchAction` targets `/search?q=…` but no `/search` route exists in `app/`. Either build a search route or drop the SearchAction from the schema. Flag SS1. |
| `Organization` | inline on `app/page.tsx:1053` (homepage only) | homepage | name = "HVAC Base", logo url, sameAs = self-URL | **CLEAN** — no `founder`, `foundingDate`, `numberOfEmployees`, team, or address on Organization node. That's the right call for a single-owner site — nothing to fabricate. Note: `Person.worksFor` on the About page carries the publisher entity name and address (`Moving Data Systems d.o.o.`); the homepage `Organization` uses the site name ("HVAC Base") without the publisher entity. Not a violation, but the two names are inconsistent — consider harmonizing (F6). |
| `ImageObject` | inline on `app/page.tsx:1056` | homepage (nested under Organization.logo) | Points to `/logo.png` | Verify the file exists at `public/logo.png`. |
| `Review` / `AggregateRating` / `ratingValue` / `reviewCount` | **NONE FOUND** anywhere | — | — | **BIG COMPLIANCE WIN.** The site self-labels three MDX files as `contentType: "review"` (Senville, MrCool DIY, Daikin) but does NOT emit `Review` JSON-LD — the [slug] renderer emits `Article` for those. Similarly the `/brand-reviews` page and `/brand-reviews/*` subroutes describe brands qualitatively but assign no numeric star ratings and emit no `AggregateRating`. The brand-reviews page carries an explicit source comment (`page.tsx:16-20`): *"No numeric brand ratings — we do not run a contractor survey or own bench equipment, so any '4.7/5 stars' precision would be fabricated."* This is exactly what ad-network review wants to see. |

### Schema/visible-text coherence checks

- **Author byline (visible) vs `Article.author` (schema):** both = `Marko Visic, BSc Physics` (`AuthorBox.tsx:9` + `schema.ts:8`). **Match.**
- **Publisher name mismatch (F6):** `Article.publisher.name` = `"Moving Data Systems d.o.o."` (schema.ts:84). Homepage inline `Organization.publisher.name` = `"HVAC Base"` (page.tsx:1054). Two different `Organization` nodes, not linked by `@id`. Reviewer might read this as "two publishers," but it's more likely just a legacy inline snippet. Consolidate to one Organization with `@id` and reference it from Article.publisher.
- **`dateModified` vs visible "updated" text:** the article renderer (`[slug]/page.tsx`) does not appear to render a visible "Last updated: {date}" line in the article header (must confirm in `ArticleLayout`, not read in this pass). If ArticleLayout displays a date, it should match `article.meta.dateModified`. Flag as SS2 for the batch to verify.
- **Sitemap → schema → visible-count trilogy:** 373 sitemap `<loc>` / 355 MDX / 20 static / "31 calculators" / "45+ calculators" / "355 articles" — all reconciled in STEP 4 below.

---

## STEP 4 — Count reconciliation

| Surface | Claimed | Source of claim | Reality | Verdict |
| --- | --- | --- | --- | --- |
| Articles | **355** | `app/layout.tsx:22`, `app/page.tsx:1046`, `app/articles/page.tsx:8`, `components/layout/Footer.tsx:97` | 355 `.mdx` files under `content/` | **Matches. Keep.** |
| Total site URLs | 353 | `CLAUDE.md` | 375 (20 static + 355 dynamic) | Stale CLAUDE.md. Fix at F1. |
| Sitemap URLs | (implied 375) | `public/sitemap.xml` | 373 `<loc>` entries | 2 missing routes — investigate whether they were dropped intentionally or by the sitemap generator. |
| Calculators (homepage hero) | **31** | `app/page.tsx:108` | **9** files with `contentType: "calculator"`; **9 + 13 `calculator-guide` = 22** if broadening; **9 + 13 + 3 `tool` = 25** maximally broad | **Overclaim of 6–22.** Reduce to defensible number. Recommend: use `calculator` + `tool` = 12, OR count MDX filenames with `/*calculator*/` slug patterns (empirically defensible). Recommendation: run one query, pick one canonical number, everywhere. |
| Calculators (Site metadata) | **31** | `app/layout.tsx:22`, `app/page.tsx:1046` (WebSite schema) | same | Reconcile with hero. |
| Calculators (Articles page quick stats) | **45+** | `app/articles/page.tsx:126` | same | **Internal contradiction** — 31 vs 45+. Pick one. |
| Calculators (Footer trust bar) | **31** | `components/layout/Footer.tsx:102` | same | Reconcile. |
| Guides | 355 | Footer trust bar | 355 MDX | Match. But "guides" and "articles" are used interchangeably; consider one terminology. |
| Categories | Object.keys(byCluster).length (dynamic) | `app/articles/page.tsx:114` | 29 in `categoryInfo` map + fallbacks; MDX has 36 distinct cluster values | Some clusters render with fallback names because `categoryInfo` map is incomplete (misses e.g. `air-purifiers-air-quality`, `air-purifier-brands`). F3. |
| Site claim: `"Updated weekly"` | on homepage `app/page.tsx:953` | — | Cannot be substantiated from git log at a `weekly` cadence across 355 files | **Overclaim.** Rewrite to a commit the operational cadence actually meets (e.g., "reviewed at each editorial pass" or drop). |
| `foundingDate` / `numberOfEmployees` | **not asserted** | — | (single-owner site — nothing to reconcile) | Clean. |
| Author count | 1 (Marko Visic) | AuthorBox + schema | 1 | Match. |

**Single defensible numbers for external use:**
- **Articles: 355** (matches file count and sitemap-shape).
- **Calculators: 9** (strict), **12** (calculators + tools), or **25** (all calculator-adjacent) — pick one and use it everywhere. Recommend 9 (strict, defensible from `contentType: "calculator"` field) unless a broader count is auditable.
- **Total categories: 20 taxonomy hubs** (5 top-level: air-conditioning, heating, heat-pumps, energy-efficiency, air-quality) + editorial groupings.

---

## STEP 5 — Independence vs monetization coherence

### Current state (pre-ad-network)

- **No display ads live.** Only `googletagmanager.com/gtag/js?id=G-ZCKSNVFR5V` (GA4) in `app/layout.tsx:88`. Confirmed by grep — no Raptive, AdThrive, AdSense, GPT/googletag ads, pubads code.
- **No affiliate links.** Grep for `amazon.com|amzn.to|tag=|/go/|aff_|sponsored` returned 9 hits — **all 9 are self-negations** ("no affiliate links", "no sponsored content"). Zero true affiliate URLs.
- **Editorial policy commitment:** "no affiliate links · no first-person measurements · no testing lab · no payment for reviews or rankings" (`app/editorial-policy/page.tsx:44-48`). Very strong.
- **Privacy policy commitment:** "We do NOT ❌ Sell personal information / ❌ Share data with HVAC contractors without consent / ❌ Use data for unrelated marketing / ❌ Create user profiles for advertising / ❌ Store calculator inputs beyond session" (`app/privacy/page.tsx:131-138`).

### Current-state coherence: ✅ CLEAN

Every independence claim on the site is defensible against the current (pre-ads) architecture. Ad-review reviewer visiting today would find: real author, real publisher, no fake ratings, no affiliate links, honest disclaimers about limits.

### Post-ad-network coherence: ⚠ WILL BREAK

The moment a Raptive/AdSense/GPT tag ships, **the following claims become false or overreaching**. All are HIGH severity for the pre-review batch:

| Location | Claim | What happens after ads onboard | Fix |
| --- | --- | --- | --- |
| `app/page.tsx:922` | "no affiliate links or sponsored content" | Display ads are "sponsored content" in Google's own vernacular | Change to "no affiliate links and no paid product placements. This site funds itself through display advertising, which does not influence editorial decisions." |
| `app/privacy/page.tsx:136` | "❌ Create user profiles for advertising" | Every ad network creates ad-targeting profiles | Rewrite the whole cookie/tracking table to disclose ad-network data processors (Raptive, its downstream DSPs) |
| `app/privacy/page.tsx:159` | "Service Providers: Analytics (Google Analytics), hosting (Vercel/AWS), email services" | Ad-network processors omitted | Add ad-network row + DSPs |
| `app/privacy/page.tsx:281-283` | "California Residents: Additional rights under CCPA including right to know, delete, opt-out of sale (we don't sell data)" | Under CCPA/CPRA, ad-network cookie sharing may qualify as "sale" or "sharing for cross-context behavioral advertising" | Rewrite to reflect actual CPRA obligations post-ads |
| `app/editorial-policy/page.tsx:42-48` | "We do not accept payment for reviews or rankings, and the site carries no affiliate links" | REMAINS TRUE (display ads ≠ paid rankings ≠ affiliate) | Add explicit line: "The site displays third-party programmatic ads to fund operations. Ad content is served by ad networks and is not selected by, endorsed by, or reviewed by HVACBase's editorial team." |
| `app/disclaimer/page.tsx` | (no ad disclosure section currently) | Missing required disclosure | Add a "Advertising" section: ads are served by third parties, not editorial. |
| `components/layout/Footer.tsx:107` | "100% Unbiased" | Sweeping absolute is easy to challenge | Change to "editorially independent" or drop the trust-bar tile |
| `app/page.tsx:163` | trust-bar chip: "No Affiliate Links" | REMAINS TRUE | Keep. |
| `public/ads.txt` | file missing | Ad network onboarding requires authorized-seller declaration | Create ads.txt at onboarding (Raptive will provide the required lines) |

**Reminder for the pre-review sequence:** the fixes above should ship **before** the ad tag is pasted, not after. Ad review at Raptive/AdThrive checks the site as it stands, and any of those overreaching claims will be quoted back in the rejection email.

---

## Proposed batch plan (for your approval — nothing edited yet)

Batches are ordered so early ones unblock later ones and no batch introduces regressions the next batch must undo. **Every batch reads and previews BEFORE/AFTER for each change before applying.**

### Batch A — Independence-language reconciliation (pre-ads pass)
**~10 changes across 6 files.** Rewrite the sweeping absolute claims so they survive both the pre-ad state and the post-Raptive state.
- `app/page.tsx:922, 953, 933, 943, 988, 992, 996` — rewrite trust-signal copy
- `app/editorial-policy/page.tsx:42-48` — add explicit "ads are served by third parties, not editorial" line
- `app/disclaimer/page.tsx` — add "Advertising" section
- `components/layout/Footer.tsx:107` — "100% Unbiased" → "Editorially independent"
- `app/privacy/page.tsx:131-159` — cookie table + processor list + CCPA/CPRA language
- **Prereq for onboarding Raptive.**

### Batch B — Count reconciliation
**~6 changes across 4 files.** Pick one calculator number, use it everywhere; harmonize "guides" vs "articles" wording.
- Pick calculator number (recommend **9**, defended by `contentType: "calculator"` in frontmatter); update `app/layout.tsx:22`, `app/page.tsx:108, 1046`, `app/articles/page.tsx:126`, `components/layout/Footer.tsx:102`
- Update `CLAUDE.md` (Next 15 → 14.2, 353 → 375)

### Batch C — Unsourced-stats sweep (Lane 3, HIGH-only)
**~5 changes across 3 files.** Either cite or delete every stat-shaped claim that a reviewer would flag without needing to read the article.
- `app/troubleshooting/page.tsx:456-524` — decide: source (find a real DOE/BLS survey and cite) or delete the three "Top Problems / DIY Success Rate" boxes. Recommend delete unless a real primary source is at hand.
- `app/disclaimer/page.tsx:196` — "50-200% variation" price stat: cite or hedge
- `app/page.tsx:738` — fix nonsensical "kW/hr" unit
- `app/air-quality/page.tsx:155, 160, 165` — cite "90%" / "30-50%" callouts; keep "99.97%" HEPA definition

### Batch D — Tax/decay verification (Lane 4b post-OBBBA)
**Read-only audit + patches only if drift found.** Prior commits (`raptive-fix/12-tax-comprehensive`, `fix(heat-pumps-cluster): 4 live 25C+25D credit claims`, etc.) claim comprehensive coverage. **Sample 10 random tax-mentioning files** (not the top-30 already known-clean) and grep for any residual `"$2,000 tax credit"` / `"claim 25C for a 2026 install"` / `"you can get $8,000 for a heat pump in 2026"` style claims. Patch any survivors.
- Suggested random-sample: 5 files from `content/hvac-costs-by-state/*` + 5 files with 15-25 tax hits (mid-density) that weren't in the recent fix commits.

### Batch E — Persona / illustrative-scenario labeling (Lane 1 MED items)
**~6-10 changes.** The Marko-Visic authorship is real and clean. The remaining Lane 1 flags are illustrative narrative devices ("Case Study: 2,400 sq ft Colonial", "The Martinez family in Chicago") that read like invented user testimonials. Either:
- Add an explicit inline label ("Illustrative worked example" / "Modeled scenario") — recommended, or
- Cite a real customer case (unlikely to exist).
- Files: `content/indoor-air-quality-testing.mdx:124`, `content/hvac-noise/how-to-reduce-hvac-noise.mdx:359`, `content/smart-thermostats/{smart-thermostat-savings.mdx:4, best-smart-thermostats.mdx:121}`, `content/mini-split-air-conditioners/mini-split-installation-cost.mdx:4`, `content/tankless-water-heaters/{best-electric-tankless-water-heaters.mdx:258, best-tankless-gas-water-heaters.mdx:236}`, `content/air-quality/{best-air-purifiers-for-smoke.mdx:90, quietest-air-purifiers.mdx:114, best-large-room-air-purifiers.mdx:154}`.

### Batch F — Freshness / year-in-title policy
**Policy call first, ~20-40 changes second.** Decide which of the two paths to commit to:
- **Path F.a — Genuine 2026 refresh cadence:** commit to touching every year-tagged file quarterly, update `dateModified`, add a "reviewed 2026-Q3" line. Keeps SEO year-freshness signal. Higher ongoing cost.
- **Path F.b — Evergreen phrasing:** de-year every article title and hero card ("Best Mini Splits 2026" → "Best Mini Splits"), keep only tax/rebate articles year-tagged (since the underlying law is genuinely year-anchored). Rewrite Page.tsx "2026 Standards" / "2026 Updated" copy. Lower ongoing cost.
- Also within this batch: refresh policy-page `lastUpdated` stamps (`app/privacy/page.tsx:5-6`, `app/disclaimer/page.tsx:5`, `app/editorial-policy/page.tsx:63`) to a live formula or a fresh date.

### Batch G — Structural / schema polish
**~5 changes across 3 files.** Not blocking ads.
- Consolidate homepage `Organization` (page.tsx:1053) with `Article.publisher` (schema.ts:82) using `@id` so a reviewer sees one Publisher across the site (F6)
- Drop the phantom `SearchAction` in WebSite schema (no `/search` route exists) OR build the search route (SS1)
- Verify `public/logo.png` exists to satisfy the ImageObject reference
- Confirm ArticleLayout renders visible "Last updated" text that matches `article.meta.dateModified` — patch if drift (SS2)
- Update `CLAUDE.md` (Next 15 → 14.2, 353 → 375) if not caught in Batch B (F1)

### Batch H — Content taxonomy cleanup
**~1-2 hours; not blocking ads.** Consolidate MDX `cluster` values (`air-purifiers-air-quality` vs `air-quality` vs `indoor-air-quality` vs `air-purifier-brands`; same for space-heaters and air-conditioners variants) — F3. Move orphan `content/indoor-air-quality-testing.mdx` under its proper cluster dir. Delete the empty literal-brace-expansion directory `content/{energy-efficiency,mini-splits,ac-sizing,heat-pumps,ac-troubleshooting}/` (F5). Assign terminal `contentType` to the 106 `NEW`/`KEEP+`/`TRANSFORM`/`new` placeholders (F2) — pure editorial hygiene, not policy.

### Recommended execution order

1. **Batch A** (independence-language) — unblocks Raptive review
2. **Batch B** (count reconciliation) — small, cheap, removes an easy reviewer catch
3. **Batch C** (unsourced-stats sweep on 3 pages) — removes the most damaging visible-in-30-seconds flags
4. **Batch D** (tax audit) — verification-only for the recent OBBBA sweep, patch if drift
5. **Batch F.a or F.b** (year-in-title policy call) — user decides, then the batch executes
6. **Batch E** (illustrative-scenario labeling) — polish, not blocking
7. **Batch G** (schema polish) — polish, not blocking
8. **Batch H** (taxonomy hygiene) — polish, not blocking

**A + B + C + D is the minimum ad-review readiness set.** Everything else raises the ceiling but doesn't block.

---

## Fast-path checklist for the pre-Raptive-onboarding gate

- [ ] Batch A applied (independence-language cleaned)
- [ ] Batch B applied (calculator count reconciled, one number everywhere)
- [ ] Batch C applied (troubleshooting stats sourced or removed)
- [ ] Batch D sampled 10 random tax-mentioning files, no OBBBA-drift found (or patched)
- [ ] `public/ads.txt` created **at** onboarding time (Raptive-provided lines)
- [ ] Privacy policy re-dated, ad-network processor row added
- [ ] Disclaimer section on "Advertising" added

---

*End of triage. No files were modified during this run except this document. Grep artifacts retained in the harness cache at `~/.claude/projects/-workspace/…/tool-results/` for cross-check.*
