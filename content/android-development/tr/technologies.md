## Android Uygulama çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| Android Studio ve Gradle | Uygulama farklı derleme türlerinde tutarlı üretiliyor mu? |
| Firebase Crashlytics | Hangi cihazda ve sürümde çökme yaşanıyor? |
| Play Console | Yayın durumu, politika uyarıları ve kullanıcı yorumları ne söylüyor? |
| Gerçek cihaz ve emülatör | Farklı ekran ve sürümde akışlar çalışıyor mu? |
| Kod deposu ve CI | Her değişiklik otomatik derlenip test ediliyor mu? |

Geliştirici hesabı, imzalama anahtarı ve izleme erişimleri mümkünse sizin adınıza açılır. Anahtarı kaybetmek güncelleme yayınlamayı zorlaştırabileceği için yedeğini birlikte güvenceye alırız.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Çökmesiz oturum | Oturumların ne kadarı hatasız kapandı | Cihaz ve sürüm kırılımıyla okunur |
| Açılış süresi | Uygulama ne kadar sürede kullanılabilir oldu | Düşük donanımlı cihazlarda daha uzun olabilir |
| Mağaza puanı | Kullanıcı memnuniyeti nasıl yorumlanıyor | Az sayıda yorum yanıltıcı olabilir |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
