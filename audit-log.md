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
