# Batch Quality Backlog — post-Raptive parking lot (NO ACTION)

This document is a parking lot for content-quality follow-ups that are **NOT ad-review compliance blockers**. Fabricated-on-face stats have already been handled in Batches C and C.1 (visible + schema-emitting) and C.2 (schema-emitting FAQ answer bodies). What remains here is bare in-prose stat claims that are same-class-adjacent but were kept OUT of the schema-emitting compliance sweeps by design.

**Policy:** post-Raptive quality work. Real published figures get correctly-scoped citations added later (DOE Energy Saver, ENERGY STAR, EPA, ASHRAE, EIA URLs); fabricated-on-face items have already been stripped in earlier batches. This is not a queue, not a sprint — it's what the site accumulates as it grows and periodically rebases against primary sources.

---

## Section 1 — Non-schema in-prose Tier-2 items (from `BATCH_C2_CENSUS.md`)

These are same-class as the C.1 strips (bare N-N% claims with no inline citation) but sit in **prose paragraphs, bullet lists, and worked-example callouts**, not inside `<FAQ items={[…]}>` blocks. They do not emit into JSON-LD or microdata structured data. They are visible to human readers on the article pages but not to Google's structured-data index.

**Deferral rationale:** ad-review compliance focuses primarily on structured-data claims (JSON-LD, microdata) since those are what publisher-review scans catch first. Bare in-prose stats are a quality signal but not a compliance signal. Handle post-Raptive.

### 1.a — Air conditioning cluster (11 items across 6 files)

| file:line | verbatim | notes |
| --- | --- | --- |
| `content/air-conditioners/ac-troubleshooting-guide.mdx:458` | `- Dirty filters reduce efficiency by 15%` | DOE Energy Saver publishes "up to 15%" for this. If cited, keep + add link; else strip. |
| `content/air-conditioners/ac-troubleshooting-guide.mdx:459` | `- Dirty coils reduce efficiency by 30%` | No source known; likely strip. |
| `content/air-conditioners/ac-troubleshooting-guide.mdx:460` | `- Low refrigerant reduces efficiency by 20%` | No source known; likely strip. |
| `content/air-conditioners/ac-troubleshooting-guide.mdx:461` | `- Duct leaks waste 20-30% of energy` | DOE publishes 20-30% duct-loss figure; cite or strip. |
| `content/air-conditioners/ac-troubleshooting-guide.mdx:478` | `Every degree higher you set your thermostat saves 6-8% on cooling costs.` | DOE's actual figure is 1-3% per degree — this claim is 2-3x inflated. Likely strip. |
| `content/air-conditioners/ac-not-cooling.mdx:137` | `reducing efficiency by 25% and requiring professional cleaning costing $300-500` | No source; likely strip the 25%. |
| `content/air-conditioners/ac-not-cooling.mdx:363` | `A dirty evaporator coil can reduce efficiency by 30% or more` | No source; likely strip. |
| `content/air-conditioners/ac-not-cooling.mdx:569` | `Ductwork problems can rob your system of 20-30% of its cooling capacity` | DOE-consistent range; cite or strip. |
| `content/air-conditioners/window-ac-installation-guide.mdx:73` | `direct sun on the condenser reduces efficiency by 5-10%` | No source; likely strip. |
| `content/air-conditioners/window-ac-installation-guide.mdx:231` | `unsealed accordion side panels reduce efficiency by 10-20%` | No source; likely strip. |
| `content/air-conditioners/window-air-conditioners.mdx:317` | `Dirty filters reduce efficiency by 5-15%` | Conflicts with ac-troubleshooting-guide's 15% (same claim, different range) — internal inconsistency. |
| `content/air-conditioners/most-energy-efficient-window-acs.mdx:226` | `a clogged filter can reduce efficiency by 5-15%` | Same claim, same range as ac-troubleshooting-guide:458. Consolidate to a single site-wide fact if kept. |

### 1.b — Air-quality cluster (2 items)

| file:line | verbatim | notes |
| --- | --- | --- |
| `content/air-quality/best-hvac-air-filters.mdx:275` | `Backward installation reduces efficiency by 40-60% and can damage the filter media` | No source; 40-60% is a large claim. Likely strip. |
| `content/air-quality/best-hvac-air-filters.mdx:360` | `- **Annual purchase**: 10-15% savings on bulk orders` | Retailer-specific; not a physics claim. Likely rewrite qualitatively. |
| `content/air-quality/best-air-curtains.mdx:38` | `an air curtain maintains 70-80% of the temperature differential` | AMCA publishes air-curtain performance data; cite or strip. (Also appears in FAQ answers C.2 #4/#5 — see BATCH_C2_PREVIEW.md.) |
| `content/air-quality/best-air-curtains.mdx:135` | `HVAC energy savings estimated at 30% during peak service hours.` | Worked-example prose, "estimated at" is a soft shell. Strip. |

### 1.c — Dehumidifier cluster (5 items, of which 4 surfaced during Batch C.2 apply)

| file:line | verbatim | notes |
| --- | --- | --- |
| `content/dehumidifiers/dehumidifier-guide.mdx:283` | `Result: … AC runtime dropped by approximately 20%. Annual energy savings estimated at $180-$260, partially offsetting the investment.` | Worked-example / case-study format with hedged "approximately" and "estimated at". If the worked example is a real customer report, cite; else label as illustrative. |
| `content/dehumidifiers/dehumidifier-running-cost.mdx:193` | H2: `## 5 Ways to Cut Dehumidifier Running Costs by 30%` | Same class as C.2 #6/#11 strips — the "30%" total-savings claim is not sourced. This H2 propagates into the article outline / table-of-contents. Cite or strip. Surfaced by Batch C.2 certifying grep. |
| `content/dehumidifiers/dehumidifier-running-cost.mdx:197` | `ENERGY STAR dehumidifiers are 15–30% more efficient than standard models. The extra $20–$50 upfront pays for itself within the first season.` | **Same 15-30% i-inflated claim as C.2 #6 / #11** which were stripped from FAQ answers. In this file it sits in a prose section (Callout / body text), not a FAQ answer, so it was not in Batch C.2 scope. Handle in a future pass. |
| `content/dehumidifiers/dehumidifier-electricity-usage.mdx:30` | Article intro: `A typical 50-pint ENERGY STAR dehumidifier draws 480–550 watts and costs $19–$28 per month to run at the national average rate of $0.17/kWh. That's about 3–5% of the average U.S. household's monthly electric bill.` | **Same 3-5% i-construct math-wrong claim as C.2 #7 / #10** which were stripped from FAQ answers. In this file it sits in the article intro prose (not FAQ). Same math failure ($19-$28/mo ÷ $140-$170/mo ≈ 12-20%, not 3-5%). Handle in a future pass. |

### 1.d — Indoor-air-quality-testing radon table (1 row)

| file:line | verbatim | notes |
| --- | --- | --- |
| `content/indoor-air-quality-testing.mdx:177` | `\| 2-4 pCi/L \| Seal cracks, improve ventilation \| $200-500 \| 30-50% reduction \| Annual sealing check \|` | EPA "A Citizen's Guide to Radon" discusses ventilation improvements; specific 30-50% figure needs source or strip. |

### 1.e — Mini-split cluster (1 item, surfaced during Batch C.2 apply)

| file:line | verbatim | notes |
| --- | --- | --- |
| `content/mini-split-air-conditioners/mini-split-electricity-usage.mdx:186` | `A $50 investment in window film can save $30–$60 per year in electricity.` | Bare unsourced $ claim in prose worked example. Not a FAQ answer, not schema-emitting. Surfaced by Batch C.2 certifying grep matching the $30-$60 string. |

### 1.f — Other clusters (as encountered — inventory not exhaustive)

The `BATCH_C2_CENSUS.md` cover-sheet estimated **~30-50 more Tier-2 items** across the wider corpus (heat-pumps, refrigerants, energy-efficiency-ratings, water-heaters, mold-prevention, ductwork, generators, tax-credits-rebates clusters). Not enumerated here; each cluster is a follow-up mini-batch when the time comes.

**Rough total (Section 1):** ~15 items enumerated above + ~30-50 additional Tier-2 items across the wider corpus. Realistic effort to sweep exhaustively: 1-2 hours per cluster, ~10-15 clusters total.

---

## Section 2 — Post-ad-review UX/SEO structural work (from Batch B follow-up)

### BATCH_HUB_RECONCILE

**Origin:** discovered during Batch B (calculator count reconciliation → 9).

**Issue:** the `/calculators` hub (`app/calculators/page.tsx`) surfaces 11 calculator cards, but only 2 of those cards route to MDX files with `contentType: "calculator"` (heating-cost-calculator, kwh-cost-calculator). The other 9 hub cards route to `calculator-guide` or `tool` MDX files. Meanwhile, 7 of the 9 real calculator MDX files (ACH, air-purifier-sizing, dehumidifier-running-cost, what-size-dehumidifier, specific-heat-capacity, mini-split-cost-to-run, portable-ac-cost) are NOT surfaced on the hub at all.

**Batch B disposition:** copy-only fix. All displayed count surfaces standardized to "9". Hub header count removed entirely (no visible count number). Hub grid **untouched** — still shows 11 cards.

**Post-ad-review scope (this parking lot entry):** reconcile the hub grid to reflect the actual calculator inventory:
- **Option 1** — Prune the hub to show only the 9 strict-calculator MDX. Removes 9 popular cards (BTU, Tonnage, Mini Split Sizing, etc.) from the hub, hurting internal linking and UX. Not recommended.
- **Option 2** — Split the hub into two sections: "Calculators" (9 strict) and "Sizing Guides" (calc-guides + tools). Preserves UX, aligns naming with reality. **Recommended.**
- **Option 3** — Expand the hub to feature all 9 strict calculators + all 13 calc-guides + 3 tools = 25 total in a single grid with clear section labels. Preserves everything, adds structure. Also viable.

**Follow-on internal-linking work:** ensure each of the 9 strict-calculator articles has at least one incoming link from the hub, from a relevant category hub (heat-pumps, air-quality, dehumidifiers), and from the homepage's "quick tools" section. Currently 7 of the 9 have no hub link at all.

**Not a compliance issue — build task, not a strip.**

---

## What is NOT in this backlog

- **Fabricated-on-face bare stats** — already handled in Batches C (troubleshooting page charts, cost-guides card fields, MrCool review) and C.1 (14 known items + 30 Tier-1 same-class survivors). Zero survivors confirmed.
- **Attribution-shelled bare stats** — same, already handled in C.1 whether prose or FAQ.
- **Schema-emitting stat claims** — Batch C.2 (in preview at the time of this doc creation) handles the ~7 rewrite-necessary items; the ~11 keep-real / iii-park items stay in tree.

---

## Working procedure when this backlog is picked up

1. **Cluster at a time.** Pick one cluster (e.g., `air-conditioners/`), read all Tier-2 items in the cluster, decide per item: cite (with real URL + spec version), keep-real (already-defensible standard), or strip.
2. **Two passes per cluster.**
   - **Pass A** — cite the ones with real published sources (DOE Energy Saver "Maintaining Your Air Conditioner" for filter/coil claims; ENERGY STAR HVAC page for tune-up claims; ASHRAE 62.2 for ventilation claims; EIA for household energy averages; AMCA for air-curtain claims; etc.).
   - **Pass B** — strip everything Pass A didn't cite. No renumbering. No shell substitution.
3. **Certifying grep after each cluster** — zero survivors of any stripped range; every cited range has a `<sup>[N]</sup>` link or an inline `[according to DOE Energy Saver](url)` or a `Sources:` bullet in the article footer.
4. **Frontmatter dateModified bump** — only on files actually edited.
5. **One commit per cluster** so history is browsable.

---

*Last updated: 2026-07-13, when Batch C.2 preview surfaced the non-schema tail.*
