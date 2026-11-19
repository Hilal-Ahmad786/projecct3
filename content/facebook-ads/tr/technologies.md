## Hangi araç hangi soruya cevap verir?

| Araç | Rolü | Tek başına kanıtlamadığı şey |
| --- | --- | --- |
| Meta Ads Manager | Kampanyaları yönetmek ve platform raporlarını incelemek | İşletmenin toplam net kârı |
| Meta Pixel | Web sitesindeki seçili olayları tarayıcı üzerinden iletmek | Her ziyaretin eksiksiz izlenmesi |
| Conversions API | Uygun olayları sunucu veya entegrasyon üzerinden iletmek | Bütün veri kayıplarının ortadan kalkması |
| GA4 | Web sitesi davranışını ayrı bir analiz sistemiyle incelemek | Meta raporuyla birebir aynı sonuç |
| GTM | Kullanıldığı projelerde etiketlerin yönetimini düzenlemek | Otomatik olarak doğru dönüşüm ölçümü |
| CRM / sipariş kayıtları | Başvuru ve satışın işletmedeki durumunu görmek | Her satışın kesin biçimde tek bir reklama bağlanması |

## Önce olay planını oluştururuz

Bir düğmeye basılması ile formun başarıyla teslim edilmesi farklı eylemlerdir. Form hatayla sonuçlanıyorsa bunu tamamlanmış talep gibi değerlendirmemek gerekir. Mağazada da ürün görüntüleme, sepete ekleme ve onaylanmış satın alma ayrı adımlardır.

| İş eylemi | Örnek ölçüm | Kontrol sorusu |
| --- | --- | --- |
| Form başarıyla ulaştı | Lead | Kayıt sistemde gerçekten oluştu mu? |
| Sipariş tamamlandı | Purchase | Değer, para birimi ve sipariş durumu doğru mu? |
| Ürün incelendi | ViewContent | Doğru ürünle ilişkilendirildi mi? |
| İletişim bağlantısı tıklandı | Ayrı tıklama olayı | Bu tıklama yanlışlıkla satış sayılıyor mu? |

Olay isimleri ve parametreler altyapıya göre kesinleştirilir. Her projeye bütün olayları eklemek yerine karar vermek için gerekenleri seçeriz.

## Tarayıcı ve sunucu verilerini birlikte kontrol ederiz

Aynı kullanıcı eylemi birden fazla kaynaktan gönderildiğinde raporun şişmemesi için mükerrer olay kontrolü gerekir. Kurulumun yalnızca veri gönderdiğini değil, test işlemlerinin beklenen şekilde işlendiğini de inceleriz. Uygulamada kullanılan entegrasyonun güncel resmi yönergeleri esas alınır.

Meta'nın [Pixel ve Conversions API dokümantasyonu](https://developers.facebook.com/docs/facebook-business-extension/fbe/guides/pixel-events) bu araçların tarayıcı ve sunucu tarafından iletilebilen olaylardaki rollerini açıklar. Hangi bağlantının uygun olduğu sitenizin altyapısına ve ölçüm gereksinimlerinize bağlıdır.

## Raporlar neden farklı sonuçlar gösterebilir?

Platformlar farklı ölçüm kapsamları ve ilişkilendirme yaklaşımları kullanabilir. Zaman aralığı, veri erişimi, zaman dilimi ve olay tanımı da karşılaştırmayı etkiler. Bu nedenle bir rapordaki rakamı diğerinin üzerine yazmak yerine farkın nedenini araştırırız.

## Altyapınız için doğru bağlantıyı seçelim

Shopify, ikas, WooCommerce veya özel yazılım kullanıyor olabilirsiniz. Mevcut entegrasyonu incelemeden yeni etiket veya eklenti eklemeyiz. Kimin hangi veriye erişeceği, bağlantının bakımı ve hata kontrolü iş kapsamına dahil edilmelidir.

[Yönetim süreci](/tr/hizmetler/facebook-ads/surec) · [Hizmet kapsamı](/tr/hizmetler/facebook-ads/ozellikler)
