// E-Ticaret SEO (ecom-*) and Teknik SEO (tech-*) visuals, same house style as
// make-seo-svgs.mjs. Every state shown is representative; no measured values.
export default function more({ ICONS, svg, g, rect, bar, slot, path, text, icon, badge, dot, browserTop, C }) {
  const { T, D, S, L, B, G, BAR, SAF } = C;
  Object.assign(ICONS, {
    star: 'M12 4l2.4 5 5.4.6-4 3.7 1.1 5.3L12 16l-4.9 2.6 1.1-5.3-4-3.7 5.4-.6z',
    box: 'M4 8l8-4 8 4v8l-8 4-8-4z M4 8l8 4 8-4 M12 12v8',
    code: 'M9 7l-5 5 5 5 M15 7l5 5-5 5',
    bolt: 'M13 3L5 14h6l-1 7 8-11h-6z',
    cart: 'M4 5h2l2 10h10l2-7H7 M9 19a1 1 0 1 0 0.1 0 M17 19a1 1 0 1 0 0.1 0',
    eye: 'M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z M12 9.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z',
    shield: 'M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z M9 12l2 2 4-4',
    cross: 'M7 7l10 10 M17 7L7 17',
    tree: 'M12 4v5 M6 15v-3h12v3 M4 15h4v5H4z M16 15h4v5h-4z M10 4h4v5h-4z',
    robot: 'M7 9h10v9H7z M12 5v4 M10 13h.01 M14 13h.01 M9 16h6',
  });
  const okChip = (cx, cy, ok = true) => `<circle cx="${cx}" cy="${cy}" r="11" fill="${ok ? L : SAF}"/>${icon(ok ? 'check' : 'dash', cx - 9, cy - 9, { s: 0.75, stroke: ok ? D : '#A8661A' })}`;

  /* ------------------------------------------------------------ E-TİCARET SEO */

  // ecom-stock-sync — ürün sayfası ile ürün verisi aynı varyant stokunu gösteriyor
  {
    const sizes = ['40', '41', '42', '43'];
    let chips = '';
    sizes.forEach((sz, i) => {
      const x = 156 + i * 38; const out = sz === '42';
      chips += g(`size-${sz}`, `${rect(x, 128, 32, 26, { rx: 6, fill: out ? SAF : '#FFFFFF', stroke: out ? S : B, extra: out ? ' stroke-dasharray="4 3"' : '' })}${slot(`size-${i + 1}`, x, 132, 32, 18)}`);
    });
    const body = g('page', `${rect(16, 16, 312, 296)}${browserTop(16, 16, 312)}${rect(32, 60, 112, 128, { rx: 10, fill: L, stroke: 'none' })}${icon('box', 72, 108, { s: 1.3 })}${bar(156, 64, 150, 10, T)}${bar(156, 84, 110)}${slot('variant-head', 156, 104, 150, 16)}`)
      + chips
      + g('stock-page', `${rect(156, 168, 156, 28, { rx: 14, fill: SAF, stroke: S })}${slot('stock-page', 168, 173, 136, 18)}`)
      + g('buy', `${rect(32, 212, 280, 36, { rx: 8, fill: '#C9D3DA', stroke: 'none' })}${slot('buy', 32, 221, 280, 18)}`)
      + `${bar(32, 266, 240)}${bar(32, 282, 190)}`
      + g('feed', `${rect(360, 40, 224, 248)}${badge('doc', 376, 56, { size: 32 })}${slot('feed', 418, 63, 156, 18)}${path('M376 104 H568', { stroke: B, sw: 1.5 })}`)
      + [0, 1, 2].map((i) => {
        const y = 120 + i * 44; const hi = i === 1;
        return g(`row-${i + 1}`, `${rect(376, y, 192, 34, { rx: 8, fill: hi ? SAF : G, stroke: hi ? S : 'none' })}${slot(`key-${i + 1}`, 386, y + 8, 70, 18)}${slot(`val-${i + 1}`, 462, y + 8, 100, 18)}`);
      }).join('')
      + g('match', `${okChip(390, 266)}${slot('match', 408, 257, 166, 18)}`)
      + path('M312 182 C340 182 344 181 376 181', { id: 'sync', stroke: S, sw: 2.5 });
    svg('ecom-stock-sync', 600, 328, body, ['sync']);
  }

  // ecom-category-tree — geniş arama kategoriye, model araması ürün sayfasına
  {
    const node = (id, x, y, w, h, hi, ic) => g(id, `${rect(x, y, w, h, { rx: 10, fill: hi ? L : '#FFFFFF', stroke: hi ? T : B, sw: hi ? 2 : 1.5 })}${badge(ic, x + 10, y + (h - 28) / 2, { size: 28, fill: hi ? '#FFFFFF' : L })}${slot(id, x + 46, y + (h - 18) / 2, w - 54, 18)}`);
    const body = slot('head-q', 16, 74, 190, 16) + slot('head-s', 250, 4, 200, 16)
      + path('M424 70 L338 116', { stroke: B, sw: 2 }) + path('M456 70 L540 116', { stroke: B, sw: 2 }) + path('M335 162 L335 232', { id: 'tree-down', sw: 2.5 })
      + node('root', 356, 24, 168, 46, false, 'tree') + node('cat', 250, 116, 176, 46, true, 'store') + node('cat-2', 456, 116, 168, 46, false, 'store') + node('prod', 250, 232, 176, 52, true, 'box')
      + g('q-1', `${rect(16, 116, 200, 46, { rx: 23 })}${icon('search', 28, 127)}${slot('q-1', 58, 130, 150, 18)}`)
      + g('q-2', `${rect(16, 235, 200, 46, { rx: 23 })}${icon('search', 28, 246)}${slot('q-2', 58, 249, 150, 18)}`)
      + path('M216 139 L250 139', { id: 'arrow-1', sw: 2.5 }) + path('M216 258 L250 258', { id: 'arrow-2', sw: 2.5 })
      + g('crumb', `${rect(250, 300, 374, 26, { rx: 13, fill: G, stroke: 'none' })}${slot('crumb', 262, 304, 354, 18)}`);
    svg('ecom-category-tree', 640, 340, body, ['tree-down', 'arrow-1', 'arrow-2']);
  }

  // ecom-stock-rules — sayfa durumu → uygulanacak kural
  {
    let body = slot('head-state', 16, 6, 220, 16) + slot('head-rule', 300, 6, 284, 16);
    [['clock', 30], ['cross', 118], ['filter', 206]].forEach(([, y], i) => {
      const n = i + 1; const ic = ['refresh', 'cross', 'dash'][i];
      body += g(`state-${n}`, `${rect(16, y, 230, 66, { rx: 10, fill: i === 1 ? SAF : '#FFFFFF', stroke: i === 1 ? S : B })}${badge(ic, 30, y + 17, { size: 32, fill: i === 1 ? '#FFFFFF' : L, stroke: i === 1 ? '#A8661A' : D })}${slot(`state-${n}`, 72, y + 24, 166, 18)}`);
      body += path(`M250 ${y + 33} L292 ${y + 33}`, { id: `rule-arrow-${n}`, sw: 2.5 }) + path(`M285 ${y + 27} L292 ${y + 33} L285 ${y + 39}`, { id: `rule-tip-${n}`, sw: 2.5 });
      body += g(`rule-${n}`, `${rect(300, y, 284, 66, { rx: 10, stroke: T })}${okChip(322, y + 33)}${slot(`rule-${n}`, 342, y + 24, 236, 18)}`);
    });
    svg('ecom-stock-rules', 600, 290, body, ['rule-arrow-1', 'rule-arrow-2', 'rule-arrow-3']);
  }

  // ecom-platforms — dört altyapı, her birinde incelenen alanlar
  {
    let body = '';
    [16, 162, 308, 454].forEach((x, i) => {
      const n = i + 1;
      body += g(`plat-${n}`, `${rect(x, 24, 130, 236, { stroke: i === 0 ? T : B, sw: i === 0 ? 2 : 1.5 })}${badge('store', x + 47, 40, { size: 36 })}${slot(`plat-${n}`, x + 8, 88, 114, 18)}${slot(`focus-${n}`, x + 8, 110, 114, 16)}${path(`M${x + 14} 138 H${x + 116}`, { stroke: B, sw: 1.5 })}`
        + [0, 1, 2].map((r) => `${okChip(x + 26, 164 + r * 30)}${bar(x + 44, 161 + r * 30, 66 - r * 8)}`).join(''));
    });
    svg('ecom-platforms', 600, 280, body);
  }

  // ecom-rich-result — mağazanın ürün sonucu, yıldız, stok ve fiyat bilgisiyle
  {
    const stars = [0, 1, 2, 3, 4].map((i) => icon('star', 132 + i * 16, 158, { s: 0.6, stroke: S, sw: 1.6 })).join('');
    const body = g('serp', `${rect(16, 16, 568, 290)}${rect(36, 34, 528, 36, { rx: 18, fill: G })}${icon('search', 48, 40)}${slot('query', 80, 43, 300, 18)}${path('M36 86 H564', { stroke: B, sw: 1.5 })}`)
      + g('result-1', `${rect(28, 100, 544, 104, { rx: 10, fill: L, stroke: T })}${rect(44, 114, 72, 76, { rx: 8, fill: '#FFFFFF', stroke: 'none' })}${icon('box', 62, 134, { s: 1.5 })}${slot('domain', 132, 112, 260, 16)}${bar(132, 136, 280, 9, T)}${stars}${slot('rating', 216, 157, 120, 16)}${g('stock', `${rect(132, 178, 74, 20, { rx: 10, fill: '#FFFFFF', stroke: T })}${slot('stock', 136, 179, 66, 18)}`)}${g('price', `${rect(214, 178, 96, 20, { rx: 10, fill: '#FFFFFF', stroke: B })}${slot('price', 218, 179, 88, 18)}`)}`)
      + g('links', [0, 1, 2].map((i) => `${rect(132 + i * 110, 214, 100, 24, { rx: 12, fill: '#FFFFFF' })}${slot(`link-${i + 1}`, 136 + i * 110, 217, 92, 18)}`).join(''))
      + g('result-2', `${bar(44, 256, 120)}${bar(44, 270, 300, 9, '#C9D3DA')}${bar(44, 286, 380)}`);
    svg('ecom-rich-result', 600, 322, body);
  }

  // ecom-sales-funnel — organik ziyaretten satın almaya, sipariş başına bir kayıt
  {
    const steps = [['eye', 150], ['box', 122], ['cart', 94], ['check', 66]];
    let body = '';
    steps.forEach(([ic, h], i) => {
      const x = 16 + i * 146; const y = 40 + (150 - h) / 2; const last = i === 3;
      body += g(`step-${i + 1}`, `${rect(x, y, 128, h, { rx: 12, fill: last ? L : '#FFFFFF', stroke: last ? T : B, sw: last ? 2 : 1.5 })}${badge(ic, x + 46, y + h / 2 - 30, { size: 36, fill: last ? '#FFFFFF' : L })}${slot(`step-${i + 1}`, x + 6, y + h / 2 + 12, 116, 18)}`);
      if (i < 3) body += path(`M${x + 130} 115 L${x + 144} 115`, { id: `flow-${i + 1}`, sw: 2.5 });
    });
    body += g('once', `${rect(330, 214, 254, 44, { rx: 22, fill: SAF, stroke: S })}${icon('check', 346, 224, { stroke: '#A8661A' })}${slot('once', 376, 227, 200, 18)}`)
      + path('M520 168 C520 190 470 196 458 214', { id: 'once-link', stroke: S, sw: 2, dash: '4 4' });
    svg('ecom-sales-funnel', 600, 274, body, ['flow-1', 'flow-2', 'flow-3']);
  }

  // ecom-scenarios — üç temsili mağaza senaryosu
  {
    let body = '';
    [['store', 16], ['box', 116], ['refresh', 216]].forEach(([ic, y], i) => {
      const n = i + 1;
      body += g(`case-${n}`, `${rect(16, y, 568, 88, { stroke: n === 1 ? T : B, sw: n === 1 ? 2 : 1.5, fill: n === 1 ? L : '#FFFFFF' })}${badge(ic, 34, y + 22, { size: 44, fill: n === 1 ? '#FFFFFF' : L })}${slot(`title-${n}`, 94, y + 20, 300, 18)}${slot(`check-${n}`, 94, y + 48, 330, 16)}${rect(456, y + 30, 112, 28, { rx: 14, fill: SAF, stroke: 'none' })}${slot(`tag-${n}`, 460, y + 35, 104, 18)}`);
    });
    svg('ecom-scenarios', 600, 320, body);
  }

  /* --------------------------------------------------------------- TEKNİK SEO */

  // tech-crawl-index — keşif → tarama → oluşturma → indeksleme → arama sonucu
  {
    const stages = ['link', 'robot', 'code', 'doc', 'search'];
    let body = '';
    stages.forEach((ic, i) => {
      const x = 16 + i * 128; const n = i + 1; const last = n === 5;
      body += g(`stage-${n}`, `${rect(x, 20, 108, 120, { fill: last ? L : '#FFFFFF', stroke: last ? T : B, sw: last ? 2 : 1.5 })}${badge(ic, x + 34, 34, { size: 40, fill: last ? '#FFFFFF' : L })}${slot(`stage-${n}`, x + 4, 86, 100, 18)}${slot(`sub-${n}`, x + 4, 108, 100, 16)}`);
      body += g(`status-${n}`, okChip(x + 54, 166));
      if (i < 4) body += path(`M${x + 110} 80 L${x + 126} 80`, { id: `pipe-${n}`, sw: 2.5 });
    });
    body += path('M70 166 H582', { id: 'status-line', stroke: B, sw: 2, dash: '4 5' });
    svg('tech-crawl-index', 656, 192, body, ['pipe-1', 'pipe-2', 'pipe-3', 'pipe-4']);
  }

  // tech-cwv — LCP, INP, CLS göstergeleri (temsili durumlar)
  {
    let body = slot('tag', 476, 4, 108, 16);
    [['lcp', true, 0.72], ['inp', false, 0.45], ['cls', true, 0.8]].forEach(([, ok, f], i) => {
      const x = 16 + i * 194; const n = i + 1; const cx = x + 87; const cy = 160;
      const ang = Math.PI * (1 - f); const nx = (cx + 52 * Math.cos(ang)).toFixed(1); const ny = (cy - 52 * Math.sin(ang)).toFixed(1);
      body += g(`metric-${n}`, `${rect(x, 24, 174, 236, { stroke: ok ? B : S, fill: ok ? '#FFFFFF' : SAF })}${slot(`metric-${n}`, x + 14, 38, 146, 18)}${slot(`desc-${n}`, x + 14, 60, 146, 16)}`
        + `<path d="M${cx - 64} ${cy} A64 64 0 0 1 ${cx + 64} ${cy}" stroke="${BAR}" stroke-width="12" fill="none" stroke-linecap="round"/>`
        + `<path class="arc" d="M${cx - 64} ${cy} A64 64 0 0 1 ${(cx + 64 * Math.cos(ang)).toFixed(1)} ${(cy - 64 * Math.sin(ang)).toFixed(1)}" stroke="${ok ? T : S}" stroke-width="12" fill="none" stroke-linecap="round"/>`
        + `<path d="M${cx} ${cy} L${nx} ${ny}" stroke="${D}" stroke-width="3" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="6" fill="${D}"/>`
        + `${rect(x + 24, 210, 126, 28, { rx: 14, fill: ok ? L : '#FFFFFF', stroke: ok ? 'none' : S })}${slot(`state-${n}`, x + 28, 215, 118, 18)}`);
    });
    svg('tech-cwv', 600, 276, body);
  }

  // tech-canonical — yinelenen adresler tek canonical hedefine
  {
    let body = slot('head-dup', 16, 14, 260, 16) + slot('head-can', 380, 14, 204, 16);
    [44, 124, 204].forEach((y, i) => {
      body += g(`dup-${i + 1}`, `${rect(16, y, 268, 56, { rx: 10, fill: G })}${slot(`dup-${i + 1}`, 30, y + 19, 244, 18)}`);
      body += path(`M284 ${y + 28} C330 ${y + 28} 340 152 380 152`, { id: `can-${i + 1}`, sw: 2, dash: i === 1 ? undefined : undefined });
    });
    body += g('target', `${rect(380, 112, 204, 80, { stroke: T, sw: 2, fill: L })}${badge('doc', 394, 128, { size: 32, fill: '#FFFFFF' })}${slot('target', 434, 135, 142, 18)}${slot('target-sub', 394, 166, 182, 16)}`);
    svg('tech-canonical', 600, 276, body, ['can-1', 'can-2', 'can-3']);
  }

  // tech-status — URL denetimi: yanıt, robots, canonical → indekslenebilir
  {
    let body = g('panel', `${rect(16, 16, 568, 284)}${rect(36, 34, 528, 36, { rx: 18, fill: G })}${icon('search', 48, 40)}${slot('url', 80, 43, 470, 18)}`);
    [92, 146, 200].forEach((y, i) => {
      body += g(`check-${i + 1}`, `${rect(36, y, 528, 44, { rx: 8, fill: '#FFFFFF' })}${okChip(58, y + 22)}${slot(`check-${i + 1}`, 80, y + 13, 240, 18)}${rect(400, y + 11, 148, 22, { rx: 11, fill: L, stroke: 'none' })}${slot(`value-${i + 1}`, 406, y + 13, 136, 18)}`);
    });
    body += g('verdict', `${rect(36, 254, 528, 32, { rx: 16, fill: T, stroke: 'none' })}${slot('verdict', 36, 261, 528, 18)}`);
    svg('tech-status', 600, 316, body);
  }

  // tech-render — ilk HTML yanıtı ile oluşturulan sayfa
  {
    const codeLines = (x, y) => [0, 1, 2, 3, 4].map((i) => bar(x + (i % 2) * 14, y + i * 16, 120 - (i % 3) * 22, 6, '#C9D3DA')).join('');
    const body = g('raw', `${rect(16, 24, 250, 260)}${slot('raw', 32, 38, 220, 18)}${path('M32 66 H250', { stroke: B, sw: 1.5 })}${icon('code', 32, 80)}${codeLines(64, 84)}${rect(32, 176, 218, 84, { rx: 10, fill: SAF, stroke: S, extra: ' stroke-dasharray="5 4"' })}${slot('raw-missing', 44, 209, 196, 18)}`)
      + g('js', `${rect(272, 128, 56, 30, { rx: 15, fill: D, stroke: 'none' })}${slot('js', 272, 134, 56, 18)}`)
      + path('M266 143 L272 143', { stroke: D, sw: 2 }) + path('M328 143 L334 143', { id: 'render-arrow', stroke: D, sw: 2 })
      + g('rendered', `${rect(334, 24, 250, 260, { stroke: T, sw: 2 })}${slot('rendered', 350, 38, 220, 18)}${path('M350 66 H568', { stroke: B, sw: 1.5 })}${bar(350, 82, 140, 9, T)}${bar(350, 100, 200)}${rect(350, 120, 218, 140, { rx: 10, fill: L, stroke: 'none' })}`
        + [0, 1, 2].map((r) => [0, 1].map((c) => rect(362 + c * 104, 132 + r * 40, 92, 30, { rx: 6, fill: '#FFFFFF', stroke: 'none' })).join('')).join('') + `${slot('rendered-content', 350, 266, 220, 16)}`);
    svg('tech-render', 600, 300, body);
  }

  // tech-finding — bulgudan geliştirici işine
  {
    let body = g('ticket', `${rect(16, 16, 568, 296)}${badge('flag', 36, 34, { size: 36 })}${slot('title', 84, 43, 300, 18)}${rect(452, 38, 112, 28, { rx: 14, fill: SAF, stroke: S })}${slot('priority', 458, 43, 100, 18)}${path('M36 88 H564', { stroke: B, sw: 1.5 })}`);
    [104, 152, 200, 248].forEach((y, i) => {
      const n = i + 1; const last = n === 4;
      body += g(`field-${n}`, `${slot(`label-${n}`, 36, y + 12, 140, 16)}${rect(186, y, 378, 40, { rx: 8, fill: last ? L : G, stroke: last ? T : 'none' })}${last ? okChip(206, y + 20) : ''}${slot(`value-${n}`, last ? 226 : 200, y + 11, last ? 330 : 352, 18)}`);
    });
    svg('tech-finding', 600, 328, body);
  }

  // tech-sources — tarama, Google verisi ve tarayıcı testi aynı URL için
  {
    const mini = [
      (x, y) => [0, 1, 2, 3].map((i) => `${okChip(x + 12, y + 10 + i * 22, i !== 2)}${bar(x + 30, y + 7 + i * 22, 90 - i * 10)}`).join(''),
      (x, y) => `${path(`M${x} ${y + 76} C${x + 30} ${y + 70} ${x + 50} ${y + 52} ${x + 80} ${y + 46} S${x + 120} ${y + 20} ${x + 140} ${y + 12}`, { id: 'gsc-line', sw: 2.5 })}${path(`M${x} ${y + 84} H${x + 140}`, { stroke: BAR, sw: 1 })}`,
      (x, y) => [0, 1, 2, 3].map((i) => rect(x + i * 18, y + 8 + i * 20, 70 - i * 6 + i * 10, 12, { rx: 4, fill: i === 2 ? S : i === 0 ? T : '#9FD3D2', stroke: 'none' })).join(''),
    ];
    let body = '';
    [[16, 'globe'], [222, 'chart'], [428, 'gauge']].forEach(([x, ic], i) => {
      body += g(`src-${i + 1}`, `${rect(x, 16, 196, 190)}${badge(ic, x + 14, 30, { size: 34 })}${slot(`src-${i + 1}`, x + 56, 38, 132, 18)}${mini[i](x + 24, 82)}`);
      body += path(`M${x + 98} 206 C${x + 98} 236 300 230 300 250`, { id: `to-url-${i + 1}`, sw: 2 });
    });
    body += g('url', `${rect(170, 250, 260, 40, { rx: 20, stroke: T, sw: 2, fill: L })}${slot('url', 186, 261, 228, 18)}`) + slot('tag', 476, 266, 108, 16);
    svg('tech-sources', 640, 300, body, ['to-url-1', 'to-url-2', 'to-url-3', 'gsc-line']);
  }

  // tech-evidence — belirti → müdahale → doğrulama
  {
    let body = '';
    [['eye', 16], ['pen', 216], ['shield', 416]].forEach(([ic, x], i) => {
      const n = i + 1; const last = n === 3;
      body += g(`col-${n}`, `${rect(x, 20, 168, 270, { stroke: last ? T : B, sw: last ? 2 : 1.5, fill: last ? L : '#FFFFFF' })}${badge(ic, x + 64, 36, { size: 40, fill: last ? '#FFFFFF' : L })}${slot(`col-${n}`, x + 8, 86, 152, 18)}${path(`M${x + 16} 114 H${x + 152}`, { stroke: B, sw: 1.5 })}`
        + [0, 1, 2].map((r) => `${rect(x + 14, 128 + r * 50, 140, 38, { rx: 8, fill: last ? '#FFFFFF' : G, stroke: 'none' })}${slot(`item-${n}-${r + 1}`, x + 22, 138 + r * 50, 126, 16)}`).join(''));
      if (i < 2) body += path(`M${x + 170} 155 L${x + 214} 155`, { id: `ev-arrow-${n}`, sw: 2.5 }) + path(`M${x + 207} 149 L${x + 214} 155 L${x + 207} 161`, { id: `ev-tip-${n}`, sw: 2.5 });
    });
    svg('tech-evidence', 600, 306, body, ['ev-arrow-1', 'ev-arrow-2']);
  }

  // tech-robots-sitemap — robots.txt kuralları ve site haritası örneği
  {
    const body = g('robots', `${rect(16, 16, 270, 270)}${badge('robot', 32, 32, { size: 34 })}${slot('robots', 76, 40, 200, 18)}${path('M32 80 H270', { stroke: B, sw: 1.5 })}`
        + [0, 1, 2].map((i) => `${rect(32, 96 + i * 44, 238, 34, { rx: 8, fill: i === 2 ? SAF : G, stroke: i === 2 ? S : 'none' })}${slot(`rule-${i + 1}`, 42, 104 + i * 44, 220, 18)}`).join('') + `${slot('robots-note', 32, 238, 238, 32)}`)
      + g('sitemap', `${rect(314, 16, 270, 270, { stroke: T, sw: 2 })}${badge('tree', 330, 32, { size: 34 })}${slot('sitemap', 374, 40, 200, 18)}${path('M330 80 H568', { stroke: B, sw: 1.5 })}`
        + [0, 1, 2, 3].map((i) => `${rect(330, 96 + i * 44, 238, 34, { rx: 8, fill: '#FFFFFF' })}${okChip(348, 113 + i * 44, i !== 2)}${slot(`url-${i + 1}`, 366, 104 + i * 44, 196, 18)}`).join(''))
      + path('M270 233 C292 233 300 201 330 201', { id: 'conflict', stroke: S, sw: 2, dash: '4 4' });
    svg('tech-robots-sitemap', 600, 302, body);
  }

  /* ------------------------------------------- ek içerik (2026-11-08) visuals */
  Object.assign(ICONS, {
    pin: 'M12 21s-6-5.7-6-11a6 6 0 1 1 12 0c0 5.3-6 11-6 11z M12 7.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z',
    team: 'M9 11a3 3 0 1 0 0-6a3 3 0 1 0 0 6z M3 20c.7-3.3 3-5 6-5s5.3 1.7 6 5 M16 5.5a3 3 0 0 1 0 5.5 M18 15c1.6.6 2.6 2.2 3 5',
    compass: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z M15.5 8.5l-2 5-5 2 2-5z',
    calendar: 'M4 6h16v14H4z M4 10h16 M8 3v5 M16 3v5',
    lang: 'M4 5h9 M8.5 3v2 M6 5c1 4 3.5 6.5 6 7.5 M11 5c-1 4-3.5 6.5-6 7.5 M13 21l4-9 4 9 M14.5 18h5',
  });

  // role-lanes — üç rol, her birinin işi (ajans/uzman/danışman veya mağaza/PakSoft/geliştirici)
  {
    let body = '';
    [['team', 16], ['pen', 216], ['compass', 416]].forEach(([ic, x], i) => {
      const n = i + 1;
      body += g(`lane-${n}`, `${rect(x, 16, 168, 252, { stroke: n === 2 ? T : B, sw: n === 2 ? 2 : 1.5, fill: n === 2 ? L : '#FFFFFF' })}${badge(ic, x + 62, 32, { size: 44, fill: n === 2 ? '#FFFFFF' : L })}${slot(`role-${n}`, x + 8, 86, 152, 18)}${slot(`role-sub-${n}`, x + 8, 108, 152, 16)}${path(`M${x + 16} 136 H${x + 152}`, { stroke: B, sw: 1.5 })}`
        + [0, 1, 2].map((r) => `${okChip(x + 30, 160 + r * 34)}${slot(`task-${n}-${r + 1}`, x + 48, 151 + r * 34, 112, 18)}`).join(''));
    });
    body += path('M184 76 H216', { id: 'hand-1', sw: 2.5 }) + path('M384 76 H416', { id: 'hand-2', sw: 2.5 });
    svg('role-lanes', 600, 284, body, ['hand-1', 'hand-2']);
  }

  // channel-compare — pazaryeri ürün kaydı ile kendi mağazanızın sayfaları
  {
    const col = (id, x, hi) => g(id, `${rect(x, 16, 272, 264, { stroke: hi ? T : B, sw: hi ? 2 : 1.5 })}${badge('store', x + 16, 30, { size: 36, fill: hi ? L : G })}${slot(`${id}`, x + 62, 36, 196, 18)}${slot(`${id}-sub`, x + 62, 56, 196, 16)}${path(`M${x + 16} 92 H${x + 256}`, { stroke: B, sw: 1.5 })}`
      + [0, 1, 2, 3].map((r) => `${okChip(x + 32, 116 + r * 40, hi || r < 2)}${slot(`${id}-row-${r + 1}`, x + 52, 107 + r * 40, 208, 18)}`).join(''));
    svg('channel-compare', 600, 296, col('market', 16, false) + col('store', 312, true));
  }

  // page-annotate — sayfa üzerinde işaretlenen SEO alanları
  {
    const body = g('page', `${rect(16, 16, 300, 288)}${browserTop(16, 16, 300)}${rect(32, 58, 268, 16, { rx: 4, fill: G, stroke: 'none' })}${bar(40, 63, 150, 6, T)}${bar(32, 92, 220, 12, '#1F2937')}${rect(32, 118, 120, 92, { rx: 8, fill: L, stroke: 'none' })}${icon('box', 80, 152)}${bar(164, 122, 136)}${bar(164, 138, 120)}${bar(164, 154, 128)}${bar(164, 170, 96)}${bar(32, 228, 240)}${bar(32, 244, 200)}${bar(32, 266, 90, 7, T)}`)
      + [[66, 1], [98, 2], [164, 3], [270, 4]].map(([y, n]) => `${path(`M300 ${y} C326 ${y} 330 ${36 + (n - 1) * 70} 350 ${36 + (n - 1) * 70}`, { id: `ann-${n}`, stroke: S, sw: 1.8, dash: '4 4' })}`).join('')
      + [1, 2, 3, 4].map((n) => g(`tag-${n}`, `${rect(350, 18 + (n - 1) * 70, 234, 40, { rx: 10, fill: n === 1 ? L : '#FFFFFF', stroke: n === 1 ? T : B })}<circle cx="370" cy="${38 + (n - 1) * 70}" r="10" fill="${D}"/>${text(370, 38.5 + (n - 1) * 70, n, { size: 11 })}${slot(`tag-${n}`, 388, 29 + (n - 1) * 70, 188, 18)}`)).join('');
    svg('page-annotate', 600, 320, body);
  }

  // seo-local — işletme profili ile sitedeki hizmet sayfası
  {
    const body = g('profile', `${rect(16, 16, 268, 268)}${rect(16, 16, 268, 92, { rx: 12, fill: L, stroke: 'none' })}${icon('pin', 132, 46, { s: 1.4, stroke: T })}${slot('profile', 32, 120, 236, 18)}${[0, 1, 2, 3, 4].map((i) => icon('star', 32 + i * 16, 146, { s: 0.6, stroke: S, sw: 1.6 })).join('')}${slot('rating', 116, 145, 150, 16)}`
        + [0, 1].map((r) => `${rect(32, 180 + r * 44, 236, 34, { rx: 8, fill: G, stroke: 'none' })}${slot(`info-${r + 1}`, 42, 188 + r * 44, 216, 18)}`).join(''))
      + path('M284 150 C310 150 312 120 336 120', { id: 'to-site', sw: 2.5 })
      + g('site', `${rect(336, 40, 248, 220, { stroke: T, sw: 2 })}${browserTop(336, 40, 248)}${slot('site', 352, 78, 216, 18)}${bar(352, 106, 180, 9, T)}${bar(352, 124, 200)}${bar(352, 140, 160)}${rect(352, 166, 216, 40, { rx: 8, fill: L, stroke: 'none' })}${slot('site-area', 362, 177, 196, 18)}${rect(352, 220, 120, 26, { rx: 6, fill: D, stroke: 'none' })}${slot('site-cta', 352, 224, 120, 18)}`);
    svg('seo-local', 600, 300, body, ['to-site']);
  }

  // seo-competitor — aynı sorguda sizin sayfanız ve rakip sayfa
  {
    let body = g('query', `${rect(150, 16, 300, 40, { rx: 20, fill: G })}${icon('search', 166, 24)}${slot('query', 196, 27, 240, 18)}`);
    body += path('M260 56 C260 76 160 76 160 92', { id: 'q-left', sw: 2 }) + path('M340 56 C340 76 440 76 440 92', { id: 'q-right', sw: 2 });
    [['yours', 16, true], ['rival', 316, false]].forEach(([id, x, hi]) => {
      body += g(id, `${rect(x, 92, 268, 196, { stroke: hi ? T : B, sw: hi ? 2 : 1.5, fill: hi ? L : '#FFFFFF' })}${slot(id, x + 16, 106, 236, 18)}${path(`M${x + 16} 134 H${x + 252}`, { stroke: B, sw: 1.5 })}`
        + [0, 1, 2].map((r) => `${slot(`${id}-row-${r + 1}`, x + 16, 150 + r * 42, 176, 18)}${okChip(x + 236, 159 + r * 42, id === 'rival' || r !== 1)}`).join(''));
    });
    svg('seo-competitor', 600, 304, body, ['q-left', 'q-right']);
  }

  // monthly-plan — bir aylık çalışma: haftalara dağılan işler ve rapor
  {
    let body = g('month', `${rect(16, 16, 568, 268)}${badge('calendar', 32, 30, { size: 34 })}${slot('month', 76, 38, 260, 18)}${path('M32 80 H568', { stroke: B, sw: 1.5 })}`);
    [0, 1, 2, 3].forEach((w) => {
      const x = 32 + w * 136;
      body += g(`week-${w + 1}`, `${slot(`week-${w + 1}`, x, 92, 124, 16)}${rect(x, 116, 124, 108, { rx: 10, fill: w === 3 ? L : G, stroke: w === 3 ? T : 'none' })}${badge(['flag', 'pen', 'check', 'chart'][w], x + 44, 128, { size: 34, fill: '#FFFFFF' })}${slot(`task-${w + 1}`, x + 6, 172, 112, 18)}${slot(`task-sub-${w + 1}`, x + 6, 194, 112, 16)}`);
    });
    body += path('M32 246 H568', { stroke: BAR, sw: 6 }) + path('M32 246 H568', { id: 'month-progress', sw: 6 });
    svg('monthly-plan', 600, 300, body, ['month-progress']);
  }

  // contract-scope — sözleşmede kontrol edilecek maddeler
  {
    let body = g('doc', `${rect(140, 16, 320, 312)}${badge('doc', 160, 32, { size: 36 })}${slot('doc', 206, 40, 236, 18)}${path('M160 84 H440', { stroke: B, sw: 1.5 })}`);
    [0, 1, 2, 3, 4].forEach((r) => {
      body += g(`clause-${r + 1}`, `${rect(160, 98 + r * 40, 280, 32, { rx: 8, fill: r === 4 ? SAF : G, stroke: r === 4 ? S : 'none' })}${okChip(180, 114 + r * 40, r !== 4)}${slot(`clause-${r + 1}`, 200, 105 + r * 40, 232, 18)}`);
    });
    body += g('sign', `${path('M176 312 C200 300 214 320 236 308 S270 302 286 310', { id: 'signature', stroke: D, sw: 2 })}`);
    svg('contract-scope', 600, 340, body, ['signature']);
  }

  // hreflang-pair — iki dil sürümü karşılıklı hreflang ile bağlı
  {
    const pagePair = (id, x, hi) => g(id, `${rect(x, 24, 236, 240, { stroke: hi ? T : B, sw: hi ? 2 : 1.5 })}${browserTop(x, 24, 236)}${rect(x + 16, 62, 52, 22, { rx: 11, fill: hi ? L : G, stroke: 'none' })}${slot(`${id}-lang`, x + 16, 64, 52, 18)}${slot(`${id}-url`, x + 76, 64, 150, 18)}${rect(x + 16, 98, 90, 80, { rx: 8, fill: L, stroke: 'none' })}${icon('box', x + 49, 126)}${bar(x + 118, 104, 100, 9, T)}${bar(x + 118, 122, 90)}${rect(x + 118, 140, 100, 22, { rx: 11, fill: G, stroke: 'none' })}${slot(`${id}-price`, x + 120, 142, 96, 18)}${slot(`${id}-ship`, x + 16, 196, 204, 18)}${bar(x + 16, 228, 160)}`);
    const body = pagePair('tr', 16, false) + pagePair('de', 348, true)
      + path('M252 120 C290 100 310 100 348 120', { id: 'alt-1', sw: 2.5 }) + path('M348 160 C310 180 290 180 252 160', { id: 'alt-2', sw: 2.5 })
      + g('hreflang', `${rect(256, 128, 88, 24, { rx: 12, fill: D, stroke: 'none' })}${slot('hreflang', 256, 131, 88, 18)}`);
    svg('hreflang-pair', 600, 288, body, ['alt-1', 'alt-2']);
  }

  // season-calendar — yıl boyunca aynı kampanya adresi
  {
    let body = g('year', `${rect(16, 16, 568, 132, { fill: '#FFFFFF' })}${slot('year', 32, 28, 240, 18)}${path('M40 98 H520', { stroke: BAR, sw: 6 })}`);
    for (let m = 0; m < 12; m++) body += `<circle cx="${40 + m * 43.6}" cy="98" r="3" fill="${B}"/>`;
    [[2, 1, 60], [9.4, 2, 60], [11, 3, 114]].forEach(([m, n, ly]) => {
      const x = 40 + m * 43.6;
      body += g(`mark-${n}`, `<circle cx="${x}" cy="98" r="9" fill="${n === 3 ? S : T}"/>${slot(`mark-${n}`, x - 60, ly, 120, 16)}`);
    });
    body += path('M40 98 H520', { id: 'year-line', sw: 3 })
      + g('url', `${rect(150, 176, 300, 44, { rx: 22, stroke: T, sw: 2, fill: L })}${icon('link', 168, 186)}${slot('url', 198, 189, 236, 18)}`)
      + path('M520 107 C520 150 440 150 420 176', { id: 'to-url', stroke: S, sw: 2, dash: '4 4' })
      + g('note', `${slot('note', 120, 236, 360, 16)}`);
    svg('season-calendar', 600, 264, body, ['year-line']);
  }

  // log-lines — sunucu kayıtlarında Googlebot isteklerinin dağılımı
  {
    let body = g('log', `${rect(16, 16, 340, 268, { fill: '#111827', stroke: 'none' })}${slot('log', 32, 28, 300, 16)}`);
    [0, 1, 2, 3, 4, 5].forEach((r) => {
      const hi = r === 2 || r === 4;
      body += g(`line-${r + 1}`, `${rect(28, 56 + r * 36, 316, 28, { rx: 6, fill: hi ? '#1F3A3A' : '#1F2937', stroke: 'none' })}${slot(`line-${r + 1}`, 36, 61 + r * 36, 300, 18)}`);
    });
    body += g('chart', `${rect(376, 16, 208, 268)}${slot('chart', 392, 28, 180, 16)}`
      + [[0.9, S], [0.75, S], [0.3, T], [0.22, T]].map(([f, c], i) => `${slot(`group-${i + 1}`, 392, 62 + i * 52, 176, 16)}${bar(392, 82 + i * 52, 176, 10, BAR)}${rect(392, 82 + i * 52, Math.round(176 * f), 10, { rx: 5, fill: c, stroke: 'none', id: `fill-${i + 1}` })}`).join(''));
    svg('log-lines', 600, 300, body);
  }

  // crawl-table — tarama aracı çıktısı: URL, durum, canonical, iç bağlantı
  {
    let body = g('table', `${rect(16, 16, 568, 280)}${slot('h-url', 32, 30, 230, 16)}${slot('h-status', 282, 30, 70, 16)}${slot('h-canon', 362, 30, 120, 16)}${slot('h-links', 492, 30, 80, 16)}${path('M32 56 H568', { stroke: B, sw: 1.5 })}`);
    [0, 1, 2, 3, 4].forEach((r) => {
      const st = ['200', '301', '200', '404', '200'][r]; const bad = st === '404' || r === 2;
      body += g(`row-${r + 1}`, `${rect(28, 66 + r * 44, 544, 36, { rx: 8, fill: bad ? SAF : (r % 2 ? G : '#FFFFFF'), stroke: bad ? S : 'none' })}${slot(`url-${r + 1}`, 38, 75 + r * 44, 236, 18)}${rect(282, 73 + r * 44, 56, 22, { rx: 11, fill: st === '200' ? L : st === '301' ? G : '#FBE9E4', stroke: 'none' })}${slot(`st-${r + 1}`, 282, 75 + r * 44, 56, 18)}${slot(`canon-${r + 1}`, 362, 75 + r * 44, 120, 18)}${slot(`links-${r + 1}`, 492, 75 + r * 44, 70, 18)}`);
    });
    svg('crawl-table', 600, 312, body);
  }

  // migration-phases — taşıma öncesi, yayın günü, sonrası
  {
    let body = '';
    [16, 216, 416].forEach((x, i) => {
      const n = i + 1;
      body += g(`phase-${n}`, `${rect(x, 16, 168, 268, { stroke: n === 2 ? T : B, sw: n === 2 ? 2 : 1.5, fill: n === 2 ? L : '#FFFFFF' })}<circle cx="${x + 84}" cy="46" r="16" fill="${D}"/>${text(x + 84, 46.5, n, { size: 14 })}${slot(`phase-${n}`, x + 8, 72, 152, 18)}${path(`M${x + 16} 102 H${x + 152}`, { stroke: B, sw: 1.5 })}`
        + [0, 1, 2, 3].map((r) => `${okChip(x + 30, 126 + r * 38)}${slot(`item-${n}-${r + 1}`, x + 48, 117 + r * 38, 112, 18)}`).join(''));
      if (i < 2) body += path(`M${x + 170} 46 L${x + 214} 46`, { id: `next-${n}`, sw: 2.5 });
    });
    svg('migration-phases', 600, 300, body, ['next-1', 'next-2']);
  }

  // traffic-drop — düşüş tarihi, yayın kaydı ve etkilenen sayfa grubu
  {
    const body = g('panel', `${rect(16, 16, 568, 280)}${slot('panel', 32, 30, 260, 18)}${slot('tag', 468, 30, 100, 16)}${path('M40 120 H560 M40 170 H560 M40 220 H560', { stroke: BAR, sw: 1 })}`)
      + `<path id="drop-area" d="M40 130 C90 126 140 124 190 122 S270 120 300 124 L318 196 C360 200 420 196 470 186 S530 176 560 170 V236 H40z" fill="${L}" stroke="none"/>`
      + path('M40 130 C90 126 140 124 190 122 S270 120 300 124 L318 196 C360 200 420 196 470 186 S530 176 560 170', { id: 'drop-line', sw: 2.5 })
      + path('M309 70 V240', { id: 'release', stroke: S, sw: 2, dash: '5 4' })
      + g('release-tag', `${rect(250, 60, 118, 26, { rx: 13, fill: SAF, stroke: S })}${slot('release', 254, 64, 110, 18)}`)
      + g('group', `${rect(40, 250, 250, 32, { rx: 16, fill: G, stroke: 'none' })}${slot('group', 52, 257, 230, 18)}`)
      + g('first', `${rect(310, 250, 250, 32, { rx: 16, fill: L, stroke: T })}${slot('first', 322, 257, 230, 18)}`);
    svg('traffic-drop', 600, 312, body, ['drop-line']);
  }
}

