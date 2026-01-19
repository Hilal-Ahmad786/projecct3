'use client';

import { ServicePageHero } from '@/components/services';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.promptEngineering.hero"
      accentColor="violet"
      ctaHref="/contact"
      secondaryCtaHref="/services/prompt-engineering/portfolio"
    />
  );
}
