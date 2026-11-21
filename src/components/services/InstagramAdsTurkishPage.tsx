import type { ReactNode } from 'react';
import { MegaphoneIcon } from '@heroicons/react/24/outline';
import type { SectionVisual } from '@/components/e-commerce/ServiceMarkdownPage';
import { BudgetScene, CaseScene, GuidesScene, MeasureScene, QaScene, ScopeScene, TimelineScene } from '@/components/services/hero-visuals/scenes-subpages';
import SeoArtwork from '@/components/seo/visuals/SeoArtwork';
import type { SeoVisualName } from '@/components/seo/visuals/generated';
import { createSeoService, type SeoPageKind, type SeoServiceConfig } from './seo-pages/SeoServiceEngine';
import { getInstagramAdsGuides } from './service-blogs/instagram-ads';
import metadata from '../../../content/instagram-ads/tr/metadata.json';

export const INSTAGRAM_ADS_TR_BASE = '/tr/hizmetler/instagram-ads';
export const INSTAGRAM_ADS_TR_ENQUIRY = '/tr/start-project?service=instagram-ads';
const base = INSTAGRAM_ADS_TR_BASE;

const aside = (node: ReactNode): SectionVisual => ({ place: 'aside', node });
const art = (name: SeoVisualName, label: string, slotLabels: Record<string, string>, className = 'mx-auto w-full max-w-xl') =>
  <SeoArtwork name={name} loop label={label} slotLabels={slotLabels} className={className} />;

// Same standard as the Meta Ads pages: every illustration carries its own Turkish slot text,
// no result numbers, no brand logos, about 3–5 per page, and table sections stay without art.
// Examples are kept Instagram-specific (butik, stüdyo, kafe) so these pages do not repeat the Meta or Facebook illustrations.
const V = {
  goals: (c?: string) => art('gads-goals', 'Instagram reklamında hedef işletme türüne göre seçilir: mağazada tamamlanan sipariş, hizmet işletmesinde nitelikli mesaj ve başvuru, yeni açılışta tanıtım', { 'slot-biz-1': 'Giyim butiği', 'slot-biz-sub-1': 'Ürün satışı', 'slot-goal-label-1': 'Hedef', 'slot-goal-1': 'Tamamlanan sipariş', 'slot-camp-label-1': 'Önce hazır', 'slot-camp-1': 'Katalog ve ölçüm', 'slot-biz-2': 'Fotoğraf stüdyosu', 'slot-biz-sub-2': 'Çekim talebi', 'slot-goal-label-2': 'Hedef', 'slot-goal-2': 'Nitelikli mesaj', 'slot-camp-label-2': 'Önce hazır', 'slot-camp-2': 'Mesaj akışı', 'slot-biz-3': 'Yeni kafe', 'slot-biz-sub-3': 'Açılış duyurusu', 'slot-goal-label-3': 'Hedef', 'slot-goal-3': 'Tanıtım', 'slot-camp-label-3': 'Önce hazır', 'slot-camp-3': 'Hikâye ve harita' }, c),
  placements: (c?: string) => art('site-types', 'Instagram yerleşimlerine göre içerik: Reels için kısa dikey video, hikâye için tam ekran tek mesaj, akış için ürünü açıklayan görsel ve metin', { 'slot-type-1': 'Reels · kısa video', 'slot-type-2': 'Hikâye · tek mesaj', 'slot-type-3': 'Akış · görsel ve metin' }, c),
  agency: (c?: string) => art('deliverables', 'Instagram reklam ajansı seçerken karşılaştırılacak kapsam: hesap sahipliği, video ve görsel üretimi, ölçüm kurulumu ve rapor içeriği', { 'slot-doc-1': 'Hesap sahipliği', 'slot-doc-2': 'Video ve görsel', 'slot-doc-3': 'Ölçüm kurulumu', 'slot-doc-4': 'Rapor içeriği' }, c),
  budget: (c?: string) => art('gads-budget-split', 'Maliyet kalemleri: reklam bütçesi reklam hesabınızdan Meta’ya ödenir; yönetim, içerik ve teknik çalışma PakSoft teklifinde ayrı kalemlerdir', { 'slot-budget': 'Reklam bütçesi', 'slot-budget-sub': 'Instagram harcaması', 'slot-fee': 'Yönetim bedeli', 'slot-setup': 'İçerik ve teknik iş', 'slot-google': 'Reklam hesabınız', 'slot-google-sub': 'Ödeme doğrudan Meta’ya', 'slot-paksoft': 'PakSoft teklifi', 'slot-paksoft-sub': 'Kalemler ayrı yazılır' }, c),
  reels: (c?: string) => art('page-annotate', 'Reels reklamında dikkat edilecekler: ilk karede konu görünür, altyazı sessiz izlemede de anlaşılır, videonun sonunda tek bir eylem bulunur, bağlantı doğru sayfaya gider', { 'slot-tag-1': 'Açılış karesi', 'slot-tag-2': 'Altyazı', 'slot-tag-3': 'Tek eylem', 'slot-tag-4': 'Doğru bağlantı' }, c),
  catalog: (c?: string) => art('category-filters', 'Temsili ürün setleri: giyim kataloğunda stoktaki ceketler ve kazaklar ayrı setlerde reklamda; tükenen ürünler ve görseli eksik ürün set dışında tutuluyor', { 'slot-category': 'Giyim kataloğu', 'slot-urls': 'Ürün setleri', 'slot-url-1': 'Ceketler · stokta', 'slot-url-2': 'Tükenen ürünler', 'slot-url-3': 'Kazaklar · stokta', 'slot-url-4': 'Görseli eksik', 'slot-legend-ok': 'Sette', 'slot-legend-skip': 'Set dışı' }, c),
  leadForm: (c?: string) => art('gads-lead-quality', 'Mesaj ve form ile gelen talepler: her mesaj sayılmaz; çekim türü ve şehri uygun olanlar stüdyo ekibine aktarılır, diğerleri kontrol edilir', { 'slot-forms': 'Gelen talepler', 'slot-lead-1': 'Uygun çekim · uygun şehir', 'slot-lead-2': 'Hizmet verilmeyen tür', 'slot-lead-3': 'Başka şehir', 'slot-lead-4': 'Tarih soruyor', 'slot-lead-5': 'Tekrar eden mesaj', 'slot-ok': 'Nitelikli talep', 'slot-ok-sub': 'Ekibe aktarılır', 'slot-check': 'Kontrol edilecekler', 'slot-check-1': 'Mesaj metni', 'slot-check-2': 'Yanıt süresi', 'slot-check-3': 'Ekip notu' }, c),
  remarketing: (c?: string) => art('ecom-sales-funnel', 'Yeniden pazarlama: videoyu izleyen, profile bakan, siteyi ziyaret eden ve müşteri olan kişilere farklı mesaj gösterilir', { 'slot-step-1': 'Videoyu izleyen', 'slot-step-2': 'Profil ziyaretçisi', 'slot-step-3': 'Site ziyaretçisi', 'slot-step-4': 'Müşteri', 'slot-once': 'Mesaj aşamaya göre' }, c),
  evidence: (c?: string) => art('tech-evidence', 'Instagram reklam değerlendirmesi: gözlem, değişiklik ve doğrulama', { 'slot-col-1': 'Gözlem', 'slot-item-1-1': 'Harcama ve sonuç', 'slot-item-1-2': 'Mesaj kalitesi', 'slot-item-1-3': 'Sepet ve sipariş', 'slot-col-2': 'Değişiklik', 'slot-item-2-1': 'Video veya görsel', 'slot-item-2-2': 'Metin ve eylem', 'slot-item-2-3': 'Kitle ve bütçe', 'slot-col-3': 'Doğrulama', 'slot-item-3-1': 'Sonuç tanımı', 'slot-item-3-2': 'Aynı dönem', 'slot-item-3-3': 'Sonraki test' }, c),
  roles: (c?: string) => art('role-lanes', 'Hesaplar ve sorumluluklar: işletme Instagram ve reklam hesabının sahibidir, PakSoft gerekli yetkiyle kampanya ve ölçümü yönetir, işletme ekibi içerik onayı ve talep takibini yapar', { 'slot-role-1': 'İşletme', 'slot-role-sub-1': 'Hesap sahibi', 'slot-task-1-1': 'Instagram hesabı', 'slot-task-1-2': 'Ödeme yöntemi', 'slot-task-1-3': 'Yetki onayı', 'slot-role-2': 'PakSoft', 'slot-role-sub-2': 'Gerekli yetkiyle', 'slot-task-2-1': 'Kampanyalar', 'slot-task-2-2': 'Ölçüm kontrolü', 'slot-task-2-3': 'Raporlama', 'slot-role-3': 'İşletme ekibi', 'slot-role-sub-3': 'Satış ve içerik', 'slot-task-3-1': 'İçerik onayı', 'slot-task-3-2': 'Mesaj takibi', 'slot-task-3-3': 'Satış kaydı' }, c),
  tagFlow: (c?: string) => art('gads-tag-flow', 'Instagram reklam ölçüm akışı: tarayıcıdaki piksel olayı, uygunsa Conversions API ile sunucu olayı ve tekrar kayıt kontrolü', { 'slot-step-1': 'Tarayıcı olayı', 'slot-sub-1': 'Meta Pixel', 'slot-step-2': 'Sunucu olayı', 'slot-sub-2': 'Conversions API', 'slot-step-3': 'Kontrol', 'slot-sub-3': 'Tekrar kayıt testi', 'slot-note': 'Sunucu bağlantısı her sitede gerekmez; altyapıya göre değerlendirilir.' }, c),
  sources: (c?: string) => art('tech-sources', 'Raporlar farklı sonuç gösterebilir: Reklam Yöneticisi, web analitiği ve satış kaydı aynı dönem üzerinden karşılaştırılır; farklar açıklanır', { 'slot-src-1': 'Reklam raporu', 'slot-src-2': 'Web analitiği', 'slot-src-3': 'Satış kaydı', 'slot-url': 'Aynı dönem', 'slot-tag': 'Açıklanır' }, c),
  rail: (c?: string) => art('process-rail', 'Instagram reklam yönetimi süreci: hedef ve mevcut durum, erişim ve ölçüm kontrolü, kampanya ve içerik hazırlığı, yayın ve değerlendirme', { 'slot-step-1': 'Hedef', 'slot-sub-1': 'Mevcut durum', 'slot-step-2': 'Erişim ve ölçüm', 'slot-sub-2': 'Kontrol listesi', 'slot-step-3': 'Kampanya ve içerik', 'slot-sub-3': 'Onaylı plan', 'slot-step-4': 'Yayın ve rapor', 'slot-sub-4': 'Sonraki adım' }, c),
  launch: (c?: string) => art('contract-scope', 'Yayın öncesi kontrol kaydı: reklam bağlantıları, dikey görünüm, metin okunabilirliği, ölçüm testi ve müşteri onayı', { 'slot-doc': 'Yayın kontrol kaydı', 'slot-clause-1': 'Reklam bağlantıları', 'slot-clause-2': 'Dikey görünüm', 'slot-clause-3': 'Metin okunur mu', 'slot-clause-4': 'Ölçüm testi', 'slot-clause-5': 'Onay eksikse yayın bekler' }, c),
  project: (c?: string) => art('site-types', 'Instagram reklam senaryoları işletme türüne göre değerlendirilir: butikte sipariş, stüdyoda nitelikli mesaj, yeni mekânda tanıtım', { 'slot-type-1': 'Giyim butiği', 'slot-type-2': 'Fotoğraf stüdyosu', 'slot-type-3': 'Yeni mekân' }, c),
  ecomCase: (c?: string) => art('tech-finding', 'Temsili butik senaryosu: Reels izleniyor ve ürün sayfası ziyaret ediliyor ama sepet az; önce katalog ve beden bilgisi kontrol ediliyor, sonra videonun bağlantısı düzeltiliyor', { 'slot-title': 'Butik senaryosu', 'slot-priority': 'Temsili', 'slot-label-1': 'Başlangıç', 'slot-value-1': 'İzlenme var, sepet az', 'slot-label-2': 'İlk kontrol', 'slot-value-2': 'Katalog ve beden', 'slot-label-3': 'Yaklaşım', 'slot-value-3': 'Ürüne doğrudan bağlantı', 'slot-label-4': 'İzlenecek sonuç', 'slot-value-4': 'Tamamlanan sipariş' }, c),
  serviceCase: (c?: string) => art('gads-offline', 'Temsili stüdyo senaryosu: hikâye reklamından gelen mesajlar stüdyoda inceleniyor, uygun olanlar teklif aşamasına geçiyor; reklam bu aşamalara göre değerlendiriliyor', { 'slot-crm': 'Mesaj takibi', 'slot-stage-1': 'Yeni mesaj', 'slot-stage-2': 'Yanıtlandı', 'slot-stage-3': 'Uygun bulundu', 'slot-stage-4': 'Teklif', 'slot-ads': 'Kampanya kararı', 'slot-ads-1': 'Hikâye metni', 'slot-ads-2': 'Mesaj akışı', 'slot-note': 'Başarı ölçütü mesaj sayısı değil, uygun taleptir' }, c),
  quote: (c?: string) => art('quote-groups', 'Yönetim bedelini etkileyenler: kampanya grupları, video ve görsel üretimi, ölçüm kurulumu, rapor ve toplantı kapsamı; reklam bütçesi ayrı', { 'slot-group-1': 'Kampanya grupları', 'slot-group-2': 'Video ve görsel', 'slot-group-3': 'Ölçüm kurulumu', 'slot-group-4': 'Rapor ve toplantı', 'slot-quote': 'Yönetim bedeli', 'slot-extra': 'Reklam bütçesi ayrı' }, c),
  budgetPlan: (c?: string) => art('monthly-plan', 'Temsili bütçe planı: ilk dönemde küçük testler, ardından sonucu iyi olan reklama bütçe aktarımı ve dönem sonu değerlendirmesi', { 'slot-month': 'Bütçe planı', 'slot-week-1': 'Başlangıç', 'slot-week-2': 'Test', 'slot-week-3': 'Aktarım', 'slot-week-4': 'Dönem sonu', 'slot-task-1': 'Ölçüm kontrolü', 'slot-task-sub-1': 'Olaylar doğru mu?', 'slot-task-2': 'Küçük testler', 'slot-task-sub-2': 'Tek değişken', 'slot-task-3': 'Bütçe aktarımı', 'slot-task-sub-3': 'Gerekçesiyle', 'slot-task-4': 'Değerlendirme', 'slot-task-sub-4': 'Satış kaydıyla' }, c),
  compare: (c?: string) => art('deliverables', 'Teklifleri karşılaştırırken sorulacaklar: reklam bütçesi dahil mi, kaç video ve görsel üretilecek, piksel kurulumu dahil mi, rapor neyi açıklayacak', { 'slot-doc-1': 'Bütçe dahil mi?', 'slot-doc-2': 'Video ve revizyon', 'slot-doc-3': 'Kurulum dahil mi?', 'slot-doc-4': 'Rapor kapsamı' }, c),
};

const visuals: SeoServiceConfig['visuals'] = {
  overview: [
    ['Instagram reklamlarını hangi ihtiyaç', aside(V.goals())],
    ['Instagram reklam yönetimi hizmetimiz', aside(V.placements())],
    ['Instagram reklam ajansı seçerken', aside(V.agency())],
    ['Instagram reklam bütçesi ve yönetim', aside(V.budget())],
  ],
  features: [
    ['Reels reklamları için mesaj', aside(V.reels())],
    ['Instagram katalog', aside(V.catalog())],
    ['Mesaj ve form', aside(V.leadForm())],
    ['Yeniden pazarlama', aside(V.remarketing())],
  ],
  technologies: [
    ['Platform içindeki sonuç', aside(V.sources())],
    ['Olay planı ve veri tutarlılığı', aside(V.tagFlow())],
    ['Mevcut altyapıyı çoğaltmadan', aside(V.roles())],
  ],
  process: [
    ['1. Hedef ve mevcut durum', { place: 'below', node: V.rail() }],
    ['3. Erişim ve teknik hazırlık', aside(V.roles())],
    ['5. Yayın ve ilk kontrol', aside(V.launch())],
  ],
  portfolio: [
    ['Ürünün kullanımını anlatan Reels', aside(V.ecomCase())],
    ['Hizmet kapsamını açıklayan hikâye', aside(V.serviceCase())],
  ],
  pricing: [
    ['Toplam maliyeti oluşturan kalemler', aside(V.quote())],
    ['Günlük reklam bütçesini', aside(V.budgetPlan())],
    ['Teklif öncesi sık sorulanlar', aside(V.compare())],
  ],
};

// Sub-page heroes: animated story scenes in the overview standard (scenes-subpages.tsx).
const heroArt: SeoServiceConfig['heroArt'] = {
  features: () => <ScopeScene label="Temsili Instagram reklam hizmet kapsamı: Reels reklamları, hikâye reklamları, katalog ve mesaj reklamları adım adım tamamlanıyor; iki video açılışı sırayla test ediliyor."
    title="Hizmet kapsamı" items={['Reels reklamları', 'Hikâye reklamları', 'Katalog reklamları', 'Mesaj ve form']} test={['Video A', 'Video B', 'Açılış testi']} result="Sonraki test" steps={['Hedef', 'Kreatif', 'Yayın', 'Rapor']} />,
  technologies: () => <MeasureScene label="Temsili Instagram ölçüm akışı: tarayıcıdaki Meta Pixel olayı ve Conversions API sunucu olayı aynı rapora ulaşıyor, tekrar sayılmıyor ve izin tercihi uygulanıyor."
    browser={['Meta Pixel', 'Siparişi tamamla']} server={['Conversions API', 'Sunucu olayı']} report="Instagram raporu" events={['Purchase', 'Lead', 'Contact']} badge="Tekrar sayılmadı" consent="İzin tercihi uygulanır" steps={['Olay planı', 'Kurulum', 'Test', 'Rapor']} />,
  process: () => <TimelineScene label="Temsili Instagram reklam yönetimi süreci: hedef, kapsam, erişim, yayın ve değerlendirme adımları sırayla ilerliyor; ilk dönem planı kontrol ediliyor."
    milestones={['Hedef', 'Kapsam', 'Erişim', 'Yayın', 'Rapor']} plan={['İlk dönem planı', 'Hesap erişimi', 'Video ve görsel', 'İlk kontroller']} steps={['Hedef', 'Hazırlık', 'Yayın', 'Değerlendirme']} />,
  portfolio: () => <CaseScene label="Temsili Instagram reklam senaryosu: rapor üzerinde gözlem, değişiklik ve kontrol noktaları işaretleniyor; başlangıç durumundan yaklaşıma geçiliyor ve değerlendirme kaydediliyor."
    title="Temsili senaryo" badge="Temsili" notes={['Gözlem', 'Video bağlantısı', 'Kontrol']} start={['Başlangıç', 'İzlenme var, sepet az']} approach={['Yaklaşım', 'Doğrudan ürün']} verdict="Uygun talep ekip kayıtlarıyla doğrulanır" steps={['Durum', 'Kontrol', 'Değişiklik', 'Sonuç']} />,
  pricing: () => <BudgetScene label="Instagram reklam maliyet kalemleri: toplam plan, reklam hesabınızdan Meta’ya ödenen reklam bütçesi ve yönetim, içerik ve teknik işlerin ayrı yazıldığı PakSoft teklifi olarak ikiye ayrılıyor."
    plan="Reklam planı" spend={['Reklam bütçesi', 'Reklam hesabınız']} quote="PakSoft teklifi" items={['Yönetim', 'Video ve görsel', 'Ölçüm kurulumu']} badge="Kalemler ayrı yazılır" steps={['Bütçe', 'Kapsam', 'Teklif', 'Onay']} />,
  faq: () => <QaScene label="Instagram reklam yönetimi hakkında sık sorulan sorular: arama yapılıyor, ilk sorunun yanıtı açılıyor ve hizmet, içerik, bütçe konuları sırayla vurgulanıyor."
    search="Instagram ile Meta farkı" questions={['Instagram ile Meta aynı hizmet mi?', 'Şifremi paylaşmalı mıyım?', 'Reels için video şart mı?']} answer={['Meta, Facebook ve Instagram’ı kapsar;', 'bu sayfa Instagram odaklıdır.']} topics={['Hizmet', 'İçerik', 'Bütçe']} steps={['Soru', 'Yanıt', 'Kapsam', 'Teklif']} />,
};

const config: SeoServiceConfig = {
  platform: 'engine', links: {
    slug: 'instagram-ads', name: 'Instagram reklam', blog: true,
    pagesTitle: 'Instagram hizmetinin ayrıntılarını keşfedin', pagesHeading: 'Instagram reklam sayfaları',
    pages: {
      overview: ['Genel Bakış', 'Instagram kampanyalarının hedef ve hizmet çerçevesini görün.'],
      features: ['Özellikler', 'Reels, hikâye, katalog ve kampanya çalışmalarının kapsamını inceleyin.'],
      technologies: ['Teknolojiler', 'Ölçüm araçlarını, katalog ve veri akışını değerlendirin.'],
      process: ['Süreç', 'Brief, kreatif onayı, yayın ve değerlendirme adımlarını öğrenin.'],
      portfolio: ['Portföy', 'Temsili senaryoları ve çalışma yaklaşımımızı inceleyin.'],
      pricing: ['Fiyatlandırma', 'Medya bütçesi, yönetim ve üretim giderlerini ayırın.'],
      blog: ['Blog', 'Reklam verme, Reels ve gönderi tanıtımı rehberlerini okuyun.'],
      faq: ['SSS', 'Başlangıç, hesap erişimi, bütçe ve kapsam sorularına yanıt bulun.'],
    },
    related: [['Meta Reklam Yönetimi', 'Facebook ve Instagram kampanyalarını birlikte planlayın.', '/tr/hizmetler/meta-ads'], ['Facebook Reklam Yönetimi', 'Facebook odaklı reklam çalışmasının kapsamını inceleyin.', '/tr/hizmetler/facebook-ads'], ['E-Ticaret Çözümleri', 'Reklamdan sonraki mağaza ve satın alma deneyimini planlayın.', '/tr/hizmetler/e-commerce']],
  }, contentDir: 'content/instagram-ads/tr', base, enquiry: INSTAGRAM_ADS_TR_ENQUIRY,
  serviceName: 'Instagram Reklam Yönetimi', Icon: MegaphoneIcon, metadata, visuals, heroArt,
  rotating: { features: { lead: 'Instagram Reklam', words: ['Hizmet Kapsamı', 'Reels Reklamları'] }, technologies: { lead: 'Instagram Reklam', words: ['Ölçümü', 'Piksel Kurulumu'] }, process: { lead: 'Instagram Reklam', words: ['Yönetim Süreci', 'Değerlendirme'] }, portfolio: { lead: 'Instagram Reklam', words: ['Senaryoları', 'Değerlendirme'] }, pricing: { lead: 'Instagram Reklam', words: ['Ücretleri', 'Bütçe Planı'] }, faq: { lead: 'Instagram Reklam', words: ['Sık Sorulan Sorular', 'Yönetimi'] }, blog: { lead: 'Instagram Reklam', words: ['Rehberleri', 'Maliyet Analizi'] } },
  primary: { overview: 'Instagram Reklam Teklifi Al', features: 'Kapsamıma Göre Teklif Al', technologies: 'Ölçüm İhtiyacımı Paylaş', process: 'İlk Görüşme İçin Bilgilerimi Paylaş', portfolio: 'Kampanyamı Görüşmek İstiyorum', pricing: 'Instagram Reklam Teklifi Al', faq: 'Sorumu ve İhtiyacımı Paylaş', blog: 'Instagram Reklam Teklifi Al' },
  secondary: { features: ['Hizmet Kapsamını İncele', '#instagram-reels-reklamlari'], technologies: ['Ölçüm Planını İncele', '#instagram-olay-plani'], process: ['Adımları İncele', '#instagram-surec-adimlari'], portfolio: ['Senaryoları İncele', '#instagram-butik-senaryosu'], pricing: ['Maliyet Kalemlerini İncele', '#instagram-maliyet-kalemleri'], faq: ['Soruları İncele', ''] },
  closingLink: { overview: ['Hizmet Kapsamını İncele', `${base}/ozellikler`], features: ['Fiyatlandırmayı İncele', `${base}/fiyatlandirma`], technologies: ['Hizmet Kapsamına Dön', `${base}/ozellikler`], process: ['Ölçüm ve Teknolojiler', `${base}/teknoloji`], portfolio: ['Çalışma Sürecimiz', `${base}/surec`], pricing: ['Meta Bütçe Rehberi', '/tr/hizmetler/meta-ads/blog/meta-reklam-butcesi-planlama'], faq: ['Instagram Reklam Yönetimi', base] },
  closingDefault: { title: 'Instagram Reklam Planınızı Birlikte Oluşturalım', text: 'Hedefinizi, Instagram hesabınızı ve mevcut reklam durumunuzu paylaşın; gerekli işleri birlikte belirleyelim.' },
  closingTitlePrefix: { overview: 'İşletmeniz için Instagram reklam planı', features: 'İlk aşamada gerekli özellikleri', technologies: 'Mevcut altyapıyı çoğaltmadan', process: 'İlk görüşmeye nasıl hazırlanabilirsiniz', portfolio: 'Sizin çalışmanız için başlangıç', pricing: 'Kapsamınıza uygun teklif isteyin', faq: 'İşletmenize özel bir sorunuz' },
  closingCopy: { overview: { title: 'İşletmeniz için Instagram reklam planını oluşturalım', text: 'Ne sattığınızı, kime ulaşmak istediğinizi ve bugün karşılaştığınız engeli paylaşın. Kampanya kapsamını ve öncelikli işleri birlikte belirleyelim.' } },
  jumpLabels: [
    ['Instagram reklamlarından hangi sonucu', 'Reklam hedefi'], ['Instagram reklam yönetimi hizmetimiz', 'Hizmet kapsamı'], ['Reels, hikâye ve akış', 'Reels ve hikâye'], ['Gönderiyi öne çıkarmak', 'Öne çıkar mı, kampanya mı?'], ['Instagram reklam ajansı seçerken', 'Ajans seçimi'], ['Instagram reklam bütçesi ve yönetim', 'Bütçe ve ücret'], ['Instagram ile Facebook', 'Facebook ile birlikte'],
    ['Reels reklamları', 'Reels reklamları'], ['Hikâye reklamlarında', 'Hikâye reklamları'], ['Instagram katalog', 'Katalog reklamları'], ['Mesaj ve form', 'Mesaj ve form'], ['Yeniden pazarlama', 'Yeniden pazarlama'], ['Kreatif ve reklam metni', 'Kreatif testleri'], ['Hizmete dahil olanlar', 'Kapsam tablosu'],
    ['Instagram hesabı, Facebook sayfası', 'Hesap bağlantısı'], ['Hangi araç', 'Araçlar'], ['Meta Pixel ve Conversions', 'Piksel ve CAPI'], ['Profil ziyareti', 'Olay türleri'], ['Raporlar neden', 'Rapor farkları'],
    ['İşletmenizi ve hedefinizi', 'Hedef'], ['Kapsam ve sorumlulukları', 'Kapsam'], ['Erişimleri ve ölçümü', 'Erişim ve ölçüm'], ['Kampanya ve içerikleri', 'Kampanya ve içerik'], ['Yayın ve ilk kontrolleri', 'Yayın'], ['Sonuçları değerlendirip', 'Değerlendirme'],
    ['Giyim butiği', 'Butik senaryosu'], ['Fotoğraf stüdyosu', 'Stüdyo senaryosu'], ['Bir sonuç raporunda', 'Rapor içeriği'],
    ['Hangi gider kime', 'Maliyet kalemleri'], ['Instagram reklam ücretlerini', 'Ücreti etkileyenler'], ['Gönderiyi öne çıkarma ücreti', 'Öne çıkarma ücreti'], ['Üç farklı çalışma kapsamı', 'Çalışma kapsamları'], ['Reklam bütçesini nasıl', 'Bütçe planı'], ['Teklifleri karşılaştırırken', 'Teklif karşılaştırma'], ['Sık sorulan fiyat', 'Fiyat soruları'],
    ['Hizmet ve kapsam', 'Hizmet ve kapsam'], ['Reels, hikâye ve içerik', 'Reels ve içerik'], ['Bütçe ve sonuçlar', 'Bütçe ve sonuçlar'], ['Hesap ve ölçüm', 'Hesap ve ölçüm'],
  ],
  sectionIds: {
    'overview:Instagram reklam yönetimi hizmetimiz neleri kapsar?': 'hizmet-kapsami',
    'features:Reels reklamları için mesaj ve sahne planı': 'instagram-reels-reklamlari',
    'technologies:Olay planı ve veri tutarlılığı': 'instagram-olay-plani',
    'process:1. Hedef ve mevcut durum': 'instagram-surec-adimlari',
    'portfolio:Ürünün kullanımını anlatan Reels çalışması': 'instagram-butik-senaryosu',
    'pricing:Toplam maliyeti oluşturan kalemler': 'instagram-maliyet-kalemleri',
  },
  portfolioBadge: 'Temsili senaryo',
  structuredFaq: true,
  blog: { id: 'instagram-reklam-rehberleri', title: 'Instagram Reklam Rehberleri', text: metadata.blog.intro, asideTitle: 'Reklam planınızı birlikte değerlendirelim', asideText: 'Hedefinizi, Instagram hesabınızı ve mevcut kampanya durumunuzu paylaşın.', guides: getInstagramAdsGuides },
  blogArt: () => <GuidesScene label="Instagram reklam rehberleri: öndeki rehber okunuyor, diğer rehberler arkada sıralanıyor." guides={['Instagram reklam nasıl verilir?', 'Reklam ücretleri', 'Reels ve hikâye']} chip="Rehber" minutes="Kontrol listesi ve örnekler" steps={['Öğren', 'Planla', 'Uygula', 'Ölç']} />,
};

const service = createSeoService(config);
export const InstagramAdsOverviewBody = service.OverviewBody;
export function InstagramAdsTurkishPage({ page }: { page: Exclude<SeoPageKind, 'overview'> }) { return <service.Page page={page} />; }
export const getInstagramAdsMeta = (page: SeoPageKind) => service.getMeta(page);
export const getInstagramAdsSocialMeta = (page: SeoPageKind, canonical: string) => service.getSocialMeta(page, canonical);
