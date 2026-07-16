# GATE3_IDENTITY_LOCKED.md — real-identity E-E-A-T rebuild

**Status:** FINAL COPY. CC transcribes this verbatim. Do not invent credentials, titles, history, or experience beyond what's written here.
**Person:** Marko Visic — real owner/author. **Do NOT** add licensed-contractor / NATE / mechanical-engineer claims. The honest positioning (physicist explaining HVAC from first principles, primary-sourced) is what passes review.
**Confirmed settings:** byline = "Marko Visic, BSc Physics" · LinkedIn visible on page + in schema · public email = info@hvacbase.org · photo source = repo-root `1516504244885.jpeg` → `public/authors/marko-visic.jpg`.

---

## 1. AUTHOR BOX (article cards + article footer) — replace every `{{TODO-IDENTITY}}`

**Byline (visible):** Marko Visic, BSc Physics
**Photo:** `/authors/marko-visic.jpg` (alt: "Marko Visic, founder of HVACBase")
**Short bio (visible under byline):**
> Marko Visic holds a BSc in Physics from the Faculty of Mathematics and Physics, University of Ljubljana, where he focused on thermodynamics and heat transfer — the physics behind how heat pumps, air conditioners, insulation, and airflow actually work. He founded HVACBase to explain HVAC from first principles, using manufacturer documentation and AHRI-certified specifications.

**Links in the author box (both visible):**
- "More about the author →" → `/about`
- LinkedIn → https://www.linkedin.com/in/marko-visic/ (label "LinkedIn", opens new tab, `rel="me noopener"`)

Apply this single author component to all articles (replace the `{{TODO-IDENTITY}}` placeholder and the publisher-fallback byline). One real named author across the site is correct and honest — do NOT fabricate co-authors or a team.

---

## 2. ABOUT PAGE — full replacement copy

> ## About HVACBase
>
> HVACBase is written by **Marko Visic**, a physicist (BSc, Faculty of Mathematics and Physics, University of Ljubljana). While studying thermodynamics, he became interested in heat-transfer applications — the equations that explain how heat pumps, air conditioners, insulation, and airflow behave in a real home. HVACBase grew out of that interest: a site that starts from the physics of heat transfer and connects it to practical HVAC decisions, backed by primary-sourced specifications.
>
> ### Why this site exists
> Most HVAC information online tells you *which* unit to buy. HVACBase tries to explain *why* — the thermodynamics underneath the spec sheet — so you can reason about your own home: your climate, your heating load, your cooling load. The goal is to help any homeowner understand how HVAC works and which system actually fits their situation, and to give people enough well-sourced grounding to understand the systems they already own.
>
> ### How we source
> Every specification on this site comes from manufacturer documentation, the **AHRI Directory**, or **ENERGY STAR**. Where a number can't be verified against a primary source, it isn't published. We don't run a testing lab and we don't claim to — our value is clear explanation of verified data, not invented measurements.
>
> ### What this site is not
> HVACBase is an independent education site. Marko is a physicist, **not a licensed HVAC contractor** — nothing here is a substitute for a licensed professional for installation, sizing sign-off, repair, or safety work. Always have equipment installed and verified by a qualified contractor.
>
> ### Publisher
> HVACBase is published by **Moving Data Systems d.o.o.**, Smolnik 62, 2342 Ruše, Slovenia. Contact: info@hvacbase.org · [LinkedIn](https://www.linkedin.com/in/marko-visic/).

---

## 3. EDITORIAL POLICY — full replacement copy

> ## Editorial Policy
>
> ### Who writes HVACBase
> HVACBase is researched and written by **Marko Visic, BSc Physics** (Faculty of Mathematics and Physics, University of Ljubljana). He is the site's sole author and editor. He is a physicist specializing in thermodynamics and heat transfer — **not a licensed HVAC contractor** — and the site reflects that: clear, physics-grounded explanation built on verified manufacturer and certification data.
>
> ### How we source specifications
> All efficiency ratings and technical specifications are taken from primary sources: the **AHRI Directory** (ahridirectory.org), **ENERGY STAR**, and manufacturer documentation. Where relevant we cite the AHRI Certified Reference Number. **If a figure cannot be verified against a primary source, we do not publish it.** When we lack the certified data to make a claim, we say so plainly rather than estimate.
>
> ### What we don't do
> We do not run a testing laboratory, and we never claim first-hand testing or measurements we didn't perform. We do not accept payment for reviews or rankings, and the site carries **no affiliate links** — recommendations are based only on verified specifications and the underlying physics.
>
> ### Corrections
> Specifications change as manufacturers update equipment and as standards evolve (for example, the SEER → SEER2 transition). If you find an error, email info@hvacbase.org and we'll verify against the primary source and correct it.
>
> _Last updated: [CC: set to the date these edits land]._

(Note: the fabricated "Expert Review Team" section was already removed in Gate 1; ensure no remnant references to a review panel survive.)

---

## 4. CONTACT PAGE — real identity

- **Publisher:** Moving Data Systems d.o.o.
- **Address:** Smolnik 62, 2342 Ruše, Slovenia
- **Email:** info@hvacbase.org
- **Author/owner:** Marko Visic, BSc Physics — [LinkedIn](https://www.linkedin.com/in/marko-visic/)
- Remove the role-email theater (`support@`, etc.) unless those inboxes are real and monitored; a single working `info@` is better than several unmonitored ones.

---

## 5. PERSON JSON-LD (About + author component; reference from each Article `author`)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Marko Visic",
  "url": "https://www.hvacbase.org/about",
  "image": "https://www.hvacbase.org/authors/marko-visic.jpg",
  "jobTitle": "Founder & Author",
  "description": "Physicist (BSc, University of Ljubljana) specializing in thermodynamics and heat transfer; founder of HVACBase, a physics-first HVAC education site sourced from manufacturer and AHRI-certified specifications.",
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Faculty of Mathematics and Physics, University of Ljubljana"
  },
  "knowsAbout": ["HVAC systems", "Thermodynamics", "Heat transfer", "Heat pumps", "Air conditioning", "Building insulation", "Airflow"],
  "worksFor": {
    "@type": "Organization",
    "name": "Moving Data Systems d.o.o.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Smolnik 62",
      "postalCode": "2342",
      "addressLocality": "Ruše",
      "addressCountry": "SI"
    }
  },
  "sameAs": ["https://www.linkedin.com/in/marko-visic/"]
}
```

In each `Article`/`BlogPosting` JSON-LD, set `"author"` to a `Person` with `"name": "Marko Visic"` and `"url": "https://www.hvacbase.org/about"`. Update `lib/schema.ts` so the author constant is the real Person (not the publisher `SITE_NAME` fallback). Keep `publisher` as the Organization (Moving Data Systems d.o.o.).

---

## 6. PHOTO WIRING (CC, local)

- Source: repo-root `1516504244885.jpeg`.
- Move/copy to `public/authors/marko-visic.jpg`. Optimize: resize to ~512px square for the author card (and keep a larger ~800px version if About uses one), strip EXIF, export optimized JPG (or WebP with JPG fallback).
- `alt`: "Marko Visic, founder of HVACBase".
- Confirm the schema `image` URL and the rendered `<img>`/`next/image` src both resolve on localhost before committing.
- Remove the stray `1516504244885.jpeg` from the repo root after moving it (don't ship it untracked).

---

## 7. RULES FOR CC

1. Transcribe the copy above verbatim. No added credentials, titles, tenure, or testing claims.
2. Replace ALL `{{TODO-IDENTITY}}` markers with the real author component.
3. Keep the honesty guardrails intact: physicist (not licensed contractor), no first-person testing, no affiliate links, verified-or-omitted.
4. Branch off the latest gate (`raptive-fix/03-identity` off `02b-ahri-certs`). Small commits, no push.
5. Re-run build; confirm 376 pages compile and the author photo resolves.
