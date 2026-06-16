'use client';

// Extra scenes added to spread hero visuals across more services. Built to the
// same bar as the original scenes (ShieldLock, Globe, …): a full-canvas SVG
// that tells a short story — outlines draw in, girih motifs woven into the
// subject, staggered reveals, continuous ambient motion, and a label badge.
// 14 scenes: kpi-cards, gauge-meter, browser-window, cms-blocks, color-swatch,
// wireframe, neural-layers, product-grid, checkout-flow, container-grid,
// app-screens, ad-creative, film-strip, automation-bot.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  H, Scene, GirihHalo, HeritageParticles, GirihStar,
  drawIn, popIn, PathDot, starPoints, octagonPoints, useSceneLabels,
} from './primitives';

const SVG = 'absolute inset-0 w-full h-full';

/* ── kpi-cards (BI / analytics dashboards) ───────────────────────── */
export function KpiCardsScene() {
  const L = useSceneLabels();
  const reduced = useReducedMotion();
  const bars = [44, 72, 56, 92, 70, 108];
  const line = 'M 40 150 L 72 126 L 104 136 L 140 100 L 176 112 L 204 74';
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.lapis} opacity={0.16} />
      <HeritageParticles count={8} />
      <svg viewBox="0 0 240 240" className={SVG}>
        <defs>
          <linearGradient id="kpiArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={H.turquoise} stopOpacity="0.28" />
            <stop offset="100%" stopColor={H.turquoise} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.rect x="22" y="34" width="196" height="172" rx="16" fill={H.white} stroke={H.sand} strokeWidth="2" {...drawIn(0.2, 1.1)} />
        <motion.g {...popIn(0.8)}>
          <polygon points={starPoints(44, 56, 9, 5)} fill={H.turquoise} />
          <rect x="58" y="50" width="74" height="6" rx="3" fill={H.sand} />
          <rect x="58" y="61" width="46" height="5" rx="2.5" fill={H.ivory} />
        </motion.g>
        {/* rising bars */}
        {bars.map((h, i) => (
          <motion.rect
            key={i} x={42 + i * 30} width="16" rx="4"
            fill={i === 3 ? H.saffron : H.turquoise} opacity={i === 3 ? 1 : 0.5}
            initial={{ height: 0, y: 186 }}
            animate={{ height: reduced ? h : [0, h], y: reduced ? 186 - h : [186, 186 - h] }}
            transition={{ delay: 1 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        {/* trend area + line + travelling dot */}
        <motion.path d={`${line} L 204 186 L 40 186 Z`} fill="url(#kpiArea)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }} />
        <motion.path d={line} fill="none" stroke={H.lapis} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...drawIn(1.5, 1.2)} />
        <PathDot d={line} color={H.saffron} size={7} duration={3.2} delay={2.7} />
        <motion.g {...popIn(2.3)}>
          <rect x="150" y="44" width="58" height="20" rx="10" fill={H.turquoise} />
          <text x="179" y="58" textAnchor="middle" fontSize="10" fontWeight="700" fill={H.white}>{L('growth', '▲ 24%')}</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── gauge-meter (performance / speed / monitoring) ──────────────── */
export function GaugeMeterScene() {
  const L = useSceneLabels();
  const reduced = useReducedMotion();
  const arc = 'M 36 168 A 84 84 0 0 1 204 168';
  const ticks = Array.from({ length: 9 }, (_, i) => {
    const a = Math.PI - (Math.PI / 8) * i;
    return { x1: 120 + 70 * Math.cos(a), y1: 168 - 70 * Math.sin(a), x2: 120 + 82 * Math.cos(a), y2: 168 - 82 * Math.sin(a) };
  });
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.saffron} opacity={0.18} />
      <HeritageParticles count={8} colors={[H.turquoise, H.saffron, H.terracotta]} />
      <svg viewBox="0 0 240 240" className={SVG}>
        <defs>
          <linearGradient id="gaugeFill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={H.terracotta} />
            <stop offset="60%" stopColor={H.saffron} />
            <stop offset="100%" stopColor={H.turquoise} />
          </linearGradient>
        </defs>
        <path d={arc} fill="none" stroke={H.sand} strokeWidth="14" strokeLinecap="round" />
        <motion.path d={arc} fill="none" stroke="url(#gaugeFill)" strokeWidth="14" strokeLinecap="round"
          strokeDasharray="264" initial={{ strokeDashoffset: 264 }}
          animate={{ strokeDashoffset: reduced ? 58 : [264, 58] }} transition={{ delay: 0.5, duration: 1.8, ease: 'easeOut' }} />
        {ticks.map((t, i) => (
          <motion.line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={H.lapis} strokeWidth="1.5" opacity={0.4} {...popIn(0.4 + i * 0.05)} />
        ))}
        {/* needle */}
        <motion.line x1="120" y1="168" x2="120" y2="96" stroke={H.lapisDeep} strokeWidth="4" strokeLinecap="round"
          style={{ transformOrigin: '120px 168px' }}
          initial={{ rotate: -90 }} animate={{ rotate: reduced ? 58 : [-90, 78, 58] }} transition={{ delay: 0.5, duration: 1.9, ease: 'easeOut' }} />
        <circle cx="120" cy="168" r="9" fill={H.lapisDeep} />
        <circle cx="120" cy="168" r="4" fill={H.saffron} />
        {/* ambient pulse ring */}
        {!reduced && (
          <motion.circle cx="120" cy="168" r="18" fill="none" stroke={H.turquoise} strokeWidth="2"
            animate={{ r: [16, 40], opacity: [0.5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 2 }} />
        )}
        <motion.g {...popIn(1.9)}>
          <rect x="86" y="186" width="68" height="22" rx="11" fill={H.turquoise} />
          <text x="120" y="201" textAnchor="middle" fontSize="11" fontWeight="700" fill={H.white}>{L('score', '98 / 100')}</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── browser-window (web design & development) ───────────────────── */
export function BrowserWindowScene() {
  const L = useSceneLabels();
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.turquoise} opacity={0.16} />
      <HeritageParticles count={7} />
      <svg viewBox="0 0 240 240" className={SVG}>
        <motion.rect x="26" y="40" width="188" height="158" rx="12" fill={H.white} stroke={H.sand} strokeWidth="2" {...drawIn(0.2, 1)} />
        {/* chrome bar */}
        <motion.g {...popIn(0.7)}>
          <path d="M26 52 a12 12 0 0 1 12 -12 h164 a12 12 0 0 1 12 12 v10 h-188 z" fill={H.ivory} />
          <circle cx="42" cy="51" r="3.5" fill={H.terracotta} />
          <circle cx="54" cy="51" r="3.5" fill={H.saffron} />
          <circle cx="66" cy="51" r="3.5" fill={H.turquoise} />
          <rect x="84" y="46" width="118" height="10" rx="5" fill={H.white} stroke={H.sand} />
        </motion.g>
        {/* hero tile with girih */}
        <motion.rect x="38" y="74" width="164" height="52" rx="8" fill={H.turquoiseLight} {...popIn(1)} />
        <GirihStar cx={64} cy={100} size={16} color={H.turquoise} spin delay={1.2} />
        <motion.rect x="88" y="88" width="84" height="8" rx="4" fill={H.turquoise} opacity={0.6} {...popIn(1.3)} />
        <motion.rect x="88" y="102" width="60" height="6" rx="3" fill={H.sand} {...popIn(1.4)} />
        {/* content cards */}
        {[0, 1, 2].map(i => (
          <motion.rect key={i} x={38 + i * 56} y="136" width="48" height="44" rx="6" fill={H.ivory} stroke={H.sand} {...popIn(1.5 + i * 0.15)} />
        ))}
        {/* cursor click */}
        {!reduced && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 1], x: [40, 10, 10], y: [40, 24, 24] }} transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 1.5, times: [0, 0.4, 0.7, 1] }}>
            <path d="M120 150 l0 22 l5 -6 l4 9 l4 -2 l-4 -9 l8 0 z" fill={H.lapisDeep} />
            <motion.circle cx="120" cy="150" r="3" fill="none" stroke={H.saffron} strokeWidth="2" animate={{ r: [3, 14], opacity: [0.8, 0] }} transition={{ duration: 0.8, delay: 2.7, repeat: Infinity, repeatDelay: 2.7 }} />
          </motion.g>
        )}
        <motion.g {...popIn(2)}>
          <rect x="150" y="70" width="52" height="18" rx="9" fill={H.turquoise} />
          <text x="176" y="83" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={H.white}>{L('live', '● Live')}</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── cms-blocks (CMS / WordPress / content) ──────────────────────── */
export function CmsBlocksScene() {
  const L = useSceneLabels();
  const reduced = useReducedMotion();
  const blocks = [
    { y: 60, h: 26, fill: H.turquoiseLight, accent: H.turquoise },
    { y: 92, h: 18, fill: H.ivory, accent: H.sand },
    { y: 116, h: 18, fill: H.ivory, accent: H.sand },
    { y: 140, h: 34, fill: `${H.saffron}22`, accent: H.saffron },
  ];
  return (
    <Scene glow={H.terracotta}>
      <GirihHalo color={H.terracotta} opacity={0.16} />
      <HeritageParticles count={7} colors={[H.terracotta, H.turquoise, H.saffron]} />
      <svg viewBox="0 0 240 240" className={SVG}>
        {/* page frame */}
        <motion.rect x="58" y="40" width="150" height="160" rx="12" fill={H.white} stroke={H.sand} strokeWidth="2" {...drawIn(0.2, 1)} />
        {/* block library rail */}
        <motion.rect x="20" y="56" width="26" height="128" rx="8" fill={H.ivory} stroke={H.sand} {...popIn(0.6)} />
        {[64, 92, 120].map((cy, i) => (
          <motion.g key={i} {...popIn(0.8 + i * 0.12)}>
            <rect x="26" y={cy} width="14" height="14" rx="3" fill={H.white} stroke={H.terracotta} />
            <polygon points={starPoints(33, cy + 7, 4.5, 2.4)} fill={H.terracotta} opacity={0.7} />
          </motion.g>
        ))}
        {/* blocks slotting into the page */}
        {blocks.map((b, i) => (
          <motion.g key={i} initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <rect x="70" y={b.y} width="126" height={b.h} rx="6" fill={b.fill} />
            <rect x="78" y={b.y + b.h / 2 - 3} width={i === 0 ? 70 : 96 - i * 10} height="6" rx="3" fill={b.accent} opacity={0.65} />
            {(i === 0 || i === 3) && <polygon points={starPoints(184, b.y + b.h / 2, 6, 3.2)} fill={b.accent} />}
          </motion.g>
        ))}
        {/* drop cursor */}
        {!reduced && (
          <motion.path d="M0 0 l0 18 l4 -5 l3 7 l4 -2 l-3 -7 l7 0 z" fill={H.lapisDeep}
            initial={{ x: 36, y: 70 }} animate={{ x: [36, 150, 150], y: [70, 150, 150], opacity: [0, 1, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: 1.6, repeatDelay: 1 }} />
        )}
        <motion.g {...popIn(2.2)}>
          <rect x="150" y="44" width="52" height="18" rx="9" fill={H.terracotta} />
          <text x="176" y="57" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={H.white}>{L('published', 'Saved')}</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── color-swatch (branding / identity) ──────────────────────────── */
export function ColorSwatchScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  const swatches = [H.turquoise, H.lapis, H.saffron, H.terracotta, H.turquoiseDeep, H.sand];
  return (
    <Scene glow={H.saffron}>
      <GirihHalo color={H.turquoise} opacity={0.16} />
      <HeritageParticles count={8} colors={[H.turquoise, H.saffron, H.terracotta]} />
      <svg viewBox="0 0 240 240" className={SVG}>
        {/* orbit ring */}
        <motion.circle cx="120" cy="116" r="66" fill="none" stroke={H.sand} strokeWidth="1.5" strokeDasharray="4 7" {...drawIn(0.3, 1.2)} />
        {/* central brand mark */}
        <motion.g style={{ transformOrigin: '120px 116px' }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}>
          <circle cx="120" cy="116" r="34" fill={H.white} stroke={H.sand} strokeWidth="2" />
          <motion.g style={{ transformOrigin: '120px 116px' }} animate={reduced ? undefined : { rotate: 360 }} transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}>
            <polygon points={starPoints(120, 116, 24, 13)} fill={H.turquoise} />
            <polygon points={starPoints(120, 116, 13, 7)} fill={H.saffron} />
          </motion.g>
        </motion.g>
        {/* orbiting swatches */}
        {swatches.map((c, i) => {
          const a = (Math.PI * 2 / swatches.length) * i - Math.PI / 2;
          const x = 120 + 66 * Math.cos(a), y = 116 + 66 * Math.sin(a);
          return (
            <motion.g key={i} {...popIn(0.9 + i * 0.12)}>
              <rect x={x - 13} y={y - 13} width="26" height="26" rx="7" fill={c} stroke={c === H.sand ? H.terracotta : 'none'} strokeWidth="1" />
              <rect x={x - 13} y={y + 6} width="26" height="7" rx="2" fill={H.white} opacity={0.25} />
            </motion.g>
          );
        })}
        {/* paint drop accent */}
        {!reduced && (
          <motion.circle cx="120" cy="116" r="6" fill={H.terracotta}
            animate={{ scale: [0, 1.4, 0], opacity: [0, 0.6, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }} style={{ transformOrigin: '120px 116px' }} />
        )}
        <motion.g {...popIn(1.9)}>
          <rect x="86" y="196" width="68" height="20" rx="10" fill={H.lapis} />
          <text x="120" y="210" textAnchor="middle" fontSize="10" fontWeight="700" fill={H.white}>{L('brand', 'Brand Kit')}</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── wireframe (UI / UX / prototyping) → hi-fi ───────────────────── */
export function WireframeScene() {
  const L = useSceneLabels();
  const dash = '4 4';
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.lapis} opacity={0.14} />
      <HeritageParticles count={7} />
      <svg viewBox="0 0 240 240" className={SVG}>
        <motion.rect x="34" y="40" width="172" height="160" rx="12" fill={H.white} stroke={H.turquoise} strokeWidth="2" strokeDasharray={dash} {...drawIn(0.2, 1.1)} />
        {/* nav */}
        <motion.rect x="46" y="54" width="148" height="20" rx="5" fill="none" stroke={H.turquoise} strokeWidth="1.6" strokeDasharray={dash} {...popIn(0.7)} />
        <motion.circle cx="58" cy="64" r="5" fill="none" stroke={H.turquoise} strokeWidth="1.6" strokeDasharray={dash} {...popIn(0.8)} />
        {/* hero image box (becomes hi-fi) */}
        <motion.rect x="46" y="84" width="64" height="74" rx="6" fill="none" stroke={H.turquoise} strokeWidth="1.6" strokeDasharray={dash} {...popIn(0.9)} />
        <motion.rect x="46" y="84" width="64" height="74" rx="6" fill={H.turquoiseLight}
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1] }} transition={{ delay: 1.8, duration: 1.2, times: [0, 0.5, 1] }} />
        <GirihStar cx={78} cy={121} size={14} color={H.turquoise} delay={2.4} />
        {/* text lines */}
        {[0, 1, 2].map(i => (
          <motion.rect key={i} x="122" y={88 + i * 18} width={70 - i * 14} height="9" rx="4.5" fill="none" stroke={H.turquoise} strokeWidth="1.6" strokeDasharray={dash} {...popIn(1 + i * 0.12)} />
        ))}
        {/* CTA wireframe → filled */}
        <motion.rect x="122" y="142" width="56" height="18" rx="9" fill="none" stroke={H.turquoise} strokeWidth="1.6" strokeDasharray={dash} {...popIn(1.4)} />
        <motion.rect x="122" y="142" width="56" height="18" rx="9" fill={H.saffron} initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1] }} transition={{ delay: 2.2, duration: 1, times: [0, 0.5, 1] }} />
        {/* footer row */}
        {[0, 1, 2].map(i => (
          <motion.rect key={i} x={46 + i * 52} y="170" width="44" height="20" rx="5" fill="none" stroke={H.turquoise} strokeWidth="1.6" strokeDasharray={dash} {...popIn(1.6 + i * 0.1)} />
        ))}
        <motion.g {...popIn(2.6)}>
          <rect x="150" y="44" width="44" height="0" rx="9" fill={H.turquoise} initial={{ height: 0 }} animate={{ height: 18 }} transition={{ delay: 2.6 }} />
          <motion.text x="172" y="57" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={H.white} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>{L('prototype', '→ UI')}</motion.text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── neural-layers (LLM / AI models) ─────────────────────────────── */
export function NeuralLayersScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  const layers = [3, 4, 4, 2];
  const colW = 52, x0 = 42, midY = 116;
  const pos = layers.map((n, li) => Array.from({ length: n }, (_, a) => ({ x: x0 + li * colW, y: midY + (a - (n - 1) / 2) * 36 })));
  const edges: { d: string; key: string }[] = [];
  for (let li = 0; li < pos.length - 1; li++) for (const A of pos[li]) for (const B of pos[li + 1]) edges.push({ key: `${A.x}${A.y}${B.x}${B.y}`, d: `M ${A.x} ${A.y} L ${B.x} ${B.y}` });
  return (
    <Scene glow={H.lapis}>
      <GirihHalo color={H.turquoise} opacity={0.18} />
      <HeritageParticles count={9} colors={[H.turquoise, H.lapis, H.saffron]} />
      <svg viewBox="0 0 240 240" className={SVG}>
        {edges.map((e, i) => (
          <motion.path key={e.key} d={e.d} stroke={H.turquoise} strokeWidth="0.7" opacity={0.22} fill="none" {...drawIn(0.3 + (i % 6) * 0.04, 0.6)} />
        ))}
        {/* signal pulses flowing forward */}
        {!reduced && edges.filter((_, i) => i % 5 === 0).map((e, i) => (
          <PathDot key={`p${e.key}`} d={e.d} color={H.saffron} size={5} duration={1.4} delay={1.2 + i * 0.25} />
        ))}
        {pos.flatMap((col, li) => col.map((p, a) => (
          <motion.g key={`${li}-${a}`} {...popIn(0.4 + li * 0.2 + a * 0.06)}>
            <circle cx={p.x} cy={p.y} r="9" fill={li === pos.length - 1 ? H.saffron : H.white} stroke={H.turquoiseDeep} strokeWidth="1.6" />
            {li === pos.length - 1 && <polygon points={starPoints(p.x, p.y, 5, 2.7)} fill={H.white} />}
            {li === pos.length - 1 && !reduced && (
              <motion.circle cx={p.x} cy={p.y} r="9" fill="none" stroke={H.saffron} strokeWidth="1.6" animate={{ r: [9, 20], opacity: [0.7, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 2 + a * 0.3 }} />
            )}
          </motion.g>
        )))}
        <motion.g {...popIn(2.2)}>
          <rect x="84" y="196" width="72" height="20" rx="10" fill={H.lapis} />
          <text x="120" y="210" textAnchor="middle" fontSize="10" fontWeight="700" fill={H.white}>{L('model', 'inference')}</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── product-grid (storefront + add to cart) ─────────────────────── */
export function ProductGridScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  const cells = [[44, 60], [128, 60], [44, 134], [128, 134]];
  const flyD = 'M 152 96 Q 180 40 196 50';
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.saffron} opacity={0.16} />
      <HeritageParticles count={7} colors={[H.turquoise, H.saffron, H.terracotta]} />
      <svg viewBox="0 0 240 240" className={SVG}>
        <motion.rect x="28" y="46" width="184" height="158" rx="12" fill={H.white} stroke={H.sand} strokeWidth="2" {...drawIn(0.2, 1)} />
        {cells.map(([x, y], i) => (
          <motion.g key={i} {...popIn(0.7 + i * 0.14)}>
            <rect x={x} y={y} width="68" height="60" rx="8" fill={H.ivory} stroke={H.sand} />
            <rect x={x} y={y} width="68" height="34" rx="8" fill={`${H.turquoise}1c`} />
            <polygon points={starPoints(x + 34, y + 17, 11, 6)} fill="none" stroke={H.turquoise} strokeWidth="1.4" />
            <rect x={x + 8} y={y + 40} width="34" height="5" rx="2.5" fill={H.sand} />
            <rect x={x + 8} y={y + 49} width="20" height="5" rx="2.5" fill={H.turquoise} opacity={0.7} />
            <text x={x + 58} y={y + 53} fontSize="9" fill={H.saffron}>★</text>
          </motion.g>
        ))}
        {/* cart */}
        <motion.g {...popIn(1.4)}>
          <circle cx="196" cy="50" r="16" fill={H.turquoise} />
          <path d="M188 45 h12 l-1.5 9 h-9 z M190 58 a1.6 1.6 0 1 0 0.1 0 M198 58 a1.6 1.6 0 1 0 0.1 0" fill="none" stroke={H.white} strokeWidth="1.6" strokeLinejoin="round" />
        </motion.g>
        {/* add-to-cart arc */}
        {!reduced && (
          <>
            <PathDot d={flyD} color={H.saffron} size={9} duration={1.6} delay={1.8} />
            <motion.circle cx="196" cy="50" r="16" fill="none" stroke={H.saffron} strokeWidth="2" animate={{ r: [16, 26], opacity: [0, 0.8, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 3.3, repeatDelay: 2.2 }} />
          </>
        )}
        <motion.g {...popIn(2)}>
          <rect x="44" y="186" width="60" height="18" rx="9" fill={H.terracotta} />
          <text x="74" y="199" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={H.white}>{L('inStock', 'In stock')}</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── checkout-flow (cart → pay → confirmed) ──────────────────────── */
export function CheckoutFlowScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.turquoise} opacity={0.16} />
      <HeritageParticles count={7} />
      <svg viewBox="0 0 240 240" className={SVG}>
        {/* progress rail */}
        <motion.line x1="56" y1="58" x2="184" y2="58" stroke={H.sand} strokeWidth="3" {...drawIn(0.2, 0.8)} />
        <motion.line x1="56" y1="58" x2="184" y2="58" stroke={H.turquoise} strokeWidth="3" {...drawIn(0.6, 1.6)} />
        {[56, 120, 184].map((cx, i) => (
          <motion.g key={i} {...popIn(0.4 + i * 0.4)}>
            <circle cx={cx} cy="58" r="11" fill={i === 2 ? H.turquoise : H.white} stroke={H.turquoise} strokeWidth="2" />
            {i < 2 ? <polygon points={starPoints(cx, 58, 5, 2.7)} fill={H.turquoise} /> : <path d={`M${cx - 4} 58 l3 3 l5 -6`} fill="none" stroke={H.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
          </motion.g>
        ))}
        {/* payment card flips in */}
        <motion.g initial={{ opacity: 0, rotateY: 60 }} animate={{ opacity: 1, rotateY: 0 }} transition={{ delay: 1, duration: 0.7 }} style={{ transformOrigin: '120px 130px' }}>
          <rect x="60" y="92" width="120" height="76" rx="12" fill={H.lapis} />
          <rect x="60" y="92" width="120" height="76" rx="12" fill="url(#coGrad)" opacity="0.0" />
          <rect x="74" y="108" width="22" height="16" rx="3" fill={H.saffron} />
          <polygon points={starPoints(85, 116, 6, 3.2)} fill={H.lapisDeep} opacity={0.6} />
          <rect x="74" y="138" width="92" height="7" rx="3.5" fill={H.white} opacity={0.45} />
          <rect x="74" y="150" width="50" height="6" rx="3" fill={H.white} opacity={0.3} />
        </motion.g>
        {/* approved stamp */}
        <motion.g initial={{ scale: 0, opacity: 0, rotate: -16 }} animate={{ scale: reduced ? 1 : [0, 1.25, 1], opacity: 1, rotate: -12 }} transition={{ delay: 2, duration: 0.6 }} style={{ transformOrigin: '150px 180px' }}>
          <rect x="118" y="172" width="64" height="22" rx="6" fill="none" stroke={H.turquoise} strokeWidth="2.5" />
          <text x="150" y="187" textAnchor="middle" fontSize="11" fontWeight="800" fill={H.turquoise}>{L('paid', 'PAID')}</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── container-grid (orchestration / IaC) ────────────────────────── */
export function ContainerGridScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  const nodes = [[120, 52], [60, 96], [180, 96], [88, 168], [152, 168]];
  return (
    <Scene glow={H.lapis}>
      <GirihHalo color={H.turquoise} opacity={0.16} />
      <HeritageParticles count={8} colors={[H.turquoise, H.lapis, H.saffron]} />
      <svg viewBox="0 0 240 240" className={SVG}>
        {/* links from orchestrator */}
        {nodes.map(([x, y], i) => (
          <motion.line key={i} x1="120" y1="120" x2={x} y2={y} stroke={H.turquoise} strokeWidth="1.4" opacity={0.3} {...drawIn(0.4 + i * 0.1, 0.7)} />
        ))}
        {!reduced && nodes.map(([x, y], i) => (
          <PathDot key={`d${i}`} d={`M 120 120 L ${x} ${y}`} color={H.saffron} size={4.5} duration={1.8} delay={1 + i * 0.2} />
        ))}
        {/* orchestrator core */}
        <motion.g style={{ transformOrigin: '120px 120px' }} {...popIn(0.4)}>
          <circle cx="120" cy="120" r="22" fill={H.lapisDeep} />
          <motion.g style={{ transformOrigin: '120px 120px' }} animate={reduced ? undefined : { rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
            <polygon points={octagonPoints(120, 120, 14)} fill="none" stroke={H.turquoise} strokeWidth="1.6" />
            <polygon points={starPoints(120, 120, 10, 5)} fill={H.saffron} />
          </motion.g>
        </motion.g>
        {/* container boxes */}
        {nodes.map(([x, y], i) => (
          <motion.g key={i} {...popIn(0.8 + i * 0.12)}>
            <rect x={x - 17} y={y - 15} width="34" height="30" rx="5" fill={i === 0 ? H.turquoise : H.white} stroke={H.turquoise} strokeWidth="1.6" />
            <line x1={x - 17} y1={y - 6} x2={x + 17} y2={y - 6} stroke={H.turquoise} strokeWidth="1.2" opacity={0.6} />
            <line x1={x - 6} y1={y - 6} x2={x - 6} y2={y + 15} stroke={H.turquoise} strokeWidth="1.2" opacity={0.6} />
            {/* replica scaling pulse */}
            {!reduced && i === 2 && (
              <motion.rect x={x - 17} y={y - 15} width="34" height="30" rx="5" fill="none" stroke={H.saffron} strokeWidth="1.6"
                animate={{ scale: [1, 1.3], opacity: [0.7, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 2 }} style={{ transformOrigin: `${x}px ${y}px` }} />
            )}
          </motion.g>
        ))}
        <motion.g {...popIn(2.1)}>
          <rect x="86" y="206" width="68" height="18" rx="9" fill={H.turquoise} />
          <text x="120" y="219" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={H.white}>{L('healthy', '✓ healthy')}</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── app-screens (mobile apps) ───────────────────────────────────── */
export function AppScreensScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.saffron} opacity={0.16} />
      <HeritageParticles count={7} />
      <svg viewBox="0 0 240 240" className={SVG}>
        {/* back phones */}
        {[[-1, H.ivory], [1, H.ivory]].map(([side, bg], i) => (
          <motion.rect key={i} x={92 + (side as number) * 30} y="56" width="56" height="128" rx="14" fill={bg as string} stroke={H.sand} strokeWidth="2"
            initial={{ opacity: 0, x: 0 }} animate={{ opacity: 0.9 }} transition={{ delay: 0.6 + i * 0.15 }} style={{ transformOrigin: '120px 120px' }} />
        ))}
        {/* front phone */}
        <motion.g initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <rect x="92" y="44" width="56" height="140" rx="16" fill={H.white} stroke={H.lapis} strokeWidth="2.5" />
          <rect x="110" y="50" width="20" height="4" rx="2" fill={H.sand} />
          {/* app header */}
          <path d="M96 64 h48 v22 a0 0 0 0 1 0 0 h-48 z" fill={H.turquoise} opacity={0.12} />
          <GirihStar cx={108} cy={76} size={8} color={H.turquoise} spin delay={1} />
          <rect x="120" y="72" width="22" height="5" rx="2.5" fill={H.turquoise} opacity={0.6} />
          {/* swiping content row */}
          <clipPath id="appClip"><rect x="96" y="92" width="48" height="50" rx="6" /></clipPath>
          <g clipPath="url(#appClip)">
            {!reduced && (
              <motion.g animate={{ x: [0, -52, -104, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.33, 0.66, 1] }}>
                {[0, 1, 2].map(i => (
                  <g key={i}>
                    <rect x={98 + i * 52} y="96" width="44" height="42" rx="6" fill={[H.turquoiseLight, `${H.saffron}22`, `${H.terracotta}22`][i]} />
                    <polygon points={starPoints(120 + i * 52, 117, 9, 5)} fill="none" stroke={[H.turquoise, H.saffron, H.terracotta][i]} strokeWidth="1.4" />
                  </g>
                ))}
              </motion.g>
            )}
          </g>
          {/* nav dots */}
          {[0, 1, 2].map(i => (
            <motion.circle key={i} cx={108 + i * 12} cy="150" r="2.6" fill={H.turquoise}
              animate={reduced ? undefined : { opacity: [0.3, 1, 0.3] }} transition={{ duration: 6, repeat: Infinity, delay: i * 2 }} />
          ))}
          <rect x="100" y="162" width="40" height="14" rx="7" fill={H.turquoise} />
        </motion.g>
        {/* notification pop */}
        {!reduced && (
          <motion.g initial={{ opacity: 0, scale: 0.4, y: 6 }} animate={{ opacity: [0, 1, 1, 0], scale: 1, y: 0 }} transition={{ duration: 3, repeat: Infinity, delay: 2, times: [0, 0.15, 0.8, 1] }}>
            <rect x="138" y="58" width="48" height="22" rx="8" fill={H.white} stroke={H.saffron} strokeWidth="1.5" />
            <circle cx="149" cy="69" r="5" fill={H.saffron} />
            <rect x="158" y="64" width="22" height="4" rx="2" fill={H.sand} />
            <rect x="158" y="71" width="14" height="3.5" rx="1.75" fill={H.ivory} />
          </motion.g>
        )}
        <motion.g {...popIn(1.8)}>
          <rect x="86" y="196" width="68" height="18" rx="9" fill={H.lapis} />
          <text x="120" y="209" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={H.white}>{L('native', 'iOS · Android')}</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── ad-creative (paid advertising) ──────────────────────────────── */
export function AdCreativeScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  const bars = [30, 48, 40, 64, 80];
  return (
    <Scene glow={H.terracotta}>
      <GirihHalo color={H.terracotta} opacity={0.18} />
      <HeritageParticles count={8} colors={[H.terracotta, H.saffron, H.turquoise]} />
      <svg viewBox="0 0 240 240" className={SVG}>
        <defs>
          <linearGradient id="adGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={H.terracotta} />
            <stop offset="100%" stopColor={H.saffron} />
          </linearGradient>
        </defs>
        {/* ad card */}
        <motion.rect x="30" y="40" width="140" height="160" rx="14" fill={H.white} stroke={H.sand} strokeWidth="2" {...drawIn(0.2, 1)} />
        <motion.rect x="30" y="40" width="140" height="74" rx="14" fill="url(#adGrad)" {...popIn(0.7)} />
        <motion.g {...popIn(0.9)} style={{ transformOrigin: '100px 77px' }}>
          <polygon points={starPoints(100, 77, 22, 12)} fill="none" stroke={H.white} strokeWidth="1.8" />
          <circle cx="100" cy="77" r="6" fill={H.white} />
        </motion.g>
        <motion.g {...popIn(1)}>
          <rect x="42" y="50" width="26" height="14" rx="7" fill={H.white} />
          <text x="55" y="60.5" textAnchor="middle" fontSize="9" fontWeight="800" fill={H.terracotta}>{L('ad', 'Ad')}</text>
        </motion.g>
        <motion.rect x="44" y="128" width="92" height="8" rx="4" fill={H.sand} {...popIn(1.2)} />
        <motion.rect x="44" y="142" width="64" height="6" rx="3" fill={H.ivory} {...popIn(1.3)} />
        <motion.g {...popIn(1.5)}>
          <rect x="44" y="162" width="60" height="22" rx="11" fill={H.turquoise} />
          <rect x="54" y="171" width="40" height="5" rx="2.5" fill="#fff" opacity="0.7" />
        </motion.g>
        {/* engagement metrics panel */}
        <motion.g {...popIn(1.4)}>
          <rect x="180" y="60" width="38" height="120" rx="10" fill={H.ivory} stroke={H.sand} />
          {bars.map((h, i) => (
            <motion.rect key={i} x={186 + (i % 2) * 0} width="0" height="5" rx="2.5" y={74 + i * 22} fill={i === 4 ? H.terracotta : H.turquoise} opacity={i === 4 ? 1 : 0.6}
              initial={{ width: 0 }} animate={{ width: reduced ? h * 0.34 : [0, h * 0.34] }} transition={{ delay: 1.6 + i * 0.12, duration: 0.6 }} />
          ))}
        </motion.g>
        {/* rising heart */}
        {!reduced && (
          <motion.path d="M199 150 c-3 -4 -10 -2 -10 4 c0 5 10 10 10 10 c0 0 10 -5 10 -10 c0 -6 -7 -8 -10 -4 z" fill={H.terracotta}
            initial={{ y: 0, opacity: 0, scale: 0.6 }} animate={{ y: [-0, -54], opacity: [0, 1, 0], scale: 1 }} transition={{ duration: 2.4, repeat: Infinity, delay: 2.2 }} style={{ transformOrigin: '199px 158px' }} />
        )}
      </svg>
    </Scene>
  );
}

/* ── film-strip (video / media production) ───────────────────────── */
export function FilmStripScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  const frameTints = [`${H.turquoise}33`, `${H.saffron}33`, `${H.terracotta}33`, `${H.lapis}33`];
  return (
    <Scene glow={H.lapis}>
      <GirihHalo color={H.saffron} opacity={0.16} />
      <HeritageParticles count={7} colors={[H.turquoise, H.saffron, H.terracotta]} />
      <svg viewBox="0 0 240 240" className={SVG}>
        <clipPath id="stripClip"><rect x="28" y="74" width="184" height="92" rx="8" /></clipPath>
        <rect x="28" y="74" width="184" height="92" rx="8" fill={H.lapisDeep} />
        <g clipPath="url(#stripClip)">
          {/* scrolling frames */}
          <motion.g animate={reduced ? undefined : { x: [0, -72] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <g key={i}>
                <rect x={36 + i * 72} y="92" width="56" height="56" rx="6" fill={frameTints[i % 4]} />
                <polygon points={starPoints(64 + i * 72, 120, 12, 7)} fill="none" stroke={H.ivory} strokeWidth="1.4" opacity={0.5} />
              </g>
            ))}
          </motion.g>
          {/* sprocket holes */}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <rect x={34 + i * 20} y="78" width="9" height="7" rx="2" fill={H.ivory} opacity={0.55} />
              <rect x={34 + i * 20} y="155" width="9" height="7" rx="2" fill={H.ivory} opacity={0.55} />
            </g>
          ))}
        </g>
        {/* center play button */}
        <motion.g {...popIn(0.8)}>
          <motion.circle cx="120" cy="120" r="26" fill={H.white}
            animate={reduced ? undefined : { scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '120px 120px' }} />
          <path d="M113 108 l18 12 l-18 12 z" fill={H.terracotta} />
          {!reduced && (
            <motion.circle cx="120" cy="120" r="26" fill="none" stroke={H.white} strokeWidth="2"
              animate={{ r: [26, 40], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }} style={{ transformOrigin: '120px 120px' }} />
          )}
        </motion.g>
        {/* progress + waveform */}
        <rect x="40" y="182" width="160" height="4" rx="2" fill={H.sand} />
        <motion.rect x="40" y="182" height="4" rx="2" fill={H.terracotta} initial={{ width: 0 }} animate={{ width: reduced ? 96 : [0, 160, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />
        {Array.from({ length: 13 }).map((_, i) => (
          <motion.rect key={i} x={42 + i * 12} width="4" rx="2" fill={H.turquoise} opacity={0.6}
            animate={reduced ? undefined : { height: [6, 6 + (i % 4) * 7 + 8, 6], y: [200, 200 - ((i % 4) * 7 + 8), 200] }}
            transition={{ duration: 1 + (i % 3) * 0.3, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }} height="6" y="200" />
        ))}
        <motion.g {...popIn(1.4)}>
          <rect x="98" y="50" width="44" height="18" rx="9" fill={H.terracotta} />
          <text x="120" y="63" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={H.white}>{L('rec', '● REC')}</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── automation-bot (RPA / workflow automation) ──────────────────── */
export function AutomationBotScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  const flow = 'M 48 64 L 120 64 L 120 120 L 192 120 L 192 176 L 96 176';
  const stops = [[48, 64], [120, 64], [120, 120], [192, 120], [192, 176], [96, 176]];
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.turquoise} opacity={0.16} />
      <HeritageParticles count={8} colors={[H.turquoise, H.saffron, H.lapis]} />
      <svg viewBox="0 0 240 240" className={SVG}>
        {/* flow path */}
        <motion.path d={flow} fill="none" stroke={H.turquoise} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.3} {...drawIn(0.3, 1.4)} />
        {!reduced && <PathDot d={flow} color={H.saffron} size={8} duration={3.4} delay={1.6} />}
        {/* trigger node (lightning) */}
        <motion.g {...popIn(0.6)}>
          <circle cx="48" cy="64" r="15" fill={H.saffron} />
          <path d="M50 56 l-7 10 h5 l-3 8 l8 -11 h-5 z" fill={H.white} />
        </motion.g>
        {/* step nodes */}
        {stops.slice(1, -1).map(([x, y], i) => (
          <motion.g key={i} {...popIn(0.9 + i * 0.18)}>
            <rect x={x - 14} y={y - 14} width="28" height="28" rx="7" fill={H.white} stroke={H.turquoise} strokeWidth="1.8" />
            <path d={`M${x - 5} ${y} l3.5 3.5 l6 -7`} fill="none" stroke={H.turquoise} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              opacity={0} />
            <motion.path d={`M${x - 5} ${y} l3.5 3.5 l6 -7`} fill="none" stroke={H.turquoise} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2 + i * 0.4, duration: 0.4 }} />
          </motion.g>
        ))}
        {/* central bot/gear */}
        <motion.g {...popIn(0.4)} style={{ transformOrigin: '120px 120px' }}>
          <circle cx="120" cy="120" r="18" fill={H.lapisDeep} />
          <motion.g style={{ transformOrigin: '120px 120px' }} animate={reduced ? undefined : { rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (Math.PI / 4) * i;
              return <rect key={i} x={118.5} y={98} width="3" height="7" rx="1" fill={H.turquoise} style={{ transformOrigin: '120px 120px' }} transform={`rotate(${(a * 180) / Math.PI} 120 120)`} />;
            })}
            <polygon points={starPoints(120, 120, 10, 5)} fill={H.saffron} />
          </motion.g>
        </motion.g>
        {/* end node */}
        <motion.g {...popIn(1.8)}>
          <circle cx="96" cy="176" r="14" fill={H.turquoise} />
          <path d="M90 176 l4 4 l8 -9" fill="none" stroke={H.white} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        <motion.g {...popIn(2.4)}>
          <rect x="138" y="196" width="74" height="18" rx="9" fill={H.turquoise} />
          <text x="175" y="209" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={H.white}>{L('automated', 'automated')}</text>
        </motion.g>
      </svg>
    </Scene>
  );
}
