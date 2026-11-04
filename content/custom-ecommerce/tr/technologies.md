## 2. Hangi altyapı yaklaşımı işinize uygun?



Teknik yaklaşımı seçerken çözülmesi gereken iş kuralını, mevcut sistemleri ve yayından sonra bakımı kimin üstleneceğini birlikte değerlendiririz.

| Yaklaşım | Ne zaman değerlendirilir? | Karar öncesi kontrol |
| --- | --- | --- |
| Mevcut platforma özel modül | Mağazanın çoğu işlevi yeterli ve belirli bir adım geliştirme gerektiriyorsa | Platformun genişletme sınırları ve güncellemelerin modüle etkisi |
| Ayrı mağaza arayüzü | Katalog ve sipariş altyapısı korunurken alışveriş deneyimi yeniden tasarlanacaksa | Arayüzün erişebildiği katalog, fiyat, sepet ve ödeme işlevleri |
| Özel e-ticaret yazılımı | Fiyat, ürün veya sipariş kuralları birden fazla katmanda özelleştirme gerektiriyorsa | Geliştirme, barındırma, izleme ve bakım sorumluluğu |

Ayrı mağaza arayüzü olarak da adlandırılan headless yaklaşım, arayüzü satış altyapısından ayırır. Bu karar verilirken iki tarafın nasıl bağlanacağı ve bağlantı sorunlarının satışa etkisi de değerlendirilir.

## 3. Müşteri arayüzü ve yönetim ekranları

Ürün sayfası müşterinin karar vermesi için gerekli bilgileri sunar. Yönetim ekranı ise ekibin bu bilgileri girmesine ve siparişleri izlemesine yardım eder. Bu iki alanı aynı örnek ürün üzerinden tasarlamak, mağazada gösterilen değerlerle operasyon kayıtları arasındaki farkları erken fark etmeyi sağlar.

Örneğin ölçüye göre satılan bir üründe müşteri geçerli ölçüleri seçer. Yönetim panelinde üretim ekibi siparişe ait ölçüyü, malzemeyi ve onay durumunu görür. Projede hangi alanların kim tarafından güncellenebileceğini de tanımlarız.



## 4. Fiyat ve sipariş kuralları nerede çalışır?

Bir fiyat hesabı ürün sayfası, sepet ve sipariş özeti boyunca tutarlı olmalıdır. Kullanıcıya gösterilen fiyatı oluştururken uygulanacak kuralları ve sipariş kabul edilirken yapılacak sunucu kontrollerini birlikte tasarlarız.

- Bayi fiyatında müşterinin rolünü ve geçerli fiyat listesini doğrulayın.
- Ölçüye göre fiyat hesaplanıyorsa geçerli seçenekleri ve yuvarlama kuralını belirleyin.
- Sipariş kaydında satın alma anındaki ürün seçimini ve fiyatı saklayın.
- Fiyat değişmişse müşterinin siparişi onaylamadan önce güncel tutarı nasıl göreceğini belirleyin.

## 5. Verinin ana kaynağını belirleyin

Stok ve fiyat birden fazla sistemde bulunuyorsa, hangi kaydın esas alınacağı teknik tasarımın parçasıdır. Örneğin stok işletme yazılımından geliyorsa mağazada güncellenme sıklığı ve bilgi geciktiğinde satışın nasıl ele alınacağı ayrıca tanımlanır.

| Veri | Belirlenecek karar | Test örneği |
| --- | --- | --- |
| Ürün | Sistemler arasında hangi kodla eşleştirilecek? | Eksik ürün kodu işaretleniyor. |
| Stok | Ana kayıt nerede ve ne zaman güncelleniyor? | Son ürün için eşzamanlı siparişler beklenen kurala göre işleniyor. |
| Fiyat | Hangi fiyat listesi hangi müşteri için geçerli? | Yetkili kullanıcı doğru fiyatı görüyor. |
| Sipariş | Hangi sistem hangi durumu güncelliyor? | Tekrarlanan bildirim ikinci sipariş oluşturmuyor. |

## 6. Ödeme, kargo ve işletme yazılımı bağlantıları

Sistemler arasındaki bağlantıda gönderilecek bilgileri, erişim izinlerini ve bir işlemin başarıyla tamamlandığını nasıl anlayacağımızı tanımlarız. Örneğin ödeme adımı tamamlandığında mağazadaki sipariş durumu sağlayıcıdan doğrulanan sonuca göre ilerler. Kargo takip bilgisi gecikirse ekip hangi kaydın eksik olduğunu görebilmelidir.

### Dış servis yanıt vermezse ne olur?

Geçici hatada yeniden deneme, kalıcı hatada inceleme ve tekrarlanan bildirimde mevcut kaydın bulunması gibi davranışlar proje kapsamına göre planlanır. Bağlantının yönü, çalışma sıklığı ve desteklediği alanlar sağlayıcının erişim koşulları üzerinden doğrulanır.





::cta Kullandığınız stok, muhasebe veya kargo sistemini ve örnek bir sipariş akışını paylaşın. Hangi bilgilerin hangi yönde aktarılacağını birlikte belirleyelim. | Entegrasyon İhtiyacımı Paylaş

## 7. Erişim, izleme ve bakım

Yönetim panelinde hangi ekiplerin ürün, fiyat ve sipariş bilgilerine erişeceğini belirleriz. Sipariş veya fiyat değişikliği gibi kritik işlemlerde hangi değişikliklerin kayda alınacağı ve kimin inceleyebileceği proje kapsamına eklenebilir.

Yayın öncesinde sorunların hangi kanaldan izleneceği, yedeklerin ve geri yükleme adımlarının kim tarafından yönetileceği ve güncellemelerin nasıl uygulanacağı netleşir. Özel servis, barındırma ve bakım sorumlulukları ayrı belirtilir.

## 8. Performans ve arama görünürlüğü için teknik hazırlık

Mağazanın açılışını etkileyen görselleri, veri yükünü ve üçüncü taraf bileşenleri örnek sayfalar üzerinden inceleriz. Ürün ve kategori adresleri, önemli bağlantılar ve mevcut siteden geçişte gereken yönlendirmeler teknik kapsam içinde planlanabilir.

Kontrol listesine gerçek cihazları, temsil edici ürün sayfalarını ve yoğun kullanılan işlemleri ekleriz. Hız hedefi varsa test koşulları ve ölçüm yöntemi birlikte tanımlanır.

## 9. Teknik teslimatta neyi kontrol edersiniz?

1. Temsil edici bir ürün için fiyat hesabı ve sipariş kaydı kontrol edilir.
2. Başarısız ödeme ve tekrar gelen bildirim gibi örnekler doğrulanır.
3. Yönetim panelinde ekiplerin erişim ve işlem yetkileri gözden geçirilir.
4. Kullanılan sistemler, erişim sahipleri ve bakım kapsamı teslim notlarına yazılır.



## 10. Sık sorulan sorular

### Her özel e-ticaret projesinde aynı teknoloji kullanılır mı?

Mevcut mağaza, veri kaynakları, ekibin yönetim ihtiyaçları ve planlanan değişiklikler teknoloji seçimini etkiler. İnceleme sonrası hangi bileşenlerin kullanılacağı ve bakım sorumluluğu proje kapsamında açıklanır.

### Mevcut ERP veya stok sistemimi kullanabilir miyim?

Sistemin bağlantı olanakları ve erişim koşulları incelenir. Desteklenen işlemler belirlendikten sonra hangi verinin nerede yönetileceği ve sorunların nasıl izleneceği kararlaştırılır.

### Mağaza arayüzü ile satış altyapısını ayırmak şart mı?

Ayrı arayüz, mevcut satış altyapısının korunması ve farklı bir alışveriş deneyimi geliştirilmesi gereken projelerde değerlendirilebilir. Seçim, bağlantı ve bakım yükü de hesaba katılarak yapılır.

### Yayından sonra sistemin bakımını kim yapar?

Barındırma, izleme, yedekleme, güncellemeler ve destek kapsamı proje teklifinde belirlenir. Ayrı hizmetler veya üçüncü taraf hesaplar varsa sorumluları teslimde açıkça belirtilir.
