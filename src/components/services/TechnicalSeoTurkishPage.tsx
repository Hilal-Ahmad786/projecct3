import { ProcessScene } from '@/components/services/hero-visuals/scenes-internal';
import type { ReactNode } from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import IkasVisual from '@/components/ikas/visuals/IkasVisual';
import SeoArtwork from '@/components/seo/visuals/SeoArtwork';
import type { SeoVisualName } from '@/components/seo/visuals/generated';
import type { SectionVisual } from '@/components/e-commerce/ServiceMarkdownPage';
import { getTechnicalSeoGuides } from '@/components/services/service-blogs/technical-seo';
import { createSeoService, type SeoMeta, type SeoPageKind, type SeoServiceConfig } from './seo-pages/SeoServiceEngine';

// Turkish Teknik SEO service at /tr/hizmetler/technical-seo. Copy:
// content/technical-seo/tr (Codex packs in Keywords/Pazarlama/SEO/TeknikSEO/codex).
// Keyword targets from PakSoft_SEO_Keyword_Master.xlsx (Teknik SEO rows + blog):
// teknik seo (110), seo audit (90), teknik seo nedir (70), seo denetimi (20),
// teknik seo analizi / denetimi / hizmeti, site hızı ve Core Web Vitals optimizasyonu.

export type TechnicalSeoPageKind = SeoPageKind;
export const TECHNICAL_SEO_TR_BASE = '/tr/hizmetler/technical-seo';
export const TECHNICAL_SEO_TR_ENQUIRY = '/tr/start-project?service=technical-seo';
const base = TECHNICAL_SEO_TR_BASE;

const metadata: Record<SeoPageKind, SeoMeta> = {
  overview: { title: 'Teknik SEO Hizmeti ve SEO Denetimi (SEO Audit) | PakSoft', description: 'Teknik SEO denetimiyle tarama, indeksleme, site hızı, Core Web Vitals ve yönlendirme sorunlarını tespit edin. Önceliklendirilmiş bir düzeltme planı alın.', heading: 'Teknik SEO Hizmeti', intro: 'Google’ın önemli sayfalarınıza ulaşmasını ve bu sayfaları doğru değerlendirmesini zorlaştıran teknik sorunları tespit ediyoruz. PakSoft, tarama ve indeksleme bulgularını, site hızı sorunlarını ve taşıma risklerini, geliştiricinizin uygulayıp doğrulayabileceği bir iş planına dönüştürür.' },
  features: { title: 'Teknik SEO Denetimi ve Kontrol Listesi | PakSoft', description: 'Teknik SEO kontrol listesi: tarama, indeksleme, canonical, site hızı, JavaScript, yönlendirme ve yapılandırılmış veri kontrollerini örnek bulgularla inceleyin.', heading: 'Teknik SEO Denetiminde Neleri Kontrol Ediyoruz?', intro: 'Aynı belirti farklı nedenlerden kaynaklanabilir. Örneğin bir hizmet sayfası arama sonuçlarında görünmüyorsa önce adresin erişilebilir olup olmadığını, ardından indeksleme kurallarını ve sayfanın başka bir URL ile eşleştirilip eşleştirilmediğini inceleriz. Bulguları örnek adreslerle gösterir, geliştiriciniz için beklenen davranışı tarif ederiz.' },
  technologies: { title: 'Teknik SEO Analizi: Araçlar ve Ölçüm Yöntemleri | PakSoft', description: 'Teknik SEO analizinde Search Console, site taraması, PageSpeed Insights ve tarayıcı testlerinin hangi soruları yanıtladığını örneklerle inceleyin.', heading: 'Teknik SEO Analizi: Araçlar ve Ölçüm Yöntemleri', intro: 'Bir sayfanın neden aramada görünmediğini, neden yavaş açıldığını veya bir yönlendirmenin nerede bozulduğunu anlamak için farklı verilere bakmak gerekir. Teknik SEO analizinde site taramasını, Google’ın sağladığı verileri ve tarayıcı testlerini birlikte değerlendiriyoruz. Böylece geliştiriciniz hangi adresi, hangi koşullarda yeniden test edeceğini bilir.' },
  process: { title: 'Teknik SEO Süreci: Denetimden Doğrulamaya | PakSoft', description: 'Teknik SEO sürecinin kapsam, başlangıç kaydı, önceliklendirme, uygulama ve canlı sitede yeniden test aşamalarını öğrenin.', heading: 'Teknik SEO Süreci Nasıl İlerler?', intro: 'Önce sitenizde hangi sayfaların işiniz için önemli olduğunu ve neyin değiştiğini öğreniriz. Denetimde teknik sorunları örnek adreslerle belgeler, düzeltmeleri öncelik sırasına koyarız. İşler tamamlandığında aynı adresleri tekrar kontrol ederek sonucu kayda geçiririz.' },
  portfolio: { title: 'Teknik SEO Örnekleri ve Uygulama Senaryoları | PakSoft', description: 'Site taşıma, kategori indeksleme ve mobil performans sorunlarının teknik SEO’da nasıl incelendiğini ve düzeltmelerin nasıl doğrulandığını görün.', heading: 'Teknik SEO Uygulama Örnekleri', intro: 'Teknik SEO çalışmasını değerlendirirken hangi sayfaların etkilendiğine, hangi değişikliğin önerildiğine ve doğrulamanın nasıl yapıldığına bakın. Aşağıdaki temsili senaryolar bu yaklaşımı gösterir.' },
  pricing: { title: 'Teknik SEO Fiyatları ve SEO Audit Maliyeti | PakSoft', description: 'Teknik SEO ve SEO audit fiyatını belirleyen denetim kapsamını, düzeltme işlerini ve yayın sonrası doğrulamayı inceleyin. Sitenize özel teklif alın.', heading: 'Teknik SEO Fiyatları Nasıl Belirlenir?', intro: 'Teknik SEO fiyatı; incelenecek sayfa türlerine, sorunun kapsamına ve düzeltmeleri hangi ekibin uygulayacağına göre belirlenir. Denetim, uygulama ve doğrulama kalemlerini teklifinizde açıkça gösteriyoruz.' },
  faq: { title: 'Teknik SEO Nedir? Sık Sorulan Sorular | PakSoft', description: 'Teknik SEO nedir, denetim için ne gerekir, tarama bütçesi önemli mi, sayfam neden indekslenmiyor? Teknik SEO hakkında sık sorulan soruların yanıtları.', heading: 'Teknik SEO Hakkında Sık Sorulan Sorular', intro: 'Teknik SEO denetimine başlamadan önce hangi bilgileri paylaşmanız gerektiğini, indeksleme sorununun nasıl incelendiğini ve düzeltmelerin nasıl doğrulandığını öğrenin.' },
  blog: { title: 'Teknik SEO Rehberleri ve Kontrol Listeleri | PakSoft', description: 'Google indeksleme sorunlarını inceleyin ve site taşımasında URL eşlemelerini, yönlendirmeleri ve yayın sonrası SEO kontrollerini planlayın.', heading: 'Teknik SEO Rehberleri', intro: 'Google’da görünmeyen bir sayfayı incelerken hangi veriye bakacağınızı ve site taşımasında hangi adresleri yeniden test edeceğinizi bu rehberlerde bulabilirsiniz.' },
};

/* ------------------------------------------------------------------ visuals */

const aside = (node: ReactNode): SectionVisual => ({ place: 'aside', node });
const art = (name: SeoVisualName, label: string, slotLabels: Record<string, string>, className = 'mx-auto w-full max-w-xl') =>
  <SeoArtwork name={name} loop label={label} slotLabels={slotLabels} className={className} />;

// Each visual appears once per service (heroes included).
const V = {
  robots: () => art('tech-robots-sitemap', 'Temsili robots.txt ve XML site haritası: sepet ve arama sayfaları taramaya kapalı; site haritasındaki bir adres robots kuralıyla çakışıyor ve işaretleniyor', { 'slot-robots': 'robots.txt', 'slot-rule-1': 'Disallow: /sepet', 'slot-rule-2': 'Disallow: /arama', 'slot-rule-3': 'Disallow: /hizmetler', 'slot-robots-note': 'Önemli sayfaları engelleyen kural', 'slot-sitemap': 'XML site haritası', 'slot-url-1': '/hizmetler/web-tasarim', 'slot-url-2': '/blog/seo-nedir', 'slot-url-3': '/hizmetler/seo', 'slot-url-4': '/iletisim' }),
  finding: () => art('tech-finding', 'Temsili geliştirici işi: eski hizmet adresleri ana sayfaya yönleniyor; etkilenen adresler, beklenen davranış ve doğrulama adımı yazılı', { 'slot-title': 'Eski adresler ana sayfaya gidiyor', 'slot-priority': 'Öncelik: yüksek', 'slot-label-1': 'Mevcut davranış', 'slot-value-1': '/hizmet/web → / (ana sayfa)', 'slot-label-2': 'Etkilenen adresler', 'slot-value-2': 'Eski hizmet sayfaları', 'slot-label-3': 'Beklenen sonuç', 'slot-value-3': '/hizmet/web → /hizmetler/web-tasarim', 'slot-label-4': 'Doğrulama', 'slot-value-4': 'Tek adımda 301, hedef 200' }),
  cwv: () => art('tech-cwv', 'Temsili Core Web Vitals görünümü: LCP ana içeriğin yüklenmesi, INP etkileşime yanıt, CLS görsel kayma; örnekte INP iyileştirme gerektiriyor', { 'slot-tag': 'Temsili durum', 'slot-metric-1': 'LCP', 'slot-desc-1': 'Ana içeriğin yüklenmesi', 'slot-state-1': 'İyi', 'slot-metric-2': 'INP', 'slot-desc-2': 'Etkileşime yanıt', 'slot-state-2': 'İyileştirme gerekli', 'slot-metric-3': 'CLS', 'slot-desc-3': 'Görsel kayma', 'slot-state-3': 'İyi' }),
  crawl: (className?: string) => art('tech-crawl-index', 'Bir sayfanın aramaya ulaşma adımları: keşif, tarama, oluşturma, indeksleme ve arama sonucu; her adım denetimde ayrı kontrol ediliyor', { 'slot-stage-1': 'Keşif', 'slot-sub-1': 'Site haritası', 'slot-stage-2': 'Tarama', 'slot-sub-2': 'HTTP yanıtı', 'slot-stage-3': 'Oluşturma', 'slot-sub-3': 'JavaScript', 'slot-stage-4': 'İndeksleme', 'slot-sub-4': 'Canonical', 'slot-stage-5': 'Sonuç', 'slot-sub-5': 'Gösterim' }, className),
  canonical: () => art('tech-canonical', 'Temsili canonical kontrolü: renk parametresi, kampanya parametresi ve http sürümü aynı ürün sayfasını açıyor; üçü de tercih edilen /urun adresini canonical olarak gösteriyor', { 'slot-head-dup': 'Aynı içeriği açan adresler', 'slot-head-can': 'Tercih edilen adres', 'slot-dup-1': '/urun?renk=siyah', 'slot-dup-2': '/urun?utm_source=eposta', 'slot-dup-3': 'http://siteniz.com/urun', 'slot-target': '/urun', 'slot-target-sub': 'rel="canonical" hedefi' }),
  status: () => art('tech-status', 'Temsili URL denetimi: HTTP yanıtı 200, meta robots index, canonical sayfanın kendisi; sonuç indekslenebilir', { 'slot-url': 'https://siteniz.com/hizmetler/web-tasarim', 'slot-check-1': 'HTTP yanıtı', 'slot-value-1': '200', 'slot-check-2': 'Meta robots', 'slot-value-2': 'index', 'slot-check-3': 'Canonical', 'slot-value-3': 'Sayfanın kendisi', 'slot-verdict': 'İndekslenebilir' }),
  findings: () => art('priority-board', 'Temsili denetim çıktısı: noindex etiketi, yönlendirme zinciri ve büyük ana görsel; her bulgu için etkilenen şablon ve sorumlu', { 'slot-board': 'Örnek denetim çıktısı', 'slot-col-1': 'Bulgu', 'slot-col-2': 'Etkilenen şablon', 'slot-col-3': 'Sorumlu', 'slot-find-1': 'Yanlışlıkla noindex', 'slot-find-2': 'Yönlendirme zinciri', 'slot-find-3': 'Büyük ana görsel', 'slot-page-1': 'Kategori sayfaları', 'slot-page-2': 'Eski hizmet adresleri', 'slot-page-3': 'Ürün şablonu', 'slot-owner-1': 'Geliştirici', 'slot-owner-2': 'PakSoft', 'slot-owner-3': 'Geliştirici', 'slot-progress': 'Doğrulanan düzeltmeler' }),
  sources: (className?: string) => art('tech-sources', 'Üç veri kaynağı aynı URL için: site taraması yanıt kodlarını, Search Console Google verisini, tarayıcı testi yükleme sırasını gösteriyor', { 'slot-src-1': 'Site taraması', 'slot-src-2': 'Search Console', 'slot-src-3': 'Tarayıcı testi', 'slot-url': '/kategori/yeni-urunler', 'slot-tag': 'Temsili veri' }, className),
  render: () => art('tech-render', 'Temsili oluşturma farkı: ilk HTML yanıtında ürün listesi yok; JavaScript çalıştıktan sonra oluşturulan sayfada ürün listesi ve bağlantılar görünüyor', { 'slot-raw': 'İlk HTML yanıtı', 'slot-raw-missing': 'Ürün listesi bulunmuyor', 'slot-js': 'JS', 'slot-rendered': 'Oluşturulan sayfa', 'slot-rendered-content': 'Ürün listesi ve bağlantılar' }),
  rail: () => <IkasVisual name="process-rail" loop label="Teknik SEO çalışmasının beş adımı: kapsam ve erişimler, başlangıç kaydı, önceliklendirme, uygulama ve canlı sitede yeniden test" className="mt-8 hidden lg:block" slotLabels={{ 'slot-step-1': 'Kapsam', 'slot-step-2': 'Başlangıç kaydı', 'slot-step-3': 'Önceliklendirme', 'slot-step-4': 'Uygulama', 'slot-step-5': 'Yeniden test' }} />,
  redirects: () => art('redirect-map', 'Temsili site yenilemesi: eski hizmet adresleri kalıcı yönlendirmeyle içerik olarak karşılık gelen yeni sayfalara bağlanıyor', { 'slot-old-head': 'Eski adres', 'slot-new-head': 'Yeni adres', 'slot-old-1': '/hizmet/web', 'slot-old-2': '/hizmet.php?id=7', 'slot-old-3': '/referanslar', 'slot-new-1': '/hizmetler/web', 'slot-new-2': '/hizmetler/seo', 'slot-new-3': '/projeler', 'slot-code-1': '301', 'slot-code-2': '301', 'slot-code-3': '301' }),
  report: (className?: string) => art('report', 'Temsili yeniden test raporu: yönlendirmeler, canonical hedefleri ve site haritası canlı sitede kontrol edildi; sıradaki iş ürün şablonu hızı', { 'slot-title': 'Yeniden test raporu', 'slot-tag': 'Temsili', 'slot-done-1': 'Yönlendirmeler test edildi', 'slot-done-2': 'Canonical hedefleri doğru', 'slot-done-3': 'Site haritası güncel', 'slot-chart': 'Geçerli sayfa sayısı eğilimi', 'slot-next': 'Sıradaki iş: ürün şablonu hızı' }, className),
  evidence: (className?: string) => art('tech-evidence', 'Teknik SEO örneğinde aranacak kanıt: belirti, müdahale ve doğrulama adımları', { 'slot-col-1': 'Belirti', 'slot-item-1-1': 'Etkilenen URL’ler', 'slot-item-1-2': 'İlk görüldüğü tarih', 'slot-item-1-3': 'Search Console', 'slot-col-2': 'Müdahale', 'slot-item-2-1': 'Değişen kural', 'slot-item-2-2': 'Uygulayan ekip', 'slot-item-2-3': 'Yayın tarihi', 'slot-col-3': 'Doğrulama', 'slot-item-3-1': 'Yeniden test', 'slot-item-3-2': 'Beklenen yanıt', 'slot-item-3-3': 'Kontrol tarihi' }, className),
  quote: (className?: string) => art('quote-groups', 'Temsili teknik SEO teklifi: denetim, uygulama, doğrulama ve takip kalemleri; altyapı geliştirmesi ayrı değerlendiriliyor', { 'slot-group-1': 'Teknik SEO denetimi', 'slot-group-2': 'Düzeltmelerin uygulanması', 'slot-group-3': 'Canlı sitede doğrulama', 'slot-group-4': 'Yayın sonrası takip', 'slot-quote': 'Teknik SEO teklifi', 'slot-extra': 'Altyapı geliştirmesi' }, className),
};

const EK = {
  stacks: () => art('ecom-platforms', 'Teknik SEO incelemesi yapılabilen altyapılar: WordPress, Shopify, ikas ve özel yazılım; her birinde farklı ayar ve şablon alanları kontrol ediliyor', { 'slot-plat-1': 'WordPress', 'slot-focus-1': 'Eklenti · tema', 'slot-plat-2': 'Shopify', 'slot-focus-2': 'Tema · uygulama', 'slot-plat-3': 'ikas', 'slot-focus-3': 'Panel · tema', 'slot-plat-4': 'Özel yazılım', 'slot-focus-4': 'Kod · sunucu' }),
  logs: () => art('log-lines', 'Temsili sunucu kayıtları: Googlebot isteklerinin büyük kısmı filtre ve parametre adreslerine gidiyor, öncelikli kategori ve ürün sayfaları daha az taranıyor', { 'slot-log': 'Sunucu kayıtları · Googlebot', 'slot-line-1': 'GET /kategori?renk=siyah 200', 'slot-line-2': 'GET /kategori?sirala=fiyat 200', 'slot-line-3': 'GET /kategori/yeni-urunler 200', 'slot-line-4': 'GET /arama?q=canta 200', 'slot-line-5': 'GET /urun/model-a 200', 'slot-line-6': 'GET /kategori?beden=m 200', 'slot-chart': 'Taranan adres grupları', 'slot-group-1': 'Filtre parametreleri', 'slot-group-2': 'İç arama sayfaları', 'slot-group-3': 'Kategori sayfaları', 'slot-group-4': 'Ürün sayfaları' }),
  crawl: () => art('crawl-table', 'Temsili site taraması çıktısı: adres, durum kodu, canonical ve iç bağlantı sayısı; 404 veren adres ve başka adresi canonical gösteren sayfa işaretleniyor', { 'slot-h-url': 'Adres', 'slot-h-status': 'Durum', 'slot-h-canon': 'Canonical', 'slot-h-links': 'İç bağlantı', 'slot-url-1': '/hizmetler/seo', 'slot-st-1': '200', 'slot-canon-1': 'Kendisi', 'slot-links-1': 'Çok', 'slot-url-2': '/hizmet/seo', 'slot-st-2': '301', 'slot-canon-2': '—', 'slot-links-2': 'Az', 'slot-url-3': '/blog/seo-nedir?utm=x', 'slot-st-3': '200', 'slot-canon-3': 'Başka adres', 'slot-links-3': 'Az', 'slot-url-4': '/eski-kampanya', 'slot-st-4': '404', 'slot-canon-4': '—', 'slot-links-4': 'Var', 'slot-url-5': '/iletisim', 'slot-st-5': '200', 'slot-canon-5': 'Kendisi', 'slot-links-5': 'Çok' }),
  migration: () => art('migration-phases', 'Site taşıma kontrolleri: öncesinde adres listesi ve eşleme, yayın gününde yönlendirme ve robots kontrolü, sonrasında Search Console ve tekrar tarama', { 'slot-phase-1': 'Taşıma öncesi', 'slot-item-1-1': 'Adres listesi', 'slot-item-1-2': 'Eski-yeni eşleme', 'slot-item-1-3': 'Başlangıç kaydı', 'slot-item-1-4': 'Test ortamı', 'slot-phase-2': 'Yayın günü', 'slot-item-2-1': '301 yönlendirmeler', 'slot-item-2-2': 'robots ve noindex', 'slot-item-2-3': 'Site haritası', 'slot-item-2-4': 'Canonical hedefleri', 'slot-phase-3': 'Yayın sonrası', 'slot-item-3-1': 'Search Console', 'slot-item-3-2': 'Tekrar tarama', 'slot-item-3-3': '404 takibi', 'slot-item-3-4': 'İç bağlantılar' }),
  drop: () => art('traffic-drop', 'Temsili trafik düşüşü incelemesi: düşüş bir yayın tarihine denk geliyor; etkilenen sayfa grubu kategori sayfaları, ilk kontrol yönlendirme ve indeksleme ayarları', { 'slot-panel': 'Organik tıklamalar · temsili', 'slot-tag': 'Temsili veri', 'slot-release': 'Yayın kaydı', 'slot-group': 'Etkilenen grup: kategori sayfaları', 'slot-first': 'İlk kontrol: yönlendirme ve noindex' }),
  hreflang: () => art('hreflang-pair', 'Temsili hreflang düzeltmesi: Türkçe ürün sayfası doğru Almanca karşılığına, Almanca sayfa da Türkçe sayfaya karşılıklı dil bağlantısı veriyor', { 'slot-tr-lang': 'tr', 'slot-tr-url': '/tr/urun/canta', 'slot-tr-price': 'TL', 'slot-tr-ship': 'hreflang="de" → /de/…/tasche', 'slot-de-lang': 'de', 'slot-de-url': '/de/produkt/tasche', 'slot-de-price': 'EUR', 'slot-de-ship': 'hreflang="tr" → /tr/urun/canta', 'slot-hreflang': 'karşılıklı' }),
};

const VISUALS: SeoServiceConfig['visuals'] = {
  overview: [
    ['Teknik SEO denetimi (SEO audit)', aside(V.robots())],
    ['Bir bulguyu nasıl düzeltme', aside(V.finding())],
    ['Site hızı ve Core Web Vitals', aside(V.cwv())],
    ['Hangi altyapılarda teknik SEO', aside(EK.stacks())],
  ],
  features: [
    ['Teknik SEO kontrol listesi', aside(V.canonical())],
    ['Aynı belirti için', aside(V.status())],
    ['Örnek teknik SEO denetimi', aside(V.findings())],
    ['Tarama bütçesi ve sunucu', aside(EK.logs())],
  ],
  technologies: [
    ['Ölçümleri nasıl yorumluyoruz', aside(V.render())],
    ['Screaming Frog ile', aside(EK.crawl())],
    ['Denetim için hangi erişimler', aside(<IkasVisual name="project-brief" loop label="Temsili denetim hazırlığı: site adresi, öncelikli sayfalar, Search Console erişimi ve altyapı bilgisi" className="mx-auto w-full max-w-xl" />)],
  ],
  process: [
    ['Teknik SEO çalışmasının 5 adımı', { place: 'below', node: V.rail() }],
    ['Örnek uygulama', aside(V.redirects())],
    ['Site taşımasında hangi kontrol', aside(EK.migration())],
    ['Ani organik trafik düşüşünde', aside(EK.drop())],
  ],
  portfolio: [
    ['Temsili örnek — Çok dilli', aside(EK.hreflang())],
    ['Bir teknik SEO örneğinde', aside(V.report())],
  ],
  pricing: [
    ['Üç örnek teklif kapsamı', aside(<IkasVisual name="method-options" loop label="Üç teklif kapsamı: yalnızca denetim, denetim ve uygulama, denetim ile düzenli takip" slotLabels={{ 'slot-option-1': 'Yalnızca denetim', 'slot-option-2': 'Denetim + uygulama', 'slot-option-3': 'Düzenli takip' }} className="mx-auto w-full max-w-xl" />)],
  ],
};

const HERO_ART: SeoServiceConfig['heroArt'] = {
  features: () => V.crawl('w-full'),
  technologies: () => V.sources('w-full'),
  process: () => <ProcessScene />,
  portfolio: () => V.evidence('w-full'),
  pricing: () => V.quote('w-full'),
};

const ROTATING: SeoServiceConfig['rotating'] = {
  features: { lead: 'Teknik SEO', words: ['Denetimi', 'Kontrol Listesi', 'SEO Audit'] },
  technologies: { lead: 'Teknik SEO', words: ['Analizi', 'Araçları', 'Ölçüm Yöntemleri'] },
  process: { lead: 'Teknik SEO', words: ['Süreci', 'Önceliklendirme', 'Yeniden Test'] },
  portfolio: { lead: 'Teknik SEO', words: ['Örnekleri', 'Senaryoları', 'Doğrulama Kanıtları'] },
  pricing: { lead: 'Teknik SEO', words: ['Fiyatları', 'SEO Audit Maliyeti', 'Teklif Kapsamı'] },
  faq: { lead: 'Teknik SEO', words: ['Nedir?', 'Sık Sorulanlar', 'Denetim Soruları'] },
  blog: { lead: 'Teknik SEO', words: ['Rehberleri', 'İndeksleme', 'Site Taşıma'] },
};

const PRIMARY: Record<SeoPageKind, string> = { overview: 'Teknik SEO Teklifi Al', features: 'Teknik SEO Denetimi İçin Teklif Al', technologies: 'Teknik SEO Denetimi İçin Teklif Al', process: 'Teknik SEO Denetimi İçin Teklif Al', portfolio: 'Teknik SEO İncelemesi İçin Teklif Al', pricing: 'Teknik SEO Teklifi Al', faq: 'Teknik SEO Denetimi İçin Teklif Al', blog: 'Teknik SEO Denetimi İçin Teklif Al' };
const SECONDARY: SeoServiceConfig['secondary'] = {
  features: ['Kontrol Listesini İncele', '#teknik-seo-kontrol-listesi'], technologies: ['Araçları İncele', '#teknik-seo-araclari'], process: ['Beş Adımı İncele', '#teknik-seo-adimlari'],
  portfolio: ['Örnekleri İncele', '#teknik-seo-ornekleri'], pricing: ['Teklif Kalemlerini İncele', '#teknik-seo-teklif-kalemleri'], faq: ['Sorulara Göz At', ''],
};
const CLOSING_LINK: SeoServiceConfig['closingLink'] = {
  overview: ['Teknik SEO Sürecini İncele', `${base}/surec`], features: ['Teknik SEO Sürecini İncele', `${base}/surec`], technologies: ['Teknik SEO Sürecini İncele', `${base}/surec`],
  process: ['Denetim Kapsamını İncele', `${base}/ozellikler`], portfolio: ['Teknik SEO Sürecini İncele', `${base}/surec`], pricing: ['Teknik SEO Sürecini İncele', `${base}/surec`], faq: ['Teknik SEO Fiyatlarını İncele', `${base}/fiyatlandirma`],
};

const JUMP_LABELS: [string, string][] = [
  ['Teknik SEO denetimine ne zaman', 'Ne zaman gerekir?'], ['Teknik SEO denetimi (SEO audit)', 'Denetim kapsamı'], ['Bir bulguyu nasıl düzeltme', 'Bulgudan işe'], ['Site hızı ve Core Web Vitals', 'Site hızı ve CWV'],
  ['Denetim sonunda', 'Teslimatlar'], ['Teknik SEO, SEO danışmanlığı', 'Hangi hizmet?'], ['Sık sorulan', 'SSS'],
  ['Teknik SEO kontrol listesi', 'Kontrol listesi'], ['Aynı belirti için', 'Üç kontrol'], ['Örnek teknik SEO denetimi', 'Örnek çıktı'],
  ['Teknik SEO analizinde', 'Araçlar'], ['Ölçümleri nasıl', 'Yorumlama'], ['Örnek inceleme', 'Örnek inceleme'], ['Denetim için hangi erişimler', 'Erişimler'],
  ['Teknik SEO çalışmasının 5 adımı', 'Beş adım'], ['Örnek uygulama', 'Örnek uygulama'], ['Hangi işi kim', 'Sorumluluklar'], ['İlk görüşmeye', 'Hazırlık'],
  ['Temsili uygulama örnekleri', 'Senaryolar'], ['Bir teknik SEO örneğinde', 'Kanıtlar'],
  ['Teknik SEO ile içerik', 'Teknik ve içerik'], ['Hangi altyapılarda teknik SEO', 'Altyapılar'],
  ['Tarama bütçesi ve sunucu', 'Tarama bütçesi'], ['Mobil içerik ve dil', 'Mobil ve dil'],
  ['Screaming Frog ile', 'Screaming Frog'], ['Google Search Console mülkü', 'Search Console'],
  ['Site taşımasında hangi kontrol', 'Taşıma kontrolleri'], ['Ani organik trafik düşüşünde', 'Trafik düşüşü'],
  ['Temsili örnek — JavaScript', 'JavaScript örneği'], ['Temsili örnek — Çok dilli', 'Hreflang örneği'],
  ['Denetim ücreti ve uygulama', 'Denetim ve uygulama'], ['Site büyüklüğü denetim', 'Site büyüklüğü'],
  ['Teklifte hangi işler', 'Teklif kalemleri'], ['Teknik SEO ve SEO audit', 'Fiyatı etkileyenler'], ['Üç örnek teklif', 'Örnek kapsamlar'], ['Teklif almak için', 'Teklif hazırlığı'], ['Fiyatlandırma hakkında', 'Fiyat SSS'],
];

const SECTION_IDS: Record<string, string> = {
  'overview:Teknik SEO denetimi (SEO audit) neleri inceler?': 'teknik-seo-kapsami',
  'features:Teknik SEO kontrol listesi: denetimdeki yedi alan': 'teknik-seo-kontrol-listesi',
  'technologies:Teknik SEO analizinde hangi soruya hangi araçla yanıt arıyoruz?': 'teknik-seo-araclari',
  'process:Teknik SEO çalışmasının 5 adımı': 'teknik-seo-adimlari',
  'portfolio:Temsili uygulama örnekleri': 'teknik-seo-ornekleri',
  'pricing:Teklifte hangi işler yer alabilir?': 'teknik-seo-teklif-kalemleri',
};

const service = createSeoService({
  platform: 'technical-seo',
  contentDir: 'content/technical-seo/tr',
  base,
  enquiry: TECHNICAL_SEO_TR_ENQUIRY,
  serviceName: 'Teknik SEO',
  parentCrumb: { label: 'SEO Hizmeti', href: '/tr/hizmetler/seo' },
  Icon: WrenchScrewdriverIcon,
  metadata,
  visuals: VISUALS,
  heroArt: HERO_ART,
  rotating: ROTATING,
  primary: PRIMARY,
  secondary: SECONDARY,
  closingLink: CLOSING_LINK,
  closingDefault: { title: 'Sitenizin teknik SEO önceliklerini belirleyelim', text: 'Site adresinizi, en önemli sayfalarınızı ve gözlemlediğiniz sorunu paylaşın. Denetim, uygulama ve doğrulama kapsamını birlikte belirleyelim.' },
  jumpLabels: JUMP_LABELS,
  sectionIds: SECTION_IDS,
  portfolioBadge: 'Temsili senaryo',
  blog: { id: 'teknik-seo-rehberleri', title: 'İndeksleme ve site taşıma kontrollerini planlayın', text: 'Google’da görünmeyen sayfaları incelemek ve site taşımasını güvenle tamamlamak için hazırlanmış teknik SEO rehberleri.', asideTitle: 'Rehberleri kendi sitenize uygulayalım', asideText: 'Sorun gördüğünüz bir URL’yi ve varsa Search Console durumunu paylaşın.', guides: getTechnicalSeoGuides },
});

export const getTechnicalSeoMeta = service.getMeta;
export const getTechnicalSeoSocialMeta = service.getSocialMeta;
export const TechnicalSeoTurkishOverviewBody = service.OverviewBody;
export default service.Page;
