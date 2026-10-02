---
slug: "heat-pump-running-cost-calculator"
title: "Heat Pump Running Cost Calculator (Monthly & Annual)"
description: "Estimate what a heat pump costs to run for heating and cooling, by climate zone, insulation and electricity rate, with cost per million BTU against gas, propane and oil."
cluster: "heat-pumps"
role: "spoke"
priority: "P1"
contentType: "calculator"
author: "Marko Visic, BSc Physics"
datePublished: "2026-02-05"
dateModified: "2026-09-28"
relatedArticles:
  - "furnace-vs-heat-pump"
  - "gas-vs-electric-heating-cost"
  - "heat-pump-size-calculator"
  - "coefficient-of-performance"
  - "heat-pump-in-cold-weather"
externalLinks:
  - label: "U.S. EIA: Electric Power Monthly (residential prices by state)"
    url: "https://www.eia.gov/electricity/monthly/"
  - label: "U.S. EIA: British thermal units (fuel energy content)"
    url: "https://www.eia.gov/energyexplained/units-and-calculators/british-thermal-units.php"
---

import { SourcesBox, RelatedArticles, CalcWrapper } from '@/components'

# Heat Pump Running Cost Calculator

A heat pump's electric bill comes from two jobs, heating in winter and cooling in summer, and the split depends on your climate. The calculator works out both from your home's size, insulation, climate zone, the heat pump's ratings and your electricity rate.

**For a 2,000 sq ft home with average insulation in a mixed climate, at 18 cents per kWh, the calculator estimates about $2,228 a year: $1,280 for heating and $947 for cooling, an average of $186 a month. In a very cold zone it's about $4,154 a year; in a very hot one, about $1,798.**

<CalcWrapper type="heat-pump-running-cost" />

## How the calculator works

- **Heating:** the house's heat loss (from the same model as our [furnace size calculator](/furnace-sizing-calculator)) × your climate's heating degree days, divided by the heat pump's HSPF2. HSPF2 is rated for a moderate climate, so in cold and very cold zones the calculator assumes a lower seasonal efficiency, 6.5 and 5.0.
- **Cooling:** the cooling load × your climate's cooling hours, divided by SEER2.
- **Cost:** kWh × your rate. Pick your state to use its EIA average for January to July 2026.

## Running cost by climate zone

The default home at 18 cents per kWh:

| Climate zone | Heating | Cooling | Total per year | Average per month |
|---|---|---|---|---|
| Very cold | $3,732 | $421 | $4,154 | $346 |
| Cold | $2,333 | $632 | $2,964 | $247 |
| Mixed | $1,280 | $947 | $2,228 | $186 |
| Hot | $711 | $1,316 | $2,027 | $169 |
| Very hot | $114 | $1,684 | $1,798 | $150 |

The monthly figure is an average; bills peak in the coldest and hottest months and fall in spring and fall.

## Your electricity rate

The same mixed-climate home costs about $1,530 a year at North Dakota's 12.36 cents per kWh, $2,251 at the U.S. average of 18.19 cents and $5,727 at Hawaii's 46.28 cents, the lowest and highest state averages (EIA). Every state's rate is in our [kWh cost calculator](/kwh-cost-calculator).

## Against gas, propane and oil

Cost per million BTU of heat delivered:

| Heat source | Assumption | Cost per million BTU |
|---|---|---|
| Heat pump, mixed zone | HSPF2 8.2, 18 cents per kWh | $21.95 |
| Heat pump, very cold zone | HSPF2 5.0 | $36.00 |
| Gas furnace, 95% | $1.35 per therm | $14.21 |
| Propane furnace, 95% | Example: $3.00 per gallon | $34.53 |
| Oil furnace, 85% | Example: $4.00 per gallon | $33.98 |

At these prices a heat pump costs less to heat with than propane or oil, but more than natural gas. HSPF2 8.2 is a seasonal COP of about 2.4; at the U.S. average rate, it takes about 3.75 to match a 95% gas furnace. See [gas vs. electric heating cost](/gas-vs-electric-heating-cost) and [furnace vs. heat pump](/furnace-vs-heat-pump).

## How to lower the cost

- **Improve insulation and air sealing.** In the calculator, moving from average to good insulation cuts the heating load by about 30%.
- **Use modest thermostat setbacks.** Deep setbacks can trigger the electric backup heat on recovery; see [smart thermostat savings](/smart-thermostat-savings).
- **Keep filters and coils clean.** The DOE says clean filters can lower an air conditioner's energy use by 5 to 15%.
- **In cold climates, choose a cold-climate model** with a higher HSPF2.

## Frequently asked questions

### How much does a heat pump cost to run per month?

About $186 a month on average for a 2,000 sq ft home with average insulation in a mixed climate at 18 cents per kWh, more in winter and summer and less in between.

### Is a heat pump cheaper to run than gas?

At $1.35 per therm and 18 cents per kWh, usually not for heating. It is cheaper than propane or oil at typical prices.

### Why is my heat pump bill so high in winter?

Colder air makes the heat pump less efficient, and the backup heat may run on the coldest days.

### Does a heat pump cost more for heating or cooling?

In cold and mixed climates, heating; in hot climates, cooling.

<SourcesBox sources={[
  { title: "U.S. EIA: Electric Power Monthly, residential prices by state (January to July 2026)", url: "https://www.eia.gov/electricity/monthly/" },
  { title: "U.S. EIA: British thermal units (propane 91,452 BTU per gallon)", url: "https://www.eia.gov/energyexplained/units-and-calculators/british-thermal-units.php" },
  { title: "U.S. DOE: Energy Saver 101, Home Cooling (PDF), clean filters 5 to 15%", url: "https://www.energy.gov/sites/prod/files/2014/06/f16/HomeCooling101.pdf" }
]} />

<RelatedArticles articles={frontmatter.relatedArticles} />
