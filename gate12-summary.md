# Gate 12 (raptive-fix/12-tax-comprehensive) — summary

**Branch:** `raptive-fix/12-tax-comprehensive` off `raptive-fix/11-tax-final3`
**Build:** ✅ `npm run build` → **376 / 376 pages** clean
**Mode:** apply, commits grouped by cluster, NO merge, NO push.

---

## Top-line result

**🟢 0 YES suspects** (down from 48 in tax-suspects-final.txt). 3 BORDERLINE remain — all on dedicated 25C/25D historical-explainer pages with explicit page-level OBBBA-expired framing.

| | tax-suspects-final.txt (Gate 11) | tax-suspects-v2.txt (Gate 12) |
|---|---|---|
| YES | **48** | **0** ✅ |
| BORDERLINE | 1 | 3 (all on historical pages) |
| Affected files | 24 | 1 (historical, OK) |

---

## Gate 12 commits (11 cluster commits)

```
63d6fe9  fix(solar-priority-3): 3 worst "still available through 2032" claims
2aea44e  fix(battery-backup-home): 8 live 25D credit claims + worked-math
a251768  fix(solar-calculator-examples): 7 live ITC claims + recomputed payback table
84ad380  fix(solar-cost-by-state): 7 live ITC claims + recomputed worked examples + state-table caveat
bea27e1  fix(water-heaters-cluster): 9 live credit claims + recomputed worked examples
acfe4fe  fix(water-heater-stragglers): 2 missed water-heater claims
4d6b65d  fix(tankless-cluster): 6 live credit claims + recomputed payback scenarios
52c67de  fix(efficiency-ratings-seer): 7 worked-example -$600 credit deductions + 1 FAQ
7da6918  fix(heat-pumps-cluster): 4 live 25C+25D credit claims
2a67eef  fix(energy-costs-cluster): 3 live credit claims + recomputed worked math
1172f5b  fix(misc-cluster): 3 remaining live credit claims
```

```
$ git diff --shortstat raptive-fix/11-tax-final3..HEAD
23 files changed, 175 insertions(+), 163 deletions(-)
```

---

## Recomputed worked examples (old → new)

Every dollar in the recomputed math derives from values already on the page — no fabricated numbers.

### battery-backup/home-battery-backup-guide.mdx

| Scenario | Pre-OBBBA (with credit) | 2026 (no fed credit) |
|---|---|---|
| Scenario 1: Tesla Powerwall backup-only | $14,000 − $4,200 credit = **$9,800 net** | $14,000 net; $11,000–$14,000 with state/utility |
| Scenario 2: 8 kW solar + 13.5 kWh battery (CA NEM 3.0) | $30,000 − $9,000 = $21,000 net; $2,800/yr; **7.5-yr payback**; $49,000 25-yr | $30,000 (or $25,000–$30,000 with CA SGIP); $2,800/yr; **8.9–10.7-yr payback**; $40,000–$45,000 25-yr |
| Scenario 4: 12 kW solar + 3× Powerwall (off-grid) | $58,000–$72,000 − $17,400–$21,600 = $40,600–$50,400 net | $58,000–$72,000 net (no fed credit) |
| Tesla Powerwall FAQ | $12,500–$15,500 → $8,750–$10,850 after 30% credit | $12,500–$15,500 (no fed credit) |

### battery-backup/solar-panel-calculator.mdx

| Example | Pre-OBBBA After ITC | 2026 Cost (no fed credit) |
|---|---|---|
| Phoenix 6.56 kW | $11,480–$13,790 | $16,400–$19,700 |
| New York 8.82 kW | $18,550–$21,700 | $26,500–$31,000 gross; $19,900–$24,400 with NY 25% + NY-Sun |
| Denver 10.79 kW | $20,440–$24,080 | $29,200–$34,400 |
| Seattle 8.0 kW | $15,680–$19,040 | $22,400–$27,200 |

Payback table (8 cities, recomputed for 2026):

| City | Pre-OBBBA Payback | 2026 Payback | Pre-OBBBA 25-yr Savings | 2026 25-yr Savings |
|---|---|---|---|---|
| Phoenix, AZ | 7.2 yr | 10.3 yr | $33,000 | $27,250 |
| Los Angeles, CA | 7.0 yr | 10.0 yr | $39,600 | $33,000 |
| Denver, CO | 8.9 yr | 12.7 yr | $26,500 | $20,250 |
| Austin, TX | 8.7 yr | 12.4 yr | $24,500 | $18,900 |
| Charlotte, NC | 10.1 yr | 14.5 yr | $20,800 | $14,700 |
| New York, NY | 9.3 yr | 13.3 yr | $33,000 | $24,500 |
| Boston, MA | 9.1 yr | 13.0 yr | $31,800 | $24,000 |
| Seattle, WA | 15.3 yr | 21.8 yr | $10,700 | $3,500 |

### battery-backup/solar-panel-cost-by-state.mdx

| Worked example | Pre-OBBBA | 2026 |
|---|---|---|
| National Average (8.2 kW) | $24,190 − $7,257 (30%) = $16,933 net; 8.5-yr payback; $30K–$55K 25-yr | $24,190 net; ~12.1-yr payback; $20K–$40K 25-yr |
| NY callout (8 kW) | $25,200 − $7,560 − $5,000 NY − $1,600 NY-Sun = $11,040; 5.3-yr payback | $25,200 − $5,000 NY − $1,600 NY-Sun = $18,600; 8.9-yr payback |
| Example 1: Texas (7.5 kW) | $18,750 − $5,625 = $13,125; 8.8-yr payback | $18,750 net; 12.5-yr payback |
| Example 2: Massachusetts (8.5 kW + SMART) | $27,200 − $8,160 − $1,700 sales-tax exempt = $17,340; 4.7-yr payback | $27,200 − $1,700 = $25,500; 6.9-yr payback |
| Example 3: Idaho (8 kW) | $21,200 − $6,360 = $14,840; 11.8-yr payback | $21,200 net; 16.8-yr payback |
| Example 4: Vermont (9 kW + VT incentive) | $28,350 − $8,505 − $1,800 VT = $18,045; 9.5-yr payback | $28,350 − $1,800 VT = $26,550; 14.0-yr payback |

State tables (Tier 1/2/3, ~30 rows) preserved as pre-OBBBA reference + added warning callout explaining 2026 cost = the gross "8 kW System Cost" column.

### water-heaters/heat-pump-water-heater-guide.mdx

| Worked example | Pre-OBBBA | 2026 |
|---|---|---|
| Anderson Minneapolis (HPWH, $3,400 install, $400/yr savings) | $3,400 − $1,020 credit = $2,380; 5.9-yr payback | $3,400 net; 8.5-yr payback (no rebates); 3–6-yr with Xcel ~$400 + IRA HEAR |
| Oregon HPWH table — income-qualified | $3,600 − $1,080 − $1,750 HEAR − $500 PGE = **$270 net** | $3,600 − $0 − $1,750 HEAR − $500 PGE = **$1,350 net** |
| Oregon HPWH table — non-income-qualified | $3,600 − $1,080 − $500 PGE = $2,020 | $3,600 − $500 PGE = $3,100 |
| Comparison table (HPWH vs electric tank) | "After 30% Tax Credit" row = $1,750–$3,150 | Reframed as Pre-OBBBA ref + new IRA HEAR row at $750–$2,750 |

### water-heaters/water-heater-guide.mdx

| Worked example | Pre-OBBBA | 2026 |
|---|---|---|
| Patel Atlanta (HPWH, $3,400 install, $150/yr savings) | $3,400 − $1,020 credit = $2,380; ~16-yr payback | $3,400 net; ~22.7-yr payback; 19–22 yr with GA utility rebates ($200–$500) |

### tankless-water-heaters/tankless-water-heater-guide.mdx

| Worked example | Pre-OBBBA | 2026 |
|---|---|---|
| Houston (Rinnai RU160iN, $3,100 install) | $3,100 − $420 (30% of $1,400 unit) = $2,680; 7.2-yr payback | $3,100 net; ~8.3-yr payback |

### tankless-water-heaters/tankless-water-heater-cost.mdx

| Scenario | Pre-OBBBA | 2026 |
|---|---|---|
| Stacking strategy ($1,800 condensing gas) | $1,800 − $540 fed − $300 util − $200 state = **$760** | $1,800 − $0 − $300 util − $200 state = **$1,300** |
| Scenario 1: gas condensing, moderate | $3,500 − $525 = $2,975; 16.5-yr payback | $3,500 net; 19.4-yr payback |
| Scenario 2: gas condensing, cold | $4,200 − $540 = $3,660; 15.3-yr payback | $4,200 net; 17.5-yr payback |
| Scenario 3: electric, warm | $1,800 − $165 = $1,635; 8.2-yr payback | $1,800 net; 9.0-yr payback |
| Scenario 4: gas new construction | $1,200 − $525 = $675; 3.8-yr payback | $1,200 net; 6.7-yr payback |

### tankless-water-heaters/is-tankless-water-heater-worth-it.mdx

| Scenario | Pre-OBBBA | 2026 |
|---|---|---|
| New construction premium | $700–$1,400 → $500–$900 after credit; 3–6-yr payback | $700–$1,400 net; 4–9-yr payback; 3–7-yr range with state/utility rebates |

### energy-efficiency-ratings SEER cluster

| Example | Pre-OBBBA | 2026 |
|---|---|---|
| 14-3-seer2-vs-16-seer Dallas (3.5-ton) | $700 − $600 fed − $200 Oncor = -$100 (immediate payback) | $700 − $200 Oncor = $500 net; 25-yr payback at $20/yr |
| 14-3-seer2-vs-16-seer Chicago (3-ton) | $600 − $600 fed − $200 ComEd = -$200 (immediate) | $600 − $200 ComEd = $400 net; ~31-yr payback at $13/yr |
| 16-seer-vs-20 Tampa FL | $4,500 − $600 − $400 FPL = $3,500; 33-yr payback | $4,500 − $400 FPL = $4,100; 38.7-yr payback at $106/yr |
| 16-seer-vs-20 SoCal | $4,200 − $600 − $500 SCE = $3,100; 23.1-yr payback | $4,200 − $500 SCE = $3,700; 27.6-yr payback at $134/yr |
| 16-seer-vs-20 Phoenix | $5,500 − $600 − $300 APS = $4,600; 38.3-yr payback | $5,500 − $300 APS = $5,200; 43.3-yr payback at $120/yr |
| 16-seer-vs-20 Connecticut | $3,800 − $600 − $500 Eversource = $2,700; 26.7-yr payback | $3,800 − $500 Eversource = $3,300; 32.7-yr payback at $101/yr |

### heat-pumps/air-source-vs-ground-source-heat-pump.mdx

| Example | Pre-OBBBA | 2026 |
|---|---|---|
| Chen Boise air-source (Bosch IDS 2.0) | $8,400 − $2,000 (25C) = $6,400 net | $8,400 net (no fed); explicit 2025 framing |
| Chen Boise geothermal (ClimateMaster Tranquility) | $26,000 − $7,800 (25D 30%) = $18,200 net | $26,000 net (no fed); explicit 2025 framing |
| Chen upfront difference | $11,800 ($18,200 − $6,400) | $17,600 ($26,000 − $8,400); ~50-yr payback at $350/yr operating delta |

### energy-costs/electric-water-heating-cost-by-state.mdx

| Worked example | Pre-OBBBA | 2026 |
|---|---|---|
| Massachusetts couple (HPWH, $2,600 install, $678/yr) | $2,600 − $780 = $1,820 net; 2.7-yr payback; $6,316 12-yr savings | $2,600 net; 3.8-yr payback; $5,536 12-yr savings; 1.5–2.5 yr with Mass Save + IRA HEAR |

### energy-costs/electricity-cost-by-state.mdx

Solar Payback by State (6 cities, recomputed for 2026):

| State | Pre-OBBBA Payback | 2026 Payback |
|---|---|---|
| Hawaii | 3.0 yr | 4.3 yr |
| Connecticut | 5.1 yr | 7.3 yr |
| California | 4.6 yr | 6.6 yr |
| US Average | 8.1 yr | 11.6 yr |
| Texas | 7.9 yr | 11.3 yr |
| Idaho | 12.9 yr | 18.4 yr |

(Multiplier: ~1.43 — since removing a 30% credit increases principal by 1/0.70 = 1.43.)

### energy-costs/energy-costs-guide.mdx

| Scenario | Pre-OBBBA | 2026 |
|---|---|---|
| FAQ solar bill reduction ($15,000 system) | $15,000 − $4,500 = $10,500 effective; 6–9-yr payback | $15,000 net; 8.9–12.8-yr payback |

### generators/generator-vs-solar-battery-backup.mdx

| Example | Pre-OBBBA | 2026 |
|---|---|---|
| NC combo (16kW Generac + 6kW solar + 1× Powerwall) | $9,500 + $12,600 (after 25D ITC on $18,000) = $22,100 total | $9,500 + $18,000 = $27,500 total (no fed credit) |

---

## Hard-rule adherence

- ✅ **Build passes** (376 / 376 pages)
- ✅ **No fabricated numbers** — every dollar in the recomputed math derives from values already on the page (gross price / credit amount given on the page; 2026 = remove the credit line + recompute payback from gross / annual savings)
- ✅ **Cite-on-correct** — IRS OBBB FAQ + Congress.gov CRS IN12611 inline throughout (e.g., "OBBBA (PL 119-21, signed July 4, 2025)")
- ✅ **25C / 25D carryforward distinction** — preserved throughout: 25D allows carryforward of unused pre-2026 credit; 25C does not
- ✅ **Historical worked examples 2025-dated** — Chen Boise (HP), Anderson Minneapolis (HPWH), Patel Atlanta (HPWH), NC combo (solar+battery) all explicitly tagged "2025 install before OBBBA repeal" + recomputed for 2026
- ✅ **2026 active pathways** spelled out per credit type:
  - 25C HPWH → IRA HEAR (income-qualified, up to $1,750 for water heaters) + HOMES + state/utility
  - 25C heat pump → IRA HEAR (income-qualified, up to $8,000 for heat pumps) + HOMES + state/utility
  - 25C AC → state/utility (no IRA federal-rebate analogue for AC alone)
  - 25C biomass-stove → state/utility wood/pellet incentives where available
  - 25D solar/battery → state tax credits (NY 25%, SC 25%, HI 35%), SRECs, utility rebates, net metering; 25D carryforward allowed for pre-2026 installs
  - 25D geothermal → state/utility incentives + IRA HEAR/HOMES for the heat-pump component
- ✅ **Small commits grouped by cluster** (11 cluster commits this gate)
- ✅ **No merge, no push, main untouched**

---

## Remaining BORDERLINE (3, all on historical pages — OK)

All on `content/tax-credits-rebates/25c-tax-credit-explained.mdx` or `hvac-tax-credits-2026.mdx` — both pages are dedicated 25C historical explainers with explicit page-level OBBBA-expired framing at the top (line 31 of 25c-tax-credit-explained: "The Section 25C tax credit terminated for equipment placed in service after December 31, 2025 under the One Big Beautiful Bill Act").

1. `25c-tax-credit-explained.mdx:205` — "If you owe $1,800 in federal taxes and your calculated 25C credit is $2,960, you'll receive a $1,800 credit." (Worked example on the historical-explainer page; preceded by surrounding paragraphs that explicitly frame 25C as pre-OBBBA. Page-level frame rescues.)
2. `25c-tax-credit-explained.mdx:335` — "Section 25C only applies to your principal residence (primary home) or a second home that you use personally." (Reference text on the historical-explainer page. Page-level frame rescues.)
3. `hvac-tax-credits-2026.mdx:53` — "Equipment had to be installed and operational by December 31, **2025** to qualify for the 25C credit." (Explicit past-tense "had to be installed" + "December 31, 2025"; the script's `HIST_RE` missed the "by Dec 31, 2025" phrasing but reading the sentence confirms it's historical.)

None of these read as live 2026 federal-credit assertions when read in context with the page header.

---

## What's in `tax-suspects-v2.txt`

The full sentence-level re-verification output: 0 YES + 3 BORDERLINE. Same broadened method as Gate 11, with one refinement — sentences whose only credit mention is state-level (state tax credit / NY-Sun / SMART / SREC / SGIP / sales-tax exemption / property-tax exemption) are excluded since the user's focus is federal credits.

`raptive-fix/12-tax-comprehensive` is the candidate. **48 / 48 YES suspects from tax-suspects-final.txt are now closed. Build passes 376/376. No merge, no push.**
