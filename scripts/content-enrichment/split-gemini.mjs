// Split a Gemini batch (one JSON object keyed by slug) into individual
// batch files that apply.mjs can validate + apply.
//
// Usage:
//   node scripts/content-enrichment/split-gemini.mjs <gemini-output.json> [out-dir]
// Default out-dir: scripts/content-enrichment/batches/web-software-gemini
//
// Gemini output shape (see GEMINI_PROMPT_web-software.md):
//   { "frontend-development": { en:{...}, tr:{...}, de:{...}, ur:{...}, ar:{...} }, ... }

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const LOCALES = ['en', 'tr', 'de', 'ur', 'ar'];

const inPath = process.argv[2];
const outDir = resolve(process.cwd(), process.argv[3] || 'scripts/content-enrichment/batches/web-software-gemini');
if (!inPath) {
  console.error('Usage: node split-gemini.mjs <gemini-output.json> [out-dir]');
  process.exit(1);
}

let raw = readFileSync(resolve(process.cwd(), inPath), 'utf8').trim();
// Tolerate ```json fences if the file was pasted with them
raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');

let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error('✗ Invalid JSON:', e.message);
  process.exit(1);
}

// Allow a top-level wrapper like { services: {...} }
if (data.services && typeof data.services === 'object') data = data.services;

mkdirSync(outDir, { recursive: true });

let written = 0;
const skipped = [];
for (const [slug, locales] of Object.entries(data)) {
  const present = LOCALES.filter(l => locales && locales[l]);
  if (present.length < 5) {
    skipped.push(`${slug} (only ${present.length}/5 locales — skipped, incomplete)`);
    continue;
  }
  const file = { slug, ...locales };
  writeFileSync(join(outDir, `${slug}.json`), JSON.stringify(file, null, 2));
  written += 1;
}

console.log(`✓ wrote ${written} file(s) to ${outDir}`);
if (skipped.length) {
  console.log(`○ skipped ${skipped.length} incomplete:`);
  skipped.forEach(s => console.log('  - ' + s));
}
const relHint = outDir.includes('content-enrichment/')
  ? outDir.split('content-enrichment/')[1]
  : outDir;
console.log('\nNext: node --env-file=.env scripts/content-enrichment/apply.mjs ' + relHint);
