## Android uygulama geliştirmede hangi işleri yapıyoruz?

### Kotlin ve Jetpack altyapısı

Güncel Android bileşenleriyle bakımı kolay, bölümlere ayrılmış ve test edilebilir bir kod yapısı kurarız.

### Cihaz ve sürüm uyumu

Hedef ekran, sistem sürümü ve üretici farklarını listeler, kritik akışları gerçek cihazlarda deneriz.

### Performans ve pil

Açılış süresi, liste akıcılığı ve arka plan işlerini ölçer, gereksiz pil tüketimini azaltırız.

### Yayın ve sürüm yönetimi

İmzalama, kapalı test, aşamalı yayın ve güncelleme düzenini yazılı bir sürüm planına bağlarız.

## Mağaza yayını bir kontrol listesidir

Google Play politikaları, hedef API seviyesi gereksinimleri ve veri güvenliği beyanı zamanla değişir. Yayından önce güncel gereksinimleri kontrol eder, kapalı test aşamasından geçirir, aşamalı yayınla riski küçültürüz. Onay süresini ve sonucunu garanti edemeyiz.

## Hizmete dahil olanlar teklifinizde açık olsun

| Başlık | Nasıl netleşir? |
| --- | --- |
| Kapsam | Hangi çalışmaların yapılacağı ve hangilerinin kapsam dışı kaldığı yazılır |
| Teslimler | Her çalışmanın çıktısı, biçimi ve teslim tarihi belirlenir |
| Revizyon | Kaç tur düzeltme yapılacağı ve onay sürecinin kimde olduğu belirlenir |
| Erişim ve sahiplik | Hesaplar, dosyalar ve kaynak materyallerin kimde kalacağı belirlenir |
| Üçüncü taraf ücretleri | Lisans, sunucu, platform veya kullanım ücreti gibi giderler teklifte ayrı yazılır |

## Hangi durumlarda farklı bir yaklaşım öneririz?

Android Uygulama her işletme için ilk adım olmayabilir. Hedef netleşmemişse, mevcut altyapı bu çalışmayı taşıyamıyorsa ya da başarıyı değerlendirecek bir kayıt yoksa önce bunları ele almak daha doğru olabilir. Böyle bir durumda kapsamı daraltır veya önce hazırlık işini öneririz; amacımız çalışmanın işletmenize gerçekten fayda sağlamasıdır.

## Kapsamı birlikte belirleyelim

Hangi çalışmalara öncelik vermek istediğinizi paylaşın; çalışma kapsamını ve teslimleri birlikte netleştirelim.
