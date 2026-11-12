'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { H, GirihHalo, HeritageParticles, drawIn, popIn, riseIn, starPoints } from './primitives';

function useActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAllowed(!preference.matches && !document.hidden);
    update();
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => { preference.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, []);
  return { ref, active: visible && allowed };
}

function Frame({ label, children }: { label: string; children: (active: boolean) => ReactNode }) {
  const { ref, active } = useActivity();
  // The scene is laid out on a fixed 384 px stage and sized with CSS `zoom`, which re-lays out the
  // content (text and icons stay sharp, unlike a scale transform). The zoom follows the hero column:
  // 352 px on phones, 448 px on tablets and lg, 512 px at md (single column), 544 px from xl.
  return <div ref={ref} role="img" aria-label={label} className="flex max-w-full justify-center">
    <div className="relative h-96 w-96 [zoom:0.9167] sm:[zoom:1.1667] md:[zoom:1.3333] lg:[zoom:1.1667] xl:[zoom:1.4167]">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: H.turquoise, opacity: 0.12 }} />
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-3xl" style={{ perspective: 850 }}>
        <GirihHalo active={active} opacity={0.16} /><HeritageParticles active={active} duration={6} count={5} />
        <div className="absolute inset-[3%]" style={{ transformStyle: 'preserve-3d', fontSize: 10, color: H.lapisDeep }}>{children(active)}</div>
      </div>
    </div>
  </div>;
}

// ── Shared helpers for the overview hero scenes ────────────────────────────────────────────────
// Every scene below follows the MetaAdsScene standard: a 240×240 SVG story in the original Fable style
// (draw-in outlines, staggered pop-ins, girih motifs, travelling dots, a step rail) at the large Frame size.
// Entry animations are plain initial→animate props (same markup on server and client); loops run only
// while `active` (on screen, tab visible, no reduced-motion preference).

type Values = Record<string, (number | string)[]>;
function loop(active: boolean, values: Values, duration: number, delay = 0) {
  return active
    ? { animate: values, transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' as const } }
    : { animate: Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v[0]])), transition: { duration: 0 } };
}
const center = { transformBox: 'fill-box' as const, transformOrigin: 'center' };
const pop = (delay: number) => ({ ...popIn(delay), style: center });

/** A dot travelling once along `d` every `period` seconds, starting at `delay`. */
function Travel({ active, d, delay, duration = 1.4, period = 6, color = H.saffron, r = 3 }: { active: boolean; d: string; delay: number; duration?: number; period?: number; color?: string; r?: number }) {
  return <motion.circle r={r} fill={color} initial={false} style={{ offsetPath: `path("${d}")` }}
    animate={active ? { offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0] } : { offsetDistance: '100%', opacity: 0 }}
    transition={active ? { duration, delay, repeat: Infinity, repeatDelay: period - duration, ease: 'easeInOut' } : { duration: 0 }} />;
}

/** A light turquoise flash on an element once per `period`, offset by `delay`. */
function flash(active: boolean, delay: number, period = 6, from: string = H.turquoiseLight, to: string = H.turquoise) {
  return active
    ? { animate: { fill: [from, to, to, from] }, transition: { duration: period, delay, repeat: Infinity, times: [0, 0.08, 0.3, 0.4] } }
    : { animate: { fill: from }, transition: { duration: 0 } };
}

function Rail({ active, steps, y = 219, start = 3 }: { active: boolean; steps: readonly (readonly [string, number, number])[]; y?: number; start?: number }) {
  return <>{steps.map(([label, x, w], i) => <motion.g key={label} {...riseIn(start - 0.5 + i * 0.1)}>
    <motion.rect x={x} y={y} width={w} height="16" rx="5" strokeWidth="1" initial={false}
      animate={active ? { fill: [H.ivory, H.turquoiseLight, H.ivory], stroke: [H.sand, H.turquoise, H.sand] } : { fill: H.ivory, stroke: H.sand }}
      transition={active ? { duration: 8, repeat: Infinity, delay: start + i * 2, times: [0, 0.12, 0.25] } : { duration: 0 }} />
    <text x={x + w / 2} y={y + 10.6} textAnchor="middle" fontSize="7" fontWeight="700" fill={H.lapisDeep}>{label}</text>
  </motion.g>)}</>;
}

function Shadow({ id }: { id: string }) {
  return <filter id={id} x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={H.lapisDeep} floodOpacity="0.12" /></filter>;
}
function Grad({ id, from, to, vertical = false }: { id: string; from: string; to: string; vertical?: boolean }) {
  return <linearGradient id={id} x1="0" y1="0" x2={vertical ? 0 : 1} y2="1"><stop offset="0%" stopColor={from} /><stop offset="100%" stopColor={to} /></linearGradient>;
}
/** Woven linen: a pale ivory field with sand threads (the Shopping example product). */
function Linen({ id }: { id: string }) {
  return <pattern id={id} width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill={H.ivory} /><path d="M0 2.5 H5 M2.5 0 V5" stroke="#cbbf9d" strokeWidth="0.6" opacity="0.7" /></pattern>;
}
function Check({ cx, cy, r = 4.5, color = H.white }: { cx: number; cy: number; r?: number; color?: string }) {
  return <path d={`M${cx - r * 0.45} ${cy} l${r * 0.32} ${r * 0.34} l${r * 0.62} -${r * 0.7}`} fill="none" stroke={color} strokeWidth={r * 0.28} strokeLinecap="round" strokeLinejoin="round" />;
}

// Small line icons (generic, no brand marks), centred on cx/cy.
const Icon = {
  search: (cx: number, cy: number, c: string) => <g fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><circle cx={cx - 1} cy={cy - 1} r="3.6" /><path d={`M${cx + 1.6} ${cy + 1.6} l2.8 2.8`} /></g>,
  play: (cx: number, cy: number, c: string) => <polygon points={`${cx - 2.6},${cy - 4} ${cx - 2.6},${cy + 4} ${cx + 4},${cy}`} fill={c} />,
  mail: (cx: number, cy: number, c: string) => <g fill="none" stroke={c} strokeWidth="1.4" strokeLinejoin="round"><rect x={cx - 5} y={cy - 3.6} width="10" height="7.2" rx="1.2" /><path d={`M${cx - 5} ${cy - 3} l5 3.6 l5 -3.6`} /></g>,
  pin: (cx: number, cy: number, c: string) => <g fill="none" stroke={c} strokeWidth="1.4"><path d={`M${cx} ${cy + 5} c-3.5 -4 -4.6 -6 -4.6 -8 a4.6 4.6 0 0 1 9.2 0 c0 2 -1.1 4 -4.6 8 z`} /><circle cx={cx} cy={cy - 3} r="1.6" /></g>,
  photo: (cx: number, cy: number, c: string) => <g fill="none" stroke={c} strokeWidth="1.4" strokeLinejoin="round"><rect x={cx - 5} y={cy - 4} width="10" height="8" rx="1.4" /><path d={`M${cx - 4} ${cy + 3} l2.8 -3 l2 2 l1.6 -1.6 l2.6 2.6`} /></g>,
  pencil: (cx: number, cy: number, c: string) => <g fill="none" stroke={c} strokeWidth="1.4" strokeLinejoin="round"><path d={`M${cx - 4} ${cy + 4} l1 -3.4 l5.6 -5.6 l2.4 2.4 l-5.6 5.6 z`} /></g>,
};

// ── Google Ads hub: the original dashboard scene merged with the three-campaign hub ──────────────
export function GoogleAdsHubScene() {
  const cards = [
    { title: 'Arama Ağı', x: 10, y: 24, rot: -6 },
    { title: 'Alışveriş', x: 87, y: 16, rot: 0 },
    { title: 'Performance Max', x: 164, y: 24, rot: 6 },
  ];
  const lines = ['M43 104 C43 116 92 112 92 126', 'M120 96 L120 126', 'M197 104 C197 116 148 112 148 126'];
  const rows = ['Arama Ağı', 'Alışveriş', 'Performance Max'];
  const steps = [['Hedef', 13, 40], ['Kampanya', 59, 52], ['Ölçüm', 117, 40], ['Değerlendirme', 163, 64]] as const;
  return <Frame label="Temsili Google Ads hesabı: Arama Ağı, Alışveriş ve Performance Max kampanyaları aynı dönüşüm ölçümüne bağlanıyor; hedef, kampanya, ölçüm ve değerlendirme adımlarıyla izleniyor.">{active => <>
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs><Shadow id="gaShadow" /><Grad id="gaCore" from={H.turquoise} to={H.lapis} /><Linen id="gaLinen" /></defs>
      {cards.map((c, i) => <motion.g key={c.title} {...pop(0.2 + i * 0.15)}>
        <motion.g {...loop(active, { y: [0, -2.5, 0] }, 7 + i, i * 0.6)}>
          <g transform={`rotate(${c.rot} ${c.x + 33} ${c.y + 40})`}>
            <rect x={c.x} y={c.y} width="66" height="80" rx="10" fill={H.white} filter="url(#gaShadow)" />
            <motion.rect x={c.x} y={c.y} width="66" height="80" rx="10" fill="none" stroke={H.sand} strokeWidth="1.5" {...drawIn(0.1 + i * 0.15, 0.9)} />
            <text x={c.x + 7} y={c.y + 13} fontSize="6.8" fontWeight="700" fill={H.lapisDeep}>{c.title}</text>
            {i === 0 && <g>
              <rect x={c.x + 6} y={c.y + 19} width="54" height="11" rx="5.5" fill="none" stroke={H.sand} />
              {Icon.search(c.x + 13, c.y + 24.5, H.turquoise)}
              <rect x={c.x + 20} y={c.y + 23} width="30" height="3" rx="1.5" fill={H.sand} />
              <text x={c.x + 7} y={c.y + 42} fontSize="6" fontWeight="700" fill={H.turquoiseDeep}>Sponsorlu</text>
              <rect x={c.x + 7} y={c.y + 47} width="46" height="4.5" rx="2.2" fill={H.turquoise} opacity="0.85" />
              <rect x={c.x + 7} y={c.y + 56} width="50" height="3.5" rx="1.7" fill={H.sand} />
              <rect x={c.x + 7} y={c.y + 63} width="36" height="3.5" rx="1.7" fill={H.ivory} />
            </g>}
            {i === 1 && <g>
              {[0, 1].map(k => <g key={k}>
                <rect x={c.x + 6 + k * 29} y={c.y + 19} width="25" height="30" rx="5" fill="url(#gaLinen)" stroke={H.sand} />
                <polygon points={starPoints(c.x + 18.5 + k * 29, c.y + 34, 6, 3.2)} fill="none" stroke={H.turquoise} strokeWidth="1" opacity="0.7" />
                <rect x={c.x + 6 + k * 29} y={c.y + 54} width="22" height="3.5" rx="1.7" fill={H.sand} />
                <rect x={c.x + 6 + k * 29} y={c.y + 61} width="14" height="4" rx="2" fill={H.turquoise} />
              </g>)}
            </g>}
            {i === 2 && <g>
              {[Icon.search, Icon.play, Icon.mail, Icon.pin].map((draw, k) => {
                const cx = c.x + 20 + (k % 2) * 26, cy = c.y + 34 + Math.floor(k / 2) * 24;
                return <g key={k}><circle cx={cx} cy={cy} r="9" fill={H.turquoiseLight} />{draw(cx, cy, H.turquoiseDeep)}</g>;
              })}
            </g>}
          </g>
        </motion.g>
      </motion.g>)}

      {lines.map((d, i) => <motion.path key={d} d={d} fill="none" stroke={H.turquoise} strokeWidth="1.3" strokeDasharray="3 3" {...drawIn(0.9 + i * 0.1, 0.7)} />)}
      {lines.map((d, i) => <Travel key={d} active={active} d={d} delay={2.2 + i * 2} />)}

      {/* the account: one measurement line for every campaign */}
      <motion.g {...pop(1.2)}>
        <rect x="30" y="126" width="180" height="78" rx="12" fill={H.white} filter="url(#gaShadow)" />
        <motion.rect x="30" y="126" width="180" height="78" rx="12" fill="none" stroke={H.turquoise} strokeOpacity="0.4" strokeWidth="1.5" {...drawIn(1.2, 0.9)} />
        <path d="M30 138 a12 12 0 0 1 12 -12 h156 a12 12 0 0 1 12 12 z" fill={H.turquoiseLight} />
        {[40, 46, 52].map((cx, i) => <circle key={cx} cx={cx} cy="132" r="1.8" fill={i === 2 ? H.terracotta : H.turquoise} />)}
        <text x="60" y="134.3" fontSize="7" fontWeight="700" fill={H.lapisDeep}>Google Ads hesabınız</text>
        <circle cx="60" cy="170" r="20" fill="url(#gaCore)" />
        <motion.g {...loop(active, { rotate: [0, 45] }, 16)} style={center}>
          <polygon points={starPoints(60, 170, 14, 7.5)} fill="none" stroke={H.white} strokeWidth="1.5" />
        </motion.g>
        <circle cx="60" cy="170" r="4" fill={H.white} />
        <text x="92" y="152" fontSize="7" fontWeight="700" fill={H.lapisDeep}>Dönüşüm ölçümü</text>
        {rows.map((label, i) => <g key={label}>
          <text x="92" y={166 + i * 13} fontSize="6.5" fill={H.lapisDeep}>{label}</text>
          <motion.circle cx="196" cy={163.5 + i * 13} r="5" initial={false} {...flash(active, 3.6 + i * 2, 6, H.turquoise, H.saffron)} />
          <Check cx={196} cy={163.5 + i * 13} r={4.5} />
        </g>)}
      </motion.g>
      <Rail active={active} steps={steps} />
    </svg>
  </>}</Frame>;
}

// ── Performance Max: the original orbit/launch energy merged with one campaign feeding five channels ──
export function PerformanceMaxScene() {
  const cx = 120, cy = 104;
  const nodes = [
    { label: 'Arama', x: 120, y: 40, draw: Icon.search },
    { label: 'YouTube', x: 214, y: 82, draw: Icon.play },
    { label: 'Görüntülü', x: 196, y: 146, draw: Icon.photo },
    { label: 'Gmail', x: 44, y: 146, draw: Icon.mail },
    { label: 'Haritalar', x: 26, y: 82, draw: Icon.pin },
  ];
  const inputs = [['Hedef', 22, 50], ['Öğeler', 92, 56], ['Ürün verisi', 162, 60]] as const;
  const feeds = ['M47 192 C47 160 104 150 108 126', 'M120 192 L120 126', 'M192 192 C192 160 136 150 132 126'];
  return <Frame label="Temsili Performance Max kampanyası: hedef, reklam öğeleri ve ürün verisi tek kampanyada birleşiyor; kampanya Arama, YouTube, Görüntülü Reklam Ağı, Gmail ve Haritalar kanallarına ulaşıyor.">{active => <>
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs><Shadow id="pmShadow" /><Grad id="pmCore" from={H.turquoise} to={H.turquoiseDeep} /></defs>
      {/* orbit */}
      <motion.ellipse cx={cx} cy={cy} rx="96" ry="62" fill="none" stroke={H.turquoise} strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="4 5"
        {...drawIn(0.1, 1.2)} />
      <motion.ellipse cx={cx} cy={cy} rx="96" ry="62" fill="none" stroke={H.saffron} strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="10 290" initial={false}
        {...(active ? { animate: { strokeDashoffset: [0, -300] }, transition: { duration: 14, repeat: Infinity, ease: 'linear' } } : { animate: { strokeDashoffset: 0 }, transition: { duration: 0 } })} />
      {/* pulses from the campaign to each channel */}
      {nodes.map((n, i) => <g key={n.label}>
        <motion.path d={`M${cx} ${cy} L${n.x} ${n.y}`} stroke={H.turquoise} strokeOpacity="0.18" strokeWidth="1" {...drawIn(1 + i * 0.08, 0.5)} />
        <Travel active={active} d={`M${cx} ${cy} L${n.x} ${n.y}`} delay={2.4 + i * 1.2} duration={1.1} period={6} />
      </g>)}
      {nodes.map((n, i) => <motion.g key={n.label} {...pop(0.6 + i * 0.12)}>
        <motion.circle cx={n.x} cy={n.y} r="14" fill="none" stroke={H.turquoise} initial={false} style={center}
          animate={active ? { scale: [1, 1, 1.45, 1.45], opacity: [0, 0.8, 0, 0] } : { scale: 1, opacity: 0 }}
          transition={active ? { duration: 6, delay: 2.4 + i * 1.2 + 0.9, repeat: Infinity, times: [0, 0.02, 0.2, 1] } : { duration: 0 }} />
        <circle cx={n.x} cy={n.y} r="13" fill={H.white} stroke={H.turquoise} strokeOpacity="0.45" filter="url(#pmShadow)" />
        {n.draw(n.x, n.y, H.turquoiseDeep)}
        <text x={n.x} y={n.y + 22} textAnchor="middle" fontSize="6.5" fontWeight="700" fill={H.lapisDeep}>{n.label}</text>
      </motion.g>)}
      {/* the campaign */}
      <motion.g {...pop(0.3)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 8)}>
          <rect x="78" y="84" width="84" height="40" rx="11" fill="url(#pmCore)" filter="url(#pmShadow)" />
          <motion.g {...loop(active, { rotate: [0, 45] }, 16)} style={center}>
            <polygon points={starPoints(96, 104, 10, 5.5)} fill="none" stroke={H.white} strokeWidth="1.4" />
          </motion.g>
          <circle cx="96" cy="104" r="3" fill={H.saffron} />
          <text x="111" y="101" fontSize="7.5" fontWeight="800" fill={H.white}>Performance</text>
          <text x="111" y="112" fontSize="7.5" fontWeight="800" fill={H.white}>Max</text>
        </motion.g>
      </motion.g>
      {/* inputs rising into the campaign */}
      {feeds.map((d, i) => <motion.path key={d} d={d} fill="none" stroke={H.saffron} strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="3 3" {...drawIn(1.4 + i * 0.1, 0.7)} />)}
      {feeds.map((d, i) => <Travel key={d} active={active} d={d} delay={1.6 + i * 0.4} duration={1.2} period={6} color={H.terracotta} r={2.6} />)}
      {inputs.map(([label, x, w], i) => <motion.g key={label} {...riseIn(1.6 + i * 0.12)}>
        <rect x={x} y="192" width={w} height="18" rx="6" fill={H.ivory} stroke={H.sand} />
        <text x={x + w / 2} y="203.8" textAnchor="middle" fontSize="7" fontWeight="700" fill={H.lapisDeep}>{label}</text>
      </motion.g>)}
    </svg>
  </>}</Frame>;
}

// ── Google Alışveriş: the original product grid / checkout look merged with the product pipeline ──
export function GoogleShoppingScene() {
  const fields = ['id', 'fiyat', 'stok', 'görsel'];
  const d1 = 'M40 122 C40 134 48 137 60 137';
  const d2 = 'M180 137 C198 140 194 156 178 164';
  const d3 = 'M122 196 C116 196 114 190 110 189';
  const steps = [['Ürün', 22, 34], ['Ürün verisi', 62, 54], ['Reklam', 122, 40], ['Satın alma', 168, 50]] as const;
  return <Frame label="Temsili keten masa örtüsü: mağaza sayfasındaki ürün Merchant Center kaydına, oradan Alışveriş reklamına taşınıyor ve satın alma ölçülüyor.">{active => <>
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs><Shadow id="gsShadow" /><Linen id="gsLinen" /></defs>
      {/* store product page */}
      <motion.g {...pop(0.2)}>
        <motion.g {...loop(active, { y: [0, -2.5, 0] }, 8)}>
          <g transform="rotate(-4 58 70)">
            <rect x="12" y="16" width="94" height="106" rx="12" fill={H.white} filter="url(#gsShadow)" />
            <motion.rect x="12" y="16" width="94" height="106" rx="12" fill="none" stroke={H.sand} strokeWidth="1.5" {...drawIn(0.1, 0.9)} />
            <text x="20" y="29" fontSize="7" fontWeight="700" fill={H.lapisDeep}>Mağaza</text>
            <rect x="20" y="34" width="78" height="40" rx="7" fill="url(#gsLinen)" stroke={H.sand} />
            <motion.g {...loop(active, { rotate: [0, 45] }, 18)} style={center}>
              <polygon points={starPoints(59, 54, 12, 6.5)} fill="none" stroke={H.turquoise} strokeWidth="1.3" opacity="0.75" />
            </motion.g>
            <text x="20" y="84" fontSize="6.5" fontWeight="700" fill={H.lapisDeep}>Keten masa örtüsü</text>
            <text x="20" y="93" fontSize="6" fill={H.lapis}>160 × 220</text>
            {['#cbbf9d', H.turquoise, H.lapis].map((c, i) => <circle key={c} cx={23 + i * 8} cy="104" r="2.8" fill={c} />)}
            <rect x="66" y="97" width="32" height="13" rx="6.5" fill={H.terracotta} />
            <text x="82" y="106" textAnchor="middle" fontSize="6.5" fontWeight="700" fill={H.white}>Stokta</text>
          </g>
        </motion.g>
      </motion.g>
      {/* Merchant Center record */}
      <motion.g {...pop(0.6)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 9, 0.8)}>
          <rect x="60" y="114" width="120" height="46" rx="10" fill={H.white} stroke={H.turquoise} strokeOpacity="0.4" filter="url(#gsShadow)" />
          <text x="68" y="127" fontSize="7" fontWeight="700" fill={H.lapisDeep}>Merchant Center</text>
          {fields.map((f, i) => <g key={f}>
            <text x={68 + i * 28} y="141" fontSize="6.5" fill={H.lapisDeep}>{f}</text>
            <motion.circle cx={73 + i * 28} cy="151" r="4.5" initial={false} {...flash(active, 2.6 + i * 0.25, 6, H.turquoise, H.saffron)} />
            <motion.g {...pop(1.2 + i * 0.12)}><Check cx={73 + i * 28} cy={151} r={4} /></motion.g>
          </g>)}
        </motion.g>
      </motion.g>
      {/* Shopping ad */}
      <motion.g {...pop(1)}>
        <motion.g {...loop(active, { y: [0, -2.5, 0] }, 8, 1.6)}>
          <rect x="120" y="164" width="104" height="52" rx="10" fill={H.white} filter="url(#gsShadow)" />
          <motion.rect x="120" y="164" width="104" height="52" rx="10" fill="none" stroke={H.sand} strokeWidth="1.5" {...drawIn(1, 0.8)} />
          <text x="128" y="176" fontSize="6.8" fontWeight="700" fill={H.lapisDeep}>Alışveriş reklamı</text>
          <rect x="128" y="181" width="26" height="28" rx="5" fill="url(#gsLinen)" stroke={H.sand} />
          <text x="160" y="190" fontSize="6" fontWeight="700" fill={H.lapisDeep}>Keten masa örtüsü</text>
          <rect x="160" y="194" width="30" height="5" rx="2.5" fill={H.turquoise} />
          <text x="160" y="207" fontSize="6" fill={H.lapis}>magazaniz.com</text>
        </motion.g>
      </motion.g>
      {/* purchase measured */}
      <motion.g {...pop(1.5)}>
        <rect x="12" y="178" width="98" height="22" rx="11" fill={H.white} stroke={H.turquoise} strokeOpacity="0.45" filter="url(#gsShadow)" />
        <motion.circle cx="24" cy="189" r="7" initial={false} {...flash(active, 4.6, 6, H.turquoise, H.turquoiseDeep)} />
        <Check cx={24} cy={189} r={6} />
        <text x="36" y="191.5" fontSize="7" fontWeight="600" fill={H.lapisDeep}>Satın alma ölçüldü</text>
      </motion.g>
      {[d1, d2, d3].map((d, i) => <motion.path key={d} d={d} fill="none" stroke={H.turquoise} strokeWidth="1.3" strokeDasharray="3 3" {...drawIn(1.2 + i * 0.2, 0.6)} />)}
      {[d1, d2, d3].map((d, i) => <Travel key={d} active={active} d={d} delay={2 + i * 1.3} duration={1.1} />)}
      <Rail active={active} steps={steps} start={3.2} />
    </svg>
  </>}</Frame>;
}

// ── Kurumsal web sitesi: the original browser-window scene merged with the assembled page ──────
export function CorporateSiteScene({ locale = 'tr' }: { locale?: 'tr' | 'en' }) {
  const t = locale === 'tr'
    ? { label: 'Temsili kurumsal web sitesi: menü, tanıtım alanı, hizmetler, referanslar ve iletişim formu bir araya geliyor; aynı sayfa mobilde de görünüyor ve içerik yönetim panelinden düzenleniyor.', url: 'firmaniz.com', hero: 'İşletmeniz', services: 'Hizmetler', form: 'İletişim', cms: 'Yönetim paneli' }
    : { label: 'Illustrative company website: navigation, introduction, services, references and a contact form come together; the same page works on mobile and is edited from the content management panel.', url: 'yourcompany.com', hero: 'Your business', services: 'Services', form: 'Contact', cms: 'Content management' };
  const block = (delay: number) => ({ initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } });
  return <Frame label={t.label}>{active => <>
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs><Shadow id="cwShadow" /><Grad id="cwHero" from={H.turquoise} to={H.lapis} /></defs>
      {/* browser */}
      <motion.g {...loop(active, { y: [0, -2, 0] }, 9)}>
        <rect x="12" y="16" width="164" height="182" rx="12" fill={H.white} filter="url(#cwShadow)" />
        <motion.rect x="12" y="16" width="164" height="182" rx="12" fill="none" stroke={H.sand} strokeWidth="1.5" {...drawIn(0.1, 1)} />
        <path d="M12 28 a12 12 0 0 1 12 -12 h140 a12 12 0 0 1 12 12 z" fill={H.ivory} />
        {[22, 28, 34].map((cx, i) => <circle key={cx} cx={cx} cy="22" r="1.8" fill={i === 2 ? H.terracotta : H.turquoise} />)}
        <rect x="44" y="18" width="80" height="8" rx="4" fill={H.white} stroke={H.sand} />
        <text x="84" y="24.2" textAnchor="middle" fontSize="5.8" fill={H.lapis}>{t.url}</text>
        {/* menu */}
        <motion.g {...block(0.5)}>
          <rect x="20" y="34" width="10" height="7" rx="2" fill={H.turquoise} />
          {[0, 1, 2, 3].map(k => <rect key={k} x={96 + k * 18} y="36" width="13" height="3" rx="1.5" fill={H.sand} />)}
        </motion.g>
        {/* hero block */}
        <motion.g {...block(0.7)}>
          <rect x="20" y="46" width="148" height="46" rx="8" fill="url(#cwHero)" />
          <text x="28" y="61" fontSize="8" fontWeight="800" fill={H.white}>{t.hero}</text>
          <motion.rect x="28" y="66" height="4" rx="2" fill={H.white} opacity="0.85" initial={false} style={{ width: 70 }}
            {...(active ? { animate: { width: [70, 46, 46, 70] }, transition: { duration: 9, delay: 3, repeat: Infinity, times: [0, 0.15, 0.6, 0.75] } } : { animate: { width: 70 }, transition: { duration: 0 } })} />
          <rect x="28" y="74" width="50" height="3" rx="1.5" fill={H.white} opacity="0.5" />
          <rect x="28" y="81" width="30" height="7" rx="3.5" fill={H.saffron} />
          <motion.g {...loop(active, { rotate: [0, 45] }, 18)} style={center}>
            <polygon points={starPoints(146, 69, 15, 8)} fill="none" stroke={H.white} strokeWidth="1.5" opacity="0.85" />
          </motion.g>
          <circle cx="146" cy="69" r="4" fill={H.white} opacity="0.9" />
        </motion.g>
        {/* services */}
        <motion.g {...block(0.9)}>
          <text x="20" y="104" fontSize="6.5" fontWeight="700" fill={H.lapisDeep}>{t.services}</text>
          {[0, 1, 2].map(k => <g key={k}>
            <rect x={20 + k * 50} y="108" width="46" height="30" rx="6" fill={H.ivory} stroke={H.sand} />
            <circle cx={30 + k * 50} cy="118" r="4.5" fill={H.turquoiseLight} />
            <rect x={26 + k * 50} y="127" width="32" height="3" rx="1.5" fill={H.sand} />
          </g>)}
        </motion.g>
        {/* references */}
        <motion.g {...block(1.1)}>
          {[0, 1, 2, 3].map(k => <rect key={k} x={24 + k * 37} y="145" width="28" height="9" rx="4.5" fill="none" stroke={H.sand} strokeDasharray="2 2" />)}
        </motion.g>
        {/* contact form */}
        <motion.g {...block(1.3)}>
          <text x="20" y="168" fontSize="6.5" fontWeight="700" fill={H.lapisDeep}>{t.form}</text>
          <rect x="20" y="172" width="92" height="10" rx="3" fill="none" stroke={H.sand} />
          <rect x="116" y="172" width="34" height="10" rx="5" fill={H.terracotta} />
        </motion.g>
      </motion.g>
      {/* phone: the same page stacked */}
      <motion.g {...pop(1.5)}>
        <motion.g {...loop(active, { y: [0, -3, 0] }, 7, 1)}>
          <rect x="166" y="58" width="62" height="118" rx="12" fill={H.white} stroke={H.lapisDeep} strokeWidth="2" filter="url(#cwShadow)" />
          <rect x="188" y="63" width="18" height="3" rx="1.5" fill={H.lapisDeep} />
          <rect x="172" y="72" width="50" height="28" rx="5" fill="url(#cwHero)" />
          <rect x="177" y="80" width="28" height="3" rx="1.5" fill={H.white} />
          <rect x="177" y="88" width="18" height="5" rx="2.5" fill={H.saffron} />
          {[0, 1].map(k => <g key={k}><rect x="172" y={106 + k * 20} width="50" height="16" rx="4" fill={H.ivory} stroke={H.sand} /><circle cx="180" cy={114 + k * 20} r="3.5" fill={H.turquoiseLight} /></g>)}
          <rect x="172" y="150" width="50" height="8" rx="3" fill="none" stroke={H.sand} />
          <rect x="172" y="161" width="24" height="8" rx="4" fill={H.terracotta} />
        </motion.g>
      </motion.g>
      {/* content management edits the hero text */}
      <motion.g initial={false} style={center}
        {...(active ? { animate: { opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.6] }, transition: { duration: 9, delay: 3, repeat: Infinity, times: [0, 0.1, 0.65, 0.75] } } : { animate: { opacity: 0, scale: 0.6 }, transition: { duration: 0 } })}>
        <circle cx="106" cy="66" r="7" fill={H.saffron} />
        {Icon.pencil(106, 66, H.white)}
      </motion.g>
      <motion.g {...pop(1.7)}>
        <rect x="20" y="206" width="122" height="22" rx="11" fill={H.white} stroke={H.turquoise} strokeOpacity="0.45" filter="url(#cwShadow)" />
        <circle cx="33" cy="217" r="7" fill={H.turquoise} />
        {Icon.pencil(33, 217, H.white)}
        <text x="45" y="219.5" fontSize="7" fontWeight="600" fill={H.lapisDeep}>{t.cms}</text>
      </motion.g>
    </svg>
  </>}</Frame>;
}

// ── Small extra icons for the commerce scenes ─────────────────────────────────────────────────
const Icon2 = {
  card: (cx: number, cy: number, c: string) => <g fill="none" stroke={c} strokeWidth="1.4"><rect x={cx - 6} y={cy - 4} width="12" height="8.5" rx="1.5" /><path d={`M${cx - 6} ${cy - 1} H${cx + 6}`} /></g>,
  box: (cx: number, cy: number, c: string) => <g fill="none" stroke={c} strokeWidth="1.4" strokeLinejoin="round"><path d={`M${cx - 6} ${cy - 3} l6 -3 l6 3 v7 l-6 3 l-6 -3 z M${cx - 6} ${cy - 3} l6 3 l6 -3 M${cx} ${cy} v7`} /></g>,
  db: (cx: number, cy: number, c: string) => <g fill="none" stroke={c} strokeWidth="1.4"><ellipse cx={cx} cy={cy - 4} rx="5.5" ry="2" /><path d={`M${cx - 5.5} ${cy - 4} v8 c0 2.6 11 2.6 11 0 v-8 M${cx - 5.5} ${cy} c0 2.6 11 2.6 11 0`} /></g>,
  cart: (cx: number, cy: number, c: string) => <g fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={`M${cx - 6} ${cy - 5} h2 l2 7 h7 l1.5 -5 h-9.5`} /><circle cx={cx - 1} cy={cy + 4.5} r="1" /><circle cx={cx + 4} cy={cy + 4.5} r="1" /></g>,
  sync: (cx: number, cy: number, c: string) => <g fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round"><path d={`M${cx - 4.5} ${cy - 1} a4.6 4.6 0 0 1 8 -2.4 M${cx + 4.5} ${cy + 1} a4.6 4.6 0 0 1 -8 2.4`} /><path d={`M${cx + 3.6} ${cy - 5.4} v2.4 h-2.4 M${cx - 3.6} ${cy + 5.4} v-2.4 h2.4`} /></g>,
};
function SmallStar({ cx, cy }: { cx: number; cy: number }) { return <polygon points={starPoints(cx, cy, 2.6, 1.2)} fill={H.saffron} />; }
/** Border flash on a card, once per period (rail-like highlight on the card itself). */
function edge(active: boolean, delay: number, period = 9) {
  return active
    ? { animate: { stroke: [H.sand, H.turquoise, H.turquoise, H.sand] }, transition: { duration: period, delay, repeat: Infinity, times: [0, 0.06, 0.22, 0.3] } }
    : { animate: { stroke: H.sand }, transition: { duration: 0 } };
}

// ── E-Ticaret SEO: the original SERP climb merged with the search → category → product journey ──
export function EcommerceSeoScene() {
  const rows = [46, 70, 94, 118];
  const journey = [{ title: 'Arama', x: 12 }, { title: 'Kategori', x: 88 }, { title: 'Ürün', x: 164 }];
  const hops = ['M64 164 C72 151 92 151 100 164', 'M140 164 C148 151 168 151 176 164'];
  return <Frame label="Temsili e-ticaret arama sonucu: yürüyüş ayakkabısı aramasında mağazanın ürün sonucu üst sıraya çıkıyor; ziyaretçi aramadan kategori sayfasına, oradan ürün sayfasına ilerliyor.">{active => <>
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs><Shadow id="esShadow" /><Grad id="esProd" from={H.turquoiseLight} to={H.turquoise} /></defs>
      <motion.g {...loop(active, { y: [0, -2, 0] }, 9)}>
        <rect x="12" y="18" width="216" height="126" rx="12" fill={H.white} filter="url(#esShadow)" />
        <motion.rect x="12" y="18" width="216" height="126" rx="12" fill="none" stroke={H.sand} strokeWidth="1.5" {...drawIn(0.1, 1)} />
        <path d="M12 40 v-10 a12 12 0 0 1 12 -12 h192 a12 12 0 0 1 12 12 v10 z" fill={H.ivory} />
        {Icon.search(26, 29, H.turquoiseDeep)}
        <rect x="36" y="22" width="122" height="14" rx="7" fill={H.white} stroke={H.sand} />
        <text x="44" y="31.6" fontSize="7" fontWeight="700" fill={H.lapisDeep}>yürüyüş ayakkabısı</text>
        <motion.rect x="43" y="24" height="10" fill={H.white} initial={{ width: 110 }} animate={{ width: 0 }} transition={{ delay: 0.4, duration: 0.9, ease: 'linear' }} />
        {rows.map((y, i) => <g key={y}>
          <rect x="22" y={y} width="196" height="20" rx="5" fill={H.ivory} />
          <rect x="27" y={y + 4} width="12" height="12" rx="2.5" fill={H.sand} />
          <rect x="45" y={y + 5} width={110 - i * 14} height="3.5" rx="1.7" fill={H.sand} />
          <rect x="45" y={y + 12} width="60" height="3" rx="1.5" fill={H.sand} opacity="0.6" />
        </g>)}
        {/* the store's product result climbs to the top */}
        <motion.g initial={{ y: 72 }} animate={{ y: [72, 48, 24, 0] }} transition={{ delay: 1.2, duration: 2.6, times: [0, 0.35, 0.7, 1], ease: 'easeInOut' }}>
          <rect x="18" y="43" width="204" height="26" rx="6" fill={H.white} stroke={H.turquoise} strokeWidth="1.4" filter="url(#esShadow)" />
          <rect x="24" y="48" width="16" height="16" rx="3" fill={H.turquoiseLight} />
          {Icon2.box(32, 56, H.turquoiseDeep)}
          <text x="46" y="53.5" fontSize="6.3" fontWeight="700" fill={H.turquoiseDeep}>magazaniz.com › yürüyüş ayakkabısı</text>
          {[0, 1, 2, 3, 4].map(k => <SmallStar key={k} cx={49 + k * 6} cy={62} />)}
          <rect x="80" y="57" width="28" height="9" rx="4.5" fill={H.turquoiseLight} />
          <text x="94" y="63.4" textAnchor="middle" fontSize="6" fontWeight="700" fill={H.turquoiseDeep}>Stokta</text>
          <motion.g {...pop(3.9)}>
            <rect x="180" y="50" width="36" height="13" rx="6.5" fill={H.saffron} />
            <text x="198" y="59" textAnchor="middle" fontSize="6.5" fontWeight="800" fill={H.white}>↑ 1. sıra</text>
          </motion.g>
        </motion.g>
      </motion.g>
      {/* search → category → product */}
      {hops.map((d, i) => <motion.path key={d} d={d} fill="none" stroke={H.turquoise} strokeWidth="1.3" strokeDasharray="3 3" {...drawIn(4.2 + i * 0.2, 0.5)} />)}
      {hops.map((d, i) => <Travel key={d} active={active} d={d} delay={5 + i * 1.5} duration={1.1} period={9} />)}
      {journey.map((c, i) => <motion.g key={c.title} {...pop(4 + i * 0.15)}>
        <rect x={c.x} y="164" width="64" height="56" rx="9" fill={H.white} filter="url(#esShadow)" />
        <motion.rect x={c.x} y="164" width="64" height="56" rx="9" fill="none" strokeWidth="1.5" initial={false} {...edge(active, 4.6 + i * 1.5)} />
        <text x={c.x + 7} y="176" fontSize="7" fontWeight="700" fill={H.lapisDeep}>{c.title}</text>
        {i === 0 && <g><rect x={c.x + 6} y="182" width="52" height="10" rx="5" fill="none" stroke={H.sand} />{Icon.search(c.x + 13, 187, H.turquoise)}<rect x={c.x + 6} y="198" width="44" height="3.5" rx="1.7" fill={H.turquoise} opacity="0.8" /><rect x={c.x + 6} y="206" width="36" height="3" rx="1.5" fill={H.sand} /></g>}
        {i === 1 && <g>{[0, 1, 2, 3].map(k => <rect key={k} x={c.x + 6 + (k % 2) * 27} y={181 + Math.floor(k / 2) * 18} width="24" height="15" rx="3" fill={k === 0 ? H.turquoiseLight : H.ivory} stroke={H.sand} />)}</g>}
        {i === 2 && <g>
          <rect x={c.x + 6} y="181" width="26" height="30" rx="4" fill="url(#esProd)" />
          <polygon points={starPoints(c.x + 19, 196, 7, 3.6)} fill="none" stroke={H.white} strokeWidth="1.1" />
          <rect x={c.x + 36} y="183" width="22" height="3" rx="1.5" fill={H.sand} />
          <rect x={c.x + 36} y="190" width="22" height="8" rx="4" fill={H.turquoiseLight} />
          <text x={c.x + 47} y="195.6" textAnchor="middle" fontSize="5.4" fontWeight="700" fill={H.turquoiseDeep}>Stokta</text>
          <rect x={c.x + 36} y="202" width="22" height="8" rx="4" fill={H.terracotta} />
        </g>}
      </motion.g>)}
    </svg>
  </>}</Frame>;
}

// ── Teknik SEO: the original 404 → 301 → 200 audit merged with a crawl of the site map ──────────
export function TechnicalSeoScene() {
  const period = 9;
  const crawl = 'M32 74 L32 88 L48 88 L32 88 L32 106 L48 106 L32 106 L32 124 L48 124';
  const pages = [['/hizmetler', 88], ['/blog', 106], ['/eski-sayfa', 124]] as const;
  const status = [
    { code: '404', text: 'Bulunamadı', bg: '#fbe9e4', fg: H.terracotta, op: [1, 1, 0, 0], times: [0, 0.32, 0.34, 1], still: 0 },
    { code: '301', text: 'Yönlendirme', bg: '#fbefd9', fg: '#a8661a', op: [0, 0, 1, 1, 0, 0], times: [0, 0.32, 0.34, 0.65, 0.67, 1], still: 0 },
    { code: '200', text: 'İndekslenebilir', bg: H.turquoiseLight, fg: H.turquoiseDeep, op: [0, 0, 1, 1], times: [0, 0.65, 0.67, 1], still: 1 },
  ];
  const vitals = [['LCP', 0.78, H.turquoise], ['INP', 0.62, H.saffron], ['CLS', 0.86, H.turquoise]] as const;
  const steps = ['Tara', 'Önceliklendir', 'Doğrula'];
  return <Frame label="Temsili teknik SEO incelemesi: site haritasındaki sayfalar taranıyor; bulunamayan eski sayfa yönlendirilip indekslenebilir hale geliyor; Core Web Vitals değerleri izleniyor; tara, önceliklendir ve doğrula adımları.">{active => <>
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs><Shadow id="tsShadow" /></defs>
      <motion.g {...loop(active, { y: [0, -2, 0] }, 9)}>
        <rect x="12" y="20" width="216" height="134" rx="12" fill={H.white} filter="url(#tsShadow)" />
        <motion.rect x="12" y="20" width="216" height="134" rx="12" fill="none" stroke={H.sand} strokeWidth="1.5" {...drawIn(0.1, 1)} />
        <path d="M12 42 v-10 a12 12 0 0 1 12 -12 h192 a12 12 0 0 1 12 12 v10 z" fill={H.ivory} />
        {Icon.search(26, 31, H.turquoiseDeep)}
        <rect x="36" y="24" width="130" height="14" rx="7" fill={H.white} stroke={H.sand} />
        <text x="44" y="33.4" fontSize="6.6" fontFamily="ui-monospace, monospace" fill={H.lapisDeep}>siteniz.com/hizmetler/web</text>
        {/* site map crawl */}
        <motion.g {...pop(0.5)}>
          <rect x="20" y="48" width="86" height="98" rx="8" fill={H.ivory} />
          <text x="28" y="60" fontSize="6.6" fontWeight="700" fill={H.lapisDeep}>Site haritası</text>
          <path d="M32 74 V124 M32 88 H44 M32 106 H44 M32 124 H44" stroke={H.sand} strokeWidth="1.4" fill="none" />
          <circle cx="32" cy="72" r="4.5" fill={H.lapis} />
          <text x="40" y="74.4" fontSize="6" fill={H.lapisDeep}>/</text>
          {pages.map(([label, y], i) => <g key={label}>
            {i < 2 ? <circle cx="48" cy={y} r="4" fill={H.turquoise} /> : <motion.circle cx="48" cy={y} r="4" initial={false}
              {...(active ? { animate: { fill: [H.terracotta, H.terracotta, H.saffron, H.saffron, H.turquoise, H.turquoise] }, transition: { duration: period, repeat: Infinity, times: [0, 0.32, 0.34, 0.65, 0.67, 1], delay: 1 } } : { animate: { fill: H.turquoise }, transition: { duration: 0 } })} />}
            <text x="55" y={y + 2.3} fontSize="6" fontFamily="ui-monospace, monospace" fill={H.lapisDeep}>{label}</text>
          </g>)}
          <Travel active={active} d={crawl} delay={1} duration={3.2} period={period} color={H.saffron} />
        </motion.g>
        {/* URL status */}
        <motion.g {...pop(0.8)}>
          <rect x="112" y="48" width="108" height="40" rx="8" fill={H.ivory} />
          <text x="120" y="60" fontSize="6.6" fontWeight="700" fill={H.lapisDeep}>URL durumu</text>
          {status.map(s => <motion.g key={s.code} initial={false} {...(active ? { animate: { opacity: s.op }, transition: { duration: period, repeat: Infinity, times: s.times, delay: 1 } } : { animate: { opacity: s.still }, transition: { duration: 0 } })}>
            <rect x="120" y="66" width="92" height="15" rx="7.5" fill={s.bg} />
            <text x="128" y="76" fontSize="6.6" fontWeight="800" fontFamily="ui-monospace, monospace" fill={s.fg}>{s.code}</text>
            <text x="146" y="76" fontSize="6.4" fontWeight="600" fill={s.fg}>· {s.text}</text>
          </motion.g>)}
        </motion.g>
        {/* Core Web Vitals (representative) */}
        <motion.g {...pop(1)}>
          <rect x="112" y="94" width="108" height="52" rx="8" fill={H.ivory} />
          {vitals.map(([name, fill, color], i) => <g key={name}>
            <text x="120" y={109 + i * 13} fontSize="6.4" fontWeight="800" fill={H.lapisDeep}>{name}</text>
            <rect x="140" y={105 + i * 13} width="72" height="4.5" rx="2.2" fill={H.sand} />
            <motion.rect x="140" y={105 + i * 13} height="4.5" rx="2.2" fill={color} initial={{ width: 0 }} animate={{ width: 72 * fill }} transition={{ delay: 1.2 + i * 0.25, duration: 0.8 }} />
          </g>)}
        </motion.g>
      </motion.g>
      {/* Tara · Önceliklendir · Doğrula */}
      {steps.map((label, i) => <motion.g key={label} {...pop(1.6 + i * 0.15)}>
        <rect x={12 + i * 76} y="168" width="64" height="44" rx="9" fill={H.white} filter="url(#tsShadow)" />
        <motion.rect x={12 + i * 76} y="168" width="64" height="44" rx="9" fill="none" strokeWidth="1.5" initial={false} {...edge(active, 2 + i * 2)} />
        <circle cx={44 + i * 76} cy="183" r="7" fill={H.turquoiseDeep} />
        <text x={44 + i * 76} y="185.6" textAnchor="middle" fontSize="7" fontWeight="800" fill={H.white}>{i + 1}</text>
        <text x={44 + i * 76} y="203" textAnchor="middle" fontSize="6.8" fontWeight="700" fill={H.lapisDeep}>{label}</text>
        {i < 2 && <path d={`M${78 + i * 76} 190 l6 0 m-2.5 -2.5 l2.5 2.5 l-2.5 2.5`} stroke={H.turquoise} strokeWidth="1.3" fill="none" strokeLinecap="round" />}
      </motion.g>)}
    </svg>
  </>}</Frame>;
}

// ── Özel e-ticaret: the storefront merged with the admin rules and the integrations it talks to ──
export function CustomEcommerceScene() {
  const integrations = [{ label: 'Ödeme', x: 50, draw: Icon2.card }, { label: 'Kargo', x: 120, draw: Icon2.box }, { label: 'ERP', x: 190, draw: Icon2.db }];
  const order = 'M80 114 C96 114 104 104 118 100';
  const outs = integrations.map(n => `M173 126 C173 140 ${n.x} 136 ${n.x} 150`);
  const rules = [['Fiyat kuralı', 'Bayi fiyatı'], ['Stok akışı', 'Depo ile eş'], ['Sipariş', 'Onaylandı']];
  const steps = [['Vitrin', 19, 38], ['Yönetim', 63, 48], ['Entegrasyon', 117, 62], ['Yayın', 185, 36]] as const;
  return <Frame label="Temsili özel e-ticaret sitesi: vitrindeki sipariş yönetim paneline geliyor; fiyat kuralı ve stok akışı uygulanıyor; sipariş ödeme, kargo ve ERP sistemlerine aktarılıyor.">{active => <>
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs><Shadow id="ceShadow" /><Grad id="ceProd" from={H.terracotta} to={H.saffron} /></defs>
      {/* storefront */}
      <motion.g {...pop(0.2)}>
        <motion.g {...loop(active, { y: [0, -2.5, 0] }, 8)}>
          <rect x="12" y="18" width="96" height="118" rx="12" fill={H.white} filter="url(#ceShadow)" />
          <motion.rect x="12" y="18" width="96" height="118" rx="12" fill="none" stroke={H.sand} strokeWidth="1.5" {...drawIn(0.1, 0.9)} />
          <text x="20" y="31" fontSize="7" fontWeight="700" fill={H.lapisDeep}>Mağazanız</text>
          <rect x="20" y="36" width="80" height="44" rx="8" fill="url(#ceProd)" />
          <motion.g {...loop(active, { rotate: [0, 45] }, 18)} style={center}><polygon points={starPoints(60, 58, 13, 7)} fill="none" stroke={H.white} strokeWidth="1.5" /></motion.g>
          <circle cx="60" cy="58" r="3.5" fill={H.white} />
          <rect x="20" y="86" width="64" height="4" rx="2" fill={H.sand} />
          <rect x="20" y="94" width="34" height="5" rx="2.5" fill={H.turquoise} />
          <rect x="20" y="106" width="60" height="16" rx="8" fill={H.turquoise} />
          <text x="50" y="116.4" textAnchor="middle" fontSize="6.6" fontWeight="700" fill={H.white}>Sepete ekle</text>
        </motion.g>
      </motion.g>
      {/* admin panel */}
      <motion.g {...pop(0.6)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 9, 0.8)}>
          <rect x="118" y="30" width="110" height="96" rx="10" fill={H.white} stroke={H.turquoise} strokeOpacity="0.4" filter="url(#ceShadow)" />
          <path d="M118 42 a10 10 0 0 1 10 -12 h90 a10 10 0 0 1 10 12 z" fill={H.turquoiseLight} />
          <text x="126" y="39.5" fontSize="6.8" fontWeight="700" fill={H.lapisDeep}>Yönetim paneli</text>
          {rules.map(([title, value], i) => <g key={title}>
            <rect x="126" y={50 + i * 24} width="94" height="18" rx="5" fill={H.ivory} />
            <text x="132" y={61.5 + i * 24} fontSize="6.4" fontWeight="700" fill={H.lapisDeep}>{title}</text>
            <text x="214" y={61.5 + i * 24} textAnchor="end" fontSize="6" fill={H.turquoiseDeep}>{value}</text>
          </g>)}
        </motion.g>
      </motion.g>
      <motion.path d={order} fill="none" stroke={H.turquoise} strokeWidth="1.3" strokeDasharray="3 3" {...drawIn(1.1, 0.5)} />
      <Travel active={active} d={order} delay={2} duration={1} period={7} />
      {outs.map((d, i) => <motion.path key={d} d={d} fill="none" stroke={H.turquoise} strokeWidth="1.2" strokeDasharray="3 3" {...drawIn(1.3 + i * 0.1, 0.6)} />)}
      {outs.map((d, i) => <Travel key={d} active={active} d={d} delay={3.2 + i * 0.5} duration={1} period={7} color={H.terracotta} r={2.6} />)}
      {/* integrations */}
      {integrations.map((n, i) => <motion.g key={n.label} {...pop(1.5 + i * 0.12)}>
        <motion.circle cx={n.x} cy="166" r="15" fill="none" stroke={H.turquoise} initial={false} style={center}
          animate={active ? { scale: [1, 1, 1.4, 1.4], opacity: [0, 0.8, 0, 0] } : { scale: 1, opacity: 0 }}
          transition={active ? { duration: 7, delay: 4.1 + i * 0.5, repeat: Infinity, times: [0, 0.02, 0.2, 1] } : { duration: 0 }} />
        <circle cx={n.x} cy="166" r="14" fill={H.white} stroke={H.turquoise} strokeOpacity="0.45" filter="url(#ceShadow)" />
        {n.draw(n.x, 166, H.turquoiseDeep)}
        <text x={n.x} y="192" textAnchor="middle" fontSize="6.8" fontWeight="700" fill={H.lapisDeep}>{n.label}</text>
      </motion.g>)}
      <Rail active={active} steps={steps} start={3} />
    </svg>
  </>}</Frame>;
}

// ── Pazaryeri: sellers send products, the platform approves them, orders settle per seller ───────
export function MarketplaceScene() {
  const sellers = [{ label: 'Satıcı A', y: 24 }, { label: 'Satıcı B', y: 84 }];
  const ins = ['M82 46 C92 46 92 60 100 62', 'M82 106 C92 106 92 92 100 90'];
  const toOrder = 'M140 134 C140 146 100 142 92 154';
  const toLedger = 'M92 166 C100 166 104 166 112 166';
  const steps = [['Satıcı', 27, 40], ['Onay', 73, 36], ['Sipariş', 115, 44], ['Hakediş', 165, 48]] as const;
  return <Frame label="Temsili pazaryeri: satıcılar ürünlerini platforma gönderiyor, ürünler onaylanıyor; gelen sipariş her satıcı için hakediş kaydına dönüşüyor.">{active => <>
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs><Shadow id="mpShadow" /><Grad id="mpTile" from={H.turquoiseLight} to={H.turquoise} /></defs>
      {sellers.map((s, i) => <motion.g key={s.label} {...pop(0.2 + i * 0.15)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 7 + i, i)}>
          <rect x="12" y={s.y} width="70" height="46" rx="9" fill={H.white} filter="url(#mpShadow)" />
          <motion.rect x="12" y={s.y} width="70" height="46" rx="9" fill="none" stroke={H.sand} strokeWidth="1.4" {...drawIn(0.1 + i * 0.15, 0.8)} />
          <text x="19" y={s.y + 12} fontSize="6.8" fontWeight="700" fill={H.lapisDeep}>{s.label}</text>
          <rect x="19" y={s.y + 18} width="20" height="20" rx="4" fill={i ? H.ivory : H.turquoiseLight} stroke={H.sand} />
          <rect x="44" y={s.y + 21} width="30" height="3.5" rx="1.7" fill={H.sand} />
          <rect x="44" y={s.y + 29} width="20" height="4" rx="2" fill={H.turquoise} />
        </motion.g>
      </motion.g>)}
      {ins.map((d, i) => <motion.path key={d} d={d} fill="none" stroke={H.turquoise} strokeWidth="1.3" strokeDasharray="3 3" {...drawIn(0.9 + i * 0.1, 0.5)} />)}
      {ins.map((d, i) => <Travel key={d} active={active} d={d} delay={1.8 + i * 0.8} duration={1} period={7} />)}
      {/* the platform */}
      <motion.g {...pop(0.5)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 9, 0.5)}>
          <rect x="100" y="14" width="128" height="120" rx="12" fill={H.white} stroke={H.turquoise} strokeOpacity="0.4" filter="url(#mpShadow)" />
          <path d="M100 28 a12 12 0 0 1 12 -14 h104 a12 12 0 0 1 12 14 z" fill={H.turquoiseLight} />
          <text x="110" y="24.5" fontSize="7" fontWeight="700" fill={H.lapisDeep}>Pazaryeriniz</text>
          {[0, 1, 2, 3].map(k => <g key={k}>
            <rect x={108 + (k % 2) * 58} y={34 + Math.floor(k / 2) * 40} width="54" height="34" rx="6" fill={k === 0 ? 'url(#mpTile)' : H.ivory} stroke={H.sand} />
            <polygon points={starPoints(122 + (k % 2) * 58, 51 + Math.floor(k / 2) * 40, 7, 3.8)} fill="none" stroke={k === 0 ? H.white : H.turquoise} strokeWidth="1.1" opacity={k === 0 ? 1 : 0.6} />
            <rect x={134 + (k % 2) * 58} y={46 + Math.floor(k / 2) * 40} width="22" height="3" rx="1.5" fill={k === 0 ? H.white : H.sand} />
            <rect x={134 + (k % 2) * 58} y={53 + Math.floor(k / 2) * 40} width="14" height="4" rx="2" fill={k === 0 ? H.white : H.turquoise} opacity="0.9" />
          </g>)}
          <motion.g initial={false} style={center} {...(active ? { animate: { opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 0.7] }, transition: { duration: 7, delay: 2.8, repeat: Infinity, times: [0, 0.08, 0.45, 0.55] } } : { animate: { opacity: 1, scale: 1 }, transition: { duration: 0 } })}>
            <rect x="112" y="116" width="76" height="13" rx="6.5" fill={H.white} stroke={H.turquoise} />
            <Check cx={121} cy={122.5} r={5} color={H.turquoise} />
            <text x="128" y="125" fontSize="6.4" fontWeight="700" fill={H.turquoiseDeep}>Ürün onaylandı</text>
          </motion.g>
        </motion.g>
      </motion.g>
      {/* order → settlement */}
      <motion.path d={toOrder} fill="none" stroke={H.saffron} strokeWidth="1.3" strokeDasharray="3 3" {...drawIn(1.4, 0.5)} />
      <Travel active={active} d={toOrder} delay={3.8} duration={1} period={7} color={H.terracotta} r={2.6} />
      <motion.g {...pop(1.4)}>
        <rect x="14" y="154" width="78" height="24" rx="12" fill={H.white} stroke={H.turquoise} strokeOpacity="0.45" filter="url(#mpShadow)" />
        <circle cx="27" cy="166" r="7.5" fill={H.turquoiseLight} />
        {Icon2.cart(27, 166, H.turquoiseDeep)}
        <text x="40" y="168.5" fontSize="7" fontWeight="700" fill={H.lapisDeep}>Sipariş</text>
      </motion.g>
      <motion.path d={toLedger} fill="none" stroke={H.saffron} strokeWidth="1.3" strokeDasharray="3 3" {...drawIn(1.6, 0.3)} />
      <motion.g {...pop(1.7)}>
        <rect x="112" y="146" width="116" height="54" rx="10" fill={H.white} filter="url(#mpShadow)" />
        <motion.rect x="112" y="146" width="116" height="54" rx="10" fill="none" stroke={H.sand} strokeWidth="1.4" {...drawIn(1.7, 0.7)} />
        <text x="120" y="159" fontSize="7" fontWeight="700" fill={H.lapisDeep}>Hakediş hazır</text>
        {['Satıcı A', 'Satıcı B'].map((label, i) => <g key={label}>
          <rect x="120" y={164 + i * 16} width="100" height="12" rx="4" fill={H.ivory} />
          <text x="126" y={172.4 + i * 16} fontSize="6.2" fill={H.lapisDeep}>{label}</text>
          <motion.circle cx="212" cy={170 + i * 16} r="4.6" initial={false} {...flash(active, 4.9 + i * 0.4, 7, H.turquoise, H.saffron)} />
          <Check cx={212} cy={170 + i * 16} r={4.2} />
        </g>)}
      </motion.g>
      <Rail active={active} steps={steps} start={3} />
    </svg>
  </>}</Frame>;
}

// ── Shopify: the storefront merged with theme, catalogue, migration and apps ────────────────────
export function ShopifyScene() {
  const migrate = 'M64 188 C90 188 96 172 100 162';
  const steps = [['Tema', 18, 34], ['Katalog', 58, 46], ['Taşıma', 110, 42], ['Uygulamalar', 158, 64]] as const;
  return <Frame label="Temsili Shopify mağazası: tema, katalog, eski mağazadan veri taşıma ve uygulamalar birlikte hazırlanıyor; mağaza mobilde de çalışıyor.">{active => <>
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs><Shadow id="shShadow" /><Grad id="shHero" from={H.turquoise} to={H.turquoiseDeep} /><Grad id="shProd" from={H.terracotta} to={H.saffron} /></defs>
      <motion.g {...loop(active, { y: [0, -2, 0] }, 9)}>
        <rect x="12" y="14" width="160" height="150" rx="12" fill={H.white} filter="url(#shShadow)" />
        <motion.rect x="12" y="14" width="160" height="150" rx="12" fill="none" stroke={H.sand} strokeWidth="1.5" {...drawIn(0.1, 1)} />
        <path d="M12 26 a12 12 0 0 1 12 -12 h136 a12 12 0 0 1 12 12 z" fill={H.ivory} />
        {[22, 28, 34].map((cx, i) => <circle key={cx} cx={cx} cy="20" r="1.8" fill={i === 2 ? H.terracotta : H.turquoise} />)}
        <rect x="44" y="16.5" width="70" height="7" rx="3.5" fill={H.white} stroke={H.sand} />
        <text x="79" y="22" textAnchor="middle" fontSize="5.6" fill={H.lapis}>magazaniz.com</text>
        <rect x="128" y="16" width="38" height="8" rx="4" fill={H.turquoiseLight} />
        <text x="147" y="22" textAnchor="middle" fontSize="5.8" fontWeight="700" fill={H.turquoiseDeep}>Shopify</text>
        {/* theme banner */}
        <motion.g {...riseIn(0.5)}>
          <motion.rect x="20" y="32" width="144" height="42" rx="8" fill="url(#shHero)" {...loop(active, { opacity: [1, 0.82, 1] }, 8, 3)} />
          <rect x="28" y="44" width="56" height="5" rx="2.5" fill={H.white} />
          <rect x="28" y="53" width="40" height="3" rx="1.5" fill={H.white} opacity="0.6" />
          <rect x="28" y="61" width="28" height="7" rx="3.5" fill={H.saffron} />
          <motion.g {...loop(active, { rotate: [0, 45] }, 18)} style={center}><polygon points={starPoints(140, 53, 13, 7)} fill="none" stroke={H.white} strokeWidth="1.4" opacity="0.85" /></motion.g>
        </motion.g>
        {/* catalogue */}
        {[0, 1, 2].map(k => <motion.g key={k} {...pop(0.8 + k * 0.12)}>
          <rect x={20 + k * 49} y="82" width="44" height="54" rx="6" fill={H.ivory} stroke={H.sand} />
          <rect x={25 + k * 49} y="87" width="34" height="26" rx="4" fill={k === 0 ? 'url(#shProd)' : H.turquoiseLight} />
          <rect x={25 + k * 49} y="118" width="28" height="3" rx="1.5" fill={H.sand} />
          <rect x={25 + k * 49} y="125" width="16" height="4" rx="2" fill={H.turquoise} />
        </motion.g>)}
        <rect x="20" y="144" width="80" height="12" rx="3" fill="none" stroke={H.sand} />
        <rect x="104" y="144" width="40" height="12" rx="6" fill={H.terracotta} />
      </motion.g>
      {/* apps */}
      {[0, 1, 2].map(k => <motion.g key={k} {...pop(1.2 + k * 0.1)}>
        <motion.g {...loop(active, { y: [0, -3, 0] }, 6, k * 0.7)}>
          <rect x={180 + k * 0} y={16 + k * 18} width="44" height="14" rx="5" fill={H.white} stroke={H.turquoise} strokeOpacity="0.45" filter="url(#shShadow)" />
          <rect x={184} y={19 + k * 18} width="8" height="8" rx="2.5" fill={[H.turquoise, H.saffron, H.lapis][k]} />
          <rect x={196} y={22 + k * 18} width="22" height="3" rx="1.5" fill={H.sand} />
        </motion.g>
      </motion.g>)}
      {/* phone */}
      <motion.g {...pop(1.5)}>
        <motion.g {...loop(active, { y: [0, -3, 0] }, 7, 1)}>
          <rect x="174" y="72" width="54" height="104" rx="11" fill={H.white} stroke={H.lapisDeep} strokeWidth="2" filter="url(#shShadow)" />
          <rect x="193" y="77" width="16" height="3" rx="1.5" fill={H.lapisDeep} />
          <rect x="180" y="86" width="42" height="24" rx="5" fill="url(#shHero)" />
          {[0, 1].map(k => <rect key={k} x={180 + k * 22} y="116" width="20" height="26" rx="4" fill={k ? H.turquoiseLight : 'url(#shProd)'} />)}
          <rect x="180" y="150" width="42" height="9" rx="4.5" fill={H.terracotta} />
        </motion.g>
      </motion.g>
      {/* migration from the old store */}
      <motion.g {...pop(1.8)}>
        <rect x="12" y="176" width="52" height="24" rx="8" fill={H.ivory} stroke={H.sand} strokeDasharray="3 2" />
        {Icon2.box(24, 188, H.lapis)}
        <text x="33" y="185.5" fontSize="6" fontWeight="700" fill={H.lapisDeep}>Eski</text>
        <text x="33" y="193.5" fontSize="6" fontWeight="700" fill={H.lapisDeep}>mağaza</text>
      </motion.g>
      <motion.path d={migrate} fill="none" stroke={H.saffron} strokeWidth="1.3" strokeDasharray="3 3" {...drawIn(2, 0.5)} />
      <Travel active={active} d={migrate} delay={3} duration={1.1} period={8} color={H.terracotta} r={2.6} />
      <Rail active={active} steps={steps} start={3} />
    </svg>
  </>}</Frame>;
}

// Meta overview hero: the original AdCreativeScene look (full-canvas SVG, gradient ad card with a
// girih star, draw-in outlines, rising heart) merged with the newer story: the same ad in the feed and
// in a story, a click travelling to the landing page, a measured form and the four-step rail.
// First render is identical on server and client; loops start only after mount while on screen.
export function MetaAdsScene() {
  const steps = [['Hedef', 14, 44], ['Kreatif', 62, 48], ['Ölçüm', 114, 44], ['Değerlendirme', 162, 64]] as const;
  const click = 'M106 162 C128 162 140 152 154 146';
  const record = 'M152 190 C140 198 132 200 124 200';
  const loop = (active: boolean, values: Record<string, number[] | string[]>, duration: number, delay = 0) =>
    active ? { animate: values, transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' as const } } : { animate: Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v[0]])), transition: { duration: 0 } };
  const pop = (delay: number) => ({ ...popIn(delay), style: { transformBox: 'fill-box' as const, transformOrigin: 'center' } });
  return <Frame label="Temsili Meta reklam akışı: Facebook akışı ve Instagram hikâyesindeki aynı reklam açılış sayfasına yönlendiriyor; başarılı form kaydı ölçülüyor ve hedef, kreatif, ölçüm, değerlendirme adımlarıyla izleniyor.">{active => <>
    <GirihHalo active={active} color={H.terracotta} opacity={0.14} />
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="metaAdGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={H.terracotta} /><stop offset="100%" stopColor={H.saffron} /></linearGradient>
        <linearGradient id="metaStoryGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={H.turquoise} /><stop offset="100%" stopColor={H.turquoiseDeep} /></linearGradient>
        <filter id="metaShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={H.lapisDeep} floodOpacity="0.12" /></filter>
      </defs>

      {/* story placement, tilted behind the feed card */}
      <motion.g {...pop(0.5)}>
        <motion.g {...loop(active, { y: [0, -3, 0] }, 7, 0.4)}>
          <g transform="rotate(8 162 66)" filter="url(#metaShadow)">
            <rect x="134" y="18" width="56" height="96" rx="10" fill={H.white} stroke={H.sand} strokeWidth="1.5" />
            <text x="142" y="31" fontSize="7" fontWeight="700" fill={H.lapisDeep}>Hikâye</text>
            <rect x="140" y="36" width="44" height="54" rx="7" fill="url(#metaStoryGrad)" />
            <polygon points="157,55 157,71 170,63" fill={H.white} opacity="0.9" />
            <rect x="145" y="96" width="38" height="11" rx="5.5" fill={H.white} stroke={H.turquoise} />
            <text x="164" y="104" textAnchor="middle" fontSize="6" fill={H.turquoiseDeep}>Instagram</text>
          </g>
        </motion.g>
      </motion.g>

      {/* feed ad card (original AdCreative card) */}
      <motion.g {...loop(active, { y: [0, -2.5, 0] }, 8)}>
        <rect x="22" y="30" width="118" height="152" rx="14" fill={H.white} filter="url(#metaShadow)" />
        <motion.rect x="22" y="30" width="118" height="152" rx="14" fill="none" stroke={H.sand} strokeWidth="2" {...drawIn(0.1, 1)} />
        <motion.text x="32" y="45" fontSize="7" fontWeight="700" fill={H.lapisDeep} {...riseIn(0.4)}>Akış · Facebook</motion.text>
        <motion.rect x="30" y="51" width="102" height="64" rx="10" fill="url(#metaAdGrad)" {...pop(0.6)} />
        <motion.g {...pop(0.85)}>
          <motion.g {...loop(active, { rotate: [0, 45] }, 18)} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <polygon points={starPoints(81, 83, 20, 11)} fill="none" stroke={H.white} strokeWidth="1.8" />
          </motion.g>
          <circle cx="81" cy="83" r="5.5" fill={H.white} />
        </motion.g>
        <motion.g {...pop(0.95)}>
          <rect x="37" y="57" width="34" height="13" rx="6.5" fill={H.white} />
          <text x="54" y="66.3" textAnchor="middle" fontSize="7" fontWeight="800" fill={H.terracotta}>Reklam</text>
        </motion.g>
        <motion.rect x="32" y="124" width="86" height="7" rx="3.5" fill={H.sand} {...pop(1.1)} />
        <motion.rect x="32" y="136" width="60" height="5" rx="2.5" fill={H.ivory} {...pop(1.2)} />
        <motion.g {...pop(1.35)}>
          <rect x="32" y="152" width="74" height="20" rx="10" fill={H.turquoise} />
          <text x="69" y="164.6" textAnchor="middle" fontSize="7" fontWeight="700" fill={H.white}>Daha fazla bilgi</text>
        </motion.g>
        {/* rising heart (engagement) */}
        <motion.path d="M124 160 c-3 -4 -10 -2 -10 4 c0 5 10 10 10 10 c0 0 10 -5 10 -10 c0 -6 -7 -8 -10 -4 z" fill={H.terracotta}
          initial={false} {...(active ? { animate: { y: [0, -46], opacity: [0, 1, 0], scale: [0.6, 1, 1] }, transition: { duration: 2.6, repeat: Infinity, repeatDelay: 3.4, delay: 2 } } : { animate: { y: 0, opacity: 0, scale: 0.6 }, transition: { duration: 0 } })}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
      </motion.g>

      {/* click travels to the landing page */}
      <motion.path d={click} fill="none" stroke={H.turquoise} strokeWidth="1.4" strokeDasharray="3 3" {...drawIn(1.5, 0.8)} />
      <motion.circle r="3" fill={H.saffron} initial={false} style={{ offsetPath: `path("${click}")` }}
        animate={active ? { offsetDistance: ['0%', '100%'], opacity: [0, 1, 0] } : { offsetDistance: '100%', opacity: 0 }}
        transition={active ? { duration: 2.2, repeat: Infinity, repeatDelay: 3.8, delay: 2.4, ease: 'easeInOut' } : { duration: 0 }} />

      {/* landing page */}
      <motion.g {...pop(1.7)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 9, 1)}>
          <rect x="150" y="116" width="76" height="80" rx="10" fill={H.white} stroke={H.turquoise} strokeOpacity="0.35" filter="url(#metaShadow)" />
          <path d="M150 126 a10 10 0 0 1 10 -10 h56 a10 10 0 0 1 10 10 z" fill={H.turquoiseLight} />
          {[158, 164, 170].map((cx, i) => <circle key={cx} cx={cx} cy="121.5" r="1.8" fill={i === 2 ? H.terracotta : H.turquoise} />)}
          <text x="158" y="138" fontSize="7" fontWeight="700" fill={H.lapisDeep}>Açılış sayfası</text>
          <rect x="158" y="144" width="54" height="4" rx="2" fill={H.sand} />
          <rect x="158" y="153" width="60" height="9" rx="3" fill="none" stroke={H.sand} />
          <rect x="158" y="166" width="60" height="9" rx="3" fill="none" stroke={H.sand} />
          <motion.rect x="158" y="180" width="34" height="10" rx="5" fill={H.terracotta} {...loop(active, { opacity: [1, 0.75, 1] }, 6, 4.6)} />
        </motion.g>
      </motion.g>

      {/* measured form record */}
      <motion.path d={record} fill="none" stroke={H.turquoise} strokeWidth="1.4" strokeDasharray="3 3" {...drawIn(2.1, 0.6)} />
      <motion.g {...pop(2.3)}>
        <rect x="22" y="189" width="102" height="22" rx="11" fill={H.white} stroke={H.turquoise} strokeOpacity="0.45" filter="url(#metaShadow)" />
        <motion.circle cx="34" cy="200" r="7" fill={H.turquoise} {...loop(active, { scale: [1, 1.12, 1] }, 6, 5)} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <path d="M30.5 200 l2.5 2.5 l4.5 -5" fill="none" stroke={H.white} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <text x="46" y="202.5" fontSize="7" fontWeight="600" fill={H.lapisDeep}>Başarılı form kaydı</text>
      </motion.g>

      {/* four-step rail */}
      {steps.map(([label, x, w], i) => <motion.g key={label} {...riseIn(2.5 + i * 0.1)}>
        <motion.rect x={x} y="219" width={w} height="16" rx="5" strokeWidth="1"
          initial={false} animate={active ? { fill: [H.ivory, H.turquoiseLight, H.ivory], stroke: [H.sand, H.turquoise, H.sand] } : { fill: H.ivory, stroke: H.sand }}
          transition={active ? { duration: 8, repeat: Infinity, delay: 3 + i * 2, times: [0, 0.12, 0.25] } : { duration: 0 }} />
        <text x={x + w / 2} y="229.6" textAnchor="middle" fontSize="7" fontWeight="700" fill={H.lapisDeep}>{label}</text>
      </motion.g>)}
    </svg>
  </>}</Frame>;
}
