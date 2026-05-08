'use client'

import { useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'splitting/dist/splitting.css'

interface Props {
  text: string
  tag?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
}

export default function SplitHeading({ text, tag = 'h2', className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!ref.current) return

    if (prefersReducedMotion) return

    let chars: HTMLElement[] = []

    import('splitting').then(({ default: splitting }) => {
      if (!ref.current) return
      const results = splitting({ target: ref.current, by: 'chars' })
      chars = results[0]?.chars ?? []
      if (!chars.length) return

      const ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 48,
            rotationX: 90,
            transformOrigin: '0% 50% -50px',
            willChange: 'transform',
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.7,
            stagger: 0.022,
            ease: 'power3.out',
            delay,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 88%',
              once: true,
            },
          }
        )
      }, ref)

      return () => ctx.revert()
    })
  }, [prefersReducedMotion, delay])

  const headingProps = {
    ref,
    className,
    suppressHydrationWarning: true as const,
    children: text,
  }

  const inner =
    tag === 'h1' ? <h1 {...headingProps} /> :
    tag === 'h3' ? <h3 {...headingProps} /> :
                   <h2 {...headingProps} />

  return (
    <div style={{ perspective: '600px' }}>
      {inner}
    </div>
  )
}
