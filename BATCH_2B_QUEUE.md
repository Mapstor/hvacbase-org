# BATCH 2B QUEUE — DOE / ACCA / ASHRAE named-source claims pending verification

> Read-only queue. Items here were **surfaced but NOT stripped** during Batch 2 (EPA/ENERGY STAR thermostat cluster). Each requires Marko-side verification against the named agency's primary source before strip-or-keep verdict.

## Class 1: RESOLVED in Batch 2 Group 3

The "70% of programmable thermostat owners" DOE-attributed claim was verified as fabricated in Group 3. Real research spans 29% (Consumer Reports) / ~40% (crowdsourced) / 89% ("rarely program"), depending on methodology, and none of it is DOE-attributed. All 4 sites (smart-thermostat-savings.mdx:163, programmable-vs-smart-thermostat.mdx:200/202/246) were stripped in commit `255741c` and replaced with qualitative language: "most programmable-thermostat owners underuse the scheduling features, often treating them like manual thermostats." No queue items remain in this class.

## Class 2: ACCA/ASHRAE 30-40% + 75% claims (deferred from Batch 2 §2 stragglers)

Origin: Batch 2 Group 1 §2 cross-reference. Same attribution-risk class as the stripped ACCA 32%/85%/70% but on separate pages not in Group 1's scope.

| File | Line | Context |
|---|---|---|
| `content/hvac-maintenance/hvac-maintenance-checklist.mdx` | 37 | `...prevents 75% of HVAC service calls according to ACCA...` |
| `content/hvac-brands/hvac-system-lifespan.mdx` | 31 | `industry-standard averages from ASHRAE and ACCA data` (qualitative reference) |
| `content/hvac-brands/hvac-system-lifespan.mdx` | 321 | `ASHRAE and ACCA data shows maintained systems last **30-40%** longer than neglected ones` |
| `content/hvac-maintenance/hvac-ductwork-guide.mdx` | 120 | `According to ACCA, the majority of residential duct systems are not properly designed...` (qualitative — likely defensible) |
| `content/brand-reviews/trane-vs-carrier.mdx` | 276 | Sources footer: `ACCA - 2025 Member Survey Data` (bibliographic; verify survey exists) |

Verdict-adjacent notes:
- ACCA's "75% of service calls preventable by maintenance" is a common industry rule-of-thumb widely quoted but hard to pin to a specific ACCA publication.
- The 30-40% longer lifespan for maintained systems is standard industry claim; ASHRAE Handbook likely has language supporting the *direction* if not the exact figure.

## Class 3: RESOLVED in Batch 2 Group 3

All 4 STILL-TO-VERIFY named-source claims were resolved in Group 3:
- `seer2-rating-explained.mdx:220` — reattributed from ACCA to NIST installation-fault finding (~30%), commit `ebadc15`
- `do-air-purifiers-really-work.mdx:4,29,190,203` — meta + prose + takeaway + FAQ stripped to qualitative EPA-guidance framing, commit `67fd0c4`
- `hvac-maintenance-checklist.mdx:105` — KEEP + added ENERGY STAR citation URL (verbatim-correct), commit `f243f99`
- `15-2-seer2-vs-16-seer.mdx:176` — reattributed from mis-cited "NIST 5-20% charge alone" to correct NIST combined-installation-faults ~30% finding, commit `52edae3`

## Class 4: Body-prose bare N% tail (Tier-2 backlog)

Not queued individually — 5,250+ bare N% mentions across 329 files catalogued in `AUDIT_INVENTORY/prose_stats.md`. Verify-then-strip pass after all named-source classes resolve.
