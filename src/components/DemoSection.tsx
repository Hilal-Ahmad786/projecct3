// src/components/DemoSection.tsx
'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'
import Button from '@/components/Button'
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'

export default function DemoSection() {
  const { dir, isLoading } = useTranslations()
  const t = useSectionTranslations('demo')

  // Show loading state if translations are not ready
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

  // Get demo projects from translations with fallback
  const getDemoItems = () => {
    try {
      const projectsData = t('projects');
      if (Array.isArray(projectsData)) {
        return projectsData;
      }
      // If it's an object, convert to array
      if (projectsData && typeof projectsData === 'object') {
        return Object.values(projectsData);
      }
    } catch (error) {
      console.error('Error loading demo projects:', error);
    }
    
    // Fallback data
    return [
      {
        id: 'ecommerce',
        title: 'E-Commerce Platform',
        image: '/images/Demo/ShopifyBot.png',
        result: '300% sales increase',
        description: 'Modern e-commerce solution with integrated payment processing and inventory management.',
        tech: ['Next.js', 'Shopify', 'Payment Gateway']
      },
      {
        id: 'automation',
        title: 'Business Automation',
        image: '/images/Demo/GoogleAPİ.png',
        description: 'Automated data collection and processing system that reduced manual work by 80%.',
        result: '80% time savings',
        tech: ['Python', 'API Integration', 'Data Processing']
      },
      {
        id: 'marketing',
        title: 'Digital Marketing Campaign',
        image: '/images/Demo/Ankarapert1.png',
        description: 'Comprehensive SEO and advertising strategy that significantly improved online presence.',
        result: 'CTR +45%, CPC -20%',
        tech: ['SEO', 'Google Ads', 'Analytics']
      },
    ];
  };

  const demoItems = getDemoItems();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  }

  return (
    <section className="section bg-gray-50 relative overflow-hidden" dir={dir}>
      {/* Subtle geometric background */}
      <div className={`absolute top-20 w-24 h-24 opacity-[0.02] ${dir === 'rtl' ? 'left-16' : 'right-16'}`}>
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {demoItems.map((item, index) => (
            <motion.div
              key={item.id || index}
              variants={itemVariants}
              className="card group"
            >
              {/* Image */}
              <div className="relative mb-6 overflow-hidden rounded-sm bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-title text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-body text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-sm">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {t('keyResult')}
                  </div>
                  <div className="text-lg font-light text-gray-700">
                    {item.result}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <div className="text-caption text-gray-500 uppercase tracking-wide mb-2">
                    {t('technology')}
                  </div>
                  <div className={`flex flex-wrap gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    {item.tech?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white border border-gray-200 rounded-sm text-xs text-gray-600"
                      >
                        {tech}
                      </span>
                    )) || []}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  href={`/projects/${item.id}`}
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
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">
            {t('likeTheseResults')}
          </h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">
            {t('likeTheseDescription')}
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