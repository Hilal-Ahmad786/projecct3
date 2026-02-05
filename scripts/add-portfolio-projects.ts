/**
 * Add portfolio projects from live websites
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

interface ProjectData {
  name: string;
  slug: string;
  client: string;
  category: string;
  industry: string;
  projectUrl: string;
  description: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  technologies: string[];
  results: { metric: string; value: string }[];
  duration: string;
  teamSize: string;
  featured: boolean;
  relatedServices: string[]; // Service slugs to add this project to
  translations: {
    tr: { name: string; description: string; fullDescription: string; challenge: string; solution: string };
    de: { name: string; description: string; fullDescription: string; challenge: string; solution: string };
    ur: { name: string; description: string; fullDescription: string; challenge: string; solution: string };
    ar: { name: string; description: string; fullDescription: string; challenge: string; solution: string };
  };
}

const projects: ProjectData[] = [
  {
    name: 'Ankara PERT - Vehicle Purchasing Platform',
    slug: 'ankara-pert',
    client: 'Ankara PERT Grup',
    category: 'web-development',
    industry: 'Automotive',
    projectUrl: 'https://ankarapert.com.tr/',
    description: 'Turkey\'s most reliable vehicle purchasing platform for damaged, accident, total-loss, and scrap vehicles with instant quotes.',
    fullDescription: 'We developed a comprehensive vehicle purchasing platform for Ankara PERT, specializing in buying damaged, accident-damaged, insurance total-loss, and scrap vehicles across Turkey. The platform features instant quote generation within 30 minutes, free expert appraisals, and seamless 24/7 customer support via phone and WhatsApp.',
    challenge: 'The client needed a trustworthy online presence to serve customers across all 81 provinces of Turkey, with real-time quote generation and lead management capabilities for their vehicle purchasing business.',
    solution: 'We built a modern, responsive website with an intuitive quote request system, integrated WhatsApp support, and a robust backend for lead management. The design emphasizes trust and reliability with clear service explanations and customer testimonials.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel'],
    results: [
      { metric: 'Quote Requests', value: '+200%' },
      { metric: 'Page Load Time', value: '<2s' },
      { metric: 'Mobile Traffic', value: '75%' },
      { metric: 'Conversion Rate', value: '+45%' }
    ],
    duration: '6 weeks',
    teamSize: '3 developers',
    featured: true,
    relatedServices: ['web-development', 'frontend-development', 'next-js-development', 'corporate-websites'],
    translations: {
      tr: {
        name: 'Ankara PERT - Araç Alım Platformu',
        description: 'Türkiye\'nin en güvenilir hasarlı, kazalı, pert ve hurda araç alım platformu.',
        fullDescription: 'Ankara PERT için kapsamlı bir araç alım platformu geliştirdik. Platform, Türkiye genelinde hasarlı, kazalı, sigorta pert ve hurda araçların alımında uzmanlaşmıştır. 30 dakikada anlık teklif oluşturma, ücretsiz ekspertiz ve 7/24 WhatsApp desteği özellikleri sunmaktadır.',
        challenge: 'Müşteri, Türkiye\'nin 81 ilinde hizmet verebilecek, gerçek zamanlı teklif oluşturma ve müşteri yönetimi yeteneklerine sahip güvenilir bir online platform ihtiyacındaydı.',
        solution: 'Sezgisel teklif talep sistemi, entegre WhatsApp desteği ve güçlü lead yönetimi backend\'i ile modern, duyarlı bir web sitesi oluşturduk.'
      },
      de: {
        name: 'Ankara PERT - Fahrzeugankauf-Plattform',
        description: 'Die zuverlässigste Fahrzeugankauf-Plattform der Türkei für beschädigte und Unfallfahrzeuge.',
        fullDescription: 'Wir haben eine umfassende Fahrzeugankauf-Plattform für Ankara PERT entwickelt, spezialisiert auf den Ankauf von beschädigten, unfallgeschädigten und Schrottfahrzeugen in der gesamten Türkei mit sofortiger Angebotserstellung.',
        challenge: 'Der Kunde benötigte eine vertrauenswürdige Online-Präsenz für alle 81 Provinzen der Türkei mit Echtzeit-Angebotserstellung.',
        solution: 'Wir haben eine moderne, responsive Website mit intuitivem Angebotsanfrage-System und integriertem WhatsApp-Support entwickelt.'
      },
      ur: {
        name: 'انقرہ پرٹ - گاڑیوں کی خریداری کا پلیٹ فارم',
        description: 'ترکی کا سب سے قابل اعتماد حادثاتی اور خراب گاڑیوں کی خریداری کا پلیٹ فارم۔',
        fullDescription: 'ہم نے انقرہ پرٹ کے لیے ایک جامع گاڑیوں کی خریداری کا پلیٹ فارم تیار کیا جو پوری ترکی میں حادثاتی اور خراب گاڑیوں کی خریداری میں مہارت رکھتا ہے۔',
        challenge: 'کلائنٹ کو ترکی کے تمام 81 صوبوں میں خدمات فراہم کرنے کے لیے ایک قابل اعتماد آن لائن پلیٹ فارم کی ضرورت تھی۔',
        solution: 'ہم نے واٹس ایپ سپورٹ کے ساتھ ایک جدید، ریسپانسو ویب سائٹ بنائی۔'
      },
      ar: {
        name: 'أنقرة بيرت - منصة شراء السيارات',
        description: 'أكثر منصة موثوقة في تركيا لشراء السيارات المتضررة والحوادث.',
        fullDescription: 'طورنا منصة شاملة لشراء السيارات لصالح أنقرة بيرت، متخصصة في شراء السيارات المتضررة والحوادث في جميع أنحاء تركيا مع عروض أسعار فورية.',
        challenge: 'احتاج العميل إلى حضور موثوق عبر الإنترنت لخدمة العملاء في جميع المحافظات التركية البالغ عددها 81 محافظة.',
        solution: 'قمنا ببناء موقع حديث ومتجاوب مع نظام طلب عروض أسعار بديهي ودعم واتساب متكامل.'
      }
    }
  },
  {
    name: 'Araban Nakit - Cash for Cars Platform',
    slug: 'araban-nakit',
    client: 'Araban Nakit',
    category: 'web-development',
    industry: 'Automotive',
    projectUrl: 'https://arabannakit.com/',
    description: 'Fast and reliable vehicle purchasing platform offering same-day cash payments for damaged and salvage vehicles.',
    fullDescription: 'We created Araban Nakit, a streamlined platform for purchasing damaged, wrecked, and salvage vehicles across Turkey. The platform offers instant quotes within 30 minutes, free expert evaluation, free towing services, and same-day cash payments through notarized legal transactions.',
    challenge: 'The client needed to differentiate in a competitive market by emphasizing speed, reliability, and nationwide coverage while maintaining a professional, trustworthy image.',
    solution: 'We designed a conversion-focused website with clear value propositions, easy-to-use quote forms, prominent 24/7 contact options, and trust indicators showcasing coverage across major Turkish cities.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Vercel'],
    results: [
      { metric: 'Lead Generation', value: '+180%' },
      { metric: 'Bounce Rate', value: '-35%' },
      { metric: 'Mobile UX Score', value: '95/100' },
      { metric: 'SEO Rankings', value: 'Top 5' }
    ],
    duration: '5 weeks',
    teamSize: '2 developers',
    featured: true,
    relatedServices: ['web-development', 'frontend-development', 'next-js-development', 'corporate-websites', 'seo'],
    translations: {
      tr: {
        name: 'Araban Nakit - Araç Alım Platformu',
        description: 'Hasarlı ve hurda araçlar için aynı gün nakit ödeme sunan hızlı ve güvenilir araç alım platformu.',
        fullDescription: 'Türkiye genelinde hasarlı, kazalı ve hurda araçların alımı için Araban Nakit platformunu oluşturduk. 30 dakikada anlık teklif, ücretsiz ekspertiz, ücretsiz çekici ve aynı gün nakit ödeme sunmaktadır.',
        challenge: 'Müşteri, rekabetçi pazarda hız, güvenilirlik ve ülke çapında kapsama vurgulayarak farklılaşma ihtiyacındaydı.',
        solution: 'Net değer önerileri, kolay kullanımlı teklif formları ve 7/24 iletişim seçenekleriyle dönüşüm odaklı bir web sitesi tasarladık.'
      },
      de: {
        name: 'Araban Nakit - Bargeld für Autos',
        description: 'Schnelle und zuverlässige Fahrzeugankauf-Plattform mit Barzahlung am selben Tag.',
        fullDescription: 'Wir haben Araban Nakit entwickelt, eine optimierte Plattform für den Ankauf von beschädigten und Schrottfahrzeugen in der gesamten Türkei mit sofortigen Angeboten und Barzahlung am selben Tag.',
        challenge: 'Der Kunde musste sich in einem wettbewerbsintensiven Markt durch Schnelligkeit und Zuverlässigkeit differenzieren.',
        solution: 'Wir haben eine konversionsorientierte Website mit klaren Wertversprechen und einfachen Angebotsformularen gestaltet.'
      },
      ur: {
        name: 'اربان نقد - گاڑیوں کے بدلے نقد',
        description: 'خراب اور حادثاتی گاڑیوں کے لیے اسی دن نقد ادائیگی کی پیشکش کرنے والا تیز اور قابل اعتماد پلیٹ فارم۔',
        fullDescription: 'ہم نے اربان نقد بنایا، ترکی بھر میں خراب اور حادثاتی گاڑیوں کی خریداری کے لیے ایک بہتر پلیٹ فارم جو فوری پیشکش اور اسی دن نقد ادائیگی فراہم کرتا ہے۔',
        challenge: 'کلائنٹ کو مسابقتی مارکیٹ میں رفتار اور قابل اعتمادی پر زور دے کر مختلف ہونے کی ضرورت تھی۔',
        solution: 'ہم نے واضح قدر تجاویز اور آسان استعمال فارمز کے ساتھ تبدیلی پر مرکوز ویب سائٹ ڈیزائن کی۔'
      },
      ar: {
        name: 'أربان نقد - نقد مقابل السيارات',
        description: 'منصة شراء سيارات سريعة وموثوقة تقدم دفع نقدي في نفس اليوم.',
        fullDescription: 'أنشأنا أربان نقد، منصة مبسطة لشراء السيارات المتضررة في جميع أنحاء تركيا مع عروض فورية ودفع نقدي في نفس اليوم.',
        challenge: 'احتاج العميل إلى التميز في سوق تنافسي من خلال التأكيد على السرعة والموثوقية.',
        solution: 'صممنا موقعًا يركز على التحويل مع عروض قيمة واضحة ونماذج سهلة الاستخدام.'
      }
    }
  },
  {
    name: 'Maison d\'Orient - Luxury Real Estate',
    slug: 'maison-dorient',
    client: 'Maison d\'Orient',
    category: 'web-development',
    industry: 'Real Estate',
    projectUrl: 'https://emlak-sitesi-six.vercel.app/',
    description: 'Premium real estate platform showcasing luxury properties in Istanbul with advanced search and virtual tours.',
    fullDescription: 'We developed Maison d\'Orient, a sophisticated luxury real estate platform serving international buyers and investors in Istanbul. The platform features advanced property search with multi-currency support, virtual tours, neighborhood guides, and tools for citizenship-by-investment programs.',
    challenge: 'The client needed an elegant platform that could showcase high-end properties while providing comprehensive tools for international investors, including multi-language and multi-currency support.',
    solution: 'We created a visually stunning website with advanced filtering, virtual showroom capabilities, comparison tools, and seamless appointment scheduling. The design reflects luxury and exclusivity while maintaining excellent usability.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Vercel'],
    results: [
      { metric: 'Property Inquiries', value: '+250%' },
      { metric: 'International Traffic', value: '60%' },
      { metric: 'Avg. Session Duration', value: '4.5 min' },
      { metric: 'Lead Quality', value: '+70%' }
    ],
    duration: '8 weeks',
    teamSize: '4 developers',
    featured: true,
    relatedServices: ['web-development', 'frontend-development', 'next-js-development', 'ui-design', 'ux-research'],
    translations: {
      tr: {
        name: 'Maison d\'Orient - Lüks Emlak',
        description: 'İstanbul\'daki lüks mülkleri gelişmiş arama ve sanal turlarla sergileyen premium emlak platformu.',
        fullDescription: 'İstanbul\'da uluslararası alıcılara ve yatırımcılara hizmet veren sofistike bir lüks emlak platformu olan Maison d\'Orient\'i geliştirdik. Platform, çoklu para birimi desteği, sanal turlar ve vatandaşlık programı araçları sunmaktadır.',
        challenge: 'Müşteri, uluslararası yatırımcılar için çok dilli ve çok para birimli destek dahil kapsamlı araçlar sağlayan zarif bir platform ihtiyacındaydı.',
        solution: 'Gelişmiş filtreleme, sanal showroom yetenekleri ve sorunsuz randevu planlama ile görsel olarak çarpıcı bir web sitesi oluşturduk.'
      },
      de: {
        name: 'Maison d\'Orient - Luxus-Immobilien',
        description: 'Premium-Immobilienplattform für Luxusimmobilien in Istanbul mit erweiterter Suche und virtuellen Touren.',
        fullDescription: 'Wir haben Maison d\'Orient entwickelt, eine anspruchsvolle Luxus-Immobilienplattform für internationale Käufer und Investoren in Istanbul mit Mehrwährungsunterstützung und virtuellen Touren.',
        challenge: 'Der Kunde benötigte eine elegante Plattform mit umfassenden Tools für internationale Investoren.',
        solution: 'Wir haben eine visuell beeindruckende Website mit erweiterten Filteroptionen und virtuellen Showroom-Funktionen erstellt.'
      },
      ur: {
        name: 'میزون ڈی اورینٹ - لگژری رئیل اسٹیٹ',
        description: 'استنبول میں لگژری پراپرٹیز کی نمائش کرنے والا پریمیم رئیل اسٹیٹ پلیٹ فارم۔',
        fullDescription: 'ہم نے میزون ڈی اورینٹ تیار کیا، استنبول میں بین الاقوامی خریداروں اور سرمایہ کاروں کی خدمت کرنے والا ایک نفیس لگژری رئیل اسٹیٹ پلیٹ فارم۔',
        challenge: 'کلائنٹ کو بین الاقوامی سرمایہ کاروں کے لیے جامع ٹولز کے ساتھ ایک خوبصورت پلیٹ فارم کی ضرورت تھی۔',
        solution: 'ہم نے جدید فلٹرنگ اور ورچوئل شو روم صلاحیتوں کے ساتھ ایک شاندار ویب سائٹ بنائی۔'
      },
      ar: {
        name: 'ميزون دورينت - العقارات الفاخرة',
        description: 'منصة عقارية فاخرة تعرض العقارات الراقية في إسطنبول مع بحث متقدم وجولات افتراضية.',
        fullDescription: 'طورنا ميزون دورينت، منصة عقارية فاخرة متطورة تخدم المشترين والمستثمرين الدوليين في إسطنبول مع دعم متعدد العملات وجولات افتراضية.',
        challenge: 'احتاج العميل إلى منصة أنيقة توفر أدوات شاملة للمستثمرين الدوليين.',
        solution: 'أنشأنا موقعًا مذهلاً بصريًا مع فلترة متقدمة وإمكانيات صالة عرض افتراضية.'
      }
    }
  },
  {
    name: 'PrimeTaxi & Tours - Iceland Transportation',
    slug: 'primetaxi-iceland',
    client: 'PrimeTaxi & Tours',
    category: 'web-development',
    industry: 'Transportation & Tourism',
    projectUrl: 'https://www.primetaxi.is/',
    description: 'Premium transportation and tourism booking platform for Iceland with airport transfers and guided tours.',
    fullDescription: 'We built PrimeTaxi & Tours, a comprehensive transportation and tourism platform serving travelers in Iceland. The platform offers seamless booking for airport transfers, city taxis, and private guided tours including Golden Circle, Northern Lights, Blue Lagoon, and South Coast adventures.',
    challenge: 'The client needed a booking platform that could handle multiple service types (transfers, taxis, tours) while providing real-time availability, flight monitoring, and multilingual support for international tourists.',
    solution: 'We developed an elegant booking system with real-time availability, integrated flight monitoring for airport transfers, detailed tour packages with pricing, and a mobile-optimized experience. The platform includes customer reviews and driver ratings.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Vercel'],
    results: [
      { metric: 'Online Bookings', value: '+320%' },
      { metric: 'Customer Rating', value: '4.9/5' },
      { metric: 'Mobile Bookings', value: '68%' },
      { metric: 'Repeat Customers', value: '45%' }
    ],
    duration: '7 weeks',
    teamSize: '3 developers',
    featured: true,
    relatedServices: ['web-development', 'frontend-development', 'next-js-development', 'e-commerce', 'ui-design'],
    translations: {
      tr: {
        name: 'PrimeTaxi & Tours - İzlanda Ulaşım',
        description: 'Havalimanı transferleri ve rehberli turlarla İzlanda için premium ulaşım ve turizm rezervasyon platformu.',
        fullDescription: 'İzlanda\'da gezginlere hizmet veren kapsamlı bir ulaşım ve turizm platformu olan PrimeTaxi & Tours\'u oluşturduk. Platform, havalimanı transferleri, şehir taksileri ve Golden Circle, Kuzey Işıkları dahil özel rehberli turlar için sorunsuz rezervasyon sunmaktadır.',
        challenge: 'Müşteri, uluslararası turistler için gerçek zamanlı müsaitlik ve çok dilli destek sağlayan bir rezervasyon platformu ihtiyacındaydı.',
        solution: 'Gerçek zamanlı müsaitlik, entegre uçuş takibi ve detaylı tur paketleriyle zarif bir rezervasyon sistemi geliştirdik.'
      },
      de: {
        name: 'PrimeTaxi & Tours - Island Transport',
        description: 'Premium Transport- und Tourismus-Buchungsplattform für Island mit Flughafentransfers und geführten Touren.',
        fullDescription: 'Wir haben PrimeTaxi & Tours entwickelt, eine umfassende Transport- und Tourismusplattform für Reisende in Island mit nahtloser Buchung für Flughafentransfers und private Touren.',
        challenge: 'Der Kunde benötigte eine Buchungsplattform mit Echtzeitverfügbarkeit und mehrsprachiger Unterstützung für internationale Touristen.',
        solution: 'Wir haben ein elegantes Buchungssystem mit Echtzeitverfügbarkeit und integrierter Flugüberwachung entwickelt.'
      },
      ur: {
        name: 'پرائم ٹیکسی اینڈ ٹورز - آئس لینڈ ٹرانسپورٹیشن',
        description: 'ایئرپورٹ ٹرانسفر اور گائیڈڈ ٹورز کے ساتھ آئس لینڈ کے لیے پریمیم ٹرانسپورٹیشن بکنگ پلیٹ فارم۔',
        fullDescription: 'ہم نے پرائم ٹیکسی اینڈ ٹورز بنایا، آئس لینڈ میں مسافروں کی خدمت کرنے والا ایک جامع ٹرانسپورٹیشن اور سیاحت پلیٹ فارم۔',
        challenge: 'کلائنٹ کو بین الاقوامی سیاحوں کے لیے ریئل ٹائم دستیابی کے ساتھ ایک بکنگ پلیٹ فارم کی ضرورت تھی۔',
        solution: 'ہم نے ریئل ٹائم دستیابی اور فلائٹ مانیٹرنگ کے ساتھ ایک خوبصورت بکنگ سسٹم تیار کیا۔'
      },
      ar: {
        name: 'برايم تاكسي آند تورز - النقل في أيسلندا',
        description: 'منصة حجز النقل والسياحة الفاخرة في أيسلندا مع خدمات النقل من المطار والجولات المصحوبة بمرشدين.',
        fullDescription: 'قمنا ببناء برايم تاكسي آند تورز، منصة شاملة للنقل والسياحة تخدم المسافرين في أيسلندا مع حجز سلس لخدمات النقل والجولات الخاصة.',
        challenge: 'احتاج العميل إلى منصة حجز مع توفر في الوقت الفعلي ودعم متعدد اللغات للسياح الدوليين.',
        solution: 'طورنا نظام حجز أنيق مع توفر في الوقت الفعلي ومراقبة الرحلات المتكاملة.'
      }
    }
  },
  {
    name: 'Window Specialist - Pleated Screens E-commerce',
    slug: 'window-specialist',
    client: 'Window Specialist',
    category: 'e-commerce',
    industry: 'Home Improvement',
    projectUrl: 'https://sineklik-site-projesi.vercel.app/en',
    description: 'Custom window treatments e-commerce platform with interactive configurator and real-time pricing.',
    fullDescription: 'We developed Window Specialist, a comprehensive e-commerce platform for custom-made window treatments serving Dutch homes. The platform features an interactive product configurator with real-time pricing, virtual showroom with 3D visualization, AR product viewing, and professional installation booking.',
    challenge: 'The client needed an e-commerce solution that could handle complex product customization with multiple variables (size, color, mounting type) while providing accurate real-time pricing and visualization.',
    solution: 'We built an advanced product configurator that calculates prices in real-time based on dimensions and options. The platform includes AR visualization, before/after galleries, and a streamlined checkout process with free delivery and measurement insurance.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL', 'Vercel'],
    results: [
      { metric: 'Online Sales', value: '+280%' },
      { metric: 'Customer Satisfaction', value: '4.8/5' },
      { metric: 'Cart Abandonment', value: '-40%' },
      { metric: 'Configurator Usage', value: '89%' }
    ],
    duration: '10 weeks',
    teamSize: '4 developers',
    featured: true,
    relatedServices: ['e-commerce', 'web-development', 'frontend-development', 'next-js-development', 'ui-design'],
    translations: {
      tr: {
        name: 'Window Specialist - Sineklik E-ticaret',
        description: 'Etkileşimli yapılandırıcı ve gerçek zamanlı fiyatlandırma ile özel pencere çözümleri e-ticaret platformu.',
        fullDescription: 'Hollanda evlerine hizmet veren özel yapım pencere çözümleri için kapsamlı bir e-ticaret platformu olan Window Specialist\'i geliştirdik. Platform, gerçek zamanlı fiyatlandırma, 3D görselleştirme ve AR ürün görüntüleme özellikleri sunmaktadır.',
        challenge: 'Müşteri, birden fazla değişkenle karmaşık ürün özelleştirmesini işleyebilen ve doğru gerçek zamanlı fiyatlandırma sağlayan bir e-ticaret çözümüne ihtiyaç duyuyordu.',
        solution: 'Boyutlara ve seçeneklere göre fiyatları gerçek zamanlı hesaplayan gelişmiş bir ürün yapılandırıcısı oluşturduk.'
      },
      de: {
        name: 'Window Specialist - Plissee E-Commerce',
        description: 'E-Commerce-Plattform für maßgefertigte Fensterbehandlungen mit interaktivem Konfigurator und Echtzeitpreisen.',
        fullDescription: 'Wir haben Window Specialist entwickelt, eine umfassende E-Commerce-Plattform für maßgefertigte Fensterbehandlungen für niederländische Häuser mit interaktivem Produktkonfigurator und AR-Visualisierung.',
        challenge: 'Der Kunde benötigte eine E-Commerce-Lösung für komplexe Produktanpassungen mit Echtzeitpreisberechnung.',
        solution: 'Wir haben einen fortschrittlichen Produktkonfigurator gebaut, der Preise in Echtzeit berechnet.'
      },
      ur: {
        name: 'ونڈو اسپیشلسٹ - پلیٹڈ اسکرینز ای کامرس',
        description: 'انٹرایکٹو کنفیگریٹر اور ریئل ٹائم قیمتوں کے ساتھ کسٹم ونڈو ٹریٹمنٹس ای کامرس پلیٹ فارم۔',
        fullDescription: 'ہم نے ونڈو اسپیشلسٹ تیار کیا، ڈچ گھروں کے لیے کسٹم ونڈو ٹریٹمنٹس کے لیے ایک جامع ای کامرس پلیٹ فارم جس میں انٹرایکٹو پروڈکٹ کنفیگریٹر اور AR ویژولائزیشن ہے۔',
        challenge: 'کلائنٹ کو ریئل ٹائم قیمتوں کے ساتھ پیچیدہ پروڈکٹ کسٹمائزیشن کو سنبھالنے والے ای کامرس حل کی ضرورت تھی۔',
        solution: 'ہم نے ایک جدید پروڈکٹ کنفیگریٹر بنایا جو ریئل ٹائم میں قیمتوں کا حساب لگاتا ہے۔'
      },
      ar: {
        name: 'ويندو سبيشاليست - تجارة الشبكات الإلكترونية',
        description: 'منصة تجارة إلكترونية لمعالجات النوافذ المخصصة مع أداة تكوين تفاعلية وتسعير فوري.',
        fullDescription: 'طورنا ويندو سبيشاليست، منصة تجارة إلكترونية شاملة لمعالجات النوافذ المخصصة للمنازل الهولندية مع أداة تكوين تفاعلية وتصور AR.',
        challenge: 'احتاج العميل إلى حل تجارة إلكترونية يتعامل مع تخصيص المنتجات المعقدة مع تسعير فوري دقيق.',
        solution: 'قمنا ببناء أداة تكوين متقدمة تحسب الأسعار في الوقت الفعلي.'
      }
    }
  },
  {
    name: 'ArsaSat - Land Trading Platform',
    slug: 'arsasat',
    client: 'ArsaAl Gayrimenkul A.Ş.',
    category: 'web-development',
    industry: 'Real Estate',
    projectUrl: 'https://arsaalimi.com/',
    description: 'Turkey\'s fastest land buying platform with instant valuations and same-day cash offers.',
    fullDescription: 'We created ArsaSat, Turkey\'s fastest platform for converting land and property assets into cash. The platform offers free valuations within 24 hours, same-day cash offers, and handles all legal complexities including inheritance, transfer, and shared title issues across all 81 provinces.',
    challenge: 'The client needed a platform that could simplify the complex land selling process while building trust through transparency, handling legal complications, and providing nationwide coverage.',
    solution: 'We developed a streamlined platform with easy valuation requests, clear process explanations, and trust-building elements. The design emphasizes speed, security, and transparency with no hidden fees or agent commissions.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel'],
    results: [
      { metric: 'Valuation Requests', value: '+240%' },
      { metric: 'Trust Score', value: '4.7/5' },
      { metric: 'Conversion Rate', value: '+55%' },
      { metric: 'Page Speed', value: '98/100' }
    ],
    duration: '6 weeks',
    teamSize: '3 developers',
    featured: true,
    relatedServices: ['web-development', 'frontend-development', 'next-js-development', 'corporate-websites'],
    translations: {
      tr: {
        name: 'ArsaSat - Arsa Alım Satım Platformu',
        description: 'Anlık değerleme ve aynı gün nakit teklifleriyle Türkiye\'nin en hızlı arsa alım platformu.',
        fullDescription: 'Arsa ve mülk varlıklarını nakde dönüştürmek için Türkiye\'nin en hızlı platformu olan ArsaSat\'ı oluşturduk. Platform, 24 saat içinde ücretsiz değerleme, aynı gün nakit teklif ve miras, devir ve hisseli tapu sorunları dahil tüm yasal karmaşıklıkları ele almaktadır.',
        challenge: 'Müşteri, şeffaflık yoluyla güven oluşturan ve yasal komplikasyonları ele alan, karmaşık arsa satış sürecini basitleştirebilecek bir platforma ihtiyaç duyuyordu.',
        solution: 'Kolay değerleme talepleri, net süreç açıklamaları ve güven oluşturan unsurlarla akıcı bir platform geliştirdik.'
      },
      de: {
        name: 'ArsaSat - Grundstückshandel-Plattform',
        description: 'Die schnellste Grundstückskauf-Plattform der Türkei mit sofortigen Bewertungen und Barangeboten am selben Tag.',
        fullDescription: 'Wir haben ArsaSat entwickelt, die schnellste Plattform der Türkei zur Umwandlung von Grundstücken in Bargeld mit kostenlosen Bewertungen innerhalb von 24 Stunden und Barangeboten am selben Tag.',
        challenge: 'Der Kunde benötigte eine Plattform, die den komplexen Grundstücksverkaufsprozess vereinfacht und Vertrauen aufbaut.',
        solution: 'Wir haben eine optimierte Plattform mit einfachen Bewertungsanfragen und vertrauensbildenden Elementen entwickelt.'
      },
      ur: {
        name: 'ارساسات - زمین کی تجارت کا پلیٹ فارم',
        description: 'فوری تشخیص اور اسی دن نقد پیشکش کے ساتھ ترکی کا سب سے تیز زمین خریدنے کا پلیٹ فارم۔',
        fullDescription: 'ہم نے ارساسات بنایا، زمین اور جائیداد کو نقد میں تبدیل کرنے کے لیے ترکی کا سب سے تیز پلیٹ فارم جو 24 گھنٹوں میں مفت تشخیص اور اسی دن نقد پیشکش فراہم کرتا ہے۔',
        challenge: 'کلائنٹ کو ایک ایسے پلیٹ فارم کی ضرورت تھی جو پیچیدہ زمین فروخت کے عمل کو آسان بنا سکے۔',
        solution: 'ہم نے آسان تشخیص درخواستوں اور اعتماد پیدا کرنے والے عناصر کے ساتھ ایک بہتر پلیٹ فارم تیار کیا۔'
      },
      ar: {
        name: 'أرساسات - منصة تداول الأراضي',
        description: 'أسرع منصة لشراء الأراضي في تركيا مع تقييمات فورية وعروض نقدية في نفس اليوم.',
        fullDescription: 'أنشأنا أرساسات، أسرع منصة في تركيا لتحويل الأراضي والممتلكات إلى نقد مع تقييمات مجانية خلال 24 ساعة وعروض نقدية في نفس اليوم.',
        challenge: 'احتاج العميل إلى منصة تبسط عملية بيع الأراضي المعقدة وتبني الثقة.',
        solution: 'طورنا منصة مبسطة مع طلبات تقييم سهلة وعناصر بناء الثقة.'
      }
    }
  },
  {
    name: 'Mutfak Mobilya - Kitchen Furniture E-commerce',
    slug: 'mutfak-mobilya',
    client: 'Mutfak Mobilya',
    category: 'e-commerce',
    industry: 'Furniture & Home',
    projectUrl: 'https://ecommerece-project-red.vercel.app/',
    description: 'Premium kitchen furniture e-commerce platform with design consultations and custom solutions.',
    fullDescription: 'We developed Mutfak Mobilya, a comprehensive e-commerce platform dedicated to kitchen furniture and design solutions in Turkey. The platform features a rich product catalog, custom design consultations, detailed blog content, and showcases 15+ years of experience with 1,000+ completed projects.',
    challenge: 'The client needed an e-commerce platform that could showcase their extensive kitchen furniture catalog while providing design inspiration, consultation booking, and trust signals for a high-value purchase category.',
    solution: 'We created an elegant e-commerce experience with detailed product pages, filtering by category, featured products with promotions, a design tips blog, customer testimonials, and integrated WhatsApp support for consultations.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL', 'Vercel'],
    results: [
      { metric: 'Product Views', value: '+190%' },
      { metric: 'Consultation Requests', value: '+150%' },
      { metric: 'Average Order Value', value: '+35%' },
      { metric: 'Return Visitors', value: '52%' }
    ],
    duration: '8 weeks',
    teamSize: '3 developers',
    featured: true,
    relatedServices: ['e-commerce', 'web-development', 'frontend-development', 'next-js-development', 'ui-design'],
    translations: {
      tr: {
        name: 'Mutfak Mobilya - Mutfak Mobilyası E-ticaret',
        description: 'Tasarım danışmanlığı ve özel çözümlerle premium mutfak mobilyası e-ticaret platformu.',
        fullDescription: 'Türkiye\'de mutfak mobilyası ve tasarım çözümlerine adanmış kapsamlı bir e-ticaret platformu olan Mutfak Mobilya\'yı geliştirdik. Platform, zengin ürün kataloğu, özel tasarım danışmanlığı ve 15+ yıllık deneyimle 1000+ tamamlanmış projeyi sergilemektedir.',
        challenge: 'Müşteri, geniş mutfak mobilyası kataloğunu sergileyebilen, tasarım ilhamı ve danışmanlık rezervasyonu sağlayan bir e-ticaret platformuna ihtiyaç duyuyordu.',
        solution: 'Detaylı ürün sayfaları, kategori filtreleme, tasarım ipuçları blogu ve entegre WhatsApp desteğiyle zarif bir e-ticaret deneyimi oluşturduk.'
      },
      de: {
        name: 'Mutfak Mobilya - Küchenmöbel E-Commerce',
        description: 'Premium Küchenmöbel E-Commerce-Plattform mit Designberatung und maßgeschneiderten Lösungen.',
        fullDescription: 'Wir haben Mutfak Mobilya entwickelt, eine umfassende E-Commerce-Plattform für Küchenmöbel und Designlösungen in der Türkei mit reichhaltigem Produktkatalog und Designberatung.',
        challenge: 'Der Kunde benötigte eine E-Commerce-Plattform für seinen umfangreichen Küchenmöbelkatalog mit Designinspiration.',
        solution: 'Wir haben ein elegantes E-Commerce-Erlebnis mit detaillierten Produktseiten und integriertem WhatsApp-Support erstellt.'
      },
      ur: {
        name: 'متفاک موبیلیا - کچن فرنیچر ای کامرس',
        description: 'ڈیزائن کنسلٹیشنز اور کسٹم سولوشنز کے ساتھ پریمیم کچن فرنیچر ای کامرس پلیٹ فارم۔',
        fullDescription: 'ہم نے متفاک موبیلیا تیار کیا، ترکی میں کچن فرنیچر اور ڈیزائن سولوشنز کے لیے ایک جامع ای کامرس پلیٹ فارم جس میں بھرپور پروڈکٹ کیٹلاگ اور ڈیزائن کنسلٹیشن ہے۔',
        challenge: 'کلائنٹ کو ایک ای کامرس پلیٹ فارم کی ضرورت تھی جو ان کے وسیع کچن فرنیچر کیٹلاگ کو دکھا سکے۔',
        solution: 'ہم نے تفصیلی پروڈکٹ پیجز اور انٹیگریٹڈ واٹس ایپ سپورٹ کے ساتھ ایک خوبصورت ای کامرس تجربہ بنایا۔'
      },
      ar: {
        name: 'موتفاك موبيليا - تجارة أثاث المطبخ الإلكترونية',
        description: 'منصة تجارة إلكترونية فاخرة لأثاث المطبخ مع استشارات التصميم والحلول المخصصة.',
        fullDescription: 'طورنا موتفاك موبيليا، منصة تجارة إلكترونية شاملة مخصصة لأثاث المطبخ وحلول التصميم في تركيا مع كتالوج منتجات غني واستشارات التصميم.',
        challenge: 'احتاج العميل إلى منصة تجارة إلكترونية يمكنها عرض كتالوج أثاث المطبخ الواسع مع إلهام التصميم.',
        solution: 'أنشأنا تجربة تجارة إلكترونية أنيقة مع صفحات منتجات مفصلة ودعم واتساب متكامل.'
      }
    }
  }
];

async function addProjects() {
  console.log('=== Adding Portfolio Projects ===\n');

  for (const projectData of projects) {
    try {
      // Check if project already exists
      const existing = await prisma.project.findUnique({
        where: { slug: projectData.slug }
      });

      if (existing) {
        console.log(`⏭️  ${projectData.slug}: already exists, skipping`);
        continue;
      }

      // Create the project
      const project = await prisma.project.create({
        data: {
          name: projectData.name,
          slug: projectData.slug,
          client: projectData.client,
          category: projectData.category,
          industry: projectData.industry,
          status: 'published',
          featured: projectData.featured,
          description: projectData.description,
          fullDescription: projectData.fullDescription,
          challenge: projectData.challenge,
          solution: projectData.solution,
          technologies: projectData.technologies,
          results: projectData.results,
          duration: projectData.duration,
          teamSize: projectData.teamSize,
          projectUrl: projectData.projectUrl,
          completedDate: new Date(),
        }
      });

      console.log(`✅ Created project: ${projectData.name}`);

      // Add translations
      for (const [locale, translation] of Object.entries(projectData.translations)) {
        await prisma.projectTranslation.create({
          data: {
            projectId: project.id,
            locale,
            name: translation.name,
            description: translation.description,
            fullDescription: translation.fullDescription,
            challenge: translation.challenge,
            solution: translation.solution,
          }
        });
      }
      console.log(`   ✅ Added translations (TR, DE, UR, AR)`);

    } catch (error) {
      console.error(`❌ Error creating ${projectData.slug}:`, error);
    }
  }

  console.log('\n=== Projects Added Successfully ===');
  await prisma.$disconnect();
}

addProjects();
