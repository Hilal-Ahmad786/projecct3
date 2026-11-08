## Hangi araç hangi işi üstlenir?

| Araç | Görevi | Örnek kontrol |
| --- | --- | --- |
| Google Ads | Kampanya hedeflerini ve reklam dönüşümlerini yönetmek | Başarılı teklif formu, ilgili kampanyanın optimizasyon hedefi mi? |
| Google Analytics 4 | Sitedeki etkinlikleri ve kullanıcı yolculuğunu incelemek | Form etkinliği yalnızca başarılı gönderim sonrasında mı kaydediliyor? |
| Google Tag Manager | Etiketleri ve tetiklenme koşullarını yönetmek | Form hatasında etiket tetiklenmeden kalıyor mu? |
| Google Merchant Center | Mağazanın ürün verilerini yönetmek | Ürün fiyatı, stok ve açılış adresi mağazayla uyumlu mu? |
| Looker Studio | Kapsama göre raporları bir araya getirmek | Harcama ve ölçülen sonuçlar aynı tarih aralığında mı? |

## Google Ads ve GA4 dönüşümlerini nasıl eşleştiriyoruz?

Önce işletmeniz için önemli sonucu tanımlarız. Örneğin bir servis firmasında teklif formunun başarıyla gönderilmesi, mağazada ise tamamlanan sipariş ve sipariş değeri öncelikli olabilir. Eylemi Google Ads etiketiyle ölçmenin veya bir GA4 anahtar etkinliğinden Google Ads dönüşümü oluşturmanın mevcut kuruluma uygunluğunu inceleriz.

İki ölçüm yöntemi aynı eylemi kaydediyorsa, hangi dönüşüm işleminin kampanya tekliflerine yön vereceğini kontrol ederiz. Örneğin aynı form hem Google Ads etiketiyle hem GA4 üzerinden ölçülüyorsa iki kaydı birlikte birincil hedef olarak kullanmanın aynı iş sonucunu iki kez saymasına yol açıp açmadığını inceleriz.

Google Ads ve GA4 raporlarını karşılaştırırken tarih aralığını, dönüşüm tanımını ve ilişkilendirme ayarlarını kontrol ederiz. Örneğin GA4 tüm kanallardaki form etkinliklerini gösterirken, Google Ads kampanyaya ilişkilendirilen sonuçları raporlar. Karşılaştırmada hangi raporun hangi soruyu yanıtladığını belirtiriz.

## GTM ile ölçümü nasıl test ediyoruz?

### 1. Eylemin gerçekleştiği noktayı belirliyoruz

Örneğin ziyaretçi form düğmesine basıyor ancak zorunlu alan eksik olduğu için form gönderilmiyor. Başarılı gönderim sinyalini bu tıklamadan ayırırız. Mağazada benzer şekilde ödeme adımı ile tamamlanan siparişi ayrı değerlendiririz.

### 2. Başarılı ve başarısız örnekleri test ediyoruz

Mevcut kurulum uygunsa GTM önizlemesi ve Tag Assistant ile hangi etiketin ne zaman çalıştığını kontrol ederiz. Başarılı form gönderimi, hatalı form ve sayfa yenileme senaryolarını ayrı deneriz. Satış ölçümünde test siparişinin kimliğini, tutarını ve para birimini kontrol ederiz.

### 3. Sonucu ve sorumlu ekibi kaydediyoruz

Test edilen adresi, beklenen davranışı ve sonucu kaydederiz. Örneğin başarı sinyali site tarafından iletilmiyorsa geliştiriciye örnek adımı ve gerekli bilgiyi aktarırız. Değişiklik yayınlandığında aynı senaryoları yeniden çalıştırırız.

## İzin tercihleri ve gelişmiş dönüşümler nasıl çalışır?

Google Ads dönüşüm takibinde gelişmiş dönüşümler, uygun kurulum ve izin koşulları sağlandığında mevcut ölçümü destekleyebilir. Örneğin mağazada satın alma olayı zaten kaydediliyorsa, işlem sırasında uygun şekilde toplanan birinci taraf verileri tek yönlü özetlenerek (hash) gönderilebilir ve dönüşüm eşleştirmesine yardımcı olabilir. Kullanılan veri ve kurulum Google’ın müşteri verisi politikalarına uygun olmalıdır.

İzin modu (Consent Mode) kullanıcının tercihlerini Google etiketlerine iletir. Reklam verisi kullanımı ve reklam kişiselleştirme ayrı izin sinyalleridir. İzin tercihinin etiket davranışına doğru yansımasını ve ölçüm üzerindeki etkisini kurulum kapsamına göre test ederiz.

## Alışveriş ve Performance Max için ürün verisi

Mağaza kampanyalarında ürün kataloğunun kaynağını ve Merchant Center ile Google Ads hesaplarının bağlantısını inceleriz. Örneğin siyah bir ayakkabının 42 numarası tükenirse ilgili ürün kaydındaki stok durumunu mağaza sayfasındaki bilgiyle karşılaştırırız. Sorun mağaza, veri aktarımı veya kampanya seçimiyle ilgiliyse bulguyu ilgili ekibe yönlendiririz.

Ürün verisi kontrollerini [Google Alışveriş Reklamları](/tr/hizmetler/google-shopping), kampanya hedefleri ve reklam öğelerini [Performance Max Yönetimi](/tr/hizmetler/performance-max) sayfasında inceleyebilirsiniz.

## İlk inceleme için hangi erişimler gerekir?

Önce site veya mağaza adresi ve ölçmek istediğiniz sonucu paylaşın. Hesap incelemesi gerektiğinde Google Ads, GA4, GTM veya Merchant Center için kapsamla uyumlu kullanıcı yetkilerini belirleriz. Örneğin yalnızca mevcut kampanya raporunu incelemek ile yeni bir etiketi yayınlamak farklı yetkiler gerektirir. Erişimi hesap sahibi kendi hesabından tanımlar.

## Satış ekibindeki sonuçlar reklama nasıl bağlanır?

Teklif formundan sonra satış ekibi talebi değerlendiriyorsa, form ile nitelikli talep arasındaki fark uygun bir çevrimdışı dönüşüm aktarımıyla ölçülebilir. Örneğin bir üretici, minimum sipariş koşuluna uyan talepleri satış sisteminde ayrı bir aşamaya taşıyabilir. Kurulum; veri kaynağına, bağlantı yöntemine, izin koşullarına ve Google’ın güncel gereksinimlerine bağlıdır.

### 1. Satış aşamasını tanımlayın

Hangi koşullarda bir talebin nitelikli kabul edildiğini belirler, CRM kaydında durum ve zaman bilgisinin düzenli tutulup tutulmadığını inceleriz.

### 2. Test kaydını eşleştirin

Uygun bağlantı ve izin koşulları varsa örnek bir kaydı aktararak satış sistemindeki kayıtla eşleşmesini kontrol ederiz.

### 3. Raporu ve teklif sinyalini ayırın

Form ve nitelikli talep ayrı dönüşüm işlemleri olarak izlenebilir. Aktarılan kayıtların işlendiğini ve yinelenmediğini doğruladıktan sonra hangi eylemin kampanya teklif stratejisinde kullanılacağını değerlendiririz.

## Sitenizin ölçüm kurulumunu birlikte kontrol edelim

Ölçmek istediğiniz form, arama veya satın alma adımını ve kullandığınız araçları paylaşın. Google Ads, GA4 ve GTM tarafında hangi kontrollerin gerektiğini birlikte belirleyelim.
