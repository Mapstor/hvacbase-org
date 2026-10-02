#!/usr/bin/env node
// CITE-1 Part A (supplement) — archived manufacturer removals missed in pass 1,
// plus one unlisted ACCA soft-404 variant (/standards/manuals/manual-j).
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
  ['content/_archived-product-pages/smart-thermostats/best-smart-thermostats.mdx', [
    { note: 'remove Google Nest (store.google) source',
      old: `    { label: "Google Nest Savings Data", url: "https://store.google.com/us/category/thermostats" },\n`, neu: `` },
  ]],
  ['content/_archived-merged/natural-gas-generator-running-cost.mdx', [
    { note: 'remove Generac source',
      old: `    { label: "Generac — Generator Specifications", url: "https://www.generac.com/all-products/generators/home-backup-generators" },\n`, neu: `` },
  ]],
  ['content/_archived-product-pages/generators/best-whole-house-generators.mdx', [
    { note: 'remove Generac + Kohler sources',
      old: `    { label: "Generac — Home Backup Generators", url: "https://www.generac.com/all-products/generators/home-backup-generators" },\n    { label: "Kohler — Residential Generators", url: "https://www.kohlerpower.com/na/en/residential/generators.html" },\n`, neu: `` },
  ]],
  ['content/_archived-merged/what-size-generator-for-5-ton-ac.mdx', [
    { note: 'remove Kohler markdown recommendation bullet',
      old: `  - [Kohler Generators](https://www.kohlerpower.com/na/en/residential/generators.html) — Standby generator specifications\n`, neu: `` },
  ]],
  ['content/_archived-product-pages/tankless-water-heaters/smallest-tankless-water-heaters.mdx', [
    { note: 'remove Rinnai source',
      old: `  { label: "Rinnai — V Series Compact Models", url: "https://www.rinnai.us/residential/tankless-water-heaters" },\n`, neu: `` },
  ]],
  ['content/_archived-product-pages/tankless-water-heaters/best-tankless-gas-water-heaters.mdx', [
    { note: 'remove Rinnai source',
      old: `  { label: "Rinnai — RU & V Series Product Data", url: "https://www.rinnai.us/residential/tankless-water-heaters" },\n`, neu: `` },
  ]],
  ['content/_archived-product-pages/tankless-water-heaters/best-tankless-water-heaters.mdx', [
    { note: 'remove Rinnai source',
      old: `  { label: "Rinnai — Product Catalog", url: "https://www.rinnai.us/residential/tankless-water-heaters" },\n`, neu: `` },
  ]],
  // Unlisted ACCA soft-404 variant: /standards/manuals/manual-j -> canonical manual-j
  ['content/_archived-product-pages/smart-thermostats/best-thermostat-for-heat-pump.mdx', [
    { note: 'normalize ACCA /standards/manuals/manual-j soft-404 -> technical-manuals/manual-j',
      old: `https://www.acca.org/standards/manuals/manual-j"`, neu: `https://www.acca.org/standards/technical-manuals/manual-j"` },
  ]],
];
for (const [f, e] of perFile) editFile(f, e);
console.log(`Part A supplement: ${log.length} edits applied.`);
log.forEach(l => console.log('  ' + l));
