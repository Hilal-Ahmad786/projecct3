import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Image from 'next/image';
import type { CtaCopy, CtaStage } from '@/components/services/ServiceArticle';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/facebook-ads/manifest.json';

const servicePath = '/tr/hizmetler/facebook-ads';
const enquiry = '/tr/start-project?service=facebook-ads';
const link = (label: string, href: string) => ({ label, href });
const cta = (heading: string, text: string, primary: string, secondary: [string, string]): CtaCopy => ({ heading, text, primary: link(primary, enquiry), secondary: link(...secondary) });
const defaultCta = cta('Facebook reklam planınızı birlikte değerlendirelim', 'Hedefinizi, web sitenizi ve mevcut kampanya durumunuzu paylaşın.', 'Facebook Reklam Teklifi Al', ['Hizmet kapsamını inceleyin', `${servicePath}/ozellikler`]);
const cardClass = 'my-5 overflow-hidden rounded-xl border border-heritage-sand bg-white';

function Infographic({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return <figure className={`${cardClass} bg-heritage-ivory p-3 sm:p-5`}>
    <Image src={src} alt={alt} width={1600} height={1050} sizes="(max-width: 768px) 100vw, 900px" className="h-auto w-full rounded-lg" />
    <figcaption className="mt-3 text-sm leading-6 text-gray-600">{caption}</figcaption>
  </figure>;
}

const diagrams: Record<string, () => React.JSX.Element> = {
  '[[FACEBOOK_DIAG:one]]': () => <Infographic src="/images/blog/facebook-ads/facebook-reklam-hazirlik-akisi.svg" alt="Facebook reklamına hazırlık için hedefi tanımlama, teklifi netleştirme, sayfayı kontrol etme, ölçümü test etme, yayını başlatma ve sonucu değerlendirme adımları." caption="Reklam yayına çıkmadan önce kontrol edilebilecek altı hazırlık adımı." />,
  '[[FACEBOOK_DIAG:two]]': () => <Infographic src="/images/blog/facebook-ads/facebook-uygun-basvuru-maliyeti.svg" alt="Temsili A ve B karşılaştırması: aynı 6.000 TL harcamada A 120 toplam başvuru ve 12 uygun başvuru, B 60 toplam başvuru ve 24 uygun başvuru gösteriyor. Uygun başvuru başına maliyet sırasıyla 500 TL ve 250 TL." caption="Temsili hesaplama; müşteri sonucu veya sektör karşılaştırması değildir." />,
};
const renderMarker = (marker: string) => diagrams[marker]?.() ?? null;

const articleCtas: Record<string, Partial<Record<CtaStage, CtaCopy>>> = {
  'facebook-reklam-nasil-verilir': {
    early: cta('İlk kampanyanız için hazırlığı birlikte gözden geçirelim', 'Hedefinizi ve yönlendireceğiniz sayfayı paylaşın.', 'Hazırlık İçin Görüşelim', ['Ölçüm yaklaşımını inceleyin', `${servicePath}/teknoloji`]),
    middle: cta('Hangi hazırlığın önce yapılacağını birlikte belirleyelim', 'Web sitenizi ve reklam hedefinizi paylaşın.', 'Ölçüm İhtiyacımı Paylaş', ['Çalışma sürecini inceleyin', `${servicePath}/surec`]),
    closing: cta('Kampanyayı hazırlıktan raporlamaya birlikte planlayalım', 'Hedef, kreatif, açılış sayfası ve ölçüm işlerini aynı çalışma kapsamına bağlayalım.', 'Facebook Reklam Teklifi Al', ['Facebook reklam yönetimi', servicePath]),
  },
  'facebook-reklam-maliyeti-nasil-dusurulur': {
    early: cta('Maliyet değerlendirmesine doğru metrikle başlayın', 'Kampanya hedefinizi ve takip ettiğiniz sonucu paylaşın.', 'Maliyetimi Görüşelim', ['Fiyatlandırmayı inceleyin', `${servicePath}/fiyatlandirma`]),
    middle: cta('Maliyet sorununun hangi aşamada oluştuğunu birlikte bulalım', 'Mevcut hedefinizi ve temel kampanya verilerinizi paylaşın.', 'Kampanyamı Görüşelim', ['Ölçüm yaklaşımını inceleyin', `${servicePath}/teknoloji`]),
    closing: cta('Sonraki testinizi bir bulguya dayandıralım', 'Ölçümü, başvuru niteliğini ve kullanıcı yolculuğunu birlikte inceleyelim.', 'Facebook Reklam Teklifi Al', ['Yayın öncesi hazırlık rehberi', `${servicePath}/blog/facebook-reklam-nasil-verilir`]),
  },
};

const manifestEntries = manifest as Array<{ slug: string; title: string; heading: string; metaDescription: string; excerpt: string; featuredImage: string; imageAlt: string; categoryLabel: string; datePublished: string; tags?: string[] }>;
const readContent = (slug: string) => readFileSync(join(process.cwd(), 'content/blog/facebook-ads', `${slug}.md`), 'utf8');
const readingMinutes = (text: string) => Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 220));
const withCardFields = (entry: (typeof manifestEntries)[number]) => ({ ...entry, readingMinutes: readingMinutes(readContent(entry.slug)), datePublished: entry.datePublished });

export const facebookAdsBlog: ServiceBlogDefinition = {
  config: { serviceName: 'Facebook Reklam Yönetimi', servicePath, blogLabel: 'Facebook Reklam Rehberleri', brandLine: 'PakSoft · Facebook Reklamları', allGuidesLabel: 'Tüm Facebook reklam rehberleri', overviewLabel: 'Facebook reklam yönetimini inceleyin', renderMarker, ctas: { early: defaultCta, middle: defaultCta, closing: defaultCta } },
  defaultCategoryLabel: 'Facebook Reklamları',
  articles: manifestEntries.map((entry) => ({ ...withCardFields(entry), ctas: articleCtas[entry.slug] })),
};

export function getFacebookAdsGuides() { return manifestEntries.map((entry) => ({ ...withCardFields(entry), title: entry.heading })); }
export function getFacebookAdsGuide(slug: string) {
  const entry = manifestEntries.find((item) => item.slug === slug);
  if (!entry) return null;
  const date = new Date(`${entry.datePublished}T12:00:00.000Z`);
  return { ...withCardFields(entry), title: entry.heading, metaTitle: entry.title, content: readContent(slug), publishedAt: date, updatedAt: undefined, language: 'tr' };
}
