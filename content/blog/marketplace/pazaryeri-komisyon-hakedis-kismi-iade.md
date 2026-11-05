Komisyon platformun satıştan aldığı paydır. Hakediş, satıcıya ödenecek tutarın kaydıdır. İki satıcılı siparişte tek ürün iade edildiğinde düzeltmenin hangi sipariş kalemine ve satıcıya ait olduğu izlenebilmelidir.

[[PAKSOFT_CTA:early]]

## İki satıcılı bir sipariş üzerinden hesaplayalım

Bu temsili hesapta komisyon ürün bedeli üzerinden alınır. Kargo, indirim, vergi ve sağlayıcı ücretleri örneğe dahil edilmemiştir.

| Kalem | Ürün bedeli | Komisyon | İlk hakediş |
| --- | ---: | ---: | ---: |
| Satıcı A | 1.000 TL | %10 = 100 TL | 900 TL |
| Satıcı B | 600 TL | %15 = 90 TL | 510 TL |
| Toplam | 1.600 TL | 190 TL | 1.410 TL |

Alıcı B satıcısının ürününü iade ediyor. Bu örnekte ürün bedelinin tamamının alıcıya döndüğünü ve ilgili komisyonun tamamının geri alındığını varsayalım. B satıcısının kaydında 510 TL hakediş ve 90 TL komisyon düzeltmesi oluşur; alıcıya 600 TL iade edilir. A satıcısının 900 TL hakedişi ve 100 TL komisyon kaydı aynı kalır.

## İade satıcıya ödeme yapıldıktan sonra gelirse

Ödeme öncesinde iade, bekleyen hakedişin düzeltilmesiyle ele alınabilir. Ödeme sonrasında ise yapılan aktarım ve daha sonra oluşan iade ayrı kayıtlardır. Düzeltmenin yöntemi işletme kurallarına ve ödeme sağlayıcısının desteklediği akışa göre belirlenir. Altyapı seçeneklerini [pazaryeri altyapısı ve entegrasyonları](/tr/hizmetler/marketplace-development/teknoloji) sayfasında inceleyebilirsiniz.

[[PAKSOFT_CTA:middle]]

## Geliştirmeden önce dört kuralı yazın

1. **Komisyon matrahı.** Hesaplamada ürün bedeli mi, indirim sonrası tutar mı esas alınacak?
2. **Kural önceliği.** Satıcıya özel oran ile kategori oranı çakışırsa hangisi uygulanacak?
3. **İade dağılımı.** Sepet indirimi veya kargo ücreti varsa tek kalemin iadesine hangi tutar yansıyacak?
4. **Ödeme zamanlaması.** Hakediş ne zaman ödenebilir hâle gelecek ve ödeme sonrasında gelen iade nasıl izlenecek?

Bu kuralların teklif kapsamına etkisini [pazaryeri yazılımı fiyatları](/tr/hizmetler/marketplace-development/fiyatlandirma) sayfasında inceleyin.

## Kabul testinde hangi sonuçları aramalısınız?

Örnek siparişi oluşturun ve B satıcısının ürününü iade edin. Alıcının hesabında yalnızca ilgili kalemin iade durumu güncellenmelidir. Satıcı B panelinde düzeltmenin siparişle ilişkisi, Satıcı A panelinde ise ilk hakedişin korunduğu kontrol edilmelidir. Aynı iade bildirimi tekrar geldiğinde ikinci bir düzeltme kaydı oluşmadığı da denenmelidir. Kabul senaryolarının tamamı için [pazaryeri geliştirme süreci](/tr/hizmetler/marketplace-development/surec) sayfasına göz atın. Satış modelinizi henüz seçmediyseniz [Pazaryeri mi, E-Ticaret Sitesi mi?](/tr/hizmetler/marketplace-development/blog/pazaryeri-mi-eticaret-sitesi-mi) rehberiyle başlayın.

[[PAKSOFT_CTA:closing]]
