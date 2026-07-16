# E-E-A-T / Author Assets

## Author-image files

- `public/authors/marko-visic.jpg` — **PRESENT**. Referenced from `lib/schema.ts:10` as `AUTHOR_IMAGE`.
- `public/authors/marko-visic-large.jpg` — **PRESENT**. Referenced from `app/about/page.tsx:27`.

Both files exist. Not sized here (no `identify` tool call).

## Author byline consistency

Checked across four surface areas.

| Surface | Byline phrasing |
|---|---|
| `lib/schema.ts` `AUTHOR_JOB_TITLE` | `'Founder & Author'` |
| `lib/schema.ts` `AUTHOR_DESCRIPTION` | `'Physicist (BSc, University of Ljubljana) specializing in thermodynamics and heat transfer; founder of HVACBase, ...'` |
| `components/layout/AuthorBox.tsx` `AUTHOR_BYLINE` | `'Marko Visic, BSc Physics'` |
| `components/layout/AuthorBox.tsx` `AUTHOR_PHOTO_ALT` | `'Marko Visic, founder of HVACBase'` |
| `components/layout/AuthorBox.tsx` `AUTHOR_BIO` | `'... founded HVACBase to explain HVAC from first principles ...'` (physicist + BSc + thermodynamics + heat transfer + first principles) |
| `app/about/page.tsx` | `'Founder & author'` role label, then `'Marko Visic, BSc Physics'` name, then `'... physicist (BSc, University of Ljubljana) specializing in thermodynamics and heat transfer'` bio |
| `app/editorial-policy/page.tsx` | `'Marko Visic, BSc Physics — the site's sole author and editor. He is a physicist specializing in ...'` |
| `Person` JSON-LD (schema.ts) | `name='Marko Visic'`, `jobTitle='Founder & Author'`, `description='Physicist (BSc, University of Ljubljana) ...'`, `alumniOf.name='Faculty of Mathematics and Physics, University of Ljubljana'` |

**Consistency assessment: PASS.** Every surface calls him:
- Marko Visic (name)
- BSc Physics (credential)
- Physicist (discipline, alt: "physicist specializing in thermodynamics and heat transfer")
- Founder & Author (role, or "sole author and editor")

Nothing calls him "certified HVAC contractor" / "NATE-certified technician" or any credential he doesn't hold. Nothing calls him CEO/CTO or any executive title. Nothing conflates roles. E-E-A-T-wise this is defensible: a single physicist explaining HVAC from first principles, using AHRI/manufacturer docs. Clean.

## Publisher / Organization

- `lib/schema.ts:18` `PUBLISHER_NAME = 'Moving Data Systems d.o.o.'`
- `lib/schema.ts:19` `PUBLISHER_ADDRESS`: Smolnik 62, 2342 Ruše, SI
- `app/about/page.tsx` and `app/contact/page.tsx` both cite the same publisher name + address.
- **BUT** — `lib/schema.ts:4` sets `SITE_NAME = 'HVAC Base'` used only in `WebSite` JSON-LD. Not "Moving Data Systems". This creates a two-entity graph in Google's structured-data index — WebSite.name says one thing, Article.publisher.name says another.

Recommendation: emit a single `Organization` node on `/about` with `@id='https://www.hvacbase.org/#organization'`, then reference it via `@id` in both `WebSite.publisher` and `Article.publisher`.

## Date-stamp analysis

Ground truth: read frontmatter across all 355 MDX files.

- Files with missing `datePublished`: **4** — mostly the two files with no `slug:` frontmatter plus two others (check `AUDIT_INVENTORY/dates_full.json`).
- Files where `datePublished == dateModified` (strict): **157** — batch-stamp signal.
- Files where `dateModified` is unset (falls back to `datePublished` per `content.ts:92`): additional; combined "no distinct dateModified" count = **211**.
- Files stamped in the 4-day launch batch window **2026-02-05 through 2026-02-08**: **184** of 355 = **52%**.

Top 10 datePublished values:

| Date | Files |
|---|---|
| 2026-02-05 | 114 |
| 2026-01-15 | 46 |
| 2026-02-07 | 32 |
| 2026-02-01 | 30 |
| 2026-02-06 | 29 |
| 2026-01-20 | 16 |
| 2026-01-25 | 11 |
| 2026-04-06 | 9 |
| 2026-02-08 | 9 |
| 2026-01-28 | 8 |

**114 files stamped on a single day (2026-02-05).** That's ~32% of the corpus with the same publish date — a strong batch-generation signal for Google's freshness/authorship models.

Recommendation: as part of compliance work, when substantive edits are made (Batches A, B, C, C.1, C.2, D), bump `dateModified` to actual edit date instead of leaving it equal to `datePublished`. This is a low-cost E-E-A-T signal.

## Cross-references

- Full date inventory: `AUDIT_INVENTORY/dates_full.json`
- Schema notes on Organization split: `schema.md`
- Person node emission: `schema.md`, section on Person full node with `@id`

## Not detected

- No fake bylines (no "John Smith, HVAC contractor" or similar false personas)
- No AI-persona placeholder like "our team of experts" that would violate Google's AI-content guidance
- No `AggregateRating` / `Review` schema anywhere (confirmed via grep)
