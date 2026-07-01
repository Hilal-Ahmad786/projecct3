// src/lib/animations.ts
// Shared animation presets, variants, and hooks for homepage sections

'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, type UseInViewOptions } from 'framer-motion'

// ─── Spring Presets ───────────────────────────────────────────────
export const smoothSpring = { type: 'spring' as const, stiffness: 100, damping: 20 }
export const snappySpring = { type: 'spring' as const, stiffness: 300, damping: 30 }
export const gentleSpring = { type: 'spring' as const, stiffness: 80, damping: 24 }

// ─── Easing Presets ───────────────────────────────────────────────
export const smoothEase = [0.22, 1, 0.36, 1] as const

// ─── Reusable Variants ───────────────────────────────────────────
export const fadeUpVariants = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...smoothSpring, delay },
  },
})

export const fadeInVariants = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: smoothEase as unknown as number[], delay },
  },
})

export const scaleInVariants = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...snappySpring, delay },
  },
})

// ─── Container / Stagger Variants ────────────────────────────────
export const staggerContainer = (stagger = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
    },
  },
})

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothSpring,
  },
}

// ─── Reduced Motion Helpers ──────────────────────────────────────
export const noMotionTransition = { duration: 0 }

export const getTransition = (
  prefersReducedMotion: boolean | null,
  transition: Record<string, unknown>
) => (prefersReducedMotion ? noMotionTransition : transition)

// ─── useCountUp Hook ─────────────────────────────────────────────
export function useCountUp(
  target: number,
  duration = 2000,
  inView = false
): number {
  // Start at target so SSR/no-JS output shows the real number (not "0+");
  // the visual count-up from 0 only begins once the element is in view.
  const [value, setValue] = useState(target)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    let rafId: number

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, target, duration])

  return value
}

// ─── useInViewOnce (convenience) ─────────────────────────────────
export function useInViewOnce(margin: UseInViewOptions['margin'] = '-100px') {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin })
  return { ref, isInView }
}
