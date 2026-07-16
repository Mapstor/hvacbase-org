# BATCH D — OBBBA tax card + cost-guides decay fields (PREVIEW, NO EDITS APPLIED)

**Run date:** 2026-07-13
**Mode:** PREVIEW ONLY. No files modified, no dates bumped, no commits.
**Scope:** the residual OBBBA-decay claims NOT already covered by prior `raptive-fix` waves + cost-guides card cleanups from `BATCH_D_WORKLIST.md`. Warranty-voiding claims are catalogued but held (not the same decay class).
**Verification limit:** the box cannot reach live IRS / DOE / EPA / Congress.gov. Every AFTER below that references OBBBA / 25C termination / HEAR-HOMES eligibility is flagged in the **MY-SIDE VERIFY appendix** at the tail. Do not ship any of the AFTERs without confirming the OBBBA position against the current IRS OBBB FAQ.

---

## STEP 1 — cost-guides `Federal Tax Credits` card (lines 212-218)

### Current state (post-Batch-C.1 strip)

```jsx
{
  title: 'Federal Tax Credits',
  href: '/hvac-tax-credits-2026',
  amount: 'See current eligibility',
  eligible: ['Heat pumps', 'Central AC', 'Boilers', 'Furnaces'],
  requirements: 'Energy Star certified'
},
```

Batch C.1 stripped the OBBBA-stale `amount: 'Up to $2,000'` figure to `'See current eligibility'`. The card's **title**, **eligible list**, and **requirements** all still frame the card around 25C-era federal eligibility. Under OBBBA (PL 119-21, signed 2025-07-04), 25C was terminated for property placed in service after 2025-12-31, so for 2026 installs there is no active federal tax credit covering Central AC / Gas Furnaces / Boilers. HEAR / HOMES rebates have different eligibility (heat pumps + heat-pump water heaters + weatherization + electrical panel upgrades yes; central AC + gas furnaces + boilers not federally rebated).

### AFTER — Option A (retitle + rewrite, keep the card)

```jsx
{
  title: 'Federal HVAC Incentives',
  href: '/hvac-tax-credits-2026',
  amount: 'Program-dependent — see current details',
  eligible: ['Heat pumps (IRA HEAR/HOMES for 2026 installs)', '2024-2025 installs may still recapture 25C via amended return'],
  requirements: 'HEAR income-qualified up to $8,000; HOMES performance-based'
},
```

**Notes on Option A:**
- Retitles from "Federal Tax Credits" (misleading post-OBBBA) to "Federal HVAC Incentives" (accurate umbrella).
- Keeps the destination `href: '/hvac-tax-credits-2026'` — that article is already OBBBA-updated.
- `amount` stays qualitative; no specific dollar figure asserted on the card (the destination article carries the current program-specific figures).
- `eligible` list scoped to reality: heat pumps for HEAR/HOMES + pointer to amended-return path for 2024-2025 installs.
- `requirements` gives the two-program shorthand without asserting eligibility thresholds that could shift.

### AFTER — Option B (remove the card entirely)

Delete the entire object literal (lines 212-218 including trailing comma). The adjacent "Utility Rebates by State" card (lines 219-225) already routes users to `/hvac-rebates-by-state`, and the OBBBA-updated `/hvac-tax-credits-2026` article covers the full federal picture. The Financing & Incentives category on the cost-guides page would then contain 3 cards instead of 4 (HVAC Financing Options + Utility Rebates by State + Lease vs Buy Analysis).

**Recommendation between A and B:** the previous `BATCH_D_WORKLIST.md` recommended Option 1 (Option A here) or Option 2 (Option B here), leaning toward Option A for continuity. My read: **Option A is preferred** — it preserves the visual real estate on a page that already covers a lot of ground, and it correctly labels the current federal reality. Option B works too and is lower-effort; the destination article carries the full context.

**MY-SIDE VERIFY items for STEP 1:**
- Confirm 25C termination date (2025-12-31 for property placed in service after) against current IRS OBBB FAQ.
- Confirm HEAR cap of $8,000 for heat pumps (income-qualified).
- Confirm HOMES is performance-based, open to all incomes.
- Confirm the amended-return path for 2024-2025 installs is still valid (Form 1040-X within 3-year filing window).

---

## STEP 2 — cost-guides:33 (furnace card) + :222 (utility rebates card)

Both **already stripped in Batch C.1**. Current state verified.

### `app/cost-guides/page.tsx:33` — CURRENT

```
savings: 'Federal, state, and utility rebates available'
```

The user's Batch D proposal was: `"Federal, state & utility rebates vary — see /hvac-rebates-by-state"` — includes a pointer to the destination article. Minor refinement over the current C.1 text. Optional additional edit if you want the pointer inline.

**Proposed refinement (optional):**

```
savings: 'Federal, state, and utility rebates vary — see /hvac-rebates-by-state'
```

Only marginal value; the card already has `href: '/furnace-installation-cost'` linking to detailed cost info. Consider this LOW priority.

### `app/cost-guides/page.tsx:222` — CURRENT

```
amount: 'Varies by state and utility'
```

The user's Batch D proposal reads: `"Federal, state & utility rebates vary — see /hvac-rebates-by-state"`. But this card's `href` is **already** `/hvac-rebates-by-state` (line 221). So the pointer is implicit in the card's link. Current `'Varies by state and utility'` is fine as-is.

**No change proposed for :222.** Already Batch-D-compliant post-C.1.

---

## STEP 3 — Sitewide widened decay-claim sweep

### Raw sweep results

| Pattern | Total hits | Files | OBBBA-corrected fraction |
| --- | --- | --- | --- |
| `\b25C\b` | 567 lines | ~50 files | High (~104 files pair 25C with OBBBA/expired/terminated context) |
| `\b25D\b` | 162 lines | ~30 files | High (paired with OBBBA-context in the tax + refrigerants cluster) |
| `$8,000` | ~30 lines | ~15 files | High — mostly HEAR cap references (`up to $8,000` in HEAR context = accurate) |
| `HEEHR` / `HEEHRA` | ~5 lines | ~3 files | Correctly framed as "IRA HEAR (formerly HEEHRA)" |
| `HEAR` | ~50 lines | ~20 files | High — all in the "For 2026 installs, IRA HEAR is the active pathway" framing |
| `up to $` | 300+ lines | broad | mixed; most are legitimate cost-range or rebate ranges |
| `voids? (the )?warranty` | ~20 lines | ~15 files | N/A — not a decay claim (see below) |
| `since 20[0-9]{2}` / `as of 20[0-9]{2}` | ~15 lines | ~12 files | Mixed — see decay-adjacent section below |

**Prior raptive-fix waves did their job.** The 25C/25D corpus is overwhelmingly correct; residuals are the 3 items catalogued below.

### 3.a — Residual OBBBA-decay claims (3 confirmed, need fix)

Each is a specific location where a 25C-era claim is still present-tense without OBBBA context, undermining the site's otherwise consistent OBBBA-corrected framing.

| # | file:line | verbatim BEFORE | already-OBBBA-corrected? | Proposed disposition |
| --- | --- | --- | --- | --- |
| D-3.a.1 | `components/calculators/HVACROICalculator.tsx:233` | `<InfoTip label="federal credit">25C credit covers 30% up to $600 for AC/furnace, $2,000 for heat pumps. Check current IRS guidance.</InfoTip>` | **NO** — present-tense "covers"; only weak hedge "Check current IRS guidance" | **Rewrite** to past-tense + point to article. Proposed AFTER: `<InfoTip label="federal credit">The federal 25C tax credit expired for installs placed in service after Dec 31, 2025 (OBBBA). For 2026 installs, IRA HEAR and HOMES rebates apply to heat pumps only. See /hvac-tax-credits-2026 for details.</InfoTip>` |
| D-3.a.2 | `content/heat-pumps/heat-pump-guide.mdx:335` | `**Federal tax credits of up to $2,000** plus state rebates of $1,000–$16,000 can slash your out-of-pocket cost dramatically. Annual operating savings of $500–$1,200 versus gas furnaces deliver payback periods of 3–8 years.` | **NO** — present-tense claim in the article's summary paragraph, no OBBBA qualifier | **Rewrite** to reflect current federal reality. Proposed AFTER: `**IRA HEAR rebates of up to $8,000 (income-qualified) or HOMES performance-based rebates** plus state and utility rebates of $500–$3,000+ can materially lower out-of-pocket cost. Annual operating savings of $500–$1,200 versus gas furnaces deliver payback periods of 3–8 years. (The federal 25C tax credit expired for 2026 installs under OBBBA; see [Heat Pump Tax Credits 2026](/heat-pump-tax-credits-2026) for the current federal position.)` |
| D-3.a.3 | `content/energy-costs/electric-water-heating-cost-by-state.mdx:140` | `The clear winner for most homeowners is the **heat pump water heater**. Despite a higher purchase price, its 10-year total cost of ownership is $1,500–$3,000 less than a standard tank. With the 30% federal tax credit (up to $2,000), the upfront premium is essentially free — you pay less from day one.` | **NO** — present-tense "With the 30% federal tax credit (up to $2,000)" | **Rewrite** to drop the 25C reference (expired for 2026 installs). Proposed AFTER: `The clear winner for most homeowners is the **heat pump water heater**. Despite a higher purchase price, its 10-year total cost of ownership is $1,500–$3,000 less than a standard tank. For 2026 installs, IRA HEAR income-qualified rebates (up to $1,750 for heat pump water heaters) and state/utility rebates can materially reduce the upfront premium. (Federal 25C credit expired for 2026 installs under OBBBA; see [HVAC Tax Credits 2026](/hvac-tax-credits-2026) for the current position.)` |

**MY-SIDE VERIFY items for STEP 3.a:**
- Confirm IRA HEAR heat pump water heater cap ($1,750, income-qualified).
- Confirm IRA HEAR heat pump cap ($8,000, income-qualified).
- Confirm state/utility rebate ranges cited ($500-$3,000+, $1,000-$16,000) still reflect current DSIRE data.

### 3.b — "As of 2026" decay-adjacent claims (Batch F territory, flagged for scope call)

Not fabricated, but time-anchored to 2026 and will decay as the year turns. Same class as Batch F freshness policy items. Flagged here for scope decision (fold into Batch D vs defer to Batch F):

| file:line | verbatim | notes |
| --- | --- | --- |
| `content/dehumidifiers/most-energy-efficient-dehumidifiers.mdx:240` | `...However, as of 2026, inverter dehumidifier models remain limited and carry a 20-40% price premium.` | Time-anchored qualifier |
| `content/air-quality/do-air-purifiers-really-work.mdx:150` | `...but as of 2026, HEPA remains the evidence-based gold standard.` | Same |
| `content/ductwork/duct-leakage-testing.mdx:311` | `A standalone duct leakage test costs $150–$350 in most markets as of 2026.` | Same |
| `content/refrigerants/hvac-refrigerant-phase-out.mdx:190` | `Several low-GWP refrigerants have emerged as R-410A replacements. Here's the competitive landscape as of 2026:` | Same |
| `content/refrigerants/hvac-refrigerant-phase-out.mdx:440` | (Japan since 2012 context, Kigali Amendment) | stable historical fact |
| `content/hvac-brands/goodman-ac-age-serial-number.mdx:60` | Table header: `System Age (as of 2026)` | Table anchor — needs annual recompute anyway |
| `content/tax-credits-rebates/hvac-rebates-by-state.mdx:331` | `Program availability varies dramatically by state. Some have been active since 2024–2026; others haven't launched yet.` | Program state — stable enough |
| `content/heat-pumps/heat-pump-cost-to-install.mdx:217` | `IRA HEAR (formerly HEEHRA) — ACTIVE in 2026: Up to $8,000 point-of-sale rebate, income-dependent. State-administered; available in 40+ states as of 2026.` | Program state — semi-stable |
| `content/electric-fireplaces/best-electric-fireplaces.mdx:318` | `The Dimplex Ignite XL and Dimplex Revillusion series are widely considered the most realistic as of 2026.` | Product-recommendation time anchor |
| `content/mini-split-air-conditioners/mini-split-air-conditioners.mdx:229` | `**National average electricity rate:** $0.17/kWh as of 2026 (EIA data).` | EIA-anchored data point |
| `content/energy-efficiency-ratings/is-higher-seer-worth-it.mdx:322` | `The real comparison for 2026 buyers is 15 SEER2 vs 19 SEER2, where the efficiency difference is about 25%.` | Buyer-context anchor |

**Scope call — not action:** these are Batch F territory (freshness/year-in-title policy). Options:
- Include in Batch D → 11+ additional edits, mostly small rewords to drop the "as of 2026" clause.
- Defer to Batch F → cleaner scope separation; Batch F's freshness policy decision will guide the rewrite pattern.

Recommend **defer to Batch F**. Note in BATCH_QUALITY_BACKLOG.md.

### 3.c — Warranty-voiding claims (Lane 4a, NOT compliance decay)

19 hits sitewide. All are accurate manufacturer-policy statements ("mixing incompatible units voids the warranty", "DIY installation may void the warranty", "extension cords void your warranty", "aluminum wire may void warranty", etc.). These are **NOT decay-prone** — the underlying manufacturer policies don't age the same way tax law does, and the claims are useful safety guidance for readers.

**No action proposed for warranty-voidance claims.** They stay as-is. Catalogued here to close the sweep loop.

---

## Change summary (if approved)

| Group | Files | Edits |
| --- | --- | --- |
| STEP 1 — Federal Tax Credits card (Option A or B) | 1 (`app/cost-guides/page.tsx`) | 1 edit (Option A rewrite) or 1 deletion (Option B) |
| STEP 2 — cost-guides:33 optional pointer refinement | 1 (`app/cost-guides/page.tsx`) | 0 or 1 (optional) |
| STEP 2 — cost-guides:222 | 0 | Already Batch-D-compliant |
| STEP 3.a — Residual OBBBA-decay claims | 3 files: `components/calculators/HVACROICalculator.tsx`, `content/heat-pumps/heat-pump-guide.mdx`, `content/energy-costs/electric-water-heating-cost-by-state.mdx` | 3 edits (each is a paragraph/InfoTip rewrite) |
| STEP 3.b — "as of 2026" decay | 11 files | **DEFER to Batch F** |
| STEP 3.c — warranty voidance | 15 files | **NO ACTION** (accurate manufacturer policy statements) |

**Total apply set:** 5 edits across 4 files (STEP 1 Option A + STEP 3.a's 3 items + optional STEP 2 refinement).

**MDX files touched (STEP 3.a items #2 and #3):** 2 files → dateModified/dateUpdated bumps to 2026-07-13.

**TSX files touched (STEP 1 + STEP 3.a #1):** 2 files → no date bump (code/copy).

---

## MY-SIDE VERIFY appendix

**Do not ship the AFTERs until the following items are confirmed against live sources.** The box cannot reach IRS / DOE / EPA / Congress.gov; every claim below needs your source-check.

### V-D-1 — OBBBA 25C termination

- **Claim:** `The federal Section 25C Energy Efficient Home Improvement Credit terminated for property placed in service after 2025-12-31 under OBBBA (PL 119-21, signed 2025-07-04).`
- **Verify:** IRS OBBB FAQ page (`irs.gov/newsroom/faqs-for-modification-of-sections-25c-25d-25e-...`); Congress.gov CRS report IN12611.
- **Where it appears in the proposed AFTER text:** all three STEP 3.a rewrites reference OBBBA and the 2025-12-31 termination date. Also STEP 1 Option A implicitly relies on this.

### V-D-2 — HEAR / HOMES eligibility

- **Claim (STEP 1 Option A):** `HEAR income-qualified up to $8,000; HOMES performance-based`
- **Claim (STEP 3.a #2):** `IRA HEAR rebates of up to $8,000 (income-qualified) or HOMES performance-based rebates`
- **Claim (STEP 3.a #3):** `IRA HEAR income-qualified rebates (up to $1,750 for heat pump water heaters)`
- **Verify:** DOE Home Energy Rebate Programs page (`energy.gov/scep/home-energy-rebate-programs`); IRA statute text for the two programs; the site's own `/hvac-tax-credits-2026` article for internal consistency.
- **HEAR heat pump cap** — commonly cited as $8,000 income-qualified. Confirm.
- **HEAR heat pump water heater cap** — commonly cited as $1,750. Confirm.

### V-D-3 — State/utility rebate ranges

- **Claim (STEP 3.a #2):** `state and utility rebates of $500–$3,000+`
- **Claim (STEP 3.a #2, original text preserved):** `state rebates of $1,000–$16,000`
- **Verify:** DSIRE database (`dsireusa.org`); ENERGY STAR rebate finder; state-specific utility program pages.

### V-D-4 — Card categorical eligibility (Option A)

- **Claim (STEP 1 Option A eligible list):** `['Heat pumps (IRA HEAR/HOMES for 2026 installs)', '2024-2025 installs may still recapture 25C via amended return']`
- **Verify:** IRA HEAR statute — confirm HEAR covers only heat pumps (not central AC, gas furnaces, boilers) plus water heaters, electric panel upgrades, weatherization, cooktops. Confirm HOMES is performance-based (savings-tied) and open to all incomes.

### V-D-5 — Amended return window

- **Claim (STEP 3.a implicitly, and in existing 25C-explained article):** `For 2024/2025 installs that didn't claim 25C at the time, an amended return on IRS Form 1040-X may still recapture the credit — 25C does NOT allow carryforward.`
- **Verify:** IRS Form 1040-X three-year window rule; IRS 25C section on carryforward restriction (this is what makes 25C different from 25D which does allow carryforward).

### V-D-6 — Existing article consistency

The proposed AFTERs assume the site's `/hvac-tax-credits-2026`, `/25c-tax-credit-explained`, and `/heat-pump-tax-credits-2026` articles are current and accurate. **Sample-check** those three articles' current dateModified stamps + spot-read them to confirm they still reflect OBBBA reality before pointing users to them from the new copy.

---

## Open questions

- **Q-D-1:** STEP 1 — Option A (retitle + rewrite) or Option B (delete card)? Recommendation: A.
- **Q-D-2:** STEP 2 — apply the optional :33 pointer refinement, or skip?
- **Q-D-3:** STEP 3.a — apply all 3 residual OBBBA-decay rewrites? Any edit-text refinements before I ship?
- **Q-D-4:** STEP 3.b "as of 2026" — defer to Batch F (recommended) or fold in now?
- **Q-D-5:** Commit shape — single commit `fix(compliance): OBBBA-consistency sweep for Federal Tax Credits card + 3 residual decay claims (Batch D)` after MY-SIDE VERIFY confirms?

Stopping. No edits, no commits.

*End of preview.*
