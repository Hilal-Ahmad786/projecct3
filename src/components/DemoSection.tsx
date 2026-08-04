// src/components/DemoSection.tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'
import Button from '@/components/Button'
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'
import { smoothSpring } from '@/lib/animations'

export default function DemoSection() {
  const { dir, isLoading } = useTranslations()
  const t = useSectionTranslations('demo')
  const prefersReducedMotion = useReducedMotion()

  if (isLoading) {
    return (
      <section className="section bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading demo projects...</p>
        </div>
      </section>
    )
  }

  const getDemoItems = () => {
    try {
      const projectsData = t('projects');
      if (Array.isArray(projectsData)) return projectsData;
      if (projectsData && typeof projectsData === 'object') return Object.values(projectsData);
    } catch (error) {
      console.error('Error loading demo projects:', error);
    }
    return [
      { id: 'ecommerce', title: 'E-Commerce Platform', image: '/images/Demo/ecommerce-platform.png', result: '300% sales increase', description: 'Modern e-commerce solution with integrated payment processing and inventory management.', tech: ['Next.js', 'Shopify', 'Payment Gateway'] },
      { id: 'automation', title: 'Business Automation', image: '/images/Demo/business-automation.png', description: 'Automated data collection and processing system that reduced manual work by 80%.', result: '80% time savings', tech: ['Python', 'API Integration', 'Data Processing'] },
      { id: 'marketing', title: 'Digital Marketing Campaign', image: '/images/Demo/digital-marketing.png', description: 'Comprehensive SEO and advertising strategy that significantly improved online presence.', result: 'CTR +45%, CPC -20%', tech: ['SEO', 'Google Ads', 'Analytics'] },
    ];
  };

  const demoItems = getDemoItems();
  const totalItems = demoItems.length;
  const midIndex = Math.floor(totalItems / 2);

  // Center-outward stagger delay calculation
  const getDelay = (index: number) => {
    if (prefersReducedMotion) return 0;
    return Math.abs(index - midIndex) * 0.12;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15 },
    },
  }

  return (
    <section className="section bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {demoItems.map((item, index) => (
            <motion.div
              key={item.id || `demo-item-${index}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 24,
                  
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  
                  transition: prefersReducedMotion
                    ? { duration: 0 }
                    : { ...smoothSpring, delay: getDelay(index) },
                },
              }}
              whileHover={prefersReducedMotion ? {} : {
                y: -4,
                scale: 1.02,
                boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {item.result && <p className="text-sm opacity-90">{item.result}</p>}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-body text-gray-700 mb-4">{item.description}</p>
                  <div>
                    <div className="text-caption text-gray-500 uppercase tracking-wide mb-2">{t('technology')}</div>
                    <div className={`flex flex-wrap gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      {item.tech?.map((tech: string) => (
                        <span key={tech} className="px-2 py-1 bg-white border border-gray-200 rounded-sm text-xs text-gray-600">{tech}</span>
                      )) || []}
                    </div>
                  </div>
                </div>

                <Button
                  href={item.id ? `/projects/${item.id}` : '/projects'}
                  variant="ghost"
                  size="sm"
                  rightIcon={
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d={dir === 'rtl' ? "M11 17l-5-5m0 0l5-5m-5 5h12" : "M13 7l5 5m0 0l-5 5m5-5H6"} />
                    </svg>
                  }
                  className={`w-full mt-6 ${dir === 'rtl' ? 'flex-row-reverse justify-between' : 'justify-between'}`}
                >
                  {t('viewCaseStudy')}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">{t('likeTheseResults')}</h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">{t('likeTheseDescription')}</p>
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
              {t('startYourProject')}
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
              {t('viewAllProjects')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
