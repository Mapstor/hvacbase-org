#!/usr/bin/env node
// content-audit.mjs — read-only content gate + baseline inventory. No network.
// Scans content/**/*.mdx (skip _archived), app/**/page.tsx, components/**.
// Writes audit/SITE-AUDIT.csv, audit/ampacity-tables.md, audit/claims-to-verify.csv,
// audit/merge-candidates.csv, audit/FINDINGS.md, audit/external-urls.txt,
// audit/citation-flags.csv, audit/attribution-check.csv. Changes no content.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'audit');
fs.mkdirSync(OUT, { recursive: true });

const CANON = { kwh: 0.18, therm: 1.35, gal: 3.20 };
const EM = '—';

// ---------- helpers ----------
function walk(dir, exts, skip = () => false) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (skip(p)) continue;
    if (e.isDirectory()) out.push(...walk(p, exts, skip));
    else if (exts.some((x) => e.name.endsWith(x))) out.push(p);
  }
  return out;
}
const rel = (p) => path.relative(ROOT, p);
function csvCell(v) {
  v = v == null ? '' : String(v);
  return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
}
function csvRow(arr) { return arr.map(csvCell).join(','); }
function ctx(text, idx, n = 60) {
  const s = Math.max(0, idx - n), e = Math.min(text.length, idx + n);
  return text.slice(s, e).replace(/\s+/g, ' ').trim();
}
function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  const fm = {};
  if (m) for (const line of m[1].split('\n')) {
    const mm = line.match(/^(\w+):\s*(.*)$/);
    if (mm) fm[mm[1]] = mm[2].replace(/^["']|["']$/g, '').trim();
  }
  return fm;
}
function stripCode(text) {
  // remove fenced + inline code so backticked `<200ms` etc. don't false-flag
  return text.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ');
}
function sentences(text) {
  return stripCode(text).replace(/\n+/g, ' ').split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
}
// Sentence count for one prose paragraph, abbreviation-aware. Longer abbreviations
// first so "U.S.A." isn't half-masked by "U.S". Their periods (and decimal points
// like 14.3 / $1.35) are masked to ∥ so they don't read as sentence ends.
const SENT_ABBR = ['U.S.A', 'U.K', 'U.S', 'Ph.D', 'e.g', 'i.e', 'a.m', 'p.m', 'etc', 'vs', 'Inc', 'Ltd', 'Corp', 'Co', 'Dr', 'Mr', 'Mrs', 'Ms', 'Jr', 'Sr', 'St', 'No', 'approx', 'Fig', 'cf', 'Rev', 'Sen', 'Gov'];
function countSentences(par) {
  let t = par
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')  // markdown link -> text
    .replace(/`[^`]*`/g, ' ')                  // inline code
    .replace(/\*\*|__/g, '').replace(/[*_]/g, ''); // bold/italic markers
  for (const a of SENT_ABBR) t = t.replace(new RegExp('\\b' + a.replace(/\./g, '\\.') + '\\.', 'gi'), a.replace(/\./g, '∥') + '∥');
  t = t.replace(/(\d)\.(\d)/g, '$1∥$2'); // decimals
  return (t.match(/[.!?]+(?=\s|$)/g) || []).length;
}
function tokens(s) {
  return new Set((s || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 2));
}
function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0; for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

// ---------- config lists ----------
const BRANDS = ['Carrier','Trane','Lennox','Goodman','Rheem','Ruud','Bryant','Amana','Daikin','Mitsubishi','Fujitsu','LG','Samsung','Gree','Midea','MrCool','Senville','Pioneer','Cooper & Hunter','Bosch','York','Honeywell','Nest','Ecobee','Emerson','Frigidaire','GE','Whynter','hOmeLabs','Santa Fe','AprilAire','Blueair','Coway','Levoit','Winix','Dyson','Rinnai','Navien','EcoSmart','Stiebel Eltron','Generac','Honda','Champion','Westinghouse','Tesla','Powerwall','Enphase','Renogy','Battle Born','Victron','Aranet','Qingping','Airthings','Temtop','Awair','uHoo','Kaiterra','PurpleAir','IQAir','Aeroseal','Sensi','A.O. Smith','Bradford White','Noritz','Takagi','Kohler','Briggs & Stratton','Haier','Toshiba','Heil','Tempstar','Fresh-Aire','RGF','Steril-Aire','Lumalier','UVGI Solutions','Atlantic Ultraviolet','Philips','Osram','Sylvania','Light Sources','WaterFurnace','ClimateMaster','Span','Lumin','AirGradient','Pro-Lab','HomeBiotics','ImmunoLytics','Warmboard','Uponor','Nuheat','Schluter','Yamaha','Ryobi','American Standard','Dr. Infrared Heater','STA-BIL'];
const ORGS = ['EPA','DOE','ENERGY STAR','EIA','ASHRAE','ACCA','AHRI','NFPA','NEC','CDC','CPSC','FDA','IRS','NREL','ESFI','UL'];
const OVERCLAIMS = ['exact','most comprehensive','best','top-rated','#1','guaranteed','Manual J based','Manual J methodology','AHRI Certified','every number'];
const OLD_TELLS = ['Time Required','Difficulty:','Step 1:','Key Takeaways','Pro Tip','Good to Know','Real-World Example'];
const NEW_TELLS = ['How we sourced this page','recommend no specific','honestly','honest','Here\'s the honest','linked at the bottom','not fixed quotes','not a guarantee'];
const STD_DOMAINS = /(\.gov|\.edu|ashrae\.org|nfpa\.org|acca\.org|ahrinet\.org|ahridirectory\.org|ahamverifide\.org|ul\.com|esfi\.org|nrel\.gov|energystar\.gov|iso\.org|ansi\.org|nadca\.com|dsireusa\.org|ecfr\.gov)/i;
const MFR_DOMAINS = /(tesla\.com|enphase\.com|franklinwh\.com|amazon\.|homedepot\.|lowes\.|carrier\.com|trane\.com|lennox\.com|daikin|mitsubishi|fujitsu|midea|mrcool|generac\.com)/i;

// schema.org URLs are JSON-LD @type/@context values, not citations — never a source.
const SCHEMA_ORG = /schema\.org/i;
// The site's own domain is not an external citation either.
const SITE_HOST = /hvacbase\.org/i;
// ACCA URLs that resolve to a real, live page. Everything else on acca.org answers 200
// with a "Page Not Found" body (a soft-404) and should be flagged for fixing.
const ACCA_ALLOWED = new Set([
  'https://www.acca.org/standards',
  'https://www.acca.org/standards/technical-manuals',
  'https://www.acca.org/standards/technical-manuals/manual-j',
  'https://www.acca.org/standards/technical-manuals/manual-s',
  'https://www.acca.org/standards/quality',
  'https://hvac-contractors.acca.org/locator',
]);
// Build date drives the "future-dated citation" check (a report or period dated after today).
const BUILD_DATE = new Date();
const BUILD_YEAR = BUILD_DATE.getFullYear();
const BUILD_Q = Math.floor(BUILD_DATE.getMonth() / 3) + 1; // 1..4
function accaSoftFlag(u) {
  if (!/acca\.org/i.test(u)) return null;
  return ACCA_ALLOWED.has(u.replace(/\/+$/, '')) ? null : 'acca-soft-404';
}
function energysaverFlag(u) {
  // DOE is retiring the Energy Saver section; flag any link into it.
  return /energy\.gov\/energysaver\//i.test(u) ? 'retired-doe-energysaver' : null;
}
function futureDatedFlag(u) {
  // A citation URL naming a period after the build date can't exist yet (e.g. "2026-q4", "2027").
  const hits = [];
  for (const m of u.matchAll(/(20\d\d)[\s\-_]?q([1-4])/gi)) hits.push([+m[1], +m[2]]);
  for (const m of u.matchAll(/q([1-4])[\s\-_]?(20\d\d)/gi)) hits.push([+m[2], +m[1]]);
  for (const m of u.matchAll(/\b(20\d\d)\b/g)) hits.push([+m[1], null]);
  for (const [y, q] of hits) {
    if (y > BUILD_YEAR) return `future-dated (${y}${q ? '-q' + q : ''})`;
    if (y === BUILD_YEAR && q && q > BUILD_Q) return `future-dated (${y}-q${q})`;
  }
  return null;
}

// CITE-2: manufacturer/retail domains to flag on live pages (brand dictionary + the explicit
// CITE-1/CITE-2 list + common retail), so a product or affiliate link can't pose as a citation.
// The Carrier warranty-lookup TOOL is the one allowed exception.
const MFR_RETAIL = /(carrier\.com|rinnai\.us|store\.google\.com|generac\.com|kohlerpower\.com|energysage\.com|trane\.com|lennox\.com|goodman(?:mfg)?\.com|rheem\.com|ruud\.com|bryant\.com|amana|daikin|mitsubishi|fujitsu|samsung\.com|greecomfort|mrcool|senville|pioneerminisplit|bosch-?home|york(?:hvac)?\.com|honeywell|ecobee\.com|sensi\.com|emerson\.com|frigidaire|geappliances|whynter|homelabs|santa-?fe-?products|aprilaire|blueair|coway|levoit|winix|dyson|navien|ecosmart|stiebel-?eltron|hondapower|championpowerequipment|westinghouse|tesla\.com|powerwall|enphase\.com|renogy|battleborn|victronenergy|aranet|qingping|nest\.com|franklinwh\.com|amazon\.|homedepot\.|lowes\.|walmart\.|wayfair\.|bestbuy\.|costco\.|menards\.|acehardware\.)/i;
const CARRIER_WARRANTY = /carrier\.com\/us\/en\/residential\/homeowner-resources\/warranty-lookup/i;
function mfrFlag(u) {
  if (!MFR_RETAIL.test(u)) return null;
  if (CARRIER_WARRANTY.test(u)) return null; // the one allowed manufacturer link (warranty tool)
  return 'manufacturer-retail-domain';
}

// CITE-2: attribution-check — sentences that pin a NUMBER on a primary org, paired with that
// org's cited URLs on the same page (empty if the claim has no matching citation). Manual review.
const ATTR_ORGS = [
  { org: 'DOE',         re: /\b(?:DOE|Department of Energy)\b/i,                       domain: /energy\.gov|doe\.gov/i },
  { org: 'ENERGY STAR', re: /\bENERGY\s*STAR\b/i,                                      domain: /energystar\.gov/i },
  { org: 'EPA',         re: /\bEPA\b|Environmental Protection Agency/i,                domain: /epa\.gov/i },
  { org: 'CDC',         re: /\bCDC\b|Centers for Disease Control/i,                    domain: /cdc\.gov/i },
  { org: 'CPSC',        re: /\bCPSC\b|Consumer Product Safety Commission/i,            domain: /cpsc\.gov/i },
  { org: 'NFPA',        re: /\bNFPA\b|National Fire Protection Association/i,          domain: /nfpa\.org/i },
  { org: 'EIA',         re: /\bEIA\b|Energy Information Administration/i,              domain: /eia\.gov/i },
];
const ATTR_CUE = /\baccording to\b|\bper the\b|\b(?:says?|reports?|estimates?|recommends?|found|notes?|requires?|identifies|finds|puts|cites|states?|attributes?)\b/i;
const HAS_NUMBER = /\d/;
// CITE-2: "% per degree" savings claims (a per-degree rule of thumb), for review.
const PER_DEGREE_RE = /\d[\d.]*\s*(?:%|percent)\s*(?:per|for (?:every|each))\s+degree/i;

// ---------- gather valid slugs (for link check) ----------
const mdxFiles = walk(path.join(ROOT, 'content'), ['.mdx'], (p) => /_archived/.test(p));
const mdxSlugs = new Set();
for (const f of mdxFiles) { const fm = frontmatter(fs.readFileSync(f, 'utf8')); if (fm.slug) mdxSlugs.add(fm.slug); else mdxSlugs.add(path.basename(f, '.mdx')); }
const appPages = walk(path.join(ROOT, 'app'), ['page.tsx']);
const staticRoutes = new Set();
for (const f of appPages) {
  let r = path.dirname(rel(f)).replace(/^app\/?/, '').replace(/\([^)]*\)\//g, '').replace(/\/?\[[^\]]*\]/g, '');
  r = r.replace(/^\/+|\/+$/g, '');
  if (r) staticRoutes.add(r.split('/')[0]);
}
const validSlug = (s) => mdxSlugs.has(s) || staticRoutes.has(s.split('/')[0]);

// ---------- GA4 / classification join ----------
const sessions = {}; const classif = {}; const pageType = {};
const clsPath = path.join(ROOT, 'RAPTIVE_CLASSIFICATION.csv');
if (fs.existsSync(clsPath)) {
  const lines = fs.readFileSync(clsPath, 'utf8').split('\n');
  const hdr = lines[0].split(',');
  const iUrl = hdr.indexOf('url'), iSess = hdr.indexOf('sessions_4wk'), iType = hdr.indexOf('page_type'), iCls = hdr.indexOf('classification');
  for (let i = 1; i < lines.length; i++) {
    // simple split ok: url + sessions are before any quoted field
    const parts = lines[i].split(',');
    if (!parts[iUrl]) continue;
    const slug = parts[iUrl].replace(/\/+$/,'').split('/').pop();
    sessions[slug] = parseInt(parts[iSess], 10) || 0;
    pageType[slug] = parts[iType] || '';
    classif[slug] = parts[iCls] || '';
  }
}

// ---------- collectors ----------
const rows = [];
const ampacityBlocks = [];
const claims = [];            // {slug, org, sentence}
const mergeCandidates = [];   // per cluster
const totals = {};
const bump = (k, n = 1) => { totals[k] = (totals[k] || 0) + n; };
const byCluster = {};          // cluster -> [{slug, title, h2tokens, sessions}]
const titleMap = {};           // title -> [slug]
const descMap = {};            // desc -> [slug]
const homepageLinks = new Set();
const scoreBySlug = {};
const externalUrls = new Map();   // url -> Set(slug); excludes schema.org + self-host
const attributionChecks = [];     // {slug, org, sentence, urls} — CITE-2 manual-review CSV
const perDegreeFlags = [];        // {slug, sentence} — CITE-2 "% per degree" claims
const longParas = [];             // {slug, author, sentences, first} — >3-sentence prose paras

// ---------- per-mdx scan ----------
function scanMdx(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const fm = frontmatter(raw);
  const slug = fm.slug || path.basename(file, '.mdx');
  const body = raw.replace(/^---\n[\s\S]*?\n---/, '');
  const noCode = stripCode(body);
  const cluster = fm.cluster || rel(file).split('/')[1] || '';
  const words = noCode.replace(/[#*_>|`\-]/g, ' ').split(/\s+/).filter(Boolean).length;
  const c = {}; // per-check counts

  // (a) RATES
  let ratesOff = 0, ratesTotal = 0;
  const US_STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
  const stateRe = new RegExp('\\b(' + US_STATES.join('|') + ')\\b');
  // Sentence splitter that ignores decimal points: '.', '!', '?' end a sentence only
  // when adjacent to whitespace (so "12.36" and "46.28" don't split the sentence and hide
  // a following state name); '\n' and '|' (table cells) are always boundaries.
  const enclosingSentence = (text, idx) => {
    let s = idx, e = idx;
    while (s > 0) { const ch = text[s - 1];
      if (ch === '\n' || ch === '|') break;
      if ((ch === '.' || ch === '!' || ch === '?') && /\s/.test(text[s] || ' ')) break;
      s--; }
    while (e < text.length) { const ch = text[e];
      if (ch === '\n' || ch === '|') break;
      if ((ch === '.' || ch === '!' || ch === '?') && /\s/.test(text[e + 1] || ' ')) break;
      e++; }
    return text.slice(s, e);
  };
  // kWh canon values: 18 / 18.19 cents, or 0.18 / 0.1819 dollars.
  const kwhOk = (val, cents) => cents
    ? (Math.abs(val - 18) < 0.05 || Math.abs(val - 18.19) < 0.05)
    : (Math.abs(val - 0.18) < 1e-4 || Math.abs(val - 0.1819) < 1e-4);
  // Exempt a kWh rate if its sentence ties it to a named state, a time-of-use example,
  // the word "example", or a shown derivation ("÷", "divided by", "COP of", "at an assumed")
  // so a derived delivered-heat cost passes without wording workarounds.
  const kwhExempt = (sent) => stateRe.test(sent)
    || /time[-\s]?of[-\s]?use|\bTOU\b|off[-\s]?peak|\bpeak\b/i.test(sent)
    || /example/i.test(sent)
    || /÷|divided by|COP of|at an assumed/i.test(sent);
  // (a1) kWh electricity rates — strict: any value that isn't canon is off-rate unless exempt
  // (so a bare $0.14/kWh is caught). Handles both "$0.14/kWh" and "14 cents per kWh".
  const kwhDollarRe = /\$\s?(\d[\d,]*(?:\.\d+)?)\s*(?:\/|per\s+)?\s*(?:kwh|kw h)\b/gi;
  const kwhCentsRe = /(\d[\d,]*(?:\.\d+)?)\s*(?:¢|cents?)\s*(?:\/|per\s+)?\s*(?:kwh|kw h)\b/gi;
  for (const [re, cents] of [[kwhDollarRe, false], [kwhCentsRe, true]]) {
    for (const m of body.matchAll(re)) {
      ratesTotal++;
      const val = parseFloat(m[1].replace(/,/g, ''));
      if (kwhOk(val, cents)) continue;
      if (kwhExempt(enclosingSentence(body, m.index))) continue;
      ratesOff++;
      claims.push({ slug, org: 'RATE', sentence: `[kwh ${cents ? val + 'c' : '$' + val} not canon 18/18.19/0.18/0.1819] ...${ctx(body, m.index, 60)}...` });
    }
  }
  // (a2) therm / gallon rates — flag only when stated as a national/average/typical figure
  // and off the site canon by more than 2%.
  const fuelRe = /\$\s?(\d[\d,]*(?:\.\d+)?)\s*(?:\/|per\s+)?\s*(therm|gal(?:lon)?s?)/gi;
  for (const m of body.matchAll(fuelRe)) {
    ratesTotal++;
    const val = parseFloat(m[1].replace(/,/g, ''));
    const unit = /therm/i.test(m[2]) ? 'therm' : 'gal';
    const context = ctx(body, m.index, 60);
    // Match the U.S. abbreviation only as a standalone uppercase token, so it
    // does not fire on the "us" inside words like "usually" or "because".
    const isNat = /(national|average|avg|typical)/i.test(context) || /\bU\.?S\.?\b/.test(context);
    const canon = CANON[unit];
    if (isNat && Math.abs(val - canon) / canon > 0.02) {
      ratesOff++;
      claims.push({ slug, org: 'RATE', sentence: `[${unit} ${val} vs canon ${canon}] ...${context}...` });
    }
  }
  c.rates_total = ratesTotal; c.rates_offrate = ratesOff;

  // (b) STALE EIA
  let stale = 0;
  for (const pat of [/\b886\b/g, /\b10,632\b/g, /\b29\.1\b/g]) stale += (body.match(pat) || []).length;
  const avgHome = noCode.match(/average home uses[^.]*?kWh/gi) || [];
  stale += avgHome.length;
  c.stale_eia = stale;

  // (c) REGULATORY + phantom credit
  let reg = 0, phantom = 0;
  for (const pat of [/\bSEER2\s*(13\.4|14\.3|13\.8)\b[^.]*\b(minimum|national)/gi, /\b(minimum)[^.]*\b15\.2\b/gi, /\b15\.2\b[^.]*\bminimum/gi, /\b2029\b/g]) reg += (body.match(pat) || []).length;
  for (const s of sentences(body)) {
    if (/\b(25C|25D|tax credit|clean energy credit)\b/i.test(s)) {
      const expired = /expired|no longer|terminated|through 2025|ended|OBBBA|placed in service after/i.test(s);
      const futurePresent = /\b(qualify|qualifies|can claim|eligible|offset|get up to|covers up to|you can|applies to|receive)\b/i.test(s);
      if (futurePresent && !expired) { phantom++; claims.push({ slug, org: 'PHANTOM-CREDIT', sentence: s.slice(0, 240) }); }
    }
  }
  c.regulatory = reg; c.phantom_credit = phantom;

  // (d) AMPACITY tables
  let ampFlags = 0;
  const tableRe = /(?:^\|.*\|\s*$\n?)+/gm;
  for (const t of body.match(tableRe) || []) {
    if (/\bAWG\b/i.test(t) && /\b\d+\s*A\b|amp/i.test(t)) {
      ampacityBlocks.push({ slug, file: rel(file), table: t.trim() });
      if (/(NM-?B|Romex)/i.test(t) && /(75\s*.?C|90\s*.?C)/i.test(t)) ampFlags++;
    }
  }
  c.ampacity_flags = ampFlags;

  // (e) ATTRIBUTIONS
  let attr = 0;
  const orgRe = new RegExp('\\b(' + ORGS.map((o) => o.replace(/ /g, '\\s+')).join('|') + ')\\b', 'i');
  for (const s of sentences(body)) {
    const hasPhrase = /\baccording to\b|\bper the\b/i.test(s);
    const orgVerb = orgRe.test(s) && /\b(says?|reports?|estimates?|recommends?|found|notes?|requires?|identifies|finds)\b/i.test(s);
    if (hasPhrase || orgVerb) {
      attr++;
      const om = s.match(orgRe);
      claims.push({ slug, org: om ? om[1].toUpperCase() : 'ATTR', sentence: s.slice(0, 240) });
    }
  }
  c.attributions = attr;

  // (f) PRECISION STATS
  let prec = 0, samp = 0;
  prec += (noCode.match(/\d+(\.\d+)?\s?%/g) || []).length;
  for (const pat of [/on average/gi, /studies show/gi, /research shows/gi, /\d+%\s+of\s+homeowners/gi]) prec += (noCode.match(pat) || []).length;
  for (const s of sentences(body)) {
    if (samp < 3 && (/studies show|research shows|on average|\d+%\s+of\s+homeowners/i.test(s))) { claims.push({ slug, org: 'PRECISION', sentence: s.slice(0, 240) }); samp++; }
  }
  c.precision_stats = prec;

  // (g) COST RECOMPUTE — read assumptions (hours, $/kWh, tonnage/BTU) from the
  // paragraph ABOVE the table and any caption/footnote AFTER it, then check each
  // SEER2 row (SEER2-per-row) or each SEER2-header cell (matrix) against
  // BTU × hours / SEER2 / 1000 × rate. Flag rows/cells off by more than 5%.
  let recomputeFail = 0;
  for (const m of body.matchAll(tableRe)) {
    const tbl = m[0];
    if (!/SEER2/i.test(tbl)) continue;
    const ctx = body.slice(Math.max(0, m.index - 400), m.index) + ' | ' +
                body.slice(m.index + tbl.length, m.index + tbl.length + 320);
    const hrsM = ctx.match(/([\d,]{3,})\s*(?:cooling\s+)?(?:hours|hrs)/i);
    const rateM = ctx.match(/\$?\s*(0?\.\d{2,3})\s*(?:per\s+|\/)\s*kwh/i);
    if (!hrsM || !rateM) continue; // can't recompute without stated hours + rate
    const hours = parseFloat(hrsM[1].replace(/,/g, ''));
    const rate = parseFloat(rateM[1]);
    const tonM = ctx.match(/([\d.]+)[-\s]ton/i);
    const btuM = ctx.match(/([\d,]{4,6})\s*BTU/i);
    const globalBTU = tonM ? parseFloat(tonM[1]) * 12000 : (btuM ? parseFloat(btuM[1].replace(/,/g, '')) : null);
    const lines = tbl.split('\n').filter((l) => l.trim().startsWith('|'));
    if (lines.length < 2) continue;
    const header = lines[0].split('|').map((s) => s.trim());
    const colSeer = header.map((h) => { const mm = h.match(/SEER2?\s*(\d{2})/i); return mm ? parseFloat(mm[1]) : null; });
    const isMatrix = colSeer.filter(Boolean).length >= 2;
    const dataRows = lines.slice(1).filter((l) => !/^\|[\s|:\-]+\|?\s*$/.test(l));
    const check = (btu, seer, cost) => {
      if (!(btu && seer && cost)) return;
      const calc = (btu * hours / seer / 1000) * rate;
      if (calc > 0 && Math.abs(calc - cost) / cost > 0.05) recomputeFail++;
    };
    if (isMatrix) {
      for (const r of dataRows) {
        const cells = r.split('|').map((s) => s.trim());
        const joined = cells.join(' ');
        const rt = joined.match(/([\d.]+)\s*ton/i);
        const rb = joined.match(/([\d,]{4,6})\s*BTU/i);
        const rowBTU = rt ? parseFloat(rt[1]) * 12000 : (rb ? parseFloat(rb[1].replace(/,/g, '')) : globalBTU);
        cells.forEach((cell, i) => {
          if (colSeer[i]) { const cm = cell.match(/\$\s?([\d,]+)/); if (cm) check(rowBTU, colSeer[i], parseFloat(cm[1].replace(/,/g, ''))); }
        });
      }
    } else {
      const seerCol = header.findIndex((h) => /^SEER2?$/i.test(h));
      const costCol = header.findIndex((h) => /annual.*cost|energy cost/i.test(h));
      if (seerCol < 0 || costCol < 0) continue;
      for (const r of dataRows) {
        const cells = r.split('|').map((s) => s.trim());
        const sm = (cells[seerCol] || '').match(/([\d.]+)/);
        const cm = (cells[costCol] || '').match(/\$\s?([\d,]+)/);
        const rb = cells.join(' ').match(/([\d,]{4,6})\s*BTU/i);
        const rowBTU = rb ? parseFloat(rb[1].replace(/,/g, '')) : globalBTU;
        if (sm && cm) check(rowBTU, parseFloat(sm[1]), parseFloat(cm[1].replace(/,/g, '')));
      }
    }
  }
  c.recompute_fail = recomputeFail;

  // (h) BRANDS
  let brandCount = 0; const brandsFound = new Set();
  for (const b of BRANDS) {
    // "York" is an HVAC brand but also the tail of "New York" (the state/city). A negative
    // lookbehind for "New " keeps the place from counting as the brand.
    const guard = b === 'York' ? '(?<![A-Za-z0-9])(?<!New )' : '(?<![A-Za-z0-9])';
    const re = new RegExp(guard + b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![A-Za-z0-9])', 'g');
    const n = (body.match(re) || []).length;
    if (n) { brandCount += n; brandsFound.add(b); }
  }
  // brand + model code = a product mention (reported SEPARATELY from bare brand names)
  const modelRe = new RegExp('\\b(' + BRANDS.filter(b=>!/&/.test(b)).map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\s+[A-Z0-9]{2,}[-A-Z0-9]*', 'g');
  // Same "New York" guard: "New York NYSERDA" must not read as a York model code.
  // Serial-number decoder uses date-FORMAT placeholders like "Amana YYMM" and
  // "Bryant WWYY" (year/month, week/year) that read as brand+code but are not
  // product model numbers. Allowlist those format tokens on that page only.
  const SERIAL_FMT = /^(YYMM|WWYY|YYWW|MMYY)$/;
  const models = [...new Set([...body.matchAll(modelRe)]
    .filter((m) => !(m[1] === 'York' && body.slice(Math.max(0, m.index - 4), m.index) === 'New '))
    .filter((m) => !(slug === 'hvac-serial-number-decoder' && SERIAL_FMT.test(m[0].split(/\s+/).pop() || '')))
    .map((m) => m[0]))];
  // Decoding is brand-specific by nature — brand NAMES are benign context on the
  // serial-number decoder, so they don't count there (model codes still reported).
  if (slug === 'hvac-serial-number-decoder') { brandCount = 0; brandsFound.clear(); }
  c.brands = brandCount;
  c.brands_list = [...brandsFound].join('; ');
  c.model_codes = models.length;
  c.model_list = models.join('; ');

  // (i) OVERCLAIMS — "best for", "best practice(s)", "best way(s)" are NOT overclaims
  let over = 0;
  for (const o of OVERCLAIMS) {
    if (o === 'best') {
      over += (noCode.match(/\bbest\b(?!\s+(?:for|practice|practices|way|ways))/gi) || []).length;
    } else {
      over += (noCode.toLowerCase().split(o.toLowerCase()).length - 1);
    }
  }
  c.overclaims = over;

  // (j) COUNT PROMISES (self-title vs own structure)
  let promiseMismatch = 0;
  const title = fm.title || '';
  const pm = title.match(/\b(\d+)\s+(fixes|tasks|tips|causes|methods|ways|steps|reasons|signs|mistakes|factors|things)\b/i);
  if (pm) {
    const promised = parseInt(pm[1], 10);
    const h2 = (body.match(/^##\s+/gm) || []).length;
    const h3 = (body.match(/^###\s+/gm) || []).length;
    const li = (body.match(/^\s*[-*]\s+/gm) || []).length;
    const ol = (body.match(/^\s*\d+\.\s+/gm) || []).length;
    const near = [h2, h3, li, ol].some((x) => Math.abs(x - promised) <= 1);
    if (!near) { promiseMismatch = 1; claims.push({ slug, org: 'COUNT-PROMISE', sentence: `title promises ${promised}; H2=${h2} H3=${h3} li=${li} ol=${ol}` }); }
  }
  c.count_promise_mismatch = promiseMismatch;

  // (k) OLD TEMPLATE TELLS
  let oldt = 0;
  for (const p of OLD_TELLS) oldt += (body.split(p).length - 1);
  c.old_tells = oldt;

  // (l) NEW TEMPLATE TELLS + intro
  let newt = 0;
  for (const p of NEW_TELLS) newt += (body.toLowerCase().split(p.toLowerCase()).length - 1);
  c.new_tells = newt;
  const introText = noCode.replace(/^#.*$/gm, '').replace(/^\s*import .*/gm, '').trim();
  c.intro12 = introText.split(/\s+/).slice(0, 12).join(' ');

  // (m) EM DASHES
  c.em_dashes = (body.match(new RegExp(EM, 'g')) || []).length;

  // (q) LONG PARAGRAPHS — prose paragraphs (not headings, lists, tables, or
  // components) with more than 3 sentences (CLAUDE.md: "Max 3 sentences per
  // paragraph in any user-facing content"). Abbreviations like "U.S." and "e.g."
  // are treated as non-terminal by countSentences.
  let longParaCount = 0;
  for (const block of body.split(/\n\s*\n/)) {
    const b = block.trim();
    if (!b) continue;
    const first = b.split('\n')[0];
    if (/^#/.test(first)) continue;                                // heading
    if (/^\|/.test(first) || /(^|\n)\s*\|/.test(b)) continue;       // table
    if (/^(import\s|<)/.test(first)) continue;                     // component / import / JSX
    if (/^\s*([-*+]\s|>\s?|\d+\.\s)/.test(first)) continue;         // list / blockquote
    if (b.split('\n').some((l) => /^\s*[-*+]\s/.test(l))) continue; // multi-line list safety
    let plines = b.split('\n');
    if (/^\*\*.*\*\*$/.test(plines[0].trim())) plines = plines.slice(1); // FAQ bold-question label
    const oneline = plines.join(' ').trim();
    if (!oneline) continue;
    const n = countSentences(oneline);
    if (n > 3) {
      longParaCount++;
      const firstWords = oneline.replace(/\*\*|[*_>#`]/g, '').trim().split(/\s+/).slice(0, 10).join(' ');
      longParas.push({ slug, author: fm.author || '', sentences: n, first: firstWords });
    }
  }
  c.long_paragraphs = longParaCount;

  // (n) LINKS
  let broken = 0, badpath = 0;
  const linkRe = /\]\((\/[a-z0-9\-\/#]*)\)|href=["'](\/[a-z0-9\-\/#]*)["']/gi;
  for (const m of body.matchAll(linkRe)) {
    let href = (m[1] || m[2] || '').split('#')[0].replace(/\/+$/,'');
    if (!href || href === '') continue;
    if (/^\/(brand-reviews|buying-guides)/.test(href)) badpath++;
    const base = href.replace(/^\//,'').split('/')[0];
    if (base && !validSlug(base)) broken++;
  }
  c.links_broken = broken; c.links_badpath = badpath;

  // (o) SOURCES
  let srcCount = 0, srcStd = 0, srcMfr = 0, srcBare = 0, srcOther = 0;
  const urls = [];
  for (const m of body.matchAll(/url:\s*["']([^"']+)["']/g)) urls.push(m[1]);
  for (const m of body.matchAll(/https?:\/\/[^\s"'})\]]+/g)) urls.push(m[0]);
  for (const u of urls) {
    // schema.org (JSON-LD types) and self-host links are not citations.
    if (SCHEMA_ORG.test(u) || SITE_HOST.test(u)) continue;
    srcCount++;
    if (STD_DOMAINS.test(u)) srcStd++;
    else if (MFR_DOMAINS.test(u)) srcMfr++;
    else if (/^https?:\/\/[^\/]+\/?$/.test(u)) srcBare++;
    else srcOther++;
    let set = externalUrls.get(u);
    if (!set) { set = new Set(); externalUrls.set(u, set); }
    set.add(slug);
  }
  c.sources_count = srcCount; c.sources_std = srcStd; c.sources_mfr = srcMfr; c.sources_bare = srcBare;

  // (p) ATTRIBUTION-CHECK + per-degree (CITE-2, manual review — not pass/fail)
  const pageUrls = [...new Set(urls.filter((u) => !SCHEMA_ORG.test(u) && !SITE_HOST.test(u)))];
  const clean = (s) => s
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')   // markdown links -> link text
    .replace(/<\/?[A-Za-z][^>]*>/g, ' ')       // JSX tags
    .replace(/[#|]+/g, ' ').replace(/\s+/g, ' ').trim();
  // Attribute PROSE only: strip SourcesBox citation blocks (both the sources={[...]} and the
  // markdown-list forms) so URL/label list items don't masquerade as attribution "sentences".
  // Inline prose links (e.g. "the [EPA](url) estimates ...") are kept.
  const proseBody = body.replace(/<SourcesBox[\s\S]*?(?:<\/SourcesBox>|\/>)/gi, ' ');
  for (const s of sentences(proseBody)) {
    if (!HAS_NUMBER.test(s) || !ATTR_CUE.test(s)) continue;
    if (/\b(?:url|label|title|name)\s*:\s*["']/i.test(s)) continue; // stray citation-object backstop
    for (const a of ATTR_ORGS) {
      if (!a.re.test(s)) continue;
      const orgUrls = pageUrls.filter((u) => a.domain.test(u));
      attributionChecks.push({ slug, org: a.org, sentence: clean(s).slice(0, 400), urls: orgUrls.join(' ') });
    }
  }
  for (const s of sentences(body)) {
    if (PER_DEGREE_RE.test(s)) perDegreeFlags.push({ slug, sentence: clean(s).slice(0, 300) });
  }

  // (q) STRUCTURE CHECKS — RelatedArticles prop, missing H1, URL-less SourcesBox
  // <RelatedArticles slugs={...}> is broken: the component takes `articles`, not `slugs`.
  c.related_slugs_prop = (body.match(/<RelatedArticles\b[^>]*\bslugs\s*=/gi) || []).length;
  // Every page should have a markdown "# " H1 heading.
  c.missing_h1 = /^#\s+\S/m.test(body) ? 0 : 1;
  // URL-less SourcesBox entries. Array form: any `sources={[{...}]}` object missing a
  // non-empty url:. Children form (<SourcesBox>...</SourcesBox>, no sources= prop): any
  // markdown list item (or the whole block) without an http(s) URL.
  let sbNoUrl = 0;
  for (const m of body.matchAll(/<SourcesBox\b[^>]*\bsources=\{\[([\s\S]*?)\]\}/gi)) {
    for (const o of (m[1].match(/\{[^{}]*\}/g) || [])) {
      if (!/\burl\s*:\s*["']https?:\/\/[^"']+["']/.test(o)) sbNoUrl++;   // no url or empty/non-http url
    }
  }
  for (const m of body.matchAll(/<SourcesBox\b([^>]*)>([\s\S]*?)<\/SourcesBox>/gi)) {
    if (/\bsources\s*=/.test(m[1])) continue;           // array form, handled above
    const items = m[2].split('\n').map((s) => s.trim()).filter((s) => /^[-*]\s/.test(s));
    if (items.length) { for (const it of items) if (!/https?:\/\//.test(it)) sbNoUrl++; }
    else if (m[2].trim() && !/https?:\/\//.test(m[2])) sbNoUrl++;         // children box, no list, no url
  }
  c.sourcesbox_no_url = sbNoUrl;

  // (r) TITLE OVERCLAIM (report-only) — marketing superlatives in the title or H1.
  const h1text = (body.match(/^#\s+(.+?)\s*$/m) || [])[1] || '';
  const OVERCLAIM = /\b(Complete|Ultimate|Definitive|Proven|Best|That Actually Work|Everything You Need)\b|#1\b/i;
  c.title_overclaim = (OVERCLAIM.test(title) || OVERCLAIM.test(h1text)) ? 1 : 0;

  // score
  const score = c.model_codes * 5 + c.phantom_credit * 5 + c.rates_offrate * 3 + c.recompute_fail * 3 + c.overclaims * 2 + c.old_tells * 1;
  scoreBySlug[slug] = score;

  // cluster/dup collectors
  const h2s = (body.match(/^##\s+(.*)$/gm) || []).join(' ');
  (byCluster[cluster] = byCluster[cluster] || []).push({ slug, title, h2t: tokens(title + ' ' + h2s), sessions: sessions[slug] || 0 });
  if (title) (titleMap[title] = titleMap[title] || []).push(slug);
  if (fm.description) (descMap[fm.description] = descMap[fm.description] || []).push(slug);

  // totals
  for (const k of ['rates_offrate','stale_eia','regulatory','phantom_credit','ampacity_flags','attributions','precision_stats','recompute_fail','brands','model_codes','overclaims','count_promise_mismatch','old_tells','new_tells','em_dashes','long_paragraphs','links_broken','links_badpath','related_slugs_prop','missing_h1','sourcesbox_no_url','title_overclaim']) bump(k, c[k]);

  rows.push({
    slug, file: rel(file), cluster, page_type: pageType[slug] || fm.contentType || '',
    words, sessions: sessions[slug] || 0, author: fm.author || '', dateModified: fm.dateModified || '',
    score, ...c,
  });
}

for (const f of mdxFiles) { try { scanMdx(f); } catch (e) { console.error('ERR', rel(f), e.message); } }

// ---------- EXTERNAL URLS + CITATION FLAGS ----------
const citationFlags = []; // {url, reasons[], slugs[]}
for (const [u, slugs] of externalUrls) {
  const reasons = [accaSoftFlag(u), energysaverFlag(u), futureDatedFlag(u), mfrFlag(u)].filter(Boolean);
  if (reasons.length) citationFlags.push({ url: u, reasons, slugs: [...slugs].sort() });
}
citationFlags.sort((a, b) => a.url.localeCompare(b.url));
const externalUrlList = [...externalUrls.keys()].sort();
fs.writeFileSync(path.join(OUT, 'external-urls.txt'), externalUrlList.join('\n') + '\n');
fs.writeFileSync(path.join(OUT, 'citation-flags.csv'),
  'url,reason,slugs\n' +
  citationFlags.map((c) => csvRow([c.url, c.reasons.join('; '), c.slugs.join(' ')])).join('\n') +
  (citationFlags.length ? '\n' : ''));

// CITE-2: attribution-check.csv — every sentence pinning a number on DOE/ENERGY STAR/EPA/CDC/
// CPSC/NFPA/EIA, with that org's cited URLs on the page. Manual review, not a pass/fail gate.
fs.writeFileSync(path.join(OUT, 'attribution-check.csv'),
  'slug,org,sentence,urls\n' +
  attributionChecks.map((a) => csvRow([a.slug, a.org, a.sentence, a.urls])).join('\n') +
  (attributionChecks.length ? '\n' : ''));
const mfrFlagRows = citationFlags.filter((c) => c.reasons.includes('manufacturer-retail-domain'));

// ---------- FOOTER / chrome finding ----------
const compFiles = walk(path.join(ROOT, 'components'), ['.tsx', '.ts', '.jsx', '.js']);
const appTsx = walk(path.join(ROOT, 'app'), ['.tsx']);
const footerFiles = [...compFiles, ...appTsx].filter((f) => /footer/i.test(f));
const chromeHits = {};
for (const f of [...compFiles, ...appTsx]) {
  const t = fs.readFileSync(f, 'utf8');
  for (const pat of ['355 Guides','355','9 Calculators','Brand Reviews','Buying Guides','brand-reviews','buying-guides','AHRI Certified','Manual J Based']) {
    const n = t.split(pat).length - 1;
    if (n) (chromeHits[pat] = chromeHits[pat] || []).push(`${rel(f)} (${n})`);
  }
}
// which layouts import Footer
const footerImporters = [...compFiles, ...appTsx].filter((f) => /import\s+Footer|from ['"].*Footer/i.test(fs.readFileSync(f, 'utf8'))).map(rel);

// homepage links
const homeFile = path.join(ROOT, 'app', 'page.tsx');
if (fs.existsSync(homeFile)) {
  const t = fs.readFileSync(homeFile, 'utf8');
  for (const m of t.matchAll(/href=["']\/([a-z0-9\-]+)["']/gi)) homepageLinks.add(m[1]);
}

// ---------- DUPLICATES / MERGE ----------
for (const [cl, arr] of Object.entries(byCluster)) {
  for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) {
    const score = jaccard(arr[i].h2t, arr[j].h2t);
    if (score >= 0.5) mergeCandidates.push({ cluster: cl, a: arr[i].slug, b: arr[j].slug, score: score.toFixed(2), sa: arr[i].sessions, sb: arr[j].sessions });
  }
}
const dupTitles = Object.entries(titleMap).filter(([, v]) => v.length > 1);
const dupDescs = Object.entries(descMap).filter(([, v]) => v.length > 1);

// ---------- WRITE side files ----------
const colOrder = ['slug','file','cluster','page_type','words','sessions','author','dateModified','score','rates_total','rates_offrate','stale_eia','regulatory','phantom_credit','ampacity_flags','attributions','precision_stats','recompute_fail','brands','brands_list','model_codes','model_list','overclaims','count_promise_mismatch','old_tells','new_tells','em_dashes','long_paragraphs','links_broken','links_badpath','sources_count','sources_std','sources_mfr','sources_bare','related_slugs_prop','missing_h1','sourcesbox_no_url','title_overclaim','intro12'];
fs.writeFileSync(path.join(OUT, 'SITE-AUDIT.csv'),
  csvRow(colOrder) + '\n' + rows.map((r) => csvRow(colOrder.map((k) => r[k]))).join('\n') + '\n');

fs.writeFileSync(path.join(OUT, 'ampacity-tables.md'),
  '# Ampacity tables (verbatim) — AWG + amps\n\n' +
  ampacityBlocks.map((a) => `## ${a.slug}\n\`${a.file}\`\n\n${a.table}\n`).join('\n\n') + '\n');

fs.writeFileSync(path.join(OUT, 'claims-to-verify.csv'),
  'slug,org,sentence\n' + claims.map((c) => csvRow([c.slug, c.org, c.sentence])).join('\n') + '\n');

mergeCandidates.sort((a, b) => b.score - a.score);
fs.writeFileSync(path.join(OUT, 'merge-candidates.csv'),
  'slug_a,slug_b,score,sessions_a,sessions_b,cluster\n' +
  mergeCandidates.map((m) => csvRow([m.a, m.b, m.score, m.sa, m.sb, m.cluster])).join('\n') + '\n');

// LONG PARAGRAPHS — prose paragraphs over the CLAUDE.md 3-sentence limit, with author.
longParas.sort((a, b) => b.sentences - a.sentences);
fs.writeFileSync(path.join(OUT, 'long-paragraphs.csv'),
  'slug,author,sentences,first_words\n' +
  longParas.map((p) => csvRow([p.slug, p.author, p.sentences, p.first])).join('\n') +
  (longParas.length ? '\n' : ''));

// ---------- FINDINGS.md ----------
const top30 = [...rows].sort((a, b) => b.score - a.score).slice(0, 30);
const homeScored = [...homepageLinks].map((s) => ({ slug: s, score: scoreBySlug[s] ?? '(not an mdx page)', sessions: sessions[s] || '' }));
let F = '# SITE-AUDIT-1 — baseline findings\n\n';
F += `Generated by scripts/content-audit.mjs. Read-only. MDX pages scanned: ${rows.length}.\n\n`;
F += '## Totals per check\n\n| Check | Total |\n|---|---|\n';
for (const [k, v] of Object.entries(totals).sort((a, b) => b[1] - a[1])) F += `| ${k} | ${v} |\n`;
F += `\nAmpacity tables captured: ${ampacityBlocks.length} (see ampacity-tables.md). Claims-to-verify rows: ${claims.length}. Merge candidates: ${mergeCandidates.length}. Duplicate titles: ${dupTitles.length}. Duplicate descriptions: ${dupDescs.length}.\n`;
F += '\n## Top 30 pages by weighted score\n(brands×5 + phantom-credit×5 + off-rate×3 + recompute-fail×3 + overclaims×2 + old-template-tells×1)\n\n| # | slug | score | sessions | brands | phantom | offrate | recompute | overclaims | old_tells |\n|---|---|---|---|---|---|---|---|---|---|\n';
top30.forEach((r, i) => { F += `| ${i + 1} | ${r.slug} | ${r.score} | ${r.sessions} | ${r.brands} | ${r.phantom_credit} | ${r.rates_offrate} | ${r.recompute_fail} | ${r.overclaims} | ${r.old_tells} |\n`; });
F += '\n## Homepage-linked pages (with score)\n\n| slug | score | sessions |\n|---|---|---|\n';
for (const h of homeScored.sort((a, b) => (b.score || 0) - (a.score || 0))) F += `| ${h.slug} | ${h.score} | ${h.sessions} |\n`;
F += '\n## Footer / site-chrome finding\n\n';
F += `Footer components: ${footerFiles.map(rel).join(', ') || '(none named *footer*)'}\n\n`;
F += `Files importing Footer: ${footerImporters.join(', ') || '(none detected)'}\n\n`;
F += 'Stale chrome-string hits (across app/ + components/):\n\n';
if (Object.keys(chromeHits).length === 0) F += '- none found\n';
else for (const [k, v] of Object.entries(chromeHits)) F += `- \`${k}\`: ${v.join(', ')}\n`;
F += '\n## NM-B ampacity safety flags\n\n';
const nmb = rows.filter((r) => r.ampacity_flags > 0);
if (!nmb.length) F += '- none\n';
else for (const r of nmb) F += `- ${r.slug} (${r.ampacity_flags}) — ${r.file}\n`;
F += '\n## Duplicate titles\n\n' + (dupTitles.length ? dupTitles.map(([t, v]) => `- "${t}" → ${v.join(', ')}`).join('\n') : '- none') + '\n';
F += `\n## Flagged citation URLs\n\n(ACCA soft-404s, retired DOE Energy Saver pages, and citations dated after the build date of ${BUILD_YEAR}-Q${BUILD_Q}. schema.org excluded from the citation list as JSON-LD, not a source. External URLs: ${externalUrlList.length}.)\n\n`;
if (!citationFlags.length) F += '- none\n';
else for (const c of citationFlags) F += `- \`${c.url}\` — ${c.reasons.join(', ')} (in: ${c.slugs.join(', ')})\n`;
F += `\n## Manufacturer / retail links on live pages\n\n(Product or affiliate links, flagged so they don't pose as citations. The Carrier warranty-lookup tool is exempt.)\n\n`;
if (!mfrFlagRows.length) F += '- none\n';
else for (const c of mfrFlagRows) F += `- \`${c.url}\` (in: ${c.slugs.join(', ')})\n`;
F += `\n## "% per degree" claims\n\n(Per-degree savings rules of thumb, for review. Count: ${perDegreeFlags.length}.)\n\n`;
if (!perDegreeFlags.length) F += '- none\n';
else for (const p of perDegreeFlags) F += `- ${p.slug}: ${p.sentence}\n`;
F += `\n## Attribution check\n\n${attributionChecks.length} sentences pin a number on DOE / ENERGY STAR / EPA / CDC / CPSC / NFPA / EIA — see audit/attribution-check.csv (manual review, not pass/fail).\n`;
fs.writeFileSync(path.join(OUT, 'FINDINGS.md'), F);

// ---------- console summary ----------
console.log('SITE-AUDIT-1 complete.');
console.log('MDX pages:', rows.length);
console.log('Totals:', JSON.stringify(totals));
console.log('Ampacity tables:', ampacityBlocks.length, '| NM-B flags pages:', nmb.length);
console.log('Footer files:', footerFiles.map(rel).join(', '));
console.log('Chrome hits:', JSON.stringify(Object.fromEntries(Object.entries(chromeHits).map(([k,v])=>[k,v.length]))));
console.log('Top5:', top30.slice(0,5).map(r=>`${r.slug}=${r.score}`).join(', '));
console.log('External URLs:', externalUrlList.length, '| Citation flags:', citationFlags.length, `(build ${BUILD_YEAR}-Q${BUILD_Q})`);
for (const c of citationFlags) console.log('  FLAG', c.reasons.join(','), '-', c.url);
console.log('Manufacturer/retail links (live):', mfrFlagRows.length, '| attribution-check rows:', attributionChecks.length, '| "% per degree" claims:', perDegreeFlags.length);
console.log('Long paragraphs (>3 sentences):', longParas.length, '| pages affected:', new Set(longParas.map((p) => p.slug)).size);
