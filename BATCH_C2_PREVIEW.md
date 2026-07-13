# BATCH C.2 — Schema-emitting FAQ stats (PREVIEW, NO EDITS APPLIED)

**Run date:** 2026-07-13
**Mode:** PREVIEW ONLY. No files modified, no dates bumped, no commits.
**Scope:** 18 schema-emitting FAQ answers extracted from `BATCH_C2_CENSUS.md`. Non-schema in-prose Tier-2 items go to `BATCH_QUALITY_BACKLOG.md` (parking lot, STEP 4, no action).
**Per-claim disposition:** an FAQ answer may keep some claims and lose others; every answer is broken out claim-by-claim below.
**Schema atomicity:** every strip → visible source text and the emitted `FAQPage.mainEntity[].acceptedAnswer.text` (JSON-LD via `<FAQ items>`) or `schema:Answer.text` (microdata) ship in the SAME commit.

## Class legend

- **i-shell** — attribution phrase ("studies show / industry data suggests / research shows / independent studies / estimated at") + number, no inline citation. **Strip.**
- **i-construct** — sum-to-100 distribution or arithmetically-constructed figure that doesn't check out (e.g., internally-derived percentage from other stated figures where the math is wrong). **Strip.**
- **i-inflated** — number stated past what its named/plausible source actually publishes (e.g., 15-30% ENERGY STAR claim when ES only publishes ~15-22%). **Strip.**
- **iii-realmaybe** — specific claim a real published source might back; not a shell; not obviously inflated. **Do NOT strip. Park in `BATCH_C2_VERIFY.md` for source-check.**
- **keep-real** — already-correct EPA/DOE/ASHRAE/ENERGY STAR figure, or arithmetic derivation from stated inputs, or well-established engineering fact stated accurately. **Do NOT touch.**

---

## Per-item table

### C.2 #1 — `content/air-conditioners/window-ac-with-heater.mdx:137`

**Q (line 136):** `"Should I leave the window AC heater in the window all winter?"`
**A (line 137):** `"If you use the heating function, yes — leave it installed and well-sealed. If you don't use the heating, remove it for winter to eliminate the thermal bridge and save 5-10% on heating costs. An uncovered window AC in winter acts as a cold-air leak even when turned off."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `save 5-10% on heating costs` (from removing uncovered window AC) | No | **iii-realmaybe** | Park. Thermal-bridge / infiltration losses of that magnitude at a single leaky window are plausible but no source is named. |

**Answer change:** none in this preview — the sole numeric claim is iii-realmaybe, held for verify.

---

### C.2 #2 — `content/furnaces-heating/thermostat-temperature-winter.mdx:207`

**Q (line 206):** `"How much money does lowering the thermostat 1 degree save?"`
**A (line 207):** `"Approximately 1-3% of your heating bill per degree, depending on how long you maintain the lower setting. If your annual heating cost is $1,000, lowering the thermostat by 1°F saves $10-$30/year. A 5°F reduction for 8 hours daily saves about 5-8%, or $50-$80/year on a $1,000 heating bill."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `1-3% of your heating bill per degree` | No inline | **iii-realmaybe** | Park. DOE Energy Saver publishes ~1% per degree per 8-hour setback (approximately consistent). |
| `$10-$30/year on $1,000 bill` | Derived | **keep-real** (arithmetic on above) | If the % above stays, this stays. |
| `5°F reduction... about 5-8%` | Derived | **keep-real** (5 × 1-3% ≈ 5-15%; range 5-8% is a mid-band derivation) | Same. |
| `$50-$80/year` | Derived | **keep-real** | Same. |

**Answer change:** none if the 1-3% figure gets verify-cite'd later, or full strip if it doesn't. Answer coherence intact under both paths.

---

### C.2 #3 — `content/furnaces-heating/thermostat-temperature-winter.mdx:211`

**Q (line 210):** `"Is 72°F too high for a thermostat in winter?"`
**A (line 211):** `"72°F isn't dangerous, but it's higher than most energy experts recommend. Compared to 68°F, maintaining 72°F costs about 8-12% more in heating. For a home with a $1,000 annual heating bill, that's $80-$120/year in extra costs. Most healthy adults adapt comfortably to 68°F within a few days, especially with a sweater."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `8-12% more in heating (4°F above)` | No inline | **iii-realmaybe** | Park. 4°F × ~1-3%/°F = 4-12%; range 8-12% is a mid-band derivation from the DOE per-degree figure. |
| `$80-$120/year` | Derived | **keep-real** (arithmetic) | Same. |

**Answer change:** paired with C.2 #2; if #2's 1-3% stays via verify, #3 stays.

---

### C.2 #4 — `content/air-quality/best-air-curtains.mdx:182`

**Q (line 181):** `"Do air curtains really work?"`
**A (line 182):** `"Yes. Properly sized and installed air curtains maintain 70-80% of the temperature differential across an open doorway. Independent studies show 30-70% reduction in HVAC energy loss through doorways. They also effectively block flying insects (USDA-certified models achieve 99%+ insect exclusion). The key is proper sizing — the air velocity must be sufficient for the door height."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `70-80% of the temperature differential` | No inline; AMCA publishes air-curtain performance data but not cited here | **iii-realmaybe** | Park. |
| `Independent studies show 30-70% reduction in HVAC energy loss` | No inline; `"Independent studies show"` is a shell | **i-shell** | **Strip.** |
| `USDA-certified models achieve 99%+ insect exclusion` | No inline; USDA does have a Sanitation Certified program but no specific 99%+ figure cited | **iii-realmaybe** | Park. |

**Proposed AFTER (visible + schema atomic):**
```
answer: "Yes. Properly sized and installed air curtains maintain 70-80% of the temperature differential across an open doorway, reducing HVAC energy loss through doorways. They also effectively block flying insects (USDA-certified models are used in food processing, restaurants, and grocery stores). The key is proper sizing — the air velocity must be sufficient for the door height."
```
**Rewrite rationale:** drops the `"Independent studies show 30-70%"` sentence entirely; drops the `99%+ insect exclusion` specific number (usage claim retained qualitatively). Answer stays coherent as "yes they work → why → key sizing note."

---

### C.2 #5 — `content/air-quality/best-air-curtains.mdx:206`

**Q (line 205):** `"Can air curtains replace doors?"`
**A (line 206):** `"Air curtains cannot fully replace doors for security, sound isolation, or complete thermal separation. They maintain 70-80% of temperature differential — not 100%. For security, they provide no barrier. For sound, minimal reduction. Air curtains supplement doors (keeping climate separation during open periods) or serve as the primary barrier in commercial settings where doors would impede traffic (loading docks, drive-throughs, retail entrances)."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `70-80% of temperature differential — not 100%` | No inline | **iii-realmaybe** | Park. Same figure as C.2 #4; both would strip or both would stay after verify. |

**Answer change:** none in preview.

---

### C.2 #6 — `content/dehumidifiers/dehumidifier-electricity-usage.mdx:234`

**Q (line 233):** `"Do ENERGY STAR dehumidifiers really save money?"`
**A (line 234):** `"Yes. ENERGY STAR dehumidifiers are 15-30% more efficient than non-certified models. For a 50-pint unit running 10 hours/day over 6 months, that translates to $30-$60 per year in electricity savings. Since ENERGY STAR models cost only $20-$50 more at purchase, the payback period is typically less than 12 months."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `15-30% more efficient than non-certified` | ENERGY STAR named but no URL/spec cited | **i-inflated** — ENERGY STAR's published figure for dehumidifiers is ~15% (up to 22% for some spec versions); the 30% upper bound extends past what ES publishes | **Strip.** |
| `$30-$60 per year in electricity savings` | Derived from the % claim above | **i-inflated (derivative)** | **Strip.** |
| `$20-$50 more at purchase` | No inline; market observation | **iii-realmaybe** (product-cost delta, not a stat claim about efficiency) | Keep. |
| `payback period typically less than 12 months` | Derived from savings + upfront cost | **iii-realmaybe** | Keep, but the number is now qualitative-only. |

**Proposed AFTER:**
```
answer: "Yes. ENERGY STAR dehumidifiers are more efficient than non-certified models, producing meaningful electricity savings over the unit's lifetime. Since ENERGY STAR models typically cost only $20-$50 more at purchase, the payback period is short."
```

---

### C.2 #7 — `content/dehumidifiers/dehumidifier-electricity-usage.mdx:242`

**Q (line 241):** `"Will a dehumidifier raise my electric bill noticeably?"`
**A (line 242):** `"A 50-pint dehumidifier adds roughly $20-$28 per month during humid season — approximately 3-5% of the average U.S. household electric bill ($140-$170/month). Most homeowners notice the increase but find it worthwhile compared to the cost of mold remediation ($1,500-$10,000+), structural repairs, or health impacts from poor air quality."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `$20-$28 per month` | No inline; derivable from unit wattage + $/kWh | **iii-realmaybe** | Park. |
| `3-5% of the average U.S. household electric bill` | No inline | **i-construct** — the arithmetic doesn't check out: $20-$28 ÷ $140-$170 = **~12-20%**, NOT 3-5%. Number is internally inconsistent with the surrounding figures in the same sentence. | **Strip.** |
| `average U.S. household electric bill ($140-$170/month)` | No inline; EIA publishes ~$150/mo average | **keep-real** (EIA-consistent range) | Keep. |
| `mold remediation ($1,500-$10,000+)` | No inline | **iii-realmaybe** | Park. |

**Proposed AFTER:**
```
answer: "A 50-pint dehumidifier adds roughly $20-$28 per month during humid season — a noticeable but modest fraction of the average U.S. household electric bill ($140-$170/month). Most homeowners find it worthwhile compared to the cost of mold remediation ($1,500-$10,000+), structural repairs, or health impacts from poor air quality."
```

---

### C.2 #8 — `content/dehumidifiers/dehumidifier-guide.mdx:389`

**Q (line 388):** `"What's the difference between a 50-pint and 70-pint dehumidifier?"`
**A (line 389):** `"The pint rating tells you how many pints of water the unit can remove in 24 hours at AHAM standard conditions (65°F, 60% RH). A 70-pint unit removes 40% more moisture per day than a 50-pint unit, uses roughly 25-35% more electricity, and typically costs $50-$80 more to purchase. Choose 70 pints if your space is over 2,000 sq ft, is extremely damp, or if you need to bring humidity down quickly."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `AHAM standard conditions (65°F, 60% RH)` | AHAM named | **keep-real** (AHAM dehumidifier test conditions) | Keep. |
| `70-pint unit removes 40% more moisture` | Derived arithmetic (70/50 = 1.4) | **keep-real** (arithmetic on the pint labels) | Keep. |
| `25-35% more electricity` | No inline | **iii-realmaybe** — plausible from compressor sizing, no explicit source | Park. |
| `$50-$80 more to purchase` | Market observation | **iii-realmaybe** (product-cost delta) | Keep as-is (market fact). |

**Answer change:** none in preview if 25-35% survives verify or is dropped later.

---

### C.2 #9 — `content/dehumidifiers/dehumidifier-guide.mdx:393`

**Q (line 392):** `"Is it cheaper to run a dehumidifier or an air conditioner for humidity?"`
**A (line 393):** `"A dehumidifier is significantly cheaper for humidity control alone. A 50-pint dehumidifier draws 480-550 watts, while a central AC system draws 2,000-5,000 watts. If your only goal is reducing humidity (not cooling), the dehumidifier costs 70-85% less to operate. However, if you need both cooling and dehumidification, running the AC handles both — adding a dehumidifier on top only makes sense when the AC alone can't maintain humidity below 55%."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `50-pint draws 480-550 watts` | Manufacturer spec | **keep-real** (product spec) | Keep. |
| `central AC draws 2,000-5,000 watts` | Manufacturer spec | **keep-real** | Keep. |
| `70-85% less to operate` | Derived arithmetic: 480/2000 to 550/5000 → 76-89% less; stated 70-85% is a slightly conservative range | **keep-real** (arithmetic on the stated wattages, within rounding) | Keep. |
| `humidity below 55%` | ASHRAE 55 (thermal comfort) related | **keep-real** | Keep. |

**Answer change:** none. All claims defensible from stated inputs or well-known standards.

---

### C.2 #10 — `content/dehumidifiers/dehumidifier-running-cost.mdx:234`

**Q (line 233):** `"Does a dehumidifier increase my electric bill significantly?"`
**A (line 234):** `"A typical 50-pint ENERGY STAR dehumidifier adds $19-$28/month to your electric bill during humid months, which is roughly 5-10% of an average household's total electricity cost. For comparison, that's less than running a single 100W light bulb for 10 hours a day. It's a modest cost that prevents thousands of dollars in potential mold remediation."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `adds $19-$28/month during humid months` | No inline; consistent with dehum wattage math | **iii-realmaybe** | Park (defensible from spec + kWh price). |
| `roughly 5-10% of an average household's total electricity cost` | No inline | **i-construct** — same math problem as C.2 #7: $19-$28/mo ÷ $140-$170/mo average bill = **~11-20%**, NOT 5-10%. Internally inconsistent. | **Strip.** |
| `less than running a single 100W light bulb for 10 hours a day` | No inline | **i-construct / i-inflated** — 100W × 10hr × 30 days = 30 kWh × $0.17/kWh = ~$5/month. Dehum stated at $19-$28. Dehum is **MORE** than the bulb, not less. Claim is factually inverted. | **Strip.** |
| `thousands of dollars in potential mold remediation` | No inline | **iii-realmaybe** (mold-remediation cost ranges are documented) | Park. |

**Proposed AFTER:**
```
answer: "A typical 50-pint ENERGY STAR dehumidifier adds $19-$28/month to your electric bill during humid months — a modest but noticeable cost that prevents thousands of dollars in potential mold remediation."
```

---

### C.2 #11 — `content/dehumidifiers/most-energy-efficient-dehumidifiers.mdx:220`

**Q (line 219):** `"Is ENERGY STAR certification worth it for dehumidifiers?"`
**A (line 220):** `"Absolutely. ENERGY STAR dehumidifiers save 15-30% on electricity compared to non-certified models. Over a typical 7-year lifespan, that translates to $210-$630 in savings depending on your electricity rate and usage. Since ENERGY STAR models typically cost only $20-$50 more at purchase, the ROI is one of the best in home appliances."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `save 15-30% on electricity` | ENERGY STAR named but no spec version cited | **i-inflated** — ENERGY STAR publishes ~15% (v5.0 spec, up to 22%); 30% is past that | **Strip.** |
| `$210-$630 in savings over 7-year lifespan` | Derived from the % claim | **i-inflated (derivative)** | **Strip.** |
| `7-year lifespan` | No inline | **iii-realmaybe** (product lifespan estimate) | Keep. |
| `$20-$50 more at purchase` | Market observation | **iii-realmaybe** | Keep. |
| `ROI is one of the best in home appliances` | No inline; subjective | Not a numeric claim | Keep. |

**Proposed AFTER:**
```
answer: "Absolutely. ENERGY STAR dehumidifiers are more efficient than non-certified models, producing electricity savings over the unit's lifetime. Since ENERGY STAR models typically cost only $20-$50 more at purchase, the ROI is one of the best in home appliances."
```

---

### C.2 #12 — `content/water-heaters/heat-pump-water-heater-guide.mdx:312`

**Q (line 311):** `"Do heat pump water heaters cool the room?"`
**A (line 312):** `"Yes — a HPWH cools surrounding air by 2–5°F and reduces humidity. This is a benefit in summer and in hot/humid climates (free cooling and dehumidification) but a minor drawback in winter, as your heating system works slightly harder. The winter heating penalty is estimated at 10–20% of the water heating savings in cold climates."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `cools surrounding air by 2–5°F` | No inline; derivable from HPWH thermodynamics | **iii-realmaybe** (DOE Energy Saver discusses this qualitatively; specific 2-5°F range is not universal) | Park. |
| `winter heating penalty is estimated at 10–20% of the water heating savings` | `"estimated at"` is a soft shell; no source | **i-shell** (soft) — `"estimated at"` functions like an attribution shell without naming who estimates | **Strip.** |

**Proposed AFTER:**
```
answer: "Yes — a HPWH cools surrounding air by a few degrees and reduces humidity. This is a benefit in summer and in hot/humid climates (free cooling and dehumidification) but a minor drawback in winter, as your heating system works slightly harder to compensate."
```

---

### C.2 #13 — `content/furnaces-heating/best-electric-furnace.mdx:119`

**Q (line 118):** `"Is an electric furnace better than a heat pump?"`
**A (line 119):** `"In almost every scenario, a heat pump is better than an electric furnace. Heat pumps deliver 2-3x more heat per watt of electricity because they transfer heat rather than generating it. A heat pump costs more upfront but saves 50-65% on heating costs. The only advantage of an electric furnace is lower installation cost and simpler maintenance."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `2-3x more heat per watt` (COP) | No inline; well-established HVAC engineering fact | **keep-real** (COP of typical heat pumps in heating mode) | Keep. |
| `saves 50-65% on heating costs` | Derived from COP: 1/COP = 33-50% of resistance heater energy, so savings = 50-67%. Range 50-65% is consistent. | **keep-real** (arithmetic derivation from the COP claim) | Keep. |

**Answer change:** none. Both claims defensible.

---

### C.2 #14 — `content/dehumidifiers/basement-dehumidifier-setting.mdx:207`

**Q (line 206):** `"How do I know if my basement dehumidifier is set correctly?"`
**A (line 207):** `"Buy a separate digital hygrometer ($10-$25) and place it away from the dehumidifier. If it reads within 2-3% of your target setting, the dehumidifier is working correctly. If there's a larger gap (e.g., unit set to 50% but room is 58%), adjust the dehumidifier setting lower to compensate for its inaccurate sensor."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `$10-$25 for a digital hygrometer` | Market observation | **iii-realmaybe** | Keep (market fact, not a stat claim). |
| `within 2-3% of your target setting` | Consumer hygrometer accuracy | **keep-real** — consumer hygrometer specs are typically ±3-5% RH; 2-3% agreement is a reasonable calibration tolerance | Keep. |

**Answer change:** none.

---

### C.2 #15 — `content/air-quality/best-air-purifiers-for-allergies.mdx:167`

**Q (line 166):** `"What type of filter is best for allergies?"`
**A (line 167):** `"True HEPA H13 is the gold standard for allergies. It captures 99.97% of particles at 0.3 microns and 99.99%+ of common allergens like pollen (20-60 μm), dust mite particles (1-5 μm), and pet dander (1-10 μm). Avoid HEPA-type or HEPA-style filters, which may capture only 85-95% of particles."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `99.97% of particles at 0.3 microns` | HEPA standard definition (DOE-STD-3020, IEST-RP-CC001, EN 1822) | **keep-real** | Keep. |
| `99.99%+ of common allergens` | H13 spec extends higher for larger particles | **iii-realmaybe** | Park (H13 EN 1822 does specify higher efficiency for larger particles; specific 99.99% figure needs cite). |
| `pollen (20-60 μm), dust mite particles (1-5 μm), pet dander (1-10 μm)` | Biological facts about particle sizes | **keep-real** (well-established particle-size ranges) | Keep. |
| `HEPA-type/HEPA-style may capture only 85-95%` | No inline; industry knowledge | **iii-realmaybe** | Park. |

**Answer change:** none in preview; two iii-realmaybe items parked.

---

### C.2 #16 — `content/air-quality/best-air-purifiers-for-allergies.mdx:179`

**Q (line 178):** `"Do air purifiers help with pet allergies?"`
**A (line 179):** `"Yes. HEPA purifiers capture airborne pet dander (1-10 μm) and pet allergens (Fel d 1 for cats, Can f 1 for dogs) effectively. Studies show 60-70% reduction in airborne cat allergen with bedroom HEPA use. Combine with regular pet grooming, HEPA vacuuming, and keeping pets out of the bedroom for best results. A washable pre-filter helps catch pet hair before it reaches the HEPA stage."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `pet dander (1-10 μm)` | Biological fact | **keep-real** | Keep. |
| `Fel d 1 for cats, Can f 1 for dogs` | Real allergen protein names | **keep-real** | Keep. |
| `Studies show 60-70% reduction in airborne cat allergen with bedroom HEPA use` | No inline; `"Studies show"` shell | **i-shell** | **Strip.** |

**Proposed AFTER:**
```
answer: "Yes. HEPA purifiers capture airborne pet dander (1-10 μm) and pet allergens (Fel d 1 for cats, Can f 1 for dogs) effectively. Combine with regular pet grooming, HEPA vacuuming, and keeping pets out of the bedroom for best results. A washable pre-filter helps catch pet hair before it reaches the HEPA stage."
```

---

### C.2 #17 — `content/air-quality/best-hepa-air-purifiers.mdx:136`

**Q (line 135):** `"What makes an air purifier medical grade?"`
**A (line 136):** `"Medical-grade air purifiers feature H13 or H14 HEPA filtration, sealed-system construction preventing air bypass, sufficient CADR for 12+ ACH, zero ozone production, and independent third-party testing. The key differentiator from consumer units is the sealed housing — consumer purifiers allow 5-15% of air to bypass the filter, while medical-grade units approach 0% bypass."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `H13 or H14 HEPA filtration` | EN 1822 filter class definitions | **keep-real** | Keep. |
| `sufficient CADR for 12+ ACH` | Healthcare standard | **keep-real** (ASHRAE Standard 170 healthcare ventilation) | Keep. |
| `consumer purifiers allow 5-15% of air to bypass` | No inline | **iii-realmaybe** (bypass ratios are testable; 5-15% is plausible for consumer units without sealed housings) | Park. |
| `medical-grade units approach 0% bypass` | Implied from sealed-housing spec | **keep-real** (definition of medical-grade sealed housing) | Keep. |

**Answer change:** none in preview; the 5-15% bypass figure parks.

---

### C.2 #18 — `content/air-quality/best-bedroom-air-purifiers.mdx:156`

**Q (line 155):** `"What size air purifier do I need for a bedroom?"`
**A (line 156):** `"Calculate based on your room dimensions and target 5 ACH. Small bedroom (150 sq ft): 100+ CFM CADR. Average bedroom (200 sq ft): 133+ CFM. Large bedroom (300 sq ft): 200+ CFM. Master suite (350 sq ft): 233+ CFM. Buy a unit with 30-50% more CADR than the minimum so you can run it on quiet settings."`

| Claim | Inline cite? | Class | Disposition |
| --- | --- | --- | --- |
| `target 5 ACH` | AHAM/CADR sizing convention | **keep-real** | Keep. |
| `100+ / 133+ / 200+ / 233+ CFM for 150/200/300/350 sq ft` | Arithmetic from `room volume × 5 ACH / 60 min` (assuming 8 ft ceilings): 150 × 8 × 5 / 60 = 100 CFM ✓ | **keep-real** (derived from 5 ACH × room volume) | Keep. |
| `Buy a unit with 30-50% more CADR than the minimum` | No inline; industry sizing-margin practice | **iii-realmaybe** | Park. |

**Answer change:** none in preview; 30-50% margin parks.

---

## Change summary

| Bucket | Count |
| --- | --- |
| FAQ answers with at least one strip | **6** (#4, #6, #7, #10, #11, #12, #16 — actually **7** answers, listed above with proposed AFTER text) |
| Distinct claims stripped in preview | **~10** across those 7 answers |
| Claims parked (iii-realmaybe) for `BATCH_C2_VERIFY.md` | **~18** across the 18 items |
| Claims kept-real (untouched) | **~15** across the 18 items |
| FAQ answers with NO change (all claims keep-real or iii-park) | **11** (#1, #2, #3, #5, #8, #9, #13, #14, #15, #17, #18) |

### Answers that change (7)

1. C.2 #4 — best-air-curtains:182 (drop "Independent studies show 30-70%" sentence; drop 99%+ insect number)
2. C.2 #6 — dehumidifier-electricity-usage:234 (strip 15-30% i-inflated + derived $30-$60)
3. C.2 #7 — dehumidifier-electricity-usage:242 (strip 3-5% i-construct math)
4. C.2 #10 — dehumidifier-running-cost:234 (strip 5-10% i-construct + strip inverted 100W-bulb comparison)
5. C.2 #11 — most-energy-efficient-dehumidifiers:220 (strip 15-30% i-inflated + derived $210-$630)
6. C.2 #12 — heat-pump-water-heater-guide:312 (strip "estimated at 10-20%" i-shell-soft)
7. C.2 #16 — best-air-purifiers-for-allergies:179 (strip "Studies show 60-70%" i-shell)

### Answers untouched (11)

C.2 #1, #2, #3, #5, #8, #9, #13, #14, #15, #17, #18 — every numeric claim is either keep-real (defensible from standards/arithmetic/well-known engineering) or iii-realmaybe (parked in `BATCH_C2_VERIFY.md` for user source-check but NOT stripped since not fabricated-on-face).

## Files touched if Batch C.2 applies

7 MDX files across 6 clusters:
1. `content/air-quality/best-air-curtains.mdx`
2. `content/dehumidifiers/dehumidifier-electricity-usage.mdx` (2 changes)
3. `content/dehumidifiers/dehumidifier-running-cost.mdx`
4. `content/dehumidifiers/most-energy-efficient-dehumidifiers.mdx`
5. `content/water-heaters/heat-pump-water-heater-guide.mdx`
6. `content/air-quality/best-air-purifiers-for-allergies.mdx`

All 7 changes are inside `<FAQ items={[…]}>` blocks. All schema-emit. All must ship atomic (visible + `FAQPage` JSON-LD) — a single commit.

**Frontmatter dateModified/dateUpdated bumps** on the 6 edited MDX files: 2026-07-13 (only on files actually edited).

## Certifying-grep plan (post-apply)

1. Zero survivors of each stripped shell/inflated claim:
   ```
   grep -rEn --include='*.mdx' -e "Independent studies show 30-70%|3-5% of the average U.S. household|5-10% of an average household|less than running a single 100W|Studies show 60-70% reduction|estimated at 10.20% of the water heating|ENERGY STAR dehumidifiers (are|save) 15.30%" /workspace/content
   ```
   Expected: empty.
2. Confirm AFTER strings present at each of 7 edit sites.
3. Emitted schema check — `FAQPage` JSON-LD via `<FAQ items>` is a deterministic function of the source string; source cleaned = schema clean. No separate render pass needed.

## Open questions

- **Q-1:** Approve the 7 answer rewrites as drafted above?
- **Q-2:** Any specific iii-realmaybe claim in the parked-list you want me to strip instead of park (i.e., stricter than the C.2 default)?
- **Q-3:** For C.2 #14's `2-3% hygrometer tolerance`, I classed keep-real (consumer hygrometer spec). Confirm that's OK to leave, or downgrade to iii-realmaybe?
- **Q-4:** Commit shape — single commit `fix(compliance): strip constructed/inflated stats from schema-emitting FAQ answers — batch C.2`?

Stopping. No edits, no commits.

*End of preview.*
