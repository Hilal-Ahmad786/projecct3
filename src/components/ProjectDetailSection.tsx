// src/components/ProjectDetailSection.tsx
'use client'
import { useRef } from 'react'
import { motion, useReducedMotion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline'

import SectionHeader from '@/components/SectionHeader'
import Button from '@/components/Button'
import {
  CodeBracketIcon,
  ClockIcon,
  ShieldCheckIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'
import { smoothSpring, useCountUp, useInViewOnce } from '@/lib/animations'

function CountUpStatItem({ value, label }: { value: string; label: string }) {
  const { ref, isInView } = useInViewOnce()
  const prefersReducedMotion = useReducedMotion()
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : value
  const count = useCountUp(target, prefersReducedMotion ? 0 : 2000, isInView)

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-light text-gray-900 mb-2">
        {match ? `${count}${suffix}` : value}
      </div>
      <div className="text-caption text-gray-500">{label}</div>
    </div>
  )
}

type ProcessStep = { step: string; title: string; desc: string }

function ProcessStepsWithLine({ dir, steps }: { dir: string; steps: ProcessStep[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <div ref={ref} className="space-y-6 relative">
      {/* Connecting line that draws itself */}
      <div className={`absolute ${dir === 'rtl' ? 'right-6' : 'left-6'} top-6 bottom-6 w-px overflow-hidden`}>
        <motion.div
          className="w-full bg-gray-300 origin-top"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%' }}
        />
      </div>

      {steps.map((phase, idx) => (
        <motion.div
          key={phase.step}
          className="flex gap-4 relative"
          initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: idx * 0.15 }}
        >
          <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center flex-shrink-0 relative z-10 bg-white">
            <span className="text-sm font-medium text-gray-600">{phase.step}</span>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">{phase.title}</h4>
            <p className="text-caption text-gray-500">{phase.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

type WorkflowLabels = {
  clientBrief: string; yourRequirements: string; weBuildIt: string; yourProduct: string;
  phases: { discovery: string; design: string; develop: string; deploy: string };
}

function ProcessWorkflowVisual({ inView, prefersReducedMotion, labels }: { inView: boolean; prefersReducedMotion: boolean; labels: WorkflowLabels }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="select-none w-full max-w-[440px] mx-auto py-4"
      aria-hidden="true"
    >
      {/* Three panels */}
      <div className="flex items-stretch gap-0">

        {/* Panel 1: Client Brief */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
        >
          {/* Doc icon */}
          <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{labels.clientBrief}</p>
          {/* Text lines */}
          <div className="space-y-2">
            <div className="h-1.5 bg-gray-100 rounded-full w-full" />
            <div className="h-1.5 bg-gray-100 rounded-full w-4/5" />
            <div className="h-1.5 bg-gray-100 rounded-full w-full" />
            <div className="h-1.5 bg-gray-100 rounded-full w-3/5" />
          </div>
          {/* Requirement items */}
          <div className="space-y-2 pt-1">
            {['E-commerce platform', 'Mobile-first', 'API integrations'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded border border-gray-300 flex-shrink-0" />
                <span className="text-[10px] text-gray-500 leading-none">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Arrow 1 */}
        <div className="flex flex-col items-center justify-center px-2 gap-1 flex-shrink-0">
          <div className="relative w-8 flex items-center">
            <div className="w-full h-px bg-gray-300" />
            <svg className="absolute right-0 w-2 h-3 text-gray-400" viewBox="0 0 6 10" fill="currentColor">
              <path d="M0 0l6 5-6 5V0z" />
            </svg>
            {!prefersReducedMotion && (
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-gray-900"
                style={{ top: '50%', y: '-50%' }}
                animate={inView ? { x: [0, 26, 0] } : {}}
                transition={{ delay: 0.8, duration: 1.4, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
              />
            )}
          </div>
        </div>

        {/* Panel 2: PAKSOFT builds */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 bg-gray-900 rounded-lg p-4 flex flex-col items-center justify-center gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
        >
          <div className="text-center">
            <p className="text-xs font-bold text-white tracking-widest">PAKSOFT</p>
            <p className="text-[9px] text-white/40 mt-0.5 tracking-wide">expertise</p>
          </div>
          {/* Processing animation */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-white/60"
                animate={!prefersReducedMotion && inView ? { opacity: [0.3, 1, 0.3], y: [0, -3, 0] } : {}}
                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
          {/* Phase labels */}
          <div className="space-y-1.5 w-full">
            {[labels.phases.discovery, labels.phases.design, labels.phases.develop, labels.phases.deploy].map((p, i) => (
              <div key={p} className="flex items-center gap-2">
                <motion.div
                  className="w-1 h-1 rounded-full bg-white/40 flex-shrink-0"
                  animate={!prefersReducedMotion && inView ? { opacity: [0.3, 1, 0.3] } : {}}
                  transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                />
                <span className="text-[9px] text-white/50">{p}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Arrow 2 */}
        <div className="flex flex-col items-center justify-center px-2 gap-1 flex-shrink-0">
          <div className="relative w-8 flex items-center">
            <div className="w-full h-px bg-gray-300" />
            <svg className="absolute right-0 w-2 h-3 text-gray-400" viewBox="0 0 6 10" fill="currentColor">
              <path d="M0 0l6 5-6 5V0z" />
            </svg>
            {!prefersReducedMotion && (
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-gray-900"
                style={{ top: '50%', y: '-50%' }}
                animate={inView ? { x: [0, 26, 0] } : {}}
                transition={{ delay: 1.6, duration: 1.4, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
              />
            )}
          </div>
        </div>

        {/* Panel 3: Live product */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
        >
          {/* Browser chrome */}
          <div className="bg-gray-50 border-b border-gray-100 px-3 py-2 flex items-center gap-1.5">
            {['#ef4444', '#f59e0b', '#22c55e'].map((c) => (
              <span key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
            ))}
            <div className="flex-1 mx-1.5 h-3 bg-gray-200 rounded-sm" />
          </div>
          {/* Mini website */}
          <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-900 rounded-sm" />
            <div className="h-10 bg-gradient-to-r from-gray-100 to-gray-50 rounded" />
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-8 bg-gray-100 rounded" />
              <div className="h-8 bg-gray-100 rounded" />
            </div>
          </div>
          {/* Live badge */}
          <div className="px-3 pb-3 flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-green-500"
              animate={!prefersReducedMotion ? { opacity: [1, 0.3, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] font-semibold text-green-600">Live</span>
          </div>
        </motion.div>

      </div>

      {/* Labels row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.7 }}
        className="flex items-center mt-3 text-center"
      >
        <span className="flex-1 text-[10px] text-gray-400">{labels.yourRequirements}</span>
        <span className="w-12 flex-shrink-0" />
        <span className="flex-1 text-[10px] text-gray-400">{labels.weBuildIt}</span>
        <span className="w-12 flex-shrink-0" />
        <span className="flex-1 text-[10px] text-gray-400">{labels.yourProduct}</span>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectDetailSection() {
  const { dir, isLoading } = useTranslations()
  const t = useSectionTranslations('projectDetail')
  const tCommon = useSectionTranslations('common')
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: false, margin: '-200px' })

  if (isLoading) {
    return (
      <section className="section bg-white relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{tCommon('loading')}</p>
        </div>
      </section>
    )
  }

  const features = [
    { icon: CodeBracketIcon, title: t('modernTechnology.title'), description: t('modernTechnology.description'), details: t('modernTechnology.details') },
    { icon: ClockIcon, title: t('efficientDelivery.title'), description: t('efficientDelivery.description'), details: t('efficientDelivery.details') },
    { icon: ShieldCheckIcon, title: t('qualityAssurance.title'), description: t('qualityAssurance.description'), details: t('qualityAssurance.details') },
    { icon: CogIcon, title: t('ongoingSupport.title'), description: t('ongoingSupport.description'), details: t('ongoingSupport.details') }
  ]

  const statsRaw = t('stats')
  const stats: { value: string; label: string }[] = Array.isArray(statsRaw) ? statsRaw as { value: string; label: string }[] : [
    { value: '150+', label: 'Projects Completed' },
    { value: '50+',  label: 'Satisfied Clients'  },
    { value: '98%',  label: 'Success Rate'        },
    { value: '24/7', label: 'Support Available'   },
  ]

  const processStepsRaw = t('processSteps')
  const processSteps: ProcessStep[] = Array.isArray(processStepsRaw) ? processStepsRaw as ProcessStep[] : [
    { step: '01', title: 'Discovery & Planning',  desc: 'Understanding requirements and defining project scope' },
    { step: '02', title: 'Design & Prototyping',  desc: 'Creating user-centered designs and interactive prototypes' },
    { step: '03', title: 'Development & Testing', desc: 'Building robust solutions with comprehensive testing' },
    { step: '04', title: 'Deployment & Support',  desc: 'Launching your project with ongoing maintenance' },
  ]

  const wvRaw = t('workflowVisual') as unknown as Record<string, unknown>
  const workflowLabels: WorkflowLabels = wvRaw && typeof wvRaw === 'object' ? {
    clientBrief:      (wvRaw.clientBrief as string)      || 'Client Brief',
    yourRequirements: (wvRaw.yourRequirements as string) || 'Your requirements',
    weBuildIt:        (wvRaw.weBuildIt as string)        || 'We build it',
    yourProduct:      (wvRaw.yourProduct as string)      || 'Your product',
    phases: {
      discovery: ((wvRaw.phases as Record<string,string>)?.discovery) || 'Discovery',
      design:    ((wvRaw.phases as Record<string,string>)?.design)    || 'Design',
      develop:   ((wvRaw.phases as Record<string,string>)?.develop)   || 'Develop',
      deploy:    ((wvRaw.phases as Record<string,string>)?.deploy)    || 'Deploy',
    },
  } : { clientBrief: 'Client Brief', yourRequirements: 'Your requirements', weBuildIt: 'We build it', yourProduct: 'Your product', phases: { discovery: 'Discovery', design: 'Design', develop: 'Develop', deploy: 'Deploy' } }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : smoothSpring,
    },
  }

  // Decide whether infinite orbital animations should play
  const shouldAnimate = !prefersReducedMotion && sectionInView

  return (
    <section ref={sectionRef} className="section gradient-bg-subtle relative overflow-hidden" dir={dir}>
      <div className={`absolute bottom-20 w-32 h-32 opacity-[0.02] ${dir === 'rtl' ? 'right-16' : 'left-16'}`}>
        <div className="w-full h-full border border-gray-900" style={{ clipPath: 'circle(45% at 30% 70%)' }} />
      </div>

      <div className="container mx-auto">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} className="mb-16" />

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} variants={itemVariants} className="glass hover:glass-strong transition-all duration-300 rounded-lg p-6 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <h3 className="text-title text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-body text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {Array.isArray(feature.details) ? (
                    feature.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        <span className="text-caption text-gray-500">{detail}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="text-caption text-gray-500">{feature.details}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats Section with CountUp */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-gray-200"
        >
          {stats.map((stat) => (
            <CountUpStatItem key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </motion.div>

        {/* Process Overview */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={dir === 'rtl' ? 'order-2' : 'order-1'}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-gray-900" />
                <span className="text-overline">{t('processOverview.eyebrow')}</span>
              </div>
              <h3 className="text-headline text-gray-900 mb-6">{t('processOverview.title')}</h3>
              <p className="text-body text-gray-600 mb-8 leading-relaxed">{t('processOverview.description')}</p>
              <ProcessStepsWithLine dir={dir} steps={processSteps} />
            </div>

            {/* Right Column – Process workflow visual */}
            <div className={`relative ${dir === 'rtl' ? 'order-1' : 'order-2'}`}>
              <ProcessWorkflowVisual inView={sectionInView} prefersReducedMotion={!!prefersReducedMotion} labels={workflowLabels} />
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">{t('processOverview.readyToStart')}</h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">{t('processOverview.readyDescription')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              rightIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d={dir === 'rtl' ? "M11 17l-5-5m0 0l5-5m-5 5h12" : "M13 7l5 5m0 0l-5 5m5-5H6"} />
                </svg>
              }
            >
              {t('processOverview.getStarted')}
            </Button>
            <Button
              href="/projects"
              variant="secondary"
              size="lg"
              leftIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
            >
              {t('processOverview.viewPortfolio')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
