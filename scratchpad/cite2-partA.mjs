#!/usr/bin/env node
// CITE-2 Part A — remove unsupported "up to 30%" dirty-coil figure; cite ENERGY STAR checklist.
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

editFile('content/hvac-maintenance/how-to-clean-ac-coils.mdx', [
  { note: 'description: drop DOE up-to-30% -> qualitative',
    old: `description: "Step-by-step DIY guide to cleaning your condenser and evaporator coils: the tools, cleaner types, safety steps, and how often. Per the US DOE, a dirty condenser coil can raise compressor energy use by up to 30%."`,
    neu: `description: "Step-by-step DIY guide to cleaning your condenser and evaporator coils: the tools, cleaner types, safety steps, and how often. Dirty coils make your AC run longer to cool the home, which raises energy costs and shortens its life."` },
  { note: 'frontmatter: add ENERGY STAR Maintenance Checklist externalLink',
    old: `  - url: "https://www.energy.gov/sites/prod/files/2014/06/f16/HomeCooling101.pdf"\n    label: "U.S. DOE: Energy Saver 101, Home Cooling (PDF)"`,
    neu: `  - url: "https://www.energy.gov/sites/prod/files/2014/06/f16/HomeCooling101.pdf"\n    label: "U.S. DOE: Energy Saver 101, Home Cooling (PDF)"\n  - url: "https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist"\n    label: "ENERGY STAR: Maintenance Checklist"` },
  { note: 'intro: drop DOE up-to-30% -> qualitative',
    old: `The payoff is real: according to the U.S. Department of Energy, **a dirty condenser coil can increase the compressor's energy consumption by up to 30%**, so cleaning it can noticeably cut your cooling cost and extend the system's life.`,
    neu: `The payoff is real: a dirty coil reduces your system's ability to cool the home and forces it to run longer, so cleaning it can noticeably cut your cooling cost and extend the system's life.` },
  { note: 'why-clean-coils-matter bullet: drop DOE 30% figure',
    old: `- **Higher energy bills**, the DOE figure above (up to 30% more compressor energy) shows how much a dirty condenser alone can cost.`,
    neu: `- **Higher energy bills**, the system runs longer to reach the same temperature, so a dirty condenser alone can noticeably raise what you pay to cool your home.` },
  { note: 'FAQ "Does cleaning AC coils really improve efficiency?": drop DOE up-to-30%',
    old: `Yes. Dirty coils block heat transfer and force the system to work harder. The DOE notes a dirty condenser coil can raise compressor energy use by up to 30%, so cleaning restores lost efficiency, improves cooling, and extends the system's life. It's one of the most cost-effective maintenance tasks.`,
    neu: `Yes. Dirty coils block heat transfer and force the system to work harder and run longer to cool the home, which raises energy costs and shortens equipment life. Cleaning restores lost efficiency, improves cooling, and extends the system's life, and it's one of the most cost-effective maintenance tasks.` },
  { note: 'How we sourced: ENERGY STAR for qualitative point; DOE PDF only for what it says',
    old: `The figure that a dirty condenser coil can increase compressor energy consumption by **up to 30%** is from the **U.S. Department of Energy**, widely cited in HVAC energy-efficiency guidance. The principle that fouled coils reduce heat transfer, raise energy use, and shorten equipment life reflects **DOE** and **EPA** maintenance guidance, and research from **ASHRAE** and building-science studies documents efficiency losses from coil fouling (with the magnitude depending on how dirty the coil is and the system's condition).`,
    neu: `The qualitative point that dirty coils reduce a system's ability to cool the home and make it run longer, which raises energy costs and shortens equipment life, follows **ENERGY STAR's** maintenance guidance. The U.S. Department of Energy's Energy Saver 101 (Home Cooling) recommends checking the evaporator coil every year and cleaning it as necessary, and notes that clean filters can lower an air conditioner's energy use by 5 to 15%. Research from **ASHRAE** and building-science studies documents efficiency losses from coil fouling, with the magnitude depending on how dirty the coil is and the system's condition.` },
  { note: 'SourcesBox: add ENERGY STAR Maintenance Checklist',
    old: `<SourcesBox sources={[\n  { label: "U.S. DOE: Energy Saver 101, Home Cooling (PDF)", url: "https://www.energy.gov/sites/prod/files/2014/06/f16/HomeCooling101.pdf" }\n]} />`,
    neu: `<SourcesBox sources={[\n  { label: "ENERGY STAR: Maintenance Checklist", url: "https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist" },\n  { label: "U.S. DOE: Energy Saver 101, Home Cooling (PDF)", url: "https://www.energy.gov/sites/prod/files/2014/06/f16/HomeCooling101.pdf" }\n]} />` },
]);

editFile('content/hvac-brands/central-air-conditioner-guide.mdx', [
  { note: 'maintenance table cell: drop stated-as-fact "10-30%" -> qualitative',
    old: `| Evaporator coil cleaning | Remove dirt and biological growth | Dirty coils reduce efficiency 10–30% |`,
    neu: `| Evaporator coil cleaning | Remove dirt and biological growth | Dirty coils make the system run longer, raising energy costs |` },
]);

console.log(`CITE-2 Part A: ${log.length} edits.`);
log.forEach(l => console.log('  ' + l));
