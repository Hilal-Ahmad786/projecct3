'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import LocalizedLink from '@/components/LocalizedLink';
import SplitHeading from '@/components/SplitHeading';
import ScrollRevealText from '@/components/ScrollRevealText';
import WebDevHeroVisual from './WebDevHeroVisual';
import { smoothSpring } from '@/lib/animations';

const TRUST_BADGES = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'AWS', 'Vercel'];

export default function WebDevHero({ serviceName, description }: { serviceName: string; description: string }) {
  const { locale, dir } = useTranslations();
  const t = useSectionTranslations('webDevPage');
  const prefersReducedMotion = useReducedMotion();
  const isRTL = dir === 'rtl';

  const headline = t('hero.headline') as string || 'We Build Websites That\nWork As Hard As You Do';
  const sub = t('hero.sub') as string || description;
  const cta1 = t('hero.cta1') as string || 'Start Your Project';
  const cta2 = t('hero.cta2') as string || 'See Our Work';

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
      style={{ paddingTop: 'calc(var(--navbar-h, 64px) + 1.5rem)' }}
      id="overview"
      dir={dir}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Gradient wash — top-left (İznik turquoise) */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-50 pointer-events-none"
        style={{ background: 'var(--accent-emerald-light)' }}
      />
      {/* Gradient wash — bottom-right (saffron) */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-40 pointer-events-none"
        style={{ background: 'var(--heritage-sand)' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* ── Breadcrumbs ── */}
        <motion.nav
          aria-label="Breadcrumb"
          {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } })}
          className={`flex items-center gap-1.5 text-xs text-gray-400 pt-6 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <LocalizedLink href="/" className="hover:text-gray-600 transition-colors">Home</LocalizedLink>
          <svg className={`w-3 h-3 text-gray-300 flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <LocalizedLink href="/services" className="hover:text-gray-600 transition-colors">Services</LocalizedLink>
          <svg className={`w-3 h-3 text-gray-300 flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-600 font-medium">Web Development</span>
        </motion.nav>

        <div className={`grid lg:grid-cols-2 gap-12 xl:gap-20 items-center ${isRTL ? 'lg:flex lg:flex-row-reverse' : ''}`}>

          {/* ── Left: copy ── */}
          <div className="space-y-8 max-w-xl">
            {/* Eyebrow */}
            <motion.div
              {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } })}
              className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-8 h-0.5 bg-heritage-turquoise" />
              <span className="text-overline text-heritage-turquoise">
                {t('hero.eyebrow') as string || 'Web Development Services'}
              </span>
            </motion.div>

            {/* Headline — split into two lines for impact */}
            <div>
              {headline.split('\n').map((line, i) => (
                <SplitHeading
                  key={i}
                  text={line}
                  tag="h1"
                  delay={i * 0.1}
                  className={`text-display font-light leading-none ${i === 1 ? 'font-semibold text-heritage-turquoise' : 'text-gray-900'}`}
                />
              ))}
            </div>

            {/* Sub description */}
            <ScrollRevealText className="text-lg text-gray-500 leading-relaxed">
              {sub}
            </ScrollRevealText>

            {/* CTAs */}
            <motion.div
              {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { ...smoothSpring, delay: 0.4 } })}
              className={`flex flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <LocalizedLink
                href="/contact"
                className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-8 py-3 rounded-sm hover:bg-gray-700 hover:border-gray-700 transition-all duration-250 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                {cta1}
                <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </LocalizedLink>
              <LocalizedLink
                href="/projects"
                className="inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-medium px-8 py-3 rounded-sm border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-250"
              >
                {cta2}
              </LocalizedLink>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              {...(prefersReducedMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: 0.6 } })}
              className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {TRUST_BADGES.map((badge, i) => (
                <motion.span
                  key={badge}
                  {...(prefersReducedMotion ? {} : { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3, delay: 0.65 + i * 0.05 } })}
                  className="text-[11px] font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors cursor-default"
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { ...smoothSpring, delay: 0.8 } })}
              className={`grid grid-cols-3 gap-6 pt-4 border-t border-gray-100 ${isRTL ? 'text-right' : ''}`}
            >
              {[
                { value: '350+', label: t('hero.stat1') as string || 'Projects Launched' },
                { value: '97/100', label: t('hero.stat2') as string || 'Lighthouse Score' },
                { value: '28M+', label: t('hero.stat3') as string || 'Monthly Users' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-snug">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: unique animated visual ── */}
          <motion.div
            {...(prefersReducedMotion ? {} : { initial: { opacity: 0, x: isRTL ? -40 : 40 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] } })}
            className="relative hidden lg:block will-change-transform lg:-mt-16"
          >
            <WebDevHeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold">Scroll</span>
          <motion.div
            className="w-5 h-8 border-2 border-gray-200 rounded-full flex justify-center pt-1.5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-1.5 bg-gray-400 rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
