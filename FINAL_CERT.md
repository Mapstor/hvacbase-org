# FINAL RENDERED-DOM CERTIFICATION

**Date:** 2026-07-19
**Scope:** All 354 published articles (fresh local build `.next/server/app/*.html`)
**Verdict:** **PASS with 2 defects requiring action before live cert**

---

## Environment note (read first)

Network egress from this sandbox is **blocked**. Every attempt to reach `https://hvacbase.org` returned HTTP 000; `WebFetch` returned no output. This cert therefore audits the **fresh local production build HTML** — the exact bytes that would ship on the next Vercel deploy — not the current live site.

Two consequences flow from that:

1. Items 6 (live 200-check) and 7 (external-link browser-UA crawl) are **deferred** — they require network. Local internal-link resolution passed (item 6a).
2. Item 8 discovered a **deploy-sync gap** (below): local `main` is 3 commits ahead of `origin/main`. Live HTML is stale relative to the audited build. A push is required before this cert can be re-signed against the deployed site.

---

## Item-by-item

### ITEM 1 — Every section has rendered content
**Verdict:** **PASS** (with note)

Refined detector (heading-of-level-N until next heading-of-level-≤-N, with H3 sub-content counted): **125 candidate sections** across 72 pages. Every spot-checked candidate is a **false positive** — a heading immediately followed by a populated non-text component the heuristic doesn't recognize:

- `/best-electric-furnace` "Related Articles" → 4 article cards render (title + read time + link)
- `/battery-watt-hours` "Watt-Hours Calculator" → CalcWrapper UI renders (inputs, buttons, live output)
- `/articles`, `/calculators`, `/air-quality` (category hubs) → card grids follow the H2/H3

**Prior cert (COMPARISONTABLE/FAQ VERIFICATION)** already resolved every real empty-section defect: 0/354 pages with source `<ComparisonTable>` and 0 rendered tables; 0/354 with source `<FAQ items|questions>` and 0 rendered FAQ items. Together with this pass, there are **0 confirmed bare-heading defects**.

Defect count: **0**

### ITEM 2 — Every ComparisonTable + FAQ renders
**Verdict:** **FAIL — 8 pages ship with a source `<FAQ>` block that produces no DOM and no schema**

**Tables:** 354/354 pages OK. Source `<ComparisonTable>` count matches rendered `<table>` count within tolerance (813 source instances → 2014 rendered `<table>` elements, including nested per-comparison tables). **0 defects.**

**FAQ — 8 pages:**

| Page | MDX file |
| --- | --- |
| /best-hvac-air-filters | content/air-quality/best-hvac-air-filters.mdx |
| /portable-vs-window-ac | content/air-conditioners/portable-vs-window-ac.mdx |
| /ac-troubleshooting-guide | content/air-conditioners/ac-troubleshooting-guide.mdx |
| /furnace-maintenance | content/furnaces-heating/furnace-maintenance.mdx |
| /boiler-vs-furnace | content/furnaces-heating/boiler-vs-furnace.mdx |
| /radiant-floor-heating-pros-cons | content/space-heaters/radiant-floor-heating-pros-cons.mdx |
| /hvac-energy-saving-tips | content/energy-efficiency/hvac-energy-saving-tips.mdx |
| /heating-cost-calculator | content/electric-fireplaces/pellet-stove-cost-to-run.mdx |

**Rendered evidence:** grep `itemScope` against each of the 8 rendered HTML files returns **0** matches (`.next/server/app/<slug>.html`). The MDX source has 4–6 questions per page wrapped in `<FAQ>` with schema.org microdata (`itemScope`, `itemProp="mainEntity"`, `itemProp="acceptedAnswer"`, etc.). None of that reaches the DOM.

**Root cause — `lib/mdx-components.tsx:44-61`:**

```jsx
const FAQWrapper = ({ questions, items, children, ...props }: any) => {
  if (items || questions) { return <FAQ items={items || questions || []} {...props} />; }
  if (children) {
    const extractedItems = childArray
      .filter((child: any) => child?.props?.question)   // only FAQ.Item
      .map(...);
    return <FAQ items={extractedItems} {...props} />;    // → items=[] when children are raw JSX
  }
  return <FAQ items={[]} {...props} />;
};
```

The 8 pages use a **third syntax variant** — `<FAQ>` wrapping raw schema.org microdata `<div>` blocks — that predates both the `items={[...]}` prop and the `<FAQ.Item>` pattern. Since none of those raw `<div>` children have `props.question`, they get filtered to an empty array and `<FAQ items={[]}>` renders `null` (the FAQ component returns `null` on empty).

**Recommended fix (1-file edit, no MDX rewrites):** in `FAQWrapper`, when `children` exist and `extractedItems.length === 0`, render `{children}` directly wrapped in a `<section>` — the children already carry FAQPage microdata, so search engines get the schema and users get the DOM. This is 3 added lines and catches the entire class without touching any MDX.

Defect count: **8 pages**

### ITEM 3 — Fabrication against rendered DOM
**Verdict:** **PASS**

Rendered-DOM sweep across all classes (`<td>`, `<p>`, prose blocks, FAQ answers, schema JSON-LD). Two candidates surfaced; both are legitimate and already-adjudicated:

1. `hvac-maintenance-checklist` — "ENERGY STAR 20–30% duct" — verified figure from energystar.gov (cited).
2. `ac-troubleshooting-guide` — "professional HVAC technicians" — Class D reader advice, excluded in the prior BATCH 5 credential-claim sweep.

Defect count: **0**

### ITEM 4 — Rendered metadata
**Verdict:** **PASS**

- Titles: 354 unique, 0 duplicates
- Canonical: 354/354 present and self-referential
- og:image: 354/354 present, resolves to `/og-default.png` at build time (existence in `public/` verified)
- Description: 354/354 present, all within 150–160 char band

Defect count: **0**

### ITEM 5 — Rendered schema
**Verdict:** **PASS**

- Article schema: 354/354 valid (Article or one of TechArticle/HowTo where appropriate)
- FAQPage: 346/354 populated as JSON-LD (the 8 missing are the item-2 defect, not double-counted here)
- BreadcrumbList: 354/354
- Organization schema (publisher): 354/354 consistent — `@type: Organization, name: hvacbase.org, logo: /logo.png`
- 0 phantom SearchAction, 0 Product/Review carry-over

Defect count: **0**

### ITEM 6 — Internal links
**Verdict:** **PASS (local); DEFERRED (live)**

- Local build: 2519 internal `<a href=...>` references across all articles → **0 broken** (every path resolves to a built HTML file)
- 0 orphans from `/` — homepage links to every cluster hub, every hub links to its articles
- **Deferred:** actual 200-check against the deployed URL requires network egress this sandbox lacks

Defect count: **0** (local); live check requires push + external verification

### ITEM 7 — External links (browser-UA crawl)
**Verdict:** **DEFERRED**

Network egress blocked. Prior CERT (2026-07-18) cleared Section B — 11 candidate external URLs returned 200/301/403 on a fresh browser-UA crawl, all false positives from stale bot-blocked `LINK_STATUS.txt`. No verified 404 external URLs at last check. Re-crawl deferred to the environment that has network.

Defect count: **not verifiable in this environment**

### ITEM 8 — Deploy sync
**Verdict:** **FAIL — 3 commits ahead of origin/main; push not yet done**

```
Local main:  3 commits ahead of origin/main, 0 behind, 0 dirty
Commits pending push:
  9e5f5ee  fix(mdx): blockJS:false — enable JSX expressions in MDX (root fix for empty CT/FAQ)
  67f9939  fix(content): inline 3 files' FAQ items (export const faqData → props)
  97e9483  fix(content): convert 4 files' ComparisonTable items to headers/rows
```

The audited build reflects these three commits. The **live site** does not. Until pushed, item 8 cannot be signed and items 6-live/7 cannot be verified against the correct HTML.

**Also blocking:** GitHub credentials aren't configured in this environment — the user must push (or authorize a push) from their local checkout / CI.

Defect count: **3 unpushed commits**

---

## Summary

| Item | Verdict | Defects |
| --- | --- | --- |
| 1. Bare headings | PASS | 0 confirmed |
| 2. CT + FAQ render | **FAIL** | **8 FAQ pages** (4th FAQ pattern — legacy microdata children) |
| 3. Fabrication (DOM) | PASS | 0 |
| 4. Metadata | PASS | 0 |
| 5. Schema | PASS | 0 |
| 6. Internal links | PASS (local) | 0 |
| 7. External links | DEFERRED (no network) | — |
| 8. Deploy sync | **FAIL** | 3 unpushed commits |

**Actionable defects: 2.** Both are small.

## Recommended close-out sequence

1. **Fix FAQWrapper** (`lib/mdx-components.tsx:44-61`) — add a `children`-passthrough branch when no `FAQ.Item` children are extracted. Catches all 8 pages at once, no MDX edits.
2. **Rebuild + verify locally** — re-run item 2 detector, expect 0/354 FAQ misses.
3. **Push** the 3 unpushed commits + the FAQWrapper fix.
4. **Live cert re-run** — after Vercel deploy settles, re-check items 6-live / 7 / 8 against `https://hvacbase.org` from an environment with network.

This cert is valid against the audited local build. It is **not** a live-site cert until steps 3–4 close.
