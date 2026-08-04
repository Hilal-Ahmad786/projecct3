'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  children: string
  className?: string
  as?: 'p' | 'span'
}

export default function ScrollRevealText({ children, className = '', as: Tag = 'p' }: Props) {
  const prefersReducedMotion = useReducedMotion()

  const Container = Tag === 'span' ? motion.span : motion.p

  return (
    <Container
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </Container>
  )
}
