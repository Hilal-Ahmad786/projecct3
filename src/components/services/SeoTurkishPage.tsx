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

const VISUALS: Partial<Record<SeoContentPage, [string, SectionVisual][]>> = {
  overview: [
    ['SEO hizmeti neleri kapsar', aside(SEO.queryMap())],
    ['Bir SEO ajansıyla çalışma', aside(SEO.report())],
  ],
  features: [
    ['SEO çalışmasında hangi işler', aside(SEO.links())],
    ['Mağaza ve hizmet sitelerinde', aside(SEO.category())],
  ],
  technologies: [
    ['Bir bulguyu nasıl doğrularız', aside(SEO.redirects())],
    ['İlk inceleme için', aside(ikas('project-brief', 'Temsili inceleme hazırlığı: site adresi, öncelikli sayfalar, son değişiklikler ve veri erişimi'))],
  ],
  process: [
    ['İlk görüşmeden performans takibine', { place: 'below', node: SEO.rail() }],
  ],
  pricing: [
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
