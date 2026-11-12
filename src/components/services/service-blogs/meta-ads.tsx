import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ArrowDownIcon, ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import type { CtaCopy, CtaStage } from '@/components/services/ServiceArticle';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/meta-ads/manifest.json';

const servicePath = '/tr/hizmetler/meta-ads';
const enquiry = '/tr/start-project?service=meta-ads';

// DIAG-1/2/3 from the content pack: real HTML text (no raster numbers), a short accessible
// caption, flows that stack on mobile, one-time CSS entrance switched off for reduced motion.
const card = 'rounded-xl border border-heritage-turquoise/25 bg-white p-4 shadow-sm';
const enter = (i: number) => ({ 'data-custom-ecom-reveal': '', 'data-custom-ecom-delay': i * 60 });

function JourneyDiagram() {
  const steps = [['Reklam', 'Mesaj açık mı?'], ['Açılış sayfası', 'Teklif tutarlı mı?'], ['İşlem', 'İşlem tamamlandı mı?'], ['İşletme kaydı', 'Sonuç geçerli mi?']];
  return <figure className="my-8 rounded-2xl border border-heritage-sand bg-heritage-ivory p-5 sm:p-6">
    <figcaption className="font-semibold text-gray-900">Reklamdan işletme kaydına: her adımda sorulacak soru</figcaption>
    <ol className="mt-5 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
      {steps.map(([title, question], i) => <li key={title} className="contents">
        <div {...enter(i)} className={`${card} flex-1`}>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-heritage-turquoise-light text-xs font-semibold text-heritage-turquoise-deep">{i + 1}</span>
          <p className="mt-2 font-semibold text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-600">{question}</p>
        </div>
        {i < steps.length - 1 && <span aria-hidden="true" className="flex justify-center text-heritage-turquoise"><ArrowDownIcon className="h-4 w-4 lg:hidden" /><ArrowRightIcon className="hidden h-4 w-4 lg:block" /></span>}
      </li>)}
    </ol>
  </figure>;
}

function ChecklistDiagram() {
  const items = [['Hedef', 'Başarı sayılan işlem yazılı'], ['Yetki', 'Gerekli varlıklara doğru ekip erişebiliyor'], ['Teklif', 'Reklam ve sayfa birbiriyle tutarlı'], ['Mobil deneyim', 'Temel işlem akışı tamamlanabiliyor'], ['İçerik', 'Görsel, metin ve kullanım izinleri kontrol edilmiş'], ['Ölçüm', 'Başarılı işlem ve tekrar kayıt kontrol edilmiş'], ['Harcama', 'Bütçe ve sorumluluklar net'], ['Takip', 'Başvuruyu veya siparişi değerlendirecek kişi belli']];
  return <figure className="my-8 rounded-2xl border border-heritage-sand bg-heritage-ivory p-5 sm:p-6">
    <figcaption className="font-semibold text-gray-900">Yayın öncesi sekiz kontrol</figcaption>
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {items.map(([title, text], i) => <li key={title} {...enter(i % 4)} className={`${card} flex gap-3`}>
        <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-heritage-turquoise text-white"><CheckIcon className="h-4 w-4" /></span>
        <span><span className="block font-semibold text-gray-900">{title}</span><span className="block text-sm text-gray-600">{text}</span></span>
      </li>)}
    </ul>
  </figure>;
}

function ContributionDiagram() {
  const box = (title: string, value: string, i: number, strong = false) => <div {...enter(i)} className={`${card} flex-1 text-center ${strong ? 'border-heritage-turquoise bg-heritage-turquoise-light' : ''}`}><p className="text-sm text-gray-600">{title}</p><p className="mt-1 text-lg font-semibold text-gray-900">{value}</p></div>;
  const op = (sign: string) => <span aria-hidden="true" className="flex items-center justify-center text-2xl font-light text-heritage-turquoise-deep">{sign}</span>;
  return <figure className="my-8 rounded-2xl border border-heritage-sand bg-heritage-ivory p-5 sm:p-6">
    <figcaption className="font-semibold text-gray-900">Başvuru başına beklenen katkı (temsili hesap)</figcaption>
    <div className="mt-5 flex flex-col gap-2 md:flex-row md:items-stretch">
      {box('Satış başına katkı', '2.000 TL', 0)}{op('×')}{box('Başvurudan satışa dönüşme', '%10', 1)}{op('=')}{box('Başvuru başına beklenen katkı', '200 TL', 2, true)}
    </div>
    <p className="mt-4 text-sm text-gray-600">Temsili hesap; yönetim, üretim, sabit giderler ve kâr hedefi hariç. PakSoft sonucu, piyasa ortalaması veya bütçe önerisi değildir.</p>
  </figure>;
}

const diagrams: Record<string, () => React.JSX.Element> = {
  '[[META_DIAG:one]]': JourneyDiagram,
  '[[META_DIAG:two]]': ChecklistDiagram,
  '[[META_DIAG:three]]': ContributionDiagram,
};
const renderMarker = (marker: string) => {
  const Diagram = diagrams[marker];
  return Diagram ? <Diagram /> : null;
};

const link = (label: string, href: string) => ({ label, href });
const cta = (heading: string, text: string, primary: string, secondary: [string, string]): CtaCopy => ({ heading, text, primary: link(primary, enquiry), secondary: link(...secondary) });
const defaultCta = cta('Meta reklam planınızı birlikte değerlendirelim', 'Hedefinizi, web sitenizi ve mevcut reklam durumunuzu paylaşın.', 'Meta Reklam Teklifi Al', ['Yönetim Kapsamını İncele', `${servicePath}/ozellikler`]);

// Per-article CTA copy from the content pack (middle banner + closing).
const articleCtas: Record<string, Partial<Record<CtaStage, CtaCopy>>> = {
  'meta-reklam-nedir': {
    middle: cta('Yönetim ve danışmanlık arasındaki farkı ihtiyaçlarınıza göre konuşalım', 'Ekibinizin yapabildiği işleri ve destek gereken konuları birlikte ayıralım.', 'İhtiyacımı Paylaş', ['Yönetim Kapsamını İncele', `${servicePath}/ozellikler`]),
    closing: cta('Meta reklam planınızı birlikte oluşturalım', 'Hedefiniz, web siteniz ve mevcut reklam durumunuz üzerinden gerekli işleri belirleyelim.', 'Meta Reklam Teklifi Al', ['Meta Reklam Yönetimini İncele', servicePath]),
  },
  'meta-reklam-nasil-verilir': {
    middle: cta('Kurulumunuzda hangi kontrollerin gerektiğini birlikte belirleyelim', 'Web sitenizi ve takip etmek istediğiniz işlemi paylaşın.', 'Ölçüm İhtiyacımı Paylaş', ['Ölçüm Yaklaşımımızı İnceleyin', `${servicePath}/teknoloji`]),
    closing: cta('Yayın öncesi hazırlığınızı birlikte tamamlayalım', 'Hedefinizi, hesap durumunuzu ve yönlendireceğiniz sayfayı paylaşın.', 'Projem İçin Teklif Al', ['Yönetim Sürecimizi İnceleyin', `${servicePath}/surec`]),
  },
  'meta-reklam-butcesi-planlama': {
    middle: cta('Mevcut hedefinizi ve giderlerinizi birlikte değerlendirelim', 'Öncelikli ürün veya hizmetinizi ve varsa bütçe aralığınızı paylaşın.', 'Kapsamıma Göre Teklif Al', ['Fiyatlandırmayı İncele', `${servicePath}/fiyatlandirma`]),
    closing: cta('Bütçe kalemlerinizi teklif öncesinde netleştirelim', 'Önceki reklam deneyiminizi, satış kayıtlarınızı ve bütçe aralığınızı paylaşın.', 'Meta Reklam Teklifi Al', ['Yayın Öncesi Kontrol Listesi', `${servicePath}/blog/meta-reklam-nasil-verilir`]),
  },
};

export const metaAdsBlog: ServiceBlogDefinition = {
  config: { serviceName: 'Meta Reklam Yönetimi', servicePath, blogLabel: 'Meta Reklam Rehberleri', brandLine: 'PakSoft · Meta Reklam', allGuidesLabel: 'Tüm Meta reklam rehberleri', overviewLabel: 'Meta reklam yönetimini inceleyin', renderMarker, ctas: { early: defaultCta, middle: defaultCta, closing: defaultCta } },
  defaultCategoryLabel: 'Meta Reklam Rehberi',
  articles: manifest.map(entry => ({ ...entry, ctas: articleCtas[entry.slug] })),
};
export function getMetaAdsGuides() { return manifest.map(entry => ({ ...entry, title: entry.heading })); }
export function getMetaAdsGuide(slug: string) {
  const entry = manifest.find(item => item.slug === slug);
  if (!entry) return null;
  return { ...entry, title: entry.heading, metaTitle: entry.title, content: readFileSync(join(process.cwd(), 'content/blog/meta-ads', `${slug}.md`), 'utf8'), publishedAt: undefined, updatedAt: undefined, language: 'tr' };
}
