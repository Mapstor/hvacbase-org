# hvacbase.org — SEO Audit & Fix Workflow

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind · Vercel · GitHub

## Current state
Catastrophic indexation: ~1 of 353 pages indexed. Root causes: broken internal link schemes, residual 404s, incomplete breadcrumb cluster mapping, missing/incorrect JSON-LD in places, CSR leaking on pages that should be SSR.

## Workflow
Three subagents handle the loop. No pasting between tools.

1. **seo-auditor** — diagnoses, proposes BEFORE/AFTER diffs
2. **seo-fixer** — applies approved changes, builds, commits, deploys
3. **seo-verifier** — curls live URL, checks rendered HTML, flags indexation signals

Small, obvious fixes chain automatically (auditor → fixer → verifier). For anything ambiguous or multi-file, auditor stops and asks.

## Non-negotiables
- Every code change shown as literal BEFORE/AFTER block before applying
- Every fix verified on live URL after deploy, not just local build
- Never mass-edit without reading at least 3 representative files first
- Never assume programmatic SEO is the answer — UX + SERP domination + LLM citations are the goal
- Max 3 sentences per paragraph in any user-facing content
- Every number explained in prose

## Entry point for audits
Always start by reading:
1. `package.json` — confirm Next version, scripts, key deps
2. `app/` structure — 2 levels deep, note route groups
3. `public/sitemap.xml` or generated sitemap route — confirm URL count matches expected 353
4. Then branch into the specific cluster being audited

## Reference docs
- `audit-log.md` — running log of issues found + fixes applied (append, never rewrite)
- `.claude/agents/` — subagent definitions
