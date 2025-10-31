// src/app/[locale]/kontakt/page.tsx (German)
import ContactHero from '@/components/ContactHero'
import ContactInfoSection from '@/components/ContactInfoSection'
import ContactForm from '@/components/ContactForm'
import MapSection from '@/components/MapSection'

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Kontakt – PakSoft',
  description: 'Starten Sie Ihr Projekt, erhalten Sie eine kostenlose Beratung.',
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