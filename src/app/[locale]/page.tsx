// src/app/page.tsx
import Hero from '@/components/Hero'
import ServicesSection from '@/components/ServicesSection'
import ProjectDetailSection from '@/components/ProjectDetailSection'
import DemoSection from '@/components/DemoSection'
import ClientJourneyRoadmap from '@/components/ClientJourneyRoadmap'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import ContactSection from '@/components/ContactSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProjectDetailSection />
      <DemoSection />
      <ClientJourneyRoadmap />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  )
}
