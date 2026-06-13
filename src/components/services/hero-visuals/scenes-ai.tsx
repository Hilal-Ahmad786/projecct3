'use client';

// AI & ML scenes: brain-network, network-nodes, chat-bubbles,
// lightbulb, circuit-board.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { H, Scene, GirihHalo, HeritageParticles, drawIn, riseIn, popIn, starPoints , useSceneLabels } from './primitives';

/* ── brain-network (neural net with cascading signals) ───────────── */
const NN_LAYERS = [
  [{ y: 70 }, { y: 120 }, { y: 170 }],
  [{ y: 50 }, { y: 97 }, { y: 143 }, { y: 190 }],
  [{ y: 70 }, { y: 120 }, { y: 170 }],
  [{ y: 95 }, { y: 145 }],
];
const NN_X = [36, 100, 164, 220];

export function BrainNetworkScene() {
  const reduced = useReducedMotion();
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  NN_LAYERS.forEach((layer, li) => {
    if (li === NN_LAYERS.length - 1) return;
    layer.forEach(a => NN_LAYERS[li + 1].forEach(b => {
      edges.push({ x1: NN_X[li], y1: a.y, x2: NN_X[li + 1], y2: b.y });
    }));
  });
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={10} />
      <svg viewBox="0 0 250 240" className="absolute inset-0 w-full h-full">
        {/* edges */}
        {edges.map((e, i) => (
          <motion.line
            key={i}
            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke={H.turquoise} strokeWidth="0.8"
            initial={{ opacity: 0 }}
            animate={reduced ? { opacity: 0.25 } : { opacity: [0.12, 0.45, 0.12] }}
            transition={{ duration: 2.6, repeat: reduced ? 0 : Infinity, delay: 0.6 + (i % 12) * 0.18 }}
          />
        ))}
        {/* signal pulses left→right */}
        {!reduced && [0, 1, 2].map(j => (
          <motion.circle
            key={j}
            r="3.5" fill={H.saffron}
            initial={{ cx: NN_X[0], cy: NN_LAYERS[0][j].y, opacity: 0 }}
            animate={{
              cx: [NN_X[0], NN_X[1], NN_X[2], NN_X[3]],
              cy: [NN_LAYERS[0][j].y, NN_LAYERS[1][(j + 1) % 4].y, NN_LAYERS[2][j].y, NN_LAYERS[3][j % 2].y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 1 + j * 0.8, ease: 'easeInOut' }}
          />
        ))}
        {/* neurons — girih stars */}
        {NN_LAYERS.map((layer, li) =>
          layer.map((n, ni) => (
            <motion.g key={`${li}-${ni}`} {...popIn(0.3 + li * 0.2 + ni * 0.08)}>
              <circle cx={NN_X[li]} cy={n.y} r="11" fill={H.white} stroke={li === NN_LAYERS.length - 1 ? H.terracotta : H.lapis} strokeWidth="1.6" />
              <motion.polygon
                points={starPoints(NN_X[li], n.y, 6, 3.4)}
                fill={li === NN_LAYERS.length - 1 ? H.terracotta : H.turquoise}
                animate={reduced ? undefined : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: li * 0.4 + ni * 0.2 }}
              />
            </motion.g>
          ))
        )}
        {/* output confidence bars */}
        <motion.g {...riseIn(1.8)}>
          {[{ y: 95, w: 0.86 }, { y: 145, w: 0.58 }].map((o, i) => (
            <g key={i}>
              <rect x="232" y={o.y - 4} width="14" height="8" rx="3" fill={H.sand} />
              <motion.rect
                x="232" y={o.y - 4} height="8" rx="3" fill={H.saffron}
                initial={{ width: 0 }}
                animate={{ width: 14 * o.w }}
                transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
              />
            </g>
          ))}
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── network-nodes (constellation graph) ─────────────────────────── */
const NODES = [
  { x: 120, y: 120, r: 14, color: H.turquoise },
  { x: 52, y: 64, r: 9, color: H.lapis },
  { x: 188, y: 58, r: 9, color: H.terracotta },
  { x: 50, y: 178, r: 9, color: H.saffron },
  { x: 192, y: 180, r: 9, color: H.lapis },
  { x: 120, y: 32, r: 7, color: H.saffron },
  { x: 32, y: 120, r: 7, color: H.terracotta },
  { x: 210, y: 120, r: 7, color: H.turquoise },
];
const LINKS: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 5], [1, 6], [3, 6], [2, 7], [4, 7]];

export function NetworkNodesScene() {
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.turquoise} opacity={0.2} />
      <HeritageParticles count={12} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {LINKS.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y}
            stroke={H.turquoise} strokeWidth="1.2"
            {...drawIn(0.3 + i * 0.12, 0.7)}
            opacity={0.45}
          />
        ))}
        {/* packets travelling on links */}
        {!reduced && LINKS.slice(0, 6).map(([a, b], i) => (
          <motion.circle
            key={`p${i}`}
            r="2.6" fill={H.saffron}
            initial={{ cx: NODES[a].x, cy: NODES[a].y, opacity: 0 }}
            animate={{ cx: [NODES[a].x, NODES[b].x], cy: [NODES[a].y, NODES[b].y], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 1.4 + i * 0.5, repeatDelay: 1.2 }}
          />
        ))}
        {NODES.map((n, i) => (
          <motion.g key={i} {...popIn(0.2 + i * 0.12)}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={H.white} stroke={n.color} strokeWidth="1.8" />
            <motion.polygon
              points={starPoints(n.x, n.y, n.r * 0.55, n.r * 0.3)}
              fill={n.color}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              animate={reduced ? undefined : { rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 24 + i * 4, repeat: Infinity, ease: 'linear' }}
            />
            {i === 0 && !reduced && (
              <motion.circle
                cx={n.x} cy={n.y} r={n.r}
                fill="none" stroke={H.turquoise} strokeWidth="1.5"
                animate={{ r: [n.r, n.r + 14], opacity: [0.6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}
              />
            )}
          </motion.g>
        ))}
      </svg>
    </Scene>
  );
}

/* ── chat-bubbles (AI conversation) ──────────────────────────────── */
export function ChatBubblesScene() {
  const L = useSceneLabels();
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.terracotta}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={8} />
      <div className="absolute inset-6 sm:inset-8 flex flex-col justify-center gap-3">
        {/* user message */}
        <motion.div
          initial={{ opacity: 0, x: 28, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="self-end max-w-[75%] rounded-2xl rounded-br-md px-3.5 py-2.5 shadow-md"
          style={{ background: H.lapis }}
        >
          <div className="text-[10px] text-white leading-relaxed">{L('chatQuestion', 'Can you summarize today’s sales report?')}</div>
        </motion.div>

        {/* typing indicator → answer */}
        <motion.div
          initial={{ opacity: 0, x: -28, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="self-start max-w-[80%] rounded-2xl rounded-bl-md px-3.5 py-2.5 shadow-md relative"
          style={{ background: H.white, border: `1px solid ${H.sand}` }}
        >
          {/* AI badge */}
          <motion.span
            {...popIn(1.2)}
            className="absolute -top-2.5 -left-2 w-6 h-6 rounded-full flex items-center justify-center shadow"
            style={{ background: H.turquoise }}
          >
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5">
              <polygon points={starPoints(8, 8, 6, 3.4)} fill={H.white} />
            </svg>
          </motion.span>
          {/* typing dots, then text */}
          <motion.div
            className="flex gap-1 py-1"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, height: 0 }}
            transition={{ delay: 2.4, duration: 0.3 }}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: H.turquoise }}
                animate={reduced ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18 }}
              />
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 2.6, duration: 0.4 }}
            className="text-[10px] leading-relaxed"
            style={{ color: H.ink }}
          >
            {L('chatAnswerPre', 'Revenue is up')} <b style={{ color: H.turquoiseDeep }}>+24%</b> {L('chatAnswerMid', '— 312 orders. Top region:')} <b style={{ color: H.terracotta }}>Istanbul</b> 🎯
          </motion.div>
        </motion.div>

        {/* quick replies */}
        <motion.div {...riseIn(3.2)} className="self-start flex gap-1.5">
          {[L('fullReport', 'Full report'), L('forecast', 'Forecast')].map((label, i) => (
            <motion.span
              key={label}
              className="text-[9px] font-semibold px-2.5 py-1 rounded-full"
              style={{ border: `1.2px solid ${H.turquoise}`, color: H.turquoiseDeep, background: H.turquoiseLight }}
              animate={reduced ? undefined : { y: [0, -3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
            >
              {label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </Scene>
  );
}

/* ── lightbulb (idea ignition) ───────────────────────────────────── */
export function LightbulbScene() {
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.saffron}>
      <GirihHalo color={H.saffron} opacity={0.25} />
      <HeritageParticles count={10} colors={[H.saffron, H.terracotta, H.turquoise]} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* radiating rays */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (Math.PI / 4) * i - Math.PI / 2;
          const x1 = 120 + 62 * Math.cos(a), y1 = 104 + 62 * Math.sin(a);
          const x2 = 120 + 84 * Math.cos(a), y2 = 104 + 84 * Math.sin(a);
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={H.saffron} strokeWidth="2.5" strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={reduced ? { opacity: 0.8 } : { opacity: [0, 1, 0.4, 1], scale: [0.9, 1.06, 1] }}
              style={{ transformOrigin: '120px 104px' }}
              transition={{ delay: 1.6 + i * 0.06, duration: 2.6, repeat: reduced ? 0 : Infinity, repeatDelay: 0.8 }}
            />
          );
        })}
        {/* bulb glass */}
        <motion.circle
          cx="120" cy="104" r="46"
          fill="rgba(232,163,61,0.13)" stroke={H.saffron} strokeWidth="2.2"
          {...popIn(0.3)}
        />
        {/* girih filament ignites */}
        <motion.polygon
          points={starPoints(120, 104, 24, 13)}
          fill="none" stroke={H.terracotta} strokeWidth="2"
          {...drawIn(0.7, 1.4)}
        />
        <motion.polygon
          points={starPoints(120, 104, 12, 7)}
          fill={H.saffron}
          initial={{ opacity: 0, scale: 0 }}
          animate={reduced ? { opacity: 1, scale: 1 } : { opacity: [0, 1, 0.75, 1], scale: 1 }}
          style={{ transformOrigin: '120px 104px' }}
          transition={{ delay: 1.7, duration: 2.4, repeat: reduced ? 0 : Infinity, repeatDelay: 1 }}
        />
        {/* base */}
        <motion.g {...riseIn(0.5)}>
          <rect x="106" y="150" width="28" height="7" rx="3.5" fill={H.lapis} />
          <rect x="109" y="159" width="22" height="6" rx="3" fill={H.lapis} opacity="0.75" />
          <rect x="112" y="167" width="16" height="5" rx="2.5" fill={H.lapis} opacity="0.5" />
        </motion.g>
        {/* orbiting spark */}
        {!reduced && (
          <motion.g style={{ transformOrigin: '120px 104px' }} animate={{ rotate: 360 }} transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}>
            <circle cx="120" cy="34" r="4" fill={H.terracotta} />
          </motion.g>
        )}
      </svg>
    </Scene>
  );
}

/* ── circuit-board ───────────────────────────────────────────────── */
const TRACES = [
  'M 30 60 H 90 V 100 H 104',
  'M 30 120 H 104',
  'M 30 180 H 90 V 140 H 104',
  'M 210 60 H 150 V 100 H 136',
  'M 210 120 H 136',
  'M 210 180 H 150 V 140 H 136',
];

export function CircuitBoardScene() {
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.turquoise} opacity={0.18} />
      <HeritageParticles count={8} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* traces */}
        {TRACES.map((d, i) => (
          <g key={i}>
            <motion.path d={d} fill="none" stroke={H.turquoise} strokeWidth="2" strokeLinecap="round" {...drawIn(0.3 + i * 0.18, 0.9)} opacity={0.6} />
            {!reduced && (
              <motion.circle
                r="2.6" fill={H.saffron}
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 + i * 0.4 }}
                style={{ offsetPath: `path("${d}")` }}
              />
            )}
            {/* via pads at trace start */}
            <motion.circle cx={d.startsWith('M 30') ? 30 : 210} cy={parseFloat(d.split(' ')[2])} r="4.5" fill={H.white} stroke={H.lapis} strokeWidth="1.6" {...popIn(0.3 + i * 0.15)} />
          </g>
        ))}
        {/* CPU chip with girih die */}
        <motion.g {...popIn(1.1)}>
          <rect x="104" y="88" width="32" height="64" rx="6" fill={H.lapis} />
          <motion.polygon
            points={starPoints(120, 120, 11, 6)}
            fill="none" stroke={H.saffron} strokeWidth="1.6"
            style={{ transformOrigin: '120px 120px' }}
            animate={reduced ? undefined : { rotate: 360, opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />
          {/* pins */}
          {[96, 112, 128, 144].map((y, i) => (
            <g key={i}>
              <rect x="99" y={y} width="5" height="3" rx="1.5" fill={H.saffron} />
              <rect x="136" y={y} width="5" height="3" rx="1.5" fill={H.saffron} />
            </g>
          ))}
        </motion.g>
        {!reduced && (
          <motion.rect
            x="104" y="88" width="32" height="64" rx="6"
            fill="none" stroke={H.turquoise} strokeWidth="1.5"
            animate={{ scale: [1, 1.25], opacity: [0.7, 0] }}
            style={{ transformOrigin: '120px 120px' }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
          />
        )}
      </svg>
    </Scene>
  );
}
