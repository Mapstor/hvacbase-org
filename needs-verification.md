# needs-verification.md — Verification gaps left by Gate 1 strip pass
**Branch:** `raptive-fix/01-strip-fabrications`
**Generated:** 2026-06-26

Every row below is a spot in the codebase that needs a real value verified against a primary source (AHRI Directory, ENERGY STAR, manufacturer spec sheets, IRS, etc.) before the site can re-apply to Raptive. Two flavors:

1. **Placeholder markers I inserted this gate** — `{{NEEDS-VERIFICATION}}` strings shipped to the page where removal of a fabrication left a gap that requires a real value, and `{{TODO-IDENTITY}}` for the author byline.
2. **Spec rows from `spec-verification.csv`** that this gate deliberately did not touch (per the user's hard rule "do not touch specs with real values yet, do not add the author identity yet") — these are the dollar-significant items Batch B has to resolve.

---

## Section A — Placeholders inserted this gate (must resolve next gate)

| file | claim | current (placeholder) value | what's needed | candidate primary source |
|---|---|---|---|---|
| `app/editorial-policy/page.tsx:307` | "This editorial policy was last updated on {{NEEDS-VERIFICATION}}" | `{{NEEDS-VERIFICATION}}` | The real last-revision date for this policy (likely a date in 2026 when the policy text was last touched) | git blame on this file, or set to today's date once the next-gate edits land |
| `app/buying-guides/page.tsx:205` | `updated: '{{NEEDS-VERIFICATION}}'` — "Ultimate AC Buying Guide" stat | `{{NEEDS-VERIFICATION}}` | Real "last updated" date for the linked guide (`/air-conditioners/ultimate-buying-guide`) | MDX frontmatter `dateModified` of the target article |
| `app/buying-guides/page.tsx:212` | `updated: '{{NEEDS-VERIFICATION}}'` — "Heat Pump vs Furnace" stat | `{{NEEDS-VERIFICATION}}` | Real "last updated" date | MDX `dateModified` of `/heat-pump-vs-furnace` |
| `app/buying-guides/page.tsx:219` | `updated: '{{NEEDS-VERIFICATION}}'` — "Smart Thermostat ROI Calculator" stat | `{{NEEDS-VERIFICATION}}` | Real "last updated" date | MDX `dateModified` of `/thermostats/smart-thermostat-roi-calculator` (NB: this slug appears stale — verify it exists) |
| `content/brand-reviews/trane-vs-carrier.mdx:120` | "**Trane**: {{NEEDS-VERIFICATION}} calls per unit/year" | `{{NEEDS-VERIFICATION}}` | Real service-call-frequency figure | Manufacturer service-bulletin data (Trane publishes via Trane Technologies), warranty-claim data from any disclosed source, or strip the row if no primary source |
| `content/brand-reviews/trane-vs-carrier.mdx:121` | "**Carrier**: {{NEEDS-VERIFICATION}} calls per unit/year" | `{{NEEDS-VERIFICATION}}` | Real service-call-frequency figure | Manufacturer service-bulletin data from Carrier (Carrier Global), or strip the row |
| `content/brand-reviews/trane-vs-carrier.mdx:122` | "**Commonly reported Trane issues**: {{NEEDS-VERIFICATION}}" | `{{NEEDS-VERIFICATION}}` | Real list of common Trane service issues | Trane published service bulletins, or strip the row |
| `content/brand-reviews/trane-vs-carrier.mdx:123` | "**Commonly reported Carrier issues**: {{NEEDS-VERIFICATION}}" | `{{NEEDS-VERIFICATION}}` | Real list of common Carrier service issues | Carrier published service bulletins, or strip the row |
| `lib/schema.ts:5` | Article schema author currently falls back to publisher `SITE_NAME` ("HVAC Base") via `AUTHOR_NAME = SITE_NAME` | `{{TODO-IDENTITY}}` comment marker | Real Person author (Marko Visic) with full `Person` JSON-LD per the brief's Part C-4 (BSc Physics, University of Ljubljana; image at `/authors/marko-visic.jpg`; LinkedIn sameAs) | Marko Visic identity + LinkedIn URL + photo (photo file is at `/workspace/1516504244885.jpeg`, needs copy to `/public/authors/marko-visic.jpg` per Part C-5 of brief) |
| `components/layout/ArticleLayout.tsx:49` | Visible article byline | Renders literal `{{TODO-IDENTITY}}` to every article page until next gate | Real Person component rendering "By Marko Visic" + photo + credential ("BSc Physics, University of Ljubljana") + link to /about | Same as above |

---

## Section B — Specs flagged WRONG / UNVERIFIABLE that this gate did NOT touch

These are preserved as-is per the user's hard rule. Resolution happens in **Batch B (Gate 2 / spec verification)** using AHRI Directory + manufacturer datasheets. Pulled directly from `spec-verification.csv`.

### B.1 — The Mitsubishi MSZ-FS "40.1 SEER2" cluster (HIGHEST priority)

| file:line | brand | model | spec | stated (false) | verified value | source |
|---|---|---|---|---|---|---|
| `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:28, 38, 51, 56, 66, 172, 210` (7 occurrences) | Mitsubishi | MSZ-FS (12K) | SEER2 | 40.1 | **~26.1–26.3** (12K), max in the line is ~32.2 (6K) | AHRI Directory lookup for MUZ-FS12NAH-U1/MSZ-FS12NA-U1 |
| `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx:29, 64, 69, 332` (4 occurrences) | Mitsubishi | MSZ-FS | SEER2 (claimed "industry-leading") | 40.1 | No mini-split achieves 40 SEER2; market top ≈ 33.1 (Fujitsu 09LZBS1) | AHRI Directory |
| `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:51, 58, 210; mini-split-brands-ranked.mdx:64` | Mitsubishi | MSZ-FS | HSPF2 | 14.2 ("highest of any residential unit") | ~11.9 max (MSZ-FS06); ~10.5–11 for 12K | AHRI Directory |
| `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:56` | Mitsubishi | MSZ-FS15 | SEER2 | 33.5 | Estimated ~22–25 (verify per AHRI cert for 15K SKU) | AHRI Directory |
| `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:57` | Mitsubishi | MSZ-FS12 | EER2 | 16.5 | Typical premium mini-splits 10–13 EER2 | AHRI / manufacturer datasheet |
| `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:62, 70; mini-split-brands-ranked.mdx:80` | Mitsubishi | MSZ-FS | Refrigerant | R-410A | Verify current shipping refrigerant (Mitsubishi has transitioned much of the line to R-454B for the 2026 AIM Act cutoff). Plus add the "new install after Jan 1, 2026 requires GWP<700" caveat in body copy. | Mitsubishi product literature; EPA AIM Act rule |

### B.2 — The Daikin Aurora 12K overclaim cluster

| file:line | brand | model | spec | stated (false) | verified value | source |
|---|---|---|---|---|---|---|
| `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:42, 123–125, 210; mini-split-brands-ranked.mdx:95, 260; daikin-mini-split-reviews.mdx:35, 55–57` | Daikin | Aurora 12K (RXT12AVJU9/FTXV12AVJU9) | SEER2 | 25.5 | **19.5–21.0** | AHRI Cert #215710688 |
| Same files | Daikin | Aurora 12K | HSPF2 | 13.0 | **10.2–10.5** | AHRI Cert #215710688 |
| `daikin-mini-split-reviews.mdx:57` | Daikin | Aurora 12K | EER2 | 13.5 | **12.0** | AHRI Cert #215710688 |

### B.3 — The "Carrier 40HQV" mystery model

| file:line | brand | model | spec | stated (false) | verified | source |
|---|---|---|---|---|---|---|
| `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:210; mini-split-brands-ranked.mdx:165–168, 263` | Carrier | "40HQV" (no such model in current Carrier ductless lineup) | SEER2 | 42.0 | Model number does not exist as a Carrier ductless mini-split. Carrier's top single-zone ductless is Infinity 38MPRAQ/40MPHAQ at ~23 SEER2. | Carrier product catalog |
| Same | Carrier | "40HQV" | HSPF2 | 15.0 | No mini-split achieves 15 HSPF2; implausible | AHRI Directory |
| Same | Carrier | "40HQV" | Min heat °F | -22 | Implausible | Manufacturer datasheet |

### B.4 — The Senville SENL cluster (overclaim + underclaim)

| file:line | brand | model | spec | stated (false) | verified | source |
|---|---|---|---|---|---|---|
| `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:44; mini-split-brands-ranked.mdx:228, 266; senville-mini-split-reviews.mdx:36` | Senville | SENL-12CD | SEER2 | 19.0 (understated) | **21.2 (115V) / 21.3 (220V)** | Manufacturer datasheet (Senville LETO); AHRI certification |
| `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:153; mini-split-brands-ranked.mdx:230; senville-mini-split-reviews.mdx:35–46` | Senville | SENL series | Min heat °F | -22 ("claimed", per article) | **5°F (manufacturer published) to -15°F at best** | Senville LETO datasheet |
| `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:155` | Senville | SENL-12CD | Warranty (compressor, yrs) | 7 | **5 (parts + compressor); 7 only on registered bundle SKUs** | Senville published warranty |
| `content/mini-split-air-conditioners/senville-mini-split-reviews.mdx:56` | Senville | SENL series | "Failure rate at 10 years" | "Estimated 15-22%" | **No public reliability study supports this — fabricated.** Strip the line. | N/A |

### B.5 — Fujitsu XLTH

| file:line | brand | model | spec | stated (false) | verified | source |
|---|---|---|---|---|---|---|
| `content/heat-pumps/best-cold-climate-heat-pumps.mdx:33` | Fujitsu | XLTH | HSPF2 (claimed "highest of any residential unit") | 14.2 | Top XLTH variants are typically ~12–13 HSPF2 | Fujitsu XLTH brochure |

### B.6 — Refrigerant transition narrative (cross-cutting)

| file:line | issue | fix needed |
|---|---|---|
| `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx:62, 70` | Claims Mitsubishi MSZ-FS uses R-410A on a 2026-marketed flagship | Verify current refrigerant per manufacturer datasheet. Add box: "As of Jan 1, 2026, new residential heat-pump installs require GWP<700 (R-454B or R-32). Equipment built before Jan 1, 2025 with R-410A may still be installed where available." |
| `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx:80` | Same R-410A claim for Mitsubishi MSZ-FH | Same fix |
| `content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx:80` | Same R-410A claim for Mitsubishi MSZ-FH | Same fix |
| Cross-check against `content/refrigerants/hvac-refrigerant-phase-out.mdx:281` and `content/hvac-brands/best-central-ac-brands.mdx:259` which correctly state R-454B is the 2026 standard | Internal inconsistency between articles | Resolve to one narrative |

### B.7 — Lennox XC25 SEER vs SEER2

| file:line | brand | model | spec | stated | verified | source |
|---|---|---|---|---|---|---|
| `content/hvac-brands/best-central-ac-brands.mdx:85; best-hvac-brands-ranked.mdx:89` | Lennox | XC25 | SEER2 | 26 (likely confused with old SEER rating) | XC25 was marketed at 26 SEER (pre-SEER2); SEER2 equivalent is ~22–24 | Lennox product literature |

### B.8 — Other UNVERIFIABLE rows from `spec-verification.csv`

The CSV contains additional rows marked **UNVERIFIABLE** that need a primary-source check before the spec values can be trusted:

- Fujitsu RLS3H SEER2 / HSPF2 across SKUs (lines 40, 78–81 in best-mini-split-ac-units.mdx)
- LG Art Cool Premier SEER2 / HSPF2 (multiple)
- Cooper&Hunter Sophia SEER2 (mini-split-brands-ranked.mdx:245)
- Mitsubishi MSZ-FH12NA HSPF2 (best-mini-split-ac-units.mdx:109)
- MSZ-FS18 / MSZ-FS15 SEER2 (best-mini-split-ac-units.mdx:56)

See `/workspace/spec-verification.csv` for the complete row-by-row list with line numbers, stated values, and expected verification paths.

---

## Section C — Fabricated methodology language that this gate stripped — log of fake "data sources" called out so the next gate doesn't try to revive them

These data-source claims were removed because the underlying programs don't exist. If a future commit tries to add the same claim back, the source must be substituted with a real, citable one (or the claim dropped):

| Fabricated source claim | Where it appeared | Real alternative if reviving the claim |
|---|---|---|
| "contractor surveys" / "contractor feedback" / "installer feedback" | best-water-heaters.mdx, best-central-ac-brands.mdx, hvac-system-lifespan.mdx, best-mini-split-heat-pumps.mdx, heat-pump-guide.mdx, best-gas-furnace-brands.mdx, mini-split-brands-ranked.mdx, brand-reviews/trane-vs-carrier.mdx | ACCA member survey (if a specific year + URL is cited), Nielsen builder surveys, manufacturer dealer-feedback reports |
| "real-world user feedback" / "real-world user satisfaction" | best-evaporative-coolers.mdx, best-tower-fans.mdx, best-large-room-air-purifiers.mdx, mrcool-diy-mini-split-review.mdx | Verified-purchase review aggregation from a single retailer (cite source + retrieval date) |
| "we tested 47 filter models / 24 portable ACs / 38 mini split models / etc." | 20+ review/ranking pages | Strip permanently — HVACBase has no lab. Stay with "Rankings are based on manufacturer specifications and AHRI-certified efficiency ratings." |
| "controlled conditions (95°F outdoor, 80°F indoor)" | portable-vs-window-ac.mdx | If referencing AHRI standard test conditions, frame as "per AHRI's residential AC test standard (95°F outdoor)" |
| "10K+ Customer Reviews" badge | brand-reviews/page.tsx | Strip permanently unless a real review system is built |
| "1000s Daily Visitors" badge | about/page.tsx | Strip permanently unless GA stats are published (and even then, Raptive doesn't reward unverifiable visitor counts) |
| "March 15, 2024" editorial-policy last-updated date | editorial-policy/page.tsx | Real last-revision date — likely a date in 2026 when the policy text was last touched (use git log on the file) |

---

## Section D — Doorway pattern resolution (partial fix this gate)

The homepage `/indoor-air-quality-testing` 3-anchor doorway has been collapsed to a single link this gate (Task 8). The longer-term resolution remains pending:

| URL | Sub-topics it currently covers | Decision needed |
|---|---|---|
| `/indoor-air-quality-testing` | IAQ testing + VOC sources + Radon testing (all on the same single page) | Either (a) build distinct `/voc-in-home-sources` and `/radon-testing-guide` pages with their own unique heat-transfer / IAQ-physics content, or (b) leave as a single consolidated page and rely on the single homepage link going forward. **No additional anchors should be added back without page-splitting.** |

Other multi-anchor URLs on the homepage that also need attention in a later gate (per audit `AUDIT.md` A5.1):
- `/hvac-maintenance-checklist` — 4 anchors
- `/heat-pump-size-calculator` — 3 anchors
- `/central-ac-cost-to-install` — 3 anchors
- `/best-smart-thermostats` — 3 anchors
- `/air-conditioner-btu-calculator` — 3 anchors
- `/ac-troubleshooting-guide` — 3 anchors
- 16+ other URLs with 2 anchors each

These were NOT touched in this gate. They go in batch E-doorway.

---

## Section E — YMYL tax-credit narrative (UNTOUCHED this gate, but blocking before reapply)

The four MDX files below still contain false / contradictory Section 25C narrative. This was deliberately not part of Gate 1 (which is removals/reconciliations) but is the single highest-stakes YMYL fix the site needs:

| File | Issue |
|---|---|
| `content/heat-pumps/heat-pump-tax-credits-2026.mdx` | Lead paragraph and FAQ still say "claim $2,000 federal tax credit for 2026 installations" — FALSE per OBBBA (signed July 4, 2025). The credit terminated Dec 31, 2025. |
| `content/tax-credits-rebates/hvac-tax-credits-2026.mdx` | Contains the right post-OBBBA framing but every OBBBA-related "2026" should be "2025" (the date-flip error spans lines 33, 59, 60, 193). Plus a text-generation artifact at line 193: "if you installed a heat pump in 2024, 2026, or 2026" → "2024 or 2025". |
| `content/tax-credits-rebates/25c-tax-credit-explained.mdx` | Same date-flip error: "Section 25C tax credit expired on December 31, 2026" → 2025. "OBBBA (July 4, 2026)" → "July 4, 2025". |
| `content/tax-credits-rebates/energy-star-tax-credits.mdx` | Description: "Federal ENERGY STAR HVAC tax credits expired December 31, 2026" → 2025. |

**Primary sources for the correction:**
- IRS — Energy Efficient Home Improvement Credit (Section 25C): https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit
- IRS FS-2026-01 — Updated 25C FAQs: https://www.irs.gov/pub/taxpros/fs-2026-01.pdf
- IRS OBBBA FAQ: https://www.irs.gov/newsroom/faqs-for-modification-of-sections-25c-25d-25e-30c-30d-45l-45w-and-179d-under-public-law-119-21-139-stat-72-july-4-2026-commonly-known-as-the-one-big-beautiful-bill-obbb
- ENERGY STAR Federal Tax Credits: https://www.energystar.gov/about/federal-tax-credits
- Rewiring America 25C guide: https://homes.rewiringamerica.org/federal-incentives/25c-heat-pump-tax-credits

These go in **Batch D** (Gate 2).

---

**END OF NEEDS-VERIFICATION LOG.**
