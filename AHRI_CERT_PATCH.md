# AHRI_CERT_PATCH.md — cert-backed updates on top of Gate 2

**Status:** AHRI-VERIFIED. These values come directly from official AHRI Certificate of Product Ratings PDFs (held by Marko). This is the gold-tier source — where any earlier value differs, **the AHRI cert wins**.
**Applies on top of:** branch `raptive-fix/02-spec-corrections` (Gate 2 already applied). This patch resolves 3 of the 5 `PENDING-AHRI` markers and removes the one uncertified pick.
**Transcribe only.** Do not source or estimate. Refrigerant is NOT on AHRI certs — keep the manufacturer-sourced refrigerant values already in the repo.

---

## 1. AHRI-VERIFIED VALUES (replace `PENDING-AHRI` markers + wire cert # as citation)

### Daikin Aurora 12K — **AHRI Ref# 215710688** — Status: **Active**
Outdoor `RXT12AVJU*` / Indoor `FTXV12AVJU*`, Series AURORA. Standard: AHRI 210/240-2024.
| Spec | AHRI-certified value |
|---|---|
| SEER2 | **20.00** |
| EER2 (AFull, 95°F) | **12.00** |
| HSPF2 (Region IV) | **10.20** |
| Cooling capacity (AFull) | 10,600 BTU |
| Heating capacity (H1Nom, 47°F) | 13,500 BTU |
| Refrigerant (manufacturer-sourced, keep) | R-32 |
Citation to wire inline: **"AHRI Certified Ref# 215710688"**. These match the v1 locked values exactly — promote confidence to AHRI-verified.

### Mitsubishi MSZ-FS12NA — **AHRI Ref# 209832204** — Status: **Production Stopped**
Outdoor `MUZ-FS12NAH***` / Indoor `MSZ-FS12NA***`, Series M-Series. Standard: AHRI 210/240-2024.
| Spec | AHRI-certified value |
|---|---|
| **SEER2** | **26.30** ← use this (current metric) |
| EER2 (AFull, 95°F) | **13.80** |
| HSPF2 (Region IV) | **10.40** ← settles the 10.4 vs 11.1 question; use 10.4 |
| Cooling capacity (AFull) | 12,000 BTU |
| Heating capacity (H1Nom, 47°F) | 12,300 BTU |
| (legacy metric, do NOT publish as the headline) | SEER 26.10 / HSPF 12.00 |
| Refrigerant (manufacturer-sourced, keep) | R-410A |
Citation to wire inline: **"AHRI Certified Ref# 209832204"**.
**IMPORTANT labeling:** model status is **Production Stopped** — still sold from existing inventory but no longer manufactured. Prose must say so; do NOT imply current production. Do NOT publish the legacy "26.1 SEER" as the headline — the current-standard figure is **26.3 SEER2**.
(Cobranded twins, same specs, for reference only — do not list separately: Trane `NTXWPH12B112A*` Ref# 213879427; American Standard `NAXWPH12B112A*` Ref# 213879422.)

### Senville LETO SENL-12CD — manufacturer-spec verified (no AHRI pull required)
Unchanged from v1 locked file: SEER2 21.2 (115V) / 21.3 (230V), EER2 10.1/10.8, HSPF2 8.7 (R-IV) / 6.7 (R-V), min heat -13°F/-25°C spec (effective ~5°F per marketing), R-454B, 10yr compressor / 10yr parts. Source: Senville LETO spec sheet (AHRI cert available on senville.com if belt-and-suspenders wanted).

---

## 2. SHORTLIST REORDER (mini-split rankings — replace the v1 order)

New order, chosen by **certification status + current availability**, not just headline SEER2:

| Rank / role | Model | Verified specs | Source |
|---|---|---|---|
| **#1 — Best overall (cert-verified, current)** | Daikin Aurora 12K | 20.0 SEER2 / 12.0 EER2 / 10.2 HSPF2, R-32, 12yr registered, Active | **AHRI Ref# 215710688** |
| **#2 — Best budget** | Senville LETO SENL-12CD | 21.2/21.3 SEER2, R-454B, 10/10 warranty, -13°F (eff. 5°F) | Manufacturer spec sheet |
| **#3 — Highest SEER2 (being phased out)** | Mitsubishi MSZ-FS12NA | 26.3 SEER2 / 13.8 EER2 / 10.4 HSPF2, R-410A, **Production Stopped** | **AHRI Ref# 209832204** |

Rationale to reflect in prose, honestly: the Mitsubishi has the highest certified SEER2 (26.3) but is **Production Stopped** and runs R-410A (the phased-out refrigerant), so it's ranked third despite the top efficiency number. The Daikin leads because it's AHRI-certified, **Active**, and on the current low-GWP refrigerant (R-32). This is a transparency-positive ordering and should be explained as such.

Keep the existing heat-transfer differentiator prose for each (EVI/flash-injection for Daikin; mature variable-speed supply chain for Senville; for the Mitsubishi, its high SEER2 reflects a large heat-exchanger area and fine low-speed modulation — but pair it with the Production-Stopped/R-410A caveat).

---

## 3. REMOVE the FX-Series + add the transparency line (resolves the uncertified pick)

- **Remove the Mitsubishi FX-Series 12K from the rankings entirely.** Its 29.9 SEER2 came from a distributor listing, not an AHRI certificate, so it does not meet the site's sourcing standard.
- In its place, add ONE honest sentence (this is a trust asset, not an apology), e.g.:
  > *"Mitsubishi markets higher-efficiency current-generation models (such as the FX line). We don't yet have the AHRI certificate to publish verified figures for those units, so we don't rank them here until we can cite certified ratings."*
- Delete the `PENDING-AHRI` marker for FX-Series; replace with the sentence above.

---

## 4. MARKER CLEANUP

- `PENDING-AHRI` for Daikin Aurora, MSZ-FS12NA → **RESOLVED** (cert #s above). Remove markers, wire cert citations.
- `PENDING-AHRI` for FX-Series → **REMOVED** (model pulled, transparency line added).
- `PENDING-AHRI` for Carrier Infinity 38MPRAQ and MSZ-FH → **leave as-is** (not in shortlist; still pending).
- Update `spec-verification.csv`: Daikin Aurora + MSZ-FS12NA rows → status `AHRI-VERIFIED` with the cert #s in notes.

---

## 5. RULES FOR CC

1. Transcribe only from this file. AHRI cert wins over any prior value.
2. Wire the cert number inline as the citation wherever the spec appears ("AHRI Certified Ref# …").
3. Label MSZ-FS12NA as **Production Stopped** everywhere it's presented; never imply current production; never publish 26.1 SEER as the headline (use 26.3 SEER2).
4. Apply on the Gate-2 branch (or a thin `raptive-fix/02b-ahri-certs` branch off it). Small commits, no push.
5. Re-run the build; confirm 376 pages still compile.
