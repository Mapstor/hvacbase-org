# DEAD_LINKS.md — Batch 4A external citation inventory

Date: 2026-07-16
Method: extracted every `https?://` URL from `content/**/*.mdx` + `app/**/*.tsx` with file:line. Excluded: hvacbase.org self-refs, fonts.googleapis/gstatic, schema.org, LinkedIn author link.

**Read-only.** No edits. No guessed replacement URLs. Figures verified in Batches 2-2B stay in place — this is URL repair.

## Scope totals

| Metric | Count |
|---|---|
| Total external URL occurrences (file:line) | **2,663** |
| Unique URLs | **610** |
| Unique hosts | **~100** |

## Dead-suspect scope (per user's confirmations)

| Pattern | Unique URLs | File:line occurrences | Status |
|---|---|---|---|
| **energy.gov/energysaver/*** | 53 | **416** | CONFIRMED DEAD (whole `/energysaver/` subtree removed) |
| **energystar.gov/products/*** | 30 | **330** | CONFIRMED DEAD |
| **energystar.gov/campaign/*** | 6 | 16 | CONFIRMED DEAD |
| energystar.gov/saveathome/* | 3 | 6 | **WORKS** (per user verification) — KEEP |
| epa.gov/* (needs per-URL check) | 37 | 167 | UNCONFIRMED — some dead, some live |

**Total dead-suspect citation surface: ~760 file:line occurrences** (energy.gov/energysaver + energystar/products + energystar/campaign combined).

---

## 🚨 PRIORITY — 4 links I added in Batches 2B/Round-2 that ship a 404 in a citation-added-as-fix

These are the highest-priority repairs because they're citations I added as **evidence** for figures during Batch 2B and Recertify Round 2. Every one now serves the reader a 404 when they click "source."

| URL | Occurrences | Batches added in | Files |
|---|---|---|---|
| `energy.gov/energysaver/maintaining-your-air-conditioner` | 15 | commit `e97c61c` (hvac-maintenance-checklist) | 6+ MDX files (dirty-furnace-filter-photos, furnace-filter-direction, furnace-filter-merv-rating, hvac-maintenance-checklist, ...) |
| `energy.gov/energysaver/energy-efficient-windows` | 1 | commit `f3048a4` (DOE window heat gain correction) | ac-sizing-selection/air-conditioner-btu-calculator.mdx:131 |
| `energy.gov/energysaver/thermostats` | 19 | commits `37e6e45`, `c813cf8` (setback cluster) | 5+ MDX files (electric-fireplace-cost-to-run, furnace-blowing-cold-air, furnace-guide, thermostat-heat-on-but-no-heat, thermostat-temperature-winter, smart-thermostat FAQ answers) |
| `energy.gov/energysaver/tankless-or-demand-type-water-heaters` | 20 | commit `66d728c` (tankless range-collapse fix) | 4+ MDX files (what-size-tankless-water-heater x3, best-electric-tankless-water-heaters, electric-vs-gas-tankless, ...) |

**Total priority-fix occurrences: 55.**

The claims these citations support ARE verified (DOE publishes them, per user's per-figure verification). The URLs to those DOE pages moved when DOE restructured `/energysaver/` into a different tree. Marko needs to supply the live replacement paths (I do not guess).

---

## a) energy.gov/energysaver/* — 416 file:line occurrences across 53 unique paths

Top 15 by occurrence count:

| DOE Energy Saver path (dead) | Occurrences | Example file:line | Claim supported |
|---|---|---|---|
| `/central-air-conditioning` | 54 | `content/air-conditioners/central-air-conditioner-guide.mdx` | Central AC sizing, efficiency, DOE energy-usage figures |
| `/ductless-mini-split-heat-pumps` | 51 | `content/mini-split-air-conditioners/*.mdx` | Mini-split heat pump DOE guidance (efficiency, savings, sizing) |
| `/furnaces-and-boilers` | 40 | `content/furnaces-heating/furnace-guide.mdx` | Furnace/boiler efficiency, AFUE, DOE minimums |
| `/heat-pump-systems` | 34 | `content/heat-pumps/*.mdx` | Heat pump DOE efficiency + selection guidance |
| `/space-heaters` | 23 | `content/space-heaters-portable-heating/*.mdx` | Space heater safety + efficiency |
| `/water-heating` | 22 | `content/water-heaters/*.mdx` | Water heating DOE overview |
| **`/tankless-or-demand-type-water-heaters`** | **20** ⚠️ | `content/ac-sizing-selection/what-size-tankless-water-heater.mdx:254` | **DOE 24-34% / 8-14% tankless savings figure** (my Batch 2B citation) |
| **`/thermostats`** | **19** ⚠️ | `content/furnaces-heating/furnace-guide.mdx:284` | **DOE 10% annual savings from 7-10°F setback** (my Batch 2B citation) |
| `/room-air-conditioners` | 16 | `content/air-conditioners/window-air-conditioners.mdx` | Window AC DOE guidance |
| **`/maintaining-your-air-conditioner`** | **15** ⚠️ | `content/hvac-maintenance/hvac-maintenance-checklist.mdx:52` | **DOE 5-15% dirty-filter figure** (my Batch 2B citation) |
| `/minimizing-energy-losses-ducts` | 9 | `content/ductwork/*.mdx` | Duct loss guidance |
| `/portable-heaters` | 8 | `content/space-heaters-portable-heating/*.mdx` | Portable heater safety |
| `/estimating-appliance-and-home-electronic-energy-use` | 8 | `content/energy-costs/*.mdx` | Appliance energy estimation |
| `/air-conditioning` | 8 | `content/air-conditioners/*.mdx` | AC DOE overview |
| `/electrical-wiring` | 7 | `content/electrical-wiring/*.mdx` | Wiring safety |

**Plus 38 more unique DOE Energy Saver paths** (dehumidifiers, evaporative-coolers, insulation-materials, fans-cooling, home-backup-power, geothermal-heat-pumps, energy-recovery-ventilation-systems, air-source-heat-pumps, etc.).

The whole `/energysaver/` subtree is dead. Every one of these 416 occurrences needs a live replacement.

---

## b) energystar.gov/products/* + /campaign/* — 346 file:line occurrences across 36 unique paths

### /products/* (30 unique, 330 occurrences)

| ENERGY STAR path (dead) | Occurrences | Example claim supported |
|---|---|---|
| `/products/heating_cooling/ductless_heating_cooling` | 52 | ENERGY STAR ductless certification |
| `/products/heating_cooling` | 45 | General HVAC ENERGY STAR guidance |
| `/products/water_heaters` | 40 | Water heater ENERGY STAR minimums, UEF thresholds |
| `/products/room_air_conditioners` | 40 | Window AC ENERGY STAR CEER minimums |
| `/products/dehumidifiers` | 17 | Dehumidifier ENERGY STAR IEF thresholds |
| `/products/heating_cooling/furnaces` | 16 | Furnace ENERGY STAR AFUE minimums |
| `/products/smart_thermostats` | 15 | Smart thermostat ENERGY STAR v2.0 (also the `key_product_criteria` sub-page cited in Batches 2 Group 2 which may or may not have moved) |
| `/products/heating_cooling/air_conditioning_central` | 15 | Central AC ENERGY STAR SEER2 minimums |
| `/products/heat_pumps` | 14 | Heat pump ENERGY STAR HSPF2/SEER2 minimums |
| `/products/heating_cooling/central_air_conditioning` | 12 | Central AC ENERGY STAR |
| `/products/room_air_cleaners` | 11 | Air purifier ENERGY STAR CADR |
| `/products/central-air-conditioners` | 8 | Central AC certifications |
| `/products/most-efficient` | 2 | Most Efficient program qualifier |
| `/products/geothermal_heat_pumps` | 2 | Geothermal ENERGY STAR |
| `/products/fans` | 2 | Ceiling fan ENERGY STAR |
| `/products/ductless_heating_cooling` | 2 | (duplicate root) |
| (14 more low-count paths) | 33 total | Various product certifications |

**⚠️ Special note: `energystar.gov/products/smart_thermostats/key_product_criteria`** was cited across the Batch 2 Group 2 thermostat cluster (smart-thermostat-savings, best-smart-thermostats, nest-vs-ecobee-vs-honeywell, programmable-vs-smart-thermostat) — if the `/products/*` subtree is dead, that specific sub-page is also gone. Same claim (ENERGY STAR ≥8% heating / ≥10% cooling floor) needs a live replacement URL.

### /campaign/* (6 unique, 16 occurrences)

| ENERGY STAR campaign path (dead) | Occurrences | Example claim |
|---|---|---|
| `/campaign/heating_cooling` | 8 | Heating & cooling campaign |
| `/campaign/seal_insulate` | 6 | Air-sealing 15% savings claim (referenced in energy-costs-guide:391 EPA/ENERGY STAR home sealing claim) |
| `/campaign/ways` | 3 | Energy saving tips campaign |
| `/campaign/assess` | 2 | Home energy assessment |

---

## c) epa.gov/* — 167 file:line occurrences across 37 unique paths

Status **UNCONFIRMED** — user's context didn't fully classify EPA. Some paths likely dead, some live. Needs per-URL live check.

Top 10 by occurrence count:

| EPA path | Occurrences | Example claim |
|---|---|---|
| `/indoor-air-quality-iaq/*` | 47 | EPA IAQ guidance (indoor pollutants, air cleaners) — the `air-cleaners-and-air-filters-home` sub-page is our Batch 2 Group 3 citation on do-air-purifiers-really-work |
| `/mold/*` | 33 | EPA mold guidance — the `mold-and-moisture-your-home` page is our Batch 2 Round-2 citation on the EPA 30-50% RH cluster (7 files) |
| `/climate-hfcs-reduction/*` | 20 | Refrigerant AIM Act / R-410A phase-out |
| `/energy/*` | 12 | EPA energy overview |
| `/burnwise/*` | 4 | Wood-burning appliance safety |
| `/section608` | 3 | EPA Section 608 refrigerant technician certification |
| `/snap/*` | 2 | EPA SNAP refrigerant approvals |
| `/smoke-ready-toolbox-wildfires` | 2 | Wildfire indoor air guidance |
| `/radon/*` | 2 | Radon safety |
| Others (pm-pollution, moisture, ghgemissions, egrid, compliance, climate-indicators, burnwise) | 42 | Various |

**⚠️ Batch 2 Group 3 + Round-2 EPA citations that need verification:**
- `epa.gov/indoor-air-quality-iaq/air-cleaners-and-air-filters-home` (Batch 2 Group 3 commit `67fd0c4`, do-air-purifiers-really-work)
- `epa.gov/mold/mold-and-moisture-your-home` (Batch 2 Round-2 commit `9bfc2c7`, applied to 7 files in the EPA 30-50% RH cluster)

If these are alive, no action. If dead, another priority-fix cluster.

---

## d) Other gov / standards — ~671 file:line occurrences total

Per-host counts (need per-URL live check, none confirmed dead yet):

| Host | Occurrences | Typical claim category |
|---|---|---|
| `eia.gov` | 166 | EIA electricity/gas prices, RECS, state-level energy data |
| `ashrae.org` | 121 | ASHRAE standards (62.2, 55, 90.1, service-life data) |
| `acca.org` | 104 | ACCA Manual J/S/D/T references, quality installation standard |
| `nfpa.org` | 85 | NFPA 54 fuel gas code, NFPA 70 electrical code, heating safety |
| `irs.gov` | 57 | 25C/25D tax credit rules, IRA HEAR/HOMES program |
| `ahrinet.org` | 52 | AHRI certification directory + standards |
| `cdc.gov` | 38 | CDC indoor air / CO / mold guidance |
| `cpsc.gov` | 24 | CPSC safety standards (heaters, ranges, CO detectors) |
| `who.int` | 19 | WHO air quality guidelines |
| `nrel.gov` | 11 | NREL renewable / solar research |
| `ul.com` | 18 | UL safety standards |
| `osha.gov` | 13 | OSHA workplace HVAC safety |
| `iicrc.org` | 8 | IICRC standards (S520, S500) |
| `arb.ca.gov` (CARB) | 5 | California refrigerant regs |
| `ec.europa.eu` | 3 | EU regulations |

Not yet confirmed dead. Recommend spot-checking each host with 1-2 representative URLs to determine dead/live status before batch repair.

---

## e) Manufacturer / vendor — 287 file:line occurrences

Top hosts (all UNCONFIRMED status, need spot checks):

| Host | Occurrences | Purpose |
|---|---|---|
| ul.com (also in group d) | 18 | UL certification lookups |
| generac.com | 14 | Generator spec sheets |
| fujitsugeneral.com | 10 | Fujitsu mini-split spec sheets |
| southwire.com | 9 | Wire ampacity references |
| carrier.com | 8 | Carrier HVAC spec sheets |
| rinnai.us | 7 | Rinnai tankless spec sheets |
| naveninc.com | 7 | Navien tankless spec sheets |
| mitsubishicomfort.com | 7 | Mitsubishi mini-split spec sheets |
| goodmanmfg.com | 6 | Goodman HVAC spec sheets |
| rheem.com | 5 | Rheem HVAC spec sheets |
| kohlerpower.com | 5 | Kohler generator spec sheets |
| ecosmart.com | 5 | Ecosmart tankless spec sheets |
| trane.com | 4 | Trane HVAC spec sheets |
| stiebel-eltron-usa.com | 4 | Stiebel-Eltron water heater |
| levoit.com | 4 | Levoit air purifier |
| dyson.com | 4 | Dyson air purifier |
| cowaymega.com | 4 | Coway air purifier |
| buildingscience.com | 4 | Building science research |
| nadca.com | 4 | NADCA duct cleaning |
| (many more) | ~200 | Various manufacturer spec pages |

Manufacturer spec-sheet URLs rot fast (product pages get replaced, product lines EOL, brand acquisitions). Recommend spot-checking every unique manufacturer path.

---

## Recommended fix approach (for when user provides live replacement URLs)

1. **Priority tier — 4 recent-fix citations (55 occurrences)**: apply the moment user supplies replacement URLs. These are commitments the site made in "here's the source" that now serve 404s.
2. **Group a batch — DOE `/energysaver/`** (416 occurrences): mass-replace mapping table (old-path → new-path). Verify each replacement live before commit.
3. **Group b batch — ENERGY STAR `/products/` + `/campaign/`** (346 occurrences): same approach.
4. **Group c EPA**: per-URL live check before deciding scope.
5. **Groups d + e**: spot-check to determine dead ratio, batch-fix if >10% dead.

**Do NOT rebind a dead URL to a different live page just because it "looks right"** — that violates the same rebind rule as Batch 2 (no swapping citations to sources that don't actually publish the claim). Every replacement URL must be verified to actually contain the claim being cited.

**Do NOT strip any verified figure just because its citation URL died.** Figures verified in Batches 2/2B/Round-2 stay; only the URL needs repair.
