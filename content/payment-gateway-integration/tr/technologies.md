## Ödeme Entegrasyonu çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| Sağlayıcı test ortamı | Akış canlıdan önce hangi durumlarda hata veriyor? |
| Webhook günlüğü | Hangi bildirim geldi, işlendi mi? |
| Sipariş ve ödeme kaydı | Ödeme ile sipariş durumu uyumlu mu? |
| Sağlayıcı paneli | Tahsilat, iade ve komisyon ne durumda? |
| Mutabakat raporu | Kayıtlar arasında fark var mı? |

Entegrasyon, sağlayıcının resmî dokümantasyonuna ve test ortamına göre yapılır. Gizli anahtarlar ortam değişkenlerinde saklanır, kod deposuna yazılmaz. Canlıya almadan önce başarılı, başarısız, iptal ve tekrar eden bildirim senaryoları test edilir.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Başarılı ödeme | Ödeme tamamlandı | Başarısızlık nedenleriyle birlikte okunmalıdır |
| Bildirim hatası | Webhook işlenemedi | Siparişin etkilenip etkilenmediğine bakılır |
| Mutabakat farkı | Kayıtlar arası uyumsuzluk | Dönem ve iade zamanlaması fark yaratabilir |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
