# ARTIFACT_SWEEP.md — post-strip inventory (read-only, no edits applied)

This document inventories every residual artifact detected across the MDX corpus after the internal-tag strip pass, grouped into four categories. The categories are: **leaked-tag** (internal audit labels like `KEEP+` or `PENDING-RESEARCH` still visible in frontmatter or body), **orphaned-syntax** (deletion scars — stray punctuation or fragments left behind when blocks were removed), **broken-markdown** (excised links or personas that left dangling markdown constructs, especially unclosed bold), and **empty-component** (MDX components whose content was stripped, leaving empty shells).

## Confirmation of user-flagged known artifacts

The user pre-flagged two known artifacts on `content/heat-pumps/heat-pump-electricity-usage.mdx`: (1) a `KEEP+` leaked tag, and (2) a stray `;` line. The sweep detected **1 hit** on that file — the `KEEP+` leaked tag on line 8 (frontmatter:contentType). **The stray `;` line was NOT detected by this sweep** — either it has already been removed, or it falls outside the current detector's ruleset and would need a separate targeted check.

## Counts

The sweep produced 62 unique hits across 49 files after dedupe. The breakdown below shows how those hits distribute across the four categories, with leaked classification tags dominating the list at 51 of 62.

- **Total artifacts:** 62
- **leaked-tag:** 51 (internal audit labels leaked into visible content)
- **orphaned-syntax:** 0 (deletion scars from stripped blocks)
- **broken-markdown:** 8 (excised links/personas left dangling markdown)
- **empty-component:** 3 (empty Callouts, empty tables, empty sections)
- **Affected files:** 49

The 51 leaked-tag hits split into two clean subgroups: 33 `KEEP+` values inside `frontmatter:contentType`, and 18 `PENDING-RESEARCH` tokens embedded in body prose and table cells. Orphaned-syntax came back empty in this pass, which likely means the strip script cleaned those up cleanly rather than that none existed. Broken-markdown and empty-component are small tails but include a mix of judgment calls and clear deletions.

## Category 1 — LEAKED CLASSIFICATION TAGS

Sorted with frontmatter-level hits first (highest severity — visible in metadata and possibly consumed by templates or SEO logic), then body-level hits.

| file:line | subtype | field/surface | excerpt | proposed fix |
|---|---|---|---|---|
| content/tankless-water-heaters/is-tankless-water-heater-worth-it.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with a real contentType value ('guide', 'comparison', 'ranking', 'calculator', 'review', or 'explainer') matching the article's shape. |
| content/tankless-water-heaters/electric-vs-gas-tankless.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'comparison' (electric vs gas). |
| content/tankless-water-heaters/hot-water-recirculating-pump.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'guide' or 'explainer'. |
| content/tankless-water-heaters/tankless-water-heater-cost.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'guide' or 'calculator'. |
| content/tankless-water-heaters/tankless-water-heater-breaker-size.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'reference' or 'calculator'. |
| content/tankless-water-heaters/tankless-water-heater-electricity.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'calculator' or 'guide'. |
| content/tankless-water-heaters/tankless-water-heater-propane-usage.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'calculator' or 'guide'. |
| content/tankless-water-heaters/tankless-water-heater-wire-size.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'reference' or 'calculator'. |
| content/tankless-water-heaters/tankless-water-heater-guide.mdx:8 | KEEP+ | frontmatter:contentType | `role: "pillar" \| priority: "P1" \| contentType: "KEEP+"` | Replace KEEP+ with 'guide' (pillar page). |
| content/electrical/water-heater-breaker-size.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'reference' or 'calculator'. |
| content/electrical/power-consumption-calculator.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'calculator'. |
| content/electrical/water-heater-wire-size.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'reference' or 'calculator'. |
| content/electrical/water-heater-wattage.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'reference' or 'calculator'. |
| content/electrical/water-heater-amps.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'reference' or 'calculator'. |
| content/electrical/wire-for-220-volt.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'reference' or 'guide'. |
| content/electrical/3-phase-power-calculator.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'calculator'. |
| content/electrical/10-2-or-10-3-wire-for-ac.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'comparison' or 'reference'. |
| content/electrical/wire-gauge-chart.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'reference'. |
| content/hvac-brands/goodman-ac-age-serial-number.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'reference' or 'guide'. |
| content/hvac-brands/carrier-hvac-age-serial-number.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'reference' or 'guide'. |
| content/hvac-brands/what-size-generator-for-5-ton-ac.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'calculator' or 'guide'. |
| content/space-heaters/electric-heater-running-cost.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'calculator' or 'guide'. |
| content/space-heaters/battery-operated-heaters.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'guide' or 'explainer'. |
| content/heat-pumps/disadvantages-of-heat-pumps.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'explainer' or 'guide'. |
| content/heat-pumps/heat-pump-electricity-usage.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'calculator' or 'guide' (confirmed live artifact). |
| content/generators/how-long-generator-on-5-gallons.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'calculator' or 'guide'. |
| content/generators/how-long-do-generators-last.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'guide' or 'explainer'. |
| content/generators/what-size-generator-for-fridge.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'calculator' or 'guide'. |
| content/generators/propane-generator-usage-per-hour.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'calculator' or 'guide'. |
| content/generators/natural-gas-generator-running-cost.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'calculator' or 'guide'. |
| content/generators/how-many-amps-does-generator-produce.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'calculator' or 'reference'. |
| content/generators/generator-cost-per-kwh.mdx:8 | KEEP+ | frontmatter:contentType | `contentType: "KEEP+"` | Replace KEEP+ with 'calculator' or 'guide'. |
| content/mini-split-air-conditioners/senville-mini-split-reviews.mdx:47 | PENDING-RESEARCH | body:prose | "Other Senville SENL variants (09CD, 18CD, 24CD) and the AURA-12CD line carry the same R-454B refrigerant and warranty structure, but per-SKU SEER2 / HSPF2 figures need an AHRI cert pull before publishing — those rows are \`PENDING-RESEARCH\`." | Rewrite the sentence to remove the internal placeholder token — either verify figures and drop the note, or say plainly that per-SKU SEER2/HSPF2 figures are not yet published/available. |
| content/mini-split-air-conditioners/mini-split-for-bedroom.mdx:34 | PENDING-RESEARCH | body:table cell (SEER2) | `\| 2 \| Daikin Aurora 09 \| 9,000 \| 19 dB \| PENDING-RESEARCH \| Yes \| $1,300–$1,700 \| $2,800–$3,800 \|` | Fill in verified SEER2 from AHRI cert or replace token with '—' + a footnote, or drop the row until verified. |
| content/mini-split-air-conditioners/best-mini-split-for-garage.mdx:64 | PENDING-RESEARCH | body:table cell (SEER2) | `\| 1 \| MrCool DIY 4th Gen 18K \| 18,000 \| PENDING-RESEARCH \| $1,300–$1,700 \| Best value, DIY install \|` | Fill SEER2 from AHRI cert or replace token with '—'. |
| content/mini-split-air-conditioners/best-mini-split-for-garage.mdx:65 | PENDING-RESEARCH | body:table cell (SEER2) | `\| 2 \| MrCool DIY 4th Gen 24K \| 24,000 \| PENDING-RESEARCH \| $1,500–$2,000 \| Large garages, DIY \|` | Fill SEER2 from AHRI cert or replace token with '—'. |
| content/mini-split-air-conditioners/best-mini-split-for-garage.mdx:66 | PENDING-RESEARCH | body:table cell (SEER2) | `\| 3 \| Senville SENL-18CD \| 18,000 \| PENDING-RESEARCH \| $800–$1,100 \| Budget option \|` | Fill SEER2 from AHRI cert or replace token with '—'. |
| content/mini-split-air-conditioners/best-mini-split-for-garage.mdx:67 | PENDING-RESEARCH | body:table cell (SEER2) | `\| 4 \| Senville SENL-24CD \| 24,000 \| PENDING-RESEARCH \| $1,000–$1,400 \| Budget large garage \|` | Fill SEER2 from AHRI cert or replace token with '—'. |
| content/mini-split-air-conditioners/best-mini-split-for-garage.mdx:68 | PENDING-RESEARCH | body:table cell (SEER2) | `\| 5 \| Fujitsu RLS3 18K \| 18,000 \| PENDING-RESEARCH \| $1,600–$2,000 \| Premium, quiet \|` | Fill SEER2 from AHRI cert or replace token with '—'. |
| content/mini-split-air-conditioners/smallest-mini-splits.mdx:37 | PENDING-RESEARCH | body:table cell (SEER2) | `\| Senville \| SENL-09CD \| 9,000 \| PENDING-RESEARCH \| 28 dB \| $500–$750 \| Cheapest small unit \|` | Fill SEER2 from AHRI cert or replace token with '—'. |
| content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx:35 | PENDING-RESEARCH | body:table cells (2 tokens) | `\| Emura \| Design-conscious \| PENDING-RESEARCH \| PENDING-RESEARCH \| 21 dB \| 5°F \| $1,400–$1,800 \|` | Fill both SEER2 and HSPF2 cells from AHRI cert or replace with '—'. |
| content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx:36 | PENDING-RESEARCH | body:table cells (2 tokens) | `\| Quaternity \| Humidity control \| PENDING-RESEARCH \| PENDING-RESEARCH \| 22 dB \| 5°F \| $1,800–$2,400 \|` | Fill both cells from AHRI cert or replace with '—'. |
| content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx:37 | PENDING-RESEARCH | body:table cells (2 tokens) | `\| Fit \| Value/budget \| PENDING-RESEARCH \| PENDING-RESEARCH \| 24 dB \| 15°F \| $1,000–$1,400 \|` | Fill both cells from AHRI cert or replace with '—'. |
| content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx:38 | PENDING-RESEARCH | body:table cells (2 tokens) | `\| Ceiling cassette \| Commercial/residential \| PENDING-RESEARCH \| PENDING-RESEARCH \| 27 dB \| 5°F \| $1,800–$2,500 \|` | Fill both cells from AHRI cert or replace with '—'. |
| content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx:39 | PENDING-RESEARCH | body:table cells (2 tokens) | `\| Slim duct \| Concealed install \| PENDING-RESEARCH \| PENDING-RESEARCH \| 29 dB \| 5°F \| $1,600–$2,200 \|` | Fill both cells from AHRI cert or replace with '—'. |
| content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx:75 | PENDING-RESEARCH | body:comparison table (SEER2 row) | `\| SEER2 \| 20.0–21.0 (verified) \| PENDING-RESEARCH \| PENDING-RESEARCH \|` | Fill Mitsubishi and Fujitsu SEER2 columns from AHRI cert or replace with '—'. |
| content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx:76 | PENDING-RESEARCH | body:comparison table (HSPF2 row) | `\| HSPF2 \| 10.2 (verified) \| PENDING-RESEARCH \| PENDING-RESEARCH \|` | Fill Mitsubishi and Fujitsu HSPF2 columns from AHRI cert or replace with '—'. |
| content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx:78 | PENDING-RESEARCH | body:comparison table (min heat temp) | `\| Min heating temp \| -13°F \| -13°F (H2i marketing) \| PENDING-RESEARCH \|` | Fill Fujitsu min heating temp from spec sheet or replace with '—'. |
| content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx:80 | PENDING-RESEARCH | body:comparison table (refrigerant) | `\| Refrigerant \| R-32 \| R-410A on legacy stock; current new Mitsubishi lineup is R-454B \| PENDING-RESEARCH \|` | Fill Fujitsu refrigerant cell (R-410A/R-32) from spec sheet. |
| content/mini-split-air-conditioners/mini-split-brands-ranked.mdx:125 | PENDING-RESEARCH | body:ranking table row (Bosch) | `\| Bosch (Climate 5000) \| PENDING-RESEARCH \| Prior 27 SEER2 claim needs verification. \|` | Verify Bosch Climate 5000 SEER2 from AHRI cert and fill, or drop row until verified. |
| content/mini-split-air-conditioners/mini-split-brands-ranked.mdx:128 | PENDING-RESEARCH | body:ranking table row (Pioneer) | `\| Pioneer (WYS series) \| PENDING-RESEARCH \| Prior SEER2 claims need AHRI cert pull. \|` | Verify Pioneer WYS SEER2 from AHRI cert and fill, or drop row until verified. |

The 33 `KEEP+` values sit consistently on line 8 of each file's frontmatter — an unambiguous find/replace target once each page's contentType is decided. The 18 `PENDING-RESEARCH` body tokens cluster tightly in `mini-split-air-conditioners/` (17 of 18) and all reflect the same underlying gap: AHRI-verified SEER2/HSPF2 data pulls that were deferred.

## Category 2 — ORPHANED SYNTAX

No orphaned-syntax hits were detected in this sweep. This does **not** rule out the user-reported stray `;` line on `heat-pump-electricity-usage.mdx` — it means the current detector rules did not surface it and a targeted check for lone-punctuation lines is worth running separately.

| file:line | subtype | field/surface | excerpt | proposed fix |
|---|---|---|---|---|
| — | — | — | — | — |

## Category 3 — BROKEN MARKDOWN

All 8 hits are the same shape: a leading `**` opens a footnote-style annotation directly under a table but the bold never closes, so MDX will either render as unclosed bold or swallow the following block into bold formatting. Each fix is flagged **NEEDS JUDGMENT** because the site may use this leading-`**` pattern intentionally as a footnote reference marker — the correct escape is `\*\*` or wrapping in `<sup>`, but the decision should be consistent across the corpus.

| file:line | subtype | field/surface | excerpt | proposed fix |
|---|---|---|---|---|
| content/dehumidifiers/dehumidifier-running-cost.mdx:98 | unclosed-bold | body | `*Assumes 10 hrs/day for portables at $0.17/kWh, 30 days/month, 6 months/year. \\ **Whole-house units estimated at 6 hrs/day due to higher efficiency and duct integration.` | Line 99 begins with `**` but never closes — MDX will render as unclosed bold. Intent appears to be footnote for `**` rows in the table above. Replace leading `**` with `\*\*` or restructure as `<sup>**</sup> Whole-house units…` — NEEDS JUDGMENT. |
| content/dehumidifiers/dehumidifier-electricity-usage.mdx:52 | unclosed-bold | body | `*Assumes 10 hours/day operation for portables, 24 hours for Peltier units. \\ **Whole-house units run fewer hours/day (4–7 hrs) due to higher capacity and continuous operation.` | Line 53 leading `**` begins unclosed bold. Same footnote pattern; escape to `\*\*` or wrap in `<sup>`. NEEDS JUDGMENT. |
| content/heat-pumps/heat-pump-vs-ac.mdx:65 | unclosed-bold | body | `*Total system includes installation. AC cost includes a mid-range gas furnace.* \\ **Based on 2,000 sq ft home, zone 4, $0.14/kWh, $1.30/therm gas.*` | Line 66 starts with `**` but closes with single `*` — bold never closes. Change opening `**` to `\*\*` or wrap footnote in `<sup>`. NEEDS JUDGMENT. |
| content/heat-pumps/best-mini-split-heat-pumps.mdx:67 | unclosed-bold | body | `**Installed cost includes professional installation except where marked with *, which indicates DIY install (equipment cost only).*` | Odd asterisk count: opening `**` plus a stray `*` mid-sentence and a closing `*`. MDX will render as broken bold/italic. Escape leading `**` → `\*\*` and mid/end `*` → `\*`. NEEDS JUDGMENT. |
| content/heat-pumps/air-source-vs-ground-source-heat-pump.mdx:130 | unclosed-bold | body | `*25-year comparison assumes one air-source replacement at year 17 ($6,000–$8,000) but geothermal equipment still running. **30-year comparison assumes two air-source replacements.` | Mid-paragraph `**` starts unclosed bold. Escape `\*\*` or wrap as `<sup>**</sup>`. NEEDS JUDGMENT (footnote pattern). |
| content/heat-pumps/heat-pump-in-cold-weather.mdx:86 | unclosed-bold | body | `*Cost assumes 3-ton unit, $0.14/kWh. **Only select extreme-cold models reach −22 °F; verify the specific model's minimum heating operating temperature.` | Mid-paragraph `**` opens bold that never closes. Escape or wrap footnote marker. NEEDS JUDGMENT. |
| content/energy-costs/electric-water-heating-cost-by-state.mdx:135 | unclosed-bold | body | `*At national average rate of $0.168/kWh. **Depends on number of units and usage.` | `**Depends` opens unclosed bold. Escape `\*\*` or wrap. NEEDS JUDGMENT. |
| content/energy-costs/how-many-kwh-per-day-is-normal.mdx:229 | unclosed-bold | body | `*Includes all-electric homes; gas-heated homes use ~1.5 kWh/day for the furnace blower. **Averaged over the full year; summer peak is much higher.` | `**Averaged` opens unclosed bold. Escape `\*\*` or wrap. NEEDS JUDGMENT. |

## Category 4 — EMPTY / STRANDED COMPONENTS

All 3 hits are empty `<SourcesBox sources={[ ]} />` shells left after source references were stripped. Two of them still have the preceding `## Sources` heading and should be removed together with the heading; the third sits with no heading directly between the FAQ close and `RelatedArticles`.

| file:line | subtype | field/surface | excerpt | proposed fix |
|---|---|---|---|---|
| content/electrical/10-2-or-10-3-wire-for-ac.mdx:286 | empty-sourcesbox | body | `]} /> \\ <SourcesBox sources={[ \\ ]} /> \\ <RelatedArticles articles={[` | Delete empty SourcesBox at lines 286–287 (no preceding `## Sources` heading; sits directly between FAQ close and RelatedArticles). |
| content/furnaces-heating/furnace-blowing-cold-air.mdx:187 | empty-section | section-under-heading-Sources | `]} /> \\ ## Sources \\ <SourcesBox sources={[ \\ ]} /> \\ ## Related Articles` | Delete section heading + empty component at lines 185–188 (`## Sources` heading and empty SourcesBox body). |
| content/furnaces-heating/gas-furnace-wattage.mdx:151 | empty-section | section-under-heading-Sources | `]} /> \\ ## Sources \\ <SourcesBox sources={[ \\ ]} /> \\ ## Related Articles` | Delete section heading + empty component at lines 149–152 (`## Sources` heading and empty SourcesBox body). |

## Files touched (sorted alphabetical, all categories combined)

The 49 unique files span 9 top-level content clusters, with the heaviest concentration in `tankless-water-heaters/` (9), `electrical/` (10), `generators/` (7), and `mini-split-air-conditioners/` (7).

- content/dehumidifiers/dehumidifier-electricity-usage.mdx
- content/dehumidifiers/dehumidifier-running-cost.mdx
- content/electrical/10-2-or-10-3-wire-for-ac.mdx
- content/electrical/3-phase-power-calculator.mdx
- content/electrical/power-consumption-calculator.mdx
- content/electrical/water-heater-amps.mdx
- content/electrical/water-heater-breaker-size.mdx
- content/electrical/water-heater-wattage.mdx
- content/electrical/water-heater-wire-size.mdx
- content/electrical/wire-for-220-volt.mdx
- content/electrical/wire-gauge-chart.mdx
- content/energy-costs/electric-water-heating-cost-by-state.mdx
- content/energy-costs/how-many-kwh-per-day-is-normal.mdx
- content/furnaces-heating/furnace-blowing-cold-air.mdx
- content/furnaces-heating/gas-furnace-wattage.mdx
- content/generators/generator-cost-per-kwh.mdx
- content/generators/how-long-do-generators-last.mdx
- content/generators/how-long-generator-on-5-gallons.mdx
- content/generators/how-many-amps-does-generator-produce.mdx
- content/generators/natural-gas-generator-running-cost.mdx
- content/generators/propane-generator-usage-per-hour.mdx
- content/generators/what-size-generator-for-fridge.mdx
- content/heat-pumps/air-source-vs-ground-source-heat-pump.mdx
- content/heat-pumps/best-mini-split-heat-pumps.mdx
- content/heat-pumps/disadvantages-of-heat-pumps.mdx
- content/heat-pumps/heat-pump-electricity-usage.mdx
- content/heat-pumps/heat-pump-in-cold-weather.mdx
- content/heat-pumps/heat-pump-vs-ac.mdx
- content/hvac-brands/carrier-hvac-age-serial-number.mdx
- content/hvac-brands/goodman-ac-age-serial-number.mdx
- content/hvac-brands/what-size-generator-for-5-ton-ac.mdx
- content/mini-split-air-conditioners/best-mini-split-for-garage.mdx
- content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx
- content/mini-split-air-conditioners/mini-split-brands-ranked.mdx
- content/mini-split-air-conditioners/mini-split-for-bedroom.mdx
- content/mini-split-air-conditioners/senville-mini-split-reviews.mdx
- content/mini-split-air-conditioners/smallest-mini-splits.mdx
- content/space-heaters/battery-operated-heaters.mdx
- content/space-heaters/electric-heater-running-cost.mdx
- content/tankless-water-heaters/electric-vs-gas-tankless.mdx
- content/tankless-water-heaters/hot-water-recirculating-pump.mdx
- content/tankless-water-heaters/is-tankless-water-heater-worth-it.mdx
- content/tankless-water-heaters/tankless-water-heater-breaker-size.mdx
- content/tankless-water-heaters/tankless-water-heater-cost.mdx
- content/tankless-water-heaters/tankless-water-heater-electricity.mdx
- content/tankless-water-heaters/tankless-water-heater-guide.mdx
- content/tankless-water-heaters/tankless-water-heater-propane-usage.mdx
- content/tankless-water-heaters/tankless-water-heater-wire-size.mdx
- content/hvac-brands/what-size-generator-for-5-ton-ac.mdx

## Suggested fix order

1. **Frontmatter leaked-tags first** — the 33 `KEEP+` values on line 8 of each file are visible in metadata and are almost certainly consumed by page templates, breadcrumbs, or SEO logic. Fix these first because they may be silently affecting indexation or category routing. Mechanically simple: pick the correct contentType per file (proposed values are already listed in the table above).
2. **Empty-components** — the 3 empty `<SourcesBox>` shells have direct layout impact (empty section headings and blank components on live pages). Small, obvious deletions with no judgment required.
3. **Orphaned-syntax** — none surfaced by this sweep; run a targeted check for the user-reported stray `;` on `heat-pump-electricity-usage.mdx` before closing the loop.
4. **Broken-markdown** — the 8 unclosed-bold footnote patterns are the last polish pass and each needs a judgment call (escape vs. `<sup>` wrap) that should be made consistently across the corpus rather than file by file.
5. **Body-level `PENDING-RESEARCH` tokens** — the 18 body-level leaked tags are technically Category 1 but functionally block on external data (AHRI cert pulls); handle these as a separate research task, not a text-edit sweep.
