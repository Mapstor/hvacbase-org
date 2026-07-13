# Batch C.2 — Verify appendix (iii-realmaybe queue)

**Run date:** 2026-07-13 (post-Batch C.2 apply)

**Result of re-audit:** the 18 iii-realmaybe claims from `BATCH_C2_PREVIEW.md`, re-audited under the strict C.1-style test (shell / construct / inflated-past-named-source → strip; genuinely specific, plausibly-published, no shell → stays iii), all stay iii. Zero reclassifications-to-strip from the re-audit. The strip apply set = original 7 rewrites as drafted, plus 1 same-class FAQ answer surfaced by the certifying-grep pass (see C.2 #19 below). One item downgraded from keep-real to iii per user instruction (item #14b).

**Contents of this file:** every iii claim left in-tree unmodified, with the exact BEFORE, surrounding Q/A, the source that would plausibly back it (for user's source-check), and the schema-emitting flag. Do NOT re-introduce these numbers without a specific published URL + author + year.

---

## Verify queue (23 iii claims across 15 FAQ answers)

**All items below are inside `<FAQ items={[…]}>` blocks — schema-emitting into `FAQPage` JSON-LD via `generateFAQSchema()` + `components/ui/FAQ.tsx`.**

### V-1 — `content/air-conditioners/window-ac-with-heater.mdx:137`

- **Q:** `"Should I leave the window AC heater in the window all winter?"`
- **A (excerpt with iii claim):** `"...remove it for winter to eliminate the thermal bridge and save 5-10% on heating costs."`
- **Verify:** DOE Building America Solution Center on infiltration / thermal-bridge losses; ENERGY STAR home-envelope guidance. A single unsealed window can contribute meaningfully to whole-house infiltration but the specific 5-10% figure is not tied to a canonical source in the answer.
- **Schema:** yes (JSON-LD).

### V-2 — `content/furnaces-heating/thermostat-temperature-winter.mdx:207`

- **Q:** `"How much money does lowering the thermostat 1 degree save?"`
- **A (excerpt with iii claim):** `"Approximately 1-3% of your heating bill per degree, depending on how long you maintain the lower setting."`
- **Verify:** DOE Energy Saver "Programmable Thermostats" page: `"You can save as much as 10% a year on heating and cooling by simply turning your thermostat back 7°-10°F for 8 hours a day from its normal setting."` → implies ~1% per degree per 8-hour setback. 1-3% is a common industry range but no single URL cites 3%.
- **Schema:** yes.

### V-3 — `content/furnaces-heating/thermostat-temperature-winter.mdx:211`

- **Q:** `"Is 72°F too high for a thermostat in winter?"`
- **A (excerpt with iii claim):** `"Compared to 68°F, maintaining 72°F costs about 8-12% more in heating."`
- **Verify:** derivative from V-2. If V-2 gets a cite, V-3 follows (4°F × 1-3%/°F).
- **Schema:** yes.

### V-4a — `content/air-quality/best-air-curtains.mdx:182`

- **Q:** `"Do air curtains really work?"`
- **A (excerpt with iii claim):** `"Yes. Properly sized and installed air curtains maintain 70-80% of the temperature differential across an open doorway..."`
- **Verify:** AMCA (Air Movement and Control Association) publishes air-curtain performance data. Berner Air Curtain manufacturer literature also cites similar figures.
- **Schema:** yes.

### V-4b — `content/air-quality/best-air-curtains.mdx:182`

- **Q:** *(same as V-4a)*
- **A (excerpt with iii claim):** `"...USDA-certified models achieve 99%+ insect exclusion..."`
- **Verify:** USDA Sanitation Certified program (via NSF International); Berner Air Curtain USDA cert documentation.
- **Schema:** yes.

### V-5 — `content/air-quality/best-air-curtains.mdx:206`

- **Q:** `"Can air curtains replace doors?"`
- **A (excerpt with iii claim):** `"They maintain 70-80% of temperature differential — not 100%."`
- **Verify:** same source as V-4a (paired claim).
- **Schema:** yes.

### V-6a — `content/dehumidifiers/dehumidifier-electricity-usage.mdx:234`

- **Q:** `"Do ENERGY STAR dehumidifiers really save money?"`
- **A (excerpt with iii claim):** `"Since ENERGY STAR models typically cost only $20-$50 more at purchase..."`
- **Verify:** market observation from retail price data; not a scientific claim.
- **Schema:** yes.

### V-7a — `content/dehumidifiers/dehumidifier-electricity-usage.mdx:242`

- **Q:** `"Will a dehumidifier raise my electric bill noticeably?"`
- **A (excerpt with iii claim):** `"A 50-pint dehumidifier adds roughly $20-$28 per month during humid season..."`
- **Verify:** derivable from ~500W avg draw × runtime × $0.17/kWh; matches the wattage math elsewhere in the article.
- **Schema:** yes.

### V-7b — `content/dehumidifiers/dehumidifier-electricity-usage.mdx:242`

- **Q:** *(same as V-7a)*
- **A (excerpt with iii claim):** `"...compared to the cost of mold remediation ($1,500-$10,000+)..."`
- **Verify:** EPA "Mold Remediation in Schools and Commercial Buildings"; IICRC S520 mold-remediation reference standard; insurance industry claim data.
- **Schema:** yes.

### V-8 — `content/dehumidifiers/dehumidifier-guide.mdx:389`

- **Q:** `"What's the difference between a 50-pint and 70-pint dehumidifier?"`
- **A (excerpt with iii claim):** `"...uses roughly 25-35% more electricity..."`
- **Verify:** AHAM (Association of Home Appliance Manufacturers) dehumidifier efficiency ratings — 70-pint compressors typically draw ~25-35% more W than 50-pint units at the same duty cycle.
- **Schema:** yes.

### V-10a — `content/dehumidifiers/dehumidifier-running-cost.mdx:234`

- **Q:** `"Does a dehumidifier increase my electric bill significantly?"`
- **A (excerpt with iii claim):** `"A typical 50-pint ENERGY STAR dehumidifier adds $19-$28/month..."`
- **Verify:** same as V-7a (wattage × runtime × $/kWh).
- **Schema:** yes.

### V-10b — `content/dehumidifiers/dehumidifier-running-cost.mdx:234`

- **Q:** *(same as V-10a)*
- **A (excerpt with iii claim):** `"...prevents thousands of dollars in potential mold remediation."`
- **Verify:** same as V-7b.
- **Schema:** yes.

### V-11a — `content/dehumidifiers/most-energy-efficient-dehumidifiers.mdx:220`

- **Q:** `"Is ENERGY STAR certification worth it for dehumidifiers?"`
- **A (excerpt with iii claim):** `"Over a typical 7-year lifespan..."`
- **Verify:** AHAM lifecycle data; manufacturer warranty terms (typically 2-year but expected life 7-10 years).
- **Schema:** yes.

### V-11b — `content/dehumidifiers/most-energy-efficient-dehumidifiers.mdx:220`

- **Q:** *(same as V-11a)*
- **A (excerpt with iii claim):** `"...ENERGY STAR models typically cost only $20-$50 more at purchase..."`
- **Verify:** market observation from retail price data.
- **Schema:** yes.

### V-12 — `content/water-heaters/heat-pump-water-heater-guide.mdx:312`

- **Q:** `"Do heat pump water heaters cool the room?"`
- **A (excerpt with iii claim):** `"...a HPWH cools surrounding air by 2–5°F..."`
- **Verify:** DOE Energy Saver "Heat Pump Water Heaters" placement guidance; manufacturer datasheets (A. O. Smith, Rheem ProTerra, Bradford White).
- **Schema:** yes.

### V-14a — `content/dehumidifiers/basement-dehumidifier-setting.mdx:207`

- **Q:** `"How do I know if my basement dehumidifier is set correctly?"`
- **A (excerpt with iii claim):** `"Buy a separate digital hygrometer ($10-$25)..."`
- **Verify:** market observation from retail price data.
- **Schema:** yes.

### V-14b — `content/dehumidifiers/basement-dehumidifier-setting.mdx:207` (downgraded from keep-real per user instruction)

- **Q:** *(same as V-14a)*
- **A (excerpt with iii claim):** `"If it reads within 2-3% of your target setting, the dehumidifier is working correctly."`
- **Verify:** consumer hygrometer accuracy specs (typically ±3-5% RH per manufacturer datasheets — Habor, Govee, ThermoPro, Airthings). The 2-3% agreement bar is a reasonable calibration tolerance heuristic but not a canonical published figure.
- **Schema:** yes.

### V-15a — `content/air-quality/best-air-purifiers-for-allergies.mdx:167`

- **Q:** `"What type of filter is best for allergies?"`
- **A (excerpt with iii claim):** `"...99.99%+ of common allergens like pollen (20-60 μm), dust mite particles (1-5 μm), and pet dander (1-10 μm)."`
- **Verify:** EN 1822 filter class definitions (H13/H14 extend to larger particles at higher efficiencies). Real particle sizes (allergen size ranges) are keep-real; the 99.99% figure specifically needs an EN 1822 cite.
- **Schema:** yes.

### V-15b — `content/air-quality/best-air-purifiers-for-allergies.mdx:167`

- **Q:** *(same as V-15a)*
- **A (excerpt with iii claim):** `"Avoid HEPA-type or HEPA-style filters, which may capture only 85-95% of particles."`
- **Verify:** filter industry knowledge; IEST-RP-CC001 (US) or EN 1822 (EU) — "HEPA-type" is not a standardized term and typically corresponds to E11/E12 pre-HEPA classes at ~85-95%.
- **Schema:** yes.

### V-17 — `content/air-quality/best-hepa-air-purifiers.mdx:136`

- **Q:** `"What makes an air purifier medical grade?"`
- **A (excerpt with iii claim):** `"...consumer purifiers allow 5-15% of air to bypass the filter..."`
- **Verify:** IEST-RP-CC001 filter testing; sealed-housing bypass claim data from air-purifier reviews (Wirecutter, Consumer Reports have tested bypass on select units).
- **Schema:** yes.

### V-18 — `content/air-quality/best-bedroom-air-purifiers.mdx:156`

- **Q:** `"What size air purifier do I need for a bedroom?"`
- **A (excerpt with iii claim):** `"Buy a unit with 30-50% more CADR than the minimum so you can run it on quiet settings."`
- **Verify:** AHAM CADR sizing convention + industry sizing-margin practice; ENERGY STAR air-cleaner sizing recommendation.
- **Schema:** yes.

### V-19 — `content/dehumidifiers/dehumidifier-running-cost.mdx:246` (surfaced by post-apply certifying grep)

- **Q:** `"Does time-of-use pricing affect dehumidifier costs?"` *(paraphrased — full Q line 245)*
- **A (excerpt with iii claim):** `"If your utility uses time-of-use (TOU) pricing, running your dehumidifier during off-peak hours (typically 9 PM to 6 AM) can be 30-50% cheaper per kWh."`
- **Verify:** utility TOU rate schedules from major utilities (PG&E, ConEd, ComEd, Xcel) — 30-50% off-peak discount is a plausible middle range but varies widely by utility.
- **Schema:** yes.
- **Note:** discovered during Batch C.2 post-apply certifying-grep sweep on the dehumidifier-running-cost file (missed in original preview census).

---

## What did NOT get parked here

- The 6 keep-real claims (HEPA 99.97%, ASHRAE 170 12+ ACH, EN 1822 H13/H14, AHAM test conditions, well-established COP arithmetic for 2-3x heat-pump advantage, EIA-consistent $140-$170 average bill) — stay in-tree, defensible from stated standards / arithmetic on stated inputs.
- The pure arithmetic derivations (e.g., "70-pint vs 50-pint = 40% more moisture" derived from 70/50 = 1.4, or "70-85% less to operate" derived from stated wattages) — keep-real, arithmetic on stated inputs.

## Working procedure when this queue is picked up

1. Pick one item at a time.
2. Find the ACTUAL published source (URL + author + year + section number).
3. If the source's figure MATCHES the site's claim: add inline citation (footnote link + `Sources:` box entry). Update dateModified. Ship as follow-up commit `fix(compliance): add citation for [claim] per [source]`.
4. If the source's figure is NARROWER than the site's claim: rewrite the claim to match the source, add the citation. Do NOT keep the site's broader range.
5. If no source exists: strip the number to qualitative in a follow-up commit `fix(compliance): strip unsourceable [claim]`.

---

*This file is a queue, not a specification. Nothing here is compliance-blocking for the current Batch C.2 commit.*
