#!/usr/bin/env node
/**
 * scripts/svg-lint.mjs — SVG diagram linter + <Diagram> page checks.
 *
 * A faithful Node port of the Python prototype scripts/svg-lint-reference.py
 * (kept alongside for differential re-verification). Same rules, same
 * tolerances, same text/geometry math, so the CLI prints a byte-identical
 * result:
 *
 *   node scripts/svg-lint.mjs how-ac-moves-heat.svg
 *   # how-ac-moves-heat.svg: OK (27 texts, 6 solids, 4 lines, 13314 bytes)
 *
 * Per-SVG rules (ported exactly):
 *   - <title>, <desc>, role="img" and a viewBox are present
 *   - no <script>, <foreignObject> or external href="http..." content
 *   - if the file animates anything, a prefers-reduced-motion media query
 *     disables it
 *   - no text-anchor on <text> (labels are start-anchored; centered/end-anchored
 *     text mis-measures and is rejected outright)
 *   - text boxes do not overlap each other, rect.solid shapes, or straight
 *     stroked lines with stroke-width >= 2
 *   - no straight stroked line crosses a rect.solid (3 px tolerance)
 *   - nothing is off-canvas (every text box fits inside the viewBox)
 * Added on top of the Python reference (the reference only reports the byte
 * count; here it is an enforced rule):
 *   - file is under 60 KB
 *
 * Page checks (used by the audit deploy gate, not the single-file CLI):
 *   - every <Diagram src> resolves to a file under public/
 *   - alt text is >= 80 characters
 *   - a caption is present
 *   - width/height equal the referenced SVG's viewBox
 *
 * Wired into scripts/audit.mjs via checkSvgLint(files).
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

// Max file size. The Python reference only reports the byte count; the deploy
// gate enforces it. 60 KB = 60 * 1024 bytes.
const MAX_SVG_BYTES = 60 * 1024;

// Diagram alt-text minimum (characters). Matches the Diagram component contract.
const MIN_ALT_CHARS = 80;

// Font sizes by <text> class — must mirror the <style> block in the diagrams and
// the `fs` dict in svg-lint-reference.py exactly (drives text-box width math).
const FONT_SIZE = { lbl: 13, zone: 11, head: 19, key: 13, chk: 14, cap: 12, num: 13, big: 16 };

// Axis-aligned box overlap with optional padding `p`. Boxes are [label, x0, y0, x1, y1].
// Direct port of the Python lambda `ov`.
const overlaps = (a, b, p = 0) =>
  a[1] + p < b[3] && b[1] + p < a[3] && a[2] + p < b[4] && b[2] + p < a[4];

/**
 * Core lint. Returns the list of problems for one SVG file (empty = clean).
 * Mirrors svg-lint-reference.py `lint()` but returns problems only (the OK
 * summary line is built by the caller, exactly like the Python `bad or [OK]`).
 */
function lintSvg(path) {
  const s = readFileSync(path, 'utf8');

  const vb = s.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  if (!vb) return { problems: [`${path}: missing or malformed viewBox`], T: 0, S: 0, L: 0, bytes: Buffer.byteLength(s, 'utf8') };
  const W = parseFloat(vb[1]);
  const H = parseFloat(vb[2]);

  // ── Text boxes ──────────────────────────────────────────────────────────
  // (label, x0, y0, x1, y1); width estimated from char count × font size ×
  // a per-class advance factor (0.62 for head/zone, 0.56 otherwise).
  const T = [];
  for (const m of s.matchAll(/<text([^>]*)>([\s\S]*?)<\/text>/g)) {
    const a = m[1];
    const txt = m[2].replace(/<[^>]+>/g, '').trim();
    if (a.includes('text-anchor')) {
      // Fail-fast, exactly like the Python reference (aborts the whole file).
      return { problems: [`${path}: anchored text not allowed (render quirk): ${txt}`], T: T.length, S: 0, L: 0, bytes: Buffer.byteLength(s, 'utf8') };
    }
    const x = parseFloat(a.match(/\bx="([\d.]+)"/)[1]);
    const y = parseFloat(a.match(/\by="([\d.]+)"/)[1]);
    const c = a.match(/class="(\w+)"/)[1];
    const f = FONT_SIZE[c] ?? 13;
    const w = txt.length * f * (c === 'head' || c === 'zone' ? 0.62 : 0.56);
    T.push([txt.slice(0, 24), x, y - f * 0.8, x + w, y + f * 0.25]);
  }

  // ── Solid rects ─────────────────────────────────────────────────────────
  const S = [];
  for (const m of s.matchAll(/<rect class="solid" x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)) {
    const x = parseFloat(m[1]);
    const y = parseFloat(m[2]);
    S.push([m[0].slice(0, 30), x, y, x + parseFloat(m[3]), y + parseFloat(m[4])]);
  }

  // ── Straight stroked lines (M x y H x | M x y V y) with stroke-width >= 2 ──
  const L = [];
  for (const m of s.matchAll(/<path[^>]*d="M([\d.]+) ([\d.]+) ([HV])([\d.]+)"[^>]*stroke-width="([\d.]+)"/g)) {
    const x = parseFloat(m[1]);
    const y = parseFloat(m[2]);
    const k = m[3];
    const v = parseFloat(m[4]);
    const sw = parseFloat(m[5]);
    if (sw < 2) continue;
    if (k === 'H') L.push(['line', Math.min(x, v), y - sw / 2, Math.max(x, v), y + sw / 2]);
    else L.push(['line', x - sw / 2, Math.min(y, v), x + sw / 2, Math.max(y, v)]);
  }

  // ── Collision + bounds checks ─────────────────────────────────────────────
  const bad = [];
  for (let i = 0; i < T.length; i++) {
    const t = T[i];
    for (let j = i + 1; j < T.length; j++) {
      if (overlaps(t, T[j])) bad.push(`text/text: ${t[0]} | ${T[j][0]}`);
    }
    for (const o of [...S, ...L]) {
      if (overlaps(t, o)) bad.push(`text/${o[0].slice(0, 5)}: ${t[0]}`);
    }
    if (t[1] < 0 || t[3] > W || t[2] < 0 || t[4] > H) bad.push(`off-canvas: ${t[0]}`);
  }
  for (const o of S) {
    for (const l of L) {
      if (overlaps(o, l, 3)) bad.push(`line crosses shape: ${o[0]}`);
    }
  }

  // ── Required markup + forbidden content ───────────────────────────────────
  for (const need of ['<title', '<desc', 'role="img"', 'viewBox', 'prefers-reduced-motion']) {
    if (!s.includes(need) && !(need === 'prefers-reduced-motion' && !s.includes('animation'))) {
      bad.push(`missing ${need}`);
    }
  }
  if (/<script|foreignObject|href="http/.test(s)) bad.push('external/script content');

  // ── Size cap (added on top of the Python reference) ───────────────────────
  const bytes = Buffer.byteLength(s, 'utf8');
  if (bytes > MAX_SVG_BYTES) bad.push(`over 60 KB (${bytes} bytes)`);

  return { problems: bad, T: T.length, S: S.length, L: L.length, bytes };
}

/** Lines to print for one file, matching the Python `print("\n".join(lint(p)))`. */
export function lintSvgLines(path) {
  const { problems, T, S, L, bytes } = lintSvg(path);
  return problems.length ? problems : [`${path}: OK (${T} texts, ${S} solids, ${L} lines, ${bytes} bytes)`];
}

// ─── <Diagram> attribute parsing (page checks) ──────────────────────────────

/** Pull a string/number attribute value out of a single <Diagram .../> tag. */
function attr(tag, name) {
  // name="..." or name='...'
  const str = tag.match(new RegExp(`\\s${name}=(["'])([\\s\\S]*?)\\1`));
  if (str) return str[2];
  // name={123} or name="123"-style numeric wrapped in braces
  const brace = tag.match(new RegExp(`\\s${name}=\\{\\s*([\\d.]+)\\s*\\}`));
  if (brace) return brace[1];
  return undefined;
}

/** All <Diagram .../> tags in a body, code-masked so examples are skipped. */
function findDiagramTags(body) {
  // Blank out fenced + inline code but keep newlines, so both byte offsets AND
  // line counts stay correct (replacing newlines with spaces would under-count
  // the line of any <Diagram> that follows a multi-line code block).
  const blank = (m) => m.replace(/[^\n]/g, ' ');
  const masked = body
    .replace(/```[\s\S]*?```/g, blank)
    .replace(/`[^`]*`/g, blank);
  const tags = [];
  for (const m of masked.matchAll(/<Diagram\b[\s\S]*?\/>/g)) {
    tags.push({ tag: m[0], line: masked.slice(0, m.index).split('\n').length });
  }
  return tags;
}

// ─── Filesystem helpers ─────────────────────────────────────────────────────

function listSvgs(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...listSvgs(p));
    else if (entry.endsWith('.svg')) out.push(p);
  }
  return out;
}

function listMDX(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('_')) continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...listMDX(p));
    else if (entry.endsWith('.mdx')) out.push(p);
  }
  return out;
}

// ─── Audit integration ──────────────────────────────────────────────────────

/**
 * Deploy-gate check: lint every SVG under public/diagrams/ and validate every
 * <Diagram> usage in the content corpus. Returns findings in the shape
 * scripts/audit.mjs expects ({ check, file, line, severity, detail }).
 *
 * @param {string[]} [files] MDX files to scan for <Diagram> (defaults to a
 *   fresh walk of content/, so the function also works standalone).
 */
export function checkSvgLint(files) {
  const repoRoot = process.cwd();
  const publicDir = join(repoRoot, 'public');
  const diagramsDir = join(publicDir, 'diagrams');
  const mdxFiles = files ?? listMDX(join(repoRoot, 'content'));
  const findings = [];

  // 1. Lint every committed diagram SVG.
  for (const svg of listSvgs(diagramsDir)) {
    let problems;
    try {
      problems = lintSvg(svg).problems;
    } catch (e) {
      problems = [`${svg}: lint crashed (${e.message})`];
    }
    for (const p of problems) {
      findings.push({
        check: 'svg-lint',
        file: relative(repoRoot, svg),
        line: 0,
        severity: 'blocker',
        detail: p.replace(`${svg}: `, ''),
      });
    }
  }

  // 2. Validate every <Diagram> usage on a page.
  for (const f of mdxFiles) {
    const body = readFileSync(f, 'utf8');
    const rel = relative(repoRoot, f);
    for (const { tag, line } of findDiagramTags(body)) {
      const src = attr(tag, 'src');
      const alt = attr(tag, 'alt');
      const caption = attr(tag, 'caption');
      const width = attr(tag, 'width');
      const height = attr(tag, 'height');

      if (!src) {
        findings.push({ check: 'diagram-src', file: rel, line, severity: 'blocker', detail: '<Diagram> has no src' });
        continue;
      }

      // src exists under public/
      const svgPath = join(publicDir, src.replace(/^\//, ''));
      if (!existsSync(svgPath)) {
        findings.push({ check: 'diagram-src-missing', file: rel, line, severity: 'blocker', detail: `src not found under public/: ${src}` });
      }

      // alt >= 80 chars
      if (!alt || alt.length < MIN_ALT_CHARS) {
        findings.push({ check: 'diagram-alt', file: rel, line, severity: 'high', detail: `alt is ${alt ? alt.length : 0} chars (need >= ${MIN_ALT_CHARS}): ${src}` });
      }

      // caption present
      if (!caption || !caption.trim()) {
        findings.push({ check: 'diagram-caption', file: rel, line, severity: 'high', detail: `missing caption: ${src}` });
      }

      // width/height equal the SVG viewBox
      if (existsSync(svgPath)) {
        const vb = readFileSync(svgPath, 'utf8').match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
        if (!vb) {
          findings.push({ check: 'diagram-viewbox', file: rel, line, severity: 'high', detail: `referenced SVG has no viewBox: ${src}` });
        } else {
          // Diagram's width default is 800 (per the component); height is required.
          const wProp = width === undefined ? 800 : parseFloat(width);
          const hProp = height === undefined ? NaN : parseFloat(height);
          if (wProp !== parseFloat(vb[1]) || hProp !== parseFloat(vb[2])) {
            findings.push({
              check: 'diagram-dimensions',
              file: rel,
              line,
              severity: 'high',
              detail: `width/height ${width ?? '(default 800)'}×${height ?? '(missing)'} != viewBox ${vb[1]}×${vb[2]}: ${src}`,
            });
          }
        }
      }
    }
  }

  return findings;
}

// ─── CLI ────────────────────────────────────────────────────────────────────

// `node scripts/svg-lint.mjs file.svg [file2.svg ...]` — same output as the
// Python reference. With no args, lints every SVG under public/diagrams/.
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const args = process.argv.slice(2);
  const targets = args.length ? args : listSvgs(join(process.cwd(), 'public', 'diagrams'));
  for (const p of targets) console.log(lintSvgLines(p).join('\n'));
}
