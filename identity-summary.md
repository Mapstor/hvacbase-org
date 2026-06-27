# identity-summary.md — Gate 3 / Branch `raptive-fix/03-identity`
**Date:** 2026-06-26
**Branch:** `raptive-fix/03-identity` (off `raptive-fix/02b-ahri-certs`; 7 commits; NOT pushed, NOT merged)
**Build:** ✅ `npm run build` passes — 376/376 static pages generated, no errors
**Markers resolved:** 2/2 `{{TODO-IDENTITY}}` placeholders removed (lib/schema.ts and components/layout/ArticleLayout.tsx); grep across `/app`, `/content`, `/components`, `/lib` returns **zero hits**.
**Source of truth:** `GATE3_IDENTITY_LOCKED.md` — all copy transcribed verbatim, no added credentials, titles, tenure, or testing claims.
**Skills:** `google-ai-content-policy` + `portfolio-page-quality` (both at `/home/node/.claude/skills/`) — applied as a gate against fabricated credentials / scaled content / unverified claims.

---

## Per-section change log

### §1 — Author component (`AuthorBox`)

New file: `components/layout/AuthorBox.tsx`. Single component for the real owner, used in two variants:
- **`inline`** — compact byline in the article header (photo + "Marko Visic, BSc Physics" linking to /about + LinkedIn link)
- **`card`** (default) — full footer card with photo + byline + bio + "More about the author →" + LinkedIn

**Imports its strings from `lib/schema.ts`** (`AUTHOR_NAME`, `AUTHOR_IMAGE`, `AUTHOR_LINKEDIN`) so there's one source of truth. The bio paragraph is verbatim from the locked copy with a comment pointing back to `GATE3_IDENTITY_LOCKED.md`.

Wired into:
- `components/layout/ArticleLayout.tsx` — `<AuthorBox variant="inline" />` in the header byline + `<AuthorBox variant="card" />` at the bottom of every article.

All `{{TODO-IDENTITY}}` placeholder strings removed.

### §2 — About page

`app/about/page.tsx` fully replaced with the verbatim locked copy:
- Author hero (photo via next/image at 160px, byline "Marko Visic, BSc Physics", University of Ljubljana credential).
- "Why this site exists" — physics-first framing.
- "How we source" — AHRI / ENERGY STAR / manufacturer; verified-or-omitted.
- "What this site is not" — physicist, **not a licensed contractor**.
- Publisher block — Moving Data Systems d.o.o., Smolnik 62, 2342 Ruše, Slovenia + info@hvacbase.org + LinkedIn.
- Full `Person` JSON-LD inline via `generatePersonSchema()`.

Size: 632 lines → 110 lines.

### §3 — Editorial Policy

`app/editorial-policy/page.tsx` fully replaced with the verbatim locked copy:
- "Who writes HVACBase" — Marko, sole author/editor, physicist not licensed contractor.
- "How we source specifications" — AHRI / ENERGY STAR / manufacturer; AHRI Certified Ref# cited where relevant; verified-or-omitted.
- "What we don't do" — no testing lab, no first-hand measurements, no paid reviews, no affiliate links.
- "Corrections" — email info@hvacbase.org.
- Last updated: **June 26, 2026**.

Size: 312 lines → 70 lines. No remnant of the prior "Expert Review Team / Technical Reviewers / Editorial Team" panels (already removed in Gate 1; verified again).

### §4 — Contact

`app/contact/page.tsx` replaced with real-identity copy:
- Email: **info@hvacbase.org** (one inbox, monitored personally).
- Publisher: Moving Data Systems d.o.o. with full address (multi-line block).
- Author/owner: Marko Visic, BSc Physics + LinkedIn.
- "What to include in your email" + "What HVACBase is not" sections.

Removed:
- `support@hvacbase.org`, `content@hvacbase.org`, `technical@hvacbase.org`, `editorial@hvacbase.org`, `corrections@hvacbase.org` (all role-email theater)
- "Quick Response Guaranteed" / "24-48 hours" unverifiable claims
- "Partnerships" callout
- Padding scaffolding (FAQ, Important Notes, etc.)

Size: 250 lines → 80 lines.

### §5 — Person schema

`lib/schema.ts`:
- Removed `{{TODO-IDENTITY}}` placeholder marker.
- Added **exported author constants**: `AUTHOR_NAME` ("Marko Visic"), `AUTHOR_URL` (/about), `AUTHOR_IMAGE` (/authors/marko-visic.jpg), `AUTHOR_JOB_TITLE`, `AUTHOR_DESCRIPTION`, `AUTHOR_ALUMNI`, `AUTHOR_LINKEDIN`, `PUBLISHER_NAME` ("Moving Data Systems d.o.o."), `PUBLISHER_ADDRESS` (with full PostalAddress object).
- Added **`generatePersonSchema()`** — emits the full Person JSON-LD node per the locked file (name, url, image, jobTitle, description, alumniOf, knowsAbout, worksFor with address, sameAs LinkedIn). The node carries an `@id` (`https://www.hvacbase.org/about#marko-visic`) so other schema nodes can reference it.
- Updated **`generateArticleSchema()`**:
  - `author` now emits a Person reference (`@type: Person`, with `@id`, `name`, `url`, `image`, `sameAs` = [LinkedIn]) — replaces the prior Organization fallback.
  - `publisher` updated from `SITE_NAME` ("HVAC Base") to `PUBLISHER_NAME` ("Moving Data Systems d.o.o.") — the legal entity per the locked file.

`components/seo/SEOHead.tsx`:
- `<meta name="author">` fallback changed from "HVAC Base" to "Marko Visic".

### §6 — Photo wiring

- Source: repo-root `1516504244885.jpeg` (390×390 JPEG, 22 KB)
- Resized to **512×512** (author card) and **800×800** (About hero) via ImageMagick `convert` with `-strip -quality 85`. EXIF removed.
- Wired:
  - `/public/authors/marko-visic.jpg` (26.5 KB) — referenced from AuthorBox component + Person schema `image` field
  - `/public/authors/marko-visic-large.jpg` (49 KB) — About hero (priority loading)
- Alt text everywhere: **"Marko Visic, founder of HVACBase"**
- Stray `/workspace/1516504244885.jpeg` deleted (no longer in repo root)
- Person schema `image` URL: `https://www.hvacbase.org/authors/marko-visic.jpg`
- Rendered `<img>` via `next/image` resolves to `/authors/marko-visic.jpg` (served from `/public`)

Both URLs resolve cleanly at build time (next.js static generation succeeded for `/about` which uses the priority-loaded large variant).

---

## Marker counts before / after

| Marker | Gate 2b close | Gate 3 close | Δ |
|--------|---------------|--------------|----|
| `{{TODO-IDENTITY}}` | 2 | **0** | **−2 resolved** |
| `PENDING-AHRI` | 2 (Carrier Infinity, MSZ-FH) | 2 (unchanged) | 0 |
| `PENDING-RESEARCH` | ~20 | ~20 (unchanged) | 0 |
| `NEEDS-VERIFICATION` | 7 (25D, 45L) | 7 (unchanged) | 0 |

---

## Honesty guardrails (verified intact)

- Marko's credential is exactly **"BSc Physics"** — no added titles, NATE certifications, mechanical-engineering claims, or contractor licensure.
- Every article page explicitly states "**not a licensed HVAC contractor**" in the About + Editorial Policy.
- No first-person testing claims (Gate 1 strip held; re-verified here).
- "No affiliate links" stated consistently (Editorial Policy + prior Gate 1 reconciliation).
- "Verified-or-omitted" rule stated plainly in Editorial Policy + About + AuthorBox bio.

---

## Files touched

| File | Status |
|------|--------|
| `public/authors/marko-visic.jpg` | NEW (512×512) |
| `public/authors/marko-visic-large.jpg` | NEW (800×800, About hero) |
| `1516504244885.jpeg` (repo root) | DELETED |
| `lib/schema.ts` | MAJOR — Person constants + generatePersonSchema + Article.author = Person + publisher = real entity |
| `components/seo/SEOHead.tsx` | meta author tag → "Marko Visic" |
| `components/layout/AuthorBox.tsx` | NEW (96 lines, two variants) |
| `components/layout/ArticleLayout.tsx` | byline → `<AuthorBox variant="inline" />` + footer card added |
| `app/about/page.tsx` | full replacement (632 → 110 lines) |
| `app/editorial-policy/page.tsx` | full replacement (312 → 70 lines) |
| `app/contact/page.tsx` | full replacement (250 → 80 lines) |

---

## Commits on this branch (6 spec commits + 1 docs)

```
(docs commit to follow this file)
45c6665 identity(contact): real publisher + drop role-email theater
42a8a61 identity(editorial-policy): replace with locked copy
25b8f0e identity(about): replace About page with locked copy + Person JSON-LD
fad58f4 identity(author-box): build AuthorBox component + integrate everywhere
2535ff0 identity(schema): real Person author + publisher entity
54ae83f identity(photo): move marko-visic.jpg into public/authors
```

---

## What's NOT in this gate (per the hard rules)

- **`lib/content.ts`** — pre-session FAQ-extraction modification still in working tree, NOT staged (deferred to the FAQ-render gate)
- **`ads.txt`** — later gate
- **Section F `PENDING-RESEARCH` specs** (Fujitsu, LG, Cooper & Hunter, Lennox XC25, MrCool DIY, Pioneer, NEEP cross-check) — untouched
- **Visible `/brand-reviews` star ratings** — soft visible flag, deferred per the audit's batch plan

---

## Build verification

```
✓ Generating static pages (376/376)
   Finalizing page optimization ...
   Collecting build traces ...
```

Build clean. All 376 static pages render. Person schema validates (proper @type, @id, all required fields). Author photo resolves at both `/authors/marko-visic.jpg` and `/authors/marko-visic-large.jpg`. No MDX compile errors. Branch is NOT pushed and NOT merged.

---

**END OF GATE 3 SUMMARY.**
