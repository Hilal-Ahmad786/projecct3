## Performance Max ölçümünde hangi araçlar kullanılır?

| Araç | Görevi | Kontrol örneği |
| --- | --- | --- |
| Google Ads | Kampanya hedeflerini ve dönüşüm işlemlerini yönetir | Satın alma veya nitelikli başvuru ilgili kampanyanın hedefinde yer alıyor mu? |
| Google Analytics 4 (GA4) | Sitedeki ziyaret ve olayları analiz eder. Uygun etkinliklerden Google Ads dönüşümü oluşturulabilir | Satın alma olayı beklenen sipariş bilgisiyle geliyor mu? |
| Google etiketi ve Google Tag Manager (GTM) | Site etiketlerinin kurulmasına ve tetiklenme koşullarının yönetilmesine yardımcı olur | Etiket formun başarıyla gönderildiği anda çalışıyor mu? |
| Merchant Center | Alışveriş odaklı kampanyalarda ürün verisini ve ürünlerin gösterim uygunluğunu yönetir | Fiyat ve stok durumu mağazadaki bilgilerle uyumlu mu? |
| CRM ve Google Ads Data Manager | Uygun bağlantıyla satış ekibinin kaydettiği sonuçları Google Ads’e aktarmaya yardımcı olur | Nitelikli başvuru doğru dönüşüm işlemiyle eşleşiyor mu? |

Kullanılan araçlar iş hedefinize ve mevcut altyapınıza göre belirlenir. Örneğin bir hizmet işletmesinde form ve satış geri bildirimi öne çıkarken ürün kataloğu kullanan bir mağazada Merchant Center bağlantısı da incelenir.

## E-ticarette satın alma ve sipariş değeri nasıl doğrulanır?

Örnek bir sipariş oluşturup sipariş numarasını, ölçüme gönderilen değeri ve para birimini kontrol ederiz. Her sipariş için benzersiz işlem kimliği kullanılması, aynı dönüşüm işleminin tekrar sayılmasını önlemeye yardımcı olur. Onay sayfası yenilendiğinde aynı siparişin nasıl işlendiğini de test ederiz.

Satın alma hem doğrudan Google Ads etiketiyle hem GA4 üzerinden ayrı dönüşüm işlemleri olarak ölçülüyorsa kampanyanın teklif optimizasyonunda hangi işlemi kullanacağını belirleriz. Örneğin GA4’teki satın alma kaydı analiz için kullanılabilir, Google Ads’teki ayrı satın alma işlemi ise teklif hedefi olabilir. Mevcut kampanya hedeflerini inceleyerek aynı satışın teklif optimizasyonuna iki ayrı işlem olarak girme riskini kontrol ederiz.

## Teklif taleplerinde form gönderimi ve satış kalitesi nasıl izlenir?

Bir makine üreticisi için formun başarıyla gönderilmesi ilk adımdır. Satış ekibi daha sonra talebin ürün kapsamına ve teslimat koşullarına uyup uymadığını CRM’de kaydedebilir. Kurulum uygunsa “nitelikli başvuru” veya “satış” gibi bir sonucu Google Ads’e aktarmayı değerlendiririz.

İlk testte form onayının doğru anda ölçülmesini ve talebin CRM’e ulaşmasını kontrol ederiz. Bir sonraki kontrolde satış ekibinin güncellediği durumun ilgili dönüşümle eşleşip eşleşmediğine bakarız. Kampanya hedefini, işletmenin düzenli olarak kaydedebildiği ve teklif kararlarında kullanmak istediği sonuca göre belirleriz.

## Merchant Center bağlantısında hangi ürün verileri kontrol edilir?

Google Ads ile Merchant Center hesabının bağlantısını, ürünlerin uygunluk durumunu ve ürün verisinin mağazayla uyumunu inceleriz. Örneğin aynı ürünün iki farklı boyutu varsa her varyantın doğru fiyatı, stok durumu ve ilgili sayfası üzerinden kontrol yapılır.

Ürünlerin kampanya içinde nasıl seçildiği için **Performance Max Özellikler** sayfasını, katalog hazırlığı için [Google Alışveriş reklamları hizmetini](/tr/hizmetler/google-shopping) inceleyin.

## Ölçüm kurulumunu nasıl test ediyoruz?

1. Örnek bir sipariş veya form gönderimi yaparız. GTM kullanılan sitelerde Tag Assistant ile etiketin hangi olayda çalıştığını kontrol ederiz.
2. Başarılı işlem ile sayfa yenileme, başarısız ödeme veya form hatası gibi durumlarda beklenen olayları karşılaştırırız.
3. Test verisini, Google Ads dönüşüm tanılamasını ve kullanılan kaynak sistemdeki kaydı inceleriz. Raporlarda fark varsa dönem, dönüşüm tanımı ve veri işleme süresi üzerinden kontrol ederiz.

::cta Bu konuyu işletmenizin kampanya hedefiyle birlikte değerlendirelim | Ölçüm Sorunumu Paylaş
