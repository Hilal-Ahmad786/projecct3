## API Geliştirme çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| OpenAPI veya şema dokümanı | API’nin sözleşmesi güncel ve anlaşılır mı? |
| API test aracı | İstekler beklenen yanıtı ve hata kodunu veriyor mu? |
| Test ve canlı ortam | Yeni sürüm kullanıcıları etkilemeden denenebiliyor mu? |
| Kayıt ve izleme paneli | Hangi uç nokta yavaş veya hata veriyor? |
| Kimlik ve anahtar yönetimi | Kimin hangi erişimi var, anahtar nasıl iptal edilir? |

API anahtarları ve gizli bilgiler kodun içinde değil, güvenli yapılandırma alanlarında tutulur ve kayıtlara yazılmaz. İstek sınırı ve erişim kayıtları, kötüye kullanımı ve beklenmeyen yük artışını erken görmek için kurulur.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Hata oranı | İsteklerin ne kadarı hata dönüyor | İstemci hatası ile sunucu hatası ayrı okunmalıdır |
| Yanıt süresi | API isteğe ne kadar sürede cevap veriyor | Ortalama yerine yüksek yüzdelik dilimlere bakılır |
| Kullanım hacmi | Hangi uç nokta ne kadar çağrılıyor | Tek başına başarı veya yük göstergesi değildir |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
