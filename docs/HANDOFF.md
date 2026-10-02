# hvacbase.org remediation handoff (as of 2026-09-28)

## Goal
Get hvacbase.org accepted by Raptive on the next review (rejected 4 times, no reason given). Standard: every page accurate, sourced, non-templated; every calculator correct and matching its page; trust/legal clean; human review of every page by Marko before reapplying.

## Status
- Consolidation done: 97/97 merges, 235 -> 138 live pages, 221 redirects, no chains.
- Trust/legal done: Consent Mode v2 + banner (EEA/UK/CH), privacy policy rewritten to reality, custom 404, bare-homepage and manufacturer citations removed, dead links fixed.
- Rewritten and verified (byline "Marko Visic, BSc Physics"): ~50 pages, including every homepage hero page and every homepage-row calculator page (BTU, tonnage, SEER2 comparison, heat pump, furnace, mini split, water heater, generator, kWh).
- Calculators fixed: tonnage, mini split, generator, BTU, furnace + heat pump (shared heat-loss model), kWh (eGRID CO2, no trees), SEER2 (CO2, payback from user price difference), water heater (no prices, labeled assumptions, no solar cost).
- Remaining: ~88 pages not yet rewritten; de-template pass on the earlier rewrites; SVG pass (2-3 per page, placed high); Marko's review; reapply.

## Workflow
- Claude drafts <slug>-APPLY-BODY.md (frontmatter + body). Marko saves it to /Users/markovisic/dev/hvacbase/ (= /workspace in the CC box).
- CC applies it, verifies every number with a throwaway script against the committed calculator (JS Math.round), runs content audit + tsc + scripts/audit.mjs --skip-build, commits one commit per page/part, writes /workspace/CC-OUTPUT.md. CC's box has no network and OOMs on full next build; Vercel does the full build.
- Pushes are batched: about 10 pages or once a week. Exception: a live false claim that could mislead or cost readers money gets pushed right away. Verify with cache-busted curls after each push.
- If Marko doesn't paste CC output, the prompt didn't run.
- Page data dumps: CC writes /workspace/CURRENT-PAGE-SOURCE.md (full MDX + calculator compute logic + user-visible spec/price/rate strings).

## Writing rules
- CLAUDE.md non-negotiables: max 3 sentences per paragraph (audit enforces it); every number explained in prose.
- No em dashes. No brands, model numbers, product recommendations or invented prices.
- Verified-or-omitted: every figure from a live primary source or from a published calculator formula. No primary source -> remove it. Never credit an agency with a number its page doesn't state (attribution-check.csv exists for this).
- If page text conflicts with a calculator constant and the source can't be checked offline, flag it in CC-OUTPUT and leave both unchanged; don't align content to an unverified constant.
- Assumptions in calculators are labeled as assumptions, never presented as facts.
- Avoid template tells: "honest/honestly", "Here's the...", "How we sourced this page" boilerplate, "linked at the bottom", "worth knowing", "we recommend no specific brands", "Step 1/2/3:" headings, italic rhetorical-question blocks ("the worry underneath: *...?*"). FAQ questions phrased as real searches ("Is X worth it?") are fine.
- Keep page titles and slugs of pages with meaningful Bing traffic unless there's a strong reason.
- Citations deep-link to the page that states the fact. Bare homepages only for tools (ahridirectory.org, dsireusa.org, ashp.neep.org, pvwatts.nrel.gov, ahamverifide.org).
- Every number in a page's bold answer must also appear in the body, with the step that produces it (hook traceability).

## Verified facts registry (source -> fact)
- EIA Electric Power Monthly, Tables 5.6.A/B (July 2026 data, released Sept 24, 2026): U.S. residential 18.19 cents/kWh Jan-Jul 2026 (July 18.31). Lowest North Dakota 12.36, highest Hawaii 46.28. Full state table: data/eia/residential-rates.json (regenerate with scripts/eia-rates.mjs from EIA's xlsx). Calculator default $0.18/kWh.
- EIA Electric Sales, Revenue, and Average Price, Table 5.a, "2024 Average Monthly Bill - Residential" (2024 data, released Oct 7, 2025), https://www.eia.gov/electricity/sales_revenue_price/: U.S. average residential consumption 863 kWh/month = 10,356 kWh/year = about 28.4 kWh/day; average price 16.48 cents; average bill $142.26. Highest Louisiana 1,202 kWh/month (about 39.5/day); lowest Hawaii 495 (about 16.3/day). This is the canonical household-consumption figure (863 kWh/month), used across kwh-cost-calculator, power-consumption-calculator, how-many-amps-does-a-house-use, how-to-read-electric-meter, how-many-kwh-per-day-is-normal. Bill at the Jan-Jul 2026 rate: 863 x 0.1819 = $157.
- EIA FAQ id=97 (faq.php?id=97) is STALE (2022 data: 10,791 kWh/year, 899/month); do NOT cite it for any figure. Use Table 5.a (above) for consumption.
- Natural gas $1.35/therm: an assumption, not EIA-sourced; label it "assumed".
- EPA GHG Equivalencies refs (epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references): eGRID2022 U.S. average 823.1 lb CO2e/MWh = 0.823 lb/kWh. Natural gas: 0.0053 metric tons CO2 per therm (= 5.3 kg, about 11.7 lb). Drives AFUECalculator's carbon-saved output.
- DOE Energy Saver 101 Home Cooling PDF (energy.gov/sites/prod/files/2014/06/f16/HomeCooling101.pdf): clean filters lower AC energy use 5-15%; programmable thermostat up to 10% a year on heating and cooling; duct air loss about 30% of a cooling system's energy; central AC lasts 15-20 years; room AC 10-15. The energy.gov/energysaver/* pages are retired; don't cite them.
- ENERGY STAR "When is it time to replace?" (energystar.gov/saveathome/heating-cooling/replace): consider replacing a heat pump or AC more than 10 years old, a furnace or boiler more than 15; an ENERGY STAR furnace is about 15% more efficient than a conventional one, an ENERGY STAR boiler about 5% more than a new standard model; replacement signals = frequent repairs and rising bills, rooms too hot or cold, humidity problems, excessive dust, more noise. Drives HVACLifespanCalculator's 10/15-year age signals.
- DOE Energy Saver Guide 2022 PDF (energy.gov/sites/default/files/2022-08/energy-saver-guide-2022.pdf): thermostat setbacks of 7-10F for 8 hours a day save as much as 10% a year (with a heat pump, only using a thermostat designed for heat pumps); heat pumps cut heating electricity about 50% vs electric furnaces and baseboard; storage water heaters last 10-15 years, tankless 20+; same 10/15-year replacement signals as the ENERGY STAR page.
- ENERGY STAR duct sealing benefits page: leaky ducts can reduce heating and cooling efficiency by as much as 20%.
- ENERGY STAR heat pump key product criteria: split systems >=15.2 SEER2, >=7.8 HSPF2, >=11.0 EER2; cold climate: COP >=1.75 at 5F, >=70% of rated capacity at 5F, >=8.1 HSPF2 ducted / 8.5 ductless.
- ENERGY STAR air-source heat pump page: up to 3x more heat energy than the electricity consumed. Ductless page: up to 60% less energy than standard electric radiators; it no longer says ducts waste "more than 30%". Both still show the dead 2032 tax credit.
- ENERGY STAR room AC sizing chart: 100-150 sq ft 5,000 BTU ... 700-1,000 sq ft 18,000; adjustments shaded -10%, sunny +10%, +600 BTU per person beyond two, kitchen +4,000.
- ENERGY STAR dehumidifiers: certified models use 20% less energy (spec effective Oct 1, 2025); sizing chart: 20-30 / 25-40 / 30-50 pints under 2,000 sq ft, 30+ / 40+ / 50+ over.
- EPA Report on the Environment (epa.gov/report-environment/indoor-air-quality): ~90% of time indoors; some pollutants often 2-5x higher indoors.
- EPA mold course ch. 2: indoor humidity 30-50%, below 60%.
- EPA WaterSense: standard showerheads 2.5 gpm; WaterSense <=2.0 gpm; average shower 8.2 minutes (~17 gallons). Federal faucet max 2.2 gpm; WaterSense bath faucet <=1.5.
- Federal minimums: split AC 13.4 SEER2 North; South/Southwest 14.3 below 45,000 BTU/h, 13.8 at 45,000+. Split heat pumps 14.3 SEER2 / 7.5 HSPF2.
- DOE furnace rule: gas furnaces made on or after Dec 18, 2028 must be >=95% AFUE (national).
- Consumer gas instantaneous water heaters: under 200,000 BTU/h input (10 CFR 430).
- DOE Energy Saver water heater comparison (energy.gov/node/1026276): storage tank lasts 10-15 years; tankless/demand about 20; heat pump water heater 10-15; solar about 20. These drive WaterHeaterLifespanCalculator (no unsourced hardness/maintenance modifiers, no operating-cost or degradation model, no replacement price ranges).
- ENERGY STAR: tankless water heaters have a life expectancy of 20 years. HPWH fact sheet: if your water heater is over 10 years old, be proactive and replace it; a heat pump water heater uses less than half the energy of a standard electric storage water heater.
- IRS (OBBB FAQ): 25C ends for property placed in service after 12/31/2025; 25D for expenditures after 12/31/2025. 2025 25C: 30%, up to $2,000/yr heat pumps, HPWH, biomass; $1,200/yr other ($600 central AC, furnace/boiler, panel; $150 audit).
- HEAR (IRA, state-run, funds until spent or 9/30/2031): heat pump $8,000; panel $4,000; wiring $2,500; HPWH $1,750; insulation/air sealing/ventilation $1,600; stove $840; HP dryer $840; household cap $14,000. <=80% AMI up to 100% of cost; 80-150% up to 50%. Contractor assessment before heat pump install. Replacing an existing heat pump excluded (DOE guidance). No central AC or gas furnaces.
- HOMES: whole-home savings >=20%, larger at 35%+. Generally not both HEAR and HOMES for the same upgrade.
- CPSC: about 85 deaths/yr from portable generator CO (2011-2021); 92 in 2020; run generators 20+ feet from the house.
- WHO Europe noise fact sheet: night noise below 40 dB(A) outside (yearly average), about 30 dB(A) in bedrooms.
- SPEER (citing ACCA): homes designed with Manuals J/D/S usually have at least 800-900 sq ft per ton.
- 2021 IECC climate zone 4 max U-factors: windows 0.30, ceilings 0.024, walls 0.045, floors 0.047.
- NEEP cold-climate heat pump list (neep.org/ashp): capacity/COP at 5F, 17F, 47F.
- ACCA real URLs: acca.org/standards/technical-manuals/manual-j, .../manual-s, /standards/technical-manuals, /standards/quality, hvac-contractors.acca.org/locator. Other acca.org paths return 200 with "Page Not Found".

## Calculator models (keep pages consistent with these)
- Tonnage: 20 BTU/sq ft x zone x insulation x ceiling x sun x windows x occupants; rounds up to 1.5-5 tons. Runs generous vs ACCA norms (disclosed on the page). Recalibration is an open decision.
- Heat loss (components/calculators/_heatloss.ts, furnace + heat pump heating): UA per sq ft excellent 0.177 / good 0.189 / average 0.270 / older 0.45 / poor 0.604; x ceiling (1.00/1.06/1.13/1.25) x stories (1.00/0.96/0.94) x windows (1 + (pct-15) x 0.015) x ducts/basement x (70 - design temp). Same UA drives annual gas.
- Heat pump capacity: standard 60% at 17F / 40% at 5F; cold-climate 79% / 70% (ENERGY STAR floor).
- kWh: watts x hours / 1000 x rate; 30-day month; CO2 0.823.
- SEER2: tons x 12,000 x hours / (SEER2 x 1,000); payback only from the user's price difference.
- Water heater: 17 gal/shower, 40/bath, 6/dishwasher, 15/laundry, 4/person sinks; 30% in peak hour; FHR x1.2; 70% usable tank; recovery 40 gal/h gas, 20 electric; tankless 2.5 gpm per fixture; 55F -> 120F.

## Queue
1. Energy-cost cluster: gas-vs-electric-heating-cost, dehumidifier-running-cost, how-much-does-mini-split-cost-to-run, portable-ac-electricity-cost, power-consumption-calculator.
2. Water heater cluster: tankless-water-heater-cost, tankless-water-heater-guide, electric-water-heating-cost, hot-water-recirculating-pump.
3. Then by audit weighted score x traffic (audit/SITE-AUDIT.csv): seer2-rating-explained, heat-pump-in-cold-weather, hvac-cost-by-state, afue-rating-explained, eer-chart-for-ac-units, smart-thermostat-savings, moisture-barrier-crawl-space, and the rest of the ~88.
4. De-template pass on the earlier rewrites (patterns above).
5. SVG pass, 2-3 per page, placed high, data-backed.
6. Marko reviews every page; then reapply to Raptive.

## Open decisions
- Tonnage model calibration (generous; disclosed).
- AFUECalculator and HeatPumpVsFurnaceCalculator still use _shared UA 0.25; move them to _heatloss.ts when their pages are rewritten.
- FAQPage schema: deferred (no Raptive or rich-result benefit).
- Stray top-level folders outside content/ (old article dumps): Marko decides whether to delete.
