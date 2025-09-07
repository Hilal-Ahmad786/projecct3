// src/app/projects/page.tsx
import BlogHero      from '@/components/BlogHero';
import FeaturedPostsSection   from '@/components/FeaturedPostsSection';
import TabbedPostsSection   from '@/components/TabbedPostsSection';
import TechApproachSection      from '@/components/TechApproachSection';
import SuccessMetricsSection      from '@/components/SuccessMetricsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaBanner         from '@/components/CtaBanner';

export default function ServicesPage() {
  return (
    <>
      <BlogHero />
      <FeaturedPostsSection />
      <TabbedPostsSection/>
      <TechApproachSection />
      <SuccessMetricsSection/>
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
