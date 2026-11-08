import Link from '@/components/IntentLink';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { trTitleCase } from '@/lib/tr-title-case';

// Closing "pages + related services" block shared by the ikas and Shopify
// subpages. Link text carries the page's target keyword (internal anchor text)
// and the current page is left out.

export type PlatformPage = 'overview' | 'features' | 'technologies' | 'process' | 'portfolio' | 'pricing' | 'blog' | 'faq';
export type Platform = 'ikas' | 'shopify' | 'custom' | 'marketplace' | 'seo' | 'ecommerce-seo' | 'technical-seo' | 'google-ads' | 'google-search-ads';

const BASE: Record<Platform, string> = { ikas: '/tr/hizmetler/ikas-development', shopify: '/tr/hizmetler/shopify-development', custom: '/tr/hizmetler/custom-ecommerce', marketplace: '/tr/hizmetler/marketplace-development', seo: '/tr/hizmetler/seo', 'ecommerce-seo': '/tr/hizmetler/ecommerce-seo', 'technical-seo': '/tr/hizmetler/technical-seo', 'google-ads': '/tr/hizmetler/google-ads', 'google-search-ads': '/tr/hizmetler/google-search-ads' };
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
  seo: {
    overview: ['SEO hizmeti ve danışmanlığı', 'Başlangıç noktası, çalışma kapsamı ve adımlar.'],
    features: ['SEO hizmeti kapsamı', 'Yapılan işler ve proje çıktıları.'],
    technologies: ['SEO araçları ve ölçüm yöntemleri', 'Search Console, site taraması, PageSpeed ve GA4.'],
    process: ['SEO çalışma süreci', 'Başlangıçtan uygulamaya ve takibe dört aşama.'],
    portfolio: ['SEO proje örnekleri', 'Kurumsal site, mağaza ve site yenileme senaryoları.'],
    pricing: ['SEO fiyatları', 'Teklifi etkileyen işler ve çalışma türleri.'],
    blog: ['SEO rehberleri', 'SEO nedir ve SEO ajansı nasıl seçilir?'],
    faq: ['SEO SSS', 'Süre, raporlama ve teklif soruları.'],
  },
  'ecommerce-seo': {
    overview: ['E-ticaret SEO hizmeti ve danışmanlığı', 'Kategori, ürün ve platform bazında mağaza SEO’su.'],
    features: ['E-ticaret SEO optimizasyonu', 'Kategori sayfası, ürün sayfası, filtre ve varyant kuralları.'],
    technologies: ['Shopify, ikas ve WooCommerce SEO ayarları', 'Ürün verisi, işaretleme ve satış ölçümü.'],
    process: ['E-ticaret SEO nasıl yapılır?', 'İncelemeden pilot sayfalara ve takibe.'],
    portfolio: ['E-ticaret SEO örnekleri', 'Kategori, varyant stoku ve platform geçişi senaryoları.'],
    pricing: ['E-ticaret SEO fiyatları', 'Teklifi etkileyen işler ve çalışma türleri.'],
    blog: ['E-ticaret SEO rehberleri', 'Kategori sayfası ve ürün sayfası SEO rehberleri.'],
    faq: ['E-ticaret SEO SSS', 'Varyant, stok, taşıma ve ölçüm soruları.'],
  },
  'technical-seo': {
    overview: ['Teknik SEO hizmeti ve SEO denetimi', 'Tarama, indeksleme, site hızı ve taşıma kontrolleri.'],
    features: ['Teknik SEO kontrol listesi', 'Denetimdeki yedi alan ve örnek denetim çıktısı.'],
    technologies: ['Teknik SEO analizi araçları', 'Search Console, site taraması ve tarayıcı testleri.'],
    process: ['Teknik SEO süreci', 'Kapsamdan yeniden teste beş adım.'],
    portfolio: ['Teknik SEO örnekleri', 'Site taşıma, indeksleme ve mobil performans senaryoları.'],
    pricing: ['Teknik SEO ve SEO audit fiyatları', 'Denetim, uygulama ve doğrulama kalemleri.'],
    blog: ['Teknik SEO rehberleri', 'İndeksleme sorunları ve site taşıma kontrol listesi.'],
    faq: ['Teknik SEO SSS', 'Denetim, indeksleme ve taşıma soruları.'],
  },
  'google-ads': {
    overview: ['Google Ads yönetimi', 'Hedef, kampanya türü ve ölçüm yaklaşımı.'],
    features: ['Google Ads hizmet kapsamı', 'Hesap, kampanya, dönüşüm ve raporlama işleri.'],
    technologies: ['Google Ads ölçüm altyapısı', 'Google Ads, GA4, GTM ve ürün verisi kontrolleri.'],
    process: ['Google Ads çalışma süreci', 'Hedef belirlemeden kampanya takibine.'],
    portfolio: ['Google Ads kampanya örnekleri', 'Temsili sorun inceleme ve doğrulama senaryoları.'],
    pricing: ['Google Ads yönetim ücretleri', 'Reklam bütçesi, yönetim ve kurulum kalemleri.'],
    blog: ['Google Ads rehberleri', 'Bütçe planlama ve dönüşüm sorunlarını teşhis etme.'],
    faq: ['Google Ads yönetimi SSS', 'Hesap, bütçe, kampanya ve ölçüm soruları.'],
  },
  'google-search-ads': {
    overview: ['Google Arama Ağı reklam yönetimi', 'Sorgu, reklam metni ve açılış sayfası planı.'],
    features: ['Arama Ağı reklam özellikleri', 'Reklam biçimleri, eşleme ve sorgu kontrolleri.'],
    technologies: ['Arama Ağı dönüşüm takibi', 'Form, telefon ve nitelikli talep ölçümü.'],
    process: ['Arama Ağı kampanya kurulum süreci', 'Hedef, taslak, onay, yayın ve ilk değerlendirme.'],
    portfolio: ['Arama Ağı kampanya örnekleri', 'Temsili sorun incelemeleri ve doğrulama.'],
    pricing: ['Google Arama reklamları fiyatları', 'Reklam bütçesi, kurulum ve yönetim kapsamı.'],
    blog: ['Arama Ağı reklam rehberleri', 'Kampanya kurulumu ve arama terimi incelemesi.'],
    faq: ['Arama Ağı reklamları SSS', 'Hesap, görünürlük ve ölçüm soruları.'],
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
  seo: [
    ['Teknik SEO', 'Tarama, indeksleme, yönlendirme ve site hızı.', '/tr/hizmetler/technical-seo'],
    ['E-Ticaret SEO', 'Ürün, kategori ve filtre sayfaları.', '/tr/hizmetler/ecommerce-seo'],
    ['Kurumsal Web Sitesi Tasarımı', 'Aramada bulunabilir hizmet sayfaları.', '/tr/hizmetler/corporate-website-design'],
    ['E-Ticaret Çözümleri', 'Mağaza altyapısı ve kategori yapısı.', '/tr/hizmetler/e-commerce'],
  ],
  'ecommerce-seo': [
    ['SEO Hizmeti ve Danışmanlığı', 'Genel SEO stratejisi ve içerik planı.', '/tr/hizmetler/seo'],
    ['Teknik SEO', 'Tarama, indeksleme, site hızı ve taşıma.', '/tr/hizmetler/technical-seo'],
    ['Shopify Geliştirme', 'Shopify kurulum, tema ve mağaza taşıma.', '/tr/hizmetler/shopify-development'],
    ['ikas Geliştirme', 'ikas kurulum, tema ve uygulama hizmetleri.', '/tr/hizmetler/ikas-development'],
    ['E-Ticaret Çözümleri', 'Mağaza altyapısı ve kategori yapısı.', '/tr/hizmetler/e-commerce'],
  ],
  'technical-seo': [
    ['SEO Hizmeti ve Danışmanlığı', 'Genel SEO stratejisi ve içerik planı.', '/tr/hizmetler/seo'],
    ['E-Ticaret SEO', 'Ürün, kategori ve filtre sayfaları.', '/tr/hizmetler/ecommerce-seo'],
    ['Kurumsal Web Sitesi Tasarımı', 'Taşıma ve yenileme projeleri.', '/tr/hizmetler/corporate-website-design'],
    ['Özel E-Ticaret', 'Özel altyapıda şablon ve performans işleri.', '/tr/hizmetler/custom-ecommerce'],
  ],
  'google-ads': [
    ['Google Arama Ağı Reklamları', 'Arama sonuçlarında metin reklamları.', '/tr/hizmetler/google-search-ads'],
    ['Google Alışveriş Reklamları', 'Merchant Center ve ürün reklamları.', '/tr/hizmetler/google-shopping'],
    ['Performance Max', 'Tüm Google kanallarında tek kampanya.', '/tr/hizmetler/performance-max'],
    ['SEO Hizmeti', 'Organik arama çalışmaları ve içerik planı.', '/tr/hizmetler/seo'],
    ['E-Ticaret SEO', 'Ürün ve kategori sayfalarının organik görünürlüğü.', '/tr/hizmetler/ecommerce-seo'],
    ['Dijital Pazarlama', 'İşletmenizin dijital pazarlama seçenekleri.', '/tr/hizmetler/digital-marketing'],
  ],
  'google-search-ads': [
    ['Google Ads Yönetimi', 'Arama, Alışveriş ve Performance Max kampanya seçenekleri.', '/tr/hizmetler/google-ads'],
    ['Google Alışveriş Reklamları', 'Ürün verisi ve alışveriş reklamı yönetimi.', '/tr/hizmetler/google-shopping'],
    ['Performance Max', 'Birden fazla Google kanalını kapsayan kampanyalar.', '/tr/hizmetler/performance-max'],
    ['Dijital Pazarlama', 'İşletmenizin dijital pazarlama seçenekleri.', '/tr/hizmetler/digital-marketing'],
  ],
};

const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';

export default function PlatformPageLinks({ platform, current, title, tone = 'ivory' }: { platform: Platform; current: PlatformPage; title?: string; tone?: 'white' | 'gray' | 'ivory' }) {
  const name = platform === 'ikas' ? 'ikas' : platform === 'shopify' ? 'Shopify' : platform === 'custom' ? 'Özel e-ticaret' : platform === 'seo' ? 'SEO' : platform === 'ecommerce-seo' ? 'E-ticaret SEO' : platform === 'technical-seo' ? 'Teknik SEO' : platform === 'google-search-ads' ? 'Google Arama Ağı' : platform === 'google-ads' ? 'Google Ads' : 'Pazaryeri';
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
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">{platform === 'seo' || platform === 'ecommerce-seo' || platform === 'technical-seo' || platform === 'google-ads' || platform === 'google-search-ads' ? 'İlgili hizmetler' : 'İlgili e-ticaret hizmetleri'}</h3>
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
