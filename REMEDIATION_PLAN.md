# REMEDIATION_PLAN.md — hvacbase.org Raptive Reapply
**Sequenced execution plan with gates. No edits performed yet. Awaiting Marko's approval before any code changes.**

Plan date: 2026-06-26
Companion docs: `COMPLIANCE_TRIAGE_hvacbase.md`, `AUDIT.md`, `spec-verification.csv`

## How this plan is structured

Five gates (G1–G5), each ending in a Marko-approves checkpoint before the next gate starts. Inside each gate, batches are small and reviewable — **one logical fix per commit**, **one batch per PR** (or per small group of commits on a working branch). Localhost is the quality surface throughout. **No `git push` without explicit go.**

Order matters and is non-negotiable: the YMYL fix (D) and the fabricated-data fix (B) must land before any cosmetic batch. Raptive's reviewers can catch one or both of those in seconds; the cosmetic batches won't change that.

A **portfolio note** governs the cadence: the AdSense publisher ID is shared across Marko's portfolio. A scaled-content / fabricated-data finding here can affect ads on other sites. That makes "ship the riskiest cleanups first, never compound risk" the right posture.

---

## GATE 1 — Foundations (A0 + audit alignment)

**Goal**: get the prerequisites in place so the rest of the work doesn't have to revisit them.

### Batch A0.1 — `public/ads.txt`
- **Files**: `public/ads.txt` (new)
- **Why**: Raptive verifies `ads.txt` exists at site root before serving ads. Absence blocks ad delivery regardless of content review.
- **Action**: Wait for Raptive to provide the canonical `ads.txt` contents for Marko's publisher. Add them verbatim. Verify by curling `https://www.hvacbase.org/ads.txt` after deploy.
- **Note**: do NOT add Raptive's JS yet. That goes last (Gate 5 / batch G2).
- **Time estimate**: ~10 min
- **Verification**: `curl -sI https://www.hvacbase.org/ads.txt | head -3` → 200 OK + Content-Type text/plain

### Batch A0.2 — Disclosure stubs
- **Files**: `app/disclaimer/page.tsx`, `app/privacy/page.tsx`
- **Why**: when Raptive code lands, the site needs an "Advertising" section that names display advertising as a monetization mechanism. Drafting the *stub* now (with a placeholder "as of [date] we do not yet serve display ads") makes it a one-line edit when ads go live.
- **Action**: add an "Advertising & Monetization" subsection to both pages. Today: "HVACBase does not currently serve display advertising. When display advertising is introduced, it will be served by an independent ad network and disclosed here." When ads land: "HVACBase displays advertising served by Raptive (CafeMedia LLC). Ads are placed by the network and do not influence editorial content. We do not accept affiliate commissions, paid placements, or sponsored content on equipment recommendations."
- **Time estimate**: ~30 min
- **Verification**: visible on localhost; grep for the new section heading on production after deploy.

### Batch A0.3 — Skill installation
- **Files**: `~/.claude/skills/google-ai-content-policy/SKILL.md`
- **Why**: the audit was performed without the skill (it's MISSING per Step 0 of the triage). Before the pre-reapply sweep in Gate 5, the skill should be mounted so the final pass is authoritative.
- **Action**: install the skill per the brief's reference to `~/.claude/skills/google-ai-content-policy/SKILL.md`.

**GATE 1 close**: `ads.txt` live on production · disclosure stubs visible on `/disclaimer` and `/privacy` · skill installed.
**→ Marko approves before Gate 2 starts.**

---

## GATE 2 — P0 truth fixes (B + D) — the two hard gates from the brief

These two batches address the issues most likely to have caused the Raptive rejection. They go first because they're the issues a human reviewer can catch in 30 seconds, and because every other batch's verification depends on the spec values being stable.

### Batch B — Fabricated data sweep (`AUDIT.md` A1, `spec-verification.csv`)

**Goal**: every WRONG row in the CSV is either corrected to a verified value (with primary source) or the number is deleted. Every UNVERIFIABLE row is either verified-and-kept or deleted. Every "we tested" / "we evaluated" / "we measured" / "we ranked" / "controlled conditions" / "real-world testing" string is removed or replaced with sourced framing.

#### B.1 The MSZ-FS 40.1 SEER2 sweep (HIGHEST PRIORITY)
- **Files** (~12 occurrences across 2 files):
  - `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx` (lines 28, 38, 51, 56–58, 66, 70, 172, 210)
  - `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx` (lines 29, 64, 69, 332)
- **Action**: re-derive the rankings around **real top performers**:
  - Highest mini-split SEER2: Fujitsu AIRSTAGE 09LZBS1 at ~33.1 SEER2 (verify via AHRI Directory)
  - Mitsubishi's top: MSZ-FS06 at ~32.2 SEER2; MSZ-FH H2i Plus cold-climate at ~33.1 SEER2 for select variants
  - Strip every "40.1 SEER2" and "14.2 HSPF2" mention
  - Reframe MSZ-FS positioning: **value/standard tier**, not flagship cold-climate
  - Reframe MSZ-FH (H2i Plus): cold-climate flagship
  - Add AHRI cert number next to every spec via `<SourceLink>`
- **One commit per file** (best-mini-split-ac-units, then mini-split-brands-ranked).

#### B.2 The Daikin Aurora 12K overclaim sweep
- **Files**:
  - `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx` (lines 42, 123–125, 210)
  - `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx` (lines 95, 260)
  - `content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx` (lines 35, 55–57)
- **Action**: replace claimed 25.5 SEER2 / 13.0 HSPF2 / 13.5 EER2 with the AHRI-certified values for RXT12AVJU9/FTXV12AVJU9 (AHRI #215710688): ~20.5 SEER2 / 10.5 HSPF2 / 12.0 EER2. Add the cert number as a `<SourceLink>`.

#### B.3 The "Carrier 40HQV" mystery model
- **Files**:
  - `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:210`
  - `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx:165–168, 263`
- **Action**: either confirm what model the writer meant (likely intended Carrier Infinity 38MPRAQ/40MPHAQ, ~23 SEER2) and substitute correct specs, or delete the rows entirely. The 42 SEER2 / 15 HSPF2 / -22°F values are all implausible.

#### B.4 The Senville claim sweep
- **Files**:
  - `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx` (lines 44, 150–155, 230)
  - `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx` (lines 228, 230, 266)
  - `content/mini-split-air-conditioners/senville-mini-split-reviews.mdx` (lines 35–46, 56)
- **Action**:
  - Update SENL-12CD SEER2 from 19.0 → 21.2 (115V) or 21.3 (220V) — per manufacturer / AHRI
  - Strip the "-22°F" min-heating claim entirely; cite the manufacturer-published minimum (typically 5°F or -15°F per SKU)
  - Update warranty from 7-yr compressor → 5-yr parts / 5-yr compressor (or 7-yr only on registered bundle SKUs)
  - Delete the fabricated "15–22% failure rate at 10 years" line (`senville-mini-split-reviews.mdx:56`) — no public source

#### B.5 Refrigerant transition narrative
- **Files**: every MDX that says R-410A on a 2026-marketed flagship
  - `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:62, 70`
  - `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx:80`
  - `content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx:80`
  - Cross-check against `content/refrigerants/hvac-refrigerant-phase-out.mdx:281` (which correctly states the 2026 transition)
- **Action**: reconcile. For each model, verify the *currently shipping* refrigerant against the manufacturer datasheet. Add a one-sentence box: *"As of Jan 1, 2026, newly installed residential heat-pump systems must use refrigerant with GWP < 700 (typically R-454B or R-32). Equipment manufactured before Jan 1, 2025 with R-410A may still be installed where available."*

#### B.6 The "we tested / evaluated / measured / ranked" sweep across all reviews
- **Files** (per AUDIT.md A1.7, ~20 files): `best-mini-split-ac-units.mdx`, `mini-split-brands-ranked.mdx`, `best-hvac-air-filters.mdx`, `portable-vs-window-ac.mdx`, `best-smart-thermostats.mdx`, `best-mini-split-heat-pumps.mdx`, `best-cold-climate-heat-pumps.mdx`, `best-water-heaters.mdx`, `best-evaporative-coolers.mdx`, `best-tower-fans.mdx`, `best-pellet-stoves.mdx`, `best-hvac-brands-ranked.mdx`, `best-central-ac-brands.mdx`, `best-gas-furnace-brands.mdx`, `boiler-vs-furnace.mdx`, `radiant-floor-heating-pros-cons.mdx`, `best-portable-air-conditioners.mdx`, `best-tankless-water-heaters.mdx`, `most-energy-efficient-dehumidifiers.mdx`, `best-bedroom-air-purifiers.mdx`, `nest-vs-ecobee-vs-honeywell.mdx`
- **Action**: regex sweep, *per file* (don't mass-edit blindly — read each file first):
  - "We tested" / "We evaluated" / "We measured" / "We analyzed" / "We ranked" / "We compared" → "Rankings are based on [data source]" or "These specifications come from [AHRI / ENERGY STAR / manufacturer]"
  - "in our testing" / "in our tests" / "in our review" / "the quietest … we tested" → drop entirely
  - "controlled conditions (95°F outdoor, 80°F indoor)" → drop entirely
  - "real-world testing" → "manufacturer-published performance data"
  - "contractor feedback" / "real-world user feedback" → drop
  - "## How We Tested" / "## How We Ranked" / "## How We Evaluated" → "## Methodology: Where These Specifications Come From"
  - Table headers "What We Measured" → "Source / Specification"
- **Verification**: after the sweep, `grep -rEni "we tested|we evaluated|we measured|we ranked|we analyzed|we compared|in our test|real-world testing|controlled conditions" content/` must return **zero hits** outside of explicitly framed-as-secondary-research contexts (e.g. citing a Consumer Reports test).

**Gate B.6 final check** before moving on: re-run the full grep panel from `AUDIT.md` A1.7 — zero matches. If there's still a stray match, fix in this batch; don't defer.

### Batch D — YMYL tax-credit currency fix (AUDIT.md A7)

**Goal**: one truthful narrative about Section 25C across the whole site.

#### D.1 Single source of truth
- Authoritative facts (sourced from IRS / ENERGY STAR / Rewiring America / Cornell LII, as of 2026-06-26):
  - The One Big Beautiful Bill Act (OBBBA) was signed **July 4, 2025**.
  - Section 25C terminated for installations after **December 31, 2025**.
  - Section 25D similarly terminated for property placed in service after **December 31, 2025** (carry-forward rules apply for geothermal credits earned in earlier tax years).
  - For 2026 installations, no federal 25C/25D credit; the primary federal incentive paths are HOMES and HEAR/HEEHRA rebates (state-administered, varying rollout).
  - Equipment installed on/before Dec 31, 2025 can still be claimed on the 2025 tax return filed in 2026.

#### D.2 File-by-file fixes (in this order)
1. **`content/heat-pumps/heat-pump-tax-credits-2026.mdx`** — full rewrite. Currently presents the pre-OBBBA "credit available through 2032" narrative. Pivot to: (a) brief explainer of what 25C/25D were; (b) why they no longer apply to 2026 installs; (c) what *is* still available in 2026 (HOMES, HEAR, state, utility). Keep the page title and URL (already linked from homepage and Footer). Strip every "you can claim … in 2026" sentence.
2. **`content/tax-credits-rebates/hvac-tax-credits-2026.mdx`** — same date-flip sweep. Every "2026" that should be "2025" gets corrected: line 33 ("through December 31, 2026" → "2025"), line 59 ("OBBBA signed July 4, 2026" → "2025"), line 60 ("25C and 25D expired December 31, 2026" → "2025"), line 193 ("if you installed a heat pump in 2024, 2026, or 2026" → "2024 or 2025"). Re-verify the section "What's Still Available in 2026" — keep it.
3. **`content/tax-credits-rebates/25c-tax-credit-explained.mdx`** — same date-flip. Lines 31, 49, etc.
4. **`content/tax-credits-rebates/energy-star-tax-credits.mdx`** — same.
5. **`content/tax-credits-rebates/hvac-rebates-by-state.mdx`** — line 331 ("Some have been active since 2024–2026") — clarify the date range.
6. **Cross-cutting**: grep `\$2,000` and `25C` across all content; for every spoke article that *references* 25C in passing (e.g., as part of a recommendation to "look for a tax credit"), audit and either remove or rewrite to point at the corrected pillar page.

#### D.3 Verification
- `grep -rEn "25C.*2026|2026.*25C" content/` should return only sentences explicitly framed as "no credit in 2026" or "if installed in 2024 or 2025, claim on your 2026 tax return."
- Curl `/heat-pump-tax-credits-2026` and `/hvac-tax-credits-2026` after deploy; confirm the "expired" narrative renders.

**GATE 2 close**: spec-verification.csv has zero WRONG rows · all "we tested" language stripped · all four tax-credit MDX files reconciled · `grep` panels return clean.
**→ Marko approves before Gate 3 starts.**

---

## GATE 3 — Real-identity E-E-A-T rebuild (C-identity)

**Goal**: substitute the fabricated team with the real Marko Visic / Moving Data Systems identity. The brief's Part C-Addendum provides ready-to-use copy and a Person JSON-LD block.

### Batch C.1 — Photo + path wiring
- **Files**: copy `/workspace/1516504244885.jpeg` → `/workspace/public/authors/marko-visic.jpg`
- **Action**: resize to 512×512 (author card), 800×800 (About hero); strip EXIF; save as both `.jpg` and a 2x retina. Confirm both resolve via `next/image` on localhost.

### Batch C.2 — About page rewrite
- **Files**: `app/about/page.tsx` (currently 645 lines)
- **Action**: replace the "We assembled a team … 339 articles … thousands of daily visitors" narrative with the C-2 bio from the brief (Marko Visic, BSc Physics, University of Ljubljana; Moving Data Systems d.o.o., Smolnik 62, 2342 Ruše, Slovenia). Include the C-3 honesty-note ("not a substitute for a licensed HVAC professional"). Replace stat badges: 339+ → 355; 15+ → 31; "50+" → either remove or pick a real referent. Wire `Person` JSON-LD inline per C-4. Trim length significantly — the current page is 645 lines of boilerplate; the honest version can be ~200.

### Batch C.3 — Editorial Policy rewrite
- **Files**: `app/editorial-policy/page.tsx` (currently 358 lines)
- **Action**: replace "licensed HVAC professionals with 10+ years experience" / "NATE-certified technicians" / "Mechanical engineers with HVAC specialization" stack with the honest methodology: explanations grounded in thermodynamics; specs sourced from AHRI Directory, ENERGY STAR, and manufacturer documentation; verified-or-omitted policy. Remove the fake review panel. **Resolve the affiliate contradiction once**: one statement applied to every page about how the site is monetized (display ads via Raptive + nothing else), repeated nowhere else verbatim.

### Batch C.4 — Contact page rewrite
- **Files**: `app/contact/page.tsx` (currently 253 lines)
- **Action**: replace "Our team … since 2024" with the real Moving Data Systems entity + a working contact email (a real one Marko reads). Drop the `info@/content@/support@` aliases if they're not monitored; keep one. Strip "since 2024" entirely.

### Batch C.5 — Methodology page (new)
- **Files**: `app/methodology/page.tsx` (new) + sitemap update + Footer link
- **Action**: ~600-word explainer of how content is produced and sourced. References Marko's physics background; explains the AHRI/ENERGY STAR/manufacturer-only sourcing policy; explains why no fake testing claims; explains the "physics-first" angle. Link from Footer "Resources" section and from every article footer.

### Batch C.6 — Person schema wiring
- **Files**: `lib/schema.ts`, `app/about/page.tsx`, `app/[slug]/page.tsx`
- **Action**: per C-4 of the brief, add a `Person` schema node for Marko Visic. Change `lib/schema.ts` so `generateArticleSchema` returns `author: { '@type': 'Person', '@id': 'https://www.hvacbase.org/about#marko-visic' }` and the full Person node is emitted on `/about` with `@id: ".../about#marko-visic"`. Keep `publisher` as the Organization (`Moving Data Systems d.o.o.`, with address in `Organization.address`).

### Batch C.7 — Visible byline rebuild
- **Files**: `components/layout/ArticleLayout.tsx`
- **Action**: replace `{meta.author || 'HVAC Base Team'}` with a real byline component that shows Marko Visic + photo + credential ("BSc Physics, University of Ljubljana") + link to /about. Remove the `meta.author` frontmatter override path so older MDX files with `"HVAC Expert Team"` automatically get the real byline.

### Batch C.8 — Frontmatter date-field normalization
- **Files**: ~5 MDX files using `publishedDate`/`modifiedDate`/`dateUpdated` instead of `datePublished`/`dateModified`
- **Action**: one-shot rename script: `publishedDate` → `datePublished`, `modifiedDate` → `dateModified`, `dateUpdated` → `dateModified`. Verify schema JSON-LD on a sample page now emits a real ISO date.

**GATE 3 close**: real identity live on About + Contact + Editorial + Methodology · Person schema validates in Rich Results Test · visible byline shows Marko + photo · grep for "HVAC Base Team" / "HVAC Expert Team" / "team of experts" returns zero.
**→ Marko approves before Gate 4 starts.**

---

## GATE 4 — Polish (E + F)

**Goal**: clean up the count drift, the doorway pattern, the broken-import strings, and the schema cleanup. Each batch is small and self-contained; can run in parallel where independent.

### Batch E.1 — Count reconciliation
- **Files**:
  - `app/layout.tsx:22` — "339+ articles, 15+ calculators" → "355 articles, 31 calculators"
  - `app/page.tsx:109, 1063` — same
  - `app/about/page.tsx:57, 581, 585, 593` — same + drop the "50+" badge if no real referent
  - `app/articles/page.tsx:8` — same
  - `app/brand-reviews/page.tsx:254, 262–263` — drop "50+" and "10K+ Customer Reviews" entirely
  - `components/layout/Footer.tsx:97, 102` — same; also change "Weekly Updates" trust pillar to "Updated regularly" or remove
- **Verification**: `grep -rEn "339\+|340\+|350\+|15\+ calc|15\+ interactive|10K\+|thousands of (daily visitors|people turn|others who|homeowners)" app/ components/` returns zero matches outside calculator output strings.

### Batch E.2 — "Since 2024" removal
- **Files**: `app/page.tsx:79`, `app/contact/page.tsx:81`
- **Action**: delete both lines. The site does not need a tenure claim.

### Batch E.3 — Doorway anchor consolidation (homepage)
- **Files**: `app/page.tsx` (the `<Link>` blocks for the affected URLs)
- **Action**: For each of the 25 multi-anchor URLs in `AUDIT.md` A5.1:
  - 3+ anchor cases (`/indoor-air-quality-testing`, `/hvac-maintenance-checklist`, `/heat-pump-size-calculator`, etc.): pick ONE anchor per occurrence; if the page covers conceptually distinct topics (the VOC + Radon + IAQ case), build a separate page per topic with unique content **rather than** linking to one URL with three labels.
  - 2-anchor cases: collapse to one anchor.
- **Special handling for the IAQ doorway**: build `/voc-in-home-sources` and `/radon-testing-guide` as distinct, real pages (each with original heat-transfer/physics-grounded content) — or accept that the homepage will lose two of the three current entry points and link only to `/indoor-air-quality-testing` once.

### Batch E.4 — Thin-page consolidation
- **Files**: the 10–15 thinnest MDX files (per AUDIT.md A5.2)
- **Action** per file:
  - Inject real differentiated content (the physics-first angle: heat-transfer equations, calculator embed, verified specs with sources), OR
  - Merge with a sibling and 301 the URL, OR
  - Mark `noindex` in metadata and remove from sitemap if it's serving a navigational role only.
- **Order**: start with the 87-line `mini-split-in-cold-climates.mdx` (which has no frontmatter — it's basically broken anyway).

### Batch E.5 — Boilerplate FAQ replacement
- **Files**: 15+ files using the template FAQ ("What should I know about X / How much does this cost / Which brand is best / Is professional installation required / What size do I need / Are there tax credits available")
- **Action**: per file, replace with 3–5 article-specific questions that the page actually answers. Where the page is genuinely too narrow to support a unique FAQ, delete the FAQ block.

### Batch F.1 — Schema cleanup
- **Files**: `lib/schema.ts`, `components/SEOHead.tsx`, `app/layout.tsx`, `app/page.tsx`, `app/[slug]/page.tsx`
- **Actions**:
  1. Delete `components/SEOHead.tsx` (dormant Product+AggregateRating component)
  2. De-dup `WebSite` JSON-LD: keep it in `app/layout.tsx`, remove from `app/page.tsx:1054`. Test that homepage still validates.
  3. Update `lib/schema.ts` to switch `author` from Organization → `Person @id` reference (already covered in C.6 but verify together)
  4. Wire `FAQPage` JSON-LD for the ~80 articles with substantive FAQ blocks: pass `meta.faqData` into `generateFAQSchema` and emit alongside the Article schema in `app/[slug]/page.tsx`

### Batch F.2 — `@/components/mdx` broken-import cleanup
- **Files**: 13 heat-pump MDX files (per AUDIT.md A4.1)
- **Pre-check**: render `/heat-pump-guide` and `/heat-pump-tax-credits-2026` on localhost; confirm `<TableOfContents>`, `<FAQ>`, `<ComparisonTable>`, `<Callout>`, `<SourcesBox>`, `<RelatedArticles>` all render correctly. If yes → imports are confirmed-dead syntax under `next-mdx-remote/rsc`; safe to delete.
- **Action**: delete the broken `import { ... } from '@/components/mdx';` line from each of the 13 files. Also handle `heat-pump-vs-mini-split.mdx` (imports from `'@/components'` bare).
- **One commit per file** to keep diffs reviewable.

### Batch F.3 — Brand-reviews methodology fix
- **Files**: `app/brand-reviews/page.tsx`
- **Decision** (Marko picks):
  - **Option A**: keep the star ratings, publish a real methodology disclosure (data source = AHRI reliability + warranty terms + Consumer Reports licensure data + Reddit sentiment scrape — say what you actually used)
  - **Option B**: drop the star numbers + reliability/satisfaction percentages entirely; present brands as prose comparisons + a real comparison table sourced from manufacturer warranty + AHRI data
- **Recommended: Option B** (cleaner, faster, no methodology debt; aligns with the no-fabricated-data posture)

### Batch F.4 — Sitemap regeneration
- **Files**: `public/sitemap.xml` (delete) + add `app/sitemap.ts` (Next.js dynamic sitemap)
- **Action**: replace the static 373-line sitemap with a route handler that reads from `lib/content.ts::getAllSlugs()` + the static hub list + policy pages. Verify on localhost that `/sitemap.xml` returns the expected count (~376) and is valid XML.

### Batch F.5 — Cosmetic cleanups (low priority)
- Delete `/workspace/content/{energy-efficiency,mini-splits,ac-sizing,heat-pumps,ac-troubleshooting}/` (empty artifact dir)
- Delete `/workspace/app/{layout,[slug]}/` (empty artifact dir)
- Reconcile `CLAUDE.md` "Next.js 15" vs `package.json` "^14.2.0" — pick one and document
- Audit `/components/tools/CalcWrapper.tsx` vs `/components/calculators/CalcWrapper.tsx` (and the BTUCalculator + SEERCalculator duplicates); delete the dead set

**GATE 4 close**: count badges everywhere reconciled · Since 2024 gone · homepage doorway anchors fixed · thin pages either deepened or merged · `SEOHead.tsx` deleted · broken `@/components/mdx` imports removed (or proven dead-syntax and left, if Marko prefers) · sitemap dynamic.
**→ Marko approves before Gate 5 starts.**

---

## GATE 5 — Pre-reapply sweep + Raptive code

### Batch G.1 — Final pre-reapply audit
- **Tools**: the `google-ai-content-policy` skill (installed in A0.3); the grep panels from `AUDIT.md` A1.7 + A2 + A6 + A7; `spec-verification.csv` re-run
- **Action**: rerun every grep panel from this plan. If anything other than zero hits comes back, fix here (treat the page as a regression, not a new finding).
- **Build clean**: `next build` succeeds with zero warnings on the changed paths.
- **Manual spot-check**: 20 random article URLs rendered on localhost; verify (a) byline shows Marko, (b) no "we tested" language, (c) FAQ wired with real content, (d) sources present where claimed.

### Batch G.2 — Raptive code installation
- **Files**: `app/layout.tsx` (Raptive script tag), Privacy & Disclaimer updates from A0.2 (flip from "do not currently serve" to "serve via Raptive")
- **Action**: add Raptive's tag exactly as Raptive provides it. Verify ads.txt is still correct. Test on localhost (Raptive provides a sandbox / staging code).
- **Note**: this is the *only* place in the plan where new monetization lands. Everything before it is pure compliance cleanup.

### Batch G.3 — Reapply submission
- After G.1 + G.2 are clean on localhost and verified on production:
  - Submit to Raptive via the standard reapply flow
  - Document in `audit-log.md` with date + commit hash + a one-line summary of "what changed since rejection"
  - Wait for review (~30-day window per the brief)

**GATE 5 close**: Raptive reapply submitted with all 11 reapply-gate boxes ticked (per AUDIT.md final checklist). **→ stop work; do not push more changes during review.**

---

## Verification harness (used at every gate)

A standing checklist of greps + curls to run after every batch:

```bash
# A2 (E-E-A-T)
grep -rEni "we tested|we evaluated|we measured|we ranked|we analyzed|we compared|in our test|in our review|real-world testing|controlled conditions|hands-on testing" /workspace/content /workspace/app
grep -rEni "our team|team of (HVAC )?experts|10\+ years|NATE.certified|licensed HVAC contractor|Diamond Contractor" /workspace/content /workspace/app
grep -rEni "thousands of (daily visitors|people|homeowners|others)|10K\+|since 2024" /workspace/content /workspace/app

# A6 (counts)
grep -rEn "339\+|340\+|350\+|15\+ calc|15\+ interactive|10K\+" /workspace/app /workspace/components

# A7 (YMYL)
grep -rEn "25C.*2026|2026.*25C|claim.*tax credit.*2026|federal tax credit.*2026" /workspace/content
grep -rEn "Section 25C|OBBBA" /workspace/content   # should all say "expired Dec 31, 2025"

# A1 (specs — the dangerous ones)
grep -rEn "40\.1 SEER2|14\.2 HSPF2|MSZ-FS.*40" /workspace/content
grep -rEn "Carrier 40HQV|42\.0 SEER2|15\.0 HSPF2" /workspace/content
grep -rEn "Senville.*7-year|SENL.*-22°F|15-22% failure rate" /workspace/content

# A3 (schema)
grep -rEni "aggregateRating|ratingValue|reviewCount" /workspace
# After F.1 deletes SEOHead.tsx, expected: 0 matches outside lib/schema.ts (where they're not present anyway)

# A9 (technical)
curl -sI https://www.hvacbase.org/ads.txt | head -3   # should be 200 OK + text/plain after A0.1
```

If any grep returns matches that the current batch should have eliminated, **fix in the current batch — do not defer**.

---

## Estimates and parallelism

| Gate | Estimated effort | Can parallel with |
|---|---|---|
| Gate 1 (A0) | 1–2 hours (Raptive turnaround on ads.txt content may add wait) | — |
| Gate 2 / Batch B | **3–5 days** of focused work (B.6 is the long one — ~20 files to read and re-frame) | B.1–B.5 can run in parallel as separate branches; B.6 should run last and verify after |
| Gate 2 / Batch D | **0.5–1 day** | D can run parallel to B |
| Gate 3 / Batch C | **2–3 days** (C.2–C.5 are content writing; C.1, C.6, C.7 are mechanical) | C.1 + C.6 in parallel with C.2–C.5 |
| Gate 4 / Batch E + F | **2–3 days** total | Most E/F batches independent; F.2 needs the localhost render check |
| Gate 5 / G | 0.5 day + ~30-day Raptive review window | — |

**Total active-work estimate: 8–12 days**, then the Raptive reapply window.

---

## What this plan deliberately does NOT do

- **Does not push to remote**. Every gate ends with localhost verification + Marko review. `git push` only happens with explicit go.
- **Does not add Raptive code until Gate 5**. The ad code is the *last* thing to land; everything before is cleanup.
- **Does not amend or force-push**. Every fix is a new commit.
- **Does not delete content for the sake of count reduction**. Thin-page consolidation (E.4) is targeted at the actually-thin pages (per AUDIT.md A5.2), not at the whole content directory.
- **Does not modify calculator UIs**. Per "Findings not in the brief" NF1, the calculator design system is the site's strongest non-commodity asset and should be left alone.
- **Does not invent author credentials beyond the brief**. C-Addendum's Marko bio is the verbatim ceiling; the plan does not embellish (no "10 years experience," no "former contractor," nothing not in C-1 / C-2).
- **Does not write any code as part of this plan**. This is the plan; execution requires Marko's approval at each gate.

---

**END OF PLAN — AWAITING GATE 1 APPROVAL.**

Once approved: I'd start with `A0.2` (drafting the disclosure stubs locally) since `A0.1` requires Raptive's ads.txt contents and `A0.3` requires Marko to install the skill. Then move to Batch B with the MSZ-FS 40.1 SEER2 file as the first commit, since it's the single highest-leverage fix in the entire plan.
