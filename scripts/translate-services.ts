/**
 * Script to translate all services that have English placeholders
 *
 * This script updates ServiceTranslation records with proper translations
 * for service names and descriptions.
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

// Service name translations
const serviceTranslations: Record<string, { tr: string; de: string; ur: string; ar: string }> = {
  // Web & Software
  'web-development': { tr: 'Web Geliştirme', de: 'Webentwicklung', ur: 'ویب ڈویلپمنٹ', ar: 'تطوير الويب' },
  'frontend-development': { tr: 'Frontend Geliştirme', de: 'Frontend-Entwicklung', ur: 'فرنٹ اینڈ ڈویلپمنٹ', ar: 'تطوير الواجهة الأمامية' },
  'backend-development': { tr: 'Backend Geliştirme', de: 'Backend-Entwicklung', ur: 'بیک اینڈ ڈویلپمنٹ', ar: 'تطوير الواجهة الخلفية' },
  'full-stack-development': { tr: 'Full-Stack Geliştirme', de: 'Full-Stack-Entwicklung', ur: 'فل سٹیک ڈویلپمنٹ', ar: 'تطوير فول ستاك' },
  'progressive-web-apps': { tr: 'Progressive Web Uygulamaları', de: 'Progressive Web-Apps', ur: 'پروگریسو ویب ایپس', ar: 'تطبيقات الويب التقدمية' },
  'headless-cms-development': { tr: 'Headless CMS Geliştirme', de: 'Headless CMS-Entwicklung', ur: 'ہیڈلیس سی ایم ایس ڈویلپمنٹ', ar: 'تطوير CMS بدون واجهة' },
  'jamstack-development': { tr: 'Jamstack Geliştirme', de: 'Jamstack-Entwicklung', ur: 'جیم اسٹیک ڈویلپمنٹ', ar: 'تطوير Jamstack' },
  'e-commerce': { tr: 'E-Ticaret', de: 'E-Commerce', ur: 'ای کامرس', ar: 'التجارة الإلكترونية' },
  'shopify-development': { tr: 'Shopify Geliştirme', de: 'Shopify-Entwicklung', ur: 'شاپیفائی ڈویلپمنٹ', ar: 'تطوير Shopify' },
  'woocommerce-development': { tr: 'WooCommerce Geliştirme', de: 'WooCommerce-Entwicklung', ur: 'ووکامرس ڈویلپمنٹ', ar: 'تطوير WooCommerce' },
  'magento-development': { tr: 'Magento Geliştirme', de: 'Magento-Entwicklung', ur: 'میجینٹو ڈویلپمنٹ', ar: 'تطوير Magento' },
  'custom-ecommerce': { tr: 'Özel E-Ticaret', de: 'Individueller E-Commerce', ur: 'کسٹم ای کامرس', ar: 'تجارة إلكترونية مخصصة' },
  'marketplace-development': { tr: 'Pazar Yeri Geliştirme', de: 'Marktplatz-Entwicklung', ur: 'مارکیٹ پلیس ڈویلپمنٹ', ar: 'تطوير السوق' },
  'b2b-ecommerce': { tr: 'B2B E-Ticaret', de: 'B2B E-Commerce', ur: 'بی ٹو بی ای کامرس', ar: 'تجارة B2B الإلكترونية' },
  'mobile-development': { tr: 'Mobil Geliştirme', de: 'Mobile Entwicklung', ur: 'موبائل ڈویلپمنٹ', ar: 'تطوير الموبايل' },
  'ios-development': { tr: 'iOS Geliştirme', de: 'iOS-Entwicklung', ur: 'آئی او ایس ڈویلپمنٹ', ar: 'تطوير iOS' },
  'android-development': { tr: 'Android Geliştirme', de: 'Android-Entwicklung', ur: 'اینڈرائڈ ڈویلپمنٹ', ar: 'تطوير Android' },
  'flutter-development': { tr: 'Flutter Geliştirme', de: 'Flutter-Entwicklung', ur: 'فلٹر ڈویلپمنٹ', ar: 'تطوير Flutter' },
  'react-native-development': { tr: 'React Native Geliştirme', de: 'React Native-Entwicklung', ur: 'ری ایکٹ نیٹو ڈویلپمنٹ', ar: 'تطوير React Native' },
  'cross-platform-apps': { tr: 'Çapraz Platform Uygulamaları', de: 'Plattformübergreifende Apps', ur: 'کراس پلیٹ فارم ایپس', ar: 'تطبيقات متعددة المنصات' },
  'api-development': { tr: 'API Geliştirme', de: 'API-Entwicklung', ur: 'اے پی آئی ڈویلپمنٹ', ar: 'تطوير API' },
  'rest-api-development': { tr: 'REST API Geliştirme', de: 'REST-API-Entwicklung', ur: 'ریسٹ اے پی آئی ڈویلپمنٹ', ar: 'تطوير REST API' },
  'graphql-development': { tr: 'GraphQL Geliştirme', de: 'GraphQL-Entwicklung', ur: 'گراف کیو ایل ڈویلپمنٹ', ar: 'تطوير GraphQL' },
  'third-party-api-integration': { tr: 'Üçüncü Taraf API Entegrasyonu', de: 'API-Integration von Drittanbietern', ur: 'تھرڈ پارٹی اے پی آئی انٹیگریشن', ar: 'تكامل API الطرف الثالث' },
  'api-gateway': { tr: 'API Gateway', de: 'API-Gateway', ur: 'اے پی آئی گیٹ وے', ar: 'بوابة API' },
  'saas-development': { tr: 'SaaS Geliştirme', de: 'SaaS-Entwicklung', ur: 'ساس ڈویلپمنٹ', ar: 'تطوير SaaS' },
  'mvp-development': { tr: 'MVP Geliştirme', de: 'MVP-Entwicklung', ur: 'ایم وی پی ڈویلپمنٹ', ar: 'تطوير MVP' },
  'multi-tenant-architecture': { tr: 'Çok Kiracılı Mimari', de: 'Multi-Tenant-Architektur', ur: 'ملٹی ٹیننٹ آرکیٹیکچر', ar: 'بنية متعددة المستأجرين' },
  'saas-migration': { tr: 'SaaS Göçü', de: 'SaaS-Migration', ur: 'ساس مائیگریشن', ar: 'ترحيل SaaS' },
  'wordpress-development': { tr: 'WordPress Geliştirme', de: 'WordPress-Entwicklung', ur: 'ورڈپریس ڈویلپمنٹ', ar: 'تطوير WordPress' },
  'custom-wordpress-themes': { tr: 'Özel WordPress Temaları', de: 'Individuelle WordPress-Themes', ur: 'کسٹم ورڈپریس تھیمز', ar: 'قوالب WordPress مخصصة' },
  'wordpress-plugin-development': { tr: 'WordPress Eklenti Geliştirme', de: 'WordPress-Plugin-Entwicklung', ur: 'ورڈپریس پلگ ان ڈویلپمنٹ', ar: 'تطوير إضافات WordPress' },
  'wordpress-optimization': { tr: 'WordPress Optimizasyonu', de: 'WordPress-Optimierung', ur: 'ورڈپریس آپٹیمائزیشن', ar: 'تحسين WordPress' },
  'enterprise-software': { tr: 'Kurumsal Yazılım', de: 'Unternehmenssoftware', ur: 'انٹرپرائز سافٹ ویئر', ar: 'برمجيات المؤسسات' },
  'crm-development': { tr: 'CRM Geliştirme', de: 'CRM-Entwicklung', ur: 'سی آر ایم ڈویلپمنٹ', ar: 'تطوير CRM' },
  'erp-development': { tr: 'ERP Geliştirme', de: 'ERP-Entwicklung', ur: 'ای آر پی ڈویلپمنٹ', ar: 'تطوير ERP' },
  'hrms-development': { tr: 'HRMS Geliştirme', de: 'HRMS-Entwicklung', ur: 'ایچ آر ایم ایس ڈویلپمنٹ', ar: 'تطوير HRMS' },
  'custom-business-software': { tr: 'Özel İş Yazılımı', de: 'Individuelle Geschäftssoftware', ur: 'کسٹم بزنس سافٹ ویئر', ar: 'برمجيات أعمال مخصصة' },
  'web3-blockchain': { tr: 'Web3 & Blockchain', de: 'Web3 & Blockchain', ur: 'ویب 3 اور بلاکچین', ar: 'Web3 والبلوكتشين' },
  'smart-contracts': { tr: 'Akıllı Sözleşmeler', de: 'Smart Contracts', ur: 'سمارٹ کنٹریکٹس', ar: 'العقود الذكية' },
  'dapp-development': { tr: 'DApp Geliştirme', de: 'DApp-Entwicklung', ur: 'ڈی ایپ ڈویلپمنٹ', ar: 'تطوير DApp' },
  'nft-marketplace': { tr: 'NFT Pazar Yeri', de: 'NFT-Marktplatz', ur: 'این ایف ٹی مارکیٹ پلیس', ar: 'سوق NFT' },
  'defi-solutions': { tr: 'DeFi Çözümleri', de: 'DeFi-Lösungen', ur: 'ڈی فائی سلوشنز', ar: 'حلول DeFi' },
  'tokenization': { tr: 'Tokenizasyon', de: 'Tokenisierung', ur: 'ٹوکنائزیشن', ar: 'الترميز' },
  'no-code-low-code': { tr: 'No-Code/Low-Code', de: 'No-Code/Low-Code', ur: 'نو کوڈ/لو کوڈ', ar: 'بدون كود/قليل الكود' },
  'bubble-development': { tr: 'Bubble Geliştirme', de: 'Bubble-Entwicklung', ur: 'ببل ڈویلپمنٹ', ar: 'تطوير Bubble' },
  'webflow-development': { tr: 'Webflow Geliştirme', de: 'Webflow-Entwicklung', ur: 'ویب فلو ڈویلپمنٹ', ar: 'تطوير Webflow' },
  'airtable-solutions': { tr: 'Airtable Çözümleri', de: 'Airtable-Lösungen', ur: 'ایئرٹیبل سلوشنز', ar: 'حلول Airtable' },
  'zapier-automation': { tr: 'Zapier Otomasyonu', de: 'Zapier-Automatisierung', ur: 'زیپئیر آٹومیشن', ar: 'أتمتة Zapier' },

  // AI & Data
  'ai-solutions': { tr: 'Yapay Zeka Çözümleri', de: 'KI-Lösungen', ur: 'اے آئی سلوشنز', ar: 'حلول الذكاء الاصطناعي' },
  'ai-consulting-strategy': { tr: 'AI Danışmanlık ve Strateji', de: 'KI-Beratung & Strategie', ur: 'اے آئی کنسلٹنگ اینڈ سٹریٹیجی', ar: 'استشارات واستراتيجية الذكاء الاصطناعي' },
  'custom-ai-development': { tr: 'Özel AI Geliştirme', de: 'Individuelle KI-Entwicklung', ur: 'کسٹم اے آئی ڈویلپمنٹ', ar: 'تطوير ذكاء اصطناعي مخصص' },
  'ai-integration': { tr: 'AI Entegrasyonu', de: 'KI-Integration', ur: 'اے آئی انٹیگریشن', ar: 'تكامل الذكاء الاصطناعي' },
  'ai-poc-mvp': { tr: 'AI POC/MVP', de: 'KI POC/MVP', ur: 'اے آئی پی او سی/ایم وی پی', ar: 'إثبات مفهوم/MVP للذكاء الاصطناعي' },
  'machine-learning': { tr: 'Makine Öğrenimi', de: 'Maschinelles Lernen', ur: 'مشین لرننگ', ar: 'التعلم الآلي' },
  'predictive-analytics': { tr: 'Tahmine Dayalı Analitik', de: 'Prädiktive Analytik', ur: 'پریڈکٹو اینالیٹکس', ar: 'التحليلات التنبؤية' },
  'nlp-text-processing': { tr: 'NLP ve Metin İşleme', de: 'NLP & Textverarbeitung', ur: 'این ایل پی اینڈ ٹیکسٹ پروسیسنگ', ar: 'معالجة اللغة الطبيعية والنصوص' },
  'recommendation-systems': { tr: 'Öneri Sistemleri', de: 'Empfehlungssysteme', ur: 'ریکمنڈیشن سسٹمز', ar: 'أنظمة التوصية' },
  'anomaly-detection': { tr: 'Anomali Tespiti', de: 'Anomalieerkennung', ur: 'انومیلی ڈیٹیکشن', ar: 'اكتشاف الشذوذ' },
  'time-series-forecasting': { tr: 'Zaman Serisi Tahmini', de: 'Zeitreihenprognose', ur: 'ٹائم سیریز فورکاسٹنگ', ar: 'التنبؤ بالسلاسل الزمنية' },
  'conversational-ai': { tr: 'Konuşma AI', de: 'Konversations-KI', ur: 'کنورسیشنل اے آئی', ar: 'الذكاء الاصطناعي المحادثي' },
  'chatbot-development': { tr: 'Chatbot Geliştirme', de: 'Chatbot-Entwicklung', ur: 'چیٹ بوٹ ڈویلپمنٹ', ar: 'تطوير روبوتات الدردشة' },
  'voice-assistant-development': { tr: 'Sesli Asistan Geliştirme', de: 'Sprachassistent-Entwicklung', ur: 'وائس اسسٹنٹ ڈویلپمنٹ', ar: 'تطوير المساعد الصوتي' },
  'whatsapp-bots': { tr: 'WhatsApp Botları', de: 'WhatsApp-Bots', ur: 'واٹس ایپ بوٹس', ar: 'روبوتات واتساب' },
  'customer-service-ai': { tr: 'Müşteri Hizmetleri AI', de: 'KI für Kundenservice', ur: 'کسٹمر سروس اے آئی', ar: 'ذكاء اصطناعي لخدمة العملاء' },
  'computer-vision': { tr: 'Bilgisayarlı Görü', de: 'Computer Vision', ur: 'کمپیوٹر ویژن', ar: 'الرؤية الحاسوبية' },
  'image-recognition': { tr: 'Görüntü Tanıma', de: 'Bilderkennung', ur: 'امیج ریکگنیشن', ar: 'التعرف على الصور' },
  'object-detection': { tr: 'Nesne Tespiti', de: 'Objekterkennung', ur: 'آبجیکٹ ڈیٹیکشن', ar: 'اكتشاف الأجسام' },
  'video-analytics': { tr: 'Video Analitiği', de: 'Videoanalyse', ur: 'ویڈیو اینالیٹکس', ar: 'تحليلات الفيديو' },
  'ocr-document-processing': { tr: 'OCR ve Belge İşleme', de: 'OCR & Dokumentenverarbeitung', ur: 'او سی آر اینڈ ڈاکیومنٹ پروسیسنگ', ar: 'التعرف الضوئي ومعالجة المستندات' },
  'llm-services': { tr: 'LLM Hizmetleri', de: 'LLM-Dienste', ur: 'ایل ایل ایم سروسز', ar: 'خدمات نماذج اللغة الكبيرة' },
  'llm-finetuning': { tr: 'LLM İnce Ayar', de: 'LLM-Feinabstimmung', ur: 'ایل ایل ایم فائن ٹیوننگ', ar: 'ضبط نماذج اللغة الكبيرة' },
  'prompt-engineering': { tr: 'Prompt Mühendisliği', de: 'Prompt-Engineering', ur: 'پرامپٹ انجینئرنگ', ar: 'هندسة الأوامر' },
  'gpt-claude-api-integration': { tr: 'GPT/Claude API Entegrasyonu', de: 'GPT/Claude API-Integration', ur: 'جی پی ٹی/کلاڈ اے پی آئی انٹیگریشن', ar: 'تكامل GPT/Claude API' },
  'custom-llm-development': { tr: 'Özel LLM Geliştirme', de: 'Individuelle LLM-Entwicklung', ur: 'کسٹم ایل ایل ایم ڈویلپمنٹ', ar: 'تطوير نماذج لغة مخصصة' },
  'ai-agents': { tr: 'AI Ajanları', de: 'KI-Agenten', ur: 'اے آئی ایجنٹس', ar: 'وكلاء الذكاء الاصطناعي' },
  'autonomous-agents': { tr: 'Otonom Ajanlar', de: 'Autonome Agenten', ur: 'آٹونومس ایجنٹس', ar: 'الوكلاء المستقلون' },
  'multi-agent-systems': { tr: 'Çoklu Ajan Sistemleri', de: 'Multi-Agenten-Systeme', ur: 'ملٹی ایجنٹ سسٹمز', ar: 'أنظمة متعددة الوكلاء' },
  'ai-workflow-automation': { tr: 'AI İş Akışı Otomasyonu', de: 'KI-Workflow-Automatisierung', ur: 'اے آئی ورک فلو آٹومیشن', ar: 'أتمتة سير العمل بالذكاء الاصطناعي' },
  'rag-solutions': { tr: 'RAG Çözümleri', de: 'RAG-Lösungen', ur: 'ریگ سلوشنز', ar: 'حلول RAG' },
  'knowledge-base-ai': { tr: 'Bilgi Tabanı AI', de: 'Wissensbasis-KI', ur: 'نالج بیس اے آئی', ar: 'قاعدة معرفية بالذكاء الاصطناعي' },
  'document-qa': { tr: 'Belge Soru-Cevap', de: 'Dokument Q&A', ur: 'ڈاکیومنٹ کیو اینڈ اے', ar: 'أسئلة وأجوبة المستندات' },
  'enterprise-search-ai': { tr: 'Kurumsal Arama AI', de: 'Enterprise-Suche mit KI', ur: 'انٹرپرائز سرچ اے آئی', ar: 'بحث المؤسسات بالذكاء الاصطناعي' },
  'python-automation': { tr: 'Python Otomasyonu', de: 'Python-Automatisierung', ur: 'پائیتھون آٹومیشن', ar: 'أتمتة Python' },
  'web-scraping': { tr: 'Web Kazıma', de: 'Web-Scraping', ur: 'ویب سکریپنگ', ar: 'استخراج بيانات الويب' },
  'workflow-automation': { tr: 'İş Akışı Otomasyonu', de: 'Workflow-Automatisierung', ur: 'ورک فلو آٹومیشن', ar: 'أتمتة سير العمل' },
  'data-pipeline-automation': { tr: 'Veri Hattı Otomasyonu', de: 'Datenpipeline-Automatisierung', ur: 'ڈیٹا پائپ لائن آٹومیشن', ar: 'أتمتة خطوط البيانات' },
  'rpa-solutions': { tr: 'RPA Çözümleri', de: 'RPA-Lösungen', ur: 'آر پی اے سلوشنز', ar: 'حلول RPA' },

  // Digital Marketing
  'seo': { tr: 'SEO', de: 'SEO', ur: 'ایس ای او', ar: 'تحسين محركات البحث' },
  'technical-seo': { tr: 'Teknik SEO', de: 'Technisches SEO', ur: 'ٹیکنیکل ایس ای او', ar: 'SEO التقني' },
  'local-seo': { tr: 'Yerel SEO', de: 'Lokales SEO', ur: 'لوکل ایس ای او', ar: 'SEO المحلي' },
  'international-seo': { tr: 'Uluslararası SEO', de: 'Internationales SEO', ur: 'انٹرنیشنل ایس ای او', ar: 'SEO الدولي' },
  'link-building': { tr: 'Bağlantı Oluşturma', de: 'Linkbuilding', ur: 'لنک بلڈنگ', ar: 'بناء الروابط' },
  'ecommerce-seo': { tr: 'E-Ticaret SEO', de: 'E-Commerce SEO', ur: 'ای کامرس ایس ای او', ar: 'SEO للتجارة الإلكترونية' },
  'geo-ai-search-optimization': { tr: 'GEO/AI Arama Optimizasyonu', de: 'GEO/KI-Suchoptimierung', ur: 'جیو/اے آئی سرچ آپٹیمائزیشن', ar: 'تحسين البحث الجغرافي/الذكي' },
  'google-ads': { tr: 'Google Reklamları', de: 'Google Ads', ur: 'گوگل ایڈز', ar: 'إعلانات جوجل' },
  'google-search-ads': { tr: 'Google Arama Reklamları', de: 'Google Suchanzeigen', ur: 'گوگل سرچ ایڈز', ar: 'إعلانات بحث جوجل' },
  'google-display-ads': { tr: 'Google Görüntülü Reklamlar', de: 'Google Display-Anzeigen', ur: 'گوگل ڈسپلے ایڈز', ar: 'إعلانات جوجل المصورة' },
  'youtube-ads': { tr: 'YouTube Reklamları', de: 'YouTube-Anzeigen', ur: 'یوٹیوب ایڈز', ar: 'إعلانات يوتيوب' },
  'google-shopping': { tr: 'Google Alışveriş', de: 'Google Shopping', ur: 'گوگل شاپنگ', ar: 'تسوق جوجل' },
  'performance-max': { tr: 'Performance Max', de: 'Performance Max', ur: 'پرفارمنس میکس', ar: 'Performance Max' },
  'meta-ads': { tr: 'Meta Reklamları', de: 'Meta-Anzeigen', ur: 'میٹا ایڈز', ar: 'إعلانات ميتا' },
  'facebook-ads': { tr: 'Facebook Reklamları', de: 'Facebook-Anzeigen', ur: 'فیس بک ایڈز', ar: 'إعلانات فيسبوك' },
  'instagram-ads': { tr: 'Instagram Reklamları', de: 'Instagram-Anzeigen', ur: 'انسٹاگرام ایڈز', ar: 'إعلانات انستغرام' },
  'advantage-plus-campaigns': { tr: 'Advantage+ Kampanyaları', de: 'Advantage+ Kampagnen', ur: 'ایڈوانٹیج پلس کمپینز', ar: 'حملات Advantage+' },
  'social-media-marketing': { tr: 'Sosyal Medya Pazarlaması', de: 'Social Media Marketing', ur: 'سوشل میڈیا مارکیٹنگ', ar: 'التسويق عبر وسائل التواصل الاجتماعي' },
  'social-media-management': { tr: 'Sosyal Medya Yönetimi', de: 'Social Media Management', ur: 'سوشل میڈیا مینجمنٹ', ar: 'إدارة وسائل التواصل الاجتماعي' },
  'influencer-marketing': { tr: 'Influencer Pazarlaması', de: 'Influencer-Marketing', ur: 'انفلوئنسر مارکیٹنگ', ar: 'التسويق عبر المؤثرين' },
  'community-management': { tr: 'Topluluk Yönetimi', de: 'Community Management', ur: 'کمیونٹی مینجمنٹ', ar: 'إدارة المجتمع' },
  'social-commerce': { tr: 'Sosyal Ticaret', de: 'Social Commerce', ur: 'سوشل کامرس', ar: 'التجارة الاجتماعية' },
  'tiktok-marketing': { tr: 'TikTok Pazarlaması', de: 'TikTok-Marketing', ur: 'ٹک ٹاک مارکیٹنگ', ar: 'تسويق تيك توك' },
  'tiktok-ads': { tr: 'TikTok Reklamları', de: 'TikTok-Anzeigen', ur: 'ٹک ٹاک ایڈز', ar: 'إعلانات تيك توك' },
  'tiktok-shop': { tr: 'TikTok Shop', de: 'TikTok Shop', ur: 'ٹک ٹاک شاپ', ar: 'متجر تيك توك' },
  'tiktok-content': { tr: 'TikTok İçerik', de: 'TikTok-Content', ur: 'ٹک ٹاک کنٹینٹ', ar: 'محتوى تيك توك' },
  'linkedin-marketing': { tr: 'LinkedIn Pazarlaması', de: 'LinkedIn-Marketing', ur: 'لنکڈ ان مارکیٹنگ', ar: 'تسويق لينكد إن' },
  'linkedin-ads': { tr: 'LinkedIn Reklamları', de: 'LinkedIn-Anzeigen', ur: 'لنکڈ ان ایڈز', ar: 'إعلانات لينكد إن' },
  'linkedin-lead-gen': { tr: 'LinkedIn Lead Gen', de: 'LinkedIn Lead-Generierung', ur: 'لنکڈ ان لیڈ جین', ar: 'توليد العملاء المحتملين عبر لينكد إن' },
  'company-page-management': { tr: 'Şirket Sayfası Yönetimi', de: 'Unternehmensseiten-Management', ur: 'کمپنی پیج مینجمنٹ', ar: 'إدارة صفحة الشركة' },
  'whatsapp-marketing': { tr: 'WhatsApp Pazarlaması', de: 'WhatsApp-Marketing', ur: 'واٹس ایپ مارکیٹنگ', ar: 'تسويق واتساب' },
  'whatsapp-business-api': { tr: 'WhatsApp Business API', de: 'WhatsApp Business API', ur: 'واٹس ایپ بزنس اے پی آئی', ar: 'WhatsApp Business API' },
  'whatsapp-campaigns': { tr: 'WhatsApp Kampanyaları', de: 'WhatsApp-Kampagnen', ur: 'واٹس ایپ کمپینز', ar: 'حملات واتساب' },
  'whatsapp-commerce': { tr: 'WhatsApp Ticareti', de: 'WhatsApp Commerce', ur: 'واٹس ایپ کامرس', ar: 'تجارة واتساب' },
  'email-marketing': { tr: 'E-posta Pazarlaması', de: 'E-Mail-Marketing', ur: 'ای میل مارکیٹنگ', ar: 'التسويق عبر البريد الإلكتروني' },
  'email-automation': { tr: 'E-posta Otomasyonu', de: 'E-Mail-Automatisierung', ur: 'ای میل آٹومیشن', ar: 'أتمتة البريد الإلكتروني' },
  'newsletter-design': { tr: 'Haber Bülteni Tasarımı', de: 'Newsletter-Design', ur: 'نیوز لیٹر ڈیزائن', ar: 'تصميم النشرة الإخبارية' },
  'email-deliverability': { tr: 'E-posta Teslim Edilebilirliği', de: 'E-Mail-Zustellbarkeit', ur: 'ای میل ڈیلیوری ایبلٹی', ar: 'إمكانية تسليم البريد الإلكتروني' },
  'content-marketing': { tr: 'İçerik Pazarlaması', de: 'Content-Marketing', ur: 'کنٹینٹ مارکیٹنگ', ar: 'تسويق المحتوى' },
  'blog-copywriting': { tr: 'Blog Yazarlığı', de: 'Blog-Texterstellung', ur: 'بلاگ کاپی رائٹنگ', ar: 'كتابة المدونات' },
  'video-production-marketing': { tr: 'Video Prodüksiyon Pazarlaması', de: 'Videoproduktion & Marketing', ur: 'ویڈیو پروڈکشن مارکیٹنگ', ar: 'إنتاج الفيديو والتسويق' },
  'content-strategy': { tr: 'İçerik Stratejisi', de: 'Content-Strategie', ur: 'کنٹینٹ سٹریٹیجی', ar: 'استراتيجية المحتوى' },
  'podcast-production': { tr: 'Podcast Prodüksiyon', de: 'Podcast-Produktion', ur: 'پوڈکاسٹ پروڈکشن', ar: 'إنتاج البودكاست' },
  'cro': { tr: 'Dönüşüm Oranı Optimizasyonu', de: 'Conversion Rate Optimierung', ur: 'سی آر او', ar: 'تحسين معدل التحويل' },
  'ab-testing': { tr: 'A/B Testi', de: 'A/B-Testing', ur: 'اے/بی ٹیسٹنگ', ar: 'اختبار A/B' },
  'landing-page-optimization': { tr: 'Açılış Sayfası Optimizasyonu', de: 'Landingpage-Optimierung', ur: 'لینڈنگ پیج آپٹیمائزیشن', ar: 'تحسين صفحات الهبوط' },
  'funnel-optimization': { tr: 'Huni Optimizasyonu', de: 'Funnel-Optimierung', ur: 'فنل آپٹیمائزیشن', ar: 'تحسين القمع' },
  'ux-analytics': { tr: 'UX Analitiği', de: 'UX-Analytik', ur: 'یو ایکس اینالیٹکس', ar: 'تحليلات تجربة المستخدم' },
  'marketing-automation': { tr: 'Pazarlama Otomasyonu', de: 'Marketing-Automatisierung', ur: 'مارکیٹنگ آٹومیشن', ar: 'أتمتة التسويق' },
  'hubspot-implementation': { tr: 'HubSpot Kurulumu', de: 'HubSpot-Implementierung', ur: 'ہب سپاٹ امپلیمینٹیشن', ar: 'تنفيذ HubSpot' },
  'salesforce-marketing-cloud': { tr: 'Salesforce Marketing Cloud', de: 'Salesforce Marketing Cloud', ur: 'سیلز فورس مارکیٹنگ کلاؤڈ', ar: 'Salesforce Marketing Cloud' },
  'custom-marketing-automation': { tr: 'Özel Pazarlama Otomasyonu', de: 'Individuelle Marketing-Automatisierung', ur: 'کسٹم مارکیٹنگ آٹومیشن', ar: 'أتمتة تسويق مخصصة' },
  'marketplace-ads': { tr: 'Pazar Yeri Reklamları', de: 'Marktplatz-Anzeigen', ur: 'مارکیٹ پلیس ایڈز', ar: 'إعلانات السوق' },
  'amazon-ppc': { tr: 'Amazon PPC', de: 'Amazon PPC', ur: 'ایمیزون پی پی سی', ar: 'Amazon PPC' },
  'trendyol-ads': { tr: 'Trendyol Reklamları', de: 'Trendyol-Anzeigen', ur: 'ٹرینڈیول ایڈز', ar: 'إعلانات Trendyol' },
  'app-store-optimization': { tr: 'App Store Optimizasyonu', de: 'App Store Optimierung', ur: 'ایپ سٹور آپٹیمائزیشن', ar: 'تحسين متجر التطبيقات' },

  // Design
  'ui-ux-design': { tr: 'UI/UX Tasarım', de: 'UI/UX Design', ur: 'یو آئی/یو ایکس ڈیزائن', ar: 'تصميم واجهة وتجربة المستخدم' },
  'ui-design': { tr: 'UI Tasarım', de: 'UI-Design', ur: 'یو آئی ڈیزائن', ar: 'تصميم واجهة المستخدم' },
  'ux-research': { tr: 'UX Araştırma', de: 'UX-Research', ur: 'یو ایکس ریسرچ', ar: 'أبحاث تجربة المستخدم' },
  'prototyping-wireframing': { tr: 'Prototip ve Wireframe', de: 'Prototyping & Wireframing', ur: 'پروٹو ٹائپنگ اینڈ وائرفریمنگ', ar: 'النماذج الأولية والإطارات السلكية' },
  'design-systems': { tr: 'Tasarım Sistemleri', de: 'Design-Systeme', ur: 'ڈیزائن سسٹمز', ar: 'أنظمة التصميم' },
  'mobile-app-design': { tr: 'Mobil Uygulama Tasarımı', de: 'Mobile App Design', ur: 'موبائل ایپ ڈیزائن', ar: 'تصميم تطبيقات الموبايل' },
  'graphic-design': { tr: 'Grafik Tasarım', de: 'Grafikdesign', ur: 'گرافک ڈیزائن', ar: 'التصميم الجرافيكي' },
  'logo-brand-identity': { tr: 'Logo ve Marka Kimliği', de: 'Logo & Markenidentität', ur: 'لوگو اینڈ برینڈ آئیڈینٹٹی', ar: 'الشعار وهوية العلامة التجارية' },
  'print-packaging-design': { tr: 'Baskı ve Ambalaj Tasarımı', de: 'Druck- & Verpackungsdesign', ur: 'پرنٹ اینڈ پیکیجنگ ڈیزائن', ar: 'تصميم الطباعة والتغليف' },
  'social-media-graphics': { tr: 'Sosyal Medya Grafikleri', de: 'Social Media Grafiken', ur: 'سوشل میڈیا گرافکس', ar: 'رسومات وسائل التواصل الاجتماعي' },
  'presentation-design': { tr: 'Sunum Tasarımı', de: 'Präsentationsdesign', ur: 'پریزنٹیشن ڈیزائن', ar: 'تصميم العروض التقديمية' },
  'motion-graphics': { tr: 'Hareketli Grafikler', de: 'Motion Graphics', ur: 'موشن گرافکس', ar: 'الرسوم المتحركة' },
  'explainer-videos': { tr: 'Açıklayıcı Videolar', de: 'Erklärvideos', ur: 'ایکسپلینر ویڈیوز', ar: 'فيديوهات توضيحية' },
  'social-animations': { tr: 'Sosyal Animasyonlar', de: 'Social Animationen', ur: 'سوشل اینیمیشنز', ar: 'رسوم متحركة للتواصل الاجتماعي' },
  'product-animations': { tr: 'Ürün Animasyonları', de: 'Produktanimationen', ur: 'پروڈکٹ اینیمیشنز', ar: 'رسوم متحركة للمنتجات' },
  'web-design': { tr: 'Web Tasarım', de: 'Webdesign', ur: 'ویب ڈیزائن', ar: 'تصميم الويب' },
  'corporate-website-design': { tr: 'Kurumsal Web Sitesi Tasarımı', de: 'Unternehmenswebsite-Design', ur: 'کارپوریٹ ویب سائٹ ڈیزائن', ar: 'تصميم مواقع الشركات' },
  'landing-page-design': { tr: 'Açılış Sayfası Tasarımı', de: 'Landingpage-Design', ur: 'لینڈنگ پیج ڈیزائن', ar: 'تصميم صفحات الهبوط' },
  'ecommerce-design': { tr: 'E-Ticaret Tasarımı', de: 'E-Commerce Design', ur: 'ای کامرس ڈیزائن', ar: 'تصميم التجارة الإلكترونية' },
  'brand-strategy': { tr: 'Marka Stratejisi', de: 'Markenstrategie', ur: 'برینڈ سٹریٹیجی', ar: 'استراتيجية العلامة التجارية' },
  'brand-positioning': { tr: 'Marka Konumlandırma', de: 'Markenpositionierung', ur: 'برینڈ پوزیشننگ', ar: 'تموضع العلامة التجارية' },
  'brand-guidelines': { tr: 'Marka Kılavuzları', de: 'Markenrichtlinien', ur: 'برینڈ گائیڈ لائنز', ar: 'إرشادات العلامة التجارية' },
  'rebranding': { tr: 'Yeniden Markalama', de: 'Rebranding', ur: 'ری برینڈنگ', ar: 'إعادة بناء العلامة التجارية' },
  '3d-ar-vr': { tr: '3D/AR/VR', de: '3D/AR/VR', ur: '3D/AR/VR', ar: '3D/AR/VR' },
  '3d-product-visualization': { tr: '3D Ürün Görselleştirme', de: '3D-Produktvisualisierung', ur: '3D پروڈکٹ ویژولائزیشن', ar: 'تصور المنتجات ثلاثية الأبعاد' },
  'ar-experiences': { tr: 'AR Deneyimleri', de: 'AR-Erlebnisse', ur: 'اے آر ایکسپیریئنسز', ar: 'تجارب الواقع المعزز' },
  'virtual-tours': { tr: 'Sanal Turlar', de: 'Virtuelle Touren', ur: 'ورچوئل ٹورز', ar: 'جولات افتراضية' },

  // Infrastructure
  'devops-cloud': { tr: 'DevOps ve Bulut', de: 'DevOps & Cloud', ur: 'ڈیوآپس اینڈ کلاؤڈ', ar: 'DevOps والسحابة' },
  'ci-cd-pipelines': { tr: 'CI/CD Boru Hatları', de: 'CI/CD-Pipelines', ur: 'سی آئی/سی ڈی پائپ لائنز', ar: 'خطوط CI/CD' },
  'docker-kubernetes': { tr: 'Docker ve Kubernetes', de: 'Docker & Kubernetes', ur: 'ڈاکر اینڈ کوبرنیٹس', ar: 'Docker و Kubernetes' },
  'cloud-management': { tr: 'Bulut Yönetimi', de: 'Cloud-Management', ur: 'کلاؤڈ مینجمنٹ', ar: 'إدارة السحابة' },
  'infrastructure-as-code': { tr: 'Kod Olarak Altyapı', de: 'Infrastructure as Code', ur: 'انفراسٹرکچر ایز کوڈ', ar: 'البنية التحتية ككود' },
  'cloud-migration': { tr: 'Bulut Göçü', de: 'Cloud-Migration', ur: 'کلاؤڈ مائیگریشن', ar: 'ترحيل السحابة' },
  'aws-migration': { tr: 'AWS Göçü', de: 'AWS-Migration', ur: 'اے ڈبلیو ایس مائیگریشن', ar: 'ترحيل AWS' },
  'azure-migration': { tr: 'Azure Göçü', de: 'Azure-Migration', ur: 'ایزور مائیگریشن', ar: 'ترحيل Azure' },
  'google-cloud-migration': { tr: 'Google Cloud Göçü', de: 'Google Cloud-Migration', ur: 'گوگل کلاؤڈ مائیگریشن', ar: 'ترحيل Google Cloud' },
  'mlops-deployment': { tr: 'MLOps Dağıtım', de: 'MLOps-Bereitstellung', ur: 'ایم ایل اوپس ڈیپلائمنٹ', ar: 'نشر MLOps' },
  'model-deployment': { tr: 'Model Dağıtım', de: 'Modell-Bereitstellung', ur: 'ماڈل ڈیپلائمنٹ', ar: 'نشر النماذج' },
  'model-monitoring': { tr: 'Model İzleme', de: 'Modell-Monitoring', ur: 'ماڈل مانیٹرنگ', ar: 'مراقبة النماذج' },
  'ml-pipelines': { tr: 'ML Boru Hatları', de: 'ML-Pipelines', ur: 'ایم ایل پائپ لائنز', ar: 'خطوط ML' },
  'data-analytics': { tr: 'Veri Analitiği', de: 'Datenanalyse', ur: 'ڈیٹا اینالیٹکس', ar: 'تحليلات البيانات' },
  'business-intelligence': { tr: 'İş Zekası', de: 'Business Intelligence', ur: 'بزنس انٹیلی جنس', ar: 'ذكاء الأعمال' },
  'big-data-etl': { tr: 'Big Data ve ETL', de: 'Big Data & ETL', ur: 'بگ ڈیٹا اینڈ ای ٹی ایل', ar: 'البيانات الضخمة و ETL' },
  'data-visualization': { tr: 'Veri Görselleştirme', de: 'Datenvisualisierung', ur: 'ڈیٹا ویژولائزیشن', ar: 'تصور البيانات' },
  'real-time-analytics': { tr: 'Gerçek Zamanlı Analitik', de: 'Echtzeit-Analytik', ur: 'ریئل ٹائم اینالیٹکس', ar: 'تحليلات الوقت الفعلي' },
  'cybersecurity': { tr: 'Siber Güvenlik', de: 'Cybersicherheit', ur: 'سائبر سیکیورٹی', ar: 'الأمن السيبراني' },
  'penetration-testing': { tr: 'Sızma Testi', de: 'Penetrationstests', ur: 'پینیٹریشن ٹیسٹنگ', ar: 'اختبار الاختراق' },
  'security-audits-compliance': { tr: 'Güvenlik Denetimleri ve Uyumluluk', de: 'Sicherheitsaudits & Compliance', ur: 'سیکیورٹی آڈٹس اینڈ کمپلائنس', ar: 'تدقيق الأمان والامتثال' },
  'gdpr-compliance': { tr: 'GDPR Uyumluluğu', de: 'DSGVO-Konformität', ur: 'جی ڈی پی آر کمپلائنس', ar: 'الامتثال للائحة حماية البيانات' },
  'soc2-compliance': { tr: 'SOC2 Uyumluluğu', de: 'SOC2-Konformität', ur: 'ایس او سی 2 کمپلائنس', ar: 'امتثال SOC2' },
  'database-services': { tr: 'Veritabanı Hizmetleri', de: 'Datenbankdienste', ur: 'ڈیٹا بیس سروسز', ar: 'خدمات قواعد البيانات' },
  'database-design': { tr: 'Veritabanı Tasarımı', de: 'Datenbankdesign', ur: 'ڈیٹا بیس ڈیزائن', ar: 'تصميم قواعد البيانات' },
  'database-optimization': { tr: 'Veritabanı Optimizasyonu', de: 'Datenbankoptimierung', ur: 'ڈیٹا بیس آپٹیمائزیشن', ar: 'تحسين قواعد البيانات' },
  'database-migration': { tr: 'Veritabanı Göçü', de: 'Datenbankmigration', ur: 'ڈیٹا بیس مائیگریشن', ar: 'ترحيل قواعد البيانات' },
  'performance-optimization': { tr: 'Performans Optimizasyonu', de: 'Leistungsoptimierung', ur: 'پرفارمنس آپٹیمائزیشن', ar: 'تحسين الأداء' },
  'website-speed-optimization': { tr: 'Web Sitesi Hız Optimizasyonu', de: 'Website-Geschwindigkeitsoptimierung', ur: 'ویب سائٹ سپیڈ آپٹیمائزیشن', ar: 'تحسين سرعة الموقع' },
  'core-web-vitals': { tr: 'Core Web Vitals', de: 'Core Web Vitals', ur: 'کور ویب وائٹلز', ar: 'مؤشرات الويب الأساسية' },
  'server-optimization': { tr: 'Sunucu Optimizasyonu', de: 'Server-Optimierung', ur: 'سرور آپٹیمائزیشن', ar: 'تحسين الخادم' },
  'managed-services': { tr: 'Yönetilen Hizmetler', de: 'Managed Services', ur: 'مینجڈ سروسز', ar: 'الخدمات المدارة' },
  'continuous-monitoring': { tr: 'Sürekli İzleme', de: 'Kontinuierliches Monitoring', ur: 'کنٹینیوس مانیٹرنگ', ar: 'المراقبة المستمرة' },
  'maintenance-support': { tr: 'Bakım ve Destek', de: 'Wartung & Support', ur: 'مینٹیننس اینڈ سپورٹ', ar: 'الصيانة والدعم' },
  'disaster-recovery': { tr: 'Felaket Kurtarma', de: 'Disaster Recovery', ur: 'ڈیزاسٹر ریکوری', ar: 'التعافي من الكوارث' },

  // Consulting
  'digital-transformation': { tr: 'Dijital Dönüşüm', de: 'Digitale Transformation', ur: 'ڈیجیٹل ٹرانسفارمیشن', ar: 'التحول الرقمي' },
  'digital-strategy': { tr: 'Dijital Strateji', de: 'Digitale Strategie', ur: 'ڈیجیٹل سٹریٹیجی', ar: 'الاستراتيجية الرقمية' },
  'process-digitization': { tr: 'Süreç Dijitalleştirme', de: 'Prozessdigitalisierung', ur: 'پروسیس ڈیجیٹائزیشن', ar: 'رقمنة العمليات' },
  'technology-consulting': { tr: 'Teknoloji Danışmanlığı', de: 'Technologieberatung', ur: 'ٹیکنالوجی کنسلٹنگ', ar: 'استشارات التكنولوجيا' },
  'tech-stack-assessment': { tr: 'Teknoloji Yığını Değerlendirmesi', de: 'Tech-Stack-Bewertung', ur: 'ٹیک اسٹیک اسیسمنٹ', ar: 'تقييم مجموعة التقنيات' },
  'architecture-design': { tr: 'Mimari Tasarım', de: 'Architekturdesign', ur: 'آرکیٹیکچر ڈیزائن', ar: 'تصميم البنية' },
  'ai-strategy': { tr: 'AI Stratejisi', de: 'KI-Strategie', ur: 'اے آئی سٹریٹیجی', ar: 'استراتيجية الذكاء الاصطناعي' },
  'ai-readiness-assessment': { tr: 'AI Hazırlık Değerlendirmesi', de: 'KI-Bereitschaftsbewertung', ur: 'اے آئی ریڈی نیس اسیسمنٹ', ar: 'تقييم الجاهزية للذكاء الاصطناعي' },
  'ai-roi-analysis': { tr: 'AI ROI Analizi', de: 'KI-ROI-Analyse', ur: 'اے آئی آر او آئی اینالیسس', ar: 'تحليل عائد الاستثمار للذكاء الاصطناعي' },
  'growth-strategy': { tr: 'Büyüme Stratejisi', de: 'Wachstumsstrategie', ur: 'گروتھ سٹریٹیجی', ar: 'استراتيجية النمو' },
  'startup-services': { tr: 'Startup Hizmetleri', de: 'Startup-Dienste', ur: 'سٹارٹ اپ سروسز', ar: 'خدمات الشركات الناشئة' },
  'startup-mvp-development': { tr: 'Startup MVP Geliştirme', de: 'Startup MVP-Entwicklung', ur: 'سٹارٹ اپ ایم وی پی ڈویلپمنٹ', ar: 'تطوير MVP للشركات الناشئة' },
  'technical-cto': { tr: 'Teknik CTO', de: 'Technischer CTO', ur: 'ٹیکنیکل سی ٹی او', ar: 'CTO تقني' },
  'staff-augmentation': { tr: 'Personel Takviyesi', de: 'Personalverstärkung', ur: 'سٹاف آگمینٹیشن', ar: 'تعزيز الموظفين' },
  'developer-outsourcing': { tr: 'Geliştirici Dış Kaynak', de: 'Entwickler-Outsourcing', ur: 'ڈویلپر آؤٹ سورسنگ', ar: 'التعهيد الخارجي للمطورين' },
  'dedicated-teams': { tr: 'Özel Takımlar', de: 'Dedizierte Teams', ur: 'ڈیڈیکیٹڈ ٹیمز', ar: 'فرق مخصصة' },

  // Other services
  'testing': { tr: 'Test', de: 'Testen', ur: 'ٹیسٹنگ', ar: 'الاختبار' },
  'digital-marketing': { tr: 'Dijital Pazarlama', de: 'Digitales Marketing', ur: 'ڈیجیٹل مارکیٹنگ', ar: 'التسويق الرقمي' },
  'video-marketing': { tr: 'Video Pazarlama', de: 'Video-Marketing', ur: 'ویڈیو مارکیٹنگ', ar: 'تسويق الفيديو' },
  'something': { tr: 'Diğer Hizmet', de: 'Anderer Dienst', ur: 'دیگر خدمت', ar: 'خدمة أخرى' },
};

// Description translations template
const descriptionTemplates: Record<string, { tr: string; de: string; ur: string; ar: string }> = {
  default: {
    tr: 'Son teknoloji çözümlerle işletmenizi güçlendirin. Uzman ekibimiz, ihtiyaçlarınıza özel yenilikçi sonuçlar sunar.',
    de: 'Stärken Sie Ihr Unternehmen mit modernsten Lösungen. Unser Expertenteam liefert innovative Ergebnisse, die auf Ihre Bedürfnisse zugeschnitten sind.',
    ur: 'جدید ترین حل کے ساتھ اپنے کاروبار کو بااختیار بنائیں۔ ہماری ماہر ٹیم آپ کی ضروریات کے مطابق جدید نتائج فراہم کرتی ہے۔',
    ar: 'قم بتمكين عملك بأحدث الحلول. فريق خبرائنا يقدم نتائج مبتكرة مصممة خصيصًا لاحتياجاتك.'
  }
};

async function translateServices() {
  console.log('🌍 Starting service translations...\n');

  try {
    // Get all services with translations
    const services = await prisma.service.findMany({
      where: { status: { in: ['published', 'active'] } },
      include: { translations: true }
    });

    let updated = 0;
    let skipped = 0;

    for (const service of services) {
      const translations = serviceTranslations[service.slug];

      if (!translations) {
        // Use service name as-is if no translation defined
        skipped++;
        continue;
      }

      for (const t of service.translations) {
        const locale = t.locale as 'tr' | 'de' | 'ur' | 'ar';
        const translatedName = translations[locale];

        if (!translatedName) continue;

        // Only update if currently showing English (placeholder)
        if (t.name === service.name) {
          await prisma.serviceTranslation.update({
            where: { id: t.id },
            data: {
              name: translatedName,
              shortDescription: descriptionTemplates.default[locale],
              metaTitle: `${translatedName} | PakSoft`,
              metaDescription: descriptionTemplates.default[locale]
            }
          });
          updated++;
          console.log(`✅ ${service.slug} [${locale.toUpperCase()}]: ${translatedName}`);
        }
      }
    }

    console.log('\n═══════════════════════════════════════════');
    console.log(`✅ Translation complete!`);
    console.log(`   Updated: ${updated} translations`);
    console.log(`   Skipped: ${skipped} (no translation defined)`);
    console.log('═══════════════════════════════════════════');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

translateServices();
