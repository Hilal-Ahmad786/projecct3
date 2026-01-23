'use client';

import { ServicePageHero } from '@/components/services';
import { UIUXAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.uiUxDesign.hero"
      accentColor="rose"
      ctaHref="/contact"
      secondaryCtaHref="/services/ui-ux-design/portfolio"
      AnimationComponent={UIUXAnimation}
    />
  );
}
