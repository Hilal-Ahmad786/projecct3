import type { ReactNode } from 'react';
import { ArrowDownIcon, ArrowRightIcon, CheckCircleIcon, MagnifyingGlassIcon, PhoneIcon } from '@heroicons/react/24/outline';
import type { SectionVisual } from '@/components/e-commerce/ServiceMarkdownPage';
import SeoArtwork from '@/components/seo/visuals/SeoArtwork';
import type { SeoVisualName } from '@/components/seo/visuals/generated';
import { createSeoService, type SeoMeta, type SeoPageKind, type SeoServiceConfig } from './seo-pages/SeoServiceEngine';
import { getGoogleSearchAdsGuides } from '@/components/services/service-blogs/google-search-ads';

export const GOOGLE_SEARCH_ADS_TR_BASE = '/tr/hizmetler/google-search-ads';
export const GOOGLE_SEARCH_ADS_TR_ENQUIRY = '/tr/start-project?service=google-search-ads';

const metadata: Record<SeoPageKind, SeoMeta> = {
  overview: {
    title: 'Google Arama Ağı Reklamları ve Yönetimi | PakSoft',
    description: 'PakSoft ile Google Arama Ağı reklamlarınızı kurun ve yönetin. Arama terimlerini, açılış sayfalarını ve nitelikli başvuruları birlikte değerlendirelim.',
    heading: 'Google Arama Ağı Reklamları',
    intro: 'Müşterileriniz sunduğunuz hizmeti aradığında, onları doğru teklif veya satış sayfasına yönlendirin. PakSoft olarak Google arama reklamlarınız için arama terimlerini, reklam metnini ve açılış sayfasını birlikte planlıyor, hangi taleplerin işletmeniz için değerli olduğunu ölçüyoruz.',
  },
  features: {
    title: 'Arama Ağı Reklamları: Özellikler ve Reklam Türleri | PakSoft',
    description: 'Duyarlı arama ağı reklamları, arama öğeleri, eşleme türleri ve negatif anahtar kelimelerle Arama Ağı kampanyanızın kapsamını belirleyin.',
    heading: 'Google Arama Ağı Reklamlarının Özellikleri',
    intro: 'Arama kampanyanızda hangi sorgulara yanıt vereceğinizi, hangi reklam mesajlarını kullanacağınızı ve telefon taleplerini nasıl ele alacağınızı belirleyin. PakSoft ile mevcut hesabınızın yapısına ve satış hedefinize göre reklam biçimlerini, eşleme türlerini ve kampanya kontrollerini planlayın.',
  },
  technologies: {
    title: 'Arama Ağı Dönüşüm Takibi, GA4 ve GTM | PakSoft',
    description: 'Arama Ağı reklamlarında form, telefon ve nitelikli başvuruları Google Ads, GA4, GTM ve uygun CRM bağlantılarıyla nasıl ölçtüğümüzü inceleyin.',
    heading: 'Arama Ağı Reklamlarında Dönüşüm Takibi',
    intro: 'Bir reklam tıklamasından sonra kaç kişinin form gönderdiğini, telefonu aramaya çalıştığını veya satış ekibiniz için uygun bir talep oluşturduğunu ayrı ayrı görün. PakSoft olarak Google Ads, Google Analytics 4 (GA4) ve Google Tag Manager (GTM) ile işletmenizin doğrulayabildiği sonuçlara göre ölçüm planı kuruyoruz.',
  },
  process: {
    title: 'Google Arama Ağı Kampanya Kurulum Süreci | PakSoft',
    description: 'PakSoft ile Arama Ağı kampanyanızın hedeflerini belirleyin. Kurulum, yayın kontrolleri ve başvuru kalitesi değerlendirmesinin nasıl ilerlediğini görün.',
    heading: 'Google Arama Ağı Kampanya Kurulum Süreci',
    intro: 'İlk görüşmede hangi hizmeti, hangi bölgede ve hangi hedefle tanıtacağınızı netleştiriyoruz. PakSoft olarak kampanya taslağını onayınıza sunuyor, yayın öncesinde sayfa ve dönüşüm kontrollerini yapıyor, sonrasında gelen talepleri ekibinizle birlikte değerlendiriyoruz.',
  },
  portfolio: {
    title: 'Arama Ağı Reklamları Portföyü ve Kampanya Örnekleri | PakSoft',
    description: 'Arama Ağı reklamlarında ilgisiz sorgu, yarım kalan form ve niteliksiz başvuru sorunlarını nasıl incelediğimizi temsili örneklerle görün.',
    heading: 'Arama Ağı Reklamları Portföyü ve Kampanya Örnekleri',
    intro: 'Reklamınız tıklama alırken başvurular neden yarım kalıyor? Gelen talepler neden teklif aşamasına ilerlemiyor? Aşağıdaki temsili örneklerde, Arama Ağı kampanyalarında sorunu hangi verilerle araştırdığımızı ve bir değişikliğin etkisini nasıl kontrol ettiğimizi görebilirsiniz.',
  },
  pricing: {
    title: 'Google Arama Reklamları Fiyatları ve Teklif | PakSoft',
    description: 'Google Arama reklamları fiyatlarını belirleyen bütçe, kurulum ve yönetim kalemlerini inceleyin. PakSoft’tan kampanyanıza özel teklif alın.',
    heading: 'Google Arama Reklamları Fiyatları Nasıl Belirlenir?',
    intro: 'Google’a ödediğiniz reklam harcaması ile kampanyayı kurma ve yönetme ücreti ayrı kalemlerdir. PakSoft olarak hizmet sayınızı, hedef bölgelerinizi ve dönüşüm takibi ihtiyacınızı inceleyip teklifinize hangi işlerin dahil olduğunu açıklıyoruz.',
  },
  faq: {
    title: 'Google Arama Ağı Reklamları SSS | PakSoft',
    description: 'Google Arama Ağı reklamları nasıl verilir? Reklam görünürlüğü, telefon aramaları, hesap erişimi ve başvuru takibiyle ilgili soruların yanıtlarını okuyun.',
    heading: 'Google Arama Ağı Reklamları Sık Sorulan Sorular',
    intro: 'İlk reklamınızı hazırlıyor veya çalışan bir kampanyayı değerlendiriyor olabilirsiniz. Hesap erişimi, reklam gösterimi ve gelen taleplerin ölçümüyle ilgili soruların yanıtlarını burada bulabilirsiniz.',
  },
  blog: {
    title: 'Arama Ağı Reklamları Rehberleri | PakSoft',
    description: 'İlk Google Arama Ağı kampanyanızı planlayın. Arama terimlerini okumayı ve negatif anahtar kelime kararlarını örneklerle öğrenin.',
    heading: 'Arama Ağı Reklamları Rehberleri',
    intro: 'İlk kampanyanın taslağından yayındaki arama terimlerinin incelenmesine kadar adım adım ilerleyin. Her rehberde gerçek hesap verisi gerektirmeden uygulayabileceğiniz temsili bir örnek ve kontrol listesi bulabilirsiniz.',
  },
};

const aside = (node: ReactNode): SectionVisual => ({ place: 'aside', node });
const art = (name: SeoVisualName, label: string, slotLabels: Record<string, string> = {}, className = 'mx-auto w-full max-w-xl') =>
  <SeoArtwork name={name} loop label={label} slotLabels={slotLabels} className={className} />;

/** A conceptual ad-to-enquiry path. All visible text is present without JS. */
export function GoogleSearchAdsHeroVisual() {
  return (
    <figure className="gsa-hero-visual mx-auto w-full max-w-[34rem]" role="img" aria-label="Temsili arama akışı: endüstriyel su arıtma araması, sponsorlu reklam, teklif formu ve işletme için uygun talep">
      <div aria-hidden="true" className="gsa-visual-panel rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_24px_70px_rgba(18,25,38,0.12)] sm:p-6">
        <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600 ring-1 ring-gray-100">
          <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-heritage-turquoise-deep" />
          <span>“endüstriyel su arıtma servisi”</span>
        </div>
        <div className="my-3 flex justify-center text-heritage-turquoise-deep"><ArrowDownIcon className="h-5 w-5" /></div>
        <div className="gsa-visual-card rounded-xl border border-heritage-turquoise/30 bg-white p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-heritage-turquoise-deep"><span className="rounded border border-heritage-turquoise/30 px-1.5 py-0.5">Sponsorlu</span><span>Arıtma sistemi bakım servisi</span></div>
          <p className="mt-2 text-sm font-semibold text-gray-900">Endüstriyel Su Arıtma Bakımı</p>
          <p className="mt-1 text-xs leading-5 text-gray-600">Tesisinizin bakım kapsamını ve servis bölgelerini inceleyin.</p>
        </div>
        <div className="my-3 flex justify-center text-heritage-turquoise-deep"><ArrowDownIcon className="h-5 w-5" /></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-heritage-ivory p-4"><div className="flex items-center gap-2 text-sm font-semibold text-gray-900"><PhoneIcon className="h-4 w-4 text-heritage-turquoise-deep" />Teklif formu</div><p className="mt-1 text-xs leading-5 text-gray-600">Tesis ve ihtiyaç bilgisi iletilir.</p></div>
          <div className="rounded-xl bg-heritage-turquoise-light p-4"><div className="flex items-center gap-2 text-sm font-semibold text-gray-900"><CheckCircleIcon className="h-4 w-4 text-heritage-turquoise-deep" />Uygun talep</div><p className="mt-1 text-xs leading-5 text-gray-600">İşletmenin değerlendirebildiği başvuru.</p></div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-gray-500">Temsili arama ve başvuru akışı</figcaption>
    </figure>
  );
}

// Every illustration gets its own Turkish slot text: an unlabelled SVG renders
// as empty boxes. Examples follow the page copy (su arıtma servisi, teknik servis).
const V = {
  rsa: (className?: string) => art('gads-rsa', 'Temsili duyarlı arama ağı reklamı: başlıklar ve açıklamalar, site bağlantıları, arama öğesi ve konum öğesi', { 'slot-domain': 'siteniz.com › su-aritma-bakimi', 'slot-headline': 'Endüstriyel Su Arıtma Bakımı | Yerinde Servis', 'slot-sitelink-1': 'Bakım kapsamı', 'slot-sitelink-2': 'Servis bölgeleri', 'slot-sitelink-3': 'Tesis türleri', 'slot-sitelink-4': 'Teklif formu', 'slot-call': 'Ara', 'slot-loc': 'Konum', 'slot-part-1': 'Başlıklar (15’e kadar)', 'slot-part-2': 'Açıklamalar (4’e kadar)', 'slot-part-3': 'Site bağlantıları', 'slot-part-4': 'Arama ve konum' }, className),
  goals: () => art('gads-goals', 'İşletme türüne göre Arama Ağı hedefi: bölgesel hizmet işletmesinde form ve arama, B2B üreticide nitelikli teklif talebi, mağazada belirli ürün grubunun satışı', { 'slot-biz-1': 'Hizmet işletmesi', 'slot-biz-sub-1': 'Bölgesel talep', 'slot-goal-label-1': 'Hedef', 'slot-goal-1': 'Form ve arama', 'slot-camp-label-1': 'Kampanya', 'slot-camp-1': 'Hizmet + bölge', 'slot-biz-2': 'B2B üretici', 'slot-biz-sub-2': 'Teklif talebi', 'slot-goal-label-2': 'Hedef', 'slot-goal-2': 'Nitelikli talep', 'slot-camp-label-2': 'Kampanya', 'slot-camp-2': 'Ürün + kullanım', 'slot-biz-3': 'Mağaza', 'slot-biz-sub-3': 'Ürün grubu', 'slot-goal-label-3': 'Hedef', 'slot-goal-3': 'Satın alma', 'slot-camp-label-3': 'Kampanya', 'slot-camp-3': 'Ürün grubu' }),
  terms: () => art('gads-search-terms', 'Temsili arama terimleri raporu: ilgili sorgular korunuyor, iş ilanı ve ev tipi filtre gibi hizmet dışı sorgular negatif anahtar kelime olarak değerlendiriliyor', { 'slot-report': 'Arama terimleri raporu · temsili', 'slot-h-term': 'Arama terimi', 'slot-h-action': 'Karar', 'slot-term-1': 'endüstriyel su arıtma servisi', 'slot-action-1': 'Koru', 'slot-term-2': 'su arıtma bakım iş ilanı', 'slot-action-2': 'Negatif ekle', 'slot-term-3': 'su arıtma tesisi bakım teklifi', 'slot-action-3': 'Koru', 'slot-term-4': 'ev tipi su arıtma filtresi', 'slot-action-4': 'Negatif değerlendir', 'slot-term-5': 'arıtma sistemi yedek parça', 'slot-action-5': 'Ayrı reklam grubu' }),
  match: () => art('gads-search-terms', 'Eşleme türü ve negatif kelime kararları: tam eşlemeli anahtar kelimeyi tetikleyen yakın sorgu korunuyor, eğitim ve ikinci el gibi ilgisiz sorgular negatif listeye ekleniyor', { 'slot-report': 'Eşleme ve negatifler · temsili', 'slot-h-term': 'Tetiklenen arama', 'slot-h-action': 'Karar', 'slot-term-1': 'kompresör bakım servisi', 'slot-action-1': 'Koru · tam', 'slot-term-2': 'kompresör bakımı nasıl yapılır', 'slot-action-2': 'Negatif ekle', 'slot-term-3': 'vidalı kompresör servisi', 'slot-action-3': 'Koru · sıralı', 'slot-term-4': 'ikinci el kompresör', 'slot-action-4': 'Negatif ekle', 'slot-term-5': 'kompresör yağı fiyatları', 'slot-action-5': 'İzle' }),
  actions: () => art('gads-conversion-actions', 'Arama Ağı dönüşüm eylemleri: başarılı form gönderimi ve reklamdan gelen uygun süreli arama birincil, web sitesindeki telefon tıklaması ve teklif düğmesi tıklaması gözlem amaçlı ikincil', { 'slot-h-action': 'Dönüşüm eylemi', 'slot-h-role': 'Kullanım', 'slot-act-1': 'Başarılı form gönderimi', 'slot-act-sub-1': 'Teşekkür sayfası veya başarı olayı', 'slot-role-1': 'Birincil', 'slot-act-2': 'Reklamdan gelen arama', 'slot-act-sub-2': 'Belirlenen sürenin üzerindeki aramalar', 'slot-role-2': 'Birincil', 'slot-act-3': 'Sitede telefon tıklaması', 'slot-act-sub-3': 'Görüşme yapıldığını tek başına göstermez', 'slot-role-3': 'İkincil · gözlem', 'slot-act-4': '“Teklif Al” düğmesi tıklaması', 'slot-act-sub-4': 'Formun gönderildiğini göstermez', 'slot-role-4': 'İkincil · gözlem' }),
  weekly: () => art('monthly-plan', 'Arama Ağı kontrol takvimi: haftalık arama terimleri ve reklam öğeleri, aylık bütçe dağılımı ile açılış sayfası ve başvuru kalitesi kararları', { 'slot-month': 'Kontrol takvimi', 'slot-week-1': 'Her hafta', 'slot-week-2': 'Her hafta', 'slot-week-3': 'Her ay', 'slot-week-4': 'Her ay', 'slot-task-1': 'Arama terimleri', 'slot-task-sub-1': 'Yeni negatifler', 'slot-task-2': 'Reklam öğeleri', 'slot-task-sub-2': 'Başlık ve açıklamalar', 'slot-task-3': 'Bütçe dağılımı', 'slot-task-sub-3': 'Hizmet önceliği', 'slot-task-4': 'Başvuru kalitesi', 'slot-task-sub-4': 'Satış ekibi notu' }),
  tagFlow: (className?: string) => art('gads-tag-flow', 'Ölçüm akışı: sitede gerçekleşen form veya arama, Google Tag Manager’da test edilen etiket ve Google Ads dönüşüm raporu', { 'slot-step-1': 'Site eylemi', 'slot-sub-1': 'Form veya arama', 'slot-step-2': 'Etiket testi', 'slot-sub-2': 'GTM önizleme', 'slot-step-3': 'Dönüşüm raporu', 'slot-sub-3': 'Google Ads ve GA4', 'slot-note': 'Her adım ayrı kontrol edilir; bir adım geçmeden sonraki adıma güvenilmez.' }, className),
  ga4: () => art('gads-ga4-match', 'GA4 olayları ile Google Ads dönüşümleri: form olayı içe aktarılıyor, telefon tıklaması gözlem için izleniyor, sayfa görüntüleme dönüşüm olarak kullanılmıyor', { 'slot-h-ga4': 'GA4 olayı', 'slot-h-ads': 'Google Ads dönüşümü', 'slot-ga4-1': 'generate_lead', 'slot-ads-1': 'Form gönderimi', 'slot-ga4-2': 'phone_click', 'slot-ads-2': 'İkincil · gözlem', 'slot-ga4-3': 'page_view', 'slot-ads-3': 'Dönüşüm olarak kullanılmaz' }),
  offline: () => art('gads-offline', 'Nitelikli talep aktarımı: CRM’de nitelikli talep aşamasına geçen kayıtlar Google Ads’e ayrı bir dönüşüm olarak aktarılıyor', { 'slot-crm': 'CRM aşamaları', 'slot-stage-1': 'Form veya arama', 'slot-stage-2': 'İlk görüşme', 'slot-stage-3': 'Nitelikli talep', 'slot-stage-4': 'Teklif', 'slot-ads': 'Google Ads dönüşümü', 'slot-ads-1': 'Form gönderimi', 'slot-ads-2': 'Nitelikli talep (içe aktarılan)', 'slot-note': 'Aktarım tekrar sayılmamalı; test kaydıyla doğrulanır' }),
  gtm: () => art('gads-gtm-test', 'Temsili GTM önizleme testi: başarılı form gönderiminde ve mobil telefon bağlantısında etiket tetikleniyor, hatalı form denemesinde tetiklenmiyor', { 'slot-panel': 'Etiket testi · önizleme modu', 'slot-mode': 'Önizleme', 'slot-test-1': 'Başarılı form gönderimi', 'slot-result-1': 'Etiket tetiklendi', 'slot-test-2': 'Mobil telefon bağlantısı', 'slot-result-2': 'Etiket tetiklendi', 'slot-test-3': 'Hatalı form denemesi', 'slot-result-3': 'Tetiklenmedi (doğru)', 'slot-log': 'Test tarihi, sayfa ve sorumlu kayda geçirilir' }),
  consent: () => art('gads-consent', 'İzin tercihi ve ölçüm: ziyaretçi izin verdiğinde etiketler tam çalışır; reddettiğinde izin moduna göre sınırlı sinyal gönderilir', { 'slot-banner': 'Çerez izni', 'slot-accept': 'Kabul et', 'slot-reject': 'Reddet', 'slot-banner-note': 'Tercih izin modu ile etiketlere iletilir', 'slot-granted': 'İzin verildi', 'slot-granted-sub': 'Dönüşüm etiketi çalışır; gelişmiş dönüşümler kullanılabilir', 'slot-denied': 'İzin verilmedi', 'slot-denied-sub': 'Çerez kullanılmaz; ölçüm izin modunun sınırlı sinyalleriyle sürer' }),
  rail: () => art('process-rail', 'Arama Ağı kampanya süreci: hedef ve kapsam, kampanya taslağı, ölçüm testi, yayın ve ilk değerlendirme', { 'slot-step-1': 'Hedef ve kapsam', 'slot-step-2': 'Kampanya taslağı', 'slot-step-3': 'Ölçüm testi', 'slot-step-4': 'Yayın ve değerlendirme' }),
  lead: () => art('gads-lead-quality', 'Temsili başvuru kalitesi incelemesi: gelen formların bir kısmı hizmet bölgesi dışından ve ilgisiz sorgulardan geliyor; konum, arama terimi ve form ayarları kontrol ediliyor', { 'slot-forms': 'Gelen formlar', 'slot-lead-1': 'Ankara · bakım talebi', 'slot-lead-2': 'Bölge dışı · bakım', 'slot-lead-3': 'İş başvurusu', 'slot-lead-4': 'Kırıkkale · servis talebi', 'slot-lead-5': 'Filtre satın alma', 'slot-ok': 'Uygun talepler', 'slot-ok-sub': 'Hizmet bölgesi ve hizmet eşleşiyor', 'slot-check': 'Kontrol edilecekler', 'slot-check-1': 'Konum: bölgede bulunan kişiler', 'slot-check-2': 'Arama terimleri ve negatifler', 'slot-check-3': 'Formda hizmet bölgesi sorusu' }),
  report: (className?: string) => art('report', 'Temsili Arama Ağı dönem raporu: negatif terimler eklendi, form ölçümü doğrulandı, reklam metni güncellendi; harcama ve dönüşüm eğilimi; sıradaki iş konum ayarı', { 'slot-title': 'Arama Ağı dönem raporu', 'slot-tag': 'Temsili', 'slot-done-1': 'Negatif terimler eklendi', 'slot-done-2': 'Form ölçümü doğrulandı', 'slot-done-3': 'Reklam metni güncellendi', 'slot-chart': 'Harcama ve dönüşüm', 'slot-next': 'Sıradaki iş: konum ayarı' }, className),
  evidence: (className?: string) => art('tech-evidence', 'Arama Ağı örneklerini değerlendirme: gözlem, müdahale ve doğrulama', { 'slot-col-1': 'Gözlem', 'slot-item-1-1': 'Arama terimleri', 'slot-item-1-2': 'Form tamamlama', 'slot-item-1-3': 'Satış ekibi notu', 'slot-col-2': 'Müdahale', 'slot-item-2-1': 'Negatif terimler', 'slot-item-2-2': 'Form ve ölçüm', 'slot-item-2-3': 'Değişiklik tarihi', 'slot-col-3': 'Doğrulama', 'slot-item-3-1': 'Test dönüşümü', 'slot-item-3-2': 'Karşılaştırma dönemi', 'slot-item-3-3': 'Sonraki karar' }, className),
  caseTerms: () => art('gads-search-terms', 'Temsili örnek 1: teknik servis kampanyasında eğitim ve kurs arayan sorgular ayrılıyor, servis talebi içeren sorgular korunuyor', { 'slot-report': 'Örnek 1 · arama terimleri', 'slot-h-term': 'Arama terimi', 'slot-h-action': 'Karar', 'slot-term-1': 'klima teknik servisi', 'slot-action-1': 'Koru', 'slot-term-2': 'klima teknisyeni kursu', 'slot-action-2': 'Negatif ekle', 'slot-term-3': 'klima arıza servisi yakın', 'slot-action-3': 'Koru', 'slot-term-4': 'teknik servis eğitimi', 'slot-action-4': 'Negatif ekle', 'slot-term-5': 'klima bakım fiyatı', 'slot-action-5': 'İzle' }),
  budget: (className?: string) => art('gads-budget-split', 'Teklif kalemleri: reklam bütçesi Google Ads hesabınızdan Google’a ödenir; yönetim ücreti ve varsa kurulum işleri PakSoft teklifinde ayrı kalemdir', { 'slot-budget': 'Reklam bütçesi', 'slot-budget-sub': 'Kampanya harcaması', 'slot-fee': 'Yönetim ücreti', 'slot-setup': 'Kurulum (tek seferlik)', 'slot-google': 'Google Ads hesabınız', 'slot-google-sub': 'Ödeme doğrudan Google’a', 'slot-paksoft': 'PakSoft teklifi', 'slot-paksoft-sub': 'Yönetim ve kurulum ayrı' }, className),
  adrank: () => art('gads-adrank', 'Reklam sırasını etkileyen etkenler: teklif, reklam kalitesi (beklenen tıklama oranı, reklam alaka düzeyi, açılış sayfası deneyimi) ve arama bağlamı', { 'slot-bid': 'Teklif', 'slot-quality': 'Reklam kalitesi', 'slot-q-1': 'Beklenen tıklama oranı', 'slot-q-2': 'Reklam alaka düzeyi', 'slot-q-3': 'Açılış sayfası deneyimi', 'slot-context': 'Arama bağlamı', 'slot-rank': 'Reklam sırası', 'slot-rank-sub': 'Her açık artırmada yeniden', 'slot-note': 'Tıklama maliyeti bu etkenlere ve rekabete göre değişir; sabit bir tutar yoktur.' }),
  quote: () => art('quote-groups', 'Arama Ağı yönetim teklifini etkileyenler: hizmet ve bölge sayısı, hesap ve ölçüm durumu, açılış sayfası sayısı, raporlama sıklığı; sayfa geliştirme ayrı', { 'slot-group-1': 'Hizmet ve bölge sayısı', 'slot-group-2': 'Hesap ve ölçüm durumu', 'slot-group-3': 'Açılış sayfası sayısı', 'slot-group-4': 'Raporlama sıklığı', 'slot-quote': 'Yönetim ücreti', 'slot-extra': 'Sayfa geliştirme ayrı' }),
};

const visuals: SeoServiceConfig['visuals'] = {
  overview: [
    ['Arama reklamları', aside(V.rsa())],
    ['Arama Ağı kampanyası hangi', aside(V.goals())],
    ['Bir arama terimini reklama', { place: 'below', node: V.terms() }],
    ['Mevcut hesabı', aside(V.report())],
  ],
  features: [
    ['Eşleme türleri', aside(V.match())],
    ['Telefon aramaları', aside(V.actions())],
    ['Düzenli optimizasyonda', aside(V.weekly())],
  ],
  technologies: [
    ['Hangi işlemleri dönüşüm', aside(V.actions())],
    ['Google Ads, GA4 ve GTM', aside(V.ga4())],
    ['Telefon araması ve nitelikli', aside(V.offline())],
    ['İzin tercihleri ve etiketler', aside(V.gtm())],
  ],
  process: [
    ['Arama Ağı kampanyası nasıl ilerler?', { place: 'below', node: V.rail() }],
    ['Yayından önce hangi koşulları', aside(V.consent())],
    ['İlk sonuçlarla hangi kararları', aside(V.lead())],
  ],
  portfolio: [
    ['Üç Arama Ağı kampanya örneği', aside(V.caseTerms())],
    ['Bir kampanya değişikliğinin', aside(V.report())],
  ],
  pricing: [
    ['Başlangıç bütçesini', aside(V.adrank())],
    ['Yönetim teklifini', aside(V.quote())],
  ],
};

const heroArt: SeoServiceConfig['heroArt'] = {
  features: () => V.rsa('w-full'),
  technologies: () => V.tagFlow('w-full'),
  process: () => V.report('w-full'),
  portfolio: () => V.evidence('w-full'),
  pricing: () => V.budget('w-full'),
};

const config: SeoServiceConfig = {
  platform: 'google-search-ads',
  contentDir: 'content/google-search-ads/tr',
  base: GOOGLE_SEARCH_ADS_TR_BASE,
  enquiry: GOOGLE_SEARCH_ADS_TR_ENQUIRY,
  serviceName: 'Google Arama Ağı Reklamları',
  Icon: MagnifyingGlassIcon,
  metadata,
  visuals,
  heroArt,
  rotating: {
    features: { lead: 'Arama Ağı', words: ['Reklam Türleri', 'Eşleme Seçenekleri', 'Kampanya Kontrolleri'] },
    technologies: { lead: 'Arama Ağı', words: ['Dönüşüm Takibi', 'Form ve Telefon Ölçümü', 'Başvuru Verisi'] },
    process: { lead: 'Google Arama Ağı', words: ['Kampanya Kurulumu', 'Yayın Kontrolleri', 'İlk Değerlendirme'] },
    portfolio: { lead: 'Arama Ağı', words: ['Kampanya Örnekleri', 'Temsili Senaryolar', 'Kontrol Adımları'] },
    pricing: { lead: 'Google Arama', words: ['Reklam Fiyatları', 'Bütçe Kalemleri', 'Yönetim Teklifi'] },
    faq: { lead: 'Arama Ağı', words: ['Sık Sorulan Sorular', 'Reklam Görünürlüğü', 'Ölçüm ve Başvurular'] },
    blog: { lead: 'Arama Ağı', words: ['Reklam Rehberleri', 'Kampanya Kurulumu', 'Arama Terimleri'] },
  },
  primary: {
    overview: 'Arama Ağı Teklifi Al', features: 'Arama Kampanyamı Görüşelim', technologies: 'Ölçüm Kurulumumu Görüşelim',
    process: 'Kampanya Planımı Görüşelim', portfolio: 'Kampanyamı İnceleyelim', pricing: 'Arama Ağı Teklifi Al',
    faq: 'Kampanyamı Görüşelim', blog: 'Arama Ağı Hizmetini İncele',
  },
  secondary: {
    features: ['Reklam Biçimlerini İncele', '#arama-reklami-bicimleri'],
    technologies: ['Ölçüm Planını İncele', '#arama-agi-olcum-plani'],
    process: ['Kampanya Adımlarını İncele', '#arama-agi-kampanya-adimlari'],
    portfolio: ['Kampanya Örneklerini Gör', '#arama-agi-kampanya-ornekleri'],
    pricing: ['Maliyet Kalemlerini İncele', '#arama-agi-maliyet-kalemleri'],
    faq: ['Soruları İncele', '#baslangic-ve-erisim'],
  },
  closingLink: {
    overview: ['Kampanya Kurulum Sürecini İncele', `${GOOGLE_SEARCH_ADS_TR_BASE}/surec`],
    features: ['Arama Ağı Genel Bakış', GOOGLE_SEARCH_ADS_TR_BASE],
    technologies: ['Arama Ağı Reklamlarının Özellikleri', `${GOOGLE_SEARCH_ADS_TR_BASE}/ozellikler`],
    process: ['Arama Ağı Fiyatlandırmasını İncele', `${GOOGLE_SEARCH_ADS_TR_BASE}/fiyatlandirma`],
    portfolio: ['Kampanya Kurulum Sürecini İncele', `${GOOGLE_SEARCH_ADS_TR_BASE}/surec`],
    pricing: ['Kampanya Kurulum Sürecini İncele', `${GOOGLE_SEARCH_ADS_TR_BASE}/surec`],
    faq: ['Arama Ağı Fiyatlandırmasını İncele', `${GOOGLE_SEARCH_ADS_TR_BASE}/fiyatlandirma`],
  },
  closingCopy: {
    overview: { title: 'Arama Ağı kampanyanızı birlikte değerlendirelim', text: 'Reklamını vermek istediğiniz hizmeti, hedef bölgenizi ve varsa mevcut kampanyanızdaki sorunu paylaşın. İlk incelemede hangi sorgulara, sayfalara ve dönüşümlere odaklanacağımızı belirleyelim.' },
    features: { title: 'Reklam biçimlerini ve hedeflemenizi birlikte inceleyelim', text: 'Reklamını vermek istediğiniz hizmeti, hedef bölgeyi ve önceliğinizi paylaşın. Telefon, form veya satış hedefinize göre ilk kampanya kapsamını değerlendirelim.' },
    technologies: { title: 'Arama kampanyanızın ölçümünü birlikte kontrol edelim', text: 'Açılış sayfanızı ve takip etmek istediğiniz sonucu paylaşın. Form, telefon veya CRM verilerinden hangisinin kampanya hedefinize uygun olduğunu değerlendirelim.' },
    process: { title: 'Arama Ağı kampanyanızın ilk adımını birlikte planlayalım', text: 'Tanıtmak istediğiniz hizmeti, hedef bölgenizi ve varsa mevcut kampanyanızdaki sorunu paylaşın. İlk görüşmede öncelikleri ve onay adımlarını netleştirelim.' },
    portfolio: { title: 'Kampanyanızdaki bir örneği birlikte inceleyelim', text: 'Reklam sayfanızı ve karşılaştığınız sorunu paylaşın. İlk olarak arama terimlerini, başvuru akışını veya ölçümü incelemek gerekip gerekmediğini birlikte belirleyelim.' },
    pricing: { title: 'Arama Ağı kampanyanız için teklif alın', text: 'Tanıtacağınız hizmeti, hedef bölgenizi ve varsa kampanya adresinizi paylaşın. Reklam bütçesi, kurulum ve yönetim kapsamını birlikte netleştirelim.' },
    faq: { title: 'Arama Ağı kampanyanızla ilgili soruyu birlikte inceleyelim', text: 'Reklamını vermek istediğiniz hizmeti veya mevcut kampanyanızdaki sorunu paylaşın. İlk görüşmede hangi ayarı, sayfayı veya ölçümü kontrol edeceğimizi belirleyelim.' },
  },
  closingDefault: { title: 'Arama Ağı kampanyanızı planlayalım', text: 'Öncelikli hizmetinizi, hedef bölgenizi ve kampanya durumunuzu paylaşın.' },
  jumpLabels: [
    ['Arama reklamları', 'Arama reklamları'], ['Arama Ağı kampanyası hangi', 'Uygun işletmeler'], ['Arama Ağı kampanyası hakkında', 'Sorular'],
    ['Arama Ağı kampanyası nasıl', 'Kampanya adımları'], ['Bir arama terimini', 'Arama örneği'], ['Sürecimiz', 'Süreç'], ['Mevcut hesabı', 'Hesap incelemesi'],
    ['Hangi arama reklamı biçimlerini', 'Reklam biçimleri'], ['Eşleme türleri', 'Eşleme ve negatifler'], ['Telefon aramaları', 'Telefon aramaları'],
    ['Düzenli optimizasyonda', 'Optimizasyon'], ['Hangi işlemleri dönüşüm', 'Dönüşüm eylemleri'], ['Google Ads, GA4 ve GTM', 'Ölçüm araçları'],
    ['Telefon araması ve nitelikli', 'Nitelikli talep'], ['İzin tercihleri', 'İzin ve etiket testi'],
    ['İlk görüşmeye', 'İlk görüşme'], ['Yayından önce', 'Yayın öncesi kontrol'], ['İlk sonuçlarla', 'İlk sonuçlar'],
    ['Üç Arama Ağı kampanya örneği', 'Kampanya örnekleri'], ['Bir kampanya değişikliğinin', 'Etkiyi okumak'], ['Kendi kampanyanızdan', 'Örneğinizi paylaşın'],
    ['Reklam bütçesi, kurulum', 'Maliyet kalemleri'], ['Başlangıç bütçesini', 'Başlangıç bütçesi'], ['Yönetim teklifini', 'Teklifi etkileyenler'],
    ['Teklif almak için', 'Gerekli bilgiler'], ['Fiyatlandırma hakkında', 'Kısa yanıtlar'],
  ],
  sectionIds: {
    'overview:Bir arama terimini reklama ve sayfaya nasıl bağlarız?': 'arama-reklami-ornegi',
    'features:Hangi arama reklamı biçimlerini değerlendiriyoruz?': 'arama-reklami-bicimleri',
    'technologies:Hangi işlemleri dönüşüm olarak izliyoruz?': 'arama-agi-olcum-plani',
    'process:Arama Ağı kampanyası nasıl ilerler?': 'arama-agi-kampanya-adimlari',
    'portfolio:Üç Arama Ağı kampanya örneği': 'arama-agi-kampanya-ornekleri',
    'pricing:Reklam bütçesi, kurulum ve yönetim ücreti': 'arama-agi-maliyet-kalemleri',
    'faq:Başlangıç ve erişim': 'baslangic-ve-erisim',
    'faq:Reklam görünürlüğü': 'reklam-gorunurlugu',
    'faq:Ölçüm ve başvurular': 'olcum-ve-basvurular',
  },
  portfolioBadge: 'Temsili örnek',
  blog: {
    id: 'arama-agi-rehberleri', title: 'Arama Ağı reklamları için pratik rehberler',
    text: 'Kampanya taslağı hazırlamaktan arama terimlerini değerlendirmeye kadar uygulanabilir adımları inceleyin.',
    asideTitle: 'Kampanyanız için ilk adımı belirleyin',
    asideText: 'Tanıtacağınız hizmeti, hedef bölgenizi ve varsa mevcut kampanya durumunuzu paylaşın.',
    guides: getGoogleSearchAdsGuides,
  },
};

const service = createSeoService(config);
export const getGoogleSearchAdsMeta = (page: SeoPageKind) => service.getMeta(page);
export const getGoogleSearchAdsSocialMeta = (page: SeoPageKind, canonicalUrl: string, image?: string) => service.getSocialMeta(page, canonicalUrl, image);
export const GoogleSearchAdsOverviewBody = service.OverviewBody;
export const GoogleSearchAdsTurkishPage = service.Page;
export default service.Page;
