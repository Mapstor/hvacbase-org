# REAPPLY_VERIFICATION.md — Gate 8 audit

**Branch under audit:** `raptive-fix/release` (44 commits beyond main, 1 merge + 43 stacked gate commits)
**Build:** ✅ `npm run build` → **376 / 376 pages** clean
**Verdict:** 🔴 **RED** — 4 blockers must be resolved before submission.

Audit was read-only on `raptive-fix/release`; no source modified.

---

## 🔴 Blockers (must fix before submission)

| # | Location | Issue | Fix needed |
|---|---|---|---|
| 1 | `app/page.tsx:941` | Homepage shows a **"100% Unbiased"** trust-signal badge. Same class of self-asserted claim that we removed from `/brand-reviews` in Gate 5. Inconsistent. | Strip the "100% Unbiased" badge from the homepage trust strip (matching the Gate 5 brand-reviews fix), or replace with a sourced/verifiable claim. |
| 2 | `content/hvac-costs-by-state/hvac-cost-florida.mdx:331` | FAQ answer asserts the **$2,000 federal tax credit "more than offsets"** the heat-pump cost premium in 2026. Present-tense, no expiration framing. | Reframe per §A: the federal 25C credit (up to $2,000) expired for installs after Dec 31, 2025; state and utility rebates remain the active 2026 pathway. |
| 3 | `content/hvac-costs-by-state/hvac-cost-illinois.mdx:217` | "Dual-fuel wins on economics" callout still cites **the $2,000 federal tax credit** as helping close the payback gap in 2026. Present-tense. | Same OBBBA-expired reframing as #2. |
| 4 | `content/energy-efficiency-ratings/hspf2-rating-explained.mdx:230` | FAQ answer "**To qualify for the $2,000 federal heat pump tax credit under Section 25C, you need a heat pump with at least 9.0 HSPF2…**" — present tense, no expiration mention. | Same OBBBA-expired reframing; can keep HSPF2 9.0+ as the threshold note since it still maps to ENERGY STAR / state rebate eligibility. |

These are all of the same class as the ones earlier gates fixed; they slipped past §A's grep sweep because the literal token differed slightly (`federal tax credit` vs `federal 25C tax credit`) or the line lived in a FAQ-answer string. They are 1-line edits each.

---

## ✅ Passing checks

### Fabricated data

| Check | Result | Evidence |
|---|---|---|
| No live `40.1 SEER2` / `industry-leading [0-9]` spec claims | **PASS** | 9 hits for `40.1 SEER2` in `/content` — **all 9 are honest correction references** (e.g. "previously-claimed `40.1 SEER2 was a fabrication`"). 2 `industry-leading` hits: Rinnai RU199iN 11 GPM and Trane 12-yr compressor warranty — both verifiable mfr claims, not fabricated spec numbers. |
| No phantom `40HQV` model | **PASS** | 2 hits — both honest "previously-listed phantom model, removed" references in `best-mini-split-ac-units.mdx` + `mini-split-brands-ranked.mdx`. |
| Spec ledger clean | **PASS** | `spec-ledger.csv`: 132 rows, RFC-4180 quoted, parses with 0 column-count mismatches. Status counts: AHRI-VERIFIED 26 / PENDING-RESEARCH 24 / OK-RETAINED 17 / DELETED 16 / CORRECTED 13 / B1-FINAL 6 / B4-FINAL 6 / B5-FINAL 5 / B2-FINAL 5 / A-FINAL 5 / B3-FINAL 5 / PENDING-AHRI 2 / C-FINAL 2. |
| AHRI cert refs render | **PASS** | `215710688` (Daikin Aurora) appears in 4 content files; `209832204` (Mitsubishi MSZ-FS12NA) appears in 4 content files. Inline alongside the verified specs. |

### Fake expertise / testing / history

| Check | Result | Evidence |
|---|---|---|
| No first-person testing language | **PASS** | `grep -niE "we tested\|we evaluated\|we measured\|controlled conditions\|[0-9]+ models (we\|tested)" content/ app/` → **0 hits**. |
| No fake credentials | **PASS** | 26 grep hits for `10\+ years` etc., but **every match is a lifespan, equipment-age, or homeowner planning-horizon context** — none claim "10+ years of HVAC experience" or "team of NATE-certified experts". The `app/buying-guides/page.tsx:395` "Licensed contractor with insurance" hit is reader-advice ("how to evaluate a contractor before hiring"), not a self-claim. |
| No fabricated tenure / traffic | **PASS** | 4 hits total; all false positives: `hvac-rebates-by-state.mdx:331` ("programs active since 2024–2026" — about state programs, not site), `portable-air-conditioners.mdx:50` ("Since 2024, the DOE…" — about DOE rule, not site), `central-ac-cost-to-install.mdx:212` (`$10K+` — pricing tier, not traffic). The one real `100% Unbiased` hit on `app/page.tsx:941` is captured as **Blocker #1**. |

### Fake ratings

| Check | Result | Evidence |
|---|---|---|
| No fabricated star ratings | **PASS** | `grep -niE "rating: 4\.\|marketShare:\|reliabilityRankings" app/brand-reviews/` → **0 hits**. |
| No `aggregateRating` / `Review` / `Rating` JSON-LD | **PASS** | `grep -niE "aggregateRating\|@type.{0,4}Review\|@type.{0,4}Rating" app/ components/` → **0 hits**. |

### Real identity

| Check | Result | Evidence |
|---|---|---|
| Zero `{{TODO-IDENTITY}}` markers in shipped code/content | **PASS** | 19 grep hits — **all in historical doc files** (`cert-patch-summary.md`, `identity-summary.md`, `strip-summary.md`, `needs-verification.md`, `GATE3_IDENTITY_LOCKED.md`, `GATE7_8_MERGE_VERIFY_PROMPT.md`). Zero hits in `/app`, `/content`, `/components`, `/lib`. |
| "Marko Visic, BSc Physics" byline renders | **PASS** | Present in `app/about/page.tsx`, `app/contact/page.tsx`, `app/editorial-policy/page.tsx`, `components/layout/AuthorBox.tsx`, `components/seo/SEOHead.tsx`, `lib/schema.ts`. |
| AuthorBox in article layout | **PASS** | `components/layout/AuthorBox.tsx` exists; imported by `components/layout/ArticleLayout.tsx`. |
| Person JSON-LD on `/about` with sameAs LinkedIn, alumniOf, worksFor Moving Data Systems d.o.o. | **PASS** | `app/about/page.tsx` imports `generatePersonSchema`, `AUTHOR_LINKEDIN`; calls `generatePersonSchema()`; references "Moving Data Systems d.o.o., Slovenia" in body + schema. |
| `/contact` shows real entity + `info@hvacbase.org`; no role-email theater | **PASS** | `app/contact/page.tsx` shows `info@hvacbase.org`, real publisher entity (Moving Data Systems d.o.o., Smolnik 62, 2342 Ruše, Slovenia), real owner (Marko Visic, BSc Physics). Zero hits for `hello@` / `contact@` / `support@` / `press@` / `partnerships@`. |
| Author photo file present | **PASS** | `public/authors/marko-visic.jpg` (26.5 KB) and `public/authors/marko-visic-large.jpg` (49 KB) both exist. |

### YMYL tax

| Check | Result | Evidence |
|---|---|---|
| 25C + 25D framed as expired after Dec 31 2025 | **PASS** | "Dec 31, 2025" / "placed in service" framing present across 7 files in `content/tax-credits-rebates/` and `content/heat-pumps/`. |
| No live "claim $2,000 federal" 2026 claims | **PARTIAL → see Blockers** | 23 total grep hits; 20 are properly framed as expired (past tense, OBBBA caveat) or as 2025-historical examples. **3 remaining present-tense assertions** (Blockers #2, #3, #4). |
| 45L framed as active through June 30 2026, NOT lumped with Dec-2025 | **PASS** | Present in `content/tax-credits-rebates/25c-tax-credit-explained.mdx` and `hvac-tax-credits-2026.mdx`; correctly distinguished as builder credit with separate expiration date. |
| OBBBA dated correctly (signed July 4, **2025** — NOT 2026) | **PASS** | `grep -ni "July 4, 2026"` in `content/` → **0 hits**. |

### Render / structure

| Check | Result | Evidence |
|---|---|---|
| No empty FAQ headings | **PASS** | `grep "^## Frequently Asked Questions" content/` → **0 hits**. The FAQ component owns the heading rendering with empty-guard. |
| No broken Featured-Guides links (`/buying-guides`) | **PASS (spot check)** | Page renders with internal `Link href` references to real guide slugs. Build passes for the page (376/376). |
| Homepage doorway collapsed (IAQ single anchor) | **PARTIAL** | Homepage references `/air-quality` (line 552) and `/indoor-air-quality-testing` (line 602) — 2 distinct links, but to 2 distinct legitimate IAQ pages (the cluster hub + a specific spoke). Not a doorway pattern. Acceptable, though if the original audit specified "single anchor" strictly, line 602 could be folded into the cluster page. |

### Serving / policy

| Check | Result | Evidence |
|---|---|---|
| No `ads.txt` present | **PASS** | `find . -name ads.txt -not -path "./node_modules/*"` → **0 hits**. |
| No AdSense / ad code | **PASS** | `grep -niE "adsbygoogle\|ca-pub-\|googlesyndication\|pagead2" app/ components/ public/` → **0 hits**. |
| Affiliate position consistent (no affiliate links) | **PASS** | 5 affiliate-related strings on `app/page.tsx` and `app/terms/page.tsx`, all consistently stating **"no affiliate links / no affiliate commissions / no sponsored content"**. The single `app/terms/page.tsx:288` hit uses "affiliates" in a legal indemnification clause (entities affiliated with the publisher) — different sense, unrelated. |
| `sitemap.xml` + `robots.txt` present | **PASS** | `public/sitemap.xml` and `public/robots.txt` both present. |
| Build clean (376 pages) | **PASS** | `npm run build` → `✓ Generating static pages (376/376)`. No warnings, no errors. |

---

## PENDING items (not blockers — all honestly marked on-page)

The spec ledger retains **24 `PENDING-RESEARCH`** + **2 `PENDING-AHRI`** rows. Per Gate 5 cleanup summary scope, these are intentionally out-of-scope for the locked spec files. Verified each renders honestly on the page:

| Marker class | Examples | On-page rendering |
|---|---|---|
| `PENDING-RESEARCH` (24 rows) | Senville size variants (09CD, 18CD, 24CD), Daikin Emura / Quaternity / Fit lines, Bosch Climate 5000, Pioneer WYS, MrCool 18K/24K garage sizes, Fujitsu RLS3 18K | All carry the literal `` `PENDING-RESEARCH` `` token inline in the MDX tables (e.g. `best-mini-split-for-garage.mdx:68-72`, `daikin-mini-split-reviews.mdx:39-42`, `mini-split-brands-ranked.mdx:127,130`). Not asserted as facts. |
| `PENDING-AHRI` (2 rows) | Carrier Infinity 38MPRAQ / 40MPHAQ, Mitsubishi MSZ-FH cold-climate variant | Carry the literal `` `PENDING-AHRI` `` token at `best-mini-split-ac-units.mdx:139-140` and `mini-split-brands-ranked.mdx:125-126`. Honest "cert pull pending" framing. |

✅ **PENDING items not blockers.** They are surfaced to readers as gaps rather than asserted as fact.

---

## Audit grep evidence (raw counts)

```
# Fabricated data
40.1 SEER2 / industry-leading        content/  9 hits — all correction refs
40HQV                                content/  2 hits — both "phantom, removed"
AHRI Cert 215710688 (Daikin)         content/  4 files
AHRI Cert 209832204 (Mitsubishi)     content/  4 files

# Fake expertise
we tested / we evaluated / we measured / controlled conditions    0
fake credentials (real grep, after filtering 10+ years lifespan)  0
fabricated tenure (real grep, after filtering)                    1 — Blocker #1

# Fake ratings
rating: 4.X / marketShare / reliabilityRankings (app/brand-reviews/)  0
aggregateRating / @type Review|Rating (app/, components/)             0

# Real identity
TODO-IDENTITY in /app, /content, /components, /lib                    0
Marko Visic byline files                                              6
AuthorBox component                                                   present + imported by ArticleLayout
Person JSON-LD on /about with Moving Data Systems d.o.o.              present
info@hvacbase.org on /contact                                         present
role-email aliases (hello@, contact@, support@, etc.)                 0
public/authors/marko-visic.jpg                                        present
public/authors/marko-visic-large.jpg                                  present

# YMYL tax
"December 31, 2025" / "placed in service" in tax files                7 files
"$2,000 federal" total hits                                           23
  - properly expired-framed                                           20
  - present-tense (BLOCKERS)                                          3
"June 30, 2026" 45L framing                                           2 files
"July 4, 2026" (wrong OBBBA date)                                     0

# Render / structure
## Frequently Asked Questions in content/                             0
sitemap.xml + robots.txt                                              present

# Serving / policy
ads.txt                                                               0
adsbygoogle / ca-pub- / googlesyndication / pagead2                   0
"100% Unbiased" badge                                                 1 — Blocker #1

# Build
npm run build                                                         376/376 pages clean
```

---

## Verdict

🔴 **RED — not ready to submit.**

**4 blockers, all 1-line fixes:**
1. Strip "100% Unbiased" homepage badge (`app/page.tsx:941`).
2. Reframe present-tense $2,000 credit claim in `hvac-cost-florida.mdx:331`.
3. Reframe present-tense $2,000 credit claim in `hvac-cost-illinois.mdx:217`.
4. Reframe present-tense $2,000 credit claim in `hspf2-rating-explained.mdx:230`.

All other checks PASS. Once the 4 above are reframed, this branch should be GREEN.

Recommend: a small follow-up gate commit on `raptive-fix/release` (or a new `raptive-fix/06-finals` cut from /release) that applies these 4 reframings, then re-runs the audit and reports GREEN.

No push, no merge to main, no destructive operations performed.
