import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { getPublicServiceBlogCards } from '@/lib/database/public-queries';
import { getServiceArticlePresentation, getServiceBlog } from '@/components/services/service-blogs';
import ServiceGuideCards from '@/components/services/ServiceGuideCards';
import { BlogFeedScene } from '@/components/services/hero-visuals/scenes-internal';
import InternalPageHero from '@/components/services/InternalPageHero';
import IkasMotionScope from './IkasMotionScope';
import { IkasIcon, IkasPlatformNote } from './IkasMark';

const servicePath = '/tr/hizmetler/ikas-development';
const blogPath = `${servicePath}/blog`;

export function getIkasBlogMeta() {
  return {
    title: 'ikas Kurulum ve Tema Tasarımı Rehberleri | PakSoft',
    description: 'ikas mağaza hazırlığı, tema tasarımı ve özelleştirme kararları için pratik rehberler. Kontrol listeleri ve örneklerle projenizin kapsamını planlayın.',
  };
}

export default async function IkasTurkishBlogPage() {
  const posts = await getPublicServiceBlogCards('ikas-development', 'tr', 24, 'cover-images-2026-11');
  const blog = getServiceBlog('ikas-development', 'tr');
  const cards = posts.map((post) => {
    const presentation = blog ? getServiceArticlePresentation(blog, post.slug, post.title) : null;
    return {
      slug: post.slug,
      href: `${blogPath}/${post.slug}`,
      title: post.title,
      category: presentation?.category ?? 'ikas Rehberi',
      excerpt: post.excerpt ?? '',
      image: post.featuredImage,
      imageAlt: presentation?.coverAlt ?? '',
      publishedAt: post.publishedAt?.slice(0, 10) ?? null,
      readingMinutes: presentation?.readingMinutes,
    };
  });

  return <main className="min-h-screen bg-white">
    <IkasMotionScope />
    <InternalPageHero eyebrowIcon={<IkasIcon size={24} />} eyebrowNormalCase footnote={<IkasPlatformNote />} serviceName="ikas Geliştirme" accentWord="ikas Rehberleri" heading="ikas Kurulum ve Tema Tasarımı Rehberleri" subtitle="ikas mağaza hazırlığı, tema tasarımı ve özelleştirme kararları için pratik rehberler. Kontrol listeleri ve örneklerle projenizin kapsamını planlayın." crumbs={[{ label: 'Ana Sayfa', href: '/tr' }, { label: 'Hizmetler', href: '/tr/hizmetler' }, { label: 'ikas Geliştirme', href: servicePath }, { label: 'Rehberler' }]} scene={<BlogFeedScene />} />
    <section id="rehberler" className="scroll-mt-28 bg-background-gray py-12 sm:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-headline font-medium leading-tight text-gray-950">ikas mağaza projeniz için rehberler</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Kurulum öncesi hazırlıklar ve tema özelleştirme kararları için yayınlanmış içerikleri inceleyin.</p>
        {cards.length ? <div className="mt-7"><ServiceGuideCards cards={cards} reveal motionScope="ikas" /></div> : <div data-ikas-reveal className="mt-7 rounded-xl border border-heritage-sand bg-white p-5 text-gray-700">ikas rehberleri hazırlanıyor. Bu sırada <Link className="font-semibold text-heritage-turquoise-deep underline underline-offset-4" href={`${servicePath}/ozellikler`}>ikas çalışma alanlarını</Link> ve <Link className="font-semibold text-heritage-turquoise-deep underline underline-offset-4" href={`${servicePath}/surec`}>proje sürecini</Link> inceleyebilirsiniz.</div>}
        <aside data-ikas-reveal className="mt-10 flex flex-col gap-4 rounded-2xl bg-heritage-ivory p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div><h2 className="text-lg font-semibold text-gray-950">Rehberleri projenize uygulayalım</h2><p className="mt-1 text-sm leading-6 text-gray-700">Mağaza ihtiyaçlarınızı paylaşın, uygun çalışma kapsamını birlikte değerlendirelim.</p></div>
          <Link href="/tr/start-project?service=ikas-development" className="inline-flex min-h-11 items-center gap-2 self-start rounded-sm bg-heritage-turquoise-deep px-4 py-3 text-sm font-semibold text-white hover:bg-heritage-turquoise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 sm:self-auto">Projenizi Anlatın<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
        </aside>
      </div>
    </section>
  </main>;
}
