import Link from '@/components/IntentLink';
import ShopifyArtwork from '@/components/shopify/visuals/ShopifyArtwork';
import ShopifyMotionScope from './ShopifyMotionScope';
import { ShopifyHero, ShopifyIntro, ShopifyLink, ShopifyPageCTA, ShopifySection, ShopifyTable, ShopifyVisual, shopifyFocus } from './ShopifyPagePrimitives';
import { ShopifyIcon } from './ShopifyMark';
import PageJumpNav from './PageJumpNav';
import PlatformPageLinks from './PlatformPageLinks';

const base = '/tr/hizmetler/shopify-development';

function ArchitectureIllustration() {
  return <figure data-shopify-reveal className="shopify-integration-demo m-0 w-full max-w-[26rem] rounded-2xl border border-heritage-sand bg-white p-4 shadow-sm sm:p-5">
    <div className="grid gap-3">
      <div className="rounded-xl border border-heritage-sand bg-heritage-ivory p-4"><p className="text-xs font-semibold text-gray-800">Mağaza arayüzü</p><div aria-hidden="true" className="mt-3 grid grid-cols-[1.2fr_.8fr] gap-2"><span className="h-12 rounded-lg bg-heritage-turquoise-light"/><span className="grid gap-2"><i className="rounded bg-white"/><i className="rounded bg-white"/></span></div></div>
      <div className="flex items-center justify-center gap-3"><span aria-hidden="true" data-shopify-loop className="shopify-integration-line shopify-flow-pulse h-px flex-1 bg-heritage-turquoise/50"/><span className="inline-flex items-center gap-2 rounded-full border border-heritage-turquoise/30 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm"><ShopifyIcon size={20} />Shopify</span><span aria-hidden="true" data-shopify-loop className="shopify-integration-line shopify-flow-pulse h-px flex-1 bg-heritage-turquoise/50"/></div>
      <div className="rounded-xl border border-heritage-sand bg-gray-50 p-4"><p className="text-xs font-semibold text-gray-800">İşletme sistemleri</p><div aria-hidden="true" className="mt-3 grid grid-cols-3 gap-2"><span className="rounded-md bg-white py-3 text-center text-[10px] text-gray-500">Ödeme</span><span className="rounded-md bg-white py-3 text-center text-[10px] text-gray-500">Kargo</span><span className="rounded-md bg-white py-3 text-center text-[10px] text-gray-500">ERP</span></div></div>
    </div>
    <figcaption className="mt-3 text-xs leading-5 text-gray-600">Proje ihtiyacına göre değişen temsili yapı</figcaption>
  </figure>;
}

const faqs = [
  ['Shopify projesinde React veya Next.js kullanmak zorunlu mu?', 'Hayır. Standart Shopify tema geliştirmesinde Liquid ve tema mimarisi kullanılır. Ayrı bir ön yüz veya uygulama ihtiyacı varsa başka teknolojiler ayrıca değerlendirilir.'],
  ['Her entegrasyon için özel uygulama mı geliştirilir?', 'Hayır. Önce mevcut platform özellikleri ve uygun hazır uygulamalar incelenir. Özel geliştirme, ihtiyaçlar ve bakım koşulları değerlendirildikten sonra seçilir.'],
  ['Shopify’ın altyapısını tamamen değiştirebilir miyiz?', 'Shopify belirli platform kuralları ve geliştirme alanları sunar. Tema, uygulama ve API olanaklarıyla yapılabilen işler değerlendirilir; çekirdek platformda sınırsız değişiklik sözü verilmez.'],
  ['API bağlantıları sürekli bakım gerektirir mi?', 'Sürüm değişiklikleri, erişim koşulları ve bağlı sistemlerdeki güncellemeler bakım ihtiyacı doğurabilir. İzleme ve güncelleme sorumluluğu bağlantının kapsamına göre ayrıca tanımlanır.'],
  ['Mevcut mağazanın teknolojisini inceleyebilir misiniz?', 'Tema, uygulama ve bağlantı ihtiyaçları için gerekli erişimler sağlandığında mevcut yapı değerlendirilebilir. İncelemenin kapsamı ve sonrasında uygulanacak geliştirmeler ayrı belirtilir.'],
] as const;


export default function ShopifyTurkishTechnologies() {
  return <main className="min-h-screen bg-white">
    <ShopifyMotionScope />
    <ShopifyHero
      crumb="Teknolojiler"
      eyebrow="Shopify Teknolojileri ve Geliştirme Yöntemi"
      heading="Shopify Özel Tema Geliştirme ve Entegrasyon Teknolojileri"
      rotating={{ lead: 'Shopify', words: ['Özel Tema Geliştirme', 'Liquid ve API', 'Entegrasyonları'] }}
      subtitle="Shopify projenizde tema, uygulama ve özel geliştirme seçeneklerini ihtiyaca göre değerlendiriyoruz. Amaç; içerik ekibinizin yönetebildiği, dış sistemlerle bağlantıları tanımlanmış ve sonraki değişiklikleri planlanabilir bir mağaza hazırlamak. Önce mevcut yapının sunduğu olanakları inceleriz. Shopify özel tema geliştirme, ek uygulama, özel bağlantı veya farklı bir ön yüz gerekiyorsa kapsamını ve bakım sorumluluğunu ayrıca belirleriz."
      primary="Teknik İhtiyacımı Paylaş"
      secondary={{ href: '#shopify-teknik-yaklasim', label: 'Teknik Yaklaşımı İncele' }}
      scope="Tema geliştirme · Liquid · GraphQL API · Sistem bağlantıları"
      scene={<ArchitectureIllustration/>}
    />

    <PageJumpNav items={[{ href: '#shopify-teknik-yaklasim', label: 'Teknik yaklaşım' }, { href: '#shopify-liquid-gelistirme-ve-tema-mimarisi', label: 'Liquid' }, { href: '#metafields-ve-metaobjects-ile-duzenli-icerik', label: 'Metafields' }, { href: '#hazir-uygulama-mi-shopify-ozel-gelistirme-mi', label: 'Uygulama mı, özel mi?' }, { href: '#graphql-api-ile-shopify-erp-entegrasyonu-ve-sistem-baglantil', label: 'ERP entegrasyonu' }, { href: '#webhook-ve-otomasyonlarda-kontrollu-veri-akisi', label: 'Webhook' }, { href: '#odeme-ve-checkout-teknik-sinirlari-bastan-belirleyelim', label: 'Checkout' }, { href: '#headless-yaklasim-ne-zaman-anlamli-olabilir', label: 'Headless' }, { href: '#teknik-yaklasim-hakkinda-sik-sorulan-sorular', label: 'SSS' }]} mark={<ShopifyIcon size={14} />} />
    <ShopifySection id="shopify-teknik-yaklasim" title="Hangi ihtiyaç için hangi teknik yaklaşım?" tone="gray">
      <ShopifyIntro>Bir Shopify e-ticaret sitesi için bütün teknolojileri aynı anda kullanmak gerekmez. Kullanılacak çözümü; tasarım beklentisi, katalog yapısı, bağlantılar ve yönetim ihtiyaçları belirler.</ShopifyIntro>
      <ShopifyTable label="Shopify teknik ihtiyaç ve çözüm karşılaştırması" headers={['İhtiyaç', 'Değerlendirilen çözüm', 'Seçimden önce kontrol']} rows={[
        ['Marka ve sayfa düzeni', 'Shopify teması, Liquid, HTML, CSS ve gerekli JavaScript', 'Mevcut temanın düzenlenebilir alanları'],
        ['İçerik ekibinin bölüm yönetimi', 'Sections, blocks ve JSON şablonları', 'Tema editöründe gerekli ayarların sunulması'],
        ['Ürüne özgü ek bilgiler', 'Metafields ve gerektiğinde metaobjects', 'Veri tipleri, içerik girişi ve tema desteği'],
        ['Hazır bir işlev eklemek', 'Uygun Shopify uygulaması', 'Uyumluluk, izinler, maliyet ve performans etkisi'],
        ['ERP veya başka bir sisteme bağlanmak', 'Uygun API, uygulama veya ara katman', 'Erişim, veri yönü ve hata senaryoları'],
        ['Standart temadan farklı bir ön yüz', 'Gereksinim varsa headless yaklaşım', 'Bütçe, yönetim ve sürekli bakım ihtiyacı'],
      ]}/>
    </ShopifySection>

    <ShopifySection title="Shopify Liquid geliştirme ve tema mimarisi" intro={<>Shopify tema geliştirme hizmetinde Liquid, mağaza verilerinin sayfada gösterilmesini sağlayan şablon dilidir. HTML ve CSS görünümün, gerekli JavaScript ise etkileşimlerin hazırlanmasında kullanılır.</>} aside={<ShopifyArtwork name="liquid-render" loop className="mx-auto w-full" label="Temsili Liquid akışı: şablondaki etiketler ürün verisiyle birleşerek müşterinin gördüğü ürün sayfasını oluşturuyor" slotLabels={{ 'slot-template-label': 'Liquid şablonu', 'slot-data-label': 'Ürün verisi', 'slot-page-label': 'Ürün sayfası' }} />}>
      
      <div data-shopify-reveal-group className="mt-6 grid gap-5 md:grid-cols-3">{[
        ['Bölümler ve bloklar', 'İçerik ekibinin sık güncellediği alanları uygun section ve block yapılarıyla ele alırız. Görsel, metin ve bağlantı gibi ayarları tema editöründe erişilebilir kılacak biçimde planlarız. Her tasarım değişikliğinin kod müdahalesi gerektirmemesi için yönetilebilir alanları başlangıçta belirleriz.'],
        ['Sayfa şablonları', 'Ürün, koleksiyon ve içerik sayfalarının ihtiyaçlarını ayrı değerlendiririz. JSON şablonları ve tema bileşenleriyle, desteklenen alanlarda farklı sayfa düzenleri oluşturulabilir. Mevcut temanın yapısı ve sınırları uygulamadan önce kontrol edilir.'],
        ['Tema güncellemelerini düşünmek', 'Özel değişiklikleri ve bağımlılıkları kayıt altına alırız. Tema güncellemesinin özel kodları otomatik olarak sorunsuz koruyacağını varsaymayız; güncelleme öncesi kontrol ve test ihtiyacını ayrıca belirtiriz.'],
      ].map(([title, text]) => <article key={title} className="shopify-motion-card border-t-2 border-heritage-turquoise pt-4"><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></article>)}</div>
      <p className="mt-5"><ShopifyLink href={`${base}/ozellikler`}>Tema ve mağaza özelliklerini inceleyin</ShopifyLink></p>
    </ShopifySection>

    <ShopifySection title="Metafields ve metaobjects ile düzenli içerik" tone="ivory" intro={<>Bazı ürünlerde standart başlık ve açıklama alanları yeterli olmayabilir. Malzeme, ölçü, bakım bilgisi veya başka yapılandırılmış içerikler için ek veri alanlarını değerlendiririz.</>} aside={<ShopifyArtwork name="metafields" className="mx-auto w-full" label="Temsili metafield akışı: ürün yönetimindeki ek alanlar her ürün sayfasında aynı bilgi bloğunda gösteriliyor" slotLabels={{ 'slot-mf-label': 'Ek ürün alanları' }} />}>
      
      <div className="mt-5 space-y-3 text-sm leading-6 text-gray-600"><p><strong className="text-gray-900">Metafields:</strong> Desteklenen kayıtlara tanımlı tiplerde ek bilgi eklemek için değerlendirilir. Hangi alanın gerekli olduğu ve nerede gösterileceği birlikte belirlenir.</p><p><strong className="text-gray-900">Metaobjects:</strong> Tekrar kullanılabilen, yapılandırılmış içerik kayıtları gerektiğinde değerlendirilir. Tema üzerinden gösterim ve yönetim ihtiyaçları ayrıca planlanır.</p><p><strong className="text-gray-900">İçerik sorumluluğu:</strong> Alanları oluşturmak ile içeriklerini doldurmak ayrı işlerdir. Mevcut verilerin düzenlenmesi, toplu aktarım ve içerik üretimi teklifte açıkça belirtilir.</p></div>
      <p className="mt-4 rounded-lg border-l-2 border-heritage-turquoise bg-white p-4 text-sm leading-6 text-gray-700"><strong className="font-semibold">Örnek:</strong> Ürün sayfasında malzeme ve bakım bilgilerini standart bir düzende göstermek istiyorsanız önce ürün gruplarını ve veri tiplerini belirler, ardından ilgili şablonda gösterimi hazırlarız.</p>
    </ShopifySection>

    <ShopifySection title="Hazır uygulama mı, Shopify özel geliştirme mi?">
      <ShopifyIntro>Hazır uygulama geliştirme süresini azaltabilir; ancak abonelik, veri erişimi ve mağaza üzerindeki etkileri de değerlendirilmelidir. Özel geliştirme ise daha fazla kontrol sağlayabilse de bakım ve test sorumluluğu getirir.</ShopifyIntro>
      <ShopifyVisual name="method-options" loop className="mt-6 hidden max-w-4xl sm:block" slotLabels={{ 'slot-option-1': 'Tema ayarları', 'slot-option-2': 'Hazır uygulama', 'slot-option-3': 'Özel geliştirme' }} />
      <ShopifyTable label="Shopify uygulaması ve özel geliştirme seçenekleri" headers={['Seçenek', 'Ne zaman değerlendirilir?', 'Önceden netleştirilecek konu']} rows={[
        ['Tema veya platformun mevcut özelliği', 'İhtiyaç mevcut olanaklarla karşılanıyorsa', 'Gerekli ayarlar ve gerçek sınırlar'],
        ['Üçüncü taraf uygulama', 'Uygun ve sürdürülebilir hazır çözüm varsa', 'Abonelik, izinler, destek ve kaldırma etkisi'],
        ['Özel uygulama veya ara katman', 'Hazır çözümler iş akışını karşılamıyorsa', 'Geliştirme, barındırma, bakım ve sahiplik'],
        ['Headless ön yüz', 'Ayrı bir ön yüzü gerektiren somut ihtiyaç varsa', 'İçerik yönetimi, entegrasyon ve işletim maliyeti'],
      ]}/>
      <div className="mt-7 rounded-xl border border-heritage-sand bg-heritage-ivory p-5 sm:p-6"><h3 className="text-title font-semibold text-gray-900">Hangi çözümün gerekli olduğunu birlikte belirleyelim</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">İhtiyacınızı ve kullandığınız sistemleri paylaşın. Tema ayarıyla çözülebilen işleri, uygulama veya özel geliştirme gerektiren alanlardan ayıralım.</p><Link href="/tr/start-project?service=shopify-development" className={`mt-4 inline-flex min-h-11 items-center justify-center rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep ${shopifyFocus}`}>Shopify Teknik Kapsamını Görüşelim</Link></div>
    </ShopifySection>

    <ShopifySection title="GraphQL API ile Shopify ERP entegrasyonu ve sistem bağlantıları" tone="gray" intro={<>Shopify bağlantılarında kullanılacak API’yi işlem türüne göre belirleriz. Mağaza yönetim verilerine erişmek ile müşteriye özel bir alışveriş ön yüzü hazırlamak aynı teknik ihtiyaç değildir.</>} aside={<ShopifyVisual name="integration-hub" loop className="mx-auto w-full" label="Temsili entegrasyon akışı: Shopify mağazası ödeme, kargo, ERP ve pazar yeri sistemlerine bağlanıyor" slotLabels={{ 'slot-payment': 'Ödeme', 'slot-cargo': 'Kargo', 'slot-erp': 'Muhasebe / ERP', 'slot-marketplace': 'Pazar yeri' }} />}>
      
      <div data-shopify-reveal-group className="mt-6 grid gap-5 md:grid-cols-3">{[
        ['GraphQL Admin API', 'Ürün, stok veya sipariş gibi yönetim işlemlerinde, ilgili izinler ve kaynakların desteklediği kapsamda değerlendirilir. Erişim yetkileri, veri alanları ve API sınırları bağlantı tasarımının parçasıdır.'],
        ['Storefront API', 'Özel bir alışveriş ön yüzünün ihtiyaç duyduğu desteklenen müşteri deneyimleri için değerlendirilir. Standart bir tema projesinde sırf teknoloji listesine eklemek için kullanılmaz.'],
        ['Veri eşleştirme ve hata yönetimi', 'Hangi sistemin ana kayıt olduğu, verinin hangi yönde aktığı ve hata durumunda ne yapılacağı belirlenir. Örnek ürün, stok ve sipariş akışlarıyla kontrol yapılır. Her bağlantının anlık veya çift yönlü olduğu varsayılmaz.'],
      ].map(([title, text]) => <article key={title} className="shopify-motion-card rounded-xl border border-heritage-sand bg-white p-5"><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></article>)}</div>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">API kullanımı; Shopify erişim izinleri, ilgili servislerin olanakları ve güncel sürüm koşullarıyla sınırlıdır. ERP veya muhasebe sisteminizin API erişimi ayrıca gerekebilir.</p>
    </ShopifySection>

    <ShopifySection title="Webhook ve otomasyonlarda kontrollü veri akışı" intro={<>Sipariş veya ürün değişikliği gibi olaylara bağlı işlemlerde webhook’lar değerlendirilebilir. Bildirimin gelmesi, işlemin başarıyla tamamlandığı anlamına gelmez; alım, doğrulama ve işleme adımları birlikte ele alınır.</>} aside={<ShopifyArtwork name="webhook-flow" className="mx-auto w-full" label="Temsili webhook akışı: Shopify olayı alınıyor, kaynağı doğrulanıyor ve işleniyor; tekrar gelen bildirim ayıklanıyor, başarısız iş yeniden deneniyor" slotLabels={{ 'slot-event-label': 'Olay', 'slot-receive-label': 'Alım', 'slot-verify-label': 'Doğrulama', 'slot-process-label': 'İşleme' }} />}>
      
      <ul data-shopify-reveal-group className="mt-5 grid gap-x-8 sm:grid-cols-2">{[
        'HTTPS bildirimlerinde kaynağın doğrulanması.',
        'Aynı bildirimin yeniden gelmesi durumunda tekrar işlemi önleyen tasarım.',
        'Başarısız işlerin izlenmesi ve uygun yeniden deneme yaklaşımı.',
        'Gerekli durumlarda kayıtları karşılaştıran ek kontrol.',
        'Hassas verilerin günlüklerde gereksiz tutulmaması.',
        'API sürümü ve bağlantı değişiklikleri için bakım planı.',
      ].map(item => <li key={item} className="border-b border-heritage-sand py-3 text-sm leading-6 text-gray-700">{item}</li>)}</ul>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Otomasyon kapsamını “her şeyi bağlayalım” şeklinde değil, belirli bir tetikleyici ve sonuç üzerinden tanımlarız. Örneğin sipariş bilgisinin bir işletme sistemine aktarılması için veri alanları, durum değişiklikleri ve istisnalar yazılı hale getirilir.</p>
    </ShopifySection>

    <ShopifySection title="Ödeme ve checkout: teknik sınırları baştan belirleyelim" tone="ivory" intro={<>Ödeme sağlayıcısının uygunluğu; işletmenin kayıt ülkesi, hesap koşulları ve desteklenen bağlantı yöntemleriyle değerlendirilir. Sağlayıcı onayı veya her ödeme yöntemine erişim garanti edilmez.</>} aside={<ShopifyArtwork name="checkout-boundary" loop className="mx-auto w-full" label="Temsili sınır: mağaza teması serbestçe düzenlenebiliyor; ödeme sayfasında yalnızca desteklenen uzantı noktaları değiştirilebiliyor" slotLabels={{ 'slot-storefront-label': 'Mağaza teması', 'slot-checkout-label': 'Ödeme sayfası' }} />}>
      
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Tema düzenlemesi ile checkout geliştirmesi farklı alanlardır. Checkout’ta kullanılabilecek düzenleme ve uzantılar Shopify planına ve güncel platform kurallarına bağlıdır. Tema dosyasını değiştirebildiğimiz için ödeme adımlarında da sınırsız değişiklik yapabileceğimizi varsaymayız.</p>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">Gerekli hesaplar, test ortamları ve sağlayıcı erişimleri belirlenmeden entegrasyonu tamamlanmış saymayız.</p>
      <p className="mt-4"><ShopifyLink href="/tr/hizmetler/payment-gateway-integration">Ödeme bağlantıları için ayrı hizmet kapsamı</ShopifyLink></p>
    </ShopifySection>

    <ShopifySection title="Headless yaklaşım ne zaman anlamlı olabilir?">
      <ShopifyIntro>Headless yapıda alışveriş ön yüzü, standart tema yapısından ayrı geliştirilir. Bu yaklaşımı yalnızca projenin gereksinimleri haklı çıkarıyorsa değerlendiririz.</ShopifyIntro>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Özel kullanıcı deneyimi, birden fazla içerik kaynağı veya ayrı uygulamalarla güçlü bir bağ ihtiyacı değerlendirme nedenleri olabilir. Buna karşılık içerik önizlemesi, uygulama uyumu, analitik, SEO ve sürekli bakım için ek çalışma gerekir.</p>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">Hydrogen veya başka bir ön yüz yaklaşımı seçilmeden önce mevcut tema çözümüyle ihtiyaçların karşılanıp karşılanamadığı incelenir. Headless yapı otomatik hız artışı, SEO başarısı veya daha düşük maliyet garantisi değildir.</p>
      <p className="mt-4"><ShopifyLink href="/tr/hizmetler/headless-commerce">Headless e-ticaret hizmetini inceleyin</ShopifyLink></p>
    </ShopifySection>

    <ShopifySection title="Teknik teslimat ve bakımda neleri tanımlıyoruz?" tone="gray">
      <ShopifyIntro>Geliştirilen yapının daha sonra nasıl yönetileceği de proje kapsamına dahildir. Teslimatlar üzerinde anlaşılan işlere göre hazırlanır.</ShopifyIntro>
      <ShopifyTable label="Shopify teknik teslimat ve bakım başlıkları" headers={['Başlık', 'Teslimat veya kontrol']} rows={[
        ['Tema değişiklikleri', 'Düzenlenen şablon ve bileşenlerin listesi'], ['İçerik alanları', 'Eklenen alanlar ve yönetim notları'], ['Uygulamalar', 'Kullanılan uygulamalar, hesaplar ve ücret sorumlulukları'], ['Özel bağlantılar', 'Veri akışı, erişim ihtiyacı ve hata senaryoları'], ['Testler', 'Kontrol edilen sayfalar ve örnek iş akışları'], ['Yayın', 'Yayın adımları, açık bağımlılıklar ve geri dönüş yaklaşımı'], ['Bakım', 'Dahil olan süre ve işler; ayrıca tekliflenecek değişiklikler'],
      ]}/>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Shopify’ın barındırdığı mağaza ile özel uygulamanın veya ayrı bir ön yüzün barındırma sorumluluğu birbirinden ayrılır. Alan adı, tema lisansı, uygulama abonelikleri ve özel servis hesaplarının sahipliği başlangıçta netleştirilir.</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3"><ShopifyLink href={`${base}/surec`}>Uygulama sürecini inceleyin</ShopifyLink><ShopifyLink href={`${base}/fiyatlandirma`}>Teknik kapsamın maliyete etkisi</ShopifyLink></div>
    </ShopifySection>

    <PlatformPageLinks platform="shopify" current="technologies" tone="ivory" />

    <ShopifySection title="Teknik yaklaşım hakkında sık sorulan sorular" tone="gray">
      <div className="divide-y divide-heritage-sand border-y border-heritage-sand">{faqs.map(([question, answer]) => <article key={question} className="py-4"><h3 className="font-semibold text-gray-900">{question}</h3><p className="mt-2 max-w-4xl text-sm leading-6 text-gray-600">{answer}</p></article>)}</div>
    </ShopifySection>

    <ShopifyPageCTA title="Mağazanızın teknik ihtiyaçlarını netleştirelim" description="Mevcut mağaza adresinizi, kullandığınız sistemleri ve değiştirmek istediğiniz iş akışını paylaşın. Uygun tema yaklaşımını, gerekli bağlantıları ve bakım ihtiyaçlarını tek bir kapsam içinde değerlendirelim." primary="Shopify Teknik İhtiyacımı Paylaş" secondaryHref={base} secondary="Shopify Hizmetine Dön"/>
  </main>;
}
