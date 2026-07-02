'use client';

import { useState, useRef, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { trackServiceView } from '@/lib/analytics';
import SocialProofBanner from '@/components/SocialProofBanner';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  PlusIcon, MinusIcon, ChevronRightIcon, ArrowRightIcon,
  StarIcon, UserGroupIcon, ClockIcon, TrophyIcon,
  ShieldCheckIcon, BoltIcon, ChatBubbleLeftRightIcon, CpuChipIcon,
  CodeBracketIcon, DevicePhoneMobileIcon, GlobeAltIcon, SparklesIcon,
  PaintBrushIcon, MegaphoneIcon, ShoppingCartIcon, CloudIcon,
  ServerStackIcon, LightBulbIcon, WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';
import ServicePortfolio from '@/components/services/ServicePortfolio';
import ServiceRequestCTA from '@/components/services/ServiceRequestCTA';
import {
  TestimonialsSection, CaseStudySection, ComparisonSection, PricingMetaPanel,
  type TestimonialItem, type CaseStudyData, type ComparisonData, type PricingMetaData,
} from '@/components/services/DetailExtras';
import { HeroVisual, BgPatternRenderer, DecorationRenderer, type ServiceAnimation } from '@/components/services/hero-visuals';
import { useTranslations } from '@/hooks/useTranslations';
import { formatPrice } from '@/lib/currency';

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
    testimonials?: TestimonialItem[];
    caseStudy?: CaseStudyData;
    comparison?: ComparisonData;
    pricingMeta?: PricingMetaData;
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
import { AccentColor, colorMap, accentColors } from '@/lib/heritage-accents';

// ── Icon map (emoji fallback for sub-service cards) ──────────────────
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

// ── Heroicon map for hero section ─────────────────────────────────────
type HeroIconComponent = React.ComponentType<{ className?: string }>;
const heroIconMap: Record<string, HeroIconComponent> = {
  code:            CodeBracketIcon,
  cpu:             CpuChipIcon,
  'device-mobile': DevicePhoneMobileIcon,
  bolt:            BoltIcon,
  cog:             WrenchScrewdriverIcon,
  'chart-bar':     ServerStackIcon,
  brain:           SparklesIcon,
  chat:            ChatBubbleLeftRightIcon,
  api:             GlobeAltIcon,
  'paint-brush':   PaintBrushIcon,
  megaphone:       MegaphoneIcon,
  'shopping-cart': ShoppingCartIcon,
  cloud:           CloudIcon,
  shield:          ShieldCheckIcon,
  light:           LightBulbIcon,
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
type SectionKey =
  | 'hero' | 'portfolio' | 'technologies' | 'features' | 'process' | 'whyUs'
  | 'faq' | 'pricing' | 'subServices' | 'cta'
  | 'comparison' | 'caseStudy' | 'testimonials';

export default function ServiceDetailClient({
  service,
  hideHero = false,
  showSections,
}: {
  service: ServiceDetailData;
  hideHero?: boolean;
  showSections?: SectionKey[];
}) {
  const { t, locale } = useTranslations();
  const accent: AccentColor = colorMap[service.color || ''] || 'emerald';
  const colors = accentColors[accent];

  // Remarketing: record service-page views (GA4 view_item + FB ViewContent).
  useEffect(() => {
    trackServiceView(service.name, service.slug);
  }, [service.slug, service.name]);

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

  const richCapabilities = service._jsonContent?.services?.items ?? [];
  const whyUsBenefits = service._jsonContent?.whyUs?.benefits ?? [];
  const tWhyUs = t('services.detail.whyUs.benefits');
  const translatedWhyUsDefaults: WhyUsBenefit[] = Array.isArray(tWhyUs) && tWhyUs.length > 0
    ? (tWhyUs as WhyUsBenefit[])
    : DEFAULT_WHY_US_BENEFITS;

  const show = (key: SectionKey) => !showSections || showSections.includes(key);

  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      {show('hero') && !hideHero && (
        <div id="overview">
          <HeroSection service={service} colors={colors} accent={accent} process={process} animation={animation} />
        </div>
      )}

      {/* ── 1b. Stats bar — numbers before adjectives ────────────────── */}
      {show('hero') && <StatsBar accent={accent} />}

      {/* ── 2. Portfolio (Recent Projects) ───────────────────────────── */}
      {show('portfolio') && portfolio.length > 0 && <ServicePortfolio portfolio={portfolio} />}

      {/* ── 3. Tech Strip (scrolling) ───────────────────────────────── */}
      {show('technologies') && (
        <div id="technologies">
          {technologies.length > 0 && <TechStrip technologies={technologies} />}
        </div>
      )}

      {/* ── 4. Rich Capabilities OR Simple Features ─────────────────── */}
      {show('features') && (
        <div id="features">
          {richCapabilities.length > 0
            ? <CapabilitiesSection items={richCapabilities} jsonContent={service._jsonContent?.services} />
            : features.length > 0 && <FeaturesSection features={features} featureStyle={animation?.featureStyle} />
          }
        </div>
      )}

      {/* ── 4b. Benefits checklist (service.benefits[] from DB) ─────── */}
      {show('features') && benefits.length > 0 && <BenefitsSection benefits={benefits} t={t} />}

      {/* ── 4c. Comparison — "is this approach right for you?" ──────── */}
      {show('comparison') && service.content.comparison && (
        <ComparisonSection comparison={service.content.comparison} />
      )}

      {/* ── 5. Process (numbered cards) ─────────────────────────────── */}
      {show('process') && (
        <div id="process">
          {process.length > 0 && <ProcessSection steps={process} processLayout={animation?.processLayout} />}
        </div>
      )}

      {/* ── 5b. Mini case study — story with numbers ────────────────── */}
      {show('caseStudy') && service.content.caseStudy && (
        <CaseStudySection caseStudy={service.content.caseStudy} />
      )}

      {/* ── 6. Why Choose Us ────────────────────────────────────────── */}
      {show('whyUs') && (
        <WhyUsSection
          benefits={whyUsBenefits.length > 0 ? whyUsBenefits : translatedWhyUsDefaults}
          jsonContent={service._jsonContent?.whyUs}
        />
      )}

      {/* ── 6b. Testimonials ────────────────────────────────────────── */}
      {show('testimonials') && (service.content.testimonials?.length ?? 0) > 0 && (
        <TestimonialsSection testimonials={service.content.testimonials!} />
      )}

      {/* ── 7. FAQ (Plus/Minus accordion) ───────────────────────────── */}
      {show('faq') && (
        <div id="faq">
          {faq.length > 0 && <FAQSection faq={faq} />}
        </div>
      )}

      {/* ── 8. Pricing (packages, or "starting from" when quote-first) ─ */}
      {show('pricing') && (
        <div id="pricing">
          {pricingPackages.length > 0
            ? <PricingSection packages={pricingPackages} locale={locale} />
            : service.content.pricingMeta && (
                <PricingMetaPanel pricingMeta={service.content.pricingMeta} serviceSlug={service.slug} />
              )}
        </div>
      )}

      {/* ── 9. Sub-Services Grid (for parent services) ────────────── */}
      {show('subServices') && subServices.length > 0 && <SubServicesSection subServices={subServices} />}

      {/* ── 10. Social proof — trust signals before the ask ─────────── */}
      {show('cta') && <SocialProofBanner variant="combined" />}

      {/* ── 11. CTA with project request modal ──────────────────────── */}
      {show('cta') && <ServiceRequestCTA serviceType={service.slug} />}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── STATS BAR ────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
const STATS = [
  { icon: TrophyIcon,    value: '500+', labelKey: 'projectsDelivered', fallback: 'Projects Delivered' },
  { icon: UserGroupIcon, value: '300+', labelKey: 'happyClients',      fallback: 'Happy Clients'      },
  { icon: StarIcon,      value: '98%',  labelKey: 'satisfactionRate',  fallback: 'Satisfaction Rate'  },
  { icon: ClockIcon,     value: '5+',   labelKey: 'yearsExpertise',    fallback: 'Years of Expertise' },
];

function StatsBar({ accent }: { accent: AccentColor }) {
  const colors = accentColors[accent];
  const { t } = useTranslations();

  return (
    <div className="w-full bg-gray-950 border-y border-gray-800/60">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map(({ icon: Icon, value, labelKey, fallback }, i) => {
            const translated = t(`services.detail.stats.${labelKey}`);
            const label = typeof translated === 'string' && !translated.startsWith('services.') ? translated : fallback;
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flex flex-col items-center justify-center py-6 px-4 text-center
                ${i < 3 ? 'md:border-r border-gray-800/60' : ''}
                ${i === 0 ? 'border-r border-gray-800/60 md:border-r' : ''}
                ${i === 1 ? 'md:border-r border-gray-800/60' : ''}
                ${i === 2 ? 'border-r border-gray-800/60 md:border-r' : ''}
              `}
            >
              <div className={`w-9 h-9 rounded-xl ${colors.blob1} flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${colors.eyebrow}`} />
              </div>
              <div className={`text-3xl font-bold ${colors.eyebrow} leading-none mb-1`}>{value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mt-1">{label}</div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── RICH CAPABILITIES SECTION (from _jsonContent.services.items) ─────
// ═══════════════════════════════════════════════════════════════════════
interface CapabilityItem { title: string; description: string; features?: string[] }
interface CapabilitiesJsonMeta { eyebrow?: string; title?: string; titleAccent?: string; subtitle?: string }

function CapabilitiesSection({
  items,
  jsonContent,
}: {
  items: CapabilityItem[];
  jsonContent?: CapabilitiesJsonMeta;
}) {
  const { t } = useTranslations();
  const title = jsonContent?.title || t('services.detail.features.title');
  const subtitle = jsonContent?.subtitle || t('services.detail.features.description');
  const eyebrow = jsonContent?.eyebrow;

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {eyebrow && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gray-400" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{eyebrow}</span>
              <div className="w-8 h-0.5 bg-gray-400" />
            </div>
          )}
          <h2 className="text-headline text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 font-light">{subtitle}</p>}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group flex flex-col"
            >
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CpuChipIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{item.description}</p>
              {item.features && item.features.length > 0 && (
                <ul className="space-y-1.5 mt-auto pt-4 border-t border-gray-100">
                  {item.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircleIcon className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── BENEFITS SECTION (simple checklist, fallback) ────────────────────
// ═══════════════════════════════════════════════════════════════════════
function BenefitsSection({ benefits, t }: { benefits: string[]; t: (key: string) => string }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-headline text-gray-900 mb-4">{t('services.detail.benefits.title')}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
            >
              <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── WHY US SECTION (from _jsonContent.whyUs.benefits) ────────────────
// ═══════════════════════════════════════════════════════════════════════
const WHY_US_ICONS = [ShieldCheckIcon, BoltIcon, StarIcon, ChatBubbleLeftRightIcon, TrophyIcon, UserGroupIcon];

const DEFAULT_WHY_US_BENEFITS: WhyUsBenefit[] = [
  { title: 'Expert Team',               description: 'Our specialists bring years of hands-on experience to every project, ensuring high-quality delivery.' },
  { title: 'On-Time Delivery',          description: 'We respect your timeline. Every milestone is tracked and met through agile project management.' },
  { title: 'Transparent Communication', description: 'You are always in the loop. Regular updates and open channels keep collaboration seamless.' },
  { title: 'Scalable Solutions',        description: 'We build for growth. Our architectures handle increasing load without costly rewrites.' },
  { title: 'Client-First Approach',     description: 'Your goals drive every decision. We prioritise value delivery over technical complexity.' },
  { title: 'Post-Launch Support',       description: 'Our engagement does not end at launch. We provide ongoing maintenance and performance monitoring.' },
];
interface WhyUsBenefit { title: string; description: string }
interface WhyUsJsonMeta { eyebrow?: string; title?: string; titleAccent?: string; subtitle?: string }

function WhyUsSection({
  benefits,
  jsonContent,
}: {
  benefits: WhyUsBenefit[];
  jsonContent?: WhyUsJsonMeta;
}) {
  const { t } = useTranslations();
  const title = jsonContent?.title || t('services.detail.whyUs.title') || 'Why Choose Us';
  const subtitle = jsonContent?.subtitle;
  const eyebrow = jsonContent?.eyebrow;

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {eyebrow && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gray-600" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{eyebrow}</span>
              <div className="w-8 h-0.5 bg-gray-600" />
            </div>
          )}
          <h2 className="text-headline text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-400 font-light">{subtitle}</p>}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = WHY_US_ICONS[index % WHY_US_ICONS.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 transition-colors group"
              >
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                  <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
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
  const HeroIcon: HeroIconComponent = heroIconMap[service.icon || ''] || WrenchScrewdriverIcon;
  const hasAnimation = !!animation;
  const parentService = service.parentService;

  return (
    <section className="relative overflow-hidden bg-white pt-[calc(var(--navbar-h,64px)+1rem)] pb-20 lg:pt-[calc(var(--navbar-h,64px)+1.25rem)] lg:pb-28">
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
            {/* Breadcrumb — mt keeps a small gap below the fixed header on mobile */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mt-3 lg:mt-5">
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
              <h1 className="text-display font-light text-gray-900 leading-none">
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
            {/*
              Hero now shows the concise `shortDescription` so the hero stays
              compact (≈3–5 lines) and doesn't push the animation below the fold.
              The longer `fullDescription` is preserved on `service` (and in the
              DB) for reuse in a dedicated overview section later. `line-clamp-5`
              is a safety cap for the rare service whose shortDescription is long.
              Previous (full-description) version kept here on purpose:
                {service.fullDescription || service.description}
            */}
            <p className="text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed line-clamp-5">
              {service.shortDescription || service.fullDescription || service.description}
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
                    >
                      <HeroIcon className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 ${colors.eyebrow}`} />
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

      {/* Scroll Indicator – animated mouse */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
      >
        {/* Mouse body */}
        <div className="w-[22px] h-[34px] rounded-full border-2 border-gray-300 group-hover:border-gray-500 transition-colors duration-300 flex items-start justify-center pt-[5px]">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[3px] h-[8px] bg-gray-400 group-hover:bg-gray-600 transition-colors duration-300 rounded-full"
          />
        </div>
        {/* Animated chevrons */}
        <div className="flex flex-col items-center gap-0.5">
          {[0, 0.15, 0.3].map((delay, i) => (
            <motion.svg
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay }}
              className="w-3 h-3 text-gray-300 group-hover:text-gray-500 transition-colors duration-300"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          ))}
        </div>
        <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-gray-300 group-hover:text-gray-500 transition-colors duration-300">
          Scroll
        </span>
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
          <h2 className="text-headline text-gray-900 mb-4 sm:mb-6">
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
// ── PROCESS STEP ILLUSTRATIONS ───────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════

function DiscoveryIllustration({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 80 56" className="w-full h-full" fill="none">
      {/* Document */}
      <rect x="16" y="4" width="34" height="44" rx="3" stroke="#d1d5db" strokeWidth="1.5" fill="white" />
      <rect x="16" y="4" width="34" height="8" rx="3" fill="#f3f4f6" />
      {/* Checkbox rows */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="22" y={18 + i * 10} width="6" height="6" rx="1" stroke="#9ca3af" strokeWidth="1" fill="white" />
          <motion.path
            d={`M23.5 ${21 + i * 10} l2 2 3 -3`}
            stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.25 }}
          />
          <motion.rect
            x="32" y={20 + i * 10} width={i === 0 ? 12 : i === 1 ? 9 : 11} height="2" rx="1" fill="#d1d5db"
            initial={{ scaleX: 0, originX: 0 }} style={{ transformOrigin: '32px center' }}
            animate={active ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.25 }}
          />
        </g>
      ))}
      {/* Magnifier */}
      <motion.g
        initial={{ opacity: 0, scale: 0.5, x: 8, y: -4 }}
        animate={active ? { opacity: 1, scale: 1, x: 0, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ transformOrigin: '58px 22px' }}
      >
        <circle cx="58" cy="22" r="10" stroke="#374151" strokeWidth="1.5" fill="white" />
        <circle cx="58" cy="22" r="5" stroke="#6b7280" strokeWidth="1" fill="#f9fafb" />
        <line x1="65" y1="29" x2="70" y2="34" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

function DesignIllustration({ active }: { active: boolean }) {
  const boxes = [
    { x: 12, y: 6, w: 56, h: 12 },   // header bar
    { x: 12, y: 22, w: 22, h: 26 },  // sidebar
    { x: 38, y: 22, w: 30, h: 12 },  // main top
    { x: 38, y: 38, w: 30, h: 10 },  // main bottom
  ];
  return (
    <svg viewBox="0 0 80 56" className="w-full h-full" fill="none">
      {boxes.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x} y={b.y} width={b.w} height={b.h} rx="2"
          fill={i === 0 ? '#f3f4f6' : 'white'} stroke="#d1d5db" strokeWidth="1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.2 + i * 0.15 }}
          style={{ transformOrigin: `${b.x + b.w / 2}px ${b.y + b.h / 2}px` }}
        />
      ))}
      {/* Pencil */}
      <motion.g
        initial={{ opacity: 0, rotate: -20 }}
        animate={active ? { opacity: 1, rotate: 0 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        style={{ transformOrigin: '66px 10px' }}
      >
        <rect x="60" y="4" width="4" height="14" rx="1" fill="#374151" transform="rotate(30 64 10)" />
        <path d="M62 17 l-2 4 4-1 z" fill="#6b7280" transform="rotate(30 64 10)" />
      </motion.g>
      {/* Color dots */}
      {['#60a5fa', '#34d399', '#f472b6'].map((c, i) => (
        <motion.circle
          key={c} cx={16 + i * 7} cy={52} r="3" fill={c}
          initial={{ scale: 0 }} animate={active ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.9 + i * 0.08, type: 'spring', bounce: 0.5 }}
          style={{ transformOrigin: `${16 + i * 7}px 52px` }}
        />
      ))}
    </svg>
  );
}

function DevelopIllustration({ active }: { active: boolean }) {
  const lines = [
    { y: 14, w: 52, color: '#c792ea', indent: 0 },
    { y: 22, w: 38, color: '#82aaff', indent: 8 },
    { y: 30, w: 44, color: '#c3e88d', indent: 8 },
    { y: 38, w: 28, color: '#ff9d00', indent: 16 },
    { y: 46, w: 20, color: '#82aaff', indent: 8 },
  ];
  return (
    <svg viewBox="0 0 80 56" className="w-full h-full" fill="none">
      {/* Editor window */}
      <rect x="4" y="4" width="72" height="48" rx="3" fill="#0f111a" />
      <rect x="4" y="4" width="72" height="9" rx="3" fill="#181926" />
      {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
        <circle key={c} cx={11 + i * 7} cy="8.5" r="2.5" fill={c} opacity="0.7" />
      ))}
      {lines.map((l, i) => (
        <motion.rect
          key={i} x={8 + l.indent} y={l.y} rx="1"
          height="4" fill={l.color}
          initial={{ width: 0 }}
          animate={active ? { width: l.w - l.indent } : { width: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.18, ease: 'easeOut' }}
        />
      ))}
      {/* Cursor blink */}
      {active && (
        <motion.rect x="10" y="46" width="1.5" height="6" rx="0.5" fill="white"
          animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </svg>
  );
}

function DeployIllustration({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 80 56" className="w-full h-full" fill="none">
      {/* Server blocks */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="8" y={8 + i * 14} width="40" height="10" rx="2" fill="white" stroke="#e5e7eb" strokeWidth="1" />
          <motion.circle
            cx="16" cy={13 + i * 14} r="3"
            fill={i === 0 ? '#22c55e' : '#d1d5db'}
            initial={{ fill: '#d1d5db' }}
            animate={active ? { fill: i === 0 ? '#22c55e' : i === 1 ? '#22c55e' : '#22c55e' } : {}}
            transition={{ delay: 0.4 + i * 0.4, duration: 0.3 }}
          />
          <motion.rect
            x="22" y={11 + i * 14} height="2" rx="1" fill="#e5e7eb"
            initial={{ width: 0 }}
            animate={active ? { width: 20 } : { width: 0 }}
            transition={{ delay: 0.3 + i * 0.3, duration: 0.4 }}
          />
        </g>
      ))}
      {/* Live badge */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0 }}
        transition={{ delay: 1.4, type: 'spring', bounce: 0.4 }}
        style={{ transformOrigin: '62px 20px' }}
      >
        <rect x="52" y="12" width="22" height="14" rx="7" fill="#111827" />
        <motion.circle cx="60" cy="19" r="3" fill="#22c55e"
          animate={active ? { opacity: [1, 0.3, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity, delay: 1.6 }}
        />
        <text x="65" y="22" fontSize="5" fontWeight="700" fill="white" fontFamily="monospace">LIVE</text>
      </motion.g>
      {/* Arrow up trend */}
      <motion.path
        d="M56 48 L60 40 L65 44 L70 34"
        stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      />
    </svg>
  );
}

const STEP_ILLUSTRATIONS = [DiscoveryIllustration, DesignIllustration, DevelopIllustration, DeployIllustration];

function ProcessStepCard({ step, index, total }: { step: ProcessStep; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });
  const IllustrationComp = STEP_ILLUSTRATIONS[index % STEP_ILLUSTRATIONS.length];
  const num = String(step.step).padStart(2, '0');

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      {/* Connecting arrow — right side, hidden on last item */}
      {index < total - 1 && (
        <div className="hidden md:flex absolute top-[52px] -right-px z-10 items-center">
          <motion.div
            className="h-px bg-gray-300 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ width: '100%' }}
          />
          <svg className="w-3 h-3 text-gray-300 -ml-1 flex-shrink-0" viewBox="0 0 12 12" fill="currentColor">
            <path d="M4 2l5 4-5 4V2z" />
          </svg>
        </div>
      )}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-300 group h-full flex flex-col"
      >
        {/* Illustration area */}
        <div className="relative bg-gray-50 border-b border-gray-100 px-4 pt-4 pb-3" style={{ height: 88 }}>
          <IllustrationComp active={isInView} />
          {/* Step number badge */}
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
            <span className="text-[11px] font-bold text-gray-700">{num}</span>
          </div>
        </div>

        {/* Text */}
        <div className="p-5 flex flex-col gap-2 flex-1">
          <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-gray-700 transition-colors">
            {step.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── PROCESS SECTION ──────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function ProcessSection({ steps, processLayout }: { steps: ProcessStep[]; processLayout?: string }) {
  const { t } = useTranslations();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-px bg-gray-300" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {t('services.detail.process.eyebrow') || 'How We Work'}
            </span>
            <div className="w-8 h-px bg-gray-300" />
          </motion.div>
          <motion.h2
            className="text-headline text-gray-900 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('services.detail.process.title')}
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('services.detail.process.description')}
          </motion.p>
        </div>

        {/* Steps — responsive flex/grid */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-3 lg:gap-5 items-stretch">
          {steps.map((step, i) => (
            <ProcessStepCard key={i} step={step} index={i} total={steps.length} />
          ))}
        </div>
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
          <h2 className="text-headline text-gray-900 mb-4">
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
function PricingSection({ packages, locale }: { packages: PricingPackage[]; locale: string }) {
  const { t } = useTranslations();

  // Try to parse pkg.price as a TRY number (e.g., stored as "15000") and reformat.
  // If it contains a non-numeric character, display as-is (already formatted string from admin).
  function displayPrice(raw: string): string {
    const num = parseFloat(raw.replace(/[₺$€£,\s]/g, ''));
    if (!isNaN(num) && num > 0 && /^\d[\d,.\s]*$/.test(raw.trim())) {
      return formatPrice(num, locale);
    }
    return raw;
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-headline text-gray-900 mb-3 sm:mb-4">{t('services.detail.pricing.title')}</h2>
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
              <div className="text-3xl font-bold text-gray-900 mb-1">{displayPrice(pkg.price)}</div>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {subServices.map((sub, index) => {
            const SubIcon: HeroIconComponent = heroIconMap[sub.icon || ''] || WrenchScrewdriverIcon;
            const subAccent: AccentColor = colorMap[sub.color || ''] || 'emerald';
            const subColors = accentColors[subAccent];
            return (
              <motion.div
                key={sub.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <LocalizedLink
                  href={`/services/${sub.slug}`}
                  className="flex flex-col bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group h-full"
                >
                  <div className={`w-11 h-11 rounded-xl ${subColors.blob1} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <SubIcon className={`w-5 h-5 ${subColors.eyebrow}`} />
                  </div>
                  <h3 className={`text-base font-semibold text-gray-900 mb-2 group-hover:${subColors.titleAccent} transition-colors`}>
                    {sub.name}
                  </h3>
                  {sub.shortDescription && (
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                      {sub.shortDescription}
                    </p>
                  )}
                  <div className={`flex items-center gap-1.5 text-xs font-semibold text-gray-400 group-hover:${subColors.eyebrow} transition-colors mt-auto`}>
                    {t('services.detail.learnMore')}
                    <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
