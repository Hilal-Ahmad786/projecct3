'use client'
import { useRef, useEffect, useState } from 'react'
import {
  motion, AnimatePresence, useReducedMotion,
  useScroll, useTransform, useSpring,
} from 'framer-motion'
import { gsap } from 'gsap'
import HomeHeroOrbit from '@/components/HomeHeroOrbit'
import MagneticButton from '@/components/MagneticButton'
import Button from '@/components/Button'
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'
import { smoothSpring, snappySpring, useCountUp, useInViewOnce } from '@/lib/animations'

// ─── Spring config for scroll (stiffness/damping only — no 'type') ───
const SCROLL_SPRING = { stiffness: 80, damping: 24 }

// ─── Per-character 3D reveal ──────────────────────────────────────────
function SplitText3D({
  text,
  mounted,
  prefersReducedMotion,
  dir = 'ltr',
}: {
  text: string
  mounted: boolean
  prefersReducedMotion: boolean | null
  dir?: string
}) {
  const isRTL = dir === 'rtl'

  if (isRTL) {
    // Split by words so Arabic/Urdu letters stay connected within each word
    const words = text.split(' ')
    return (
      <>
        {words.map((word, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }
            }
          >
            {word}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </>
    )
  }

  const chars = text.split('')
  return (
    <>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: 'inline-block',
            willChange: 'transform',
            transformOrigin: '50% 50% -30px',
          }}
          initial={prefersReducedMotion ? {} : { rotateX: 90, opacity: 0, z: -60 }}
          animate={mounted ? { rotateX: 0, opacity: 1, z: 0 } : {}}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { ...snappySpring, delay: i * 0.03 }
          }
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </>
  )
}


// ─── Stat with 3D flip entrance ───────────────────────────────────────
function CountUpStat({ value, label }: { value: string; label: string }) {
  const { ref, isInView } = useInViewOnce('-100px')
  const prefersReducedMotion = useReducedMotion()

  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : value

  const count = useCountUp(target, prefersReducedMotion ? 0 : 2000, isInView)

  return (
    <div ref={ref} className="text-center sm:text-start">
      <motion.div
        className="text-2xl font-light text-gray-900 mb-1"
        style={{ willChange: 'transform', perspective: '400px' }}
        initial={prefersReducedMotion ? {} : { rotateY: -90, opacity: 0 }}
        animate={isInView ? { rotateY: 0, opacity: 1 } : {}}
        transition={prefersReducedMotion ? { duration: 0 } : snappySpring}
      >
        {match ? `${count}${suffix}` : value}
      </motion.div>
      <div className="text-caption text-gray-500">{label}</div>
    </div>
  )
}

// ─── Container variant for staggered entrance ─────────────────────────
const leftContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: smoothSpring },
}

const lineDrawItem = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { ...snappySpring, delay: 0.1 } },
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  const serviceWordRef = useRef<HTMLSpanElement>(null)

  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const { dir } = useTranslations()
  const t = useSectionTranslations('hero')
  const tStats = useSectionTranslations('stats')

  const services = [
    t('services.0'),
    t('services.1'),
    t('services.2'),
    t('services.3'),
  ]

  // ── Scroll-linked parallax ──────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const rawY       = useTransform(scrollYProgress, [0, 1], [0, -80])
  const rawScale   = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4])
  const rawTopY    = useTransform(scrollYProgress, [0, 1], [0, 60])
  const rawBotY    = useTransform(scrollYProgress, [0, 1], [0, -40])

  const parallaxY       = useSpring(rawY,       SCROLL_SPRING)
  const parallaxScale   = useSpring(rawScale,   SCROLL_SPRING)
  const parallaxOpacity = useSpring(rawOpacity, SCROLL_SPRING)
  const crescentTopY    = useSpring(rawTopY,    SCROLL_SPRING)
  const crescentBotY    = useSpring(rawBotY,    SCROLL_SPRING)

  // ── Mount + service word rotation ──────────────────────────────────
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % services.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [services.length, prefersReducedMotion])

  // ── GSAP idle float on heading words ───────────────────────────────
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return
    const els = [titleRef.current, serviceWordRef.current]
    const tweens = els.map((el, i) => {
      if (!el) return null
      return gsap.to(el, {
        y: i === 0 ? 2 : -2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 2,
      })
    })
    return () => { tweens.forEach(tw => { if (tw) tw.kill() }) }
  }, [mounted, prefersReducedMotion])

  return (
    <section
      ref={heroRef}
      className="hero-section relative gradient-bg-vibrant girih-bg girih-bg-fade overflow-hidden"
      dir={dir}
    >
      {/* Heritage gradient washes */}
      <div
        className={`absolute top-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-50 pointer-events-none ${dir === 'rtl' ? 'right-0' : 'left-0'}`}
        style={{ background: 'var(--accent-emerald-light)' }}
      />
      <div
        className={`absolute bottom-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-40 pointer-events-none ${dir === 'rtl' ? 'left-0' : 'right-0'}`}
        style={{ background: 'var(--heritage-sand)' }}
      />

      {/* Crescent Elements — scroll-parallax */}
      <motion.div
        className={`absolute top-32 w-32 h-32 ${dir === 'rtl' ? 'left-20' : 'right-20'}`}
        style={{ y: prefersReducedMotion ? 0 : crescentTopY, willChange: 'transform', color: 'var(--heritage-turquoise)' }}
      >
        <div className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-medium`} />
      </motion.div>

      <motion.div
        className={`absolute bottom-32 w-24 h-24 ${dir === 'rtl' ? 'right-16' : 'left-16'}`}
        style={{ y: prefersReducedMotion ? 0 : crescentBotY, willChange: 'transform', color: 'var(--heritage-saffron)' }}
      >
        <div className={`crescent ${dir === 'rtl' ? 'crescent-right' : 'crescent-left'} crescent-medium`} />
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column — staggered entrance + scroll parallax */}
          <motion.div
            variants={prefersReducedMotion ? undefined : leftContainerVariants}
            initial={prefersReducedMotion ? { opacity: 0 } : 'hidden'}
            animate={mounted ? (prefersReducedMotion ? { opacity: 1 } : 'visible') : undefined}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            style={{
              y:       prefersReducedMotion ? 0 : parallaxY,
              scale:   prefersReducedMotion ? 1 : parallaxScale,
              opacity: prefersReducedMotion ? 1 : parallaxOpacity,
              willChange: 'transform, opacity',
            }}
            className="space-y-8"
          >
            {/* Overline */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUpItem}
              className="flex items-center gap-3"
            >
              <motion.div
                variants={prefersReducedMotion ? undefined : lineDrawItem}
                className="w-8 h-0.5 origin-left"
                style={{ background: 'var(--heritage-turquoise)' }}
              />
              <span
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: 'var(--heritage-turquoise)' }}
              >
                {t('eyebrow')}
              </span>
            </motion.div>

            {/* Main Heading — 3D char reveal + GSAP float */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUpItem}
              className="space-y-4"
            >
              <h1
                className="text-display font-light text-gray-900 leading-none"
                style={{ perspective: '800px' }}
              >
                <span ref={titleRef} style={{ display: 'inline-block' }}>
                  <SplitText3D
                    text={t('title') as string}
                    mounted={mounted}
                    prefersReducedMotion={prefersReducedMotion}
                    dir={dir}
                  />
                </span>
                <br />
                <span
                  ref={serviceWordRef}
                  className="relative inline-block overflow-hidden"
                  style={{ minHeight: '1.2em' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentIndex}
                      className="inline-block"
                      style={{ color: 'var(--heritage-turquoise)' }}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={prefersReducedMotion ? {} : { opacity: 0, y: -20, filter: 'blur(8px)' }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                      }
                    >
                      {services[currentIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5"
                    style={{ background: 'linear-gradient(to right, var(--heritage-turquoise), var(--heritage-saffron))' }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={prefersReducedMotion ? { duration: 0 } : snappySpring}
                    key={`underline-${currentIndex}`}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={prefersReducedMotion ? undefined : fadeUpItem}
              className="text-body text-gray-600 max-w-lg leading-relaxed"
            >
              {t('description')}
            </motion.p>

            {/* Action Buttons — magnetic hover */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUpItem}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton>
                <Button
                  href="/services"
                  variant="primary"
                  size="lg"
                  rightIcon={
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d={dir === 'rtl' ? 'M11 17l-5-5m0 0l5-5m-5 5h12' : 'M13 7l5 5m0 0l-5 5m5-5H6'} />
                    </svg>
                  }
                >
                  {t('viewServices')}
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button
                  href="/projects"
                  variant="secondary"
                  size="lg"
                  leftIcon={
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  }
                >
                  {t('ourWork')}
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Stats — 3D flip entrance */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUpItem}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200"
            >
              {[
                { value: tStats('projects100'), label: t('stats.projects') },
                { value: tStats('clients50'),   label: t('stats.clients')  },
                { value: tStats('years5'),       label: t('stats.years')    },
              ].map(stat => (
                <CountUpStat
                  key={stat.label as string}
                  value={typeof stat.value === 'string' ? stat.value : String(stat.value)}
                  label={typeof stat.label === 'string' ? stat.label : String(stat.label)}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -32 : 32 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : (dir === 'rtl' ? -32 : 32) }}
            transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: 0.35 }}
            className="relative"
          >
            <HomeHeroOrbit />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.5, duration: prefersReducedMotion ? 0 : 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <span className="text-xs font-medium uppercase tracking-wide">
            {t('scroll') || 'Scroll'}
          </span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 4, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: prefersReducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
