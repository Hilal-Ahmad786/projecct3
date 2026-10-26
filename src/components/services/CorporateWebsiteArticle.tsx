import Image from 'next/image';
import Link from 'next/link';
import React, { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowRightIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { SITE_URL } from '@/config/site';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import BlogInternalLinksCta from '@/components/blog/BlogInternalLinksCta';
import articles from '@/data/corporate-website-articles/tr.json';

type ArticleSlug = keyof typeof articles;
type ArticleData = (typeof articles)[ArticleSlug];

export function getCorporateWebsiteArticle(slug: string): ArticleData | null {
  return Object.prototype.hasOwnProperty.call(articles, slug) ? articles[slug as ArticleSlug] : null;
}

export function getCorporateWebsiteArticleSlugs(): ArticleSlug[] {
  return Object.keys(articles) as ArticleSlug[];
}

export function getCorporateWebsiteArticleMeta(slug: string) {
  const article = getCorporateWebsiteArticle(slug);
  return article ? { title: article.metaTitle, description: article.metaDescription } : null;
}

function headingId(value: string) {
  const transliteration: Record<string, string> = { ğ: 'g', Ğ: 'g', ü: 'u', Ü: 'u', ş: 's', Ş: 's', ı: 'i', İ: 'i', ö: 'o', Ö: 'o', ç: 'c', Ç: 'c' };
  return value
    .replace(/[ğĞüÜşŞıİöÖçÇ]/g, (character) => transliteration[character] ?? character)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('tr-TR')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function readHeadingText(children: ReactNode): string {
  return Children.toArray(children).map((child) => {
    if (typeof child === 'string' || typeof child === 'number') return String(child);
    if (isValidElement<{ children?: ReactNode }>(child)) return readHeadingText(child.props.children);
    return '';
  }).join('');
}

function WorkflowFigure({ article }: { article: ArticleData }) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-heritage-sand bg-white">
      <Image
        src={article.illustration}
        alt={article.illustrationAlt}
        width={1536}
        height={1024}
        sizes="(max-width: 768px) 100vw, 760px"
        className="h-auto w-full"
      />
      <figcaption className="border-t border-heritage-sand bg-heritage-ivory px-4 py-4 sm:px-6">
        <p className="text-sm font-medium text-gray-800">{article.illustrationCaption}</p>
        <ol className="mt-3 grid gap-x-6 gap-y-2 text-sm leading-6 text-gray-700 sm:grid-cols-2">
          {article.illustrationSteps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </figcaption>
    </figure>
  );
}

function getTableOfContents(markdown: string) {
  return Array.from(markdown.matchAll(/^(#{2,3})\s+(.+)$/gm), (match) => ({
    depth: match[1].length,
    title: match[2].trim(),
    id: headingId(match[2].trim()),
  }));
}

const mainServicePath = '/tr/hizmetler/corporate-website-design';
const blogListingPath = `${mainServicePath}/blog`;

export function CorporateWebsiteArticlePage({ article }: { article: ArticleData }) {
  const articleUrl = `${SITE_URL}${blogListingPath}/${article.slug}`;
  const toc = getTableOfContents(article.body);
  const markdownComponents: Components = {
    h2: ({ children }) => {
      const text = readHeadingText(children);
      return <h2 id={headingId(text)} className="scroll-mt-28 pt-3 text-2xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-3xl">{children}</h2>;
    },
    h3: ({ children }) => {
      const text = readHeadingText(children);
      return <h3 id={headingId(text)} className="scroll-mt-28 pt-2 text-xl font-semibold leading-snug text-gray-900">{children}</h3>;
    },
    p: ({ children }) => {
      const text = readHeadingText(children);
      if (text.includes('[[PAKSOFT_VISUAL:')) return <WorkflowFigure article={article} />;
      return <p className="text-base leading-7 text-gray-700">{children}</p>;
    },
    a: ({ href = '', children }) => {
      const className = 'font-medium text-heritage-turquoise-deep underline decoration-heritage-turquoise/40 underline-offset-4 hover:decoration-heritage-turquoise focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise';
      return href.startsWith('/') ? <Link href={href} className={className}>{children}</Link> : <a href={href} className={className}>{children}</a>;
    },
    table: ({ children }) => <div className="my-5 max-w-full overflow-x-auto rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise" tabIndex={0} aria-label="Yatay kaydırılabilir tablo"><table className="w-full min-w-[36rem] border-collapse text-left text-sm">{children}</table></div>,
    thead: ({ children }) => <thead className="bg-heritage-turquoise-light text-gray-900">{children}</thead>,
    th: ({ children }) => <th scope="col" className="border-b border-gray-200 px-4 py-3 font-semibold">{children}</th>,
    td: ({ children }) => <td className="border-b border-gray-100 px-4 py-3 align-top leading-6 text-gray-700">{children}</td>,
    ul: ({ children }) => <ul className="list-disc space-y-2 ps-6 text-base leading-7 text-gray-700">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal space-y-2 ps-6 text-base leading-7 text-gray-700">{children}</ol>,
    li: ({ children }) => <li className="ps-1">{children}</li>,
    blockquote: ({ children }) => <blockquote className="border-s-4 border-heritage-turquoise bg-heritage-turquoise-light/60 px-5 py-3 text-gray-800">{children}</blockquote>,
    hr: () => <hr className="border-heritage-sand" />,
  };

  return <main className="min-h-screen bg-white">
    <ArticleJsonLd
      headline={article.title}
      description={article.metaDescription}
      url={articleUrl}
      image={`${SITE_URL}${article.coverImage}`}
      datePublished="2026-10-26"
      dateModified="2026-10-26"
      section={article.category}
    />
    <BreadcrumbJsonLd items={[
      { name: 'Ana Sayfa', url: `${SITE_URL}/tr` },
      { name: 'Hizmetler', url: `${SITE_URL}/tr/hizmetler` },
      { name: 'Kurumsal Web Tasarım', url: `${SITE_URL}${mainServicePath}` },
      { name: 'Blog', url: `${SITE_URL}${blogListingPath}` },
      { name: article.title, url: articleUrl },
    ]} />

    <section className="bg-white pb-6 pt-24 sm:pb-8 sm:pt-32 lg:pt-40">
      <div className="container mx-auto max-w-6xl px-4">
        <nav aria-label="İçerik yolu" className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 sm:text-sm">
          <Link href="/tr" className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Ana Sayfa</Link><span aria-hidden="true">/</span>
          <Link href="/tr/hizmetler" className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Hizmetler</Link><span aria-hidden="true">/</span>
          <Link href={mainServicePath} className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Kurumsal Web Tasarım</Link><span aria-hidden="true">/</span>
          <Link href={blogListingPath} className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Blog</Link><span aria-hidden="true">/</span>
          <span aria-current="page" className="text-gray-800">{article.title}</span>
        </nav>
        <div className="relative isolate overflow-hidden rounded-xl border border-heritage-sand bg-background-gray shadow-sm sm:rounded-2xl">
          <div className="relative z-20 px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[45%] lg:flex-col lg:justify-center lg:px-10 lg:pb-10 lg:pt-24 xl:px-12">
            <p className="flex items-center gap-2 text-overline font-semibold text-heritage-turquoise-deep"><span aria-hidden="true" className="h-px w-8 bg-heritage-turquoise" />{article.category}</p>
            <h1 className="text-display mt-2 max-w-[30rem] text-[clamp(2rem,3vw,2.9rem)] font-medium leading-[1.08] text-gray-950">{article.title}</h1>
            <p className="mt-4 max-w-[27rem] text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">{article.standfirst}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-heritage-turquoise-deep" aria-hidden="true" /><time dateTime="2026-10-26">26 Ekim 2026</time></span>
              <span className="inline-flex items-center gap-2"><ClockIcon className="h-4 w-4 text-heritage-turquoise-deep" aria-hidden="true" />Yaklaşık {Math.max(1, Math.ceil(article.body.split(/\s+/).length / 200))} dk okuma</span>
            </div>
          </div>
          <Image src={article.coverImage} alt={article.coverAlt} width={1672} height={941} priority sizes="(max-width: 1024px) 100vw, 1152px" className="relative z-0 block h-auto w-full" />
        </div>
      </div>
    </section>

    <section className="py-10 sm:py-14 lg:py-16">
      <div className="container mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
        <details className="rounded-xl border border-heritage-sand bg-heritage-ivory p-4 lg:hidden">
          <summary className="cursor-pointer font-semibold text-gray-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Bu yazıda</summary>
          <ol className="mt-3 space-y-2 text-sm leading-6">
            {toc.map((item) => <li key={item.id} className={item.depth === 3 ? 'ps-3' : ''}><a href={`#${item.id}`} className="text-gray-700 underline-offset-4 hover:text-heritage-turquoise-deep hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{item.title}</a></li>)}
          </ol>
        </details>
        <nav aria-label="Bu yazıda" className="hidden self-start rounded-xl border border-heritage-sand bg-heritage-ivory p-5 lg:sticky lg:top-24 lg:block">
          <h2 className="font-semibold text-gray-900">Bu yazıda</h2>
          <ol className="mt-3 space-y-2 text-sm leading-6">
            {toc.map((item) => <li key={item.id} className={item.depth === 3 ? 'ps-3' : ''}><a href={`#${item.id}`} className="text-gray-700 underline-offset-4 hover:text-heritage-turquoise-deep hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{item.title}</a></li>)}
          </ol>
        </nav>
        <article className="min-w-0 space-y-6">
          <BlogInternalLinksCta locale="tr" compact />
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{article.body}</ReactMarkdown>
          <BlogInternalLinksCta locale="tr" />
          <section className="rounded-xl bg-gray-950 p-6 text-white sm:p-8">
            <h2 className="text-xl font-semibold">Kurumsal web sitesi projenizi planlayın</h2>
            <p className="mt-2 max-w-2xl leading-7 text-gray-300">Mevcut sitenizi, hedeflerinizi ve ihtiyaç duyduğunuz sayfaları paylaşın; proje kapsamını birlikte değerlendirelim.</p>
            <Link href="/tr/start-project?service=corporate-website-design" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 motion-reduce:transition-none">Projenizi Konuşalım<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
          </section>
          <Link href={`${blogListingPath}/${article.related}`} className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-5 transition-colors hover:border-heritage-turquoise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise motion-reduce:transition-none">
            <span><span className="block text-xs font-semibold uppercase tracking-wide text-heritage-turquoise-deep">İlgili rehber</span><span className="mt-1 block font-semibold text-gray-900">{articles[article.related as ArticleSlug].title}</span></span>
            <ArrowRightIcon className="h-5 w-5 shrink-0 text-heritage-turquoise-deep transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
          </Link>
          <Link href={blogListingPath} className="inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise"><ArrowRightIcon className="h-4 w-4 rotate-180" aria-hidden="true" />Tüm kurumsal web tasarım rehberleri</Link>
        </article>
      </div>
    </section>
  </main>;
}
