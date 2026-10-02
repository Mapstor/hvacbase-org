#!/usr/bin/env node
// CITE-3 — match agency attributions to what the sources actually say. Self-verifying.
import fs from 'node:fs';
import path from 'node:path';
const ROOT = '/workspace';
const log = [];
function editFile(rel, edits) {
  const p = path.join(ROOT, rel);
  let s = fs.readFileSync(p, 'utf8');
  for (const e of edits) {
    const n = s.split(e.old).length - 1;
    if (n !== 1) throw new Error(`MATCH FAIL [${rel}] "${e.note}": expected 1, found ${n}\n  old=<<${e.old.slice(0,80)}>>`);
    s = s.split(e.old).join(e.neu);
    log.push(`${rel}: ${e.note}`);
  }
  fs.writeFileSync(p, s);
}
const DOEPDF = 'https://www.energy.gov/sites/prod/files/2014/06/f16/HomeCooling101.pdf';
const DOEPDF_L = 'U.S. DOE: Energy Saver 101, Home Cooling (PDF)';
const DUCT30 = 'the DOE puts duct air losses at about 30% of a cooling system\'s energy consumption';

// ===== how-does-a-mini-split-work =====
editFile('content/mini-split-air-conditioners/how-does-a-mini-split-work.mdx', [
  { note: 'L60 duct >30% ES -> DOE ~30%',
    old: `That matters more than it sounds. According to ENERGY STAR, ductwork can waste **more than 30% of a home's energy use for space conditioning**, air leaks out of duct seams, and heat bleeds out as the air travels through unconditioned attics and crawlspaces.`,
    neu: `That matters more than it sounds. The DOE puts duct air losses at about 30% of a cooling system's energy consumption, as air leaks out of duct seams and heat bleeds out as the air travels through unconditioned attics and crawlspaces.` },
  { note: 'L87 duct >30% ES -> DOE ~30%',
    old: `First, no ducts, so they avoid the more-than-30% energy loss ENERGY STAR attributes to ductwork.`,
    neu: `First, no ducts, so they avoid the duct losses the DOE puts at about 30% of a cooling system's energy consumption.` },
  { note: 'L97 how-we-sourced duct figure -> DOE',
    old: `The efficiency figures are from primary sources: the "more than 30% of a home's energy use" duct-loss figure and the "up to 3x more heat energy than electricity used" heating efficiency are from **ENERGY STAR**, and the SEER2 rating range (up to about 35) is from the **U.S. Department of Energy.**`,
    neu: `The efficiency figures are from primary sources: the DOE puts duct air losses at about 30% of a cooling system's energy consumption, the "up to 3x more heat energy than electricity used" heating efficiency is from **ENERGY STAR**, and the SEER2 rating range (up to about 35) is from the **U.S. Department of Energy.**` },
  { note: 'frontmatter add DOE-PDF',
    old: `  - title: "U.S. Department of Energy: Heat Pumps"\n    url: "https://www.energy.gov/heat-pumps"`,
    neu: `  - title: "U.S. Department of Energy: Heat Pumps"\n    url: "https://www.energy.gov/heat-pumps"\n  - title: "${DOEPDF_L}"\n    url: "${DOEPDF}"` },
  { note: 'SourcesBox add DOE-PDF',
    old: `  { title: "U.S. Department of Energy: Heat Pumps (covers ductless mini-splits; SEER2 up to ~35)", url: "https://www.energy.gov/heat-pumps" }\n]} />`,
    neu: `  { title: "U.S. Department of Energy: Heat Pumps (covers ductless mini-splits; SEER2 up to ~35)", url: "https://www.energy.gov/heat-pumps" },\n  { title: "${DOEPDF_L}", url: "${DOEPDF}" }\n]} />` },
]);

// ===== what-is-a-mini-split =====
editFile('content/mini-split-air-conditioners/what-is-a-mini-split.mdx', [
  { note: 'L50 duct >30% ES -> DOE ~30%',
    old: `**1. No duct losses.** This is the big one. According to **ENERGY STAR**, ductwork can waste **more than 30% of a home's energy use for space conditioning**, air leaking out of duct seams, or losing heat as it travels through unconditioned attics and crawlspaces. A mini split eliminates that entirely by skipping ducts.`,
    neu: `**1. No duct losses.** This is the big one. The DOE puts duct air losses at about 30% of a cooling system's energy consumption, as air leaks out of duct seams or loses heat traveling through unconditioned attics and crawlspaces. A mini split eliminates that entirely by skipping ducts.` },
  { note: 'L85 duct + SEER2 + 60% rewrite',
    old: `Yes, notably so. They eliminate duct losses (which ENERGY STAR says can waste more than 30% of conditioning energy) and use variable-speed compressors. Per the DOE, they reach SEER2 ratings up to about 35, and ENERGY STAR says they can use up to 60% less energy than electric resistance heating.`,
    neu: `Yes, notably so. They eliminate duct losses, which the DOE puts at about 30% of a cooling system's energy consumption, and use variable-speed compressors. The most efficient ductless systems carry certified ratings of about 35 SEER2, and ENERGY STAR says certified mini splits use up to 60% less energy than standard electric radiators.` },
  { note: 'L95 how-we-sourced duct/SEER2/60% rewrite',
    old: `The figure that ductwork can waste more than 30% of a home's space-conditioning energy is from **ENERGY STAR**; the SEER2 range (about 15.2 to 35) is from the **U.S. Department of Energy**; and the "up to 60% less energy than electric resistance heating" and "up to 3x more heat energy than electricity used" figures are from **ENERGY STAR.**`,
    neu: `The figure that duct air losses are about 30% of a cooling system's energy consumption is from the **U.S. Department of Energy**; the certified ratings of about 35 SEER2 are from the **AHRI Directory**; and the "up to 60% less energy than standard electric radiators" and "up to 3x more heat energy than electricity used" figures are from **ENERGY STAR.**` },
  { note: 'frontmatter DOE-heatpumps -> DOE-PDF + AHRI',
    old: `  - title: "U.S. Department of Energy: Heat Pumps"\n    url: "https://www.energy.gov/heat-pumps"`,
    neu: `  - title: "${DOEPDF_L}"\n    url: "${DOEPDF}"\n  - title: "AHRI: Directory of Certified Product Performance"\n    url: "https://www.ahridirectory.org/"` },
  { note: 'SourcesBox DOE-heatpumps -> DOE-PDF + AHRI',
    old: `  { title: "U.S. Department of Energy: Heat Pumps (covers ductless mini-splits; SEER2 up to ~35)", url: "https://www.energy.gov/heat-pumps" }\n]} />`,
    neu: `  { title: "${DOEPDF_L}", url: "${DOEPDF}" },\n  { title: "AHRI: Directory of Certified Product Performance", url: "https://www.ahridirectory.org/" }\n]} />` },
]);

// ===== mini-split-air-conditioners =====
editFile('content/mini-split-air-conditioners/mini-split-air-conditioners.mdx', [
  { note: 'L44 duct >30% DOE -> DOE ~30%',
    old: `Skipping ducts is the main efficiency advantage, since the DOE attributes more than 30% of a home's space-conditioning energy loss to leaky ducts.`,
    neu: `Skipping ducts is the main efficiency advantage, since the DOE puts duct air losses at about 30% of a cooling system's energy consumption.` },
  { note: 'frontmatter add DOE-PDF + EPA-608',
    old: `  - title: "DSIRE: Database of State Incentives"\n    url: "https://www.dsireusa.org"`,
    neu: `  - title: "DSIRE: Database of State Incentives"\n    url: "https://www.dsireusa.org"\n  - title: "${DOEPDF_L}"\n    url: "${DOEPDF}"\n  - title: "EPA: Section 608 Refrigerant Handling Certification"\n    url: "https://www.epa.gov/section608"` },
  { note: 'SourcesBox add DOE-PDF + EPA-608',
    old: `  { title: "DSIRE: Database of State Incentives for Renewables & Efficiency", url: "https://www.dsireusa.org" }\n]} />`,
    neu: `  { title: "DSIRE: Database of State Incentives for Renewables & Efficiency", url: "https://www.dsireusa.org" },\n  { title: "${DOEPDF_L}", url: "${DOEPDF}" },\n  { title: "EPA: Section 608 Refrigerant Handling Certification", url: "https://www.epa.gov/section608" }\n]} />` },
]);

// ===== mini-split-vs-central-air =====
editFile('content/mini-split-air-conditioners/mini-split-vs-central-air.mdx', [
  { note: 'L38 ENERGY STAR 20% wording',
    old: `ENERGY STAR puts duct losses at as much as 20% of the air a system moves, and the DOE puts duct air losses at about 30% of a cooling system's energy consumption, from leaks, poor insulation, and connections running through unconditioned attics and crawlspaces.`,
    neu: `ENERGY STAR says leaky ducts can reduce heating and cooling efficiency by as much as 20%, and the DOE puts duct air losses at about 30% of a cooling system's energy consumption, from leaks, poor insulation, and connections running through unconditioned attics and crawlspaces.` },
  { note: 'frontmatter add DOE-PDF',
    old: `  - title: "ENERGY STAR: Duct Sealing Benefits"\n    url: "https://www.energystar.gov/saveathome/heating-cooling/duct-sealing/benefits"`,
    neu: `  - title: "ENERGY STAR: Duct Sealing Benefits"\n    url: "https://www.energystar.gov/saveathome/heating-cooling/duct-sealing/benefits"\n  - title: "${DOEPDF_L}"\n    url: "${DOEPDF}"` },
  { note: 'SourcesBox add DOE-PDF',
    old: `  { title: "ENERGY STAR: Ductless Heating & Cooling (ductless efficiency)", url: "https://www.energystar.gov/products/ductless_heating_cooling" }\n]} />`,
    neu: `  { title: "ENERGY STAR: Ductless Heating & Cooling (ductless efficiency)", url: "https://www.energystar.gov/products/ductless_heating_cooling" },\n  { title: "${DOEPDF_L}", url: "${DOEPDF}" }\n]} />` },
]);

// ===== dry-mode-in-ac (add EPA-MOLD) =====
editFile('content/mini-split-air-conditioners/dry-mode-in-ac.mdx', [
  { note: 'frontmatter add externalLinks with EPA-MOLD',
    old: `  - mini-split-electricity-usage\n---`,
    neu: `  - mini-split-electricity-usage\nexternalLinks:\n  - title: "EPA: Mold Course Chapter 2 (indoor humidity 30-50%)"\n    url: "https://www.epa.gov/mold/mold-course-chapter-2"\n---` },
  { note: 'SourcesBox add EPA-MOLD',
    old: `  { text: "Ideal Indoor Humidity Level (companion guide: EPA 30–50% humidity target and its source)", url: "/ideal-indoor-humidity-level" }\n]} />`,
    neu: `  { title: "EPA: Mold Course Chapter 2 (indoor humidity 30–50%, below 60%)", url: "https://www.epa.gov/mold/mold-course-chapter-2" },\n  { text: "Ideal Indoor Humidity Level (companion guide: EPA 30–50% humidity target and its source)", url: "/ideal-indoor-humidity-level" }\n]} />` },
]);

// ===== air-purifier-guide =====
editFile('content/air-quality/air-purifier-guide.mdx', [
  { note: 'L35 intro EPA 2-5x/90% rewrite',
    old: `According to the EPA, indoor air is often 2 to 5 times more polluted than outdoor air, and you spend roughly 90% of your time indoors, so cleaning that air is worth understanding.`,
    neu: `According to the EPA, Americans spend about 90% of their time indoors, where concentrations of some pollutants are often 2 to 5 times higher than outdoors, so cleaning that air is worth understanding.` },
  { note: 'L164 how-we-sourced figure wording',
    old: `the "indoor air is 2 to 5 times more polluted than outdoor air" figure are from the **EPA's** indoor air quality and air-cleaner guidance.`,
    neu: `the "Americans spend about 90% of their time indoors, where some pollutant concentrations run 2 to 5 times higher than outdoors" figure are from the **EPA's** Report on the Environment and air-cleaner guidance.` },
  { note: 'frontmatter add EPA-ROE',
    old: `  - title: "EPA: Guide to Air Cleaners in the Home"\n    url: "https://www.epa.gov/indoor-air-quality-iaq/guide-air-cleaners-home"`,
    neu: `  - title: "EPA: Guide to Air Cleaners in the Home"\n    url: "https://www.epa.gov/indoor-air-quality-iaq/guide-air-cleaners-home"\n  - title: "EPA: Report on the Environment, Indoor Air Quality"\n    url: "https://www.epa.gov/report-environment/indoor-air-quality"` },
  { note: 'SourcesBox add EPA-ROE',
    old: `  { title: "EPA: Guide to Air Cleaners in the Home (HEPA, CADR, ozone-generating devices)", url: "https://www.epa.gov/indoor-air-quality-iaq/guide-air-cleaners-home" },`,
    neu: `  { title: "EPA: Guide to Air Cleaners in the Home (HEPA, CADR, ozone-generating devices)", url: "https://www.epa.gov/indoor-air-quality-iaq/guide-air-cleaners-home" },\n  { title: "EPA: Report on the Environment, Indoor Air Quality (90% of time indoors; some pollutants 2-5x higher)", url: "https://www.epa.gov/report-environment/indoor-air-quality" },` },
]);

// ===== how-to-improve-indoor-air-quality =====
editFile('content/indoor-air-quality/how-to-improve-indoor-air-quality.mdx', [
  { note: 'L27 intro more-polluted -> EPA-ROE wording',
    old: `Your indoor air is likely more polluted than you think, the EPA notes indoor air is often several times more polluted than outdoor air, and you spend about 90% of your time inside.`,
    neu: `Your indoor air is likely more polluted than you think. The EPA notes that Americans spend about 90% of their time indoors, where concentrations of some pollutants are often 2 to 5 times higher than outdoors.` },
  { note: 'L149 how-we-sourced more-polluted -> EPA-ROE wording',
    old: `The EPA notes that indoor air is often more polluted than outdoor air and that Americans spend about 90% of their time indoors, and identifies **radon as the second-leading cause of lung cancer** with an action level of 4 pCi/L.`,
    neu: `The EPA notes that Americans spend about 90% of their time indoors, where concentrations of some pollutants are often 2 to 5 times higher than outdoors, and identifies **radon as the second-leading cause of lung cancer** with an action level of 4 pCi/L.` },
  { note: 'frontmatter add EPA-ROE + EPA-MOLD',
    old: `  - url: "https://www.epa.gov/radon"\n    label: "EPA: Radon"`,
    neu: `  - url: "https://www.epa.gov/radon"\n    label: "EPA: Radon"\n  - url: "https://www.epa.gov/report-environment/indoor-air-quality"\n    label: "EPA: Report on the Environment, Indoor Air Quality"\n  - url: "https://www.epa.gov/mold/mold-course-chapter-2"\n    label: "EPA: Mold Course Chapter 2 (indoor humidity 30-50%)"` },
  { note: 'SourcesBox add EPA-ROE + EPA-MOLD',
    old: `  { title: "AHAM Verifide: Air Cleaner CADR Ratings", url: "https://www.ahamverifide.org/" }\n]} />`,
    neu: `  { title: "EPA: Report on the Environment, Indoor Air Quality (90% of time indoors; some pollutants 2-5x higher)", url: "https://www.epa.gov/report-environment/indoor-air-quality" },\n  { title: "EPA: Mold Course Chapter 2 (indoor humidity 30–50%, below 60%)", url: "https://www.epa.gov/mold/mold-course-chapter-2" },\n  { title: "AHAM Verifide: Air Cleaner CADR Ratings", url: "https://www.ahamverifide.org/" }\n]} />` },
]);

// ===== dehumidifier-guide (add ECFR) =====
editFile('content/dehumidifiers/dehumidifier-guide.mdx', [
  { note: 'frontmatter add ECFR',
    old: `  - title: "ENERGY STAR: Certified Products (dehumidifier efficiency)"\n    url: "https://www.energystar.gov/products"`,
    neu: `  - title: "ENERGY STAR: Certified Products (dehumidifier efficiency)"\n    url: "https://www.energystar.gov/products"\n  - title: "10 CFR Part 430, Subpart B (Appendix X1: dehumidifier test procedure)"\n    url: "https://www.ecfr.gov/current/title-10/chapter-II/subchapter-D/part-430/subpart-B"` },
  { note: 'SourcesBox add ECFR',
    old: `  { title: "ENERGY STAR: Certified Products (dehumidifier IEF efficiency)", url: "https://www.energystar.gov/products" }\n]} />`,
    neu: `  { title: "ENERGY STAR: Certified Products (dehumidifier IEF efficiency)", url: "https://www.energystar.gov/products" },\n  { title: "10 CFR Part 430, Subpart B (Appendix X1: dehumidifier test procedure)", url: "https://www.ecfr.gov/current/title-10/chapter-II/subchapter-D/part-430/subpart-B" }\n]} />` },
]);

// ===== merv-rating-chart (EPA/CDC -> EPA only) =====
editFile('content/energy-efficiency-ratings/merv-rating-chart.mdx', [
  { note: 'L32 EPA and CDC -> EPA',
    old: `and is what the EPA and CDC point to for better filtration.`,
    neu: `and is what the EPA points to for better filtration.` },
  { note: 'L76 EPA and CDC -> EPA',
    old: `That's exactly why 13 is the number the EPA and CDC point to for better indoor air.`,
    neu: `That's exactly why 13 is the number the EPA points to for better indoor air.` },
  { note: 'L110 EPA/CDC -> EPA',
    old: `MERV 13 gives the best air quality (and is what the EPA/CDC recommend) if your system can handle it.`,
    neu: `MERV 13 gives the best air quality (and is what the EPA recommends) if your system can handle it.` },
  { note: 'L119 EPA and CDC -> EPA',
    old: `It's why the EPA and CDC recommend MERV 13 for better filtration where the system allows it.`,
    neu: `It's why the EPA recommends MERV 13 for better filtration, or as high as your system allows.` },
]);

// ===== heat-pump-guide =====
editFile('content/heat-pumps/heat-pump-guide.mdx', [
  { note: 'L127 DOE dirty-filter penalty -> DOE clean-filter lowers',
    old: `A clogged filter restricts airflow and cuts efficiency (the DOE attributes a 5 to 15% energy penalty to a dirty filter).`,
    neu: `A clogged filter restricts airflow and cuts efficiency (the DOE says clean filters can lower an air conditioner's energy use by 5 to 15%).` },
  { note: 'frontmatter add DOE-PDF',
    old: `  - title: "DOE: Heat Pump Systems"\n    url: "https://www.energy.gov/heat-pumps"`,
    neu: `  - title: "DOE: Heat Pump Systems"\n    url: "https://www.energy.gov/heat-pumps"\n  - title: "${DOEPDF_L}"\n    url: "${DOEPDF}"` },
  { note: 'SourcesBox add DOE-PDF',
    old: `  { title: "DOE: Heat Pump Systems (types, efficiency, sizing)", url: "https://www.energy.gov/heat-pumps" },`,
    neu: `  { title: "DOE: Heat Pump Systems (types, efficiency, sizing)", url: "https://www.energy.gov/heat-pumps" },\n  { title: "${DOEPDF_L} (clean filters lower AC energy 5-15%)", url: "${DOEPDF}" },` },
]);

// ===== how-often-change-hvac-filter (DOE-PDF already cited) =====
editFile('content/hvac-maintenance/how-often-change-hvac-filter.mdx', [
  { note: 'L62 dirty-filter increases -> clean-filter lowers',
    old: `- **It wastes energy.** According to the **Department of Energy**, a dirty, clogged filter can **increase your system's energy consumption by 5 to 15%.** That's money leaking out of your utility bill every month the filter stays dirty, and it dwarfs the small cost of a replacement filter.`,
    neu: `- **It wastes energy.** According to the **Department of Energy**, keeping a clean filter can **lower an air conditioner's energy use by 5 to 15%.** That's money leaking out of your utility bill every month the filter stays dirty, and it dwarfs the small cost of a replacement filter.` },
  { note: 'L87 FAQ increases -> clean lowers',
    old: `A clogged filter restricts airflow, which per the DOE increases energy use by 5–15%, strains the system, and can lead to expensive repairs or early failure.`,
    neu: `A clogged filter restricts airflow; per the DOE a clean filter can lower an air conditioner's energy use by 5–15%, and a clogged one strains the system and can lead to expensive repairs or early failure.` },
  { note: 'L100 how-we-sourced scope to DOE wording',
    old: `The figure that a clogged filter increases HVAC energy consumption by 5–15% is from the **U.S. Department of Energy.**`,
    neu: `The figure that a clean filter can lower an air conditioner's energy use by 5–15% is from the **U.S. Department of Energy.**` },
]);

// ===== hvac-maintenance-checklist (DOE-PDF already cited) =====
editFile('content/hvac-maintenance/hvac-maintenance-checklist.mdx', [
  { note: 'L89 FAQ filter-or-coils -> filter alone',
    old: `A well-maintained system runs more efficiently (a dirty filter or coils alone can cost you 5–15% more in energy, per the DOE), breaks down less often, and lasts longer, delaying an expensive replacement.`,
    neu: `A well-maintained system runs more efficiently (a dirty filter alone can raise an air conditioner's energy use by 5–15%, per the DOE), breaks down less often, and lasts longer, delaying an expensive replacement.` },
  { note: 'L110 how-we-sourced filter-or-system -> filter alone',
    old: `The figure that a dirty filter or clogged system increases HVAC energy use by 5–15% is from the **U.S. Department of Energy.**`,
    neu: `The figure that a dirty filter alone can raise an air conditioner's energy use by 5–15% is from the **U.S. Department of Energy.**` },
]);

console.log(`CITE-3: ${log.length} edits across 12 files.`);
log.forEach(l => console.log('  ' + l));
