# Gate 10 (raptive-fix/10-tax-last2) — summary

**Branch:** `raptive-fix/10-tax-last2` off `raptive-fix/09-tax-final`
**Build:** ✅ `npm run build` → **376 / 376 pages** clean
**Mode:** apply, 2 commits, NO merge, NO push.

---

## Part 1 — the 2 user-flagged fixes

### Fix 1 — `content/furnaces-heating/best-oil-furnace.mdx:181`

**BEFORE** (FAQ answer to "Is an oil furnace better than a heat pump?"):
> In most scenarios, no. Modern cold-climate heat pumps can operate in Northeast winters and cost 30-50% less to operate than oil. Heat pumps also provide cooling, have no combustion risk, and **qualify for federal tax credits**. Oil furnaces produce more BTUs of output in extreme cold, but heat pump technology has caught up for most populated areas. The main advantage of oil is established infrastructure in homes that already have oil tanks and oil delivery service.

**AFTER:**
> In most scenarios, no. Modern cold-climate heat pumps can operate in Northeast winters and cost 30-50% less to operate than oil. Heat pumps also provide cooling and have no combustion risk. **(The federal 25C heat-pump tax credit that previously offered up to $2,000 expired for installs after Dec 31, 2025 under the OBBBA (PL 119-21, signed July 4, 2025); for 2026 installs, IRA HEAR (income-qualified, up to $8,000 for heat pumps), IRA HOMES (open to all incomes, performance-based), and state/utility rebates are the active incentive pathways.)** Oil furnaces produce more BTUs of output in extreme cold, but heat pump technology has caught up for most populated areas. The main advantage of oil is established infrastructure in homes that already have oil tanks and oil delivery service.

Commit: `b6c53e1  fix(oil-furnace-faq): heat-pump-vs-oil FAQ "qualify for federal tax credits"`

### Fix 2 — `content/hvac-costs-by-state/hvac-cost-new-york.mdx:333`

**BEFORE** (FAQ answer to "Is a ductless mini-split a good option for New York homes?"):
> ... A single-zone mini-split costs $3,500–$8,500 installed. Multi-zone systems (3–5 zones) cost $9,000–$25,000. **Mini-splits qualify for heat pump tax credits and NYSERDA rebates.**

**AFTER:**
> ... A single-zone mini-split costs $3,500–$8,500 installed. Multi-zone systems (3–5 zones) cost $9,000–$25,000. **The federal 25C heat-pump tax credit that previously applied to qualifying mini-splits expired for installs after Dec 31, 2025 under the OBBBA (PL 119-21, signed July 4, 2025); NYSERDA Clean Heat rebates remain available in 2026, and IRA HEAR (income-qualified, up to $8,000 for heat pumps) and HOMES (performance-based) are the active federal pathways.**

Split dead federal credit from live state program per user instruction.

Commit: `77b198b  fix(ny-minisplit-faq): split dead federal credit from live NYSERDA program`

---

## Part 2 — manual sanity grep results

User's grep:
```bash
grep -iE "(qualif|eligible for|you can claim|get a).{0,40}(tax credit|25C|25D|30%|\$600|\$2,000|IRA credit)" content/ app/ -rn \
  | grep -ivE "expired|through dec|in 2025|2023-2025|no longer|previously|pre-2026|before dec|needed|won't|not qualify|doesn't qualify|ineligible|question:"
```

**14 hits after the stop-word filter.** Triage by category:

### A. Past-tense / explicitly-expired (no fix needed): 6 hits

| # | File:line | Why it's fine |
|---|---|---|
| 4 | `content/tax-credits-rebates/hvac-tax-credits-2026.mdx:53` | "Equipment **had to be installed and operational by December 31, 2025** to qualify for the 25C credit. Equipment installed in 2026 does **not** qualify." Past-tense + negative; markdown bold (`**not**`) is why the stop-word "not qualify" filter missed it. |
| 5 | `content/tax-credits-rebates/energy-star-tax-credits.mdx:85` | "Many state rebate programs continue to reference CEE's highest tier as their qualifying standard, **even though the federal tax credit is gone**." Explicitly dead. |
| 6 | `content/tax-credits-rebates/energy-star-tax-credits.mdx:285` | "CEE's highest tier ... **was the actual qualifying standard** for the 25C federal tax credit." Past-tense. |
| 7 | `content/heat-pumps/heat-pump-tax-credits-2026.mdx:58` | "Heat pumps **placed in service after Dec 31, 2025** are **not** eligible for any federal 25C credit." Explicitly negative (markdown bold around `**not**` is why "not eligible" filter missed it). |
| 8 | `content/heat-pumps/heat-pump-tax-credits-2026.mdx:133` | "**Step 3: File IRS Form 5695 (2025 version).**" Explicit 2025 form on the dedicated 25C-historical explainer page. |
| 9 | `content/heat-pumps/heat-pump-tax-credits-2026.mdx:162` | "The Section 25C ... **terminated for equipment placed in service after December 31, 2025**." Explicit termination. |

### B. FAQ question headers with already-correct answers (no fix needed): 2 hits

| # | File:line | Why it's fine |
|---|---|---|
| 11 | `content/heat-pumps/best-mini-split-heat-pumps.mdx:313` | Question is `<FAQ.Item question="Do mini splits qualify for tax credits in 2026?">`. Filter missed because JSX uses `question=` not `question:`. **Answer (line 314)** correctly states "Section 25C credit ... expired for property placed in service after Dec 31, 2025 under the OBBBA." |
| 12 | `content/heat-pumps/best-cold-climate-heat-pumps.mdx:228` | Same JSX pattern. **Answer (line 229)** correctly states "Section 25C credit ... expired ... under the OBBBA." |

### C. Non-credit incidental grep matches (no fix needed): 2 hits

| # | File:line | Why it's a false positive |
|---|---|---|
| 1 | `content/energy-efficiency-ratings/14-3-seer2-vs-16-seer.mdx:31` | "The confusion starts with the ratings ... the implications for ENERGY STAR qualification, tax credits, and federal compliance are significant." Abstract topic-introduction phrase. Does not assert any specific credit is available — just lists "tax credits" as one of the implication categories. |
| 3 | `content/battery-backup/solar-panel-cost-by-state.mdx:265` | "**Get at least 3 quotes.** Pricing varies 20–30% between installers ..." Pure grep false positive — "get a"/"3" → "Get at least 3" with no credit content. |

### D. 🟡 LIVE PRESENT-TENSE CLAIMS (need fix in a future gate): **4 hits**

Per user instruction "Report any that reads as a live present-tense credit claim," reporting only — not auto-fixing in this gate (mandate was 2 commits).

| # | File:line | Quoted text | Why it's a live claim |
|---|---|---|---|
| 10 | `content/heat-pumps/heat-pump-cost-to-install.mdx:77` | "Standard efficiency (SEER2 15–17, HSPF2 8–9): These meet federal minimums and ENERGY STAR thresholds but **don't qualify for the maximum tax credits**." | Present-tense negative implies the "maximum tax credits" exist in 2026, which they don't. The very next paragraph (line 79) DOES have correct OBBBA-expired framing for the high-efficiency tier — so line 77 is internally inconsistent with line 79. **Recommended fix:** "...but historically didn't qualify for the maximum 25C tax credits before the credit expired Dec 31, 2025 under the OBBBA" (or simply remove the tax-credit clause — it's no longer a 2026 differentiator). |
| 13 | `content/electric-fireplaces/pellet-stove-cost-to-run.mdx:278` | "Pellet stoves also **qualify for tax credits** that gas furnaces do not." | Clear present-tense live claim. Pellet stoves fell under §25C's biomass-stove bucket (30% up to $2,000), which expired Dec 31, 2025 under OBBBA — already corrected on other pages (best-pellet-stoves.mdx, the worked Harman Absolute63 example) in Gate 7. This FAQ answer slipped through. **Recommended fix:** "The federal 25C biomass-stove credit (30% up to $2,000) that previously favored qualifying pellet stoves expired Dec 31, 2025 under the OBBBA; for 2026 installs, state/utility incentives are the active pathway." |
| 14 | `content/generators/natural-gas-generator-running-cost.mdx:268` | "...Solar battery backup systems **do qualify for the federal solar investment tax credit (ITC)**." (FAQ "Can I get a tax credit for installing a natural gas generator?") | Clear present-tense live claim about §25D residential clean energy credit (which covers solar + battery storage). §25D also expired Dec 31, 2025 under OBBBA. **Note:** 25D allows carryforward of unused credit (unlike 25C), but the credit itself no longer accrues for property placed in service in 2026+. **Recommended fix:** "The federal §25D residential clean energy credit (30%) that previously covered qualifying solar + battery storage systems expired for property placed in service after Dec 31, 2025 under the OBBBA; carryforward of unused credit from pre-2026 installs is still allowed, but new 2026 installs no longer accrue the credit. State/utility solar/storage rebates remain available." |

### E. Borderline (debatable — leaning include): 1 hit

| # | File:line | Quoted text | Why it's borderline |
|---|---|---|---|
| 2 | `content/energy-efficiency-ratings/minimum-seer-rating-by-state.mdx:196` | "Installing below-minimum equipment is illegal and disqualifies you from warranties, rebates, and tax credits" | Conditional code-compliance statement, not an affirmative "credits are available" claim — but it does imply "tax credits" exist that you'd be disqualified from. **Conservative fix:** change "tax credits" to "rebates" (since federal tax credits are gone but state/utility rebates remain). |

---

## Summary

**🟢 The 2 user-flagged claims are fixed.** Build passes 376/376.

**🟡 4 additional live present-tense credit claims surfaced via manual grep that the v6 classifier missed.** Two reasons the v6 classifier missed them:
- #10 + #13 use the verb "qualify" without one of the v6 CLAIM_VERB triggers in a positive-assertion construction (negative "don't qualify" on #10; "qualify ... that gas furnaces do not" on #13 reads syntactically different).
- #14 uses "do qualify" — the auxiliary "do" wasn't in the verb list (only "qualifies for", "qualify for", "eligible for", "you can claim", "get a", etc.).

These 4 + the 1 borderline (#2) are good candidates for a Gate 11 cleanup pass, with the classifier extended to catch "do qualify", "don't qualify [for the maximum/full ...]", and "qualify for [credit] that X does not" constructions.

---

## Gate 10 commits

```
77b198b  fix(ny-minisplit-faq): split dead federal credit from live NYSERDA program
b6c53e1  fix(oil-furnace-faq): heat-pump-vs-oil FAQ "qualify for federal tax credits"
```

```
$ git diff --shortstat raptive-fix/09-tax-final..HEAD
2 files changed, 2 insertions(+), 2 deletions(-)
```

`raptive-fix/10-tax-last2` is the candidate. **2 fixes applied as instructed; 4 newly-surfaced live claims reported for Gate 11 consideration.**
