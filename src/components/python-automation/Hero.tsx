'use client';

import { ServicePageHero } from '@/components/services';
import { AutomationAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.pythonAutomation.hero"
      accentColor="amber"
      ctaHref="/contact"
      secondaryCtaHref="/services/python-automation/portfolio"
      AnimationComponent={AutomationAnimation}
    />
  );
}
