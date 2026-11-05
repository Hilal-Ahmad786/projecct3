import Link from '@/components/IntentLink';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { trTitleCase } from '@/lib/tr-title-case';

// Closing "pages + related services" block shared by the ikas and Shopify
// subpages. Link text carries the page's target keyword (internal anchor text)
// and the current page is left out.

export type PlatformPage = 'overview' | 'features' | 'technologies' | 'process' | 'portfolio' | 'pricing' | 'blog' | 'faq';
type Platform = 'ikas' | 'shopify' | 'custom' | 'marketplace';

const BASE: Record<Platform, string> = { ikas: '/tr/hizmetler/ikas-development', shopify: '/tr/hizmetler/shopify-development', custom: '/tr/hizmetler/custom-ecommerce', marketplace: '/tr/hizmetler/marketplace-development' };
const SLUG: Record<PlatformPage, string> = { overview: '', features: '/ozellikler', technologies: '/teknoloji', process: '/surec', portfolio: '/portfoy', pricing: '/fiyatlandirma', blog: '/blog', faq: '/sss' };

const PAGES: Record<Platform, Record<PlatformPage, [string, string]>> = {
  ikas: {
    overview: ['ikas e-ticaret sitesi kurulumu', 'Yeni mağaza, mevcut mağaza ve geçiş seçenekleri.'],
    features: ['ikas site kurma özellikleri', 'Mağaza, katalog, tasarım ve entegrasyon kapsamı.'],
    technologies: ['ikas tema ve yazılım geliştirme', 'Tema ortamı, uygulama ve entegrasyon yöntemi.'],
    process: ['ikas kurulum ve site taşıma süreci', 'Keşif, uygulama, kontrol ve devir aşamaları.'],
    portfolio: ['ikas ile yapılan siteler', 'Canceviz Hurma mağazası ve ikas uygulama örneği.'],
    pricing: ['ikas kurulum fiyatları', 'Teklif kapsamını ve bütçeyi etkileyen işler.'],
    blog: ['ikas rehberleri', 'Kurulum ve tema tasarımı yazıları.'],
    faq: ['ikas SSS', 'Kurulum ve geliştirme hakkında sık sorulan sorular.'],
  },
  shopify: {
    overview: ['Shopify e-ticaret sitesi kurulumu', 'Kurulum, tema ve mağaza taşıma kapsamı.'],
    features: ['Shopify tema tasarımı ve özellikler', 'Tema, ürün sayfası ve entegrasyon kapsamı.'],
    technologies: ['Shopify özel tema geliştirme', 'Liquid, API ve entegrasyon yaklaşımı.'],
    process: ['Shopify kurulum ve mağaza taşıma süreci', 'Hazırlık, uygulama, kontrol ve devir aşamaları.'],
    portfolio: ['Shopify ile yapılmış siteler', 'Shopify çalışma örnekleri ve proje kapsamı.'],
    pricing: ['Shopify kurulum hizmeti fiyatı', 'Hizmet bedelini etkileyen kapsam ve giderler.'],
    blog: ['Shopify rehberleri', 'Mağaza açmak için gerekenler ve geçiş yazıları.'],
    faq: ['Shopify SSS', 'Kurulum, maliyet ve taşıma soruları.'],
  },
  custom: {
    overview: ['Özel e-ticaret sitesi ve yazılım geliştirme', 'Özel iş akışları, tasarım ve ilk sürüm kapsamı.'],
    features: ['E-ticaret sitesi özellikleri', 'Ürün, fiyat, sipariş ve yönetim modülleri.'],
    technologies: ['Özel e-ticaret altyapısı', 'Mimari, veri kaynakları ve bağlantılar.'],
    process: ['Özel e-ticaret geliştirme süreci', 'Keşif, geliştirme, test ve yayın adımları.'],
    portfolio: ['Özel e-ticaret örnek senaryoları', 'Ölçüye göre satış, bayi fiyatı ve stok aktarımı.'],
    pricing: ['Özel e-ticaret sitesi fiyatları', 'Geliştirme, dış giderler ve bakım kalemleri.'],
    blog: ['Özel e-ticaret rehberleri', 'Altyapı seçimi ve teklif öncesi kapsam.'],
    faq: ['Özel e-ticaret SSS', 'Kapsam, maliyet ve teslim soruları.'],
  },
  marketplace: {
    overview: ['Pazaryeri yazılımı ve çok satıcılı platform', 'Roller, örnek sipariş akışı ve ilk sürüm kapsamı.'],
    features: ['Pazaryeri yazılımı özellikleri', 'Satıcı paneli, ürün onayı, komisyon ve kısmi iade.'],
    technologies: ['Çok satıcılı pazaryeri altyapısı', 'Veri yetkileri, sipariş kalemleri ve entegrasyonlar.'],
    process: ['Pazaryeri geliştirme süreci', 'Satış modelinden kabul testine ve pilot yayına.'],
    portfolio: ['Pazaryeri proje senaryoları', 'Üretici ağı, sektör platformu ve kurumsal tedarik.'],
    pricing: ['Pazaryeri yazılımı fiyatları', 'Geliştirme, sağlayıcı ve işletme giderleri.'],
    blog: ['Pazaryeri geliştirme rehberleri', 'Satış modeli seçimi, komisyon ve kısmi iade.'],
    faq: ['Pazaryeri SSS', 'Satıcı, sipariş, ödeme ve proje planı soruları.'],
  },
};

const RELATED: Record<Platform, [string, string, string][]> = {
  ikas: [
    ['Shopify Geliştirme', 'Alternatif platformda kurulum ve tema hizmetleri.', '/tr/hizmetler/shopify-development'],
    ['E-Ticaret Çözümleri', 'Altyapı seçenekleri ve genel mağaza geliştirme.', '/tr/hizmetler/e-commerce'],
    ['E-Ticaret Tasarımı', 'Ürün, kategori ve mobil alışveriş arayüzleri.', '/tr/hizmetler/ecommerce-design'],
    ['Özel E-Ticaret', 'Hazır platforma sığmayan iş kuralları.', '/tr/hizmetler/custom-ecommerce'],
  ],
  shopify: [
    ['ikas Geliştirme', 'ikas kurulum, tema ve geçiş hizmetleri.', '/tr/hizmetler/ikas-development'],
    ['E-Ticaret Çözümleri', 'Altyapı seçenekleri ve genel mağaza geliştirme.', '/tr/hizmetler/e-commerce'],
    ['WooCommerce Geliştirme', 'WordPress tabanlı mağaza çalışmaları.', '/tr/hizmetler/woocommerce-development'],
    ['Özel E-Ticaret', 'Hazır platforma sığmayan iş kuralları.', '/tr/hizmetler/custom-ecommerce'],
  ],
  custom: [
    ['E-Ticaret Çözümleri', 'Hazır altyapı seçenekleri ve genel mağaza geliştirme.', '/tr/hizmetler/e-commerce'],
    ['B2B E-Ticaret', 'Bayi ve kurumsal müşteri sipariş akışları.', '/tr/hizmetler/b2b-ecommerce'],
    ['Ödeme Geçidi Entegrasyonu', 'Ödeme bağlantısı ve sipariş durumları.', '/tr/hizmetler/payment-gateway-integration'],
    ['Shopify Geliştirme', 'Hazır platformda kurulum ve tema hizmetleri.', '/tr/hizmetler/shopify-development'],
    ['ikas Geliştirme', 'ikas kurulum, tema ve uygulama hizmetleri.', '/tr/hizmetler/ikas-development'],
    ['Pazaryeri Geliştirme', 'Çok satıcılı platform, satıcı paneli ve komisyon.', '/tr/hizmetler/marketplace-development'],
  ],
  marketplace: [
    ['E-Ticaret Çözümleri', 'Tek satıcılı mağaza ve altyapı seçenekleri.', '/tr/hizmetler/e-commerce'],
    ['Özel E-Ticaret', 'Hazır platforma sığmayan ürün ve sipariş kuralları.', '/tr/hizmetler/custom-ecommerce'],
    ['B2B E-Ticaret', 'Bayi ve kurumsal müşteri sipariş akışları.', '/tr/hizmetler/b2b-ecommerce'],
    ['Ödeme Geçidi Entegrasyonu', 'Ödeme bağlantısı, iade ve sipariş durumları.', '/tr/hizmetler/payment-gateway-integration'],
  ],
};

const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';

export default function PlatformPageLinks({ platform, current, title, tone = 'ivory' }: { platform: Platform; current: PlatformPage; title?: string; tone?: 'white' | 'gray' | 'ivory' }) {
  const name = platform === 'ikas' ? 'ikas' : platform === 'shopify' ? 'Shopify' : platform === 'custom' ? 'Özel e-ticaret' : 'Pazaryeri';
  const pages = (Object.keys(PAGES[platform]) as PlatformPage[]).filter((page) => page !== current);
  const bg = tone === 'gray' ? 'bg-background-gray' : tone === 'ivory' ? 'bg-heritage-ivory' : 'bg-white';
  return (
    <section className={bg}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 cw-section">
        <h2 className="reveal max-w-4xl text-headline font-medium leading-tight text-gray-900">{trTitleCase(title ?? `${name} hizmetinin diğer sayfaları ve ilgili hizmetler`)}</h2>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">{name} sayfaları</h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {pages.map((page) => { const [label, text] = PAGES[platform][page]; return (
                <li key={page}>
                  <Link href={`${BASE[platform]}${SLUG[page]}`} className={`group flex h-full flex-col rounded-lg border border-heritage-sand bg-white p-4 transition-colors hover:border-heritage-turquoise motion-reduce:transition-none ${focus}`}>
                    <span className="flex items-center justify-between gap-2 font-semibold text-gray-900">{trTitleCase(label)}<ArrowRightIcon className="h-4 w-4 shrink-0 text-heritage-turquoise-deep transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" /></span>
                    <span className="mt-1 text-sm leading-6 text-gray-600">{text}</span>
                  </Link>
                </li>
              ); })}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">İlgili e-ticaret hizmetleri</h3>
            <ul className="mt-3 divide-y divide-heritage-sand rounded-xl border border-heritage-sand bg-white/70">
              {RELATED[platform].map(([label, text, href]) => (
                <li key={href}>
                  <Link href={href} className={`group flex items-start justify-between gap-4 p-4 transition-colors hover:bg-white motion-reduce:transition-none ${focus}`}>
                    <span><span className="block font-semibold text-gray-900 group-hover:text-heritage-turquoise-deep">{label}</span><span className="mt-1 block text-sm leading-6 text-gray-600">{text}</span></span>
                    <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-heritage-turquoise-deep transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
