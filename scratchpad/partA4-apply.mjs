#!/usr/bin/env node
// CITE-1 Part A follow-up (2) — the last two DOE-credited claims found by an
// exhaustive site-wide sweep (rule b setback + rule c duct, wherever DOE is credited).
import fs from 'node:fs';
import path from 'node:path';
const ROOT = '/workspace';
const log = [];
function editFile(rel, edits) {
  const p = path.join(ROOT, rel);
  let s = fs.readFileSync(p, 'utf8');
  for (const e of edits) {
    const n = s.split(e.old).length - 1;
    if (n !== 1) throw new Error(`MATCH FAIL [${rel}] "${e.note}": expected 1, found ${n}`);
    s = s.split(e.old).join(e.neu);
    log.push(`${rel}: ${e.note}`);
  }
  fs.writeFileSync(p, s);
}

editFile('content/furnaces-heating/thermostat-temperature-winter.mdx', [{
  note: 'L30 DOE setback claim: DOE credited only with supportable programmable-thermostat ~10%; concrete 68F/7-10F/8hr routine reframed as general practice',
  old: `The U.S. Department of Energy recommends setting your thermostat to **68°F (20°C) when you're home and awake**, then lowering it by **7–10°F for 8 hours per day** (while sleeping or away). This single adjustment saves approximately **10% on annual heating costs** — about $80–$120/year for the average household. Every 1°F you lower the thermostat below 70°F saves roughly 1–3% on your heating bill, depending on climate severity and home insulation.`,
  neu: `The U.S. Department of Energy says a programmable thermostat can save up to **10% a year on heating and cooling**. A widely used routine is to set your thermostat to **68°F (20°C) when you're home and awake**, then lower it by **7–10°F for about 8 hours a day** while sleeping or away; for a typical household that setback is worth roughly $80 to $120 a year. Every 1°F you lower the thermostat below 70°F saves roughly 1–3% on your heating bill, depending on climate severity and home insulation.`,
}]);

editFile('content/_archived-merged/what-is-seer-rating.mdx', [{
  note: 'L114 DOE 20-30% duct -> about 30%',
  old: `The DOE estimates that 20-30% of conditioned air is lost through leaky ducts in typical homes.`,
  neu: `The DOE puts duct air losses at about 30% of a cooling system's energy consumption in typical homes.`,
}]);

console.log(`Part A follow-up (2): ${log.length} edits.`);
log.forEach(l => console.log('  ' + l));
