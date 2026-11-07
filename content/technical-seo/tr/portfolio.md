## Temsili uygulama örnekleri

Bu senaryolar, olası teknik SEO sorunlarını ve uygulanabilecek doğrulama adımlarını gösterir.

### Site yenilemesinde eski adresleri doğru sayfalara bağlamak

**Belirti.** Kurumsal site yenilendikten sonra eski hizmet bağlantıları ana sayfaya gidiyor.

**İnceleme ve müdahale.** Eski adresler, yeni hizmet sayfalarının içeriğiyle eşleştirilir. Karşılığı olan adresler için yönlendirme planı hazırlanır. Eski adreslere giden menü ve içerik bağlantıları güncellenir.

**Doğrulama.** Örnek eski URL’lerin tek adımda beklenen yeni adrese ulaştığı, yeni sayfanın başarılı yanıt verdiği ve dahili bağlantıların güncel adresi kullandığı kontrol edilir.

### Aramada görünmeyen mağaza kategorisini incelemek

**Belirti.** Yeni kategori menüden açılıyor ancak arama sonuçlarında görünmüyor.

**İnceleme ve müdahale.** Kategoriye verilen bağlantı, HTTP yanıtı, indeksleme yönergeleri ve canonical hedefi kontrol edilir. Örneğin kategori şablonunda yanlışlıkla indekslemeyi engelleyen bir ayar kalmışsa, etkilenen sayfalar belirlenerek ilgili ayar düzeltilir.

**Doğrulama.** Canlı HTML ve HTTP başlıkları tekrar incelenir. Search Console erişimi varsa canlı test sonucu ve Google’ın bildirdiği indeks durumu ayrı kayıtlar olarak izlenir.

### Mobilde geç yüklenen ana görseli incelemek

**Belirti.** Ürün sayfasındaki ana görsel mobilde geç beliriyor.

**İnceleme ve müdahale.** Tarayıcı kayıtlarında görsel isteğinin ne zaman başladığı ve hangi dosyanın yüklendiği incelenir. Bulgulara göre görsel boyutu, yükleme önceliği veya şablonun kaynak yükleme sırası düzenlenebilir.

**Doğrulama.** Aynı örnek ürün adresleri, karşılaştırılabilir cihaz ve ağ koşullarında yeniden test edilir. Görsel isteğinin başlangıcı ve görünür hale gelme zamanı karşılaştırılır. Gerçek kullanıcı verisi varsa ayrı değerlendirilir.

## Temsili örnek — JavaScript ile yüklenen kategori içeriği

Temsili bir mağazada kategori açıldığında başlık görünüyor, ürün bağlantıları ise yalnızca ziyaretçi filtreyi değiştirdikten sonra ekleniyor. Geliştirici, ilk HTTP yanıtını ve sayfanın etkileşim olmadan oluşan görünümünü karşılaştırır. Hangi ürün bağlantılarının hangi aşamada bulunduğu kaydedilir.

Varsayılan kategoride gösterilmesi amaçlanan ürünlerin bağlantıları, uygun şablon değişikliğiyle başlangıçta kullanılabilir hale getirilebilir. Örneğin ilk ürün grubunu sunucu çıktısına eklerken filtre sonrasında değişen grupları ayrı test etmek gerekebilir. Uygulama kararı mevcut mağaza altyapısına göre alınır.

Yayından sonra bir kategori adresi etkileşimsiz açılır ve örnek ürün bağlantıları kontrol edilir. Filtreleme ve sonraki sayfaya geçme davranışı ayrıca test edilir. Raporda değişen bileşen ve kontrol edilen adresler yazılır. Arama motorunun sayfayı ne zaman yeniden işleyeceği bu teknik doğrulamadan ayrı izlenir. Geliştirici, aynı bileşenin kullanıldığı bir başka kategoriyi de örnek olarak test eder.

## Temsili örnek — Çok dilli sitede yanlış hreflang hedefi

Temsili bir üretici sitesinde Türkçe ürün sayfalarının dil alternatifi olarak Almanca ana sayfa belirtiliyor. Oysa ürünlerin bir kısmının Almanca karşılığı var. İlk incelemede örnek ürünlerin dil seçicisi, hreflang hedefi ve HTTP yanıtı birlikte kaydedilir.

Eşdeğer ürünü olan adresler karşılıklı işaretlenir. Almanca karşılığı bulunmayan bir ürün için otomatik olarak ana sayfayı eşdeğer kabul etmek yerine mevcut yayın yapısı değerlendirilir. Şablon dil eşlemelerini ortak bir kaynaktan oluşturuyorsa düzeltmenin hangi diğer sayfalara yansıyacağı kontrol edilir.

Yayında Türkçe ürünün Almanca ürüne, Almanca ürünün de Türkçe karşılığına işaret ettiği doğrulanır. Örnek sayfaların bildirdiği canonical hedefler ve bağlantıların açıldığı dil de kontrol edilir. Böylece hangi eşleşmenin düzeldiği ve hangi ürün için henüz karşılık bulunmadığı ayrı ayrı görülebilir. Düzeltme kaydına kontrol tarihi ve şablon adı da eklenir.

## Bir teknik SEO örneğinde hangi kanıtları aramalısınız?

| Kanıt | Yanıtladığı soru |
| --- | --- |
| Etkilenen şablon ve örnek URL | Sorun nerede yeniden görülebilir? |
| Başlangıç kaydı ve ölçüm koşulları | Değişiklik öncesinde hangi davranış gözlendi? |
| Uygulanan değişiklik | Geliştirici hangi ayarı veya bileşeni düzenledi? |
| Yayın sonrası yeniden test | Beklenen teknik davranış gerçekleşti mi? |

Örneğin bir yönlendirme işinde eski ve yeni adresin eşleştirilmesiyle birlikte gerçek HTTP yanıtını görmek, değişikliğin canlıya doğru çıktığını doğrulamaya yardımcı olur.

::cta Benzer bir sorun yaşadığınız adresi paylaşın; hangi kanıtlarla inceleyeceğimizi birlikte belirleyelim. | Sorunlu URL’yi Paylaş

## Sitenizdeki örneği birlikte inceleyelim

Site adresinizi ve sorunu gördüğünüz bir veya iki sayfayı paylaşın. Varsa değişikliğin ne zaman başladığını da ekleyin. İlk görüşmede hangi kontrollerin gerekli olduğunu ve hangi verilerin incelemeye dahil edilebileceğini belirleyelim.
