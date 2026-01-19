'use client';

import { ServicePageHero } from '@/components/services';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.dataAnalytics.hero"
      accentColor="emerald"
      ctaHref="/contact"
      secondaryCtaHref="/services/data-analytics/portfolio"
    />
  );
}
