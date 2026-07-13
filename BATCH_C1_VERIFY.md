# Batch C.1 — Verify appendix (re-audit result)

**Run date:** 2026-07-13, as part of the Batch C.1 apply pass.

**Result:** all 8 previously class-(iii) items from `BATCH_C1_PREVIEW.md` reclassified to class-(i) after re-audit under the PART 1 dispositional rules and were stripped in the Batch C.1 apply. **No genuine class-(iii) items remain in the C.1 scope.** No user-side source verification is queued from this batch.

## Re-audit table

| Preview class-(iii) item | Re-audit verdict | Applied disposition in Batch C.1 |
| --- | --- | --- |
| `content/energy-efficiency/hvac-energy-saving-tips.mdx:98` (Dirty filter reduces efficiency by 15-25% — bulleted list) | **Reclassify → (i).** BARE (no inline citation on the same page). DOE Energy Saver publishes "up to 15%" for dirty-filter efficiency loss, not 15-25%. The upper 25% bound has no source; the range is fabricated at the upper end. | Stripped: `- **Dirty filter**: Reduces airflow and forces the system to work harder` |
| `content/energy-efficiency/hvac-energy-saving-tips.mdx:570` (same 15-25% claim inside FAQ answer body; microdata schema-emitting) | **Reclassify → (i).** Same reasoning as :98. Also schema-emits into `schema.org/Answer.text` via microdata. | Stripped: `Dirty filters reduce airflow and increase energy costs.` |
| `app/cost-guides/page.tsx:33` (Rebates up to $1,500 — furnace card) | **Reclassify → (i).** No canonical source; federal 25C for furnace pre-OBBBA capped at $600, HEAR/HOMES don't cover furnaces, state/utility rebates vary from $50 to several thousand. $1,500 is not tied to any published maximum. Fabricated on face. | Stripped: `savings: 'Federal, state, and utility rebates available'` |
| `app/cost-guides/page.tsx:215` (Up to $2,000 — Federal Tax Credits card) | **Special case.** $2,000 WAS the 25C heat-pump credit cap pre-OBBBA — real and defensible AT THAT TIME. Post-OBBBA (property placed in service after 2025-12-31), it is $0. The whole card is stale beyond just the amount. | Amount stripped: `amount: 'See current eligibility'`. Card added to `BATCH_D_WORKLIST.md` for eligibility copy review. |
| `app/cost-guides/page.tsx:222` ($50 - $2,500 Utility Rebates card) | **Reclassify → (i).** DSIRE database shows utility rebates from ~$50 through thousands; $50-$2,500 is a representative sample of the middle band, not a canonical range. Fabricated on face. | Stripped: `amount: 'Varies by state and utility'` |
| `content/smart-thermostats/programmable-vs-smart-thermostat.mdx:170` ("Multiple studies show ... reduces consumption by 2-5%") | **Reclassify → (i).** Attribution shell present. Per PART 1 rule ("attribution shells → drop shell + strip number → qualitative"), the shell forces a strip regardless of whether the underlying feedback-effect literature could support a specific figure. | Stripped: sentence recast as `real-time feedback tends to reduce consumption independently of any automated savings, since people naturally conserve more when they can see the numbers` |
| `content/smart-thermostats/smart-thermostat-savings.mdx:262` ("Studies show smart thermostats save 5-10% more than programmable") | **Reclassify → (i).** Attribution shell present. Per PART 1 rule. | Stripped: sentence removed entirely; surrounding "Even well-programmed thermostats miss savings from occupancy detection, geofencing, and weather compensation" retained |
| `content/dehumidifiers/ideal-indoor-humidity-level.mdx:275` ("Studies show ... reduces dust mite allergen concentrations by 80-90%") — schema-emitting FAQ | **Reclassify → (i).** Attribution shell + specific range, no cite. Dust-mite RH research (Custovic, Arlian, Platts-Mills) does report allergen reductions at low RH but 80-90% is not tied to a specific citation here. Per PART 1 rule. | Stripped: sentence recast as `mite populations decline sharply, and maintained low humidity is one of the most effective non-chemical dust mite control strategies available` |
| `content/mold-prevention/moisture-barrier-crawl-space.mdx:364` ("Studies show ... reduce radon levels by 30-50%") — schema-emitting FAQ | **Reclassify → (i).** Attribution shell + range, no cite. EPA "A Citizen's Guide to Radon" discusses mitigation techniques but does not publish a 30-50% encapsulation-alone reduction figure. Per PART 1 rule. | Stripped: sentence removed. Surrounding "This combined approach typically reduces radon to well below 2 pCi/L" retained (2 pCi/L is EPA's recommended action level, defensible in-context). |

## Rule note

The PART 1 rules from the user's Batch C.1 apply spec are strict:
- **Attribution shell → strip regardless.** Whether the underlying claim could be sourced with proper citation is irrelevant if the shell doesn't provide the citation.
- **Bare (no inline citation) → strip.**
- **Fabricated-on-face → strip** (a number that a reasonable domain expert would not accept as canonical without evidence).

Under these rules, EVERY item my Batch C.1 preview parked as (iii) failed one of the three tests. The verify appendix is therefore empty of queued items. Future batches that want to keep specific numbers with citations will need a separate flow: research the source, add the citation, then decide whether to reintroduce the number in the visible copy.
