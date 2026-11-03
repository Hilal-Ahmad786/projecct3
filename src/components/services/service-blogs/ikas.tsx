import { ArrowPathIcon, CheckCircleIcon, CircleStackIcon, ClipboardDocumentCheckIcon, DocumentTextIcon, PhotoIcon, RectangleGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/ikas/manifest.json';

const servicePath = '/tr/hizmetler/ikas-development';
const enquiryPath = '/tr/start-project?service=ikas-development';

function ExampleGrid({ title, items, note }: { title: string; items: { title: string; text: string; Icon: typeof CheckCircleIcon }[]; note?: string }) {
  return <figure data-ikas-reveal className="reveal my-8 overflow-hidden rounded-2xl border border-heritage-sand bg-heritage-ivory sm:my-10">
    <figcaption className="border-b border-heritage-sand px-4 py-4 text-sm font-semibold text-gray-900 sm:px-6">{title}</figcaption>
    <ul className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">{items.map(({ title: heading, text, Icon }, index) => <li key={heading} data-ikas-reveal data-ikas-delay={index * 55} className="ikas-card-motion rounded-xl border border-heritage-sand bg-white p-4">
      <Icon className="h-5 w-5 text-heritage-turquoise-deep" aria-hidden="true" /><strong className="mt-3 block text-sm font-semibold text-gray-900">{heading}</strong><span className="mt-1 block text-sm leading-6 text-gray-700">{text}</span>
    </li>)}</ul>{note ? <p className="border-t border-heritage-sand px-4 py-3 text-sm leading-6 text-gray-700 sm:px-6">{note}</p> : null}
  </figure>;
}

export const ikasBlog: ServiceBlogDefinition = {
  config: {
    serviceName: 'ikas Geliştirme', servicePath, blogLabel: 'ikas Rehberleri', brandLine: 'PakSoft · ikas',
    allGuidesLabel: 'Tüm ikas rehberleri', overviewLabel: 'ikas hizmetine genel bakış', jsonLdSection: 'ikas Mağaza Kurulumu ve Tema Tasarımı',
    ctas: {
      early: { heading: 'ikas mağaza projenizi planlıyor musunuz?', text: 'Ürün yapınızı, içerik hazırlığınızı ve ihtiyaç duyduğunuz bağlantıları paylaşın; çalışma kapsamını birlikte netleştirelim.', primary: { label: 'ikas Projenizi Anlatın', href: enquiryPath }, secondary: { label: 'ikas Hizmetini İnceleyin', href: servicePath } },
      middle: { heading: 'ikas çalışma kapsamını adım adım değerlendirin', text: 'Kurulum, tema çalışması, test ve devir aşamalarındaki ihtiyaçları görün.', primary: { label: 'ikas Sürecini İnceleyin', href: `${servicePath}/surec` } },
      closing: { heading: 'ikas mağazanızın kapsamını birlikte netleştirelim', text: 'Mevcut mağazanızı veya mağaza fikrinizi, ürün yapınızı ve önceliklerinizi paylaşın.', primary: { label: 'Projenizi Görüşelim', href: enquiryPath }, secondary: { label: 'ikas Hizmet Kapsamı', href: `${servicePath}/ozellikler` } },
    },
    renderMarker: (marker) => {
      if (marker === '[[IKAS_SETUP_GRID]]') return <ExampleGrid title="Kurulum öncesi altı hazırlık alanı" items={[
        { title: 'Kapsam', text: 'İlk yayında bulunacak sayfaları, ürünleri ve akışları belirleyin.', Icon: ClipboardDocumentCheckIcon },
        { title: 'Katalog', text: 'Ürün verilerini, varyantları, kategorileri ve görsel eşleşmelerini hazırlayın.', Icon: CircleStackIcon },
        { title: 'İçerik', text: 'Marka metinleri, ürün açıklamaları ve onay sorumlularını netleştirin.', Icon: DocumentTextIcon },
        { title: 'Hesaplar', text: 'Alan adı, ödeme, kargo ve gerekli üçüncü taraf erişimlerini kontrol edin.', Icon: ShieldCheckIcon },
        { title: 'Test', text: 'Mobil gezinme, ürün seçimi ve alışveriş senaryolarını örnek verilerle deneyin.', Icon: CheckCircleIcon },
        { title: 'Devir', text: 'Ekip erişimlerini, kullanım alanlarını ve açık işleri kayıt altına alın.', Icon: ArrowPathIcon },
      ]} />;
      if (marker === '[[IKAS_THEME_DECISIONS]]') return <ExampleGrid title="Tema talebini kapsamlandıran üç başlık" items={[
        { title: 'Mevcut ayarlar', text: 'Temanın sunduğu ayarlarla yapılabilecek düzenlemeleri belirleyin.', Icon: CheckCircleIcon },
        { title: 'Bölüm çalışması', text: 'Yönetilebilir sayfa bölümlerine veya yeni içerik alanlarına duyulan ihtiyacı değerlendirin.', Icon: RectangleGroupIcon },
        { title: 'Bağlantı ihtiyacı', text: 'Tema görünümünü etkileyen uygulama ve dış sistem bağımlılıklarını inceleyin.', Icon: ArrowPathIcon },
      ]} note="Bu başlıklar birbirini dışlayan paketler değildir; bir projede birlikte değerlendirilebilir." />;
      return null;
    },
  },
  defaultCategoryLabel: 'ikas Rehberi',
  articles: manifest,
};
