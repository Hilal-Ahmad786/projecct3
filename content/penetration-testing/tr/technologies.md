## Sızma Testi çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| Kapsam ve yetkilendirme belgesi | Neyi, nasıl ve kimin izniyle test ediyoruz? |
| Proxy ve tarayıcı araçları | İstekler ve yanıtlar nasıl akıyor, nerede zayıflık var? |
| Zafiyet tarama araçları | Bilinen açık sınıfları var mı, hangileri elle doğrulanmalı? |
| API istemcisi ve test hesapları | Yetki ayrımı ve uç nokta davranışı doğru mu? |
| Bulgu raporu ve kanıt kayıtları | Her bulgu nasıl yeniden üretilir, ne kadar ciddi? |

Otomatik tarama araçları yardımcıdır; bulguların önemli kısmını elle doğrular, yanlış pozitifleri ayıklarız. Tehlikeli denemeleri önceden onayınıza sunar, mümkünse canlı veriye zarar vermeyecek test hesaplarıyla çalışırız. Herhangi bir sertifikasyon veya resmî denetim iddiamız yoktur.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Bulgu sayısı | Rapordaki toplam bulgu | Az sayı güvenli olduğu anlamına gelmez; kapsam ve süre belirleyicidir |
| Önem dağılımı | Kritik, yüksek, orta ve düşük bulgu dengesi | Önem derecesi iş bağlamına göre değerlendirilmelidir |
| Kapanan bulgu | Yeniden testte düzeltilmiş olanlar | Yeniden test yalnızca ilgili bulguları kapsar |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
