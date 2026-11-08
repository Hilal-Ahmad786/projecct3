## Hangi işlemleri dönüşüm olarak izliyoruz?

Önce satış ekibinizin hangi adımları doğrulayabildiğine bakarız. Örneğin bir bakım şirketi için “Form gönder” düğmesine basılması ile başvurunun sisteme ulaşması farklı olaylardır. Bir form hatayla sonuçlanırsa veya gerekli alanlar boşsa bunu tamamlanmış başvuru olarak saymayız.

| İşlem | Ne ölçülür? | Örnek kontrol |
| --- | --- | --- |
| Form başvurusu | Sistemin kabul ettiği gönderim | Aynı formun yenilemeyle ikinci kez sayılmaması |
| Telefon tıklaması | Telefon bağlantısına dokunulması | Mobilde doğru bağlantının tetiklenmesi |
| Doğrulanmış görüşme | Uygun çağrı raporunda veya işletme sisteminde görülen görüşme | Tıklama ve görüşme sayısının ayrı okunması |
| Nitelikli talep | Satış ekibinin belirlediği koşulları karşılayan kayıt | Servis bölgesi ve hizmet türünün CRM’de doğrulanması |

Her kampanyada teklifleri hangi sonucun yönlendireceğini ayrıca belirleriz. Örneğin servis bölgesi dışındaki başvuruları ayrı işaretleyebiliyorsanız, form hacmi ile uygun talep sayısını yan yana değerlendirebiliriz.

## Google Ads, GA4 ve GTM nasıl birlikte çalışır?

GTM, hangi site olayında hangi etiketin çalışacağını yönetir. GA4, ziyaretçinin sayfalar ve olaylar arasındaki yolculuğunu incelemeye yardımcı olur. Google Ads tarafında ise kampanyanın hedeflerini ve teklif stratejisine dahil edilen dönüşüm işlemlerini kontrol ederiz.

Bir form hem Google Ads etiketiyle ölçülüyor hem de GA4 üzerinden Ads’e aktarılıyorsa iki kayıt oluşabilir. Aynı sonucu temsil eden işlemleri kontrol eder, kampanyanın seçili hedeflerinde hangisinin birincil kullanılacağını belirleriz. Örneğin formun iki ayrı kaynaktan teklif stratejisine girmesini önler, karşılaştırma için gerekiyorsa diğerini gözlem amaçlı tutarız.

GA4 ve Google Ads sayılarını karşılaştırırken tarih aralığı, atıf ayarları ve dönüşüm gecikmesini gözden geçiririz. Böylece iki ekranda görülen farkın bir etiket hatasından mı, yoksa raporlama koşullarından mı kaynaklandığını araştırabiliriz.

## Gelişmiş dönüşümler form kayıtlarını nasıl eşleştirir?

Gelişmiş dönüşümler, Google Ads dönüşüm takibini desteklemek için uygun birinci taraf verilerinden yararlanabilir. Örneğin ziyaretçi kompresör bakım formunda e-posta adresini paylaştığında, kullanılan kurulum ve izin koşulları uygunsa adres tek yönlü bir özetleme işleminden geçirilerek eşleştirmede kullanılabilir. Özetleme, adresi eşleştirme için kullanılan bir değere dönüştürür.

İzin modu (Consent Mode), ziyaretçinin tercihini Google etiketlerine iletir. Avrupa Ekonomik Alanı veya Birleşik Krallık’tan trafik alan sitelerde Google’ın ilgili kullanıcı izni gereksinimlerini ve kurulumun ölçüme etkisini ayrıca değerlendiririz. Örneğin izin reddedildiğinde etiket davranışını, izin verildiği oturumdan ayrı test ederiz.

Testte formun işletmeye ulaştığını ve etiketin yalnızca uygun koşullarda çalıştığını doğrularız. Ardından Google Ads teşhis ekranındaki kayıtları ve varsa aktarım hatalarını kontrol ederiz. Eşleştirme yapılamayan başvurular olabileceği için ölçüm sonuçlarını satış sistemindeki kayıtlarla da karşılaştırırız.

## Telefon araması ve nitelikli talep nasıl doğrulanır?

Telefon tıklaması, ziyaretçinin numaraya dokunduğunu gösterir. Görüşmeyi ölçmek için kullanılan yöntemin hesapta ve hedef bölgede desteklenip desteklenmediğini kontrol ederiz. Görüşme verisi alınamıyorsa tıklamaları bu adla raporlar, satış ekibinin doğrulayabildiği sonuçları ayrıca değerlendiririz.

Satış sonucu daha sonra belli oluyorsa uygun bir CRM bağlantısıyla nitelikli talebi Google Ads’e geri aktarabiliriz. Örneğin bakım talebi önce “Yeni başvuru”, teknik incelemeden sonra “Teklif verilebilir” olarak kaydedilebilir. İkinci durumu ayrı bir dönüşüm olarak kurmak, kampanyanın hangi başvuruları getirdiğini değerlendirmeye yardımcı olur.

Uygun hesaplarda potansiyel müşteriler için gelişmiş dönüşümleri ve Google Ads Data Manager bağlantısını inceleriz. Test kaydında aktarımın kabul edildiğini, aynı sonucun tekrar yüklenmediğini ve yeni dönüşümün kampanyadaki rolünü kontrol ederiz.

## Satış ekibinin teklif aşaması reklama nasıl aktarılır?

Çevrimdışı dönüşüm aktarımı, formdan sonra gerçekleşen bir iş sonucunu reklam verisiyle ilişkilendirmeye yardımcı olur. Örneğin B2B üreticinin formuna gelen bir başvuru, teknik ekip ölçü ve adet koşullarını doğruladıktan sonra “Teklif verilebilir” aşamasına geçebilir.

### 1. Form ile satış kaydını ilişkilendirin

CRM’de başvuruya ait kaydı ve zamanını saklarız. Kullanılan yönteme göre, mevcutsa Google tıklama kimliğini (GCLID) veya uygun birinci taraf eşleştirme verisini değerlendiririz.

### 2. Aktarılacak aşamayı belirleyin

Satış ekibiyle teklif aşamasının hangi koşullarda oluştuğunu kararlaştırırız. Örneğin yalnızca üretim kapasitesine uyan ve iletişimi doğrulanmış talepler bu aşamaya alınabilir.

### 3. Aktarımı ve teklif hedefini kontrol edin

Uygun bağlantı üzerinden test kaydı göndeririz. Kaydın işlendiğini ve tekrar sayılmadığını doğrularız. Aktarım düzenli çalıştığında ve yeterli veri oluştuğunda hangi dönüşümün kampanya tekliflerine yön vereceğini ayrıca değerlendiririz.

## İzin tercihleri ve etiketler nasıl test edilir?

İzin modu, ziyaretçinin tercihlerini Google etiketlerine iletir. İzin arayüzündeki seçimlerin siteye ve etiketlere doğru ulaştığını kontrol ederiz. Kullanıcının tercihine bağlı olarak hangi etiketlerin nasıl çalıştığını ayrı oturumlarda inceleriz.

### 1. Başarılı ve hatalı formu deneyin

Geçerli bir başvuruda etiketin ne zaman çalıştığını Tag Assistant ile kontrol ederiz. Hatalı formda başarı olayının oluşmadığını, başarılı formun sayfa yenilemeyle yeniden sayılmadığını doğrularız.

### 2. Mobilde telefon bağlantısını deneyin

Doğru numaranın açıldığını ve ölçüm olayının telefon tıklaması olarak kaydedildiğini kontrol ederiz. Görüşme verisi ayrı bir kaynaktan geliyorsa onu kendi raporunda doğrularız.

### 3. Rapor ve teklif hedefini karşılaştırın

Test sonuçlarını etiket ayarları ve Google Ads dönüşüm hedefleriyle karşılaştırırız. Açık kalan bir hata varsa hangi ekranı etkilediğini, sorumlu ekibi ve yeniden test adımını kaydederiz.
