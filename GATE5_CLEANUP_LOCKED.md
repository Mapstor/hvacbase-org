# GATE5_CLEANUP_LOCKED.md — FAQ-render, star-ratings, CSV consolidation

**Status:** Cleanup gate. No new factual claims, no research. Removals, a render-hardening, a parked-commit, and a data-file consolidation.
**Branch:** `raptive-fix/05-cleanup` off `raptive-fix/04-batch2-specs-tax`. Small commits, no push.
**Skills active:** google-ai-content-policy + portfolio-page-quality.

---

## 1. COMMIT THE PARKED FAQ-EXTRACTION (it has never been committed)

`lib/content.ts` has an uncommitted working-tree change (the `faqData` extraction: interface field line ~27, parser lines ~58–66, raw-export strip line ~83, attach line ~92). It has survived across four gates only as a dirty file — it is NOT in any commit. **Commit it now** as its own commit on this branch (`fix(faq): extract faqData from MDX in getArticleBySlug`).

Before committing, inspect it and confirm:
- The parser populates `faqData` for an article whose MDX contains `export const faqData = [...]`.
- The raw `export const faqData` block is stripped from the rendered body (no raw code leaks onto the page).
- If the regex is single-line/brittle (only matches `{ question: "...", answer: "..." }` on one line with simple quotes), make it tolerant of multi-line entries and both quote styles — but keep the change minimal and safe. Do not break the build.

## 2. HARDEN FAQ RENDER — kill the blank "Frequently Asked Questions" heading

Root cause of the blank-FAQ bug (flagged on `best-mini-split-ac-units.mdx` and likely others): the FAQ heading renders even when there are no items.

In `components/ui/FAQ.tsx`:
- **If `items` is empty (or undefined), render `null`** — no heading, no schema, nothing. (Currently `items = []` defaults exist but the component still renders the title/wrapper.)
- Ensure the `FAQPage` JSON-LD (line ~26) is only emitted when there is at least one real Q&A item. Never emit an empty `FAQPage`.

Then verify (acceptance criteria):
- Pages WITH a real `faqData` export → FAQ section renders with questions + answers + valid FAQPage schema.
- Pages WITHOUT `faqData` (or empty) → NO "Frequently Asked Questions" heading, NO empty schema.
- Spot-check `best-mini-split-ac-units.mdx` specifically (the audit's named offender): either it now shows real FAQs (if it has faqData) or the heading is gone entirely.
- Grep for any page that hardcodes a "Frequently Asked Questions" heading in MDX/JSX separate from the component, and fix those to use the component (so the empty-guard applies).

## 3. REMOVE FABRICATED STAR RATINGS from /brand-reviews

`app/brand-reviews/page.tsx` hardcodes invented precise ratings (`rating: 4.8, 4.7, 4.6 …` for ~16 brands, lines ~23–167) rendered as visible `<Star>` components (lines ~301, ~365–371). These are fabricated trust signals with no methodology, sample, or rating system — the same class of fabrication as the fake specs. **Decision: remove entirely; keep qualitative reviews.**

Do this:
- Delete the `rating:` field from every brand object.
- Remove the `<Star>` rendering and the numeric rating display (the `{brand.rating}` block and the star-fill loop).
- Remove the now-unused `Star` import if nothing else uses it in that file.
- Keep the qualitative content (pros/cons, warranty, reliability prose, value analysis) — that stays and is the honest substance.
- If removing ratings leaves a now-empty column/layout, tidy the layout so it reads cleanly (don't leave a dangling empty rating slot).
- **Confirm there is NO `aggregateRating` / `Review` JSON-LD** anywhere tied to these (Gate 1 said none existed — re-verify on this page specifically now that we're here).
- Any ranking/ordering that was driven by the fake `rating` value should be re-grounded on something honest (e.g. order by verified efficiency tier, or alphabetical, or "editor's grouping") — do NOT preserve a hidden numeric rank derived from the deleted fake numbers. State the basis of ordering in a short line on the page.

## 4. CONSOLIDATE THE CSVs into one clean master

There are multiple overlapping ledgers: `spec-verification.csv` (~112 rows, KNOWN malformed — unquoted commas in some rows), plus `gate2-spec-updates.csv` and `gate4-spec-updates.csv`. CC created the gate-N files separately precisely because appending to the malformed original would corrupt it.

Produce ONE clean master, `spec-ledger.csv`:
- Properly quoted (every field with a comma/quote wrapped; escape embedded quotes per RFC 4180).
- Columns: `page,file_line,brand,model,spec_type,stated_value,verified_value,status,source,cert_ref,notes`.
- Merge all three files; where a Gate 2/4 update supersedes an original row, the master shows the FINAL state (status like AHRI-VERIFIED / VERIFIED / WRONG-FIXED / PENDING-RESEARCH / PENDING-AHRI / OK) with the cert ref or source.
- De-duplicate rows that describe the same page+line+spec; keep the most-resolved one.
- Validate it parses cleanly (e.g. load it once with a CSV parser / `python -c "import csv,sys;list(csv.reader(open('spec-ledger.csv')))"`), report row count.
- Keep the originals in place for now (don't delete) but mark `spec-ledger.csv` as the source of truth in the gate summary.

---

## 5. RULES FOR CC
1. No new factual claims. This gate is cleanup only.
2. Commit the parked lib/content.ts change as its own commit (don't let it ride loose any longer).
3. FAQ empty-state must render nothing — no empty heading, no empty FAQPage schema.
4. Star ratings: delete the fabricated numbers + star UI; keep qualitative reviews; re-ground any ordering honestly.
5. Build must pass (376 pages). Grep that no blank FAQ heading and no `rating: 4.` literals remain in brand-reviews.

## 6. OUTPUT
`gate5-cleanup-summary.md`:
- Which commit landed the FAQ extraction.
- FAQ empty-guard before/after + the spot-check result on best-mini-split-ac-units.mdx.
- Count of star ratings removed + confirmation no aggregateRating/Review schema remains.
- `spec-ledger.csv` row count + parse-validation result.
- Build status + diff summary. No push.
