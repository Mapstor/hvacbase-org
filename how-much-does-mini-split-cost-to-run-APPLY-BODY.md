---
slug: "how-much-does-mini-split-cost-to-run"
title: "How Much Does It Cost to Run a Mini Split? (Monthly Calculator)"
description: "What a mini split costs to run: the formula from SEER2 and HSPF2, yearly and monthly cost by size, heating vs cooling, and how your electricity rate changes it."
cluster: "mini-split-air-conditioners"
role: "spoke"
priority: "P1"
contentType: "calculator"
author: "Marko Visic, BSc Physics"
datePublished: "2026-01-15"
dateModified: "2026-09-28"
relatedArticles:
  - "mini-split-electricity-usage"
  - "mini-split-sizing-calculator"
  - "seer2-comparison-calculator"
  - "kwh-cost-calculator"
  - "mini-split-installation-cost"
externalLinks:
  - label: "U.S. EIA: Electric Power Monthly (residential prices)"
    url: "https://www.eia.gov/electricity/monthly/"
  - label: "U.S. DOE: Energy Saver 101, Home Cooling (PDF)"
    url: "https://www.energy.gov/sites/prod/files/2014/06/f16/HomeCooling101.pdf"
---

import { SourcesBox, RelatedArticles, CalcWrapper } from '@/components'

# How Much Does It Cost to Run a Mini Split?

A mini split's cost to run comes down to three numbers on its spec sheet and your bill: its capacity in BTU, its efficiency rating, and your price per kWh. How many hours it works hardest in your climate sets the rest.

**A 12,000 BTU mini split rated 20 SEER2, doing the equivalent of 1,500 full-load hours of cooling a year, uses about 900 kWh: about $162 a year at 18 cents per kWh, or about $32 a month over a five-month cooling season. Heating costs more where winters are long: the same unit at 9 HSPF2 over 1,000 full-load heating hours uses about 1,333 kWh, about $240.**

<CalcWrapper calculator="kwh-cost" />

Use the calculator with your unit's average draw in watts: its capacity divided by its SEER2 rating. A 12,000 BTU unit at 20 SEER2 averages about 600 watts while cooling.

## The formula

- **Cooling kWh per year = BTU × full-load hours ÷ (SEER2 × 1,000).**
- **Heating kWh per year = BTU × full-load hours ÷ (HSPF2 × 1,000).**

Full-load hours are the hours the unit would run at full capacity to deliver a season's cooling or heating. A mild summer might be 600, a hot one 2,000 or more.

## Cost by size

At 20 SEER2, 1,500 full-load cooling hours and 18 cents per kWh:

| Size | kWh per year | Cost per year | Per month over 5 months |
|---|---|---|---|
| 9,000 BTU | 675 | $122 | $24 |
| 12,000 BTU | 900 | $162 | $32 |
| 18,000 BTU | 1,350 | $243 | $49 |
| 24,000 BTU | 1,800 | $324 | $65 |
| 36,000 BTU | 2,700 | $486 | $97 |

Efficiency matters as much as size. A 12,000 BTU unit at 16 SEER2 uses about 1,125 kWh a year ($202), and one at 25 SEER2 about 720 kWh ($130).

## Your electricity rate

The same 900 kWh costs about $111 a year at North Dakota's 12.36 cents per kWh and about $417 at Hawaii's 46.28, the lowest and highest state averages for January to July 2026 (EIA). Our [kWh cost calculator](/kwh-cost-calculator) lists every state.

## Mini split vs. central air

For the same 12,000 BTU of cooling over 1,500 hours, a central air conditioner at the 14.3 SEER2 minimum would use about 1,259 kWh, about $227 a year. Central systems also lose energy through their ducts; the DOE puts duct air losses at about 30% of a cooling system's energy. Ductless mini splits avoid that loss, which is a large part of their running-cost advantage.

## How to lower the cost

- **Clean the filters.** The DOE says clean filters can lower an air conditioner's energy use by 5 to 15%.
- **Set it and leave it.** Mini splits run most efficiently at steady, moderate output rather than big temperature swings.
- **Shade the outdoor unit and the room's windows**, which cuts the cooling load.
- **Size it right.** An oversized head cycles on and off; see the [mini split sizing calculator](/mini-split-sizing-calculator).

## Frequently asked questions

### How much does it cost to run a mini split per month?

A 12,000 BTU unit at 20 SEER2 costs about $32 a month over a five-month cooling season at 18 cents per kWh. Larger units, lower ratings, hotter climates and higher rates raise it.

### Is a mini split cheaper to run than central air?

Usually. For the same cooling, a 20 SEER2 mini split uses about 29% less electricity than a 14.3 SEER2 central system, before counting the central system's duct losses.

### Does a mini split cost more to run for heating or cooling?

Where winters are long, heating. HSPF2 ratings are lower than SEER2 ratings, and heating seasons are often longer, so the same unit can use more electricity in winter.

### How many watts does a 12,000 BTU mini split use?

About 600 watts on average at 20 SEER2 (12,000 ÷ 20). It draws more at full speed and less when it throttles down; see [mini split electricity usage](/mini-split-electricity-usage).

<SourcesBox sources={[
  { title: "U.S. EIA: Electric Power Monthly, residential prices (January to July 2026)", url: "https://www.eia.gov/electricity/monthly/" },
  { title: "U.S. DOE: Energy Saver 101, Home Cooling (PDF)", url: "https://www.energy.gov/sites/prod/files/2014/06/f16/HomeCooling101.pdf" },
  { title: "eCFR: 10 CFR Part 430, Subpart B (SEER2 and HSPF2 test procedures)", url: "https://www.ecfr.gov/current/title-10/chapter-II/subchapter-D/part-430/subpart-B" }
]} />

<RelatedArticles articles={frontmatter.relatedArticles} />
