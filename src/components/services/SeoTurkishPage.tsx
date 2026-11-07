import type { ReactNode } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import IkasVisual from '@/components/ikas/visuals/IkasVisual';
import type { IkasVisualName } from '@/components/ikas/visuals/generated';
import SeoArtwork from '@/components/seo/visuals/SeoArtwork';
import type { SeoVisualName } from '@/components/seo/visuals/generated';
import type { SectionVisual } from '@/components/e-commerce/ServiceMarkdownPage';
import { getSeoGuides } from '@/components/services/service-blogs/seo';
import { createSeoService, type SeoContentPage, type SeoMeta, type SeoPageKind, type SeoServiceConfig } from './seo-pages/SeoServiceEngine';

// Turkish SEO service at /tr/hizmetler/seo. Copy: content/seo/tr (Codex packs in
// Keywords/Pazarlama/SEO/SEO/codex). Rendering is shared with E-Ticaret SEO and
// Teknik SEO through seo-pages/SeoServiceEngine. The overview hero keeps the
// service's own serp-ranking animation (results moving up).

export type SeoTurkishPageKind = SeoPageKind;
export const SEO_TR_BASE = '/tr/hizmetler/seo';
export const SEO_TR_ENQUIRY = '/tr/start-project?service=seo';
const base = SEO_TR_BASE;

const metadata: Record<SeoTurkishPageKind, SeoMeta> = {
  overview: { title: 'SEO Hizmeti ve Danışmanlığı | SEO Ajansı PakSoft', description: 'PakSoft SEO hizmetiyle sitenizin teknik sorunlarını, içerik fırsatlarını ve organik aramadan gelen talepleri değerlendirin. Sitenize özel çalışma planı alın.', heading: 'İşletmeler İçin SEO Hizmeti', intro: 'Google’da müşterilerinizin aradığı konuları, sitenizde bu aramalara karşılık veren sayfaları ve görünürlüğü sınırlayan teknik sorunları birlikte inceleyelim. PakSoft SEO hizmeti, hangi sayfaların önce iyileştirileceğini, hangi değişikliklerin uygulanacağını ve sonuçların nasıl ölçüleceğini belirleyen bir çalışma planıyla başlar.' },
  features: { title: 'SEO Hizmeti Neleri Kapsar? | PakSoft', description: 'SEO çalışmasında hangi sayfaların incelendiğini, teknik sorunların nasıl önceliklendirildiğini ve tamamlanan işlerin nasıl raporlandığını öğrenin.', heading: 'SEO Hizmeti Neleri Kapsar?', intro: 'SEO çalışmasının kapsamı, sitenizde hangi sayfaların müşteriye ulaştığını ve hangi sorunların bu sayfaların görünürlüğünü sınırladığını inceleyerek belirlenir. PakSoft ile anahtar kelime eşleştirmesinden teknik incelemeye ve raporlamaya kadar hangi işlerin projenize dahil olacağını netleştirin.' },
  technologies: { title: 'SEO Araçları ve Ölçüm Yöntemleri | PakSoft', description: 'Search Console, site taraması, PageSpeed Insights ve GA4 verilerinin SEO kararlarında nasıl kullanıldığını örneklerle inceleyin.', heading: 'SEO Araçları ve Ölçüm Yöntemleri', intro: 'Bir hizmet sayfası Google’da gösterim alıyor mu? Eski adres doğru sayfaya yönleniyor mu? Organik aramadan gelen ziyaretçiler teklif formunu kullanıyor mu? Her soru farklı bir veri gerektirir. Sitenizin önceliklerine göre hangi verilerin inceleneceğini ve değişikliklerin nasıl doğrulanacağını belirleyin.' },
  process: { title: 'SEO Çalışması Nasıl İlerler? | PakSoft', description: 'PakSoft SEO çalışma sürecini inceleyin. İlk site değerlendirmesinden öncelik planına, uygulama kontrollerine ve performans takibine kadar adımları öğrenin.', heading: 'SEO Çalışması Nasıl İlerler?', intro: 'SEO çalışmasına, organik aramada hangi hizmet veya ürün sayfalarının işletmeniz için öncelikli olduğunu belirleyerek başlarız. Mevcut durumu kaydeder, iyileştirmeleri sıraya koyar, uygulanan değişiklikleri kontrol eder ve elde edilen verilerle bir sonraki dönemi planlarız.' },
  portfolio: { title: 'SEO Proje Örnekleri ve Uygulama Senaryoları | PakSoft', description: 'Kurumsal web sitesi, e-ticaret mağazası ve site yenilemesi için temsili SEO senaryolarını inceleyin. Her senaryoda hangi işlerin önceliklendirildiğini görün.', heading: 'SEO Proje Örnekleri', intro: 'Bir kurumsal site, bir e-ticaret mağazası ve yenilenen bir web sitesi farklı SEO kararları gerektirir. Aşağıdaki temsili senaryolarda sorunun nasıl incelendiğini, hangi işin önce ele alınabileceğini ve değişikliğin nasıl kontrol edileceğini görebilirsiniz.' },
  pricing: { title: 'SEO Paketleri ve Fiyatları | PakSoft', description: 'SEO paketlerini ve aylık SEO fiyatlarını etkileyen teknik inceleme, içerik, uygulama ve raporlama kalemlerini karşılaştırın. Sitenize özel teklif alın.', heading: 'SEO Fiyatları Nasıl Belirlenir?', intro: 'SEO hizmeti fiyatı, incelenecek sayfa gruplarına, teknik sorunların kapsamına, hazırlanacak içeriklere ve uygulamayı kimin üstleneceğine göre belirlenir. PakSoft ile tek seferlik inceleme, proje bazlı uygulama ve düzenli takip işlerini ayrı ayrı değerlendirerek sitenize uygun bir teklif oluşturabilirsiniz.' },
  faq: { title: 'SEO Hizmeti Hakkında Sık Sorulan Sorular | PakSoft', description: 'SEO çalışmasının ne zaman sonuç verebileceğini, hangi verilerin izlendiğini ve teklif için neler paylaşmanız gerektiğini öğrenin.', heading: 'SEO Hizmeti Hakkında Sık Sorulan Sorular', intro: 'SEO çalışmasına başlamadan önce sitenizde hangi değişikliklerin yapılacağını, sonuçların nasıl takip edileceğini ve teklif için hangi bilgilerin gerektiğini öğrenin.' },
  blog: { title: 'SEO Rehberleri ve İşletmeler İçin İpuçları | PakSoft', description: 'SEO’nun nasıl çalıştığını ve bir SEO ajansının teklifini hangi sorularla değerlendirebileceğinizi PakSoft rehberlerinde öğrenin.', heading: 'İşletmeler İçin SEO Rehberleri', intro: 'Sitenize gelen organik ziyaretleri anlamak ve SEO çalışmasına nereden başlayacağınızı belirlemek için rehberlerimizi inceleyin. İlk yazı, arama görünürlüğünü örnek bir hizmet sayfası üzerinden açıklıyor. İkinci yazı, ajans tekliflerini kapsam ve teslimatlar üzerinden karşılaştırmanıza yardımcı oluyor.' },
};

const aside = (node: ReactNode): SectionVisual => ({ place: 'aside', node });
const art = (name: SeoVisualName, label: string, slotLabels: Record<string, string>, className = 'mx-auto w-full max-w-xl') =>
  <SeoArtwork name={name} loop label={label} slotLabels={slotLabels} className={className} />;
const ikas = (name: IkasVisualName, label: string, slotLabels?: Record<string, string>, className = 'mx-auto w-full max-w-xl') =>
  <IkasVisual name={name} loop label={label} slotLabels={slotLabels} className={className} />;

const SEO = {
  queryMap: () => art('query-map', 'Temsili sorgu ve sayfa eşleştirmesi: “seo hizmeti” hizmet sayfasına, “seo fiyatları” fiyatlandırma sayfasına, “seo nedir” rehber yazısına yönleniyor', { 'slot-head-q': 'Arama sorgusu', 'slot-head-p': 'Yanıt veren sayfa', 'slot-q-1': 'seo hizmeti', 'slot-q-2': 'seo fiyatları', 'slot-q-3': 'seo nedir', 'slot-p-1': 'Hizmet sayfası', 'slot-p-2': 'Fiyatlandırma', 'slot-p-3': 'Rehber yazısı' }),
  report: () => art('report', 'Temsili dönem raporu: tamamlanan üç iş, öncelikli sayfaların gösterim ve tıklama eğilimi ve sıradaki öncelik; sayılar gösterilmiyor', { 'slot-title': 'Dönem raporu', 'slot-tag': 'Temsili', 'slot-done-1': 'Yönlendirmeler düzeltildi', 'slot-done-2': 'Hizmet sayfası güncellendi', 'slot-done-3': 'Form ölçümü doğrulandı', 'slot-chart': 'Gösterim ve tıklama', 'slot-next': 'Sıradaki öncelik: kategori sayfaları' }),
  deliverables: (className?: string) => art('deliverables', 'Temsili SEO çıktıları: anahtar kelime ve sayfa planı, önceliklendirilmiş teknik iş listesi, sayfa güncelleme listesi ve performans özeti', { 'slot-doc-1': 'Anahtar kelime planı', 'slot-doc-2': 'Teknik iş listesi', 'slot-doc-3': 'Sayfa güncellemeleri', 'slot-doc-4': 'Performans özeti' }, className),
  links: () => art('internal-links', 'Temsili iç bağlantı: rehber yazısındaki bağlantı ilgili hizmet sayfasına, hizmet sayfasındaki buton teklif formuna götürüyor', { 'slot-guide': 'Rehber', 'slot-service': 'Hizmet sayfası', 'slot-form': 'Teklif formu' }),
  category: () => art('category-filters', 'Temsili mağaza: kategori sayfası ve filtrelerin oluşturduğu adresler; ana kategori ve alt kategori öncelikli, renk ve sıralama filtreleri için ayrı içerik planlanmıyor', { 'slot-category': 'Kategori sayfası', 'slot-urls': 'Taranan adresler', 'slot-url-1': '/kategori', 'slot-url-2': '/kategori?renk=siyah', 'slot-url-3': '/kategori/alt-kategori', 'slot-url-4': '/kategori?sirala=fiyat', 'slot-legend-ok': 'Öncelikli', 'slot-legend-skip': 'Ayrı içerik yok' }),
  tools: (className?: string) => art('tools', 'Temsili veri kaynakları: Search Console, site taraması, PageSpeed Insights ve GA4 aynı öncelikli sayfa için farklı soruları yanıtlıyor', { 'slot-tool-1': 'Search Console', 'slot-tool-2': 'Site taraması', 'slot-tool-3': 'PageSpeed Insights', 'slot-tool-4': 'GA4', 'slot-center': 'Öncelikli sayfa' }, className),
  redirects: () => art('redirect-map', 'Temsili yönlendirme kontrolü: üç eski adres kalıcı yönlendirmeyle ilgili yeni sayfalara ulaşıyor; yanlış hedefe giden eski kategori adresi düzeltilmiş', { 'slot-old-head': 'Eski adres', 'slot-new-head': 'Yeni adres', 'slot-old-1': '/urunler/kahve', 'slot-old-2': '/eski-kategori', 'slot-old-3': '/iletisim-sayfasi', 'slot-new-1': '/kategori/kahve', 'slot-new-2': '/kategori/cay', 'slot-new-3': '/iletisim', 'slot-code-1': '301', 'slot-code-2': '301', 'slot-code-3': '301' }),
  priority: (className?: string) => art('priority-board', 'Temsili öncelik listesi: yanlış yönlendirme, eksik iç bağlantı ve başlık güncellemesi; her bulgu için etkilenen sayfa ve sorumlu ekip', { 'slot-board': 'Öncelik listesi', 'slot-col-1': 'Bulgu', 'slot-col-2': 'Etkilenen sayfa', 'slot-col-3': 'Sorumlu', 'slot-find-1': 'Yanlış yönlendirme', 'slot-find-2': 'Eksik iç bağlantı', 'slot-find-3': 'Başlık güncellemesi', 'slot-page-1': 'Hizmet sayfası', 'slot-page-2': 'Kategori sayfaları', 'slot-page-3': 'Rehber yazısı', 'slot-owner-1': 'PakSoft', 'slot-owner-2': 'Ekibiniz', 'slot-owner-3': 'PakSoft', 'slot-progress': 'Tamamlanan işler' }, className),
  rail: () => art('process-rail', 'SEO çalışmasının dört aşaması: başlangıç, plan, uygulama ve takip', { 'slot-step-1': 'Başlangıç', 'slot-sub-1': 'Hedef ve mevcut durum', 'slot-step-2': 'Plan', 'slot-sub-2': 'Öncelik sırası', 'slot-step-3': 'Uygulama', 'slot-sub-3': 'Değişiklik ve kontrol', 'slot-step-4': 'Takip', 'slot-sub-4': 'Sonuç ve sonraki iş' }, 'mt-8 hidden w-full lg:block'),
  sites: (className?: string) => art('site-types', 'Üç temsili senaryo: hizmet sayfaları olan kurumsal site, kategorili e-ticaret mağazası ve eski adresleri yeni sayfalara taşınan yenilenmiş site', { 'slot-type-1': 'Kurumsal site', 'slot-type-2': 'E-ticaret mağazası', 'slot-type-3': 'Yenilenen site' }, className),
  quote: (className?: string) => art('quote-groups', 'Temsili SEO teklifi: teknik inceleme, içerik ve iç bağlantılar, uygulama ve doğrulama, ölçüm ve raporlama kalemleri teklifi oluşturuyor; ek geliştirme ve araç lisansları ayrı değerlendiriliyor', { 'slot-group-1': 'Teknik inceleme', 'slot-group-2': 'İçerik ve iç bağlantılar', 'slot-group-3': 'Uygulama ve doğrulama', 'slot-group-4': 'Ölçüm ve raporlama', 'slot-quote': 'SEO teklifi', 'slot-extra': 'Ek geliştirme · lisans' }, className),
};

const EK = {
  roles: () => art('role-lanes', 'SEO ajansı, uzmanı ve danışmanı: ajans ekibiyle planlar ve uygular, uzman belirli işleri yürütür, danışman kararları yönlendirir', { 'slot-role-1': 'SEO ajansı', 'slot-role-sub-1': 'Ekip ve süreç', 'slot-task-1-1': 'Plan ve öncelik', 'slot-task-1-2': 'İçerik ve teknik', 'slot-task-1-3': 'Raporlama', 'slot-role-2': 'SEO uzmanı', 'slot-role-sub-2': 'Uygulama', 'slot-task-2-1': 'Sayfa düzenleme', 'slot-task-2-2': 'Teknik kontrol', 'slot-task-2-3': 'Takip', 'slot-role-3': 'SEO danışmanı', 'slot-role-sub-3': 'Karar desteği', 'slot-task-3-1': 'Strateji', 'slot-task-3-2': 'Ekip yönlendirme', 'slot-task-3-3': 'Teklif kontrolü' }),
  onpage: () => art('page-annotate', 'Site içi SEO: bir hizmet sayfasında başlık etiketi, meta açıklama, sayfa başlığı ve iç bağlantı alanları işaretleniyor', { 'slot-tag-1': 'Başlık etiketi (title)', 'slot-tag-2': 'Sayfa başlığı (H1)', 'slot-tag-3': 'Hizmet kapsamı metni', 'slot-tag-4': 'İlgili sayfaya iç bağlantı' }),
  local: () => art('seo-local', 'Yerel SEO: Google İşletme Profili, sitedeki hizmet bölgesi sayfasına bağlanıyor', { 'slot-profile': 'İşletme profili', 'slot-rating': 'Yorumlar', 'slot-info-1': 'Adres ve çalışma saatleri', 'slot-info-2': 'Web sitesi bağlantısı', 'slot-site': 'Hizmet bölgesi sayfası', 'slot-site-area': 'Hizmet verilen ilçeler', 'slot-site-cta': 'Randevu al' }),
  sources: () => art('tech-sources', 'Üç veri kaynağı aynı hizmet sayfası için: Semrush sıralama verisi, Ahrefs bağlantı verisi ve Search Console gösterim verisi', { 'slot-src-1': 'Semrush', 'slot-src-2': 'Search Console', 'slot-src-3': 'Ahrefs', 'slot-url': '/hizmetler/web-tasarim', 'slot-tag': 'Temsili veri' }),
  competitor: () => art('seo-competitor', 'Temsili rakip analizi: aynı sorguda sizin sayfanız ile rakip sayfa başlık uyumu, içerik kapsamı ve iç bağlantılar açısından karşılaştırılıyor', { 'slot-query': 'kurumsal web sitesi tasarımı', 'slot-yours': 'Sizin sayfanız', 'slot-rival': 'Rakip sayfa', 'slot-yours-row-1': 'Başlık sorguyla uyumlu', 'slot-yours-row-2': 'Süreç bilgisi eksik', 'slot-yours-row-3': 'İç bağlantılar var', 'slot-rival-row-1': 'Başlık sorguyla uyumlu', 'slot-rival-row-2': 'Süreç ve fiyat bilgisi', 'slot-rival-row-3': 'Rehberlerden bağlantı' }),
  monthly: () => art('monthly-plan', 'Temsili aylık SEO çalışması: ilk hafta öncelik, ikinci hafta sayfa güncellemesi, üçüncü hafta kontrol, dördüncü hafta rapor ve görüşme', { 'slot-month': 'Aylık çalışma düzeni', 'slot-week-1': '1. hafta', 'slot-week-2': '2. hafta', 'slot-week-3': '3. hafta', 'slot-week-4': '4. hafta', 'slot-task-1': 'Öncelik', 'slot-task-sub-1': 'Sayfa seçimi', 'slot-task-2': 'Uygulama', 'slot-task-sub-2': 'Sayfa güncellemesi', 'slot-task-3': 'Kontrol', 'slot-task-sub-3': 'Yayın doğrulama', 'slot-task-4': 'Rapor', 'slot-task-sub-4': 'Görüşme ve karar' }),
  evidence: () => art('tech-evidence', 'Bir SEO örneğinde istenecek kanıtlar: önceki durum, yapılan değişiklik ve yeniden kontrol', { 'slot-col-1': 'Önce', 'slot-item-1-1': 'Hedef sayfa', 'slot-item-1-2': 'Başlangıç verisi', 'slot-item-1-3': 'Tespit edilen sorun', 'slot-col-2': 'Değişiklik', 'slot-item-2-1': 'Yapılan iş', 'slot-item-2-2': 'Uygulayan ekip', 'slot-item-2-3': 'Yayın tarihi', 'slot-col-3': 'Yeniden kontrol', 'slot-item-3-1': 'Aynı sayfa', 'slot-item-3-2': 'Karşılaştırma dönemi', 'slot-item-3-3': 'Sonraki karar' }),
  contract: () => art('contract-scope', 'SEO hizmet sözleşmesinde kontrol edilecek maddeler: kapsam, onay süreci, erişimler, raporlama; garanti ifadesi ayrıca sorgulanmalı', { 'slot-doc': 'SEO hizmet sözleşmesi', 'slot-clause-1': 'Kapsamdaki sayfalar ve işler', 'slot-clause-2': 'Onay ve yayın süreci', 'slot-clause-3': 'Hesap erişimleri', 'slot-clause-4': 'Raporlama sıklığı', 'slot-clause-5': 'Sıralama garantisi ifadesi' }),
};

const VISUALS: Partial<Record<SeoContentPage, [string, SectionVisual][]>> = {
  overview: [
    ['SEO hizmeti neleri kapsar', aside(SEO.queryMap())],
    ['Bir SEO ajansıyla çalışma', aside(SEO.report())],
    ['SEO ajansı, uzmanı ve danışmanı', aside(EK.roles())],
  ],
  features: [
    ['SEO çalışmasında hangi işler', aside(SEO.links())],
    ['Mağaza ve hizmet sitelerinde', aside(SEO.category())],
    ['Site içi SEO ile', aside(EK.onpage())],
    ['Yerel SEO ve Google İşletme', aside(EK.local())],
  ],
  technologies: [
    ['Bir bulguyu nasıl doğrularız', aside(SEO.redirects())],
    ['Semrush, Ahrefs ve Search Console', aside(EK.sources())],
    ['SEO rakip analizi', aside(EK.competitor())],
    ['İlk inceleme için', aside(ikas('project-brief', 'Temsili inceleme hazırlığı: site adresi, öncelikli sayfalar, son değişiklikler ve veri erişimi'))],
  ],
  process: [
    ['İlk görüşmeden performans takibine', { place: 'below', node: SEO.rail() }],
    ['Aylık SEO hizmetinde', aside(EK.monthly())],
  ],
  portfolio: [
    ['Bir SEO örneğini değerlendirirken', aside(EK.evidence())],
  ],
  pricing: [
    ['SEO hizmet sözleşmesinde', aside(EK.contract())],
    ['SEO paketlerini nasıl', aside(ikas('method-options', 'Üç çalışma türü: tek seferlik inceleme, proje bazlı uygulama ve aylık SEO çalışması', { 'slot-option-1': 'Tek seferlik inceleme', 'slot-option-2': 'Proje bazlı uygulama', 'slot-option-3': 'Aylık çalışma' }))],
  ],
};

const HERO_ART: SeoServiceConfig['heroArt'] = {
  features: () => SEO.deliverables('w-full'),
  technologies: () => SEO.tools('w-full'),
  process: () => SEO.priority('w-full'),
  portfolio: () => SEO.sites('w-full'),
  pricing: () => SEO.quote('w-full'),
};

const ROTATING: SeoServiceConfig['rotating'] = {
  blog: { lead: 'İşletmeler İçin', words: ['SEO Rehberleri', 'SEO Nedir?', 'Ajans Seçimi'] },
  features: { lead: 'SEO Hizmeti', words: ['Kapsamı', 'Teslimatları', 'Yapılan İşler'] },
  technologies: { lead: 'SEO', words: ['Araçları', 'Ölçüm Yöntemleri', 'Veri Kaynakları'] },
  process: { lead: 'SEO', words: ['Çalışma Süreci', 'Öncelik Planı', 'Performans Takibi'] },
  portfolio: { lead: 'SEO', words: ['Proje Örnekleri', 'Senaryoları', 'Uygulama Örnekleri'] },
  pricing: { lead: 'SEO', words: ['Fiyatları', 'Paketleri', 'Aylık Ücretleri'] },
  faq: { lead: 'SEO Hizmeti', words: ['Sık Sorulanlar', 'Ölçüm Soruları', 'Teklif Soruları'] },
};

const PRIMARY: Record<SeoTurkishPageKind, string> = { overview: 'Sitem İçin SEO Planı Al', features: 'Sitem İçin SEO Kapsamı Belirle', technologies: 'Sitem İçin SEO Planı Al', process: 'Sitem İçin SEO Planı Al', portfolio: 'Sitem İçin SEO Planı Al', pricing: 'Sitem İçin SEO Teklifi Al', faq: 'Sitem İçin SEO Planı Al', blog: 'Sitem İçin SEO Planı Al' };
const SECONDARY: SeoServiceConfig['secondary'] = {
  features: ['Teslimatları İncele', '#seo-teslimatlari'], technologies: ['Ölçüm Araçlarını İncele', '#seo-olcum-araclari'], process: ['Çalışma Adımlarını İncele', '#seo-calisma-adimlari'],
  portfolio: ['Proje Örneklerini İncele', '#seo-proje-ornekleri'], pricing: ['Fiyatı Etkileyen Kalemleri İncele', '#seo-fiyat-kalemleri'], faq: ['Sorulara Göz At', ''],
};
// Closing band secondary link (Codex packs: Süreç or Fiyatlandırma).
const CLOSING_LINK: SeoServiceConfig['closingLink'] = {
  overview: ['SEO Sürecini İncele', `${base}/surec`], features: ['SEO Sürecini İncele', `${base}/surec`], technologies: ['SEO Sürecini İncele', `${base}/surec`],
  process: ['SEO Fiyatlandırmasını İncele', `${base}/fiyatlandirma`], portfolio: ['SEO Sürecini İncele', `${base}/surec`], pricing: ['SEO Sürecini İncele', `${base}/surec`], faq: ['SEO Fiyatlandırmasını İncele', `${base}/fiyatlandirma`],
};

const JUMP_LABELS: [string, string][] = [
  ['Siteniz için doğru başlangıç', 'Başlangıç noktası'], ['SEO hizmeti neleri kapsar', 'Hizmet kapsamı'], ['Bir SEO ajansıyla çalışma', 'Çalışma adımları'], ['İhtiyacınıza uygun SEO', 'İlgili SEO hizmetleri'],
  ['SEO çalışmasında hangi işler', 'Yapılan işler'], ['Proje kapsamında hangi çıktıları', 'Teslimatlar'], ['Mağaza ve hizmet sitelerinde', 'Site türleri'],
  ['Hangi araç hangi soruya', 'Araçlar'], ['Bir bulguyu nasıl doğrularız', 'Doğrulama'], ['İlk inceleme için', 'Gerekli bilgiler'],
  ['İlk görüşmeden performans takibine', 'Dört aşama'], ['Her aşamada hangi karar', 'Karar noktaları'], ['İlk görüşmeye nasıl', 'Hazırlık'],
  ['Üç farklı SEO senaryosu', 'Senaryolar'], ['Sitenizde hangi sayfayı', 'İlk sayfa'],
  ['SEO ajansı, uzmanı ve danışmanı', 'Ajans, uzman, danışman'], ['Kurumsal, yerel ve e-ticaret', 'Site türleri'], ['SEO hizmetinden hangi çıktıları', 'Beklenen çıktılar'],
  ['Site içi SEO ile', 'Site içi SEO'], ['Yerel SEO ve Google İşletme', 'Yerel SEO'], ['İçerik ve bağlantı kazanımına', 'İçerik ve bağlantı'],
  ['Semrush, Ahrefs ve Search Console', 'Semrush ve Ahrefs'], ['SEO rakip analizi', 'Rakip analizi'], ['Bir rapor satırının kaynağını', 'Rapor kaynağı'],
  ['İlk çalışma döneminde', 'İlk dönem'], ['Aylık SEO hizmetinde', 'Aylık düzen'], ['Yayınlanan değişikliklerin kaydını', 'Değişiklik kaydı'],
  ['Yerel, çok dilli ve rehber', 'Diğer örnekler'], ['Bir SEO örneğini değerlendirirken', 'Kanıtlar'], ['Kendi sitenizi örneklerle', 'Karşılaştırma'],
  ['Aylık SEO fiyatları', 'Aylık fiyatlar'], ['Düşük bütçeli bir SEO teklifinde', 'Düşük bütçeli teklif'], ['SEO hizmet sözleşmesinde', 'Sözleşme'],
  ['SEO teklifini hangi işler', 'Fiyat kalemleri'], ['SEO paketlerini nasıl', 'Çalışma türleri'], ['SEO teklifi almak için', 'Teklif hazırlığı'],
];

const SECTION_IDS: Record<string, string> = {
  'overview:SEO hizmeti neleri kapsar?': 'seo-hizmeti-kapsami',
  'features:Proje kapsamında hangi çıktıları alabilirsiniz?': 'seo-teslimatlari',
  'technologies:Hangi araç hangi soruya cevap verir?': 'seo-olcum-araclari',
  'process:İlk görüşmeden performans takibine': 'seo-calisma-adimlari',
  'portfolio:Üç farklı SEO senaryosu': 'seo-proje-ornekleri',
  'pricing:SEO teklifini hangi işler etkiler?': 'seo-fiyat-kalemleri',
};

const seo = createSeoService({
  platform: 'seo',
  contentDir: 'content/seo/tr',
  base,
  enquiry: SEO_TR_ENQUIRY,
  serviceName: 'SEO Hizmeti',
  Icon: MagnifyingGlassIcon,
  metadata,
  visuals: VISUALS,
  heroArt: HERO_ART,
  rotating: ROTATING,
  primary: PRIMARY,
  secondary: SECONDARY,
  closingLink: CLOSING_LINK,
  closingDefault: { title: 'Siteniz için ilk SEO adımını belirleyelim', text: 'Site adresinizi ve öne çıkarmak istediğiniz bir sayfayı paylaşın. İlk görüşmede hangi çalışmanın ihtiyacınıza uygun olduğunu birlikte değerlendirelim.' },
  jumpLabels: JUMP_LABELS,
  sectionIds: SECTION_IDS,
  portfolioBadge: 'Temsili senaryo',
  blog: { id: 'seo-rehberleri', title: 'SEO çalışmasına nereden başlayacağınızı belirleyin', text: 'SEO’nun temel çalışma biçimini ve ajans tekliflerini değerlendirme yöntemlerini anlatan rehberler.', asideTitle: 'Rehberleri kendi sitenize uygulayalım', asideText: 'Site adresinizi ve öne çıkarmak istediğiniz bir sayfayı paylaşın.', guides: getSeoGuides },
});

export const getSeoTurkishMeta = seo.getMeta;
export const getSeoTurkishSocialMeta = seo.getSocialMeta;
export const SeoTurkishOverviewBody = seo.OverviewBody;
export default seo.Page;
