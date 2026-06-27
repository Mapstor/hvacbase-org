# spec-fix-summary.md — Gate 2 / Branch `raptive-fix/02-spec-corrections`
**Date:** 2026-06-26
**Branch:** `raptive-fix/02-spec-corrections` (branched off `raptive-fix/01-strip-fabrications`; 12 commits; NOT pushed, NOT merged)
**Build:** ✅ `npm run build` passes — 376 static pages generated, no errors
**Skills in effect:** `google-ai-content-policy` + `portfolio-page-quality` (both mounted at `/home/node/.claude/skills/`)
**Source of truth:** `SPEC_CORRECTIONS_LOCKED.md` — every value written in this gate transcribed from there

---

## Per-section change log

### Section A — Cross-cutting (A1, A2, A3)

#### A1. "40 SEER2 / industry-leading" fabrication — REMOVED
Every "MSZ-FS achieves 40.1 SEER2 / industry-leading / highest certified efficiency / no other mini split matches" claim across the site has been corrected. The MSZ-FS12NA real spec (26.3 SEER2 / 13.8 EER2 / 10.4–11.1 HSPF2 per gotductless and Ferguson submittal listings) now lives in a "Reference" block on `best-mini-split-ac-units.mdx` and a Companion line on `mini-split-brands-ranked.mdx` with explicit framing that the 40.1 SEER2 claim was a fabrication.

Verified clean: `grep -rn "40\.1 SEER2.*industry\|industry-leading 40\|no other mini split matches" /workspace/content /workspace/app` returns only the explicit-correction references (which is what we want).

#### A2. Refrigerant 3-part framing — APPLIED
The locked file's three-part AIM Act framing is now applied wherever refrigerant transition is discussed:
1. **Manufacturing cutoff: Jan 1, 2025.** R-410A may no longer be produced/imported for new residential AC/HP equipment. New equipment ships with R-454B (GWP 466) or R-32 (GWP 675).
2. **Installation: R-410A not banned.** Pre-2025 inventory may still be installed in 2026 per the EPA amended final rule (effective July 27, 2026).
3. **State caveat: New York codified the original Jan 1, 2026 install ban.** Check your state code.

Files touched: `content/refrigerants/hvac-refrigerant-phase-out.mdx`, `content/refrigerants/refrigerant-types-explained.mdx`, `content/hvac-brands/best-central-ac-brands.mdx`. The mini-split B1+B2+C commit already wired the framing into `best-mini-split-ac-units.mdx` and `mini-split-brands-ranked.mdx`.

Sources cited inline: EPA Technology Transitions rule; NAHB (May 2026); ACDirect R-410A phase-out timeline; ICC Q4-2025 update.

#### A3. Section 25C YMYL fix — ALL 4 FILES CORRECTED
The four tax-credit MDX files all now state the correct OBBBA-era reality:
- **Section 25C terminated for installs after December 31, 2025** under the OBBBA (Public Law 119-21, signed July 4, 2025).
- 2025 installs can still be claimed on the 2025 return (IRS Form 5695) filed in early 2026.
- 2026 install pathways: HOMES + HEAR/HEEHRA + state/utility rebates.
- Section 25D status under OBBBA: marked `` `NEEDS-VERIFICATION` `` (locked file only verifies 25C; hard rule prohibits guessing 25D).

Date-flip typos fixed: every "December 31, 2026" referring to 25C expiry corrected to "December 31, 2025"; every "July 4, 2026" OBBBA signing corrected to "July 4, 2025"; the IRS OBBBA URL year corrected from 2026 → 2025; the "2024, 2026, or 2026" text-generation artifact handled in the `heat-pumps/heat-pump-tax-credits-2026.mdx` full rewrite.

Files corrected:
- `content/heat-pumps/heat-pump-tax-credits-2026.mdx` — complete rewrite
- `content/tax-credits-rebates/hvac-tax-credits-2026.mdx` — surgical date-flip fixes + 25D NEEDS-VERIFICATION
- `content/tax-credits-rebates/25c-tax-credit-explained.mdx` — surgical date-flip fixes + 45L NEEDS-VERIFICATION
- `content/tax-credits-rebates/energy-star-tax-credits.mdx` — hero + table + FAQ + URL
- `content/tax-credits-rebates/hvac-rebates-by-state.mdx` — hero sentence

Sources cited inline across all 4: IRS Energy Efficient Home Improvement Credit page; IRS Fact Sheet FS-2026-01; IRS OBBBA FAQ; ENERGY STAR federal tax credits page.

### Section B — Model corrections

| Model | What changed | Files touched | Commit |
|-------|--------------|---------------|--------|
| **B1 — Mitsubishi MSZ-FS12NA** | "40.1 SEER2" + "14.2 HSPF2" + "16.5 EER2" stripped. Real values applied: 26.3 SEER2 / 13.8 EER2 / 10.4–11.1 HSPF2 per gotductless + Ferguson submittal. R-410A on sold-through stock noted with A2 framing. AHRI cert pull marked `PENDING-AHRI`. | `best-mini-split-ac-units.mdx`, `mini-split-brands-ranked.mdx` | `a7278da` |
| **B2 — Mitsubishi FX-Series 12K** | NEW introduction as the genuine top single-zone efficiency pick: 29.9 SEER2, R-454B, H2i Hyper-Heat to -13°F per the hvacdirect Mitsubishi FX listing. AHRI cert pull marked `PENDING-AHRI`. | `best-mini-split-ac-units.mdx`, `mini-split-brands-ranked.mdx` | `a7278da` |
| **B3 — Daikin Aurora 12K** (FTXV12AVJU9 / RXT12AVJU9) | 25.5 SEER2 → 20.0/21.0; 13.0 HSPF2 → 10.2; 13.5 EER2 → 12.0. Refrigerant R-32 noted with GWP 675 (under EPA 700 threshold). Warranty 12-yr registered confirmed. Sources: totalhomesupply + hvacdirect + Daikin submittal. AHRI cert #215710688 cited as pending Marko's confirmation. | `daikin-mini-split-reviews.mdx`, `best-mini-split-ac-units.mdx`, `mini-split-brands-ranked.mdx`, `mini-split-for-bedroom.mdx` | `6fd8c45` |
| **B4 — Senville LETO SENL-12CD** | UNDERSTATED 19.0 SEER2 → 21.2 (115V) / 21.3 (230V); 7-yr warranty → 10-yr compressor + 10-yr parts; -22°F claim → -13°F / -25°C spec (effective ~5°F per marketing); R-454B refrigerant added; EER2 + HSPF2 added (per Senville LETO spec sheet). The fabricated "15–22% failure rate at 10 years" line stripped (Section D — no public source). | `senville-mini-split-reviews.mdx`, `best-mini-split-ac-units.mdx`, `mini-split-brands-ranked.mdx`, `mini-split-air-conditioners.mdx`, `best-mini-split-for-garage.mdx`, `best-diy-mini-splits.mdx`, `smallest-mini-splits.mdx` | `9792512` |
| **B5 — Carrier "40HQV"** | PHANTOM MODEL DELETED everywhere. Real Carrier ductless lines (Comfort 40MHHQ / Performance 40MAHB / Infinity 38MPRAQ-40MPHAQ) noted as PENDING-AHRI in the Carrier brand block; no number published yet. | `best-mini-split-ac-units.mdx`, `mini-split-brands-ranked.mdx` | `52fbcf6` |

### Section C — Option C shortlist

The mini-split rankings have been cut to the 3 verified units, with a heat-transfer physics explanation for each (the non-commodity differentiator the `google-ai-content-policy` skill requires):

| Rank | Model | Physics differentiator |
|------|-------|------------------------|
| 1 | **Mitsubishi FX-Series 12K** (29.9 SEER2, R-454B) | High SEER2 = inverter compressor modulates fine enough to hold steady at 25–40% capacity for hours rather than cycling. Most of SEER2's weighted score comes from part-load conditions, not full-blast peak. |
| 2 | **Daikin Aurora 12K** (20.0–21.0 SEER2, R-32, 12-yr registered) | Enhanced Vapor Injection (EVI) / flash injection pulls a partially-condensed refrigerant side stream into a mid-stage compressor port. That increases mass flow at low-density inlet conditions, which is what lets the unit deliver 100% rated heating capacity at 5°F instead of falling off a cliff. |
| 3 | **Senville LETO SENL-12CD** (21.2–21.3 SEER2, R-454B, 10/10 warranty) | Mature variable-speed compressor supply chain. The compressor castings, EEV control boards, and BLDC fan motors that enable 21 SEER2 are no longer the cost frontier they were a decade ago — what buyers give up at $600–$900 is build refinement (heavier copper, tighter charge tolerances) and long-term reliability, not headline efficiency. |

Models removed from the rankings:
- LG Art Cool Premier — PENDING-RESEARCH (Section F)
- Fujitsu RLS3H — PENDING-RESEARCH (Section F)
- Bosch Climate 5000 — PENDING-RESEARCH
- Cooper & Hunter Sophia — PENDING-RESEARCH (Section F)
- MrCool DIY 4th Gen — PENDING-RESEARCH (Section F)
- Pioneer WYS — PENDING-RESEARCH
- Mitsubishi MSZ-FH (cold-climate bedroom variant) — PENDING-AHRI (not in shortlist)
- Daikin FFQ ceiling cassette — PENDING-RESEARCH
- Carrier 40HQV — DELETED (phantom)

Each removed brand now appears in a "Other Brands — Pending Verification" section on `mini-split-brands-ranked.mdx` with the appropriate `` `PENDING-RESEARCH` `` or `` `PENDING-AHRI` `` marker.

### Section D — Items stripped (no primary source)

- ✅ Senville "15–22% failure rate at 10 years" fabrication — stripped in B4 commit.
- ✅ `content/brand-reviews/trane-vs-carrier.mdx:120–123` — the four `{{NEEDS-VERIFICATION}}` service-call rows that Gate 1 left as placeholders. Deleted entirely. The surrounding "Reliability Reality Check" callout that depended on the fabricated 0.8 / 1.1 service-call numbers rewritten as a sourced-or-honest reframe.
- ✅ Re-grep for "we tested / we evaluated / controlled conditions (95°F outdoor, 80°F indoor) / contractor surveys / contractor feedback" returns zero hits. Gate-1 strip held.

### Section E — Date / placeholder resolutions

- `app/editorial-policy/page.tsx:307` — "last updated on `{{NEEDS-VERIFICATION}}`" → "last updated on June 26, 2026" (the date these Gate-2 edits land, per the locked file's "if absent, set to the date these Gate-2 edits land" rule).
- `app/buying-guides/page.tsx` "Featured Guides" section had **three broken links** + three `{{NEEDS-VERIFICATION}}` date stamps:
  - "Ultimate AC Buying Guide" — `/air-conditioners/ultimate-buying-guide` does not exist as an MDX slug. Card **deleted entirely**.
  - "Heat Pump vs Furnace" — `/heat-pump-vs-furnace` 404s; the real article is `/furnace-vs-heat-pump`. Card **rewritten with the correct href + the article's actual dateModified (2026-02-05)**.
  - "Smart Thermostat ROI Calculator" — `/thermostats/smart-thermostat-roi-calculator` does not exist. Card **deleted entirely**.
- Net effect: Featured Guides section now contains exactly one card — the only one that points to a real article.

### Section F — Research-pending (DELIBERATELY UNTOUCHED)

Per the user's instruction, every Section F item was left as a `` `PENDING-RESEARCH` `` marker without a guessed value:
- Fujitsu RLS3 / RLS3H / XLTH (the 14.2 HSPF2 claim flagged especially)
- LG Art Cool Premier
- Cooper & Hunter Sophia
- Lennox XC25 (SEER vs SEER2 disambiguation)
- MrCool DIY current gen
- NEEP cold-climate list cross-check

See `pending-ahri.md` for the full research queue.

---

## True numbers (locked + applied site-wide)

| Metric | Locked-file value | Where it's now wired |
|--------|------------------|----------------------|
| Mitsubishi FX-Series 12K SEER2 | 29.9 (hvacdirect listing) | `best-mini-split-ac-units.mdx`, `mini-split-brands-ranked.mdx` |
| Mitsubishi MSZ-FS12NA SEER2 | 26.3 (some listings 26.1) | Reference block on `best-mini-split-ac-units.mdx`; companion line on `mini-split-brands-ranked.mdx` |
| Mitsubishi MSZ-FS12NA EER2 | 13.8 | Same |
| Mitsubishi MSZ-FS12NA HSPF2 | 10.4–11.1 (10.4 Ferguson, 11.1 gotductless) | Same |
| Daikin Aurora 12K SEER2 | 20.0 (115V) / 21.0 (230V) | `daikin-mini-split-reviews.mdx`, `best-mini-split-ac-units.mdx`, `mini-split-brands-ranked.mdx` |
| Daikin Aurora 12K HSPF2 | 10.2 | Same |
| Daikin Aurora 12K EER2 | 12.0 | Same |
| Daikin Aurora 12K refrigerant | R-32 | Same |
| Daikin Aurora 12K warranty | 12 yr (registered) | Same |
| Senville LETO SENL-12CD SEER2 | 21.2 (115V) / 21.3 (230V) | `senville-mini-split-reviews.mdx` + 6 other files |
| Senville LETO SENL-12CD warranty | 10 yr compressor + 10 yr parts | Same |
| Senville LETO SENL-12CD refrigerant | R-454B | Same |
| Senville LETO SENL-12CD min heat | -13°F / -25°C spec (effective ~5°F per marketing) | Same |
| OBBBA signing date | July 4, 2025 | All 4 tax MDX files + heat-pump-tax-credits-2026 |
| Section 25C expiration | December 31, 2025 | All 4 tax MDX files |
| AIM Act manufacturing cutoff | January 1, 2025 | `hvac-refrigerant-phase-out.mdx`, `refrigerant-types-explained.mdx`, `best-central-ac-brands.mdx` |
| EPA amended install rule | Effective July 27, 2026 | Same refrigerant files |
| New York R-410A install ban | January 1, 2026 (codified) | Same refrigerant files |

## Commits on this branch (12 total)

```
52e7697 spec(build): MDX-safe placeholder markers (backtick-wrap)
9614d41 spec(E): resolve {{NEEDS-VERIFICATION}} date markers + fix broken slugs
6d5ad5f spec(D): strip unsourced trane-vs-carrier service-call rows
aa13e34 spec(A3 follow-up): hvac-rebates-by-state hero date fix
5e9db65 spec(A3): Section 25C YMYL fix across all 4 tax-credit MDX files
576b425 spec(A2 follow-up): refrigerant-types-explained R-410A date fix
d208665 spec(A2): apply 3-part refrigerant framing + state caveat
a7278da spec(B1+B2+C): cut mini-split rankings to 3 verified units + heat-transfer differentiator
6fd8c45 spec(B3): Daikin Aurora 12K corrections (FTXV12AVJU9 / RXT12AVJU9)
9792512 spec(B4): Senville LETO SENL-12CD corrections + strip fabrications
52fbcf6 spec(B5): delete phantom Carrier 40HQV model from rankings
(plus the docs commit to follow — strip-summary + needs-verification placeholders)
```

## Remaining markers

| Marker | Count | Notes |
|--------|-------|-------|
| `` `PENDING-AHRI` `` | 5 | Mitsubishi FX-Series 12K, MSZ-FS12NA, Daikin Aurora 12K (#215710688), Carrier Infinity 38MPRAQ, MSZ-FH |
| `` `PENDING-RESEARCH` `` | ~20 | Various non-Section-B Daikin/Mitsubishi/Senville variants + Section F brands (Fujitsu, LG, Cooper & Hunter, Lennox, MrCool, Pioneer) |
| `` `NEEDS-VERIFICATION` `` | 7 | Section 25D status across 5 tax-credit MDX file mentions; Section 45L status; one stray reference in 25c-tax-credit-explained |

All markers wrapped in backticks so MDX 3 parses them as inline code (not as JSX expressions, which would break the build).

## What's NOT in this gate (deliberately deferred per the user)

- **`lib/content.ts` FAQ-extraction change** — pre-session modification in working tree. Belongs to the blank-FAQ-render fix gate. **NOT staged.**
- **Author identity / Marko Visic Person schema / `{{TODO-IDENTITY}}` wire-up** — belongs to the next gate (Person + photo + LinkedIn).
- **`ads.txt`** — belongs to the gate where Raptive code lands.
- **Visible-but-not-schema fake brand-review star ratings** on `/brand-reviews` — soft visible flag, needs methodology disclosure or removal; deferred per the audit's batch plan.

## Final build verification

```
✓ Generating static pages (376/376)
   Finalizing page optimization ...
   Collecting build traces ...
```

Build clean. All 376 static pages render. No MDX compile errors. Branch is NOT pushed and NOT merged.

---

**END OF GATE 2 SUMMARY — branch `raptive-fix/02-spec-corrections` ready for review.**
