# Gate 11 (raptive-fix/11-tax-final3) — summary

**Branch:** `raptive-fix/11-tax-final3` off `raptive-fix/10-tax-last2`
**Build:** ✅ `npm run build` → **376 / 376 pages** clean
**Mode:** apply, 3 commits, NO merge, NO push.

---

## Part 1 — the 3 user-flagged fixes

| # | File:line | Old text | Fix |
|---|---|---|---|
| 1 | `content/heat-pumps/heat-pump-cost-to-install.mdx:77` | "These meet federal minimums and ENERGY STAR thresholds but **don't qualify for the maximum tax credits**. Total installed cost: $4,500–$8,000." | Reframed: "These meet federal minimums and ENERGY STAR thresholds. (Pre-expiration, this tier fell below the SEER2 ≥ 18 / HSPF2 ≥ 9.5 threshold for the now-expired federal 25C credit; the 25C credit expired Dec 31, 2025 under the OBBBA for all efficiency tiers regardless. For 2026 installs, IRA HEAR (income-qualified, up to $8,000 for heat pumps) and HOMES (performance-based) plus state/utility rebates often still require the SEER2 18+ / HSPF2 9.5+ tier for full benefit.) Total installed cost: $4,500–$8,000." Resolves the internal contradiction with line 79 of the same file. |
| 2 | `content/electric-fireplaces/pellet-stove-cost-to-run.mdx:278` | "...In areas with expensive gas (above $1.30/therm) or no gas service, pellets often win. **Pellet stoves also qualify for tax credits that gas furnaces do not.**" | Reframed: "(The federal 25C biomass-stove credit (30% of cost up to $2,000) that previously favored qualifying pellet stoves over gas furnaces expired Dec 31, 2025 under the OBBBA (PL 119-21, signed July 4, 2025); for 2026 installs, state and utility wood/pellet stove incentive programs — where available — are the active pathway.)" Consistent with prior Gate 7 rate-and-section corrections on best-pellet-stoves.mdx and the Harman Absolute63 worked example. |
| 3 | `content/generators/natural-gas-generator-running-cost.mdx:268` | "...Check with your state energy office and local utility for current incentive programs. **Solar battery backup systems do qualify for the federal solar investment tax credit (ITC).**" | Reframed: "(The federal Section 25D Residential Clean Energy Credit (30%) that previously covered qualifying solar + battery storage systems expired for property placed in service after Dec 31, 2025 under the OBBBA (PL 119-21, signed July 4, 2025); unlike the 25C credit, 25D allowed carryforward of unused credit — so households with pre-2026 installs can still carry forward unused credit on future returns — but new 2026 installs no longer accrue the credit. State and utility solar/storage rebate programs remain available.)" 25C/25D carryforward distinction surfaced (25D allows; 25C does not). |

User-flagged #4 (`minimum-seer-rating-by-state.mdx:196`) **NOT TOUCHED** per user instruction (it's a code-compliance disqualification statement, not a credit-availability claim).

---

## Part 2 — broadened final verification

Method: extract every sentence in `content/` + `app/` containing any credit token (`tax credit`, `25C`, `25D`, `ITC`, `$2,000`, `$600`, `$1,200`, `30%…credit`, `26%`, `federal credit`, `IRA credit`, `federal solar tax credit`). For each, classify by READING the sentence — does it assert/imply a federal tax credit is AVAILABLE for a 2026 install, in present/future tense, WITHOUT an expiry/past-tense/2025-date/historical marker in the SAME sentence?

Output: `/workspace/tax-suspects-final.txt` — full file:line + sentence text + yes/no/borderline call + reason for each suspect.

### 🔴 RESULT: 48 YES + 1 BORDERLINE = 49 suspects across 24 unique files

The 3 fixes in Part 1 closed the surface holes from Gate 10's manual grep. But the broadened verification (which dropped the regex-syntax assumption and read sentences as English) surfaced a much wider scope of unfixed claims. **The Gate 7 OBBBA sweep was not complete.**

### Suspects cluster by topic

| Cluster | Files | YES count | Severity |
|---|---|---|---|
| **Battery-backup / solar** (25D ITC) | 3 files | 18 | 🔴 Highest — 3 files explicitly assert "30% federal tax credit remains available through 2032" |
| **Water heaters** (25C HPWH + 25D solar) | 5 files | 8 | 🔴 High — lead paragraphs + key takeaways |
| **Tankless water heaters** (25C tankless) | 3 files | 4 | 🟡 Medium — worked examples + stacking-strategy callouts |
| **Energy-costs guides** (25D solar) | 3 files | 3 | 🟡 Medium — table headers + FAQ answers |
| **Efficiency-ratings** (25C $600 AC bucket) | 3 files | 6 | 🟡 Medium — worked-example deduction lines (-$600) |
| **Heat-pumps** (25C + 25D) | 2 files | 4 | 🟡 Medium — Chen example + uncapped 25D claim |
| **Misc** (mini-split + generator + central-ac) | 3 files | 3 | 🟡 Low — single-sentence claims each |
| **BORDERLINE** (dedicated historical page) | 1 file | 1 | 🟢 Likely OK — page-level frame may save it |

### Why the v6/v9 classifier missed these

The v6 classifier (Gate 9) used a focused regex covering "qualifies for" + credit-token. The v2 sentence extractor (Gate 11) broadened to include "do qualify", "applies", "remains available", and "after the X credit". Still missed these constructions:

- **"Combined with the X credit and the Y credit, the payback is…"** — verb "combined" applies to "payback" not "credit"
- **"With IRA tax credits, the effective premium drops to $X."** — the credit is in a prepositional phrase; the verb "drops" applies to "premium"
- **"The 30% uncapped tax credit (25D) significantly reduces the cost gap."** — POS_VERB_RE required `reduces? \w+ (by|to)`, too restrictive
- **"Factor in … the federal 25C tax credit (up to $600), and payback can drop to 3–6 years."** — credit is parenthetical; verb is "factor in" / "drop"
- **"We also cover the tax credits and rebates that can reduce your cost by 30–60%."** — verb "cover" applies to the GUIDE, not the credit; credit token is the object
- **Worked-example bullet lines** like `- Federal tax credit: -$600` — no verb at all

Per user's "stop chasing regex syntax" instruction, the final reading was done manually after the script's first pass. The 13 additional finds came from a broader topic-based grep + sentence-by-sentence reading.

### Suspect detail (full quoted sentences + reasons)

See `/workspace/tax-suspects-final.txt` for the complete list with file:line, full sentence text, YES/BORDERLINE verdict, and reason for each.

Top-3 worst offenders (clearest live FALSE claims):

1. **`battery-backup/solar-panel-calculator.mdx:292`** — Key Takeaway bullet: "**The 30% federal tax credit** remains available through 2032 under the IRA" — direct false statement.
2. **`battery-backup/solar-panel-calculator.mdx:336`** — FAQ "Is solar still worth it?": "Yes. The 30% federal tax credit is still available, panel costs have dropped 70%..." — direct false statement.
3. **`battery-backup/solar-panel-cost-by-state.mdx:298`** — FAQ "Is the 30% solar tax credit still available in 2026?": "**Yes.** The Inflation Reduction Act extended the 30% Investment Tax Credit through 2032..." — the FAQ question is dated "in 2026" and the answer is "Yes" → direct factual error.

---

## Part 3 — recommended next gate

Gate 12 should be a **systematic cluster-by-cluster sweep** of the 24 affected files, similar to Gate 7's OBBBA sweep, but with the broader regex assumption removed. Cluster order by severity:

1. **battery-backup/** (3 files, 18 suspects) — highest blast radius; multiple Key Takeaways + FAQ answers are direct false statements
2. **water-heaters/** (5 files, 8 suspects) — lead paragraphs of 2026 cost guides
3. **energy-efficiency-ratings/** SEER comparison files (3 files, 6 suspects) — worked-example deduction lines that need recomputing
4. **heat-pumps/** (2 files, 4 suspects) — Chen example + 25D uncapped claim
5. **tankless-water-heaters/** (3 files, 4 suspects)
6. **energy-costs/** (3 files, 3 suspects)
7. **Misc** (mini-split-installation-cost, generator-vs-solar-battery-backup, central-ac-cost-to-install) — 1 each

Per past-gate hard rules (Gate 7 / 8 / 9 / 10 / 11):
- No fabricated numbers (every dollar derives from values already on the page)
- Cite-on-correct (IRS OBBB FAQ + Congress.gov CRS IN12611)
- 25C does NOT allow carryforward; 25D DOES — distinction preserved
- Historical worked examples dated to 2025 with 2026 caveat where install year affects the math
- Where the credit was load-bearing for the example's payback math, recompute the 2026 payback without the credit and note it explicitly

---

## Gate 11 commits

```
79d352a  fix(gen-faq-25d): line 268 "solar battery do qualify for ITC"
9e8a01e  fix(pellet-stove-vs-gas-faq): line 278 "qualify for tax credits"
07702c5  fix(hp-cost-install-tiers): line 77 implied 2026 max credits exist
```

```
$ git diff --shortstat raptive-fix/10-tax-last2..HEAD
3 files changed, 3 insertions(+), 3 deletions(-)
```

`raptive-fix/11-tax-final3` is the candidate. **3 fixes applied as instructed. 48 newly-surfaced live present-tense federal-credit claims documented in `tax-suspects-final.txt` for Gate 12 cleanup.**
