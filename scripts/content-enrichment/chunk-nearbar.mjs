// Turn exported near-bar category files into small chunk files for generation.
// Each service lists: slug, name, enRef (authoritative English, for meaning),
// and `expand`: { locale: {current, words} } for every locale under 90 words.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const words = s => (s || '').trim().split(/\s+/).filter(Boolean).length;
const [inDir, outDir, sizeArg] = process.argv.slice(2);
if (!inDir || !outDir) { console.error('Usage: chunk-nearbar.mjs <inDir> <outDir> [chunkSize=8]'); process.exit(1); }
const SIZE = parseInt(sizeArg || '8', 10);
mkdirSync(outDir, { recursive: true });

const all = [];
for (const f of readdirSync(inDir).filter(f => f.endsWith('.json'))) {
  const list = JSON.parse(readFileSync(join(inDir, f), 'utf8'));
  for (const s of list) {
    const expand = {};
    for (const [loc, txt] of Object.entries(s.current)) {
      if (words(txt) < 90) expand[loc] = { current: txt, words: words(txt) };
    }
    if (!Object.keys(expand).length) continue;
    all.push({ slug: s.slug, name: s.name, enRef: s.current.en, expand });
  }
}

let idx = 0, n = 0;
for (let i = 0; i < all.length; i += SIZE) {
  n++;
  const chunk = all.slice(i, i + SIZE);
  writeFileSync(join(outDir, `chunk-${String(n).padStart(2, '0')}.json`), JSON.stringify(chunk, null, 2));
  idx += chunk.length;
}
console.log(`${idx} services -> ${n} chunks of up to ${SIZE} in ${outDir}`);
