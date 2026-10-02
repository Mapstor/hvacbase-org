# EMPTY_SECTIONS.md — diagnosis of two bugs seen on /best-gas-furnace-brands

Read-only investigation. No edits applied. Stop for user ruling on how to fix each.

## Bug 1 — Empty content headings

### What was reported
Headings on /best-gas-furnace-brands appear to have no content beneath them (e.g., `## Best Furnace by Budget`, `## Best Furnace by Climate`). Assumed to be persona-strip collateral.

### What SSR HTML showed
A naive SSR-based detector flagged **275 files (77% of articles) with 768 "hollow" heading findings**. Top offenders:

| Slug | Hollow count | Example heading |
|---|---:|---|
| ac-troubleshooting-guide | 16 | `## 1. AC Not Cooling — Most Common Problem` |
| heating-cost-calculator | 12 | `## Understanding Heating System Efficiency` |
| 14-seer-vs-16-seer-vs-20-seer | 11 | `## The Law of Diminishing Returns` |
| portable-vs-window-ac | 11 | `## Head-to-Head Comparison Overview` |
| best-hvac-air-filters | 10 | `## Understanding MERV Ratings...` |
| best-gas-furnace-brands | 5 | `## Detailed Brand Reviews`, `## Best Furnace by Budget`, `## Best Furnace by Climate` |

### Source cross-check (this is the real answer)
Re-parsed the SOURCE MDX for the same files with a stricter detector: a section is "real hollow" only when the H2/H3/H4 is followed IMMEDIATELY by the next equal-or-higher heading with NO content (no prose, no `<ComparisonTable>`, no `<FAQ>`, no `<Callout>`, no list, no table) between them.

**Result: 0 real hollow sections in source across all 355 MDX files.**

Every SSR-flagged "hollow" section, when examined in source, is actually populated by either:
- Immediate H3/H4 subsections that themselves have content, OR
- A `<ComparisonTable>`, `<FAQ>`, `<Callout>`, or markdown table directly under the H2

Spot-check of the 3 examples the naive detector flagged in /best-gas-furnace-brands:

| Line | Heading | Actual content in source |
|---|---|---|
| 63 | `## Detailed Brand Reviews` | Immediately followed by `### 1. Carrier — Best Overall Technology` and full H3 subsections with prose + tables |
| 230 | `## Best Furnace by Budget` | Immediately followed by `<ComparisonTable title="Our Picks by Budget — 2026" ...>` with 5 rows |
| 244 | `## Best Furnace by Climate` | Immediately followed by `<ComparisonTable title="Our Picks by Climate — 2026" ...>` with 4 rows |

### Root cause
Same as the 19 SSR-thin pages documented in the earlier word-count reconciliation:

**`<ComparisonTable>` and `<FAQ>` carry `'use client';`** at the top of `components/ui/ComparisonTable.tsx` and `components/ui/FAQ.tsx`. Their content is client-hydrated — the initial SSR HTML for those components contains only container markup, not the row/question/answer text. So any H2 whose direct body is a `<ComparisonTable>` (or which delegates to H3 subsections that contain tables) LOOKS empty in the pre-rendered HTML until browser JS hydrates.

The persona-strip did NOT leave hollow sections behind. Every headed section on every article has real content in source.

### Fix scope
**No source edits needed for Bug 1.** The visible-hollow effect is the same client-hydration issue you already know about. Two possible directions if you want to address it:

1. **Convert the components to Server Components** (`<ComparisonTable>` doesn't need `useState`; only its sortable-header logic is stateful — factor that into a `use client` sub-component and keep the shell server-rendered). This makes the tables + FAQ prose visible in initial HTML and to non-JS crawlers. Real fix.
2. **Accept the SSR-thin surface area** — nothing is "broken" for a JS-enabled reader; only Twitter/LinkedIn scrapers and Googlebot's first crawl pass see the thin version.

## Bug 2 — Empty Related Articles

### What the component does
`components/ui/RelatedArticles.tsx` renders `null` when `articles.length === 0`. The `articles` prop is supplied by `app/[slug]/page.tsx`:

```
const related = getRelatedArticles(params.slug, 4);
...
components={{...mdxComponents, RelatedArticles: () => <RelatedArticles articles={related} />}}
```

The layout override REPLACES whatever `<RelatedArticles articles={...}>` call is written in the MDX body — the MDX's own `relatedArticles:` frontmatter list is IGNORED entirely.

### Selection logic in `lib/content.ts:142`
```
export function getRelatedArticles(slug: string, limit = 5): ArticleMeta[] {
  const article = getArticleBySlug(slug);
  if (!article) return [];
  const all = getAllArticles();
  const sameCluster = all
    .filter((a) => a.meta.cluster === article.meta.cluster && a.meta.slug !== slug)
    .sort((a, b) => { const prio = { P1: 0, P2: 1, P3: 2 }; return (prio[a.meta.priority] || 2) - (prio[b.meta.priority] || 2); });
  return sameCluster.slice(0, limit).map((a) => a.meta);
}
```

**Selection is by `cluster` field only.** `contentType` is NOT queried. The Batch 6 contentType remap (KEEP+/NEW/TRANSFORM → guide/ranking/etc.) is therefore NOT the cause.

### Sitewide check
Parsed all 375 pre-rendered `.html` files under `.next/server/app/` for the `<section class="my-10 bg-gray-50 rounded-xl">` block that RelatedArticles renders. Counted `<a href="/">` links within.

| Result | Count |
|---|---:|
| Files with rendered Related Articles section (2-4 links) | **350** |
| Files with rendered Related Articles section but 0 links | 0 |
| Files with NO Related Articles section rendered at all | **23** |

Breakdown of the 23 with no section:
- **19 are static / hub / calculator pages** (about, articles, buying-guides, calculators, cost-guides, how-to, hvac-dictionary, troubleshooting, air-conditioning, air-quality, energy-efficiency, heat-pumps, heating, contact, disclaimer, editorial-policy, privacy, terms, brand-reviews) — these don't use the article layout, so they never call `<RelatedArticles>`. Correct behavior.
- **4 are articles** that render empty because they are the SOLE member of their cluster (0 same-cluster peers):

| Article | cluster field | peers in corpus |
|---|---|---:|
| /hvac-energy-saving-tips | `energy-efficiency` | **0** (peers are all in `energy-efficiency-ratings`) |
| /insulation-r-value-guide | `insulation` | **0** (no other article uses this cluster) |
| /radiant-floor-heating-pros-cons | `space-heaters` | **0** (peers are in `space-heaters-portable-heating`) |
| /trane-vs-carrier | `brand-reviews` | **0** (peers are in `air-purifier-brands`) |

### Root cause
**Cluster-field inconsistency, NOT the contentType remap.** Four articles use cluster values that don't match the taxonomy any other article uses:

- `energy-efficiency` should be `energy-efficiency-ratings` (24 peers available)
- `space-heaters` should be `space-heaters-portable-heating` (13 peers)
- `brand-reviews` — no established peer cluster; closest is `air-purifier-brands` (13) but that's a mismatch of category; would need a different consolidation (e.g., adopt `central-air-hvac-systems` which has 10 brand articles)
- `insulation` — genuinely orphan; the article stands alone. Could either stay orphan (accept empty Related Articles) or be reclassified into an adjacent cluster like `energy-efficiency-ratings` or `hvac-maintenance`.

/best-gas-furnace-brands specifically (the user-cited page): this article's cluster is `furnaces-heating`, it has 24 same-cluster peers, and its rendered HTML has 4 Related Articles links (verified: /best-electric-furnace, /cold-air-return-vents, /dirty-furnace-filter-photos, /do-furnaces-have-pilot-lights). **It is NOT empty on this page.** If it appeared empty on the deployed site, the deployment is behind current source (this repo has commits ahead of origin that haven't been pushed — the previous `git push` in this session failed on credentials).

### Fix scope
Two independent decisions:
1. **Reclassify the 4 orphan-cluster articles** — safe, purely metadata. Once their cluster field points to a real peer group, `getRelatedArticles` returns hits. Suggested reclassifications above.
2. **Verify deployment is current** — if /best-gas-furnace-brands actually shows empty Related Articles in production, it's a stale-deploy issue, not a code bug. Fix by pushing the local commits (currently blocked on missing GitHub creds in this environment).

## Summary counts

| Bug | Files affected | Findings | Real fixes needed |
|---|---:|---:|---|
| 1 — hollow headings | 0 in source (275 in SSR are false positives from client-only components) | 0 real | Optional: convert ComparisonTable + FAQ to server components |
| 2 — empty Related Articles | 4 articles + 19 legit non-article routes | 4 real | Reclassify 4 orphan clusters + verify deploy is current |

**Stopped for your ruling.** No edits applied. No commits. Bug 1 needs no MDX edits — the "hollowness" is a client-rendering artifact of the same class as the 19 SSR-thin pages. Bug 2 needs 4 targeted cluster-field edits (or acceptance that these 4 pages remain solo).
