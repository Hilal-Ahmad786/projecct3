// src/components/Hero.tsx
'use client'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import ParticleNetwork from '@/components/ParticleNetwork'
import HeroRightEnhanced from '@/components/HeroRightEnhanced'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Button from '@/components/Button'
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'
import { smoothSpring, snappySpring, useCountUp, useInViewOnce } from '@/lib/animations'

function CountUpStat({ value, label }: { value: string; label: string }) {
  const { ref, isInView } = useInViewOnce()
  const prefersReducedMotion = useReducedMotion()

  // Extract number and suffix (e.g. "100+" -> 100, "+")
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : value

  const count = useCountUp(target, prefersReducedMotion ? 0 : 2000, isInView)

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="text-2xl font-light text-gray-900 mb-1">
        {match ? `${count}${suffix}` : value}
      </div>
      <div className="text-caption text-gray-500">{label}</div>
    </div>
  )
}

export default function Hero() {
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
    t('services.3')
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % services.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [services.length, prefersReducedMotion])

  return (
    <section className="hero-section relative gradient-bg-vibrant overflow-hidden" dir={dir}>
      <ParticleNetwork className="opacity-60" />

      {/* Swiss Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      {/* Crescent Elements */}
      <div className={`absolute top-32 w-32 h-32 ${dir === 'rtl' ? 'left-20' : 'right-20'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-900`} />
      </div>

      <div className={`absolute bottom-32 w-24 h-24 ${dir === 'rtl' ? 'right-16' : 'left-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-right' : 'crescent-left'} crescent-subtle text-gray-600`} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 32 : -32 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : (dir === 'rtl' ? 32 : -32) }}
            transition={prefersReducedMotion ? { duration: 0 } : smoothSpring}
            className={`space-y-8 ${dir === 'rtl' ? 'lg:order-2' : ''}`}
          >
            {/* Overline */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-gray-900"></div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {t('eyebrow')}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-display font-light text-gray-900 leading-none">
                {t('title')}
                <br />
                <span className="relative inline-block overflow-hidden" style={{ minHeight: '1.2em' }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentIndex}
                      className="text-gray-600 inline-block"
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={prefersReducedMotion ? {} : { opacity: 0, y: -20, filter: 'blur(8px)' }}
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {services[currentIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 bg-gray-900"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={prefersReducedMotion ? { duration: 0 } : snappySpring}
                    key={`underline-${currentIndex}`}
                  />
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-body text-gray-600 max-w-lg leading-relaxed">
              {t('description')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/services"
                variant="primary"
                size="lg"
                rightIcon={
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d={dir === 'rtl' ? "M11 17l-5-5m0 0l5-5m-5 5h12" : "M13 7l5 5m0 0l-5 5m5-5H6"} />
                  </svg>
                }
              >
                {t('viewServices')}
              </Button>
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
            </div>

            {/* Stats with CountUp */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              {[
                { value: tStats('projects100'), label: t('stats.projects') },
                { value: tStats('clients50'), label: t('stats.clients') },
                { value: tStats('years5'), label: t('stats.years') }
              ].map((stat) => (
                <CountUpStat
                  key={stat.label}
                  value={typeof stat.value === 'string' ? stat.value : String(stat.value)}
                  label={typeof stat.label === 'string' ? stat.label : String(stat.label)}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -32 : 32 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : (dir === 'rtl' ? -32 : 32) }}
            transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: 0.2 }}
            className={`relative ${dir === 'rtl' ? 'lg:order-1' : ''}`}
          >
            <HeroRightEnhanced />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator with scale pulse */}
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
            transition={{ duration: 2, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}
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
