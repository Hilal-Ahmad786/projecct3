// src/app/[locale]/raabta/page.tsx (Urdu)
import ContactHero from '@/components/ContactHero'
import ContactInfoSection from '@/components/ContactInfoSection'
import ContactForm from '@/components/ContactForm'
import MapSection from '@/components/MapSection'

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'رابطہ – PakSoft',
  description: 'آج ہی اپنا پروجیکٹ شروع کریں، مفت مشاورت حاصل کریں۔',
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