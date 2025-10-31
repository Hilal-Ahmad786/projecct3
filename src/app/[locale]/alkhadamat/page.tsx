// src/app/[locale]/alkhadamat/page.tsx
import ServicesHero      from '@/components/ServicesHero';
import ServicesSection   from '@/components/ServicesSection';
import PricingSection    from '@/components/PricingSection';
import WhyUsSection      from '@/components/WhyUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaBanner         from '@/components/CtaBanner';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'الخدمات – PakSoft',
  description: 'خدمات تقنية شاملة بما في ذلك تطوير الويب وحلول الذكاء الاصطناعي والأتمتة.',
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