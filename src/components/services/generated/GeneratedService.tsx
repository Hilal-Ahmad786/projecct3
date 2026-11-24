import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { BudgetScene, CaseScene, MeasureScene, QaScene, ScopeScene, ServiceOverviewScene, TimelineScene } from '@/components/services/hero-visuals/scenes-subpages';
import { getBespoke } from './bespoke';
import { createSeoService, type SeoPageKind, type SeoServiceConfig } from '../seo-pages/SeoServiceEngine';

// A generated service is described by content/<slug>/tr/spec.json (labels for the hero scenes, hero copy,
// related services, jump labels) plus metadata.json and the seven markdown pages. Nothing here is per-service code.
type Three = [string, string, string];
export type GeneratedSpec = {
  name: string; short: string; shortLower: string;
  hero: { eyebrow: string; keywordLine: string; cta: string; words: string[]; lead?: string };
  overview: { title: string; chips: Three; report: string; bars: Three; badge: string; steps: string[] };
  scene: {
    scope: { title: string; items: [string, string, string, string]; test: Three; result: string };
    meas: { browser: [string, string]; server: [string, string]; report: string; events: Three; badge: string; consent: string };
    time: { milestones: [string, string, string, string, string]; plan: [string, string, string, string] };
    kase: { notes: Three; start: [string, string]; approach: [string, string]; verdict: string };
    budget: { plan: string; spend: [string, string]; items: Three; badge: string };
    faq: { search: string; questions: Three; answer: [string, string]; topics: Three };
  };
  rotating?: Record<string, { lead: string; words: string[] }>;
  related: [string, string, string][];
  jump: [string, string][];
  closing: Record<string, string>;
};

const cache = new Map<string, ReturnType<typeof build>>();
const readJson = <T,>(slug: string, file: string) => JSON.parse(readFileSync(join(process.cwd(), 'content', slug, 'tr', file), 'utf8')) as T;
const readGuides = (slug: string) => {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), 'content', 'blog', slug, 'manifest.json'), 'utf8')) as Array<{ slug: string; heading: string; categoryLabel?: string; excerpt: string; featuredImage: string; imageAlt?: string; publishedAt?: string; readingMinutes?: number }>;
  } catch { return []; }
};

function build(slug: string) {
  const spec = readJson<GeneratedSpec>(slug, 'spec.json');
  const metadata = readJson<NonNullable<SeoServiceConfig['metadata']>>(slug, 'metadata.json');
  const guides = readGuides(slug);
  const base = `/tr/hizmetler/${slug}`;
  const S = spec.scene;
  const n = spec.shortLower;
  const word = (a: string, b: string) => [a, b];
  const sharedHeroArt: SeoServiceConfig['heroArt'] = {
    features: () => <ScopeScene label={`Temsili ${n} hizmet kapsamı: ${S.scope.items.join(', ')} adım adım tamamlanıyor; iki seçenek sırayla karşılaştırılıyor.`} title={S.scope.title} items={S.scope.items} test={S.scope.test} result={S.scope.result} steps={['Analiz', 'Plan', 'Uygulama', 'Rapor']} />,
    technologies: () => <MeasureScene label={`Temsili ${n} veri akışı: ${S.meas.browser[0]} ve ${S.meas.server[0]} aynı rapora ulaşıyor ve kayıtlar eşleşiyor.`} browser={S.meas.browser} server={S.meas.server} report={S.meas.report} events={S.meas.events} badge={S.meas.badge} consent={S.meas.consent} steps={['Plan', 'Kurulum', 'Test', 'Rapor']} />,
    process: () => <TimelineScene label={`Temsili ${n} süreci: ${S.time.milestones.join(', ')} adımları sırayla ilerliyor.`} milestones={S.time.milestones} plan={S.time.plan} steps={['Analiz', 'Plan', 'Uygulama', 'Değerlendirme']} />,
    portfolio: () => <CaseScene label={`Temsili ${n} senaryosu: gözlem, değişiklik ve kontrol noktaları işaretleniyor; başlangıçtan yaklaşıma geçiliyor.`} title="Temsili senaryo" badge="Temsili" notes={S.kase.notes} start={S.kase.start} approach={S.kase.approach} verdict={S.kase.verdict} steps={['Durum', 'Kontrol', 'Değişiklik', 'Sonuç']} />,
    pricing: () => <BudgetScene label={`${spec.short} maliyet kalemleri: ${S.budget.plan}, ${S.budget.spend[0].toLowerCase()} ve PakSoft teklifindeki ayrı kalemler.`} plan={S.budget.plan} spend={S.budget.spend} quote="PakSoft teklifi" items={S.budget.items} badge={S.budget.badge} steps={['Kapsam', 'Tahmin', 'Teklif', 'Onay']} />,
    faq: () => <QaScene label={`${spec.short} hakkında sık sorulan sorular: arama yapılıyor, ilk sorunun yanıtı açılıyor.`} search={S.faq.search} questions={S.faq.questions} answer={S.faq.answer} topics={S.faq.topics} steps={['Soru', 'Yanıt', 'Kapsam', 'Teklif']} />,
  };
  const own = getBespoke(slug);
  const heroArt: SeoServiceConfig['heroArt'] = { ...sharedHeroArt, ...own?.heroArt };
  const lead = spec.short;
  const config: SeoServiceConfig = {
    platform: 'engine', contentDir: `content/${slug}/tr`, base, enquiry: `/tr/start-project?service=${slug}`,
    serviceName: spec.name, Icon: SparklesIcon, metadata, visuals: own?.visuals ?? {}, heroArt,
    links: { slug, name: spec.short, related: spec.related, blog: false },
    rotating: { features: { lead, words: word('Hizmet Kapsamı', 'Çalışma Alanları') }, technologies: { lead, words: word('Araçları', 'Ölçüm Planı') }, process: { lead, words: word('Çalışma Süreci', 'Adımları') }, portfolio: { lead, words: word('Senaryoları', 'Değerlendirme') }, pricing: { lead, words: word('Fiyatları', 'Maliyet Kalemleri') }, faq: { lead, words: word('Sık Sorulan Sorular', 'Yanıtlar') }, blog: { lead, words: word('Rehberleri', 'İpuçları') }, ...(spec.rotating ?? {}) },
    primary: { overview: spec.hero.cta, features: 'Kapsamıma Göre Teklif Al', technologies: 'İhtiyacımı Paylaş', process: 'İlk Görüşme İçin Bilgilerimi Paylaş', portfolio: 'Projemi Görüşmek İstiyorum', pricing: spec.hero.cta, faq: 'Sorumu ve İhtiyacımı Paylaş', blog: spec.hero.cta },
    secondary: { features: ['Hizmet Kapsamını İncele', ''], technologies: ['Araçları İncele', ''], process: ['Adımları İncele', ''], portfolio: ['Senaryoları İncele', ''], pricing: ['Gider Kalemlerini İncele', slug === 'ecommerce-meta-ads' ? '#gider-kalemleri' : ''], faq: ['Soruları İncele', ''] },
    closingLink: { overview: ['Hizmet Kapsamını İncele', `${base}/ozellikler`], features: ['Fiyatlandırmayı İncele', `${base}/fiyatlandirma`], technologies: ['Hizmet Kapsamına Dön', `${base}/ozellikler`], process: ['Araçlar ve Ölçüm', `${base}/teknoloji`], portfolio: ['Çalışma Sürecimiz', `${base}/surec`], pricing: ['Hizmet Kapsamını İncele', `${base}/ozellikler`], faq: [`${spec.short} Hizmeti`, base] },
    closingDefault: { title: `${spec.short} Planınızı Birlikte Oluşturalım`, text: 'Hedefinizi ve mevcut durumunuzu paylaşın; gerekli işleri birlikte belirleyelim.' },
    closingTitlePrefix: spec.closing as SeoServiceConfig['closingTitlePrefix'],
    jumpLabels: spec.jump, sectionIds: slug === 'ecommerce-meta-ads' ? { 'overview:Mağazanız hangi aşamada?': 'hizmet-kapsami', 'pricing:Hangi giderler ayrı değerlendirilir?': 'gider-kalemleri' } : {}, structuredFaq: true, portfolioBadge: 'Temsili senaryo',
    blog: { id: 'rehberler', title: `${spec.short} Rehberleri`, text: metadata.blog?.intro ?? '', asideTitle: 'Mağazanız için reklam hazırlığını birlikte değerlendirelim', asideText: 'Ürünlerinizi, mevcut kurulumunuzu ve ihtiyaç duyduğunuz çalışmaları paylaşın.', guides: () => guides.map((g) => ({ slug: g.slug, title: g.heading, categoryLabel: g.categoryLabel ?? 'E-Ticaret Meta Reklam Rehberi', excerpt: g.excerpt, featuredImage: g.featuredImage, imageAlt: g.imageAlt, datePublished: g.publishedAt ?? null, readingMinutes: g.readingMinutes })) },
  };
  const service = createSeoService(config);
  const overviewArt = own?.overviewArt ?? <ServiceOverviewScene label={`Temsili ${n} akışı: ${spec.overview.chips.join(', ')} adım adım ilerliyor ve sonuç raporuna yansıyor.`} title={spec.overview.title} chips={spec.overview.chips} report={spec.overview.report} bars={spec.overview.bars} badge={spec.overview.badge} steps={spec.overview.steps} />;
  return {
    slug, service, heroArt: overviewArt,
    hero: { eyebrow: spec.hero.eyebrow, lead: spec.hero.lead ?? spec.short, words: spec.hero.words, keywordLine: spec.hero.keywordLine, cta: spec.hero.cta, enquiry: `/start-project?service=${slug}`, base, ...(slug === 'ecommerce-meta-ads' ? { secondaryHref: `${base}#hizmet-kapsami` } : {}) },
  };
}

export function getGeneratedService(slug: string) {
  let hit = cache.get(slug);
  if (!hit) { hit = build(slug); cache.set(slug, hit); }
  return hit;
}
export type GeneratedPage = Exclude<SeoPageKind, 'overview'>;
