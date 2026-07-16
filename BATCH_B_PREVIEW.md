# BATCH B — Calculator count reconciliation → **9** (PREVIEW, NO EDITS APPLIED)

**Run date:** 2026-07-13
**Mode:** PREVIEW ONLY. No files modified, no dates bumped, no commits.
**Rule reminder:** copy fix, not a reclassification. `contentType: "calculator"` is the source of truth; no MDX re-tagging permitted.

---

## STEP 1 — Source of truth: strict `contentType: "calculator"` count = **9**

**Auditable slug list (grep result, sorted alphabetically):**

| # | slug | title | file |
| --- | --- | --- | --- |
| 1 | `/air-changes-per-hour-calculator` | ACH Calculator: Air Changes Per Hour for Any Room | `content/air-quality/air-changes-per-hour-calculator.mdx` |
| 2 | `/air-purifier-sizing-guide` | What Size Air Purifier Do I Need? (Room Size Calculator) | `content/air-quality/air-purifier-sizing-guide.mdx` |
| 3 | `/dehumidifier-running-cost` | How Much Does It Cost to Run a Dehumidifier? (2026 Calculator) | `content/dehumidifiers/dehumidifier-running-cost.mdx` |
| 4 | `/what-size-dehumidifier-do-i-need` | What Size Dehumidifier Do I Need? (AHAM Sizing Chart + Calculator) | `content/dehumidifiers/what-size-dehumidifier-do-i-need.mdx` |
| 5 | `/heating-cost-calculator` | Heating Cost Calculator: Compare Gas vs Electric vs Heat Pump Costs | `content/energy-costs/heating-cost-calculator.mdx` |
| 6 | `/kwh-cost-calculator` | kWh Cost Calculator: Convert kWh to Dollars Instantly (2026 Rates) | `content/energy-costs/kwh-cost-calculator.mdx` |
| 7 | `/specific-heat-capacity-calculator` | Specific Heat Capacity Calculator: Formula, Examples & HVAC Applications (2026) | `content/energy-costs/specific-heat-capacity-calculator.mdx` |
| 8 | `/how-much-does-mini-split-cost-to-run` | How Much Does It Cost to Run a Mini Split? (Monthly Calculator) | `content/mini-split-air-conditioners/how-much-does-mini-split-cost-to-run.mdx` |
| 9 | `/portable-ac-electricity-cost` | How Much Electricity Does a Portable AC Use? (Cost Calc) | `content/portable-air-conditioners/portable-ac-electricity-cost.mdx` |

**Strict count matches the expected 9. Proceeding to STEP 2.**

### Excluded categories (for transparency — not merged into the number)

**`contentType: "tool"` (3 files, excluded):**
- `energy-efficiency-ratings/seer2-comparison-calculator.mdx`
- `energy-efficiency-ratings/seer2-savings-calculator.mdx`
- `energy-efficiency-ratings/seer2-to-seer-conversion.mdx`

**`contentType: "calculator-guide"` (13 files, excluded):**
- `ac-sizing-selection/ac-tonnage-calculator.mdx`
- `ac-sizing-selection/air-conditioner-btu-calculator.mdx`
- `ac-sizing-selection/furnace-sizing-calculator.mdx`
- `ac-sizing-selection/heat-pump-size-calculator.mdx`
- `ac-sizing-selection/mini-split-sizing-calculator.mdx`
- `ac-sizing-selection/water-heater-sizing-calculator.mdx`
- `ac-sizing-selection/what-size-generator-do-i-need.mdx`
- `ac-sizing-selection/what-size-tankless-water-heater.mdx`
- `battery-backup/battery-watt-hours.mdx`
- `battery-backup/how-many-watts-in-12v-battery.mdx`
- `battery-backup/solar-panel-calculator.mdx`
- `ductwork/btucfm-ductwork-relationship.mdx`
- `ductwork/ductwork-sizing-calculator.mdx`

**Total excluded: 16.** These are calculator-adjacent content (methodology explanations for external calculators, guides on how to size things using paper math, deep-dives on SEER2 conversion factors) but do not carry `contentType: "calculator"` in their frontmatter. Per user rule, they are NOT re-tagged; the strict count stays at 9.

---

## STEP 2 — Every displayed calculator count (whole repo, all surfaces)

**Six surfaces found.** Grouped below by surface type. Full BEFORE/AFTER in STEP 3.

| # | file:line | verbatim | surface type |
| --- | --- | --- | --- |
| 1 | `app/page.tsx:108` | `<div className="text-3xl font-bold text-white">31</div>` `<div className="text-sm text-brand-200">Calculators</div>` | **VISIBLE** — homepage hero stat block |
| 2 | `app/page.tsx:1046` | `"description": "Professional HVAC calculators, sizing guides, and unbiased equipment reviews. 355 articles and 31 calculators based on ACCA Manual J calculations and manufacturer-published data.",` | **SCHEMA** — WebSite JSON-LD emitted inline on homepage |
| 3 | `app/layout.tsx:22` | `description: 'Expert HVAC guides with 355 articles, 31 interactive calculators, and unbiased recommendations for all your heating and cooling needs.',` | **META / OG** — sitewide default `openGraph.description`; also propagates to Twitter and search snippets |
| 4 | `app/articles/page.tsx:126` | `<div className="text-2xl font-bold text-orange-600">45+</div>` `<div className="text-sm text-gray-600">Calculators</div>` | **VISIBLE** — articles hub quick-stats widget |
| 5 | `app/calculators/page.tsx:158,170` | line 158: `const totalCalculators = Object.values(calculatorCategories).reduce((sum, category) => sum + category.calculators.length, 0);` line 170: `{totalCalculators} professional calculators for sizing air conditioners, furnaces, heat pumps, and calculating energy costs` | **VISIBLE** — calculators hub h1 intro. Currently derives to **11** from the hardcoded `calculatorCategories` array in the same file. **See "Hub complication" below.** |
| 6 | `components/layout/Footer.tsx:102` | `<div className="text-white font-semibold">31 Calculators</div>` | **VISIBLE** — footer trust bar, present on every page sitewide |

**Not a count surface (confirmed clean):**
- `app/layout.tsx:35` (Twitter card description): `'Expert HVAC guides with interactive calculators and unbiased recommendations.'` — no number, no change needed.
- `app/articles/page.tsx:8` (openGraph metadata): mentions "355 HVAC articles, guides, calculators, and resources" but no specific count on calculators. Clean.
- `app/calculators/page.tsx:6-12` (page metadata): title and description generic, no count. Clean.
- No sitemap.xml / robots.txt hits.
- No image alt text hits.
- No breadcrumb / aria-label hits.

---

## Hub complication (surface #5) — needs your ruling

The `/calculators` hub (`app/calculators/page.tsx`) is a special case. Its `totalCalculators` variable is derived at render from a hardcoded `calculatorCategories` array on line 16, which currently contains **11 card entries** across 4 categories (cooling: 4, heating: 2, energy: 3, power: 2). Line 170 renders that variable as the intro count.

**Cross-reference of hub cards vs. strict `contentType: "calculator"` files:**

| Hub card | route | MDX contentType | In strict 9? |
| --- | --- | --- | --- |
| AC BTU Calculator | `/air-conditioner-btu-calculator` | `calculator-guide` | ✗ |
| AC Tonnage Calculator | `/ac-tonnage-calculator` | `calculator-guide` | ✗ |
| Mini Split Sizing Calculator | `/mini-split-sizing-calculator` | `calculator-guide` | ✗ |
| Heat Pump Size Calculator | `/heat-pump-size-calculator` | `calculator-guide` | ✗ |
| Furnace Sizing Calculator | `/furnace-sizing-calculator` | `calculator-guide` | ✗ |
| Water Heater Sizing Calculator | `/water-heater-sizing-calculator` | `calculator-guide` | ✗ |
| SEER2 Savings Calculator | `/seer2-savings-calculator` | `tool` | ✗ |
| **Heating Cost Calculator** | **`/heating-cost-calculator`** | **`calculator`** | **✓** |
| **kWh Cost Calculator** | **`/kwh-cost-calculator`** | **`calculator`** | **✓** |
| Generator Size Calculator | `/what-size-generator-do-i-need` | `calculator-guide` | ✗ |
| Wire Gauge Calculator | `/wire-gauge-chart` | (not in the strict-calc grep) | ✗ |

**Only 2 of the hub's 11 cards are contentType-calculator files.** The other 9 hub cards are calc-guides or tools. Meanwhile, 7 of the 9 strict calculators are NOT featured on the hub at all (ACH, air-purifier-sizing, dehumidifier-running-cost, what-size-dehumidifier, specific-heat-capacity, mini-split-cost-to-run, portable-ac-cost). The hub and the strict count are almost entirely disjoint.

**Three options for the hub (surface #5) — need your ruling:**

- **Option A — Change the intro count only.** Replace `{totalCalculators}` at line 170 with a hardcoded `9` (or leave line 158's derivation alone and just swap the JSX). Result: hub says "9 professional calculators…" while its grid still visibly shows 11 cards. Reader sees a mismatch. **Not recommended.**
- **Option B — Prune the hub card grid to 9.** Delete 2 card entries from `calculatorCategories` so `totalCalculators` derives to 9. But the 11 cards currently featured are the popular, traffic-earning routes (BTU, Tonnage, Furnace Sizing, etc.) — cutting them hurts UX. And the "9" that would remain wouldn't match the strict 9 either, since only 2 hub cards overlap with the strict set. **Also not clean.**
- **Option C — Drop the count from the hub intro entirely.** Rewrite line 170 to remove the `{totalCalculators}` reference and use a plain descriptor. Example: `<p>Professional calculators for sizing air conditioners, furnaces, heat pumps, and calculating energy costs</p>` (no count). Hub grid stays at 11 (its own honest inventory). Every other surface (1, 2, 3, 4, 6) still standardizes to **9** per the strict rule. **Recommended.** This preserves the hub's UX while removing the false-precision count claim from the hub header.

Option C is what I've drafted the AFTER for below. If you want A or B instead, tell me.

**Deeper structural question (not for this batch, worth flagging):** the hub and the strict `contentType` field disagree on what "calculator" means. Batch B just fixes the copy; a separate future batch might reconcile the taxonomy (either re-tag some calc-guide MDX to calculator OR prune the hub grid to only include real calculator MDX). Both directions have UX tradeoffs. **Not in Batch B scope.**

---

## STEP 3 — Per-hit BEFORE/AFTER

### Group A — Visible number widgets (3 surfaces)

| # | file:line | BEFORE (verbatim) | AFTER (proposed) | rule / note |
| --- | --- | --- | --- | --- |
| 1 | `app/page.tsx:108` | ```<div className="text-3xl font-bold text-white">31</div>``` | ```<div className="text-3xl font-bold text-white">9</div>``` | Exact 9, no `+`. |
| 4 | `app/articles/page.tsx:126` | ```<div className="text-2xl font-bold text-orange-600">45+</div>``` | ```<div className="text-2xl font-bold text-orange-600">9</div>``` | Drops the `+` growth claim per user rule. |
| 6 | `components/layout/Footer.tsx:102` | ```<div className="text-white font-semibold">31 Calculators</div>``` | ```<div className="text-white font-semibold">9 Calculators</div>``` | Exact 9. Sitewide footer. |

### Group B — Schema (1 surface, ships with visible in one commit)

| # | file:line | BEFORE (verbatim) | AFTER (proposed) | rule / note |
| --- | --- | --- | --- | --- |
| 2 | `app/page.tsx:1046` | ```"description": "Professional HVAC calculators, sizing guides, and unbiased equipment reviews. 355 articles and 31 calculators based on ACCA Manual J calculations and manufacturer-published data.",``` | ```"description": "Professional HVAC calculators, sizing guides, and unbiased equipment reviews. 355 articles and 9 calculators based on ACCA Manual J calculations and manufacturer-published data.",``` | Inline WebSite JSON-LD emitted on homepage. Must ship in the same commit as surface #1 (homepage widget) so visible + schema are atomic. |

### Group C — Meta / OG / Twitter (1 surface, sitewide propagation)

| # | file:line | BEFORE (verbatim) | AFTER (proposed) | rule / note |
| --- | --- | --- | --- | --- |
| 3 | `app/layout.tsx:22` | ```description: 'Expert HVAC guides with 355 articles, 31 interactive calculators, and unbiased recommendations for all your heating and cooling needs.',``` | ```description: 'Expert HVAC guides with 355 articles, 9 interactive calculators, and unbiased recommendations for all your heating and cooling needs.',``` | Default `openGraph.description` for the whole site. Propagates to search snippets, social share previews, Twitter cards (when child pages don't override). |

### Group D — Hub intro (1 surface, RECOMMENDED = Option C: drop the count)

| # | file:line | BEFORE (verbatim) | AFTER (proposed — Option C) | rule / note |
| --- | --- | --- | --- | --- |
| 5a | `app/calculators/page.tsx:158` | ```const totalCalculators = Object.values(calculatorCategories).reduce((sum, category) => sum + category.calculators.length, 0);``` | **Remove this line entirely** (no longer used after 5b) | Dead-code cleanup |
| 5b | `app/calculators/page.tsx:170` | ```{totalCalculators} professional calculators for sizing air conditioners, furnaces, heat pumps, and calculating energy costs``` | ```Professional calculators for sizing air conditioners, furnaces, heat pumps, and calculating energy costs``` | Drops the count from the hub header. Hub grid stays at 11 cards (its own honest inventory). See "Hub complication" section above for why this is the least-bad option under the strict-count rule. |

**Alternative AFTERs for hub (only if you reject Option C):**

- Option A: line 158 unchanged; line 170 changes `{totalCalculators}` to hardcoded `9` — creates a visible 9-vs-11 mismatch on the same page.
- Option B: cull the `calculatorCategories` array on line 16+ down to 2 real calculator entries (heating-cost + kwh-cost) and add 7 more entries linking to the other 7 strict-count files. Substantial rewrite of the hub grid; removes highly-visited AC BTU / Tonnage / Furnace Sizing cards.

### Group E — Surrounding copy that might need light rewriting

**None found beyond what's in the six surfaces above.** No prose says things like "our 45 calculators cover everything from X to Y". The three visible number widgets (surfaces 1, 4, 6) are all in trust-badge / stat-block layouts (`<div>{N}</div><div>Calculators</div>`) that read cleanly with the swap. The homepage schema description (surface 2) and openGraph description (surface 3) are sentences where the swap from "31" → "9" doesn't cascade.

---

## Certifying-grep plan (post-apply)

After Batch B apply, run:

1. **Zero survivors of the wrong counts adjacent to "calculator":**
   ```
   grep -rEn --include='*.tsx' --include='*.ts' --include='*.mdx' -e "\b31\b.*[Cc]alculator|[Cc]alculator.*\b31\b|\b45\+? [Cc]alculator|[Cc]alculator.*\b45\+?|\b40\+? [Cc]alculator|\b50\+? [Cc]alculator|over 40 [Cc]alculator" /workspace/app /workspace/content /workspace/components /workspace/lib
   ```
   Expected: empty.
2. **Confirm "9 calculators" / "9 interactive calculators" / "9 Calculators" present** at the 5 remaining surfaces (1, 2, 3, 4, 6):
   ```
   grep -En "9 (interactive )?[Cc]alculators" /workspace/app/page.tsx /workspace/app/layout.tsx /workspace/app/articles/page.tsx /workspace/components/layout/Footer.tsx
   ```
   Expected: 4+ hits (one per surface; homepage schema also hits).
3. **Confirm hub intro has no count at all** (Option C):
   ```
   grep -En "totalCalculators|\{totalCalculators\}" /workspace/app/calculators/page.tsx
   ```
   Expected: empty (dead-code cleanup successful).
4. **Emitted JSON-LD verification.** WebSite schema description in the homepage `<script type="application/ld+json">` block (surface 2) is a deterministic function of the source string on line 1046. Since surface 2's source string will contain `"9 calculators"` after apply, the emitted JSON-LD will too. No separate render check needed.
5. **Meta/OG propagation check.** `app/layout.tsx:22` is `openGraph.description` in the default `Metadata` export. It propagates unchanged to every page whose own metadata doesn't specify a description. Confirm no per-page override still hardcodes "31" or "45+":
   ```
   grep -rEn --include='*.tsx' -e "openGraph.*description|description:.*calculator" /workspace/app 2>/dev/null | grep -E "31|45\+"
   ```
   Expected: empty.

---

## Change summary

| Bucket | Count | Ship group |
| --- | --- | --- |
| Visible widgets standardized to "9" | 3 (homepage, articles hub, footer) | Group A |
| Schema description standardized to "9 calculators" | 1 (homepage inline JSON-LD) | Group B (atomic with Group A #1) |
| Sitewide OG description standardized to "9" | 1 (layout.tsx) | Group C |
| Hub intro (Option C: drop count) | 2 lines (dead-code var + JSX) | Group D — needs your ruling A/B/C |
| **Total edits** | **6 lines of change across 5 files** | Single commit if approved |

**Files touched by Batch B (5):**
- `app/page.tsx` (2 changes: hero widget + JSON-LD)
- `app/layout.tsx` (1 change: openGraph description)
- `app/articles/page.tsx` (1 change: quick-stats widget)
- `app/calculators/page.tsx` (2 changes: dead-code cleanup + hub intro, per Option C)
- `components/layout/Footer.tsx` (1 change: footer trust bar)

**No MDX files touched.** No dateModified bumps needed (no MDX changes).

---

## Open questions

- **Q-1 — Hub disposition (surface #5):** Option A (hardcode count to 9, keep 11 cards — inconsistent), Option B (prune hub grid to 9 real calculators — substantial UX rewrite), or **Option C (drop the count from hub header — recommended)**?
- **Q-2 — Structural follow-up:** should a subsequent batch reconcile the taxonomy (either promote the 11 hub-featured calc-guides to `contentType: "calculator"`, OR prune the hub to show only the 9 real calculator MDX)? This is out of Batch B scope but flagged.
- **Q-3 — Commit shape:** all 6 changes in one commit (`fix(compliance): reconcile calculator count to 9 across all surfaces`), including atomic visible + schema on the homepage?

Stopping. No edits, no commits.

*End of preview.*
