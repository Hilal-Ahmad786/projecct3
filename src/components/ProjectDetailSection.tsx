// src/components/ProjectDetailSection.tsx
'use client'
// Required imports for the component
import { motion } from 'framer-motion'
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

export default function ProjectDetailSection() {
  const { dir, isLoading } = useTranslations()
  const t = useSectionTranslations('projectDetail')
  const tCommon = useSectionTranslations('common')

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
    {
      icon: CodeBracketIcon,
      title: t('modernTechnology.title'),
      description: t('modernTechnology.description'),
      details: t('modernTechnology.details')
    },
    {
      icon: ClockIcon,
      title: t('efficientDelivery.title'),
      description: t('efficientDelivery.description'),
      details: t('efficientDelivery.details')
    },
    {
      icon: ShieldCheckIcon,
      title: t('qualityAssurance.title'),
      description: t('qualityAssurance.description'),
      details: t('qualityAssurance.details')
    },
    {
      icon: CogIcon,
      title: t('ongoingSupport.title'),
      description: t('ongoingSupport.description'),
      details: t('ongoingSupport.details')
    }
  ]

  const stats = [
    { value: '150+', label: 'Projects Completed' },
    { value: '50+', label: 'Satisfied Clients' },
    { value: '98%', label: 'Success Rate' },
    { value: '24/7', label: 'Support Available' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  }

  return (
    <section className="section bg-white relative overflow-hidden" dir={dir}>
      {/* Subtle geometric background */}
      <div className={`absolute bottom-20 w-32 h-32 opacity-[0.02] ${dir === 'rtl' ? 'right-16' : 'left-16'}`}>
        <div 
          className="w-full h-full border border-gray-900"
          style={{ clipPath: 'circle(45% at 30% 70%)' }}
        />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-16"
        />

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="card group"
              >
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <h3 className="text-title text-gray-900">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-body text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Details */}
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

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-gray-200"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-caption text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Process Overview */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className={dir === 'rtl' ? 'order-2' : 'order-1'}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-gray-900" />
                <span className="text-overline">{t('processOverview.eyebrow')}</span>
              </div>
              
              <h3 className="text-headline text-gray-900 mb-6">
                {t('processOverview.title')}
              </h3>
              
              <p className="text-body text-gray-600 mb-8 leading-relaxed">
                {t('processOverview.description')}
              </p>

              <div className="space-y-6">
                {[
                  { step: '01', title: 'Discovery & Planning', desc: 'Understanding requirements and defining project scope' },
                  { step: '02', title: 'Design & Prototyping', desc: 'Creating user-centered designs and interactive prototypes' },
                  { step: '03', title: 'Development & Testing', desc: 'Building robust solutions with comprehensive testing' },
                  { step: '04', title: 'Deployment & Support', desc: 'Launching your project with ongoing maintenance' }
                ].map((phase) => (
                  <div key={phase.step} className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-gray-600">{phase.step}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{phase.title}</h4>
                      <p className="text-caption text-gray-500">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual */}
{/* Right Column – Visual (crescent-forward, meaningful) */}
<div className={`relative ${dir === 'rtl' ? 'order-1' : 'order-2'}`}>
  <motion.div
    initial={{ opacity: 0, x: 24 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    className="relative mx-auto aspect-square max-w-[400px] select-none transform-gpu"
    aria-hidden="true"
  >
    {/* Minimal Grid Background - Swiss design inspired */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />
    </div>

    {/* Subtle Background Crescent - Material Design surface */}
    <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full z-5 pointer-events-none">
      <defs>
        <linearGradient id="crescentGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e5e7eb" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d1d5db" stopOpacity="0.4" />
        </linearGradient>
        
        <mask id="crescentMask">
          <rect width="400" height="400" fill="black" />
          <circle cx="280" cy="160" r="80" fill="white" />
          <circle cx="250" cy="175" r="65" fill="black" />
        </mask>
      </defs>

      <g mask="url(#crescentMask)">
        <circle cx="280" cy="160" r="80" fill="url(#crescentGrad)" />
      </g>
    </svg>

    {/* Central Hub - Material Design elevated surface */}
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <motion.div 
        className="relative w-[140px] h-[140px] rounded-full border border-gray-200/60 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        {/* Inner core - Swiss minimal approach */}
        <div className="absolute inset-6 rounded-full bg-gray-900 shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)] flex items-center justify-center">
          <span className="text-white font-medium text-sm tracking-wide">PAKSOFT</span>
        </div>
        
        {/* Minimal status indicators */}
        <motion.div
          className="absolute w-1.5 h-1.5 bg-gray-600 rounded-full"
          style={{ top: -3, left: '50%', marginLeft: -3 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-1 h-1 bg-gray-500 rounded-full"
          style={{ right: -2, top: '50%', marginTop: -2 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </div>

    {/* Service Constellation - Minimal orbital system */}
    <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <defs>
        <linearGradient id="webGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#374151" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#6b7280" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="mobileGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#374151" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#6b7280" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="ecomGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#374151" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#6b7280" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Minimal orbit rings */}
      <motion.circle
        cx="200" cy="200" r="100"
        fill="none" stroke="#9ca3af" strokeWidth="0.5" strokeOpacity="0.15"
        strokeDasharray="6 12"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -40 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <motion.circle
        cx="200" cy="200" r="125"
        fill="none" stroke="#9ca3af" strokeWidth="0.5" strokeOpacity="0.12"
        strokeDasharray="4 10"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: 35 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      <motion.circle
        cx="200" cy="200" r="150"
        fill="none" stroke="#9ca3af" strokeWidth="0.5" strokeOpacity="0.08"
        strokeDasharray="8 16"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -50 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Minimal connection lines */}
      <motion.path
        d="M200,200 L320,120 M200,200 L300,300 M200,200 L80,140 M200,200 L100,280"
        stroke="#d1d5db" strokeWidth="0.5" strokeOpacity="0.1"
        strokeDasharray="2 8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, ease: 'easeInOut', delay: 0.5 }}
      />
    </svg>

    {/* Service Nodes with colored dots - matching screenshot */}
    {/* Web Development - Blue */}
    <motion.div
      className="absolute z-40 w-12 h-12 rounded-full bg-white border border-gray-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center group"
      style={{ bottom: 100, right: 40 }}
      whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      animate={{ y: [-2, 2, -2] }}
      transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
    >
      <div className="w-3 h-3 bg-blue-500 rounded-full" />
    </motion.div>

    {/* AI Solutions - Green */}
    <motion.div
      className="absolute z-40 w-12 h-12 rounded-full bg-white border border-gray-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center group"
      style={{ top: 80, right: 60 }}
      whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      animate={{ 
        rotate: 360,
        y: [1.5, -1.5, 1.5]
      }}
      transition={{ 
        rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
        y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }
      }}
    >
      <div className="w-3 h-3 bg-emerald-500 rounded-full" />
    </motion.div>

    {/* Design - Purple */}
    <motion.div
      className="absolute z-40 w-12 h-12 rounded-full bg-white border border-gray-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center group"
      style={{ top: 50, left: 100 }}
      whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      animate={{ x: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    >
      <div className="w-3 h-3 bg-purple-500 rounded-full" />
    </motion.div>

    {/* Infrastructure - Gray/Blue */}
    <motion.div
      className="absolute z-40 w-12 h-12 rounded-full bg-white border border-gray-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center group"
      style={{ top: 120, left: 50 }}
      whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      animate={{ scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    >
      <div className="w-3 h-3 bg-slate-500 rounded-full" />
    </motion.div>

    {/* Automation - Orange */}
    <motion.div
      className="absolute z-40 w-12 h-12 rounded-full bg-white border border-gray-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center group"
      style={{ bottom: 80, left: 30 }}
      whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      animate={{ rotate: [0, 3, -3, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
    >
      <div className="w-3 h-3 bg-orange-500 rounded-full" />
    </motion.div>

    {/* Floating Project Cards - Material Design elevated surfaces */}
    <motion.div
      animate={{ y: [-4, 4, -4], rotate: [0, 0.5, -0.5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute z-50 w-[100px] h-[75px] rounded-lg bg-white border border-gray-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-3 will-change-transform ${
        dir === 'rtl' ? 'left-[58%]' : 'right-[58%]'
      } top-[65px]`}
    >
      {/* Minimal status indicators */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-800" />
        </div>
      </div>
      
      {/* Progress indicators */}
      <div className="space-y-2 mb-2">
        <div className="h-[2px] bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gray-700 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '68%' }}
            transition={{ duration: 2, ease: 'easeOut', delay: 1 }}
          />
        </div>
        <div className="h-[2px] bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gray-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '42%' }}
            transition={{ duration: 2, ease: 'easeOut', delay: 1.5 }}
          />
        </div>
      </div>
      
      {/* Minimal line chart */}
      <svg viewBox="0 0 100 16" className="w-full h-[16px]">
        <polyline
          points="0,12 16,8 32,10 48,5 64,7 80,4 96,6"
          fill="none"
          stroke="#6b7280"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>

    <motion.div
      animate={{ y: [4, -4, 4], x: [0, 1, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      className={`absolute z-40 w-[85px] h-[85px] rounded-lg border border-gray-200/80 p-3 shadow-[0_3px_10px_rgba(0,0,0,0.04)] will-change-transform ${
        dir === 'rtl' ? 'right-[62%]' : 'left-[62%]'
      } bottom-[55px]`}
      style={{ background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)' }}
    >
      {/* Minimal profile */}
      <div className="relative mb-3">
        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-600 text-xs font-medium">P</span>
        </div>
        <span className="absolute -right-0.5 -bottom-0.5 w-2 h-2 bg-gray-600 rounded-full ring-2 ring-white" />
      </div>
      
      {/* Minimal metrics */}
      <div className="space-y-2 mb-3">
        <div className="h-[1px] bg-gray-300 rounded w-4/5" />
        <div className="h-[1px] bg-gray-300 rounded w-3/5" />
        <div className="h-[1px] bg-gray-300 rounded w-2/3" />
      </div>
      
      {/* Signal strength */}
      <div className="flex items-end gap-1">
        <div className="w-0.5 h-2 bg-gray-400 rounded-sm" />
        <div className="w-0.5 h-3 bg-gray-500 rounded-sm" />
        <div className="w-0.5 h-4 bg-gray-600 rounded-sm" />
        <div className="w-0.5 h-5 bg-gray-700 rounded-sm" />
      </div>
    </motion.div>

    {/* Minimal ambient elements */}
    <div className="absolute top-16 left-20 w-[2px] h-[2px] bg-gray-400/40 rounded-full z-30" />
    <div className="absolute bottom-20 right-20 w-[3px] h-[3px] bg-gray-400/30 rounded-full z-30" />
    <div className="absolute top-1/3 right-12 w-[1px] h-[1px] bg-gray-400/50 rounded-full z-30" />

    {/* System status - Material Design chip */}
    <motion.div
      className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/60"
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="w-1.5 h-1.5 bg-gray-700 rounded-full" />
    </motion.div>

    {/* Interactive hover effect - Swiss minimal approach */}
    <motion.div
      className="absolute inset-0 pointer-events-none rounded-2xl"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 0.01 }}
      transition={{ duration: 0.3 }}
      style={{ background: 'radial-gradient(circle at center, rgba(0,0,0,0.05), transparent 70%)' }}
    />
  </motion.div>
</div>





          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">
            {t('processOverview.readyToStart')}
          </h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">
            {t('processOverview.readyDescription')}
          </p>
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