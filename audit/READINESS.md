# HVACBase readiness scan (read-only) — after Consent Mode v2 / privacy / 404 / citation round

Live MDX pages: 141. No network here (external URL status is the Mac step).

## Summary (PASS/FAIL)
1. Fake authority: PASS (12 phrase matches, 0 genuine — remainder is hire-a-pro advice / contractor questions / false positives)
2. External citations: 169 URLs -> audit/external-urls.txt (schema.org excluded as JSON-LD); bare-homepage citations 14 (was 71). SourcesBox/externalLinks bare-homepage entries removed except the 5 tool homepages; gov/standards kept as in-text mentions; manufacturer links removed entirely (0 on live pages, Carrier warranty-lookup kept). CITE-1/CITE-2: retired DOE Energy Saver pages -> Home Cooling 101 PDF, ACCA soft-404s normalized, dead links fixed, impossible/manufacturer citations dropped; the audit now flags manufacturer/retail domains, writes audit/attribution-check.csv (175 org-number sentences), and flags "% per degree" claims.
3. Author & schema: byline / author Person + sameAs LinkedIn / Article dateModified / BreadcrumbList / per-page og:image all PASS · FAQPage FAIL (still not emitted; 99 FAQ pages) — the one item not addressed this round.
4. Privacy & consent: Consent Mode v2 PASS · data-controller-in-privacy PASS · ad-serving-claims-removed PASS
5. Support pages: PASS (all 6 present; single-author voice, no fake-team)
6. Layout: tables-wrapped PASS · shared header PASS · custom 404 PASS
7. Duplicates: dup titles PASS (0) · dup descriptions PASS (0) · H1 PASS (one per page)
8. Dates: PASS (top dateModified 2026-07-17 = 41/141; 14 missing)

---
## 4. Privacy & consent (this round)
- Consent Mode v2: IMPLEMENTED. gtag consent defaults run before config: ad_storage/ad_user_data/ad_personalization denied for all regions; analytics_storage denied for the EEA+UK+CH region list with wait_for_update 500; analytics_storage granted elsewhere. A stored acceptance (hvac_consent cookie) re-grants before config. middleware.ts sets hvac_region from x-vercel-ip-country; ConsentBanner (Accept/Reject, equal prominence, /privacy link, 12-month cookie, fixed bottom, keyboard accessible) shows for EEA/UK/CH; a Cookie settings footer link reopens it.
- Only third-party script: GA4 (G-ZCKSNVFR5V).
- Data controller in /privacy: PASS — Moving Data Systems d.o.o., Smolnik 62, 2342 Ruše, Slovenia, info@hvacbase.org.
- Ad-serving claims in /privacy: none (removed; only negations remain). Disclaimer now states the site does not currently display advertising.

## 6. Layout
- custom 404: PASS (app/not-found.tsx — robots noindex, shared header/footer via root layout, links to calculators/articles/ac-not-cooling/btu/furnace/heat-pump, returns 404, not in sitemap).

## 2. Remaining bare homepages
  - https://ahamverifide.org/ — air-changes-per-hour-calculator, air-purifier-guide, air-purifier-placement, air-purifier-sizing-guide
  - https://ashp.neep.org — heat-pump-size-calculator, how-many-mini-splits-do-i-need
  - https://buildings.lbl.gov/ — heat-pump-electricity-usage, heat-pump-in-cold-weather
  - https://igshpa.org/ — air-source-vs-ground-source-heat-pump
  - https://neep.org/ — air-source-vs-ground-source-heat-pump
  - https://pvwatts.nrel.gov/ — solar-panel-calculator
  - https://www.ahamverifide.org/ — how-to-improve-indoor-air-quality
  - https://www.ahridirectory.org — furnace-sizing-calculator, heat-pump-in-cold-weather, heat-pump-size-calculator, heat-pump-water-heater-guide, how-long-does-water-heater-last, how-many-mini-splits-do-i-need, how-much-does-mini-split-cost-to-run, hspf-rating-explained, is-tankless-water-heater-worth-it, mini-split-air-conditioners, mini-split-amps, minimum-seer-rating-by-state, portable-ac-electricity-cost, portable-air-conditioners, seer2-comparison-calculator, seer2-to-seer-conversion, tankless-water-heater-cost, tankless-water-heater-guide, water-heater-guide, water-heater-sizing-calculator, what-size-tankless-water-heater, window-air-conditioners
  - https://www.ahridirectory.org/ — air-conditioner-types, air-source-vs-ground-source-heat-pump, central-ac-cost-to-install, central-air-conditioner-guide, disadvantages-of-heat-pumps, eer-chart-for-ac-units, furnace-efficiency-explained, furnace-guide, furnace-vs-heat-pump, heat-pump-cost-to-install, heat-pump-electricity-usage, heat-pump-guide, heat-pump-in-cold-weather, heat-pump-running-cost-calculator, hvac-cost-by-state, hvac-system-lifespan, seer2-rating-explained
  - https://www.ashrae.org — furnace-sizing-calculator, water-heater-sizing-calculator, what-size-tankless-water-heater
  - https://www.dsireusa.org — heat-pump-guide, heat-pump-in-cold-weather, heat-pump-water-heater-guide, mini-split-air-conditioners, tankless-water-heater-cost, water-heater-guide
  - https://www.dsireusa.org/ — central-ac-cost-to-install, furnace-installation-cost, heat-pump-cost-to-install, heat-pump-tax-credits-2026, home-battery-backup-guide, hvac-rebates-by-state, hvac-tax-credits-2026, mini-split-installation-cost, solar-panel-calculator, water-heater-wire-size
  - https://www.nfpa.org — furnace-sizing-calculator
  - https://www.ornl.gov/ — air-source-vs-ground-source-heat-pump

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
