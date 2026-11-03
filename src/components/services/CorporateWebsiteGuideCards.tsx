import ServiceGuideCards from '@/components/services/ServiceGuideCards';
import { corporateWebsiteArticleCards, corporateWebsiteArticlePath } from '@/data/corporate-website-article-cards';

const cards = corporateWebsiteArticleCards.map((article) => ({ ...article, href: corporateWebsiteArticlePath(article.slug) }));

// Cards for the Turkish corporate website guides (shared ServiceGuideCards look).
export default function CorporateWebsiteGuideCards({ headingLevel = 'h3', reveal = false }: { headingLevel?: 'h2' | 'h3'; reveal?: boolean }) {
  return <ServiceGuideCards cards={cards} headingLevel={headingLevel} reveal={reveal} />;
}
