---
slug: "hvac-cost-by-state"
title: "HVAC Cost by State: 2026 Electricity Rates, Efficiency Rules and Installation Costs"
description: "What heating and cooling cost to run in every state, from EIA's 2026 electricity rates, which federal efficiency region each state is in, and what drives installation prices."
cluster: "hvac-costs-location"
role: "hub"
priority: "P1"
contentType: "guide"
author: "Marko Visic, BSc Physics"
datePublished: "2026-02-08"
dateModified: "2026-09-28"
relatedArticles:
  - "central-ac-cost-to-install"
  - "heat-pump-cost-to-install"
  - "mini-split-installation-cost"
  - "minimum-seer-rating-by-state"
  - "kwh-cost-calculator"
externalLinks:
  - label: "U.S. EIA: Electric Power Monthly, Table 5.6.A (residential prices by state)"
    url: "https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a"
  - label: "eCFR: 10 CFR Part 430 (regional efficiency standards)"
    url: "https://www.ecfr.gov/current/title-10/chapter-II/subchapter-D/part-430"
---

import { SourcesBox, RelatedArticles } from '@/components'

# HVAC Cost by State

The same air conditioner costs very different amounts to own depending on the state. Two things drive the difference: what it costs to install, which follows local labor and market prices, and what it costs to run, which follows the local price of electricity. The second is published for every state; the first is set by local quotes.

**Electricity is the part you can compare directly. EIA's January-to-July 2026 residential averages range from 12.36 cents per kWh in North Dakota to 46.28 cents in Hawaii, so the same 3-ton air conditioner running the same hours costs about $467 a year in North Dakota, $687 at the U.S. average of 18.19 cents, and $1,748 in Hawaii.**

## Why HVAC costs vary by state

- **Electricity and gas prices** set the running cost, and they vary nearly fourfold across states.
- **Climate** decides how many hours the system runs and whether heating or cooling dominates.
- **Federal efficiency rules differ by region.** Air conditioners sold in the South and Southwest must meet a higher minimum than in the North.
- **Labor and permits** set most of the installation price, and they follow local wages and codes.

## State by state: electricity rates and efficiency regions

The rate is EIA's January-to-July 2026 residential average. The cost of 1,000 kWh is that rate times 1,000, a useful yardstick: a 3-ton air conditioner at 14.3 SEER2 uses about 1,000 kWh for every 400 full-load hours. The minimum SEER2 is for split central air conditioners below 45,000 BTU per hour.

{{STATE_TABLE}}

## What the same air conditioner costs to run

A 3-ton system at 14.3 SEER2 running 1,500 full-load hours uses about 3,776 kWh a year (36,000 BTU × 1,500 hours ÷ 14,300). That costs about $467 at North Dakota's rate, $687 at the U.S. average and $1,748 at Hawaii's. Hot states also run more hours, so their real bills diverge even further; our [kWh cost calculator](/kwh-cost-calculator) runs it with your numbers.

## Federal efficiency regions

- **North:** split air conditioners need at least 13.4 SEER2.
- **Southeast** (Alabama, Arkansas, Delaware, the District of Columbia, Florida, Georgia, Hawaii, Kentucky, Louisiana, Maryland, Mississippi, North Carolina, Oklahoma, South Carolina, Tennessee, Texas and Virginia): 14.3 SEER2 below 45,000 BTU per hour, 13.8 at 45,000 and above.
- **Southwest** (Arizona, California, Nevada and New Mexico): the same SEER2 minimums as the Southeast, plus a minimum EER2.

Split heat pumps need 14.3 SEER2 everywhere. See [minimum SEER2 by state](/minimum-seer-rating-by-state).

## Installation costs

There's no official state-by-state data on installed HVAC prices; they come from local contractors and move with local wages, permit fees and demand. For typical national ranges by equipment type, see our cost guides for [central air](/central-ac-cost-to-install), [heat pumps](/heat-pump-cost-to-install) and [mini splits](/mini-split-installation-cost). Get at least three itemized quotes, and compare what each includes.

## Rebates by state

The federal HEAR rebates for heat pumps and related upgrades are run by each state, with its own launch date and rules, and utilities add programs of their own. The DSIRE database lists incentives by state; see also [HVAC tax credits 2026](/hvac-tax-credits-2026).

## Frequently asked questions

### Which state has the cheapest electricity for air conditioning?

North Dakota, at 12.36 cents per kWh for January to July 2026, per the EIA. Hawaii is the most expensive at 46.28 cents.

### Why does HVAC installation cost more in some states?

Mostly labor. Installation prices follow local wages, permit costs and demand, which is why quotes in high-cost metro areas run well above those in rural areas.

### What SEER2 rating do I need in my state?

At least 13.4 SEER2 in the North and 14.3 in the South and Southwest for split air conditioners below 45,000 BTU per hour. The table above shows each state's minimum.

### How much does it cost to run central air in my state?

Multiply the kWh your system uses by your state's rate. A 3-ton, 14.3 SEER2 system running 1,500 full-load hours uses about 3,776 kWh, about $687 a year at the U.S. average rate.

<SourcesBox sources={[
  { title: "U.S. EIA: Electric Power Monthly, Table 5.6.A, residential prices by state (January to July 2026)", url: "https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a" },
  { title: "eCFR: 10 CFR Part 430 (regional efficiency standards for central air conditioners)", url: "https://www.ecfr.gov/current/title-10/chapter-II/subchapter-D/part-430" },
  { title: "U.S. DOE: Home Energy Rebate Programs", url: "https://www.energy.gov/scep/home-energy-rebate-programs" },
  { title: "DSIRE: Database of State Incentives for Renewables & Efficiency", url: "https://www.dsireusa.org/" }
]} />

<RelatedArticles articles={frontmatter.relatedArticles} />
