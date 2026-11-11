## Mağaza kataloğu Merchant Center’a nasıl aktarılır?

Ürün aktarım yöntemini mağaza altyapınıza, güncelleme sıklığına ve ürün sayısına göre seçeriz. Örneğin gün içinde stoku değişen bir katalog için fiyat ve stok güncellemelerinin ne zaman Google’a ulaştığını bilmek önemlidir. Mevcut bir bağlantı varsa önce örnek bir ürünün mağazadan Merchant Center’a hangi yolla gittiğini izleriz.

| Aktarım yöntemi | Ne zaman değerlendirilir? | İlk kontrol |
| --- | --- | --- |
| Mağaza platformu bağlantısı | Platform uygun bir bağlantı sunuyorsa | Hangi alanların ve varyantların eşitlendiği |
| Zamanlanmış dosya aktarımı | Katalog düzenli olarak dosyaya aktarılabiliyorsa | Dosya erişimi, güncelleme sıklığı ve işleme sonucu |
| API bağlantısı | Özel katalog akışı veya farklı bir kaynak sistemi varsa | Ürün kimlikleri, güncelleme kayıtları ve hata takibi |

Örneğin bir nevresimin mavi ve beyaz renkleri farklı ürün kimlikleriyle aktarılıyorsa mağazada stok değiştiğinde hangi kaydın güncellendiğini kontrol ederiz. Satışa uygun ürünlerin nasıl seçildiğini [Google Alışveriş Özellikler](/tr/hizmetler/google-shopping/ozellikler) sayfasında inceleyebilirsiniz.

## Fiyat veya stok farkı hangi sistemde oluşuyor?

Örneğin bir masa örtüsü mağazada stokta yok görünürken Merchant Center’da satışa açık kalmış olabilir. Ürünün kimliğini kullanarak mağaza kaydını, son gönderilen ürün verisini ve müşterinin açtığı varyant sayfasını karşılaştırırız. Mağaza doğru ama gönderilen veri eskiyse aktarım zamanını inceleriz. Gönderilen veri doğru ama bağlantı başka bir ölçüyü açıyorsa ürün adresini kontrol ederiz.

Düzeltmeyi mümkün olduğunda bilginin yönetildiği sistemde yaparız. Sonraki aktarımda örnek ürünün yeniden işlendiğini ve beklenen fiyat ya da stok durumunun göründüğünü doğrularız. Aynı durum birden fazla üründe varsa ortak aktarım kuralını inceleriz.

## Google Ads, GA4 ve GTM satın alma ölçümünde nasıl kullanılır?

Google Analytics 4 (GA4) mağazadaki e-ticaret olaylarını incelemeye yardımcı olur. Google Tag Manager (GTM), kurulumda kullanılıyorsa ilgili etiketlerin doğru olayda çalışmasını yönetir. Google Ads tarafında ise satın almanın hangi dönüşüm işlemi olarak raporlandığını ve kampanyanın hangi hedefi kullandığını kontrol ederiz.

Örneğin mağaza bir siparişi hem Google Ads etiketiyle hem GA4 üzerinden aktarıyorsa iki ayrı dönüşüm kaydı oluşabilir. Kampanyanın teklif ayarlarında aynı iş sonucunun iki kez kullanılmaması için seçili hedefleri ve dönüşüm işlemlerini karşılaştırırız. Sipariş değerini incelerken mağaza, GA4 ve Google Ads raporlarında aynı değer tanımının kullanılıp kullanılmadığına da bakarız.

## Test siparişinde hangi bilgileri doğruluyoruz?

Örnek bir siparişte mağaza panelindeki kayıtla ölçümdeki satın alma olayını karşılaştırırız. Örneğin iki farklı varyant içeren bir siparişte işlem kimliğinin, para biriminin, değerin ve ürün bilgilerinin beklenen şekilde aktarıldığını kontrol ederiz.

- **Başarılı ödeme.** Satın alma olayı, mağazanın siparişi başarıyla kaydettiği aşamada çalışıyor mu?
- **Yenileme ve geri dönüş.** Onay sayfası tekrar açıldığında aynı sipariş ikinci kez kaydediliyor mu? Benzersiz işlem kimliğini ve etiket davranışını birlikte kontrol ederiz.
- **Hatalı veya tamamlanmamış ödeme.** Satın alma tamamlanmadan başarı olayı oluşuyor mu?
- **Rapor karşılaştırması.** Raporlar farklı sonuç gösteriyorsa dönüşüm kaynağını, değer tanımını ve tarih aralığını ayrı inceleriz.
