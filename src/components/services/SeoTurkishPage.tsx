import type { ReactNode } from 'react';
import Link from '@/components/IntentLink';
import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import ServiceGuideCards from '@/components/services/ServiceGuideCards';
import IkasVisual from '@/components/ikas/visuals/IkasVisual';
import type { IkasVisualName } from '@/components/ikas/visuals/generated';
import SeoArtwork from '@/components/seo/visuals/SeoArtwork';
import type { SeoVisualName } from '@/components/seo/visuals/generated';
import { FAQJsonLd } from '@/components/seo/JsonLd';
import { trTitleCase } from '@/lib/tr-title-case';
import { BlogFeedScene, FaqScene } from '@/components/services/hero-visuals/scenes-internal';
import CustomEcommerceMotionScope from '@/components/e-commerce/CustomEcommerceMotionScope';
import PlatformPageLinks from '@/components/e-commerce/PlatformPageLinks';
import { sectionId } from '@/components/e-commerce/PageJumpNav';
import { ServiceMdBody, matchPrefix, readServiceChunks, serviceFaqItems, type Chunk, type SectionVisual, type ServiceMdConfig } from '@/components/e-commerce/ServiceMarkdownPage';
import { getSeoGuides } from '@/components/services/service-blogs/seo';

// Turkish SEO service at /tr/hizmetler/seo. Copy lives in content/seo/tr (from
// the Codex packs in Keywords/Pazarlama/SEO/SEO/codex) and renders through
// ServiceMarkdownPage like the pazaryeri and custom e-commerce pages. Visuals
// are the SEO SVGs in src/components/seo/visuals; every chart is labelled
// representative (no invented results). The last `##` block of each page is
// its closing CTA, rendered as the dark closing band.

export type SeoTurkishPageKind = 'overview' | 'features' | 'technologies' | 'process' | 'portfolio' | 'pricing' | 'faq' | 'blog';
type SeoContentPage = Exclude<SeoTurkishPageKind, 'blog'>;
type SubPage = Exclude<SeoTurkishPageKind, 'overview' | 'blog'>;
export const SEO_TR_BASE = '/tr/hizmetler/seo';
export const SEO_TR_ENQUIRY = '/tr/start-project?service=seo';
const base = SEO_TR_BASE;
const enquiry = SEO_TR_ENQUIRY;
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';

const metadata: Record<SeoTurkishPageKind, { title: string; description: string; heading: string; intro: string }> = {
  overview: { title: 'SEO Hizmeti ve Danışmanlığı | PakSoft', description: 'PakSoft SEO hizmetiyle sitenizin teknik sorunlarını, içerik fırsatlarını ve organik aramadan gelen talepleri değerlendirin. Sitenize özel çalışma planı alın.', heading: 'İşletmeler İçin SEO Hizmeti', intro: 'Google’da müşterilerinizin aradığı konuları, sitenizde bu aramalara karşılık veren sayfaları ve görünürlüğü sınırlayan teknik sorunları birlikte inceleyelim. PakSoft SEO hizmeti, hangi sayfaların önce iyileştirileceğini, hangi değişikliklerin uygulanacağını ve sonuçların nasıl ölçüleceğini belirleyen bir çalışma planıyla başlar.' },
  features: { title: 'SEO Hizmeti Neleri Kapsar? | PakSoft', description: 'SEO çalışmasında hangi sayfaların incelendiğini, teknik sorunların nasıl önceliklendirildiğini ve tamamlanan işlerin nasıl raporlandığını öğrenin.', heading: 'SEO Hizmeti Neleri Kapsar?', intro: 'SEO çalışmasının kapsamı, sitenizde hangi sayfaların müşteriye ulaştığını ve hangi sorunların bu sayfaların görünürlüğünü sınırladığını inceleyerek belirlenir. PakSoft ile anahtar kelime eşleştirmesinden teknik incelemeye ve raporlamaya kadar hangi işlerin projenize dahil olacağını netleştirin.' },
  technologies: { title: 'SEO Araçları ve Ölçüm Yöntemleri | PakSoft', description: 'Search Console, site taraması, PageSpeed Insights ve GA4 verilerinin SEO kararlarında nasıl kullanıldığını örneklerle inceleyin.', heading: 'SEO Araçları ve Ölçüm Yöntemleri', intro: 'Bir hizmet sayfası Google’da gösterim alıyor mu? Eski adres doğru sayfaya yönleniyor mu? Organik aramadan gelen ziyaretçiler teklif formunu kullanıyor mu? Her soru farklı bir veri gerektirir. Sitenizin önceliklerine göre hangi verilerin inceleneceğini ve değişikliklerin nasıl doğrulanacağını belirleyin.' },
  process: { title: 'SEO Çalışması Nasıl İlerler? | PakSoft', description: 'PakSoft SEO çalışma sürecini inceleyin. İlk site değerlendirmesinden öncelik planına, uygulama kontrollerine ve performans takibine kadar adımları öğrenin.', heading: 'SEO Çalışması Nasıl İlerler?', intro: 'SEO çalışmasına, organik aramada hangi hizmet veya ürün sayfalarının işletmeniz için öncelikli olduğunu belirleyerek başlarız. Mevcut durumu kaydeder, iyileştirmeleri sıraya koyar, uygulanan değişiklikleri kontrol eder ve elde edilen verilerle bir sonraki dönemi planlarız.' },
  portfolio: { title: 'SEO Proje Örnekleri ve Uygulama Senaryoları | PakSoft', description: 'Kurumsal web sitesi, e-ticaret mağazası ve site yenilemesi için temsili SEO senaryolarını inceleyin. Her senaryoda hangi işlerin önceliklendirildiğini görün.', heading: 'SEO Proje Örnekleri', intro: 'Bir kurumsal site, bir e-ticaret mağazası ve yenilenen bir web sitesi farklı SEO kararları gerektirir. Aşağıdaki temsili senaryolarda sorunun nasıl incelendiğini, hangi işin önce ele alınabileceğini ve değişikliğin nasıl kontrol edileceğini görebilirsiniz.' },
  pricing: { title: 'SEO Fiyatları ve Hizmet Kapsamı | PakSoft', description: 'SEO fiyatlarını etkileyen teknik inceleme, içerik, uygulama ve raporlama kalemlerini karşılaştırın. Sitenizin kapsamına göre teklif alın.', heading: 'SEO Fiyatları Nasıl Belirlenir?', intro: 'SEO hizmeti fiyatı, incelenecek sayfa gruplarına, teknik sorunların kapsamına, hazırlanacak içeriklere ve uygulamayı kimin üstleneceğine göre belirlenir. PakSoft ile tek seferlik inceleme, proje bazlı uygulama ve düzenli takip işlerini ayrı ayrı değerlendirerek sitenize uygun bir teklif oluşturabilirsiniz.' },
  faq: { title: 'SEO Hizmeti Hakkında Sık Sorulan Sorular | PakSoft', description: 'SEO çalışmasının ne zaman sonuç verebileceğini, hangi verilerin izlendiğini ve teklif için neler paylaşmanız gerektiğini öğrenin.', heading: 'SEO Hizmeti Hakkında Sık Sorulan Sorular', intro: 'SEO çalışmasına başlamadan önce sitenizde hangi değişikliklerin yapılacağını, sonuçların nasıl takip edileceğini ve teklif için hangi bilgilerin gerektiğini öğrenin.' },
  blog: { title: 'SEO Rehberleri ve İşletmeler İçin İpuçları | PakSoft', description: 'SEO’nun nasıl çalıştığını ve bir SEO ajansının teklifini hangi sorularla değerlendirebileceğinizi PakSoft rehberlerinde öğrenin.', heading: 'İşletmeler İçin SEO Rehberleri', intro: 'Sitenize gelen organik ziyaretleri anlamak ve SEO çalışmasına nereden başlayacağınızı belirlemek için rehberlerimizi inceleyin. İlk yazı, arama görünürlüğünü örnek bir hizmet sayfası üzerinden açıklıyor. İkinci yazı, ajans tekliflerini kapsam ve teslimatlar üzerinden karşılaştırmanıza yardımcı oluyor.' },
};

export function getSeoTurkishMeta(page: SeoTurkishPageKind) { return metadata[page]; }

export function getSeoTurkishSocialMeta(page: SeoTurkishPageKind, canonicalUrl: string, image = '/images/og-image.jpg') {
  const { title, description } = metadata[page];
  return {
    openGraph: { type: 'website' as const, title, description, url: canonicalUrl, siteName: 'PakSoft', locale: 'tr_TR', images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image' as const, title, description, images: [image] },
  };
}

/* ------------------------------------------------------------------ content */

// The closing `##` block of each page becomes the dark CTA band, not a section.
const isClosing = (chunk: Chunk) => /^siteniz(in|de)? (için|ilk|seo|hangi)/.test(chunk.title.toLocaleLowerCase('tr'));
function readPage(page: SeoContentPage) {
  const chunks = readServiceChunks('content/seo/tr', page);
  const last = chunks.at(-1);
  return last && isClosing(last) ? { sections: chunks.slice(0, -1), closing: last } : { sections: chunks, closing: undefined };
}

/* ------------------------------------------------------------------ visuals */

const aside = (node: ReactNode): SectionVisual => ({ place: 'aside', node });
const art = (name: SeoVisualName, label: string, slotLabels: Record<string, string>, className = 'mx-auto w-full max-w-xl') =>
  <SeoArtwork name={name} loop label={label} slotLabels={slotLabels} className={className} />;
const ikas = (name: IkasVisualName, label: string, slotLabels?: Record<string, string>, className = 'mx-auto w-full max-w-xl') =>
  <IkasVisual name={name} loop label={label} slotLabels={slotLabels} className={className} />;

// Each visual appears once per service (heroes included). The overview hero
// keeps the service's own serp-ranking animation (results moving up).
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

function SeoHeroScene({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full max-w-xl">
      {children}
      <div aria-hidden="true" data-ikas-loop className={`ikas-badge-float absolute z-20 -left-2 -top-14 sm:-left-6 rounded-[20px] bg-white p-3 shadow-[0_12px_30px_rgba(18,25,38,0.18)] ring-1 ring-black/5`}>
        <MagnifyingGlassIcon className="h-10 w-10 text-heritage-turquoise-deep sm:h-12 sm:w-12" />
      </div>
    </div>
  );
}

// Each subpage hero has its own scene (no visual repeats further down).
const HERO_ART: Record<SubPage, () => ReactNode> = {
  features: () => SEO.deliverables('w-full'),
  technologies: () => SEO.tools('w-full'),
  process: () => SEO.priority('w-full'),
  portfolio: () => SEO.sites('w-full'),
  pricing: () => SEO.quote('w-full'),
  faq: () => <FaqScene />,
};

const ROTATING: Record<SubPage, { lead: string; words: string[] }> = {
  features: { lead: 'SEO Hizmeti', words: ['Kapsamı', 'Teslimatları', 'Yapılan İşler'] },
  technologies: { lead: 'SEO', words: ['Araçları', 'Ölçüm Yöntemleri', 'Veri Kaynakları'] },
  process: { lead: 'SEO', words: ['Çalışma Süreci', 'Öncelik Planı', 'Performans Takibi'] },
  portfolio: { lead: 'SEO', words: ['Proje Örnekleri', 'Senaryoları', 'Uygulama Örnekleri'] },
  pricing: { lead: 'SEO', words: ['Fiyatları', 'Hizmet Kapsamı', 'Teklif Kalemleri'] },
  faq: { lead: 'SEO Hizmeti', words: ['Sık Sorulanlar', 'Ölçüm Soruları', 'Teklif Soruları'] },
};

// Hero CTAs from the Codex packs: primary → SEO enquiry, secondary → the page's key section.
const PRIMARY: Record<SeoTurkishPageKind, string> = { overview: 'Sitem İçin SEO Planı Al', features: 'Sitem İçin SEO Kapsamı Belirle', technologies: 'Sitem İçin SEO Planı Al', process: 'Sitem İçin SEO Planı Al', portfolio: 'Sitem İçin SEO Planı Al', pricing: 'Sitem İçin SEO Teklifi Al', faq: 'Sitem İçin SEO Planı Al', blog: 'Sitem İçin SEO Planı Al' };
const SECONDARY: Record<SubPage, [string, string]> = {
  features: ['Teslimatları İncele', '#seo-teslimatlari'], technologies: ['Ölçüm Araçlarını İncele', '#seo-olcum-araclari'], process: ['Çalışma Adımlarını İncele', '#seo-calisma-adimlari'],
  portfolio: ['Proje Örneklerini İncele', '#seo-proje-ornekleri'], pricing: ['Fiyatı Etkileyen Kalemleri İncele', '#seo-fiyat-kalemleri'], faq: ['Sorulara Göz At', ''],
};
// Closing band secondary link (Codex packs: Süreç or Fiyatlandırma).
const CLOSING_LINK: Record<SeoContentPage, [string, string]> = {
  overview: ['SEO Sürecini İncele', `${base}/surec`], features: ['SEO Sürecini İncele', `${base}/surec`], technologies: ['SEO Sürecini İncele', `${base}/surec`],
  process: ['SEO Fiyatlandırmasını İncele', `${base}/fiyatlandirma`], portfolio: ['SEO Sürecini İncele', `${base}/surec`], pricing: ['SEO Sürecini İncele', `${base}/surec`], faq: ['SEO Fiyatlandırmasını İncele', `${base}/fiyatlandirma`],
};

/* -------------------------------------------------------------- jump + CTA */

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

/** Closing copy without the inline "inceleyin" link sentence (it becomes the secondary button). */
const closingText = (intro: string) => intro.replace(/\s*[^.!?]*\[[^\]]+\]\([^)]*\)[^.!?]*[.!?]?/g, '').replace(/\*\*/g, '').trim();

function ClosingCta({ page, closing }: { page: SeoContentPage; closing?: Chunk }) {
  const title = closing?.title ?? 'Siteniz için ilk SEO adımını belirleyelim';
  const text = closing ? closingText(closing.intro) : 'Site adresinizi ve öne çıkarmak istediğiniz bir sayfayı paylaşın. İlk görüşmede hangi çalışmanın ihtiyacınıza uygun olduğunu birlikte değerlendirelim.';
  const [linkLabel, linkHref] = CLOSING_LINK[page];
  return (
    <section data-custom-ecom-reveal className="bg-gray-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16">
        <span aria-hidden="true" className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg"><MagnifyingGlassIcon className="h-8 w-8 text-heritage-turquoise-deep" /></span>
        <h2 className="text-headline font-medium">{trTitleCase(title)}</h2>
        <p className="mt-4 text-body leading-relaxed text-gray-300">{text}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={enquiry} className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep ${focus}`}>{PRIMARY[page]}<ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" /></Link>
          <Link href={linkHref} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 ${focus}`}>{linkLabel}</Link>
        </div>
      </div>
    </section>
  );
}

const configFor = (closing?: Chunk): ServiceMdConfig<SeoContentPage> => ({
  enquiry,
  visual: (page, title) => matchPrefix(VISUALS[page], title),
  card: (page) => page === 'portfolio' ? { badge: 'Temsili senaryo' } : undefined,
  jumpLabel: (title) => matchPrefix(JUMP_LABELS, title) ?? title.replace(/[?:].*$/, ''),
  jumpMark: <MagnifyingGlassIcon className="h-3.5 w-3.5 text-heritage-turquoise-deep" />,
  sectionId: (page, title) => SECTION_IDS[`${page}:${title}`],
  footer: (page, tone) => <><PlatformPageLinks platform="seo" current={page} tone={tone} /><ClosingCta page={page} closing={closing} /></>,
});

/* -------------------------------------------------------------------- pages */

const iconChip = <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/5"><MagnifyingGlassIcon className="h-5 w-5 text-heritage-turquoise-deep" aria-hidden="true" /></span>;
const crumbs = (label?: string) => [{ label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler', href: '/hizmetler' }, { label: 'SEO Hizmeti', href: base }, ...(label ? [{ label }] : [])];
const primaryClass = `inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise ${focus}`;
const secondaryClass = `inline-flex min-h-11 items-center justify-center rounded-sm border border-heritage-sand bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-heritage-turquoise ${focus}`;

/** Overview body (the hero stays in ServiceDetailClient). */
export function SeoTurkishOverviewBody() {
  const { sections, closing } = readPage('overview');
  return <><CustomEcommerceMotionScope /><ServiceMdBody page="overview" chunks={sections} config={configFor(closing)} /></>;
}

function BlogListing() {
  const meta = metadata.blog;
  const cards = getSeoGuides().map((guide) => ({ slug: guide.slug, href: `${base}/blog/${guide.slug}`, title: guide.title, category: guide.categoryLabel, excerpt: guide.excerpt, image: guide.featuredImage, imageAlt: guide.imageAlt, publishedAt: guide.datePublished }));
  return <main className="min-h-screen bg-white">
    <CustomEcommerceMotionScope />
    <InternalPageHero serviceName="SEO Hizmeti" accentWord={meta.heading} eyebrowNormalCase eyebrowIcon={iconChip} heading={meta.heading} rotating={{ lead: 'İşletmeler İçin', words: ['SEO Rehberleri', 'SEO Nedir?', 'Ajans Seçimi'] }} subtitle={meta.intro} crumbs={crumbs('Rehberler')}
      actions={<><a href="#seo-rehberleri" className={primaryClass}>Rehberleri İncele</a><Link href={enquiry} className={secondaryClass}>{PRIMARY.blog}</Link></>}
      scene={<SeoHeroScene><BlogFeedScene showPublicationMeta={false} /></SeoHeroScene>} />
    <section id="seo-rehberleri" className="bg-background-gray scroll-mt-[calc(var(--navbar-h,88px)+1rem)]"><div className="mx-auto max-w-[1200px] px-4 sm:px-6 cw-section">
      <h2 className="reveal max-w-4xl text-headline font-medium leading-tight text-gray-900">{trTitleCase('SEO çalışmasına nereden başlayacağınızı belirleyin')}</h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">SEO’nun temel çalışma biçimini ve ajans tekliflerini değerlendirme yöntemlerini anlatan rehberler.</p>
      <div className="mt-7"><ServiceGuideCards cards={cards} /></div>
      <aside className="mt-9 flex flex-col gap-4 rounded-2xl border border-heritage-sand bg-heritage-ivory p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><h2 className="text-lg font-semibold text-gray-950">Rehberleri kendi sitenize uygulayalım</h2><p className="mt-1 text-sm leading-6 text-gray-700">Site adresinizi ve öne çıkarmak istediğiniz bir sayfayı paylaşın.</p></div><Link href={enquiry} className={`${primaryClass} self-start sm:self-auto`}>{PRIMARY.blog}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></aside>
    </div></section>
    <PlatformPageLinks platform="seo" current="blog" tone="white" />
  </main>;
}

export default function SeoTurkishPage({ page }: { page: Exclude<SeoTurkishPageKind, 'overview'> }) {
  if (page === 'blog') return <BlogListing />;
  const copy = metadata[page];
  const { sections, closing } = readPage(page);
  const faqs = page === 'faq' ? serviceFaqItems(sections) : [];
  const [secondaryLabel, secondaryHref] = SECONDARY[page];
  const target = secondaryHref || (sections[0] ? `#${SECTION_IDS[`${page}:${sections[0].title}`] ?? sectionId(sections[0].title)}` : '#');
  return <main className="min-h-screen bg-white">
    <CustomEcommerceMotionScope />
    {faqs.length > 0 && <FAQJsonLd faqs={faqs} />}
    <InternalPageHero
      eyebrowNormalCase
      eyebrowIcon={iconChip}
      serviceName="SEO Hizmeti"
      accentWord={copy.heading}
      heading={copy.heading}
      rotating={ROTATING[page]}
      subtitle={copy.intro}
      scene={<SeoHeroScene>{HERO_ART[page]()}</SeoHeroScene>}
      crumbs={crumbs(copy.heading)}
      actions={<><Link href={enquiry} className={primaryClass}>{PRIMARY[page]}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link><a href={target} className={secondaryClass}>{secondaryLabel}</a></>}
    />
    <ServiceMdBody page={page} chunks={sections} config={configFor(closing)} jumpTitle={page === 'faq' ? 'raw' : undefined} />
  </main>;
}
