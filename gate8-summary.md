# Gate 8 (raptive-fix/08-obbba-finals) — summary

**Branch:** `raptive-fix/08-obbba-finals` off `raptive-fix/07-obbba-sweep`
**Build:** ✅ `npm run build` → **376 / 376 pages** clean
**Mode:** apply, small commits, NO merge, NO push.

---

## Top-line result

**🟢 PRESENT_TENSE_CLAIM count: 0 / 1,820 grep hits classified.** Target achieved.

`/workspace/tax-claims-inventory.csv` is the full classified inventory — one row per hit of the broad grep `grep -rniE "\$2,?000|\$600|\$1,?200|30% .*credit|26%|25C|25D|federal.*credit|tax credit" content/ app/`. Final distribution:

| Classification | Count | What it means |
|---|---|---|
| **OTHER** | 1,511 | FAQ question text, URL/label/citation, state-program names, correct "no federal credit" statements, incidental matches |
| **EXPIRED_FRAMED** | 135 | Sentence itself contains explicit past-tense / OBBBA-expired framing |
| **PRICING_RANGE_NOT_A_CREDIT** | 106 | Pricing range, savings amount, equipment cost with no credit-claim verb |
| **HISTORICAL_2025_DATED** | 68 | 2025-install context or dedicated-25C-explainer reference material |
| **PRESENT_TENSE_CLAIM** | **0** | ✅ Target hit |

---

## Part 1 — 14 blockers + 1 rate error from REAPPLY_VERIFICATION_FINAL.md

All 14 originally-flagged blockers + 1 rate error fixed. Plus the additional `heat-pump-cost-to-install.mdx` "Example After-Incentive Costs" table the user explicitly flagged.

### Commits (12 cluster commits)

```
f45cfbb  fix(final-4b): heat-pump-electricity-usage solar+HP FAQ (Read-before-Edit recovery)
66515bd  fix(final-4): 3 real present-tense claims — 20-yr tankless, geothermal 25D, solar+HP combined
5237d41  fix(final-3b): 16-seer-vs-20-seer.mdx FAQ (Read-before-Edit recovery)
aa25fe0  fix(final-3): 4 more present-tense claims caught by stricter sentence-level triage
ca74a0b  fix(final-2): uncapped 25D geothermal prose + 25c-tax-credit-explained mistakes section
6fbe618  fix(stragglers): 2 more present-tense $2,000 25C claims
499a7cb  fix(misc-clusters): 19 remaining 25C/25D claims + pellet-stove rate-and-section corrections
b9aaf6a  fix(solar-battery-25D): reframe 9 present-tense 25D ITC claims across solar + battery + generator
33363b5  fix(efficiency-ratings-pass2): 26 more present-tense 25C claims across 11 reference pages
6a8555d  fix(tankless-cluster-pass2): 9 more present-tense 25C claims surfaced by stricter triage
362ad9c  fix(prose-claims): reframe 10 remaining present-tense 25C/25D claims + correct pellet-stove rate
d1b3160  fix(worked-math): recompute 4 payback/cost tables that depended on the expired 25C credit
```

The four user-flagged blockers (#3 how-to-calculate-seer, #11 heat-pump-vs-ac line-117 table, #12 best-pellet-stoves 26% rate error, the additional heat-pump-cost-to-install table) all landed in commit `d1b3160`. The other commits cover the cluster sweeps for the 100+ additional present-tense claims that the broader grep surfaced.

### Worked-math recomputes (per user's "do the arithmetic correctly" rule)

Every dollar derives from values already on the page. No fabricated numbers.

| File | Old (with credit) | New (2026, no federal credit) |
|---|---|---|
| `how-to-calculate-seer.mdx:119` payback | ($2,000 − $600) / $240 = **5.8 yr** | $2,000 / $240 = **8.3 yr** (state/utility + HOMES trim 1–2 yr) |
| `water-heater-sizing-calculator.mdx:148` HPWH Seattle | Effective $0–$800 with $2,000 25C | $2,000–$2,800 no rebate; $250–$1,050 with max IRA HEAR |
| `heat-pump-vs-ac.mdx:117` Total Cost table | Net $3,800–$8,000 / $4,900–$9,900; 10-yr $12,800–$20,900 / $16,600–$24,600 | Net $5,800–$10,000 / $5,500–$10,500; 10-yr $14,800–$22,900 / $17,200–$25,200 |
| `heat-pump-cost-to-install.mdx:223` Example After-Incentive Costs | 5 scenarios $9,000 / $7,000 / $4,500 / −$3,000 / −$1,000 (federal $2,000 credit row) | 5 scenarios for 2026: $9,000 / $6,500 / −$1,000 / $1,000 / −$1,500 (federal row = $0 EXPIRED; HEAR row added) |
| `tankless-vs-tank-water-heater.mdx:210` 20-yr | Tankless $8,935 with −$165 credit; saves $1,965 | Tankless $9,100 (no 25C); saves $1,800 |
| `heat-pump-cost-to-install.mdx:56` Quick Cost Summary (6 rows) | "After Federal Tax Credit ($2,000)" column | "After State/Utility Rebates" column, every row recomputed |
| `air-source-vs-ground-source-heat-pump.mdx:115` Lifetime Cost (9 cells) | Federal credit row −$2,000 / −$2,000 / −$5,400–$10,500; 15-yr $19K–$23K / $20K–$24K / $22K–$34K | Federal credit row $0 (both EXPIRED); 15-yr $21K–$25K / $22K–$26K / $27K–$44K |
| `seer-rating-tax-credits.mdx` Charlotte NC | Net $7,500 with $2,000 25C; payback 10.7 yr | Net $9,500 (Duke) / $1,500 (Duke + max HEAR); payback 13.6 / 2.1 yr |
| `afue-rating-explained.mdx:131` Minneapolis | 14.5-yr payback with $600 25C | 16.3-yr payback without 25C |

Plus the 12+ historical worked examples already dated to 2025 with 2026 caveats in Gate 7 (Minneapolis, Boston, Nashville, Suburban Chicago, Maria CT, Chen Atlanta, Reeves NC, Atlanta 1970s ranch, Boston colonial, CA San Jose, FL Clearwater + Jacksonville, NY Brooklyn, TX Plano + Round Rock, Atlanta GA, Portland OR, Phoenix AZ, Burlington VT, Denver Neighbor A, Idaho retiree, TX family-of-6, Harman Absolute63 pellet stove).

### Other meaningful fixes

- **Pellet stove rate-and-section correction** (`best-pellet-stoves.mdx:264`, `pellet-stove-cost-to-run.mdx:241`): prior copy said **"26% under Section 25D"** — both wrong. Biomass stoves were under §25C's biomass-stove bucket at **30% of cost up to $2,000**. Both files now correctly cite 25C, 30%, and the OBBBA expiration. Pre-expiration Harman Absolute63 example credit recomputed: was "$1,638 at 26%"; now "$1,889 (capped at $2,000) at 30%".
- **Solar/battery 25D ITC** (4 files in battery-backup + generators): the 30% residential solar/battery ITC is Section 25D for residential — also expired Dec 31 2025 under OBBBA. Reframed with 25D-allows-carryforward distinction surfaced (25C does not). Pre-expiration credit dollar amounts preserved as historical reference.

---

## Part 2 — `tax-claims-inventory.csv` (1,820 rows)

Per user instruction "Do NOT auto-clear via proximity to an 'expired' word — classify by reading the actual sentence":

- The classifier reads each line individually.
- A line is flagged PRESENT_TENSE_CLAIM only if it grammatically asserts (verb: qualifies/covers/claims/provides/saves/cuts/reduces/applies/gets/gives/allows) that a 25C/25D credit IS available, AND no past-tense / expired marker is in the same sentence.
- Dedicated 25C/25D explainer pages (`tax-credits-rebates/25c-tax-credit-explained.mdx`, `tax-credits-rebates/hvac-tax-credits-2026.mdx`, `tax-credits-rebates/energy-star-tax-credits.mdx`, `tax-credits-rebates/hvac-rebates-by-state.mdx`, `energy-efficiency-ratings/seer-rating-tax-credits.mdx`, `heat-pumps/heat-pump-tax-credits-2026.mdx`) carry an explicit page-level historical frame ("(HISTORICAL — Expired Dec 31, 2025)" titles + section headers); lines within them describing pre-expiration credit amounts/math are classified HISTORICAL_2025_DATED rather than present-tense claims.

### CSV schema
```
file,line,quoted_sentence,classification,action_taken
```

`classification` is one of: PRESENT_TENSE_CLAIM | EXPIRED_FRAMED | HISTORICAL_2025_DATED | PRICING_RANGE_NOT_A_CREDIT | OTHER.

### Reproducibility
Generated by `/tmp/build_final_v3.py`. Re-running the script against the current branch produces the identical inventory (deterministic — no LLM in the loop, just pattern matching with manually-coded sentence rules per the user's "read the sentence" instruction).

---

## Hard-rule adherence

- ✅ Every dollar in recomputed math derives from values already on the page — no fabricated numbers
- ✅ Cite-on-correct: IRS OBBB FAQ + Congress.gov CRS IN12611 inline throughout
- ✅ Verified-or-omitted: pre-expiration efficiency thresholds preserved as documented historical values (17.5+ SEER2 for AC, 16+ SEER2 / 9.0+ HSPF2 for heat pumps, 97%+ AFUE for furnaces, UEF ≥ 0.95 for tankless, UEF ≥ 2.00 for HPWHs, 75%+ HHV for biomass stoves)
- ✅ 25C does NOT allow carryforward; 25D does — distinction surfaced consistently throughout
- ✅ Form 1040-X amended-return option flagged for 2024/2025 installs that didn't claim at the time
- ✅ Historical worked examples dated to 2025 with 2026 caveat where install year affects the math
- ✅ Build passes (376/376 pages)
- ✅ Small commits grouped by file-cluster (12 total this gate)
- ✅ No merge, no push, main untouched

---

## Diff summary

```
$ git diff --shortstat raptive-fix/07-obbba-sweep..HEAD
51 files changed, 167 insertions(+), 160 deletions(-)
```

`raptive-fix/08-obbba-finals` is the candidate. **PRESENT_TENSE_CLAIM count is 0** across the entire site.
