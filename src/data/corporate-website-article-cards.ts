// Listing/teaser cards for the Turkish corporate website guides. Kept as a
// small standalone list (rather than derived from corporate-website-articles/
// tr.json) because the client-rendered service overview imports it — deriving
// it would ship both full article bodies to the browser. Keep titles, excerpts
// and covers in sync with tr.json when editing an article.
export const corporateWebsiteArticleCards = [
  {
    slug: 'web-sitesi-yenileme',
    title: 'Web Sitesi Yenileme: Süreç, İçerik ve SEO Planlaması',
    category: 'Web Sitesi Yenileme',
    excerpt: 'Mevcut sitenizde neyi koruyacağınızı, hangi içerikleri geliştireceğinizi ve SEO geçişini nasıl planlayacağınızı somut bir yol haritasıyla öğrenin.',
    image: '/images/blog/web-sitesi-yenileme-kapak.webp',
    imageAlt: 'Eski ve yenilenmiş web arayüzleri ile mobil görünümü gösteren PakSoft illüstrasyonu.',
  },
  {
    slug: 'ihracat-firmalari-icin-cok-dilli-web-sitesi',
    title: 'İhracat Firmaları İçin Çok Dilli Web Sitesi Rehberi',
    category: 'Çok Dilli Web Siteleri',
    excerpt: 'Dil seçiminden teknik ürün sayfalarına, sağdan sola arayüzlerden teklif formlarına kadar ihracat odaklı bir web sitesinin temel kararlarını inceleyin.',
    image: '/images/blog/ihracat-cok-dilli-web-sitesi-kapak.webp',
    imageAlt: 'Farklı dil sürümlerini temsil eden ürün sayfaları, dünya küresi ve ihracat konteynerlerinin yer aldığı PakSoft illüstrasyonu.',
  },
] as const;

export const corporateWebsiteArticlePath = (slug: string) => `/tr/hizmetler/corporate-website-design/blog/${slug}`;
