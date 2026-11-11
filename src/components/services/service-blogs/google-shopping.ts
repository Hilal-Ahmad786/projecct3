import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/google-shopping/manifest.json';

const servicePath = '/tr/hizmetler/google-shopping';
const enquiryPath = '/tr/start-project?service=google-shopping';

export const googleShoppingBlog: ServiceBlogDefinition = {
  config: {
    serviceName: 'Google Alışveriş Reklamları', servicePath, blogLabel: 'Google Alışveriş Reklam Rehberleri', brandLine: 'PakSoft · Google Alışveriş',
    allGuidesLabel: 'Tüm Google Alışveriş rehberleri', overviewLabel: 'Google Alışveriş reklamlarına genel bakış', jsonLdSection: 'Google Alışveriş Reklam Rehberleri',
    ctas: {
      early: { heading: 'Mağazanız için doğru başlangıcı belirleyin', text: 'Öne çıkarmak istediğiniz ürün grubunu ve mağaza altyapınızı paylaşın.', primary: { label: 'Alışveriş Reklamı Teklifi Al', href: enquiryPath }, secondary: { label: 'Google Alışveriş Hizmetini İncele', href: servicePath } },
      middle: { heading: 'Ürün verisi ve kampanya kapsamını birlikte değerlendirelim', text: 'Mağaza adresinizi ve Merchant Center’da gördüğünüz durumu paylaşın.', primary: { label: 'Kataloğumu Görüşelim', href: enquiryPath }, secondary: { label: 'Ürün Verisi Kontrollerini İncele', href: `${servicePath}/ozellikler` } },
      closing: { heading: 'Google Alışveriş çalışmanız için ilk adımı belirleyelim', text: 'Katalog, kampanya ve satın alma ölçümü ihtiyaçlarınızı birlikte değerlendirelim.', primary: { label: 'Alışveriş Reklamı Teklifi Al', href: enquiryPath }, secondary: { label: 'Fiyatlandırmayı İncele', href: `${servicePath}/fiyatlandirma` } },
    },
  },
  defaultCategoryLabel: 'Google Alışveriş Rehberi',
  articles: manifest,
};

export function getGoogleShoppingGuides() {
  return manifest.map((entry) => ({ ...entry, title: entry.heading }));
}

export function getGoogleShoppingGuide(slug: string) {
  const entry = manifest.find((item) => item.slug === slug);
  if (!entry) return null;
  return {
    ...entry,
    title: entry.heading,
    metaTitle: entry.title,
    tags: entry.tags,
    content: readFileSync(join(process.cwd(), 'content/blog/google-shopping', `${entry.slug}.md`), 'utf8'),
    publishedAt: undefined,
    updatedAt: undefined,
    language: 'tr',
  };
}
