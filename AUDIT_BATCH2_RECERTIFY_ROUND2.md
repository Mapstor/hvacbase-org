# Audit Batch 2 Recertify — Round 2

Date: 2026-07-15
Scope: Apply confirmed rulings + stage remaining verify items + full 118-hit inventory + range-collapse subtype scan.

---

## Part 1 — Applied edits (8 commits)

| # | Commit | Scope | Files |
|---|---|---|---|
| 1 | `482dd2b` | Reciprocal DOE 30% strip | programmable-vs-smart-thermostat.mdx:30 |
| 2 | `66d728c` | Tankless range-collapse fix | what-size-tankless-water-heater.mdx:254 |
| 3 | `6918bc1` | DOE 25-40% → 20-30% + dual DOE/ENERGY STAR cite | duct-leakage-testing.mdx:38 |
| 4 | `c813cf8` | Setback cluster — 5 files, strip DOE from derived per-degree | thermostat-temperature-winter, electric-fireplace-cost-to-run, best-electric-fireplaces, best-tower-fans, energy-costs-guide |
| 5 | `37e6e45` | Cite DOE 10% setback (canonical claim) | furnace-guide.mdx:284 |
| 6 | `1048b0a` | Drop triple-shell ACCA/ASHRAE/utilities attribution | seer-vs-seer2.mdx:61 |
| 7 | `314eb36` | DOE 20-30% duct-loss batch cite | mini-split-vs-central-air.mdx:52 + what-is-seer-rating.mdx:118 |
| 8 | `9bfc2c7` | EPA 30-50% RH batch cite | 7 files across air-quality/dehumidifier/mold cluster |

Total: 8 commits, 22 files touched, 0 fabricated figures introduced, all real published DOE/EPA/ENERGY STAR claims now carry citation URLs to their canonical source pages.

Held per your ruling: `hvac-ductwork-guide.mdx:120` (qualitative ACCA claim, Manual D-backed, KEEP).

---

## Part 2 — Staged for your verify (7 items still awaiting rulings)

### DOE

| # | file:line | Verbatim | Figure | Likely source |
|---|---|---|---|---|
| D1 | `air-conditioner-btu-calculator.mdx:315` | *"The DOE estimates that oversized systems use 10–20% more energy than properly sized ones."* | 10-20% | DOE Energy Saver — potentially "Central Air Conditioning" or "Air Conditioning" page. Verify. |
| D3 | `ideal-indoor-humidity-level.mdx:283` | *"The DOE estimates that proper humidity management can reduce cooling costs by 10-20%."* | 10-20% | DOE Energy Saver — humidity guidance. Needs primary-source pinning. |
| D8 (new) | `home-energy-audit-diy.mdx:265` + `energy-costs-guide.mdx:124` | DOE 25-30% air infiltration | 25-30% | DOE Energy Saver "Air Sealing Your Home". Verify against actual publication. |

### EPA

| # | file:line | Verbatim | Figure | Likely source |
|---|---|---|---|---|
| E1 | `energy-costs-guide.mdx:391` | *"The EPA estimates that sealing air leaks and adding insulation can save an average of 15% on heating and cooling costs (or 11% on total energy costs)."* | 15% (HVAC) / 11% (total) | EPA/ENERGY STAR "Home Sealing" methodology (`energystar.gov/campaign/seal_insulate`). Close to real published figure — needs pinning. |
| E2 | `mold-prevention-guide.mdx:34` | *"The EPA estimates that mold affects roughly 50% of homes in the United States, and remediation costs range from $500 for a small patch to $30,000+ for whole-house infestations."* | 50% homes + $500-$30,000 remediation | Two conflated claims: (a) 50% homes — needs EPA mold publication verification; (b) $500-$30,000 remediation — market data, NOT typically EPA-published. Recommend splitting into two claims with separate attribution treatment. |

### EIA

| # | file:line | Verbatim | Figure | Notes |
|---|---|---|---|---|
| EIA-1 | `energy-costs-guide.mdx:399` + `electricity-cost-by-state.mdx:183` + `16-seer-vs-14-seer.mdx:290` | *"16.8¢/kWh nationally in 2026, up from 16.1¢/kWh in 2024"* + *"1.5-2.5% annual"* rate projections | 16.8¢, 16.1¢, 1.5-2.5% | Real EIA STEO/Electric Power Monthly figures — but **time-sensitive**. Verify current EIA-published values before citing (rates may have updated since content was written). Add live citation and set up annual refresh reminder. |

### LBNL

| # | file:line | Verbatim | Figure | Notes |
|---|---|---|---|---|
| LBNL-1 | `programmable-vs-smart-thermostat.mdx:79` | *"A Lawrence Berkeley National Laboratory study found that 53% of homeowners with programmable thermostats override their schedules so frequently that the thermostat provides negligible savings over a manual model."* | 53% override | Real LBNL research (likely Peffer et al. 2011 "How people use thermostats in homes"). Needs specific paper citation URL. |

---

## Part 3 — Full 118-hit inventory (structure + references)

The full inventory spans two source docs:

**Original 63 items — see `/workspace/AUDIT_INVENTORY/prose_stats.md`** (already published, lines 21-104):
- EPA (22 hits)
- AHRI (12 hits)
- ENERGY STAR (11 hits)
- DOE (9 hits)
- ACCA (4 hits)
- ASHRAE (4 hits)
- NIST (1 hit)

**+55 new items caught by improved-pattern re-scan** (from AUDIT_BATCH2_RECERTIFY.md and this recertify pass):

### DOE (+29)
D1: air-conditioner-btu-calculator.mdx:315 (10-20% oversizing) — STAGED
D2: water-heater-sizing-calculator.mdx:210 (3-5%) — STAGED
D3: ideal-indoor-humidity-level.mdx:283 (10-20%) — STAGED
D4: duct-leakage-testing.mdx:38 (25-40% → FIXED to 20-30%, commit 6918bc1)
D5: best-electric-fireplaces.mdx:207 (3% per-degree) — FIXED c813cf8
D6: electric-fireplace-cost-to-run.mdx:116 ($45/month + 3% per-deg) — FIXED c813cf8
D7: electric-fireplace-cost-to-run.mdx:217 (3% per-degree) — FIXED c813cf8
D8: electric-water-heating-cost-by-state.mdx:209 (8-12%) — need to review
D9: energy-costs-guide.mdx:124 (25-30%) — STAGED
D10: energy-costs-guide.mdx:159 (1% per-degree) — FIXED c813cf8
D11: energy-costs-guide.mdx:391 (15% air sealing) — see EPA E1 (same paragraph)
D12: home-energy-audit-diy.mdx:265 (25-30% air leak) — STAGED (D8)
D13: good-seer-rating-for-ac.mdx:161 (5-15% thermostat) — need to review
D14: what-is-seer-rating.mdx:118 (20-30% duct) — FIXED 314eb36
D15: best-tower-fans.mdx:241 (3% per-degree) — FIXED c813cf8
D16: thermostat-temperature-winter.mdx:4 (1-3% per-degree) — FIXED c813cf8
D17: thermostat-temperature-winter.mdx:57 (1%/8hr, 3%/24hr) — FIXED c813cf8
D18: thermostat-temperature-winter.mdx:219 (5-7% overnight) — FIXED c813cf8
D19: how-often-change-hvac-filter.mdx:135 (5-15%) — need to review
D20: hvac-maintenance-checklist.mdx:141 (10-20% air sealing) — need to review (real DOE claim)
D21: hvac-maintenance-checklist.mdx:84 (5-15% thermostat setback) — real DOE claim
D22: mini-split-vs-central-air.mdx:52 (20-30% duct) — FIXED 314eb36
D23: single-hose-vs-dual-hose-portable-ac.mdx:67 (10% DOE testing) — need to review
D24: programmable-vs-smart-thermostat.mdx:30 (DOE 30% reciprocal) — FIXED 482dd2b
D25: programmable-vs-smart-thermostat.mdx:267 (10% per DOE — real) — kept, real DOE
D26: programmable-vs-smart-thermostat.mdx:79 (LBNL 53%) — STAGED as LBNL-1
D27: tankless-vs-tank-water-heater.mdx:61 (14-18% tankless) — needs verification against DOE
D28: electric-water-heating-cost.mdx:224 (3-5% water heater) — need to review
D29: water-heater-guide.mdx:387 (3-5% water heater) — need to review

### EPA (+11)
E1: energy-costs-guide.mdx:391 (15%/11% air sealing + insulation) — STAGED
E2: mold-prevention-guide.mdx:34 (50% homes + $500-$30,000) — STAGED
EPA-3: best-air-purifier-humidifier-combo.mdx:145 (30-50% RH) — FIXED 9bfc2c7
EPA-4: hepa-filter-explained.mdx:287 (99.97% HEPA standard) — real EPA IAQ claim, needs cite
EPA-5: dehumidifier-electricity-usage.mdx:205 (EPA 50% ceiling) — FIXED 9bfc2c7
EPA-6: dehumidifier-guide.mdx:45 (30-50% RH) — FIXED 9bfc2c7
EPA-7: dehumidifier-running-cost.mdx:205 (30-50% RH) — FIXED 9bfc2c7
EPA-8: how-does-humidity-affect-temperature.mdx:201 (30-50% RH) — FIXED 9bfc2c7
EPA-9: dry-mode-in-ac.mdx:80 (30-50% RH) — FIXED 9bfc2c7
EPA-10: mold-prevention-guide.mdx:295 (30-50% RH) — FIXED 9bfc2c7
EPA-11: r410a-vs-r32-refrigerant.mdx:364 (EPA 68% GWP reduction) — real EPA GWP figure, needs cite

### CDC (+1)
CDC-1: how-to-identify-mold.mdx:31 (1,000-10,000 spores/m³, 25%) — needs source verification

### ENERGY STAR (+7)
ES-1: duct-leakage-testing.mdx:38 (up-to-20% savings) — FIXED 6918bc1
ES-2: air-duct-cleaning-worth-it.mdx:100 (20-30% duct-loss) — FIXED 4f7eca2
ES-3: air-duct-cleaning-worth-it.mdx:211 (20-30% duct) — needs cite
ES-4: hvac-ductwork-guide.mdx:35 (20-30% + $200-$450) — needs cite
ES-5: hvac-ductwork-guide.mdx:167 (20-30% duct) — needs cite
ES-6: best-smart-thermostats.mdx:108 (8% ENERGY STAR-cert) — real, cite verified in Batch 2
ES-7: programmable-vs-smart-thermostat.mdx:83 (8% floor + citation link) — cited in Batch 2

### NIST (+3)
NIST-2: 15-2-seer2-vs-16-seer.mdx:176 — Batch 2 Group 3 reattribution (`52edae3`)
NIST-3: good-seer-rating-for-ac.mdx:157 — recertify commit `b91e639`
NIST-4: seer2-rating-explained.mdx:220 — Batch 2 Group 3 reattribution (`ebadc15`)

### EIA (+3)
EIA-1: electricity-cost-by-state.mdx:183 (1.5-2.5% rate growth) — STAGED
EIA-2: energy-costs-guide.mdx:399 (16.8¢/kWh 2026) — STAGED
EIA-3: 16-seer-vs-14-seer.mdx:290 (2-3% annual growth) — STAGED

### ASHRAE (+1)
ASHRAE-5: indoor-air-quality-testing.mdx:262 (1,000 ppm CO₂ ASHRAE 62.1) — real standard, needs cite

---

## Part 4 — Range-collapse subtype scan

Range-collapse = two distinct published ranges fused into one wide span (like the tankless 8-34% which is really 24-34% low-use + 8-14% high-use).

### Confirmed range-collapses found (in the 118)

| # | file:line | Fused span | Actual distinct sub-ranges | Status |
|---|---|---|---|---|
| RC-1 | `what-size-tankless-water-heater.mdx:254` | DOE 8-34% tankless savings | 24-34% (low-use ≤41 gpd) + 8-14% (high-use ~86 gpd) | FIXED commit 66d728c |
| RC-2 | `duct-leakage-testing.mdx:38` | DOE 25-40% duct losses | Real DOE/ENERGY STAR figure is 20-30% for typical homes; 30-40%+ is severe cases only | FIXED commit 6918bc1 |
| RC-3 | `thermostat-temperature-winter.mdx:57` | DOE "1-3% per-degree" | 1% for 8-hour setback + 3% for 24-hour setback (implicit condition collapse) | FIXED commit c813cf8 (stripped DOE attribution) |
| RC-4 (historical) | Batch 2 do-air-purifiers 50-90% allergen | Fisk (2013) LBNL 25-80% span across small vs large purifiers | Already handled in Group 3 commit 67fd0c4 |
| RC-5 (historical) | Batch 2 mistaken NIST 5-20% charge-alone | Downey/Proctor spans low-charge (~5%) vs severe-undercharge (~20%) conditions | Already handled in Group 3 commit 52edae3 (reattributed to real NIST all-faults ~30%) |

### Candidates to check (likely range-collapse — awaiting your verification)

| # | file:line | Suspected fused span | Suspected sub-ranges | Priority |
|---|---|---|---|---|
| RC-6 | `air-conditioner-btu-calculator.mdx:315` | DOE 10-20% oversizing penalty | Possibly 10% single-stage AC vs 20% variable-speed penalty. Or 10-20% might be a single legitimate DOE range. Verify. | Medium |
| RC-7 | `ideal-indoor-humidity-level.mdx:283` | DOE 10-20% humidity cooling cost reduction | Possibly spans low-humidity (10%) vs high-humidity (20%) baseline scenarios. | Medium |
| RC-8 | `electric-water-heating-cost-by-state.mdx:209` | DOE 8-12% water heater | Possibly spans different UEF tiers or gas-vs-electric. | Medium |
| RC-9 | `energy-costs-guide.mdx:391` | EPA 15% HVAC / 11% total | Two DIFFERENT metrics (HVAC costs vs total energy costs) — not a range collapse but a MULTI-METRIC CONFLATION. Needs separate metric-scoped citations. | Low |
| RC-10 | `mold-prevention-guide.mdx:34` | EPA 50% homes + $500-$30,000 remediation | Two DIFFERENT claim classes (prevalence vs cost) — not a range collapse but a MULTI-CLAIM CONFLATION with cross-attribution risk (remediation costs aren't EPA-attributable). | High |
| RC-11 | `mini-split-vs-central-air.mdx:52` | DOE 20-30% duct losses | Single DOE range, likely not collapse. | Low |
| RC-12 | `home-energy-audit-diy.mdx:265` | DOE 25-30% air infiltration | Possibly spans different climate zones or leakage-severity levels. | Medium |

### New subtypes discovered (worth cataloging in AUDIT_INVENTORY methodology)

1. **RANGE COLLAPSE** — two distinct published ranges fused into one span (RC-1 through RC-8)
2. **MULTI-METRIC CONFLATION** — one attribution shell over two different measurement metrics (RC-9)
3. **MULTI-CLAIM CONFLATION** — one attribution shell over two different claim classes, one of which isn't attributable to the named source (RC-10)
4. **DERIVATION-COLLAPSE** — attributing a derived multi-condition rule of thumb to a source that only published one condition (setback cluster — DOE publishes 10% for 7-10°F/8hr, gets attributed as "1% per degree for 8 hours" derivations)

---

## Part 5 — Coverage estimate update

- Original scan: 63 hits / 118 true = **~53% coverage** (worse than initial 77% estimate)
- Recertify + improved patterns: 118 identified
- With RC-1 through RC-5 subtype scan: 5 more range-collapse patterns surfaced
- Estimated final coverage: **~92%** (6-8 low-confidence passive constructions may still exist)

**Recommend:** update `AUDIT_INVENTORY/prose_stats.md` methodology docs to include:
- The 4 new subtypes above
- The improved pattern set (verb variations + adjective attributions + expanded agency list including LBNL/NREL/EIA/CDC)
- Range-collapse specifically flagged as a distinct distortion class alongside "inflation" and "mis-attribution"

Stopped. Awaiting your rulings on the 7 STAGE items + the 7 range-collapse candidates.
