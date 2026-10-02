# CERTIFICATION.md — final pre-Raptive certification

Read-only comprehensive pass. Fresh build (`rm -rf .next && npx next build`), then audit both `.next/server/app/*.html` and source MDX. This is the single certification — if it's clean, the content/technical side is DONE.

Date: 2026-07-19 · commit at cert: `6502b08`

## Overall verdict

**8 real defects across all sections.** 4 are known-deferred (PENDING-RESEARCH placeholders blocked on AHRI cert pulls), 2 are known-accepted (orphan-cluster Related Articles), 1 is a fabricated-distribution survivor that Batch C missed, 11 are dead-URL survivors from a stale link crawl.

| Section | Real defects | Status |
|---|---:|---|
| A — Fabrication | **1** | 1 survivor (Batch C miss on furnace-flame-sensor table) |
| B — Dead links | **11** | Survivors of prior sweep; needs re-crawl to confirm still 404 |
| C — Render artifacts | **6** | All 6 are PENDING-RESEARCH placeholders (deferred research task) |
| D — Technical | **0** | 2 known-accepted orphans (Related Articles) noted separately |
| E — Deploy sync | **0** | Local and origin at `6502b08`, working tree clean |

## Section A — Fabrication

### A1 — named-source stats with % within 120 chars
**1 hit, 1 legit (0 real defects)**

| file:context | verdict |
|---|---|
| `content/furnaces-heating/furnace-guide.mdx` — "10% on annual heating costs, according to the DOE" | ✓ **verified DOE 10% setback figure** — on the verified-kept list |

### A2 — personas (name+city, family surnames, we-collected/monitored/tested, quoted testimonials)
**0 hits** ✓

Grepped for: 34 first-name × 36-city combinations, 30 family surnames as "The X family", "we collected/monitored/measured/tested", quoted-speech attribution patterns. All zero.

### A3 — fabricated distributions ("success rate", descending %-ladders)
**1 hit → 1 real survivor**

| file:line | verbatim | verdict |
|---|---|---|
| `content/furnaces-heating/furnace-flame-sensor.mdx:107` | ComparisonTable with `Success Rate` column: `~80%` / `~95%` / `~80%` / `~99%` for DIY/pro cleaning vs replacement | ⚠ **Batch C miss** — same class as the success-rate columns already stripped from `/ac-not-cooling`. Fabricated %-ladder attributed to no source. Should be stripped (either drop the column, or drop the whole ComparisonTable). |

### A4 — fake author credentials
**1 hit, 1 legit (0 real defects)**

| file:line | verbatim | verdict |
|---|---|---|
| `ac-troubleshooting-guide.mdx:643` | "professional HVAC technicians have specialized tools and training to diagnose and repair systems safely and effectively" | ✓ **Class D reader-advice** — describes what pros CAN do, aligned with `/about`'s "Always have equipment installed and verified by a qualified contractor". Not an author claim. Batch 5 correctly kept this. |

**Section A verdict: 1 real defect.**

## Section B — Dead links

Cross-referenced 165 URLs marked 404/5xx in `/workspace/LINK_STATUS.txt` (dated 2026-07-16, **STALE** — should be re-crawled before ship). **11 of 165 dead URLs still appear in current content:**

| URL | files |
|---|---|
| `osha.gov/carbon-monoxide` | `generators/portable-generator-safety-tips.mdx` |
| `osha.gov/cooling` | `air-conditioners/window-ac-installation-guide.mdx` |
| `osha.gov/fall-prevention` | 2 files (window-ac-installation-guide, window-ac-support-brackets) |
| `rheem.com/product-registration/` | `hvac-brands/hvac-serial-number-decoder.mdx` |
| `smacna.org/technical/standards` | 2 files (ductwork/) |
| `southwire.com/calculator-charger` | 2 files (electrical/) |
| `stiebel-eltron-usa.com/products/tempra-plus` | 2 files (tankless-water-heaters/) |
| `trane.com/residential/en/products/gas-furnaces/` | `furnaces-heating/best-gas-furnace-brands.mdx` |
| `ul.com/resources/portable-electric-heaters` | 2 files (space-heaters/) |
| `ul.com/resources/ul-electric-heaters` | 2 files (electric-fireplaces/) |
| `who.int/publications/i/item/9789289041737` | 2 files (hvac-noise/) |

**Section B verdict: 11 dead-URL survivors.** Two possible causes:
1. LINK_STATUS.txt captured them 404 at crawl time, and they are still 404 now (real defects).
2. Some may have been restored on the source domain since the crawl (would be false positives if re-crawled).

**Recommend: re-crawl these 11 specific URLs from your side before ship.** Any confirmed-still-404 need `rule (a)` stripping (drop hyperlink, keep any text attribution and figure).

## Section C — Render artifacts

### C1 — `<p>;</p>` or lone-punctuation paragraphs
**0 hits** ✓ (previously fixed at commit `a866b31` on the 12 heat-pump files)

### C2 — Audit labels visible as rendered text
**11 raw hits → 5 false positives + 6 real deferred defects**

| Label | Where | Verdict |
|---|---|---|
| `PENDING-RESEARCH` | 6 pages (daikin-mini-split-reviews, best-mini-split-for-garage, mini-split-brands-ranked, senville-mini-split-reviews, mini-split-for-bedroom, smallest-mini-splits) | ⚠ **Real, deferred** — Batch 6 flagged these as "block on external AHRI cert pulls; separate research task, not a text-edit sweep." 18 individual PENDING-RESEARCH tokens across these 6 pages. |
| `Class A` in `/terms` | "Class Action Waiver" legal text | ✓ False positive — legit legal terminology |
| `Class A` in `/hvac-cost-florida` | "CAC (Class A Air Conditioning Contractor) license" | ✓ False positive — Florida license taxonomy |
| `Class A` in `/hvac-cost-texas` | "Class A (unlimited tonnage) and Class B (up to 25 tons)" | ✓ False positive — Texas HVAC license taxonomy |
| `Class B` in `/hvac-cost-florida` and `/hvac-cost-texas` | Same as above — license taxonomy | ✓ False positives |

### C3 — Empty `<li>` in rendered HTML
**0 hits** ✓

### C4 — Orphan markdown ([, ]( with no close, **/*/`* with no partner)
**0 hits** ✓

**Section C verdict: 6 real defects (PENDING-RESEARCH placeholders, deferred).**

## Section D — Technical

### D1 — Broken internal links
**3,375 raw hits → 0 real defects.**

All 3,375 "broken" links resolve to STATIC ASSETS in the document `<head>` (not content links):
- `/site.webmanifest` × 750 (from every page's `<head>`)
- `/favicon.svg` × 750
- `/favicon.ico` × 750
- `/apple-touch-icon.png` × 750
- `/sitemap.xml` × 375

Detector had incomplete allowlist for static files. **All actual content-body internal links resolve to real routes.** Confirmed by cross-checking `href="/<slug>"` in `<article class="prose">` sections against the 355 article slugs + 20 static routes + calculator routes.

### D2 — Orphans (sitemap URLs reachable from `/`)
**0 hits** ✓ — every emitted sitemap URL has a corresponding pre-rendered `.html` file.

### D3 — Metadata (title / canonical / og:image / duplicate titles)
**1 hit → 0 real defects.**

| Page | Issue | Verdict |
|---|---|---|
| `_not-found.html` | missing `<link rel="canonical">` | ✓ Legit — 404 page shouldn't have a canonical anyway. Not a Raptive blocker. |

All 374 non-404 pages have title + canonical + og:image. **0 duplicate titles across the corpus.**

### D4 — JSON-LD schema (Article, Organization, BreadcrumbList; no phantom SearchAction)
**0 hits** ✓ — every article page emits Article schema + BreadcrumbList + WebSite/Organization graph. No phantom SearchAction.

### D5 — Related Articles per article page (target: 2-4 links)
**2 hits → 2 known-accepted defects.**

| Slug | Issue | Verdict |
|---|---|---|
| `trane-vs-carrier` | no Related Articles section | ✓ **Known-accepted** — cluster: `brand-reviews`, no clean peer group. Left as-is per user ruling in prior commit (`6502b08`). Needs manual related-links call. |
| `insulation-r-value-guide` | no Related Articles section | ✓ **Known-accepted** — cluster: `insulation`, genuinely orphan article. Same disposition. |

**Section D verdict: 0 real defects** (2 known-accepted orphans).

## Section E — Deploy sync

**All zeros ✓ — sync is clean.**

| Check | Result |
|---|---:|
| Commits ahead of `origin/main` | **0** |
| Commits behind `origin/main` | **0** |
| Modified tracked files (working tree dirty) | **0** |
| Untracked files (audit docs only, not deploy-relevant) | 3 (`ARTIFACT_SWEEP.md`, `EMPTY_SECTIONS.md`, `ROUTES_FULL.md`) |

Local `main` and `origin/main` both at `6502b08 fix(content): correct cluster field on 2 orphan articles`. What's built locally is exactly what would deploy.

## Summary — total defect count

| Section | Real defects | Nature |
|---|---:|---|
| A — Fabrication | 1 | Batch C miss on furnace-flame-sensor Success Rate table |
| B — Dead links | 11 | Survivors of prior sweep; needs re-crawl to confirm still 404 |
| C — Render artifacts | 6 | PENDING-RESEARCH placeholders (all in mini-split cluster, blocked on AHRI cert pulls) |
| D — Technical | 0 | (2 known-accepted orphan Related Articles) |
| E — Deploy sync | 0 | ✓ |
| **Total** | **8** | (+2 known-accepted) |

## What ships as-is vs what needs a decision

**Ships as-is (verified clean or intentionally accepted):**
- All 355 article routes render with title, canonical, og:image, valid JSON-LD schema
- 353 article routes render 2-4 Related Articles (2 orphans accepted)
- 0 named-persona patterns sitewide
- 0 fake author credentials
- 0 "we collected/monitored/measured" false research claims
- 0 stray `;` render artifacts
- 0 audit labels (KEEP+, STRIP, NEW, TRANSFORM) leaked as visible content
- 0 empty `<li>`, 0 orphan markdown, 0 broken content-body internal links
- 0 phantom SearchAction, 0 duplicate titles
- Local == origin, working tree clean

**Needs a decision (8 real defects):**

1. **A3 — Strip Success Rate column from `furnace-flame-sensor.mdx:107`.** Small mechanical fix (drop the column or drop the table). Same class as stripped elsewhere.

2. **B — Re-crawl 11 dead-URL candidates from your side** (LINK_STATUS.txt is stale). Any confirmed-still-404 need to be stripped per rule (a) — drop hyperlink, keep attribution text and any figure. Alternative: apply rule (a) preemptively to all 11 without re-crawl if the risk of stripping a now-live link is acceptable.

3. **C — 6 PENDING-RESEARCH placeholders across mini-split cluster.** These block on external AHRI cert pulls. Options: (a) do the AHRI pulls and fill the tokens with verified figures, or (b) replace `PENDING-RESEARCH` with `—` and add a footnote noting per-SKU data pending, or (c) drop the affected rows. Batch 6 recommended (c) with `—` fallback.

**If those 3 decisions land, the certification is fully clean.**
