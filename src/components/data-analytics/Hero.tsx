'use client';

import { ServicePageHero } from '@/components/services';
import { DataAnalyticsAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.dataAnalytics.hero"
      accentColor="emerald"
      ctaHref="/contact"
      secondaryCtaHref="/services/data-analytics/portfolio"
      AnimationComponent={DataAnalyticsAnimation}
    />
  );
}
