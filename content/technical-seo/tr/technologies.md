## Teknik SEO analizinde hangi soruya hangi araçla yanıt arıyoruz?

| Soru | Araç veya veri kaynağı | İncelediğimiz çıktı |
| --- | --- | --- |
| Google bu URL hakkında ne biliyor? | Google Search Console ve URL Denetimi | Google’ın bildirdiği indeks durumu ve varsa canlı test sonucu |
| Sitede hangi adreslere bağlantı veriliyor? | Site tarama aracı ve XML site haritası | Dahili bağlantılar, durum kodları, canonical hedefleri ve adres listeleri |
| Mobilde yüklenmeyi hangi öğe geciktiriyor? | PageSpeed Insights, Lighthouse ve Chrome DevTools | Performans ölçümleri, ağ istekleri ve tarayıcı zaman çizelgesi |
| JavaScript çalışınca içerik ve bağlantılar nasıl değişiyor? | Chrome DevTools ve oluşturulan HTML | İlk HTTP yanıtı ile tarayıcıda oluşturulan sayfa arasındaki farklar |
| Yönlendirme hangi adreste sona eriyor? | HTTP istekleri ve yanıt başlıkları | Durum kodları, ara adresler ve son hedef |
| Ürün işaretlemesi sayfadaki bilgilerle uyumlu mu? | Rich Results Test ve sayfa içeriği | Google’ın desteklediği işaretleme türlerinde tespit edilen alanlar ve hatalar |

## Ölçümleri nasıl yorumluyoruz?

### Search Console ve site taraması

Search Console erişimi varsa indeks durumunu ve seçili URL örneklerini inceleriz. URL Denetimi’nde Google’ın kayıtlı sürümüne ilişkin bilgileri canlı testten ayrı okuruz. Canlı test, güncel sayfanın erişilebilirliğine dair bilgi verir. İndeks durumunu değerlendirirken Google’ın kayıtlı sürümüne ilişkin rapora da bakarız.

Site taraması, tarayıcının ulaştığı adresler için o anda alınan yanıtları gösterir. Sonuçları site haritasındaki adreslerle ve varsa Search Console verisiyle karşılaştırırız. Örneğin site haritasında yer alan bir hizmet sayfasına dahili bağlantı bulunamıyorsa önce tarama kapsamını, sonra menü ve hizmet listesi şablonlarını kontrol ederiz.

### PageSpeed Insights, Lighthouse ve Chrome DevTools

PageSpeed Insights, yeterli örnek bulunduğunda Chrome Kullanıcı Deneyimi Raporu’ndan gerçek kullanıcı verisi sunar. Lighthouse testi ise belirli koşullarda yapılan bir laboratuvar ölçümüdür. Raporda verinin URL’ye mi yoksa site geneline mi ait olduğunu ve testin hangi koşullarda çalıştığını belirtiriz.

Bir şablonda ana görsel geç görünüyorsa Chrome DevTools ile görsel isteğinin ne zaman başladığına ve yüklenmeyi hangi kaynakların geciktirdiğine bakarız. Değişiklik sonrası aynı örnek URL’yi karşılaştırılabilir koşullarda tekrar ölçeriz.

### HTTP yanıtları ve oluşturulan HTML

Site taşımasında eski URL’nin yanıt kodunu, varsa ara yönlendirmeleri ve son hedefi kaydederiz. JavaScript ile oluşturulan sayfalarda da ilk HTML yanıtını tarayıcıda görülen içerikle karşılaştırırız. Özellikle başlık, ana içerik ve önemli bağlantıların hangi aşamada göründüğünü inceleriz.

### Yapılandırılmış veri testleri

Ürün ve diğer uygun sayfa şablonlarında Rich Results Test ile Google’ın desteklediği işaretlemeyi kontrol ederiz. Örneğin bir ürünün stok durumu işaretlemede ve sayfada farklıysa geliştiriciye iki değeri ve ilgili şablonu iletiriz. Test sonucu, işaretlemenin teknik uygunluğunu değerlendirmeye yardımcı olur. Arama sonucunun nasıl gösterileceğine Google karar verir.

## Örnek inceleme — Yeni kategori aramada görünmüyor

1. **Site taraması.** Kategori bağlantısının nereden geldiğini ve hedef adresin verdiği yanıtı kontrol ederiz.
2. **HTTP ve HTML.** Sayfada indekslemeyi etkileyen bir yönerge olup olmadığını ve bildirilen canonical adresi inceleriz.
3. **Search Console.** Erişim varsa Google’ın kayıtlı sürümüne ilişkin sonucu ve canlı testi ayrı ayrı değerlendiririz.
4. **Doğrulama kaydı.** Bulguyu örnek adres, ölçüm tarihi, tespit edilen davranış ve düzeltme sonrası tekrar edilecek kontrolle teslim ederiz.

::cta Sorun gördüğünüz bir adresi paylaşın; hangi verilerle inceleyeceğimizi birlikte belirleyelim. | İncelenecek Site Adresini Paylaş

## Denetim için hangi erişimler gerekir?

Herkese açık sayfalarda site taraması, HTTP kontrolleri ve tarayıcı testleriyle başlayabiliriz. Google’ın sitenizle ilgili raporlarını incelemek için ilgili Search Console mülküne yetkili erişim gerekir. Hazırlık ortamı veya sunucu kayıtları gerekiyorsa bunların kapsamını proje başında birlikte belirleriz.

## Siteniz için doğru ölçüm kapsamını belirleyelim

Site adresinizi ve örnek bir sorunu paylaşın. İncelenecek sayfaları, kullanılabilecek veri kaynaklarını ve düzeltme sonrası hangi kontrollerin tekrarlanacağını birlikte belirleyelim.
