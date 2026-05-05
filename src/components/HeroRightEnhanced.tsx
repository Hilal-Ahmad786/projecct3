'use client'

import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import {
  motion, useReducedMotion, useInView,
  useMotionValue, useSpring, useTransform,
} from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'

// ─── Scene constants ──────────────────────────────────────────────────────────
const STAGE_W       = 480
const STAGE_H       = 480
const ORBIT_R1      = 145   // inner ring  — service chips
const ORBIT_R2      = 215   // outer ring  — floating cards
const TILT_DEG      = 62
const TILT_RAD      = (TILT_DEG * Math.PI) / 180
// CSS rotateX that matches the projection formula: cos(θ) = sin(TILT_DEG) → θ = 28°
const RING_CSS_TILT = 90 - TILT_DEG   // 28° — visual ring aligns with computed paths
const SPEED         = 0.004            // chip angular speed (rad / rAF frame)
const CARD_SPEED    = 0.65             // card speed multiplier; negative t reverses direction
const SPHERE_R      = 58              // sphere radius px (div is 116×116)

// Three cards evenly spaced at 120° = 2π/3 intervals
const CARD_OFFSETS = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3] as const

// Half-dimensions used to center each card at its orbit position (left = x - w/2)
const CARD_DEFS = [
  { w: 110, h: 80 },  // analytics dashboard
  { w:  90, h: 90 },  // status widget
  { w:  65, h: 50 },  // notification panel
] as const

// ─── Types ───────────────────────────────────────────────────────────────────
type Service       = { name: string; color: string }
type ChipState     = { x: number; y: number; z: number; scale: number; opacity: number }
type ParticleState = { x: number; y: number; z: number; opacity: number }
type OrbitState    = { chips: ChipState[]; particles: ParticleState[]; cards: ChipState[] }

// ─── 6 ambient orbit particles ───────────────────────────────────────────────
const PARTICLE_CONFIGS = [
  { color: '#3b82f6', radiusFactor: 0.93, speedFactor: 0.50, phase: 0.80 },
  { color: '#10b981', radiusFactor: 1.12, speedFactor: 0.38, phase: 2.10 },
  { color: '#f59e0b', radiusFactor: 0.88, speedFactor: 0.62, phase: 3.70 },
  { color: '#8b5cf6', radiusFactor: 1.05, speedFactor: 0.44, phase: 1.30 },
  { color: '#f43f5e', radiusFactor: 0.97, speedFactor: 0.55, phase: 5.00 },
  { color: '#06b6d4', radiusFactor: 1.18, speedFactor: 0.33, phase: 4.20 },
] as const

// ─── 3-D projection ───────────────────────────────────────────────────────────
// Projects a tilted-orbit point onto screen (x, y) + depth z.
// The CSS rings use rotateX(RING_CSS_TILT) where cos(28°) = sin(62°),
// so the visual ellipse outline exactly follows these computed paths.
function get3DPosition(angle: number, radius: number, cx: number, cy: number) {
  const x3d   = radius * Math.cos(angle)
  const yFlat = radius * Math.sin(angle)
  const y2d   = yFlat * Math.sin(TILT_RAD)  // foreshortened screen-y
  const z     = yFlat * Math.cos(TILT_RAD)  // depth (+front, -back)
  return { x: cx + x3d, y: cy + y2d, z }
}

function buildChipState(angle: number, i: number, count: number, cx: number, cy: number): ChipState {
  const pos    = get3DPosition(angle + (i / count) * Math.PI * 2, ORBIT_R1, cx, cy)
  const zNorm  = (pos.z + ORBIT_R1) / (2 * ORBIT_R1)
  const scale   = 0.70 + 0.38 * zNorm
  const opacity = 0.30 + 0.70 * zNorm
  const dist    = Math.hypot(pos.x - cx, pos.y - cy)
  const hidden  = pos.z < 0 && dist < SPHERE_R * 1.35  // occluded behind sphere
  return {
    x: pos.x, y: pos.y, z: pos.z, scale,
    opacity: hidden ? Math.min(opacity * 0.15, 0.08) : opacity,
  }
}

// Cards orbit in the OPPOSITE direction (negative t) at CARD_SPEED.
// No sphere-occlusion applied — outer orbit is too wide to pass directly behind it.
function buildCardState(t: number, i: number, cx: number, cy: number): ChipState {
  const angle  = -t * CARD_SPEED + CARD_OFFSETS[i]
  const pos    = get3DPosition(angle, ORBIT_R2, cx, cy)
  const zNorm  = (pos.z + ORBIT_R2) / (2 * ORBIT_R2)
  const scale   = 0.72 + 0.36 * zNorm
  const opacity = 0.30 + 0.70 * zNorm
  return { x: pos.x, y: pos.y, z: pos.z, scale, opacity }
}

function buildParticleState(t: number, cfg: typeof PARTICLE_CONFIGS[number], cx: number, cy: number): ParticleState {
  const angle  = t * cfg.speedFactor + cfg.phase
  const radius = ORBIT_R1 * cfg.radiusFactor
  const pos    = get3DPosition(angle, radius, cx, cy)
  const zNorm  = (pos.z + radius) / (2 * radius)
  const base   = 0.25 + 0.55 * zNorm
  const dist   = Math.hypot(pos.x - cx, pos.y - cy)
  const hidden = pos.z < 0 && dist < SPHERE_R * 1.35
  return { x: pos.x, y: pos.y, z: pos.z, opacity: hidden ? Math.min(base * 0.1, 0.05) : base }
}

// SSR-safe initial snapshot at angle = 0
function initialOrbitState(count: number): OrbitState {
  const cx = STAGE_W / 2, cy = STAGE_H / 2
  return {
    chips:     Array.from({ length: count }, (_, i) => buildChipState(0, i, count, cx, cy)),
    particles: PARTICLE_CONFIGS.map(cfg => ({ ...buildParticleState(0, cfg, cx, cy), opacity: 0 })),
    cards:     CARD_OFFSETS.map((_, i) => buildCardState(0, i, cx, cy)),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
export default function HeroRightEnhanced() {
  const wrapperRef   = useRef<HTMLDivElement>(null)
  const stageRef     = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const angleRef     = useRef(0)

  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [scale, setScale]     = useState(1)
  const isInView = useInView(stageRef, { once: true, amount: 0.3 })

  const { dir, isLoading, t: tGlobal } = useTranslations()
  const t     = useSectionTranslations('components.heroRightEnhanced')
  const tHero = useSectionTranslations('hero')

  // ── Services ─────────────────────────────────────────────────────────────
  const services: Service[] = useMemo(() => {
    const chipLabels     = (t('chipLabels') || {}) as Record<string, string>
    const automation     = chipLabels.automation     || 'Automation'
    const infrastructure = chipLabels.infrastructure || 'Infrastructure'
    const design         = chipLabels.design         || 'Design'
    try {
      const hs = tHero('services')
      if (Array.isArray(hs) && hs.length >= 4) {
        return [
          { name: hs[2] || 'AI Solutions', color: '#10b981' },
          { name: hs[0] || 'Development',  color: '#3b82f6' },
          { name: automation,              color: '#f59e0b' },
          { name: infrastructure,          color: '#64748b' },
          { name: design,                  color: '#8b5cf6' },
        ]
      }
    } catch { /* fallthrough */ }
    return [
      { name: 'AI Solutions', color: '#10b981' },
      { name: 'Development',  color: '#3b82f6' },
      { name: automation,     color: '#f59e0b' },
      { name: infrastructure, color: '#64748b' },
      { name: design,         color: '#8b5cf6' },
    ]
  }, [t, tHero])

  // ── Orbit state — single setState per rAF frame ───────────────────────────
  const [orbit, setOrbit] = useState<OrbitState>(() => initialOrbitState(5))

  // ── Mouse → 3-D tilt for floating cards ──────────────────────────────────
  const rawTiltX    = useMotionValue(0)
  const rawTiltY    = useMotionValue(0)
  const springTiltX = useSpring(rawTiltX, { stiffness: 300, damping: 30 })
  const springTiltY = useSpring(rawTiltY, { stiffness: 300, damping: 30 })

  // Per-card depth multipliers: analytics 1×, status 1.4×, notification 0.7×
  const analyticsRX = useTransform(springTiltY, (v: number) => -v * 8)
  const analyticsRY = useTransform(springTiltX, (v: number) =>  v * 8)
  const statusRX    = useTransform(springTiltY, (v: number) => -v * 8 * 1.4)
  const statusRY    = useTransform(springTiltX, (v: number) =>  v * 8 * 1.4)
  const notifRX     = useTransform(springTiltY, (v: number) => -v * 8 * 0.7)
  const notifRY     = useTransform(springTiltX, (v: number) =>  v * 8 * 0.7)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = stageRef.current
    if (!el) return
    const r  = el.getBoundingClientRect()
    const mx = Math.max(-1, Math.min(1, (e.clientX - r.left - r.width  / 2) / (r.width  / 2)))
    const my = Math.max(-1, Math.min(1, (e.clientY - r.top  - r.height / 2) / (r.height / 2)))
    if (!prefersReducedMotion) { rawTiltX.set(mx); rawTiltY.set(my) }
  }, [prefersReducedMotion, rawTiltX, rawTiltY])

  const onLeave = useCallback(() => {
    rawTiltX.set(0); rawTiltY.set(0)
  }, [rawTiltX, rawTiltY])

  // ── Mount ─────────────────────────────────────────────────────────────────
  useEffect(() => { setMounted(true) }, [])

  // ── Responsive scale — ResizeObserver keeps scale in sync with actual width ─
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / STAGE_W))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // ── rAF orbit loop — chips (forward) + cards (reverse) + particles ────────
  useEffect(() => {
    if (!mounted) return
    const cx    = STAGE_W / 2
    const cy    = STAGE_H / 2
    const count = services.length

    if (prefersReducedMotion) {
      // Static snapshot: chips spread evenly, particles hidden, cards at CARD_OFFSETS
      setOrbit({
        chips: Array.from({ length: count }, (_, i) => {
          const pos   = get3DPosition((i / count) * Math.PI * 2, ORBIT_R1, cx, cy)
          const zNorm = (pos.z + ORBIT_R1) / (2 * ORBIT_R1)
          return { x: pos.x, y: pos.y, z: pos.z, scale: 0.70 + 0.38 * zNorm, opacity: 0.45 + 0.55 * zNorm }
        }),
        particles: PARTICLE_CONFIGS.map(cfg => ({ ...buildParticleState(0, cfg, cx, cy), opacity: 0 })),
        cards: CARD_OFFSETS.map((_, i) => buildCardState(0, i, cx, cy)),
      })
      return
    }

    let raf: number
    const tick = () => {
      angleRef.current += SPEED
      const t = angleRef.current
      setOrbit({
        chips:     Array.from({ length: count }, (_, i) => buildChipState(t, i, count, cx, cy)),
        particles: PARTICLE_CONFIGS.map(cfg => buildParticleState(t, cfg, cx, cy)),
        cards:     CARD_OFFSETS.map((_, i) => buildCardState(t, i, cx, cy)),
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [mounted, prefersReducedMotion, services])

  // ── GSAP ScrollTrigger — right-column rotateY on scroll ──────────────────
  useEffect(() => {
    if (prefersReducedMotion || !wrapperRef.current) return
    gsap.registerPlugin(ScrollTrigger)
    const tween = gsap.to(wrapperRef.current, {
      rotateY: dir === 'rtl' ? 15 : -15,
      scrollTrigger: { trigger: wrapperRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [prefersReducedMotion, dir])

  // ── Loading guard ─────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="mx-auto" style={{ width: STAGE_W }}>
        <div
          className="relative select-none bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center"
          style={{ width: STAGE_W, height: STAGE_H }}
        >
          <div className="text-gray-400">{tGlobal('common.loading')}</div>
        </div>
      </div>
    )
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.15, 1] as number[],
      transition: { duration: prefersReducedMotion ? 0 : 2.5, repeat: Infinity, ease: 'easeInOut' as const },
    },
  }

  // Orbit positions for the three cards
  const c0 = orbit.cards[0] ?? { x: STAGE_W / 2, y: STAGE_H / 2, z: 0, scale: 1, opacity: 1 }
  const c1 = orbit.cards[1] ?? { x: STAGE_W / 2, y: STAGE_H / 2, z: 0, scale: 1, opacity: 1 }
  const c2 = orbit.cards[2] ?? { x: STAGE_W / 2, y: STAGE_H / 2, z: 0, scale: 1, opacity: 1 }

  return (
    // containerRef measures the true rendered column width so we can derive
    // the exact scale needed. height mirrors the visual (scaled) stage height
    // so no phantom whitespace leaks below on mobile.
    <div
      ref={containerRef}
      className="w-full relative"
      style={{ height: STAGE_H * scale }}
    >
    <div
      style={{
        position:        'absolute',
        top:             0,
        left:            '50%',
        width:           STAGE_W,
        transform:       `translateX(-50%) scale(${scale})`,
        transformOrigin: '50% 0',
      }}
    >
    <div
      ref={wrapperRef}
      className="relative"
      dir={dir}
      style={{ width: STAGE_W, perspective: '1200px', willChange: 'transform' }}
    >
      {/* ── Breathing ambient glow ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-16 -z-10 rounded-full"
        style={{ background: 'radial-gradient(circle at center, rgba(99,102,241,0.07), transparent 65%)' }}
        animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Stage ── */}
      <div
        ref={stageRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative select-none"
        aria-label={t('ariaLabel') as string}
        style={{ width: STAGE_W, height: STAGE_H, overflow: 'visible' }}
      >

        {/* Background grid */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          animate={{ opacity: [0.05, 0.07, 0.05] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(99,102,241,0.06), transparent 60%),
              linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 32px 32px, 32px 32px',
          }}
        />

        {/* ── 3-D orbit rings — own perspective context so CSS rotateX works ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}
        >
          {/* Inner ring — service chip path */}
          <div style={{
            position:     'absolute',
            left:         '50%',
            top:          '50%',
            width:        ORBIT_R1 * 2,
            height:       ORBIT_R1 * 2,
            marginLeft:   -ORBIT_R1,
            marginTop:    -ORBIT_R1,
            borderRadius: '50%',
            border:       '1.5px dashed rgba(140,160,210,0.40)',
            transform:    `rotateX(${RING_CSS_TILT}deg)`,
          }} />
          {/* Outer ring — floating card path */}
          <div style={{
            position:     'absolute',
            left:         '50%',
            top:          '50%',
            width:        ORBIT_R2 * 2,
            height:       ORBIT_R2 * 2,
            marginLeft:   -ORBIT_R2,
            marginTop:    -ORBIT_R2,
            borderRadius: '50%',
            border:       '1px dashed rgba(140,160,210,0.25)',
            transform:    `rotateX(${RING_CSS_TILT}deg)`,
          }} />
        </div>

        {/* ── SVG connector lines ── */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0"
          width="100%" height="100%"
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
          fill="none"
          style={{ zIndex: 5 }}
        >
          <defs>
            <linearGradient id="hre-flow1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="rgba(59,130,246,0.30)" />
              <stop offset="100%" stopColor="rgba(148,163,184,0.06)" />
            </linearGradient>
            <linearGradient id="hre-flow2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(139,92,246,0.25)" />
              <stop offset="100%" stopColor="rgba(148,163,184,0.04)" />
            </linearGradient>
            <filter id="hre-glow">
              <feGaussianBlur stdDeviation="1.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <motion.path
            d={dir === 'rtl' ? 'M 240 240 Q 200 210 170 185' : 'M 240 240 Q 280 210 310 185'}
            stroke="url(#hre-flow1)" strokeWidth="1.5" strokeDasharray="6 8" filter="url(#hre-glow)"
            animate={{ strokeDashoffset: [-140, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d={dir === 'rtl' ? 'M 240 240 Q 270 280 295 315' : 'M 240 240 Q 210 280 185 315'}
            stroke="url(#hre-flow2)" strokeWidth="2" strokeDasharray="8 10" filter="url(#hre-glow)"
            animate={{ strokeDashoffset: [-160, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />
        </svg>

        {/* ── Ambient orbit particles ── */}
        {PARTICLE_CONFIGS.map((cfg, i) => {
          const s = orbit.particles[i] ?? { x: STAGE_W / 2, y: STAGE_H / 2, z: 0, opacity: 0 }
          return (
            <div
              key={`pt-${i}`}
              aria-hidden
              className="pointer-events-none absolute rounded-full will-change-transform"
              style={{
                width:     4,
                height:    4,
                left:      s.x - 2,
                top:       s.y - 2,
                background: cfg.color,
                opacity:   s.opacity,
                zIndex:    Math.max(1, Math.round(20 + s.z * 0.13)),
                boxShadow: `0 0 4px ${cfg.color}`,
              }}
            />
          )
        })}

        {/* ── Orbiting service chips (inner ring, forward direction) ── */}
        {services.map((svc, i) => {
          const s     = orbit.chips[i] ?? { x: STAGE_W / 2, y: STAGE_H / 2, z: 0, scale: 1, opacity: 0 }
          const chipW = 130
          const chipH = 32
          return (
            <div
              key={svc.name}
              aria-hidden
              className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full
                         bg-white/95 border border-slate-200/60 text-sm font-medium
                         text-gray-700 whitespace-nowrap will-change-transform
                         shadow-[0_2px_10px_rgba(0,0,0,0.10)]"
              style={{
                left:          s.x - chipW / 2,
                top:           s.y - chipH / 2,
                transform:     `scale(${s.scale})`,
                opacity:       s.opacity,
                zIndex:        Math.round(20 + s.z * 0.13),
                pointerEvents: 'none',
                transition:    'none',
              }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: svc.color }} />
              {svc.name}
            </div>
          )
        })}

        {/* ── 3-D Sphere — z-index 20, midpoint between back/front of both orbits ── */}
        <div
          className="absolute"
          style={{
            left:   STAGE_W / 2 - 58,
            top:    STAGE_H / 2 - 58,
            width:  116,
            height: 116,
            zIndex: 20,
          }}
        >
          {/* Atmosphere glow halo */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, transparent 42%, rgba(130,160,220,0.10) 55%, rgba(100,130,200,0.18) 70%, transparent 82%)',
              transform:  'scale(1.32)',
            }}
          />
          {/* Rotating sphere surface — gradient rotation gives a slow shimmer */}
          <motion.div
            className="absolute inset-0 rounded-full will-change-transform"
            style={{
              background: 'radial-gradient(circle at 34% 30%, #ffffff 0%, #e2e8f8 18%, #c5cfe8 38%, #9aaac8 58%, #7080a8 78%, #4a5880 100%)',
              boxShadow: [
                'inset -14px -14px 32px rgba(0,0,40,0.20)',
                'inset 5px 5px 14px rgba(255,255,255,0.52)',
                '0 8px 32px rgba(60,80,140,0.18)',
              ].join(', '),
            }}
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          />
          {/* Specular highlight — fixed above the rotating surface */}
          <div
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              top:        '10%',
              left:       '18%',
              width:      '30%',
              height:     '22%',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.74) 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          {/* Brand mark — two lines sized to stay inside the sphere */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <div style={{ textAlign: 'center', lineHeight: 1.15, textShadow: '0 1px 6px rgba(0,0,40,0.35)' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.08em' }}>PAK</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.08em' }}>SOFT</div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            Floating cards — outer orbit (reverse direction, ORBIT_R2).
            z-index range ≈ 7–31 (Math.round(19 + z * 0.12)) so they correctly
            pass in front of or behind the sphere (z-index 20) based on depth.
            Mouse tilt still applies via the inner motion.div wrappers.
        ───────────────────────────────────────────────────────────────────── */}

        {/* Analytics Dashboard — depth multiplier 1× */}
        <div
          style={{
            position:      'absolute',
            left:          c0.x - CARD_DEFS[0].w / 2,
            top:           c0.y - CARD_DEFS[0].h / 2,
            transform:     `scale(${c0.scale})`,
            opacity:       c0.opacity,
            zIndex:        Math.round(19 + c0.z * 0.12),
            transition:    'none',
            willChange:    'transform',
            pointerEvents: 'none',
            perspective:   '600px',
          }}
        >
          <motion.div style={{
            rotateX:    prefersReducedMotion ? 0 : analyticsRX,
            rotateY:    prefersReducedMotion ? 0 : analyticsRY,
            willChange: 'transform',
          }}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView
                ? { scale: 1, opacity: 1, y: prefersReducedMotion ? 0 : ([-3, 3, -3] as number[]) }
                : { scale: 0, opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : {
                scale:   { type: 'spring', stiffness: 220, damping: 18, delay: 0.3 },
                opacity: { duration: 0.3, delay: 0.3 },
                y:       { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 },
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}
                className="w-[110px] h-[80px] rounded-lg border border-gray-200/80 bg-white/95
                           backdrop-blur-sm shadow-[0_8px_25px_rgba(0,0,0,0.15)] cursor-pointer p-2.5"
                style={{ willChange: 'transform' }}
              >
                <div className={`mb-2 flex items-center justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
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
                <div className="space-y-1.5 mb-2">
                  {[['68%','75%','68%','from-emerald-500 to-blue-500'],
                    ['42%','48%','42%','from-violet-500 to-amber-500']].map(([a, b, c, grad], idx) => (
                    <div key={idx} className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${grad} rounded-full`}
                        animate={{ width: [a, b, c] }}
                        transition={{ duration: 4 + idx * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                  ))}
                </div>
                <div className="h-[18px] w-full">
                  <svg width="100%" height="100%" viewBox="0 0 100 18">
                    <motion.path d="M2,14 Q20,7 35,11 T65,5 T95,9"
                      fill="none" stroke="rgba(59,130,246,0.8)" strokeWidth="1.5" strokeLinecap="round"
                      animate={{ pathLength: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </svg>
                </div>
                <div className={`mt-1 flex justify-between items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className="flex gap-1">
                    <div className="h-1 w-2 bg-green-400 rounded" />
                    <div className="h-1 w-3 bg-blue-400 rounded" />
                    <div className="h-1 w-2 bg-amber-400 rounded" />
                  </div>
                  <motion.span
                    className="text-[8px] text-emerald-600 font-mono"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {t('notifications.live')}
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Status Widget — depth multiplier 1.4× */}
        <div
          style={{
            position:      'absolute',
            left:          c1.x - CARD_DEFS[1].w / 2,
            top:           c1.y - CARD_DEFS[1].h / 2,
            transform:     `scale(${c1.scale})`,
            opacity:       c1.opacity,
            zIndex:        Math.round(19 + c1.z * 0.12),
            transition:    'none',
            willChange:    'transform',
            pointerEvents: 'none',
            perspective:   '600px',
          }}
        >
          <motion.div style={{
            rotateX:    prefersReducedMotion ? 0 : statusRX,
            rotateY:    prefersReducedMotion ? 0 : statusRY,
            willChange: 'transform',
          }}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView
                ? { scale: 1, opacity: 1, y: prefersReducedMotion ? 0 : ([3, -3, 3] as number[]) }
                : { scale: 0, opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : {
                scale:   { type: 'spring', stiffness: 220, damping: 18, delay: 0.45 },
                opacity: { duration: 0.3, delay: 0.45 },
                y:       { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 },
              }}
            >
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                className="w-[90px] h-[90px] rounded-xl border border-gray-200/80
                           bg-gradient-to-br from-slate-50/95 to-slate-100/95
                           backdrop-blur-sm shadow-[0_8px_20px_rgba(0,0,0,0.12)] cursor-pointer p-3"
                style={{ willChange: 'transform' }}
              >
                <div className={`mb-2.5 flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className="relative h-7 w-7">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
                    <motion.span
                      className={`absolute h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white
                                  ${dir === 'rtl' ? '-left-0.5 -bottom-0.5' : '-right-0.5 -bottom-0.5'}`}
                      variants={pulseVariants} animate="animate"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    {[
                      { color: 'bg-emerald-500', d: 2,   delay: 0   },
                      { color: 'bg-amber-500',   d: 2.5, delay: 0.5 },
                      { color: 'bg-blue-500',    d: 2.2, delay: 1   },
                    ].map(({ color, d, delay }, idx) => (
                      <motion.span key={idx} className={`h-1 w-1 rounded-full ${color}`}
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: d, repeat: Infinity, delay }} />
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5 mb-2">
                  {[
                    { from: 'from-emerald-400', w: 'w-10/12' },
                    { from: 'from-blue-400',    w: 'w-7/12'  },
                    { from: 'from-violet-400',  w: 'w-5/12'  },
                  ].map(({ from, w }, idx) => (
                    <div key={idx} className={`h-0.5 bg-gradient-to-r ${from} to-transparent rounded ${w}`} />
                  ))}
                </div>
                <div className="flex items-end gap-1 justify-center">
                  {[4, 6, 8, 10].map((h, idx) => (
                    <motion.div key={idx}
                      className="w-1.5 rounded-sm"
                      style={{ height: `${h}px` }}
                      animate={{
                        height: [`${h - 1}px`, `${h + 1}px`, `${h}px`],
                        background: [
                          'linear-gradient(to top, rgb(156,163,175), rgb(209,213,219))',
                          `linear-gradient(to top, ${idx < 2 ? 'rgb(34,197,94)' : idx < 3 ? 'rgb(59,130,246)' : 'rgb(139,92,246)'}, rgb(209,213,219))`,
                          'linear-gradient(to top, rgb(156,163,175), rgb(209,213,219))',
                        ],
                      }}
                      transition={{ duration: 2 + idx * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Notification Panel — depth multiplier 0.7× */}
        <div
          style={{
            position:      'absolute',
            left:          c2.x - CARD_DEFS[2].w / 2,
            top:           c2.y - CARD_DEFS[2].h / 2,
            transform:     `scale(${c2.scale})`,
            opacity:       c2.opacity,
            zIndex:        Math.round(19 + c2.z * 0.12),
            transition:    'none',
            willChange:    'transform',
            pointerEvents: 'none',
            perspective:   '600px',
          }}
        >
          <motion.div style={{
            rotateX:    prefersReducedMotion ? 0 : notifRX,
            rotateY:    prefersReducedMotion ? 0 : notifRY,
            willChange: 'transform',
          }}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView
                ? {
                    scale:   [1, 1, 1, 1.02, 1],
                    opacity: 1,
                    rotate:  prefersReducedMotion ? 0 : ([0, 0, 0, 1.5, 0, -1.5, 0] as number[]),
                  }
                : { scale: 0, opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : {
                scale:   { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                opacity: { duration: 0.3, delay: 0.2 },
                rotate:  { duration: 1, repeat: Infinity, repeatDelay: 8, ease: 'easeInOut', delay: 1.5 },
              }}
            >
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                className="w-[65px] h-[50px] rounded-lg border border-gray-200/80 bg-white/98
                           backdrop-blur-sm shadow-[0_6px_18px_rgba(0,0,0,0.12)] cursor-pointer p-2.5 relative"
                style={{ willChange: 'transform' }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-600">
                  <motion.path
                    d="M12 3a5 5 0 00-5 5v2.5c0 .6-.24 1.17-.66 1.59L5 13h14l-1.34-1.91c-.42-.42-.66-.99-.66-1.59V8a5 5 0 00-5-5z"
                    fill="currentColor" opacity="0.75"
                    animate={{ opacity: [0.75, 0.9, 0.75] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <path d="M9 18a3 3 0 006 0H9z" fill="currentColor" opacity="0.5" />
                </svg>
                <motion.div
                  className={`absolute -top-1 h-4 min-w-4 px-1 rounded-full
                              bg-gradient-to-r from-emerald-500 to-emerald-600
                              text-[10px] leading-4 text-white text-center
                              shadow-[0_2px_6px_rgba(16,185,129,0.5)]
                              ${dir === 'rtl' ? '-left-1' : '-right-1'}`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  3
                </motion.div>
                <div className="absolute left-2.5 right-2.5 bottom-2 space-y-1">
                  <div className="h-1 bg-gradient-to-r from-gray-300 to-transparent rounded w-9/12" />
                  <div className="h-1 bg-gradient-to-r from-gray-200 to-transparent rounded w-6/12" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Corner decoration — top-left */}
        <motion.div
          aria-hidden
          className="absolute left-2 top-2 h-0 w-0 opacity-50 pointer-events-none"
          style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '7px solid rgb(209,213,219)' }}
          animate={{ y: [-1, 1, -1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Corner decoration — bottom-right */}
        <motion.div
          aria-hidden
          className="absolute right-3 bottom-3 h-2.5 w-2.5 bg-gradient-to-br from-gray-200 to-gray-300
                     opacity-40 pointer-events-none will-change-transform"
          style={{ rotate: 45 }}
          animate={{ x: [-1, 1, -1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

      </div>{/* end stage */}
    </div>{/* end wrapperRef */}
    </div>{/* end scale wrapper */}
    </div>
  )
}
