import type { ReactNode } from 'react';
import SeoArtwork from '@/components/seo/visuals/SeoArtwork';
import type { SeoVisualName } from '@/components/seo/visuals/generated';
import type { SectionVisual } from '@/components/e-commerce/ServiceMarkdownPage';
import { HeroStage } from '@/components/services/hero-visuals/scenes-subpages';
import { EcommerceMetaAdsScene } from '@/components/services/hero-visuals/scenes-3d';
import type { SeoServiceConfig } from '../seo-pages/SeoServiceEngine';

// Per-service overrides for generated services: an individual overview hero, sub-page hero illustrations and
// body-section art. A generated service without an entry here falls back to the shared label-driven scenes.
// Every illustration is representative: short Turkish labels, no numbers, no brand logos.
type Bespoke = { overviewArt?: ReactNode; heroArt?: Partial<SeoServiceConfig['heroArt']>; visuals?: SeoServiceConfig['visuals'] };

const art = (name: SeoVisualName, label: string, slotLabels: Record<string, string>, className = 'mx-auto w-full max-w-xl') =>
  <SeoArtwork name={name} loop label={label} slotLabels={slotLabels} className={className} />;
const aside = (node: ReactNode): SectionVisual => ({ place: 'aside', node });
const stage = (label: string, node: ReactNode, steps: string[], badge?: string) => <HeroStage label={label} steps={steps} badge={badge}>{node}</HeroStage>;

const E = {
  sets: () => art('category-filters', 'Katalogdaki ürünler ayrı setlere bölünür: stoktaki çok satanlar ve yeni gelenler reklamda, tükenen ve görseli eksik ürünler set dışında', { 'slot-category': 'Ürün kataloğu', 'slot-urls': 'Reklam setleri', 'slot-url-1': 'Çok satanlar · stokta', 'slot-url-2': 'Tükenen ürünler', 'slot-url-3': 'Yeni gelenler · stokta', 'slot-url-4': 'Görseli eksik', 'slot-legend-ok': 'Sette', 'slot-legend-skip': 'Set dışı' }),
  dedupe: () => art('gads-tag-flow', 'Satın alma ölçümü: tarayıcıdaki Meta Pixel olayı ve Conversions API sunucu olayı aynı olay kimliğiyle gelir, siparişi iki kez saymaz', { 'slot-step-1': 'Tarayıcı olayı', 'slot-sub-1': 'Meta Pixel', 'slot-step-2': 'Sunucu olayı', 'slot-sub-2': 'Conversions API', 'slot-step-3': 'Aynı olay kimliği', 'slot-sub-3': 'Tek kayıt', 'slot-note': 'Her satın alma raporda bir kez sayılır.' }),
  rail: () => art('process-rail', 'E-ticaret reklam süreci: mağaza ve hedef, ürün ve stok seçimi, katalog ve ölçüm kontrolü, yayın ve değerlendirme', { 'slot-step-1': 'Mağaza', 'slot-sub-1': 'Hedef ve katalog', 'slot-step-2': 'Ürün', 'slot-sub-2': 'Stok ve teklif', 'slot-step-3': 'Ölçüm', 'slot-sub-3': 'Katalog ve olay', 'slot-step-4': 'Yayın', 'slot-sub-4': 'İlk kontrol' }),
  scenarios: () => art('ecom-scenarios', 'Temsili senaryolar: çok varyantlı katalog, ürün faydasını anlatan video ve satın alma kaydı tutarsızlığı', { 'slot-title-1': 'Çok varyantlı katalog', 'slot-check-1': 'Varyant kimliği', 'slot-tag-1': 'Katalog', 'slot-title-2': 'Fayda videosu', 'slot-check-2': 'Ürün sayfası', 'slot-tag-2': 'Kreatif', 'slot-title-3': 'Kayıt tutarsız', 'slot-check-3': 'Olay kontrolü', 'slot-tag-3': 'Ölçüm' }),
  budget: () => art('gads-budget-split', 'Maliyet kalemleri: reklam bütçesi Meta’ya ödenir; yönetim, içerik ve teknik çalışma PakSoft teklifinde ayrı kalemlerdir', { 'slot-budget': 'Reklam bütçesi', 'slot-budget-sub': 'Meta’ya ödenir', 'slot-fee': 'Yönetim bedeli', 'slot-setup': 'İçerik ve katalog işi', 'slot-google': 'Reklam hesabınız', 'slot-google-sub': 'Ödeme doğrudan Meta’ya', 'slot-paksoft': 'PakSoft teklifi', 'slot-paksoft-sub': 'Kalemler ayrı yazılır' }),
  funnel: () => art('ecom-sales-funnel', 'Reklamdan siparişe: reklamı gören, ürün sayfasını açan, sepete ekleyen ve sipariş veren kişiye aynı ürün mesajı korunur', { 'slot-step-1': 'Reklamı gören', 'slot-step-2': 'Ürün sayfası', 'slot-step-3': 'Sepete ekleyen', 'slot-step-4': 'Sipariş', 'slot-once': 'Aynı ürün mesajı' }),
  platforms: () => art('ecom-platforms', 'Altyapıya göre hazırlık: Shopify, ikas, WooCommerce ve özel yazılımda katalog ve ölçüm bağlantısı ayrı kontrol edilir', { 'slot-plat-1': 'Shopify', 'slot-focus-1': 'Mevcut uygulama', 'slot-plat-2': 'ikas', 'slot-focus-2': 'Katalog bağlantısı', 'slot-plat-3': 'WooCommerce', 'slot-focus-3': 'Eklenti kontrolü', 'slot-plat-4': 'Özel yazılım', 'slot-focus-4': 'Özel kapsam' }),
  scope: () => art('deliverables', 'Hizmet kapsamı: ürün ve stok seçimi, içerik planı, katalog kontrolü ve satın alma ölçümü', { 'slot-doc-1': 'Ürün ve stok seçimi', 'slot-doc-2': 'İçerik planı', 'slot-doc-3': 'Katalog kontrolü', 'slot-doc-4': 'Satın alma ölçümü' }),
  stock: () => art('ecom-stock-rules', 'Ürün gruplarına göre kurallar: stoktaki ürün reklamda, az stoklu ürün izlenir, tükenen ürün durdurulur', { 'slot-head-state': 'Stok durumu', 'slot-head-rule': 'Reklam kuralı', 'slot-state-1': 'Stokta', 'slot-rule-1': 'Reklamda', 'slot-state-2': 'Az stok', 'slot-rule-2': 'İzlenir', 'slot-state-3': 'Tükendi', 'slot-rule-3': 'Durdurulur' }),
  page: () => art('page-annotate', 'Ürün sayfasında kontrol edilenler: net fiyat, varyant bilgisi, teslimat bilgisi ve güven öğeleri', { 'slot-tag-1': 'Net fiyat', 'slot-tag-2': 'Varyant seçimi', 'slot-tag-3': 'Teslimat bilgisi', 'slot-tag-4': 'Güven öğeleri' }),
  tools: () => art('tools', 'Mevcut kurulumun envanteri: Meta Pixel, katalog, Conversions API ve mağaza paneli birlikte kontrol edilir', { 'slot-tool-1': 'Meta Pixel', 'slot-tool-2': 'Katalog', 'slot-tool-3': 'Conversions API', 'slot-tool-4': 'Mağaza paneli', 'slot-center': 'Kurulum envanteri' }),
  status: () => art('tech-status', 'Satın alma testi: tarayıcı olayı, sunucu olayı ve olay kimliği kontrol edilir; sonuç tek satın alma olarak sayılır', { 'slot-url': 'Test siparişi', 'slot-check-1': 'Tarayıcı olayı', 'slot-value-1': 'Gönderildi', 'slot-check-2': 'Sunucu olayı', 'slot-value-2': 'Gönderildi', 'slot-check-3': 'Olay kimliği', 'slot-value-3': 'Aynı', 'slot-verdict': 'Tek satın alma sayıldı' }),
  launch: () => art('contract-scope', 'Yayın öncesi kontrol: katalog durumu, ürün bağlantıları, ölçüm testi ve içerik onayı', { 'slot-doc': 'Yayın kontrol kaydı', 'slot-clause-1': 'Katalog durumu', 'slot-clause-2': 'Ürün bağlantıları', 'slot-clause-3': 'Mobil görünüm', 'slot-clause-4': 'Ölçüm testi', 'slot-clause-5': 'Onay eksikse yayın bekler' }),
  quote: () => art('quote-groups', 'Hizmet bedelini etkileyenler: ürün grupları, içerik üretimi, katalog ve ölçüm işi, rapor ve toplantı; reklam bütçesi ayrı', { 'slot-group-1': 'Ürün grupları', 'slot-group-2': 'İçerik üretimi', 'slot-group-3': 'Katalog ve ölçüm', 'slot-group-4': 'Rapor ve toplantı', 'slot-quote': 'Yönetim bedeli', 'slot-extra': 'Reklam bütçesi ayrı' }),
  plan: () => art('monthly-plan', 'Temsili bütçe planı: küçük testler, sonucu iyi olan ürün grubuna kademeli bütçe aktarımı ve dönem sonu değerlendirmesi', { 'slot-month': 'Bütçe planı', 'slot-week-1': 'Başlangıç', 'slot-week-2': 'Test', 'slot-week-3': 'Aktarım', 'slot-week-4': 'Dönem sonu', 'slot-task-1': 'Ölçüm kontrolü', 'slot-task-sub-1': 'Olaylar doğru mu?', 'slot-task-2': 'Ürün grubu testi', 'slot-task-sub-2': 'Tek değişken', 'slot-task-3': 'Bütçe aktarımı', 'slot-task-sub-3': 'Gerekçesiyle', 'slot-task-4': 'Değerlendirme', 'slot-task-sub-4': 'Sipariş kaydıyla' }),
};

const bespoke: Record<string, Bespoke> = {
  'ecommerce-meta-ads': {
    overviewArt: <EcommerceMetaAdsScene />,
    heroArt: {
      features: () => stage('E-ticaret Meta reklamları: ürün setleri ve stok durumu', E.sets(), ['Ürün', 'İçerik', 'Katalog', 'Rapor'], 'Stok kontrollü'),
      technologies: () => stage('E-ticaret Meta reklamları: satın alma ölçümü ve olay tekrarının önlenmesi', E.dedupe(), ['Piksel', 'Sunucu', 'Kontrol', 'Rapor'], 'Tek kayıt'),
      process: () => stage('E-ticaret Meta reklamları: mağaza, ürün, ölçüm ve yayın süreci', E.rail(), ['Plan', 'Onay', 'Yayın', 'Rapor']),
      portfolio: () => stage('E-ticaret Meta reklamları: temsili senaryolar', E.scenarios(), ['Durum', 'Kontrol', 'Değişiklik', 'Sonuç'], 'Temsili'),
      pricing: () => stage('E-ticaret Meta reklamları: maliyet kalemleri', E.budget(), ['Bütçe', 'Kapsam', 'Teklif', 'Onay'], 'Kalemler ayrı'),
    },
    visuals: {
      overview: [
        ['Mağazanız hangi aşamada', aside(E.tools())],
        ['E-ticaret reklam yönetimi neleri', aside(E.scope())],
        ['Reklamdan siparişe', aside(E.funnel())],
        ['Shopify, ikas ve WooCommerce', aside(E.platforms())],
        ['İlk görüşmede hangi dört', aside(E.rail())],
      ],
      features: [
        ['Ürün gruplarına göre', aside(E.stock())],
        ['Ürün mesajı ve kreatif', aside(E.page())],
        ['Sezonluk ve az stoklu', aside(E.stock())],
        ['Çok varyantlı ürünlerde', aside(E.sets())],
        ['Sepet terk ve ürün görüntüleme', aside(E.funnel())],
      ],
      technologies: [
        ['Önce mevcut kurulumu', aside(E.tools())],
        ['Bir satın almayı iki kez', aside(E.status())],
        ['Shopify, ikas ve WooCommerce', aside(E.platforms())],
        ['Ticaret Yöneticisi', aside(E.sets())],
        ['Tarayıcı ve sunucu verisi', aside(E.dedupe())],
      ],
      process: [
        ['1. Mağaza ve hedeflerin', aside(E.scope())],
        ['3. Katalog ve ölçüm', aside(E.launch())],
        ['İlk otuz gün', aside(E.plan())],
        ['Hangi durumda yayını bekletiriz', aside(E.launch())],
      ],
      portfolio: [
        ['Sorun hangi sırayla', aside(E.status())],
      ],
      pricing: [
        ['Hizmet bedelini değiştiren', aside(E.quote())],
        ['E-ticaret reklam bütçesi nasıl', aside(E.plan())],
        ['Katalog kurulumu ve içerik', aside(E.scope())],
      ],
    },
  },
};

export const getBespoke = (slug: string): Bespoke | undefined => bespoke[slug];
