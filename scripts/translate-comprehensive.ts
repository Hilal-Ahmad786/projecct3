/**
 * Comprehensive translation script with pattern matching
 * Handles partial matches and common term combinations
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
// COMPREHENSIVE WORD/PHRASE TRANSLATIONS
// ============================================

const translations: Record<string, Record<Locale, string>> = {
  // Common action words
  'Custom': { tr: 'Özel', de: 'Individuell', ur: 'کسٹم', ar: 'مخصص' },
  'Advanced': { tr: 'Gelişmiş', de: 'Fortgeschritten', ur: 'ایڈوانسڈ', ar: 'متقدم' },
  'Automated': { tr: 'Otomatik', de: 'Automatisiert', ur: 'خودکار', ar: 'آلي' },
  'Professional': { tr: 'Profesyonel', de: 'Professionell', ur: 'پروفیشنل', ar: 'احترافي' },
  'Enterprise': { tr: 'Kurumsal', de: 'Enterprise', ur: 'انٹرپرائز', ar: 'مؤسسي' },
  'Real-time': { tr: 'Gerçek Zamanlı', de: 'Echtzeit', ur: 'ریئل ٹائم', ar: 'الوقت الفعلي' },
  'Scalable': { tr: 'Ölçeklenebilir', de: 'Skalierbar', ur: 'اسکیل ایبل', ar: 'قابل للتوسع' },
  'Secure': { tr: 'Güvenli', de: 'Sicher', ur: 'محفوظ', ar: 'آمن' },
  'Fast': { tr: 'Hızlı', de: 'Schnell', ur: 'تیز', ar: 'سريع' },
  'Smart': { tr: 'Akıllı', de: 'Intelligent', ur: 'سمارٹ', ar: 'ذكي' },
  'Intelligent': { tr: 'Akıllı', de: 'Intelligent', ur: 'ذہین', ar: 'ذكي' },
  'Complete': { tr: 'Kapsamlı', de: 'Vollständig', ur: 'مکمل', ar: 'كامل' },
  'Full': { tr: 'Tam', de: 'Voll', ur: 'مکمل', ar: 'كامل' },
  'Comprehensive': { tr: 'Kapsamlı', de: 'Umfassend', ur: 'جامع', ar: 'شامل' },

  // Technical terms
  'Development': { tr: 'Geliştirme', de: 'Entwicklung', ur: 'ڈویلپمنٹ', ar: 'التطوير' },
  'Design': { tr: 'Tasarım', de: 'Design', ur: 'ڈیزائن', ar: 'التصميم' },
  'Integration': { tr: 'Entegrasyon', de: 'Integration', ur: 'انٹیگریشن', ar: 'التكامل' },
  'Optimization': { tr: 'Optimizasyon', de: 'Optimierung', ur: 'آپٹیمائزیشن', ar: 'التحسين' },
  'Management': { tr: 'Yönetim', de: 'Management', ur: 'مینجمنٹ', ar: 'الإدارة' },
  'Analytics': { tr: 'Analitik', de: 'Analytik', ur: 'اینالیٹکس', ar: 'التحليلات' },
  'Automation': { tr: 'Otomasyon', de: 'Automatisierung', ur: 'آٹومیشن', ar: 'الأتمتة' },
  'Monitoring': { tr: 'İzleme', de: 'Überwachung', ur: 'مانیٹرنگ', ar: 'المراقبة' },
  'Reporting': { tr: 'Raporlama', de: 'Berichterstattung', ur: 'رپورٹنگ', ar: 'إعداد التقارير' },
  'Testing': { tr: 'Test', de: 'Testen', ur: 'ٹیسٹنگ', ar: 'الاختبار' },
  'Deployment': { tr: 'Dağıtım', de: 'Bereitstellung', ur: 'ڈیپلائمنٹ', ar: 'النشر' },
  'Maintenance': { tr: 'Bakım', de: 'Wartung', ur: 'دیکھ بھال', ar: 'الصيانة' },
  'Support': { tr: 'Destek', de: 'Support', ur: 'سپورٹ', ar: 'الدعم' },
  'Training': { tr: 'Eğitim', de: 'Schulung', ur: 'ٹریننگ', ar: 'التدريب' },
  'Documentation': { tr: 'Dokümantasyon', de: 'Dokumentation', ur: 'ڈاکومینٹیشن', ar: 'التوثيق' },
  'Migration': { tr: 'Göç', de: 'Migration', ur: 'مائیگریشن', ar: 'الترحيل' },
  'Implementation': { tr: 'Uygulama', de: 'Implementierung', ur: 'نفاذ', ar: 'التنفيذ' },
  'Architecture': { tr: 'Mimari', de: 'Architektur', ur: 'آرکیٹیکچر', ar: 'الهندسة المعمارية' },
  'Configuration': { tr: 'Yapılandırma', de: 'Konfiguration', ur: 'کنفیگریشن', ar: 'التكوين' },
  'Assessment': { tr: 'Değerlendirme', de: 'Bewertung', ur: 'تشخیص', ar: 'التقييم' },
  'Consultation': { tr: 'Danışmanlık', de: 'Beratung', ur: 'مشاورت', ar: 'الاستشارة' },
  'Audit': { tr: 'Denetim', de: 'Audit', ur: 'آڈٹ', ar: 'التدقيق' },
  'Research': { tr: 'Araştırma', de: 'Forschung', ur: 'ریسرچ', ar: 'البحث' },
  'Planning': { tr: 'Planlama', de: 'Planung', ur: 'منصوبہ بندی', ar: 'التخطيط' },
  'Strategy': { tr: 'Strateji', de: 'Strategie', ur: 'حکمت عملی', ar: 'الاستراتيجية' },
  'Analysis': { tr: 'Analiz', de: 'Analyse', ur: 'تجزیہ', ar: 'التحليل' },
  'Execution': { tr: 'Yürütme', de: 'Ausführung', ur: 'عملدرآمد', ar: 'التنفيذ' },
  'Launch': { tr: 'Lansman', de: 'Launch', ur: 'لانچ', ar: 'الإطلاق' },
  'Setup': { tr: 'Kurulum', de: 'Einrichtung', ur: 'سیٹ اپ', ar: 'الإعداد' },
  'Production': { tr: 'Üretim', de: 'Produktion', ur: 'پروڈکشن', ar: 'الإنتاج' },
  'Review': { tr: 'İnceleme', de: 'Überprüfung', ur: 'جائزہ', ar: 'المراجعة' },
  'Discovery': { tr: 'Keşif', de: 'Entdeckung', ur: 'دریافت', ar: 'الاكتشاف' },
  'Prototype': { tr: 'Prototip', de: 'Prototyp', ur: 'پروٹوٹائپ', ar: 'النموذج الأولي' },
  'Delivery': { tr: 'Teslim', de: 'Lieferung', ur: 'ڈیلیوری', ar: 'التسليم' },
  'Iteration': { tr: 'İterasyon', de: 'Iteration', ur: 'تکرار', ar: 'التكرار' },

  // Marketing terms
  'Campaign': { tr: 'Kampanya', de: 'Kampagne', ur: 'کیمپین', ar: 'الحملة' },
  'Targeting': { tr: 'Hedefleme', de: 'Targeting', ur: 'ہدف بندی', ar: 'الاستهداف' },
  'Audience': { tr: 'Hedef Kitle', de: 'Zielgruppe', ur: 'سامعین', ar: 'الجمهور' },
  'Conversion': { tr: 'Dönüşüm', de: 'Konversion', ur: 'کنورژن', ar: 'التحويل' },
  'Engagement': { tr: 'Etkileşim', de: 'Engagement', ur: 'مشغولیت', ar: 'التفاعل' },
  'Reach': { tr: 'Erişim', de: 'Reichweite', ur: 'رسائی', ar: 'الوصول' },
  'Traffic': { tr: 'Trafik', de: 'Traffic', ur: 'ٹریفک', ar: 'حركة المرور' },
  'Lead': { tr: 'Potansiyel Müşteri', de: 'Lead', ur: 'لیڈ', ar: 'العميل المحتمل' },
  'Retargeting': { tr: 'Yeniden Hedefleme', de: 'Retargeting', ur: 'ری ٹارگٹنگ', ar: 'إعادة الاستهداف' },
  'Remarketing': { tr: 'Yeniden Pazarlama', de: 'Remarketing', ur: 'ری مارکیٹنگ', ar: 'إعادة التسويق' },
  'Content': { tr: 'İçerik', de: 'Inhalt', ur: 'مواد', ar: 'المحتوى' },
  'Brand': { tr: 'Marka', de: 'Marke', ur: 'برانڈ', ar: 'العلامة التجارية' },
  'Creative': { tr: 'Kreatif', de: 'Kreativ', ur: 'کریئیٹو', ar: 'الإبداعي' },
  'Copy': { tr: 'Metin', de: 'Text', ur: 'کاپی', ar: 'النسخة' },
  'Funnel': { tr: 'Huni', de: 'Funnel', ur: 'فنل', ar: 'القمع' },
  'Performance': { tr: 'Performans', de: 'Leistung', ur: 'پرفارمنس', ar: 'الأداء' },
  'ROI': { tr: 'ROI', de: 'ROI', ur: 'ROI', ar: 'العائد على الاستثمار' },
  'CPC': { tr: 'TBM', de: 'CPC', ur: 'CPC', ar: 'تكلفة النقرة' },
  'CPM': { tr: 'BGBM', de: 'CPM', ur: 'CPM', ar: 'التكلفة لكل ألف' },
  'CTR': { tr: 'TO', de: 'CTR', ur: 'CTR', ar: 'معدل النقر' },

  // E-commerce terms
  'Product': { tr: 'Ürün', de: 'Produkt', ur: 'پروڈکٹ', ar: 'المنتج' },
  'Catalog': { tr: 'Katalog', de: 'Katalog', ur: 'کیٹلاگ', ar: 'الكتالوج' },
  'Cart': { tr: 'Sepet', de: 'Warenkorb', ur: 'کارٹ', ar: 'السلة' },
  'Checkout': { tr: 'Ödeme', de: 'Kasse', ur: 'چیک آؤٹ', ar: 'الدفع' },
  'Payment': { tr: 'Ödeme', de: 'Zahlung', ur: 'ادائیگی', ar: 'الدفع' },
  'Inventory': { tr: 'Envanter', de: 'Inventar', ur: 'انوینٹری', ar: 'المخزون' },
  'Order': { tr: 'Sipariş', de: 'Bestellung', ur: 'آرڈر', ar: 'الطلب' },
  'Shipping': { tr: 'Kargo', de: 'Versand', ur: 'شپنگ', ar: 'الشحن' },
  'Customer': { tr: 'Müşteri', de: 'Kunde', ur: 'کسٹمر', ar: 'العميل' },
  'Discount': { tr: 'İndirim', de: 'Rabatt', ur: 'ڈسکاؤنٹ', ar: 'الخصم' },
  'Store': { tr: 'Mağaza', de: 'Shop', ur: 'سٹور', ar: 'المتجر' },
  'Shop': { tr: 'Mağaza', de: 'Shop', ur: 'شاپ', ar: 'المتجر' },
  'Marketplace': { tr: 'Pazar Yeri', de: 'Marktplatz', ur: 'مارکیٹ پلیس', ar: 'السوق' },

  // AI/ML terms
  'AI': { tr: 'Yapay Zeka', de: 'KI', ur: 'AI', ar: 'الذكاء الاصطناعي' },
  'Machine Learning': { tr: 'Makine Öğrenimi', de: 'Maschinelles Lernen', ur: 'مشین لرننگ', ar: 'التعلم الآلي' },
  'Deep Learning': { tr: 'Derin Öğrenme', de: 'Deep Learning', ur: 'ڈیپ لرننگ', ar: 'التعلم العميق' },
  'Neural': { tr: 'Sinir Ağı', de: 'Neural', ur: 'نیورل', ar: 'العصبي' },
  'Model': { tr: 'Model', de: 'Modell', ur: 'ماڈل', ar: 'النموذج' },
  'Prediction': { tr: 'Tahmin', de: 'Vorhersage', ur: 'پیشگوئی', ar: 'التنبؤ' },
  'Classification': { tr: 'Sınıflandırma', de: 'Klassifizierung', ur: 'درجہ بندی', ar: 'التصنيف' },
  'Recognition': { tr: 'Tanıma', de: 'Erkennung', ur: 'شناخت', ar: 'التعرف' },
  'Detection': { tr: 'Algılama', de: 'Erkennung', ur: 'ڈیٹیکشن', ar: 'الكشف' },
  'Processing': { tr: 'İşleme', de: 'Verarbeitung', ur: 'پروسیسنگ', ar: 'المعالجة' },
  'Chatbot': { tr: 'Chatbot', de: 'Chatbot', ur: 'چیٹ بوٹ', ar: 'روبوت المحادثة' },
  'NLP': { tr: 'Doğal Dil İşleme', de: 'NLP', ur: 'NLP', ar: 'معالجة اللغة الطبيعية' },

  // Design terms
  'UI': { tr: 'Arayüz', de: 'Benutzeroberfläche', ur: 'UI', ar: 'واجهة المستخدم' },
  'UX': { tr: 'Kullanıcı Deneyimi', de: 'Benutzererfahrung', ur: 'UX', ar: 'تجربة المستخدم' },
  'Wireframe': { tr: 'Tel Çerçeve', de: 'Wireframe', ur: 'وائر فریم', ar: 'الإطار السلكي' },
  'Mockup': { tr: 'Mockup', de: 'Mockup', ur: 'موک اپ', ar: 'نموذج' },
  'Logo': { tr: 'Logo', de: 'Logo', ur: 'لوگو', ar: 'الشعار' },
  'Typography': { tr: 'Tipografi', de: 'Typografie', ur: 'ٹائپوگرافی', ar: 'الطباعة' },
  'Color': { tr: 'Renk', de: 'Farbe', ur: 'رنگ', ar: 'اللون' },
  'Layout': { tr: 'Düzen', de: 'Layout', ur: 'لے آؤٹ', ar: 'التخطيط' },
  'Responsive': { tr: 'Duyarlı', de: 'Responsiv', ur: 'ریسپانسیو', ar: 'متجاوب' },
  'Mobile': { tr: 'Mobil', de: 'Mobil', ur: 'موبائل', ar: 'الجوال' },
  'Desktop': { tr: 'Masaüstü', de: 'Desktop', ur: 'ڈیسک ٹاپ', ar: 'سطح المكتب' },
  'Web': { tr: 'Web', de: 'Web', ur: 'ویب', ar: 'الويب' },
  'App': { tr: 'Uygulama', de: 'App', ur: 'ایپ', ar: 'التطبيق' },

  // Cloud & DevOps
  'Cloud': { tr: 'Bulut', de: 'Cloud', ur: 'کلاؤڈ', ar: 'السحابة' },
  'Server': { tr: 'Sunucu', de: 'Server', ur: 'سرور', ar: 'الخادم' },
  'Database': { tr: 'Veritabanı', de: 'Datenbank', ur: 'ڈیٹا بیس', ar: 'قاعدة البيانات' },
  'API': { tr: 'API', de: 'API', ur: 'API', ar: 'واجهة برمجة التطبيقات' },
  'Infrastructure': { tr: 'Altyapı', de: 'Infrastruktur', ur: 'انفراسٹرکچر', ar: 'البنية التحتية' },
  'Container': { tr: 'Konteyner', de: 'Container', ur: 'کنٹینر', ar: 'الحاوية' },
  'Pipeline': { tr: 'Pipeline', de: 'Pipeline', ur: 'پائپ لائن', ar: 'خط الأنابيب' },
  'Security': { tr: 'Güvenlik', de: 'Sicherheit', ur: 'سیکیورٹی', ar: 'الأمان' },
  'Backup': { tr: 'Yedekleme', de: 'Backup', ur: 'بیک اپ', ar: 'النسخ الاحتياطي' },
  'Recovery': { tr: 'Kurtarma', de: 'Wiederherstellung', ur: 'ریکوری', ar: 'الاستعادة' },
  'Scale': { tr: 'Ölçekle', de: 'Skalieren', ur: 'اسکیل', ar: 'التوسع' },
  'Load': { tr: 'Yük', de: 'Last', ur: 'لوڈ', ar: 'الحمل' },
  'Network': { tr: 'Ağ', de: 'Netzwerk', ur: 'نیٹ ورک', ar: 'الشبكة' },

  // SEO terms
  'Keyword': { tr: 'Anahtar Kelime', de: 'Schlüsselwort', ur: 'کی ورڈ', ar: 'الكلمة المفتاحية' },
  'Ranking': { tr: 'Sıralama', de: 'Ranking', ur: 'رینکنگ', ar: 'الترتيب' },
  'Backlink': { tr: 'Geri Bağlantı', de: 'Backlink', ur: 'بیک لنک', ar: 'الرابط الخلفي' },
  'On-Page': { tr: 'Sayfa İçi', de: 'On-Page', ur: 'آن پیج', ar: 'داخل الصفحة' },
  'Off-Page': { tr: 'Sayfa Dışı', de: 'Off-Page', ur: 'آف پیج', ar: 'خارج الصفحة' },
  'Technical': { tr: 'Teknik', de: 'Technisch', ur: 'ٹیکنیکل', ar: 'التقني' },
  'Local': { tr: 'Yerel', de: 'Lokal', ur: 'لوکل', ar: 'المحلي' },
  'International': { tr: 'Uluslararası', de: 'International', ur: 'بین الاقوامی', ar: 'الدولي' },
  'Organic': { tr: 'Organik', de: 'Organisch', ur: 'آرگینک', ar: 'العضوي' },
  'Search': { tr: 'Arama', de: 'Suche', ur: 'سرچ', ar: 'البحث' },

  // Common adjectives & benefits
  'Quick': { tr: 'Hızlı', de: 'Schnell', ur: 'فوری', ar: 'سريع' },
  'Easy': { tr: 'Kolay', de: 'Einfach', ur: 'آسان', ar: 'سهل' },
  'Simple': { tr: 'Basit', de: 'Einfach', ur: 'سادہ', ar: 'بسيط' },
  'Powerful': { tr: 'Güçlü', de: 'Leistungsstark', ur: 'طاقتور', ar: 'قوي' },
  'Flexible': { tr: 'Esnek', de: 'Flexibel', ur: 'لچکدار', ar: 'مرن' },
  'Reliable': { tr: 'Güvenilir', de: 'Zuverlässig', ur: 'قابل اعتماد', ar: 'موثوق' },
  'Efficient': { tr: 'Verimli', de: 'Effizient', ur: 'موثر', ar: 'فعال' },
  'Effective': { tr: 'Etkili', de: 'Effektiv', ur: 'مؤثر', ar: 'فعال' },
  'High': { tr: 'Yüksek', de: 'Hoch', ur: 'اعلیٰ', ar: 'عالي' },
  'Low': { tr: 'Düşük', de: 'Niedrig', ur: 'کم', ar: 'منخفض' },
  'Better': { tr: 'Daha İyi', de: 'Besser', ur: 'بہتر', ar: 'أفضل' },
  'Best': { tr: 'En İyi', de: 'Beste', ur: 'بہترین', ar: 'الأفضل' },
  'New': { tr: 'Yeni', de: 'Neu', ur: 'نیا', ar: 'جديد' },
  'Modern': { tr: 'Modern', de: 'Modern', ur: 'جدید', ar: 'حديث' },
  'Global': { tr: 'Küresel', de: 'Global', ur: 'عالمی', ar: 'عالمي' },
  'Native': { tr: 'Yerel', de: 'Nativ', ur: 'مقامی', ar: 'أصلي' },
  'Cross-platform': { tr: 'Çapraz Platform', de: 'Plattformübergreifend', ur: 'کراس پلیٹ فارم', ar: 'متعدد المنصات' },
  'Multi-language': { tr: 'Çoklu Dil', de: 'Mehrsprachig', ur: 'ملٹی لینگویج', ar: 'متعدد اللغات' },
  'Multi-currency': { tr: 'Çoklu Para Birimi', de: 'Mehrwährung', ur: 'ملٹی کرنسی', ar: 'متعدد العملات' },

  // Time & Numbers
  '24/7': { tr: '7/24', de: '24/7', ur: '24/7', ar: 'على مدار الساعة' },
  'Daily': { tr: 'Günlük', de: 'Täglich', ur: 'روزانہ', ar: 'يومياً' },
  'Weekly': { tr: 'Haftalık', de: 'Wöchentlich', ur: 'ہفتہ وار', ar: 'أسبوعياً' },
  'Monthly': { tr: 'Aylık', de: 'Monatlich', ur: 'ماہانہ', ar: 'شهرياً' },
  'Annual': { tr: 'Yıllık', de: 'Jährlich', ur: 'سالانہ', ar: 'سنوياً' },

  // Common phrases
  'Ready': { tr: 'Hazır', de: 'Bereit', ur: 'تیار', ar: 'جاهز' },
  'Solutions': { tr: 'Çözümler', de: 'Lösungen', ur: 'حل', ar: 'الحلول' },
  'Services': { tr: 'Hizmetler', de: 'Dienstleistungen', ur: 'خدمات', ar: 'الخدمات' },
  'Features': { tr: 'Özellikler', de: 'Funktionen', ur: 'خصوصیات', ar: 'الميزات' },
  'Benefits': { tr: 'Faydalar', de: 'Vorteile', ur: 'فوائد', ar: 'الفوائد' },
  'Results': { tr: 'Sonuçlar', de: 'Ergebnisse', ur: 'نتائج', ar: 'النتائج' },
  'Insights': { tr: 'İçgörüler', de: 'Einblicke', ur: 'بصیرت', ar: 'رؤى' },
  'Updates': { tr: 'Güncellemeler', de: 'Aktualisierungen', ur: 'اپڈیٹس', ar: 'التحديثات' },
  'Access': { tr: 'Erişim', de: 'Zugang', ur: 'رسائی', ar: 'الوصول' },
  'Tools': { tr: 'Araçlar', de: 'Werkzeuge', ur: 'ٹولز', ar: 'الأدوات' },
  'System': { tr: 'Sistem', de: 'System', ur: 'سسٹم', ar: 'النظام' },
  'Platform': { tr: 'Platform', de: 'Plattform', ur: 'پلیٹ فارم', ar: 'المنصة' },
  'Dashboard': { tr: 'Kontrol Paneli', de: 'Dashboard', ur: 'ڈیش بورڈ', ar: 'لوحة التحكم' },
  'Interface': { tr: 'Arayüz', de: 'Oberfläche', ur: 'انٹرفیس', ar: 'الواجهة' },
  'Workflow': { tr: 'İş Akışı', de: 'Workflow', ur: 'ورک فلو', ar: 'سير العمل' },
  'Process': { tr: 'Süreç', de: 'Prozess', ur: 'عمل', ar: 'العملية' },
  'Quality': { tr: 'Kalite', de: 'Qualität', ur: 'کوالٹی', ar: 'الجودة' },
  'Standards': { tr: 'Standartlar', de: 'Standards', ur: 'معیارات', ar: 'المعايير' },
};

// Process step full translations
const processStepTranslations: Record<string, Record<Locale, { title: string; description: string }>> = {
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
  'Research': {
    tr: { title: 'Araştırma', description: 'Kapsamlı pazar ve kullanıcı araştırması yapıyoruz.' },
    de: { title: 'Forschung', description: 'Wir führen umfassende Markt- und Nutzerforschung durch.' },
    ur: { title: 'ریسرچ', description: 'ہم جامع مارکیٹ اور یوزر ریسرچ کرتے ہیں۔' },
    ar: { title: 'البحث', description: 'نجري بحثًا شاملاً للسوق والمستخدمين.' }
  },
  'Execution': {
    tr: { title: 'Yürütme', description: 'Planı etkili bir şekilde uyguluyoruz.' },
    de: { title: 'Ausführung', description: 'Wir führen den Plan effektiv aus.' },
    ur: { title: 'عملدرآمد', description: 'ہم منصوبے کو مؤثر طریقے سے نافذ کرتے ہیں۔' },
    ar: { title: 'التنفيذ', description: 'ننفذ الخطة بفعالية.' }
  },
  'Audit': {
    tr: { title: 'Denetim', description: 'Mevcut durumu kapsamlı şekilde denetliyoruz.' },
    de: { title: 'Audit', description: 'Wir führen ein umfassendes Audit durch.' },
    ur: { title: 'آڈٹ', description: 'ہم موجودہ صورتحال کا جامع آڈٹ کرتے ہیں۔' },
    ar: { title: 'التدقيق', description: 'نجري تدقيقًا شاملاً للوضع الحالي.' }
  },
  'Deploy': {
    tr: { title: 'Dağıtım', description: 'Çözümü üretim ortamına dağıtıyoruz.' },
    de: { title: 'Bereitstellung', description: 'Wir stellen die Lösung in der Produktionsumgebung bereit.' },
    ur: { title: 'ڈیپلائمنٹ', description: 'ہم حل کو پروڈکشن ماحول میں تعینات کرتے ہیں۔' },
    ar: { title: 'النشر', description: 'ننشر الحل في بيئة الإنتاج.' }
  },
  'Integrate': {
    tr: { title: 'Entegrasyon', description: 'Mevcut sistemlerle entegre ediyoruz.' },
    de: { title: 'Integration', description: 'Wir integrieren mit bestehenden Systemen.' },
    ur: { title: 'انٹیگریشن', description: 'ہم موجودہ سسٹمز کے ساتھ انٹیگریٹ کرتے ہیں۔' },
    ar: { title: 'التكامل', description: 'نقوم بالتكامل مع الأنظمة الحالية.' }
  },
};

// ============================================
// TRANSLATION FUNCTION
// ============================================

function translateText(text: string, locale: Locale): string {
  // Check exact match first
  if (translations[text]?.[locale]) {
    return translations[text][locale];
  }

  // Try to translate word by word for multi-word phrases
  const words = text.split(/\s+/);
  if (words.length > 1) {
    let translated = text;
    let hasTranslation = false;

    // Sort translations by length (longer matches first)
    const sortedKeys = Object.keys(translations).sort((a, b) => b.length - a.length);

    for (const key of sortedKeys) {
      if (translated.includes(key) && translations[key]?.[locale]) {
        translated = translated.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), translations[key][locale]);
        hasTranslation = true;
      }
    }

    if (hasTranslation) {
      return translated;
    }
  }

  return text;
}

function translateProcess(process: any[], locale: Locale): any[] {
  if (!process) return [];

  return process.map(step => {
    const title = step.title || '';

    // Check for exact match in full translations
    if (processStepTranslations[title]?.[locale]) {
      return {
        ...step,
        title: processStepTranslations[title][locale].title,
        description: processStepTranslations[title][locale].description
      };
    }

    // Translate title using word translations
    const translatedTitle = translateText(title, locale);
    const translatedDesc = translateText(step.description || '', locale);

    return {
      ...step,
      title: translatedTitle,
      description: translatedDesc
    };
  });
}

function translateFAQ(faq: any[], locale: Locale): any[] {
  if (!faq) return [];

  return faq.map(item => {
    return {
      question: translateText(item.question || '', locale),
      answer: translateText(item.answer || '', locale)
    };
  });
}

// ============================================
// MAIN FUNCTION
// ============================================

async function translateComprehensive() {
  console.log('🌍 Running comprehensive translation...\n');

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

      if (baseFeatures.length === 0 && baseBenefits.length === 0 && !baseContent.process && !baseContent.faq) {
        continue;
      }

      for (const locale of LOCALES) {
        const existingTranslation = service.translations.find(t => t.locale === locale);
        if (!existingTranslation) continue;

        // Translate content
        const translatedFeatures = baseFeatures.map(f => translateText(f, locale));
        const translatedBenefits = baseBenefits.map(b => translateText(b, locale));

        const translatedContent: any = { ...baseContent };
        if (baseContent.process) {
          translatedContent.process = translateProcess(baseContent.process, locale);
        }
        if (baseContent.faq) {
          translatedContent.faq = translateFAQ(baseContent.faq, locale);
        }

        // Check if changes
        const hasChanges =
          JSON.stringify(translatedFeatures) !== JSON.stringify(existingTranslation.features) ||
          JSON.stringify(translatedBenefits) !== JSON.stringify(existingTranslation.benefits) ||
          JSON.stringify(translatedContent) !== JSON.stringify(existingTranslation.content);

        if (hasChanges) {
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
    }

    console.log(`\n✅ Updated ${updated} translations`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

translateComprehensive();
