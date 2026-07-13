# Batch C.2 — Tier-2 bare in-prose stat inventory (INVENTORY ONLY, no edits)

**Run date:** 2026-07-13, as part of Batch C.1 apply. **Sizing document.** No fixes attempted here; goal is to know the true remaining scope so we can plan Batch C.2 with realistic effort.

## Raw grep counts (whole-repo)

- **334** `.mdx` lines match `reduces? (efficiency|cooling|heating|airflow) by N-N%` / `saves? N-N% on` / `N-N% (savings|reduction|of...)` / `approximately N-N%` — the loose bare-range pattern.
- **701** `.mdx` lines match `answer: "…N-N%…"` — FAQ answer bodies containing a percentage (this is the schema-emitting subset; the vast majority are legitimate humidity/temperature/efficiency-rating ranges, not stat-shape claims).
- **83** `.mdx` lines match `save[s]? N-N%` / `save N%` — the "save X percent" prose pattern.

## Signal-vs-noise filter (per-article read required for true count)

Not every match is same-class as the C.1 items. The 334-hit loose grep captures:

**Legitimate technical facts (large fraction, do NOT strip):**
- HEPA filter capture rates: `99.97% at 0.3 microns` — real HEPA definition, DOE/EPA.
- MERV filter capture ranges: `85-95% of particles 1-3 μm` for MERV 11 — ASHRAE 52.2 standard-defined.
- Humidity ranges: `30-50% RH`, `45-55% RH` — ASHRAE 55 and EPA IAQ guidance.
- Temperature setpoints: `65-72°F`, `78°F cooling / 68°F heating` — DOE Energy Saver recommendations.
- Ceiling of AHRI-cert'd SEER2 / HSPF2 / EER2 numbers.
- Refrigerant properties: `R-32 GWP 675 (89% lower than R-410A)` — manufacturer + AIM Act published data.
- Manufacturer-cited spec figures (Mitsubishi 76% capacity at 5°F, Daikin 75% at 5°F, etc.) — AHRI directory verifiable.
- Compositional wattage claims (`80-90% of total power draw is the blower` in furnace) — engineering fact.
- Cost-of-electricity assumptions in worked examples footnoted with `*Estimated at $0.17/kWh, 8 hrs/day`.

**Same-class as Batch C.1 items (needs strip in Batch C.2):**
- Bare "reduces efficiency by N-N%" claims where the % has no source AND the same paragraph doesn't cite one.
- Bare "saves N-N% on cooling/heating" claims same pattern.
- FAQ answers ending with "…save X-Y%" without citation (schema-emitting).
- Attribution-shelled ("studies show", "research shows", "estimated at N%") claims where the shell doesn't resolve to a specific source URL.

**Estimated same-class Tier-2 total after filter: 50-100 items across ~15-25 MDX articles.** Actual count requires per-article read (not attempted in this inventory).

## Confirmed Tier-2 same-class items (from Grep E in Batch C.1 preview + follow-up)

Grouped by file. Each entry: `line | verbatim | schema-emit? | proposed class`

### `content/air-conditioners/ac-troubleshooting-guide.mdx` — 5 items

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 458 | `- Dirty filters reduce efficiency by 15%` | n | (i) |
| 459 | `- Dirty coils reduce efficiency by 30%` | n | (i) |
| 460 | `- Low refrigerant reduces efficiency by 20%` | n | (i) |
| 461 | `- Duct leaks waste 20-30% of energy` | n | (i) — DOE publishes ~20-30% duct-loss figure; could be class-(iii) if cited |
| 478 | `**Every degree higher you set your thermostat saves 6-8% on cooling costs.** Setting your thermostat at 78°F instead of 75°F can reduce your cooling bill by $20-40 per month.` | n | (i) — DOE has published "up to 3% per degree" figure, not 6-8% |

### `content/air-conditioners/ac-not-cooling.mdx` — 3 items

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 137 | `Never run your AC without a filter… reducing efficiency by 25% and requiring professional cleaning costing $300-500.` | n | (i) |
| 363 | `A dirty evaporator coil can reduce efficiency by 30% or more.` | n | (i) |
| 569 | `Ductwork problems can rob your system of 20-30% of its cooling capacity.` | n | (i) |

### `content/air-conditioners/window-ac-installation-guide.mdx` — 2 items

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 73 | `direct sun on the condenser reduces efficiency by 5–10%` | n | (i) |
| 231 | `unsealed accordion side panels … reducing efficiency by 10–20%` | n | (i) |

### `content/air-conditioners/window-air-conditioners.mdx` — 1 item

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 317 | `Dirty filters reduce efficiency by 5–15%.` | n | (i) |

### `content/air-conditioners/most-energy-efficient-window-acs.mdx` — 1 item

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 226 | `a clogged filter can reduce efficiency by 5–15%.` | n | (i) |

### `content/air-conditioners/window-ac-with-heater.mdx` — 1 item

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 137 | `remove it for winter to eliminate the thermal bridge and save 5-10% on heating costs` (FAQ answer) | **y** | (i) |

### `content/furnaces-heating/thermostat-temperature-winter.mdx` — 2 items

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 207 | `Approximately 1-3% of your heating bill per degree` (FAQ answer body) | **y** | (i)/(iii) — DOE has published a similar figure |
| 211 | `maintaining 72°F costs about 8-12% more in heating` (FAQ answer body) | **y** | (i) |

### `content/air-quality/best-hvac-air-filters.mdx` — 2 items (plus MERV-standard capture ranges that are legitimate technical facts, not strip candidates)

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 275 | `Backward installation reduces efficiency by 40-60% and can damage the filter media` | n | (i) |
| 360 | `- **Annual purchase**: 10-15% savings on bulk orders` | n | (i) |

### `content/air-quality/best-air-curtains.mdx` — 4 items

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 38 | `an air curtain maintains 70-80% of the temperature differential between inside and outside, compared to 0% with a wide-open door and 100% with a closed door.` | n | (iii) — AMCA / air-curtain manufacturers publish this range |
| 135 | `HVAC energy savings estimated at 30% during peak service hours.` | n | (i) — "estimated at" no source |
| 182 | `Independent studies show 30-70% reduction in HVAC energy loss through doorways.` (FAQ answer) | **y** | (i) — attribution shell |
| 206 | `They maintain 70-80% of temperature differential — not 100%.` (FAQ answer) | **y** | (iii) — same claim as :38 |

### `content/dehumidifiers/dehumidifier-electricity-usage.mdx` — 2 items

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 234 | `ENERGY STAR dehumidifiers are 15-30% more efficient than non-certified models` (FAQ answer) | **y** | (iii) — ENERGY STAR publishes a range near this; could cite |
| 242 | `A 50-pint dehumidifier adds roughly $20-$28 per month during humid season — approximately 3-5% of the average U.S. household electric bill ($140-$170/month).` (FAQ answer) | **y** | (i) — 3-5% and $140-170 both bare |

### `content/dehumidifiers/dehumidifier-guide.mdx` — 3 items

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 283 | `Result: … AC runtime dropped by approximately 20%. Annual energy savings estimated at $180–$260, partially offsetting the investment.` (worked example) | n | (i) |
| 389 | `A 70-pint unit removes 40% more moisture per day than a 50-pint unit, uses roughly 25-35% more electricity` (FAQ answer) | **y** | (iii) — could tie to AHAM standard capacity math |
| 393 | `If your only goal is reducing humidity (not cooling), the dehumidifier costs 70-85% less to operate.` (FAQ answer) | **y** | (i) — 70-85% is fabricated-precision |

### `content/dehumidifiers/dehumidifier-running-cost.mdx` — 1 item

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 234 | `roughly 5-10% of an average household's total electricity cost` (FAQ answer) | **y** | (i) |

### `content/dehumidifiers/most-energy-efficient-dehumidifiers.mdx` — 1 item

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 220 | `ENERGY STAR dehumidifiers save 15-30% on electricity compared to non-certified models. Over a typical 7-year lifespan, that translates to $210-$630 in savings` (FAQ answer) | **y** | (iii)/(i) — same as electricity-usage:234 |

### `content/water-heaters/heat-pump-water-heater-guide.mdx` — 1 item

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 312 | `The winter heating penalty is estimated at 10–20% of the water heating savings in cold climates.` (FAQ answer) | **y** | (i) — "estimated at" no source |

### `content/furnaces-heating/best-electric-furnace.mdx` — 1 item

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 119 | `A heat pump costs more upfront but saves 50-65% on heating costs.` (FAQ answer) | **y** | (i) |

### `content/dehumidifiers/basement-dehumidifier-setting.mdx` — 1 item

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 207 | `If it reads within 2-3% of your target setting, the dehumidifier is working correctly.` (FAQ answer) | **y** | (iii) — legitimate calibration tolerance, defensible |

### `content/indoor-air-quality-testing.mdx` — 1 item

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 177 | `\| 2-4 pCi/L \| Seal cracks, improve ventilation \| $200-500 \| 30-50% reduction \| Annual sealing check \|` (in a radon-remediation table) | n | (iii) — could tie to EPA radon guidance |

### `content/air-quality/best-air-purifiers-for-allergies.mdx` — 2 items

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 167 | `Avoid HEPA-type or HEPA-style filters, which may capture only 85-95% of particles.` (FAQ answer) | **y** | (iii) — DOE HEPA std published this range |
| 179 | `Studies show 60-70% reduction in airborne cat allergen with bedroom HEPA use.` (FAQ answer) | **y** | (i) — attribution shell |

### `content/air-quality/best-hepa-air-purifiers.mdx` — 1 item

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 136 | `consumer purifiers allow 5-15% of air to bypass the filter, while medical-grade units approach 0% bypass` (FAQ answer) | **y** | (i) |

### `content/air-quality/best-bedroom-air-purifiers.mdx` — 1 item

| Line | Verbatim | Schema | Class |
| --- | --- | --- | --- |
| 156 | `Buy a unit with 30-50% more CADR than the minimum so you can run it on quiet settings.` (FAQ answer) | **y** | (iii) — sizing-margin recommendation, arguably defensible |

## Confirmed Tier-2 total

**~40 confirmed same-class Tier-2 items** listed above across **~18 MDX articles**. Plus estimated **~10-30 more** in less-thoroughly-scanned files (`air-quality/best-air-scrubbers`, `refrigerants/*`, `heat-pumps/*`, `energy-efficiency-ratings/*`, etc.) that a full per-article read would catch.

**Realistic total: ~50-70 same-class Tier-2 items when the census is truly exhaustive.**

## Schema leakage subset (schema-emitting FAQ answers)

**~20 of the ~40 confirmed items are inside FAQ answer bodies** that render into JSON-LD via `<FAQ items={[…]}>` or into microdata via `<div itemScope itemType="schema.org/Question">`. Any Batch C.2 strip on these must ship in the same commit as the visible strip (same rule as Batch C).

## Recommended Batch C.2 scope

- **Full sweep** = ~50-70 strips across ~18-25 files. Estimated 1-2 hours of edit work.
- **Schema-emitting subset only** = ~20 strips across the FAQ articles. Estimated 30-45 minutes.
- **File-by-file** = pick one cluster (e.g., all `air-quality/*` articles, or all `dehumidifiers/*`) as a mini-batch. Estimated 20-30 minutes each.

Batch C.2 is deferred until user rules on scope.
