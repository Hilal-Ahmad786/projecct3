// src/app/[locale]/hizmetler/page.tsx
import ServicesHero      from '@/components/ServicesHero';
import ServicesSection   from '@/components/ServicesSection';
import PricingSection    from '@/components/PricingSection';
import WhyUsSection      from '@/components/WhyUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaBanner         from '@/components/CtaBanner';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Hizmetler – PakSoft',
  description: 'Web geliştirme, AI çözümleri ve otomasyon dahil kapsamlı teknoloji hizmetleri.',
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