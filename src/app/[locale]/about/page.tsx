// src/app/about/page.tsx
import AboutHero from '@/components/AboutHero'
import OurStoryTimeline from '@/components/OurStoryTimeline'
import VisionMissionSection from '@/components/VisionMissionSection'
import TeamSection from '@/components/TeamSection'
import CtaBanner from '@/components/CtaBanner'


export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <VisionMissionSection />
      <TeamSection />
      <OurStoryTimeline />
      <CtaBanner/>
    </>
  )
}
