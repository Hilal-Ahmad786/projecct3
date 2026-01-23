'use client';

import { ServicePageHero } from '@/components/services';
import { DataAnalyticsAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.ragSolutions.hero"
      accentColor="blue"
      ctaHref="/contact"
      secondaryCtaHref="/services/rag-solutions/portfolio"
      AnimationComponent={DataAnalyticsAnimation}
    />
  );
}
