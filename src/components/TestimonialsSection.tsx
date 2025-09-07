// src/components/TestimonialsSection.tsx
'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { dir, isLoading } = useTranslations()
  const t = useSectionTranslations('testimonials')
  const tStats = useSectionTranslations('stats')

  // Show loading state if translations are not ready
  if (isLoading) {
    return (
      <section className="section bg-white relative overflow-hidden">
        <div className="container mx-auto text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading testimonials...</p>
        </div>
      </section>
    )
  }

  // Safely get testimonials from translations
  const getTestimonials = () => {
    try {
      const testimonialsList = t('list');
      
      // If it's already an array, use it
      if (Array.isArray(testimonialsList)) {
        return testimonialsList;
      }
      
      // If it's a string (JSON), parse it
      if (typeof testimonialsList === 'string') {
        const parsed = JSON.parse(testimonialsList);
        return Array.isArray(parsed) ? parsed : [];
      }
      
      // If it's an object, convert to array
      if (testimonialsList && typeof testimonialsList === 'object') {
        return Object.values(testimonialsList);
      }
    } catch (error) {
      console.error('Error parsing testimonials:', error);
    }

    // Fallback testimonials
    return [
      { 
        author: 'Sarah Johnson',
        role: 'CEO',
        company: 'TechStart Solutions',
        text: 'PakTechnology delivered exactly what we needed. Their attention to detail and professional approach made our project a complete success.',
        rating: 5
      },
      { 
        author: 'Lisa Thompson',
        role: 'Founder',
        company: 'EcoSmart',
        text: 'From concept to launch, they guided us through every step. Our e-commerce platform exceeded all expectations.',
        rating: 5
      },
      { 
        author: 'James Park',
        role: 'Operations Manager',
        company: 'LogiTech Pro',
        text: 'The AI solutions they implemented have transformed how we handle customer inquiries. Impressive technical expertise.',
        rating: 5
      }
    ];
  };

  const testimonials = getTestimonials();

  const scrollBy = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 320
      const scrollDirection = dir === 'rtl' ? (direction === 'left' ? 1 : -1) : (direction === 'left' ? -1 : 1)
      containerRef.current.scrollBy({
        left: scrollAmount * scrollDirection,
        behavior: 'smooth'
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const stats = [
    { value: tStats('clientSatisfaction95'), label: t('clientSatisfaction') },
    { value: tStats('projects150'), label: t('projectsCompleted') },
    { value: tStats('clients50'), label: t('happyClients') },
    { value: tStats('responseTime24h'), label: t('averageResponse') }
  ]

  return (
    <section className="section bg-white relative overflow-hidden" dir={dir}>
      {/* Subtle geometric background */}
      <div className={`absolute top-16 w-16 h-16 opacity-[0.02] ${dir === 'rtl' ? 'left-20' : 'right-20'}`}>
        <div 
          className="w-full h-full border border-gray-900"
          style={{ clipPath: 'circle(40% at 70% 30%)' }}
        />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-16"
        />

        <div className="relative">
          {/* Navigation Buttons */}
          <div className={`flex justify-end gap-2 mb-8 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => scrollBy('left')}
              className="w-10 h-10 bg-white border border-gray-200 rounded-sm flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => scrollBy('right')}
              className="w-10 h-10 bg-white border border-gray-200 rounded-sm flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Testimonials Container */}
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
                  className="flex-shrink-0 w-80 card"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {/* Quote Mark */}
                  <div className={`flex items-center justify-between mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 bg-gray-100 rounded-sm flex items-center justify-center">
                      <svg className="h-4 w-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d={dir === 'rtl' 
                          ? "M10 21v-7.391c0-5.704-3.731-9.57-8.983-10.609l-.995 2.151c2.432.917 3.995 3.638 3.995 5.849h-4v10h10zm14.017 0v-7.391c0-5.704-3.748-9.57-9-10.609l-.996 2.151c2.433.917 3.996 3.638 3.996 5.849h-4v10h10z"
                          : "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"
                        }/>
                      </svg>
                    </div>
                    
                    {/* Rating */}
                    <div className={`flex gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-body text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Author Info */}
                  <div className={`flex items-center gap-4 pt-6 border-t border-gray-100 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 bg-gray-100 rounded-sm flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-600">
                        {testimonial.author?.charAt(0) || 'A'}
                      </span>
                    </div>
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
              <p className="text-gray-500">No testimonials available at the moment.</p>
            </div>
          )}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200"
        >
          {stats.map((stat, index) => (
            <div key={stat.label || index} className="text-center">
              <div className="text-2xl font-light text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-caption text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}