import type { ReactNode } from 'react';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/shopify/manifest.json';

const servicePath = '/tr/hizmetler/shopify-development';
const enquiryPath = '/tr/start-project?service=shopify-development';

function WorkflowFigure({ id, title, steps }: { id: string; title: string; steps: readonly [string, string][] }) {
  return <figure data-shopify-reveal className="my-8 overflow-hidden rounded-2xl border border-heritage-sand bg-heritage-ivory sm:my-10">
    <figcaption id={id} className="border-b border-heritage-sand px-4 py-4 text-sm font-semibold text-gray-900 sm:px-6">{title}</figcaption>
    <ol data-shopify-reveal-group className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
      {steps.map(([heading, detail], index) => <li key={heading} className="shopify-motion-card relative rounded-xl border border-heritage-sand bg-white p-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-heritage-turquoise-deep text-xs font-semibold text-white">{index + 1}</span>
        <strong className="mt-3 block text-sm font-semibold text-gray-900">{heading}</strong>
        <span className="mt-1 block text-sm leading-6 text-gray-600">{detail}</span>
        {index < steps.length - 1 ? <span aria-hidden="true" className="absolute -right-2 top-1/2 z-10 hidden h-3 w-3 rotate-45 border-r border-t border-heritage-turquoise bg-heritage-ivory lg:block"/> : null}
      </li>)}
    </ol>
  </figure>;
}

export const shopifyBlog: ServiceBlogDefinition = {
  config: {
    serviceName: 'Shopify Kurulum ve Geliştirme',
    servicePath,
    blogLabel: 'Shopify Rehberleri',
    brandLine: 'PakSoft · Shopify',
    allGuidesLabel: 'Tüm Shopify rehberleri',
    overviewLabel: 'Shopify hizmetine genel bakış',
    jsonLdSection: 'Shopify Mağaza Kurulumu ve Taşıma Rehberleri',
    ctas: {
      early: { heading: 'Shopify mağazanızı kurmaya hazırlanıyor musunuz?', text: 'Ürün yapınızı ve önceliklerinizi paylaşın; gerekli sayfaları, veri işlerini ve bağlantıları birlikte değerlendirelim.', primary: { label: 'Shopify Projemi Paylaş', href: enquiryPath }, secondary: { label: 'Shopify Hizmetini İncele', href: servicePath } },
      middle: { heading: 'Hazırlık listenizde açık kalan noktalar mı var?', text: 'Mevcut durumunuzu paylaşın; içerik hazırlığı ile teknik işleri ayrı bir plana dönüştürelim.', primary: { label: 'Kurulum Kapsamımı Değerlendirelim', href: enquiryPath } },
      closing: { heading: 'Shopify mağazanızı hazırlık planıyla başlatın', text: 'Ürün yapınızı, içeriklerin durumunu ve kullanacağınız sistemleri paylaşın. Kurulum işlerini, sizden beklenen hazırlıkları ve yayın kontrollerini aynı kapsam içinde netleştirelim.', primary: { label: 'Shopify Projem İçin Görüşelim', href: enquiryPath }, secondary: { label: 'Shopify Hizmetini İncele', href: servicePath } },
    },
    renderMarker: (marker: string): ReactNode | null => {
      if (marker === '[[SHOPIFY_LAUNCH_FLOW]]') return <WorkflowFigure id="shopify-launch-flow-title" title="Hazırlıktan yayına dört kontrol" steps={[
        ['Kapsam','İlk sürümdeki sayfalar ve işlevler belli.'],['İçerik ve veri','Örnek ürünler ve temel sayfalar hazır.'],['İş akışı','Hesaplar, bağlantılar ve sorumlular belirli.'],['Test ve onay','Kontrol sonuçları ve yayın kararı kayıtlı.'],
      ]}/>;
      if (marker === '[[SHOPIFY_MIGRATION_GATES]]') return <WorkflowFigure id="shopify-migration-gates-title" title="Geçişin dört kontrol kapısı" steps={[
        ['Envanter','Veri ve işlev listesi onaylandı.'],['Deneme','Örnek aktarım ve hata listesi incelendi.'],['Geçiş','Son kayıtlar, sorumlular ve yayın kararı net.'],['Doğrulama','Yeni mağazada sayfalar ve sipariş akışı kontrol edildi.'],
      ]}/>;
      return null;
    },
  },
  defaultCategoryLabel: 'Shopify Rehberi',
  articles: manifest,
};
