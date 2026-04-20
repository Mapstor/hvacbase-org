# Setup — SEO Subagent Workflow for hvacbase.org

## Install (one-time, per repo)

From your hvacbase.org repo root:

```bash
# 1. Create the directory structure
mkdir -p .claude/agents

# 2. Drop in the 4 files from this package:
#    - CLAUDE.md           → repo root
#    - .claude/agents/seo-auditor.md
#    - .claude/agents/seo-fixer.md
#    - .claude/agents/seo-verifier.md
#    - audit-log.md        → repo root

# 3. Commit them
git add CLAUDE.md .claude/ audit-log.md
git commit -m "chore: add seo audit subagent workflow"
```

## Usage

Start Claude Code in the repo:
```bash
claude
```

Then just describe what you want audited:
```
audit the breadcrumb cluster — specifically why /hvac/repair/* pages
don't show up as internally linked from their parent category pages
```

What happens automatically:
1. CC routes to `seo-auditor` (based on the description's SEO keywords)
2. Auditor reads package.json → app/ → sitemap → relevant files
3. Returns findings + BEFORE/AFTER diffs
4. If fixes are small & single-file → auto-hands off to `seo-fixer`
5. Fixer applies, builds, commits, pushes
6. Auto-hands off to `seo-verifier`
7. Verifier curls live URL, validates, updates audit-log.md

## When to invoke agents explicitly

Usually you don't need to — CC picks the right one from the description. But if you want to force it:

```
> Use the seo-auditor subagent to check JSON-LD on /hvac/units/*
> Use the seo-fixer subagent to apply the fixes you proposed above
> Use the seo-verifier subagent to confirm the last deploy worked
```

## Extending to other sites

For bridgereport.org, populationpyramids.org, etc. — copy the `.claude/` folder
and rewrite `CLAUDE.md` with that site's specific context (stack version, known
issues, entry points). The three agents themselves are mostly site-agnostic;
only CLAUDE.md needs to change.

Pro tip: if you find yourself editing the same agent file across multiple
repos, move it to `~/.claude/agents/` (user-level) and it applies everywhere.
Keep site-specific stuff in each repo's `CLAUDE.md`.

## What this replaces

Before: Desktop analyzes → you paste prompt to CC → CC outputs → you paste
back to Desktop → Desktop generates next prompt → you paste to CC → repeat.

After: You type one sentence in CC. Three agents handle the loop. You approve
or redirect in plain English. No pasting, ever.

## Troubleshooting

**"Auditor keeps stopping instead of chaining to fixer"**
→ Your CLAUDE.md's "non-negotiables" may be too strict. Either loosen them
   or accept that real fixes usually deserve a human look.

**"Fixer reports BEFORE block doesn't match"**
→ File drifted since auditor read it (you edited elsewhere, or another process).
   Re-run auditor. This is the system working correctly.

**"Verifier says fix not in rendered HTML"**
→ Usually means Vercel hasn't finished deploying, or the route is cached.
   Wait 2 minutes, re-run verifier. If still missing, the fix didn't do what
   you thought it did — back to auditor.
