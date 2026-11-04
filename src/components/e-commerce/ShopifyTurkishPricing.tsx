import Link from '@/components/IntentLink';
import InternalPageHero from '@/components/services/InternalPageHero';
import ShopifyMotionScope from './ShopifyMotionScope';
import { ShopifyHeroScene, ShopifyIcon, ShopifyPlatformNote } from './ShopifyMark';
import { ShopifyIntro, ShopifyLink, ShopifyPageCTA, ShopifySection, ShopifyTable, ShopifyVisual, shopifyFocus } from './ShopifyPagePrimitives';

const base = '/tr/hizmetler/shopify-development';
export const shopifyPricingMeta = {
  title: 'Shopify Kurulum Hizmeti Fiyatı ve Maliyet Kalemleri | PakSoft',
  description: 'Shopify site kurulum maliyetini belirleyen tasarım, veri ve entegrasyon işlerini inceleyin. PakSoft hizmet bedelini abonelik ve üçüncü taraf giderlerinden ayırın.',
};

const drivers = [
  ['Tasarım ve sayfa kapsamı','Hazır tema düzenlemesi ile farklı sayfa türleri için özel bölüm geliştirmek aynı çalışma değildir. Ana sayfanın yanında ürün, koleksiyon, içerik ve kampanya şablonları değerlendirilir.'],
  ['Ürün ve varyant verileri','Ürün adedi tek başına yeterli ölçüt değildir. Varyant yapısı, görsellere erişim, eksik alanlar ve veri temizleme ihtiyacı iş yükünü etkiler.'],
  ['Mevcut mağazadan geçiş','Kaynak veriler, eski URL’ler ve taşınacak kayıt türleri incelenir. Geçmiş siparişler veya özel uygulama verileri standart ürün aktarımından ayrı değerlendirilir.'],
  ['Ödeme, kargo ve işletme bağlantıları','Hazır uygulamanın kurulması ile özel veri akışı geliştirilmesi farklı kapsamlar oluşturur. Hesap erişimleri, API olanakları ve test senaryoları belirlenir.'],
  ['Dil ve pazar ihtiyaçları','Çevrilecek içerikler, pazar düzeni ve uygulama uyumu ek çalışma gerektirebilir. Çeviri üretimi ve yerel danışmanlık otomatik olarak kurulum bedeline dahil sayılmaz.'],
  ['Test ve devir kapsamı','Kontrol edilecek sayfalar, örnek sipariş akışları, yönetim notları ve yayın sonrası takip kapsamı teklifte açıklanır.'],
] as const;

const faqs = [
  ['Shopify site kurulum fiyatı neden sabit değil?','Tema değişiklikleri, sayfa türleri, ürün verileri ve gerekli bağlantılar projeden projeye değişir. Teklif, belirlenen teslimat ve sorumluluklara göre hazırlanır.'],
  ['Shopify aboneliği PakSoft teklifine dahil mi?','Shopify aboneliği ayrı bir platform gideridir. Teklifte belirli bir harici bedelin dahil olduğu açıkça yazılmadıkça PakSoft hizmet ücretinin bu giderleri karşıladığı varsayılmaz.'],
  ['Ücretsiz bir tema seçersem geliştirme ücretsiz olur mu?','Hayır. Tema lisans bedeli ile mağazanın hazırlanması ve geliştirilmesi farklı kalemlerdir. Ücretsiz tema kullanılsa da tasarım düzenleme, veri hazırlığı ve test işleri gerekebilir.'],
  ['Her uygulama için düzenli ödeme gerekir mi?','Uygulamanın koşullarına bağlıdır. Ücretsiz, tek seferlik, düzenli veya kullanıma bağlı ücret modelleri bulunabilir. Gerekli özellikler ve ücret seviyesi seçimden önce kontrol edilir.'],
  ['Ödeme komisyonu ile Shopify işlem ücreti aynı mı?','Hayır. Ödeme sağlayıcısının ücreti ile Shopify’ın geçerli olabilecek üçüncü taraf işlem ücreti ayrı kalemlerdir. Koşullar plan, hesap ve ödeme yöntemine göre kontrol edilir.'],
  ['Mağaza taşıma bedeline her veri dahil mi?','Hayır. Aktarılacak kayıtlar ve yöntem teklif kapsamına yazılır. Geçmiş siparişler, özel alanlar ve uygulama verileri ayrıca inceleme gerektirebilir.'],
  ['Yayın sonrası destek ve yeni geliştirmeler nasıl fiyatlanır?','Destek süresi ve dahil işler proje teklifinde belirtilir. Yeni sayfa, işlev veya bağlantı talepleri mevcut kapsamla karşılaştırılarak ayrıca değerlendirilir.'],
] as const;

const pageLinks = [
  ['Shopify Kurulum ve Geliştirme','Genel hizmet kapsamı ve başlangıç ihtiyaçları.',base],['Özellikler','Mağaza tasarımı, ürün sunumu ve bağlantı teslimatları.',`${base}/ozellikler`],['Teknolojiler','Tema, uygulama ve özel geliştirme seçenekleri.',`${base}/teknoloji`],['Süreç','Hazırlık, taşıma, test ve yayın adımları.',`${base}/surec`],['Portföy','Proje örneklerini ve kapsamlarını değerlendirme.',`${base}/portfoy`],['Blog','Mağaza hazırlığı ve geliştirme kararları için rehberler.',`${base}/blog`],['Sık Sorulan Sorular','Hizmet kapsamı ve proje kararları hakkında yanıtlar.',`${base}/sss`],
] as const;

export default function ShopifyTurkishPricing() {
  return <main className="min-h-screen bg-white">
    <ShopifyMotionScope />
    <InternalPageHero serviceName="Shopify Geliştirme" accentWord="Shopify Fiyatlandırma" eyebrowNormalCase heading="Shopify Kurulum Hizmeti Fiyatını Neler Belirler?" subtitle="Shopify site kurulum fiyatı; tasarımın kapsamına, ürün verilerinin durumuna, bağlantılara ve varsa mağaza taşıma işlerine göre belirlenir. PakSoft’un kurulum ve geliştirme bedeli ile Shopify aboneliği ve üçüncü taraf giderleri ayrı kalemlerdir. Ürün yapınızı, gerekli sayfaları ve kullandığınız sistemleri paylaşın; projenize dahil işleri ve ayrıca karşılanacak giderleri netleştirelim." crumbs={[{label:'Ana Sayfa',href:'/'},{label:'Hizmetler',href:'/services'},{label:'Shopify Geliştirme',href:base},{label:'Fiyatlandırma'}]} eyebrowIcon={<ShopifyIcon size={26} />} actions={<><Link href="/tr/start-project?service=shopify-development" className={`inline-flex min-h-11 items-center justify-center rounded-sm bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700 ${shopifyFocus}`}>Shopify Projem İçin Teklif Al</Link><a href="#shopify-maliyet-kalemleri" className={`inline-flex min-h-11 items-center justify-center rounded-sm border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-heritage-turquoise ${shopifyFocus}`}>Maliyet Kalemlerini İncele</a></>} footnote={<div className="space-y-3"><p className="text-sm font-medium text-gray-600">Proje kapsamı · Platform giderleri · Devam eden maliyetler</p><ShopifyPlatformNote /></div>} scene={<ShopifyHeroScene><div className="w-full max-w-md space-y-3" aria-label="Temsili maliyet başlıkları">{[['Kurulum ve geliştirme','Tasarım, tema ve proje işleri'],['Platform ve servisler','Abonelikler ve üçüncü taraf hizmetleri'],['İşlem ve devam eden hizmetler','Kullanım ücretleri, bakım ve yeni işler']].map(([title,text],i)=><div key={title} className="flex items-center gap-4 rounded-xl border border-heritage-sand bg-white p-4 shadow-sm"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-heritage-turquoise-light text-sm font-semibold text-heritage-turquoise-deep">0{i+1}</span><div><strong className="block text-sm text-gray-900">{title}</strong><span className="mt-1 block text-xs text-gray-600">{text}</span></div></div>)}</div></ShopifyHeroScene>} rotating={{ lead: 'Shopify', words: ['Kurulum Fiyatları', 'Site Yaptırma Fiyatları', 'Tema Tasarımı Fiyatı'] }} />

    <ShopifySection id="shopify-maliyet-kalemleri" title="Shopify mağaza kurma maliyetini üç başlıkta düşünün" tone="gray">
      <ShopifyIntro>Toplam bütçeyi değerlendirirken yalnız ilk kurulum teklifine veya Shopify plan ücretine bakmak yeterli değildir. Başlangıç işleri, düzenli servisler ve işlemle oluşan giderleri ayrı değerlendirin.</ShopifyIntro>
      <ShopifyVisual name="cost-split" className="mt-6 max-w-lg" label="Temsili gider grupları: PakSoft hizmet bedeli, Shopify platform ve uygulama giderleri ile günlük operasyon giderleri ayrı planlanıyor" />
      <ShopifyTable label="Shopify mağaza maliyet grupları" headers={['Maliyet grubu','Neleri kapsayabilir?','Nasıl belirlenir?']} rows={[
        ['Kurulum ve geliştirme','Tasarım, tema düzenleme, veri işleri, test ve kapsam dahilindeki bağlantılar','PakSoft teklifinde yazılı teslimatlar üzerinden'],['Platform ve servis giderleri','Shopify planı, alan adı, ücretli tema ve uygulamalar','İlgili sağlayıcının güncel koşulları üzerinden'],['İşlem ve devam eden hizmetler','Ödeme/işlem ücretleri, kullanıma bağlı servisler, bakım veya yeni geliştirmeler','Hesap, kullanım ve ayrıca kararlaştırılmış hizmet kapsamına göre'],
      ]}/>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Bir kalemin tek seferlik, düzenli veya kullanıma bağlı olması sağlayıcıya ve seçilen çözüme göre değişebilir. Ödeme yapmadan önce güncel fiyat ve koşulları kontrol edin.</p>
    </ShopifySection>

    <ShopifySection title="PakSoft proje bedelini etkileyen işler">
      <div data-shopify-reveal-group className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">{drivers.map(([title,text])=><article key={title} className="shopify-motion-card border-t-2 border-heritage-turquoise pt-4"><h3 className="font-semibold text-gray-950">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></article>)}</div>
      <p className="mt-5"><ShopifyLink href={`${base}/ozellikler`}>Shopify özellikleri ve teslimat kapsamını inceleyin</ShopifyLink></p>
    </ShopifySection>

    <ShopifySection title="Shopify site yaptırma fiyatları proje türüne göre nasıl şekillenir?" tone="ivory">
      <ShopifyIntro>Aşağıdaki başlıklar sabit fiyatlı paket değildir. İhtiyacınızın hangi iş grubuna yakın olduğunu belirlemeye yardımcı olur.</ShopifyIntro>
      <ShopifyTable label="Shopify proje türleri ve teklif bilgileri" headers={['Proje türü','Değerlendirilen işler','Teklif için gereken bilgi']} rows={[
        ['Yeni mağaza kurulumu','Tema yaklaşımı (Shopify tema tasarımı fiyatı dahil), sayfalar, ürün hazırlığı ve temel ayarlar','Ürün yapısı, içerik durumu ve gerekli işlevler'],['Mevcut Shopify mağazasını geliştirme','Tema, sayfa veya belirli işlevlerin düzenlenmesi','Mevcut adres ve değişiklik listesi'],['Başka altyapıdan Shopify’a taşıma','Veri eşleştirme, URL planı, test ve yayın geçişi','Kaynak sistem ve aktarılacak kayıtlar'],['Özel entegrasyon veya geliştirme','API, veri akışı, uygulama ve bakım ihtiyacı','Sistem belgeleri, erişimler ve hedef iş akışı'],
      ]}/>
      <p className="mt-4 text-sm leading-6 text-gray-600">Bir projede birden fazla iş grubu bulunabilir. Bu durumda teslimatları tek kapsam içinde açıkça ayırırız.</p>
    </ShopifySection>

    <ShopifySection title="Shopify aboneliği ve üçüncü taraf giderleri">
      <ShopifyIntro>Shopify’ın kendi plan ücreti, PakSoft’un geliştirme hizmet bedeli değildir. Uygulamalar ve diğer servisler de ayrıca gider oluşturabilir.</ShopifyIntro>
      <ShopifyTable label="Shopify platform ve dış servis giderleri" headers={['Kalem','Kontrol edilmesi gereken konu']} rows={[
        ['Shopify aboneliği','Hesaba uygun plan, fatura dönemi, para birimi ve güncel koşullar'],['Tema','Ücretsiz veya ücretli seçim, lisans ve kullanım şartları'],['Uygulamalar','Düzenli ücret, kullanıma bağlı ücret ve gerekli özellik seviyesi'],['Alan adı','Kayıt ve yenileme bedeli; mevcut alan adının durumu'],['Ödeme sağlayıcısı','İşletme ülkesine uygunluk, hesap onayı ve sağlayıcı ücretleri'],['Shopify işlem ücretleri','Seçilen plan, ödeme yöntemi ve geçerli istisnalar'],['Özel servisler','Varsa ayrı uygulama, ara katman veya headless barındırma giderleri'],
      ]}/>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Shopify plan ücretleri ve kampanyaları değişebilir. Güncel tutarları resmi sayfadan ve mağaza hesabınızdan kontrol edin. Ödeme sağlayıcısının ücreti ile Shopify’ın geçerli olabilecek üçüncü taraf işlem ücreti farklı kalemlerdir.</p>
      <a href="https://www.shopify.com/tr/pricing" target="_blank" rel="noopener noreferrer" className={`mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${shopifyFocus}`}>Shopify’ın güncel planlarını inceleyin <span aria-hidden="true">↗</span><span className="sr-only"> (yeni sekmede açılır)</span></a>
    </ShopifySection>

    <ShopifySection title="Mağaza taşıma maliyeti neden ayrıca değerlendirilir?" tone="gray">
      <ShopifyIntro>Çalışan bir mağazadan geçişte yalnız yeni tasarım hazırlanmaz. Eski sistemdeki kayıtların nasıl karşılanacağı ve satış operasyonunun nasıl devam edeceği de planlanır.</ShopifyIntro>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">{[['Veri kapsamı','Ürün, varyant, müşteri, geçmiş sipariş ve ek içerik türleri ayrı listelenir.'],['Verinin durumu','Eksik görseller, tutarsız ürün alanları veya özel eklenti kayıtları hazırlık gerektirebilir.'],['URL ve içerik geçişi','Önemli eski adreslerin ilgili yeni sayfalara eşleştirilmesi ve desteklenen yönlendirmelerin kontrolü planlanır.'],['Geçiş ve doğrulama','Deneme aktarımı, örnek kontroller, son veri işlemleri ve yayın adımları kapsamlandırılır.']].map(([title,text])=><div key={title} className="border-s-2 border-heritage-turquoise ps-4"><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-600">{text}</p></div>)}</div>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">WooCommerce’ten Shopify’a geçişte eklenti alanları ve geçmiş kayıtlar ayrıca incelenir. Her işlevin veya verinin birebir aktarılacağı varsayılmaz.</p>
      <p className="mt-4"><ShopifyLink href={`${base}/surec`}>Shopify kurulum ve taşıma sürecini inceleyin</ShopifyLink></p>
      <aside className="mt-6 rounded-xl border border-heritage-sand bg-white p-5"><h3 className="font-semibold text-gray-950">Önce kapsamı netleştirelim, sonra teklif hazırlayalım</h3><p className="mt-2 text-sm leading-6 text-gray-600">Mevcut sitenizi veya yeni mağaza planınızı paylaşın. Tasarım, veri ve bağlantı ihtiyaçlarını belirleyerek karşılaştırılabilir bir teklif kapsamı oluşturalım.</p><Link href="/tr/start-project?service=shopify-development" className={`mt-3 inline-flex min-h-11 items-center rounded-sm bg-heritage-turquoise-deep px-4 py-2.5 text-sm font-semibold text-white hover:bg-heritage-turquoise ${shopifyFocus}`}>Proje Bilgilerimi Paylaş</Link></aside>
    </ShopifySection>

    <ShopifySection title="Teklifte hangi ayrıntılar açık olmalı?">
      <ShopifyIntro>Yalnız toplam tutarı karşılaştırmak, tekliflerin aynı işleri içerdiğini göstermez. Kapsamın aşağıdaki başlıklarda açıklanması kararınızı kolaylaştırır.</ShopifyIntro>
      <ShopifyTable label="Shopify teklifinde netleştirilecek başlıklar" headers={['Teklif başlığı','Netleşmesi gereken bilgi']} rows={[
        ['Sayfalar ve tasarım','Hazırlanacak sayfa türleri, özel bölümler ve tema yaklaşımı'],['Ürün ve veri işleri','İşlenecek kayıtlar ve verinin kimin tarafından hazırlanacağı'],['Entegrasyonlar','Bağlanacak sistemler, veri yönü ve test kapsamı'],['Harici giderler','Tema, uygulama, abonelik ve diğer sağlayıcı bedelleri'],['Onay ve revizyon','Geri bildirim adımları ve teklif kapsamındaki düzenlemeler'],['Takvim','Hazırlıklar, bağımlılıklar ve teslim aşamaları'],['Ödeme ve vergiler','Para birimi, vergi durumu, ödeme koşulları ve teklif geçerliliği'],['Teslim ve destek','Devir içeriği, destek süresi ve yeni işlerin değerlendirilmesi'],
      ]}/>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Bu başlıklar her teklifin aynı sayıda revizyon veya aynı destek süresini içerdiği anlamına gelmez. Gerçek koşullar proje teklifinde yazılı olarak belirtilir.</p>
    </ShopifySection>

    <ShopifySection title="Bütçeyi önceliklere göre planlayın" tone="ivory">
      <ShopifyIntro>İlk sürüme bütün olası özellikleri eklemek yerine satışa başlamak ve operasyonu yürütmek için gerekli işleri belirleyin.</ShopifyIntro>
      <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700"><li><strong>İlk sürüm:</strong> Ürünlerin doğru sunumu, gerekli sayfalar, alışveriş akışı ve zorunlu bağlantılar önceliklendirilir.</li><li><strong>Sonraki geliştirmeler:</strong> Gelişmiş kampanya alanları, ek içerik şablonları veya yeni otomasyonlar ihtiyaç netleştikçe ayrıca planlanabilir.</li><li><strong>Düzenli gözden geçirme:</strong> Kullanılmayan uygulamalar ve yinelenen işlevler değerlendirilir. Abonelik ve bakım yükü de dikkate alınır.</li></ul>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">Bu yaklaşım belirli bir tasarruf oranı veya daha düşük toplam maliyet garantisi değildir; öncelikleri ve sonraki işleri görünür hale getirir.</p>
    </ShopifySection>

    <ShopifySection title="Teklif almak için bize neler göndermelisiniz?">
      <ol className="mt-5 list-decimal space-y-2 ps-6 text-sm leading-6 text-gray-700"><li>Yeni mağaza mı kuruyorsunuz, mevcut mağazayı mı geliştiriyorsunuz?</li><li>Mevcut site adresiniz ve kullandığınız altyapı nedir?</li><li>Ürün ve varyant yapınız nasıl; verileriniz hazır mı?</li><li>Hangi sayfalar, diller ve pazarlar gerekiyor?</li><li>Ödeme, kargo, ERP veya başka hangi sistemler kullanılacak?</li><li>Taşınması gereken müşteri, sipariş veya ek içerik var mı?</li><li>Öncelikli yayın hedefiniz ve varsa bütçe aralığınız nedir?</li></ol>
      <p className="mt-4 text-sm leading-6 text-gray-600">Elinizde olmayan bilgileri de belirtin. Ön incelemede hangi konuların netleşmesi gerektiğini birlikte çıkarabiliriz.</p>
      <p className="mt-4"><Link href="/tr/start-project?service=shopify-development" className={`inline-flex min-h-11 items-center rounded-sm bg-heritage-turquoise-deep px-4 py-2.5 text-sm font-semibold text-white hover:bg-heritage-turquoise ${shopifyFocus}`}>Shopify Teklif Talebi Gönder</Link></p>
    </ShopifySection>

    <ShopifySection title="Shopify hizmetinin diğer ayrıntıları" tone="gray">
      <ShopifyIntro>Kurulum, teknik kapsam ve proje kararlarını ilgili sayfalarda karşılaştırabilirsiniz.</ShopifyIntro>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{pageLinks.map(([title,text,href])=><ShopifyLink key={title} href={href} className={`group flex h-full flex-col rounded-lg border border-heritage-sand bg-white p-4 transition-colors hover:border-heritage-turquoise ${shopifyFocus}`}><span className="font-semibold text-gray-900">{title}</span><span className="mt-1 block text-sm font-normal leading-6 text-gray-600">{text}</span><span className="mt-auto pt-3 text-sm font-semibold text-heritage-turquoise-deep">İncele</span></ShopifyLink>)}</div>
    </ShopifySection>

    <ShopifySection title="Shopify maliyeti hakkında sık sorulan sorular">
      <div className="divide-y divide-heritage-sand border-y border-heritage-sand">{faqs.map(([question,answer])=><article key={question} className="py-4"><h3 className="font-semibold text-gray-950">{question}</h3><p className="mt-2 max-w-4xl text-sm leading-6 text-gray-600">{answer}</p></article>)}</div>
    </ShopifySection>
    <ShopifyPageCTA title="Shopify projeniz için kapsamı net bir teklif alın" description="Ürünlerinizi, tasarım beklentilerinizi ve mevcut sistemlerinizi paylaşın. İlk kurulum işlerini, harici giderleri ve sonraki geliştirme ihtiyaçlarını ayrı görebileceğiniz bir kapsam oluşturalım." primary="Shopify Projem İçin Teklif Al" secondaryHref={`${base}/surec`} secondary="Proje Sürecini İncele"/>
  </main>;
}
