---
slug: "hspf-rating-explained"
title: "HSPF and HSPF2 Explained: Heat Pump Heating Efficiency (2026)"
description: "What HSPF2 measures, how it relates to the old HSPF and to COP, the federal and ENERGY STAR minimums, what each rating costs to heat a home, and why cold climates need more than the number."
cluster: "energy-efficiency-ratings"
role: "spoke"
priority: "P2"
contentType: "explainer"
author: "Marko Visic, BSc Physics"
datePublished: "2026-02-05"
dateModified: "2026-10-01"
relatedArticles:
  - "seer2-to-seer-conversion"
  - "coefficient-of-performance"
  - "heat-pump-in-cold-weather"
  - "heat-pump-running-cost-calculator"
  - "seer2-rating-explained"
externalLinks:
  - label: "ENERGY STAR: Heat Pump Key Product Criteria"
    url: "https://www.energystar.gov/products/air_source_heat_pumps/key-product-criteria"
  - label: "eCFR: 10 CFR Part 430 (efficiency standards)"
    url: "https://www.ecfr.gov/current/title-10/chapter-II/subchapter-D/part-430"
---

import { SourcesBox, RelatedArticles } from '@/components'

# HSPF and HSPF2 Explained

HSPF2 is the heating counterpart of SEER2: it rates how much heat a heat pump delivers over a heating season for each watt-hour of electricity. A higher number means less electricity for the same warmth.

**HSPF2 is a season's heat output in BTU divided by electricity used in watt-hours. The federal minimum for split heat pumps is 7.5 HSPF2, and ENERGY STAR requires at least 7.8. For a 2,000 sq ft home with average insulation, heating at 7.5 HSPF2 costs about $1,400 a year at 18 cents per kWh, and at 10 HSPF2 about $1,050.**

## What HSPF2 measures

HSPF2, the Heating Seasonal Performance Factor 2, comes from a federal test that runs a heat pump at several outdoor temperatures, includes defrost and backup heat, and weights the results for a heating season in a moderate climate. Dividing it by 3.412 gives the seasonal COP: 7.8 HSPF2 is a seasonal COP of about 2.29.

## HSPF vs. HSPF2

Since January 1, 2023, heat pumps are rated in HSPF2, under a test with higher airflow resistance closer to real ductwork. The same equipment scores lower: HSPF2 is roughly HSPF × 0.85.

The DOE restated the old 8.8 HSPF minimum as 7.5 HSPF2. See the [SEER2 and HSPF2 conversion](/seer2-to-seer-conversion).

## Minimums

- **Federal minimum, split heat pumps:** 7.5 HSPF2.
- **ENERGY STAR, split heat pumps:** at least 7.8 HSPF2.
- **ENERGY STAR cold climate:** at least 8.1 HSPF2 for ducted and 8.5 for ductless systems, plus performance requirements at 5°F.

## What each rating costs to heat a home

A 2,000 sq ft home with average insulation in a climate with 4,500 heating degree days needs about 58 million BTU of heat a year. Heating kWh = heat needed ÷ (HSPF2 × 1,000):

| HSPF2 | Heating electricity | Cost at 18 cents per kWh |
|---|---|---|
| 7.5 | 7,776 kWh | $1,400 |
| 7.8 | 7,477 kWh | $1,346 |
| 8.2 | 7,112 kWh | $1,280 |
| 9.0 | 6,480 kWh | $1,166 |
| 10.0 | 5,832 kWh | $1,050 |

Our [heat pump running cost calculator](/heat-pump-running-cost-calculator) runs this for your home, climate and rate.

## Why cold climates need more than the number

HSPF2 is rated for a moderate climate. In colder places a heat pump spends more hours in deep cold, where its efficiency and output fall, so its real seasonal efficiency is lower than the label. For cold climates, look at a model's capacity and COP at 5°F, which ENERGY STAR's cold-climate criteria and NEEP's cold-climate list report; see [heat pumps in cold weather](/heat-pump-in-cold-weather).

## Frequently asked questions

### What is a good HSPF2 rating?

At least 7.8, the ENERGY STAR minimum for split heat pumps; 9 or higher saves noticeably more in heating-dominated climates.

### What is the minimum HSPF2 in 2026?

7.5 HSPF2 for split heat pumps, the federal minimum since 2023.

### How do I convert HSPF to HSPF2?

Multiply by about 0.85: the old 8.8 HSPF minimum became 7.5 HSPF2.

### Is HSPF2 the same as COP?

Related: HSPF2 ÷ 3.412 is the seasonal COP. 8.2 HSPF2 is a seasonal COP of about 2.4; see [COP explained](/coefficient-of-performance).

<SourcesBox sources={[
  { title: "ENERGY STAR: Heat Pump Key Product Criteria (7.8 HSPF2; cold climate 8.1 / 8.5)", url: "https://www.energystar.gov/products/air_source_heat_pumps/key-product-criteria" },
  { title: "eCFR: 10 CFR Part 430 (heat pump minimums in HSPF2)", url: "https://www.ecfr.gov/current/title-10/chapter-II/subchapter-D/part-430" },
  { title: "U.S. EIA: Electric Power Monthly (residential prices)", url: "https://www.eia.gov/electricity/monthly/" }
]} />

<RelatedArticles articles={frontmatter.relatedArticles} />
