#!/usr/bin/env node
// CITE-1 Part A — deterministic apply. Self-verifying literal replacements.
// Per-file edits run FIRST, then global URL swaps (ACCA/AHAM/CDC) on content/.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/workspace';
const PDF = 'https://www.energy.gov/sites/prod/files/2014/06/f16/HomeCooling101.pdf';
const PDFLABEL = 'U.S. DOE: Energy Saver 101, Home Cooling (PDF)';

const changelog = [];
function editFile(rel, edits) {
  const p = path.join(ROOT, rel);
  let s = fs.readFileSync(p, 'utf8');
  for (const e of edits) {
    const count = e.count == null ? 1 : e.count;
    const n = s.split(e.old).length - 1;
    if (n !== count) throw new Error(`MATCH FAIL [${rel}] "${e.note}": expected ${count}, found ${n}\n  old=<<${e.old.slice(0,90)}>>`);
    s = s.split(e.old).join(e.neu);
    changelog.push({ file: rel, note: e.note });
  }
  fs.writeFileSync(p, s);
}

// ============ PER-FILE LITERAL EDITS ============
const perFile = [
  // 1. mini-split-electricity-usage
  ['content/mini-split-air-conditioners/mini-split-electricity-usage.mdx', [
    { note: 'DOE fm -> PDF',
      old: `  - title: "U.S. Department of Energy: Maintaining Your Air Conditioner"\n    url: "https://www.energy.gov/energysaver/maintaining-your-air-conditioner"`,
      neu: `  - title: "${PDFLABEL}"\n    url: "${PDF}"` },
    { note: 'per-degree -> qualitative (body)',
      old: `**Set the temperature sensibly.** Per the Department of Energy, you save on energy costs by setting the thermostat closer to the outdoor temperature (roughly on the order of a percent or so of energy use per degree over an extended period). In cooling,`,
      neu: `**Set the temperature sensibly.** Per the Department of Energy, you save on energy costs by setting the thermostat closer to the outdoor temperature; each degree closer to the outdoor temperature saves energy. In cooling,` },
    { note: 'duct 20-30 -> about 30% (body)',
      old: `Generally yes. Mini splits avoid the 20 to 30% duct losses the DOE attributes to typical duct systems, and their inverter compressors`,
      neu: `Generally yes. Mini splits avoid duct losses, which the DOE puts at about 30% of a cooling system's energy consumption, and their inverter compressors` },
    { note: 'duct 20-30 -> about 30% (methodology)',
      old: `and that ducts lose 20 to 30% of conditioning energy`,
      neu: `and that ducts lose about 30% of conditioning energy` },
    { note: 'DOE source -> PDF',
      old: `  { title: "U.S. Department of Energy: Maintaining Your Air Conditioner (dirty filter raises energy use 5-15%)", url: "https://www.energy.gov/energysaver/maintaining-your-air-conditioner" },`,
      neu: `  { title: "${PDFLABEL}", url: "${PDF}" },` },
  ]],
  // 2. ac-troubleshooting-guide (dedup two DOE links -> one PDF)
  ['content/air-conditioners/ac-troubleshooting-guide.mdx', [
    { note: 'DOE programmable fm -> PDF',
      old: `  - label: "DOE: Programmable Thermostats"\n    url: "https://www.energy.gov/energysaver/programmable-thermostats"`,
      neu: `  - label: "${PDFLABEL}"\n    url: "${PDF}"` },
    { note: 'remove duplicate DOE maintaining fm entry (dedup)',
      old: `  - label: "DOE: Maintaining Your Air Conditioner"\n    url: "https://www.energy.gov/energysaver/maintaining-your-air-conditioner"\n`,
      neu: `` },
    { note: 'setback+per-degree claim rewrite (body) part 1',
      old: `you can save **as much as 10% a year on cooling and heating by setting your thermostat back 7–10°F for 8 hours a day**`,
      neu: `a programmable thermostat can save you **up to 10% a year on heating and cooling**` },
    { note: 'setback+per-degree claim rewrite (body) part 2',
      old: `), roughly 1% per degree. And DOE notes`,
      neu: `), and each degree closer to the outdoor temperature saves energy. And DOE notes` },
    { note: 'methodology: drop 7-10F/8hr detail (label)',
      old: `thermostat-setback savings (`,
      neu: `thermostat savings (` },
    { note: 'methodology: drop 7-10F/8hr detail (value)',
      old: `up to 10% a year, 7–10°F for 8 hours`,
      neu: `up to 10% a year on heating and cooling with a programmable thermostat` },
    { note: 'DOE programmable source -> PDF',
      old: `  { title: "U.S. Department of Energy: Programmable Thermostats (setback savings)", url: "https://www.energy.gov/energysaver/programmable-thermostats" },`,
      neu: `  { title: "${PDFLABEL}", url: "${PDF}" },` },
    { note: 'remove duplicate DOE maintaining source entry (dedup)',
      old: `  { title: "U.S. Department of Energy: Maintaining Your Air Conditioner", url: "https://www.energy.gov/energysaver/maintaining-your-air-conditioner" },\n`,
      neu: `` },
  ]],
  // 3. air-conditioner-types
  ['content/air-conditioners/air-conditioner-types.mdx', [
    { note: 'DOE central-ac fm -> PDF',
      old: `  - label: "U.S. DOE: Central Air Conditioning (Energy Saver)"\n    url: "https://www.energy.gov/energysaver/central-air-conditioning"`,
      neu: `  - label: "${PDFLABEL}"\n    url: "${PDF}"` },
    { note: 'duct 20-30 -> about 30% (Cons bullet)',
      old: `and **duct losses can reduce efficiency 20–30% if ducts are poorly sealed** (per the DOE).`,
      neu: `and **poorly sealed ducts waste energy, with the DOE putting duct air losses at about 30% of a cooling system's energy consumption**.` },
    { note: 'duct 20-30 -> about 30% (methodology)',
      old: `The figure that ducts can lose 20–30% of conditioning energy is from the **DOE**.`,
      neu: `The **DOE** puts duct air losses at about 30% of a cooling system's energy consumption.` },
    { note: 'DOE central-ac source -> PDF',
      old: `  { title: "U.S. DOE: Central Air Conditioning (Energy Saver)", url: "https://www.energy.gov/energysaver/central-air-conditioning" },`,
      neu: `  { title: "${PDFLABEL}", url: "${PDF}" },` },
  ]],
  // 4. how-to-clean-ac-coils
  ['content/hvac-maintenance/how-to-clean-ac-coils.mdx', [
    { note: 'DOE fm -> PDF (url-first block)',
      old: `  - url: "https://www.energy.gov/energysaver/maintaining-your-air-conditioner"\n    label: "U.S. DOE: Maintaining Your Air Conditioner"`,
      neu: `  - url: "${PDF}"\n    label: "${PDFLABEL}"` },
    { note: 'DOE source -> PDF',
      old: `  { label: "U.S. Department of Energy: Maintaining Your Air Conditioner", url: "https://www.energy.gov/energysaver/maintaining-your-air-conditioner" }`,
      neu: `  { label: "${PDFLABEL}", url: "${PDF}" }` },
  ]],
  // 5. how-often-change-hvac-filter
  ['content/hvac-maintenance/how-often-change-hvac-filter.mdx', [
    { note: 'DOE fm -> PDF',
      old: `  - title: "U.S. Department of Energy: Maintaining Your Air Conditioner"\n    url: "https://www.energy.gov/energysaver/maintaining-your-air-conditioner"`,
      neu: `  - title: "${PDFLABEL}"\n    url: "${PDF}"` },
    { note: 'DOE source -> PDF',
      old: `  { title: "U.S. Department of Energy: Maintaining Your Air Conditioner (dirty filter raises energy use 5–15%)", url: "https://www.energy.gov/energysaver/maintaining-your-air-conditioner" }`,
      neu: `  { title: "${PDFLABEL}", url: "${PDF}" }` },
  ]],
  // 6. hvac-maintenance-checklist
  ['content/hvac-maintenance/hvac-maintenance-checklist.mdx', [
    { note: 'DOE fm -> PDF',
      old: `  - title: "U.S. Department of Energy: Maintaining Your Air Conditioner"\n    url: "https://www.energy.gov/energysaver/maintaining-your-air-conditioner"`,
      neu: `  - title: "${PDFLABEL}"\n    url: "${PDF}"` },
    { note: 'DOE source -> PDF',
      old: `  { title: "U.S. Department of Energy: Maintaining Your Air Conditioner (dirty filter raises energy use 5–15%)", url: "https://www.energy.gov/energysaver/maintaining-your-air-conditioner" },`,
      neu: `  { title: "${PDFLABEL}", url: "${PDF}" },` },
  ]],
  // 7. ac-not-cooling (markdown link form)
  ['content/air-conditioners/ac-not-cooling.mdx', [
    { note: 'DOE markdown link -> PDF',
      old: `- [U.S. Department of Energy, Maintaining Your Air Conditioner](https://www.energy.gov/energysaver/maintaining-your-air-conditioner), filter energy impact (5–15%), coil cleaning, refrigerant charge, seasonal maintenance`,
      neu: `- [${PDFLABEL}](${PDF}), filter energy impact (5–15%), coil cleaning, refrigerant charge, seasonal maintenance` },
  ]],
  // 8. smart-thermostat-savings (claim rewrite + store.google removal)
  ['content/smart-thermostats/smart-thermostat-savings.mdx', [
    { note: 'DOE setback claim rewrite (body)',
      old: `The DOE estimates that setting back your thermostat by 7–10°F for 8 hours per day saves approximately **10% per year** on heating and cooling.`,
      neu: `The DOE estimates that a programmable thermostat can save up to **10% per year** on heating and cooling.` },
    { note: 'remove Google Nest (store.google) source; drop EIA comma',
      old: `  { label: "U.S. EIA — Average Retail Price of Electricity", url: "https://www.eia.gov/electricity/monthly/" },\n  { label: "Google Nest Savings White Paper", url: "https://store.google.com/us/category/thermostats" }`,
      neu: `  { label: "U.S. EIA — Average Retail Price of Electricity", url: "https://www.eia.gov/electricity/monthly/" }` },
  ]],
  // 9. how-to-identify-mold (AIHA dead link -> remove; EPA brief-guide already cited on line 330)
  ['content/mold-prevention/how-to-identify-mold.mdx', [
    { note: 'remove dead AIHA mold link (target EPA brief-guide already cited above -> dedup)',
      old: `  { title: "AIHA - Facts About Mold", url: "https://www.aiha.org/public-resources/consumer-resources/topics-of-interest/mold" },\n`,
      neu: `` },
  ]],
  // 10. space-heater-guide (UL dead link -> remove; NFPA heating already cited on 266)
  ['content/space-heaters/space-heater-guide.mdx', [
    { note: 'remove dead UL heater link (NFPA heating already cited -> dedup); drop CDC comma',
      old: `  { title: "CDC: Carbon Monoxide Poisoning", url: "https://www.cdc.gov/co/default.htm" },\n  { title: "UL: Portable Electric Heater Standards", url: "https://www.ul.com/resources/portable-electric-heaters" }`,
      neu: `  { title: "CDC: Carbon Monoxide Poisoning", url: "https://www.cdc.gov/co/default.htm" }` },
  ]],
  // 11. safest-space-heaters (archived) UL dead link -> remove (NFPA heating already cited on 234)
  ['content/_archived-product-pages/space-heaters/safest-space-heaters.mdx', [
    { note: 'remove dead UL portable-heaters link (NFPA heating already cited -> dedup)',
      old: `  { title: "UL Product Safety: Portable Heaters", url: "https://www.ul.com/resources/portable-electric-heaters" },\n`,
      neu: `` },
  ]],
  // 12. best-small-heaters (archived) UL dead link -> remove (NFPA heating already cited on 181)
  ['content/_archived-product-pages/space-heaters/best-small-heaters.mdx', [
    { note: 'remove dead UL heater link (NFPA heating already cited -> dedup)',
      old: `  { title: "UL: Portable Heater Safety", url: "https://www.ul.com/resources/portable-electric-heaters" },\n`,
      neu: `` },
  ]],
  // 13. flexible-vs-rigid-ductwork (SMACNA remove link)
  ['content/ductwork/flexible-vs-rigid-ductwork.mdx', [
    { note: 'remove SMACNA fm externalLink',
      old: `  - url: "https://www.smacna.org/technical/standards"\n    label: "SMACNA – HVAC Duct Construction Standards"\n`,
      neu: `` },
    { note: 'remove SMACNA source entry',
      old: `  { name: "SMACNA", url: "https://www.smacna.org/technical/standards", description: "HVAC Duct Construction Standards — Metal and Flexible" },\n`,
      neu: `` },
  ]],
  // 14. ductwork-sizing-calculator (SMACNA remove link; drop ASHRAE comma)
  ['content/ductwork/ductwork-sizing-calculator.mdx', [
    { note: 'remove SMACNA source entry; drop ASHRAE comma',
      old: `  { name: "ASHRAE Handbook — Fundamentals", url: "https://www.ashrae.org/technical-resources/ashrae-handbook", description: "Chapter 21: Duct Design, friction charts, and fitting loss coefficients" },\n  { name: "SMACNA", url: "https://www.smacna.org/technical/standards", description: "HVAC Duct Construction Standards — Metal and Flexible" }`,
      neu: `  { name: "ASHRAE Handbook — Fundamentals", url: "https://www.ashrae.org/technical-resources/ashrae-handbook", description: "Chapter 21: Duct Design, friction charts, and fitting loss coefficients" }` },
  ]],
  // 15. voc-in-home-sources (CARB composite-wood remove link; keep in-text CARB Phase 2 mention)
  ['content/indoor-air-quality/voc-in-home-sources.mdx', [
    { note: 'remove CARB composite-wood source entry (in-text CARB Phase 2 mention kept)',
      old: `  { name: "California Air Resources Board (CARB) — Formaldehyde Airborne Toxic Control Measure", url: "https://ww2.arb.ca.gov/resources/documents/composite-wood-products-airborne-toxic-control-measure" },\n`,
      neu: `` },
  ]],
  // 16. solar-panel-calculator (SEIA impossible + EnergySage commercial remove; drop EIA comma)
  ['content/battery-backup/solar-panel-calculator.mdx', [
    { note: 'remove SEIA 2026-q4 (impossible) + EnergySage (commercial); drop EIA comma',
      old: `  { title: "EIA Residential Energy Consumption Survey", url: "https://www.eia.gov/consumption/residential/" },\n  { title: "SEIA Solar Market Insight Report 2026", url: "https://www.seia.org/research-resources/solar-market-insight-report-2026-q4" },\n  { title: "EnergySage Solar Panel Buyer's Guide", url: "https://www.energysage.com/solar-panels/" }`,
      neu: `  { title: "EIA Residential Energy Consumption Survey", url: "https://www.eia.gov/consumption/residential/" }` },
  ]],
  // 17. generator-guide (Generac remove)
  ['content/generators/generator-guide.mdx', [
    { note: 'remove Generac source entry',
      old: `  { label: "Generac Technical Specifications", url: "https://www.generac.com/all-products/generators" },\n`,
      neu: `` },
  ]],
  // 18. propane-generator-usage-per-hour (Generac + Kohler remove; drop EIA comma)
  ['content/generators/propane-generator-usage-per-hour.mdx', [
    { note: 'remove Generac + Kohler source entries; drop EIA comma',
      old: `  { label: "U.S. EIA — Weekly Heating Oil and Propane Prices", url: "https://www.eia.gov/dnav/pet/pet_pri_wfr_a_EPLLPA_PRS_dpgal_w.htm" },\n  { label: "Generac — LP Generator Specifications", url: "https://www.generac.com/all-products/generators/home-backup-generators" },\n  { label: "Kohler — Generator Fuel Consumption Data", url: "https://www.kohlerpower.com/na/en/residential/generators.html" }`,
      neu: `  { label: "U.S. EIA — Weekly Heating Oil and Propane Prices", url: "https://www.eia.gov/dnav/pet/pet_pri_wfr_a_EPLLPA_PRS_dpgal_w.htm" }` },
  ]],
  // 19. tankless-water-heater-propane-usage (Rinnai remove; drop EIA comma)
  ['content/tankless-water-heaters/tankless-water-heater-propane-usage.mdx', [
    { note: 'remove Rinnai source entry; drop EIA comma',
      old: `  { label: "EIA — Weekly Propane Prices", url: "https://www.eia.gov/dnav/pet/pet_pri_wfr_a_EPLLPA_PRS_dpgal_w.htm" },\n  { label: "Rinnai — LP Product Specifications", url: "https://www.rinnai.us/residential/tankless-water-heaters" }`,
      neu: `  { label: "EIA — Weekly Propane Prices", url: "https://www.eia.gov/dnav/pet/pet_pri_wfr_a_EPLLPA_PRS_dpgal_w.htm" }` },
  ]],
  // 20. tankless-water-heater-guide (Rinnai remove)
  ['content/tankless-water-heaters/tankless-water-heater-guide.mdx', [
    { note: 'remove Rinnai source entry',
      old: `  { label: "Rinnai — Product Specifications", url: "https://www.rinnai.us/residential/tankless-water-heaters" },\n`,
      neu: `` },
  ]],
  // 21. btucfm-ductwork-relationship (Carrier newsletter remove; drop ASHRAE comma)
  ['content/ductwork/btucfm-ductwork-relationship.mdx', [
    { note: 'remove Carrier Engineering Newsletter source; drop ASHRAE comma',
      old: `  { name: "ASHRAE Handbook — Fundamentals", url: "https://www.ashrae.org/technical-resources/ashrae-handbook", description: "Chapters 1 and 21 — psychrometrics, sensible heat equations, and duct design" },\n  { name: "Carrier Engineering Newsletter", url: "https://www.carrier.com/residential/en/us/", description: "Technical guidance on airflow per ton adjustments by climate" }`,
      neu: `  { name: "ASHRAE Handbook — Fundamentals", url: "https://www.ashrae.org/technical-resources/ashrae-handbook", description: "Chapters 1 and 21 — psychrometrics, sensible heat equations, and duct design" }` },
  ]],
];

for (const [file, edits] of perFile) editFile(file, edits);
console.log(`Per-file edits applied: ${changelog.length} across ${perFile.length} files.`);

// ============ GLOBAL URL SWAPS (content/ only) ============
const SWAPS = [
  // ACCA soft-404 normalization (longest-path first)
  ['https://www.acca.org/standards/manuals/manual-d', 'https://www.acca.org/standards/technical-manuals'],
  ['https://www.acca.org/standards/manual-d',         'https://www.acca.org/standards/technical-manuals'],
  ['https://www.acca.org/standards/manualj',          'https://www.acca.org/standards/technical-manuals/manual-j'],
  ['https://www.acca.org/standards/manual-j',         'https://www.acca.org/standards/technical-manuals/manual-j'],
  ['https://www.acca.org/standards/manuals',          'https://www.acca.org/standards/technical-manuals/manual-j'],
  ['https://www.acca.org/standards/quality-installation', 'https://www.acca.org/standards/quality'],
  ['https://www.acca.org/contractors',                'https://hvac-contractors.acca.org/locator'],
  // AHAM dead cert pages -> AHAM Verifide
  ['https://www.aham.org/AHAM/Certification/Room_Air_Conditioners', 'https://www.ahamverifide.org/'],
  ['https://www.aham.org/Standards/Room-Air-Conditioners',          'https://www.ahamverifide.org/'],
  // CDC legacy carbon-monoxide paths
  ['https://www.cdc.gov/co/default.htm',   'https://www.cdc.gov/carbon-monoxide/about/index.html'],
  ['https://www.cdc.gov/co-poisoning/',    'https://www.cdc.gov/carbon-monoxide/about/index.html'],
];
const swapTotals = Object.fromEntries(SWAPS.map(([o]) => [o, 0]));
const swapFiles = {};

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.mdx')) out.push(p);
  }
  return out;
}

for (const f of walk(path.join(ROOT, 'content'))) {
  let s = fs.readFileSync(f, 'utf8');
  let touched = false;
  for (const [oldU, newU] of SWAPS) {
    for (const b of ['"', ')']) {
      const from = oldU + b, to = newU + b;
      const c = s.split(from).length - 1;
      if (c > 0) {
        s = s.split(from).join(to);
        swapTotals[oldU] += c;
        (swapFiles[path.relative(ROOT, f)] = swapFiles[path.relative(ROOT, f)] || []).push(`${oldU} (${c})`);
        touched = true;
      }
    }
  }
  if (touched) fs.writeFileSync(f, s);
}

console.log('\n=== GLOBAL URL SWAP TOTALS ===');
for (const [o, n] of Object.entries(swapTotals)) console.log(`${n}\t${o}`);
console.log(`\nGlobal-swap files touched: ${Object.keys(swapFiles).length}`);
fs.writeFileSync(path.join(ROOT, 'scratchpad/partA-swapfiles.json'), JSON.stringify(swapFiles, null, 2));
fs.writeFileSync(path.join(ROOT, 'scratchpad/partA-changelog.json'), JSON.stringify(changelog, null, 2));
console.log('\nPart A apply complete.');
