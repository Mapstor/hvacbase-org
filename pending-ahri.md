# pending-ahri.md — Models still needing AHRI cert pull or primary-source research
**Branch:** `raptive-fix/02-spec-corrections`
**Generated:** 2026-06-26

This file lists every model on the site whose published specs need verification before the next gate. Each row gives the **model number**, the **specs needed**, the **AHRI Directory search term** (or other primary source), and the **current site location** so Marko can find it fast.

There are two flavors:
- **`PENDING-AHRI`** — the model is real and on the shortlist (or in a brand block we kept). Just pull the AHRI cert ID and gold-tier the existing spec.
- **`PENDING-RESEARCH`** — the model has prior unverified site claims. Verify or cut before the model returns to the shortlist.

---

## Section 1 — `PENDING-AHRI` (verified-but-needs-cert) — Marko: pull these first

### Mitsubishi FX-Series 12K (new top single-zone pick)
- **Model number candidates:** MUFZ-FX12NA, MSZ-FX12NA (Marko: confirm exact SKU on Mitsubishi catalog or distributor listing)
- **Specs needed:** SEER2 (site cites 29.9 from hvacdirect listing — confirm via AHRI cert); HSPF2; EER2; AHRI cert reference number
- **AHRI Directory search:** "Mitsubishi FX-Series 12K" or by indoor unit model number
- **Site locations (Gate 2 wired):**
  - `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx` (#1 pick block)
  - `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx` (#1 Mitsubishi brand block)

### Mitsubishi MSZ-FS12NA / MUZ-FS12NA (the "40.1" unit — real specs published, AHRI cert pending)
- **Current verified specs (per locked file B1):** SEER2 26.3 (some listings 26.1); EER2 13.8; HSPF2 10.4–11.1 (use 10.6; Ferguson submittal-aligned = 10.4); Min heat -13°F (H2i); Refrigerant R-410A (sold-through FS stock); Warranty 5/7 standard, 12 yr w/ Diamond Contractor install
- **Specs needed:** AHRI cert reference number to gold-tier
- **AHRI Directory search:** "MUZ-FS12NAH" + "MSZ-FS12NA"
- **Site locations:**
  - `content/mini-split-air-conditioners/best-mini-split-ac-units.mdx` (Reference block on the previously-claimed 40.1 unit)
  - `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx` (Companion line under Mitsubishi)

### Daikin Aurora 12K (FTXV12AVJU9 / RXT12AVJU9)
- **Current verified specs (per locked file B3):** SEER2 20.0 (115V) / 21.0 (230V); HSPF2 10.2; EER2 12.0; Min heat -13°F; Min cool (low-ambient) -4°F w/ field setting; Refrigerant R-32; Warranty 12 years registered
- **Specs needed:** Confirm AHRI cert #215710688 (cited in CC's audit; not yet confirmed via the live AHRI Directory)
- **AHRI Directory search:** "FTXV12AVJU9" or "RXT12AVJU9" — or by AHRI cert #215710688
- **Site locations:** `daikin-mini-split-reviews.mdx`, `best-mini-split-ac-units.mdx`, `mini-split-brands-ranked.mdx`

### Senville LETO SENL-12CD
- **Status:** **Manufacturer spec sheet verified (no AHRI pull strictly required for the headline values)** — the spec sheet is the authoritative manufacturer source. AHRI cert listing is available on senville.com product page for additional confirmation if Marko wants it.
- **Current verified specs (per locked file B4):** SEER2 21.2 (115V) / 21.3 (230V); EER2 10.1 (115V) / 10.8 (230V); HSPF2 8.7 (Region IV) / 6.7 (Region V); Min heat -13°F / -25°C spec, effective ~5°F per marketing; Refrigerant R-454B; Warranty 10 yr compressor + 10 yr parts
- **Optional:** pull AHRI cert reference number from senville.com product page

### Carrier Infinity 38MPRAQ / 40MPHAQ (real Carrier ductless line — replaces the phantom 40HQV)
- **Specs needed:** SEER2 (manufacturer-published efficiency tops the low-20s on Infinity per locked file; no number published until AHRI cert pulled); HSPF2; EER2; Refrigerant
- **AHRI Directory search:** "Carrier 38MPRAQ" or "Carrier Infinity ductless"
- **Site locations:** `content/mini-split-air-conditioners/mini-split-brands-ranked.mdx` (Carrier section)

### Mitsubishi MSZ-FH (cold-climate H2i — referenced as the cold-climate flagship across multiple files)
- **Specs needed:** SEER2 (prior site claim: 33.1); HSPF2 (prior: 13.5); refrigerant (locked file says current new Mitsubishi lineup is R-454B; MSZ-FH continuing as R-410A unverified)
- **AHRI Directory search:** "Mitsubishi MSZ-FH12NA" + "MUZ-FH12NAH"
- **Site locations:** spec-verification.csv lines 109, 123–125

---

## Section 2 — `PENDING-RESEARCH` (Section F — verify or cut before next gate)

These models have prior unverified site claims that this gate deliberately did not touch (per the locked file's hard rule).

### Fujitsu
- **RLS3H** — prior claim 33.0 SEER2 / 14.0 HSPF2 / -15°F. Verify per SKU before re-listing as ranking. AHRI Directory search: "Fujitsu RLS3H 12K" (cite by full model number e.g. ASU12RLS3Y / AOU12RLS3Y).
- **XLTH** — prior claim 14.2 HSPF2 ("highest of any residential unit we tested"). **14.2 HSPF2 exceeds every certified mini-split currently in market** — almost certainly false. Must be corrected or the model cut from `content/heat-pumps/best-cold-climate-heat-pumps.mdx`.

### LG
- **Art Cool Premier 12K** — prior claim 27.5 SEER2. Verify via AHRI cert. Search: "LG Art Cool Premier 12K" or by model number "LAU120HYV1" / "LSU120HSV5" / similar.
- **Art Cool Mirror / Gallery** — design-variant SKUs of the same compressor family; same AHRI lookup approach.

### Cooper & Hunter
- **Sophia 12K** — prior claim 23.0 SEER2 / -22°F. **-22°F is not on any spec sheet we've seen** — almost certainly marketing hyperbole. Verify SEER2 via AHRI; cut or qualify the -22°F claim.
- Site locations: `mini-split-brands-ranked.mdx` (Cooper&Hunter section), `best-diy-mini-splits.mdx` (rank #4).

### Lennox XC25 (central AC)
- **Prior claim:** 26 SEER2.
- **Reality (likely):** 26 SEER (the old, pre-SEER2 rating); SEER2 equivalent is ~22–24.
- **Action:** verify and clarify SEER vs SEER2 in body of `content/hvac-brands/best-central-ac-brands.mdx`.

### MrCool DIY (current gen)
- **Specs needed:** SEER2, HSPF2, min heat temp, refrigerant, warranty for the current 4th-Gen DIY 12K SKU. Locked file lists it as optional 4th shortlist pick.
- AHRI Directory search: "MrCool DIY 12K" or by model number "DIY-12-HP-WMAH-230" or similar (verify current SKU code on mrcool.com).

### Pioneer WYS
- **Specs needed:** SEER2 (prior claim 21.5), HSPF2, min heat, refrigerant. Verify per current WYS SKU on AHRI.

### NEEP cold-climate ASHP list cross-check
- **Action:** for every model named in `content/heat-pumps/best-cold-climate-heat-pumps.mdx`, verify the model is still on the NEEP Cold Climate ASHP Product List. Some named models may be delisted.
- **NEEP source:** https://neep.org/heating-electrification/ccashp-specification-product-list

---

## Section 3 — Tax-credit YMYL items needing IRS verification

Three open items left as `NEEDS-VERIFICATION` in MDX inline code spans (i.e. `` `NEEDS-VERIFICATION` ``):

- **Section 25D (Residential Clean Energy Credit)** — post-OBBBA status for 2026 installs. Locked file only verifies Section 25C. Verify against the IRS Section 25D page: https://www.irs.gov/credits-deductions/residential-clean-energy-credit
- **Section 45L (New Energy Efficient Home Credit, for builders)** — post-OBBBA status. Verify against the IRS Section 45L page.
- One stray reference in `content/tax-credits-rebates/25c-tax-credit-explained.mdx` to 45L expiration date.

---

## Section 4 — Other models flagged by the original CSV but not in the locked file

The original `spec-verification.csv` Gate-0 audit flagged additional rows that this gate did not touch. Marko: search the CSV for `gate2_status = PENDING-RESEARCH` rows for the full list. Notable:

- **Mitsubishi MSZ-GL, MSZ-EF, MLZ-KP, SEZ-KD** — various non-flagship Mitsubishi lines listed in `mini-split-brands-ranked.mdx` with PENDING SEER2 values.
- **Daikin Emura, Quaternity, Fit, ceiling cassette, slim duct** — non-Aurora Daikin lines. Already marked `PENDING-RESEARCH` in `daikin-mini-split-reviews.mdx` and `mini-split-brands-ranked.mdx`.
- **Senville SENL-09CD, SENL-18CD, SENL-24CD, AURA-12CD** — non-12CD Senville SKUs. Already marked `PENDING-RESEARCH` in `senville-mini-split-reviews.mdx`, `smallest-mini-splits.mdx`, `best-mini-split-for-garage.mdx`.

---

## How to update this list after pulling each AHRI cert

1. Search the AHRI Directory at https://www.ahridirectory.org for the model number.
2. Capture the **AHRI Reference Number** and the **certified SEER2 / HSPF2 / EER2 / min heat temp / refrigerant**.
3. Replace the `` `PENDING-AHRI` `` or `` `PENDING-RESEARCH` `` marker in the affected file with the verified value, and add a source citation: "AHRI Cert #XXXXXXX".
4. Update `spec-verification.csv` row's `gate2_status` from PENDING → VERIFIED.
5. Cross out the row in this file.

Counts at end of Gate 2:
- `PENDING-AHRI`: **5** models (FX-Series 12K, MSZ-FS12NA, Aurora 12K, Carrier Infinity 38MPRAQ, MSZ-FH)
- `PENDING-RESEARCH`: **6** brands' worth (Fujitsu RLS3H/XLTH, LG Art Cool, Cooper & Hunter Sophia, Lennox XC25, MrCool DIY, Pioneer WYS) + NEEP list cross-check + several non-Section-B Daikin/Mitsubishi/Senville variants
- Tax-credit YMYL: 3 items (25D, 45L, 45L date)
