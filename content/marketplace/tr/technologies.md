## Satıcı verileri ve erişim yetkileri

Satıcı kullanıcısı yalnızca kendi mağazasına ait ürünleri, sipariş kalemlerini ve hakediş kayıtlarını görür. Yetki kuralları hem panelde hem de veriyi sunan sistemde birlikte ele alınır.

Platform ekibinin erişimi görevine göre belirlenir. Örneğin ürün onayından sorumlu ekip üyesine katalog yetkisi verilirken ödeme kayıtlarına erişim finans ekibine ayrılabilir.

## Tek alışveriş, ayrı sipariş kalemleri

İki satıcıdan alışveriş yapan müşteri siparişini hesabında bir bütün olarak görür. Altyapı her kalemi ilgili satıcıyla eşleştirir; gönderi, iptal ve iade durumları ayrı kaydedilir.

## Ödeme, komisyon ve mutabakat

Sipariş tutarı, komisyon, satıcı hakedişi ve iade düzeltmeleri ayrı kayıtlarla takip edilir. Kısmi iadede müşteriye dönen tutar ile ilgili satıcının hakediş düzeltmesi aynı sipariş kalemiyle eşleştirilir.

Satıcıya ödeme aktarımı, işletmenizin ödeme modeline ve seçilen sağlayıcının sunduğu özelliklere bağlıdır. Ödeme bağlantısının kapsamı için [ödeme geçidi entegrasyonu](/tr/hizmetler/payment-gateway-integration) sayfasına bakabilirsiniz.

## Kargo, stok ve işletme yazılımı bağlantıları

Bağlantıların her biri için hangi verinin hangi yönde aktarılacağını ve hangi sistemin esas alınacağını belirleyin. Aynı ürün farklı satıcılarda bulunuyorsa stok kayıtları satıcıya ait ürün kodlarıyla eşleştirilir.

| Bağlantı | Planlanacak veri akışı | Tasarım kararı |
| --- | --- | --- |
| Ödeme sağlayıcısı | Ödeme sonucu, iade durumu ve varsa satıcı aktarım bilgisi | Başarısız veya geciken işlem nasıl takip edilecek? |
| Kargo sistemi | Gönderi numarası, takip bilgisi ve teslimat durumu | Satıcılar kendi kargo hesaplarını mı kullanacak? |
| Stok veya ERP | Ürün kodu, stok miktarı ve sipariş hareketleri | Stok için esas alınacak sistem hangisi? |
| Muhasebe sistemi | Satış, komisyon ve iade kayıtları | Hangi kayıtlar hangi ayrıntıda aktarılacak? |

Bir bağlantı geciktiğinde satışa açık stok miktarının nasıl belirleneceği proje başında kararlaştırılır.

## Entegrasyon kesintileri nasıl ele alınır?

Bir kargo sistemi geç yanıt verdiğinde gönderi isteği izlenebilir ve güvenli biçimde yeniden denenebilir. Aynı ödeme bildirimi tekrar geldiğinde mevcut işlem kaydı bulunarak mükerrer hakediş oluşması önlenebilir.

Otomatik çözülemeyen işlemler ekibin inceleyeceği bir hata listesine alınabilir. Bu davranışlar seçilen bağlantıların sunduğu imkânlarla birlikte kapsamlandırılır.

## Altyapı seçimini hangi ihtiyaçlar belirler?

Satıcı ve ürün sayısı, katalog güncelleme sıklığı, yoğun dönem beklentisi ve bağlantıların çalışma biçimi altyapı kararlarını etkiler. Bir örnek sipariş, kısmi iade ve bağlantı kesintisi senaryosu hangi bileşenlerin ilk sürümde gerekli olduğunu ortaya çıkarmaya yardımcı olur.

Mevcut bir mağazayı genişletmek mi, yeni bir platform kurmak mı gerektiğini [özel e-ticaret yazılımı](/tr/hizmetler/custom-ecommerce) seçenekleriyle birlikte değerlendirebiliriz.

::cta Kullandığınız ödeme, stok, muhasebe ve kargo sistemlerini paylaşın; veri akışını birlikte çıkaralım. | Teknik İhtiyaçlarımı Paylaş
