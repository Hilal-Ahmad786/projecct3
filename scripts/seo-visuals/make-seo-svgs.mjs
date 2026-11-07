// Authors the PakSoft SEO visuals in the Codex house style (white cards,
// #D9DEE3 strokes, #E6F2F2 tints, turquoise #0E7C7B / #095D5C, saffron #E8A33D).
// Run: node scripts/seo-visuals/make-seo-svgs.mjs src/components/seo/visuals/svg, then
//   node scripts/build-ikas-visuals.mjs seo
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });

const T = '#0E7C7B', D = '#095D5C', S = '#E8A33D', L = '#E6F2F2', B = '#D9DEE3', G = '#F8F8F8', BAR = '#E7EAEE', SAF = '#FAF6EF';

const rect = (x, y, w, h, { rx = 12, fill = '#FFFFFF', stroke = B, sw = 1.5, id, extra = '' } = {}) =>
  `<rect${id ? ` id="${id}"` : ''} x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${stroke === 'none' ? 0 : sw}"${extra}/>`;
const bar = (x, y, w, h = 6, fill = BAR) => rect(x, y, w, h, { rx: h / 2, fill, stroke: 'none' });
const slot = (id, x, y, w, h = 18) => `<rect id="slot-${id}" x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="none"/>`;
const path = (d, { id, stroke = T, sw = 2, dash, fill = 'none' } = {}) =>
  `<path${id ? ` id="${id}"` : ''} d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const g = (id, inner) => `<g id="${id}">${inner}</g>`;
const text = (x, y, s, { size = 14, fill = '#FFFFFF', weight = 700 } = {}) =>
  `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="${size}" font-weight="${weight}" fill="${fill}">${s}</text>`;

// 24-unit icons drawn in deep turquoise.
const ICONS = {
  search: 'M10 4a6 6 0 1 0 0 12a6 6 0 1 0 0-12z M14.5 14.5L20 20',
  doc: 'M6 3h8l4 4v14H6z M14 3v4h4 M9 12h6 M9 16h5',
  check: 'M5 12.5l4.2 4L19 7',
  chart: 'M4 20h16 M7 17v-5 M12 17V7 M17 17v-8',
  link: 'M10 14l4-4 M8.5 11.5l-2 2a3 3 0 0 0 4.2 4.2l2-2 M11.5 8.5l2-2a3 3 0 0 1 4.2 4.2l-2 2',
  globe: 'M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16z M4 12h16 M12 4c2.5 2.5 2.5 13.5 0 16 M12 4c-2.5 2.5-2.5 13.5 0 16',
  gauge: 'M4 17a8 8 0 0 1 16 0 M12 17l4-5 M4 17h16',
  flag: 'M6 21V4 M6 4h11l-2.5 4L17 12H6',
  form: 'M5 4h14v16H5z M8 8h8 M8 12h8 M8 16h4',
  store: 'M4 9l1.5-5h13L20 9z M5 9v11h14V9 M10 20v-5h4v5',
  pen: 'M5 19l1-4L16 5l3 3L9 18z M14 7l3 3',
  dash: 'M7 12h10',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  refresh: 'M19 11a7 7 0 1 0-2 5 M19 5v6h-6',
  user: 'M12 4a4 4 0 1 0 0 8a4 4 0 1 0 0-8z M5 20c1-4 4-6 7-6s6 2 7 6',
};
export const ICON_PATHS = ICONS;
const icon = (name, x, y, { s = 1, stroke = D, sw = 1.7 } = {}) =>
  `<g transform="translate(${x} ${y}) scale(${s})">${path(ICONS[name], { stroke, sw: sw / s })}</g>`;
const badge = (name, x, y, { size = 36, fill = L, stroke = D, id } = {}) =>
  `${id ? `<g id="${id}">` : '<g>'}${rect(x, y, size, size, { rx: size / 4, fill, stroke: 'none' })}${icon(name, x + (size - 24 * (size / 36)) / 2, y + (size - 24 * (size / 36)) / 2, { s: size / 36, stroke })}</g>`;
const dot = (cx, cy, r = 4, fill = T, id) => `<circle${id ? ` id="${id}"` : ''} cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
const browserTop = (x, y, w) => `${path(`M${x} ${y + 28} H${x + w}`, { stroke: B, sw: 1.5 })}${dot(x + 14, y + 14, 3.5, BAR)}${dot(x + 26, y + 14, 3.5, BAR)}${dot(x + 38, y + 14, 3.5, BAR)}`;

const svgs = {};
const draws = {};
const svg = (name, w, h, body, drawIds = []) => {
  svgs[name] = `<!-- PakSoft SEO visual: ${name}.svg | viewBox ${w} ${h} -->\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none"><g stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>\n`;
  draws[name] = drawIds;
};

/* 2. query-map — arama sorgusu → yanıt veren sayfa */
{
  const ys = [58, 142, 226];
  let body = `${slot('head-q', 24, 22, 200, 16)}${slot('head-p', 376, 22, 200, 16)}`;
  ys.forEach((y, i) => {
    const n = i + 1;
    body += path(`M224 ${y + 26} C300 ${y + 26} 300 ${y + 26} 376 ${y + 26}`, { id: `map-${n}` });
    body += g(`q-${n}`, `${rect(24, y, 200, 52, { rx: 26 })}${icon('search', 38, y + 14)}${slot(`q-${n}`, 70, y + 17, 144, 18)}`);
    body += g(`p-${n}`, `${rect(376, y, 200, 52, { rx: 10, stroke: n === 1 ? T : B, fill: n === 1 ? L : '#FFFFFF' })}${badge('doc', 388, y + 10, { size: 32, fill: n === 1 ? '#FFFFFF' : L })}${slot(`p-${n}`, 430, y + 17, 136, 18)}`);
    body += dot(376, y + 26, 4, T, `pin-${n}`);
  });
  svg('query-map', 600, 300, body, ['map-1', 'map-2', 'map-3']);
}

/* 3. report — dönem raporu: tamamlanan işler, eğilim, sıradaki öncelik */
{
  let body = rect(16, 16, 568, 304, { id: 'panel' }) + slot('title', 40, 34, 260, 18)
    + g('tag', `${rect(468, 30, 92, 26, { rx: 13, fill: SAF, stroke: S })}${slot('tag', 476, 34, 76, 18)}`)
    + path('M40 72 H560', { stroke: B, sw: 1.5 });
  [90, 142, 194].forEach((y, i) => {
    body += g(`done-${i + 1}`, `${rect(40, y, 264, 42, { rx: 8, fill: G, stroke: 'none' })}${badge('check', 50, y + 7, { size: 28 })}${slot(`done-${i + 1}`, 88, y + 12, 206, 18)}`);
  });
  body += g('chart', `${rect(320, 88, 240, 150, { rx: 10 })}${slot('chart', 334, 98, 212, 16)}${path('M334 140 H546 M334 178 H546 M334 216 H546', { stroke: BAR, sw: 1 })}`)
    + path('M336 214 C370 208 392 196 420 190 S480 166 546 146', { id: 'trend-1', sw: 2.5 })
    + path('M336 228 C376 226 400 221 430 217 S500 205 546 197', { id: 'trend-2', stroke: S, sw: 2.5 })
    + g('next', `${rect(40, 256, 520, 46, { rx: 10, fill: SAF, stroke: S })}${icon('flag', 54, 267, { stroke: '#A8661A' })}${slot('next', 86, 270, 460, 18)}`);
  svg('report', 600, 336, body, ['trend-1', 'trend-2']);
}

/* 4. deliverables — four delivery documents */
{
  const pos = [[16, 16, 'doc'], [314, 16, 'flag'], [16, 176, 'pen'], [314, 176, 'chart']];
  let body = '';
  pos.forEach(([x, y, ic], i) => {
    const n = i + 1;
    body += g(`doc-${n}`, `${rect(x, y, 270, 140)}${badge(ic, x + 16, y + 16, { size: 40 })}${slot(`doc-${n}`, x + 68, y + 27, 180, 18)}${bar(x + 16, y + 76, 230)}${bar(x + 16, y + 92, 196)}${bar(x + 16, y + 108, 150)}`);
    body += g(`tick-${n}`, `<circle cx="${x + 250}" cy="${y + 120}" r="11" fill="${L}"/>${icon('check', x + 241, y + 111, { s: 0.75 })}`);
  });
  svg('deliverables', 600, 332, body);
}

/* 5. internal-links — rehber → hizmet sayfası → teklif formu */
{
  const body = g('guide', `${rect(24, 64, 160, 204)}${browserTop(24, 64, 160)}${slot('guide', 40, 100, 132, 16)}${bar(40, 128, 128)}${bar(40, 142, 112)}${bar(40, 156, 120)}${bar(40, 178, 86, 7, T)}${bar(40, 196, 128)}${bar(40, 210, 100)}${bar(40, 224, 116)}`)
    + g('service', `${rect(220, 24, 160, 272, { stroke: T, sw: 2 })}${browserTop(220, 24, 160)}${slot('service', 236, 60, 132, 16)}${rect(236, 84, 128, 56, { rx: 8, fill: L, stroke: 'none' })}${bar(248, 98, 80, 8, T)}${bar(248, 114, 96)}${bar(236, 156, 128)}${bar(236, 170, 110)}${bar(236, 184, 120)}${bar(236, 206, 128)}${bar(236, 220, 96)}`)
    + g('cta', `${rect(236, 252, 104, 26, { rx: 6, fill: D, stroke: 'none' })}${bar(252, 262, 60, 6, '#FFFFFF')}`)
    + g('form', `${rect(416, 90, 160, 168)}${browserTop(416, 90, 160)}${slot('form', 432, 126, 132, 16)}${rect(432, 152, 128, 22, { rx: 6, fill: G })}${rect(432, 182, 128, 22, { rx: 6, fill: G })}${rect(432, 222, 80, 24, { rx: 6, fill: T, stroke: 'none' })}`)
    + path('M126 182 C176 182 186 122 220 122', { id: 'link-a', sw: 2.5 })
    + path('M340 265 C382 265 384 200 416 200', { id: 'link-b', sw: 2.5 })
    + path('M212 116 L220 122 L212 128', { id: 'head-a', sw: 2.5 }) + path('M408 194 L416 200 L408 206', { id: 'head-b', sw: 2.5 });
  svg('internal-links', 600, 320, body, ['link-a', 'link-b']);
}

/* 6. category-filters — kategori sayfası ve taranan adresler */
{
  let body = g('category', `${rect(16, 16, 268, 300)}${slot('category', 32, 30, 220, 16)}${rect(32, 58, 62, 22, { rx: 11, fill: G })}${rect(100, 58, 62, 22, { rx: 11, fill: L, stroke: T })}${rect(168, 58, 62, 22, { rx: 11, fill: G })}`);
  let k = 0;
  for (const y of [94, 166, 238]) for (const x of [32, 156]) {
    k += 1;
    body += g(`prod-${k}`, `${rect(x, y, 112, 62, { rx: 8, fill: G, stroke: 'none' })}${rect(x + 8, y + 8, 40, 46, { rx: 6, fill: L, stroke: 'none' })}${bar(x + 56, y + 16, 46)}${bar(x + 56, y + 30, 32, 6, '#C9D3DA')}`);
  }
  body += g('urls', `${rect(316, 16, 268, 300)}${slot('urls', 332, 30, 236, 16)}`);
  [60, 114, 168, 222].forEach((y, i) => {
    const ok = i % 2 === 0;
    body += g(`url-${i + 1}`, `${rect(332, y, 236, 44, { rx: 8, stroke: ok ? T : B, fill: ok ? '#FFFFFF' : G })}<circle cx="352" cy="${y + 22}" r="11" fill="${ok ? L : SAF}"/>${icon(ok ? 'check' : 'dash', 343, y + 13, { s: 0.75, stroke: ok ? D : '#A8661A' })}${slot(`url-${i + 1}`, 372, y + 13, 188, 18)}`);
  });
  body += g('legend', `${dot(338, 290, 5, T)}${slot('legend-ok', 348, 282, 96, 16)}${dot(452, 290, 5, S)}${slot('legend-skip', 462, 282, 112, 16)}`);
  body += path('M284 70 C300 70 300 82 332 82', { id: 'flow', sw: 2.5 });
  svg('category-filters', 600, 332, body, ['flow']);
}

/* 7. tools — dört veri kaynağı tek öncelikli sayfaya bağlanıyor */
{
  const cards = [[12, 24, 'search'], [412, 24, 'globe'], [12, 244, 'gauge'], [412, 244, 'chart']];
  let body = path('M228 60 C248 60 256 100 276 128', { id: 'wire-1' }) + path('M412 60 C392 60 384 100 364 128', { id: 'wire-2' })
    + path('M228 280 C248 280 256 240 276 212', { id: 'wire-3' }) + path('M412 280 C392 280 384 240 364 212', { id: 'wire-4' });
  cards.forEach(([x, y, ic], i) => {
    body += g(`tool-${i + 1}`, `${rect(x, y, 216, 72)}${badge(ic, x + 12, y + 18)}${slot(`tool-${i + 1}`, x + 56, y + 18, 152, 18)}${bar(x + 56, y + 44, 92)}`);
  });
  body += g('center', `${rect(232, 124, 176, 92, { stroke: T, sw: 2, fill: L })}${badge('doc', 302, 136, { size: 36, fill: '#FFFFFF' })}${slot('center', 244, 182, 152, 18)}`);
  svg('tools', 640, 340, body, ['wire-1', 'wire-2', 'wire-3', 'wire-4']);
}

/* 8. redirect-map — eski adres → yeni adres */
{
  let body = `${slot('old-head', 24, 20, 216, 16)}${slot('new-head', 360, 20, 216, 16)}`;
  [52, 128, 204].forEach((y, i) => {
    const n = i + 1;
    body += g(`old-${n}`, `${rect(24, y, 216, 56, { rx: 10, fill: G, stroke: n === 2 ? S : B })}${slot(`old-${n}`, 40, y + 19, 188, 18)}`);
    body += path(`M244 ${y + 28} L352 ${y + 28}`, { id: `arrow-${n}`, sw: 2 }) + path(`M344 ${y + 22} L352 ${y + 28} L344 ${y + 34}`, { id: `tip-${n}`, sw: 2 });
    body += g(`code-${n}`, `${rect(274, y + 18, 48, 20, { rx: 10, fill: L, stroke: 'none' })}${slot(`code-${n}`, 274, y + 19, 48, 18)}`);
    body += g(`new-${n}`, `${rect(360, y, 216, 56, { rx: 10, stroke: T })}${slot(`new-${n}`, 376, y + 19, 150, 18)}<circle cx="552" cy="${y + 28}" r="12" fill="${L}"/>${icon('check', 543, y + 19, { s: 0.75 })}`);
  });
  svg('redirect-map', 600, 280, body, ['arrow-1', 'arrow-2', 'arrow-3']);
}

/* 9. priority-board — bulgular öncelik sırasına konuyor */
{
  let body = rect(16, 16, 568, 298, { id: 'board' }) + slot('board', 36, 32, 260, 18)
    + slot('col-1', 76, 64, 180, 16) + slot('col-2', 280, 64, 150, 16) + slot('col-3', 450, 64, 110, 16) + path('M36 88 H564', { stroke: B, sw: 1.5 });
  [96, 148, 200].forEach((y, i) => {
    const n = i + 1; const hi = n === 1;
    body += g(`row-${n}`, `${rect(36, y, 528, 44, { rx: 8, fill: hi ? L : '#FFFFFF', stroke: hi ? T : B })}<circle cx="56" cy="${y + 22}" r="12" fill="${hi ? D : '#C9D3DA'}"/>${text(56, y + 22.5, n, { size: 13 })}${slot(`find-${n}`, 76, y + 13, 190, 18)}${rect(280, y + 11, 150, 22, { rx: 11 })}${slot(`page-${n}`, 290, y + 13, 132, 18)}${rect(450, y + 11, 100, 22, { rx: 11, fill: SAF, stroke: 'none' })}${slot(`owner-${n}`, 458, y + 13, 86, 18)}`);
  });
  body += slot('progress', 36, 258, 260, 16) + bar(36, 284, 528, 10) + rect(36, 284, 210, 10, { rx: 5, fill: T, stroke: 'none', id: 'progress' });
  svg('priority-board', 600, 330, body);
}

/* 10. process-rail — dört aşama */
{
  const xs = [90, 270, 450, 630];
  let body = path('M90 50 H630', { id: 'rail-base', stroke: B, sw: 3 }) + path('M90 50 H630', { id: 'rail', sw: 3 });
  xs.forEach((x, i) => {
    const n = i + 1;
    body += g(`node-${n}`, `<circle cx="${x}" cy="50" r="24" fill="#FFFFFF" stroke="${T}" stroke-width="2"/>${text(x, 50.5, n, { size: 16, fill: D })}`);
    body += slot(`step-${n}`, x - 80, 88, 160, 18) + slot(`sub-${n}`, x - 80, 110, 160, 16);
  });
  svg('process-rail', 720, 140, body, ['rail']);
}

/* 11. site-types — kurumsal site, mağaza, yenilenen site */
{
  const frame = (n, x, y, inner) => g(`site-${n}`, `${rect(x, y, 280, 186)}${browserTop(x, y, 280)}${slot(`type-${n}`, x + 52, y + 6, 212, 16)}${inner}`);
  const corp = (x, y) => `${rect(x + 14, y + 40, 252, 58, { rx: 8, fill: L, stroke: 'none' })}${bar(x + 28, y + 56, 120, 9, T)}${bar(x + 28, y + 74, 160)}${[0, 1, 2].map((i) => `${rect(x + 14 + i * 86, y + 110, 80, 62, { rx: 8, fill: G, stroke: 'none' })}${badge('doc', x + 22 + i * 86, y + 118, { size: 24 })}${bar(x + 22 + i * 86, y + 152, 56)}`).join('')}`;
  const shop = (x, y) => [0, 1, 2].map((c) => [0, 1].map((r) => `${rect(x + 14 + c * 86, y + 40 + r * 68, 80, 60, { rx: 8, fill: G, stroke: 'none' })}${rect(x + 22 + c * 86, y + 48 + r * 68, 28, 44, { rx: 6, fill: L, stroke: 'none' })}${bar(x + 56 + c * 86, y + 56 + r * 68, 30)}${bar(x + 56 + c * 86, y + 70 + r * 68, 20, 6, '#C9D3DA')}`).join('')).join('');
  const renew = (x, y) => `${rect(x + 18, y + 48, 96, 118, { rx: 8, fill: SAF, stroke: S, extra: ' stroke-dasharray="5 4"' })}${bar(x + 30, y + 64, 60)}${bar(x + 30, y + 78, 72)}${bar(x + 30, y + 92, 48)}${rect(x + 166, y + 48, 96, 118, { rx: 8, fill: L, stroke: T })}${bar(x + 178, y + 64, 60, 8, T)}${bar(x + 178, y + 80, 72)}${bar(x + 178, y + 94, 48)}`;
  const body = frame(1, 16, 20, corp(16, 20)) + frame(2, 344, 20, shop(344, 20)) + frame(3, 180, 222, renew(180, 222))
    + path('M302 330 L338 330', { id: 'renew-arrow', sw: 2.5 }) + path('M330 324 L338 330 L330 336', { id: 'renew-tip', sw: 2.5 });
  svg('site-types', 640, 424, body, ['renew-arrow']);
}

/* 12. quote-groups — teklif kalemleri ve ayrı giderler */
{
  const items = [['search', 24], ['pen', 96], ['check', 168], ['chart', 240]];
  let body = '';
  items.forEach(([ic, y], i) => {
    body += g(`group-${i + 1}`, `${rect(16, y, 300, 60, { rx: 10 })}${rect(16, y, 6, 60, { rx: 3, fill: T, stroke: 'none' })}${badge(ic, 34, y + 12)}${slot(`group-${i + 1}`, 80, y + 21, 224, 18)}`);
  });
  body += path('M326 54 C350 54 348 160 372 160 C348 160 350 270 326 270', { id: 'brace', sw: 2.5 })
    + g('quote', `${rect(384, 88, 200, 136, { stroke: T, sw: 2, fill: L })}${badge('doc', 400, 104, { size: 40, fill: '#FFFFFF' })}${slot('quote', 400, 156, 170, 18)}${bar(400, 184, 150)}${bar(400, 198, 110)}`)
    + g('extra', `${rect(384, 244, 200, 56, { rx: 10, fill: SAF, stroke: S, extra: ' stroke-dasharray="5 4"' })}${slot('extra', 398, 263, 176, 18)}`);
  svg('quote-groups', 600, 324, body, ['brace']);
}

await import('./more-svgs.mjs').then((m) => m.default({ ICONS, svg, g, rect, bar, slot, path, text, icon, badge, dot, browserTop, C: { T, D, S, L, B, G, BAR, SAF } }));

for (const [name, markup] of Object.entries(svgs)) writeFileSync(join(OUT, `${name}.svg`), markup);
writeFileSync(join(OUT, 'manifest.json'), JSON.stringify({ set: 'seo', files: Object.keys(svgs).map((name) => ({ file: `${name}.svg`, drawPaths: draws[name] })) }, null, 2) + '\n');
console.log(Object.keys(svgs).length, 'svgs');
