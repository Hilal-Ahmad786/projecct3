import Link from '@/components/IntentLink';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import IkasVisual from '@/components/ikas/visuals/IkasVisual';
import { trTitleCase } from '@/lib/tr-title-case';
import { SectionHead, sectionId } from './PageJumpNav';
import { ShopifyHeroScene, ShopifyIcon, ShopifyPlatformNote } from './ShopifyMark';

export const SHOPIFY_TR_BASE = '/tr/hizmetler/shopify-development';
export const SHOPIFY_TR_ENQUIRY = '/tr/start-project?service=shopify-development';

export const shopifyFocus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';
export const shopifyLinkClass = `group inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${shopifyFocus}`;

/** Section shell shared with the e-commerce, corporate and ikas pages: same rhythm (cw-section) and Title Case H2. With `aside`, heading + intro sit beside the visual on large screens. */
export function ShopifySection({ id, title, tone = 'white', intro, aside, children }: { id?: string; title: string; tone?: 'white' | 'gray' | 'ivory'; intro?: ReactNode; aside?: ReactNode; children?: ReactNode }) {
  const background = tone === 'gray' ? 'bg-background-gray' : tone === 'ivory' ? 'bg-heritage-ivory' : 'bg-white';
  return <section id={id ?? sectionId(title)} className={`${background} scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)]`}><div className="mx-auto max-w-[1200px] px-4 sm:px-6 cw-section"><SectionHead title={trTitleCase(title)} intro={intro} aside={aside} />{children}</div></section>;
}

export function ShopifyIntro({ children }: { children: ReactNode }) { return <p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">{children}</p>; }

/** Route links prefetch on intent (hover/touch/focus); in-page anchors stay plain <a>. */
export function ShopifyLink({ href, children, className = shopifyLinkClass }: { href: string; children: ReactNode; className?: string }) {
  const arrow = <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true"/>;
  return href.startsWith('#') ? <a href={href} className={className}>{children}{arrow}</a> : <Link href={href} className={className}>{children}{arrow}</Link>;
}

export function ShopifyTable({ label, headers, rows }: { label: string; headers: string[]; rows: string[][] }) {
  return <div role="region" aria-label={label} tabIndex={0} className="mt-6 overflow-x-auto rounded-xl border border-heritage-sand bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise"><table className="w-full min-w-[640px] border-collapse text-left text-sm"><thead className="bg-heritage-ivory"><tr>{headers.map((header) => <th key={header} scope="col" className="border-b border-heritage-sand px-4 py-3 font-semibold text-gray-900">{header}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i} className="even:bg-gray-50/70">{row.map((cell, j) => <td key={j} className={`border-b border-gray-100 px-4 py-3 align-top leading-6 text-gray-700 ${j === 0 ? 'font-medium text-gray-900' : ''}`}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

/** Shared Codex section art with the Shopify mark in the platform slot. */
export function ShopifyVisual(props: Omit<ComponentProps<typeof IkasVisual>, 'mark'>) {
  return <IkasVisual {...props} mark={<><ShopifyIcon size={18} />Shopify</>} />;
}

export function ShopifyPageCTA({ title, description, primary, secondaryHref, secondary }: { title: string; description: string; primary: string; secondaryHref: string; secondary: string }) {
  return <section data-shopify-reveal className="bg-gray-950 text-white"><div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16"><span aria-hidden="true" className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg"><ShopifyIcon size={34} /></span><h2 className="text-headline font-medium">{trTitleCase(title)}</h2><p className="mt-4 text-body leading-relaxed text-gray-300">{description}</p><div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><Link href={SHOPIFY_TR_ENQUIRY} className={`group inline-flex min-h-11 items-center justify-center rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep ${shopifyFocus}`}>{primary}<ArrowRightIcon className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true"/></Link><Link href={secondaryHref} className={`group inline-flex min-h-11 items-center justify-center rounded-sm border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${shopifyFocus}`}>{secondary}<ArrowRightIcon className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true"/></Link></div></div></section>;
}

const primaryBtn = `inline-flex min-h-11 items-center justify-center rounded-sm bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 ${shopifyFocus}`;
const secondaryBtn = `inline-flex min-h-11 items-center justify-center rounded-sm border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-heritage-turquoise ${shopifyFocus}`;

/**
 * Standard hero for the Shopify sub-pages: green Shopify mark in the eyebrow,
 * rotating H1 (full heading stays the crawlable text), floating mark on the
 * scene, and the platform note below the actions.
 */
export function ShopifyHero({ crumb, eyebrow, heading, rotating, subtitle, primary, secondary, scope, scene }: {
  crumb: string; eyebrow: string; heading: string; rotating: { lead: string; words: string[] }; subtitle: string;
  primary: string; secondary: { href: string; label: string }; scope: string; scene: ReactNode;
}) {
  return <InternalPageHero
    serviceName="Shopify"
    accentWord={eyebrow}
    heading={heading}
    rotating={rotating}
    subtitle={subtitle}
    crumbs={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler', href: '/services' }, { label: 'Shopify Geliştirme', href: SHOPIFY_TR_BASE }, { label: crumb }]}
    eyebrowIcon={<ShopifyIcon size={26} />}
    eyebrowNormalCase
    actions={<><Link href={SHOPIFY_TR_ENQUIRY} className={primaryBtn}>{primary}<ArrowRightIcon className="ms-2 h-4 w-4" aria-hidden="true"/></Link><a href={secondary.href} className={secondaryBtn}>{secondary.label}</a></>}
    footnote={<div className="space-y-3"><p className="text-sm font-medium text-gray-600">{scope}</p><ShopifyPlatformNote /></div>}
    scene={<ShopifyHeroScene>{scene}</ShopifyHeroScene>}
  />;
}
