// src/components/ClientJourneyRoadmap.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGSAP } from '@/lib/gsap';
import {
  ChatBubbleOvalLeftIcon,
  PencilSquareIcon,
  CodeBracketSquareIcon,
  RocketLaunchIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

// ─── Step visual illustrations ────────────────────────────────────────────────

function DiscoveryVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 select-none">
      {/* Interview / research scene */}
      <div className="relative w-full max-w-[280px]">
        {/* User card top-left */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-start gap-3 mb-4"
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 border border-blue-100 rounded-2xl rounded-tl-none px-4 py-2.5 flex-1"
          >
            <p className="text-xs text-blue-700 font-medium leading-relaxed">
              "We need a platform that handles 10k+ daily orders with real-time tracking."
            </p>
          </motion.div>
        </motion.div>

        {/* Requirements checklist */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
        >
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Project Requirements</p>
          {[
            { label: 'Real-time tracking dashboard', done: true, delay: 0.7 },
            { label: 'Multi-currency checkout', done: true, delay: 0.9 },
            { label: 'API integrations (ERP, WMS)', done: true, delay: 1.1 },
            { label: 'Mobile-first PWA', done: false, delay: 1.3 },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 py-1.5 border-b border-gray-50 last:border-0">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: item.delay, type: 'spring', bounce: 0.5 }}
                className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-gray-900' : 'border border-gray-200'}`}
              >
                {item.done && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: item.delay + 0.1 }}
                className={`text-xs ${item.done ? 'text-gray-700' : 'text-gray-400'}`}
              >
                {item.label}
              </motion.span>
            </div>
          ))}
        </motion.div>

        {/* Timeline estimate */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-3 flex items-center gap-2 text-xs text-gray-400"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Estimated scope: <strong className="text-gray-600">12 weeks</strong></span>
        </motion.div>
      </div>
    </div>
  );
}

function DesignVisual() {
  const frames = [
    { label: 'Home', active: true },
    { label: 'Dashboard', active: false },
    { label: 'Profile', active: false },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 select-none">
      <div className="w-full max-w-[280px]">
        {/* Mockup window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden"
        >
          {/* Toolbar */}
          <div className="bg-gray-50 border-b border-gray-100 px-3 py-2 flex items-center gap-2">
            {['#ef4444', '#f59e0b', '#22c55e'].map((c) => (
              <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
            ))}
            <div className="flex gap-1 ml-2">
              {frames.map((f, i) => (
                <motion.span
                  key={f.label}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`text-[9px] px-2 py-0.5 rounded font-medium ${f.active ? 'bg-white shadow-sm text-gray-700' : 'text-gray-400'}`}
                >
                  {f.label}
                </motion.span>
              ))}
            </div>
          </div>
          {/* Wireframe layout */}
          <div className="p-3 space-y-2">
            {/* Nav bar wireframe */}
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 }} style={{ transformOrigin: 'left' }}
              className="h-6 bg-gray-900 rounded" />
            {/* Hero */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
              className="h-16 bg-gradient-to-r from-blue-50 to-violet-50 rounded flex items-center px-3 gap-2">
              <div className="flex-1 space-y-1">
                <div className="h-2 bg-gray-300 rounded w-3/4" />
                <div className="h-1.5 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="w-12 h-8 bg-blue-200 rounded" />
            </motion.div>
            {/* Cards row */}
            <div className="grid grid-cols-3 gap-1.5">
              {['#dbeafe', '#f3e8ff', '#d1fae5'].map((bg, i) => (
                <motion.div key={bg}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="h-12 rounded"
                  style={{ background: bg }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Color palette + annotation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-3 flex items-center gap-2"
        >
          <div className="flex gap-1">
            {['#111827', '#3b82f6', '#8b5cf6', '#f9fafb', '#f3f4f6'].map((c) => (
              <div key={c} className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ background: c }} />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">Brand palette approved</span>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4, type: 'spring' }}
            className="ml-auto w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function DevelopVisual() {
  const codeLines = [
    { text: "export async function getOrders(userId: string) {", color: '#cdd3de', indent: 0, delay: 0.3 },
    { text: "const orders = await db.order.findMany({", color: '#cdd3de', indent: 16, delay: 0.55 },
    { text: "where: { userId, status: 'active' },", color: '#c3e88d', indent: 32, delay: 0.75 },
    { text: "include: { items: true, tracking: true },", color: '#82aaff', indent: 32, delay: 0.95 },
    { text: "})", color: '#cdd3de', indent: 16, delay: 1.1 },
    { text: "return orders", color: '#c792ea', indent: 16, delay: 1.25 },
    { text: "}", color: '#cdd3de', indent: 0, delay: 1.4 },
  ];
  const tests = [
    { label: 'GET /orders → 200', pass: true, delay: 1.6 },
    { label: 'POST /checkout → 201', pass: true, delay: 1.8 },
    { label: 'Auth token expired → 401', pass: true, delay: 2.0 },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-[290px] space-y-2.5">
        {/* Code editor */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f111a] rounded-xl overflow-hidden"
        >
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#181926] border-b border-white/5">
            {['#ef4444', '#f59e0b', '#22c55e'].map((c) => (
              <span key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
            ))}
            <span className="text-[9px] text-white/30 font-mono ml-2">orders.service.ts</span>
            <span className="ml-auto flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[8px] text-green-400/70 font-mono">TS</span>
            </span>
          </div>
          <div className="p-3 font-mono space-y-0.5">
            {codeLines.map((line, i) => (
              <motion.div key={i} className="flex gap-2 text-[9px] leading-4"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: line.delay, duration: 0.25 }}
              >
                <span className="text-white/15 w-3 text-right flex-shrink-0">{i + 1}</span>
                <span style={{ color: line.color, paddingLeft: line.indent / 4 }}>{line.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Test results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="bg-white border border-gray-200 rounded-xl p-3"
        >
          <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Test Suite</p>
          {tests.map((test) => (
            <motion.div key={test.label}
              initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: test.delay }}
              className="flex items-center gap-2 py-1"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: test.delay + 0.1, type: 'spring' }}
                className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <span className="text-[10px] font-mono text-gray-600">{test.label}</span>
            </motion.div>
          ))}
          <motion.div
            initial={{ width: 0 }} animate={{ width: '100%' }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="h-1 bg-green-500 rounded-full mt-2"
          />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9 }}
            className="text-[9px] text-green-600 font-semibold mt-1">
            3/3 passed · 0 failed
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

function DeployVisual() {
  const stages = [
    { label: 'Build', icon: '⚙', status: 'done', time: '1m 12s' },
    { label: 'Test', icon: '✓', status: 'done', time: '2m 34s' },
    { label: 'Deploy', icon: '⟳', status: 'active', time: '0m 48s…' },
    { label: 'Live', icon: '●', status: 'pending', time: '' },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 select-none">
      <div className="w-full max-w-[280px] space-y-3">
        {/* Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">CI / CD Pipeline</p>
            <span className="text-[9px] text-gray-400 font-mono">main ← feat/v2</span>
          </div>
          <div className="flex items-center">
            {stages.map((s, i) => (
              <div key={s.label} className="flex items-center flex-1">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.25, type: 'spring', bounce: 0.4 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    s.status === 'done' ? 'bg-green-500 border-green-500 text-white' :
                    s.status === 'active' ? 'bg-blue-50 border-blue-500 text-blue-600' :
                    'bg-gray-50 border-gray-200 text-gray-400'
                  }`}>
                    {s.status === 'active' ? (
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}>
                        ⟳
                      </motion.span>
                    ) : s.status === 'done' ? '✓' : s.icon}
                  </div>
                  <span className={`text-[8px] font-medium ${
                    s.status === 'done' ? 'text-green-600' :
                    s.status === 'active' ? 'text-blue-600' : 'text-gray-400'
                  }`}>{s.label}</span>
                  {s.time && <span className="text-[7px] text-gray-400 font-mono">{s.time}</span>}
                </motion.div>
                {i < stages.length - 1 && (
                  <motion.div
                    className="flex-1 h-0.5 mx-1 mb-4"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + i * 0.25, duration: 0.3 }}
                    style={{ transformOrigin: 'left', background: i < 2 ? '#22c55e' : '#e5e7eb' }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Live server status */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-gray-900 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">paksoft.com.tr</span>
            <div className="flex items-center gap-1.5">
              <motion.div className="w-2 h-2 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <span className="text-[10px] text-green-400 font-semibold">Live</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: '99.9%', l: 'Uptime' },
              { v: '142ms', l: 'Latency' },
              { v: '2.1k', l: 'Req/min' },
            ].map((m) => (
              <div key={m.l} className="text-center">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}
                  className="text-sm font-bold text-white">{m.v}</motion.p>
                <p className="text-[8px] text-white/40">{m.l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [38, 52, 45, 68, 72, 61, 85, 78, 92, 88, 96, 100];
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 select-none">
      <div className="w-full max-w-[280px] space-y-3">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Organic Traffic</p>
            <span className="text-[10px] font-bold text-green-600">+164%</span>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-1 h-20">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t"
                style={{ background: i >= 9 ? '#111827' : '#e5e7eb' }}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[8px] text-gray-400">Jan</span>
            <span className="text-[8px] text-gray-400">Dec</span>
          </div>
        </motion.div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Lighthouse', value: '97', suffix: '/100', color: 'text-orange-500' },
            { label: 'Core Web Vitals', value: 'Pass', suffix: '', color: 'text-green-600' },
            { label: 'Bounce Rate', value: '-32', suffix: '%', color: 'text-blue-600' },
            { label: 'Conversion', value: '+4.2', suffix: '%', color: 'text-violet-600' },
          ].map((kpi, i) => (
            <motion.div key={kpi.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1, type: 'spring' }}
              className="bg-white border border-gray-200 rounded-lg p-2.5"
            >
              <p className={`text-base font-bold ${kpi.color}`}>{kpi.value}<span className="text-xs">{kpi.suffix}</span></p>
              <p className="text-[9px] text-gray-400 mt-0.5">{kpi.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupportVisual() {
  const tickets = [
    { id: '#2841', msg: 'Add multi-language support', status: 'done', t: '2h ago' },
    { id: '#2842', msg: 'Performance on mobile Safari', status: 'review', t: '45m ago' },
    { id: '#2843', msg: 'New dashboard widget request', status: 'open', t: 'just now' },
  ];
  const statusColor: Record<string, string> = {
    done: 'bg-green-100 text-green-700',
    review: 'bg-amber-100 text-amber-700',
    open: 'bg-blue-100 text-blue-700',
  };
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 select-none">
      <div className="w-full max-w-[280px] space-y-3">
        {/* Uptime monitor */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900 rounded-xl p-3 flex items-center gap-3"
        >
          <div className="flex gap-0.5 flex-1 items-end h-8">
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.div key={i}
                className="flex-1 rounded-sm bg-green-500"
                initial={{ height: 0 }}
                animate={{ height: `${60 + Math.sin(i) * 30}%` }}
                transition={{ delay: 0.2 + i * 0.03, duration: 0.3 }}
              />
            ))}
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold text-white">99.97%</p>
            <p className="text-[8px] text-white/40">Uptime</p>
          </div>
        </motion.div>

        {/* Support tickets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Support Queue</p>
            <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">3 open</span>
          </div>
          {tickets.map((t, i) => (
            <motion.div key={t.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.2 }}
              className="flex items-start gap-2 px-3 py-2.5 border-b border-gray-50 last:border-0"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[9px] font-mono text-gray-400">{t.id}</span>
                  <span className={`text-[8px] px-1.5 py-px rounded-full font-semibold ${statusColor[t.status]}`}>
                    {t.status}
                  </span>
                </div>
                <p className="text-[10px] text-gray-700 leading-tight truncate">{t.msg}</p>
              </div>
              <span className="text-[8px] text-gray-400 flex-shrink-0 mt-0.5">{t.t}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const STEP_VISUALS = [
  DiscoveryVisual,
  DesignVisual,
  DevelopVisual,
  DeployVisual,
  AnalyticsVisual,
  SupportVisual,
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function ClientJourneyRoadmap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('clientJourney');
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isLoading || prefersReducedMotion) return;
    if (!sectionRef.current || !leftColRef.current || !svgRef.current || !lineRef.current) return;

    initGSAP();

    const setupLine = () => {
      if (!leftColRef.current || !svgRef.current || !lineRef.current) return;
      const colHeight = leftColRef.current.offsetHeight;
      const lineHeight = Math.max(0, colHeight - 80);
      if (lineHeight === 0) return;
      svgRef.current.setAttribute('height', String(lineHeight));
      lineRef.current.setAttribute('y2', String(lineHeight));
    };

    setupLine();

    const totalLength = lineRef.current.getTotalLength();
    if (totalLength === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });

      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      iconRefs.current.forEach((icon) => {
        if (!icon) return;
        gsap.set(icon, { scale: 0, opacity: 0, willChange: 'transform' });
        gsap.to(icon, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: icon,
            start: 'top 75%',
            once: true,
          },
        });
      });
    }, sectionRef);

    const ro = new ResizeObserver(setupLine);
    ro.observe(leftColRef.current!);

    return () => {
      ctx.revert();
      ro.disconnect();
    };
  }, [isLoading, prefersReducedMotion]);

  if (isLoading) {
    return (
      <section className="section bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </section>
    );
  }

  const getSteps = () => {
    try {
      const stepsData = t('steps');
      if (Array.isArray(stepsData)) return stepsData;
      if (stepsData && typeof stepsData === 'object') return Object.values(stepsData);
    } catch {}
    return [
      { title: 'Discovery & Planning', description: 'We analyze your requirements and create a comprehensive project roadmap with clear milestones.', duration: '1-2 weeks' },
      { title: 'Design & Prototyping', description: 'UI/UX design and interactive prototypes to visualize the final product before development.', duration: '2-3 weeks' },
      { title: 'Development & Testing', description: 'Agile development with regular testing and quality assurance throughout the process.', duration: '4-8 weeks' },
      { title: 'Deployment & Launch', description: 'Seamless deployment with comprehensive testing, documentation, and user training.', duration: '1 week' },
      { title: 'Optimization & Analytics', description: 'Performance monitoring, SEO optimization, and analytics setup for continuous improvement.', duration: 'Ongoing' },
      { title: 'Support & Maintenance', description: '24/7 technical support, regular updates, and feature enhancements as your business grows.', duration: 'Ongoing' },
    ];
  };

  const steps = getSteps() as { title: string; description: string; duration: string }[];
  const icons = [
    ChatBubbleOvalLeftIcon,
    PencilSquareIcon,
    CodeBracketSquareIcon,
    RocketLaunchIcon,
    ChartBarSquareIcon,
    Cog6ToothIcon,
  ];

  const ActiveIcon = icons[activeIdx] || ChatBubbleOvalLeftIcon;
  const activeStep = steps[activeIdx];
  const ActiveVisual = STEP_VISUALS[activeIdx] || DiscoveryVisual;

  return (
    <section ref={sectionRef} className="section bg-gray-50 relative overflow-hidden" dir={dir}>
      <div className={`absolute top-20 w-32 h-32 opacity-50 pointer-events-none ${dir === 'rtl' ? 'right-16' : 'left-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-right' : 'crescent-left'} crescent-subtle text-gray-200`} />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-12 lg:mb-20"
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 max-w-7xl mx-auto">

          {/* Left: step list */}
          <div ref={leftColRef} className="lg:col-span-5 xl:col-span-4 flex flex-col gap-2 relative">
            <svg
              ref={svgRef}
              className={`hidden lg:block absolute top-10 z-0 pointer-events-none ${dir === 'rtl' ? 'right-10' : 'left-10'}`}
              width="2" height="0" aria-hidden style={{ overflow: 'visible' }}
            >
              <line ref={lineRef} x1="1" y1="0" x2="1" y2="0" stroke="rgb(229 231 235)" strokeWidth="1" />
            </svg>

            {steps.map((step, idx) => {
              const isActive = activeIdx === idx;
              const StepIcon = icons[idx] || ChatBubbleOvalLeftIcon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative z-10 flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-start w-full group ${
                    isActive
                      ? 'bg-white shadow-sm border border-gray-100'
                      : 'hover:bg-gray-100/50 border border-transparent'
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  <div
                    ref={(el) => { iconRefs.current[idx] = el; }}
                    className={`flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-lg transition-colors duration-500 z-10 ${
                      isActive
                        ? 'bg-gray-900 text-white shadow-md scale-105'
                        : 'bg-gray-50 text-gray-500 border border-gray-100 group-hover:bg-white group-hover:text-gray-900 group-hover:border-gray-200'
                    }`}
                    style={{ willChange: 'transform' }}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm md:text-base font-bold transition-colors duration-300 ${
                      isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'
                    }`}>
                      {step.title}
                    </h4>
                    <span className={`text-xs block mt-0.5 transition-colors duration-300 font-mono tracking-wide uppercase ${
                      isActive ? 'text-gray-500 font-medium' : 'text-gray-400 group-hover:text-gray-500'
                    }`}>
                      {step.duration}
                    </span>
                  </div>
                  {isActive && !prefersReducedMotion && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 rounded-xl ring-2 ring-gray-900/5 pointer-events-none"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: stage display */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="sticky top-24 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden min-h-[440px] lg:min-h-[500px] flex flex-col">

              {/* Top text panel */}
              <div className="p-6 md:p-8 border-b border-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`header-${activeIdx}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                      <ActiveIcon className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        {t('phase') as string} {String(activeIdx + 1).padStart(2, '0')} · {activeStep.duration}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mt-0.5">
                        {activeStep.title}
                      </h3>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`desc-${activeIdx}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    className="text-sm text-gray-500 leading-relaxed mt-3"
                  >
                    {activeStep.description}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Illustrated visual — changes per step */}
              <div className="flex-1 relative bg-gray-50/50 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`visual-${activeIdx}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <ActiveVisual />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dot navigation */}
              <div className="px-6 md:px-8 py-4 border-t border-gray-100 flex items-center gap-2">
                {steps.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    aria-label={`Go to step ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-400 focus:outline-none ${
                      activeIdx === dotIdx ? 'w-8 bg-gray-900' : 'w-2 bg-gray-200 hover:bg-gray-400'
                    }`}
                    onClick={() => setActiveIdx(dotIdx)}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
