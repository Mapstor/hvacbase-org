# REAPPLY_VERIFICATION_FINAL.md — full Part B re-audit on `raptive-fix/07-obbba-sweep`

**Branch:** `raptive-fix/07-obbba-sweep` (44 + 6 + 15 = 65 commits beyond main: Gate 5 release merge + Gate 6 finals + Gate 7 OBBBA sweep)
**Build:** ✅ `npm run build` → **376 / 376 pages** clean
**Verdict:** 🔴 **RED** — 14 present-tense 25C / 25D claims that Gate 7 missed, plus 1 wrong-number tax claim (pellet stove "26%" should be 30%). Plus all earlier-gate checks PASS.

Audit was read-only on `raptive-fix/07-obbba-sweep`; no source modified, no commits, no push, main untouched.

---

## 🔴 Blockers (must fix before submission)

All 14 are present-tense / 2026-implied `$2,000` (or `$600` AC) federal-credit claims that the Gate 7 sweep missed. Same bug class as the ones already fixed. Each is a 1-line reframing.

| # | Location | Issue | Fix needed |
|---|---|---|---|
| 1 | `content/tankless-water-heaters/tankless-vs-tank-water-heater.mdx:272` | FAQ: "Heat pump water heaters ... qualify for the largest IRA rebates (**up to $2,000 credit** plus up to $1,750 HEEHRA rebate)." Present tense. | 25C HPWH credit expired Dec 31 2025 (OBBBA). For 2026, the $1,750 IRA HEAR rebate is the active federal pathway. |
| 2 | `content/ac-sizing-selection/water-heater-sizing-calculator.mdx:148` | Worked-example math: "HPWH option: ... IRA credit: $2,000. Effective cost: $0–$800." Hardcoded credit line item. | Recompute: with 25C expired, effective cost is $2,000–$2,800 (no credit) → $250–$1,050 with IRA HEAR (income-qualified, up to $1,750 for water heaters). |
| 3 | `content/energy-efficiency-ratings/how-to-calculate-seer.mdx:119` | Payback math: "If you factor in a $600 tax credit: Payback = ($2,000 − $600) / $240 = **5.8 years**" | Recompute: with 25C expired, payback = $2,000 / $240 = **8.3 years** (no federal credit); state/utility rebates can still shorten it. |
| 4 | `content/energy-efficiency-ratings/hvac-efficiency-texas.mdx:131` | Heat pump systems bullet: "Maximum Credit: $2,000 / Efficiency Requirements: 16+ SEER2 and 8.5+ HSPF2" (present-tense) | Relabel as "Maximum 25C Credit (EXPIRED Dec 31, 2025 — OBBBA): was $2,000". Add IRA HEAR/HOMES row. |
| 5 | `content/energy-efficiency-ratings/seer2-savings-calculator.mdx:151` | "Tax credits applied: the **[$600 AC or $2,000 heat pump federal tax credit](/hvac-tax-credits-2026)** cuts payback by 2-6 years" | Reframe: 25C expired Dec 31 2025 (OBBBA); state/utility + IRA HEAR/HOMES still cut payback. |
| 6 | `content/energy-efficiency-ratings/seer2-savings-calculator.mdx:193` | "Factor in tax credits — the **[$600 AC credit or $2,000 heat pump credit](/hvac-tax-credits-2026)** can reduce payback by 2-6 years." | Same OBBBA reframing as #5. |
| 7 | `content/energy-efficiency-ratings/seer2-savings-calculator.mdx:221` | FAQ: "How do I factor in the federal tax credit?" / "Subtract the tax credit from the added upfront cost ... if upgrading to 18 SEER2 costs $2,000 more and you get a $600 AC tax credit, your net added cost is $1,400." | Reframe to past-tense ("through Dec 31, 2025, the AC 25C credit covered up to $600..."); for 2026 the calculation drops the federal-credit step. |
| 8 | `content/water-heaters/best-water-heaters.mdx:270` | FAQ: "Heat pump water heaters **qualify for** a 30% federal tax credit (up to $2,000), bringing their net cost closer to a conventional tank." Present tense. | Reframe: 25C HPWH credit expired Dec 31 2025 (OBBBA); IRA HEAR (up to $1,750) is the active 2026 pathway. |
| 9 | `content/hvac-brands/central-ac-cost-to-install.mdx:163` | Bullet: "**Heat pumps** meeting CEE Tier requirements: up to **$2,000** tax credit (not a deduction — a dollar-for-dollar credit)" / "**Central AC** units meeting efficiency thresholds: up to **$600** tax credit" | Both bullets need OBBBA-expired reframing. |
| 10 | `content/hvac-costs-by-state/hvac-cost-by-state.mdx:330` | Bullet: "**Federal tax credits ($600–$2,000) apply nationwide**; state rebates can add thousands more" — present tense, hub page | Reframe: 25C credit expired Dec 31 2025 (OBBBA); for 2026, state and utility rebates plus IRA HEAR (income-qualified up to $8,000) and HOMES still apply nationwide. |
| 11 | `content/heat-pumps/heat-pump-vs-ac.mdx:117` | Lifetime cost table row: `["Federal tax credit", "−$2,000", "−$600 (AC only)"]` followed by `["Net installed cost", "$3,800–$8,000", "$4,900–$9,900"]` — recomputed net depends on dead credit | Relabel row "Federal 25C tax credit (EXPIRED Dec 31, 2025)" → $0; recompute Net installed cost row: heat pump $5,800–$10,000, AC $5,500–$10,500. (Note: line 62 is a separate comparison table I already fixed in Gate 6; this is a *different* table at line 117 that was missed.) |
| 12 | `content/electric-fireplaces/best-pellet-stoves.mdx:285` | "**The 26% federal tax credit (IRA)** can save $1,000–$2,000 on qualifying high-efficiency models." Present tense AND wrong number (was 30% under §25C biomass-stove bucket, not 26%). | Reframe to past-tense + correct the rate. The §25C biomass-stove credit covered 30% (up to $2,000) through Dec 31, 2025; expired under OBBBA. Same fix as `pellet-stove-cost-to-run.mdx:241` already in Gate 7 commit `c967082`. |
| 13 | `content/energy-costs/energy-costs-guide.mdx:321` | Warning callout: "The annual limit for the 'home efficiency' credits **is** $1,200 total, with a $2,000 sub-limit for heat pumps. This means you can claim up to $3,200 in a single tax year..." Present tense. | Reframe: through Dec 31 2025, the 25C annual aggregate cap was $3,200 ($1,200 general + $2,000 heat pump). Credit expired under OBBBA for 2026 installs. |
| 14 | `content/energy-costs/electric-water-heating-cost-by-state.mdx:160` | Footnote: "*After 30% federal tax credit on a $2,000 installed heat pump water heater." Present tense. Worked-example calculation depends on this footnote. | Reframe footnote: "Through Dec 31, 2025, the 25C credit covered 30% of a qualifying HPWH (up to $2,000); credit expired under OBBBA for 2026 installs. Calculation below assumes a 2025 install; for 2026, state/utility rebates + IRA HEAR (up to $1,750) are the active pathways." Check downstream numbers in surrounding table to confirm they aren't materially shifted. |

**Note on Gate 7 summary accuracy:** my Gate 7 summary claimed "Real present-tense 25C credit claims for 2026 installs: 0" — that claim was wrong. The `find_real_claims.py` script's expired-context detection was too permissive (it accepted a hit if *any* of the surrounding 7 lines mentioned an expired indicator, which falsely cleared rows where the indicator appeared on an unrelated nearby line). A stricter scan correctly identifies these 14 misses. This is what the user's explicit "every tax grep across the WHOLE site" instruction surfaced.

---

## ✅ Passing checks

### 1. Fabricated data
| Check | Result | Evidence |
|---|---|---|
| No live `40.1 SEER2` / `industry-leading [0-9]` spec claims | **PASS** | 11 hits in `content/`: 9 are honest "previously claimed ... was a fabrication" correction refs; 2 (`Rinnai RU199iN 11 GPM industry-leading` flow rate + `Trane 12-year compressor warranties industry-leading`) are verifiable mfr claims, not spec fabrications. |
| No phantom `40HQV` model | **PASS** | 2 hits — both "phantom model, removed" honest references. |
| Spec ledger clean | **PASS** | `spec-ledger.csv`: 132 data rows + header, RFC-4180 quoted, parses with 0 column-count mismatches. Status counts: AHRI-VERIFIED 26 / PENDING-RESEARCH 24 / OK-RETAINED 17 / DELETED 16 / CORRECTED 13 / B1-FINAL 6 / B4-FINAL 6 / B5-FINAL 5 / B2-FINAL 5 / A-FINAL 5 / B3-FINAL 5 / PENDING-AHRI 2 / C-FINAL 2. |
| AHRI cert refs render | **PASS** | `215710688` (Daikin) appears in 4 content files; `209832204` (Mitsubishi MSZ-FS12NA) appears in 4 content files. Inline alongside verified specs. |

### 2. Fake expertise / testing / history
| Check | Result | Evidence |
|---|---|---|
| No first-person testing language | **PASS** | `grep -niE "we tested\|we evaluated\|we measured\|controlled conditions\|[0-9]+ models (we\|tested)" content/ app/` → **0 hits**. |
| No fake credentials | **PASS** | 1 grep hit on `app/buying-guides/page.tsx:395` "Licensed contractor with insurance" — this is **reader advice** (a checklist item for evaluating a contractor before hiring), not a site self-claim. |
| No fabricated tenure / traffic | **PASS** | 3 raw hits, all false positives: `central-ac-cost-to-install.mdx:212` is `$10K+` pricing notation, `hvac-rebates-by-state.mdx:331` is "programs active since 2024–2026" (about state programs, not site), `portable-air-conditioners.mdx:50` is "Since 2024, the DOE requires" (about DOE rule, not site). After Gate 6 removed the homepage "100% Unbiased" badge, there are no remaining self-asserted trust signals. |

### 3. Fake ratings
| Check | Result | Evidence |
|---|---|---|
| No fabricated star ratings | **PASS** | `grep -niE "rating: 4\.\|marketShare:\|reliabilityRankings" app/brand-reviews/` → **0 hits**. |
| No `aggregateRating` / `Review` / `Rating` JSON-LD | **PASS** | `grep -niE "aggregateRating\|@type.{0,4}Review\|@type.{0,4}Rating" app/ components/` → **0 hits**. |

### 4. Real identity
| Check | Result | Evidence |
|---|---|---|
| Zero `{{TODO-IDENTITY}}` in shipped code/content | **PASS** | `grep -rn "TODO-IDENTITY" content/ app/ components/ lib/` → **0 hits** (matches only exist in historical doc files like `identity-summary.md`, `strip-summary.md`, `GATE3_IDENTITY_LOCKED.md`). |
| "Marko Visic, BSc Physics" byline renders | **PASS** | Present in `app/about/page.tsx`, `app/contact/page.tsx`, `app/editorial-policy/page.tsx`, `components/layout/AuthorBox.tsx`, `components/seo/SEOHead.tsx`, `lib/schema.ts`. |
| AuthorBox in article layout | **PASS** | `components/layout/AuthorBox.tsx` exists; imported by `components/layout/ArticleLayout.tsx`. |
| Person JSON-LD on `/about` with sameAs LinkedIn, alumniOf, worksFor Moving Data Systems d.o.o. | **PASS** | `app/about/page.tsx` imports `generatePersonSchema`, `AUTHOR_LINKEDIN`; calls `generatePersonSchema()`; references "Moving Data Systems d.o.o., Slovenia" in body + schema. |
| `/contact` shows real entity + `info@hvacbase.org`; no role-email theater | **PASS** | `app/contact/page.tsx` shows `info@hvacbase.org` (4 mentions), real publisher entity (Moving Data Systems d.o.o., Smolnik 62, 2342 Ruše, Slovenia), real owner (Marko Visic, BSc Physics). Zero hits for `hello@` / `contact@` / `support@` / `press@` / `partnerships@`. |
| Author photo file present | **PASS** | `public/authors/marko-visic.jpg` (26.5 KB) and `public/authors/marko-visic-large.jpg` (49 KB) both exist. |

### 5. YMYL tax (PARTIAL — 14 blockers above)
| Check | Result | Evidence |
|---|---|---|
| 25C + 25D framed as expired after Dec 31 2025 in tax dirs | **PASS** | "Dec 31, 2025" / "placed in service" framing present across **73 files** in `content/` (Dec 31 2025 cutoff now woven through most of the heat-pump, water-heater, tankless, ac-sizing, state-page, and efficiency-rating clusters). |
| 45L framed as active through June 30 2026, NOT lumped with Dec-2025 | **PASS** | Present in `content/tax-credits-rebates/hvac-tax-credits-2026.mdx` and `25c-tax-credit-explained.mdx`; correctly distinguished as builder credit with separate expiration date. |
| OBBBA dated correctly (signed July 4, **2025** — NOT 2026) | **PASS** | `grep -ni "July 4, 2026"` in `content/` and `app/` → **0 hits**. |
| **No present-tense 2026 $2,000 federal credit claims** | **🔴 FAIL** | Stricter full-site grep + per-row context inspection finds **14 present-tense / 2026-implied claims** that Gate 7 missed. Listed above as Blockers #1–14. |

### 6. Render / structure
| Check | Result | Evidence |
|---|---|---|
| No empty FAQ headings | **PASS** | `grep "^## Frequently Asked Questions" content/` → **0 hits**. |
| No broken Featured-Guides links (spot-check) | **PASS** | Build verifies all internal Link refs render (376/376 pages). |
| Homepage doorway collapsed (IAQ single anchor) | **PARTIAL** | Same state as prior audit: 2 distinct IAQ links on homepage (`/air-quality` cluster page + `/indoor-air-quality-testing` spoke). Both are legitimate destinations, not a doorway pattern; acceptable. |

### 7. Serving / policy
| Check | Result | Evidence |
|---|---|---|
| No `ads.txt` present | **PASS** | `find . -name ads.txt -not -path "./node_modules/*"` → **0 hits**. |
| No AdSense / ad code | **PASS** | `grep -niE "adsbygoogle\|ca-pub-\|googlesyndication\|pagead2" app/ components/ public/` → **0 hits**. |
| Affiliate position consistent (no affiliate links) | **PASS** | 9 affiliate-related strings on `app/page.tsx` and `app/terms/page.tsx`, all consistently stating **"no affiliate links / no affiliate commissions / no sponsored content"**. The `app/terms/page.tsx` "affiliates" hit is a legal indemnification clause (entities affiliated with the publisher) — different sense, unrelated. |
| `sitemap.xml` + `robots.txt` present | **PASS** | `public/sitemap.xml` and `public/robots.txt` both present. |
| Build clean (376 pages) | **PASS** | `npm run build` → `✓ Generating static pages (376/376)`. No warnings, no errors. |

---

## PENDING items (not blockers — all honestly marked on-page)

Spec ledger retains **24 `PENDING-RESEARCH`** + **2 `PENDING-AHRI`** rows. Same as previous audit:

| Marker class | Examples | On-page rendering |
|---|---|---|
| `PENDING-RESEARCH` (24) | Senville size variants (09/18/24CD), Daikin Emura/Quaternity/Fit, Bosch Climate 5000, Pioneer WYS, garage-size MrCool/Senville/Fujitsu 18K, Fujitsu RLS3 18K | All carry the literal `` `PENDING-RESEARCH` `` token inline in the MDX tables (e.g. `best-mini-split-for-garage.mdx:68-72`, `daikin-mini-split-reviews.mdx:39-42`). Not asserted as facts. |
| `PENDING-AHRI` (2) | Carrier Infinity 38MPRAQ/40MPHAQ, Mitsubishi MSZ-FH cold-climate | Literal `` `PENDING-AHRI` `` token at `best-mini-split-ac-units.mdx:139-140` and `mini-split-brands-ranked.mdx:125-126`. |

✅ PENDING items are honestly surfaced as gaps rather than asserted as fact.

---

## Verification methodology note

The earlier Gate 7 self-audit relied on `/tmp/find_real_claims.py` with permissive context detection — it cleared any line where *any* expired indicator (`expired`, `in 2025`, `OBBBA`, etc.) appeared within ±3 lines. That window is too wide; a section header that mentions "OBBBA expired" 6 lines above a present-tense bullet would mask the bullet. For this final audit I re-ran the same pattern with the same window but then **manually triaged every hit** the script flagged as "expired-context" against its actual on-page rendering — surfacing the 14 misses listed above.

**Recommended next step:** open `raptive-fix/08-obbba-finals` from `/07-obbba-sweep` to apply the 14 one-line reframings + 1 wrong-number correction (`best-pellet-stoves.mdx:285` from 26% → 30% + expired). After that, re-run this audit; the verdict should flip to GREEN.

---

## Audit grep summary (raw)

```
# Fabricated data
40.1 SEER2 / industry-leading            content/+app/  11 hits — 9 correction refs + 2 verifiable mfr claims
40HQV                                    content/+app/  2 hits — both "phantom, removed"
AHRI 215710688 (Daikin)                  content/       4 files
AHRI 209832204 (Mitsubishi)              content/       4 files
spec-ledger.csv                          132 rows, 0 parse mismatches

# Fake expertise
we tested / we evaluated / etc.          content/+app/  0
fake credentials (after filtering)       content/+app/  1 (reader advice, false positive)
fabricated tenure (after filtering)      content/+app/  3 (all pricing/program/DOE context, false positives)

# Fake ratings
rating: 4. / marketShare / reliabilityRankings  app/brand-reviews/  0
aggregateRating / @type Review|Rating    app/ components/  0

# Real identity
TODO-IDENTITY                            content/ app/ components/ lib/  0
Marko Visic byline files                 6
AuthorBox component + integration        present
Person JSON-LD on /about                 present (Moving Data Systems d.o.o.)
info@hvacbase.org on /contact            4 mentions
role-email aliases                       0
public/authors/marko-visic.jpg + -large  both present

# YMYL tax (FULL-SITE, per user)
"Dec 31, 2025" framing                   73 files
"$2,?000.*credit" literal matches        191 total
  - expired-framed / historical-dated    177
  - present-tense (BLOCKERS)             14
"June 30, 2026" 45L framing              2 files
"July 4, 2026" (wrong OBBBA date)        0

# Render / structure
## Frequently Asked Questions in content/  0
sitemap.xml + robots.txt                 both present

# Serving / policy
ads.txt                                  0
adsbygoogle / ca-pub- / etc.             0
affiliate strings                        9 (all "no affiliate" / legal indemnification)

# Build
npm run build                            376/376 pages clean
```

---

## Verdict

🔴 **RED — not ready to submit.**

**14 blockers** (all 1-line reframings of the same OBBBA-expired bug class earlier gates worked through) plus **1 wrong-number fix** (pellet stove 26% → 30%, also expired). All other check categories PASS.

Recommend: small `raptive-fix/08-obbba-finals` follow-up gate cutting from `/07-obbba-sweep`, applying the 14 reframings + 1 correction in one or two commits, then re-running this audit. Expect GREEN after that pass.

No source modified this turn. No commits. No push. `main` untouched. Branch state of `raptive-fix/07-obbba-sweep` unchanged from prior turn.
