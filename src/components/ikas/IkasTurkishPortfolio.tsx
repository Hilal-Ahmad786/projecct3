import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRightIcon, ArrowsRightLeftIcon, ClipboardDocumentListIcon, DevicePhoneMobileIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import Image from 'next/image';
import { IKAS_TR_BASE as base, IKAS_TR_ENQUIRY as enquiry } from './ikasTurkishCopy';
import IkasMotionScope from './IkasMotionScope';
import { IkasIcon, IkasPlatformNote } from './IkasMark';
import { IkasAppsSection, IkasStoreCase } from './IkasShowcase';
import IkasVisual from './visuals/IkasVisual';

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
    title: 'ikas Projeleri ve Mağaza Çalışmaları | PakSoft',
    description: "ikas Studio ile geliştirdiğimiz Canceviz Hurma mağazasını ve ikas uygulaması olarak çalışan yapay zekâ asistanımızı inceleyin. ikas projenizi PakSoft ile planlayın.",
  };
}

export default function IkasTurkishPortfolio() {
  return <>
    <IkasMotionScope />
    <InternalPageHero eyebrowIcon={<IkasIcon size={24} />} eyebrowNormalCase footnote={<IkasPlatformNote />}
      serviceName="ikas"
      accentWord="ikas Mağaza Projeleri"
      heading="ikas Projeleri ve Mağaza Çalışmaları"
      subtitle="ikas Studio ile geliştirdiğimiz Canceviz Hurma mağazasını ve ikas uygulaması olarak çalışan yapay zekâ asistanımızı inceleyin. Kendi mağazanız için kapsamı birlikte belirleyelim."
      scene={<div className="relative mx-auto max-w-lg"><div className="overflow-hidden rounded-xl border border-heritage-sand bg-white shadow-lg"><Image src="/images/portfolio/canceviz/canceviz-hurma-ana-sayfa.webp" alt="Canceviz Hurma ikas mağazasının ana sayfası" width={1440} height={611} priority sizes="(min-width: 1024px) 512px, 100vw" className="h-auto w-full" /></div><div className="absolute -bottom-8 -right-3 w-[48%] overflow-hidden rounded-lg border border-heritage-sand bg-white shadow-xl"><Image src="/images/portfolio/canceviz/canceviz-ai-agent-dashboard.webp" alt="" width={1440} height={611} sizes="250px" className="h-auto w-full" /></div><span className="absolute -left-3 -top-4 rounded-[18px] bg-white p-1 shadow-md ring-1 ring-black/5"><IkasIcon size={44} className="rounded-xl" /></span></div>}
      crumbs={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler', href: '/hizmetler' }, { label: 'ikas Geliştirme', href: base }, { label: 'Portföy' }]}
      actions={<><Action href={enquiry}>ikas Projemi Paylaş</Action><Action href="#ikas-calismalari" secondary>Projeleri İncele</Action></>}
    />

    <section id="ikas-calismalari" className="bg-background-gray scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)]">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-semibold text-heritage-turquoise-deep">ikas Portföyü</p>
        <h2 className="mt-2 max-w-3xl text-headline font-medium leading-tight text-gray-900">ikas üzerinde yaptığımız çalışmalar</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">{[
          { title: 'Canceviz Hurma mağazası', type: 'ikas Studio · Mağaza geliştirme', text: 'Hurma, kuruyemiş ve kuru meyve mağazası için tema, bölüm ve vitrin yapısı.', href: '#canceviz-hurma', img: '/images/portfolio/canceviz/canceviz-hurma-ana-sayfa.webp' },
          { title: 'Canceviz AI Agent', type: 'ikas uygulaması · Yapay zekâ', text: 'Müşteri desteği ve mağaza verisi sorularını yanıtlayan yapay zekâ asistanı.', href: '#ikas-uygulama-gelistirme', img: '/images/portfolio/canceviz/canceviz-ai-agent-dashboard.webp' },
        ].map(({ title, type, text, href, img }) => (
          <li key={href}><a href={href} data-ikas-reveal className={`ikas-card-motion group flex h-full flex-col overflow-hidden rounded-xl border border-heritage-sand bg-white ${focus}`}>
            <span className="block aspect-[1440/611] overflow-hidden border-b border-heritage-sand bg-heritage-ivory"><img src={img} alt="" loading="lazy" width={1440} height={611} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none" /></span>
            <span className="flex flex-1 flex-col p-5"><span className="flex items-center gap-2 text-xs font-semibold text-heritage-turquoise-deep"><IkasIcon size={16} />{type}</span><span className="mt-2 text-lg font-semibold text-gray-900">{title}</span><span className="mt-1 text-sm leading-6 text-gray-600">{text}</span><span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep">Ayrıntıları görün<ArrowRightIcon className="ikas-motion-icon h-4 w-4" aria-hidden="true" /></span></span>
          </a></li>
        ))}</ul>
      </div>
    </section>

    <section className="bg-white"><div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16"><IkasStoreCase id="canceviz-hurma" /></div></section>

    <IkasAppsSection />

    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="max-w-3xl text-headline font-medium leading-tight text-gray-900">ikas çalışma örneklerini değerlendirirken nelere bakabilirsiniz?</h2>
        <p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">Bir mağazayı kendi ihtiyaçlarınızla karşılaştırırken yalnızca görsel tarza değil, yapılan işin kapsamına da bakın. Benzer görünen mağazalar farklı veri ve operasyon ihtiyaçlarına sahip olabilir.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {evaluationPoints.map(({ title, text, Icon }, index) => <article key={title} data-ikas-reveal data-ikas-delay={index * 60} className="ikas-card-motion rounded-xl border border-heritage-sand bg-white p-5"><Icon className="ikas-motion-icon h-6 w-6 text-heritage-turquoise-deep" aria-hidden="true" /><h3 className="mt-3 font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></article>)}
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-gray-600">Görsel tasarım tek başına proje uygunluğunu göstermez. İhtiyaç duyduğunuz ürün akışını, düzenlenebilir alanları ve bağlantıları da göz önünde bulundurun. Her örnekte bu işlerin tamamının PakSoft tarafından yapıldığı varsayılmamalıdır.</p>
      </div>
    </section>

    <section className="bg-heritage-ivory">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center"><div>
        <h2 className="max-w-3xl text-headline font-medium leading-tight text-gray-900">Kendi ikas mağazanız için kapsamı birlikte belirleyelim</h2>
        <p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">Beğendiğiniz bir sayfa veya geliştirmek istediğiniz alan varsa paylaşabilirsiniz. İhtiyacınızı mevcut mağazanız, ürün yapınız ve günlük operasyonunuzla birlikte değerlendirerek uygulanacak işleri netleştirelim.</p>
        <div className="mt-5 flex flex-wrap gap-3"><Action href={enquiry}>ikas Projem İçin Görüşme Talep Et</Action><Link href={`${base}/ozellikler`} className={`inline-flex min-h-11 items-center px-3 text-sm font-semibold text-heritage-turquoise-deep underline underline-offset-4 ${focus}`}>ikas hizmet kapsamını incele</Link></div>
        </div><IkasVisual name="project-brief" className="mx-auto w-full max-w-md" /></div>
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
