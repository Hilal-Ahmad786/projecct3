// src/components/TestimonialsSection.tsx
'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'
import BackgroundBlobs from '@/components/BackgroundBlobs'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'
import { smoothSpring, snappySpring } from '@/lib/animations'

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { dir, isLoading } = useTranslations()
  const t = useSectionTranslations('testimonials')
  const tStats = useSectionTranslations('stats')
  const prefersReducedMotion = useReducedMotion()

  if (isLoading) {
    return (
      <section className="section bg-white relative overflow-hidden">
        <div className="container mx-auto text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading') || 'Loading testimonials...'}</p>
        </div>
      </section>
    )
  }

  const getTestimonials = () => {
    try {
      const testimonialsList = t('list');
      if (Array.isArray(testimonialsList)) return testimonialsList;
      if (typeof testimonialsList === 'string') {
        const parsed = JSON.parse(testimonialsList);
        return Array.isArray(parsed) ? parsed : [];
      }
      if (testimonialsList && typeof testimonialsList === 'object') return Object.values(testimonialsList);
    } catch (error) {
      console.error('Error parsing testimonials:', error);
    }
    return [
      { author: 'Sarah Johnson', role: 'CEO', company: 'TechStart Solutions', text: 'PakTechnology delivered exactly what we needed. Their attention to detail and professional approach made our project a complete success.', rating: 5 },
      { author: 'Lisa Thompson', role: 'Founder', company: 'EcoSmart', text: 'From concept to launch, they guided us through every step. Our e-commerce platform exceeded all expectations.', rating: 5 },
      { author: 'James Park', role: 'Operations Manager', company: 'LogiTech Pro', text: 'The AI solutions they implemented have transformed how we handle customer inquiries. Impressive technical expertise.', rating: 5 }
    ];
  };

  const testimonials = getTestimonials();

  const scrollBy = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 320
      const scrollDirection = dir === 'rtl' ? (direction === 'left' ? 1 : -1) : (direction === 'left' ? -1 : 1)
      containerRef.current.scrollBy({ left: scrollAmount * scrollDirection, behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
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

  const stats = [
    { value: tStats('clientSatisfaction95'), label: t('clientSatisfaction') },
    { value: tStats('projects150'), label: t('projectsCompleted') },
    { value: tStats('clients50'), label: t('happyClients') },
    { value: tStats('responseTime24h'), label: t('averageResponse') }
  ]

  return (
    <section className="section gradient-bg-emerald relative overflow-hidden" dir={dir}>
      <BackgroundBlobs className="opacity-30" />

      <div className={`absolute top-16 w-16 h-16 opacity-[0.02] ${dir === 'rtl' ? 'left-20' : 'right-20'}`}>
        <div className="w-full h-full border border-gray-900" style={{ clipPath: 'circle(40% at 70% 30%)' }} />
      </div>

      <div className="container mx-auto">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} className="mb-16" />

        <div className="relative">
          <div className={`flex justify-end gap-2 mb-8 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <button onClick={() => scrollBy('left')} className="w-10 h-10 bg-white border border-gray-200 rounded-sm flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-colors" aria-label={t('previous') || 'Previous testimonials'}>
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button onClick={() => scrollBy('right')} className="w-10 h-10 bg-white border border-gray-200 rounded-sm flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-colors" aria-label={t('next') || 'Next testimonials'}>
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {testimonials.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              ref={containerRef}
              className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={prefersReducedMotion ? {} : {
                    rotateX: -2,
                    rotateY: 2,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                    transition: { duration: 0.3 },
                  }}
                  className="flex-shrink-0 w-80 glass hover:glass-strong transition-all duration-300 rounded-lg p-6"
                  style={{ scrollSnapAlign: 'start', perspective: 800, transformStyle: 'preserve-3d' }}
                >
                  {/* Quote Mark + Rating */}
                  <div className={`flex items-center justify-between mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <motion.div
                      className="w-8 h-8 bg-gray-100 rounded-sm flex items-center justify-center"
                      initial={prefersReducedMotion ? {} : { scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={prefersReducedMotion ? { duration: 0 } : { ...snappySpring, delay: index * 0.05 }}
                    >
                      <svg className="h-4 w-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d={dir === 'rtl'
                          ? "M10 21v-7.391c0-5.704-3.731-9.57-8.983-10.609l-.995 2.151c2.432.917 3.995 3.638 3.995 5.849h-4v10h10zm14.017 0v-7.391c0-5.704-3.748-9.57-9-10.609l-.996 2.151c2.433.917 3.996 3.638 3.996 5.849h-4v10h10z"
                          : "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"
                        } />
                      </svg>
                    </motion.div>

                    {/* Star ratings with sequential fill */}
                    <div className={`flex gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <motion.svg
                          key={i}
                          className="h-4 w-4 text-amber-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={prefersReducedMotion ? { duration: 0 } : { ...snappySpring, delay: index * 0.05 + i * 0.1 }}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </motion.svg>
                      ))}
                    </div>
                  </div>

                  <p className="text-body text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>

                  {/* Author Info with avatar zoom */}
                  <div className={`flex items-center gap-4 pt-6 border-t border-gray-100 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <motion.div
                      className="w-12 h-12 bg-gray-100 rounded-sm flex items-center justify-center overflow-hidden"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                      transition={snappySpring}
                    >
                      <span className="text-lg font-medium text-gray-600">
                        {testimonial.author?.charAt(0) || 'A'}
                      </span>
                    </motion.div>
                    <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                      <p className="font-medium text-gray-900">{testimonial.author || 'Anonymous'}</p>
                      <p className="text-caption text-gray-500">{testimonial.role || 'Client'}</p>
                      <p className="text-caption text-gray-400">{testimonial.company || ''}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">{t('noTestimonials') || 'No testimonials available at the moment.'}</p>
            </div>
          )}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200"
        >
          {stats.map((stat, index) => (
            <div key={stat.label || index} className="text-center">
              <div className="text-2xl font-light text-gray-900 mb-2">{stat.value}</div>
              <div className="text-caption text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
