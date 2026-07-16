# SPEC_CORRECTIONS_LOCKED.md — Gate 2, Batch 1 (mini-splits + cross-cutting)

**Status:** Primary-source verified. CC TRANSCRIBES ONLY — do not source, estimate, or invent any value. If a value you need is not in this file, mark it `{{PENDING-RESEARCH}}` and log it; do NOT fill it from memory or the open web.
**Sourcing standard:** every locked value below is tied to a manufacturer spec sheet / submittal or manufacturer-published distributor listing. Rows marked `PENDING-AHRI` need the AHRI Directory cert ID pulled by Marko/browser before they're considered gold-tier.
**Scope of this batch:** the mini-split cluster (the large majority of WRONG rows in `spec-verification.csv`) + the cross-cutting refrigerant and tax fixes + the Carrier phantom. Other categories (Fujitsu fine detail, LG, Cooper&Hunter, Lennox XC25, brand-review service figures) are in **Section F — Batch 2 research-pending**; do not guess them.

---

## A. CROSS-CUTTING FACTS (apply everywhere these topics appear)

### A1. The "40 SEER2" fabrication — canonical truth
**No residential mini-split achieves 40 SEER2.** The market ceiling is ~33–35 SEER2. Any sentence stating, implying, or ranking a unit at ~40 SEER2 is false and must be corrected to the real value (below) or cut. Replace all "industry-leading 40.1 SEER2 / highest certified efficiency" framing with the true top performers.

- Verified market reality: Mitsubishi's current top single-zone is the **FX-Series 12K at 29.9 SEER2 (R-454B)**; Fujitsu's most-efficient small units reach ~33 SEER2 (9K class); a few 6K units hit ~32. (Sources: hvacdirect Mitsubishi FX listing; aircondlounge most-efficient-mini-split 2026.)

### A2. Refrigerant transition (AIM Act) — three-part framing, replaces every "R-410A flagship" claim
Apply this accurate framing wherever refrigerant/phase-out is discussed, and resolve the internal contradiction with the pages that already state R-454B correctly (`content/refrigerants/hvac-refrigerant-phase-out.mdx`, `content/hvac-brands/best-central-ac-brands.mdx`):

1. **Manufacturing cutoff:** As of **Jan 1, 2025**, manufacturers may no longer produce/import new residential split-system AC or heat pumps using R-410A. New equipment now uses **R-454B (GWP 466)** or **R-32 (GWP 675)** — both A2L, both under the EPA's 700-GWP threshold.
2. **Installation:** R-410A is **not banned**. Equipment manufactured before Jan 1, 2025 may still be installed in 2026 (EPA amended final rule, effective July 27, 2026) until existing inventory depletes; existing systems can be serviced/recharged indefinitely.
3. **State caveat:** Some states are stricter — **New York codified the original Jan 1, 2026 install ban**. Add a "check your state/local code" line.

Source: EPA Technology Transitions rule; NAHB (May 2026) on the amended install rule; ACDirect R-410A phase-out timeline; ICC Q4-2025 update.

**Consequence for spec tables:** a *current 2026 flagship* shipping new is R-454B/R-32, NOT R-410A. Where a unit's spec table lists R-410A, verify against the current SKU; for new equipment, correct to R-454B/R-32. (Note: Mitsubishi FS-series sold-through stock may carry R-410A; the current new lineup — FX/GX/HX/WX/JX — is R-454B.)

### A3. Section 25C federal tax credit — EXPIRED (YMYL, highest stakes)
**The federal Section 25C Energy Efficient Home Improvement Credit applies only to equipment placed in service on or before Dec 31, 2025.** It was terminated by the OBBBA (Public Law 119-21, signed July 4, 2025). Any page telling a 2026 homeowner they can claim a $2,000 federal heat-pump credit is FALSE.

Correct framing for all four tax MDX files:
- The federal 25C credit **expired for installs after Dec 31, 2025**. The controlling event is "placed in service" (install completed) — equipment bought in 2025 but installed in 2026 does NOT qualify.
- Homeowners who completed installs by Dec 31, 2025 can still claim it on their **2025** return (IRS Form 5695).
- **Pivot 2026 readers to what's live:** state/utility rebates, and the IRA **HOMES / HEAR** rebate programs (separately appropriated, survived OBBBA, rolling out state-by-state).
- Fix the date-flip typos CC found (every OBBBA "2026" that should be "2025"; the "2024, 2026, or 2026" artifact → "2024 or 2025").

Primary sources to cite inline: IRS 25C page (irs.gov/credits-deductions/energy-efficient-home-improvement-credit); IRS OBBB FAQ (PL 119-21); ENERGY STAR federal tax credits page.

---

## B. LOCKED MODEL CORRECTIONS (mini-splits) — transcribe these values

Each block: **FALSE → VERIFIED**, with source. Apply to every line listed for that model in `spec-verification.csv` (the CSV has the exact file:line list).

### B1. Mitsubishi MSZ-FS12NA / MUZ-FS12NA (the "40.1" unit) — CORRECT, do not cut
The site's flagship claim is fabricated; this is a real, good unit at its real numbers.
| Spec | FALSE (site) | VERIFIED | 
|---|---|---|
| SEER2 | 40.1 | **26.3** (some listings 26.1) |
| EER2 | 16.5 | **13.8** |
| HSPF2 | 14.2 | **10.4–11.1** (use 10.6; Ferguson submittal-aligned = 10.4) |
| Min heat temp | -13°F | -13°F (OK — H2i Hyper-Heat) |
| Refrigerant | R-410A | R-410A on sold-through FS stock; **current new Mitsubishi lineup is R-454B** — see A2 |
| Warranty | (varies) | 5yr parts / 7yr compressor standard; 12yr w/ Diamond Contractor install |

Remove all "industry-leading / highest certified efficiency / no other mini split matches" language attached to this unit.
Sources: gotductless MSZ-FS12NA submittal listing (SEER2 26.3 / EER2 13.8 / HSPF2 11.1 / -13°F); Ferguson Home (HSPF2 10.4); Mitsubishi submittal PDF (acdirect).
`PENDING-AHRI`: pull cert ID for MSZ-FS12NA/MUZ-FS12NA to gold-tier these.

### B2. Mitsubishi real current top single-zone — USE AS THE LEGIT "best efficiency" pick
Replace the phantom "MSZ-FS 40.1 flagship" claim with the genuine top performer:
- **Mitsubishi FX-Series 12K — 29.9 SEER2, R-454B, H2i Hyper-Heat to -13°F.**
Source: hvacdirect Mitsubishi FX-Series 12K listing.
`PENDING-AHRI`: pull FX-series 12K cert ID.

### B3. Daikin Aurora 12K (FTXV12AVJU9 / RXT12AVJU9, R-32) — CORRECT, do not cut
| Spec | FALSE (site) | VERIFIED |
|---|---|---|
| SEER2 | 25.5 | **20.0** (115V) / **21.0** (230V) |
| HSPF2 | 13.0 | **10.2** |
| EER2 | 13.5 | **12.0** |
| Min heat | (varies) | -13°F heating; -4°F low-ambient cooling w/ field setting |
| Refrigerant | — | **R-32** |
| Warranty | — | 12yr (w/ registration) |
Sources: totalhomesupply manufacturer spec (12.0 EER2 / 20.0 SEER2 / 10.2 HSPF2); HVACDirect (21 SEER2 / 230V); Daikin submittal PDF.
`PENDING-AHRI`: CC's audit cited cert #215710688 — confirm via AHRI Directory.

### B4. Senville LETO SENL-12CD — CORRECT (site UNDERSTATED it), do not cut
| Spec | FALSE (site) | VERIFIED |
|---|---|---|
| SEER2 | 19.0 | **21.2** (115V) / **21.3** (230V) |
| EER2 | — | 10.1 (115V) / 10.8 (230V) |
| HSPF2 | — | 8.7 (Region IV) / 6.7 (Region V) |
| Min heat temp | -22°F | **-13°F / -25°C** (spec sheet); marketing states effective to 5°F. CUT the -22°F. |
| Refrigerant | — | **R-454B** |
| Warranty (compressor) | 7yr | **10yr compressor / 10yr parts** |
| 10-yr "failure rate 15–22%" | (fabricated) | **STRIP — no public source exists** |
Source: **Senville LETO Series spec sheet (manufacturer PDF)** — primary. AHRI Certified (cert available on senville.com product page).

### B5. Carrier "40HQV" — PHANTOM MODEL, CUT THE ROW ENTIRELY
No such Carrier ductless model exists; the "42 SEER2 / 15 HSPF2 / -22°F" specs are all fabricated. Carrier's real ductless lines are Comfort (40MHHQ, ~17–19.8 SEER), Performance (40MAHB), and Infinity (38MPRAQ/40MPHAQ, ~23 SEER2 top).
**Action:** delete the 40HQV row everywhere. If a Carrier pick is wanted, replace with the real **Carrier Infinity 38MPRAQ at ~23 SEER2** — but that is `PENDING-AHRI`; do not publish a number until pulled.
Sources: carrier.com ductless catalog; onlinesupply Carrier Comfort 40MHHQ12 (19.8 SEER); hvac.com Carrier Comfort line.

---

## C. OPTION C — mini-split shortlist (keep these, cut the rest)

Per the agreed C / Top-3 decision, the mini-split rankings keep **3 genuinely strong, real units** with verified specs + a heat-transfer explanation of *why* each wins. Cut all other ranked models (including every phantom).

| Rank / role | Model | Verified headline specs | Status |
|---|---|---|---|
| **Best cooling efficiency** | Mitsubishi FX-Series 12K | 29.9 SEER2, R-454B, H2i to -13°F | `PENDING-AHRI` |
| **Best value (12yr warranty)** | Daikin Aurora 12K (FTXV12AVJU9/RXT12AVJU9) | 20–21 SEER2, 10.2 HSPF2, 12.0 EER2, R-32, -13°F | Manufacturer-verified; AHRI recommended |
| **Best budget** | Senville LETO SENL-12CD | 21.2/21.3 SEER2, R-454B, 10/10 warranty, -13°F (eff. 5°F) | Manufacturer-spec-sheet verified |

Optional 4th if a DIY slot is wanted: **MrCool DIY (current gen)** — `{{PENDING-RESEARCH}}`, do not publish numbers yet.

**Models to CUT from rankings** (no shortlist slot): the phantom Carrier 40HQV, plus LG Art Cool Premier, Cooper & Hunter Sophia, Fujitsu RLS3H, and any other ranked unit not in the table above — unless Marko explicitly elevates one (then it moves to Batch 2 for verification before any number ships).

For each KEPT model, the prose must explain the physics (e.g., why a higher SEER2 reflects better part-load inverter modulation; why H2i maintains capacity at low ambient via flash-injection) — that is the non-commodity differentiator the `google-ai-content-policy` skill requires.

---

## D. ITEMS TO STRIP (no primary source exists — do not try to source)

- Senville "15–22% failure rate at 10 years" — fabricated, strip.
- Brand-review service-call figures (`content/brand-reviews/trane-vs-carrier.mdx:120–123`, the `{{NEEDS-VERIFICATION}}` rows): no public per-unit service-call dataset exists. **Strip these rows** unless Marko supplies a citable source.
- Any remaining "we tested / measured / X models evaluated" methodology language that survived Gate 1 (re-grep).

---

## E. DATE / PLACEHOLDER RESOLUTIONS (the 8 `{{NEEDS-VERIFICATION}}` markers)

- `editorial-policy` last-updated, and the buying-guide `updated:` stamps: set to the **MDX `dateModified` of the target article** (CC reads it from frontmatter); if absent, set to the date these Gate-2 edits land. Do NOT invent a date.
- `app/buying-guides/page.tsx:219` "Smart Thermostat ROI Calculator" slug looked stale — verify the route exists before keeping the link; if it 404s, fix or remove the link.

---

## F. BATCH 2 — RESEARCH-PENDING (Marko/Claude-here to verify next; CC: do NOT guess)

These carry false or unconfirmed values but are lower-volume and several models may be cut. Leave as `{{PENDING-RESEARCH}}` and log:
- **Fujitsu** RLS3/RLS3H SEER2 by SKU, and **XLTH HSPF2** (the false "14.2, highest of any residential unit" claim — 14.2 HSPF2 exceeds every certified mini-split; must be corrected or the model cut).
- **LG** Art Cool Premier SEER2/HSPF2.
- **Cooper & Hunter** Sophia min-temp / SEER2.
- **Lennox XC25** (central AC): "26 SEER2" is almost certainly the old **26 SEER** rating; SEER2 equivalent is lower (~22–24). Verify and clarify SEER vs SEER2 in body.
- **MrCool DIY** current-gen specs (if used as the optional 4th shortlist pick).
- **NEEP cold-climate list** cross-check for `best-cold-climate-heat-pumps.mdx` (some named models may be delisted).

---

## G. RULES FOR CC (read before editing)

1. **Transcribe only.** Every number you write must come from Sections A–E above. No memory, no open-web sourcing, no estimates.
2. **Cite on correct.** Where you replace a value, wire in the primary-source citation/link alongside it (manufacturer spec sheet, IRS, EPA) so the "verified" claim is true going forward. This is the cite-on-correct rule — no silent swaps.
3. **`PENDING-AHRI` / `{{PENDING-RESEARCH}}`** values stay as markers; do not publish a number for them.
4. Run the `google-ai-content-policy` and `portfolio-page-quality` skills (now mounted at `/home/node/.claude/skills/`) as you edit.
5. After edits, re-run the spec grep harness and update `spec-verification.csv` status from WRONG → OK only for rows backed by a value in this file.
6. Small commits, one logical group per commit, on the Gate-2 branch. No push.
