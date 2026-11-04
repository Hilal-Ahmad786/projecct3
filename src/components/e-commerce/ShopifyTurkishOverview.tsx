import Link from '@/components/IntentLink';
import Image from 'next/image';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRightIcon, ArrowsRightLeftIcon, CheckIcon, SparklesIcon, BuildingStorefrontIcon, CreditCardIcon, TruckIcon, CalculatorIcon } from '@heroicons/react/24/outline';
import WhatsAppButton from '@/components/services/WhatsAppButton';
import ShopifyArtwork from '@/components/shopify/visuals/ShopifyArtwork';
import ShopifyMotionScope from './ShopifyMotionScope';
import { ShopifySection, ShopifyVisual } from './ShopifyPagePrimitives';
import { ShopifyExternalLink, ShopifyIcon, SHOPIFY_INDEPENDENCE_NOTE } from './ShopifyMark';
import PageJumpNav from './PageJumpNav';
import IkasVisual from '@/components/ikas/visuals/IkasVisual';
import { trTitleCase } from '@/lib/tr-title-case';
import type { IkasVisualName } from '@/components/ikas/visuals/generated';

const base = '/tr/hizmetler/shopify-development';
const paths = {
  features: `${base}/ozellikler`, technologies: `${base}/teknoloji`, process: `${base}/surec`,
  portfolio: `${base}/portfoy`, pricing: `${base}/fiyatlandirma`, blog: `${base}/blog`, faq: `${base}/sss`,
};
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';
const linkClass = `inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focus}`;

function Section(props: ComponentProps<typeof ShopifySection>) { return <ShopifySection {...props} />; }
function Intro({ children }: { children: ReactNode }) { return <p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">{children}</p>; }
function A({ href, children, className = linkClass }: { href: string; children: ReactNode; className?: string }) { return href.startsWith('#') ? <a href={href} className={className}>{children}</a> : <Link href={href} className={className}>{children}</Link>; }
function Table({ label, headers, rows }: { label: string; headers: string[]; rows: string[][] }) {
  return <div role="region" aria-label={label} tabIndex={0} className="mt-6 overflow-x-auto rounded-xl border border-heritage-sand bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise"><table className="w-full min-w-[620px] border-collapse text-left text-sm"><thead className="bg-heritage-ivory"><tr>{headers.map(h => <th key={h} scope="col" className="border-b border-heritage-sand px-4 py-3 font-semibold text-gray-900">{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i} className="even:bg-gray-50/70">{row.map((cell, j) => <td key={j} className="border-b border-gray-100 px-4 py-3 align-top leading-6 text-gray-700">{cell}</td>)}</tr>)}</tbody></table></div>;
}

const serviceGlyphs: IkasVisualName[] = ['glyph-setup', 'glyph-theme', 'glyph-catalog', 'glyph-migration', 'glyph-integrations', 'glyph-launch'];
const services = [
  ['Shopify mağaza kurulumu ve sayfa yapısı', 'Mağaza bilgileri, menüler, koleksiyon yapısı ve gerekli içerik sayfaları için kurulum planı oluştururuz. Hangi ayarların ve içeriklerin hazırlanacağını birlikte belirleriz.'],
  ['Shopify tema tasarımı ve özel bölümler', 'Mevcut temanın markanıza uyarlanmasını veya ihtiyaç duyulan özel içerik alanlarını değerlendiririz. Panel ayarlarıyla yapılabilen düzenlemeleri geliştirme gerektiren işlerden ayırırız.'],
  ['Ürün ve koleksiyon düzeni', 'Ürün bilgileri, varyantlar, görseller ve koleksiyon ilişkilerini örnek kayıtlarla ele alırız. Veri temizliği ve içerik tamamlama görevlerini aktarım öncesinde netleştiririz.'],
  ['Shopify mağaza taşıma ve veri aktarımı', 'Mevcut altyapınızdaki verileri ve URL’leri hedef mağazayla eşleştiririz. Hangi kayıtların taşınabileceğini inceleyerek geçişin sınırlarını ve kontrol planını açıklarız.'],
  ['Shopify entegrasyon hizmeti', 'Ödeme, kargo ve diğer iş sistemi ihtiyaçlarını hazır uygulamalar ve desteklenen bağlantı yöntemleri üzerinden değerlendiririz. Hesap, ülke ve paket uygunluğunu ayrıca kontrol ederiz.'],
  ['Test, yayın ve devir', 'Kararlaştırılan sayfa ve alışveriş akışlarını kontrol eder, mağaza ekibinize kullanım anlatımı sunarız. Yayın sonrası desteğin kapsamı ve süresi teklifte belirtilir.'],
];
const details = [
  ['Shopify tema tasarımı ve özellikler', 'Kurulum, katalog, tema ve bağlantı işlerinin kapsamı.', paths.features],
  ['Shopify özel tema geliştirme', 'Tema ve entegrasyon yönteminin nasıl belirlendiği.', paths.technologies],
  ['Shopify kurulum ve taşıma süreci', 'Hazırlık, uygulama, kontrol ve devir aşamaları.', paths.process],
  ['Shopify ile yapılmış siteler', 'Shopify çalışma örnekleri ve proje açıklamaları.', paths.portfolio],
  ['Shopify kurulum hizmeti fiyatı', 'Hizmet bedelini etkileyen kapsam ve giderler.', paths.pricing],
  ['Shopify rehberleri', 'Mağaza açmak için gerekenler ve geçiş yazıları.', paths.blog],
  ['Shopify SSS', 'Kurulum ve geliştirme kararları hakkında yanıtlar.', paths.faq],
];
const related = [
  ['E-Ticaret Çözümleri', 'Genel mağaza geliştirme ve altyapı seçenekleri.', '/tr/hizmetler/e-commerce'], ['ikas Geliştirme', 'ikas kurulum, tema ve geçiş hizmetleri.', '/tr/hizmetler/ikas-development'], ['WooCommerce Geliştirme', 'WordPress tabanlı mağaza çalışmaları.', '/tr/hizmetler/woocommerce-development'], ['E-Ticaret Tasarımı', 'Ürün, kategori ve mobil arayüz ihtiyaçları.', '/tr/hizmetler/ecommerce-design'], ['Ödeme Entegrasyonu', 'Ödeme akışları için bağlantı kapsamı.', '/tr/hizmetler/payment-gateway-integration'], ['Özel E-Ticaret', 'Farklı iş kuralları için özel çözüm değerlendirmesi.', '/tr/hizmetler/custom-ecommerce'],
];
const jumpLinks = [
  { href: '#shopify-hizmetleri', label: 'Hizmetler' }, { href: '#shopify-tema', label: 'Tema tasarımı' }, { href: '#shopify-ornek-proje', label: 'Örnek site' },
  { href: '#shopify-firma-secimi', label: 'Firma seçimi' }, { href: '#shopify-tasima', label: 'Mağaza taşıma' }, { href: '#shopify-entegrasyon', label: 'Entegrasyonlar' },
  { href: '#shopify-fiyat', label: 'Fiyat' }, { href: '#shopify-sorular', label: 'SSS' },
];
export const SHOPIFY_TR_FAQ = [
  ['Shopify web sitesi kurma hizmetinde neler yapılır?', 'Mağaza yapısı, tema, sayfalar, ürün verisi ve uygun bağlantılar ihtiyaçlarınıza göre ele alınabilir. Test ve kullanım anlatımı gibi teslimler teklif kapsamında ayrıca belirtilir.'],
  ['Mevcut Shopify sitemde yalnız tema düzenlemesi yaptırabilir miyim?', 'Evet. Değişmesini istediğiniz sayfaları ve davranışları paylaşabilirsiniz. Mevcut tema incelenerek dar kapsamlı bir çalışma planı oluşturulur.'],
  ['WooCommerce mağazamı Shopify’a taşıyabilir misiniz?', 'Kaynak verileri, kullanılacak yöntemleri ve aktarılacak kayıtları inceleyerek kapsam oluşturabiliriz. Ürünler, içerikler, URL’ler ve varsa geçmiş kayıtlar ayrı değerlendirilir.'],
  ['Her ödeme sağlayıcısını kullanabilir miyim?', 'Sağlayıcı seçenekleri ülke, hesap ve platform koşullarına bağlıdır. Kullanmak istediğiniz çözümün uygunluğu proje başlangıcında kontrol edilir; her sağlayıcıya bağlantı garantisi verilmez.'],
  ['Shopify site kurulumu ne kadar sürer?', 'Takvim; tema işleri, veri hazırlığı, gerekli erişimler ve onaylara bağlıdır. Kapsam netleştikten sonra aşamalar ve beklenen süre birlikte belirlenir.'],
  ['Shopify aboneliği hizmet bedeline dahil mi?', 'Platform aboneliği ile PakSoft hizmeti farklı kalemlerdir. Teklifte açıkça belirtilmeyen abonelik, tema, uygulama ve sağlayıcı giderleri ayrıca değerlendirilir.'],
] as const satisfies readonly (readonly [string, string])[];

export default function ShopifyTurkishOverview() {
  return <>
    <ShopifyMotionScope />
    <PageJumpNav items={jumpLinks} mark={<ShopifyIcon size={14} />} />
    <Section title="Shopify site kurma projenizde nereden başlayalım?" tone="gray">
      <Intro>Shopify ile site kurma ve Shopify web sitesi kurma süreci, yeni bir mağaza açarken ve çalışan bir mağazayı değiştirirken farklı hazırlıklar gerektirir. Mevcut durumunuza göre ilk adımı belirleyelim.</Intro>
      <ShopifyVisual name="start-paths" className="mx-auto mt-8 hidden max-w-2xl md:block" />
      <div data-shopify-reveal-group className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[
        ['Yeni e-ticaret sitesi kuracağım', 'Ürün yapınızı, koleksiyonları, gerekli sayfaları ve kullanılacak servisleri birlikte değerlendiririz. İçerik, hesap ve veri hazırlıklarını başlangıç planına ekleriz.', '#shopify-hizmetleri', 'Kurulum kapsamını görün'],
        ['Mevcut Shopify mağazamı geliştireceğim', 'Tema, ürün sunumu veya mobil gezinme ihtiyaçlarını mevcut yapıyı inceleyerek ele alırız. Değiştirilecek alanları ve çalışan mağazaya etkilerini netleştiririz.', '#shopify-tema', 'Tema çalışmalarını inceleyin'],
        ['Mağazamı Shopify’a taşıyacağım', 'Kaynak verileri, eski URL’leri ve gerekli bağlantıları inceleriz. Örnek aktarım ve yayın planıyla geçiş kapsamını oluştururuz.', '#shopify-tasima', 'Mağaza taşıma yaklaşımını görün'],
      ].map(([title, text, href, cta], i) => { const Icon = [BuildingStorefrontIcon, SparklesIcon, ArrowsRightLeftIcon][i]; return <article key={title} className="shopify-motion-card flex h-full flex-col rounded-xl border border-heritage-sand bg-white p-5"><span aria-hidden="true" className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-heritage-turquoise-light text-heritage-turquoise-deep"><Icon className="h-5 w-5" /></span><h3 className="text-title font-medium text-gray-900">{title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-gray-600">{text}</p><A href={href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline">{cta}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></A></article>; })}</div>
    </Section>

    <Section id="shopify-hizmetleri" title="Shopify mağaza kurulum hizmetinde neler yapıyoruz?">
      <Intro>Shopify e-ticaret sitesi kurulumunda, Türkiye'den veya yurt dışından satış yapacak mağazalar için Shopify site kurulum hizmetinin kapsamını ihtiyacınıza göre belirleriz. Aşağıdaki çalışma alanları teklifinizde somut teslimler olarak açıklanır.</Intro>
      <div data-shopify-reveal-group className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{services.map(([title, text], i) => <article key={title} className="shopify-motion-card border-t border-heritage-sand py-4"><IkasVisual name={serviceGlyphs[i]} className="mb-3 h-14 w-14" /><h3 className="text-base font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></article>)}</div>
      <p className="mt-3 text-sm leading-6 text-gray-600">Teklifte çalışma alanları, teslimler, isteğe bağlı işler ve üçüncü taraf giderleri ayrı açıklanır.</p><p className="mt-4"><A href={paths.features}>Shopify hizmet özelliklerini inceleyin<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></A></p>
    </Section>

    <section id="shopify-tema" className="bg-heritage-ivory scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)]">
      <div className="mx-auto grid max-w-[1200px] gap-x-12 gap-y-10 px-4 sm:px-6 cw-section lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
        <div>
          <h2 className="reveal max-w-4xl text-headline font-medium leading-tight text-gray-900">Shopify Web Tasarım ve Tema Tasarımı: Günlük Yönetim de Önemli</h2>
          <Intro>Görünümün yanında ürün anlatımı, kategori gezinmesi ve mobil kullanım üzerinde çalışırız. Shopify tema özelleştirme sırasında ekibinizin daha sonra hangi alanları kendisinin güncelleyeceğini de belirleriz.</Intro>
          <div data-shopify-reveal-group className="mt-6 space-y-5">{[
            ['Mevcut temanın uyarlanması', 'Renkler, tipografi, içerik alanları ve sayfa düzenini mevcut tema imkanlarıyla değerlendiririz.'],
            ['Özel bölüm ihtiyacı', 'Standart alanların karşılamadığı ürün veya kampanya anlatımı gerekiyorsa uygun bölüm ve şablon çalışmasını ayrıca planlarız.'],
            ['İçerik yönetimi', 'Kararlaştırılan metin, görsel ve bağlantı alanlarının mağaza ekibiniz tarafından düzenlenebilmesini hedefleriz. Teknik geliştirme gerektiren değişiklikleri devir sırasında ayırırız.'],
          ].map(([title, text]) => <div key={title} className="shopify-motion-card border-s-2 border-heritage-turquoise ps-4"><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-600">{text}</p></div>)}</div>
          <p className="mt-5 text-sm leading-6 text-gray-600">Tema çalışmaları ile ödeme sayfasının özelleştirilmesi aynı kapsam değildir. Checkout ihtiyaçları, Shopify planınızın ve ilgili uygulamaların desteklediği imkanlarla ayrıca değerlendirilir.</p>
          <p className="mt-4"><A href={paths.technologies}>Shopify özel tema geliştirme yaklaşımımız<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></A></p>
        </div>
        <ShopifyArtwork name="theme-editor" loop className="w-full" label="Temsili Shopify tema düzenleyici: seçilen bölüm bloğu mağaza önizlemesindeki ilgili alanı vurguluyor, bölümler sürüklenerek yeniden sıralanabiliyor" slotLabels={{ 'slot-panel-title': 'Tema düzenleyici' }} />
      </div>
    </section>

    <Section id="shopify-ornek-proje" title="Shopify ile yapılmış siteler: Termopazar örneği" tone="gray">
      <Intro>Bir mağaza örneğinde yalnızca görünümü değil, yapılan işin kapsamını da inceleyin. Tema tasarımı, kurulum, ürün aktarımı ve bağlantı çalışmaları farklı katkılardır.</Intro>
      <article data-shopify-reveal className="shopify-motion-card mt-6 grid overflow-hidden rounded-xl border border-heritage-sand bg-white md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="relative min-h-56 bg-heritage-ivory"><Image src="/images/portfolio/termopazar.png" alt="Termopazar Shopify mağazasının ana sayfa görünümü" width={1200} height={800} sizes="(max-width: 767px) 100vw, 50vw" className="h-full w-full object-cover object-top" /></div>
        <div className="p-5 sm:p-7"><p className="flex items-center gap-2 text-overline text-heritage-turquoise-deep"><ShopifyIcon size={18} />Shopify · Isıtma ve iklimlendirme ürünleri</p><h3 className="mt-2 text-title font-medium text-gray-900">Termopazar</h3><p className="mt-3 text-sm leading-6 text-gray-600">Ürünlerin çevrimiçi sunumu için Shopify mağazası ürün kategorilerine göre düzenlendi; kampanya alanları ve ücretsiz keşif talebi akışı hazırlandı.</p><p className="mt-3 text-sm leading-6 text-gray-600"><strong className="font-semibold text-gray-800">Örnek müşteri yolculuğu:</strong> Kategori keşfi → ürün bilgisi → ücretsiz keşif talebi</p><A href="/tr/projeler/termopazar" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline">Termopazar proje bilgisini inceleyin<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></A></div>
      </article>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Beğendiğiniz bir ürün sayfasını veya sunum biçimini paylaşabilirsiniz. İhtiyacınızı mevcut mağazanız ve ekibinizin yönetim beklentisiyle birlikte değerlendiririz.</p>
      <p className="mt-4"><A href={paths.portfolio}>Shopify çalışma örneklerini inceleyin<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></A></p>
    </Section>

    <Section id="shopify-firma-secimi" title="Shopify site yapan firmalar arasında seçim yaparken" tone="white">
      <Intro>Shopify ajansı veya Shopify uzmanı ararken görsel portföyün yanında yapılan işin kapsamını, devir biçimini ve sonrasında kimin neyi yöneteceğini sorun. Shopify sitesi yaptırmak isteyen işletmelere aşağıdaki kontrolleri öneriyoruz.</Intro>
      <ul data-shopify-reveal-group className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
        ['Gerçek çalışma örneği', 'Örnek projede hangi işlerin ekip tarafından yapıldığını, hangilerinin hazır tema veya uygulamadan geldiğini sorun.'],
        ['Yazılı kapsam', 'Tema, ürün aktarımı, entegrasyon, test ve destek kalemlerinin teklifte ayrı yazıldığından emin olun.'],
        ['Hesap sahipliği', 'Shopify mağazası, alan adı, tema lisansı ve uygulama hesaplarının işletmeniz adına açılmasını isteyin.'],
        ['Devir ve eğitim', 'Panelden yönetilecek alanların ve teknik destek gerektiren değişikliklerin teslimde anlatılmasını bekleyin.'],
      ].map(([title, text]) => <li key={title} className="shopify-motion-card rounded-xl border border-heritage-sand bg-white p-5"><CheckIcon className="h-5 w-5 text-heritage-turquoise-deep" aria-hidden="true" /><h3 className="mt-3 font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></li>)}</ul>
      <p className="mt-5 flex max-w-3xl items-start gap-2 text-sm leading-6 text-gray-600"><ShopifyIcon size={18} className="mt-0.5" /><span>{SHOPIFY_INDEPENDENCE_NOTE} Platform özellikleri ve planları için <ShopifyExternalLink>Shopify’ın resmi sitesini</ShopifyExternalLink> inceleyebilirsiniz.</span></p>
    </Section>

    <Section id="shopify-tasima" title="Shopify mağaza taşıma ve geçiş hizmeti: önce veri ve URL planı" tone="ivory">
      <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-body leading-relaxed text-gray-600">Mağaza taşırken yalnızca yeni tasarımı değil, ürün verisini ve mevcut bağlantıları da ele almak gerekir. Kaynak sistemin dışa aktarma imkanlarını ve Shopify’a taşınması istenen kayıtları başlangıçta inceleriz.</p>
          <p className="mt-4 text-sm leading-6 text-gray-600">WooCommerce, WordPress veya başka bir altyapıdan gelen mağazalarda Shopify ürün aktarımını örnek kayıtlarla doğrular, eski adresler için yönlendirme planı hazırlarız.</p>
        </div>
        <div className="rounded-xl border border-heritage-sand bg-white p-4 sm:p-6"><ShopifyVisual name="migration-map" label="Temsili geçiş akışı: eski mağazadaki ürün kayıtları Shopify mağazasına aktarılıyor, eski URL'ler yeni adreslerle eşleştiriliyor" /></div>
      </div>
      <Table label="Shopify mağaza taşıma planı" headers={['Alan', 'Birlikte belirlediğimiz konu']} rows={[
        ['Ürünler', 'Kodlar, varyantlar, görseller, fiyatlar ve koleksiyon eşleştirmeleri'], ['İçerik', 'Taşınacak sayfalar ve yeniden hazırlanacak alanlar'], ['URL’ler', 'Eski adreslerin envanteri ve uygun yönlendirme eşleştirmeleri'], ['Müşteri ve geçmiş kayıtlar', 'Kullanılacak yöntemle hangi kayıtların aktarılabileceği'], ['Yayın geçişi', 'Son veri güncellemesi, kontrol sorumluları ve alan adı adımları'],
      ]} />
      <h3 className="mt-10 text-title font-medium text-gray-900">WooCommerce Shopify Taşıma</h3><ShopifyArtwork name="woo-shopify-bridge" loop className="mt-4 max-w-3xl" label="Temsili WooCommerce Shopify geçişi: ürün, varyant, görsel ve URL kayıtları eşleştirilerek aktarılıyor; müşteri şifreleri taşınmıyor, eklentiler uygulama veya özel geliştirmeyle karşılanıyor" slotLabels={{ 'slot-source-label': 'Eski mağaza', 'slot-plugin-label': 'Eklenti', 'slot-app-label': 'Uygulama' }} /><p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">Ürünleri, varyantları ve aktarılması istenen diğer kayıtları örnek dosyalar üzerinden değerlendiririz. Eski mağazadaki her özel alanın, uygulama davranışının veya müşteri giriş bilgisinin aynı şekilde taşınacağını varsaymayız. Örnek aktarım ve bağlantı kontrolleriyle geçiş planını netleştiririz. Kesintisiz geçiş, bütün verilerin otomatik taşınması veya SEO sıralamalarının değişmemesi garantisi verilmez.</p>
      <p className="mt-4"><A href={paths.process}>Aktarım ve yayın sürecimizi inceleyin<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></A></p>
    </Section>

    <Section id="shopify-entegrasyon" title="Shopify entegrasyon hizmeti: ödeme, kargo ve muhasebe bağlantıları" tone="gray">
      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
        <div>
          <p className="text-body leading-relaxed text-gray-600">Kullanmak istediğiniz servisleri ve hangi verinin nerede yönetileceğini birlikte belirleriz. Mevcut bir uygulamanın kurulmasıyla özel entegrasyon geliştirilmesini ayrı kapsamlandırırız.</p>
          <ul data-shopify-reveal-group className="mt-6 space-y-3">{([
            ['Shopify ödeme entegrasyonu', 'Sağlayıcı uygunluğunu, işletmenizin bulunduğu ülkeyi, hesabı ve kullanılacak ödeme akışını kontrol ederiz.', CreditCardIcon],
            ['Shopify kargo entegrasyonu', 'Gönderi oluşturma, takip bilgisi ve mağaza ekibinin yapacağı işlemleri netleştiririz.', TruckIcon],
            ['Shopify muhasebe ve ERP entegrasyonu', 'Stok, fiyat veya sipariş gibi verilerin hangi yönde ve hangi yöntemle aktarılacağını değerlendiririz.', CalculatorIcon],
          ] as const).map(([title, text, Icon]) => <li key={title} className="shopify-motion-card flex gap-4 rounded-xl border border-heritage-sand bg-white p-4"><span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-heritage-turquoise-light text-heritage-turquoise-deep"><Icon className="h-5 w-5" /></span><div><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-600">{text}</p></div></li>)}</ul>
        </div>
        <ShopifyVisual name="integration-hub" loop className="mx-auto w-full max-w-xl" label="Temsili entegrasyon akışı: Shopify mağazası ödeme, kargo, ERP ve pazar yeri sistemlerine bağlanıyor" slotLabels={{ 'slot-payment': 'Ödeme', 'slot-cargo': 'Kargo', 'slot-erp': 'Muhasebe / ERP', 'slot-marketplace': 'Pazar yeri' }} />
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-6 text-gray-600">Bağlantının kurulması, sağlayıcının kullanım ücretinin hizmet bedeline dahil olduğu anlamına gelmez. Uygulama lisansları, platform planı ve dış servis koşulları teklif hazırlığında ayrı ele alınır.</p>
    </Section>

    <Section title="Shopify e-ticaret sitenizde SEO hazırlığı ve ölçümleme">
      <div data-shopify-reveal-group className="mt-6 grid max-w-5xl gap-4 md:grid-cols-2">
        <div className="shopify-motion-card rounded-xl border border-heritage-sand bg-white p-5"><h3 className="font-semibold text-gray-900">Arama görünürlüğü</h3><p className="mt-2 text-sm leading-6 text-gray-600">Ürün ve koleksiyon yapısını, sayfa içeriklerini ve ilgili arama görünürlüğü ayarlarını mağaza hazırlığının parçası olarak değerlendiririz. Geçiş varsa eski URL’lerle yeni sayfalar arasındaki ilişkiyi de plana ekleriz.</p></div>
        <div className="shopify-motion-card rounded-xl border border-heritage-sand bg-white p-5"><h3 className="font-semibold text-gray-900">Ölçümleme</h3><p className="mt-2 text-sm leading-6 text-gray-600">Hangi hesapların ve olayların kullanılacağını başlangıçta belirler, kararlaştırılan olaylar için kontrol planı oluştururuz.</p></div>
      </div>
      <p className="mt-5 max-w-3xl rounded-lg border border-heritage-sand bg-heritage-ivory px-4 py-3 text-sm leading-6 text-gray-700">Teknik kurulum, sürekli SEO, içerik üretimi ve reklam yönetimi farklı iş kalemleridir; dahil işler teklifinizde belirtilir.</p>
    </Section>

    <Section title="Shopify projesi sonunda hangi çıktıları alırsınız?" tone="ivory">
      <Intro>Teslim listesi yapılacak işe göre hazırlanır. Tamamlanan işlerle devam eden veya ayrıca değerlendirilmesi gereken konuları devir sırasında ayırırız.</Intro>
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center">
      <ShopifyVisual name="handover-pack" className="mx-auto w-full max-w-sm" />
      <ul data-shopify-reveal-group className="grid gap-x-8 sm:grid-cols-2">{['Kararlaştırılan sayfa ve tema düzenlemeleri.', 'Kapsamdaki ürün ve koleksiyon hazırlığının kontrol özeti.', 'Aktarım varsa veri ve URL eşleştirme çalışma listesi.', 'Yapılandırılan uygulama ve bağlantıların özeti.', 'Kontrol edilen alışveriş akışları ve açık kalan maddeler.', 'Mağaza ekibiniz için kullanım anlatımı ve destek sorumlulukları.'].map(item => <li key={item} className="flex gap-3 border-b border-heritage-sand py-3 text-sm leading-6 text-gray-700"><CheckIcon className="mt-1 h-4 w-4 shrink-0 text-heritage-turquoise-deep" aria-hidden="true" />{item}</li>)}</ul>
      </div>
      <p className="mt-4 text-sm leading-6 text-gray-600">Hesap erişimleri, tema lisansları ve özel geliştirmelerin kullanım koşulları ayrıca netleştirilir. Her projede bütün kalemlerin otomatik dahil olduğu varsayılmaz.</p>
    </Section>

    <Section title="Shopify site kurulumu nasıl ilerler?">
      <ShopifyVisual name="process-rail" className="mt-8 hidden lg:block" slotLabels={{ 'slot-step-1': 'İhtiyaç', 'slot-step-2': 'Kapsam', 'slot-step-3': 'Uygulama', 'slot-step-4': 'Kontrol', 'slot-step-5': 'Yayın ve devir' }} />
      <ol data-shopify-reveal-group className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{[
        ['İhtiyaç değerlendirmesi', 'Mevcut mağaza, ürün yapısı, hedef pazar ve ekip iş akışı incelenir.'], ['Kapsam ve hazırlık', 'Sayfalar, tema işleri, veriler, bağlantılar ve sorumluluklar belirlenir.'], ['Tasarım ve uygulama', 'Onaylanan plan doğrultusunda mağaza alanları hazırlanır.'], ['Kontrol ve yayın kararı', 'Kararlaştırılan sayfa ve akışlar test edilir; açık işler değerlendirilir.'], ['Yayın ve devir', 'Yayın adımları, kullanım anlatımı ve kararlaştırılan destek planı uygulanır.'],
      ].map(([title, text], i) => <li key={title} className="border-t-2 border-heritage-turquoise py-4"><span className="text-overline text-heritage-turquoise-deep">0{i + 1}</span><h3 className="mt-2 font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></li>)}</ol>
      <p className="mt-2"><A href={paths.process}>Shopify proje sürecinin ayrıntıları<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></A></p>
    </Section>


    <Section id="shopify-fiyat" title="Shopify site yaptırma fiyatlarını neler belirler?" tone="gray">
      <Intro>Hizmet bedeli; kurulum veya mevcut mağaza çalışması olmasına, tema kapsamına, ürün verisinin durumuna ve entegrasyon ihtiyaçlarına göre belirlenir. Yapılacak işleri ve teslimleri teklifinizde ayrı açıklarız.</Intro>
      <Table label="Shopify proje işleri ve ayrı giderler" headers={['PakSoft hizmet işleri', 'Ayrı değerlendirilen giderler']} rows={[
        ['Kurulum, sayfalar ve tema düzenlemeleri', 'Shopify aboneliği ve seçilen ücretli tema'], ['Veri aktarımı ve bağlantı çalışmaları', 'Uygulama lisansları ve dış servis bedelleri'], ['Kararlaştırılan test, eğitim ve destek', 'Kullanıma veya işlemlere bağlı sağlayıcı ücretleri'],
      ]} />
      <p className="mt-4 text-sm leading-6 text-gray-600">İlk aşamada gerekli işleri belirleyip sonraki geliştirmeleri ayrı planlayabiliriz. Dahil işler, giderler ve destek koşulları kapsam üzerinden netleşir.</p><p className="mt-4"><A href={paths.pricing}>Shopify hizmet fiyatlandırmasını inceleyin<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></A></p>
    </Section>

    <Section id="shopify-sorular" title="Shopify e-ticaret sitesi hakkında sık sorulan sorular" tone="ivory">
      <div className="mt-6 divide-y divide-heritage-sand border-y border-heritage-sand">{SHOPIFY_TR_FAQ.map(([q, a]) => <div key={q} className="py-4"><h3 className="font-semibold text-gray-900">{q}</h3><p className="mt-2 max-w-4xl text-sm leading-6 text-gray-600">{a}</p></div>)}</div><p className="mt-4"><A href={paths.faq}>Diğer Shopify sorularını inceleyin<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></A></p>
    </Section>

    <Section title="Shopify hizmetinin ayrıntıları ve ilgili hizmetler">
      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Shopify sayfaları</h3>
          <div data-shopify-reveal-group className="mt-3 grid gap-3 sm:grid-cols-2">{details.map(([title, text, href]) => <A key={title} href={href} className={`group flex h-full flex-col rounded-lg border border-heritage-sand bg-white p-4 transition-colors hover:border-heritage-turquoise ${focus}`}><span className="flex items-center justify-between gap-2 font-semibold text-gray-900">{trTitleCase(title)}<ArrowRightIcon className="h-4 w-4 shrink-0 text-heritage-turquoise-deep transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" /></span><span className="mt-1 text-sm leading-6 text-gray-600">{text}</span></A>)}</div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">İlgili e-ticaret hizmetleri</h3>
          <ul className="mt-3 divide-y divide-heritage-sand rounded-xl border border-heritage-sand bg-heritage-ivory/50">{related.map(([title, text, href]) => <li key={title}><A href={href} className={`group flex items-start justify-between gap-4 p-4 transition-colors hover:bg-white ${focus}`}><span><span className="block font-semibold text-gray-900 group-hover:text-heritage-turquoise-deep">{title}</span><span className="mt-1 block text-sm leading-6 text-gray-600">{text}</span></span><ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-heritage-turquoise-deep transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" /></A></li>)}</ul>
        </div>
      </div>
    </Section>

    <section className="bg-gray-950 text-white"><div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16"><span aria-hidden="true" className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg"><ShopifyIcon size={34} /></span><h2 className="text-headline font-medium">Shopify E-Ticaret Siteniz İçin Kapsamı Birlikte Belirleyelim</h2><p className="mt-4 text-body leading-relaxed text-gray-300">Yeni e-ticaret sitesi planınızı veya mevcut mağazanızın bağlantısını paylaşın. Kurulum, tema veya taşıma ihtiyaçlarınızı değerlendirerek yapılacak işleri ve gerekli hazırlıkları birlikte netleştirelim.</p><div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"><Link href="/tr/start-project?service=shopify-development" className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep ${focus}`}>Shopify Projemi Paylaş<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link><WhatsAppButton source="shopify_overview_final" variant="outline" size="lg" label="WhatsApp’tan Görüşelim" /></div></div></section>
  </>;
}
