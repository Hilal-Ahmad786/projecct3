## Mağaza kataloğu Merchant Center’a nasıl aktarılır?

Ürün aktarım yöntemini mağaza altyapınıza, güncelleme sıklığına ve ürün sayısına göre seçeriz. Örneğin gün içinde stoku değişen bir katalog için fiyat ve stok güncellemelerinin ne zaman Google’a ulaştığını bilmek önemlidir. Mevcut bir bağlantı varsa önce örnek bir ürünün mağazadan Merchant Center’a hangi yolla gittiğini izleriz.

| Aktarım yöntemi | Ne zaman değerlendirilir? | İlk kontrol |
| --- | --- | --- |
| Mağaza platformu bağlantısı | Platform uygun bir bağlantı sunuyorsa | Hangi alanların ve varyantların eşitlendiği |
| Zamanlanmış dosya aktarımı | Katalog düzenli olarak dosyaya aktarılabiliyorsa | Dosya erişimi, güncelleme sıklığı ve işleme sonucu |
| API bağlantısı | Özel katalog akışı veya farklı bir kaynak sistemi varsa | Ürün kimlikleri, güncelleme kayıtları ve hata takibi |

Örneğin bir nevresimin mavi ve beyaz renkleri farklı ürün kimlikleriyle aktarılıyorsa mağazada stok değiştiğinde hangi kaydın güncellendiğini kontrol ederiz. Satışa uygun ürünlerin nasıl seçildiğini [Google Alışveriş Özellikler](/tr/hizmetler/google-shopping/ozellikler) sayfasında inceleyebilirsiniz.

## Varyantlar ürün verisinde nasıl gruplanır?

Google Merchant Center ürün feed kurulumunda keten masa örtüsünün her satılabilir renk ve ölçüsüne ayrı `id` verilir. Aynı modelin seçenekleri ortak `item_group_id` altında toplanır. Her satırda `color`, `size` ve doğru seçeneği açan `link` gönderilir.

| Örnek `id` | `item_group_id` | `color` | `size` |
| --- | --- | --- | --- |
| `ort-bej-160220` | `ort-keten` | Açık bej | 160 × 220 cm |
| `ort-mavi-160220` | `ort-keten` | Mavi | 160 × 220 cm |
| `ort-bej-140180` | `ort-keten` | Açık bej | 140 × 180 cm |

Örneğin açık bej 160 × 220 cm satırının bağlantısı, açılış sayfasında o renk ve ölçüyü seçili göstermeli. Varyant farklı fiyattan satılıyorsa açılan sayfadaki tutarı da karşılaştırırız. Varyant adresleri platforma göre farklı biçimde oluşturulabilir. Bu nedenle ürün başlığındaki ölçüyü, ilk açılıştaki seçimi ve sepete eklenen ürünü aynı testte kontrol ederiz. Satın alınamayan bir seçeneğin bağlantısı varsa ilgili varyantı ürün kimliği ve stok alanı üzerinden ayrıca inceleriz.

## Fiyat veya stok farkı hangi sistemde oluşuyor?

Örneğin bir masa örtüsü mağazada stokta yok görünürken Merchant Center’da satışa açık kalmış olabilir. Ürünün kimliğini kullanarak mağaza kaydını, son gönderilen ürün verisini ve müşterinin açtığı varyant sayfasını karşılaştırırız. Mağaza doğru ama gönderilen veri eskiyse aktarım zamanını inceleriz. Gönderilen veri doğru ama bağlantı başka bir ölçüyü açıyorsa ürün adresini kontrol ederiz.

Düzeltmeyi mümkün olduğunda bilginin yönetildiği sistemde yaparız. Sonraki aktarımda örnek ürünün yeniden işlendiğini ve beklenen fiyat ya da stok durumunun göründüğünü doğrularız. Aynı durum birden fazla üründe varsa ortak aktarım kuralını inceleriz.

## Gönderim ve iade bilgileri neden mağazayla uyumlu olmalı?

Google Alışveriş reklam kurulumunda gönderim ücretini, tahmini teslimat süresini ve yayımlanan iade politikasını kontrol ederiz. Örneğin nevresim takımları hemen gönderilirken belirli keten örtü ölçüleri daha geç hazırlanabilir. Mağazanın gösterdiği teslimat süresinin ürün ve hedef bölge için geçerli ayarla eşleşmesi gerekir.

Örnek bir teslimat adresiyle sepette görünen gönderim ücretini Merchant Center ayarıyla karşılaştırırız. Hesap genelindeki hizmete ek olarak ürüne özel `shipping` bilgisi gönderiliyorsa hangi ayarın ilgili ürüne uygulandığını kontrol ederiz. İade sayfasında açıklanan süreyi ve varsa istisnaları Merchant Center’da tanımlanan politikayla karşılaştırırız.

Ürün veya veri kaynağı ayrıntısında bir sorun görülürse önce bunun hangi ürün ve ülkeyi etkilediğini belirleriz. Örneğin sorun yalnızca sezonluk örtülerde görünüyorsa genel gönderim ayarını değiştirmeden önce bu ürünlerin kurallarını inceleriz.

## Google Ads, GA4 ve GTM satın alma ölçümünde nasıl kullanılır?

Google Analytics 4 (GA4) mağazadaki e-ticaret olaylarını incelemeye yardımcı olur. Google Tag Manager (GTM), kurulumda kullanılıyorsa ilgili etiketlerin doğru olayda çalışmasını yönetir. Google Ads tarafında ise satın almanın hangi dönüşüm işlemi olarak raporlandığını ve kampanyanın hangi hedefi kullandığını kontrol ederiz.

Örneğin mağaza bir siparişi hem Google Ads etiketiyle hem GA4 üzerinden aktarıyorsa iki ayrı dönüşüm kaydı oluşabilir. Kampanyanın teklif ayarlarında aynı iş sonucunun iki kez kullanılmaması için seçili hedefleri ve dönüşüm işlemlerini karşılaştırırız. Sipariş değerini incelerken mağaza, GA4 ve Google Ads raporlarında aynı değer tanımının kullanılıp kullanılmadığına da bakarız.

## Test siparişinde hangi bilgileri doğruluyoruz?

Örnek bir siparişte mağaza panelindeki kayıtla ölçümdeki satın alma olayını karşılaştırırız. Örneğin iki farklı varyant içeren bir siparişte işlem kimliğinin, para biriminin, değerin ve ürün bilgilerinin beklenen şekilde aktarıldığını kontrol ederiz.

- **Başarılı ödeme.** Satın alma olayı, mağazanın siparişi başarıyla kaydettiği aşamada çalışıyor mu?
- **Yenileme ve geri dönüş.** Onay sayfası tekrar açıldığında aynı sipariş ikinci kez kaydediliyor mu? Benzersiz işlem kimliğini ve etiket davranışını birlikte kontrol ederiz.
- **Hatalı veya tamamlanmamış ödeme.** Satın alma tamamlanmadan başarı olayı oluşuyor mu?
- **Rapor karşılaştırması.** Raporlar farklı sonuç gösteriyorsa dönüşüm kaynağını, değer tanımını ve tarih aralığını ayrı inceleriz.
