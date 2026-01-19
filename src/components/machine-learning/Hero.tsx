'use client';

import { ServicePageHero } from '@/components/services';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.machineLearning.hero"
      accentColor="violet"
      ctaHref="/contact"
      secondaryCtaHref="/services/machine-learning/portfolio"
    />
  );
}
