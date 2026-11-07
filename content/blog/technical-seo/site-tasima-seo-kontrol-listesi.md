
Siteyi yeni bir alan adına, altyapıya veya URL yapısına taşırken ilk iş, değişecek adresleri belirlemek. Eski hizmet, ürün ve kategori sayfalarının nereye gideceğini yayından önce planlayın. Yayına çıktığınızda aynı listeyle yönlendirmeleri, yeni hedeflerin yanıtlarını ve dahili bağlantıları doğrulayabilirsiniz.

[[PAKSOFT_CTA:early]]

## Yayından önce — Eski ve yeni URL’leri eşleştirin

Mevcut siteyi tarayın. Eski site haritasını, varsa Search Console verisini ve organik ziyaret alan açılış sayfalarını listeye ekleyin. Her önemli adres için yeni karşılığını belirleyin. Türkçe, İngilizce veya Almanca sürümler varsa her adresi aynı dildeki en yakın karşılığıyla eşleştirin.

| Eski yol | Yeni yol | Beklenen davranış |
| --- | --- | --- |
| `/tr/hizmetler/eski-web-tasarim` | `/tr/hizmetler/kurumsal-web-tasarim` | Yeni adrese tek adımda kalıcı yönlendirme |
| `/tr/urunler/model-a` | `/tr/urun/model-a` | Aynı ürünün yeni adresine kalıcı yönlendirme |
| `/tr/kampanya/sona-eren-teklif` | Uygun karşılık yok | İçerik kaldırıldıysa uygun 404 veya 410 yanıtı |

Temsili tabloyu kendi sitenize uyarlarken karşılık bulunmayan adresleri topluca ana sayfaya göndermekten kaçının. URL değişiyorsa uygun hedefe doğrudan sunucu taraflı kalıcı yönlendirme kullanın. Adresler aynı kalıyorsa yönlendirme tablosu yerine mevcut adreslerin yeni altyapıda aynı içeriğe ve beklenen HTTP yanıtına sahip olduğunu test edin. [Google Search Central — URL değişiklikleriyle site taşıma](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)

## Yayın günü — Yönlendirmeleri ve yeni hedefleri birlikte test edin

- Öncelikli eski adresleri açın. Yanıt kodunu, ara adımları ve son adresi kaydedin.
- Yeni hedeflerin başarılı yanıt verdiğini ve beklenen sayfa içeriğini gösterdiğini doğrulayın.
- Ana sayfa, hizmet, kategori ve ürün şablonlarında hazırlık ortamına ait tarama veya indeksleme ayarlarının canlıya taşınıp taşınmadığını kontrol edin.
- Dahili bağlantıları yeni adreslere güncelleyin. Canonical ve varsa hreflang hedeflerinin canlı adreslere gittiğini doğrulayın.
- Yeni ana adresleri içeren XML site haritasını kontrol edin. Uygun Search Console mülklerinde yeni site haritasını gönderin. Alan adı değiştiyse Adres Değişikliği aracının taşıma türünüz için uygunluğunu kontrol edin.

[[PAKSOFT_CTA:middle]]

## Yayından sonra — Teknik kontrolleri ve arama verilerini ayrı izleyin

İlk olarak kırık bağlantıları, beklenmedik yanıtları ve yönlendirme zincirlerini kontrol edin. Ardından eski ve yeni adreslerin tarama ve indeksleme durumunu Search Console’da takip edin. Organik görünürlüğü değerlendirirken benzer dönemleri ve aynı sayfa gruplarını karşılaştırın. Örneğin yalnızca taşınan hizmet sayfalarının gösterimlerini izlemek, site genelindeki bir kampanya değişikliğinin etkisini ayırmaya yardımcı olabilir.

Yayında bulduğunuz bir sorun için eski adresi, beklenen yeni hedefi, gerçekleşen yanıtı ve sorumlu ekibi kaydedin. Düzeltme sonrası aynı adresleri tekrar test edin. Google’ın yeni adresleri işlemesi zaman alabilir. [Google Search Central — URL değişiklikleriyle site taşıma](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)

## Taşıma öncesi ekibinizle paylaşacağınız üç çıktı

1. Öncelikli eski ve yeni URL’lerin eşleştirme tablosu.
2. Yayın öncesi ve sonrası test edilecek örnek sayfalar.
3. Sorun halinde kimin müdahale edeceğini gösteren yayın planı.

[[PAKSOFT_CTA:closing]]
