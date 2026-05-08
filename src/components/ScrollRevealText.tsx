'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  children: string
  className?: string
  as?: 'p' | 'span'
}

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
}

const wordVariants = {
  hidden: { opacity: 0.12, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export default function ScrollRevealText({ children, className = '', as: Tag = 'p' }: Props) {
  const prefersReducedMotion = useReducedMotion()
  const words = children.split(' ')

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  const Container = Tag === 'span' ? motion.span : motion.p

  return (
    <Container
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <motion.span
            variants={wordVariants}
            style={{ display: 'inline-block', willChange: 'transform' }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </Container>
  )
}
