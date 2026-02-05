/**
 * Comprehensive script to translate all service content
 * Translates features, benefits, process steps, and FAQs
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
const LOCALES: Locale[] = ['tr', 'de', 'ur', 'ar'];

// ============================================
// COMMON TRANSLATIONS
// ============================================

// Common feature/benefit terms
const commonTerms: Record<string, Record<Locale, string>> = {
  // General terms
  'Custom': { tr: 'Özel', de: 'Individuell', ur: 'کسٹم', ar: 'مخصص' },
  'Advanced': { tr: 'Gelişmiş', de: 'Fortgeschritten', ur: 'ایڈوانسڈ', ar: 'متقدم' },
  'Professional': { tr: 'Profesyonel', de: 'Professionell', ur: 'پروفیشنل', ar: 'احترافي' },
  'Enterprise': { tr: 'Kurumsal', de: 'Enterprise', ur: 'انٹرپرائز', ar: 'مؤسسي' },
  'Scalable': { tr: 'Ölçeklenebilir', de: 'Skalierbar', ur: 'اسکیل ایبل', ar: 'قابل للتوسع' },
  'Secure': { tr: 'Güvenli', de: 'Sicher', ur: 'محفوظ', ar: 'آمن' },
  'Fast': { tr: 'Hızlı', de: 'Schnell', ur: 'تیز', ar: 'سريع' },
  'Reliable': { tr: 'Güvenilir', de: 'Zuverlässig', ur: 'قابل اعتماد', ar: 'موثوق' },
  'Efficient': { tr: 'Verimli', de: 'Effizient', ur: 'موثر', ar: 'فعال' },
  'Automated': { tr: 'Otomatik', de: 'Automatisiert', ur: 'خودکار', ar: 'آلي' },
  'Real-time': { tr: 'Gerçek Zamanlı', de: 'Echtzeit', ur: 'ریئل ٹائم', ar: 'الوقت الفعلي' },
  'Analytics': { tr: 'Analitik', de: 'Analytik', ur: 'اینالیٹکس', ar: 'التحليلات' },
  'Dashboard': { tr: 'Kontrol Paneli', de: 'Dashboard', ur: 'ڈیش بورڈ', ar: 'لوحة التحكم' },
  'Integration': { tr: 'Entegrasyon', de: 'Integration', ur: 'انٹیگریشن', ar: 'التكامل' },
  'Optimization': { tr: 'Optimizasyon', de: 'Optimierung', ur: 'آپٹیمائزیشن', ar: 'التحسين' },
  'Performance': { tr: 'Performans', de: 'Leistung', ur: 'پرفارمنس', ar: 'الأداء' },
  'Monitoring': { tr: 'İzleme', de: 'Überwachung', ur: 'مانیٹرنگ', ar: 'المراقبة' },
  'Reporting': { tr: 'Raporlama', de: 'Berichterstattung', ur: 'رپورٹنگ', ar: 'إعداد التقارير' },
  'Support': { tr: 'Destek', de: 'Support', ur: 'سپورٹ', ar: 'الدعم' },
  'Training': { tr: 'Eğitim', de: 'Schulung', ur: 'ٹریننگ', ar: 'التدريب' },
  'Consultation': { tr: 'Danışmanlık', de: 'Beratung', ur: 'مشاورت', ar: 'الاستشارة' },
  'Strategy': { tr: 'Strateji', de: 'Strategie', ur: 'حکمت عملی', ar: 'الاستراتيجية' },
  'Development': { tr: 'Geliştirme', de: 'Entwicklung', ur: 'ڈویلپمنٹ', ar: 'التطوير' },
  'Design': { tr: 'Tasarım', de: 'Design', ur: 'ڈیزائن', ar: 'التصميم' },
  'Testing': { tr: 'Test', de: 'Testen', ur: 'ٹیسٹنگ', ar: 'الاختبار' },
  'Deployment': { tr: 'Dağıtım', de: 'Bereitstellung', ur: 'ڈیپلائمنٹ', ar: 'النشر' },
  'Maintenance': { tr: 'Bakım', de: 'Wartung', ur: 'دیکھ بھال', ar: 'الصيانة' },
  'Launch': { tr: 'Lansman', de: 'Launch', ur: 'لانچ', ar: 'الإطلاق' },
  'Analysis': { tr: 'Analiz', de: 'Analyse', ur: 'تجزیہ', ar: 'التحليل' },
  'Research': { tr: 'Araştırma', de: 'Forschung', ur: 'ریسرچ', ar: 'البحث' },
  'Planning': { tr: 'Planlama', de: 'Planung', ur: 'منصوبہ بندی', ar: 'التخطيط' },
  'Implementation': { tr: 'Uygulama', de: 'Implementierung', ur: 'نفاذ', ar: 'التنفيذ' },
  'Execution': { tr: 'Yürütme', de: 'Ausführung', ur: 'عملدرآمد', ar: 'التنفيذ' },
  'Review': { tr: 'İnceleme', de: 'Überprüfung', ur: 'جائزہ', ar: 'المراجعة' },
  'Audit': { tr: 'Denetim', de: 'Audit', ur: 'آڈٹ', ar: 'التدقيق' },
};

// Common process step translations
const processSteps: Record<string, Record<Locale, { title: string; description: string }>> = {
  'Discovery': {
    tr: { title: 'Keşif', description: 'İhtiyaçlarınızı ve hedeflerinizi anlıyoruz.' },
    de: { title: 'Entdeckung', description: 'Wir verstehen Ihre Bedürfnisse und Ziele.' },
    ur: { title: 'دریافت', description: 'ہم آپ کی ضروریات اور اہداف کو سمجھتے ہیں۔' },
    ar: { title: 'الاكتشاف', description: 'نفهم احتياجاتك وأهدافك.' }
  },
  'Strategy': {
    tr: { title: 'Strateji', description: 'Özelleştirilmiş bir strateji ve yol haritası oluşturuyoruz.' },
    de: { title: 'Strategie', description: 'Wir erstellen eine maßgeschneiderte Strategie und Roadmap.' },
    ur: { title: 'حکمت عملی', description: 'ہم ایک حسب ضرورت حکمت عملی اور روڈ میپ بناتے ہیں۔' },
    ar: { title: 'الاستراتيجية', description: 'نضع استراتيجية وخارطة طريق مخصصة.' }
  },
  'Design': {
    tr: { title: 'Tasarım', description: 'Kullanıcı merkezli tasarımlar oluşturuyoruz.' },
    de: { title: 'Design', description: 'Wir erstellen benutzerorientierte Designs.' },
    ur: { title: 'ڈیزائن', description: 'ہم صارف پر مرکوز ڈیزائن بناتے ہیں۔' },
    ar: { title: 'التصميم', description: 'نصمم تصاميم تركز على المستخدم.' }
  },
  'Development': {
    tr: { title: 'Geliştirme', description: 'En iyi uygulamalarla çözümü geliştiriyoruz.' },
    de: { title: 'Entwicklung', description: 'Wir entwickeln die Lösung mit Best Practices.' },
    ur: { title: 'ڈویلپمنٹ', description: 'ہم بہترین طریقوں کے ساتھ حل تیار کرتے ہیں۔' },
    ar: { title: 'التطوير', description: 'نطور الحل وفقًا لأفضل الممارسات.' }
  },
  'Testing': {
    tr: { title: 'Test', description: 'Kapsamlı testler yapıyoruz.' },
    de: { title: 'Testen', description: 'Wir führen umfassende Tests durch.' },
    ur: { title: 'ٹیسٹنگ', description: 'ہم جامع ٹیسٹنگ کرتے ہیں۔' },
    ar: { title: 'الاختبار', description: 'نجري اختبارات شاملة.' }
  },
  'Launch': {
    tr: { title: 'Lansman', description: 'Çözümü başarıyla yayınlıyoruz.' },
    de: { title: 'Launch', description: 'Wir starten die Lösung erfolgreich.' },
    ur: { title: 'لانچ', description: 'ہم حل کو کامیابی سے لانچ کرتے ہیں۔' },
    ar: { title: 'الإطلاق', description: 'نطلق الحل بنجاح.' }
  },
  'Optimize': {
    tr: { title: 'Optimizasyon', description: 'Performansı sürekli optimize ediyoruz.' },
    de: { title: 'Optimierung', description: 'Wir optimieren kontinuierlich die Leistung.' },
    ur: { title: 'آپٹیمائزیشن', description: 'ہم مسلسل کارکردگی کو بہتر بناتے ہیں۔' },
    ar: { title: 'التحسين', description: 'نحسن الأداء باستمرار.' }
  },
  'Analysis': {
    tr: { title: 'Analiz', description: 'Mevcut durumu detaylı analiz ediyoruz.' },
    de: { title: 'Analyse', description: 'Wir analysieren den aktuellen Stand im Detail.' },
    ur: { title: 'تجزیہ', description: 'ہم موجودہ صورتحال کا تفصیلی تجزیہ کرتے ہیں۔' },
    ar: { title: 'التحليل', description: 'نحلل الوضع الحالي بالتفصيل.' }
  },
  'Planning': {
    tr: { title: 'Planlama', description: 'Detaylı bir uygulama planı hazırlıyoruz.' },
    de: { title: 'Planung', description: 'Wir erstellen einen detaillierten Umsetzungsplan.' },
    ur: { title: 'منصوبہ بندی', description: 'ہم ایک تفصیلی عمل درآمد کا منصوبہ تیار کرتے ہیں۔' },
    ar: { title: 'التخطيط', description: 'نعد خطة تنفيذ مفصلة.' }
  },
  'Implementation': {
    tr: { title: 'Uygulama', description: 'Çözümü sistematik olarak uyguluyoruz.' },
    de: { title: 'Implementierung', description: 'Wir implementieren die Lösung systematisch.' },
    ur: { title: 'نفاذ', description: 'ہم منظم طریقے سے حل کو نافذ کرتے ہیں۔' },
    ar: { title: 'التنفيذ', description: 'ننفذ الحل بشكل منهجي.' }
  },
  'Setup': {
    tr: { title: 'Kurulum', description: 'Sistemi ve araçları kuruyoruz.' },
    de: { title: 'Einrichtung', description: 'Wir richten das System und die Tools ein.' },
    ur: { title: 'سیٹ اپ', description: 'ہم سسٹم اور ٹولز سیٹ اپ کرتے ہیں۔' },
    ar: { title: 'الإعداد', description: 'نقوم بإعداد النظام والأدوات.' }
  },
  'Production': {
    tr: { title: 'Üretim', description: 'Yüksek kaliteli içerik üretiyoruz.' },
    de: { title: 'Produktion', description: 'Wir produzieren hochwertige Inhalte.' },
    ur: { title: 'پروڈکشن', description: 'ہم اعلیٰ معیار کا مواد تیار کرتے ہیں۔' },
    ar: { title: 'الإنتاج', description: 'ننتج محتوى عالي الجودة.' }
  },
  'Review': {
    tr: { title: 'İnceleme', description: 'Sonuçları inceliyor ve değerlendiriyoruz.' },
    de: { title: 'Überprüfung', description: 'Wir überprüfen und bewerten die Ergebnisse.' },
    ur: { title: 'جائزہ', description: 'ہم نتائج کا جائزہ لیتے اور اندازہ لگاتے ہیں۔' },
    ar: { title: 'المراجعة', description: 'نراجع ونقيم النتائج.' }
  },
  'Monitoring': {
    tr: { title: 'İzleme', description: 'Performansı sürekli izliyoruz.' },
    de: { title: 'Überwachung', description: 'Wir überwachen kontinuierlich die Leistung.' },
    ur: { title: 'مانیٹرنگ', description: 'ہم مسلسل کارکردگی کی نگرانی کرتے ہیں۔' },
    ar: { title: 'المراقبة', description: 'نراقب الأداء باستمرار.' }
  },
  'Delivery': {
    tr: { title: 'Teslim', description: 'Son ürünü teslim ediyoruz.' },
    de: { title: 'Lieferung', description: 'Wir liefern das Endprodukt.' },
    ur: { title: 'ڈیلیوری', description: 'ہم حتمی مصنوعات کی ترسیل کرتے ہیں۔' },
    ar: { title: 'التسليم', description: 'نسلم المنتج النهائي.' }
  },
};

// Common benefit translations
const commonBenefits: Record<string, Record<Locale, string>> = {
  // Cost benefits
  'Cost-effective': { tr: 'Uygun Maliyetli', de: 'Kostengünstig', ur: 'لاگت مؤثر', ar: 'فعال من حيث التكلفة' },
  'Cost savings': { tr: 'Maliyet Tasarrufu', de: 'Kosteneinsparungen', ur: 'لاگت کی بچت', ar: 'توفير التكاليف' },
  'ROI focused': { tr: 'ROI Odaklı', de: 'ROI-fokussiert', ur: 'ROI پر مرکوز', ar: 'التركيز على العائد على الاستثمار' },
  'Increased ROI': { tr: 'Artan ROI', de: 'Erhöhter ROI', ur: 'بڑھتا ہوا ROI', ar: 'زيادة العائد على الاستثمار' },
  'Higher conversions': { tr: 'Daha Yüksek Dönüşümler', de: 'Höhere Konversionen', ur: 'زیادہ کنورژنز', ar: 'تحويلات أعلى' },
  'Better results': { tr: 'Daha İyi Sonuçlar', de: 'Bessere Ergebnisse', ur: 'بہتر نتائج', ar: 'نتائج أفضل' },

  // Time benefits
  'Fast delivery': { tr: 'Hızlı Teslimat', de: 'Schnelle Lieferung', ur: 'تیز ترسیل', ar: 'توصيل سريع' },
  'Quick turnaround': { tr: 'Hızlı Tamamlama', de: 'Schnelle Bearbeitung', ur: 'فوری ٹرن اراؤنڈ', ar: 'تنفيذ سريع' },
  'Time savings': { tr: 'Zaman Tasarrufu', de: 'Zeitersparnis', ur: 'وقت کی بچت', ar: 'توفير الوقت' },
  '24/7 support': { tr: '7/24 Destek', de: '24/7 Support', ur: '24/7 سپورٹ', ar: 'دعم على مدار الساعة' },

  // Quality benefits
  'High quality': { tr: 'Yüksek Kalite', de: 'Hohe Qualität', ur: 'اعلیٰ معیار', ar: 'جودة عالية' },
  'Expert team': { tr: 'Uzman Ekip', de: 'Expertenteam', ur: 'ماہر ٹیم', ar: 'فريق خبراء' },
  'Best practices': { tr: 'En İyi Uygulamalar', de: 'Best Practices', ur: 'بہترین طریقے', ar: 'أفضل الممارسات' },
  'Industry standards': { tr: 'Endüstri Standartları', de: 'Industriestandards', ur: 'صنعتی معیار', ar: 'معايير الصناعة' },
  'Proven methodology': { tr: 'Kanıtlanmış Metodoloji', de: 'Bewährte Methodik', ur: 'ثابت شدہ طریقہ کار', ar: 'منهجية مثبتة' },

  // Reach benefits
  'Global reach': { tr: 'Küresel Erişim', de: 'Globale Reichweite', ur: 'عالمی رسائی', ar: 'انتشار عالمي' },
  'Massive reach': { tr: 'Geniş Erişim', de: 'Massive Reichweite', ur: 'وسیع رسائی', ar: 'وصول واسع' },
  'Targeted audience': { tr: 'Hedef Kitle', de: 'Zielgruppe', ur: 'ہدف سامعین', ar: 'جمهور مستهدف' },
  'Wide audience': { tr: 'Geniş Kitle', de: 'Breites Publikum', ur: 'وسیع سامعین', ar: 'جمهور واسع' },

  // Technical benefits
  'Scalable solution': { tr: 'Ölçeklenebilir Çözüm', de: 'Skalierbare Lösung', ur: 'اسکیل ایبل حل', ar: 'حل قابل للتوسع' },
  'Secure platform': { tr: 'Güvenli Platform', de: 'Sichere Plattform', ur: 'محفوظ پلیٹ فارم', ar: 'منصة آمنة' },
  'Modern technology': { tr: 'Modern Teknoloji', de: 'Moderne Technologie', ur: 'جدید ٹیکنالوجی', ar: 'تقنية حديثة' },
  'Future-proof': { tr: 'Geleceğe Hazır', de: 'Zukunftssicher', ur: 'مستقبل کے لیے تیار', ar: 'جاهز للمستقبل' },
  'Easy integration': { tr: 'Kolay Entegrasyon', de: 'Einfache Integration', ur: 'آسان انٹیگریشن', ar: 'تكامل سهل' },
  'Flexible': { tr: 'Esnek', de: 'Flexibel', ur: 'لچکدار', ar: 'مرن' },
  'Customizable': { tr: 'Özelleştirilebilir', de: 'Anpassbar', ur: 'حسب ضرورت', ar: 'قابل للتخصيص' },

  // YouTube/Video specific
  'Massive YouTube reach': { tr: 'Geniş YouTube Erişimi', de: 'Massive YouTube-Reichweite', ur: 'وسیع یوٹیوب رسائی', ar: 'وصول واسع على يوتيوب' },
  'Engaging video format': { tr: 'Etkileyici Video Formatı', de: 'Ansprechendes Videoformat', ur: 'دلچسپ ویڈیو فارمیٹ', ar: 'تنسيق فيديو جذاب' },
  'Pay only for views': { tr: 'Sadece Görüntüleme İçin Öde', de: 'Nur für Aufrufe zahlen', ur: 'صرف ویوز کے لیے ادائیگی', ar: 'ادفع فقط مقابل المشاهدات' },
  'Detailed targeting': { tr: 'Detaylı Hedefleme', de: 'Detailliertes Targeting', ur: 'تفصیلی ہدف بندی', ar: 'استهداف تفصيلي' },
};

// Common FAQ translations
const commonFAQs: Record<string, Record<Locale, { question: string; answer: string }>> = {
  // Pricing FAQs
  'How much does it cost?': {
    tr: { question: 'Maliyeti ne kadar?', answer: 'Fiyatlandırma proje kapsamına göre değişir. Size özel fiyat teklifi için iletişime geçin.' },
    de: { question: 'Wie viel kostet es?', answer: 'Die Preise variieren je nach Projektumfang. Kontaktieren Sie uns für ein individuelles Angebot.' },
    ur: { question: 'اس کی قیمت کتنی ہے؟', answer: 'قیمتیں پروجیکٹ کے دائرہ کار کے مطابق مختلف ہوتی ہیں۔ مخصوص قیمت کے لیے رابطہ کریں۔' },
    ar: { question: 'كم تكلفة ذلك؟', answer: 'تختلف الأسعار حسب نطاق المشروع. اتصل بنا للحصول على عرض سعر مخصص.' }
  },
  'How long does it take?': {
    tr: { question: 'Ne kadar sürer?', answer: 'Süre proje karmaşıklığına göre değişir. Genellikle 2-8 hafta arasındadır.' },
    de: { question: 'Wie lange dauert es?', answer: 'Die Dauer variiert je nach Projektkomplexität. Typischerweise 2-8 Wochen.' },
    ur: { question: 'اس میں کتنا وقت لگتا ہے؟', answer: 'مدت پروجیکٹ کی پیچیدگی کے مطابق مختلف ہوتی ہے۔ عام طور پر 2-8 ہفتے۔' },
    ar: { question: 'كم من الوقت يستغرق؟', answer: 'تختلف المدة حسب تعقيد المشروع. عادةً من 2-8 أسابيع.' }
  },
  'Do you provide support?': {
    tr: { question: 'Destek sağlıyor musunuz?', answer: 'Evet, tüm projeler için kapsamlı destek ve bakım hizmetleri sunuyoruz.' },
    de: { question: 'Bieten Sie Support?', answer: 'Ja, wir bieten umfassende Support- und Wartungsdienste für alle Projekte.' },
    ur: { question: 'کیا آپ سپورٹ فراہم کرتے ہیں؟', answer: 'ہاں، ہم تمام پروجیکٹس کے لیے جامع سپورٹ اور دیکھ بھال کی خدمات فراہم کرتے ہیں۔' },
    ar: { question: 'هل تقدمون الدعم؟', answer: 'نعم، نقدم خدمات دعم وصيانة شاملة لجميع المشاريع.' }
  },
  'What is your process?': {
    tr: { question: 'Süreciniz nedir?', answer: 'Keşif, planlama, geliştirme, test ve lansman aşamalarını içeren yapılandırılmış bir süreç izliyoruz.' },
    de: { question: 'Was ist Ihr Prozess?', answer: 'Wir folgen einem strukturierten Prozess mit Entdeckung, Planung, Entwicklung, Tests und Launch.' },
    ur: { question: 'آپ کا عمل کیا ہے؟', answer: 'ہم ایک منظم عمل کی پیروی کرتے ہیں جس میں دریافت، منصوبہ بندی، ترقی، ٹیسٹنگ اور لانچ شامل ہے۔' },
    ar: { question: 'ما هي عمليتكم؟', answer: 'نتبع عملية منظمة تشمل الاكتشاف والتخطيط والتطوير والاختبار والإطلاق.' }
  },
  // YouTube specific FAQs
  'What YouTube ad types?': {
    tr: { question: 'Hangi YouTube reklam türleri?', answer: 'Atlanabilir, atlanamaz, bumper, keşif ve shorts reklamları.' },
    de: { question: 'Welche YouTube-Anzeigentypen?', answer: 'Überspringbare, nicht überspringbare, Bumper-, Discovery- und Shorts-Anzeigen.' },
    ur: { question: 'یوٹیوب ایڈ کی کون سی اقسام؟', answer: 'سکپ ایبل، نان سکپ ایبل، بمپر، ڈسکوری اور شارٹس ایڈز۔' },
    ar: { question: 'ما هي أنواع إعلانات يوتيوب؟', answer: 'إعلانات قابلة للتخطي وغير قابلة للتخطي وإعلانات البامبر والاكتشاف والشورتس.' }
  },
  'Do you create videos?': {
    tr: { question: 'Video üretiyor musunuz?', answer: 'Evet, senaryo yazımından düzenleme ve optimizasyona kadar.' },
    de: { question: 'Erstellen Sie Videos?', answer: 'Ja, vom Scripting bis zur Bearbeitung und Optimierung.' },
    ur: { question: 'کیا آپ ویڈیوز بناتے ہیں؟', answer: 'ہاں، اسکرپٹ رائٹنگ سے ایڈیٹنگ اور آپٹیمائزیشن تک۔' },
    ar: { question: 'هل تنشئون مقاطع فيديو؟', answer: 'نعم، من كتابة السيناريو إلى التحرير والتحسين.' }
  },
  'How much do YouTube ads cost?': {
    tr: { question: 'YouTube reklamları ne kadar?', answer: 'Bütçe esnektir. Genellikle 0,10-0,30$ CPV ve günlük 10$\'dan başlar.' },
    de: { question: 'Was kosten YouTube-Anzeigen?', answer: 'Das Budget ist flexibel. Typischerweise 0,10-0,30$ CPV und ab 10$/Tag.' },
    ur: { question: 'یوٹیوب ایڈز کی قیمت کتنی ہے؟', answer: 'بجٹ لچکدار ہے۔ عام طور پر 0.10-0.30$ CPV اور روزانہ 10$ سے شروع۔' },
    ar: { question: 'كم تكلفة إعلانات يوتيوب؟', answer: 'الميزانية مرنة. عادةً 0.10-0.30$ للمشاهدة وتبدأ من 10$/يومياً.' }
  },
  'Can YouTube drive conversions?': {
    tr: { question: 'YouTube dönüşüm sağlar mı?', answer: 'Evet! TrueView for Action ve doğrudan bağlantılarla güçlü dönüşümler elde edilir.' },
    de: { question: 'Kann YouTube Conversions erzielen?', answer: 'Ja! Mit TrueView for Action und direkten Links werden starke Conversions erzielt.' },
    ur: { question: 'کیا یوٹیوب کنورژنز حاصل کر سکتا ہے؟', answer: 'ہاں! TrueView for Action اور براہ راست لنکس کے ذریعے مضبوط کنورژنز حاصل ہوتے ہیں۔' },
    ar: { question: 'هل يمكن ليوتيوب تحقيق تحويلات؟', answer: 'نعم! مع TrueView for Action والروابط المباشرة تتحقق تحويلات قوية.' }
  },
};

// Generic feature description translations
const genericFeatureDescriptions: Record<Locale, string> = {
  tr: 'Hassasiyet ve ölçeklenebilirlik ile tasarlandı.',
  de: 'Mit Präzision und Skalierbarkeit entwickelt.',
  ur: 'درستگی اور اسکیل ایبلٹی کے ساتھ ڈیزائن کیا گیا۔',
  ar: 'مصمم بدقة وقابلية للتوسع.'
};

// ============================================
// TRANSLATION FUNCTIONS
// ============================================

function translateText(text: string, locale: Locale): string {
  // Check exact match first
  if (commonBenefits[text]?.[locale]) {
    return commonBenefits[text][locale];
  }
  if (commonTerms[text]?.[locale]) {
    return commonTerms[text][locale];
  }

  // For technical terms that stay the same
  const technicalTerms = [
    'API', 'SDK', 'REST', 'GraphQL', 'SQL', 'NoSQL', 'AWS', 'Azure', 'GCP',
    'Docker', 'Kubernetes', 'CI/CD', 'DevOps', 'SEO', 'PPC', 'CRM', 'ERP',
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'React', 'Vue', 'Angular',
    'Node.js', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch',
    'TrueView', 'Google Ads', 'YouTube', 'Facebook', 'Instagram', 'LinkedIn',
    'WhatsApp', 'TikTok', 'Shopify', 'WooCommerce', 'Magento',
    'In-Stream', 'Bumper', 'Discovery', 'CPV', 'CPC', 'CPM', 'CTR', 'ROI'
  ];

  for (const term of technicalTerms) {
    if (text.includes(term)) {
      // Keep technical term but translate surrounding words
      return text;
    }
  }

  return text;
}

function translateFeature(feature: string, locale: Locale): string {
  // Check for exact matches in common terms
  const translated = translateText(feature, locale);
  if (translated !== feature) return translated;

  // Service-specific feature translations
  const featureTranslations: Record<string, Record<Locale, string>> = {
    'TrueView In-Stream Ads': {
      tr: 'TrueView Yayın İçi Reklamlar',
      de: 'TrueView In-Stream-Anzeigen',
      ur: 'TrueView اِن اسٹریم ایڈز',
      ar: 'إعلانات TrueView أثناء البث'
    },
    'Bumper Ads': {
      tr: 'Bumper Reklamlar',
      de: 'Bumper-Anzeigen',
      ur: 'بمپر ایڈز',
      ar: 'إعلانات البامبر'
    },
    'Discovery Ads': {
      tr: 'Keşif Reklamları',
      de: 'Discovery-Anzeigen',
      ur: 'ڈسکوری ایڈز',
      ar: 'إعلانات الاكتشاف'
    },
    'Video Creative Production': {
      tr: 'Video Kreatif Üretimi',
      de: 'Video-Kreativproduktion',
      ur: 'ویڈیو کریئیٹو پروڈکشن',
      ar: 'إنتاج فيديو إبداعي'
    },
    'Audience Targeting': {
      tr: 'Hedef Kitle Belirleme',
      de: 'Zielgruppen-Targeting',
      ur: 'سامعین کی ہدف بندی',
      ar: 'استهداف الجمهور'
    },
    'Conversion Tracking': {
      tr: 'Dönüşüm İzleme',
      de: 'Conversion-Tracking',
      ur: 'کنورژن ٹریکنگ',
      ar: 'تتبع التحويلات'
    },
    'Campaign Setup': {
      tr: 'Kampanya Kurulumu',
      de: 'Kampagnen-Setup',
      ur: 'کیمپین سیٹ اپ',
      ar: 'إعداد الحملة'
    },
    'Keyword Research': {
      tr: 'Anahtar Kelime Araştırması',
      de: 'Keyword-Recherche',
      ur: 'کی ورڈ ریسرچ',
      ar: 'بحث الكلمات المفتاحية'
    },
    'Ad Copywriting': {
      tr: 'Reklam Metin Yazarlığı',
      de: 'Anzeigentexte',
      ur: 'ایڈ کاپی رائٹنگ',
      ar: 'كتابة نصوص الإعلانات'
    },
    'A/B Testing': {
      tr: 'A/B Testi',
      de: 'A/B-Tests',
      ur: 'A/B ٹیسٹنگ',
      ar: 'اختبار A/B'
    },
    'Landing Page Optimization': {
      tr: 'Açılış Sayfası Optimizasyonu',
      de: 'Landing-Page-Optimierung',
      ur: 'لینڈنگ پیج آپٹیمائزیشن',
      ar: 'تحسين صفحة الهبوط'
    },
    'Bid Management': {
      tr: 'Teklif Yönetimi',
      de: 'Gebotsmanagement',
      ur: 'بڈ مینجمنٹ',
      ar: 'إدارة العطاءات'
    },
    'Performance Reports': {
      tr: 'Performans Raporları',
      de: 'Leistungsberichte',
      ur: 'پرفارمنس رپورٹس',
      ar: 'تقارير الأداء'
    },
    'Quality Score Optimization': {
      tr: 'Kalite Puanı Optimizasyonu',
      de: 'Qualitätsfaktor-Optimierung',
      ur: 'کوالٹی سکور آپٹیمائزیشن',
      ar: 'تحسين نقاط الجودة'
    },
    'Display Network Ads': {
      tr: 'Görüntülü Reklam Ağı',
      de: 'Display-Netzwerk-Anzeigen',
      ur: 'ڈسپلے نیٹ ورک ایڈز',
      ar: 'إعلانات شبكة العرض'
    },
    'Remarketing Campaigns': {
      tr: 'Yeniden Pazarlama Kampanyaları',
      de: 'Remarketing-Kampagnen',
      ur: 'ری مارکیٹنگ کیمپینز',
      ar: 'حملات إعادة التسويق'
    },
    'Competitor Analysis': {
      tr: 'Rakip Analizi',
      de: 'Wettbewerbsanalyse',
      ur: 'مسابقتی تجزیہ',
      ar: 'تحليل المنافسين'
    },
    'ROI Tracking': {
      tr: 'ROI İzleme',
      de: 'ROI-Tracking',
      ur: 'ROI ٹریکنگ',
      ar: 'تتبع العائد على الاستثمار'
    },
    'Custom Audiences': {
      tr: 'Özel Hedef Kitleler',
      de: 'Benutzerdefinierte Zielgruppen',
      ur: 'کسٹم آڈینسز',
      ar: 'جماهير مخصصة'
    },
    'Lookalike Audiences': {
      tr: 'Benzer Hedef Kitleler',
      de: 'Lookalike-Zielgruppen',
      ur: 'لُک الائک آڈینسز',
      ar: 'جماهير مشابهة'
    },
    'Video Ads': {
      tr: 'Video Reklamlar',
      de: 'Video-Anzeigen',
      ur: 'ویڈیو ایڈز',
      ar: 'إعلانات الفيديو'
    },
    'Carousel Ads': {
      tr: 'Dönen Reklamlar',
      de: 'Karussell-Anzeigen',
      ur: 'کیروسل ایڈز',
      ar: 'إعلانات دائرية'
    },
    'Story Ads': {
      tr: 'Hikaye Reklamları',
      de: 'Story-Anzeigen',
      ur: 'سٹوری ایڈز',
      ar: 'إعلانات القصص'
    },
    'Lead Generation': {
      tr: 'Potansiyel Müşteri Oluşturma',
      de: 'Lead-Generierung',
      ur: 'لیڈ جنریشن',
      ar: 'توليد العملاء المحتملين'
    },
    'Brand Awareness': {
      tr: 'Marka Bilinirliği',
      de: 'Markenbekanntheit',
      ur: 'برانڈ آگاہی',
      ar: 'الوعي بالعلامة التجارية'
    },
    'Traffic Campaigns': {
      tr: 'Trafik Kampanyaları',
      de: 'Traffic-Kampagnen',
      ur: 'ٹریفک کیمپینز',
      ar: 'حملات الزيارات'
    },
    'App Install Campaigns': {
      tr: 'Uygulama Yükleme Kampanyaları',
      de: 'App-Installations-Kampagnen',
      ur: 'ایپ انسٹال کیمپینز',
      ar: 'حملات تثبيت التطبيقات'
    },
    'Engagement Campaigns': {
      tr: 'Etkileşim Kampanyaları',
      de: 'Engagement-Kampagnen',
      ur: 'انگیجمنٹ کیمپینز',
      ar: 'حملات التفاعل'
    },
    'Catalog Sales': {
      tr: 'Katalog Satışları',
      de: 'Katalogverkäufe',
      ur: 'کیٹلاگ سیلز',
      ar: 'مبيعات الكتالوج'
    },
    'Dynamic Ads': {
      tr: 'Dinamik Reklamlar',
      de: 'Dynamische Anzeigen',
      ur: 'ڈائنامک ایڈز',
      ar: 'إعلانات ديناميكية'
    },
    'Messenger Ads': {
      tr: 'Messenger Reklamları',
      de: 'Messenger-Anzeigen',
      ur: 'میسنجر ایڈز',
      ar: 'إعلانات المراسلة'
    },
  };

  if (featureTranslations[feature]?.[locale]) {
    return featureTranslations[feature][locale];
  }

  return feature;
}

function translateBenefit(benefit: string, locale: Locale): string {
  if (commonBenefits[benefit]?.[locale]) {
    return commonBenefits[benefit][locale];
  }
  return translateText(benefit, locale);
}

function translateProcess(process: any[], locale: Locale): any[] {
  return process.map(step => {
    const stepTitle = step.title || '';
    const translatedStep = processSteps[stepTitle];

    if (translatedStep?.[locale]) {
      return {
        ...step,
        title: translatedStep[locale].title,
        description: translatedStep[locale].description
      };
    }

    // Generic translation
    return {
      ...step,
      title: translateText(stepTitle, locale),
      description: step.description
    };
  });
}

function translateFAQ(faq: any[], locale: Locale): any[] {
  return faq.map(item => {
    const question = item.question || '';

    // Check for common FAQ translations
    if (commonFAQs[question]?.[locale]) {
      return {
        question: commonFAQs[question][locale].question,
        answer: commonFAQs[question][locale].answer
      };
    }

    // Try partial matches
    for (const [key, translations] of Object.entries(commonFAQs)) {
      if (question.toLowerCase().includes(key.toLowerCase().substring(0, 10))) {
        if (translations[locale]) {
          return {
            question: translations[locale].question,
            answer: translations[locale].answer
          };
        }
      }
    }

    return item;
  });
}

// ============================================
// MAIN TRANSLATION SCRIPT
// ============================================

async function translateServiceContent() {
  console.log('🌍 Translating service content...\n');

  try {
    const services = await prisma.service.findMany({
      where: { status: { in: ['published', 'active'] } },
      include: { translations: true }
    });

    let updated = 0;

    for (const service of services) {
      const baseFeatures = service.features || [];
      const baseBenefits = service.benefits || [];
      const baseContent = service.content as any || {};

      // Skip if no content to translate
      if (baseFeatures.length === 0 && baseBenefits.length === 0 && !baseContent.process && !baseContent.faq) {
        continue;
      }

      for (const locale of LOCALES) {
        const existingTranslation = service.translations.find(t => t.locale === locale);

        if (!existingTranslation) continue;

        // Check if content needs translation
        const needsTranslation =
          (existingTranslation.features?.length === 0 || existingTranslation.features?.[0] === baseFeatures[0]) &&
          (existingTranslation.benefits?.length === 0 || existingTranslation.benefits?.[0] === baseBenefits[0]);

        if (!needsTranslation) continue;

        // Translate content
        const translatedFeatures = baseFeatures.map(f => translateFeature(f, locale));
        const translatedBenefits = baseBenefits.map(b => translateBenefit(b, locale));

        const translatedContent: any = { ...baseContent };
        if (baseContent.process) {
          translatedContent.process = translateProcess(baseContent.process, locale);
        }
        if (baseContent.faq) {
          translatedContent.faq = translateFAQ(baseContent.faq, locale);
        }

        // Update translation
        await prisma.serviceTranslation.update({
          where: { id: existingTranslation.id },
          data: {
            features: translatedFeatures,
            benefits: translatedBenefits,
            content: translatedContent
          }
        });

        console.log(`✅ ${service.slug} [${locale.toUpperCase()}]`);
        updated++;
      }
    }

    console.log(`\n✅ Updated ${updated} translations with content`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

translateServiceContent();
