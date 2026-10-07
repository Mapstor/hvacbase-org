#!/usr/bin/env node
/**
 * scripts/static-routes.mjs — content checks for the 18 static (non-MDX) routes.
 *
 * The MDX content audit (scripts/content-audit.mjs) and the deploy gate
 * (scripts/audit.mjs) only ever scanned content/**.mdx. The homepage, the
 * resource/cluster hubs, /hvac-dictionary and the six informational pages are
 * hand-written React (app/**.tsx) and were never checked — yet they are a
 * reviewer's first clicks. This module runs the same deterministic checks the
 * content audit runs on articles, but against the BUILT HTML of each route
 * (.next/server/app/<route>.html), which is the only place their rendered,
 * user-visible text exists.
 *
 * Built-HTML mode: findings require a completed `next build`. Under
 * --skip-build there is no fresh HTML, so the check skips gracefully and says
 * so (a single informational finding), exactly like the audit's compile check.
 *
 * Checks ported from content-audit.mjs (same lists, same intent):
 *   em dashes · brand names · brand+model codes · overclaims · old template
 *   tells · new template tells · phantom tax credits · off-rate kWh/therm/gal ·
 *   stale EIA figures · long paragraphs (>3 sentences) · broken internal links.
 *
 * Text is taken from the single <main> element the root layout renders
 * (app/layout.tsx), so the repeated <header>/<footer> chrome is excluded and
 * each page is judged on its own content. Links are read from the same region.
 */

import { readFileSync, existsSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative, basename } from 'node:path';
import { scanSocialProof } from './social-proof.mjs';

const REPO_ROOT = process.cwd();
const BUILT_DIR = join(REPO_ROOT, '.next', 'server', 'app');

// The 18 static routes, mirroring STATIC_ROUTES in app/sitemap.xml/route.ts.
// '' is the homepage, built to .next/server/app/index.html.
export const STATIC_ROUTES = [
  '', 'about', 'contact', 'editorial-policy', 'disclaimer', 'privacy', 'terms',
  'articles', 'calculators', 'cost-guides', 'how-to', 'hvac-dictionary', 'troubleshooting',
  'air-conditioning', 'air-quality', 'energy-efficiency', 'heat-pumps', 'heating',
];

// ── Config lists (mirror scripts/content-audit.mjs; keep in sync) ────────────
const CANON = { kwh: 0.18, therm: 1.35, gal: 3.20 };
const BRANDS = ['Carrier','Trane','Lennox','Goodman','Rheem','Ruud','Bryant','Amana','Daikin','Mitsubishi','Fujitsu','LG','Samsung','Gree','Midea','MrCool','Senville','Pioneer','Cooper & Hunter','Bosch','York','Honeywell','Nest','Ecobee','Emerson','Frigidaire','GE','Whynter','hOmeLabs','Santa Fe','AprilAire','Blueair','Coway','Levoit','Winix','Dyson','Rinnai','Navien','EcoSmart','Stiebel Eltron','Generac','Honda','Champion','Westinghouse','Tesla','Powerwall','Enphase','Renogy','Battle Born','Victron','Aranet','Qingping','Airthings','Temtop','Awair','uHoo','Kaiterra','PurpleAir','IQAir','Aeroseal','Sensi','A.O. Smith','Bradford White','Noritz','Takagi','Kohler','Briggs & Stratton','Haier','Toshiba','Heil','Tempstar','Fresh-Aire','RGF','Steril-Aire','Lumalier','UVGI Solutions','Atlantic Ultraviolet','Philips','Osram','Sylvania','Light Sources','WaterFurnace','ClimateMaster','Span','Lumin','AirGradient','Pro-Lab','HomeBiotics','ImmunoLytics','Warmboard','Uponor','Nuheat','Schluter','Yamaha','Ryobi','American Standard','Dr. Infrared Heater','STA-BIL'];
const OVERCLAIMS = ['exact','most comprehensive','best','top-rated','#1','guaranteed','Manual J based','Manual J methodology','AHRI Certified','every number'];
const OLD_TELLS = ['Time Required','Difficulty:','Step 1:','Key Takeaways','Pro Tip','Good to Know','Real-World Example'];
const NEW_TELLS = ['How we sourced this page','recommend no specific','honestly','honest','Here\'s the honest','linked at the bottom','not fixed quotes','not a guarantee'];
const EM = '—';

// Sentence counting, abbreviation-aware (ported from content-audit.mjs).
const SENT_ABBR = ['U.S.A','U.K','U.S','Ph.D','e.g','i.e','a.m','p.m','etc','vs','Inc','Ltd','Corp','Co','Dr','Mr','Mrs','Ms','Jr','Sr','St','No','approx','Fig','cf','Rev','Sen','Gov'];
function countSentences(par) {
  let t = par.replace(/\*\*|__/g, '').replace(/[*_]/g, '');
  for (const a of SENT_ABBR) t = t.replace(new RegExp('\\b' + a.replace(/\./g, '\\.') + '\\.', 'gi'), a.replace(/\./g, '∥') + '∥');
  t = t.replace(/(\d)\.(\d)/g, '$1∥$2'); // decimals
  return (t.match(/[.!?]+(?=\s|$)/g) || []).length;
}

// ── HTML helpers ─────────────────────────────────────────────────────────────
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', deg: '°', times: '×', divide: '÷', cent: '¢' };
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, n) => (n in NAMED ? NAMED[n] : m));
}

/** The innerHTML of the single <main> the layout renders (page content only). */
function mainHtml(html) {
  const m = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  return m ? m[1] : html; // fall back to whole doc if <main> is absent
}

/** Visible text of an HTML fragment: drop script/style/svg/noscript, strip tags, decode. */
function visibleText(frag) {
  const stripped = frag
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<template\b[\s\S]*?<\/template>/gi, ' ');
  return decodeEntities(stripped.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

/** Visible text of each <p> element (the paragraph unit for the long-para check). */
function paragraphTexts(frag) {
  const out = [];
  for (const m of frag.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const t = decodeEntities(m[1].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
    if (t) out.push(t);
  }
  return out;
}

/** Internal link hrefs ("/...") inside a fragment. */
function internalLinks(frag) {
  const out = [];
  for (const m of frag.matchAll(/href="(\/[a-zA-Z0-9\-\/#?.]*)"/g)) out.push(m[1]);
  return out;
}

// ── Valid-slug set for the broken-link check (MDX slugs + static routes) ──────
function frontmatterSlug(text, file) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (m) {
    const sm = m[1].match(/^slug:\s*(.+)$/m);
    if (sm) return sm[1].replace(/^["']|["']$/g, '').trim();
  }
  return basename(file, '.mdx');
}
function walk(dir, ext, skip = () => false) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (skip(p)) continue;
    if (e.isDirectory()) out.push(...walk(p, ext, skip));
    else if (e.name.endsWith(ext)) out.push(p);
  }
  return out;
}
function buildValidSlugs() {
  const slugs = new Set();
  for (const f of walk(join(REPO_ROOT, 'content'), '.mdx', (p) => /_archived/.test(p))) {
    slugs.add(frontmatterSlug(readFileSync(f, 'utf8'), f));
  }
  // Static route first-segments from app/**/page.tsx (strip route groups + [dynamic]).
  for (const f of walk(join(REPO_ROOT, 'app'), 'page.tsx')) {
    let r = relative(REPO_ROOT, f).replace(/^app\/?/, '').replace(/\/page\.tsx$/, '')
      .replace(/\([^)]*\)\//g, '').replace(/\/?\[[^\]]*\]/g, '').replace(/^\/+|\/+$/g, '');
    if (r) slugs.add(r.split('/')[0]);
  }
  return slugs;
}

// ── Core per-route checks ────────────────────────────────────────────────────
/** Returns { findings[], text, paragraphs[], links[] } for one built route. */
function checkRoute(route, html, validSlugs) {
  const routeLabel = `/${route}` === '/' ? '/' : `/${route}`;
  const frag = mainHtml(html);
  const text = visibleText(frag);
  const paras = paragraphTexts(frag);
  const links = internalLinks(frag);
  const findings = [];
  const add = (check, severity, detail) => findings.push({ check, file: routeLabel, line: 0, severity, detail });

  // em dashes
  const em = (text.match(new RegExp(EM, 'g')) || []).length;
  if (em) add('static-em-dash', 'high', `${em} em dash(es) in visible text`);

  // brand names (word-boundary; "New York" guard for York)
  const brandsFound = [];
  for (const b of BRANDS) {
    const guard = b === 'York' ? '(?<![A-Za-z0-9])(?<!New )' : '(?<![A-Za-z0-9])';
    const re = new RegExp(guard + b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![A-Za-z0-9])', 'g');
    const n = (text.match(re) || []).length;
    if (n) brandsFound.push(`${b}(${n})`);
  }
  if (brandsFound.length) add('static-brand', 'medium', `brand mention(s): ${brandsFound.join(', ')}`);

  // brand + model code (e.g. "Carrier 24ACC6")
  const modelRe = new RegExp('\\b(' + BRANDS.filter((b) => !/&/.test(b)).map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\s+[A-Z0-9]{2,}[-A-Z0-9]*', 'g');
  const models = [...new Set([...text.matchAll(modelRe)]
    .filter((m) => !(m[1] === 'York' && text.slice(Math.max(0, m.index - 4), m.index) === 'New '))
    .map((m) => m[0]))];
  if (models.length) add('static-model-code', 'medium', `model code(s): ${models.join('; ')}`);

  // overclaims
  let over = [];
  for (const o of OVERCLAIMS) {
    if (o === 'best') {
      const n = (text.match(/\bbest\b(?!\s+(?:for|practice|practices|way|ways))/gi) || []).length;
      if (n) over.push(`best(${n})`);
    } else {
      const n = text.toLowerCase().split(o.toLowerCase()).length - 1;
      if (n) over.push(`${o}(${n})`);
    }
  }
  if (over.length) add('static-overclaim', 'medium', `overclaim(s): ${over.join(', ')}`);

  // old / new template tells
  const oldt = [];
  for (const p of OLD_TELLS) { const n = text.split(p).length - 1; if (n) oldt.push(`${p}(${n})`); }
  if (oldt.length) add('static-old-tell', 'medium', `old template tell(s): ${oldt.join(', ')}`);
  const newt = [];
  for (const p of NEW_TELLS) { const n = text.toLowerCase().split(p.toLowerCase()).length - 1; if (n) newt.push(`${p}(${n})`); }
  if (newt.length) add('static-new-tell', 'medium', `new template tell(s): ${newt.join(', ')}`);

  // phantom tax credit (present/future eligibility language, not marked expired)
  for (const s of text.split(/(?<=[.!?])\s+/)) {
    if (!/\b(25C|25D|tax credit|clean energy credit)\b/i.test(s)) continue;
    const expired = /expired|no longer|terminated|through 2025|ended|OBBBA|placed in service after/i.test(s);
    const future = /\b(qualify|qualifies|can claim|eligible|offset|get up to|covers up to|you can|applies to|receive)\b/i.test(s);
    if (future && !expired) add('static-phantom-credit', 'blocker', `tax-credit sentence reads as still claimable: "${s.slice(0, 160)}"`);
  }

  // off-rate kWh ($/kWh or cents/kWh), not canon 18 / 18.19 / 0.18 / 0.1819
  const kwhOk = (val, cents) => cents
    ? (Math.abs(val - 18) < 0.05 || Math.abs(val - 18.19) < 0.05)
    : (Math.abs(val - 0.18) < 1e-4 || Math.abs(val - 0.1819) < 1e-4);
  for (const [re, cents] of [[/\$\s?(\d[\d,]*(?:\.\d+)?)\s*(?:\/|per\s+)?\s*(?:kwh|kw h)\b/gi, false], [/(\d[\d,]*(?:\.\d+)?)\s*(?:¢|cents?)\s*(?:\/|per\s+)?\s*(?:kwh|kw h)\b/gi, true]]) {
    for (const m of text.matchAll(re)) {
      const val = parseFloat(m[1].replace(/,/g, ''));
      if (!kwhOk(val, cents)) add('static-off-rate', 'high', `off-canon kWh rate ${cents ? val + 'c' : '$' + val}: "...${text.slice(Math.max(0, m.index - 40), m.index + 40).trim()}..."`);
    }
  }
  // off-rate therm / gal, only when framed national/average/typical/US, off canon by >2%
  for (const m of text.matchAll(/\$\s?(\d[\d,]*(?:\.\d+)?)\s*(?:\/|per\s+)?\s*(therm|gal(?:lon)?s?)/gi)) {
    const val = parseFloat(m[1].replace(/,/g, ''));
    const unit = /therm/i.test(m[2]) ? 'therm' : 'gal';
    const context = text.slice(Math.max(0, m.index - 60), m.index + 60);
    const isNat = /(national|average|avg|typical)/i.test(context) || /\bU\.?S\.?\b/.test(context);
    if (isNat && Math.abs(val - CANON[unit]) / CANON[unit] > 0.02) add('static-off-rate', 'high', `off-canon ${unit} rate $${val} (canon ${CANON[unit]}): "...${context.trim()}..."`);
  }

  // stale EIA figures
  const staleHits = [];
  for (const pat of [/\b886\b/g, /\b10,632\b/g, /\b29\.1\b/g]) { const n = (text.match(pat) || []).length; if (n) staleHits.push(`${pat.source}(${n})`); }
  if (/average home uses[^.]*?kWh/i.test(text)) staleHits.push('average-home-uses-kWh');
  if (staleHits.length) add('static-stale-eia', 'high', `stale EIA figure(s): ${staleHits.join(', ')}`);

  // long paragraphs (>3 sentences)
  let longCount = 0;
  for (const p of paras) { if (countSentences(p) > 3) { longCount++; if (longCount <= 3) add('static-long-paragraph', 'low', `paragraph with ${countSentences(p)} sentences: "${p.slice(0, 90)}..."`); } }
  if (longCount > 3) add('static-long-paragraph', 'low', `...and ${longCount - 3} more paragraphs over 3 sentences on this route`);

  // broken internal links (first path segment not a valid slug/route)
  const broken = [];
  for (const href of links) {
    const path = href.split(/[#?]/)[0].replace(/\/+$/, '');
    if (!path || path === '') continue; // link to "/" homepage
    const base = path.replace(/^\//, '').split('/')[0];
    if (base && !validSlugs.has(base)) broken.push(href);
  }
  if (broken.length) add('static-broken-link', 'high', `internal link(s) to unknown route: ${[...new Set(broken)].join(', ')}`);

  // social proof / invented stats (fabricated engagement, ratings, inflated counts)
  for (const h of scanSocialProof(text)) add(`social-proof:${h.cls.replace('social-proof-', '')}`, 'high', `social proof / invented stat: "${h.match}"`);

  return { findings, text, paragraphs: paras, links };
}

// ── Public entry point for the deploy gate ───────────────────────────────────
/**
 * @param {{skipBuild?: boolean, dumpDir?: string}} [opts]
 * @returns {{findings: object[], skipped: boolean, routesChecked: number}}
 */
export function checkStaticRoutes(opts = {}) {
  const { skipBuild = false, dumpDir = null } = opts;
  if (skipBuild) {
    // No built HTML to read, so add NO findings (keeps --skip-build runs clean);
    // the caller prints `note` so the skip is visible.
    return {
      skipped: true,
      routesChecked: 0,
      findings: [],
      note: 'static-route checks skipped (--skip-build): they need built HTML at .next/server/app/*.html',
    };
  }
  const validSlugs = buildValidSlugs();
  const findings = [];
  let routesChecked = 0;
  if (dumpDir) mkdirSync(dumpDir, { recursive: true });

  for (const route of STATIC_ROUTES) {
    const file = join(BUILT_DIR, `${route === '' ? 'index' : route}.html`);
    if (!existsSync(file)) {
      findings.push({ check: 'static-html-missing', file: `/${route}`, line: 0, severity: 'high', detail: `built HTML not found: ${relative(REPO_ROOT, file)} (run next build)` });
      continue;
    }
    routesChecked++;
    const html = readFileSync(file, 'utf8');
    const { findings: rf, text, paragraphs, links } = checkRoute(route, html, validSlugs);
    findings.push(...rf);
    if (dumpDir) {
      writeFileSync(join(dumpDir, `${route === '' ? 'index' : route}.txt`),
        `ROUTE: ${route === '' ? '/ (homepage)' : '/' + route}\nWORDS: ${text.split(/\s+/).filter(Boolean).length}\nINTERNAL LINKS: ${[...new Set(links)].join(' ')}\n\n--- VISIBLE TEXT (from <main>) ---\n${text}\n`);
    }
  }
  return { findings, skipped: false, routesChecked };
}

// ── CLI ───────────────────────────────────────────────────────────────────────
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const args = process.argv.slice(2);
  const skipBuild = args.includes('--skip-build');
  const dumpIdx = args.indexOf('--dump');
  const dumpDir = dumpIdx >= 0 ? args[dumpIdx + 1] : null;
  const { findings, skipped, routesChecked } = checkStaticRoutes({ skipBuild, dumpDir });
  const counts = {};
  for (const f of findings) counts[f.check] = (counts[f.check] || 0) + 1;
  console.log(`static-routes: ${skipped ? 'SKIPPED (--skip-build)' : routesChecked + ' routes checked'} · ${findings.length} findings`);
  for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(3)} × ${k}`);
  console.log('');
  for (const f of findings) console.log(`  [${f.severity}] ${f.check} — ${f.file}: ${f.detail.slice(0, 200)}`);
}
