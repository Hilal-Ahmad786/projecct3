import Image from 'next/image';
import Link from '@/components/IntentLink';
import { ArrowRightIcon, ArrowTopRightOnSquareIcon, BuildingStorefrontIcon, CheckIcon } from '@heroicons/react/24/outline';

// Real marketplace case: Otograde (otograde.com), a damaged-vehicle listing
// marketplace PakSoft built (the live site credits PakSoft). Screenshots come
// from the live site; keep the copy to what the site visibly does. It is a
// listing marketplace: buyers and dealers agree directly, so claim no online
// payment, commission or order split here.

export const OTOGRADE_URL = 'https://otograde.com/';
const img = '/images/portfolio/otograde';
const enquiry = '/tr/start-project?service=marketplace-development';
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';

const points = [
  'Galeri ve bireysel satıcılar için bayi başvurusu, ilan yönetimi yapılan bayi paneli ve bayi profil sayfaları.',
  'Araçların hasar ağırlığını A–E arasında gösteren grade sistemi; alıcı ilanları grade ile filtreler.',
  'Kazalı, pert, sel hasarlı, çekme belgeli ve hurda gibi hasar türleri; marka, model, yıl, kilometre, yakıt ve şehir filtreleri.',
  'İlan sayfasında WhatsApp, teklif verme ve mesaj formuyla satıcıya doğrudan ulaşma; karşılaştırma, favori ve kayıtlı arama.',
  'Aracını hızlı satmak isteyenler için teklif formu, şehir sayfaları ve rehber içerikleri.',
];

function Shot({ src, alt, width = 1440, height = 900 }: { src: string; alt: string; width?: number; height?: number }) {
  return (
    <figure className="m-0">
      <div data-custom-ecom-reveal className="overflow-hidden rounded-xl border border-heritage-sand bg-white shadow-sm">
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 560px, 100vw" className="h-auto w-full" />
      </div>
    </figure>
  );
}

export default function OtogradeCase({ id = 'otograde' }: { id?: string }) {
  return (
    <section id={id} className="bg-white scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 sm:px-6 cw-section lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-heritage-sand bg-heritage-ivory px-3 py-1 text-xs font-semibold text-gray-700"><BuildingStorefrontIcon className="h-4 w-4 text-heritage-turquoise-deep" aria-hidden="true" />Çok satıcılı ilan pazaryeri · Canlı proje</span>
          <h2 className="reveal mt-4 text-headline font-medium leading-tight text-gray-900">Pazaryeri Projesi Örneği: Otograde</h2>
          <p className="mt-4 text-body leading-relaxed text-gray-600">Hasarlı araç alım satımı için geliştirdiğimiz Otograde, galerilerin ve bireysel satıcıların ilan verdiği, alıcıların araçları hasar derecesine göre karşılaştırdığı bir pazaryeridir. Pazarlık ve satış alıcıyla satıcı arasında yapıldığı için platformu sipariş ve komisyon akışı yerine satıcı yönetimi, ilan kalitesi ve iletişim üzerine kurguladık.</p>
          <ul className="mt-5 space-y-2.5">
            {points.map((point) => <li key={point} className="flex gap-3 text-sm leading-6 text-gray-700"><CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-heritage-turquoise-deep" aria-hidden="true" />{point}</li>)}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={OTOGRADE_URL} target="_blank" rel="noopener" className={`inline-flex items-center gap-1.5 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focus}`}>otograde.com&apos;u ziyaret edin<ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (yeni sekmede açılır)</span></a>
            <Link href={enquiry} className={`inline-flex items-center gap-2 text-sm font-semibold text-gray-900 underline-offset-4 hover:underline ${focus}`}>Benzer bir pazaryeri planlayalım<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="relative">
          <Shot src={`${img}/otograde-ilan-arama.webp`} alt="Otograde hasarlı araç ilanları: hasar türü etiketleri, marka, yıl ve kilometre filtreleri, grade rozetli ilan kartları" />
          <div className="absolute -left-3 top-[34%] hidden w-[24%] sm:block lg:-left-8">
            <div data-custom-ecom-reveal className="overflow-hidden rounded-2xl border-4 border-gray-900 bg-white shadow-lg">
              <Image src={`${img}/otograde-mobil.webp`} alt="Otograde ana sayfasının mobil görünümü: arama kutusu ve grade filtreleri" width={600} height={1000} sizes="150px" className="h-auto w-full" />
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:ms-[26%] sm:grid-cols-2">
            <Shot src={`${img}/otograde-ilan-detay.webp`} alt="Otograde ilan sayfası: fotoğraf galerisi, grade rozeti, onaylı bayi kartı, WhatsApp, teklif ver ve mesaj gönder" />
            <Shot src={`${img}/otograde-bayi-ol.webp`} alt="Otograde bayi sayfası: bayi paneli, doğrudan alıcı iletişimi ve A–E grade sistemiyle ilan" />
          </div>
          <p className="mt-2 text-right text-xs text-gray-500 sm:ms-[26%]">otograde.com · canlı siteden ekran görüntüleri</p>
        </div>
      </div>
    </section>
  );
}

/** Portföy hero: the live Otograde home page plus phone frame. */
export function OtogradeHeroShot() {
  return (
    <div className="relative pb-12 pe-6">
      <div data-custom-ecom-reveal className="overflow-hidden rounded-xl border border-heritage-sand bg-white shadow-md">
        <Image src={`${img}/otograde-ana-sayfa.webp`} alt="Otograde ana sayfası: hasarlı araç arama kutusu ve A–E grade filtreleri" width={1440} height={500} sizes="(min-width: 1024px) 560px, 90vw" className="h-auto w-full" priority />
      </div>
      <div data-ikas-loop className="ikas-badge-float absolute -bottom-2 end-0 w-[22%] overflow-hidden rounded-2xl border-4 border-gray-900 bg-white shadow-lg">
        <Image src={`${img}/otograde-mobil.webp`} alt="Otograde ana sayfasının mobil görünümü" width={600} height={1000} sizes="150px" className="h-auto w-full" />
      </div>
      <span className="absolute bottom-0 start-0 inline-flex items-center gap-1.5 rounded-full border border-heritage-sand bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm"><span className="h-2 w-2 rounded-full bg-heritage-turquoise" aria-hidden="true" />otograde.com · canlı proje</span>
    </div>
  );
}
