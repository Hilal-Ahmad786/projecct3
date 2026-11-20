## Veritabanı Hizmeti çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| Sorgu planı (EXPLAIN) çıktıları | Veritabanı bu sorguyu nasıl çalıştırıyor, neden yavaş? |
| Yavaş sorgu kayıtları | Hangi sorgular en çok zaman alıyor? |
| Migrasyon dosyaları | Şemada ne zaman, neyi değiştirdik, nasıl geri alırız? |
| Yedek ve geri yükleme denemesi | Yedekten gerçekten dönülebiliyor mu? |
| İzleme panosu ve rol listesi | Disk, bağlantı ve yetkiler sağlıklı mı? |

Çalıştığımız veritabanı türünü (ilişkisel ya da belge tabanlı) mevcut yazılımınız ve ihtiyacınız belirler; PostgreSQL ve MySQL gibi yaygın seçenekleri birlikte değerlendirebiliriz. Çalışmadan önce canlı veriye doğrudan değişiklik yapmaz, önce kopya ortamda deneriz.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Sorgu süresi | Seçili sorguların çalışma süresi | Veri boyutu ve yüke göre değişir; aynı koşulda ölçülmelidir |
| Geri yükleme süresi | Yedekten dönüşün süresi | Deneme ortamı canlı ortamdan farklı olabilir |
| Disk ve bağlantı | Kullanım ve doluluk eğilimi | Kısa dönemli sıçramalar yanıltıcı olabilir |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
