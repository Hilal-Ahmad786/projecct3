import type { ReactNode } from 'react';

/**
 * "Bu sayfada" strip under a long service hero: plain in-page anchors (crawlable,
 * no JS), horizontally scrollable on phones instead of wrapping into a tall block.
 */
export default function PageJumpNav({ items, mark, label = 'Bu sayfada' }: { items: { href: string; label: string }[]; mark?: ReactNode; label?: string }) {
  return (
    <nav aria-label={label} className="border-y border-heritage-sand bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3 sm:px-6">
        <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">{mark}{label}</span>
        <ul className="-my-1 flex min-w-0 flex-1 gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map(({ href, label: text }) => (
            <li key={href} className="shrink-0">
              <a href={href} className="inline-flex min-h-9 items-center rounded-full border border-heritage-sand bg-heritage-ivory/60 px-3.5 text-sm font-medium text-gray-700 transition-colors hover:border-heritage-turquoise hover:bg-heritage-turquoise-light hover:text-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise motion-reduce:transition-none">{text}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/** Stable anchor id from a Turkish section title (used when a section has no explicit id). */
export function sectionId(title: string) {
  const map: Record<string, string> = { ç: 'c', ğ: 'g', ı: 'i', İ: 'i', ö: 'o', ş: 's', ü: 'u', Ç: 'c', Ğ: 'g', Ö: 'o', Ş: 's', Ü: 'u' };
  return title.replace(/[çğıİöşüÇĞÖŞÜ]/g, (c) => map[c]).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60).replace(/-+$/, '');
}

/**
 * Section heading block. With `aside`, the H2 + intro sit beside the visual on
 * large screens instead of the visual hanging under the text with an empty
 * right half; on phones it stacks as before.
 */
export function SectionHead({ title, intro, aside }: { title: ReactNode; intro?: ReactNode; aside?: ReactNode }) {
  const heading = <h2 className="reveal max-w-4xl text-headline font-medium leading-tight text-gray-900">{title}</h2>;
  const lead = intro ? <p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">{intro}</p> : null;
  if (!aside) return <>{heading}{lead}</>;
  return (
    <div className="grid gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-x-12">
      <div>{heading}{lead}</div>
      <div className="min-w-0">{aside}</div>
    </div>
  );
}
