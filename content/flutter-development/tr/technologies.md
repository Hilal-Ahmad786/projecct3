## Flutter Uygulama çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| Test cihazları ve simülatör | Uygulama farklı telefon ve ekranlarda çalışıyor mu? |
| Kod deposu | Hangi değişiklik ne zaman, kim tarafından yapıldı? |
| Hata raporlama aracı | Kullanıcıda uygulama nerede çöktü? |
| Test dağıtım kanalı | Müşteri sürümü yayından önce deneyebiliyor mu? |
| Sürüm notları | Her sürümde ne değişti, neler test edildi? |

Geliştirme sırasında sürüm geçmişi tutar, test sürümlerini onayınız için TestFlight ve Google Play iç test kanallarıyla dağıtırız. Hata raporlama aracı kullanılacaksa kişisel veri toplama durumu mağaza gizlilik bildirimine uygun yazılır.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Çökme oranı | Uygulama kararlı çalışıyor mu | Cihaz ve işletim sistemi çeşitliliğine bağlıdır |
| Akış tamamlama | Kullanıcı hedefe ulaşabildi | Kullanıcı testiyle birlikte okunur |
| Mağaza yorumları | Kullanıcı uygulamayı nasıl buldu | Az sayıdaki yorum genel durumu yansıtmayabilir |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
