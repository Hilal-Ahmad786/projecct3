'use client';

// Marketing & design scenes: megaphone-3d, rocket-launch,
// target-bullseye, shopping-cart-3d, palette-canvas.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { H, Scene, GirihHalo, HeritageParticles, drawIn, riseIn, popIn, starPoints } from './primitives';

/* ── megaphone-3d (campaign reach) ───────────────────────────────── */
export function MegaphoneScene() {
  const reduced = useReducedMotion();
  const flyouts = [
    { icon: '♥', color: H.terracotta, x: 178, y: 64 },
    { icon: '★', color: H.saffron, x: 200, y: 108 },
    { icon: '+1', color: H.turquoise, x: 186, y: 156 },
  ];
  return (
    <Scene glow={H.saffron}>
      <GirihHalo color={H.terracotta} opacity={0.2} />
      <HeritageParticles count={10} colors={[H.saffron, H.terracotta, H.turquoise]} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* megaphone */}
        <motion.g
          {...riseIn(0.2)}
        >
          <motion.g
            animate={reduced ? undefined : { rotate: [-4, 4, -4] }}
            style={{ transformOrigin: '88px 120px' }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <polygon points="40,104 40,136 64,142 64,98" fill={H.terracotta} />
            <polygon points="64,98 128,66 128,174 64,142" fill={H.terracotta} opacity="0.9" />
            <ellipse cx="128" cy="120" rx="10" ry="54" fill={H.saffron} />
            <rect x="46" y="138" width="12" height="26" rx="4" fill={H.lapis} />
            {/* girih emblem on horn */}
            <polygon points={starPoints(92, 120, 13, 7)} fill={H.ivory} opacity="0.9" />
          </motion.g>
        </motion.g>
        {/* sound waves */}
        {[26, 44, 62].map((r, i) => (
          <motion.path
            key={i}
            d={`M 142 ${120 - r} A ${r} ${r} 0 0 1 142 ${120 + r}`}
            fill="none" stroke={H.saffron} strokeWidth="2.4" strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={reduced ? { opacity: 0.7 } : { opacity: [0, 0.9, 0], x: [0, 10] }}
            transition={{ duration: 1.8, repeat: reduced ? 0 : Infinity, delay: 0.8 + i * 0.35 }}
          />
        ))}
        {/* engagement fly-outs */}
        {flyouts.map((f, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, x: -40, scale: 0.4 }}
            animate={reduced ? { opacity: 1, x: 0, scale: 1 } : { opacity: [0, 1, 1, 0], x: [-40, 0, 14], y: [0, -6, -14], scale: [0.4, 1, 1] }}
            transition={{ duration: 2.6, repeat: reduced ? 0 : Infinity, delay: 1.2 + i * 0.8, repeatDelay: 0.6 }}
          >
            <circle cx={f.x} cy={f.y} r="13" fill={H.white} stroke={f.color} strokeWidth="1.8" />
            <text x={f.x} y={f.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={f.color}>{f.icon}</text>
          </motion.g>
        ))}
        {/* reach badge */}
        <motion.g {...popIn(1.8)}>
          <rect x="74" y="196" width="92" height="22" rx="11" fill={H.terracotta} />
          <text x="120" y="211" textAnchor="middle" fontSize="10" fontWeight="700" fill={H.white}>reach +312% ↗</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── rocket-launch (growth) ──────────────────────────────────────── */
export function RocketLaunchScene() {
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.terracotta}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={10} colors={[H.saffron, H.terracotta, H.turquoise]} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* growth line behind */}
        <motion.path
          d="M 28 208 C 70 200, 96 168, 122 132 C 146 100, 168 72, 204 40"
          fill="none" stroke={H.turquoise} strokeWidth="2" strokeDasharray="6 5" opacity="0.5"
          {...drawIn(0.4, 1.8)}
        />
        {[ [28, 208], [96, 170], [150, 96] ].map(([x, y], i) => (
          <motion.polygon key={i} points={starPoints(x, y, 6, 3.4)} fill={H.turquoise} {...popIn(0.8 + i * 0.4)} />
        ))}
      </svg>
      {/* rocket rides the curve */}
      <motion.div
        className="absolute"
        initial={{ left: '8%', top: '78%', opacity: 0 }}
        animate={reduced
          ? { left: '70%', top: '14%', opacity: 1 }
          : { left: ['8%', '36%', '70%'], top: ['78%', '52%', '14%'], opacity: 1 }}
        transition={{ delay: 0.8, duration: 3, ease: [0.34, 1, 0.46, 1] }}
        style={{ width: 64, height: 64, marginLeft: -32, marginTop: -32 }}
      >
        <motion.svg
          viewBox="0 0 64 64"
          animate={reduced ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 3.8 }}
          style={{ rotate: 38 }}
        >
          {/* body */}
          <path d="M 32 4 C 42 14 46 28 44 42 H 20 C 18 28 22 14 32 4 Z" fill={H.ivory} stroke={H.lapis} strokeWidth="2" />
          {/* girih porthole */}
          <circle cx="32" cy="24" r="7.5" fill={H.white} stroke={H.turquoise} strokeWidth="2" />
          <polygon points={starPoints(32, 24, 4.4, 2.5)} fill={H.turquoise} />
          {/* fins */}
          <path d="M 20 42 L 10 54 L 22 50 Z" fill={H.terracotta} />
          <path d="M 44 42 L 54 54 L 42 50 Z" fill={H.terracotta} />
          {/* exhaust */}
          <motion.path
            d="M 27 50 Q 32 64 37 50 Z"
            fill={H.saffron}
            animate={reduced ? undefined : { scaleY: [1, 1.6, 1], opacity: [0.8, 1, 0.8] }}
            style={{ transformOrigin: '32px 50px' }}
            transition={{ duration: 0.35, repeat: Infinity }}
          />
        </motion.svg>
        {/* exhaust sparks */}
        {!reduced && [0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{ background: [H.saffron, H.terracotta, H.saffron][i], left: 22 + i * 8, top: 52 }}
            animate={{ y: [0, 22], x: [0, (i - 1) * 12], opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </motion.div>
      {/* metric badge */}
      <motion.div {...popIn(3.6)} className="absolute left-1/2 -translate-x-1/2 bottom-5 px-3 py-1 rounded-full text-[10px] font-bold shadow-md" style={{ background: H.lapis, color: H.white }}>
        scale-up mode 🚀
      </motion.div>
    </Scene>
  );
}

/* ── target-bullseye (precision targeting) ───────────────────────── */
export function TargetBullseyeScene() {
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.terracotta}>
      <GirihHalo color={H.terracotta} opacity={0.2} />
      <HeritageParticles count={8} colors={[H.terracotta, H.saffron, H.turquoise]} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* rings */}
        {[78, 58, 38, 18].map((r, i) => (
          <motion.circle
            key={i}
            cx="116" cy="124" r={r}
            fill={i === 3 ? H.terracotta : 'none'}
            stroke={i % 2 === 0 ? H.terracotta : H.saffron}
            strokeWidth={i === 3 ? 0 : 2.4}
            {...popIn(0.25 + i * 0.18)}
          />
        ))}
        {/* girih ring ornament between circles */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (Math.PI / 4) * i;
          return (
            <motion.polygon
              key={i}
              points={starPoints(116 + 68 * Math.cos(a), 124 + 68 * Math.sin(a), 4.6, 2.6)}
              fill={H.saffron}
              {...popIn(0.9 + i * 0.06)}
            />
          );
        })}
        {/* arrow flies in */}
        <motion.g
          initial={{ x: 150, y: -150, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <line x1="116" y1="124" x2="170" y2="70" stroke={H.lapis} strokeWidth="3.4" strokeLinecap="round" />
          {/* fletching */}
          <path d="M 170 70 l 10 -2 l -6 -4 z" fill={H.turquoise} />
          <path d="M 170 70 l 2 -10 l -7 3 z" fill={H.turquoise} />
        </motion.g>
        {/* impact ripple */}
        {!reduced && (
          <motion.circle
            cx="116" cy="124" r="18"
            fill="none" stroke={H.terracotta} strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ r: [18, 56], opacity: [0.8, 0] }}
            transition={{ delay: 2, duration: 1.6, repeat: Infinity, repeatDelay: 1.4 }}
          />
        )}
        {/* score popup */}
        <motion.g
          initial={{ opacity: 0, y: 10, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <rect x="156" y="172" width="64" height="24" rx="12" fill={H.lapis} />
          <text x="188" y="188" textAnchor="middle" fontSize="11" fontWeight="800" fill={H.saffron}>100%</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── shopping-cart-3d (e-commerce) ───────────────────────────────── */
export function ShoppingCartScene() {
  const reduced = useReducedMotion();
  const products = [
    { x: 60, color: H.turquoise, delay: 1 },
    { x: 96, color: H.saffron, delay: 1.5 },
    { x: 132, color: H.terracotta, delay: 2 },
  ];
  return (
    <Scene glow={H.saffron}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={8} colors={[H.saffron, H.terracotta, H.turquoise]} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* products hop into cart */}
        {products.map((p, i) => (
          <motion.g
            key={i}
            initial={{ x: p.x - 120, y: -110, opacity: 0, rotate: -14 }}
            animate={{ x: [p.x - 120, p.x - 122, p.x - 124], y: [-110, -150, 0], opacity: 1, rotate: 0 }}
            transition={{ delay: p.delay, duration: 0.8, ease: 'easeIn', times: [0, 0.4, 1] }}
            style={{ transformOrigin: '120px 120px' }}
          >
            <rect x="106" y="96" width="28" height="28" rx="7" fill={p.color} />
            <polygon points={starPoints(120, 110, 8, 4.5)} fill={H.white} opacity="0.85" />
          </motion.g>
        ))}
        {/* cart */}
        <motion.g {...riseIn(0.3)}>
          <path d="M 50 92 H 70 L 86 158 H 168 L 186 104 H 80" fill="none" stroke={H.lapis} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* basket girih panel */}
          <motion.path
            d="M 84 112 H 178 L 170 150 H 92 Z"
            fill="rgba(26,58,107,0.08)" stroke={H.lapis} strokeWidth="1.4"
            {...popIn(0.6)}
          />
          <circle cx="100" cy="180" r="9" fill={H.lapis} />
          <circle cx="100" cy="180" r="3.4" fill={H.saffron} />
          <circle cx="156" cy="180" r="9" fill={H.lapis} />
          <circle cx="156" cy="180" r="3.4" fill={H.saffron} />
        </motion.g>
        {/* item counter badge */}
        <motion.g {...popIn(2.6)}>
          <circle cx="182" cy="84" r="13" fill={H.terracotta} />
          <text x="182" y="89" textAnchor="middle" fontSize="12" fontWeight="800" fill={H.white}>3</text>
        </motion.g>
        {!reduced && (
          <motion.circle
            cx="182" cy="84" r="13" fill="none" stroke={H.terracotta} strokeWidth="1.6"
            animate={{ r: [13, 24], opacity: [0.7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 2.9 }}
          />
        )}
        {/* checkout button */}
        <motion.g {...popIn(3)}>
          <rect x="76" y="204" width="88" height="24" rx="12" fill={H.turquoise} />
          <text x="120" y="220" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={H.white}>checkout ✓</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── palette-canvas (design) ─────────────────────────────────────── */
export function PaletteCanvasScene() {
  const reduced = useReducedMotion();
  const swatches = [H.turquoise, H.lapis, H.terracotta, H.saffron];
  return (
    <Scene glow={H.terracotta}>
      <GirihHalo color={H.terracotta} opacity={0.2} />
      <HeritageParticles count={8} colors={[H.terracotta, H.saffron, H.turquoise]} />
      <motion.div {...riseIn(0.1)} className="absolute inset-5 sm:inset-7 flex items-center justify-center">
        <motion.div
          className="w-full rounded-xl shadow-2xl overflow-hidden"
          style={{ background: H.white, border: `1px solid ${H.sand}` }}
          animate={reduced ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* toolbar */}
          <div className="flex items-center gap-2 px-3 py-2" style={{ background: H.ivory, borderBottom: `1px solid ${H.sand}` }}>
            {swatches.map((c, i) => (
              <motion.span
                key={i}
                {...popIn(0.4 + i * 0.12)}
                className="w-4 h-4 rounded-full border-2"
                style={{ background: c, borderColor: i === 0 ? H.ink : 'transparent' }}
              />
            ))}
            <span className="ml-auto text-[9px] font-semibold" style={{ color: '#8a8275' }}>canvas.fig</span>
          </div>
          {/* canvas */}
          <div className="relative h-44">
            <svg viewBox="0 0 220 150" className="absolute inset-0 w-full h-full">
              {/* brush strokes draw in heritage colors */}
              <motion.path
                d="M 18 116 C 48 66, 92 60, 124 84 C 148 102, 178 96, 202 64"
                fill="none" stroke={H.turquoise} strokeWidth="9" strokeLinecap="round"
                {...drawIn(0.8, 1.5)}
              />
              <motion.path
                d="M 26 44 C 60 26, 96 32, 120 46"
                fill="none" stroke={H.saffron} strokeWidth="6" strokeLinecap="round"
                {...drawIn(1.6, 1)}
              />
              {/* pen path with bezier handles */}
              <motion.path
                d="M 140 124 C 162 108, 186 122, 204 108"
                fill="none" stroke={H.terracotta} strokeWidth="2" strokeDasharray="1 0"
                {...drawIn(2.3, 0.9)}
              />
              {[ [140, 124], [204, 108] ].map(([x, y], i) => (
                <motion.g key={i} {...popIn(2.6 + i * 0.2)}>
                  <line x1={x} y1={y} x2={x + 16} y2={y - 14} stroke={H.terracotta} strokeWidth="1" opacity="0.6" />
                  <circle cx={x} cy={y} r="3.4" fill={H.white} stroke={H.terracotta} strokeWidth="1.6" />
                  <circle cx={x + 16} cy={y - 14} r="2.4" fill={H.terracotta} />
                </motion.g>
              ))}
              {/* girih stamp appears */}
              <motion.polygon
                points={starPoints(52, 104, 16, 9)}
                fill="none" stroke={H.lapis} strokeWidth="1.8"
                {...drawIn(2.9, 1)}
              />
            </svg>
            {/* cursor */}
            {!reduced && (
              <motion.div
                className="absolute w-3 h-3"
                initial={{ left: '8%', top: '72%' }}
                animate={{ left: ['8%', '52%', '88%', '60%'], top: ['72%', '50%', '40%', '78%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <svg viewBox="0 0 12 12"><path d="M 1 1 L 11 5.5 L 6 6.5 L 4.5 11 Z" fill={H.ink} /></svg>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </Scene>
  );
}
