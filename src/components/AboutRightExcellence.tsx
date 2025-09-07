// src/components/AboutRightExcellence.tsx
'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

/**
 * About Us – "Building Digital Excellence" (Right Column Visual)
 * --------------------------------------------------------------
 * - 400×400 Swiss-style canvas with premium, enterprise-grade aesthetic
 * - Central "Excellence Hub", QA indicators, collaboration cards, live dashboard
 * - SVG precision graphics + Framer Motion animations
 * - Color palette: navy/blues, professional grays, gold accents (amber)
 */

export default function AboutRightExcellence() {
  const prefersReduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ mx: 0, my: 0 });
  
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('components.aboutRightExcellence');
  const rolesT = useSectionTranslations('components.heroRightEnhanced.roles');
  const statusT = useSectionTranslations('components.heroRightEnhanced.statusIndicators');
  const notificationT = useSectionTranslations('components.heroRightEnhanced.notifications');

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const mx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2)));
    const my = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2)));
    setMouse({ mx, my });
  }, []);

  // Small helpers for reduced motion
  const floatA = prefersReduced ? {} : { y: [-3, 3, -3] };
  const floatB = prefersReduced ? {} : { y: [3, -3, 3] };
  const breathe = prefersReduced ? {} : { scale: [1, 1.08, 1] };

  // Show loading state if translations are not ready
  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-[400px]">
        <div className="relative aspect-square w-full select-none bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[400px]">
      <div
        ref={stageRef}
        onMouseMove={onMove}
        aria-label={t('ariaLabel')}
        className="relative aspect-square w-full select-none"
        style={
          {
            '--mx': mouse.mx,
            '--my': mouse.my,
          } as React.CSSProperties
        }
      >
        {/* =========================================================
            BACKGROUND: Premium gradient + Swiss grid (subtle)
           ========================================================= */}
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-20 rounded-xl"
          initial={{ opacity: 1 }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: [1, 0.98, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            backgroundImage: `
              radial-gradient(120% 90% at 80% 10%, rgba(15,23,42,0.08), transparent 60%),
              linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 32px 32px, 32px 32px',
          }}
        />

        {/* =========================================================
            CENTRAL EXCELLENCE HUB (200px) + inner glow + badge
           ========================================================= */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform">
          <div
            className="relative rounded-full bg-white/70 backdrop-blur-[1px]"
            style={{
              width: 200,
              height: 200,
              border: '0.5px solid #CBD5E1', // slate-300
              boxShadow:
                'inset 0 0 36px rgba(203,213,225,0.4), 0 10px 28px rgba(2,6,23,0.08)',
            }}
          >
            {/* Soft inner radial */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(30,58,138,0.12), rgba(203,213,225,0.08) 60%, rgba(203,213,225,0) 75%)',
              }}
            />

            {/* Quality badge (gold check in shield) */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={breathe}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_18px_rgba(0,0,0,0.12)] ring-2 ring-amber-400/80">
                {/* Shield */}
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-slate-700">
                  <path
                    d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"
                    fill="currentColor"
                    opacity="0.15"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="#f59e0b" /* amber-500 */
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                {/* Gold glow */}
                {!prefersReduced && (
                  <motion.span
                    className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-amber-300/50"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: [0.5, 0], scale: [1, 1.8] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* =========================================================
            EXCELLENCE WORKFLOW LINES (SVG curves + particles)
           ========================================================= */}
        <svg className="absolute inset-0 z-10" width="100%" height="100%" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="lineA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(51,65,85,0.5)" />
              <stop offset="100%" stopColor="rgba(148,163,184,0.1)" />
            </linearGradient>
            <linearGradient id="lineB" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(51,65,85,0.4)" />
              <stop offset="100%" stopColor="rgba(148,163,184,0.08)" />
            </linearGradient>
          </defs>

          {/* Curved connections from team cards (approx positions) */}
          <motion.path
            id="flow-dev"
            d="M 140 120 C 160 160, 170 180, 200 200"
            stroke="url(#lineA)"
            strokeWidth="1.5"
            strokeDasharray="5 7"
            fill="none"
            animate={prefersReduced ? {} : { pathLength: [0.95, 1, 0.95] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            id="flow-design"
            d="M 280 120 C 250 160, 230 180, 200 200"
            stroke="url(#lineB)"
            strokeWidth="2"
            strokeDasharray="6 9"
            fill="none"
            animate={prefersReduced ? {} : { pathLength: [0.95, 1, 0.95] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            id="flow-qa"
            d="M 120 260 C 160 240, 180 220, 200 200"
            stroke="url(#lineA)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            fill="none"
            animate={prefersReduced ? {} : { pathLength: [0.95, 1, 0.95] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            id="flow-strategy"
            d="M 300 260 C 260 240, 230 220, 200 200"
            stroke="url(#lineB)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            fill="none"
            animate={prefersReduced ? {} : { pathLength: [0.95, 1, 0.95] }}
            transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Animated particles along paths (SMIL animateMotion for precision) */}
          <g>
            <circle r="2" fill="#60a5fa"> {/* blue-400 */}
              <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                <mpath xlinkHref="#flow-dev" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#f59e0b">
              <animateMotion dur="7s" begin="1s" repeatCount="indefinite" rotate="auto">
                <mpath xlinkHref="#flow-design" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#10b981">
              <animateMotion dur="6.5s" begin="0.7s" repeatCount="indefinite" rotate="auto">
                <mpath xlinkHref="#flow-qa" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#94a3b8">
              <animateMotion dur="6.8s" begin="0.3s" repeatCount="indefinite" rotate="auto">
                <mpath xlinkHref="#flow-strategy" />
              </animateMotion>
            </circle>
          </g>
        </svg>

        {/* =========================================================
            PROJECT STATUS DASHBOARD (top-right)
           ========================================================= */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-20"
          style={{ transform: 'translate(calc(-50% + 52px), calc(-50% - 80px))' }}
          animate={floatA}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            className="w-[95px] h-[70px] rounded-md border border-slate-200 bg-white/95 shadow-[0_10px_24px_rgba(2,6,23,0.15)] backdrop-blur-[2px] p-2"
          >
            {/* Header: timeline dots */}
            <div className="mb-1 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            </div>

            {/* Phase bars */}
            <div className="space-y-1">
              <div className="h-1 w-full rounded bg-slate-200 overflow-hidden">
                <motion.div
                  className="h-full bg-sky-500"
                  initial={{ width: '78%' }}
                  animate={prefersReduced ? { width: '78%' } : { width: ['72%','78%','75%','78%'] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <div className="h-1 w-full rounded bg-slate-200 overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500"
                  initial={{ width: '64%' }}
                  animate={prefersReduced ? { width: '64%' } : { width: ['60%','64%','62%','64%'] }}
                  transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>

            {/* Excellence score meter (small ring) */}
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[10px] font-medium text-slate-600">{notificationT('excellence')}</span>
              <svg viewBox="0 0 36 36" className="h-5 w-5">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <motion.circle
                  cx="18" cy="18" r="15.5" fill="none"
                  stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"
                  pathLength={100}
                  initial={{ pathLength: 0.95, pathOffset: 0 }}
                  animate={prefersReduced ? { pathLength: 0.95 } : { pathOffset: [0.05, 0, 0.05] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* =========================================================
            TEAM COLLABORATION CARDS (Dev, Design, Strategy, QA)
           ========================================================= */}
        {[
          { label: 'Dev',      x: -90, y: -80, dot: 'bg-sky-500',    role: rolesT('developer') },
          { label: 'Design',   x:  90, y: -80, dot: 'bg-fuchsia-500',role: rolesT('designer') },
          { label: 'Strategy', x: 110, y:  70, dot: 'bg-amber-500',  role: rolesT('strategist') },
          { label: 'QA',       x: -110,y:  70, dot: 'bg-emerald-500',role: rolesT('qaEngineer') },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            className="absolute left-1/2 top-1/2 z-20"
            style={{ transform: `translate(calc(-50% + ${m.x}px), calc(-50% + ${m.y}px))` }}
            animate={i % 2 ? floatA : floatB}
            transition={{ duration: 6 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              whileHover={{ scale: 1.04, y: -1 }}
              className="group w-[70px] h-[50px] rounded-md border border-slate-200 bg-white/90 shadow-[0_8px_20px_rgba(2,6,23,0.12)] backdrop-blur-[2px] p-1.5 cursor-default"
            >
              <div className="flex items-center gap-1.5">
                <div className="relative h-6 w-6 rounded-full bg-slate-300">
                  <span className={`absolute -right-0 -bottom-0 h-1.5 w-1.5 rounded-full ring-2 ring-white ${m.dot}`} />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[10px] font-semibold text-slate-700">{m.label}</div>
                  <div className="truncate text-[9px] text-slate-500">{m.role}</div>
                </div>
              </div>
              {/* Hover expertise tooltip */}
              <div className="pointer-events-none absolute left-1/2 top-full hidden -translate-x-1/2 translate-y-1 group-hover:block">
                <div className="mt-1 rounded bg-slate-900/90 px-2 py-0.5 text-[10px] text-white shadow">
                  {notificationT('activeCollaboration')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* =========================================================
            QUALITY ASSURANCE INDICATORS
           ========================================================= */}
        {/* Code Quality Ring 95% */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-30"
          style={{ transform: 'translate(calc(-50% - 110px), calc(-50% - 6px))' }}
          animate={breathe}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 48 48" className="h-12 w-12">
            <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="4" fill="none" />
            <motion.circle
              cx="24" cy="24" r="20"
              stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round"
              pathLength={100}
              initial={{ pathLength: 95, pathOffset: 0.05 }}
              animate={prefersReduced ? { pathOffset: 0.05 } : { pathOffset: [0.08, 0.05, 0.08] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
          <div className="mt-0.5 text-center text-[9px] font-medium text-slate-600">{statusT('codeQuality')} 95%</div>
        </motion.div>

        {/* Security Badge */}
        <div
          className="absolute left-1/2 top-1/2 z-30"
          style={{ transform: 'translate(calc(-50% + 116px), calc(-50% - 20px))' }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-[0_8px_18px_rgba(2,6,23,0.12)] ring-1 ring-slate-200">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-700">
              <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" fill="currentColor" opacity="0.12"/>
              <path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="mt-0.5 text-center text-[9px] text-slate-600">{statusT('security')}</div>
        </div>

        {/* Performance Speedometer */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-30"
          style={{ transform: 'translate(calc(-50% - 4px), calc(-50% + 112px))' }}
        >
          <svg viewBox="0 0 64 36" className="h-10 w-16">
            <path d="M4 32a28 28 0 0156 0" fill="none" stroke="#e2e8f0" strokeWidth="4" />
            <motion.path
              d="M4 32a28 28 0 0156 0"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeDasharray="140"
              initial={{ strokeDashoffset: 50 }}
              animate={prefersReduced ? { strokeDashoffset: 50 } : { strokeDashoffset: [70, 50, 70] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* needle */}
            <motion.line
              x1="32" y1="32" x2="50" y2="18"
              stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round"
              animate={prefersReduced ? { rotate: 0 } : { rotate: [-8, 0, -8] }}
              style={{ transformOrigin: '32px 32px' }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
          <div className="mt-0.5 text-center text-[9px] text-slate-600">{statusT('performance')}</div>
        </motion.div>

        {/* Client Satisfaction (5 stars) */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-30"
          style={{ transform: 'translate(calc(-50% + 2px), calc(-50% - 122px))' }}
          animate={prefersReduced ? {} : { opacity: [0.95, 1, 0.95] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center gap-0.5">
            {[0,1,2,3,4].map((i) => (
              <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5 text-amber-400 drop-shadow">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor" />
              </svg>
            ))}
          </div>
          <div className="mt-0.5 text-center text-[9px] text-slate-600">5.0 {statusT('satisfaction')}</div>
        </motion.div>

        {/* =========================================================
            MICRO-ACCENTS reacting to mouse proximity (very subtle)
           ========================================================= */}
        <motion.div
          aria-hidden
          className="absolute right-3 bottom-3 h-2 w-2 rotate-45 bg-slate-200"
          style={{
            transform:
              'translate3d(calc(var(--mx) * -1.5px), calc(var(--my) * -1.5px), 0) rotate(45deg)',
          }}
          animate={prefersReduced ? {} : { x: [-1, 1, -1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}