// src/app/[locale]/contact/page.tsx
import ContactHero from '@/components/ContactHero'
import ContactInfoSection from '@/components/ContactInfoSection'
import ContactForm from '@/components/ContactForm'
import MapSection from '@/components/MapSection'

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contact – PakSoft',
  description: 'Start your project today, get a free consultation.',
}

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      <ContactHero />
      <ContactInfoSection />
      <ContactForm />
      <MapSection />
    </main>
  )
}