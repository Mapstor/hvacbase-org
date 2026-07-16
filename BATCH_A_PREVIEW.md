# BATCH A — Independence / Privacy / About honesty (PREVIEW, NO EDITS APPLIED)

**Run date:** 2026-07-12
**Scope:** ad-review unblocker. Rewrite site self-representation for honesty in a Raptive-monetized world.
**State:** **PREVIEW ONLY.** No files modified. No dates bumped. No commits. This document is a proposal for user review; apply only after explicit go-ahead.
**Read:** `COMPLIANCE_TRIAGE_hvacbase.md` Batch A rows + re-grep confirmed the surface below.

---

## STEP 1 — Discovery summary

### 1a. Affiliate reality → **ZERO true affiliate URLs**

- Extended grep (patterns: `amazon.com|amzn.to|tag=|utm_source=|/go/|/out/|/link/|/ref/|/rec/|sponsored (by|content|post|link|placement)|aff_|affiliate program|referral fee|commission|paid placement|paid partnership|brand partner|partnership with|manufacturer partnership|link to buy|shop this|buy now|clickbank|shareasale|impact.com|cj.com|awin|rakuten`) across `app/`, `content/`, `components/`, `lib/`, `public/`, `package.json`.
- **81 post-filter hits — all legitimate technical vocabulary**, none are affiliate URLs. Examples verified: "system commissioning" (industry term for HVAC startup), "decommissioned systems" (refrigerant reclaim), "current drawing 20-30 amps" (electrical), "European Commission" / "California Energy Commission" / "International Electrotechnical Commission" (regulators), "carbon monoxide from generators kills approximately 70 people per year in the United States, according to the Consumer Product Safety Commission" (real citation).
- **Consequence:** the site's "no affiliate links" claim can remain factually TRUE after Raptive display ads onboard (display ads ≠ affiliate). Batch A softens the **absolute** framing ("100%", "no bias", "unbiased in all") but keeps the "no affiliate links" content intact.

### 1b. Ad + CMP + Consent Mode setup → **PREREQUISITE GAP**

| Signal | Present? | File / evidence |
| --- | --- | --- |
| GA4 (analytics) | **YES**, unconditional load | `app/layout.tsx:86-101` — `<Script src="https://www.googletagmanager.com/gtag/js?id=G-ZCKSNVFR5V">` + inline `gtag('config','G-ZCKSNVFR5V')` |
| Raptive / AdThrive / AdSense / GAM / pubads | **NO** | (pre-ads state) |
| CMP (OneTrust / TrustArc / Cookiebot / Osano / Iubenda / Termly / Sourcepoint / Cookiepro) | **NO** | none in code, none in `package.json` |
| Google Consent Mode v2 default (`gtag('consent','default', {ad_storage:'denied',ad_personalization:'denied',analytics_storage:'denied',...})`) | **NO** | GA4 loads with no consent gate; violates EU ePrivacy / GDPR for any EU visitors |
| IAB TCF `__tcfapi` | **NO** | |
| IAB GPP `__uspapi` / `__gppapi` | **NO** | |
| Do-Not-Sell/Share endpoint | **NO** | not linked, not built |

**Prerequisites for Batch A ship (see P1–P3 below).** These must be resolved before the (A3) privacy edits can be finalized — you cannot honestly document consent behavior you haven't wired.

### 1c. Extended independence claims → **19 actionable locations** (catalogued in A2 below)

Filtered from 25 raw hits. Six of the raw hits were technical usage ("independent temperature control", "generators and solar/battery systems are completely independent", "power circuit and control circuit are completely independent", "voids the warranty", "NEC 240.4(D) limits", "portable propane heaters absolutely not for indoor use") and are excluded — they are not marketing claims about editorial independence.

### 1d. About-page fabrications → **ZERO**

Grep against `app/about/page.tsx`, `app/editorial-policy/page.tsx`, `app/contact/page.tsx`, `app/page.tsx`, `app/layout.tsx` for the seed patterns: `we assembled | assembled (a|our) team | team of [0-9] | technical writers | our writers | our engineers | thousands of | thousands of daily | 1000s? | daily visitors | monthly readers | readers per | exploring partnership | partnership opportunities | video content | our podcast | our video | our channel | founded in [0-9] | est. [0-9] | since [0-9]{4} | our roadmap | what's next | coming soon | founded [0-9] | our story | our mission`.

**Zero seeds hit on the About page.** The About page currently reads (`app/about/page.tsx`): "HVACBase is written by Marko Visic, a physicist (BSc, Faculty of Mathematics and Physics, University of Ljubljana). While studying thermodynamics, he became interested in heat-transfer applications … HVACBase is an independent education site. Marko is a physicist, not a licensed HVAC contractor — nothing here is a substitute for a licensed professional …" Published by Moving Data Systems d.o.o., real address, real LinkedIn.

**This section of Batch A is much smaller than the triage anticipated.** The About page is already an honest single-operator story anchored on a real named author. Only one **optional** insertion is proposed (A1.1), covering the fact that the site is (or will be) display-ad funded.

### 1e. Privacy policy advertising / tracking section — current state

Reproduced verbatim from `app/privacy/page.tsx` (line numbers keyed to file):

```
# app/privacy/page.tsx:5-6
const lastUpdated = 'February 12, 2026';
const effectiveDate = 'January 1, 2026';

# app/privacy/page.tsx:130-138 — "How We Use Your Information · We Do NOT"
"We Do NOT
❌ Sell your personal information
❌ Share data with HVAC contractors without consent
❌ Use your data for unrelated marketing
❌ Create user profiles for advertising
❌ Store calculator inputs beyond session"

# app/privacy/page.tsx:143-168 — "3. Information Sharing & Disclosure · Limited Sharing Policy"
"We share your information only in these specific circumstances:
- Service Providers: Analytics (Google Analytics), hosting (Vercel/AWS), email services
- Legal Requirements: When required by law, subpoena, or court order
- Safety: To protect rights, property, or safety of HVACBase, users, or public
- Business Transfers: In connection with merger, acquisition, or asset sale
- With Consent: When you explicitly agree to sharing"

# app/privacy/page.tsx:170-217 — "4. Cookies & Tracking Technologies"
Cookie table columns: Type | Purpose | Duration
Rows: Essential (Session) | Analytics — GA usage patterns (2 years) | Preferences — climate zone (1 year) | Performance — speed/errors (30 days)
Footer: "Managing Cookies: You can control cookies through browser settings. Disabling cookies may limit calculator functionality. We honor 'Do Not Track' signals."

# app/privacy/page.tsx:246-286 — "6. Your Rights & Choices"
"You Have the Right To:
✓ Access: Request a copy of information we have about you
✓ Correction: Update or correct inaccurate information
✓ Deletion: Request deletion of your personal information
✓ Opt-Out: Unsubscribe from communications
✓ Portability: Receive your data in a structured format
California Residents: Additional rights under CCPA including right to know, delete, opt-out of sale (we don't sell data), and non-discrimination."
```

**Missing entirely:** ad-network processor row · advertising cookie category · CMP reference · IAB TCF/GPP notice · Do-Not-Sell/Share link · CPRA "cross-context behavioral advertising" language · vendor-list URL · privacy contact for advertising.

---

## Prerequisite gates (must clear before Batch A applies)

**P1 — Choose and install a CMP.** Raptive typically ships with Sourcepoint pre-integrated, but the choice is yours (Sourcepoint, Osano, Cookiebot, Iubenda, OneTrust). This is a **package.json + wiring** change; Batch A cannot fully ship without it because the (A3) privacy edits reference user consent choices that must actually exist.

**P2 — Wire Google Consent Mode v2 in `app/layout.tsx`.** Insert a `gtag('consent','default', {...:'denied'})` block **before** the GA `gtag('js', new Date())` call. Default `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` all → `denied`. Then wire the CMP callback to `gtag('consent','update',{...:'granted'})` on user acceptance. This unblocks GA4 for consented users while keeping EU/UK visitors compliant. **Currently GA4 fires unconditionally — this is a GDPR/ePrivacy exposure independent of ads.**

**P3 — Paste Raptive-provided privacy boilerplate.** The prompt's boilerplate slot is still a placeholder. Until you provide the exact publisher-privacy language Raptive requires (plus their vendor-list URL and Do-Not-Sell/Share endpoint), the (A3) AFTER cells are stubbed as `<<< PENDING RAPTIVE BOILERPLATE — DO NOT SHIP >>>`. Everything else in Batch A can be drafted now.

**Suggested order:** P1 → P2 → apply (A1) (A2) (A4) (A5) (A6) → get boilerplate → apply (A3) → verify → commit.

---

## STEP 2 — Framing rules being applied

These translate directly into the AFTER cells below:

- **R1 — Keep-true-don't-over-delete.** "No affiliate links / no manufacturer sponsorships / no paid placements" stay **as content**, since STEP 1a confirmed zero affiliate URLs and no product-placement deals. Only sweeping absolutes ("100%", "no bias", "in all recommendations") are softened.
- **R2 — Reword absolutes.** "100% unbiased" / "no financial relationships" / "unbiased … in all" → **"editorially independent, supported by display advertising that does not influence editorial decisions."** No new virtues invented.
- **R3 — Add explicit ad-funding disclosure.** New sentence added to editorial policy + new "Advertising" section in disclaimer. Not novel legal text — plain editorial disclosure.
- **R4 — About page: minimal changes.** The About page has NO fabricated personas or team claims to remove (1d). ONE optional insertion proposed.
- **R5 — Privacy: no author-invented legal text.** (A3) AFTER cells stubbed; will use verbatim Raptive-supplied text.
- **R6 — No date bumps.** All `lastUpdated` / `effectiveDate` fields stay at their current values in this batch. Refresh happens in Batch F.

---

## (A1) About page

### A1.1 — Optional insertion (advertising disclosure)

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/about/page.tsx:87-104` (Publisher section, end of block) | ```<h2>Publisher</h2>\n<p>\n  HVACBase is published by <strong>Moving Data Systems d.o.o.</strong>, Smolnik 62, 2342 Ruše, Slovenia. Contact: <a href="mailto:info@hvacbase.org">info@hvacbase.org</a> · <a href={AUTHOR_LINKEDIN} target="_blank" rel="me noopener">LinkedIn</a>.\n</p>``` | Same as BEFORE, then insert **after** the Publisher paragraph: `<h2>How the site is funded</h2><p>HVACBase is supported by display advertising served by third-party ad networks. Ad selection and placement are handled by those networks; ads are not chosen by, endorsed by, or reviewed by the editorial team. See the <a href="/editorial-policy">editorial policy</a> and <a href="/privacy">privacy policy</a> for detail.</p>` | R3 | **Only ship after CMP+ads are actually wired.** Until Batch A ships and ads onboard, this paragraph is aspirational and would be false. Hold this specific insertion until ad-tag is live. |

### A1.2 — All other About-page rewrites originally anticipated

**NONE.** Grep confirmed zero fabricated persona/team/traffic/roadmap/case-study seeds on the About page. No rewrite proposed. The prior audit prompt's "remove the fabricated team, traffic numbers, roadmap" line is now moot; the About page has already been scrubbed (likely in the `GATE3_IDENTITY_LOCKED.md` remediation wave visible in the repo).

---

## (A2) Sitewide independence claims

### A2.1 — Homepage (`app/page.tsx`)

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/page.tsx:83` | `Professional HVAC Calculators, Sizing Guides & Unbiased Equipment Reviews` | `Professional HVAC Calculators, Sizing Guides & Editorially Independent Equipment Reviews` | R2 | Hero H2 |
| `app/page.tsx:87-88` | `Make informed HVAC decisions with our {totalArticles}+ expert guides, ACCA Manual J calculators, and real-world efficiency data. No affiliate links, no bias — just accurate information.` | `Make informed HVAC decisions with {totalArticles}+ expert guides, ACCA Manual J calculators, and real-world efficiency data. No affiliate links; editorially independent, supported by display advertising that does not influence what we cover.` | R1 + R2 + R3 | Also drops the plural "our" (single-author site). |
| `app/page.tsx:163` | `<span>No Affiliate Links</span>` (trust-bar chip) | **KEEP AS-IS** | R1 | Zero affiliate URLs found; claim remains TRUE post-ads. |
| `app/page.tsx:920-923` (Why Trust HVACBase paragraph) | `We provide accurate, unbiased HVAC information based on manufacturer data, industry standards, and AHRI-certified efficiency ratings — no affiliate links or sponsored content.` | `We provide HVAC information based on manufacturer data, industry standards, and AHRI-certified efficiency ratings. The site is editorially independent and carries no affiliate links; it is supported by display advertising that does not influence editorial decisions.` | R2 + R3 | Removes "unbiased" absolute + "sponsored content" overreach. |
| `app/page.tsx:933` | `Every guide backed by AHRI certifications, DOE data, and ACCA Manual J calculations` | `Guides backed by AHRI certifications, DOE data, and ACCA Manual J calculations where those apply` | R2 | Removes universal "every" — troubleshooting/how-to guides don't rely on AHRI certs. |
| `app/page.tsx:943` | `Following ASHRAE, ACCA, EPA, and ENERGY STAR guidelines in all recommendations` | `Following ASHRAE, ACCA, EPA, and ENERGY STAR guidelines where applicable` | R2 | Removes universal "in all". |
| `app/page.tsx:952-954` (Always Current tile) | `Always Current` (heading) + `Updated weekly with 2026 efficiency standards, tax credits, and equipment releases` | `Kept Current` (heading) + `Reviewed and revised as standards, tax law, and equipment specifications change.` | R2 | "Updated weekly" is trivially disprovable against `dateModified` sampling. |
| `app/page.tsx:987-988` | `<span>No affiliate links or referral fees</span>` (list) | **KEEP AS-IS** | R1 | True; remains true post-ads. |
| `app/page.tsx:991-992` | `<span>No manufacturer sponsorships</span>` (list) | **KEEP AS-IS** | R1 | Display ads ≠ manufacturer sponsorships. Still true. |
| `app/page.tsx:995-996` | `<span>Equal coverage of all major brands</span>` (list) | `<span>Consistent methodology across covered brands</span>` | R2 | Softens "equal coverage of all major brands" (not verified against a defined brand universe). |
| `app/page.tsx:1044-1046` (WebSite schema description JSON-LD) | `"description": "Professional HVAC calculators, sizing guides, and unbiased equipment reviews. 355 articles and 31 calculators based on ACCA Manual J calculations and manufacturer-published data.",` | `"description": "Professional HVAC calculators, sizing guides, and editorially independent equipment reviews. 355 articles based on ACCA Manual J calculations and manufacturer-published data.",` | R2 + note | Also drops the "31 calculators" claim (Batch B will pick the canonical calculator count; leave the count out here). |

### A2.2 — Layout metadata (`app/layout.tsx`)

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/layout.tsx:22` (openGraph description, sitewide) | `description: 'Expert HVAC guides with 355 articles, 31 interactive calculators, and unbiased recommendations for all your heating and cooling needs.',` | `description: 'Expert HVAC guides with 355 articles, interactive calculators, and editorially independent recommendations for heating and cooling.',` | R2 + note | Also drops "31" calculators (defer to Batch B). |
| `app/layout.tsx:35` (Twitter card description) | `description: 'Expert HVAC guides with interactive calculators and unbiased recommendations.',` | `description: 'Expert HVAC guides with interactive calculators and editorially independent recommendations.',` | R2 | |

### A2.3 — Category-hub page descriptions

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/heat-pumps/page.tsx:8` | `description: 'Complete heat pump resource center. Sizing calculators, installation guides, efficiency comparisons, troubleshooting, and unbiased heat pump reviews.',` | `description: 'Complete heat pump resource center. Sizing calculators, installation guides, efficiency comparisons, troubleshooting, and editorially independent heat pump reviews.',` | R2 | |
| `app/heating/page.tsx:8` | `description: 'Comprehensive heating resource center. Furnace sizing, space heater guides, energy efficiency ratings, troubleshooting, and unbiased heating system reviews.',` | `description: 'Comprehensive heating resource center. Furnace sizing, space heater guides, energy efficiency ratings, troubleshooting, and editorially independent heating system reviews.',` | R2 | |
| `app/air-conditioning/page.tsx:8` | `description: 'Complete air conditioning resource center. BTU calculators, buying guides, energy efficiency ratings, troubleshooting, and unbiased AC reviews.',` | `description: 'Complete air conditioning resource center. BTU calculators, buying guides, energy efficiency ratings, troubleshooting, and editorially independent AC reviews.',` | R2 | |

### A2.4 — Buying Guides + Footer trust chips

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/buying-guides/page.tsx:254` | `<div className="text-sm text-gray-600">Unbiased Reviews</div>` | `<div className="text-sm text-gray-600">Editorially Independent</div>` | R2 | |
| `components/layout/Footer.tsx:107-108` | `<div className="text-white font-semibold">100% Unbiased</div><div className="text-xs text-gray-400">No Affiliate Links</div>` | `<div className="text-white font-semibold">Editorially Independent</div><div className="text-xs text-gray-400">No Affiliate Links</div>` | R1 + R2 | Keeps the true "No Affiliate Links" sub-line; removes the "100% Unbiased" absolute. |

### A2.5 — Article-level rank/methodology language (deliberately kept as-is)

| file:line | verbatim | verdict | rule |
| --- | --- | --- | --- |
| `content/air-conditioners/best-window-air-conditioners.mdx:4` | `description: "The best window air conditioners in 2026 ranked by real specs: efficiency (CEER), noise (dB), BTU accuracy, and value. No paid placements — pure data-driven rankings for every room size."` | **KEEP AS-IS** | R1 |
| `content/air-conditioners/best-window-air-conditioners.mdx:34` | `These rankings are based entirely on published specifications — CEER efficiency, measured noise levels, BTU capacity, feature set, and price-to-performance ratio. No paid placements, no affiliate bias.` | **KEEP AS-IS** | R1 |
| `app/editorial-policy/page.tsx:44-48` | `We do not run a testing laboratory, and we never claim first-hand testing or measurements we didn't perform. We do not accept payment for reviews or rankings, and the site carries no affiliate links — recommendations are based only on verified specifications and the underlying physics.` | **KEEP AS-IS (see A5 for insertion, not replacement)** | R1 |
| `app/contact/page.tsx:63` | `HVACBase is an independent education site. We don't provide HVAC installation, repair, or emergency service. We don't recommend specific local contractors.` | **KEEP AS-IS** | R1 |
| `app/about/page.tsx:80` | `HVACBase is an independent education site. Marko is a physicist, not a licensed HVAC contractor …` | **KEEP AS-IS** | R1 |

These are article-scoped or entity-descriptor claims that remain true post-Raptive. "No paid placements in the ranking" is factually different from "no display ads run adjacent to the ranking." "Independent education site" describes the editorial entity, not the funding model — remains defensible with an ads-are-not-editorial disclosure elsewhere on the site.

---

## (A3) Privacy policy — STUBBED PENDING RAPTIVE BOILERPLATE

**Nothing in A3 is finalized until P3 clears (boilerplate provided).** The changes below are structural markers describing WHERE the boilerplate goes; the actual body text is intentionally not authored. Do NOT apply this section until you paste Raptive's exact language.

### A3.1 — "How We Use Your Information · We Do NOT" list

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/privacy/page.tsx:130-138` (5-item ❌ list) | ```<h3>We Do NOT</h3><ul>\n  ❌ Sell your personal information\n  ❌ Share data with HVAC contractors without consent\n  ❌ Use your data for unrelated marketing\n  ❌ Create user profiles for advertising\n  ❌ Store calculator inputs beyond session\n</ul>``` | Remove the line `❌ Create user profiles for advertising`. Reword the "share data" and "use data" bullets **per the Raptive boilerplate** (they will require specific attestations about vendor scope). Keep the "❌ Store calculator inputs beyond session" bullet — that's still true. Full replacement text: `<<< PENDING RAPTIVE BOILERPLATE — DO NOT SHIP >>>` | R5 | Do **not** just delete the "profiles for advertising" line without adding the honest advertising disclosure in its place. Ship the whole section as one atomic change with the Raptive-supplied language. |

### A3.2 — "Information Sharing & Disclosure · Service Providers"

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/privacy/page.tsx:158-164` (Limited Sharing Policy — Service Providers row) | `Service Providers: Analytics (Google Analytics), hosting (Vercel/AWS), email services` | Add advertising-processors row: `Advertising Partners: <<< PENDING — Raptive-supplied processor list, including ad-network, its downstream DSPs, and any measurement/attribution vendors; will link to Raptive's IAB TCF-registered vendor list >>>` — keep the existing Analytics/hosting/email row unchanged. | R5 | |

### A3.3 — "Cookies & Tracking Technologies" cookie table

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/privacy/page.tsx:178-207` (cookie table rows) | 4 rows: Essential / Analytics (Google Analytics, 2 years) / Preferences / Performance | Add a fifth row: `Advertising` type · `<<< PENDING Raptive-supplied purpose text — targeting, frequency capping, measurement >>>` · `<<< PENDING duration >>>`. Correct the Analytics duration if wrong — GA4 default is 14 months, not 2 years. | R5 + verify | |
| `app/privacy/page.tsx:210-214` (cookie management note) | `Managing Cookies: You can control cookies through browser settings. Disabling cookies may limit calculator functionality. We honor "Do Not Track" signals.` | `Managing Cookies: Advertising and analytics cookies are governed by your choices in our on-site Consent Management Platform (see the "Manage cookie preferences" link in the footer). You can also control cookies through browser settings; disabling cookies may limit calculator functionality. We honor Global Privacy Control (GPC) signals as opt-out signals under CCPA/CPRA.` | R3 + R5 | Requires the CMP + GPC handling to actually exist (prereq P1). |

### A3.4 — "Your Rights & Choices" — CCPA/CPRA update

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/privacy/page.tsx:280-284` (California residents) | `California Residents: Additional rights under CCPA including right to know, delete, opt-out of sale (we don't sell data), and non-discrimination.` | `<<< PENDING Raptive CPRA language >>>` — will typically include: (a) explicit "right to opt-out of sale/share for cross-context behavioral advertising", (b) Do-Not-Sell-or-Share link, (c) GPC signal recognition, (d) 12-month look-back categories collected, (e) authorized-agent process. **Do not author this text; use Raptive's supplied block verbatim.** | R5 | Under CPRA, display-ad cookie sharing may qualify as "share for cross-context behavioral advertising" even if not "sale". Previous "we don't sell data" claim needs the right qualifier. |

### A3.5 — New footer link (site-wide)

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `components/layout/Footer.tsx:167-176` (bottom links row) | `<Link href="/about">About Us</Link><Link href="/contact">Contact</Link>\|<Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Service</Link><Link href="/disclaimer">Disclaimer</Link><Link href="/sitemap.xml">Sitemap</Link>` | Add two new items to the row: `<button onClick={openCMP}>Manage cookie preferences</button>` and `<Link href="/do-not-sell">Do Not Sell or Share My Personal Information</Link>`. Both required by CCPA/CPRA. The button wiring depends on the CMP chosen (prereq P1). The `/do-not-sell` route + endpoint is a new page that needs to exist. | R3 + R5 | Route + button both need to be created (not in this batch) — flag as follow-on work item. |

### A3.6 — Dates in privacy page

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/privacy/page.tsx:5-6` | `const lastUpdated = 'February 12, 2026';\nconst effectiveDate = 'January 1, 2026';` | **NO CHANGE THIS BATCH** | R6 | User rule: "no date bumps until approved". Bump these when the section is actually applied. |

---

## (A4) Disclaimer — insert new "Advertising" section

### A4.1 — Add "Advertising" section

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/disclaimer/page.tsx:308-332` (after "External Links & References" section, before "Limitation of Liability") | *(no advertising section currently)* | Insert new section between existing sections `<div><div className="flex items-center gap-3 mb-4"><DollarSign className="w-6 h-6 text-yellow-600" /><h2 className="text-2xl font-bold text-gray-900">Advertising</h2></div><div className="bg-yellow-50 rounded-lg p-6"><p className="text-gray-700 mb-4">HVACBase.org is supported by display advertising served by third-party ad networks and their downstream partners. Ad placement, targeting, and measurement are handled by those networks; ads are not selected, endorsed, or reviewed by the HVACBase editorial team.</p><div className="bg-white rounded p-4 space-y-2 text-sm text-gray-700"><p>• Editorial content and rankings are governed by the <Link href="/editorial-policy" className="text-brand-600 hover:text-brand-700">Editorial Policy</Link>. Advertising has no influence on what we cover, how we rank equipment, or which specifications we cite.</p><p>• Data processing associated with advertising is described in the <Link href="/privacy" className="text-brand-600 hover:text-brand-700">Privacy Policy</Link>, including the list of ad-network processors and your consent choices.</p><p>• Third-party ad content links to third-party sites; HVACBase is not responsible for the accuracy, safety, or legality of those destinations.</p></div></div></div>` | R3 | Uses existing lucide icons + Tailwind classes already in the file. Editorial disclosure only — no legal claims that would require Raptive boilerplate. |

### A4.2 — Date in disclaimer page

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/disclaimer/page.tsx:5` | `const lastUpdated = 'February 12, 2026';` | **NO CHANGE THIS BATCH** | R6 | |

---

## (A5) Editorial policy — insert advertising sentence

### A5.1 — Add advertising sentence into "What we don't do"

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/editorial-policy/page.tsx:42-48` (What we don't do section) | ```<h2>What we don't do</h2><p>\n  We do not run a testing laboratory, and we never claim first-hand testing or measurements we didn't perform. We do not accept payment for reviews or rankings, and the site carries <strong>no affiliate links</strong> — recommendations are based only on verified specifications and the underlying physics.\n</p>``` | ```<h2>What we don't do</h2><p>\n  We do not run a testing laboratory, and we never claim first-hand testing or measurements we didn't perform. We do not accept payment for reviews or rankings, and the site carries <strong>no affiliate links</strong> — recommendations are based only on verified specifications and the underlying physics.\n</p>\n<p>\n  The site is supported by display advertising served by third-party ad networks. Ad content is placed by those networks, not by us, and does not influence what we cover, how we rank products, or which specifications we cite. Data processing associated with advertising is described in the <a href="/privacy" className="text-brand-600 hover:underline">privacy policy</a>.\n</p>``` | R1 + R3 | Keeps every existing true claim (no first-hand testing / no payment for rankings / no affiliate links). Adds one paragraph explicitly separating editorial from advertising. Plain editorial disclosure, no legal claims. |

### A5.2 — Date in editorial-policy page

| file:line | BEFORE (verbatim) | AFTER (proposed) | rule | note |
| --- | --- | --- | --- | --- |
| `app/editorial-policy/page.tsx:63` | `<em>Last updated: June 26, 2026.</em>` | **NO CHANGE THIS BATCH** | R6 | |

---

## (A6) Footer trust bar

*(Already captured under A2.4. Kept here as an index anchor to match user's grouping.)*

---

## Change summary

| Group | Files touched | Locations changed | Locations kept-true | Prerequisite |
| --- | --- | --- | --- | --- |
| A1 About | 1 (`app/about/page.tsx`) | 1 optional (add "How the site is funded" section) | all 4 About subsections stay | ads must actually be live before shipping A1.1 |
| A2 Sitewide independence | 7 (`app/page.tsx`, `app/layout.tsx`, `app/heat-pumps/page.tsx`, `app/heating/page.tsx`, `app/air-conditioning/page.tsx`, `app/buying-guides/page.tsx`, `components/layout/Footer.tsx`) | 15 changes | 5 kept-true items (No Affiliate Links chip, No manufacturer sponsorships, No affiliate links or referral fees list item, article ranking methodology callouts, About/Contact "independent education site" phrasing) | none — can ship anytime |
| A3 Privacy | 2 (`app/privacy/page.tsx`, `components/layout/Footer.tsx`) | 6 changes, ALL STUBBED | none | **P1 (CMP) + P2 (Consent Mode) + P3 (Raptive boilerplate)** — hard block until all three clear |
| A4 Disclaimer | 1 (`app/disclaimer/page.tsx`) | 1 new section | rest untouched | none — can ship anytime |
| A5 Editorial policy | 1 (`app/editorial-policy/page.tsx`) | 1 new paragraph | existing paragraph kept verbatim | none — can ship anytime |
| A6 Footer trust bar | (counted in A2.4) | — | — | — |
| **Totals** | **11 distinct files** | **~24 changes**, **6 stubbed pending Raptive** | **11 kept-true items** | 3 prereq gates |

**Recommended ship order (once approved):**
1. **A2 + A4 + A5 + A6** → merge together. Zero prereqs. Removes the sweeping absolutes and adds the honest editorial-disclosure sentences. Site is now Raptive-defensible in editorial framing even if ads haven't onboarded yet.
2. **P1 (install CMP), P2 (wire Consent Mode v2)** → separate change, wires the actual consent gate on GA4 (+ future ads).
3. **A3 (privacy) once P3 boilerplate provided** → merge with the CMP/Consent-Mode work so the privacy page and the wired behavior go live in the same commit.
4. **A1.1** → merge on the day the ad tag actually turns on (so the "supported by display advertising" line is true at the moment it appears).

---

## Open questions for user before applying

- **Q1: CMP choice?** Raptive-bundled Sourcepoint is the path of least resistance. Alternative choices (Osano, Cookiebot, Iubenda, OneTrust) are viable if you have preferences.
- **Q2: `/do-not-sell` route** — build as a static page ("Do Not Sell or Share My Personal Information"), or wire it directly to a CMP-provided endpoint? Raptive-supplied route is simplest.
- **Q3: A1.1 timing** — do you want the "How the site is funded" About-page paragraph shipped now (technically not yet true, but no ad is showing so it reads as forward-looking) or held until Raptive is live?
- **Q4: Article-level "No paid placements, no affiliate bias" (A2.5)** — keep verbatim as ranking-methodology descriptor, or reword to `"Rankings are based on published specifications; the site displays third-party ads, which do not enter into ranking."` for extra reviewer defense?
- **Q5: GA4 cookie duration in `app/privacy/page.tsx:194`** currently says "2 years". Verify against the actual GA4 configuration — default is 14 months. Correction can be included in A3 or done as an independent A0 fix.

---

*End of preview. No files modified except this document.*
*Next step: user review, then per-section approval before any changes ship.*
