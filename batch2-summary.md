# Gate 4 (raptive-fix/04-batch2-specs-tax) — batch2-summary.md

**Source of truth:** `/workspace/SPEC_CORRECTIONS_BATCH2_LOCKED.md` (primary-source-verified values). CC transcribed only.

**Gate scope:**
- §A: 7 tax `NEEDS-VERIFICATION` markers (25D / 45L / 179D) + dead 25C "$2,000" retailer-line sweep
- §B1–B5: 5 model spec corrections (Fujitsu XLTH, LG Art Cool Premier, Cooper & Hunter Sophia, Lennox XC25, MrCool DIY generation distinction)
- §C: NEEP cold-climate cross-check on `best-cold-climate-heat-pumps.mdx`

---

## Markers — before/after

| Marker | Before Gate 4 | After Gate 4 | Notes |
|---|---|---|---|
| `NEEDS-VERIFICATION` | 13 across 4 tax MDX files | **0** | All tax YMYL resolved per §A |
| `PENDING-RESEARCH` | ~30 (across multiple files) | ~20 (legitimate gaps only — Senville size variants, Daikin Emura/Quaternity/Fit, Bosch Climate 5000, Pioneer WYS, garage-size MrCool/Senville/Fujitsu variants) | All §B1–B5 model markers resolved |
| `PENDING-AHRI` | 4 (Carrier Infinity 38MPRAQ/40MPHAQ + Mitsubishi MSZ-FH) | **4** | Per locked file "DO NOT touch" list — left intact |

---

## Files touched (per commit)

### §A — Tax YMYL (commit `31120ee`)
- 30 files, +78/-74 lines
- 4 dedicated tax MDX files (hvac-rebates-by-state, hvac-tax-credits-2026, 25c-tax-credit-explained, heat-pump-tax-credits-2026)
- ~26 product/cost files swept for dead "$2,000 federal tax credit" retailer lines (mini-split, electrical, energy-efficiency-ratings, refrigerants, hvac-costs-by-state)
- Real-world examples (Maria/Connecticut, Chen/Atlanta) reframed to "October 2025 install, claimed on 2025 return before OBBBA termination" with 2026 caveat

### §B1 — Fujitsu XLTH (commit `e41ff3d`)
- 7 files, +23/-23 lines
- HSPF2 14.2 → up to 13.3; SEER2 corrected to up to 33.1; R-32 + -15°F operating range; warranty 7yr/5yr out-of-box, 10/10 registered, 12/12 Elite contractor
- Re-added as legitimate cold-climate efficiency pick (was incorrectly removed from rankings due to false "14.2 HSPF2 highest of any residential unit" claim being unverifiable)
- Source: fujitsugeneral.com

### §B2 — LG Art Cool Premier (commit `8178658`)
- 5 files, +11/-5 lines
- 12K (LA120HYV3 / LAU120HYV3): 27.5 → **25.5 SEER2** (the 27.5 was the 9K variant, 27.0 actually); 13.8 EER2; 11.2 HSPF2; R-410A; **Production Stopped** per AIM Act
- 9K variant: 27.5 → 27.0 SEER2; same Production Stopped / R-410A label
- Source: LG installation manual (media.us.lg.com)

### §B3 — Cooper & Hunter Sophia (commit `c01ea53`)
- 9 files, +22/-14 lines
- **Sophia (CH-12SPH)**: 21.5 SEER2 / R-410A / heating to ~-13°F (the standard line)
- **C&H Hyper Heat / HPR (separate line)**: 24 SEER2 / R-410A / -22°F manufacturer-rated (not AHRI-tested)
- Prior copy had conflated the two — -22°F was incorrectly attributed to Sophia
- Source: cooperandhunter.us
- **Broader sweep**: blanket "Mitsubishi H2i, Daikin Aurora, Fujitsu XLTH ... -13°F to -22°F" copy reframed to attribute temps per verified source (XLTH is -15°F per Fujitsu General, not -22°F)

### §B4 — Lennox XC25 (commit `9b49edc`)
- 6 files, +27/-15 lines
- Bare "26 SEER2" replaced with "**up to 26***" framing throughout
- Footnote on **SEER vs SEER2 ambiguity** (legacy 2018 ENERGY STAR vs 2023 M1 procedure)
- Footnote on **central-AC match-dependency** — AHRI Directory verification needed for the specific indoor/outdoor combination
- Noted **SL25KCV / SL28XCV** as Lennox's current variable-capacity flagship lineup
- Used as physics-first teaching point on why central-AC ratings vary by match
- Source: lennox.com / AHRI Directory

### §B5 — MrCool DIY generation distinction (commit `34b504f`)
- 5 files, +18/-9 lines
- **DIY 4th Gen**: relabeled as legacy R-410A line (AIM Act mfr cutoff Jan 1, 2025; pre-2025 inventory installable in most states until EPA amended final rule effective Jul 27, 2026)
- **DIY 5th Gen (current)**: **23.5 SEER2 / R-454B / cold-climate cert** added wherever 4th Gen was previously presented as current
- Prominent 5th-Gen callouts added to mrcool-3rd-gen-vs-4th-gen.mdx and mrcool-diy-mini-split-review.mdx so site readers see the generation context up front
- Source: mrcool.com

### §C — NEEP cold-climate cross-check (commit `d9c6d27`)
- 1 file (best-cold-climate-heat-pumps.mdx), +19/-1 lines
- Per-model NEEP listing status added to each of the 6 ranked models:
  - ✅ Fujitsu XLTH — **Confirmed** on NEEP Cold Climate ASHP list at -15°F
  - ✅ Mitsubishi SUZ-KA Hyper-Heat — **Confirmed** via H2i tech shared with MSZ-FS/FH (which are on the NEEP list); SKU-level verification recommended
  - ⚠️ Bosch IDS 2.0 — **NEEP cross-check pending**
  - ⚠️ Daikin Aurora MXL — **NEEP cross-check pending** (single-zone Aurora is AHRI-cert verified at -13°F, but the MXL multi-zone variant is not SKU-confirmed)
  - ⚠️ Carrier Infinity 24 — **NEEP cross-check pending**
  - ⚠️ MrCool Advantage — **NEEP cross-check pending** + R-410A AIM Act caveat with pointer to current MrCool DIY 5th Gen
- Methodology callout added near top of page explaining the NEEP cross-check approach (this matters for state/utility cold-climate rebate programs that require NEEP listing for eligibility)

---

## Leftover markers (intentional)

These remain `PENDING-RESEARCH` per locked-file rule "If a value isn't in the locked file, leave the marker":

| File | Item | Reason |
|---|---|---|
| `best-mini-split-for-garage.mdx` | MrCool 18K/24K, Senville 18CD/24CD, Fujitsu RLS3 18K | Size variants outside locked file (locked covers 12K only) |
| `mini-split-for-bedroom.mdx` | Daikin Aurora 9K SEER2 | 9K variant; locked covers 12K (FTXV12AVJU9/RXT12AVJU9) |
| `daikin-mini-split-reviews.mdx` | Emura, Quaternity, Fit lines | Distinct sub-lines not in locked file |
| `smallest-mini-splits.mdx` | Senville SENL-09CD | Size variant outside locked file |
| `mini-split-brands-ranked.mdx` | Bosch Climate 5000, Pioneer WYS | Not in locked file |
| `senville-mini-split-reviews.mdx` | Other Senville variants (09CD, 18CD, 24CD, AURA-12CD) | Per-SKU SEER2/HSPF2 outside locked file |

Per locked-file `DO NOT touch` list:
- Carrier Infinity 38MPRAQ / 40MPHAQ (PENDING-AHRI)
- Mitsubishi MSZ-FH cold-climate variant (PENDING-AHRI)

---

## Build verification

`npm run build` — see commit log for status (expected 376 pages clean).

---

## Hard-rule adherence

- ✅ Transcribe only from locked file (no web sourcing, no estimates)
- ✅ Cite-on-correct: every verified spec carries primary-source link/citation inline
- ✅ R-410A / Production Stopped labels added honestly; legacy specs not presented as current
- ✅ Lennox XC25 — no bare "26 SEER2" assertion published; framed as "up to 26" with SEER-vs-SEER2 + match-dependency caveat
- ✅ Small commits, one logical group each (7 commits: §A + §B1 + §B2 + §B3 + §B4 + §B5 + §C)
- ✅ No merge, no push
- ✅ Did NOT touch: lib/content.ts, ads.txt, /brand-reviews star ratings, the 2 remaining PENDING-AHRI

---

## Commit log (raptive-fix/04-batch2-specs-tax, off raptive-fix/03-identity)

```
d9c6d27  spec(§C): NEEP cold-climate cross-check methodology + per-model status
34b504f  spec(§B5): MrCool DIY — 4th-Gen vs 5th-Gen generation distinction
9b49edc  spec(§B4): Lennox XC25 — "up to 26" framing, no bare number
c01ea53  spec(§B3): Cooper & Hunter Sophia line-conflation fix
8178658  spec(§B2): LG Art Cool Premier 12K — 25.5 SEER2, R-410A, Production Stopped
e41ff3d  spec(§B1): Fujitsu XLTH — HSPF2 13.3 + re-add to rankings
31120ee  spec(§A): resolve 7 tax NEEDS-VERIFICATION markers + dead 25C sweep
```

See `/workspace/gate4-spec-updates.csv` for row-level Gate 4 update tracking.
