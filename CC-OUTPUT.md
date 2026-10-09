# CC-OUTPUT — FIX-29 run report (2026-10-09)

**Task:** Apply the standing number rule to unsourced prices (PRICES.md decision set). PART A (36 cost-incidental pages), PART B (running-cost / energy-price pages), PART C left untouched. One commit per page. CC did not push.

## Result at a glance

- **44 pages in scope** (36 PART A incidental + 8 PART B running-cost; `afue-rating-explained`, `boiler-vs-furnace`, `insulation-r-value-guide` sit in both, handled once each).
- **31 pages changed** (one commit each, unpushed). **13 pages were already compliant** and were left untouched (no edit, no dateModified bump).
- **7 PART C install-cost pages untouched**, as instructed (to be re-sourced from NREL REMDB 2024 next).
- Every removed or relabeled figure is listed with BEFORE/AFTER below.

### How each (c) figure was handled

The PRICES class **(c) "unsourced"** actually covers two different things, and the standing rule treats them differently:

1. **Unsourced MARKET / PRICE ESTIMATES** (equipment, install, repair, service, supply prices; unsourced rate claims). → **Removed** and restated qualitatively.
2. **Assumption / example INPUTS that feed on-page arithmetic** (the assumed `$1.35/therm` gas rate, example fuel prices, an example monthly bill, an example price-difference driving a payback, the `$15,000` worked-example install). → **Kept and labeled** "assumed" / "example" at first appearance, arithmetic intact. This is the sanctioned treatment under the standing rule and the HANDOFF ("label it assumed").

Primary-sourced **(a)** and computed **(b)** figures were never touched.

### Pages left unchanged (already compliant — no edit, no dateModified bump)

These PART A/B pages already labeled every assumption/example input at first appearance, or carried no market estimate to remove, so no change was warranted:

`tankless-water-heater-propane-usage`, `heat-pump-electricity-usage`, `heat-pump-in-cold-weather`, `seer2-rating-explained`, `hspf-rating-explained`, `propane-generator-usage-per-hour`, `specific-heat-capacity-calculator`, `pellet-stove-cost-to-run`, `heating-cost-calculator`, `pilot-light-gas-usage`, `electric-water-heating-cost`, `kwh-cost-calculator`, `portable-ac-electricity-cost`.

## How it was done

An edit + adversarial-verify workflow ran one editor agent and one independent verifier agent per page (88 agents, 0 errors). Editors applied only the figures named in a per-page spec I built from the PRICES inventory; verifiers re-read each edited file against the standing rule, the writing rules, and hook traceability, and corrected anything wrong. Verdicts: **39 PASS, 5 PASS_WITH_FIXES, 0 FAIL.** The 5 fixes were all orphaned "cost ranges are estimates" disclaimers left behind after their figures were removed; the verifiers rewrote them.

I then reviewed all 31 git diffs myself and made two additional corrections the verifiers missed/left:
- `home-battery-backup-guide`: an orphaned "Cost figures are typical ranges that vary by system and region" in *About these figures* → "Installed cost varies widely by system and region."
- `moisture-barrier-crawl-space`: meta description "typical 2026 cost ranges" → "what it costs" (for consistency with the two description softenings the verifiers already applied).

## Verification (all green)

| Gate | Result |
|---|---|
| `npx tsc --noEmit` | exit 0 |
| SVG lint | 59 / 59 OK |
| content-audit (every metric) | 0 (rates_offrate 0, recompute_fail 0, long_paragraphs 0, em_dashes 0, old_tells 0, new_tells 0, overclaims 0, social_proof 0, links_broken 0) |
| `node scripts/audit.mjs --skip-build` | CLEAN, 0 findings |
| `next build` (NODE_OPTIONS=--max-old-space-size=3072) | exit 0, 279/279 static pages |
| Full `audit.mjs` incl. 18 static routes (built HTML) | CLEAN, 0 findings |

`attributions` (218) and `precision_stats` (911) are report-only manual-review counts, unchanged by this pass, not pass/fail.

## PRICES re-classification — market-estimate (c) now remains ONLY on the 7 PART C pages

My crude automated re-scan can't reproduce the PRICES two-agent per-figure methodology (it mislabels every table-cell computed `$829` and every registry `$8,000` HEAR figure as "market estimate"), so the authoritative check is string-level: **every specific market-estimate dollar string PRICES flagged on a PART A/B page is now gone from that page.** Confirmed by grep across the corpus:

- **Gone everywhere:** `$3,500 to $8,500`, `$2,000 to $5,500` (furnace-guide), `$800/year`, `$1,800 to $2,200`, `$60 to $115`, `$170 to $290`, `$400 to $690`, `$1,500–$5,000+`, `$3,500–$12,000`, `$150–$700`, `$8,000 to $16,000` (home-battery), `$0.30/kWh`/`$0.05 to $0.08/kWh` + the `75%` NEM figure, `$8 to $15`, `$15 to $30`/`$20` (filters, supplies), `$30 to $60`/`$15 to $25`, `$25-to-$50`, `sub-$100`, `$10–20`, `a thousand dollars or more`, `$150–$300` (filter cabinet), `$100–$600`, `$800–$3,500`, and the non-reproducible heat-pump figures `$76` (insulation), `$1,280` (radiant), plus the derived payback years `30 years` / `62 years` (air-source-vs-ground).
- **Surviving only on PART C** (by design, deferred to NREL re-source): the same-looking strings `$5,800 to $10,000` and `$18,000 to $35,000` live on `heat-pump-cost-to-install`; `$150 to $350` on `mini-split-installation-cost` and `tankless-water-heater-cost`; `$1,500 to $4,500` / `$4,000 to $18,000` on `mini-split-installation-cost`; `$1,500 to $4,000` (panel) on `electrical-panel-upgrade-cost`, `tankless-water-heater-cost`, `central-ac-cost-to-install`, `heat-pump-cost-to-install`; etc. All 7 PART C pages are byte-for-byte unchanged by this pass.
- **One figure relocated-correct:** `$38 a month` no longer appears on `moisture-barrier-crawl-space` (it was not reproducible there), and still appears on `dehumidifier-running-cost`, its home page, where the wattage is stated and it is reproducible **(b)**.

**Conclusion:** unsourced market/price-estimate **(c)** figures now remain only on the 7 PART C pages (`electrical-panel-upgrade-cost`, `tankless-water-heater-cost`, `heat-pump-cost-to-install`, `hvac-maintenance-cost`, `mini-split-installation-cost`, `furnace-installation-cost`, `central-ac-cost-to-install`), exactly the set reserved for the NREL REMDB 2024 re-source. The assumption/example inputs retained on PART A/B pages are labeled and feed arithmetic (the sanctioned treatment), and all (a)/(b) figures are intact (content-audit recompute_fail = 0).

## Notes and judgment calls for your review

- **reviewedOn preserved** on all 6 reviewed pages in scope (`carbon-monoxide-detector-guide`, `furnace-sizing-calculator`, `hvac-serial-number-decoder`, `ideal-indoor-humidity-level`, `seer2-comparison-calculator`, `kwh-cost-calculator`). dateModified bumped to 2026-10-09 only on the 31 pages that actually changed.
- **Meta descriptions softened (3)** to drop a now-undelivered "cost ranges / costs" promise: `duct-leakage-testing`, `how-to-improve-indoor-air-quality`, `moisture-barrier-crawl-space`. No titles or slugs were changed (keep-titles rule).
- **Titles left as-is for your call:** `moisture-barrier-crawl-space` title still reads "Materials, Installation & 2026 Costs" and the page still has a "What it costs" section, now qualitative. Kept per the keep-titles rule; flagging in case you want to retitle.
- **Non-reproducible computed figures** (`$76` heat-pump on insulation, `$1,280` heat-pump on radiant) were removed and restated *conditionally* ("a broadly similar amount, depending on your electricity rate and the pump's efficiency") rather than asserting a direction, since the flagged figures themselves were unreliable (no COP stated on those pages). Consistent with "don't align content to an unverified constant."
- **Same number, different class, by page:** `$1,280` / `$879` / `$401` were KEPT on `air-source-vs-ground-source-heat-pump` (reproducible (b) there: 7,112/4,884 kWh × $0.18, COP stated) but the `$1,280` on `radiant-floor-heating-pros-cons` was REMOVED (no COP on that page → not reproducible → (c)). Correct per the per-page reproducibility test.
- **Pre-existing, out of FIX-29 scope (not changed):** `solar-panel-calculator` bold answer says "14% system losses" while the body says "85% system efficiency" (i.e. 15%); a descriptive mismatch that does not change any computed output (17 panels / 6.8 kW round identically). Flagging for a future pass.

---

## Per-page BEFORE / AFTER (dateModified bumps omitted)

#### furnace-sizing-calculator

- **BEFORE**: - Estimated gas use: about 732 therms a year, or $988 at $1.35 per therm
- **AFTER** : - Estimated gas use: about 732 therms a year, or $988 at an assumed $1.35 per therm
- **BEFORE**: | AFUE | Furnace input | Gas per year | Cost at $1.35/therm |
- **AFTER** : | AFUE | Furnace input | Gas per year | Cost at an assumed $1.35/therm |

#### water-heater-sizing-calculator

- **BEFORE**: Annual energy cost for the default household at $0.18 per kWh and $1.35 per therm, using the calculator's assumed efficiencies:
- **AFTER** : Annual energy cost for the default household at $0.18 per kWh and an assumed $1.35 per therm, using the calculator's assumed efficiencies:

#### air-conditioner-types

- **BEFORE**: | Type | Capacity | Typical cost | Efficiency | Install |
- **BEFORE**: |---|---|---|---|---|
- **BEFORE**: | Window AC | 5,000–25,000 BTU | $150–$700 | CEER 10–15+ | DIY |
- **BEFORE**: | Portable AC | 6,000–14,000 BTU | $250–$700 | CEER 8–11 | DIY |
- **BEFORE**: | Ductless mini split | 9,000–48,000 BTU | $1,500–$5,000+ | SEER2 15+ | Professional |
- **BEFORE**: | Central air (split) | 18,000–60,000 BTU | $3,500–$12,000 | SEER2 14.3–26+ | Professional |
- **BEFORE**: | Through-the-wall | 8,000–14,000 BTU | $400–$800 | CEER 10–13 | Professional |
- **BEFORE**: | PTAC | 7,000–15,000 BTU | $600–$1,200 | EER 9–13 | Professional |
- **BEFORE**: | Evaporative cooler | CFM-rated | $100–$3,000 | (dry climates only) | DIY or Pro |
- **BEFORE**: | Hybrid / dual-fuel | 18,000–60,000 BTU | $5,000–$15,000 | SEER2 16–22 | Professional |
- **AFTER** : | Type | Capacity | Efficiency | Install |
- **AFTER** : |---|---|---|---|
- **AFTER** : | Window AC | 5,000–25,000 BTU | CEER 10–15+ | DIY |
- **AFTER** : | Portable AC | 6,000–14,000 BTU | CEER 8–11 | DIY |
- **AFTER** : | Ductless mini split | 9,000–48,000 BTU | SEER2 15+ | Professional |
- **AFTER** : | Central air (split) | 18,000–60,000 BTU | SEER2 14.3–26+ | Professional |
- **AFTER** : | Through-the-wall | 8,000–14,000 BTU | CEER 10–13 | Professional |
- **AFTER** : | PTAC | 7,000–15,000 BTU | EER 9–13 | Professional |
- **AFTER** : | Evaporative cooler | CFM-rated | (dry climates only) | DIY or Pro |
- **AFTER** : | Hybrid / dual-fuel | 18,000–60,000 BTU | SEER2 16–22 | Professional |
- **BEFORE**: - **Cons:** the highest upfront cost ($3,500–$12,000, more with new ductwork), requires professional installation and ductwork, and **poorly sealed ducts waste energy, with the DOE putting duct air losses at about 30% of a cooling system's energy consumption**.
- **AFTER** : - **Cons:** the highest upfront cost (more with new ductwork), requires professional installation and ductwork, and **poorly sealed ducts waste energy, with the DOE putting duct air losses at about 30% of a cooling system's energy consumption**.
- **BEFORE**: Window units have the lowest upfront cost ($150–$700) and are DIY-installable. Portable units are similar in price but less efficient (so they cost more to run). For whole-home cooling, central air and mini splits cost far more upfront but cool more effectively and efficiently.
- **AFTER** : Window units have the lowest upfront cost and are DIY-installable. Portable units are similar in price but less efficient (so they cost more to run). For whole-home cooling, central air and mini splits cost far more upfront but cool more effectively and efficiently.
- **BEFORE**: Cost ranges are typical 2026 figures that vary by capacity, efficiency and region; they're estimates for budgeting. Correct sizing for your space matters more than the brand for any AC type's real-world performance.
- **AFTER** : Correct sizing for your space matters more than the brand for any AC type's real-world performance.

#### air-purifier-guide

- **BEFORE**: But a mid-priced unit with genuine True HEPA H13 provides the same fundamental particle filtration as a premium one, the differences are in capacity, noise, and build. The real trap is sub-$100 units that use "HEPA-type" filters, which perform noticeably worse.
- **AFTER** : But a mid-priced unit with genuine True HEPA H13 provides the same fundamental particle filtration as a premium one, the differences are in capacity, noise, and build. The real trap is cheap units that use "HEPA-type" filters, which perform noticeably worse.

#### home-battery-backup-guide

- **BEFORE**: **A home battery backup system stores 10 to 20 kWh of electricity and delivers 5 to 11.5 kW of continuous power, enough to run your essential circuits (refrigerator, lights, Wi-Fi, medical devices, and select HVAC) for 8 to 24 hours during an outage.** In 2026, popular residential batteries cost roughly $8,000 to $1...
- **AFTER** : **A home battery backup system stores 10 to 20 kWh of electricity and delivers 5 to 11.5 kW of continuous power, enough to run your essential circuits (refrigerator, lights, Wi-Fi, medical devices, and select HVAC) for 8 to 24 hours during an outage.** In 2026, a popular residential battery is a major upfront invest...
- **BEFORE**: California's **NEM 3.0** (the Net Billing Tariff, effective April 15, 2023) cut solar export credits from around **$0.30/kWh to roughly $0.05 to $0.08/kWh, about a 75% reduction**, while grid electricity still costs $0.30 or more per kWh at peak. That gap makes storing your solar power in a battery (to use at night)...
- **AFTER** : California's **NEM 3.0** (the Net Billing Tariff, which took effect in 2023) sharply cut what utilities pay for exported solar, while peak grid electricity prices there stay high. That gap makes storing your solar power in a battery (to use at night) far more valuable than exporting it. Hawaii, Nevada, and other sta...
- **BEFORE**: Installed costs (battery, gateway, electrical work, permitting, labor) typically run **$8,000 to $16,000** for a popular residential battery, varying by capacity, your electrical panel's condition, and installer.
- **AFTER** : Installed costs (battery, gateway, electrical work, permitting, labor) make a popular residential battery a substantial expense, varying by capacity, your electrical panel's condition, and installer.
- **BEFORE**: Popular residential batteries cost roughly $8,000 to $16,000 installed, depending on capacity, your electrical setup, and installer. The 30% federal tax credit that used to reduce this expired at the end of 2025, so state and utility incentives are now the way to offset the cost, check what your area offers.
- **AFTER** : A popular residential battery is a major upfront investment once installed, depending on capacity, your electrical setup, and installer. The 30% federal tax credit that used to reduce this expired at the end of 2025, so state and utility incentives are now the way to offset the cost, check what your area offers.
- **BEFORE**: Battery capacity, output, and chemistry information reflects general lithium-ion home-storage technology (LFP and NMC characteristics, round-trip efficiency, and sizing based on household load), consistent with **U.S. Department of Energy** and **NREL** (National Renewable Energy Laboratory) energy-storage guidance....
- **AFTER** : Battery capacity, output, and chemistry information reflects general lithium-ion home-storage technology (LFP and NMC characteristics, round-trip efficiency, and sizing based on household load), consistent with **U.S. Department of Energy** and **NREL** (National Renewable Energy Laboratory) energy-storage guidance....
- **BEFORE**: The tax-credit information reflects current federal rules: the **IRS** Section 25D residential clean energy credit ended for expenditures made after December 31, 2025 under the OBBBA, with carryforward of unused pre-2026 credit allowed; state and utility incentives (tracked in the **DSIRE** database) are the active ...
- **AFTER** : The tax-credit information reflects current federal rules: the **IRS** Section 25D residential clean energy credit ended for expenditures made after December 31, 2025 under the OBBBA, with carryforward of unused pre-2026 credit allowed; state and utility incentives (tracked in the **DSIRE** database) are the active ...

#### solar-panel-calculator

- **BEFORE**: **A home paying $150 a month at 18 cents per kWh uses about 833 kWh a month. With 5 peak sun hours a day and about 14% system losses, covering that takes about a 6.8 kW system: 17 panels of 400 watts, about 366 sq ft of roof, producing about 10,549 kWh a year.**
- **AFTER** : **A home paying an example $150 a month at 18 cents per kWh uses about 833 kWh a month. With 5 peak sun hours a day and about 14% system losses, covering that takes about a 6.8 kW system: 17 panels of 400 watts, about 366 sq ft of roof, producing about 10,549 kWh a year.**

#### ideal-indoor-humidity-level

- **BEFORE**: So get a **hygrometer.** A digital one costs about $10–20, and it's the only way to actually know your number instead of guessing.
- **AFTER** : So get a **hygrometer.** A digital one is inexpensive, and it's the only way to actually know your number instead of guessing.
- **BEFORE**: The 40–60% virus-viability nuance reflects published indoor-air research. Hygrometer and equipment prices are general market ranges, labeled as such, not fixed figures.
- **AFTER** : The 40–60% virus-viability nuance reflects published indoor-air research.

#### duct-leakage-testing

- **BEFORE**: description: "How much air leaky ducts waste, how a duct leakage test works, when codes require one, where ducts leak, how to seal them, and typical 2026 costs for testing and sealing."
- **AFTER** : description: "How much air leaky ducts waste, how a duct leakage test works, when codes require one, where ducts leak, and how to seal them."
- **BEFORE**: The test follows a standard procedure (ANSI/RESNET/ICC 380). It takes about half an hour, and typical prices for a standalone test run about $150 to $350.
- **AFTER** : The test follows a standard procedure (ANSI/RESNET/ICC 380). It takes about half an hour, and a standalone test is relatively inexpensive.
- **BEFORE**: Seal boots to the drywall or floor with caulk or mastic, then insulate any ducts in unconditioned spaces once they are sealed. Aerosol sealing is done by specialized contractors, typically for about $1,500 to $3,000, and full replacement typically runs $3,000 to $10,000 or more. See [flexible vs. rigid ductwork](/fl...
- **AFTER** : Seal boots to the drywall or floor with caulk or mastic, then insulate any ducts in unconditioned spaces once they are sealed. Aerosol sealing is done by specialized contractors for a significant fee, and full duct replacement is far more expensive, often a major project. See [flexible vs. rigid ductwork](/flexible-...
- **BEFORE**: Typically about $150 to $350 for a standalone test, often less as part of an energy audit or HVAC service.
- **AFTER** : A standalone test is relatively inexpensive; it is often bundled into a larger service or a code inspection.

#### afue-rating-explained

- **BEFORE**: **AFUE is the share of a furnace's fuel that becomes heat over a year: a 95% AFUE furnace turns 95 cents of every gas dollar into heat. For a 2,000 sq ft home with average insulation in a climate with 4,500 heating degree days, going from an old 70% furnace to a 95% one cuts the gas bill from about $1,125 to $829 a ...
- **AFTER** : **AFUE is the share of a furnace's fuel that becomes heat over a year: a 95% AFUE furnace turns 95 cents of every gas dollar into heat. For a 2,000 sq ft home with average insulation in a climate with 4,500 heating degree days, going from an old 70% furnace to a 95% one cuts the gas bill from about $1,125 to $829 a ...
- **BEFORE**: | AFUE | Gas used per year | Cost at $1.35 per therm |
- **AFTER** : | AFUE | Gas used per year | Cost at an assumed $1.35 per therm |
- **BEFORE**: Going from 70% to 95% saves about $296 a year in this example; from 80% to 95%, about $155. Payback is the price difference between the two furnaces divided by the yearly savings. A $1,500 difference between an 80% and a 95% furnace pays back in about 9.7 years; enter your own quotes in the calculator.
- **AFTER** : Going from 70% to 95% saves about $296 a year in this example; from 80% to 95%, about $155. Payback is the price difference between the two furnaces divided by the yearly savings. An example $1,500 difference between an 80% and a 95% furnace would pay back in about 9.7 years; enter your own quotes in the calculator.
- **BEFORE**: An electric furnace turns all its electricity into heat, but electricity costs far more per unit of energy than gas. At 18.19 cents per kWh its heat costs about $53 per million BTU, against about $14 from a 95% gas furnace at $1.35 per therm.
- **AFTER** : An electric furnace turns all its electricity into heat, but electricity costs far more per unit of energy than gas. At 18.19 cents per kWh its heat costs about $53 per million BTU, against about $14 from a 95% gas furnace at an assumed $1.35 per therm.

#### coefficient-of-performance

- **BEFORE**: A 95% gas furnace at $1.35 per therm delivers heat for about $14.21 per million BTU, so at average prices a heat pump needs a seasonal COP of about 3.75 to beat it; see [gas vs. electric heating cost](/gas-vs-electric-heating-cost).
- **AFTER** : A 95% gas furnace at an assumed $1.35 per therm delivers heat for about $14.21 per million BTU, so at average prices a heat pump needs a seasonal COP of about 3.75 to beat it; see [gas vs. electric heating cost](/gas-vs-electric-heating-cost).

#### seer2-comparison-calculator

- **BEFORE**: Two quotes for the same house often differ mainly in efficiency: one at 14.3 SEER2, one at 17, with a gap of a thousand dollars or more. The higher rating always uses less electricity. The question is whether it saves enough, fast enough, to cover the difference.
- **AFTER** : Two quotes for the same house often differ mainly in efficiency: one at 14.3 SEER2, one at 17, often with a substantial price gap between them. The higher rating always uses less electricity. The question is whether it saves enough, fast enough, to cover the difference.

#### boiler-vs-furnace

- **BEFORE**: **On the same fuel and efficiency, a boiler and a furnace cost about the same to run: heating a 2,000 sq ft home with average insulation takes about 58 million BTU a year, roughly $829 with either at 95% efficiency and $1.35 per therm. Boilers give quiet, even radiant heat without ducts; furnaces share ducts with ce...
- **AFTER** : **On the same fuel and efficiency, a boiler and a furnace cost about the same to run: heating a 2,000 sq ft home with average insulation takes about 58 million BTU a year, roughly $829 with either at 95% efficiency and an assumed $1.35 per therm. Boilers give quiet, even radiant heat without ducts; furnaces share du...
- **BEFORE**: Heat delivered is what costs money, so at the same efficiency and fuel price the bills match. For the example home's 58 million BTU a year at $1.35 per therm:
- **AFTER** : Heat delivered is what costs money, so at the same efficiency and fuel price the bills match. For the example home's 58 million BTU a year at an assumed $1.35 per therm:
- **BEFORE**: At equal efficiency and fuel price, about the same. In the example home, a 95% model of either costs about $829 a year at $1.35 per therm.
- **AFTER** : At equal efficiency and fuel price, about the same. In the example home, a 95% model of either costs about $829 a year at an assumed $1.35 per therm.

#### furnace-guide

- **BEFORE**: The figures are typical ranges from contractor pricing, sourced to the DOE, EIA, ACCA and AHRI; get itemized quotes for your home, since install quality matters more than the brand.
- **AFTER** : The efficiency, sizing and fuel-cost figures here are sourced to the DOE, EIA, ACCA and AHRI; get itemized quotes for your own home, since install quality matters more than the brand.
- **BEFORE**: **A new furnace typically costs $3,500 to $8,500 installed for a gas unit, $2,000 to $5,500 for electric, and $5,000 to $10,000 for oil.** The two biggest decisions are fuel type (gas is cheapest to run in most of the country) and efficiency, measured in AFUE, where higher means less wasted fuel but a higher upfront...
- **AFTER** : **On installed cost, electric furnaces are usually the cheapest, gas units sit in the middle, and oil furnaces are the most expensive.** The two biggest decisions are fuel type (gas is cheapest to run in most of the country) and efficiency, measured in AFUE, where higher means less wasted fuel but a higher upfront c...
- **BEFORE**: | Installed cost | $3,500–$8,500 | $2,000–$5,500 | $5,000–$10,000 |
- **BEFORE**: **Electric furnaces** are the simplest mechanically, with no combustion, gas lines, flue, or carbon monoxide risk, and they reach nearly 100% AFUE since every watt becomes heat. The catch: **electricity typically costs 2 to 3 times more per BTU than natural gas** in most of the U.S., so a home spending $800/year on ...
- **AFTER** : **Electric furnaces** are the simplest mechanically, with no combustion, gas lines, flue, or carbon monoxide risk, and they reach nearly 100% AFUE since every watt becomes heat. The catch: **electricity typically costs 2 to 3 times more per BTU than natural gas** in most of the U.S., so running an electric furnace g...
- **BEFORE**: - **Equipment:** $800 to $6,000 depending on fuel type and efficiency tier.
- **BEFORE**: - **Labor:** $800 to $3,500.
- **BEFORE**: - **Permits and inspection:** $100 to $500 (required by most municipalities).
- **BEFORE**: - **Venting or fuel connection:** varies, a condensing furnace's PVC venting, or an oil tank, adds cost.
- **BEFORE**: - **Thermostat:** $0 to $300 if you upgrade.
- **AFTER** : - **Equipment:** the largest single driver, rising with fuel type and efficiency tier (an ultra-high AFUE modulating unit costs well above a standard single-stage one).
- **AFTER** : - **Labor:** the installer's time, which climbs with a difficult or lengthy install.
- **AFTER** : - **Permits and inspection:** required by most municipalities.
- **AFTER** : - **Venting or fuel connection:** a condensing furnace's PVC venting and condensate drain, or an oil tank, add to the total.
- **AFTER** : - **Thermostat:** an optional extra if you upgrade the controls.
- **BEFORE**: Furnace cost ranges reflect typical 2026 contractor pricing and vary by fuel type, efficiency and home; they're estimates for budgeting. Fuel-cost comparisons use **U.S. EIA** residential energy and price data. The federal efficiency standard (non-weatherized gas furnaces manufactured on or after December 18, 2028 m...
- **AFTER** : Installed cost varies by fuel type, efficiency and home, so treat any contractor quote as specific to your install. Fuel-cost comparisons use **U.S. EIA** residential energy and price data. The federal efficiency standard (non-weatherized gas furnaces manufactured on or after December 18, 2028 must meet 95% AFUE, wh...

#### furnace-vs-heat-pump

- **BEFORE**: **At $1.35 per therm and 18 cents per kWh, the calculator's default home (2,000 sq ft, average insulation, mixed climate) costs about $1,895 a year to heat and cool with a new 95% furnace and air conditioner, and $2,228 with a heat pump. The heat pump costs less to run only in the hottest climate zone, but it emits ...
- **AFTER** : **At an assumed $1.35 per therm and 18 cents per kWh, the calculator's default home (2,000 sq ft, average insulation, mixed climate) costs about $1,895 a year to heat and cool with a new 95% furnace and air conditioner, and $2,228 with a heat pump. The heat pump costs less to run only in the hottest climate zone, bu...
- **BEFORE**: Yearly heating and cooling cost for the default 2,000 sq ft home, at $1.35 per therm and 18 cents per kWh:
- **AFTER** : Yearly heating and cooling cost for the default 2,000 sq ft home, at an assumed $1.35 per therm and 18 cents per kWh:
- **BEFORE**: At $1.35 per therm and 18 cents per kWh, not in most climates: in the calculator's default home the furnace and air conditioner cost less everywhere except the hottest zone. Cheaper electricity, pricier gas or a high-efficiency cold-climate heat pump can reverse that.
- **AFTER** : At an assumed $1.35 per therm and 18 cents per kWh, not in most climates: in the calculator's default home the furnace and air conditioner cost less everywhere except the hottest zone. Cheaper electricity, pricier gas or a high-efficiency cold-climate heat pump can reverse that.

#### gas-vs-electric-heating-cost

- **BEFORE**: **At U.S. average prices, heat from gas costs about $14 to $15 per million BTU delivered, electric resistance heat about $53, and a heat pump about $18 at a COP of 3. Gas beats resistance heating by a wide margin, and a heat pump roughly ties gas: it needs to average a COP of about 3.75 to beat a 95% gas furnace at ...
- **AFTER** : **At U.S. average prices, heat from gas costs about $14 to $15 per million BTU delivered, electric resistance heat about $53, and a heat pump about $18 at a COP of 3. Gas beats resistance heating by a wide margin, and a heat pump roughly ties gas: it needs to average a COP of about 3.75 to beat a 95% gas furnace at ...

#### thermostat-temperature-winter

- **BEFORE**: **The DOE says you can save as much as 10% a year on heating and cooling by turning your thermostat down 7 to 10°F for 8 hours a day in fall and winter. For a home spending about $829 a year on gas heat, that's up to about $83; with a heat pump, the DOE advises doing this only with a thermostat designed for heat pum...
- **AFTER** : **The DOE says you can save as much as 10% a year on heating and cooling by turning your thermostat down 7 to 10°F for 8 hours a day in fall and winter. For an example home spending about $829 a year on gas heat, that's up to about $83; with a heat pump, the DOE advises doing this only with a thermostat designed for...

#### generator-guide

- **BEFORE**: Small generators turn roughly a fifth of their fuel's energy into electricity, and the cost follows. At an assumed 20% efficiency, each kWh takes about 17,060 BTU of fuel. At an example $3.50 a gallon, gasoline power costs about 50 cents a kWh; at an example $3.00 a gallon, propane about 56 cents; and natural gas at...
- **AFTER** : Small generators turn roughly a fifth of their fuel's energy into electricity, and the cost follows. At an assumed 20% efficiency, each kWh takes about 17,060 BTU of fuel. At an example $3.50 a gallon, gasoline power costs about 50 cents a kWh; at an example $3.00 a gallon, propane about 56 cents; and natural gas at...

#### air-source-vs-ground-source-heat-pump

- **BEFORE**: Our [heat pump installation cost](/heat-pump-cost-to-install) guide puts a ducted 3-ton air-source system at roughly $5,800 to $10,000 and a geothermal system at roughly $18,000 to $35,000, both typical 2026 contractor ranges before incentives. The gap is the buried loop and the drilling or excavation it needs. On t...
- **AFTER** : Our [heat pump installation cost](/heat-pump-cost-to-install) guide walks through what a ducted air-source system and a geothermal system each run before incentives. Geothermal costs substantially more to install, and the difference is the buried loop and the drilling or excavation it needs.
- **BEFORE**: At $12,000 more upfront, $12,000 divided by $401 is about 30 years; at $25,000 more it is about 62 years. Those are long horizons, which is why geothermal makes the most sense when you expect to stay in the home for decades. A colder climate, higher electricity prices, or a state or utility rebate shortens the payba...
- **AFTER** : Geothermal costs substantially more to install than an air-source system, so even at that yearly saving the upfront gap can take many years, often decades, to recover. That is why geothermal makes the most sense when you expect to stay in the home for decades. A colder climate, higher electricity prices, or a state ...

#### heat-pump-guide

- **BEFORE**: **Multiply the COP by comparing your electricity rate against your gas rate.** If electricity is about $0.18/kWh and the heat pump's COP is 3.0, your effective heating cost is roughly 6 cents per kWh of delivered heat (18 cents per kWh ÷ a COP of 3), about on par with natural gas at $1.35/therm.
- **AFTER** : **Multiply the COP by comparing your electricity rate against your gas rate.** If electricity is about $0.18/kWh and the heat pump's COP is 3.0, your effective heating cost is roughly 6 cents per kWh of delivered heat (18 cents per kWh ÷ a COP of 3), about on par with natural gas at an assumed $1.35/therm.

#### heat-pump-tax-credits-2026

- **BEFORE**: For a $15,000 heat pump installation:
- **AFTER** : For an example $15,000 heat pump installation:

#### hvac-serial-number-decoder

- **BEFORE**: Knowing your system's age turns "should I repair or replace?" from a guess into a real decision. A $1,500 repair on a 6-year-old system is easy. The same repair on a 16-year-old unit **rarely makes sense**.
- **AFTER** : Knowing your system's age turns "should I repair or replace?" from a guess into a real decision. A major repair on a 6-year-old system is easy. The same repair on a 16-year-old unit **rarely makes sense**.

#### how-to-clean-ac-coils

- **BEFORE**: The payoff is real: a dirty coil reduces your system's ability to cool the home and forces it to run longer, so cleaning it can noticeably cut your cooling cost and extend the system's life. Cleaning the outdoor condenser coil is a straightforward 30-to-60-minute task costing under $20 in supplies; the indoor evapor...
- **AFTER** : The payoff is real: a dirty coil reduces your system's ability to cool the home and forces it to run longer, so cleaning it can noticeably cut your cooling cost and extend the system's life. Cleaning the outdoor condenser coil is a straightforward 30-to-60-minute task costing very little in supplies; the indoor evap...
- **BEFORE**: Realistic savings from cleaning vary with how dirty the coils are and your climate, but for a neglected system the difference on your summer bills can add up to a few hundred dollars a year. It's one of the highest-return maintenance tasks you can do yourself.
- **AFTER** : Realistic savings from cleaning vary with how dirty the coils are and your climate, but for a neglected system the difference on your summer bills can add up noticeably over a season. It's one of the highest-return maintenance tasks you can do yourself.
- **BEFORE**: - **Coil cleaner** (a commercial foaming condenser-coil cleaner, roughly $8 to $15 a can)
- **BEFORE**: - A **fin comb** (about $8 to $15) for straightening any bent fins
- **AFTER** : - **Coil cleaner** (a commercial foaming condenser-coil cleaner)
- **AFTER** : - A **fin comb** for straightening any bent fins
- **BEFORE**: Total cost is roughly **$15 to $30** if you already have a hose and basic tools.
- **AFTER** : The supplies cost very little if you already have a hose and basic tools.
- **BEFORE**: - A **no-rinse evaporator coil cleaner** (a self-rinsing foaming cleaner, roughly $8 to $15)
- **AFTER** : - A **no-rinse evaporator coil cleaner** (a self-rinsing foaming cleaner)
- **BEFORE**: Dollar-savings figures are estimates that vary by system, climate and local electricity rate, and cleaner and tool prices are approximate ranges. Match the cleaner type (no-rinse foaming for evaporator coils, rinse-type for condensers) to the job.
- **AFTER** : Savings vary by system, climate and local electricity rate, and cleaner and tool costs are modest and vary by brand and retailer. Match the cleaner type (no-rinse foaming for evaporator coils, rinse-type for condensers) to the job.

#### carbon-monoxide-detector-guide

- **BEFORE**: That's the whole case for taking this seriously. A CO alarm is a $25-to-$50 device that removes one of the few household risks that can **kill a healthy person in their sleep**.
- **AFTER** : That's the whole case for taking this seriously. A CO alarm is an inexpensive device that removes one of the few household risks that can **kill a healthy person in their sleep**.
- **BEFORE**: ## "Is my $25 detector actually good enough?" (The blind spot nobody mentions)
- **AFTER** : ## "Is a basic detector actually good enough?" (The blind spot nobody mentions)
- **BEFORE**: State requirements are from the **National Conference of State Legislatures (NCSL)** compilation of CO detector statutes, and code/placement guidance follows **NFPA 72** (which absorbed CO-alarm requirements after NFPA 720 was withdrawn in 2018). Detector prices and sensor lifespans are general market ranges, labele...
- **AFTER** : State requirements are from the **National Conference of State Legislatures (NCSL)** compilation of CO detector statutes, and code/placement guidance follows **NFPA 72** (which absorbed CO-alarm requirements after NFPA 720 was withdrawn in 2018). Sensor lifespans are a general market range, labeled as such.

#### how-to-improve-indoor-air-quality

- **BEFORE**: description: "A practical, ranked guide to improving indoor air quality: ten methods from a MERV 13 filter upgrade to whole-house systems, with costs, difficulty, and what each one actually does."
- **AFTER** : description: "A practical, ranked guide to improving indoor air quality: ten methods from a MERV 13 filter upgrade to whole-house systems, with the effort each takes and what each one actually does."
- **BEFORE**: This guide ranks ten ways to improve indoor air quality, from a $20 filter upgrade to whole-house systems, with guidance on what each does. The right approach depends on your home and your particular air-quality concern.
- **AFTER** : This guide ranks ten ways to improve indoor air quality, from a low-cost filter upgrade to whole-house systems, with guidance on what each does. The right approach depends on your home and your particular air-quality concern.
- **BEFORE**: **The single most impactful, and cheapest, step is upgrading your HVAC filter to MERV 13, which costs about $15 to $30 per filter and substantially reduces fine-particle (PM2.5) levels in most homes.** The second most impactful step is increasing ventilation (mechanical or strategic window opening), which cuts CO2, ...
- **AFTER** : **The single most impactful, and cheapest, step is upgrading your HVAC filter to MERV 13, which is a low-cost upgrade and substantially reduces fine-particle (PM2.5) levels in most homes.** The second most impactful step is increasing ventilation (mechanical or strategic window opening), which cuts CO2, VOCs, and mo...
- **BEFORE**: | # | Method | Targets | Cost | Difficulty |
- **BEFORE**: |---|---|---|---|---|
- **BEFORE**: | 1 | Upgrade HVAC filter to MERV 13 | Fine particles (PM2.5) | $15–$30/filter | Easy |
- **BEFORE**: | 2 | Increase mechanical ventilation (ERV/HRV) | CO2, VOCs, moisture | $1,500–$4,000 installed | Professional |
- **BEFORE**: | 3 | Use a range hood when cooking | Cooking particles + fumes | $0 (existing) | Easy |
- **BEFORE**: | 4 | Add a portable HEPA air purifier | Room particles | $100–$600/unit | Easy |
- **BEFORE**: | 5 | Control humidity (40–50% RH) | Mold, dust mites | $0–$1,500 | Easy–Moderate |
- **BEFORE**: | 6 | Test and mitigate radon | Radon gas | $800–$2,500 | Professional |
- **BEFORE**: | 7 | Eliminate source pollutants | VOCs, various | $0–$500 | Easy |
- **BEFORE**: | 8 | Seal and clean ductwork | Particle recirculation | $500–$2,000 | Professional |
- **BEFORE**: | 9 | UV-C or PCO in HVAC (supplemental) | Some biologicals | $500–$1,500 | Professional |
- **BEFORE**: | 10 | Whole-house air purification | Whole-home particles | $800–$3,500 | Professional |
- **AFTER** : | # | Method | Targets | Difficulty |
- **AFTER** : |---|---|---|---|
- **AFTER** : | 1 | Upgrade HVAC filter to MERV 13 | Fine particles (PM2.5) | Easy |
- **AFTER** : | 2 | Increase mechanical ventilation (ERV/HRV) | CO2, VOCs, moisture | Professional |
- **AFTER** : | 3 | Use a range hood when cooking | Cooking particles + fumes | Easy |
- **AFTER** : | 4 | Add a portable HEPA air purifier | Room particles | Easy |
- **AFTER** : | 5 | Control humidity (40–50% RH) | Mold, dust mites | Easy–Moderate |
- **AFTER** : | 6 | Test and mitigate radon | Radon gas | Professional |
- **AFTER** : | 7 | Eliminate source pollutants | VOCs, various | Easy |
- **AFTER** : | 8 | Seal and clean ductwork | Particle recirculation | Professional |
- **AFTER** : | 9 | UV-C or PCO in HVAC (supplemental) | Some biologicals | Professional |
- **AFTER** : | 10 | Whole-house air purification | Whole-home particles | Professional |
- **BEFORE**: **Cost: $15 to $30 per filter | Effort: easy (a 5-minute swap) | Impact: large for the cost.**
- **AFTER** : **Cost: low | Effort: easy (a 5-minute swap) | Impact: large for the cost.**
- **BEFORE**: - **Check your system can handle MERV 13 airflow.** A higher-MERV filter is more restrictive, and depth matters more than the number, a 4-inch MERV 13 restricts far less than a 1-inch one. If you only have a 1-inch slot, consider having an HVAC tech add a 4-inch filter cabinet ($150 to $300), which runs MERV 13 with...
- **AFTER** : - **Check your system can handle MERV 13 airflow.** A higher-MERV filter is more restrictive, and depth matters more than the number, a 4-inch MERV 13 restricts far less than a 1-inch one. If you only have a 1-inch slot, consider having an HVAC tech add a 4-inch filter cabinet, which runs MERV 13 with much lower pre...
- **BEFORE**: The recommended 30 to 50% humidity range and ventilation guidance follow the **EPA** and ASHRAE. Because real-world improvement depends heavily on your home, its systems and your specific pollutants, we describe what each method does and its relative effectiveness rather than promising fixed percentages; cost figure...
- **AFTER** : The recommended 30 to 50% humidity range and ventilation guidance follow the **EPA** and ASHRAE. Because real-world improvement depends heavily on your home, its systems and your specific pollutants, we describe what each method does and its relative effectiveness rather than promising fixed percentages.

#### insulation-r-value-guide

- **BEFORE**: Over a season with 4,500 heating degree days, going from R-19 to R-49 cuts that ceiling's heat loss from about 5.7 to 2.2 million BTU, about $49 a year with a 95% gas furnace at $1.35 per therm or $76 with a heat pump, before counting summer cooling. Framing and gaps lower an assembly's real R-value, so installation...
- **AFTER** : Over a season with 4,500 heating degree days, going from R-19 to R-49 cuts that ceiling's heat loss from about 5.7 to 2.2 million BTU, about $49 a year with a 95% gas furnace at an assumed $1.35 per therm, or a broadly similar amount with a heat pump depending on your electricity rate and the pump's efficiency, befo...

#### mini-split-air-conditioners

- **BEFORE**: **A single-zone mini split typically costs $1,500 to $4,500 installed and runs on roughly 200 to 700 watts, delivering meaningfully better efficiency than central air by eliminating duct losses.** Most are heat pumps, so they both heat and cool, and cold-climate models keep working well below freezing. The keys to a...
- **AFTER** : **A single-zone mini split runs on roughly 200 to 700 watts and is a mid-range purchase next to window units and central air, delivering meaningfully better efficiency by eliminating duct losses.** Most are heat pumps, so they both heat and cool, and cold-climate models keep working well below freezing. The keys to ...
- **BEFORE**: - **Single-zone installed:** roughly $1,500 to $4,500.
- **BEFORE**: - **Multi-zone installed:** roughly $4,000 to $18,000, depending on the number of zones and system size.
- **AFTER** : - **Single-zone installed:** the least expensive mini split to install.
- **AFTER** : - **Multi-zone installed:** considerably more, scaling with the number of zones and system size.

#### moisture-barrier-crawl-space

- **BEFORE**: description: "What a crawl space moisture barrier does, which liner thickness to use, ground cover vs. full encapsulation, typical 2026 cost ranges, and the mistakes that trap moisture."
- **AFTER** : description: "What a crawl space moisture barrier does, which liner thickness to use, ground cover vs. full encapsulation, what it costs, and the mistakes that trap moisture."
- **BEFORE**: **A crawl space moisture barrier is a polyethylene sheet laid over the dirt floor so ground moisture can't evaporate into the crawl space. A basic 6-mil ground cover costs about $60 to $115 in material for 1,000 sq ft; a full encapsulation, with a heavier liner up the walls, sealed vents and usually a dehumidifier, ...
- **AFTER** : **A crawl space moisture barrier is a polyethylene sheet laid over the dirt floor so ground moisture can't evaporate into the crawl space. A basic 6-mil ground cover is the cheapest step, with inexpensive material for 1,000 sq ft; a full encapsulation, with a heavier liner up the walls, sealed vents and usually a de...
- **BEFORE**: ## Typical costs
- **BEFORE**: 
- **BEFORE**: These are typical ranges from contractor and retail pricing, not quotes. For a 1,000 sq ft ground cover:
- **BEFORE**: 
- **BEFORE**: | Item | DIY | Professional |
- **BEFORE**: |---|---|---|
- **BEFORE**: | 6-mil polyethylene (with 15% waste) | $60 to $115 | Included |
- **BEFORE**: | 12-mil reinforced polyethylene | $170 to $290 | Included |
- **BEFORE**: | 20-mil liner | $400 to $690 | Included |
- **BEFORE**: | Seam tape | $15 to $30 | Included |
- **BEFORE**: | Labor | Your time | $500 to $1,200 |
- **BEFORE**: | **Total, ground cover only** | **$85 to $825** | **$500 to $2,000** |
- **BEFORE**: 
- **BEFORE**: For full encapsulation, typical line items are:
- **BEFORE**: 
- **BEFORE**: | Item | Typical cost |
- **BEFORE**: |---|---|
- **BEFORE**: | Liner for floor and walls (12 to 20 mil) | $500 to $1,500 |
- **BEFORE**: | Seam tape and mastic | $50 to $150 |
- **BEFORE**: | Wall fasteners | $50 to $100 |
- **BEFORE**: | Sealing vents | $100 to $300 |
- **BEFORE**: | Drainage matting, if water gets in | $200 to $800 |
- **BEFORE**: | Dehumidifier drain | $100 to $300 |
- **BEFORE**: | Dehumidifier electrical outlet | $150 to $400 |
- **BEFORE**: | Sump pump, if there's standing water | $500 to $1,500 |
- **BEFORE**: | Wall insulation, optional | $500 to $2,000 |
- **BEFORE**: | Professional labor | $1,500 to $5,000 |
- **AFTER** : ## What it costs
- **AFTER** : 
- **AFTER** : Cost depends mostly on the liner you choose and on whether you install it yourself or hire a contractor. For a 1,000 sq ft ground cover, 6-mil polyethylene is the cheapest liner, 12-mil reinforced costs more, and 20-mil costs the most. Seam tape adds a little on top of the liner.
- **AFTER** : 
- **AFTER** : A DIY ground cover is inexpensive, mostly the price of the plastic and tape. Hiring a professional adds labor, which makes the same job cost more.
- **AFTER** : 
- **AFTER** : Full encapsulation costs more because it adds materials and work beyond a simple ground cover. It uses a heavier liner over the floor and up the walls, seam tape and mastic, wall fasteners, and sealed vents, plus a dehumidifier with its own drain and electrical outlet. Where water gets in you add an optional drainag...
- **BEFORE**: An encapsulated crawl space still needs its humidity controlled, usually with a dehumidifier set to about 50%. A typical 50-pint unit costs about $38 a month to run 12 hours a day at 18 cents per kWh; see [dehumidifier running cost](/dehumidifier-running-cost) and the [dehumidifier guide](/dehumidifier-guide).
- **AFTER** : An encapsulated crawl space still needs its humidity controlled, usually with a dehumidifier set to about 50%. A typical 50-pint unit adds a modest amount to the monthly power bill when run about 12 hours a day; see [dehumidifier running cost](/dehumidifier-running-cost) and the [dehumidifier guide](/dehumidifier-gu...

#### how-to-vent-portable-ac-without-window

- **BEFORE**: There are several ways to vent a portable AC without a normal window, and most are DIY-friendly. This guide walks through five methods, from easiest to most involved, with the tools you need, roughly what each costs, and which have catches. The one rule you can't get around: the hot air has to go somewhere outside t...
- **AFTER** : There are several ways to vent a portable AC without a normal window, and most are DIY-friendly. This guide walks through five methods, from easiest to most involved, with the tools you need and which have catches. The one rule you can't get around: the hot air has to go somewhere outside the room, or the AC won't c...
- **BEFORE**: You'll need a portable-AC sliding-door kit (a telescoping panel, roughly $30 to $60) or a DIY panel of plexiglass or rigid foam board (roughly $15 to $25), plus foam weatherstripping tape and a hose adapter if the kit doesn't include one. A commercial kit telescopes to your door height and has the hose hole built in...
- **AFTER** : You'll need a portable-AC sliding-door kit (a telescoping panel) or a DIY panel of plexiglass or rigid foam board, plus foam weatherstripping tape and a hose adapter if the kit doesn't include one. A commercial kit telescopes to your door height and has the hose hole built in; a DIY panel means cutting a 5 to 6 inch...
- **BEFORE**: - A wall vent cap with a damper (about $15 to $30)
- **AFTER** : - A wall vent cap with a damper
- **BEFORE**: Material costs are approximate ranges that vary by retailer and region. Always check for wiring, plumbing and gas lines before drilling through any wall, and confirm landlord permission before any permanent modification.
- **AFTER** : Always check for wiring, plumbing and gas lines before drilling through any wall, and confirm landlord permission before any permanent modification.

#### radiant-floor-heating-pros-cons

- **BEFORE**: A 2,000 sq ft home with average insulation needs about 58 million BTU of heat a year in the site's heat-loss model. Delivered by a 95% gas boiler at an assumed $1.35 per therm, that is about $829 a year; a heat pump feeding the same floor runs about $1,280. Whole-home electric radiant is resistance heat, and heating...
- **AFTER** : A 2,000 sq ft home with average insulation needs about 58 million BTU of heat a year in the site's heat-loss model. Delivered by a 95% gas boiler at an assumed $1.35 per therm, that is about $829 a year; a heat pump feeding the same floor costs a broadly similar amount, depending on your electricity rate and the pum...

#### heat-pump-water-heater-guide

- **BEFORE**: Annual energy cost for the default four-person household in our [water heater sizing calculator](/water-heater-sizing-calculator), at 18 cents per kWh and $1.35 per therm:
- **AFTER** : Annual energy cost for the default four-person household in our [water heater sizing calculator](/water-heater-sizing-calculator), at 18 cents per kWh and an assumed $1.35 per therm:

#### water-heater-guide

- **BEFORE**: **For a typical four-person household at 18 cents per kWh and $1.35 per therm, a heat pump water heater costs about $334 a year to run, a gas tankless $340, a gas tank $467 and a standard electric tank $1,271. Tanks last 10 to 15 years and tankless units about 20, according to the DOE.**
- **AFTER** : **For a typical four-person household at 18 cents per kWh and an assumed $1.35 per therm, a heat pump water heater costs about $334 a year to run, a gas tankless $340, a gas tank $467 and a standard electric tank $1,271. Tanks last 10 to 15 years and tankless units about 20, according to the DOE.**
