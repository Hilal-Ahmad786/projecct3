// src/app/[locale]/iletisim/page.tsx (Turkish)
import ContactHero from '@/components/ContactHero'
import ContactInfoSection from '@/components/ContactInfoSection'
import ContactForm from '@/components/ContactForm'
import MapSection from '@/components/MapSection'

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'İletişim – PakSoft',
  description: 'Projeni başlatmak için hemen yazın, ücretsiz ön görüşme alın.',
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