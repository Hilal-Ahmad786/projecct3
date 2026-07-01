'use client';

// Web & software scenes: code-editor, terminal, mobile-device,
// layers-stack, puzzle-pieces, server-stack.

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { H, Scene, GirihHalo, HeritageParticles, popIn, riseIn, starPoints , useSceneLabels } from './primitives';

/* ── Looping typewriter for short code lines ─────────────────────── */
function useLoopTyping(lines: string[], speed = 45, holdMs = 2600) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState<string[]>(reduced ? lines : ['']);
  useEffect(() => {
    if (reduced) return;
    let line = 0, ch = 0, cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (cancelled) return;
      if (line >= lines.length) {
        timer = setTimeout(() => { line = 0; ch = 0; setShown(['']); tick(); }, holdMs);
        return;
      }
      const cur = lines[line];
      if (ch < cur.length) {
        ch += 1;
        setShown(prev => {
          const next = [...prev];
          next[line] = cur.slice(0, ch);
          return next;
        });
        timer = setTimeout(tick, speed);
      } else {
        line += 1; ch = 0;
        setShown(prev => [...prev, '']);
        timer = setTimeout(tick, 220);
      }
    };
    timer = setTimeout(tick, 400);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [lines, speed, holdMs, reduced]);
  return shown;
}

const EDITOR_LINES = [
  'export async function build() {',
  '  const app = await create({',
  '    locale: ["en","tr","de","ur","ar"],',
  '    performance: "lighthouse-95+",',
  '  })',
  '  return app.deploy()',
  '}',
];

function tokenColor(word: string): string {
  if (/^(export|async|function|const|await|return)$/.test(word)) return '#7dd3c8';
  if (/^".*"?,?$/.test(word) || /^\[".*$/.test(word)) return H.saffron;
  if (/^[A-Za-z]+\(/.test(word)) return '#9bb8e8';
  return '#d7e0ea';
}

/* ── code-editor ─────────────────────────────────────────────────── */
export function CodeEditorScene() {
  const L = useSceneLabels();
  const reduced = useReducedMotion();
  const lines = useLoopTyping(EDITOR_LINES);
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={10} />
      <motion.div {...riseIn(0.1)} className="absolute inset-4 sm:inset-6 flex items-center justify-center">
        <motion.div
          className="w-full rounded-xl overflow-hidden shadow-2xl border"
          style={{ background: H.lapisDeep, borderColor: 'rgba(232,163,61,0.35)' }}
          animate={reduced ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: H.lapis }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: H.terracotta }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: H.saffron }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: H.turquoise }} />
            <span className="ml-2 text-[10px] tracking-wide" style={{ color: '#9fb3d1' }}>app/page.tsx</span>
            <motion.span
              className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
              style={{ background: 'rgba(14,124,123,0.25)', color: '#7dd3c8' }}
              animate={reduced ? undefined : { opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ● {L('live', 'live')}
            </motion.span>
          </div>
          {/* Code body */}
          <div className="px-3 py-3 font-mono text-[10px] sm:text-[11px] leading-5 min-h-[150px]">
            {lines.map((l, i) => (
              <div key={i} className="flex gap-2 whitespace-pre">
                <span className="w-4 text-right select-none" style={{ color: '#46618f' }}>{i + 1}</span>
                <span>
                  {l.split(/(\s+)/).map((w, j) => (
                    <span key={j} style={{ color: tokenColor(w.trim()) }}>{w}</span>
                  ))}
                  {i === lines.length - 1 && !reduced && (
                    <motion.span
                      className="inline-block w-1.5 h-3 align-middle ml-0.5"
                      style={{ background: H.saffron }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </span>
              </div>
            ))}
          </div>
          {/* Status bar with lighthouse score */}
          <div className="flex items-center justify-between px-3 py-1.5 text-[9px]" style={{ background: H.lapis, color: '#9fb3d1' }}>
            <span>✓ {L('noErrors', '0 errors')}</span>
            <motion.span {...popIn(1.4)} className="font-semibold" style={{ color: H.saffron }}>⚡ 98 Lighthouse</motion.span>
          </div>
        </motion.div>
      </motion.div>
    </Scene>
  );
}

/* ── terminal ────────────────────────────────────────────────────── */
const TERM_STEPS = [
  { cmd: 'paksoft deploy --prod', out: '✓ build complete (2.1s)' },
  { cmd: '', out: '✓ 5 locales compiled' },
  { cmd: '', out: '➜ live at paksofts.com' },
];

export function TerminalScene() {
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.turquoise} opacity={0.18} />
      <HeritageParticles count={8} />
      <motion.div {...riseIn(0.1)} className="absolute inset-6 sm:inset-8 flex items-center justify-center">
        <motion.div
          className="w-full rounded-xl overflow-hidden shadow-2xl"
          style={{ background: '#0d1f1f', border: '1px solid rgba(14,124,123,0.5)' }}
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: '#10302f' }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: H.terracotta }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: H.saffron }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: H.turquoise }} />
            <span className="ml-2 text-[10px]" style={{ color: '#6fa8a7' }}>zsh — automation</span>
          </div>
          <div className="px-3 py-3 font-mono text-[10px] sm:text-[11px] leading-6 min-h-[140px]">
            {TERM_STEPS.map((s, i) => (
              <motion.div key={i} {...riseIn(0.5 + i * 0.8)}>
                {s.cmd && (
                  <div>
                    <span style={{ color: H.saffron }}>➜ </span>
                    <span style={{ color: '#e8f2f1' }}>{s.cmd}</span>
                  </div>
                )}
                <div style={{ color: '#7dd3c8' }}>{s.out}</div>
              </motion.div>
            ))}
            {/* progress bar */}
            <motion.div {...riseIn(0.7)} className="mt-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#10302f' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(to right, ${H.turquoise}, ${H.saffron})` }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.9, duration: 1.6, ease: 'easeInOut' }}
              />
            </motion.div>
            {!reduced && (
              <motion.span
                className="inline-block w-2 h-3.5 mt-2"
                style={{ background: H.turquoise }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </Scene>
  );
}

/* ── mobile-device ───────────────────────────────────────────────── */
export function MobileDeviceScene() {
  const L = useSceneLabels();
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.terracotta}>
      <GirihHalo color={H.saffron} opacity={0.22} />
      <HeritageParticles count={10} />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          {...riseIn(0.1)}
          className="relative w-36 sm:w-40 rounded-[2rem] p-2 shadow-2xl"
          style={{ background: H.ink, height: '290px' }}
        >
          <motion.div
            className="absolute inset-0 rounded-[2rem]"
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: H.ink, padding: 8 }}
          >
            {/* notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full z-20" style={{ background: H.ink }} />
            {/* screen */}
            <div className="w-full h-full rounded-[1.6rem] overflow-hidden relative" style={{ background: H.ivory }}>
              {/* app header */}
              <motion.div {...riseIn(0.5)} className="h-12 flex items-end px-3 pb-1.5" style={{ background: H.turquoise }}>
                <span className="text-[9px] font-bold text-white tracking-wide">PakSoft App</span>
              </motion.div>
              {/* notification slides in */}
              <motion.div
                initial={{ y: -36, opacity: 0 }}
                animate={{ y: 4, opacity: 1 }}
                transition={{ delay: 2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-12 left-2 right-2 rounded-lg px-2 py-1.5 shadow-md z-10 flex items-center gap-1.5"
                style={{ background: H.white }}
              >
                <span className="w-4 h-4 rounded-md flex items-center justify-center text-[7px] text-white" style={{ background: H.saffron }}>✓</span>
                <span className="text-[7px] font-medium" style={{ color: H.ink }}>{L('orderConfirmed', 'Order confirmed!')}</span>
              </motion.div>
              {/* cards build up */}
              <div className="p-2.5 space-y-2">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    {...riseIn(0.8 + i * 0.25)}
                    className="rounded-lg p-2 flex gap-2 items-center"
                    style={{ background: H.white, border: `1px solid ${H.sand}` }}
                  >
                    <div className="w-7 h-7 rounded-md shrink-0" style={{ background: [H.turquoiseLight, H.sand, '#f9ece5'][i] }} />
                    <div className="flex-1 space-y-1">
                      <div className="h-1.5 rounded-full" style={{ background: H.sand, width: '80%' }} />
                      <div className="h-1.5 rounded-full" style={{ background: H.sand, width: '55%' }} />
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* tab bar */}
              <motion.div {...riseIn(1.6)} className="absolute bottom-0 inset-x-0 h-9 flex items-center justify-around px-3" style={{ background: H.white, borderTop: `1px solid ${H.sand}` }}>
                {[H.turquoise, '#c9c2b4', '#c9c2b4', '#c9c2b4'].map((c, i) => (
                  <motion.span
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ background: c }}
                    animate={i === 0 && !reduced ? { scale: [1, 1.3, 1] } : undefined}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Scene>
  );
}

/* ── layers-stack (isometric architecture) ───────────────────────── */
const LAYER_DEFS = [
  { key: 'uiLayer', fallback: 'UI / Presentation', color: H.turquoise },
  { key: 'logicLayer', fallback: 'Business Logic', color: H.lapis },
  { key: 'apiLayer', fallback: 'API Layer', color: H.terracotta },
  { key: 'dbLayer', fallback: 'Database', color: H.saffron },
];

export function LayersStackScene() {
  const L = useSceneLabels();
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.lapis}>
      <GirihHalo color={H.turquoise} opacity={0.18} />
      <HeritageParticles count={10} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: 240, height: 260 }}>
          {LAYER_DEFS.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2"
              style={{ top: i * 58, x: '-50%' }}
            >
              <motion.div
                className="relative w-52 h-16"
                animate={reduced ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
              >
                {/* isometric slab (decorative) */}
                <div
                  className="absolute inset-0 shadow-xl"
                  aria-hidden="true"
                  style={{
                    background: `linear-gradient(135deg, ${layer.color}, ${layer.color}dd)`,
                    transform: 'rotateX(55deg) rotateZ(-42deg)',
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                />
                {/* label floats flat above the slab so it never clips */}
                <span
                  className="absolute inset-0 flex items-center justify-center text-[11px] font-bold tracking-wide px-2 py-0.5"
                  style={{ color: layer.color === '#e8a33d' ? '#5c3a05' : '#ffffff', textShadow: '0 1px 6px rgba(0,0,0,0.35)' }}
                >
                  {L(layer.key, layer.fallback)}
                </span>
              </motion.div>
              {/* data pulse between layers */}
              {i < LAYER_DEFS.length - 1 && !reduced && (
                <motion.div
                  className="absolute left-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ background: H.saffron, top: 38 }}
                  animate={{ y: [0, 22], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 1.6 + i * 0.4 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Scene>
  );
}

/* ── puzzle-pieces (girih star assembling) ───────────────────────── */
export function PuzzlePiecesScene() {
  const reduced = useReducedMotion();
  const colors = [H.turquoise, H.lapis, H.terracotta, H.saffron, H.turquoiseDeep, H.lapisDeep, H.saffron, H.turquoise];
  return (
    <Scene glow={H.saffron}>
      <GirihHalo color={H.terracotta} opacity={0.2} />
      <HeritageParticles count={10} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* 8 wedges fly in to assemble an 8-point star */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a1 = (Math.PI / 4) * i - Math.PI / 2;
          const a2 = (Math.PI / 4) * (i + 1) - Math.PI / 2;
          const mid = (a1 + a2) / 2;
          const r = 72;
          const inner = 38;
          const p = [
            `${120 + inner * Math.cos(a1)},${120 + inner * Math.sin(a1)}`,
            `${120 + r * Math.cos(mid)},${120 + r * Math.sin(mid)}`,
            `${120 + inner * Math.cos(a2)},${120 + inner * Math.sin(a2)}`,
            `${120 + 14 * Math.cos(mid)},${120 + 14 * Math.sin(mid)}`,
          ].join(' ');
          return (
            <motion.polygon
              key={i}
              points={p}
              fill={colors[i]}
              stroke={H.ivory}
              strokeWidth="2"
              initial={{ opacity: 0, x: Math.cos(mid) * 90, y: Math.sin(mid) * 90, scale: 0.4 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}
        {/* centre seal */}
        <motion.polygon
          points={starPoints(120, 120, 16, 9)}
          fill={H.ivory}
          stroke={H.saffron}
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0, rotate: 90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          style={{ transformOrigin: '120px 120px' }}
          transition={{ delay: 1.9, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        />
        {/* completion ring pulse */}
        {!reduced && (
          <motion.circle
            cx="120" cy="120" r="80"
            fill="none" stroke={H.saffron} strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.9, 1.15, 1.25] }}
            style={{ transformOrigin: '120px 120px' }}
            transition={{ delay: 2.4, duration: 2.4, repeat: Infinity, repeatDelay: 1.2 }}
          />
        )}
      </svg>
    </Scene>
  );
}

/* ── server-stack ────────────────────────────────────────────────── */
export function ServerStackScene() {
  const L = useSceneLabels();
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.lapis}>
      <GirihHalo color={H.turquoise} opacity={0.18} />
      <HeritageParticles count={8} />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          {...riseIn(0.1)}
          className="w-48 space-y-2.5"
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              {...riseIn(0.3 + i * 0.25)}
              className="rounded-lg px-3 py-2.5 flex items-center gap-2 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${H.lapis}, ${H.lapisDeep})`, border: '1px solid rgba(232,163,61,0.3)' }}
            >
              {/* LEDs */}
              <div className="flex flex-col gap-1">
                {[0, 1].map(j => (
                  <motion.span
                    key={j}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: j === 0 ? H.turquoise : H.saffron }}
                    animate={reduced ? undefined : { opacity: [1, 0.2, 1] }}
                    transition={{ duration: 0.9 + i * 0.3 + j * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
              {/* slots */}
              <div className="flex-1 space-y-1">
                <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }} />
                <div className="h-1.5 rounded-full w-3/4" style={{ background: 'rgba(255,255,255,0.12)' }} />
              </div>
              {/* activity bar */}
              <motion.div className="w-8 h-4 rounded-sm overflow-hidden flex items-end gap-px">
                {[0.5, 0.8, 0.35, 0.65].map((hgt, j) => (
                  <motion.span
                    key={j}
                    className="flex-1 rounded-sm"
                    style={{ background: H.turquoise }}
                    animate={reduced ? { height: `${hgt * 100}%` } : { height: [`${hgt * 60}%`, `${hgt * 100}%`, `${hgt * 60}%`] }}
                    transition={{ duration: 1.4 + j * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
          {/* uptime badge */}
          <motion.div {...popIn(1.4)} className="mx-auto w-max px-3 py-1 rounded-full text-[10px] font-bold shadow-md" style={{ background: H.turquoise, color: H.white }}>
            ▲ {L('uptime', '99.99% uptime')}
          </motion.div>
        </motion.div>
      </div>
    </Scene>
  );
}
