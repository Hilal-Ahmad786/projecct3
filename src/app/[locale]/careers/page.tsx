import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import Button from '@/components/Button';

const baseUrl = 'https://www.paksoft.com.tr';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const content: Record<Locale, {
  title: string;
  metaDesc: string;
  eyebrow: string;
  heading: string;
  sub: string;
  whyTitle: string;
  reasons: { title: string; desc: string }[];
  valuesTitle: string;
  values: string[];
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  noOpenings: string;
  noOpeningsDesc: string;
}> = {
  en: {
    title: 'Careers at PakSoft | Join Our Team',
    metaDesc: 'Explore career opportunities at PakSoft. We are always looking for talented engineers, designers, and marketers to join our growing team.',
    eyebrow: 'Careers',
    heading: 'Build the Future With Us',
    sub: 'We are a team of passionate builders. If you love solving hard problems and shipping great products, we would love to hear from you.',
    whyTitle: 'Why PakSoft?',
    reasons: [
      { title: 'Remote-First Culture', desc: 'Work from anywhere. We hire globally and support flexible hours.' },
      { title: 'Real Impact', desc: 'Every engineer ships code that thousands of customers use every day.' },
      { title: 'Continuous Growth', desc: 'Learning budget, mentorship, and a team that pushes you to level up.' },
      { title: 'Competitive Pay', desc: 'Market-rate compensation, performance bonuses, and equity options.' },
    ],
    valuesTitle: 'Our Values',
    values: ['Ship fast, iterate often', 'Own the outcome', 'Radical transparency', 'Customer obsession', 'Craft over haste'],
    ctaTitle: 'No Open Positions Right Now?',
    ctaDesc: 'We are always open to exceptional talent. Send us your CV and a short note about what you would build at PakSoft.',
    ctaBtn: 'Send Us Your CV',
    noOpenings: 'We are growing — check back soon.',
    noOpeningsDesc: 'We do not have published openings at the moment, but we are actively hiring. Reach out directly.',
  },
  tr: {
    title: 'PakSoft Kariyer | Ekibimize Katılın',
    metaDesc: 'PakSoft\'ta kariyer fırsatlarını keşfedin. Büyüyen ekibimize katılacak yetenekli mühendisler, tasarımcılar ve pazarlamacılar arıyoruz.',
    eyebrow: 'Kariyer',
    heading: 'Geleceği Birlikte İnşa Edin',
    sub: 'Tutkulu bir ekibiz. Zor problemleri çözmeyi ve harika ürünler çıkarmayı seviyorsanız, sizden haber almak isteriz.',
    whyTitle: 'Neden PakSoft?',
    reasons: [
      { title: 'Uzaktan Çalışma Kültürü', desc: 'Her yerden çalışın. Global işe alım yapıyor, esnek çalışma saatlerini destekliyoruz.' },
      { title: 'Gerçek Etki', desc: 'Her mühendis, binlerce müşterinin her gün kullandığı kodu hayata geçirir.' },
      { title: 'Sürekli Gelişim', desc: 'Öğrenme bütçesi, mentorluk ve sizi bir üst seviyeye taşıyacak bir ekip.' },
      { title: 'Rekabetçi Maaş', desc: 'Piyasa düzeyinde maaş, performans primleri ve hisse senedi seçenekleri.' },
    ],
    valuesTitle: 'Değerlerimiz',
    values: ['Hızlı gönder, sık iterasyon yap', 'Sonuca sahip çık', 'Radikal şeffaflık', 'Müşteri odaklılık', 'Acele yerine kalite'],
    ctaTitle: 'Şu An Açık Pozisyon Yok mu?',
    ctaDesc: 'Her zaman olağanüstü yeteneklere açığız. CV\'nizi ve PakSoft\'ta neler yapacağınıza dair kısa bir not gönderin.',
    ctaBtn: 'CV\'nizi Gönderin',
    noOpenings: 'Büyüyoruz — yakında tekrar kontrol edin.',
    noOpeningsDesc: 'Şu an yayınlanmış pozisyonumuz yok, ancak aktif olarak işe alım yapıyoruz. Doğrudan bize ulaşın.',
  },
  de: {
    title: 'Karriere bei PakSoft | Werde Teil unseres Teams',
    metaDesc: 'Entdecke Karrieremöglichkeiten bei PakSoft. Wir suchen talentierte Ingenieure, Designer und Marketer für unser wachsendes Team.',
    eyebrow: 'Karriere',
    heading: 'Die Zukunft gemeinsam gestalten',
    sub: 'Wir sind ein leidenschaftliches Team. Wenn du komplexe Probleme liebst und großartige Produkte entwickeln möchtest, freuen wir uns von dir zu hören.',
    whyTitle: 'Warum PakSoft?',
    reasons: [
      { title: 'Remote-First Kultur', desc: 'Arbeite von überall. Wir stellen global ein und unterstützen flexible Arbeitszeiten.' },
      { title: 'Echter Einfluss', desc: 'Jeder Ingenieur liefert Code, den tausende Kunden täglich nutzen.' },
      { title: 'Kontinuierliches Wachstum', desc: 'Lernbudget, Mentoring und ein Team, das dich auf das nächste Level bringt.' },
      { title: 'Wettbewerbsfähige Vergütung', desc: 'Marktgerechte Vergütung, Leistungsboni und Aktienoptionen.' },
    ],
    valuesTitle: 'Unsere Werte',
    values: ['Schnell liefern, häufig iterieren', 'Ergebnis verantworten', 'Radikale Transparenz', 'Kundenorientierung', 'Qualität vor Schnelligkeit'],
    ctaTitle: 'Keine offenen Stellen?',
    ctaDesc: 'Wir sind immer offen für außergewöhnliche Talente. Schick uns deinen Lebenslauf und eine kurze Notiz, was du bei PakSoft aufbauen würdest.',
    ctaBtn: 'Lebenslauf senden',
    noOpenings: 'Wir wachsen — schau bald wieder vorbei.',
    noOpeningsDesc: 'Wir haben gerade keine veröffentlichten Stellen, stellen aber aktiv ein. Kontaktiere uns direkt.',
  },
  ur: {
    title: 'PakSoft کیریئر | ہماری ٹیم میں شامل ہوں',
    metaDesc: 'PakSoft میں کیریئر کے مواقع دریافت کریں۔ ہم اپنی بڑھتی ہوئی ٹیم کے لیے باصلاحیت انجینئرز، ڈیزائنرز اور مارکیٹرز تلاش کر رہے ہیں۔',
    eyebrow: 'کیریئر',
    heading: 'مل کر مستقبل بنائیں',
    sub: 'ہم ایک پرجوش ٹیم ہیں۔ اگر آپ مشکل مسائل حل کرنا اور بہترین مصنوعات بنانا پسند کرتے ہیں، تو ہم آپ سے سننا چاہیں گے۔',
    whyTitle: 'PakSoft کیوں؟',
    reasons: [
      { title: 'ریموٹ فرسٹ کلچر', desc: 'کہیں سے بھی کام کریں۔ ہم عالمی سطح پر بھرتی کرتے ہیں اور لچکدار اوقات کی حمایت کرتے ہیں۔' },
      { title: 'حقیقی اثر', desc: 'ہر انجینئر ایسا کوڈ شپ کرتا ہے جو ہزاروں صارفین روزانہ استعمال کرتے ہیں۔' },
      { title: 'مسلسل ترقی', desc: 'سیکھنے کا بجٹ، رہنمائی، اور ایک ٹیم جو آپ کو آگے بڑھاتی ہے۔' },
      { title: 'مسابقتی معاوضہ', desc: 'مارکیٹ کے مطابق معاوضہ، کارکردگی بونس، اور ایکویٹی آپشنز۔' },
    ],
    valuesTitle: 'ہماری اقدار',
    values: ['تیزی سے بھیجیں، بار بار اصلاح کریں', 'نتیجے کی ذمہ داری اٹھائیں', 'بنیادی شفافیت', 'گاہک کی محبت', 'جلد بازی کی بجائے معیار'],
    ctaTitle: 'ابھی کوئی اوپن پوزیشن نہیں؟',
    ctaDesc: 'ہم ہمیشہ غیر معمولی صلاحیتوں کے لیے کھلے ہیں۔ اپنا CV اور PakSoft میں آپ کیا بنائیں گے اس بارے میں ایک مختصر نوٹ بھیجیں۔',
    ctaBtn: 'اپنا CV بھیجیں',
    noOpenings: 'ہم بڑھ رہے ہیں — جلد دوبارہ چیک کریں۔',
    noOpeningsDesc: 'ابھی کوئی شائع شدہ اوپننگ نہیں ہے، لیکن ہم فعال طور پر بھرتی کر رہے ہیں۔ براہ راست ہم سے رابطہ کریں۔',
  },
  ar: {
    title: 'الوظائف في PakSoft | انضم إلى فريقنا',
    metaDesc: 'استكشف فرص العمل في PakSoft. نحن نبحث دائمًا عن مهندسين ومصممين ومسوقين موهوبين للانضمام إلى فريقنا المتنامي.',
    eyebrow: 'الوظائف',
    heading: 'ابنِ المستقبل معنا',
    sub: 'نحن فريق من المبدعين الشغوفين. إذا كنت تحب حل المشكلات الصعبة وبناء منتجات رائعة، نودّ سماع ما لديك.',
    whyTitle: 'لماذا PakSoft؟',
    reasons: [
      { title: 'ثقافة العمل عن بُعد', desc: 'اعمل من أي مكان. نوظّف على مستوى عالمي وندعم ساعات العمل المرنة.' },
      { title: 'تأثير حقيقي', desc: 'كل مهندس يُشحن كودًا يستخدمه آلاف العملاء كل يوم.' },
      { title: 'نمو مستمر', desc: 'ميزانية تعلم، وإرشاد، وفريق يدفعك للمستوى التالي.' },
      { title: 'راتب تنافسي', desc: 'تعويض بمستوى السوق، ومكافآت أداء، وخيارات أسهم.' },
    ],
    valuesTitle: 'قيمنا',
    values: ['أطلق بسرعة وكرّر باستمرار', 'تحمّل مسؤولية النتائج', 'شفافية جذرية', 'هوس بالعميل', 'الجودة على حساب السرعة'],
    ctaTitle: 'لا توجد وظائف شاغرة الآن؟',
    ctaDesc: 'نحن دائمًا منفتحون على المواهب الاستثنائية. أرسل لنا سيرتك الذاتية وملاحظة قصيرة عما ستبنيه في PakSoft.',
    ctaBtn: 'أرسل سيرتك الذاتية',
    noOpenings: 'نحن نتوسع — تحقق مرة أخرى قريبًا.',
    noOpeningsDesc: 'لا توجد وظائف منشورة حاليًا، لكننا نوظّف بنشاط. تواصل معنا مباشرة.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const c = content[validLocale];
  const localizedPath = localizeFullPath('/careers', validLocale);

  return {
    title: c.title,
    description: c.metaDesc,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks('/careers'),
    },
    openGraph: {
      title: c.title,
      description: c.metaDesc,
      url: `${baseUrl}/${validLocale}${localizedPath}`,
      siteName: 'PakSoft',
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function CareersPage({ params }: PageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const c = content[validLocale];
  const isRTL = validLocale === 'ar' || validLocale === 'ur';

  return (
    <main className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="section bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent pointer-events-none" />
        <div className="container mx-auto text-center relative">
          <span className="text-overline text-emerald-400 mb-4 block">{c.eyebrow}</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 max-w-3xl mx-auto">
            {c.heading}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            {c.sub}
          </p>
          <Button href="/contact" variant="primary" size="lg">
            {c.ctaBtn}
          </Button>
        </div>
      </section>

      {/* No openings notice */}
      <section className="section bg-amber-50 border-y border-amber-100">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold text-amber-800 mb-2">{c.noOpenings}</h2>
          <p className="text-amber-700 max-w-xl mx-auto">{c.noOpeningsDesc}</p>
        </div>
      </section>

      {/* Why PakSoft */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">{c.whyTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {c.reasons.map((r, i) => (
              <div key={i} className="p-6 border border-gray-100 rounded-xl hover:border-emerald-200 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">{r.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-10">{c.valuesTitle}</h2>
          <ul className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {c.values.map((v, i) => (
              <li key={i} className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-light text-white mb-4">{c.ctaTitle}</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">{c.ctaDesc}</p>
          <Button href="/contact" variant="primary" size="lg">
            {c.ctaBtn}
          </Button>
        </div>
      </section>
    </main>
  );
}
