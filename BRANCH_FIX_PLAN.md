# BRANCH FIX PLAN — promoting `main` to production

**Date:** 2026-07-19
**Diagnosis-only.** No pushes, merges, or force operations performed.
**Verdict:** `raptive-fix/release` is a **strict ancestor** of `main`. A clean fast-forward is available. Nothing on `raptive-fix/release` needs preserving.

---

## Divergence shape

```
main..raptive-fix/release  →  0 commits    (release has NO unique commits)
raptive-fix/release..main  →  162 commits  (main has 162 commits ahead)
```

`git rev-list --left-right --count raptive-fix/release...main` → `0  162`.

**`git merge-base --is-ancestor raptive-fix/release main` returned true.** Release is a **linear predecessor** of main.

Merge-base is `765399b` (`release: merge raptive-fix/05-cleanup (Gates 1-5)` — 2026-06-27), which is the tip of `raptive-fix/release`. Everything after it lives only on `main`.

**Nothing on `raptive-fix/release` needs preserving.** No unique commits to rescue, no risk of losing work.

## Fast-forward preview

If we were to run `git merge --ff-only main` on `raptive-fix/release`, git would perform a **pure ref move** — no merge commit, no conflict resolution, no file changes on disk relative to `main`. Post-FF, `raptive-fix/release` would point at `5926fb024c064d52da064b452d72bdb7ac0d93b3` (current tip of main: `fix(render): FAQ children passthrough for legacy microdata syntax`).

Working tree is clean; only untracked report `.md` files present (they don't block FF).

`local main == origin/main == 5926fb0` — main is fully published, safe to reference.

## Repo-level Vercel config

Nothing in the repo pins a production branch. `vercel.json` contains only a host-based redirect (apex → www):

```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "https://www.hvacbase.org/$1",
      "permanent": true,
      "has": [{ "type": "host", "value": "hvacbase.org" }]
    }
  ]
}
```

`.vercel/project.json` — linked-project ID only:

```json
{"projectId":"prj_9oUUHBhKSMeVsXBRJvNipfbTSW71","orgId":"team_B6kyDt6yzHNCsWX1yIciKcY6","projectName":"hvacbase.org"}
```

**No `.github/workflows/` directory** — no CI pipeline routes deploys. **No `productionBranch` / `defaultBranch` anywhere.** `package.json` has only `next dev / build / start / lint`, no deploy script.

**Conclusion:** the production-branch setting lives entirely in the **Vercel dashboard**. It cannot be changed from this repo; it needs a dashboard edit under `hvacbase.org` project settings → Git → Production Branch.

## Two viable paths — recommend Option B

### Option A — Fast-forward `raptive-fix/release` and push

```
git checkout raptive-fix/release
git merge --ff-only main
git push origin raptive-fix/release
git checkout main
```

Effect: `raptive-fix/release` catches up. Vercel's next build serves main's content. Requires **shared-state push** — not executed here, waiting on your approval.

- Risk: **very low.** Fast-forward is a pure ref advance, no history rewrite, no merge commit.
- Ongoing cost: **future commits must be promoted to `raptive-fix/release` every time.** The workflow that created this drift will keep creating it. Every batch remediation for the past ~3 months landed on `main` and no one promoted — that's a strong signal the gate-based release flow isn't being followed anymore.

### Option B (recommended) — Change Vercel dashboard production branch to `main`

Steps (in the Vercel dashboard, not this repo):

1. Open project `hvacbase.org` → Settings → Git.
2. Change **Production Branch** from `raptive-fix/release` (or whatever it's currently set to) → `main`.
3. Trigger a redeploy of the latest `main` commit (either from Deployments → Redeploy, or from Deployments → the row for `5926fb0`).
4. Wait for build to finish, then verify live `/ac-not-cooling` shows the clean title "AC Not Cooling: 12 Fixes That Actually Work" (no "Expert") and no "Success Rate: X%" H2s.

Optional cleanup after Option B settles:

- Keep `raptive-fix/release` and the `raptive-fix/*` gate branches for archival, or delete them after 2–4 weeks.
- Remove the SEO-fixer subagent's push target if it was pinned to a `raptive-fix/*` branch (it isn't — CLAUDE.md doesn't specify, so this may already be a non-issue).

**Why B over A:**

- One dashboard edit vs. remembering to promote every future commit
- No push required from this environment (which lacks credentials anyway)
- Matches actual practice: all recent work goes to `main`, so `main` should be production
- Reversible: switching production-branch in Vercel is a two-click undo if anything looks off

## Actions I have NOT taken

- No push, no merge, no force operation
- No branch checkout, no working-tree modification (only file writes for these diagnosis docs)
- No Vercel API/CLI calls
- No config changes in the repo

Waiting on your call between Option A and Option B (and, if A, explicit go-ahead to run the push).
