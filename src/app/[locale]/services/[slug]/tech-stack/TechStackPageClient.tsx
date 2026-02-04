'use client';

import { motion, useInView } from 'framer-motion';
import LocalizedLink from '@/components/LocalizedLink';
import { useRef } from 'react';
import { ArrowRightIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import {
  SubPageBgPattern,
  FloatingDecorations,
  SubPageHeroVisual,
  type SubPageAnimation
} from '@/components/services/subpage-animations';
import { useTranslations } from '@/hooks/useTranslations';

interface Technology {
  name: string;
  icon: string;
}

interface TechStackPageClientProps {
  serviceName: string;
  serviceSlug: string;
  serviceColor?: string;
  technologies: Technology[];
  animation?: SubPageAnimation;
  locale: string;
}

// Tech icon mapping
const techIcons: Record<string, string> = {
  react: '⚛', nextjs: '▲', typescript: '◇', javascript: '◆', nodejs: '⬢',
  python: '◈', django: '◇', postgresql: '◐', mongodb: '◑', redis: '◉',
  docker: '◫', kubernetes: '⎈', aws: '◧', gcp: '◨', azure: '◩',
  graphql: '◈', tailwind: '◇', figma: '◆', git: '◐', default: '○',
  tensorflow: '◇', pytorch: '◈', openai: '◉', vue: '◆', angular: '◇',
  flutter: '◈', swift: '◇', kotlin: '◆', rust: '◉', go: '◐',
};

function getTechIcon(iconName: string): string {
  const key = iconName.toLowerCase().replace(/[^a-z]/g, '');
  return techIcons[key] || techIcons.default;
}

export default function TechStackPageClient({
  serviceName,
  serviceSlug,
  technologies,
  animation,
  locale
}: TechStackPageClientProps) {
  const { t } = useTranslations();
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: '-100px' });

  // Get animation config or use defaults for tech-stack page
  const config = animation || {
    heroVisual: 'circuit-board' as const,
    bgPattern: 'hexagons' as const,
    decorations: 'hexagons' as const,
    motion: 'pulse' as const,
    primaryColor: '#8B5CF6',
    secondaryColor: '#06B6D4',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] pt-32 pb-24 overflow-hidden">
        {/* Background Pattern */}
        <SubPageBgPattern pattern={config.bgPattern} opacity={0.05} />

        {/* Floating Decorations */}
        <FloatingDecorations type={config.decorations} accentColor={config.primaryColor} />

        {/* Hero Visual */}
        <div className="absolute right-[2%] top-1/2 -translate-y-1/2 hidden xl:block">
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <SubPageHeroVisual
              type={config.heroVisual}
              motionType={config.motion}
              primaryColor={config.primaryColor}
              secondaryColor={config.secondaryColor}
            />
          </motion.div>
        </div>

        {/* Floating Tech Symbols */}
        {['◇', '⬢', '◈'].map((symbol, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute text-5xl hidden lg:block"
            style={{
              top: `${30 + i * 15}%`,
              right: `${8 + i * 5}%`,
              color: config.primaryColor + '40',
            }}
          >
            {symbol}
          </motion.div>
        ))}

        {/* Breadcrumb - Outside fading container */}
        <div className="container mx-auto px-4 relative z-20 mb-8">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-gray-400"
          >
            <LocalizedLink href="/services" className="hover:text-gray-900 transition-colors">{t('services.detail.breadcrumb.services')}</LocalizedLink>
            <span className="text-gray-300">/</span>
            <LocalizedLink href={`/services/${serviceSlug}`} className="hover:text-gray-900 transition-colors">{serviceName}</LocalizedLink>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">{t('services.detail.breadcrumb.techStack')}</span>
          </motion.nav>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: config.primaryColor + '20' }}
              >
                <CpuChipIcon className="w-5 h-5" style={{ color: config.primaryColor }} />
              </motion.div>
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: config.primaryColor }}>
                {t('services.detail.techStack.eyebrow')}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 leading-[1.1] tracking-tight"
            >
              {t('services.detail.techStack.heroTitle')}
              <br />
              <span className="font-semibold" style={{ color: config.primaryColor }}>{t('services.detail.techStack.heroTitleAccent')}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12"
            >
              {t('services.detail.techStack.heroDescription')}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-16 border-t border-gray-100 pt-8"
            >
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.5 }}
                  className="text-5xl font-light"
                  style={{ color: config.primaryColor }}
                >
                  {technologies.length}+
                </motion.div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.techStack.stats.technologies')}</div>
              </div>
              <div>
                <div className="text-5xl font-light text-gray-900">{t('services.detail.techStack.stats.openSource')}</div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.techStack.stats.sourceFirst')}</div>
              </div>
              <div>
                <div className="text-5xl font-light text-gray-900">∞</div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.techStack.stats.scalable')}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Grid Section */}
      <section className="py-32 bg-gray-50" ref={gridRef}>
        <div className="container mx-auto px-4">
          {technologies.length === 0 ? (
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 border-2 flex items-center justify-center mx-auto mb-6"
                style={{ borderColor: config.primaryColor }}
              >
                <span className="text-3xl" style={{ color: config.primaryColor }}>◇</span>
              </motion.div>
              <h2 className="text-2xl font-light text-gray-900 mb-2">{t('services.detail.techStack.comingSoon')}</h2>
              <p className="text-gray-500">{t('services.detail.techStack.preparingDocs')}</p>
            </div>
          ) : (
            <>
              {/* Section Header */}
              <div className="max-w-2xl mx-auto text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center gap-3 mb-6"
                >
                  <div className="w-8 h-px bg-gray-300" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                    {t('services.detail.techStack.ourStack')}
                  </span>
                  <div className="w-8 h-px bg-gray-300" />
                </motion.div>
              </div>

              {/* Staggered Grid Animation */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 bg-gray-200 max-w-5xl mx-auto">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-8 text-center group cursor-default relative overflow-hidden"
                  >
                    {/* Hover Background */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.05 }}
                      className="absolute inset-0"
                      style={{ backgroundColor: config.primaryColor }}
                    />

                    <motion.div
                      className="text-4xl mb-3 transition-all duration-300 group-hover:scale-110"
                      style={{ color: config.primaryColor + '80' }}
                      whileHover={{ scale: 1.2, rotate: 5, color: config.primaryColor }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {getTechIcon(tech.icon)}
                    </motion.div>
                    <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors relative z-10">
                      {tech.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why These Technologies */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-8 h-px bg-gray-900" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                    {t('services.detail.techStack.philosophy.eyebrow')}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-light text-gray-900 mb-6"
                >
                  {t('services.detail.techStack.philosophy.title')}
                  <br />
                  <span className="font-semibold" style={{ color: config.primaryColor }}>{t('services.detail.techStack.philosophy.titleAccent')}</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-500 leading-relaxed"
                >
                  {t('services.detail.techStack.philosophy.description')}
                </motion.p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {[
                  { symbol: '◇', label: t('services.detail.techStack.philosophy.performance'), desc: t('services.detail.techStack.philosophy.performanceDesc') },
                  { symbol: '⬢', label: t('services.detail.techStack.philosophy.scalability'), desc: t('services.detail.techStack.philosophy.scalabilityDesc') },
                  { symbol: '◈', label: t('services.detail.techStack.philosophy.security'), desc: t('services.detail.techStack.philosophy.securityDesc') },
                  { symbol: '○', label: t('services.detail.techStack.philosophy.community'), desc: t('services.detail.techStack.philosophy.communityDesc') },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ y: -5 }}
                    className="text-center group"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      className="text-3xl mb-3 transition-colors"
                      style={{ color: config.primaryColor + '60' }}
                    >
                      {item.symbol}
                    </motion.div>
                    <h3 className="font-medium text-gray-900 mb-1 group-hover:translate-y-[-2px] transition-transform">
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Animated hexagon */}
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 opacity-10"
          viewBox="0 0 200 200"
        >
          <polygon points="100,10 190,50 190,150 100,190 10,150 10,50" fill="none" stroke="white" strokeWidth="1" />
        </motion.svg>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              {t('services.detail.techStack.cta.title')}
            </h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              {t('services.detail.techStack.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocalizedLink
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-gray-900 font-medium transition-all hover:scale-105"
                style={{ backgroundColor: config.primaryColor }}
              >
                {t('services.detail.techStack.cta.startProject')}
                <ArrowRightIcon className="w-4 h-4" />
              </LocalizedLink>
              <LocalizedLink
                href={`/services/${serviceSlug}/portfolio`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-700 text-white font-medium hover:bg-white/5 transition-colors"
              >
                {t('services.detail.techStack.cta.viewPortfolio')}
              </LocalizedLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
