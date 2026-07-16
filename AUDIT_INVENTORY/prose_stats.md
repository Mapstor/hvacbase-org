# Body-Prose Fabricated-Stat Sweep [HIGHEST PRIORITY]

Scope: `content/**/*.mdx` bodies, with FAQ `<FAQ items={[...]}>` blocks stripped (Batch C.2 covered those).

## Per-class totals

| Class | Hits | Files affected |
|---|---|---|
| named-source-attributed (specific figure + specific source) | 63 | 43 |
| success-rate: N% pattern | 12 | 1 |
| sum-to-100 table column | 9 | 9 |
| descending-heading integer sequences (>=4 hits, monotonically ≤) | 4 | 4 |
| **Bare N% in body prose (all)** | 5250 | 329 |

### What each class means for triage

- **named-source-attributed**: Highest severity. A named regulator/standards body is cited alongside a specific figure. If the figure isn't in a primary source, this is a fabrication under Google's spam policy (misinformation) AND under the site's own 'verified or omitted' rule. Every hit needs Marko-side verification.
- **success-rate**: The `Success Rate: N%` pattern in `/ac-troubleshooting-guide` was verified fabricated. Any other article using it inherits the same problem.
- **sum-to-100**: A table column that sums exactly to 100% is a constructed distribution (probability weights, 'accounts for X% of ...'). Legitimate real-world data rarely sums to exact 100% without a citation.
- **desc-heads**: 4+ headings with monotonically descending % values. Classic 'success rate ranked list' shape from the pre-compliance content phase.
- **bare N%**: In-prose percentage claims with no adjacent citation. Very common — 5,250 hits across 329 files. Cannot triage individually; use as a scope-scale signal.

## Named-source-attributed hits — full list (63)

Grouped by named source. Each row includes file, line, verbatim excerpt (up to 220 chars), figure. Marko needs to verify each figure against primary-source documentation.

### EPA (22 hits)

- `air-quality/do-air-purifiers-really-work.mdx:4` | figure=`50` | *studies, EPA data, and peer-reviewed field studies show HEPA purifiers reduce allergens 50*
- `dehumidifiers/ideal-indoor-humidity-level.mdx:32` | figure=`55` | *according to the EPA and ASHRAE Standard 55*
- `electric-fireplaces/best-pellet-stoves.mdx:275` | figure=`500` | *states offer rebates for EPA-certified wood and pellet stoves — Maine, Vermont, New Hampshire, and Maryland have historically offered $500*
- `furnaces-heating/gas-vs-electric-heating-cost.mdx:233` | figure=`2024` | *Based on EPA eGRID 2024*
- `heat-pumps/best-cold-climate-heat-pumps.mdx:179` | figure=`27` | *states (EPA amended final rule, effective Jul 27*
- `hvac-brands/best-central-ac-brands.mdx:261` | figure=`454` | *per the EPA Technology Transitions Rule; new equipment now ships with R-454*
- `hvac-brands/best-central-ac-brands.mdx:261` | figure=`27` | *states under the EPA's amended final rule (effective July 27*
- `indoor-air-quality/indoor-air-quality-guide.mdx:32` | figure=`90%` | *according to the EPA — and Americans spend roughly 90%*
- `mini-split-air-conditioners/best-diy-mini-splits.mdx:107` | figure=`27` | *states (EPA amended final rule, effective Jul 27*
- `mini-split-air-conditioners/best-mini-split-ac-units.mdx:49` | figure=`27` | *states (per the EPA's amended final rule effective July 27*
- `mini-split-air-conditioners/best-mini-split-ac-units.mdx:125` | figure=`2025 ` | *from pre-2025 inventory in most states (per the EPA amended final rule, effective July 27*
- `mini-split-air-conditioners/mini-split-brands-ranked.mdx:50` | figure=`27` | *states (per the EPA's amended final rule effective July 27*
- `mini-split-air-conditioners/mini-split-brands-ranked.mdx:111` | figure=`2025 ` | *from pre-2025 inventory in most states (per the EPA amended final rule, effective July 27*
- `mini-split-air-conditioners/mrcool-3rd-gen-vs-4th-gen.mdx:31` | figure=`27` | *states (EPA amended final rule, effective Jul 27*
- `mini-split-air-conditioners/mrcool-3rd-gen-vs-4th-gen.mdx:89` | figure=`27` | *states (EPA amended final rule, effective Jul 27*
- `mini-split-air-conditioners/mrcool-diy-mini-split-review.mdx:33` | figure=`27` | *states (EPA amended final rule, effective Jul 27*
- `refrigerants/hvac-refrigerant-phase-out.mdx:35` | figure=`27` | *per the EPA's amended final rule, effective July 27*
- `refrigerants/hvac-refrigerant-phase-out.mdx:138` | figure=`27` | *per the EPA amended final rule effective July 27*
- `refrigerants/hvac-refrigerant-phase-out.mdx:315` | figure=`2026 ` | *states — still legal to install in 2026 (per the EPA's amended final rule effective July 27*
- `refrigerants/refrigerant-types-explained.mdx:114` | figure=`27` | *states (per the EPA's amended final rule effective July 27*
- `smart-thermostats/best-smart-thermostats.mdx:68` | figure=`23%` | *studies, validated by the EPA, show **23%*
- `smart-thermostats/smart-thermostat-savings.mdx:31` | figure=`6` | *from EPA-verified field studies submitted by manufacturers for ENERGY STAR certification, not marketing estimates — and they translate to a **payback period of 6*

### AHRI (12 hits)

- `ac-sizing-selection/mini-split-sizing-calculator.mdx:80` | figure=`22` | *perate down to −22°F depending on the unit: Daikin Aurora to −13°F (AHRI-certified), Fujitsu XLTH to −15*
- `ac-sizing-selection/mini-split-sizing-calculator.mdx:284` | figure=`22` | *perate down to −22°F depending on the unit: Daikin Aurora -13°F (AHRI-certified), Fujitsu XLTH -15*
- `hvac-noise/hvac-noise-levels-explained.mdx:254` | figure=`270` | *according to AHRI Standard 270*
- `mini-split-air-conditioners/best-mini-split-ac-units.mdx:138` | figure=`24` | *figure belongs to the separate C&H Hyper Heat / HPR line (manufacturer-rated, not AHRI-tested), which runs 24*
- `mini-split-air-conditioners/mini-split-air-conditioners.mdx:47` | figure=`13` | *from Daikin (Aurora, -13°F, AHRI-certified) and Fujitsu (XLTH, -15*
- `mini-split-air-conditioners/mini-split-brands-ranked.mdx:97` | figure=`209832204` | *figure | **AHRI Certified Ref# 209832204*
- `mini-split-air-conditioners/mini-split-in-cold-climates.mdx:13` | figure=`13` | *perate down to -13°F to -22°F depending on model** — Daikin Aurora (-13°F, AHRI-certified) and Fujitsu XLTH (-15*
- `mini-split-air-conditioners/mini-split-in-cold-climates.mdx:13` | figure=`22` | *per Fujitsu General spec sheet) are AHRI- or manufacturer-verified; deeper -22*
- `refrigerants/hvac-refrigerant-phase-out.mdx:344` | figure=`700` | *from decommissioned systems, purified to AHRI 700*
- `refrigerants/hvac-refrigerant-phase-out.mdx:444` | figure=`700` | *from decommissioned systems and purify it to AHRI 700*
- `refrigerants/r410a-vs-r32-refrigerant.mdx:107` | figure=`32 ` | *show R-32 systems achieving 3-5% higher COP compared to R-410A systems at AHRI standard conditions (95*
- `refrigerants/refrigerant-types-explained.mdx:88` | figure=`700` | *from decommissioned systems, purify it to AHRI Standard 700*

### ENERGY STAR (11 hits)

- `ac-sizing-selection/what-size-tankless-water-heater.mdx:227` | figure=`0.95` | *per year** for qualifying ENERGY STAR water heaters, including heat pump water heaters and high-efficiency gas tankless units with UEF ≥ 0.95*
- `energy-efficiency-ratings/is-higher-seer-worth-it.mdx:32` | figure=`14.3` | *from baseline to the ENERGY STAR threshold (roughly 14.3*
- `energy-efficiency-ratings/seer2-rating-explained.mdx:217` | figure=`2018 ` | *figure is **SEER** (the legacy 2018 metric, when XC25 first earned ENERGY STAR placement) or **SEER2** (the 2023*
- `furnaces-heating/furnace-vs-heat-pump.mdx:287` | figure=`1` | *per year for qualifying heat pumps meeting ENERGY STAR Most Efficient / CEE Tier 1*
- `hvac-brands/best-central-ac-brands.mdx:185` | figure=`2018 ` | *figure is **SEER** (the legacy 2018 metric, when the XC25 first earned ENERGY STAR placement) or **SEER2** (the 2023*
- `hvac-maintenance/hvac-maintenance-checklist.mdx:105` | figure=`20` | *According to ENERGY STAR, the average home loses 20*
- `tax-credits-rebates/energy-star-tax-credits.mdx:4` | figure=`2026` | *state rebates, how ENERGY STAR certification affects eligibility in 2026*
- `tax-credits-rebates/energy-star-tax-credits.mdx:68` | figure=`2026` | *shows ENERGY STAR certification thresholds in effect for 2026*
- `water-heaters/heat-pump-water-heater-guide.mdx:213` | figure=`2.00` | *per year, for qualifying HPWHs meeting ENERGY STAR UEF ≥ 2.00*
- `water-heaters/heat-pump-water-heater-guide.mdx:332` | figure=`2.00` | *per year, for ENERGY STAR-certified HPWHs with UEF ≥ 2.00*
- `water-heaters/water-heater-guide.mdx:320` | figure=`119` | *per year for qualifying ENERGY STAR heat pump water heaters expired under the OBBBA (PL 119*

### DOE (9 hits)

- `ac-sizing-selection/air-conditioner-btu-calculator.mdx:62` | figure=`20` | *from ENERGY STAR and the DOE is simple: **20*
- `ac-sizing-selection/furnace-sizing-calculator.mdx:207` | figure=`95%` | *states (DOE North region) | 95%*
- `ac-sizing-selection/furnace-sizing-calculator.mdx:208` | figure=`80%` | *states (DOE South region) | 80%*
- `air-conditioners/window-air-conditioners.mdx:53` | figure=`20` | *recommendation from the DOE and ENERGY STAR is 20*
- `energy-efficiency-ratings/16-seer-vs-14-seer.mdx:255` | figure=`14.0` | *states (DOE North region):** Minimum 14.0*
- `energy-efficiency-ratings/16-seer-vs-14-seer.mdx:256` | figure=`15.0` | *states (DOE South/Southwest):** Minimum 15.0*
- `portable-air-conditioners/best-portable-air-conditioners.mdx:294` | figure=`11.2` | *Per DOE BTU of cooling, the Midea delivers 11.2*
- `portable-air-conditioners/cheapest-portable-air-conditioners.mdx:107` | figure=`6,000 ` | *from 6,000 to 8,000 DOE BTU extends room coverage from 200*
- `portable-air-conditioners/portable-ac-vs-window-ac.mdx:171` | figure=`10,000 ` | *shows same-BTU rated units (10,000 DOE BTU) cooling an identical 300*

### ACCA (4 hits)

- `air-conditioners/ac-not-cooling.mdx:56` | figure=`32%` | *According to ACCA data, this accounts for 32%*
- `air-conditioners/ac-troubleshooting-guide.mdx:31` | figure=`85%` | *Based on data from the Air Conditioning Contractors of America (ACCA), the problems covered here account for 85%*
- `energy-efficiency-ratings/seer-vs-seer2.mdx:61` | figure=`0.3` | *studies by ACCA, ASHRAE, and various utilities consistently found that typical residential duct systems create 0.3*
- `energy-efficiency-ratings/seer2-rating-explained.mdx:220` | figure=`30%` | *According to ACCA (Air Conditioning Contractors of America), poor installation can reduce a system's actual efficiency by 30%*

### ASHRAE (4 hits)

- `air-quality/air-changes-per-hour-calculator.mdx:85` | figure=`15` | *perating room", "15", "20–25", "ASHRAE 170*
- `indoor-air-quality-testing.mdx:30` | figure=`62.1` | *based on ASHRAE 62.1*
- `indoor-air-quality-testing.mdx:190` | figure=`62.2` | *per ASHRAE 62.2*
- `indoor-air-quality/whole-house-ventilation-systems.mdx:277` | figure=`62.2` | *calculate your CFM requirement using ASHRAE 62.2*

### NIST (1 hits)

- `energy-efficiency-ratings/15-2-seer2-vs-16-seer.mdx:176` | figure=`5` | *study by NIST found that improper refrigerant charge alone can reduce efficiency by 5*

## Success-rate pattern (12 hits)

- `air-conditioners/ac-not-cooling.mdx:94` | *## Fix #1: Replace Dirty Air Filter (Success Rate: 42%)*
- `air-conditioners/ac-not-cooling.mdx:140` | *## Fix #2: Clean Outdoor Condenser Coils (Success Rate: 28%)*
- `air-conditioners/ac-not-cooling.mdx:182` | *## Fix #3: Check and Adjust Thermostat Settings (Success Rate: 18%)*
- `air-conditioners/ac-not-cooling.mdx:227` | *## Fix #4: Verify and Open All Vents (Success Rate: 15%)*
- `air-conditioners/ac-not-cooling.mdx:266` | *## Fix #5: Clear Refrigerant Line Restrictions (Success Rate: 12%)*
- `air-conditioners/ac-not-cooling.mdx:308` | *## Fix #6: Test and Reset Circuit Breakers (Success Rate: 10%)*
- `air-conditioners/ac-not-cooling.mdx:356` | *## Fix #7: Inspect and Clean Evaporator Coil (Success Rate: 8%)*
- `air-conditioners/ac-not-cooling.mdx:405` | *## Fix #8: Check Refrigerant Levels (Success Rate: 7%)*
- `air-conditioners/ac-not-cooling.mdx:462` | *## Fix #9: Address Frozen Evaporator Coil (Success Rate: 6%)*
- `air-conditioners/ac-not-cooling.mdx:511` | *## Fix #10: Verify Proper System Sizing (Success Rate: 4%)*
- `air-conditioners/ac-not-cooling.mdx:562` | *## Fix #11: Address Ductwork Problems (Success Rate: 3%)*
- `air-conditioners/ac-not-cooling.mdx:611` | *## Fix #12: Compressor and Advanced Electrical Issues (Success Rate: 2%)*

## Sum-to-100 table columns (9 hits)

- `air-conditioners/ac-not-cooling.mdx` | table col sum=100.0 vals=[60.0, 20.0, 15.0, 3.0, 2.0]
- `air-conditioners/best-window-air-conditioners.mdx` | table col sum=100.0 vals=[30.0, 25.0, 15.0, 15.0, 15.0]
- `electrical/power-consumption-calculator.mdx` | table col sum=100.0 vals=[16.3, 14.8, 13.8, 9.6, 6.8, 5.4, 5.1, 3.2]
- `energy-costs/electric-water-heating-cost-by-state.mdx` | table col sum=100.0 vals=[37.0, 25.0, 10.0, 20.0, 8.0]
- `energy-costs/energy-costs-guide.mdx` | table col sum=100.0 vals=[29.0, 16.0, 14.0, 10.0, 7.0, 6.0, 4.0, 4.0]
- `energy-costs/how-many-kwh-per-day-is-normal.mdx` | table col sum=100.0 vals=[19.0, 16.0, 14.0, 7.0, 10.0, 6.0, 5.0, 4.0]
- `evaporative-coolers/best-evaporative-coolers.mdx` | table col sum=100.7 vals=[16.6, 10.6, 10.3, 7.9, 5.3, 50.0]
- `hvac-brands/best-hvac-brands-ranked.mdx` | table col sum=100.0 vals=[25.0, 20.0, 15.0, 15.0, 10.0, 10.0, 5.0]
- `portable-air-conditioners/best-portable-air-conditioners.mdx` | table col sum=100.2 vals=[11.2, 10.8, 10.3, 10.1, 9.8, 9.5, 9.8, 10.5]

## Descending-heading sequences (4 hits)

- `air-conditioners/ac-not-cooling.mdx` | desc-heads len=12, first=Fix #1: Replace Dirty Air Filter (Success Rate: 42%)
- `air-conditioners/ac-troubleshooting-guide.mdx` | desc-heads len=12, first=1. AC Not Cooling — Most Common Problem (32% of service call
- `dehumidifiers/basement-dehumidifier-setting.mdx` | desc-heads len=4, first=The Ideal Setting: 45–50% RH
- `smart-thermostats/smart-thermostat-savings.mdx` | desc-heads len=5, first=1. Occupancy-Based Setbacks (5–8% savings)

## Per-file counts (top 40 by prose-stat density)

Combined count = named-attributed + success-rate + sum-100 + desc-heads.

| Hits | File |
|---|---|
| 15 | `content/air-conditioners/ac-not-cooling.mdx` |
| 5 | `content/refrigerants/hvac-refrigerant-phase-out.mdx` |
| 3 | `content/hvac-brands/best-central-ac-brands.mdx` |
| 3 | `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx` |
| 3 | `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx` |
| 2 | `content/ac-sizing-selection/furnace-sizing-calculator.mdx` |
| 2 | `content/ac-sizing-selection/mini-split-sizing-calculator.mdx` |
| 2 | `content/air-conditioners/ac-troubleshooting-guide.mdx` |
| 2 | `content/energy-efficiency-ratings/16-seer-vs-14-seer.mdx` |
| 2 | `content/energy-efficiency-ratings/seer2-rating-explained.mdx` |
| 2 | `content/indoor-air-quality-testing.mdx` |
| 2 | `content/mini-split-air-conditioners/mini-split-in-cold-climates.mdx` |
| 2 | `content/mini-split-air-conditioners/mrcool-3rd-gen-vs-4th-gen.mdx` |
| 2 | `content/portable-air-conditioners/best-portable-air-conditioners.mdx` |
| 2 | `content/refrigerants/refrigerant-types-explained.mdx` |
| 2 | `content/smart-thermostats/smart-thermostat-savings.mdx` |
| 2 | `content/tax-credits-rebates/energy-star-tax-credits.mdx` |
| 2 | `content/water-heaters/heat-pump-water-heater-guide.mdx` |
| 1 | `content/ac-sizing-selection/air-conditioner-btu-calculator.mdx` |
| 1 | `content/ac-sizing-selection/what-size-tankless-water-heater.mdx` |
| 1 | `content/air-conditioners/best-window-air-conditioners.mdx` |
| 1 | `content/air-conditioners/window-air-conditioners.mdx` |
| 1 | `content/air-quality/air-changes-per-hour-calculator.mdx` |
| 1 | `content/air-quality/do-air-purifiers-really-work.mdx` |
| 1 | `content/dehumidifiers/ideal-indoor-humidity-level.mdx` |
| 1 | `content/electric-fireplaces/best-pellet-stoves.mdx` |
| 1 | `content/electrical/power-consumption-calculator.mdx` |
| 1 | `content/energy-costs/electric-water-heating-cost-by-state.mdx` |
| 1 | `content/energy-costs/energy-costs-guide.mdx` |
| 1 | `content/energy-costs/how-many-kwh-per-day-is-normal.mdx` |
| 1 | `content/energy-efficiency-ratings/15-2-seer2-vs-16-seer.mdx` |
| 1 | `content/energy-efficiency-ratings/is-higher-seer-worth-it.mdx` |
| 1 | `content/energy-efficiency-ratings/seer-vs-seer2.mdx` |
| 1 | `content/evaporative-coolers/best-evaporative-coolers.mdx` |
| 1 | `content/furnaces-heating/furnace-vs-heat-pump.mdx` |
| 1 | `content/furnaces-heating/gas-vs-electric-heating-cost.mdx` |
| 1 | `content/heat-pumps/best-cold-climate-heat-pumps.mdx` |
| 1 | `content/hvac-brands/best-hvac-brands-ranked.mdx` |
| 1 | `content/hvac-maintenance/hvac-maintenance-checklist.mdx` |
| 1 | `content/hvac-noise/hvac-noise-levels-explained.mdx` |

Total files with at least one hit: **51** out of 353 slugged articles.

## Bare N% raw counts (all files with any bare N% in prose)

- Total hits: 5250
- Files affected: 329 of 353

These are body-prose percentages without an adjacent named source or citation. They may be:
- Legitimate manufacturer specs (`AFUE ≥ 92%`, `SEER 16.0`)
- Legitimate ranges from EPA/DOE (`R-value 3.5`)
- Fabricated or unsourced ('efficiency drops 30%')

This class cannot be triaged from static analysis alone. Sampling top-density files first is the recommended approach:

| bare% hits | File |
|---|---|
| 128 | `content/energy-efficiency-ratings/afue-rating-explained.mdx` |
| 111 | `content/dehumidifiers/basement-dehumidifier-setting.mdx` |
| 110 | `content/dehumidifiers/ideal-indoor-humidity-level.mdx` |
| 101 | `content/air-quality/hepa-filter-explained.mdx` |
| 89 | `content/water-heaters/electric-water-heating-cost.mdx` |
| 86 | `content/furnaces-heating/furnace-efficiency-explained.mdx` |
| 81 | `content/furnaces-heating/best-gas-furnace-brands.mdx` |
| 65 | `content/dehumidifiers/how-does-humidity-affect-temperature.mdx` |
| 62 | `content/furnaces-heating/furnace-guide.mdx` |
| 61 | `content/smart-thermostats/smart-thermostat-savings.mdx` |
| 54 | `content/ductwork/duct-leakage-testing.mdx` |
| 54 | `content/refrigerants/hvac-refrigerant-phase-out.mdx` |
| 53 | `content/electric-fireplaces/best-pellet-stoves.mdx` |
| 53 | `content/refrigerants/r410a-vs-r32-refrigerant.mdx` |
| 51 | `content/generators/how-long-generator-on-5-gallons.mdx` |
| 49 | `content/furnaces-heating/furnace-installation-cost.mdx` |
| 48 | `content/energy-efficiency-ratings/is-higher-seer-worth-it.mdx` |
| 47 | `content/furnaces-heating/gas-vs-electric-heating-cost.mdx` |
| 46 | `content/dehumidifiers/dehumidifier-guide.mdx` |
| 46 | `content/refrigerants/refrigerant-types-explained.mdx` |
| 46 | `content/smart-thermostats/best-smart-thermostats.mdx` |
| 45 | `content/heat-pumps/heat-pump-in-cold-weather.mdx` |
| 44 | `content/ac-sizing-selection/air-conditioner-btu-calculator.mdx` |
| 44 | `content/air-quality/do-air-purifiers-really-work.mdx` |
| 44 | `content/furnaces-heating/thermostat-temperature-winter.mdx` |
| 44 | `content/generators/propane-generator-usage-per-hour.mdx` |
| 43 | `content/battery-backup/solar-panel-calculator.mdx` |
| 43 | `content/energy-costs/heating-cost-calculator.mdx` |
| 43 | `content/generators/generator-cost-per-kwh.mdx` |
| 40 | `content/ac-sizing-selection/furnace-sizing-calculator.mdx` |

Full census saved to `AUDIT_INVENTORY/prose_hits_full.json`.
