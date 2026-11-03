import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRightIcon, ArrowsRightLeftIcon, ClipboardDocumentListIcon, DevicePhoneMobileIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import { PortfolioScene } from '@/components/services/hero-visuals/scenes-internal';
import { IKAS_TR_BASE as base, IKAS_TR_ENQUIRY as enquiry } from './ikasTurkishCopy';

const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';

function Action({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition-colors motion-reduce:transition-none ${focus} ${secondary ? 'border border-heritage-sand bg-white text-gray-900 hover:bg-heritage-ivory' : 'bg-heritage-turquoise text-white hover:bg-heritage-turquoise-deep'}`}>{children}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>;
}

const evaluationPoints = [
  { title: 'Ürün sunumu', text: 'Kategori, ürün bilgileri ve varyantların mağaza yapınızda nasıl ele alınacağını düşünün.', Icon: Squares2X2Icon },
  { title: 'Mobil kullanım', text: 'Menü, görseller ve ürün seçeneklerinin küçük ekranda anlaşılır ve kullanılabilir olmasını değerlendirin.', Icon: DevicePhoneMobileIcon },
  { title: 'İçerik yönetimi', text: 'Mağaza ekibinizin hangi alanları kendisinin güncellemesi gerektiğini belirleyin.', Icon: ClipboardDocumentListIcon },
  { title: 'Operasyon ihtiyacı', text: 'Ödeme, kargo veya diğer sistem bağlantılarınızın ihtiyaç duyduğunuz kapsamla eşleşip eşleşmediğini ayırın.', Icon: ArrowsRightLeftIcon },
];

export function getIkasTurkishPortfolioMeta() {
  return {
    title: 'ikas Mağaza Projenizi Planlayın | PakSoft',
    description: 'ikas mağazanız için tasarım, kurulum ve geliştirme ihtiyaçlarını PakSoft ile değerlendirin. Hizmet kapsamını ve proje sürecini inceleyerek başlayın.',
  };
}

export default function IkasTurkishPortfolio() {
  return <>
    <InternalPageHero
      serviceName="ikas"
      accentWord="ikas Mağaza Projeleri"
      heading="ikas Mağaza Projenizi Birlikte Planlayalım"
      subtitle="Yeni mağaza kurulumu veya mevcut ikas sitenizin geliştirilmesi için ihtiyaçlarınızı paylaşın. Tasarım, ürün yapısı ve bağlantı gereksinimlerini birlikte değerlendirerek çalışma kapsamını belirleyelim."
      scene={<PortfolioScene />}
      crumbs={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler', href: '/hizmetler' }, { label: 'ikas Geliştirme', href: base }, { label: 'Portföy' }]}
      actions={<><Action href={enquiry}>ikas Projemi Paylaş</Action><Action href={`${base}/ozellikler`} secondary>Hizmet Kapsamını İncele</Action></>}
    />

    <section id="ikas-calismalari" className="bg-background-gray scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)]">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-overline font-semibold text-heritage-turquoise-deep">ikas Portföyü</p>
        <h2 className="mt-2 max-w-3xl text-headline font-medium leading-tight text-gray-900">Yayınlanan örnekler hakkında</h2>
        <div className="mt-6 max-w-3xl rounded-xl border border-heritage-sand bg-white p-5 sm:p-7">
          <p className="text-body leading-relaxed text-gray-700">Bu alanda henüz paylaşılmış bir ikas çalışma örneği bulunmuyor. Yapılabilecek işleri ve nasıl ilerlediğimizi hizmet kapsamı ve süreç sayfalarından inceleyebilirsiniz.</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            <Link href={`${base}/ozellikler`} className={`inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focus}`}>ikas hizmet özellikleri <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href={`${base}/surec`} className={`inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focus}`}>Proje süreci <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="max-w-3xl text-headline font-medium leading-tight text-gray-900">Çalışma örneklerini değerlendirirken nelere bakabilirsiniz?</h2>
        <p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">Bir mağazayı kendi ihtiyaçlarınızla karşılaştırırken yalnızca görsel tarza değil, yapılan işin kapsamına da bakın. Benzer görünen mağazalar farklı veri ve operasyon ihtiyaçlarına sahip olabilir.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {evaluationPoints.map(({ title, text, Icon }) => <article key={title} className="rounded-xl border border-heritage-sand bg-white p-5"><Icon className="h-6 w-6 text-heritage-turquoise-deep" aria-hidden="true" /><h3 className="mt-3 font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></article>)}
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-gray-600">Görsel tasarım tek başına proje uygunluğunu göstermez. İhtiyaç duyduğunuz ürün akışını, düzenlenebilir alanları ve bağlantıları da göz önünde bulundurun. Her örnekte bu işlerin tamamının PakSoft tarafından yapıldığı varsayılmamalıdır.</p>
      </div>
    </section>

    <section className="bg-heritage-ivory">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="max-w-3xl text-headline font-medium leading-tight text-gray-900">Kendi ikas mağazanız için kapsamı birlikte belirleyelim</h2>
        <p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">Beğendiğiniz bir sayfa veya geliştirmek istediğiniz alan varsa paylaşabilirsiniz. İhtiyacınızı mevcut mağazanız, ürün yapınız ve günlük operasyonunuzla birlikte değerlendirerek uygulanacak işleri netleştirelim.</p>
        <div className="mt-5 flex flex-wrap gap-3"><Action href={enquiry}>ikas Projem İçin Görüşme Talep Et</Action><Link href={`${base}/ozellikler`} className={`inline-flex min-h-11 items-center px-3 text-sm font-semibold text-heritage-turquoise-deep underline underline-offset-4 ${focus}`}>ikas hizmet kapsamını incele</Link></div>
        <nav aria-label="ikas hizmet sayfaları" className="mt-8 border-t border-heritage-sand pt-5">
          <h3 className="text-sm font-semibold text-gray-900">İlgili ikas sayfaları</h3>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-sm">{[
            ['Genel Bakış', base], ['Özellikler', `${base}/ozellikler`], ['Süreç', `${base}/surec`], ['Fiyatlandırma', `${base}/fiyatlandirma`],
          ].map(([label, href]) => <li key={href}><Link href={href} className={`font-medium text-heritage-turquoise-deep underline-offset-4 hover:underline ${focus}`}>{label}</Link></li>)}</ul>
        </nav>
      </div>
    </section>
  </>;
}
