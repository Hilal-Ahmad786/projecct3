// Find translation keys used in components but missing from locale files.
//
// The translator returns the KEY PATH itself when a key is missing
// (src/hooks/useServerTranslations.tsx → getNestedValue), so a missing key
// renders to visitors as raw text like "services.pricing.startingFrom".
// Common `t('x') || 'Fallback'` guards do NOT catch this, because the
// returned key path is a truthy string.
//
// Usage:
//   node scripts/check-i18n-keys.mjs          # report missing keys
//   node scripts/check-i18n-keys.mjs --ci     # exit 1 if any are missing
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const LOCALES = ['en', 'tr', 'de', 'ur', 'ar'];
const ROOTS = ['src/components', 'src/app'];

const locales = Object.fromEntries(
  LOCALES.map(l => [l, JSON.parse(readFileSync(`src/locales/${l}.json`, 'utf8'))])
);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (['.tsx', '.ts'].includes(extname(p))) out.push(p);
  }
  return out;
}

function get(obj, path) {
  return path.split('.').reduce((cur, k) => (cur && cur[k] !== undefined ? cur[k] : undefined), obj);
}

const files = ROOTS.flatMap(r => { try { return walk(r); } catch { return []; } });
const missing = new Map(); // fullKey -> { file, locales[] }

for (const file of files) {
  const src = readFileSync(file, 'utf8');
  // Section scope, e.g. useSectionTranslations('services.pricing')
  const sections = [...src.matchAll(/useSectionTranslations\(\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  // Only files where `t` really comes from the i18n layer. Several pages
  // (the free tools, some service components) define a LOCAL `const t = ...`
  // over an inline translation map — their t('x') calls are not i18n keys.
  const dynamicSection = /useSectionTranslations\(\s*[A-Za-z_$]/.test(src);
  const usesI18n = sections.length > 0 || /\{[^}]*\bt\b[^}]*\}\s*=\s*useTranslations\(/.test(src);
  const definesLocalT = /\bconst\s+t\s*=\s*(\((?!\s*\)\s*=>\s*useSection)|[^=]*=>)/.test(src)
    && !/\bconst\s+t\s*=\s*useSectionTranslations\(/.test(src);
  if (!usesI18n || definesLocalT) continue;
  // Only literal t('...') calls — template literals are resolved at runtime.
  const keys = [...src.matchAll(/\bt\(\s*'([^'${}]+)'/g)].map(m => m[1]);
  if (!keys.length) continue;

  for (const key of keys) {
    // A key resolves either standalone or under one of the file's sections.
    const candidates = sections.length ? sections.map(s => `${s}.${key}`) : [key];
    const resolvesSomewhere = candidates.some(c => get(locales.en, c) !== undefined);
    // Files whose section comes from a variable (e.g. a prop) can't be
    // resolved statically — reporting an unresolved key there is a guess, so
    // only report keys that DO resolve under one of the literal sections.
    if (!resolvesSomewhere && dynamicSection) continue;
    const full = candidates.find(c => get(locales.en, c) !== undefined) || candidates[0];
    const absentIn = resolvesSomewhere
      ? LOCALES.filter(l => get(locales[l], full) === undefined)
      : LOCALES.filter(l => candidates.every(c => get(locales[l], c) === undefined));
    if (absentIn.length) {
      const prev = missing.get(full);
      if (prev) prev.locales = [...new Set([...prev.locales, ...absentIn])];
      else missing.set(full, { file, locales: absentIn });
    }
  }
}

const entries = [...missing.entries()].sort((a, b) => a[0].localeCompare(b[0]));
const allFive = entries.filter(([, v]) => v.locales.length === LOCALES.length);
const partial = entries.filter(([, v]) => v.locales.length < LOCALES.length);

if (allFive.length) {
  console.log(`\n■ Missing in ALL locales (renders as raw key text to every visitor): ${allFive.length}`);
  for (const [k, v] of allFive) console.log(`   ${k}\n     ${v.file}`);
}
if (partial.length) {
  console.log(`\n▲ Missing in SOME locales: ${partial.length}`);
  for (const [k, v] of partial) console.log(`   ${k}  →  missing in ${v.locales.join(',')}`);
}
if (!entries.length) console.log('✓ No missing translation keys found.');
else console.log(`\n${entries.length} key(s) need attention. Scanned ${files.length} files.`);

if (process.argv.includes('--ci') && entries.length) process.exit(1);
