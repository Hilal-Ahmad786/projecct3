## Hesaplar ve yetkiler

İşletme varlıklarının kime ait olduğu ve hangi ekibin hangi işlere erişmesi gerektiği belirlenir. Çalışma için gerekli yetkilerle ilerlenir. Şifre paylaşımı yerine platformun sunduğu erişim yöntemleri kullanılır.

Meta reklam hesap kurulumu veya Meta Business Manager kurulumu gündemdeyse önce mevcut işletme hesabı, varlık sahipliği ve kullanıcı yetkileri incelenir. İşletme portföyü için hesapta kullanılan güncel adlandırma ve adımlar kurulum sırasında doğrulanır.

## Meta piksel kurulumu

Tarayıcı tarafındaki ölçümde hangi sayfanın veya işlemin kaydedileceği planlanır. Bir düğmeye basılması ile işlemin gerçekten tamamlanması aynı şey değildir. Örneğin form hatalıysa yalnız gönder düğmesine basılması başarılı başvuru sayılmamalıdır.

## Sunucu tarafı ölçüm ihtiyacı

Mevcut altyapı uygunsa Conversions API gibi sunucu tarafı veri bağlantıları ayrıca değerlendirilir. Hangi verinin, hangi işlem için ve hangi izin akışıyla gönderileceği teknik kapsamda belirlenir. Sunucu tarafı bağlantı bütün veri kayıplarını ortadan kaldıran veya her satışı kesin eşleştiren bir çözüm olarak sunulmaz.

## Kurulumdan sonra hangi kontroller yapılır?

| Kontrol | Örnek soru |
|---|---|
| Olay doğruluğu | Form veya sipariş gerçekten tamamlandı mı? |
| Tekrar kayıt | Aynı işlem birden fazla kaynaktan tekrar sayılıyor mu? |
| Değer ve para birimi | Sipariş tutarı ve para birimi beklenen şekilde geliyor mu? |
| Ürün eşleşmesi | Kullanılan ürün kimliği katalogla tutarlı mı? |
| İzin davranışı | Mevcut izin tercihi ölçüm akışında uygulanıyor mu? |
| Kaynak farkları | Panel ile işletme kaydı arasındaki fark açıklanabiliyor mu? |

## Standart olaylar ve değer bilgisi

Meta dönüşüm takibinde olay adı, gerçekleşen kullanıcı eylemini doğru anlatmalıdır. Bir ürün sayfasını görüntülemek, sepete eklemek ve siparişi tamamlamak farklı aşamalardır. Olayın ne zaman gönderileceği ve hangi veriyi içereceği, mağazanın altyapısı ile izin tercihleri birlikte değerlendirilerek planlanır.

| Olay | Ne zaman düşünülür? | Kontrol |
|---|---|---|
| ViewContent | Ürün veya hizmet içeriği görüntülendiğinde | Doğru sayfa ve içerik kimliği eşleşiyor mu? |
| AddToCart | Ürün sepete eklendiğinde | Sepet işlemi gerçekten tamamlandı mı? |
| Lead | Talep formu başarıyla gönderildiğinde | Hatalı veya yarıda bırakılmış form sayılmıyor mu? |
| Purchase | Sipariş tamamlandığında | Sipariş değeri ve para birimi kayıtla uyumlu mu? |

Örneğin sıvı sabun sayfasındaki görüntüleme, el kremi siparişinin yerine geçmez. Olay adı, ürün kimliği, değer ve para birimi mağaza kayıtlarıyla karşılaştırılır; gereksiz kişisel veri gönderilmez.

## Piksel ve Dönüşümler API birlikte nasıl çalışır?

Meta Pikseli tarayıcıdan, Dönüşümler API ise desteklenen bir sunucu bağlantısından olay iletebilir. İkisini beraber kullanma kararı mevcut altyapı, izin yönetimi ve ölçüm gereksinimine bağlıdır; her site için zorunlu veya her kaybı gideren bir kurulum değildir.

Meta Dönüşüm API kurulumu ayrıca geliştirme veya sağlayıcı bağlantısı gerektirebilir; uygun yöntemi mevcut site altyapısı ve erişimlerle belirleriz.

Aynı satın alma iki kanaldan gönderiliyorsa, eşleşen olay bilgisi ve event_id gibi tanımlayıcılarla tekrar kayıtların yönetilmesi gerekir. Kurulumda tarayıcı ve sunucu olaylarının eşleşmesini, Etkinlik Yöneticisi'ndeki tanı bilgilerini ve sipariş kayıtlarını kontrol ederiz. Eşleştirme kalitesi tek başına tüm dönüşümlerin doğru ilişkilendirildiğini göstermez.

İzin tercihleri, tarayıcı ve iOS gizlilik kısıtları ölçülebilen veriyi etkileyebilir. Bu nedenle panelde görülen satış sayısını işletme sipariş defteriyle aynı kabul etmeyiz; dönem, atıf ayarı ve veri kaynaklarını raporda açıklarız. Atıf seçeneklerinin arayüzdeki güncel adları ve kullanılabilirliği uygulama sırasında doğrulanmalıdır.

## Katalog bağlantısı: Shopify, ikas ve özel altyapı

Ürün kataloğunu Meta'ya bağlama yöntemi mağazanın kullandığı platform ve veri akışına göre değişir. Shopify ve ikas mağazalarında mevcut uygulama veya bağlantı seçeneklerini inceleriz; özel altyapıda ürün beslemesi ve güncelleme sıklığı ayrıca değerlendirilir.

Bağlantıdan önce ürün kimliklerinin, fiyatın, stok durumunun, görselin ve ürün sayfası adresinin aynı ürünü gösterdiğini kontrol ederiz. Doğal kozmetik mağazasında sıvı sabun ürün setinin el kremi görseli veya yanlış sayfayla eşleşmemesi gerekir. Hata kaydı ve veri yenileme sorumluluğu da teknik kapsamın parçasıdır.

[Shopify geliştirme](/tr/hizmetler/shopify-development) · [ikas geliştirme](/tr/hizmetler/ikas-development).

## Hedef kitle sinyalleri ve veri kullanımı

Meta reklam hesabında Özel Hedef Kitleler; uygun koşullarda web sitesi ziyaretleri, müşteri listesi veya Facebook ve Instagram etkileşimleri gibi kaynaklardan oluşturulabilir. Benzer Hedef Kitleler mevcut bir kitleden sinyal alabilir; ilgi alanı ve demografik seçenekler de kampanya planında değerlendirilebilir. Bu seçeneklerin kullanılabilirliği hesap ve güncel platform kurallarına bağlıdır.

Kitle oluşturma kararı vermeden önce verinin nereden geldiğini, kullanım iznini ve işletmenin gizlilik süreçlerini kontrol ederiz. Örneğin bir müşteri listesini reklam hesabına aktarmak, yalnız teknik bir yükleme işlemi değildir; listenin nasıl toplandığı ve hangi amaçla kullanılabildiği de değerlendirilmelidir. Kitle seçimi, uygun olmayan veri kullanımını meşru hale getirmez ve kampanya sonucunu tek başına belirlemez.

İlk kez alışveriş yapanlarla daha önce ürün incelemiş kişilere aynı mesajın gösterilmesi de her zaman uygun değildir. Kitle sinyallerini ürün ilgisi ve kampanya amacına göre ayırabilir, fakat her grupta yeterli veri oluşup oluşmadığını ayrıca değerlendiririz. Kitle büyüklüğü, gösterim veya satış garantisi olarak yorumlanmaz.

## Araç seçimi mevcut altyapınıza göre yapılır

Shopify, ikas, WooCommerce veya özel yazılımda aynı kurulum yöntemi uygun olmayabilir. Mevcut entegrasyonların üzerine ikinci bir bağlantı eklemeden önce çalışan yapı incelenir. Desteklenen bağlantı ve test yöntemi belirlenir; gerekli geliştirmeler ayrıca tekliflendirilir.

[Shopify geliştirme](/tr/hizmetler/shopify-development). [ikas geliştirme](/tr/hizmetler/ikas-development). [E-ticaret çözümleri](/tr/hizmetler/e-commerce).

## Raporlama kaynaklarını birlikte okuyun

Reklam raporunu web analitiği ve satış kayıtlarıyla birlikte incelemek daha anlamlı sorular sormayı sağlar. Ölçüm dönemini, sonuç tanımını ve kaynak farklarını açıkça belirtiriz.
