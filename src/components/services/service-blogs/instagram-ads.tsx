import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Image from 'next/image';
import type { CtaCopy, CtaStage } from '@/components/services/ServiceArticle';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/instagram-ads/manifest.json';

const servicePath = '/tr/hizmetler/instagram-ads';
const enquiry = '/tr/start-project?service=instagram-ads';
const link = (label: string, href: string) => ({ label, href });
const cta = (heading: string, text: string, primary: string, secondary: [string, string]): CtaCopy => ({ heading, text, primary: link(primary, enquiry), secondary: link(...secondary) });
const defaultCta = cta('Instagram reklam planınızı birlikte değerlendirelim', 'Hedefinizi, web sitenizi ve mevcut kampanya durumunuzu paylaşın.', 'Instagram Reklam Teklifi Al', ['Hizmet kapsamını inceleyin', `${servicePath}/ozellikler`]);
const cardClass = 'my-5 overflow-hidden rounded-xl border border-heritage-sand bg-white';

const diagrams: Record<string, { src: string; alt: string; caption: string; width: number; height: number }> = {
  '[[INSTAGRAM_DIAGRAM:checklist]]': {
    src: '/images/blog/instagram-ads/instagram-reklam-hazirlik-infografik.webp',
    alt: 'Instagram reklamı yayına alınmadan önce kontrol edilecek hedef, teklif, içerik, yönlendirme, ölçüm ve bütçe başlıkları.',
    caption: 'Reklam yayına alınmadan önce gözden geçirilebilecek hazırlık başlıkları.', width: 1122, height: 1402,
  },
  '[[INSTAGRAM_DIAGRAM:reelsbrief]]': {
    src: '/images/blog/instagram-ads/instagram-reels-cekim-plani-infografik.webp',
    alt: 'Reels çekim planı için hedef kitle, ihtiyaç, mesaj, sahne, eylem ve yayın öncesi kontrol soruları.',
    caption: 'Çekimden önce yanıtlanabilecek altı planlama sorusu.', width: 1122, height: 1402,
  },
  '[[INSTAGRAM_DIAGRAM:scopechoice]]': {
    src: '/images/blog/instagram-ads/instagram-gonderi-one-cikarma-infografik.webp',
    alt: 'Mevcut bir gönderiyi tanıtma ile düzenli reklam yönetimini hazırlık, hedef, içerik ve sonuç takibi açısından karşılaştıran infografik.',
    caption: 'Öne çıkarma ve reklam yönetimi farklı kapsamları olan, hedefe göre değerlendirilen yaklaşımlardır.', width: 1122, height: 1402,
  },
};
const renderMarker = (marker: string) => {
  const diagram = diagrams[marker];
  if (!diagram) return null;
  return <figure className="my-10 overflow-hidden rounded-2xl border border-heritage-sand bg-white">
    <Image src={diagram.src} alt={diagram.alt} width={diagram.width} height={diagram.height} sizes="(max-width: 768px) 100vw, 760px" className="block h-auto w-full" />
    <figcaption className="border-t border-heritage-sand px-4 py-3 text-sm text-gray-600 sm:px-5">{diagram.caption}</figcaption>
  </figure>;
};
const articleCtas: Record<string, Partial<Record<CtaStage, CtaCopy>>> = {
  'instagram-gonderi-one-cikarma-reklam-yonetimi-farki': {
    middle: {
      heading: 'İhtiyacınız tek bir tanıtım mı, düzenli reklam yönetimi mi?',
      text: 'Mevcut hesabınızı, içeriklerinizi ve hedefinizi PakSoft ile değerlendirin. Önce ihtiyaç duyduğunuz işleri, ardından çalışma kapsamını belirleyelim.',
      primary: link('Instagram reklam yönetimi hakkında bilgi alın', servicePath),
    },
  },
};

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
