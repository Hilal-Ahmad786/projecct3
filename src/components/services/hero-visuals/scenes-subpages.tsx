'use client';

// Sub-page hero scenes (Özellikler, Teknoloji, Süreç, Portföy, Fiyatlandırma, SSS, Blog) in the same
// standard as the overview heroes in scenes-3d.tsx: a 240×240 SVG story in the Fable style (draw-in
// outlines, staggered pop-ins, girih motifs, travelling dots, a step rail) inside the large Frame.
// Every scene takes its Turkish labels as props, so each service reuses the scene with its own story.
// First render is identical on server and client; loops start only after mount while on screen.

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { H, GirihHalo, drawIn, riseIn, starPoints } from './primitives';
import { Frame, Rail, Travel, center, loop, pop } from './scenes-3d';

type Four = readonly [string, string, string, string];
/** Splits a short label into at most two balanced lines at a space. */
const wrap2 = (text: string): string[] => {
  if (text.length <= 13 || !text.includes(' ')) return [text];
  const mid = text.length / 2; let best = -1;
  for (let i = 0; i < text.length; i++) if (text[i] === ' ' && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
  return [text.slice(0, best), text.slice(best + 1)];
};
/** Font size that keeps `text` inside `width` canvas units (≈0.56 em per character), capped at `base`. */
const fit = (text: string, width: number, base: number) => Math.min(base, +(width / (text.length * 0.56)).toFixed(2));
type Three = readonly [string, string, string];

/** Lays out rail labels across the 240 px canvas (x 14 → 226) in proportion to their length. */
function railSteps(labels: readonly string[]) {
  const gap = 4, total = 212 - gap * (labels.length - 1);
  const weights = labels.map((l) => Math.max(l.length, 5) + 3);
  const sum = weights.reduce((a, b) => a + b, 0);
  let x = 14;
  return labels.map((label, i) => { const w = Math.round((weights[i] / sum) * total); const step = [label, x, w] as const; x += w + gap; return step; });
}

function Defs({ id }: { id: string }) {
  return <defs>
    <linearGradient id={`${id}A`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={H.turquoise} /><stop offset="100%" stopColor={H.lapis} /></linearGradient>
    <linearGradient id={`${id}B`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={H.terracotta} /><stop offset="100%" stopColor={H.saffron} /></linearGradient>
    <filter id={`${id}S`} x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={H.lapisDeep} floodOpacity="0.12" /></filter>
  </defs>;
}

function Tick({ cx, cy, active, delay, period = 8 }: { cx: number; cy: number; active: boolean; delay: number; period?: number }) {
  return <>
    <motion.circle cx={cx} cy={cy} r="5" strokeWidth="1.2" initial={false}
      animate={active ? { fill: [H.white, H.turquoise, H.turquoise, H.white], stroke: [H.sand, H.turquoise, H.turquoise, H.sand] } : { fill: H.turquoise, stroke: H.turquoise }}
      transition={active ? { duration: period, delay, repeat: Infinity, times: [0, 0.06, 0.85, 1] } : { duration: 0 }} />
    <motion.path d={`M${cx - 2.4} ${cy} l1.7 1.8 l3.2 -3.6`} fill="none" stroke={H.white} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" initial={false}
      animate={active ? { opacity: [0, 1, 1, 0] } : { opacity: 1 }}
      transition={active ? { duration: period, delay, repeat: Infinity, times: [0, 0.06, 0.85, 1] } : { duration: 0 }} />
  </>;
}

function Star({ cx, cy, r = 9, color = H.white, active, spin = true }: { cx: number; cy: number; r?: number; color?: string; active: boolean; spin?: boolean }) {
  return <motion.g {...(spin ? loop(active, { rotate: [0, 45] }, 18) : {})} style={center}>
    <polygon points={starPoints(cx, cy, r, r * 0.55)} fill="none" stroke={color} strokeWidth="1.5" />
  </motion.g>;
}

/* ── Özellikler: scope checklist + creative A/B test + next step ──────────────────────────── */
export function ScopeScene({ label, title, items, test, result, steps }: { label: string; title: string; items: Four; test: readonly [string, string, string]; result: string; steps: readonly string[] }) {
  const id = 'scope';
  const toResult = 'M146 140 C158 140 162 150 170 156';
  return <Frame label={label}>{active => <>
    <GirihHalo active={active} color={H.saffron} opacity={0.13} />
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Defs id={id} />
      <motion.g {...loop(active, { y: [0, -2.5, 0] }, 8)}>
        <rect x="16" y="22" width="130" height="150" rx="14" fill={H.white} filter={`url(#${id}S)`} />
        <motion.rect x="16" y="22" width="130" height="150" rx="14" fill="none" stroke={H.sand} strokeWidth="2" {...drawIn(0.1, 1)} />
        <motion.text x="28" y="40" fontSize="7.5" fontWeight="700" fill={H.lapisDeep} {...riseIn(0.35)}>{title}</motion.text>
        <motion.rect x="28" y="45" width="34" height="2.5" rx="1.25" fill={H.saffron} {...pop(0.5)} />
        {items.map((item, i) => <motion.g key={item} {...riseIn(0.6 + i * 0.15)}>
          <rect x="24" y={56 + i * 27} width="114" height="21" rx="6" fill={H.ivory} />
          <Tick cx={36} cy={66.5 + i * 27} active={active} delay={1.4 + i * 1.1} />
          <text x="47" y={69 + i * 27} fontSize={fit(item, 86, 6.8)} fontWeight="600" fill={H.lapisDeep}>{item}</text>
        </motion.g>)}
      </motion.g>

      {/* creative test: two variants take turns at the front */}
      <motion.g {...pop(0.9)}>
        <text x="158" y="28" fontSize={fit(test[2], 66, 6.5)} fontWeight="700" fill={H.lapisDeep} opacity="0.7">{test[2]}</text>
        {[0, 1].map((v) => <motion.g key={v} initial={false}
          animate={active ? { y: v === 0 ? [0, 0, 10, 10, 0] : [10, 10, 0, 0, 10], opacity: v === 0 ? [1, 1, 0.55, 0.55, 1] : [0.55, 0.55, 1, 1, 0.55] } : { y: v === 0 ? 0 : 10, opacity: v === 0 ? 1 : 0.55 }}
          transition={active ? { duration: 8, repeat: Infinity, delay: 2, times: [0, 0.4, 0.5, 0.9, 1] } : { duration: 0 }}>
          <g transform={`translate(${v === 0 ? 154 : 168} ${v === 0 ? 34 : 40})`} filter={`url(#${id}S)`}>
            <rect width="60" height="88" rx="10" fill={H.white} stroke={H.sand} />
            <rect x="6" y="6" width="48" height="40" rx="7" fill={`url(#${id}${v === 0 ? 'A' : 'B'})`} />
            <polygon points={starPoints(30, 26, 10, 5.5)} fill="none" stroke={H.white} strokeWidth="1.4" />
            <rect x="6" y="52" width="40" height="4" rx="2" fill={H.sand} />
            <rect x="6" y="60" width="28" height="3.5" rx="1.75" fill={H.ivory} />
            <rect x="6" y="70" width="48" height="12" rx="6" fill={v === 0 ? H.turquoise : H.terracotta} />
            <text x="30" y="78.2" textAnchor="middle" fontSize={fit(test[v], 42, 6)} fontWeight="700" fill={H.white}>{test[v]}</text>
          </g>
        </motion.g>)}
      </motion.g>

      <motion.path d={toResult} fill="none" stroke={H.turquoise} strokeWidth="1.4" strokeDasharray="3 3" {...drawIn(1.8, 0.6)} />
      <Travel active={active} d={toResult} delay={3} duration={1.2} period={6} />
      <motion.g {...pop(2)}>
        <rect x="160" y="150" width="66" height="30" rx="9" fill={H.ivory} stroke={H.saffron} strokeWidth="1.2" filter={`url(#${id}S)`} />
        <polygon points={starPoints(173, 165, 6, 3.3)} fill={H.saffron} />
        <text x="183" y="167.5" fontSize={fit(result, 38, 6.2)} fontWeight="700" fill={H.lapisDeep}>{result}</text>
      </motion.g>
      <motion.g {...pop(2.3)}>
        <rect x="16" y="184" width="130" height="22" rx="11" fill={H.white} stroke={H.turquoise} strokeOpacity="0.45" filter={`url(#${id}S)`} />
        <motion.rect x="26" y="193" height="4" rx="2" fill={H.turquoise} initial={false}
          animate={active ? { width: [0, 108, 108, 0] } : { width: 108 }}
          transition={active ? { duration: 8, repeat: Infinity, delay: 1.4, times: [0, 0.55, 0.95, 1] } : { duration: 0 }} />
        <rect x="26" y="193" width="108" height="4" rx="2" fill="none" stroke={H.sand} />
      </motion.g>
      <Rail active={active} steps={railSteps(steps)} />
    </svg>
  </>}</Frame>;
}

/* ── Teknoloji: browser event + server event → one report, no double count ─────────────────── */
export function MeasureScene({ label, browser, server, report, events, badge, consent, steps }: { label: string; browser: readonly [string, string]; server: readonly [string, string]; report: string; events: Three; badge: string; consent: string; steps: readonly string[] }) {
  const id = 'meas';
  const fromBrowser = 'M108 64 C122 64 126 74 138 78';
  const fromServer = 'M108 138 C122 138 126 126 138 122';
  return <Frame label={label}>{active => <>
    <GirihHalo active={active} color={H.lapis} opacity={0.13} />
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Defs id={id} />
      {/* browser */}
      <motion.g {...pop(0.3)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 8)}>
          <rect x="14" y="26" width="94" height="76" rx="10" fill={H.white} stroke={H.sand} filter={`url(#${id}S)`} />
          <path d="M14 36 a10 10 0 0 1 10 -10 h74 a10 10 0 0 1 10 10 z" fill={H.turquoiseLight} />
          {[22, 28, 34].map((cx, i) => <circle key={cx} cx={cx} cy="31" r="1.8" fill={i === 2 ? H.terracotta : H.turquoise} />)}
          <text x="22" y="50" fontSize={fit(browser[0], 78, 7)} fontWeight="700" fill={H.lapisDeep}>{browser[0]}</text>
          <rect x="22" y="56" width="58" height="4" rx="2" fill={H.sand} />
          <motion.g {...loop(active, { scale: [1, 0.94, 1] }, 6, 2.2)} style={center}>
            <rect x="22" y="70" width="52" height="14" rx="7" fill={H.terracotta} />
            <text x="48" y="79.4" textAnchor="middle" fontSize={fit(browser[1], 46, 6)} fontWeight="700" fill={H.white}>{browser[1]}</text>
          </motion.g>
          <motion.path d="M80 80 l0 9 l2.6 -2.4 l1.8 4 l1.6 -0.8 l-1.8 -3.8 l3.6 -0.2 z" fill={H.lapisDeep} {...loop(active, { x: [6, 0, 6], y: [4, 0, 4] }, 6, 1.6)} />
        </motion.g>
      </motion.g>

      {/* server */}
      <motion.g {...pop(0.6)}>
        <rect x="14" y="112" width="94" height="58" rx="10" fill={H.white} stroke={H.sand} filter={`url(#${id}S)`} />
        <text x="22" y="126" fontSize={fit(server[0], 78, 7)} fontWeight="700" fill={H.lapisDeep}>{server[0]}</text>
        {[132, 145].map((y, i) => <g key={y}>
          <rect x="22" y={y} width="78" height="10" rx="3" fill={H.ivory} stroke={H.sand} />
          <motion.circle cx="30" cy={y + 5} r="2" initial={false} animate={active ? { fill: [H.sand, H.turquoise, H.sand] } : { fill: H.turquoise }}
            transition={active ? { duration: 2.4, repeat: Infinity, delay: 2 + i * 0.6 } : { duration: 0 }} />
          <rect x="36" y={y + 3.5} width={i ? 36 : 48} height="3" rx="1.5" fill={H.sand} />
        </g>)}
        <text x="22" y="165" fontSize={fit(server[1], 78, 5.8)} fill={H.lapisDeep} opacity="0.65">{server[1]}</text>
      </motion.g>

      {/* both events travel to the report */}
      <motion.path d={fromBrowser} fill="none" stroke={H.turquoise} strokeWidth="1.4" strokeDasharray="3 3" {...drawIn(1.2, 0.6)} />
      <motion.path d={fromServer} fill="none" stroke={H.lapis} strokeWidth="1.4" strokeDasharray="3 3" {...drawIn(1.4, 0.6)} />
      <Travel active={active} d={fromBrowser} delay={2.4} duration={1.2} period={6} />
      <Travel active={active} d={fromServer} delay={2.7} duration={1.2} period={6} color={H.lapis} />

      {/* report */}
      <motion.g {...pop(1.6)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 9, 1)}>
          <rect x="138" y="28" width="88" height="124" rx="12" fill={H.white} stroke={H.turquoise} strokeOpacity="0.3" filter={`url(#${id}S)`} />
          <text x="148" y="45" fontSize={fit(report, 70, 7)} fontWeight="700" fill={H.lapisDeep}>{report}</text>
          {[0, 1, 2, 3].map((i) => <motion.rect key={i} x={150 + i * 17} width="11" rx="3" fill={i === 3 ? H.terracotta : H.turquoise} initial={false}
            animate={active ? { height: [8, [22, 30, 18, 36][i], [22, 30, 18, 36][i], 8], y: [92, 100 - [22, 30, 18, 36][i], 100 - [22, 30, 18, 36][i], 92] } : { height: [22, 30, 18, 36][i], y: 100 - [22, 30, 18, 36][i] }}
            transition={active ? { duration: 8, repeat: Infinity, delay: 2 + i * 0.2, times: [0, 0.2, 0.9, 1] } : { duration: 0 }} />)}
          <line x1="146" y1="100.5" x2="218" y2="100.5" stroke={H.sand} />
          {events.map((e, i) => <motion.g key={e} {...riseIn(1.9 + i * 0.15)}>
            <circle cx="151" cy={113 + i * 12} r="3" fill={H.turquoise} />
            <path d={`M149.6 ${113 + i * 12} l1 1 l2 -2.2`} fill="none" stroke={H.white} strokeWidth="1" strokeLinecap="round" />
            <text x="158" y={115.3 + i * 12} fontSize={fit(e, 62, 6)} fill={H.lapisDeep}>{e}</text>
          </motion.g>)}
        </motion.g>
      </motion.g>

      {/* deduplicated badge and consent */}
      <motion.g {...pop(2.4)}>
        <rect x="138" y="160" width="88" height="22" rx="11" fill={H.ivory} stroke={H.saffron} />
        <motion.g {...loop(active, { scale: [1, 1.15, 1] }, 6, 4)} style={center}><circle cx="150" cy="171" r="5.5" fill={H.saffron} /></motion.g>
        <path d="M147.6 171 l1.7 1.8 l3.2 -3.6" fill="none" stroke={H.white} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="160" y="173.4" fontSize={fit(badge, 60, 6.2)} fontWeight="700" fill={H.lapisDeep}>{badge}</text>
      </motion.g>
      <motion.g {...pop(2.6)}>
        <rect x="14" y="180" width="110" height="24" rx="12" fill={H.white} stroke={H.sand} filter={`url(#${id}S)`} />
        <rect x="22" y="187" width="20" height="10" rx="5" fill={H.turquoiseLight} />
        <motion.circle cy="192" r="4" fill={H.turquoise} initial={false} animate={active ? { cx: [27, 37, 37, 27] } : { cx: 37 }}
          transition={active ? { duration: 8, repeat: Infinity, delay: 1, times: [0, 0.1, 0.9, 1] } : { duration: 0 }} />
        <text x="48" y="194.4" fontSize={fit(consent, 70, 6.2)} fontWeight="600" fill={H.lapisDeep}>{consent}</text>
      </motion.g>
      <Rail active={active} steps={railSteps(steps)} />
    </svg>
  </>}</Frame>;
}

/* ── Süreç: a winding path of milestones with a plan card ─────────────────────────────────── */
export function TimelineScene({ label, milestones, plan, steps }: { label: string; milestones: readonly [string, string, string, string, string]; plan: readonly [string, string, string, string]; steps: readonly string[] }) {
  const id = 'time';
  const path = 'M28 178 C56 178 58 146 84 146 C112 146 110 170 138 166 C168 162 160 124 186 116 C204 110 210 92 214 78';
  const nodes = [[28, 178], [84, 146], [138, 166], [186, 116], [214, 78]] as const;
  const labelPos = [[28, 196, 'middle'], [84, 136, 'middle'], [138, 184, 'middle'], [176, 104, 'end'], [214, 66, 'middle']] as const;
  return <Frame label={label}>{active => <>
    <GirihHalo active={active} color={H.turquoise} opacity={0.13} />
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Defs id={id} />
      {/* plan card */}
      <motion.g {...pop(0.3)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 8)}>
          <rect x="14" y="20" width="118" height="92" rx="12" fill={H.white} stroke={H.sand} filter={`url(#${id}S)`} />
          <rect x="14" y="20" width="118" height="20" rx="12" fill={`url(#${id}A)`} />
          <rect x="14" y="30" width="118" height="10" fill={`url(#${id}A)`} />
          <text x="24" y="33.5" fontSize={fit(plan[0], 98, 7)} fontWeight="700" fill={H.white}>{plan[0]}</text>
          {plan.slice(1).map((row, i) => <motion.g key={row} {...riseIn(0.6 + i * 0.15)}>
            <Tick cx={30} cy={56 + i * 18} active={active} delay={1.2 + i * 1.4} period={9} />
            <text x="41" y={58.4 + i * 18} fontSize={fit(row, 84, 6.6)} fontWeight="600" fill={H.lapisDeep}>{row}</text>
          </motion.g>)}
        </motion.g>
      </motion.g>

      <motion.path d={path} fill="none" stroke={H.sand} strokeWidth="6" strokeLinecap="round" {...drawIn(0.5, 1.4)} />
      <motion.path d={path} fill="none" stroke={H.turquoise} strokeWidth="1.6" strokeDasharray="3 4" {...drawIn(0.8, 1.4)} />
      <Travel active={active} d={path} delay={2.6} duration={4} period={8} r={3.4} />
      {nodes.map(([cx, cy], i) => <motion.g key={i} {...pop(1 + i * 0.22)}>
        <motion.circle cx={cx} cy={cy} r="9" strokeWidth="1.5" initial={false}
          animate={active ? { fill: [H.white, H.turquoiseLight, H.white], stroke: [H.sand, H.turquoise, H.sand] } : { fill: H.white, stroke: H.turquoise }}
          transition={active ? { duration: 8, repeat: Infinity, delay: 2.6 + i * 0.8, times: [0, 0.1, 0.3] } : { duration: 0 }} />
        <polygon points={starPoints(cx, cy, 5, 2.7)} fill={i === 4 ? H.saffron : H.turquoise} />
        <text x={labelPos[i][0]} y={labelPos[i][1]} textAnchor={labelPos[i][2]} fontSize="6.2" fontWeight="700" fill={H.lapisDeep}>{milestones[i]}</text>
      </motion.g>)}
      <Rail active={active} steps={railSteps(steps)} />
    </svg>
  </>}</Frame>;
}

/* ── Portföy: a representative report with annotated changes ─────────────────────────────── */
export function CaseScene({ label, title, badge, notes, start, approach, verdict, steps }: { label: string; title: string; badge: string; notes: Three; start: readonly [string, string]; approach: readonly [string, string]; verdict: string; steps: readonly string[] }) {
  const id = 'case';
  const line = 'M28 128 L52 120 L74 126 L96 104 L118 98 L140 82 L154 76';
  const pins = [[74, 126], [96, 104], [140, 82]] as const;
  return <Frame label={label}>{active => <>
    <GirihHalo active={active} color={H.terracotta} opacity={0.12} />
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Defs id={id} />
      <motion.g {...loop(active, { y: [0, -2.5, 0] }, 8)}>
        <rect x="14" y="22" width="152" height="130" rx="14" fill={H.white} filter={`url(#${id}S)`} />
        <motion.rect x="14" y="22" width="152" height="130" rx="14" fill="none" stroke={H.sand} strokeWidth="2" {...drawIn(0.1, 1)} />
        <motion.text x="26" y="40" fontSize="7.5" fontWeight="700" fill={H.lapisDeep} {...riseIn(0.35)}>{title}</motion.text>
        <motion.g {...pop(0.5)}>
          <rect x="120" y="31" width="38" height="13" rx="6.5" fill={H.ivory} stroke={H.saffron} />
          <text x="139" y="40" textAnchor="middle" fontSize="5.8" fontWeight="700" fill={H.terracotta}>{badge}</text>
        </motion.g>
        {[60, 84, 108, 132].map((y) => <line key={y} x1="26" y1={y} x2="156" y2={y} stroke={H.ivory} />)}
        <motion.path d={`${line} L154 138 L28 138 Z`} fill={H.turquoiseLight} initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.6, duration: 0.8 }} />
        <motion.path d={line} fill="none" stroke={H.turquoise} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...drawIn(0.8, 1.2)} />
        {pins.map(([cx, cy], i) => <motion.g key={i} {...pop(1.6 + i * 0.3)}>
          <motion.circle cx={cx} cy={cy} r="4" fill={i === 1 ? H.terracotta : H.turquoise} stroke={H.white} strokeWidth="1.5" {...loop(active, { scale: [1, 1.3, 1] }, 6, 3 + i * 1.2)} style={center} />
          <rect x={cx - 26} y={cy - 24} width="52" height="14" rx="7" fill={H.white} stroke={i === 1 ? H.terracotta : H.turquoise} strokeOpacity="0.6" />
          <text x={cx} y={cy - 14.6} textAnchor="middle" fontSize={fit(notes[i], 46, 5.8)} fontWeight="700" fill={H.lapisDeep}>{notes[i]}</text>
        </motion.g>)}
      </motion.g>

      {/* start → approach */}
      {[start, approach].map(([head, sub], i) => <motion.g key={head} {...pop(0.8 + i * 0.4)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 9, i)}>
          <rect x="172" y={28 + i * 66} width="56" height="52" rx="10" fill={i ? H.turquoiseLight : H.ivory} stroke={i ? H.turquoise : H.sand} strokeOpacity={i ? 0.5 : 1} filter={`url(#${id}S)`} />
          <text x="180" y={42 + i * 66} fontSize="6" fontWeight="700" fill={H.lapisDeep} opacity="0.7">{head}</text>
          {wrap2(sub).map((line, k) => <text key={k} x="180" y={53 + k * 8.5 + i * 66} fontSize={fit(wrap2(sub).reduce((a, b) => (b.length > a.length ? b : a), ''), 44, 6.6)} fontWeight="700" fill={H.lapisDeep}>{line}</text>)}
          <rect x="180" y={70 + i * 66} width="36" height="3" rx="1.5" fill={i ? H.turquoise : H.sand} />
        </motion.g>
      </motion.g>)}
      <motion.path d="M200 80 L200 94" stroke={H.turquoise} strokeWidth="1.4" strokeDasharray="3 3" {...drawIn(1.6, 0.3)} />
      <Travel active={active} d="M200 80 L200 94" delay={3} duration={0.8} period={6} />

      <motion.g {...pop(2.4)}>
        <rect x="14" y="164" width="214" height="34" rx="12" fill={H.white} stroke={H.turquoise} strokeOpacity="0.45" filter={`url(#${id}S)`} />
        <motion.circle cx="32" cy="181" r="8" fill={H.turquoise} {...loop(active, { scale: [1, 1.12, 1] }, 6, 5)} style={center} />
        <path d="M28 181 l2.8 2.8 l5 -5.6" fill="none" stroke={H.white} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <text x="46" y="183.5" fontSize={fit(verdict, 172, 7)} fontWeight="700" fill={H.lapisDeep}>{verdict}</text>
      </motion.g>
      <Rail active={active} steps={railSteps(steps)} />
    </svg>
  </>}</Frame>;
}

/* ── Fiyatlandırma: one plan splits into ad spend (paid to the platform) and the agency quote ─ */
export function BudgetScene({ label, plan, spend, quote, items, badge, steps }: { label: string; plan: string; spend: readonly [string, string]; quote: string; items: Three; badge: string; steps: readonly string[] }) {
  const id = 'budg';
  const left = 'M104 46 C90 56 70 58 62 72';
  const right = 'M136 46 C150 56 170 58 178 72';
  return <Frame label={label}>{active => <>
    <GirihHalo active={active} color={H.saffron} opacity={0.14} />
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Defs id={id} />
      <motion.g {...pop(0.2)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 7)}>
          <rect x="72" y="14" width="96" height="32" rx="12" fill={`url(#${id}A)`} filter={`url(#${id}S)`} />
          <Star cx={90} cy={30} r={7} active={active} />
          <text x="102" y="33" fontSize={fit(plan, 60, 7.5)} fontWeight="700" fill={H.white}>{plan}</text>
        </motion.g>
      </motion.g>
      <motion.path d={left} fill="none" stroke={H.terracotta} strokeWidth="1.4" strokeDasharray="3 3" {...drawIn(0.8, 0.5)} />
      <motion.path d={right} fill="none" stroke={H.turquoise} strokeWidth="1.4" strokeDasharray="3 3" {...drawIn(0.9, 0.5)} />
      <Travel active={active} d={left} delay={2} duration={1} period={5} color={H.terracotta} />
      <Travel active={active} d={right} delay={2.4} duration={1} period={5} color={H.turquoise} />

      {/* ad spend: coins drop into the client's own ad account */}
      <motion.g {...pop(1.1)}>
        <rect x="14" y="74" width="98" height="100" rx="12" fill={H.white} stroke={H.sand} filter={`url(#${id}S)`} />
        <text x="24" y="90" fontSize={fit(spend[0], 80, 7)} fontWeight="700" fill={H.lapisDeep}>{spend[0]}</text>
        {[0, 1, 2].map((i) => <motion.g key={i} initial={false}
          animate={active ? { y: [0, 34, 34], opacity: [0, 1, 0] } : { y: 34, opacity: 0 }}
          transition={active ? { duration: 1.6, repeat: Infinity, repeatDelay: 2.2, delay: 2.2 + i * 0.5 } : { duration: 0 }}>
          <circle cx={46 + i * 16} cy="102" r="5.5" fill={H.saffron} stroke={H.white} strokeWidth="1.2" />
        </motion.g>)}
        <rect x="26" y="134" width="74" height="24" rx="6" fill={H.ivory} stroke={H.terracotta} strokeOpacity="0.5" />
        <rect x="46" y="137" width="34" height="3" rx="1.5" fill={H.terracotta} opacity="0.6" />
        <text x="63" y="151" textAnchor="middle" fontSize={fit(spend[1], 66, 6)} fontWeight="600" fill={H.lapisDeep}>{spend[1]}</text>
      </motion.g>

      {/* agency quote with separate line items */}
      <motion.g {...pop(1.3)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 9, 1)}>
          <rect x="128" y="74" width="98" height="100" rx="12" fill={H.white} stroke={H.turquoise} strokeOpacity="0.35" filter={`url(#${id}S)`} />
          <text x="138" y="90" fontSize="7" fontWeight="700" fill={H.lapisDeep}>{quote}</text>
          {items.map((item, i) => <motion.g key={item} {...riseIn(1.6 + i * 0.15)}>
            <Tick cx={143} cy={106 + i * 18} active={active} delay={2.6 + i * 0.9} />
            <text x="152" y={108.4 + i * 18} fontSize={fit(item, 66, 6.4)} fontWeight="600" fill={H.lapisDeep}>{item}</text>
            <line x1="138" y1={115 + i * 18} x2="216" y2={115 + i * 18} stroke={H.ivory} />
          </motion.g>)}
          <rect x="138" y="158" width="48" height="5" rx="2.5" fill={H.turquoise} />
        </motion.g>
      </motion.g>

      <motion.g {...pop(2.2)}>
        <rect x="58" y="184" width="124" height="22" rx="11" fill={H.ivory} stroke={H.saffron} />
        <polygon points={starPoints(72, 195, 5.5, 3)} fill={H.saffron} />
        <text x="82" y="197.4" fontSize={fit(badge, 92, 6.4)} fontWeight="700" fill={H.lapisDeep}>{badge}</text>
      </motion.g>
      <Rail active={active} steps={railSteps(steps)} />
    </svg>
  </>}</Frame>;
}

/* ── SSS: search, an opening answer and topic chips ───────────────────────────────────────── */
export function QaScene({ label, search, questions, answer, topics, steps }: { label: string; search: string; questions: Three; answer: readonly [string, string]; topics: Three; steps: readonly string[] }) {
  const id = 'faq';
  return <Frame label={label}>{active => <>
    <GirihHalo active={active} color={H.turquoise} opacity={0.13} />
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Defs id={id} />
      <motion.g {...pop(0.2)}>
        <rect x="16" y="16" width="208" height="24" rx="12" fill={H.white} stroke={H.sand} filter={`url(#${id}S)`} />
        <circle cx="30" cy="27.5" r="4.5" fill="none" stroke={H.turquoise} strokeWidth="1.5" />
        <path d="M33.3 31 l3 3" stroke={H.turquoise} strokeWidth="1.5" strokeLinecap="round" />
        <text x="42" y="30.4" fontSize="6.8" fill={H.lapisDeep} opacity="0.75">{search}</text>
        <motion.rect x={44 + search.length * 3.5} y="23" width="1.2" height="10" fill={H.lapisDeep} initial={false} animate={active ? { opacity: [1, 0, 1] } : { opacity: 0 }} transition={active ? { duration: 1, repeat: Infinity } : { duration: 0 }} />
      </motion.g>

      {/* first question opens with its answer */}
      <motion.g {...riseIn(0.5)}>
        <rect x="16" y="50" width="208" height="70" rx="12" fill={H.white} stroke={H.turquoise} strokeOpacity="0.45" filter={`url(#${id}S)`} />
        <circle cx="30" cy="63" r="6" fill={H.turquoise} />
        <text x="30" y="65.4" textAnchor="middle" fontSize="7" fontWeight="800" fill={H.white}>?</text>
        <text x="42" y="65.4" fontSize={fit(questions[0], 158, 7)} fontWeight="700" fill={H.lapisDeep}>{questions[0]}</text>
        <motion.path d="M208 60 l4 4 l4 -4" fill="none" stroke={H.turquoise} strokeWidth="1.5" strokeLinecap="round" {...loop(active, { rotate: [0, 180, 180, 0] }, 8, 1)} style={center} />
        <motion.g initial={false} animate={active ? { opacity: [0, 1, 1, 0] } : { opacity: 1 }} transition={active ? { duration: 8, repeat: Infinity, delay: 1.2, times: [0, 0.1, 0.85, 1] } : { duration: 0 }}>
          <rect x="30" y="76" width="3" height="34" rx="1.5" fill={H.saffron} />
          <text x="40" y="88" fontSize={fit(answer[0], 176, 6.4)} fill={H.lapisDeep}>{answer[0]}</text>
          <text x="40" y="100" fontSize={fit(answer[1], 176, 6.4)} fill={H.lapisDeep}>{answer[1]}</text>
        </motion.g>
      </motion.g>
      {questions.slice(1).map((q, i) => <motion.g key={q} {...riseIn(0.8 + i * 0.15)}>
        <rect x="16" y={128 + i * 26} width="208" height="20" rx="10" fill={H.ivory} stroke={H.sand} />
        <circle cx="28" cy={138 + i * 26} r="4.5" fill={H.white} stroke={H.turquoise} />
        <text x="28" y={140 + i * 26} textAnchor="middle" fontSize="5.6" fontWeight="800" fill={H.turquoise}>?</text>
        <text x="38" y={140.3 + i * 26} fontSize={fit(q, 162, 6.6)} fontWeight="600" fill={H.lapisDeep}>{q}</text>
        <path d={`M208 ${136 + i * 26} l3 3 l3 -3`} fill="none" stroke={H.lapisDeep} strokeOpacity="0.5" strokeWidth="1.3" strokeLinecap="round" />
      </motion.g>)}
      {topics.map((t, i) => {
        const x = 16 + i * 71;
        return <motion.g key={t} {...pop(1.6 + i * 0.12)}>
          <motion.rect x={x} y="182" width="66" height="18" rx="9" strokeWidth="1" initial={false}
            animate={active ? { fill: [H.white, H.turquoiseLight, H.white], stroke: [H.sand, H.turquoise, H.sand] } : { fill: H.white, stroke: H.sand }}
            transition={active ? { duration: 6, repeat: Infinity, delay: 2.5 + i * 2, times: [0, 0.15, 0.33] } : { duration: 0 }} />
          <text x={x + 33} y="193.4" textAnchor="middle" fontSize={fit(t, 58, 6.2)} fontWeight="700" fill={H.lapisDeep}>{t}</text>
        </motion.g>;
      })}
      <Rail active={active} steps={railSteps(steps)} />
    </svg>
  </>}</Frame>;
}

/* ── Blog: a fanned stack of guides; the front one is being read ──────────────────────────── */
export function GuidesScene({ label, guides, chip, minutes, steps }: { label: string; guides: Three; chip: string; minutes: string; steps: readonly string[] }) {
  const id = 'guide';
  return <Frame label={label}>{active => <>
    <GirihHalo active={active} color={H.saffron} opacity={0.14} />
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Defs id={id} />
      {[2, 1].map((i) => <motion.g key={i} {...pop(0.2 + (2 - i) * 0.15)}>
        <motion.g {...loop(active, { rotate: i === 2 ? [-9, -11, -9] : [8, 10, 8] }, 8, i)} style={{ transformBox: 'view-box', transformOrigin: '120px 190px' }}>
          <rect x="62" y="30" width="116" height="150" rx="12" fill={H.white} stroke={H.sand} filter={`url(#${id}S)`} />
          <rect x="70" y="38" width="100" height="56" rx="8" fill={`url(#${id}${i === 2 ? 'B' : 'A'})`} opacity="0.85" />
          <text x="72" y="110" fontSize={fit(guides[i], 98, 6.4)} fontWeight="700" fill={H.lapisDeep}>{guides[i]}</text>
        </motion.g>
      </motion.g>)}
      <motion.g {...pop(0.6)}>
        <motion.g {...loop(active, { y: [0, -4, 0] }, 7)}>
          <rect x="58" y="26" width="124" height="160" rx="14" fill={H.white} filter={`url(#${id}S)`} />
          <motion.rect x="58" y="26" width="124" height="160" rx="14" fill="none" stroke={H.sand} strokeWidth="2" {...drawIn(0.7, 1)} />
          <rect x="66" y="34" width="108" height="64" rx="9" fill={`url(#${id}A)`} />
          <Star cx={120} cy={66} r={16} active={active} />
          <circle cx="120" cy="66" r="4.5" fill={H.white} />
          <rect x="72" y="40" width="40" height="12" rx="6" fill={H.white} />
          <text x="92" y="48.2" textAnchor="middle" fontSize={fit(chip, 34, 6)} fontWeight="800" fill={H.turquoiseDeep}>{chip}</text>
          <text x="68" y="114" fontSize={fit(guides[0], 104, 7.2)} fontWeight="700" fill={H.lapisDeep}>{guides[0]}</text>
          <rect x="68" y="122" width="96" height="4" rx="2" fill={H.sand} />
          <rect x="68" y="131" width="78" height="4" rx="2" fill={H.ivory} />
          <rect x="68" y="140" width="88" height="4" rx="2" fill={H.ivory} />
          <text x="68" y="162" fontSize={fit(minutes, 104, 6)} fill={H.lapisDeep} opacity="0.65">{minutes}</text>
          <rect x="68" y="168" width="104" height="5" rx="2.5" fill={H.ivory} />
          <motion.rect x="68" y="168" height="5" rx="2.5" fill={H.turquoise} initial={false}
            animate={active ? { width: [0, 104, 104, 0] } : { width: 64 }}
            transition={active ? { duration: 7, repeat: Infinity, delay: 1.6, times: [0, 0.7, 0.95, 1] } : { duration: 0 }} />
        </motion.g>
      </motion.g>
      <motion.g {...pop(1.4)}>
        <motion.g {...loop(active, { y: [0, -3, 0] }, 6, 2)}>
          <path d="M190 40 h18 v28 l-9 -6 l-9 6 z" fill={H.terracotta} filter={`url(#${id}S)`} />
        </motion.g>
      </motion.g>
      <motion.g {...pop(1.6)}>
        <rect x="14" y="120" width="40" height="40" rx="10" fill={H.ivory} stroke={H.saffron} />
        <polygon points={starPoints(34, 140, 10, 5.5)} fill="none" stroke={H.saffron} strokeWidth="1.5" />
      </motion.g>
      <Rail active={active} steps={railSteps(steps)} />
    </svg>
  </>}</Frame>;
}

/* ── Overview hero for label-driven services: a request card, a travelling step and a result card ── */
export function ServiceOverviewScene({ label, title, chips, report, bars, badge, steps }: { label: string; title: string; chips: Three; report: string; bars: Three; badge: string; steps: readonly string[] }) {
  const id = 'ovw';
  const path = 'M118 92 C136 92 142 84 154 84';
  const heights = [26, 40, 54];
  return <Frame label={label}>{active => <>
    <GirihHalo active={active} color={H.turquoise} opacity={0.14} />
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Defs id={id} />
      <motion.g {...loop(active, { y: [0, -2.5, 0] }, 8)}>
        <rect x="14" y="26" width="108" height="140" rx="14" fill={H.white} filter={`url(#${id}S)`} />
        <motion.rect x="14" y="26" width="108" height="140" rx="14" fill="none" stroke={H.sand} strokeWidth="2" {...drawIn(0.1, 1)} />
        <rect x="14" y="26" width="108" height="26" rx="14" fill={`url(#${id}A)`} />
        <rect x="14" y="40" width="108" height="12" fill={`url(#${id}A)`} />
        <Star cx={30} cy={39} r={7} active={active} />
        <text x="42" y="42" fontSize={fit(title, 74, 7.6)} fontWeight="700" fill={H.white}>{title}</text>
        {chips.map((c, i) => <motion.g key={c} {...riseIn(0.6 + i * 0.18)}>
          <rect x="22" y={62 + i * 32} width="92" height="24" rx="7" fill={H.ivory} />
          <Tick cx={35} cy={74 + i * 32} active={active} delay={1.4 + i * 1.2} period={9} />
          <text x="46" y={76.4 + i * 32} fontSize={fit(c, 62, 6.6)} fontWeight="600" fill={H.lapisDeep}>{c}</text>
        </motion.g>)}
      </motion.g>

      <motion.path d={path} fill="none" stroke={H.turquoise} strokeWidth="1.4" strokeDasharray="3 3" {...drawIn(1.4, 0.7)} />
      <Travel active={active} d={path} delay={2.6} duration={1.2} period={6} />

      <motion.g {...pop(1.2)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 9, 1)}>
          <rect x="154" y="44" width="72" height="124" rx="12" fill={H.white} stroke={H.turquoise} strokeOpacity="0.3" filter={`url(#${id}S)`} />
          <text x="162" y="60" fontSize={fit(report, 58, 7)} fontWeight="700" fill={H.lapisDeep}>{report}</text>
          {heights.map((h, i) => <motion.rect key={i} x={164 + i * 19} width="13" rx="3.5" fill={i === 2 ? H.terracotta : H.turquoise} initial={false}
            animate={active ? { height: [8, h, h, 8], y: [124, 132 - h, 132 - h, 124] } : { height: h, y: 132 - h }}
            transition={active ? { duration: 8, repeat: Infinity, delay: 2 + i * 0.25, times: [0, 0.2, 0.9, 1] } : { duration: 0 }} />)}
          <line x1="160" y1="132.5" x2="220" y2="132.5" stroke={H.sand} />
          {bars.map((b, i) => <text key={b} x={170.5 + i * 19} y="143" textAnchor="middle" fontSize={fit(b, 18, 5.4)} fill={H.lapisDeep} opacity="0.7">{b}</text>)}
          <rect x="162" y="150" width="56" height="4" rx="2" fill={H.sand} />
        </motion.g>
      </motion.g>

      <motion.g {...pop(2.2)}>
        <rect x="40" y="178" width="160" height="26" rx="13" fill={H.ivory} stroke={H.saffron} />
        <motion.g {...loop(active, { rotate: [0, 45] }, 18)} style={center}><polygon points={starPoints(56, 191, 6, 3.3)} fill={H.saffron} /></motion.g>
        <text x="68" y="194.2" fontSize={fit(badge, 124, 7)} fontWeight="700" fill={H.lapisDeep}>{badge}</text>
      </motion.g>
      <Rail active={active} steps={railSteps(steps)} />
    </svg>
  </>}</Frame>;
}

/* ── HeroStage: a service's own labelled illustration inside the animated hero frame ──────────────
   The illustration (SeoArtwork, IkasVisual, …) is rendered by the page; the stage adds the standard
   hero motion around it: pop-in card, gentle float, a light sweep, a rotating girih mark, a badge chip
   and a step rail whose pills light up in turn. Slot text is rescaled in globals.css (.hero-stage). */
export function HeroStage({ label, children, steps, badge }: { label: string; children: ReactNode; steps: readonly string[]; badge?: string }) {
  return <Frame label={label}>{active => <>
    <GirihHalo active={active} color={H.turquoise} opacity={0.13} />
    <div className="hero-stage absolute inset-x-[2%] top-[8%] bottom-[24%] flex items-center justify-center">
      <motion.div className="relative w-full" initial={{ opacity: 0, y: 14, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <motion.div className="relative overflow-hidden rounded-2xl border border-heritage-sand bg-white p-2 shadow-[0_14px_34px_rgba(18,42,79,0.14)]"
          animate={active ? { y: [0, -4, 0] } : { y: 0 }} transition={active ? { duration: 8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}>
          {children}
          <motion.div aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
            initial={false} animate={active ? { x: ['0%', '420%'] } : { x: '0%', opacity: 0 }} transition={active ? { duration: 2.4, repeat: Infinity, repeatDelay: 5.6, delay: 1.6, ease: 'easeInOut' } : { duration: 0 }} />
        </motion.div>
        <motion.svg aria-hidden="true" viewBox="0 0 40 40" className="absolute -right-2 -top-3 h-9 w-9 drop-shadow" {...loop(active, { rotate: [0, 45] }, 18)} style={center}>
          <circle cx="20" cy="20" r="18" fill={H.white} stroke={H.sand} />
          <polygon points={starPoints(20, 20, 11, 6)} fill="none" stroke={H.saffron} strokeWidth="2" />
        </motion.svg>
        {badge && <motion.span className="absolute -bottom-3 left-3 rounded-full border border-heritage-saffron bg-heritage-ivory px-2.5 py-0.5 text-[9px] font-bold text-heritage-lapis-deep shadow-sm" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }}>{badge}</motion.span>}
      </motion.div>
    </div>
    <div className="absolute inset-x-0 bottom-[1%] flex justify-center gap-1.5">
      {steps.map((t, i) => <motion.span key={t} className="rounded-[5px] border px-2 py-1 text-[8.5px] font-bold" style={{ color: H.lapisDeep }} initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0, backgroundColor: [H.ivory, H.turquoiseLight, H.ivory], borderColor: [H.sand, H.turquoise, H.sand] } : { opacity: 1, y: 0, backgroundColor: H.ivory, borderColor: H.sand }}
        transition={active ? { opacity: { delay: 1.8 + i * 0.1 }, y: { delay: 1.8 + i * 0.1 }, backgroundColor: { duration: 8, repeat: Infinity, delay: 3 + i * 2, times: [0, 0.12, 0.25] }, borderColor: { duration: 8, repeat: Infinity, delay: 3 + i * 2, times: [0, 0.12, 0.25] } } : { duration: 0 }}>{t}</motion.span>)}
    </div>
  </>}</Frame>;
}
