'use client';

import { ServicePageHero } from '@/components/services';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.aiSolutions.hero"
      accentColor="blue"
      ctaHref="/contact"
      secondaryCtaHref="/services/ai-solutions/portfolio"
    />
  );
}
