## React Native çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| React Native ve TypeScript | Ortak kod iki platformda aynı davranıyor mu? |
| Expo veya yerel proje yapısı | Yönetilen iş akışı mı, tam yerel erişim mi gerekiyor? |
| Gerçek cihaz testleri | iOS ve Android’de akıcılık nasıl? |
| Çökme ve hata izleme | Hangi platformda hangi hata oluşuyor? |
| CI ve mağaza dağıtım araçları | Sürüm derlemesi ve gönderimi tekrarlanabilir mi? |

Apple ve Google geliştirici hesapları ile izleme erişimleri mümkünse sizin adınıza açılır. Expo kullanıp kullanmayacağımızı, yerel modül ihtiyacına göre birlikte belirleriz.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Çökmesiz oturum | Platform bazında hatasız oturum oranı | iOS ve Android ayrı okunur |
| Açılış süresi | Uygulama ne kadar sürede kullanılabilir oldu | Düşük donanımlı cihazlarda farklılaşır |
| Ortak kod oranı | Kodun ne kadarı iki platformda ortak | Yüksek oran tek başına kalite göstergesi değildir |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
