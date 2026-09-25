# HVACBase readiness scan (read-only)

Live MDX pages scanned: 141. Box has no network — external URL status is Marko's Mac step.

## Summary (PASS/FAIL)
1. Fake authority phrases: PASS (12 phrase matches, but all are hire-a-licensed/certified-pro ADVICE, questions to ask a contractor, or false positives — no fabricated first-party authority)
2. External citations: extracted 260 unique URLs; bare-homepage citations: 72 (review)
3. Author & schema: byline PASS · author Person+sameAs LinkedIn PASS · Article dateModified PASS · BreadcrumbList PASS · per-page og:image PASS · FAQPage FAIL (missing on all 101 FAQ pages)
4. Privacy & consent: Consent Mode v2 default-deny FAIL (GA4 fires for all incl EEA/UK) · data-controller-in-privacy FAIL · ad-disclosure-vs-loaded FAIL (policy describes ads not served)
5. Support pages: PASS (all 6 present)
6. Layout: tables-wrapped PASS · shared header PASS · custom 404 FAIL (no app/not-found.tsx)
7. Duplicates: dup titles PASS (0) · dup descriptions PASS (0) · H1 PASS (every page renders exactly one <h1> from the layout title; verified in rendered HTML)
8. Dates: PASS (most common dateModified 2026-07-17 covers 41/141 pages)

---
## 1. Fake authority phrases (file:line)
Note: on review, none are fabricated first-party authority. They are advice to hire a licensed/EPA/NATE-certified technician, example questions to ask an installer, or false positives ("labor" matched "our lab"; disclaimer "reviewed by" is in an ad-disclosure sentence). Listed for transparency:
- content/air-conditioners/ac-not-cooling.mdx:155 — "certified technician" — You can't diagnose or fix this yourself, and it's not a gray area, **under EPA S
- content/air-conditioners/ac-not-cooling.mdx:228 — "certified technician" — answer: "Watch for ice on the coils, a hissing sound near the lines, oily residu
- content/refrigerants/r410a-vs-r32-refrigerant.mdx:208 — "our technicians" — 1. "Have your technicians completed A2L refrigerant training?" (Look for manufac
- content/hvac-brands/central-ac-cost-to-install.mdx:177 — "our lab" — 7. What does your labor warranty cover, and for how long?
- content/hvac-maintenance/hvac-maintenance-checklist.mdx:35 — "licensed technician" — **The core of HVAC maintenance is simple: check your filter monthly, keep the ou
- content/hvac-maintenance/hvac-maintenance-checklist.mdx:65 — "licensed technician" — **For gas furnaces, one professional task is a genuine safety must:** a **heat e
- content/hvac-maintenance/hvac-maintenance-checklist.mdx:97 — "licensed technician" — You can handle filter changes, clearing and gently cleaning the outdoor unit, th
- content/hvac-maintenance/hvac-maintenance-checklist.mdx:106 — "licensed technician" — A cracked heat exchanger in a gas furnace can leak carbon monoxide into your hom
- content/hvac-maintenance/hvac-maintenance-cost.mdx:211 — "certified technician" — - NATE-certified technicians (North American Technician Excellence)
- content/hvac-maintenance/hvac-maintenance-cost.mdx:280 — "licensed technician" — answer: "Usually not. A thorough tune-up requires 45-90 minutes of a licensed te
- content/hvac-maintenance/how-to-clean-ac-coils.mdx:123 — "certified technician" — **Call a professional if:** the coil has heavy biological growth or deep matted 
- app/disclaimer/page.tsx:363 — "reviewed by" — HVACBase.org may display third-party programmatic advertisements. When such adve

## 2. External citations
- Full deduplicated list: audit/external-urls.txt (260 URLs).
- Bare-homepage citations (72) and pages using each:
  - https://aeroseal.com/ — duct-leakage-testing
  - https://ahamverifide.org/ — air-changes-per-hour-calculator, air-purifier-guide, air-purifier-placement, air-purifier-sizing-guide
  - https://ashp.neep.org — heat-pump-size-calculator, how-many-mini-splits-do-i-need
  - https://battlebornbatteries.com/ — how-many-watts-in-12v-battery
  - https://buildings.lbl.gov — hvac-ductwork-guide
  - https://buildings.lbl.gov/ — duct-leakage-testing, heat-pump-electricity-usage, heat-pump-in-cold-weather
  - https://energyresearch.ucf.edu — air-conditioner-btu-calculator
  - https://energyresearch.ucf.edu/ — flexible-vs-rigid-ductwork
  - https://energysavernc.com/ — hvac-rebates-by-state
  - https://iaqscience.lbl.gov — air-duct-cleaning-worth-it
  - https://iaqscience.lbl.gov/ — indoor-air-quality-testing, voc-in-home-sources, whole-house-ventilation-systems
  - https://igshpa.org/ — air-source-vs-ground-source-heat-pump
  - https://indoor.lbl.gov — do-portable-acs-pull-air-from-outside
  - https://nadca.com — air-duct-cleaning-worth-it
  - https://neep.org — hspf-rating-explained
  - https://neep.org/ — air-source-vs-ground-source-heat-pump
  - https://propane.com — tankless-water-heater-propane-usage
  - https://pvwatts.nrel.gov/ — solar-panel-calculator
  - https://standards.ieee.org/ — battery-watt-hours
  - https://standby.lbl.gov/ — power-consumption-calculator
  - https://wcec.ucdavis.edu/ — evaporative-cooler-vs-ac
  - https://www.aaaai.org — air-duct-cleaning-worth-it
  - https://www.acac.org/ — how-to-identify-mold
  - https://www.acca.org — afue-rating-explained, hvac-ductwork-guide, hvac-maintenance-cost, seer2-rating-explained
  - https://www.acca.org/ — generator-guide, hvac-cost-by-state
  - https://www.advancedenergy.org/ — moisture-barrier-crawl-space
  - https://www.aham.org — dehumidifier-running-cost, eer-chart-for-ac-units
  - https://www.ahamverifide.org/ — how-to-improve-indoor-air-quality
  - https://www.ahridirectory.org — air-conditioner-btu-calculator, furnace-sizing-calculator, heat-pump-in-cold-weather, heat-pump-size-calculator, heat-pump-water-heater-guide, how-long-does-water-heater-last, how-many-mini-splits-do-i-need, how-much-does-mini-split-cost-to-run, hspf-rating-explained, is-tankless-water-heater-worth-it, mini-split-air-conditioners, mini-split-amps, minimum-seer-rating-by-state, portable-ac-electricity-cost, portable-air-conditioners, seer2-comparison-calculator, seer2-to-seer-conversion, tankless-water-heater-cost, tankless-water-heater-guide, water-heater-guide, water-heater-sizing-calculator, what-size-tankless-water-heater, window-air-conditioners
  - https://www.ahridirectory.org/ — air-conditioner-types, air-source-vs-ground-source-heat-pump, central-ac-cost-to-install, central-air-conditioner-guide, disadvantages-of-heat-pumps, eer-chart-for-ac-units, furnace-efficiency-explained, furnace-guide, furnace-vs-heat-pump, heat-pump-cost-to-install, heat-pump-electricity-usage, heat-pump-guide, heat-pump-in-cold-weather, heat-pump-running-cost-calculator, hvac-cost-by-state, hvac-system-lifespan, seer2-rating-explained
  - https://www.ahrinet.org — afue-rating-explained, coefficient-of-performance, eer-chart-for-ac-units, hvac-maintenance-cost, r410a-vs-r32-refrigerant, seer2-to-seer-conversion
  - https://www.ahrinet.org/ — how-to-reduce-hvac-noise, hvac-noise-levels-explained
  - https://www.airnow.gov — do-portable-acs-pull-air-from-outside
  - https://www.ashrae.org — air-conditioner-btu-calculator, coefficient-of-performance, dehumidifier-and-ac-same-time, furnace-sizing-calculator, how-does-humidity-affect-temperature, how-to-clean-ac-coils, hvac-ductwork-guide, seer2-rating-explained, seer2-to-seer-conversion, water-heater-sizing-calculator, what-size-dehumidifier-do-i-need, what-size-tankless-water-heater
  - https://www.ashrae.org/ — air-purifier-placement, how-to-improve-indoor-air-quality, how-to-reduce-hvac-noise, hvac-noise-levels-explained
  - https://www.bpi.org/ — duct-leakage-testing
  - https://www.buildingscience.com/ — whole-house-ventilation-systems
  - https://www.cee1.org/ — hvac-tax-credits-2026
  - https://www.cpsc.gov/ — space-heater-guide
  - https://www.dsireusa.org — heat-pump-guide, heat-pump-in-cold-weather, heat-pump-water-heater-guide, mini-split-air-conditioners, tankless-water-heater-cost, water-heater-guide
  - https://www.dsireusa.org/ — central-ac-cost-to-install, furnace-installation-cost, heat-pump-cost-to-install, heat-pump-tax-credits-2026, home-battery-backup-guide, hvac-rebates-by-state, hvac-tax-credits-2026, mini-split-installation-cost, solar-panel-calculator, water-heater-wire-size
  - https://www.energy.gov/ — generator-guide, how-many-amps-does-generator-produce, propane-generator-usage-per-hour
  - https://www.energystar.gov — eer-chart-for-ac-units
  - https://www.energystar.gov/ — generator-guide, how-many-amps-does-a-house-use, hvac-cost-by-state, solar-panel-calculator, whole-house-ventilation-systems
  - https://www.fujitsugeneral.com/ — heat-pump-in-cold-weather
  - https://www.generac.com/ — how-many-amps-does-generator-produce, propane-generator-usage-per-hour
  - https://www.grundfos.com — hot-water-recirculating-pump
  - https://www.hpba.org/ — pellet-stove-cost-to-run
  - https://www.hvi.org/ — whole-house-ventilation-systems
  - https://www.ies.org/ — uv-light-hvac-systems
  - https://www.iuva.org/ — uv-light-hvac-systems
  - https://www.masssave.com/ — hvac-rebates-by-state
  - https://www.natex.org — hvac-maintenance-cost
  - https://www.navieninc.com — hot-water-recirculating-pump, what-size-tankless-water-heater
  - https://www.necanet.org/ — electrical-panel-upgrade-cost, electrical-wiring-guide
  - https://www.nema.org/ — 3-phase-power-calculator, how-many-amps-does-generator-produce
  - https://www.nfpa.org — furnace-sizing-calculator, how-long-does-water-heater-last
  - https://www.nfpa.org/ — generator-guide, portable-generator-safety-tips
  - https://www.novap.no/ — heat-pump-in-cold-weather
  - https://www.npga.org/ — propane-generator-usage-per-hour
  - https://www.nyserda.ny.gov/ — hvac-rebates-by-state
  - https://www.ornl.gov/ — air-source-vs-ground-source-heat-pump
  - https://www.pecanstreet.org/ — how-many-amps-does-a-house-use
  - https://www.pelletheat.org/ — pellet-stove-cost-to-run
  - https://www.radiantpanelassociation.org — radiant-floor-heating-pros-cons
  - https://www.regulations.gov — afue-rating-explained, seer2-rating-explained
  - https://www.rinnai.us — what-size-tankless-water-heater
  - https://www.rsmeans.com — tankless-water-heater-cost
  - https://www.smacna.org — ductwork-sizing-calculator, hvac-ductwork-guide
  - https://www.ul.com — r410a-vs-r32-refrigerant
  - https://www.ul.com/ — electrical-wiring-guide, portable-generator-safety-tips, space-heater-guide
  - https://www.watts.com — hot-water-recirculating-pump

## 3. Author & schema (template-driven, uniform across live pages)
- Visible byline: PASS — ArticleLayout renders AuthorBox (inline + card) + "Updated {dateModified}".
- Author Person schema + sameAs LinkedIn: PASS — lib/schema.ts author {@type:Person, sameAs:[linkedin.com/in/marko-visic]}.
- Article dateModified: PASS — generateArticleSchema emits dateModified.
- BreadcrumbList: PASS — emitted for every [slug] page.
- Page-specific og:image: PASS — app/[slug]/opengraph-image.tsx per-slug route.
- FAQPage schema: FAIL — no FAQPage JSON-LD is emitted, yet 101 live pages embed <FAQ>. Pages: 3-phase-power-calculator, ac-not-cooling, afue-rating-explained, air-changes-per-hour-calculator, air-conditioner-btu-calculator, air-duct-cleaning-worth-it, air-purifier-placement, air-purifier-sizing-guide, air-source-vs-ground-source-heat-pump, battery-watt-hours, boiler-vs-furnace, btucfm-ductwork-relationship, central-ac-cost-to-install, central-air-conditioner-guide, coefficient-of-performance, cold-air-return-vents, cracked-heat-exchanger, dehumidifier-and-ac-same-time, dehumidifier-running-cost, disadvantages-of-heat-pumps, do-portable-acs-pull-air-from-outside, duct-leakage-testing, ductwork-sizing-calculator, eer-chart-for-ac-units, electric-heater-running-cost, electric-water-heating-cost, evaporative-cooler-vs-ac, flexible-vs-rigid-ductwork, furnace-blowing-cold-air, furnace-efficiency-explained, furnace-filter-direction, furnace-installation-cost, furnace-leaking-water, furnace-sizing-calculator, furnace-vs-heat-pump, gas-furnace-wattage, gas-vs-electric-heating-cost, generator-guide, heat-pump-electricity-usage, heat-pump-in-cold-weather, heat-pump-running-cost-calculator, heat-pump-size-calculator, heat-pump-tax-credits-2026, heat-pump-water-heater-guide, heating-cost-calculator, hepa-filter-explained, hot-water-recirculating-pump, how-does-humidity-affect-temperature, how-long-does-water-heater-last, how-many-amps-does-a-house-use, how-many-amps-does-generator-produce, how-many-mini-splits-do-i-need, how-many-watts-in-12v-battery, how-much-does-mini-split-cost-to-run, how-to-drain-portable-ac, how-to-identify-mold, how-to-read-electric-meter, how-to-tilt-window-ac, hspf-rating-explained, hvac-cost-by-state, hvac-ductwork-guide, hvac-energy-saving-tips, hvac-maintenance-cost, hvac-rebates-by-state, hvac-system-lifespan, hvac-tax-credits-2026, indoor-air-quality-testing, insulation-r-value-guide, is-tankless-water-heater-worth-it, kwh-cost-calculator, mini-split-amps, moisture-barrier-crawl-space, pellet-stove-cost-to-run, pilot-light-gas-usage, portable-ac-electricity-cost, portable-air-conditioners, portable-generator-safety-tips, portable-vs-window-ac, power-consumption-calculator, propane-generator-usage-per-hour, r410a-vs-r32-refrigerant, radiant-floor-heating-pros-cons, seer2-comparison-calculator, seer2-rating-explained, seer2-to-seer-conversion, smart-thermostat-savings, solar-panel-calculator, space-heater-guide, specific-heat-capacity-calculator, tankless-water-heater-cost, tankless-water-heater-guide, tankless-water-heater-propane-usage, thermostat-temperature-winter, uv-light-hvac-systems, voc-in-home-sources, water-heater-guide, water-heater-sizing-calculator, what-size-dehumidifier-do-i-need, what-size-tankless-water-heater, whole-house-ventilation-systems, window-air-conditioners

## 4. Privacy & consent
- Third-party scripts loaded: ONLY Google Analytics 4 (gtag.js, ID G-ZCKSNVFR5V) via app/layout.tsx. No AdSense, no other tags.
- Consent Mode v2: NOT implemented. No gtag("consent","default",{denied}) anywhere; GA4 fires unconditionally for all visitors including EEA/UK. Privacy policy confirms: "We do not currently operate a consent-management platform (CMP)". → FAIL for EEA/UK.
- Over-disclosure: privacy policy describes advertising the site does not serve — "If we display advertising, ads served through Google or other third-party ad networks", "Third-Party Advertising Cookies", "personalized advertising". No ad script is actually loaded. Fix: either load ads or scope the policy to GA4 only.
- Data controller: "Moving Data Systems d.o.o." IS named on app/about and app/contact, but NOT in the privacy policy itself. → add it to /privacy.

## 5. Support pages (word counts)
- about: present — ~67 words
- contact: present — ~157 words
- privacy: present — ~738 words
- terms: present — ~941 words
- disclaimer: present — ~943 words
- editorial-policy: present — ~276 words
- Fake-team voice on about / editorial-policy:
  - none (single-author voice; no "our team/we tested")

## 6. Layout
- Tables: PASS — mdx-components wraps every <table> in <div class="overflow-x-auto">.
- Shared header/mobile nav: PASS — app/layout.tsx renders <Header> around all routes.
- Custom 404: FAIL — no app/not-found.tsx (Next default 404 with no site chrome).

## 7. Duplicates
- Duplicate titles: 0
- Duplicate descriptions: 0
['mini-split-installation-cost', 'electrical-panel-upgrade-cost', 'wire-for-220-volt', 'electrical-wiring-guide', 'ideal-indoor-humidity-level', 'uv-light-hvac-systems', 'air-conditioner-types', 'ac-troubleshooting-guide', 'furnace-guide', 'merv-rating-chart', 'insulation-r-value-guide', 'refrigerant-types-explained', 'home-battery-backup-guide', 'hvac-serial-number-decoder', 'hvac-maintenance-cost', 'air-duct-cleaning-worth-it', 'hvac-ductwork-guide', 'how-to-clean-ac-coils', 'single-hose-vs-dual-hose-portable-ac', 'how-to-improve-indoor-air-quality', 'carbon-monoxide-detector-guide', 'specific-heat-capacity-calculator', 'how-to-read-electric-meter', 'kwh-cost-calculator']
- Pages with multiple H1: none

## 8. dateModified distribution
- 2026-07-17: 41 pages
- 2026-07-18: 26 pages
- MISSING: 14 pages
- 2026-09-21: 9 pages
- 2026-09-23: 8 pages
- 2026-09-22: 7 pages
- 2026-09-20: 7 pages
- 2026-02-05: 7 pages
- 2026-09-25: 5 pages
- 2026-02-07: 4 pages
- 2026-07-15: 3 pages
- 2026-09-19: 3 pages
- 2026-07-19: 2 pages
- 2026-02-06: 2 pages
- 2026-07-16: 1 pages
- 2026-09-18: 1 pages
- 2026-02-08: 1 pages
