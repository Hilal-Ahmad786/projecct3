import Link from '@/components/IntentLink';
import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import ServiceGuideCards from '@/components/services/ServiceGuideCards';
import { FAQJsonLd } from '@/components/seo/JsonLd';
import { BlogFeedScene, FaqScene } from '@/components/services/hero-visuals/scenes-internal';
import { SectionHead, sectionId } from '@/components/e-commerce/PageJumpNav';
import { ServiceMdBody, readServiceChunks, serviceFaqItems, type ServiceMdConfig } from '@/components/e-commerce/ServiceMarkdownPage';
import { getSeoGuides } from '@/components/services/service-blogs/seo';

export type SeoTurkishPageKind = 'overview' | 'features' | 'technologies' | 'process' | 'portfolio' | 'pricing' | 'faq' | 'blog';
type SeoContentPage = Exclude<SeoTurkishPageKind, 'blog'>;
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
const readChunks = (page: SeoContentPage) => readServiceChunks('content/seo/tr', page);
const pageOrder: { key: SeoContentPage; label: string }[] = [
  { key: 'overview', label: 'Genel Bakış' }, { key: 'features', label: 'Özellikler' }, { key: 'technologies', label: 'Teknolojiler' },
  { key: 'process', label: 'Süreç' }, { key: 'portfolio', label: 'Portföy' }, { key: 'pricing', label: 'Fiyatlandırma' }, { key: 'faq', label: 'SSS' },
];
const enquiryLabels: Record<SeoTurkishPageKind, string> = {
  overview: 'Sitem İçin SEO Planı Al', features: 'Sitem İçin SEO Kapsamı Belirle', technologies: 'Sitem İçin SEO Planı Al',
  process: 'Sitem İçin SEO Planı Al', portfolio: 'Sitem İçin SEO Planı Al', pricing: 'Sitem İçin SEO Teklifi Al', faq: 'Sitem İçin SEO Planı Al', blog: 'Sitem İçin SEO Planı Al',
};

function SeoClosingCta({ page }: { page: SeoTurkishPageKind }) {
  return <section className="bg-gray-950 text-white"><div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16">
    <span aria-hidden="true" className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white"><MagnifyingGlassIcon className="h-8 w-8 text-heritage-turquoise-deep" /></span>
    <h2 className="text-headline font-medium">{page === 'pricing' ? 'Siteniz için SEO teklifi alın' : 'Siteniz için ilk SEO adımını belirleyelim'}</h2>
    <p className="mt-4 text-body leading-relaxed text-gray-300">Site adresinizi, öncelikli sayfanızı veya ürün kategorinizi ve organik aramadan beklediğiniz sonucu paylaşın. İlk görüşmede çalışma kapsamını ve sonraki adımları birlikte değerlendirelim.</p>
    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
      <Link href={enquiry} className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep motion-reduce:transition-none ${focus}`}>{enquiryLabels[page]}<ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" /></Link>
      <Link href={`${base}/fiyatlandirma`} className={`inline-flex min-h-11 items-center justify-center rounded-sm border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 ${focus}`}>SEO kapsamı ve fiyatlandırma</Link>
    </div>
  </div></section>;
}

function pagePath(key: SeoContentPage) {
  const suffix: Record<SeoContentPage, string> = { overview: '', features: '/ozellikler', technologies: '/teknoloji', process: '/surec', portfolio: '/portfoy', pricing: '/fiyatlandirma', faq: '/sss' };
  return `${base}${suffix[key]}`;
}

function PageLinks({ page }: { page: SeoTurkishPageKind }) {
  return <section className="border-y border-heritage-sand bg-white"><nav aria-label="SEO hizmeti sayfaları" className="mx-auto flex max-w-[1200px] flex-wrap gap-x-5 gap-y-2 px-4 py-5 sm:px-6">
    {pageOrder.filter(({ key }) => key !== page).map(({ key, label }) => <Link key={key} href={pagePath(key)} className={`inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focus}`}>{label}<ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" /></Link>)}
    <Link href="/tr/hizmetler/technical-seo" className={`inline-flex min-h-9 items-center text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focus}`}>Teknik SEO</Link>
    <Link href="/tr/hizmetler/ecommerce-seo" className={`inline-flex min-h-9 items-center text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focus}`}>E-Ticaret SEO</Link>
  </nav></section>;
}

const config: ServiceMdConfig<SeoContentPage> = {
  enquiry,
  jumpLabel: (title) => ({
    'Siteniz için doğru başlangıç noktası': 'Başlangıç noktası', 'SEO hizmeti neleri kapsar?': 'Hizmet kapsamı', 'Bir SEO ajansıyla çalışma nasıl ilerler?': 'Çalışma adımları',
    'İhtiyacınıza uygun SEO çalışmasını inceleyin': 'İlgili SEO hizmetleri', 'SEO çalışmasında hangi işler yapılır?': 'Yapılan işler', 'Proje kapsamında hangi çıktıları alabilirsiniz?': 'Teslimatlar',
    'Mağaza ve hizmet sitelerinde öncelikler nasıl değişir?': 'Site türleri', 'Hangi araç hangi soruya cevap verir?': 'Araçlar', 'Bir bulguyu nasıl doğrularız?': 'Doğrulama',
    'İlk görüşmeden performans takibine': 'Çalışma adımları', 'Her aşamada hangi karar alınır?': 'Karar noktaları', 'Üç farklı SEO senaryosu': 'Senaryolar',
    'SEO teklifini hangi işler etkiler?': 'Fiyat kalemleri', 'SEO paketlerini nasıl karşılaştırabilirsiniz?': 'Çalışma türleri', 'SEO teklifi almak için hangi bilgileri paylaşmalısınız?': 'Teklif hazırlığı',
    'Başlangıç ve kapsam': 'Başlangıç ve kapsam', 'Sonuçlar ve ölçüm': 'Sonuçlar ve ölçüm', 'Teklif ve hizmet seçimi': 'Teklif ve hizmet seçimi',
  }[title] ?? title.replace(/[?:].*$/, '')),
  jumpMark: <MagnifyingGlassIcon className="h-3.5 w-3.5 text-heritage-turquoise-deep" />,
  card: (page, index) => page === 'portfolio' ? { badge: 'Temsili senaryo', art: <span aria-hidden="true" className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-heritage-turquoise-light text-heritage-turquoise-deep"><MagnifyingGlassIcon className="h-5 w-5" /></span> } : undefined,
  sectionId: (page, title) => ({
    'overview:SEO hizmeti neleri kapsar?': 'seo-hizmeti-kapsami',
    'features:Proje kapsamında hangi çıktıları alabilirsiniz?': 'seo-teslimatlari',
    'technologies:Hangi araç hangi soruya cevap verir?': 'seo-olcum-araclari',
    'process:İlk görüşmeden performans takibine': 'seo-calisma-adimlari',
    'portfolio:Üç farklı SEO senaryosu': 'seo-proje-ornekleri',
    'pricing:SEO teklifini hangi işler etkiler?': 'seo-fiyat-kalemleri',
  } as Record<string, string>)[`${page}:${title}`],
  footer: (page) => <><PageLinks page={page} /><SeoClosingCta page={page} /></>,
};

function seoCrumbs(last: string) { return [
  { label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler', href: '/services' }, { label: 'SEO Hizmeti', href: base }, ...(last === 'SEO Hizmeti' ? [] : [{ label: last }]),
]; }

function Scene({ page }: { page: SeoTurkishPageKind }) {
  if (page === 'blog') return <BlogFeedScene showPublicationMeta={false} />;
  if (page === 'faq') return <FaqScene />;
  const labels = page === 'technologies' ? [['Sorgu', 'Search Console'], ['Sayfa', 'Tarama ve indeksleme'], ['İşlem', 'Form ölçümü']] : page === 'process' ? [['İncele', 'Önceliklendir'], ['Uygula', 'Doğrula'], ['Takip et', 'Sonraki adım']] : page === 'portfolio' ? [['Kurumsal site', 'Sayfa eşleştirme'], ['Mağaza', 'Kategori yapısı'], ['Yenileme', 'Yönlendirme']] : page === 'pricing' ? [['İnceleme', 'İçerik'], ['Uygulama', 'Ölçüm']] : [['Sorgular', 'Sayfalar'], ['Teknik yapı', 'İç bağlantılar'], ['Takip', 'İyileştirme']];
  return <div role="img" aria-label="SEO çalışma başlıklarını gösteren temsili görsel" className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 rounded-2xl border border-heritage-sand bg-heritage-ivory p-4 sm:p-5">
    {labels.map(([a,b],i)=><div key={a} className={`rounded-xl border bg-white p-3 shadow-sm ${i===0?'border-heritage-turquoise/50':'border-heritage-sand'}`}><span className="block h-1.5 w-10 rounded-full bg-heritage-turquoise/60" aria-hidden="true"/><strong className="mt-3 block text-sm text-gray-900">{a}</strong><span className="mt-1 block text-xs leading-5 text-gray-600">{b}</span></div>)}
  </div>;
}

function Hero({ page }: { page: SeoTurkishPageKind }) {
  const copy = metadata[page];
  const chunks = page === 'blog' ? [] : readChunks(page);
  const target = page === 'overview' ? '#seo-hizmeti-kapsami' : chunks[0] ? `#${sectionId(chunks[0].title)}` : '#seo-rehberleri';
  return <InternalPageHero serviceName="SEO Hizmeti" accentWord={copy.heading} heading={copy.heading} subtitle={copy.intro}
    crumbs={seoCrumbs(page === 'overview' ? 'SEO Hizmeti' : page === 'blog' ? 'Rehberler' : copy.heading)}
    scene={<Scene page={page} />}
    actions={<><Link href={enquiry} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise ${focus}`}>{enquiryLabels[page]}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link><a href={target} className={`inline-flex min-h-11 items-center justify-center rounded-sm border border-heritage-sand bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-heritage-turquoise ${focus}`}>{page === 'blog' ? 'Rehberleri İncele' : page === 'overview' ? 'Çalışma Kapsamını İncele' : 'İçeriği İncele'}</a></>} />;
}

function ContentBody({ page }: { page: SeoContentPage }) {
  const chunks = readChunks(page);
  const faq = page === 'faq' ? serviceFaqItems(chunks) : [];
  return <>
    {faq.length > 0 && <FAQJsonLd faqs={faq} />}
    <div className="seo-content-motion reveal-group"><ServiceMdBody page={page} chunks={chunks} config={config} jumpTitle={page === 'faq' ? 'raw' : undefined} /></div>
  </>;
}

function BlogListing() {
  const copy = metadata.blog;
  const cards = getSeoGuides().map((guide) => ({ slug: guide.slug, href: `${base}/blog/${guide.slug}`, title: guide.title, category: guide.categoryLabel, excerpt: guide.excerpt, image: guide.featuredImage, imageAlt: guide.imageAlt, publishedAt: guide.datePublished }));
  return <main className="min-h-screen bg-white"><Hero page="blog"/><section id="seo-rehberleri" className="scroll-mt-[calc(var(--navbar-h,88px)+1rem)] bg-background-gray"><div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 md:py-16"><SectionHead title="Yayınlanan SEO rehberleri" intro={<p>SEO’nun temel çalışma biçimini ve hizmet tekliflerini değerlendirme yöntemlerini anlatan iki rehber.</p>} /><div className="mt-7"><ServiceGuideCards cards={cards} reveal /></div></div></section><PageLinks page="blog"/><SeoClosingCta page="blog"/></main>;
}

export default function SeoTurkishPage({ page }: { page: Exclude<SeoTurkishPageKind, 'overview'> }) {
  if (page === 'blog') return <BlogListing />;
  return <main className="min-h-screen bg-white"><Hero page={page}/><ContentBody page={page}/></main>;
}

export function SeoTurkishOverviewBody() { return <ContentBody page="overview" />; }
