import type { ReactNode } from 'react';
import { MegaphoneIcon } from '@heroicons/react/24/outline';
import type { SectionVisual } from '@/components/e-commerce/ServiceMarkdownPage';
import { ProcessScene } from '@/components/services/hero-visuals/scenes-internal';
import SeoArtwork from '@/components/seo/visuals/SeoArtwork';
import type { SeoVisualName } from '@/components/seo/visuals/generated';
import { createSeoService, type SeoPageKind, type SeoServiceConfig } from './seo-pages/SeoServiceEngine';
import { getMetaAdsGuides } from './service-blogs/meta-ads';
import metadata from '../../../content/meta-ads/tr/metadata.json';

export const META_ADS_TR_BASE = '/tr/hizmetler/meta-ads';
export const META_ADS_TR_ENQUIRY = '/tr/start-project?service=meta-ads';
const base = META_ADS_TR_BASE;

const aside = (node: ReactNode): SectionVisual => ({ place: 'aside', node });
const art = (name: SeoVisualName, label: string, slotLabels: Record<string, string>, className = 'mx-auto w-full max-w-xl') =>
  <SeoArtwork name={name} loop label={label} slotLabels={slotLabels} className={className} />;

// Every illustration carries its own Turkish slot text (an unlabelled SVG renders as empty boxes).
// No result numbers, no brand logos; examples stay generic like the page copy.
const V = {
  scope: (c?: string) => art('role-lanes', 'Meta reklam yönetimine dahil olabilecek işler: hesap ve ölçüm kontrolü, mesaj ve kreatif planı, kampanya değerlendirmesi', { 'slot-role-1': 'Hesap ve ölçüm', 'slot-role-sub-1': 'Kontrol', 'slot-task-1-1': 'Hesap erişimleri', 'slot-task-1-2': 'Hedef sayfalar', 'slot-task-1-3': 'Başarı tanımı', 'slot-role-2': 'Mesaj ve kreatif', 'slot-role-sub-2': 'Plan', 'slot-task-2-1': 'Ürün faydası', 'slot-task-2-2': 'Müşteri soruları', 'slot-task-2-3': 'Görsel malzeme', 'slot-role-3': 'Değerlendirme', 'slot-role-sub-3': 'Dönemsel', 'slot-task-3-1': 'Harcama ve sonuç', 'slot-task-3-2': 'Değişiklik kaydı', 'slot-task-3-3': 'Sonraki adım' }, c),
  placements: (c?: string) => art('channel-compare', 'Aynı ürün mesajı her yerleşimde ayrı kontrol edilir: önizlemesiz yayında ürün görseli kesilebilir ve yazı mobilde okunmayabilir; yerleşime göre hazırlıkta Facebook ve Instagram akış, hikâye ve Reels görünümü kontrol edilir', { 'slot-market': 'Önizlemesiz yayın', 'slot-market-sub': 'Tek görsel her yere', 'slot-market-row-1': 'Aynı ürün mesajı', 'slot-market-row-2': 'Doğru bağlantı', 'slot-market-row-3': 'Kesilen ürün görseli', 'slot-market-row-4': 'Okunmayan yazı', 'slot-store': 'Yerleşime göre', 'slot-store-sub': 'Facebook ve Instagram', 'slot-store-row-1': 'Akış', 'slot-store-row-2': 'Hikâye', 'slot-store-row-3': 'Reels', 'slot-store-row-4': 'Mobil metin' }, c),
  landing: (c?: string) => art('page-annotate', 'Tıklamadan sonraki deneyim: reklamdaki teklif sayfada aynı, fiyat ve teslimat bilgisi görünür, form mobilde çalışıyor, bağlantı doğru sayfaya gidiyor', { 'slot-tag-1': 'Teklif reklamla aynı', 'slot-tag-2': 'Fiyat ve teslimat', 'slot-tag-3': 'Mobil form', 'slot-tag-4': 'Doğru bağlantı' }, c),
  agency: (c?: string) => art('deliverables', 'Meta reklam ajansı seçerken karşılaştırılacak kapsam: hesap sahipliği, kreatif üretimi, teknik kurulum ve rapor içeriği', { 'slot-doc-1': 'Hesap sahipliği', 'slot-doc-2': 'Kreatif üretimi', 'slot-doc-3': 'Teknik kurulum', 'slot-doc-4': 'Rapor içeriği' }, c),
  prep: (c?: string) => art('tech-finding', 'Temsili kampanya öncesi hazırlık notu: önceki reklamlar incelendi, mobil formda hata var, ürün videosu eksik, başarı tanımı başarılı başvuru olarak belirlendi', { 'slot-title': 'Hazırlık notu', 'slot-priority': 'Temsili', 'slot-label-1': 'Mevcut reklamlar', 'slot-value-1': 'Önceki dönem incelendi', 'slot-label-2': 'Hedef sayfa', 'slot-value-2': 'Mobil formda hata', 'slot-label-3': 'İçerik', 'slot-value-3': 'Ürün videosu eksik', 'slot-label-4': 'Başarı tanımı', 'slot-value-4': 'Başarılı başvuru' }, c),
  creative: (c?: string) => art('ecom-scenarios', 'Kreatif testi bir soruyla başlar: ürün kullanımını göstermek mi, teslimat koşulunu açıklamak mı daha faydalı; her testte tek değişken değiştirilir', { 'slot-title-1': 'Kreatif A', 'slot-check-1': 'Ürün kullanımı', 'slot-tag-1': 'Soru', 'slot-title-2': 'Kreatif B', 'slot-check-2': 'Teslimat koşulu', 'slot-tag-2': 'Soru', 'slot-title-3': 'Kayıt', 'slot-check-3': 'Tek değişken', 'slot-tag-3': 'Not' }, c),
  audience: (c?: string) => art('ecom-sales-funnel', 'Yeni müşteri kazanımı ve yeniden pazarlama: markayı ilk kez gören, siteyi ziyaret eden, ürünü inceleyen ve müşteri olan kişilerin bilgi ihtiyacı farklıdır', { 'slot-step-1': 'İlk kez gören', 'slot-step-2': 'Siteyi ziyaret eden', 'slot-step-3': 'Ürünü inceleyen', 'slot-step-4': 'Müşteri', 'slot-once': 'Mesaj aşamaya göre' }, c),
  goals: (c?: string) => art('gads-goals', 'İşletme türüne göre Meta reklam hedefi: e-ticarette tamamlanmış sipariş, hizmet işletmesinde başarılı başvuru, yeni üründe ürün içeriği ve sonraki adım', { 'slot-biz-1': 'E-ticaret mağazası', 'slot-biz-sub-1': 'Ürün satışı', 'slot-goal-label-1': 'Hedef', 'slot-goal-1': 'Tamamlanan sipariş', 'slot-camp-label-1': 'Önce hazır', 'slot-camp-1': 'Katalog ve ölçüm', 'slot-biz-2': 'Hizmet işletmesi', 'slot-biz-sub-2': 'Teklif talebi', 'slot-goal-label-2': 'Hedef', 'slot-goal-2': 'Başarılı başvuru', 'slot-camp-label-2': 'Önce hazır', 'slot-camp-2': 'Çalışan form', 'slot-biz-3': 'Yeni ürün', 'slot-biz-sub-3': 'Tanıtım', 'slot-goal-label-3': 'Hedef', 'slot-goal-3': 'Ürün içeriği', 'slot-camp-label-3': 'Önce hazır', 'slot-camp-3': 'Açılış sayfası' }, c),
  evidence: (c?: string) => art('tech-evidence', 'Meta reklam değerlendirmesi: gözlem, değişiklik ve doğrulama', { 'slot-col-1': 'Gözlem', 'slot-item-1-1': 'Harcama ve sonuç', 'slot-item-1-2': 'Talep kalitesi', 'slot-item-1-3': 'İade ve iptal', 'slot-col-2': 'Değişiklik', 'slot-item-2-1': 'Kreatif', 'slot-item-2-2': 'Açılış sayfası', 'slot-item-2-3': 'Bütçe dağılımı', 'slot-col-3': 'Doğrulama', 'slot-item-3-1': 'Sonuç tanımı', 'slot-item-3-2': 'Aynı dönem', 'slot-item-3-3': 'Sonraki test' }, c),
  tagFlow: (c?: string) => art('gads-tag-flow', 'Meta reklam ölçüm akışı: tarayıcıdaki piksel olayı, uygunsa sunucu tarafı bağlantı ve tekrar kayıt kontrolü', { 'slot-step-1': 'Tarayıcı olayı', 'slot-sub-1': 'Meta piksel', 'slot-step-2': 'Sunucu olayı', 'slot-sub-2': 'Conversions API', 'slot-step-3': 'Kontrol', 'slot-sub-3': 'Tekrar kayıt testi', 'slot-note': 'Sunucu bağlantısı her sitede gerekmez; altyapıya göre değerlendirilir.' }, c),
  access: (c?: string) => art('role-lanes', 'Hesaplar ve yetkiler: işletme varlıkların sahibidir, PakSoft gerekli yetkilerle kampanya ve ölçümü yönetir, işletme ekibi içerik onayı ve talep takibini yapar', { 'slot-role-1': 'İşletme', 'slot-role-sub-1': 'Varlık sahibi', 'slot-task-1-1': 'Hesap sahipliği', 'slot-task-1-2': 'Ödeme yöntemi', 'slot-task-1-3': 'Yetki onayı', 'slot-role-2': 'PakSoft', 'slot-role-sub-2': 'Gerekli yetkiyle', 'slot-task-2-1': 'Kampanya yönetimi', 'slot-task-2-2': 'Ölçüm kontrolü', 'slot-task-2-3': 'Raporlama', 'slot-role-3': 'İşletme ekibi', 'slot-role-sub-3': 'Satış ve içerik', 'slot-task-3-1': 'İçerik onayı', 'slot-task-3-2': 'Talep takibi', 'slot-task-3-3': 'Sipariş kaydı' }, c),
  pixelTest: (c?: string) => art('gads-gtm-test', 'Temsili Meta piksel testi: başarılı form kaydı ölçülüyor, hatalı gönderim sayılmıyor, teşekkür sayfası yenilemesi tekrar sayılmıyor', { 'slot-panel': 'Ölçüm testi · Meta piksel', 'slot-mode': 'Test', 'slot-test-1': 'Başarılı form', 'slot-result-1': 'Olay kaydedildi', 'slot-test-2': 'Sayfa yenileme', 'slot-result-2': 'Tekrar sayılmadı (doğru)', 'slot-test-3': 'Hatalı gönderim', 'slot-result-3': 'Sayılmadı (doğru)', 'slot-log': 'Test tarihi, sayfa ve sorumlu kayda geçirilir' }, c),
  consent: (c?: string) => art('gads-consent', 'İzin tercihi ve ölçüm: ziyaretçi izin verdiğinde ölçüm etiketleri çalışır; reddettiğinde tercih ölçüm akışında uygulanır', { 'slot-banner': 'Çerez izni', 'slot-accept': 'Kabul et', 'slot-reject': 'Reddet', 'slot-banner-note': 'Tercih ölçüm akışına iletilir', 'slot-granted': 'İzin verildi', 'slot-granted-sub': 'Planlanan olaylar gönderilir', 'slot-denied': 'İzin verilmedi', 'slot-denied-sub': 'Tercih ölçümde uygulanır' }, c),
  platforms: (c?: string) => art('ecom-platforms', 'Araç seçimi altyapıya göre yapılır: Shopify, ikas, WooCommerce ve özel yazılımda bağlantı ve test yöntemi ayrı belirlenir', { 'slot-plat-1': 'Shopify', 'slot-focus-1': 'Mevcut uygulama', 'slot-plat-2': 'ikas', 'slot-focus-2': 'Desteklenen bağlantı', 'slot-plat-3': 'WooCommerce', 'slot-focus-3': 'Eklenti kontrolü', 'slot-plat-4': 'Özel yazılım', 'slot-focus-4': 'Geliştirme kapsamı' }, c),
  sources: (c?: string) => art('tech-sources', 'Raporlama kaynakları birlikte okunur: Meta raporu, web analitiği ve satış kaydı aynı dönem üzerinden karşılaştırılır; farklar açıklanır', { 'slot-src-1': 'Meta raporu', 'slot-src-2': 'Web analitiği', 'slot-src-3': 'Satış kaydı', 'slot-url': 'Aynı dönem', 'slot-tag': 'Fark açıklanır' }, c),
  rail: (c?: string) => art('process-rail', 'Meta reklam yönetimi süreci: hedef ve mevcut durum, erişim ve ölçüm kontrolü, içerik ve bütçe planı, yayın ve değerlendirme', { 'slot-step-1': 'Hedef', 'slot-sub-1': 'Mevcut durum', 'slot-step-2': 'Erişim ve ölçüm', 'slot-sub-2': 'Kontrol listesi', 'slot-step-3': 'İçerik ve bütçe', 'slot-sub-3': 'Onaylı plan', 'slot-step-4': 'Yayın ve rapor', 'slot-sub-4': 'Sonraki test' }, c),
  launch: (c?: string) => art('contract-scope', 'Yayın öncesi kontrol kaydı: reklam bağlantıları, mobil görünüm, teklif bilgisi, ölçüm testi ve müşteri onayı', { 'slot-doc': 'Yayın kontrol kaydı', 'slot-clause-1': 'Reklam bağlantıları', 'slot-clause-2': 'Mobil görünüm', 'slot-clause-3': 'Teklif bilgisi', 'slot-clause-4': 'Ölçüm testi', 'slot-clause-5': 'Onay eksikse yayın bekler' }, c),
  review: (c?: string) => art('monthly-plan', 'Temsili izleme planı: yayın kontrolü, harcama ve kayıt, talep kalitesi ve sonraki test önerisi', { 'slot-month': 'İzleme planı', 'slot-week-1': 'Yayın sonrası', 'slot-week-2': 'Düzenli', 'slot-week-3': 'Düzenli', 'slot-week-4': 'Dönem sonu', 'slot-task-1': 'Yayın kontrolü', 'slot-task-sub-1': 'Bağlantı ve bütçe', 'slot-task-2': 'Harcama ve kayıt', 'slot-task-sub-2': 'Aynı dönem', 'slot-task-3': 'Talep kalitesi', 'slot-task-sub-3': 'Ekip geri bildirimi', 'slot-task-4': 'Sonraki test', 'slot-task-sub-4': 'Gerekçesiyle' }, c),
  project: (c?: string) => art('tech-finding', 'Bir Meta reklam projesi değerlendirmesinde bulunması gerekenler: işletme hedefi, başlangıç durumu, yapılan işler, dönem ve veri kaynağı', { 'slot-title': 'Proje değerlendirmesi', 'slot-priority': 'Yöntem', 'slot-label-1': 'İşletme hedefi', 'slot-value-1': 'Satış veya başvuru', 'slot-label-2': 'Başlangıç durumu', 'slot-value-2': 'Hesap ve ölçüm', 'slot-label-3': 'Yapılan işler', 'slot-value-3': 'Yönetim, kreatif, teknik', 'slot-label-4': 'Dönem ve kaynak', 'slot-value-4': 'Tarih aralığı, veri' }, c),
  models: (c?: string) => art('site-types', 'Satış modeline göre değerlendirme: e-ticaret mağazasında sipariş akışı, hizmet işletmesinde teklif süreci, yeni üründe tanıtım sayfası', { 'slot-type-1': 'E-ticaret mağazası', 'slot-type-2': 'Hizmet işletmesi', 'slot-type-3': 'Yeni ürün tanıtımı' }, c),
  catalog: (c?: string) => art('category-filters', 'Temsili ürün setleri: doğal kozmetik kataloğunda stoktaki sıvı sabunlar ve el kremleri ayrı setlerde reklamda; tükenen ürünler ve görseli eksik ürün set dışında tutuluyor', { 'slot-category': 'Doğal kozmetik kataloğu', 'slot-urls': 'Ürün setleri', 'slot-url-1': 'Sıvı sabunlar · stokta', 'slot-url-2': 'Tükenen ürünler', 'slot-url-3': 'El kremleri · stokta', 'slot-url-4': 'Görseli eksik ürün', 'slot-legend-ok': 'Sette', 'slot-legend-skip': 'Set dışı' }, c),
  changeLog: (c?: string) => art('tech-finding', 'Temsili değişiklik kaydı: kahve ekipmanı reklamında gözlem, yapılan değişiklik, gerekçe ve sonraki kontrol birlikte yazılıyor', { 'slot-title': 'Değişiklik kaydı', 'slot-priority': 'Temsili', 'slot-label-1': 'Gözlem', 'slot-value-1': 'Etkileşim var, geçiş az', 'slot-label-2': 'Değişiklik', 'slot-value-2': 'Tek mesaj: kullanım', 'slot-label-3': 'Gerekçe', 'slot-value-3': 'Ürün anlaşılmıyor', 'slot-label-4': 'Sonraki kontrol', 'slot-value-4': 'Aynı dönem, aynı hedef' }, c),
  diagnose: (c?: string) => art('tech-finding', 'Temsili teşhis sırası: önce ölçüm ve olaylar, sonra teklif ve açılış sayfası, kreatif ve hedef kitle, en son bütçe ve sıklık kontrol ediliyor', { 'slot-title': 'Teşhis sırası', 'slot-priority': 'Sırayla', 'slot-label-1': '1 · Ölçüm', 'slot-value-1': 'Olay doğru mu?', 'slot-label-2': '2 · Teklif ve sayfa', 'slot-value-2': 'Reklamla tutarlı mı?', 'slot-label-3': '3 · Kreatif ve kitle', 'slot-value-3': 'Mesaj net mi?', 'slot-label-4': '4 · Bütçe ve sıklık', 'slot-value-4': 'Dağılım dengeli mi?' }, c),
  packages: (c?: string) => art('contract-scope', 'Hazır paketlerde sorulacaklar: kreatif adedi ve formatlar, revizyon, teknik kurulum ve rapor içeriği; pakette yazmayan iş ayrı ücretlendirilebilir', { 'slot-doc': 'Paket kapsamı', 'slot-clause-1': 'Kreatif adedi ve formatlar', 'slot-clause-2': 'Revizyon sınırı', 'slot-clause-3': 'Teknik kurulum', 'slot-clause-4': 'Rapor içeriği', 'slot-clause-5': 'Yazmayan iş ayrı ücretli' }, c),
  budget: (c?: string) => art('gads-budget-split', 'Maliyet kalemleri: medya bütçesi Meta reklam hesabınızdan Meta’ya ödenir; yönetim, kreatif üretimi ve teknik çalışma PakSoft teklifinde ayrı kalemlerdir', { 'slot-budget': 'Medya bütçesi', 'slot-budget-sub': 'Reklam harcaması', 'slot-fee': 'Yönetim bedeli', 'slot-setup': 'Kreatif ve teknik iş', 'slot-google': 'Meta reklam hesabınız', 'slot-google-sub': 'Ödeme doğrudan Meta’ya', 'slot-paksoft': 'PakSoft teklifi', 'slot-paksoft-sub': 'Kalemler ayrı yazılır' }, c),
  quote: (c?: string) => art('quote-groups', 'Yönetim bedelini etkileyenler: ürün grupları, dil ve pazar sayısı, içerik üretimi, rapor ve toplantı kapsamı; medya bütçesi ayrı', { 'slot-group-1': 'Ürün grupları', 'slot-group-2': 'Dil ve pazar', 'slot-group-3': 'İçerik üretimi', 'slot-group-4': 'Rapor ve toplantı', 'slot-quote': 'Yönetim bedeli', 'slot-extra': 'Medya bütçesi ayrı' }, c),
  compare: (c?: string) => art('deliverables', 'Teklifleri karşılaştırırken sorulacaklar: medya harcaması dahil mi, kaç içerik üretilecek, kurulum dahil mi, rapor neyi açıklayacak', { 'slot-doc-1': 'Medya dahil mi?', 'slot-doc-2': 'İçerik ve revizyon', 'slot-doc-3': 'Kurulum dahil mi?', 'slot-doc-4': 'Rapor kapsamı' }, c),
};

const visuals: SeoServiceConfig['visuals'] = {
  overview: [
    ['Meta reklam yönetimi hizmetine', aside(V.scope())],
    ['Facebook ve Instagram', aside(V.placements())],
    ['Tıklamadan sonraki', aside(V.landing())],
    ['Meta reklam ajansı seçerken', aside(V.agency())],
  ],
  features: [
    ['Kampanya öncesi hazırlık', aside(V.prep())],
    ['Kreatifleri bir soruya', aside(V.creative())],
    ['Yeniden pazarlama', aside(V.audience())],
    ['E-ticaret ve başvuru', aside(V.goals())],
    ['Katalog reklamları', aside(V.catalog())],
  ],
  technologies: [
    ['Hesaplar ve yetkiler', aside(V.access())],
    ['Meta piksel kurulumu', aside(V.pixelTest())],
    ['Sunucu tarafı ölçüm', aside(V.consent())],
    ['Araç seçimi', aside(V.platforms())],
    ['Raporlama kaynaklarını', aside(V.sources())],
  ],
  process: [
    ['Hedef ve mevcut durum', { place: 'below', node: V.rail() }],
    ['Yayın öncesi kontrol', aside(V.launch())],
    ['Haftalık ve aylık kontrolleri', aside(V.review())],
    ['Kampanya değişikliklerini', aside(V.changeLog())],
  ],
  portfolio: [
    ['Bir Meta reklam sorununu', aside(V.diagnose())],
    ['Projenizi benzer', aside(V.models())],
  ],
  pricing: [
    ['Yönetim ücretini', aside(V.quote())],
    ['Teklifleri karşılaştırırken', aside(V.compare())],
    ['Hazır Meta reklam paketleri', aside(V.packages())],
  ],
};

const heroArt: SeoServiceConfig['heroArt'] = {
  features: () => V.evidence('w-full'),
  technologies: () => V.tagFlow('w-full'),
  process: () => <ProcessScene />,
  portfolio: () => V.project('w-full'),
  pricing: () => V.budget('w-full'),
};

const config: SeoServiceConfig = {
  platform: 'meta-ads', contentDir: 'content/meta-ads/tr', base, enquiry: META_ADS_TR_ENQUIRY,
  serviceName: 'Meta Reklam Yönetimi', Icon: MegaphoneIcon, metadata, visuals, heroArt,
  rotating: { features: { lead: 'Meta Reklam', words: ['Yönetim Kapsamı', 'Kreatif Testleri'] }, technologies: { lead: 'Meta Reklam', words: ['Ölçümü', 'Piksel Kurulumu'] }, process: { lead: 'Meta Reklam', words: ['Yönetim Süreci', 'Değerlendirme'] }, portfolio: { lead: 'Meta Reklam', words: ['Projeleri', 'Değerlendirme'] }, pricing: { lead: 'Meta Reklam', words: ['Fiyatları', 'Bütçe Planı'] }, faq: { lead: 'Meta Reklam', words: ['Sık Sorulan Sorular', 'Yönetimi'] }, blog: { lead: 'Meta Reklam', words: ['Rehberleri', 'Bütçe Planlama'] } },
  primary: { overview: 'Meta Reklam Teklifi Al', features: 'Kapsamıma Göre Teklif Al', technologies: 'Ölçüm İhtiyacımı Paylaş', process: 'İlk Görüşme İçin Bilgilerimi Paylaş', portfolio: 'Projemi Görüşmek İstiyorum', pricing: 'Meta Reklam Teklifi Al', faq: 'Sorumu ve İhtiyacımı Paylaş', blog: 'Meta Reklam Teklifi Al' },
  secondary: { features: ['Yönetim Kapsamını İncele', '#meta-kampanya-hazirligi'], technologies: ['Ölçüm Kontrollerini İncele', '#meta-olcum-kontrolleri'], process: ['Adımları İncele', '#meta-surec-adimlari'], portfolio: ['Değerlendirme Yöntemini İncele', '#meta-proje-degerlendirmesi'], pricing: ['Maliyet Kalemlerini İncele', '#meta-maliyet-kalemleri'], faq: ['Soruları İncele', ''] },
  closingLink: { overview: ['Yönetim Kapsamını İncele', `${base}/ozellikler`], features: ['Çalışma Sürecini İncele', `${base}/surec`], technologies: ['Yönetim Kapsamına Dön', `${base}/ozellikler`], process: ['Maliyet Kalemlerini İncele', `${base}/fiyatlandirma`], portfolio: ['Çalışma Yöntemimiz', `${base}/surec`], pricing: ['Bütçe Planlama Rehberi', `${base}/blog/meta-reklam-butcesi-planlama`], faq: ['Yönetim Kapsamını İncele', `${base}/ozellikler`] },
  closingDefault: { title: 'İşletmeniz İçin Meta Reklam Planını Konuşalım', text: 'Web sitenizi, hedefinizi ve mevcut reklam durumunuzu paylaşın. Başlangıç için gerekli işleri birlikte belirleyelim.' },
  closingCopy: { overview: { title: 'İşletmeniz için Meta reklam planını konuşalım', text: 'Yeni bir hesap kuruyor veya mevcut reklamlarınızı geliştirmek istiyor olabilirsiniz. Hedefinizi ve mevcut durumunuzu paylaşın; hangi işlerin öncelikli olduğunu birlikte belirleyelim.' } },
  jumpLabels: [
    ['Reklamlarınızdan hangi sonucu', 'Reklam hedefi'], ['Meta reklam yönetimi hizmetine', 'Hizmet kapsamı'], ['Facebook ve Instagram', 'Facebook ve Instagram'], ['Tıklamadan sonraki', 'Açılış sayfası'], ['Raporlarda ne', 'Raporlar'], ['Meta reklam ajansı seçerken', 'Ajans seçimi'], ['Meta reklam danışmanlığı mı', 'Danışmanlık veya yönetim'], ['Hangi kampanya hedefi', 'Kampanya hedefi'], ['Meta reklam uzmanı ilk hafta', 'İlk hafta kontrolleri'],
    ['Kampanya öncesi hazırlık', 'Hazırlık'], ['Kreatifleri bir soruya', 'Kreatif testleri'], ['Yeniden pazarlama', 'Yeniden pazarlama'], ['E-ticaret ve başvuru', 'E-ticaret ve başvuru'], ['Dahil olan ve ayrıca', 'Kapsam tablosu'], ['Değişikliklerin nedenini', 'Değişiklik kaydı'], ['Potansiyel müşteri reklamlarında', 'Form mu, site mi?'], ['Katalog reklamları', 'Katalog reklamları'], ['Advantage+', 'Advantage+'], ['Reklam yorgunluğu', 'Kreatif yenileme'],
    ['Hesaplar ve yetkiler', 'Hesap ve yetki'], ['Meta piksel kurulumu', 'Meta piksel'], ['Sunucu tarafı ölçüm', 'Sunucu tarafı ölçüm'], ['Kurulumdan sonra hangi', 'Kurulum kontrolleri'], ['Araç seçimi', 'Altyapı'], ['Raporlama kaynaklarını', 'Rapor kaynakları'], ['Standart olaylar', 'Standart olaylar'], ['Piksel ve Dönüşümler API', 'Piksel ve CAPI'], ['Katalog bağlantısı', 'Katalog bağlantısı'], ['Hedef kitle sinyalleri', 'Kitle sinyalleri'],
    ['Hedef ve mevcut', 'Hedef'], ['Erişim ve ölçüm', 'Erişim ve ölçüm'], ['Mesaj, içerik', 'İçerik ve bütçe'], ['Yayın öncesi', 'Yayın öncesi'], ['İzleme ve', 'İzleme'], ['Sizden hangi bilgiler', 'Gerekli bilgiler'], ['İlk çalışma döneminde', 'İlk dönem'], ['Öğrenme aşamasında', 'Öğrenme aşaması'], ['Haftalık ve aylık', 'Kontrol takvimi'], ['Kampanya değişikliklerini', 'Değişiklik kaydı'],
    ['Bir proje değerlendirmesinde', 'Değerlendirme ölçütleri'], ['Projenizi benzer', 'Projenizi konuşalım'], ['Üç temsili Meta', 'Temsili senaryolar'], ['Bir Meta reklam sorununu', 'Teşhis sırası'], ['Raporu işletme kayıtlarıyla', 'Rapor karşılaştırma'],
    ['Reklam harcaması ile hizmet', 'Maliyet kalemleri'], ['Yönetim ücretini', 'Ücreti etkileyenler'], ['Başlangıç bütçesi', 'Başlangıç bütçesi'], ['Teklifleri karşılaştırırken', 'Teklif karşılaştırma'], ['Size uygun kapsamı', 'Kapsam ve teklif'], ['Hazır Meta reklam paketleri', 'Hazır paketler'], ['Kreatif üretimi maliyeti', 'Kreatif maliyeti'], ['Test bütçesi', 'Test bütçesi'],
    ['Sık sorulan sorular', 'Sık sorulan sorular'], ['Kampanya ve kreatif', 'Kampanya ve kreatif'], ['Ölçüm ve hesap', 'Ölçüm ve hesap'],
  ],
  sectionIds: {
    'features:Kampanya öncesi hazırlık': 'meta-kampanya-hazirligi',
    'technologies:Kurulumdan sonra hangi kontroller yapılır?': 'meta-olcum-kontrolleri',
    'process:Hedef ve mevcut durum': 'meta-surec-adimlari',
    'portfolio:Bir proje değerlendirmesinde bulunması gerekenler': 'meta-proje-degerlendirmesi',
    'pricing:Reklam harcaması ile hizmet bedelini ayırın': 'meta-maliyet-kalemleri',
  },
  blog: { id: 'meta-reklam-rehberleri', title: 'Meta Reklam Rehberleri', text: metadata.blog.intro, asideTitle: 'Reklam hedefinizi birlikte belirleyelim', asideText: 'Web sitenizi, hedefinizi ve mevcut reklam durumunuzu paylaşın.', guides: getMetaAdsGuides },
};

const service = createSeoService(config);
export const MetaAdsOverviewBody = service.OverviewBody;
export const MetaAdsTurkishPage = service.Page;
export const getMetaAdsMeta = (page: SeoPageKind) => service.getMeta(page);
export const getMetaAdsSocialMeta = (page: SeoPageKind, canonical: string) => service.getSocialMeta(page, canonical);
