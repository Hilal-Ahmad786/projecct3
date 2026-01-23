'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import Button from '@/components/Button';

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

const colorClasses = {
  purple: {
    bg: 'bg-purple-600',
    bgHover: 'hover:bg-purple-700',
    bgLight: 'bg-purple-50',
    text: 'text-purple-600',
    textLight: 'text-purple-100',
    textLighter: 'text-purple-50',
    textHighlight: 'text-purple-200',
    ring: 'ring-purple-300',
    border: 'border-purple-600',
  },
  blue: {
    bg: 'bg-blue-600',
    bgHover: 'hover:bg-blue-700',
    bgLight: 'bg-blue-50',
    text: 'text-blue-600',
    textLight: 'text-blue-100',
    textLighter: 'text-blue-50',
    textHighlight: 'text-blue-200',
    ring: 'ring-blue-300',
    border: 'border-blue-600',
  },
  emerald: {
    bg: 'bg-emerald-600',
    bgHover: 'hover:bg-emerald-700',
    bgLight: 'bg-emerald-50',
    text: 'text-emerald-600',
    textLight: 'text-emerald-100',
    textLighter: 'text-emerald-50',
    textHighlight: 'text-emerald-200',
    ring: 'ring-emerald-300',
    border: 'border-emerald-600',
  },
  orange: {
    bg: 'bg-orange-600',
    bgHover: 'hover:bg-orange-700',
    bgLight: 'bg-orange-50',
    text: 'text-orange-600',
    textLight: 'text-orange-100',
    textLighter: 'text-orange-50',
    textHighlight: 'text-orange-200',
    ring: 'ring-orange-300',
    border: 'border-orange-600',
  },
  red: {
    bg: 'bg-red-600',
    bgHover: 'hover:bg-red-700',
    bgLight: 'bg-red-50',
    text: 'text-red-600',
    textLight: 'text-red-100',
    textLighter: 'text-red-50',
    textHighlight: 'text-red-200',
    ring: 'ring-red-300',
    border: 'border-red-600',
  },
  violet: {
    bg: 'bg-violet-600',
    bgHover: 'hover:bg-violet-700',
    bgLight: 'bg-violet-50',
    text: 'text-violet-600',
    textLight: 'text-violet-100',
    textLighter: 'text-violet-50',
    textHighlight: 'text-violet-200',
    ring: 'ring-violet-300',
    border: 'border-violet-600',
  },
  cyan: {
    bg: 'bg-cyan-600',
    bgHover: 'hover:bg-cyan-700',
    bgLight: 'bg-cyan-50',
    text: 'text-cyan-600',
    textLight: 'text-cyan-100',
    textLighter: 'text-cyan-50',
    textHighlight: 'text-cyan-200',
    ring: 'ring-cyan-300',
    border: 'border-cyan-600',
  },
  amber: {
    bg: 'bg-amber-600',
    bgHover: 'hover:bg-amber-700',
    bgLight: 'bg-amber-50',
    text: 'text-amber-600',
    textLight: 'text-amber-100',
    textLighter: 'text-amber-50',
    textHighlight: 'text-amber-200',
    ring: 'ring-amber-300',
    border: 'border-amber-600',
  },
  rose: {
    bg: 'bg-rose-600',
    bgHover: 'hover:bg-rose-700',
    bgLight: 'bg-rose-50',
    text: 'text-rose-600',
    textLight: 'text-rose-100',
    textLighter: 'text-rose-50',
    textHighlight: 'text-rose-200',
    ring: 'ring-rose-300',
    border: 'border-rose-600',
  },
  indigo: {
    bg: 'bg-indigo-600',
    bgHover: 'hover:bg-indigo-700',
    bgLight: 'bg-indigo-50',
    text: 'text-indigo-600',
    textLight: 'text-indigo-100',
    textLighter: 'text-indigo-50',
    textHighlight: 'text-indigo-200',
    ring: 'ring-indigo-300',
    border: 'border-indigo-600',
  },
};

export default function ServicePricing({
  translationKey,
  packages: customPackages,
  accentColor = 'purple',
}: ServicePricingProps) {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations(translationKey);
  const tCommon = useSectionTranslations('common');

  const colors = colorClasses[accentColor];

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className={`${colors.text} font-medium tracking-wider uppercase text-sm mb-4 block`}>
            {t('eyebrow')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packagesData.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-2xl ${
                pkg.highlighted
                  ? `${colors.bg} text-white ring-4 ${colors.ring}`
                  : 'bg-white border border-gray-200'
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-2 ${
                  pkg.highlighted ? 'text-white' : 'text-gray-900'
                }`}
              >
                {pkg.name}
              </h3>
              <div
                className={`text-4xl font-bold mb-4 ${
                  pkg.highlighted ? 'text-white' : colors.text
                }`}
              >
                {pkg.price}
              </div>
              <p className={`mb-6 ${pkg.highlighted ? colors.textLight : 'text-gray-600'}`}>
                {pkg.description}
              </p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckIcon
                      className={`w-5 h-5 flex-shrink-0 ${
                        pkg.highlighted ? colors.textHighlight : colors.text
                      }`}
                    />
                    <span className={pkg.highlighted ? colors.textLighter : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                href={pkg.ctaHref || '/contact'}
                variant={pkg.highlighted ? 'secondary' : 'primary'}
                size="lg"
                className="w-full"
              >
                {pkg.ctaText || t('cta') || tCommon('getQuote')}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Custom solution CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {t('customTitle') || 'Need a Custom Solution?'}
          </h3>
          <p className="text-gray-600 mb-6">
            {t('customDescription') || 'Contact us for a tailored solution that fits your specific requirements and budget.'}
          </p>
          <Button href="/contact" variant="primary" size="lg">
            {t('customCta') || tCommon('contactUs')}
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
