import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Children, Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import Link from '@/components/IntentLink';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import { trTitleCase } from '@/lib/tr-title-case';
import PageJumpNav, { SectionHead, sectionId } from './PageJumpNav';

// Shared engine for the markdown-driven Turkish service pages (custom
// e-commerce, pazaryeri). Copy lives in content/<service>/tr/<page>.md; each
// `##` block becomes a page section in the ikas/Shopify rhythm (tones, Title
// Case H2, jump bar, cards, visuals, closing links + CTA). Conventions:
//   ### groups → cards · `### 1. …` groups → numbered steps · `### …?` groups →
//   FAQ list (also FAQPage JSON-LD) · `::cta text | button` → inline CTA box.

export type Sub = { title: string; body: string };
export type Chunk = { title: string; intro: string; subs: Sub[] };

const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';
const linkClass = `font-semibold text-heritage-turquoise-deep underline decoration-heritage-turquoise/40 underline-offset-4 hover:decoration-heritage-turquoise ${focus}`;

export const stripNumber = (title: string) => title.replace(/^\d+\.\s*/, '').trim();
export const lowerTr = (s: string) => s.toLocaleLowerCase('tr');
/** Prefix lookup on a section title (Turkish-aware, case-insensitive). */
export const matchPrefix = <T,>(list: [string, T][] | undefined, title: string) => list?.find(([prefix]) => lowerTr(title).startsWith(lowerTr(prefix)))?.[1];

export function readServiceChunks(dir: string, page: string): Chunk[] {
  const markdown = readFileSync(join(process.cwd(), dir, `${page}.md`), 'utf8');
  const chunks: Chunk[] = [];
  for (const line of markdown.split('\n')) {
    if (line.startsWith('## ')) { chunks.push({ title: stripNumber(line.slice(3)), intro: '', subs: [] }); continue; }
    const chunk = chunks.at(-1);
    if (!chunk) continue;
    if (line.startsWith('### ')) { chunk.subs.push({ title: line.slice(4).trim(), body: '' }); continue; }
    const sub = chunk.subs.at(-1);
    if (sub) sub.body += `${line}\n`; else chunk.intro += `${line}\n`;
  }
  return chunks.map((c) => ({ ...c, intro: c.intro.trim(), subs: c.subs.map((s) => ({ ...s, body: s.body.trim() })) }));
}

const isFaqChunk = (c: Chunk) => c.subs.length > 0 && c.subs.every((s) => s.title.endsWith('?'));
const isStepChunk = (c: Chunk) => c.subs.length > 1 && c.subs.every((s) => /^\d+\./.test(s.title));
const plain = (md: string) => md.replace(/\*\*|__|\[([^\]]+)\]\([^)]*\)/g, (_m, text) => text ?? '').replace(/\s+/g, ' ').trim();

/** Q&A pairs for FAQPage JSON-LD (visible text, same wording). */
export function serviceFaqItems(chunks: Chunk[]) {
  return chunks.filter(isFaqChunk).flatMap((c) => c.subs.map((s) => ({ question: s.title, answer: plain(s.body.replace(/^::cta .*$/gm, '')) })));
}

/* ---------------------------------------------------------------- markdown */

/** Tag list items with their list kind/number so `li` can draw a tick or a step number. */
function markItems(children: ReactNode, kind: 'ul' | 'ol') {
  let n = 0;
  return Children.map(children, (child) => isValidElement(child) ? cloneElement(child as ReactElement<Record<string, unknown>>, { 'data-kind': kind, 'data-index': ++n }) : child);
}

const md: Components = {
  p: ({ children }) => <p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600 first:mt-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  ul: ({ children }) => <ul className="mt-4 grid max-w-4xl gap-2.5 sm:grid-cols-2">{markItems(children, 'ul')}</ul>,
  ol: ({ children }) => <ol className="mt-4 max-w-3xl space-y-2.5">{markItems(children, 'ol')}</ol>,
  li: (props) => {
    const { children, 'data-kind': kind, 'data-index': index } = props as { children?: ReactNode; 'data-kind'?: string; 'data-index'?: number };
    return <li className="flex gap-3 rounded-lg border border-heritage-sand bg-white px-4 py-3 text-sm leading-6 text-gray-700">{kind === 'ol'
      ? <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-heritage-turquoise-light text-xs font-semibold text-heritage-turquoise-deep">{index}</span>
      : <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-heritage-turquoise-deep" aria-hidden="true" />}<span>{children}</span></li>;
  },
  a: ({ href, children }) => href?.startsWith('/') ? <Link href={href} className={linkClass}>{children}</Link> : <a href={href} className={linkClass}>{children}</a>,
  table: ({ children }) => <div role="region" aria-label="İçerik tablosu" tabIndex={0} className={`mt-6 overflow-x-auto rounded-xl border border-heritage-sand bg-white ${focus}`}><table className="w-full min-w-[620px] border-collapse text-left text-sm">{children}</table></div>,
  thead: ({ children }) => <thead className="bg-heritage-ivory">{children}</thead>,
  tr: ({ children }) => <tr className="even:bg-gray-50/70">{children}</tr>,
  th: ({ children }) => <th scope="col" className="border-b border-heritage-sand px-4 py-3 font-semibold text-gray-900">{children}</th>,
  td: ({ children }) => <td className="border-b border-gray-100 px-4 py-3 align-top leading-6 text-gray-700 first:font-medium first:text-gray-900">{children}</td>,
  blockquote: ({ children }) => <blockquote className="mt-5 max-w-3xl border-s-4 border-heritage-turquoise bg-heritage-ivory p-5 text-sm leading-7 text-gray-700">{children}</blockquote>,
};
const inline: Components = { ...md, p: ({ children }) => <>{children}</> };

function Md({ children, components = md }: { children: string; components?: Components }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{children}</ReactMarkdown>;
}

/** Markdown with `::cta text | button` lines turned into inline CTA boxes. */
function Blocks({ text, enquiry }: { text: string; enquiry: string }) {
  if (!text) return null;
  const parts = text.split(/^(::cta .*)$/m).map((part) => part.trim()).filter(Boolean);
  return <>{parts.map((part, i) => {
    if (!part.startsWith('::cta ')) return <div key={i} className="mt-4 first:mt-0"><Md>{part}</Md></div>;
    const [copy, button = 'Projemi Paylaş'] = part.slice(6).split('|').map((x) => x.trim());
    return <div key={i} data-custom-ecom-reveal className="mt-7 flex max-w-4xl flex-col gap-4 rounded-xl border border-heritage-turquoise/30 bg-heritage-turquoise-light/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><p className="text-sm font-medium leading-6 text-gray-800">{copy}</p><Link href={enquiry} className={`inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-sm bg-heritage-turquoise-deep px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise sm:self-auto ${focus}`}>{button}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></div>;
  })}</>;
}

/* ---------------------------------------------------------------- sections */

export const SECTION_TONES = ['gray', 'white', 'ivory'] as const;
export type SectionTone = (typeof SECTION_TONES)[number];
const toneClass = { gray: 'bg-background-gray', white: 'bg-white', ivory: 'bg-heritage-ivory' } as const;

export type SectionVisual = { place: 'aside' | 'below'; node: ReactNode };

export interface ServiceMdConfig<P extends string> {
  enquiry: string;
  /** Visual for a section, looked up by page + H2 title. */
  visual?: (page: P, title: string) => SectionVisual | undefined;
  /** Optional art + badge on the cards of a page (e.g. Portföy scenarios). */
  card?: (page: P, index: number) => { art?: ReactNode; badge?: string } | undefined;
  jumpLabel: (title: string) => string;
  jumpMark: ReactNode;
  /** Extra section (e.g. a real case study) after the H2 matching `after`, or first when `after` is null. */
  insert?: (page: P) => { after: string | null; node: ReactNode; jump: { href: string; label: string } } | undefined;
  /** Closing blocks after the last section (related pages, CTA). */
  footer: (page: P, tone: SectionTone) => ReactNode;
}

function SubGroup<P extends string>({ chunk, page, config }: { chunk: Chunk; page: P; config: ServiceMdConfig<P> }) {
  if (!chunk.subs.length) return null;
  const { enquiry } = config;
  if (isFaqChunk(chunk)) {
    return <div className="mt-6 max-w-4xl divide-y divide-heritage-sand border-y border-heritage-sand">{chunk.subs.map((s) => <div key={s.title} className="py-5"><h3 className="text-base font-semibold text-gray-900">{s.title}</h3><div className="mt-2 [&_p]:text-sm [&_p]:leading-6"><Blocks text={s.body} enquiry={enquiry} /></div></div>)}</div>;
  }
  if (isStepChunk(chunk)) {
    return <ol className={`mt-6 grid gap-4 md:grid-cols-2 ${chunk.subs.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>{chunk.subs.map((s, i) => <li key={s.title} data-custom-ecom-reveal data-custom-ecom-delay={Math.min(i, 5) * 45} className="flex flex-col rounded-xl border border-heritage-sand bg-white p-5"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-heritage-turquoise-light text-sm font-semibold text-heritage-turquoise-deep">{i + 1}</span><h3 className="mt-3 text-base font-semibold text-gray-900">{stripNumber(s.title)}</h3><div className="mt-2 [&_p]:mt-2 [&_p]:text-sm [&_p]:leading-6"><Md>{s.body}</Md></div></li>)}</ol>;
  }
  const cols = chunk.subs.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
  return <div className={`mt-6 grid gap-4 sm:grid-cols-2 ${cols}`}>{chunk.subs.map((s, i) => {
    const card = config.card?.(page, i);
    return <article key={s.title} data-custom-ecom-reveal data-custom-ecom-delay={Math.min(i, 5) * 45} className="flex h-full flex-col rounded-xl border border-heritage-sand bg-white p-5">{card?.art}{card?.badge && <span className="mb-3 self-start rounded-full bg-heritage-ivory px-2.5 py-1 text-xs font-semibold text-gray-600">{card.badge}</span>}<h3 className="text-base font-semibold leading-snug text-gray-900">{s.title}</h3><div className="mt-2 [&_p]:mt-2 [&_p]:text-sm [&_p]:leading-6"><Blocks text={s.body} enquiry={enquiry} /></div></article>;
  })}</div>;
}

function ChunkSection<P extends string>({ chunk, page, index, config }: { chunk: Chunk; page: P; index: number; config: ServiceMdConfig<P> }) {
  const tone = SECTION_TONES[index % SECTION_TONES.length];
  const visual = config.visual?.(page, chunk.title);
  // With a side visual, the first plain paragraph becomes the heading intro.
  let lead: string | undefined; let rest = chunk.intro;
  if (visual?.place === 'aside') {
    const [first, ...others] = chunk.intro.split(/\n\s*\n/);
    if (first && !/^(\||-|\d+\.|::cta|>)/.test(first.trim())) { lead = first; rest = others.join('\n\n'); }
  }
  return (
    <section id={sectionId(chunk.title)} className={`${toneClass[tone]} scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)]`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 cw-section">
        <SectionHead title={trTitleCase(chunk.title)} intro={lead ? <Md components={inline}>{lead}</Md> : undefined} aside={visual?.place === 'aside' ? visual.node : undefined} />
        {rest && <div className="mt-5"><Blocks text={rest} enquiry={config.enquiry} /></div>}
        {visual?.place === 'below' && visual.node}
        <SubGroup chunk={chunk} page={page} config={config} />
      </div>
    </section>
  );
}

export function ServiceMdBody<P extends string>({ page, chunks, config, jumpTitle }: { page: P; chunks: Chunk[]; config: ServiceMdConfig<P>; jumpTitle?: 'raw' }) {
  const insert = config.insert?.(page);
  const insertAt = insert ? (insert.after === null ? 0 : chunks.findIndex((c) => lowerTr(c.title).startsWith(lowerTr(insert.after as string))) + 1) : -1;
  const jump = chunks.map((c) => ({ href: `#${sectionId(c.title)}`, label: jumpTitle === 'raw' ? c.title : config.jumpLabel(c.title) }));
  if (insert && insertAt >= 0) jump.splice(insertAt, 0, insert.jump);
  return <>
    <PageJumpNav label={jumpTitle === 'raw' ? 'SSS konuları' : 'Bu sayfada'} items={jump} mark={config.jumpMark} />
    {chunks.map((chunk, i) => <Fragment key={chunk.title}>{i === insertAt && insert?.node}<ChunkSection chunk={chunk} page={page} index={i} config={config} /></Fragment>)}
    {config.footer(page, SECTION_TONES[chunks.length % SECTION_TONES.length])}
  </>;
}
