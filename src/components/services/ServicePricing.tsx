'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import Button from '@/components/Button';
import { richColorMap } from '@/lib/heritage-accents';

export interface PricingPackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

interface ServicePricingProps {
  translationKey: string;
  packages?: PricingPackage[];
  accentColor?: 'purple' | 'blue' | 'emerald' | 'orange' | 'red' | 'violet' | 'cyan' | 'amber' | 'rose' | 'indigo';
}

// ── Localized UI labels (en/tr/de/ur/ar) ─────────────────────────────
type Loc = 'en' | 'tr' | 'de' | 'ur' | 'ar';
const L: Record<string, Record<Loc, string>> = {
  popular: { en: 'Most Popular', tr: 'En Popüler', de: 'Am beliebtesten', ur: 'سب سے مقبول', ar: 'الأكثر شيوعاً' },
  startProject: { en: 'Start Your Project', tr: 'Projenizi Başlatın', de: 'Projekt starten', ur: 'اپنا پروجیکٹ شروع کریں', ar: 'ابدأ مشروعك' },
  customTitle: {
    en: 'Need a Custom Solution?',
    tr: 'Özel Bir Çözüme mi İhtiyacınız Var?',
    de: 'Brauchen Sie eine individuelle Lösung?',
    ur: 'حسبِ ضرورت حل درکار ہے؟',
    ar: 'هل تحتاج إلى حل مخصص؟',
  },
  customDesc: {
    en: 'Contact us for a tailored solution that fits your specific requirements and budget.',
    tr: 'Gereksinimlerinize ve bütçenize uygun, size özel bir çözüm için bizimle iletişime geçin.',
    de: 'Kontaktieren Sie uns für eine Lösung, die zu Ihren Anforderungen und Ihrem Budget passt.',
    ur: 'اپنی مخصوص ضروریات اور بجٹ کے مطابق حل کے لیے ہم سے رابطہ کریں۔',
    ar: 'تواصل معنا للحصول على حل مصمم يناسب متطلباتك وميزانيتك.',
  },
};

export default function ServicePricing({
  translationKey,
  packages: customPackages,
  accentColor = 'purple',
}: ServicePricingProps) {
  const { dir, locale, isLoading } = useTranslations();
  const t = useSectionTranslations(translationKey);
  const tCommon = useSectionTranslations('common');
  const loc = (['en', 'tr', 'de', 'ur', 'ar'].includes(locale) ? locale : 'en') as Loc;
  const l = (key: keyof typeof L) => L[key][loc];
  // Missing keys come back as the key path — fall back to the inline label.
  const tSafe = (key: string, fallback: string) => {
    const v = t(key);
    return typeof v === 'string' && v && !v.includes(key) ? v : fallback;
  };

  const colors = richColorMap[accentColor] || richColorMap.emerald;

  if (isLoading) {
    return (
      <section className="min-h-screen pt-32 pb-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{tCommon('loading')}</p>
        </div>
      </section>
    );
  }

  // Default packages from translations or custom ones
  const packagesData = customPackages || [
    {
      name: t('packages.starter.name'),
      price: t('packages.starter.price'),
      description: t('packages.starter.description'),
      features: Array.isArray(t('packages.starter.features'))
        ? t('packages.starter.features')
        : [t('packages.starter.features')],
      highlighted: false,
    },
    {
      name: t('packages.professional.name'),
      price: t('packages.professional.price'),
      description: t('packages.professional.description'),
      features: Array.isArray(t('packages.professional.features'))
        ? t('packages.professional.features')
        : [t('packages.professional.features')],
      highlighted: true,
    },
    {
      name: t('packages.enterprise.name'),
      price: t('packages.enterprise.price'),
      description: t('packages.enterprise.description'),
      features: Array.isArray(t('packages.enterprise.features'))
        ? t('packages.enterprise.features')
        : [t('packages.enterprise.features')],
      highlighted: false,
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 bg-gray-50" dir={dir}>
      <div className="container mx-auto px-4">
        {/* Header — above the fold, no initial opacity:0 */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-3 mb-4">
            <span className={`w-8 h-px ${colors.bg} opacity-40`} />
            <span className={`${colors.text} font-semibold tracking-widest uppercase text-xs`}>
              {t('eyebrow')}
            </span>
            <span className={`w-8 h-px ${colors.bg} opacity-40`} />
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {packagesData.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative flex flex-col p-8 rounded-2xl bg-white transition-shadow duration-300 ${
                pkg.highlighted
                  ? `border-2 ${colors.border} shadow-xl md:-mt-4 md:mb-[-1rem]`
                  : 'border border-gray-200 hover:shadow-lg'
              }`}
            >
              {/* Popular badge */}
              {pkg.highlighted && (
                <span className={`absolute -top-3.5 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white ${colors.bg} shadow-sm whitespace-nowrap`}>
                  {l('popular')}
                </span>
              )}

              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {pkg.name}
              </h3>
              <div className={`text-4xl font-bold mb-3 tracking-tight ${colors.text}`}>
                {pkg.price}
              </div>
              <p className="mb-6 text-sm text-gray-600 leading-relaxed">
                {pkg.description}
              </p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`w-5 h-5 rounded-full ${colors.bgLight} flex items-center justify-center shrink-0 mt-0.5`}>
                      <CheckIcon className={`w-3.5 h-3.5 ${colors.text}`} />
                    </span>
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button
                  href={pkg.ctaHref || '/start-project'}
                  variant={pkg.highlighted ? 'primary' : 'secondary'}
                  size="lg"
                  className="w-full"
                >
                  {pkg.ctaText || l('startProject')}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom solution CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gray-900 px-6 py-10 md:px-12 text-center">
            <div className={`absolute -top-24 -end-24 w-64 h-64 rounded-full bg-gradient-to-br ${colors.gradient} opacity-20 blur-3xl pointer-events-none`} />
            <h3 className="relative z-10 text-2xl font-bold text-white mb-3 tracking-tight">
              {tSafe('customTitle', l('customTitle'))}
            </h3>
            <p className="relative z-10 text-gray-300 mb-6 max-w-xl mx-auto leading-relaxed">
              {tSafe('customDescription', l('customDesc'))}
            </p>
            <div className="relative z-10">
              <Button href="/contact" variant="secondary" size="lg">
                {tSafe('customCta', tCommon('contactUs') as string)}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
