# Internal Link Graph

## Headline

- **Total internal `href` hits catalogued: 487**
- **Valid internal links: 397 edges pointing to 173 unique targets**
- **Broken internal links: 90 edges pointing to 87 unique targets**
- **Source files carrying at least one broken link: 8**
- **Orphan pages (zero inbound internal links): 215 / 372 = ~58%**
- **BFS unreachable from `/`: 234 of 374 pages**

Scope covered: all `.tsx` in `app/` and `components/`, plus all `.mdx` in `content/`. Includes JSX `href=` attributes AND string-literal paths inside data-object arrays (the pattern that drives the `/troubleshooting`, `/how-to`, `/buying-guides` hub pages).

## Broken links — by source file

| Source file | broken links |
|---|---|
| `app/troubleshooting/page.tsx` | 26 |
| `app/buying-guides/page.tsx` | 26 |
| `app/how-to/page.tsx` | 23 |
| `app/cost-guides/page.tsx` | 8 |
| `app/brand-reviews/page.tsx` | 4 |
| `app/articles/page.tsx` | 1 |
| `app/hvac-dictionary/page.tsx` | 1 |
| `components/calculators/FurnaceElectricalCalculator.tsx` | 1 |

## Broken links — by target-path pattern

Grouped by first path segment. All are subdir-shaped or missing-flat-slug.

| First segment | broken edges | pattern |
|---|---|---|
| `/thermostats/...` | 11 | see full list below |
| `/troubleshooting/...` | 8 | see full list below |
| `/brand-reviews/...` | 8 | see full list below |
| `/air-quality/...` | 5 | see full list below |
| `/airflow/...` | 4 | see full list below |
| `/tools/...` | 4 | see full list below |
| `/maintenance/...` | 4 | see full list below |
| `/air-conditioners/...` | 4 | see full list below |
| `/installation/...` | 4 | see full list below |
| `/furnace-not-heating/...` | 2 | see full list below |
| `/humidifiers/...` | 2 | see full list below |
| `/what-is-a-heat-pump/...` | 1 | see full list below |
| `/ac-freezing-up/...` | 1 | see full list below |
| `/ac-short-cycling/...` | 1 | see full list below |
| `/ac-wont-turn-on/...` | 1 | see full list below |
| `/furnace-short-cycling/...` | 1 | see full list below |
| `/heat-pump-not-heating/...` | 1 | see full list below |
| `/heating/...` | 1 | see full list below |
| `/ac-water-leak/...` | 1 | see full list below |
| `/furnace-water-leak/...` | 1 | see full list below |
| `/how-to-fix-frozen-ac/...` | 1 | see full list below |
| `/insulation/...` | 1 | see full list below |
| `/zoning/...` | 1 | see full list below |
| `/prepare-furnace-for-winter/...` | 1 | see full list below |
| `/ac-summer-startup/...` | 1 | see full list below |
| `/heat-pumps/...` | 1 | see full list below |
| `/diy-mini-split-installation/...` | 1 | see full list below |
| `/repairs/...` | 1 | see full list below |
| `/ultimate-buying-guide/...` | 1 | see full list below |
| `/central-ac-installation-cost/...` | 1 | see full list below |
| `/heat-pump-installation-cost/...` | 1 | see full list below |
| `/boiler-installation-cost/...` | 1 | see full list below |
| `/ac-repair-costs/...` | 1 | see full list below |
| `/furnace-repair-costs/...` | 1 | see full list below |
| `/heat-pump-repair-costs/...` | 1 | see full list below |
| `/ac-tune-up-cost/...` | 1 | see full list below |
| `/furnace-tune-up-cost/...` | 1 | see full list below |
| `/mini-split-buying-guide/...` | 1 | see full list below |
| `/best-gas-furnaces/...` | 1 | see full list below |
| `/heat-pump-buying-guide/...` | 1 | see full list below |
| `/best-boilers/...` | 1 | see full list below |
| `/space-heaters/...` | 1 | see full list below |
| `/dehumidifiers/...` | 1 | see full list below |
| `/energy-efficiency/...` | 1 | see full list below |
| `/kWh/...` | 1 | see full list below |

## All flat-shaped broken targets (27)

Format: `href | sources`

- `/ac-freezing-up`  ← app/troubleshooting/page.tsx:31
- `/ac-repair-costs`  ← app/cost-guides/page.tsx:71
- `/ac-short-cycling`  ← app/troubleshooting/page.tsx:39
- `/ac-summer-startup`  ← app/how-to/page.tsx:196
- `/ac-tune-up-cost`  ← app/cost-guides/page.tsx:112
- `/ac-water-leak`  ← app/troubleshooting/page.tsx:137
- `/ac-wont-turn-on`  ← app/troubleshooting/page.tsx:47
- `/best-boilers`  ← app/buying-guides/page.tsx:65
- `/best-gas-furnaces`  ← app/buying-guides/page.tsx:53
- `/boiler-installation-cost`  ← app/cost-guides/page.tsx:51
- `/central-ac-installation-cost`  ← app/cost-guides/page.tsx:23
- `/diy-mini-split-installation`  ← app/how-to/page.tsx:219
- `/furnace-not-heating`  ← app/troubleshooting/page.tsx:61, app/how-to/page.tsx:110
- `/furnace-repair-costs`  ← app/cost-guides/page.tsx:78
- `/furnace-short-cycling`  ← app/troubleshooting/page.tsx:69
- `/furnace-tune-up-cost`  ← app/cost-guides/page.tsx:119
- `/furnace-water-leak`  ← app/troubleshooting/page.tsx:153
- `/heat-pump-buying-guide`  ← app/buying-guides/page.tsx:59
- `/heat-pump-installation-cost`  ← app/cost-guides/page.tsx:37
- `/heat-pump-not-heating`  ← app/troubleshooting/page.tsx:77
- `/heat-pump-repair-costs`  ← app/cost-guides/page.tsx:85
- `/how-to-fix-frozen-ac`  ← app/how-to/page.tsx:118
- `/kWh`  ← components/calculators/FurnaceElectricalCalculator.tsx:232
- `/mini-split-buying-guide`  ← app/buying-guides/page.tsx:29
- `/prepare-furnace-for-winter`  ← app/how-to/page.tsx:188
- `/ultimate-buying-guide`  ← app/hvac-dictionary/page.tsx:597
- `/what-is-a-heat-pump`  ← app/articles/page.tsx:323

## All subdir-shaped broken targets (60)

These use `/segment/segment` shape that can never match the flat `[slug]` route. They must either be rewritten as flat targets pointing to real slugs OR the routing must add subdirectory route handlers.

- `/air-conditioners/ac-troubleshooting-guide`  ← app/buying-guides/page.tsx:213
- `/air-conditioners/best-central-air-conditioners`  ← app/buying-guides/page.tsx:23
- `/air-conditioners/best-portable-air-conditioners`  ← app/buying-guides/page.tsx:41
- `/air-conditioners/best-window-air-conditioners`  ← app/buying-guides/page.tsx:35
- `/air-quality/best-whole-house-air-purifiers`  ← app/buying-guides/page.tsx:83
- `/air-quality/dusty-smelly-air`  ← app/troubleshooting/page.tsx:229
- `/air-quality/high-humidity`  ← app/troubleshooting/page.tsx:145
- `/air-quality/install-uv-light`  ← app/how-to/page.tsx:235
- `/air-quality/uv-light-hvac-systems`  ← app/buying-guides/page.tsx:101
- `/airflow/hot-cold-spots`  ← app/troubleshooting/page.tsx:221
- `/airflow/how-to-optimize-airflow`  ← app/how-to/page.tsx:165
- `/airflow/no-air-from-vents`  ← app/troubleshooting/page.tsx:213
- `/airflow/weak-airflow`  ← app/troubleshooting/page.tsx:205
- `/brand-reviews/best-budget-hvac-brands`  ← app/buying-guides/page.tsx:161
- `/brand-reviews/carrier-vs-trane`  ← app/brand-reviews/page.tsx:157, app/buying-guides/page.tsx:143
- `/brand-reviews/goodman-vs-rheem`  ← app/brand-reviews/page.tsx:165
- `/brand-reviews/hvac-reliability-rankings`  ← app/buying-guides/page.tsx:155
- `/brand-reviews/lennox-vs-american-standard`  ← app/brand-reviews/page.tsx:173
- `/brand-reviews/lennox-vs-goodman`  ← app/buying-guides/page.tsx:149
- `/brand-reviews/mini-split-brand-comparison`  ← app/brand-reviews/page.tsx:181
- `/dehumidifiers/best-whole-house-dehumidifiers`  ← app/buying-guides/page.tsx:89
- `/energy-efficiency/hvac-energy-saving-tips`  ← app/buying-guides/page.tsx:211
- `/heat-pumps/year-round-maintenance`  ← app/how-to/page.tsx:204
- `/heating/uneven-heating`  ← app/troubleshooting/page.tsx:85
- `/humidifiers/best-whole-house-humidifiers`  ← app/buying-guides/page.tsx:95
- `/humidifiers/install-whole-house-humidifier`  ← app/how-to/page.tsx:243
- `/installation/choosing-hvac-contractor`  ← app/buying-guides/page.tsx:191
- `/installation/diy-vs-professional`  ← app/buying-guides/page.tsx:179
- `/installation/hvac-financing-guide`  ← app/buying-guides/page.tsx:185
- `/installation/hvac-installation-costs`  ← app/buying-guides/page.tsx:173
- `/insulation/how-to-insulate-hvac-lines`  ← app/how-to/page.tsx:149
- `/maintenance/how-to-change-hvac-filter`  ← app/how-to/page.tsx:24
- `/maintenance/how-to-clean-ac-coils`  ← app/how-to/page.tsx:32
- `/maintenance/how-to-clean-air-vents`  ← app/how-to/page.tsx:40
- `/maintenance/how-to-winterize-ac`  ← app/how-to/page.tsx:180
- `/repairs/how-to-replace-capacitor`  ← app/how-to/page.tsx:227
- `/space-heaters/best-space-heaters`  ← app/buying-guides/page.tsx:71
- `/thermostats/best-programmable-thermostats`  ← app/buying-guides/page.tsx:125
- `/thermostats/best-smart-thermostats`  ← app/buying-guides/page.tsx:113
- `/thermostats/how-to-calibrate-thermostat`  ← app/how-to/page.tsx:87
- `/thermostats/how-to-install-smart-thermostat`  ← app/how-to/page.tsx:63, app/how-to/page.tsx:264
- `/thermostats/how-to-program-thermostat`  ← app/how-to/page.tsx:79
- `/thermostats/how-to-test-thermostat`  ← app/how-to/page.tsx:48
- `/thermostats/how-to-wire-thermostat`  ← app/how-to/page.tsx:71
- `/thermostats/nest-vs-ecobee`  ← app/buying-guides/page.tsx:119
- `/thermostats/thermostat-troubleshooting`  ← app/troubleshooting/page.tsx:175
- `/thermostats/zone-control-systems`  ← app/buying-guides/page.tsx:131
- `/tools/diagnostic-checklist`  ← app/troubleshooting/page.tsx:270
- `/tools/error-codes`  ← app/troubleshooting/page.tsx:276
- `/tools/repair-cost-estimator`  ← app/troubleshooting/page.tsx:288
- `/tools/troubleshooting-flowchart`  ← app/troubleshooting/page.tsx:282
- `/troubleshooting/banging-noises`  ← app/troubleshooting/page.tsx:99
- `/troubleshooting/clicking-noises`  ← app/troubleshooting/page.tsx:115
- `/troubleshooting/frozen-condensate`  ← app/troubleshooting/page.tsx:161
- `/troubleshooting/how-to-fix-hvac-noises`  ← app/how-to/page.tsx:126
- `/troubleshooting/humming-noises`  ← app/troubleshooting/page.tsx:123
- `/troubleshooting/intermittent-operation`  ← app/troubleshooting/page.tsx:191
- `/troubleshooting/squealing-noises`  ← app/troubleshooting/page.tsx:107
- `/troubleshooting/wont-turn-off`  ← app/troubleshooting/page.tsx:183
- `/zoning/how-to-zone-hvac`  ← app/how-to/page.tsx:157

## Detailed inventory: each broken link with source file, line, target, reason

| source_file | line | href | reason |
|---|---|---|---|
| app/troubleshooting/page.tsx | 31 | `/ac-freezing-up` | flat-target-missing-mdx |
| app/cost-guides/page.tsx | 71 | `/ac-repair-costs` | flat-target-missing-mdx |
| app/troubleshooting/page.tsx | 39 | `/ac-short-cycling` | flat-target-missing-mdx |
| app/how-to/page.tsx | 196 | `/ac-summer-startup` | flat-target-missing-mdx |
| app/cost-guides/page.tsx | 112 | `/ac-tune-up-cost` | flat-target-missing-mdx |
| app/troubleshooting/page.tsx | 137 | `/ac-water-leak` | flat-target-missing-mdx |
| app/troubleshooting/page.tsx | 47 | `/ac-wont-turn-on` | flat-target-missing-mdx |
| app/buying-guides/page.tsx | 213 | `/air-conditioners/ac-troubleshooting-guide` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 23 | `/air-conditioners/best-central-air-conditioners` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 41 | `/air-conditioners/best-portable-air-conditioners` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 35 | `/air-conditioners/best-window-air-conditioners` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 83 | `/air-quality/best-whole-house-air-purifiers` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 229 | `/air-quality/dusty-smelly-air` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 145 | `/air-quality/high-humidity` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 235 | `/air-quality/install-uv-light` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 101 | `/air-quality/uv-light-hvac-systems` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 221 | `/airflow/hot-cold-spots` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 165 | `/airflow/how-to-optimize-airflow` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 213 | `/airflow/no-air-from-vents` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 205 | `/airflow/weak-airflow` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 65 | `/best-boilers` | flat-target-missing-mdx |
| app/buying-guides/page.tsx | 53 | `/best-gas-furnaces` | flat-target-missing-mdx |
| app/cost-guides/page.tsx | 51 | `/boiler-installation-cost` | flat-target-missing-mdx |
| app/buying-guides/page.tsx | 161 | `/brand-reviews/best-budget-hvac-brands` | subdir-shape-not-a-flat-slug |
| app/brand-reviews/page.tsx | 157 | `/brand-reviews/carrier-vs-trane` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 143 | `/brand-reviews/carrier-vs-trane` | subdir-shape-not-a-flat-slug |
| app/brand-reviews/page.tsx | 165 | `/brand-reviews/goodman-vs-rheem` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 155 | `/brand-reviews/hvac-reliability-rankings` | subdir-shape-not-a-flat-slug |
| app/brand-reviews/page.tsx | 173 | `/brand-reviews/lennox-vs-american-standard` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 149 | `/brand-reviews/lennox-vs-goodman` | subdir-shape-not-a-flat-slug |
| app/brand-reviews/page.tsx | 181 | `/brand-reviews/mini-split-brand-comparison` | subdir-shape-not-a-flat-slug |
| app/cost-guides/page.tsx | 23 | `/central-ac-installation-cost` | flat-target-missing-mdx |
| app/buying-guides/page.tsx | 89 | `/dehumidifiers/best-whole-house-dehumidifiers` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 219 | `/diy-mini-split-installation` | flat-target-missing-mdx |
| app/buying-guides/page.tsx | 211 | `/energy-efficiency/hvac-energy-saving-tips` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 61 | `/furnace-not-heating` | flat-target-missing-mdx |
| app/how-to/page.tsx | 110 | `/furnace-not-heating` | flat-target-missing-mdx |
| app/cost-guides/page.tsx | 78 | `/furnace-repair-costs` | flat-target-missing-mdx |
| app/troubleshooting/page.tsx | 69 | `/furnace-short-cycling` | flat-target-missing-mdx |
| app/cost-guides/page.tsx | 119 | `/furnace-tune-up-cost` | flat-target-missing-mdx |
| app/troubleshooting/page.tsx | 153 | `/furnace-water-leak` | flat-target-missing-mdx |
| app/buying-guides/page.tsx | 59 | `/heat-pump-buying-guide` | flat-target-missing-mdx |
| app/cost-guides/page.tsx | 37 | `/heat-pump-installation-cost` | flat-target-missing-mdx |
| app/troubleshooting/page.tsx | 77 | `/heat-pump-not-heating` | flat-target-missing-mdx |
| app/cost-guides/page.tsx | 85 | `/heat-pump-repair-costs` | flat-target-missing-mdx |
| app/how-to/page.tsx | 204 | `/heat-pumps/year-round-maintenance` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 85 | `/heating/uneven-heating` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 118 | `/how-to-fix-frozen-ac` | flat-target-missing-mdx |
| app/buying-guides/page.tsx | 95 | `/humidifiers/best-whole-house-humidifiers` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 243 | `/humidifiers/install-whole-house-humidifier` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 191 | `/installation/choosing-hvac-contractor` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 179 | `/installation/diy-vs-professional` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 185 | `/installation/hvac-financing-guide` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 173 | `/installation/hvac-installation-costs` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 149 | `/insulation/how-to-insulate-hvac-lines` | subdir-shape-not-a-flat-slug |
| components/calculators/FurnaceElectricalCalculator.tsx | 232 | `/kWh` | flat-target-missing-mdx |
| app/how-to/page.tsx | 24 | `/maintenance/how-to-change-hvac-filter` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 32 | `/maintenance/how-to-clean-ac-coils` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 40 | `/maintenance/how-to-clean-air-vents` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 180 | `/maintenance/how-to-winterize-ac` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 29 | `/mini-split-buying-guide` | flat-target-missing-mdx |
| app/how-to/page.tsx | 188 | `/prepare-furnace-for-winter` | flat-target-missing-mdx |
| app/how-to/page.tsx | 227 | `/repairs/how-to-replace-capacitor` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 71 | `/space-heaters/best-space-heaters` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 125 | `/thermostats/best-programmable-thermostats` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 113 | `/thermostats/best-smart-thermostats` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 87 | `/thermostats/how-to-calibrate-thermostat` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 63 | `/thermostats/how-to-install-smart-thermostat` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 264 | `/thermostats/how-to-install-smart-thermostat` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 79 | `/thermostats/how-to-program-thermostat` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 48 | `/thermostats/how-to-test-thermostat` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 71 | `/thermostats/how-to-wire-thermostat` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 119 | `/thermostats/nest-vs-ecobee` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 175 | `/thermostats/thermostat-troubleshooting` | subdir-shape-not-a-flat-slug |
| app/buying-guides/page.tsx | 131 | `/thermostats/zone-control-systems` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 270 | `/tools/diagnostic-checklist` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 276 | `/tools/error-codes` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 288 | `/tools/repair-cost-estimator` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 282 | `/tools/troubleshooting-flowchart` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 99 | `/troubleshooting/banging-noises` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 115 | `/troubleshooting/clicking-noises` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 161 | `/troubleshooting/frozen-condensate` | subdir-shape-not-a-flat-slug |
| app/how-to/page.tsx | 126 | `/troubleshooting/how-to-fix-hvac-noises` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 123 | `/troubleshooting/humming-noises` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 191 | `/troubleshooting/intermittent-operation` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 107 | `/troubleshooting/squealing-noises` | subdir-shape-not-a-flat-slug |
| app/troubleshooting/page.tsx | 183 | `/troubleshooting/wont-turn-off` | subdir-shape-not-a-flat-slug |
| app/hvac-dictionary/page.tsx | 597 | `/ultimate-buying-guide` | flat-target-missing-mdx |
| app/articles/page.tsx | 323 | `/what-is-a-heat-pump` | flat-target-missing-mdx |
| app/how-to/page.tsx | 157 | `/zoning/how-to-zone-hvac` | subdir-shape-not-a-flat-slug |

## Orphan pages (zero inbound internal links)

Count: **215** of 372 real routes.

This scan misses runtime-emitted links from the `<RelatedArticles>` component (which same-cluster picks 4 articles at build). So some of these orphans are actually reachable via cluster-siblings. But hub pages (`/troubleshooting`, `/how-to`, `/buying-guides`, `/cost-guides`, `/brand-reviews`, cluster hubs) do NOT enumerate every article — they hand-pick a few and link to a lot of broken targets. The result: about ~60% of the 353 articles are not reachable from ANY hub or nav element, which explains catastrophic indexation.

Sample (first 60):

- `14-seer-vs-16-seer-vs-20-seer`
- `15-2-seer2-vs-16-seer`
- `16-seer-vs-14-seer`
- `16-seer-vs-20-seer`
- `25c-tax-credit-explained`
- `3-phase-power-calculator`
- `5000-btu-air-conditioner-room-size`
- `ac-dry-mode-vs-dehumidifier`
- `ac-size-for-1000-sq-ft`
- `ac-size-for-3000-sq-ft`
- `ac-size-for-500-sq-ft`
- `air-conditioner-types`
- `air-duct-cleaning-worth-it`
- `air-purifier-guide`
- `air-source-vs-ground-source-heat-pump`
- `airdog-air-purifier-review`
- `alen-breathesmart-air-purifiers`
- `average-electric-bill-by-state`
- `basement-dehumidifier-setting`
- `battery-operated-heaters`
- `battery-watt-hours`
- `best-10000-btu-air-conditioners`
- `best-12000-btu-air-conditioners`
- `best-3-zone-mini-split`
- `best-4-zone-mini-split`
- `best-5-zone-mini-split`
- `best-air-curtains`
- `best-air-purifier-humidifier-combo`
- `best-air-purifiers-for-allergies`
- `best-air-purifiers-for-dust`
- `best-air-purifiers-for-mold`
- `best-air-purifiers-for-smoke`
- `best-air-scrubbers`
- `best-basement-dehumidifiers`
- `best-bedroom-air-purifiers`
- `best-central-ac-brands`
- `best-commercial-dehumidifiers`
- `best-dehumidifier-air-purifier-combo`
- `best-diy-mini-splits`
- `best-dual-hose-portable-acs`
- `best-electric-fireplaces`
- `best-electric-furnace`
- `best-electric-tankless-water-heaters`
- `best-energy-efficient-space-heaters`
- `best-evaporative-coolers`
- `best-gas-furnace-brands`
- `best-hepa-air-purifiers`
- `best-humidifiers-for-bedroom`
- `best-large-room-air-purifiers`
- `best-mini-split-for-garage`
- `best-mini-split-heat-pumps`
- `best-oil-furnace`
- `best-pellet-stoves`
- `best-portable-ac-for-apartment`
- `best-portable-generators`
- `best-small-dehumidifiers`
- `best-small-heaters`
- `best-space-heaters-for-large-rooms`
- `best-tankless-gas-water-heaters`
- `best-tankless-water-heaters`

Full orphan list saved to `AUDIT_INVENTORY/orphans_full.txt`.

## BFS depth from home page `/`

| depth | pages |
|---|---|
| 0 | 1 |
| 1 | 108 |
| 2 | 29 |
| 3 | 2 |

**Unreachable via internal-link BFS: 234 pages**. Header + Footer are counted as global emitters (edges from every page to nav items), so pages that ONLY appear on nav are reached at depth 1. Anything not in nav, hub-page card lists, or components (Popular/Recent) is unreached.

No pages > depth 3 reached (because Header/Footer flood everything at depth 1).
