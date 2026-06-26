# cert-patch-summary.md — Gate 2b / Branch `raptive-fix/02b-ahri-certs`
**Date:** 2026-06-26
**Branch:** `raptive-fix/02b-ahri-certs` (thin branch off `raptive-fix/02-spec-corrections`; 2 commits; NOT pushed, NOT merged)
**Build:** ✅ `npm run build` passes — 376 static pages generated, no errors
**Source of truth:** `AHRI_CERT_PATCH.md` — official AHRI Certificate of Product Ratings PDFs are the gold-tier source; AHRI cert wins over any prior value. Refrigerant is NOT on AHRI certs, so manufacturer-sourced refrigerant values were kept as-is.

---

## What changed

### §1 — AHRI cert wiring (two `PENDING-AHRI` markers resolved)

**Daikin Aurora 12K (FTXV12AVJU9 / RXT12AVJU9)** — `PENDING-AHRI` → **AHRI Certified Ref# 215710688, status Active**

| Spec | Value | Notes |
|------|-------|-------|
| SEER2 | **20.00** | matches Gate 2 v1 locked value exactly — promoted from manufacturer-spec to AHRI-cert-verified |
| EER2 (AFull, 95°F) | **12.00** | matches v1 |
| HSPF2 (Region IV) | **10.20** | matches v1 |
| Cooling capacity (AFull) | 10,600 BTU | (was 12,000 BTU in v1; corrected to AHRI cert) |
| Heating capacity (H1Nom, 47°F) | 13,500 BTU | (was 13,600 BTU in v1; corrected to AHRI cert) |
| Refrigerant | R-32 | manufacturer-sourced, kept |
| Warranty | 12 years registered | unchanged |

Cert# wired inline as `AHRI Certified Ref# 215710688` wherever the spec appears (4 files).

**Mitsubishi MSZ-FS12NA (MUZ-FS12NAH / MSZ-FS12NA)** — `PENDING-AHRI` → **AHRI Certified Ref# 209832204, status Production Stopped**

| Spec | Value | Notes |
|------|-------|-------|
| SEER2 | **26.30** ← current-standard figure | NOT 26.10 SEER (legacy metric); never publish 26.1 as the headline |
| EER2 (AFull, 95°F) | **13.80** | matches v1 locked value |
| HSPF2 (Region IV) | **10.40** ← settles 10.4 vs 11.1 question | use 10.4 per AHRI cert; v1 said "10.4–11.1" with 10.4 from Ferguson — now settled |
| Cooling capacity (AFull) | 12,000 BTU | matches v1 |
| Heating capacity (H1Nom, 47°F) | 12,300 BTU | new from AHRI cert |
| Refrigerant | R-410A | manufacturer-sourced, kept (the phased-out refrigerant) |
| **Status** | **Production Stopped** — still sold from existing distributor inventory, no longer manufactured | new labeling per locked file |

Cert# wired inline as `AHRI Certified Ref# 209832204` and the "Production Stopped" caveat wired into every prose mention.

### §2 — Shortlist reorder

**New order** (by certification status + current availability, not just headline SEER2):

| Rank | Model | Verified headline | Refrigerant | Status / Source |
|------|-------|-------------------|-------------|------------------|
| **#1 — Best overall (cert-verified, current)** | Daikin Aurora 12K | 20.0 SEER2 · 12.0 EER2 · 10.2 HSPF2 · -13°F | R-32 | **Active** · AHRI Certified Ref# 215710688 |
| **#2 — Best budget** | Senville LETO SENL-12CD | 21.2 / 21.3 SEER2 · 10/10 warranty · -13°F spec | R-454B | Manufacturer spec sheet |
| **#3 — Highest SEER2 (being phased out)** | Mitsubishi MSZ-FS12NA | 26.3 SEER2 · 13.8 EER2 · 10.4 HSPF2 · -13°F (H2i) | R-410A | **Production Stopped** · AHRI Certified Ref# 209832204 |

Rationale wired into hero prose, both ranking files, and FAQ items: Mitsubishi has the highest certified SEER2 but is ranked third because (a) the AHRI cert lists it as Production Stopped, and (b) it runs the phased-out R-410A. The Daikin Aurora leads because it's Active and on R-32 (the current low-GWP refrigerant).

### §3 — FX-Series removed entirely

The Mitsubishi FX-Series 12K previously held the #1 slot at "29.9 SEER2 per the hvacdirect listing". A distributor listing is not the same as an AHRI certificate, and the site's stated sourcing bar (AHRI cert PDF or manufacturer spec sheet) was not met. **Removed from all rankings + Quick Picks tables + key takeaways + every FAQ that cited it.**

In its place, the transparency sentence from §3 of the locked file is wired into both ranking pages:

> *"Mitsubishi markets higher-efficiency current-generation models (such as the FX line). We don't yet have the AHRI certificate to publish verified figures for those units, so we don't rank them here until we can cite certified ratings. Distributor listings and marketing pages are not a sufficient source for this site — only AHRI Certificate of Product Ratings PDFs or the manufacturer's published spec sheet meet the bar."*

The FX-Series `PENDING-AHRI` marker is removed.

### §4 — Markers retained

Per the locked file, two `PENDING-AHRI` markers stay in place (not in this batch):
- **Carrier Infinity 38MPRAQ / 40MPHAQ** (`PENDING-AHRI`)
- **Mitsubishi MSZ-FH** cold-climate variant (`PENDING-AHRI`)

---

## Files touched (4 MDX + 1 CSV)

| File | Change |
|------|--------|
| `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx` | Full rewrite — reorder (Aurora #1, Senville #2, MSZ-FS12NA #3), Aurora + MSZ-FS cert# inline, Production Stopped label, FX-Series removed, transparency sentence added |
| `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx` | Full rewrite — same reorder + cert wiring + FX removal + transparency |
| `content/mini-split-air-conditioners/daikin-mini-split-reviews.mdx` | Aurora 12K cert# wired inline (4 places: series-overview table, deep-dive spec table, key takeaways, FAQ items); "pending pull" language removed; status: Active; cooling/heating capacity values updated to AHRI cert figures (10,600 / 13,500 BTU) |
| `content/mini-split-air-conditioners/mini-split-in-cold-climates.mdx` | Stale FX-Series FAQ ref replaced with cert-verified Aurora + MSZ-FS12NA Production-Stopped caveat |
| `spec-verification.csv` | 28 rows updated: Daikin Aurora rows → `gate2_status = AHRI-VERIFIED`, `gate2_notes` prefixed with `AHRI Certified Ref# 215710688 (status Active)`. MSZ-FS rows → `gate2_status = AHRI-VERIFIED`, `gate2_notes` prefixed with `AHRI Certified Ref# 209832204 (status Production Stopped)`. |

---

## Marker counts before / after

| Marker | Gate 2 closing count | Gate 2b closing count | Change |
|--------|----------------------|------------------------|--------|
| `PENDING-AHRI` | 5 (FX-Series, MSZ-FS12NA, Aurora 12K, Carrier Infinity, MSZ-FH) | **2** (Carrier Infinity, MSZ-FH) | **−3 resolved** |
| `PENDING-RESEARCH` | ~20 | ~20 (unchanged — Section F not touched per locked file) | 0 |
| `NEEDS-VERIFICATION` | 7 (Section 25D, 45L) | 7 (unchanged — tax-credit YMYL untouched) | 0 |

Resolved by this patch:
- ✅ Daikin Aurora 12K — `PENDING-AHRI` → cert# wired (Ref# 215710688)
- ✅ Mitsubishi MSZ-FS12NA — `PENDING-AHRI` → cert# wired (Ref# 209832204)
- ✅ Mitsubishi FX-Series 12K — `PENDING-AHRI` → model removed entirely + transparency sentence

Still pending (per locked file §4):
- 🟡 Carrier Infinity 38MPRAQ / 40MPHAQ — `PENDING-AHRI`
- 🟡 Mitsubishi MSZ-FH cold-climate variant — `PENDING-AHRI`

---

## What's NOT in this gate (per the user's hard rules)

- **`lib/content.ts`** — pre-session FAQ-extraction modification still in working tree, NOT staged (deferred to the render-fix gate)
- **`{{TODO-IDENTITY}}` author wiring** — next gate
- **`ads.txt`** — later gate
- **Section F `PENDING-RESEARCH` brands** (Fujitsu, LG, Cooper & Hunter, Lennox XC25, MrCool DIY, Pioneer, NEEP cross-check) — explicitly untouched per locked file

---

## Build verification

```
✓ Generating static pages (376/376)
   Finalizing page optimization ...
   Collecting build traces ...
```

Build clean. All 376 static pages render. No MDX compile errors. Branch is NOT pushed and NOT merged.

---

## Commits on this branch (2 total in this gate)

```
3bdae77 spec(AHRI): wire cert#s, reorder shortlist, remove FX-Series
(plus this docs commit)
```

**END OF GATE 2B SUMMARY.**
