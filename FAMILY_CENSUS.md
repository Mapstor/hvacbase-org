# FAMILY_CENSUS.md

Pre-Batch-2 duplicate-family census. Method: (1) group 340 published article slugs by
"template stem" (numbers → `N`) and by shared prefix/suffix tokens, then (2) compute pairwise
H2-heading Jaccard similarity across all rendered `<article>` bodies in
`.next/server/app/*.html`. First-sentence duplication counted as a separate signal (any two
articles whose normalized first sentence is byte-identical modulo digits).

Universe: 340 articles rendered. Sample: 21 candidate families surveyed
(number-varying stems + prefix/suffix groups of ≥3 members).

Verdict scale:
- 🚨 **PROGRAMMATIC** — Jaccard ≥ 0.70 across most pairs, or ≥ 3 first-sentence duplicates.
  Direct match for Google's scaled-content-abuse policy. Fix required.
- 🟠 **INSPECT** — Jaccard 0.40–0.69 on any pair, or template-family shape with thin word counts.
  Human read of the highest-overlap pair required before concluding.
- 🟢 **DIFFERENT** — Jaccard < 0.40 across all pairs. Same page-type template but topic-specific
  content. No action beyond routine editorial consistency.

---

## Summary Table

| Family | Members | Max J | Avg J | Min J | FS dup | Verdict |
| --- | ---: | ---: | ---: | ---: | ---: | :---: |
| `best-N-zone-mini-split` | 4 | 1.00 | 1.00 | 1.00 | 3 | 🚨 PROGRAMMATIC |
| `ac-size-for-N-sq-ft` | 6 | 0.62 | 0.34 | 0.25 | 0 | 🟠 INSPECT (one pair) |
| `best-air-purifiers-for-*` | 5 | 0.33 | 0.29 | 0.27 | 0 | 🟢 DIFFERENT |
| `best-N-btu-air-conditioners` | 2 | 0.33 | 0.33 | 0.33 | 0 | 🟢 DIFFERENT |
| `brand-*-air-purifiers` (levoit / germguardian / blueair / honeywell / dyson) | 5 | 0.30 | 0.19 | 0.14 | 0 | 🟢 DIFFERENT |
| `*-window-acs` (quietest / low-profile / smallest / biggest / most-eff / lightweight) | 6 | 0.30 | 0.25 | 0.20 | 0 | 🟢 DIFFERENT |
| window-air-conditioners cluster (best / casement / through-the-wall / saddle / hub) | 5 | 0.30 | 0.23 | 0.15 | 0 | 🟢 DIFFERENT |
| `*-portable-air-conditioners` (best / hub / quietest / cheapest) | 4 | 0.25 | 0.21 | 0.17 | 0 | 🟢 DIFFERENT |
| `best-mini-split-*` (ac-units / for-garage / heat-pumps) | 3 | 0.21 | 0.17 | 0.12 | 0 | 🟢 DIFFERENT |
| `*-tankless-water-heaters` (best-electric / best / smallest) | 3 | 0.21 | 0.20 | 0.19 | 0 | 🟢 DIFFERENT |
| `N-seer-vs-N-seer` (16-vs-14, 16-vs-20) | 2 | 0.21 | 0.21 | 0.21 | 0 | 🟢 DIFFERENT |
| `tankless-water-heater-*` (cost / electricity / guide / breaker-size / propane / wire-size) | 6 | 0.20 | 0.18 | 0.16 | 0 | 🟢 DIFFERENT |
| `*-by-state` (7 members) | 7 | 0.19 | 0.12 | 0.09 | 0 | 🟢 DIFFERENT |
| `*-rating-explained` (cadr / afue / hspf / eer / seer2 / eer2 / ceer / hspf2) | 8 | 0.18 | 0.15 | 0.12 | 0 | 🟢 DIFFERENT |
| `N-N-seerN-vs-N-seer` (14.3-vs-16, 15.2-vs-16) | 2 | 0.17 | 0.17 | 0.17 | 0 | 🟢 DIFFERENT |
| `*-cost-to-install` (water-heater / central-ac / heat-pump) | 3 | 0.17 | 0.14 | 0.11 | 0 | 🟢 DIFFERENT |
| `*-water-heater-guide` (tankless / hub / heat-pump) | 3 | 0.16 | 0.15 | 0.14 | 0 | 🟢 DIFFERENT |
| `*-cost-by-state` (solar / hvac / electricity / electric-water-heating) | 4 | 0.14 | 0.12 | 0.09 | 0 | 🟢 DIFFERENT |
| `what-size-generator-*` (do-i-need / for-5-ton-ac / for-fridge) | 3 | 0.12 | 0.11 | 0.10 | 0 | 🟢 DIFFERENT |
| `*-do-i-need` (generator / mini-splits / dehumidifier) | 3 | 0.12 | 0.11 | 0.10 | 0 | 🟢 DIFFERENT |
| `*-cost-to-run` (mini-split / pellet-stove / electric-fireplace) | 3 | 0.11 | 0.10 | 0.09 | 0 | 🟢 DIFFERENT |

---

## 🚨 Family 1 — `best-N-zone-mini-split` — PROGRAMMATIC

**Members (all 6 pairwise Jaccard = 1.00):**

| Slug | Word count | H2 count |
| --- | ---: | ---: |
| `best-2-zone-mini-split` | 635 | 6 |
| `best-3-zone-mini-split` | 649 | 6 |
| `best-4-zone-mini-split` | 660 | 6 |
| `best-5-zone-mini-split` | 672 | 6 |

**H2 skeleton (identical across all 4, modulo the digit):**
```
Best N-Zone Mini Split Systems
Sizing Your N-Zone System
Installation Cost Breakdown
Key Takeaways
Frequently Asked Questions
Related Articles
```

**First-sentence duplication:** 3 of 4 pages share the byte-identical first sentence modulo
the digit — *"A N-zone mini split system connects one outdoor unit to N indoor air handlers,
each in a separate room with independent temperature control."*

**Intent overlap (Google-visible):** all 4 articles target near-identical intent (`best 2/3/4/5
zone mini split` — same query shape, same result-type expected). SERPs will Panda-cluster.

**Why this matters for Raptive/AdSense:** direct match to Google's "scaled content abuse"
signal — near-identical template with a single-variable substitution. Combined with the D1
finding that all 4 members are under 800 words (2-zone: 635, 3-zone: 649, 4-zone: 660,
5-zone: 672), this is the textbook example a manual reviewer will flag.

**Fix options (rank-ordered):**

1. **Consolidate** all four into a single canonical `/best-multi-zone-mini-splits` page with a
   selector or per-zone-count section (2/3/4/5). 301-redirect the four current URLs to the
   canonical. Preserves any accumulated GSC juice while collapsing the duplicate footprint.
2. **Fully rewrite** each with N-specific H2s, distinct intro, and different equipment picks
   (2-zone = master + guest; 3-zone = small home zoning; 4-zone = whole-home retrofit; 5-zone =
   large / multi-story). Requires ~1500 words per page + genuine differentiation.
3. **De-index** three of the four; leave the strongest performer. Simplest but forfeits SEO
   coverage entirely.

Recommendation: **Option 1**. Google actually rewards a well-structured cluster page for
scale queries; the four thin pages hurt more than they help.

---

## 🟠 Family 2 — `ac-size-for-N-sq-ft` — INSPECT (one pair)

**Members (6 total; pair Jaccard 0.25–0.62 — most pairs are DIFFERENT, only one pair is borderline):**

Full pairwise Jaccard matrix:

|  | 1000 | 1500 | 2000 | 2500 | 3000 |
| --- | :-: | :-: | :-: | :-: | :-: |
| **500** | 0.36 | 0.27 | 0.25 | 0.27 | 0.25 |
| **1000** | — | 0.30 | 0.27 | 0.30 | 0.27 |
| **1500** | | — | 0.30 | 0.33 | 0.44 |
| **2000** | | | — | 0.44 | 0.40 |
| **2500** | | | | — | **0.62** |

The `2500 <-> 3000` pair is the only concern (H2 Jaccard 0.62, 5 of 8 unique H2s shared).

**H2 comparison for the flagged pair:**

`ac-size-for-2500-sq-ft` (1,040 words, 6 H2s):
```
AC Size for 2,500 Sq Ft by Climate Zone
Single System vs. Dual System at 2,500 Sq Ft
Sizing Examples
Equipment Options (2026)
Frequently Asked Questions
Related Articles
```

`ac-size-for-3000-sq-ft` (1,122 words, 7 H2s):
```
AC Size for 3,000 Sq Ft by Climate Zone
Single System vs. Dual System at 3,000 Sq Ft
Sizing Examples
Monthly Cooling Costs for 3,000 Sq Ft
Ductwork Considerations for 3,000 Sq Ft
Frequently Asked Questions
Related Articles
```

Difference: `3000` has two extra H2s (`Monthly Cooling Costs`, `Ductwork Considerations`) that
`2500` lacks. Not a full-template dup — but the 5 shared H2s render very similar tables.

**Verdict:** template-family risk is real but manageable — this is NOT the 1.00-Jaccard
scaled-abuse pattern. The whole family functions as a legitimate size-lookup calculator that a
user researching square-footage lands on.

**Fix options:**

1. **Ship as-is** — 6 pages target 6 legitimately distinct SEO queries (each square-footage
   value has its own search volume). H2 overlap is inherent to the topic.
2. **Add a "Monthly Cooling Costs" + "Ductwork Considerations" H2 to the four smaller pages**
   (500 / 1000 / 1500 / 2000) so the whole family has the same section shape, and each with
   size-specific numbers. Strengthens each page without introducing dupes.
3. **Consolidate to one calculator + 6 short overview pages** — over-engineering; not needed.

Recommendation: **Option 2** — pad the four smaller pages with the two extra H2s and
size-specific numbers. Fixes any lingering "why is 2500 & 3000 so similar" concern.

---

## 🟢 The 19 remaining families — no action needed

All 19 remaining families have max Jaccard ≤ 0.33. Each shares a topic-type template shape
(a comparison page, a "for X situation" page, a state-by-state page) but the H2s and body
content genuinely differ per topic.

Sample check on the two borderline families in this tier:

**`best-air-purifiers-for-*`** (best / mold / smoke / allergies / dust) — max J 0.33.
Each of these has a shared "how we evaluated" and "what to look for" section but the actual
picks and sub-topics differ heavily (mold-oriented picks vs allergen-oriented picks vs
smoke-focused picks). This is topical clustering, not templated abuse.

**`brand-*-air-purifiers`** (levoit / germguardian / blueair / honeywell / dyson) — max J 0.30.
Each is a brand review with brand-specific model coverage. The shared structure (
"lineup overview", "top models", "reliability") is standard for brand-review pages across every
review site on the internet.

Neither pattern would trigger a manual reviewer or automated dedup filter.

---

## Cross-family notes

- **`brand-*-air-purifiers`** cluster is 5 pages and could grow — audit again if you add
  6th–8th brand-review pages before promoting.
- **`*-rating-explained`** cluster is 8 pages (all HVAC-rating explainers). Structural
  similarity is inherent — each is a "what is X, how it's measured, what number is good"
  page. No action.
- **`tankless-water-heater-*`** cluster is 6 pages but all target distinct sub-queries
  (cost / electricity / breaker size / propane usage / wire size / general guide). Jaccard
  0.20 max — genuinely different pages sharing a topic root.
- **First-sentence duplicates:** the only family with any FS duplicates is
  `best-N-zone-mini-split` (3 dupes). Every other family scored 0 FS-dupes — first
  sentences are already genuinely different across the other 335 articles.

---

## Recommended Batch 2 actions (in fix-cost order)

1. **`best-N-zone-mini-split` — 4-page family:** consolidate to `/best-multi-zone-mini-splits`
   with per-zone-count sections + 4× 301 redirects. One-day fix; kills the only PROGRAMMATIC
   family in the corpus.
2. **`ac-size-for-2500-sq-ft` + `ac-size-for-3000-sq-ft`:** add "Monthly Cooling Costs" and
   "Ductwork Considerations" H2s to the four smaller pages (500 / 1000 / 1500 / 2000) with
   size-specific numbers. Also fixes the D1 thin-content risk on 500/1000 if either drops
   below 800 words.
3. **Everything else — no action required.**
