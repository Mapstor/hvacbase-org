# Archived product pages

Pages moved out of the live build on 2026-08-17 because they contained specific-SKU spec
tables (fabrication risk after multiple recalls in 2025-2026: Midea CPSC 25-320, MrCool
Advantage spec conflation, Vornado SRTH fire hazard, Amana WRAC/TTW CPSC 26-581).

**These files are excluded from routes, sitemap, and audit** via the `_`-prefix directory-name
convention (see `lib/content.ts:getAllMdxFiles` and `scripts/audit.mjs:listMDX`).

**They are not deleted.** Full git history is preserved via `git mv`. Any file here can be
restored by `git mv`-ing it back into its original cluster directory.

**301 redirects** for every archived URL live in `next.config.js` — each archived slug
routes to the most topically adjacent surviving page (calculator / guide / explainer / how-to).

**Rollback checkpoint:** `git tag pre-product-removal-2026-08-17` (pre-archive state).

**Rebuild candidates:** best-hvac-brands-ranked, trane-vs-carrier, best-oil-furnace — these
were classified BRAND-REBUILD (rank brands on verifiable brand-level facts, not SKUs). Kept
archived pending an honest rebuild that drops all SKU-level spec claims.
