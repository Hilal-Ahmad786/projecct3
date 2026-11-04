import Image from 'next/image';
import Link from '@/components/IntentLink';
import InternalPageHero from '@/components/services/InternalPageHero';
import ShopifyMotionScope from './ShopifyMotionScope';
import { ShopifyHeroScene, ShopifyIcon, ShopifyPlatformNote } from './ShopifyMark';
import { ShopifyIntro, ShopifyLink, ShopifyPageCTA, ShopifySection, ShopifyTable, ShopifyVisual, shopifyFocus } from './ShopifyPagePrimitives';
import PageJumpNav from './PageJumpNav';
import PlatformPageLinks from './PlatformPageLinks';

const base = '/tr/hizmetler/shopify-development';
export const shopifyPortfolioMeta = {
  title: 'Shopify ile Yapılmış Siteler ve Projeler | PakSoft',
  description: 'Shopify ile yapılmış siteleri tasarım, ürün sunumu ve proje kapsamıyla inceleyin. PakSoft’un doğrulanmış çalışmalarını kendi mağaza ihtiyaçlarınızla karşılaştırın.',
};

const evaluation = [
  ['Ürün sunumu', 'Ürün sayfası seçenekleri ve gerekli bilgileri açık gösteriyor mu? Görsel yerleşimi, varyant seçimi ve açıklama düzeninin kendi ürünlerinizle çalışıp çalışmayacağını düşünün.'],
  ['Koleksiyon ve gezinme', 'Ürünlere menüden, aramadan ve koleksiyonlardan ulaşmak kolay mı? Geniş kataloglarda ek filtre ve veri hazırlığı gerekebilir.'],
  ['Mobil kullanım', 'Menü, ürün görselleri ve sepete ekleme alanını telefonda inceleyin. Yalnız masaüstü ekran görüntüsü üzerinden karar vermeyin.'],
  ['İçerik yönetimi', 'Kampanya, koleksiyon veya ürün bilgileri ne sıklıkla değişecek? Ekibinizin hangi alanları yönetmesi gerektiğini belirleyin.'],
  ['İşlev ve bağlantılar', 'Bir özellik tema, uygulama veya özel geliştirme ile sağlanıyor olabilir. Yalnız ön yüzden kullanılan çözümü ve maliyeti kesin kabul etmeyin.'],
  ['Proje kapsamı', 'Proje ekibinin hangi işleri yaptığını kontrol edin. Tam mağaza kurulumu ile belirli bir sayfa üzerinde çalışma aynı teslimat değildir.'],
] as const;

const faqs = [
  ['Shopify ile yapılmış bir siteyi kendi markama uyarlayabilir miyim?', 'Beğendiğiniz örnekteki düzen ve işlevleri inceleyip kendi ürün ve marka ihtiyaçlarınızla karşılaştırabiliriz. Tema, lisans ve teknik koşullar değerlendirilir; başka markanın içerik veya tasarımı birebir kopyalanmaz.'],
  ['Aynı görünen iki Shopify projesi neden farklı maliyette olabilir?', 'Ürün verileri, sayfa türleri, uygulamalar, bağlantılar ve taşıma işleri görünümden bağımsız olarak değişebilir. Maliyet yalnız ana sayfa ekran görüntüsüne göre belirlenmez.'],
  ['Canlı site sonradan değişirse portföydeki görünüm farklı olabilir mi?', 'Evet. Mağaza sahibi yayın sonrası içerik veya tasarım değişiklikleri yapabilir. Bu nedenle proje kapsamı ve varsa ekran görüntüsünün ait olduğu dönem ayrıca belirtilir.'],
  ['Bir özelliğin tema mı uygulama mı olduğunu anlayabilir miyim?', 'Ön yüzden bakmak her zaman yeterli değildir. Projenizde benzer işlev gerektiğinde mevcut tema olanaklarını, uygun uygulamaları ve özel geliştirme ihtiyacını ayrıca değerlendiririz.'],
  ['Kendi mağazamı taşımak için de örnek paylaşabilir miyim?', 'Evet. Mevcut adresinizi, beğendiğiniz alanları ve taşımak istediğiniz verileri paylaşabilirsiniz. Tasarım beklentisi ile veri aktarımının kapsamı ayrı belirlenir.'],
] as const;

export default function ShopifyTurkishPortfolio() {
  return <main className="min-h-screen bg-white">
    <ShopifyMotionScope />
    <InternalPageHero serviceName="Shopify Geliştirme" accentWord="Shopify Portföy" eyebrowNormalCase heading="Shopify ile Yapılmış Siteler ve Proje Çalışmaları" subtitle="Shopify ile yapılmış siteleri yalnız ana sayfa görünümüne göre değerlendirmeyin. Ürün sunumunu, mobil gezinmeyi ve projede hangi işlerin gerçekleştirildiğini birlikte inceleyin. Bu sayfadaki çalışmada PakSoft’un üstlendiği kapsamı ayrıca gösteriyoruz; örneği kendi ürün ve operasyon ihtiyaçlarınızla karşılaştırabilirsiniz." crumbs={[{label:'Ana Sayfa',href:'/'},{label:'Hizmetler',href:'/services'},{label:'Shopify Geliştirme',href:base},{label:'Portföy'}]} eyebrowIcon={<ShopifyIcon size={26} />} actions={<><Link href="/tr/start-project?service=shopify-development" className={`inline-flex min-h-11 items-center justify-center rounded-sm bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700 ${shopifyFocus}`}>Benzer Bir Shopify Projesi Planlayalım</Link><a href="#shopify-projeleri" className={`inline-flex min-h-11 items-center justify-center rounded-sm border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-heritage-turquoise ${shopifyFocus}`}>Projeleri İncele</a></>} footnote={<div className="space-y-3"><p className="text-sm font-medium text-gray-600">Ürün sunumu · Kategori gezinmesi · Talep akışı</p><ShopifyPlatformNote /></div>} scene={<ShopifyHeroScene><div aria-label="Shopify portföy inceleme başlıkları" className="grid w-full max-w-md grid-cols-2 gap-3 rounded-2xl border border-heritage-sand bg-white p-5 shadow-sm">{[['01','Ürün sunumu'],['02','Mobil gezinme'],['03','Proje kapsamı'],['04','İşlevler']].map(([n,label])=><div key={n} className="rounded-xl border border-heritage-sand bg-heritage-ivory p-4"><span className="text-xs text-heritage-turquoise-deep">{n}</span><strong className="mt-2 block text-sm text-gray-900">{label}</strong></div>)}</div></ShopifyHeroScene>} rotating={{ lead: 'Shopify ile', words: ['Yapılmış Siteler', 'Mağaza Örnekleri', 'Proje Çalışmaları'] }} />

    <PageJumpNav items={[{ href: '#shopify-projeleri', label: 'Projeler' }, { href: '#shopify-web-sitesi-orneklerinde-bakmaniz-gereken-alti-nokta', label: 'Örneklerde bakılacaklar' }, { href: '#gorunum-kapsam-ve-sonuc-birbirinden-farklidir', label: 'Kapsam ve sonuç' }, { href: '#proje-gorusmesine-gelirken-kisa-bir-ihtiyac-listesi-hazirlay', label: 'İhtiyaç listesi' }, { href: '#benzer-bir-shopify-projesini-nasil-planliyoruz', label: 'Planlama' }, { href: '#shopify-portfoyu-hakkinda-sik-sorulan-sorular', label: 'SSS' }]} mark={<ShopifyIcon size={14} />} />
    <ShopifySection id="shopify-projeleri" title="Shopify ile yapılmış siteler: proje çalışmalarımız" tone="gray">
      <ShopifyIntro>Bu projede görünen mağaza ile PakSoft’un gerçekleştirdiği işler birlikte açıklanıyor. Kategori odaklı ürün sunumu, kampanya alanları ve keşif talebi akışını inceleyebilirsiniz.</ShopifyIntro>
      <article data-shopify-reveal className="shopify-motion-card mt-7 overflow-hidden rounded-2xl border border-heritage-sand bg-white shadow-sm">
        <Link href="/tr/projeler/termopazar" className={`group relative block aspect-[1366/850] overflow-hidden bg-heritage-ivory ${shopifyFocus}`} aria-label="Termopazar Shopify proje ayrıntısını inceleyin">
          <Image src="/images/portfolio/termopazar.png" alt="Termopazar Shopify mağazasında ısıtma ve iklimlendirme ürünlerinin sunumu" fill priority sizes="(max-width: 768px) 100vw, 1100px" className="object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"/>
        </Link>
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><p className="text-overline text-heritage-turquoise-deep">Perakende · Isıtma ve iklimlendirme · Shopify</p><h3 className="mt-2 text-title font-semibold text-gray-950">Termopazar</h3><p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700"><strong>İşletmenin ihtiyacı:</strong> Isıtma ve iklimlendirme ürünlerini çevrimiçi sunarken ziyaretçilerin ürün kategorilerini bulmasını ve keşif talebi oluşturmasını kolaylaştırmak.</p><p className="mt-2 max-w-3xl text-sm leading-6 text-gray-700"><strong>PakSoft’un katkısı:</strong> Shopify mağazasını ürün kategorilerine göre düzenlemek, kampanya alanlarını ve ücretsiz keşif talebi çağrısını hazırlamak. Proje kaydında Google Tag Manager, Google Analytics, Google Ads ve Meta Pixel de listeleniyor.</p><p className="mt-2 text-sm leading-6 text-gray-700"><strong>Öne çıkan yolculuk:</strong> Kategori keşfi → ürün bilgisi → ücretsiz keşif talebi.</p></div>
          <Link href="/tr/projeler/termopazar" className={shopifyFocus + ' inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline'}>Proje kapsamını inceleyin <span aria-hidden="true">→</span></Link>
        </div>
      </article>
    </ShopifySection>

    <ShopifySection title="Shopify web sitesi örneklerinde bakmanız gereken altı nokta">
      <ShopifyIntro>Bir örneği beğenmeniz, aynı yapının sizin mağazanız için de uygun olacağı anlamına gelmez. Katalog büyüklüğünüzü, ürün bilgilerinizi ve yönetim ihtiyaçlarınızı birlikte değerlendirin.</ShopifyIntro>
      <ol data-shopify-reveal-group className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{evaluation.map(([title,text],i)=><li key={title} className="shopify-motion-card rounded-xl border border-heritage-sand bg-white p-5"><span className="text-xs font-semibold text-heritage-turquoise-deep">0{i+1}</span><h3 className="mt-2 font-semibold text-gray-950">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></li>)}</ol>
    </ShopifySection>

    <ShopifySection title="Görünüm, kapsam ve sonuç birbirinden farklıdır" tone="ivory">
      <ShopifyIntro>Bir mağazanın görünümü, arka plandaki iş akışını veya ticari sonuçlarını tek başına göstermez. Proje örneklerini incelerken bu ayrımı yapın.</ShopifyIntro>
      <ShopifyTable label="Shopify proje örneklerinde görülen ve kanıtlanmayan bilgiler" headers={['İncelediğiniz şey','Size ne anlatır?','Tek başına neyi kanıtlamaz?']} rows={[
        ['Ana sayfa ekran görüntüsü','Görsel hiyerarşi ve marka sunumu','Tüm sayfaların kalitesi veya satış sonucu'],['Ürün sayfası','Ürün bilgisinin ve seçeneklerin sunumu','Her ürün türünün aynı yapıya uygunluğu'],['Canlı mağaza','O anda erişilebilen kullanıcı deneyimi','PakSoft’un yaptığı işin tamamı veya geçmiş sürüm'],['Entegrasyon açıklaması','Belirtilmiş bağlantı kapsamı','Her sistemle aynı çözümün çalışacağı'],['Sonuç verisi','Belirli dönem ve ölçümde gözlenen sonuç','Gelecekte aynı sonucun tekrarlanacağı'],
      ]}/>
      <p className="mt-4"><ShopifyLink href={`${base}/ozellikler`}>Shopify mağaza özelliklerini ve teslimatlarını inceleyin</ShopifyLink></p>
    </ShopifySection>

    <ShopifySection title="Proje görüşmesine gelirken kısa bir ihtiyaç listesi hazırlayın" intro={<>Örnekleri yalnız “bunun aynısı olsun” diye paylaşmak yerine hangi davranışın veya düzenin gerekli olduğunu belirtin. Başka bir markanın tasarımını ve içeriklerini birebir kopyalamak yerine kendi ihtiyaçlarınıza uygun çözümü belirleriz.</>} aside={<ShopifyVisual name="project-brief" className="mx-auto w-full max-w-md" />}>
      
      <ShopifyTable label="Shopify proje görüşmesi için hazırlanabilecek bilgiler" headers={['Paylaşabileceğiniz bilgi','Örnek açıklama']} rows={[
        ['Beğendiğiniz alan','“Ürün sayfasındaki bilgi grupları kolay okunuyor.”'],['Ürün yapınız','“Ürünlerimizde beden ve renk seçenekleri var.”'],['Güncelleme ihtiyacınız','“Kampanya alanlarını ekibimiz değiştirecek.”'],['Mevcut sisteminiz','“Stokları ayrı bir işletme yazılımında yönetiyoruz.”'],['Geçiş ihtiyacınız','“Mevcut ürün ve önemli bağlantıları değerlendirmek istiyoruz.”'],['Önceliğiniz','“İlk sürümde ürünler ve sipariş akışı hazır olsun.”'],
      ]}/>
    </ShopifySection>

    <ShopifySection title="Benzer bir Shopify projesini nasıl planlıyoruz?" tone="gray">
      <ol className="grid gap-4 md:grid-cols-3">{[['İhtiyacı belirleriz','Yeni mağaza, mevcut tema geliştirmesi veya başka altyapıdan geçiş durumunu ayırırız.'],['Kapsamı çıkarırız','Sayfaları, veri işlerini ve gerekli bağlantıları listeler; tema ve uygulama bağımlılıklarını belirtiriz.'],['Örneklerle doğrularız','Gerçek ürün verileri üzerinden tasarım ve işlevleri değerlendirir, yayın öncesi kontrol listesini tamamlarız.']].map(([title,text],i)=><div key={title} className="border-t-2 border-heritage-turquoise pt-4"><span className="text-xs text-heritage-turquoise-deep">0{i+1}</span><h3 className="mt-2 font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></div>)}</ol>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3"><ShopifyLink href={`${base}/surec`}>Shopify kurulum ve mağaza taşıma sürecini inceleyin</ShopifyLink><ShopifyLink href={`${base}/fiyatlandirma`}>Proje maliyetini etkileyen kalemleri inceleyin</ShopifyLink><ShopifyLink href={`${base}/teknoloji`}>Teknoloji seçeneklerini karşılaştırın</ShopifyLink></div>
    </ShopifySection>

    <ShopifySection title="Shopify portföyü hakkında sık sorulan sorular">
      <div className="divide-y divide-heritage-sand border-y border-heritage-sand">{faqs.map(([question,answer])=><article key={question} className="py-4"><h3 className="font-semibold text-gray-950">{question}</h3><p className="mt-2 max-w-4xl text-sm leading-6 text-gray-600">{answer}</p></article>)}</div>
    </ShopifySection>
    <PlatformPageLinks platform="shopify" current="portfolio" tone="ivory" />
    <ShopifyPageCTA title="Shopify projenizi kendi ihtiyaçlarınıza göre şekillendirelim" description="Beğendiğiniz mağazaları, ürün yapınızı ve önceliklerinizi paylaşın. Görsel beklentilerin yanında sayfaları, veri işlerini ve gerekli bağlantıları da kapsayan bir başlangıç planı oluşturalım." primary="Shopify Projem İçin Görüşelim" secondaryHref={`${base}/fiyatlandirma`} secondary="Maliyeti Etkileyen Kalemleri İncele"/>
  </main>;
}
