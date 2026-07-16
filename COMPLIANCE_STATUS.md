# hvacbase.org — Compliance status pull

**Run date:** 2026-07-13 · read-only scope pull, no edits.
**Source of truth:** `COMPLIANCE_TRIAGE_hvacbase.md` (batches A–H) + `git log --grep="fix(compliance)"` (which commits actually landed).

---

## Batch table (A → H)

| Batch | Scope (one line) | Severity | File count (scoped) | Status | Evidence |
| --- | --- | --- | --- | --- | --- |
| **A** | Independence-language reconciliation + privacy overhaul + About "how it's funded" + CMP + Consent Mode wiring | **HIGH** (Raptive-blocking) | ~24 changes across ~11 files | **PREVIEWED, NOT APPLIED** — A2 sitewide independence claims + A4 disclaimer Advertising section + A5 editorial policy ads paragraph + A6 footer "100% Unbiased" → "Editorially Independent" are all ready but unshipped. A3 (privacy) HARD-BLOCKED on prereqs P1 (CMP install), P2 (Consent Mode v2 wiring), P3 (Raptive boilerplate). A1 (About "how funded" paragraph) held until ad tag is live. **Zero A-commit on `git log --grep="fix(compliance)"`.** Verified: Footer.tsx:107 still `"100% Unbiased"`; page.tsx:88 still `"No affiliate links, no bias — just accurate information"`; page.tsx:922 still `"no affiliate links or sponsored content"`; page.tsx:933 still `"Every guide backed by AHRI certifications, DOE data, and ACCA Manual J calculations"`; page.tsx:951 still `"Always Current"`; page.tsx:953 still `"Updated weekly with 2026 efficiency standards…"`. | BATCH_A_PREVIEW.md · unshipped |
| **B** | Reconcile displayed calculator count to strict `contentType: "calculator"` = 9 across all surfaces (visible + schema + OG); drop hub header count | HIGH | 5 files, 6 edits | **DONE — commit `bc5d579`** | git log; certifying grep zero survivors; LOCAL `next build` (376 pages) confirmed emitted OG meta = `"9 interactive calculators"`, WebSite JSON-LD `.description` = `"355 articles and 9 calculators…"`, hero widget = `>9<`, articles widget = `>9<`, footer trust bar = `>9 Calculators<`, hub header rendered without a numeric count |
| **C** | Delete constructed / unsourced stat-charts (Lane 3 HIGH); widened to Tier-1 same-class survivors (C.1) + schema-emitting FAQ answers (C.2) | HIGH | 22 files, ~65 edits, across 3 commits | **DONE — commits `752dfe4` (C + C.1), `fa8a6f3` (C.2)** | git log; BATCH_C_APPLY.md, BATCH_C1_VERIFY.md, BATCH_C2_PREVIEW.md, BATCH_C2_VERIFY.md, BATCH_C2_CENSUS.md; certifying greps all zero |
| **D** | Verify OBBBA completeness across tax-mentioning files; sync `cost-guides` `Federal Tax Credits` card | HIGH (compliance-critical) | Pre-existing waves + 1 new card TBD | **PARTIAL — primary sweep done pre-my-batches by other commits; my Batch C.1 stripped the OBBBA-stale `$2,000` figure from `cost-guides.tsx:215` and worklisted the card for eligibility rewrite** | Pre-existing commits: `6cfe39f Merge raptive-fix/12-tax-comprehensive`, `1172f5b fix(misc-cluster)`, `2a67eef fix(energy-costs-cluster)`, `7da6918 fix(heat-pumps-cluster)`, `52c67de fix(efficiency-ratings-seer)`, `4d6b65d fix(tankless-cluster)`, `acfe4fe fix(water-heater-stragglers)`, `bea27e1 fix(water-heaters-cluster)`. My C.1 also updated `cost-guides:215`. **Remaining D work:** rewrite the `Federal Tax Credits` card `title` + `eligible` list + `requirements` text (post-25C reality); ~10-random-tax-file spot-check per the triage plan (not explicitly done, but the top-30 density files were sampled during triage and passed) — logged in `BATCH_D_WORKLIST.md` |
| **E** | Persona / illustrative-scenario labeling (Lane 1 MED) — add "Illustrative worked example" / "Modeled scenario" labels to invented persona narratives (Colonial house Case Study, Martinez family, Sarah bedroom Coway, contractor quotes, etc.) | MED | ~10 specific lines across 8 files (per triage): `content/indoor-air-quality-testing.mdx:124`; `content/hvac-noise/how-to-reduce-hvac-noise.mdx:359`; `content/smart-thermostats/smart-thermostat-savings.mdx:4`, `best-smart-thermostats.mdx:121`; `content/mini-split-air-conditioners/mini-split-installation-cost.mdx:4`; `content/tankless-water-heaters/best-electric-tankless-water-heaters.mdx:258`, `best-tankless-gas-water-heaters.mdx:236`; `content/air-quality/best-air-purifiers-for-smoke.mdx:90`, `quietest-air-purifiers.mdx:114`, `best-large-room-air-purifiers.mdx:154` | **NOT STARTED** — no preview, no commit | triage doc; grep confirms all 10 lines still verbatim |
| **F** | Freshness / year-in-title policy — decide F.a (genuine 2026 quarterly refresh cadence + `Updated: 2026-Q3` visible line) vs F.b (evergreen de-year; drop "Best X 2026" titles except for tax/rebate articles); also refresh policy-page `lastUpdated` stamps (`privacy` Feb 12 · `disclaimer` Feb 12 · `editorial-policy` Jun 26) | LOW-MED (depends on chosen path) | F.a: ~15 files instrumentation; F.b: ~20-40 files title/copy edits | **NOT STARTED** — no path chosen, no preview, no commit | triage doc; page.tsx:951-953 `"Always Current" / "Updated weekly with 2026 efficiency standards…"` still present unchanged; sitewide MDX date stamps largely batch-set (`2026-01-15`, `2026-02-05`, `2026-02-06`, `2026-02-07`, `2026-02-08`) — Section 3 below flags the honesty concern |
| **G** | Structural / schema polish — consolidate homepage inline `Organization` node with `Article.publisher` via `@id`; drop phantom `SearchAction` in WebSite schema (no `/search` route); verify `public/logo.png` exists to satisfy `ImageObject` reference; confirm `ArticleLayout` renders a visible "Last updated" line that matches `article.meta.dateModified`; refresh `CLAUDE.md` (Next 15 → 14.2, 353 → 375 pages) | LOW-MED | ~5 changes across 3 files + CLAUDE.md | **NOT STARTED** | triage doc; no schema polish commits present |
| **H** | Content taxonomy cleanup — consolidate 36 MDX `cluster` values into ~24 canonical clusters (e.g., merge `air-quality` + `air-purifiers-air-quality` + `air-purifier-brands` + `indoor-air-quality`); move orphan `content/indoor-air-quality-testing.mdx` under a cluster dir; delete empty literal-brace-expansion directory `content/{energy-efficiency,mini-splits,ac-sizing,heat-pumps,ac-troubleshooting}/`; assign terminal `contentType` to the 106 files still tagged `NEW`/`KEEP+`/`TRANSFORM`/`new` | LOW (editorial hygiene, not compliance) | 106+ MDX + 1 file move + 1 dir delete | **NOT STARTED** | triage doc; grep for `contentType: "NEW"` still returns 38 files, `KEEP+` 32, `TRANSFORM` 31, `new` 5 |

**Total status:** 3 batches DONE (B, C, C.1, C.2 counted under C bucket), 1 batch PARTIAL (D — primary tax sweep pre-dates my compliance batches; one card card left), 4 batches NOT STARTED (E, F, G, H), 1 batch PREVIEWED-not-applied (A — Raptive-blocking). Batch A is the largest remaining compliance-critical item.

---

## Standard sweep (not tied to a lettered batch)

### 1. `ads.txt` — **MISSING**

- Not at `public/ads.txt`.
- Not at `app/ads.txt`.
- Not at repo root `ads.txt`.

**Consequence:** fine pre-Raptive (no ad networks are onboarded yet, so no `ads.txt` authorization record is expected). Required at Raptive onboarding: Raptive issues a per-publisher `ads.txt` include line + a set of authorized-seller records to paste into `public/ads.txt` (also `app-ads.txt` if apps ship). Marker for the Batch A ship checklist.

### 2. Ad-script / analytics coherence — **GA4 only, no ads, no CMP, no Consent Mode**

- **Loaded scripts (from `app/layout.tsx:86-101`):**
  - `googletagmanager.com/gtag/js?id=G-ZCKSNVFR5V` (Google Analytics 4)
  - Inline: `dataLayer.push(...)`, `gtag('js', new Date())`, `gtag('config', 'G-ZCKSNVFR5V')`
- **Ad networks: NONE.** No Raptive, AdThrive, AdSense, GPT/googletag, GTM, pubads, adsbygoogle, googlesyndication, carbonads. Search confirmed across `app/`, `components/`, `lib/`.
- **CMP: NONE.** No OneTrust, TrustArc, Cookiebot, Osano, Iubenda, Termly, Sourcepoint, Cookiepro. No `__tcfapi`, `__uspapi`, IABTCF/IABGPP hooks.
- **`package.json`: no ad or consent deps.**
- **Consent Mode v2: NOT INITIALIZED.** No `gtag('consent', 'default', ...)` block appears in the source. **GA4 currently fires unconditionally on every page load.** This is a GDPR/ePrivacy exposure for EU/UK visitors independent of any ad-network onboarding, and is prereq P2 from `BATCH_A_PREVIEW.md`.

### 3. Freshness stamps — Lane-5 count

Grepped sitewide (`.tsx`, `.ts`, `.mdx`) for four exact patterns. **Note the grep flags in the raw sweep undercounted due to a `-l`+`-c` interaction; the corrected direct-grep pass below is authoritative.**

| Pattern | Files hit | Line(s) |
| --- | --- | --- |
| `Updated weekly` | 1 | `app/page.tsx:953` — `"Updated weekly with 2026 efficiency standards, tax credits, and equipment releases"` |
| `Always Current` | 1 | `app/page.tsx:951` — `<h3>Always Current</h3>` (heading paired with the "Updated weekly" line) |
| `always current` (case-insens lowercase-scan) | 0 | — |
| `continuously updated` | 0 | — |
| `verified 20YY` | 0 | — |
| `Kept Current` / `Reviewed and revised as standards` (the Batch A proposed AFTER text) | 0 | — (Batch A un-applied) |

**Additional Batch-A-scope survivors** (found by direct greps on `app/page.tsx`):

- Line 88: `No affiliate links, no bias — just accurate information.`
- Line 922: `industry standards, and AHRI-certified efficiency ratings — no affiliate links or sponsored content.`
- Line 933: `Every guide backed by AHRI certifications, DOE data, and ACCA Manual J calculations`
- `components/layout/Footer.tsx:107`: `<div className="text-white font-semibold">100% Unbiased</div>`

**All of the above are Batch A AFTERs waiting on ship.** The initial triage catalogue is still accurate: Batch A hasn't been applied.

### 4. `dateModified` honesty

Sitewide inventory (376 MDX files, all with `dateModified` or `dateUpdated` frontmatter):

**By date stamp:**

- `2026-07-13` — **14 files.** Every one matches a compliance-batch touch. Zero drift (no file has a 2026-07 stamp without being in commit `752dfe4`, `fa8a6f3`, or a prior C-batch touch). Honest.
- `2026-06-26` — 3 files (`heat-pump-tax-credits-2026`, `best-mini-split-ac-units`, `mini-split-brands-ranked`) — from the June `raptive-fix` OBBBA-sweep waves. Honest.
- `2026-04-06` — 8 files (`ac-not-cooling`, `ac-troubleshooting-guide`, `portable-vs-window-ac`, `best-hvac-air-filters`, `boiler-vs-furnace`, `heating-cost-calculator`, `furnace-maintenance`, `radiant-floor-heating-pros-cons`) — likely an April refresh wave. Corresponds to a real edit commit? Need `git log` per file to confirm, not attempted in this sweep.
- `2026-04-20` — 2 files (`trane-vs-carrier`, `hvac-efficiency-texas`). Likely honest.
- `2026-02-13` — 1 file (orphan `indoor-air-quality-testing.mdx`).
- `2026-02-05 / 06 / 07 / 08` — the bulk: **~285 files** stamped in a 4-day window. This is a **batch-set stamp**, not real per-article edits. Very likely from a single mass-publish or regeneration event when the site went live.
- `2026-01-15` — 26 files in the `mini-split-air-conditioners` cluster + `evaporative-coolers` cluster — another batch date.

**Honesty concern (per Batch F scope):** the `2026-02-05` / `2026-02-06` / `2026-02-07` / `2026-02-08` stamps on ~285 MDX files read as recent per-article edits to a schema crawler. In practice they are a mass-set stamp from site launch/regen, not evidence of per-article authorship activity. Google indexes `datePublished`/`dateModified` from the emitted `Article` JSON-LD; if a reviewer or crawler samples a few articles and finds all identically dated within days, it can look pattern-y. Not an immediate compliance failure, but a Batch F disposition item: either
(a) accept as honest ("site regenerated at date X, this is when the current version of the article was published/updated"),
(b) rebase dates to reflect actual per-article git-history activity,
(c) leave as-is and start tracking real per-article dates from now on (my Batch C/C.1/C.2 already do this for the 14 files I touched — those show 2026-07-13, which IS real).

### 5. Confirmation that stripped strings stay stripped

Sitewide re-grep for compliance-batch removal targets: **all zero survivors.**

- `31 [Cc]alculator` / `45+ [Cc]alculator` / `100% Unbiased` (except the pending Batch A instance in Footer:107) — zero except the known-unfixed Footer line.
- The full Batch C / C.1 / C.2 removal targets (Chart 1/2/3 tuples, MrCool failure-rate figures, `Studies show` shells, 15-30% ES efficiency, 3-5% inconsistent-math, `Independent studies show 30-70%`, `Studies show 60-70%`, `Based on warranty claim data`, etc.) — all zero. Detail in the per-batch certify-grep sections of `BATCH_C_APPLY.md`, `BATCH_C2_PREVIEW.md`.

---

## Recommended next moves (informational, not decisions)

- **Ship-order under the current state:**
  1. Batch A2 + A4 + A5 + A6 (independence-language + disclaimer ads section + editorial-policy ads paragraph + footer "100% Unbiased" → "Editorially Independent"). Zero prereqs, ~11 files, ready to apply.
  2. P1 (choose + install CMP) + P2 (Consent Mode v2 in `app/layout.tsx`). Separate change; unblocks A3.
  3. Get P3 (Raptive privacy boilerplate) → apply A3 in the same commit as P1/P2.
  4. Apply A1 (About "how the site is funded" section) on the day the ad tag actually goes live.
  5. Remaining Batch D card rewrite (Federal Tax Credits eligibility copy per OBBBA) — currently only the `$2,000` figure stripped.
  6. E, F, G, H as scheduled — none are Raptive-blocking.

- **Post-push verification for the just-shipped commits (`752dfe4`, `fa8a6f3`, `bc5d579`):** curl the deployed site (after Vercel cache expiry) for the emitted OG meta + JSON-LD to confirm no CDN staleness. LOCAL build already confirmed clean; this is belt-and-suspenders.

---

*End of status. Nothing modified. Nothing committed.*
