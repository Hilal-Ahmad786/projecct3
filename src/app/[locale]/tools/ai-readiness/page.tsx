'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import {
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ChartBarIcon,
  ServerStackIcon,
  UserGroupIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  SparklesIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';

// Translations
const translations: Record<string, Record<string, string>> = {
  title: {
    en: 'AI Readiness Assessment',
    tr: 'Yapay Zeka Hazırlık Değerlendirmesi',
    de: 'KI-Bereitschaftsbewertung',
    ur: 'AI تیاری کی تشخیص',
    ar: 'تقييم جاهزية الذكاء الاصطناعي',
  },
  subtitle: {
    en: 'Discover how prepared your organization is to leverage AI technologies',
    tr: 'Kuruluşunuzun yapay zeka teknolojilerinden yararlanmaya ne kadar hazır olduğunu keşfedin',
    de: 'Entdecken Sie, wie gut Ihr Unternehmen auf KI-Technologien vorbereitet ist',
    ur: 'دریافت کریں کہ آپ کی تنظیم AI ٹیکنالوجیز سے فائدہ اٹھانے کے لیے کتنی تیار ہے',
    ar: 'اكتشف مدى استعداد مؤسستك للاستفادة من تقنيات الذكاء الاصطناعي',
  },
  startQuiz: {
    en: 'Start Assessment',
    tr: 'Değerlendirmeyi Başlat',
    de: 'Bewertung starten',
    ur: 'تشخیص شروع کریں',
    ar: 'بدء التقييم',
  },
  next: {
    en: 'Next',
    tr: 'İleri',
    de: 'Weiter',
    ur: 'اگلا',
    ar: 'التالي',
  },
  previous: {
    en: 'Previous',
    tr: 'Önceki',
    de: 'Zurück',
    ur: 'پچھلا',
    ar: 'السابق',
  },
  getResults: {
    en: 'Get My Results',
    tr: 'Sonuçlarımı Al',
    de: 'Meine Ergebnisse abrufen',
    ur: 'میرے نتائج حاصل کریں',
    ar: 'احصل على نتائجي',
  },
  yourScore: {
    en: 'Your AI Readiness Score',
    tr: 'Yapay Zeka Hazırlık Puanınız',
    de: 'Ihr KI-Bereitschaftswert',
    ur: 'آپ کا AI تیاری اسکور',
    ar: 'درجة جاهزيتك للذكاء الاصطناعي',
  },
  downloadReport: {
    en: 'Download Full Report',
    tr: 'Tam Raporu İndir',
    de: 'Vollständigen Bericht herunterladen',
    ur: 'مکمل رپورٹ ڈاؤن لوڈ کریں',
    ar: 'تحميل التقرير الكامل',
  },
  scheduleCall: {
    en: 'Schedule a Consultation',
    tr: 'Danışmanlık Planla',
    de: 'Beratung vereinbaren',
    ur: 'مشاورت کا شیڈول کریں',
    ar: 'حجز استشارة',
  },
  name: {
    en: 'Full Name',
    tr: 'Ad Soyad',
    de: 'Vollständiger Name',
    ur: 'پورا نام',
    ar: 'الاسم الكامل',
  },
  email: {
    en: 'Work Email',
    tr: 'İş E-postası',
    de: 'Geschäftliche E-Mail',
    ur: 'کام کی ای میل',
    ar: 'البريد الإلكتروني للعمل',
  },
  company: {
    en: 'Company Name',
    tr: 'Şirket Adı',
    de: 'Firmenname',
    ur: 'کمپنی کا نام',
    ar: 'اسم الشركة',
  },
  role: {
    en: 'Your Role',
    tr: 'Rolünüz',
    de: 'Ihre Rolle',
    ur: 'آپ کا کردار',
    ar: 'دورك',
  },
  question: {
    en: 'Question',
    tr: 'Soru',
    de: 'Frage',
    ur: 'سوال',
    ar: 'سؤال',
  },
  of: {
    en: 'of',
    tr: '/',
    de: 'von',
    ur: 'میں سے',
    ar: 'من',
  },
  beginner: {
    en: 'AI Beginner',
    tr: 'Yapay Zeka Başlangıç',
    de: 'KI-Anfänger',
    ur: 'AI ابتدائی',
    ar: 'مبتدئ في الذكاء الاصطناعي',
  },
  developing: {
    en: 'Developing',
    tr: 'Gelişmekte',
    de: 'In Entwicklung',
    ur: 'ترقی پذیر',
    ar: 'قيد التطوير',
  },
  ready: {
    en: 'AI Ready',
    tr: 'Yapay Zekaya Hazır',
    de: 'KI-bereit',
    ur: 'AI کے لیے تیار',
    ar: 'جاهز للذكاء الاصطناعي',
  },
  advanced: {
    en: 'AI Advanced',
    tr: 'İleri Düzey',
    de: 'KI-Fortgeschritten',
    ur: 'AI ایڈوانسڈ',
    ar: 'متقدم في الذكاء الاصطناعي',
  },
  leader: {
    en: 'AI Leader',
    tr: 'Yapay Zeka Lideri',
    de: 'KI-Vorreiter',
    ur: 'AI لیڈر',
    ar: 'رائد في الذكاء الاصطناعي',
  },
  minutes: {
    en: '5-7 minutes',
    tr: '5-7 dakika',
    de: '5-7 Minuten',
    ur: '5-7 منٹ',
    ar: '5-7 دقائق',
  },
  questions: {
    en: '20 questions',
    tr: '20 soru',
    de: '20 Fragen',
    ur: '20 سوالات',
    ar: '20 سؤالاً',
  },
  freeReport: {
    en: 'Free personalized report',
    tr: 'Ücretsiz kişiselleştirilmiş rapor',
    de: 'Kostenloser personalisierter Bericht',
    ur: 'مفت ذاتی رپورٹ',
    ar: 'تقرير شخصي مجاني',
  },
};

// Categories for questions
const categories = [
  { id: 'data', name: 'Data Infrastructure', icon: ServerStackIcon, color: 'blue' },
  { id: 'tech', name: 'Technical Readiness', icon: SparklesIcon, color: 'purple' },
  { id: 'team', name: 'Team & Skills', icon: UserGroupIcon, color: 'green' },
  { id: 'strategy', name: 'Business Strategy', icon: LightBulbIcon, color: 'yellow' },
  { id: 'governance', name: 'Governance & Ethics', icon: ShieldCheckIcon, color: 'red' },
];

// Questions
const questions = [
  // Data Infrastructure (4 questions)
  {
    id: 1,
    category: 'data',
    question: {
      en: 'How would you describe your organization\'s data collection practices?',
      tr: 'Kuruluşunuzun veri toplama uygulamalarını nasıl tanımlarsınız?',
      de: 'Wie würden Sie die Datenerfassungspraktiken Ihres Unternehmens beschreiben?',
      ur: 'آپ اپنی تنظیم کے ڈیٹا جمع کرنے کے طریقوں کو کیسے بیان کریں گے؟',
      ar: 'كيف تصف ممارسات جمع البيانات في مؤسستك؟',
    },
    options: [
      { value: 1, label: { en: 'We have minimal data collection', tr: 'Minimum veri toplama', de: 'Minimale Datenerfassung', ur: 'کم سے کم ڈیٹا جمع', ar: 'جمع بيانات محدود' } },
      { value: 2, label: { en: 'Basic data collection, mostly manual', tr: 'Temel veri toplama, çoğunlukla manuel', de: 'Grundlegende, meist manuelle Datenerfassung', ur: 'بنیادی ڈیٹا جمع، زیادہ تر دستی', ar: 'جمع بيانات أساسي، غالبًا يدوي' } },
      { value: 3, label: { en: 'Structured data collection with some automation', tr: 'Bazı otomasyonlarla yapılandırılmış veri toplama', de: 'Strukturierte Datenerfassung mit etwas Automatisierung', ur: 'کچھ آٹومیشن کے ساتھ منظم ڈیٹا جمع', ar: 'جمع بيانات منظم مع بعض الأتمتة' } },
      { value: 4, label: { en: 'Comprehensive automated data collection', tr: 'Kapsamlı otomatik veri toplama', de: 'Umfassende automatisierte Datenerfassung', ur: 'جامع خودکار ڈیٹا جمع', ar: 'جمع بيانات آلي شامل' } },
      { value: 5, label: { en: 'Advanced data pipelines with real-time processing', tr: 'Gerçek zamanlı işleme ile gelişmiş veri hatları', de: 'Fortschrittliche Datenpipelines mit Echtzeitverarbeitung', ur: 'ریئل ٹائم پروسیسنگ کے ساتھ ایڈوانسڈ ڈیٹا پائپ لائنز', ar: 'خطوط بيانات متقدمة مع معالجة فورية' } },
    ],
  },
  {
    id: 2,
    category: 'data',
    question: {
      en: 'How is your data quality and consistency?',
      tr: 'Veri kalitesi ve tutarlılığınız nasıl?',
      de: 'Wie ist Ihre Datenqualität und -konsistenz?',
      ur: 'آپ کے ڈیٹا کا معیار اور مستقل مزاجی کیسی ہے؟',
      ar: 'ما مستوى جودة واتساق بياناتك؟',
    },
    options: [
      { value: 1, label: { en: 'Poor - inconsistent and incomplete', tr: 'Zayıf - tutarsız ve eksik', de: 'Schlecht - inkonsistent und unvollständig', ur: 'خراب - متضاد اور نامکمل', ar: 'ضعيف - غير متسق وناقص' } },
      { value: 2, label: { en: 'Fair - some issues but manageable', tr: 'Orta - bazı sorunlar ama yönetilebilir', de: 'Mäßig - einige Probleme, aber handhabbar', ur: 'ٹھیک - کچھ مسائل لیکن قابل انتظام', ar: 'مقبول - بعض المشاكل لكن يمكن إدارتها' } },
      { value: 3, label: { en: 'Good - standardized with occasional gaps', tr: 'İyi - nadiren boşluklarla standardize', de: 'Gut - standardisiert mit gelegentlichen Lücken', ur: 'اچھا - معیاری کبھی کبھی خلا کے ساتھ', ar: 'جيد - موحد مع بعض الثغرات' } },
      { value: 4, label: { en: 'Very good - high quality with validation', tr: 'Çok iyi - doğrulama ile yüksek kalite', de: 'Sehr gut - hohe Qualität mit Validierung', ur: 'بہت اچھا - توثیق کے ساتھ اعلیٰ معیار', ar: 'جيد جدًا - جودة عالية مع التحقق' } },
      { value: 5, label: { en: 'Excellent - rigorous quality controls', tr: 'Mükemmel - sıkı kalite kontrolleri', de: 'Ausgezeichnet - strenge Qualitätskontrollen', ur: 'بہترین - سخت معیاری کنٹرول', ar: 'ممتاز - ضوابط جودة صارمة' } },
    ],
  },
  {
    id: 3,
    category: 'data',
    question: {
      en: 'How accessible is your data across the organization?',
      tr: 'Verileriniz kuruluş genelinde ne kadar erişilebilir?',
      de: 'Wie zugänglich sind Ihre Daten im gesamten Unternehmen?',
      ur: 'آپ کا ڈیٹا پوری تنظیم میں کتنا قابل رسائی ہے؟',
      ar: 'ما مدى إمكانية الوصول إلى بياناتك في جميع أنحاء المؤسسة؟',
    },
    options: [
      { value: 1, label: { en: 'Siloed - data trapped in departments', tr: 'Silo - departmanlarda sıkışmış veri', de: 'Isoliert - Daten in Abteilungen gefangen', ur: 'الگ تھلگ - ڈیٹا محکموں میں پھنسا ہوا', ar: 'معزولة - البيانات محصورة في الأقسام' } },
      { value: 2, label: { en: 'Limited - some sharing but difficult', tr: 'Sınırlı - bazı paylaşımlar ama zor', de: 'Begrenzt - etwas Austausch, aber schwierig', ur: 'محدود - کچھ شیئرنگ لیکن مشکل', ar: 'محدود - بعض المشاركة لكنها صعبة' } },
      { value: 3, label: { en: 'Moderate - centralized repositories exist', tr: 'Orta - merkezi depolar mevcut', de: 'Mäßig - zentrale Repositories vorhanden', ur: 'اعتدال پسند - مرکزی ذخیرے موجود ہیں', ar: 'معتدل - توجد مستودعات مركزية' } },
      { value: 4, label: { en: 'Good - data warehouse with self-service', tr: 'İyi - self servis ile veri ambarı', de: 'Gut - Data Warehouse mit Self-Service', ur: 'اچھا - سیلف سروس کے ساتھ ڈیٹا ویئر ہاؤس', ar: 'جيد - مستودع بيانات مع خدمة ذاتية' } },
      { value: 5, label: { en: 'Excellent - unified data platform', tr: 'Mükemmel - birleşik veri platformu', de: 'Ausgezeichnet - einheitliche Datenplattform', ur: 'بہترین - متحد ڈیٹا پلیٹ فارم', ar: 'ممتاز - منصة بيانات موحدة' } },
    ],
  },
  {
    id: 4,
    category: 'data',
    question: {
      en: 'Do you have labeled/annotated data for ML training?',
      tr: 'ML eğitimi için etiketli/açıklamalı verileriniz var mı?',
      de: 'Haben Sie beschriftete/annotierte Daten für ML-Training?',
      ur: 'کیا آپ کے پاس ML ٹریننگ کے لیے لیبل شدہ ڈیٹا ہے؟',
      ar: 'هل لديك بيانات مصنفة/موسومة لتدريب التعلم الآلي؟',
    },
    options: [
      { value: 1, label: { en: 'No labeled data available', tr: 'Etiketli veri yok', de: 'Keine beschrifteten Daten verfügbar', ur: 'کوئی لیبل شدہ ڈیٹا دستیاب نہیں', ar: 'لا توجد بيانات مصنفة' } },
      { value: 2, label: { en: 'Some manually labeled samples', tr: 'Bazı manuel etiketli örnekler', de: 'Einige manuell beschriftete Proben', ur: 'کچھ دستی طور پر لیبل شدہ نمونے', ar: 'بعض العينات المصنفة يدويًا' } },
      { value: 3, label: { en: 'Growing labeled datasets', tr: 'Büyüyen etiketli veri setleri', de: 'Wachsende beschriftete Datensätze', ur: 'بڑھتے ہوئے لیبل شدہ ڈیٹاسیٹس', ar: 'مجموعات بيانات مصنفة متنامية' } },
      { value: 4, label: { en: 'Extensive labeled data with processes', tr: 'Süreçlerle kapsamlı etiketli veri', de: 'Umfangreiche beschriftete Daten mit Prozessen', ur: 'عمل کے ساتھ وسیع لیبل شدہ ڈیٹا', ar: 'بيانات مصنفة واسعة مع عمليات' } },
      { value: 5, label: { en: 'Automated labeling pipelines', tr: 'Otomatik etiketleme hatları', de: 'Automatisierte Beschriftungspipelines', ur: 'خودکار لیبلنگ پائپ لائنز', ar: 'خطوط تصنيف آلية' } },
    ],
  },
  // Technical Readiness (4 questions)
  {
    id: 5,
    category: 'tech',
    question: {
      en: 'What is your current cloud infrastructure status?',
      tr: 'Mevcut bulut altyapı durumunuz nedir?',
      de: 'Wie ist der aktuelle Status Ihrer Cloud-Infrastruktur?',
      ur: 'آپ کے موجودہ کلاؤڈ انفراسٹرکچر کی حیثیت کیا ہے؟',
      ar: 'ما هو وضع البنية التحتية السحابية الحالية لديك؟',
    },
    options: [
      { value: 1, label: { en: 'On-premise only', tr: 'Sadece yerinde', de: 'Nur On-Premise', ur: 'صرف آن پریمائز', ar: 'محلي فقط' } },
      { value: 2, label: { en: 'Basic cloud usage (storage, email)', tr: 'Temel bulut kullanımı (depolama, e-posta)', de: 'Grundlegende Cloud-Nutzung (Speicher, E-Mail)', ur: 'بنیادی کلاؤڈ استعمال (سٹوریج، ای میل)', ar: 'استخدام سحابي أساسي (تخزين، بريد)' } },
      { value: 3, label: { en: 'Hybrid cloud environment', tr: 'Hibrit bulut ortamı', de: 'Hybride Cloud-Umgebung', ur: 'ہائبرڈ کلاؤڈ ماحول', ar: 'بيئة سحابية هجينة' } },
      { value: 4, label: { en: 'Cloud-first with ML services', tr: 'ML servisleri ile bulut öncelikli', de: 'Cloud-First mit ML-Services', ur: 'ML سروسز کے ساتھ کلاؤڈ فرسٹ', ar: 'أولوية السحابة مع خدمات التعلم الآلي' } },
      { value: 5, label: { en: 'Full cloud-native AI/ML platform', tr: 'Tam bulut-yerel AI/ML platformu', de: 'Vollständige Cloud-native KI/ML-Plattform', ur: 'مکمل کلاؤڈ نیٹو AI/ML پلیٹ فارم', ar: 'منصة AI/ML سحابية أصلية كاملة' } },
    ],
  },
  {
    id: 6,
    category: 'tech',
    question: {
      en: 'How mature is your API infrastructure?',
      tr: 'API altyapınız ne kadar olgun?',
      de: 'Wie ausgereift ist Ihre API-Infrastruktur?',
      ur: 'آپ کا API انفراسٹرکچر کتنا بالغ ہے؟',
      ar: 'ما مدى نضج بنيتك التحتية لواجهات البرمجة؟',
    },
    options: [
      { value: 1, label: { en: 'No APIs - monolithic systems', tr: 'API yok - monolitik sistemler', de: 'Keine APIs - monolithische Systeme', ur: 'کوئی APIs نہیں - یکپارچہ سسٹم', ar: 'لا توجد واجهات برمجة - أنظمة متجانسة' } },
      { value: 2, label: { en: 'Some internal APIs', tr: 'Bazı dahili API\'ler', de: 'Einige interne APIs', ur: 'کچھ اندرونی APIs', ar: 'بعض واجهات البرمجة الداخلية' } },
      { value: 3, label: { en: 'RESTful APIs with documentation', tr: 'Dokümantasyonlu RESTful API\'ler', de: 'RESTful APIs mit Dokumentation', ur: 'دستاویزات کے ساتھ RESTful APIs', ar: 'واجهات برمجة REST مع توثيق' } },
      { value: 4, label: { en: 'API gateway with versioning', tr: 'Sürümleme ile API gateway', de: 'API-Gateway mit Versionierung', ur: 'ورژننگ کے ساتھ API گیٹ وے', ar: 'بوابة واجهات برمجة مع إصدارات' } },
      { value: 5, label: { en: 'Microservices with AI endpoints', tr: 'AI uç noktaları ile mikro servisler', de: 'Microservices mit KI-Endpunkten', ur: 'AI اینڈ پوائنٹس کے ساتھ مائیکرو سروسز', ar: 'خدمات مصغرة مع نقاط نهاية AI' } },
    ],
  },
  {
    id: 7,
    category: 'tech',
    question: {
      en: 'What ML/AI tools or platforms do you currently use?',
      tr: 'Şu anda hangi ML/AI araçlarını veya platformlarını kullanıyorsunuz?',
      de: 'Welche ML/KI-Tools oder Plattformen nutzen Sie derzeit?',
      ur: 'آپ فی الحال کون سے ML/AI ٹولز یا پلیٹ فارم استعمال کرتے ہیں؟',
      ar: 'ما أدوات أو منصات التعلم الآلي/الذكاء الاصطناعي التي تستخدمها حاليًا؟',
    },
    options: [
      { value: 1, label: { en: 'None', tr: 'Hiçbiri', de: 'Keine', ur: 'کوئی نہیں', ar: 'لا شيء' } },
      { value: 2, label: { en: 'Basic analytics tools (Excel, BI)', tr: 'Temel analitik araçları (Excel, BI)', de: 'Grundlegende Analysetools (Excel, BI)', ur: 'بنیادی اینالیٹکس ٹولز (Excel, BI)', ar: 'أدوات تحليلية أساسية (Excel، BI)' } },
      { value: 3, label: { en: 'Python/R with ML libraries', tr: 'ML kütüphaneleri ile Python/R', de: 'Python/R mit ML-Bibliotheken', ur: 'ML لائبریریوں کے ساتھ Python/R', ar: 'Python/R مع مكتبات التعلم الآلي' } },
      { value: 4, label: { en: 'Cloud ML services (SageMaker, Vertex)', tr: 'Bulut ML servisleri (SageMaker, Vertex)', de: 'Cloud ML-Services (SageMaker, Vertex)', ur: 'کلاؤڈ ML سروسز (SageMaker, Vertex)', ar: 'خدمات التعلم الآلي السحابية (SageMaker، Vertex)' } },
      { value: 5, label: { en: 'Full MLOps platform with deployment', tr: 'Dağıtım ile tam MLOps platformu', de: 'Vollständige MLOps-Plattform mit Deployment', ur: 'تعیناتی کے ساتھ مکمل MLOps پلیٹ فارم', ar: 'منصة MLOps كاملة مع النشر' } },
    ],
  },
  {
    id: 8,
    category: 'tech',
    question: {
      en: 'How do you handle computing resources for intensive tasks?',
      tr: 'Yoğun görevler için bilgi işlem kaynaklarını nasıl yönetiyorsunuz?',
      de: 'Wie handhaben Sie Rechenressourcen für intensive Aufgaben?',
      ur: 'آپ شدید کاموں کے لیے کمپیوٹنگ ریسورسز کو کیسے ہینڈل کرتے ہیں؟',
      ar: 'كيف تتعامل مع موارد الحوسبة للمهام المكثفة؟',
    },
    options: [
      { value: 1, label: { en: 'Limited to desktop computers', tr: 'Masaüstü bilgisayarlarla sınırlı', de: 'Beschränkt auf Desktop-Computer', ur: 'ڈیسک ٹاپ کمپیوٹرز تک محدود', ar: 'مقتصر على أجهزة الكمبيوتر المكتبية' } },
      { value: 2, label: { en: 'On-premise servers', tr: 'Yerinde sunucular', de: 'On-Premise-Server', ur: 'آن پریمائز سرورز', ar: 'خوادم محلية' } },
      { value: 3, label: { en: 'Cloud VMs on demand', tr: 'Talep üzerine bulut VM\'ler', de: 'Cloud VMs auf Abruf', ur: 'مطلب پر کلاؤڈ VMs', ar: 'أجهزة افتراضية سحابية عند الطلب' } },
      { value: 4, label: { en: 'GPU clusters available', tr: 'GPU kümeleri mevcut', de: 'GPU-Cluster verfügbar', ur: 'GPU کلسٹرز دستیاب', ar: 'مجموعات GPU متاحة' } },
      { value: 5, label: { en: 'Auto-scaling AI compute infrastructure', tr: 'Otomatik ölçeklenen AI bilgi işlem altyapısı', de: 'Auto-skalierende KI-Compute-Infrastruktur', ur: 'آٹو اسکیلنگ AI کمپیوٹ انفراسٹرکچر', ar: 'بنية حوسبة AI ذاتية التوسع' } },
    ],
  },
  // Team & Skills (4 questions)
  {
    id: 9,
    category: 'team',
    question: {
      en: 'Do you have data science or ML expertise in-house?',
      tr: 'Şirket içinde veri bilimi veya ML uzmanlığınız var mı?',
      de: 'Haben Sie Data Science- oder ML-Expertise im Haus?',
      ur: 'کیا آپ کے پاس اندرون خانہ ڈیٹا سائنس یا ML مہارت ہے؟',
      ar: 'هل لديك خبرة في علوم البيانات أو التعلم الآلي داخليًا؟',
    },
    options: [
      { value: 1, label: { en: 'No dedicated data/ML staff', tr: 'Özel veri/ML personeli yok', de: 'Kein dediziertes Daten-/ML-Personal', ur: 'کوئی مخصوص ڈیٹا/ML عملہ نہیں', ar: 'لا يوجد موظفون مخصصون للبيانات/التعلم الآلي' } },
      { value: 2, label: { en: 'IT staff with some data skills', tr: 'Bazı veri becerileri olan IT personeli', de: 'IT-Mitarbeiter mit einigen Datenkenntnissen', ur: 'کچھ ڈیٹا مہارتوں والا IT عملہ', ar: 'موظفو IT مع بعض مهارات البيانات' } },
      { value: 3, label: { en: '1-2 data analysts/scientists', tr: '1-2 veri analisti/bilim insanı', de: '1-2 Datenanalysten/Wissenschaftler', ur: '1-2 ڈیٹا تجزیہ کار/سائنسدان', ar: '1-2 محللي/علماء بيانات' } },
      { value: 4, label: { en: 'Dedicated data science team', tr: 'Özel veri bilimi ekibi', de: 'Dediziertes Data-Science-Team', ur: 'مخصوص ڈیٹا سائنس ٹیم', ar: 'فريق علوم بيانات مخصص' } },
      { value: 5, label: { en: 'Full AI/ML engineering organization', tr: 'Tam AI/ML mühendislik organizasyonu', de: 'Vollständige KI/ML-Engineering-Organisation', ur: 'مکمل AI/ML انجینئرنگ تنظیم', ar: 'منظمة هندسة AI/ML كاملة' } },
    ],
  },
  {
    id: 10,
    category: 'team',
    question: {
      en: 'How is AI/ML literacy across your organization?',
      tr: 'Kuruluşunuzda AI/ML okuryazarlığı nasıl?',
      de: 'Wie ist die KI/ML-Kompetenz in Ihrem Unternehmen?',
      ur: 'آپ کی تنظیم میں AI/ML خواندگی کیسی ہے؟',
      ar: 'ما مستوى الإلمام بالذكاء الاصطناعي/التعلم الآلي في مؤسستك؟',
    },
    options: [
      { value: 1, label: { en: 'Very limited understanding', tr: 'Çok sınırlı anlayış', de: 'Sehr begrenztes Verständnis', ur: 'بہت محدود سمجھ', ar: 'فهم محدود جدًا' } },
      { value: 2, label: { en: 'Basic awareness of AI concepts', tr: 'AI kavramlarının temel farkındalığı', de: 'Grundlegendes Bewusstsein für KI-Konzepte', ur: 'AI تصورات کی بنیادی آگاہی', ar: 'وعي أساسي بمفاهيم الذكاء الاصطناعي' } },
      { value: 3, label: { en: 'Growing interest and training', tr: 'Artan ilgi ve eğitim', de: 'Wachsendes Interesse und Schulungen', ur: 'بڑھتی ہوئی دلچسپی اور تربیت', ar: 'اهتمام وتدريب متزايد' } },
      { value: 4, label: { en: 'Regular AI training programs', tr: 'Düzenli AI eğitim programları', de: 'Regelmäßige KI-Schulungsprogramme', ur: 'باقاعدہ AI تربیتی پروگرام', ar: 'برامج تدريب منتظمة على الذكاء الاصطناعي' } },
      { value: 5, label: { en: 'AI-first culture organization-wide', tr: 'Organizasyon genelinde AI-öncelikli kültür', de: 'KI-First-Kultur im gesamten Unternehmen', ur: 'تنظیم بھر میں AI فرسٹ کلچر', ar: 'ثقافة أولوية الذكاء الاصطناعي على مستوى المؤسسة' } },
    ],
  },
  {
    id: 11,
    category: 'team',
    question: {
      en: 'Do you have experience working with external AI partners?',
      tr: 'Harici AI ortaklarıyla çalışma deneyiminiz var mı?',
      de: 'Haben Sie Erfahrung mit externen KI-Partnern?',
      ur: 'کیا آپ کو بیرونی AI شراکت داروں کے ساتھ کام کرنے کا تجربہ ہے؟',
      ar: 'هل لديك خبرة في العمل مع شركاء خارجيين في الذكاء الاصطناعي؟',
    },
    options: [
      { value: 1, label: { en: 'No experience with AI vendors', tr: 'AI satıcıları ile deneyim yok', de: 'Keine Erfahrung mit KI-Anbietern', ur: 'AI وینڈرز کے ساتھ کوئی تجربہ نہیں', ar: 'لا خبرة مع موردي الذكاء الاصطناعي' } },
      { value: 2, label: { en: 'Explored some AI tools/services', tr: 'Bazı AI araçlarını/servislerini keşfettik', de: 'Einige KI-Tools/Services erkundet', ur: 'کچھ AI ٹولز/سروسز کی کھوج کی', ar: 'استكشاف بعض أدوات/خدمات الذكاء الاصطناعي' } },
      { value: 3, label: { en: 'Completed a pilot AI project', tr: 'Bir pilot AI projesi tamamladık', de: 'Pilot-KI-Projekt abgeschlossen', ur: 'ایک پائلٹ AI پروجیکٹ مکمل کیا', ar: 'أكملنا مشروع AI تجريبي' } },
      { value: 4, label: { en: 'Ongoing partnerships with AI vendors', tr: 'AI satıcılarıyla devam eden ortaklıklar', de: 'Laufende Partnerschaften mit KI-Anbietern', ur: 'AI وینڈرز کے ساتھ جاری شراکت داری', ar: 'شراكات مستمرة مع موردي الذكاء الاصطناعي' } },
      { value: 5, label: { en: 'Strategic AI partnership ecosystem', tr: 'Stratejik AI ortaklık ekosistemi', de: 'Strategisches KI-Partnerschaftsökosystem', ur: 'اسٹریٹجک AI پارٹنرشپ ایکو سسٹم', ar: 'منظومة شراكات استراتيجية في الذكاء الاصطناعي' } },
    ],
  },
  {
    id: 12,
    category: 'team',
    question: {
      en: 'How do you approach continuous learning in tech?',
      tr: 'Teknolojide sürekli öğrenmeye nasıl yaklaşıyorsunuz?',
      de: 'Wie gehen Sie an kontinuierliches Lernen in der Tech-Branche heran?',
      ur: 'آپ ٹیک میں مسلسل سیکھنے کو کیسے دیکھتے ہیں؟',
      ar: 'كيف تتعامل مع التعلم المستمر في التكنولوجيا؟',
    },
    options: [
      { value: 1, label: { en: 'No formal learning programs', tr: 'Resmi öğrenme programı yok', de: 'Keine formalen Lernprogramme', ur: 'کوئی رسمی سیکھنے کے پروگرام نہیں', ar: 'لا توجد برامج تعلم رسمية' } },
      { value: 2, label: { en: 'Occasional training when needed', tr: 'Gerektiğinde ara sıra eğitim', de: 'Gelegentliche Schulungen bei Bedarf', ur: 'ضرورت پڑنے پر کبھی کبھار تربیت', ar: 'تدريب عرضي عند الحاجة' } },
      { value: 3, label: { en: 'Annual training budget allocated', tr: 'Yıllık eğitim bütçesi ayrıldı', de: 'Jährliches Schulungsbudget zugewiesen', ur: 'سالانہ تربیتی بجٹ مختص', ar: 'ميزانية تدريب سنوية مخصصة' } },
      { value: 4, label: { en: 'Structured upskilling programs', tr: 'Yapılandırılmış beceri geliştirme programları', de: 'Strukturierte Weiterbildungsprogramme', ur: 'منظم مہارت کے پروگرام', ar: 'برامج تطوير مهارات منظمة' } },
      { value: 5, label: { en: 'Learning culture with certifications', tr: 'Sertifikalarla öğrenme kültürü', de: 'Lernkultur mit Zertifizierungen', ur: 'سرٹیفیکیشنز کے ساتھ سیکھنے کا کلچر', ar: 'ثقافة تعلم مع شهادات' } },
    ],
  },
  // Business Strategy (4 questions)
  {
    id: 13,
    category: 'strategy',
    question: {
      en: 'Have you identified specific AI use cases for your business?',
      tr: 'İşletmeniz için belirli AI kullanım durumları belirlediniz mi?',
      de: 'Haben Sie spezifische KI-Anwendungsfälle für Ihr Unternehmen identifiziert?',
      ur: 'کیا آپ نے اپنے کاروبار کے لیے مخصوص AI استعمال کے معاملات کی نشاندہی کی ہے؟',
      ar: 'هل حددت حالات استخدام محددة للذكاء الاصطناعي في عملك؟',
    },
    options: [
      { value: 1, label: { en: 'No specific use cases identified', tr: 'Belirli kullanım durumu belirlenmedi', de: 'Keine spezifischen Anwendungsfälle identifiziert', ur: 'کوئی مخصوص استعمال کے کیسز کی نشاندہی نہیں', ar: 'لم يتم تحديد حالات استخدام محددة' } },
      { value: 2, label: { en: 'General ideas but not prioritized', tr: 'Genel fikirler ama önceliklendirilmemiş', de: 'Allgemeine Ideen, aber nicht priorisiert', ur: 'عمومی خیالات لیکن ترجیح نہیں دی گئی', ar: 'أفكار عامة لكن غير مرتبة حسب الأولوية' } },
      { value: 3, label: { en: 'A few prioritized use cases', tr: 'Birkaç öncelikli kullanım durumu', de: 'Einige priorisierte Anwendungsfälle', ur: 'چند ترجیحی استعمال کے کیسز', ar: 'بعض حالات الاستخدام ذات الأولوية' } },
      { value: 4, label: { en: 'Roadmap of AI initiatives', tr: 'AI girişimleri yol haritası', de: 'Roadmap für KI-Initiativen', ur: 'AI اقدامات کا روڈ میپ', ar: 'خارطة طريق لمبادرات الذكاء الاصطناعي' } },
      { value: 5, label: { en: 'Comprehensive AI strategy', tr: 'Kapsamlı AI stratejisi', de: 'Umfassende KI-Strategie', ur: 'جامع AI حکمت عملی', ar: 'استراتيجية شاملة للذكاء الاصطناعي' } },
    ],
  },
  {
    id: 14,
    category: 'strategy',
    question: {
      en: 'Is there executive sponsorship for AI initiatives?',
      tr: 'AI girişimleri için yönetici sponsorluğu var mı?',
      de: 'Gibt es Executive Sponsorship für KI-Initiativen?',
      ur: 'کیا AI اقدامات کے لیے ایگزیکٹو سرپرستی ہے؟',
      ar: 'هل هناك رعاية تنفيذية لمبادرات الذكاء الاصطناعي؟',
    },
    options: [
      { value: 1, label: { en: 'No executive interest', tr: 'Yönetici ilgisi yok', de: 'Kein Interesse der Führungsebene', ur: 'ایگزیکٹو دلچسپی نہیں', ar: 'لا اهتمام تنفيذي' } },
      { value: 2, label: { en: 'Casual interest from leadership', tr: 'Liderlikten gündelik ilgi', de: 'Gelegentliches Interesse der Führung', ur: 'قیادت کی طرف سے عارضی دلچسپی', ar: 'اهتمام عرضي من القيادة' } },
      { value: 3, label: { en: 'One executive champion', tr: 'Bir yönetici şampiyonu', de: 'Ein Executive Champion', ur: 'ایک ایگزیکٹو چیمپیئن', ar: 'مسؤول تنفيذي واحد داعم' } },
      { value: 4, label: { en: 'C-suite actively supports AI', tr: 'C-düzeyi aktif olarak AI\'ı destekliyor', de: 'C-Suite unterstützt KI aktiv', ur: 'C-سویٹ فعال طور پر AI کی حمایت کرتا ہے', ar: 'الإدارة العليا تدعم الذكاء الاصطناعي بنشاط' } },
      { value: 5, label: { en: 'AI is a board-level priority', tr: 'AI yönetim kurulu düzeyinde öncelik', de: 'KI ist Priorität auf Vorstandsebene', ur: 'AI بورڈ سطح کی ترجیح ہے', ar: 'الذكاء الاصطناعي أولوية على مستوى مجلس الإدارة' } },
    ],
  },
  {
    id: 15,
    category: 'strategy',
    question: {
      en: 'Do you have budget allocated for AI/ML projects?',
      tr: 'AI/ML projeleri için ayrılmış bütçeniz var mı?',
      de: 'Haben Sie Budget für KI/ML-Projekte eingeplant?',
      ur: 'کیا آپ کے پاس AI/ML پروجیکٹس کے لیے مختص بجٹ ہے؟',
      ar: 'هل لديك ميزانية مخصصة لمشاريع الذكاء الاصطناعي/التعلم الآلي؟',
    },
    options: [
      { value: 1, label: { en: 'No dedicated AI budget', tr: 'Özel AI bütçesi yok', de: 'Kein dediziertes KI-Budget', ur: 'کوئی مخصوص AI بجٹ نہیں', ar: 'لا ميزانية مخصصة للذكاء الاصطناعي' } },
      { value: 2, label: { en: 'Ad-hoc funding for experiments', tr: 'Deneyler için geçici finansman', de: 'Ad-hoc-Finanzierung für Experimente', ur: 'تجربات کے لیے عارضی فنڈنگ', ar: 'تمويل مخصص للتجارب' } },
      { value: 3, label: { en: 'Small pilot project budget', tr: 'Küçük pilot proje bütçesi', de: 'Kleines Pilotprojekt-Budget', ur: 'چھوٹے پائلٹ پروجیکٹ بجٹ', ar: 'ميزانية صغيرة للمشاريع التجريبية' } },
      { value: 4, label: { en: 'Dedicated annual AI budget', tr: 'Özel yıllık AI bütçesi', de: 'Dediziertes jährliches KI-Budget', ur: 'سالانہ مخصوص AI بجٹ', ar: 'ميزانية سنوية مخصصة للذكاء الاصطناعي' } },
      { value: 5, label: { en: 'Significant multi-year AI investment', tr: 'Önemli çok yıllı AI yatırımı', de: 'Bedeutende mehrjährige KI-Investition', ur: 'اہم کثیر سالہ AI سرمایہ کاری', ar: 'استثمار كبير متعدد السنوات في الذكاء الاصطناعي' } },
    ],
  },
  {
    id: 16,
    category: 'strategy',
    question: {
      en: 'How do you measure ROI on technology investments?',
      tr: 'Teknoloji yatırımlarının ROI\'sini nasıl ölçüyorsunuz?',
      de: 'Wie messen Sie den ROI von Technologieinvestitionen?',
      ur: 'آپ ٹیکنالوجی سرمایہ کاری پر ROI کیسے ناپتے ہیں؟',
      ar: 'كيف تقيس العائد على الاستثمار في التكنولوجيا؟',
    },
    options: [
      { value: 1, label: { en: 'No formal ROI measurement', tr: 'Resmi ROI ölçümü yok', de: 'Keine formale ROI-Messung', ur: 'کوئی رسمی ROI پیمائش نہیں', ar: 'لا قياس رسمي للعائد على الاستثمار' } },
      { value: 2, label: { en: 'Basic cost tracking', tr: 'Temel maliyet takibi', de: 'Grundlegende Kostenverfolgung', ur: 'بنیادی لاگت ٹریکنگ', ar: 'تتبع التكاليف الأساسي' } },
      { value: 3, label: { en: 'KPIs for major initiatives', tr: 'Büyük girişimler için KPI\'ler', de: 'KPIs für größere Initiativen', ur: 'بڑے اقدامات کے لیے KPIs', ar: 'مؤشرات أداء للمبادرات الرئيسية' } },
      { value: 4, label: { en: 'Comprehensive value tracking', tr: 'Kapsamlı değer takibi', de: 'Umfassende Wertverfolgung', ur: 'جامع قدر ٹریکنگ', ar: 'تتبع شامل للقيمة' } },
      { value: 5, label: { en: 'Real-time business impact dashboards', tr: 'Gerçek zamanlı iş etkisi panoları', de: 'Echtzeit-Business-Impact-Dashboards', ur: 'ریئل ٹائم بزنس امپیکٹ ڈیش بورڈز', ar: 'لوحات معلومات تأثير الأعمال الفورية' } },
    ],
  },
  // Governance & Ethics (4 questions)
  {
    id: 17,
    category: 'governance',
    question: {
      en: 'Do you have data privacy policies in place?',
      tr: 'Veri gizliliği politikalarınız var mı?',
      de: 'Haben Sie Datenschutzrichtlinien etabliert?',
      ur: 'کیا آپ کی ڈیٹا پرائیویسی پالیسیاں موجود ہیں؟',
      ar: 'هل لديك سياسات خصوصية البيانات موضوعة؟',
    },
    options: [
      { value: 1, label: { en: 'No formal privacy policies', tr: 'Resmi gizlilik politikaları yok', de: 'Keine formalen Datenschutzrichtlinien', ur: 'کوئی رسمی پرائیویسی پالیسیاں نہیں', ar: 'لا توجد سياسات خصوصية رسمية' } },
      { value: 2, label: { en: 'Basic privacy statement', tr: 'Temel gizlilik beyanı', de: 'Grundlegende Datenschutzerklärung', ur: 'بنیادی پرائیویسی بیان', ar: 'بيان خصوصية أساسي' } },
      { value: 3, label: { en: 'GDPR/compliance framework', tr: 'GDPR/uyumluluk çerçevesi', de: 'GDPR/Compliance-Framework', ur: 'GDPR/تعمیل فریم ورک', ar: 'إطار الامتثال للائحة حماية البيانات' } },
      { value: 4, label: { en: 'Comprehensive data governance', tr: 'Kapsamlı veri yönetişimi', de: 'Umfassende Daten-Governance', ur: 'جامع ڈیٹا گورننس', ar: 'حوكمة بيانات شاملة' } },
      { value: 5, label: { en: 'Privacy-by-design culture', tr: 'Tasarımda-gizlilik kültürü', de: 'Privacy-by-Design-Kultur', ur: 'ڈیزائن کے ذریعے پرائیویسی کا کلچر', ar: 'ثقافة الخصوصية بالتصميم' } },
    ],
  },
  {
    id: 18,
    category: 'governance',
    question: {
      en: 'Have you considered AI ethics guidelines?',
      tr: 'AI etik kurallarını düşündünüz mü?',
      de: 'Haben Sie KI-Ethik-Richtlinien in Betracht gezogen?',
      ur: 'کیا آپ نے AI اخلاقیات کی رہنما خطوط پر غور کیا ہے؟',
      ar: 'هل فكرت في إرشادات أخلاقيات الذكاء الاصطناعي؟',
    },
    options: [
      { value: 1, label: { en: 'Not considered yet', tr: 'Henüz düşünülmedi', de: 'Noch nicht berücksichtigt', ur: 'ابھی تک غور نہیں کیا', ar: 'لم يتم النظر فيها بعد' } },
      { value: 2, label: { en: 'Aware of the importance', tr: 'Öneminin farkındayız', de: 'Bewusstsein für die Bedeutung', ur: 'اہمیت سے آگاہ', ar: 'واعون بالأهمية' } },
      { value: 3, label: { en: 'Initial discussions happening', tr: 'İlk tartışmalar yapılıyor', de: 'Erste Diskussionen laufen', ur: 'ابتدائی بحث جاری', ar: 'مناقشات أولية جارية' } },
      { value: 4, label: { en: 'Drafted AI ethics principles', tr: 'AI etik ilkeleri taslağı hazırlandı', de: 'KI-Ethik-Prinzipien entworfen', ur: 'AI اخلاقیات کے اصولوں کا مسودہ', ar: 'مبادئ أخلاقيات الذكاء الاصطناعي مسودة' } },
      { value: 5, label: { en: 'Formal AI ethics board', tr: 'Resmi AI etik kurulu', de: 'Formelles KI-Ethik-Gremium', ur: 'رسمی AI اخلاقیات بورڈ', ar: 'مجلس رسمي لأخلاقيات الذكاء الاصطناعي' } },
    ],
  },
  {
    id: 19,
    category: 'governance',
    question: {
      en: 'How do you handle model risk management?',
      tr: 'Model risk yönetimini nasıl ele alıyorsunuz?',
      de: 'Wie handhaben Sie das Modell-Risikomanagement?',
      ur: 'آپ ماڈل رسک مینجمنٹ کو کیسے ہینڈل کرتے ہیں؟',
      ar: 'كيف تتعامل مع إدارة مخاطر النماذج؟',
    },
    options: [
      { value: 1, label: { en: 'Not applicable yet', tr: 'Henüz uygulanabilir değil', de: 'Noch nicht anwendbar', ur: 'ابھی تک لاگو نہیں', ar: 'غير قابل للتطبيق بعد' } },
      { value: 2, label: { en: 'Basic awareness of risks', tr: 'Risklerin temel farkındalığı', de: 'Grundlegendes Bewusstsein für Risiken', ur: 'خطرات کی بنیادی آگاہی', ar: 'وعي أساسي بالمخاطر' } },
      { value: 3, label: { en: 'Some validation processes', tr: 'Bazı doğrulama süreçleri', de: 'Einige Validierungsprozesse', ur: 'کچھ توثیق کے عمل', ar: 'بعض عمليات التحقق' } },
      { value: 4, label: { en: 'Model monitoring in place', tr: 'Model izleme mevcut', de: 'Modell-Monitoring vorhanden', ur: 'ماڈل مانیٹرنگ موجود', ar: 'مراقبة النماذج موجودة' } },
      { value: 5, label: { en: 'Full MLOps with governance', tr: 'Yönetişim ile tam MLOps', de: 'Vollständiges MLOps mit Governance', ur: 'گورننس کے ساتھ مکمل MLOps', ar: 'MLOps كاملة مع الحوكمة' } },
    ],
  },
  {
    id: 20,
    category: 'governance',
    question: {
      en: 'Do you have processes for AI transparency and explainability?',
      tr: 'AI şeffaflığı ve açıklanabilirliği için süreçleriniz var mı?',
      de: 'Haben Sie Prozesse für KI-Transparenz und Erklärbarkeit?',
      ur: 'کیا آپ کے پاس AI شفافیت اور وضاحت کے عمل ہیں؟',
      ar: 'هل لديك عمليات لشفافية وقابلية تفسير الذكاء الاصطناعي؟',
    },
    options: [
      { value: 1, label: { en: 'Not considered', tr: 'Düşünülmedi', de: 'Nicht berücksichtigt', ur: 'غور نہیں کیا گیا', ar: 'لم يتم النظر فيها' } },
      { value: 2, label: { en: 'Aware it may be needed', tr: 'Gerekebileceğinin farkındayız', de: 'Bewusst, dass es nötig sein könnte', ur: 'آگاہ ہیں کہ ضرورت ہو سکتی ہے', ar: 'واعون بأنها قد تكون ضرورية' } },
      { value: 3, label: { en: 'Basic documentation practices', tr: 'Temel dokümantasyon uygulamaları', de: 'Grundlegende Dokumentationspraktiken', ur: 'بنیادی دستاویزی طریقے', ar: 'ممارسات توثيق أساسية' } },
      { value: 4, label: { en: 'Explainability tools in use', tr: 'Açıklanabilirlik araçları kullanılıyor', de: 'Erklärbarkeits-Tools im Einsatz', ur: 'وضاحت کے ٹولز استعمال میں', ar: 'أدوات قابلية التفسير قيد الاستخدام' } },
      { value: 5, label: { en: 'Full transparency framework', tr: 'Tam şeffaflık çerçevesi', de: 'Vollständiges Transparenz-Framework', ur: 'مکمل شفافیت کا فریم ورک', ar: 'إطار شفافية كامل' } },
    ],
  },
];

// Recommendations based on score ranges
const getRecommendations = (score: number, categoryScores: Record<string, number>, locale: string) => {
  const recommendations: { category: string; title: string; description: string }[] = [];

  // Find weakest categories
  const sortedCategories = Object.entries(categoryScores)
    .sort(([, a], [, b]) => a - b);

  const weakestCategory = sortedCategories[0][0];
  const secondWeakest = sortedCategories[1][0];

  const categoryRecommendations: Record<string, Record<string, { title: string; description: string }>> = {
    data: {
      en: { title: 'Strengthen Data Foundation', description: 'Invest in data collection, quality, and accessibility. Consider implementing a data warehouse or lakehouse architecture.' },
      tr: { title: 'Veri Temeli Güçlendirme', description: 'Veri toplama, kalite ve erişilebilirliğe yatırım yapın. Veri ambarı veya lakehouse mimarisi uygulamayı düşünün.' },
      de: { title: 'Datenbasis stärken', description: 'Investieren Sie in Datenerfassung, Qualität und Zugänglichkeit. Erwägen Sie die Implementierung einer Data-Warehouse- oder Lakehouse-Architektur.' },
      ur: { title: 'ڈیٹا فاؤنڈیشن مضبوط کریں', description: 'ڈیٹا جمع، معیار، اور رسائی میں سرمایہ کاری کریں۔ ڈیٹا ویئر ہاؤس یا لیک ہاؤس آرکیٹیکچر پر غور کریں۔' },
      ar: { title: 'تعزيز أساس البيانات', description: 'استثمر في جمع البيانات والجودة وإمكانية الوصول. فكر في تنفيذ بنية مستودع بيانات أو lakehouse.' },
    },
    tech: {
      en: { title: 'Modernize Technical Infrastructure', description: 'Migrate to cloud-native architecture with ML services. Establish API standards and consider containerization.' },
      tr: { title: 'Teknik Altyapıyı Modernize Etme', description: 'ML servisleri ile bulut-yerel mimariye geçin. API standartları oluşturun ve konteynerizasyonu düşünün.' },
      de: { title: 'Technische Infrastruktur modernisieren', description: 'Migrieren Sie zu einer Cloud-nativen Architektur mit ML-Services. Etablieren Sie API-Standards und erwägen Sie Containerisierung.' },
      ur: { title: 'تکنیکی انفراسٹرکچر جدید بنائیں', description: 'ML سروسز کے ساتھ کلاؤڈ نیٹو آرکیٹیکچر میں منتقل ہوں۔ API معیارات قائم کریں اور کنٹینرائزیشن پر غور کریں۔' },
      ar: { title: 'تحديث البنية التحتية التقنية', description: 'انتقل إلى بنية سحابية أصلية مع خدمات التعلم الآلي. أنشئ معايير API وفكر في الحاويات.' },
    },
    team: {
      en: { title: 'Build AI Talent & Culture', description: 'Invest in training programs, hire data science talent, and foster an AI-curious culture across the organization.' },
      tr: { title: 'AI Yeteneği ve Kültürü Oluşturma', description: 'Eğitim programlarına yatırım yapın, veri bilimi yetenekleri işe alın ve organizasyon genelinde AI meraklısı bir kültür oluşturun.' },
      de: { title: 'KI-Talent & Kultur aufbauen', description: 'Investieren Sie in Schulungsprogramme, stellen Sie Data-Science-Talente ein und fördern Sie eine KI-neugierige Kultur im gesamten Unternehmen.' },
      ur: { title: 'AI ٹیلنٹ اور کلچر بنائیں', description: 'تربیتی پروگراموں میں سرمایہ کاری کریں، ڈیٹا سائنس ٹیلنٹ کی خدمات حاصل کریں، اور پوری تنظیم میں AI متجسس کلچر کو فروغ دیں۔' },
      ar: { title: 'بناء موهبة وثقافة الذكاء الاصطناعي', description: 'استثمر في برامج التدريب، وظف موهبة علوم البيانات، وعزز ثقافة فضولية تجاه الذكاء الاصطناعي في جميع أنحاء المؤسسة.' },
    },
    strategy: {
      en: { title: 'Develop AI Strategy', description: 'Identify high-impact use cases, secure executive sponsorship, and allocate dedicated budget for AI initiatives.' },
      tr: { title: 'AI Stratejisi Geliştirme', description: 'Yüksek etkili kullanım durumlarını belirleyin, yönetici sponsorluğu sağlayın ve AI girişimleri için özel bütçe ayırın.' },
      de: { title: 'KI-Strategie entwickeln', description: 'Identifizieren Sie hochwertige Anwendungsfälle, sichern Sie Executive Sponsorship und weisen Sie dediziertes Budget für KI-Initiativen zu.' },
      ur: { title: 'AI حکمت عملی تیار کریں', description: 'زیادہ اثر والے استعمال کے کیسز کی نشاندہی کریں، ایگزیکٹو سرپرستی حاصل کریں، اور AI اقدامات کے لیے مخصوص بجٹ مختص کریں۔' },
      ar: { title: 'تطوير استراتيجية الذكاء الاصطناعي', description: 'حدد حالات الاستخدام عالية التأثير، واحصل على رعاية تنفيذية، وخصص ميزانية مخصصة لمبادرات الذكاء الاصطناعي.' },
    },
    governance: {
      en: { title: 'Establish AI Governance', description: 'Implement data privacy frameworks, develop AI ethics guidelines, and create model risk management processes.' },
      tr: { title: 'AI Yönetişimi Kurma', description: 'Veri gizliliği çerçeveleri uygulayın, AI etik kuralları geliştirin ve model risk yönetimi süreçleri oluşturun.' },
      de: { title: 'KI-Governance etablieren', description: 'Implementieren Sie Datenschutz-Frameworks, entwickeln Sie KI-Ethik-Richtlinien und erstellen Sie Modell-Risikomanagement-Prozesse.' },
      ur: { title: 'AI گورننس قائم کریں', description: 'ڈیٹا پرائیویسی فریم ورکس لاگو کریں، AI اخلاقیات کی رہنما خطوط تیار کریں، اور ماڈل رسک مینجمنٹ کے عمل بنائیں۔' },
      ar: { title: 'إنشاء حوكمة الذكاء الاصطناعي', description: 'طبق أطر خصوصية البيانات، وطور إرشادات أخلاقيات الذكاء الاصطناعي، وأنشئ عمليات إدارة مخاطر النماذج.' },
    },
  };

  recommendations.push({
    category: weakestCategory,
    ...(categoryRecommendations[weakestCategory][locale] || categoryRecommendations[weakestCategory]['en']),
  });

  recommendations.push({
    category: secondWeakest,
    ...(categoryRecommendations[secondWeakest][locale] || categoryRecommendations[secondWeakest]['en']),
  });

  return recommendations;
};

export default function AIReadinessPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar' || locale === 'ur';

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '', role: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const t = (key: string) => translations[key]?.[locale] || translations[key]?.en || key;

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const calculateScore = () => {
    const totalPossible = questions.length * 5;
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    return Math.round((totalScore / totalPossible) * 100);
  };

  const getCategoryScores = () => {
    const categoryScores: Record<string, number> = {};
    categories.forEach((cat) => {
      const catQuestions = questions.filter((q) => q.category === cat.id);
      const catTotal = catQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
      categoryScores[cat.id] = Math.round((catTotal / (catQuestions.length * 5)) * 100);
    });
    return categoryScores;
  };

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { key: 'leader', color: 'emerald' };
    if (score >= 60) return { key: 'advanced', color: 'blue' };
    if (score >= 40) return { key: 'ready', color: 'yellow' };
    if (score >= 20) return { key: 'developing', color: 'orange' };
    return { key: 'beginner', color: 'red' };
  };

  const handleSubmitLead = async () => {
    if (!leadForm.name || !leadForm.email) return;

    setSubmitting(true);
    try {
      await fetch('/api/tools/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: 'ai-readiness-assessment',
          name: leadForm.name,
          email: leadForm.email,
          company: leadForm.company,
          data: {
            role: leadForm.role,
            score: calculateScore(),
            categoryScores: getCategoryScores(),
            answers,
          },
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const score = calculateScore();
  const categoryScores = getCategoryScores();
  const level = getReadinessLevel(score);
  const recommendations = getRecommendations(score, categoryScores, locale);

  // Intro screen
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-8">
                <ChartBarIcon className="w-10 h-10" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
              <p className="text-xl text-gray-300 mb-10">{t('subtitle')}</p>

              <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                  <span>{t('questions')}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                  <span>{t('minutes')}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                  <span>{t('freeReport')}</span>
                </div>
              </div>

              {/* Category preview */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-4 bg-white/5 rounded-xl">
                    <cat.icon className="w-8 h-8 mx-auto mb-2 text-indigo-400" />
                    <span className="text-sm text-gray-300">{cat.name}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStarted(true)}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all inline-flex items-center gap-2"
              >
                {t('startQuiz')}
                <ArrowRightIcon className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Lead capture form */}
              {!submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8"
                >
                  <h2 className="text-2xl font-bold mb-6">{t('yourScore')}</h2>

                  <div className="flex justify-center mb-8">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke={level.color === 'emerald' ? '#10B981' : level.color === 'blue' ? '#3B82F6' : level.color === 'yellow' ? '#F59E0B' : level.color === 'orange' ? '#F97316' : '#EF4444'}
                          strokeWidth="12"
                          strokeDasharray={`${(score / 100) * 440} 440`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold">{score}%</span>
                        <span className="text-sm text-gray-300">{t(level.key)}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-gray-300 mb-8">
                    {locale === 'en' && 'Enter your details to unlock your full personalized report with actionable recommendations.'}
                    {locale === 'tr' && 'Eyleme geçirilebilir önerilerle tam kişiselleştirilmiş raporunuzun kilidini açmak için bilgilerinizi girin.'}
                    {locale === 'de' && 'Geben Sie Ihre Daten ein, um Ihren vollständigen personalisierten Bericht mit umsetzbaren Empfehlungen freizuschalten.'}
                    {locale === 'ur' && 'اپنی مکمل ذاتی رپورٹ حاصل کرنے کے لیے اپنی تفصیلات درج کریں۔'}
                    {locale === 'ar' && 'أدخل بياناتك للحصول على تقريرك الشخصي الكامل مع توصيات قابلة للتنفيذ.'}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <input
                      type="text"
                      placeholder={t('name')}
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 placeholder-gray-400"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    <input
                      type="email"
                      placeholder={t('email')}
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 placeholder-gray-400"
                      dir="ltr"
                    />
                    <input
                      type="text"
                      placeholder={t('company')}
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 placeholder-gray-400"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    <input
                      type="text"
                      placeholder={t('role')}
                      value={leadForm.role}
                      onChange={(e) => setLeadForm({ ...leadForm, role: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 placeholder-gray-400"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <button
                    onClick={handleSubmitLead}
                    disabled={!leadForm.name || !leadForm.email || submitting}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? '...' : t('getResults')}
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Full Results */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4">
                      <CheckCircleSolid className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{t('yourScore')}</h1>
                  </motion.div>

                  {/* Score card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative w-48 h-48 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="96" cy="96" r="86" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="16" />
                          <circle
                            cx="96"
                            cy="96"
                            r="86"
                            fill="none"
                            stroke={level.color === 'emerald' ? '#10B981' : level.color === 'blue' ? '#3B82F6' : level.color === 'yellow' ? '#F59E0B' : level.color === 'orange' ? '#F97316' : '#EF4444'}
                            strokeWidth="16"
                            strokeDasharray={`${(score / 100) * 540} 540`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-5xl font-bold">{score}%</span>
                          <span className="text-lg text-gray-300">{t(level.key)}</span>
                        </div>
                      </div>

                      <div className="flex-1 w-full">
                        <h3 className="text-lg font-semibold mb-4">
                          {locale === 'en' && 'Category Breakdown'}
                          {locale === 'tr' && 'Kategori Dağılımı'}
                          {locale === 'de' && 'Kategorieaufschlüsselung'}
                          {locale === 'ur' && 'زمرہ کی تفصیل'}
                          {locale === 'ar' && 'تفصيل الفئات'}
                        </h3>
                        <div className="space-y-3">
                          {categories.map((cat) => (
                            <div key={cat.id}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="flex items-center gap-2">
                                  <cat.icon className="w-4 h-4" />
                                  {cat.name}
                                </span>
                                <span>{categoryScores[cat.id]}%</span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${categoryScores[cat.id]}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Recommendations */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8"
                  >
                    <h3 className="text-xl font-semibold mb-6">
                      {locale === 'en' && 'Key Recommendations'}
                      {locale === 'tr' && 'Temel Öneriler'}
                      {locale === 'de' && 'Wichtige Empfehlungen'}
                      {locale === 'ur' && 'اہم سفارشات'}
                      {locale === 'ar' && 'التوصيات الرئيسية'}
                    </h3>
                    <div className="space-y-4">
                      {recommendations.map((rec, idx) => (
                        <div key={idx} className="p-4 bg-white/5 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-indigo-400 font-bold">{idx + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">{rec.title}</h4>
                              <p className="text-sm text-gray-300">{rec.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <a
                      href={`/${locale}/contact`}
                      className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all text-center"
                    >
                      {t('scheduleCall')}
                    </a>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentCategory = categories.find((c) => c.id === question.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2">
                  {currentCategory && <currentCategory.icon className="w-5 h-5" />}
                  {currentCategory?.name}
                </span>
                <span>
                  {t('question')} {currentQuestion + 1} {t('of')} {questions.length}
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                />
              </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
              >
                <h2 className="text-2xl font-semibold mb-8">
                  {question.question[locale as keyof typeof question.question] || question.question.en}
                </h2>

                <div className="space-y-3">
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(question.id, option.value)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        answers[question.id] === option.value
                          ? 'bg-indigo-600 border-2 border-indigo-400'
                          : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            answers[question.id] === option.value
                              ? 'border-white bg-white'
                              : 'border-gray-400'
                          }`}
                        >
                          {answers[question.id] === option.value && (
                            <CheckCircleSolid className="w-4 h-4 text-indigo-600" />
                          )}
                        </div>
                        <span>
                          {option.label[locale as keyof typeof option.label] || option.label.en}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-white/10 rounded-lg font-medium hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                <ArrowLeftIcon className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                {t('previous')}
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={() => setShowResults(true)}
                  disabled={!answers[question.id]}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {t('getResults')}
                  <ChartBarIcon className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion((prev) => Math.min(questions.length - 1, prev + 1))}
                  disabled={!answers[question.id]}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {t('next')}
                  <ArrowRightIcon className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
