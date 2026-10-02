---
slug: "battery-watt-hours"
title: "Battery Watt-Hours Calculator: Wh = Volts × Amp-Hours (2026)"
description: "Calculate any battery's watt-hours from volts and amp-hours or mAh, with nominal voltages by chemistry, examples from AA cells to home batteries, usable capacity, and airline limits."
cluster: "batteries-solar"
role: "spoke"
priority: "P2"
contentType: "calculator"
author: "Marko Visic, BSc Physics"
datePublished: "2026-02-07"
dateModified: "2026-09-28"
relatedArticles:
  - "how-many-watts-in-12v-battery"
  - "home-battery-backup-guide"
  - "solar-panel-calculator"
  - "power-consumption-calculator"
  - "kwh-cost-calculator"
externalLinks:
  - label: "FAA: PackSafe, lithium batteries"
    url: "https://www.faa.gov/hazmat/packsafe/lithium-batteries"
  - label: "U.S. EIA: Units and calculators explained"
    url: "https://www.eia.gov/energyexplained/units-and-calculators/"
---

import { SourcesBox, RelatedArticles, CalcWrapper } from '@/components'

# Battery Watt-Hours Calculator

Watt-hours measure how much energy a battery stores, which is what decides how long it runs a device. Labels usually give amp-hours or milliamp-hours instead, so the conversion is the first step.

**Watt-hours = volts × amp-hours. A 12-volt, 100 Ah battery stores 1,200 Wh; a phone battery of 3.85 volts and 4,500 mAh stores about 17.3 Wh. For milliamp-hours, divide by 1,000 first.**

<CalcWrapper type="battery-watt-hours" />

## The formula

- **Wh = V × Ah**
- **Ah = mAh ÷ 1,000**
- **kWh = Wh ÷ 1,000**

Use the battery's nominal voltage, its average during discharge, not the higher voltage when fully charged.

## Nominal voltage by chemistry

| Chemistry | Nominal voltage per cell | Common packs |
|---|---|---|
| Alkaline | 1.5 V | AA, AAA, C, D |
| Nickel-metal hydride | 1.2 V | Rechargeable AA, AAA |
| Lithium-ion | 3.6 to 3.85 V | Phones, laptops, power banks |
| Lithium iron phosphate | 3.2 V | 4 cells = 12.8 V |
| Lead-acid | 2.0 V | 6 cells = 12 V |

## Examples

| Battery | Voltage × capacity | Watt-hours |
|---|---|---|
| AA alkaline | 1.5 V × 2.5 Ah | 3.75 Wh |
| Phone | 3.85 V × 4.5 Ah | 17.3 Wh |
| Power bank, 20,000 mAh | 3.7 V × 20 Ah | 74 Wh |
| Lead-acid, 12 V, 100 Ah | 12 V × 100 Ah | 1,200 Wh |
| Lithium iron phosphate, 100 Ah | 12.8 V × 100 Ah | 1,280 Wh |
| Home battery bank, 200 Ah | 51.2 V × 200 Ah | 10,240 Wh (10.2 kWh) |

A power bank's mAh rating is at its internal cells' voltage, about 3.7 volts, not the 5 volts it delivers over USB; converting it to watt-hours avoids that confusion.

## Usable energy and runtime

Not all stored energy is usable. Lead-acid batteries are usually discharged only to about 50% to protect their life, lithium iron phosphate much deeper, and inverters lose some energy converting to household AC.

As an example, the 10.2 kWh bank above at 90% usable and 90% inverter efficiency delivers about 8.3 kWh: about 8.3 hours at a steady 1,000-watt load. See [how many watts in a 12V battery](/how-many-watts-in-12v-battery) for runtimes of common loads.

## Airline limits

The FAA allows spare lithium-ion batteries of up to 100 Wh in carry-on bags, and 101 to 160 Wh with airline approval; spares aren't allowed in checked bags. A 74 Wh power bank is under the limit; check the Wh on the label, or work it out from mAh and voltage.

## Frequently asked questions

### How do I calculate battery watt-hours?

Multiply the nominal voltage by the amp-hours. For mAh, divide by 1,000 first: 3.7 volts × 20,000 mAh is 74 Wh.

### How many watt-hours is a 100Ah battery?

1,200 Wh at 12 volts, or 1,280 Wh for a 12.8-volt lithium iron phosphate battery.

### How many watt-hours can I take on a plane?

Spare lithium-ion batteries up to 100 Wh in carry-on bags, and 101 to 160 Wh with the airline's approval, according to the FAA.

### How long will a battery run my device?

Usable watt-hours ÷ the device's watts. A 1,000-watt load runs about 8.3 hours on 8.3 kWh of usable energy.

<SourcesBox sources={[
  { title: "FAA: PackSafe, lithium batteries (100 Wh and 160 Wh limits)", url: "https://www.faa.gov/hazmat/packsafe/lithium-batteries" },
  { title: "U.S. EIA: Units and calculators explained (watt-hours and kilowatt-hours)", url: "https://www.eia.gov/energyexplained/units-and-calculators/" }
]} />

<RelatedArticles articles={frontmatter.relatedArticles} />
