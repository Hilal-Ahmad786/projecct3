'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  text: string
  tag?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
}

export default function SplitHeading({ text, tag = 'h2', className = '', delay = 0 }: Props) {
  const prefersReducedMotion = useReducedMotion()

  const MotionTag = tag === 'h1' ? motion.h1 : tag === 'h3' ? motion.h3 : motion.h2

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }
      }
    >
      {text}
    </MotionTag>
  )
}
