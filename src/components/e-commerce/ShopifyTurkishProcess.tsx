import Link from '@/components/IntentLink';
import ShopifyArtwork from '@/components/shopify/visuals/ShopifyArtwork';
import ShopifyMotionScope from './ShopifyMotionScope';
import { ShopifyHero, ShopifyIntro, ShopifyLink, ShopifyPageCTA, ShopifySection, ShopifyTable, ShopifyVisual, shopifyFocus } from './ShopifyPagePrimitives';
import PageJumpNav from './PageJumpNav';
import PlatformPageLinks from './PlatformPageLinks';
import { ShopifyIcon } from './ShopifyMark';

const base = '/tr/hizmetler/shopify-development';

function ProcessIllustration() {
  const stages = ['Hazırlık', 'Geliştirme', 'Veri ve test', 'Yayın'];
  return <figure data-shopify-reveal className="shopify-step-rail m-0 w-full max-w-[26rem] rounded-2xl border border-heritage-sand bg-white p-4 shadow-sm sm:p-5">
    <div className="grid grid-cols-2 gap-3" aria-hidden="true">{stages.map((stage, i) => <div key={stage} className="rounded-xl border border-heritage-sand bg-heritage-ivory p-4"><span className="text-overline text-heritage-turquoise-deep">0{i + 1}</span><span className="mt-2 block text-sm font-semibold text-gray-800">{stage}</span><span className="mt-3 block h-1.5 w-12 overflow-hidden rounded-full bg-heritage-sand"><span className="shopify-step-fill block h-full rounded-full bg-heritage-turquoise" style={{ animationDelay: `${120 + i * 180}ms` }}/></span></div>)}</div>
    <figcaption className="mt-3 text-xs leading-5 text-gray-600">Temsili proje akışı</figcaption>
  </figure>;
}

const steps = [
  ['İhtiyaç ve mevcut yapı incelemesi', 'Ürün sayısını, varyant yapısını, hedef pazarları ve günlük iş akışını öğreniriz. Mevcut bir mağaza varsa tema, uygulama ve bağlantılarını değerlendiririz.', 'Mağaza adresi, öncelikler, örnek ürünler ve kullanılan sistemlerin listesi.', 'İlk kapsam, açık sorular ve teknik bağımlılıklar.'],
  ['Kapsam ve hazırlık planı', 'Sayfa türlerini, veri işlerini, bağlantıları ve sorumlulukları yazılı hale getiririz. Hazır tema, ücretli uygulama veya ayrı geliştirme gerektiren işleri ayırırız.', 'Kapsam onayı, içerik sorumluları ve gerekli hesapların belirlenmesi.', 'Teslimat listesi, hazırlık ihtiyaçları ve proje takviminin dayanakları.'],
  ['Tasarım ve mağaza geliştirme', 'Onaylanan tema yaklaşımıyla ana sayfa, ürün, koleksiyon ve ilgili içerik alanlarını hazırlarız. Görünümü gerçek ürün örnekleriyle değerlendiririz.', 'Marka dosyaları, görseller, metinler ve aşama geri bildirimleri.', 'İncelenebilir mağaza taslağı ve onay bekleyen noktalar.'],
  ['Veri ve bağlantı çalışmaları', 'Kapsama dahil ürün ve diğer kayıtlar için alan eşleştirmesi yapılır. Gerekli uygulama ve bağlantılar, erişim ve hesap koşulları sağlandığında hazırlanır.', 'Uygun veri dosyaları, yetkili erişimler ve sağlayıcı hesapları.', 'Örneklerle doğrulanmış aktarım ve bağlantı sonuçları; varsa istisnalar.'],
  ['Test ve kabul', 'Belirlenen cihazlarda sayfaları ve alışveriş akışını kontrol ederiz. Ürün seçenekleri, sepet, desteklenen ödeme testleri ve ilgili operasyon adımları birlikte değerlendirilir.', 'İçerik, fiyat, vergi ve operasyon ayarlarının yetkili kişilerce kontrolü.', 'Kabul listesi, düzeltilen konular ve yayına engel açık maddeler.'],
  ['Yayın ve devir', 'Yayın öncesi son kontrol yapılır. Kapsamdaki alan adı, erişim ve geçiş adımları onaylanan plana göre uygulanır. Yönetim notları ve devam eden sorumluluklar teslim edilir.', 'Yayın onayı ve ilgili hesaplarda yetkili kişinin ulaşılabilir olması.', 'Yayın kontrolü, teslim notları ve kararlaştırılmış takip kapsamı.'],
] as const;


const faqs = [
  ['Shopify mağazası kurulumu ne kadar sürer?', 'Süre; tasarım, ürün verisi, bağlantılar ve içeriklerin hazır olmasına bağlıdır. İlk inceleme sonrasında teslimatları ve dış bağımlılıkları içeren bir takvim hazırlanır.'],
  ['Taşıma sırasında mevcut mağazam açık kalabilir mi?', 'Hazırlık aşamasında mevcut mağazanın çalışmaya devam etmesi planlanabilir. Son veri işlemleri ve yayın geçişinde satış operasyonuna etkiler ayrıca değerlendirilir; kesintisiz geçiş garantisi verilmez.'],
  ['WooCommerce müşteri şifreleri de aktarılır mı?', 'Hayır. Mevcut şifreler taşınmaz. Seçilen Shopify hesap yapısına göre müşterilerin giriş yöntemi ve gerekli bilgilendirme planlanır.'],
  ['Geçmiş siparişleri taşıyabilir miyiz?', 'Kaynak veriler, uygun aktarım yöntemi ve hedef sistemin desteklediği alanlar incelenir. Sipariş geçmişi aktarımı ayrıca kapsamlandırılır; ürün aktarımına otomatik dahil değildir.'],
  ['SEO sıralamalarım korunur mu?', 'URL eşleştirmesi, yönlendirmeler ve önemli içerik kontrolleri geçiş risklerini azaltmayı hedefler. Arama sıralamalarının veya trafiğin aynı kalacağı garanti edilemez.'],
  ['Yayın sonrasında destek dahil mi?', 'Destek süresi, kapsamdaki düzeltmeler ve yeni geliştirmelerin nasıl ele alınacağı teklifte belirtilir. Sınırsız veya süresiz destek varsayılmaz.'],
] as const;

export default function ShopifyTurkishProcess() {
  return <main className="min-h-screen bg-white">
    <ShopifyMotionScope />
    <ShopifyHero
      crumb="Süreç"
      eyebrow="Shopify Proje Süreci"
      heading="Shopify Kurulum ve Mağaza Taşıma Süreci"
      rotating={{ lead: 'Shopify', words: ['Kurulum Süreci', 'Mağaza Taşıma', 'WooCommerce Geçişi'] }}
      subtitle="Yeni Shopify mağazanızı veya mevcut sitenizden geçişi; kapsam, içerik, veri ve yayın adımlarıyla birlikte planlıyoruz. Her aşamada sizden gereken bilgileri, hazırlayacağımız işleri ve birlikte kontrol edeceğimiz sonuçları netleştiriyoruz. Shopify mağaza taşıma projelerinde yalnız ürün aktarımını değil; müşteri hesaplarını, eski bağlantıları, devam eden siparişleri ve dış sistemleri de değerlendiririz."
      primary="Shopify Projemi Planlayalım"
      secondary={{ href: '#shopify-surec-adimlari', label: 'Süreç Adımlarını Gör' }}
      scope="Hazırlık · Geliştirme · Veri ve test · Yayın"
      scene={<ProcessIllustration/>}
    />

    <PageJumpNav items={[{ href: '#yeni-shopify-magazasi-mi-shopify-gecis-hizmeti-mi', label: 'Kurulum mu, geçiş mi?' }, { href: '#shopify-surec-adimlari', label: 'Altı adım' }, { href: '#baslamadan-once-neleri-hazirlamalisiniz', label: 'Hazırlık' }, { href: '#shopify-magaza-tasima', label: 'Mağaza taşıma' }, { href: '#woocommerce-shopify-tasima', label: 'WooCommerce geçişi' }, { href: '#eski-url-ler-ve-seo-gecis-plani', label: 'URL ve SEO' }, { href: '#yayin-oncesi-alisveris-ve-operasyon-testleri', label: 'Testler' }, { href: '#shopify-sureci-hakkinda-sik-sorulan-sorular', label: 'SSS' }]} mark={<ShopifyIcon size={14} />} />
    <ShopifySection title="Yeni Shopify mağazası mı, Shopify geçiş hizmeti mi?" tone="gray">
      <ShopifyIntro>Başlangıç durumunuz, proje planını değiştirir. Shopify ile site kurma çalışmasında içerik hazırlığı öne çıkarken, çalışan bir mağazadan geçişte mevcut veriler ve satış operasyonu ayrıca ele alınır.</ShopifyIntro>
      <ShopifyTable label="Shopify başlangıç durumuna göre ilk değerlendirme" headers={['Başlangıç durumunuz', 'İlk değerlendirme', 'Planın belirleyici konusu']} rows={[
        ['Yeni mağaza açılışı', 'Ürünler, marka, içerikler ve hesaplar', 'Satışa başlamak için gerekli ilk kapsam'],
        ['Mevcut Shopify mağazası', 'Tema, uygulamalar ve değiştirilecek alanlar', 'Çalışan yapıya etkiler ve test yaklaşımı'],
        ['Başka altyapıdan Shopify’a geçiş', 'Veri kaynakları, URL’ler ve bağlantılar', 'Aktarılabilirlik ve geçiş günü planı'],
        ['WooCommerce’ten Shopify’a geçiş', 'Ürün, varyant, müşteri, sipariş ve eklentiler', 'Veri eşleştirmesi ve işlev karşılıkları'],
      ]}/>
    </ShopifySection>

    <ShopifySection id="shopify-surec-adimlari" title="Shopify mağaza kurulumu altı adımda nasıl ilerler?">
      <ShopifyIntro>Her aşamada PakSoft’un çalışmasını, sizden gereken girdileri ve birlikte kontrol edeceğimiz çıktıyı netleştiririz.</ShopifyIntro>
      <ShopifyVisual name="stage-path" className="mt-8 hidden lg:block" slotLabels={{ 'slot-stage-1': 'İnceleme', 'slot-stage-2': 'Kapsam', 'slot-stage-3': 'Tasarım', 'slot-stage-4': 'Veri ve bağlantı', 'slot-stage-5': 'Test ve kabul', 'slot-stage-6': 'Yayın ve devir' }} />
      <ol data-shopify-reveal-group className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{steps.map(([title, description, input, output], index) => <li key={title} className="shopify-motion-card h-full rounded-xl border border-heritage-sand bg-white p-5"><div className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-heritage-turquoise-light text-sm font-semibold text-heritage-turquoise-deep">{String(index + 1).padStart(2, '0')}</span><h3 className="text-base font-semibold leading-snug text-gray-900">{title}</h3></div><p className="mt-4 text-sm leading-6 text-gray-600">{description}</p><p className="mt-4 text-sm leading-6 text-gray-700"><strong className="font-semibold text-gray-900">Sizden gereken: </strong>{input}</p><p className="mt-2 text-sm leading-6 text-gray-700"><strong className="font-semibold text-gray-900">Çıktı: </strong>{output}</p></li>)}</ol>
    </ShopifySection>

    <ShopifySection title="Başlamadan önce neleri hazırlamalısınız?" tone="ivory">
      <ShopifyIntro>Hazırlıkların eksikliği yalnız takvimi değil, tasarım ve bağlantı kararlarını da etkiler. Elinizde olmayan bilgileri başlangıç listesine ekleyelim.</ShopifyIntro>
      <ShopifyTable label="Shopify projesi öncesi hazırlıklar" headers={['Hazırlık', 'Neden gerekiyor?', 'Sorumluluk']} rows={[
        ['Logo, renkler ve marka dosyaları', 'Tasarım kararlarının tutarlı olması', 'Müşteri sağlar; kullanım uygunluğu kontrol edilir'],
        ['Ürün ve varyant verileri', 'Ürün yapısı ve aktarım planı', 'Kaynak veriyi müşteri sağlar; düzenleme kapsamı ayrıca belirlenir'],
        ['Görseller ve sayfa içerikleri', 'Gerçek içerikle tasarım ve yayın', 'Üretim veya düzenleme dahilse teklifte yazılır'],
        ['Alan adı ve gerekli hesaplar', 'Yayın ve bağlantılar', 'Hesap sahibi müşteri; erişimler yetkilendirilir'],
        ['Ödeme ve kargo bilgileri', 'Uygun servis ve testlerin planlanması', 'Sağlayıcı onayları müşteri/sağlayıcı sürecine bağlıdır'],
        ['Vergi ve hukuki metinler', 'İşletmeye uygun ayar ve bilgilendirme', 'Müşterinin yetkili danışmanlarınca doğrulanır'],
        ['Mevcut sistem ve uygulamalar', 'Taşıma ve entegrasyon bağımlılıkları', 'Müşteri listeler; teknik inceleme kapsamda yapılır'],
      ]}/>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Şifrelerinizi açık mesajla paylaşmak yerine desteklenen yetkilendirme yöntemlerini kullanırız. Gerekli erişimin türü, yapılacak işe göre belirlenir.</p>
    </ShopifySection>

    <ShopifySection id="shopify-magaza-tasima" title="Shopify mağaza taşıma hizmeti: önce veri haritası" intro={<>Taşımaya başlamadan önce hangi kayıtların aktarılacağına ve Shopify’daki karşılıklarına karar veririz. Kaynak sistemde bulunması, her verinin aynı biçimde aktarılabileceği anlamına gelmez.</>}>
      
      <ShopifyTable label="Shopify mağaza taşıma veri haritası" headers={['Veri alanı', 'İncelenen konu', 'Kabul kontrolü']} rows={[
        ['Ürün ve varyantlar', 'Seçenekler, tanımlayıcılar ve alan eşleştirmesi', 'Sayıların yanında örnek ürün ayrıntıları'],
        ['Görseller', 'Dosyalara erişim ve ürünlerle ilişkilendirme', 'Örnek ürünlerde görünüm ve sıralama'],
        ['Koleksiyonlar', 'Eski kategori yapısının Shopify karşılığı', 'Menü ve ürün gruplarının kontrolü'],
        ['Müşteriler', 'Aktarılabilir alanlar ve hesap yaklaşımı', 'Örnek kayıtlar ve giriş yöntemi'],
        ['Geçmiş siparişler', 'Uygun aktarım yöntemi ve desteklenen alanlar', 'Örnek siparişlerde durum ve ilişki kontrolü'],
        ['Yorumlar ve ek içerik', 'Kaynak dışa aktarımı ve hedef uygulama', 'Uygunluk, ilişkilendirme ve gösterim'],
        ['URL’ler', 'Eski sayfanın ilgili yeni karşılığı', 'Yönlendirme ve hedef sayfa kontrolü'],
      ]}/>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Aktarım öncesi kapsam, deneme verisi ve mevcut kayıtlara etkiler belirlenir. Toplu işlem yapılacaksa yedekler, erişimler ve tekrar denemede kopya kayıt riskleri planlanır. Tüm geçmiş verilerin eksiksiz ve aynı biçimde aktarılacağı garantisi verilmez.</p>
    </ShopifySection>

    <ShopifySection id="woocommerce-shopify-tasima" title="WooCommerce Shopify taşıma: WordPress mağazalarında kontrol noktaları" tone="gray" intro={<>WooCommerce Shopify taşıma çalışmasında ürün verileri kadar kullanılan eklentiler ve özel alanlar da önemlidir. Mevcut sitedeki her özelliğin Shopify’da birebir karşılığı bulunmayabilir.</>} aside={<ShopifyArtwork name="woo-shopify-bridge" loop className="mx-auto w-full" label="Temsili WooCommerce Shopify geçişi: ürün, varyant, görsel ve URL kayıtları eşleştirilerek aktarılıyor; müşteri şifreleri taşınmıyor, eklentiler uygulama veya özel geliştirmeyle karşılanıyor" slotLabels={{ 'slot-source-label': 'WooCommerce mağazası', 'slot-plugin-label': 'Eklenti', 'slot-app-label': 'Uygulama' }} />}>
      
      <div data-shopify-reveal-group className="mt-6 grid gap-5 sm:grid-cols-2">{[
        ['Ürün ve eklenti alanları', 'Varyantlar, ek ürün seçenekleri ve eklentilere ait alanlar incelenir. Standart ürün verisiyle taşınabilen bilgiler ile uygulama veya özel geliştirme gerektiren bilgiler ayrılır.'],
        ['Müşteri hesapları', 'Mevcut müşteri şifreleri taşınmaz. Seçilen Shopify müşteri hesabı türüne göre giriş veya yeniden hesap etkinleştirme yaklaşımı planlanır. Bu değişikliğin müşteriye nasıl anlatılacağı da geçiş hazırlığına eklenir.'],
        ['Sipariş geçmişi ve yorumlar', 'Geçmiş siparişlerin aktarımı ürün CSV’siyle aynı işlem değildir; uygun uygulama veya başka desteklenen yöntem ayrıca değerlendirilir. Yorumlar için de kaynak veriye erişim ve hedef çözüm kontrol edilir.'],
        ['Abonelikler ve devam eden işler', 'Abonelikler, açık siparişler, hediye kartları veya özel indirim kuralları varsa ayrı listelenir. Çalışan satış operasyonunun hangi sistemde sürdürüleceği ve geçişte oluşabilecek farklar önceden belirlenir.'],
      ].map(([title, text]) => <article key={title} className="border-l-2 border-heritage-turquoise pl-4"><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></article>)}</div>
      <div className="mt-7 rounded-xl border border-heritage-sand bg-white p-5 sm:p-6"><h3 className="text-title font-semibold text-gray-900">WooCommerce mağazanızın geçiş kapsamını çıkaralım</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">Mevcut adresinizi, ürün yapınızı ve önemli eklentilerinizi paylaşın. Taşınabilen kayıtları, yeniden kurulacak işlevleri ve ek inceleme gerektiren konuları ayıralım.</p><Link href="/tr/start-project?service=shopify-development" className={`mt-4 inline-flex min-h-11 items-center justify-center rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep ${shopifyFocus}`}>Mağaza Taşıma İhtiyacımı Paylaş</Link></div>
    </ShopifySection>

    <ShopifySection title="Eski URL’ler ve SEO geçiş planı" intro={<>Taşıma sırasında sayfa adresleri değişebilir. Eski ürün, kategori ve içerik adreslerini ilgili yeni sayfalarla eşleştirerek gereksiz kırık bağlantıları azaltmayı hedefleriz.</>} aside={<ShopifyArtwork name="redirect-map" className="mx-auto w-full" label="Temsili yönlendirme haritası: her eski URL anlamca karşılık gelen yeni sayfaya yönleniyor; tüm adresleri ana sayfaya göndermek yapılmıyor" slotLabels={{ 'slot-old-label': 'Eski URL', 'slot-new-label': 'Yeni URL' }} />}>
      
      <ul data-shopify-reveal-group className="mt-5 space-y-3">{[
        'Mevcut URL listesi ve erişim varsa organik trafik alan önemli sayfalar belirlenir.',
        'Eski adresler, anlam bakımından karşılık gelen yeni sayfalara eşleştirilir.',
        'Desteklenen yönlendirmeler hazırlanır; tüm eski adresler topluca ana sayfaya gönderilmez.',
        'Önemli iç bağlantılar, başlıklar ve açıklamalar kapsam içinde incelenir.',
        'Yayında örnek URL’lerin hedefleri ve yönlendirme zincirleri kontrol edilir.',
        'Erişim ve takip kapsamı varsa Search Console üzerinden tarama ve indeksleme bulguları izlenir.',
      ].map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-gray-700"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-heritage-turquoise"/>{item}</li>)}</ul>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Yönlendirme planı sıralamaların veya trafiğin değişmeyeceği garantisi değildir. Shopify’ın URL ve yönlendirme sınırları ile kaynak sitenin yapısı ayrıca değerlendirilir.</p>
    </ShopifySection>

    <ShopifySection title="Yayın öncesi alışveriş ve operasyon testleri" tone="ivory">
      <ShopifyIntro>Tasarım onayı ile alışveriş akışının çalışması farklı kontrollerdir. Testleri projenizde bulunan işlevlere ve sağlayıcının desteklediği yöntemlere göre hazırlarız.</ShopifyIntro>
      <ShopifyTable label="Shopify yayın öncesi test senaryoları" headers={['Senaryo', 'Kontrol edilen konu']} rows={[
        ['Ürün seçimi', 'Varyant, fiyat ve ürün bilgilerinin tutarlılığı'], ['Mobil gezinme', 'Menü, koleksiyon, arama ve dokunma alanları'], ['Sepet', 'Adet değiştirme, ürün kaldırma ve bilgi gösterimi'], ['Ödeme', 'Desteklenen ortamda başarılı ve başarısız işlem'], ['Kargo ve vergi ayarları', 'Belirlenen örnek adreslerde beklenen sonuç'], ['Sipariş işleme', 'Bildirim, stok ve ilgili bağlantılara aktarım'], ['Ölçümleme', 'Kapsamdaki olayların ve olası tekrarların kontrolü'], ['İçerik ve erişim', 'Önemli sayfalar, bağlantılar ve yayın görünürlüğü'],
      ]}/>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Gerçek işlem gerektiren kontrollerde tutar, olası ücret ve iade yöntemi önceden kararlaştırılır. Sağlayıcının test modu destekleniyorsa uygun test yöntemi kullanılır. Vergi ve ticari ayarların doğruluğu işletmenin yetkili kişileri tarafından onaylanır.</p>
    </ShopifySection>

    <ShopifySection title="Geçiş günü ve yayın sonrası ilk kontroller">
      <ShopifyIntro>Çalışan bir mağaza taşınırken eski sistemde yeni sipariş ve ürün değişikliği oluşmaya devam edebilir. Son veri eşitlemesi ve yayın zamanını bu duruma göre planlarız.</ShopifyIntro>
      <div className="mt-6 space-y-4">{[
        ['Yayın öncesi', 'Açık maddeler, erişimler, son veri işlemleri ve onay sorumluları kontrol edilir. Eski ve yeni sistemde hangi işlemlerin devam edeceği belirlenir.'],
        ['Yayın sırasında', 'Planlanan alan adı/DNS ve mağaza erişim adımları uygulanır. Ödeme test ayarlarının durumu ve müşterinin mağazaya erişimi kontrol edilir. Alan adını bağlamak, kayıt kuruluşunu taşımakla aynı işlem değildir; gerekli yöntem seçilir.'],
        ['Yayın sonrası', 'Önemli sayfalar, sipariş yolu, bağlantılar ve yönlendirme örnekleri yeniden kontrol edilir. Destek süresi ve izlenecek konular sözleşmedeki kapsamı izler.'],
        ['Geri dönüş yaklaşımı', 'Ciddi bir sorun halinde kimlerin karar vereceği, hangi adımların geri alınabileceği ve oluşan yeni siparişlerin nasıl ele alınacağı önceden belirlenir. Sıfır kesinti veya tek tıklamayla sorunsuz geri dönüş sözü verilmez.'],
      ].map(([title, text]) => <p key={title} className="max-w-4xl text-sm leading-6 text-gray-600"><strong className="font-semibold text-gray-900">{title}: </strong>{text}</p>)}</div>
    </ShopifySection>

    <ShopifySection title="Takvimi ve teslimatı neler belirler?" tone="gray">
      <ShopifyIntro>Süre; yalnız sayfa sayısına göre belirlenmez. Veri hazırlığı, tema değişiklikleri, hesap onayları ve geri bildirimlerin tamamlanması da takvimi etkiler.</ShopifyIntro>
      <ShopifyTable label="Shopify proje takvimini etkileyen etkenler" headers={['Etken', 'Plan üzerindeki etkisi']} rows={[
        ['Ürün ve varyant karmaşıklığı', 'Veri eşleştirmesi ve örnek kontrol ihtiyacı'], ['Özel tasarım ve şablonlar', 'Geliştirme ve tasarım onayı adımları'], ['Entegrasyonlar', 'API, sağlayıcı ve test bağımlılıkları'], ['Çok dilli içerik', 'Çeviri hazırlığı ve dil kontrolleri'], ['Geçmiş veri aktarımı', 'Yöntem seçimi ve doğrulama kapsamı'], ['İçerik ve müşteri onayları', 'Sonraki aşamaya geçiş koşulları'],
      ]}/>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">İlk inceleme sonrası kapsam ve bağımlılıklara dayalı bir plan çıkarırız. İnceleme yapılmadan bütün projeler için aynı teslim süresini vermeyiz.</p>
      <p className="mt-4"><ShopifyLink href={`${base}/fiyatlandirma`}>Kapsamın fiyatlandırmaya etkisini inceleyin</ShopifyLink></p>
    </ShopifySection>

    <PlatformPageLinks platform="shopify" current="process" tone="ivory" />

    <ShopifySection title="Shopify süreci hakkında sık sorulan sorular" tone="gray">
      <div className="divide-y divide-heritage-sand border-y border-heritage-sand">{faqs.map(([question, answer]) => <article key={question} className="py-4"><h3 className="font-semibold text-gray-900">{question}</h3><p className="mt-2 max-w-4xl text-sm leading-6 text-gray-600">{answer}</p></article>)}</div>
    </ShopifySection>

    <ShopifyPageCTA title="Shopify projenizin ilk adımını belirleyelim" description="Yeni mağaza kuracak veya mevcut sitenizi taşıyacaksanız; ürün sayınızı, mevcut adresinizi ve kullandığınız sistemleri paylaşın. Hazırlıkları, veri işlerini ve yayın adımlarını birlikte netleştirelim." primary="Kurulum veya Taşıma Projemi Paylaş" secondaryHref={base} secondary="Shopify Hizmetine Dön"/>
  </main>;
}
