// src/app/projects/page.tsx
import ProjectsHero      from '@/components/ProjectsHero';
import ProjectsGallerySection   from '@/components/ProjectsGallerySection';
import FeaturedCaseStudySection    from '@/components/FeaturedCaseStudySection';
import TechApproachSection      from '@/components/TechApproachSection';
import SuccessMetricsSection      from '@/components/SuccessMetricsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaBanner         from '@/components/CtaBanner';

export default function ServicesPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsGallerySection />
      <FeaturedCaseStudySection />
      <TechApproachSection />
      <SuccessMetricsSection/>
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
