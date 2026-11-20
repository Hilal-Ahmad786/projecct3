## API Entegrasyonu çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| Servis dokümantasyonu ve test ortamı | Servis hangi veriyi ve hata kodunu döndürüyor? |
| İstek ve yanıt günlüğü | Hangi istek gitti, ne cevap geldi? |
| Kuyruk ve hata listesi | Hangi kayıt takıldı ve neden? |
| İzleme ve uyarı | Bağlantı durduğunda kim haberdar olacak? |
| Teknik doküman | Bağlantıyı başkası devralabilir mi? |

Kuyruk, zamanlanmış iş ve izleme için mevcut altyapınıza uygun araçlar seçilir; hepsi için ek yazılım gerekmeyebilir. Servisin sunduğu güncel arayüz ve sürüm sınırlamaları entegrasyon başında kontrol edilir; servis tarafı değişirse bakım gerekebilir.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Başarılı istek | İstek hatasız tamamlandı | Başarı kodu verinin doğru olduğunu garanti etmez |
| Takılan kayıt | İşlenemeyen kayıt sayısı | Nedenleriyle birlikte okunur |
| Gecikme | Verinin hedef sistemde görünme süresi | Servis hız sınırından etkilenir |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
