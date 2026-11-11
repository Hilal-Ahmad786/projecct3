import type { ReactNode } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import type { SectionVisual } from '@/components/e-commerce/ServiceMarkdownPage';
import { ProcessScene } from '@/components/services/hero-visuals/scenes-internal';
import SeoArtwork from '@/components/seo/visuals/SeoArtwork';
import type { SeoVisualName } from '@/components/seo/visuals/generated';
import { createSeoService, type SeoMeta, type SeoPageKind, type SeoServiceConfig } from './seo-pages/SeoServiceEngine';
import { getGoogleShoppingGuides } from './service-blogs/google-shopping';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export const GOOGLE_SHOPPING_TR_BASE = '/tr/hizmetler/google-shopping';
export const GOOGLE_SHOPPING_TR_ENQUIRY = '/tr/start-project?service=google-shopping';

export function GoogleShoppingHeroVisual() {
  const steps = [
    ['Mağaza', 'Ürün, fiyat ve stok'],
    ['Merchant Center', 'Ürün verisi'],
    ['Kampanya', 'Seçilen ürün grubu'],
    ['Satın alma', 'Test edilen ölçüm'],
  ];
  return <figure className="mx-auto w-full max-w-[34rem]" aria-label="Temsili Google Alışveriş akışı: mağaza ürünü, Merchant Center, kampanya kapsamı ve satın alma ölçümü">
    <div className="rounded-2xl border border-heritage-sand bg-white p-4 shadow-[0_24px_70px_rgba(18,25,38,0.12)] sm:p-6">
      <div className="mb-4 flex items-center gap-3 rounded-xl bg-heritage-ivory p-4"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-heritage-turquoise-deep"><ShoppingBagIcon className="h-6 w-6" aria-hidden="true" /></span><div><p className="font-semibold text-gray-900">Keten masa örtüsü</p><p className="text-sm text-gray-600">Ürün kartı · temsili</p></div></div>
      <div className="grid gap-2 sm:grid-cols-2">
        {steps.map(([title, detail], i) => <div key={title} className="rounded-xl border border-heritage-turquoise/20 bg-white p-3"><div className="flex items-center gap-2 text-sm font-semibold text-gray-900">{i === 3 ? <CheckCircleIcon className="h-4 w-4 text-heritage-turquoise-deep" aria-hidden="true" /> : <span aria-hidden="true" className="h-2 w-2 rounded-full bg-heritage-turquoise" />}{title}</div><p className="mt-1 text-xs leading-5 text-gray-600">{detail}</p></div>)}
      </div>
    </div>
    <figcaption className="mt-3 text-center text-xs text-gray-500">Örnek ürün ve kampanya akışı</figcaption>
  </figure>;
}

const metadata: Record<SeoPageKind, SeoMeta> = {
  overview: { title: 'Google Alışveriş Reklamları ve Yönetimi | PakSoft', description: 'PakSoft ile Google Alışveriş reklamlarınızı planlayın. Merchant Center ürün verinizi, kampanya kapsamını ve satın alma ölçümünü birlikte inceleyelim.', heading: 'Google Alışveriş Reklamları', intro: 'Ürünlerinizi görseli, adı ve fiyatıyla müşterilere gösterin. PakSoft olarak mağazanızdaki ürün verisini Merchant Center ile karşılaştırıyor, reklamını vereceğiniz ürünleri ve kampanya türünü birlikte seçiyor, satın alma ölçümünü kontrol ediyoruz.' },
  features: { title: 'Google Merchant Center Kurulumu ve Feed Optimizasyonu | PakSoft', description: 'Google Merchant Center kurulumu, ürün veri kaynağı optimizasyonu ve Alışveriş reklamlarında ürün gruplarının nasıl yönetildiğini inceleyin.', heading: 'Google Alışveriş Reklamlarında Merchant Center ve Ürün Verisi', intro: 'Mağazanızdaki ürün bilgilerinin Google’a nasıl aktarıldığını ve hangi ürünlerin reklama dahil edildiğini birlikte kontrol edelim. PakSoft olarak Merchant Center kurulumunu, ürün verisi düzeltmelerini ve kampanya yönetimini mağazanızın ihtiyaçlarına göre kapsamlandırıyoruz.' },
  technologies: { title: 'Google Alışveriş Teknolojileri ve Satın Alma Takibi | PakSoft', description: 'Mağazanızdan Merchant Center’a ürün verisi aktarımını ve Google Ads, GA4, GTM ile satın alma ölçümünün nasıl test edildiğini inceleyin.', heading: 'Google Alışveriş Reklamlarında Ürün Verisi ve Satın Alma Takibi', intro: 'Mağazanızdan Merchant Center’a hangi ürün bilgilerinin ulaştığını ve reklam sonrası siparişlerin nasıl kaydedildiğini görün. PakSoft olarak ürün aktarımını ve satın alma ölçümünü ayrı ayrı kontrol ediyoruz. Böylece bir sorun olduğunda önce hangi sistemi inceleyeceğimizi belirleyebiliyoruz.' },
  process: { title: 'Google Alışveriş Reklamları Kurulum Süreci | PakSoft', description: 'Katalog incelemesi, ürün verisi düzeltmeleri, kampanya onayı ve satın alma testinden düzenli takibe kadar Google Alışveriş sürecini inceleyin.', heading: 'Google Alışveriş Reklamları Kurulum Süreci', intro: 'Önce satışa hazır ürünlerinizi ve mağazanızın mevcut durumunu birlikte değerlendiriyoruz. PakSoft olarak ürün verisi sorunlarını belirliyor, kampanya taslağını onayınıza sunuyor ve satın alma ölçümünü test ediyoruz. Yayından sonra ürün uygunluğunu ve kaydedilen siparişleri düzenli inceliyoruz.' },
  portfolio: { title: 'Google Alışveriş Reklamları Portföyü ve Örnekler | PakSoft', description: 'Google Alışveriş reklamlarında fiyat farkı, yanlış varyant ve satın alma ölçümü sorunlarını nasıl incelediğimizi temsili örneklerle görün.', heading: 'Google Alışveriş Reklamları Portföyü ve Kampanya Örnekleri', intro: 'Bir ürünün fiyatı neden farklı görünüyor? Reklam bağlantısı neden başka bir ölçüyü açıyor? Aşağıdaki temsili örneklerde ürün verisini, kampanya kapsamını ve satın alma ölçümünü hangi sırayla incelediğimizi görebilirsiniz.' },
  pricing: { title: 'Google Alışveriş Reklam Fiyatları ve Yönetim Ücreti | PakSoft', description: 'Google Alışveriş reklam fiyatlarını belirleyen bütçe, katalog, kurulum ve yönetim işlerini inceleyin. Mağazanız için PakSoft’tan teklif alın.', heading: 'Google Alışveriş Reklam Fiyatları Nasıl Belirlenir?', intro: 'Google Alışveriş reklam fiyatları için reklam harcamasını, ürün verisi hazırlığını ve düzenli kampanya yönetimini ayrı değerlendirin. PakSoft olarak mağazanızı ve öncelikli ürün grubunuzu inceleyip teklifin hangi işleri kapsadığını birlikte netleştiriyoruz.' },
  faq: { title: 'Google Alışveriş Reklamları Sık Sorulan Sorular | PakSoft', description: 'Google Alışveriş reklamlarında Merchant Center, ürün onayı, fiyat ve stok güncellemeleri, kampanya seçimi ve sipariş takibiyle ilgili yanıtları okuyun.', heading: 'Google Alışveriş Reklamları Sık Sorulan Sorular', intro: 'İlk kampanyanız için hangi hazırlıklar gerekir? Bir ürün neden gösterim almıyor? Merchant Center, ürün verisi ve satın alma ölçümüyle ilgili soruların yanıtlarını burada bulabilirsiniz.' },
  blog: { title: 'Google Alışveriş Reklamları Rehberleri | PakSoft', description: 'Google Alışveriş reklamlarına hazırlanmak ve Merchant Center’da fiyat, stok veya varyant sorunlarını incelemek için adım adım rehberleri okuyun.', heading: 'Google Alışveriş Reklamları Rehberleri', intro: 'İlk kampanyanızı hazırlarken hangi ürünlerden başlayacağınızı ve ürün verisi sorunlarında hangi kayıtları karşılaştıracağınızı öğrenin. Rehberler, temsili mağaza örnekleri ve uygulayabileceğiniz kontrol tabloları içeriyor.' },
};
const aside = (node: ReactNode): SectionVisual => ({ place: 'aside', node });
const art = (name: SeoVisualName, label: string, slotLabels: Record<string, string>, className = 'mx-auto w-full max-w-xl') =>
  <SeoArtwork name={name} loop label={label} slotLabels={slotLabels} className={className} />;

// Every illustration carries its own Turkish slot text (an unlabelled SVG renders
// as empty boxes). Examples follow the page copy: a home-textile store, the
// 160 × 220 cm keten masa örtüsü and its colour variants.
const V = {
  merchant: (className?: string) => art('gads-merchant-issues', 'Temsili Merchant Center ürün durumları: onaylı nevresim, fiyatı veri kaynağında eski kalan masa örtüsü, marka ve GTIN bilgisi eksik ürün', { 'slot-mc': 'Merchant Center · ürün durumları', 'slot-h-product': 'Ürün', 'slot-h-status': 'Durum', 'slot-h-fix': 'Yapılacak', 'slot-product-1': 'Nevresim takımı · mavi', 'slot-status-1': 'Onaylandı', 'slot-fix-1': '—', 'slot-product-2': 'Masa örtüsü · 160×220', 'slot-status-2': 'Reddedildi', 'slot-fix-2': 'Fiyatı eşitle', 'slot-product-3': 'Peçete seti · 6’lı', 'slot-status-3': 'Uyarı', 'slot-fix-3': 'GTIN ekle', 'slot-product-4': 'Masa örtüsü · bej', 'slot-status-4': 'Onaylandı', 'slot-fix-4': '—', 'slot-note': 'Durumlar temsilidir; güncel neden Merchant Center’daki ürün ayrıntısında görülür' }, className),
  stockSync: () => art('ecom-stock-sync', 'Temsili varyant kontrolü: keten masa örtüsünün 160 cm ölçüsü mağazada tükendi; Merchant Center’a giden kayıtta da aynı varyant tükendi, fiyat sayfayla aynı', { 'slot-variant-head': 'Ölçü (cm)', 'slot-size-1': '140', 'slot-size-2': '150', 'slot-size-3': '160', 'slot-size-4': '180', 'slot-stock-page': '160 cm · Tükendi', 'slot-buy': 'Sepete ekle', 'slot-feed': 'Gönderilen ürün verisi', 'slot-key-1': 'Varyant', 'slot-val-1': '160×220 · gri', 'slot-key-2': 'Stok', 'slot-val-2': 'Tükendi', 'slot-key-3': 'Fiyat', 'slot-val-3': 'Sayfayla aynı', 'slot-match': 'Mağaza ve veri eşleşiyor' }),
  types: () => art('gads-campaign-types', 'Kampanya seçenekleri: Arama Ağı metin reklamları, Standart Alışveriş ürün reklamları ve ürün verisiyle de çalışabilen Performance Max', { 'slot-type-1': 'Arama Ağı', 'slot-type-sub-1': 'Metin reklamları', 'slot-type-2': 'Standart Alışveriş', 'slot-type-sub-2': 'Ürün reklamları', 'slot-type-3': 'Performance Max', 'slot-type-sub-3': 'Ürün verisi + kanallar', 'slot-pmax-note': 'Tek kampanya, çok kanal' }),
  mcSetup: () => art('tech-finding', 'Temsili Merchant Center kurulum kontrolü: alan adı doğrulaması, ürün veri kaynağı, hedef ülke ve para birimi, Google Ads bağlantısı', { 'slot-title': 'Merchant Center kurulumu', 'slot-priority': 'Temsili', 'slot-label-1': 'Alan adı', 'slot-value-1': 'Doğrulandı, hak talep edildi', 'slot-label-2': 'Veri kaynağı', 'slot-value-2': 'Mağaza bağlantısı', 'slot-label-3': 'Hedef ülke', 'slot-value-3': 'Türkiye · TRY', 'slot-label-4': 'Google Ads', 'slot-value-4': 'Hesaplar bağlı' }),
  groups: () => art('category-filters', 'Temsili ürün seçimi: düzenli stoklanan nevresim ve masa örtüsü serileri ilk kampanyaya alınıyor, tedariki belirsiz seri ve sezon sonu ürünler bekletiliyor', { 'slot-category': 'Ev tekstili kataloğu', 'slot-urls': 'Ürün grupları', 'slot-url-1': 'Nevresim · düzenli stok', 'slot-url-2': 'Tedariki belirsiz seri', 'slot-url-3': 'Masa örtüsü · düzenli stok', 'slot-url-4': 'Sezon sonu ürünler', 'slot-legend-ok': 'İlk kampanyada', 'slot-legend-skip': 'Veri netleşince' }),
  weekly: () => art('monthly-plan', 'Alışveriş kampanyası kontrol takvimi: haftalık ürün durumları ve fiyat-stok farkları, aylık ürün grubu harcaması ve satın alma ölçümü', { 'slot-month': 'Kontrol takvimi', 'slot-week-1': 'Her hafta', 'slot-week-2': 'Her hafta', 'slot-week-3': 'Her ay', 'slot-week-4': 'Her ay', 'slot-task-1': 'Ürün durumları', 'slot-task-sub-1': 'Reddedilen ve uyarılı', 'slot-task-2': 'Fiyat ve stok', 'slot-task-sub-2': 'Sayfa ve veri farkı', 'slot-task-3': 'Grup harcaması', 'slot-task-sub-3': 'Kategori önceliği', 'slot-task-4': 'Satın alma ölçümü', 'slot-task-sub-4': 'Sipariş paneliyle' }),
  feedFlow: (className?: string) => art('gads-tag-flow', 'Ürün verisi akışı: mağaza kaydı, Merchant Center’a aktarım ve işlenen ürün durumu', { 'slot-step-1': 'Mağaza kaydı', 'slot-sub-1': 'Fiyat, stok, varyant', 'slot-step-2': 'Aktarım', 'slot-sub-2': 'Bağlantı, dosya veya API', 'slot-step-3': 'Merchant Center', 'slot-sub-3': 'İşlenen ürün durumu', 'slot-note': 'Örnek bir ürün kimliği her adımda karşılaştırılır.' }, className),
  ga4: () => art('gads-ga4-match', 'Satın alma ölçümü: Google Ads satın alma dönüşümü birincil, GA4’ten içe aktarılan aynı satın alma çift sayım olmaması için ikincil, sepete ekleme dönüşüm olarak kullanılmıyor', { 'slot-h-ga4': 'Ölçüm kaynağı', 'slot-h-ads': 'Google Ads’te kullanımı', 'slot-ga4-1': 'Ads etiketi · purchase', 'slot-ads-1': 'Birincil satın alma', 'slot-ga4-2': 'GA4 · purchase', 'slot-ads-2': 'İkincil · çift sayım yok', 'slot-ga4-3': 'add_to_cart', 'slot-ads-3': 'Dönüşüm olarak kullanılmaz' }),
  orderTest: () => art('gads-gtm-test', 'Temsili test siparişi: başarılı ödemede satın alma olayı çalışıyor, onay sayfası yenilendiğinde tekrar sayılmıyor, başarısız ödemede olay oluşmuyor', { 'slot-panel': 'Test siparişi · önizleme', 'slot-mode': 'Önizleme', 'slot-test-1': 'Başarılı ödeme', 'slot-result-1': 'Satın alma kaydedildi', 'slot-test-2': 'Onay sayfası yenileme', 'slot-result-2': 'Tekrar sayılmadı (doğru)', 'slot-test-3': 'Başarısız ödeme', 'slot-result-3': 'Olay yok (doğru)', 'slot-log': 'İşlem kimliği, değer ve para birimi kayda geçirilir' }),
  rail: () => art('process-rail', 'Google Alışveriş kampanya süreci: katalog ve hedef, ürün verisi düzeltmeleri, kampanya taslağı ve ölçüm, yayın ve değerlendirme', { 'slot-step-1': 'Katalog ve hedef', 'slot-step-2': 'Ürün verisi', 'slot-step-3': 'Taslak ve ölçüm', 'slot-step-4': 'Yayın ve rapor' }),
  launch: () => art('contract-scope', 'Yayın öncesi kontrol listesi: seçili ürünlerin durumu, son veri işleme, test siparişi, ürün grubu ve kampanya türü onayı; hazır olmayan ürünler bekletilir', { 'slot-doc': 'Yayın öncesi kontrol', 'slot-clause-1': 'Seçili ürünlerin durumu', 'slot-clause-2': 'Son veri işleme', 'slot-clause-3': 'Test siparişi kaydı', 'slot-clause-4': 'Ürün grubu ve bütçe onayı', 'slot-clause-5': 'Hazır olmayan ürün bekler' }),
  report: () => art('report', 'Temsili Alışveriş dönem raporu: eski fiyat düzeltildi, test siparişi doğrulandı, sezonluk ürünler ayrıldı; harcama ve satın alma eğilimi; sıradaki iş teslimat süresi', { 'slot-title': 'Alışveriş dönem raporu', 'slot-tag': 'Temsili', 'slot-done-1': 'Eski fiyat düzeltildi', 'slot-done-2': 'Test siparişi doğrulandı', 'slot-done-3': 'Sezonluk ürünler ayrıldı', 'slot-chart': 'Harcama ve satın alma', 'slot-next': 'Sıradaki iş: teslimat süresi' }),
  diagnose: () => art('tech-finding', 'Temsili örnek 2 teşhis notu: reklam büyük ölçüyü tanımlıyor ama bağlantı küçük ölçüyü açıyor; mobil ve masaüstü testi, varyant adresinin düzeltilmesi ve aynı ürün kimliğiyle yeniden kontrol', { 'slot-title': 'Teşhis notu · örnek 2', 'slot-priority': 'Temsili', 'slot-label-1': 'Bulgu', 'slot-value-1': 'Reklam 160×220, sayfa 140×180', 'slot-label-2': 'İkinci kaynak', 'slot-value-2': 'Mobil ve masaüstü testi', 'slot-label-3': 'Düzeltme', 'slot-value-3': 'Varyant adresi veride', 'slot-label-4': 'Yeniden kontrol', 'slot-value-4': 'Aynı ürün kimliği' }),
  evidence: (className?: string) => art('tech-evidence', 'Alışveriş örneklerini değerlendirme: gözlem, düzeltme ve doğrulama', { 'slot-col-1': 'Gözlem', 'slot-item-1-1': 'Ürün durumu', 'slot-item-1-2': 'Fiyat ve stok farkı', 'slot-item-1-3': 'Sipariş paneli', 'slot-col-2': 'Düzeltme', 'slot-item-2-1': 'Veri kaynağı', 'slot-item-2-2': 'Varyant adresi', 'slot-item-2-3': 'Değişiklik tarihi', 'slot-col-3': 'Doğrulama', 'slot-item-3-1': 'Yeniden işleme', 'slot-item-3-2': 'Test siparişi', 'slot-item-3-3': 'Sonraki dönem' }, className),
  budget: (className?: string) => art('gads-budget-split', 'Teklif kalemleri: reklam bütçesi Google Ads hesabınızdan Google’a ödenir; katalog hazırlığı, kurulum ve yönetim PakSoft teklifinde ayrı kalemdir', { 'slot-budget': 'Reklam bütçesi', 'slot-budget-sub': 'Kampanya harcaması', 'slot-fee': 'Yönetim ücreti', 'slot-setup': 'Katalog ve kurulum', 'slot-google': 'Google Ads hesabınız', 'slot-google-sub': 'Ödeme doğrudan Google’a', 'slot-paksoft': 'PakSoft teklifi', 'slot-paksoft-sub': 'Hizmet kalemleri ayrı' }, className),
  quote: () => art('quote-groups', 'Alışveriş reklam yönetim teklifini etkileyenler: katalog büyüklüğü, ürün verisi durumu, kategori ve kampanya sayısı, raporlama sıklığı; katalog düzeltmeleri ayrı', { 'slot-group-1': 'Katalog büyüklüğü', 'slot-group-2': 'Ürün verisi durumu', 'slot-group-3': 'Kategori ve kampanya', 'slot-group-4': 'Raporlama sıklığı', 'slot-quote': 'Yönetim ücreti', 'slot-extra': 'Katalog düzeltme ayrı' }),
};

const visuals: SeoServiceConfig['visuals'] = {
  overview: [
    ['Google Alışveriş reklam yönetiminde', aside(<GoogleShoppingHeroVisual />)],
    ['Standart Alışveriş mi', aside(V.types())],
    ['Bir ürün reklamını', aside(V.stockSync())],
    ['Mevcut kampanyaya', aside(V.merchant())],
  ],
  features: [
    ['Google Merchant Center kurulumunda', aside(V.mcSetup())],
    ['Hangi ürünleri reklama', aside(V.groups())],
    ['Yayındaki kampanyada', aside(V.weekly())],
  ],
  technologies: [
    ['Fiyat veya stok farkı', aside(V.stockSync())],
    ['Google Ads, GA4 ve GTM', aside(V.ga4())],
    ['Test siparişinde', aside(V.orderTest())],
  ],
  process: [
    ['Google Alışveriş kampanyası hangi adımlarla', { place: 'below', node: V.rail() }],
    ['Yayın kararından önce', aside(V.launch())],
    ['İlk raporda', aside(V.report())],
  ],
  portfolio: [
    ['Üç Google Alışveriş reklam örneği', aside(V.diagnose())],
  ],
  pricing: [
    ['Alışveriş reklam yönetim ücretini', aside(V.quote())],
  ],
};

const heroArt: SeoServiceConfig['heroArt'] = {
  features: () => V.merchant('w-full'),
  technologies: () => V.feedFlow('w-full'),
  process: () => <ProcessScene />,
  portfolio: () => V.evidence('w-full'),
  pricing: () => V.budget('w-full'),
};

const config: SeoServiceConfig = {
 platform: 'google-shopping', contentDir: 'content/google-shopping/tr', base: GOOGLE_SHOPPING_TR_BASE, enquiry: GOOGLE_SHOPPING_TR_ENQUIRY,
 serviceName: 'Google Alışveriş Reklamları', Icon: ShoppingBagIcon, metadata, visuals,
 heroArt,
 rotating: { features: { lead: 'Merchant Center', words: ['Ürün Verisi', 'Katalog Kontrolleri'] }, technologies: { lead: 'Ürün Verisi', words: ['Aktarım', 'Satın Alma Takibi'] }, process: { lead: 'Google Alışveriş', words: ['Kurulum', 'Yayın Kontrolleri'] }, portfolio: { lead: 'Ürün Reklamları', words: ['Kampanya Örnekleri', 'Kontrol Adımları'] }, pricing: { lead: 'Google Alışveriş', words: ['Reklam Fiyatları', 'Teklif Kapsamı'] }, faq: { lead: 'Google Alışveriş', words: ['Sık Sorulan Sorular', 'Ürün ve Kampanya'] }, blog: { lead: 'Google Alışveriş', words: ['Reklam Rehberleri', 'Ürün Verisi'] } },
 primary: { overview: 'Alışveriş Reklamı Teklifi Al', features: 'Kataloğumu Görüşelim', technologies: 'Ölçüm Planını Görüşelim', process: 'Kampanya Planımı Görüşelim', portfolio: 'Örneğimi İnceleyelim', pricing: 'Teklif Alın', faq: 'Kampanyamı Görüşelim', blog: 'Alışveriş Reklamlarını Görüşelim' },
 secondary: { features: ['Ürün Verisi Kontrollerini İncele', '#alisveris-urun-verisi'], technologies: ['Veri Akışını İncele', '#alisveris-veri-akisi'], process: ['Kampanya Adımlarını İncele', '#alisveris-kampanya-adimlari'], portfolio: ['Kampanya Örneklerini İncele', '#alisveris-kampanya-ornekleri'], pricing: ['Maliyet Kalemlerini İncele', '#alisveris-maliyet-kalemleri'], faq: ['Soruları İncele', '#baslangic-ve-kampanya'] },
 closingLink: { overview: ['Kurulum Sürecini İncele', `${GOOGLE_SHOPPING_TR_BASE}/surec`], features: ['Google Alışveriş Genel Bakış', GOOGLE_SHOPPING_TR_BASE], technologies: ['Ürün Verisi Özelliklerini İncele', `${GOOGLE_SHOPPING_TR_BASE}/ozellikler`], process: ['Fiyatlandırmayı İncele', `${GOOGLE_SHOPPING_TR_BASE}/fiyatlandirma`], portfolio: ['Kurulum Sürecini İncele', `${GOOGLE_SHOPPING_TR_BASE}/surec`], pricing: ['Kurulum Sürecini İncele', `${GOOGLE_SHOPPING_TR_BASE}/surec`], faq: ['Fiyatlandırmayı İncele', `${GOOGLE_SHOPPING_TR_BASE}/fiyatlandirma`] },
 closingDefault: { title: 'Google Alışveriş kampanyanızı planlayalım', text: 'Mağazanızı ve reklam vermek istediğiniz ürün grubunu paylaşın.' },
 closingCopy: { overview: { title: 'Google Alışveriş reklamlarınızı birlikte planlayalım', text: 'Mağazanızı ve öne çıkarmak istediğiniz ürün grubunu paylaşın. Katalog, kampanya ve satın alma ölçümü için ilk kontrolü birlikte belirleyelim.' }, features: { title: 'Ürün kataloğunuzu birlikte inceleyelim', text: 'Mağaza adresinizi ve Merchant Center’da gördüğünüz sorunu paylaşın. Hangi ürün ve veri alanlarından başlayacağımızı belirleyelim.' }, technologies: { title: 'Ürün verisi ve satın alma ölçümünü kontrol edelim', text: 'Mağaza altyapınızı ve takip etmek istediğiniz sipariş bilgisini paylaşın. Aktarım ve ölçüm adımlarını birlikte değerlendirelim.' }, process: { title: 'Kampanya kurulumunun ilk adımını planlayalım', text: 'Ürün grubunuzu ve mağazanızın mevcut durumunu paylaşın. Katalog incelemesi ve onay adımlarını belirleyelim.' }, portfolio: { title: 'Ürün reklamınızdaki bir sorunu inceleyelim', text: 'Ürün bağlantısını ve gördüğünüz farkı paylaşın. Önce hangi kaydı karşılaştıracağımızı belirleyelim.' }, pricing: { title: 'Google Alışveriş hizmet kapsamı için teklif alın', text: 'Mağazanızı, katalog büyüklüğünü ve ihtiyaç duyduğunuz işleri paylaşın. Reklam harcaması ile hizmet kapsamını ayrı netleştirelim.' }, faq: { title: 'Google Alışveriş sorularınızı yanıtlayalım', text: 'Mağazanızdaki ürün, kampanya veya sipariş ölçümüyle ilgili sorunuzu paylaşın.' } },
 jumpLabels: [['Google Alışveriş reklam yönetiminde', 'Hizmet kapsamı'], ['Mağazanız Alışveriş reklamlarına', 'Mağaza uygunluğu'], ['Standart Alışveriş mi', 'Kampanya türleri'], ['Bir ürün reklamını', 'Ürün örneği'], ['Mevcut kampanyaya', 'İlk inceleme'], ['Google Merchant Center kurulumunda', 'Merchant Center'], ['Ürün veri kaynağı optimizasyonu', 'Ürün verisi'], ['Hangi ürünleri reklama', 'Ürün seçimi'], ['Yayındaki kampanyada', 'Optimizasyon'], ['Google Alışveriş kampanyası hangi', 'Kampanya adımları'], ['Üç Google Alışveriş reklam örneği', 'Kampanya örnekleri'], ['Reklam harcaması ve hizmet', 'Maliyet kalemleri'], ['Başlangıç ve kampanya', 'Başlangıç ve kampanya'], ['Ürün verisi ve onay', 'Ürün verisi ve onay'], ['Sipariş ve yönetim', 'Sipariş ve yönetim'], ['Mağaza kataloğu', 'Katalog aktarımı'], ['Fiyat veya stok farkı', 'Fiyat ve stok farkı'], ['Google Ads, GA4 ve GTM', 'Satın alma ölçümü'], ['Test siparişinde', 'Test siparişi'], ['İlk görüşmede', 'İlk görüşme'], ['Yayın kararından', 'Yayın öncesi kontrol'], ['İlk raporda', 'İlk rapor'], ['Yapılan değişikliği', 'Değerlendirme verileri'], ['İnceleme için', 'Örneğinizi paylaşın'], ['Alışveriş reklam yönetim ücretini', 'Ücreti etkileyenler'], ['İlk reklam bütçesini', 'Başlangıç bütçesi'], ['Teklif istemek için', 'Gerekli bilgiler'], ['Fiyatlandırma hakkında', 'Kısa yanıtlar']],
 sectionIds: { 'overview:Bir ürün reklamını nasıl kontrol ediyoruz?': 'alisveris-urun-ornegi', 'features:Ürün veri kaynağı optimizasyonu hangi alanları kapsar?': 'alisveris-urun-verisi', 'technologies:Mağaza kataloğu Merchant Center’a nasıl aktarılır?': 'alisveris-veri-akisi', 'process:Google Alışveriş kampanyası hangi adımlarla hazırlanır?': 'alisveris-kampanya-adimlari', 'portfolio:Üç Google Alışveriş reklam örneği': 'alisveris-kampanya-ornekleri', 'pricing:Reklam harcaması ve hizmet bedeli hangi işleri kapsar?': 'alisveris-maliyet-kalemleri', 'faq:Başlangıç ve kampanya': 'baslangic-ve-kampanya', 'faq:Ürün verisi ve onay': 'urun-verisi-ve-onay', 'faq:Sipariş ve yönetim': 'siparis-ve-yonetim' },
 portfolioBadge: 'Temsili örnek',
 blog: { id: 'google-alisveris-rehberleri', title: 'Google Alışveriş reklamları için pratik rehberler', text: 'Kampanyaya hazırlık, Merchant Center ürün verisi ve sipariş kontrolleri için adım adım rehberleri inceleyin.', asideTitle: 'Mağazanız için ilk kontrolü planlayın', asideText: 'Öne çıkarmak istediğiniz kategoriyi ve varsa ürün verisi sorununu paylaşın.', guides: getGoogleShoppingGuides },
};
const service = createSeoService(config);
export const getGoogleShoppingMeta = (page: SeoPageKind) => service.getMeta(page);
export const getGoogleShoppingSocialMeta = (page: SeoPageKind, canonicalUrl: string, image?: string) => service.getSocialMeta(page, canonicalUrl, image);
export const GoogleShoppingOverviewBody = service.OverviewBody;
export const GoogleShoppingTurkishPage = service.Page;
export default service.Page;
