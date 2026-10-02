# REVERT DIAGNOSIS — ac-not-cooling and the "reverted" batches

**Date:** 2026-07-19
**Verdict:** **Not a revert. Not lost commits. Not a stale deploy of `main`.**
**Live is serving from a different branch — `raptive-fix/release` — that is 162 commits behind `main` and never received any of the batch remediation.**

---

## TL;DR

Every remediation batch (Batch 2 ACCA strips, Batch 3 og-image, Batch 5 expertise footer, Batch C success-rate table, all persona strips, all render fixes, etc.) landed on **`main`** and is present on `origin/main`. **The problem is that Vercel production is not deploying `main`.**

The `raptive-fix/release` branch — last touched 2026-04-23 — still contains the exact byte pattern the user described. It has:

- Title: "AC Not Cooling: 12 **Expert** Fixes That Actually Work" (stripped on main)
- Description: "**Professional HVAC technician's guide** to fixing…" (stripped on main)
- faqData: "The most common cause is a dirty air filter (**42%** of cases)…" (stripped on main)
- H2 headings: "Fix #1: Replace Dirty Air Filter **(Success Rate: 42%)**", …#12 (**Success Rate: 2%**) (stripped on main)
- Body: "According to ACCA data, this accounts for **32%** of all AC service calls, but **85%** of cases…" (stripped on main)
- Conclusion: "resolves **85%** of problems…**70%** of cooling complaints" (stripped on main)
- Sources: "Air Conditioning Contractors of America (ACCA) - Service Call Statistics and Manual J Load Calculation Standards" (stripped on main)
- `app/layout.tsx` on `raptive-fix/release`: `twitter: { images: ['/og-image.svg'] }` (retired on main)

That is a **perfect match** for what the user reported live production serves.

**Fix scope: not 1 file, not 50 files. It's every commit since 2026-04-23** — 162 commits — from Gate 5 forward.

---

## STEP 1 — Current source of `content/air-conditioners/ac-not-cooling.mdx`

Grep on the file at HEAD (`5926fb0`):

```
"According to ACCA"              : 0 hits
"Success Rate: 42"               : 0 hits
"32% of all AC"                  : 0 hits
"Success Rate:"                  : 0 hits
"we tested"                      : 0 hits
"Professional HVAC technician's" : 0 hits
"Expert-Written Content"         : 0 hits
"og-image.svg"                   : 0 hits
```

**Source is clean.** `git diff HEAD -- content/air-conditioners/ac-not-cooling.mdx` is empty (working tree matches HEAD).

## STEP 2 — Commit history of the file

`git log --follow --oneline -- content/air-conditioners/ac-not-cooling.mdx` (chronological, most recent first):

```
67f9939 2026-07-19  fix(content): inline faqData on 3 files with export-const pattern
dd3b2b3 2026-07-17  fix(content): remove false expertise claims — meta descriptions
faa6b65 2026-07-16  fix(citations): remove 133 confirmed-dead URLs — keep figures
d67cef8 2026-07-14  fix(content): remove fabricated ACCA service-call stats + distribution — ac-not-cooling
75063bf 2026-06-26  fix(faq): harden render — empty-guard + FAQ.Item + strip redundant headings
1e1fabe 2026-04-20  feat(seo): complete advanced SEO optimization package
77ca51e 2026-04-20  feat(seo): comprehensive SERP domination optimizations
5a7a533 2026-04-06  Complete comprehensive content creation and link fixing project
```

Zero reverts. Zero force-pushes. `git log --grep=revert -- <file>` returns empty. `d67cef8` is real and in-place — its message documents removing exactly the strings the user cited.

Diff extract from `d67cef8`:

```
-answer: "The most common cause is a dirty air filter (42% of cases)…"
-**Why is my air conditioner running but not cooling?** …According to ACCA data,
  this accounts for 32% of all AC service calls, but 85% of cases can be resolved…
-**What should I check first…** …it's dirty in 42% of cooling problems…
-## Fix #1: Replace Dirty Air Filter (Success Rate: 42%)
-## Fix #2: Clean Outdoor Condenser Coils (Success Rate: 28%)
-## Fix #3: Check and Adjust Thermostat Settings (Success Rate: 18%)
-## Fix #4: Verify and Open All Vents (Success Rate: 15%)
-…through #12
-The most common causes are dirty air filter (42% of cases), dirty outdoor coils (28%)…
-- Air Conditioning Contractors of America (ACCA) - Service Call Statistics…
```

The strip commit deleted every reported string.

## STEP 3 — `-S` search across all branches

`git log --all --oneline -S "According to ACCA data"`:

```
71ec1bb  fix(citations): drop 4 dead DOE Energy Saver links — keep verified figures
d67cef8  fix(content): remove fabricated ACCA service-call stats + distribution — ac-not-cooling
5a7a533  Complete comprehensive content creation and link fixing project
```

`5a7a533` added it; `d67cef8` removed it; `71ec1bb` touched adjacent lines. No revert commit exists on any branch. Same shape for `-S "32% of all AC service calls"` and `-S "Success Rate: 42"`.

## STEP 4 — Sitewide grep for supposedly-stripped strings

Grep against every file in `content/`, `app/`, `components/`, `lib/`, `public/` at HEAD:

| String | Files still containing it |
| --- | --- |
| `"According to ACCA"` | **2** — `content/energy-efficiency-ratings/what-is-seer-rating.mdx`, `content/hvac-maintenance/hvac-ductwork-guide.mdx` (see note below) |
| `"Success Rate:"` | **0** |
| `"Expert-Written Content"` | **0** |
| `"og-image.svg"` | **0** |
| `"Professional HVAC technician's guide"` | **0** |
| `"we tested"` (case-insensitive) | **0** |
| `"32% of all"` | **0** |

**Note on the 2 remaining ACCA references** — both are **legitimate prose references, not the fabricated statistical claims:**

- `hvac-ductwork-guide.mdx:116` — "Improperly sized ductwork is one of the most common HVAC installation defects. **According to ACCA**, the majority of residential duct systems are not properly designed…" (qualitative reference, no numeric attribution).
- `what-is-seer-rating.mdx:118` — "**Installation quality** accounts for up to 30% of a system's real-world performance, **according to ACCA**." This is a widely-cited ACCA finding (Installation Quality Program) but the URL is not attached inline. Flag for review — either add the ACCA IQ citation or downgrade to unattributed "poor installation can cost meaningful efficiency."

**Neither file has the ACCA "service call statistics" pattern.** Neither ships the 32%/42%/85% distribution numbers on main.

## STEP 5 — 5 sample files that batch strips touched

| Slug | ACCA hits | Success Rate hits | Expert-Written | "we tested" | Pro HVAC tech | og-image.svg |
| --- | --- | --- | --- | --- | --- | --- |
| `ac-troubleshooting-guide` | 0 | 0 | 0 | 0 | 0 | 0 |
| `smart-thermostat-savings` | 0 | 0 | 0 | 0 | 0 | 0 |
| `heat-pump-electricity-usage` | 0 | 0 | 0 | 0 | 0 | 0 |
| `best-gas-furnace-brands` | 0 | 0 | 0 | 0 | 0 | 0 |
| `hvac-maintenance-checklist` | 0 | 0 | 0 | 0 | 0 | 0 |

**All 5 clean on `main`.** The remediation batches all applied correctly to `main`.

## STEP 6 — The actual cause (this is the whole story)

`git branch -a` reveals a set of stale gate-based release branches:

```
* main
  raptive-fix/01-strip-fabrications
  raptive-fix/02-spec-corrections
  raptive-fix/02b-ahri-certs
  raptive-fix/03-identity
  raptive-fix/04-batch2-specs-tax
  raptive-fix/05-cleanup
  raptive-fix/06-finals
  raptive-fix/07-obbba-sweep
  raptive-fix/08-obbba-finals
  raptive-fix/09-tax-final
  raptive-fix/10-tax-last2
  raptive-fix/11-tax-final3
  raptive-fix/12-tax-comprehensive
  raptive-fix/release
  remotes/origin/main
```

Divergence:

```
main..raptive-fix/release           : 0 commits (release has nothing main doesn't)
raptive-fix/release..main           : 162 commits (main has 162 commits release doesn't)
```

`raptive-fix/release` last touched **2026-04-23** (commit `765399b release: merge raptive-fix/05-cleanup (Gates 1-5)`). It never received `d67cef8`, `dd3b2b3`, `aeac313`, `e97c61c`, `5dbeab4`, `752dfe4`, `fa8a6f3`, `bf7db9f`, `9e5f5ee`, `67f9939`, `97e9483`, `5926fb0`, or the ~20 persona-strip commits, or the render fixes, or the frontmatter remaps.

**`raptive-fix/release:content/air-conditioners/ac-not-cooling.mdx` still contains the exact byte pattern the user described.** Specifically, the release branch has:

- Title "AC Not Cooling: 12 **Expert** Fixes That Actually Work (2026 Guide)"
- Description "**Professional HVAC technician's guide** to fixing air conditioning that runs but doesn't cool. 12 proven solutions ranked by **success rate**…"
- `export const faqData = [{ answer: "…(**42%** of cases)…" }]`
- Conclusion "…resolves **85%** of problems without professional service. …**70%** of cooling complaints."
- Sources bibliography with "**Air Conditioning Contractors of America (ACCA) - Service Call Statistics**…"

And `raptive-fix/release:app/layout.tsx` has:

```jsx
twitter: {
  card: 'summary_large_image',
  title: 'HVAC Base — Data-Driven HVAC Guides & Calculators',
  description: 'Expert HVAC guides with interactive calculators…',
  images: ['/og-image.svg'],
},
```

This is a **perfect match** with the user's live-page observation.

## Conclusion

- **Not a source revert.** `main` is clean and matches HEAD.
- **Not a lost commit.** Every strip commit is present on `main` and on `origin/main`.
- **Not a stale local ref.** `origin/main = HEAD = 5926fb0`. Fetch confirmed.
- **The cause is deploy-branch mismatch.** Vercel production is either configured to deploy `raptive-fix/release`, or its automation is otherwise pinned to a branch that never received the remediation work.

**Scope: 162 commits.** Every batch (2, 3, 5, C, persona strips, render fixes, expertise cleanup, meta rewrites, frontmatter remaps, homepage hero) is invisible in production.

## Recommended remediation (config decision, not code)

Two options — this is a config/policy decision, not a mechanical edit:

1. **Fast-forward `raptive-fix/release` to `main`** and push. Preserves the branching workflow. `git checkout raptive-fix/release && git merge --ff-only main` — 162 commits become live on next Vercel build. **Involves shared-state push; needs your explicit go-ahead.**
2. **Reconfigure Vercel production branch to `main`** in the Vercel dashboard. Immediate. The `raptive-fix/*` branches become archival.

Recommend option 2 — the gate-based workflow has been abandoned in practice (every remediation for months has gone straight to `main`), and pointing Vercel at the branch that actually receives work is less error-prone than promoting to a release branch on every fix.

Whichever option you pick, do it **before** the next Raptive review — otherwise reviewers will keep seeing the pre-remediation content.
