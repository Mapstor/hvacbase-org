---
slug: "what-size-generator-do-i-need"
title: "What Size Generator Do I Need? Appliance Wattage Calculator (2026)"
description: "Size a generator from running watts plus the largest starting surge, with the calculator's appliance wattages, worked examples, central AC guidance and CPSC carbon monoxide rules."
cluster: "ac-sizing-selection"
role: "spoke"
priority: "P1"
contentType: "calculator-guide"
author: "Marko Visic, BSc Physics"
datePublished: "2026-02-05"
dateModified: "2026-09-25"
relatedArticles:
  - "what-size-generator-for-fridge"
  - "generator-guide"
  - "propane-generator-usage-per-hour"
  - "portable-generator-safety-tips"
  - "carbon-monoxide-detector-guide"
  - "ac-tonnage-calculator"
externalLinks:
  - label: "CPSC: Carbon monoxide deaths from portable generators (2022 report)"
    url: "https://www.cpsc.gov/Newsroom/News-Releases/2022/CPSC-Releases-New-Report-on-Carbon-Monoxide-CO-Fatalities-Urges-Generator-Safety-in-New-PSA"
  - label: "NFPA 70: National Electrical Code"
    url: "https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70"
---

import { SourcesBox, RelatedArticles, CalcWrapper } from '@/components'

# What Size Generator Do I Need? Appliance Wattage Calculator

The power is out, or you're buying a generator before the next storm. The common mistake is sizing for the wrong number. The running watts of your appliances add up to less than you'd think, but the moment the refrigerator compressor or the sump pump kicks on, it pulls a brief surge several times its running draw. A generator sized only for running watts trips its breaker right then.

The calculator below handles that surge, and every example on this page uses the same method and the same appliance values, so the page and the calculator agree.

**Add up the running watts of everything you want on at the same time, add the single largest starting surge, then add 20% headroom.** A refrigerator, a chest freezer, ten LED bulbs, a modem and phone chargers come to 475 running watts and a 1,525-watt peak, so a 2,000-watt generator covers them. Add a sump pump and a furnace blower and you need about 5,000 watts.

<CalcWrapper type="generator-sizing" />

## Running watts vs. starting watts

Anything with a motor draws an inrush of current for a moment as it starts: refrigerator and freezer compressors, sump and well pumps, furnace blowers, air conditioners. Loads without motors, such as LED lights, toasters, microwaves and space heaters, draw about the same power from the first second.

That's why the surge, not the running total, usually sets the generator size. The calculator assumes **only one motor starts at a time**, which is normal once everything is running, since compressors and pumps cycle at different moments. Right after power comes on is the exception, when everything wants to start at once. Bring loads on one at a time.

## How the calculator sizes a generator

1. **Add the running watts** of every appliance you select.
2. **Find the biggest starting surge**: for each appliance, starting watts minus running watts, and take the largest.
3. **Peak = running total + that surge.** The calculator shows the smallest generator that covers the peak.
4. **Add 20% headroom** and round up to the next size in its list: 1,000, 2,000, 2,200, 3,000, 3,500, 5,000, 5,500, 7,500 or 10,000 watts. That's the recommended size.

The appliance values built into the calculator:

| Appliance | Running watts | Starting watts |
|---|---|---|
| Refrigerator, standard (18–21 cu ft) | 150 | 1,200 |
| Refrigerator, side-by-side (22–26 cu ft) | 225 | 1,500 |
| Chest freezer (10–18 cu ft) | 150 | 900 |
| Upright freezer (10–18 cu ft) | 200 | 1,000 |
| Sump pump, 1/3 HP | 800 | 1,800 |
| Sump pump, 1/2 HP | 1,050 | 2,150 |
| Well pump, 1/2 HP | 1,000 | 2,100 |
| Well pump, 3/4 HP | 1,500 | 3,000 |
| Furnace blower, 1/2 HP | 800 | 2,350 |
| Window AC, 5,000 BTU | 500 | 1,200 |
| Window AC, 8,000 BTU | 700 | 1,800 |
| Window AC, 10,000 BTU | 900 | 2,200 |
| Microwave, 1,000 W | 1,000 | 1,000 |
| Space heater | 1,500 | 1,500 |
| 10 LED bulbs | 100 | 100 |
| Modem and router | 50 | 50 |

These are typical values. Motors vary a lot between models, so your appliance's nameplate or manual is the number to trust. Our [generator for a fridge](/what-size-generator-for-fridge) guide shows how to read a refrigerator's label.

## Three worked examples

**1. Keep the food cold and the lights on:** a standard refrigerator, a 10–18 cu ft chest freezer, 10 LED bulbs, a modem and router, and phone chargers.

- Running: 150 + 150 + 100 + 50 + 25 = **475 W**
- Largest surge: the refrigerator, 1,200 − 150 = **1,050 W**
- Peak: 475 + 1,050 = 1,525 W; with 20% headroom, **1,830 W → a 2,000 W generator**

**2. Add a 1/2 HP sump pump and a furnace blower**, the usual winter-storm essentials:

- Running: 475 + 1,050 + 800 = **2,325 W**
- Largest surge: the furnace blower, 2,350 − 800 = **1,550 W**
- Peak: 3,875 W; with headroom, **4,650 W → a 5,000 W generator**

**3. Add a 10,000 BTU window AC and a 1,000 W microwave:**

- Running: 2,325 + 900 + 1,000 = **4,225 W**
- Largest surge: still the furnace blower, **1,550 W**
- Peak: 5,775 W; with headroom, **6,930 W → a 7,500 W generator**

In the third example the sump pump, blower and window AC can each start while everything else runs, but the math only holds if they don't start at the same instant. If they might, add the second-largest surge as well.

## Can a generator run central air conditioning?

The calculator leaves central AC out because compressor surge varies too much between units to use a typical value. Use the condenser's nameplate instead. It lists two currents:

- **RLA (rated load amps):** the running current. Running watts ≈ RLA × voltage.
- **LRA (locked rotor amps):** the current at the instant the compressor starts. Starting surge ≈ LRA × voltage.

An example nameplate for a 5-ton condenser (yours will differ): RLA 26 A and LRA 134 A at 240 V. That's roughly **6,240 watts running** and **about 32,000 watts for the fraction of a second the compressor starts**, before you add anything else in the house.

So a large central AC on a portable generator is rarely practical. The options are a whole-home standby generator sized by an electrician, or a soft starter on the compressor, which limits the starting current. Manufacturers publish how much. Smaller systems follow the same arithmetic with their own nameplate numbers.

## Fuel and runtime

Fuel use depends on the load and on the generator. An engine burns fuel just to keep turning, so a generator carrying a few hundred watts uses more fuel per kilowatt-hour than one near half load. Inverter generators slow the engine down at light loads, which stretches a tank further when you're only running a fridge and lights.

The dependable number is the generator's spec sheet, which lists runtime per tank at 25% and 50% load. For fuel-by-fuel detail, see our [propane generator fuel guide](/propane-generator-usage-per-hour).

## Carbon monoxide: the part that kills people

The U.S. Consumer Product Safety Commission estimates that **about 85 people die each year** in the United States from carbon monoxide produced by gasoline-powered portable generators. In 2020, generators were linked to more CO deaths (92) than any other consumer product category. A single portable generator can put out as much CO as hundreds of cars. CPSC's rules:

- **Run it outside only, at least 20 feet from the house**, with the exhaust pointed away from doors, windows and vents.
- **Never run it inside the home, a garage, basement, crawlspace or shed**, even with the doors or windows open.
- **Put battery-powered or battery-backup CO alarms** on every level of the home. See our [carbon monoxide detector guide](/carbon-monoxide-detector-guide).

Connecting a generator to your house wiring needs a transfer switch or interlock installed by an electrician. The National Electrical Code requires transfer equipment for generator-fed systems, which keeps the generator from feeding power back into the utility lines, where it can electrocute line workers. Never plug a generator into a wall outlet.

## Frequently asked questions

### What size generator do I need to run my house?

For essentials only (refrigerator, freezer, lights, internet), about 2,000 watts. Add a sump pump and furnace blower and it's about 5,000; add a window AC and a microwave and it's about 7,500. Running central air conditioning and everything else at once usually takes a whole-home standby generator sized by an electrician.

### Will a 2,000-watt generator run a refrigerator?

Yes, with room to spare for a freezer, lights and chargers, as long as the refrigerator is the only motor starting at that moment. Example 1 above peaks at 1,525 watts.

### What's the difference between running and starting watts?

Running watts are the steady draw once an appliance is on. Starting watts are the brief surge a motor pulls as it starts, often several times its running draw. A generator has to cover the running total plus the largest surge.

### How long will a generator run on a tank of gas?

It depends on the generator and how much you're running. Check the spec sheet's runtime at 25% and 50% load. Light loads stretch a tank, inverter models especially, but an engine never gets fuel use down to zero while it's running.

### Do I need a transfer switch?

To power circuits through your home's wiring, yes. The electrical code requires transfer equipment, and an electrician installs it. Without one, run extension cords rated for the load from the generator (outside) directly to individual appliances.

### How far from the house should a generator be?

At least 20 feet, with the exhaust pointed away from the house, according to CPSC. Closer than that, or in a garage even with the door open, carbon monoxide can build up inside.

<SourcesBox sources={[
  { title: "CPSC: New report on CO fatalities from portable generators (2022)", url: "https://www.cpsc.gov/Newsroom/News-Releases/2022/CPSC-Releases-New-Report-on-Carbon-Monoxide-CO-Fatalities-Urges-Generator-Safety-in-New-PSA" },
  { title: "CPSC: Winter safety warning, CO deaths by product category (2024)", url: "https://www.cpsc.gov/Newsroom/News-Releases/2024/Stay-Safe-While-Staying-Warm-This-Winter-CPSC-Warns-Consumers-to-be-Cautious-When-Using-Generators-Furnaces-and-Space-Heaters" },
  { title: "CPSC: Upward trend in CO deaths, portable generator safety (2023)", url: "https://www.cpsc.gov/Newsroom/News-Releases/2023/New-CPSC-Report-Shows-Upward-Trend-in-Carbon-Monoxide-CO-Fatalities" },
  { title: "NFPA 70: National Electrical Code", url: "https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70" }
]} />

<RelatedArticles articles={frontmatter.relatedArticles} />
