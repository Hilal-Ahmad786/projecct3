import Link from '@/components/IntentLink';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import ServiceGuideCards from '@/components/services/ServiceGuideCards';
import CustomEcommerceMotionScope from './CustomEcommerceMotionScope';
import { getCustomEcommerceGuides } from '@/components/services/service-blogs/custom-ecommerce';
import PlatformPageLinks from './PlatformPageLinks';
import { CustomEcommerceIcon } from './CustomEcommerceIcon';

const path = '/tr/hizmetler/custom-ecommerce';
const blogPath = `${path}/blog`;
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';

export function getCustomEcommerceBlogMeta() {
  return { title: 'Özel E-Ticaret Sitesi ve Yazılımı Rehberleri | PakSoft', description: 'Hazır altyapı ile özel geliştirmeyi karşılaştırın. Ürün, fiyat ve sipariş ihtiyaçlarınızı proje teklifinden önce nasıl tanımlayacağınızı öğrenin.' };
}

export default function CustomEcommerceTurkishBlogPage() {
  const cards = getCustomEcommerceGuides().map((guide) => ({
    slug: guide.slug,
    href: `${blogPath}/${guide.slug}`,
    title: guide.title,
    category: guide.categoryLabel || 'Özel E-Ticaret Rehberi',
    excerpt: guide.excerpt,
    image: guide.featuredImage,
    imageAlt: guide.imageAlt,
  }));
  return <main className="min-h-screen bg-white">
    <CustomEcommerceMotionScope />
    <InternalPageHero serviceName="Özel E-Ticaret" accentWord="Özel E-Ticaret Rehberleri" eyebrowNormalCase eyebrowIcon={<span className="flex h-8 w-8 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/5"><CustomEcommerceIcon /></span>} heading="Özel E-Ticaret Sitesi ve Yazılımı Rehberleri" rotating={{ lead: 'Özel E-Ticaret', words: ['Rehberleri', 'Altyapı Seçimi', 'Kapsam Hazırlığı'] }} subtitle="Mağazanız için doğru geliştirme yaklaşımını seçin ve teklif görüşmesine somut örneklerle hazırlanın. Ürün, fiyat ve sipariş ihtiyaçlarınıza yönelik iki rehberi inceleyin." crumbs={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler', href: '/hizmetler' }, { label: 'Özel E-Ticaret', href: path }, { label: 'Rehberler' }]} actions={<><a href="#custom-ecommerce-guides" className={`inline-flex min-h-11 items-center justify-center rounded-sm bg-heritage-turquoise-deep px-5 py-3 text-sm font-semibold text-white hover:bg-heritage-turquoise ${focus}`}>Rehberleri İncele</a><Link href={`${path}/surec`} className={`inline-flex min-h-11 items-center justify-center rounded-sm border border-heritage-sand bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-heritage-turquoise ${focus}`}>Geliştirme Sürecini İncele</Link></>} scene={<div className="grid w-full max-w-md gap-3 rounded-2xl border border-heritage-sand bg-white p-4 shadow-sm sm:grid-cols-2">{[['Sipariş örneği','İhtiyacı tarif edin'],['İş kuralı','Seçenekleri karşılaştırın'],['Sistemler','Bağlantıları planlayın'],['İlk sürüm','Kontrolleri belirleyin']].map(([title, text], i) => <div key={title} data-custom-ecom-reveal data-custom-ecom-delay={i * 45} className="rounded-xl border border-heritage-sand bg-heritage-ivory p-4"><span className="text-xs font-semibold text-heritage-turquoise-deep">0{i + 1}</span><strong className="mt-2 block text-sm text-gray-900">{title}</strong><span className="mt-1 block text-xs leading-5 text-gray-600">{text}</span></div>)}</div>} />
    <section id="custom-ecommerce-guides" className="bg-background-gray"><div className="mx-auto max-w-[1200px] px-4 sm:px-6 cw-section"><h2 className="reveal max-w-4xl text-headline font-medium leading-tight text-gray-900">Özel E-Ticaret Sitesi Projesi İçin Rehberler</h2><p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Altyapı seçimi ve teklif öncesi kapsam hazırlığı üzerine yayınlanan içerikler.</p><div className="mt-7"><ServiceGuideCards cards={cards} /></div><aside className="mt-9 flex flex-col gap-4 rounded-2xl border border-heritage-sand bg-heritage-ivory p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><h2 className="text-lg font-semibold text-gray-950">Rehberleri kendi mağazanız için değerlendirin</h2><p className="mt-1 text-sm leading-6 text-gray-700">Örnek ürününüzü, mevcut mağazanızı ve değiştirmek istediğiniz sipariş adımını paylaşın.</p></div><Link href="/tr/start-project?service=custom-ecommerce" className={`inline-flex min-h-11 items-center gap-2 self-start rounded-sm bg-heritage-turquoise-deep px-4 py-3 text-sm font-semibold text-white hover:bg-heritage-turquoise sm:self-auto ${focus}`}>Projenizi Anlatın <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></aside></div></section>
    <PlatformPageLinks platform="custom" current="blog" tone="white" />
  </main>;
}

