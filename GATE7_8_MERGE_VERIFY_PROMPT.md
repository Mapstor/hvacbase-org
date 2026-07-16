BRANCHES: create raptive-fix/release from main. MODE: merge + verify. NO push. NO changes to main. Report back.

CONTEXT: six stacked gate branches, each cut from the previous:
  raptive-fix/01-strip-fabrications
  raptive-fix/02-spec-corrections
  raptive-fix/02b-ahri-certs
  raptive-fix/03-identity
  raptive-fix/04-batch2-specs-tax
  raptive-fix/05-cleanup   <- tip (contains all of the above)

=== PART A — MERGE (Gate 7) ===

1. Confirm the stack is linear: `git log --oneline --graph raptive-fix/05-cleanup` should show 01→05 as ancestors. If 05 already contains all earlier commits (it should, being stacked), the release is just 05's content.
2. Create the release branch from main:  git checkout main && git checkout -b raptive-fix/release
3. Merge the tip:  git merge --no-ff raptive-fix/05-cleanup  (no-ff so there's a clear release merge commit). Keep ALL commits — do NOT squash. The granular history is the provenance/audit trail.
4. If any conflict appears (shouldn't, given the linear stack), STOP and report it — do not auto-resolve silently.
5. Run npm run build. Confirm 376/376 pages, clean.
6. Report: merged commit count, build result, and `git log --oneline main..raptive-fix/release | wc -l`.

DO NOT touch main. DO NOT push.

=== PART B — PRE-REAPPLY VERIFICATION (Gate 8) ===

Run this as a read-only audit on raptive-fix/release. Produce REAPPLY_VERIFICATION.md with PASS/FAIL per check + evidence (grep counts / file refs). Any FAIL = blocker.

FABRICATED DATA
- [ ] No "40.1 SEER2" / "industry-leading" phantom efficiency claims:  grep -rniE "40\.1 SEER2|industry-leading [0-9]" content/  → expect 0 (or only explicit correction refs)
- [ ] No phantom "40HQV" model:  grep -rni "40HQV" content/  → 0
- [ ] Spec ledger clean: spec-ledger.csv parses; report counts by status (AHRI-VERIFIED / VERIFIED / PENDING-AHRI / PENDING-RESEARCH). PENDING entries must be honestly marked on-page, not asserted as fact.
- [ ] AHRI cert refs present where specs are stated (209832204 Daikin? no—209832204 is MSZ-FS; 215710688 Daikin): grep the two cert numbers render on the relevant pages.

FAKE EXPERTISE / TESTING / HISTORY
- [ ] No first-person testing:  grep -rniE "we tested|we evaluated|we measured|controlled conditions|[0-9]+ models (we|tested)" content/ app/  → 0
- [ ] No fake credentials:  grep -rniE "team of (HVAC )?experts|NATE-certified (we|our)|10\+ years|licensed (contractor|professional)s? (with|on our)" content/ app/  → 0 (reader-advice uses of NATE are OK)
- [ ] No fabricated tenure/traffic:  grep -rniE "since 2024|thousands of (daily|visitors|homeowners)|go-to resource|10K\+|100% unbiased" content/ app/  → 0

FAKE RATINGS
- [ ] No fabricated star ratings:  grep -rniE "rating: 4\.|marketShare:|reliabilityRankings" app/brand-reviews/  → 0
- [ ] No aggregateRating/Review/Rating JSON-LD:  grep -rniE "aggregateRating|@type.\"?:? ?.?Review|@type.\"?:? ?.?Rating" app/ components/  → 0

REAL IDENTITY
- [ ] Zero {{TODO-IDENTITY}} markers:  grep -rn "TODO-IDENTITY" . → 0
- [ ] Author "Marko Visic, BSc Physics" byline renders; AuthorBox present in article layout
- [ ] Person JSON-LD on /about with sameAs LinkedIn, alumniOf, worksFor Moving Data Systems d.o.o.
- [ ] /contact shows real entity + info@hvacbase.org; no unmonitored role-email aliases
- [ ] Author photo resolves: public/authors/marko-visic.jpg exists and is referenced

YMYL TAX
- [ ] 25C + 25D framed as expired after Dec 31 2025 (placed-in-service):  grep -rniE "December 31, 2025|placed in service" content/tax-credits-rebates content/heat-pumps  → present
- [ ] No live "claim \$2,000 federal" 2026 claims:  grep -rniE "\$2,000 federal|claim .* 2026 .* credit" content/  → 0 (except correctly-framed historical/2025 refs)
- [ ] 45L still framed as active through June 30 2026 (NOT lumped with Dec-2025)
- [ ] OBBBA dated July 4, 2025 everywhere:  grep -rni "July 4, 2026" content/  → 0

RENDER / STRUCTURE
- [ ] No empty FAQ headings:  grep -rn "^## Frequently Asked Questions" content/  → 0 (component owns the heading)
- [ ] No broken Featured-Guides links / 404 internal links (spot-check the buying-guides page)
- [ ] No doorway multi-anchor → single-thin-URL on homepage (IAQ collapsed)

SERVING / POLICY
- [ ] No ads.txt present:  find . -name ads.txt -not -path "./node_modules/*"  → 0
- [ ] No AdSense/ad code:  grep -rniE "adsbygoogle|ca-pub-|googlesyndication|pagead2" app/ components/ public/  → 0
- [ ] Affiliate position consistent (no affiliate links) — single truthful statement, no contradiction
- [ ] sitemap.xml + robots.txt present and consistent with real page count
- [ ] Build: npm run build → 376/376 clean

OUTPUT: REAPPLY_VERIFICATION.md with a top-line GREEN (ready to submit) / RED (blockers: list them) verdict, each check with PASS/FAIL + the grep evidence. List any PENDING-RESEARCH/PENDING-AHRI items remaining and confirm each is honestly marked on-page (not a blocker if marked, a blocker if asserted as fact).

No push. Leave main untouched. raptive-fix/release is the candidate.
