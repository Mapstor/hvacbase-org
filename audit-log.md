# Audit Log — hvacbase.org

Append-only log of SEO issues diagnosed, fixes applied, and verification results.

Format:
```
## YYYY-MM-DD — [scope]
Fixed: [summary]
Files: [list]
Commit: [hash]
Verification: [pending / ✅ date + details / ❌ date + what failed]
```

---

<!-- New entries append below this line -->

## 2026-05-11 — Missing Calculator Widgets + Mobile Table Overflow
Fixed:
- 3 MDX pages had calculator H2/intro promising a tool but never included `<CalcWrapper>` tag — only static text rendered.
- MDX tables had `whitespace-nowrap` cells and no scroll container, forcing horizontal body scroll on mobile.
Files:
- content/ac-sizing-selection/furnace-sizing-calculator.mdx (added `<CalcWrapper type="furnace-sizing" />`)
- content/ac-sizing-selection/water-heater-sizing-calculator.mdx (added `<CalcWrapper type="water-heater-sizing" />`)
- content/ac-sizing-selection/what-size-generator-do-i-need.mdx (added `<CalcWrapper type="generator-sizing" />`)
- lib/mdx-components.tsx (wrapped `<table>` in `<div className="overflow-x-auto my-6">`)
Commit: 4b446f5
Verification: ✅ 2026-05-11 — All 3 URLs return 200 on www.hvacbase.org with fresh etag 8a15d9c1...; /furnace-sizing-calculator renders the form with default value="2000"; /water-heater-sizing-calculator renders 5 number inputs; /what-size-generator-do-i-need renders checkbox-based appliance selector; 7–10 `overflow-x-auto` wrappers present per page confirming global table fix. Verified via `vercel curl` on preview deploy dpl_DfBueLupoDtVWA1zU3YnLA7ipatZ and direct Googlebot UA against production alias.

## 2026-04-20 — URL Standardization to www.hvacbase.org
Fixed: Standardized all URLs from https://hvacbase.org to https://www.hvacbase.org for proper indexation
Files: 
- /public/robots.txt (created)
- /lib/schema.ts
- /app/layout.tsx
- /app/[slug]/page.tsx
- /app/page.tsx
- /app/air-conditioning/page.tsx
- /app/heating/page.tsx
- /app/heat-pumps/page.tsx
- /app/energy-efficiency/page.tsx
- /app/air-quality/page.tsx
- /app/articles/page.tsx
- /public/sitemap.xml
Commit: e459df8
Verification: ✅ 2026-04-20 — All URLs verified with www.hvacbase.org, canonical tags correct, JSON-LD uses www URLs, sitemap contains 373 URLs all with www, no mixed references found
