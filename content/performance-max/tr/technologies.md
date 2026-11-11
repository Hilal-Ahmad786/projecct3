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

## Dönüşüm değeri kuralları ne zaman işe yarar?

Google Ads Performance Max kampanyasında aynı tutardaki iki sipariş işletmeniz için farklı değer taşıyabilir. Örneğin bir mobilya mağazasında uzak teslimat bölgesinin lojistik maliyeti daha yüksekse siparişin işletmeye katkısı azalabilir. Bu fark mevcut dönüşüm değerine zaten yansıyorsa ayarı tekrar uygulamadan önce değer hesabını kontrol ederiz.

Hesapta uygun koşul mevcutsa bölge gibi bir ölçüte göre dönüşüm değeri kuralı değerlendirilebilir. Önce mağaza veya muhasebe kayıtlarında farkın tutarlı olup olmadığına bakarız. Ardından değişikliğin hangi kampanyaları etkileyeceğini belirleriz. Yeni müşteri edinme önceliği varsa bunun için kullanılan kampanya ayarını ayrıca inceleriz.

Sipariş tutarı ile teklif optimizasyonunda kullanılan değer farklı tanımlanabilir. Örneğin katkı payı güvenilir biçimde hesaplanabiliyorsa bu değerin kullanılmasını değerlendirebiliriz. Raporu teslim ederken hangi değerin kullanıldığını açıklarız, böylece reklam raporundaki dönüşüm değerini muhasebe cirosuyla doğru karşılaştırabilirsiniz.

## Teklif taleplerinde form gönderimi ve satış kalitesi nasıl izlenir?

Bir makine üreticisi için formun başarıyla gönderilmesi ilk adımdır. Satış ekibi daha sonra talebin ürün kapsamına ve teslimat koşullarına uyup uymadığını CRM’de kaydedebilir. Kurulum uygunsa “nitelikli başvuru” veya “satış” gibi bir sonucu Google Ads’e aktarmayı değerlendiririz.

İlk testte form onayının doğru anda ölçülmesini ve talebin CRM’e ulaşmasını kontrol ederiz. Bir sonraki kontrolde satış ekibinin güncellediği durumun ilgili dönüşümle eşleşip eşleşmediğine bakarız. Kampanya hedefini, işletmenin düzenli olarak kaydedebildiği ve teklif kararlarında kullanmak istediği sonuca göre belirleriz.

## Müşteri listeleri ve CRM verisi nasıl bağlanır?

Bir Performance Max kampanyası için müşteri listesinin ve satış sonucunun farklı görevleri vardır. Örneğin bir makine üreticisinde mevcut müşterilerden oluşan uygun bir liste, müşteri eşleştirmede kullanılabilir. Satış ekibinin CRM’de “nitelikli teklif” olarak işaretlediği başvuru ise uygun kurulumla çevrimdışı dönüşüm olarak aktarılabilir.

Aktarım yolunu veri kaynağına ve Google Ads hesabında kullanılabilen bağlantılara göre seçeriz. Data Manager ile bir test kaydının doğru dönüşüm işlemi ve zamanı ile eşleştiğini doğrularız. Potansiyel müşteriler için gelişmiş dönüşümlerde desteklenen e-posta gibi tanımlayıcılar, eşleştirme için kullanılan sabit biçimli bir koda dönüştürülebilir. Bu işleme özetleme (hashing) denir.

Kullanılacak müşteri verisinin izin durumunu ve mevcut etiket ayarlarını birlikte inceleriz. İzin modu, etiketlerin iletilen izin tercihine göre nasıl çalışacağını etkiler. Örneğin CRM kaydı oluşsa bile reklam ölçümü için hangi verinin aktarılabileceği kullanılan ayarlara ve verinin uygunluğuna bağlıdır.

## Merchant Center bağlantısında hangi ürün verileri kontrol edilir?

Google Ads ile Merchant Center hesabının bağlantısını, ürünlerin uygunluk durumunu ve ürün verisinin mağazayla uyumunu inceleriz. Örneğin aynı ürünün iki farklı boyutu varsa her varyantın doğru fiyatı, stok durumu ve ilgili sayfası üzerinden kontrol yapılır.

Ürünlerin kampanya içinde nasıl seçildiği için **Performance Max Özellikler** sayfasını, katalog hazırlığı için [Google Alışveriş reklamları hizmetini](/tr/hizmetler/google-shopping) inceleyin.

## Ölçüm kurulumunu nasıl test ediyoruz?

1. Örnek bir sipariş veya form gönderimi yaparız. GTM kullanılan sitelerde Tag Assistant ile etiketin hangi olayda çalıştığını kontrol ederiz.
2. Başarılı işlem ile sayfa yenileme, başarısız ödeme veya form hatası gibi durumlarda beklenen olayları karşılaştırırız.
3. Test verisini, Google Ads dönüşüm tanılamasını ve kullanılan kaynak sistemdeki kaydı inceleriz. Raporlarda fark varsa dönem, dönüşüm tanımı ve veri işleme süresi üzerinden kontrol ederiz.

::cta Bu konuyu işletmenizin kampanya hedefiyle birlikte değerlendirelim | Ölçüm Sorunumu Paylaş
