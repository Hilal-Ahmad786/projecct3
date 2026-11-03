import { AdjustmentsHorizontalIcon, ArchiveBoxIcon, ArrowPathIcon, BanknotesIcon, CalendarDaysIcon, CircleStackIcon, Cog6ToothIcon, CubeIcon, DocumentCheckIcon, RectangleStackIcon, ShoppingBagIcon, UserGroupIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/ecommerce/manifest.json';

const servicePath = '/tr/hizmetler/e-commerce';
const enquiryPath = '/tr/start-project?service=e-commerce';

type GridItem = { title: string; text: string; Icon: typeof CubeIcon };

const launchAreas: GridItem[] = [
  { title: 'Kapsam', text: 'İlk sürümde hangi ürünler, sayfalar ve işlevler bulunacak?', Icon: DocumentCheckIcon },
  { title: 'Katalog', text: 'Ürün, görsel, varyant ve kategori verileri hazır mı?', Icon: CubeIcon },
  { title: 'Alışveriş', text: 'Ödeme, teslimat ve müşteri bilgilendirmesi kontrol edildi mi?', Icon: ShoppingBagIcon },
  { title: 'Operasyon', text: 'Sipariş, stok ve müşteri taleplerinin sorumlusu belli mi?', Icon: CircleStackIcon },
  { title: 'Test', text: 'Önemli senaryolar uygun ortamda denendi mi?', Icon: Cog6ToothIcon },
  { title: 'Devir', text: 'Hesap erişimleri ve günlük kullanım bilgileri teslim edildi mi?', Icon: ArchiveBoxIcon },
];

const platformDecisions: GridItem[] = [
  { title: 'Katalog', text: 'Ürün, varyant ve veri yapımız seçilen çözümle yönetilebiliyor mu?', Icon: CubeIcon },
  { title: 'Ekip', text: 'Günlük işleri yürütecek kişiler bu düzeni kullanabiliyor mu?', Icon: UserGroupIcon },
  { title: 'İş kuralları', text: 'Gerekli özel davranışlar nasıl karşılanacak?', Icon: WrenchScrewdriverIcon },
  { title: 'Bağlantılar', text: 'Veri akışı ve dış sistemler doğrulandı mı?', Icon: ArrowPathIcon },
  { title: 'Maliyet', text: 'İlk kurulum ve düzenli giderler ayrı görülebiliyor mu?', Icon: BanknotesIcon },
  { title: 'Devamlılık', text: 'Bakım, erişim ve ilerideki geçiş sorumlulukları belli mi?', Icon: DocumentCheckIcon },
];

// Numbered six-area panel in the same ivory/sand frame as the corporate
// guides' workflow figure: 3×2 on desktop, 2 columns on tablet, 1 on mobile.
function DecisionGrid({ title, items }: { title: string; items: GridItem[] }) {
  return (
    <figure className="reveal my-10 overflow-hidden rounded-2xl border border-heritage-sand bg-heritage-ivory sm:my-12">
      <figcaption className="border-b border-heritage-sand px-4 py-4 text-sm font-medium text-gray-800 sm:px-6">{title}</figcaption>
      <ol className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
        {items.map(({ title: itemTitle, text, Icon }, i) => (
          <li key={itemTitle} className="flex flex-col rounded-xl border border-heritage-sand bg-white p-4">
            <span className="flex items-center gap-3">
              <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-heritage-turquoise-deep text-xs font-semibold text-white">{i + 1}</span>
              <strong className="text-sm font-semibold text-gray-900">{itemTitle}</strong>
              <Icon className="ms-auto h-5 w-5 shrink-0 text-heritage-turquoise-deep" aria-hidden="true" />
            </span>
            <span className="mt-2 block text-sm leading-6 text-gray-700">{text}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

const costComponents: GridItem[] = [
  { title: 'Tek seferlik işler', text: 'Tasarım, kurulum, veri aktarımı ve başlangıç entegrasyonları.', Icon: RectangleStackIcon },
  { title: 'Düzenli giderler', text: 'Platform veya hosting, lisanslar ve anlaşmalı bakım.', Icon: CalendarDaysIcon },
  { title: 'Kullanıma bağlı giderler', text: 'İşlem hacmine göre değişebilen teknik servis ücretleri.', Icon: AdjustmentsHorizontalIcon },
];

function CostComponentsFigure() {
  return (
    <figure className="reveal my-7 overflow-hidden rounded-2xl border border-heritage-sand bg-heritage-ivory p-4 sm:my-9 sm:p-6">
      <figcaption className="text-sm font-semibold text-gray-900">İlk yıl bütçesindeki gider türleri</figcaption>
      <ul className="mt-4 grid gap-3 md:grid-cols-3">
        {costComponents.map(({ title, text, Icon }) => (
          <li key={title} className="rounded-xl border border-heritage-sand bg-white p-4">
            <Icon className="h-5 w-5 text-heritage-turquoise-deep" aria-hidden="true" />
            <h3 className="mt-3 text-sm font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-gray-700">{text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-5 text-gray-600">Paket içinde yer alan kalemleri ikinci kez eklemeyin. Vergi, dönem ve kur varsayımlarını aynı temelde karşılaştırın.</p>
    </figure>
  );
}

export const ecommerceBlog: ServiceBlogDefinition = {
  config: {
    serviceName: 'E-Ticaret',
    servicePath,
    blogLabel: 'Rehberler',
    brandLine: 'PakSoft · E-Ticaret',
    allGuidesLabel: 'Tüm e-ticaret rehberleri',
    overviewLabel: 'E-ticaret hizmetine genel bakış',
    jsonLdSection: 'E-Ticaret',
    // Used by any article whose manifest entry has no `ctas` of its own.
    ctas: {
      early: {
        heading: 'E-ticaret projenizi planlıyor musunuz?',
        text: 'Ürün yapınızı, mevcut sistemlerinizi ve önceliklerinizi paylaşın; kapsamı birlikte netleştirelim.',
        primary: { label: 'Projenizi Anlatın', href: enquiryPath },
        secondary: { label: 'E-Ticaret Hizmetimizi İnceleyin', href: servicePath },
      },
      middle: {
        heading: 'Kurulum sürecini adım adım görün',
        text: 'İçerik hazırlığından test ve devre kadar sorumlulukları inceleyin.',
        primary: { label: 'Kurulum Sürecini İnceleyin', href: `${servicePath}/surec` },
      },
      closing: {
        heading: 'Mağazanızın kapsamını birlikte netleştirelim',
        text: 'Mevcut site adresinizi veya mağaza fikrinizi, ürün yapınızı ve ihtiyaç duyduğunuz bağlantıları paylaşın.',
        primary: { label: 'Teklif Talebinizi İletin', href: enquiryPath },
        secondary: { label: 'Fiyatlandırma Bilgilerini İnceleyin', href: `${servicePath}/fiyatlandirma` },
      },
    },
    renderMarker: (marker) => {
      if (marker === '[[ECOM_LAUNCH_AREAS]]') return <DecisionGrid title="Yayın hazırlığının altı alanı" items={launchAreas} />;
      if (marker === '[[ECOM_PLATFORM_DECISIONS]]') return <DecisionGrid title="Altyapı kararını netleştiren altı soru" items={platformDecisions} />;
      if (marker === '[[ECOM_COST_COMPONENTS]]') return <CostComponentsFigure />;
      return null;
    },
  },
  defaultCategoryLabel: 'E-Ticaret Rehberi',
  articles: manifest,
};
