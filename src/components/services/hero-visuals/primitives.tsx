'use client';

// Modern Heritage scene primitives — shared building blocks for the
// service hero-visual scenes. Deterministic (no Math.random) so SSR and
// client renders agree.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

// ── Localized scene labels ───────────────────────────────────────────
// Scenes contain short UI words ("secured", "checkout"). They resolve
// through the sceneLabels section of the locale files; the EN fallback
// keeps scenes working if a key is ever missing.
export function useSceneLabels() {
  const { t } = useTranslations();
  return (key: string, fallback: string): string => {
    const v = t(`sceneLabels.${key}`);
    return typeof v === 'string' && !v.includes('sceneLabels') ? v : fallback;
  };
}

// ── Palette ──────────────────────────────────────────────────────────
export const H = {
  turquoise: '#0e7c7b',
  turquoiseDeep: '#095d5c',
  turquoiseLight: '#e6f2f2',
  lapis: '#1a3a6b',
  lapisDeep: '#122a4f',
  terracotta: '#c4572e',
  saffron: '#e8a33d',
  ivory: '#faf6ef',
  sand: '#f3ecdf',
  ink: '#1a1a1a',
  white: '#ffffff',
} as const;

// ── Geometry helpers ─────────────────────────────────────────────────

/** Points of an 8-point star polygon centred at (cx,cy). */
export function starPoints(cx: number, cy: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 16; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / 8) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

/** Octagon path (girih tile silhouette) centred at (cx,cy). */
export function octagonPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 4) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

// ── Scene wrapper ────────────────────────────────────────────────────

interface SceneProps {
  children: React.ReactNode;
  /** Ambient radial glow color */
  glow?: string;
  className?: string;
}

/** Standard square canvas every scene renders into. */
export function Scene({ children, glow = H.turquoise, className = '' }: SceneProps) {
  return (
    <div className={`relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto ${className}`}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full blur-3xl pointer-events-none"
        style={{ background: glow, opacity: 0.12 }}
      />
      {children}
    </div>
  );
}

// ── Girih star ornament ──────────────────────────────────────────────

interface GirihStarProps {
  cx: number;
  cy: number;
  size: number;
  color?: string;
  filled?: boolean;
  /** Continuous slow self-rotation */
  spin?: boolean;
  delay?: number;
}

export function GirihStar({ cx, cy, size, color = H.turquoise, filled = false, spin = false, delay = 0 }: GirihStarProps) {
  const reduced = useReducedMotion();
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <motion.polygon
        points={starPoints(cx, cy, size, size * 0.55)}
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={filled ? 0 : 1.4}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        animate={spin && !reduced ? { rotate: 360 } : undefined}
        transition={spin ? { duration: 40, repeat: Infinity, ease: 'linear' } : undefined}
      />
    </motion.g>
  );
}

// ── Rotating girih halo behind a scene ───────────────────────────────

export function GirihHalo({ size = 360, color = H.saffron, opacity = 0.25 }: { size?: number; color?: string; opacity?: number }) {
  const reduced = useReducedMotion();
  const r = size / 2 - 16;
  const stars = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 4) * i;
    return { x: size / 2 + r * Math.cos(a), y: size / 2 + r * Math.sin(a) };
  });
  return (
    <motion.svg
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      animate={reduced ? undefined : { rotate: 360 }}
      transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="3 6" />
      {stars.map((s, i) => (
        <polygon key={i} points={starPoints(s.x, s.y, 7, 4)} fill="none" stroke={color} strokeWidth="1" />
      ))}
    </motion.svg>
  );
}

// ── Deterministic floating particles ─────────────────────────────────

const PARTICLE_SEEDS = [
  [8, 22], [18, 72], [30, 12], [42, 88], [55, 28], [64, 64],
  [76, 16], [85, 78], [12, 48], [92, 42], [38, 52], [70, 40],
  [25, 92], [58, 8], [88, 58], [5, 80], [48, 70], [80, 30],
];

export function HeritageParticles({ count = 12, colors = [H.turquoise, H.saffron, H.terracotta] }: { count?: number; colors?: string[] }) {
  const reduced = useReducedMotion();
  const items = PARTICLE_SEEDS.slice(0, Math.min(count, PARTICLE_SEEDS.length));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {items.map(([x, y], i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            background: colors[i % colors.length],
            opacity: 0.25,
          }}
          animate={reduced ? undefined : { y: [0, -18, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: (i % 6) * 0.7, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ── Stroke draw-in helper props ──────────────────────────────────────

export function drawIn(delay = 0, duration = 1) {
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { delay, duration, ease: 'easeInOut' as const },
  };
}

/** Dot travelling along an SVG path (uses offset-path). */
export function PathDot({ d, color = H.saffron, size = 5, duration = 3, delay = 0 }: { d: string; color?: string; size?: number; duration?: number; delay?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <motion.circle
      r={size / 2}
      fill={color}
      initial={{ offsetDistance: '0%', opacity: 0 }}
      animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{ offsetPath: `path("${d}")` }}
    />
  );
}

// ── Pop-in entrance for grouped elements ─────────────────────────────

export function popIn(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] as const },
  };
}

export function riseIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  };
}
