import Link from '@/components/IntentLink';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import ServiceGuideCards from '@/components/services/ServiceGuideCards';
import { getShopifyGuides } from '@/components/services/service-blogs/shopify-content';
import { shopifyFocus } from './ShopifyPagePrimitives';
import ShopifyMotionScope from './ShopifyMotionScope';
import { ShopifyHeroScene, ShopifyIcon, ShopifyPlatformNote } from './ShopifyMark';
import PlatformPageLinks from './PlatformPageLinks';

const servicePath = '/tr/hizmetler/shopify-development';
const blogPath = `${servicePath}/blog`;

export function getShopifyBlogMeta() {
  return {
    title: 'Shopify Kurulum ve Mağaza Taşıma Rehberleri | PakSoft',
    description: 'Shopify mağaza açmak için gerekenler, ürün verileri ve WooCommerce Shopify taşıma için rehberleri inceleyin. Projenizi planlamaya yardımcı kontrol listelerini keşfedin.',
  };
}

export default function ShopifyTurkishBlogPage() {
  const guides = getShopifyGuides();
  const cards = guides.map((guide) => ({
    slug: guide.slug,
    href: `${blogPath}/${guide.slug}`,
    title: guide.title,
    category: guide.categoryLabel ?? 'Shopify Rehberi',
    excerpt: guide.excerpt,
    image: guide.featuredImage,
    imageAlt: guide.imageAlt,
  }));

  return <main className="min-h-screen bg-white">
    <ShopifyMotionScope />
    <InternalPageHero serviceName="Shopify Geliştirme" accentWord="Shopify Rehberleri" eyebrowNormalCase heading="Shopify Kurulum ve Geliştirme Rehberleri" subtitle="Shopify projenize başlamadan önce içerik, veri ve geçiş kararlarını netleştirin. Rehberlerimizde hazırlık adımlarını, kontrol noktalarını ve proje görüşmesine götürebileceğiniz listeleri bulabilirsiniz." crumbs={[{label:'Ana Sayfa',href:'/'},{label:'Hizmetler',href:'/services'},{label:'Shopify Geliştirme',href:servicePath},{label:'Rehberler'}]} eyebrowIcon={<ShopifyIcon size={26} />} actions={<><a href="#shopify-rehberler" className={`inline-flex min-h-11 items-center justify-center rounded-sm bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700 ${shopifyFocus}`}>Rehberleri İncele</a><Link href={`${servicePath}/surec`} className={`inline-flex min-h-11 items-center justify-center rounded-sm border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-heritage-turquoise ${shopifyFocus}`}>Shopify Sürecini Gör</Link></>} scene={<ShopifyHeroScene><div className="grid w-full max-w-md gap-3 rounded-2xl border border-heritage-sand bg-white p-5 shadow-sm sm:grid-cols-2">{[['Ürün verisi','Katalog ve varyant hazırlığı'],['Tema','Sayfa ve içerik alanları'],['Hesaplar','Erişim ve sorumluluklar'],['Geçiş','Veri ve URL kontrolleri']].map(([title,text],i)=><div key={title} className="rounded-xl border border-heritage-sand bg-heritage-ivory p-4"><span className="text-xs text-heritage-turquoise-deep">0{i+1}</span><strong className="mt-2 block text-sm text-gray-900">{title}</strong><span className="mt-1 block text-xs leading-5 text-gray-600">{text}</span></div>)}</div></ShopifyHeroScene>} footnote={<div className="space-y-3"><p className="text-sm font-medium text-gray-600">Mağaza hazırlığı · WooCommerce’ten geçiş</p><ShopifyPlatformNote /></div>} rotating={{ lead: 'Shopify', words: ['Kurulum Rehberleri', 'Taşıma Rehberleri'] }} />
    <section id="shopify-rehberler" className="scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)] bg-background-gray">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 cw-section">
        <h2 className="reveal max-w-4xl text-headline font-medium leading-tight text-gray-950">Shopify Mağaza Açmak İçin Gerekenler ve Rehberler</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Ürün dosyalarından yayına hazırlık testlerine ve WooCommerce geçişine kadar karar noktalarını somut kontrol listeleriyle inceleyin.</p>
        <div className="mt-7"><ServiceGuideCards cards={cards} motionScope="shopify"/></div>
        <aside data-shopify-reveal className="mt-10 flex flex-col gap-4 rounded-2xl border border-heritage-sand bg-heritage-ivory p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div><h2 className="text-lg font-semibold text-gray-950">Rehberleri Projenize Uygulayalım</h2><p className="mt-1 text-sm leading-6 text-gray-700">Ürün yapınızı, mevcut mağazanızı ve ihtiyaç duyduğunuz bağlantıları paylaşın; çalışma kapsamını birlikte netleştirelim.</p></div>
          <Link href="/tr/start-project?service=shopify-development" className={`inline-flex min-h-11 items-center gap-2 self-start rounded-sm bg-heritage-turquoise-deep px-4 py-3 text-sm font-semibold text-white hover:bg-heritage-turquoise focus-visible:ring-offset-heritage-ivory sm:self-auto ${shopifyFocus}`}>Projenizi Anlatın<ArrowRightIcon className="h-4 w-4" aria-hidden="true"/></Link>
        </aside>
      </div>
    </section>
    <PlatformPageLinks platform="shopify" current="blog" tone="white" />
  </main>;
}
