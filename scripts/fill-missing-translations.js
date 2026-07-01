#!/usr/bin/env node
/**
 * Deep-diff locale files against en.json (source of truth) and either:
 *  - report missing key paths with English values (default / --diff)
 *  - merge translations from a JSON file into a locale (--merge <locale> <translationsFile>)
 *
 * Usage:
 *   node scripts/fill-missing-translations.js --diff [outFile]
 *   node scripts/fill-missing-translations.js --merge tr /path/to/tr-fill.json
 */
const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'src', 'locales');
const TARGETS = ['tr', 'de', 'ur', 'ar'];

function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function isObj(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

// Collect missing key paths (dot-notation) with English values
function diff(en, other, prefix = '', out = {}) {
  for (const key of Object.keys(en)) {
    const p = prefix ? `${prefix}.${key}` : key;
    if (!(key in (other || {}))) {
      collectAll(en[key], p, out);
    } else if (isObj(en[key]) && isObj(other[key])) {
      diff(en[key], other[key], p, out);
    }
  }
  return out;
}

function collectAll(val, prefix, out) {
  if (isObj(val)) {
    for (const k of Object.keys(val)) collectAll(val[k], `${prefix}.${k}`, out);
  } else {
    out[prefix] = val;
  }
}

// Set a dot-path value into a nested object, creating objects as needed
function setPath(obj, dotPath, value) {
  const parts = dotPath.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!isObj(cur[parts[i]])) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

function main() {
  const mode = process.argv[2] || '--diff';
  const en = loadJSON(path.join(LOCALES_DIR, 'en.json'));

  if (mode === '--diff') {
    const outFile = process.argv[3];
    const report = {};
    for (const loc of TARGETS) {
      const data = loadJSON(path.join(LOCALES_DIR, `${loc}.json`));
      const missing = diff(en, data);
      report[loc] = { count: Object.keys(missing).length, missing };
      console.log(`${loc}: ${Object.keys(missing).length} missing keys`);
    }
    if (outFile) {
      fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
      console.log(`Report written to ${outFile}`);
    }
  } else if (mode === '--merge') {
    const loc = process.argv[3];
    const fillFile = process.argv[4];
    if (!TARGETS.includes(loc) || !fillFile) {
      console.error('Usage: --merge <tr|de|ur|ar> <translationsFile>');
      process.exit(1);
    }
    const file = path.join(LOCALES_DIR, `${loc}.json`);
    const data = loadJSON(file);
    const fills = loadJSON(fillFile); // flat map: { "a.b.c": "translated", ... }
    let added = 0;
    for (const [dotPath, value] of Object.entries(fills)) {
      setPath(data, dotPath, value);
      added++;
    }
    // Preserve original EOF style (locale files have no trailing newline)
    const original = fs.readFileSync(file, 'utf8');
    const eol = original.endsWith('\n') ? '\n' : '';
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + eol, 'utf8');
    console.log(`${loc}: merged ${added} keys into ${file}`);
  } else {
    console.error(`Unknown mode: ${mode}`);
    process.exit(1);
  }
}

main();
