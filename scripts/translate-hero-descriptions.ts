/**
 * Translate fullDescription (hero description) for all services
 * This is what appears in the hero section of service pages
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

type Locale = 'tr' | 'de' | 'ur' | 'ar';

// Service-specific hero descriptions
const heroDescriptions: Record<string, Record<Locale, string>> = {
  'youtube-ads': {
    tr: 'Atlanabilir, atlanamaz, bumper ve keşif reklam kampanyalarıyla güçlü YouTube video reklamcılığından yararlanın.',
    de: 'Nutzen Sie YouTube für leistungsstarke Videowerbung mit überspringbaren, nicht überspringbaren, Bumper- und Discovery-Werbekampagnen.',
    ur: 'قابل چھوڑنے، غیر قابل چھوڑنے، بمپر، اور ڈسکوری ایڈ کیمپینز کے ذریعے طاقتور یوٹیوب ویڈیو ایڈورٹائزنگ کا فائدہ اٹھائیں۔',
    ar: 'استفد من يوتيوب للإعلانات المرئية القوية مع حملات الإعلانات القابلة للتخطي وغير القابلة للتخطي وإعلانات البامبر والاكتشاف.'
  },
  'facebook-ads': {
    tr: 'Dünyanın en büyük sosyal ağında hedefli Facebook reklam kampanyalarıyla milyarlarca kullanıcıya ulaşın.',
    de: 'Erreichen Sie Milliarden von Nutzern mit gezielten Facebook-Werbekampagnen im größten sozialen Netzwerk der Welt.',
    ur: 'دنیا کے سب سے بڑے سوشل نیٹ ورک پر ہدف شدہ فیس بک ایڈ کیمپینز کے ذریعے اربوں صارفین تک پہنچیں۔',
    ar: 'وصل إلى مليارات المستخدمين من خلال حملات إعلانات فيسبوك المستهدفة على أكبر شبكة اجتماعية في العالم.'
  },
  'instagram-ads': {
    tr: 'Hikayeler, Reels ve feed reklamlarıyla görsel odaklı Instagram pazarlamasıyla kitlenizi büyüleyin.',
    de: 'Fesseln Sie Ihr Publikum mit visuell orientiertem Instagram-Marketing durch Stories, Reels und Feed-Anzeigen.',
    ur: 'سٹوریز، ریلز اور فیڈ ایڈز کے ذریعے بصری مرکوز انسٹاگرام مارکیٹنگ سے اپنے سامعین کو مسحور کریں۔',
    ar: 'اجذب جمهورك من خلال التسويق المرئي على إنستغرام عبر القصص والريلز وإعلانات الخلاصة.'
  },
  'google-ads': {
    tr: 'Arama, görüntülü reklam, alışveriş ve video kampanyalarıyla Google Ads\'in gücünden yararlanın.',
    de: 'Nutzen Sie die Kraft von Google Ads mit Such-, Display-, Shopping- und Video-Kampagnen.',
    ur: 'سرچ، ڈسپلے، شاپنگ اور ویڈیو کیمپینز کے ذریعے گوگل ایڈز کی طاقت کا فائدہ اٹھائیں۔',
    ar: 'استفد من قوة إعلانات جوجل مع حملات البحث والعرض والتسوق والفيديو.'
  },
  'google-search-ads': {
    tr: 'Google\'da aktif olarak arayan müşterilere yüksek niyet anahtar kelime hedeflemeyle ulaşın.',
    de: 'Erreichen Sie Kunden, die aktiv auf Google suchen, mit Keyword-Targeting mit hoher Kaufabsicht.',
    ur: 'گوگل پر فعال طور پر تلاش کرنے والے صارفین تک اعلیٰ نیت والی کی ورڈ ہدف بندی کے ذریعے پہنچیں۔',
    ar: 'وصل إلى العملاء الذين يبحثون بنشاط على جوجل من خلال استهداف الكلمات المفتاحية ذات النية العالية.'
  },
  'google-display-ads': {
    tr: 'Milyonlarca web sitesi ve uygulamadaki görsel banner reklamlarla marka bilinirliği oluşturun.',
    de: 'Bauen Sie Markenbekanntheit mit visuellen Banner-Anzeigen auf Millionen von Websites und Apps auf.',
    ur: 'لاکھوں ویب سائٹس اور ایپس پر بصری بینر ایڈز کے ذریعے برانڈ آگاہی بنائیں۔',
    ar: 'ابنِ الوعي بالعلامة التجارية من خلال إعلانات البانر المرئية على ملايين المواقع والتطبيقات.'
  },
  'web-development': {
    tr: 'Next.js, React ve modern teknolojilerle yüksek performanslı, SEO dostu web siteleri ve uygulamalar oluşturun.',
    de: 'Erstellen Sie leistungsstarke, SEO-freundliche Websites und Anwendungen mit Next.js, React und modernen Technologien.',
    ur: 'Next.js، React اور جدید ٹیکنالوجیز کے ساتھ اعلیٰ کارکردگی، SEO دوست ویب سائٹس اور ایپلیکیشنز بنائیں۔',
    ar: 'أنشئ مواقع وتطبيقات عالية الأداء وصديقة لمحركات البحث باستخدام Next.js و React والتقنيات الحديثة.'
  },
  'mobile-development': {
    tr: 'iOS ve Android için React Native ve Flutter ile yerel ve çapraz platform mobil uygulamalar geliştirin.',
    de: 'Entwickeln Sie native und plattformübergreifende mobile Apps für iOS und Android mit React Native und Flutter.',
    ur: 'React Native اور Flutter کے ساتھ iOS اور Android کے لیے نیٹو اور کراس پلیٹ فارم موبائل ایپس بنائیں۔',
    ar: 'طور تطبيقات جوال أصلية ومتعددة المنصات لـ iOS و Android باستخدام React Native و Flutter.'
  },
  'seo': {
    tr: 'Teknik SEO, içerik optimizasyonu ve bağlantı oluşturma ile organik arama görünürlüğünüzü artırın.',
    de: 'Steigern Sie Ihre organische Suchsichtbarkeit mit technischer SEO, Content-Optimierung und Linkaufbau.',
    ur: 'ٹیکنیکل SEO، مواد کی اصلاح اور لنک بلڈنگ کے ذریعے اپنی نامیاتی سرچ مرئیت کو بڑھائیں۔',
    ar: 'عزز ظهورك في البحث العضوي من خلال SEO التقني وتحسين المحتوى وبناء الروابط.'
  },
  'e-commerce': {
    tr: 'Shopify, WooCommerce veya özel çözümlerle dönüşüm odaklı online mağazalar oluşturun.',
    de: 'Erstellen Sie konversionsorientierte Online-Shops mit Shopify, WooCommerce oder maßgeschneiderten Lösungen.',
    ur: 'Shopify، WooCommerce یا کسٹم سلوشنز کے ساتھ کنورژن مرکوز آن لائن سٹورز بنائیں۔',
    ar: 'أنشئ متاجر إلكترونية تركز على التحويل باستخدام Shopify أو WooCommerce أو حلول مخصصة.'
  },
  'ui-ux-design': {
    tr: 'Kullanıcı merkezli araştırma, tel çerçeveleme ve prototipleme ile sezgisel dijital deneyimler tasarlayın.',
    de: 'Gestalten Sie intuitive digitale Erlebnisse mit nutzerorientierter Forschung, Wireframing und Prototyping.',
    ur: 'صارف مرکوز تحقیق، وائر فریمنگ اور پروٹوٹائپنگ کے ساتھ بدیہی ڈیجیٹل تجربات ڈیزائن کریں۔',
    ar: 'صمم تجارب رقمية بديهية من خلال البحث المتمحور حول المستخدم والإطارات السلكية والنماذج الأولية.'
  },
  'ai-solutions': {
    tr: 'İşletmenizi makine öğrenimi, NLP ve özel AI modelleriyle dönüştürün.',
    de: 'Transformieren Sie Ihr Unternehmen mit maschinellem Lernen, NLP und maßgeschneiderten KI-Modellen.',
    ur: 'مشین لرننگ، NLP اور کسٹم AI ماڈلز کے ساتھ اپنے کاروبار کو تبدیل کریں۔',
    ar: 'حول أعمالك باستخدام التعلم الآلي ومعالجة اللغة الطبيعية ونماذج الذكاء الاصطناعي المخصصة.'
  },
  'digital-marketing': {
    tr: 'SEO, PPC, sosyal medya ve içerik pazarlamasıyla online varlığınızı büyütün.',
    de: 'Wachsen Sie Ihre Online-Präsenz mit SEO, PPC, Social Media und Content-Marketing.',
    ur: 'SEO، PPC، سوشل میڈیا اور کنٹینٹ مارکیٹنگ کے ساتھ اپنی آن لائن موجودگی کو بڑھائیں۔',
    ar: 'نمِّ حضورك الرقمي من خلال SEO و PPC ووسائل التواصل الاجتماعي وتسويق المحتوى.'
  },
  'content-marketing': {
    tr: 'Hedef kitlenizi çeken ve dönüştüren değerli içerikler oluşturun ve dağıtın.',
    de: 'Erstellen und verteilen Sie wertvolle Inhalte, die Ihre Zielgruppe anziehen und konvertieren.',
    ur: 'قیمتی مواد بنائیں اور تقسیم کریں جو آپ کے ہدف سامعین کو متوجہ کرے اور تبدیل کرے۔',
    ar: 'أنشئ ووزع محتوى قيم يجذب جمهورك المستهدف ويحوله.'
  },
  'social-media-marketing': {
    tr: 'Stratejik sosyal medya kampanyalarıyla marka etkileşimini ve topluluk büyümesini artırın.',
    de: 'Steigern Sie Markenengagement und Community-Wachstum mit strategischen Social-Media-Kampagnen.',
    ur: 'سٹریٹیجک سوشل میڈیا کیمپینز کے ذریعے برانڈ انگیجمنٹ اور کمیونٹی گروتھ کو بڑھائیں۔',
    ar: 'عزز تفاعل العلامة التجارية ونمو المجتمع من خلال حملات وسائل التواصل الاجتماعي الاستراتيجية.'
  },
  'devops-cloud': {
    tr: 'CI/CD, Kubernetes ve bulut altyapısıyla geliştirme süreçlerinizi optimize edin.',
    de: 'Optimieren Sie Ihre Entwicklungspipelines mit CI/CD, Kubernetes und Cloud-Infrastruktur.',
    ur: 'CI/CD، Kubernetes اور کلاؤڈ انفراسٹرکچر کے ساتھ اپنی ڈویلپمنٹ پائپ لائنز کو بہتر بنائیں۔',
    ar: 'حسّن خطوط تطويرك باستخدام CI/CD و Kubernetes والبنية التحتية السحابية.'
  },
  'blockchain-development': {
    tr: 'Akıllı sözleşmeler, DApps ve tokenizasyon çözümleriyle blockchain uygulamaları geliştirin.',
    de: 'Entwickeln Sie Blockchain-Anwendungen mit Smart Contracts, DApps und Tokenisierungslösungen.',
    ur: 'سمارٹ کنٹریکٹس، DApps اور ٹوکنائزیشن سلوشنز کے ساتھ بلاکچین ایپلیکیشنز بنائیں۔',
    ar: 'طور تطبيقات البلوكتشين باستخدام العقود الذكية و DApps وحلول الترميز.'
  },
  'data-analytics': {
    tr: 'Veriye dayalı içgörülerle iş kararlarınızı güçlendirin ve büyümeyi hızlandırın.',
    de: 'Stärken Sie Ihre Geschäftsentscheidungen mit datengetriebenen Erkenntnissen und beschleunigen Sie das Wachstum.',
    ur: 'ڈیٹا پر مبنی بصیرت کے ساتھ اپنے کاروباری فیصلوں کو مضبوط بنائیں اور ترقی کو تیز کریں۔',
    ar: 'عزز قرارات أعمالك بالرؤى المستندة إلى البيانات وسرّع النمو.'
  },
  'cybersecurity': {
    tr: 'Kapsamlı güvenlik denetimleri, sızma testleri ve uyumluluk çözümleriyle işletmenizi koruyun.',
    de: 'Schützen Sie Ihr Unternehmen mit umfassenden Sicherheitsaudits, Penetrationstests und Compliance-Lösungen.',
    ur: 'جامع سیکیورٹی آڈٹس، پینیٹریشن ٹیسٹنگ اور کمپلائنس سلوشنز کے ذریعے اپنے کاروبار کی حفاظت کریں۔',
    ar: 'احمِ أعمالك من خلال عمليات التدقيق الأمني الشاملة واختبارات الاختراق وحلول الامتثال.'
  },
  'influencer-marketing': {
    tr: 'Nişinize uygun içerik üreticileri ve influencerlarla stratejik ortaklıklar kurun.',
    de: 'Bauen Sie strategische Partnerschaften mit Content Creators und Influencern auf, die zu Ihrer Nische passen.',
    ur: 'اپنی نش کے مطابق کنٹینٹ کریٹرز اور انفلوئنسرز کے ساتھ اسٹریٹیجک پارٹنرشپس بنائیں۔',
    ar: 'ابنِ شراكات استراتيجية مع صناع المحتوى والمؤثرين المناسبين لمجالك.'
  },
  'email-marketing': {
    tr: 'Kişiselleştirilmiş e-posta kampanyaları ve otomasyonla müşteri ilişkilerinizi güçlendirin.',
    de: 'Stärken Sie Ihre Kundenbeziehungen mit personalisierten E-Mail-Kampagnen und Automatisierung.',
    ur: 'ذاتی نوعیت کی ای میل کیمپینز اور آٹومیشن کے ذریعے اپنے کسٹمر تعلقات کو مضبوط بنائیں۔',
    ar: 'عزز علاقات عملائك من خلال حملات البريد الإلكتروني المخصصة والأتمتة.'
  },
  'testing': {
    tr: 'Manuel ve otomatik testlerle yazılım kalitesini güvence altına alın ve hataları önleyin.',
    de: 'Sichern Sie Softwarequalität und verhindern Sie Fehler mit manuellen und automatisierten Tests.',
    ur: 'دستی اور خودکار ٹیسٹنگ کے ذریعے سافٹ ویئر کوالٹی کو یقینی بنائیں اور خرابیوں کو روکیں۔',
    ar: 'اضمن جودة البرمجيات وامنع الأخطاء من خلال الاختبارات اليدوية والآلية.'
  },
  'saas-development': {
    tr: 'Ölçeklenebilir, çok kiracılı SaaS platformları tasarlayın ve geliştirin.',
    de: 'Entwerfen und entwickeln Sie skalierbare, mandantenfähige SaaS-Plattformen.',
    ur: 'اسکیل ایبل، ملٹی ٹیننٹ SaaS پلیٹ فارمز ڈیزائن اور ڈویلپ کریں۔',
    ar: 'صمم وطور منصات SaaS قابلة للتوسع ومتعددة المستأجرين.'
  },
  'chatbot-development': {
    tr: 'AI destekli chatbotlar ve sanal asistanlarla müşteri hizmetlerini otomatikleştirin.',
    de: 'Automatisieren Sie den Kundenservice mit KI-gestützten Chatbots und virtuellen Assistenten.',
    ur: 'AI سے چلنے والے چیٹ بوٹس اور ورچوئل اسسٹنٹس کے ذریعے کسٹمر سروس کو خودکار بنائیں۔',
    ar: 'أتمت خدمة العملاء باستخدام روبوتات المحادثة والمساعدين الافتراضيين المدعومين بالذكاء الاصطناعي.'
  },
  'ci-cd-pipelines': {
    tr: 'Otomatik derleme, test ve dağıtım süreçleriyle sürekli entegrasyon ve dağıtım kurun.',
    de: 'Richten Sie kontinuierliche Integration und Bereitstellung mit automatisierten Build-, Test- und Deployment-Pipelines ein.',
    ur: 'خودکار بلڈ، ٹیسٹ اور ڈیپلائمنٹ پائپ لائنز کے ساتھ مسلسل انٹیگریشن اور ڈیلیوری قائم کریں۔',
    ar: 'أنشئ التكامل والنشر المستمر مع خطوط البناء والاختبار والنشر الآلية.'
  },
  'docker-kubernetes': {
    tr: 'Docker konteynerları ve Kubernetes orkestasyonu ile uygulamalarınızı ölçeklendirin.',
    de: 'Skalieren Sie Ihre Anwendungen mit Docker-Containern und Kubernetes-Orchestrierung.',
    ur: 'Docker کنٹینرز اور Kubernetes آرکیسٹریشن کے ساتھ اپنی ایپلیکیشنز کو اسکیل کریں۔',
    ar: 'وسّع تطبيقاتك باستخدام حاويات Docker وتنسيق Kubernetes.'
  },
  'cloud-management': {
    tr: 'AWS, Azure ve GCP üzerinde bulut altyapınızı yönetin ve optimize edin.',
    de: 'Verwalten und optimieren Sie Ihre Cloud-Infrastruktur auf AWS, Azure und GCP.',
    ur: 'AWS، Azure اور GCP پر اپنی کلاؤڈ انفراسٹرکچر کا نظم اور اصلاح کریں۔',
    ar: 'أدر وحسّن البنية التحتية السحابية على AWS و Azure و GCP.'
  },
  'workflow-automation': {
    tr: 'Tekrarlayan iş süreçlerini otomatikleştirerek verimlilik ve üretkenliği artırın.',
    de: 'Steigern Sie Effizienz und Produktivität durch Automatisierung sich wiederholender Geschäftsprozesse.',
    ur: 'دہرائے جانے والے کاروباری عمل کو خودکار بنا کر کارکردگی اور پیداواریت بڑھائیں۔',
    ar: 'عزز الكفاءة والإنتاجية من خلال أتمتة العمليات التجارية المتكررة.'
  },
  'business-intelligence': {
    tr: 'Veri görselleştirme ve raporlama araçlarıyla iş zekası çözümleri oluşturun.',
    de: 'Erstellen Sie Business-Intelligence-Lösungen mit Datenvisualisierung und Reporting-Tools.',
    ur: 'ڈیٹا ویژولائزیشن اور رپورٹنگ ٹولز کے ساتھ بزنس انٹیلیجنس سلوشنز بنائیں۔',
    ar: 'أنشئ حلول ذكاء الأعمال باستخدام أدوات تصور البيانات وإعداد التقارير.'
  },
  'big-data-etl': {
    tr: 'Büyük veri işleme ve ETL pipeline\'ları ile veri akışlarınızı yönetin.',
    de: 'Verwalten Sie Ihre Datenströme mit Big-Data-Verarbeitung und ETL-Pipelines.',
    ur: 'بگ ڈیٹا پروسیسنگ اور ETL پائپ لائنز کے ساتھ اپنے ڈیٹا فلو کا نظم کریں۔',
    ar: 'أدر تدفقات بياناتك من خلال معالجة البيانات الضخمة وخطوط ETL.'
  },
  'link-building': {
    tr: 'Kaliteli backlink stratejileriyle arama motoru sıralamalarınızı yükseltin.',
    de: 'Verbessern Sie Ihre Suchmaschinen-Rankings mit hochwertigen Backlink-Strategien.',
    ur: 'معیاری بیک لنک سٹریٹیجیز کے ذریعے اپنی سرچ انجن رینکنگز کو بہتر بنائیں۔',
    ar: 'حسّن ترتيبك في محركات البحث من خلال استراتيجيات الروابط الخلفية عالية الجودة.'
  },
  'local-seo': {
    tr: 'Yerel arama sonuçlarında öne çıkarak bölgenizdeki müşterilere ulaşın.',
    de: 'Erreichen Sie Kunden in Ihrer Region durch Hervorhebung in lokalen Suchergebnissen.',
    ur: 'مقامی تلاش کے نتائج میں نمایاں ہو کر اپنے علاقے کے صارفین تک پہنچیں۔',
    ar: 'وصل إلى العملاء في منطقتك من خلال التميز في نتائج البحث المحلية.'
  },
  'technical-seo': {
    tr: 'Site hızı, mobil uyumluluk ve teknik optimizasyonlarla SEO performansınızı artırın.',
    de: 'Verbessern Sie Ihre SEO-Leistung mit Website-Geschwindigkeit, Mobile-Freundlichkeit und technischen Optimierungen.',
    ur: 'سائٹ سپیڈ، موبائل فرینڈلینس اور ٹیکنیکل آپٹیمائزیشنز کے ذریعے اپنی SEO کارکردگی کو بہتر بنائیں۔',
    ar: 'حسّن أداء SEO من خلال سرعة الموقع والتوافق مع الجوال والتحسينات التقنية.'
  },
  'ui-design': {
    tr: 'Görsel olarak çekici ve kullanıcı dostu arayüzler tasarlayın.',
    de: 'Gestalten Sie visuell ansprechende und benutzerfreundliche Oberflächen.',
    ur: 'بصری طور پر دلکش اور صارف دوست انٹرفیسز ڈیزائن کریں۔',
    ar: 'صمم واجهات جذابة بصرياً وسهلة الاستخدام.'
  },
  'ux-research': {
    tr: 'Kullanıcı araştırması ve testleriyle ürün deneyimini iyileştirin.',
    de: 'Verbessern Sie das Produkterlebnis durch Nutzerforschung und Tests.',
    ur: 'صارف کی تحقیق اور ٹیسٹنگ کے ذریعے پروڈکٹ تجربے کو بہتر بنائیں۔',
    ar: 'حسّن تجربة المنتج من خلال أبحاث واختبارات المستخدمين.'
  },
  'prototyping-wireframing': {
    tr: 'Hızlı prototipleme ve tel çerçevelerle fikirlerinizi görselleştirin.',
    de: 'Visualisieren Sie Ihre Ideen mit schnellem Prototyping und Wireframes.',
    ur: 'تیز پروٹوٹائپنگ اور وائر فریمز کے ذریعے اپنے آئیڈیاز کو بصری بنائیں۔',
    ar: 'تصور أفكارك من خلال النماذج الأولية السريعة والإطارات السلكية.'
  },
};

// Generic translations for services not in the list above
const genericDescriptions: Record<Locale, string> = {
  tr: 'İşletmenizi modern çözümlerle güçlendirin. Uzman ekibimiz, ihtiyaçlarınıza özel sonuçlar sunar.',
  de: 'Stärken Sie Ihr Unternehmen mit modernen Lösungen. Unser Expertenteam liefert maßgeschneiderte Ergebnisse.',
  ur: 'جدید حل کے ساتھ اپنے کاروبار کو مضبوط بنائیں۔ ہماری ماہر ٹیم آپ کی ضروریات کے مطابق نتائج فراہم کرتی ہے۔',
  ar: 'عزز أعمالك بالحلول الحديثة. فريق خبرائنا يقدم نتائج مخصصة لاحتياجاتك.'
};

async function translateHeroDescriptions() {
  console.log('🌍 Translating hero descriptions (fullDescription)...\n');

  try {
    const services = await prisma.service.findMany({
      where: { status: { in: ['published', 'active'] } },
      include: { translations: true }
    });

    let updated = 0;

    for (const service of services) {
      // Skip if no English fullDescription
      if (!service.fullDescription) continue;

      for (const locale of ['tr', 'de', 'ur', 'ar'] as Locale[]) {
        const translation = service.translations.find(t => t.locale === locale);
        if (!translation) continue;

        // Get translated description
        const translatedDesc = heroDescriptions[service.slug]?.[locale] || genericDescriptions[locale];

        // Update if different
        if (translation.fullDescription !== translatedDesc) {
          await prisma.serviceTranslation.update({
            where: { id: translation.id },
            data: { fullDescription: translatedDesc }
          });
          console.log(`✅ ${service.slug} [${locale.toUpperCase()}]`);
          updated++;
        }
      }
    }

    console.log(`\n=== Summary ===`);
    console.log(`Updated: ${updated} translations`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

translateHeroDescriptions();
