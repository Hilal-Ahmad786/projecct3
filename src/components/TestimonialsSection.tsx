// src/components/TestimonialsSection.tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'
import BackgroundBlobs from '@/components/BackgroundBlobs'
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'
import { smoothSpring } from '@/lib/animations'

export default function TestimonialsSection() {
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
      { author: 'Sarah Johnson', role: 'CEO', company: 'TechStart Solutions', text: 'PakTechnology delivered exactly what we needed. Their attention to detail, proactive communication, and deeply professional approach made our project a complete success from day one.', rating: 5 },
      { author: 'Lisa Thompson', role: 'Founder', company: 'EcoSmart', text: 'From concept to launch, they guided us through every step. Our e-commerce platform exceeded all expectations. Fantastic UI design.', rating: 5 },
      { author: 'James Park', role: 'Operations Manager', company: 'LogiTech Pro', text: 'The AI solutions they implemented have transformed how we handle customer inquiries. Impressive technical expertise and fast rollout.', rating: 5 },
      { author: 'Ahmed Hassan', role: 'CTO', company: 'InnovateDX', text: 'Stunning workflow automation. Our internal processes are 50% more efficient now thanks to their customized Python enterprise integration solutions.', rating: 5 },
    ];
  };

  const testimonials = getTestimonials() as { author: string, role: string, company: string, text: string, rating: number }[];

  const stats = [
    { value: tStats('clientSatisfaction95'), label: t('clientSatisfaction') },
    { value: tStats('projects150'), label: t('projectsCompleted') },
    { value: tStats('clients50'), label: t('happyClients') },
    { value: tStats('responseTime24h'), label: t('averageResponse') }
  ]

  return (
    <section className="section gradient-bg-emerald relative overflow-hidden py-24 lg:py-32" dir={dir}>
      <BackgroundBlobs className="opacity-30" />

      <div className={`absolute top-16 w-16 h-16 opacity-[0.02] ${dir === 'rtl' ? 'left-20' : 'right-20'} pointer-events-none`}>
        <div className="w-full h-full border border-gray-900" style={{ clipPath: 'circle(40% at 70% 30%)' }} />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} className="mb-16 md:mb-24" />

        <div className="relative">
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-min grid-flow-row-dense relative z-10">
              {testimonials.map((item, idx) => {
                // Bento Layout Logic
                let bentoClass = "col-span-1";
                let variant: 'hero' | 'small' | 'wide' = 'small';
                
                if (idx === 0) {
                  // Massive anchor block (Top Left)
                  bentoClass = "md:col-span-2 lg:col-span-2 lg:row-span-2";
                  variant = 'hero';
                } else if (idx === 3) {
                  // Long horizontal span (Bottom Row hook)
                  bentoClass = "md:col-span-2 lg:col-span-3";
                  variant = 'wide';
                } else if (idx > 3) {
                  // Fallback for huge arrays
                  bentoClass = "col-span-1";
                  variant = 'small';
                } else {
                  // idx 1 and 2
                  bentoClass = "col-span-1 lg:row-span-1";
                  variant = 'small';
                }

                return (
                  <motion.div
                    key={idx}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: idx * 0.1 }}
                    className={bentoClass}
                  >
                    <BentoCard item={item} dir={dir} variant={variant} />
                  </motion.div>
                )
              })}
            </div>
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-200"
        >
          {stats.map((stat, index) => (
            <div key={stat.label || index} className="text-center group">
              <div className="text-4xl lg:text-5xl font-light text-gray-900 mb-3 group-hover:scale-110 transition-transform duration-300 origin-bottom tracking-tighter">
                {stat.value}
              </div>
              <div className="text-sm font-semibold tracking-wider uppercase text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function BentoCard({ item, dir, variant }: { item: any, dir: string, variant: 'hero' | 'small' | 'wide' }) {
  const isHero = variant === 'hero';
  const isWide = variant === 'wide';

  return (
    <div className={`glass bg-white/70 backdrop-blur-xl hover:bg-white/95 transition-all duration-500 rounded-3xl p-8 lg:p-10 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] relative overflow-hidden group h-full flex ${
      isWide ? 'flex-col md:flex-row gap-8 lg:gap-12 items-center' : 'flex-col justify-between'
    }`}>
      
      {/* Huge subtle watermark quote for Hero card only */}
      {isHero && (
        <svg className={`absolute w-72 h-72 text-emerald-600/5 -top-16 transition-transform duration-700 pointer-events-none group-hover:scale-110 group-hover:-rotate-6 ${dir === 'rtl' ? '-left-16 transform -scale-x-100' : '-right-16'}`} fill="currentColor" viewBox="0 0 24 24">
           <path d={dir === 'rtl' 
               ? "M10 21v-7.391c0-5.704-3.731-9.57-8.983-10.609l-.995 2.151c2.432.917 3.995 3.638 3.995 5.849h-4v10h10zm14.017 0v-7.391c0-5.704-3.748-9.57-9-10.609l-.996 2.151c2.433.917 3.996 3.638 3.996 5.849h-4v10h10z"
               : "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"
             } />
        </svg>
      )}

      {/* Top / Left section: Quote mark & Stars */}
      <div className={`flex shrink-0 ${isWide ? 'flex-col items-center w-full md:w-56 text-center' : 'justify-between items-start mb-8 w-full'} ${!isWide && dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
        
        {isWide ? (
             <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full flex items-center justify-center border border-emerald-100 shadow-sm relative z-10">
                   <svg className="h-6 w-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                     <path d={dir === 'rtl' ? "M10 21v-7.391c0-5.704-3.731-9.57-8.983-10.609l-.995 2.151c2.432.917 3.995 3.638 3.995 5.849h-4v10h10zm14.017 0v-7.391c0-5.704-3.748-9.57-9-10.609l-.996 2.151c2.433.917 3.996 3.638 3.996 5.849h-4v10h10z" : "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"} />
                   </svg>
                </div>
                <div className={`flex gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-amber-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
             </div>
        ) : (
          <>
            <div className={`bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full flex items-center justify-center border border-emerald-100 shadow-sm relative z-10 ${isHero ? 'w-16 h-16' : 'w-12 h-12'}`}>
               <svg className={`${isHero ? 'h-6 w-6' : 'h-5 w-5'} text-emerald-600`} fill="currentColor" viewBox="0 0 24 24">
                 <path d={dir === 'rtl' ? "M10 21v-7.391c0-5.704-3.731-9.57-8.983-10.609l-.995 2.151c2.432.917 3.995 3.638 3.995 5.849h-4v10h10zm14.017 0v-7.391c0-5.704-3.748-9.57-9-10.609l-.996 2.151c2.433.917 3.996 3.638 3.996 5.849h-4v10h10z" : "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"} />
               </svg>
            </div>
            
            <div className={`flex gap-1 relative z-10 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {[...Array(item.rating || 5)].map((_, i) => (
                <svg key={i} className={`${isHero ? 'h-5 w-5' : 'h-4 w-4'} text-amber-400 drop-shadow-sm`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Center: Text Content */}
      <div className={`flex flex-col flex-grow ${isWide ? 'flex-1' : ''}`}>
        <p className={`text-gray-800 leading-relaxed font-medium relative z-10 flex-grow ${
          isHero ? 'text-2xl lg:text-4xl lg:leading-snug mb-10 tracking-tight' : 
          isWide ? 'text-xl lg:text-2xl mb-8 md:mb-2 text-center md:text-start' : 
          'text-base mb-8'
        }`}>
          "{item.text}"
        </p>

        {/* Bottom / Right: Author Profile */}
        <div className={`flex items-center gap-4 relative z-10 ${isWide ? 'pt-6 mt-4 md:border-t border-gray-200/50 justify-center md:justify-start' : 'pt-6 border-t border-gray-200/50 mt-auto w-full'} ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <div className={`${isHero ? 'w-14 h-14' : 'w-12 h-12'} bg-gray-900 rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}>
             <span className={`${isHero ? 'text-xl' : 'text-lg'} font-bold text-white`}>
               {item.author?.charAt(0) || 'A'}
             </span>
          </div>
          <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
             <p className={`font-bold text-gray-900 ${isHero ? 'text-lg' : 'text-base'}`}>{item.author || 'Anonymous'}</p>
             <div className={`text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1 flex flex-wrap gap-1 ${dir === 'rtl' ? 'justify-end md:justify-end' : 'justify-start'}`}>
               <span>{item.role || 'Client'}</span>
               {item.company && (
                 <>
                   <span className="text-gray-300">•</span>
                   <span className="text-emerald-700">{item.company}</span>
                 </>
               )}
             </div>
          </div>
        </div>
      </div>

    </div>
  )
}
