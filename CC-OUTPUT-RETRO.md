# CC-OUTPUT-RETRO — Formatting retro-fix STATUS

## Headline
**The formatting retro-fix (lists + heavier bolding) is already fully applied and committed — all 6 batches.** I did NOT re-run batch 1 or create a new commit, because the target pages already have the conversions and the heavier bolding. Re-applying would either fail (the prose strings are now lists) or duplicate content. Below is the verification evidence.

## All 6 batch commits already in history
| Commit | Message | Content files changed |
|---|---|---|
| 3360470 | batch 1/6 (lists + bolding) | ac-not-cooling |
| 918cb7e | batch 2/6 (bolding) | wire-for-220-volt, hvac-serial-number-decoder, dry-mode-in-ac, hvac-refrigerant-phase-out |
| 1f4f2c3 | batch 3/6 (bolding) | wire-gauge-chart, how-often-change-hvac-filter, hvac-maintenance-checklist |
| 54a6acb | batch 4/6 (lists + bolding) | air-purifier-guide, heat-pump-guide, mini-split-vs-central-air |
| 006d296 | batch 5/6 (lists + bolding) | how-to-reduce-hvac-noise, how-to-vent-portable-ac-without-window |
| c412e1c | batch 6/6 (lists + bolding) | minimum-seer-rating-by-state, heat-pump-cost-to-install, water-heater-wire-size |

Note: the pages that actually needed edits differ from the original batch-1 page list, because the recent page rewrites already shipped in the new format (bulleted + bolded) at authoring time. So many "already compliant" pages correctly received 0 edits and are not in any commit.

## Your named batch-1 pages — verified current state
Checked all five in both source (MDX) and rendered HTML (from the last CLEAN 493/493 build; no files have changed since):

| Page | em-dashes | rendered `<li>` | rendered `<strong>` | Status |
|---|---|---|---|---|
| ac-not-cooling | 0 | 95 | 39 | lists + heavy bolding present (batch 1/6 commit) |
| refrigerant-types-explained | 0 | 108 | 53 | already compliant at rewrite; no conversion needed |
| carbon-monoxide-detector-guide | 0 | 110 | 45 | already compliant at rewrite |
| ideal-indoor-humidity-level | 0 | 96 | 33 | already compliant at rewrite |
| ac-troubleshooting-guide | 0 | 110 | 47 | DIY/pro prose IS already bulleted (shipped in new format) |

The one specific conversion the batch-1 proposal flagged — the ac-troubleshooting-guide "You can usually handle yourself:" / "Call a professional for:" prose — is already a pair of bulleted lists (lines 123-140). It was written that way in the rewrite, so it never needed a retro-fix edit.

## Enumeration re-scan (safety check)
I re-scanned all five pages for any genuine unconverted 3+ parallel prose enumeration (colon + parallel items). Findings: only frontmatter `description:` lines, content that is already bulleted, table rows, and flowing remediation prose (e.g. "recalibrate, replace the batteries, or relocate it") that the approved approach explicitly leaves as prose. **No genuine unconverted enumeration remains.** One borderline case (refrigerant-types line 119, "safety baked in: leak sensors, automatic shutoff, and charge limits") was left as prose, consistent with the approved batch-1 decision of 0 conversions on that page.

## Bottom line
- 6/6 batches committed. 0 em dashes across the verified pages. Lists render as `<li>`; bolding is heavy (33-53 `<strong>` per page).
- **No new commit was made this run** — there was nothing to change. Forcing a commit would have been empty.
- Repo is **51 commits ahead of origin/main; still not pushed.**

If you believe a specific page still reads as a wall of prose where a scannable list would help, name it and I'll convert that one. Otherwise the retro-fix is complete.
