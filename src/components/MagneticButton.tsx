'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  maxX?: number
  maxY?: number
}

export default function MagneticButton({ children, className, maxX = 12, maxY = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 200, damping: 20 })
  const y = useSpring(rawY, { stiffness: 200, damping: 20 })

  const onMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.set(((e.clientX - cx) / (rect.width / 2)) * maxX)
    rawY.set(((e.clientY - cy) / (rect.height / 2)) * maxY)
  }

  const onMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, willChange: 'transform', display: 'inline-block' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}
