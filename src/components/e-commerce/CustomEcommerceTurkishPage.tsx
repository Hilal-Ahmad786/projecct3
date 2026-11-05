import type { ReactNode } from 'react';
import Link from '@/components/IntentLink';
import { ArrowRightIcon, CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import IkasVisual from '@/components/ikas/visuals/IkasVisual';
import type { IkasVisualName } from '@/components/ikas/visuals/generated';
import CustomEcomArtwork from '@/components/custom-ecommerce/visuals/CustomEcomArtwork';
import type { CustomEcomVisualName } from '@/components/custom-ecommerce/visuals/generated';
import { FAQJsonLd } from '@/components/seo/JsonLd';
import { trTitleCase } from '@/lib/tr-title-case';
import CustomEcommerceMotionScope from './CustomEcommerceMotionScope';
import Image from 'next/image';
import { FaqScene } from '@/components/services/hero-visuals/scenes-internal';
import { CustomEcommerceIcon } from './CustomEcommerceIcon';
import ShopLameesCase from './ShopLameesCase';
import { sectionId } from './PageJumpNav';
import { ServiceMdBody, matchPrefix, readServiceChunks, serviceFaqItems, type Chunk, type ServiceMdConfig } from './ServiceMarkdownPage';
import PlatformPageLinks from './PlatformPageLinks';

// Turkish custom e-commerce service (/tr/hizmetler/custom-ecommerce). Copy lives
// in content/custom-ecommerce/tr/*.md and is rendered by ServiceMarkdownPage;
// this file holds the page-specific parts (metadata, visuals, hero, closing).

export type CustomEcommercePage = 'overview' | 'features' | 'technologies' | 'process' | 'portfolio' | 'pricing' | 'faq';
export const CUSTOM_ECOM_BASE = '/tr/hizmetler/custom-ecommerce';
export const CUSTOM_ECOM_ENQUIRY = '/tr/start-project?service=custom-ecommerce';
const base = CUSTOM_ECOM_BASE;
const enquiry = CUSTOM_ECOM_ENQUIRY;
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';

const metadata: Record<CustomEcommercePage, { title: string; description: string; heading: string; intro: string }> = {
  overview: { title: 'Özel E-Ticaret Sitesi ve Yazılım Geliştirme | PakSoft', description: 'Ürün seçeneklerinize, fiyat kurallarınıza ve sipariş akışınıza uygun özel e-ticaret sitesi ve özel e-ticaret yazılımı geliştirin. Kapsamı PakSoft ile belirleyin.', heading: 'Özel E-Ticaret Sitesi ve Yazılım Geliştirme', intro: 'Ürün seçenekleriniz, fiyatlandırma kurallarınız veya sipariş süreciniz standart bir mağaza kurulumundan daha fazla esneklik gerektiriyorsa satış sitenizi bu ihtiyaçlara göre geliştiriyoruz. Müşterinizin gördüğü mağaza ile ekibinizin kullandığı yönetim ve sipariş akışını birlikte planlıyoruz.' },
  features: { title: 'E-Ticaret Sitesi Özellikleri ve Özel Modüller | PakSoft', description: 'Özel e-ticaret sitesinde ürün seçenekleri, fiyat kuralları, ödeme, sipariş ve yönetim panelinin işletmenize göre nasıl geliştirilebileceğini inceleyin.', heading: 'Özel E-Ticaret Sitesi Özellikleri', intro: 'Ürün seçenekleri, müşteriye göre fiyatlar, ödeme adımları ve sipariş yönetimi satış modelinize göre şekillenebilir. Mağaza ve ekip akışlarını birlikte tanımlayın.' },
  technologies: { title: 'Özel E-Ticaret Altyapısı ve Teknolojileri | PakSoft', description: 'Özel e-ticaret altyapısında mağaza arayüzü, fiyat kuralları, ödeme, stok ve sipariş entegrasyonları için teknik seçenekleri inceleyin.', heading: 'Özel E-Ticaret Altyapısı ve Teknolojileri', intro: 'Mağaza arayüzü, fiyat hesaplama, stok verisi ve sipariş yönetimi aynı satış akışının parçalarıdır. Hangi parçaların mevcut sisteminizde kalacağını, hangilerinin geliştirileceğini birlikte değerlendiriyoruz.' },
  process: { title: 'Özel E-Ticaret Geliştirme Süreci | PakSoft', description: 'Özel e-ticaret projenizin keşif, tasarım, geliştirme, test ve yayına geçiş adımlarını inceleyin. Her aşamada gereken hazırlıkları öğrenin.', heading: 'Özel E-Ticaret Geliştirme Süreci', intro: 'Gerçek bir sipariş örneğiyle başlıyor; ürün seçimi, fiyat hesabı ve siparişin ekibinize ulaşma biçimini belirliyoruz. Ardından ilk sürümün kapsamını ve test adımlarını planlıyoruz.' },
  portfolio: { title: 'Özel E-Ticaret Sitesi Örnekleri ve Projeler | PakSoft', description: 'Next.js ile geliştirdiğimiz Shop Lamees özel e-ticaret sitesini ve ölçüye göre satış, bayi fiyatı ve stok bağlantısı senaryolarını inceleyin.', heading: 'Özel E-Ticaret Sitesi Örnekleri ve Senaryolar', intro: 'Next.js ile geliştirdiğimiz Shop Lamees mağazasını inceleyin; ardından farklı ürün ve sipariş kurallarının proje kapsamına nasıl dönüşebileceğini temsili senaryolarla görün.' },
  pricing: { title: 'Özel E-Ticaret Sitesi Fiyatları ve Maliyetler | PakSoft', description: 'Özel e-ticaret sitesi fiyatlarını belirleyen tasarım, yazılım, veri taşıma ve entegrasyon işlerini inceleyin. Projenize özel teklif alın.', heading: 'Özel E-Ticaret Sitesi Fiyatları Nasıl Belirlenir?', intro: 'Özel e-ticaret sitesi fiyatı; hazırlanacak ekranlara, ürün ve fiyat kurallarına, veri taşıma ihtiyacına ve bağlanacak sistemlere göre belirlenir. Teklifte geliştirme işleri, üçüncü taraf giderleri ve yayın sonrası ihtiyaçlar ayrı değerlendirilir.' },
  faq: { title: 'Özel E-Ticaret Sitesi Sık Sorulan Sorular | PakSoft', description: 'Özel e-ticaret sitesi geliştirme, fiyatlandırma, ürün kuralları, ödeme, entegrasyon ve mağaza taşıma hakkında sık sorulan soruları inceleyin.', heading: 'Özel E-Ticaret Hakkında Sık Sorulan Sorular', intro: 'Özel e-ticaret projesine başlamadan önce kapsam, ürün kuralları, maliyet ve teslim süreciyle ilgili yanıtları inceleyin. Projeye özel teslimler ve ticari koşullar yazılı teklifte netleştirilir.' },
};

export function getCustomEcommerceMeta(page: CustomEcommercePage) { return metadata[page]; }

const readChunks = (page: CustomEcommercePage) => readServiceChunks('content/custom-ecommerce/tr', page);
const faqItems = serviceFaqItems;

/* ----------------------------------------------------------------- visuals */

const mark = (label: string) => <><span className="flex h-[18px] w-[18px] items-center justify-center rounded bg-heritage-turquoise-deep text-white"><CodeBracketSquareIcon className="h-3 w-3" /></span>{label}</>;
type VisualSpec =
  | { kind: 'ikas'; name: IkasVisualName; place: 'aside' | 'below'; loop?: boolean; label?: string; markLabel?: string; slotLabels?: Record<string, string> }
  | { kind: 'custom'; name: CustomEcomVisualName; place: 'aside' | 'below'; loop?: boolean; label?: string; slotLabels?: Record<string, string> };
const C = (name: CustomEcomVisualName, label: string, slotLabels?: Record<string, string>, place: VisualSpec['place'] = 'aside'): VisualSpec => ({ kind: 'custom', name, place, loop: true, label, slotLabels });
const I = (name: IkasVisualName, place: VisualSpec['place'], extra: { loop?: boolean; label?: string; markLabel?: string; slotLabels?: Record<string, string> } = {}): VisualSpec => ({ kind: 'ikas', name, place, ...extra });

// Dedicated custom e-commerce art (Codex set, ./custom-ecommerce/visuals) plus
// the shared ikas visuals where they still fit.
const ART = {
  measure: C('measure-pricing', 'Temsili ölçüye göre fiyat: genişlik, yükseklik ve malzeme seçimi fiyatı belirliyor; geçersiz seçenek engelleniyor ve seçimler üretim için sipariş kaydına aktarılıyor', { 'slot-order-label': 'Sipariş kaydı', 'slot-production-label': 'Üretim ekibi' }),
  dealer: C('dealer-pricing', 'Temsili bayi fiyatı: perakende ziyaretçi ve onaylı bayi aynı üründe farklı fiyat görüyor; bayi fiyatı sepete aynen yansıyor, minimum adet ve onay adımı uygulanıyor', { 'slot-retail-label': 'Perakende', 'slot-dealer-label': 'Bayi', 'slot-approval-label': 'Onay bekliyor' }),
  source: C('source-of-truth', 'Temsili veri kaynağı: stok ve fiyat işletme yazılımından mağazaya, siparişler mağazadan işletme yazılımına aktarılıyor; ürün kodları eşleşiyor', { 'slot-system-label': 'İşletme yazılımı' }),
  architecture: C('architecture-options', 'Temsili altyapı seçenekleri: mevcut platforma özel modül, ayrı mağaza arayüzü ve tamamen özel e-ticaret yazılımı', { 'slot-option-1': 'Özel modül', 'slot-option-2': 'Ayrı arayüz', 'slot-option-3': 'Özel yazılım' }, 'below'),
  release: C('release-scope', 'Temsili ilk sürüm planı: satış ve sipariş için gerekli işlevler ilk sürümde, ek raporlar ve yeni kanallar sonraki aşamada', { 'slot-release-label': 'İlk sürüm', 'slot-later-label': 'Sonraki aşama' }),
  roles: C('order-roles', 'Temsili sipariş akışı: sipariş onay, depo ve sevkiyat adımlarından geçiyor; iade işlemini yalnız yetkili rol başlatabiliyor', { 'slot-lane-1': 'Onay', 'slot-lane-2': 'Depo', 'slot-lane-3': 'Sevkiyat', 'slot-lane-4': 'İade' }),
  retry: C('retry-flow', 'Temsili bağlantı hatası: ilk deneme başarısız oluyor ve kayda geçiyor, yeniden deneme başarılı oluyor; tekrar gelen bildirim ikinci sipariş oluşturmuyor', { 'slot-service-label': 'Dış servis', 'slot-log-label': 'İşlem kaydı' }),
  consistency: C('price-consistency', 'Temsili fiyat tutarlılığı: aynı fiyat kuralı ürün sayfası, sepet ve sipariş özetinde aynı tutarı gösteriyor; sunucu siparişte fiyatı yeniden kontrol ediyor', { 'slot-rule-label': 'Fiyat kuralı' }),
  scopeChange: C('scope-change', 'Temsili kapsam değişikliği: yeni talebin ekran, yetki, test ve takvime etkisi değerlendiriliyor; talep ilk sürüme veya sonraki aşamaya alınıyor', { 'slot-impact-label': 'Etki değerlendirmesi', 'slot-now-label': 'İlk sürüm', 'slot-later-label': 'Sonraki aşama' }),
  acceptance: C('acceptance-tests', 'Temsili kabul testleri: normal sipariş ve hata senaryoları kontrol ediliyor, tüm sonuçlar onaylanınca yayın kararı veriliyor', { 'slot-board-label': 'Kabul senaryoları' }),
  quote: C('quote-builder', 'Temsili teklif yapısı: ekran, iş kuralı, entegrasyon ve test işleri teklifi oluşturuyor; barındırma, lisans ve sağlayıcı giderleri ayrı tutuluyor', { 'slot-quote-label': 'Proje teklifi', 'slot-external-label': 'Dış giderler' }),
};
const hubLabels = { 'slot-payment': 'Ödeme', 'slot-cargo': 'Kargo', 'slot-erp': 'Stok / ERP', 'slot-marketplace': 'Muhasebe' };

// Section → visual (matched on the start of the H2). Each visual appears once
// per service, heroes included (Portföy scenario cards excepted); sections
// without a good fit stay text-only.
const VISUALS: Partial<Record<CustomEcommercePage, [string, VisualSpec][]>> = {
  overview: [
    ['Özel geliştirme ne zaman', ART.architecture],
    ['Satış modelinize', { ...ART.measure, place: 'aside' }],
    ['Özel tasarım', I('variant-picker', 'aside', { loop: true, label: 'Temsili ürün sayfası: seçilen ölçü ve seçeneğe göre ürün görünümü değişiyor' })],
    ['Özel e-ticaret yazılımı', I('integration-hub', 'aside', { loop: true, markLabel: 'Mağazanız', slotLabels: hubLabels, label: 'Temsili akış: özel mağaza ödeme, kargo, stok ve muhasebe sistemlerine bağlanıyor' })],
    ['Proje nasıl', I('process-rail', 'below', { slotLabels: { 'slot-step-1': 'İhtiyaç', 'slot-step-2': 'Kapsam', 'slot-step-3': 'Geliştirme', 'slot-step-4': 'Test', 'slot-step-5': 'Yayın ve devir' } })],
  ],
  features: [
    ['Fiyatlandırma ve bayi', ART.consistency],
    ['Sipariş yönetimi', ART.roles],
  ],
  technologies: [
    ['Hangi altyapı', I('method-options', 'below', { loop: true, slotLabels: { 'slot-option-1': 'Hazır platform', 'slot-option-2': 'Özel modül', 'slot-option-3': 'Özel yazılım' } })],
    ['Müşteri arayüzü', I('editable-fields', 'aside', { loop: true, markLabel: 'Yönetim paneli', label: 'Temsili yönetim paneli: düzenlenen alan mağaza arayüzüne yansıyor' })],
    ['Ödeme, kargo', ART.retry],
  ],
  process: [
    ['Keşiften yayına', I('stage-path', 'below', { slotLabels: { 'slot-stage-1': 'Keşif', 'slot-stage-2': 'İlk sürüm', 'slot-stage-3': 'Tasarım', 'slot-stage-4': 'Geliştirme', 'slot-stage-5': 'Test', 'slot-stage-6': 'Yayın' } })],
    ['İlk sürümün kapsamı', ART.scopeChange],
    ['Mevcut mağaza taşınacaksa', I('migration-map', 'aside', { markLabel: 'Yeni mağaza', label: 'Temsili geçiş: eski mağazadaki kayıtlar yeni mağazaya aktarılıyor, eski adresler eşleştiriliyor' })],
    ['Örnek kabul', ART.acceptance],
    ['Yayın sonrası', I('handover-pack', 'aside')],
  ],
  pricing: [
    ['Geliştirme, dış hizmetler', I('cost-split', 'aside', { markLabel: 'Dış giderler', label: 'Temsili gider grupları: geliştirme, dış servisler ve yayın sonrası işler' })],
    ['Teklif almak için', I('project-brief', 'aside')],
  ],
};
// Portföy scenario cards (in order) each get their matching illustration.
const SCENARIO_ART: VisualSpec[] = [ART.measure, ART.dealer, ART.source];

function Visual({ spec, className }: { spec: VisualSpec; className?: string }) {
  const wide = spec.name === 'method-options' || spec.name === 'architecture-options';
  const cls = className ?? (spec.place === 'below' ? `mt-8 ${wide ? 'mx-auto max-w-4xl' : 'hidden lg:block'}` : 'mx-auto w-full max-w-xl');
  if (spec.kind === 'custom') return <CustomEcomArtwork name={spec.name} loop={spec.loop} label={spec.label} slotLabels={spec.slotLabels} className={cls} />;
  return <IkasVisual name={spec.name} loop={spec.loop} label={spec.label} slotLabels={spec.slotLabels} mark={spec.markLabel ? mark(spec.markLabel) : undefined} className={cls} />;
}

/* --------------------------------------------------------------- jump bar */

const JUMP_LABELS: [string, string][] = [
  ['Özel geliştirme ne zaman', 'Ne zaman gerekli?'], ['Satış modelinize', 'İş akışları'], ['Özel tasarım', 'Özel tasarım'], ['Özel e-ticaret yazılımı', 'Yazılım kapsamı'],
  ['İlk sürümde', 'İlk sürüm'], ['Proje nasıl', 'Süreç'], ['Özel e-ticaret sitesi fiyatı', 'Fiyat'], ['Sık sorulan', 'SSS'],
  ['İhtiyacınıza göre seçilebilen', 'Modüller'], ['Ürün kataloğu', 'Katalog'], ['Fiyatlandırma ve bayi', 'Fiyat ve bayi'], ['Sepet, ödeme', 'Sepet ve ödeme'],
  ['Sipariş yönetimi', 'Sipariş yönetimi'], ['Entegrasyonlar', 'Entegrasyonlar'], ['İlk sürüm için', 'İlk sürüm'],
  ['Hangi altyapı', 'Altyapı seçimi'], ['Müşteri arayüzü', 'Arayüz ve panel'], ['Fiyat ve sipariş kuralları', 'İş kuralları'], ['Verinin ana kaynağını', 'Veri kaynağı'],
  ['Ödeme, kargo', 'Bağlantılar'], ['Erişim, izleme', 'Bakım'], ['Performans', 'Performans ve SEO'], ['Teknik teslimatta', 'Teslimat'],
  ['İlk görüşmeye', 'Hazırlık'], ['Keşiften yayına', 'Altı adım'], ['İlk sürümün kapsamı', 'Kapsam değişikliği'], ['Mevcut mağaza', 'Mağaza taşıma'],
  ['Örnek kabul', 'Kabul testleri'], ['Yayın sonrası', 'Yayın sonrası'],
  ['İhtiyacınızı bir örnek', 'Senaryolar'], ['Özel e-ticaret örneğini', 'Değerlendirme'],
  ['Geliştirme, dış hizmetler', 'Maliyet kalemleri'], ['Proje bedelini', 'Bedeli etkileyenler'], ['Üç örnek teklif', 'Örnek kapsamlar'], ['Teklif almak için', 'Teklif hazırlığı'],
];
const jumpLabel = (title: string) => matchPrefix(JUMP_LABELS, title) ?? title.replace(/[?:].*$/, '');

/* ---------------------------------------------------------------- sections */

function ClosingCta({ page }: { page: CustomEcommercePage }) {
  const title = page === 'pricing' ? 'Özel e-ticaret projeniz için teklif alın' : page === 'faq' ? 'Mağazanız için kapsamı birlikte konuşalım' : 'Özel e-ticaret sitenizin ihtiyaçlarını birlikte planlayalım';
  return (
    <section data-custom-ecom-reveal className="bg-gray-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16">
        <span aria-hidden="true" className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg"><CodeBracketSquareIcon className="h-8 w-8 text-heritage-turquoise-deep" /></span>
        <h2 className="text-headline font-medium">{trTitleCase(title)}</h2>
        <p className="mt-4 text-body leading-relaxed text-gray-300">Örnek ürününüzü, satış kurallarınızı ve mevcut sistemlerinizi paylaşın. İlk sürüm için gerekli işleri ve sonraki adımları birlikte belirleyelim.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={enquiry} className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep ${focus}`}>Özel E-Ticaret Teklifi Al<ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" /></Link>
          <Link href={`${base}/surec`} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 ${focus}`}>Geliştirme Sürecini İnceleyin</Link>
        </div>
      </div>
    </section>
  );
}

// Where the real Shop Lamees case sits: after this H2 on the overview, first on Portföy.
const CASE_AFTER: Partial<Record<CustomEcommercePage, string | null>> = { overview: 'Özel tasarım', portfolio: null };

const config: ServiceMdConfig<CustomEcommercePage> = {
  enquiry,
  visual: (page, title) => { const spec = matchPrefix(VISUALS[page], title); return spec && { place: spec.place, node: <Visual spec={spec} /> }; },
  card: (page, i) => page === 'portfolio' ? { art: SCENARIO_ART[i] && <Visual spec={SCENARIO_ART[i]} className="-mx-1 mb-4 w-[calc(100%+0.5rem)] rounded-lg bg-heritage-ivory/60 p-2" />, badge: 'Temsili senaryo' } : undefined,
  jumpLabel,
  jumpMark: <CodeBracketSquareIcon className="h-3.5 w-3.5 text-heritage-turquoise-deep" />,
  insert: (page) => page in CASE_AFTER ? { after: CASE_AFTER[page] ?? null, node: <ShopLameesCase />, jump: { href: '#shop-lamees', label: 'Örnek proje' } } : undefined,
  footer: (page, tone) => <><PlatformPageLinks platform="custom" current={page} tone={tone} /><ClosingCta page={page} /></>,
};

function Body({ page, chunks }: { page: CustomEcommercePage; chunks: Chunk[] }) {
  return <ServiceMdBody page={page} chunks={chunks} config={config} jumpTitle={page === 'faq' ? 'raw' : undefined} />;
}

/* -------------------------------------------------------------------- hero */

/** Floating code tile over the hero art, like the ikas/Shopify logo tiles (loops via IkasMotionScope). */
export function CustomEcomHeroScene({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full max-w-xl">
      {children}
      <div aria-hidden="true" data-ikas-loop className="ikas-badge-float absolute -left-2 -top-14 z-20 rounded-[20px] bg-white p-3 shadow-[0_12px_30px_rgba(18,25,38,0.18)] ring-1 ring-black/5 sm:-left-6">
        <CodeBracketSquareIcon className="h-10 w-10 text-heritage-turquoise-deep sm:h-12 sm:w-12" />
      </div>
    </div>
  );
}

/** Portföy hero: the real Shop Lamees store, desktop plus phone frame. */
function ShopLameesHeroShot() {
  return (
    <div className="relative pb-10 pe-6">
      <div data-custom-ecom-reveal className="overflow-hidden rounded-xl border border-heritage-sand bg-white shadow-md">
        <Image src="/images/portfolio/shop-lamees/shop-lamees-ana-sayfa.webp" alt="Shop Lamees özel e-ticaret sitesinin ana sayfası" width={1440} height={900} sizes="(min-width: 1024px) 560px, 90vw" className="h-auto w-full" priority />
      </div>
      <div data-ikas-loop className="ikas-badge-float absolute -bottom-2 end-0 w-[30%] overflow-hidden rounded-2xl border-4 border-gray-900 bg-white shadow-lg">
        <Image src="/images/portfolio/shop-lamees/shop-lamees-mobil.webp" alt="Shop Lamees ürün sayfasının mobil görünümü" width={600} height={1080} sizes="170px" className="h-auto w-full" />
      </div>
      <span className="absolute bottom-0 start-0 inline-flex items-center gap-1.5 rounded-full border border-heritage-sand bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm"><span className="h-2 w-2 rounded-full bg-heritage-turquoise" aria-hidden="true" />shoplamees.com · canlı proje</span>
    </div>
  );
}

// Each subpage hero has its own scene (no visual repeats further down the same page).
const HERO_ART: Record<Exclude<CustomEcommercePage, 'overview'>, () => ReactNode> = {
  features: () => <Visual spec={ART.dealer} className="w-full" />,
  technologies: () => <Visual spec={ART.source} className="w-full" />,
  process: () => <Visual spec={ART.release} className="w-full" />,
  portfolio: () => <ShopLameesHeroShot />,
  pricing: () => <Visual spec={ART.quote} className="w-full" />,
  faq: () => <FaqScene />,
};

const ROTATING: Record<Exclude<CustomEcommercePage, 'overview'>, { lead: string; words: string[] }> = {
  features: { lead: 'Özel E-Ticaret', words: ['Sitesi Özellikleri', 'Modülleri', 'Entegrasyonları'] },
  technologies: { lead: 'Özel E-Ticaret', words: ['Altyapısı', 'Teknolojileri', 'Entegrasyonları'] },
  process: { lead: 'Özel E-Ticaret', words: ['Geliştirme Süreci', 'Proje Adımları', 'Yayına Geçiş'] },
  portfolio: { lead: 'Özel E-Ticaret', words: ['Sitesi Örnekleri', 'Projeleri', 'Senaryoları'] },
  pricing: { lead: 'Özel E-Ticaret Sitesi', words: ['Fiyatları', 'Maliyetleri', 'Teklif Kapsamı'] },
  faq: { lead: 'Özel E-Ticaret', words: ['Sık Sorulanlar', 'Kapsam Soruları', 'Fiyat Soruları'] },
};


/** Overview body (the hero stays in ServiceDetailClient). */
export function CustomEcommerceOverviewBody() {
  const chunks = readChunks('overview');
  return <><CustomEcommerceMotionScope /><FAQJsonLd faqs={faqItems(chunks)} /><Body page="overview" chunks={chunks} /></>;
}

export default function CustomEcommerceTurkishPage({ page }: { page: Exclude<CustomEcommercePage, 'overview'> }) {
  const copy = metadata[page];
  const chunks = readChunks(page);
  const firstAnchor = page === 'portfolio' ? '#shop-lamees' : chunks[0] ? `#${sectionId(chunks[0].title)}` : '#';
  const primaryLabel: Record<typeof page, string> = { features: 'İhtiyaçlarımı Paylaş', technologies: 'Teknik İhtiyaçlarımı Paylaş', process: 'Projemi Planlayalım', portfolio: 'Benzer Bir Projeyi Görüşelim', pricing: 'Projem İçin Teklif Al', faq: 'Projemi Anlatmak İstiyorum' };
  const secondaryLabel: Record<typeof page, string> = { features: 'Modülleri İncele', technologies: 'Altyapı Seçeneklerini İncele', process: 'Geliştirme Adımlarını İncele', portfolio: 'Shop Lamees Örneğini İncele', pricing: 'Maliyet Kalemlerini İncele', faq: 'Soruları İncele' };
  const faqs = page === 'faq' ? faqItems(chunks) : [];
  return <main className="min-h-screen bg-white">
    <CustomEcommerceMotionScope />
    {faqs.length > 0 && <FAQJsonLd faqs={faqs} />}
    <InternalPageHero
      eyebrowNormalCase
      eyebrowIcon={<span className="flex h-8 w-8 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/5"><CustomEcommerceIcon /></span>}
      serviceName="Özel E-Ticaret Geliştirme"
      accentWord={copy.heading}
      heading={copy.heading}
      rotating={ROTATING[page]}
      subtitle={copy.intro}
      scene={<CustomEcomHeroScene>{HERO_ART[page]()}</CustomEcomHeroScene>}
      crumbs={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler', href: '/hizmetler' }, { label: 'Özel E-Ticaret', href: base }, { label: copy.heading }]}
      actions={<><Link href={enquiry} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise ${focus}`}>{primaryLabel[page]}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link><a href={firstAnchor} className={`inline-flex min-h-11 items-center justify-center rounded-sm border border-heritage-sand bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-heritage-turquoise ${focus}`}>{secondaryLabel[page]}</a></>}
    />
    <Body page={page} chunks={chunks} />
  </main>;
}

