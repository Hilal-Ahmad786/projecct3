## Web Scraping çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| Veri sözlüğü | Hangi alan tam olarak ne anlama geliyor? |
| Kullanım koşulları ve robots.txt kaydı | Bu kaynaktan toplamak uygun mu? |
| Toplayıcı betik ve zamanlayıcı | Veri ne zaman ve nasıl toplanıyor? |
| Çalıştırma günlüğü | Son çalıştırma başarılı mı, kaç kayıt geldi? |
| Teslim dosyası veya API | Veri size hangi biçimde ulaşıyor? |

Toplayıcıyı kaynağı aşırı yormayacak şekilde, makul aralıklarla çalıştırırız. Giriş gerektiren veya engelleme önlemlerini aşmayı gerektiren işleri kabul etmeyiz. Proxy gibi ek altyapı gerekiyorsa nedeni ve maliyeti teklifte ayrıca yazarız.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Toplanan kayıt | Her çalıştırmada gelen satır sayısı | Ani düşüş kaynağın değiştiğini gösterebilir |
| Boş alan oranı | Eksik gelen alanlar | Kaynakta gerçekten boş olan alanlarla karışabilir |
| Çalıştırma durumu | Zamanlanmış işin başarısı | Başarı, verinin doğru olduğu anlamına gelmez |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
