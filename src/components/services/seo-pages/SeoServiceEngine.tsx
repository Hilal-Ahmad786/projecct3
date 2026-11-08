import type { ComponentType, ReactNode, SVGProps } from 'react';
import Link from '@/components/IntentLink';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import ServiceGuideCards from '@/components/services/ServiceGuideCards';
import { FAQJsonLd } from '@/components/seo/JsonLd';
import { trTitleCase } from '@/lib/tr-title-case';
import { BlogFeedScene, FaqScene } from '@/components/services/hero-visuals/scenes-internal';
import CustomEcommerceMotionScope from '@/components/e-commerce/CustomEcommerceMotionScope';
import PlatformPageLinks, { type Platform } from '@/components/e-commerce/PlatformPageLinks';
import { sectionId } from '@/components/e-commerce/PageJumpNav';
import { ServiceMdBody, matchPrefix, readServiceChunks, serviceFaqItems, type Chunk, type SectionVisual, type ServiceMdConfig } from '@/components/e-commerce/ServiceMarkdownPage';

// Shared engine for Turkish service pages using section markdown. Copy lives in content/<service>/tr/<page>.md and renders through
// ServiceMarkdownPage like the pazaryeri pages; each service supplies its
// metadata, section visuals, hero scenes and CTA wording. The last `##` block
// of a page ("Siteniz…", "Mağazanız…") becomes the dark closing CTA band.

export type SeoPageKind = 'overview' | 'features' | 'technologies' | 'process' | 'portfolio' | 'pricing' | 'faq' | 'blog';
export type SeoContentPage = Exclude<SeoPageKind, 'blog'>;
export type SeoSubPage = Exclude<SeoPageKind, 'overview' | 'blog'>;
export type SeoMeta = { title: string; description: string; heading: string; intro: string };
type Guide = { slug: string; title: string; categoryLabel: string; excerpt: string; featuredImage: string; imageAlt?: string; datePublished?: string | null };

export interface SeoServiceConfig {
  platform: Extract<Platform, 'seo' | 'ecommerce-seo' | 'technical-seo' | 'google-ads'>;
  contentDir: string;
  base: string;
  enquiry: string;
  serviceName: string;
  /** Extra breadcrumb between "Hizmetler" and this service (e.g. SEO Hizmeti). */
  parentCrumb?: { label: string; href: string };
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  metadata: Record<SeoPageKind, SeoMeta>;
  visuals: Partial<Record<SeoContentPage, [string, SectionVisual][]>>;
  heroArt: Record<Exclude<SeoSubPage, 'faq'>, () => ReactNode>;
  rotating: Record<SeoSubPage | 'blog', { lead: string; words: string[] }>;
  primary: Record<SeoPageKind, string>;
  /** Hero secondary button: label + anchor ('' = first section). */
  secondary: Record<SeoSubPage, [string, string]>;
  closingLink: Record<SeoContentPage, [string, string]>;
  closingDefault: { title: string; text: string };
  jumpLabels: [string, string][];
  sectionIds: Record<string, string>;
  portfolioBadge?: string;
  blog: { id: string; title: string; text: string; asideTitle: string; asideText: string; guides: () => Guide[] };
}

const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';
const primaryClass = `inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise ${focus}`;
const secondaryClass = `inline-flex min-h-11 items-center justify-center rounded-sm border border-heritage-sand bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-heritage-turquoise ${focus}`;

// "Siteniz için…", "Sitenizin…", "Mağazanız için…", "Kendi siteniz için…"
const isClosing = (chunk: Chunk) => chunk.subs.length === 0 && /^(kendi )?(siteniz|mağazanız)\S*\s/.test(chunk.title.toLocaleLowerCase('tr'));
/** Closing copy without the inline "inceleyin" link sentence (it becomes the secondary button). */
const closingText = (intro: string) => intro.replace(/\s*[^.!?]*\[[^\]]+\]\([^)]*\)[^.!?]*[.!?]?/g, '').replace(/\*\*/g, '').trim();

export function createSeoService(cfg: SeoServiceConfig) {
  const { base, enquiry, Icon, metadata } = cfg;

  function readPage(page: SeoContentPage) {
    const chunks = readServiceChunks(cfg.contentDir, page);
    const last = chunks.at(-1);
    return last && isClosing(last) ? { sections: chunks.slice(0, -1), closing: last } : { sections: chunks, closing: undefined };
  }

  function HeroScene({ children }: { children: ReactNode }) {
    return (
      <div className="relative w-full max-w-xl">
        {children}
        <div aria-hidden="true" data-ikas-loop={cfg.platform === 'google-ads' ? undefined : ''} className={`absolute -left-2 -top-14 z-20 rounded-[20px] bg-white p-3 shadow-[0_12px_30px_rgba(18,25,38,0.18)] ring-1 ring-black/5 sm:-left-6 ${cfg.platform === 'google-ads' ? '' : 'ikas-badge-float'} ${cfg.platform === 'google-ads' ? 'google-ads-hero-mark' : ''}`}>
          <Icon className="h-10 w-10 text-heritage-turquoise-deep sm:h-12 sm:w-12" />
        </div>
      </div>
    );
  }

  function ClosingCta({ page, closing }: { page: SeoContentPage; closing?: Chunk }) {
    const title = closing?.title ?? cfg.closingDefault.title;
    const text = closing ? closingText(closing.intro) : cfg.closingDefault.text;
    const [linkLabel, linkHref] = cfg.closingLink[page];
    return (
      <section data-custom-ecom-reveal className="bg-gray-950 text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16">
          <span aria-hidden="true" className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg"><Icon className="h-8 w-8 text-heritage-turquoise-deep" /></span>
          <h2 className="text-headline font-medium">{trTitleCase(title)}</h2>
          <p className="mt-4 text-body leading-relaxed text-gray-300">{text}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={enquiry} className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep ${focus}`}>{cfg.primary[page]}<ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" /></Link>
            <Link href={linkHref} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 ${focus}`}>{linkLabel}</Link>
          </div>
        </div>
      </section>
    );
  }

  const configFor = (closing?: Chunk): ServiceMdConfig<SeoContentPage> => ({
    enquiry,
    visual: (page, title) => matchPrefix(cfg.visuals[page], title),
    card: (page) => page === 'portfolio' && cfg.portfolioBadge ? { badge: cfg.portfolioBadge } : undefined,
    jumpLabel: (title) => matchPrefix(cfg.jumpLabels, title) ?? title.replace(/[?:].*$/, ''),
    jumpMark: <Icon className="h-3.5 w-3.5 text-heritage-turquoise-deep" />,
    sectionId: (page, title) => cfg.sectionIds[`${page}:${title}`],
    footer: (page, tone) => <><PlatformPageLinks platform={cfg.platform} current={page} tone={tone} /><ClosingCta page={page} closing={closing} /></>,
  });

  const iconChip = <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/5"><Icon className="h-5 w-5 text-heritage-turquoise-deep" aria-hidden="true" /></span>;
  const crumbs = (label?: string) => [
    { label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler', href: '/hizmetler' }, ...(cfg.parentCrumb ? [cfg.parentCrumb] : []),
    { label: cfg.serviceName, href: base }, ...(label ? [{ label }] : []),
  ];

  /** Overview body (the hero stays in ServiceDetailClient). */
  function OverviewBody() {
    const { sections, closing } = readPage('overview');
    const faqs = serviceFaqItems(sections);
    return <><CustomEcommerceMotionScope />{faqs.length > 0 && <FAQJsonLd faqs={faqs} />}<ServiceMdBody page="overview" chunks={sections} config={configFor(closing)} /></>;
  }

  function BlogListing() {
    const meta = metadata.blog;
    const cards = cfg.blog.guides().map((guide) => ({ slug: guide.slug, href: `${base}/blog/${guide.slug}`, title: guide.title, category: guide.categoryLabel, excerpt: guide.excerpt, image: guide.featuredImage, imageAlt: guide.imageAlt, publishedAt: guide.datePublished }));
    return <main className="min-h-screen bg-white">
      <CustomEcommerceMotionScope />
      <InternalPageHero serviceName={cfg.serviceName} accentWord={meta.heading} eyebrowNormalCase eyebrowIcon={iconChip} heading={meta.heading} rotating={cfg.rotating.blog} subtitle={meta.intro} crumbs={crumbs('Rehberler')}
        actions={<><a href={`#${cfg.blog.id}`} className={primaryClass}>Rehberleri İncele</a><Link href={enquiry} className={secondaryClass}>{cfg.primary.blog}</Link></>}
        scene={<HeroScene><BlogFeedScene showPublicationMeta={false} /></HeroScene>} />
      <section id={cfg.blog.id} className="bg-background-gray scroll-mt-[calc(var(--navbar-h,88px)+1rem)]"><div className="mx-auto max-w-[1200px] px-4 sm:px-6 cw-section">
        <h2 className="reveal max-w-4xl text-headline font-medium leading-tight text-gray-900">{trTitleCase(cfg.blog.title)}</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">{cfg.blog.text}</p>
        <div className="mt-7"><ServiceGuideCards cards={cards} /></div>
        <aside className="mt-9 flex flex-col gap-4 rounded-2xl border border-heritage-sand bg-heritage-ivory p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><h2 className="text-lg font-semibold text-gray-950">{cfg.blog.asideTitle}</h2><p className="mt-1 text-sm leading-6 text-gray-700">{cfg.blog.asideText}</p></div><Link href={enquiry} className={`${primaryClass} self-start sm:self-auto`}>{cfg.primary.blog}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></aside>
      </div></section>
      <PlatformPageLinks platform={cfg.platform} current="blog" tone="white" />
    </main>;
  }

  function Page({ page }: { page: Exclude<SeoPageKind, 'overview'> }) {
    if (page === 'blog') return <BlogListing />;
    const copy = metadata[page];
    const { sections, closing } = readPage(page);
    const faqs = serviceFaqItems(sections);
    const [secondaryLabel, secondaryHref] = cfg.secondary[page];
    const target = secondaryHref || (sections[0] ? `#${cfg.sectionIds[`${page}:${sections[0].title}`] ?? sectionId(sections[0].title)}` : '#');
    return <main className="min-h-screen bg-white">
      <CustomEcommerceMotionScope />
      {faqs.length > 0 && <FAQJsonLd faqs={faqs} />}
      <InternalPageHero
        eyebrowNormalCase
        eyebrowIcon={iconChip}
        serviceName={cfg.serviceName}
        accentWord={copy.heading}
        heading={copy.heading}
        rotating={cfg.rotating[page]}
        subtitle={copy.intro}
        scene={page === 'faq' ? <HeroScene><FaqScene /></HeroScene> : <HeroScene>{cfg.heroArt[page]()}</HeroScene>}
        crumbs={crumbs(copy.heading)}
        actions={<><Link href={enquiry} className={primaryClass}>{cfg.primary[page]}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link><a href={target} className={secondaryClass}>{secondaryLabel}</a></>}
      />
      <ServiceMdBody page={page} chunks={sections} config={configFor(closing)} jumpTitle={page === 'faq' ? 'raw' : undefined} />
    </main>;
  }

  return {
    Page,
    OverviewBody,
    getMeta: (page: SeoPageKind) => metadata[page],
    getSocialMeta: (page: SeoPageKind, canonicalUrl: string, image = '/images/og-image.jpg') => {
      const { title, description } = metadata[page];
      return {
        openGraph: { type: 'website' as const, title, description, url: canonicalUrl, siteName: 'PakSoft', locale: 'tr_TR', images: [{ url: image, width: 1200, height: 630, alt: title }] },
        twitter: { card: 'summary_large_image' as const, title, description, images: [image] },
      };
    },
  };
}
