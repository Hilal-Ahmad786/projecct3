import Image from 'next/image';
import Link from '@/components/IntentLink';
import { ArrowRightIcon, ArrowTopRightOnSquareIcon, CheckIcon } from '@heroicons/react/24/outline';
import { CustomEcommerceIcon } from './CustomEcommerceIcon';

// Real custom e-commerce case: Shop Lamees (shoplamees.com), a Next.js abaya
// store PakSoft built (the live footer credits PakSoft). Screenshots are taken
// from the live site; keep the copy to what the site visibly does.

export const SHOP_LAMEES_URL = 'https://www.shoplamees.com/';
const img = '/images/portfolio/shop-lamees';
const enquiry = '/tr/start-project?service=custom-ecommerce';
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';

const points = [
  'Arapça (sağdan sola) ve İngilizce arayüz, QAR para birimi seçimi.',
  'Fiyat, renk, kumaş ve bedene göre filtrelenen katalog; koleksiyon ve kampanya sayfaları.',
  'Santim cinsinden beden seçimi, zorunlu kesim tipi seçeneği, stok durumu ve ürün yakınlaştırma.',
  'Ölçüye özel dikim talepleri için WhatsApp üzerinden adım adım sipariş akışı.',
  'Mobilde alt gezinme çubuğuyla ana sayfa, kategoriler, sepet ve hesaba hızlı erişim.',
];

function Shot({ src, alt, className = '', caption }: { src: string; alt: string; className?: string; caption?: string }) {
  return (
    <figure className={`m-0 ${className}`}>
      <div data-custom-ecom-reveal className="overflow-hidden rounded-xl border border-heritage-sand bg-white shadow-sm">
        <Image src={src} alt={alt} width={1440} height={900} sizes="(min-width: 1024px) 560px, 100vw" className="h-auto w-full" />
      </div>
      {caption && <figcaption className="mt-2 text-xs text-gray-500">{caption}</figcaption>}
    </figure>
  );
}

export default function ShopLameesCase({ id = 'shop-lamees', headingLevel = 2 }: { id?: string; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <section id={id} className="bg-white scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 sm:px-6 cw-section lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-heritage-sand bg-heritage-ivory px-3 py-1 text-xs font-semibold text-gray-700"><CustomEcommerceIcon className="h-4 w-4" />Next.js ile geliştirildi · Canlı proje</span>
          <H className={`reveal mt-4 ${headingLevel === 2 ? 'text-headline' : 'text-title'} font-medium leading-tight text-gray-900`}>Özel E-Ticaret Sitesi Örneği: Shop Lamees</H>
          <p className="mt-4 text-body leading-relaxed text-gray-600">Körfez ülkelerine satış yapan abaya markası Shop Lamees için Arapça ve İngilizce çalışan özel e-ticaret sitesini Next.js ile geliştirdik. Hazır platform teması yerine mağaza arayüzünü, katalog filtrelerini ve sipariş akışını markanın satış biçimine göre kurguladık.</p>
          <ul className="mt-5 space-y-2.5">
            {points.map((point) => <li key={point} className="flex gap-3 text-sm leading-6 text-gray-700"><CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-heritage-turquoise-deep" aria-hidden="true" />{point}</li>)}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={SHOP_LAMEES_URL} target="_blank" rel="noopener" className={`inline-flex items-center gap-1.5 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focus}`}>shoplamees.com&apos;u ziyaret edin<ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (yeni sekmede açılır)</span></a>
            <Link href={enquiry} className={`inline-flex items-center gap-2 text-sm font-semibold text-gray-900 underline-offset-4 hover:underline ${focus}`}>Benzer bir mağaza planlayalım<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="relative">
          <Shot src={`${img}/shop-lamees-ana-sayfa.webp`} alt="Shop Lamees ana sayfası: Arapça menü, koleksiyon bağlantıları ve abaya kampanya görseli" />
          <div className="absolute -left-3 top-[40%] hidden w-[27%] sm:block lg:-left-8">
            <div data-custom-ecom-reveal className="overflow-hidden rounded-2xl border-4 border-gray-900 bg-white shadow-lg">
              <Image src={`${img}/shop-lamees-mobil.webp`} alt="Shop Lamees ürün sayfasının mobil görünümü ve alt gezinme çubuğu" width={600} height={1080} sizes="170px" className="h-auto w-full" />
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:ms-[29%] sm:grid-cols-2">
            <Shot src={`${img}/shop-lamees-urun-sayfasi.webp`} alt="Shop Lamees ürün sayfası: santim cinsinden beden, kesim tipi seçimi, stok durumu ve sepete ekleme" />
            <Shot src={`${img}/shop-lamees-kategori-filtreler.webp`} alt="Shop Lamees kategori sayfası: fiyat, renk ve kumaş filtreleri ile ürün kartları" />
          </div>
          <p className="mt-2 text-right text-xs text-gray-500 sm:ms-[29%]">shoplamees.com · canlı siteden ekran görüntüleri</p>
        </div>
      </div>
    </section>
  );
}
