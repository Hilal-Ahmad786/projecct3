'use client';

import { ServicePageHero } from '@/components/services';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.computerVision.hero"
      accentColor="rose"
      ctaHref="/contact"
      secondaryCtaHref="/services/computer-vision/portfolio"
    />
  );
}
