// src/components/ServicesSection.tsx
'use client';

import { useState } from 'react';
import { servicesByCategory, type ServiceEntry } from '@/data/serviceHierarchy';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { smoothSpring, snappySpring } from '@/lib/animations';

import {
  CodeBracketIcon, ShoppingCartIcon, LinkIcon, PaintBrushIcon, DevicePhoneMobileIcon,
  CloudIcon, GlobeEuropeAfricaIcon, SwatchIcon, CpuChipIcon, ChartBarIcon,
  ChatBubbleBottomCenterTextIcon, ChatBubbleLeftRightIcon, EyeIcon, BoltIcon,
  PencilSquareIcon, UserGroupIcon, BookOpenIcon, MagnifyingGlassIcon, CursorArrowRaysIcon,
  ShareIcon, MegaphoneIcon, EnvelopeIcon, DocumentTextIcon, PlayIcon, BriefcaseIcon,
  CommandLineIcon, CloudArrowUpIcon, RocketLaunchIcon, PresentationChartLineIcon,
  ShieldCheckIcon, ComputerDesktopIcon, ServerStackIcon, TagIcon, CubeIcon,
  CubeTransparentIcon, ArrowPathIcon, LockClosedIcon, SpeakerWaveIcon, VideoCameraIcon,
  FilmIcon, HandThumbUpIcon, NewspaperIcon, BeakerIcon, RectangleGroupIcon,
  WrenchScrewdriverIcon, PhotoIcon, AdjustmentsHorizontalIcon, CircleStackIcon,
  // New icons for expanded services
  BuildingOffice2Icon, GlobeAltIcon, CurrencyDollarIcon, SparklesIcon,
  LightBulbIcon, ScaleIcon, FireIcon, ClockIcon, ArrowTrendingUpIcon, FunnelIcon,
  SignalIcon, Cog6ToothIcon, ArrowsRightLeftIcon, TableCellsIcon, UsersIcon,
  ViewfinderCircleIcon, Squares2X2Icon, InboxStackIcon, HashtagIcon,
  WrenchIcon, ChartPieIcon,
} from '@heroicons/react/24/outline';

// ─── Slug → camelCase translation key ───────────────────────────────
function toKey(slug: string): string {
  return slug.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());
}

// ─── Icon mapping (all 222 services) ────────────────────────────────
const icons: Record<string, React.ElementType> = {
  // ── Web & Software ──
  'web-development': CodeBracketIcon, 'frontend-development': ComputerDesktopIcon,
  'backend-development': ServerStackIcon, 'full-stack-development': CodeBracketIcon,
  'progressive-web-apps': RocketLaunchIcon, 'headless-cms-development': CubeIcon,
  'jamstack-development': BoltIcon,
  'e-commerce': ShoppingCartIcon, 'shopify-development': ShoppingCartIcon,
  'woocommerce-development': ShoppingCartIcon, 'magento-development': ShoppingCartIcon,
  'custom-ecommerce': ShoppingCartIcon, 'marketplace-development': TagIcon,
  'b2b-ecommerce': CurrencyDollarIcon,
  'mobile-development': DevicePhoneMobileIcon, 'ios-development': DevicePhoneMobileIcon,
  'android-development': DevicePhoneMobileIcon, 'flutter-development': DevicePhoneMobileIcon,
  'react-native-development': DevicePhoneMobileIcon, 'cross-platform-apps': DevicePhoneMobileIcon,
  'api-development': LinkIcon, 'rest-api-development': LinkIcon,
  'graphql-development': CubeIcon, 'third-party-api-integration': ArrowPathIcon,
  'api-gateway': ServerStackIcon,
  'saas-development': CloudIcon, 'mvp-development': RocketLaunchIcon,
  'multi-tenant-architecture': BuildingOffice2Icon, 'saas-migration': ArrowsRightLeftIcon,
  'wordpress-development': GlobeEuropeAfricaIcon, 'custom-wordpress-themes': PaintBrushIcon,
  'wordpress-plugin-development': Cog6ToothIcon, 'wordpress-optimization': FireIcon,
  'enterprise-software': BuildingOffice2Icon, 'crm-development': InboxStackIcon,
  'erp-development': TableCellsIcon, 'hrms-development': UsersIcon,
  'custom-business-software': Cog6ToothIcon,
  'web3-blockchain': CubeTransparentIcon, 'smart-contracts': CodeBracketIcon,
  'dapp-development': CubeTransparentIcon, 'nft-marketplace': TagIcon,
  'defi-solutions': CurrencyDollarIcon, 'tokenization': CircleStackIcon,
  'no-code-low-code': Squares2X2Icon, 'bubble-development': Squares2X2Icon,
  'webflow-development': PaintBrushIcon, 'airtable-solutions': TableCellsIcon,
  'zapier-automation': ArrowPathIcon,

  // ── AI & Data ──
  'ai-solutions': CpuChipIcon, 'ai-consulting-strategy': LightBulbIcon,
  'custom-ai-development': BeakerIcon, 'ai-integration': ArrowPathIcon,
  'ai-poc-mvp': SparklesIcon,
  'machine-learning': ChartBarIcon, 'predictive-analytics': ChartBarIcon,
  'nlp-text-processing': DocumentTextIcon, 'recommendation-systems': AdjustmentsHorizontalIcon,
  'anomaly-detection': SignalIcon, 'time-series-forecasting': ClockIcon,
  'conversational-ai': ChatBubbleBottomCenterTextIcon, 'chatbot-development': ChatBubbleLeftRightIcon,
  'voice-assistant-development': SpeakerWaveIcon, 'whatsapp-bots': ChatBubbleLeftRightIcon,
  'customer-service-ai': ChatBubbleBottomCenterTextIcon,
  'computer-vision': EyeIcon, 'image-recognition': EyeIcon,
  'object-detection': ViewfinderCircleIcon, 'video-analytics': VideoCameraIcon,
  'ocr-document-processing': DocumentTextIcon,
  'llm-services': BoltIcon, 'llm-finetuning': BoltIcon,
  'prompt-engineering': PencilSquareIcon, 'gpt-claude-api-integration': CpuChipIcon,
  'custom-llm-development': BeakerIcon,
  'ai-agents': UserGroupIcon, 'autonomous-agents': SparklesIcon,
  'multi-agent-systems': UserGroupIcon, 'ai-workflow-automation': ArrowPathIcon,
  'rag-solutions': BookOpenIcon, 'knowledge-base-ai': BookOpenIcon,
  'document-qa': DocumentTextIcon, 'enterprise-search-ai': MagnifyingGlassIcon,
  'python-automation': CommandLineIcon, 'web-scraping': CommandLineIcon,
  'workflow-automation': ArrowPathIcon, 'data-pipeline-automation': CircleStackIcon,
  'rpa-solutions': Cog6ToothIcon,

  // ── Marketing & Growth ──
  'digital-marketing': MegaphoneIcon,
  'seo': MagnifyingGlassIcon, 'technical-seo': WrenchScrewdriverIcon,
  'local-seo': MagnifyingGlassIcon, 'international-seo': GlobeAltIcon,
  'link-building': LinkIcon, 'ecommerce-seo': ShoppingCartIcon,
  'geo-ai-search-optimization': SparklesIcon,
  'google-ads': CursorArrowRaysIcon, 'google-search-ads': CursorArrowRaysIcon,
  'google-display-ads': PhotoIcon, 'youtube-ads': VideoCameraIcon,
  'google-shopping': ShoppingCartIcon, 'performance-max': FireIcon,
  'meta-ads': ShareIcon, 'facebook-ads': ShareIcon,
  'instagram-ads': PhotoIcon, 'advantage-plus-campaigns': SparklesIcon,
  'social-media-marketing': MegaphoneIcon, 'social-media-management': MegaphoneIcon,
  'influencer-marketing': HandThumbUpIcon, 'community-management': UsersIcon,
  'social-commerce': ShoppingCartIcon,
  'tiktok-marketing': PlayIcon, 'tiktok-ads': PlayIcon,
  'tiktok-shop': ShoppingCartIcon, 'tiktok-content': FilmIcon,
  'linkedin-marketing': BriefcaseIcon, 'linkedin-ads': BriefcaseIcon,
  'linkedin-lead-gen': UserGroupIcon, 'company-page-management': BuildingOffice2Icon,
  'whatsapp-marketing': ChatBubbleLeftRightIcon, 'whatsapp-business-api': ChatBubbleLeftRightIcon,
  'whatsapp-campaigns': ChatBubbleLeftRightIcon, 'whatsapp-commerce': ShoppingCartIcon,
  'email-marketing': EnvelopeIcon, 'email-automation': EnvelopeIcon,
  'newsletter-design': NewspaperIcon, 'email-deliverability': EnvelopeIcon,
  'content-marketing': DocumentTextIcon, 'blog-copywriting': PencilSquareIcon,
  'video-production-marketing': VideoCameraIcon, 'content-strategy': DocumentTextIcon,
  'podcast-production': SpeakerWaveIcon,
  'cro': ArrowTrendingUpIcon, 'ab-testing': AdjustmentsHorizontalIcon,
  'landing-page-optimization': RectangleGroupIcon, 'funnel-optimization': FunnelIcon,
  'ux-analytics': ChartPieIcon,
  'marketing-automation': Cog6ToothIcon, 'hubspot-implementation': Cog6ToothIcon,
  'salesforce-marketing-cloud': CloudIcon, 'custom-marketing-automation': ArrowPathIcon,
  'marketplace-ads': TagIcon, 'amazon-ppc': CursorArrowRaysIcon,
  'trendyol-ads': CursorArrowRaysIcon, 'app-store-optimization': DevicePhoneMobileIcon,

  // ── Design & Creative ──
  'ui-ux-design': PaintBrushIcon, 'ui-design': PaintBrushIcon,
  'ux-research': MagnifyingGlassIcon, 'prototyping-wireframing': RectangleGroupIcon,
  'design-systems': Squares2X2Icon, 'mobile-app-design': DevicePhoneMobileIcon,
  'graphic-design': SwatchIcon, 'logo-brand-identity': SwatchIcon,
  'print-packaging-design': DocumentTextIcon, 'social-media-graphics': HashtagIcon,
  'presentation-design': PresentationChartLineIcon,
  'motion-graphics': FilmIcon, 'explainer-videos': VideoCameraIcon,
  'social-animations': FilmIcon, 'product-animations': FilmIcon,
  'web-design': ComputerDesktopIcon, 'corporate-website-design': BuildingOffice2Icon,
  'landing-page-design': RectangleGroupIcon, 'ecommerce-design': ShoppingCartIcon,
  'brand-strategy': LightBulbIcon, 'brand-positioning': LightBulbIcon,
  'brand-guidelines': BookOpenIcon, 'rebranding': ArrowPathIcon,
  '3d-ar-vr': ViewfinderCircleIcon, '3d-product-visualization': ViewfinderCircleIcon,
  'ar-experiences': ViewfinderCircleIcon, 'virtual-tours': GlobeAltIcon,

  // ── Infrastructure & DevOps ──
  'devops-cloud': CloudIcon, 'ci-cd-pipelines': ArrowPathIcon,
  'docker-kubernetes': CubeTransparentIcon, 'cloud-management': CloudIcon,
  'infrastructure-as-code': CodeBracketIcon,
  'cloud-migration': CloudArrowUpIcon, 'aws-migration': CloudArrowUpIcon,
  'azure-migration': CloudArrowUpIcon, 'google-cloud-migration': CloudArrowUpIcon,
  'mlops-deployment': RocketLaunchIcon, 'model-deployment': RocketLaunchIcon,
  'model-monitoring': SignalIcon, 'ml-pipelines': ArrowPathIcon,
  'data-analytics': PresentationChartLineIcon, 'business-intelligence': ChartPieIcon,
  'big-data-etl': CircleStackIcon, 'data-visualization': PresentationChartLineIcon,
  'real-time-analytics': SignalIcon,
  'cybersecurity': ShieldCheckIcon, 'penetration-testing': ShieldCheckIcon,
  'security-audits-compliance': LockClosedIcon, 'gdpr-compliance': ScaleIcon,
  'soc2-compliance': ScaleIcon,
  'database-services': CircleStackIcon, 'database-design': CircleStackIcon,
  'database-optimization': FireIcon, 'database-migration': ArrowsRightLeftIcon,
  'performance-optimization': FireIcon, 'website-speed-optimization': FireIcon,
  'core-web-vitals': SignalIcon, 'server-optimization': ServerStackIcon,
  'managed-services': WrenchIcon, 'continuous-monitoring': SignalIcon,
  'maintenance-support': WrenchIcon, 'disaster-recovery': ShieldCheckIcon,

  // ── Consulting & Strategy ──
  'digital-transformation': LightBulbIcon, 'digital-strategy': LightBulbIcon,
  'process-digitization': ArrowPathIcon,
  'technology-consulting': LightBulbIcon, 'tech-stack-assessment': CodeBracketIcon,
  'architecture-design': RectangleGroupIcon,
  'ai-strategy': CpuChipIcon, 'ai-readiness-assessment': CpuChipIcon,
  'ai-roi-analysis': ChartBarIcon,
  'growth-strategy': ArrowTrendingUpIcon,
  'startup-services': RocketLaunchIcon, 'startup-mvp-development': RocketLaunchIcon,
  'technical-cto': UserGroupIcon,
  'staff-augmentation': UsersIcon, 'developer-outsourcing': UsersIcon,
  'dedicated-teams': UserGroupIcon,
};

// ─── Service hierarchy (6 categories, 222 services) ─────────────────



// ─── Component ──────────────────────────────────────────────────────
export default function ServicesSection() {
  const { locale, dir, isLoading } = useTranslations();
  const t = useSectionTranslations('services.main');
  const tServices = useSectionTranslations('services.list');
  const tCommon = useSectionTranslations('common');
  const prefersReducedMotion = useReducedMotion();

  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (isLoading) {
    return (
      <section className="section bg-white relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto" />
          <p className="mt-4 text-gray-600">{tCommon('loading')}</p>
        </div>
      </section>
    );
  }

  const categories = [
    { key: 'web',            label: t('categories.web'),            icon: CodeBracketIcon, desc: t('categoryDescs.web')            as string },
    { key: 'ai',             label: t('categories.ai'),             icon: CpuChipIcon,     desc: t('categoryDescs.ai')             as string },
    { key: 'marketing',      label: t('categories.marketing'),      icon: RocketLaunchIcon,desc: t('categoryDescs.marketing')      as string },
    { key: 'design',         label: t('categories.design'),         icon: PaintBrushIcon,  desc: t('categoryDescs.design')         as string },
    { key: 'infrastructure', label: t('categories.infrastructure'), icon: ServerStackIcon, desc: t('categoryDescs.infrastructure') as string },
    { key: 'consulting',     label: t('categories.consulting'),     icon: LightBulbIcon,   desc: t('categoryDescs.consulting')     as string },
  ];

  const currentServices = expandedCategory ? servicesByCategory[expandedCategory] || [] : [];
  const activeLabel = expandedCategory ? categories.find(c => c.key === expandedCategory)?.label : '';

  return (
    <section className="section bg-background-gray relative overflow-hidden py-24 lg:py-32 min-h-screen" dir={dir}>
      <BackgroundBlobs className="opacity-30" />

      {/* Decorative crescent */}
      <div className={`absolute top-32 w-28 h-28 pointer-events-none ${dir === 'rtl' ? 'left-16' : 'right-16'} z-0`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-900`} />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10">
        
        <AnimatePresence mode="wait">
          {!expandedCategory ? (
            
            /* VIEW 1: THE BENTO GRID DASHBOARD */
            <motion.div
              key="grid-view"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <SectionHeader
                eyebrow={t('eyebrow')}
                title={t('title')}
                subtitle={t('subtitle')}
                className="mb-8 md:mb-12"
                centered={true}
              />
              
              {/* The Fast Category Tabs for Dashboard View */}
              <div className="flex flex-wrap justify-center gap-2 mb-12 lg:mb-16">
                {categories.map((category) => {
                  const TabIcon = category.icon;
                  return (
                    <button
                      key={category.key}
                      onClick={() => setExpandedCategory(category.key)}
                      className="relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2.5 group overflow-hidden border bg-white shadow-sm border-gray-100 hover:shadow-md text-gray-600 hover:text-gray-900 hover:border-gray-200"
                    >
                      <TabIcon className="w-4 h-4 relative z-10 text-gray-400 group-hover:text-gray-900 transition-colors" />
                      <span className="relative z-10">{category.label}</span>
                    </button>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {categories.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <motion.button
                      key={cat.key}
                      onClick={() => setExpandedCategory(cat.key)}
                      whileHover={prefersReducedMotion ? {} : { y: -8 }}
                      transition={smoothSpring}
                      className="glass bg-white flex flex-col items-start text-left p-8 md:p-10 hover:bg-gray-50 border border-white hover:border-gray-200 rounded-[2rem] group overflow-hidden relative shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] w-full text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-accent-emerald-light rounded-2xl flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:bg-primary transition-all duration-500 border border-gray-100 shadow-sm shrink-0">
                           <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 relative z-10 tracking-tight leading-tight group-hover:text-primary transition-colors duration-300 text-left">
                          {cat.label}
                        </h3>
                      </div>
                      
                      {/* Short Description added back */}
                      <p className="text-sm lg:text-base text-gray-600 font-medium mb-6 relative z-10 leading-relaxed text-left line-clamp-2">
                         {cat.desc}
                      </p>

                      {/* Important bullet points fetched from top 3 features */}
                      <div className="space-y-2 mb-8 relative z-10 w-full">
                         {servicesByCategory[cat.key]?.slice(0, 3).map((s, i) => ( 
                            <div key={i} className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                              <span className="text-sm font-medium text-gray-600 leading-snug group-hover:text-gray-900 transition-colors text-left">
                                 {tServices(`${toKey(s.slug)}.title`)}
                              </span>
                            </div>
                         ))}
                      </div>
                      
                      <div className="mt-auto pt-6 border-t border-gray-100/50 flex items-center justify-between w-full relative z-10 group-hover:border-primary/20 transition-colors">
                         <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-gray-500 group-hover:text-gray-900 transition-colors">
                           {(t('majorServices') as string).replace('{count}', String(servicesByCategory[cat.key]?.length ?? 0))}
                         </span>
                         <div className={`w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 ${dir === 'rtl' ? 'translate-x-4' : '-translate-x-4'}`}>
                            <svg className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                         </div>
                      </div>
                      
                      {/* Massive absolute subtle background decorative icon overlay */}
                      <Icon className={`absolute -bottom-16 w-64 h-64 text-gray-900/[0.03] group-hover:text-primary/10 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-700 pointer-events-none ${dir === 'rtl' ? '-left-16' : '-right-16'}`} />
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <div className="mt-16 sm:mt-24 text-center pb-8">
                 <Button href="/contact" variant="primary" size="lg">
                    {t('startProject')}
                 </Button>
              </div>

            </motion.div>
            
          ) : (
            
            /* VIEW 2: THE EXPANDED CATEGORY DETAILS */
            <motion.div
              key="detail-view"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              
              {/* Dynamic Top Navigation Bar With Tabs */}
              <div className="mb-12 lg:mb-16">
                <div className={`flex flex-col md:flex-row md:items-end justify-between mb-8 gap-8 border-b border-gray-200/50 pb-8 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <button 
                      onClick={() => setExpandedCategory(null)}
                      className={`flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-6 uppercase tracking-wider group ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                    >
                      <svg className={`w-5 h-5 transform transition-transform ${dir === 'rtl' ? 'group-hover:translate-x-1 rotate-180' : 'group-hover:-translate-x-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      {t('backToSelection') as string}
                    </button>
                    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {activeLabel}
                    </h2>
                  </div>
                  
                  <div className="shrink-0 flex items-center">
                    <Button href="/contact" variant="primary" size="lg">{t('startProject')}</Button>
                  </div>
                </div>

                {/* The Fast Category Tabs */}
                <div className="flex flex-wrap justify-start gap-2">
                  {categories.map((category) => {
                    const isActive = expandedCategory === category.key;
                    const TabIcon = category.icon;
                    return (
                      <button
                        key={category.key}
                        onClick={() => setExpandedCategory(category.key)}
                        className={`
                          relative px-4 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2.5 group overflow-hidden border
                          ${isActive
                            ? 'text-white border-transparent shadow-[0_4px_15px_rgba(26,26,26,0.15)]'
                            : 'bg-white shadow-sm border-gray-100 hover:shadow-md text-gray-600 hover:text-gray-900 hover:border-gray-200'
                          }
                        `}
                      >
                        {isActive && !prefersReducedMotion && (
                          <motion.div
                            layoutId="activeCategoryPillDetail"
                            className="absolute inset-0 bg-gray-900"
                            transition={smoothSpring}
                            style={{ zIndex: -1 }}
                          />
                        )}
                        {isActive && prefersReducedMotion && (
                          <div className="absolute inset-0 bg-gray-900" style={{ zIndex: -1 }} />
                        )}
                        
                        <TabIcon className={`w-4 h-4 relative z-10 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'} transition-colors`} />
                        <span className="relative z-10">{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* The Details Grid mapped with current services */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {currentServices.map((service, idx) => {
                  const tKey = toKey(service.slug);
                  const Icon = icons[service.slug] || CpuChipIcon;
                  const hasChildren = service.children && service.children.length > 0;

                  return (
                    <motion.div
                      key={service.slug}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: idx * 0.05 }}
                      className="glass bg-white/80 backdrop-blur-xl border border-white hover:border-gray-200 rounded-[2rem] overflow-hidden group flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 min-h-[400px] relative"
                    >
                      <Link href={`/${locale}/services/${service.slug}`} className="absolute inset-0 z-20"><span className="sr-only">{tCommon('learnMore')}</span></Link>

                      <div className="p-8 md:p-10 pb-0 flex-1 relative">
                        {/* Huge modern Icon Box */}
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm mb-6 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500 relative overflow-hidden">
                           <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                           <Icon className="h-8 w-8 text-primary/80 group-hover:text-primary transition-colors" />
                        </div>
                        
                        <h3 className={`text-2xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-primary transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                          {tServices(`${tKey}.title`)}
                        </h3>
                        <p className={`text-base text-gray-600 mb-8 font-medium leading-relaxed ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                          {tServices(`${tKey}.description`)}
                        </p>

                        {/* Top Features */}
                        <div className="space-y-3 mb-8">
                          {(() => {
                            const features = tServices(`${tKey}.features`);
                            const arr: string[] = Array.isArray(features) ? features : (typeof features === 'string' ? [features] : []);
                            return arr.slice(0, 3).map((feature, i) => ( 
                              <div key={i} className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                                <span className="text-sm font-medium text-gray-600 leading-snug group-hover:text-gray-900 transition-colors">{feature}</span>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>

                      {/* Specialized Services Bar */}
                      <div className={`mt-auto px-8 md:px-10 py-6 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between group-hover:bg-gray-900 transition-colors duration-300 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                         <span className="text-xs sm:text-sm font-bold text-gray-500 group-hover:text-white transition-colors uppercase tracking-widest">
                            {hasChildren
                              ? (t('specialties') as string).replace('{count}', String(service.children?.length ?? 0))
                              : (t('exploreDetails') as string)}
                         </span>
                         <div className="w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-transparent shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className={`w-5 h-5 text-gray-900 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                         </div>
                      </div>
                      
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
