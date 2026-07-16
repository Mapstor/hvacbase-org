# BATCH C.1 — Certifying-grep survivors (PREVIEW, NO EDITS APPLIED)

**Run date:** 2026-07-13
**Mode:** PREVIEW ONLY. No files modified, no dates bumped, no commits.
**Tree state at start of C.1:** working tree carries the 11 edits from Batch C (Charts 1+2 delete, cost-guides 7 rewrites, MrCool prose 168/table 170-176/bullet 265). Q-1 (Chart 3 disposition) and Q-2 (MrCool line 278 FAQ) are **still pending your confirm** — they were surfaced last turn and I stopped for ruling. Neither has been applied. C.1 accumulates into this same tree once you rule on both Q items and any C.1 items you approve; all will commit together.
**Governing rules (same as Batch C):** never invent citations, never renumber, never rebind to a plausible-but-different source; attribution shells drop with the numbers they attributed; class-(iii) items park in a VERIFY appendix for user-side lookup.

---

## STEP 1 — Re-certify with widened pattern set

**Patterns re-run against the whole repo (case-insensitive):**

- Attribution shells: `industry data`, `studies show`, `research shows/suggests/indicates`, `based on (warranty|contractor|consumer|industry|reports|studies|surveys)`, `reports suggest`, `data suggests`, `surveys show`, `polls suggest`, `sources indicate`, `according to (industry|contractor|installer|surveys)`, `contractor reports (suggest|indicate)`, `widely reported`, `commonly reported`, `analysts/experts estimate`, `estimated at` (with proximity check)
- Card-field patterns: `savings:` / `consideration:` / `amount:` / `note:` / `impact:` / `benefit:` fields whose string contains a digit
- Hero/CTA copy: `save (up to)? N%`, `reduce ... by N%`, `cut N%`, `up to N% (savings|off|reduction|less)`, `slash N%`
- Symptom-table row percentages: `"Common (N%)"` / `"Frequent (N%)"` / `"Rare (N%)"` / `"Very Common (N%)"` / etc.
- Bare in-prose numeric ranges: `reduce(s|d)? efficiency|costs|bills|energy by N-N%`, `saves? N-N%`, `N-N% (savings|reduction|efficiency)`

**Grep results — hit counts and class exhaustion status:**

| Grep bin | Total hits | Signal (same class) | Noise (legitimate references) |
| --- | --- | --- | --- |
| A. Attribution shells | **34** | 6 confirmed same-class survivors of the C-14 attribution pattern | ~28 are legitimate references to CDC / American Lung Association / ASHRAE / clinical peer-reviewed literature / methodology footnotes (e.g., `*Estimated at $0.17/kWh, 8 hrs/day` in dehumidifier tables) |
| B. Card fields with digits (TSX) | **34** | **23 same-class survivors** (16 new on `app/how-to/page.tsx`, 7 known on `app/cost-guides/page.tsx`) | 11 are calculator `note:` fields describing legit options (e.g., "40 gal/hr recovery", "R-32 refrigerant"), not stat claims |
| C. Hero/CTA copy | 7 | 2 known + 4 same-class on `how-to/page.tsx` + 1 CTA on cost-guides | overlap with B |
| D. Symptom-table `(N%)` rows | **2** | 2 known + **5 additional rows in the same table** (whole `furnace-blowing-cold-air.mdx` `<ComparisonTable>` is a constructed sum-to-100 distribution) | 0 |
| E. Bare in-prose `N-N%` ranges (efficiency/savings) | 40+ | **~30 same-class bare stat claims across the MDX cluster** (`ac-troubleshooting-guide`, `ac-not-cooling`, `best-hvac-air-filters`, `window-ac-installation-guide`, `thermostat-temperature-winter`, `dehumidifier-electricity-usage`, `smart-thermostat-savings`, `mold-prevention`, `ideal-indoor-humidity`, `heat-pump-water-heater-guide`, plus more) | many are HEPA/MERV definitions or manufacturer-published wattage ratios that are defensible from ASHRAE 52.2 / manufacturer spec / DOE Energy Saver directly; separating requires per-item read |

### **Class exhaustion status: NOT EXHAUSTED.**

The 14 items in your known list caught the **highest-density** same-class instances but they are not the only ones. Widening the pattern set surfaces **at minimum ~30 additional survivors** (Tier 1) that match the Batch C rules exactly, plus **an unbounded tail (~30+, likely more)** of bare in-prose efficiency-reduction / cost-savings percentage claims across ~15 different MDX articles (Tier 2). Exhausting the class properly requires a per-article citation-proximity read, which is significantly wider work than the 14 you scoped for C.1.

**Recommendation:** rule scope explicitly. Options for C.1 scope:
- **Scope A — Strict 14 only** (as your message specified): fixes 14 items, class not exhausted.
- **Scope B — 14 + high-confidence Tier 1 (~30 more)**: fixes ~44 items, addresses the same syntactic patterns (attribution shells, card fields, symptom-table rows) at the same confidence level as the 14. Class largely exhausted at the syntactic level; the diffuse in-prose tail (Tier 2) remains.
- **Scope C — 14 + Tier 1 + Tier 2 sweep**: full-corpus per-article citation-proximity read. Multi-hour effort. Class fully exhausted.

I've prepared the STEP 2 per-item catalog assuming **Scope B** since that's the smallest scope that gives you an honest "syntactically exhausted" answer. If you want Scope A, use only the 14-row table; if you want Scope C, tell me and I'll go article-by-article.

---

## STEP 2 — Per-item context (14 known + line 57 adjacent-row + 6 Tier-1 categories)

**Legend:** class (i) = constructed distribution / fabricated data · class (iii) = plausibly real, park for user verify · schema-emit? = the item renders into JSON-LD or microdata that reaches Google's structured index

### C.1.a — MrCool review (2 items, 1 schema-emitting)

| file:line | verbatim BEFORE | context | citation? | schema-emit? | class | proposed AFTER | rule |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `content/mini-split-air-conditioners/mrcool-diy-mini-split-review.mdx:150` | `Industry data suggests MrCool units have a higher refrigerant leak rate (8–12% over 10 years) compared to professionally installed brazed systems (2–5%). A refrigerant leak means reduced cooling/heating performance, potential compressor damage, and a repair bill of $200–$600.` | Prose paragraph inside `### 3. Quick-Connect Leak Risk` section (lines 141-151). Preceded by a bullet list of 4 leak-cause modes ("Improper seating", "O-ring degradation", "Vibration-induced loosening", "UV degradation"). No inline citation. Follows the pattern of the C1 line-168 sentence structure exactly (attribution shell + 2 fabricated %). | **n** — "Industry data suggests" is an attribution shell, not a citation | n | **(i)** attribution-shelled fabrication | `MrCool's quick-connect fittings have more potential leak points than the brazed copper connections used in professional installations. A refrigerant leak means reduced cooling/heating performance, potential compressor damage, and a repair bill of $200–$600.` | Attribution-shell rule: drop shell, strip numbers, keep directional claim + verifiable repair cost |
| `content/mini-split-air-conditioners/mrcool-diy-mini-split-review.mdx:296-298` | Q (line 297): `question: "Are MrCool quick-connect line sets reliable?",` A (line 298): `answer: "They're adequate but not as reliable as brazed copper connections used in professional installations. Quick-connect fittings have more potential failure points: O-ring seals can degrade, fittings can loosen from vibration, and improper seating during installation can cause slow leaks. Estimated refrigerant leak rate is 8–12% over 10 years vs 2–5% for brazed connections. To maximize reliability, ensure fittings are fully seated, protect outdoor connections from UV, and inspect connections annually."` | Inline `<FAQ items={[…]}>` component array. Renders via `components/ui/FAQ.tsx` into `FAQPage` JSON-LD (same schema mechanism as line 278). Question is about reliability, not leak rate. | **n** — "Estimated refrigerant leak rate is 8–12% over 10 years" is a bare stat with no source | **y** — FAQ emits into JSON-LD | **(i)** | `answer: "They're adequate but not as reliable as brazed copper connections used in professional installations. Quick-connect fittings have more potential failure points: O-ring seals can degrade, fittings can loosen from vibration, and improper seating during installation can cause slow leaks. To maximize reliability, ensure fittings are fully seated, protect outdoor connections from UV, and inspect connections annually."` | Drop the sentence with 8-12%/2-5%. Question stays coherent (asks about reliability; answer gives reliability guidance). |

**Question-coherence check for 298:** the FAQ question asks "Are MrCool quick-connect line sets reliable?" — the AFTER answer directly addresses reliability (adequate but not equal to brazed; failure modes; how to maximize reliability). **No question rewrite needed.**

**Commit constraint:** if line 150 + line 298 are approved, they ship in the SAME commit as the already-in-tree C1/C2/C3 edits + Q-2 (line 278). All schema-emitting mrcool changes atomic.

### C.1.b — Cost-guides page (9 items — 7 known + 2 hero/CTA)

| file:line | verbatim BEFORE | context | citation? | schema-emit? | class | proposed AFTER | rule |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `app/cost-guides/page.tsx:26` | `savings: 'Save up to 20% off-season'` | Card meta on `Central AC Installation Cost` card (`priceRange: '$3,500 - $7,500'`) | n | n | (i) | `savings: 'Off-season pricing often available'` OR remove `savings` field | Card-field rule (mirror C-batch B1-B3) |
| `app/cost-guides/page.tsx:33` | `savings: 'Rebates up to $1,500'` | Card meta on `Furnace Installation Cost` card | n | n | (iii) — federal rebate levels vary; $1,500 is not canonical | `savings: 'Federal, state, and utility rebates available'` OR remove | Class-(iii) park: real rebates exist but $1,500 is not defensible without a source; strip the number |
| `app/cost-guides/page.tsx:47` | `savings: 'DIY saves 30-40%'` | Card meta on `Mini Split Installation Cost` card | n | n | (i) | `savings: 'Significant labor savings for DIY-eligible installs'` OR remove | Card-field rule |
| `app/cost-guides/page.tsx:54` | `savings: 'Energy savings 20-30%'` | Card meta on `Boiler Installation Cost` card | n | n | (i) | `savings: 'Higher-efficiency options available'` OR remove | Card-field rule |
| `app/cost-guides/page.tsx:61` | `savings: 'Improves efficiency 20%'` | Card meta on `Ductwork Installation Cost` card | n | n | (i) | `savings: 'Reduces air leakage and improves comfort'` OR remove | Card-field rule |
| `app/cost-guides/page.tsx:129` | `savings: 'Save 15-20% on repairs'` | Card meta on `Service Contract Comparison` card | n | n | (i) | `savings: 'Discounted repair pricing for members'` OR remove | Card-field rule |
| `app/cost-guides/page.tsx:163` | `consideration: 'Smart upgrade saves 20%'` | Card meta on `Thermostat Replacement Cost` card (uses `consideration:` field not `savings:`) | n | n | (i) | `consideration: 'Smart features enable easier scheduling'` OR remove | Card-field rule |
| `app/cost-guides/page.tsx:473` | `<p className="text-gray-600 max-w-2xl mx-auto">Smart strategies to reduce your HVAC costs by 20-40%</p>` | Money-Saving Tips section intro copy (hero-adjacent) | n | n | (i) | `<p className="text-gray-600 max-w-2xl mx-auto">Smart strategies to reduce your HVAC costs</p>` | Hero-copy rule: strip range, keep actionable verb |
| `app/cost-guides/page.tsx:518` | `<p className="text-xl text-green-100 mb-8">Compare quotes from qualified contractors and save up to 40%</p>` | Free Estimate CTA section (footer-adjacent) | n | n | (i) | `<p className="text-xl text-green-100 mb-8">Compare quotes from qualified contractors and save on installation</p>` | Hero-copy rule |

### C.1.c — Furnace-blowing-cold-air comparison table (7 rows — 1 known, 6 additional)

The `<ComparisonTable>` at lines 50-62 is a constructed sum-to-100 distribution ( 30+20+15+15+10+5+5 = 100 ). The user's known 14 only listed line 56; adjacent rows 54, 55, 57, 58, 59, 60 are the same class.

| file:line | verbatim BEFORE (`"How Common"` cell) | context | citation? | schema-emit? | class | proposed AFTER | rule |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `content/furnaces-heating/furnace-blowing-cold-air.mdx:54` | `"Very common (30%)"` | Row 1 of the `<ComparisonTable>` — Thermostat fan set to ON | n | n | (i) | `"Very common"` | Symptom-table rule: strip `(N%)`, keep qualitative label |
| `content/furnaces-heating/furnace-blowing-cold-air.mdx:55` | `"Very common (20%)"` | Row 2 — Clogged air filter | n | n | (i) | `"Very common"` | Same |
| `content/furnaces-heating/furnace-blowing-cold-air.mdx:56` | `"Common (15%)"` | Row 3 — Pilot light/ignition failure (**known**) | n | n | (i) | `"Common"` | Same |
| `content/furnaces-heating/furnace-blowing-cold-air.mdx:57` | `"Common (15%)"` | Row 4 — Dirty flame sensor | n | n | (i) | `"Common"` | Same |
| `content/furnaces-heating/furnace-blowing-cold-air.mdx:58` | `"Moderate (10%)"` | Row 5 — Overheating / high-limit trip | n | n | (i) | `"Moderate"` | Same |
| `content/furnaces-heating/furnace-blowing-cold-air.mdx:59` | `"Less common (5%)"` | Row 6 — Gas supply issue | n | n | (i) | `"Less common"` | Same |
| `content/furnaces-heating/furnace-blowing-cold-air.mdx:60` | `"Less common (5%)"` | Row 7 — Ductwork leak or disconnect | n | n | (i) | `"Less common"` | Same |

**Efficient apply:** single Edit replacing the whole `rows={[…]}` array. See STEP 4 diff. Table's `"How Common"` column becomes purely qualitative — no implied distribution.

### C.1.d — hvac-energy-saving-tips.mdx (2 items — both known)

**Citation-proximity check applied per your rule.**

| file:line | verbatim BEFORE | context | citation? | schema-emit? | class | proposed AFTER | rule |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `content/energy-efficiency/hvac-energy-saving-tips.mdx:98` | `- **Dirty filter**: Reduces efficiency by 15-25%` | Bulleted advice list under `### Tip 2: Replace Air Filters Monthly` (lines 90-100). No inline citation; the surrounding lines are `**Implementation Time:** 10 minutes`, `**Annual Savings:** $100-300` (also bare), and 3 other bullets (all qualitative except this one). **DOE Energy Saver states dirty filters can reduce efficiency by "up to 15%"** — the site's 15-25% range extends beyond DOE's figure without saying so. | **n** — DOE Energy Saver is close in spirit but not cited in-text, and the range is broader than DOE's | n | **(i)** bare, no proximity source | `- **Dirty filter**: Reduces airflow and forces the system to work harder` | If Marko wants to use DOE's "up to 15%" figure with citation, that's a class-(iii) verify path (see appendix); default disposition strips |
| `content/energy-efficiency/hvac-energy-saving-tips.mdx:570` | `Change basic filters monthly, pleated filters every 60-90 days. Dirty filters reduce efficiency by 15-25% and can increase energy costs by $100-300 annually. Check monthly and replace when you can't see light through the filter.` | Inside FAQ answer body (line 567-572 forms one `<div itemScope itemType="https://schema.org/Question">`). **Emits into microdata** as `schema:Answer.text`. Google indexes this as a QA structured-data snippet. | n | **y** — microdata FAQ emits into structured index | (i) | `Change basic filters monthly, pleated filters every 60-90 days. Dirty filters reduce airflow and increase energy costs. Check monthly and replace when you can't see light through the filter.` | Same rule as 98; the "$100-300 annually" figure also strips since it lacks source. Question stays as-is ("How often should I change my air filter to save energy?"). |

**Framing (what does the 15-25% apply to):** "efficiency" here means HVAC system efficiency loss due to airflow restriction. Real published sources use different magnitudes: DOE says "up to 15%", ASHRAE 52.2 doesn't quantify, ENERGY STAR doesn't publish a specific range. The 15-25% figure appears to be a stack of two claims (DOE's 15% + a higher upper bound from an unspecified source). Class-(i) unless Marko finds a source that cites 25%.

---

## STEP 3 — Tier-1 new same-class survivors (surfaced by widening the grep)

**Not in the user's known 14. Same syntactic and evidentiary class. Ruling requested on inclusion.**

### C.1.e — `app/how-to/page.tsx` — 16 card-field savings claims

The whole how-to page uses the same card metadata pattern as cost-guides. Every `savings:` field with a digit is class-(i)/(iii) bare stat with no citation. Same disposition rule as cost-guides B1-B7.

| Line | Card | Verbatim BEFORE | Proposed AFTER (qualitative) | Alt (drop field) |
| --- | --- | --- | --- | --- |
| 27 | How to Change Your HVAC Filter | `savings: 'Save $50-100/year'` | `savings: 'Extends system life, protects efficiency'` | remove |
| 35 | How to Clean AC Coils | `savings: 'Save $100-200/year'` | `savings: 'Restores cooling capacity'` | remove |
| 66 | (Basic Thermostat Programming) | `savings: 'Save 20% on energy'` | `savings: 'Aligns runtime with occupancy'` | remove |
| 82 | (Smart Thermostat Setup) | `savings: 'Save 10% on bills'` | `savings: 'Enables geofencing and remote control'` | remove |
| 105 | (Refrigerant Line Insulation) | `savings: 'Save $150-300'` | `savings: 'Reduces heat loss on line sets'` | remove |
| 113 | (Duct Sealing DIY) | `savings: 'Save $150-400'` | `savings: 'Reduces conditioned-air loss to attic/crawlspace'` | remove |
| 121 | (Weatherstripping) | `savings: 'Save $200-500'` | `savings: 'Reduces infiltration around doors and windows'` | remove |
| 129 | (Attic Insulation Top-up) | `savings: 'Save $100-300'` | `savings: 'Reduces winter heat loss and summer gain'` | remove |
| 144 | (Ceiling Fan Direction Change) | `savings: 'Save 20% on energy'` | `savings: 'Improves comfort at lower thermostat setpoints'` | remove |
| 152 | (Radiant Barrier Install) | `savings: 'Save 5-10% energy'` | `savings: 'Reduces attic radiant heat load'` | remove |
| 160 | (Solar Screen Install) | `savings: 'Save 30% on bills'` | `savings: 'Reduces solar heat gain through windows'` | remove |
| 168 | (Window Film Install) | `savings: 'Save 10-15%'` | `savings: 'Reduces solar gain and glare'` | remove |
| 222 | (Furnace Replacement) | `savings: 'Save $1,500-3,000'` | `savings: 'Higher efficiency reduces annual fuel costs'` | remove |
| 230 | (Heat Pump Replacement) | `savings: 'Save $150-350'` | `savings: 'More efficient than resistance heating'` | remove |
| 238 | (AC Replacement) | `savings: 'Save $200-400'` | `savings: 'Newer SEER2 ratings improve cooling efficiency'` | remove |
| 246 | (Ductwork Rework) | `savings: 'Save $300-500'` | `savings: 'Improves airflow and comfort balance'` | remove |

### C.1.f — Cost-guides page — 2 more card `amount:` fields

| Line | Card | Verbatim BEFORE | Proposed AFTER | Note |
| --- | --- | --- | --- | --- |
| 215 | Federal Tax Credits | `amount: 'Up to $2,000'` | `amount: 'Program-dependent'` OR remove card entirely | **CROSS-BATCH-D CONCERN** — this card also has stale eligibility copy: "Energy Star certified" as requirement, "Heat pumps / Central AC / Boilers / Furnaces" as eligible list. Under OBBBA the entire 25C credit expired for 2026 installs. Batch D should look at this card independent of C.1's number-stripping. |
| 222 | Utility Rebates by State | `amount: '$50 - $2,500'` | `amount: 'Varies by state and utility'` OR remove field | Range is bare; state rebate stacks are highly variable |

### C.1.g — Attribution-shell FAQ answer on tankless article (schema-emitting)

| file:line | verbatim BEFORE | context | schema-emit? | class | proposed AFTER |
| --- | --- | --- | --- | --- | --- |
| `content/tankless-water-heaters/best-tankless-water-heaters.mdx:242-243` | Q: `question: "What is the most reliable tankless water heater brand?",` A: `answer: "Based on warranty claims data and installer surveys, Rinnai and Navien are the two most reliable brands. Rinnai has the longest track record in the U.S. market (since 1991) and the widest authorized service network. Navien's NPE-2 series has shown strong early reliability and offers the longest heat exchanger warranty at 15 years. Noritz and Stiebel Eltron round out the top tier."` | Inline `<FAQ questions={[…]}>` array. Question asks about reliability. Answer's substance (Rinnai since 1991, Navien 15-year warranty, top-tier list) is verifiable without the shell. Same attribution-shell pattern as MrCool 168. | **y** | (i) | `answer: "Rinnai and Navien are the two most reliable tankless water heater brands. Rinnai has the longest track record in the U.S. market (since 1991) and the widest authorized service network. Navien's NPE-2 series has shown strong early reliability and offers the longest heat exchanger warranty at 15 years. Noritz and Stiebel Eltron round out the top tier."` |

**Commit constraint:** if approved, this ships alongside the mrcool 150/298/278 (all schema-emitting FAQ answers) in the same commit as C-batch 168/265.

### C.1.h — Two more attribution-shelled quantitative claims (MDX FAQ answers, schema-emitting)

| file:line | verbatim BEFORE | context | schema-emit? | class | proposed AFTER |
| --- | --- | --- | --- | --- | --- |
| `content/smart-thermostats/programmable-vs-smart-thermostat.mdx:170` | `Smart thermostats provide detailed reports showing how many hours your HVAC ran, what triggered it, and how your usage compares to previous periods. This awareness alone changes behavior. Multiple studies show that providing real-time energy feedback reduces consumption by **2–5%** independently of any automated savings — people naturally conserve more when they can see the numbers.` | Prose paragraph, not FAQ | n | (iii) — real-time-feedback effect on consumption is a well-studied topic (Fischer 2008, Faruqui 2010) but "2-5%" is a specific figure not tied here to a citation | `Smart thermostats provide detailed reports showing how many hours your HVAC ran, what triggered it, and how your usage compares to previous periods. Real-time energy feedback tends to reduce consumption on its own — people naturally conserve more when they can see the numbers.` **OR** class-(iii) verify to keep the 2-5% figure with a cite (see VERIFY appendix) |
| `content/smart-thermostats/smart-thermostat-savings.mdx:262` | `**Myth: "Smart thermostats don't save much if you already program your thermostat."** Even well-programmed thermostats miss savings from occupancy detection, geofencing, and weather compensation. Studies show smart thermostats save 5–10% more than correctly-programmed programmable thermostats.` | Prose paragraph (myth-buster style) | n | (iii) — ENERGY STAR published smart thermostat savings ranges; specific "5-10% more than programmable" is not verifiable without a link | Prose ends with: `...miss savings from occupancy detection, geofencing, and weather compensation.` (drop the "Studies show" sentence) **OR** class-(iii) verify path |

### C.1.i — Two more attribution-shell claims (MDX FAQ answers, schema-emitting)

| file:line | verbatim BEFORE | context | schema-emit? | class | proposed AFTER |
| --- | --- | --- | --- | --- | --- |
| `content/dehumidifiers/ideal-indoor-humidity-level.mdx:275` | `answer: "Dust mites cannot survive below approximately 50% RH. At 40% RH, mite populations decline sharply. Studies show that maintaining indoor humidity at 45% or below reduces dust mite allergen concentrations by 80-90% over several months. This is one of the most effective non-chemical dust mite control strategies available."` | FAQ answer, schema-emitting | y | (iii) — Custovic et al. and other dust-mite research does report >90% allergen reduction at low RH; the 80-90% band is broadly defensible with citation | `answer: "Dust mites cannot survive below approximately 50% RH. At 40% RH, mite populations decline sharply, and maintained low humidity is one of the most effective non-chemical dust mite control strategies available."` (drop the "Studies show ... 80-90%" sentence) **OR** class-(iii) verify path |
| `content/mold-prevention/moisture-barrier-crawl-space.mdx:364` | `answer: "Yes, crawl space encapsulation reduces radon entry significantly because the sealed vapor barrier blocks the primary pathway for radon gas to enter from the soil. Studies show that encapsulation alone can reduce radon levels by 30–50%. For homes with elevated radon (above 4 pCi/L), encapsulation can be combined with a sub-membrane depressurization system — essentially a radon mitigation pipe installed under the vapor barrier that vents radon gas to the exterior. This combined approach typically reduces radon to well below 2 pCi/L."` | FAQ answer, schema-emitting | y | (iii) — EPA radon mitigation guidance discusses encapsulation reductions; "30-50%" is plausible but no citation in-text | `answer: "Yes, crawl space encapsulation reduces radon entry because the sealed vapor barrier blocks the primary pathway for radon gas to enter from the soil. For homes with elevated radon (above 4 pCi/L), encapsulation can be combined with a sub-membrane depressurization system — essentially a radon mitigation pipe installed under the vapor barrier that vents radon gas to the exterior. This combined approach typically reduces radon to well below 2 pCi/L."` **OR** class-(iii) verify path |

---

## Tier 2 — bare in-prose N-N% claims across MDX (class NOT exhausted)

**Sample only — NOT dispositioned in this preview.** Same class of bare stat claim, spread across ~15 MDX articles. Ruling requested on whether C.1 sweeps these too (Scope C) or leaves for a later batch.

Representative locations (grep sample, not full list):

- `content/air-conditioners/ac-troubleshooting-guide.mdx:458-461` — 4 consecutive bullet stats: "Dirty filters reduce efficiency by 15%", "Dirty coils reduce efficiency by 30%", "Low refrigerant reduces efficiency by 20%", "Duct leaks waste 20-30% of energy"
- `content/air-conditioners/ac-troubleshooting-guide.mdx:478` — "Every degree higher saves 6-8% on cooling costs. Setting at 78°F instead of 75°F can reduce cooling bill by $20-40 per month"
- `content/air-conditioners/ac-not-cooling.mdx:137,363,569` — 3 efficiency-reduction claims (25%, 30%+, 20-30%)
- `content/air-quality/best-hvac-air-filters.mdx:275` — "Backward installation reduces efficiency by 40-60%"
- `content/air-quality/best-hvac-air-filters.mdx:360` — "10-15% savings on bulk orders"
- `content/air-conditioners/window-ac-installation-guide.mdx:73,231` — "reduces efficiency by 5-10% (shaded window)" / "reducing efficiency by 10-20% (unsealed side panels)"
- `content/air-conditioners/window-air-conditioners.mdx:317` — "Dirty filters reduce efficiency by 5–15%"
- `content/air-conditioners/most-energy-efficient-window-acs.mdx:226` — "clogged filter can reduce efficiency by 5-15%"
- `content/air-conditioners/window-ac-with-heater.mdx:137` — "save 5-10% on heating costs"
- `content/furnaces-heating/thermostat-temperature-winter.mdx:207,211` — "1-3% of your heating bill per degree" / "72°F costs about 8-12% more"
- `content/dehumidifiers/dehumidifier-electricity-usage.mdx:234,242` — "ENERGY STAR 15-30% more efficient" / "3-5% of household electric bill"
- `content/dehumidifiers/dehumidifier-running-cost.mdx:234` — "5-10% of household's total electricity cost"
- `content/air-quality/best-air-curtains.mdx:38,135,182,206` — "70-80% of temperature differential", "30% during peak service hours", "30-70% reduction in HVAC energy loss", "70-80% of temperature differential"
- `content/dehumidifiers/dehumidifier-guide.mdx:283` — "AC runtime dropped by approximately 20%. Annual energy savings estimated at $180–$260" (worked-example, mildly hedged)
- `content/water-heaters/heat-pump-water-heater-guide.mdx:312` — "estimated at 10–20% of the water heating savings"

Estimated total: **30-50 additional Tier-2 items** across the corpus, each requiring per-item citation-proximity read to decide (i) vs (iii). Multi-hour effort. Not attempted in this preview.

---

## VERIFY appendix — class-(iii) items parked for user-side lookup

If any of these can be tied to a real published source, they can survive with a citation added rather than being stripped. **Do NOT reintroduce these numbers without a specific URL + author + year.**

1. **hvac-energy-saving-tips.mdx:98,570 — "Dirty filter reduces efficiency by 15-25%".** DOE Energy Saver's "Maintaining Your Air Conditioner" page states "up to 15%". If Marko is comfortable citing DOE for a "up to 15%" figure (narrower than the site's 15-25%), we can renumber to 15% + link. If not, strip.
2. **cost-guides.tsx:33 — "Rebates up to $1,500" (Furnace Installation Cost card).** State-utility rebate levels vary widely; $1,500 could be an average from a specific database (DSIRE, ENERGY STAR). Verify or drop.
3. **cost-guides.tsx:215 — "Amount: Up to $2,000" (Federal Tax Credits card).** Under OBBBA (2025-07-04) 25C was terminated for 2026 installs. The whole card is stale — this is a Batch D concern, not just a Batch C.1 number-strip.
4. **cost-guides.tsx:222 — "Amount: $50 - $2,500" (Utility Rebates card).** DSIRE database shows a wider range; $50-$2,500 is representative but not defined. Verify or drop.
5. **smart-thermostats/programmable-vs-smart-thermostat.mdx:170 — "Multiple studies show that providing real-time energy feedback reduces consumption by 2-5%".** Feedback-effect literature does support a 5-10% figure (Fischer 2008 review, Faruqui 2010 meta-analysis). Specific 2-5% could be tied to Ehrhardt-Martinez et al. (ACEEE) or similar — verify.
6. **smart-thermostats/smart-thermostat-savings.mdx:262 — "Studies show smart thermostats save 5-10% more than programmable".** ENERGY STAR's smart-thermostat program lists ~8% average savings for certified smart thermostats vs baseline; the "5-10% more than programmable" specifically is not on ENERGY STAR's site as-such. Verify or strip.
7. **dehumidifiers/ideal-indoor-humidity-level.mdx:275 — "Studies show...80-90% [dust mite allergen reduction] over several months".** Custovic, Arlian, Platts-Mills dust-mite research supports the mechanism but the 80-90% band needs a specific citation. Verify.
8. **mold-prevention/moisture-barrier-crawl-space.mdx:364 — "Studies show that encapsulation alone can reduce radon levels by 30-50%".** EPA "A Citizen's Guide to Radon" discusses encapsulation but doesn't publish a specific reduction percentage. Verify or strip.

---

## STEP 4 — Suggested diff sketches (for Scope A and Scope B)

### Diff sketch — Scope A (14 known items only)

Would apply:
- mrcool 150 prose rewrite (1 Edit)
- mrcool 298 FAQ answer rewrite (1 Edit, schema-impacting)
- cost-guides 26, 33, 47, 54, 61, 129, 163, 473, 518 (9 Edits)
- furnace-blowing-cold-air 56 (1 Edit — 1 row of 7 in the table)
- hvac-energy-saving-tips 98 (1 Edit)
- hvac-energy-saving-tips 570 (1 Edit)

**= 14 Edits across 4 files.** Furnace table will have inconsistent-looking column (one row lost its parenthetical, the other six retain "(N%)" — makes the surviving distribution look weirder, not less fabricated).

### Diff sketch — Scope B (Scope A + 30 Tier-1 additions)

Would additionally apply:
- how-to page card fields (16 Edits, all string replacements or field removals)
- cost-guides 215, 222 (2 Edits — flag 215 for Batch D coordination)
- tankless best-tankless-water-heaters.mdx 243 FAQ answer (1 Edit, schema-impacting)
- furnace-blowing-cold-air 54, 55, 57, 58, 59, 60 (6 Edits — combined with the 56 fix, single Edit against the whole `rows={[…]}` block is cleaner)
- smart-thermostat programmable-vs-smart 170 (1 Edit)
- smart-thermostat smart-thermostat-savings 262 (1 Edit)
- dehumidifier ideal-indoor-humidity 275 FAQ (1 Edit, schema-impacting)
- mold-prevention moisture-barrier-crawl-space 364 FAQ (1 Edit, schema-impacting)

**= 14 + 30 = 44 Edits across ~8 files.** Furnace table becomes uniformly qualitative (defensible). Class syntactically exhausted.

### Diff sketch — Scope C (Scope B + Tier-2 sweep)

Multi-hour effort. Per-article citation-proximity read across ~15 MDX articles, plus a further certifying grep pass to catch anything not surfaced by the widened patterns above. **Not attempted in preview.** Recommend as separate Batch C.2 if approved.

---

## Change summary + open questions

| Bucket | Count | Same-class exhaustion at this level |
| --- | --- | --- |
| Known 14 (from user) | 14 items across 4 files | Not exhausted — adjacent rows/hits present |
| Tier-1 additions | 30 items across 5-6 files | Syntactic exhaustion for the attribution-shell / card-field / symptom-table / hero-copy patterns |
| Tier-2 tail | ~30-50 items across ~15 MDX articles | Requires per-article read; not exhausted in this preview |
| Schema-emitting items (JSON-LD or microdata leakage) | 6 total (mrcool 298, tankless 243, smart-thermostat 170/262, dehumidifier 275, mold-prevention 364, hvac-energy-saving-tips 570) | All flagged; commit-atomicity constraint noted |

**Ruling requested:**
- **R-1: scope.** Scope A (14 only) / Scope B (14 + Tier-1, recommended) / Scope C (full sweep)?
- **R-2: verify-appendix items.** For each of the 8 class-(iii) parked items, strip now or hold pending your verify?
- **R-3: cost-guides:215 cross-batch overlap.** Do we handle the whole stale "Federal Tax Credits" card (title, eligibility list, requirements text) inside this batch, or just strip the amount now and leave the rest for Batch D?
- **R-4: how-to page cards.** For each of the 16 how-to card `savings:` fields, prefer qualitative-rewrite (recommended, keeps card visual anchor) or drop-field (leaner UI, no fabrication risk)?
- **R-5: commit shape.** All approved C.1 + already-tree'd C1/C2/C3 + Q-1 + Q-2 in one commit ("chore(compliance): strip constructed/unsourced stats — batch C + C.1"), or split into two commits (Batch C, then Batch C.1)? Same commit is cleanest for grep-atomicity.

Stopping. No edits, no commits. Awaiting your ruling on R-1 through R-5.

*End of preview.*
