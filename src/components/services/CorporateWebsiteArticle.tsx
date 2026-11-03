import Image from 'next/image';
import { DownloadAside, ServiceArticlePage, type CtaCopy, type CtaStage, type ServiceArticleConfig } from '@/components/services/ServiceArticle';
import articles from '@/data/corporate-website-articles/tr.json';

type ArticleSlug = keyof typeof articles;
type ArticleData = (typeof articles)[ArticleSlug];

export function getCorporateWebsiteArticle(slug: string): ArticleData | null {
  return Object.prototype.hasOwnProperty.call(articles, slug) ? articles[slug as ArticleSlug] : null;
}

export function getCorporateWebsiteArticleSlugs(): ArticleSlug[] {
  return Object.keys(articles) as ArticleSlug[];
}

export function getCorporateWebsiteArticleMeta(slug: string) {
  const article = getCorporateWebsiteArticle(slug);
  return article ? {
    title: article.metaTitle,
    description: article.metaDescription,
    image: article.coverImage,
    imageAlt: article.coverAlt,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
  } : null;
}

const mainServicePath = '/tr/hizmetler/corporate-website-design';
const enquiryPath = '/tr/start-project?service=corporate-website-design';

// Three deliberate placements per article: a compact prompt after the
// introduction, a contextual link near the planning section it relates to,
// and a stronger closing banner once the main content is complete.
const articleCtas: Record<ArticleSlug, Record<CtaStage, CtaCopy>> = {
  'web-sitesi-yenileme': {
    early: {
      heading: 'Mevcut web sitenizi yenilemeyi mi planlıyorsunuz?',
      text: 'İhtiyaçlarınızı paylaşın; içerik, tasarım ve teknik geçiş kapsamını birlikte netleştirelim.',
      primary: { label: 'Projenizi Anlatın', href: enquiryPath },
      secondary: { label: 'Kurumsal Web Tasarımı İnceleyin', href: mainServicePath },
    },
    middle: {
      heading: 'Yenileme sürecinin kapsamını netleştirin',
      text: 'Sayfalar, içerikler, yönlendirmeler ve yayın kontrolleri için planlı bir çalışma oluşturun.',
      primary: { label: 'Çalışma Sürecimizi İnceleyin', href: `${mainServicePath}/surec` },
    },
    closing: {
      heading: 'Yeni siteniz için doğru kapsamla başlayın',
      text: 'Mevcut site adresinizi, önceliklerinizi ve ihtiyaç duyduğunuz özellikleri paylaşın.',
      primary: { label: 'Teklif Talebinizi İletin', href: enquiryPath },
      secondary: { label: 'Fiyatlandırma Bilgilerini İnceleyin', href: `${mainServicePath}/fiyatlandirma` },
    },
  },
  'ihracat-firmalari-icin-cok-dilli-web-sitesi': {
    early: {
      heading: 'Hedef pazarlarınıza uygun bir web sitesi planlayın',
      text: 'Dil seçeneklerini, ürün içeriklerini ve teklif akışını ihracat hedeflerinizle birlikte ele alalım.',
      primary: { label: 'Projenizi Anlatın', href: enquiryPath },
    },
    middle: {
      heading: 'Çok dilli sitenizin ihtiyaçlarını belirleyin',
      text: 'İçerik yönetimi, dil yapısı ve kullanıcı deneyimi için gerekli özellikleri inceleyin.',
      primary: { label: 'Web Sitesi Özelliklerini İnceleyin', href: `${mainServicePath}/ozellikler` },
    },
    closing: {
      heading: 'İhracat odaklı web sitenizin kapsamını konuşalım',
      text: 'Hedef ülkelerinizi, öncelikli ürünlerinizi ve ihtiyaç duyduğunuz dilleri paylaşın.',
      primary: { label: 'Teklif Talebinizi İletin', href: enquiryPath },
      secondary: { label: 'Kurumsal Web Tasarımı İnceleyin', href: mainServicePath },
    },
  },
};

function WorkflowFigure({ article }: { article: ArticleData }) {
  return (
    <figure className="reveal my-10 overflow-hidden sm:my-12 rounded-2xl border border-heritage-sand bg-white">
      <Image
        src={article.illustration}
        alt={article.illustrationAlt}
        width={1536}
        height={1024}
        sizes="(max-width: 768px) 100vw, 760px"
        className="h-auto w-full"
      />
      <figcaption className="border-t border-heritage-sand bg-heritage-ivory px-4 py-4 sm:px-6">
        <p className="text-sm font-medium text-gray-800">{article.illustrationCaption}</p>
        <ol className="mt-3 grid gap-x-6 gap-y-3 text-sm leading-6 text-gray-700 sm:grid-cols-2">
          {article.illustrationSteps.map((step, i) => {
            const [title, ...rest] = step.split(':');
            return <li key={step} className="flex gap-3">
              <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-heritage-turquoise-deep text-xs font-semibold text-white">{i + 1}</span>
              <span>{rest.length ? <><strong className="font-semibold text-gray-900">{title}:</strong>{rest.join(':')}</> : step}</span>
            </li>;
          })}
        </ol>
      </figcaption>
    </figure>
  );
}

const downloads = {
  renewal: { href: '/downloads/icerik-envanteri-url-eslestirme-sablonu.csv', label: 'İçerik Envanteri ve URL Eşleştirme Şablonunu İndirin', note: 'CSV şablonunu elektronik tablo uygulamanızda açıp kendi sayfalarınızla doldurun.' },
  multilingual: { href: '/downloads/dil-urun-icerigi-planlama-sablonu.csv', label: 'Dil ve Ürün İçeriği Planlama Şablonunu İndirin', note: 'Boş CSV şablonunu hedef pazar, dil ve içerik onaylarını planlamak için kullanın.' },
} as const;

export function CorporateWebsiteArticlePage({ article }: { article: ArticleData }) {
  const slug = article.slug as ArticleSlug;
  const related = articles[article.related as ArticleSlug];
  const config: ServiceArticleConfig = {
    serviceName: 'Kurumsal Web Tasarım',
    servicePath: mainServicePath,
    blogLabel: 'Blog',
    brandLine: 'PakSoft · Kurumsal Web Tasarım',
    allGuidesLabel: 'Tüm kurumsal web tasarım rehberleri',
    overviewLabel: 'Kurumsal web tasarım hizmetine genel bakış',
    ctas: articleCtas[slug],
    renderMarker: (marker) => {
      if (marker.startsWith('[[PAKSOFT_VISUAL:')) return <WorkflowFigure article={article} />;
      const download = marker.match(/^\[\[PAKSOFT_DOWNLOAD:(renewal|multilingual)\]\]$/);
      if (download) {
        const template = downloads[download[1] as keyof typeof downloads];
        return <DownloadAside note={template.note} href={template.href} label={template.label} />;
      }
      return null;
    },
  };

  return <ServiceArticlePage
    config={config}
    article={{
      slug: article.slug,
      title: article.title,
      category: article.category,
      standfirst: article.standfirst,
      metaDescription: article.metaDescription,
      coverImage: article.coverImage,
      coverAlt: article.coverAlt,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      body: article.body,
    }}
    related={related ? { slug: related.slug, title: related.title, category: related.category, excerpt: related.excerpt, coverImage: related.coverImage } : null}
  />;
}
