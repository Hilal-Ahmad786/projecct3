import type { ReactNode } from 'react';
import Link from '@/components/IntentLink';
import { ArrowRightIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import ServiceGuideCards from '@/components/services/ServiceGuideCards';
import IkasVisual from '@/components/ikas/visuals/IkasVisual';
import type { IkasVisualName } from '@/components/ikas/visuals/generated';
import CustomEcomArtwork from '@/components/custom-ecommerce/visuals/CustomEcomArtwork';
import type { CustomEcomVisualName } from '@/components/custom-ecommerce/visuals/generated';
import { FAQJsonLd } from '@/components/seo/JsonLd';
import { trTitleCase } from '@/lib/tr-title-case';
import { BlogFeedScene, FaqScene } from '@/components/services/hero-visuals/scenes-internal';
import { getMarketplaceGuides } from '@/components/services/service-blogs/marketplace';
import {
  CommissionLedgerScene, MarketplaceHeroScene, OrderSplitScene, ProductApprovalScene, RolesScene,
  ScenarioStackScene, SellerPanelScene, SellerScopeScene,
} from '@/components/marketplace/MarketplaceScenes';
import CustomEcommerceMotionScope from './CustomEcommerceMotionScope';
import { sectionId } from './PageJumpNav';
import PlatformPageLinks from './PlatformPageLinks';
import { ServiceMdBody, matchPrefix, readServiceChunks, serviceFaqItems, type SectionVisual, type ServiceMdConfig } from './ServiceMarkdownPage';

// Turkish pazaryeri (multi-vendor marketplace) service at
// /tr/hizmetler/marketplace-development. Copy lives in content/marketplace/tr
// (from the Codex packs in Keywords/E-ticaret/Pazaryeri) and renders through
// ServiceMarkdownPage like the custom e-commerce pages; visuals are the
// marketplace HTML scenes plus shared ikas / custom e-commerce artwork.

export type MarketplacePage = 'overview' | 'features' | 'technologies' | 'process' | 'portfolio' | 'pricing' | 'faq' | 'blog';
type SubPage = Exclude<MarketplacePage, 'overview' | 'blog'>;
export const MARKETPLACE_BASE = '/tr/hizmetler/marketplace-development';
const base = MARKETPLACE_BASE;
const enquiry = '/tr/start-project?service=marketplace-development';
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';

const metas: Record<MarketplacePage, { title: string; description: string; heading: string; intro: string }> = {
  overview: { title: 'Pazaryeri Yazılımı ve Çok Satıcılı Platform | PakSoft', description: 'Kendi çok satıcılı pazaryerinizi kurun. Satıcı paneli, ürün onayı, sipariş dağıtımı, komisyon ve iade akışlarını projenize göre planlayın.', heading: 'Çok Satıcılı Pazaryeri Yazılımı Geliştirme', intro: 'Kendi markanız altında farklı satıcıların ürün listeleyebildiği ve müşterilerin alışveriş yapabildiği bir pazaryeri kurun. Satıcı başvurusundan siparişin teslimine kadar platformunuzun nasıl çalışacağını; ürün onayı, komisyon, satıcıya yapılacak ödemeler ve iadeler için kuralları proje kapsamınıza göre birlikte planlayalım.' },
  features: { title: 'Pazaryeri Yazılımı Özellikleri ve Satıcı Paneli | PakSoft', description: 'Çok satıcılı pazaryerlerinde satıcı paneli, ürün onayı, sipariş dağıtımı, komisyon, hakediş ve iade özelliklerini inceleyin.', heading: 'Pazaryeri Yazılımı Özellikleri', intro: 'Satıcılarınız ürünlerini ve siparişlerini kendi panellerinden yönetirken platform ekibiniz ürün onayı, komisyon ve iade kurallarını belirler. Her rolün hangi bilgilere erişeceğini ve günlük işlemlerin nasıl ilerleyeceğini projenize göre planlayın.' },
  technologies: { title: 'Pazaryeri Altyapısı ve Entegrasyonlar | PakSoft', description: 'Çok satıcılı pazaryeri altyapısında satıcı verilerinin ayrımını, sipariş mimarisini, ödeme ve kargo entegrasyonlarını inceleyin.', heading: 'Çok Satıcılı Pazaryeri Altyapısı ve Entegrasyonları', intro: 'Pazaryeri altyapısı, her satıcının kendi ürün ve siparişlerini yönetmesini, platform ekibinin ise satışları merkezi olarak takip etmesini sağlar. Sipariş, ödeme, stok ve kargo bilgilerinin hangi sistemlerde tutulacağını ve nasıl bağlanacağını planlayın.' },
  process: { title: 'Pazaryeri Geliştirme Süreci ve Yayına Geçiş | PakSoft', description: 'Çok satıcılı pazaryeri projenizin kapsamını belirleyin. Satıcı ve sipariş akışlarının tasarımından kabul testlerine ve pilot yayına kadar adımları inceleyin.', heading: 'Pazaryeri Geliştirme Süreci', intro: 'Projeye ilk satıcı grubunu, satış modelini ve örnek bir siparişi belirleyerek başlayın. Siparişi satıcı başvurusundan kısmi iadeye kadar adım adım ele alarak ilk sürüm için gereken ekranları, kuralları ve bağlantıları netleştirin.' },
  portfolio: { title: 'Çok Satıcılı Pazaryeri Proje Örnekleri | PakSoft', description: 'Üretici ağları, sektör platformları ve kurumsal tedarik için çok satıcılı pazaryeri senaryolarını ve proje kapsamlarını inceleyin.', heading: 'Çok Satıcılı Pazaryeri Proje Örnekleri', intro: 'Bir üretici ağının, sektör platformunun veya kurumsal tedarik ekibinin pazaryerinden beklentisi farklıdır. Temsili senaryolar; satıcı katılımı, katalog yönetimi ve sipariş kurallarının ilk sürüm kapsamını nasıl şekillendirdiğini gösterir.' },
  pricing: { title: 'Pazaryeri Yazılımı Fiyatları ve Kurulum Maliyeti | PakSoft', description: 'Çok satıcılı pazaryeri kurma maliyetini etkileyen satıcı paneli, komisyon, iade ve entegrasyon kapsamını inceleyin. Projenize özel teklif alın.', heading: 'Pazaryeri Yazılımı Fiyatları Nasıl Belirlenir?', intro: 'Çok satıcılı bir pazaryeri kurmanın maliyeti; alıcı ve satıcı ekranlarına, komisyon ve iade kurallarına, sistem bağlantılarına ve yayın sonrası ihtiyaçlara göre değişir. Geliştirme bedelini, sağlayıcı ücretlerini ve işletme giderlerini ayrı ayrı değerlendirin.' },
  faq: { title: 'Pazaryeri Yazılımı Sık Sorulan Sorular | PakSoft', description: 'Çok satıcılı pazaryeri kurulumu, satıcı paneli, komisyon, hakediş, kısmi iade ve proje kapsamı hakkında sık sorulan soruları inceleyin.', heading: 'Pazaryeri Yazılımı Hakkında Sık Sorulan Sorular', intro: 'Kendi çok satıcılı platformunuzu kurmayı planlıyorsanız satıcıların nasıl katılacağını, siparişlerin nasıl dağıtılacağını ve iade durumunda hangi kayıtların güncelleneceğini bu sayfadan inceleyin.' },
  blog: { title: 'Pazaryeri Geliştirme Rehberleri | PakSoft', description: 'Çok satıcılı platform kurmadan önce satış modelinizi seçin. Komisyon, hakediş ve kısmi iade kurallarını örnek siparişle inceleyin.', heading: 'Pazaryeri Geliştirme Rehberleri', intro: 'Kendi pazaryerinizi kurarken önce satış modelinizi seçin, ardından bir siparişin alıcı, satıcı ve yönetici ekranlarında nasıl ilerleyeceğini belirleyin. Bu rehberler, ilk sürümden önce netleştirmeniz gereken kararları örneklerle gösterir.' },
};

export function getMarketplaceMeta(page: MarketplacePage) { return { ...metas[page], h1: metas[page].heading }; }

const readChunks = (page: Exclude<MarketplacePage, 'blog'>) => readServiceChunks('content/marketplace/tr', page);

/* ----------------------------------------------------------------- visuals */

const markTile = (label: string) => <><span className="flex h-[18px] w-[18px] items-center justify-center rounded bg-heritage-turquoise-deep text-white"><BuildingStorefrontIcon className="h-3 w-3" /></span>{label}</>;
const aside = (node: ReactNode): SectionVisual => ({ place: 'aside', node });
const ikas = (name: IkasVisualName, opts: { label?: string; mark?: string; slotLabels?: Record<string, string>; loop?: boolean; className?: string } = {}) =>
  <IkasVisual name={name} loop={opts.loop} label={opts.label} slotLabels={opts.slotLabels} mark={opts.mark ? markTile(opts.mark) : undefined} className={opts.className ?? 'mx-auto w-full max-w-xl'} />;
const custom = (name: CustomEcomVisualName, label: string, slotLabels: Record<string, string>, className = 'mx-auto w-full max-w-xl') =>
  <CustomEcomArtwork name={name} loop label={label} slotLabels={slotLabels} className={className} storeLabel="Pazaryeriniz" />;

const ART = {
  release: (className?: string) => custom('release-scope', 'Temsili ilk sürüm planı: satıcı başvurusu, ürün onayı, sipariş ve iade ilk sürümde; gelişmiş raporlar ve ek kargo bağlantıları sonraki aşamada', { 'slot-release-label': 'İlk sürüm', 'slot-later-label': 'Sonraki aşama' }, className),
  quote: (className?: string) => custom('quote-builder', 'Temsili teklif yapısı: ekran, iş kuralı, entegrasyon ve test işleri teklifi oluşturuyor; barındırma ve sağlayıcı giderleri ayrı tutuluyor', { 'slot-quote-label': 'Proje teklifi', 'slot-external-label': 'Dış giderler' }, className),
  hub: (className?: string) => ikas('integration-hub', { loop: true, mark: 'Pazaryeriniz', slotLabels: { 'slot-payment': 'Ödeme', 'slot-cargo': 'Kargo', 'slot-erp': 'Stok / ERP', 'slot-marketplace': 'Muhasebe' }, label: 'Temsili bağlantılar: pazaryeri ödeme, kargo, stok ve muhasebe sistemlerine bağlanıyor', className }),
  brief: () => ikas('project-brief'),
};

// Section → visual (matched on the start of the H2); no visual repeats its page hero.
const VISUALS: Partial<Record<Exclude<MarketplacePage, 'blog'>, [string, SectionVisual][]>> = {
  overview: [
    ['Alıcı, satıcı ve yönetici', aside(<RolesScene className="mx-auto max-w-xl" />)],
    ['İki satıcılı bir sipariş', aside(<CommissionLedgerScene className="mx-auto max-w-xl" />)],
    ['Online pazaryeri kurmak', aside(ART.release())],
    ['Pazaryeri geliştirme projesi', { place: 'below', node: ikas('process-rail', { className: 'mt-8 hidden lg:block', slotLabels: { 'slot-step-1': 'Satış modeli', 'slot-step-2': 'Akış tasarımı', 'slot-step-3': 'Geliştirme', 'slot-step-4': 'Kabul testi', 'slot-step-5': 'Pilot yayın' } }) }],
    ['Pazaryeri yazılımı fiyatı', aside(ART.quote())],
  ],
  features: [
    ['Ürün kataloğu', aside(<ProductApprovalScene className="mx-auto max-w-xl" />)],
    ['Sepet, sipariş', aside(<OrderSplitScene className="mx-auto max-w-xl" />)],
    ['Komisyon yönetimi', aside(<CommissionLedgerScene className="mx-auto max-w-xl" />)],
    ['İlk sürümünüzde', aside(ART.release())],
  ],
  technologies: [
    ['Satıcı verileri', aside(<SellerScopeScene className="mx-auto max-w-xl" />)],
    ['Tek alışveriş', aside(<OrderSplitScene className="mx-auto max-w-xl" />)],
    ['Ödeme, komisyon', aside(<CommissionLedgerScene className="mx-auto max-w-xl" />)],
    ['Kargo, stok', aside(custom('source-of-truth', 'Temsili veri kaynağı: stok ve fiyat işletme yazılımından pazaryerine, siparişler pazaryerinden işletme yazılımına aktarılıyor; ürün kodları eşleşiyor', { 'slot-system-label': 'İşletme yazılımı' }))],
    ['Entegrasyon kesintileri', aside(custom('retry-flow', 'Temsili bağlantı hatası: ilk deneme başarısız oluyor ve kayda geçiyor, yeniden deneme başarılı oluyor; tekrar gelen bildirim ikinci kayıt oluşturmuyor', { 'slot-service-label': 'Kargo servisi', 'slot-log-label': 'İşlem kaydı' }))],
  ],
  process: [
    ['Pazaryeri geliştirme süreci', { place: 'below', node: ikas('process-rail', { className: 'mt-8 hidden lg:block', slotLabels: { 'slot-step-1': 'Satış modeli', 'slot-step-2': 'Akış tasarımı', 'slot-step-3': 'Geliştirme', 'slot-step-4': 'Kabul testi', 'slot-step-5': 'Pilot yayın' } }) }],
    ['Kabul testinde', aside(custom('acceptance-tests', 'Temsili kabul testleri: iki satıcılı sipariş, ürün reddi, kısmi iade ve tekrar gelen bildirim senaryoları kontrol ediliyor; sonuçlar onaylanınca yayın kararı veriliyor', { 'slot-board-label': 'Kabul senaryoları' }))],
    ['İlk sürüm kapsamı değişirse', aside(custom('scope-change', 'Temsili kapsam değişikliği: yeni talebin ekran, yetki, test ve takvime etkisi değerlendiriliyor; talep ilk sürüme veya sonraki aşamaya alınıyor', { 'slot-impact-label': 'Etki değerlendirmesi', 'slot-now-label': 'İlk sürüm', 'slot-later-label': 'Sonraki aşama' }))],
    ['İlk görüşmeye', aside(ART.brief())],
  ],
  portfolio: [['Kendi pazaryeri projenizi', aside(ART.brief())]],
  pricing: [
    ['Pazaryeri kurma maliyeti', aside(ikas('cost-split', { label: 'Temsili gider grupları: geliştirme, sağlayıcı hizmetleri ve yayın sonrası işletme giderleri' }))],
    ['İlk sürüm kapsamı nasıl', aside(ART.release())],
    ['Teklif almak için', aside(ART.brief())],
  ],
};

/* -------------------------------------------------------------- jump + CTA */

const JUMP_LABELS: [string, string][] = [
  ['Pazaryeri yazılımı kimler', 'Kimler için?'], ['Pazaryeri entegrasyonu mu', 'Doğru model'], ['Alıcı, satıcı ve yönetici', 'Roller'], ['İki satıcılı bir sipariş', 'Örnek sipariş'],
  ['Online pazaryeri kurmak', 'İlk sürüm'], ['Pazaryeri geliştirme projesi', 'Süreç'], ['Pazaryeri yazılımı fiyatı', 'Fiyat'], ['Sık sorulan', 'SSS'],
  ['Satıcı paneli', 'Satıcı paneli'], ['Ürün kataloğu', 'Ürün onayı'], ['Sepet, sipariş', 'Sipariş ve gönderi'], ['Komisyon yönetimi', 'Komisyon ve iade'], ['İlk sürümünüzde', 'İlk sürüm'],
  ['Satıcı verileri', 'Veri yetkileri'], ['Tek alışveriş', 'Sipariş kalemleri'], ['Ödeme, komisyon', 'Ödeme ve mutabakat'], ['Kargo, stok', 'Entegrasyonlar'], ['Entegrasyon kesintileri', 'Kesintiler'], ['Altyapı seçimini', 'Altyapı seçimi'],
  ['Pazaryeri geliştirme süreci', 'Beş adım'], ['Kabul testinde', 'Kabul testleri'], ['İlk sürüm kapsamı değişirse', 'Kapsam değişikliği'], ['İlk görüşmeye', 'Hazırlık'],
  ['Üç farklı pazaryeri', 'Senaryolar'], ['Kendi pazaryeri projenizi', 'Projenizi anlatın'],
  ['Pazaryeri kurma maliyeti', 'Maliyet kalemleri'], ['Geliştirme bedelini', 'Bedeli etkileyenler'], ['İlk sürüm kapsamı nasıl', 'Örnek kapsamlar'], ['Teklif almak için', 'Teklif hazırlığı'],
];
const jumpLabel = (title: string) => matchPrefix(JUMP_LABELS, title) ?? title.replace(/[?:].*$/, '');

function ClosingCta({ page }: { page: Exclude<MarketplacePage, 'blog'> }) {
  const title = page === 'pricing' ? 'Pazaryeri projeniz için teklif alın' : page === 'faq' ? 'Pazaryeri projenizi birlikte değerlendirelim' : 'Pazaryerinizin ilk sürümünü birlikte planlayalım';
  return (
    <section data-custom-ecom-reveal className="bg-gray-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16">
        <span aria-hidden="true" className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg"><BuildingStorefrontIcon className="h-8 w-8 text-heritage-turquoise-deep" /></span>
        <h2 className="text-headline font-medium">{trTitleCase(title)}</h2>
        <p className="mt-4 text-body leading-relaxed text-gray-300">İlk satıcı grubunuzu, satışa açacağınız ürünleri ve örnek bir siparişin nasıl ilerlemesini istediğinizi paylaşın. İlk sürümün ekranlarını ve iş kurallarını birlikte belirleyelim.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={enquiry} className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep ${focus}`}>Pazaryeri Projenizi Anlatın<ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" /></Link>
          <Link href={page === 'process' ? `${base}/fiyatlandirma` : `${base}/surec`} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 ${focus}`}>{page === 'process' ? 'Fiyatlandırmayı İnceleyin' : 'Geliştirme Sürecini İnceleyin'}</Link>
        </div>
      </div>
    </section>
  );
}

const config: ServiceMdConfig<Exclude<MarketplacePage, 'blog'>> = {
  enquiry,
  visual: (page, title) => matchPrefix(VISUALS[page], title),
  card: (page) => page === 'portfolio' ? { badge: 'Temsili senaryo' } : undefined,
  jumpLabel,
  jumpMark: <BuildingStorefrontIcon className="h-3.5 w-3.5 text-heritage-turquoise-deep" />,
  footer: (page, tone) => <><PlatformPageLinks platform="marketplace" current={page} tone={tone} /><ClosingCta page={page} /></>,
};

/* -------------------------------------------------------------------- hero */

const iconChip = <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/5"><BuildingStorefrontIcon className="h-5 w-5 text-heritage-turquoise-deep" aria-hidden="true" /></span>;
const crumbs = (label: string) => [{ label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler', href: '/hizmetler' }, { label: 'Pazaryeri Geliştirme', href: base }, { label }];

/** Overview hero art (rendered inside ServiceDetailClient). */
export const MARKETPLACE_HERO_ART = <MarketplaceHeroScene><OrderSplitScene className="w-[20rem] max-w-full sm:w-[26rem] md:w-[30rem]" /></MarketplaceHeroScene>;

// Each subpage hero has its own scene (no visual repeats further down the same page).
const HERO_ART: Record<SubPage, () => ReactNode> = {
  features: () => <SellerPanelScene />,
  technologies: () => ART.hub('w-full'),
  process: () => ART.release('w-full'),
  portfolio: () => <ScenarioStackScene />,
  pricing: () => ART.quote('w-full'),
  faq: () => <FaqScene />,
};

const ROTATING: Record<SubPage, { lead: string; words: string[] }> = {
  features: { lead: 'Pazaryeri Yazılımı', words: ['Özellikleri', 'Satıcı Paneli', 'Komisyon Yönetimi'] },
  technologies: { lead: 'Pazaryeri', words: ['Altyapısı', 'Entegrasyonları', 'Veri Yetkileri'] },
  process: { lead: 'Pazaryeri', words: ['Geliştirme Süreci', 'Kabul Testleri', 'Pilot Yayın'] },
  portfolio: { lead: 'Pazaryeri', words: ['Proje Örnekleri', 'Senaryoları', 'Proje Kapsamları'] },
  pricing: { lead: 'Pazaryeri Yazılımı', words: ['Fiyatları', 'Kurulum Maliyeti', 'Teklif Kapsamı'] },
  faq: { lead: 'Pazaryeri Yazılımı', words: ['Sık Sorulanlar', 'Satıcı Soruları', 'Proje Soruları'] },
};

const PRIMARY: Record<SubPage, string> = { features: 'Pazaryeri Özelliklerimi Planla', technologies: 'Teknik İhtiyaçlarımı Paylaş', process: 'Pazaryeri Projemi Planla', portfolio: 'Pazaryeri Projemi Anlat', pricing: 'Pazaryeri Projem İçin Teklif Al', faq: 'Pazaryeri Projemi Anlat' };
const SECONDARY: Record<SubPage, [string, string]> = { features: ['Satıcı Panelini İncele', 'Satıcı paneli'], technologies: ['Entegrasyonları İncele', 'Kargo, stok'], process: ['Geliştirme Adımlarını İncele', ''], portfolio: ['Örnek Senaryoları İncele', ''], pricing: ['Maliyet Kalemlerini İncele', ''], faq: ['Sorulara Göz At', ''] };

/** Overview body (the hero stays in ServiceDetailClient). */
export function MarketplaceOverviewBody() {
  const chunks = readChunks('overview');
  return <><CustomEcommerceMotionScope /><FAQJsonLd faqs={serviceFaqItems(chunks)} /><ServiceMdBody page="overview" chunks={chunks} config={config} /></>;
}

function BlogListing() {
  const meta = metas.blog;
  const cards = getMarketplaceGuides().map((guide) => ({ slug: guide.slug, href: `${base}/blog/${guide.slug}`, title: guide.title, category: guide.categoryLabel, excerpt: guide.excerpt, image: guide.featuredImage, imageAlt: guide.imageAlt, publishedAt: guide.datePublished }));
  return <main className="min-h-screen bg-white">
    <CustomEcommerceMotionScope />
    <InternalPageHero serviceName="Pazaryeri Geliştirme" accentWord={meta.heading} eyebrowNormalCase eyebrowIcon={iconChip} heading={meta.heading} rotating={{ lead: 'Pazaryeri', words: ['Geliştirme Rehberleri', 'Satış Modeli', 'Komisyon ve İade'] }} subtitle={meta.intro} crumbs={crumbs('Rehberler')}
      actions={<><a href="#pazaryeri-rehberleri" className={`inline-flex min-h-11 items-center justify-center rounded-sm bg-heritage-turquoise-deep px-5 py-3 text-sm font-semibold text-white hover:bg-heritage-turquoise ${focus}`}>Rehberleri İncele</a><Link href={`${base}/surec`} className={`inline-flex min-h-11 items-center justify-center rounded-sm border border-heritage-sand bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-heritage-turquoise ${focus}`}>Geliştirme Sürecini İncele</Link></>}
      scene={<MarketplaceHeroScene><BlogFeedScene showPublicationMeta={false} /></MarketplaceHeroScene>} />
    <section id="pazaryeri-rehberleri" className="bg-background-gray scroll-mt-[calc(var(--navbar-h,88px)+1rem)]"><div className="mx-auto max-w-[1200px] px-4 sm:px-6 cw-section">
      <h2 className="reveal max-w-4xl text-headline font-medium leading-tight text-gray-900">{trTitleCase('Pazaryeri modelinizi ve sipariş kurallarınızı planlayın')}</h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Satış modeli seçimi ile komisyon, hakediş ve kısmi iade üzerine yayınlanan rehberler.</p>
      <div className="mt-7"><ServiceGuideCards cards={cards} /></div>
      <aside className="mt-9 flex flex-col gap-4 rounded-2xl border border-heritage-sand bg-heritage-ivory p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><h2 className="text-lg font-semibold text-gray-950">Rehberleri kendi projenize uygulayalım</h2><p className="mt-1 text-sm leading-6 text-gray-700">Satıcı yapınızı, örnek siparişinizi ve ilk sürüm beklentinizi paylaşın.</p></div><Link href={enquiry} className={`inline-flex min-h-11 items-center gap-2 self-start rounded-sm bg-heritage-turquoise-deep px-4 py-3 text-sm font-semibold text-white hover:bg-heritage-turquoise sm:self-auto ${focus}`}>Pazaryeri Modelimi Değerlendir<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></aside>
    </div></section>
    <PlatformPageLinks platform="marketplace" current="blog" tone="white" />
  </main>;
}

export default function MarketplaceTurkishPage({ page }: { page: Exclude<MarketplacePage, 'overview'> }) {
  if (page === 'blog') return <BlogListing />;
  const copy = metas[page];
  const chunks = readChunks(page);
  const [secondaryLabel, secondaryPrefix] = SECONDARY[page];
  const target = (secondaryPrefix && chunks.find((c) => c.title.toLocaleLowerCase('tr').startsWith(secondaryPrefix.toLocaleLowerCase('tr')))) || chunks[0];
  const faqs = page === 'faq' ? serviceFaqItems(chunks) : [];
  return <main className="min-h-screen bg-white">
    <CustomEcommerceMotionScope />
    {faqs.length > 0 && <FAQJsonLd faqs={faqs} />}
    <InternalPageHero
      eyebrowNormalCase
      eyebrowIcon={iconChip}
      serviceName="Pazaryeri Geliştirme"
      accentWord={copy.heading}
      heading={copy.heading}
      rotating={ROTATING[page]}
      subtitle={copy.intro}
      scene={<MarketplaceHeroScene>{HERO_ART[page]()}</MarketplaceHeroScene>}
      crumbs={crumbs(copy.heading)}
      actions={<><Link href={enquiry} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise ${focus}`}>{PRIMARY[page]}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link><a href={target ? `#${sectionId(target.title)}` : '#'} className={`inline-flex min-h-11 items-center justify-center rounded-sm border border-heritage-sand bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-heritage-turquoise ${focus}`}>{secondaryLabel}</a></>}
    />
    <ServiceMdBody page={page} chunks={chunks} config={config} jumpTitle={page === 'faq' ? 'raw' : undefined} />
  </main>;
}
