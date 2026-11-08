import type { ReactNode } from 'react';
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';
import type { SectionVisual } from '@/components/e-commerce/ServiceMarkdownPage';
import IkasVisual from '@/components/ikas/visuals/IkasVisual';
import SeoArtwork from '@/components/seo/visuals/SeoArtwork';
import type { SeoVisualName } from '@/components/seo/visuals/generated';
import { getGoogleAdsGuides } from '@/components/services/service-blogs/google-ads';
import { createSeoService, type SeoMeta, type SeoPageKind, type SeoServiceConfig } from './seo-pages/SeoServiceEngine';

export const GOOGLE_ADS_TR_BASE = '/tr/hizmetler/google-ads';
export const GOOGLE_ADS_TR_ENQUIRY = '/tr/start-project?service=google-ads';

const metadata: Record<SeoPageKind, SeoMeta> = {
  overview: { title: 'Google Ads Yönetimi ve Reklam Ajansı | PakSoft', description: 'PakSoft ile Google Ads hesabınızı kurun veya iyileştirin. Arama Ağı, Alışveriş ve Performance Max yönetimi için teklif alın.', heading: 'Google Ads Yönetimi', intro: 'Google Ads kampanyalarınızı satış veya nitelikli başvuru hedefinize göre kuruyor ve yönetiyoruz. PakSoft ile hangi kampanyaya bütçe ayıracağınızı, hangi dönüşümleri takip edeceğinizi ve yapılan değişiklikleri nasıl değerlendireceğinizi birlikte belirleyin. Mevcut hesabınız varsa önce ölçümü, kampanya yapısını ve açılış sayfalarını inceliyoruz.' },
  features: { title: 'Google Ads Yönetimi Hizmet Kapsamı | PakSoft', description: 'Google Ads hesap kurulumu, kampanya optimizasyonu, dönüşüm takibi ve raporlama kapsamında yapılan işleri örneklerle inceleyin.', heading: 'Google Ads Yönetiminde Hangi İşleri Üstleniyoruz?', intro: 'Hesap kurulumu, kampanya yönetimi ve dönüşüm takibi farklı işler gerektirir. Örneğin mevcut kampanyanız form getiriyorsa önce formun gerçekten gönderilip gönderilmediğini ve gelen taleplerin hizmetinize uygunluğunu inceleriz. İlk değerlendirmede hangi kontrollerin yapılacağını, hangi düzenlemeleri üstleneceğimizi ve sonuçları nasıl raporlayacağımızı netleştiririz.' },
  technologies: { title: 'Google Ads Dönüşüm Takibi, GA4 ve GTM | PakSoft', description: 'Google Ads, GA4, Google Tag Manager ve Merchant Center ile form, satış ve ürün verilerinin nasıl doğrulandığını inceleyin.', heading: 'Google Ads Dönüşüm Takibi ve Ölçüm Altyapısı', intro: 'Reklama tıklayan kişinin teklif formu gönderip göndermediğini veya alışverişini tamamlayıp tamamlamadığını nasıl anlarsınız? Google Ads, Google Analytics 4 (GA4) ve Google Tag Manager (GTM) ile mevcut ölçümünüzü inceler, önemli eylemlerin hangi araçta ve hangi koşulda kaydedileceğini belirleriz. Bir form veya sipariş örneği üzerinden sonuçları test ederiz.' },
  process: { title: 'Google Ads Yönetim Süreci ve Kampanya Kurulumu | PakSoft', description: 'Google Ads yönetiminin hedef belirleme, hesap inceleme, ölçüm testi, kampanya yayını ve optimizasyon adımlarını inceleyin.', heading: 'Google Ads Yönetim Süreci Nasıl İlerler?', intro: 'İlk görüşmede hangi ürün veya hizmeti tanıtacağınızı, kimi hedeflediğinizi ve hangi sonucu başarı olarak değerlendireceğinizi birlikte belirleriz. Yeni bir kampanya kuruyorsak yayından önce ölçümü test ederiz. Mevcut bir hesabı devralıyorsak önce hangi kampanyaların çalıştığını ve değişiklikten önce neyi korumamız gerektiğini inceleriz.' },
  portfolio: { title: 'Google Ads Portföyü ve Kampanya Örnekleri | PakSoft', description: 'Arama Ağı, Google Alışveriş ve Performance Max için örnek kampanya sorunlarını, müdahaleleri ve doğrulama adımlarını inceleyin.', heading: 'Google Ads Portföyü ve Kampanya Örnekleri', intro: 'Bir Google Ads çalışmasını değerlendirirken önce kampanyanın hangi iş sonucuna göre yönetildiğine bakın. Teklif talebi alan bir firma ile ürün satan bir mağazanın ölçüm ve kontrol ihtiyaçları farklıdır. Aşağıdaki temsili örnekler, bir sorun görüldüğünde hangi veriyi inceleyeceğimizi ve olası bir düzenlemeyi nasıl doğrulayacağımızı gösterir.' },
  pricing: { title: 'Google Reklam Yönetimi Fiyatları ve Teklif | PakSoft', description: 'Google Ads reklam bütçesi, ajans yönetim ücreti ve kurulum maliyetini ayrı değerlendirin. Kampanyanıza özel teklif alın.', heading: 'Google Reklam Yönetimi Fiyatları Nasıl Belirlenir?', intro: 'Google Ads teklifi alırken üç kalemi ayrı değerlendirin. Reklam bütçesi, kampanyaların yayınlanması için ayrılan harcamadır. Yönetim ücreti, PakSoft’un üstleneceği düzenli işleri kapsar. Dönüşüm takibi kurulumu, ürün verisinin hazırlanması veya açılış sayfası geliştirmesi gerekiyorsa bu işler teklif üzerinde ayrıca belirtilir.' },
  faq: { title: 'Google Ads Yönetimi Sık Sorulan Sorular | PakSoft', description: 'Google Ads hesabı, reklam bütçesi, kampanya seçimi, dönüşüm takibi ve raporlama hakkında sık sorulan soruların yanıtlarını inceleyin.', heading: 'Google Ads Yönetimi Hakkında Sık Sorulan Sorular', intro: 'Google Ads’e ilk kez başlayacaksanız veya mevcut hesabınızı bir ekibe devretmeyi düşünüyorsanız, aşağıdaki yanıtlar hazırlık yapmanıza yardımcı olur. Hesap erişimini nasıl vereceğinizi, bütçenin hangi kalemlerden oluştuğunu ve raporda hangi sonuçları görebileceğinizi öğrenin.' },
  blog: { title: 'Google Ads Rehberleri ve Kampanya İpuçları | PakSoft', description: 'Google Ads reklam bütçenizi planlayın. Tıklama alan ancak dönüşüm getirmeyen kampanyalarda ölçümü, arama terimlerini ve açılış sayfasını kontrol edin.', heading: 'Google Ads Rehberleri', intro: 'İlk kampanyanız için reklam bütçesi belirlerken veya çalışan bir hesabı incelerken hangi veriye bakacağınızı bu rehberlerde bulabilirsiniz.' },
};

const aside = (node: ReactNode): SectionVisual => ({ place: 'aside', node });
const art = (name: SeoVisualName, label: string, slotLabels: Record<string, string>, className = 'mx-auto w-full max-w-xl') =>
  <SeoArtwork name={name} loop label={label} slotLabels={slotLabels} className={className} />;

// Each visual appears once per service (heroes included). Overview hero: GoogleAdsScene.
const V = {
  types: () => art('gads-campaign-types', 'Üç kampanya türü: Arama Ağı reklamları arama sonuçlarında metin reklamı, Alışveriş reklamları ürün kartları, Performance Max ise Arama, YouTube, Gmail, Görüntülü Reklam Ağı ve Haritalar’da birlikte çalışır', { 'slot-type-1': 'Arama Ağı', 'slot-type-sub-1': 'Metin reklamları', 'slot-type-2': 'Google Alışveriş', 'slot-type-sub-2': 'Ürün reklamları', 'slot-type-3': 'Performance Max', 'slot-type-sub-3': 'Tüm Google kanalları', 'slot-pmax-note': 'Tek kampanya, çok kanal' }),
  roles: () => art('role-lanes', 'Google Ads ajansı, uzmanı ve danışmanı: ajans kampanya, ölçüm ve sayfa işlerini ekip olarak üstlenir; uzman hesabı günlük yönetir; danışman karar ve kontrol desteği verir', { 'slot-role-1': 'Google Ads ajansı', 'slot-role-sub-1': 'Ekip ve süreç', 'slot-task-1-1': 'Kampanya yönetimi', 'slot-task-1-2': 'Dönüşüm ölçümü', 'slot-task-1-3': 'Raporlama', 'slot-role-2': 'Google Ads uzmanı', 'slot-role-sub-2': 'Günlük yönetim', 'slot-task-2-1': 'Arama terimleri', 'slot-task-2-2': 'Teklif ve bütçe', 'slot-task-2-3': 'Reklam öğeleri', 'slot-role-3': 'Google Ads danışmanı', 'slot-role-sub-3': 'Karar desteği', 'slot-task-3-1': 'Hesap incelemesi', 'slot-task-3-2': 'İş listesi', 'slot-task-3-3': 'Ekip eğitimi' }),
  account: (className?: string) => art('deliverables', 'Google Ads yönetimi kapsamı: hesap yapısı, kampanya planı, dönüşüm ölçümü ve rapor', { 'slot-doc-1': 'Hesap yapısı', 'slot-doc-2': 'Kampanya planı', 'slot-doc-3': 'Dönüşüm ölçümü', 'slot-doc-4': 'Dönem raporu' }, className),
  terms: () => art('gads-search-terms', 'Temsili arama terimleri raporu: ilgili sorgular korunuyor, iş ilanı ve ücretsiz eğitim gibi ilgisiz sorgular negatif anahtar kelime olarak işaretleniyor', { 'slot-report': 'Arama terimleri raporu · temsili', 'slot-h-term': 'Arama terimi', 'slot-h-action': 'Karar', 'slot-term-1': 'endüstriyel kompresör bakımı', 'slot-action-1': 'Koru', 'slot-term-2': 'kompresör bakım iş ilanı', 'slot-action-2': 'Negatif ekle', 'slot-term-3': 'kompresör servisi istanbul', 'slot-action-3': 'Koru', 'slot-term-4': 'kompresör bakımı eğitimi ücretsiz', 'slot-action-4': 'Negatif ekle', 'slot-term-5': 'vidalı kompresör yedek parça', 'slot-action-5': 'Ayrı kampanya' }),
  actions: () => art('gads-conversion-actions', 'Temsili dönüşüm eylemleri: başarılı form gönderimi ve satın alma birincil, telefon tıklaması ve teklif düğmesi tıklaması gözlem amaçlı ikincil eylem', { 'slot-h-action': 'Dönüşüm eylemi', 'slot-h-role': 'Kullanım', 'slot-act-1': 'Başarılı form gönderimi', 'slot-act-sub-1': 'Teşekkür sayfası veya başarı olayı', 'slot-role-1': 'Birincil', 'slot-act-2': 'Satın alma', 'slot-act-sub-2': 'Sipariş değeriyle, sipariş başına bir kez', 'slot-role-2': 'Birincil', 'slot-act-3': 'Telefon tıklaması', 'slot-act-sub-3': 'Görüşme yapıldığını tek başına göstermez', 'slot-role-3': 'İkincil · gözlem', 'slot-act-4': '“Teklif Al” düğmesi tıklaması', 'slot-act-sub-4': 'Formun gönderildiğini göstermez', 'slot-role-4': 'İkincil · gözlem' }),
  tagFlow: (className?: string) => art('gads-tag-flow', 'Ölçüm akışı: sitede gerçekleşen eylem, Google Tag Manager’da test edilen etiket ve Google Ads dönüşüm raporu', { 'slot-step-1': 'Site eylemi', 'slot-sub-1': 'Form, arama, satın alma', 'slot-step-2': 'Etiket testi', 'slot-sub-2': 'GTM önizleme', 'slot-step-3': 'Dönüşüm raporu', 'slot-sub-3': 'Google Ads ve GA4', 'slot-note': 'Her adım ayrı kontrol edilir; bir adım geçmeden sonraki adıma güvenilmez.' }, className),
  ga4: () => art('gads-ga4-match', 'GA4 olayları ile Google Ads dönüşümleri: form ve satın alma olayları içe aktarılıyor; sayfa görüntüleme dönüşüm olarak kullanılmıyor', { 'slot-h-ga4': 'GA4 olayı', 'slot-h-ads': 'Google Ads dönüşümü', 'slot-ga4-1': 'generate_lead', 'slot-ads-1': 'Form gönderimi', 'slot-ga4-2': 'purchase', 'slot-ads-2': 'Satın alma (değerli)', 'slot-ga4-3': 'page_view', 'slot-ads-3': 'Dönüşüm olarak kullanılmaz' }),
  gtm: () => art('gads-gtm-test', 'Temsili GTM önizleme testi: başarılı form gönderiminde ve teşekkür sayfasında etiket tetikleniyor, boş form denemesinde tetiklenmiyor', { 'slot-panel': 'Etiket testi · önizleme modu', 'slot-mode': 'Önizleme', 'slot-test-1': 'Başarılı form gönderimi', 'slot-result-1': 'Etiket tetiklendi', 'slot-test-2': 'Teşekkür sayfası', 'slot-result-2': 'Etiket tetiklendi', 'slot-test-3': 'Boş form denemesi', 'slot-result-3': 'Tetiklenmedi (doğru)', 'slot-log': 'Test tarihi, sayfa ve sorumlu kayda geçirilir' }),
  feed: () => art('ecom-stock-sync', 'Temsili ürün verisi kontrolü: ürün sayfasında tükenen varyant Merchant Center verisinde de tükendi olarak görünüyor; fiyat sayfayla aynı', { 'slot-variant-head': 'Beden', 'slot-size-1': 'S', 'slot-size-2': 'M', 'slot-size-3': 'L', 'slot-size-4': 'XL', 'slot-stock-page': 'L beden · Tükendi', 'slot-buy': 'Sepete ekle', 'slot-feed': 'Merchant Center', 'slot-key-1': 'Varyant', 'slot-val-1': 'L beden', 'slot-key-2': 'Stok', 'slot-val-2': 'Tükendi', 'slot-key-3': 'Fiyat', 'slot-val-3': 'Sayfayla aynı', 'slot-match': 'Sayfa ve ürün verisi eşleşiyor' }),
  rail: () => <IkasVisual name="process-rail" loop label="Google Ads çalışmasının beş adımı: hedef ve bütçe, hesap ve sayfa incelemesi, ölçüm ve kampanya hazırlığı, yayın ve ilk kontrol, düzenli iyileştirme" className="mt-8 hidden lg:block" slotLabels={{ 'slot-step-1': 'Hedef ve bütçe', 'slot-step-2': 'Hesap incelemesi', 'slot-step-3': 'Ölçüm hazırlığı', 'slot-step-4': 'Yayın ve kontrol', 'slot-step-5': 'İyileştirme' }} />,
  lead: () => art('gads-lead-quality', 'Temsili başvuru kalitesi incelemesi: gelen formların bir kısmı hizmet bölgesi dışından ve ilgisiz sorgulardan geliyor; konum, arama terimi ve sayfa ayarları kontrol ediliyor', { 'slot-forms': 'Gelen formlar', 'slot-lead-1': 'İstanbul · bakım talebi', 'slot-lead-2': 'Bölge dışı · bakım', 'slot-lead-3': 'İş başvurusu', 'slot-lead-4': 'Kocaeli · servis talebi', 'slot-lead-5': 'Fiyat listesi isteği', 'slot-ok': 'Uygun talepler', 'slot-ok-sub': 'Hizmet bölgesi ve hizmet eşleşiyor', 'slot-check': 'Kontrol edilecekler', 'slot-check-1': 'Konum: bölgede bulunan kişiler', 'slot-check-2': 'Arama terimleri ve negatifler', 'slot-check-3': 'Formda hizmet bölgesi sorusu' }),
  report: (className?: string) => art('report', 'Temsili Google Ads dönem raporu: arama terimleri temizlendi, form ölçümü doğrulandı, açılış sayfası güncellendi; harcama ve dönüşüm eğilimi; sıradaki iş konum ayarı', { 'slot-title': 'Google Ads dönem raporu', 'slot-tag': 'Temsili', 'slot-done-1': 'Negatif terimler eklendi', 'slot-done-2': 'Form ölçümü doğrulandı', 'slot-done-3': 'Açılış sayfası güncellendi', 'slot-chart': 'Harcama ve dönüşüm', 'slot-next': 'Sıradaki iş: konum ayarı' }, className),
  evidence: (className?: string) => art('tech-evidence', 'Google Ads örneklerini değerlendirme: gözlem, müdahale ve doğrulama', { 'slot-col-1': 'Gözlem', 'slot-item-1-1': 'Arama terimleri', 'slot-item-1-2': 'Dönüşüm kaydı', 'slot-item-1-3': 'Satış ekibi notu', 'slot-col-2': 'Müdahale', 'slot-item-2-1': 'Negatif terimler', 'slot-item-2-2': 'Ölçüm ayarı', 'slot-item-2-3': 'Değişiklik tarihi', 'slot-col-3': 'Doğrulama', 'slot-item-3-1': 'Test dönüşümü', 'slot-item-3-2': 'Karşılaştırma dönemi', 'slot-item-3-3': 'Sonraki karar' }, className),
  budget: (className?: string) => art('gads-budget-split', 'Teklif kalemleri: reklam bütçesi Google Ads hesabınızdan Google’a ödenir; yönetim ücreti ve varsa kurulum işleri PakSoft teklifinde ayrı kalemdir', { 'slot-budget': 'Reklam bütçesi', 'slot-budget-sub': 'Kampanya harcaması', 'slot-fee': 'Yönetim ücreti', 'slot-setup': 'Kurulum (tek seferlik)', 'slot-google': 'Google Ads hesabınız', 'slot-google-sub': 'Ödeme doğrudan Google’a', 'slot-paksoft': 'PakSoft teklifi', 'slot-paksoft-sub': 'Yönetim ve kurulum ayrı' }, className),
  quote: () => art('quote-groups', 'Google Ads yönetim ücretini etkileyenler: kampanya sayısı ve bölgeler, hesabın ve ölçümün durumu, ürün kataloğu, raporlama sıklığı; açılış sayfası geliştirmesi ayrı', { 'slot-group-1': 'Kampanya sayısı ve bölge', 'slot-group-2': 'Hesap ve ölçüm durumu', 'slot-group-3': 'Ürün kataloğu', 'slot-group-4': 'Raporlama sıklığı', 'slot-quote': 'Yönetim ücreti', 'slot-extra': 'Sayfa geliştirme ayrı' }),
  goalsByBusiness: () => art('gads-goals', 'İşletme türüne göre ilk kampanya hedefi: bölgesel hizmet işletmesinde form ve arama, e-ticaret mağazasında değerli satın alma, B2B üreticide nitelikli talep', { 'slot-biz-1': 'Hizmet işletmesi', 'slot-biz-sub-1': 'Bölgesel talep', 'slot-goal-label-1': 'Hedef', 'slot-goal-1': 'Form ve arama', 'slot-camp-label-1': 'İlk kampanya', 'slot-camp-1': 'Arama Ağı', 'slot-biz-2': 'E-ticaret mağazası', 'slot-biz-sub-2': 'Ürün satışı', 'slot-goal-label-2': 'Hedef', 'slot-goal-2': 'Satın alma değeri', 'slot-camp-label-2': 'İlk kampanya', 'slot-camp-2': 'Alışveriş', 'slot-biz-3': 'B2B üretici', 'slot-biz-sub-3': 'Teklif talebi', 'slot-goal-label-3': 'Hedef', 'slot-goal-3': 'Nitelikli talep', 'slot-camp-label-3': 'İlk kampanya', 'slot-camp-3': 'Arama Ağı' }),
  rsa: () => art('gads-rsa', 'Temsili duyarlı arama ağı reklamı: başlık ve açıklamalar, site bağlantıları, arama öğesi ve konum öğesi', { 'slot-domain': 'siteniz.com › kompresor-bakimi', 'slot-headline': 'Endüstriyel Kompresör Bakımı | Yerinde Servis', 'slot-sitelink-1': 'Bakım paketleri', 'slot-sitelink-2': 'Servis bölgeleri', 'slot-sitelink-3': 'Yedek parça', 'slot-sitelink-4': 'Teklif formu', 'slot-call': 'Ara', 'slot-loc': 'Konum', 'slot-part-1': 'Başlıklar (15’e kadar)', 'slot-part-2': 'Açıklamalar (4’e kadar)', 'slot-part-3': 'Site bağlantıları', 'slot-part-4': 'Arama ve konum' }),
  consent: () => art('gads-consent', 'İzin tercihi ve ölçüm: ziyaretçi izin verdiğinde etiketler tam çalışır ve gelişmiş dönüşümler kullanılabilir; reddettiğinde izin moduna göre sınırlı sinyal gönderilir', { 'slot-banner': 'Çerez izni', 'slot-accept': 'Kabul et', 'slot-reject': 'Reddet', 'slot-banner-note': 'Tercih izin modu ile etiketlere iletilir', 'slot-granted': 'İzin verildi', 'slot-granted-sub': 'Dönüşüm etiketi çalışır; gelişmiş dönüşümler karma veriyle eşleştirir', 'slot-denied': 'İzin verilmedi', 'slot-denied-sub': 'Çerez kullanılmaz; ölçüm izin modunun sınırlı sinyalleriyle sürer' }),
  offline: () => art('gads-offline', 'Çevrimdışı dönüşüm aktarımı: CRM’de nitelikli talep aşamasına geçen kayıtlar Google Ads’e ayrı bir dönüşüm olarak aktarılıyor', { 'slot-crm': 'CRM aşamaları', 'slot-stage-1': 'Form alındı', 'slot-stage-2': 'İlk görüşme', 'slot-stage-3': 'Nitelikli talep', 'slot-stage-4': 'Satış', 'slot-ads': 'Google Ads dönüşümü', 'slot-ads-1': 'Form gönderimi', 'slot-ads-2': 'Nitelikli talep (içe aktarılan)', 'slot-note': 'Aktarım tekrar sayılmamalı; test kaydıyla doğrulanır' }),
  bidding: () => art('gads-bidding', 'Teklif stratejileri ve gerektirdiği veri: manuel TBM ile başlayıp dönüşüm verisi arttıkça dönüşümleri en üst düzeye çıkarma, hedef EBM ve hedef ROAS', { 'slot-h-strat': 'Teklif stratejisi', 'slot-h-data': 'Gereken dönüşüm verisi', 'slot-bid-1': 'Manuel TBM', 'slot-bid-sub-1': 'Yeni hesap, sınırlı veri', 'slot-bid-2': 'Dönüşümleri en üst düzeye çıkarma', 'slot-bid-sub-2': 'Ölçüm doğrulandıktan sonra', 'slot-bid-3': 'Hedef EBM', 'slot-bid-sub-3': 'Düzenli dönüşüm geçmişi', 'slot-bid-4': 'Hedef ROAS', 'slot-bid-sub-4': 'Doğru dönüşüm değeriyle', 'slot-note': 'Şematik; geçiş kararı hesabın kendi verisine göre verilir' }),
  weekly: () => art('monthly-plan', 'Haftalık ve aylık Google Ads kontrolleri: haftalık arama terimleri ve reklam öğeleri, aylık bütçe dağılımı ve açılış sayfası kararları', { 'slot-month': 'Kontrol takvimi', 'slot-week-1': 'Her hafta', 'slot-week-2': 'Her hafta', 'slot-week-3': 'Her ay', 'slot-week-4': 'Her ay', 'slot-task-1': 'Arama terimleri', 'slot-task-sub-1': 'Yeni negatifler', 'slot-task-2': 'Reklam öğeleri', 'slot-task-sub-2': 'Hatalı adresler', 'slot-task-3': 'Bütçe dağılımı', 'slot-task-sub-3': 'Kampanya önceliği', 'slot-task-4': 'Rapor ve karar', 'slot-task-sub-4': 'Açılış sayfası' }),
  merchant: () => art('gads-merchant-issues', 'Temsili Merchant Center ürün durumları: onaylı ürünler, fiyat uyuşmazlığı nedeniyle reddedilen ürün ve eksik ürün tanımlayıcısı uyarısı', { 'slot-mc': 'Merchant Center · ürün durumları', 'slot-h-product': 'Ürün', 'slot-h-status': 'Durum', 'slot-h-fix': 'Yapılacak', 'slot-product-1': 'Yürüyüş ayakkabısı · 42', 'slot-status-1': 'Onaylandı', 'slot-fix-1': '—', 'slot-product-2': 'Spor çanta · siyah', 'slot-status-2': 'Reddedildi', 'slot-fix-2': 'Fiyatı eşitle', 'slot-product-3': 'Termos · 750 ml', 'slot-status-3': 'Uyarı', 'slot-fix-3': 'GTIN ekle', 'slot-product-4': 'Yağmurluk · M', 'slot-status-4': 'Onaylandı', 'slot-fix-4': '—', 'slot-note': 'Durumlar temsilidir; güncel neden Merchant Center’daki ürün ayrıntısında görülür' }),
  adrank: () => art('gads-adrank', 'Reklam sırasını etkileyen etkenler: teklif, reklam kalitesi (beklenen tıklama oranı, reklam alaka düzeyi, açılış sayfası deneyimi) ve arama bağlamı', { 'slot-bid': 'Teklif', 'slot-quality': 'Reklam kalitesi', 'slot-q-1': 'Beklenen tıklama oranı', 'slot-q-2': 'Reklam alaka düzeyi', 'slot-q-3': 'Açılış sayfası deneyimi', 'slot-context': 'Arama bağlamı', 'slot-rank': 'Reklam sırası', 'slot-rank-sub': 'Her açık artırmada yeniden', 'slot-note': 'Tıklama maliyeti bu etkenlere ve rekabete göre değişir; sabit bir tutar yoktur.' }),
  scope: () => art('ecom-platforms', 'Kampanya türüne göre yönetim kapsamı: Arama Ağı’nda anahtar kelime ve reklam metni, Alışveriş’te ürün verisi, Performance Max’te öğe grupları, birden fazla kampanyada bütçe dağılımı', { 'slot-plat-1': 'Arama Ağı', 'slot-focus-1': 'Kelime · reklam metni', 'slot-plat-2': 'Alışveriş', 'slot-focus-2': 'Ürün verisi', 'slot-plat-3': 'Performance Max', 'slot-focus-3': 'Öğe grupları', 'slot-plat-4': 'Birlikte', 'slot-focus-4': 'Bütçe dağılımı' }),
};

const visuals: SeoServiceConfig['visuals'] = {
  overview: [
    ['Hangi Google Ads kampanyası', aside(V.types())],
    ['Google Ads uzmanı, Google Ads ajansı', aside(V.roles())],
    ['İşletmenizin ilk kampanya hedefi', aside(V.goalsByBusiness())],
  ],
  features: [
    ['Arama terimlerini nasıl kontrol', aside(V.terms())],
    ['Dönüşüm takibinde hangi eylemleri', aside(V.actions())],
    ['Arama reklamında hangi öğeler', aside(V.rsa())],
  ],
  technologies: [
    ['Google Ads ve GA4 dönüşümlerini', aside(V.ga4())],
    ['GTM ile ölçümü', aside(V.gtm())],
    ['İzin tercihleri ve gelişmiş dönüşümler', aside(V.consent())],
    ['Alışveriş ve Performance Max', aside(V.feed())],
    ['Satış ekibindeki sonuçlar reklama', aside(V.offline())],
  ],
  process: [
    ['Google Ads çalışmasının beş adımı', { place: 'below', node: V.rail() }],
    ['Teklif stratejisini neye göre', aside(V.bidding())],
    ['Örnek karar', aside(V.lead())],
    ['Haftalık ve aylık kontroller', aside(V.weekly())],
  ],
  portfolio: [
    ['İki temsili e-ticaret kampanyası', aside(V.merchant())],
  ],
  pricing: [
    ['Tıklama maliyeti neden değişir', aside(V.adrank())],
    ['Google Ads yönetim ücretini', aside(V.quote())],
    ['Hangi çalışma kapsamı', aside(<IkasVisual name="method-options" loop label="Üç çalışma kapsamı: hesap incelemesi ve danışmanlık, kurulum ve ilk yönetim dönemi, aylık Google Ads yönetimi" slotLabels={{ 'slot-option-1': 'Hesap incelemesi', 'slot-option-2': 'Kurulum ve başlangıç', 'slot-option-3': 'Aylık yönetim' }} className="mx-auto w-full max-w-xl" />)],
    ['Kampanya türü teklif kapsamını', aside(V.scope())],
  ],
};
const heroArt: SeoServiceConfig['heroArt'] = {
  features: () => V.account('w-full'),
  technologies: () => V.tagFlow('w-full'),
  process: () => V.report('w-full'),
  portfolio: () => V.evidence('w-full'),
  pricing: () => V.budget('w-full'),
};
const config: SeoServiceConfig = {
  platform: 'google-ads', contentDir: 'content/google-ads/tr', base: GOOGLE_ADS_TR_BASE, enquiry: GOOGLE_ADS_TR_ENQUIRY,
  serviceName: 'Google Ads Yönetimi', Icon: CursorArrowRaysIcon, metadata, visuals, heroArt,
  rotating: {
    features: { lead: 'Google Ads Yönetiminde', words: ['Hesap Kurulumu', 'Kampanya Yönetimi', 'Dönüşüm Takibi'] },
    technologies: { lead: 'Google Ads', words: ['Dönüşüm Takibi', 'GA4 ve GTM', 'Ölçüm Altyapısı'] },
    process: { lead: 'Google Ads', words: ['Hesap Yönetim Süreci', 'Kampanya Kurulumu', 'Optimizasyon'] },
    portfolio: { lead: 'Google Ads', words: ['Kampanya Örnekleri', 'Temsili Senaryolar', 'Doğrulama Adımları'] },
    pricing: { lead: 'Google Ads', words: ['Yönetim Fiyatları', 'Teklif Kalemleri', 'Bütçe Planı'] },
    faq: { lead: 'Google Ads', words: ['Sık Sorulan Sorular', 'Hesap ve Bütçe', 'Ölçüm ve Raporlama'] },
    blog: { lead: 'Google Ads', words: ['Bütçe Rehberleri', 'Kampanya Teşhisi', 'Ölçüm İpuçları'] },
  },
  primary: { overview: 'Google Ads Teklifi Al', features: 'Google Ads Teklifi Al', technologies: 'Ölçüm Kurulumumu Görüşmek İstiyorum', process: 'Google Ads Teklifi Al', portfolio: 'Benzer Bir Kampanyayı Görüşelim', pricing: 'Google Ads Teklifi Al', faq: 'Google Ads Teklifi Al', blog: 'Google Ads Yönetimi Hizmetini İncele' },
  secondary: { features: ['Hizmet Kapsamını İncele', '#google-ads-hizmet-kapsami'], technologies: ['Araçları ve Veri Akışını İncele', '#google-ads-olcum-araclari'], process: ['Süreç Adımlarını İncele', '#google-ads-surec-adimlari'], portfolio: ['Kampanya Örneklerini İncele', '#google-ads-kampanya-ornekleri'], pricing: ['Teklif Kalemlerini İncele', '#google-ads-teklif-kalemleri'], faq: ['Sorulara Git', '#google-ads-sss'] },
  closingLink: {
    overview: ['Google Ads Yönetim Sürecini İncele', `${GOOGLE_ADS_TR_BASE}/surec`], features: ['Google Ads Yönetim Sürecini İncele', `${GOOGLE_ADS_TR_BASE}/surec`], technologies: ['Google Ads Yönetim Sürecini İncele', `${GOOGLE_ADS_TR_BASE}/surec`], process: ['Google Ads Fiyatlandırmasını İncele', `${GOOGLE_ADS_TR_BASE}/fiyatlandirma`], portfolio: ['Google Ads Yönetim Sürecini İncele', `${GOOGLE_ADS_TR_BASE}/surec`], pricing: ['Google Ads Yönetim Sürecini İncele', `${GOOGLE_ADS_TR_BASE}/surec`], faq: ['Google Ads Fiyatlandırmasını İncele', `${GOOGLE_ADS_TR_BASE}/fiyatlandirma`],
  },
  closingDefault: { title: 'Google Ads kampanyanız için kapsamı belirleyelim', text: 'Site adresinizi, öncelikli ürün ya da hizmetinizi ve hedef bölgenizi paylaşın. İlk görüşmede kampanya türünü, takip edilecek sonuçları ve çalışma kapsamını birlikte değerlendirelim.' },
  jumpLabels: [['Bir Google reklam ajansı', 'Hizmet kapsamı'], ['Hangi Google Ads kampanyası', 'Kampanya türleri'], ['Yeni hesap ile mevcut hesabı', 'Hesap seçenekleri'], ['Reklam bütçesi ile yönetim ücreti', 'Bütçe ve ücret'], ['Google Ads uzmanı, Google Ads ajansı', 'Uzman, ajans, danışman'], ['Sitenizin Google Ads', 'Değerlendirme'], ['İşletmenizin ilk kampanya hedefi', 'Başlangıç hedefi'], ['Başlamadan önce neleri', 'Başlangıç bilgileri'], ['Hesap kurulumu ve kampanya yönetiminde', 'Yönetim işleri'], ['Dönüşüm takibinde hangi eylemleri', 'Dönüşüm ölçümü'], ['Arama terimlerini nasıl kontrol', 'Arama terimleri'], ['Kampanya türüne göre kapsam', 'Kampanya kapsamı'], ['Arama reklamında hangi öğeler', 'Reklam öğeleri'], ['Rapor ve iş listesinde', 'Raporlama'], ['Hangi araç hangi işi', 'Ölçüm araçları'], ['Google Ads ve GA4 dönüşümlerini', 'Dönüşüm eşleştirme'], ['GTM ile ölçümü', 'GTM testleri'], ['İzin tercihleri ve gelişmiş dönüşümler', 'İzin ve dönüşüm'], ['Alışveriş ve Performance Max', 'Ürün verisi'], ['İlk inceleme için hangi erişimler', 'Hesap erişimi'], ['Satış ekibindeki sonuçlar reklama', 'CRM sonuçları'], ['Google Ads çalışmasının beş adımı', 'Beş aşama'], ['Teklif stratejisini neye göre', 'Teklif stratejisi'], ['Örnek karar', 'Örnek karar'], ['Haftalık ve aylık kontroller', 'Kontrol takvimi'], ['İlk görüşmeye hangi bilgilerle', 'Hazırlık'], ['Üç temsili Google Ads', 'Kampanya örnekleri'], ['İki temsili e-ticaret kampanyası', 'E-ticaret senaryoları'], ['Bir kampanya çalışmasını değerlendirirken', 'Değerlendirme ölçütleri'], ['Bir kampanya sorununu hangi sırayla', 'Teşhis sırası'], ['Reklam bütçesi, yönetim ücreti', 'Teklif kalemleri'], ['Google Ads yönetim ücretini', 'Fiyatı etkileyenler'], ['Tıklama maliyeti neden değişir', 'Tıklama maliyeti'], ['Hangi çalışma kapsamı', 'Kapsam türleri'], ['Kampanya türü teklif kapsamını', 'Kampanya kapsamı'], ['Teklifleri karşılaştırırken', 'Teklif kontrolü'], ['Hesap ve başlangıç', 'Hesap ve başlangıç'], ['Kampanya seçimi ve bütçe', 'Kampanya ve bütçe'], ['Ölçüm ve raporlama', 'Ölçüm ve raporlama'], ['Kampanya yönetimi', 'Kampanya yönetimi']],
  sectionIds: {
    'overview:Hangi Google Ads kampanyası hedefinize uygun?': 'google-ads-kampanya-turleri',
    'overview:İşletmenizin ilk kampanya hedefi ne olmalı?': 'google-ads-baslangic-hedefi',
    'features:Hesap kurulumu ve kampanya yönetiminde neler yapıyoruz?': 'google-ads-hizmet-kapsami',
    'features:Arama terimlerini nasıl kontrol ediyoruz?': 'google-ads-arama-terimleri',
    'features:Arama reklamında hangi öğeler kullanılır?': 'google-ads-reklam-ogeleri',
    'technologies:Hangi araç hangi işi üstlenir?': 'google-ads-olcum-araclari',
    'technologies:İzin tercihleri ve gelişmiş dönüşümler nasıl çalışır?': 'google-ads-izin-ve-donusum',
    'technologies:Satış ekibindeki sonuçlar reklama nasıl bağlanır?': 'google-ads-crm-sonuclari',
    'process:Google Ads çalışmasının beş adımı': 'google-ads-surec-adimlari',
    'process:Teklif stratejisini neye göre seçiyoruz?': 'google-ads-teklif-stratejisi',
    'process:Haftalık ve aylık kontroller nasıl ayrılır?': 'google-ads-kontrol-takvimi',
    'portfolio:Üç temsili Google Ads kampanya örneği': 'google-ads-kampanya-ornekleri',
    'portfolio:İki temsili e-ticaret kampanyası incelemesi': 'google-ads-e-ticaret-senaryolari',
    'portfolio:Bir kampanya sorununu hangi sırayla inceliyoruz?': 'google-ads-teshis-sirasi',
    'pricing:Reklam bütçesi, yönetim ücreti ve kurulum': 'google-ads-teklif-kalemleri',
    'pricing:Tıklama maliyeti neden değişir?': 'google-ads-tiklama-maliyeti',
    'pricing:Kampanya türü teklif kapsamını nasıl etkiler?': 'google-ads-kampanya-kapsami',
    'faq:Hesap ve başlangıç': 'google-ads-sss',
    'faq:Kampanya yönetimi': 'google-ads-kampanya-yonetimi',
  },
  portfolioBadge: 'Temsili senaryo',
  blog: { id: 'google-ads-rehberleri', title: 'Google Ads bütçesi ve kampanyaları için rehberler', text: 'Kampanya harcamasını planlama ve tıklama alan ancak dönüşüm getirmeyen reklamları inceleme üzerine iki pratik rehber.', asideTitle: 'Kampanyanız için uygun başlangıcı belirleyin', asideText: 'Öncelikli hizmetinizi, hedef bölgenizi ve varsa mevcut hesabınızı paylaşın.', guides: getGoogleAdsGuides },
};

const googleAds = createSeoService(config);
export const getGoogleAdsMeta = (page: SeoPageKind) => googleAds.getMeta(page);
export const getGoogleAdsSocialMeta = (page: SeoPageKind, canonicalUrl: string, image?: string) => googleAds.getSocialMeta(page, canonicalUrl, image);
export const GoogleAdsOverviewBody = googleAds.OverviewBody;
export const GoogleAdsTurkishPage = googleAds.Page;
export default googleAds.Page;
