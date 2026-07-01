// src/data/legal.ts
// Static legal document content (privacy policy, terms of service, cookie policy)
// for all supported locales. Rendered by src/components/legal/LegalPage.tsx.

import { Locale } from '@/lib/i18n';

export interface LegalSection {
  heading: string;
  body: string; // paragraphs separated by "\n\n"
}

export interface LegalDocument {
  title: string;
  lastUpdated: string; // ISO date (YYYY-MM-DD)
  intro: string;
  sections: LegalSection[];
}

export type LegalDocKey = 'privacy' | 'terms' | 'cookies';

export const lastUpdatedLabels: Record<Locale, string> = {
  en: 'Last updated',
  tr: 'Son güncelleme',
  de: 'Zuletzt aktualisiert',
  ur: 'آخری تازہ کاری',
  ar: 'آخر تحديث',
};

const LAST_UPDATED = '2026-07-02';

export const legalContent: Record<LegalDocKey, Record<Locale, LegalDocument>> = {
  // ==========================================================================
  // PRIVACY POLICY
  // ==========================================================================
  privacy: {
    en: {
      title: 'Privacy Policy',
      lastUpdated: LAST_UPDATED,
      intro:
        'PakSoft ("we", "us" or "our") is a software development and digital agency based in Yozgat, Turkey, operating the website https://www.paksofts.com. This Privacy Policy explains what personal data we collect, why we collect it, how we use and protect it, and the rights you have under the Turkish Personal Data Protection Law No. 6698 (KVKK) and, where applicable, the EU General Data Protection Regulation (GDPR).',
      sections: [
        {
          heading: '1. Data Controller',
          body:
            'The data controller responsible for the processing of your personal data is PakSoft, Yozgat, Turkey.\n\nFor any privacy-related questions or requests you can reach us at paksoft3@gmail.com or by phone at +90 552 567 71 64.',
        },
        {
          heading: '2. Personal Data We Collect',
          body:
            'We collect the following categories of personal data:\n\nContact form data: when you submit our contact or project-request forms we collect your name, email address, phone number and the content of your message.\n\nCommunication data: information you provide when you contact us by email, phone or messaging channels.\n\nUsage data: technical information collected automatically when you visit our website, such as IP address, browser type, device information, pages visited, referral source and interaction events (e.g. clicks and scrolls).\n\nCookie and pixel data: identifiers set by cookies and similar technologies, as described in Section 4 and in our Cookie Policy.',
        },
        {
          heading: '3. Purposes and Legal Bases of Processing',
          body:
            'We process your personal data for the following purposes:\n\nResponding to inquiries: data submitted through our contact forms is stored and used to respond to your request, prepare quotes and communicate about potential or ongoing projects (legal basis: performance of a contract or steps prior to a contract; legitimate interest).\n\nOperating the website: ensuring the website functions securely and reliably (legal basis: legitimate interest).\n\nAnalytics: understanding how visitors use our website so we can improve content and user experience (legal basis: your consent).\n\nMarketing and advertising: measuring the effectiveness of our advertising campaigns and showing relevant ads on third-party platforms (legal basis: your consent).\n\nLegal compliance: fulfilling obligations under Turkish law and other applicable legislation (legal basis: legal obligation).',
        },
        {
          heading: '4. Cookies and Tracking Pixels',
          body:
            'Our website uses cookies and similar tracking technologies in three categories:\n\nNecessary cookies: required for the basic operation of the site, such as remembering your language preference and your cookie-consent choices.\n\nAnalytics cookies: Google Analytics 4 and session-analysis tools such as Microsoft Clarity or Hotjar (where active) help us understand site usage in aggregate.\n\nMarketing pixels: Google Ads, Meta (Facebook) Pixel, LinkedIn Insight Tag and TikTok Pixel may be used to measure ad performance and build advertising audiences.\n\nAnalytics and marketing technologies are only activated after you give consent through our cookie banner. You can change or withdraw your consent at any time. For full details, including cookie names and lifetimes, please see our Cookie Policy.',
        },
        {
          heading: '5. Third-Party Processors and Data Sharing',
          body:
            'We do not sell your personal data. We share data only with service providers that help us operate our website and marketing, acting as data processors or independent controllers:\n\nGoogle LLC — Google Analytics 4 and Google Ads (analytics and advertising measurement).\n\nMeta Platforms, Inc. — Meta/Facebook Pixel (advertising measurement and audiences).\n\nLinkedIn Corporation — LinkedIn Insight Tag (B2B advertising measurement).\n\nTikTok Technology Limited — TikTok Pixel (advertising measurement).\n\nVercel Inc. — website hosting and infrastructure.\n\nThese providers may process data in countries outside Turkey and the European Economic Area. Where required, transfers are protected by appropriate safeguards such as standard contractual clauses and, under KVKK, your explicit consent where applicable.',
        },
        {
          heading: '6. Data Retention',
          body:
            'We keep personal data only for as long as necessary for the purposes described in this policy:\n\nContact form and inquiry data is retained for up to 3 years after our last communication, unless a longer period is required for an ongoing contract or by law.\n\nAnalytics data is retained according to the retention settings of the respective tool (typically 2 to 26 months).\n\nCookie lifetimes are listed in our Cookie Policy.\n\nWhen data is no longer needed it is deleted, destroyed or anonymized in accordance with KVKK and GDPR requirements.',
        },
        {
          heading: '7. Your Rights under KVKK and GDPR',
          body:
            'Under Article 11 of the KVKK and Articles 15–21 of the GDPR you have the right to:\n\nlearn whether your personal data is processed and request information about that processing (right of access);\n\nrequest correction of incomplete or inaccurate data (right to rectification);\n\nrequest deletion or destruction of your data when the conditions in the law are met (right to erasure);\n\nobject to processing, including processing based on legitimate interests and processing for direct marketing (right to object);\n\nrequest restriction of processing and, under the GDPR, receive your data in a portable format (right to data portability);\n\nwithdraw consent at any time, without affecting the lawfulness of processing carried out before withdrawal;\n\nlodge a complaint with the Turkish Personal Data Protection Authority (KVKK Kurumu) or, for EU residents, with your local supervisory authority.',
        },
        {
          heading: '8. Data Security',
          body:
            'We apply appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, alteration or disclosure. These measures include encrypted connections (HTTPS/TLS), access controls, and hosting on reputable infrastructure providers. No method of transmission over the internet is completely secure, but we work continuously to protect your information.',
        },
        {
          heading: '9. Children’s Privacy',
          body:
            'Our website and services are directed at businesses and adult individuals. We do not knowingly collect personal data from children under 16. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.',
        },
        {
          heading: '10. Changes to This Policy and Contact',
          body:
            'We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page shows the latest revision. Significant changes will be announced on our website.\n\nTo exercise your rights or ask questions about this policy, contact us at:\n\nPakSoft — Yozgat, Turkey\nEmail: paksoft3@gmail.com\nPhone: +90 552 567 71 64\nWebsite: https://www.paksofts.com',
        },
      ],
    },
    tr: {
      title: 'Gizlilik Politikası',
      lastUpdated: LAST_UPDATED,
      intro:
        'PakSoft ("biz"), Yozgat, Türkiye merkezli bir yazılım geliştirme ve dijital ajans olup https://www.paksofts.com web sitesini işletmektedir. Bu Gizlilik Politikası; hangi kişisel verileri topladığımızı, bu verileri neden topladığımızı, nasıl kullandığımızı ve koruduğumuzu ve 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ile — uygulanabilir olduğu durumlarda — AB Genel Veri Koruma Tüzüğü (GDPR) kapsamındaki haklarınızı açıklamaktadır.',
      sections: [
        {
          heading: '1. Veri Sorumlusu',
          body:
            'Kişisel verilerinizin işlenmesinden sorumlu veri sorumlusu PakSoft’tur (Yozgat, Türkiye).\n\nGizlilikle ilgili her türlü soru ve talebiniz için bize paksoft3@gmail.com adresinden veya +90 552 567 71 64 numaralı telefondan ulaşabilirsiniz.',
        },
        {
          heading: '2. Topladığımız Kişisel Veriler',
          body:
            'Aşağıdaki kategorilerde kişisel veri topluyoruz:\n\nİletişim formu verileri: İletişim veya proje talep formlarımızı doldurduğunuzda adınızı, e-posta adresinizi, telefon numaranızı ve mesajınızın içeriğini toplarız.\n\nİletişim verileri: Bize e-posta, telefon veya mesajlaşma kanalları üzerinden ulaştığınızda paylaştığınız bilgiler.\n\nKullanım verileri: Web sitemizi ziyaret ettiğinizde otomatik olarak toplanan teknik bilgiler; IP adresi, tarayıcı türü, cihaz bilgisi, ziyaret edilen sayfalar, yönlendiren kaynak ve etkileşim olayları (ör. tıklama ve kaydırma).\n\nÇerez ve piksel verileri: 4. bölümde ve Çerez Politikamızda açıklanan çerezler ve benzeri teknolojiler tarafından oluşturulan tanımlayıcılar.',
        },
        {
          heading: '3. İşleme Amaçları ve Hukuki Sebepler',
          body:
            'Kişisel verilerinizi aşağıdaki amaçlarla işliyoruz:\n\nTaleplere yanıt verme: İletişim formları aracılığıyla iletilen veriler saklanır ve talebinize yanıt vermek, teklif hazırlamak ve mevcut ya da olası projeler hakkında iletişim kurmak için kullanılır (hukuki sebep: sözleşmenin kurulması veya ifası; meşru menfaat).\n\nWeb sitesinin işletilmesi: Sitenin güvenli ve güvenilir şekilde çalışmasının sağlanması (hukuki sebep: meşru menfaat).\n\nAnaliz: Ziyaretçilerin sitemizi nasıl kullandığını anlayarak içeriği ve kullanıcı deneyimini iyileştirmek (hukuki sebep: açık rızanız).\n\nPazarlama ve reklam: Reklam kampanyalarımızın etkinliğini ölçmek ve üçüncü taraf platformlarda ilgili reklamlar göstermek (hukuki sebep: açık rızanız).\n\nHukuki yükümlülükler: Türk hukuku ve diğer ilgili mevzuattan doğan yükümlülüklerin yerine getirilmesi (hukuki sebep: kanuni yükümlülük).',
        },
        {
          heading: '4. Çerezler ve Takip Pikselleri',
          body:
            'Web sitemiz üç kategoride çerez ve benzeri takip teknolojileri kullanır:\n\nZorunlu çerezler: Dil tercihinizin ve çerez onay seçimlerinizin hatırlanması gibi sitenin temel işleyişi için gereklidir.\n\nAnaliz çerezleri: Google Analytics 4 ile Microsoft Clarity veya Hotjar (aktif olduğu durumlarda) gibi oturum analizi araçları, site kullanımını toplu olarak anlamamıza yardımcı olur.\n\nPazarlama pikselleri: Google Ads, Meta (Facebook) Pixel, LinkedIn Insight Tag ve TikTok Pixel; reklam performansını ölçmek ve reklam kitleleri oluşturmak için kullanılabilir.\n\nAnaliz ve pazarlama teknolojileri yalnızca çerez bandımız üzerinden onay vermenizden sonra etkinleştirilir. Onayınızı dilediğiniz zaman değiştirebilir veya geri çekebilirsiniz. Çerez adları ve süreleri dahil ayrıntılar için lütfen Çerez Politikamıza bakın.',
        },
        {
          heading: '5. Üçüncü Taraf Veri İşleyenler ve Veri Paylaşımı',
          body:
            'Kişisel verilerinizi satmayız. Verileri yalnızca web sitemizin ve pazarlama faaliyetlerimizin yürütülmesine yardımcı olan, veri işleyen veya bağımsız veri sorumlusu sıfatıyla hareket eden hizmet sağlayıcılarla paylaşırız:\n\nGoogle LLC — Google Analytics 4 ve Google Ads (analiz ve reklam ölçümü).\n\nMeta Platforms, Inc. — Meta/Facebook Pixel (reklam ölçümü ve kitleler).\n\nLinkedIn Corporation — LinkedIn Insight Tag (B2B reklam ölçümü).\n\nTikTok Technology Limited — TikTok Pixel (reklam ölçümü).\n\nVercel Inc. — web sitesi barındırma ve altyapı.\n\nBu sağlayıcılar verileri Türkiye ve Avrupa Ekonomik Alanı dışındaki ülkelerde işleyebilir. Gerekli hallerde aktarımlar, standart sözleşme hükümleri gibi uygun güvencelerle ve KVKK kapsamında gerektiğinde açık rızanızla korunur.',
        },
        {
          heading: '6. Veri Saklama Süreleri',
          body:
            'Kişisel verileri yalnızca bu politikada açıklanan amaçlar için gerekli olduğu süre boyunca saklarız:\n\nİletişim formu ve talep verileri, devam eden bir sözleşme veya kanuni bir zorunluluk daha uzun bir süre gerektirmedikçe, son iletişimimizden itibaren en fazla 3 yıl saklanır.\n\nAnaliz verileri, ilgili aracın saklama ayarlarına göre tutulur (genellikle 2 ila 26 ay).\n\nÇerez süreleri Çerez Politikamızda listelenmiştir.\n\nVeriler artık gerekli olmadığında KVKK ve GDPR gerekliliklerine uygun olarak silinir, yok edilir veya anonim hale getirilir.',
        },
        {
          heading: '7. KVKK ve GDPR Kapsamındaki Haklarınız',
          body:
            'KVKK’nın 11. maddesi ve GDPR’ın 15–21. maddeleri uyarınca şu haklara sahipsiniz:\n\nKişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse buna ilişkin bilgi talep etme (erişim hakkı);\n\nEksik veya yanlış işlenmiş verilerin düzeltilmesini isteme (düzeltme hakkı);\n\nKanunda öngörülen şartların oluşması hâlinde verilerinizin silinmesini veya yok edilmesini isteme (silme hakkı);\n\nMeşru menfaate dayalı işlemeye ve doğrudan pazarlama amaçlı işlemeye itiraz etme (itiraz hakkı);\n\nİşlemenin kısıtlanmasını talep etme ve GDPR kapsamında verilerinizi taşınabilir bir formatta alma (veri taşınabilirliği hakkı);\n\nOnayınızı, geri çekme öncesindeki işlemenin hukuka uygunluğunu etkilemeksizin dilediğiniz zaman geri çekme;\n\nKişisel Verileri Koruma Kurumu’na (KVKK Kurumu) veya AB’de ikamet ediyorsanız yerel denetim makamınıza şikâyette bulunma.',
        },
        {
          heading: '8. Veri Güvenliği',
          body:
            'Kişisel verilerinizi yetkisiz erişime, kayba, değiştirilmeye veya ifşaya karşı korumak için uygun teknik ve idari tedbirler uygularız. Bu tedbirler arasında şifreli bağlantılar (HTTPS/TLS), erişim kontrolleri ve saygın altyapı sağlayıcılarında barındırma yer alır. İnternet üzerinden hiçbir iletim yöntemi tamamen güvenli değildir; ancak bilgilerinizi korumak için sürekli çalışıyoruz.',
        },
        {
          heading: '9. Çocukların Gizliliği',
          body:
            'Web sitemiz ve hizmetlerimiz işletmelere ve yetişkin bireylere yöneliktir. 16 yaşın altındaki çocuklardan bilerek kişisel veri toplamayız. Bir çocuğun bize kişisel veri sağladığını düşünüyorsanız lütfen bizimle iletişime geçin; verileri derhal sileriz.',
        },
        {
          heading: '10. Politika Değişiklikleri ve İletişim',
          body:
            'Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Sayfanın üst kısmındaki "Son güncelleme" tarihi en son revizyonu gösterir. Önemli değişiklikler web sitemizde duyurulur.\n\nHaklarınızı kullanmak veya bu politika hakkında soru sormak için bize ulaşın:\n\nPakSoft — Yozgat, Türkiye\nE-posta: paksoft3@gmail.com\nTelefon: +90 552 567 71 64\nWeb sitesi: https://www.paksofts.com',
        },
      ],
    },
    de: {
      title: 'Datenschutzerklärung',
      lastUpdated: LAST_UPDATED,
      intro:
        'PakSoft („wir“ oder „uns“) ist eine Softwareentwicklungs- und Digitalagentur mit Sitz in Yozgat, Türkei, und betreibt die Website https://www.paksofts.com. Diese Datenschutzerklärung erläutert, welche personenbezogenen Daten wir erheben, warum wir sie erheben, wie wir sie verwenden und schützen und welche Rechte Ihnen nach dem türkischen Datenschutzgesetz Nr. 6698 (KVKK) und — soweit anwendbar — der EU-Datenschutz-Grundverordnung (DSGVO) zustehen.',
      sections: [
        {
          heading: '1. Verantwortlicher',
          body:
            'Verantwortlicher für die Verarbeitung Ihrer personenbezogenen Daten ist PakSoft, Yozgat, Türkei.\n\nBei Fragen oder Anliegen zum Datenschutz erreichen Sie uns unter paksoft3@gmail.com oder telefonisch unter +90 552 567 71 64.',
        },
        {
          heading: '2. Welche Daten wir erheben',
          body:
            'Wir erheben folgende Kategorien personenbezogener Daten:\n\nKontaktformulardaten: Wenn Sie unser Kontakt- oder Projektanfrageformular absenden, erheben wir Ihren Namen, Ihre E-Mail-Adresse, Ihre Telefonnummer und den Inhalt Ihrer Nachricht.\n\nKommunikationsdaten: Informationen, die Sie uns per E-Mail, Telefon oder über Messaging-Kanäle mitteilen.\n\nNutzungsdaten: Technische Informationen, die beim Besuch unserer Website automatisch erfasst werden, z. B. IP-Adresse, Browsertyp, Geräteinformationen, besuchte Seiten, Verweisquelle und Interaktionsereignisse (z. B. Klicks und Scrollen).\n\nCookie- und Pixel-Daten: Kennungen, die durch Cookies und ähnliche Technologien gesetzt werden, wie in Abschnitt 4 und in unserer Cookie-Richtlinie beschrieben.',
        },
        {
          heading: '3. Zwecke und Rechtsgrundlagen der Verarbeitung',
          body:
            'Wir verarbeiten Ihre Daten zu folgenden Zwecken:\n\nBeantwortung von Anfragen: Über unsere Formulare übermittelte Daten werden gespeichert und genutzt, um Ihre Anfrage zu beantworten, Angebote zu erstellen und über laufende oder mögliche Projekte zu kommunizieren (Rechtsgrundlage: Vertragserfüllung bzw. vorvertragliche Maßnahmen; berechtigtes Interesse).\n\nBetrieb der Website: Sicherstellung eines sicheren und zuverlässigen Betriebs (Rechtsgrundlage: berechtigtes Interesse).\n\nAnalyse: Verständnis der Website-Nutzung zur Verbesserung von Inhalten und Nutzererlebnis (Rechtsgrundlage: Ihre Einwilligung).\n\nMarketing und Werbung: Messung der Wirksamkeit unserer Werbekampagnen und Ausspielung relevanter Anzeigen auf Drittplattformen (Rechtsgrundlage: Ihre Einwilligung).\n\nRechtliche Verpflichtungen: Erfüllung von Pflichten nach türkischem Recht und anderen anwendbaren Vorschriften (Rechtsgrundlage: rechtliche Verpflichtung).',
        },
        {
          heading: '4. Cookies und Tracking-Pixel',
          body:
            'Unsere Website verwendet Cookies und ähnliche Technologien in drei Kategorien:\n\nNotwendige Cookies: erforderlich für den Grundbetrieb der Website, z. B. zum Speichern Ihrer Spracheinstellung und Ihrer Cookie-Einwilligung.\n\nAnalyse-Cookies: Google Analytics 4 sowie Sitzungsanalyse-Tools wie Microsoft Clarity oder Hotjar (sofern aktiv) helfen uns, die Nutzung der Website aggregiert zu verstehen.\n\nMarketing-Pixel: Google Ads, Meta (Facebook) Pixel, LinkedIn Insight Tag und TikTok Pixel können zur Messung der Anzeigenleistung und zum Aufbau von Werbezielgruppen eingesetzt werden.\n\nAnalyse- und Marketingtechnologien werden erst nach Ihrer Einwilligung über unser Cookie-Banner aktiviert. Sie können Ihre Einwilligung jederzeit ändern oder widerrufen. Einzelheiten, einschließlich Cookie-Namen und Laufzeiten, finden Sie in unserer Cookie-Richtlinie.',
        },
        {
          heading: '5. Auftragsverarbeiter und Datenweitergabe',
          body:
            'Wir verkaufen Ihre Daten nicht. Wir geben Daten nur an Dienstleister weiter, die uns beim Betrieb der Website und beim Marketing unterstützen:\n\nGoogle LLC — Google Analytics 4 und Google Ads (Analyse und Werbemessung).\n\nMeta Platforms, Inc. — Meta/Facebook Pixel (Werbemessung und Zielgruppen).\n\nLinkedIn Corporation — LinkedIn Insight Tag (B2B-Werbemessung).\n\nTikTok Technology Limited — TikTok Pixel (Werbemessung).\n\nVercel Inc. — Website-Hosting und Infrastruktur.\n\nDiese Anbieter können Daten in Ländern außerhalb der Türkei und des Europäischen Wirtschaftsraums verarbeiten. Soweit erforderlich, werden Übermittlungen durch geeignete Garantien wie Standardvertragsklauseln und — nach KVKK — gegebenenfalls durch Ihre ausdrückliche Einwilligung abgesichert.',
        },
        {
          heading: '6. Speicherdauer',
          body:
            'Wir speichern personenbezogene Daten nur so lange, wie es für die beschriebenen Zwecke erforderlich ist:\n\nKontaktformular- und Anfragedaten werden bis zu 3 Jahre nach unserer letzten Kommunikation aufbewahrt, sofern nicht ein laufender Vertrag oder gesetzliche Pflichten eine längere Aufbewahrung erfordern.\n\nAnalysedaten werden gemäß den Aufbewahrungseinstellungen des jeweiligen Tools gespeichert (in der Regel 2 bis 26 Monate).\n\nCookie-Laufzeiten sind in unserer Cookie-Richtlinie aufgeführt.\n\nNicht mehr benötigte Daten werden im Einklang mit KVKK und DSGVO gelöscht, vernichtet oder anonymisiert.',
        },
        {
          heading: '7. Ihre Rechte nach KVKK und DSGVO',
          body:
            'Nach Art. 11 KVKK und Art. 15–21 DSGVO haben Sie das Recht:\n\nAuskunft darüber zu erhalten, ob und wie Ihre Daten verarbeitet werden (Auskunftsrecht);\n\ndie Berichtigung unvollständiger oder unrichtiger Daten zu verlangen (Recht auf Berichtigung);\n\ndie Löschung oder Vernichtung Ihrer Daten zu verlangen, wenn die gesetzlichen Voraussetzungen erfüllt sind (Recht auf Löschung);\n\nder Verarbeitung zu widersprechen, einschließlich der Verarbeitung auf Grundlage berechtigter Interessen und zu Zwecken der Direktwerbung (Widerspruchsrecht);\n\ndie Einschränkung der Verarbeitung zu verlangen und nach der DSGVO Ihre Daten in einem übertragbaren Format zu erhalten (Recht auf Datenübertragbarkeit);\n\nIhre Einwilligung jederzeit zu widerrufen, ohne dass die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung berührt wird;\n\nBeschwerde bei der türkischen Datenschutzbehörde (KVKK Kurumu) oder — für Personen in der EU — bei Ihrer örtlichen Aufsichtsbehörde einzulegen.',
        },
        {
          heading: '8. Datensicherheit',
          body:
            'Wir treffen geeignete technische und organisatorische Maßnahmen, um Ihre Daten vor unbefugtem Zugriff, Verlust, Veränderung oder Offenlegung zu schützen, darunter verschlüsselte Verbindungen (HTTPS/TLS), Zugriffskontrollen und Hosting bei renommierten Infrastrukturanbietern. Keine Übertragungsmethode im Internet ist vollständig sicher; wir arbeiten jedoch kontinuierlich am Schutz Ihrer Informationen.',
        },
        {
          heading: '9. Datenschutz von Kindern',
          body:
            'Unsere Website und Dienstleistungen richten sich an Unternehmen und Erwachsene. Wir erheben wissentlich keine Daten von Kindern unter 16 Jahren. Sollten Sie glauben, dass uns ein Kind personenbezogene Daten übermittelt hat, kontaktieren Sie uns bitte; wir löschen die Daten umgehend.',
        },
        {
          heading: '10. Änderungen dieser Erklärung und Kontakt',
          body:
            'Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Das Datum „Zuletzt aktualisiert“ oben auf dieser Seite zeigt die letzte Revision. Wesentliche Änderungen werden auf unserer Website bekannt gegeben.\n\nZur Ausübung Ihrer Rechte oder bei Fragen zu dieser Erklärung erreichen Sie uns unter:\n\nPakSoft — Yozgat, Türkei\nE-Mail: paksoft3@gmail.com\nTelefon: +90 552 567 71 64\nWebsite: https://www.paksofts.com',
        },
      ],
    },
    ar: {
      title: 'سياسة الخصوصية',
      lastUpdated: LAST_UPDATED,
      intro:
        'باك سوفت (PakSoft) هي وكالة لتطوير البرمجيات والخدمات الرقمية مقرها يوزغات، تركيا، وتدير الموقع الإلكتروني https://www.paksofts.com. توضح سياسة الخصوصية هذه البيانات الشخصية التي نجمعها، وأسباب جمعها، وكيفية استخدامها وحمايتها، وحقوقك بموجب قانون حماية البيانات الشخصية التركي رقم 6698 (KVKK) وكذلك اللائحة الأوروبية العامة لحماية البيانات (GDPR) حيثما تنطبق.',
      sections: [
        {
          heading: '1. المسؤول عن البيانات',
          body:
            'الجهة المسؤولة عن معالجة بياناتك الشخصية هي PakSoft، يوزغات، تركيا.\n\nلأي استفسارات أو طلبات تتعلق بالخصوصية، يمكنك التواصل معنا عبر البريد الإلكتروني paksoft3@gmail.com أو الهاتف ‎+90 552 567 71 64.',
        },
        {
          heading: '2. البيانات التي نجمعها',
          body:
            'نجمع الفئات التالية من البيانات الشخصية:\n\nبيانات نموذج التواصل: عند إرسال نموذج التواصل أو طلب مشروع، نجمع اسمك وبريدك الإلكتروني ورقم هاتفك ومحتوى رسالتك.\n\nبيانات الاستخدام: معلومات تقنية تُجمع تلقائيًا عند زيارة موقعنا، مثل عنوان IP ونوع المتصفح ومعلومات الجهاز والصفحات التي تمت زيارتها.\n\nبيانات ملفات تعريف الارتباط (الكوكيز) والبكسلات: معرّفات تُنشئها الكوكيز والتقنيات المشابهة، كما هو موضح في سياسة الكوكيز الخاصة بنا.',
        },
        {
          heading: '3. أغراض المعالجة وأسسها القانونية',
          body:
            'نعالج بياناتك للأغراض التالية:\n\nالرد على الاستفسارات: تُحفظ بيانات نماذج التواصل وتُستخدم للرد على طلبك وإعداد عروض الأسعار والتواصل بشأن المشاريع (الأساس القانوني: تنفيذ عقد أو خطوات سابقة للتعاقد؛ المصلحة المشروعة).\n\nتشغيل الموقع: ضمان عمل الموقع بشكل آمن وموثوق (المصلحة المشروعة).\n\nالتحليلات: فهم كيفية استخدام الزوار لموقعنا لتحسين المحتوى وتجربة المستخدم (موافقتك).\n\nالتسويق والإعلان: قياس فعالية حملاتنا الإعلانية وعرض إعلانات ذات صلة على منصات خارجية (موافقتك).\n\nالامتثال القانوني: الوفاء بالالتزامات بموجب القانون التركي والتشريعات الأخرى المعمول بها.',
        },
        {
          heading: '4. الكوكيز وبكسلات التتبع',
          body:
            'يستخدم موقعنا الكوكيز والتقنيات المشابهة في ثلاث فئات:\n\nالكوكيز الضرورية: مطلوبة للتشغيل الأساسي للموقع، مثل حفظ تفضيل اللغة وخيارات الموافقة على الكوكيز.\n\nكوكيز التحليلات: Google Analytics 4 وأدوات تحليل الجلسات مثل Microsoft Clarity أو Hotjar (عند تفعيلها).\n\nبكسلات التسويق: Google Ads وMeta (Facebook) Pixel وLinkedIn Insight Tag وTikTok Pixel لقياس أداء الإعلانات وبناء الجماهير الإعلانية.\n\nلا تُفعَّل تقنيات التحليلات والتسويق إلا بعد موافقتك عبر شريط الكوكيز، ويمكنك تغيير موافقتك أو سحبها في أي وقت. لمزيد من التفاصيل، يُرجى الاطلاع على سياسة الكوكيز.',
        },
        {
          heading: '5. المعالجون الخارجيون ومشاركة البيانات',
          body:
            'لا نبيع بياناتك الشخصية. نشارك البيانات فقط مع مزوّدي الخدمات الذين يساعدوننا في تشغيل موقعنا وأنشطتنا التسويقية:\n\nGoogle LLC — تحليلات جوجل وإعلانات جوجل.\n\nMeta Platforms, Inc. — بكسل ميتا/فيسبوك.\n\nLinkedIn Corporation — أداة LinkedIn Insight.\n\nTikTok Technology Limited — بكسل تيك توك.\n\nVercel Inc. — استضافة الموقع والبنية التحتية.\n\nقد يعالج هؤلاء المزوّدون البيانات في دول خارج تركيا والمنطقة الاقتصادية الأوروبية، وتُحمى عمليات النقل عند الاقتضاء بضمانات مناسبة مثل البنود التعاقدية القياسية وموافقتك الصريحة بموجب KVKK حيثما يلزم.',
        },
        {
          heading: '6. مدة الاحتفاظ بالبيانات',
          body:
            'نحتفظ بالبيانات الشخصية فقط للمدة اللازمة للأغراض الموضحة في هذه السياسة. تُحفظ بيانات نماذج التواصل والاستفسارات لمدة أقصاها 3 سنوات بعد آخر تواصل، ما لم يتطلب عقد جارٍ أو القانون مدة أطول. وتُحفظ بيانات التحليلات وفق إعدادات الاحتفاظ لكل أداة (عادة من شهرين إلى 26 شهرًا). وعندما لا تعود البيانات ضرورية، تُحذف أو تُتلف أو تُجهَّل وفقًا لمتطلبات KVKK وGDPR.',
        },
        {
          heading: '7. حقوقك بموجب KVKK وGDPR',
          body:
            'بموجب المادة 11 من KVKK والمواد 15–21 من GDPR، لديك الحق في:\n\nمعرفة ما إذا كانت بياناتك تُعالج وطلب معلومات عن ذلك (حق الوصول)؛\n\nطلب تصحيح البيانات الناقصة أو غير الدقيقة (حق التصحيح)؛\n\nطلب حذف بياناتك أو إتلافها عند تحقق الشروط القانونية (حق المحو)؛\n\nالاعتراض على المعالجة، بما في ذلك المعالجة لأغراض التسويق المباشر (حق الاعتراض)؛\n\nطلب تقييد المعالجة والحصول على بياناتك بصيغة قابلة للنقل بموجب GDPR؛\n\nسحب موافقتك في أي وقت دون المساس بمشروعية المعالجة السابقة للسحب؛\n\nتقديم شكوى إلى هيئة حماية البيانات الشخصية التركية أو إلى سلطة الرقابة المحلية في الاتحاد الأوروبي.',
        },
        {
          heading: '8. أمن البيانات',
          body:
            'نطبق تدابير تقنية وتنظيمية مناسبة لحماية بياناتك من الوصول غير المصرح به أو الفقدان أو التعديل أو الإفشاء، بما في ذلك الاتصالات المشفرة (HTTPS/TLS) وضوابط الوصول والاستضافة لدى مزوّدي بنية تحتية موثوقين. لا توجد وسيلة نقل عبر الإنترنت آمنة تمامًا، لكننا نعمل باستمرار على حماية معلوماتك.',
        },
        {
          heading: '9. التغييرات على هذه السياسة والتواصل',
          body:
            'قد نُحدِّث سياسة الخصوصية هذه من وقت لآخر، ويُظهر تاريخ "آخر تحديث" أعلى الصفحة أحدث مراجعة.\n\nلممارسة حقوقك أو لطرح أي أسئلة، تواصل معنا:\n\nPakSoft — يوزغات، تركيا\nالبريد الإلكتروني: paksoft3@gmail.com\nالهاتف: ‎+90 552 567 71 64\nالموقع: https://www.paksofts.com',
        },
      ],
    },
    ur: {
      title: 'پرائیویسی پالیسی',
      lastUpdated: LAST_UPDATED,
      intro:
        'پاک سافٹ (PakSoft) ایک سافٹ ویئر ڈیویلپمنٹ اور ڈیجیٹل ایجنسی ہے جس کا مرکز یوزگات، ترکی میں ہے اور جو ویب سائٹ https://www.paksofts.com چلاتی ہے۔ یہ پرائیویسی پالیسی وضاحت کرتی ہے کہ ہم کون سا ذاتی ڈیٹا جمع کرتے ہیں، کیوں جمع کرتے ہیں، اسے کیسے استعمال اور محفوظ کرتے ہیں، اور ترکی کے پرسنل ڈیٹا پروٹیکشن قانون نمبر 6698 (KVKK) اور جہاں لاگو ہو یورپی GDPR کے تحت آپ کے حقوق کیا ہیں۔',
      sections: [
        {
          heading: '1. ڈیٹا کنٹرولر',
          body:
            'آپ کے ذاتی ڈیٹا کی پروسیسنگ کا ذمہ دار ادارہ PakSoft، یوزگات، ترکی ہے۔\n\nپرائیویسی سے متعلق کسی بھی سوال یا درخواست کے لیے ہمیں paksoft3@gmail.com پر ای میل کریں یا ‎+90 552 567 71 64 پر کال کریں۔',
        },
        {
          heading: '2. ہم کون سا ڈیٹا جمع کرتے ہیں',
          body:
            'ہم درج ذیل اقسام کا ذاتی ڈیٹا جمع کرتے ہیں:\n\nرابطہ فارم کا ڈیٹا: جب آپ ہمارا رابطہ یا پراجیکٹ فارم جمع کراتے ہیں تو ہم آپ کا نام، ای میل، فون نمبر اور پیغام کا مواد جمع کرتے ہیں۔\n\nاستعمال کا ڈیٹا: ویب سائٹ کے دورے کے دوران خودکار طور پر جمع ہونے والی تکنیکی معلومات، جیسے IP ایڈریس، براؤزر کی قسم، ڈیوائس کی معلومات اور دیکھے گئے صفحات۔\n\nکوکیز اور پکسل ڈیٹا: کوکیز اور اسی طرح کی ٹیکنالوجیز کے ذریعے بنائے گئے شناخت کار، جن کی تفصیل ہماری کوکی پالیسی میں موجود ہے۔',
        },
        {
          heading: '3. پروسیسنگ کے مقاصد اور قانونی بنیادیں',
          body:
            'ہم آپ کا ڈیٹا درج ذیل مقاصد کے لیے پروسیس کرتے ہیں:\n\nاستفسارات کا جواب: رابطہ فارم کا ڈیٹا محفوظ کیا جاتا ہے اور آپ کی درخواست کا جواب دینے، کوٹیشن تیار کرنے اور منصوبوں کے بارے میں رابطے کے لیے استعمال ہوتا ہے (قانونی بنیاد: معاہدے کی تکمیل یا اس سے قبل کے اقدامات؛ جائز مفاد)۔\n\nویب سائٹ کا انتظام: سائٹ کے محفوظ اور قابل اعتماد کام کو یقینی بنانا (جائز مفاد)۔\n\nتجزیات: صارفین کے ویب سائٹ کے استعمال کو سمجھ کر مواد اور تجربہ بہتر بنانا (آپ کی رضامندی)۔\n\nمارکیٹنگ اور اشتہارات: اشتہاری مہمات کی کارکردگی کی پیمائش اور متعلقہ اشتہارات دکھانا (آپ کی رضامندی)۔\n\nقانونی تعمیل: ترک قانون اور دیگر قابل اطلاق قوانین کے تحت ذمہ داریوں کی تکمیل۔',
        },
        {
          heading: '4. کوکیز اور ٹریکنگ پکسلز',
          body:
            'ہماری ویب سائٹ تین اقسام کی کوکیز اور مشابہ ٹیکنالوجیز استعمال کرتی ہے:\n\nضروری کوکیز: سائٹ کے بنیادی کام کے لیے، جیسے زبان کی ترجیح اور کوکی رضامندی کے انتخاب محفوظ رکھنا۔\n\nتجزیاتی کوکیز: Google Analytics 4 اور سیشن تجزیہ کے ٹولز جیسے Microsoft Clarity یا Hotjar (جب فعال ہوں)۔\n\nمارکیٹنگ پکسلز: Google Ads، Meta (Facebook) Pixel، LinkedIn Insight Tag اور TikTok Pixel اشتہارات کی کارکردگی ناپنے کے لیے استعمال ہو سکتے ہیں۔\n\nتجزیاتی اور مارکیٹنگ ٹیکنالوجیز صرف کوکی بینر کے ذریعے آپ کی رضامندی کے بعد فعال ہوتی ہیں۔ آپ اپنی رضامندی کسی بھی وقت تبدیل یا واپس لے سکتے ہیں۔ مزید تفصیلات کے لیے ہماری کوکی پالیسی دیکھیں۔',
        },
        {
          heading: '5. تیسرے فریق پروسیسرز اور ڈیٹا کا اشتراک',
          body:
            'ہم آپ کا ذاتی ڈیٹا فروخت نہیں کرتے۔ ہم ڈیٹا صرف ان سروس فراہم کنندگان کے ساتھ شیئر کرتے ہیں جو ہماری ویب سائٹ اور مارکیٹنگ چلانے میں مدد کرتے ہیں:\n\nGoogle LLC — Google Analytics 4 اور Google Ads۔\n\nMeta Platforms, Inc. — Meta/Facebook Pixel۔\n\nLinkedIn Corporation — LinkedIn Insight Tag۔\n\nTikTok Technology Limited — TikTok Pixel۔\n\nVercel Inc. — ویب سائٹ ہوسٹنگ اور انفراسٹرکچر۔\n\nیہ فراہم کنندگان ترکی اور یورپی اقتصادی علاقے سے باہر ڈیٹا پروسیس کر سکتے ہیں؛ جہاں ضروری ہو، منتقلی مناسب ضمانتوں جیسے معیاری معاہداتی شقوں سے محفوظ کی جاتی ہے۔',
        },
        {
          heading: '6. ڈیٹا کی مدتِ حفاظت',
          body:
            'ہم ذاتی ڈیٹا صرف اس مدت تک رکھتے ہیں جو اس پالیسی میں بیان کردہ مقاصد کے لیے ضروری ہو۔ رابطہ فارم اور استفسار کا ڈیٹا آخری رابطے کے بعد زیادہ سے زیادہ 3 سال تک محفوظ رہتا ہے، جب تک کوئی جاری معاہدہ یا قانون طویل مدت کا تقاضا نہ کرے۔ تجزیاتی ڈیٹا متعلقہ ٹول کی سیٹنگز کے مطابق (عام طور پر 2 تا 26 ماہ) محفوظ رہتا ہے۔ ضرورت ختم ہونے پر ڈیٹا KVKK اور GDPR کے مطابق حذف، تلف یا گمنام کر دیا جاتا ہے۔',
        },
        {
          heading: '7. KVKK اور GDPR کے تحت آپ کے حقوق',
          body:
            'KVKK کی دفعہ 11 اور GDPR کی دفعات 15–21 کے تحت آپ کو حق حاصل ہے کہ:\n\nمعلوم کریں کہ آیا آپ کا ڈیٹا پروسیس ہو رہا ہے اور اس بارے میں معلومات طلب کریں (رسائی کا حق)؛\n\nنامکمل یا غلط ڈیٹا کی درستی کی درخواست کریں (تصحیح کا حق)؛\n\nقانونی شرائط پوری ہونے پر ڈیٹا حذف کرنے کی درخواست کریں (حذف کا حق)؛\n\nپروسیسنگ پر اعتراض کریں، بشمول براہِ راست مارکیٹنگ کے لیے پروسیسنگ (اعتراض کا حق)؛\n\nپروسیسنگ کی حد بندی کی درخواست کریں اور GDPR کے تحت اپنا ڈیٹا قابلِ منتقلی شکل میں حاصل کریں؛\n\nاپنی رضامندی کسی بھی وقت واپس لیں؛\n\nترکی کے ڈیٹا پروٹیکشن ادارے یا یورپی یونین میں اپنی مقامی نگران اتھارٹی کے پاس شکایت درج کرائیں۔',
        },
        {
          heading: '8. ڈیٹا کی حفاظت',
          body:
            'ہم آپ کے ڈیٹا کو غیر مجاز رسائی، نقصان، تبدیلی یا افشا سے بچانے کے لیے مناسب تکنیکی اور انتظامی اقدامات کرتے ہیں، جن میں خفیہ کردہ کنکشنز (HTTPS/TLS)، رسائی کے کنٹرول اور معتبر انفراسٹرکچر فراہم کنندگان پر ہوسٹنگ شامل ہیں۔',
        },
        {
          heading: '9. پالیسی میں تبدیلیاں اور رابطہ',
          body:
            'ہم وقتاً فوقتاً اس پرائیویسی پالیسی کو اپ ڈیٹ کر سکتے ہیں؛ صفحے کے اوپر "آخری تازہ کاری" کی تاریخ تازہ ترین نظرثانی ظاہر کرتی ہے۔\n\nاپنے حقوق استعمال کرنے یا سوالات کے لیے رابطہ کریں:\n\nPakSoft — یوزگات، ترکی\nای میل: paksoft3@gmail.com\nفون: ‎+90 552 567 71 64\nویب سائٹ: https://www.paksofts.com',
        },
      ],
    },
  },

  // ==========================================================================
  // TERMS OF SERVICE
  // ==========================================================================
  terms: {
    en: {
      title: 'Terms of Service',
      lastUpdated: LAST_UPDATED,
      intro:
        'These Terms of Service ("Terms") govern your use of the website https://www.paksofts.com and the services offered by PakSoft, a software development and digital agency based in Yozgat, Turkey. By accessing our website or engaging our services, you agree to these Terms.',
      sections: [
        {
          heading: '1. About PakSoft and Our Services',
          body:
            'PakSoft provides software development and digital agency services, including but not limited to: web and mobile application development, e-commerce solutions, UI/UX design, custom software, SEO and digital marketing, and related consulting services.\n\nThe descriptions of services on our website are for general information. The exact scope, deliverables, timeline and price of any engagement are defined in the individual quote, proposal or contract agreed with each client.',
        },
        {
          heading: '2. Quotes, Proposals and Contracts',
          body:
            'Requests submitted through our website (e.g. the contact or start-project forms) are inquiries and do not create a binding agreement.\n\nWe will respond with a quote or proposal describing scope, deliverables, schedule and fees. A binding engagement arises only when both parties confirm the proposal in writing (including by email) or sign a service agreement.\n\nUnless otherwise agreed, quotes are valid for 30 days. Changes to scope after acceptance may require a revised quote and timeline.',
        },
        {
          heading: '3. Payments',
          body:
            'Payment terms (currency, installments, milestones, due dates) are specified in each quote or contract. Unless otherwise agreed, invoices are payable within the period stated on the invoice.\n\nWe may suspend work on a project if agreed payments are overdue, after giving reasonable notice.',
        },
        {
          heading: '4. Client Responsibilities',
          body:
            'To deliver projects on time, we rely on your cooperation. You agree to provide accurate information, timely feedback, and any content, credentials or access reasonably required for the project.\n\nYou are responsible for ensuring that materials you provide to us (texts, images, logos, data) do not infringe third-party rights and comply with applicable law.',
        },
        {
          heading: '5. Intellectual Property',
          body:
            'Website content: all content on https://www.paksofts.com — including text, graphics, logos, designs and code — is owned by PakSoft or its licensors and is protected by copyright and other intellectual property laws. You may not copy, reproduce or distribute it without our prior written permission.\n\nProject deliverables: unless otherwise agreed in the project contract, intellectual property rights in bespoke deliverables transfer to the client upon full payment. PakSoft retains the right to use general know-how, reusable components and open-source elements, and — unless the client objects — to reference the project in its portfolio.\n\nThird-party and open-source components remain subject to their own licenses.',
        },
        {
          heading: '6. Acceptable Use of the Website',
          body:
            'When using our website you agree not to:\n\nattempt to gain unauthorized access to the website, its servers or connected systems;\n\ninterfere with the website’s operation, including through malware, scraping at abusive rates, or denial-of-service activity;\n\nuse the website for unlawful, fraudulent or misleading purposes;\n\nsubmit content through our forms that is illegal, defamatory or infringes the rights of others.\n\nWe may restrict or block access for users who violate these rules.',
        },
        {
          heading: '7. Third-Party Links and Services',
          body:
            'Our website may contain links to third-party websites and services (for example social media platforms). We are not responsible for the content, privacy practices or availability of third-party sites. Accessing them is at your own risk and subject to their own terms.',
        },
        {
          heading: '8. Disclaimers and Limitation of Liability',
          body:
            'The website and its content are provided "as is" and "as available", without warranties of any kind regarding accuracy, completeness or uninterrupted availability.\n\nTo the maximum extent permitted by applicable law, PakSoft shall not be liable for indirect, incidental or consequential damages (including loss of profits, data or business) arising from the use of the website. For contracted services, our total liability is limited to the fees paid for the specific service giving rise to the claim, unless mandatory law provides otherwise or in cases of intent or gross negligence.\n\nNothing in these Terms excludes liability that cannot be excluded under applicable law, including mandatory consumer protection rules.',
        },
        {
          heading: '9. Governing Law and Jurisdiction',
          body:
            'These Terms and any dispute arising out of or in connection with the website or our services are governed by the laws of the Republic of Turkey. The courts and enforcement offices of Yozgat, Turkey shall have jurisdiction, without prejudice to any mandatory jurisdiction rules that apply to consumers.',
        },
        {
          heading: '10. Changes to These Terms and Contact',
          body:
            'We may update these Terms from time to time. The updated version becomes effective when published on this page, with the "Last updated" date revised accordingly. Continued use of the website after changes constitutes acceptance of the updated Terms.\n\nQuestions about these Terms? Contact us:\n\nPakSoft — Yozgat, Turkey\nEmail: paksoft3@gmail.com\nPhone: +90 552 567 71 64\nWebsite: https://www.paksofts.com',
        },
      ],
    },
    tr: {
      title: 'Kullanım Koşulları',
      lastUpdated: LAST_UPDATED,
      intro:
        'Bu Kullanım Koşulları ("Koşullar"), https://www.paksofts.com web sitesinin ve Yozgat, Türkiye merkezli bir yazılım geliştirme ve dijital ajans olan PakSoft tarafından sunulan hizmetlerin kullanımını düzenler. Web sitemize erişerek veya hizmetlerimizden yararlanarak bu Koşulları kabul etmiş olursunuz.',
      sections: [
        {
          heading: '1. PakSoft ve Hizmetlerimiz Hakkında',
          body:
            'PakSoft; web ve mobil uygulama geliştirme, e-ticaret çözümleri, UI/UX tasarımı, özel yazılım geliştirme, SEO ve dijital pazarlama ile ilgili danışmanlık hizmetleri dahil ancak bunlarla sınırlı olmamak üzere yazılım geliştirme ve dijital ajans hizmetleri sunar.\n\nWeb sitemizdeki hizmet açıklamaları genel bilgilendirme amaçlıdır. Herhangi bir işin kesin kapsamı, teslim edilecekler, takvim ve ücreti; her müşteriyle ayrı ayrı mutabık kalınan teklif, öneri veya sözleşmede belirlenir.',
        },
        {
          heading: '2. Teklifler ve Sözleşmeler',
          body:
            'Web sitemiz üzerinden iletilen talepler (ör. iletişim veya proje başlatma formları) yalnızca ön taleptir ve bağlayıcı bir sözleşme oluşturmaz.\n\nTalebinize kapsam, teslim edilecekler, takvim ve ücretleri içeren bir teklifle yanıt veririz. Bağlayıcı bir iş ilişkisi, ancak her iki tarafın teklifi yazılı olarak (e-posta dahil) onaylaması veya bir hizmet sözleşmesi imzalaması ile kurulur.\n\nAksi kararlaştırılmadıkça teklifler 30 gün geçerlidir. Kabulden sonra kapsamda yapılacak değişiklikler revize teklif ve takvim gerektirebilir.',
        },
        {
          heading: '3. Ödemeler',
          body:
            'Ödeme koşulları (para birimi, taksitler, aşama ödemeleri, vade tarihleri) her teklif veya sözleşmede belirtilir. Aksi kararlaştırılmadıkça faturalar, fatura üzerinde belirtilen süre içinde ödenir.\n\nKararlaştırılan ödemelerin gecikmesi hâlinde, makul bir bildirimin ardından projedeki çalışmaları askıya alabiliriz.',
        },
        {
          heading: '4. Müşteri Yükümlülükleri',
          body:
            'Projeleri zamanında teslim edebilmemiz iş birliğinize bağlıdır. Doğru bilgi vermeyi, zamanında geri bildirimde bulunmayı ve proje için makul ölçüde gerekli içerik, erişim ve kimlik bilgilerini sağlamayı kabul edersiniz.\n\nBize sağladığınız materyallerin (metinler, görseller, logolar, veriler) üçüncü kişilerin haklarını ihlal etmemesinden ve yürürlükteki mevzuata uygun olmasından siz sorumlusunuz.',
        },
        {
          heading: '5. Fikri Mülkiyet',
          body:
            'Web sitesi içeriği: https://www.paksofts.com üzerindeki tüm içerik — metinler, grafikler, logolar, tasarımlar ve kod dahil — PakSoft’a veya lisans verenlerine aittir ve telif hakkı ile diğer fikri mülkiyet mevzuatıyla korunur. Önceden yazılı iznimiz olmadan kopyalanamaz, çoğaltılamaz veya dağıtılamaz.\n\nProje teslimatları: Proje sözleşmesinde aksi kararlaştırılmadıkça, müşteriye özel geliştirilen teslimatlara ilişkin fikri mülkiyet hakları, ücretin tamamının ödenmesiyle müşteriye geçer. PakSoft; genel bilgi birikimini, yeniden kullanılabilir bileşenleri ve açık kaynak unsurları kullanma hakkını saklı tutar ve müşteri itiraz etmedikçe projeyi portföyünde referans olarak gösterebilir.\n\nÜçüncü taraf ve açık kaynak bileşenler kendi lisanslarına tabidir.',
        },
        {
          heading: '6. Web Sitesinin Kabul Edilebilir Kullanımı',
          body:
            'Web sitemizi kullanırken şunları yapmamayı kabul edersiniz:\n\nWeb sitesine, sunucularına veya bağlı sistemlere yetkisiz erişim sağlamaya çalışmak;\n\nKötü amaçlı yazılım, aşırı yoğunlukta veri kazıma veya hizmet engelleme faaliyetleri dahil olmak üzere sitenin işleyişine müdahale etmek;\n\nSiteyi hukuka aykırı, hileli veya yanıltıcı amaçlarla kullanmak;\n\nFormlarımız aracılığıyla hukuka aykırı, hakaret içeren veya başkalarının haklarını ihlal eden içerik göndermek.\n\nBu kurallara aykırı davranan kullanıcıların erişimini kısıtlayabilir veya engelleyebiliriz.',
        },
        {
          heading: '7. Üçüncü Taraf Bağlantıları ve Hizmetleri',
          body:
            'Web sitemiz üçüncü taraf web sitelerine ve hizmetlerine (örneğin sosyal medya platformlarına) bağlantılar içerebilir. Üçüncü taraf sitelerin içeriğinden, gizlilik uygulamalarından veya erişilebilirliğinden sorumlu değiliz. Bu sitelere erişim kendi sorumluluğunuzdadır ve ilgili sitelerin kendi koşullarına tabidir.',
        },
        {
          heading: '8. Sorumluluk Reddi ve Sorumluluğun Sınırlandırılması',
          body:
            'Web sitesi ve içeriği; doğruluk, eksiksizlik veya kesintisiz erişilebilirlik konusunda herhangi bir garanti verilmeksizin "olduğu gibi" ve "mevcut olduğu şekliyle" sunulur.\n\nYürürlükteki hukukun izin verdiği azami ölçüde PakSoft; web sitesinin kullanımından kaynaklanan dolaylı, arızi veya netice kabilinden zararlardan (kâr, veri veya iş kaybı dahil) sorumlu tutulamaz. Sözleşmeye bağlı hizmetlerde toplam sorumluluğumuz — emredici hukuk kuralları aksini öngörmedikçe ve kast veya ağır ihmal hâlleri hariç — talebe konu hizmet için ödenen ücretle sınırlıdır.\n\nBu Koşullardaki hiçbir hüküm, emredici tüketici koruma kuralları dahil, yürürlükteki hukuk uyarınca hariç tutulamayacak sorumlulukları ortadan kaldırmaz.',
        },
        {
          heading: '9. Uygulanacak Hukuk ve Yetkili Mahkeme',
          body:
            'Bu Koşullar ile web sitesi veya hizmetlerimizle bağlantılı her türlü uyuşmazlık Türkiye Cumhuriyeti hukukuna tabidir. Tüketicilere uygulanan emredici yetki kuralları saklı kalmak kaydıyla, Yozgat (Türkiye) mahkemeleri ve icra daireleri yetkilidir.',
        },
        {
          heading: '10. Koşullarda Değişiklik ve İletişim',
          body:
            'Bu Koşulları zaman zaman güncelleyebiliriz. Güncellenen sürüm bu sayfada yayımlandığı anda yürürlüğe girer ve "Son güncelleme" tarihi buna göre revize edilir. Değişikliklerden sonra web sitesini kullanmaya devam etmeniz güncel Koşulları kabul ettiğiniz anlamına gelir.\n\nBu Koşullarla ilgili sorularınız için bize ulaşın:\n\nPakSoft — Yozgat, Türkiye\nE-posta: paksoft3@gmail.com\nTelefon: +90 552 567 71 64\nWeb sitesi: https://www.paksofts.com',
        },
      ],
    },
    de: {
      title: 'Nutzungsbedingungen',
      lastUpdated: LAST_UPDATED,
      intro:
        'Diese Nutzungsbedingungen („Bedingungen“) regeln die Nutzung der Website https://www.paksofts.com und der Dienstleistungen von PakSoft, einer Softwareentwicklungs- und Digitalagentur mit Sitz in Yozgat, Türkei. Durch den Zugriff auf unsere Website oder die Beauftragung unserer Dienstleistungen erklären Sie sich mit diesen Bedingungen einverstanden.',
      sections: [
        {
          heading: '1. Über PakSoft und unsere Leistungen',
          body:
            'PakSoft erbringt Softwareentwicklungs- und Digitalagentur-Leistungen, darunter Web- und Mobile-App-Entwicklung, E-Commerce-Lösungen, UI/UX-Design, Individualsoftware, SEO und digitales Marketing sowie zugehörige Beratung.\n\nDie Leistungsbeschreibungen auf unserer Website dienen der allgemeinen Information. Der genaue Umfang, die Liefergegenstände, der Zeitplan und der Preis eines Auftrags werden im jeweiligen Angebot bzw. Vertrag mit dem Kunden festgelegt.',
        },
        {
          heading: '2. Angebote und Verträge',
          body:
            'Über unsere Website übermittelte Anfragen (z. B. Kontakt- oder Projektformulare) sind unverbindliche Anfragen und begründen keinen Vertrag.\n\nWir antworten mit einem Angebot, das Umfang, Liefergegenstände, Zeitplan und Vergütung beschreibt. Ein verbindlicher Auftrag kommt erst zustande, wenn beide Parteien das Angebot schriftlich (auch per E-Mail) bestätigen oder einen Dienstleistungsvertrag unterzeichnen.\n\nSofern nicht anders vereinbart, sind Angebote 30 Tage gültig. Änderungen des Umfangs nach Annahme können ein überarbeitetes Angebot und einen neuen Zeitplan erfordern.',
        },
        {
          heading: '3. Zahlungen',
          body:
            'Zahlungsbedingungen (Währung, Raten, Meilensteine, Fälligkeiten) werden im jeweiligen Angebot oder Vertrag festgelegt. Sofern nicht anders vereinbart, sind Rechnungen innerhalb der auf der Rechnung angegebenen Frist zu begleichen.\n\nBei Zahlungsverzug können wir die Arbeit an einem Projekt nach angemessener Vorankündigung aussetzen.',
        },
        {
          heading: '4. Mitwirkungspflichten des Kunden',
          body:
            'Für eine termingerechte Lieferung sind wir auf Ihre Mitwirkung angewiesen. Sie verpflichten sich, korrekte Informationen, zeitnahes Feedback sowie die für das Projekt erforderlichen Inhalte, Zugänge und Zugangsdaten bereitzustellen.\n\nSie sind dafür verantwortlich, dass die von Ihnen bereitgestellten Materialien (Texte, Bilder, Logos, Daten) keine Rechte Dritter verletzen und geltendem Recht entsprechen.',
        },
        {
          heading: '5. Geistiges Eigentum',
          body:
            'Website-Inhalte: Alle Inhalte auf https://www.paksofts.com — einschließlich Texte, Grafiken, Logos, Designs und Code — gehören PakSoft oder seinen Lizenzgebern und sind urheberrechtlich geschützt. Ohne unsere vorherige schriftliche Zustimmung dürfen sie nicht kopiert, vervielfältigt oder verbreitet werden.\n\nProjektergebnisse: Sofern im Projektvertrag nichts anderes vereinbart ist, gehen die Rechte an individuell erstellten Liefergegenständen mit vollständiger Bezahlung auf den Kunden über. PakSoft behält sich das Recht vor, allgemeines Know-how, wiederverwendbare Komponenten und Open-Source-Elemente zu nutzen und das Projekt — sofern der Kunde nicht widerspricht — als Referenz zu zeigen.\n\nKomponenten Dritter und Open-Source-Komponenten unterliegen ihren eigenen Lizenzen.',
        },
        {
          heading: '6. Zulässige Nutzung der Website',
          body:
            'Bei der Nutzung unserer Website verpflichten Sie sich, Folgendes zu unterlassen:\n\nunbefugte Zugriffsversuche auf die Website, ihre Server oder verbundene Systeme;\n\nBeeinträchtigung des Betriebs, etwa durch Schadsoftware, missbräuchliches Scraping oder Denial-of-Service-Aktivitäten;\n\nNutzung der Website zu rechtswidrigen, betrügerischen oder irreführenden Zwecken;\n\nÜbermittlung rechtswidriger, verleumderischer oder rechtsverletzender Inhalte über unsere Formulare.\n\nBei Verstößen können wir den Zugriff einschränken oder sperren.',
        },
        {
          heading: '7. Links und Dienste Dritter',
          body:
            'Unsere Website kann Links zu Websites und Diensten Dritter enthalten (z. B. Social-Media-Plattformen). Für deren Inhalte, Datenschutzpraktiken oder Verfügbarkeit sind wir nicht verantwortlich. Die Nutzung erfolgt auf eigenes Risiko und unterliegt den jeweiligen Bedingungen der Drittanbieter.',
        },
        {
          heading: '8. Haftungsausschluss und Haftungsbeschränkung',
          body:
            'Die Website und ihre Inhalte werden „wie besehen“ und „wie verfügbar“ bereitgestellt, ohne Gewähr für Richtigkeit, Vollständigkeit oder ununterbrochene Verfügbarkeit.\n\nSoweit gesetzlich zulässig, haftet PakSoft nicht für indirekte, zufällige oder Folgeschäden (einschließlich entgangenen Gewinns, Daten- oder Geschäftsverlusten) aus der Nutzung der Website. Bei beauftragten Leistungen ist unsere Gesamthaftung auf die für die betreffende Leistung gezahlte Vergütung beschränkt, sofern zwingendes Recht nichts anderes vorsieht oder Vorsatz bzw. grobe Fahrlässigkeit vorliegt.\n\nZwingende gesetzliche Haftungstatbestände, einschließlich zwingender Verbraucherschutzvorschriften, bleiben unberührt.',
        },
        {
          heading: '9. Anwendbares Recht und Gerichtsstand',
          body:
            'Diese Bedingungen und alle Streitigkeiten im Zusammenhang mit der Website oder unseren Dienstleistungen unterliegen dem Recht der Republik Türkei. Zuständig sind die Gerichte und Vollstreckungsbehörden in Yozgat, Türkei, unbeschadet zwingender Gerichtsstandsregeln für Verbraucher.',
        },
        {
          heading: '10. Änderungen dieser Bedingungen und Kontakt',
          body:
            'Wir können diese Bedingungen von Zeit zu Zeit aktualisieren. Die aktualisierte Fassung tritt mit Veröffentlichung auf dieser Seite in Kraft; das Datum „Zuletzt aktualisiert“ wird entsprechend angepasst. Die weitere Nutzung der Website nach Änderungen gilt als Zustimmung.\n\nFragen zu diesen Bedingungen? Kontaktieren Sie uns:\n\nPakSoft — Yozgat, Türkei\nE-Mail: paksoft3@gmail.com\nTelefon: +90 552 567 71 64\nWebsite: https://www.paksofts.com',
        },
      ],
    },
    ar: {
      title: 'شروط الخدمة',
      lastUpdated: LAST_UPDATED,
      intro:
        'تنظم شروط الخدمة هذه ("الشروط") استخدامك للموقع الإلكتروني https://www.paksofts.com والخدمات التي تقدمها PakSoft، وهي وكالة لتطوير البرمجيات والخدمات الرقمية مقرها يوزغات، تركيا. باستخدامك لموقعنا أو التعاقد على خدماتنا فإنك توافق على هذه الشروط.',
      sections: [
        {
          heading: '1. عن PakSoft وخدماتنا',
          body:
            'تقدم PakSoft خدمات تطوير البرمجيات والوكالة الرقمية، بما في ذلك على سبيل المثال لا الحصر: تطوير تطبيقات الويب والجوال، وحلول التجارة الإلكترونية، وتصميم واجهات وتجربة المستخدم، والبرمجيات المخصصة، وتحسين محركات البحث والتسويق الرقمي، والاستشارات ذات الصلة.\n\nأوصاف الخدمات على موقعنا هي للمعلومات العامة فقط؛ ويُحدَّد النطاق الدقيق والمخرجات والجدول الزمني والسعر في عرض السعر أو العقد المتفق عليه مع كل عميل.',
        },
        {
          heading: '2. عروض الأسعار والعقود',
          body:
            'الطلبات المرسلة عبر موقعنا (مثل نماذج التواصل أو بدء المشروع) هي استفسارات فقط ولا تُنشئ اتفاقًا ملزمًا.\n\nنرد بعرض سعر يوضح النطاق والمخرجات والجدول الزمني والرسوم. ولا ينشأ التزام تعاقدي إلا عندما يؤكد الطرفان العرض كتابيًا (بما في ذلك البريد الإلكتروني) أو يوقّعان اتفاقية خدمة.\n\nما لم يُتفق على خلاف ذلك، تسري عروض الأسعار لمدة 30 يومًا، وقد تتطلب التغييرات في النطاق بعد القبول عرضًا وجدولًا زمنيًا معدّلين.',
        },
        {
          heading: '3. المدفوعات',
          body:
            'تُحدَّد شروط الدفع (العملة، الأقساط، مراحل الدفع، تواريخ الاستحقاق) في كل عرض سعر أو عقد. وما لم يُتفق على خلاف ذلك، تُسدَّد الفواتير خلال المدة المذكورة فيها. ويجوز لنا تعليق العمل في المشروع عند تأخر المدفوعات المتفق عليها بعد إشعار معقول.',
        },
        {
          heading: '4. التزامات العميل',
          body:
            'يعتمد التسليم في الوقت المحدد على تعاونك. توافق على تقديم معلومات دقيقة وملاحظات في الوقت المناسب وأي محتوى أو صلاحيات وصول يتطلبها المشروع بشكل معقول.\n\nأنت مسؤول عن ضمان أن المواد التي تزودنا بها (نصوص، صور، شعارات، بيانات) لا تنتهك حقوق أطراف ثالثة وتتوافق مع القانون المعمول به.',
        },
        {
          heading: '5. الملكية الفكرية',
          body:
            'محتوى الموقع: جميع المحتويات على https://www.paksofts.com — بما في ذلك النصوص والرسومات والشعارات والتصاميم والأكواد — مملوكة لـ PakSoft أو للمرخِّصين لها ومحمية بقوانين حقوق النشر والملكية الفكرية، ولا يجوز نسخها أو توزيعها دون إذن كتابي مسبق.\n\nمخرجات المشاريع: ما لم يُتفق على خلاف ذلك في عقد المشروع، تنتقل حقوق الملكية الفكرية للمخرجات المطوّرة خصيصًا إلى العميل عند سداد كامل الرسوم. وتحتفظ PakSoft بحق استخدام المعرفة العامة والمكوّنات القابلة لإعادة الاستخدام وعناصر المصادر المفتوحة، وبعرض المشروع ضمن أعمالها ما لم يعترض العميل.\n\nتخضع مكوّنات الأطراف الثالثة والمصادر المفتوحة لتراخيصها الخاصة.',
        },
        {
          heading: '6. الاستخدام المقبول للموقع',
          body:
            'عند استخدام موقعنا، توافق على عدم:\n\nمحاولة الوصول غير المصرح به إلى الموقع أو خوادمه أو الأنظمة المتصلة به؛\n\nالتدخل في تشغيل الموقع عبر البرمجيات الخبيثة أو الكشط المفرط للبيانات أو هجمات حجب الخدمة؛\n\nاستخدام الموقع لأغراض غير قانونية أو احتيالية أو مضللة؛\n\nإرسال محتوى غير قانوني أو تشهيري أو منتهك لحقوق الآخرين عبر نماذجنا.\n\nويجوز لنا تقييد أو حظر وصول المستخدمين المخالفين.',
        },
        {
          heading: '7. روابط وخدمات الأطراف الثالثة',
          body:
            'قد يحتوي موقعنا على روابط لمواقع وخدمات أطراف ثالثة (مثل منصات التواصل الاجتماعي). لسنا مسؤولين عن محتواها أو ممارسات الخصوصية فيها أو توافرها، ويكون الوصول إليها على مسؤوليتك الخاصة ووفق شروطها.',
        },
        {
          heading: '8. إخلاء المسؤولية وتحديدها',
          body:
            'يُقدَّم الموقع ومحتواه "كما هو" و"حسب التوافر" دون أي ضمانات بشأن الدقة أو الاكتمال أو التوافر دون انقطاع.\n\nوإلى الحد الأقصى الذي يسمح به القانون، لا تتحمل PakSoft المسؤولية عن الأضرار غير المباشرة أو العرضية أو التبعية (بما في ذلك خسارة الأرباح أو البيانات أو الأعمال) الناشئة عن استخدام الموقع. وفي الخدمات المتعاقد عليها، تقتصر مسؤوليتنا الإجمالية على الرسوم المدفوعة عن الخدمة محل المطالبة، ما لم ينص القانون الإلزامي على خلاف ذلك أو في حالات العمد أو الإهمال الجسيم.',
        },
        {
          heading: '9. القانون الواجب التطبيق والاختصاص القضائي',
          body:
            'تخضع هذه الشروط وأي نزاع ينشأ عن الموقع أو خدماتنا لقوانين الجمهورية التركية، وتختص محاكم ودوائر التنفيذ في يوزغات، تركيا بالنظر في النزاعات، مع عدم الإخلال بقواعد الاختصاص الإلزامية المطبقة على المستهلكين.',
        },
        {
          heading: '10. تعديل الشروط والتواصل',
          body:
            'قد نُحدِّث هذه الشروط من وقت لآخر، وتسري النسخة المحدثة فور نشرها على هذه الصفحة مع تعديل تاريخ "آخر تحديث". ويُعد استمرارك في استخدام الموقع بعد التغييرات قبولًا للشروط المحدثة.\n\nللاستفسارات:\n\nPakSoft — يوزغات، تركيا\nالبريد الإلكتروني: paksoft3@gmail.com\nالهاتف: ‎+90 552 567 71 64\nالموقع: https://www.paksofts.com',
        },
      ],
    },
    ur: {
      title: 'سروس کی شرائط',
      lastUpdated: LAST_UPDATED,
      intro:
        'یہ سروس کی شرائط ("شرائط") ویب سائٹ https://www.paksofts.com اور PakSoft — یوزگات، ترکی میں قائم ایک سافٹ ویئر ڈیویلپمنٹ اور ڈیجیٹل ایجنسی — کی خدمات کے استعمال کو منظم کرتی ہیں۔ ہماری ویب سائٹ استعمال کرکے یا ہماری خدمات حاصل کرکے آپ ان شرائط سے اتفاق کرتے ہیں۔',
      sections: [
        {
          heading: '1. PakSoft اور ہماری خدمات',
          body:
            'PakSoft سافٹ ویئر ڈیویلپمنٹ اور ڈیجیٹل ایجنسی کی خدمات فراہم کرتا ہے، جن میں ویب اور موبائل ایپ ڈیویلپمنٹ، ای کامرس حل، UI/UX ڈیزائن، کسٹم سافٹ ویئر، SEO اور ڈیجیٹل مارکیٹنگ اور متعلقہ مشاورت شامل ہیں۔\n\nویب سائٹ پر خدمات کی تفصیل عمومی معلومات کے لیے ہے؛ کسی بھی کام کا حتمی دائرہ کار، ڈیلیوری، شیڈول اور قیمت ہر کلائنٹ کے ساتھ طے شدہ کوٹیشن یا معاہدے میں متعین ہوتی ہے۔',
        },
        {
          heading: '2. کوٹیشن اور معاہدے',
          body:
            'ویب سائٹ کے ذریعے بھیجی گئی درخواستیں (مثلاً رابطہ یا پراجیکٹ فارم) صرف استفسار ہیں اور کوئی پابند معاہدہ تشکیل نہیں دیتیں۔\n\nہم دائرہ کار، ڈیلیوری، شیڈول اور فیس پر مشتمل کوٹیشن کے ساتھ جواب دیتے ہیں۔ پابند معاہدہ صرف اس وقت وجود میں آتا ہے جب دونوں فریق تحریری طور پر (بشمول ای میل) کوٹیشن کی توثیق کریں یا سروس معاہدے پر دستخط کریں۔\n\nبصورتِ دیگر طے نہ ہو تو کوٹیشن 30 دن کے لیے کارآمد ہوتی ہے؛ قبولیت کے بعد دائرہ کار میں تبدیلی کے لیے نظرثانی شدہ کوٹیشن اور شیڈول درکار ہو سکتا ہے۔',
        },
        {
          heading: '3. ادائیگیاں',
          body:
            'ادائیگی کی شرائط (کرنسی، اقساط، مراحل، مقررہ تاریخیں) ہر کوٹیشن یا معاہدے میں درج ہوتی ہیں۔ طے شدہ ادائیگیوں میں تاخیر کی صورت میں، معقول اطلاع کے بعد ہم پراجیکٹ پر کام معطل کر سکتے ہیں۔',
        },
        {
          heading: '4. کلائنٹ کی ذمہ داریاں',
          body:
            'بروقت ڈیلیوری آپ کے تعاون پر منحصر ہے۔ آپ درست معلومات، بروقت فیڈبیک اور پراجیکٹ کے لیے معقول حد تک درکار مواد اور رسائی فراہم کرنے سے اتفاق کرتے ہیں۔\n\nآپ اس بات کے ذمہ دار ہیں کہ آپ کا فراہم کردہ مواد (تحریریں، تصاویر، لوگو، ڈیٹا) کسی تیسرے فریق کے حقوق کی خلاف ورزی نہ کرے اور قابل اطلاق قانون کے مطابق ہو۔',
        },
        {
          heading: '5. دانشورانہ املاک',
          body:
            'ویب سائٹ کا مواد: https://www.paksofts.com پر موجود تمام مواد — بشمول تحریریں، گرافکس، لوگو، ڈیزائن اور کوڈ — PakSoft یا اس کے لائسنس دہندگان کی ملکیت ہے اور کاپی رائٹ قوانین سے محفوظ ہے؛ ہماری پیشگی تحریری اجازت کے بغیر اسے نقل یا تقسیم نہیں کیا جا سکتا۔\n\nپراجیکٹ ڈیلیوری ایبلز: معاہدے میں بصورتِ دیگر طے نہ ہو تو، خصوصی طور پر تیار کردہ ڈیلیوری ایبلز کے حقوق مکمل ادائیگی پر کلائنٹ کو منتقل ہو جاتے ہیں۔ PakSoft عمومی مہارت، دوبارہ قابل استعمال اجزاء اور اوپن سورس عناصر استعمال کرنے اور — کلائنٹ کے اعتراض نہ ہونے پر — پراجیکٹ کو اپنے پورٹ فولیو میں دکھانے کا حق محفوظ رکھتا ہے۔',
        },
        {
          heading: '6. ویب سائٹ کا قابل قبول استعمال',
          body:
            'ویب سائٹ استعمال کرتے ہوئے آپ اتفاق کرتے ہیں کہ:\n\nویب سائٹ، اس کے سرورز یا منسلک سسٹمز تک غیر مجاز رسائی کی کوشش نہیں کریں گے؛\n\nمیلویئر، حد سے زیادہ ڈیٹا سکریپنگ یا سروس معطل کرنے والی سرگرمیوں کے ذریعے سائٹ کے کام میں مداخلت نہیں کریں گے؛\n\nسائٹ کو غیر قانونی، دھوکہ دہی پر مبنی یا گمراہ کن مقاصد کے لیے استعمال نہیں کریں گے؛\n\nفارمز کے ذریعے غیر قانونی یا دوسروں کے حقوق کی خلاف ورزی کرنے والا مواد نہیں بھیجیں گے۔\n\nخلاف ورزی پر ہم رسائی محدود یا بند کر سکتے ہیں۔',
        },
        {
          heading: '7. تیسرے فریق کے روابط اور خدمات',
          body:
            'ہماری ویب سائٹ پر تیسرے فریق کی ویب سائٹس اور خدمات (مثلاً سوشل میڈیا پلیٹ فارمز) کے لنکس ہو سکتے ہیں۔ ان کے مواد، پرائیویسی طریقوں یا دستیابی کے ہم ذمہ دار نہیں؛ ان تک رسائی آپ کی اپنی ذمہ داری پر اور ان کی اپنی شرائط کے تحت ہوگی۔',
        },
        {
          heading: '8. دستبرداری اور ذمہ داری کی حد',
          body:
            'ویب سائٹ اور اس کا مواد "جیسا ہے" اور "جیسا دستیاب ہے" کی بنیاد پر فراہم کیا جاتا ہے، درستگی، مکمل ہونے یا بلاتعطل دستیابی کی کسی ضمانت کے بغیر۔\n\nقابل اطلاق قانون کی زیادہ سے زیادہ اجازت کی حد تک، PakSoft ویب سائٹ کے استعمال سے پیدا ہونے والے بالواسطہ یا تبعی نقصانات (بشمول منافع، ڈیٹا یا کاروبار کا نقصان) کا ذمہ دار نہیں ہوگا۔ معاہدہ شدہ خدمات میں ہماری کل ذمہ داری متعلقہ خدمت کے لیے ادا کی گئی فیس تک محدود ہے، سوائے اس کے کہ لازمی قانون مختلف تقاضا کرے یا عمد یا سنگین غفلت کی صورت ہو۔',
        },
        {
          heading: '9. قابل اطلاق قانون اور دائرہ اختیار',
          body:
            'یہ شرائط اور ویب سائٹ یا ہماری خدمات سے متعلق کوئی بھی تنازع جمہوریہ ترکی کے قوانین کے تابع ہے۔ یوزگات، ترکی کی عدالتیں اور نفاذی دفاتر بااختیار ہوں گے، صارفین پر لاگو لازمی دائرہ اختیار کے قواعد متاثر نہیں ہوں گے۔',
        },
        {
          heading: '10. شرائط میں تبدیلی اور رابطہ',
          body:
            'ہم وقتاً فوقتاً ان شرائط کو اپ ڈیٹ کر سکتے ہیں؛ نظرثانی شدہ نسخہ اس صفحے پر شائع ہوتے ہی مؤثر ہو جاتا ہے اور "آخری تازہ کاری" کی تاریخ تبدیل کر دی جاتی ہے۔ تبدیلیوں کے بعد ویب سائٹ کا استعمال جاری رکھنا اپ ڈیٹ شدہ شرائط کی قبولیت تصور ہوگا۔\n\nرابطہ:\n\nPakSoft — یوزگات، ترکی\nای میل: paksoft3@gmail.com\nفون: ‎+90 552 567 71 64\nویب سائٹ: https://www.paksofts.com',
        },
      ],
    },
  },

  // ==========================================================================
  // COOKIE POLICY
  // ==========================================================================
  cookies: {
    en: {
      title: 'Cookie Policy',
      lastUpdated: LAST_UPDATED,
      intro:
        'This Cookie Policy explains how PakSoft ("we") uses cookies and similar technologies on https://www.paksofts.com, what types of cookies we use, and how you can manage your preferences. It should be read together with our Privacy Policy.',
      sections: [
        {
          heading: '1. What Are Cookies?',
          body:
            'Cookies are small text files that a website stores on your device (computer, tablet or phone) when you visit. They are widely used to make websites work, remember your preferences, and provide information to site owners.\n\nSimilar technologies — such as tracking pixels, tags and local storage — serve comparable purposes; in this policy we refer to all of them as "cookies".',
        },
        {
          heading: '2. How We Use Cookies',
          body:
            'We use cookies to:\n\nkeep the website working correctly and securely (e.g. remembering your language and consent choices);\n\nunderstand how visitors use the site so we can improve it (analytics);\n\nmeasure the effectiveness of our advertising and show relevant ads on platforms such as Google, Meta, LinkedIn and TikTok (marketing).',
        },
        {
          heading: '3. Necessary Cookies',
          body:
            'These cookies are essential for the website to function and cannot be switched off in our systems. They do not require consent.\n\nNEXT_LOCALE — remembers your selected language (persistent, up to 12 months).\n\npaksoft_cookie_consent — stores your cookie-consent choices (persistent, up to 12 months).\n\nSession cookies — short-lived cookies used for secure operation of restricted areas of the site; deleted when you close your browser or when the session expires.',
        },
        {
          heading: '4. Analytics Cookies',
          body:
            'Set only with your consent. They help us understand site usage in aggregate.\n\n_ga, _ga_* — Google Analytics 4; distinguishes visitors and sessions (up to 24 months).\n\n_clck, _clsk — Microsoft Clarity (where active); session recording and heatmap analysis (up to 12 months).\n\n_hjSessionUser_*, _hjSession_* — Hotjar (where active); behavior analytics (up to 12 months).',
        },
        {
          heading: '5. Marketing Cookies',
          body:
            'Set only with your consent. They are used to measure ad performance and build advertising audiences.\n\n_gcl_au — Google Ads conversion measurement (about 3 months).\n\n_fbp, _fbc (and the legacy _fbq identifier) — Meta/Facebook Pixel; ad measurement and audiences (about 3 months).\n\nli_sugr, bcookie, UserMatchHistory — LinkedIn Insight Tag; B2B ad measurement (up to 12 months).\n\n_ttp, _tt_enable_cookie — TikTok Pixel; ad measurement (about 13 months).',
        },
        {
          heading: '6. Third-Party Cookies',
          body:
            'Analytics and marketing cookies are set by third parties (Google, Meta, LinkedIn, TikTok, Microsoft/Hotjar) acting under their own privacy policies. These providers may combine the data with other information they hold and may process it outside Turkey and the EEA. Please review their privacy policies for details.',
        },
        {
          heading: '7. Managing and Withdrawing Consent',
          body:
            'When you first visit our site, a cookie banner lets you accept all cookies, decline optional cookies, or customize your choices per category. Necessary cookies are always active.\n\nYou can change or withdraw your consent at any time by reopening the cookie settings from the banner/footer, or by clearing the paksoft_cookie_consent cookie in your browser — the banner will then appear again.\n\nYou can also control cookies through your browser settings (block, delete, or receive warnings about cookies). Note that blocking necessary cookies may prevent parts of the site from working. Opt-out tools are also offered by the providers themselves, e.g. the Google Analytics opt-out browser add-on.',
        },
        {
          heading: '8. Cookie Lifetimes',
          body:
            'Session cookies are deleted when you close your browser. Persistent cookies remain on your device for the period indicated in Sections 3–5 (typically between 3 and 24 months) or until you delete them.',
        },
        {
          heading: '9. More Information and Contact',
          body:
            'For details on how we process personal data collected via cookies — including your KVKK and GDPR rights — please see our Privacy Policy at /privacy-policy.\n\nQuestions about this Cookie Policy? Contact us:\n\nPakSoft — Yozgat, Turkey\nEmail: paksoft3@gmail.com\nPhone: +90 552 567 71 64\nWebsite: https://www.paksofts.com\n\nWe may update this Cookie Policy from time to time; the "Last updated" date shows the latest revision.',
        },
      ],
    },
    tr: {
      title: 'Çerez Politikası',
      lastUpdated: LAST_UPDATED,
      intro:
        'Bu Çerez Politikası; PakSoft’un ("biz") https://www.paksofts.com adresinde çerezleri ve benzeri teknolojileri nasıl kullandığını, hangi tür çerezleri kullandığımızı ve tercihlerinizi nasıl yönetebileceğinizi açıklar. Bu politika, Gizlilik Politikamızla birlikte okunmalıdır.',
      sections: [
        {
          heading: '1. Çerez Nedir?',
          body:
            'Çerezler, bir web sitesini ziyaret ettiğinizde cihazınıza (bilgisayar, tablet veya telefon) kaydedilen küçük metin dosyalarıdır. Web sitelerinin çalışmasını sağlamak, tercihlerinizi hatırlamak ve site sahiplerine bilgi sunmak için yaygın olarak kullanılırlar.\n\nTakip pikselleri, etiketler ve yerel depolama gibi benzer teknolojiler de aynı amaçlara hizmet eder; bu politikada bunların tümü "çerez" olarak anılır.',
        },
        {
          heading: '2. Çerezleri Nasıl Kullanıyoruz?',
          body:
            'Çerezleri şu amaçlarla kullanırız:\n\nWeb sitesinin doğru ve güvenli çalışmasını sağlamak (ör. dil ve onay tercihlerinizin hatırlanması);\n\nZiyaretçilerin siteyi nasıl kullandığını anlayarak siteyi iyileştirmek (analiz);\n\nReklamlarımızın etkinliğini ölçmek ve Google, Meta, LinkedIn ve TikTok gibi platformlarda ilgili reklamlar göstermek (pazarlama).',
        },
        {
          heading: '3. Zorunlu Çerezler',
          body:
            'Bu çerezler web sitesinin çalışması için zorunludur ve sistemlerimizde kapatılamaz. Onay gerektirmezler.\n\nNEXT_LOCALE — seçtiğiniz dili hatırlar (kalıcı, en fazla 12 ay).\n\npaksoft_cookie_consent — çerez onay tercihlerinizi saklar (kalıcı, en fazla 12 ay).\n\nOturum çerezleri — sitenin kısıtlı alanlarının güvenli çalışması için kullanılan kısa ömürlü çerezler; tarayıcıyı kapattığınızda veya oturum sona erdiğinde silinir.',
        },
        {
          heading: '4. Analiz Çerezleri',
          body:
            'Yalnızca onayınızla etkinleştirilir. Site kullanımını toplu olarak anlamamıza yardımcı olurlar.\n\n_ga, _ga_* — Google Analytics 4; ziyaretçileri ve oturumları ayırt eder (en fazla 24 ay).\n\n_clck, _clsk — Microsoft Clarity (aktifse); oturum kaydı ve ısı haritası analizi (en fazla 12 ay).\n\n_hjSessionUser_*, _hjSession_* — Hotjar (aktifse); davranış analizi (en fazla 12 ay).',
        },
        {
          heading: '5. Pazarlama Çerezleri',
          body:
            'Yalnızca onayınızla etkinleştirilir. Reklam performansını ölçmek ve reklam kitleleri oluşturmak için kullanılır.\n\n_gcl_au — Google Ads dönüşüm ölçümü (yaklaşık 3 ay).\n\n_fbp, _fbc (ve eski _fbq tanımlayıcısı) — Meta/Facebook Pixel; reklam ölçümü ve kitleler (yaklaşık 3 ay).\n\nli_sugr, bcookie, UserMatchHistory — LinkedIn Insight Tag; B2B reklam ölçümü (en fazla 12 ay).\n\n_ttp, _tt_enable_cookie — TikTok Pixel; reklam ölçümü (yaklaşık 13 ay).',
        },
        {
          heading: '6. Üçüncü Taraf Çerezleri',
          body:
            'Analiz ve pazarlama çerezleri; kendi gizlilik politikaları çerçevesinde hareket eden üçüncü taraflarca (Google, Meta, LinkedIn, TikTok, Microsoft/Hotjar) yerleştirilir. Bu sağlayıcılar verileri ellerindeki diğer bilgilerle birleştirebilir ve Türkiye ile AEA dışında işleyebilir. Ayrıntılar için lütfen ilgili sağlayıcıların gizlilik politikalarını inceleyin.',
        },
        {
          heading: '7. Onayı Yönetme ve Geri Çekme',
          body:
            'Sitemizi ilk ziyaretinizde çerez bandı; tüm çerezleri kabul etmenize, isteğe bağlı çerezleri reddetmenize veya kategori bazında seçim yapmanıza olanak tanır. Zorunlu çerezler her zaman aktiftir.\n\nOnayınızı dilediğiniz zaman değiştirebilir veya geri çekebilirsiniz: çerez ayarlarını banttan/alt bilgiden yeniden açabilir veya tarayıcınızdan paksoft_cookie_consent çerezini silebilirsiniz — bant yeniden görünecektir.\n\nÇerezleri tarayıcı ayarlarınızdan da yönetebilirsiniz (engelleme, silme veya uyarı alma). Zorunlu çerezlerin engellenmesi sitenin bazı bölümlerinin çalışmamasına neden olabilir. Sağlayıcıların kendi devre dışı bırakma araçları da mevcuttur; örneğin Google Analytics devre dışı bırakma tarayıcı eklentisi.',
        },
        {
          heading: '8. Çerez Süreleri',
          body:
            'Oturum çerezleri tarayıcıyı kapattığınızda silinir. Kalıcı çerezler, 3–5. bölümlerde belirtilen süre boyunca (genellikle 3 ila 24 ay) veya siz silene kadar cihazınızda kalır.',
        },
        {
          heading: '9. Daha Fazla Bilgi ve İletişim',
          body:
            'Çerezler aracılığıyla toplanan kişisel verileri nasıl işlediğimize dair ayrıntılar — KVKK ve GDPR kapsamındaki haklarınız dahil — için lütfen /privacy-policy adresindeki Gizlilik Politikamıza bakın.\n\nBu Çerez Politikası hakkında sorularınız için bize ulaşın:\n\nPakSoft — Yozgat, Türkiye\nE-posta: paksoft3@gmail.com\nTelefon: +90 552 567 71 64\nWeb sitesi: https://www.paksofts.com\n\nBu Çerez Politikasını zaman zaman güncelleyebiliriz; "Son güncelleme" tarihi en son revizyonu gösterir.',
        },
      ],
    },
    de: {
      title: 'Cookie-Richtlinie',
      lastUpdated: LAST_UPDATED,
      intro:
        'Diese Cookie-Richtlinie erläutert, wie PakSoft („wir“) auf https://www.paksofts.com Cookies und ähnliche Technologien einsetzt, welche Arten von Cookies wir verwenden und wie Sie Ihre Einstellungen verwalten können. Sie ist zusammen mit unserer Datenschutzerklärung zu lesen.',
      sections: [
        {
          heading: '1. Was sind Cookies?',
          body:
            'Cookies sind kleine Textdateien, die eine Website beim Besuch auf Ihrem Gerät (Computer, Tablet oder Telefon) speichert. Sie werden häufig verwendet, um Websites funktionsfähig zu machen, Ihre Einstellungen zu speichern und Informationen an Website-Betreiber zu liefern.\n\nÄhnliche Technologien — etwa Tracking-Pixel, Tags und Local Storage — dienen vergleichbaren Zwecken; in dieser Richtlinie bezeichnen wir sie alle als „Cookies“.',
        },
        {
          heading: '2. Wie wir Cookies verwenden',
          body:
            'Wir verwenden Cookies, um:\n\nden korrekten und sicheren Betrieb der Website sicherzustellen (z. B. Speicherung Ihrer Sprach- und Einwilligungsauswahl);\n\nzu verstehen, wie Besucher die Website nutzen, um sie zu verbessern (Analyse);\n\ndie Wirksamkeit unserer Werbung zu messen und relevante Anzeigen auf Plattformen wie Google, Meta, LinkedIn und TikTok auszuspielen (Marketing).',
        },
        {
          heading: '3. Notwendige Cookies',
          body:
            'Diese Cookies sind für den Betrieb der Website unerlässlich und können nicht deaktiviert werden. Sie erfordern keine Einwilligung.\n\nNEXT_LOCALE — speichert Ihre Sprachauswahl (persistent, bis zu 12 Monate).\n\npaksoft_cookie_consent — speichert Ihre Cookie-Einwilligungsauswahl (persistent, bis zu 12 Monate).\n\nSitzungscookies — kurzlebige Cookies für den sicheren Betrieb geschützter Bereiche der Website; sie werden beim Schließen des Browsers oder nach Ablauf der Sitzung gelöscht.',
        },
        {
          heading: '4. Analyse-Cookies',
          body:
            'Werden nur mit Ihrer Einwilligung gesetzt. Sie helfen uns, die Nutzung der Website aggregiert zu verstehen.\n\n_ga, _ga_* — Google Analytics 4; unterscheidet Besucher und Sitzungen (bis zu 24 Monate).\n\n_clck, _clsk — Microsoft Clarity (sofern aktiv); Sitzungsaufzeichnung und Heatmap-Analyse (bis zu 12 Monate).\n\n_hjSessionUser_*, _hjSession_* — Hotjar (sofern aktiv); Verhaltensanalyse (bis zu 12 Monate).',
        },
        {
          heading: '5. Marketing-Cookies',
          body:
            'Werden nur mit Ihrer Einwilligung gesetzt. Sie dienen der Messung der Anzeigenleistung und dem Aufbau von Werbezielgruppen.\n\n_gcl_au — Google Ads Conversion-Messung (ca. 3 Monate).\n\n_fbp, _fbc (sowie die ältere Kennung _fbq) — Meta/Facebook Pixel; Werbemessung und Zielgruppen (ca. 3 Monate).\n\nli_sugr, bcookie, UserMatchHistory — LinkedIn Insight Tag; B2B-Werbemessung (bis zu 12 Monate).\n\n_ttp, _tt_enable_cookie — TikTok Pixel; Werbemessung (ca. 13 Monate).',
        },
        {
          heading: '6. Cookies von Drittanbietern',
          body:
            'Analyse- und Marketing-Cookies werden von Dritten gesetzt (Google, Meta, LinkedIn, TikTok, Microsoft/Hotjar), die nach ihren eigenen Datenschutzrichtlinien handeln. Diese Anbieter können die Daten mit anderen ihnen vorliegenden Informationen kombinieren und außerhalb der Türkei und des EWR verarbeiten. Bitte lesen Sie deren Datenschutzrichtlinien für Einzelheiten.',
        },
        {
          heading: '7. Einwilligung verwalten und widerrufen',
          body:
            'Beim ersten Besuch unserer Website können Sie über das Cookie-Banner alle Cookies akzeptieren, optionale Cookies ablehnen oder Ihre Auswahl je Kategorie anpassen. Notwendige Cookies sind immer aktiv.\n\nSie können Ihre Einwilligung jederzeit ändern oder widerrufen, indem Sie die Cookie-Einstellungen erneut öffnen oder das Cookie paksoft_cookie_consent in Ihrem Browser löschen — das Banner erscheint dann erneut.\n\nSie können Cookies auch über Ihre Browsereinstellungen steuern (blockieren, löschen oder Warnungen erhalten). Das Blockieren notwendiger Cookies kann die Funktion von Teilen der Website beeinträchtigen. Auch die Anbieter selbst bieten Opt-out-Tools an, z. B. das Browser-Add-on zur Deaktivierung von Google Analytics.',
        },
        {
          heading: '8. Speicherdauer von Cookies',
          body:
            'Sitzungscookies werden beim Schließen des Browsers gelöscht. Persistente Cookies verbleiben für die in den Abschnitten 3–5 angegebene Dauer (in der Regel 3 bis 24 Monate) oder bis zu ihrer Löschung auf Ihrem Gerät.',
        },
        {
          heading: '9. Weitere Informationen und Kontakt',
          body:
            'Einzelheiten zur Verarbeitung der über Cookies erhobenen personenbezogenen Daten — einschließlich Ihrer Rechte nach KVKK und DSGVO — finden Sie in unserer Datenschutzerklärung unter /privacy-policy.\n\nFragen zu dieser Cookie-Richtlinie? Kontaktieren Sie uns:\n\nPakSoft — Yozgat, Türkei\nE-Mail: paksoft3@gmail.com\nTelefon: +90 552 567 71 64\nWebsite: https://www.paksofts.com\n\nWir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren; das Datum „Zuletzt aktualisiert“ zeigt die letzte Revision.',
        },
      ],
    },
    ar: {
      title: 'سياسة ملفات تعريف الارتباط (الكوكيز)',
      lastUpdated: LAST_UPDATED,
      intro:
        'توضح سياسة الكوكيز هذه كيفية استخدام PakSoft للكوكيز والتقنيات المشابهة على الموقع https://www.paksofts.com، وأنواع الكوكيز المستخدمة، وكيفية إدارة تفضيلاتك. ويُنصح بقراءتها مع سياسة الخصوصية الخاصة بنا.',
      sections: [
        {
          heading: '1. ما هي الكوكيز؟',
          body:
            'الكوكيز هي ملفات نصية صغيرة يخزنها الموقع على جهازك (حاسوب أو جهاز لوحي أو هاتف) عند زيارتك. وتُستخدم على نطاق واسع لتشغيل المواقع وتذكّر تفضيلاتك وتزويد أصحاب المواقع بالمعلومات. وتشمل هذه السياسة أيضًا التقنيات المشابهة مثل بكسلات التتبع والتخزين المحلي، ونشير إليها جميعًا بمصطلح "الكوكيز".',
        },
        {
          heading: '2. كيف نستخدم الكوكيز',
          body:
            'نستخدم الكوكيز من أجل:\n\nضمان عمل الموقع بشكل صحيح وآمن (مثل حفظ اللغة وخيارات الموافقة)؛\n\nفهم كيفية استخدام الزوار للموقع بهدف تحسينه (التحليلات)؛\n\nقياس فعالية إعلاناتنا وعرض إعلانات ذات صلة على منصات مثل Google وMeta وLinkedIn وTikTok (التسويق).',
        },
        {
          heading: '3. الكوكيز الضرورية',
          body:
            'هذه الكوكيز أساسية لعمل الموقع ولا يمكن إيقافها ولا تتطلب موافقة:\n\nNEXT_LOCALE — يحفظ اللغة المختارة (دائم، حتى 12 شهرًا).\n\npaksoft_cookie_consent — يخزن خيارات موافقتك على الكوكيز (دائم، حتى 12 شهرًا).\n\nكوكيز الجلسة — كوكيز قصيرة الأمد للتشغيل الآمن للمناطق المحمية من الموقع؛ تُحذف عند إغلاق المتصفح أو انتهاء الجلسة.',
        },
        {
          heading: '4. كوكيز التحليلات',
          body:
            'تُفعَّل فقط بموافقتك وتساعدنا على فهم استخدام الموقع بشكل إجمالي:\n\n_ga و_ga_* — Google Analytics 4؛ للتمييز بين الزوار والجلسات (حتى 24 شهرًا).\n\n_clck و_clsk — Microsoft Clarity (عند تفعيله)؛ تسجيل الجلسات وتحليل الخرائط الحرارية (حتى 12 شهرًا).\n\n_hjSessionUser_* و_hjSession_* — Hotjar (عند تفعيله)؛ تحليلات السلوك (حتى 12 شهرًا).',
        },
        {
          heading: '5. كوكيز التسويق',
          body:
            'تُفعَّل فقط بموافقتك وتُستخدم لقياس أداء الإعلانات وبناء الجماهير الإعلانية:\n\n_gcl_au — قياس تحويلات Google Ads (نحو 3 أشهر).\n\n_fbp و_fbc (والمعرّف القديم _fbq) — بكسل Meta/Facebook؛ قياس الإعلانات والجماهير (نحو 3 أشهر).\n\nli_sugr وbcookie وUserMatchHistory — LinkedIn Insight Tag (حتى 12 شهرًا).\n\n_ttp و_tt_enable_cookie — بكسل TikTok (نحو 13 شهرًا).',
        },
        {
          heading: '6. كوكيز الأطراف الثالثة',
          body:
            'تُوضع كوكيز التحليلات والتسويق من قِبل أطراف ثالثة (Google وMeta وLinkedIn وTikTok وMicrosoft/Hotjar) وفق سياسات الخصوصية الخاصة بها. وقد تدمج هذه الجهات البيانات مع معلومات أخرى لديها وقد تعالجها خارج تركيا والمنطقة الاقتصادية الأوروبية. يُرجى مراجعة سياساتها للمزيد من التفاصيل.',
        },
        {
          heading: '7. إدارة الموافقة وسحبها',
          body:
            'عند زيارتك الأولى لموقعنا، يتيح لك شريط الكوكيز قبول جميع الكوكيز أو رفض الكوكيز الاختيارية أو تخصيص اختياراتك حسب الفئة. الكوكيز الضرورية تبقى مفعّلة دائمًا.\n\nيمكنك تغيير موافقتك أو سحبها في أي وقت بإعادة فتح إعدادات الكوكيز أو بحذف كوكي paksoft_cookie_consent من متصفحك — وسيظهر الشريط مجددًا.\n\nكما يمكنك التحكم في الكوكيز من إعدادات متصفحك (الحظر أو الحذف أو التنبيه)، علمًا بأن حظر الكوكيز الضرورية قد يعطّل أجزاء من الموقع.',
        },
        {
          heading: '8. مدد بقاء الكوكيز',
          body:
            'تُحذف كوكيز الجلسة عند إغلاق المتصفح، بينما تبقى الكوكيز الدائمة على جهازك للمدة المبينة في الأقسام 3–5 (عادة من 3 إلى 24 شهرًا) أو حتى تحذفها بنفسك.',
        },
        {
          heading: '9. مزيد من المعلومات والتواصل',
          body:
            'لمعرفة كيفية معالجتنا للبيانات الشخصية المجموعة عبر الكوكيز — بما في ذلك حقوقك بموجب KVKK وGDPR — يُرجى الاطلاع على سياسة الخصوصية على /privacy-policy.\n\nللاستفسارات:\n\nPakSoft — يوزغات، تركيا\nالبريد الإلكتروني: paksoft3@gmail.com\nالهاتف: ‎+90 552 567 71 64\nالموقع: https://www.paksofts.com\n\nقد نُحدِّث هذه السياسة من وقت لآخر؛ ويُظهر تاريخ "آخر تحديث" أحدث مراجعة.',
        },
      ],
    },
    ur: {
      title: 'کوکی پالیسی',
      lastUpdated: LAST_UPDATED,
      intro:
        'یہ کوکی پالیسی وضاحت کرتی ہے کہ PakSoft ویب سائٹ https://www.paksofts.com پر کوکیز اور مشابہ ٹیکنالوجیز کیسے استعمال کرتا ہے، کون سی اقسام کی کوکیز استعمال ہوتی ہیں، اور آپ اپنی ترجیحات کیسے منظم کر سکتے ہیں۔ اسے ہماری پرائیویسی پالیسی کے ساتھ ملا کر پڑھیں۔',
      sections: [
        {
          heading: '1. کوکیز کیا ہیں؟',
          body:
            'کوکیز چھوٹی ٹیکسٹ فائلیں ہیں جو ویب سائٹ آپ کے دورے کے دوران آپ کے آلے (کمپیوٹر، ٹیبلٹ یا فون) پر محفوظ کرتی ہے۔ یہ ویب سائٹس کو چلانے، آپ کی ترجیحات یاد رکھنے اور سائٹ مالکان کو معلومات فراہم کرنے کے لیے استعمال ہوتی ہیں۔ اس پالیسی میں ٹریکنگ پکسلز اور لوکل اسٹوریج جیسی مشابہ ٹیکنالوجیز کو بھی "کوکیز" کہا گیا ہے۔',
        },
        {
          heading: '2. ہم کوکیز کیسے استعمال کرتے ہیں',
          body:
            'ہم کوکیز درج ذیل مقاصد کے لیے استعمال کرتے ہیں:\n\nویب سائٹ کے درست اور محفوظ کام کو یقینی بنانا (مثلاً زبان اور رضامندی کے انتخاب یاد رکھنا)؛\n\nصارفین کے سائٹ کے استعمال کو سمجھ کر اسے بہتر بنانا (تجزیات)؛\n\nاشتہارات کی کارکردگی کی پیمائش اور Google، Meta، LinkedIn اور TikTok جیسے پلیٹ فارمز پر متعلقہ اشتہارات دکھانا (مارکیٹنگ)۔',
        },
        {
          heading: '3. ضروری کوکیز',
          body:
            'یہ کوکیز ویب سائٹ کے کام کے لیے لازمی ہیں، بند نہیں کی جا سکتیں اور رضامندی درکار نہیں:\n\nNEXT_LOCALE — منتخب کردہ زبان یاد رکھتی ہے (مستقل، زیادہ سے زیادہ 12 ماہ)۔\n\npaksoft_cookie_consent — کوکی رضامندی کے انتخاب محفوظ کرتی ہے (مستقل، زیادہ سے زیادہ 12 ماہ)۔\n\nسیشن کوکیز — سائٹ کے محفوظ حصوں کے لیے مختصر مدت کی کوکیز؛ براؤزر بند کرنے یا سیشن ختم ہونے پر حذف ہو جاتی ہیں۔',
        },
        {
          heading: '4. تجزیاتی کوکیز',
          body:
            'صرف آپ کی رضامندی سے فعال ہوتی ہیں اور سائٹ کے مجموعی استعمال کو سمجھنے میں مدد دیتی ہیں:\n\n_ga، _ga_* — Google Analytics 4؛ زائرین اور سیشنز میں فرق کرتی ہیں (زیادہ سے زیادہ 24 ماہ)۔\n\n_clck، _clsk — Microsoft Clarity (جب فعال ہو)؛ سیشن ریکارڈنگ اور ہیٹ میپ تجزیہ (زیادہ سے زیادہ 12 ماہ)۔\n\n_hjSessionUser_*، _hjSession_* — Hotjar (جب فعال ہو)؛ رویّے کا تجزیہ (زیادہ سے زیادہ 12 ماہ)۔',
        },
        {
          heading: '5. مارکیٹنگ کوکیز',
          body:
            'صرف آپ کی رضامندی سے فعال ہوتی ہیں اور اشتہارات کی پیمائش اور اشتہاری سامعین بنانے کے لیے استعمال ہوتی ہیں:\n\n_gcl_au — Google Ads کنورژن پیمائش (تقریباً 3 ماہ)۔\n\n_fbp، _fbc (اور پرانا شناخت کار _fbq) — Meta/Facebook Pixel (تقریباً 3 ماہ)۔\n\nli_sugr، bcookie، UserMatchHistory — LinkedIn Insight Tag (زیادہ سے زیادہ 12 ماہ)۔\n\n_ttp، _tt_enable_cookie — TikTok Pixel (تقریباً 13 ماہ)۔',
        },
        {
          heading: '6. تیسرے فریق کی کوکیز',
          body:
            'تجزیاتی اور مارکیٹنگ کوکیز تیسرے فریق (Google، Meta، LinkedIn، TikTok، Microsoft/Hotjar) اپنی اپنی پرائیویسی پالیسیوں کے تحت لگاتے ہیں۔ یہ ادارے ڈیٹا کو اپنی دیگر معلومات سے ملا سکتے ہیں اور ترکی اور یورپی اقتصادی علاقے سے باہر پروسیس کر سکتے ہیں۔ تفصیلات کے لیے ان کی پالیسیاں ملاحظہ کریں۔',
        },
        {
          heading: '7. رضامندی کا انتظام اور واپسی',
          body:
            'پہلی بار سائٹ پر آنے پر کوکی بینر آپ کو تمام کوکیز قبول کرنے، اختیاری کوکیز مسترد کرنے یا زمرہ وار انتخاب کرنے کی سہولت دیتا ہے۔ ضروری کوکیز ہمیشہ فعال رہتی ہیں۔\n\nآپ کسی بھی وقت کوکی سیٹنگز دوبارہ کھول کر یا اپنے براؤزر سے paksoft_cookie_consent کوکی حذف کرکے اپنی رضامندی تبدیل یا واپس لے سکتے ہیں — بینر دوبارہ ظاہر ہو جائے گا۔\n\nآپ براؤزر کی سیٹنگز سے بھی کوکیز کنٹرول کر سکتے ہیں (بلاک، حذف یا انتباہ)۔ ضروری کوکیز بلاک کرنے سے سائٹ کے کچھ حصے کام نہیں کر سکتے۔',
        },
        {
          heading: '8. کوکیز کی مدت',
          body:
            'سیشن کوکیز براؤزر بند کرنے پر حذف ہو جاتی ہیں، جبکہ مستقل کوکیز دفعات 3–5 میں بیان کردہ مدت (عام طور پر 3 تا 24 ماہ) تک یا آپ کے حذف کرنے تک آپ کے آلے پر رہتی ہیں۔',
        },
        {
          heading: '9. مزید معلومات اور رابطہ',
          body:
            'کوکیز کے ذریعے جمع کردہ ذاتی ڈیٹا کی پروسیسنگ — بشمول KVKK اور GDPR کے تحت آپ کے حقوق — کی تفصیلات کے لیے /privacy-policy پر ہماری پرائیویسی پالیسی دیکھیں۔\n\nرابطہ:\n\nPakSoft — یوزگات، ترکی\nای میل: paksoft3@gmail.com\nفون: ‎+90 552 567 71 64\nویب سائٹ: https://www.paksofts.com\n\nہم اس کوکی پالیسی کو وقتاً فوقتاً اپ ڈیٹ کر سکتے ہیں؛ "آخری تازہ کاری" کی تاریخ تازہ ترین نظرثانی ظاہر کرتی ہے۔',
        },
      ],
    },
  },
};
