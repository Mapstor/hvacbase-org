#!/usr/bin/env node
/**
 * scripts/audit.mjs — deterministic pre-deploy audit for hvacbase.org
 *
 * Same input → same output. Replaces the LLM-judgment audit as the deploy gate.
 * Exit 0 = corpus clean, safe to deploy. Exit 1 = defects found, fix first.
 *
 * Usage:
 *   node scripts/audit.mjs              # full run (includes build)
 *   node scripts/audit.mjs --skip-build # skip check 6, quick iterate
 *   node scripts/audit.mjs --json       # emit JSON to stdout, no summary
 *
 * Checks (all deterministic — same corpus always → same result):
 *   1. Echoed Key Takeaways    (Jaccard >= 0.55 vs description, on ANY KT bullet)
 *   2. Placeholder markers     (regex over exact strings)
 *   3. Empty components        (FAQ items={[]}, empty SourcesBox, "?" cells, etc.)
 *   4. Duplicate structure     (>1 RelatedArticles / SourcesBox / "## Key Takeaways" per file)
 *   5. Wrong year in title     (2023/2024/2025 label on a 2026-published page)
 *   6. Compile check           (npm run build must be exit 0, 0 MDX errors)
 *   7. Missing imports         (component used but not imported and not globally provided)
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';
import matter from 'gray-matter';

// ────────────────────────────────────────────────────────────────
// CONFIG
// ────────────────────────────────────────────────────────────────

const REPO_ROOT = process.cwd();
const CONTENT_DIR = join(REPO_ROOT, 'content');
// Echo threshold on the OVERLAP COEFFICIENT (intersection / min-set-size), not Jaccard.
// Overlap coefficient is the right metric for "does the takeaway echo the description":
// it captures the case where the bullet is entirely contained in the description
// regardless of description length. Jaccard (symmetric) systematically under-flags
// short bullets against long descriptions.
const ECHO_THRESHOLD = 0.55;

// Components provided globally via lib/mdx-components.tsx (no explicit import needed).
// If this list changes, update it here.
const GLOBAL_COMPONENTS = new Set([
  'TableOfContents', 'FAQ', 'ComparisonTable', 'Callout', 'SourcesBox', 'RelatedArticles',
  'CalcWrapper', 'SEERCalculator', 'DataChart', 'EfficiencyCurve', 'ComparisonChart',
  'ScaleDiagram', 'RefrigerationCycle', 'CarbonMonoxideDetectorPlacement',
  'DryModeVsCoolMode', 'BatteryRuntimeByLoad',
]);

// Common English stopwords + boilerplate — filtered from Jaccard word sets.
const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'nor', 'for', 'yet', 'so',
  'of', 'to', 'in', 'on', 'at', 'by', 'with', 'from', 'into', 'onto', 'up', 'down', 'out', 'about', 'over', 'under',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am',
  'have', 'has', 'had', 'having',
  'do', 'does', 'did', 'doing', 'done',
  'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must',
  'not', 'no', 'yes',
  'this', 'that', 'these', 'those', 'it', 'its',
  'they', 'them', 'their', 'you', 'your', 'we', 'our', 'us', 'i', 'me', 'my', 'he', 'him', 'his', 'she', 'her',
  'as', 'if', 'when', 'where', 'how', 'what', 'which', 'who', 'whom', 'whose', 'why',
  'than', 'then', 'just', 'only', 'also', 'even', 'still', 'yet',
  'very', 'much', 'more', 'most', 'less', 'least',
  'each', 'every', 'any', 'all', 'some', 'few', 'other', 'another', 'such', 'same',
  'one', 'two', 'three', 'first', 'second', 'third',
  's', 't', 'll', 've', 're', 'd', 'm',
  'here', 'there', 'now', 'today', 'learn',
]);

// ────────────────────────────────────────────────────────────────
// UTIL
// ────────────────────────────────────────────────────────────────

function listMDX(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const st = statSync(path);
    if (st.isDirectory()) results.push(...listMDX(path));
    else if (entry.endsWith('.mdx')) results.push(path);
  }
  return results;
}

function tokens(text) {
  if (!text) return [];
  // Lowercase, strip markdown formatting + link syntax, then split.
  let t = text
    .toLowerCase()
    .replace(/```[\s\S]*?```/g, ' ')       // code fences
    .replace(/`[^`]*`/g, ' ')              // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links → keep label
    .replace(/\*\*([^*]+)\*\*/g, '$1')     // **bold**
    .replace(/__([^_]+)__/g, '$1')         // __bold__
    .replace(/\*([^*]+)\*/g, '$1')         // *italic*
    .replace(/_([^_]+)_/g, '$1')           // _italic_
    .replace(/&[a-z]+;/g, ' ')             // HTML entities
    .replace(/&#?[0-9]+;/g, ' ');          // numeric entities
  // Split on non-alphanumeric-and-hyphen. Keep hyphens (e.g., "heat-exchanger" as one token).
  const parts = t.split(/[^a-z0-9\-]+/).filter(Boolean);
  // Filter stopwords and length-1.
  return parts.filter(p => p.length >= 2 && !STOPWORDS.has(p));
}

function jaccard(setA, setB) {
  if (setA.size === 0 && setB.size === 0) return 0;
  let intersect = 0;
  for (const x of setA) if (setB.has(x)) intersect++;
  const union = setA.size + setB.size - intersect;
  return union === 0 ? 0 : intersect / union;
}

// Overlap coefficient: |A ∩ B| / min(|A|, |B|). Captures containment, not similarity.
// Used for echo detection because a 10-token takeaway sharing 8 tokens with a 50-token
// description IS an echo (80% of the takeaway is in the description), even though its
// Jaccard is only 8 / (50 + 10 - 8) = 0.15.
function overlapCoeff(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersect = 0;
  for (const x of setA) if (setB.has(x)) intersect++;
  return intersect / Math.min(setA.size, setB.size);
}

function extractKTBullets(body) {
  // Find takeaway section (either <Callout type="takeaway"> OR ## Key Takeaways H2).
  // Return array of { text, line } for each `- ` bullet inside.
  const lines = body.split('\n');
  const bullets = [];
  let inSection = false;
  let sectionStartLine = 0;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    // Enter section on either marker
    if (/<Callout[^>]+type=["']takeaway["']/i.test(l) || /^##\s+Key\s+Takeaways/i.test(l)) {
      inSection = true;
      sectionStartLine = i + 1;
      continue;
    }
    // Exit on closing Callout, next ## heading, or FAQ/Sources/Related block
    if (inSection) {
      if (/^<\/Callout>/i.test(l) || /^##\s+(?!Key\s+Takeaways)/i.test(l)
          || /^<(FAQ|SourcesBox|RelatedArticles)\b/i.test(l)) {
        inSection = false;
        continue;
      }
      // Bullet detection: `- ` at start of line (allow trailing bullet on same line)
      const m = l.match(/^\s*-\s+(.+)$/);
      if (m) bullets.push({ text: m[1].trim(), line: i + 1 });
    }
  }

  return bullets;
}

function extractUsedComponents(body) {
  // Find all <ComponentName tags (uppercase-starting). Return Set.
  const used = new Set();
  const re = /<([A-Z][A-Za-z0-9]*)\b/g;
  let m;
  while ((m = re.exec(body)) !== null) used.add(m[1]);
  return used;
}

function extractImportedComponents(source) {
  // Find components imported from '@/components' (any form).
  const imported = new Set();
  // Named imports: import { A, B, C } from '@/components' (or subpath)
  const namedRe = /import\s*\{([^}]+)\}\s*from\s*['"]@\/components/g;
  let m;
  while ((m = namedRe.exec(source)) !== null) {
    for (const name of m[1].split(',')) {
      const n = name.trim().split(/\s+as\s+/i)[0].trim();
      if (/^[A-Z][A-Za-z0-9]*$/.test(n)) imported.add(n);
    }
  }
  // Default imports: import ComponentName from '@/components/...'
  const defaultRe = /import\s+([A-Z][A-Za-z0-9]*)\s+from\s*['"]@\/components/g;
  while ((m = defaultRe.exec(source)) !== null) imported.add(m[1]);
  return imported;
}

// ────────────────────────────────────────────────────────────────
// CHECKS
// ────────────────────────────────────────────────────────────────

/** Check 1: Echoed Key Takeaways (Jaccard vs description, all bullets). */
function checkEchoedKTs(files) {
  const findings = [];
  for (const f of files) {
    const raw = readFileSync(f, 'utf8');
    const { data, content } = matter(raw);
    const desc = data.description || '';
    if (!desc) continue;
    const descSet = new Set(tokens(desc));
    if (descSet.size < 3) continue; // description too short to meaningfully compare

    const bullets = extractKTBullets(content);
    for (let i = 0; i < bullets.length; i++) {
      const b = bullets[i];
      const bulletSet = new Set(tokens(b.text));
      if (bulletSet.size < 3) continue;
      const overlap = overlapCoeff(descSet, bulletSet);
      if (overlap >= ECHO_THRESHOLD) {
        findings.push({
          check: 'echoed-kt',
          file: relative(REPO_ROOT, f),
          line: b.line,
          severity: 'high',
          detail: `KT bullet #${i + 1} overlap=${overlap.toFixed(2)} vs description (${bulletSet.size} bullet tokens, ${descSet.size} desc tokens) | bullet: "${b.text.slice(0, 100)}"`,
          overlap: Number(overlap.toFixed(3)),
        });
      }
    }
  }
  return findings;
}

/** Check 2: Placeholder markers. */
function checkPlaceholders(files) {
  const findings = [];
  // Each pattern: [regex, severity, class]
  const patterns = [
    [/\bPENDING-AHRI\b/, 'blocker', 'placeholder-pending-ahri'],
    [/pending-ahri\.md/, 'blocker', 'placeholder-internal-file-reference'],
    [/Pending Verification/i, 'blocker', 'placeholder-pending-verification'],
    [/\bPENDING\b(?!\s+(?:the|a|an))/, 'high', 'placeholder-pending'],
    [/\b(TODO|TKTK|TK\/TK|XXX|FIXME|PLACEHOLDER)\b/, 'blocker', 'placeholder-code-marker'], // case-sensitive: ALL-CAPS only
    [/less than lt;/i, 'blocker', 'render-artifact-double-escape'],
    [/\[object Object\]/, 'blocker', 'render-artifact-object'],
    [/\{\{[a-zA-Z_]+\}\}/, 'blocker', 'unresolved-template-variable'],
    [/\[(TBD|TODO|placeholder|insert|bracket)\]/i, 'high', 'unfilled-bracket'],
    // Bare "?" as a data cell inside a JSX array (not a legit sentence-ending question)
    [/"\?"/, 'blocker', 'placeholder-question-mark-cell'],
    [/"[A-Z][A-Za-z0-9]*\/\?"/, 'blocker', 'placeholder-model-with-qmark'],
    // "coming soon" only if it's the ENTIRE content of a bullet or the leading label of a callout
    // (avoids prose false-positives like "gas line available or coming soon").
    [/^\s*-\s+\*\*[^*]+\*\*\s*[—-]\s*coming soon\b/im, 'high', 'placeholder-coming-soon-bullet'],
  ];
  for (const f of files) {
    const raw = readFileSync(f, 'utf8');
    const lines = raw.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      for (const [re, sev, cls] of patterns) {
        if (re.test(l)) {
          findings.push({
            check: cls,
            file: relative(REPO_ROOT, f),
            line: i + 1,
            severity: sev,
            detail: l.trim().slice(0, 160),
          });
        }
      }
    }
  }
  return findings;
}

/** Check 3: Empty components. */
function checkEmptyComponents(files) {
  const findings = [];
  const patterns = [
    { re: /<FAQ\s+items\s*=\s*\{\s*\[\s*\]\s*\}\s*\/>/s, sev: 'high', cls: 'empty-faq-items' },
    { re: /<FAQ\s+items\s*=\s*\{\s*\[\s*\]\s*\}\s*>/s, sev: 'high', cls: 'empty-faq-items' },
    { re: /<FAQ\s+questions\s*=\s*\{\s*\[\s*\]\s*\}\s*\/>/s, sev: 'high', cls: 'empty-faq-questions' },
    { re: /<SourcesBox\s+sources\s*=\s*\{\s*\[\s*\]\s*\}\s*\/>/s, sev: 'high', cls: 'empty-sources' },
    { re: /<RelatedArticles\s+articles\s*=\s*\{\s*\[\s*\]\s*\}\s*\/>/s, sev: 'high', cls: 'empty-related' },
    { re: /rows\s*=\s*\{\s*\[\s*\]\s*\}/s, sev: 'high', cls: 'empty-rows' },
    { re: /<Callout[^>]*>\s*<\/Callout>/s, sev: 'medium', cls: 'empty-callout' },
  ];
  for (const f of files) {
    const raw = readFileSync(f, 'utf8');
    // Multi-line patterns: run against full text; report line of first char.
    for (const { re, sev, cls } of patterns) {
      const flags = re.flags.includes('g') ? re.flags : re.flags + 'g';
      const globalRe = new RegExp(re.source, flags);
      let m;
      while ((m = globalRe.exec(raw)) !== null) {
        const line = raw.slice(0, m.index).split('\n').length;
        findings.push({
          check: cls,
          file: relative(REPO_ROOT, f),
          line,
          severity: sev,
          detail: m[0].replace(/\n/g, ' ').slice(0, 120),
        });
      }
    }
  }
  return findings;
}

/** Check 4: Duplicate structure. */
function checkDuplicates(files) {
  const findings = [];
  for (const f of files) {
    const raw = readFileSync(f, 'utf8');
    // Use lookahead to exclude compound components like <FAQ.Item> from the top-level count.
    const ra = (raw.match(/<RelatedArticles(?=[\s/>])/g) || []).length;
    const sb = (raw.match(/<SourcesBox(?=[\s/>])/g) || []).length;
    const kt = (raw.match(/^##\s+Key\s+Takeaways/gm) || []).length;
    const faq = (raw.match(/<FAQ(?=[\s/>])/g) || []).length;
    if (ra > 1) findings.push({ check: 'duplicate-related-articles', file: relative(REPO_ROOT, f), line: 0, severity: 'blocker', detail: `${ra} <RelatedArticles> tags` });
    if (sb > 1) findings.push({ check: 'duplicate-sources-box', file: relative(REPO_ROOT, f), line: 0, severity: 'blocker', detail: `${sb} <SourcesBox> tags` });
    if (kt > 1) findings.push({ check: 'duplicate-key-takeaways', file: relative(REPO_ROOT, f), line: 0, severity: 'blocker', detail: `${kt} '## Key Takeaways' headings` });
    if (faq > 1) findings.push({ check: 'duplicate-faq', file: relative(REPO_ROOT, f), line: 0, severity: 'high', detail: `${faq} <FAQ> components` });
  }
  return findings;
}

/** Check 5: Wrong year in title / seoTitle / H1. */
function checkWrongYear(files) {
  const findings = [];
  for (const f of files) {
    const raw = readFileSync(f, 'utf8');
    const { data, content } = matter(raw);
    // Only check if the page is a 2026 (or later) page.
    const dp = String(data.datePublished || '');
    const dm = String(data.dateModified || '');
    const is2026Plus = /^202[6-9]/.test(dp) || /^20[3-9]/.test(dp) || /^202[6-9]/.test(dm) || /^20[3-9]/.test(dm);
    if (!is2026Plus) continue;

    const title = String(data.title || '');
    const seoTitle = String(data.seoTitle || '');
    // H1 line
    const h1Match = content.match(/^#\s+(.+)$/m);
    const h1 = h1Match ? h1Match[1] : '';

    // Flag 2023/2024/2025 appearing as a stale label. Allowlist legitimate historical references.
    const yearRe = /\b(202[345])\b/;
    // If title contains any of these markers, treat the year as a legitimate historical mention.
    const historicalMarkers = /\b(HISTORICAL|Expired|Effective|Signed|OBBBA|IRA|Since|Introduced|Prior|Before|Ended|Terminated|Repealed|Rule|Standard|Rating|Version|Introduced|Update|Ends|Ended)\b/i;
    for (const [source, name] of [[title, 'title'], [seoTitle, 'seoTitle'], [h1, 'H1']]) {
      if (!yearRe.test(source)) continue;
      if (historicalMarkers.test(source)) continue; // legit historical reference
      findings.push({
        check: 'wrong-year-in-title',
        file: relative(REPO_ROOT, f),
        line: 0,
        severity: 'high',
        detail: `${name}: "${source}" (page is 2026+; label contains ${source.match(yearRe)[1]})`,
      });
    }
  }
  return findings;
}

/** Check 6: Compile. */
function checkCompile() {
  const findings = [];
  const result = spawnSync('npm', ['run', 'build'], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  const out = (result.stdout || '') + '\n' + (result.stderr || '');
  const mdxErrors = (out.match(/error compiling MDX/g) || []).length;
  const prerenderErrors = (out.match(/Error occurred prerendering/g) || []).length;
  const exportErrors = (out.match(/Export encountered errors/g) || []).length;
  const pagesMatch = out.match(/Generating static pages \((\d+)\/(\d+)\)/g);
  const lastPagesMatch = pagesMatch ? pagesMatch[pagesMatch.length - 1] : null;
  const pageInfo = lastPagesMatch || 'unknown';

  if (result.status !== 0) {
    findings.push({ check: 'compile-nonzero-exit', file: '(build)', line: 0, severity: 'blocker', detail: `npm run build exited ${result.status}` });
  }
  if (mdxErrors > 0) {
    findings.push({ check: 'compile-mdx-errors', file: '(build)', line: 0, severity: 'blocker', detail: `${mdxErrors} 'error compiling MDX' occurrences in build log` });
  }
  if (prerenderErrors > 0) {
    findings.push({ check: 'compile-prerender-errors', file: '(build)', line: 0, severity: 'blocker', detail: `${prerenderErrors} 'Error occurred prerendering' occurrences` });
  }
  if (exportErrors > 0) {
    findings.push({ check: 'compile-export-errors', file: '(build)', line: 0, severity: 'blocker', detail: `${exportErrors} 'Export encountered errors' occurrences` });
  }
  return { findings, pageInfo, exitCode: result.status };
}

/** Check 7: Missing imports (component used but neither imported nor globally provided). */
function checkMissingImports(files) {
  const findings = [];
  for (const f of files) {
    const raw = readFileSync(f, 'utf8');
    const { content } = matter(raw);
    // Consider full source (frontmatter stripped) for both used-tags and import lines.
    const used = extractUsedComponents(content);
    const imported = extractImportedComponents(raw);
    for (const c of used) {
      if (GLOBAL_COMPONENTS.has(c)) continue;
      if (imported.has(c)) continue;
      // Common non-component tags to skip (all-caps HTML-like, but our set-A already filters lowercase).
      if (c === 'TableOfContents') continue; // safety net
      findings.push({
        check: 'missing-import',
        file: relative(REPO_ROOT, f),
        line: 0,
        severity: 'high',
        detail: `<${c}> used but not imported and not in global provider list`,
      });
    }
  }
  return findings;
}

// ────────────────────────────────────────────────────────────────
// MAIN
// ────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const skipBuild = args.includes('--skip-build');
  const jsonOnly = args.includes('--json');

  const files = listMDX(CONTENT_DIR);

  const findings = [];
  findings.push(...checkEchoedKTs(files));
  findings.push(...checkPlaceholders(files));
  findings.push(...checkEmptyComponents(files));
  findings.push(...checkDuplicates(files));
  findings.push(...checkWrongYear(files));
  findings.push(...checkMissingImports(files));
  let buildInfo = { pageInfo: '(skipped)', exitCode: null };
  if (!skipBuild) {
    const b = checkCompile();
    findings.push(...b.findings);
    buildInfo = { pageInfo: b.pageInfo, exitCode: b.exitCode };
  }

  // Group + count
  const counts = { blocker: 0, high: 0, medium: 0, low: 0 };
  const byCheck = {};
  for (const f of findings) {
    counts[f.severity] = (counts[f.severity] || 0) + 1;
    byCheck[f.check] = (byCheck[f.check] || 0) + 1;
  }

  const summary = {
    corpus_size: files.length,
    build: buildInfo,
    total_findings: findings.length,
    counts_by_severity: counts,
    counts_by_check: byCheck,
    findings: findings.sort((a, b) => {
      const rank = { blocker: 0, high: 1, medium: 2, low: 3 };
      return (rank[a.severity] - rank[b.severity]) || a.file.localeCompare(b.file) || a.line - b.line;
    }),
  };

  if (jsonOnly) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    console.log(`\n═══ DETERMINISTIC AUDIT — ${new Date().toISOString().split('T')[0]} ═══`);
    console.log(`Corpus:               ${files.length} MDX files`);
    console.log(`Build:                ${buildInfo.pageInfo} · exit ${buildInfo.exitCode ?? '(skipped)'}`);
    console.log(`Total findings:       ${findings.length}`);
    console.log(`  blocker: ${counts.blocker}   high: ${counts.high}   medium: ${counts.medium}   low: ${counts.low}`);
    console.log(`By check:`);
    for (const [k, v] of Object.entries(byCheck).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${v.toString().padStart(4)} × ${k}`);
    }
    console.log('');
    if (findings.length === 0) {
      console.log('✅ CLEAN — corpus is deploy-ready.');
    } else {
      console.log('Findings (sorted by severity, file, line):');
      for (const f of findings) {
        console.log(`  [${f.severity}] ${f.check} — ${f.file}:${f.line}`);
        console.log(`             ${f.detail.slice(0, 180)}`);
      }
      console.log('');
      console.log('Deploy gate: FAILED. Fix findings first.');
    }
  }

  // Deploy-gate exit code: 0 if all clean, 1 if any blocker or high.
  const gateFail = counts.blocker > 0 || counts.high > 0;
  process.exit(gateFail ? 1 : 0);
}

main();
