## Yapay Zeka Ajanı çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| Senaryo ve değerlendirme seti | Ajan örnek görevlerde beklenen sonucu veriyor mu? |
| Adım kayıtları | Ajan hangi aracı neden çağırdı? |
| Test ortamı | Ajan gerçek veriye dokunmadan denenebiliyor mu? |
| Onay kuyruğu | Hangi eylemler insan onayı bekliyor? |
| Kullanım limitleri | Adım ve harcama sınırı aşıldı mı? |

Ajanları önce test ortamında, gerçek veriye yazma yetkisi olmadan çalıştırırız. Yetkileri kademeli olarak, ancak değerlendirme sonuçları ve sizin onayınızla genişletiriz. Çerçeve ve model seçimi veri gizliliği, maliyet ve bakım kolaylığına göre karara bağlanır.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Görev başarı oranı | Değerlendirme senaryolarında doğru tamamlanan görev payı | Senaryolar gerçek vakaları temsil etmeyebilir |
| Onay reddi oranı | İnsanların ajan önerisini reddetme sıklığı | Yüksek oran ajanın görevi yanlış anladığını gösterebilir |
| Görev başına maliyet | Bir görev için yapılan model çağrılarının toplam bedeli | Karmaşık görevlerde değişkendir |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
