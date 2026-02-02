// src/components/ServicesSection.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { smoothSpring, snappySpring } from '@/lib/animations';

import {
  Cog6ToothIcon,
  ChartBarSquareIcon,
  CubeIcon,
  PhotoIcon,
  ChatBubbleBottomCenterTextIcon,
  LinkIcon,
  ComputerDesktopIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  ShoppingCartIcon,
  PencilSquareIcon,
  MegaphoneIcon,
  CloudArrowUpIcon,
  CommandLineIcon,
  CpuChipIcon,
  CircleStackIcon,
  ServerStackIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  CursorArrowRaysIcon,
  ShareIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  PlayIcon,
  BriefcaseIcon,
  CloudIcon,
  GlobeEuropeAfricaIcon,
  SwatchIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function ServicesSection() {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('services.main');
  const tServices = useSectionTranslations('services.list');
  const tCommon = useSectionTranslations('common');
  const prefersReducedMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState('web');

  if (isLoading) {
    return (
      <section className="section bg-white relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{tCommon('loading')}</p>
        </div>
      </section>
    );
  }

  const categories = [
    { key: 'web', label: t('categories.web') },
    { key: 'ai', label: t('categories.ai') },
    { key: 'marketing', label: t('categories.marketing') },
    { key: 'infrastructure', label: t('categories.infrastructure') },
  ];

  const services = [
    // Web & Software
    { title: tServices('webApplications.title'), icon: ComputerDesktopIcon, description: tServices('webApplications.description'), category: 'web', features: tServices('webApplications.features'), slug: 'web-development' },
    { title: tServices('ecommerceSolutions.title'), icon: ShoppingCartIcon, description: tServices('ecommerceSolutions.description'), category: 'web', features: tServices('ecommerceSolutions.features'), slug: 'e-commerce' },
    { title: tServices('apiDevelopment.title'), icon: LinkIcon, description: tServices('apiDevelopment.description'), category: 'web', features: tServices('apiDevelopment.features'), slug: 'api-development' },
    { title: tServices('uiuxDesign.title'), icon: PencilSquareIcon, description: tServices('uiuxDesign.description'), category: 'web', features: tServices('uiuxDesign.features'), slug: 'ui-ux-design' },
    { title: tServices('mobileDevelopment.title'), icon: DevicePhoneMobileIcon, description: tServices('mobileDevelopment.description'), category: 'web', features: tServices('mobileDevelopment.features'), slug: 'mobile-development' },
    { title: tServices('saasDevelopment.title'), icon: CloudIcon, description: tServices('saasDevelopment.description'), category: 'web', features: tServices('saasDevelopment.features'), slug: 'saas-development' },
    { title: tServices('wordpressDevelopment.title'), icon: GlobeEuropeAfricaIcon, description: tServices('wordpressDevelopment.description'), category: 'web', features: tServices('wordpressDevelopment.features'), slug: 'wordpress-development' },
    { title: tServices('graphicDesign.title'), icon: SwatchIcon, description: tServices('graphicDesign.description'), category: 'web', features: tServices('graphicDesign.features'), slug: 'graphic-design' },
    // AI & ML
    { title: tServices('aiIntegration.title'), icon: PhotoIcon, description: tServices('aiIntegration.description'), category: 'ai', features: tServices('aiIntegration.features'), slug: 'ai-solutions' },
    { title: tServices('machineLearning.title'), icon: CubeIcon, description: tServices('machineLearning.description'), category: 'ai', features: tServices('machineLearning.features'), slug: 'machine-learning' },
    { title: tServices('conversationalAI.title'), icon: ChatBubbleBottomCenterTextIcon, description: tServices('conversationalAI.description'), category: 'ai', features: tServices('conversationalAI.features'), slug: 'conversational-ai' },
    { title: tServices('computerVision.title'), icon: EyeIcon, description: tServices('computerVision.description'), category: 'ai', features: tServices('computerVision.features'), slug: 'computer-vision' },
    { title: tServices('llmFinetuning.title'), icon: AdjustmentsHorizontalIcon, description: tServices('llmFinetuning.description'), category: 'ai', features: tServices('llmFinetuning.features'), slug: 'llm-finetuning' },
    { title: tServices('promptEngineering.title'), icon: CommandLineIcon, description: tServices('promptEngineering.description'), category: 'ai', features: tServices('promptEngineering.features'), slug: 'prompt-engineering' },
    { title: tServices('aiAgents.title'), icon: CpuChipIcon, description: tServices('aiAgents.description'), category: 'ai', features: tServices('aiAgents.features'), slug: 'ai-agents' },
    { title: tServices('ragSolutions.title'), icon: CircleStackIcon, description: tServices('ragSolutions.description'), category: 'ai', features: tServices('ragSolutions.features'), slug: 'rag-solutions' },
    // Marketing & Growth
    { title: tServices('seo.title'), icon: MagnifyingGlassIcon, description: tServices('seo.description'), category: 'marketing', features: tServices('seo.features'), slug: 'seo' },
    { title: tServices('googleAds.title'), icon: CursorArrowRaysIcon, description: tServices('googleAds.description'), category: 'marketing', features: tServices('googleAds.features'), slug: 'google-ads' },
    { title: tServices('metaAds.title'), icon: ShareIcon, description: tServices('metaAds.description'), category: 'marketing', features: tServices('metaAds.features'), slug: 'meta-ads' },
    { title: tServices('socialMediaMarketing.title'), icon: MegaphoneIcon, description: tServices('socialMediaMarketing.description'), category: 'marketing', features: tServices('socialMediaMarketing.features'), slug: 'social-media-marketing' },
    { title: tServices('emailMarketing.title'), icon: EnvelopeIcon, description: tServices('emailMarketing.description'), category: 'marketing', features: tServices('emailMarketing.features'), slug: 'email-marketing' },
    { title: tServices('contentMarketing.title'), icon: DocumentTextIcon, description: tServices('contentMarketing.description'), category: 'marketing', features: tServices('contentMarketing.features'), slug: 'content-marketing' },
    { title: tServices('tiktokAds.title'), icon: PlayIcon, description: tServices('tiktokAds.description'), category: 'marketing', features: tServices('tiktokAds.features'), slug: 'tiktok-ads' },
    { title: tServices('linkedinAds.title'), icon: BriefcaseIcon, description: tServices('linkedinAds.description'), category: 'marketing', features: tServices('linkedinAds.features'), slug: 'linkedin-ads' },
    // Infrastructure
    { title: tServices('pythonAutomation.title'), icon: Cog6ToothIcon, description: tServices('pythonAutomation.description'), category: 'infrastructure', features: tServices('pythonAutomation.features'), slug: 'python-automation' },
    { title: tServices('devopsInfrastructure.title'), icon: CloudArrowUpIcon, description: tServices('devopsInfrastructure.description'), category: 'infrastructure', features: tServices('devopsInfrastructure.features'), slug: 'devops-cloud' },
    { title: tServices('mlopsDeployment.title'), icon: ServerStackIcon, description: tServices('mlopsDeployment.description'), category: 'infrastructure', features: tServices('mlopsDeployment.features'), slug: 'mlops-deployment' },
    { title: tServices('dataAnalytics.title'), icon: ChartBarSquareIcon, description: tServices('dataAnalytics.description'), category: 'infrastructure', features: tServices('dataAnalytics.features'), slug: 'data-analytics' },
    { title: tServices('cybersecurity.title'), icon: ShieldCheckIcon, description: tServices('cybersecurity.description'), category: 'infrastructure', features: tServices('cybersecurity.features'), slug: 'cybersecurity' },
    { title: tServices('cloudMigration.title'), icon: CloudArrowUpIcon, description: tServices('cloudMigration.description'), category: 'infrastructure', features: tServices('cloudMigration.features'), slug: 'cloud-migration' },
  ];

  const filteredServices = services.filter(service => service.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReducedMotion ? { duration: 0 } : smoothSpring,
    },
    exit: {
      opacity: 0,
      y: -12,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="section gradient-bg-mesh relative overflow-hidden" dir={dir}>
      <BackgroundBlobs className="opacity-40" />

      <div className={`absolute top-32 w-28 h-28 ${dir === 'rtl' ? 'left-16' : 'right-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-900`} />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-16"
        />

        {/* Category Navigation with layoutId active indicator */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`
                relative px-6 py-3 text-sm font-medium border rounded-sm transition-colors duration-250
                ${activeCategory === category.key
                  ? 'text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'
                }
              `}
            >
              {activeCategory === category.key && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-gray-900 rounded-sm"
                  transition={prefersReducedMotion ? { duration: 0 } : snappySpring}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Services Grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={activeCategory}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  whileHover={prefersReducedMotion ? {} : {
                    rotateX: -2,
                    rotateY: 2,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                    transition: { duration: 0.3 },
                  }}
                  className="glass group hover:glass-strong hover:border-glass transition-all duration-300 rounded-lg p-8"
                  style={{ perspective: 800, transformStyle: 'preserve-3d' }}
                >
                  {/* Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center group-hover:bg-gray-100 transition-colors"
                      whileHover={prefersReducedMotion ? {} : { rotate: 6, scale: 1.05 }}
                      transition={snappySpring}
                    >
                      <Icon className="h-6 w-6 text-gray-700" />
                    </motion.div>
                    <div className="w-8 h-0.5 bg-gray-200 group-hover:bg-gray-300 transition-colors" />
                  </div>

                  <h3 className="text-title text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-body text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <div className="space-y-2 mb-8">
                    {Array.isArray(service.features) ? (
                      service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-1 h-1 bg-gray-400 rounded-full" />
                          <span className="text-caption text-gray-500">{feature}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        <span className="text-caption text-gray-500">{service.features}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    href={`/services/${service.slug}`}
                    variant="ghost"
                    size="sm"
                    rightIcon={
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d={dir === 'rtl' ? "M11 17l-5-5m0 0l5-5m-5 5h12" : "M13 7l5 5m0 0l-5 5m5-5H6"} />
                      </svg>
                    }
                    className="w-full justify-between"
                  >
                    {tCommon('learnMore')}
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">{t('readyToStart')}</h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">{t('readyDescription')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">{t('startProject')}</Button>
            <Button href="/projects" variant="secondary" size="lg">{t('viewWork')}</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
