// src/components/ServicesSection.tsx
'use client';

import { useState } from 'react';
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
type ServiceEntry = { slug: string; children?: string[] };

const servicesByCategory: Record<string, ServiceEntry[]> = {
  web: [
    { slug: 'web-development', children: ['frontend-development', 'backend-development', 'full-stack-development', 'progressive-web-apps', 'headless-cms-development', 'jamstack-development'] },
    { slug: 'e-commerce', children: ['shopify-development', 'woocommerce-development', 'magento-development', 'custom-ecommerce', 'marketplace-development', 'b2b-ecommerce'] },
    { slug: 'mobile-development', children: ['ios-development', 'android-development', 'flutter-development', 'react-native-development', 'cross-platform-apps'] },
    { slug: 'api-development', children: ['rest-api-development', 'graphql-development', 'third-party-api-integration', 'api-gateway'] },
    { slug: 'saas-development', children: ['mvp-development', 'multi-tenant-architecture', 'saas-migration'] },
    { slug: 'wordpress-development', children: ['custom-wordpress-themes', 'wordpress-plugin-development', 'wordpress-optimization'] },
    { slug: 'enterprise-software', children: ['crm-development', 'erp-development', 'hrms-development', 'custom-business-software'] },
    { slug: 'web3-blockchain', children: ['smart-contracts', 'dapp-development', 'nft-marketplace', 'defi-solutions', 'tokenization'] },
    { slug: 'no-code-low-code', children: ['bubble-development', 'webflow-development', 'airtable-solutions', 'zapier-automation'] },
  ],
  ai: [
    { slug: 'ai-solutions', children: ['ai-consulting-strategy', 'custom-ai-development', 'ai-integration', 'ai-poc-mvp'] },
    { slug: 'machine-learning', children: ['predictive-analytics', 'nlp-text-processing', 'recommendation-systems', 'anomaly-detection', 'time-series-forecasting'] },
    { slug: 'conversational-ai', children: ['chatbot-development', 'voice-assistant-development', 'whatsapp-bots', 'customer-service-ai'] },
    { slug: 'computer-vision', children: ['image-recognition', 'object-detection', 'video-analytics', 'ocr-document-processing'] },
    { slug: 'llm-services', children: ['llm-finetuning', 'prompt-engineering', 'gpt-claude-api-integration', 'custom-llm-development'] },
    { slug: 'ai-agents', children: ['autonomous-agents', 'multi-agent-systems', 'ai-workflow-automation'] },
    { slug: 'rag-solutions', children: ['knowledge-base-ai', 'document-qa', 'enterprise-search-ai'] },
    { slug: 'python-automation', children: ['web-scraping', 'workflow-automation', 'data-pipeline-automation', 'rpa-solutions'] },
  ],
  marketing: [
    { slug: 'seo', children: ['technical-seo', 'local-seo', 'international-seo', 'link-building', 'ecommerce-seo', 'geo-ai-search-optimization'] },
    { slug: 'google-ads', children: ['google-search-ads', 'google-display-ads', 'youtube-ads', 'google-shopping', 'performance-max'] },
    { slug: 'meta-ads', children: ['facebook-ads', 'instagram-ads', 'advantage-plus-campaigns'] },
    { slug: 'social-media-marketing', children: ['social-media-management', 'influencer-marketing', 'community-management', 'social-commerce'] },
    { slug: 'tiktok-marketing', children: ['tiktok-ads', 'tiktok-shop', 'tiktok-content'] },
    { slug: 'linkedin-marketing', children: ['linkedin-ads', 'linkedin-lead-gen', 'company-page-management'] },
    { slug: 'whatsapp-marketing', children: ['whatsapp-business-api', 'whatsapp-campaigns', 'whatsapp-commerce'] },
    { slug: 'email-marketing', children: ['email-automation', 'newsletter-design', 'email-deliverability'] },
    { slug: 'content-marketing', children: ['blog-copywriting', 'video-production-marketing', 'content-strategy', 'podcast-production'] },
    { slug: 'cro', children: ['ab-testing', 'landing-page-optimization', 'funnel-optimization', 'ux-analytics'] },
    { slug: 'marketing-automation', children: ['hubspot-implementation', 'salesforce-marketing-cloud', 'custom-marketing-automation'] },
    { slug: 'marketplace-ads', children: ['amazon-ppc', 'trendyol-ads', 'app-store-optimization'] },
  ],
  design: [
    { slug: 'ui-ux-design', children: ['ui-design', 'ux-research', 'prototyping-wireframing', 'design-systems', 'mobile-app-design'] },
    { slug: 'graphic-design', children: ['logo-brand-identity', 'print-packaging-design', 'social-media-graphics', 'presentation-design'] },
    { slug: 'motion-graphics', children: ['explainer-videos', 'social-animations', 'product-animations'] },
    { slug: 'web-design', children: ['corporate-website-design', 'landing-page-design', 'ecommerce-design'] },
    { slug: 'brand-strategy', children: ['brand-positioning', 'brand-guidelines', 'rebranding'] },
    { slug: '3d-ar-vr', children: ['3d-product-visualization', 'ar-experiences', 'virtual-tours'] },
  ],
  infrastructure: [
    { slug: 'devops-cloud', children: ['ci-cd-pipelines', 'docker-kubernetes', 'cloud-management', 'infrastructure-as-code'] },
    { slug: 'cloud-migration', children: ['aws-migration', 'azure-migration', 'google-cloud-migration'] },
    { slug: 'mlops-deployment', children: ['model-deployment', 'model-monitoring', 'ml-pipelines'] },
    { slug: 'data-analytics', children: ['business-intelligence', 'big-data-etl', 'data-visualization', 'real-time-analytics'] },
    { slug: 'cybersecurity', children: ['penetration-testing', 'security-audits-compliance', 'gdpr-compliance', 'soc2-compliance'] },
    { slug: 'database-services', children: ['database-design', 'database-optimization', 'database-migration'] },
    { slug: 'performance-optimization', children: ['website-speed-optimization', 'core-web-vitals', 'server-optimization'] },
    { slug: 'managed-services', children: ['continuous-monitoring', 'maintenance-support', 'disaster-recovery'] },
  ],
  consulting: [
    { slug: 'digital-transformation', children: ['digital-strategy', 'process-digitization'] },
    { slug: 'technology-consulting', children: ['tech-stack-assessment', 'architecture-design'] },
    { slug: 'ai-strategy', children: ['ai-readiness-assessment', 'ai-roi-analysis'] },
    { slug: 'growth-strategy' },
    { slug: 'startup-services', children: ['startup-mvp-development', 'technical-cto'] },
    { slug: 'staff-augmentation', children: ['developer-outsourcing', 'dedicated-teams'] },
  ],
};

// ─── Component ──────────────────────────────────────────────────────
export default function ServicesSection() {
  const { locale, dir, isLoading } = useTranslations();
  const t = useSectionTranslations('services.main');
  const tServices = useSectionTranslations('services.list');
  const tCommon = useSectionTranslations('common');
  const prefersReducedMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState('web');

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
    { key: 'web', label: t('categories.web') },
    { key: 'ai', label: t('categories.ai') },
    { key: 'marketing', label: t('categories.marketing') },
    { key: 'design', label: t('categories.design') },
    { key: 'infrastructure', label: t('categories.infrastructure') },
    { key: 'consulting', label: t('categories.consulting') },
  ];

  const currentServices = servicesByCategory[activeCategory] || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: prefersReducedMotion ? { duration: 0 } : smoothSpring,
    },
    exit: {
      opacity: 0, y: -12, scale: 0.95,
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

        {/* Category Navigation */}
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

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentServices.map((service) => {
              const tKey = toKey(service.slug);
              const Icon = icons[service.slug] || CpuChipIcon;
              const hasChildren = service.children && service.children.length > 0;

              return (
                <motion.div
                  key={service.slug}
                  variants={itemVariants}
                  whileHover={prefersReducedMotion ? {} : {
                    rotateX: -2, rotateY: 2,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                    transition: { duration: 0.3 },
                  }}
                  className="glass group hover:glass-strong hover:border-glass transition-all duration-300 rounded-lg p-8 flex flex-col"
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

                  <h3 className="text-title text-gray-900 mb-3">{tServices(`${tKey}.title`)}</h3>
                  <p className="text-body text-gray-600 mb-6 leading-relaxed">{tServices(`${tKey}.description`)}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {(() => {
                      const features = tServices(`${tKey}.features`);
                      const arr = Array.isArray(features) ? features : [features];
                      return arr.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-1 h-1 bg-gray-400 rounded-full flex-shrink-0" />
                          <span className="text-caption text-gray-500">{feature}</span>
                        </div>
                      ));
                    })()}
                  </div>

                  {/* Sub-services — always visible */}
                  {hasChildren && (
                    <div className="mb-6 pt-5 border-t border-gray-200">
                      <p className="text-overline text-gray-400 mb-4">Specialized Services</p>
                      <div className="space-y-1">
                        {service.children!.map((childSlug) => {
                          const childKey = toKey(childSlug);
                          const ChildIcon = icons[childSlug] || CpuChipIcon;
                          return (
                            <Link
                              key={childSlug}
                              href={`/${locale}/services/${childSlug}`}
                              className="group/child flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-gray-50 transition-colors"
                            >
                              <div className="w-7 h-7 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center flex-shrink-0 group-hover/child:bg-gray-100 transition-colors">
                                <ChildIcon className="w-3.5 h-3.5 text-gray-500 group-hover/child:text-gray-700 transition-colors" />
                              </div>
                              <span className="text-caption font-medium text-gray-600 group-hover/child:text-gray-900 transition-colors">
                                {tServices(`${childKey}.title`)}
                              </span>
                              <svg className={`w-3.5 h-3.5 text-gray-300 ${dir === 'rtl' ? 'mr-auto rotate-180' : 'ml-auto'} opacity-0 group-hover/child:opacity-100 transition-opacity`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Learn More — pushed to bottom */}
                  <div className="mt-auto">
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
                  </div>
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
