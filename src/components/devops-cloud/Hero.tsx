'use client';

import { ServicePageHero } from '@/components/services';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.devopsCloud.hero"
      accentColor="blue"
      ctaHref="/contact"
      secondaryCtaHref="/services/devops-cloud/portfolio"
    />
  );
}
