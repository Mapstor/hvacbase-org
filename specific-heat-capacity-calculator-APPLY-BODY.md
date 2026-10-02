---
slug: "specific-heat-capacity-calculator"
title: "Specific Heat Capacity Calculator: Q = mcΔT for Water, Air and Materials (2026)"
description: "Calculate the energy to heat or cool any material with Q = mcΔT, with specific heats for water, air, metals and building materials, worked HVAC examples, and what they cost in electricity."
author: "Marko Visic, BSc Physics"
dateModified: "2026-10-01"
relatedArticles:
  - "kwh-cost-calculator"
  - "water-heater-sizing-calculator"
  - "btucfm-ductwork-relationship"
  - "electric-water-heating-cost"
  - "power-consumption-calculator"
externalLinks:
  - label: "NIST Chemistry WebBook"
    url: "https://webbook.nist.gov/chemistry/"
---

import { SourcesBox, RelatedArticles, CalcWrapper } from '@/components'

# Specific Heat Capacity Calculator

Specific heat capacity is how much energy it takes to warm one unit of mass by one degree. It's why a pot of water takes minutes to heat while the air in a room warms quickly, and it's the physics behind every water heater and HVAC calculation.

**Q = m × c × ΔT: energy equals mass times specific heat times the temperature change. Water's specific heat is 4.186 J/(g·°C), 1 BTU per pound per °F by the BTU's definition, so heating a 50-gallon tank of water (about 417 lb) by 65°F takes about 27,105 BTU, or 7.94 kWh: about $1.43 at 18 cents per kWh.**

<CalcWrapper type="specific-heat" />

## The formula

- **Q = m × c × ΔT**, in joules with mass in grams and c in J/(g·°C), or in BTU with pounds and BTU/(lb·°F).
- **Solve for temperature:** ΔT = Q ÷ (m × c).
- **Solve for mass:** m = Q ÷ (c × ΔT).

One BTU warms one pound of water by 1°F; one kWh is 3,412 BTU.

## Specific heats of common materials

The values the calculator uses:

| Material | Specific heat, J/(g·°C) | Density, kg/m³ |
|---|---|---|
| Water | 4.186 | 1,000 |
| Ethanol | 2.44 | 789 |
| Ice | 2.09 | 917 |
| Oak wood | 2.01 | 750 |
| Engine oil | 1.88 | 900 |
| Air (dry) | 1.005 | 1.225 |
| Aluminum | 0.903 | 2,700 |
| Concrete | 0.88 | 2,400 |
| Glass | 0.84 | 2,500 |
| Steel | 0.49 | 7,850 |
| Copper | 0.385 | 8,960 |

Values for wood and concrete vary with species, moisture and mix; treat them as typical.

## Why water dominates HVAC

Per unit of volume, water holds about 3,400 times more heat than air, because it's both denser and has a higher specific heat. That's why hydronic systems move heat through small pipes while forced-air systems need large ducts.

## Worked examples

- **Water heater:** 50 gallons is about 417 lb; heating it 65°F takes 417 × 65 = 27,105 BTU, or 7.94 kWh, about $1.43 at 18 cents per kWh with a resistance element.
- **Antifreeze:** a 50% propylene glycol mix has a specific heat of about 0.81 BTU/(lb·°F) and a density of about 8.80 lb per gallon, so a gallon carries 7.15 BTU per °F against water's 8.34: about 14% less, which a solar or hydronic system makes up with more flow.
- **Air:** heating air takes far less energy per pound but far more volume; see [BTU to CFM for ductwork](/btucfm-ductwork-relationship).

## Frequently asked questions

### What is the specific heat of water?

4.186 J/(g·°C), or 1 BTU/(lb·°F).

### How do I calculate the energy needed to heat water?

Multiply pounds of water by the temperature rise in °F: the answer is in BTU. Divide by 3,412 for kWh.

### Why does water take so long to heat?

Its specific heat is high: about four times that of air per unit mass, and about 3,400 times per unit volume.

### What is the formula Q = mcΔT?

Heat energy = mass × specific heat × temperature change.

<SourcesBox sources={[
  { title: "NIST Chemistry WebBook (thermophysical properties)", url: "https://webbook.nist.gov/chemistry/" },
  { title: "U.S. EIA: Units and calculators explained (BTU and kWh)", url: "https://www.eia.gov/energyexplained/units-and-calculators/" }
]} />

<RelatedArticles articles={frontmatter.relatedArticles} />
