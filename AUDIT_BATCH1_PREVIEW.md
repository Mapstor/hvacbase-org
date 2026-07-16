# Audit Batch 1 — Hub Link Routing Preview

Read-only classification of the 90 broken internal edges catalogued in `AUDIT_INVENTORY/links_internal.md`. Cross-referenced against the 339-slug MDX inventory (`/tmp/slugs.txt`), 374 static-route inventory (`/tmp/static-routes.txt`), and 215-orphan pool (`AUDIT_INVENTORY/orphans_full.txt`).

Classifications:
- **(a)** target exists at a different flat path — corrected href proposed
- **(b) REMOVE** — no target exists AND hub has coverage
- **(b) CREATE** — no target exists AND grid/nav slot is load-bearing
- **(c)** ambiguous — needs user ruling

Method: For each broken href, extract the last path segment ("tail") and look it up as an exact flat slug. Try one-level variants when nothing matches (strip common suffixes, expand common prefixes, apply cluster context).

---

## Section 1 — Per-edge table

### 1a. `app/troubleshooting/page.tsx` — 26 broken edges

| source_file:line | broken href | class | proposed fix | reconnects orphan? |
|---|---|---|---|---|
| troubleshooting/page.tsx:31 | `/ac-freezing-up` | b-CREATE | CREATE — grid cell in "Cooling Problems" panel; content-creation needed: **AC freezing up (ice on coils, low refrigerant, airflow restriction)** | n |
| troubleshooting/page.tsx:39 | `/ac-short-cycling` | b-CREATE | CREATE — grid cell in "Cooling Problems" panel; content-creation needed: **AC short cycling (oversized unit, thermostat, refrigerant leak)** | n |
| troubleshooting/page.tsx:47 | `/ac-wont-turn-on` | b-CREATE | CREATE — grid cell in "Cooling Problems" panel; content-creation needed: **AC won't turn on (power, capacitor, control board)** | n |
| troubleshooting/page.tsx:61 | `/furnace-not-heating` | b-CREATE | CREATE — grid cell in "Heating Problems" panel; content-creation needed: **Furnace not heating (pilot, ignitor, gas valve)** | n |
| troubleshooting/page.tsx:69 | `/furnace-short-cycling` | b-CREATE | CREATE — grid cell in "Heating Problems" panel; content-creation needed: **Furnace short cycling (dirty filter, oversized furnace)** | n |
| troubleshooting/page.tsx:77 | `/heat-pump-not-heating` | b-CREATE | CREATE — grid cell in "Heating Problems" panel; content-creation needed: **Heat pump not heating (defrost, reversing valve, refrigerant)** | n |
| troubleshooting/page.tsx:85 | `/heating/uneven-heating` | b-CREATE | CREATE — grid cell in "Heating Problems" panel; content-creation needed: **Uneven heating between rooms (ducts, insulation, sizing)** | n |
| troubleshooting/page.tsx:99 | `/troubleshooting/banging-noises` | b-CREATE | CREATE — grid cell in "Noise Problems" panel; content-creation needed: **Banging / clanking HVAC noises** | n |
| troubleshooting/page.tsx:107 | `/troubleshooting/squealing-noises` | b-CREATE | CREATE — grid cell in "Noise Problems" panel; content-creation needed: **Squealing / screeching HVAC noises** | n |
| troubleshooting/page.tsx:115 | `/troubleshooting/clicking-noises` | b-CREATE | CREATE — grid cell in "Noise Problems" panel; content-creation needed: **Clicking / ticking HVAC noises** | n |
| troubleshooting/page.tsx:123 | `/troubleshooting/humming-noises` | b-CREATE | CREATE — grid cell in "Noise Problems" panel; content-creation needed: **Humming / buzzing HVAC noises** | n |
| troubleshooting/page.tsx:137 | `/ac-water-leak` | b-CREATE | CREATE — grid cell in "Water & Moisture Issues" panel; content-creation needed: **AC water leak (clogged drain, frozen coils, pan damage)** | n |
| troubleshooting/page.tsx:145 | `/air-quality/high-humidity` | b-CREATE | CREATE — grid cell in "Water & Moisture Issues" panel; content-creation needed: **High indoor humidity (oversized AC, poor ventilation)** | n |
| troubleshooting/page.tsx:153 | `/furnace-water-leak` | a | `/furnace-leaking-water` (exact-topic slug already exists as MDX) | n |
| troubleshooting/page.tsx:161 | `/troubleshooting/frozen-condensate` | b-CREATE | CREATE — grid cell in "Water & Moisture Issues" panel; content-creation needed: **Frozen condensate line (cold weather, insulation, pitch)** | n |
| troubleshooting/page.tsx:175 | `/thermostats/thermostat-troubleshooting` | c | AMBIGUOUS — no exact `thermostat-troubleshooting` slug; closest candidates are `thermostat-heat-on-but-no-heat` (narrow problem) and general troubleshooting hub. Need user ruling on whether to route to narrow article or CREATE canonical thermostat-troubleshooting article | n |
| troubleshooting/page.tsx:183 | `/troubleshooting/wont-turn-off` | b-CREATE | CREATE — grid cell in "Electrical & Control Issues"; content-creation needed: **HVAC system won't turn off (stuck thermostat, relay, control board)** | n |
| troubleshooting/page.tsx:191 | `/troubleshooting/intermittent-operation` | b-CREATE | CREATE — grid cell in "Electrical & Control Issues"; content-creation needed: **Intermittent HVAC operation (loose connections, failing components)** | n |
| troubleshooting/page.tsx:205 | `/airflow/weak-airflow` | b-CREATE | CREATE — grid cell in "Airflow Problems" panel; content-creation needed: **Weak HVAC airflow (dirty filter, duct leaks, blower)** | n |
| troubleshooting/page.tsx:213 | `/airflow/no-air-from-vents` | b-CREATE | CREATE — grid cell in "Airflow Problems" panel; content-creation needed: **No air from vents (blower, duct blockage, damper)** | n |
| troubleshooting/page.tsx:221 | `/airflow/hot-cold-spots` | b-CREATE | CREATE — grid cell in "Airflow Problems" panel; content-creation needed: **Hot/cold spots in the home (duct design, insulation, balance)** | n |
| troubleshooting/page.tsx:229 | `/air-quality/dusty-smelly-air` | b-CREATE | CREATE — grid cell in "Airflow Problems" panel; content-creation needed: **Dusty or smelly air from vents (dirty ducts, mold, filter)** | n |
| troubleshooting/page.tsx:270 | `/tools/diagnostic-checklist` | a | `/hvac-maintenance-checklist` — same conceptual asset, exists as MDX (best available flat slug for "System Diagnostic Checklist" tool tile) | n |
| troubleshooting/page.tsx:276 | `/tools/error-codes` | b-CREATE | CREATE — Quick Diagnostic Tools tile; content-creation needed: **HVAC error code database (brand-indexed lookup)** | n |
| troubleshooting/page.tsx:282 | `/tools/troubleshooting-flowchart` | b-CREATE | CREATE — Quick Diagnostic Tools tile; content-creation needed: **Interactive HVAC troubleshooting flowchart** | n |
| troubleshooting/page.tsx:288 | `/tools/repair-cost-estimator` | b-CREATE | CREATE — Quick Diagnostic Tools tile; content-creation needed: **HVAC repair cost estimator tool** | n |

### 1b. `app/buying-guides/page.tsx` — 26 broken edges

| source_file:line | broken href | class | proposed fix | reconnects orphan? |
|---|---|---|---|---|
| buying-guides/page.tsx:23 | `/air-conditioners/best-central-air-conditioners` | a | `/best-central-ac-brands` (existing MDX; semantic match for "best central air conditioners" card) | y |
| buying-guides/page.tsx:29 | `/mini-split-buying-guide` | c | AMBIGUOUS — no `mini-split-buying-guide` slug; closest candidates: `mini-split-brands-ranked`, `mini-split-maintenance-guide`, or the generic `heat-pump-guide`. Need user ruling on which serves as buying guide anchor | n (depends on ruling) |
| buying-guides/page.tsx:35 | `/air-conditioners/best-window-air-conditioners` | a | `/best-window-air-conditioners` (tail matches existing flat slug exactly) | n |
| buying-guides/page.tsx:41 | `/air-conditioners/best-portable-air-conditioners` | a | `/best-portable-air-conditioners` (tail matches existing flat slug exactly) | n |
| buying-guides/page.tsx:53 | `/best-gas-furnaces` | a | `/best-gas-furnace-brands` (nearest flat slug, orphan reconnect) | y |
| buying-guides/page.tsx:59 | `/heat-pump-buying-guide` | a | `/heat-pump-guide` (nearest flat slug; existing MDX and covers buying content) | n |
| buying-guides/page.tsx:65 | `/best-boilers` | b-CREATE | CREATE — buying-guides grid tile; content-creation needed: **Best boilers (brand rankings)** | n |
| buying-guides/page.tsx:71 | `/space-heaters/best-space-heaters` | a | `/best-space-heaters-for-large-rooms` (nearest flat slug, orphan reconnect); could alternatively use `/space-heater-guide` | y |
| buying-guides/page.tsx:83 | `/air-quality/best-whole-house-air-purifiers` | b-CREATE | CREATE — Air-Quality grid tile; content-creation needed: **Best whole-house air purifiers** | n |
| buying-guides/page.tsx:89 | `/dehumidifiers/best-whole-house-dehumidifiers` | a | `/best-whole-house-dehumidifiers` (tail matches existing flat slug exactly; orphan reconnect) | y |
| buying-guides/page.tsx:95 | `/humidifiers/best-whole-house-humidifiers` | b-CREATE | CREATE — Air-Quality grid tile; content-creation needed: **Best whole-house humidifiers** | n |
| buying-guides/page.tsx:101 | `/air-quality/uv-light-hvac-systems` | a | `/uv-light-hvac-systems` (tail matches existing flat slug exactly) | n |
| buying-guides/page.tsx:113 | `/thermostats/best-smart-thermostats` | a | `/best-smart-thermostats` (tail matches existing flat slug exactly) | n |
| buying-guides/page.tsx:119 | `/thermostats/nest-vs-ecobee` | a | `/nest-vs-ecobee-vs-honeywell` (canonical comparison article exists as MDX) | n |
| buying-guides/page.tsx:125 | `/thermostats/best-programmable-thermostats` | c | AMBIGUOUS — no `best-programmable-thermostats` slug; closest existing is `programmable-vs-smart-thermostat` (a comparison, not a "best of" list). Ruling: point to comparison, or CREATE dedicated best-of? | n |
| buying-guides/page.tsx:131 | `/thermostats/zone-control-systems` | b-CREATE | CREATE — Thermostat/Controls tile; content-creation needed: **Zone-control HVAC systems (buying guide)** | n |
| buying-guides/page.tsx:143 | `/brand-reviews/carrier-vs-trane` | a | `/trane-vs-carrier` (comparison exists as MDX with reversed name order) | n |
| buying-guides/page.tsx:149 | `/brand-reviews/lennox-vs-goodman` | b-CREATE | CREATE — Brand-comparison tile; content-creation needed: **Lennox vs Goodman comparison** | n |
| buying-guides/page.tsx:155 | `/brand-reviews/hvac-reliability-rankings` | a | `/best-hvac-brands-ranked` (nearest flat slug that ranks brands by reliability) | n |
| buying-guides/page.tsx:161 | `/brand-reviews/best-budget-hvac-brands` | b-CREATE | CREATE — Brand-comparison tile; content-creation needed: **Best budget HVAC brands** | n |
| buying-guides/page.tsx:173 | `/installation/hvac-installation-costs` | c | AMBIGUOUS — closest options are `furnace-installation-cost`, `mini-split-installation-cost`, `central-ac-cost-to-install`, and `hvac-cost-by-state`. Need user ruling on which is canonical for the "installation costs" tile | n |
| buying-guides/page.tsx:179 | `/installation/diy-vs-professional` | b-CREATE | CREATE — Installation tile; content-creation needed: **DIY vs professional HVAC install decision guide** | n |
| buying-guides/page.tsx:185 | `/installation/hvac-financing-guide` | b-CREATE | CREATE — Installation tile; content-creation needed: **HVAC financing options guide** | n |
| buying-guides/page.tsx:191 | `/installation/choosing-hvac-contractor` | b-CREATE | CREATE — Installation tile; content-creation needed: **How to choose an HVAC contractor** | n |
| buying-guides/page.tsx:211 | `/energy-efficiency/hvac-energy-saving-tips` | a | `/hvac-energy-saving-tips` (tail matches existing flat slug exactly) | n |
| buying-guides/page.tsx:213 | `/air-conditioners/ac-troubleshooting-guide` | a | `/ac-troubleshooting-guide` (tail matches existing flat slug exactly) | n |

### 1c. `app/how-to/page.tsx` — 23 broken edges

| source_file:line | broken href | class | proposed fix | reconnects orphan? |
|---|---|---|---|---|
| how-to/page.tsx:24 | `/maintenance/how-to-change-hvac-filter` | a | `/how-often-change-hvac-filter` — nearest existing flat slug; covers changing HVAC filter cadence | n |
| how-to/page.tsx:32 | `/maintenance/how-to-clean-ac-coils` | a | `/how-to-clean-ac-coils` (tail matches existing flat slug exactly) | n |
| how-to/page.tsx:40 | `/maintenance/how-to-clean-air-vents` | b-REMOVE | REMOVE — no matching flat slug; the Basic Maintenance panel still has 3 other real how-to entries (filter, coils, thermostat test). Alternatively CREATE: **How to clean HVAC air vents & registers** | n |
| how-to/page.tsx:48 | `/thermostats/how-to-test-thermostat` | b-CREATE | CREATE — Basic Maintenance grid tile; content-creation needed: **How to test your thermostat** | n |
| how-to/page.tsx:63 | `/thermostats/how-to-install-smart-thermostat` | b-CREATE | CREATE — Thermostat Installation tile + Popular Guides tile; content-creation needed: **How to install a smart thermostat (Nest/Ecobee/etc.)** — high-priority (used in 2 places on the hub) | n |
| how-to/page.tsx:71 | `/thermostats/how-to-wire-thermostat` | b-CREATE | CREATE — Thermostat Installation tile; content-creation needed: **How to wire a thermostat (C-wire guide)** | n |
| how-to/page.tsx:79 | `/thermostats/how-to-program-thermostat` | b-CREATE | CREATE — Thermostat Installation tile; content-creation needed: **How to program your thermostat** | n |
| how-to/page.tsx:87 | `/thermostats/how-to-calibrate-thermostat` | b-CREATE | CREATE — Thermostat Installation tile; content-creation needed: **How to calibrate your thermostat** | n |
| how-to/page.tsx:110 | `/furnace-not-heating` | b-CREATE | CREATE — Troubleshooting tile; content-creation needed: **Furnace not heating** (same missing article referenced from troubleshooting hub — single-write, double-benefit) | n |
| how-to/page.tsx:118 | `/how-to-fix-frozen-ac` | b-CREATE | CREATE — Troubleshooting tile; content-creation needed: **How to fix frozen AC unit** | n |
| how-to/page.tsx:126 | `/troubleshooting/how-to-fix-hvac-noises` | a | `/how-to-reduce-hvac-noise` (nearest flat slug; covers HVAC noise reduction) | n |
| how-to/page.tsx:149 | `/insulation/how-to-insulate-hvac-lines` | b-CREATE | CREATE — Energy Savings tile; content-creation needed: **How to insulate HVAC refrigerant/duct lines** | n |
| how-to/page.tsx:157 | `/zoning/how-to-zone-hvac` | b-CREATE | CREATE — Energy Savings tile; content-creation needed: **How to zone your HVAC system** | n |
| how-to/page.tsx:165 | `/airflow/how-to-optimize-airflow` | b-CREATE | CREATE — Energy Savings tile; content-creation needed: **How to optimize HVAC airflow** | n |
| how-to/page.tsx:180 | `/maintenance/how-to-winterize-ac` | b-CREATE | CREATE — Seasonal Preparation tile; content-creation needed: **How to winterize your AC** | n |
| how-to/page.tsx:188 | `/prepare-furnace-for-winter` | b-CREATE | CREATE — Seasonal Preparation tile; content-creation needed: **How to prepare furnace for winter** | n |
| how-to/page.tsx:196 | `/ac-summer-startup` | b-CREATE | CREATE — Seasonal Preparation tile; content-creation needed: **How to start up AC for summer** | n |
| how-to/page.tsx:204 | `/heat-pumps/year-round-maintenance` | c | AMBIGUOUS — no matching flat slug; closest candidate is `hvac-maintenance-checklist`. Ruling: point to generic checklist, or CREATE dedicated **How to maintain heat pump year-round** | n |
| how-to/page.tsx:219 | `/diy-mini-split-installation` | a | `/best-diy-mini-splits` — nearest flat slug (existing MDX; covers DIY mini-split install content) | n |
| how-to/page.tsx:227 | `/repairs/how-to-replace-capacitor` | b-CREATE | CREATE — Advanced DIY tile; content-creation needed: **How to replace an AC/furnace capacitor** | n |
| how-to/page.tsx:235 | `/air-quality/install-uv-light` | b-CREATE | CREATE — Advanced DIY tile; content-creation needed: **How to install a UV light HVAC system** | n |
| how-to/page.tsx:243 | `/humidifiers/install-whole-house-humidifier` | b-CREATE | CREATE — Advanced DIY tile; content-creation needed: **How to install a whole-house humidifier** | n |
| how-to/page.tsx:264 | `/thermostats/how-to-install-smart-thermostat` | b-CREATE | CREATE (duplicate reference — see line 63); Popular Guides tile pointing at same missing article | n |

### 1d. `app/cost-guides/page.tsx` — 8 broken edges

| source_file:line | broken href | class | proposed fix | reconnects orphan? |
|---|---|---|---|---|
| cost-guides/page.tsx:23 | `/central-ac-installation-cost` | a | `/central-ac-cost-to-install` (existing MDX; exact topic match) | n |
| cost-guides/page.tsx:37 | `/heat-pump-installation-cost` | b-CREATE | CREATE — Cost-guides grid tile; content-creation needed: **Heat pump installation cost** | n |
| cost-guides/page.tsx:51 | `/boiler-installation-cost` | b-CREATE | CREATE — Cost-guides grid tile; content-creation needed: **Boiler installation cost** | n |
| cost-guides/page.tsx:71 | `/ac-repair-costs` | b-CREATE | CREATE — Cost-guides grid tile; content-creation needed: **AC repair costs (breakdown by part)** | n |
| cost-guides/page.tsx:78 | `/furnace-repair-costs` | b-CREATE | CREATE — Cost-guides grid tile; content-creation needed: **Furnace repair costs (breakdown by part)** | n |
| cost-guides/page.tsx:85 | `/heat-pump-repair-costs` | b-CREATE | CREATE — Cost-guides grid tile; content-creation needed: **Heat pump repair costs (breakdown by part)** | n |
| cost-guides/page.tsx:112 | `/ac-tune-up-cost` | b-CREATE | CREATE — Cost-guides grid tile; content-creation needed: **AC tune-up cost** | n |
| cost-guides/page.tsx:119 | `/furnace-tune-up-cost` | b-CREATE | CREATE — Cost-guides grid tile; content-creation needed: **Furnace tune-up cost** | n |

### 1e. `app/brand-reviews/page.tsx` — 4 broken edges

| source_file:line | broken href | class | proposed fix | reconnects orphan? |
|---|---|---|---|---|
| brand-reviews/page.tsx:157 | `/brand-reviews/carrier-vs-trane` | a | `/trane-vs-carrier` (existing MDX with reversed name order) | n |
| brand-reviews/page.tsx:165 | `/brand-reviews/goodman-vs-rheem` | b-CREATE | CREATE — Brand-comparison tile; content-creation needed: **Goodman vs Rheem comparison** | n |
| brand-reviews/page.tsx:173 | `/brand-reviews/lennox-vs-american-standard` | b-CREATE | CREATE — Brand-comparison tile; content-creation needed: **Lennox vs American Standard comparison** | n |
| brand-reviews/page.tsx:181 | `/brand-reviews/mini-split-brand-comparison` | a | `/mini-split-brands-ranked` (existing MDX; orphan reconnect; canonical mini-split brand comparison) | y |

### 1f. Straggler files — 3 broken edges

| source_file:line | broken href | class | proposed fix | reconnects orphan? |
|---|---|---|---|---|
| articles/page.tsx:323 | `/what-is-a-heat-pump` | a | `/heat-pump-guide` (existing MDX; conceptual match for "what is a heat pump" explainer) | n |
| hvac-dictionary/page.tsx:597 | `/ultimate-buying-guide` | b-REMOVE | REMOVE — dictionary CTA links to non-existent "ultimate buying guide"; hub already provides plenty of buying links via nav | n |
| components/calculators/FurnaceElectricalCalculator.tsx:232 | `/kWh` | a | `/kwh-cost-calculator` (existing MDX/calculator; the intended reference given the source is a furnace electrical calculator) | n |

---

## Section 2 — Aggregated counts

- **Total edges:** 90 (confirmed — 26 + 26 + 23 + 8 + 4 + 3 = 90)
- **Class (a) — path correction:** 25 edges, of which **5 reconnect unique orphans**
- **Class (b) — REMOVE:** 2 edges (`how-to/page.tsx:40 how-to-clean-air-vents`; `hvac-dictionary/page.tsx:597 ultimate-buying-guide`)
- **Class (b) — CREATE:** 58 edges (57 unique missing topics — smart-thermostat install references twice; furnace-not-heating references twice)
- **Class (c) — AMBIGUOUS:** 5 edges (need user ruling)

Verification: 25 + 2 + 58 + 5 = 90. ✓

### Class (b) CREATE missing-topic list (58 unique)

Troubleshooting hub (14): AC freezing up · AC short cycling · AC won't turn on · Furnace not heating · Furnace short cycling · Heat pump not heating · Uneven heating between rooms · Banging/clanking HVAC noises · Squealing/screeching HVAC noises · Clicking/ticking HVAC noises · Humming/buzzing HVAC noises · AC water leak · High indoor humidity · Frozen condensate line

Troubleshooting hub cont'd (6): HVAC system won't turn off · Intermittent HVAC operation · Weak HVAC airflow · No air from vents · Hot/cold spots · Dusty/smelly air

Troubleshooting Quick Tools tiles (3): HVAC error code database · Interactive troubleshooting flowchart · HVAC repair cost estimator

Buying-guides hub (8): Best boilers · Best whole-house air purifiers · Best whole-house humidifiers · Zone-control HVAC systems · Lennox vs Goodman · Best budget HVAC brands · DIY vs professional install · HVAC financing options · How to choose an HVAC contractor

How-to hub (11): How to test your thermostat · How to install a smart thermostat · How to wire a thermostat (C-wire) · How to program your thermostat · How to calibrate your thermostat · How to fix frozen AC unit · How to insulate HVAC lines · How to zone your HVAC system · How to optimize HVAC airflow · How to winterize your AC · How to prepare furnace for winter · How to start up AC for summer · How to replace a capacitor · How to install UV light system · How to install whole-house humidifier

Cost-guides hub (7): Heat pump installation cost · Boiler installation cost · AC repair costs · Furnace repair costs · Heat pump repair costs · AC tune-up cost · Furnace tune-up cost

Brand-reviews hub (2): Goodman vs Rheem · Lennox vs American Standard

### Class (c) AMBIGUOUS list (need user ruling)

1. `/thermostats/thermostat-troubleshooting` (troubleshooting.tsx:175) — no canonical thermostat-troubleshooting slug; route to `thermostat-heat-on-but-no-heat` or CREATE?
2. `/mini-split-buying-guide` (buying-guides.tsx:29) — several partial candidates; which is canonical?
3. `/thermostats/best-programmable-thermostats` (buying-guides.tsx:125) — route to `programmable-vs-smart-thermostat` or CREATE dedicated best-of?
4. `/installation/hvac-installation-costs` (buying-guides.tsx:173) — multiple by-appliance cost articles exist; which is canonical hub-of-hubs?
5. `/heat-pumps/year-round-maintenance` (how-to.tsx:204) — point to `hvac-maintenance-checklist` or CREATE heat-pump-specific?

---

## Section 3 — Per-hub cleanup preview

| Hub source | broken | class (a) fix | class (b) REMOVE | class (b) CREATE | class (c) |
|---|---|---|---|---|---|
| `app/troubleshooting/page.tsx` | 26 | 2 | 0 | 23 | 1 |
| `app/buying-guides/page.tsx` | 26 | 14 | 0 | 9 | 3 |
| `app/how-to/page.tsx` | 23 | 4 | 1 | 17 | 1 |
| `app/cost-guides/page.tsx` | 8 | 1 | 0 | 7 | 0 |
| `app/brand-reviews/page.tsx` | 4 | 2 | 0 | 2 | 0 |
| `app/articles/page.tsx` | 1 | 1 | 0 | 0 | 0 |
| `app/hvac-dictionary/page.tsx` | 1 | 0 | 1 | 0 | 0 |
| `components/calculators/FurnaceElectricalCalculator.tsx` | 1 | 1 | 0 | 0 | 0 |
| **TOTAL** | **90** | **25** | **2** | **58** | **5** |

**Sanity-check on totals:** 25 (a) + 2 (b-REMOVE) + 58 (b-CREATE) + 5 (c) = 90. Confirmed.

**Ranked by fixable-with-code-only impact (class-a share):**
1. `buying-guides` — 14 of 26 (54% class-a): biggest single win, 3 orphans reconnected
2. `brand-reviews` — 2 of 4 (50% class-a): quick win, 1 orphan reconnected
3. `how-to` — 4 of 23 (17% class-a): mostly content-creation queue
4. `cost-guides` — 1 of 8 (13% class-a): mostly content-creation queue
5. `troubleshooting` — 2 of 26 (8% class-a): overwhelmingly content-creation queue

---

## Section 4 — Orphan reconnection count

If all 25 class-(a) fixes ship, the unique-orphan-slug reconnection set is **5 orphans**.

- **Represents 2.3% of the 215-orphan pool** (5 / 215)
- All 5 are semantically load-bearing (comparison hubs, "best of X" articles, brand rankings) — high-value reconnections despite the modest count

Reconnected orphan slugs:

- `best-central-ac-brands` (buying-guides.tsx:23 → `/best-central-ac-brands`)
- `best-gas-furnace-brands` (buying-guides.tsx:53 → `/best-gas-furnace-brands`)
- `best-space-heaters-for-large-rooms` (buying-guides.tsx:71 → `/best-space-heaters-for-large-rooms`)
- `best-whole-house-dehumidifiers` (buying-guides.tsx:89 → `/best-whole-house-dehumidifiers`)
- `mini-split-brands-ranked` (brand-reviews.tsx:181 → `/mini-split-brands-ranked`)

The remaining 20 class-(a) target slugs (`furnace-leaking-water`, `nest-vs-ecobee-vs-honeywell`, `trane-vs-carrier`, `hvac-energy-saving-tips`, `best-window-air-conditioners`, `best-portable-air-conditioners`, `uv-light-hvac-systems`, `best-smart-thermostats`, `how-to-clean-ac-coils`, `heat-pump-guide`, `ac-troubleshooting-guide`, `best-hvac-brands-ranked`, `central-ac-cost-to-install`, `kwh-cost-calculator`, `how-often-change-hvac-filter`, `how-to-reduce-hvac-noise`, `hvac-maintenance-checklist`, `best-diy-mini-splits`, `furnace-guide` if used) are already reachable via other inbound links (nav / other hubs / RelatedArticles cluster same-picker), so their reconnection doesn't reduce the orphan pool but does add semantic hub-to-article connectivity.

The headline is: **class-(a) fixes are cheap (25 hrefs, no new content, no new pages) but the direct orphan reduction is modest (5 orphans / 2.3%).** The real indexation win comes from either shipping the class-(b) CREATE queue (58 unique new articles) or expanding hub grids to enumerate more existing orphans directly.

---

## Notes for the fixer subagent

- **All class-(a) fixes are single-line href swaps** — no logic change, no data-object restructure.
- **All class-(b) REMOVE fixes** should either delete the entire grid item (safe when card is one of 3-4 in a panel) or replace the tile with an alternate existing slug.
- **Class-(b) CREATE items** should not ship as code changes. They belong on a content-creation backlog; the hub tiles should be temporarily removed (or the whole grid section hidden) until real MDX exists. Shipping empty CREATE stubs creates thin content and violates Google Search Essentials.
- **Class-(c) items** require user input before either fixer or content-creator can proceed.
