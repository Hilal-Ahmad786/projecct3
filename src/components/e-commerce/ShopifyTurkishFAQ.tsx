import Link from '@/components/IntentLink';
import InternalPageHero from '@/components/services/InternalPageHero';
import ShopifyMotionScope from './ShopifyMotionScope';
import { ShopifyHeroScene, ShopifyIcon, ShopifyPlatformNote } from './ShopifyMark';
import { ShopifyIntro, ShopifyPageCTA, ShopifySection, shopifyFocus } from './ShopifyPagePrimitives';
import PageJumpNav from './PageJumpNav';
import PlatformPageLinks from './PlatformPageLinks';

const base = '/tr/hizmetler/shopify-development';
export const shopifyFaqMeta = {
  title: 'Shopify Kurulum ve Mağaza Taşıma SSS | PakSoft',
  description: 'Shopify kurulumu, maliyetler, tema tasarımı, WooCommerce taşıma ve entegrasyonlar hakkında sık sorulan soruların yanıtlarını PakSoft ile inceleyin.',
};

const groups = [
  { id:'shopify-kurulum-sorulari', title:'Shopify kurulum ve hazırlık', items:[
    ['Shopify e-ticaret sitesi kurulumu neleri kapsar?','Kapsam; tema ve sayfa düzenleri, ürün hazırlığı, gerekli ayarlar, bağlantılar ve yayın testleri üzerinden belirlenir. Her işin otomatik dahil olduğu varsayılmaz; teslimatlar proje teklifinde açıkça yazılır.', ['Shopify hizmetinin genel kapsamı',base]],
    ['Shopify mağazası açmak için yazılım bilmem gerekir mi?','Günlük ürün ve içerik yönetiminde kod bilgisi gerektirmeyen alanlar bulunur. Özel tasarım veya işlev değişiklikleri için geliştirme gerekebilir. Projede hangi alanları kendiniz yönetmeniz gerektiğini başlangıçta belirleriz.'],
    ['Kuruluma başlamadan önce ne hazırlamalıyım?','Marka dosyaları, ürün ve varyant verileri, görseller, sayfa içerikleri ve kullanılacak sistemlerin listesiyle başlanabilir. Alan adı ve sağlayıcı hesapları gibi erişim ihtiyaçları ayrıca çıkarılır; eksikler hazırlık planına yazılır.'],
    ['Shopify web sitesi kurma süreci ne kadar sürer?','Süre; tasarım, veri, bağlantılar ve içeriklerin hazır olmasına bağlıdır. İnceleme sonrası aşamalar ve dış bağımlılıklar belirlenir. Her proje için aynı teslim süresi verilmez.', ['Kurulum adımları ve hazırlık listesi',`${base}/surec`]],
    ['Mevcut alan adımı kullanabilir miyim?','Alan adının erişim ve teknik durumu kontrol edilerek bağlantı yöntemi planlanabilir. Alan adını mağazaya bağlamak ile kayıt kuruluşunu değiştirmek farklı işlemlerdir. Mevcut e-posta ve diğer servislerin kayıtları da dikkate alınır.'],
  ]},
  { id:'shopify-fiyat-sorulari', title:'Shopify fiyat ve giderler', items:[
    ['Shopify site kurulum fiyatı nasıl belirlenir?','Sayfa ve tasarım kapsamı, ürün verileri, gerekli bağlantılar ve varsa taşıma işleri değerlendirilir. Yalnız ürün sayısı veya beğenilen bir ekran görüntüsü üzerinden kesin teklif hazırlanmaz.', ['Shopify fiyatlandırma ve maliyet kalemleri',`${base}/fiyatlandirma`]],
    ['Shopify aboneliği PakSoft hizmet bedeliyle aynı mı?','Hayır. Shopify aboneliği platform gideridir; PakSoft’un tasarım ve geliştirme bedeli ayrı değerlendirilir. Bir harici giderin dahil olduğu teklifte açıkça yazılmadıkça otomatik dahil sayılmaz.'],
    ['Tema ve uygulamalar ek maliyet oluşturur mu?','Seçilen çözüme bağlı olarak oluşturabilir. Ücretsiz seçeneklerin yanında lisans, düzenli abonelik veya kullanıma bağlı ücretler bulunabilir. Gerekli özelliklerin hangi koşullarda sunulduğu seçimden önce kontrol edilir.'],
    ['Shopify işlem ücreti ile ödeme sağlayıcısının ücreti aynı mı?','Hayır. Ödeme sağlayıcısının aldığı ücret ile Shopify’ın geçerli olabilecek üçüncü taraf işlem ücreti farklı kalemlerdir. Uygulanacak koşullar plan, hesap ve ödeme yöntemi üzerinden değerlendirilir.'],
    ['Ücretsiz bir tema seçersem proje maliyeti ortadan kalkar mı?','Hayır. Tema lisansı ile kurulum, içerik hazırlığı, düzenleme ve test çalışmaları ayrı işlerdir. Ücretsiz tema seçilse de gerekli geliştirmeler proje kapsamına göre fiyatlandırılır.'],
  ]},
  { id:'shopify-tasarim-sorulari', title:'Shopify tema ve yönetim', items:[
    ['Hazır Shopify teması markama göre düzenlenebilir mi?','Temanın yapısı ve lisans koşulları incelenerek renk, tipografi, bölüm düzeni ve desteklenen sayfa alanları üzerinde çalışılabilir. Tema ayarıyla çözülemeyen ihtiyaçlar için özel geliştirme ayrıca belirlenir.', ['Tema ve mağaza özellikleri',`${base}/ozellikler`]],
    ['Özel ürün sayfaları ve ek bilgi alanları hazırlanabilir mi?','Ürün türlerinize göre şablon ve yapılandırılmış bilgi alanları değerlendirilebilir. Hangi bilgilerin girileceği, nasıl gösterileceği ve içerikleri kimin hazırlayacağı kapsamda açıklanır.'],
    ['Ürün ve kampanya alanlarını kendim değiştirebilir miyim?','Yönetilebilir alanlar seçilen tema ve yapılan geliştirmeye göre hazırlanır. Teslimde bu alanların kullanımı açıklanır. Yeni bir işlev eklemek veya veri yapısını değiştirmek ayrıca geliştirme gerektirebilir.'],
    ['Shopify projesinde headless yapı zorunlu mu?','Hayır. Önce standart tema yapısının ihtiyacı karşılayıp karşılamadığı değerlendirilir. Ayrı ön yüz gerektiren somut ihtiyaç varsa headless yaklaşım; yönetim, entegrasyon ve bakım yüküyle birlikte incelenir.', ['Shopify teknik yaklaşımı',`${base}/teknoloji`]],
    ['Shopify ile yapılmış siteleri nereden inceleyebilirim?','Portföy sayfamızda örnek değerlendirme noktalarını inceleyebilirsiniz. Yayınlanabilir doğrulanmış çalışma varsa PakSoft’un ilgili projedeki kapsamı ayrıca belirtilir. Bir sitenin Shopify kullanması, PakSoft referansı olduğu anlamına gelmez.', ['Shopify portföyü ve örnek değerlendirme',`${base}/portfoy`]],
  ]},
  { id:'shopify-tasima-sorulari', title:'Shopify mağaza taşıma', items:[
    ['Mevcut mağazamı Shopify’a taşıyabilir miyim?','Kaynak sistem, veri yapısı ve kullanılan işlevler incelenerek geçiş kapsamı belirlenir. Ürün, müşteri ve geçmiş kayıtların aktarılabilirliği ayrı değerlendirilir; bütün özelliklerin birebir taşınacağı varsayılmaz.'],
    ['WooCommerce’ten Shopify’a taşıma neleri içerir?','Ürünler, varyantlar, müşteri kayıtları, geçmiş siparişler, içerikler ve eklenti alanları ayrı listelenir. Her veri türü aynı yöntemle taşınmaz. Yeniden kurulacak işlevler ve ek araç gerektiren kayıtlar inceleme sonrası belirlenir.', ['WooCommerce geçiş kontrol noktaları',`${base}/surec#woocommerce-shopify-tasima`]],
    ['Müşterilerimin eski şifreleri aktarılır mı?','Hayır. Başka altyapıdaki müşteri şifreleri taşınmaz. Seçilen Shopify hesap türüne göre müşterilerin giriş yöntemi ve gerekli bilgilendirme planlanır.'],
    ['Geçmiş siparişler ve yorumlar da taşınır mı?','Kaynak veriye erişim ve hedef çözümün desteklediği alanlar incelenir. Bu kayıtlar ürün aktarımına otomatik dahil değildir; uygun araç veya ayrı çalışma gerekebilir.'],
    ['Taşıma sırasında eski mağazam açık kalabilir mi?','Hazırlık aşamasında çalışmaya devam etmesi planlanabilir. Son veri işlemleri ve yayın geçişinde oluşacak operasyon etkileri ayrıca değerlendirilir. Kesintisiz geçiş veya tüm değişikliklerin otomatik eşitleneceği garantisi verilmez.'],
    ['Eski sayfa bağlantıları ne olur?','Önemli eski adresler ilgili yeni sayfalarla eşleştirilir ve desteklenen yönlendirmeler hazırlanır. Bağlantılar ve örnek hedefler kontrol edilir. Bu çalışma sıralamaların veya trafiğin aynı kalacağı garantisi değildir.', ['Veri ve SEO geçiş planı',`${base}/surec`]],
  ]},
  { id:'shopify-entegrasyon-sorulari', title:'Shopify entegrasyonları ve pazarlar', items:[
    ['Türkiye’deki işletmem için ödeme sistemi bağlanabilir mi?','İşletmenin kayıt ülkesi, sağlayıcının güncel desteği ve hesap koşulları incelenir. Uygun çözüm bulunduğunda bağlantı ve test kapsamı belirlenir. Sağlayıcı onayı veya belirli bir ödeme yöntemine erişim garanti edilmez.', ['Ödeme geçidi entegrasyonu','/tr/hizmetler/payment-gateway-integration']],
    ['Checkout sayfasını istediğim gibi değiştirebilir miyim?','Checkout’taki düzenleme ve uzantılar Shopify planına ve güncel platform kurallarına bağlıdır. Tema tasarımıyla aynı serbestlikte olduğu varsayılmaz; istenen değişiklikler mevcut hesap ve desteklenen yöntemlerle karşılaştırılır.'],
    ['Kargo, ERP veya muhasebe sistemim bağlanabilir mi?','Önce hazır bağlantılar ve ilgili sistemin API olanakları değerlendirilir. Aktarılacak alanlar, veri yönü ve hata yönetimi belirlenir. Ön inceleme yapılmadan her sistemle hazır entegrasyon sözü verilmez.'],
    ['Birden fazla dil ve pazarda satış yapabilir miyim?','Dil ve pazar yapısı; plan, tema, uygulamalar ve hesap koşullarıyla değerlendirilir. Çeviri içeriklerinin hazırlanması ile farklı para birimlerinde ödeme alma uygunluğu ayrı konulardır.'],
    ['Her yeni özellik için ücretli uygulama gerekir mi?','Hayır. Önce Shopify’ın ve mevcut temanın olanakları kontrol edilir. Ek uygulama veya özel geliştirme gerekiyorsa maliyet, veri erişimi ve bakım etkisiyle birlikte değerlendirilir.', ['Uygulama ve entegrasyon seçimi',`${base}/teknoloji`]],
  ]},
  { id:'shopify-yayin-sorulari', title:'SEO, yayın ve destek', items:[
    ['Shopify mağazam Google’da üst sıralara çıkar mı?','Teknik ve içerik hazırlığı arama görünürlüğünü destekleyebilir; belirli sıralama veya trafik sonucu garanti edilmez. Projede yapılan SEO kontrolleri ile devam eden içerik ve pazarlama çalışmaları ayrı kapsamlandırılır.'],
    ['Mağaza hızı için sabit puan garantisi veriyor musunuz?','Hayır. Tema, görseller ve uygulamaların etkileri kapsam içinde değerlendirilir; sonuçlar cihaz, bağlantı ve üçüncü taraf kodlardan da etkilenir. Kontrol edilen sayfalar ve bulgular proje kapsamında paylaşılır.'],
    ['Yayın öncesinde sipariş testi yapılır mı?','Kapsamda belirlenen alışveriş ve operasyon akışları uygun yöntemle kontrol edilir. Test modu veya gerçek işlem gereksinimi sağlayıcıya bağlıdır. Gerçek işlem gerekiyorsa olası ücret ve iade yöntemi önceden kararlaştırılır.'],
    ['Yayından sonra destek ve yönetim devri nasıl olur?','Teslimde yönetim notları, ilgili erişimler ve açık konular paylaşılır. Destek süresi, dahil düzeltmeler ve yeni geliştirme taleplerinin değerlendirilmesi teklif koşullarına göre belirlenir; sınırsız destek varsayılmaz.', ['Yayın ve teslim adımları',`${base}/surec`]],
  ]},
] as const;

const categoryLinks = groups.map(({id,title})=>({id,title}));

export default function ShopifyTurkishFAQ() {
  return <main className="min-h-screen bg-white">
    <ShopifyMotionScope />
    <InternalPageHero serviceName="Shopify Geliştirme" accentWord="Shopify Sık Sorulan Sorular" eyebrowNormalCase heading="Shopify Kurulum ve Geliştirme Hakkında Sık Sorulan Sorular" subtitle="Shopify mağazası kurmadan, mevcut sitenizi taşımadan veya geliştirme planlamadan önce kapsamı netleştirin. Kurulum, maliyet, tasarım, veri aktarımı ve bağlantılar hakkındaki soruları burada kısa yanıtlarla açıklıyoruz. Projenize özgü yanıtlar; ürün yapınız, mevcut sistemleriniz ve gerekli özellikler incelendikten sonra belirlenir." crumbs={[{label:'Ana Sayfa',href:'/'},{label:'Hizmetler',href:'/services'},{label:'Shopify Geliştirme',href:base},{label:'SSS'}]} eyebrowIcon={<ShopifyIcon size={26} />} actions={<><Link href="/tr/start-project?service=shopify-development" className={`inline-flex min-h-11 items-center justify-center rounded-sm bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700 ${shopifyFocus}`}>Shopify İhtiyacımı Paylaş</Link><a href="#shopify-kurulum-sorulari" className={`inline-flex min-h-11 items-center justify-center rounded-sm border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-heritage-turquoise ${shopifyFocus}`}>Soruları İncele</a></>} scene={<ShopifyHeroScene><div className="grid w-full max-w-md gap-3 sm:grid-cols-3">{[['Kurulum','Ürün ve sayfa hazırlığı'],['Taşıma','Veri ve URL planı'],['Maliyet','Kapsam ve devam eden giderler']].map(([title,text],i)=><div key={title} className="rounded-xl border border-heritage-sand bg-white p-4 shadow-sm sm:p-3"><span className="text-xs text-heritage-turquoise-deep">0{i+1}</span><strong className="mt-2 block text-sm text-gray-900">{title}</strong><span className="mt-1 block text-xs leading-5 text-gray-600">{text}</span></div>)}</div></ShopifyHeroScene>} footnote={<div className="space-y-3"><p className="text-sm font-medium text-gray-600">Kurulum · Taşıma · Maliyet · Destek</p><ShopifyPlatformNote /></div>} rotating={{ lead: 'Shopify', words: ['Sık Sorulanlar', 'Kurulum Soruları', 'Taşıma Soruları'] }} />

    <PageJumpNav label="SSS konuları" items={categoryLinks.map(({ id, title }) => ({ href: `#${id}`, label: title }))} mark={<ShopifyIcon size={14} />} />

    {groups.map((group,index)=><ShopifySection key={group.id} id={group.id} title={group.title} tone={index%2===0?'white':'gray'}>
      <div className="divide-y divide-heritage-sand border-y border-heritage-sand">{group.items.map(([question,answer,link])=><article key={question} className="scroll-mt-28 py-5"><h3 className="text-base font-semibold leading-snug text-gray-950 sm:text-lg">{question}</h3><p className="mt-2 max-w-4xl text-sm leading-6 text-gray-700">{answer}</p>{link?<Link href={link[1]} className={`mt-2 inline-flex min-h-10 items-center text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${shopifyFocus}`}>{link[0]} <span aria-hidden="true" className="ms-2">→</span></Link>:null}</article>)}</div>
    </ShopifySection>)}

    <PlatformPageLinks platform="shopify" current="faq" tone="ivory" />
    <ShopifyPageCTA title="Shopify sorunuz projenize özelse birlikte değerlendirelim" description="Mevcut mağaza adresinizi, ürün yapınızı ve çözmek istediğiniz ihtiyacı paylaşın. Yanıtı tema, veri ve bağlantı kapsamınızla birlikte netleştirelim." primary="Shopify Sorumu ve Projemi Paylaş" secondaryHref={base} secondary="Shopify Hizmetine Dön"/>
  </main>;
}
