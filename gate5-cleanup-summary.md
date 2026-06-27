# Gate 5 (raptive-fix/05-cleanup) — cleanup summary

**Source of truth:** `/workspace/GATE5_CLEANUP_LOCKED.md` — cleanup spec (FAQ render, star ratings, CSV consolidation). No new factual claims.
**Branch:** `raptive-fix/05-cleanup` off `raptive-fix/04-batch2-specs-tax`.
**Status:** All 4 sections complete. Build clean (376/376 pages). No merge, no push.

---

## §1 — Commit parked FAQ extraction

**Commit:** `13f99e9  fix(faq): extract faqData from MDX in getArticleBySlug`

The parked `lib/content.ts` change that had survived as a dirty
working-tree file across raptive-fix/01 → /04 is now in git. The
file populates `ArticleMeta.faqData` from an MDX
`export const faqData = [...]` block and strips the raw export
from the rendered body so source code doesn't leak onto the page.

Minimal regex hardening: the per-item match was changed from
`["']([^"']+)["']` to `(?:"[^"]+"|'[^']+')`. The prior pattern
broke when a double-quoted answer contained an apostrophe (e.g.
"you can't see light through the filter") because the `[^"']`
negated class terminated at the apostrophe. The new pattern
handles both quote styles separately, allows the other quote
inside, and still matches across newlines for multi-line bodies.
The three existing faqData consumers (ac-not-cooling,
hvac-efficiency-texas, trane-vs-carrier) all parse cleanly.

---

## §2 — Harden FAQ render

**Commit:** `75063bf  fix(faq): harden render — empty-guard verified + FAQ.Item extraction + strip 257 redundant markdown headings`

Three coordinated fixes that together kill the "blank Frequently
Asked Questions heading" bug.

### Before / after

**Before:**
- `components/ui/FAQ.tsx` already had the empty-guard
  (`if (!items || items.length === 0) return null;`).
- But 30 MDX files use the `<FAQ><FAQ.Item question="...">...
  </FAQ.Item></FAQ>` children syntax. The wrapper in
  `lib/mdx-components.tsx` detected those children via
  `child?.type?.name === 'FAQ.Item'`, which silently failed in
  MDX-RSC because the actual `.name` is just `"Item"`. So those
  pages had: a markdown `## Frequently Asked Questions` heading
  followed by … nothing. Orphan heading.
- 228 more MDX files had a markdown `## Frequently Asked
  Questions` heading immediately followed by `<FAQ items={[...]}>`,
  rendering DUPLICATE H2 headings (one from the markdown, one
  from the FAQ component's own internal H2).

**After:**
1. `lib/mdx-components.tsx` — the FAQ.Item detection now uses the
   reliable marker (presence of a `question` prop) and the answer
   text is extracted via a recursive `extractText` helper that
   handles strings, arrays, fragments, and nested elements. The
   30 FAQ.Item-style pages now render their items.
2. `content/**.mdx` — 257 redundant markdown `## Frequently
   Asked Questions` headings stripped. The FAQ component owns the
   H2. Sweep was scoped via regex anchor (`^##\s+Frequently
   Asked Questions\s*\n+(?=\s*<FAQ[\s>])`); zero non-standard
   matches before or after; zero orphan headings left.
3. `components/ui/FAQ.tsx` — empty-guard verified in place
   (lines 20–22). Schema is computed AFTER the guard returns, so
   no empty FAQPage JSON-LD ever emits.

### Spot-check: `best-mini-split-ac-units.mdx`

The named offender from the audit. Before: had `##` heading on
line 168 + working `<FAQ items={[...8 items...]}>` on line 170,
rendering two H2s. After: heading stripped (now line 168 is the
prior callout); the inline `<FAQ items=...>` renders the single
H2 + 8 FAQ items + valid FAQPage JSON-LD via the component.

### Final state

- Pages WITH faqData / `items` / FAQ.Item children → render H2 +
  items + FAQPage JSON-LD via the component.
- Pages WITHOUT any FAQ content → render nothing (no heading, no
  schema).
- Zero remaining `## Frequently Asked Questions` markdown
  headings in `/content/`.

---

## §3 — Remove fabricated star ratings

**Commit:** `bf7db9f  fix(brand-reviews): remove fabricated star ratings + reliability scores`

### What was removed

- **15 fabricated `rating: 4.x` values** from `brandCategories`
  (Carrier 4.8, Trane 4.7, Lennox 4.6, …, Mitsubishi 4.9, etc.).
- **15 fabricated `marketShare: 'X%'` percentages** from the same
  brand objects (also precise without a public source).
- **The entire `reliabilityRankings` data array + table render**
  (10 brands × invented `score` 9.2 / 8.8 / …, `satisfaction`
  percentages, derived `issues` qualitative labels).
- **Both `<Star>` fill loops** (brand-card star UI ~lines 367–375
  and reliability-table star UI ~lines 300–308).
- **The unused `Star` import** from lucide-react.
- **The "100% Unbiased Analysis" hero badge** — self-asserted
  trust signal that doesn't withstand the fabricated-ratings
  teardown.

### What was kept (the honest substance)

- Brand `name`, `strengths` (pros), `weaknesses` (cons),
  `warranty`, `priceRange` ($–$$$$ tier) — qualitative,
  sourceable from manufacturer warranty docs and product
  literature.
- The `brandComparisons` section (titles + brand pairings +
  qualitative winner labels) — no fabricated numbers.
- The `warrantyComparison` section — actual manufacturer-published
  warranty terms in years.

### Re-grounding the ordering

Brands within each category are now listed **alphabetically**
(previously: descending by fabricated rating). A one-line
methodology note on the page states this basis explicitly so
readers don't infer a hidden numeric rank.

### Schema re-check

`grep` on `app/brand-reviews/page.tsx` for `aggregateRating`,
`@type.*Review`, `@type.*Rating` → **zero hits**. Same grep
across `/app/` and `/lib/` confirmed no JSON-LD aggregate-rating
or review schema is emitted anywhere for this page.

### Final verification grep

- `grep -c "rating: 4\." app/brand-reviews/page.tsx` → **0**
- `grep -c "<Star\|Star," app/brand-reviews/page.tsx` → **0**

---

## §4 — Consolidate CSVs into `spec-ledger.csv`

**Commit:** `d597294  data(spec-ledger): consolidate spec-verification.csv + gate4 updates into RFC 4180 master ledger`

### Sources merged

- `spec-verification.csv` — 111 rows, gate 1 audit + gate 2
  status embedded inline. KNOWN malformed: 17 rows have unquoted
  commas inside notes or spec_type cells, so a naive csv.reader
  load produces shifted columns on those rows.
- `gate4-spec-updates.csv` — 40 rows, written as a SEPARATE file
  in Gate 4 because appending columns to the malformed original
  would corrupt it.

(There is no `gate2-spec-updates.csv` — Gate 2 updates were
embedded inline into spec-verification.csv as `gate2_status` /
`gate2_notes` columns. The locked file's reference to a separate
file was anticipatory.)

### Consolidation logic

- Parses spec-verification.csv with a **status-anchored reshape**
  for malformed rows: finds the `gate2_status` cell by matching
  against the known status vocabulary (AHRI-VERIFIED, CORRECTED,
  DELETED, OK-RETAINED, PENDING-RESEARCH, PENDING-AHRI) from the
  end of the row, then treats everything between the front
  anchors and the gate2_status as collapsed notes. No row drops;
  17 reshape successes.
- Resolves the final per-row status: if `gate2_status` is set, it
  supersedes the gate 1 status; otherwise the gate 1 status
  carries.
- Overlays Gate 4 updates: 17 merged onto matching existing rows,
  23 added as new model-spec rows that weren't in the original
  ledger.
- De-duplicates by `(page, file_line, brand, spec_type)` — keeps
  the most-resolved row.
- Extracts AHRI cert numbers from notes into a dedicated
  `cert_ref` column.

### Columns (RFC 4180 compliant)

```
page,file_line,brand,model,spec_type,stated_value,verified_value,status,source,cert_ref,notes
```

### Validation

```
$ python3 -c "import csv; r = list(csv.reader(open('spec-ledger.csv'))); print(len(r), 'total rows,', len(r[0]), 'header cols'); print(sum(1 for x in r[1:] if len(x) != len(r[0])), 'column-count mismatches')"
133 total rows, 11 header cols
0 column-count mismatches
```

**132 data rows + 1 header. Zero mismatches. Properly quoted.**

### Final status breakdown (132 rows)

| Status | Count |
|---|---|
| AHRI-VERIFIED | 26 |
| PENDING-RESEARCH | 24 |
| OK-RETAINED | 17 |
| DELETED | 16 |
| CORRECTED | 13 |
| B1-FINAL (Fujitsu XLTH) | 6 |
| B4-FINAL (Lennox XC25) | 6 |
| B5-FINAL (MrCool DIY) | 5 |
| B2-FINAL (LG Art Cool Premier) | 5 |
| A-FINAL (Tax YMYL) | 5 |
| B3-FINAL (Cooper & Hunter Sophia) | 5 |
| C-FINAL (NEEP cross-check) | 2 |
| PENDING-AHRI | 2 |

### Originals

`spec-verification.csv` and `gate4-spec-updates.csv` are kept in
place for traceability. `spec-ledger.csv` is now the source of
truth for spec-status questions going forward.

---

## Commit log (raptive-fix/05-cleanup off raptive-fix/04-batch2-specs-tax)

```
d597294  data(spec-ledger): consolidate spec-verification.csv + gate4 updates into RFC 4180 master ledger
bf7db9f  fix(brand-reviews): remove fabricated star ratings + reliability scores
75063bf  fix(faq): harden render — empty-guard verified + FAQ.Item extraction + strip 257 redundant markdown headings
13f99e9  fix(faq): extract faqData from MDX in getArticleBySlug
```

## Final verification

- ✅ `grep "^## Frequently Asked Questions" /workspace/content/` → 0 hits
- ✅ `grep "rating: 4\." /workspace/app/brand-reviews/` → 0 hits
- ✅ `grep "aggregateRating\|@type.*Review\|@type.*Rating" /workspace/app/brand-reviews/` → 0 hits
- ✅ `csv.reader` parses `spec-ledger.csv` cleanly: 133 rows, 11 cols, 0 mismatches
- ✅ `npm run build` → 376/376 pages generated, no errors

## Hard-rule adherence

- ✅ No new factual claims (cleanup-only gate)
- ✅ Parked `lib/content.ts` change committed as its own commit
- ✅ FAQ empty-state renders nothing (no empty heading, no empty FAQPage schema)
- ✅ Fabricated star ratings deleted; qualitative content preserved; ordering re-grounded honestly (alphabetical, stated on page)
- ✅ Build passes (376 pages)
- ✅ Small commits, one logical group each (4 commits)
- ✅ No merge, no push
- ✅ Did NOT touch: ads.txt, the 2 remaining PENDING-AHRI, the ~20 PENDING-RESEARCH minor variants
