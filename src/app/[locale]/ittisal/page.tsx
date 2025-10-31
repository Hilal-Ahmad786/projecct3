// src/app/[locale]/ittisal/page.tsx (Arabic)
import ContactHero from '@/components/ContactHero'
import ContactInfoSection from '@/components/ContactInfoSection'
import ContactForm from '@/components/ContactForm'
import MapSection from '@/components/MapSection'

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'اتصال – PakSoft',
  description: 'ابدأ مشروعك اليوم، احصل على استشارة مجانية.',
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