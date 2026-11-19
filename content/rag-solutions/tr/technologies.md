## RAG Çözümü çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| Arama test seti | Bu soru için doğru doküman parçası bulunuyor mu? |
| Doküman deposu | Hangi kaynaklar dizine alındı ve hangi sürüm? |
| Vektör arama dizini | Anlamca yakın parçalar bulunabiliyor mu? |
| Yetki eşleştirmesi | Kullanıcı yalnızca yetkili olduğu dokümanı görüyor mu? |
| Konuşma ve arama kayıtları | Hangi sorular yanıtsız veya yanlış kaldı? |

Dizin ve model seçiminde veri hassasiyeti, dil desteği ve maliyet birlikte değerlendirilir. Taranmış PDF ve karmaşık tablolar için okuma kalitesi ayrıca test edilir; her doküman türü aynı doğrulukla okunamayabilir.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Doğru parça bulma | Test sorularında doğru kaynağın bulunma payı | Test seti sınırlıysa gerçeği yansıtmayabilir |
| Kaynaklı yanıt oranı | Yanıtların kaynakla desteklenme sıklığı | Kaynağın doğru yorumlandığını kanıtlamaz |
| Yanıtsız soru oranı | Asistanın bilgi bulamadığı soruların payı | İçerik eksikliğini gösterir, hata olmayabilir |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
