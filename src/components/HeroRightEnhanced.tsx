// src/components/HeroRightPerfected.tsx
'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Service = {
  label: string;
  color: string;
  angleDeg: number;
  delay: number; // staggered animation delays
};

// Polar to Cartesian conversion
const polarToXY = (r: number, angleDeg: number) => {
  const a = (angleDeg * Math.PI) / 180;
  return { x: r * Math.cos(a), y: r * Math.sin(a) };
};

export default function HeroRightPerfected() {
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Mouse proximity for micro-interactions
  const [mouse, setMouse] = useState({ mx: 0, my: 0, isHovering: false });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const mx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2)));
    const my = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2)));
    setMouse({ mx, my, isHovering: true });
  }, []);

  const onLeave = useCallback(() => {
    setMouse(prev => ({ ...prev, isHovering: false }));
  }, []);

  // Service chips with better positioning and staggered delays
  const services: Service[] = useMemo(
    () => [
      { label: 'AI Solutions',      color: 'bg-emerald-500', angleDeg: 330, delay: 0 },
      { label: 'Development',       color: 'bg-blue-500',    angleDeg: 45,  delay: 0.1 },
      { label: 'Automation',        color: 'bg-amber-500',   angleDeg: 135, delay: 0.2 },
      { label: 'Infrastructure',    color: 'bg-slate-500',   angleDeg: 225, delay: 0.3 },
      { label: 'Design',            color: 'bg-violet-500',  angleDeg: 270, delay: 0.4 },
    ],
    []
  );

  // Responsive constants
  const HUB = 240;
  const HUB_R = HUB / 2;
  const STAGE = 400;
  const ORBIT_R = HUB_R + 48;
  const CARD_OFFSET = 50;

  // Animation variants for better performance
  const floatVariants = {
    animate: {
      y: [-3, 3, -3],
      transition: {
        duration: prefersReducedMotion ? 0 : 6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.15, 1],
      transition: {
        duration: prefersReducedMotion ? 0 : 2.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-[400px]">
      <div
        ref={stageRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative aspect-square w-full overflow-visible select-none"
        style={{
          '--mx': mouse.mx,
          '--my': mouse.my,
          '--hover-intensity': mouse.isHovering ? 1 : 0,
        } as React.CSSProperties}
      >
        {/* Enhanced Background with Depth */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20"
          initial={{ opacity: 0.06 }}
          animate={{ 
            opacity: mouse.isHovering ? [0.06, 0.09, 0.06] : [0.06, 0.08, 0.06]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(0,0,0,0.04), transparent 65%),
              radial-gradient(circle at 25% 25%, rgba(16,185,129,0.03), transparent 40%),
              radial-gradient(circle at 75% 75%, rgba(59,130,246,0.02), transparent 35%),
              linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: `100% 100%, 200px 200px, 180px 180px, 32px 32px, 32px 32px`,
          }}
        />

        {/* Enhanced Central Platform with Better Depth */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          animate={{
            scale: mouse.isHovering ? 1.02 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div
            className="relative rounded-full bg-transparent"
            style={{
              width: HUB,
              height: HUB,
              border: '0.5px solid #d1d5db',
              boxShadow: `
                inset 0 0 40px rgba(209,213,219,0.35),
                0 0 0 1px rgba(255,255,255,0.5),
                0 8px 32px rgba(0,0,0,0.08)
              `,
              transform: 'translateZ(0)',
            }}
          >
            {/* Enhanced inner glow with subtle animation */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full"
              animate={{
                background: [
                  'radial-gradient(closest-side, rgba(209,213,219,0.18), rgba(209,213,219,0.06) 60%, rgba(209,213,219,0) 75%)',
                  'radial-gradient(closest-side, rgba(209,213,219,0.22), rgba(209,213,219,0.08) 60%, rgba(209,213,219,0) 75%)',
                  'radial-gradient(closest-side, rgba(209,213,219,0.18), rgba(209,213,219,0.06) 60%, rgba(209,213,219,0) 75%)'
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* Improved Crescent Layers */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{ transform: 'translate3d(24px, -24px, 0)' }}
          animate={{
            rotate: [0, 0.5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Primary crescent with enhanced gradient */}
          <div
            className="rounded-full"
            style={{
              width: HUB,
              height: HUB,
              clipPath: 'circle(52% at 74% 26%)',
              background: 'linear-gradient(135deg, rgba(17,24,39,0.15), rgba(55,65,81,0.08), rgba(107,114,128,0.04))',
              filter: 'blur(0.3px)',
            }}
          />
          {/* Secondary crescent */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              clipPath: 'circle(42% at 78% 32%)',
              background: 'linear-gradient(145deg, rgba(17,24,39,0.12), rgba(55,65,81,0.06))',
            }}
          />
          {/* Tertiary subtle layer */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              clipPath: 'circle(35% at 82% 38%)',
              background: 'linear-gradient(155deg, rgba(17,24,39,0.08), rgba(55,65,81,0.04))',
            }}
          />
        </motion.div>

        {/* Enhanced SVG Data Flow Lines */}
        <svg
          className="pointer-events-none absolute inset-0 z-10"
          width="100%"
          height="100%"
          viewBox={`0 0 ${STAGE} ${STAGE}`}
          fill="none"
        >
          <defs>
            <linearGradient id="flow1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(59,130,246,0.4)" />
              <stop offset="50%" stopColor="rgba(16,185,129,0.3)" />
              <stop offset="100%" stopColor="rgba(148,163,184,0.1)" />
            </linearGradient>
            <linearGradient id="flow2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(139,92,246,0.35)" />
              <stop offset="50%" stopColor="rgba(245,158,11,0.25)" />
              <stop offset="100%" stopColor="rgba(148,163,184,0.08)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Enhanced curved paths with better flow */}
          <motion.path
            d="M 200 200 Q 240 170 270 150"
            stroke="url(#flow1)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            filter="url(#glow)"
            animate={{ strokeDashoffset: [-140, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          
          <motion.path
            d="M 200 200 Q 170 240 150 270"
            stroke="url(#flow2)"
            strokeWidth="2"
            strokeDasharray="8 10"
            filter="url(#glow)"
            animate={{ strokeDashoffset: [-160, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />

          <motion.path
            d="M 150 150 Q 190 160 240 155"
            stroke="url(#flow1)"
            strokeWidth="1"
            strokeDasharray="4 8"
            animate={{ strokeDashoffset: [-120, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
        </svg>

        {/* Enhanced Analytics Dashboard */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-20 will-change-transform"
          style={{ transform: `translate(calc(-50% + ${CARD_OFFSET}px), calc(-50% - ${CARD_OFFSET}px))` }}
          variants={floatVariants}
          animate="animate"
        >
          <motion.div
            whileHover={{ 
              scale: 1.05, 
              y: -4,
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
            }}
            className="w-[110px] h-[80px] rounded-lg border border-gray-200/80 bg-white/95 backdrop-blur-sm shadow-[0_8px_25px_rgba(0,0,0,0.15)] cursor-pointer p-2.5 group/card"
            style={{ willChange: 'transform' }}
          >
            {/* Enhanced header */}
            <div className="mb-2 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              </div>
              <motion.div
                className="w-4 h-4 rounded-sm bg-gradient-to-br from-blue-500 to-emerald-500 opacity-60"
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Improved progress bars */}
            <div className="space-y-1.5 mb-2">
              <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                  animate={{ width: ['68%', '75%', '68%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-amber-500 rounded-full"
                  animate={{ width: ['42%', '48%', '42%'] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>

            {/* Enhanced chart */}
            <div className="h-[20px] w-full">
              <svg width="100%" height="100%" viewBox="0 0 100 20">
                <motion.path
                  d="M2,15 Q20,8 35,12 T65,6 T95,10"
                  fill="none"
                  stroke="rgba(59,130,246,0.8)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  animate={{ pathLength: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>
            </div>

            {/* Status indicators */}
            <div className="mt-1.5 flex justify-between items-center">
              <div className="flex gap-1">
                <div className="h-1 w-2 bg-green-400 rounded" />
                <div className="h-1 w-3 bg-blue-400 rounded" />
                <div className="h-1 w-2 bg-amber-400 rounded" />
              </div>
              <motion.div
                className="text-[8px] text-emerald-600 font-mono"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                LIVE
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Status Widget */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-20 will-change-transform"
          style={{ transform: `translate(calc(-50% - ${CARD_OFFSET}px), calc(-50% + ${CARD_OFFSET}px))` }}
          animate={{ y: [3, -3, 3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            className="w-[90px] h-[90px] rounded-xl border border-gray-200/80 bg-gradient-to-br from-slate-50/95 to-slate-100/95 backdrop-blur-sm shadow-[0_8px_20px_rgba(0,0,0,0.12)] cursor-pointer p-3"
          >
            {/* Enhanced avatar section */}
            <div className="mb-2.5 flex items-center gap-2">
              <div className="relative h-7 w-7">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
                <motion.span 
                  className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
                  variants={pulseVariants}
                  animate="animate"
                />
              </div>
              {/* Enhanced status dots */}
              <div className="flex flex-col gap-1">
                <motion.span className="h-1 w-1 rounded-full bg-emerald-500" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.span className="h-1 w-1 rounded-full bg-amber-500"   animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
                <motion.span className="h-1 w-1 rounded-full bg-blue-500"    animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.2, repeat: Infinity, delay: 1 }} />
              </div>
            </div>

            {/* Activity timeline with animation */}
            <div className="space-y-1.5 mb-2">
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-emerald-400 to-transparent rounded w-10/12"
                animate={{ width: ['10/12', '8/12', '10/12'] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded w-7/12"
                animate={{ width: ['7/12', '9/12', '7/12'] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              />
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-violet-400 to-transparent rounded w-5/12"
                animate={{ width: ['5/12', '6/12', '5/12'] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>

            {/* Enhanced connection strength */}
            <div className="flex items-end gap-1 justify-center">
              {[4, 6, 8, 10].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 rounded-sm bg-gradient-to-t from-gray-400 to-gray-300"
                  style={{ height: `${h}px` }}
                  animate={{ 
                    height: [`${h-1}px`, `${h+1}px`, `${h}px`],
                    background: [
                      'linear-gradient(to top, rgb(156,163,175), rgb(209,213,219))',
                      `linear-gradient(to top, ${i < 2 ? 'rgb(34,197,94)' : i < 3 ? 'rgb(59,130,246)' : 'rgb(139,92,246)'}, rgb(209,213,219))`,
                      'linear-gradient(to top, rgb(156,163,175), rgb(209,213,219))'
                    ]
                  }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Notification Panel */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-20 will-change-transform"
          style={{ transform: 'translate(calc(-50% - 56px), calc(-50% - 56px))' }}
          animate={{ 
            rotate: [0, 0, 0, 1.5, 0, -1.5, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            rotate: { duration: 1, repeat: Infinity, repeatDelay: 8, ease: 'easeInOut' },
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <motion.div
            whileHover={{ scale: 1.06, y: -2 }}
            className="w-[65px] h-[50px] rounded-lg border border-gray-200/80 bg-white/98 backdrop-blur-sm shadow-[0_6px_18px_rgba(0,0,0,0.12)] cursor-pointer p-2.5 relative"
          >
            {/* Enhanced bell icon */}
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-600">
              <motion.path 
                d="M12 3a5 5 0 00-5 5v2.5c0 .6-.24 1.17-.66 1.59L5 13h14l-1.34-1.91c-.42-.42-.66-.99-.66-1.59V8a5 5 0 00-5-5z" 
                fill="currentColor" 
                opacity="0.75"
                animate={{ opacity: [0.75, 0.9, 0.75] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <path d="M9 18a3 3 0 006 0H9z" fill="currentColor" opacity="0.5"/>
            </svg>
            
            {/* Enhanced badge with pulse */}
            <motion.div 
              className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-[10px] leading-4 text-white text-center shadow-[0_2px_6px_rgba(16,185,129,0.5)]"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              3
            </motion.div>
            
            {/* Enhanced notification lines */}
            <div className="absolute left-2.5 right-2.5 bottom-2 space-y-1">
              <motion.div 
                className="h-1 bg-gradient-to-r from-gray-300 to-transparent rounded w-9/12"
                animate={{ width: ['9/12', '11/12', '9/12'] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="h-1 bg-gradient-to-r from-gray-200 to-transparent rounded w-6/12"
                animate={{ width: ['6/12', '8/12', '6/12'] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Service Chips */}
        {services.map((s, i) => {
          const { x, y } = polarToXY(ORBIT_R, s.angleDeg);
          return (
            <motion.div
              key={s.label}
              className="absolute z-30"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, i % 2 ? -3 : 3, 0] 
              }}
              transition={{ 
                opacity: { delay: s.delay, duration: 0.5 },
                scale: { delay: s.delay, duration: 0.5 },
                y: { duration: 6 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <motion.div
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/95 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.1)] px-3 py-1.5 cursor-default group"
              >
                <motion.span 
                  className={`h-2 w-2 rounded-full ${s.color}`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="text-[10px] font-medium text-gray-700 whitespace-nowrap">{s.label}</span>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Enhanced Status Indicators */}
        <motion.div
          className="absolute z-40"
          style={{ left: '76%', top: '22%' }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative">
            <div className="h-4 w-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 ring-2 ring-white shadow-lg" />
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-emerald-400"
              animate={{ opacity: [0.6, 0], scale: [1, 2.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute z-40"
          style={{ left: '25%', top: '78%' }}
          animate={{ scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 ring-2 ring-white shadow-md" />
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1/2 z-40"
          style={{ transform: 'translate(calc(-50% + 75px), -50%)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <div className="relative h-0 w-0">
            <div className="absolute -right-4 top-0 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-sm" />
          </div>
        </motion.div>

        {/* Enhanced Micro-interactions */}
        <motion.div
          aria-hidden
          className="absolute left-2 top-2 h-0 w-0 opacity-60"
          style={{
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: '7px solid rgb(229,231,235)',
            transform: 'translate3d(calc(var(--mx) * 3px), calc(var(--my) * 3px), 0)',
          }}
          animate={{ 
            y: [-1, 1, -1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <motion.div
          aria-hidden
          className="absolute right-3 bottom-3 h-2.5 w-2.5 rotate-45 bg-gradient-to-br from-gray-200 to-gray-300 opacity-50"
          style={{ 
            transform: 'translate3d(calc(var(--mx) * -2px), calc(var(--my) * -2px), 0) rotate(45deg)' 
          }}
          animate={{ 
            x: [-1, 1, -1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}