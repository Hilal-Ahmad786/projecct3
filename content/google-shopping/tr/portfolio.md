## Üç Google Alışveriş reklam örneği

Bu temsili örneklerde bir bulgudan başlayıp düzeltmenin nerede yapılacağını belirliyoruz. Değişiklikten sonra önce ilgili kaydı doğruluyor, kampanya sonuçlarını ayrıca değerlendiriyoruz.

### Temsili örnek 1 · Kampanya indirimi bitti, eski fiyat gönderiliyor

Bir ev tekstili mağazasında nevresim indirimi sona eriyor. Ürün sayfası güncel fiyatı gösterirken Merchant Center’a gönderilen kayıt eski indirim bilgisini taşıyor. Ürün kimliğini kullanarak mağaza kaydını, veri kaynağını ve ürün sayfasını karşılaştırırız. Eski bilgi aktarım kuralından geliyorsa düzeltmeyi burada planlarız. Sonraki işleme tamamlandığında fiyatı ve ürün durumunu yeniden kontrol ederiz.

### Temsili örnek 2 · Reklam farklı ölçüyü açıyor

Bir masa örtüsünün iki ölçüsü var. Reklamdaki ürün kaydı büyük ölçüyü tanımlıyor, ancak bağlantı küçük ölçünün seçili olduğu sayfayı açıyor. Gönderilen bağlantıyı mobilde ve masaüstünde test ederiz. Varyantı doğrudan açan doğru adresi veri kaynağına eklemeyi ve yönlendirme davranışını düzeltmeyi değerlendiririz. Aktarım sonrasında aynı ürün kimliğinin bağlantısını tekrar deneriz.

### Temsili örnek 3 · Reklam raporunda satış değeri beklenenden yüksek

Bir mağazada reklam raporundaki satış değeri ile sipariş paneli arasında fark görülüyor. Aynı dönem, para birimi ve değer tanımını karşılaştırarak başlarız. Test siparişinde ürün adedinin değere nasıl yansıdığını ve aynı satın almanın birden fazla dönüşüm işleminde tekliflere dahil edilip edilmediğini inceleriz. Düzeltme gerekiyorsa yeni test siparişini ve rapor kayıtlarını yeniden kontrol ederiz.

## İki ek temsili Alışveriş örneği

### Temsili örnek 4 · Yeni seride bazı ürünlerin GTIN bilgisi eksik

Mağaza yeni bir nevresim serisi ekliyor. Merchant Center bazı renk ve ölçülerde ürün tanımlayıcısı uyarısı gösteriyor. Önce ürün ayrıntısından hangi satırların etkilendiğini buluruz. Üreticinin o varyanta atadığı GTIN’i ambalaj veya üretici kaydıyla karşılaştırırız. Kod atanmamış ürünlerde Google’ın ilgili ürün tanımlayıcısı kurallarını kontrol ederiz. **Değerlendirme** · Bir renk için doğruladığımız kodu diğer varyantlara kopyalamadan her satırı ayrı eşler, veri işlendikten sonra ürün durumuna yeniden bakarız.

### Temsili örnek 5 · Sezon sonu ürünlerde harcama yoğunlaşıyor

Ev tekstili mağazası, harcamanın sezon sonu masa örtülerinde yoğunlaştığını görüyor. Ürün grubu raporundaki harcama ve satın almaları, kalan stok ve katkı payıyla karşılaştırırız. Sezon sonu ürünlere uygun bir özel etiket vererek sürekli stoklanan ürünlerden ayırırız. Ayrı bütçe gerekiyorsa bunu kampanya yapısı düzeyinde değerlendiririz. Örneğin tükenmek üzere olan bir seriyi, aynı ürün grubundaki düzenli stoklanan örtülerle birlikte yorumlamadan önce kalan satılabilir varyantları ve ürünlerin teslimat süresini kontrol ederiz. **Değerlendirme** · Sonraki raporda aynı tarih aralığı uzunluğunu ve satın alma tanımını kullanarak ürün dağılımı ile siparişleri birlikte inceleriz.

## Bir Alışveriş sorununu hangi sırayla teşhis ediyoruz?

### 1. Ürün durumunu açın

Google Alışveriş reklam danışmanlığında önce sorunlu varyantın Merchant Center kaydına bakarız. Açık bej 160 × 220 cm örtü için sorun açıklamasını, etkilenen ülkeyi ve ilgili gösterim yöntemini kaydederiz. Aynı modelin diğer renklerinde sorun olup olmadığını da kontrol ederiz.

### 2. Veri kaynağını karşılaştırın

Ürün kaydındaki alanı mağazadaki bilgi ve gönderilen değerle karşılaştırırız. Örneğin GTIN hatalıysa önce kodun mağaza alanında mı, aktarım sırasında mı değiştiğini belirleriz. Düzeltmeyi sonraki işleme sonrasında aynı ürün kimliğiyle tekrar inceleriz.

### 3. Kampanya kapsamını doğrulayın

Ürün reklam için uygun görünüyorsa Google Ads’de ilgili ürün veya listeleme grubuna bakarız. Örneğin sezon etiketi yeni eklenmiş bir örtünün doğru kampanyaya dahil olup olmadığını, kampanyada seçili ürün kapsamıyla karşılaştırırız.

### 4. Satın alma ölçümünü kontrol edin

Ürün reklam kapsamında olduğu hâlde sonuçlar belirsizse örnek siparişle işlem kimliğini, değeri ve para birimini test ederiz. Ardından düzeltmenin etkisini değerlendireceğimiz raporu ve tarih aralığını belirleriz. Bulguyu aynı ürün satırı üzerinden paylaşırız.

## Yapılan değişikliği hangi verilerle değerlendiriyoruz?

Örneğin fiyat sorunu düzeltildikten sonra ilk kontrol, ürün kaynağının yeniden işlenmesi ve ilgili ürünün durumudur. Harcama veya sipariş değişimini yorumlamak içinse ürünün kampanyadaki kapsamına, stok durumuna ve aynı dönemdeki diğer değişikliklere bakarız.

| Kontrol | İncelenen kayıt | Değerlendirmeye katkısı |
| --- | --- | --- |
| Ürün verisi | Ürün kimliği, varyant, fiyat ve stok | Doğru ürünün gönderildiğini gösterir. |
| İşleme durumu | Son aktarım ve ürün sorunu açıklaması | Düzeltmenin kaynakta ve işlenen kayıtta karşılığını gösterir. |
| Kampanya kapsamı | Dahil edilen ürün grubu ve ayarlar | İlgili ürünün hangi kampanyada değerlendirildiğini açıklar. |
| Satın alma ölçümü | İşlem kimliği, değer ve para birimi | Sipariş sonucunun nasıl kaydedildiğini anlamaya yardımcı olur. |

Ölçüm ve aktarımın teknik kontrollerini [Google Alışveriş Teknolojiler](/tr/hizmetler/google-shopping/teknoloji) sayfasında inceleyebilirsiniz.

## İnceleme için hangi örneği paylaşabilirsiniz?

Mağaza adresiniz ve sorun gördüğünüz bir ürün bağlantısı ilk görüşmeye başlamak için yeterlidir. Örneğin “Bu renk reklamda görünmüyor” veya “İndirimli fiyat eski kaldı” şeklinde bir gözlem, kontrolü belirli bir ürün kaydına odaklar. Merchant Center’daki sorun açıklaması varsa ilgili ürünle birlikte değerlendirebiliriz.

Sipariş ölçümüyle ilgili bir örnek paylaşacaksanız müşteri bilgilerini kaldırarak sorunu tarif edebilirsiniz. İlk görüşmede hangi kaydın inceleneceğini, erişim ihtiyacını ve sorumlu ekibi belirleriz. Çalışmanın nasıl ilerlediğini [Google Alışveriş Süreç](/tr/hizmetler/google-shopping/surec) sayfasında görebilirsiniz.
