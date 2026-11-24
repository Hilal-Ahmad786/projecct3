Reklam yönetiminde kullanılan araçların görevi farklıdır. Katalog ürün bilgisini taşır, ölçüm kurulumu müşteri eylemlerini kaydeder, mağaza sistemi ise siparişin operasyonel durumunu gösterir. Bu verilerin birbirini nasıl tamamladığını netleştiriyoruz.


## Hangi araç ne için kullanılır?

| Araç / veri kaynağı | Çalışmadaki işlevi | Kontrol edilen konu |
| --- | --- | --- |
| Meta reklam yönetim araçları | Kampanya ve reklam sonuçlarını izlemek | Hedef, dönem, harcama ve rapor tanımı |
| Ürün kataloğu | Reklamda kullanılacak ürün bilgisini taşımak | Kimlik, fiyat, stok, görsel ve bağlantı |
| Meta Pixel | Tarayıcı tarafındaki uygun olayları iletmek | Doğru eylem ve tekrar tetikleme |
| Conversions API | Uygun olayların sunucu/entegrasyon üzerinden iletilmesi | Olay eşleştirme ve veri tutarlılığı |
| GA4 ve mevcut analitik | Site içi davranışı ayrı bir rapor kaynağıyla incelemek | Etiketler, yönlendirme ve tanımlar |
| Mağaza sipariş kayıtları | Sipariş, iptal ve iade durumunu görmek | Test kayıtları, gerçek sipariş ve dönem |

## Önce mevcut kurulumu çıkarın

Mağaza eklentisi, etiket yöneticisi ve tema içine eklenmiş kodlar birlikte çalışıyor olabilir. Hangi kaynağın hangi olayı gönderdiğini belirlemeden yeni kurulum eklemek veri tekrarına yol açabilir. Mevcut bağlantıları ve erişimleri inceleyerek gerekli değişiklikleri tanımlarız.

## Bir satın almayı iki kez saymamak

Aynı satın alma hem tarayıcıdan hem sunucudan gönderiliyorsa ilgili kayıtların aynı olaya ait olduğunun anlaşılması gerekir. Meta’nın önerdiği eşleştirme yönteminde olay adı ve olay kimliği karşılıklı olarak uyumlu olmalıdır. Bu kontrol, her yeni siparişe aynı sabit kimliği vermek anlamına gelmez. [Meta teknik açıklaması](https://developers.facebook.com/documentation/ads-commerce/conversions-api/deduplicate-pixel-and-server-events).

## Ürün kimliklerinin tutarlılığı

Katalogdaki ürün veya varyant kimliği ile ilgili olayda kullanılan ürün kimliği aynı ürün modelini izlemelidir. Ana ürün ile renk/beden varyantının karışması, veriyi yorumlamayı zorlaştırır. Ürün eşleştirmesini örnek kayıtlarla kontrol ederiz.

## Shopify, ikas ve WooCommerce bağlantıları

Her mağazada kurulu uygulamalar, abonelik olanakları ve mevcut geliştirmeler farklı olabilir. Kullanılabilir resmi bağlantıyı veya mevcut entegrasyonu inceleyerek ilerleriz. Hazır bağlantı yeterliyse gereksiz özel yazılım eklemeyiz; özel iş gerekiyorsa kapsamını ayrıca açıklarız.

## Ticaret Yöneticisi’nde katalog durumu nasıl okunur?

Katalog kontrolünde yalnızca yüklenen ürün sayısına bakmayız. Aktarımın tamamlanmasıyla bir ürünün reklamda kullanılabilmesi farklı kontrollerdir. Mum markanızda ürünler aktarılmış görünse bile bazı kayıtların görseli, bağlantısı veya fiyatı beklediğiniz bilgiyi taşımayabilir.

Önce doğru kataloğun ve veri kaynağının incelendiğini doğrularız. Ardından son aktarım durumunu, ürün bazındaki uyarıları ve mağazadaki karşılığını karşılaştırırız. Aynı hata birçok üründe varsa tek tek kayıt değiştirmeden önce besleme kaynağındaki ortak alanı araştırırız.

Bir ürün için düzeltme yapıldıktan sonra kaynak veriyi, sonraki aktarımı ve ilgili katalog kaydını yeniden kontrol ederiz. Teknik eksikle politika nedeniyle verilen kararları aynı sorun gibi ele almayız; mevcut hesapta gösterilen açıklamayı esas alırız. Facebook katalog oluşturma sonrasında da bu kontrolün sorumlusu belirlenmelidir. [Katalog rehberi](/tr/hizmetler/ecommerce-meta-ads/blog/meta-katalog-reklamlari-rehberi), ürün verisi hazırlığını ayrıntılandırır. Menü etiketleri değişebileceğinden hesabınızdaki güncel yönlendirmeleri takip ederiz.

## Satın alma değeri ve para birimi neden önemli?

Satın alma olayı kaydedilirken tutar yanlış aktarılıyorsa sipariş sayısı normal görünse bile gelir değerlendirmesi yanıltıcı olabilir. Bisiklet aksesuarı mağazanızda indirim, kargo veya farklı para birimi kullanımı bu kontrolü özellikle önemli kılar. Önce raporlanacak tutarın hangi bileşenleri içerdiğini tanımlarız.

- **Sipariş temeli.** İndirim, vergi ve gönderim kalemlerinin değerlendirmedeki yerini açıklarız.
- **Para birimi.** Siparişin para birimi ile gönderilen kodun tutarlılığını inceleriz.
- **Kayıt biçimi.** Ondalık ayırıcı ve sayı dönüşümünün tutarı değiştirip değiştirmediğini kontrol ederiz.

Meta piksel kurulumu kontrolünde yalnızca olayın görünmesi yeterli değildir. Örnek bir siparişin tutarını mağaza kaydı ve gönderilen olay üzerinden karşılaştırırız. İade veya iptal edilen siparişleri raporda nasıl ele aldığımızı ayrıca belirtiriz. Gelir verisinin eksik olduğu dönemi karşılaştırmalarda görünür kılar; eksik değeri tahmini gelirle doldurup gerçek sonuç gibi sunmayız.

## Platforma göre Shopify, ikas ve WooCommerce kontrol listesi

Altyapının adı, bağlantının doğru çalıştığını tek başına göstermez. Evcil hayvan mağazanızda uygulama, tema veya etiket yöneticisi üzerinden kurulmuş birden fazla bağlantı bulunabilir. Aşağıdaki liste, mevcut kurulumun envanterini çıkarmak içindir; her platformda aynı özelliklerin bulunduğu anlamına gelmez.

### Shopify

Kullanılan entegrasyonu, bağlı hesabı ve katalog kaynağını belirleriz. Örnek varyantın mağaza ile katalog kimliğini karşılaştırır, satın alma kaydının hangi bağlantıdan gönderildiğini kontrol ederiz. Mevcut uygulamanın plan ve izin koşullarını doğrularız.

### ikas

Aktif bağlantının ürün ve sipariş verisini nasıl ilettiğini mevcut ayarlardan inceleriz. Mama paketinin fiyatı veya stoğu değiştiğinde aktarımın sonucunu örnek kayıtla kontrol ederiz. Desteklenen işlemleri güncel entegrasyon belgelerinden doğrularız.

### WooCommerce

Eklentileri, tema içindeki kodları ve etiket yöneticisi kurulumunu birlikte inceleriz. Aynı satın almanın farklı kaynaklardan gönderilme ihtimalini araştırırız. Güncelleme veya eklenti değişikliğini canlı mağazada kontrolsüz biçimde denemeyiz.

## Tarayıcı ve sunucu verisi uyuşmazsa ilk beş kontrol

Tarayıcı ve sunucu kayıtlarının farklı görünmesi, doğrudan yeni bir bağlantı eklemeyi gerektirmez. Aynı örnek sipariş üzerinden mevcut veriyi izleriz. Amaç, hangi aşamada farklılık oluştuğunu bulmaktır; veri farklarının tamamının ortadan kalkacağını taahhüt etmeyiz.

### 1. Aynı işlemi seçin

Aynı siparişin ve aynı zaman aralığının incelendiğini doğrulayın. Farklı siparişleri yalnızca tutar benzerliğiyle eşleştirmeyin.

### 2. Olay adını karşılaştırın

Tarayıcı ve sunucunun aynı müşteri eylemini temsil ettiğinden emin olun. Sipariş oluşturma ile ödeme başarısını karıştırmayın.

### 3. Kimliği kontrol edin

Aynı olayın iki kopyasında eşleşen olay adı ve olay kimliği kullanılmalıdır. Ayrı siparişlerde tek sabit kimlik kullanılmamalıdır.

### 4. Kaynakları bulun

Eski eklenti veya tema kodunun ek kayıt üretip üretmediğini araştırın. Gönderim hatalarını ve yeniden denemeleri inceleyin.

### 5. Değeri ve izinleri inceleyin

Tutar, para birimi ve geçerli izin koşullarını birlikte kontrol edin. Çözümü [satın alma ölçümü rehberindeki](/tr/hizmetler/ecommerce-meta-ads/blog/meta-piksel-satin-alma-olcumu) test senaryolarıyla doğrulayın.

## Ölçüm kontrolünde bakılan örnekler

- Ürün sayfası ve varyant seçimi beklenen bilgiyi iletiyor mu?
- Sepet ve ödeme adımları gerçek kullanıcı akışıyla uyumlu mu?
- Başarısız ödeme satın alma gibi kaydediliyor mu?
- Sipariş onayı sayfasını yenilemek yeni satın alma kaydı üretiyor mu?
- Para birimi ve tutarın kapsamı açık mı?
- Test siparişleri gerçek işletme sonuçlarından ayrılıyor mu?

Veri paylaşımını mağazanın geçerli izin ve veri işleme düzeniyle birlikte ele alırız. Sunucu üzerinden gönderim, bu düzeni devre dışı bırakma yöntemi olarak kullanılmaz.

[Satın alma ölçümü kontrol rehberini okuyun →](/tr/hizmetler/ecommerce-meta-ads/blog/meta-piksel-satin-alma-olcumu)
