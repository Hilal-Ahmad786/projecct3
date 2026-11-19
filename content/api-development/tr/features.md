## API geliştirme ve entegrasyonda hangi işleri yapıyoruz?

### API tasarımı ve sözleşme

Uç nokta, veri biçimi ve hata kodlarını tasarlar, uygulamadan önce onayınıza sunarız.

### Kimlik doğrulama ve güvenlik

Erişim yöntemini, yetkileri ve istek sınırlarını belirler, güvenlik kontrollerini testle doğrularız.

### Dokümantasyon ve test

OpenAPI dokümanı, örnek istekler ve otomatik test seti hazırlar, hata senaryolarını da dahil ederiz.

### Entegrasyon ve izleme

Dış servis bağlantılarını kurar; kullanım, gecikme ve hata kayıtlarını izleyecek düzeni oluştururuz.

## Üçüncü taraf entegrasyonlar kırılgandır

Ödeme, kargo, muhasebe gibi dış servislerin API’leri değişebilir, kesinti yaşayabilir veya istek sınırı koyabilir. Bu yüzden tekrar deneme, zaman aşımı, hata kaydı ve uyarı düzeni kurar, dış servis çalışmadığında kendi sisteminizin nasıl davranacağını önceden belirleriz.

## Hizmete dahil olanlar teklifinizde açık olsun

| Başlık | Nasıl netleşir? |
| --- | --- |
| Kapsam | Hangi çalışmaların yapılacağı ve hangilerinin kapsam dışı kaldığı yazılır |
| Teslimler | Her çalışmanın çıktısı, biçimi ve teslim tarihi belirlenir |
| Revizyon | Kaç tur düzeltme yapılacağı ve onay sürecinin kimde olduğu belirlenir |
| Erişim ve sahiplik | Hesaplar, dosyalar ve kaynak materyallerin kimde kalacağı belirlenir |
| Üçüncü taraf ücretleri | Lisans, platform veya reklam bütçesi gibi giderler teklifte ayrı yazılır |

## Hangi durumlarda farklı bir yaklaşım öneririz?

API Geliştirme her işletme için ilk adım olmayabilir. Hedef netleşmemişse, mevcut altyapı bu çalışmayı taşıyamıyorsa ya da başarıyı değerlendirecek bir kayıt yoksa önce bunları ele almak daha doğru olabilir. Böyle bir durumda kapsamı daraltır veya önce hazırlık işini öneririz; amacımız çalışmanın işletmenize gerçekten fayda sağlamasıdır.

## Kapsamı birlikte belirleyelim

Hangi çalışmalara öncelik vermek istediğinizi paylaşın; çalışma kapsamını ve teslimleri birlikte netleştirelim.
