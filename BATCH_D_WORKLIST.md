# Batch D Worklist

Items surfaced during Batch C.1 that belong in Batch D (compliance-adjacent scope, not stat-shape stripping).

## 2026-07-13 additions from Batch C.1

### `app/cost-guides/page.tsx:212-218` — Federal Tax Credits card

**Batch C.1 disposition:** the `amount: 'Up to $2,000'` figure was stripped to `amount: 'See current eligibility'` because 25C was terminated for property placed in service after 2025-12-31 under OBBBA (PL 119-21, signed 2025-07-04). **Only the number was stripped in this batch.** The rest of the card copy still frames the card around 25C-era eligibility.

**Remaining in-card copy requiring Batch D review:**
- `title: 'Federal Tax Credits'` — the card is now framed around a credit that no longer applies to 2026 installs.
- `href: '/hvac-tax-credits-2026'` — the destination article IS already OBBBA-updated; the card copy on this page should match.
- `eligible: ['Heat pumps', 'Central AC', 'Boilers', 'Furnaces']` — this list reflects 25C-covered equipment. Post-OBBBA, no federal credit covers Central AC / Gas Furnaces / Boilers for 2026 installs. HEAR/HOMES rebates have different eligibility (heat pumps yes; central AC, gas furnaces, boilers not federally rebated).
- `requirements: 'Energy Star certified'` — this was a 25C requirement text. HEAR/HOMES use income + heat-pump-specific eligibility criteria.

**Recommended Batch D disposition options:**
1. **Retitle + rewrite the whole card** to reflect current federal reality ("Federal & IRA Rebates: HEAR, HOMES, Heat-Pump-specific"), with eligibility list scoped to heat pumps + water heaters.
2. **Remove the card entirely** and rely on the adjacent "Utility Rebates by State" card + the OBBBA-updated `/hvac-tax-credits-2026` article for full context.
3. **Split into two cards:** "Federal Tax Credits (Historical — for 2024/2025 installs)" and "Federal IRA Rebates (HEAR / HOMES for 2026 installs)".

Recommendation: Option 1 or 2 — Option 3 keeps the visual real estate but adds explanatory complexity that isn't warranted on a cost-guides landing.

**Cross-references:** the OBBBA-updated context lives in `content/tax-credits-rebates/hvac-tax-credits-2026.mdx` and `content/tax-credits-rebates/25c-tax-credit-explained.mdx`, which the initial compliance triage confirmed as current. Batch D should sync the cost-guides card with those articles' framing.
