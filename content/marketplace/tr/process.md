## Pazaryeri geliştirme süreci hangi adımlarla ilerler?

Çok satıcılı bir pazaryeri projesine ilk satıcı grubunu, satış modelini ve örnek bir siparişi belirleyerek başlıyoruz. Siparişi satıcı başvurusundan kısmi iadeye kadar adım adım ele alarak ilk sürüm için gereken ekranları, kuralları ve bağlantıları netleştiriyoruz.

### 1. Satış modelini ve ilk sürüm kapsamını belirleyin

Kimlerin satış yapacağını, hangi ürünlerin yayımlanacağını ve platform ekibinin hangi işlemleri onaylayacağını belirleriz. Ödeme ve kargo modeliyle mevcut sistemleri de değerlendiririz.

### 2. Alıcı, satıcı ve yönetici akışlarını tasarlayın

Örnek siparişin her rolün ekranında nasıl ilerlediğini çıkarırız. Ürün reddi, ayrı gönderiler ve iade talebinin sorumluluğunu tanımlarız.

### 3. İşlevleri geliştirin ve bağlantıları deneyin

Onaylanan kapsam doğrultusunda mağaza, satıcı paneli ve yönetim ekranlarını geliştiririz. Ödeme, kargo ve stok bağlantıları varsa sağlayıcıların test imkânlarıyla veri akışını kontrol ederiz.

### 4. Kabul testlerini örnek siparişlerle yürütün

Platform ekibi ve pilot satıcılarla hangi sonucun kabul edileceğini belirleriz. Sipariş dağıtımı, ürün onayı, kısmi iade ve tekrar gelen bildirimler proje kapsamına göre test edilir.

### 5. Pilot satıcılarla yayına hazırlanın

Pilot satıcılarla katalog girişini, sipariş takibini ve iade işleyişini deneyin. Açık sorunları belirleyip daha geniş katılımı planlayın. Yönetim devri ve destek kapsamı proje planında tanımlanır.

## Kabul testinde hangi sonuçlar aranır?

Her senaryoda alıcı, satıcı ve yöneticinin ekranında beklenen sonuç önceden yazılır. Yayın kararı bu sonuçlar örnek siparişlerle doğrulandıktan sonra verilir.

| Senaryo | Beklenen sonuç |
| --- | --- |
| İki satıcıdan tek alışveriş | Her satıcı kendi sipariş kalemlerini görür; alıcı gönderileri ayrı takip eder. |
| Ürün onayının reddedilmesi | Ürün satışa açılmaz; satıcı düzeltme gerekçesini görüp yeniden incelemeye gönderebilir. |
| Tek ürünün iade edilmesi | İade ilgili kaleme işlenir; komisyon ve hakediş düzeltmesi bu kayıtla takip edilir. |
| Ödeme bildiriminin tekrar gelmesi | Aynı ödeme için mükerrer sipariş veya hakediş kaydı oluşmaması kontrol edilir. |

## İlk sürüm kapsamı değişirse ne olur?

Geliştirme sırasında yeni bir talep geldiğinde ekranlara, yetkilere, testlere ve takvime etkisi birlikte değerlendirilir. Talebin ilk sürüme mi, pilot sonrası bir aşamaya mı alınacağı yazılı olarak kararlaştırılır.

## İlk görüşmeye ne getirmelisiniz?

Kapsamı ilk görüşmede netleştirmek için aşağıdaki bilgiler yeterlidir. Hepsi hazır değilse eksik kalanları birlikte tamamlayabiliriz.

- İlk satıcı grubunuz ve ürünlerden bir örnek
- Varsa satıcı kabulü, komisyon ve iade için düşündüğünüz kurallar
- Kullandığınız veya değerlendirdiğiniz ödeme, kargo ve stok sistemleri
- Varsa hedef yayın tarihi, pilot satıcılar ve taşınacak ürün verileri

Bu kapsamın bütçeye etkisini [pazaryeri yazılımı fiyatları](/tr/hizmetler/marketplace-development/fiyatlandirma) sayfasında inceleyebilirsiniz.

::cta İki örnek satıcı ve bir örnek sepet üzerinden başlayalım. | Pazaryeri Projemi Planla
