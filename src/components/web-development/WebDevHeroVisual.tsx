'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';

/* ─── Typing animation hook ──────────────────────────────────────────────── */
function useTypingAnimation(lines: string[], speed = 35) {
  const [displayed, setDisplayed] = React.useState<string[]>(['']);
  const [lineIdx, setLineIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    const current = lines[lineIdx];
    if (charIdx < current.length) {
      const t = setTimeout(() => {
        setDisplayed(d => {
          const next = [...d];
          next[lineIdx] = current.slice(0, charIdx + 1);
          return next;
        });
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed(d => [...d, '']);
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }, 280);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, lines, speed]);

  return displayed;
}

/* ─── Token colorizer ────────────────────────────────────────────────────── */
const TOKEN_COLORS: [RegExp, string][] = [
  [/^(export|import|const|from|return|async|await|function|default)$/, '#c792ea'],
  [/^(interface|type|extends)$/, '#c792ea'],
  [/^(true|false|null|undefined)$/, '#ff9d00'],
  [/^[A-Z][A-Za-z]+$/, '#82aaff'],
  [/^['"`].*['"`]$/, '#c3e88d'],
  [/^(\/\/.*)$/, '#546e7a'],
  [/^[{}<>[\]()=;,.]$/, '#89ddff'],
  [/^\d+$/, '#f78c6c'],
];

function colorizeToken(token: string): string {
  for (const [re, color] of TOKEN_COLORS) {
    if (re.test(token)) return color;
  }
  return '#cdd3de';
}

function CodeLine({ line }: { line: string }) {
  if (!line) return <span>&nbsp;</span>;
  const indent = line.match(/^(\s*)/)?.[1] ?? '';
  const rest = line.trimStart();
  // split by spaces and punctuation
  const parts = rest.split(/(\s+|(?=[{}<>[\]()=;,.])|(?<=[{}<>[\]()=;,.]))/);
  return (
    <span>
      <span style={{ opacity: 0 }}>{indent}</span>
      {indent}
      {parts.map((p, i) => (
        <span key={i} style={{ color: p.trim() ? colorizeToken(p.trim()) : undefined }}>
          {p}
        </span>
      ))}
    </span>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const CODE_LINES = [
  "import { NextResponse } from 'next/server'",
  "import { db } from '@/lib/database'",
  "",
  "export async function GET(req: Request) {",
  "  const products = await db.product.findMany({",
  "    where: { published: true },",
  "    orderBy: { createdAt: 'desc' },",
  "    take: 12,",
  "  })",
  "  return NextResponse.json({ products })",
  "}",
];

const METRICS = [
  { label: 'Performance', score: 98, color: '#4ade80' },
  { label: 'Accessibility', score: 95, color: '#60a5fa' },
  { label: 'Best Practices', score: 100, color: '#a78bfa' },
  { label: 'SEO', score: 97, color: '#fb923c' },
];

const PIPELINE = [
  { label: 'Build', icon: '⚙', done: true },
  { label: 'Test', icon: '✓', done: true },
  { label: 'Deploy', icon: '🚀', done: false, active: true },
  { label: 'Live', icon: '●', done: false },
];

/* ─── Sub-panels ─────────────────────────────────────────────────────────── */
function CodePanel({ lines }: { lines: string[] }) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [lines.length]);

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-[#0f111a] select-none">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#181926] border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 text-[10px] font-mono text-white/30">route.ts</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[9px] text-green-400/70 font-mono">compiling</span>
        </span>
      </div>
      {/* Code */}
      <div className="p-3 font-mono text-[10px] leading-[1.65] overflow-hidden" style={{ maxHeight: 148 }}>
        {lines.map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-white/15 w-4 text-right flex-shrink-0 select-none">{i + 1}</span>
            <CodeLine line={line} />
            {i === lines.length - 1 && (
              <motion.span
                className="inline-block w-[1px] h-[10px] bg-white/60 ml-0.5"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}

function LighthousePanel() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-3.5 select-none">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-3.5 h-3.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM6.343 5.657a1 1 0 00-1.414-1.414l-.707.707A1 1 0 005.636 6.364l.707-.707zM4 11a1 1 0 100-2H3a1 1 0 000 2h1zm2.343 5.657l-.707.707a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414zM10 16a1 1 0 10-2 0v1a1 1 0 102 0v-1zm5.657-2.343a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-3.343-6.657l.707-.707a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414z"/>
        </svg>
        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Lighthouse</span>
        <span className="ml-auto text-[9px] text-gray-400 font-mono">paksofts.com</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.8 + i * 0.12, type: 'spring', bounce: 0.4 }}
            className="flex flex-col items-center gap-1"
          >
            <svg viewBox="0 0 36 36" className="w-9 h-9">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#f3f4f6" strokeWidth="3" />
              <motion.circle
                cx="18" cy="18" r="14"
                fill="none" stroke={m.color} strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 14}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 14 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 14 * (1 - m.score / 100) }}
                transition={{ duration: 1.2, delay: 2 + i * 0.15, ease: 'easeOut' }}
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
              />
              <text x="18" y="18" textAnchor="middle" dominantBaseline="middle"
                style={{ fontSize: '8px', fontWeight: 700, fill: '#111827', fontFamily: 'monospace' }}>
                {m.score}
              </text>
            </svg>
            <span className="text-[8px] text-gray-400 text-center leading-tight">{m.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DeployPanel() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-3 select-none">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">CI / CD Pipeline</span>
        <span className="text-[9px] text-gray-400 font-mono">main ← feat/checkout</span>
      </div>
      <div className="flex items-center gap-0">
        {PIPELINE.map((step, i) => (
          <React.Fragment key={step.label}>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5 + i * 0.18, type: 'spring' }}
              className={`flex flex-col items-center gap-1 ${step.active ? 'flex-1' : 'flex-1'}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                step.done
                  ? 'bg-green-500 border-green-500 text-white'
                  : step.active
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}>
                {step.active ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    className="block"
                  >
                    ⟳
                  </motion.span>
                ) : step.done ? '✓' : step.icon}
              </div>
              <span className={`text-[9px] font-medium ${step.done ? 'text-green-600' : step.active ? 'text-blue-600' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </motion.div>
            {i < PIPELINE.length - 1 && (
              <div className={`h-0.5 flex-1 mx-0.5 mb-3.5 ${step.done ? 'bg-green-300' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ─── Main visual ────────────────────────────────────────────────────────── */
export default function WebDevHeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const typedLines = useTypingAnimation(CODE_LINES, prefersReducedMotion ? 0 : 32);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set(((e.clientX - cx) / rect.width) * 12);
    mouseY.set(((e.clientY - cy) / rect.height) * -8);
  }

  return (
    <div
      className="relative w-full max-w-[440px] mx-auto select-none"
      aria-hidden
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-blue-400/10 blur-3xl"
          animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-violet-400/10 blur-3xl"
          animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Main card stack with parallax tilt */}
      <motion.div
        style={prefersReducedMotion ? {} : { rotateX: springY, rotateY: springX, transformPerspective: 900 }}
        className="relative flex flex-col gap-3"
      >
        {/* 1. Code Editor */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <CodePanel lines={typedLines} />
        </motion.div>

        {/* 2. Bottom row: Lighthouse + Deploy */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-5 gap-3"
        >
          <div className="col-span-3">
            <LighthousePanel />
          </div>
          <div className="col-span-2">
            <DeployPanel />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating tech badge — top-left */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.7, x: -8 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-3 -left-4 z-20 bg-white border border-gray-200 rounded-full shadow-md px-2.5 py-1 flex items-center gap-1.5"
      >
        <span className="w-2 h-2 rounded-full bg-black" />
        <span className="text-[10px] font-bold text-gray-900 tracking-tight">Next.js 15</span>
      </motion.div>

      {/* Floating tech badge — right */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.7, x: 8 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.75, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-12 -right-5 z-20 bg-[#0d1117] border border-[#30363d] rounded-full shadow-md px-2.5 py-1 flex items-center gap-1.5"
      >
        <span className="w-2 h-2 rounded-full bg-[#61DAFB]" />
        <span className="text-[10px] font-bold text-[#61DAFB]">React 19</span>
      </motion.div>

      {/* Floating tech badge — bottom-left */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.7, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-3 left-4 z-20 bg-[#f0f4ff] border border-[#bfcfe8] rounded-full shadow-md px-2.5 py-1 flex items-center gap-1.5"
      >
        <span className="w-2 h-2 rounded-full bg-[#3178C6]" />
        <span className="text-[10px] font-bold text-[#3178C6]">TypeScript</span>
      </motion.div>

      {/* Floating commit notification */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, x: 16, y: -4 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 3.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-6 bottom-16 z-20 bg-white border border-gray-200 rounded-xl shadow-lg px-3 py-2 w-44"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-[10px] font-semibold text-gray-900">Deployed to prod</span>
        </div>
        <p className="text-[9px] text-gray-400 font-mono">paksofts.com · just now</p>
      </motion.div>
    </div>
  );
}
