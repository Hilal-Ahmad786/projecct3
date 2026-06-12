'use client';

// Data & analytics scenes: chart-graph, dashboard, data-flow, microscope.

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { H, Scene, GirihHalo, HeritageParticles, drawIn, riseIn, popIn, PathDot, starPoints } from './primitives';

/* ── Counting number ─────────────────────────────────────────────── */
function CountUp({ to, suffix = '', duration = 1800, delay = 0 }: { to: number; suffix?: string; duration?: number; delay?: number }) {
  const reduced = useReducedMotion();
  const [v, setV] = useState(reduced ? to : 0);
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const t0 = performance.now() + delay;
    const step = (t: number) => {
      const p = Math.min(Math.max((t - t0) / duration, 0), 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, delay, reduced]);
  return <>{v}{suffix}</>;
}

/* ── chart-graph ─────────────────────────────────────────────────── */
const BARS = [42, 68, 50, 84, 64, 96];
const LINE_D = 'M 16 96 C 40 88, 56 64, 78 60 C 104 54, 118 38, 150 24';

export function ChartGraphScene() {
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={10} />
      <motion.div {...riseIn(0.1)} className="absolute inset-4 sm:inset-6 flex items-center justify-center">
        <motion.div
          className="w-full rounded-xl shadow-2xl p-4 space-y-3"
          style={{ background: H.white, border: `1px solid ${H.sand}` }}
          animate={reduced ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* KPI row */}
          <div className="flex gap-2">
            {[
              { label: 'Growth', val: 247, suffix: '%', color: H.turquoise },
              { label: 'ROI', val: 5, suffix: 'x', color: H.terracotta },
              { label: 'Leads', val: 1842, suffix: '', color: H.lapis },
            ].map((kpi, i) => (
              <motion.div key={i} {...riseIn(0.4 + i * 0.15)} className="flex-1 rounded-lg px-2 py-1.5" style={{ background: H.ivory }}>
                <div className="text-[8px] uppercase tracking-wider" style={{ color: '#8a8275' }}>{kpi.label}</div>
                <div className="text-sm font-bold" style={{ color: kpi.color }}>
                  <CountUp to={kpi.val} suffix={kpi.suffix} delay={600 + i * 200} />
                </div>
              </motion.div>
            ))}
          </div>
          {/* Bars + line overlay */}
          <div className="relative h-28">
            <div className="absolute inset-0 flex items-end justify-between gap-1.5 px-1">
              {BARS.map((b, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-md"
                  style={{ background: i === BARS.length - 1 ? `linear-gradient(to top, ${H.turquoise}, ${H.saffron})` : H.turquoiseLight, border: `1px solid ${H.turquoiseLight}` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${b}%` }}
                  transition={{ delay: 0.7 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
            <svg viewBox="0 0 160 110" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <motion.path d={LINE_D} fill="none" stroke={H.terracotta} strokeWidth="2.5" strokeLinecap="round" {...drawIn(1.3, 1.4)} />
              <motion.circle cx="150" cy="24" r="4" fill={H.terracotta} {...popIn(2.6)} />
              {!reduced && (
                <motion.circle
                  cx="150" cy="24" r="4" fill="none" stroke={H.terracotta} strokeWidth="1.5"
                  animate={{ r: [4, 11], opacity: [0.7, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: 2.8 }}
                />
              )}
            </svg>
          </div>
          {/* x labels */}
          <div className="flex justify-between px-1 text-[7px]" style={{ color: '#b3aa99' }}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => <span key={m}>{m}</span>)}
          </div>
        </motion.div>
      </motion.div>
    </Scene>
  );
}

/* ── dashboard ───────────────────────────────────────────────────── */
export function DashboardScene() {
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.lapis}>
      <GirihHalo color={H.turquoise} opacity={0.18} />
      <HeritageParticles count={8} />
      <motion.div {...riseIn(0.1)} className="absolute inset-4 sm:inset-6 flex items-center justify-center">
        <motion.div
          className="w-full rounded-xl shadow-2xl overflow-hidden"
          style={{ background: H.white, border: `1px solid ${H.sand}` }}
          animate={reduced ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* header */}
          <div className="flex items-center justify-between px-3 py-2" style={{ background: H.lapis }}>
            <span className="text-[10px] font-semibold text-white tracking-wide">Operations Center</span>
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: H.saffron }}
              animate={reduced ? undefined : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </div>
          <div className="p-3 grid grid-cols-2 gap-2.5">
            {/* gauge */}
            <motion.div {...riseIn(0.4)} className="rounded-lg p-2 flex flex-col items-center" style={{ background: H.ivory }}>
              <svg viewBox="0 0 80 48" className="w-full">
                <path d="M 10 44 A 32 32 0 0 1 70 44" fill="none" stroke={H.sand} strokeWidth="7" strokeLinecap="round" />
                <motion.path
                  d="M 10 44 A 32 32 0 0 1 70 44"
                  fill="none" stroke={H.turquoise} strokeWidth="7" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.78 }}
                  transition={{ delay: 0.8, duration: 1.4, ease: 'easeOut' }}
                />
                <motion.line
                  x1="40" y1="44" x2="40" y2="18" stroke={H.terracotta} strokeWidth="2.5" strokeLinecap="round"
                  style={{ transformOrigin: '40px 44px' }}
                  initial={{ rotate: -80 }}
                  animate={reduced ? { rotate: 52 } : { rotate: [/* sweep */ -80, 58, 48, 52] }}
                  transition={{ delay: 0.8, duration: 2.2, ease: 'easeInOut' }}
                />
              </svg>
              <span className="text-[8px] font-semibold" style={{ color: H.turquoiseDeep }}>capacity 78%</span>
            </motion.div>
            {/* sparkline */}
            <motion.div {...riseIn(0.55)} className="rounded-lg p-2" style={{ background: H.ivory }}>
              <div className="text-[8px] mb-1 uppercase tracking-wider" style={{ color: '#8a8275' }}>requests/s</div>
              <svg viewBox="0 0 90 34" className="w-full">
                <motion.path
                  d="M 2 26 L 14 20 L 26 24 L 38 12 L 50 18 L 62 8 L 74 14 L 88 4"
                  fill="none" stroke={H.saffron} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  {...drawIn(0.9, 1.3)}
                />
              </svg>
              <div className="text-xs font-bold" style={{ color: H.lapis }}>
                <CountUp to={3120} delay={1200} />
              </div>
            </motion.div>
            {/* streaming table rows */}
            <motion.div {...riseIn(0.7)} className="col-span-2 rounded-lg p-2 space-y-1.5" style={{ background: H.ivory }}>
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.3, duration: 0.45 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: [H.turquoise, H.saffron, H.terracotta][i] }} />
                  <div className="h-1.5 rounded-full flex-1" style={{ background: H.sand }} />
                  <span className="text-[8px] font-bold" style={{ color: H.turquoiseDeep }}>✓</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Scene>
  );
}

/* ── data-flow (ETL pipeline) ────────────────────────────────────── */
const FLOW_PATHS = [
  'M 38 70 C 70 70, 80 120, 120 120',
  'M 38 120 L 120 120',
  'M 38 170 C 70 170, 80 120, 120 120',
  'M 152 120 C 180 120, 190 120, 212 120',
];

export function DataFlowScene() {
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.terracotta} opacity={0.18} />
      <HeritageParticles count={8} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* flow lines */}
        {FLOW_PATHS.map((d, i) => (
          <motion.path key={i} d={d} fill="none" stroke={H.turquoise} strokeWidth="1.6" strokeDasharray="4 4" opacity={0.5} {...drawIn(0.4 + i * 0.2, 0.9)} />
        ))}
        {/* travelling dots */}
        {!reduced && FLOW_PATHS.map((d, i) => (
          <PathDot key={`d${i}`} d={d} color={i === 3 ? H.saffron : H.terracotta} duration={2.4} delay={1.4 + i * 0.5} />
        ))}
        {/* source nodes */}
        {[70, 120, 170].map((y, i) => (
          <motion.g key={i} {...popIn(0.3 + i * 0.15)}>
            <rect x="14" y={y - 13} width="26" height="26" rx="7" fill={H.ivory} stroke={H.lapis} strokeWidth="1.5" />
            <polygon points={starPoints(27, y, 6.5, 3.5)} fill={H.lapis} />
          </motion.g>
        ))}
        {/* transform node (rotating girih star) */}
        <motion.g {...popIn(1)}>
          <circle cx="136" cy="120" r="22" fill={H.white} stroke={H.turquoise} strokeWidth="2" />
          <motion.polygon
            points={starPoints(136, 120, 13, 7)}
            fill="none" stroke={H.terracotta} strokeWidth="1.8"
            style={{ transformOrigin: '136px 120px' }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </motion.g>
        {/* warehouse */}
        <motion.g {...popIn(1.3)}>
          <rect x="206" y="98" width="26" height="44" rx="6" fill={H.lapis} />
          {[108, 120, 132].map((y, i) => (
            <motion.rect
              key={i} x="211" y={y - 2.5} width="16" height="5" rx="2" fill={H.saffron}
              initial={{ opacity: 0.3 }}
              animate={reduced ? undefined : { opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </motion.g>
        {/* labels */}
        <motion.text {...riseIn(1.6)} x="27" y="200" textAnchor="middle" fontSize="9" fill="#8a8275">sources</motion.text>
        <motion.text {...riseIn(1.7)} x="136" y="160" textAnchor="middle" fontSize="9" fill="#8a8275">transform</motion.text>
        <motion.text {...riseIn(1.8)} x="219" y="160" textAnchor="middle" fontSize="9" fill="#8a8275">warehouse</motion.text>
      </svg>
    </Scene>
  );
}

/* ── microscope (research / data science scan) ───────────────────── */
export function MicroscopeScene() {
  const reduced = useReducedMotion();
  const cells = Array.from({ length: 36 }, (_, i) => ({ x: (i % 6) * 30 + 30, y: Math.floor(i / 6) * 30 + 30 }));
  const anomalies = [8, 15, 27];
  return (
    <Scene glow={H.lapis}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={8} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* data grid */}
        {cells.map((c, i) => (
          <motion.circle
            key={i}
            cx={c.x} cy={c.y} r={anomalies.includes(i) ? 5 : 3.5}
            fill={anomalies.includes(i) ? H.terracotta : H.turquoiseLight}
            stroke={anomalies.includes(i) ? H.terracotta : H.turquoise}
            strokeWidth="1"
            {...popIn(0.2 + (i % 9) * 0.06)}
          />
        ))}
        {/* scanning lens */}
        <motion.g
          initial={{ x: 0, y: 0 }}
          animate={reduced ? undefined : { x: [0, 90, 30, 120, 0], y: [0, 30, 90, 60, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="60" cy="60" r="34" fill="rgba(232,163,61,0.12)" stroke={H.saffron} strokeWidth="2.5" />
          <circle cx="60" cy="60" r="34" fill="none" stroke={H.saffron} strokeWidth="1" strokeDasharray="2 5" opacity="0.7" />
          <line x1="84" y1="84" x2="104" y2="104" stroke={H.saffron} strokeWidth="5" strokeLinecap="round" />
        </motion.g>
        {/* anomaly pings */}
        {!reduced && anomalies.map((i, j) => (
          <motion.circle
            key={j}
            cx={cells[i].x} cy={cells[i].y} r="6"
            fill="none" stroke={H.terracotta} strokeWidth="1.5"
            animate={{ r: [6, 16], opacity: [0.8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 1 + j * 0.6 }}
          />
        ))}
        {/* findings badge */}
        <motion.g {...popIn(1.8)}>
          <rect x="150" y="196" width="76" height="22" rx="11" fill={H.lapis} />
          <text x="188" y="210" textAnchor="middle" fontSize="10" fontWeight="700" fill={H.white}>3 insights ✓</text>
        </motion.g>
      </svg>
    </Scene>
  );
}
