// Turkish copy for the ikas overview (/tr/hizmetler/ikas-development), applied
// verbatim from the approved content pack (3 Nov 2026). Plain data so the
// client hero, the server-rendered body, metadata and FAQ JSON-LD share it.

export const IKAS_TR_BASE = '/tr/hizmetler/ikas-development';
export const IKAS_TR_ENQUIRY = '/tr/start-project?service=ikas-development';

export const IKAS_TR_META = {
  title: 'ikas Mağaza Kurulumu ve Tema Tasarımı | PakSoft',
  description: 'ikas mağaza kurulumu, tema tasarımı, ürün aktarımı ve entegrasyon hizmetleri. Yeni mağazanız veya mevcut ikas siteniz için PakSoft ile kapsamı belirleyin.',
};

export const IKAS_TR_HERO = {
  eyebrow: 'ikas E-Ticaret Hizmetleri',
  title: 'ikas Mağaza Kurulumu ve Tema Tasarımı',
  text: 'Yeni ikas mağazanızı kuruyor, mevcut mağazanızı markanıza ve ürün yapınıza göre geliştiriyoruz. Tema düzenlemeleri, ürün aktarımı, uygun entegrasyonlar ve yayın öncesi kontrolleri tek bir proje planında ele alıyoruz.',
  primary: 'ikas Projem İçin Teklif Al',
  secondary: 'Hizmet Kapsamını İncele',
  scope: "Yeni mağaza kurulumu · Tema özelleştirme · ikas'a geçiş",
};

export const IKAS_TR_FAQ: { question: string; answer: string }[] = [
  { question: 'ikas hesabım var. Yalnızca tema düzenlemesi yaptırabilir miyim?', answer: 'Evet. Mevcut temayı ve ihtiyaç duyduğunuz sayfaları inceleyerek yalnızca tasarım veya belirli geliştirmeler için kapsam oluşturabiliriz. Hangi değişikliklerin mevcut tema ortamında yapılabileceğini önce değerlendiririz.' },
  { question: 'ikas aboneliği PakSoft hizmet bedeline dahil mi?', answer: 'Platform aboneliği ile kurulum ve geliştirme hizmeti farklı kalemlerdir. Teklifte açıkça belirtilmedikçe abonelik, uygulama ve üçüncü taraf giderleri hizmet bedeline dahil kabul edilmez.' },
  { question: "Başka bir platformdaki ürünlerim ikas'a taşınabilir mi?", answer: 'Kaynak veriyi ve hedef sistemin desteklediği alanları inceleyerek aktarım kapsamını belirleriz. Önce örnek ürünlerle kontrol yaparız; bütün kayıtların ve alanların otomatik taşınacağını varsaymayız.' },
  { question: 'Özel ikas tema geliştirme hizmeti sunuyor musunuz?', answer: 'Özel bölüm, bileşen veya tema ihtiyaçlarını mağazanızın tema ortamı ve erişimleri üzerinden değerlendiririz. Mevcut tema uyarlaması ile daha kapsamlı geliştirmelerin kapsamını ayrı tanımlarız.' },
  { question: 'Hangi ödeme ve kargo sistemlerini bağlayabilirsiniz?', answer: 'Kullanmak istediğiniz sağlayıcıları paylaşmanızla başlarız. Mevcut ikas entegrasyonlarını, paket kapsamını, sağlayıcı hesabınızı ve test imkanlarını kontrol ederek uygulanacak bağlantıları belirleriz.' },
  { question: 'Kurulum ne kadar sürer?', answer: 'Takvim; sayfa ve tasarım kapsamına, ürün verisinin hazırlığına, hesap erişimlerine ve onay süreçlerine bağlıdır. İşler netleştikten sonra aşamaları ve beklenen teslim takvimini birlikte belirleriz.' },
  { question: 'SEO ve reklam yönetimi bu hizmete dahil mi?', answer: 'Temel mağaza hazırlığı içinde kararlaştırılan SEO ve ölçümleme ayarları yapılabilir. Sürekli SEO, içerik üretimi ve reklam yönetimi ayrı hizmetlerdir; dahil işler teklifinizde belirtilir.' },
  { question: 'Yayın sonrasında mağazayı kendimiz yönetebilir miyiz?', answer: 'Proje kapsamındaki ürün, içerik ve tema alanlarının kullanımını ekibinize aktarırız. Panelden düzenlenebilen alanlarla teknik geliştirme gerektiren işleri devir sırasında ayırırız.' },
];
