# CC-OUTPUT — FIX-28

Date: 2026-10-08. Branch: main. CC committed one commit per page/part; **CC did not push** (Marko pushes).

All work verified locally: `tsc --noEmit` clean, svg-lint 59/59, `content-audit.mjs` 0 on every gate metric, `audit.mjs --skip-build` clean, `next build` exit 0 (279/279 static pages, 3 GB heap), full `audit.mjs` incl. 18 static routes clean. Details in the VERIFY section at the end.

---

## PART A — ENERGY STAR source correction

The stale URL `.../products/heat_pump_water_heaters/key-product-criteria` (used in FIX-27) now redirects to the canonical `https://www.energystar.gov/products/air_source_heat_pumps/key-product-criteria`, which lists **heat pumps only**. The central-AC EER2 figures (12.0 split / 11.5 single-package) and the "11.7 EER2" figure came from an outdated cached version and are **not** on the live page. Every hit corrected or removed; BEFORE/AFTER below.

Corpus sweep for `12.0 EER2`, `11.5 EER2`, `11.7 EER2`, `heat_pump_water_heaters/key-product-criteria`, and any statement of ENERGY STAR central-AC criteria found hits on exactly two live pages: `seer2-rating-explained` and `eer-chart-for-ac-units`. (Other "ENERGY STAR + central air" mentions — duct-loss %, whole-home dehumidifier suggestion, lifespan replacement signals — are unrelated and were left unchanged. Post-edit greps confirm 0 occurrences of the stale URL, "11.7 EER2", "12.0 EER2", or "11.5 EER2" anywhere in live content.)

### 1. seer2-rating-explained (commit `ccb170c`)

**externalLinks — BEFORE:**
```
  - label: "ENERGY STAR: Heat Pump Key Product Criteria"
    url: "https://www.energystar.gov/products/air_source_heat_pumps/key-product-criteria"
  - label: "ENERGY STAR: Heat Pump Equipment and Central ACs Key Product Criteria"
    url: "https://www.energystar.gov/products/heat_pump_water_heaters/key-product-criteria"
```
**AFTER:**
```
  - label: "ENERGY STAR: Air-Source Heat Pump Key Product Criteria"
    url: "https://www.energystar.gov/products/air_source_heat_pumps/key-product-criteria"
```

**Good-rating paragraph — BEFORE:**
> A good rating sits above the federal minimum for your region and at or near the ENERGY STAR level of 15.2 SEER2, which applies to both central air conditioners and heat pumps. For central air conditioners, ENERGY STAR pairs that 15.2 SEER2 with a minimum EER2 at the hot test point of 12.0 for split systems and 11.5 for single-package units. The tiers below anchor to those sourced lines, and the cost column uses the same 3-ton system at 1,500 full-load hours and 18 cents per kWh as above.

**AFTER:**
> A good rating sits at or near 15.2 SEER2, the ENERGY STAR level for heat pumps. That is comfortably above the federal minimum for your region. The tiers below anchor to the federal and ENERGY STAR levels, and the cost column uses the same 3-ton system at 1,500 full-load hours and 18 cents per kWh as above.

**SourcesBox — BEFORE:**
```
  { title: "ENERGY STAR: Heat Pump Key Product Criteria", url: ".../air_source_heat_pumps/key-product-criteria" },
  { title: "ENERGY STAR: Heat Pump Equipment and Central ACs Key Product Criteria (EER2 minimums: 12.0 split, 11.5 single-package)", url: ".../heat_pump_water_heaters/key-product-criteria" },
```
**AFTER:**
```
  { title: "ENERGY STAR: Air-Source Heat Pump Key Product Criteria (15.2 SEER2, 7.8 HSPF2, 11.0 EER2)", url: ".../air_source_heat_pumps/key-product-criteria" },
```

(The line "ENERGY STAR split heat pumps: at least 15.2 SEER2, 7.8 HSPF2 and 11.0 EER2" already matched the live criteria and was left unchanged.)

### 2. eer-chart-for-ac-units (commit `5523a0e`)

**EER2-minimums table + prose — BEFORE:**
```
| Equipment | ENERGY STAR EER2 minimum |
|---|---|
| Split central air conditioner | 12.0 |
| Single-package central air conditioner | 11.5 |
| Split heat pump | 11.0 |

Central air conditioners carry a higher EER2 bar than heat pumps because a cooling-only unit is tuned around that one hot-day condition. On the regulatory side, split air conditioners must meet 13.4 SEER2 ...
```
**AFTER:**
```
| Equipment | ENERGY STAR EER2 minimum |
|---|---|
| Split heat pump | 11.0 |
| Single-package heat pump | 10.0 |

ENERGY STAR publishes these EER2 floors for the heat pumps it certifies, with the single-package figure set a little below the split one. On the regulatory side, split air conditioners must meet 13.4 SEER2 ...
```
(11.0 split / 10.0 single-package are the live heat-pump EER2 floors. The federal "regulatory side" sentences — split-AC SEER2 minimums and the Southwest EER2 — are DOE/10 CFR 430, not ENERGY STAR, and were kept.)

**SourcesBox — BEFORE:**
```
  { title: "ENERGY STAR: Heat Pump Key Product Criteria (EER2 11.0 for split systems)", url: ".../air_source_heat_pumps/key-product-criteria" },
  { title: "ENERGY STAR: Heat Pump Equipment and Central ACs Key Product Criteria (EER2 minimums: 12.0 split, 11.5 single-package)", url: ".../heat_pump_water_heaters/key-product-criteria" },
```
**AFTER:**
```
  { title: "ENERGY STAR: Air-Source Heat Pump Key Product Criteria (EER2 11.0 split, 10.0 single-package)", url: ".../air_source_heat_pumps/key-product-criteria" },
```

**FAQ "What is a good EER rating?" — BEFORE:**
> About 11 or higher for a central system or heat pump, the level ENERGY STAR requires for split heat pumps. Where summers are long and hot, 12 or above pays off.

**AFTER:**
> About 11 or higher is a good target; that is the level ENERGY STAR requires for split heat pumps. Where summers are long and hot, 12 or above pays off.

(Removes the implication that ENERGY STAR sets an 11 EER2 bar for central cooling-only systems.)

### Registry
Replaced the FIX-27 central-AC entry in `docs/HANDOFF.md` with the corrected live heat-pump criteria (split >=15.2 SEER2 / >=7.8 HSPF2 / >=11.0 EER2; single package >=15.2 SEER2 / >=7.2 HSPF2 / >=10.0 EER2; cold-climate >=8.5 HSPF2 non-ducted split, >=8.1 ducted split and single package, COP at 5F >=1.75, heating capacity at 5F >=70% of 47F capacity) and a note that the central-AC EER2 figures were a cached-page error and the old URL now redirects to the canonical page.

---

## PART B — content-audit back to zero

Before: `overclaims 5, long_paragraphs 1, rates_offrate 1, regulatory 4`. After: **0 on every one**. Three findings were genuine detector false positives, fixed by narrowing the detector to its documented intent (never weakened); the rest were text fixes. Every finding with its resolution:

### overclaims (5 -> 0)
| # | page | finding | resolution |
|---|---|---|---|
| 1 | hepa-filter-explained | "the standard tests **exact**ly there" | false positive: `exact` substring matched the adverb "exactly". Detector fix (`content-audit.mjs`): `exact` now matches the whole word only. |
| 2 | coefficient-of-performance | "raises COP **exact**ly when ..." | same false positive; same detector fix |
| 3 | air-source-vs-ground-source-heat-pump | "loses ground **exact**ly when ..." | same false positive; same detector fix |
| 4 | air-conditioner-types | "with the **best** models rated far above the federal minimum" | text fix: "the best models" -> "high-end models" |
| 5 | dehumidifier-guide | diagram alt text "such units work **best** above about 65°F" | text fix: "work best" -> "work most effectively" |

### regulatory (4 -> 0)
| # | page | finding | resolution |
|---|---|---|---|
| 1 | seer2-rating-explained | good-rating prose: "federal **minimum** ... ENERGY STAR level of **15.2**" | resolved by PART A rewrite: 15.2 and "minimum" are now in separate sentences (a period breaks the adjacency pattern) |
| 2 | seer2-rating-explained | the SEER2 cost table ("Federal **minimum**" rows + a "**15.2** ENERGY STAR level" row) | false positive: the `minimum`<->`15.2` adjacency regex ran across table cells/rows. Detector fix: those two patterns now use `[^.\n|]*`, so they stay inside one prose sentence and don't span table cells. The table correctly labels 13.4/14.3 as federal minimums and 15.2 as the ENERGY STAR level. |
| 3 | seer2-rating-explained | central-AC sentence "**15.2** SEER2 with a **minimum** EER2 ... 12.0 ... 11.5" | resolved by PART A: that sentence was deleted (it was the unverified central-AC EER2 claim) |
| 4 | dehumidifier-and-ac-same-time | "a 3-ton air conditioner at **SEER2 14.3** (the federal **minimum** for the South)" | text fix: normalized "SEER2 14.3" -> "14.3 SEER2" (the site's number-first convention; the SEER2-before-number order is what the tripwire matches). The 14.3 South federal minimum is accurate and verified against the registry; the explanatory parenthetical is kept. |

### rates_offrate (1 -> 0)
| page | finding | resolution |
|---|---|---|
| heating-cost-calculator | "...ties the $14.21 gas cost when power falls to about **11.6 cents per kWh**, found by dividing $14.21 by the 122 kWh..." | false positive: this is a *derived* break-even electricity price with its division shown in-sentence, exactly what the off-rate "shown-derivation" exemption is for. The exemption recognized "divided by" but not "dividing ... by". Detector fix: the exemption now matches the divide-verb family (divide/divides/divided/dividing). |

### long_paragraphs (1 -> 0)
| page | finding | resolution |
|---|---|---|
| mini-split-electricity-usage | closing sources/assumptions paragraph = 4 sentences | text fix: split into two paragraphs of two sentences each (no wording or number change) |

### Detector changes (scripts/content-audit.mjs, commit `f7d62ea`)
Three precision fixes, each narrowing a detector to its documented intent. None can *increase* any count (word-boundary, cell-exclusion, and a broader exemption are all strict subsets), so no new flags can appear elsewhere; re-running the audit confirmed every other gate metric stayed 0.
1. **overclaim `exact`:** whole-word match (`(?<![a-z])exact(?![a-z])`) instead of substring, so the adverb "exactly"/"exacting" is not a hit. The intended overclaim is the adjective ("exact cost/BTU").
2. **regulatory `15.2`<->`minimum`:** the two adjacency patterns use `[^.\n|]*` so the span stays inside one prose sentence (a prose claim that "15.2 is the federal minimum") and does not reach across table cells/rows.
3. **kWh off-rate exemption:** `divid(?:e|es|ed|ing)\b` so a derived rate whose math is shown with "dividing ... by" passes, as "divided by" already did.

No page-specific allowlist entries were added; all three are general precision fixes.

---

## PART C — duct-leakage-testing: 2021 IECC limits (commit `20b7e59`)

Added to the "When a test is required" section (after the sentence introducing the per-100-sq-ft limit):

```
The 2021 IECC sets the numbers in Section R403.3.6, with the ducts held at 25 pascals. Total
leakage must come in at or below these figures, in CFM25 per 100 square feet of conditioned
floor area:

| When the duct system is tested | Maximum total leakage |
| --- | --- |
| Rough-in, air handler installed, and the final post-construction test | 4.0 CFM25 per 100 sq ft |
| Rough-in, before the air handler is installed | 3.0 CFM25 per 100 sq ft |
| All ducts and the air handler inside the thermal envelope | 8.0 CFM25 per 100 sq ft |

Work it out for your own house by multiplying the per-100 figure by your floor area. A 2,000
square foot home at the 4.0 limit may leak at most 80 CFM25, since 0.04 × 2,000 = 80. A house
with every duct and the air handler inside the conditioned envelope gets the loosest 8.0
allowance, because any air that leaks there stays indoors.
```

Source added to the SourcesBox: *U.S. DOE Building Science Education Solution Center: Duct Leakage Testing (2021 IECC R403.3.6 limits)*, `https://bsesc.energy.gov/sites/default/files/2024-08/Duct%20Leakage%20Testing%20Level%202%20-%20Lecture%20Notes%20%26%20Problem%20Sets.docx`. Every new number is explained in prose; no paragraph exceeds 3 sentences; added to the HANDOFF registry.

**Declined (no placeholders added, as instructed):** tank warranty tiers, heat pump water heater dB, per-appliance pilot ratings, the NEC Article 220 sample calculation, appliance amp draws, pellet feed rates, room AC dB ranges.

---

## PART D — REVIEW-SHEET.md refresh

Rebuilt `REVIEW-SHEET.md` for the current top-30 pages by GA4 sessions (`RAPTIVE_CLASSIFICATION.csv`, `sessions_4wk`), same format as the first sheet (per page: URL, title, H1, opening answer, bold answer, and every number with context; dense tables summarized "(table)"; frontmatter/alt-text/code excluded), reading each page's **post-FIX-28** content. Thirty pages, all live. 2,523 lines, 30 sections, 30 checkbox triples.

Each page is marked **CHANGED since the first sheet (2026-10-07)** or **unchanged**. "Changed" means the review-captured content (title, H1, opening answer, bold answer, or any stated number) differs from the first sheet; diagram-alt-text edits and pure paragraph re-splits are not review-captured content, so they count as unchanged. Result: **8 changed, 22 unchanged.**

**CHANGED (start here):**
| # | page | what changed |
|---|---|---|
| 9 | ductwork-sizing-calculator | DEEPEN added a "BTU to CFM" section + 2 FAQs (1.08 sensible-heat constant, CFM-per-ton table, temperature-rise example); 61 -> 84 numbers; title reworded |
| 12 | merv-rating-chart | FIX-27 A1: removed the MERV 17-20 / HEPA-equivalence claim; now states the scale is 1-16 (ASHRAE 52.2) with HEPA a separate standard; SourcesBox EPA line changed to "MERV 7-13 nearly as effective as HEPA" |
| 14 | what-size-tankless-water-heater | bold answer reworded ("88%-efficient" -> "at an assumed 88% efficiency"); +1 number (0.95 UEF, ENERGY STAR condensing gas-tankless) |
| 17 | wire-for-220-volt | new cable-temperature reference sentence (+5 numbers: 60°C NM-B, 75°C THHN, 8 AWG at 50 A, NEC Article 440) |
| 21 | hvac-refrigerant-phase-out | timeline rewritten for the EPA reconsideration rule: removed the old "~2026" install cutoff; added May 2026 finalization, New York's Jan 1 2026 deadline, Part 494 |
| 27 | hvac-tax-credits-2026 | no number value changed; the captured list now includes 6 figures the first sheet omitted (HOMES payout tiers + DOE $8.8B/$4.5B/$4.3B split); only real edit was FIX-26 A3 adding a DOE attribution phrase |
| 29 | mini-split-electricity-usage | large: the 11-state rate table was removed and a full "what it costs to run" section added (SEER2 cost-by-size table, efficiency/rate/central-air comparisons, 2 FAQs); title + H1 gained "to run". (FIX-28 also split one sources paragraph here — not a captured-content change.) |
| 30 | dehumidifier-guide | sizing chart swapped from the AHAM per-room-size table to the ENERGY STAR under/over-2,000-sq-ft chart with dampness ranges; 85 -> 81 numbers. (FIX-28 also reworded one diagram's alt text — excluded from the sheet.) |

**unchanged (22):** ac-not-cooling, ac-tonnage-calculator, air-conditioner-btu-calculator, mini-split-sizing-calculator, refrigerant-types-explained, what-size-generator-do-i-need, furnace-sizing-calculator, ideal-indoor-humidity-level, carbon-monoxide-detector-guide, heat-pump-size-calculator, hvac-serial-number-decoder, ac-troubleshooting-guide, 3-phase-power-calculator, kwh-cost-calculator, what-size-generator-for-fridge, dry-mode-in-ac, how-often-change-hvac-filter, mini-split-vs-central-air, how-to-reduce-hvac-noise, what-size-dehumidifier-do-i-need, seer2-comparison-calculator, wire-gauge-chart.

Built with a 30-agent fan-out workflow (one agent per page, reading current source + its own section from the 2026-10-07 snapshot), then assembled deterministically keyed by slug. (The top-30 set and order is unchanged from the first sheet; folds removed no top-30 page.)

---

## VERIFY

| Check | Result |
|---|---|
| `npx tsc --noEmit` | clean (exit 0) |
| svg-lint | 59/59 OK, 0 failures |
| `node scripts/content-audit.mjs` | 0 on every gate metric (rates_offrate, stale_eia, regulatory, phantom_credit, ampacity_flags, recompute_fail, brands, model_codes, overclaims, count_promise_mismatch, old_tells, new_tells, em_dashes, social_proof, long_paragraphs, links_broken, links_badpath, related_slugs_prop, missing_h1, sourcesbox_no_url, title_overclaim, self_links). `attributions` (218) and `precision_stats` (914) are report-only manual-review inventory counters, never zero on a 128-page corpus. |
| `node scripts/audit.mjs --skip-build` | CLEAN — 0 findings |
| `next build` (NODE_OPTIONS=--max-old-space-size=3072) | exit 0, 279/279 static pages generated |
| full `node scripts/audit.mjs` (incl. 18 static routes) | CLEAN — 0 findings, 18 routes checked from built HTML |

### Commits (newest first; not pushed)
```
20b7e59 content(duct-leakage-testing): FIX-28 PART C - 2021 IECC R403.3.6 limits
bd8935d content(mini-split-electricity-usage): FIX-28 PART B - split 4-sentence paragraph
0e8331f content(dehumidifier-and-ac-same-time): FIX-28 PART B - 'SEER2 14.3' -> '14.3 SEER2'
a4608d8 content(dehumidifier-guide): FIX-28 PART B - 'work best' -> 'work most effectively'
0a6d6ca content(air-conditioner-types): FIX-28 PART B - 'best models' -> 'high-end models'
f7d62ea audit(content-audit): FIX-28 PART B - 3 detector precision fixes
5523a0e content(eer-chart-for-ac-units): FIX-28 PART A - correct ENERGY STAR source
ccb170c content(seer2-rating-explained): FIX-28 PART A - correct ENERGY STAR source
```
(HANDOFF registry + REVIEW-SHEET + this file committed separately as the PART D / docs commit.)
