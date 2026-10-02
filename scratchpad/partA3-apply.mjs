#!/usr/bin/env node
// CITE-1 Part A follow-up — DOE claim rewrites missed in the first pass (found by
// adversarial review), archived ACCA label/URL fixes, and two prose nits.
import fs from 'node:fs';
import path from 'node:path';
const ROOT = '/workspace';
const log = [];
function editFile(rel, edits) {
  const p = path.join(ROOT, rel);
  let s = fs.readFileSync(p, 'utf8');
  for (const e of edits) {
    const count = e.count == null ? 1 : e.count;
    const n = s.split(e.old).length - 1;
    if (n !== count) throw new Error(`MATCH FAIL [${rel}] "${e.note}": expected ${count}, found ${n}\n  old=<<${e.old.slice(0,90)}>>`);
    s = s.split(e.old).join(e.neu);
    log.push(`${rel}: ${e.note}`);
  }
  fs.writeFileSync(p, s);
}

const perFile = [
  // DOE 20-30% duct losses -> "about 30% ..." (only DOE-credited sentences; ENERGY STAR clauses stay)
  ['content/mini-split-air-conditioners/mini-split-vs-central-air.mdx', [
    { note: 'L38 DOE duct clause -> about 30% (ENERGY STAR 20% kept)',
      old: `and the DOE cites typical energy losses of 20 to 30%, from leaks`,
      neu: `and the DOE puts duct air losses at about 30% of a cooling system's energy consumption, from leaks` },
    { note: 'L44 table cell consistency',
      old: `Lower effective efficiency after 20–30% duct loss`,
      neu: `Lower effective efficiency after about 30% duct loss` },
    { note: 'L57 parenthetical',
      old: `no duct losses (the 20 to 30% the DOE cites)`,
      neu: `no duct losses (the DOE puts these at about 30% of a cooling system's energy consumption)` },
    { note: 'L101 FAQ (verbatim sibling sentence)',
      old: `Generally yes. Mini splits avoid the 20 to 30% duct losses the DOE attributes to typical duct systems, and their inverter compressors modulate to match demand.`,
      neu: `Generally yes. Mini splits avoid duct losses, which the DOE puts at about 30% of a cooling system's energy consumption, and their inverter compressors modulate to match demand.` },
    { note: 'L114 methodology',
      old: `The core efficiency claim, that 20 to 30% of the energy moving through a typical duct system is lost to leaks and poor insulation, is from the **U.S. Department of Energy.**`,
      neu: `The core efficiency claim, that the DOE puts duct air losses at about 30% of a cooling system's energy consumption, is from the **U.S. Department of Energy.**` },
  ]],
  ['content/hvac-brands/central-air-conditioner-guide.mdx', [
    { note: 'L171 DOE duct 20-30 -> about 30%',
      old: `The Department of Energy estimates that the average duct system loses 20–30% of conditioned air through leaks, holes, and poorly connected sections.`,
      neu: `The Department of Energy puts duct air losses at about 30% of a cooling system's energy consumption, lost through leaks, holes, and poorly connected sections.` },
  ]],
  ['content/ductwork/duct-leakage-testing.mdx', [
    { note: 'L34 DOE duct 20-30 -> about 30% (ENERGY STAR sentence after it kept)',
      old: `The U.S. Department of Energy estimates that duct leaks and poor insulation can waste **20–30% of conditioned air** in a typical home.`,
      neu: `The U.S. Department of Energy puts duct air losses at **about 30% of a cooling system's energy consumption** in a typical home.` },
  ]],
  // DOE setback claim (7-10F/8hr) -> programmable-thermostat phrasing
  ['content/_archived-merged/programmable-vs-smart-thermostat.mdx', [
    { note: 'L72 DOE setback claim rewrite',
      old: `The U.S. Department of Energy states that you can save approximately **10% per year on heating and cooling** by turning your thermostat back 7–10°F for 8 hours per day. This is the theoretical maximum for a programmable thermostat used correctly.`,
      neu: `The U.S. Department of Energy states that a programmable thermostat can save you approximately **10% per year on heating and cooling** when used consistently.` },
  ]],
  // Archived ACCA label/URL mismatches: point Manual S -> manual-s, Manual D -> technical-manuals
  ['content/_archived-product-pages/evaporative-coolers/best-evaporative-coolers.mdx', [
    { note: 'ACCA Manual S label -> manual-s URL (was manual-j)',
      old: `  { title: "ACCA – Residential Equipment Selection (Manual S)", url: "https://www.acca.org/standards/technical-manuals/manual-j" }`,
      neu: `  { title: "ACCA – Residential Equipment Selection (Manual S)", url: "https://www.acca.org/standards/technical-manuals/manual-s" }` },
  ]],
  ['content/_archived-product-pages/dehumidifiers/best-whole-house-dehumidifiers.mdx', [
    { note: 'ACCA Manual D fm label -> technical-manuals URL (was manual-j)',
      old: `  - label: "ACCA Manual D — Residential Duct Design"\n    url: "https://www.acca.org/standards/technical-manuals/manual-j"`,
      neu: `  - label: "ACCA Manual D — Residential Duct Design"\n    url: "https://www.acca.org/standards/technical-manuals"` },
    { note: 'ACCA Manual D source label -> technical-manuals URL (was manual-j)',
      old: `  { label: "ACCA — Manual D Residential Duct Design", url: "https://www.acca.org/standards/technical-manuals/manual-j" },`,
      neu: `  { label: "ACCA — Manual D Residential Duct Design", url: "https://www.acca.org/standards/technical-manuals" },` },
  ]],
  // Prose nits from review
  ['content/mini-split-air-conditioners/mini-split-electricity-usage.mdx', [
    { note: 'nit: remove redundant "closer to the outdoor temperature" repetition',
      old: `**Set the temperature sensibly.** Per the Department of Energy, you save on energy costs by setting the thermostat closer to the outdoor temperature; each degree closer to the outdoor temperature saves energy. In cooling,`,
      neu: `**Set the temperature sensibly.** Per the Department of Energy, each degree you let the thermostat settle closer to the outdoor temperature saves energy. In cooling,` },
  ]],
  ['content/air-conditioners/ac-troubleshooting-guide.mdx', [
    { note: 'nit: reword orphaned parenthetical after setback rewrite',
      old: `a programmable thermostat can save you **up to 10% a year on heating and cooling** (for example, when you're at work), and each degree closer to the outdoor temperature saves energy.`,
      neu: `a programmable thermostat can save you **up to 10% a year on heating and cooling** by easing the temperature back while you're away, and each degree closer to the outdoor temperature saves energy.` },
  ]],
];
for (const [f, e] of perFile) editFile(f, e);
console.log(`Part A follow-up: ${log.length} edits across ${perFile.length} files.`);
log.forEach(l => console.log('  ' + l));
