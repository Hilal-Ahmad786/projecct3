import type { ReactNode } from 'react';
import { MegaphoneIcon } from '@heroicons/react/24/outline';
import type { SectionVisual } from '@/components/e-commerce/ServiceMarkdownPage';
import { GuidesScene, HeroStage, QaScene } from '@/components/services/hero-visuals/scenes-subpages';
import SeoArtwork from '@/components/seo/visuals/SeoArtwork';
import type { SeoVisualName } from '@/components/seo/visuals/generated';
import { createSeoService, type SeoPageKind, type SeoServiceConfig } from './seo-pages/SeoServiceEngine';
import { getFacebookAdsGuides } from './service-blogs/facebook-ads';
import metadata from '../../../content/facebook-ads/tr/metadata.json';

export const FACEBOOK_ADS_TR_BASE = '/tr/hizmetler/facebook-ads';
export const FACEBOOK_ADS_TR_ENQUIRY = '/tr/start-project?service=facebook-ads';
const base = FACEBOOK_ADS_TR_BASE;

const aside = (node: ReactNode): SectionVisual => ({ place: 'aside', node });
const art = (name: SeoVisualName, label: string, slotLabels: Record<string, string>, className = 'mx-auto w-full max-w-xl') =>
  <SeoArtwork name={name} loop label={label} slotLabels={slotLabels} className={className} />;

// Same standard as the Meta Ads pages: every illustration carries its own Turkish slot text,
// no result numbers, no brand logos, about 3–5 per page, and table sections stay without art.
// Examples are kept Facebook-specific so these pages do not repeat the Meta Ads illustrations.
const V = {
  goals: (c?: string) => art('gads-goals', 'Facebook reklamında hedef işletme türüne göre seçilir: e-ticarette tamamlanan sipariş, hizmet işletmesinde nitelikli başvuru, mevcut kampanyada sorunun kaynağı', { 'slot-biz-1': 'E-ticaret mağazası', 'slot-biz-sub-1': 'Ürün satışı', 'slot-goal-label-1': 'Hedef', 'slot-goal-1': 'Tamamlanan sipariş', 'slot-camp-label-1': 'Önce hazır', 'slot-camp-1': 'Katalog ve ölçüm', 'slot-biz-2': 'Hizmet işletmesi', 'slot-biz-sub-2': 'Teklif talebi', 'slot-goal-label-2': 'Hedef', 'slot-goal-2': 'Nitelikli başvuru', 'slot-camp-label-2': 'Önce hazır', 'slot-camp-2': 'Form ve takip', 'slot-biz-3': 'Mevcut kampanya', 'slot-biz-sub-3': 'Sonuç düşük', 'slot-goal-label-3': 'Hedef', 'slot-goal-3': 'Sorunun kaynağı', 'slot-camp-label-3': 'Önce kontrol', 'slot-camp-3': 'Ölçüm ve sayfa' }, c),
  salesLoop: (c?: string) => art('gads-offline', 'Reklam hesabından satış sonrasına: başvuru satış ekibinde aranıyor, teklif veriliyor ve satışa dönüşüyor; bu aşamalar reklam kararlarına geri bildiriliyor', { 'slot-crm': 'Satış kaydı', 'slot-stage-1': 'Yeni başvuru', 'slot-stage-2': 'Arandı', 'slot-stage-3': 'Teklif verildi', 'slot-stage-4': 'Satış', 'slot-ads': 'Facebook reklamları', 'slot-ads-1': 'Hangi reklam?', 'slot-ads-2': 'Hangi kitle?', 'slot-note': 'Satış aşaması reklam kararına geri döner' }, c),
  agency: (c?: string) => art('deliverables', 'Facebook reklam ajansı seçerken karşılaştırılacak kapsam: hesap sahipliği, içerik üretimi, ölçüm kurulumu ve rapor içeriği', { 'slot-doc-1': 'Hesap sahipliği', 'slot-doc-2': 'İçerik üretimi', 'slot-doc-3': 'Ölçüm kurulumu', 'slot-doc-4': 'Rapor içeriği' }, c),
  budget: (c?: string) => art('gads-budget-split', 'Maliyet kalemleri: reklam bütçesi Facebook reklam hesabınızdan Meta’ya ödenir; yönetim, içerik ve teknik çalışma PakSoft teklifinde ayrı kalemlerdir', { 'slot-budget': 'Reklam bütçesi', 'slot-budget-sub': 'Facebook harcaması', 'slot-fee': 'Yönetim bedeli', 'slot-setup': 'İçerik ve teknik iş', 'slot-google': 'Reklam hesabınız', 'slot-google-sub': 'Ödeme doğrudan Meta’ya', 'slot-paksoft': 'PakSoft teklifi', 'slot-paksoft-sub': 'Kalemler ayrı yazılır' }, c),
  leadForm: (c?: string) => art('gads-lead-quality', 'Facebook form reklamlarında başvuru kalitesi: her başvuru sayılmaz; iletişim bilgisi doğru ve hizmetle ilgili olanlar satış ekibine aktarılır, diğerleri kontrol edilir', { 'slot-forms': 'Form başvuruları', 'slot-lead-1': 'Telefon doğru · hizmet uygun', 'slot-lead-2': 'Numara eksik', 'slot-lead-3': 'Hizmet bölgesi dışında', 'slot-lead-4': 'Teklif istiyor', 'slot-lead-5': 'Tekrarlanan başvuru', 'slot-ok': 'Nitelikli başvuru', 'slot-ok-sub': 'Satış ekibine aktarılır', 'slot-check': 'Kontrol edilecekler', 'slot-check-1': 'Form soruları', 'slot-check-2': 'Geri dönüş süresi', 'slot-check-3': 'Satış ekibi notu' }, c),
  catalog: (c?: string) => art('category-filters', 'Temsili ürün setleri: ev tekstili kataloğunda stoktaki nevresim takımları ve havlular reklamda; tükenen ürünler ve fiyatı güncel olmayan ürün set dışında tutuluyor', { 'slot-category': 'Ev tekstili kataloğu', 'slot-urls': 'Ürün setleri', 'slot-url-1': 'Nevresimler · stokta', 'slot-url-2': 'Tükenen ürünler', 'slot-url-3': 'Havlular · stokta', 'slot-url-4': 'Fiyatı güncel değil', 'slot-legend-ok': 'Sette', 'slot-legend-skip': 'Set dışı' }, c),
  remarketing: (c?: string) => art('ecom-sales-funnel', 'Yeniden pazarlama: reklamı izleyen, siteyi ziyaret eden, sepete ürün ekleyen ve müşteri olan kişilere farklı mesaj gösterilir', { 'slot-step-1': 'Reklamı izleyen', 'slot-step-2': 'Site ziyaretçisi', 'slot-step-3': 'Sepete ekleyen', 'slot-step-4': 'Müşteri', 'slot-once': 'Mesaj aşamaya göre' }, c),
  optimise: (c?: string) => art('tech-finding', 'Temsili optimizasyon kaydı: form reklamında başvuru çok ama satış az; değişiklik form sorularında yapılıyor ve aynı dönemde yeniden kontrol ediliyor', { 'slot-title': 'Optimizasyon kaydı', 'slot-priority': 'Temsili', 'slot-label-1': 'Gözlem', 'slot-value-1': 'Başvuru çok, satış az', 'slot-label-2': 'Değişiklik', 'slot-value-2': 'Forma hizmet sorusu', 'slot-label-3': 'Gerekçe', 'slot-value-3': 'İlgisiz başvurular', 'slot-label-4': 'Sonraki kontrol', 'slot-value-4': 'Satış ekibi notu' }, c),
  evidence: (c?: string) => art('tech-evidence', 'Facebook reklam değerlendirmesi: gözlem, değişiklik ve doğrulama', { 'slot-col-1': 'Gözlem', 'slot-item-1-1': 'Harcama ve sonuç', 'slot-item-1-2': 'Başvuru kalitesi', 'slot-item-1-3': 'Sepet ve sipariş', 'slot-col-2': 'Değişiklik', 'slot-item-2-1': 'Kreatif', 'slot-item-2-2': 'Form veya sayfa', 'slot-item-2-3': 'Kitle ve bütçe', 'slot-col-3': 'Doğrulama', 'slot-item-3-1': 'Sonuç tanımı', 'slot-item-3-2': 'Aynı dönem', 'slot-item-3-3': 'Sonraki test' }, c),
  pixelTest: (c?: string) => art('gads-gtm-test', 'Temsili Facebook piksel testi: sepete ekleme ve satın alma olayları kaydediliyor, teşekkür sayfasının yenilenmesi ikinci satış sayılmıyor', { 'slot-panel': 'Ölçüm testi · Meta Pixel', 'slot-mode': 'Test', 'slot-test-1': 'Sepete ekleme', 'slot-result-1': 'Olay kaydedildi', 'slot-test-2': 'Satın alma', 'slot-result-2': 'Tek kez kaydedildi', 'slot-test-3': 'Sayfa yenileme', 'slot-result-3': 'Tekrar sayılmadı (doğru)', 'slot-log': 'Test tarihi, sayfa ve sorumlu kayda geçirilir' }, c),
  tagFlow: (c?: string) => art('gads-tag-flow', 'Facebook reklam ölçüm akışı: tarayıcıdaki piksel olayı, uygunsa Conversions API ile sunucu olayı ve tekrar kayıt kontrolü', { 'slot-step-1': 'Tarayıcı olayı', 'slot-sub-1': 'Meta Pixel', 'slot-step-2': 'Sunucu olayı', 'slot-sub-2': 'Conversions API', 'slot-step-3': 'Kontrol', 'slot-sub-3': 'Tekrar kayıt testi', 'slot-note': 'Sunucu bağlantısı her sitede gerekmez; altyapıya göre değerlendirilir.' }, c),
  sources: (c?: string) => art('tech-sources', 'Raporlar farklı sonuç gösterebilir: Facebook Reklam Yöneticisi, web analitiği ve satış kaydı aynı dönem üzerinden karşılaştırılır; farklar açıklanır', { 'slot-src-1': 'Reklam raporu', 'slot-src-2': 'Web analitiği', 'slot-src-3': 'Satış kaydı', 'slot-url': 'Aynı dönem', 'slot-tag': 'Açıklanır' }, c),
  rail: (c?: string) => art('process-rail', 'Facebook reklam yönetimi süreci: hedef ve mevcut durum, erişim ve ölçüm kontrolü, kampanya ve içerik hazırlığı, yayın ve değerlendirme', { 'slot-step-1': 'Hedef', 'slot-sub-1': 'Mevcut durum', 'slot-step-2': 'Erişim ve ölçüm', 'slot-sub-2': 'Kontrol listesi', 'slot-step-3': 'Kampanya ve içerik', 'slot-sub-3': 'Onaylı plan', 'slot-step-4': 'Yayın ve rapor', 'slot-sub-4': 'Sonraki adım' }, c),
  roles: (c?: string) => art('role-lanes', 'Kapsam ve sorumluluklar: işletme hesapların sahibidir, PakSoft gerekli yetkiyle kampanya ve ölçümü yönetir, işletme ekibi içerik onayı ve başvuru takibini yapar', { 'slot-role-1': 'İşletme', 'slot-role-sub-1': 'Hesap sahibi', 'slot-task-1-1': 'Reklam hesabı', 'slot-task-1-2': 'Ödeme yöntemi', 'slot-task-1-3': 'Yetki onayı', 'slot-role-2': 'PakSoft', 'slot-role-sub-2': 'Gerekli yetkiyle', 'slot-task-2-1': 'Kampanyalar', 'slot-task-2-2': 'Ölçüm kontrolü', 'slot-task-2-3': 'Raporlama', 'slot-role-3': 'İşletme ekibi', 'slot-role-sub-3': 'Satış ve içerik', 'slot-task-3-1': 'İçerik onayı', 'slot-task-3-2': 'Başvuru takibi', 'slot-task-3-3': 'Satış kaydı' }, c),
  launch: (c?: string) => art('contract-scope', 'Yayın öncesi kontrol kaydı: reklam bağlantıları, form soruları, mobil görünüm, ölçüm testi ve müşteri onayı', { 'slot-doc': 'Yayın kontrol kaydı', 'slot-clause-1': 'Reklam bağlantıları', 'slot-clause-2': 'Form soruları', 'slot-clause-3': 'Mobil görünüm', 'slot-clause-4': 'Ölçüm testi', 'slot-clause-5': 'Onay eksikse yayın bekler' }, c),
  project: (c?: string) => art('site-types', 'Facebook reklam senaryoları işletme türüne göre değerlendirilir: e-ticaret mağazasında sipariş, hizmet işletmesinde başvuru, yerel işletmede mesaj ve arama', { 'slot-type-1': 'E-ticaret mağazası', 'slot-type-2': 'Hizmet işletmesi', 'slot-type-3': 'Yerel işletme' }, c),
  ecomCase: (c?: string) => art('tech-finding', 'Temsili e-ticaret senaryosu: ürün sayfası ziyareti var ama sepet az; önce ürün kataloğu ve fiyat bilgisi kontrol ediliyor, sonra kreatif değiştiriliyor', { 'slot-title': 'E-ticaret senaryosu', 'slot-priority': 'Temsili', 'slot-label-1': 'Başlangıç', 'slot-value-1': 'Ziyaret var, sepet az', 'slot-label-2': 'İlk kontrol', 'slot-value-2': 'Katalog ve fiyat', 'slot-label-3': 'Yaklaşım', 'slot-value-3': 'Ürün kullanım videosu', 'slot-label-4': 'İzlenecek sonuç', 'slot-value-4': 'Tamamlanan sipariş' }, c),
  serviceCase: (c?: string) => art('gads-offline', 'Temsili hizmet işletmesi senaryosu: form başvuruları satış ekibinde aranıyor, uygun bulunanlar teklif aşamasına geçiyor; reklam bu aşamalara göre değerlendiriliyor', { 'slot-crm': 'Başvuru takibi', 'slot-stage-1': 'Form başvurusu', 'slot-stage-2': 'Ulaşıldı', 'slot-stage-3': 'Uygun bulundu', 'slot-stage-4': 'Teklif', 'slot-ads': 'Kampanya kararı', 'slot-ads-1': 'Form soruları', 'slot-ads-2': 'Kitle seçimi', 'slot-note': 'Başarı ölçütü form sayısı değil, uygun başvurudur' }, c),
  quote: (c?: string) => art('quote-groups', 'Yönetim bedelini etkileyenler: kampanya ve ürün grupları, içerik üretimi, ölçüm kurulumu, rapor ve toplantı kapsamı; reklam bütçesi ayrı', { 'slot-group-1': 'Kampanya grupları', 'slot-group-2': 'İçerik üretimi', 'slot-group-3': 'Ölçüm kurulumu', 'slot-group-4': 'Rapor ve toplantı', 'slot-quote': 'Yönetim bedeli', 'slot-extra': 'Reklam bütçesi ayrı' }, c),
  factors: (c?: string) => art('contract-scope', 'Facebook reklam yönetimi fiyatında yazılı olması gerekenler: kampanya sayısı, içerik adedi ve revizyon, ölçüm işi, rapor sıklığı; yazmayan iş ayrı ücretlendirilebilir', { 'slot-doc': 'Teklif kapsamı', 'slot-clause-1': 'Kampanya sayısı', 'slot-clause-2': 'İçerik adedi ve revizyon', 'slot-clause-3': 'Ölçüm kurulumu', 'slot-clause-4': 'Rapor sıklığı', 'slot-clause-5': 'Yazmayan iş ayrı ücretli' }, c),
  budgetPlan: (c?: string) => art('monthly-plan', 'Temsili bütçe planı: ilk dönemde küçük testler, ardından sonucu iyi olan reklama bütçe aktarımı ve dönem sonu değerlendirmesi', { 'slot-month': 'Bütçe planı', 'slot-week-1': 'Başlangıç', 'slot-week-2': 'Test', 'slot-week-3': 'Aktarım', 'slot-week-4': 'Dönem sonu', 'slot-task-1': 'Ölçüm kontrolü', 'slot-task-sub-1': 'Olaylar doğru mu?', 'slot-task-2': 'Küçük testler', 'slot-task-sub-2': 'Tek değişken', 'slot-task-3': 'Bütçe aktarımı', 'slot-task-sub-3': 'Gerekçesiyle', 'slot-task-4': 'Değerlendirme', 'slot-task-sub-4': 'Satış kaydıyla' }, c),
  compare: (c?: string) => art('deliverables', 'Teklifleri karşılaştırırken sorulacaklar: reklam bütçesi dahil mi, kaç içerik üretilecek, piksel kurulumu dahil mi, rapor neyi açıklayacak', { 'slot-doc-1': 'Bütçe dahil mi?', 'slot-doc-2': 'İçerik ve revizyon', 'slot-doc-3': 'Kurulum dahil mi?', 'slot-doc-4': 'Rapor kapsamı' }, c),
};

const visuals: SeoServiceConfig['visuals'] = {
  overview: [
    ['Reklamla hangi sonucu', aside(V.goals())],
    ['Reklam hesabından satış sonrasına', aside(V.salesLoop())],
    ['Facebook reklam ajansı seçerken', aside(V.agency())],
    ['Facebook reklam bütçesi ve yönetim', aside(V.budget())],
  ],
  features: [
    ['Facebook form reklamları', aside(V.leadForm())],
    ['Facebook katalog reklamları', aside(V.catalog())],
    ['Yeniden pazarlama', aside(V.remarketing())],
    ['Facebook reklam optimizasyonu', aside(V.optimise())],
  ],
  technologies: [
    ['Tarayıcı ve sunucu', aside(V.tagFlow())],
    ['Raporlar neden', aside(V.sources())],
  ],
  process: [
    ['Kapsam ve sorumlulukları', aside(V.roles())],
    ['Yayın ve ilk kontrolleri', aside(V.launch())],
  ],
  portfolio: [
    ['E-ticaret için örnek', aside(V.ecomCase())],
    ['Hizmet işletmesi için', aside(V.serviceCase())],
  ],
  pricing: [
    ['Facebook reklam yönetimi fiyatını', aside(V.factors())],
    ['Reklam bütçesini nasıl', aside(V.budgetPlan())],
    ['Teklifleri karşılaştırırken', aside(V.compare())],
  ],
};

// Sub-page heroes: each service shows its OWN labelled illustration inside the animated HeroStage frame.
const stage = (label: string, node: ReactNode, steps: string[], badge?: string) => <HeroStage label={label} steps={steps} badge={badge}>{node}</HeroStage>;
const heroArt: SeoServiceConfig['heroArt'] = {
  features: () => stage('Facebook reklam hizmet kapsamı', V.evidence(), ['Kapsam', 'Plan', 'Uygulama', 'Rapor']),
  technologies: () => stage('Facebook reklam araçlar ve ölçüm akışı', V.pixelTest(), ['Etiket', 'Dönüşüm', 'Test', 'Rapor'], 'Test edilmeden yayın yok'),
  process: () => stage('Facebook reklam çalışma süreci', V.rail(), ['Hedef', 'Hazırlık', 'Yayın', 'Değerlendirme']),
  portfolio: () => stage('Facebook reklam temsili senaryolar', V.project(), ['Durum', 'Kontrol', 'Değişiklik', 'Sonuç'], 'Temsili'),
  pricing: () => stage('Facebook reklam maliyet kalemleri', V.quote(), ['Bütçe', 'Kapsam', 'Teklif', 'Onay'], 'Kalemler ayrı'),
  faq: () => <QaScene label="Facebook reklam yönetimi hakkında sık sorulan sorular: arama yapılıyor, ilk sorunun yanıtı açılıyor ve hizmet, bütçe, hesap konuları sırayla vurgulanıyor."
    search="Facebook ile Meta farkı" questions={['Facebook ile Meta aynı hizmet mi?', 'Hesap şifremi paylaşmalı mıyım?', 'Ne kadar sürede sonuç alırım?']} answer={['Meta, Facebook ve Instagram’ı kapsar;', 'bu sayfa yalnızca Facebook odaklıdır.']} topics={['Hizmet', 'Bütçe', 'Hesap']} steps={['Soru', 'Yanıt', 'Kapsam', 'Teklif']} />,
};
const config: SeoServiceConfig = {
  platform: 'facebook-ads', contentDir: 'content/facebook-ads/tr', base, enquiry: FACEBOOK_ADS_TR_ENQUIRY,
  serviceName: 'Facebook Reklam Yönetimi', Icon: MegaphoneIcon, metadata, visuals, heroArt,
  rotating: { features: { lead: 'Facebook Reklam', words: ['Hizmet Kapsamı', 'Form Reklamları'] }, technologies: { lead: 'Facebook Reklam', words: ['Ölçümü', 'Piksel Kurulumu'] }, process: { lead: 'Facebook Reklam', words: ['Yönetim Süreci', 'Değerlendirme'] }, portfolio: { lead: 'Facebook Reklam', words: ['Senaryoları', 'Değerlendirme'] }, pricing: { lead: 'Facebook Reklam', words: ['Ücretleri', 'Bütçe Planı'] }, faq: { lead: 'Facebook Reklam', words: ['Sık Sorulan Sorular', 'Yönetimi'] }, blog: { lead: 'Facebook Reklam', words: ['Rehberleri', 'Maliyet Analizi'] } },
  primary: { overview: 'Facebook Reklam Teklifi Al', features: 'Kapsamıma Göre Teklif Al', technologies: 'Ölçüm İhtiyacımı Paylaş', process: 'İlk Görüşme İçin Bilgilerimi Paylaş', portfolio: 'Kampanyamı Görüşmek İstiyorum', pricing: 'Facebook Reklam Teklifi Al', faq: 'Sorumu ve İhtiyacımı Paylaş', blog: 'Facebook Reklam Teklifi Al' },
  secondary: { features: ['Hizmet Kapsamını İncele', '#facebook-form-reklamlari'], technologies: ['Ölçüm Planını İncele', '#facebook-olay-plani'], process: ['Adımları İncele', '#facebook-surec-adimlari'], portfolio: ['Senaryoları İncele', '#facebook-eticaret-senaryosu'], pricing: ['Maliyet Kalemlerini İncele', '#facebook-maliyet-kalemleri'], faq: ['Soruları İncele', ''] },
  closingLink: { overview: ['Hizmet Kapsamını İncele', `${base}/ozellikler`], features: ['Fiyatlandırmayı İncele', `${base}/fiyatlandirma`], technologies: ['Hizmet Kapsamına Dön', `${base}/ozellikler`], process: ['Ölçüm ve Teknolojiler', `${base}/teknoloji`], portfolio: ['Çalışma Sürecimiz', `${base}/surec`], pricing: ['Maliyet Rehberi', `${base}/blog/facebook-reklam-maliyeti-nasil-dusurulur`], faq: ['Facebook Reklam Yönetimi', base] },
  closingDefault: { title: 'Facebook Reklam Planınızı Birlikte Oluşturalım', text: 'Hedefinizi, web sitenizi ve mevcut reklam durumunuzu paylaşın; gerekli işleri birlikte belirleyelim.' },
  closingTitlePrefix: { overview: 'İşletmeniz için Facebook reklam planını', features: 'İhtiyacınıza göre bir kapsam', technologies: 'Altyapınız için doğru bağlantıyı', process: 'Başlamak için hangi bilgileri', portfolio: 'Sizin kampanyanızda hangi sonucu', pricing: 'Kapsamınıza uygun teklif', faq: 'Sorunuz işletmenize özel' },
  closingCopy: { overview: { title: 'İşletmeniz için Facebook reklam planını oluşturalım', text: 'Ne sattığınızı, kime ulaşmak istediğinizi ve bugün karşılaştığınız engeli paylaşın. Kampanya kapsamını ve öncelikli işleri birlikte belirleyelim.' } },
  jumpLabels: [
    ['Reklamla hangi sonucu', 'Reklam hedefi'], ['Facebook reklam yönetimi hizmetimiz', 'Hizmet kapsamı'], ['Reklam hesabından satış sonrasına', 'Satış sonrası takip'], ['Facebook reklam ajansı seçerken', 'Ajans seçimi'], ['Facebook reklam bütçesi ve yönetim', 'Bütçe ve ücret'], ['Facebook çalışmasını diğer kanallarla', 'Diğer kanallar'],
    ['Facebook form reklamları', 'Form reklamları'], ['Facebook katalog reklamları', 'Katalog reklamları'], ['Yeniden pazarlama', 'Yeniden pazarlama'], ['Kreatif ve reklam metni', 'Kreatif testleri'], ['Facebook reklam optimizasyonu', 'Optimizasyon'], ['Hizmete dahil olanlar', 'Kapsam tablosu'],
    ['Hangi araç', 'Araçlar'], ['Önce olay planını', 'Olay planı'], ['Tarayıcı ve sunucu', 'Piksel ve CAPI'], ['Raporlar neden', 'Rapor farkları'],
    ['İşletmenizi ve hedefinizi', 'Hedef'], ['Kapsam ve sorumlulukları', 'Kapsam'], ['Erişimleri ve ölçümü', 'Erişim ve ölçüm'], ['Kampanya ve içerikleri', 'Kampanya ve içerik'], ['Yayın ve ilk kontrolleri', 'Yayın'], ['Sonuçları değerlendirip', 'Değerlendirme'],
    ['E-ticaret için örnek', 'E-ticaret senaryosu'], ['Hizmet işletmesi için', 'Hizmet senaryosu'], ['Bir sonuç raporunda', 'Rapor içeriği'],
    ['Hangi gider kime', 'Maliyet kalemleri'], ['Facebook reklam yönetimi fiyatını', 'Fiyatı etkileyenler'], ['Üç farklı çalışma kapsamı', 'Çalışma kapsamları'], ['Reklam bütçesini nasıl', 'Bütçe planı'], ['Teklifleri karşılaştırırken', 'Teklif karşılaştırma'], ['Sık sorulan fiyat', 'Fiyat soruları'],
    ['Hizmet ve kapsam', 'Hizmet ve kapsam'], ['Bütçe ve sonuçlar', 'Bütçe ve sonuçlar'], ['Hesaplar ve ölçüm', 'Hesaplar ve ölçüm'],
  ],
  sectionIds: {
    'overview:Facebook reklam yönetimi hizmetimiz neleri kapsar?': 'hizmet-kapsami',
    'features:Facebook form reklamları ve başvuru kalitesi': 'facebook-form-reklamlari',
    'technologies:Önce olay planını oluştururuz': 'facebook-olay-plani',
    'process:İşletmenizi ve hedefinizi tanıyalım': 'facebook-surec-adimlari',
    'portfolio:E-ticaret için örnek çalışma senaryosu': 'facebook-eticaret-senaryosu',
    'pricing:Hangi gider kime ödenir?': 'facebook-maliyet-kalemleri',
  },
  portfolioBadge: 'Temsili senaryo',
  structuredFaq: true,
  blog: { id: 'facebook-reklam-rehberleri', title: 'Facebook Reklam Rehberleri', text: metadata.blog.intro, asideTitle: 'Reklam planınızı birlikte değerlendirelim', asideText: 'Hedefinizi, web sitenizi ve mevcut kampanya durumunuzu paylaşın.', guides: getFacebookAdsGuides },
  blogArt: () => <GuidesScene label="Facebook reklam rehberleri: öndeki rehber okunuyor, diğer rehberler arkada sıralanıyor." guides={['Facebook reklam nasıl verilir?', 'Maliyet nasıl düşürülür?', 'Bütçe ve ölçüm']} chip="Rehber" minutes="Kontrol listesi ve örnek tablo" steps={['Öğren', 'Planla', 'Uygula', 'Ölç']} />,
};

const service = createSeoService(config);
export const FacebookAdsOverviewBody = service.OverviewBody;
export function FacebookAdsTurkishPage({ page }: { page: Exclude<SeoPageKind, 'overview'> }) { return <service.Page page={page} />; }
export const getFacebookAdsMeta = (page: SeoPageKind) => service.getMeta(page);
export const getFacebookAdsSocialMeta = (page: SeoPageKind, canonical: string) => service.getSocialMeta(page, canonical);
