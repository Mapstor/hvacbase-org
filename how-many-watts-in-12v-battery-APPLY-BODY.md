---
slug: "how-many-watts-in-12v-battery"
title: "How Many Watts in a 12V Battery? (Calculator + Chart)"
description: "Watt-hours in a 12V battery from its amp-hours, how much of it you can actually use for lithium and lead-acid, how long it runs common loads, and how long it takes to recharge."
cluster: "batteries-solar"
role: "spoke"
priority: 2
contentType: "calculator-guide"
author: "Marko Visic, BSc Physics"
datePublished: "2026-02-07"
dateModified: "2026-09-28"
relatedArticles:
  - "home-battery-backup-guide"
  - "power-consumption-calculator"
  - "wire-gauge-chart"
  - "kwh-cost-calculator"
  - "what-size-generator-do-i-need"
externalLinks:
  - label: "U.S. EIA: Units and calculators explained"
    url: "https://www.eia.gov/energyexplained/units-and-calculators/"
---

import { SourcesBox, RelatedArticles, CalcWrapper } from '@/components'

# How Many Watts in a 12V Battery?

A battery's label gives amp-hours, but what you want to know is how long it will run your fridge, lights or inverter. That takes two steps: converting amp-hours to watt-hours, then working out how much of that energy you can actually use.

**Watt-hours = amp-hours × volts, so a 100 Ah 12V battery stores about 1,200 Wh. With the calculator's assumptions, a lithium iron phosphate battery delivers about 933 Wh of that, running a 100-watt load for about 9.3 hours; a lead-acid battery about 502 Wh, or 5 hours.**

<CalcWrapper type="battery-12v-watts" />

## Watts, watt-hours and amp-hours

- **Watts** measure power: how fast a device uses energy right now. Watts = volts × amps.
- **Watt-hours** measure energy: a 100-watt load for 1 hour uses 100 Wh.
- **Amp-hours** measure charge: 100 Ah can supply 1 amp for 100 hours, or 10 amps for 10 hours, in theory.

The calculator uses 12 volts. A lithium iron phosphate battery's nominal voltage is closer to 12.8, so its true energy is a few percent higher.

## How much of the energy you can use

The calculator multiplies the stored energy by three factors, all assumptions you can change:

- **Usable depth of discharge:** about 90% for lithium iron phosphate and 50% for lead-acid, since draining lead-acid deeper shortens its life. Check your battery's specs.
- **System efficiency:** 90%, for inverter and wiring losses.
- **Temperature:** capacity drops in the cold; at 68°F the calculator applies 96% for lithium and 93% for lead-acid.

## 12V battery chart

At 68°F, with the calculator's default assumptions:

| Battery | Stored energy | Usable, lithium iron phosphate | Usable, lead-acid |
|---|---|---|---|
| 35 Ah | 420 Wh | 327 Wh | 176 Wh |
| 55 Ah | 660 Wh | 513 Wh | 276 Wh |
| 75 Ah | 900 Wh | 700 Wh | 377 Wh |
| 100 Ah | 1,200 Wh | 933 Wh | 502 Wh |
| 150 Ah | 1,800 Wh | 1,400 Wh | 753 Wh |
| 200 Ah | 2,400 Wh | 1,866 Wh | 1,004 Wh |

## How long a 100 Ah battery runs common loads

Runtime = usable watt-hours ÷ the load's watts:

| Load | Lithium iron phosphate | Lead-acid |
|---|---|---|
| LED strip, 24 W | 38.9 hours | 20.9 hours |
| 12V fridge, 45 W | 20.7 hours | 11.2 hours |
| Water pump, 60 W | 15.6 hours | 8.4 hours |
| 300 W through an inverter | 3.1 hours | 1.7 hours |

A fridge cycles on and off, so its average draw is usually below its rated watts, and it runs longer than the table shows.

## Recharging

Charge at the rate your battery's maker specifies. The calculator's charge-time estimate assumes 10% of capacity, 10 amps for a 100 Ah battery, plus about 15% for charging losses: about 11.5 hours from empty to full. Faster charging is possible where the battery and charger are rated for it.

## Wiring

At 12 volts, power means high current: 300 watts draws 25 amps. Size wires and fuses for that current under the NEC for buildings or ABYC E-11 for boats; see our [wire gauge chart](/wire-gauge-chart).

## Frequently asked questions

### How many watts is a 100Ah 12V battery?

It stores about 1,200 watt-hours. You can use about 933 Wh from a lithium iron phosphate battery and about 502 Wh from lead-acid under the calculator's assumptions.

### How long will a 12V battery run a 100-watt load?

A 100 Ah lithium iron phosphate battery runs it about 9.3 hours, and a lead-acid battery about 5 hours, at 68°F.

### How many amps does a 12V device draw?

Divide its watts by 12. A 60-watt pump draws 5 amps; a 300-watt inverter load about 25 amps.

### Why can I only use half of a lead-acid battery?

Discharging lead-acid below about 50% shortens its life sharply, so 50% is the usual working limit. Lithium iron phosphate tolerates much deeper discharge.

<SourcesBox sources={[
  { title: "U.S. EIA: Units and calculators explained (watts, watt-hours, kilowatt-hours)", url: "https://www.eia.gov/energyexplained/units-and-calculators/" }
]} />

<RelatedArticles articles={frontmatter.relatedArticles} />
