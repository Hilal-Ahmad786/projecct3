import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { CtaCopy, CtaStage } from '@/components/services/ServiceArticle';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/instagram-ads/manifest.json';

const servicePath = '/tr/hizmetler/instagram-ads';
const enquiry = '/tr/start-project?service=instagram-ads';
const link = (label: string, href: string) => ({ label, href });
const cta = (heading: string, text: string, primary: string, secondary: [string, string]): CtaCopy => ({ heading, text, primary: link(primary, enquiry), secondary: link(...secondary) });
const defaultCta = cta('Instagram reklam planınızı birlikte değerlendirelim', 'Hedefinizi, web sitenizi ve mevcut kampanya durumunuzu paylaşın.', 'Instagram Reklam Teklifi Al', ['Hizmet kapsamını inceleyin', `${servicePath}/ozellikler`]);
const cardClass = 'my-5 overflow-hidden rounded-xl border border-heritage-sand bg-white';

const renderMarker = (_marker: string) => null;
const articleCtas: Record<string, Partial<Record<CtaStage, CtaCopy>>> = {};

const manifestEntries = manifest as Array<{ slug: string; title: string; heading: string; metaDescription: string; excerpt: string; featuredImage: string; imageAlt: string; categoryLabel: string; datePublished: string; tags?: string[] }>;
const readContent = (slug: string) => readFileSync(join(process.cwd(), 'content/blog/instagram-ads', `${slug}.md`), 'utf8');
const readingMinutes = (text: string) => Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 220));
const withCardFields = (entry: (typeof manifestEntries)[number]) => ({ ...entry, readingMinutes: readingMinutes(readContent(entry.slug)), datePublished: entry.datePublished });

export const instagramAdsBlog: ServiceBlogDefinition = {
  config: { serviceName: 'Instagram Reklam Yönetimi', servicePath, blogLabel: 'Instagram Reklam Rehberleri', brandLine: 'PakSoft · Instagram Reklamları', allGuidesLabel: 'Tüm Instagram reklam rehberleri', overviewLabel: 'Instagram reklam yönetimini inceleyin', renderMarker, ctas: { early: defaultCta, middle: defaultCta, closing: defaultCta } },
  defaultCategoryLabel: 'Instagram Reklamları',
  articles: manifestEntries.map((entry) => ({ ...withCardFields(entry), ctas: articleCtas[entry.slug] })),
};

export function getInstagramAdsGuides() { return manifestEntries.map((entry) => ({ ...withCardFields(entry), title: entry.heading })); }
export function getInstagramAdsGuide(slug: string) {
  const entry = manifestEntries.find((item) => item.slug === slug);
  if (!entry) return null;
  const date = new Date(`${entry.datePublished}T12:00:00.000Z`);
  return { ...withCardFields(entry), title: entry.heading, metaTitle: entry.title, content: readContent(slug), publishedAt: date, updatedAt: undefined, language: 'tr' };
}
