# BATCH C — Constructed / unsourced stat-charts (PREVIEW, NO EDITS APPLIED)

**Run date:** 2026-07-12
**Scope:** De-fabricate stat-shaped charts that read as authoritative data but have no source. From `COMPLIANCE_TRIAGE_hvacbase.md` Batch C rows plus a widening grep pass.
**State:** **PREVIEW ONLY.** No files modified. No dates bumped. No commits. No live external lookups performed.
**Governing rules:** no invented citations, no number-swapping, unverifiable numbers do not survive (soften-to-qualitative or cut), qualitative AFTERs are hedged and defensible — not a new precise ranking dressed as data.

---

## STEP 1 — Extract context (verbatim)

### The three known charts on `app/troubleshooting/page.tsx`

All three sit inside the same section:

- Section-level comment: `{/* Common Causes Stats */}` (line 448)
- Section H2: `<h2 className="text-2xl font-bold text-gray-900 mb-8">Most Common HVAC Problems</h2>` (line 451)
- Container: `<div className="grid md:grid-cols-3 gap-6">` (line 452) — three side-by-side cards
- No section preface prose. No caption. No source link anywhere on the section.
- **No FAQ, no JSON-LD, no meta description, no OG description, no image alt text mentions any of these percentages** (STEP 3 grep confirmed).

**Component / data structure:** all three cards are **inline hardcoded JSX** — no shared chart component, no `chartData` array, no `recharts` primitives, no exported data file. This means each chart is edited in place; there is no fan-out.

#### Chart 1 — Top AC Problems (`page.tsx:453-477`)

```jsx
<div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
  <h3 className="font-semibold text-gray-900 mb-4">Top AC Problems</h3>
  <ol className="space-y-2 text-sm">
    <li className="flex justify-between"><span>1. Dirty filter</span><span className="text-gray-600">35%</span></li>
    <li className="flex justify-between"><span>2. Refrigerant issues</span><span className="text-gray-600">22%</span></li>
    <li className="flex justify-between"><span>3. Capacitor failure</span><span className="text-gray-600">18%</span></li>
    <li className="flex justify-between"><span>4. Thermostat problems</span><span className="text-gray-600">15%</span></li>
    <li className="flex justify-between"><span>5. Drainage clogs</span><span className="text-gray-600">10%</span></li>
  </ol>
</div>
```

- Values: 35, 22, 18, 15, 10 → **sum = 100** → framed as a **claimed distribution**.
- Framing sentence (implicit): "Top AC Problems" under "Most Common HVAC Problems" H2 — reads as "here is the share of AC failures caused by each item."
- No source attribution.

#### Chart 2 — Top Heating Problems (`page.tsx:478-501`)

```jsx
<div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
  <h3 className="font-semibold text-gray-900 mb-4">Top Heating Problems</h3>
  <ol className="space-y-2 text-sm">
    <li className="flex justify-between"><span>1. Ignition issues</span><span className="text-gray-600">28%</span></li>
    <li className="flex justify-between"><span>2. Dirty filter</span><span className="text-gray-600">25%</span></li>
    <li className="flex justify-between"><span>3. Thermostat malfunction</span><span className="text-gray-600">20%</span></li>
    <li className="flex justify-between"><span>4. Pilot light problems</span><span className="text-gray-600">15%</span></li>
    <li className="flex justify-between"><span>5. Blower issues</span><span className="text-gray-600">12%</span></li>
  </ol>
</div>
```

- Values: 28, 25, 20, 15, 12 → **sum = 100** → framed as a **claimed distribution**.
- Same framing as Chart 1 (adjacent card).
- No source attribution.

#### Chart 3 — DIY Fix Success Rate (`page.tsx:503-527`)

```jsx
<div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
  <h3 className="font-semibold text-gray-900 mb-4">DIY Fix Success Rate</h3>
  <ol className="space-y-2 text-sm">
    <li className="flex justify-between"><span>Filter replacement</span><span className="text-green-600 font-semibold">95%</span></li>
    <li className="flex justify-between"><span>Thermostat issues</span><span className="text-green-600 font-semibold">75%</span></li>
    <li className="flex justify-between"><span>Breaker/power</span><span className="text-yellow-600 font-semibold">60%</span></li>
    <li className="flex justify-between"><span>Drainage clogs</span><span className="text-yellow-600 font-semibold">50%</span></li>
    <li className="flex justify-between"><span>Refrigerant issues</span><span className="text-red-600 font-semibold">0% (Pro only)</span></li>
  </ol>
</div>
```

- Values: 95, 75, 60, 50, 0 → **sum = 280** → **NOT a distribution**; presented as per-item independent success rates.
- Framing sentence (implicit): "DIY Fix Success Rate" under "Most Common HVAC Problems" H2 — reads as "if you attempt this yourself, this is your probability of success."
- No source attribution.
- The "0% (Pro only)" row for refrigerant issues has an independent defensible basis (EPA Section 608 legally restricts refrigerant handling to certified technicians); the 95/75/60/50 rows are the unverifiable ones.

---

## STEP 2 — Widen the blast radius

### 2a — Exact number-string repeats

**Grep:** `35%` paired with `22%`, `18%`; `28%` paired with `25%`, `20%`; `95%` paired with `75%`, `60%`; sitewide across `app/`, `content/`, `components/`.

**Result:** **ZERO copy-paste repeats.** The three specific number tuples do not appear anywhere else in the repo. The troubleshooting page is the only surface these numbers live on.

### 2b — Chart-component / data-shape reuse

**Grep:** `recharts | BarChart | PieChart | LineChart | ResponsiveContainer | chartData | dataPoints`.

**Result:** `recharts` primitives are imported only inside **calculator components** (`components/calculators/*.tsx`) — those render **user-input-driven charts**, not hardcoded stat-chart data. `BarChart3` on `app/page.tsx:5` and `app/energy-efficiency/page.tsx:2` is the Lucide **icon** of the same name, not the recharts component — no data.

**Grep:** `font-semibold\">[0-9]{1,3}%|font-bold\">[0-9]{1,3}%` (the exact JSX shape of the three charts).

**Result:** **ZERO matches outside the three charts in `app/troubleshooting/page.tsx`.** The pattern is not templated elsewhere.

### 2c — Sibling "% of / most common / failure rate / success rate" claims found outside the three known charts

These are **not chart shapes** — they are single-number claims embedded in card metadata, tip lists, or prose. Each is a stat-shaped claim without citation and falls in the same disposition family. Catalogued below.

**Cost guides page — `app/cost-guides/page.tsx`:**

```
line 108   savings: 'Prevents 95% of breakdowns'                     — card meta for the "Annual Maintenance Cost" card
line 115   savings: 'Improves efficiency 5-15%'                       — card meta for the "AC Tune-Up Cost" card
line 122   savings: 'Extends life 5+ years'                           — card meta for the "Furnace Tune-Up Cost" card
line 256   'Get 3+ quotes for major work - prices vary 20-40%'        — bullet in moneySavingTips array
line 257   'Schedule installation in off-season for 10-20% savings'   — bullet in moneySavingTips array
line 258   'Regular maintenance prevents 95% of breakdowns'           — bullet in moneySavingTips array
line 260   'Check for rebates before purchasing - save up to $2,500'  — bullet in moneySavingTips array
```

**MrCool review — `content/mini-split-air-conditioners/mrcool-diy-mini-split-review.mdx`:**

```
line 168:  Based on warranty claim data, contractor reports, and consumer reviews,
           MrCool's estimated 10-year failure rate is 10–15%, compared to 3–7% for
           Japanese premium brands. Common failure modes include:

lines 170-176: table with columns [Failure Mode | Estimated Frequency | Typical Cost to Repair]
  | Refrigerant leak (quick-connect) | 5–8%   | $200–$600   |
  | Control board failure            | 3–5%   | $200–$400   |
  | Compressor failure               | 2–4%   | $800–$1,500 |
  | Fan motor failure                | 1–3%   | $150–$300   |
  | Thermistor/sensor failure        | 2–4%   | $100–$200   |

line 265:  - **10–15% estimated 10-year failure rate** vs 3–7% for Mitsubishi/Daikin/Fujitsu
line 278:  answer field of FAQ: "the 10–15% failure rate at 10 years suggests reliability drops off"
```

The "Based on warranty claim data, contractor reports, and consumer reviews" phrase is a nebulous attribution shell — it is **not a citation** (no source URL, no publication, no author, no year, no methodology).

The failure-mode table (lines 170-176) is a mini-chart — same class as the troubleshooting charts. The frequency ranges (5–8%, 3–5%, 2–4%, 1–3%, 2–4%) don't sum to a distribution, they're per-mode independent probabilities. All unverifiable.

**No other pages / components** carry the "distribution-summing-to-100 without a source" pattern. Scope-of-batch confirmed: 3 charts + 7 cost-guides claims + 4 mrcool-review claims (line 168 covers both the "10-15%" and "3-7%" numbers; lines 170-176 are the frequency table; lines 265 and 278 are re-mentions).

---

## STEP 3 — Leakage check (visible ↔ schema/meta/OG/alt/FAQ)

- **`app/troubleshooting/page.tsx` metadata (lines 6-14):** `title: 'HVAC Troubleshooting Guide: Fix Common Problems & Save Money'` / `description: 'Complete HVAC troubleshooting guide for homeowners. Diagnose and fix common AC, furnace, and heat pump problems. Step-by-step solutions and when to call professionals.'` / OG same shape. **No numbers leak.** No `35%`, `22%`, `18%`, `28%`, `25%`, `95%`, `75%`, `60%`, `50%`, `0%` anywhere in the file's `Metadata` export or OpenGraph block.
- **JSON-LD / structured data:** the troubleshooting page emits **no** page-level JSON-LD (only the sitewide WebSite schema from `app/layout.tsx` and the article Person schema from About, neither of which references the numbers).
- **Image alt text:** the section contains no images; no alt-text leakage.
- **FAQ schema:** no FAQ block on the troubleshooting page. Grep across MDX FAQs for "top AC problem", "top heating problem", "success rate" with any of the specific numbers → **zero hits.** The numbers are only visible in the three cards.
- **`app/cost-guides/page.tsx`:** the "95% of breakdowns" and other tip strings appear only in the visible card metadata / bullet list. No JSON-LD, no FAQ schema on the page (metadata description is generic).
- **`content/mini-split-air-conditioners/mrcool-diy-mini-split-review.mdx`:** the "10-15% failure rate" claim appears in prose (line 168), bullet-recap (line 265), and inside the FAQ answer body (line 278). The FAQ is emitted as `FAQPage` JSON-LD via `generateFAQSchema()` in `lib/schema.ts:108` when the article's `faqData` block is present, **so this claim leaks into structured data** if the FAQ item at line 278 is one of the `faqData` entries. **Any disposition of line 278 must also update the `faqData` entry** so visible text and schema stay in sync. (This is the only leakage found in the whole batch.)

---

## STEP 4 — Classification + BEFORE/AFTER

Legend: **(i)** = constructed distribution / fabricated data. **(ii)** = illustrative/decorative (no data claim). **(iii)** = potentially real (specific claim a published source might back — flag for user-side verification).

### C1 — Troubleshooting page

| file:line | chart | class | BEFORE (verbatim) | AFTER — option Q (qualitative, hedged) | AFTER — option X (cut) | rule | note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `app/troubleshooting/page.tsx:453-477` | "Top AC Problems" (35/22/18/15/10) | **(i)** — sums to 100, no source | *(full JSX block reproduced in STEP 1)* | Replace the `<ol>` with a hedged prose block:<br>`<div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">`<br>`  <h3 className="font-semibold text-gray-900 mb-4">Common AC failure modes</h3>`<br>`  <p className="text-sm text-gray-700">A clogged air filter is among the causes most frequently reported in HVAC service calls. Refrigerant charge problems, failed run capacitors, and thermostat misconfiguration are also common. Clogged condensate drain lines account for a smaller share of failures.</p>`<br>`  <p className="text-xs text-gray-500 mt-3">General ordering reflects field-service consensus, not a specific dataset.</p>`<br>`</div>` | Delete the whole `<div>...` card. The categorised "Cooling Problems" cards higher on the page (lines 20-53) already list `commonCauses` per specific symptom, so the section can shed the third-column layout and become two cards, or the parent `<section>` (lines 448-530) can be removed entirely. | R-strip-numbers, R-hedge-ordering | Ordering "dirty filter > refrigerant > capacitor > thermostat > drainage" is broadly defensible domain knowledge (dirty filter really is a leading cause). AFTER-Q keeps that ordering hedged; AFTER-X deletes because the top-of-page cards already cover the same taxonomy. Recommend **AFTER-X** for the cleanest signal; AFTER-Q if you want to keep the visual real estate. |
| `app/troubleshooting/page.tsx:478-501` | "Top Heating Problems" (28/25/20/15/12) | **(i)** — sums to 100, no source | *(full JSX block reproduced in STEP 1)* | Replace with:<br>`<div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">`<br>`  <h3 className="font-semibold text-gray-900 mb-4">Common heating failure modes</h3>`<br>`  <p className="text-sm text-gray-700">Ignition or pilot-light problems and clogged filters lead most furnace service calls. Thermostat misconfiguration and blower motor issues are also frequently cited.</p>`<br>`  <p className="text-xs text-gray-500 mt-3">General ordering reflects field-service consensus, not a specific dataset.</p>`<br>`</div>` | Delete card. (Same argument as C1 row 1.) | R-strip-numbers, R-hedge-ordering | Recommend **AFTER-X** for consistency with C1 row 1. |
| `app/troubleshooting/page.tsx:503-527` | "DIY Fix Success Rate" (95/75/60/50/0) | **(iii) mixed** — 0% row is defensible (EPA 608), 95/75/60/50 are unverifiable per-item success rates | *(full JSX block reproduced in STEP 1)* | Replace with a "which fixes are viable DIY" descriptor, no percentages:<br>`<div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">`<br>`  <h3 className="font-semibold text-gray-900 mb-4">Which fixes are viable DIY</h3>`<br>`  <ul className="space-y-2 text-sm text-gray-700">`<br>`    <li><span className="text-green-600 font-semibold">Straightforward:</span> filter replacement, thermostat troubleshooting</li>`<br>`    <li><span className="text-yellow-600 font-semibold">Doable with care:</span> circuit-breaker resets, drain-line clearing</li>`<br>`    <li><span className="text-red-600 font-semibold">Not permitted DIY:</span> refrigerant work — restricted to EPA Section 608-certified technicians</li>`<br>`  </ul>`<br>`</div>` | Delete card. The **"Try DIY First / Call a Pro Immediately"** section already lower on the page (lines 538-587) covers the same distinction qualitatively. | R-strip-numbers, R-hedge-ordering, R-keep-legally-defensible-part | The AFTER-Q version preserves the section's genuine UX value (helping homeowners triage) without inventing per-task probabilities. It also keeps the legal-restriction distinction on refrigerant work, which is the only defensible number in the original. Recommend **AFTER-Q** for this row (retains UX); AFTER-X is acceptable if you'd rather rely on the bottom-page DIY/Pro split alone. |
| `app/troubleshooting/page.tsx:451` | Section H2 "Most Common HVAC Problems" | **(i)** — framing sentence for the constructed distributions | `<h2 className="text-2xl font-bold text-gray-900 mb-8">Most Common HVAC Problems</h2>` | If AFTER-Q chosen for the cards: `<h2 className="text-2xl font-bold text-gray-900 mb-8">Common Failure Modes and DIY Scope</h2>` | If AFTER-X on all three cards: delete the whole `<section>` (lines 448-530), including this H2, since the categorised cards higher up already cover the same ground. | R-strip-numbers | Section framing must match the cards below. |
| `app/troubleshooting/page.tsx:448` | Comment `{/* Common Causes Stats */}` | **(i)** — literal "Stats" label | `{/* Common Causes Stats */}` | Delete or rename: `{/* Common failure modes */}` | Delete with the section | R-strip-numbers | House-cleaning; not visible. |

### C2 — Cost-guides page

None of the C2 items is a chart per se; each is a single stat-shaped assertion in card metadata or a tip bullet. Same governing rule: unverifiable → soften-to-qualitative or cut.

| file:line | claim | class | BEFORE (verbatim) | AFTER — option Q (qualitative) | AFTER — option X (cut) | rule | note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `app/cost-guides/page.tsx:108` | "Prevents 95% of breakdowns" | **(iii)** — DOE and ASHRAE have published maintenance-vs-failure data, but 95% is not canonical | `savings: 'Prevents 95% of breakdowns'` | `savings: 'Catches issues before they become failures'` | Remove the `savings` field entirely from the card object (renders as "no savings tag" on the maintenance card) | R-strip-numbers, R-hedge | If Marko has a specific DOE or ASHRAE source for a maintenance-vs-failure percentage, park it in the VERIFY appendix and cite in a follow-on batch. |
| `app/cost-guides/page.tsx:115` | "Improves efficiency 5-15%" | **(iii)** — ENERGY STAR publishes tune-up benefit ranges; 5-15% is a common industry figure but not tied to a single citation on the site | `savings: 'Improves efficiency 5-15%'` | `savings: 'Restores efficiency lost to dirt and wear'` | Remove `savings` field | R-strip-numbers, R-hedge | Park for VERIFY. |
| `app/cost-guides/page.tsx:122` | "Extends life 5+ years" | **(iii)** — plausible directional claim, unverified quantity | `savings: 'Extends life 5+ years'` | `savings: 'Extends operating life'` | Remove `savings` field | R-strip-numbers | Park for VERIFY. |
| `app/cost-guides/page.tsx:256` | "Get 3+ quotes for major work - prices vary 20-40%" | **(i)** — 20-40% is a generic constructed range | `'Get 3+ quotes for major work - prices vary 20-40%',` | `'Get 3+ quotes for major work — installer pricing varies widely',` | Delete bullet | R-strip-numbers, R-hedge | AFTER-Q keeps the actionable advice ("get quotes") without the fabricated spread. |
| `app/cost-guides/page.tsx:257` | "Schedule installation in off-season for 10-20% savings" | **(i)** — constructed generic | `'Schedule installation in off-season for 10-20% savings',` | `'Schedule installation in the off-season for lower pricing',` | Delete bullet | R-strip-numbers | |
| `app/cost-guides/page.tsx:258` | "Regular maintenance prevents 95% of breakdowns" | **(iii)** — same as line 108 | `'Regular maintenance prevents 95% of breakdowns',` | `'Regular maintenance catches most issues before they cause a failure',` | Delete bullet | R-strip-numbers, R-hedge | Both dispositions should match line 108 for consistency. |
| `app/cost-guides/page.tsx:260` | "Check for rebates before purchasing - save up to $2,500" | **(iii)** — a state or utility could legitimately cap at $2,500, but not canonical; IRA HEAR alone can go up to $8,000 income-qualified | `'Check for rebates before purchasing - save up to $2,500',` | `'Check federal, state, and utility rebates before purchasing — see /hvac-rebates-by-state for current programs',` | Delete bullet | R-strip-numbers, R-hedge | AFTER-Q also creates an internal link to the (already OBBBA-updated) rebates article — better than a naked "up to $X" claim. |

### C3 — MrCool DIY review

| file:line | claim | class | BEFORE (verbatim) | AFTER — option Q (qualitative) | AFTER — option X (cut) | rule | note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `content/mini-split-air-conditioners/mrcool-diy-mini-split-review.mdx:168` | "10-15% failure rate, 3-7% for Japanese premium brands" with the attribution phrase | **(iii)** — Consumer Reports and J.D. Power publish HVAC reliability data annually; 10-15% is plausible but not tied to a specific source | ```Based on warranty claim data, contractor reports, and consumer reviews, MrCool's estimated 10-year failure rate is 10–15%, compared to 3–7% for Japanese premium brands. Common failure modes include:``` | ```MrCool's reliability track record is shorter than the leading Japanese brands. Contractor accounts and consumer feedback describe higher failure rates on MrCool than on Mitsubishi, Daikin, or Fujitsu, concentrated in the refrigerant fittings and control boards. Common failure modes include:``` | Cut the sentence entirely (jump straight to "Common failure modes include:") | R-strip-numbers, R-hedge, R-attribution-phrase-not-citation | AFTER-Q preserves the ordering/direction claim (MrCool is less reliable than the top-tier brands) without a fabricated percentage. The "Based on warranty claim data, contractor reports, and consumer reviews" attribution shell is dropped because it does not cite a specific published source. |
| `content/mini-split-air-conditioners/mrcool-diy-mini-split-review.mdx:170-176` | Failure Mode × Estimated Frequency table (5-8%, 3-5%, 2-4%, 1-3%, 2-4%) | **(i)** — constructed per-mode frequency table, unverifiable | ```\| Failure Mode \| Estimated Frequency \| Typical Cost to Repair \|\n\|---\|---\|---\|\n\| Refrigerant leak (quick-connect) \| 5–8% \| $200–$600 \|\n\| Control board failure \| 3–5% \| $200–$400 \|\n\| Compressor failure \| 2–4% \| $800–$1,500 \|\n\| Fan motor failure \| 1–3% \| $150–$300 \|\n\| Thermistor/sensor failure \| 2–4% \| $100–$200 \|``` | Drop the Frequency column; keep the Mode + Repair Cost columns:<br>```\| Failure Mode \| Typical Repair Cost \|\n\|---\|---\|\n\| Refrigerant leak (quick-connect) \| $200–$600 \|\n\| Control board failure \| $200–$400 \|\n\| Compressor failure \| $800–$1,500 \|\n\| Fan motor failure \| $150–$300 \|\n\| Thermistor/sensor failure \| $100–$200 \|```<br>Precede with a hedged line: `Common failure modes ordered roughly by field-report frequency, refrigerant-fitting leaks being the most cited:` | Delete the table entirely | R-strip-numbers, R-hedge | Repair costs are more defensible than frequencies (parts + labor pricing is public). The frequency column is the only fabricated piece. Recommend **AFTER-Q**. |
| `content/mini-split-air-conditioners/mrcool-diy-mini-split-review.mdx:265` | Bullet-recap of the 10-15% / 3-7% claim | **(iii)** — same as line 168 | ```- **10–15% estimated 10-year failure rate** vs 3–7% for Mitsubishi/Daikin/Fujitsu``` | ```- **Shorter reliability track record than premium Japanese brands**``` | Delete bullet | R-strip-numbers, R-hedge | Must match the disposition chosen for line 168. |
| `content/mini-split-air-conditioners/mrcool-diy-mini-split-review.mdx:278` | FAQ answer field with the 10-15% claim | **(iii) + SCHEMA LEAKAGE** — this text is emitted into `FAQPage` JSON-LD via `generateFAQSchema()` | ```answer: "MrCool mini splits typically last 10–15 years with proper maintenance. Some units last longer, but the 10–15% failure rate at 10 years suggests reliability drops off after the first decade. Compare this to Mitsubishi and Daikin, which routinely last 20+ years. Regular filter cleaning, annual coil cleaning, and keeping the quick-connect fittings protected from UV exposure will maximize your MrCool's lifespan."``` | Rewrite without the percentage:<br>```answer: "MrCool mini splits typically last 10–15 years with proper maintenance. Reliability tends to drop off after the first decade, whereas Mitsubishi and Daikin units routinely last 20+ years. Regular filter cleaning, annual coil cleaning, and keeping the quick-connect fittings protected from UV exposure will maximize your MrCool's lifespan."``` | Reword to drop the reliability comparison entirely and keep only the maintenance advice:<br>```answer: "MrCool mini splits typically last 10–15 years with proper maintenance. Regular filter cleaning, annual coil cleaning, and keeping the quick-connect fittings protected from UV exposure will maximize your MrCool's lifespan."``` | R-strip-numbers, R-schema-and-visible-together | **This is the only leakage point in the batch.** The AFTER text here is emitted into JSON-LD; visible text and schema disposition must go out in the same commit. |

---

## VERIFY (my side) — appendix

Every class-(iii) claim, with the exact BEFORE wording, so it can be checked against a real source before deciding whether to reintroduce a citation-backed version. **No number-swapping; no placeholder.** Do NOT reintroduce these percentages without a specific published source (URL + author + year).

1. **"Prevents 95% of breakdowns"** (cost-guides:108 and :258) — check DOE, ASHRAE, ACCA, or ENERGY STAR guidance on annual-maintenance impact on breakdown frequency for a real published figure. Candidate sources: DOE Energy Saver "Maintaining Your Air Conditioner" page; ENERGY STAR HVAC maintenance guidance.
2. **"Improves efficiency 5-15%" (per annual tune-up)** (cost-guides:115) — ENERGY STAR and DOE Energy Saver publish tune-up benefit ranges. Candidate: ENERGY STAR "HVAC Preventive Maintenance" resource.
3. **"Extends life 5+ years" (per tune-up)** (cost-guides:122) — check any manufacturer service-interval literature, ACCA best-practices, or industry lifespan surveys.
4. **"Prices vary 20-40% between quotes"** (cost-guides:256) — this is a plausible industry claim but not tied to any published survey. If you find a real installer-pricing dispersion study, it can be cited; otherwise cut.
5. **"Off-season installation 10-20% savings"** (cost-guides:257) — plausible directional; check any installer-network survey (Angi, HomeAdvisor) for a specific figure, or drop the number.
6. **"Rebates save up to $2,500"** (cost-guides:260) — pointer text; the actual max under IRA HEAR is up to $8,000 income-qualified and state rebates vary widely. Better replaced by "check /hvac-rebates-by-state" than a naked $ number.
7. **"MrCool 10-year failure rate 10–15% vs 3–7% for premium Japanese brands"** (mrcool review:168, :265, :278) — check Consumer Reports HVAC reliability survey (annual), J.D. Power residential HVAC reliability study, or contractor-published warranty-claim data. If a specific citation exists, both the prose (168, 265) and the FAQ answer (278) can be re-numbered together.
8. **MrCool failure-mode frequency table** (mrcool review:170-176) — check the same sources; individual-mode frequency data is generally NOT published even by CR/JDP, so this table is very unlikely to become citable and is most likely to be permanently qualitative or cut.

---

## Repeats map

| Location | Chart / claim | Same-number reuse elsewhere | Schema leakage? |
| --- | --- | --- | --- |
| `app/troubleshooting/page.tsx:453-477` | Top AC Problems (35/22/18/15/10) | **None found** | No |
| `app/troubleshooting/page.tsx:478-501` | Top Heating Problems (28/25/20/15/12) | **None found** | No |
| `app/troubleshooting/page.tsx:503-527` | DIY Fix Success Rate (95/75/60/50/0) | **None found** | No |
| `app/cost-guides/page.tsx:108` | Prevents 95% of breakdowns | Repeated once at `app/cost-guides/page.tsx:258` (same page) | No |
| `app/cost-guides/page.tsx:258` | Regular maintenance prevents 95% of breakdowns | Same as :108 | No |
| `app/cost-guides/page.tsx:115` | Improves efficiency 5-15% | **None found** | No |
| `app/cost-guides/page.tsx:122` | Extends life 5+ years | **None found** | No |
| `app/cost-guides/page.tsx:256` | Prices vary 20-40% | **None found** | No |
| `app/cost-guides/page.tsx:257` | Off-season 10-20% savings | **None found** | No |
| `app/cost-guides/page.tsx:260` | Rebates save up to $2,500 | **None found** | No |
| `content/mrcool-diy-mini-split-review.mdx:168` | 10-15% / 3-7% failure rate | Repeated at :265 (bullet) and :278 (FAQ answer) | **YES — line 278 leaks into `FAQPage` JSON-LD via `generateFAQSchema()`** |
| `content/mrcool-diy-mini-split-review.mdx:170-176` | Failure Mode × Estimated Frequency table (5-8%, 3-5%, 2-4%, 1-3%, 2-4%) | **None found** | No |
| `content/mrcool-diy-mini-split-review.mdx:265` | 10-15% / 3-7% bullet recap | Same as :168 | No |
| `content/mrcool-diy-mini-split-review.mdx:278` | 10-15% claim in FAQ answer body | Same as :168 | **YES — leaks into `FAQPage` JSON-LD** |

---

## Change summary

| Group | Files touched | Charts / claims changed | Class (i) | Class (iii) parked for VERIFY | Notes |
| --- | --- | --- | --- | --- | --- |
| C1 Troubleshooting | 1 (`app/troubleshooting/page.tsx`) | 3 charts + section framing | 2 charts (Top AC, Top Heating) | 1 chart mixed (DIY Success Rate — 0% row keepable, rest cut) | Section-level cleanup |
| C2 Cost guides | 1 (`app/cost-guides/page.tsx`) | 7 claims | 3 (20-40%, 10-20%, no-source generics) | 4 (95%, 5-15%, 5+ years, $2,500) | All parkable-for-verify or cut |
| C3 MrCool review | 1 (`content/…/mrcool-diy-mini-split-review.mdx`) | 3 prose/FAQ instances + 1 mini-table | 1 (frequency table) | 3 (failure-rate prose, bullet recap, FAQ answer) | **Schema-leakage on line 278 — visible + schema must ship in one commit** |
| **Totals** | **3 files** | **14 items** | **6** | **8** | 0 exact-number repeats sitewide → no fan-out surgery needed |

---

## Open questions for user before applying

- **Q1 — For each of the three troubleshooting charts, choose AFTER-Q (hedged prose) or AFTER-X (delete card).** My recommendation: **AFTER-X for Chart 1 and Chart 2** (the categorized problem cards higher on the page already cover the same taxonomy), **AFTER-Q for Chart 3** (the "which fixes are DIY" descriptor is genuinely useful UX; the current "DIY First / Call a Pro" section lower on the page complements rather than duplicates it).
- **Q2 — For each cost-guides claim,** confirm the qualitative rewrites are acceptable, or whether you want to keep any as class-(iii) parked for a future citation pass.
- **Q3 — MrCool review, line 168 sentence with the "Based on warranty claim data, contractor reports, and consumer reviews" attribution phrase.** Confirm you're OK dropping that phrase entirely (it does not qualify as a citation and reads worse than saying nothing). Alternative: leave the ordering claim and drop only the percentages.
- **Q4 — MrCool failure-mode table.** AFTER-Q drops just the "Estimated Frequency" column and keeps the repair-cost column (defensible from public parts pricing). AFTER-X deletes the whole table. Recommendation: AFTER-Q, because the repair-cost column is the load-bearing information for a homeowner.
- **Q5 — VERIFY appendix:** do you want me to hold the batch until you check any of items 1-8 (specifically the ENERGY STAR / DOE ones, where a real source likely exists), or should we ship the qualitative rewrites now and layer in citations later if you find them?

---

*End of preview. No files modified except this document.*
