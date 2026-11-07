
Yeni yayınladığınız hizmet sayfası tarayıcıda açılıyor ama Google’da görünmüyor. İlk adım, Search Console’da **tam URL’yi** incelemek. Böylece sayfanın indeks dışında mı kaldığını, Google’ın benzer bir adresi mi seçtiğini ya da sayfanın indekslendiği halde aradığınız sorguda görünmediğini ayırt edebilirsiniz.

[[PAKSOFT_CTA:early]]

## 1. Search Console’da doğru adresi kontrol edin

İncelemek istediğiniz adresi kopyalayın. HTTPS, alan adı, dil dizini ve varsa parametreler dahil olmak üzere URL’yi olduğu gibi kullanın. İlgili mülkte **URL Denetimi** aracını açın. Google’ın kayıtlı sürümünde gösterilen indeksleme durumunu ve son tarama bilgisini not edin. Ardından **Canlı URL’yi Test Et** seçeneğiyle yayındaki sürümü inceleyin.

Canlı test, güncel sayfanın test sırasında erişilebilir ve indekslemeye uygun görünüp görünmediğini değerlendirir. Kayıtlı sürüm ise Google’ın önceki işlemlerine dayanır. Örneğin sabah kaldırdığınız bir `noindex` etiketi, Google sayfayı yeniden işlemeden önce kayıtlı sonuçta hâlâ görünebilir. [Google Search Console — URL Denetimi](https://support.google.com/webmasters/answer/9012289/)

## 2. Gördüğünüz duruma göre bir sonraki kontrolü seçin

| Gözlem | Önce neyi kontrol edin? |
| --- | --- |
| URL yönlendiriliyor | Son hedefi açın. Eski adresin planlanan sayfaya gittiğini doğrulayın ve hedef adresi ayrı inceleyin. |
| Sayfa `noindex` nedeniyle hariç tutulmuş | HTML’deki robots meta etiketini ve HTTP yanıtındaki `X-Robots-Tag` başlığını kontrol edin. Kuralın bu sayfa için amaçlanıp amaçlanmadığını doğrulayın. |
| Tarama robots.txt ile engellenmiş | İlgili yol ve kullanıcı aracısına uygulanan kuralı inceleyin. Tarama engeli varsa Google sayfanın içindeki `noindex` yönergesini okuyamayabilir. |
| Google farklı bir canonical seçmiş | İki URL’nin gerçekten eşdeğer olup olmadığını kontrol edin. Site haritası, dahili bağlantılar ve canonical işaretlerinin hangi adresi desteklediğine bakın. |
| Tarandı, şu anda dizine eklenmedi | Sayfanın güncel HTML’ini, benzer URL’leri, ana içeriği ve dahili bağlantıları kontrol edin. Bu durum tek başına belirli bir teknik arızayı göstermez. |

[Google Search Console — Sayfa dizine ekleme raporu](https://support.google.com/webmasters/answer/7440203?hl=tr)

## 3. Sorunun tek sayfada mı, şablonda mı olduğunu bulun

Etkilenen sayfayı aynı şablondan yayınlanmış ve indekslenen bir örnekle karşılaştırın. İkisinin yanıt kodu, robots yönergeleri, canonical adresi ve ana içeriği nerede ayrışıyor? Aynı sorun yeni açılan başka sayfalarda da varsa düzeltmenin şablon düzeyinde yapılması gerekebilir.

Örneğin hazırlık ortamından kalan bir `noindex` ayarı, yeni açılan bütün hizmet sayfalarına uygulanmış olabilir. Bu durumda hangi sayfaların aramada görünmesi gerektiğini belirleyin ve şablonu düzelttikten sonra birkaç canlı örnekte hem HTTP başlıklarını hem HTML’i yeniden kontrol edin.

[[PAKSOFT_CTA:middle]]

## 4. Düzeltmeyi ve indeks durumunu ayrı takip edin

Canlı sayfayı tekrar test edin. Sonucu URL, tarih, tespit ve değişiklik şeklinde kaydedin. Gerekirse yetkili bir Search Console kullanıcısı önemli URL’ler için yeniden tarama isteği gönderebilir. Güncel ve indekslenmesi amaçlanan ana adreslerin site haritasında yer aldığını da kontrol edin. Google’ın tarama ve indeksleme kararı zaman alabilir. [Google Search Central — Yeniden tarama isteği](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

## Bir örnek URL üzerinden başlayalım

Sorunlu adresi, yayın tarihini ve Search Console’da gördüğünüz durumu paylaşın. Aynı şablondan hangi örneklerin karşılaştırılması gerektiğini belirleyelim.

[[PAKSOFT_CTA:closing]]
