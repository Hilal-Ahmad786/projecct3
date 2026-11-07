## Teknik SEO analizinde hangi soruya hangi araçla yanıt arıyoruz?

| Soru | Araç veya veri kaynağı | İncelediğimiz çıktı |
| --- | --- | --- |
| Google bu URL hakkında ne biliyor? | Google Search Console ve URL Denetimi | Google’ın bildirdiği indeks durumu ve varsa canlı test sonucu |
| Sitede hangi adreslere bağlantı veriliyor? | Site tarama aracı ve XML site haritası | Dahili bağlantılar, durum kodları, canonical hedefleri ve adres listeleri |
| Mobilde yüklenmeyi hangi öğe geciktiriyor? | PageSpeed Insights, Lighthouse ve Chrome DevTools | Performans ölçümleri, ağ istekleri ve tarayıcı zaman çizelgesi |
| JavaScript çalışınca içerik ve bağlantılar nasıl değişiyor? | Chrome DevTools ve oluşturulan HTML | İlk HTTP yanıtı ile tarayıcıda oluşturulan sayfa arasındaki farklar |
| Yönlendirme hangi adreste sona eriyor? | HTTP istekleri ve yanıt başlıkları | Durum kodları, ara adresler ve son hedef |
| Ürün işaretlemesi sayfadaki bilgilerle uyumlu mu? | Rich Results Test ve sayfa içeriği | Google’ın desteklediği işaretleme türlerinde tespit edilen alanlar ve hatalar |

## Screaming Frog ile bir site taramasında neye bakılır?

Screaming Frog nedir sorusunun pratik yanıtı, bir sitenin bağlantılarını takip edip bulduğu URL’lere ait teknik bilgileri listeleyen bir tarama aracıdır. Teknik SEO analizinde örneğin hangi menü bağlantısının kırık bir hizmet adresine gittiğini araştırmak için kullanılabilir.

Taramanın başlangıç adresini, kapsamını ve ayarlarını kaydederiz. Örneğin yalnızca Türkçe hizmet sayfalarını inceliyorsak farklı dil dizinlerini raporda ayrı tutarız. Sonuçta bir adres 404 görünüyorsa önce o adrese hangi sayfanın bağlantı verdiğine, ardından canlı yanıtın aynı olup olmadığına bakarız.

Tarama aracının gördüğü URL’lerle Google’ın kayıtlı indeks durumunu ayrı değerlendiririz. Tarama çıktısını site haritası ve gerekirse Search Console örnekleriyle karşılaştırırız. Böylece bir rapor satırı geliştirici için somut işe dönüşür. Örneğin menüdeki eski bağlantıyı güncelleyip örnek şablonları yeniden taramak üzere kayda alırız.

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

## Google Search Console mülkü nasıl doğrulanır?

Google Search Console kaydı nasıl yapılır sorusunda ilk karar, hangi alanın raporlanacağıdır. Örneğin bütün alt alanları kapsamak ile yalnızca bir HTTPS adres önekini incelemek farklı mülk seçimleri gerektirir.

### 1. Mülk türünü seçin

Alan adı mülkü bütün alt alanları ve protokolleri kapsar. URL ön eki mülkünde ise kapsam girilen önekle sınırlıdır. İncelemek istediğiniz adresin mülke dahil olduğunu kontrol edin.

### 2. Sahipliği doğrulayın

Alan adı mülkünde DNS doğrulamasını kullanın. URL ön eki mülkü için arayüzde sunulan uygun yöntemi seçin. Örneğin HTML dosyası seçildiğinde dosyanın doğru canlı adreste açıldığını doğrulayın.

### 3. İnceleme erişimini tanımlayın

Doğrulama tamamlandıktan sonra ekip üyesine ihtiyacı olan yetkiyi verin. Örnek URL’yi ilgili mülkte açarak kapsamı kontrol edin. Hesap şifresi paylaşmak yerine kişi bazında yetki tanımlayın.

## Siteniz için doğru ölçüm kapsamını belirleyelim

Site adresinizi ve örnek bir sorunu paylaşın. İncelenecek sayfaları, kullanılabilecek veri kaynaklarını ve düzeltme sonrası hangi kontrollerin tekrarlanacağını birlikte belirleyelim.
