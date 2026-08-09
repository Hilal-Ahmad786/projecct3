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
  'jamstack-development': BoltIcon, 'accessibility-compliance': ShieldCheckIcon,
  'real-time-applications': SignalIcon,
  'e-commerce': ShoppingCartIcon, 'shopify-development': ShoppingCartIcon,
  'woocommerce-development': ShoppingCartIcon, 'magento-development': ShoppingCartIcon,
  'custom-ecommerce': ShoppingCartIcon, 'marketplace-development': TagIcon,
  'b2b-ecommerce': CurrencyDollarIcon,
  'mobile-development': DevicePhoneMobileIcon, 'ios-development': DevicePhoneMobileIcon,
  'android-development': DevicePhoneMobileIcon, 'flutter-development': DevicePhoneMobileIcon,
  'react-native-development': DevicePhoneMobileIcon, 'cross-platform-apps': DevicePhoneMobileIcon,
  'api-development': LinkIcon, 'rest-api-development': LinkIcon,
  'graphql-development': CubeIcon, 'third-party-api-integration': ArrowPathIcon,
  'api-gateway': ServerStackIcon, 'graphql-api-development': CubeIcon,
  'api-rate-limiting-throttling': FunnelIcon, 'api-security-authentication': LockClosedIcon,
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



// ─── Per-category heritage accents (Modern Heritage palette) ────────
interface CategoryAccent {
  text: string;        // accent text color
  hoverText: string;   // group-hover accent text
  bg: string;          // solid accent bg (active chips)
  soft: string;        // light accent bg (icon chips, pills)
  hoverBorder: string; // card hover border accent
  wash: string;        // gradient wash start color
  dot: string;         // bullet dot
}

const CATEGORY_ACCENTS: Record<string, CategoryAccent> = {
  web: {
    text: 'text-heritage-turquoise', hoverText: 'group-hover:text-heritage-turquoise',
    bg: 'bg-heritage-turquoise', soft: 'bg-heritage-turquoise-light',
    hoverBorder: 'hover:border-heritage-turquoise/40', wash: 'from-heritage-turquoise/[0.06]',
    dot: 'bg-heritage-turquoise',
  },
  ai: {
    text: 'text-heritage-lapis', hoverText: 'group-hover:text-heritage-lapis',
    bg: 'bg-heritage-lapis', soft: 'bg-heritage-lapis-light',
    hoverBorder: 'hover:border-heritage-lapis/40', wash: 'from-heritage-lapis/[0.06]',
    dot: 'bg-heritage-lapis',
  },
  marketing: {
    text: 'text-heritage-saffron', hoverText: 'group-hover:text-heritage-saffron',
    bg: 'bg-heritage-saffron-bright', soft: 'bg-heritage-saffron-light',
    hoverBorder: 'hover:border-heritage-saffron-bright/40', wash: 'from-heritage-saffron-bright/[0.07]',
    dot: 'bg-heritage-saffron-bright',
  },
  design: {
    text: 'text-heritage-terracotta', hoverText: 'group-hover:text-heritage-terracotta',
    bg: 'bg-heritage-terracotta', soft: 'bg-heritage-terracotta-light',
    hoverBorder: 'hover:border-heritage-terracotta/40', wash: 'from-heritage-terracotta/[0.06]',
    dot: 'bg-heritage-terracotta',
  },
  infrastructure: {
    text: 'text-heritage-lapis', hoverText: 'group-hover:text-heritage-lapis',
    bg: 'bg-heritage-lapis', soft: 'bg-heritage-lapis-light',
    hoverBorder: 'hover:border-heritage-lapis/40', wash: 'from-heritage-lapis/[0.06]',
    dot: 'bg-heritage-lapis',
  },
  consulting: {
    text: 'text-heritage-turquoise', hoverText: 'group-hover:text-heritage-turquoise',
    bg: 'bg-heritage-turquoise', soft: 'bg-heritage-turquoise-light',
    hoverBorder: 'hover:border-heritage-turquoise/40', wash: 'from-heritage-turquoise/[0.06]',
    dot: 'bg-heritage-turquoise',
  },
};

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
        
        {/* initial={false}: skip the first-mount animation so the grid is
            visible in the server-rendered HTML before JS hydrates (it used to
            arrive with inline opacity:0 — a blank page on slow devices).
            Category expand/collapse transitions still animate. */}
        <AnimatePresence mode="wait" initial={false}>
          {!expandedCategory ? (
            
            /* VIEW 1: THE BENTO GRID DASHBOARD */
            <motion.div
              key="grid-view"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
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
                  const a = CATEGORY_ACCENTS[category.key] || CATEGORY_ACCENTS.web;
                  return (
                    <button
                      key={category.key}
                      onClick={() => setExpandedCategory(category.key)}
                      className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 flex items-center gap-2 group border bg-white border-gray-200 text-gray-600 hover:text-gray-900 ${a.hoverBorder} hover:shadow-sm`}
                    >
                      <TabIcon className={`w-4 h-4 text-gray-400 ${a.hoverText} transition-colors`} />
                      <span>{category.label}</span>
                    </button>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const a = CATEGORY_ACCENTS[cat.key] || CATEGORY_ACCENTS.web;
                  return (
                    <motion.button
                      key={cat.key}
                      onClick={() => setExpandedCategory(cat.key)}
                      whileHover={prefersReducedMotion ? {} : { y: -4 }}
                      transition={smoothSpring}
                      className={`bg-white flex flex-col items-start text-start p-6 md:p-7 border border-gray-100 ${a.hoverBorder} rounded-2xl group overflow-hidden relative shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] transition-[box-shadow,border-color] duration-300 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2`}
                    >
                      {/* Subtle per-category gradient wash */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${a.wash} via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                      {/* Icon chip + count pill */}
                      <div className="relative z-10 flex items-center justify-between w-full mb-5">
                        <div className={`w-12 h-12 ${a.soft} rounded-xl flex items-center justify-center shrink-0`}>
                          <Icon className={`w-6 h-6 ${a.text}`} />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${a.soft} ${a.text}`}>
                          {(t('majorServices') as string).replace('{count}', String(servicesByCategory[cat.key]?.length ?? 0))}
                        </span>
                      </div>

                      <h3 className={`relative z-10 text-xl lg:text-2xl font-bold text-gray-900 tracking-tight leading-tight ${a.hoverText} transition-colors duration-300 text-start mb-2`}>
                        {cat.label}
                      </h3>

                      <p className="relative z-10 text-sm text-gray-600 font-medium mb-5 leading-relaxed text-start line-clamp-2">
                         {cat.desc}
                      </p>

                      {/* Top services preview */}
                      <div className="space-y-1.5 mb-6 relative z-10 w-full">
                         {servicesByCategory[cat.key]?.slice(0, 3).map((s, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <div className={`w-1.5 h-1.5 rounded-full ${a.dot} mt-[7px] shrink-0 opacity-60 group-hover:opacity-100 transition-opacity`} />
                              <span className="text-sm font-medium text-gray-600 leading-snug group-hover:text-gray-900 transition-colors text-start">
                                 {tServices(`${toKey(s.slug)}.title`)}
                              </span>
                            </div>
                         ))}
                      </div>

                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between w-full relative z-10">
                         <span className={`text-xs font-bold tracking-widest uppercase text-gray-500 ${a.hoverText} transition-colors`}>
                           {t('exploreDetails') as string}
                         </span>
                         <span className={`w-8 h-8 rounded-full ${a.soft} flex items-center justify-center ${a.text} opacity-0 group-hover:opacity-100 transition-all duration-300 transform ${dir === 'rtl' ? 'translate-x-2 group-hover:translate-x-0' : '-translate-x-2 group-hover:translate-x-0'}`}>
                            <svg className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                         </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom CTA band */}
              <div className="mt-16 sm:mt-20 pb-8">
                <div className={`relative overflow-hidden rounded-2xl bg-gray-900 px-6 py-10 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center ${dir === 'rtl' ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`absolute -top-24 w-72 h-72 rounded-full bg-heritage-turquoise/20 blur-3xl pointer-events-none ${dir === 'rtl' ? '-left-24' : '-right-24'}`} />
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{t('readyToStart')}</h3>
                    <p className="text-gray-300 max-w-xl leading-relaxed">{t('readyDescription')}</p>
                  </div>
                  <div className="relative z-10 shrink-0">
                    {/* secondary = white bg + dark text, correct on this dark
                        band. Do NOT override primary's colors via className:
                        equal-specificity Tailwind utilities resolve by CSS
                        source order, not class order, so the variant can win
                        and produce an unreadable button. */}
                    <Button href="/start-project" variant="secondary" size="lg">
                      {t('startProject')}
                    </Button>
                  </div>
                </div>
              </div>

            </motion.div>
            
          ) : (
            
            /* VIEW 2: THE EXPANDED CATEGORY DETAILS */
            <motion.div
              key="detail-view"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
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
                    const chipAccent = CATEGORY_ACCENTS[category.key] || CATEGORY_ACCENTS.web;
                    return (
                      <button
                        key={category.key}
                        onClick={() => setExpandedCategory(category.key)}
                        className={`
                          relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 flex items-center gap-2 group overflow-hidden border
                          ${isActive
                            ? 'text-white border-transparent shadow-sm'
                            : `bg-white border-gray-200 text-gray-600 hover:text-gray-900 ${chipAccent.hoverBorder}`
                          }
                        `}
                      >
                        {isActive && !prefersReducedMotion && (
                          <motion.div
                            layoutId="activeCategoryPillDetail"
                            className={`absolute inset-0 ${chipAccent.bg}`}
                            transition={smoothSpring}
                            style={{ zIndex: -1 }}
                          />
                        )}
                        {isActive && prefersReducedMotion && (
                          <div className={`absolute inset-0 ${chipAccent.bg}`} style={{ zIndex: -1 }} />
                        )}

                        <TabIcon className={`w-4 h-4 relative z-10 ${isActive ? 'text-white' : `text-gray-400 ${chipAccent.hoverText}`} transition-colors`} />
                        <span className="relative z-10">{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scannable service directory */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {currentServices.map((service, idx) => {
                  const tKey = toKey(service.slug);
                  const Icon = icons[service.slug] || CpuChipIcon;
                  const hasChildren = service.children && service.children.length > 0;
                  const a = (expandedCategory && CATEGORY_ACCENTS[expandedCategory]) || CATEGORY_ACCENTS.web;

                  return (
                    <motion.div
                      key={service.slug}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: Math.min(idx, 12) * 0.03 }}
                    >
                      <Link
                        href={`/${locale}/services/${service.slug}`}
                        className={`flex items-center gap-4 min-h-[72px] bg-white border border-gray-100 ${a.hoverBorder} rounded-2xl px-4 py-3.5 md:px-5 group shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-[box-shadow,border-color] duration-300`}
                      >
                        <div className={`w-11 h-11 ${a.soft} rounded-xl flex items-center justify-center shrink-0`}>
                          <Icon className={`w-[22px] h-[22px] ${a.text}`} />
                        </div>
                        <div className="flex-1 min-w-0 text-start">
                          <h3 className={`text-[15px] font-semibold text-gray-900 ${a.hoverText} transition-colors leading-snug truncate`}>
                            {tServices(`${tKey}.title`)}
                          </h3>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {hasChildren
                              ? (t('specialties') as string).replace('{count}', String(service.children?.length ?? 0))
                              : (tServices(`${tKey}.description`) as string)}
                          </p>
                        </div>
                        <svg
                          className={`w-4 h-4 shrink-0 text-gray-300 ${a.hoverText} transition-all duration-300 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
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
