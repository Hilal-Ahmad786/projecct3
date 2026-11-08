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

## Alışveriş ve Performance Max için ürün verisi

Mağaza kampanyalarında ürün kataloğunun kaynağını ve Merchant Center ile Google Ads hesaplarının bağlantısını inceleriz. Örneğin siyah bir ayakkabının 42 numarası tükenirse ilgili ürün kaydındaki stok durumunu mağaza sayfasındaki bilgiyle karşılaştırırız. Sorun mağaza, veri aktarımı veya kampanya seçimiyle ilgiliyse bulguyu ilgili ekibe yönlendiririz.

Ürün verisi kontrollerini [Google Alışveriş Reklamları](/tr/hizmetler/google-shopping), kampanya hedefleri ve reklam öğelerini [Performance Max Yönetimi](/tr/hizmetler/performance-max) sayfasında inceleyebilirsiniz.

## İlk inceleme için hangi erişimler gerekir?

Önce site veya mağaza adresi ve ölçmek istediğiniz sonucu paylaşın. Hesap incelemesi gerektiğinde Google Ads, GA4, GTM veya Merchant Center için kapsamla uyumlu kullanıcı yetkilerini belirleriz. Örneğin yalnızca mevcut kampanya raporunu incelemek ile yeni bir etiketi yayınlamak farklı yetkiler gerektirir. Erişimi hesap sahibi kendi hesabından tanımlar.

## Sitenizin ölçüm kurulumunu birlikte kontrol edelim

Ölçmek istediğiniz form, arama veya satın alma adımını ve kullandığınız araçları paylaşın. Google Ads, GA4 ve GTM tarafında hangi kontrollerin gerektiğini birlikte belirleyelim.
