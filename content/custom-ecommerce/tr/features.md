## 2. İhtiyacınıza göre seçilebilen modüller



Bir özelliğin kapsamını belirlemek için önce kimin kullanacağını, hangi veriye ihtiyaç duyduğunu ve hangi durumda farklı davranması gerektiğini tarif ederiz.

| Alan | Yapılabilecek çalışma | Örnek kabul kontrolü |
| --- | --- | --- |
| Katalog ve ürün seçimi | Ürün türüne göre alanlar, filtreler ve seçenek kuralları | Uyumsuz ölçü ve malzeme seçimi sepete eklenemiyor. |
| Fiyat ve kampanya | Müşteri grubuna, miktara veya ürün seçimine bağlı fiyat | Doğru fiyat ürün sayfasında, sepette ve sipariş özetinde aynı görünüyor. |
| Sepet ve ödeme | Teslimat seçimi, teklif veya ödeme adımı | Başarısız ödeme siparişi ödenmiş duruma geçirmiyor. |
| Sipariş yönetimi | Onay, hazırlık, sevkiyat ve iade adımları | Yetkili ekip sıradaki işi ve güncel sipariş durumunu görebiliyor. |
| Yönetim paneli | Ürün, içerik ve operasyon ekranları | Kullanıcı yalnız yetkili olduğu işlemleri yapabiliyor. |
| Dış sistem bağlantıları | Stok, sipariş, kargo veya muhasebe veri aktarımı | Bağlantı hatası görülebiliyor ve yeniden deneme ikinci kayıt oluşturmuyor. |

Bu tablo örnek proje kapsamlarını gösterir. Kullanılacak modüller ve doğrulama adımları teklif aşamasında belirlenir.

## 3. Ürün kataloğu ve özel seçenekler

### Ürün türüne göre bilgi alanları

Her ürün türünün satın alma kararını etkileyen bilgileri farklı olabilir. Bir üründe ölçü ve malzeme önemliyken diğerinde uyumluluk veya teknik özellikler öne çıkabilir. Gerekli alanları ürün türüne göre düzenleyip filtre ve ürün sayfasında kullanılacak bilgileri belirleriz.

### Ölçü, varyant ve seçenek kuralları

Ölçüye göre satılan bir ürün için izin verilen boyutlar, malzeme seçenekleri ve fiyat hesabı birlikte planlanır. Sipariş kaydında üretim ekibinin göreceği ölçü ve seçimlerin de doğru saklanması gerekir.

### Arama ve filtreleme

Filtreler katalog verisinin nasıl tutulduğuna göre hazırlanır. Örneğin renk adları birden fazla biçimde yazılıyorsa önce bu değerleri düzenlemek, müşteriye daha tutarlı filtre sonuçları sunmayı kolaylaştırır.

## 4. Fiyatlandırma ve bayi kuralları

Toptan satış, ölçüye göre üretim veya teklif üzerinden çalışan modellerde tek bir liste fiyatı yeterli olmayabilir. Hangi müşterinin hangi fiyatı göreceği ve bu fiyatın siparişe nasıl yansıyacağı yazılı kurallara bağlanır.

- Bayi ve perakende müşterileri için ayrı fiyat listeleri.
- Miktar veya ürün seçimine göre fiyat hesaplama.
- Minimum sipariş koşulları ve gerektiğinde teklif talebi.
- Kampanya ve bayi indirimi birlikte geçerliyse uygulama sırasının belirlenmesi.

Örneğin onaylı bir bayi giriş yaptığında kendi fiyatını görmeli ve aynı tutar sepete yansımalıdır. Kampanya çakışması, yetkisiz erişim ve eksik fiyat verisi de test kapsamına alınabilir.

[B2B e-ticaret çözümlerini inceleyin](/tr/hizmetler/b2b-ecommerce).

## 5. Sepet, ödeme ve teslimat

Müşteri siparişi tamamlamadan önce seçtiği ürünleri, teslimat seçeneklerini ve ödeyeceği tutarı görebilmelidir. Standart ödeme, sipariş ön onayı veya teklif talebi gibi seçeneklerden hangisinin gerekli olduğunu iş modeline göre belirleriz.

Ödeme ve kargo bağlantıları için sağlayıcı desteği, hesap erişimi ve test olanakları incelenir. Başarısız ödeme, eksik teslimat bilgisi ve yeniden deneme gibi durumlar için beklenen davranış tanımlanır.

[Ödeme geçidi entegrasyonunu inceleyin](/tr/hizmetler/payment-gateway-integration).

## 6. Sipariş yönetimi ve ekip yetkileri

Sipariş alındıktan sonra sıradaki işi kimin yapacağı belli olmalıdır. Depo ekibi hazırlık durumunu güncelleyebilir, müşteri destek ekibi sipariş geçmişini inceleyebilir ve gerektiğinde yetkili kişi iptal veya iade işlemini başlatabilir. Ekranlar ve yetkiler işletmenizdeki gerçek görev dağılımına göre planlanır.

| İşlem | Tasarımda netleştirilecek konu |
| --- | --- |
| Sipariş onayı | Hangi siparişler onay bekler ve kim karar verir? |
| Depo veya üretim | Ekip hangi ürün, ölçü ve teslim bilgilerini görür? |
| Sevkiyat | Takip numarası nereden gelir ve müşteriye nasıl gösterilir? |
| İptal ve iade | Hangi roller işlem yapabilir ve durum hangi sisteme aktarılır? |



## 7. Entegrasyonlar ve veri sahipliği

Stok, fiyat ve sipariş bilgileri farklı sistemlerde tutuluyorsa her veri için hangi sistemin ana kayıt olduğu belirlenir. Örneğin stok işletme yazılımında yönetiliyorsa mağaza güncel bilgiyi o kaynaktan alabilir. Bağlantı kesildiğinde son bilinen stokla satışa devam edilip edilmeyeceği de iş kuralıdır.

- Aktarılacak verileri ve aktarım yönünü belirleyin.
- Güncellemenin hangi olayda veya hangi sıklıkla yapılacağını tanımlayın.
- Başarısız işlem için bildirim ve yeniden deneme yaklaşımını kararlaştırın.
- Aynı sipariş birden fazla kez iletilirse ikinci kaydın oluşmasını önleyen davranışı test edin.

Uygulanabilirlik, ilgili sistemlerin erişim izinleri ve bağlantı olanaklarına göre değerlendirilir.



## 8. İlk sürüm için özellikleri önceliklendirin

İlk sürümün kapsamını tek bir ürünün satış yolculuğu üzerinden tarif edin. Müşteri ürünü seçebiliyor mu? Fiyat doğru mu? Sipariş, işlemi yapacak ekibe ulaşıyor mu? Bu akışı destekleyen özellikler başlangıç kapsamına alınabilir. Ek raporlar, yeni satış kanalları ve daha ayrıntılı otomasyonlar sonraki aşamalarda değerlendirilebilir.



## 9. Sık sorulan sorular

### Tablodaki bütün modüller her projeye dahil mi?

Proje kapsamı ürünlerinize, satış kurallarınıza ve mevcut sistemlerinize göre oluşturulur. Dahil modüller, teslimatlar ve test senaryoları teklifte belirtilir.

### Mevcut mağazama yalnızca bir özellik ekleyebilir miyim?

Mevcut altyapının desteklediği alanlarda tek bir özellik veya bağlantı geliştirilebilir. Önce teknik sınırları, mevcut akışa etkisini ve bakım ihtiyacını değerlendiririz.

### Ürün ve fiyat kurallarını ekibim güncelleyebilir mi?

Hangi kuralın yönetim panelinden değiştirileceği proje başında belirlenir. Sık değişen fiyat veya seçenekler için yetkili kullanıcı ekranı planlanabilir. İş kuralının yapısını değiştirmek ayrıca geliştirme gerektirebilir.

### İlk görüşmeye hangi örneklerle gelmeliyim?

Bir örnek ürün, bir fiyat kuralı ve bir sipariş senaryosu iyi bir başlangıçtır. Mevcut mağaza adresinizi ve bağlantı kurulması gereken sistemleri de paylaşabilirsiniz.
