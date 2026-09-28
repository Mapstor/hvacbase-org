#!/usr/bin/env node
/**
 * scripts/eia-rates.mjs — parse EIA residential electricity prices by state.
 *
 * Reads the two EIA Electric Power Monthly tables shipped in data/eia/:
 *   table_5_06_a.xlsx  — Table 5.6.A, prices for the latest month
 *   table_5_06_b.xlsx  — Table 5.6.B, prices year-to-date
 * and writes data/eia/residential-rates.json with the RESIDENTIAL price
 * (cents per kilowatthour, as EIA reports them) for every state, DC and the
 * U.S. total, for both the latest month and year-to-date, plus metadata.
 *
 * No external dependencies: an .xlsx is a ZIP of XML, and this file contains a
 * minimal ZIP reader + XML parsers so `node scripts/eia-rates.mjs` runs on a
 * bare checkout.
 *
 * Fails loudly (throws, non-zero exit) if the residential column or the
 * U.S. total row can't be found, or if any state/DC row is missing.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';
import path from 'node:path';

const ROOT = process.cwd();
const FILE_MONTH = path.join(ROOT, 'data/eia/table_5_06_a.xlsx');
const FILE_YTD = path.join(ROOT, 'data/eia/table_5_06_b.xlsx');
const OUT_JSON = path.join(ROOT, 'data/eia/residential-rates.json');

// The 50 states + DC we require in every sheet. "U.S. Total" is handled separately.
const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
  'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];
const DC = 'District of Columbia';
const US_TOTAL = 'U.S. Total';

// ────────────────────────────── minimal ZIP reader ──────────────────────────
// Reads the central directory of a ZIP buffer and returns Map<name, Buffer>.
function unzip(buf) {
  const files = new Map();
  const EOCD_SIG = 0x06054b50, CD_SIG = 0x02014b50, LFH_SIG = 0x04034b50;
  let eo = -1;
  for (let i = buf.length - 22; i >= 0; i--) {
    if (buf.readUInt32LE(i) === EOCD_SIG) { eo = i; break; }
  }
  if (eo < 0) throw new Error('Not a valid .xlsx/.zip: end-of-central-directory record not found');
  const count = buf.readUInt16LE(eo + 10);
  let p = buf.readUInt32LE(eo + 16);
  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(p) !== CD_SIG) throw new Error(`Corrupt ZIP: bad central-directory header at offset ${p}`);
    const method = buf.readUInt16LE(p + 10);
    const compSize = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const localOff = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nameLen);
    if (buf.readUInt32LE(localOff) !== LFH_SIG) throw new Error(`Corrupt ZIP: bad local header for ${name}`);
    const lNameLen = buf.readUInt16LE(localOff + 26);
    const lExtraLen = buf.readUInt16LE(localOff + 28);
    const dataStart = localOff + 30 + lNameLen + lExtraLen;
    const comp = buf.subarray(dataStart, dataStart + compSize);
    let content;
    if (method === 0) content = Buffer.from(comp);
    else if (method === 8) content = inflateRawSync(comp);
    else throw new Error(`Unsupported ZIP compression method ${method} for ${name}`);
    files.set(name, content);
    p += 46 + nameLen + extraLen + commentLen;
  }
  return files;
}

// ────────────────────────────── XML helpers ─────────────────────────────────
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

// sharedStrings: one entry per <si>; concatenate all <t> runs inside it.
function parseSharedStrings(xml) {
  const out = [];
  const siRe = /<si>([\s\S]*?)<\/si>/g;
  let m;
  while ((m = siRe.exec(xml)) !== null) {
    let text = '';
    const tRe = /<t\b[^>]*>([\s\S]*?)<\/t>|<t\b[^>]*\/>/g;
    let tm;
    while ((tm = tRe.exec(m[1])) !== null) text += tm[1] != null ? tm[1] : '';
    out.push(decodeEntities(text));
  }
  return out;
}

function colToNum(col) {
  let n = 0;
  for (const ch of col) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n;
}

// worksheet → { cells: Map<"col,row", value>, maxRow }
function parseSheet(xml, sst) {
  const cells = new Map();
  let maxRow = 0;
  const cRe = /<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g;
  let m;
  while ((m = cRe.exec(xml)) !== null) {
    const attrs = m[1];
    const body = m[2] || '';
    const refM = attrs.match(/\br="([A-Z]+)(\d+)"/);
    if (!refM) continue;
    const colNum = colToNum(refM[1]);
    const row = parseInt(refM[2], 10);
    if (row > maxRow) maxRow = row;
    const tM = attrs.match(/\bt="([^"]+)"/);
    const type = tM ? tM[1] : 'n';
    let value = null;
    if (type === 's') {
      const vM = body.match(/<v>([\s\S]*?)<\/v>/);
      if (vM) value = sst[parseInt(vM[1], 10)] ?? null;
    } else if (type === 'inlineStr') {
      const isM = body.match(/<t\b[^>]*>([\s\S]*?)<\/t>/);
      if (isM) value = decodeEntities(isM[1]);
    } else if (type === 'str') {
      const vM = body.match(/<v>([\s\S]*?)<\/v>/);
      if (vM) value = decodeEntities(vM[1]);
    } else {
      const vM = body.match(/<v>([\s\S]*?)<\/v>/);
      if (vM) value = parseFloat(vM[1]);
    }
    cells.set(colNum + ',' + row, value);
  }
  return { cells, maxRow };
}

function resolveFirstSheet(files) {
  const wb = files.get('xl/workbook.xml');
  const rels = files.get('xl/_rels/workbook.xml.rels');
  if (wb && rels) {
    const sheetM = wb.toString('utf8').match(/<sheet\b[^>]*r:id="([^"]+)"/);
    if (sheetM) {
      const rid = sheetM[1];
      const rx = rels.toString('utf8');
      const relM = rx.match(new RegExp(`<Relationship\\b[^>]*\\bId="${rid}"[^>]*\\bTarget="([^"]+)"`))
                || rx.match(new RegExp(`<Relationship\\b[^>]*\\bTarget="([^"]+)"[^>]*\\bId="${rid}"`));
      if (relM) {
        let t = relM[1].replace(/^\//, '');
        if (!t.startsWith('xl/')) t = 'xl/' + t;
        return t;
      }
    }
  }
  if (files.has('xl/worksheets/sheet1.xml')) return 'xl/worksheets/sheet1.xml';
  throw new Error('Could not resolve the first worksheet path');
}

// ────────────────────────────── table loading ───────────────────────────────
function loadTable(filePath) {
  const files = unzip(readFileSync(filePath));
  const sstBuf = files.get('xl/sharedStrings.xml');
  const sst = sstBuf ? parseSharedStrings(sstBuf.toString('utf8')) : [];
  const sheetPath = resolveFirstSheet(files);
  const sheetBuf = files.get(sheetPath);
  if (!sheetBuf) throw new Error(`Worksheet ${sheetPath} not found in ${filePath}`);
  const sheetXml = sheetBuf.toString('utf8');
  const { cells, maxRow } = parseSheet(sheetXml, sst);
  const runM = sheetXml.match(/<oddHeader>([\s\S]*?)<\/oddHeader>/);
  const runStamp = runM ? decodeEntities(runM[1]).replace(/&[A-Z]/g, '').replace(/^[^0-9]*/, '').trim() : null;
  return { filePath, sst, cells, maxRow, runStamp };
}

const cell = (t, colNum, row) => t.cells.get(colNum + ',' + row) ?? null;

// Locate the "Residential" sector column by scanning the header band.
function findResidentialColumn(t) {
  for (let row = 1; row <= 8; row++) {
    for (let colNum = 1; colNum <= 26; colNum++) {
      const v = cell(t, colNum, row);
      if (typeof v === 'string' && v.trim() === 'Residential') {
        return { headerRow: row, colNum };
      }
    }
  }
  throw new Error(`Residential column not found in ${t.filePath}`);
}

function labelRowMap(t) {
  const map = new Map();
  for (let row = 1; row <= t.maxRow; row++) {
    const label = cell(t, 1, row);
    if (typeof label === 'string' && label.trim()) map.set(label.trim(), row);
  }
  return map;
}

const round2 = (v) => Math.round(v * 100) / 100;

// Pull the residential value for a label; throw loudly if the row is missing
// or the residential cell isn't a finite number.
function residential(t, resCol, label, rowMap) {
  const row = rowMap.get(label);
  if (row == null) throw new Error(`Row "${label}" not found in ${path.basename(t.filePath)}`);
  const v = cell(t, resCol, row);
  if (typeof v !== 'number' || !Number.isFinite(v)) {
    throw new Error(`Residential value for "${label}" in ${path.basename(t.filePath)} is not a number (got ${JSON.stringify(v)})`);
  }
  return round2(v);
}

// ────────────────────────────── main ────────────────────────────────────────
function main() {
  const month = loadTable(FILE_MONTH);
  const ytd = loadTable(FILE_YTD);

  // Titles are the first two label-column cells (A1, A2), joined.
  const titleMonth = [cell(month, 1, 1), cell(month, 1, 2)].filter(Boolean).join(' ').trim();
  const titleYtd = [cell(ytd, 1, 1), cell(ytd, 1, 2)].filter(Boolean).join(' ').trim();

  // Verify we didn't swap the files: A is a month, B is year-to-date.
  if (/year-to-date/i.test(titleMonth)) throw new Error(`table_5_06_a.xlsx looks like a year-to-date table, not a month: "${titleMonth}"`);
  if (!/year-to-date/i.test(titleYtd)) throw new Error(`table_5_06_b.xlsx does not look like a year-to-date table: "${titleYtd}"`);

  const rc = findResidentialColumn(month);
  const ry = findResidentialColumn(ytd);

  // Period sub-headers sit one row below the sector header, in the residential column.
  const dataMonth = String(cell(month, rc.colNum, rc.headerRow + 1) || '').trim();     // e.g. "July 2026"
  const priorMonth = String(cell(month, rc.colNum + 1, rc.headerRow + 1) || '').trim();  // e.g. "July 2025"
  const ytdLabel = String(cell(ytd, ry.colNum, ry.headerRow + 1) || '').trim();        // e.g. "July 2026 YTD"
  const priorYtdLabel = String(cell(ytd, ry.colNum + 1, ry.headerRow + 1) || '').trim(); // e.g. "July 2025 YTD"
  if (!dataMonth) throw new Error('Could not read the latest-month period label');
  if (!/ytd|year-to-date/i.test(ytdLabel)) throw new Error(`Year-to-date period label looks wrong: "${ytdLabel}"`);

  const monthRows = labelRowMap(month);
  const ytdRows = labelRowMap(ytd);

  // Build the rates map: 50 states + DC + U.S. Total.
  const rates = {};
  const wanted = [...STATES, DC, US_TOTAL];
  for (const name of wanted) {
    rates[name] = {
      latestMonthCentsPerKwh: residential(month, rc.colNum, name, monthRows),
      yearToDateCentsPerKwh: residential(ytd, ry.colNum, name, ytdRows),
    };
  }
  // Fail loudly if the U.S. total is somehow absent (belt-and-suspenders).
  if (!rates[US_TOTAL]) throw new Error('U.S. Total row not found');

  // Source note is the last shared string (the footnote merged across row 67).
  const footnote = month.sst[month.sst.length - 1] || '';
  const sourceLine = (footnote.split('\n').find((l) => /^Source:/i.test(l.trim())) || '').trim();

  const out = {
    metadata: {
      description: 'Residential electricity price by state from the U.S. EIA Electric Power Monthly, Tables 5.6.A (latest month) and 5.6.B (year-to-date).',
      unit: 'cents per kilowatthour',
      dataMonth,
      ytdPeriod: `year-to-date through ${dataMonth}`,
      ytdColumnLabel: ytdLabel,
      priorYearMonthColumn: priorMonth,
      priorYearYtdColumn: priorYtdLabel,
      tableTitleLatestMonth: titleMonth,
      tableTitleYearToDate: titleYtd,
      source: sourceLine || 'U.S. Energy Information Administration, Form EIA-861M, Monthly Electric Power Industry Report.',
      reportRunStampLatestMonth: month.runStamp,
      reportRunStampYearToDate: ytd.runStamp,
      generatedFrom: ['data/eia/table_5_06_a.xlsx', 'data/eia/table_5_06_b.xlsx'],
      generatedBy: 'scripts/eia-rates.mjs',
      entryCount: wanted.length,
    },
    rates,
  };

  writeFileSync(OUT_JSON, JSON.stringify(out, null, 2) + '\n');

  // ── console report ─────────────────────────────────────────────────────────
  const jurisdictions = [...STATES, DC]; // 50 states + DC, excludes the U.S. aggregate
  const byYtd = jurisdictions
    .map((n) => ({ name: n, ytd: rates[n].yearToDateCentsPerKwh, month: rates[n].latestMonthCentsPerKwh }))
    .sort((a, b) => a.ytd - b.ytd);

  console.log(`EIA residential electricity prices — parsed OK`);
  console.log(`  wrote ${path.relative(ROOT, OUT_JSON)} (${wanted.length} entries: 50 states + DC + U.S. Total)`);
  console.log(`  data month:  ${dataMonth}`);
  console.log(`  YTD period:  ${out.metadata.ytdPeriod} (column "${ytdLabel}")`);
  console.log(`  U.S. Total residential:  month ${rates[US_TOTAL].latestMonthCentsPerKwh}  |  YTD ${rates[US_TOTAL].yearToDateCentsPerKwh}  cents/kWh`);
  console.log(`\n  5 LOWEST by YTD (50 states + DC):`);
  for (const r of byYtd.slice(0, 5)) console.log(`    ${r.ytd.toFixed(2).padStart(6)}  ${r.name}`);
  console.log(`  5 HIGHEST by YTD (50 states + DC):`);
  for (const r of byYtd.slice(-5).reverse()) console.log(`    ${r.ytd.toFixed(2).padStart(6)}  ${r.name}`);

  console.log(`\n  FULL TABLE (alphabetical) — state | YTD cents/kWh | latest-month cents/kWh`);
  for (const name of [...STATES, DC].sort((a, b) => a.localeCompare(b))) {
    console.log(`    ${name.padEnd(22)} ${rates[name].yearToDateCentsPerKwh.toFixed(2).padStart(6)}  ${rates[name].latestMonthCentsPerKwh.toFixed(2).padStart(6)}`);
  }
  console.log(`    ${US_TOTAL.padEnd(22)} ${rates[US_TOTAL].yearToDateCentsPerKwh.toFixed(2).padStart(6)}  ${rates[US_TOTAL].latestMonthCentsPerKwh.toFixed(2).padStart(6)}`);
}

main();
