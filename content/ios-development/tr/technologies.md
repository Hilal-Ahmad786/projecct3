## iOS Uygulama çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| Xcode ve Swift Package Manager | Uygulama ve bağımlılıklar tutarlı derleniyor mu? |
| TestFlight | Seçili kullanıcılar sürümü yayından önce deneyebiliyor mu? |
| App Store Connect | Gönderim, inceleme ve sürüm durumu nedir? |
| APNs ve bildirim servisi | Bildirimler doğru cihaza ulaşıyor mu? |
| Crash raporları | Hangi cihazda ve iOS sürümünde çökme var? |

Apple geliştirici üyeliği, sertifikalar ve App Store Connect erişimi mümkünse sizin kurumunuz adına açılır. Böylece uygulamanın sahipliği ve mağaza hesabı bizden bağımsız sizde kalır.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Çökmesiz oturum | Oturumların ne kadarı hatasız tamamlandı | iOS sürümü ve cihaz modeline göre okunur |
| Gönderim sonucu | İnceleme ilk seferde geçti mi, hangi nota takıldı | Süreç Apple’a bağlıdır, öngörülemez |
| Bildirim izin oranı | Kullanıcıların kaçı bildirime izin verdi | İzin isteme zamanlamasıyla değişir |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
