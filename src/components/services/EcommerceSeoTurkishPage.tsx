import type { ReactNode } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import IkasVisual from '@/components/ikas/visuals/IkasVisual';
import SeoArtwork from '@/components/seo/visuals/SeoArtwork';
import type { SeoVisualName } from '@/components/seo/visuals/generated';
import type { SectionVisual } from '@/components/e-commerce/ServiceMarkdownPage';
import { getEcommerceSeoGuides } from '@/components/services/service-blogs/ecommerce-seo';
import { createSeoService, type SeoMeta, type SeoPageKind, type SeoServiceConfig } from './seo-pages/SeoServiceEngine';

// Turkish E-Ticaret SEO service at /tr/hizmetler/ecommerce-seo. Copy:
// content/ecommerce-seo/tr (Codex packs in Keywords/Pazarlama/SEO/E_Ticaret_SEO/Codex).
// Keyword targets from PakSoft_SEO_Keyword_Master.xlsx (E-Ticaret SEO rows):
// e ticaret seo (260), e ticaret seo hizmeti (90), shopify seo (90), ikas seo (70),
// e ticaret seo ajansı (70), danışmanlığı (50), fiyatları, woocommerce seo ayarları.

export type EcommerceSeoPageKind = SeoPageKind;
export const ECOMMERCE_SEO_TR_BASE = '/tr/hizmetler/ecommerce-seo';
export const ECOMMERCE_SEO_TR_ENQUIRY = '/tr/start-project?service=ecommerce-seo';
const base = ECOMMERCE_SEO_TR_BASE;

const metadata: Record<SeoPageKind, SeoMeta> = {
  overview: { title: 'E-Ticaret SEO Hizmeti ve Danışmanlığı | PakSoft', description: 'E-ticaret SEO ajansı PakSoft ile kategori ve ürün sayfalarınızı müşteri aramalarıyla eşleştirin. Shopify, ikas ve WooCommerce SEO için mağazanıza özel plan alın.', heading: 'E-Ticaret SEO Hizmeti', intro: 'Müşterileriniz Google’da bir ürün türü, marka veya model aradığında mağazanızda hangi sayfaya ulaşmalı? PakSoft ile bu aramaları kategori ve ürün sayfalarınızla eşleştirin. İlk incelemede görünürlüğü sınırlayan sorunları ve satışa katkısını takip edebileceğiniz iyileştirmeleri belirleyelim.' },
  features: { title: 'E-Ticaret SEO Optimizasyonu: Kategori ve Ürün SEO | PakSoft', description: 'Kategori sayfası ve ürün sayfası SEO’su, filtre ve varyant kuralları ve organik satış ölçümü: e-ticaret SEO optimizasyonunun kapsamını ve çıktılarını inceleyin.', heading: 'E-Ticaret SEO Optimizasyonu Neleri Kapsar?', intro: 'E-ticaret SEO optimizasyonu; ürün ve kategori sayfalarını müşterilerin aramalarıyla eşleştirmeyi, filtre ve varyant adreslerini düzenlemeyi ve değişikliklerin etkisini takip etmeyi kapsar. Mağazanız için hangi çıktıları alabileceğinizi inceleyin.' },
  technologies: { title: 'E-Ticaret SEO Araçları ve Platform Ayarları | PakSoft', description: 'Shopify, ikas ve WooCommerce SEO ayarlarını, ürün işaretlemesini, Merchant Center veri akışını ve satış ölçümünü nasıl incelediğimizi öğrenin.', heading: 'E-Ticaret SEO Araçları ve Mağaza Altyapısı', intro: 'Ürün fiyatı veya stok durumu değiştiğinde ürün sayfası, arama motorlarına sunulan ürün bilgisi ve varsa ürün veri akışı aynı değişikliği yansıtıyor mu? Hangi verinin nereden geldiğini ve sonuçların nasıl kontrol edileceğini birlikte belirleyelim.' },
  process: { title: 'E-Ticaret SEO Nasıl Yapılır? Çalışma Süreci | PakSoft', description: 'E-ticaret sitesi SEO çalışması nasıl yapılır? Mağaza incelemesinden pilot uygulamaya ve organik performans takibine kadar adımları öğrenin.', heading: 'E-Ticaret SEO Çalışması Nasıl Yapılır?', intro: 'Mağazanızın öncelikli ürün grubunu ve arama performansını inceleriz. Bulguları etkilenen sayfalara göre sıralar, değişiklikleri örnek adreslerde kontrol eder ve yayın sonrasında kategori ile ürün sayfalarının performansını takip ederiz.' },
  portfolio: { title: 'E-Ticaret SEO Örnekleri ve Mağaza Senaryoları | PakSoft', description: 'Kategori görünürlüğü, ürün varyantları ve mağaza taşıması için e-ticaret SEO senaryolarını inceleyin. Her çalışmanın nasıl doğrulandığını öğrenin.', heading: 'E-Ticaret SEO Proje Örnekleri', intro: 'Kategori görünürlüğü, ürün stok bilgisi ve mağaza geçişi farklı incelemeler gerektirir. Aşağıdaki temsili senaryolar, her durumda hangi sayfadan başlanabileceğini ve değişikliğin nasıl kontrol edileceğini gösterir.' },
  pricing: { title: 'E-Ticaret SEO Fiyatları ve Teklif Kapsamı | PakSoft', description: 'E-ticaret SEO fiyatlarını ve paketlerini etkileyen kategori, ürün, filtre, platform geçişi ve satış ölçümü işlerini inceleyin. Mağazanıza özel teklif alın.', heading: 'E-Ticaret SEO Fiyatları Nasıl Belirlenir?', intro: 'E-ticaret SEO fiyatı; incelenecek kategori ve ürün gruplarına, mağaza altyapısına ve uygulamayı kimin üstleneceğine göre belirlenir. İçerik, tema veya entegrasyon değişiklikleri ve yayın sonrası takip ayrı değerlendirilir.' },
  faq: { title: 'E-Ticaret SEO Nedir? Sık Sorulan Sorular | PakSoft', description: 'E-ticaret SEO nedir, kategori ve ürün SEO’su nereden başlar, varyant ve stok değişiklikleri nasıl ele alınır? Mağaza SEO’su hakkında sık sorulan sorular.', heading: 'E-Ticaret SEO Hakkında Sık Sorulan Sorular', intro: 'Kategori ve ürün sayfalarından başlamayı, stok ve filtre değişikliklerini ele almayı ve SEO çalışmalarını ölçmeyi öğrenin.' },
  blog: { title: 'E-Ticaret SEO Rehberleri: Kategori ve Ürün Sayfası | PakSoft', description: 'Kategori sayfası ve ürün sayfası SEO rehberleri: filtre, varyant ve stok kararlarını mağaza örnekleriyle inceleyin.', heading: 'E-Ticaret SEO Rehberleri', intro: 'Mağazanızda hangi aramaya hangi sayfanın yanıt vereceğini belirlemek için kategori ve ürün rehberlerimizi inceleyin. Her rehber, örnek bir mağaza sayfasında yapabileceğiniz kontrolleri gösterir.' },
};

/* ------------------------------------------------------------------ visuals */

const aside = (node: ReactNode): SectionVisual => ({ place: 'aside', node });
const art = (name: SeoVisualName, label: string, slotLabels: Record<string, string>, className = 'mx-auto w-full max-w-xl') =>
  <SeoArtwork name={name} loop label={label} slotLabels={slotLabels} className={className} />;

// Each visual appears once per service (heroes included).
const V = {
  richResult: () => art('ecom-rich-result', 'Temsili arama sonucu: mağazanın ürün sonucu yıldız, stok ve fiyat bilgisiyle ve kategori bağlantılarıyla gösteriliyor', { 'slot-query': 'yürüyüş ayakkabısı', 'slot-domain': 'magazaniz.com › yuruyus-ayakkabisi', 'slot-rating': 'Değerlendirmeler', 'slot-stock': 'Stokta', 'slot-price': 'Fiyat bilgisi', 'slot-link-1': 'Kadın', 'slot-link-2': 'Erkek', 'slot-link-3': 'Su geçirmez' }),
  platforms: () => art('ecom-platforms', 'Dört altyapı: Shopify’da koleksiyon ve tema, ikas’ta kategori ve varyant, WooCommerce’te kalıcı bağlantı ve eklenti, diğer altyapılarda panel alanları incelenir', { 'slot-plat-1': 'Shopify', 'slot-focus-1': 'Koleksiyon · tema', 'slot-plat-2': 'ikas', 'slot-focus-2': 'Kategori · varyant', 'slot-plat-3': 'WooCommerce', 'slot-focus-3': 'Eklenti · bağlantı', 'slot-plat-4': 'Diğer', 'slot-focus-4': 'Panel alanları' }),
  deliverables: (className?: string) => art('deliverables', 'Temsili e-ticaret SEO çıktıları: kategori ve ürün eşleştirmesi, içerik ve bağlantı listesi, adres ve indeksleme planı, ölçüm planı', { 'slot-doc-1': 'Sayfa eşleştirmesi', 'slot-doc-2': 'İçerik listesi', 'slot-doc-3': 'Adres planı', 'slot-doc-4': 'Ölçüm planı' }, className),
  tree: () => art('ecom-category-tree', 'Temsili mağaza yapısı: genel “yürüyüş ayakkabısı” araması kategori sayfasına, marka ve model araması ürün sayfasına yönleniyor; içerik haritası Ayakkabı › Yürüyüş ayakkabısı › Model A', { 'slot-head-q': 'Arama', 'slot-head-s': 'Mağaza yapısı', 'slot-q-1': 'yürüyüş ayakkabısı', 'slot-q-2': 'marka model 42', 'slot-root': 'Ayakkabı', 'slot-cat': 'Yürüyüş ayakkabısı', 'slot-cat-2': 'Koşu ayakkabısı', 'slot-prod': 'Model A', 'slot-crumb': 'Ayakkabı › Yürüyüş ayakkabısı › Model A' }),
  stockRules: () => art('ecom-stock-rules', 'Temsili sayfa kuralları: geçici olarak tükenen ürünün sayfası stok bilgisiyle açık kalır, kalıcı kaldırılan ürün en yakın ürüne veya kategoriye yönlendirilir, sıralama filtresi için ana kategori adresi tercih edilir', { 'slot-head-state': 'Sayfa durumu', 'slot-head-rule': 'Uygulanacak kural', 'slot-state-1': 'Geçici olarak tükendi', 'slot-state-2': 'Kalıcı olarak kaldırıldı', 'slot-state-3': 'Sıralama filtresi', 'slot-rule-1': 'Sayfa açık, stok bilgisi görünür', 'slot-rule-2': 'En yakın ürüne veya kategoriye', 'slot-rule-3': 'Ana kategori adresi tercih edilir' }),
  tools: (className?: string) => art('tools', 'Temsili veri kaynakları: Search Console, site taraması, Merchant Center ve GA4 aynı ürün ve kategori sayfaları için farklı soruları yanıtlıyor', { 'slot-tool-1': 'Search Console', 'slot-tool-2': 'Site taraması', 'slot-tool-3': 'Merchant Center', 'slot-tool-4': 'GA4', 'slot-center': 'Ürün ve kategori' }, className),
  stockSync: () => art('ecom-stock-sync', 'Temsili stok kontrolü: ürün sayfasında 42 numara tükendi olarak görünüyor; ürün veri akışında aynı varyantın stok bilgisi de tükendi, fiyat sayfayla aynı', { 'slot-variant-head': 'Numara', 'slot-size-1': '40', 'slot-size-2': '41', 'slot-size-3': '42', 'slot-size-4': '43', 'slot-stock-page': '42 numara · Tükendi', 'slot-buy': 'Sepete ekle', 'slot-feed': 'Ürün verisi', 'slot-key-1': 'Varyant', 'slot-val-1': '42 numara', 'slot-key-2': 'Stok', 'slot-val-2': 'Tükendi', 'slot-key-3': 'Fiyat', 'slot-val-3': 'Sayfayla aynı', 'slot-match': 'Sayfa ve veri eşleşiyor' }),
  funnel: () => art('ecom-sales-funnel', 'Temsili satış ölçümü: organik ziyaret, ürün görüntüleme, sepete ekleme ve satın alma adımları; satın alma sipariş başına bir kez kaydediliyor', { 'slot-step-1': 'Organik ziyaret', 'slot-step-2': 'Ürün görüntüleme', 'slot-step-3': 'Sepete ekleme', 'slot-step-4': 'Satın alma', 'slot-once': 'Sipariş başına bir kayıt' }),
  priority: (className?: string) => art('priority-board', 'Temsili mağaza öncelik listesi: kategori iç bağlantısı, varyant adresleri ve ürün şablonu başlığı; her bulgu için etkilenen sayfa ve sorumlu', { 'slot-board': 'Mağaza öncelik listesi', 'slot-col-1': 'Bulgu', 'slot-col-2': 'Etkilenen sayfa', 'slot-col-3': 'Sorumlu', 'slot-find-1': 'Kategoriye bağlantı yok', 'slot-find-2': 'Varyant adresleri', 'slot-find-3': 'Ürün şablonu başlığı', 'slot-page-1': 'Ana kategori', 'slot-page-2': 'Ürün sayfaları', 'slot-page-3': 'Tüm ürünler', 'slot-owner-1': 'PakSoft', 'slot-owner-2': 'Ekibiniz', 'slot-owner-3': 'PakSoft', 'slot-progress': 'Pilot sayfalar' }, className),
  rail: () => art('process-rail', 'E-ticaret SEO çalışmasının dört aşaması: başlangıç verisi, sayfa öncelikleri, pilot uygulama ve takip', { 'slot-step-1': 'Başlangıç', 'slot-sub-1': 'Ürün grubu ve veriler', 'slot-step-2': 'Öncelik', 'slot-sub-2': 'Sayfa grupları', 'slot-step-3': 'Pilot', 'slot-sub-3': 'Örnek sayfalarda uygulama', 'slot-step-4': 'Takip', 'slot-sub-4': 'Kategori ve ürün performansı' }, 'mt-8 hidden w-full lg:block'),
  report: () => art('report', 'Temsili yayın sonrası kontrol raporu: yönlendirmeler, menü bağlantıları ve site haritası kontrol edildi; kategori gösterim ve tıklama eğilimi; sıradaki öncelik ürün şablonu', { 'slot-title': 'Yayın sonrası kontrol', 'slot-tag': 'Temsili', 'slot-done-1': 'Yönlendirmeler test edildi', 'slot-done-2': 'Menü bağlantıları güncel', 'slot-done-3': 'Site haritası yenilendi', 'slot-chart': 'Kategori gösterim ve tıklama', 'slot-next': 'Sıradaki öncelik: ürün şablonu' }),
  scenarios: (className?: string) => art('ecom-scenarios', 'Üç temsili mağaza senaryosu: kategori ve filtre adresleri, varyant stok tutarlılığı ve platform geçişi', { 'slot-title-1': 'Kategori ve filtre adresleri', 'slot-check-1': 'Kontrol: kategori gösterimleri', 'slot-title-2': 'Varyant stok tutarlılığı', 'slot-check-2': 'Kontrol: sayfa ve veri eşleşmesi', 'slot-title-3': 'Platform geçişi', 'slot-check-3': 'Kontrol: eski adres yönlendirmeleri', 'slot-tag-1': 'Temsili', 'slot-tag-2': 'Temsili', 'slot-tag-3': 'Temsili' }, className),
  quote: (className?: string) => art('quote-groups', 'Temsili e-ticaret SEO teklifi: kategori ve ürün içeriği, filtre ve varyant adresleri, platform geçişi ve satış ölçümü kalemleri; tema ve entegrasyon geliştirmesi ayrı değerlendiriliyor', { 'slot-group-1': 'Kategori ve ürün içeriği', 'slot-group-2': 'Filtre ve varyant adresleri', 'slot-group-3': 'Platform geçişi', 'slot-group-4': 'Satış ölçümü', 'slot-quote': 'Mağaza SEO teklifi', 'slot-extra': 'Tema · entegrasyon işleri' }, className),
};

const VISUALS: SeoServiceConfig['visuals'] = {
  overview: [
    ['E-ticaret SEO çalışması neleri kapsar', aside(V.richResult())],
    ['Shopify SEO, ikas SEO', aside(V.platforms())],
  ],
  features: [
    ['Kategori sayfası ve ürün sayfası', aside(V.tree())],
    ['Filtre, varyant ve stok', aside(V.stockRules())],
  ],
  technologies: [
    ['Örnek kontrol', aside(V.stockSync())],
    ['Satış ölçümü nasıl', aside(V.funnel())],
  ],
  process: [
    ['E-ticaret SEO nasıl yapılır', { place: 'below', node: V.rail() }],
    ['Yayından sonra neyi', aside(V.report())],
  ],
  pricing: [
    ['E-ticaret SEO paketleri', aside(<IkasVisual name="method-options" loop label="Üç çalışma türü: tek seferlik mağaza incelemesi, proje bazlı uygulama ve aylık e-ticaret SEO çalışması" slotLabels={{ 'slot-option-1': 'Tek seferlik inceleme', 'slot-option-2': 'Proje bazlı uygulama', 'slot-option-3': 'Aylık çalışma' }} className="mx-auto w-full max-w-xl" />)],
  ],
};

const HERO_ART: SeoServiceConfig['heroArt'] = {
  features: () => V.deliverables('w-full'),
  technologies: () => V.tools('w-full'),
  process: () => V.priority('w-full'),
  portfolio: () => V.scenarios('w-full'),
  pricing: () => V.quote('w-full'),
};

const ROTATING: SeoServiceConfig['rotating'] = {
  features: { lead: 'E-Ticaret SEO', words: ['Optimizasyonu', 'Kategori SEO’su', 'Ürün Sayfası SEO’su'] },
  technologies: { lead: 'E-Ticaret SEO', words: ['Araçları', 'Platform Ayarları', 'Satış Ölçümü'] },
  process: { lead: 'E-Ticaret SEO', words: ['Nasıl Yapılır?', 'Çalışma Süreci', 'Pilot Uygulama'] },
  portfolio: { lead: 'E-Ticaret SEO', words: ['Örnekleri', 'Mağaza Senaryoları', 'Kontrol Adımları'] },
  pricing: { lead: 'E-Ticaret SEO', words: ['Fiyatları', 'Paketleri', 'Teklif Kapsamı'] },
  faq: { lead: 'E-Ticaret SEO', words: ['Nedir?', 'Sık Sorulanlar', 'Mağaza Soruları'] },
  blog: { lead: 'E-Ticaret SEO', words: ['Rehberleri', 'Kategori Sayfası', 'Ürün Sayfası'] },
};

const PRIMARY: Record<SeoPageKind, string> = { overview: 'Mağazam İçin SEO Planı Al', features: 'Mağazam İçin Kapsam Belirle', technologies: 'Mağazam İçin SEO Planı Al', process: 'Mağazam İçin SEO Planı Al', portfolio: 'Mağazam İçin SEO Planı Al', pricing: 'Mağazam İçin SEO Teklifi Al', faq: 'Mağazam İçin SEO Planı Al', blog: 'Mağazam İçin SEO Planı Al' };
const SECONDARY: SeoServiceConfig['secondary'] = {
  features: ['Çıktıları İncele', '#e-ticaret-seo-ciktilari'], technologies: ['Veri Kontrollerini İncele', '#e-ticaret-seo-veri-kontrolleri'], process: ['Çalışma Adımlarını İncele', '#e-ticaret-seo-adimlari'],
  portfolio: ['Senaryoları İncele', '#e-ticaret-seo-senaryolari'], pricing: ['Fiyatı Etkileyen İşleri İncele', '#e-ticaret-seo-fiyat-kalemleri'], faq: ['Sorulara Göz At', ''],
};
const CLOSING_LINK: SeoServiceConfig['closingLink'] = {
  overview: ['E-Ticaret SEO Sürecini İncele', `${base}/surec`], features: ['E-Ticaret SEO Sürecini İncele', `${base}/surec`], technologies: ['E-Ticaret SEO Sürecini İncele', `${base}/surec`],
  process: ['E-Ticaret SEO Fiyatlarını İncele', `${base}/fiyatlandirma`], portfolio: ['E-Ticaret SEO Sürecini İncele', `${base}/surec`], pricing: ['E-Ticaret SEO Sürecini İncele', `${base}/surec`], faq: ['E-Ticaret SEO Fiyatlarını İncele', `${base}/fiyatlandirma`],
};

const JUMP_LABELS: [string, string][] = [
  ['E-ticaret SEO çalışması neleri kapsar', 'Kapsam'], ['E-ticaret sitesi SEO çalışmasına', 'Nereden başlanır?'], ['Shopify SEO, ikas SEO', 'Shopify, ikas, WooCommerce'],
  ['Kategori sayfası ve ürün sayfası', 'Kategori ve ürün'], ['Filtre, varyant ve stok', 'Filtre ve stok'], ['Mağazanız hangi çıktıları', 'Çıktılar'], ['E-ticaret SEO tekniklerinde', 'İlk aşama'],
  ['Shopify, ikas ve WooCommerce SEO ayarları', 'Platform ayarları'], ['Hangi veriyle neyi', 'Veri kontrolleri'], ['Örnek kontrol', 'Varyant stoku'], ['Satış ölçümü nasıl', 'Satış ölçümü'],
  ['E-ticaret SEO nasıl yapılır', 'Dört adım'], ['Yayından sonra neyi', 'Yayın sonrası'], ['İlk görüşmeye hangi', 'Hazırlık'],
  ['Mağazalarda karşılaşılan', 'Senaryolar'],
  ['E-ticaret SEO fiyatlarını', 'Fiyat kalemleri'], ['E-ticaret SEO paketleri', 'Çalışma türleri'],
];

const SECTION_IDS: Record<string, string> = {
  'overview:E-ticaret SEO çalışması neleri kapsar?': 'e-ticaret-seo-kapsami',
  'features:Mağazanız hangi çıktıları alabilir?': 'e-ticaret-seo-ciktilari',
  'technologies:Hangi veriyle neyi kontrol ederiz?': 'e-ticaret-seo-veri-kontrolleri',
  'process:E-ticaret SEO nasıl yapılır? İlk incelemeden yayın sonrası takibe': 'e-ticaret-seo-adimlari',
  'portfolio:Mağazalarda karşılaşılan üç SEO senaryosu': 'e-ticaret-seo-senaryolari',
  'pricing:E-ticaret SEO fiyatlarını hangi işler etkiler?': 'e-ticaret-seo-fiyat-kalemleri',
};

const service = createSeoService({
  platform: 'ecommerce-seo',
  contentDir: 'content/ecommerce-seo/tr',
  base,
  enquiry: ECOMMERCE_SEO_TR_ENQUIRY,
  serviceName: 'E-Ticaret SEO',
  parentCrumb: { label: 'SEO Hizmeti', href: '/tr/hizmetler/seo' },
  Icon: ShoppingBagIcon,
  metadata,
  visuals: VISUALS,
  heroArt: HERO_ART,
  rotating: ROTATING,
  primary: PRIMARY,
  secondary: SECONDARY,
  closingLink: CLOSING_LINK,
  closingDefault: { title: 'Mağazanız için ilk SEO adımını belirleyelim', text: 'Mağaza adresinizi ve öncelikli ürün grubunuzu paylaşın. İlk görüşmede hangi kategori ve ürün sayfalarını ele alacağımızı birlikte belirleyelim.' },
  jumpLabels: JUMP_LABELS,
  sectionIds: SECTION_IDS,
  portfolioBadge: 'Temsili senaryo',
  blog: { id: 'e-ticaret-seo-rehberleri', title: 'Kategori ve ürün sayfalarınızı aramalara göre düzenleyin', text: 'Kategori sayfası SEO’su ve ürün sayfası SEO’su için örnek mağaza sayfalarıyla hazırlanmış rehberler.', asideTitle: 'Rehberleri kendi mağazanıza uygulayalım', asideText: 'Mağaza adresinizi ve öncelikli bir kategori bağlantısını paylaşın.', guides: getEcommerceSeoGuides },
});

export const getEcommerceSeoTurkishMeta = service.getMeta;
export const getEcommerceSeoTurkishSocialMeta = service.getSocialMeta;
export const EcommerceSeoTurkishOverviewBody = service.OverviewBody;
export default service.Page;
