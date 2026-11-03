import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export type ServiceGuideCard = {
  slug: string;
  href: string;
  title: string;
  category: string;
  excerpt: string;
  image?: string | null;
  imageAlt?: string;
  publishedAt?: string | null;
  readingMinutes?: number;
};

// Listing cards for every Turkish service guide (corporate, e-commerce, …).
// Each card is a single crawlable link; the title stays HTML text below the
// cover (never overlaid on the image) so it remains readable on narrow screens.
export default function ServiceGuideCards({ cards, headingLevel = 'h3', reveal = false, motionScope }: { cards: readonly ServiceGuideCard[]; headingLevel?: 'h2' | 'h3'; reveal?: boolean; motionScope?: 'ikas' }) {
  const Heading = headingLevel;
  const formattedDate = (date: string) => new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
  return (
    <ul className={`grid gap-5 md:grid-cols-2 ${reveal ? 'reveal-group' : ''}`}>
      {cards.map((article, index) => (
        <li key={article.slug}>
          <Link
            href={article.href}
            data-ikas-reveal={motionScope ? '' : undefined}
            data-ikas-delay={motionScope ? index * 65 : undefined}
            className={`corporate-info-card group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 ${motionScope ? 'ikas-card-motion' : ''}`}
          >
            {article.image ? <span className="relative block aspect-[1672/941] overflow-hidden bg-background-gray">
              <Image
                src={article.image}
                alt={article.imageAlt ?? ''}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </span> : null}
            <span className="flex flex-1 flex-col p-5 sm:p-6">
              <span className="text-overline text-heritage-turquoise-deep">{article.category}</span>
              <Heading className="mt-2 text-lg font-semibold leading-snug text-gray-950 sm:text-xl">{article.title}</Heading>
              {(article.publishedAt || article.readingMinutes) && <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                {article.publishedAt && <time dateTime={article.publishedAt}>{formattedDate(article.publishedAt)}</time>}
                {article.readingMinutes && <span>Yaklaşık {article.readingMinutes} dk okuma</span>}
              </span>}
              <span className="mt-2 block flex-1 text-sm leading-6 text-gray-600">{article.excerpt}</span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep">
                Rehberi okuyun
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
