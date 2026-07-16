# SPEC_CORRECTIONS_BATCH2_LOCKED.md — Gate 4 (remaining specs + tax YMYL)

**Status:** Primary-source verified. CC TRANSCRIBES ONLY. If a value isn't here, leave the marker; do not source or estimate.
**Resolves:** the ~20 `PENDING-RESEARCH` spec markers (Fujitsu, LG, Cooper&Hunter, Lennox, MrCool) + the 7 tax `NEEDS-VERIFICATION` markers (25D, 45L, 179D).
**Cite-on-correct:** wire the primary source alongside each corrected value. Refrigerant + min-temp come from manufacturer sheets (not AHRI certs).

---

## A. TAX YMYL — resolve all 7 `NEEDS-VERIFICATION` markers (highest stakes)

Primary sources: IRS OBBB FAQ (PL 119-21); Congress.gov CRS IN12611; IRS 25D page; ENERGY STAR federal tax credits.

### A1. Section 25D (Residential Clean Energy Credit — solar, **geothermal heat pumps**, batteries, wind)
- **Expired for property placed in service after December 31, 2025.** OBBBA repealed it for expenditures made after CY2025. The trigger is "placed in service" (installation completed) — **no grandfather, no transition relief.** A deposit paid in 2025 but installed in 2026 does NOT qualify.
- **This matters for HVAC because geothermal heat pumps were 25D-eligible.** Any page implying a 30% federal credit for a 2026 geothermal install is now FALSE.
- **Carryforward survives:** unused 25D credit from a pre-2026 qualifying install can still be carried forward to future tax years. (Genuinely useful, include it.)
- Replace every `NEEDS-VERIFICATION` on 25D with: expired after Dec 31 2025; geothermal no longer federally credited for 2026 installs; carryforward of pre-2026 credit still allowed.

### A2. Section 45L (New Energy Efficient Home Credit — builders)
- **STILL ACTIVE — terminates for homes ACQUIRED after June 30, 2026.** Do NOT lump this with the Dec-31-2025 expirations. This is a builder/developer credit ($500–$5,000), not a homeowner credit. Correct the marker to the June 30 2026 date and clarify it's a builder credit.

### A3. Section 179D (Energy Efficient Commercial Buildings Deduction) — only if referenced
- Terminates for property where construction begins after June 30, 2026. (Commercial, not residential — mention only if a page references it.)

### A4. Consistency sweep
- Anywhere a retailer-style "qualifies for a federal tax credit/rebate of up to $2,000" line was pulled into product copy (seen on LG XC25 / Lennox listings), **delete it** — that's the dead 25C claim.

---

## B. MODEL CORRECTIONS (transcribe; cite source)

### B1. Fujitsu XLTH (AIRSTAGE / Orion) — BRING BACK INTO RANKINGS at real numbers
The "14.2 HSPF2, highest of any residential unit" claim is FALSE. Real manufacturer specs:
| Spec | FALSE (site) | VERIFIED |
|---|---|---|
| HSPF2 | 14.2 ("highest") | **up to 13.3** |
| SEER2 | (varies) | **up to 33.1** (genuinely among the most efficient) |
| Min heat temp | — | **-15°F** heating operating range |
| Refrigerant | — | **R-32** |
| Warranty | — | 7yr comp / 5yr parts out-of-box; 10/10 registered; 12/12 w/ Elite contractor |
Models: 9/12/15RLS3H (and newer KZAH1 line, e.g. ASUH12KZAS / AOUH12KZAH1). Source: fujitsugeneral.com (manufacturer), generalww.com.
**Action:** correct the HSPF2 to 13.3, keep the unit as the legitimate **cold-climate efficiency pick** (33.1 SEER2 / -15°F / R-32). This is an Active, current, low-GWP unit — strongest of the bunch for cold climates.

### B2. LG Art Cool Premier 12K (LA120HYV3 / LAU120HYV3)
| Spec | FALSE (site) | VERIFIED (LG install manual) |
|---|---|---|
| SEER2 | 27.5 | **25.5** (27.0 is the 9K variant, NOT the 12K) |
| EER2 | — | 13.8 |
| HSPF2 | — | 11.2 |
| Heating | — | 100% capacity at 5°F; continuous to -13°F |
| Refrigerant | — | **R-410A** |
| Status | — | **Production Stopped** (no longer made per AIM Act) |
Source: LG installation manual (media.us.lg.com). **Label as R-410A legacy / Production Stopped**, not a current pick. Scrub any "$2,000 tax credit" retailer line.

### B3. Cooper & Hunter — fix the line CONFLATION (this is the real error)
The site attached the Hyper-Heat line's -22°F to the **Sophia**, which is wrong. Two different lines:
- **Sophia (CH-12SPH):** SEER2 **21.5**, **R-410A**, heating to ~**-13°F**. The standard line.
- **Hyper Heat / HPR (separate line):** **24 SEER2**, manufacturer-rated to **-22°F** ("works at -22°F"), R-410A.
**Action:** correct Sophia to 21.5 SEER2 / R-410A / ~-13°F. If the -22°F claim is kept anywhere, attribute it to the **C&H Hyper Heat (HPR)** line and frame as **"manufacturer-rated,"** not a bare/AHRI-tested fact. Source: cooperandhunter.us, manufacturer Amazon listings.

### B4. Lennox XC25 — do NOT publish a bare number
Sources genuinely conflict: the legacy XC25 was marketed at **26 SEER** (old metric, ENERGY STAR 2018), while several 2026 sources cite **26 SEER2**. Central-AC SEER2 is **system-match-dependent** — Lennox's own site says to consult the AHRI Directory for the exact match.
**Action:** present the XC25 as Lennox's premium variable-capacity unit marketed at **"up to 26"**, note the SEER-vs-SEER2 ambiguity, and state that exact certified efficiency depends on the indoor/outdoor match — verify the specific combo at the AHRI Directory. Use as a physics-first teaching point (why central-AC ratings are match-dependent). Do NOT assert "26 SEER2" as fact. Scrub any dead 25C "$2,000" line. (Note: Lennox now markets SL25KCV/SL28XCV as the variable-capacity flagship.)

### B5. MrCool DIY 12K — distinguish the GENERATION (the key fix)
| Generation | SEER2 | HSPF2 | Refrigerant | Min heat | Status |
|---|---|---|---|---|---|
| **DIY 4th Gen** (DIY-12-HP-WM-115C25) | **22.5** | 9.0 | **R-410A** (legacy) | -13°F | older |
| **DIY 5th Gen** (current) | **23.5** | 10.2 (R-IV) / 7.6 (R-V) | **R-454B** (current) | — | Active, cold-climate cert |
Source: MrCool manufacturer pages + gotductless + Lowe's.
**Action:** confirm which generation the site describes. Current-gen = **5th Gen, 23.5 SEER2, R-454B**. The 4th Gen is the older R-410A unit. Don't present a 4th-Gen R-410A number as if it's current.

---

## C. NEEP COLD-CLIMATE CROSS-CHECK (`best-cold-climate-heat-pumps.mdx`)
For each model named, verify it's on the NEEP Cold Climate ASHP list (neep.org/heating-electrification/ccashp-specification-product-list). Confirmed cold-climate-legit from this research: **Fujitsu XLTH** (-15°F), **Mitsubishi MSZ-FS/FH H2i** (-13°F), **LG Art Cool Premier** (continuous to -13°F). Any model that can't be confirmed on the NEEP list → mark `PENDING-RESEARCH`, don't assert.

---

## D. RULES FOR CC
1. Transcribe only from this file; cite the primary source alongside each corrected value.
2. Resolve all 7 tax `NEEDS-VERIFICATION` markers per §A (25D expired / 45L alive to Jun 30 2026 / 179D commercial).
3. Apply B1–B5; label R-410A/Production-Stopped units honestly; never present legacy specs as current.
4. For Lennox XC25, do not publish a bare number — use the "up to 26 / verify at AHRI / match-dependent" framing.
5. Re-grep: `PENDING-RESEARCH` and `NEEDS-VERIFICATION` counts should drop toward 0 (any leftover must be a model with no primary source found — keep its marker).
6. Branch off the latest gate. Small commits, no push. Re-run build (376 pages).
