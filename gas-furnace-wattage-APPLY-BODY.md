---
slug: "gas-furnace-wattage"
title: "How Many Watts Does a Gas Furnace Use? (Blower Motor Power, 2026)"
description: "How much electricity a gas furnace uses for its blower, inducer, igniter and controls, how to find your furnace's watts, what it costs to run, and what it means for generators and batteries."
author: "Marko Visic, BSc Physics"
dateModified: "2026-10-02"
relatedArticles:
  - "furnace-guide"
  - "what-size-generator-do-i-need"
  - "home-battery-backup-guide"
  - "kwh-cost-calculator"
  - "afue-rating-explained"
externalLinks:
  - label: "eCFR: 10 CFR Part 430 (furnace fan standards)"
    url: "https://www.ecfr.gov/current/title-10/chapter-II/subchapter-D/part-430"
---

import { SourcesBox, RelatedArticles, CalcWrapper } from '@/components'

# How Many Watts Does a Gas Furnace Use?

A gas furnace burns gas for heat, but it still needs electricity to run: mostly for the blower that pushes air through the ducts, plus a small draft inducer, the igniter and the controls. That electricity matters for your bill, and even more if you want to run the furnace from a generator or battery in an outage.

**Most of a gas furnace's electricity goes to its blower. Find your furnace's draw from its rating plate (amps × 120 volts); as an example, a blower drawing 500 watts for 8 hours a day uses 120 kWh a month, about $22 at 18 cents per kWh. Newer furnaces use more efficient blower motors, under a DOE furnace fan standard.**

<CalcWrapper calculator="furnace-electrical" />

## Where the electricity goes

- **Blower motor:** moves air through the ducts, and runs the whole time the furnace heats; it's the largest load.
- **Draft inducer:** a small fan that vents combustion gases before and during each cycle.
- **Igniter:** a hot-surface igniter draws power for a short time at the start of each cycle.
- **Controls:** the control board and thermostat use very little.

## Finding your furnace's watts

The rating plate inside the furnace door lists the electrical rating, often as amps at 120 volts; watts ≈ amps × 120. The blower motor has its own label with its amps. The calculator above estimates typical draws by motor type; your furnace's labels give its actual figures.

## What it costs to run

Cost = watts × hours ÷ 1,000 × your rate. A 500-watt blower running 8 hours a day for 30 days uses 120 kWh, about $21.60 at 18 cents per kWh. Many furnaces run the blower at lower speeds for much of the time, which uses less.

## Blower motor types

Older furnaces typically use single-speed or multi-speed PSC (permanent split capacitor) motors. Newer furnaces use electronically commutated (ECM) or similar variable-speed motors, which draw much less at the low speeds they spend most of their time at. The DOE's energy conservation standard for furnace fans, in effect since 2019, pushed new furnaces toward these more efficient motors.

## Generators and batteries

A gas furnace can run from a generator or a battery during an outage, as long as it's connected safely through a transfer switch or interlock. Size the generator or battery for the furnace's running watts plus the blower's start-up surge; see the [generator sizing guide](/what-size-generator-do-i-need) and the [home battery backup guide](/home-battery-backup-guide).

## Frequently asked questions

### How many watts does a gas furnace use?

Mostly its blower; check the rating plate (amps × 120 volts). Older single-speed blowers draw more than newer variable-speed motors.

### Can a generator run a gas furnace?

Yes, through a transfer switch or interlock, if it covers the furnace's running watts and the blower's start-up surge.

### How much does it cost to run a furnace blower?

About $21.60 a month for a 500-watt blower running 8 hours a day at 18 cents per kWh.

### Does a gas furnace work without electricity?

No. Without power, the blower, inducer, igniter and controls can't run, so the furnace won't heat.

<SourcesBox sources={[
  { title: "eCFR: 10 CFR Part 430 (energy conservation standards, including furnace fans)", url: "https://www.ecfr.gov/current/title-10/chapter-II/subchapter-D/part-430" },
  { title: "U.S. EIA: Electric Power Monthly (residential prices)", url: "https://www.eia.gov/electricity/monthly/" }
]} />

<RelatedArticles articles={frontmatter.relatedArticles} />
