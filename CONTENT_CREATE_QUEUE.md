# Content Create Queue — Batch 1

> **Human-planned backlog, NOT an action queue.** These 57 unique topics were referenced by broken hub tiles that have now been hidden (grid tiles removed) per `AUDIT_BATCH1_PREVIEW.md`. Do not batch-generate. Each entry is a candidate for future MDX authoring — prioritise by search intent, cluster fit, and editorial capacity. Shipping stubs violates Google Search Essentials (thin content) and Marko's portfolio quality bar.

Source: `AUDIT_BATCH1_PREVIEW.md` (class-b CREATE rows, 58 edges → 57 unique topics; `how-to-install-smart-thermostat` and `furnace-not-heating` each appeared twice).

Format: `topic | hub that wanted it | suggested slug (from broken href)`

| Topic | Hub | Suggested slug |
|---|---|---|
| AC freezing up (ice on coils, low refrigerant, airflow restriction) | troubleshooting | ac-freezing-up |
| AC short cycling (oversized unit, thermostat, refrigerant leak) | troubleshooting | ac-short-cycling |
| AC won't turn on (power, capacitor, control board) | troubleshooting | ac-wont-turn-on |
| Furnace not heating (pilot, ignitor, gas valve) | troubleshooting + how-to | furnace-not-heating |
| Furnace short cycling (dirty filter, oversized furnace) | troubleshooting | furnace-short-cycling |
| Heat pump not heating (defrost, reversing valve, refrigerant) | troubleshooting | heat-pump-not-heating |
| Uneven heating between rooms (ducts, insulation, sizing) | troubleshooting | uneven-heating |
| Banging / clanking HVAC noises | troubleshooting | banging-noises |
| Squealing / screeching HVAC noises | troubleshooting | squealing-noises |
| Clicking / ticking HVAC noises | troubleshooting | clicking-noises |
| Humming / buzzing HVAC noises | troubleshooting | humming-noises |
| AC water leak (clogged drain, frozen coils, pan damage) | troubleshooting | ac-water-leak |
| High indoor humidity (oversized AC, poor ventilation) | troubleshooting | high-humidity |
| Frozen condensate line (cold weather, insulation, pitch) | troubleshooting | frozen-condensate |
| HVAC system won't turn off (stuck thermostat, relay, control board) | troubleshooting | hvac-wont-turn-off |
| Intermittent HVAC operation (loose connections, failing components) | troubleshooting | intermittent-hvac-operation |
| Weak HVAC airflow (dirty filter, duct leaks, blower) | troubleshooting | weak-airflow |
| No air from vents (blower, duct blockage, damper) | troubleshooting | no-air-from-vents |
| Hot/cold spots in the home (duct design, insulation, balance) | troubleshooting | hot-cold-spots |
| Dusty or smelly air from vents (dirty ducts, mold, filter) | troubleshooting | dusty-smelly-air |
| HVAC error code database (brand-indexed lookup) | troubleshooting | hvac-error-code-database |
| Interactive HVAC troubleshooting flowchart | troubleshooting | hvac-troubleshooting-flowchart |
| HVAC repair cost estimator tool | troubleshooting | hvac-repair-cost-estimator |
| Best boilers (brand rankings) | buying-guides | best-boilers |
| Best whole-house air purifiers | buying-guides | best-whole-house-air-purifiers |
| Best whole-house humidifiers | buying-guides | best-whole-house-humidifiers |
| Zone-control HVAC systems (buying guide) | buying-guides | zone-control-systems |
| Lennox vs Goodman comparison | buying-guides | lennox-vs-goodman |
| Best budget HVAC brands | buying-guides | best-budget-hvac-brands |
| DIY vs professional HVAC install decision guide | buying-guides | diy-vs-professional-hvac |
| HVAC financing options guide | buying-guides | hvac-financing-options |
| How to choose an HVAC contractor | buying-guides | how-to-choose-hvac-contractor |
| How to test your thermostat | how-to | how-to-test-thermostat |
| How to install a smart thermostat (Nest/Ecobee/etc.) | how-to (used twice) | how-to-install-smart-thermostat |
| How to wire a thermostat (C-wire guide) | how-to | how-to-wire-thermostat |
| How to program your thermostat | how-to | how-to-program-thermostat |
| How to calibrate your thermostat | how-to | how-to-calibrate-thermostat |
| How to fix frozen AC unit | how-to | how-to-fix-frozen-ac |
| How to insulate HVAC refrigerant/duct lines | how-to | how-to-insulate-hvac-lines |
| How to zone your HVAC system | how-to | how-to-zone-hvac |
| How to optimize HVAC airflow | how-to | how-to-optimize-airflow |
| How to winterize your AC | how-to | how-to-winterize-ac |
| How to prepare furnace for winter | how-to | prepare-furnace-for-winter |
| How to start up AC for summer | how-to | ac-summer-startup |
| How to replace an AC/furnace capacitor | how-to | how-to-replace-capacitor |
| How to install a UV light HVAC system | how-to | how-to-install-uv-light |
| How to install a whole-house humidifier | how-to | how-to-install-whole-house-humidifier |
| Heat pump installation cost | cost-guides | heat-pump-installation-cost |
| Boiler installation cost | cost-guides | boiler-installation-cost |
| AC repair costs (breakdown by part) | cost-guides | ac-repair-costs |
| Furnace repair costs (breakdown by part) | cost-guides | furnace-repair-costs |
| Heat pump repair costs (breakdown by part) | cost-guides | heat-pump-repair-costs |
| AC tune-up cost | cost-guides | ac-tune-up-cost |
| Furnace tune-up cost | cost-guides | furnace-tune-up-cost |
| Goodman vs Rheem comparison | brand-reviews | goodman-vs-rheem |
| Lennox vs American Standard comparison | brand-reviews | lennox-vs-american-standard |

Total: 55 unique rows above (some CREATE items collapsed into a single row where the same topic served two hubs — the two "used twice" entries: `furnace-not-heating` and `how-to-install-smart-thermostat`).

## Notes

- Do not commit stubs. Each MDX file must clear the portfolio-page-quality bar (primary-source research, verified data, prose on every number).
- Several thin-slug troubleshooting topics (e.g., single-symptom noise pages) may be better consolidated into a single canonical `hvac-noise-diagnosis` article with anchors. Consider before authoring 4 separate noise pages.
- The 3 "diagnostic tool" entries (error code DB, flowchart, repair cost estimator) are calculator/tool builds — different capex than editorial articles. Scope separately.

---

## Batch 1 Finalize — additions (2026-07-13)

Added during the Batch 1 finalization pass (hub reconnection). These are class-(c) HIDE decisions from `AUDIT_BATCH1_PREVIEW.md` §1e that the user ruled as HIDE + backlog rather than route.

| Topic | Hub | Suggested slug |
|---|---|---|
| Thermostat Troubleshooting (broad canonical hub article) | troubleshooting | thermostat-troubleshooting-guide |
| Mini Split Buying Guide (canonical) | buying-guides | mini-split-buying-guide |
| Best Programmable Thermostats (canonical) | buying-guides | best-programmable-thermostats |
| Heat Pump Year-Round Maintenance (canonical) | how-to | heat-pump-year-round-maintenance |

**Rationale — Heat Pump Year-Round Maintenance HIDE:** the how-to hub previously pointed at `/heat-pumps/year-round-maintenance` (broken). The conditional test was whether `content/hvac-maintenance/hvac-maintenance-checklist.mdx` contained a substantive dedicated heat-pump section. Result: the article has only a 4-sentence passing paragraph inside a "System-Specific Adjustments" section (line 344 "### Heat Pump (Air-Source)") plus a handful of scattered "if you have a heat pump" mentions in the general seasonal checklist. No dedicated month-by-month table, no year-round task list specific to heat-pump users. Not substantive enough to route — HIDE + backlog for future canonical.

### Backlog — troubleshooting Noise Panel candidates:

Deferred pending future enumeration of a "Noise Problems" panel in `troubleshooting/page.tsx`. Currently no such panel exists.

| Topic | Slug | Note |
|---|---|---|
| HVAC Noise Levels Explained | hvac-noise-levels-explained | Deferred pending future Noise Problems panel enumeration (dB reference article, may be better placed as reference than as a symptom-fix troubleshooting tile) |

---

## Batch 3 pre-review — brand-review tile queue (2026-07-16)

Two brand tiles on `/brand-reviews` were unlinked during pre-Raptive-review broken-link fix (commit for Blocker 1). These brands aren't currently covered in any best-of ranking (best-central-ac-brands, best-hvac-brands-ranked, mini-split-brands-ranked), so the "Full Review" tile CTA had no honest destination.

| Brand | Category | Current status | Options |
|---|---|---|---|
| McQuay | Commercial | Tile shows brand card without any link | (a) write single-brand review, (b) add to best-hvac-brands-ranked and link tile there, (c) delete the tile |
| Nordyne | Commercial | Tile shows brand card without any link | Same three options |

Do NOT commit stubs. Each brand review needs primary-source warranty verification, real dealer-network research, and honest strengths/weaknesses assessment.

---

## Batch 1 STEP A Finalize — additions (2026-07-13)

Result of the STEP A candidate scan. Two candidates enumerated into troubleshooting Heating Problems panel (`cracked-heat-exchanger`, `furnace-blowing-cold-air`). Remaining candidates parked below.

### CANNIBALIZATION — needs canonical ruling

Same-intent duplicates that shouldn't both be enumerated into the hub until the canonical is chosen. Do NOT wire either broader tile into the hub until the ruling is made.

| Candidate | Words | Competes with | Note |
|---|---|---|---|
| ac-troubleshooting-guide (Complete AC Troubleshooting Guide: Fix 12 Common Problems) | 3,802 | `ac-not-cooling` (already in troubleshooting Cooling Problems panel) | Both target the AC-won't-work symptom-fix intent. `ac-troubleshooting-guide` is broader canonical (12 problems); `ac-not-cooling` is a single-symptom fix. Ruling needed: which becomes the canonical linked from the hub, and does the other get consolidated / redirected / re-scoped? |
| mini-split-in-cold-climates (MDX exists at content/mini-split-air-conditioners/mini-split-in-cold-climates.mdx but has NO frontmatter — currently unbuilt) | ~2,000 (body content substantial) | `heat-pump-in-cold-weather` (already exists as full article) | Mini splits ARE heat pumps — the intent overlap is significant. Surfaced during Batch 3 C2 when the sister file `mini-split-amps` got its frontmatter added. Held for distinct-page-vs-redirect ruling: (a) add distinct frontmatter and build as a mini-split-specific angle on cold-weather operation, (b) redirect `/mini-split-in-cold-climates` → `/heat-pump-in-cold-weather` and merge unique content, or (c) delete the orphaned MDX entirely. |

### Panel-seed backlogs — deferred until 3+ sibling articles exist

Rule: don't open a single-tile panel. When the corpus grows to 3+ sibling articles fitting a proposed panel, revisit.

| Slug | Title | Suggested panel | Sibling count today | Status |
|---|---|---|---|---|
| heat-pump-in-cold-weather | Do Heat Pumps Work in Cold Weather? (Below Freezing Guide) | Heat Pump Problems | 1 (this is the only fit today) | Panel opens when 3+ heat-pump symptom-fix articles exist. Not enumerated. |
| how-to-reduce-hvac-noise | How to Reduce HVAC Noise: 8 Soundproofing Solutions That Actually Work | Noise Problems (troubleshooting) | 1 (currently a how-to hub tile — leave it there) | Article is a treatment/how-to, not a symptom-fix. Stays in the how-to hub for now. Panel opens when 3+ noise symptom-fix articles exist. |
