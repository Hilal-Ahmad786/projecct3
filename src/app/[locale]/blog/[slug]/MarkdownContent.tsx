'use client';

import { Children, isValidElement, type ReactNode } from 'react';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArchiveBoxIcon, ArrowPathIcon, BanknotesIcon, CircleStackIcon, Cog6ToothIcon, CubeIcon, DocumentCheckIcon, ShoppingBagIcon, UserGroupIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

const launchAreas = [
  { title: 'Kapsam', text: 'İlk sürümde hangi ürünler, sayfalar ve işlevler bulunacak?', Icon: DocumentCheckIcon },
  { title: 'Katalog', text: 'Ürün, görsel, varyant ve kategori verileri hazır mı?', Icon: CubeIcon },
  { title: 'Alışveriş', text: 'Ödeme, teslimat ve müşteri bilgilendirmesi kontrol edildi mi?', Icon: ShoppingBagIcon },
  { title: 'Operasyon', text: 'Sipariş, stok ve müşteri taleplerinin sorumlusu belli mi?', Icon: CircleStackIcon },
  { title: 'Test', text: 'Önemli senaryolar uygun ortamda denendi mi?', Icon: Cog6ToothIcon },
  { title: 'Devir', text: 'Hesap erişimleri ve günlük kullanım bilgileri teslim edildi mi?', Icon: ArchiveBoxIcon },
];

const platformDecisions = [
  { title: 'Katalog', text: 'Ürün, varyant ve veri yapımız seçilen çözümle yönetilebiliyor mu?', Icon: CubeIcon },
  { title: 'Ekip', text: 'Günlük işleri yürütecek kişiler bu düzeni kullanabiliyor mu?', Icon: UserGroupIcon },
  { title: 'İş kuralları', text: 'Gerekli özel davranışlar nasıl karşılanacak?', Icon: WrenchScrewdriverIcon },
  { title: 'Bağlantılar', text: 'Veri akışı ve dış sistemler doğrulandı mı?', Icon: ArrowPathIcon },
  { title: 'Maliyet', text: 'İlk kurulum ve düzenli giderler ayrı görülebiliyor mu?', Icon: BanknotesIcon },
  { title: 'Devamlılık', text: 'Bakım, erişim ve ilerideki geçiş sorumlulukları belli mi?', Icon: DocumentCheckIcon },
];

type DecisionItem = { title: string; text: string; Icon: typeof CubeIcon };

function plainText(children: ReactNode): string {
  return Children.toArray(children).map((child) => {
    if (typeof child === 'string' || typeof child === 'number') return String(child);
    if (isValidElement<{ children?: ReactNode }>(child)) return plainText(child.props.children);
    return '';
  }).join('').trim();
}

function DecisionGrid({ title, items }: { title: string; items: DecisionItem[] }) {
  return (
    <section aria-label={title} className="my-8 rounded-2xl border border-heritage-sand bg-heritage-ivory p-4 sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ title: itemTitle, text, Icon }) => (
          <li key={itemTitle} className="flex gap-3 rounded-xl border border-heritage-sand bg-white p-4">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-heritage-turquoise-deep" aria-hidden="true" />
            <span><strong className="block text-sm font-semibold text-gray-900">{itemTitle}</strong><span className="mt-1 block text-sm leading-6 text-gray-600">{text}</span></span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function createMarkdownComponents(serviceArticle: boolean): Components {
  return {
  h2: ({ children }) => {
    if (!serviceArticle) return <h2>{children}</h2>;
    const title = plainText(children);
    const id = title.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return <h2 id={id}>{children}</h2>;
  },
  p: ({ children }) => {
    const marker = plainText(children);
    if (marker === '[[ECOM_LAUNCH_AREAS]]') return <DecisionGrid title="Yayın hazırlığının altı alanı" items={launchAreas} />;
    if (marker === '[[ECOM_PLATFORM_DECISIONS]]') return <DecisionGrid title="Altyapı kararını netleştiren altı soru" items={platformDecisions} />;
    return <p>{children}</p>;
  },
  img: ({ src = '', alt = '' }) => serviceArticle
    ? <img src={src} alt={alt} loading="lazy" decoding="async" className="my-8 block h-auto w-full max-w-full rounded-xl border border-heritage-sand object-contain" />
    : <img src={src} alt={alt} />,
  table: ({ children }) => serviceArticle
    ? <div className="my-8 max-w-full overflow-x-auto rounded-xl border border-heritage-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise" role="region" aria-label="Kaydırılabilir karşılaştırma tablosu" tabIndex={0}><table className="w-full min-w-[36rem] border-collapse text-left text-sm">{children}</table></div>
    : <table>{children}</table>,
  th: ({ children }) => serviceArticle ? <th scope="col" className="border-b border-heritage-sand bg-heritage-ivory px-4 py-3 text-sm font-semibold text-gray-900">{children}</th> : <th>{children}</th>,
  td: ({ children }) => serviceArticle ? <td className="border-b border-gray-100 px-4 py-3 align-top text-sm leading-6 text-gray-700">{children}</td> : <td>{children}</td>,
  };
}

export default function MarkdownContent({ content, serviceArticle = false }: { content: string; serviceArticle?: boolean }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={createMarkdownComponents(serviceArticle)}>{content}</ReactMarkdown>;
}
