## WooCommerce çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| Test mağazası | Değişiklikler canlı mağazayı etkilemeden denenebiliyor mu? |
| Sipariş ve ödeme kayıtları | Test siparişi ödeme ve stok adımlarından geçti mi? |
| Hız ölçüm araçları | Sayfalar hangi koşulda yavaş açılıyor? |
| Yedekleme kaydı | Bir sorun olursa mağaza geri getirilebilir mi? |
| Hata günlüğü | Hangi eklenti veya işlem hata veriyor? |

Geliştirme, canlı mağazanın kopyası olan test ortamında yürütülür. Canlıya geçişten önce yedek alır, güncellemeleri ve eklenti değişikliklerini bu ortamda deneyerek mağazayı kesintiye uğratma riskini azaltırız.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Sayfa hızı | Ürün ve ödeme sayfaları ne kadar hızlı açılıyor | Cihaz ve bağlantıya göre değişir |
| Sepet tamamlama | Sepete ekleyenlerden kaçı siparişe ulaşıyor | Ödeme yöntemi ve trafik kaynağıyla birlikte okunur |
| Hata kayıtları | Ödeme veya sipariş adımlarında kaç hata oluştu | Hatanın kaynağı eklenti mi, sunucu mu ayrıştırılmalıdır |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
