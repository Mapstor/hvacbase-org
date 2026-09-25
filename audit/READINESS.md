# HVACBase readiness scan (read-only)

Live MDX pages: 141. No network here — external URL status is Marko's Mac step.

## Summary (PASS/FAIL)
1. Fake authority: PASS (13 phrase matches, 0 genuine first-party claims — rest are hire-a-pro advice / contractor questions / false positives)
2. External citations: 259 unique URLs -> audit/external-urls.txt; bare-homepage citations: 71
3. Author & schema: byline PASS · author Person+sameAs LinkedIn PASS · Article dateModified PASS · BreadcrumbList PASS · per-page og:image PASS · FAQPage FAIL (missing on all 99 FAQ pages)
4. Privacy & consent: Consent Mode v2 FAIL (GA4 fires for all incl EEA/UK) · data-controller-in-privacy FAIL (named on about/contact only) · ad-disclosure-vs-loaded FAIL (policy describes ads not served)
5. Support pages: PASS (all 6 present)
6. Layout: tables-wrapped PASS · shared header PASS · custom 404 FAIL (no app/not-found.tsx)
7. Duplicates: dup titles PASS (0) · dup descriptions PASS (0) · H1 PASS (layout renders exactly one <h1> per page, verified in rendered HTML)
8. Dates: PASS (most common dateModified 2026-07-17 = 41/141 pages; 14 missing)

---
## 1. Fake authority (file:line) — all reviewed as legitimate; none are fabricated first-party authority
- content/air-conditioners/ac-not-cooling.mdx:155 [certified technician] You can't diagnose or fix this yourself, and it's not a gray area, **under EPA
- content/air-conditioners/ac-not-cooling.mdx:228 [certified technician] answer: "Watch for ice on the coils, a hissing sound near the lines, oily resi
- content/refrigerants/r410a-vs-r32-refrigerant.mdx:208 [our technicians] 1. "Have your technicians completed A2L refrigerant training?" (Look for manuf
- content/hvac-brands/central-ac-cost-to-install.mdx:57 [certified technician] Refrigerant recovery and charging legally require an EPA Section 608-certified
- content/hvac-brands/central-ac-cost-to-install.mdx:119 [our lab] 5. What's the warranty on the equipment, and separately on your labor?
- content/hvac-maintenance/hvac-maintenance-checklist.mdx:35 [licensed technician] **The core of HVAC maintenance is simple: check your filter monthly, keep the 
- content/hvac-maintenance/hvac-maintenance-checklist.mdx:65 [licensed technician] **For gas furnaces, one professional task is a genuine safety must:** a **heat
- content/hvac-maintenance/hvac-maintenance-checklist.mdx:97 [licensed technician] You can handle filter changes, clearing and gently cleaning the outdoor unit, 
- content/hvac-maintenance/hvac-maintenance-checklist.mdx:106 [licensed technician] A cracked heat exchanger in a gas furnace can leak carbon monoxide into your h
- content/hvac-maintenance/hvac-maintenance-cost.mdx:211 [certified technician] - NATE-certified technicians (North American Technician Excellence)
- content/hvac-maintenance/hvac-maintenance-cost.mdx:280 [licensed technician] answer: "Usually not. A thorough tune-up requires 45-90 minutes of a licensed 
- content/hvac-maintenance/how-to-clean-ac-coils.mdx:123 [certified technician] **Call a professional if:** the coil has heavy biological growth or deep matte
- app/disclaimer/page.tsx:363 [reviewed by] HVACBase.org may display third-party programmatic advertisements. When such ad

## 2. External citations
- Full list: audit/external-urls.txt (259).
- Bare-homepage citations (71):
  - https://aeroseal.com/ — duct-leakage-testing
  - https://ahamverifide.org/ — air-changes-per-hour-calculator, air-purifier-guide, air-purifier-placement, air-purifier-sizing-guide
  - https://ashp.neep.org — heat-pump-size-calculator, how-many-mini-splits-do-i-need
  - https://battlebornbatteries.com/ — how-many-watts-in-12v-battery
  - https://buildings.lbl.gov — hvac-ductwork-guide
  - https://buildings.lbl.gov/ — duct-leakage-testing, heat-pump-electricity-usage, heat-pump-in-cold-weather
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
  - https://www.ahridirectory.org — furnace-sizing-calculator, heat-pump-in-cold-weather, heat-pump-size-calculator, heat-pump-water-heater-guide, how-long-does-water-heater-last, how-many-mini-splits-do-i-need, how-much-does-mini-split-cost-to-run, hspf-rating-explained, is-tankless-water-heater-worth-it, mini-split-air-conditioners, mini-split-amps, minimum-seer-rating-by-state, portable-ac-electricity-cost, portable-air-conditioners, seer2-comparison-calculator, seer2-to-seer-conversion, tankless-water-heater-cost, tankless-water-heater-guide, water-heater-guide, water-heater-sizing-calculator, what-size-tankless-water-heater, window-air-conditioners
  - https://www.ahridirectory.org/ — air-conditioner-types, air-source-vs-ground-source-heat-pump, central-ac-cost-to-install, central-air-conditioner-guide, disadvantages-of-heat-pumps, eer-chart-for-ac-units, furnace-efficiency-explained, furnace-guide, furnace-vs-heat-pump, heat-pump-cost-to-install, heat-pump-electricity-usage, heat-pump-guide, heat-pump-in-cold-weather, heat-pump-running-cost-calculator, hvac-cost-by-state, hvac-system-lifespan, seer2-rating-explained
  - https://www.ahrinet.org — afue-rating-explained, coefficient-of-performance, eer-chart-for-ac-units, hvac-maintenance-cost, r410a-vs-r32-refrigerant, seer2-to-seer-conversion
  - https://www.ahrinet.org/ — how-to-reduce-hvac-noise, hvac-noise-levels-explained
  - https://www.airnow.gov — do-portable-acs-pull-air-from-outside
  - https://www.ashrae.org — coefficient-of-performance, dehumidifier-and-ac-same-time, furnace-sizing-calculator, how-does-humidity-affect-temperature, how-to-clean-ac-coils, hvac-ductwork-guide, seer2-rating-explained, seer2-to-seer-conversion, water-heater-sizing-calculator, what-size-dehumidifier-do-i-need, what-size-tankless-water-heater
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

## 3. Author & schema (template-driven, uniform)
- byline PASS (ArticleLayout AuthorBox + "Updated {dateModified}") · author Person+sameAs LinkedIn PASS (lib/schema.ts, linkedin.com/in/marko-visic) · dateModified PASS · BreadcrumbList PASS · per-slug og:image PASS (app/[slug]/opengraph-image.tsx)
- FAQPage schema FAIL — not emitted; 99 live pages embed <FAQ>.

## 4. Privacy & consent
- Third-party scripts: ONLY GA4 (gtag.js, G-ZCKSNVFR5V) in app/layout.tsx. No AdSense/other.
- Consent Mode v2: NOT implemented (no gtag("consent","default",{denied})); GA4 fires for all incl EEA/UK. Privacy: "We do not currently operate a consent-management platform (CMP)". FAIL.
- Privacy over-discloses ads not served ("ads served through Google or other third-party ad networks", "Third-Party Advertising Cookies", "personalized advertising") — no ad script loads.
- Data controller "Moving Data Systems d.o.o." named on /about and /contact, NOT in /privacy.

## 5. Support pages (word counts)
- about: ~295 words
- contact: ~157 words
- privacy: ~738 words
- terms: ~941 words
- disclaimer: ~943 words
- editorial-policy: ~276 words
- Fake-team voice on about/editorial-policy: none (single-author voice)

## 6. Layout
- Tables wrapped in overflow-x-auto (mdx-components): PASS
- Shared <Header> on all routes (app/layout.tsx): PASS
- Custom 404: FAIL (no app/not-found.tsx)

## 7. Duplicates
- Duplicate titles: 0
- Duplicate descriptions: 0
- H1: every page renders exactly one <h1> (layout title; body-# does not double up — verified in rendered HTML).

## 8. dateModified distribution
- 2026-07-17: 41
- 2026-07-18: 25
- MISSING: 14
- 2026-09-21: 9
- 2026-09-23: 8
- 2026-09-22: 7
- 2026-09-20: 7
- 2026-09-25: 7
- 2026-02-05: 7
- 2026-02-07: 4
- 2026-09-19: 3
- 2026-07-15: 2
- 2026-07-19: 2
- 2026-02-06: 2
- 2026-07-16: 1
- 2026-09-18: 1
- 2026-02-08: 1
