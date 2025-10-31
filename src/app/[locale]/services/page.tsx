// src/app/[locale]/services/page.tsx
import ServicesHero      from '@/components/ServicesHero';
import ServicesSection   from '@/components/ServicesSection';
import PricingSection    from '@/components/PricingSection';
import WhyUsSection      from '@/components/WhyUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaBanner         from '@/components/CtaBanner';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Services – PakSoft',
  description: 'Comprehensive technology services including web development, AI solutions, and automation.',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesSection />
      <PricingSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}