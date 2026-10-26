import Image from 'next/image';
import Link from 'next/link';
import React, { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowRightIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { SITE_URL } from '@/config/site';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
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
  return article ? {
    title: article.metaTitle,
    description: article.metaDescription,
    image: article.coverImage,
    imageAlt: article.coverAlt,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
  } : null;
}

function headingId(value: string) {
  const transliteration: Record<string, string> = { ğ: 'g', Ğ: 'g', ü: 'u', Ü: 'u', ş: 's', Ş: 's', ı: 'i', İ: 'i', ö: 'o', Ö: 'o', ç: 'c', Ç: 'c' };
  return value
    .replace(/[ğĞüÜşŞıİöÖçÇ]/g, (character) => transliteration[character] ?? character)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
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

const mainServicePath = '/tr/hizmetler/corporate-website-design';
const blogListingPath = `${mainServicePath}/blog`;
const enquiryPath = '/tr/start-project?service=corporate-website-design';
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';

type CtaStage = 'early' | 'middle' | 'closing';
type CtaLink = { label: string; href: string };
type CtaCopy = { heading: string; text: string; primary?: CtaLink; secondary?: CtaLink };

// Three deliberate placements per article: a compact prompt after the
// introduction, a contextual link near the planning section it relates to,
// and a stronger closing banner once the main content is complete.
const articleCtas: Record<ArticleSlug, Record<CtaStage, CtaCopy>> = {
  'web-sitesi-yenileme': {
    early: {
      heading: 'Mevcut web sitenizi yenilemeyi mi planlıyorsunuz?',
      text: 'İhtiyaçlarınızı paylaşın; içerik, tasarım ve teknik geçiş kapsamını birlikte netleştirelim.',
      primary: { label: 'Projenizi Anlatın', href: enquiryPath },
      secondary: { label: 'Kurumsal Web Tasarımı İnceleyin', href: mainServicePath },
    },
    middle: {
      heading: 'Yenileme sürecinin kapsamını netleştirin',
      text: 'Sayfalar, içerikler, yönlendirmeler ve yayın kontrolleri için planlı bir çalışma oluşturun.',
      primary: { label: 'Çalışma Sürecimizi İnceleyin', href: `${mainServicePath}/surec` },
    },
    closing: {
      heading: 'Yeni siteniz için doğru kapsamla başlayın',
      text: 'Mevcut site adresinizi, önceliklerinizi ve ihtiyaç duyduğunuz özellikleri paylaşın.',
      primary: { label: 'Teklif Talebinizi İletin', href: enquiryPath },
      secondary: { label: 'Fiyatlandırma Bilgilerini İnceleyin', href: `${mainServicePath}/fiyatlandirma` },
    },
  },
  'ihracat-firmalari-icin-cok-dilli-web-sitesi': {
    early: {
      heading: 'Hedef pazarlarınıza uygun bir web sitesi planlayın',
      text: 'Dil seçeneklerini, ürün içeriklerini ve teklif akışını ihracat hedeflerinizle birlikte ele alalım.',
      primary: { label: 'Projenizi Anlatın', href: enquiryPath },
    },
    middle: {
      heading: 'Çok dilli sitenizin ihtiyaçlarını belirleyin',
      text: 'İçerik yönetimi, dil yapısı ve kullanıcı deneyimi için gerekli özellikleri inceleyin.',
      primary: { label: 'Web Sitesi Özelliklerini İnceleyin', href: `${mainServicePath}/ozellikler` },
    },
    closing: {
      heading: 'İhracat odaklı web sitenizin kapsamını konuşalım',
      text: 'Hedef ülkelerinizi, öncelikli ürünlerinizi ve ihtiyaç duyduğunuz dilleri paylaşın.',
      primary: { label: 'Teklif Talebinizi İletin', href: enquiryPath },
      secondary: { label: 'Kurumsal Web Tasarımı İnceleyin', href: mainServicePath },
    },
  },
};

function ArticleCta({ stage, copy }: { stage: CtaStage; copy: CtaCopy }) {
  if (stage === 'middle') {
    return (
      <aside aria-label={copy.heading} className="reveal my-8 flex flex-col gap-4 rounded-xl bg-heritage-turquoise-light px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="max-w-lg">
          <p className="font-semibold text-gray-950">{copy.heading}</p>
          <p className="mt-1 text-sm leading-6 text-gray-700">{copy.text}</p>
        </div>
        {copy.primary && <Link href={copy.primary.href} className={`group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focusRing}`}>
          {copy.primary.label}<ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
        </Link>}
      </aside>
    );
  }

  if (stage === 'early') {
    return (
      <aside aria-label={copy.heading} className="reveal my-8 rounded-xl border border-heritage-sand border-s-4 border-s-heritage-turquoise bg-heritage-ivory px-5 py-5 sm:px-6">
        <p className="text-lg font-semibold leading-snug text-gray-950">{copy.heading}</p>
        <p className="mt-1.5 text-sm leading-6 text-gray-700">{copy.text}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
          {copy.primary && <Link href={copy.primary.href} className={`inline-flex min-h-11 items-center gap-2 rounded-sm bg-heritage-turquoise-deep px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise motion-reduce:transition-none ${focusRing}`}>
            {copy.primary.label}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>}
          {copy.secondary && <Link href={copy.secondary.href} className={`inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focusRing}`}>
            {copy.secondary.label}
          </Link>}
        </div>
      </aside>
    );
  }

  return (
    <aside aria-label={copy.heading} className="reveal my-10 rounded-2xl bg-gray-950 px-6 py-7 text-white sm:px-8 sm:py-9">
      <p className="text-overline text-heritage-turquoise-light">PakSoft · Kurumsal Web Tasarım</p>
      <p className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">{copy.heading}</p>
      <p className="mt-2 max-w-xl leading-7 text-gray-300">{copy.text}</p>
      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        {copy.primary && <Link href={copy.primary.href} className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 motion-reduce:transition-none">
          {copy.primary.label}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>}
        {copy.secondary && <Link href={copy.secondary.href} className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 motion-reduce:transition-none">
          {copy.secondary.label}
        </Link>}
      </div>
    </aside>
  );
}

function WorkflowFigure({ article }: { article: ArticleData }) {
  return (
    <figure className="reveal my-8 overflow-hidden rounded-2xl border border-heritage-sand bg-white">
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
        <ol className="mt-3 grid gap-x-6 gap-y-3 text-sm leading-6 text-gray-700 sm:grid-cols-2">
          {article.illustrationSteps.map((step, i) => {
            const [title, ...rest] = step.split(':');
            return <li key={step} className="flex gap-3">
              <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-heritage-turquoise-deep text-xs font-semibold text-white">{i + 1}</span>
              <span>{rest.length ? <><strong className="font-semibold text-gray-900">{title}:</strong>{rest.join(':')}</> : step}</span>
            </li>;
          })}
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

function formatTurkishDate(isoDate: string) {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${isoDate}T00:00:00Z`));
}

function TableOfContents({ toc }: { toc: ReturnType<typeof getTableOfContents> }) {
  return <ol className="mt-3 space-y-2 text-sm leading-6">
    {toc.map((item) => <li key={item.id} className={item.depth === 3 ? 'ps-3' : ''}><a href={`#${item.id}`} className="text-gray-700 underline-offset-4 hover:text-heritage-turquoise-deep hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{item.title}</a></li>)}
  </ol>;
}

export function CorporateWebsiteArticlePage({ article }: { article: ArticleData }) {
  const articleUrl = `${SITE_URL}${blogListingPath}/${article.slug}`;
  const slug = article.slug as ArticleSlug;
  const related = articles[article.related as ArticleSlug];
  const ctas = articleCtas[slug];
  const toc = getTableOfContents(article.body);
  // Reading time counts the visible prose only, not CTA/visual markers.
  const readingMinutes = Math.max(1, Math.ceil(article.body.replace(/\[\[PAKSOFT_[A-Z]+:[a-z]+\]\]/g, '').split(/\s+/).length / 200));
  const updated = article.dateModified !== article.datePublished;

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
      const cta = text.match(/\[\[PAKSOFT_CTA:(early|middle|closing)\]\]/);
      if (cta) return <ArticleCta stage={cta[1] as CtaStage} copy={ctas[cta[1] as CtaStage]} />;
      return <p className="text-base leading-7 text-gray-700">{children}</p>;
    },
    a: ({ href = '', children }) => {
      const className = 'font-medium text-heritage-turquoise-deep underline decoration-heritage-turquoise/40 underline-offset-4 hover:decoration-heritage-turquoise focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise';
      return href.startsWith('/') ? <Link href={href} className={className}>{children}</Link> : <a href={href} className={className}>{children}</a>;
    },
    table: ({ children }) => <div className="my-5 max-w-full overflow-x-auto rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise" tabIndex={0} role="region" aria-label="Yatay kaydırılabilir tablo"><table className="w-full min-w-[36rem] border-collapse text-left text-sm">{children}</table></div>,
    thead: ({ children }) => <thead className="bg-heritage-turquoise-light text-gray-900">{children}</thead>,
    th: ({ children }) => <th scope="col" className="border-b border-gray-200 px-4 py-3 font-semibold">{children}</th>,
    td: ({ children }) => <td className="border-b border-gray-100 px-4 py-3 align-top leading-6 text-gray-700">{children}</td>,
    // GFM task lists ("- [ ]") render as a readable checklist rather than
    // disabled form controls; nothing here is submitted or stored.
    ul: ({ className, children }) => className?.includes('contains-task-list')
      ? <ul className="space-y-3 rounded-xl border border-heritage-sand bg-heritage-ivory p-5 text-base leading-7 text-gray-700 sm:p-6">{children}</ul>
      : <ul className="list-disc space-y-2 ps-6 text-base leading-7 text-gray-700">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal space-y-2 ps-6 text-base leading-7 text-gray-700">{children}</ol>,
    li: ({ className, children }) => className?.includes('task-list-item')
      ? <li className="flex items-start gap-3">{children}</li>
      : <li className="ps-1">{children}</li>,
    input: () => <span aria-hidden="true" className="mt-1.5 h-4 w-4 shrink-0 rounded-sm border-2 border-heritage-turquoise bg-white" />,
    blockquote: ({ children }) => <blockquote className="border-s-4 border-heritage-turquoise bg-heritage-turquoise-light/60 px-5 py-3 text-gray-800">{children}</blockquote>,
    hr: () => <hr className="border-heritage-sand" />,
  };

  return <main className="min-h-screen bg-white">
    <ArticleJsonLd
      headline={article.title}
      description={article.metaDescription}
      url={articleUrl}
      image={`${SITE_URL}${article.coverImage}`}
      datePublished={article.datePublished}
      dateModified={article.dateModified}
      section={article.category}
      inLanguage="tr-TR"
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
        <nav aria-label="İçerik yolu" className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600 sm:text-sm">
          <Link href="/tr" className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Ana Sayfa</Link><span aria-hidden="true">/</span>
          <Link href="/tr/hizmetler" className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Hizmetler</Link><span aria-hidden="true">/</span>
          <Link href={mainServicePath} className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Kurumsal Web Tasarım</Link><span aria-hidden="true">/</span>
          <Link href={blogListingPath} className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Blog</Link><span aria-hidden="true">/</span>
          <span aria-current="page" className="text-gray-800">{article.title}</span>
        </nav>
        <div className="relative isolate overflow-hidden rounded-xl border border-heritage-sand bg-background-gray shadow-sm sm:rounded-2xl">
          {/* Same CSS entrance as the service heroes (hero-enter): visible in the
              server HTML, animated at first paint, disabled for reduced motion.
              The cover image is not animated so it never delays the LCP. */}
          <div className="hero-enter relative z-20 px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[45%] lg:flex-col lg:justify-center lg:px-10 lg:pb-10 lg:pt-24 xl:px-12">
            <p className="flex items-center gap-2 text-overline font-semibold text-heritage-turquoise-deep"><span aria-hidden="true" className="h-px w-8 bg-heritage-turquoise" />{article.category}</p>
            <h1 className="text-display mt-2 max-w-[30rem] text-[clamp(2rem,3vw,2.9rem)] font-medium leading-[1.08] text-gray-950">{article.title}</h1>
            <p className="mt-4 max-w-[27rem] text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">{article.standfirst}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-heritage-turquoise-deep" aria-hidden="true" /><span>{updated ? 'Güncellendi: ' : ''}<time dateTime={updated ? article.dateModified : article.datePublished}>{formatTurkishDate(updated ? article.dateModified : article.datePublished)}</time></span></span>
              <span className="inline-flex items-center gap-2"><ClockIcon className="h-4 w-4 text-heritage-turquoise-deep" aria-hidden="true" />Yaklaşık {readingMinutes} dk okuma</span>
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
          <TableOfContents toc={toc} />
        </details>
        <nav aria-label="Bu yazıda" className="hidden self-start rounded-xl border border-heritage-sand bg-heritage-ivory p-5 lg:sticky lg:top-24 lg:block">
          <p className="font-semibold text-gray-900">Bu yazıda</p>
          <TableOfContents toc={toc} />
        </nav>
        <article className="min-w-0 max-w-3xl space-y-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{article.body}</ReactMarkdown>

          <section aria-labelledby="related-reading" className="border-t border-gray-200 pt-8">
            <h2 id="related-reading" className="text-xl font-semibold text-gray-950">İlgili rehber</h2>
            <Link href={`${blogListingPath}/${related.slug}`} className={`reveal corporate-info-card group mt-4 grid overflow-hidden rounded-xl border border-gray-200 bg-white sm:grid-cols-[14rem_1fr] ${focusRing}`}>
              <span className="relative block aspect-video bg-background-gray sm:aspect-auto">
                <Image src={related.coverImage} alt="" fill loading="lazy" sizes="(max-width: 640px) 100vw, 224px" className="object-cover object-right" />
              </span>
              <span className="block p-5">
                <span className="text-overline text-heritage-turquoise-deep">{related.category}</span>
                <span className="mt-1 block font-semibold leading-snug text-gray-950">{related.title}</span>
                <span className="mt-2 block text-sm leading-6 text-gray-600">{related.excerpt}</span>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep">Rehberi okuyun<ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" /></span>
              </span>
            </Link>
          </section>

          <nav aria-label="Rehber gezinmesi" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link href={blogListingPath} className={`inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focusRing}`}><ArrowRightIcon className="h-4 w-4 rotate-180" aria-hidden="true" />Tüm kurumsal web tasarım rehberleri</Link>
            <Link href={mainServicePath} className={`inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focusRing}`}>Kurumsal web tasarım hizmetine genel bakış<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
          </nav>
        </article>
      </div>
    </section>
  </main>;
}
