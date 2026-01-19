'use client';

import { ServicePageHero } from '@/components/services';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.ragSolutions.hero"
      accentColor="blue"
      ctaHref="/contact"
      secondaryCtaHref="/services/rag-solutions/portfolio"
    />
  );
}
