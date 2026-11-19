## LLM Entegrasyonu çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| Değerlendirme seti | Model veya prompt değişince kalite düştü mü? |
| Prompt sürüm kaydı | Hangi talimat metni ne zaman kullanıldı? |
| Kullanım ve maliyet paneli | Hangi özellik ne kadar model harcaması yapıyor? |
| Test ortamı | Değişiklik gerçek kullanıcıya gitmeden denendi mi? |
| Hata ve gecikme kayıtları | Sağlayıcı ne zaman yavaşladı veya hata verdi? |

Entegrasyonu sağlayıcıdan bağımsız bir katman üzerinden kurarız; böylece model değiştirmek uygulamanın tamamını yeniden yazmayı gerektirmez. API anahtarları sizin hesabınızda ve gizli yönetim aracında tutulur, kod deposuna yazılmaz.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Değerlendirme puanı | Örnek setinde beklenen sonuca yakınlık | Set gerçek kullanımı temsil etmezse yanıltabilir |
| Yanıt gecikmesi | İstekten yanıta geçen süre | Yoğunluk ve sağlayıcıya göre değişir |
| İstek başına maliyet | Bir çağrının ortalama model bedeli | Girdi uzunluğuna ve model seçimine bağlıdır |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
