# CC-OUTPUT — COST-1 run report (2026-10-09)

Re-sourced the installation-cost pages from **NREL REMDB 2024**. One commit per page; **CC did not push** (Marko pushes). All gates green.

## Headline result

- **Sitewide unsourced-price count (c) = 0.** Re-classifying every dollar figure across all 128 live pages (66 carry a `$`) gives **a = 616 primary-sourced, b = 944 arithmetic/labeled-input, c = 0 unsourced.** The pre-FIX-29 PRICES.md snapshot had c = 394; COST-1 closes the remainder.
- **10 pages changed + HANDOFF registry**, 11 commits total, all on `main`, **unpushed**.
- Verification: `tsc` clean, svg-lint 59/59, content-audit all gate metrics 0, `audit.mjs --skip-build` clean, full `audit.mjs` (build 279/279, exit 0, 18 static routes) **0 findings**.

## Commits (unpushed, newest first)

```
cda29fd content(hvac-maintenance-cost): remove unsourced tune-up prices, retitle (COST-1)
e26cf47 content(electrical-panel-upgrade-cost): re-source panel price from NREL REMDB; drivers qualitative (COST-1)
4da974a content(tankless-water-heater-cost): re-source install prices from NREL REMDB (COST-1)
47d688f content(furnace-installation-cost): re-source install prices from NREL REMDB (COST-1)
747abdb content(mini-split-installation-cost): re-source install prices from NREL REMDB (COST-1)
7314993 content(heat-pump-cost-to-install): re-source install prices from NREL REMDB (COST-1)
c3c7cb3 content(central-ac-cost-to-install): re-source install prices from NREL REMDB (COST-1)
c91eecd docs(HANDOFF): add NREL REMDB source, method and all figures to the verified-facts registry (COST-1)
ac9d3e1 content(solar-panel-calculator): match losses text to the 85% constant; drop unsourced battery price (COST-1)
e39aa69 content(smart-thermostat-savings): add NREL REMDB installed price, recompute payback (COST-1)
a26ba3e content(moisture-barrier-crawl-space): drop the cost promise from the title (COST-1)
```

## Method (applied to every figure below)

NREL National Residential Efficiency Measures Database (REMDB), 2024 release (https://remdb.nrel.gov/). Installed cost = material price (quantile regression on size and efficiency) × installation multiplier + installation adder, **retrofit (replacement) scenario, total installed cost including removing the old equipment, 2023 dollars, before any rebates**; low / mid / high. Rounded to the nearest $50, written as "about". SEER2 shown alongside SEER (≈ SEER × 0.95) for central AC and air-source heat pumps; mini-split and furnace rows have no SEER2. No lifetimes taken from REMDB. Work REMDB does not price (ductwork, venting conversions, line sets, meter/cable/service-drop, permits, etc.) carries **no figure** and is described as a cost driver. REMDB added to each cost page's SourcesBox and to the HANDOFF verified-facts registry.

---

## Per-page BEFORE / AFTER — every price change

The 7 REMDB-sourced cost pages. Figures labeled "about …". "Costs more (qualitative)" = REMDB does not price that item, so it is now a described cost driver with no number.

### central-ac-cost-to-install  (18 price changes)

| Where | BEFORE | AFTER |
|---|---|---|
| Bold answer, AC on existing ducts | $4,000 to $8,500 installed | about $3,100 to $7,200 (3-ton, 14 SEER/13.3 SEER2); about $4,150 to $9,700 (16 SEER/15.2 SEER2); mid about $5,150 and $6,900 |
| Bold answer, AC and furnace together | $6,500 to $14,000 | costs more (qualitative; REMDB does not price the combo) |
| Bold answer, first-time with new ducts | $10,000 to $18,000 or more | costs more (qualitative; REMDB does not price it) |
| Job table, AC replacement existing ducts | $4,000 to $8,500 | about $3,100 to $7,200 at 14 SEER, about $4,150 to $9,700 at 16 SEER (3 tons) |
| Job table, AC and furnace replacement | $6,500 to $14,000 | Costs more (two separate equipment swaps) |
| Job table, first-time central air with new ducts | $10,000 to $18,000+ | Costs more (new ductwork on top) |
| Job table, heat pump instead of AC | $5,800 to $12,500 | See the heat pump cost guide (priced on that page) |
| Cost-by-size table, 1.5 tons | $3,200 to $5,800 | removed (REMDB does not price 1.5 tons) |
| Cost-by-size table, 2 tons | $3,400 to $6,400 | about $2,800 to $6,500 (14 SEER); about $3,850 to $9,000 (16 SEER) |
| Cost-by-size table, 2.5 tons | $3,800 to $7,100 | removed (REMDB does not price 2.5 tons) |
| Cost-by-size table, 3 tons | $4,200 to $7,900 | about $3,100 to $7,200 (14 SEER); about $4,150 to $9,700 (16 SEER) |
| Cost-by-size table, 3.5 tons | $4,600 to $8,600 | removed (REMDB does not price 3.5 tons) |
| Cost-by-size table, 4 tons | $5,000 to $9,300 | about $3,400 to $7,900 (14 SEER); about $4,450 to $10,350 (16 SEER) |
| Cost-by-size table, 5 tons | $5,600 to $10,500 | about $3,650 to $8,550 (14 SEER); about $4,750 to $11,050 (16 SEER) |
| Payback paragraph (body) | $1,000 more premium, roughly 8 to 14 years | about $1,750 more installed (about $6,900 vs $5,150), saves about $86 to $143/yr, about 12 to 20 years |
| What adds to the cost, ductwork | roughly $2,000 to $5,000 | removed (qualitative cost driver, REMDB does not price it) |
| What adds to the cost, panel upgrade | $1,500 to $4,000 | about $1,000 to $3,100 (NREL REMDB 200-amp, rough) |
| FAQ, is higher-SEER2 worth it | saves $72 to $120 a year, $1,000 premium, roughly 8 to 14 years | about $1,750 more installed, saves about $86 to $143 a year, about 12 to 20 years |

Removed (REMDB does not price; now qualitative cost drivers): AC and furnace replacement combo ($6,500 to $14,000) — REMDB prices only the AC equipment swap; First-time central air with new ducts ($10,000 to $18,000+) — ductwork not priced by REMDB; Heat pump instead of AC ($5,800 to $12,500) — priced on the heat-pump-cost-to-install page instead; 1.5-ton AC size ($3,200 to $5,800) — REMDB prices 2 to 5 tons only; 2.5-ton AC size ($3,800 to $7,100) — REMDB prices whole-ton steps 2 to 5; 3.5-ton AC size ($4,600 to $8,600) — REMDB prices whole-ton steps 2 to 5; New single-story ductwork ($2,000 to $5,000) — now a qualitative cost driver

### heat-pump-cost-to-install  (21 price changes)

| Where | BEFORE | AFTER |
|---|---|---|
| meta description, ducted 3-ton | roughly $5,800 to $10,000 | about $7,450 to $19,250 installed (about $13,350 mid) |
| meta description, single-zone mini split | from about $2,700 | start around $4,500 |
| bold answer, ducted 3-ton | roughly $5,800 to $10,000 installed for a 3-ton system | about $7,450 to $19,250 for a 3-ton, 15-SEER (about 14.2 SEER2) system, about $13,350 mid |
| bold answer, new electrical circuit | (not stated) | adds about $1,400 |
| bold answer, single-zone mini split | about $2,700 to $5,800 | about $4,500 to $10,500 (12,000 BTU, 20 SEER) |
| bold answer, geothermal | roughly $18,000 to $35,000 before incentives | much more; NREL's database does not price it |
| cost-by-system-type table, ducted standard-efficiency | ~$5,800–$10,000 | about $7,450 / $13,350 / $19,250 (15 SEER, 14.2 SEER2) |
| cost-by-system-type table, ducted high-efficiency | ~$7,500–$12,500 | about $8,000 / $14,250 / $20,500 (16 SEER, 15.2 SEER2) |
| cost-by-system-type table, single-zone mini split | ~$2,700–$5,800 | about $4,500 / $7,500 / $10,500 (12,000 BTU, 20 SEER) |
| cost-by-system-type table, multi-zone mini split | ~$6,500–$19,000 | about $7,000–$29,550 (2–4 ton, 18 SEER) |
| cost-by-system-type table, geothermal | ~$18,000–$35,000 | Not priced by REMDB |
| cost-by-size table, 2 ton | ~$4,700–$8,200 | about $6,500 / $11,750 / $17,000 |
| cost-by-size table, 3 ton | ~$5,800–$10,000 | about $7,450 / $13,350 / $19,250 |
| cost-by-size table, 4 ton | ~$7,000–$11,500 | about $8,400 / $14,950 / $21,500 |
| cost-by-size table, 5 ton | ~$8,300–$13,000 | about $9,400 / $16,550 / $23,700 |
| labor section, new electrical circuit | (itemized labor table, no circuit line) | adds about $1,400 (NREL) |
| What pushes the cost up, panel upgrade | roughly $1,500 to $4,000 | about $1,000 to $3,100 (NREL REMDB, rough) |
| What pushes the cost up, new/modified ductwork | roughly $2,000 to $5,000 for a single story | removed; described as a separate cost REMDB does not price |
| FAQ furnace+AC vs heat pump, furnace+AC | about $4,500 to $6,500 installed | about $3,400 furnace + about $5,150 AC = about $8,550 at mid |
| FAQ furnace+AC vs heat pump, heat pump | roughly $5,800 to $10,000 | about $13,350 at mid |
| FAQ dual-fuel add | roughly $3,500 to $7,000 for the heat pump equipment and installation | removed; REMDB does not price it separately |

Removed (REMDB does not price; now qualitative cost drivers): Ground-source/geothermal install ($18,000–$35,000) — not priced by REMDB; New/modified ductwork ($2,000–$5,000 single story) — not priced by REMDB; Labor line-item breakdown: remove old equipment ($200–$500), set outdoor unit ($300–$600), air handler/coil ($500–$1,200), refrigerant line set ($300–$800), electrical connection ($300–$800), thermostat+wiring ($100–$300), commissioning ($200–$400), permits+inspection ($100–$500) — REMDB total already bundles these, not itemized; Dual-fuel heat pump added to existing furnace ($3,500–$7,000) — not priced by REMDB; High-efficiency variable-speed as a separately priced tier ($7,500–$12,500) — now shown as the REMDB 16-SEER row; 1.5-ton ($4,000–$7,000) and 2.5-ton ($5,300–$9,000) sizes — REMDB prices only 2–5 tons; Labor-share percentage '40 to 55% of the total' — unsourced percentage, removed under the standing number rule

### mini-split-installation-cost  (27 price changes)

| Where | BEFORE | AFTER |
|---|---|---|
| Bold answer, single-zone | $1,500 to $4,500 fully installed | about $4,500 to $10,500 installed for a 12,000 BTU, 20 SEER unit, roughly $7,500 at the mid estimate |
| Bold answer, multi-zone | roughly $4,000 to $18,000 | about $7,000 to $30,200 (2 to 4 tons) |
| Bold answer, DIY | around $800 to $2,000 | (figure removed; DIY now qualitative, no number) |
| Config table, single-zone budget 9K-12K BTU | $1,400–$2,500 | 9,000 BTU: 20 SEER $3,800 / $6,300 / $8,850; 25 SEER $4,500 / $7,500 / $10,550 |
| Config table, single-zone mid-tier 12K BTU | $1,900–$3,600 | 12,000 BTU: 20 SEER $4,500 / $7,500 / $10,500; 25 SEER $5,200 / $8,700 / $12,150 |
| Config table, single-zone premium 12K BTU | $2,600–$4,700 | (tier removed; 18,000 BTU added: 20 SEER $5,900 / $9,850 / $13,800; 25 SEER $6,650 / $11,050 / $15,450) |
| Config table, single-zone 24K BTU | $2,400–$4,400 | (removed; REMDB does not price 24K single-zone) |
| Config table, 3-zone multi-split | $6,000–$10,000 | multi-zone 2 tons: 18 SEER $7,000 / $11,700 / $16,400; 20 SEER $7,300 / $12,200 / $17,050 |
| Config table, 4-zone multi-split | $8,000–$13,000 | multi-zone 3 tons: 18 SEER $9,850 / $16,400 / $22,950; 20 SEER $10,150 / $16,900 / $23,650 |
| Config table, 5-zone multi-split | $10,000–$16,500 | multi-zone 4 tons: 18 SEER $12,650 / $21,100 / $29,550; 20 SEER $12,950 / $21,600 / $30,200 |
| Config table, DIY single-zone (pre-charged) | $800–$1,500 | (row removed; DIY qualitative) |
| Config table, DIY single-zone + electrician | $1,000–$2,000 | (row removed; DIY qualitative) |
| Notes bullet, mid-tier sweet spot | (~$1,900–$3,600) | (figure removed; described qualitatively) |
| Line-item: site assessment | $0 to $200 | (no figure; qualitative) |
| Line-item: indoor unit mounting | $200 to $400 | (no figure; qualitative) |
| Line-item: outdoor unit placement | $150 to $350 | (no figure; qualitative) |
| Line-item: wall penetration | $100 to $200 | (no figure; qualitative) |
| Line-item: line set installation | $200 to $900 | (no figure; qualitative) |
| Line-item: flare connections | $100 to $200 | (no figure; qualitative) |
| Line-item: vacuum and leak test | $150 to $300 | (no figure; qualitative) |
| Line-item: refrigerant charge verification | $50 to $150 | (no figure; qualitative) |
| Line-item: condensate drain routing | $50 to $200 | (no figure; qualitative) |
| Line-item: commissioning and testing | $100 to $200 | (no figure; qualitative) |
| FAQ how much does it cost, single-zone | $1,500 to $4,500 installed | about $4,500 to $10,500 installed (12,000 BTU, 20 SEER; about $7,500 mid) |
| FAQ how much does it cost, multi-zone | $4,000 to $18,000 | about $7,000 to $30,200 (2 to 4 tons) |
| FAQ how much does it cost, DIY | around $800 to $2,000 | (figure removed; DIY qualitative) |
| FAQ labor cost | $800 to $2,000 per zone | (figure removed; REMDB bundles labor, described qualitatively) |

Removed (REMDB does not price; now qualitative cost drivers): DIY pre-charged single-zone install price ($800 to $2,000 / $800 to $1,500 / $1,000 to $2,000): REMDB does not price DIY, now described qualitatively as avoiding most professional labor; Per-zone professional labor cost ($800 to $2,000 per zone): REMDB bundles labor into the total and does not itemize it; Line-item install breakdown sub-prices (site assessment $0-$200, mounting $200-$400, outdoor placement $150-$350, wall penetration $100-$200, line set $200-$900, flare $100-$200, vacuum/leak test $150-$300, charge verification $50-$150, condensate drain $50-$200, commissioning $100-$200): REMDB's total already bundles these steps, now a qualitative checklist; Budget/mid-tier/premium single-zone tier prices and the 24K BTU single-zone row: REMDB prices single-zone by BTU (9K/12K/18K) and SEER, not by marketing tier or 24K size; Per-zone-count multi-split rows (3-zone, 4-zone, 5-zone dollar ranges): REMDB prices multi-zone by total tonnage (2/3/4 ton), not by zone count; Mid-tier value sweet spot parenthetical ($1,900 to $3,600): tier-based figure not in REMDB

### furnace-installation-cost  (22 price changes)

| Where | BEFORE | AFTER |
|---|---|---|
| Bold answer, gas 80% AFUE | about $3,000 to $5,500 | about $3,250 to $4,100 (about $3,400 mid) |
| Bold answer, gas high-efficiency | $4,500 to $7,500 at about 96% | about $3,750 to $4,800 at 95% AFUE (about $4,050 mid) |
| Bold answer, electric furnace | $2,000 to $5,500 | removed (qualitative: not priced in this source) |
| Bold answer, oil furnace | $5,000 to $10,000 | removed (qualitative: not priced in this source) |
| Typical-costs table, gas 80% single-stage | $3,000 to $5,500 | 60k about $3,150-$3,850; 80k about $3,250-$4,100; 100k about $3,350-$4,300 (REMDB low-high, mid shown) |
| Typical-costs table, gas ~96% two-stage | $4,500 to $7,500 | 95% AFUE: 60k about $3,650-$4,600; 80k about $3,750-$4,800; 100k about $3,850-$5,050 (REMDB) |
| Typical-costs table, gas 98%+ modulating | $6,500 to $10,000 or more | removed (qualitative: costs more than single-stage) |
| Typical-costs table, electric | $2,000 to $5,500 | removed (qualitative) |
| Typical-costs table, oil | $5,000 to $10,000 | removed (qualitative) |
| Typical-costs table, dual fuel | $8,000 to $16,000 | removed (qualitative) |
| What-drives-price table, furnace equipment | $1,200 to $4,500 | removed (now in the REMDB equipment-swap figure) |
| What-drives-price table, labor | $1,500 to $3,000 | removed (now in the REMDB equipment-swap figure) |
| What-drives-price table, ductwork changes | $0 to $2,000 | removed (qualitative cost driver) |
| What-drives-price table, venting change | $0 to $800 | removed (qualitative cost driver) |
| What-drives-price table, condensate drain/pump | $0 to $400 | removed (qualitative cost driver) |
| What-drives-price table, thermostat | $0 to $300 | removed (qualitative cost driver) |
| What-drives-price table, permits and inspection | $100 to $500 | removed (qualitative cost driver) |
| What-drives-price table, removal/gas/electrical | $100 to $500 | removed (removal folded into the swap; gas/electrical kept as qualitative cost driver) |
| Payback paragraph, installed premium | $1,500 more installed | about $650 more at the mid estimate (REMDB 80k, 80%→95%) |
| Payback paragraph, payback period | about 9.7 years | about 4 years on energy savings alone, longer with venting on top |
| FAQ How much to replace a gas furnace, 80% | $3,000 to $5,500 for an 80% furnace | about $3,250 to $4,100 installed at 80% AFUE (80k BTU/hr) |
| FAQ How much to replace a gas furnace, high-eff | $4,500 to $7,500 for a condensing furnace of about 96% | about $3,750 to $4,800 at 95% AFUE (80k BTU/hr) |

Removed (REMDB does not price; now qualitative cost drivers): Electric furnace installed price ($2,000 to $5,500) — REMDB does not price electric furnaces; Oil furnace installed price ($5,000 to $10,000) — not priced by REMDB; Dual-fuel (heat pump + gas furnace) price ($8,000 to $16,000) — not priced by REMDB; 98%+ modulating gas furnace price ($6,500 to $10,000 or more) — not a separate REMDB efficiency tier; Furnace equipment line-item ($1,200 to $4,500) — bundled into REMDB installed-cost figure; Labor line-item ($1,500 to $3,000) — bundled into REMDB installed-cost figure; Ductwork changes ($0 to $2,000) — now a qualitative cost driver; Venting change ($0 to $800) — now a qualitative cost driver; Condensate drain or pump ($0 to $400) — now a qualitative cost driver; Thermostat ($0 to $300) — now a qualitative cost driver; Permits and inspection ($100 to $500) — now a qualitative cost driver; Removal, gas and electrical work ($100 to $500) — now a qualitative cost driver

### tankless-water-heater-cost  (14 price changes)

| Where | BEFORE | AFTER |
|---|---|---|
| Bold answer, gas tankless installed | $1,900 to $6,000 | about $1,550 to $2,400 non-condensing (UEF 0.82) and about $2,100 to $3,050 condensing (UEF 0.95) |
| Bold answer, whole-house electric installed | $1,150 to $3,100 | about $1,200 to $1,700 (UEF 0.98) |
| Bold answer, point-of-use | $450 to $1,050 | (number removed) costs less, REMDB does not price it separately |
| Typical-costs table, gas non-condensing | unit $700 to $1,400 / install $1,200 to $3,000 / total $1,900 to $4,400 | about $1,550 / $1,950 / $2,400 installed (UEF 0.82) |
| Typical-costs table, gas condensing | unit $1,200 to $2,500 / install $1,500 to $3,500 / total $2,700 to $6,000 | about $2,100 / $2,450 / $3,050 installed (UEF 0.95) |
| Typical-costs table, electric whole-house | unit $350 to $900 / install $800 to $2,200 / total $1,150 to $3,100 | about $1,200 / $1,350 / $1,700 installed (UEF 0.98) |
| What-drives-the-price table, panel upgrade | $1,500 to $4,000 | about $1,000 to $3,100 (NREL REMDB 200A panel, rough) |
| New comparison table, gas tank 50 gal | (not previously present) | about $1,650 / $2,050 / $2,850 (UEF 0.64) |
| New comparison table, electric tank 50 gal | (not previously present) | about $1,600 / $1,850 / $2,100 (UEF 0.93) |
| New comparison table, heat pump water heater 50 gal | (not previously present) | about $2,850 / $3,200 / $3,950 (UEF 3.75) |
| Running cost & payback paragraph | If it costs $1,500 more to install, that takes about 12 years to pay back | about $400 more to install than a gas tank (about $2,450 versus $2,050), so the energy saving alone pays that back in about 3 years |
| Total-cost-over-15-to-20-years paragraph | more than the example $1,500 installation premium above | more than the roughly $400 mid-estimate premium above |
| FAQ: how much to install | typically $1,900 to $6,000 ... Whole-house electric runs $1,150 to $3,100 | about $1,550 to $2,400 non-condensing and about $2,100 to $3,050 condensing ... Whole-house electric runs about $1,200 to $1,700 |
| FAQ: is it worth the cost | a $1,500 premium takes about 12 years to recover | the roughly $400 mid-estimate premium over a tank takes about 3 years to recover on energy alone, longer once any gas-line or venting conversion is added |

Removed (REMDB does not price; now qualitative cost drivers): Gas outdoor model row ($900 to $2,200 unit / $1,000 to $2,500 install / $1,900 to $4,700 total) — REMDB does not price this configuration; now described qualitatively (skips indoor venting, needs freeze protection); Electric point-of-use row ($150 to $350 unit / $300 to $700 install / $450 to $1,050 total, and the $450 to $1,050 figure in the bold answer) — REMDB does not price point-of-use units; now qualitative ('costs less'); Gas line upgrade 'up to about $800' — REMDB total bundles the basic install; now a qualitative cost driver; New gas line run 'up to about $1,200' — now qualitative; PVC venting (condensing) '$100 to $400' — now qualitative; Stainless venting (non-condensing) '$200 to $600' — now qualitative; Condensate drain '$50 to $200' — now qualitative; Electrician new circuits '$300 to $800' — now qualitative; Permits '$50 to $200' — now qualitative

### electrical-panel-upgrade-cost  (7 price changes)

| Where | BEFORE | AFTER |
|---|---|---|
| frontmatter description | $1,500 to $4,000 for the panel alone, or $3,000 to $6,000 with utility work | about $1,000 to $3,100 (NREL REMDB, rough); full service upgrade costs more |
| bold answer | $1,500 to $4,000 ... around $2,000 to $3,000 (100A→200A) | about $1,000 to $3,100 installed (about $1,500 mid), 200-amp panel |
| summary table: panel swap only | $1,500–$2,500 | 200-amp panel: about $1,000 / $1,500 / $3,100 (low/mid/high) |
| summary table: 100-amp row (new) | (not previously priced) | about $500 / $750 / $1,050 (low/mid/high) |
| types-of-upgrades Type 1 | $1,500–$2,500 | roughly $1,000 to $3,100 REMDB range (reference, no new figure) |
| smart-panel section (320A) | $8,000 to $15,000 for 320A service | much more than a 200-amp panel replacement |
| FAQ 'how much does it cost' | $1,500 to $4,000 ... $2,000 to $3,000 ... $8,000 to $15,000 (320A/400A) | about $1,000 to $3,100 (about $1,500 mid); larger scopes cost more (qualitative) |

Removed (REMDB does not price; now qualitative cost drivers): Summary-table combos not priced by REMDB: Panel + meter socket $2,000–$3,500; Full service upgrade $3,000–$6,000; Full upgrade + service drop $4,000–$8,000; Smart panel $5,000–$8,000; 320A/400A service $8,000–$15,000 (all now qualitative 'costs more'); 'What you're paying for' line-item prices: 200A panel $500–$1,000; breakers $100–$300; meter socket $230–$500; service-entrance cable $300–$600; weatherhead/mast $200–$450; grounding $150–$450; permit/inspection $100–$300; utility coordination $0–$500+ (kept as qualitative list of what a quote covers); Labor-by-region table removed entirely: $/hr rates ($65–$90 to $130–$200/hr) and labor totals ($390–$900 to $780–$2,400) replaced by qualitative paragraph (urban coastal metros highest, rural South/Midwest lowest); Types-of-upgrades dollar ranges dropped on Types 2–5 (combos REMDB does not price); scope descriptions kept

### hvac-maintenance-cost  (15 price changes)

| Where | BEFORE | AFTER |
|---|---|---|
| Bold answer (lead) | about $75 to $150 (AC), $80 to $160 (gas furnace), $155 to $310/yr for both | no figures; qualitative (tracks local labor; heat pump/mini split cost more over a year) |
| Tune-up-by-system table, Central air conditioner | $75 to $150 per visit / $75 to $150 per year | One visit before cooling season / Lowest; a single short visit |
| Tune-up-by-system table, Gas furnace | $80 to $160 per visit / $80 to $160 per year | One visit before heating season / Low; close to an air conditioner |
| Tune-up-by-system table, AC and gas furnace | $75 to $160 each / $155 to $310 | Two visits, one per season / Two single visits combined |
| Tune-up-by-system table, Air-source heat pump | $100 to $175 / $200 to $350 (two visits) | Two visits, heating and cooling / Higher; checked twice a year |
| Tune-up-by-system table, Ductless mini split | $80 to $150 per head / $160 to $300 per head (two visits) | Two visits, each head adds work / Higher; scales with number of heads |
| Tune-up-by-system table, Boiler | $100 to $200 / $100 to $200 | One visit before heating season / Low to moderate |
| Tune-up-by-system table, Oil furnace | $150 to $250 / $150 to $250 | One visit before heating season / Moderate; more involved burner service |
| Tune-up-by-system table, Geothermal heat pump | $125 to $225 / $250 to $450 (two visits) | Two visits, heating and cooling / Highest; specialized ground-loop system |
| Savings-vs-tune-up paragraph | can approach the $75 to $150 cost of a single air-conditioner tune-up | can approach what a single air-conditioner tune-up costs |
| Service plans break-even paragraph | two separate tune-ups ... run about $155 to $310 a year combined | add up what two separate tune-ups would cost you locally (no figure) |
| Yearly maintenance budget | two tune-ups run about $155 to $310 a year combined; heat pump home closer to $200 to $350 a year | two tune-ups are the bulk of the recurring cost; heat pump home runs higher (no figures) |
| FAQ: How much does an HVAC tune-up cost? | Typically $75 to $150 (AC) and $80 to $160 (gas furnace) per visit | qualitative; tracks local labor, AC/furnace low end, heat pump/mini split more |
| FAQ: Is a $99 HVAC tune-up legit? (question + answer) | $99 ... sits inside the typical $75 to $150 air-conditioner range | question reworded to 'rock-bottom'; answer qualitative (a very low price can still buy a real tune-up) |
| FAQ: Why are heat pump tune-ups more expensive? | annual total of about $200 to $350 runs above a single tune-up | yearly total runs above a single tune-up (no figure) |

Removed (REMDB does not price; now qualitative cost drivers): $75 to $150 central air conditioner tune-up (per visit and per year); $80 to $160 gas furnace tune-up; $75 to $160 each for AC + furnace; $155 to $310 per year for AC + furnace combined; $100 to $175 per visit / $200 to $350 per year air-source heat pump; $80 to $150 per indoor head / $160 to $300 per head ductless mini split; $100 to $200 boiler; $150 to $250 oil furnace; $125 to $225 per visit / $250 to $450 per year geothermal heat pump; $99 example tune-up price; REMDB does not cover maintenance at all, so no REMDB figure replaces any of these; all tune-up pricing is now described qualitatively (labor-driven, varies by region and season).


### Surgical pages (handled directly, not via the drafting workflow)

**moisture-barrier-crawl-space** — title/meta only (the page already carried no dollar figures after FIX-29).
- Title: `Moisture Barrier for Crawl Space: Materials, Installation & 2026 Costs` → `Moisture Barrier for Crawl Space: Materials, Thickness and Installation`.
- Description: dropped "what it costs".

**smart-thermostat-savings** — added the REMDB installed price and recomputed payback (point 4).
- Payback section BEFORE: "payback is the installed price divided by that yearly saving" (no price stated).
- AFTER: "NREL's REMDB puts a smart thermostat's installed cost at about $350 at the mid estimate, in a low-to-high range of roughly $200 to $550, in 2023 dollars. At up to about $90 a year in savings, that is about $350 divided by $90, close to four years …" REMDB added to SourcesBox. The ENERGY STAR $900 and DOE 10%/$90 figures are unchanged (a)/(b).

**solar-panel-calculator** — losses/efficiency fix (point 5) + calculator constants (point 6).
- The calculator constant is `systemEfficiency = 85%` (= 15% system losses). Both the page bold answer and the component InfoTip said "14%"; the 6.8 kW / 17 panels / 10,549 kWh in the bold answer all derive from 85% (effective sun 5 × 0.85 = 4.25). BEFORE "about 14% system losses" → AFTER "about 15% system losses" (page); InfoTip "system losses of about 14%" → "system losses of about 15%, close to PVWatts' roughly 14% default".
- Battery price: `SolarPanelCalculator.tsx` DisclaimerBox BEFORE "Battery storage adds $10–$20k" → AFTER "Battery storage adds several thousand dollars" (unsourced price removed).

## Calculator price constants audited (point 6)

Only **solar-panel-calculator** embeds a calculator (`<CalcWrapper type="solar-panel" />` → `SolarPanelCalculator`); the other nine target pages only *link* to calculators, so they have no embedded price constants. `SolarPanelCalculator` constants:
- `pricePerWatt` default `''` (empty) — the user's quote; no default price. Unchanged (correct).
- `federalCreditPct` default `0` — not a price (§25D ended for 2026). Unchanged.
- DisclaimerBox battery figure `$10–$20k` — unsourced, not an input default; made qualitative (change above). No REMDB battery figure exists.

---

## Sitewide (c) re-classification — all 128 live pages

Every dollar figure on the 66 live pages that carry a `$` was independently classified (one agent per page) against Marko's standing rule: **(a)** primary-sourced or registry figure (EIA, IRS 25C/25D, HEAR/DOE, **REMDB**, DOE/ENERGY STAR/EPA facts); **(b)** arithmetic from sourced/registry/assumed-rate inputs with steps shown, OR an explicitly-labeled example/assumption feeding a calculator; **(c)** an unsourced market/price estimate presented as a real figure. The remaining 62 live pages carry no `$` (trivially c = 0).

**Result: c = 0 on every page.**
| Page | (a) sourced | (b) arithmetic/labeled | (c) unsourced |
|---|--:|--:|--:|
| kwh-cost-calculator | 126 | 77 | 0 |
| hvac-cost-by-state | 55 | 57 | 0 |
| electric-water-heating-cost | 19 | 61 | 0 |
| heating-cost-calculator | 7 | 72 | 0 |
| electric-heater-running-cost | 18 | 44 | 0 |
| pellet-stove-cost-to-run | 4 | 56 | 0 |
| tankless-water-heater-cost | 42 | 15 | 0 |
| central-ac-cost-to-install | 33 | 22 | 0 |
| mini-split-installation-cost | 50 | 0 | 0 |
| gas-vs-electric-heating-cost | 5 | 41 | 0 |
| heat-pump-cost-to-install | 41 | 1 | 0 |
| seer2-comparison-calculator | 6 | 35 | 0 |
| dehumidifier-running-cost | 9 | 30 | 0 |
| furnace-installation-cost | 29 | 10 | 0 |
| portable-ac-electricity-cost | 3 | 32 | 0 |
| hvac-tax-credits-2026 | 32 | 1 | 0 |
| heat-pump-water-heater-guide | 6 | 23 | 0 |
| seer2-rating-explained | 0 | 28 | 0 |
| heat-pump-electricity-usage | 8 | 17 | 0 |
| water-heater-guide | 2 | 23 | 0 |
| gas-furnace-wattage | 10 | 14 | 0 |
| afue-rating-explained | 1 | 22 | 0 |
| hspf-rating-explained | 6 | 17 | 0 |
| furnace-vs-heat-pump | 4 | 15 | 0 |
| mini-split-electricity-usage | 3 | 16 | 0 |
| ac-tonnage-calculator | 2 | 16 | 0 |
| radiant-floor-heating-pros-cons | 7 | 11 | 0 |
| electrical-panel-upgrade-cost | 16 | 0 | 0 |
| dehumidifier-and-ac-same-time | 5 | 10 | 0 |
| heat-pump-tax-credits-2026 | 11 | 4 | 0 |
| portable-air-conditioners | 4 | 9 | 0 |
| space-heater-guide | 5 | 8 | 0 |
| heat-pump-guide | 6 | 6 | 0 |
| specific-heat-capacity-calculator | 5 | 7 | 0 |
| tankless-water-heater-propane-usage | 0 | 12 | 0 |
| eer-chart-for-ac-units | 2 | 9 | 0 |
| pilot-light-gas-usage | 0 | 10 | 0 |
| dehumidifier-guide | 2 | 7 | 0 |
| generator-guide | 1 | 8 | 0 |
| heat-pump-in-cold-weather | 1 | 8 | 0 |
| window-air-conditioners | 1 | 8 | 0 |
| boiler-vs-furnace | 0 | 8 | 0 |
| central-air-conditioner-guide | 2 | 6 | 0 |
| coefficient-of-performance | 1 | 7 | 0 |
| evaporative-cooler-vs-ac | 2 | 6 | 0 |
| furnace-sizing-calculator | 0 | 7 | 0 |
| hvac-energy-saving-tips | 1 | 6 | 0 |
| water-heater-sizing-calculator | 1 | 6 | 0 |
| portable-vs-window-ac | 2 | 4 | 0 |
| duct-leakage-testing | 0 | 5 | 0 |
| hot-water-recirculating-pump | 2 | 3 | 0 |
| smart-thermostat-savings | 4 | 1 | 0 |
| solar-panel-calculator | 1 | 4 | 0 |
| air-source-vs-ground-source-heat-pump | 1 | 3 | 0 |
| heat-pump-size-calculator | 1 | 3 | 0 |
| hvac-maintenance-cost | 1 | 3 | 0 |
| thermostat-temperature-winter | 0 | 4 | 0 |
| propane-generator-usage-per-hour | 0 | 3 | 0 |
| electrical-wiring-guide | 2 | 0 | 0 |
| how-to-read-electric-meter | 1 | 1 | 0 |
| insulation-r-value-guide | 0 | 2 | 0 |
| mini-split-air-conditioners | 2 | 0 | 0 |
| water-heater-wire-size | 2 | 0 | 0 |
| how-long-does-water-heater-last | 1 | 0 | 0 |
| power-consumption-calculator | 1 | 0 | 0 |
| what-size-tankless-water-heater | 1 | 0 | 0 |
| **TOTAL (66 $-pages)** | **616** | **944** | **0** |


---

## Verification

| Check | Result |
|---|---|
| `npx tsc --noEmit` | clean (exit 0) |
| svg-lint | **59 / 59 OK** |
| content-audit gate metrics | all **0** (em_dashes, overclaims, long_paragraphs, old/new tells, links_broken, sourcesbox_no_url, social_proof, recompute_fail, rates_offrate, …) |
| `node scripts/audit.mjs --skip-build` | **0 findings — CLEAN** |
| `next build` (NODE_OPTIONS=--max-old-space-size=3072) | **exit 0, 279/279 static pages** |
| full `node scripts/audit.mjs` incl. 18 static routes (built HTML) | **0 findings — CLEAN** |

(`attributions` = 230 and `precision_stats` = 911 in content-audit are report-only inventories, not gate violations; both are expected to be non-zero.)

Every dollar figure now on the 7 cost pages was cross-checked by hand against the REMDB figure tables: all trace to a REMDB figure, a spec recompute, or a kept (a)/(b) figure.

## Recompute notes (payback)

- **central-ac:** REMDB 3-ton 14→16 SEER premium at mid = $6,900 − $5,150 = **about $1,750**; table saving 13.4→15.2 SEER2 = $86/yr (1,500 h) to $143/yr (2,500 h) → payback **about 12 to 20 years** (was "$1,000 → 8 to 14 years").
- **furnace:** REMDB 80k-BTU 80→95% premium at mid = $4,050 − $3,400 = **about $650**; saving $155/yr → equipment-only payback **about 4 years**, longer once PVC venting + condensate are counted (was "$1,500 → 9.7 years").
- **tankless:** REMDB condensing gas tankless mid $2,450 vs gas tank mid $2,050 = premium **about $400**; saving $127/yr → payback **about 3 years**, longer with gas-line/venting conversion; 20-yr return $127 × 20 = $2,540 (was "$1,500 → 12 years").
- **smart thermostat:** REMDB installed mid **$350** ($200–$550); saving up to $90/yr → **close to 4 years**.

## Flags / judgment calls for Marko

1. **"2026 Prices/Pricing" in titles now sit against 2023-dollar REMDB figures** (central-ac, mini-split, furnace, tankless, electrical-panel). Kept per the "keep titles with Bing traffic" rule; each body states the 2023-dollar basis plainly. Trim the year tags if you prefer.
2. **Heat-pump headline jumped.** REMDB's ducted 3-ton figure (about $7,450–$19,250, mid $13,350) is well above the old market estimate ($5,800–$10,000). NREL derived heat-pump costs largely from California/Massachusetts incentive-program data (now disclosed on-page); they run high relative to some markets. This is the biggest directional change in the batch.
3. **central-ac payback lengthened** (12–20 yr vs the old 8–14 yr) purely because the REMDB efficiency premium ($1,750) is larger than the old invented $1,000. Honest, but worth a look.
4. **hvac-maintenance "$99 tune-up" FAQ heading** was changed to "rock-bottom" to drop the unsourced $99. That removes the "$99 tune-up" search-intent keyword; restore a labeled version if you want the query, but note $99 is a market example, not a sourced figure.
5. **Removed an unsourced percentage** on heat-pump ("labor typically runs 40 to 55% of the total") when the labor table became qualitative — the standing rule bars unsourced percentages too. Confirm acceptable.
6. **Labeled example/assumption inputs stay (classified b, not c).** The $150 bill and $3.00/watt on solar-panel-calculator, and the example pellet/oil/propane prices on pellet-stove-cost-to-run and heating-cost-calculator, are explicitly labeled examples feeding a calculator, so they are (b) under the FIX-29 policy, not (c). This is the judgment that underpins "sitewide c = 0"; veto any you want treated as (c).

## Out-of-scope observations (not changed; prices only this pass)

- **Unsourced time counts** left in place: electrical-panel "6 to 12 hours" / "1 to 4 weeks" and furnace line-71 bare "$1.35 per therm" (line 75 labels it "assumed"). COST-1 scoped dollar prices; these are not dollar-market figures. Candidates for a future time/count sweep.
- Not a gate concern; flagged for completeness.
