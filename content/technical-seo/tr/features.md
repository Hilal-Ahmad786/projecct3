## Teknik SEO kontrol listesi: denetimdeki yedi alan

### Tarama, indeksleme ve XML site haritası

Önemli URL’lerin verdiği HTTP yanıtlarını, robots.txt kurallarını, sayfa ve HTTP başlıklarındaki indeksleme yönergelerini inceleriz. Site haritasındaki adresleri örnekleyerek yönlendirmeye düşen, hata veren veya indeksleme dışında bırakılan URL’leri ayırırız. Search Console erişimi varsa teknik bulguları ilgili raporlarla karşılaştırırız.

### Canonical ve yinelenen URL’ler

Aynı içeriğin kampanya parametresi, filtre veya farklı bir adres üzerinden açıldığı durumları inceleriz. Sayfanın bildirdiği canonical hedefini, site haritasını ve dahili bağlantıları karşılaştırırız. Ayrı içerik taşıyan filtre sayfaları için değerlendirmeyi sayfa grubuna göre yaparız.

### Site mimarisi ve dahili bağlantılar

Öncelikli sayfalara menüden, kategori sayfalarından veya ilgili içeriklerden ulaşılabildiğini kontrol ederiz. Kırık hedefleri, gereksiz yönlendirmeleri ve taramada bağlantısı bulunamayan URL’leri örnekleriyle raporlarız.

### JavaScript ve sayfanın oluşturulması

İlk HTML ile tarayıcıda oluşturulan sayfayı karşılaştırırız. Ana içerik, ürün listesi veya kategori bağlantıları ancak etkileşimden sonra görünüyorsa ilgili şablonu inceler, sorunu tekrar üretmek için gereken adımları kaydederiz.

### Site hızı, mobil performans ve Core Web Vitals

Başlıca şablonlarda yüklenme, etkileşim ve yerleşim kararlılığını inceleriz. Örneğin ağır bir hero görseli, etkileşimi geciktiren bir betik veya boyutu ayrılmamış bir içerik bloğu için test örneği sunarız. Gerçek kullanıcı verisi mevcutsa raporda laboratuvar ölçümlerinden ayrı gösteririz.

### Yönlendirmeler ve çok dilli sayfalar

Site taşımasında eski adreslerin ilgili yeni adreslere ulaştığını, yönlendirme zincirlerini ve dahili bağlantı hedeflerini kontrol ederiz. Çok dilli sitelerde dil alternatiflerinin karşılıklı eşleşmesini ve hedef URL’lerin canonical tercihleriyle uyumunu inceleriz.

### Yapılandırılmış veri

Uygun sayfa türlerinde mevcut işaretlemeyi, görünür içerikle tutarlılığını ve doğrulama hatalarını inceleriz. Örneğin ürün fiyatı veya stok durumu sayfa ile işaretlemede farklıysa, tutarsızlığın oluştuğu şablonu ve alanı belirtiriz.

## Tarama bütçesi ve sunucu kayıtları ne zaman incelenir?

Tarama bütçesi, özellikle çok sayıda URL üreten veya sık güncellenen sitelerde teknik SEO denetiminin bir parçası olabilir. Örneğin mağaza filtreleri aynı ürün grubuna binlerce farklı adres üzerinden erişim sağlıyorsa, önce hangi adres gruplarının gerçekten tarandığını ve hangi önemli sayfaların geç keşfedildiğini inceleriz.

Uygun erişim varsa sunucu kayıtlarında doğrulanmış Googlebot isteklerini tarih, URL grubu ve HTTP yanıtına göre değerlendiririz. Örneğin aynı filtre desenine sık istek geliyor ve önemli kategori adreslerinde sunucu hataları görülüyorsa bu iki bulguyu ayrı kaydederiz. URL üretimiyle sunucu sorunlarının nedenlerini ayrı araştırırız.

Küçük bir hizmet sitesinde ise önce bağlantı, site haritası ve indeksleme durumuna bakmak daha uygun olabilir. Teknik SEO kontrol listesi bu nedenle site boyutu ve eldeki belirtiye göre uygulanır. Raporda hangi örneklerin incelendiğini ve sonuçların hangi tarih aralığını kapsadığını belirtiriz.

## Mobil içerik ve dil eşlemesi nasıl kontrol edilir?

Mobil SEO incelemesinde önemli içeriğin ve bağlantıların mobil sürümde erişilebilir olduğunu kontrol ederiz. Örneğin masaüstünde hizmet bağlantıları bulunurken mobilde aynı bağlantılar bir menü açılana kadar HTML’de oluşmuyorsa, tarayıcının ve oluşturulan sayfanın çıktısını karşılaştırırız.

- **Mobil içerik.** Önemli başlık, açıklama ve bağlantıları bir hizmet veya ürün sayfası üzerinden kontrol ederiz.
- **Hreflang eşlemesi.** Birbirinin karşılığı olan Türkçe ve Almanca URL’lerin uygun dil koduyla karşılıklı işaretlendiğini doğrularız.
- **Hedef ve yanıt.** Dil bağlantılarının beklenen sayfaya gittiğine, hedefin hata vermediğine ve indeksleme kurallarının amaca uygun olduğuna bakarız.

Örneğin Türkçe ürün sayfası Almanca ana sayfayı dil alternatifi olarak gösteriyorsa önce doğru ürün karşılığını ararız. Eşdeğer sayfa mevcutsa iki yöndeki işaretlemeyi yeniden test ederiz. Sorun bir şablondan kaynaklanıyorsa aynı yapıyı kullanan başka sayfalardan örnek alırız.

## Aynı belirti için üç farklı kontrol

| Gözlem | Kontrol | Olası düzeltme |
| --- | --- | --- |
| Yeni kategori aramada görünmüyor | Kategoriye verilen dahili bağlantıları, HTTP durumunu ve indeksleme kurallarını incele | Erişimi kesen yanlış ayarı düzelt ve ilgili menüden ya da kategori ağacından bağlantı ver |
| Kampanya parametreli URL’ler çoğalıyor | Canonical hedefi, site haritası ve dahili bağlantıların hangi adresi kullandığını karşılaştır | Gerçekten eşdeğer URL’lerde ana adresi tutarlı biçimde işaretle |
| Yeni siteye geçişte eski hizmet adresi ana sayfaya gidiyor | Eski URL’nin hangi yeni sayfaya karşılık geldiğini ve yönlendirme zincirini doğrula | Karşılığı olan eski adresi doğrudan ilgili yeni hizmet sayfasına yönlendir |

::cta Görünmeyen veya yavaş açılan bir sayfanın adresini paylaşın; ilk kontrolleri birlikte belirleyelim. | Sorunlu URL’yi Paylaş

## Örnek teknik SEO denetimi çıktısı

Aşağıdaki kayıt, geliştiriciye iletilecek bir bulgunun nasıl yazıldığını gösterir.

| Alan | Temsili bulgu |
| --- | --- |
| Etkilenen sayfalar | Bir hizmet şablonundan oluşturulan Türkçe sayfalar |
| Mevcut davranış | Yayına açık örnek sayfanın HTML yanıtında hazırlık ortamından kalan `noindex` etiketi bulunuyor |
| Beklenen davranış | Aramada yer alması amaçlanan canlı sayfa indekslemeye açık olmalı |
| Önerilen işlem | Canlı şablondaki yanlış kuralı kaldır ve HTTP yanıt başlıklarını kontrol et |
| Doğrulama | Örnek canlı URL’lerde HTTP yanıtını ve oluşturulan HTML’i yeniden kontrol et. Erişim varsa Search Console URL Denetimi’nde canlı testi çalıştır. |

## Kendi siteniz için kapsamı belirleyelim

İncelenecek site adresini, etkilenen sayfaları ve son değişiklikleri paylaşın. Örneğin sorun yalnızca mobilde görülüyorsa bir örnek adres ve cihaz bilgisi ekleyin. İlk görüşmede hangi şablonların ve URL gruplarının denetime gireceğini netleştirelim.
