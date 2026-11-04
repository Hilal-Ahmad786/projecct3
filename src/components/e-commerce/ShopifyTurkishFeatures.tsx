import Link from '@/components/IntentLink';
import type { ReactNode } from 'react';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import ShopifyArtwork from '@/components/shopify/visuals/ShopifyArtwork';
import ShopifyMotionScope from './ShopifyMotionScope';
import { ShopifyHero, ShopifySection, ShopifyTable, ShopifyVisual } from './ShopifyPagePrimitives';

const base = '/tr/hizmetler/shopify-development';
const paths = {
  overview: base,
  features: `${base}/ozellikler`,
  technologies: `${base}/teknoloji`,
  process: `${base}/surec`,
  portfolio: `${base}/portfoy`,
  pricing: `${base}/fiyatlandirma`,
  blog: `${base}/blog`,
  faq: `${base}/sss`,
  payment: '/tr/hizmetler/payment-gateway-integration',
};
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';
const linkStyle = `inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focus}`;

function Section(props: { id?: string; title: string; tone?: 'white' | 'gray' | 'ivory'; children: ReactNode }) { return <ShopifySection {...props} />; }
function Intro({ children }: { children: ReactNode }) { return <p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">{children}</p>; }
function A({ href, children, className = linkStyle }: { href: string; children: ReactNode; className?: string }) { return href.startsWith('#') ? <a href={href} className={className}>{children}</a> : <Link href={href} className={className}>{children}</Link>; }
const Table = ShopifyTable;

function StoreModulesIllustration() {
  return <figure className="m-0 w-full max-w-[26rem] rounded-2xl border border-heritage-sand bg-white p-4 shadow-sm sm:p-5">
    <div aria-hidden="true" className="grid grid-cols-2 gap-3">
      <div className="col-span-2 rounded-xl border border-gray-100 bg-heritage-ivory p-3">
        <div className="mb-2 flex items-center justify-between"><span className="h-2 w-16 rounded-full bg-heritage-turquoise-deep/70"/><span className="h-2 w-9 rounded-full bg-heritage-sand"/></div>
        <div className="grid grid-cols-[1fr_auto] items-end gap-2 rounded-lg bg-heritage-turquoise-light p-3"><div><span className="mb-2 block h-2 w-16 rounded-full bg-heritage-turquoise-deep/50"/><span className="block h-1.5 w-12 rounded-full bg-white"/></div><span className="rounded-md bg-heritage-turquoise px-2 py-1 text-[10px] font-semibold text-white">Koleksiyon</span></div>
      </div>
      <div className="rounded-xl border border-gray-100 p-3"><span className="mb-2 block text-[10px] font-semibold text-gray-700">Ürün kartı</span><div className="aspect-[4/3] rounded-lg bg-heritage-ivory"/><span className="mt-2 block h-1.5 w-4/5 rounded-full bg-heritage-sand"/><span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-heritage-turquoise/50"/></div>
      <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-gray-50 p-3"><span className="text-[10px] font-semibold text-gray-700">Sepet özeti</span><div className="space-y-2"><span className="block h-1.5 w-full rounded-full bg-heritage-sand"/><span className="block h-1.5 w-3/4 rounded-full bg-heritage-sand"/><span className="mt-3 block h-7 rounded-md bg-heritage-turquoise"/></div></div>
    </div>
    <figcaption className="mt-3 text-xs leading-5 text-gray-600">Temsili mağaza bileşenleri</figcaption>
  </figure>;
}

const faq = [
  ['Shopify temasının her alanını değiştirebilir miyiz?', 'Değiştirilebilen alanlar temanın yapısına ve Shopify’ın desteklediği geliştirme yöntemlerine bağlıdır. Checkout ve müşteri hesabı gibi alanların sınırları mağaza temasından farklı olabilir. İstediğiniz değişiklikleri önce mevcut tema ve planla karşılaştırırız.'],
  ['Ürün ve koleksiyonları daha sonra kendim güncelleyebilir miyim?', 'Yönetim panelinde düzenlenebilen alanları ve özel geliştirilen bölümlerin kullanımını teslim sırasında açıklarız. Yeni bir işlev eklemek veya veri yapısını değiştirmek için ayrıca geliştirme gerekebilir.'],
  ['Her özellik için ücretli uygulama gerekir mi?', 'Hayır. Önce Shopify’ın ve seçilen temanın sunduğu olanakları değerlendiririz. Uygulama veya özel geliştirme gerekiyorsa seçimi, düzenli maliyeti ve bakım ihtiyacını kapsam içinde belirtiriz.'],
  ['Birden fazla dil ve pazar ekleyebilir miyiz?', 'Mevcut plan, tema, uygulamalar ve hesap koşulları incelenerek dil ve pazar yapısı planlanabilir. Çeviri içeriğinin hazırlanması ve farklı para birimlerinde ödeme alma uygunluğu ayrıca değerlendirilir.'],
  ['Shopify mağazasının hızlı olacağını garanti ediyor musunuz?', 'Hızı etkileyen tema, görsel ve uygulama tercihlerini kontrol ederiz. Sonuçlar cihaz, bağlantı ve üçüncü taraf kodlardan da etkilendiği için sabit puan veya yüklenme süresi garantisi vermeyiz. Kontrol edilen sayfaları ve bulguları proje kapsamında paylaşırız.'],
  ['Özel bir ERP bağlantısı geliştirebilir misiniz?', 'Önce ilgili sistemin API olanakları, erişim izinleri ve aktarılacak veriler incelenir. Uygun çözüm bulunduğunda geliştirme, test ve bakım kapsamı ayrıca belirlenir. Ön inceleme yapılmadan her sistemle bağlantı sözü verilmez.'],
] as const;

const detailPages = [
  ['Shopify Kurulum ve Geliştirme', 'Yeni mağaza, mevcut mağaza ve geçiş ihtiyaçlarının genel hizmet kapsamı.', paths.overview],
  ['Teknolojiler', 'Tema geliştirme yaklaşımı ve teknik bağımlılıkların değerlendirilmesi.', paths.technologies],
  ['Süreç', 'Hazırlık, geliştirme, test ve yayın adımlarının planlanması.', paths.process],
  ['Portföy', 'Shopify çalışma örneklerini ve doğrulanmış proje katkılarını inceleyin.', paths.portfolio],
  ['Fiyatlandırma', 'Tasarım, veri ve entegrasyon ihtiyaçlarının maliyete etkisi.', paths.pricing],
  ['Blog', 'Shopify mağaza hazırlığı ve geliştirme kararlarına ilişkin rehberler.', paths.blog],
  ['Sık Sorulan Sorular', 'Kapsam, hesaplar ve geliştirme kararları hakkında yanıtlar.', paths.faq],
] as const;

export default function ShopifyTurkishFeatures() {
  return <main className="min-h-screen bg-white">
    <ShopifyMotionScope />
    <ShopifyHero
      crumb="Özellikler"
      eyebrow="Shopify Tema Tasarımı ve Özellikler"
      heading="Shopify Tema Tasarımı ve Mağaza Özellikleri"
      rotating={{ lead: 'Shopify', words: ['Tema Tasarımı', 'Mağaza Özellikleri', 'Entegrasyonları'] }}
      subtitle="Shopify mağazanızda hangi sayfaların, işlevlerin ve bağlantıların hazırlanacağını projenin başında netleştiriyoruz. Tema tasarımından ürün sayfası düzenine, mobil alışverişten ödeme, kargo ve muhasebe entegrasyonlarına kadar ihtiyaçları ayrı teslimatlar olarak ele alıyoruz. Her özellik her projeye dahil değildir; seçilen tema, Shopify planı, uygulamalar ve mevcut sistemler incelendikten sonra uygulanabilir kapsamı birlikte belirleriz."
      primary="Mağazam İçin Kapsam Belirle"
      secondary={{ href: '#shopify-ozellikleri', label: 'Özellikleri İncele' }}
      scope="Tema ve sayfalar · Ürün ve koleksiyonlar · Entegrasyonlar"
      scene={<StoreModulesIllustration/>}
    />

    <Section id="shopify-ozellikleri" title="İhtiyacınıza göre şekillenen Shopify mağazası" tone="gray">
      <Intro>Yeni bir Shopify e-ticaret sitesi hazırlamak, yalnızca ana sayfayı tasarlamak değildir. Ürünlerin nasıl bulunacağı, hangi bilgilerin gösterileceği ve siparişin operasyonunuza nasıl aktarılacağı da kapsamın parçasıdır.</Intro>
      <Table label="Shopify mağazası ihtiyaç ve teslimat planı" headers={['İhtiyaç', 'Planladığımız çalışma', 'Netleştirdiğimiz teslimat']} rows={[
        ['Markaya uygun görünüm', 'Tema ve bölüm düzenlerinin değerlendirilmesi', 'Onaylı sayfa şablonları ve görsel kurallar'],
        ['Ürünleri anlaşılır sunmak', 'Ürün, varyant ve koleksiyon yapısı', 'Belirlenen örnek ürünlerle kontrol edilmiş şablonlar'],
        ['Mobil alışverişi kolaylaştırmak', 'Menü, filtre ve etkileşim düzenlemeleri', 'Belirlenen ekranlarda kullanılabilirlik kontrolü'],
        ['Günlük iş yükünü azaltmak', 'Gerekli servis ve veri akışlarının değerlendirilmesi', 'Kapsamı belirlenmiş bağlantılar ve test senaryoları'],
        ['Mevcut mağazayı geliştirmek', 'Öncelikli sorunların ve bağımlılıkların incelenmesi', 'Değişiklik listesi ve uygulanacak test planı'],
      ]}/>
    </Section>

    <Section id="shopify-tema-ozellikleri" title="Shopify tema düzenleme ve sayfa tasarımı">
      <Intro>Hazır temayı olduğu gibi kullanmak ile sıfırdan tema geliştirmek arasında farklı çözümler bulunur. Shopify tema düzenleme çalışmasında önce mevcut yapıyı inceleriz. Mevcut temanın olanaklarını değerlendirir; düzenlenebilen alanlarla özel geliştirme gerektiren işleri ayırırız.</Intro>
      <ShopifyArtwork name="theme-editor" loop className="mt-6 max-w-3xl" label="Temsili Shopify tema düzenleyici: bölümler ve bloklar sıralanıyor, seçilen blok önizlemedeki alanı vurguluyor" slotLabels={{ 'slot-panel-title': 'Tema düzenleyici' }} />
      <div data-shopify-reveal-group className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[
        ['Ana sayfa ve kampanya bölümleri', 'Koleksiyon tanıtımları, kampanya alanları, ürün grupları ve güven bilgilerini ziyaretçinin karar sırasına göre yerleştiririz. Yönetilebilir bölüm yapısı, içerik ekibinizin günlük güncellemeleri yapabilmesini destekler.'],
        ['Ürün ve koleksiyon şablonları', 'Farklı ürün türleri için gerekli bilgi alanlarını belirleriz. Tek bir şablona sığmayan ihtiyaçlarda alternatif şablonları ve veri alanlarını kapsam içinde planlarız.'],
        ['Marka tutarlılığı', 'Renkler, yazı tipleri, butonlar ve görsel oranları için tutarlı kurallar oluştururuz. Lisanslı tema ve yazı tipi gerekiyorsa satın alma sorumluluğunu ve kullanım koşullarını önceden belirtiriz.'],
      ].map(([title, text]) => <article key={title} className="shopify-motion-card rounded-xl border border-heritage-sand bg-white p-5"><h3 className="text-base font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></article>)}</div>
      <p className="mt-5"><A href={paths.technologies}>Shopify geliştirmede kullandığımız teknolojiler<ArrowRightIcon className="h-4 w-4" aria-hidden="true"/></A></p>
    </Section>

    <Section title="Shopify ürün sayfası tasarımı" tone="ivory">
      <Intro>Ürün sayfası; fiyatın yanında seçenekleri, teslimat bilgisini ve müşterinin karar vermek için ihtiyaç duyduğu ayrıntıları da anlaşılır göstermelidir. Alanları gerçek ürün verinize göre tasarlarız.</Intro>
      <ShopifyVisual name="variant-picker" loop className="mt-6 max-w-xl" label="Temsili ürün sayfası: renk ve beden varyantı seçildiğinde ürün görseli değişiyor" />
      <ul data-shopify-reveal-group className="mt-5 grid gap-x-8 sm:grid-cols-2">{[
        ['Ürün bilgileri', 'Başlık, açıklama, teknik ayrıntılar ve kullanım bilgileri için düzenli içerik alanları.'],
        ['Varyant seçimi', 'Beden, renk veya diğer seçeneklerin tema ve ürün yapısıyla uyumlu gösterimi.'],
        ['Görsel sunumu', 'Ürün görselleri ve varsa videolar için uygun yerleşim ve oranlar.'],
        ['Karar destekleyici bilgiler', 'Hazırladığınız teslimat, iade ve bakım içeriklerine erişim.'],
        ['İlişkili ürünler', 'Katalog yapısı ve kullanılan araçların desteklediği ölçüde ilgili ürün önerileri.'],
      ].map(([title, text]) => <li key={title} className="border-b border-heritage-sand py-4"><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-600">{text}</p></li>)}</ul>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Ürün açıklamalarının yazılması, fotoğraf üretimi ve toplu veri temizliği ayrıca belirtilmedikçe tasarım işine dahil sayılmaz. Kaç ürünün ve kaç farklı şablonun hazırlanacağını teklifte açıkça yazarız.</p>
    </Section>

    <Section title="Koleksiyonlar, menüler ve ürün bulma deneyimi">
      <Intro>Kategori isimleri, menü hiyerarşisi ve ürün verileri birlikte çalışmalıdır. Müşterinin ürününü hangi yoldan bulacağını katalog büyüklüğüne ve ürün çeşitliliğine göre değerlendiririz.</Intro>
      <div data-shopify-reveal-group className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{[
        ['Koleksiyon yapısı', 'Ürün gruplarını, koleksiyon kurallarını ve koleksiyon sayfalarında gösterilecek bilgileri belirleriz. Çok sayıda benzer kategori açmak yerine anlaşılır bir gezinme yapısı kurmayı hedefleriz.'],
        ['Arama ve filtreleme', 'İhtiyaç duyulan filtreleri mevcut ürün alanlarıyla eşleştiririz. Arama ve filtre özellikleri seçilen tema, uygulama ve ürün verisinin desteklediği kapsamda uygulanır; eksik veriler için hazırlık listesi çıkarılır.'],
        ['Mobil menü', 'Menü derinliğini, dokunma alanlarını ve önemli sayfalara erişimi mobil ekranda kontrol ederiz. Masaüstünde çalışan bir menünün telefonda da aynı kolaylığı sunduğunu varsaymayız.'],
      ].map(([title, text]) => <article key={title} className="border-t-2 border-heritage-turquoise py-4"><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></article>)}</div>
    </Section>

    <Section title="Sepet ve ödeme adımlarında netlik" tone="gray">
      <Intro>Sepette ürün seçeneklerinin, adetlerin ve ilgili bilgilendirmelerin anlaşılır görünmesini sağlar; ödeme yolculuğunda seçilen planın izin verdiği düzenlemeleri ele alırız.</Intro>
      <ShopifyArtwork name="checkout-boundary" loop className="mt-6 max-w-3xl" label="Temsili sınır: mağaza teması serbestçe düzenlenebiliyor; ödeme sayfasında yalnızca desteklenen uzantı noktaları değiştirilebiliyor" slotLabels={{ 'slot-storefront-label': 'Mağaza teması', 'slot-checkout-label': 'Ödeme sayfası' }} />
      <div className="mt-5 space-y-4">{[
        ['Sepet alanı', 'Sepet sayfası veya çekmece düzeni, ürün güncelleme davranışları ve tema kapsamında desteklenen bilgilendirmeler incelenir.'],
        ['Ödeme görünümü', 'Marka ayarları ile daha ileri checkout özelleştirmeleri birbirinden ayrılır. Kullanılabilecek değişiklikler Shopify planına, desteklenen uzantılara ve uygulamalara bağlıdır.'],
        ['Ödeme sağlayıcısı', 'İşletmenin kayıt ülkesi, sağlayıcının hesap şartları ve entegrasyon uygunluğu kontrol edilir. Sağlayıcı onayı PakSoft’un kontrolünde değildir.'],
      ].map(([title, text]) => <p key={title} className="max-w-4xl text-sm leading-6 text-gray-600"><strong className="font-semibold text-gray-900">{title}: </strong>{text}</p>)}</div>
      <div className="mt-7 rounded-xl border border-heritage-sand bg-white p-5 sm:p-6"><h3 className="text-title font-semibold text-gray-900">Mağazanızda hangi alanların değişebileceğini netleştirelim</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">Mevcut tema ve planınızı, değiştirmek istediğiniz alanlarla birlikte paylaşın. Tema düzenlemesiyle çözülebilen işleri, uygulama veya ayrı geliştirme gerektiren ihtiyaçlardan ayıralım.</p><Link href="/tr/start-project?service=shopify-development" className={`mt-4 inline-flex min-h-11 items-center justify-center rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep ${focus}`}>Shopify İhtiyaçlarımı Paylaş<ArrowRightIcon className="ms-2 h-4 w-4" aria-hidden="true"/></Link></div>
    </Section>

    <Section title="Shopify ödeme, kargo ve muhasebe entegrasyonu">
      <Intro>Shopify entegrasyon hizmetini bir logo listesi olarak değil, aktarılacak bilgi ve sorumluluklar üzerinden planlarız. Hangi verinin, hangi yönde ve hangi sıklıkta aktarılacağı belirlenmeden bağlantıyı tamamlanmış saymayız.</Intro>
      <Table label="Shopify sistem bağlantılarının planlanması" headers={['Bağlantı alanı', 'Başlangıçta sorulacak soru', 'Kontrol örneği']} rows={[
        ['Ödeme', 'Sağlayıcı işletme ülkesini ve hesabınızı destekliyor mu?', 'Desteklenen test ortamında başarılı ve başarısız işlem'],
        ['Kargo', 'Etiket ve takip bilgisi hangi sistemde oluşacak?', 'Örnek siparişten takip bilgisine akış'],
        ['ERP veya muhasebe', 'Ürün, stok ve sipariş için ana kayıt hangi sistemde?', 'Alan eşleştirmesi ve hata durumunun kontrolü'],
        ['Pazaryeri', 'Hangi hesaplar, ürünler ve veri yönleri kullanılacak?', 'Belirlenen örneklerde stok ve sipariş akışı'],
        ['E-posta veya CRM', 'Hangi müşteri ve olay verileri gerekiyor?', 'İzin tercihlerine uygun örnek veri aktarımı'],
      ]}/>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Üçüncü taraf abonelikleri, işlem ücretleri ve özel API geliştirmeleri gerektiğinde ayrıca fiyatlandırılır. Tüm sistemlerle hazır veya ücretsiz bağlantı bulunduğunu varsaymayız.</p>
      <p className="mt-4"><A href={paths.payment}>Ödeme geçidi entegrasyonu hizmetini inceleyin<ArrowRightIcon className="h-4 w-4" aria-hidden="true"/></A></p>
    </Section>

    <Section title="Shopify çok dilli mağaza ve farklı pazarlara hazırlık" tone="ivory">
      <Intro>Farklı pazarlara satış hedefinde yalnızca dil düğmesi eklemek yeterli değildir. Yayınlanacak içerikleri, pazarları ve gerekli yerelleştirme işlerini birlikte belirleriz.</Intro>
      <ShopifyArtwork name="markets" loop className="mt-6 max-w-3xl" label="Temsili çok dilli yapı: tek Shopify mağazası farklı dil ve pazar sürümlerine ayrılıyor; ödeme uygunluğu pazar bazında kontrol ediliyor" slotLabels={{ 'slot-market-1': 'Türkçe', 'slot-market-2': 'English', 'slot-market-3': 'Deutsch' }} />
      <ul data-shopify-reveal-group className="mt-5 grid gap-x-8 sm:grid-cols-2">{[
        'Dil ve pazar yapısının mevcut Shopify ayarlarıyla değerlendirilmesi.',
        'Çevrilecek ürün, sayfa ve tema metinlerinin listelenmesi.',
        'Alan adı veya alt klasör yaklaşımının mevcut yapıya göre planlanması.',
        'Tema ve uygulama metinlerinin seçilen dillerde kontrol edilmesi.',
        'Para birimi ve ödeme seçeneklerinin hesap, ülke ve plan koşullarıyla değerlendirilmesi.',
      ].map(item => <li key={item} className="border-b border-heritage-sand py-3 text-sm leading-6 text-gray-700">{item}</li>)}</ul>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Çeviri üretimi, yerel mevzuat danışmanlığı ve her para biriminde ödeme alma garantisi bu kapsamın otomatik parçası değildir. Hedef pazarın ihtiyaçları ayrıca doğrulanır.</p>
    </Section>

    <Section title="Teknik SEO, hız ve ölçümleme hazırlığı">
      <Intro>Tema geliştirmesini sayfanın yalnızca görünümüne göre değerlendirmeyiz. İçerik alanlarının, bağlantıların ve kullanılan uygulamaların teknik etkilerini de kontrol ederiz.</Intro>
      <div data-shopify-reveal-group className="mt-6 grid gap-5 md:grid-cols-3">{[
        ['İçerik ve bağlantı düzeni', 'Sayfa başlıkları, meta açıklama alanları, başlık hiyerarşisi ve önemli iç bağlantılar belirlenen kapsamda düzenlenir. Shopify’ın ürettiği canonical, sitemap ve dil işaretlerini gereksiz kodla çoğaltmak yerine mevcut çıktıyı inceleriz.'],
        ['Hız kontrolü', 'Görsel boyutları, gereksiz uygulama kodları ve tema değişikliklerinin yüklenmeye etkileri değerlendirilir. Kontroller belirlenen sayfa örneklerinde yapılır; her cihaz ve bağlantıda sabit skor garantisi verilmez.'],
        ['Ölçümleme', 'Kullanılan analitik ve reklam araçları için gerekli olaylar ve izin tercihleri planlanır. Sepete ekleme veya satın alma gibi olayların test edilebilirliği, hesap erişimleri ve mevcut kurulumla birlikte değerlendirilir. Aynı olayın birden fazla entegrasyon tarafından tekrar gönderilmesi kontrol edilir.'],
      ].map(([title, text]) => <article key={title} className="border-t border-heritage-sand pt-4"><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></article>)}</div>
    </Section>

    <Section title="Ürün aktarımı, taşıma ve ek geliştirme kapsamı" tone="gray">
      <Intro>Her Shopify projesinin başlangıç koşulları aynı değildir. Shopify ürün aktarımı, veri aktarımı, mağaza taşıma veya özel uygulama geliştirme gibi işler kapsamda açıkça belirtilmelidir.</Intro>
      <Table label="Shopify iş kalemlerinin kapsamı" headers={['İş kalemi', 'Nasıl kapsamlandırılır?']} rows={[
        ['Tema ve sayfa düzenleri', 'Sayfa türleri, bölüm sayısı ve onaylı tasarım üzerinden'],
        ['Ürün hazırlığı', 'Ürün adedi, varyantlar ve sağlanan verinin durumu üzerinden'],
        ['Shopify mağaza taşıma', 'Kaynak sistem, veri türleri, URL’ler ve geçiş testleri üzerinden'],
        ['WooCommerce’ten Shopify’a taşıma', 'Ürün, müşteri ve sipariş verilerinin aktarılabilirliği ayrı değerlendirilerek'],
        ['Özel uygulama veya bağlantı', 'API erişimi, veri akışı, hata yönetimi ve bakım ihtiyacı üzerinden'],
        ['Devam eden destek', 'Süre, müdahale kapsamı ve yanıt koşulları ayrıca tanımlanarak'],
      ]}/>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Taşıma sırasında tüm geçmiş verilerin, şifrelerin veya uygulama özelliklerinin aynen aktarılacağını varsaymayız. Ön inceleme sonrası aktarılabilen alanları ve alternatifleri yazarız.</p>
      <p className="mt-4"><A href={paths.process}>Shopify kurulum ve taşıma sürecini inceleyin<ArrowRightIcon className="h-4 w-4" aria-hidden="true"/></A></p>
    </Section>

    <Section title="Teslimatta neleri birlikte kontrol ediyoruz?" tone="ivory">
      <Intro>Proje sonunda yalnızca sayfaları göstermek yerine üzerinde anlaştığımız kapsamı kontrol ederiz. Kabul listesi, projenizde gerçekten bulunan özelliklere göre hazırlanır.</Intro>
      <ShopifyVisual name="launch-checklist" className="mt-6 max-w-md" />
      <ol className="mt-5 grid gap-x-8 sm:grid-cols-2">{[
        'Onaylı sayfa ve şablonlar mevcut mu?',
        'Belirlenen ürün örneklerinde varyantlar ve gerekli bilgiler doğru görünüyor mu?',
        'Menü, koleksiyon ve filtre akışları belirlenen mobil ve masaüstü ekranlarda çalışıyor mu?',
        'Sepet ve desteklenen ödeme testleri tamamlandı mı?',
        'Kapsama dahil bağlantılarda örnek veri akışları kontrol edildi mi?',
        'Ölçümleme, yönlendirme ve SEO kontrollerinden hangileri tamamlandı?',
        'Yönetim için gerekli notlar, erişimler ve açık konular teslim edildi mi?',
      ].map((item, index) => <li key={item} className="flex gap-3 border-b border-heritage-sand py-3 text-sm leading-6 text-gray-700"><span className="font-semibold text-heritage-turquoise-deep">{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Testin yapılabilmesi için gerçek hesap erişimi, sağlayıcı onayı veya müşteri verisi gerekiyorsa bu bağımlılıklar teslim planında gösterilir.</p>
    </Section>

    <Section title="Shopify hizmetinin diğer ayrıntıları">
      <Intro>Özellik kapsamından sonra teknik yaklaşımı, süreci ve maliyeti ilgili sayfalardan inceleyebilirsiniz.</Intro>
      <div data-shopify-reveal-group className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{detailPages.map(([title, text, href]) => <A key={title} href={href} className={`group rounded-lg border border-heritage-sand bg-white p-4 transition-colors hover:border-heritage-turquoise ${focus}`}><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-600">{text}</p><span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-heritage-turquoise-deep">İncele<ArrowRightIcon className="h-4 w-4" aria-hidden="true"/></span></A>)}</div>
    </Section>

    <Section title="Shopify özellikleri hakkında sık sorulan sorular" tone="gray">
      <div className="divide-y divide-heritage-sand border-y border-heritage-sand">{faq.map(([question, answer]) => <div key={question} className="py-4"><h3 className="font-semibold text-gray-900">{question}</h3><p className="mt-2 max-w-4xl text-sm leading-6 text-gray-600">{answer}</p></div>)}</div>
    </Section>

    <Section title="Mağazanız için gerekli özellikleri birlikte seçelim" tone="ivory">
      <Intro>Her olası özelliği ilk sürüme eklemek yerine satışa başlamak ve operasyonu yürütmek için gereken işleri önceliklendirelim. Ürün sayınızı, hedef pazarınızı, mevcut sistemlerinizi ve varsa Shopify mağaza adresinizi paylaşın; kapsamı bu bilgilerle netleştirelim.</Intro>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row"><Link href="/tr/start-project?service=shopify-development" className={`inline-flex min-h-11 items-center justify-center rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep ${focus}`}>Shopify Projemi Paylaş<ArrowRightIcon className="ms-2 h-4 w-4" aria-hidden="true"/></Link><A href={paths.pricing} className="min-h-11 justify-center rounded-sm border border-heritage-sand bg-white px-5 py-3">Maliyeti Etkileyen Kalemleri İncele<ArrowRightIcon className="h-4 w-4" aria-hidden="true"/></A></div>
    </Section>
  </main>;
}
