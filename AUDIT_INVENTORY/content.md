# Content Signal Inventory

## Headline

- **Articles with < 600 words: 158 of 355 = ~45%**
- **Articles with < 1000 words: 214**
- **Total inline images across content/: 0** — no article embeds a single `<img>`, `<Image>`, or markdown image. Sitewide visual poverty.
- H2 distribution: no article has 0 H2s; median around 8–9 H2s per article.

## Word count is measured on cleaned prose

Method: strip frontmatter, strip `import`/`export` lines, strip fenced code blocks, strip JSX components (uppercase-tag opens), strip HTML tags, strip markdown syntax and link text. Count remaining tokens with `\b\w+\b`.

Reading-time from `lib/content.ts` is computed on a different cleaned body and gives ~200 wpm inflation — Article schema's `wordCount` field is overestimated on most pages. Actual word counts here are ground truth.

## Thin pages (< 600 words) — full list, sorted by count ascending

| Words | H2 | H3 | File | Title |
|---|---|---|---|---|
| 76 | 3 | 0 | `content/mini-split-air-conditioners/cassette-ceiling-air-conditioners.mdx` | Best Cassette Ceiling Air Conditioners (Specs + Installation Guide) |
| 85 | 4 | 0 | `content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx` | Daikin Mini Split Reviews: Premium AC Deep-Dive (2026) |
| 90 | 2 | 1 | `content/mini-split-air-conditioners/ac-dry-mode-vs-dehumidifier.mdx` | AC Dry Mode vs Dehumidifier: Which Removes More Humidity? |
| 90 | 3 | 0 | `content/mini-split-air-conditioners/mini-split-line-set-covers.mdx` | Best Mini Split Line Set Cover Kits (DIY Installation Guide) |
| 93 | 4 | 1 | `content/mini-split-air-conditioners/best-2-zone-mini-split.mdx` | Best 2-Zone Mini Split Systems in 2026 |
| 93 | 4 | 1 | `content/mini-split-air-conditioners/best-3-zone-mini-split.mdx` | Best 3-Zone Mini Split Systems in 2026 |
| 93 | 4 | 1 | `content/mini-split-air-conditioners/best-4-zone-mini-split.mdx` | Best 4-Zone Mini Split Systems in 2026 |
| 93 | 4 | 1 | `content/mini-split-air-conditioners/best-5-zone-mini-split.mdx` | Best 5-Zone Mini Split Systems in 2026 |
| 95 | 3 | 2 | `content/mini-split-air-conditioners/best-mini-split-for-garage.mdx` | Best Mini Split for Garage (1-Car, 2-Car, 3-Car Sizing Guide) |
| 98 | 3 | 2 | `content/mini-split-air-conditioners/mrcool-3rd-gen-vs-4th-gen.mdx` | MrCool 3rd Gen vs 4th Gen: Which DIY Mini Split to Buy? |
| 100 | 4 | 0 | `content/air-conditioners/low-profile-window-acs.mdx` | Best Low-Profile Window ACs (80% Height Reduction) |
| 103 | 6 | 3 | `content/air-conditioners/best-10000-btu-air-conditioners.mdx` | Best 10,000 BTU Air Conditioners (Medium Rooms) |
| 109 | 3 | 1 | `content/mini-split-air-conditioners/smallest-mini-splits.mdx` | Smallest Mini Split ACs (Under 10,000 BTU) — 2026 Guide |
| 115 | 5 | 5 | `content/air-conditioners/window-ac-support-brackets.mdx` | Best Window AC Support Brackets (Safe Installation) |
| 116 | 4 | 11 | `content/dehumidifiers/best-humidifiers-for-large-rooms.mdx` | Best Humidifiers for Large Rooms in 2026 (Whole-Room Coverage) |
| 117 | 5 | 11 | `content/air-conditioners/best-window-air-conditioners.mdx` | Best Window AC Units in 2026 (Specs-Based Rankings) |
| 127 | 4 | 5 | `content/portable-air-conditioners/best-dual-hose-portable-acs.mdx` | Best Dual-Hose Portable ACs (More Efficient Cooling) |
| 129 | 5 | 6 | `content/air-quality/wall-mounted-air-purifiers.mdx` | Best Wall-Mounted Air Purifiers in 2026 (Optimal Placement) |
| 130 | 4 | 0 | `content/mini-split-air-conditioners/senville-mini-split-reviews.mdx` | Senville Mini Split Reviews: Complete Brand Analysis (2026) |
| 131 | 7 | 7 | `content/space-heaters/best-infrared-heaters.mdx` | Best Infrared Heaters for Indoor Use in 2026 (With ECO Modes) |
| 134 | 5 | 6 | `content/dehumidifiers/quietest-dehumidifiers.mdx` | Quietest Dehumidifiers in 2026 (Under 53 dB Noise Levels) |
| 135 | 5 | 5 | `content/air-quality/best-dehumidifier-air-purifier-combo.mdx` | Best Dehumidifier & Air Purifier Combos in 2026 (All-in-One) |
| 135 | 5 | 6 | `content/air-quality/best-hepa-air-purifiers.mdx` | Best Medical-Grade Air Purifiers in 2026 (H13+ HEPA Filters) |
| 138 | 6 | 3 | `content/air-conditioners/best-12000-btu-air-conditioners.mdx` | Best 12,000 BTU Air Conditioners (Large Rooms) |
| 138 | 6 | 11 | `content/dehumidifiers/best-small-dehumidifiers.mdx` | Best Small Dehumidifiers in 2026 (Compact + Mini Units) |
| 138 | 6 | 0 | `content/energy-efficiency-ratings/ieer-explained.mdx` | IEER Explained: Integrated Energy Efficiency Ratio |
| 139 | 7 | 9 | `content/air-quality/best-air-curtains.mdx` | Best Air Curtains for Commercial & Residential Use in 2026 |
| 139 | 5 | 5 | `content/air-quality/best-air-purifier-humidifier-combo.mdx` | Best Air Purifier & Humidifier Combos in 2026 (2-in-1) |
| 139 | 8 | 0 | `content/energy-efficiency-ratings/eer-rating-explained.mdx` | What Is EER Rating? Energy Efficiency Ratio Explained |
| 140 | 9 | 0 | `content/energy-efficiency-ratings/eer2-rating-explained.mdx` | Understanding EER2: The New 2023 AC Efficiency Rating |
| 140 | 8 | 0 | `content/energy-efficiency-ratings/hspf-rating-explained.mdx` | HSPF Rating: What Is a Good HSPF for Heat Pumps? |
| 140 | 8 | 0 | `content/furnaces-heating/how-long-do-furnaces-last.mdx` | How Long Do Furnaces Last? (Lifespan by Type + Replacement Signs) |
| 143 | 8 | 0 | `content/furnaces-heating/pilot-light-gas-usage.mdx` | How Much Gas Does a Pilot Light Use? (Cost Per Month in 2026) |
| 143 | 7 | 12 | `content/tankless-water-heaters/smallest-tankless-water-heaters.mdx` | Smallest Tankless Water Heaters in 2026 (Compact Gas + Electric) |
| 144 | 9 | 3 | `content/furnaces-heating/do-furnaces-have-pilot-lights.mdx` | Do Furnaces Have Pilot Lights? Which Ones Still Do (and Which Don't) |
| 145 | 7 | 2 | `content/mini-split-air-conditioners/best-diy-mini-splits.mdx` | Best DIY Mini Splits: Easiest to Install Yourself (2026) |
| 146 | 6 | 6 | `content/air-quality/best-air-purifiers-for-allergies.mdx` | Best Air Purifiers for Allergies in 2026 (H13 HEPA Tested) |
| 146 | 4 | 6 | `content/air-quality/smallest-air-purifiers.mdx` | Smallest Air Purifiers for Small Rooms in 2026 (Under 200 Sq Ft) |
| 147 | 8 | 0 | `content/energy-efficiency-ratings/merv-rating-chart.mdx` | MERV Rating Chart: What MERV Filter Do You Need? |
| 147 | 1 | 0 | `content/mini-split-air-conditioners/mini-split-in-cold-climates.mdx` |  |
| 147 | 8 | 9 | `content/tankless-water-heaters/tankless-vs-tank-water-heater.mdx` | Tankless vs Tank Water Heater: Which Saves More in 2026? |
| 148 | 5 | 5 | `content/portable-air-conditioners/smallest-portable-acs.mdx` | Smallest Portable AC Units (Compact Cooling Solutions) |
| 149 | 9 | 2 | `content/heat-pumps/air-source-vs-ground-source-heat-pump.mdx` | Air-Source vs Ground-Source Heat Pump: Full Comparison |
| 156 | 7 | 0 | `content/energy-efficiency-ratings/eer-chart-for-ac-units.mdx` | EER Chart for Air Conditioners (Good, Average, Excellent) |
| 157 | 9 | 0 | `content/furnaces-heating/furnace-efficiency-explained.mdx` | Furnace Efficiency Ratings: What AFUE Really Means (2026 Guide) |
| 158 | 8 | 0 | `content/furnaces-heating/gas-furnace-wattage.mdx` | How Many Watts Does a Gas Furnace Use? (Blower Motor Power) |
| 164 | 9 | 6 | `content/furnaces-heating/cracked-heat-exchanger.mdx` | Cracked Heat Exchanger: 6 Symptoms & What to Do Next |
| 166 | 7 | 14 | `content/air-purifier-reviews/coway-air-purifiers.mdx` | Coway Air Purifiers: Brand Comparison (5 Models Reviewed for 2026) |
| 166 | 5 | 10 | `content/air-purifier-reviews/germguardian-air-purifiers.mdx` | GermGuardian Air Purifiers: Brand Review (6 Models Compared for 2026) |
| 167 | 7 | 15 | `content/tankless-water-heaters/is-tankless-water-heater-worth-it.mdx` | Is a Tankless Water Heater Worth It in 2026? (ROI Calculator + Data) |
| 169 | 5 | 11 | `content/air-purifier-reviews/medify-air-purifiers.mdx` | Medify Air Purifiers: Brand Review (MA-40, MA-25, MA-14 and More for 2 |
| 171 | 7 | 3 | `content/dehumidifiers/how-does-humidity-affect-temperature.mdx` | How Does Humidity Affect Temperature? (Heat Index Chart) |
| 171 | 6 | 6 | `content/space-heaters/electric-heater-running-cost.mdx` | How Much Does It Cost to Run an Electric Heater? (Calculator) |
| 172 | 7 | 7 | `content/energy-efficiency-ratings/seer2-savings-calculator.mdx` | SEER2 Savings Calculator: Compare AC Running Costs |
| 174 | 5 | 2 | `content/air-conditioners/window-ac-with-heater.mdx` | Best Window AC Units with Heat (2-in-1 Combos) |
| 174 | 8 | 12 | `content/tankless-water-heaters/best-tankless-water-heaters.mdx` | Best Tankless Water Heaters in 2026 (Based on Specs, Not Sponsors) |
| 177 | 8 | 11 | `content/tankless-water-heaters/tankless-water-heater-electricity.mdx` | How Much Electricity Does a Tankless Water Heater Use? (kWh Breakdown) |
| 181 | 6 | 14 | `content/dehumidifiers/dehumidifier-electricity-usage.mdx` | Do Dehumidifiers Use a Lot of Electricity? (2026 Wattage Data) |
| 184 | 5 | 2 | `content/air-conditioners/casement-window-air-conditioners.mdx` | Best Casement/Vertical AC Units for Sliding Windows |
| 184 | 5 | 8 | `content/air-purifier-reviews/molekule-air-purifier-review.mdx` | Molekule Air Purifier: Is It Worth the Premium Price in 2026? |
| 184 | 10 | 0 | `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx` | Mini Split Brands Ranked: 3 AHRI-Verified Picks (2026) |
| 185 | 7 | 2 | `content/energy-efficiency-ratings/seer-vs-seer2.mdx` | SEER vs SEER2: What Changed and Why It Matters |
| 186 | 5 | 5 | `content/air-conditioners/lightweight-window-acs.mdx` | Lightest Window Air Conditioners (Easy Installation) |
| 187 | 11 | 13 | `content/energy-efficiency-ratings/14-seer-vs-16-seer-vs-20-seer.mdx` | 14 vs 16 vs 20 SEER: 3-Way Comparison — Cost, Savings & ROI (2026) |
| 192 | 8 | 11 | `content/tankless-water-heaters/hot-water-recirculating-pump.mdx` | Hot Water Recirculating Pumps Explained (+ How They Work With Tankless |
| 193 | 10 | 0 | `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx` | Best Mini Split AC Units in 2026 (AHRI-Cert-Verified Shortlist) |
| 196 | 9 | 0 | `content/energy-efficiency-ratings/ceer-rating-explained.mdx` | CEER Rating Explained: Combined EER for Window ACs |
| 196 | 7 | 15 | `content/tankless-water-heaters/best-tankless-gas-water-heaters.mdx` | Best Gas Tankless Water Heaters in 2026 (Natural Gas & Propane) |
| 198 | 13 | 11 | `content/energy-efficiency-ratings/16-seer-vs-20-seer.mdx` | 16 SEER vs 20 SEER: Is the Upgrade Worth It? (2026 Savings Calculator) |
| 200 | 6 | 6 | `content/dehumidifiers/does-dehumidifier-cool-a-room.mdx` | Does a Dehumidifier Cool a Room? (Surprising Answer) |
| 201 | 6 | 6 | `content/air-conditioners/quietest-window-acs.mdx` | Quietest Window ACs in 2026 (Down to 38.9 dB) |
| 201 | 7 | 0 | `content/energy-efficiency-ratings/eseer-explained.mdx` | ESEER Explained: European Seasonal Energy Efficiency Ratio |
| 202 | 11 | 3 | `content/heat-pumps/heat-pump-cost-to-install.mdx` | Heat Pump Installation Cost: Complete Pricing Guide (2026) |
| 205 | 6 | 5 | `content/generators/what-size-generator-for-fridge.mdx` | What Size Generator to Run a Fridge and Freezer? (Wattage Guide) |
| 206 | 8 | 3 | `content/energy-efficiency-ratings/seer2-to-seer-conversion.mdx` | SEER2 to SEER Conversion: Calculator + Equivalency Chart |
| 211 | 8 | 0 | `content/furnaces-heating/best-electric-furnace.mdx` | Best Electric Furnace Brands & Cost (2026 Buyer's Guide) |
| 214 | 7 | 12 | `content/space-heaters/best-small-heaters.mdx` | Best Small Heaters for Small Rooms (250–1500W) |
| 216 | 4 | 0 | `content/ac-sizing-selection/ac-size-for-2500-sq-ft.mdx` | What Size AC for 2,500 Sq Ft? (BTU & Tonnage Guide 2026) |
| 220 | 11 | 5 | `content/energy-efficiency-ratings/hspf2-rating-explained.mdx` | Understanding HSPF2: Heat Pump Heating Efficiency Rating |
| 224 | 9 | 4 | `content/furnaces-heating/dirty-furnace-filter-photos.mdx` | What Does a Dirty Furnace Filter Look Like? (4 Stages) |
| 230 | 9 | 7 | `content/furnaces-heating/best-gas-furnace-brands.mdx` | Best Gas Furnace Brands: Cost & Efficiency Compared (2026) |
| 231 | 5 | 8 | `content/air-purifier-reviews/airdog-air-purifier-review.mdx` | Airdog X5 Review: Innovative TPA Technology — Worth It in 2026? |
| 236 | 9 | 0 | `content/furnaces-heating/furnace-filter-merv-rating.mdx` | Furnace Filter MERV Rating: Which MERV Filter Is Best for Your Home? |
| 246 | 11 | 0 | `content/electric-fireplaces/pellet-stove-cost-to-run.mdx` | How Much Does a Pellet Stove Cost to Run? (Per Month) |
| 251 | 6 | 3 | `content/air-conditioners/saddle-u-shaped-air-conditioners.mdx` | Saddle/U-Shaped Air Conditioners Explained (New Design) |
| 253 | 8 | 9 | `content/energy-efficiency-ratings/hvac-efficiency-ratings-compared.mdx` | All HVAC Efficiency Ratings Compared (SEER2, EER2, HSPF2, COP, AFUE) |
| 253 | 7 | 0 | `content/furnaces-heating/upflow-vs-downflow-furnace.mdx` | Upflow vs Downflow Furnace: What's the Difference? (Guide) |
| 269 | 9 | 7 | `content/heat-pumps/heat-pump-electricity-usage.mdx` | How Much Electricity Does a Heat Pump Use? (Calculator) |
| 273 | 7 | 0 | `content/generators/how-many-amps-does-generator-produce.mdx` | How Many Amps Does a Generator Produce? (Chart by Wattage & Voltage) |
| 276 | 5 | 0 | `content/air-conditioners/smallest-window-acs.mdx` | Smallest Window AC Units for Small Windows (Compact) |
| 294 | 6 | 0 | `content/mini-split-air-conditioners/mini-split-maintenance-guide.mdx` | Mini Split Maintenance: Cleaning, Filters, and Annual Service Guide |
| 297 | 9 | 1 | `content/furnaces-heating/furnace-filter-direction.mdx` | Furnace Filter Direction: Which Way Does the Arrow Go? |
| 299 | 6 | 17 | `content/dehumidifiers/best-humidifiers-for-bedroom.mdx` | Best Humidifiers for Bedroom in 2026 (Quiet + Effective) |
| 299 | 9 | 0 | `content/furnaces-heating/best-oil-furnace.mdx` | Best Oil Furnace: Prices, Efficiency & Reviews (2026) |
| 300 | 9 | 0 | `content/furnaces-heating/cold-air-return-vents.mdx` | Cold Air Return Vents: What They Are & How Many You Need |
| 305 | 7 | 9 | `content/hvac-brands/best-hvac-brands-ranked.mdx` | Best HVAC Brands Ranked: Carrier vs Trane vs Lennox vs Goodman |
| 313 | 5 | 10 | `content/air-purifier-reviews/alen-breathesmart-air-purifiers.mdx` | Alen BreatheSmart Air Purifiers: Full Review (2026) |
| 314 | 15 | 11 | `content/ductwork/flexible-vs-rigid-ductwork.mdx` | Flexible vs Rigid Ductwork: Pros, Cons, and When to Use Each (2026) |
| 315 | 6 | 3 | `content/air-quality/best-air-purifiers-for-mold.mdx` | Best Air Purifiers for Mold in 2026 (UV + HEPA Filters) |
| 320 | 9 | 4 | `content/generators/generator-vs-solar-battery-backup.mdx` | Generator vs Solar Battery Backup: Which Is Better? (2026 Comparison) |
| 330 | 6 | 6 | `content/air-quality/best-air-scrubbers.mdx` | Best Air Scrubbers for Construction & Mold in 2026 |
| 330 | 5 | 7 | `content/air-quality/quietest-air-purifiers.mdx` | Quietest Air Purifiers on the Market in 2026 (Under 52 dB) |
| 330 | 8 | 12 | `content/tankless-water-heaters/tankless-water-heater-wire-size.mdx` | Tankless Water Heater Wire Size Calculator (AWG Guide for 2026) |
| 331 | 8 | 20 | `content/tankless-water-heaters/best-electric-tankless-water-heaters.mdx` | Best Electric Tankless Water Heaters in 2026 (240V, 50–150A) |
| 332 | 9 | 0 | `content/heat-pumps/heat-pump-running-cost-calculator.mdx` | Heat Pump Running Cost Calculator (Monthly & Annual) |
| 333 | 11 | 5 | `content/energy-efficiency-ratings/afue-rating-explained.mdx` | AFUE Rating for Furnaces: How to Calculate AFUE Savings |
| 334 | 5 | 0 | `content/ac-sizing-selection/ac-size-for-3000-sq-ft.mdx` | What Size AC for 3,000 Sq Ft? (BTU & Tonnage Guide 2026) |
| 335 | 5 | 0 | `content/ac-sizing-selection/ac-size-for-2000-sq-ft.mdx` | What Size AC for 2,000 Sq Ft? (BTU & Tonnage Guide 2026) |
| 342 | 6 | 5 | `content/air-conditioners/how-to-tilt-window-ac.mdx` | How to Tilt a Window AC: Should You Even Tilt It? |
| 346 | 5 | 6 | `content/air-quality/best-bedroom-air-purifiers.mdx` | Best Air Purifiers for Bedrooms in 2026 (Quiet + Effective) |
| 348 | 8 | 15 | `content/energy-efficiency-ratings/seer2-comparison-calculator.mdx` | SEER2 Comparison Calculator: Compare Any Two Ratings (2026) |
| 352 | 6 | 0 | `content/ac-sizing-selection/ac-size-for-500-sq-ft.mdx` | What Size AC for 500 Sq Ft? (Studio & Small Room Cooling 2026) |
| 355 | 8 | 15 | `content/dehumidifiers/what-size-dehumidifier-do-i-need.mdx` | What Size Dehumidifier Do I Need? (AHAM Sizing Chart + Calculator) |
| 359 | 5 | 6 | `content/portable-air-conditioners/portable-ac-window-seal-kits.mdx` | Best Window Seal Kits for Portable ACs (DIY Install) |
| 363 | 5 | 0 | `content/ac-sizing-selection/ac-size-for-1000-sq-ft.mdx` | What Size AC for 1,000 Sq Ft? (BTU & Tonnage Guide 2026) |
| 364 | 7 | 6 | `content/energy-efficiency-ratings/minimum-seer-rating-by-state.mdx` | Minimum SEER Rating by State in 2026 (SEER2 Requirements Map) |
| 366 | 9 | 0 | `content/energy-efficiency-ratings/cadr-rating-explained.mdx` | CADR Rating Explained: How to Choose an Air Purifier by CADR |
| 367 | 9 | 1 | `content/energy-efficiency-ratings/what-is-seer-rating.mdx` | What Is SEER Rating? How AC Energy Efficiency Is Measured |
| 371 | 4 | 0 | `content/ac-sizing-selection/ac-size-for-1500-sq-ft.mdx` | What Size AC for 1,500 Sq Ft? (BTU & Tonnage Guide 2026) |
| 372 | 7 | 0 | `content/generators/propane-generator-usage-per-hour.mdx` | How Much Propane Do Generators Use Per Hour? (Calculator + Charts) |
| 380 | 5 | 8 | `content/air-quality/best-air-purifiers.mdx` | Best Air Purifiers in 2026 (Ranked by CADR Performance) |
| 380 | 7 | 4 | `content/generators/generator-cost-per-kwh.mdx` | Generator Cost Per kWh: Diesel, Propane, Natural Gas, Gasoline (2026 D |
| 384 | 5 | 8 | `content/air-quality/air-purifier-placement.mdx` | Where to Place an Air Purifier (Optimal Positioning Guide) |
| 385 | 7 | 8 | `content/air-quality/best-large-room-air-purifiers.mdx` | Best Large Room Air Purifiers in 2026 (700+ Sq Ft Coverage) |
| 393 | 7 | 9 | `content/dehumidifiers/ideal-indoor-humidity-level.mdx` | Ideal Indoor Humidity Level: What Should It Be by Season? (2026 Chart) |
| 400 | 8 | 7 | `content/generators/portable-generator-safety-tips.mdx` | Portable Generator Safety: CO Poisoning Prevention Guide (2026) |
| 402 | 14 | 8 | `content/ductwork/ductwork-sizing-calculator.mdx` | Ductwork Sizing Calculator: CFM to Duct Size Chart (2026 Guide) |
| 403 | 9 | 0 | `content/generators/natural-gas-generator-running-cost.mdx` | How Much Does It Cost to Run a Generator on Natural Gas? (2026 Rates) |
| 405 | 8 | 10 | `content/dehumidifiers/dehumidifier-vs-air-purifier.mdx` | Dehumidifier vs Air Purifier: Which Do You Need? |
| 434 | 11 | 15 | `content/tankless-water-heaters/tankless-water-heater-cost.mdx` | How Much Does a Tankless Water Heater Cost in 2026? (Unit + Installati |
| 447 | 9 | 5 | `content/energy-efficiency-ratings/seer-rating-tax-credits.mdx` | SEER Requirements for the Federal 25C Tax Credit (HISTORICAL — Expired |
| 462 | 5 | 6 | `content/air-quality/best-air-purifiers-for-dust.mdx` | Best Air Purifiers for Dust Removal in 2026 (CADR Tested) |
| 468 | 12 | 10 | `content/energy-efficiency-ratings/14-3-seer2-vs-16-seer.mdx` | 14.3 SEER2 vs 16 SEER: Efficiency & Savings Comparison (2026) |
| 479 | 10 | 4 | `content/energy-efficiency-ratings/how-to-calculate-seer.mdx` | How To Calculate SEER Rating (Formula + Examples) |
| 487 | 9 | 8 | `content/heat-pumps/heat-pump-in-cold-weather.mdx` | Do Heat Pumps Work in Cold Weather? (Below Freezing Guide) |
| 488 | 8 | 5 | `content/dehumidifiers/most-energy-efficient-dehumidifiers.mdx` | Most Energy-Efficient Dehumidifiers in 2026 (IEF Ranked) |
| 494 | 3 | 3 | `content/mini-split-air-conditioners/mini-split-amps.mdx` |  |
| 514 | 7 | 10 | `content/space-heaters/best-baseboard-heaters.mdx` | Best Baseboard Heaters in 2026 (Electric & Hydronic) |
| 520 | 11 | 6 | `content/energy-efficiency-ratings/seer2-rating-explained.mdx` | Understanding SEER2: Complete Guide to the New AC Efficiency Rating |
| 525 | 9 | 4 | `content/furnaces-heating/thermostat-temperature-winter.mdx` | What Temperature to Set Thermostat in Winter? (Savings Calculator) |
| 525 | 6 | 5 | `content/generators/how-long-do-generators-last.mdx` | How Long Do Generators Last? (Running Hours Guide by Type) |
| 527 | 8 | 9 | `content/tankless-water-heaters/tankless-water-heater-propane-usage.mdx` | How Much Propane Does a Tankless Water Heater Use? (Gallons + Cost) |
| 531 | 5 | 2 | `content/air-conditioners/through-the-wall-air-conditioners.mdx` | Best Through-the-Wall Air Conditioners (2026) |
| 534 | 9 | 8 | `content/tankless-water-heaters/electric-vs-gas-tankless.mdx` | Electric vs Gas Tankless Water Heater: Full 2026 Comparison |
| 535 | 6 | 7 | `content/air-quality/best-air-purifiers-for-smoke.mdx` | Best Air Purifiers for Smoke in 2026 (Wildfire + Cigarette) |
| 542 | 6 | 4 | `content/air-conditioners/biggest-window-acs.mdx` | Biggest Window ACs for Large Rooms (24,000+ BTU) |
| 547 | 6 | 8 | `content/dehumidifiers/best-whole-house-dehumidifiers.mdx` | Best Whole-House Dehumidifiers in 2026 (Ducted + Portable) |
| 563 | 7 | 10 | `content/space-heaters/best-space-heaters-for-large-rooms.mdx` | Best Space Heaters for Large Rooms (Up to 1,000 Sq Ft) |
| 569 | 10 | 0 | `content/furnaces-heating/furnace-flame-sensor.mdx` | How to Tell If Furnace Flame Sensor Is Bad (Symptoms & Fix) |
| 571 | 6 | 3 | `content/energy-efficiency-ratings/eer-vs-seer.mdx` | EER vs SEER: What's the Difference Between These Ratings? |
| 573 | 4 | 4 | `content/ac-sizing-selection/water-heater-sizing-calculator.mdx` | Water Heater Sizing Calculator: Tank vs Tankless Sizing (2026) |
| 575 | 9 | 17 | `content/tankless-water-heaters/tankless-water-heater-guide.mdx` | Tankless Water Heaters: Complete Guide (Gas vs Electric) — 2026 |
| 581 | 6 | 7 | `content/generators/how-long-generator-on-5-gallons.mdx` | How Long Will a Generator Run on 5 Gallons of Gas? (Runtime Chart) |
| 582 | 8 | 15 | `content/water-heaters/water-heater-cost-to-install.mdx` | Water Heater Installation Cost: What to Budget in 2026 |
| 590 | 9 | 2 | `content/furnaces-heating/furnace-installation-cost.mdx` | Furnace Installation Cost: What to Expect in 2026 |
| 591 | 10 | 15 | `content/energy-efficiency-ratings/15-2-seer2-vs-16-seer.mdx` | 15.2 SEER2 vs 16 SEER: Which Is Actually More Efficient? (2026 Compari |
| 599 | 6 | 16 | `content/dehumidifiers/dehumidifier-and-ac-same-time.mdx` | Should You Run Dehumidifier and AC at the Same Time? |
| 599 | 11 | 15 | `content/generators/generator-guide.mdx` | Home Generators: Complete Buying & Sizing Guide (2026) |

## Zero images across corpus

No MDX article contains an inline image, `<Image>` component, or markdown image tag. Every article ships pure text + tables + FAQ + AuthorBox. This is a critical UX and E-E-A-T gap — no charts, no diagrams, no photos, no product images for review articles, no wiring diagrams for how-to articles, no comparison illustrations. It also means every `og:image` on articles is missing (see `metadata.md`) — the template couldn't fall back to a per-article featured image because none exists in frontmatter.

## Near-duplicate cluster candidates (first-pass heuristic)

Grouped by shared cluster + title-token overlap. Manual review needed before merge/canonicalize decisions. Rough clusters likely to cannibalize:

### `energy-efficiency-ratings` cluster — SEER comparisons (potential cannibalization)

- 14-3-seer2-vs-16-seer
- 14-seer-vs-16-seer-vs-20-seer
- 15-2-seer2-vs-16-seer
- 16-seer-vs-14-seer
- 16-seer-vs-20-seer

Five articles all comparing SEER tiers with heavy overlap (16 vs 20 vs 14). Likely competing for the same query set 'is X SEER worth it'. Consolidation candidate.

### `ac-sizing-selection` cluster — square-footage rooms series

- ac-size-for-500-sq-ft
- ac-size-for-1000-sq-ft
- ac-size-for-1500-sq-ft
- ac-size-for-2000-sq-ft
- ac-size-for-2500-sq-ft
- ac-size-for-3000-sq-ft

Programmatic-shaped series. Look OK as long as each has real per-sqft advice, but candidate for cross-check against Google's spam policies for pSEO — see `google-ai-content-policy` skill if any similar new template rolls out.

### `air-quality` cluster — 'best-* air-purifier' variants

- best-air-purifiers-for-allergies
- best-air-purifiers-for-dust
- best-air-purifiers-for-mold
- best-air-purifiers-for-smoke
- best-hepa-air-purifiers
- best-bedroom-air-purifiers
- best-air-purifier-humidifier-combo
- best-dehumidifier-air-purifier-combo
- smallest-air-purifiers
- wall-mounted-air-purifiers

Common shape. Would need URL + content review for genuine differentiation.

### `mini-split-air-conditioners` cluster — 26 articles, several near-dupe

Includes: best-mini-split-for-garage / best-mini-split-ac-units / smallest-mini-splits / cassette-ceiling-air-conditioners / plus the zone-count series (best-2/3/4/5-zone-mini-split).

## Distribution stats

| Metric | Value |
|---|---|
| Total articles | 355 |
| Median word count | ~735 |
| Mean word count | ~923 |
| Max word count | 3842 |
| Min word count | 76 |
| Pages with fewer H2s than 5 | 22 |