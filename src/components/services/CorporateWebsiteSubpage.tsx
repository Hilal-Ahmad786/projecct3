import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import {
  BlogFeedScene,
  FaqScene,
  FeaturesScene,
  PortfolioScene,
  PricingTiersScene,
  ProcessScene,
  TechStackScene,
} from '@/components/services/hero-visuals/scenes-internal';
import { localizeFullPath } from '@/lib/routes';
import { FAQJsonLd } from '@/components/seo/JsonLd';
import BlogInternalLinksCta from '@/components/blog/BlogInternalLinksCta';
import { corporateWebsiteArticleCards } from '@/data/corporate-website-article-cards';

export type CorporateWebsiteSubpageKey = 'features' | 'technologies' | 'process' | 'portfolio' | 'pricing' | 'blog' | 'faq';
type SupportedLocale = 'en' | 'tr';

type Fact = { title: string; detail: string };
type Feature = { title: string; what: string; why: string; scope: string };
type ProcessStage = { title: string; paksoft: string; client: string; approval: string };
type Article = { category: string; title: string; lead: string; paragraphs: string[]; points: string[] };
const guideSlugs = ['corporate-website-cost-factors', 'website-project-preparation', 'redesign-or-rebuild', 'choose-corporate-cms', 'multilingual-website-planning', 'website-handover-access-files'];
export function getCorporateWebsiteGuideSlugs() { return guideSlugs; }
type FaqGroup = { title: string; items: [string, string][] };

const content = {
  en: {
    nav: { home: 'Home', services: 'Services', overview: 'Corporate Website Design' },
    pages: {
        features: {
        hero: 'Features', intro: 'Select the pages and tools your team and customers need. Each capability is scoped around your business, content and workflows.',
        title: 'What Can Your Website Include?',
        features: [
          { title: 'Company presentation', what: 'Introduce your company, team, branches, certifications and selected projects in a clear page structure.', why: 'Visitors can understand what you do, where you operate and how your experience relates to their needs.', scope: 'Page count, supplied content and any certificate or project galleries are agreed in the proposal.' },
          { title: 'Product and service catalogues', what: 'Organize products or services by category, with specifications, downloadable documents and enquiry paths where needed.', why: 'Customers can compare relevant information before contacting your team.', scope: 'Catalogue size, filters, document formats and whether records are entered or imported are scoped separately.' },
          { title: 'Enquiry tools', what: 'Collect contact, quotation or appointment requests through forms designed around the information your team needs.', why: 'Clear forms make it easier for visitors to send a useful request.', scope: 'Fields, routing, spam protection and integrations are specified for each project.' },
          { title: 'Content management', what: 'Give authorized team members a way to edit agreed page content, publish news and manage images.', why: 'Routine content updates can be handled without changing the site structure each time.', scope: 'Editable modules, user roles, access and any handover guidance depend on the selected CMS and proposal.' },
          { title: 'Multilingual functionality', what: 'Add language navigation and separate page content, metadata and forms for each agreed language.', why: 'Different audiences can use content prepared for their language and market.', scope: 'Translation, editing, approvals and RTL layouts for Arabic or Urdu are defined in the scope.' },
          { title: 'Optional integrations', what: 'Connect selected CRM, recruitment, analytics or other external systems through available interfaces.', why: 'Relevant information can move between the website and business tools.', scope: 'Third-party access, API limits, licences and integration work are assessed and may be quoted separately.' },
        ] as Feature[],
        scopeTitle: 'How Feature Scope Is Agreed', scopeIntro: 'There is no fixed feature bundle. The proposal records which items are part of the agreed project, optional additions and separately quoted work.',
        scope: [
          { title: 'Agreed project scope', detail: 'Pages, modules and functions explicitly listed in the accepted proposal.' },
          { title: 'Optional additions', detail: 'Additional languages, content preparation, migration or integrations can be added when requested.' },
          { title: 'Separately quoted work', detail: 'Third-party subscriptions, extensive data entry, custom integrations or work beyond the agreed scope.' },
        ] as Fact[],
        cta: 'Discuss Your Required Features',
      },
      technologies: {
        hero: 'Platform Options', intro: 'We compare content needs, editing workflows, flexibility and ongoing costs before recommending an implementation approach.',
        title: 'Which Platform Suits Your Business?',
        chooseTitle: 'How We Choose', chooseIntro: 'The platform follows the requirements: who will edit the site, how content changes, what needs to connect and who will maintain it. No platform automatically guarantees speed or search visibility.',
        choose: [
          { title: 'Content workflow', detail: 'Who creates, reviews and publishes pages, news, products or documents?' },
          { title: 'Functionality', detail: 'Which forms, catalogues, user roles and integrations are necessary at launch?' },
          { title: 'Ownership and upkeep', detail: 'Who controls hosting, licences, updates, backups and future development?' },
        ] as Fact[],
        platformsTitle: 'Available Approaches', experienceLabel: 'Editing experience and flexibility', costsLabel: 'Hosting, licences and maintenance',
        platforms: [
          { name: 'WordPress', best: 'A familiar CMS for page, news and media editing.', tradeoff: 'Plugins and hosting are selected for the project; updates and licence costs need an owner.' },
          { name: 'Webflow', best: 'A visual site builder with CMS collections for structured content.', tradeoff: 'Hosting and plan limits follow Webflow terms; portability varies by feature and implementation.' },
          { name: 'React / Next.js', best: 'A custom web application approach for specific layouts, workflows or integrations.', tradeoff: 'Editing experience depends on the CMS or admin tools selected; hosting and maintenance are scoped.' },
          { name: 'Headless CMS', best: 'Structured content managed separately from the website interface.', tradeoff: 'Adds a CMS provider and integration layer; provider pricing, roles and exports vary.' },
        ],
        cmsTitle: 'What Could Your Team Update?', cmsNote: 'Illustrative content-management preview. Editable fields and permissions depend on the selected platform and agreed setup.',
        cmsFields: ['Company pages', 'Service descriptions', 'News and articles', 'Images and documents'],
        integrationsTitle: 'Integrations and Extensibility', integrationsText: 'We assess available APIs, authentication, data ownership and vendor constraints before connecting external systems. Access to test environments and third-party approvals may be needed.',
        foundationsTitle: 'Performance and Accessibility Approach', foundations: ['Responsive layouts and efficient asset use', 'Semantic page structure and keyboard-operable controls', 'Form labels, errors and confirmation states', 'Testing on agreed browsers and devices'],
        ownershipTitle: 'Ownership, Portability and Running Costs', ownership: 'The proposal and agreement document account access, source-code and design deliverables, content ownership, handover, export options and restrictions from selected platforms or third-party licences. Hosting, domains, CMS plans, extensions and maintenance are separate cost categories; exact fees depend on the providers and choices.',
        cta: 'Find the Right Platform',
      },
      process: {
        hero: 'Project Process', intro: 'A corporate website project works best when responsibilities and approvals are clear. The steps below are adapted to the agreed scope.',
        title: 'How We Will Work Together',
        stages: [
          { title: 'Discovery and scope', paksoft: 'Review objectives, audience, current systems and requirements; document exclusions.', client: 'Share business priorities, stakeholders and existing materials.', approval: 'Agree the proposal and project scope.' },
          { title: 'Sitemap and content planning', paksoft: 'Draft page structure, language versions and content requirements.', client: 'Confirm page owners and provide available copy, images and documents.', approval: 'Approve the sitemap and content responsibilities.' },
          { title: 'Design and approval', paksoft: 'Prepare the agreed interface direction and page layouts.', client: 'Review against the brief and consolidate feedback.', approval: 'Approve the agreed designs before implementation.' },
          { title: 'Development and CMS setup', paksoft: 'Build approved templates, agreed functions and content-management setup.', client: 'Answer implementation questions and provide required accounts or access.', approval: 'Review a working preview against the approved scope.' },
          { title: 'Content preparation or migration', paksoft: 'Place or migrate agreed content and configure language relationships where included.', client: 'Supply or approve final text, translations, images and records.', approval: 'Confirm content is ready for final testing.' },
          { title: 'Testing', paksoft: 'Check agreed forms, responsive layouts, links, browsers and technical requirements.', client: 'Test business-critical paths and report findings in one review.', approval: 'Record approval or agreed corrections.' },
          { title: 'Launch and handover', paksoft: 'Prepare the agreed deployment and provide documented access and handover items.', client: 'Confirm domain, hosting and launch approvals are available.', approval: 'Authorize launch and confirm receipt of handover.' },
          { title: 'Post-launch support', paksoft: 'Provide only the monitoring or maintenance defined in the agreement.', client: 'Route new requests through the agreed support channel.', approval: 'Agree any ongoing maintenance separately.' },
        ] as ProcessStage[],
        timingTitle: 'Timing and Scope Changes', timing: 'The schedule depends on scope, content readiness, third-party access and review cycles. If a request changes the approved pages or functionality, we document its impact and agree any revised scope before starting that work.',
        cta: 'Discuss Your Project Process',
      },
      portfolio: {
        hero: 'Project', intro: 'One documented corporate website project is shown here. The example is presented for its business requirement and delivered functionality, not as a claim about company size or performance.',
        title: 'A Relevant Website Project', project: 'Sun Container GmbH', sector: 'Modular containers and construction', needTitle: 'Business requirement', need: 'Present configurable modular containers, product information and application examples to German business and consumer audiences.',
        contributionTitle: 'PakSoft contribution', contribution: 'A product-focused website with product and application information, references, a configurator entry point and a separate order-tracking portal.',
        deliveredTitle: 'Documented functionality', delivered: ['Product and application pages', 'References and configurator entry point', 'Separate order-tracking portal'],
        imageAlt: 'Sun Container corporate website homepage showing its container solutions', viewProject: 'View the Sun Container project', moreTitle: 'What to Compare in a Similar Project', more: 'When reviewing a website project, compare the underlying requirement, agreed scope, content model and delivered functionality. The same visual result may not fit another company’s processes or platform.',
        cta: 'Discuss a Similar Project',
      },
      pricing: {
        hero: 'Pricing', intro: 'We prepare a project proposal after understanding the pages, functions, content responsibilities and technical requirements involved.',
        title: 'What Determines the Investment?',
        optionsTitle: 'Common Scope Patterns', optionsIntro: 'These are ways a project may be scoped, not fixed packages or price tiers.',
        options: [
          { title: 'Business website', detail: 'Company pages, service information and enquiry paths based on an agreed page plan.' },
          { title: 'Multilingual website', detail: 'Additional language structures, localized content fields and language-specific metadata.' },
          { title: 'Custom corporate solution', detail: 'Catalogues, portals, workflows or integrations defined around a specific business requirement.' },
        ] as Fact[],
        driversTitle: 'Project Scope and Price Drivers', drivers: ['Number of unique page templates and modules', 'Languages and RTL requirements', 'CMS, user roles and editing workflows', 'Content writing, translation or migration', 'Forms, catalogue complexity and integrations', 'Testing, deployment and handover requirements'],
        optionalTitle: 'Optional Services', optional: ['Copywriting and content preparation', 'Translation and editorial review', 'Photography or illustration', 'Third-party integrations', 'Hosting setup and ongoing maintenance'],
        costsTitle: 'Continuing and Third-Party Costs', costs: 'Domain registration, hosting, CMS plans, paid extensions, external services, maintenance and ongoing SEO are separate cost categories. Their exact amounts depend on providers, selected plans and project choices; they are identified separately where applicable.',
        quoteTitle: 'What We Need for a Useful Quote', quote: ['Your business goals and target audiences', 'An approximate page and language list', 'Required forms, catalogue or integrations', 'Available content and migration needs', 'Existing platform, hosting and domain details'],
        commercialTitle: 'Commercial Terms', commercial: 'Payment milestones, revision boundaries, change handling and any continuing service are confirmed in the proposal and agreement. We have not published fixed prices or standard commercial commitments here.',
        cta: 'Request a Project Quote',
      },
      blog: {
        hero: 'Guides', intro: 'Practical reading for planning, commissioning and managing a corporate website. Each guide includes actionable questions and decisions.',
        title: 'Corporate Website Guides', featured: 'Start here: prepare your website brief', categories: ['Planning', 'Pricing', 'Redesign', 'CMS', 'Multilingual Websites'],
        articles: [
          { category: 'Pricing', title: 'What Determines the Cost of a Corporate Website?', lead: 'A quote reflects the work required to deliver a defined scope, not just the number of pages.', paragraphs: ['Start by listing page types, languages, forms, catalogues and systems that need to connect. A site with ten similar pages may need less custom work than a smaller site with complex filters or approval workflows.', 'Content also affects effort. Decide whether your team will provide final copy, whether existing records must be migrated, and who will prepare translations. Hosting, paid CMS plans and third-party licences should be separated from the project fee.'], points: ['Ask for the included pages and modules to be listed.', 'Separate project work from recurring provider costs.', 'Document optional features before comparing proposals.'] },
          { category: 'Planning', title: 'What to Prepare Before Starting a Website Project', lead: 'A clear brief helps a team design around real business needs instead of assumptions.', paragraphs: ['Identify the audiences the site serves and the actions they should be able to take. Collect current brochures, product data, certificates, brand files and examples of content that must stay available.', 'Name the people who provide content, review designs and approve launch. A sitemap draft and list of required integrations help uncover missing decisions early. You do not need final copy for every page to begin, but you should agree who owns each item and when it will be ready.'], points: ['List audiences, priorities and required actions.', 'Gather existing content and note what needs rewriting.', 'Assign one decision owner for reviews and approvals.'] },
          { category: 'Redesign', title: 'Redesign Your Current Website or Rebuild It?', lead: 'The right route depends on what should be retained and what prevents the current site from meeting its goals.', paragraphs: ['A redesign can preserve a stable platform while improving navigation, content and visual presentation. A rebuild may be appropriate when the CMS, integrations or structure cannot support the changes required.', 'Before deciding, inventory important URLs, traffic sources, forms, content and integrations. When URLs change, plan redirects and post-launch monitoring. Search visibility can fluctuate during migration, so avoid promises of zero impact.'], points: ['Audit the content and functions before selecting a route.', 'Check platform constraints and integration dependencies.', 'Include redirect mapping and monitoring when URLs change.'] },
          { category: 'CMS', title: 'How to Choose a Content Management System', lead: 'Choose an editing workflow your team can maintain, then verify the technical and commercial limits.', paragraphs: ['Consider who edits pages, whether approvals are needed, how often content changes and which records are structured. WordPress, Webflow, a headless CMS or a custom implementation each have different editing models, hosting choices and licensing terms.', 'Ask to see the specific content types your team will manage. Confirm user roles, backup responsibility, export options and what happens if a provider or licence changes. A platform choice should follow these needs rather than a general claim that one system is always best.'], points: ['Test the real editing tasks your team will perform.', 'Review hosting, licence and extension costs.', 'Document access, backups and export responsibilities.'] },
          { category: 'Multilingual Websites', title: 'How to Plan a Multilingual Website', lead: 'A multilingual site needs a content and review plan for every language, not just a switcher.', paragraphs: ['Decide which pages and forms need each language and whether product names, legal information or service details differ by market. Plan language-specific navigation, page titles and metadata alongside the visible copy.', 'Assign responsibility for translation, terminology, editorial review and updates. Arabic and Urdu require right-to-left layout checks for text, menus, forms and mixed-direction content. Translation work and approval responsibilities should be explicit in the project scope.'], points: ['Map pages and forms by language.', 'Assign translation and approval owners.', 'Test RTL layouts and metadata in context.'] },
          { category: 'Planning', title: 'What to Receive at Website Handover', lead: 'A useful handover makes access, responsibilities and future maintenance clear.', paragraphs: ['Before launch, list the accounts and systems the business owns: domain registrar, hosting, CMS, analytics and relevant third-party services. Confirm which users have administrative access and how credentials are transferred securely.', 'The agreement should identify deliverables such as source files, design assets, content and documentation, subject to any platform or third-party licence. Record backup, update and maintenance responsibilities so the team knows what is covered after launch and what requires a separate agreement.'], points: ['Confirm account ownership and administrator access.', 'List the code, design and content deliverables.', 'Document licences and any optional maintenance.'] },
        ] as Article[],
        cta: 'Discuss Your Website Project',
      },
      faq: {
        hero: 'FAQs', intro: 'Answers about scope, content, ownership, delivery and ongoing costs for corporate website projects.',
        title: 'Questions to Ask Before Hiring a Website Team',
        groups: [
          { title: 'Scope', items: [['Do you provide both design and development?', 'Yes. Planning, interface design and website development can be scoped as one project. The proposal lists the pages, functionality, deliverables and responsibilities agreed for your project.'], ['Can you build a new site or redesign our current one?', 'Both are possible. For a redesign, we review existing content, usability, technical constraints and URL changes before agreeing on the improvement and migration scope.']] },
          { title: 'Content and languages', items: [['Who supplies copy and images?', 'Responsibilities for final text, images, documents and content entry are agreed in the proposal. Content writing or migration is included only when it is explicitly scoped.'], ['Can the site support several languages?', 'Language-specific pages, navigation, forms and metadata can be planned. Translation, editorial review and Arabic or Urdu RTL work are scoped with their responsibilities.']] },
          { title: 'Editing and ownership', items: [['Can our team edit the website?', 'An editing workflow can be included where the selected CMS supports the required content. Editable fields, roles and access are confirmed for the project.'], ['What access and files will we receive?', 'The proposal and agreement document account access, code and design deliverables, content ownership and any third-party licence restrictions.']] },
          { title: 'Timing and revisions', items: [['What affects the schedule?', 'Scope, content readiness, integrations, third-party access and review cycles affect the project schedule. The timing is agreed after requirements are understood.'], ['How are design changes handled?', 'Feedback and approval stages are agreed in the proposal. Requests that change the approved scope are reviewed, documented and agreed before the additional work begins.']] },
          { title: 'SEO and migration', items: [['What SEO work is included?', 'The website can include technical foundations such as descriptive page structure, metadata, crawlable navigation and responsive implementation. Ongoing SEO campaigns are a separate service.'], ['How do you handle changed URLs?', 'When URLs change, redirects can be mapped and post-launch monitoring included in the agreed migration scope. Search visibility may fluctuate; no zero-loss guarantee is made.']] },
          { title: 'Costs and support', items: [['What costs continue after launch?', 'Domain, hosting, CMS plans, paid extensions, third-party services and optional maintenance may recur. Applicable providers and charges are identified separately where known.'], ['What support is included after launch?', 'Only the support or maintenance written into the proposal and agreement is included. Any ongoing service is scoped separately.']] },
          { title: 'International collaboration', items: [['Can we collaborate remotely?', 'Project communication, review owners and approval points can be agreed around your team’s working arrangements.'], ['Which languages can the website support?', 'Turkish, English, German, Arabic and Urdu language versions can be planned where required. Translation responsibilities and RTL checks for Arabic and Urdu are agreed in the scope.']] },
        ] as FaqGroup[],
        cta: 'Discuss Your Website Project',
      },
    },
    labels: { what: 'What it does', why: 'Why it matters', scope: 'Scope note', included: 'Agreed scope', optional: 'Optional work', separate: 'Separately quoted', paksoft: 'PakSoft work', client: 'Your input', approval: 'Approval milestone', example: 'Illustrative example', ctaIntro: 'Tell us about your requirements and we can discuss a suitable project scope.', viewProject: 'View project', readGuide: 'Read this guide', moreGuides: 'All guides are included below.' },
  },
  tr: {
    nav: { home: 'Ana Sayfa', services: 'Hizmetler', overview: 'Kurumsal Web Tasarım' },
    pages: {
      features: {
        hero: 'Özellikleri', intro: 'Kurumsal web sitenizin özelliklerini işletmenizin hedeflerine, içeriklerine ve çalışma biçimine göre planlıyoruz. Şirket tanıtımı, içerik yönetimi, ürün kataloğu ve teklif talepleri gibi ihtiyaçları değerlendirerek projenize uygun işlevleri belirliyoruz.',
        title: 'Web Sitenizde Neler Olabilir?',
        features: [
          { title: 'Kurumsal tanıtım', what: 'Şirketinizi, ekibinizi, şubelerinizi, sertifikalarınızı ve seçili projelerinizi anlaşılır bir sayfa yapısında sunar.', why: 'Ziyaretçiler ne yaptığınızı, nerede hizmet verdiğinizi ve deneyiminizin ihtiyaçlarıyla nasıl ilişkili olduğunu anlayabilir.', scope: 'Sayfa sayısı, sağlanacak içerikler ve sertifika ya da proje galerileri teklifte netleştirilir.' },
          { title: 'Ürün ve hizmet katalogları', what: 'Ürün veya hizmetleri kategorilere ayırır; ihtiyaç halinde teknik özellikleri, indirilebilir belgeleri ve talep yollarını sunar.', why: 'Müşteriler ekibinize ulaşmadan önce ilgili bilgileri karşılaştırabilir.', scope: 'Katalog büyüklüğü, filtreler, belge biçimleri ve kayıtların elle girilmesi ya da aktarılması ayrıca kapsamlandırılır.' },
          { title: 'Talep araçları', what: 'Ekibinizin ihtiyaç duyduğu bilgileri toplayan iletişim, teklif veya randevu formları sunar.', why: 'Anlaşılır formlar, ziyaretçilerin işe yarar bir talep iletmesini kolaylaştırır.', scope: 'Alanlar, yönlendirme, spam koruması ve entegrasyonlar her proje için belirlenir.' },
          { title: 'İçerik yönetimi', what: 'Yetkili ekip üyelerinin üzerinde anlaşılan sayfaları güncellemesini, haber yayınlamasını ve görselleri yönetmesini sağlar.', why: 'Düzenli içerik güncellemeleri için her defasında site yapısını değiştirmek gerekmez.', scope: 'Düzenlenebilir alanlar, kullanıcı rolleri, erişim ve devir bilgilendirmesi seçilen CMS’e ve teklife bağlıdır.' },
          { title: 'Çok dilli işlevler', what: 'Üzerinde anlaşılan diller için ayrı sayfa içerikleri, meta veriler ve formlarla dil menüsü ekler.', why: 'Farklı hedef kitleler kendi dillerinde hazırlanmış içeriği kullanabilir.', scope: 'Çeviri, editoryal çalışma, onaylar ve Arapça ya da Urduca RTL düzeni kapsamda belirlenir.' },
          { title: 'İsteğe bağlı entegrasyonlar', what: 'Seçilen CRM, işe alım aracı, analitik veya diğer dış sistemleri mevcut arayüzler üzerinden bağlar.', why: 'İlgili bilgiler web sitesi ile işletme araçları arasında aktarılabilir.', scope: 'Üçüncü taraf erişimi, API sınırları, lisanslar ve entegrasyon çalışması değerlendirilir; ayrıca fiyatlandırılabilir.' },
        ] as Feature[],
        scopeTitle: 'Özellik Kapsamı Nasıl Belirlenir?', scopeIntro: 'Sabit bir özellik paketi yoktur. Teklifte proje kapsamına alınanlar, isteğe bağlı eklemeler ve ayrıca fiyatlandırılacak işler ayrıştırılır.',
        scope: [
          { title: 'Üzerinde anlaşılan kapsam', detail: 'Kabul edilen teklifte açıkça listelenen sayfalar, modüller ve işlevler.' },
          { title: 'İsteğe bağlı çalışmalar', detail: 'Ek diller, içerik hazırlığı, aktarım veya entegrasyonlar talep halinde eklenebilir.' },
          { title: 'Ayrıca fiyatlandırılacak işler', detail: 'Üçüncü taraf abonelikleri, kapsamlı veri girişi, özel entegrasyonlar veya anlaşılan kapsam dışındaki işler.' },
        ] as Fact[],
        cta: 'Projenizi Konuşalım', ctaIntro: 'Yayınlamak istediğiniz içerikleri, yönetmek istediğiniz bilgileri ve ziyaretçilerinizden beklediğiniz işlemleri paylaşın. Projenizin işlevlerini birlikte netleştirelim.', ctaSecondary: 'Fiyatlandırma ve Kapsamı İnceleyin',
      },
      technologies: {
        hero: 'Teknolojiler', intro: 'Web sitenizin altyapısını içerik yönetimi, işlevler, entegrasyonlar ve bakım ihtiyaçlarına göre belirliyoruz. Seçenekleri yalnızca geliştirme aşaması için değil, sitenizi yayından sonra nasıl kullanacağınızı da dikkate alarak değerlendiriyoruz.',
        title: 'İşletmeniz İçin Hangi Altyapı Uygun?',
        chooseTitle: 'Altyapıyı Nasıl Seçiyoruz?', chooseIntro: 'Altyapı gereksinimlere göre belirlenir: siteyi kim düzenleyecek, içerikler nasıl değişecek, neler bağlanacak ve bakımını kim üstlenecek? Hiçbir platform tek başına hız veya arama görünürlüğü garantisi vermez.',
        choose: [
          { title: 'İçerik iş akışı', detail: 'Sayfaları, haberleri, ürünleri veya belgeleri kim hazırlıyor, inceliyor ve yayınlıyor?' },
          { title: 'İşlevler', detail: 'Yayında hangi formlar, kataloglar, kullanıcı rolleri ve entegrasyonlar gerekli?' },
          { title: 'Sahiplik ve bakım', detail: 'Hosting, lisans, güncelleme, yedek ve sonraki geliştirmeleri kim yönetecek?' },
        ] as Fact[],
        platformsTitle: 'Değerlendirilebilecek Yaklaşımlar', experienceLabel: 'Düzenleme deneyimi ve esneklik', costsLabel: 'Hosting, lisanslar ve bakım',
        platforms: [
          { name: 'WordPress', best: 'Sayfa, haber ve medya düzenlemeleri için yaygın bir CMS iş akışı sunar.', tradeoff: 'Eklentiler ve hosting projeye göre seçilir; güncellemeler ve lisans giderleri için sorumlu belirlenmelidir.' },
          { name: 'Webflow', best: 'Yapılandırılmış içerik koleksiyonları bulunan görsel bir site oluşturma aracıdır.', tradeoff: 'Hosting ve plan sınırları Webflow koşullarına bağlıdır; özellik ve uygulamaya göre taşınabilirlik değişebilir.' },
          { name: 'React / Next.js', best: 'Belirli arayüz, iş akışı veya entegrasyon gereksinimleri için özel web uygulaması yaklaşımıdır.', tradeoff: 'İçerik düzenleme deneyimi seçilen CMS veya yönetim araçlarına bağlıdır; hosting ve bakım ayrıca kapsamlandırılır.' },
          { name: 'Headless CMS', best: 'İçeriğin web sitesi arayüzünden ayrı yönetildiği yapılandırılmış bir model sunar.', tradeoff: 'Bir CMS sağlayıcısı ve entegrasyon katmanı ekler; fiyat, kullanıcı rolleri ve dışa aktarma koşulları sağlayıcıya göre değişir.' },
        ],
        cmsTitle: 'Ekibiniz Hangi İçerikleri Güncelleyebilir?', cmsNote: 'Örnek yönetim paneli gösterimi. Düzenlenebilir alanlar ve yetkiler, seçilen platforma ve üzerinde anlaşılan kuruluma bağlıdır.',
        cmsFields: ['Kurumsal sayfalar', 'Hizmet açıklamaları', 'Haber ve yazılar', 'Görsel ve belgeler'],
        integrationsTitle: 'Entegrasyonlar ve Genişletilebilirlik', integrationsText: 'Dış sistemleri bağlamadan önce mevcut API’leri, kimlik doğrulamayı, veri sahipliğini ve sağlayıcı kısıtlarını inceliyoruz. Test ortamı erişimi ve üçüncü taraf onayları gerekebilir.',
        foundationsTitle: 'Performans ve Erişilebilirlik Yaklaşımı', foundations: ['Mobil uyumlu düzenler ve verimli varlık kullanımı', 'Anlamsal sayfa yapısı ve klavyeyle kullanılabilir kontroller', 'Form etiketleri, hata ve onay durumları', 'Üzerinde anlaşılan tarayıcı ve cihazlarda test'],
        ownershipTitle: 'Sahiplik, Taşınabilirlik ve Devam Eden Giderler', ownership: 'Hesap erişimleri, kaynak kod ve tasarım teslimatları, içerik sahipliği, devir, dışa aktarma seçenekleri ve seçilen platformların ya da üçüncü taraf lisanslarının kısıtları teklif ve sözleşmede belirtilir. Hosting, alan adı, CMS planı, eklentiler ve bakım ayrı gider kalemleridir; tutarlar sağlayıcı ve tercihlere bağlıdır.',
        cta: 'Projenizi Konuşalım',
      },
      process: {
        hero: 'Proje Süreci', intro: 'Kurumsal web sitesi projesini ihtiyaç analizi, tasarım, geliştirme ve yayın aşamalarıyla planlıyoruz. Her aşamada hazırlanacak çalışmaları, sizden gereken bilgileri ve onay noktalarını netleştirerek projenin takibini kolaylaştırıyoruz.',
        title: 'Kurumsal Web Sitesi Yapım Aşamaları',
        stages: [
          { title: 'İhtiyaç Analizi ve Kapsam', paksoft: 'İş hedeflerini, hedef kitleleri, gereksinimleri ve teknik bağımlılıkları değerlendirir; kapsam dışı işleri görünür hale getiririz.', client: 'İş önceliklerini, mevcut siteyi ve bilinen ihtiyaçları paylaşır.', approval: 'Teslimatlar, hariç tutulan işler ve teknik varsayımlar üzerinde anlaşılmış proje kapsamı.' },
          { title: 'Sayfa Yapısı ve İçerik Planı', paksoft: 'Site haritasını, içerik türlerini, dilleri ve ziyaretçi akışlarını planlarız.', client: 'Mevcut içerik ve marka bilgilerini paylaşır; içerik sahiplerini belirlemeye yardımcı olur.', approval: 'Sayfa ve içerik planı ile içerik sorumluluklarının netleşmesi.' },
          { title: 'Tasarım ve Geri Bildirim', paksoft: 'Markaya uygun, farklı ekranlara uyum sağlayan düzenleri hazırlarız.', client: 'Tasarımları inceleyip geri bildirimleri bir araya getirir ve onay verir.', approval: 'Üzerinde anlaşılan tasarım yönü ve sayfa düzenlerinin onayı.' },
          { title: 'Geliştirme ve Yönetim Paneli', paksoft: 'Onaylanan düzenleri, kapsamdaki sayfaları ve işlevleri geliştirir; gerekiyorsa kararlaştırılan entegrasyonları kurarız.', client: 'Uygulama sorularını yanıtlar ve gerekli dış hesap ya da test erişimlerini sağlar.', approval: 'İncelenebilir geliştirme sürümünün kapsamla birlikte gözden geçirilmesi.' },
          { title: 'İçerik Yerleşimi ve Dil Kontrolleri', paksoft: 'Kapsamdaki metin, görsel ve belgeleri yerleştirir; kararlaştırılan dil sürümlerini kontrol ederiz.', client: 'İçerikleri ve çevirileri sağlar veya onaylar; editoryal sorumlulukları yürütür.', approval: 'İçeriklerle doldurulmuş sayfaların incelemeye hazır olması.' },
          { title: 'Test ve Yayın Öncesi Onay', paksoft: 'Önemli cihaz ve tarayıcılarda sayfaları, formları, bağlantıları, erişilebilirlik kontrollerini ve teknik SEO kurulumunu test ederiz.', client: 'Son içeriği ve iş açısından önemli akışları inceler; bulguları paylaşır.', approval: 'Yayın kontrol listesi ve üzerinde anlaşılan son onay.' },
          { title: 'Yayın, Teslim ve Kullanım Bilgilendirmesi', paksoft: 'Alan adı ve hosting koordinasyonunu yapar, yayını gerçekleştirir ve üzerinde anlaşılan erişim/devir kalemlerini belgeleriz.', client: 'Gerekli hesap erişimlerini ve yayın onayını sağlar; teslimatı gözden geçirir.', approval: 'Yayındaki web sitesi ve teklifte tanımlanan teslim/devir kapsamı.' },
        ] as ProcessStage[],
        timingTitle: 'Web Sitesi Projesinin Süresini Neler Etkiler?', timing: 'Süre; benzersiz sayfa düzenleri ve işlevler, içeriklerin hazır olması, dil ve çeviri çalışmaları, entegrasyonlar ile üçüncü taraf onayları, geri bildirim süreleri ve varsa mevcut siteden geçişin karmaşıklığına bağlıdır. Takvim, kapsam netleştikten sonra kararlaştırılır; burada sabit teslim süresi taahhüt edilmez.',
        cta: 'Projenizi Konuşalım', ctaIntro: 'İşletmenizi, mevcut web sitenizi ve hedeflerinizi paylaşın. Gereksinimlerinizi değerlendirerek proje kapsamını ve sonraki adımları birlikte belirleyelim.',
      },
      portfolio: {
        hero: 'Portföy', intro: 'Farklı işletmeler için hazırlanan web sitesi projelerini inceleyin. Her örnekte işletmenin ihtiyacını, PakSoft’un katkısını ve proje kapsamında geliştirilen sayfa ve işlevleri açıklıyoruz.',
        title: 'Kurumsal Web Sitesi Örnekleri ve Projelerimiz', project: 'Sun Container GmbH', sector: 'Modüler konteyner ve inşaat', needTitle: 'İşletme ihtiyacı', need: 'Modüler konteyner çözümlerini, ürün bilgilerini ve kullanım örneklerini Almanya’daki işletme ve tüketicilere tanıtmak.',
        contributionTitle: 'PakSoft katkısı', contribution: 'Ürün ve kullanım alanlarını tanıtan, referansları ve konfigüratöre geçişi sunan; ayrıca ayrı bir sipariş takip portalıyla desteklenen web sitesi.',
        deliveredTitle: 'Belgelenmiş işlevler', delivered: ['Ürün ve kullanım alanı sayfaları', 'Referanslar ve konfigüratöre geçiş', 'Ayrı sipariş takip portalı'],
        imageAlt: 'Sun Container web sitesi ana sayfasında konteyner çözümleri tanıtılıyor', viewProject: 'Sun Container projesini inceleyin', moreTitle: 'Benzer Projelerde Nelere Bakabilirsiniz?', more: 'Bir web sitesi projesini incelerken işletme ihtiyacını, kararlaştırılan kapsamı, içerik modelini ve teslim edilen işlevleri karşılaştırın. Benzer görünen bir tasarım, başka bir işletmenin süreçlerine veya altyapısına doğrudan uymayabilir.',
        cta: 'Projenizi Konuşalım',
      },
      pricing: {
        hero: 'Fiyatlandırma', intro: 'Kurumsal web sitesi fiyatları; tasarım kapsamına, sayfa yapısına, dil seçeneklerine ve ihtiyaç duyulan işlevlere göre değişir. PakSoft olarak projenizin gereksinimlerini belirleyip teslimatları, ek hizmetleri ve devam eden giderleri açıklayan bir teklif hazırlıyoruz.',
        title: 'İhtiyacınıza Uygun Proje Kapsamları', optionsTitle: 'İhtiyacınıza Uygun Proje Kapsamları', optionsIntro: 'Aşağıdaki seçenekler sabit fiyatlı paketler değil, teklif kapsamını konuşmaya yardımcı olan proje türleridir.',
        options: [
          { title: 'Kurumsal Tanıtım Sitesi', detail: 'Kimler için: Şirketini, hizmetlerini, referanslarını ve iletişim bilgilerini sunmak isteyen işletmeler. Kapsam: Temel kurumsal sayfalar, mobil uyumlu tasarım, talep formları ve içerik yönetimi ihtiyacı netleştirilir. Maliyeti etkileyenler: Sayfa şablonları, form yapısı ve içerik hazırlığı.', who: 'Şirketini, hizmetlerini, referanslarını ve iletişim bilgilerini sunmak isteyen işletmeler.', scope: 'Temel kurumsal sayfalar, mobil uyumlu tasarım, talep formları ve içerik yönetimi gereksinimleri belirlenir.', drivers: 'Sayfa şablonları, form yapısı ve içerik hazırlığı.', cta: 'Kapsama Göre Teklif' },
          { title: 'Çok Dilli Kurumsal Web Sitesi', detail: 'Kimler için: Birden fazla dilde müşteri ve iş ortağına ulaşan işletmeler. Kapsam: Dil bazlı sayfa ve menüler, yerelleştirilmiş formlar ve meta veriler; çeviri ve içerik giriş sorumlulukları kararlaştırılır. Maliyeti etkileyenler: Dil sayısı, içerik hacmi ve Arapça/Urduca RTL gereksinimleri.', who: 'Birden fazla dilde müşteri ve iş ortağına ulaşan işletmeler.', scope: 'Dil bazlı sayfa ve menüler, formlar ve meta veriler; çeviri ile içerik giriş sorumlulukları kararlaştırılır.', drivers: 'Dil sayısı, içerik hacmi ve Arapça/Urduca RTL gereksinimleri.', cta: 'Kapsama Göre Teklif' },
          { title: 'Özel İşlevli Kurumsal Web Sitesi', detail: 'Kimler için: Katalog, gelişmiş talep akışları veya iş sistemleri bağlantısı gereken işletmeler. Kapsam: Ürün/teknik kataloglar, gelişmiş teklif formları ve CRM/API bağlantıları ihtiyaçlara göre tanımlanır. Maliyeti etkileyenler: Veri yapısı, dış sistemler ve özel iş akışları.', who: 'Katalog, gelişmiş talep akışları veya iş sistemleri bağlantısı gereken işletmeler.', scope: 'Ürün veya teknik kataloglar, gelişmiş teklif formları ve CRM/API bağlantıları ihtiyaçlara göre belirlenir.', drivers: 'Veri yapısı, dış sistemler ve özel iş akışları.', cta: 'Kapsama Göre Teklif' },
        ],
        comparisonTitle: 'Kurumsal Web Sitesi Paketlerinde Neler Karşılaştırılmalı?',
        comparison: [
          ['Sayfalar ve şablonlar', 'İçerik sayısı ile farklı sayfa düzenlerinin sayısını ayırır.', 'Sayfa türleri ve benzersiz tasarım şablonları teklifte netleştirilir.'],
          ['Özel tasarım', 'Marka materyalleri ve özgün arayüz hazırlığının kapsamını belirtir.', 'Mevcut marka dosyaları ve istenen özel tasarım düzeyi değerlendirilir.'],
          ['CMS ve düzenleme', 'Ekibinizin güncelleyebileceği içerik türleri ve kullanıcı rolleri.', 'Platform, modüller ve izin düzeyleri teklifte netleştirilir.'],
          ['Diller', 'Her dil için sayfalar, gezinme, formlar ve meta veriler.', 'Dil sayısı, RTL düzeni ve çeviri sorumluluğu kararlaştırılır.'],
          ['Formlar ve entegrasyonlar', 'Talep toplama akışları ve dış sistem bağlantıları.', 'Alanlar, API erişimi ve üçüncü taraf bağımlılıkları incelenir.'],
          ['İçerik hazırlığı', 'Metin, görsel ve kayıtların hazırlanması veya siteye girilmesi.', 'İçeriği kimin sağlayacağı ve giriş kapsamı belirtilir.'],
          ['Mevcut siteden geçiş', 'İçerik aktarımı, değişen URL’ler ve yayın kontrolleri.', 'Taşınacak içerik ve gerekli yönlendirmeler kapsamlandırılır.'],
          ['Eğitim ve devir', 'Erişimlerin, dokümanların ve yönetim bilgisinin aktarımı.', 'Teslimat ve rehberlik kalemleri teklifte netleştirilir.'],
          ['Destek ve bakım', 'Yayın sonrası güncelleme ve bakım hizmetleri.', 'Varsa kapsamı ve süresi ayrı olarak kararlaştırılır.'],
        ],
        factorsTitle: 'Kurumsal Web Tasarım Fiyatlarını Neler Etkiler?', factors: [
          ['Sayfa Sayısı ve Tasarım Şablonları', 'Sayfa sayısı içerik miktarını, şablon sayısı ise farklı düzen ve bileşenlerin tasarım/geliştirme ihtiyacını anlatır. Benzer sayfalar ortak şablon kullanabilir; kapsam bu ayrım üzerinden belirlenir.'],
          ['Tasarım ve Marka Gereksinimleri', 'Mevcut logo, renk ve görsel kurallar kullanılabilir; özel arayüzler veya marka materyallerinin hazırlanması ayrıca planlanabilir. İhtiyaç duyulan hazırlık teklifte açıklanır.'],
          ['Dil Sayısı ve İçerik Hazırlığı', 'Dil sürümlerinin kurulumu, çeviri, yerelleştirme, içerik girişi ve son onay farklı işlerdir. Her birinin sorumlusu ve kapsamı ayrı belirlenir.'],
          ['Yönetim Paneli ve İşlevler', 'Düzenlenecek içerik türleri, kullanıcı rolleri ve ek modüller geliştirme kapsamını etkiler. Gerekli yönetim işlevleri proje gereksinimlerine göre seçilir.'],
          ['Entegrasyonlar', 'CRM veya başka sistem bağlantıları API erişimi, veri biçimi, kimlik doğrulama ve üçüncü taraf koşullarına bağlıdır. Bu bağımlılıklar değerlendirilerek kapsamlandırılır.'],
          ['Mevcut Sitenin Taşınması', 'İçerik ve kayıtların aktarımı, korunacak URL’ler, değişen adresler için yönlendirmeler ve yayın kontrolleri geçiş çalışmasının kapsamını belirler.'],
        ],
        costsTitle: 'Web Sitesinin Yıllık ve Devam Eden Maliyetleri', costRows: [
          ['Alan adı', 'Web adresinin kaydı ve yenilenmesi.', 'Yinelenen; kayıt sağlayıcısı ve hesap sahipliği anlaşmaya göre belirlenir.'],
          ['Hosting veya platform aboneliği', 'Sunucu, barındırma veya seçilen platform planı.', 'Plan ve kullanıma göre yinelenebilir; sağlayıcı hesabı ve ödeme sorumlusu kararlaştırılır.'],
          ['Ücretli tema, eklenti veya yazılım lisansları', 'Üçüncü taraf ürünlerin kullanım lisansları.', 'Lisans koşuluna göre yinelenebilir veya tek seferlik; gerekli olup olmadığı projeye bağlıdır.'],
          ['Bakım ve güncellemeler', 'Yazılım güncellemeleri ve üzerinde anlaşılan bakım işleri.', 'İsteğe bağlı devam eden hizmet; kapsam ve sorumluluk ayrıca belirlenir.'],
          ['İçerik güncelleme desteği', 'Sayfa, ürün veya haber içeriklerinin güncellenmesi.', 'Talebe veya anlaşmaya göre değişebilir; her projede zorunlu değildir.'],
          ['Ayrı kapsamlı SEO ve reklam hizmetleri', 'Yayından sonra yürütülen sürekli arama motoru optimizasyonu ve reklam yönetimi.', 'Web sitesi geliştirmesinden ayrı, isteğe bağlı hizmetlerdir.'],
        ],
        optionalTitle: 'Ek Hizmetler ve Teklif Kapsamı', optional: ['Metin yazımı', 'Çeviri ve yerelleştirme', 'Fotoğraf, video ve özel görseller', 'Ek dil veya modül', 'CRM ve diğer sistem entegrasyonları', 'Sürekli SEO çalışmaları', 'Yayın sonrası bakım'], optionalNote: 'Bu çalışmalar ihtiyaca göre ayrıca kapsamlandırılabilir. Yazılı teklif, proje ücretine dahil olanları ve kapsam dışı kalemleri açıklar.',
        approachTitle: 'Hazır Altyapı ve Özel Geliştirme Fiyatı Nasıl Etkiler?', approaches: [
          ['Platform kurulumu ve özelleştirme', 'Hazır altyapıda mevcut araçların kurulumu ve uyarlanması planlanır; özel geliştirmede ihtiyaç duyulan işlevler projeye göre oluşturulur.'],
          ['Lisans ve devam eden giderler', 'Platform, tema veya eklentiler abonelik ya da lisans bedeli doğurabilir. Tutar ve koşullar ilgili sağlayıcıya bağlıdır.'],
          ['Bakım, taşınabilirlik ve içerik yönetimi', 'Güncelleme sorumluluğu, içerik düzenleme kolaylığı ve dışa aktarma olanakları seçilen teknolojiye göre değişir. Bu gereksinimler seçim öncesinde karşılaştırılır.'],
        ],
        quoteTitle: 'Projeniz İçin Teklif Nasıl Hazırlanır?', quoteSteps: ['İşletmenizi ve hedeflerinizi öğreniyoruz.', 'Sayfa, dil ve işlev gereksinimlerini belirliyoruz.', 'İçerik ve teknik sorumlulukları netleştiriyoruz.', 'Kapsamı ve ticari koşulları yazılı teklif olarak sunuyoruz.'], quote: ['Mevcut web siteniz (varsa)', 'İhtiyaç duyduğunuz sayfalar veya içerik türleri', 'Diller', 'Entegrasyonlar', 'Hedef yayın tarihi', 'İsteğe bağlı bütçe aralığı'], quoteIntro: 'Ayrıntılı sayfa sayısı veya bütçe paylaşımı olmadan da görüşmeye başlayabilirsiniz. Mevcut site, diller, gerekli bağlantılar ve hedef tarih kapsamı anlamaya yardımcı olur.',
        faqTitle: 'Kurumsal Web Sitesi Fiyatları Hakkında Sorular', faqs: [
          ['Kurumsal web sitesi için neden tek bir fiyat yok?', 'Tasarım şablonları, diller, içerik, yönetim paneli ve entegrasyon gereksinimleri projeden projeye değişir. Bu nedenle önce kapsam belirlenir, ardından yazılı teklif hazırlanır.'],
          ['Sayfa sayısı fiyatı nasıl etkiler?', 'Sayfaların sayısı kadar kaç farklı tasarım şablonu ve işlev gerektiği de önemlidir. Benzer içerik sayfaları ortak bir şablon kullanabilir; kesin kapsam teklif aşamasında belirlenir.'],
          ['Alan adı ve hosting proje ücretine dahil mi?', 'Her proje için aynı varsayım geçerli değildir. Alan adı, hosting veya platform aboneliğinin kim tarafından sağlanacağı ve ödeneceği teklif ya da anlaşmada açıklanır.'],
          ['Çok dilli web sitesi fiyatı nasıl belirlenir?', 'Dil sayısı, her dildeki içerik ve form kapsamı, çeviri/yerelleştirme sorumluluğu ve RTL düzeni gibi gereksinimler değerlendirilir. Çeviri otomatik olarak dahil kabul edilmez.'],
          ['Mevcut siteyi yenilemek daha ekonomik olabilir mi?', 'Bu, mevcut altyapının kullanılabilirliğine, korunacak içeriklere ve gerekli değişikliklere bağlıdır. İçerik, URL’ler ve işlevler incelenmeden maliyet karşılaştırması yapılamaz.'],
          ['SEO hizmeti web sitesi yapım ücretine dahil mi?', 'Teknik SEO temelleri ile sürekli SEO çalışmaları farklı kapsamlardır. Projede hangi teknik çalışmaların yer aldığı ve devam eden hizmet gerekip gerekmediği teklifte belirtilir.'],
          ['Yayından sonra hangi giderler devam eder?', 'Alan adı yenilemesi, hosting/platform planı ve bazı lisanslar yinelenebilir. Bakım, içerik güncelleme ve SEO gibi hizmetler seçime ve ayrı anlaşmaya bağlıdır.'],
          ['Proje sırasında yeni bir özellik istersek ne olur?', 'Yeni talebin mevcut kapsam ve takvime etkisi değerlendirilir. Ek çalışma, etkisi ve ticari koşulları üzerinde anlaşılınca planlanır.'],
        ],
        commercialTitle: 'Fiyatlandırma Notu', commercial: 'Repository’de bu hizmet için onaylanmış sabit fiyat veya paket tutarı bulunmuyor. Bu nedenle fiyat ya da paket taahhüdü yayınlamıyoruz; kapsam onaylandıktan sonra yazılı teklif sunuluyor.',
        cta: 'Kurumsal Web Sitesi Projeniz İçin Teklif Alın', ctaIntro: 'İşletmenizi, mevcut web sitenizi ve ihtiyaç duyduğunuz özellikleri paylaşın. Projenizin kapsamını birlikte netleştirerek size uygun bir teklif hazırlayalım.',
      },
      blog: {
        hero: 'Rehberleri', intro: 'Kurumsal web sitesini planlama, yaptırma ve yönetme sürecine yönelik uygulanabilir öneriler. Her rehber karar vermenize yardımcı olacak sorular içerir.',
        title: 'Kurumsal Web Sitesi Rehberleri', featured: 'Buradan başlayın: web sitesi brief’inizi hazırlayın', categories: ['Planlama', 'Fiyatlandırma', 'Yenileme', 'CMS', 'Çok Dilli Web Siteleri'],
        articles: [
          { category: 'Fiyatlandırma', title: 'Kurumsal Web Sitesi Fiyatını Neler Belirler?', lead: 'Teklif, yalnızca sayfa sayısını değil; tanımlı kapsamı teslim etmek için gereken çalışmayı yansıtır.', paragraphs: ['Sayfa türlerini, dilleri, formları, katalogları ve bağlanması gereken sistemleri listeleyerek başlayın. Birbirine benzeyen on sayfa, filtreleri veya onay akışları karmaşık olan daha küçük bir siteden daha az özel çalışma gerektirebilir.', 'İçerik de eforu etkiler. Son metinleri ekibinizin sağlayıp sağlamayacağını, mevcut kayıtların taşınıp taşınmayacağını ve çevirileri kimin hazırlayacağını belirleyin. Hosting, ücretli CMS planları ve üçüncü taraf lisanslarını proje ücretinden ayrı değerlendirin.'], points: ['Dahil olan sayfa ve modülleri teklifte listeleyin.', 'Proje işlerini düzenli sağlayıcı giderlerinden ayırın.', 'Teklifleri karşılaştırmadan önce isteğe bağlı işlevleri netleştirin.'] },
          { category: 'Planlama', title: 'Web Sitesi Projesine Başlamadan Önce Hazırlamanız Gerekenler', lead: 'Açık bir brief, ekibin varsayımlar yerine gerçek işletme ihtiyaçlarına göre tasarım yapmasına yardımcı olur.', paragraphs: ['Sitenin hangi kitlelere hizmet ettiğini ve ziyaretçilerin hangi işlemleri yapabilmesi gerektiğini belirleyin. Mevcut broşürleri, ürün verilerini, sertifikaları, marka dosyalarını ve korunması gereken içerikleri toplayın.', 'İçerikleri kimin sağlayacağını, tasarımları kimin inceleyeceğini ve yayını kimin onaylayacağını belirleyin. Site haritası taslağı ve gerekli entegrasyon listesi eksik kararları erken görünür kılar. Başlamak için her sayfanın son metni hazır olmak zorunda değil; sorumluları ve hedef tarihleri belirlemek gerekir.'], points: ['Hedef kitleleri, öncelikleri ve beklenen işlemleri yazın.', 'Mevcut içerikleri toplayıp yenilenmesi gerekenleri not edin.', 'İnceleme ve onaylar için bir karar sorumlusu belirleyin.'] },
          { category: 'Yenileme', title: 'Mevcut Web Sitesini Yenilemek mi, Yeniden Yapmak mı?', lead: 'Doğru yaklaşım, nelerin korunması gerektiğine ve mevcut sitenin hedeflere ulaşmasını neyin engellediğine bağlıdır.', paragraphs: ['Yenileme, mevcut altyapı istikrarlıysa gezinmeyi, içeriği ve görsel sunumu iyileştirebilir. CMS, entegrasyonlar veya site yapısı gereken değişiklikleri desteklemiyorsa yeniden geliştirme değerlendirilebilir.', 'Karar vermeden önce önemli URL’leri, trafik kaynaklarını, formları, içerikleri ve entegrasyonları envanterleyin. URL’ler değiştiğinde yönlendirmeleri planlayın ve yayın sonrası izleme ekleyin. Geçiş sırasında arama görünürlüğü değişebilir; sıfır etki sözü verilmemelidir.'], points: ['Yaklaşım seçmeden önce içerikleri ve işlevleri denetleyin.', 'Altyapı sınırlarını ve entegrasyon bağımlılıklarını kontrol edin.', 'URL’ler değişiyorsa yönlendirme haritası ve izleme planlayın.'] },
          { category: 'CMS', title: 'Kurumsal Web Sitesi İçin Yönetim Paneli Nasıl Seçilir?', lead: 'Ekibinizin sürdürebileceği bir düzenleme akışı seçin; ardından teknik ve ticari sınırları doğrulayın.', paragraphs: ['Sayfaları kimlerin düzenleyeceğini, onay gerekip gerekmediğini, içeriklerin ne sıklıkla değiştiğini ve hangi bilgilerin yapısal tutulacağını değerlendirin. WordPress, Webflow, headless CMS veya özel geliştirme farklı düzenleme modelleri, hosting seçenekleri ve lisans koşulları sunar.', 'Ekibinizin yöneteceği gerçek içerik türlerini inceleyin. Kullanıcı rollerini, yedek sorumluluğunu, dışa aktarma seçeneklerini ve sağlayıcı ya da lisans değiştiğinde ne olacağını sorun. Tek bir platform her proje için en iyi seçenek değildir; tercih ihtiyaçlara göre yapılmalıdır.'], points: ['Ekibinizin yapacağı gerçek düzenleme işlerini test edin.', 'Hosting, lisans ve eklenti giderlerini inceleyin.', 'Erişim, yedekleme ve dışa aktarma sorumluluklarını yazılı hale getirin.'] },
          { category: 'Çok Dilli Web Siteleri', title: 'Çok Dilli Web Sitesi Planlama Rehberi', lead: 'Çok dilli site yalnızca bir dil seçici değil, her dil için içerik ve inceleme planı gerektirir.', paragraphs: ['Hangi sayfa ve formların hangi dillerde yayınlanacağını, ürün adlarının, hukuki bilgilerin veya hizmet açıklamalarının pazara göre değişip değişmediğini belirleyin. Dil menüsüyle birlikte dile özel sayfa başlıklarını ve meta verileri planlayın.', 'Çeviri, terim kullanımı, editoryal inceleme ve güncellemelerin sorumlularını atayın. Arapça ve Urduca için metin, menü, form ve yön karma içeriğinde sağdan sola düzeni kontrol edin. Çeviri ve onay sorumlulukları proje kapsamına açıkça yazılmalıdır.'], points: ['Sayfa ve formları dillere göre eşleştirin.', 'Çeviri ve onay sorumlularını belirleyin.', 'RTL düzenini ve meta verileri gerçek sayfalarda test edin.'] },
          { category: 'Planlama', title: 'Web Sitesi Tesliminde Hangi Erişimleri ve Dosyaları Almalısınız?', lead: 'İyi bir devir, erişimleri, sorumlulukları ve sonraki bakım ihtiyaçlarını açık hale getirir.', paragraphs: ['Yayın öncesinde işletmenizin sahip olduğu hesapları listeleyin: alan adı kayıt firması, hosting, CMS, analitik ve ilgili üçüncü taraf servisleri. Yönetici erişimlerinin kimde olacağını ve bilgilerin güvenli biçimde nasıl aktarılacağını teyit edin.', 'Sözleşme; platform ve üçüncü taraf lisanslarına bağlı olarak kaynak dosyaları, tasarım varlıklarını, içerikleri ve dokümantasyonu tanımlamalıdır. Yayın sonrası sorumlulukları netleştirmek için yedek, güncelleme ve bakım görevlerini de kaydedin.'], points: ['Hesap sahipliğini ve yönetici erişimlerini teyit edin.', 'Kod, tasarım ve içerik teslimatlarını listeleyin.', 'Lisansları ve isteğe bağlı bakım koşullarını belgeleyin.'] },
        ] as Article[],
        cta: 'Web Sitesi Projenizi Konuşalım',
      },
      faq: {
        hero: 'Sık Sorulan Sorular', intro: 'Web sitesi projenize başlamadan önce kapsam, içerik hazırlığı, maliyet ve teslim süreci hakkında bilgi edinin. Buradaki yanıtlar genel yaklaşımımızı açıklar; projenize özel teslimatlar ve ticari koşullar teklifinizde netleştirilir.',
        title: 'Kurumsal Web Sitesi Hakkında Sık Sorulan Sorular',
        groups: [
          { title: 'Hizmet ve Proje Kapsamı', items: [
            ['Kurumsal web sitesi kimler için uygundur?', 'Kurumsal web sitesi; şirketini, hizmetlerini, ürünlerini, referanslarını ve iletişim yollarını müşterilerine anlatmak isteyen işletmelere uygundur. Yerleşik KOBİ’ler, üreticiler, ihracatçılar ve hizmet şirketleri için sayfa ve işlevler işletme ihtiyacına göre planlanır; hizmet yalnızca büyük kurumlara yönelik değildir.'],
            ['Tasarım ve geliştirme aynı hizmetin parçası mı?', 'Evet. PakSoft, planlama, arayüz tasarımı, web sitesinin geliştirilmesi ve yayın hazırlığını tek proje kapsamında ele alabilir. Hangi sayfaların, işlevlerin, içerik çalışmalarının ve teslimatların dahil olduğu teklifinizde açıklanır.'],
            ['Mevcut web sitemizi yenileyebilir misiniz?', 'Evet. Önce mevcut içerik ve işlevleri, URL yapısını, kullanılan altyapıyı ve korunması gereken bağlantıları değerlendiririz. Bulgulara göre hedefli iyileştirme, yeniden tasarım veya daha kapsamlı geçiş için uygun kapsamı belirleriz.'],
            ['Ürün kataloğu ile e-ticaret sitesi arasındaki fark nedir?', 'Ürün kataloğu, ürünleri ve teknik bilgileri tanıtır; teklif veya iletişim talebi toplayabilir. E-ticaret sitesi ise kapsamına göre sepet, ödeme ve sipariş yönetimi gibi satış akışlarını içerir. Çevrim içi satış ihtiyacı varsa bunu ayrı e-ticaret kapsamı olarak planlarız.'],
          ] },
          { title: 'Fiyatlandırma ve Devam Eden Giderler', items: [
            ['Kurumsal web sitesi fiyatı nasıl belirlenir?', 'Teklif; benzersiz sayfa şablonlarını, gerekli işlevleri, dil sayısını, içerik hazırlığı veya aktarımını ve entegrasyonları dikkate alır. Bu unsurlar netleşince proje kapsamı ve ticari koşulları içeren yazılı teklif hazırlanır; burada sabit fiyat veya paket tutarı yayımlanmamıştır.'],
            ['Alan adı ve hosting proje ücretine dahil mi?', 'Her proje için geçerli tek bir dahil olma koşulu bulunmuyor. Alan adı, hosting veya platform aboneliğinin mevcut hesabınızdan mı yönetileceği, yeni bir hizmet gerekip gerekmediği ve ilgili ücret sorumlulukları teklifte belirtilir.'],
            ['Yayından sonra hangi giderler oluşabilir?', 'Alan adı yenilemesi, hosting veya platform aboneliği, ücretli lisanslar ve kullanıma bağlı üçüncü taraf servisleri yinelenen gider oluşturabilir. Bakım, içerik güncelleme desteği ve yeni geliştirmeler ise ihtiyaç ve anlaşmaya bağlıdır; her proje için hepsi gerekli değildir.'],
            ['SEO çalışmaları proje ücretine dahil mi?', 'Web sitesi kapsamına açıklayıcı sayfa yapısı, metadata ve taranabilir gezinme gibi teknik temeller alınabilir. Sürekli SEO ve içerik çalışmaları ile reklam yönetimi ayrı hizmetlerdir; teklif hangi çalışmaların dahil olduğunu açıklar.'],
          ] },
          { title: 'İçerik ve Çok Dilli Yapı', items: [
            ['Metinleri ve görselleri kim hazırlıyor?', 'İçerik sorumluluğu projeye göre kararlaştırılır. İşletme metin, logo, ürün bilgisi ve görselleri sağlayabilir; metin yazımı, çeviri, fotoğraf veya özel görsel üretimi gerekiyorsa bunlar teklif kapsamında ayrıca belirtilir. İçeriğin son doğruluğu ve onayı için sorumlu taraflar da netleştirilir.'],
            ['İçeriklerimiz tamamen hazır olmadan başlayabilir miyiz?', 'Evet. İhtiyaç analizi ve sayfa planı mevcut bilgilerle başlayabilir; hazır olmayan içerikler ve bunlardan sorumlu kişiler not edilir. İçeriklerin geç gelmesi sayfa yerleşimi, inceleme ve yayın takvimini etkileyebileceğinden bu bağımlılık proje planında takip edilir.'],
            ['Türkçe dışında başka dillerde site hazırlayabilir misiniz?', 'Evet. Türkçe, İngilizce, Almanca, Arapça ve Urduca sürümler ihtiyaca göre planlanabilir. Her dil için sayfalar, gezinme, formlar ve metadata değerlendirilir; çeviri, içerik girişi ve editoryal onay sorumlulukları teklifte kararlaştırılır.'],
            ['Arapça ve Urduca sayfalarda sağdan sola tasarım yapılır mı?', 'Evet. Kapsama alındığında sağdan sola (RTL) yön, menüler, form düzeni, yazı tipi ve Türkçe ya da İngilizce terimler gibi çift yönlü metinler birlikte test edilir. RTL arayüz çalışması çeviri hizmetinin otomatik olarak dahil olduğu anlamına gelmez.'],
          ] },
          { title: 'Süreç, Takvim ve Değişiklikler', items: [
            ['Kurumsal web sitesi yapımı ne kadar sürer?', 'Süre; sayfa ve işlev kapsamına, içeriklerin hazır olmasına, dil ve entegrasyon gereksinimlerine, üçüncü taraf erişimlerine ve onayların zamanlamasına bağlıdır. Takvim, gereksinimler netleşince kararlaştırılır; bu hizmet için genel bir sabit teslim süresi taahhüdü bulunmuyor.'],
            ['Tasarımları yayından önce inceleyebilir miyiz?', 'Evet. Süreçte tasarım yönü ve sayfa düzenleri geliştirmeden önce incelenip onaylanır; geliştirme aşamasında da kapsam dahilindeki çalışan sürüm gözden geçirilebilir. Son içerik ve önemli kullanıcı akışları yayın öncesi kontrolde değerlendirilir. İnceleme noktaları proje kapsamına göre planlanır.'],
            ['Kaç revizyon yapılabilir?', 'Tüm projeler için geçerli yayımlanmış sabit revizyon sayısı yoktur. Geri bildirim aşamaları ve revizyon sınırları teklifinizde belirtilir; böylece tasarım onayı ve sonrasındaki değişikliklerin nasıl ele alınacağı baştan anlaşılır.'],
            ['Proje sırasında yeni bir özellik istersek ne olur?', 'Talebin mevcut kapsam, maliyet ve takvime etkisini değerlendiririz. Ek işlevin gerektirdiği çalışma ve ticari koşullar üzerinde anlaşmadan önce uygulamaya başlamayız; mutabık kalınan değişiklik proje planına eklenir.'],
          ] },
          { title: 'Yönetim, Sahiplik ve Erişim', items: [
            ['Web sitesindeki içerikleri kendimiz güncelleyebilir miyiz?', 'Evet, seçilen platformda içerik yönetimi projeye alındıysa ekibiniz üzerinde anlaşılan alanları güncelleyebilir. Sayfa metni veya haber düzenlemek, sitenin işlevini ya da tüm sayfa yerleşimini değiştirmekle aynı şey değildir; düzenlenebilir alanlar ve izinler teklifte tanımlanır.'],
            ['Yönetim paneli kullanımı hakkında bilgi veriyor musunuz?', 'Kullanım bilgilendirmesi ve teslim materyalleri proje kapsamına göre kararlaştırılır. Hangi erişimlerin verileceği, rehberliğin biçimi ve yönetim panelinde ele alınacak içerik türleri teklif veya anlaşmada netleştirilir.'],
            ['Alan adı, içerik ve kaynak kodun sahipliği nasıl belirlenir?', 'Alan adı ve hosting hesapları, müşteri tarafından sağlanan içerikler, projeye özel kod ve tasarım ile üçüncü taraf yazılım ve varlık lisansları birbirinden ayrıdır. Erişim, devir, kullanım hakları ve lisans kısıtları teklif ve anlaşmada belgelenir; burada ayrıca belirtilmeyen mülkiyet hakkı varsayılmaz.'],
            ['Başka bir sağlayıcıyla çalışmak istersek site taşınabilir mi?', 'Taşıma olanağı seçilen platforma, CMS verisinin dışa aktarılmasına, özel geliştirmelere, entegrasyonlara ve üçüncü taraf lisanslarına bağlıdır. Erişim ve taşınabilirlik seçenekleri proje sırasında netleştirilebilir; her platform işlevinin başka sisteme aynen aktarılacağı garanti edilmez.'],
          ] },
          { title: 'Teknik Altyapı ve Yayın Sonrası Destek', items: [
            ['Mevcut alan adımızı ve hostingimizi kullanabilir miyiz?', 'Teknik gereksinimler uyumluysa mevcut hizmetleri kullanmak değerlendirilebilir. Sağlayıcı, platform gereksinimleri, hesap erişimleri ve DNS/yayın ayarları incelenir; gerekiyorsa ek kurulum veya geçiş kapsamı teklifte belirtilir.'],
            ['Site mobil cihazlarda kullanılabilir mi?', 'Responsive tasarım ile sayfa ve temel işlemler farklı ekran boyutlarına uyarlanır. Yayın öncesi, üzerinde anlaşılan cihaz ve tarayıcılarda kontroller yapılır; tüm cihaz ve sürümlerde kusursuz çalışma garantisi verilmez.'],
            ['Site yenilenirken Google sıralamalarımız korunur mu?', 'URL’ler değişiyorsa mevcut adresler eşleştirilir, gerekli yönlendirmeler planlanır ve üzerinde anlaşıldıysa yayın sonrası izleme yapılır. Buna rağmen arama sıralaması veya trafik değişiklikleri tamamen önlenemez ve sıfır kayıp garantisi verilmez.'],
            ['Yayından sonra bakım ve destek nasıl sağlanır?', 'Yayın teslimi, varsa kapsam dahilindeki düzeltmeler ve devam eden bakım ayrı konulardır. Güncelleme, izleme, içerik desteği veya yeni geliştirmeler yalnızca teklif ve anlaşmada tanımlanan kapsamda sağlanır; süre ve yanıt taahhüdü belirtilmemişse varsayılmaz.'],
          ] },
        ] as FaqGroup[],
        cta: 'Bize Sorun',
      },
    },
    labels: { what: 'Ne işe yarar?', why: 'Neden önemlidir?', scope: 'Kapsam notu', included: 'Anlaşılan kapsam', optional: 'İsteğe bağlı çalışma', separate: 'Ayrıca fiyatlandırılır', paksoft: 'PakSoft’un çalışması', client: 'Sizin katkınız', approval: 'Onay adımı', example: 'Örnek gösterim', ctaIntro: 'İhtiyaçlarınızı paylaşın, size uygun proje kapsamını birlikte değerlendirelim.', viewProject: 'Projeyi inceleyin', readGuide: 'Rehberi okuyun', moreGuides: 'Diğer rehberlerin tamamı aşağıda yer alıyor.' },
  },
} satisfies Record<SupportedLocale, { nav: Record<string, string>; pages: Record<CorporateWebsiteSubpageKey, any>; labels: Record<string, string> }>;

const titles: Record<SupportedLocale, Record<CorporateWebsiteSubpageKey, string>> = {
  en: {
    features: 'Corporate Website Features & Functionality | PakSoft', technologies: 'Corporate Website Platforms & CMS Options | PakSoft', process: 'Corporate Website Design & Development Process | PakSoft', portfolio: 'Corporate Website Project Portfolio | PakSoft', pricing: 'Corporate Website Project Pricing Factors | PakSoft', blog: 'Corporate Website Planning Guides | PakSoft', faq: 'Corporate Website Project FAQs | PakSoft',
  },
  tr: {
    features: 'Kurumsal Web Sitesi Özellikleri ve Modülleri | PakSoft', technologies: 'Kurumsal Web Sitesi Teknolojileri ve Altyapı Seçimi | PakSoft', process: 'Kurumsal Web Tasarım Süreci ve Proje Aşamaları | PakSoft', portfolio: 'Kurumsal Web Sitesi Örnekleri ve Projelerimiz | PakSoft', pricing: 'Kurumsal Web Sitesi Fiyatları ve Paketleri | PakSoft', blog: 'Kurumsal Web Sitesi Planlama Rehberleri | PakSoft', faq: 'Kurumsal Web Sitesi Hakkında Sık Sorulan Sorular | PakSoft',
  },
};

const descriptions: Record<SupportedLocale, Record<CorporateWebsiteSubpageKey, string>> = {
  en: {
    features: 'Explore corporate website pages, catalogues, enquiry tools, content management, languages and integrations. Project scope is agreed in the proposal.',
    technologies: 'Compare WordPress, Webflow, React/Next.js and headless CMS approaches by editing needs, flexibility, hosting and ongoing costs.',
    process: 'See the discovery, planning, design, development, content, testing, launch and handover stages for a corporate website project.',
    portfolio: 'Review the documented Sun Container corporate website requirement, PakSoft contribution and delivered functionality.',
    pricing: 'Understand the scope factors, optional work and continuing provider costs used to prepare a corporate website proposal.',
    blog: 'Practical guides to corporate website planning, pricing, redesigns, CMS selection, multilingual content and handover.',
    faq: 'Answers about corporate website scope, content, ownership, schedule, SEO migration, costs and support.',
  },
  tr: {
    features: 'Kurumsal web sitesi özelliklerini keşfedin: yönetim paneli, mobil uyumluluk, çok dilli yapı, ürün kataloğu ve teklif formları. Projenizin kapsamını belirleyin.',
    technologies: 'Kurumsal web siteniz için platform, yönetim paneli ve hosting seçeneklerini değerlendirin. Bakım, lisans ve içerik yönetimi gereksinimlerini öğrenin.',
    process: 'Kurumsal web sitesi projenizin analiz, tasarım, geliştirme, test ve yayın aşamalarını inceleyin. İçerik, onay ve teslim sorumluluklarını öğrenin.',
    portfolio: 'PakSoft’un kurumsal web sitesi projelerini inceleyin. İşletme ihtiyaçları, içerik yapıları, çok dilli ekranlar ve proje kayıtlarında belirtilen işlevler hakkında bilgi alın.',
    pricing: 'Kurumsal web sitesi fiyatlarını etkileyen kapsamı, paket seçeneklerini ve yıllık giderleri inceleyin. İhtiyaçlarınıza uygun proje teklifi alın.',
    blog: 'Kurumsal web sitesi planlama, fiyatlandırma, yenileme, CMS, çok dilli içerik ve devir konularında rehberler.',
    faq: 'Kurumsal web sitesi yapımı hakkında sorularınızı yanıtlıyoruz: fiyat, süreç, içerik yönetimi, çok dilli yapı, sahiplik, hosting ve destek.',
  },
};

export function getCorporateWebsiteSubpageMeta(page: CorporateWebsiteSubpageKey, locale: SupportedLocale) {
  return { title: titles[locale][page], description: descriptions[locale][page] };
}

export function getCorporateWebsiteGuide(slug: string, locale: SupportedLocale) {
  const index = guideSlugs.indexOf(slug);
  if (index < 0) return null;
  const article = content[locale].pages.blog.articles[index] as Article;
  return { ...article, slug };
}

export function getCorporateWebsiteGuideMeta(slug: string, locale: SupportedLocale) {
  const guide = getCorporateWebsiteGuide(slug, locale);
  return guide ? { title: `${guide.title} | PakSoft`, description: guide.lead } : null;
}

export function CorporateWebsiteGuidePage({ slug, locale }: { slug: string; locale: SupportedLocale }) {
  const guide = getCorporateWebsiteGuide(slug, locale);
  if (!guide) return null;
  const blogPath = localizedHref('/services/corporate-website-design/blog', locale);
  const homePath = localizedHref('/services/corporate-website-design', locale);
  return <main className="min-h-screen bg-white">
    <section className="bg-background-gray section-compact">
      <div className="container mx-auto max-w-[1200px] px-4">
        <nav aria-label={locale === 'tr' ? 'İçerik yolu' : 'Breadcrumb'} className="mb-6 text-sm text-gray-600"><Link href={homePath} className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{locale === 'tr' ? 'Kurumsal Web Tasarım' : 'Corporate Website Design'}</Link><span className="mx-2" aria-hidden="true">/</span><Link href={blogPath} className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{locale === 'tr' ? 'Rehberler' : 'Guides'}</Link><span className="mx-2" aria-hidden="true">/</span><span aria-current="page">{guide.title}</span></nav>
        <p className="text-overline text-heritage-turquoise-deep">{guide.category}</p><h1 className="text-display mt-3 max-w-4xl font-medium text-gray-950">{guide.title}</h1><p className="text-body mt-5 max-w-3xl text-gray-700">{guide.lead}</p>
      </div>
    </section>
    <PageSection title={locale === 'tr' ? 'Bu Rehberde' : 'In This Guide'} tone="ivory">
      <article className="max-w-4xl"><div className="space-y-5 text-body leading-relaxed text-gray-700">{guide.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><h2 className="mt-8 text-title font-semibold text-gray-900">{locale === 'tr' ? 'Kontrol listesi' : 'Checklist'}</h2><ul className="mt-4 space-y-3">{guide.points.map((point) => <li key={point} className="flex gap-3 text-body leading-relaxed text-gray-700"><CheckIcon className="mt-1 h-5 w-5 shrink-0 text-heritage-turquoise" aria-hidden="true" />{point}</li>)}</ul></article>
    </PageSection>
    <div className="container mx-auto max-w-[1200px] px-4"><BlogInternalLinksCta locale={locale} compact /></div>
    <div className="bg-background-gray section-compact"><div className="container mx-auto max-w-[1200px] px-4"><Link href={blogPath} className="inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise"><ArrowRightIcon className="h-4 w-4 rotate-180 rtl:rotate-0" aria-hidden="true" />{locale === 'tr' ? 'Tüm rehberlere dönün' : 'Back to all guides'}</Link></div></div>
    <CallToAction locale={locale} label={content[locale].pages.blog.cta} />
  </main>;
}

const sceneFor = (page: CorporateWebsiteSubpageKey) => {
  const props = { accent: '#0e7c7b' };
  switch (page) {
    case 'features': return <FeaturesScene {...props} />;
    case 'technologies': return <TechStackScene {...props} />;
    case 'process': return <ProcessScene {...props} />;
    case 'portfolio': return <PortfolioScene {...props} />;
    case 'pricing': return <PricingTiersScene {...props} />;
    case 'blog': return <BlogFeedScene {...props} />;
    case 'faq': return <FaqScene {...props} />;
  }
};

function localizedHref(path: string, locale: SupportedLocale) {
  return `/${locale}${localizeFullPath(path, locale)}`;
}

function PageSection({ title, children, tone = 'white', id }: { title: string; children: ReactNode; tone?: 'white' | 'gray' | 'ivory'; id?: string }) {
  const background = tone === 'gray' ? 'bg-background-gray' : tone === 'ivory' ? 'bg-heritage-ivory' : 'bg-white';
  return (
    <section id={id} className={`${background} corporate-section-enter section-compact`}>
      <div className="container mx-auto max-w-[1200px] px-4">
        <h2 className="max-w-4xl text-headline font-medium leading-tight text-gray-900">{title}<span aria-hidden="true" className="mt-4 block h-1 w-12 rounded-full bg-heritage-turquoise" /></h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function CallToAction({ locale, label, intro, heading, secondaryLabel, secondaryHref }: { locale: SupportedLocale; label: string; intro?: string; heading?: string; secondaryLabel?: string; secondaryHref?: string }) {
  const c = content[locale];
  return (
    <section className="bg-gray-950 section-compact">
      <div className="container mx-auto max-w-[1200px] px-4 text-center">
        <h2 className="text-headline font-medium text-white">{heading || label}</h2>
        <p className="text-body mx-auto mt-3 max-w-2xl text-gray-300">{intro || c.labels.ctaIntro}</p>
        {secondaryLabel && secondaryHref ? <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href={localizedHref('/start-project?service=corporate-website-design', locale)} className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 motion-reduce:transition-none">
            {label}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
          <Link href={secondaryHref} className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-gray-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-gray-300 hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 motion-reduce:transition-none">{secondaryLabel}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></Link>
        </div> : <Link href={localizedHref('/start-project?service=corporate-website-design', locale)} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 motion-reduce:transition-none">
          {label}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </Link>}
      </div>
    </section>
  );
}

function TurkishTechnologiesContent() {
  const comparison = [
    ['İçerik düzenleme', 'Yönetim panelinde seçilen sayfa ve içerik türleri düzenlenebilir.', 'Webflow ve Framer editörlerinde tanımlı içerik alanları düzenlenebilir.', 'Bağlı CMS veya özel yönetim arayüzünde projede tanımlanan alanlar düzenlenebilir.'],
    ['Özel işlevler', 'Eklenti veya özel geliştirme ile kapsam dahilinde genişletilebilir.', 'Platformun sunduğu özellikler ve entegrasyonlarla sınırlı olabilir.', 'Özel işlevler geliştirilebilir; kapsam, süre ve bakım gereksinimi ayrıca belirlenir.'],
    ['Çok dilli içerik', 'Seçilen eklenti ve içerik modeline göre planlanır.', 'Yerelleştirme özellikleri ve plan koşulları kontrol edilerek yapılandırılır.', 'CMS, dil ilişkileri ve arayüz desteği birlikte tasarlanır.'],
    ['Entegrasyonlar', 'Eklenti, API veya özel bağlantı seçenekleri değerlendirilir.', 'Mevcut uygulamalar, gömülü araçlar veya API seçenekleri incelenir.', 'API ve diğer bağlantılar ihtiyaca göre geliştirilir.'],
    ['Hosting ve bakım', 'Hosting sağlayıcısı, WordPress çekirdeği, tema ve eklenti güncellemeleri planlanır.', 'Yayın ve barındırma platform hesabı ve planına bağlıdır.', 'Uygun yayın ortamı, dağıtım, izleme ve teknik bakım kapsamı netleştirilir.'],
    ['Lisans ve abonelik', 'Hosting, ücretli tema/eklentiler veya servisler ek maliyet doğurabilir.', 'Platform planı ve varsa ek servis ücretleri sağlayıcı koşullarına bağlıdır.', 'CMS, hosting, API veya diğer servislerin lisans ve kullanım ücretleri olabilir.'],
    ['Dışa aktarma ve taşıma', 'Taşıma; tema, eklenti, veri ve özel geliştirmelerin uyumuna bağlıdır.', 'Dışa aktarma seçenekleri platforma ve kullanılan özelliklere göre değişir; CMS ve bazı işlevler dışa aktarılan kodla taşınmayabilir.', 'Kod ve içerik taşınabilirliği kullanılan CMS, servisler, mimari ve lisanslara göre değerlendirilir.'],
  ];
  const platformCards = [
    { name: 'WordPress', body: 'Sayfalar, haberler ve medya gibi içeriklerin yönetim panelinden güncellenebildiği bir içerik yönetim sistemidir. İçerik türleri, tema ve eklentiler projeye göre yapılandırılır; her eklenti gerekli değildir. Hosting, lisanslı bileşenler, yedekleme ve çekirdek/eklenti güncellemelerinin sorumluluğu teklifte netleştirilir.', fit: 'İçeriğini düzenli güncelleyen ve tanımlı bir yönetim paneli isteyen işletmeler için değerlendirilebilir.', note: 'Eklentilerin uyumluluğu ve güncelleme takibi gerekir; taşıma çalışması kullanılan bileşenlere bağlıdır.' },
    { name: 'Webflow', body: 'Görsel site oluşturma, içerik koleksiyonları ve düzenleme araçlarını aynı hizmet içinde sunar. İçerik ekibi belirlenen alanları düzenleyebilir; sayfa yapısında ne kadar değişiklik yapılacağı kullanıcı rolü ve proje düzenine bağlıdır. Özel alan adıyla yayınlama ve bazı özellikler Site planına bağlıdır.', fit: 'Görsel düzenleme deneyimi ve yapılandırılmış içerik yayını öncelikli olduğunda değerlendirilebilir.', note: 'Site planı ve platform hizmetleri sağlayıcının koşullarına bağlıdır. Kod dışa aktarımı CMS verisini ve bazı özellikleri içermez; dışarı taşıma öncesinde bağımlılıklar incelenmelidir.' },
    { name: 'Framer', body: 'Sayfa tasarımı, yayın ve içerik düzenleme özellikleri bir arada sunulan barındırılan bir platformdur. Ekip, tanımlı CMS içeriklerini ve sayfadaki belirli metinleri düzenleyebilir; roller ve izinler seçilen planın sunduğu özelliklere göre yapılandırılır.', fit: 'Sayfa tasarımı ve yayın sürecini tek platformda yönetmek isteyen projelerde seçenek olabilir.', note: 'Özel alan adı, yayın ve bazı özellikler plan koşullarına bağlıdır. Hesap, abonelik ve platform erişimi için sorumluluklar önceden belirlenir.' },
    { name: 'Next.js ve uygun CMS', body: 'Next.js web arayüzünü geliştirmek için kullanılan bir framework’tür; tek başına içerik yönetim paneli değildir. İçerik düzenleme için ayrıca bir CMS veya projeye özel yönetim arayüzü tasarlanıp bağlanır. Hangi sayfa ve alanların düzenlenebileceği bu yapıda belirlenir.', fit: 'Özel sayfa yapısı, iş akışı veya sistem bağlantısı gerektiğinde özel geliştirme yaklaşımı olarak değerlendirilebilir.', note: 'Yayın ortamı, CMS, dağıtım ve teknik bakım ayrıca planlanır. Özel geliştirme kendiliğinden sınırsız düzenleme veya sınırsız taşınabilirlik sağlamaz.' },
  ];
  const faq = [
    ['Kurumsal web sitesi için WordPress zorunlu mu?', 'Hayır. WordPress, Webflow, Framer veya özel geliştirme seçenekleri içerik düzenleme, işlev, entegrasyon, bakım ve bütçe gereksinimleriyle karşılaştırılır. Uygun seçenek proje kapsamı belirlendikten sonra önerilir.'],
    ['Özel yazılım bir sitede içerikleri kendimiz değiştirebilir miyiz?', 'Evet, düzenlenecek içerikler için bir CMS veya yönetim arayüzü projeye eklenebilir. Hangi sayfa ve alanların düzenlenebileceği, kullanıcı rolleri ve yayın adımları teklif kapsamında belirlenir.'],
    ['Mevcut hostingimizi kullanabilir miyiz?', 'Mevcut hizmetin teknik gereksinimleri seçilen platformu destekliyorsa bu değerlendirilebilir. Erişim, yapılandırma, alan adı ve olası geçiş ihtiyaçları proje öncesinde kontrol edilir.'],
    ['Sonradan başka bir altyapıya geçebilir miyiz?', 'Geçiş olanağı kullanılan platforma, içerik modeline, entegrasyonlara ve lisanslara bağlıdır. Taşınabilir içerik ve kod seçenekleri proje başında konuşulabilir; her platform özelliği aynı şekilde aktarılamayabilir.'],
    ['Hangi lisans ve abonelik giderleri oluşabilir?', 'Hosting veya platform planı, ücretli tema ve eklentiler, CMS, API ve diğer üçüncü taraf hizmetleri gider oluşturabilir. Gereken sağlayıcılar ve kimin hesabından yönetileceği teklifte açıklanır.'],
    ['Altyapı seçimi SEO sonuçlarını garanti eder mi?', 'Hayır. Platform tek başına sıralama veya trafik sonucu garanti etmez. Sayfa yapısı, içerik, teknik yapı ve yayın sonrası çalışmalar birlikte rol oynar; temel site yapılandırması sürekli SEO hizmetinden ayrıdır.'],
  ];
  const links = [
    ['/services/corporate-website-design/features', 'Web sitesi özellikleri'],
    ['/services/corporate-website-design/process', 'Proje süreci'],
    ['/services/corporate-website-design/portfolio', 'Projeler'],
    ['/services/corporate-website-design/pricing', 'Fiyatlandırma ve kapsam'],
    ['/services/corporate-website-design/faq', 'Sık sorulan sorular'],
  ];

  return <>
    <PageSection title="Teknoloji Seçimini Nasıl Yapıyoruz?" tone="gray">
      <p className="max-w-4xl text-body text-gray-600">Seçimi tek bir teknoloji adına göre değil, sitenin günlük kullanımına göre yapıyoruz. İçeriği kimin yöneteceğini, hangi içerik türleri ve dillerin gerektiğini, işlevleri ve mevcut sistemleri, entegrasyonları, hosting ve bakım yaklaşımını, bütçeyi ve ilerideki genişleme ihtiyacını birlikte değerlendiriyoruz. Her işletme için geçerli tek bir en iyi platform yoktur.</p>
      <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{['İçeriği kim yönetecek?', 'Hangi içerik ve diller yayınlanacak?', 'Hangi işlevler ve entegrasyonlar gerekli?', 'Mevcut sistemlerle bağlantı gerekiyor mu?', 'Hosting ve bakım sorumluluğu kimde olacak?', 'Bütçe ve gelecekteki genişleme ihtiyacı nedir?'].map((x, i) => <li key={x} className="flex gap-3 border-b border-gray-200 py-3 text-sm leading-6 text-gray-700"><span className="text-overline text-heritage-turquoise-deep">0{i + 1}</span>{x}</li>)}</ul>
    </PageSection>

    <PageSection title="Kurumsal Web Sitesi İçin Altyapı Seçenekleri">
      <div className="grid gap-4 md:grid-cols-2">{platformCards.map((item, i) => <article key={item.name} className="corporate-info-card h-full rounded-xl border border-gray-200 border-t-2 border-t-heritage-turquoise bg-white p-5 md:p-6">
        <div className="flex items-start gap-3"><span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-heritage-turquoise-light text-sm font-semibold text-heritage-turquoise-deep">0{i + 1}</span><h3 className="text-lg font-semibold text-gray-900">{item.name}</h3></div>
        <p className="mt-4 text-sm leading-6 text-gray-700">{item.body}</p>
        <dl className="mt-4 space-y-3 border-t border-gray-200 pt-4 text-sm leading-6"><div><dt className="font-semibold text-gray-900">Hangi durumda uygun olabilir?</dt><dd className="mt-1 text-gray-600">{item.fit}</dd></div><div><dt className="font-semibold text-gray-900">Dikkat edilmesi gerekenler</dt><dd className="mt-1 text-gray-600">{item.note}</dd></div></dl>
      </article>)}</div>
    </PageSection>

    <PageSection title="Platformları Hangi Kriterlerle Karşılaştırmalısınız?" tone="gray" id="platform-comparison">
      <p className="max-w-4xl text-body text-gray-600">Aşağıdaki tablo genel farkları özetler. Platformun yapılandırması, seçilen eklenti ve hizmet planı sonucu değiştirebilir; kesin kapsam proje gereksinimleri üzerinden belirlenir.</p>
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise" tabIndex={0} aria-label="Platform karşılaştırma tablosu, yatay kaydırılabilir">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm leading-6"><caption className="sr-only">WordPress, barındırılan görsel platformlar ve Next.js ile CMS yaklaşımının karşılaştırması</caption><thead className="bg-gray-950 text-white"><tr><th scope="col" className="w-40 px-4 py-3 font-semibold">Kriter</th><th scope="col" className="px-4 py-3 font-semibold">WordPress</th><th scope="col" className="px-4 py-3 font-semibold">Webflow / Framer</th><th scope="col" className="px-4 py-3 font-semibold">Next.js + CMS</th></tr></thead><tbody>{comparison.map(([criterion, wp, hosted, custom]) => <tr key={criterion} className="border-t border-gray-200 align-top even:bg-background-gray"><th scope="row" className="px-4 py-3 font-semibold text-gray-900">{criterion}</th><td className="px-4 py-3 text-gray-700">{wp}</td><td className="px-4 py-3 text-gray-700">{hosted}</td><td className="px-4 py-3 text-gray-700">{custom}</td></tr>)}</tbody></table>
      </div>
      <p className="mt-3 text-caption text-gray-600">Karşılaştırma genel bilgilendirmedir; özellik, dışa aktarma ve plan koşulları sağlayıcıya ve kullanılan sürüme göre değişebilir.</p>
    </PageSection>

    <PageSection title="Yönetim Paneli ve İçerik Güncelleme">
      <div className="grid items-center gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-xl border border-heritage-sand bg-heritage-ivory p-5 md:p-6"><p className="text-overline text-heritage-turquoise-deep">Örnek gösterim · CMS içerik alanları</p><div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-gray-200 bg-background-gray px-4 py-3"><span className="text-sm font-semibold text-gray-800">İçerik yönetimi</span><span className="rounded-full bg-heritage-turquoise-light px-2.5 py-1 text-xs font-semibold text-heritage-turquoise-deep">Taslak</span></div><div className="space-y-4 p-4"><div><span className="text-xs font-medium text-gray-600">Sayfa başlığı</span><div className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800">Hizmetlerimiz</div></div><div><span className="text-xs font-medium text-gray-600">Kısa açıklama</span><div className="mt-1 min-h-14 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500">İçerik alanı örneği</div></div><div className="flex justify-end"><span className="rounded-md bg-heritage-turquoise px-3 py-2 text-xs font-semibold text-white">Önizleme / Yayınla</span></div></div></div><p className="mt-3 text-xs leading-5 text-gray-600">Bu çizim açıklayıcı bir örnektir; çalışan bir PakSoft yönetim paneli ekranı değildir.</p></div>
        <div><p className="text-body text-gray-600">Yönetim panelinde hangi içerik türlerinin değiştirilebileceği önceden belirlenir. Metin, görsel, hizmet, proje ve haber alanları düzenlenebilir; sayfa şablonunun tamamını serbestçe değiştirmek ayrı bir ihtiyaçtır ve her kurulumda bulunmaz.</p><ul className="mt-5 space-y-4 text-sm leading-6 text-gray-700"><li><strong className="text-gray-900">Düzenlenebilir içerik:</strong> Sayfalar, haberler, görseller ve diğer içerik türleri seçilen platforma göre tanımlanır.</li><li><strong className="text-gray-900">Kullanıcı rolleri:</strong> Farklı düzenleme ve yayın izinleri gerekiyorsa ayrıca planlanır.</li><li><strong className="text-gray-900">Önizleme ve yayın:</strong> Taslak, onay ve yayın adımları sistemin özellikleriyle ve proje gereksinimleriyle belirlenir.</li><li><strong className="text-gray-900">Teslim:</strong> Erişimler, kullanım bilgilendirmesi ve teslim materyalleri teklifte açıklanır.</li></ul><Link href={localizedHref('/services/corporate-website-design/features', 'tr')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">İçerik ve modül özelliklerini inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></div>
      </div>
    </PageSection>

    <PageSection title="Tasarım Araçları ve Geliştirme Altyapısı Arasındaki Fark" tone="ivory">
      <div className="grid gap-4 md:grid-cols-4">{[
        ['Tasarım aracı', 'Figma gibi araçlar arayüz taslağı ve prototip oluşturur.'],
        ['Platform veya framework', 'Webflow/WordPress yayın sistemi; Next.js ise web arayüzü geliştirme framework’üdür.'],
        ['İçerik yönetimi', 'CMS, ekip üyelerinin tanımlı içerikleri düzenlemesini sağlar. Özel projede ayrıca kurulabilir.'],
        ['Hosting', 'Site dosyalarının ve gerekli uygulamaların ziyaretçilere sunulduğu hizmettir.'],
      ].map(([title, detail]) => <article key={title} className="border-s-2 border-heritage-turquoise ps-4"><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{detail}</p></article>)}</div>
      <p className="mt-5 text-sm leading-6 text-gray-700">Bir tasarım dosyası tek başına çalışan bir web sitesi değildir; uygulama, içerik yönetimi ve yayın ortamı ayrıca planlanır.</p>
    </PageSection>

    <PageSection title="Hosting, Alan Adı ve Üçüncü Taraf Hizmetler">
      <p className="max-w-4xl text-body text-gray-600">Alan adı ve DNS ayarları, sitenin barındırılması ve e-posta gibi hizmetler farklı sağlayıcılar üzerinden yönetilebilir. Form iletimi, e-posta gönderimi veya API bağlantıları da ek hizmetlere bağlı olabilir. Kullanılacak hesaplar, faturalandırma ve erişim sorumlulukları teklif ve anlaşmada netleştirilir; hosting veya başka bir servis otomatik olarak dahil kabul edilmez.</p>
      <ul className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{['Alan adı kaydı ve DNS', 'Hosting veya platform aboneliği', 'Kurumsal e-posta', 'Form ve e-posta iletim hizmetleri', 'Harici API ve bağlı servisler', 'Sağlayıcı hesapları ve erişimler'].map(x => <li key={x} className="border-b border-gray-200 py-3 text-sm text-gray-700">{x}</li>)}</ul>
    </PageSection>

    <PageSection title="Performans, SEO ve Erişilebilirlik" tone="gray">
      <p className="max-w-4xl text-body text-gray-600">Teknik altyapıda görsellerin uygun boyutta sunulması, gerekli durumlarda önbellekleme, taranabilir sayfa ve bağlantı yapısı, sayfa metaverisi ve dil yapılandırması değerlendirilir. Navigasyon ve formların klavye ile kullanılabilmesi, okunabilir etiketler ve yayın öncesi kontroller de kapsam doğrultusunda ele alınır. Sonuçlar uygulama ve içerik dahil birçok etkene bağlıdır; belirli sıralama, performans puanı veya yasal uygunluk garantisi verilmez.</p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link href={localizedHref('/services/seo', 'tr')} className="font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Sürekli SEO hizmetlerini inceleyin <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link><Link href={localizedHref('/services/corporate-website-design/features', 'tr')} className="font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Web sitesi özellikleri ve temel çalışmaları görün <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link></div>
    </PageSection>

    <PageSection title="Bakım, Lisanslar ve Devam Eden Maliyetler">
      <p className="max-w-4xl text-body text-gray-600">Platform aboneliği, PakSoft’un bakım hizmetiyle aynı şey değildir. Güncelleme, uyumluluk kontrolü, yedekleme, izleme, teknik destek ve yeni geliştirme ihtiyaçlarının sorumluluğu ayrıca tanımlanır.</p>
      <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">{[
        ['Hosting veya platform aboneliği', 'Sağlayıcının barındırma ve seçilen özellikler için belirlediği plan.'],
        ['Ücretli eklenti ve lisanslar', 'Tema, eklenti, CMS veya başka yazılım bileşenlerinin lisans koşulları.'],
        ['Güncelleme ve uyumluluk', 'WordPress çekirdeği, tema ve eklentiler gibi bileşenlerin takip edilmesi.'],
        ['Yedekleme ve izleme', 'Hizmet kapsamına alınırsa sıklığı ve sorumlusu ayrıca belirlenir.'],
        ['API veya servis kullanımı', 'Harici hizmetlerde kullanım hacmine bağlı ücret oluşabilir.'],
        ['Bakım ve yeni geliştirme', 'PakSoft desteği ve sonraki işler ayrı kapsam ve ticari koşullarla belirlenir.'],
      ].map(([title, detail]) => <li key={title} className="border-b border-gray-200 py-4"><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-600">{detail}</p></li>)}</ul>
      <Link href={localizedHref('/services/corporate-website-design/pricing', 'tr')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Proje kapsamı ve fiyatlandırmayı inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
    </PageSection>

    <PageSection title="Sahiplik, Erişim ve Başka Bir Sisteme Taşınma" tone="ivory">
      <p className="max-w-4xl text-body text-gray-700">Alan adı hesabı, hosting hesabı, web sitesi içeriği, projeye özel kod ve tasarım, üçüncü taraf yazılım ve varlık lisansları ile dışa aktarılabilir veriler ayrı ayrı değerlendirilir. Erişimler, devir kapsamı, kullanım hakları ve lisans kısıtları teklif ve anlaşmada belgelenir; üçüncü taraf fikri mülkiyet hakları ilgili lisanslara tabidir.</p>
      <p className="mt-4 max-w-4xl text-body text-gray-700">Başka bir sisteme geçiş; içerik dışa aktarma olanaklarına, kullanılan platform özelliklerine, entegrasyonlara ve lisanslara bağlıdır. Platforma bağlı içerik veya işlevler taşınırken yeniden kurulmayı gerektirebilir; bu nedenle olası geçiş ihtiyaçlarını baştan değerlendirmek yararlıdır.</p>
    </PageSection>

    <PageSection title="Kullanılan Teknolojilere Göre Proje Örnekleri" tone="gray">
      <div className="grid gap-5 lg:grid-cols-2">
        <article className="overflow-hidden rounded-xl border border-gray-200 bg-white"><Image src="/images/portfolio/sun-container.png" alt="Sun Container kurumsal web sitesi ana sayfası" width={1200} height={675} sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[16/8] w-full object-cover object-top" /><div className="p-5"><p className="text-overline text-heritage-turquoise-deep">Kurumsal web sitesi · Almanya</p><h3 className="mt-2 text-lg font-semibold text-gray-900">Sun Container GmbH</h3><p className="mt-2 text-sm leading-6 text-gray-600">Proje kaydında modüler konteyner üreticisinin ürün bilgileri ve yapılandırıcı/teklif akışı ihtiyacı belgelenmiştir. Bu web sitesi için kaydedilen teknoloji yığını PHP, jQuery, Bootstrap ve LiteSpeed’dir. Bu örnek, projenin kayıtlı uygulamasını gösterir; genel platform önerisi değildir.</p><p className="mt-3 text-xs leading-5 text-gray-500">Kayıtlı teknolojiler: PHP, jQuery, Bootstrap, LiteSpeed</p><Link href={localizedHref('/projects/sun-container', 'tr')} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Sun Container projesini inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></div></article>
        <article className="overflow-hidden rounded-xl border border-gray-200 bg-white"><Image src="/images/portfolio/sun-container-tracking.png" alt="Sun Container sipariş takip portalının ekran görüntüsü" width={1200} height={675} sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[16/8] w-full object-cover object-top" /><div className="p-5"><p className="text-overline text-heritage-turquoise-deep">Ayrı sipariş takip portalı</p><h3 className="mt-2 text-lg font-semibold text-gray-900">Sun Container Tracking</h3><p className="mt-2 text-sm leading-6 text-gray-600">Proje kaydında, sipariş durumunu e-posta ve takip numarasıyla sorgulatan özel bir müşteri portalı belgelenmiştir. Portal yığını Next.js, React, TypeScript, Cloudflare Turnstile ve Vercel olarak listelenmiştir. İçerik düzenleme paneli bu kayıtlı işlevin parçası olarak belirtilmediğinden burada CMS örneği sayılmamıştır.</p><p className="mt-3 text-xs leading-5 text-gray-500">Kayıtlı teknolojiler: Next.js, React, TypeScript, Cloudflare Turnstile, Vercel</p><Link href={localizedHref('/projects/sun-container-tracking', 'tr')} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Sipariş takip portalı projesini inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></div></article>
      </div>
    </PageSection>

    <PageSection title="Altyapı Seçimi Hakkında Sorular">
      <div className="grid max-w-5xl gap-4 md:grid-cols-2">{faq.map(([question, answer]) => <article key={question} className="rounded-xl border border-gray-200 bg-white p-5"><h3 className="font-semibold leading-snug text-gray-900">{question}</h3><p className="mt-3 text-sm leading-6 text-gray-600">{answer}</p></article>)}</div>
      <Link href={localizedHref('/services/corporate-website-design/faq', 'tr')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Kurumsal web sitesi hakkında sık sorulan tüm sorular <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
      <nav aria-label="Kurumsal web sitesi hizmeti bağlantıları" className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-t border-gray-200 pt-5">{links.map(([href, label]) => <Link key={href} href={localizedHref(href, 'tr')} className="text-sm font-medium text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{label} <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link>)}</nav>
    </PageSection>
  </>;
}

function TurkishPortfolioContent() {
  const checklist = [
    'Site, işletmenin ne sunduğunu anlaşılır biçimde anlatıyor mu?',
    'Ziyaretçiler hizmet veya ürün bilgilerine kolayca ulaşabiliyor mu?',
    'İletişim ve teklif talebi adımları görünür ve anlaşılır mı?',
    'Mobil ekranda gezinmek ve önemli işlemleri tamamlamak kolay mı?',
    'İçerik ve dil gereksinimleri karşılanmış mı?',
    'İşletme, teslim sonrası üzerinde anlaşılan içerikleri yönetebiliyor mu?',
  ];
  const faqs = [
    ['Portföydeki bir siteye benzer bir proje hazırlayabilir misiniz?', 'Bir örnek, ihtiyaçları konuşmak için başlangıç noktası olabilir. Yeni projede işletmenizin hedefleri, içerikleri ve işlevleri değerlendirilir; başka bir markanın korunan tasarımını veya varlıklarını kopyalamadan özgün bir kapsam belirlenir.'],
    ['Projelerde PakSoft’un hangi işleri yaptığını nasıl öğrenebilirim?', 'Bu sayfada her örnek için proje kaydında yer alan işletme ihtiyacını, PakSoft’un belgelenmiş katkısını ve kayıtlı işlevleri ayrı ayrı açıklıyoruz. Belirli bir teslimatın kapsamını öğrenmek için proje görüşmesinde ilgili örneği paylaşabilirsiniz.'],
    ['Kendi sektörümüzden bir örnek yoksa çalışabilir miyiz?', 'Evet. İlk görüşmede işletmenizin hedefleri, ziyaretçileri, içerik ve işlev gereksinimleri değerlendirilir. Benzer sektör deneyimi veya belirli bir uzmanlık hakkında bu portföyde belgelenmeyen bir iddiada bulunmuyoruz.'],
    ['Mevcut web sitemizi yeniden tasarlayabilir misiniz?', 'Mevcut içerik, sayfa yapısı, kullanılan platform ve değişmesi gereken URL’ler incelenerek yenileme kapsamı belirlenebilir. Taşınacak içerik, yönlendirmeler ve yayın kontrolleri proje planında ele alınır.'],
    ['Projemizin portföyde gösterilmesi zorunlu mu?', 'Portföyde kamuya açık sunum ve gizlilik koşulları müşteriyle yapılan anlaşmada netleştirilir. Burada her projeyi yayımlama hakkı veya zorunluluğu bulunduğunu varsaymıyoruz.'],
  ];
  const related = [
    ['/services/corporate-website-design/features', 'Web sitesi özellikleri'],
    ['/services/corporate-website-design/technologies', 'Teknoloji ve altyapı seçenekleri'],
    ['/services/corporate-website-design/process', 'Proje süreci'],
    ['/services/corporate-website-design/pricing', 'Fiyatlandırma ve kapsam'],
    ['/services/corporate-website-design/faq', 'Sık sorulan sorular'],
  ];
  const projectHref = (slug: string) => localizedHref(`/projects/${slug}`, 'tr');

  return <>
    <PageSection title="Seçili Kurumsal Web Sitesi Projeleri" tone="gray" id="selected-projects">
      <p className="max-w-4xl text-body text-gray-600">Kurumsal web sitesi örnekleri arasında proje ihtiyacı ve teslim edilen yapısı belgelenmiş çalışmaları öne çıkarıyoruz. Şu anda bu kapsamda ayrıntıları ve uygun ekran görüntüsü doğrulanabilen bir şirket sitesi bulunuyor.</p>
      <article className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <Link href={projectHref('sun-container')} className="group block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-heritage-turquoise" aria-label="Sun Container GmbH proje sayfasını açın">
          <Image src="/images/portfolio/sun-container.png" alt="Sun Container kurumsal web sitesi; modüler konteyner ürünlerini, Almanca ve İngilizce dil seçeneklerini gösteren ana sayfa görüntüsü" width={1366} height={850} sizes="(max-width: 768px) 100vw, 1200px" priority className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.01] motion-reduce:transition-none" />
        </Link>
        <div className="grid gap-6 p-5 md:grid-cols-[.75fr_1.25fr] md:p-7">
          <div><p className="text-overline text-heritage-turquoise-deep">Modüler konteyner ve inşaat</p><h3 className="mt-2 text-title font-medium text-gray-900">Sun Container GmbH</h3><p className="mt-3 text-sm leading-6 text-gray-600">Almanya pazarında modüler konteyner ürünlerini ve kullanım seçeneklerini tanıtan şirket web sitesi. Görselde Almanca ve İngilizce dil seçimi de yer alıyor.</p></div>
          <div><p className="text-overline text-gray-600">Proje kaydında belgelenen kapsam</p><p className="mt-2 text-sm leading-6 text-gray-700">Kayıtlı çözüm; ürün bilgilerini ve uygulama örneklerini sunan, ziyaretçileri ürün konfigüratörüne ve teklif akışına yönlendiren bir web sitesidir. Bu açıklama proje kaydındaki kapsamı özetler; listelenmeyen hizmetleri PakSoft katkısı olarak varsaymaz.</p><ul className="mt-4 flex flex-wrap gap-2">{['Ürün ve kullanım bilgileri', 'Konfigüratöre geçiş', 'Teklif akışına yönlendirme'].map(x => <li key={x} className="rounded-full border border-heritage-sand bg-heritage-ivory px-3 py-1.5 text-xs font-medium text-gray-700">{x}</li>)}</ul><Link href={projectHref('sun-container')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Sun Container proje incelemesini açın <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></div>
        </div>
      </article>
    </PageSection>

    <PageSection title="Projelerde İhtiyaçları Nasıl Çözüme Dönüştürdük?">
      <div className="space-y-6">
        <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="grid lg:grid-cols-[.9fr_1.1fr]">
            <div className="order-2 p-5 md:p-7 lg:order-1"><p className="text-overline text-heritage-turquoise-deep">Şirket web sitesi · Almanya</p><h3 className="mt-2 text-xl font-semibold text-gray-900">Sun Container GmbH</h3><dl className="mt-5 space-y-4 text-sm leading-6"><div><dt className="font-semibold text-gray-900">İşletmenin İhtiyacı</dt><dd className="mt-1 text-gray-600">Modüler konteyner gibi seçenekli ürünleri, farklı kullanım alanlarını ve satın alma öncesi bilgileri Almanya’daki ziyaretçilere sunmak.</dd></div><div><dt className="font-semibold text-gray-900">PakSoft’un Katkısı</dt><dd className="mt-1 text-gray-600">Proje kaydı; ürün odaklı, görsel bir web sitesi çözümünü ve ziyaretçiyi konfigüratör ile teklif akışına yönlendiren yapıyı PakSoft çalışması olarak belgeliyor.</dd></div><div><dt className="font-semibold text-gray-900">Geliştirilen Yapı ve İşlevler</dt><dd className="mt-1 text-gray-600">Ürün ve kullanım bilgileri, referans içerikleri, konfigüratör giriş noktası ve ayrı sipariş takip portalına yönlendirme.</dd></div><div><dt className="font-semibold text-gray-900">Teslim Edilen Çözüm</dt><dd className="mt-1 text-gray-600">Ürünleri tanıtan ve ziyaretçiyi sonraki adıma taşıyan kurumsal web sitesi. Proje kaydında ölçülmüş iş sonucu bildirilmediğinden burada sonuç metriği sunulmuyor.</dd></div></dl></div>
            <Link href={projectHref('sun-container')} className="group order-1 block self-center p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-heritage-turquoise lg:order-2"><Image src="/images/portfolio/sun-container.png" alt="Sun Container ürün sayfası ve konfigüratöre yönlendiren web sitesi arayüzü" width={1366} height={850} sizes="(max-width: 1024px) 100vw, 55vw" className="h-auto w-full rounded-xl border border-gray-200 object-contain transition-transform duration-500 group-hover:scale-[1.01] motion-reduce:transition-none" /></Link>
          </div>
        </article>
        <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="grid lg:grid-cols-[1.1fr_.9fr]">
            <Link href={projectHref('sun-container-tracking')} className="group block self-center p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-heritage-turquoise"><Image src="/images/portfolio/sun-container-tracking.png" alt="Sun Container sipariş takip portalı; sipariş numarası ve e-posta alanları bulunan ekran" width={1366} height={850} sizes="(max-width: 1024px) 100vw, 55vw" className="h-auto w-full rounded-xl border border-gray-200 object-contain transition-transform duration-500 group-hover:scale-[1.01] motion-reduce:transition-none" /></Link>
            <div className="p-5 md:p-7"><p className="text-overline text-heritage-turquoise-deep">Ayrı müşteri portalı · Kurumsal site değildir</p><h3 className="mt-2 text-xl font-semibold text-gray-900">Sun Container Tracking</h3><dl className="mt-5 space-y-4 text-sm leading-6"><div><dt className="font-semibold text-gray-900">İşletmenin İhtiyacı</dt><dd className="mt-1 text-gray-600">Müşterilerin sipariş durumunu takip numarası ve e-posta ile sorgulayabilmesi; özel sipariş bilgilerinin açıkça sunulmaması.</dd></div><div><dt className="font-semibold text-gray-900">PakSoft’un Katkısı</dt><dd className="mt-1 text-gray-600">Proje kaydında Next.js tabanlı, bot korumalı ve iki dilli mobil portal çözümü belgelenmiştir.</dd></div><div><dt className="font-semibold text-gray-900">Geliştirilen Yapı ve İşlevler</dt><dd className="mt-1 text-gray-600">Sipariş referansı ve e-posta girişiyle durum sorgulama arayüzü. Kayıtlı teknoloji listesi Next.js, React, TypeScript, Cloudflare Turnstile ve Vercel’i içeriyor.</dd></div><div><dt className="font-semibold text-gray-900">Teslim Edilen Çözüm</dt><dd className="mt-1 text-gray-600">Şirket sitesini tamamlayan ayrı bir web uygulaması. Bu örnek, içerik yönetimli kurumsal siteyle aynı türde bir teslimat olarak sunulmuyor.</dd></div></dl><Link href={projectHref('sun-container-tracking')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Portal proje sayfasını inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></div>
          </div>
        </article>
      </div>
    </PageSection>

    <PageSection title="Web Sitesi Örneklerini İncelerken Nelere Bakmalısınız?" tone="gray">
      <p className="max-w-4xl text-body text-gray-600">Görsel tasarım, bir örneğin işletmeniz için uygun olup olmadığını tek başına göstermez. İçerik, ziyaretçi akışı ve günlük kullanım ihtiyaçlarını da değerlendirin.</p>
      <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">{checklist.map((x, i) => <li key={x} className="flex gap-3 border-b border-gray-200 py-3 text-sm leading-6 text-gray-700"><span className="text-overline text-heritage-turquoise-deep">0{i + 1}</span>{x}</li>)}</ul>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link href={localizedHref('/services/corporate-website-design/features', 'tr')} className="font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Web sitesi özelliklerini inceleyin <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link><Link href={localizedHref('/services/corporate-website-design/technologies', 'tr')} className="font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Teknoloji seçeneklerini karşılaştırın <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link></div>
    </PageSection>

    <PageSection title="İşletmenizin İhtiyacına Uygun Yaklaşım">
      <div className="grid gap-5 md:grid-cols-3">
        <article className="border-t-2 border-heritage-turquoise bg-background-gray p-5"><h3 className="text-lg font-semibold text-gray-900">Hizmetlerini Tanıtmak İsteyen İşletmeler</h3><p className="mt-3 text-sm leading-6 text-gray-600">Hizmet açıklamaları, hizmet verilen bölgeler ve kolay bulunan iletişim adımları öne çıkabilir. Ülkü Lojistik proje kaydı, hizmet ve bölge sayfalarıyla teklif ve WhatsApp/telefon iletişim akışlarını belgeliyor.</p><Link href={projectHref('ulku-lojistik')} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Ülkü Lojistik proje kaydını inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></article>
        <article className="border-t-2 border-heritage-turquoise bg-background-gray p-5"><h3 className="text-lg font-semibold text-gray-900">Ürün ve Teknik Bilgi Sunan Firmalar</h3><p className="mt-3 text-sm leading-6 text-gray-600">Ürün grupları, kullanım alanları ve seçim ya da teklif adımları birlikte planlanabilir. Sun Container örneğinde ürün sunumu ile konfigüratör ve teklif akışı kayıtlıdır.</p><Link href={projectHref('sun-container')} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Sun Container örneğine dönün <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></article>
        <article className="border-t-2 border-heritage-turquoise bg-background-gray p-5"><h3 className="text-lg font-semibold text-gray-900">Farklı Dillerde Müşterilere Ulaşan Şirketler</h3><p className="mt-3 text-sm leading-6 text-gray-600">Dil seçimi, çevrilen içerikler ve her dildeki gezinme yapısı kapsamda ele alınır. Sun Container ekran görüntüsünde Almanca ve İngilizce seçenekleri bulunuyor; çeviri hizmetinin kim tarafından sağlandığına dair ayrıca bir iddiada bulunmuyoruz.</p><Link href={projectHref('sun-container')} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Çok dilli ekran örneğini inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></article>
      </div>
    </PageSection>

    <PageSection title="Benzer Bir Projeyi Nasıl Planlarız?" tone="ivory">
      <p className="max-w-4xl text-body text-gray-700">Portföydeki bir çalışma, tasarımı aynen kopyalama vaadi değil; ihtiyaçları konuşmak için bir başlangıçtır. İş hedefleri ve ziyaretçi kitlesi, gerekli sayfa ve içerikler, diller, işlevler ve entegrasyonlar ile varsa mevcut sitenin yenilenme ihtiyacı birlikte değerlendirilir.</p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link href={localizedHref('/services/corporate-website-design/process', 'tr')} className="font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Planlama ve teslim sürecini inceleyin <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link><Link href={localizedHref('/services/corporate-website-design/pricing', 'tr')} className="font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Fiyatlandırma ve kapsamı inceleyin <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link></div>
    </PageSection>

    <PageSection title="Web Sitesi Projeleri Hakkında Sorular" tone="gray">
      <div className="grid max-w-5xl gap-4 md:grid-cols-2">{faqs.map(([question, answer]) => <article key={question} className="rounded-xl border border-gray-200 bg-white p-5"><h3 className="font-semibold leading-snug text-gray-900">{question}</h3><p className="mt-3 text-sm leading-6 text-gray-600">{answer}</p></article>)}</div>
      <Link href={localizedHref('/services/corporate-website-design/faq', 'tr')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Kurumsal web sitesi hakkında sık sorulan tüm sorular <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
      <nav aria-label="Kurumsal web tasarım hizmeti bağlantıları" className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-gray-200 pt-5">{related.map(([href, label]) => <Link key={href} href={localizedHref(href, 'tr')} className="text-sm font-medium text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{label} <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link>)}</nav>
    </PageSection>
  </>;
}

function TurkishFaqContent({ p }: { p: Record<string, any> }) {
  const groupIds = ['faq-scope', 'faq-costs', 'faq-content', 'faq-process', 'faq-management', 'faq-technical'];
  const relatedLinks = [
    [['/services/corporate-website-design', 'Kurumsal web tasarım hizmeti'], ['/services/corporate-website-design/features', 'Web sitesi özellikleri']],
    [['/services/corporate-website-design/pricing', 'Fiyatlandırma ve kapsam']],
    [['/services/corporate-website-design/features', 'İçerik ve özellikler'], ['/services/corporate-website-design/process', 'İçerik planlama süreci']],
    [['/services/corporate-website-design/process', 'Proje aşamaları']],
    [['/services/corporate-website-design/technologies', 'CMS, erişim ve altyapı seçenekleri']],
    [['/services/corporate-website-design/technologies', 'Teknoloji seçenekleri'], ['/services/maintenance-support', 'Bakım ve destek hizmetleri']],
  ];

  return <>
    <div className="bg-white py-6">
      <nav aria-label="Sık sorulan soru kategorileri" className="container mx-auto flex max-w-[1200px] flex-wrap gap-2 px-4">
        {p.groups.map((group: FaqGroup, i: number) => <a key={group.title} href={`#${groupIds[i]}`} className="inline-flex min-h-10 items-center rounded-full border border-heritage-sand bg-heritage-ivory px-4 py-2 text-sm font-medium text-gray-800 underline-offset-4 hover:border-heritage-turquoise hover:text-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{group.title}</a>)}
      </nav>
    </div>
    {p.groups.map((group: FaqGroup, i: number) => <PageSection key={group.title} title={group.title} id={groupIds[i]} tone={i % 2 === 0 ? 'gray' : 'white'}>
      <div className="grid max-w-5xl gap-4 md:grid-cols-2">
        {group.items.map(([question, answer]) => <article key={question} className="h-full rounded-xl border border-gray-200 bg-white p-5 md:p-6">
          <h3 className="text-base font-semibold leading-snug text-gray-900">{question}</h3>
          <p className="mt-3 text-sm leading-6 text-gray-600">{answer}</p>
        </article>)}
      </div>
      <nav aria-label={`${group.title} için ilgili sayfalar`} className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
        {relatedLinks[i].map(([path, label]) => <Link key={path} href={localizedHref(path, 'tr')} className="inline-flex items-center gap-1 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{label}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>)}
      </nav>
    </PageSection>)}
    <FAQJsonLd faqs={p.groups.flatMap((group: FaqGroup) => group.items.map(([question, answer]) => ({ question, answer })))} />
  </>;
}

function TurkishProcessContent({ p }: { p: Record<string, any> }) {
  const anchorClass = 'font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise';
  const prep = [
    'İşletmenizin faaliyet alanı ve hedef kitlesi',
    'Web sitesinin iş hedefleri ve ziyaretçiden beklenen adımlar',
    'Varsa mevcut web sitesi ve korunması gereken bilgiler',
    'Gerekli içerik türleri ve diller',
    'İhtiyaç duyulan işlevler ve sistem bağlantıları',
    'Hedeflenen yayın tarihi',
    'İsteğe bağlı bütçe beklentisi',
  ];
  const responsibilities = [
    ['Kapsam tanımı', 'İhtiyaçları ve teknik bağımlılıkları değerlendirir, kapsam taslağını oluştururuz.', 'Öncelikleri ve bilinen gereksinimleri paylaşır, kapsamı birlikte netleştirirsiniz.'],
    ['Marka materyalleri', 'Gelen logo, renk ve marka dosyalarını proje tasarımında değerlendiririz.', 'Mevcut marka rehberini, logoları ve varsa görsel kaynakları iletirsiniz.'],
    ['İçerik ve çeviriler', 'Kapsama alınan içerikleri yerleştirir ve kararlaştırılan dil sürümlerini kontrol ederiz.', 'İçerik ve çevirileri sağlar ya da onaylar; sorumluluklar teklifte belirlenir.'],
    ['Tasarım geri bildirimi', 'Tasarım seçeneklerini ve incelenecek çalışmaları paylaşırız.', 'Geri bildirimleri bir araya getirip üzerinde anlaşılan aşamalarda iletirsiniz.'],
    ['Harici hesap erişimleri', 'Gereken erişim ve entegrasyon ihtiyaçlarını önceden belirtiriz.', 'Gerekli hesapları veya test erişimlerini güvenli ve uygun biçimde sağlarsınız.'],
    ['Son onay', 'Yayın öncesi kontrolleri ve açık noktaları bildiririz.', 'İçeriği ve önemli kullanım akışlarını inceleyerek yayın onayı verirsiniz.'],
  ];
  const faq = [
    ['Projeye başlamak için bütün içerikler hazır olmalı mı?', 'Hayır. İlk planlama için mevcut materyalleri ve eksikleri konuşabiliriz. Hangi içeriklerin kim tarafından ve ne zaman sağlanacağı proje planında netleştirilir; içerik yerleşimi ve son onaydan önce gerekli metinlerin hazır olması gerekir.'],
    ['Tasarım aşamasında nasıl geri bildirim verebiliriz?', 'Geri bildirim, üzerinde anlaşılan tasarım incelemelerinde toplanır. Yorumları tek bir listede birleştirmek, çelişen yönlendirmeleri azaltır. İnceleme ve revizyon sınırları teklif kapsamına göre belirlenir.'],
    ['Proje devam ederken yeni sayfa veya özellik ekleyebilir miyiz?', 'Yeni talep değerlendirilir. Onaylı kapsam, maliyet veya takvim etkileniyorsa değişiklikler işe başlamadan önce yeniden netleştirilir ve yazılı olarak kararlaştırılır.'],
    ['Mevcut alan adımızı ve hostingimizi kullanabilir miyiz?', 'Mevcut sağlayıcılar teknik gereksinimleri karşılıyorsa kullanılabilir. Erişim, DNS, hosting yapılandırması ve sağlayıcı kısıtları yayın planında değerlendirilir.'],
    ['Yayından önce siteyi inceleyebilir miyiz?', 'Evet. Proje kapsamında incelenebilir bir geliştirme sürümü ve yayın öncesi kontrol aşaması planlanır. İncelenecek akışlar ve onay adımı proje kapsamına göre belirlenir.'],
    ['İçerikleri kendimiz güncellemeyi öğrenebilir miyiz?', 'Yönetim paneli, düzenleme erişimi ve kullanım bilgilendirmesi projeye dahil edilmişse devir sırasında paylaşılır. Erişim ve rehberlik kapsamı teklifte açıklanır.'],
  ];

  return <>
    <PageSection title="Projeye Başlamadan Önce" tone="gray">
      <p className="max-w-4xl text-body leading-relaxed text-gray-700">İlk görüşmede gereksinimleri konuşmak için bütün teknik kararları vermiş veya kesin sayfa sayısını çıkarmış olmanız gerekmez. Aşağıdaki bilgiler başlangıç kapsamını ve öncelikleri anlamaya yardımcı olur:</p>
      <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{prep.map(item => <li key={item} className="border-b border-gray-200 py-3 text-sm leading-6 text-gray-700">{item}</li>)}</ul>
      <p className="mt-4 text-sm leading-6 text-gray-600">Teknoloji seçimi ve ayrıntılı sayfa planı gereksinimler incelendikten sonra ele alınabilir; bütçe aralığını paylaşmak da isteğe bağlıdır.</p>
    </PageSection>

    <PageSection title={p.title} tone="ivory" id="project-stages">
      <p className="max-w-4xl text-body leading-relaxed text-gray-700">Kurumsal web sitesi yapım süreci, proje kapsamına göre uyarlanan yedi aşamada ilerler. Her adımda hazırlanacak çalışma, müşteri katkısı ve onay noktası birlikte netleştirilir.</p>
      <ol className="relative mt-6 space-y-4 border-s-2 border-heritage-sand ps-5 sm:ps-7">
        {p.stages.map((stage: ProcessStage, i: number) => <li key={stage.title} className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <span aria-hidden="true" className="absolute -start-[2.05rem] top-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-heritage-turquoise text-xs font-semibold text-white sm:-start-[2.55rem]">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{i + 1}. {stage.title}</h3>
          <dl className="mt-4 grid gap-4 text-sm leading-6 md:grid-cols-3">
            <div><dt className="text-overline text-heritage-turquoise-deep">PakSoft ne yapar?</dt><dd className="mt-1 text-gray-700">{stage.paksoft}</dd></div>
            <div><dt className="text-overline text-heritage-turquoise-deep">Sizden gerekenler</dt><dd className="mt-1 text-gray-700">{stage.client}</dd></div>
            <div className="rounded-lg bg-background-gray p-3"><dt className="text-overline text-gray-600">Çıktı / onay noktası</dt><dd className="mt-1 text-gray-700">{stage.approval}</dd></div>
          </dl>
        </li>)}
      </ol>
    </PageSection>

    <PageSection title="Proje Boyunca Kimden Ne Beklenir?">
      <p className="mb-4 max-w-4xl text-body text-gray-600">Sorumluluklar projeye ve kararlaştırılan kapsama göre netleştirilir; tablo iş birliğini planlamaya yardımcı olur.</p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise" tabIndex={0} role="region" aria-label="Proje sorumlulukları tablosu"><table className="w-full min-w-[720px] border-collapse text-left text-sm"><thead><tr><th scope="col" className="border-b border-gray-300 bg-background-gray px-4 py-3 font-semibold text-gray-900">Konu</th><th scope="col" className="border-b border-gray-300 bg-background-gray px-4 py-3 font-semibold text-gray-900">PakSoft’un Sorumluluğu</th><th scope="col" className="border-b border-gray-300 bg-background-gray px-4 py-3 font-semibold text-gray-900">Müşterinin Katkısı</th></tr></thead><tbody>{responsibilities.map(([topic, paksoft, client]) => <tr key={topic}><th scope="row" className="border-b border-gray-200 px-4 py-3 align-top font-semibold text-gray-900">{topic}</th><td className="border-b border-gray-200 px-4 py-3 align-top leading-6 text-gray-700">{paksoft}</td><td className="border-b border-gray-200 px-4 py-3 align-top leading-6 text-gray-700">{client}</td></tr>)}</tbody></table></div>
    </PageSection>

    <PageSection title={p.timingTitle} tone="gray"><p className="max-w-4xl text-body leading-relaxed text-gray-700">{p.timing}</p></PageSection>

    <PageSection title="Geri Bildirim ve Revizyonlar Nasıl Yönetilir?">
      <ul className="grid gap-x-8 md:grid-cols-2">{[
        'Geri bildirim, proje planında belirlenen tasarım ve inceleme aşamalarında toplanır.',
        'Birleştirilmiş geri bildirim, farklı paydaşlardan gelen çelişkileri azaltmaya yardımcı olur.',
        'Revizyon sınırları ve onay adımları proje teklifinde belgelenir.',
        'Yeni işlev veya değişen gereksinim, kapsamın yanı sıra fiyat ve takvim güncellemesi gerektirebilir.',
      ].map(item => <li key={item} className="border-b border-gray-200 py-3 text-sm leading-6 text-gray-700">{item}</li>)}</ul>
      <Link href={localizedHref('/services/corporate-website-design/features', 'tr')} className={`mt-5 inline-flex items-center gap-2 text-sm ${anchorClass}`}>Proje kapsamına alınabilecek özellikleri inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
    </PageSection>

    <PageSection title="Mevcut Web Sitesi Yenileniyorsa" tone="ivory">
      <p className="max-w-4xl text-body leading-relaxed text-gray-700">Yenileme çalışmalarında mevcut yapıyı ve içeriği inceleyerek korunacak, geliştirilecek veya kaldırılacak öğeleri belirleriz. Geçiş planı proje gereksinimleriyle birlikte hazırlanır.</p>
      <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">{[
        'Mevcut sayfaların, içeriklerin ve önemli URL’lerin envanteri',
        'İçeriğin korunması, güncellenmesi veya kaldırılması kararı',
        'Değişen adresler için gerekli URL eşleştirmeleri ve yönlendirmeler',
        'Alan adı ve hosting sağlayıcısıyla yapılacak koordinasyon',
        'Yayın öncesi ve sonrası kontrollerin planlanması',
      ].map(item => <li key={item} className="border-b border-heritage-sand py-3 text-sm leading-6 text-gray-700">{item}</li>)}</ul>
      <p className="mt-4 text-sm leading-6 text-gray-600">Geçiş sırasında kısa süreli kesinti veya arama görünürlüğünde değişim yaşanabilir; bunların sıfır olacağı garanti edilemez.</p>
      <Link href={localizedHref('/services/corporate-website-design', 'tr')} className={`mt-5 inline-flex items-center gap-2 text-sm ${anchorClass}`}>Web sitesi yenileme yaklaşımını genel bakışta inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
    </PageSection>

    <PageSection title="Yayından Sonra Ne Olur?">
      <p className="max-w-4xl text-body text-gray-600">Yayın sonrasında devir ve düzenleme bilgilendirmesi üzerinde anlaşılan proje kapsamına göre tamamlanır. Sonraki işler, teslim kontrolü ve devam eden hizmetler olarak ayrı değerlendirilir.</p>
      <dl className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">{[
        ['Devir ve düzenleme', 'Kararlaştırılan erişim ve CMS kullanım bilgileri teslim kapsamına göre paylaşılır.'],
        ['Sorun bildirimi', 'Yayında fark edilen konular mevcut proje anlaşmasındaki teslim ve düzeltme koşullarına göre ele alınır.'],
        ['Bakım ve güncellemeler', 'Yayın sonrası bakım ayrıca kapsamlandırılır; her projede otomatik olarak bulunmaz.'],
        ['Yeni içerik ve pazarlama', 'İçerik geliştirme, ek işlevler, devam eden SEO ve reklam çalışmaları ayrı hizmet olarak planlanabilir.'],
      ].map(([title, description]) => <div key={title} className="border-b border-gray-200 py-3"><dt className="font-semibold text-gray-900">{title}</dt><dd className="mt-1 text-sm leading-6 text-gray-600">{description}</dd></div>)}</dl>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link href={localizedHref('/services/corporate-website-design/technologies', 'tr')} className={anchorClass}>Altyapı ve yönetim seçenekleri <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link><Link href={localizedHref('/services/corporate-website-design/portfolio', 'tr')} className={anchorClass}>Belgelenmiş projeyi inceleyin <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link><Link href={localizedHref('/services/corporate-website-design/pricing', 'tr')} className={anchorClass}>Fiyatlandırma ve kapsam <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link></div>
    </PageSection>

    <PageSection title="Proje Süreci Hakkında Sık Sorulan Sorular" tone="gray">
      <dl className="grid gap-x-8 md:grid-cols-2">{faq.map(([question, answer]) => <div key={question} className="border-b border-gray-200 py-5"><dt><h3 className="font-semibold leading-6 text-gray-900">{question}</h3></dt><dd className="mt-2 text-sm leading-6 text-gray-600">{answer}</dd></div>)}</dl>
      <Link href={localizedHref('/services/corporate-website-design/faq', 'tr')} className={`mt-5 inline-flex items-center gap-2 text-sm ${anchorClass}`}>Tüm sık sorulan soruları inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
    </PageSection>
  </>;
}

function TurkishFeaturesContent() {
  const anchorClass = 'font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise';
  const companyPages = [
    ['Şirket ve Ekip Tanıtımı', 'İşletmenizin geçmişini, çalışma alanlarını, ekibini ve varsa şubelerini tanıtarak ziyaretçilerin şirketinizi anlamasına yardımcı olur.'],
    ['Hizmet Sayfaları', 'Her hizmetin kapsamını, çalışma biçimini ve müşterinin sonraki adımını ayrı ve anlaşılır biçimde açıklayabilir.'],
    ['Projeler ve Referanslar', 'Paylaşılmasına izin verilen proje örnekleri, uygulama alanları ve referans bilgileri için düzenli bir sunum alanı sağlar.'],
    ['Sertifikalar ve Belgeler', 'İşletmenizin paylaşmak istediği sertifikaları, teknik dokümanları veya indirilebilir dosyaları düzenleyebilir.'],
    ['Haberler ve Duyurular', 'Yeni gelişmeler, duyurular ve içerik yazıları için güncellenebilir bir alan oluşturur.'],
    ['Şube ve İletişim Bilgileri', 'Adresleri, iletişim kanallarını, çalışma saatlerini ve ilgili talep formlarını ziyaretçilerin bulabileceği şekilde sunar.'],
  ];
  const catalogueFeatures = [
    ['Ürün kategorileri ve detay sayfaları', 'Ürünleri gruplandırıp açıklamalarını ve temel bilgilerini ayrı sayfalarda sunar.'],
    ['Teknik özellikler ve dokümanlar', 'Ürün özelliklerini ve indirilebilir katalog ya da belgeleri ilgili içerikle birlikte gösterir.'],
    ['Arama ve filtreleme', 'Kapsama alındığında ziyaretçilerin geniş ürün listelerinde aradıklarını daraltmasına yardımcı olur.'],
    ['Ürüne özel teklif talepleri', 'İlgilenilen ürünü talep formuyla ilişkilendirerek ekibin hangi ürün hakkında bilgi istendiğini görmesini sağlar.'],
  ];
  const optionalModules = [
    ['CRM bağlantıları', 'Talep bilgilerini seçilen müşteri yönetimi sistemine aktarmayı amaçlar; API erişimi, alan eşleştirmesi ve sağlayıcı izinleri gerekir.'],
    ['İşe alım sistemleri', 'Açık pozisyonları veya başvuruları harici işe alım araçlarıyla ilişkilendirebilir; sağlayıcı hesabı ve başvuru akışı netleştirilir.'],
    ['Site içi arama', 'Ziyaretçilerin sayfa, haber veya katalog içeriğinde arama yapmasını sağlar; indekslenecek içerik türleri ve filtreler belirlenir.'],
    ['Bülten entegrasyonları', 'İzin veren ziyaretçileri seçilen bülten hizmetine kaydetmeye yardımcı olur; hesap, onay metinleri ve sağlayıcı koşulları gerekir.'],
    ['Analitik ve dönüşüm takibi', 'Üzerinde anlaşılan ziyaret veya form olaylarının ölçülmesini destekler; hesap erişimi, çerez tercihleri ve ölçüm kapsamı değerlendirilir.'],
    ['Randevu entegrasyonları', 'Ziyaretçilerin uygun zaman talep etmesine veya seçilen randevu sistemiyle ilerlemesine yardımcı olur; kullanılacak hizmet ve kuralları belirlenir.'],
    ['Diğer iş sistemi bağlantıları', 'Uygun arayüzü bulunan harici sistemlerle veri alışverişi kurabilir; teknik dokümantasyon, yetkiler ve lisanslar kapsamı etkiler.'],
  ];
  const planningRows = [
    ['Hizmetleri tanıtma', 'Hizmet sayfaları', 'İçerik ve sayfa yapısı'],
    ['Ürün talepleri', 'Katalog ve teklif formu', 'Ürün verileri ve form alanları'],
    ['İçerik düzenleme', 'CMS', 'Düzenlenebilir alanlar ve yetkiler'],
    ['Yurt dışı müşteriler', 'Çok dilli sayfalar', 'Diller ve çeviri sorumlulukları'],
    ['Satış akışını bağlama', 'CRM entegrasyonu', 'Sağlayıcı ve veri gereksinimleri'],
  ];
  const faqs: [string, string][] = [
    ['Web sitesindeki içerikleri kendimiz değiştirebilir miyiz?', 'Seçilen altyapıda yönetim paneli ve düzenlenebilir alanlar kapsamlanırsa yetkili ekip üyeleri belirli içerikleri güncelleyebilir. Erişim ve kullanım bilgilendirmesi teklif ve devir kapsamında netleştirilir.'],
    ['Sonradan yeni bir dil veya modül eklenebilir mi?', 'Teknik yapıya ve mevcut içeriğe bağlı olarak ekleme değerlendirilebilir. Yeni dil için içerik, çeviri ve onay sorumlulukları; modül içinse işlev, entegrasyon ve varsa üçüncü taraf koşulları ayrıca kapsamlandırılır.'],
    ['Ürün kataloğu ile e-ticaret sitesi arasındaki fark nedir?', 'Katalog ürünleri ve teknik bilgileri tanıtır, genellikle iletişim veya teklif talebine yönlendirir. E-ticaret ise sipariş ve çevrimiçi ödeme gibi satış akışları içerebilir; bu özellikler katalogda kendiliğinden bulunmaz.'],
    ['Teklif formundan gelen talepler nasıl iletilir?', 'Form gönderimlerinin hangi e-posta adresine veya sisteme yönlendirileceği proje kapsamında belirlenir. CRM aktarımı, otomatik bildirim veya kayıt saklama gibi işlevler ayrıca netleştirilir.'],
    ['Mevcut CRM sistemimize bağlantı kurulabilir mi?', 'CRM’in API ve erişim olanakları incelenerek uygunluk değerlendirilir. Veri alanları, yetkiler, test ortamı, lisanslar ve sağlayıcı kısıtları kapsamı etkiler.'],
    ['Hangi özellikler proje fiyatını etkiler?', 'Sayfa ve şablon yapısı, içerik yönetimi, diller, katalog ve form kapsamı, entegrasyonlar ile içerik hazırlığı gibi işler teklifin kapsamını etkiler.'],
  ];

  return <>
    <PageSection title="Kurumsal Web Sitesinde Hangi Özellikler Olmalı?" tone="gray" id="feature-overview">
      <p className="max-w-4xl text-body leading-relaxed text-gray-700">İhtiyaçlar, işletmenin ne sunduğuna ve ziyaretçilerin sitede ne yapacağına göre değişir. Sayfalar bilgiyi sunar; içerik türleri bu bilgiyi düzenler; formlar, arama ve bağlantılar ise ziyaretçinin belirli bir işlem yapmasını sağlar. Her işletmenin bütün modüllere ihtiyacı yoktur.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <article className="border-s-2 border-heritage-turquoise bg-white p-4"><h3 className="font-semibold text-gray-900">Hizmet işletmeleri</h3><p className="mt-2 text-sm leading-6 text-gray-600">Uzmanlık alanlarını, hizmet kapsamını, ekip bilgilerini ve iletişim yollarını öne çıkarabilir.</p></article>
        <article className="border-s-2 border-heritage-turquoise bg-white p-4"><h3 className="font-semibold text-gray-900">Üreticiler ve ihracatçılar</h3><p className="mt-2 text-sm leading-6 text-gray-600">Ürünleri, teknik özellikleri, belgeleri ve ürün bazlı talepleri sunabilir.</p></article>
        <article className="border-s-2 border-heritage-turquoise bg-white p-4"><h3 className="font-semibold text-gray-900">Proje ve içerik paylaşan şirketler</h3><p className="mt-2 text-sm leading-6 text-gray-600">Projeleri, haberleri, kariyer fırsatlarını veya şube bilgilerini düzenli yayınlayabilir.</p></article>
      </div>
      <Link href={localizedHref('/services/corporate-website-design', 'tr')} className={`mt-5 inline-flex items-center gap-2 text-sm ${anchorClass}`}>Kurumsal web tasarım genel bakışına dönün <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
    </PageSection>

    <PageSection title="İşletmenizi Anlatan Sayfalar" tone="ivory">
      <div className="grid gap-7 lg:grid-cols-[1.35fr_.65fr]">
        <dl className="grid gap-x-7 sm:grid-cols-2">{companyPages.map(([title, text]) => <div key={title} className="border-b border-heritage-sand py-3"><dt><h3 className="font-semibold text-gray-900">{title}</h3></dt><dd className="mt-2 text-sm leading-6 text-gray-700">{text}</dd></div>)}</dl>
        <aside className="self-start rounded-xl border border-heritage-sand bg-white p-4 sm:p-5"><p className="text-overline text-heritage-turquoise-deep">Örnek sayfa yapısı</p><ul className="mt-3 divide-y divide-gray-200 text-sm text-gray-700"><li className="py-2 font-semibold text-gray-900">Kurumsal</li><li className="py-2 ps-4">Hakkımızda ve ekip</li><li className="py-2 ps-4">Hizmetler</li><li className="py-2 ps-4">Projeler ve referanslar</li><li className="py-2 ps-4">Haberler ve duyurular</li><li className="py-2 ps-4">İletişim ve teklif talebi</li></ul></aside>
      </div>
      <Link href={localizedHref('/services/corporate-website-design/portfolio', 'tr')} className={`mt-5 inline-flex items-center gap-2 text-sm ${anchorClass}`}>Belgelenmiş web sitesi projesini inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
    </PageSection>

    <PageSection title="Yönetim Panelli Web Sitesi">
      <div className="grid gap-7 lg:grid-cols-[1fr_.8fr]">
        <div className="space-y-4">
          <article><h3 className="text-base font-semibold text-gray-900">İçerikleri Güncelleme</h3><p className="mt-2 text-sm leading-6 text-gray-600">Seçilen içerik yönetim sistemi, yetkili kişilerin anlaşmaya dahil edilen metinleri, görselleri, hizmetleri, projeleri veya haberleri güncellemesine imkân verebilir. Hangi alanların düzenlenebileceği platform ve kapsamla belirlenir.</p></article>
          <article><h3 className="text-base font-semibold text-gray-900">Kullanıcı Rolleri ve Yayın Yetkileri</h3><p className="mt-2 text-sm leading-6 text-gray-600">Birden fazla içerik sorumlusu veya yayın öncesi onay gerekiyorsa kullanıcı rolleri değerlendirilebilir. Ayrıntılı izin ve onay akışları her projeye otomatik olarak dahil değildir.</p></article>
          <article><h3 className="text-base font-semibold text-gray-900">Kullanım Rehberi ve Teslim</h3><p className="mt-2 text-sm leading-6 text-gray-600">Düzenleme erişimi, varsa kullanım rehberi ve devir materyalleri teklif içinde tanımlanır. Ekibinizin hangi işlemleri devralacağı teslim kapsamıyla birlikte netleştirilir.</p></article>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 bg-background-gray px-4 py-3"><p className="text-overline text-heritage-turquoise-deep">Örnek gösterim · Yönetim paneli</p></div>
          <div className="grid min-h-48 sm:grid-cols-[8rem_1fr]">
            <ul className="border-b border-gray-200 bg-background-gray p-3 text-xs text-gray-600 sm:border-b-0 sm:border-e"><li className="rounded bg-white px-2 py-2 font-semibold text-gray-800">Sayfalar</li><li className="px-2 py-2">Hizmetler</li><li className="px-2 py-2">Haberler</li></ul>
            <div className="space-y-4 p-4"><p className="text-sm font-semibold text-gray-900">İçerik düzenleme alanı</p><div><span className="mb-1 block text-xs text-gray-500">Başlık</span><div aria-hidden="true" className="h-8 rounded border border-gray-200 bg-white" /></div><div><span className="mb-1 block text-xs text-gray-500">Açıklama</span><div aria-hidden="true" className="h-14 rounded border border-gray-200 bg-white" /></div><p className="text-xs leading-5 text-gray-500">Bu görsel bir arayüz örneğidir; çalışan bir ürün ekranı değildir.</p></div>
          </div>
        </div>
      </div>
    </PageSection>

    <PageSection title="Mobil Uyumlu Tasarım ve Kullanım Kolaylığı" tone="gray">
      <p className="max-w-4xl text-body text-gray-600">Arayüz, farklı ekran genişliklerinde içeriğin okunmasını ve önemli işlemlerin kullanılmasını destekleyecek biçimde planlanır. Kontroller ve formlar proje kapsamına alınan cihaz ve tarayıcılarda test edilir; her cihazda aynı davranış veya belirli bir performans puanı garanti edilmez.</p>
      <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">{['Ekran boyutlarına uyum sağlayan sayfa düzenleri', 'Okunabilir metin ve anlaşılır gezinme', 'Dokunmatik kullanıma uygun form alanları ve kontroller', 'Önemli müşteri yolculuklarının test edilmesi'].map(item => <li key={item} className="border-b border-gray-200 py-3 text-sm leading-6 text-gray-700">{item}</li>)}</ul>
    </PageSection>

    <PageSection title="Ürün Kataloğu ve Teknik İçerikler">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div><p className="max-w-4xl text-body leading-relaxed text-gray-600">Ürün kataloğu, müşterilerin ürün gruplarını, teknik bilgileri ve indirilebilir dokümanları incelemesine; ardından ürün hakkında soru veya teklif talebi göndermesine yardımcı olur. Katalog büyüklüğü ve içerik yapısı işletmenin verilerine göre belirlenir.</p><ul className="mt-4 grid gap-x-8 sm:grid-cols-2">{catalogueFeatures.map(([title, text]) => <li key={title} className="border-b border-gray-200 py-3"><h3 className="text-sm font-semibold text-gray-900">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-600">{text}</p></li>)}</ul><p className="mt-4 text-sm leading-6 text-gray-600">Ürün kataloğu kendi başına çevrimiçi ödeme, stok yönetimi veya sepet/sipariş akışı içermez.</p></div>
        <Link href={localizedHref('/services/e-commerce', 'tr')} className={`inline-flex min-h-11 items-center gap-2 rounded-sm border border-heritage-sand bg-heritage-ivory px-4 py-3 text-sm ${anchorClass}`}>Online satış için e-ticaret çözümlerini inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </PageSection>

    <PageSection title="İletişim ve Teklif Talep Formları" tone="ivory">
      <div className="grid gap-7 lg:grid-cols-[1.2fr_.8fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          <article><h3 className="font-semibold text-gray-900">İletişim Formları</h3><p className="mt-2 text-sm leading-6 text-gray-700">İsim, iletişim bilgisi ve talebin konusu gibi gerekli alanları toplayabilir. Gönderimlerin hangi e-posta adresine veya kanala iletileceği üzerinde anlaşılır.</p></article>
          <article><h3 className="font-semibold text-gray-900">Teklif Talep Formları</h3><p className="mt-2 text-sm leading-6 text-gray-700">Hizmet veya ürün seçimi, gereksinim alanları ve ihtiyaç varsa dosya ekleme gibi adımlar içerebilir. Alanlar ekibinizin değerlendirmesi için gereken bilgiye göre belirlenir.</p></article>
          <article className="sm:col-span-2"><h3 className="font-semibold text-gray-900">Randevu ve Başvuru Talepleri</h3><p className="mt-2 text-sm leading-6 text-gray-700">Randevu isteği veya işe başvuru gibi akışlar eklenebilir. Takvim, başvuru yönetimi veya harici sisteme aktarım gibi gelişmiş davranışlar ayrıca kapsamlandırılır.</p></article>
          <p className="sm:col-span-2 text-sm leading-6 text-gray-600">Form kapsamı; anlaşılır etiketleri, alan doğrulamasını, uygun spam korumasını ve gönderim testlerini içerecek biçimde planlanır. CRM bağlantısı, otomatik e-posta veya veri saklama şekli ayrıca kararlaştırılmadıkça varsayılmaz.</p>
        </div>
        <div className="rounded-xl border border-heritage-sand bg-white p-4 sm:p-5"><p className="text-overline text-heritage-turquoise-deep">Örnek gösterim · Teklif formu</p><div className="mt-4 space-y-3"><div><span className="mb-1 block text-xs text-gray-600">İlgilendiğiniz ürün</span><div aria-hidden="true" className="h-9 rounded border border-gray-200" /></div><div><span className="mb-1 block text-xs text-gray-600">İhtiyacınız</span><div aria-hidden="true" className="h-14 rounded border border-gray-200" /></div><div><span className="mb-1 block text-xs text-gray-600">İletişim e-postası</span><div aria-hidden="true" className="h-9 rounded border border-gray-200" /></div><p className="text-xs text-gray-500">Görsel örnektir; bu sayfada form gönderimi yapılmaz.</p></div></div>
      </div>
    </PageSection>

    <PageSection title="Çok Dilli Web Sitesi Özellikleri">
      <div className="grid gap-6 lg:grid-cols-[1fr_.7fr]">
        <div><p className="text-body leading-relaxed text-gray-600">Her dil için sayfa içeriği ve gezinme ayrı ele alınır. Yerelleştirilmiş formlar ve metadata planlanabilir; Arapça ve Urduca sürümlerde sağdan sola (RTL) metin yönü ve arayüz düzeni değerlendirilir.</p><ul className="mt-4 space-y-2 text-sm leading-6 text-gray-700"><li>İçeriklerin diller arasında nasıl güncelleneceği belirlenir.</li><li>Çeviri, içerik girişi, editoryal kontrol ve onay sorumlulukları paylaşılır.</li><li>Sonradan eklenecek diller için içerik yapısı ve teknik gereksinimler incelenir.</li></ul><p className="mt-3 text-sm leading-6 text-gray-600">Dil seçenekleri ve çeviri hizmetleri teklifte kararlaştırılır; otomatik olarak dahil değildir.</p></div>
        <aside className="rounded-xl border border-heritage-sand bg-heritage-ivory p-4"><p className="text-overline text-heritage-turquoise-deep">Dile göre planlanabilecek alanlar</p><ul className="mt-3 divide-y divide-heritage-sand text-sm text-gray-700">{['Sayfalar ve menüler', 'Form etiketleri ve bildirim metinleri', 'Sayfa başlıkları ve metadata', 'Arapça / Urduca RTL düzeni'].map(x => <li key={x} className="py-2">{x}</li>)}</ul></aside>
      </div>
    </PageSection>

    <PageSection title="SEO, Performans ve Erişilebilirlik Altyapısı" tone="gray">
      <div className="grid gap-x-8 md:grid-cols-3">
        <article className="border-b border-gray-200 py-4"><h3 className="font-semibold text-gray-900">Sayfa Yapısı ve Teknik SEO</h3><p className="mt-2 text-sm leading-6 text-gray-600">Anlaşılır başlık yapısı, sayfa metadata’sı ve taranabilir gezinme düzeni planlanabilir. Bunlar temel site altyapısıdır; devam eden SEO ve içerik kampanyaları ayrı hizmettir.</p></article>
        <article className="border-b border-gray-200 py-4"><h3 className="font-semibold text-gray-900">Görseller ve Sayfa Performansı</h3><p className="mt-2 text-sm leading-6 text-gray-600">Görsel boyutları, uygun dosya kullanımı ve sayfa kaynakları değerlendirilir. Sonuçlar içerik, platform ve barındırma koşullarına bağlıdır; sabit skor garantisi verilmez.</p></article>
        <article className="border-b border-gray-200 py-4"><h3 className="font-semibold text-gray-900">Formlar ve Erişilebilir Kullanım</h3><p className="mt-2 text-sm leading-6 text-gray-600">Form etiketleri, klavye ile kullanım ve anlaşılır hata durumları proje testlerinde ele alınabilir. Bu çalışma yasal uyum veya erişilebilirlik sertifikası iddiası değildir.</p></article>
      </div>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link href={localizedHref('/services/seo', 'tr')} className={anchorClass}>SEO hizmetlerini inceleyin <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link><Link href={localizedHref('/services/corporate-website-design/technologies', 'tr')} className={anchorClass}>Teknoloji ve CMS seçeneklerini inceleyin <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link></div>
    </PageSection>

    <PageSection title="İsteğe Bağlı Modüller ve Entegrasyonlar">
      <p className="max-w-4xl text-body text-gray-600">Aşağıdaki bağlantılar ihtiyaç halinde değerlendirilir. Uygunluk; seçilen sağlayıcıya, erişim izinlerine, aboneliklere ve kullanım ücretlerine bağlı olabilir.</p>
      <dl className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{optionalModules.map(([title, text]) => <div key={title} className="border-b border-gray-200 py-3"><dt className="font-semibold text-gray-900">{title}</dt><dd className="mt-1 text-sm leading-6 text-gray-600">{text}</dd></div>)}</dl>
    </PageSection>

    <PageSection title="Projenizin Özelliklerini Birlikte Belirleyelim" tone="ivory">
      <p className="max-w-4xl text-body text-gray-600">Aşağıdaki eşleştirmeler ihtiyaçları konuşmak içindir; sabit paket veya otomatik dahil olan işler anlamına gelmez.</p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-heritage-sand bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise" tabIndex={0} role="region" aria-label="Proje ihtiyacı ve özellik kapsamı tablosu"><table className="w-full min-w-[680px] border-collapse text-left text-sm"><thead><tr><th scope="col" className="border-b border-gray-300 bg-background-gray px-4 py-3 font-semibold text-gray-900">İhtiyaç</th><th scope="col" className="border-b border-gray-300 bg-background-gray px-4 py-3 font-semibold text-gray-900">Değerlendirilebilecek Özellik</th><th scope="col" className="border-b border-gray-300 bg-background-gray px-4 py-3 font-semibold text-gray-900">Netleştirilecek Konular</th></tr></thead><tbody>{planningRows.map(([need, feature, scope]) => <tr key={need}><th scope="row" className="border-b border-gray-200 px-4 py-3 align-top font-semibold text-gray-900">{need}</th><td className="border-b border-gray-200 px-4 py-3 align-top leading-6 text-gray-700">{feature}</td><td className="border-b border-gray-200 px-4 py-3 align-top leading-6 text-gray-700">{scope}</td></tr>)}</tbody></table></div>
      <p className="mt-4 max-w-4xl text-sm leading-6 text-gray-600">Yazılı teklif; dahil olan işlevleri, isteğe bağlı eklemeleri, müşteri sorumluluklarını, üçüncü taraf giderlerini ve kabul/devir kapsamını açıklar.</p>
      <Link href={localizedHref('/services/corporate-website-design/process', 'tr')} className={`mt-4 inline-flex items-center gap-2 text-sm ${anchorClass}`}>Özelliklerin proje sürecinde nasıl netleştiğini görün <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
    </PageSection>

    <PageSection title="Web Sitesi Özellikleri Hakkında Sorular" tone="gray">
      <dl className="grid gap-x-8 md:grid-cols-2">{faqs.map(([question, answer]) => <div key={question} className="border-b border-gray-200 py-5"><dt><h3 className="font-semibold leading-6 text-gray-900">{question}</h3></dt><dd className="mt-2 text-sm leading-6 text-gray-600">{answer}</dd></div>)}</dl>
      <Link href={localizedHref('/services/corporate-website-design/faq', 'tr')} className={`mt-5 inline-flex items-center gap-2 text-sm ${anchorClass}`}>Sık sorulan tüm soruları inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
    </PageSection>
  </>;
}

function TurkishPricingContent({ p }: { p: Record<string, any> }) {
  const tableClass = 'w-full min-w-[760px] border-collapse text-left text-sm';
  const thClass = 'border-b border-gray-300 bg-background-gray px-4 py-3 font-semibold text-gray-900';
  const tdClass = 'border-b border-gray-200 px-4 py-3 align-top leading-6 text-gray-700';
  const enquiryHref = localizedHref('/start-project?service=corporate-website-design', 'tr');
  return <>
    <PageSection title={p.optionsTitle} tone="gray" id="scope-options">
      <p className="max-w-3xl text-body leading-relaxed text-gray-600">{p.optionsIntro}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {p.options.map((item: any, i: number) => <article key={item.title} className="flex h-full flex-col rounded-xl border border-gray-200 border-t-2 border-t-heritage-turquoise bg-white p-5 shadow-sm">
          <span className="text-overline text-heritage-turquoise-deep">0{i + 1}</span><h3 className="mt-2 text-lg font-semibold text-gray-900">{item.title}</h3>
          <dl className="mt-4 flex-1 space-y-3 text-sm leading-6 text-gray-700">
            <div><dt className="font-semibold text-gray-900">Kimler için?</dt><dd>{item.who}</dd></div>
            <div><dt className="font-semibold text-gray-900">Kararlaştırılacak kapsam</dt><dd>{item.scope}</dd></div>
            <div><dt className="font-semibold text-gray-900">Başlıca maliyet etkenleri</dt><dd>{item.drivers}</dd></div>
          </dl>
          <Link href={enquiryHref} className="mt-5 inline-flex min-h-11 items-center justify-between gap-2 border-t border-gray-200 pt-4 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">
            {item.cta}<ArrowRightIcon className="h-4 w-4 shrink-0 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </article>)}
      </div>
    </PageSection>

    <PageSection title={p.comparisonTitle}>
      <p className="mb-4 max-w-4xl text-body text-gray-600">Her proje farklı olduğundan, aşağıdaki başlıklar teklifte karşılaştırılıp netleştirilir; otomatik olarak dahil oldukları varsayılmamalıdır.</p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise" tabIndex={0} role="region" aria-label={p.comparisonTitle}>
        <table className={tableClass}><thead><tr><th scope="col" className={thClass}>Karşılaştırma başlığı</th><th scope="col" className={thClass}>Neyi ifade eder?</th><th scope="col" className={thClass}>Teklifte nasıl belirlenir?</th></tr></thead><tbody>{p.comparison.map((row: string[]) => <tr key={row[0]}><th scope="row" className={`${tdClass} font-semibold text-gray-900`}>{row[0]}</th><td className={tdClass}>{row[1]}</td><td className={tdClass}>{row[2]}</td></tr>)}</tbody></table>
      </div>
    </PageSection>

    <PageSection title={p.factorsTitle} tone="ivory">
      <div className="grid gap-x-8 md:grid-cols-2">{p.factors.map(([title, text]: [string, string], i: number) => <article key={title} className="border-b border-heritage-sand py-4"><h3 className="flex items-start gap-3 font-semibold text-gray-900"><span aria-hidden="true" className="text-overline text-heritage-turquoise-deep">0{i + 1}</span>{title}</h3><p className="mt-2 text-sm leading-6 text-gray-700">{text}</p></article>)}</div>
    </PageSection>

    <PageSection title={p.costsTitle}>
      <p className="mb-4 max-w-4xl text-body text-gray-600">Web sitesi geliştirme bedeli tek seferlik proje çalışmasını; aşağıdaki kalemler ise varsa yayın sonrası veya sağlayıcıya bağlı giderleri anlatır. Her proje her kalemi gerektirmez.</p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise" tabIndex={0} role="region" aria-label={p.costsTitle}>
        <table className={tableClass}><thead><tr><th scope="col" className={thClass}>Gider kalemi</th><th scope="col" className={thClass}>Neyi karşılar?</th><th scope="col" className={thClass}>Sıklık ve sorumluluk</th></tr></thead><tbody>{p.costRows.map((row: string[]) => <tr key={row[0]}><th scope="row" className={`${tdClass} font-semibold text-gray-900`}>{row[0]}</th><td className={tdClass}>{row[1]}</td><td className={tdClass}>{row[2]}</td></tr>)}</tbody></table>
      </div>
    </PageSection>

    <PageSection title={p.optionalTitle} tone="gray">
      <p className="max-w-4xl text-body text-gray-600">{p.optionalNote}</p>
      <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">{p.optional.map((x: string) => <li key={x} className="border-b border-gray-200 py-3 text-sm leading-6 text-gray-700">{x}</li>)}</ul>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
        <Link href={localizedHref('/services/seo', 'tr')} className="text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">SEO hizmetlerini inceleyin <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link>
        <Link href={localizedHref('/services/corporate-website-design/features', 'tr')} className="text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Web sitesi özellikleri <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </PageSection>

    <PageSection title={p.approachTitle}>
      <div className="grid gap-4 md:grid-cols-3">{p.approaches.map(([title, text]: [string, string]) => <article key={title} className="rounded-xl border border-gray-200 bg-white p-5"><h3 className="font-semibold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></article>)}</div>
      <Link href={localizedHref('/services/corporate-website-design/technologies', 'tr')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Altyapı ve CMS seçeneklerini inceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
    </PageSection>

    <PageSection title={p.quoteTitle} tone="gray">
      <p className="max-w-4xl text-body text-gray-600">{p.quoteIntro}</p>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2">{p.quoteSteps.map((x: string, i: number) => <li key={x} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 text-sm leading-6 text-gray-700"><span className="text-overline text-heritage-turquoise-deep">0{i + 1}</span>{x}</li>)}</ol>
      <h3 className="mt-6 font-semibold text-gray-900">Kapsamı anlamaya yardımcı bilgiler</h3>
      <ul className="mt-3 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{p.quote.map((x: string) => <li key={x} className="border-b border-gray-200 py-2 text-sm text-gray-700">{x}</li>)}</ul>
    </PageSection>

    <PageSection title={p.faqTitle}>
      <dl className="grid gap-x-8 md:grid-cols-2">{p.faqs.map(([question, answer]: [string, string]) => <div key={question} className="border-b border-gray-200 py-5"><dt className="font-semibold leading-6 text-gray-900">{question}</dt><dd className="mt-2 text-sm leading-6 text-gray-600">{answer}</dd></div>)}</dl>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
        <Link href={localizedHref('/services/corporate-website-design/faq', 'tr')} className="text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Sık sorulan tüm sorular <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link>
        <Link href={localizedHref('/services/corporate-website-design/process', 'tr')} className="text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Proje sürecini inceleyin <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link>
        <Link href={localizedHref('/services/corporate-website-design/portfolio', 'tr')} className="text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Projeleri inceleyin <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </PageSection>
  </>;
}

export default function CorporateWebsiteSubpage({ page, locale }: { page: CorporateWebsiteSubpageKey; locale: SupportedLocale }) {
  const c = content[locale];
  const p: Record<string, any> = c.pages[page];
  const overviewHref = localizedHref('/services/corporate-website-design', locale);
  const crumbs = [
    { label: c.nav.home, href: '/' },
    { label: c.nav.services, href: '/services' },
    { label: c.nav.overview, href: '/services/corporate-website-design' },
    { label: p.hero },
  ];

  return (
    <main className="min-h-screen bg-white">
      <InternalPageHero
        serviceName={locale === 'tr' ? 'Kurumsal Web Sitesi' : 'Corporate Website'}
        accentWord={p.hero}
        subtitle={p.intro}
        accentHex="#0e7c7b"
        crumbs={crumbs}
        scene={page === 'features' && locale === 'tr' ? <div className="mx-auto max-w-sm rounded-2xl border border-heritage-sand bg-white p-5 shadow-lg"><p className="text-overline text-heritage-turquoise-deep">Örnek gösterim · Sayfa modülleri</p><div className="mt-4 flex items-center gap-3 border-b border-gray-200 pb-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-heritage-turquoise-light text-heritage-turquoise-deep" aria-hidden="true">⌘</span><span className="h-2 w-28 rounded bg-heritage-sand" aria-hidden="true" /></div><div className="mt-4 grid grid-cols-2 gap-3">{['Şirket', 'Hizmetler', 'Ürün kataloğu', 'İletişim'].map(x => <span key={x} className="rounded-lg border border-gray-200 bg-background-gray px-3 py-3 text-xs font-medium text-gray-700">{x}</span>)}</div><p className="mt-4 text-xs leading-5 text-gray-500">Bu arayüz şematik bir örnektir; çalışan bir ürün ekranı değildir.</p></div> : sceneFor(page)}
        heading={page === 'features' && locale === 'tr' ? 'Kurumsal Web Sitesi Özellikleri ve Modülleri' : page === 'pricing' && locale === 'tr' ? 'Kurumsal Web Sitesi Fiyatları ve Paketleri' : page === 'process' && locale === 'tr' ? 'Kurumsal Web Tasarım Süreci' : page === 'technologies' && locale === 'tr' ? 'Kurumsal Web Sitesi Teknolojileri ve Altyapı Seçimi' : page === 'portfolio' && locale === 'tr' ? 'Kurumsal Web Sitesi Örnekleri ve Projelerimiz' : page === 'faq' && locale === 'tr' ? 'Kurumsal Web Sitesi Hakkında Sık Sorulan Sorular' : undefined}
        actions={page === 'portfolio' && locale === 'tr' ? <>
          <Link href={localizedHref('/start-project?service=corporate-website-design', 'tr')} className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none">Projenizi Konuşalım <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
          <a href="#selected-projects" className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-heritage-turquoise hover:text-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none">Projeleri İnceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></a>
        </> : page === 'technologies' && locale === 'tr' ? <>
          <Link href={localizedHref('/start-project?service=corporate-website-design', 'tr')} className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none">Projenize Uygun Altyapıyı Konuşalım <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
          <a href="#platform-comparison" className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-heritage-turquoise hover:text-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none">Seçenekleri Karşılaştırın <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></a>
        </> : page === 'features' && locale === 'tr' ? <>
          <Link href={localizedHref('/start-project?service=corporate-website-design', 'tr')} className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none">İhtiyaçlarınızı Konuşalım <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
          <a href="#feature-overview" className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-heritage-turquoise hover:text-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none">Özellikleri İnceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></a>
        </> : page === 'pricing' && locale === 'tr' ? <>
          <Link href={localizedHref('/start-project?service=corporate-website-design', 'tr')} className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none">Projeniz İçin Teklif Alın <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
          <a href="#scope-options" className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-heritage-turquoise hover:text-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none">Kapsam Seçeneklerini İnceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></a>
        </> : page === 'process' && locale === 'tr' ? <>
          <Link href={localizedHref('/start-project?service=corporate-website-design', 'tr')} className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none">Projenizi Konuşalım <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
          <a href="#project-stages" className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-heritage-turquoise hover:text-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none">Proje Aşamalarını İnceleyin <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></a>
        </> : undefined}
      />

      {page === 'features' && locale === 'tr' && <TurkishFeaturesContent />}

      {page === 'process' && locale === 'tr' && <TurkishProcessContent p={p} />}

      {page === 'technologies' && locale === 'tr' && <TurkishTechnologiesContent />}

      {page === 'portfolio' && locale === 'tr' && <TurkishPortfolioContent />}

      {page === 'faq' && locale === 'tr' && <TurkishFaqContent p={p} />}

      {page === 'features' && locale === 'en' && <>
        <PageSection title={p.title} tone="gray">
          <div className="grid gap-4 md:grid-cols-2">
            {p.features.map((item: Feature, i: number) => <article key={item.title} style={{ animationDelay: `${i * 70}ms` }} className="corporate-info-card animate-fade-in flex h-full flex-col rounded-2xl border border-gray-200 border-t-2 border-t-heritage-turquoise bg-white p-5 shadow-sm md:p-6">
              <div className="flex items-center gap-3"><span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-heritage-turquoise-light text-sm font-semibold text-heritage-turquoise-deep">0{i + 1}</span><h3 className="text-lg font-semibold text-gray-900">{item.title}</h3></div>
              <dl className="mt-5 grid flex-1 gap-4 text-sm leading-6 text-gray-700">
                <div><dt className="text-overline text-heritage-turquoise-deep">{c.labels.what}</dt><dd className="mt-1">{item.what}</dd></div>
                <div><dt className="text-overline text-heritage-turquoise-deep">{c.labels.why}</dt><dd className="mt-1">{item.why}</dd></div>
                <div className="rounded-lg bg-background-gray p-3"><dt className="text-overline text-gray-600">{c.labels.scope}</dt><dd className="mt-1">{item.scope}</dd></div>
              </dl>
            </article>)}
          </div>
        </PageSection>
        <PageSection title={p.scopeTitle}>
          <p className="max-w-3xl text-body text-gray-600">{p.scopeIntro}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {p.scope.map((item: Fact, i: number) => <article key={item.title} className="rounded-xl border border-heritage-sand bg-white p-5">
              <span className="text-overline text-heritage-turquoise-deep">0{i + 1}</span><h3 className="mt-2 font-semibold text-gray-900">{item.title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{item.detail}</p>
            </article>)}
          </div>
        </PageSection>
      </>}

      {page === 'technologies' && locale === 'en' && <>
        <PageSection title={p.title} tone="gray"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div><h3 className="text-title font-medium text-gray-900">{p.chooseTitle}</h3><p className="mt-3 text-body text-gray-600">{p.chooseIntro}</p><ul className="mt-5 space-y-4">{p.choose.map((item: Fact) => <li key={item.title} className="border-s-2 border-heritage-turquoise ps-4"><h4 className="font-semibold text-gray-900">{item.title}</h4><p className="mt-1 text-sm leading-6 text-gray-600">{item.detail}</p></li>)}</ul></div>
          <div><h3 className="text-title font-medium text-gray-900">{p.platformsTitle}</h3><div className="mt-3 grid gap-3">{p.platforms.map((item: { name: string; best: string; tradeoff: string }, i: number) => <article key={item.name} style={{ animationDelay: `${i * 70}ms` }} className="corporate-info-card animate-fade-in grid gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-[9rem_1fr_1fr] sm:p-5"><h4 className="self-start font-semibold text-heritage-turquoise-deep">{item.name}</h4><dl className="text-sm leading-6 text-gray-700"><dt className="text-overline text-gray-500">{p.experienceLabel}</dt><dd className="mt-1">{item.best}</dd></dl><dl className="text-sm leading-6 text-gray-600"><dt className="text-overline text-gray-500">{p.costsLabel}</dt><dd className="mt-1">{item.tradeoff}</dd></dl></article>)}</div></div>
        </div></PageSection>
        <PageSection title={p.cmsTitle}>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 bg-background-gray px-4 py-3"><span className="text-sm font-semibold text-gray-800">{c.labels.example}</span><span className="flex gap-1.5" aria-hidden="true"><i className="h-2.5 w-2.5 rounded-full bg-gray-300"/><i className="h-2.5 w-2.5 rounded-full bg-gray-300"/><i className="h-2.5 w-2.5 rounded-full bg-heritage-turquoise"/></span></div>
            <div className="grid sm:grid-cols-[13rem_1fr]"><nav aria-label={p.cmsTitle} className="border-b border-gray-200 p-4 sm:border-b-0 sm:border-e"><p className="text-overline text-gray-500">PakSoft CMS</p><ul className="mt-3 space-y-2 text-sm text-gray-700">{p.cmsFields.map((x: string) => <li key={x} className="rounded-md bg-background-gray px-3 py-2">{x}</li>)}</ul></nav><div className="p-5 md:p-6"><p className="text-sm font-semibold text-gray-900">{p.cmsFields[0]}</p><div className="mt-4 space-y-4">{[1, 2, 3].map((x) => <div key={x}><div className="mb-1 h-2 w-20 rounded bg-gray-200"/><div className={`h-9 rounded border border-gray-200 bg-white ${x === 3 ? 'w-1/2' : 'w-full'}`}/></div>)}</div></div></div>
          </div><p className="mt-3 text-caption text-gray-600">{p.cmsNote}</p>
        </PageSection>
        <PageSection title={p.integrationsTitle} tone="ivory"><p className="max-w-3xl text-body text-gray-700">{p.integrationsText}</p></PageSection>
        <PageSection title={p.foundationsTitle} tone="gray"><ul className="grid gap-3 md:grid-cols-2">{p.foundations.map((x: string) => <li key={x} className="flex items-start gap-3 border-b border-gray-200 py-3 text-sm leading-6 text-gray-700"><CheckIcon className="mt-1 h-4 w-4 shrink-0 text-heritage-turquoise" aria-hidden="true"/>{x}</li>)}</ul></PageSection>
        <PageSection title={p.ownershipTitle}><p className="max-w-4xl text-body text-gray-600">{p.ownership}</p></PageSection>
      </>}

      {page === 'process' && locale === 'en' && <>
        <PageSection title={p.title} tone="gray">
          <ol className="space-y-3">{p.stages.map((stage: ProcessStage, i: number) => <li key={stage.title} style={{ animationDelay: `${i * 65}ms` }} className="corporate-info-card animate-fade-in grid gap-x-5 gap-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:grid-cols-[3.5rem_1fr_1fr] lg:grid-cols-[3.5rem_1fr_1fr_1fr] md:p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-heritage-turquoise-light text-sm font-semibold text-heritage-turquoise-deep">{String(i + 1).padStart(2, '0')}</span><div className="self-center"><h3 className="text-lg font-semibold text-gray-900">{stage.title}</h3></div><div><h4 className="text-overline text-heritage-turquoise-deep">{c.labels.paksoft}</h4><p className="mt-2 text-sm leading-6 text-gray-700">{stage.paksoft}</p></div><div><h4 className="text-overline text-heritage-turquoise-deep">{c.labels.client}</h4><p className="mt-2 text-sm leading-6 text-gray-700">{stage.client}</p></div><div className="rounded-lg bg-heritage-ivory p-3 sm:col-start-2 sm:col-span-2 lg:col-span-3"><h4 className="text-overline text-gray-600">{c.labels.approval}</h4><p className="mt-1 text-sm leading-6 text-gray-700">{stage.approval}</p></div>
          </li>)}</ol>
        </PageSection>
        <PageSection title={p.timingTitle}><p className="max-w-4xl text-body text-gray-600">{p.timing}</p></PageSection>
      </>}

      {page === 'portfolio' && locale === 'en' && <>
        <PageSection title={p.title} tone="gray">
          <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <Link href={localizedHref('/projects/sun-container', locale)} className="group relative block aspect-[16/8] min-h-56 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-heritage-turquoise">
              <Image src="/images/portfolio/sun-container.png" alt={p.imageAlt} fill sizes="(max-width: 768px) 100vw, 1200px" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none" />
            </Link>
            <div className="grid gap-6 p-5 md:grid-cols-[.8fr_1.2fr] md:p-7">
              <div><p className="text-overline text-heritage-turquoise-deep">{p.sector}</p><h3 className="mt-2 text-title font-medium text-gray-900">{p.project}</h3><h4 className="mt-5 text-sm font-semibold text-gray-900">{p.needTitle}</h4><p className="mt-2 text-sm leading-6 text-gray-600">{p.need}</p></div>
              <div><h4 className="text-sm font-semibold text-gray-900">{p.contributionTitle}</h4><p className="mt-2 text-sm leading-6 text-gray-600">{p.contribution}</p><h4 className="mt-5 text-sm font-semibold text-gray-900">{p.deliveredTitle}</h4><ul className="mt-2 space-y-2">{p.delivered.map((x: string) => <li key={x} className="flex gap-2 text-sm leading-6 text-gray-700"><CheckIcon className="mt-1 h-4 w-4 shrink-0 text-heritage-turquoise" aria-hidden="true"/>{x}</li>)}</ul><Link href={localizedHref('/projects/sun-container', locale)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{p.viewProject}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true"/></Link></div>
            </div>
          </article>
        </PageSection>
        <PageSection title={p.moreTitle}><p className="max-w-3xl text-body text-gray-600">{p.more}</p></PageSection>
      </>}

      {page === 'pricing' && locale === 'tr' && <TurkishPricingContent p={p} />}

      {page === 'pricing' && locale === 'en' && <>
        <PageSection title={p.title} tone="gray"><p className="max-w-3xl text-body leading-relaxed text-gray-600">{p.optionsIntro}</p><div className="mt-5 grid gap-4 md:grid-cols-3">{p.options.map((item: Fact, i: number) => <article key={item.title} style={{ animationDelay: `${i * 80}ms` }} className="corporate-info-card animate-fade-in h-full rounded-2xl border border-gray-200 border-t-2 border-t-heritage-turquoise bg-white p-5 shadow-sm md:p-6"><span className="text-overline text-heritage-turquoise-deep">0{i + 1}</span><h3 className="mt-3 text-lg font-semibold text-gray-900">{item.title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{item.detail}</p></article>)}</div></PageSection>
        <PageSection title={p.driversTitle}><ul className="grid gap-x-8 md:grid-cols-2">{p.drivers.map((x: string) => <li key={x} className="flex gap-3 border-b border-gray-200 py-3 text-sm leading-6 text-gray-700"><CheckIcon className="mt-1 h-4 w-4 shrink-0 text-heritage-turquoise" aria-hidden="true"/>{x}</li>)}</ul></PageSection>
        <PageSection title={p.optionalTitle} tone="ivory"><ul className="grid gap-x-8 md:grid-cols-2">{p.optional.map((x: string) => <li key={x} className="border-b border-heritage-sand py-3 text-sm leading-6 text-gray-700">{x}</li>)}</ul></PageSection>
        <PageSection title={p.costsTitle}><p className="max-w-4xl text-body text-gray-600">{p.costs}</p></PageSection>
        <PageSection title={p.quoteTitle} tone="gray"><ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{p.quote.map((x: string, i: number) => <li key={x} className="flex gap-3 border-b border-gray-200 py-3 text-sm leading-6 text-gray-700"><span className="text-overline text-heritage-turquoise-deep">0{i + 1}</span>{x}</li>)}</ul></PageSection>
        <PageSection title={p.commercialTitle}><p className="max-w-4xl text-body text-gray-600">{p.commercial}</p></PageSection>
      </>}

      {page === 'blog' && <>
        <PageSection title={p.title} tone="gray" id="guides">
          <p className="max-w-3xl text-body text-gray-600">{p.featured}</p>
          {locale === 'tr' && <div className="mt-6 grid gap-4 lg:grid-cols-2" aria-label="Yeni kurumsal web sitesi rehberleri">
            {corporateWebsiteArticleCards.map((article) => <article key={article.slug} className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md motion-reduce:transition-none">
              <Link href={localizedHref(`/services/corporate-website-design/blog/${article.slug}`, locale)} className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-heritage-turquoise">
                <div className="relative aspect-video overflow-hidden bg-background-gray">
                  <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-contain" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/35 via-white/10 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-y-0 start-0 flex w-[54%] flex-col justify-center px-4 pt-7 sm:px-6 sm:pt-8 md:w-1/2 md:px-7">
                    <span className="mb-2 w-fit max-w-full rounded-sm bg-white/85 px-2 py-1 text-[10px] font-semibold leading-tight text-heritage-turquoise-deep sm:text-xs">{article.category}</span>
                    <h3 className="line-clamp-3 max-w-[18rem] text-base font-semibold leading-tight tracking-tight text-gray-950 sm:text-lg md:text-xl">{article.title}</h3>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">{article.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep">Rehberi okuyun<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></span>
                </div>
              </Link>
            </article>)}
          </div>}
          <nav aria-label={locale === 'tr' ? 'Rehber kategorileri' : 'Guide categories'} className="mt-4 flex flex-wrap gap-2">{p.categories.map((x: string) => <span key={x} className="rounded-full border border-heritage-sand bg-white px-3 py-1.5 text-sm text-gray-700">{x}</span>)}</nav>
          <Link href={localizedHref(`/services/corporate-website-design/blog/${guideSlugs[1]}`, locale)} className="mt-5 block rounded-xl border border-heritage-sand bg-white p-5 transition-colors hover:border-heritage-turquoise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise motion-reduce:transition-none"><span className="text-overline text-heritage-turquoise-deep">{locale === 'tr' ? 'Öne çıkan rehber · Planlama' : 'Featured guide · Planning'}</span><h3 className="mt-2 font-semibold text-gray-900">{p.articles[1].title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{p.articles[1].lead}</p><span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep">{c.labels.readGuide}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></span></Link>
          <ol className="mt-6 grid gap-3 border-y border-gray-200 py-5 sm:grid-cols-2 lg:grid-cols-3">{p.articles.map((article: Article, i: number) => <li key={article.title}><Link href={localizedHref(`/services/corporate-website-design/blog/${guideSlugs[i]}`, locale)} className="block h-full rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-heritage-turquoise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise motion-reduce:transition-none"><span className="text-xs text-gray-500">{article.category}</span><h3 className="mt-2 text-sm font-semibold leading-6 text-gray-900">{article.title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{article.lead}</p><span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep">{c.labels.readGuide}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></span></Link></li>)}</ol>
          <BlogInternalLinksCta locale={locale} />
        </PageSection>
      </>}

      {page === 'faq' && locale === 'en' && <>
        {p.groups.map((group: FaqGroup, i: number) => <PageSection key={group.title} title={group.title} tone={i % 2 ? 'white' : 'gray'}>
          <dl className="grid max-w-5xl gap-3 md:grid-cols-2">{group.items.map(([question, answer], j) => <div key={question} style={{ animationDelay: `${j * 80}ms` }} className="corporate-info-card animate-fade-in rounded-xl border border-gray-200 bg-white p-5 md:p-6"><dt className="flex items-start gap-3 font-semibold leading-snug text-gray-900"><span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-heritage-turquoise-light text-sm text-heritage-turquoise-deep">?</span>{question}</dt><dd className="mt-3 ps-10 text-sm leading-6 text-gray-600">{answer}</dd></div>)}</dl>
        </PageSection>)}
        <FAQJsonLd faqs={p.groups.flatMap((group: FaqGroup) => group.items.map(([question, answer]) => ({ question, answer })))} />
      </>}

      {page === 'technologies' && locale === 'en' && <PageSection title="Corporate Website Design Features" tone="gray"><p className="text-body text-gray-600">Explore page and functionality options when defining your project scope.</p><Link href={localizedHref('/services/corporate-website-design/features', locale)} className="mt-4 inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Explore website features<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true"/></Link></PageSection>}

      <CallToAction
        locale={locale}
        label={p.cta}
        intro={(page === 'pricing' || page === 'features' || page === 'process') && locale === 'tr' ? p.ctaIntro : page === 'technologies' && locale === 'tr' ? 'İçerik yönetimi, entegrasyon ve bakım ihtiyaçlarınızı paylaşın. İşletmenize uygun seçenekleri kapsam ve devam eden giderleriyle birlikte değerlendirelim.' : page === 'portfolio' && locale === 'tr' ? 'Beğendiğiniz örnekleri, mevcut web sitenizi ve ihtiyaçlarınızı paylaşın. İşletmenize uygun sayfa yapısını, tasarım yaklaşımını ve işlevleri birlikte değerlendirelim.' : page === 'faq' && locale === 'tr' ? 'Mevcut web sitenizi ve projenizle ilgili sorularınızı paylaşın. İhtiyaçlarınıza uygun kapsamı ve sonraki adımları birlikte değerlendirelim.' : undefined}
        heading={page === 'features' && locale === 'tr' ? 'İşletmenize Uygun Web Sitesi Özelliklerini Belirleyelim' : page === 'process' && locale === 'tr' ? 'Web Sitesi Projenizin İlk Adımını Atın' : page === 'technologies' && locale === 'tr' ? 'Web Siteniz İçin Uygun Altyapıyı Belirleyelim' : page === 'portfolio' && locale === 'tr' ? 'İşletmeniz İçin Uygun Web Sitesini Birlikte Planlayalım' : page === 'faq' && locale === 'tr' ? 'Sorunuzun Yanıtını Bulamadınız mı?' : undefined}
        secondaryLabel={page === 'features' && locale === 'tr' ? p.ctaSecondary : page === 'portfolio' && locale === 'tr' ? 'Kurumsal Web Tasarım Hizmetini İnceleyin' : undefined}
        secondaryHref={page === 'features' && locale === 'tr' ? localizedHref('/services/corporate-website-design/pricing', 'tr') : page === 'portfolio' && locale === 'tr' ? overviewHref : undefined}
      />
      <div className="bg-background-gray py-4"><div className="container mx-auto max-w-[1200px] px-4"><Link href={overviewHref} className="text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise"><ArrowRightIcon className="me-1 inline h-4 w-4 rotate-180 rtl:rotate-0" aria-hidden="true"/>{locale === 'tr' ? 'Kurumsal web tasarım genel bakışına dönün' : 'Back to the corporate website overview'}</Link></div></div>
    </main>
  );
}
