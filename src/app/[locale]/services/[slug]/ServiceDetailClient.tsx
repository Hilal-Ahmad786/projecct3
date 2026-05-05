'use client';

import { useState } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { PlusIcon, MinusIcon, ChevronRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';
import ServicePortfolio from '@/components/services/ServicePortfolio';
import ServiceRequestCTA from '@/components/services/ServiceRequestCTA';
import { HeroVisual, BgPatternRenderer, DecorationRenderer, type ServiceAnimation } from '@/components/services/hero-visuals';
import { useTranslations } from '@/hooks/useTranslations';

// ── Types ────────────────────────────────────────────────────────────
interface ProcessStep {
  step: number;
  title: string;
  description: string;
}
interface Technology {
  name: string;
  icon: string;
}
interface PortfolioItem {
  title: string;
  category: string;
  image: string;
}
interface FAQItem {
  question: string;
  answer: string;
}
interface PricingPackage {
  id: string;
  name: string;
  price: string;
  description?: string;
  features?: string[];
  highlighted?: boolean;
  ctaText?: string;
  billingPeriod?: string;
}

interface SubServiceItem {
  slug: string;
  name: string;
  shortDescription?: string;
  icon?: string;
  color?: string;
}

interface ParentServiceInfo {
  name: string;
  slug: string;
  icon?: string;
  color?: string;
}

export interface ServiceDetailData {
  slug: string;
  name: string;
  description?: string;
  fullDescription?: string;
  shortDescription?: string;
  icon?: string;
  color?: string;
  features: string[];
  benefits: string[];
  content: {
    process?: ProcessStep[];
    technologies?: Technology[];
    portfolio?: PortfolioItem[];
    faq?: FAQItem[];
    animation?: ServiceAnimation;
  };
  pricingPackages?: PricingPackage[];
  isParent?: boolean;
  parentSlug?: string;
  parentService?: ParentServiceInfo;
  subServices?: SubServiceItem[];
  // JSON content from locale files (if available)
  _jsonContent?: {
    hero?: { eyebrow?: string; title?: string; titleAccent?: string; description?: string; cta?: string; secondaryCta?: string };
    services?: { eyebrow?: string; title?: string; titleAccent?: string; subtitle?: string; items?: Array<{ title: string; description: string; features?: string[] }> };
    process?: { eyebrow?: string; title?: string; titleAccent?: string; subtitle?: string; steps?: Array<{ step: number; title: string; description: string }> };
    whyUs?: { eyebrow?: string; title?: string; titleAccent?: string; subtitle?: string; benefits?: Array<{ title: string; description: string }> };
    technologies?: { eyebrow?: string; title?: string; titleAccent?: string; items?: Array<{ name: string; icon?: string }> };
    faq?: { eyebrow?: string; title?: string; titleAccent?: string; items?: Array<{ question: string; answer: string }> };
    portfolio?: { eyebrow?: string; title?: string; titleAccent?: string; items?: any[] };
    cta?: { title?: string; description?: string; primaryButton?: string; secondaryButton?: string };
  };
}

// ── Color System ─────────────────────────────────────────────────────
type AccentColor = 'gray' | 'emerald' | 'violet' | 'blue' | 'amber' | 'rose';

const colorMap: Record<string, AccentColor> = {
  gray: 'gray',
  emerald: 'emerald',
  green: 'emerald',
  violet: 'violet',
  purple: 'violet',
  blue: 'blue',
  amber: 'amber',
  yellow: 'amber',
  orange: 'amber',
  rose: 'rose',
  red: 'rose',
  pink: 'rose',
};

const accentColors: Record<AccentColor, {
  eyebrow: string;
  titleAccent: string;
  gradientFrom: string;
  gradientTo: string;
  ring: string;
  dot: string;
  blob1: string;
  blob2: string;
}> = {
  gray: {
    eyebrow: 'text-gray-500',
    titleAccent: 'text-gray-900',
    gradientFrom: 'from-gray-100',
    gradientTo: 'to-gray-50',
    ring: 'ring-gray-200',
    dot: 'bg-gray-900',
    blob1: 'bg-gray-100',
    blob2: 'bg-gray-200',
  },
  emerald: {
    eyebrow: 'text-emerald-600',
    titleAccent: 'text-emerald-600',
    gradientFrom: 'from-emerald-100',
    gradientTo: 'to-emerald-50',
    ring: 'ring-emerald-200',
    dot: 'bg-emerald-600',
    blob1: 'bg-emerald-100',
    blob2: 'bg-emerald-200',
  },
  violet: {
    eyebrow: 'text-violet-600',
    titleAccent: 'text-violet-600',
    gradientFrom: 'from-violet-100',
    gradientTo: 'to-violet-50',
    ring: 'ring-violet-200',
    dot: 'bg-violet-600',
    blob1: 'bg-violet-100',
    blob2: 'bg-violet-200',
  },
  blue: {
    eyebrow: 'text-blue-600',
    titleAccent: 'text-blue-600',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    ring: 'ring-blue-200',
    dot: 'bg-blue-600',
    blob1: 'bg-blue-100',
    blob2: 'bg-blue-200',
  },
  amber: {
    eyebrow: 'text-amber-600',
    titleAccent: 'text-amber-600',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    ring: 'ring-amber-200',
    dot: 'bg-amber-600',
    blob1: 'bg-amber-100',
    blob2: 'bg-amber-200',
  },
  rose: {
    eyebrow: 'text-rose-600',
    titleAccent: 'text-rose-600',
    gradientFrom: 'from-rose-100',
    gradientTo: 'to-rose-50',
    ring: 'ring-rose-200',
    dot: 'bg-rose-600',
    blob1: 'bg-rose-100',
    blob2: 'bg-rose-200',
  },
};

// ── Icon map ─────────────────────────────────────────────────────────
const iconMap: Record<string, string> = {
  code: '💻',
  cpu: '🤖',
  'device-mobile': '📱',
  cog: '⚙️',
  'chart-bar': '📊',
  brain: '🧠',
  chat: '💬',
  api: '🔗',
  'paint-brush': '🎨',
  megaphone: '📣',
  'shopping-cart': '🛒',
  cloud: '☁️',
  shield: '🛡️',
};

// ── Process icon map ─────────────────────────────────────────────────
function ProcessIcon({ step }: { step: number }) {
  const icons = [
    // Search/Discovery
    <svg key="search" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    // Code/Build
    <svg key="code" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
    // Rocket/Launch
    <svg key="rocket" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>,
    // Shield/Test
    <svg key="shield" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    // Chart/Optimize
    <svg key="chart" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
    // Cog/Settings
    <svg key="cog" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  ];
  return icons[(step - 1) % icons.length] || icons[0];
}

// ═══════════════════════════════════════════════════════════════════════
// ── MAIN CLIENT COMPONENT ────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
export default function ServiceDetailClient({ service }: { service: ServiceDetailData }) {
  const { t } = useTranslations();
  const accent: AccentColor = colorMap[service.color || ''] || 'emerald';
  const colors = accentColors[accent];

  const features = service.features || [];
  const benefits = service.benefits || [];
  const process = service.content.process || [];
  const technologies = service.content.technologies || [];
  const portfolio = service.content.portfolio || [];
  const faq = service.content.faq || [];
  const pricingPackages = service.pricingPackages || [];
  const subServices = service.subServices || [];
  const parentService = service.parentService;
  const animation = service.content.animation;

  return (
    <>
      {/* ── 1. Hero (two-column, animated) ──────────────────────────── */}
      <HeroSection service={service} colors={colors} accent={accent} process={process} animation={animation} />

      {/* ── 2. Portfolio (Recent Projects) ───────────────────────────── */}
      {portfolio.length > 0 && <ServicePortfolio portfolio={portfolio} />}

      {/* ── 3. Tech Strip (scrolling) ───────────────────────────────── */}
      {technologies.length > 0 && <TechStrip technologies={technologies} />}

      {/* ── 4. Features Grid (animated cards) ───────────────────────── */}
      {features.length > 0 && <FeaturesSection features={features} featureStyle={animation?.featureStyle} />}

      {/* ── 5. Process (numbered cards) ─────────────────────────────── */}
      {process.length > 0 && <ProcessSection steps={process} processLayout={animation?.processLayout} />}

      {/* ── 6. Benefits ─────────────────────────────────────────────── */}
      {benefits.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('services.detail.benefits.title')}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. FAQ (Plus/Minus accordion) ───────────────────────────── */}
      {faq.length > 0 && <FAQSection faq={faq} />}

      {/* ── 8. Pricing ──────────────────────────────────────────────── */}
      {pricingPackages.length > 0 && <PricingSection packages={pricingPackages} />}

      {/* ── 9. Sub-Services Grid (for parent services) ────────────── */}
      {subServices.length > 0 && <SubServicesSection subServices={subServices} />}

      {/* ── 10. CTA with project request modal ──────────────────────── */}
      <ServiceRequestCTA serviceType={service.slug} />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── HERO SECTION ─────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function HeroSection({
  service,
  colors,
  accent,
  process,
  animation,
}: {
  service: ServiceDetailData;
  colors: typeof accentColors[AccentColor];
  accent: AccentColor;
  process: ProcessStep[];
  animation?: ServiceAnimation;
}) {
  const { t } = useTranslations();
  const emojiIcon = iconMap[service.icon || ''] || '🔧';
  const hasAnimation = !!animation;
  const parentService = service.parentService;

  return (
    <section className="relative overflow-hidden bg-white pt-[140px] pb-20 lg:pt-[160px] lg:pb-28">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {hasAnimation && <BgPatternRenderer pattern={animation.bgPattern} />}
      </div>

      {/* Decorations */}
      {hasAnimation ? (
        <DecorationRenderer type={animation.decorations} accentColor={colors.dot} />
      ) : (
        <>
          <div className="absolute top-32 right-20 w-32 h-32">
            <div className="crescent crescent-right crescent-subtle text-gray-900" />
          </div>
          <div className="absolute bottom-32 left-16 w-24 h-24">
            <div className="crescent crescent-left crescent-subtle text-gray-600" />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column – Content */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400">
              <LocalizedLink href="/services" className="hover:text-gray-900 transition-colors">
                {t('services.detail.breadcrumb.services')}
              </LocalizedLink>
              {parentService ? (
                <>
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                  <LocalizedLink href={`/services/${parentService.slug}`} className="hover:text-gray-900 transition-colors">
                    {parentService.name}
                  </LocalizedLink>
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                  <span className="text-gray-900">{service.name}</span>
                </>
              ) : (
                <>
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                  <span className="text-gray-900">{service.name}</span>
                </>
              )}
            </nav>

            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-gray-900" />
              <span className={`text-xs font-medium ${colors.eyebrow} uppercase tracking-wide`}>
                {t('services.detail.hero.eyebrow')}
              </span>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-none">
                {service.name.split(' ').slice(0, -1).join(' ')}
                {service.name.split(' ').length > 1 && <br />}
                <span className={`font-semibold ${colors.titleAccent}`}>
                  {service.name.split(' ').length > 1
                    ? service.name.split(' ').slice(-1)[0]
                    : service.name}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed">
              {service.fullDescription || service.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                rightIcon={
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                }
              >
                {t('services.detail.hero.startProject')}
              </Button>
              {process.length > 0 && (
                <Button href={`/services/${service.slug}/process`} variant="secondary" size="lg">
                  {t('services.detail.hero.howWeWork')}
                </Button>
              )}
            </div>
          </motion.div>

          {/* Right Column – Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            {hasAnimation ? (
              /* Parametric Hero Visual */
              <div className="relative aspect-square max-w-xs sm:max-w-sm md:max-w-lg mx-auto flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute top-0 right-0 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 ${colors.blob1} rounded-full mix-blend-multiply filter blur-3xl opacity-40`}
                />
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className={`absolute bottom-0 left-0 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 ${colors.blob2} rounded-full mix-blend-multiply filter blur-3xl opacity-40`}
                />
                <div className="relative z-10">
                  <HeroVisual type={animation.heroVisual} motionType={animation.motion} accentClass={colors.dot} />
                </div>
              </div>
            ) : (
              /* Default Visual (emoji-based) */
              <div className="relative aspect-square max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute top-0 right-0 w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 ${colors.blob1} rounded-full mix-blend-multiply filter blur-3xl opacity-60`}
                />
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className={`absolute bottom-0 left-0 w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 ${colors.blob2} rounded-full mix-blend-multiply filter blur-3xl opacity-60`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className={`absolute w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full ring-1 ${colors.ring} opacity-40`}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                    className={`absolute w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full ring-1 ${colors.ring} opacity-30`}
                  />
                  <div className={`relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} rounded-2xl shadow-lg flex items-center justify-center`}>
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-4xl sm:text-5xl md:text-6xl"
                    >
                      {emojiIcon}
                    </motion.div>
                  </div>
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className={`absolute top-16 right-16 w-4 h-4 ${colors.dot} rounded-full opacity-60`}
                  />
                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className={`absolute bottom-20 left-20 w-3 h-3 ${colors.dot} rounded-full opacity-40`}
                  />
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className={`absolute top-32 left-8 w-2 h-2 ${colors.dot} rounded-full opacity-50`}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── TECH STRIP (infinite scroll) ─────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function TechStrip({ technologies }: { technologies: Technology[] }) {
  const items = [...technologies, ...technologies, ...technologies];

  return (
    <div className="w-full bg-gray-50 border-y border-gray-100 overflow-hidden py-8">
      <div className="relative flex">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />

        {/* Scrolling Content */}
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {items.map((tech, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-400 font-medium text-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              {tech.name}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── FEATURES GRID (animated cards) ───────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function FeaturesSection({ features, featureStyle }: { features: string[]; featureStyle?: string }) {
  const { t } = useTranslations();
  const style = featureStyle || 'icon-top';

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4 sm:mb-6">
            {t('services.detail.features.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 font-light">
            {t('services.detail.features.description')}
          </p>
        </div>

        <div className={`grid gap-4 sm:gap-6 md:gap-8 ${style === 'icon-left' ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-2xl transition-all duration-300 group hover:shadow-lg ${
                style === 'bordered' ? 'p-4 sm:p-6 md:p-8 border-2 border-gray-200 hover:border-gray-400' :
                style === 'gradient-border' ? 'p-4 sm:p-6 md:p-8 border border-gray-100 hover:border-transparent hover:ring-2 hover:ring-emerald-200' :
                style === 'minimal' ? 'p-4 sm:p-6 border-0 shadow-none hover:bg-gray-50' :
                'p-4 sm:p-6 md:p-8 border border-gray-100 hover:border-gray-300'
              }`}
            >
              {style === 'icon-left' ? (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gray-900 transition-colors duration-300">
                    <CheckCircleIcon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{feature}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{t('services.detail.features.featureDescription')}</p>
                  </div>
                </div>
              ) : style === 'numbered' ? (
                <>
                  <div className="text-3xl font-bold text-gray-100 mb-4 group-hover:text-gray-200 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{feature}</h3>
                  <p className="text-gray-500 leading-relaxed">{t('services.detail.features.featureDescription')}</p>
                </>
              ) : style === 'minimal' ? (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 flex-shrink-0" />
                  <h3 className="text-lg font-medium text-gray-900">{feature}</h3>
                </div>
              ) : (
                /* icon-top (default), bordered, gradient-border */
                <>
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                    <CheckCircleIcon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{feature}</h3>
                  <p className="text-gray-500 leading-relaxed">{t('services.detail.features.featureDescription')}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── PROCESS SECTION (numbered cards) ─────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function ProcessSection({ steps, processLayout }: { steps: ProcessStep[]; processLayout?: string }) {
  const { t } = useTranslations();
  const layout = processLayout || 'cards';

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-3 sm:mb-4">{t('services.detail.process.title')}</h2>
          <p className="text-sm sm:text-base text-gray-600">{t('services.detail.process.description')}</p>
        </div>

        {layout === 'timeline' ? (
          /* Timeline Layout */
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative pl-20 pb-12 last:pb-0"
              >
                <div className="absolute left-4 top-1 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                  {step.step}
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        ) : layout === 'steps-horizontal' ? (
          /* Horizontal Steps */
          <div className="flex flex-col md:flex-row gap-4 items-start">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex-1 text-center relative"
              >
                <div className="w-12 h-12 mx-auto bg-gray-900 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">
                  {step.step}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-0.5 bg-gray-200" />
                )}
                <h3 className="text-lg font-medium text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        ) : layout === 'zigzag' ? (
          /* Zigzag Layout */
          <div className="max-w-4xl mx-auto space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`flex items-start gap-8 ${index % 2 === 1 ? 'flex-row-reverse text-right' : ''}`}
              >
                <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Cards Layout (default) */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="absolute top-6 right-8 text-6xl font-bold text-gray-50 opacity-50 group-hover:text-gray-100 transition-colors select-none">
                  {String(step.step).padStart(2, '0')}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors">
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                      <ProcessIcon step={step.step} />
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── FAQ SECTION (Plus/Minus accordion) ───────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function FAQSection({ faq }: { faq: FAQItem[] }) {
  const { t } = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4">
            {t('services.detail.faq.title')}
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faq.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 text-base sm:text-lg pr-4">{item.question}</span>
                {openIndex === index ? (
                  <MinusIcon className="w-5 h-5 text-gray-900 flex-shrink-0" />
                ) : (
                  <PlusIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── PRICING SECTION (enhanced) ───────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function PricingSection({ packages }: { packages: PricingPackage[] }) {
  const { t } = useTranslations();

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-3 sm:mb-4">{t('services.detail.pricing.title')}</h2>
          <p className="text-sm sm:text-base text-gray-600">{t('services.detail.pricing.description')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`rounded-2xl p-4 sm:p-6 md:p-8 border bg-white transition-all duration-300 hover:shadow-lg ${
                pkg.highlighted
                  ? 'border-emerald-500 shadow-lg ring-2 ring-emerald-500/20 relative'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full">
                  {t('services.detail.pricing.mostPopular')}
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <div className="text-3xl font-bold text-gray-900 mb-1">{pkg.price}</div>
              {pkg.billingPeriod && (
                <p className="text-sm text-gray-500 mb-4">{pkg.billingPeriod}</p>
              )}
              {pkg.description && <p className="text-gray-600 mb-6">{pkg.description}</p>}
              <ul className="space-y-3 mb-8">
                {pkg.features?.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                href="/contact"
                variant={pkg.highlighted ? 'primary' : 'secondary'}
                size="md"
                className="w-full"
              >
                {pkg.ctaText || t('services.detail.pricing.getStarted')}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── SUB-SERVICES SECTION (grid of child services for parent pages) ──
// ═══════════════════════════════════════════════════════════════════════
function SubServicesSection({ subServices }: { subServices: SubServiceItem[] }) {
  const { t } = useTranslations();

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gray-900" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {t('services.detail.specializedServices')}
            </span>
            <div className="w-8 h-0.5 bg-gray-900" />
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            {t('services.detail.exploreSubServices')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('services.detail.exploreSubServicesDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {subServices.map((sub, index) => {
            const emojiIcon = iconMap[sub.icon || ''] || '🔧';
            return (
              <motion.div
                key={sub.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <LocalizedLink
                  href={`/services/${sub.slug}`}
                  className="block bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group h-full"
                >
                  <div className="text-3xl mb-4">{emojiIcon}</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {sub.name}
                  </h3>
                  {sub.shortDescription && (
                    <p className="text-gray-500 leading-relaxed mb-4 line-clamp-2">
                      {sub.shortDescription}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-400 group-hover:text-emerald-600 transition-colors">
                    {t('services.detail.learnMore')}
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </LocalizedLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
