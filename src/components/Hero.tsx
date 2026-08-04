'use client'
import { useRef, useEffect, useState } from 'react'
import {
  motion, AnimatePresence, useReducedMotion,
  useScroll, useTransform, useSpring,
} from 'framer-motion'
import HomeHeroOrbit from '@/components/HomeHeroOrbit'
import MagneticButton from '@/components/MagneticButton'
import Button from '@/components/Button'
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'
import { useIsMobile } from '@/hooks/useIsMobile'
import { snappySpring, useCountUp, useInViewOnce } from '@/lib/animations'
import { COMPANY_STATS } from '@/config/companyStats'

// ─── Spring config for scroll (stiffness/damping only — no 'type') ───
const SCROLL_SPRING = { stiffness: 80, damping: 24 }

// ─── Per-character 3D reveal ──────────────────────────────────────────
// Pure CSS (.hero-enter / .hero-enter-char) so the heading is present and
// animating in the server HTML, before any JS loads.
function SplitText3D({ text, dir = 'ltr' }: { text: string; dir?: string }) {
  const isRTL = dir === 'rtl'

  if (isRTL) {
    // Split by words so Arabic/Urdu letters stay connected within each word
    const words = text.split(' ')
    return (
      <>
        {words.map((word, i) => (
          <span
            key={i}
            className="hero-enter"
            style={{ display: 'inline-block', animationDelay: `${i * 0.08}s` }}
          >
            {word}{i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </>
    )
  }

  const chars = text.split('')
  return (
    <>
      {chars.map((char, i) => (
        <span key={i} className="hero-enter-char" style={{ animationDelay: `${i * 0.03}s` }}>
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </>
  )
}


// ─── Stat with 3D flip entrance ───────────────────────────────────────
function CountUpStat({ value, label }: { value: string; label: string }) {
  const { ref, isInView } = useInViewOnce('-100px')
  const prefersReducedMotion = useReducedMotion()
  // SSR/pre-hydration shows the final value; the count-up only takes over
  // after hydration so slow connections never see "0+".
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => { setHydrated(true) }, [])

  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : value

  const count = useCountUp(target, prefersReducedMotion ? 0 : 2000, isInView)

  return (
    <div ref={ref} className="text-center sm:text-start">
      <div className="text-2xl font-light text-gray-900 mb-1">
        {match && hydrated ? `${count}${suffix}` : value}
      </div>
      <div className="text-caption text-gray-500">{label}</div>
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  const serviceWordRef = useRef<HTMLSpanElement>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  // Scroll-linked springs write transforms every scroll frame — fine on
  // desktop, main-thread jank on phones. Static there.
  const still = prefersReducedMotion || isMobile

  const { dir } = useTranslations()
  const t = useSectionTranslations('hero')

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

  // ── Service word rotation ───────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % services.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [services.length, prefersReducedMotion])

  // Idle float on the heading words is now a pure-CSS animation
  // (.hero-float-a / .hero-float-b in globals.css) — no gsap needed.

  return (
    <section
      ref={heroRef}
      className="hero-section relative gradient-bg-vibrant girih-bg girih-bg-fade overflow-hidden"
      dir={dir}
    >
      {/* Heritage gradient washes */}
      <div
        className={`hidden lg:block absolute top-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-50 pointer-events-none ${dir === 'rtl' ? 'right-0' : 'left-0'}`}
        style={{ background: 'var(--accent-emerald-light)' }}
      />
      <div
        className={`hidden lg:block absolute bottom-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-40 pointer-events-none ${dir === 'rtl' ? 'left-0' : 'right-0'}`}
        style={{ background: 'var(--heritage-sand)' }}
      />

      {/* Crescent Elements — scroll-parallax */}
      <motion.div
        className={`absolute top-32 w-32 h-32 ${dir === 'rtl' ? 'left-20' : 'right-20'}`}
        style={{ y: still ? 0 : crescentTopY, willChange: 'transform', color: 'var(--heritage-turquoise)' }}
      >
        <div className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-medium`} />
      </motion.div>

      <motion.div
        className={`absolute bottom-32 w-24 h-24 ${dir === 'rtl' ? 'right-16' : 'left-16'}`}
        style={{ y: still ? 0 : crescentBotY, willChange: 'transform', color: 'var(--heritage-saffron)' }}
      >
        <div className={`crescent ${dir === 'rtl' ? 'crescent-right' : 'crescent-left'} crescent-medium`} />
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column — staggered entrance + scroll parallax */}
          <motion.div
            style={{
              y:       still ? 0 : parallaxY,
              scale:   still ? 1 : parallaxScale,
              opacity: still ? 1 : parallaxOpacity,
              willChange: 'transform, opacity',
            }}
            className="space-y-8"
          >
            {/* Overline */}
            <div className="hero-enter flex items-center gap-3" style={{ animationDelay: '0.05s' }}>
              <div
                className="w-8 h-0.5 origin-left"
                style={{ background: 'var(--heritage-turquoise)' }}
              />
              <span
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: 'var(--heritage-turquoise)' }}
              >
                {t('eyebrow')}
              </span>
            </div>

            {/* Main Heading — 3D char reveal + GSAP float */}
            <div className="hero-enter space-y-4" style={{ animationDelay: '0.12s' }}>
              <h1
                className="text-display font-light text-gray-900 leading-none"
                style={{ perspective: '800px' }}
              >
                <span ref={titleRef} className="hero-float-a" style={{ display: 'inline-block' }}>
                  <SplitText3D text={t('title') as string} dir={dir} />
                </span>
                <br />
                <span
                  ref={serviceWordRef}
                  className="relative inline-block overflow-hidden hero-float-b"
                  style={{ minHeight: '1.2em' }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={currentIndex}
                      className="inline-block"
                      style={{ color: 'var(--heritage-turquoise)' }}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      // Fast exit: with AnimatePresence mode="wait" the headline
                      // line is EMPTY for the whole exit duration — at 0.4s the
                      // hero visibly read as just "Modern" between words.
                      exit={prefersReducedMotion ? {} : { opacity: 0, y: -20, filter: 'blur(8px)', transition: { duration: 0.12 } }}
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
            </div>

            {/* Description */}
            <p className="hero-enter text-body text-gray-600 max-w-lg leading-relaxed" style={{ animationDelay: '0.2s' }}>
              {t('description')}
            </p>

            {/* Action Buttons — magnetic hover */}
            <div className="hero-enter flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.28s' }}>
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
            </div>

            {/* Stats — 3D flip entrance */}
            <div className="hero-enter grid grid-cols-3 gap-8 pt-8 border-t border-gray-200" style={{ animationDelay: '0.36s' }}>
              {[
                { value: COMPANY_STATS.projects, label: t('stats.projects') },
                { value: COMPANY_STATS.clients,  label: t('stats.clients')  },
                { value: COMPANY_STATS.years,    label: t('stats.years')    },
              ].map(stat => (
                <CountUpStat
                  key={stat.label as string}
                  value={stat.value}
                  label={typeof stat.label === 'string' ? stat.label : String(stat.label)}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <div
            className="hero-enter-side relative"
            style={{ '--hero-side-x': dir === 'rtl' ? '-32px' : '32px' } as React.CSSProperties}
          >
            <HomeHeroOrbit />
          </div>
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
