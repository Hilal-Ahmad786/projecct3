## Makine Öğrenmesi çalışmasında hangi araç hangi soruya cevap verir?

| Araç veya kayıt | Cevapladığı soru |
| --- | --- |
| Deney kayıtları | Hangi veri, parametre ve sürümle hangi sonuç alındı? |
| Doğrulama ve test seti | Model hiç görmediği veride nasıl davranıyor? |
| Temel yöntem (baseline) | Model basit bir kuraldan gerçekten daha iyi mi? |
| Model sürümleme | Canlıdaki model hangi veriyle eğitilmişti? |
| Drift ve kalite izleme | Canlı veri eğitim verisinden uzaklaşıyor mu? |

Eğitim kodu, veri sürümleri ve model dosyaları sizin hesabınızdaki depoda tutulur; böylece modelin yeniden eğitimi bir kişiye bağımlı kalmaz. Kişisel veri içeren setlerde maskeleme, erişim yetkisi ve saklama süresi baştan belirlenir.

## Hangi ölçüler birlikte izlenir?

| Ölçü | Ne anlama gelir? | Dikkat edilecek nokta |
| --- | --- | --- |
| Hata türleri | Model hangi örneklerde yanılıyor | Tek bir ortalama skor bu ayrımı gizler |
| Temel yönteme fark | Modelin basit kurala göre kazancı | Fark küçükse karmaşıklık değmeyebilir |
| Girdi kayması | Canlı verinin eğitim verisinden sapması | Her kayma kalite kaybı anlamına gelmez |

Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.

## Raporlar neden farklı sonuçlar gösterebilir?

Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.

## Altyapınız için doğru bağlantıyı seçelim

Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.
