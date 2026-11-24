import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { CheckIcon } from '@heroicons/react/24/outline';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/ecommerce-meta-ads/manifest.json';

const servicePath = '/tr/hizmetler/ecommerce-meta-ads';
const enquiry = '/tr/start-project?service=ecommerce-meta-ads';
const box = 'rounded-xl border border-heritage-turquoise/20 bg-white p-4 shadow-sm';

function Checklist({ title, items, note }: { title: string; items: string[]; note: string }) {
  return <figure className="my-8 rounded-2xl border border-heritage-sand bg-heritage-ivory p-5 sm:p-6">
    <figcaption className="font-semibold text-gray-900">{title}</figcaption>
    <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <li key={item} className={`${box} flex items-start gap-3 text-sm leading-6 text-gray-700`}><CheckIcon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-heritage-turquoise-deep" />{item}</li>)}</ul>
    <p className="mt-4 text-sm leading-6 text-gray-600">{note}</p>
  </figure>;
}

function BudgetExample() {
  const rows = [['Net satış geliri', '1.000 TL'], ['Ürün maliyeti', '−450 TL'], ['Sipariş giderleri', '−150 TL'], ['İade/iptal payı', '−50 TL'], ['Reklam öncesi katkı', '350 TL'], ['Örnek medya gideri', '−200 TL'], ['Kalan katkı', '150 TL']];
  return <figure className="my-8 rounded-2xl border border-heritage-sand bg-heritage-ivory p-5 sm:p-6">
    <figcaption className="font-semibold text-gray-900">Ciro, Kalan Tutar Değildir</figcaption>
    <p className="mt-1 text-sm text-gray-600">Varsayımsal örnek; hizmet fiyatı veya bütçe önerisi değildir.</p>
    <dl className="mt-4 grid gap-2 sm:grid-cols-2">{rows.map(([label, value], i) => <div key={label} className={`${box} flex items-center justify-between gap-4 ${i === 4 || i === 6 ? 'border-heritage-turquoise bg-heritage-turquoise-light/50' : ''}`}><dt className="text-sm text-gray-700">{label}</dt><dd className="font-semibold tabular-nums text-gray-900">{value}</dd></div>)}</dl>
    <p className="mt-4 text-sm leading-6 text-gray-600">Yönetim, üretim ve sabit giderler henüz düşülmedi. Net kâr değildir.</p>
  </figure>;
}

function renderMarker(marker: string) {
  if (marker === '[[ECOM_META:catalog]]') return <Checklist title="Katalog Reklamına Hazırlık — Yayın öncesinde 5 kontrol" items={['Ürün kimliği: doğru ürün ve varyantı eşleştirin.','Fiyat: mağazadaki koşullarla karşılaştırın.','Stok: satın alınabilir seçeneği kontrol edin.','Görsel: ürünle aynı seçeneği gösterin.','Bağlantı: doğru sayfayı mobilde açın.']} note="Verinin kaynağını ve güncelleme sorumlusunu belirleyin." />;
  if (marker === '[[ECOM_META:budget]]') return <BudgetExample />;
  if (marker === '[[ECOM_META:measurement]]') return <Checklist title="Satın Alma Ölçümünü Kontrol Edin" items={['Kaynakları listeleyin.','Başarılı siparişi doğrulayın.','Tekrar kayıtlarını inceleyin.','Tutar ve para birimini karşılaştırın.','Ürün kimliğini kontrol edin.','Test sonuçlarını kaydedin.']} note="Aktif bağlantı, doğru ölçümün tek başına kanıtı değildir." />;
  return null;
}

const link = (label: string, href: string) => ({ label, href });
const cta = { heading: 'Mağazanız için reklam hazırlığını birlikte değerlendirelim', text: 'Ürünlerinizi, mevcut kurulumunuzu ve ihtiyaç duyduğunuz çalışmaları paylaşın.', primary: link('Mağazam İçin Teklif Al', enquiry), secondary: link('Hizmet Kapsamını İncele', servicePath) };

export const ecommerceMetaAdsBlog: ServiceBlogDefinition = {
  config: { serviceName: 'E-Ticaret Meta Reklam Yönetimi', servicePath, blogLabel: 'E-Ticaret Meta Reklam Rehberleri', brandLine: 'PakSoft · E-Ticaret Meta Reklamları', allGuidesLabel: 'Tüm e-ticaret Meta reklam rehberleri', overviewLabel: 'E-Ticaret Meta Reklam Yönetimini İncele', jsonLdSection: 'E-Ticaret Meta Reklam Rehberleri', renderMarker, ctas: { early: cta, middle: cta, closing: { ...cta, heading: 'Mağazanıza uygun çalışma kapsamını belirleyelim' } } },
  defaultCategoryLabel: 'E-Ticaret Meta Reklam Rehberi',
  articles: manifest,
};

export function getEcommerceMetaAdsGuides() { return manifest.map((entry) => ({ ...entry, title: entry.heading })); }
export function getEcommerceMetaAdsGuide(slug: string) {
  const entry = manifest.find((item) => item.slug === slug);
  if (!entry) return null;
  return { ...entry, title: entry.heading, metaTitle: entry.title, content: readFileSync(join(process.cwd(), 'content/blog/ecommerce-meta-ads', `${entry.slug}.md`), 'utf8'), publishedAt: undefined, updatedAt: undefined, language: 'tr' };
}
