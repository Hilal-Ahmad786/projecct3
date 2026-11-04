import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Children, Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import Link from '@/components/IntentLink';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowRightIcon, CheckIcon, CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import IkasVisual from '@/components/ikas/visuals/IkasVisual';
import type { IkasVisualName } from '@/components/ikas/visuals/generated';
import CustomEcomArtwork from '@/components/custom-ecommerce/visuals/CustomEcomArtwork';
import type { CustomEcomVisualName } from '@/components/custom-ecommerce/visuals/generated';
import { FAQJsonLd } from '@/components/seo/JsonLd';
import { trTitleCase } from '@/lib/tr-title-case';
import CustomEcommerceMotionScope from './CustomEcommerceMotionScope';
import { CustomEcommerceIcon } from './CustomEcommerceIcon';
import ShopLameesCase from './ShopLameesCase';
import PageJumpNav, { SectionHead, sectionId } from './PageJumpNav';
import PlatformPageLinks from './PlatformPageLinks';

// Turkish custom e-commerce service (/tr/hizmetler/custom-ecommerce). Copy lives
// in content/custom-ecommerce/tr/*.md; this file turns each `##` block into a
// page section in the same rhythm as the ikas/Shopify pages (tones, Title Case
// H2, jump bar, cards, shared Codex visuals, closing links + CTA).

export type CustomEcommercePage = 'overview' | 'features' | 'technologies' | 'process' | 'portfolio' | 'pricing' | 'faq';
export const CUSTOM_ECOM_BASE = '/tr/hizmetler/custom-ecommerce';
export const CUSTOM_ECOM_ENQUIRY = '/tr/start-project?service=custom-ecommerce';
const base = CUSTOM_ECOM_BASE;
const enquiry = CUSTOM_ECOM_ENQUIRY;
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';
const linkClass = `font-semibold text-heritage-turquoise-deep underline decoration-heritage-turquoise/40 underline-offset-4 hover:decoration-heritage-turquoise ${focus}`;

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

/* ------------------------------------------------------------------ parsing */

type Sub = { title: string; body: string };
type Chunk = { title: string; intro: string; subs: Sub[] };

const stripNumber = (title: string) => title.replace(/^\d+\.\s*/, '').trim();

function readChunks(page: CustomEcommercePage): Chunk[] {
  const markdown = readFileSync(join(process.cwd(), 'content/custom-ecommerce/tr', `${page}.md`), 'utf8');
  const chunks: Chunk[] = [];
  for (const line of markdown.split('\n')) {
    if (line.startsWith('## ')) { chunks.push({ title: stripNumber(line.slice(3)), intro: '', subs: [] }); continue; }
    const chunk = chunks.at(-1);
    if (!chunk) continue;
    if (line.startsWith('### ')) { chunk.subs.push({ title: line.slice(4).trim(), body: '' }); continue; }
    const sub = chunk.subs.at(-1);
    if (sub) sub.body += `${line}\n`; else chunk.intro += `${line}\n`;
  }
  return chunks.map((c) => ({ ...c, intro: c.intro.trim(), subs: c.subs.map((s) => ({ ...s, body: s.body.trim() })) }));
}

const isFaqChunk = (c: Chunk) => c.subs.length > 0 && c.subs.every((s) => s.title.endsWith('?'));
const isStepChunk = (c: Chunk) => c.subs.length > 1 && c.subs.every((s) => /^\d+\./.test(s.title));
const plain = (md: string) => md.replace(/\*\*|__|\[([^\]]+)\]\([^)]*\)/g, (_m, text) => text ?? '').replace(/\s+/g, ' ').trim();

/** Q&A pairs for FAQPage JSON-LD (visible text, same wording). */
function faqItems(chunks: Chunk[]) {
  return chunks.filter(isFaqChunk).flatMap((c) => c.subs.map((s) => ({ question: s.title, answer: plain(s.body.replace(/^::cta .*$/gm, '')) })));
}

/* ---------------------------------------------------------------- markdown */

/** Tag list items with their list kind/number so `li` can draw a tick or a step number. */
function markItems(children: ReactNode, kind: 'ul' | 'ol') {
  let n = 0;
  return Children.map(children, (child) => isValidElement(child) ? cloneElement(child as ReactElement<Record<string, unknown>>, { 'data-kind': kind, 'data-index': ++n }) : child);
}

const md: Components = {
  p: ({ children }) => <p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600 first:mt-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  ul: ({ children }) => <ul className="mt-4 grid max-w-4xl gap-2.5 sm:grid-cols-2">{markItems(children, 'ul')}</ul>,
  ol: ({ children }) => <ol className="mt-4 max-w-3xl space-y-2.5">{markItems(children, 'ol')}</ol>,
  li: (props) => {
    const { children, 'data-kind': kind, 'data-index': index } = props as { children?: ReactNode; 'data-kind'?: string; 'data-index'?: number };
    return <li className="flex gap-3 rounded-lg border border-heritage-sand bg-white px-4 py-3 text-sm leading-6 text-gray-700">{kind === 'ol'
      ? <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-heritage-turquoise-light text-xs font-semibold text-heritage-turquoise-deep">{index}</span>
      : <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-heritage-turquoise-deep" aria-hidden="true" />}<span>{children}</span></li>;
  },
  a: ({ href, children }) => href?.startsWith('/') ? <Link href={href} className={linkClass}>{children}</Link> : <a href={href} className={linkClass}>{children}</a>,
  table: ({ children }) => <div role="region" aria-label="İçerik tablosu" tabIndex={0} className={`mt-6 overflow-x-auto rounded-xl border border-heritage-sand bg-white ${focus}`}><table className="w-full min-w-[620px] border-collapse text-left text-sm">{children}</table></div>,
  thead: ({ children }) => <thead className="bg-heritage-ivory">{children}</thead>,
  tr: ({ children }) => <tr className="even:bg-gray-50/70">{children}</tr>,
  th: ({ children }) => <th scope="col" className="border-b border-heritage-sand px-4 py-3 font-semibold text-gray-900">{children}</th>,
  td: ({ children }) => <td className="border-b border-gray-100 px-4 py-3 align-top leading-6 text-gray-700 first:font-medium first:text-gray-900">{children}</td>,
  blockquote: ({ children }) => <blockquote className="mt-5 max-w-3xl border-s-4 border-heritage-turquoise bg-heritage-ivory p-5 text-sm leading-7 text-gray-700">{children}</blockquote>,
};
const inline: Components = { ...md, p: ({ children }) => <>{children}</> };

function Md({ children, components = md }: { children: string; components?: Components }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{children}</ReactMarkdown>;
}

/** Markdown with `::cta text | button` lines turned into inline CTA boxes. */
function Blocks({ text }: { text: string }) {
  if (!text) return null;
  const parts = text.split(/^(::cta .*)$/m).map((part) => part.trim()).filter(Boolean);
  return <>{parts.map((part, i) => {
    if (!part.startsWith('::cta ')) return <div key={i} className="mt-4 first:mt-0"><Md>{part}</Md></div>;
    const [copy, button = 'Projemi Paylaş'] = part.slice(6).split('|').map((x) => x.trim());
    return <div key={i} data-custom-ecom-reveal className="mt-7 flex max-w-4xl flex-col gap-4 rounded-xl border border-heritage-turquoise/30 bg-heritage-turquoise-light/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><p className="text-sm font-medium leading-6 text-gray-800">{copy}</p><Link href={enquiry} className={`inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-sm bg-heritage-turquoise-deep px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise sm:self-auto ${focus}`}>{button}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></div>;
  })}</>;
}

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

// Section → visual (matched on the start of the H2).
const VISUALS: Partial<Record<CustomEcommercePage, [string, VisualSpec][]>> = {
  overview: [
    ['Özel geliştirme ne zaman', ART.architecture],
    ['Satış modelinize', { ...ART.measure, place: 'aside' }],
    ['Özel tasarım', I('variant-picker', 'aside', { loop: true, label: 'Temsili ürün sayfası: seçilen ölçü ve seçeneğe göre ürün görünümü değişiyor' })],
    ['Özel e-ticaret yazılımı', I('integration-hub', 'aside', { loop: true, markLabel: 'Mağazanız', slotLabels: hubLabels, label: 'Temsili akış: özel mağaza ödeme, kargo, stok ve muhasebe sistemlerine bağlanıyor' })],
    ['İlk sürüm', ART.release],
    ['Proje nasıl', I('process-rail', 'below', { slotLabels: { 'slot-step-1': 'İhtiyaç', 'slot-step-2': 'Kapsam', 'slot-step-3': 'Geliştirme', 'slot-step-4': 'Test', 'slot-step-5': 'Yayın ve devir' } })],
    ['Özel e-ticaret sitesi fiyatı', ART.quote],
  ],
  features: [
    ['Ürün kataloğu', ART.measure],
    ['Fiyatlandırma ve bayi', ART.dealer],
    ['Sipariş yönetimi', ART.roles],
    ['Entegrasyonlar', I('integration-hub', 'aside', { loop: true, markLabel: 'Mağazanız', slotLabels: hubLabels, label: 'Temsili akış: özel mağaza ödeme, kargo, stok ve muhasebe sistemlerine bağlanıyor' })],
    ['İlk sürüm', ART.release],
  ],
  technologies: [
    ['Hangi altyapı', ART.architecture],
    ['Müşteri arayüzü', I('editable-fields', 'aside', { loop: true, markLabel: 'Yönetim paneli', label: 'Temsili yönetim paneli: düzenlenen alan mağaza arayüzüne yansıyor' })],
    ['Fiyat ve sipariş kuralları', ART.consistency],
    ['Verinin ana kaynağını', ART.source],
    ['Ödeme, kargo', ART.retry],
    ['Teknik teslimatta', ART.acceptance],
  ],
  process: [
    ['İlk görüşmeye', I('project-brief', 'aside')],
    ['Keşiften yayına', I('stage-path', 'below', { slotLabels: { 'slot-stage-1': 'Keşif', 'slot-stage-2': 'İlk sürüm', 'slot-stage-3': 'Tasarım', 'slot-stage-4': 'Geliştirme', 'slot-stage-5': 'Test', 'slot-stage-6': 'Yayın' } })],
    ['İlk sürümün kapsamı', ART.scopeChange],
    ['Mevcut mağaza taşınacaksa', I('migration-map', 'aside', { markLabel: 'Yeni mağaza', label: 'Temsili geçiş: eski mağazadaki kayıtlar yeni mağazaya aktarılıyor, eski adresler eşleştiriliyor' })],
    ['Örnek kabul', ART.acceptance],
    ['Yayın sonrası', I('handover-pack', 'aside')],
  ],
  portfolio: [['Özel e-ticaret örneğini', I('project-brief', 'aside')]],
  pricing: [
    ['Geliştirme, dış hizmetler', I('cost-split', 'aside', { markLabel: 'Dış giderler', label: 'Temsili gider grupları: geliştirme, dış servisler ve yayın sonrası işler' })],
    ['Proje bedelini', ART.quote],
    ['Teklif almak için', I('project-brief', 'aside')],
  ],
};
// Portföy scenario cards (in order) each get their matching illustration.
const SCENARIO_ART: VisualSpec[] = [ART.measure, ART.dealer, ART.source];

const lower = (s: string) => s.toLocaleLowerCase('tr');
function visualFor(page: CustomEcommercePage, title: string) {
  return VISUALS[page]?.find(([prefix]) => lower(title).startsWith(lower(prefix)))?.[1];
}
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
const jumpLabel = (title: string) => JUMP_LABELS.find(([prefix]) => lower(title).startsWith(lower(prefix)))?.[1] ?? title.replace(/[?:].*$/, '');

/* ---------------------------------------------------------------- sections */

const TONES = ['gray', 'white', 'ivory'] as const;
const toneClass = { gray: 'bg-background-gray', white: 'bg-white', ivory: 'bg-heritage-ivory' } as const;

function SubGroup({ chunk, page }: { chunk: Chunk; page: CustomEcommercePage }) {
  if (!chunk.subs.length) return null;
  if (isFaqChunk(chunk)) {
    return <div className="mt-6 max-w-4xl divide-y divide-heritage-sand border-y border-heritage-sand">{chunk.subs.map((s) => <div key={s.title} className="py-5"><h3 className="text-base font-semibold text-gray-900">{s.title}</h3><div className="mt-2 [&_p]:text-sm [&_p]:leading-6"><Blocks text={s.body} /></div></div>)}</div>;
  }
  if (isStepChunk(chunk)) {
    return <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{chunk.subs.map((s, i) => <li key={s.title} data-custom-ecom-reveal data-custom-ecom-delay={Math.min(i, 5) * 45} className="flex flex-col rounded-xl border border-heritage-sand bg-white p-5"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-heritage-turquoise-light text-sm font-semibold text-heritage-turquoise-deep">{i + 1}</span><h3 className="mt-3 text-base font-semibold text-gray-900">{stripNumber(s.title)}</h3><div className="mt-2 [&_p]:mt-2 [&_p]:text-sm [&_p]:leading-6"><Md>{s.body}</Md></div></li>)}</ol>;
  }
  const cols = chunk.subs.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
  return <div className={`mt-6 grid gap-4 sm:grid-cols-2 ${cols}`}>{chunk.subs.map((s, i) => <article key={s.title} data-custom-ecom-reveal data-custom-ecom-delay={Math.min(i, 5) * 45} className="flex h-full flex-col rounded-xl border border-heritage-sand bg-white p-5">{page === 'portfolio' && SCENARIO_ART[i] && <Visual spec={SCENARIO_ART[i]} className="-mx-1 mb-4 w-[calc(100%+0.5rem)] rounded-lg bg-heritage-ivory/60 p-2" />}{page === 'portfolio' && <span className="mb-3 self-start rounded-full bg-heritage-ivory px-2.5 py-1 text-xs font-semibold text-gray-600">Temsili senaryo</span>}<h3 className="text-base font-semibold leading-snug text-gray-900">{s.title}</h3><div className="mt-2 [&_p]:mt-2 [&_p]:text-sm [&_p]:leading-6"><Blocks text={s.body} /></div></article>)}</div>;
}

function ChunkSection({ chunk, page, index }: { chunk: Chunk; page: CustomEcommercePage; index: number }) {
  const tone = TONES[index % TONES.length];
  const spec = visualFor(page, chunk.title);
  // With a side visual, the first plain paragraph becomes the heading intro.
  let lead: string | undefined; let rest = chunk.intro;
  if (spec?.place === 'aside') {
    const [first, ...others] = chunk.intro.split(/\n\s*\n/);
    if (first && !/^(\||-|\d+\.|::cta|>)/.test(first.trim())) { lead = first; rest = others.join('\n\n'); }
  }
  return (
    <section id={sectionId(chunk.title)} className={`${toneClass[tone]} scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)]`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 cw-section">
        <SectionHead title={trTitleCase(chunk.title)} intro={lead ? <Md components={inline}>{lead}</Md> : undefined} aside={spec?.place === 'aside' ? <Visual spec={spec} /> : undefined} />
        {rest && <div className="mt-5"><Blocks text={rest} /></div>}
        {spec?.place === 'below' && <Visual spec={spec} />}
        <SubGroup chunk={chunk} page={page} />
      </div>
    </section>
  );
}

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

function Body({ page, chunks }: { page: CustomEcommercePage; chunks: Chunk[] }) {
  const caseAt = page in CASE_AFTER ? (CASE_AFTER[page] === null ? 0 : chunks.findIndex((c) => lower(c.title).startsWith(lower(CASE_AFTER[page] as string))) + 1) : -1;
  const jump = chunks.map((c) => ({ href: `#${sectionId(c.title)}`, label: page === 'faq' ? c.title : jumpLabel(c.title) }));
  if (caseAt >= 0) jump.splice(caseAt, 0, { href: '#shop-lamees', label: 'Örnek proje' });
  return <>
    <PageJumpNav label={page === 'faq' ? 'SSS konuları' : 'Bu sayfada'} items={jump} mark={<CodeBracketSquareIcon className="h-3.5 w-3.5 text-heritage-turquoise-deep" />} />
    {chunks.map((chunk, i) => <Fragment key={chunk.title}>{i === caseAt && <ShopLameesCase />}<ChunkSection chunk={chunk} page={page} index={i} /></Fragment>)}
    <PlatformPageLinks platform="custom" current={page} tone={TONES[chunks.length % TONES.length]} />
    <ClosingCta page={page} />
  </>;
}

/* -------------------------------------------------------------------- hero */

function HeroArt({ page }: { page: CustomEcommercePage }) {
  const modules: Record<CustomEcommercePage, [string, string][]> = {
    overview: [['Ürün seçimi', 'Ölçü ve seçenekler'], ['Fiyat kuralı', 'Müşteriye göre hesap'], ['Sipariş akışı', 'Ekibe aktarım']],
    features: [['Katalog', 'Ürün ve varyantlar'], ['Fiyat', 'Seçenek ve müşteri kuralları'], ['Sipariş', 'Durum ve ekip yetkileri']],
    technologies: [['Mağaza', 'Müşteri arayüzü'], ['Satış kuralları', 'Fiyat ve sipariş'], ['Sistemler', 'Veri bağlantıları']],
    process: [['Keşif', 'İhtiyaç ve mevcut durum'], ['Geliştirme', 'Ekran ve bağlantılar'], ['Test ve yayın', 'Kontrol ve devir']],
    portfolio: [['Ürün seçimi', 'Ölçüye göre satış'], ['Bayi siparişi', 'Fiyat ve onay'], ['Stok akışı', 'Sistem bağlantısı']],
    pricing: [['Geliştirme', 'Ekran ve iş kuralları'], ['Dış giderler', 'Lisans ve sağlayıcı'], ['Devam işleri', 'Bakım ve destek']],
    faq: [['Kapsam', 'Ürün ve sipariş'], ['Maliyet', 'Teklif ve giderler'], ['Teslim', 'Yayın sonrası']],
  };
  return <div className="w-full max-w-md"><figure aria-label="Özel e-ticaret hizmeti için temsili modüller" className="m-0 grid grid-cols-1 gap-3 rounded-2xl border border-heritage-sand bg-white p-4 shadow-sm sm:grid-cols-3">{modules[page].map(([title, text], i) => <div key={title} data-custom-ecom-reveal data-custom-ecom-delay={i * 45} className="rounded-xl border border-heritage-sand bg-heritage-ivory p-4"><span className="text-xs font-semibold text-heritage-turquoise-deep">0{i + 1}</span><strong className="mt-2 block text-sm text-gray-900">{title}</strong><span className="mt-1 block text-xs leading-5 text-gray-600">{text}</span></div>)}</figure><p className="mt-2 text-right text-xs text-gray-500">Temsili gösterim</p></div>;
}

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
      scene={<HeroArt page={page} />}
      crumbs={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler', href: '/hizmetler' }, { label: 'Özel E-Ticaret', href: base }, { label: copy.heading }]}
      actions={<><Link href={enquiry} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise ${focus}`}>{primaryLabel[page]}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link><a href={firstAnchor} className={`inline-flex min-h-11 items-center justify-center rounded-sm border border-heritage-sand bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-heritage-turquoise ${focus}`}>{secondaryLabel[page]}</a></>}
    />
    <Body page={page} chunks={chunks} />
  </main>;
}

