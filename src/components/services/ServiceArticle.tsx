import Image from 'next/image';
import Link from 'next/link';
import React, { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowRightIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { SITE_URL } from '@/config/site';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { ArticleToc, ReadingProgress } from '@/components/services/ArticleReadingAids';

// Shared long-form layout for every Turkish service guide (kurumsal web
// tasarım, e-ticaret, and any service blog added later): cover with the title
// beside it, sticky contents menu with reading progress, three placed CTAs and
// a related-guide card. Article bodies are Markdown with a few markers:
//   [[PAKSOFT_CTA:early|middle|closing]]  → the service's CTA for that stage
//   any other [[PAKSOFT_…]] / [[…]] marker → the service's `renderMarker`
// Plain Markdown images, tables, task lists and /downloads/ links are styled
// automatically, so a new article needs no code to look right.

export type CtaStage = 'early' | 'middle' | 'closing';
export type CtaLink = { label: string; href: string };
export type CtaCopy = { heading: string; text: string; primary?: CtaLink; secondary?: CtaLink };

export type ServiceArticleData = {
  slug: string;
  title: string;
  category: string;
  standfirst: string;
  metaDescription: string;
  coverImage: string;
  coverAlt: string;
  /** YYYY-MM-DD */
  datePublished: string;
  /** YYYY-MM-DD */
  dateModified: string;
  body: string;
  keywords?: string[];
};

export type ServiceArticleRelated = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
};

export type ServiceArticleConfig = {
  /** Shown in breadcrumbs, e.g. "Kurumsal Web Tasarım". */
  serviceName: string;
  /** Localized service overview path, e.g. "/tr/hizmetler/e-commerce". */
  servicePath: string;
  /** Breadcrumb label of the listing page ("Blog", "Rehberler"). */
  blogLabel: string;
  /** Overline in the closing CTA, e.g. "PakSoft · E-Ticaret". */
  brandLine: string;
  allGuidesLabel: string;
  overviewLabel: string;
  /** Article section for Article JSON-LD; defaults to the article category. */
  jsonLdSection?: string;
  ctas: Record<CtaStage, CtaCopy>;
  /** Renders service-specific markers; return null to fall through. */
  renderMarker?: (marker: string, article: ServiceArticleData) => ReactNode | null;
};

export function serviceBlogPath(config: Pick<ServiceArticleConfig, 'servicePath'>) {
  return `${config.servicePath}/blog`;
}

export function headingId(value: string) {
  const transliteration: Record<string, string> = { ğ: 'g', Ğ: 'g', ü: 'u', Ü: 'u', ş: 's', Ş: 's', ı: 'i', İ: 'i', ö: 'o', Ö: 'o', ç: 'c', Ç: 'c' };
  return value
    .replace(/[ğĞüÜşŞıİöÖçÇ]/g, (character) => transliteration[character] ?? character)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLocaleLowerCase('tr-TR')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function readHeadingText(children: ReactNode): string {
  return Children.toArray(children).map((child) => {
    if (typeof child === 'string' || typeof child === 'number') return String(child);
    if (isValidElement<{ children?: ReactNode }>(child)) return readHeadingText(child.props.children);
    return '';
  }).join('');
}

export const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';

// Three deliberate placements per article: a compact prompt after the
// introduction, a contextual link near the planning section it relates to,
// and a stronger closing banner once the main content is complete.
function ArticleCta({ stage, copy, brandLine }: { stage: CtaStage; copy: CtaCopy; brandLine: string }) {
  if (stage === 'middle') {
    return (
      <aside aria-label={copy.heading} className="reveal my-10 flex flex-col gap-4 rounded-xl bg-heritage-turquoise-light sm:my-12 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
      <aside aria-label={copy.heading} className="reveal my-10 rounded-xl border border-heritage-sand border-s-4 sm:my-12 border-s-heritage-turquoise bg-heritage-ivory px-5 py-5 sm:px-6">
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
    <aside aria-label={copy.heading} className="reveal my-12 rounded-2xl bg-gray-950 px-6 py-7 text-white sm:my-14 sm:px-8 sm:py-9">
      <p className="text-overline text-heritage-turquoise-light">{brandLine}</p>
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

/** Download prompt box, shared by marker-based and plain-link downloads. */
export function DownloadAside({ note, href, label }: { note: ReactNode; href: string; label: ReactNode }) {
  return <aside className="my-6 rounded-xl border border-heritage-sand bg-heritage-ivory p-4 sm:p-5"><p className="text-sm leading-6 text-gray-700">{note}</p><a href={href} download className={`mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focusRing}`}>{label}<span aria-hidden="true">↓</span></a></aside>;
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

type HastNode = { type: string; tagName?: string; properties?: { href?: unknown }; children?: HastNode[] };

function isDownloadHref(href: unknown): href is string {
  return typeof href === 'string' && href.startsWith('/downloads/');
}

export function ServiceArticlePage({ article, config, related, relatedPosts }: { article: ServiceArticleData; config: ServiceArticleConfig; related?: ServiceArticleRelated | null; relatedPosts?: ServiceArticleRelated[] }) {
  const blogListingPath = serviceBlogPath(config);
  const articleUrl = `${SITE_URL}${blogListingPath}/${article.slug}`;
  const toc = getTableOfContents(article.body);
  // Reading time counts the visible prose only, not CTA/visual markers.
  const readingMinutes = Math.max(1, Math.ceil(article.body.replace(/\[\[[A-Z_]+(?::[a-z]+)?\]\]/g, '').split(/\s+/).length / 200));
  const updated = article.dateModified !== article.datePublished;
  // The title sits beside the cover on desktop; longer titles get a smaller
  // size so they stay inside the image's empty left area.
  const longTitle = article.title.length > 56;

  const markdownComponents: Components = {
    h2: ({ children }) => {
      const text = readHeadingText(children);
      return <h2 id={headingId(text)} className="mt-14 scroll-mt-[calc(var(--navbar-h,88px)+5.5rem)] border-t border-heritage-sand pt-10 text-2xl font-semibold leading-tight tracking-tight text-gray-950 first:mt-0 first:border-t-0 first:pt-0 sm:mt-16 sm:pt-12 sm:text-3xl lg:scroll-mt-[calc(var(--navbar-h,88px)+2rem)]">{children}</h2>;
    },
    h3: ({ children }) => {
      const text = readHeadingText(children);
      return <h3 id={headingId(text)} className="mt-10 scroll-mt-[calc(var(--navbar-h,88px)+5.5rem)] text-xl font-semibold leading-snug text-gray-900 lg:scroll-mt-[calc(var(--navbar-h,88px)+2rem)]">{children}</h3>;
    },
    p: ({ node, children }) => {
      const text = readHeadingText(children).trim();
      const cta = text.match(/^\[\[PAKSOFT_CTA:(early|middle|closing)\]\]$/);
      if (cta) return <ArticleCta stage={cta[1] as CtaStage} copy={config.ctas[cta[1] as CtaStage]} brandLine={config.brandLine} />;
      if (/^\[\[[A-Z_]+(?::[a-z-]+)?\]\]$/.test(text)) return <>{config.renderMarker?.(text, article) ?? null}</>;

      const hastChildren = (node as HastNode | undefined)?.children ?? [];
      // A paragraph holding only an image becomes a figure (no <figure> in <p>).
      const meaningful = hastChildren.filter((child) => !(child.type === 'text' && !String((child as { value?: string }).value ?? '').trim()));
      if (meaningful.length === 1 && meaningful[0].tagName === 'img') return <>{children}</>;
      // "Sentence … [Download label](/downloads/file.csv)" → download box.
      if (hastChildren.some((child) => child.tagName === 'a' && isDownloadHref(child.properties?.href))) {
        const parts = Children.toArray(children);
        const link = parts.find((child) => isValidElement<{ href?: string; children?: ReactNode }>(child) && isDownloadHref(child.props.href)) as React.ReactElement<{ href: string; children?: ReactNode }> | undefined;
        if (link) return <DownloadAside note={parts.filter((child) => child !== link)} href={link.props.href} label={link.props.children} />;
      }
      return <p className="mt-5 text-base leading-7 text-gray-700 sm:text-[1.0625rem] sm:leading-8">{children}</p>;
    },
    img: ({ src, alt = '' }) => typeof src === 'string' && src ? (
      <figure className="reveal my-10 overflow-hidden rounded-2xl border border-heritage-sand bg-white sm:my-12">
        {/* eslint-disable-next-line @next/next/no-img-element -- Markdown images have no intrinsic size; plain lazy <img> avoids layout guesses */}
        <img src={src} alt={alt} loading="lazy" decoding="async" className="block h-auto w-full" />
      </figure>
    ) : null,
    a: ({ href = '', children }) => {
      const className = 'font-medium text-heritage-turquoise-deep underline decoration-heritage-turquoise/40 underline-offset-4 hover:decoration-heritage-turquoise focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise';
      if (href.startsWith('/downloads/')) return <a href={href} download className={className}>{children}</a>;
      return href.startsWith('/') ? <Link href={href} className={className}>{children}</Link> : <a href={href} className={className}>{children}</a>;
    },
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    table: ({ children }) => <div className="my-8 max-w-full overflow-x-auto rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise" tabIndex={0} role="region" aria-label="Yatay kaydırılabilir tablo"><table className="w-full min-w-[36rem] border-collapse text-left text-sm">{children}</table></div>,
    thead: ({ children }) => <thead className="bg-heritage-turquoise-light text-gray-900">{children}</thead>,
    th: ({ children }) => <th scope="col" className="border-b border-gray-200 px-4 py-3 font-semibold">{children}</th>,
    td: ({ children }) => <td className="border-b border-gray-100 px-4 py-3 align-top leading-6 text-gray-700">{children}</td>,
    // GFM task lists ("- [ ]") render as a readable checklist rather than
    // disabled form controls; nothing here is submitted or stored.
    ul: ({ className, children }) => className?.includes('contains-task-list')
      ? <ul className="mt-6 space-y-3 rounded-xl border border-heritage-sand bg-heritage-ivory p-5 text-base leading-7 text-gray-700 sm:p-6">{children}</ul>
      : <ul className="mt-5 list-disc space-y-2.5 ps-6 text-base leading-7 text-gray-700 sm:text-[1.0625rem] sm:leading-8">{children}</ul>,
    ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2.5 ps-6 text-base leading-7 text-gray-700 sm:text-[1.0625rem] sm:leading-8">{children}</ol>,
    li: ({ className, children }) => className?.includes('task-list-item')
      ? <li className="flex items-start gap-3">{children}</li>
      : <li className="ps-1">{children}</li>,
    input: () => <span aria-hidden="true" className="mt-1.5 h-4 w-4 shrink-0 rounded-sm border-2 border-heritage-turquoise bg-white" />,
    blockquote: ({ children }) => <blockquote className="mt-6 border-s-4 border-heritage-turquoise bg-heritage-turquoise-light/60 px-5 py-3 text-gray-800">{children}</blockquote>,
    hr: () => <hr className="border-heritage-sand" />,
  };

  const crumbLink = 'underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise';

  return <main className="min-h-screen bg-white">
    <ReadingProgress targetId="article-body" />
    <ArticleJsonLd
      headline={article.title}
      description={article.metaDescription}
      url={articleUrl}
      image={`${SITE_URL}${article.coverImage}`}
      datePublished={article.datePublished}
      dateModified={article.dateModified}
      section={config.jsonLdSection ?? article.category}
      keywords={article.keywords}
      inLanguage="tr-TR"
    />
    <BreadcrumbJsonLd items={[
      { name: 'Ana Sayfa', url: `${SITE_URL}/tr` },
      { name: 'Hizmetler', url: `${SITE_URL}/tr/hizmetler` },
      { name: config.serviceName, url: `${SITE_URL}${config.servicePath}` },
      { name: config.blogLabel, url: `${SITE_URL}${blogListingPath}` },
      { name: article.title, url: articleUrl },
    ]} />

    <section className="bg-white pb-6 pt-24 sm:pb-8 sm:pt-32 lg:pt-40">
      <div className="container mx-auto max-w-6xl px-4">
        <nav aria-label="İçerik yolu" className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600 sm:text-sm">
          <Link href="/tr" className={crumbLink}>Ana Sayfa</Link><span aria-hidden="true">/</span>
          <Link href="/tr/hizmetler" className={crumbLink}>Hizmetler</Link><span aria-hidden="true">/</span>
          <Link href={config.servicePath} className={crumbLink}>{config.serviceName}</Link><span aria-hidden="true">/</span>
          <Link href={blogListingPath} className={crumbLink}>{config.blogLabel}</Link><span aria-hidden="true">/</span>
          <span aria-current="page" className="text-gray-800">{article.title}</span>
        </nav>
        <div className="relative isolate overflow-hidden rounded-xl border border-heritage-sand bg-background-gray shadow-sm sm:rounded-2xl">
          {/* Same CSS entrance as the service heroes (hero-enter): visible in the
              server HTML, animated at first paint, disabled for reduced motion.
              The cover image is not animated so it never delays the LCP. */}
          <div className="hero-enter relative z-20 px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[45%] lg:flex-col lg:justify-center lg:px-10 lg:pb-10 lg:pt-24 xl:px-12">
            <p className="flex items-center gap-2 text-overline font-semibold text-heritage-turquoise-deep"><span aria-hidden="true" className="h-px w-8 bg-heritage-turquoise" />{article.category}</p>
            <h1 className={`text-display mt-2 max-w-[30rem] font-medium leading-[1.08] text-gray-950 ${longTitle ? '!text-[clamp(1.75rem,2.6vw,2.6rem)] lg:max-w-none' : 'text-[clamp(2rem,3vw,2.9rem)]'}`}>{article.title}</h1>
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

    <section className="py-8 sm:py-14 lg:py-16">
      <div className="container mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
        <details className="sticky z-30 rounded-xl border border-heritage-sand bg-heritage-ivory/95 p-4 shadow-sm backdrop-blur lg:hidden" style={{ top: 'calc(var(--reading-top, var(--navbar-h, 88px)) + 0.75rem)' }}>
          <summary className="cursor-pointer font-semibold text-gray-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Bu yazıda</summary>
          <div className="max-h-[55vh] overflow-y-auto"><ArticleToc items={toc} onNavigate="close-details" /></div>
        </details>
        <nav aria-label="Bu yazıda" className="hidden max-h-[calc(100vh-var(--reading-top,var(--navbar-h,88px))-3rem)] self-start overflow-y-auto rounded-xl border border-heritage-sand bg-heritage-ivory p-5 lg:sticky lg:top-[calc(var(--reading-top,var(--navbar-h,88px))+1.5rem)] lg:block">
          <p className="font-semibold text-gray-900">Bu yazıda</p>
          <ArticleToc items={toc} />
        </nav>
        <article id="article-body" className="min-w-0 max-w-3xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{article.body}</ReactMarkdown>

          {(relatedPosts?.length || related) ? <section aria-labelledby="related-reading" className="mt-16 border-t border-gray-200 pt-10">
            <h2 id="related-reading" className="text-xl font-semibold text-gray-950">İlgili rehberler</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {(relatedPosts?.length ? relatedPosts : related ? [related] : []).map((item) => <Link key={item.slug} href={`${blogListingPath}/${item.slug}`} className={`reveal corporate-info-card group grid h-full overflow-hidden rounded-xl border border-gray-200 bg-white sm:grid-cols-[10rem_1fr] ${focusRing}`}>
                <span className="relative block aspect-video bg-background-gray sm:aspect-auto">
                  <Image src={item.coverImage} alt="" fill loading="lazy" sizes="(max-width: 640px) 100vw, 160px" className="object-cover object-right" />
                </span>
                <span className="block p-5">
                  <span className="text-overline text-heritage-turquoise-deep">{item.category}</span>
                  <span className="mt-1 block font-semibold leading-snug text-gray-950">{item.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-gray-600">{item.excerpt}</span>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep">Rehberi okuyun<ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" /></span>
                </span>
              </Link>)}
            </div>
          </section> : null}

          <nav aria-label="Rehber gezinmesi" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link href={blogListingPath} className={`inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focusRing}`}><ArrowRightIcon className="h-4 w-4 rotate-180" aria-hidden="true" />{config.allGuidesLabel}</Link>
            <Link href={config.servicePath} className={`inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focusRing}`}>{config.overviewLabel}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
          </nav>
        </article>
      </div>
    </section>
  </main>;
}
