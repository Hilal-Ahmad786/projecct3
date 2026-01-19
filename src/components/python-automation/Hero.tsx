'use client';

import { ServicePageHero } from '@/components/services';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.pythonAutomation.hero"
      accentColor="amber"
      ctaHref="/contact"
      secondaryCtaHref="/services/python-automation/portfolio"
    />
  );
}
