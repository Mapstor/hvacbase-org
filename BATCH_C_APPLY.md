# BATCH C — APPLY LOG (11 edits applied, 2 contingent items surfaced, 9 out-of-scope survivors flagged)

**Run date:** 2026-07-12
**Mode:** APPLIED for unambiguous items · SURFACED for two contingents · NOT COMMITTED (working tree only) · No date bumps
**Overrides honored:** MrCool 168/265 use user-supplied exact AFTERs; cost-guides 115 stays qualitative (no 5-15% figure); table lead-in unchanged from preview (line 168 override implicitly introduces the table with "Commonly discussed failure modes include:")

---

## Applied changes (11 edits, 3 files)

### A. `app/troubleshooting/page.tsx` — deleted Chart 1 + Chart 2

| Δ | Range (pre-edit lines) | Nature | Verified |
| --- | --- | --- | --- |
| A1 | 453–477 | DELETED entire `<div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">…</div>` (Top AC Problems chart, 35/22/18/15/10) | grep for `Top AC Problems` → 0 hits · grep for `Dirty filter.*35%` → 0 hits |
| A2 | 478–501 | DELETED entire `<div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">…</div>` (Top Heating Problems chart, 28/25/20/15/12) | grep for `Top Heating Problems` → 0 hits · grep for `Ignition issues.*28%` → 0 hits |

**Interim UI state:** the `<div className="grid md:grid-cols-3 gap-6">` container (line 452 pre-edit) is now left with only Chart 3 (DIY Fix Success Rate) as its sole child. On desktop it will render as one card in the left-most column of a three-column grid with two empty columns to the right. **This is deliberate** — the H2/container/grid disposition depends on the Chart 3 confirmation below.

### B. `app/cost-guides/page.tsx` — 7 qualitative rewrites

| Δ | Line | BEFORE (verbatim) | AFTER (applied) |
| --- | --- | --- | --- |
| B1 | 108 | `savings: 'Prevents 95% of breakdowns'` | `savings: 'Catches issues before they become failures'` |
| B2 | 115 | `savings: 'Improves efficiency 5-15%'` | `savings: 'Restores efficiency lost to dirt and wear'` |
| B3 | 122 | `savings: 'Extends life 5+ years'` | `savings: 'Extends operating life'` |
| B4 | 256 | `'Get 3+ quotes for major work - prices vary 20-40%',` | `'Get 3+ quotes for major work — installer pricing varies widely',` |
| B5 | 257 | `'Schedule installation in off-season for 10-20% savings',` | `'Schedule installation in the off-season for lower pricing',` |
| B6 | 258 | `'Regular maintenance prevents 95% of breakdowns',` | `'Regular maintenance catches most issues before they cause a failure',` |
| B7 | 260 | `'Check for rebates before purchasing - save up to $2,500',` | `'Check federal, state, and utility rebates before purchasing — see /hvac-rebates-by-state for current programs',` |

### C. `content/mini-split-air-conditioners/mrcool-diy-mini-split-review.mdx` — prose 168 + table 170-176 + bullet 265

| Δ | Line(s) | BEFORE (verbatim) | AFTER (applied) |
| --- | --- | --- | --- |
| C1 | 168 (prose paragraph, one line in source) | `Based on warranty claim data, contractor reports, and consumer reviews, MrCool's estimated 10-year failure rate is 10–15%, compared to 3–7% for Japanese premium brands. Common failure modes include:` | `MrCool is a newer, DIY-focused brand with a shorter field track record than premium Japanese brands like Mitsubishi, Daikin, and Fujitsu. Commonly discussed failure modes include:` |
| C2 | 170-176 (5-row markdown table) | ``` \| Failure Mode \| Estimated Frequency \| Typical Cost to Repair \| \|-------------\|-------------------\|----------------------\| \| Refrigerant leak (quick-connect) \| 5–8% \| $200–$600 \| \| Control board failure \| 3–5% \| $200–$400 \| \| Compressor failure \| 2–4% \| $800–$1,500 \| \| Fan motor failure \| 1–3% \| $150–$300 \| \| Thermistor/sensor failure \| 2–4% \| $100–$200 \| ``` | ``` \| Failure Mode \| Typical Cost to Repair \| \|-------------\|----------------------\| \| Refrigerant leak (quick-connect) \| $200–$600 \| \| Control board failure \| $200–$400 \| \| Compressor failure \| $800–$1,500 \| \| Fan motor failure \| $150–$300 \| \| Thermistor/sensor failure \| $100–$200 \| ``` |
| C3 | 265 | `- **10–15% estimated 10-year failure rate** vs 3–7% for Mitsubishi/Daikin/Fujitsu` | `- **Newer brand with a shorter field track record than premium Japanese brands**` |

**Interpretation note (table lead-in):** the user's Batch C spec listed both `Lead-in line: 'Common failure modes and typical repair costs:'` under the table row AND `168: '...Commonly discussed failure modes include:'` under the prose override. I applied the 168 override literally; its ending sentence (`Commonly discussed failure modes include:`) already introduces the table. I did NOT insert an additional standalone lead-in line to avoid double-introduction. If you want the exact phrase `Common failure modes and typical repair costs:` as a separate italic caption above the table, tell me and I'll add it in the same commit as the 278 fix.

---

## Certifying grep — whole repo (post-apply)

### Confirmed ZERO for every "should be gone" target

- `Chart 1 tuple` (Dirty filter 35% + Refrigerant 22% + Capacitor 18%) → **0 hits**
- `Chart 2 tuple` (Ignition 28% + Dirty filter 25% + Thermostat 20%) → **0 hits in the chart-shape;** 3 hits in **unrelated content** (furnace-blowing-cold-air.mdx:56 `"Common (15%)"` in a different symptom table; hvac-energy-saving-tips.mdx:98,570 `"efficiency by 15-25%"` — filter-efficiency claim, different context). None of these are Chart 2 reintroductions.
- `MrCool 10-year failure rate is 10–15%` (Line 168 sentence) → **0 hits**
- `10–15% estimated 10-year failure rate` (Line 265 bullet) → **0 hits**
- `Refrigerant leak.*5–8% | 3–5% | 2–4% (mrcool table rows)` → **0 hits**
- `prices vary 20-40%` → **0 hits**
- `off-season for 10-20% savings` → **0 hits**
- `save up to $2,500` (cost-guides tip) → **0 hits**
- `95% of breakdowns` → **0 hits**
- `Prevents 95%` → **0 hits**
- `Improves efficiency 5-15%` → **0 hits**
- `Extends life 5+ years` → **0 hits**
- `Based on warranty claim data` → **0 hits**

### Confirmed AFTER text present at every intended location

Full grep transcript captured; abbreviated confirmation:
- `app/cost-guides/page.tsx`: all 7 new strings present at lines 108, 115, 122, 256, 257, 258, 260 ✓
- `content/mrcool-diy-mini-split-review.mdx`: new prose at line 168 ✓, new bullet at line 265 ✓, 2-column table (no `Estimated Frequency` column) ✓
- `app/troubleshooting/page.tsx`: `Top AC Problems` and `Top Heating Problems` H3s absent ✓; Chart 3 container (`from-green-50 to-green-100`) still present at the new line 453 ✓

### FAQPage JSON-LD emitted output check

**Not yet performed.** The `<FAQ items={[...]}>` component in the MrCool MDX (lines 270-313) emits `FAQPage` JSON-LD from its inline items array via `components/ui/FAQ.tsx`. Line 278 still contains the `10–15% failure rate at 10 years` claim, so the emitted FAQ schema **still carries the failure-rate figure until the CONTINGENT confirm below is resolved.** This check will happen in the same follow-up round as the line 278 edit.

---

## CONTINGENT #1 — troubleshooting Chart 3 disposition

**Instruction recap from your Batch C spec:**
> paste lines 538-587 verbatim in the apply doc. If that section already covers DIY-vs-pro triage → DELETE Chart 3 AND the whole "Most Common HVAC Problems" section (H2 line 451 + comment line 448 + container). If it's thin → keep Chart 3 as the qualitative tiers (AFTER-Q, no percentages, EPA-608 line retained) and rescope the H2 to a single-card layout.

**Pre-edit lines 538-587 verbatim, from `app/troubleshooting/page.tsx` — the "When to Call a Professional · Try DIY First / Call a Pro Immediately" section:**

```jsx
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-green-600">Try DIY First:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Filter replacements and cleaning
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Thermostat troubleshooting
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Circuit breaker resets
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Basic drainage clearing
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Simple pilot light relighting
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-red-600">Call a Pro Immediately:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Gas leaks or gas smell
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Electrical burning smell
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Refrigerant handling
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Heat exchanger issues
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Major electrical repairs
                  </li>
                </ul>
              </div>
```

**Coverage read:** the section already provides a 5-item DIY-safe list (**filter, thermostat, breaker, drainage, pilot light**) and a 5-item Pro-required list (**gas, electrical burning, refrigerant, heat exchanger, major electrical**). The DIY-safe list overlaps directly with Chart 3's rows (filter replacement, thermostat, breaker, drainage) and the Pro-required list explicitly names refrigerant handling — which is Chart 3's "0% (Pro only)" row on legal grounds. **Coverage is complete, not thin.**

**Recommended action:** DELETE Chart 3 AND the whole "Most Common HVAC Problems" section (delete comment line 448 + `<section>` opening line 449 through `</section>` closing at the end of the container). The DIY-vs-pro triage is intact below.

**Alternate action if you disagree with the coverage read:** keep Chart 3 as qualitative tiers (Straightforward / Doable with care / Not permitted DIY, EPA-608 line retained) and rescope H2 to a single-card layout. Both options ready to apply on your confirm.

---

## CONTINGENT #2 — MrCool line 278 (FAQ answer, schema-emitting)

**Instruction recap:**
> paste the faqData QUESTION text for this entry. Apply AFTER-X to the answer … Update the faqData entry in the SAME commit as visible lines 168/265. Confirm the question still reads sensibly with the number gone; if the question itself asks "what's the failure rate," flag it — the question may need to change too.

**Full FAQ item (pre-edit), from `content/mini-split-air-conditioners/mrcool-diy-mini-split-review.mdx:276-279`:**

```
    {
      question: "How long do MrCool mini splits last?",
      answer: "MrCool mini splits typically last 10–15 years with proper maintenance. Some units last longer, but the 10–15% failure rate at 10 years suggests reliability drops off after the first decade. Compare this to Mitsubishi and Daikin, which routinely last 20+ years. Regular filter cleaning, annual coil cleaning, and keeping the quick-connect fittings protected from UV exposure will maximize your MrCool's lifespan."
    },
```

**Question coherence check:** the question asks about **lifespan** ("How long do MrCool mini splits last?"). It does NOT ask about failure rate. The AFTER-X answer text you supplied — *"MrCool mini splits typically last 10–15 years with proper maintenance. Regular filter cleaning, annual coil cleaning, and keeping the quick-connect fittings protected from UV exposure will maximize your MrCool's lifespan."* — directly addresses lifespan (10-15 years) and reads coherently against the question. **No question rewrite needed.**

**Proposed AFTER answer (ready to apply on your confirm):**

```
answer: "MrCool mini splits typically last 10–15 years with proper maintenance. Regular filter cleaning, annual coil cleaning, and keeping the quick-connect fittings protected from UV exposure will maximize your MrCool's lifespan."
```

**Post-apply schema check plan (to be run after 278 edit):**
1. Rebuild the article schema by inspecting `<FAQ items={[...]}>` at lines 270-313 of the MDX.
2. Verify the `FAQPage.mainEntity[i].acceptedAnswer.text` for question "How long do MrCool mini splits last?" no longer contains `10-15%`, `10–15%`, `failure rate`, `drops off`, `20+ years`.
3. Also grep the emitted HTML from a local `next build && next start` render (if desired) — but the source-level check is sufficient because `generateFAQSchema()` and the FAQ component both stringify the items array verbatim.

---

## Commit strategy note

**All four MrCool-file changes (C1 prose, C2 table, C3 bullet, and pending C4 FAQ answer at line 278) must ship in ONE commit** per your batch spec ("MrCool visible + schema changes must be ONE commit"). C1, C2, C3 are currently staged in the working tree. C4 is held until you confirm CONTINGENT #2. Once confirmed, C4 will be applied and all four will be staged together for a single commit.

Suggested commit shape (for when we get there):

```
fix(mrcool-review): drop unsourced failure-rate stats from prose, table, bullet, and FAQ

- prose (line 168): remove "10-15% vs 3-7%" claim and nebulous "Based on warranty claim
  data, contractor reports, and consumer reviews" attribution shell; replace with hedged
  ordering claim about MrCool's shorter field track record vs Mitsubishi/Daikin/Fujitsu
- table (lines 170-176): drop "Estimated Frequency" column; keep Failure Mode + Typical
  Cost to Repair (repair costs are defensible from public parts pricing)
- bullet (line 265): mirror the prose change
- FAQ (line 278): drop the "10-15% failure rate at 10 years" and "20+ years" comparison;
  answer now scoped to lifespan + maintenance advice

Same-class unsourced claims at lines 150 and 298 (8-12% leak-rate) NOT touched in this
batch — see BATCH_C_APPLY.md "Out-of-scope survivors" for follow-up scope.
```

---

## Out-of-scope survivors (discovered during apply-time recheck)

These are **stat-shaped claims of the same class** as items dispositioned in this batch, but they were NOT in the Batch C spec. They remain in the codebase. **Not fixed. Flagged for your approval as a possible Batch C.1 follow-up.**

### MrCool review file — 2 additional unsourced leak-rate claims

| Line | Verbatim | Class | Note |
| --- | --- | --- | --- |
| 150 | `Industry data suggests MrCool units have a higher refrigerant leak rate (8–12% over 10 years) compared to professionally installed brazed systems (2–5%). A refrigerant leak means reduced cooling/heating performance, potential compressor damage, and a repair bill of $200–$600.` | **(iii)** parked | "Industry data suggests" is another nebulous attribution shell. The 8-12% / 2-5% figures are unverifiable. Directional claim (mechanical fittings leak more than brazed) is defensible without numbers. |
| 298 (FAQ answer body, **schema-emitting**) | `answer: "They're adequate but not as reliable as brazed copper connections used in professional installations. Quick-connect fittings have more potential failure points: O-ring seals can degrade, fittings can loosen from vibration, and improper seating during installation can cause slow leaks. Estimated refrigerant leak rate is 8–12% over 10 years vs 2–5% for brazed connections. To maximize reliability, ensure fittings are fully seated, protect outdoor connections from UV, and inspect connections annually."` | **(iii)** parked + **schema leakage** | Same 8-12% figure, this time inside an FAQ item ("Are MrCool quick-connect line sets reliable?"). Question asks about reliability so a hedged qualitative answer works without the percentage. |

If approved, disposition: strip the percentage sentences (or replace with qualitative hedge like "mechanical fittings introduce more potential leak points than brazed connections, though reliable if properly seated and periodically inspected"). Same "must ship in one commit" constraint would apply — line 150 + line 298 + the four already-applied lines would ideally all be part of one commit if this follow-up is approved before we commit the current changes.

### Cost-guides page — 7 additional unsourced `savings:` / `consideration:` fields on install/repair/replacement cards

Same pattern as B1-B3 (unsourced stat inside a card metadata field), on different cards higher up the file. Not in Batch C spec.

| Line | Card | Verbatim | Class |
| --- | --- | --- | --- |
| 26 | Central AC Installation Cost | `savings: 'Save up to 20% off-season'` | **(i)/(iii)** |
| 33 | Furnace Installation Cost | `savings: 'Rebates up to $1,500'` | **(iii)** |
| 47 | Mini Split Installation Cost | `savings: 'DIY saves 30-40%'` | **(iii)** |
| 54 | Boiler Installation Cost | `savings: 'Energy savings 20-30%'` | **(iii)** |
| 61 | Ductwork Installation Cost | `savings: 'Improves efficiency 20%'` | **(iii)** |
| 129 | Service Contract Comparison | `savings: 'Save 15-20% on repairs'` | **(iii)** |
| 163 | Thermostat Replacement Cost | `consideration: 'Smart upgrade saves 20%'` | **(iii)** |

Also **hero-adjacent copy on the same page:**

| Line | Verbatim | Class |
| --- | --- | --- |
| 473 | `Smart strategies to reduce your HVAC costs by 20-40%` (Money-Saving Tips intro copy) | **(i)** — 20-40% is a bare unsourced range |
| 518 | `Compare quotes from qualified contractors and save up to 40%` (CTA copy) | **(i)** — same |

If approved, disposition follows the same pattern as B1-B7: soften to qualitative or drop the field. All within `app/cost-guides/page.tsx`, low risk.

### Also discovered (unrelated pages, same class)

- `content/furnaces-heating/furnace-blowing-cold-air.mdx:56` — `["3", "Pilot light/ignition failure", "Common (15%)", ...]` inside a symptom-frequency table. Similar to Chart 2 in structure (a per-cause frequency claim inside a table row). Not in Batch C spec.
- `content/energy-efficiency/hvac-energy-saving-tips.mdx:98,570` — "Dirty filter reduces efficiency by 15-25%" (two instances). Bare stat claim. Not in Batch C spec.

---

## Summary at a glance

| Bucket | Count | Status |
| --- | --- | --- |
| Applied unambiguous edits | **11** across 3 files | Working tree, not committed |
| Contingent items awaiting confirm | **2** (troubleshooting Chart 3, mrcool line 278 FAQ) | Held; recommendations attached |
| Certifying grep — should-be-zero targets | **12 target strings** | All confirmed ZERO |
| False positives in grep | 3 hits (unrelated stat claims in other files) | Flagged as out-of-scope, not survivors |
| Out-of-scope survivors surfaced | **2 mrcool + 7 cost-guides + 2 hero-adjacent + 3 other content = 14** total same-class claims elsewhere | Flagged for possible Batch C.1 |
| Files edited | 3 (`app/troubleshooting/page.tsx`, `app/cost-guides/page.tsx`, `content/mini-split-air-conditioners/mrcool-diy-mini-split-review.mdx`) | Not yet committed |
| Date bumps | 0 | Per your instruction |

**Stopping for your confirm on the two contingents.** No further edits, no commits until you decide:
- **Q-1 (Chart 3):** delete-Chart-3-plus-section OR keep-Chart-3-as-qualitative-tiers?
- **Q-2 (line 278):** apply the AFTER-X answer text (question stays as-is)?
- **Q-3 (bonus):** approve the 14 out-of-scope survivors as Batch C.1, or leave for later?
