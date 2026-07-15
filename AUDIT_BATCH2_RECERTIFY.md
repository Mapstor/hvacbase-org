# Audit Batch 2 — Retroactive Certification

Date: 2026-07-15
Scope: 13 Batch-2-edited files (bare-number sweep) + whole `content/` corpus (attribution re-grep).

Goal: Catch survivors that "ACCA: 0" grep discipline missed. Two lessons from Batch 2B:
1. Stripping the attribution ≠ stripping the number (75% survived in a table on the same page as a fixed "according to ACCA…75%" strip).
2. The 63-item named-source inventory at `AUDIT_INVENTORY/prose_stats.md` had coverage gaps — several fabrication-family attributions were never enumerated.

---

## Part 1 — Bare-Number Survivor Sweep (13 files)

Targets: `32%, 85%, 70%, 42%, 28%, 18%, 23%, 15-23%, 20-23%, 8-15%, 30-40%, 75%, 5-13%`

Rule: hit in a table cell, H2/H3, chart caption, or Takeaway = survivor.

### Confirmed survivors (fix scope)

| File | Line | Location type | Content | Reason |
|---|---|---|---|---|
| `hvac-maintenance-checklist.mdx` | 287 | H3 heading | `### Example 3: Duct Sealing Reduces Bills by 28%` | Bare 28% in heading, unsourced worked-example arithmetic ($280→$200/mo) |
| `hvac-maintenance-checklist.mdx` | 289 | body prose | *"summer cooling bills dropped from $280/month to $200/month — a 28% reduction"* | Same unsourced arithmetic underlying the H3 |
| `hvac-maintenance-checklist.mdx` | 291 | H3 heading | `### Example 4: Smart Thermostat + Maintenance = 32% Savings` | Bare 32% in heading, unsourced worked-example arithmetic ($2,100→$1,430) |
| `hvac-maintenance-checklist.mdx` | 293 | body prose | *"annual HVAC energy costs dropped from $2,100 to $1,430 — a 32% reduction worth $670/year. Total investment of $450 paid back in 8 months. Duct sealing added another $600 but paid back within a year"* | Same unsourced worked-example arithmetic |
| `best-smart-thermostats.mdx` | 49 | ComparisonTable row cell | `["1", "Ecobee Smart Thermostat Premium", "$249", "23% heating / 20% cooling", ...]` | Missing "Up to" qualifier — inconsistent with lines 50-60 which all use "Up to X% / Up to Y%". Column header is "Reported Savings (mfg)" so cell IS attributed via header, but missing the softening "Up to" per the rule "keep the number ONLY when framed as one manufacturer's own claim with 'up to' + named brand" |

### False-positive matches (verified legitimate, NOT survivors)

| File | Line(s) | Grep match | Why it's OK |
|---|---|---|---|
| `smart-thermostat-savings.mdx` | 134-139 | `65-75%`, `75-85%`, `85%+`, `60-70%` in climate-zone table | Heating share of HVAC cost by IECC zone — different claim class, not fabrication-family |
| `smart-thermostat-savings.mdx` | 50, 58, 59, 258, 287 | `23%`, `20-23%` | All correctly attributed to manufacturer field studies (`"up to 20%" or "up to 23%"`, `"Ecobee field studies (multi-zone)"`, `"Manufacturers…20-23%"`, `"Manufacturer-reported HVAC savings top out at roughly 20-23%"`, `"field-study figures ranging up to 20-23%"`) — Batch 2 reattributed language |
| `best-smart-thermostats.mdx` | 29, 50-60 | `23%`, `18-23%`, `20-23%` | All properly reattributed in Batch 2 (`"Ecobee's own field studies reporting up to…"`, ComparisonTable rows under "Reported Savings (mfg)" column header) |
| `best-smart-thermostats.mdx` | 121 | `18% over the first winter` | Specific Martinez-family real-world case-study data point, not a general rule claim |
| `nest-vs-ecobee-vs-honeywell.mdx` | 28, 40, 64, 289 | `23%`, `20-23%` | Batch 2 reattributed language (`"manufacturer-reported"`, `"Reported Savings (mfg)"` column, `"up to 20% vs 20-23%"`) |
| `best-thermostat-for-heat-pump.mdx` | 100 | `18-23%` | `"Ecobee reports up to 18-23%…"` — manufacturer-attributed |
| `programmable-vs-smart-thermostat.mdx` | 83 | `20-23%` | `"Manufacturers frequently report higher figures (up to 20-23%) from their own field studies — those are their own numbers, not the EPA-verified floor"` — explicitly negative construction |
| `energy-costs-guide.mdx` | 345 | `30-40%` | 2024 IECC building code efficiency claim — different claim class |
| `energy-costs-guide.mdx` | 367 | `60-70%` | Heating/cooling share in extreme climates — different claim class |
| `do-air-purifiers-really-work.mdx` | 51, 71, 73, 75 | `60-70%`, `50-70%`, `60-80%`, `70-85%` | Real named-study rows (Sublett 2011) and engineering measurement table by ACH/room-condition — kept as verified real |
| `do-air-purifiers-really-work.mdx` | 173 | `75-85% reduction` | Specific Portland-homeowner PurpleAir case-study arithmetic (12-18 vs 1-4 µg/m³ = calculable), not a general rule |

---

## Part 2 — Attribution Re-Grep (whole corpus)

Grep patterns:
- `according to (the )?(DOE|Department of Energy|EPA|ENERGY STAR|ACCA|ASHRAE|AHRI|NIST|Lawrence Berkeley|LBNL|NREL)`
- `(per|based on|data from|research from|studies (by|from)|study by|studies from) (the )?(DOE|EPA|…)`
- `(the |per )?(DOE|EPA|…) (estimates?|reports?|found|says?|shows?)`

Followed within ~120 chars by a % or $ figure.

### Coverage gap analysis

| Agency | prose_stats.md count | Re-grep verified new hits | Total actual |
|---|---|---|---|
| EPA | 22 | 3 | 25 |
| DOE | 9 | 8 | 17 |
| ENERGY STAR | 11 | 3 | 14 |
| AHRI | 12 | 0 | 12 |
| ACCA | 4 | 2 | 6 |
| ASHRAE | 4 | 1 | 5 |
| NIST | 1 | 2* | 3 |
| **TOTAL** | **63** | **19** | **82** |

*Both NIST "new" hits are the reattribution language I introduced in Batch 2 Group 3 (`15-2-seer2-vs-16-seer.mdx:176` + `seer2-rating-explained.mdx:220` — the correct NIST installation-fault reframing). Not fabrication, but not in the original inventory either.

**Inventory coverage: ~77%.** 19 attribution-with-figure hits (~23% of true total) were missed by the original prose_stats.md scan. Most missed hits fall into two categories: (a) legitimate real published figures with valid citations, (b) fabrication-family propagations that landed in files never touched by Batch 2.

### HITS-NEW (missed by original inventory) — grouped by agency

#### ACCA (2 new — includes 1 CRITICAL fabrication propagation)

**🚨 `content/energy-efficiency-ratings/good-seer-rating-for-ac.mdx:157`** — SAME fabrication as seer2-rating-explained.mdx:220 that we just reattributed to NIST in Group 3
> *"ACCA estimates that poor installation reduces efficiency by up to 30%. Key installation factors include proper refrigerant charge (within ±5% of manufacturer specs), correct airflow across the coil (typically 400 CFM per ton), proper line set sizing, and adequate clearance around the outdoor unit."*
> **Same "ACCA 30% install loss" fabrication we already ruled invalid. Propagation into a file not touched in Group 3.** Recommend: same NIST reattribution treatment.

`content/hvac-maintenance/hvac-ductwork-guide.mdx:120` — qualitative
> *"Improperly sized ductwork is one of the most common HVAC installation defects. According to ACCA, the majority of residential duct systems are not properly designed, leading to comfort complaints, noise issues, and reduced efficiency."*
> No % figure attached. Qualitative-only claim about duct system design quality. ACCA does publish Manual D (duct design) — this claim is likely defensible with the Manual D reference. Low priority.

#### EPA (3 new)

`content/energy-costs/energy-costs-guide.mdx:391` — FAQ answer
> *"The EPA estimates that sealing air leaks and adding insulation can save an average of 15% on heating and cooling costs (or 11% on total energy costs). In poorly insulated homes, savings can exceed 25%."*
> EPA Energy Star does publish this range (~15% typical, up to 20-30% in poorly-insulated homes) via their Home Sealing / Weatherization guidance. Likely real. Needs citation URL.

`content/mold-prevention/mold-prevention-guide.mdx:34` — two claims in one sentence
> *"The EPA estimates that mold affects roughly 50% of homes in the United States, and remediation costs range from $500 for a small patch to $30,000+ for whole-house infestations."*
> Two claims: (a) 50% homes affected by mold, (b) $500-$30,000 remediation range. The 50% figure is often cited but the specific "EPA estimates" attribution needs verification against EPA mold publications. Remediation cost range is defensible market data. Medium priority.

#### DOE (8 new — most likely legitimate)

`content/ac-sizing-selection/air-conditioner-btu-calculator.mdx:131`
> *"The Department of Energy estimates that heat gain through windows can account for 25–35% of residential cooling loads."*
> Widely-cited DOE figure. Likely real, needs citation URL.

`content/ac-sizing-selection/air-conditioner-btu-calculator.mdx:315`
> *"The DOE estimates that oversized systems use 10–20% more energy than properly sized ones."*
> DOE Energy Saver "Central Air Conditioning" page discusses oversizing penalty. Likely real, needs citation.

`content/ac-sizing-selection/what-size-tankless-water-heater.mdx:254`
> *"Tankless units save 8–34% on water heating energy costs compared to standard tank heaters, according to the DOE."*
> Real DOE figure — well-documented on DOE Energy Saver "Tankless or Demand-Type Water Heaters" page. High confidence. Needs citation URL.

`content/dehumidifiers/ideal-indoor-humidity-level.mdx:283`
> DOE 10-20% humidity management savings. Needs verification against specific DOE publication.

`content/ductwork/duct-leakage-testing.mdx:38`
> *"The U.S. Department of Energy estimates that duct losses in unconditioned spaces account for 25–40% of heating and cooling energy in a typical home."*
> Slightly different range (25-40%) from the ENERGY STAR 20-30% duct-loss figure we're citing. DOE and ENERGY STAR often publish overlapping-but-different duct loss ranges — DOE typically covers broader scenarios (unconditioned spaces). Likely both real. Needs citation URL.

`content/electric-fireplaces/electric-fireplace-cost-to-run.mdx:116` — DOE 3% per-degree
`content/furnaces-heating/thermostat-temperature-winter.mdx:57` — DOE 1-3% per-degree setback
`content/furnaces-heating/furnace-guide.mdx:284` — DOE 10% annual heating savings

All are widely-cited DOE Energy Saver figures. Likely real. Needs citation URLs.

#### ENERGY STAR (3 new — all duct-loss propagations)

`content/energy-efficiency-ratings/good-seer-rating-for-ac.mdx:149`
> *"Leaky ducts waste 20–30% of conditioned air, according to ENERGY STAR."*
> SAME figure as our KEEP citation in hvac-maintenance-checklist:105. Verified real. Needs same citation link.

`content/ductwork/duct-leakage-testing.mdx:38`
> *"ENERGY STAR reports that sealing and insulating ducts can save homeowners up to 20% on heating and cooling costs, or roughly $200–$500 annually…"*
> ENERGY STAR does publish this savings figure. Needs citation URL.

`content/hvac-maintenance/air-duct-cleaning-worth-it.mdx:100`
> *"ENERGY STAR reports that the average home loses 20–30% of conditioned air through duct leaks…"*
> SAME as our KEEP citation. Needs same citation link.

#### ASHRAE (1 new)

`content/energy-efficiency-ratings/seer-vs-seer2.mdx:61`
> *"studies by ACCA, ASHRAE, and various utilities consistently found that typical residential duct systems create 0.3–0.7 in. w.c. static pressure…"*
> Real technical parameter. ACCA Manual D and ASHRAE 62.2 do discuss residential duct static pressure. Likely real, but the specific "ACCA, ASHRAE, and various utilities consistently found" citation string is loose. Needs tightening or citation.

#### NIST (2 hits — my Group 3 reattribution language)

`content/energy-efficiency-ratings/15-2-seer2-vs-16-seer.mdx:176` + `content/energy-efficiency-ratings/seer2-rating-explained.mdx:220`
> *"NIST field research on residential HVAC installations has found that combined installation faults — improper charge, poor airflow, and oversizing — can raise heating and cooling energy use by roughly 30% compared to correctly installed systems."*
> Both are the reattribution I introduced in Batch 2 Group 3. The claim reflects Domanski/Payne NIST work. Verified real per user's Group 3 ruling. Not fabrication — legitimate use of NIST research. Missing from prose_stats.md because the file wasn't scanned after Group 3 rewrites.

---

## Actionable items

**Fix scope for this pass (5 sites in 2 files):**
1. hvac-maintenance-checklist.mdx Example 3 heading + body — strip 28% + $280→$200 arithmetic
2. hvac-maintenance-checklist.mdx Example 4 heading + body — strip 32% + $2,100→$1,430 arithmetic + $450 payback + $600 duct sealing
3. best-smart-thermostats.mdx line 49 — add "Up to" qualifier to Ecobee Premium row for consistency

**Awaiting your rulings on the 17 non-Batch-2-file new attribution hits** (16 external files + 1 propagation of the fabricated ACCA 30% install-loss claim). The critical one is `good-seer-rating-for-ac.mdx:157` — same fabrication we just fixed in seer2-rating-explained.mdx, propagated to another file.

**Inventory implication:** the 63-item prose_stats.md census was ~77% complete. Recommend a full re-run of `AUDIT_INVENTORY/prose_stats.md` after the attribution rulings land, since roughly 23% of true attribution-with-figure hits weren't captured.
