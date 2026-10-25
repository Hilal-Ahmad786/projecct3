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

export type CorporateWebsiteSubpageKey = 'features' | 'technologies' | 'process' | 'portfolio' | 'pricing' | 'blog' | 'faq';
type SupportedLocale = 'en' | 'tr';

type Fact = { title: string; detail: string };
type Feature = { title: string; what: string; why: string; scope: string };
type ProcessStage = { title: string; paksoft: string; client: string; approval: string };
type Article = { category: string; title: string; lead: string; paragraphs: string[]; points: string[] };
const guideSlugs = ['corporate-website-cost-factors', 'website-project-preparation', 'redesign-or-rebuild', 'choose-corporate-cms', 'multilingual-website-planning', 'website-handover-access-files'];
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
        hero: 'Özellikleri', intro: 'Ekibinizin ve müşterilerinizin ihtiyaç duyduğu sayfa ve araçları seçin. Her özellik işletmenize, içeriklerinize ve iş akışlarınıza göre kapsamlandırılır.',
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
        cta: 'İhtiyaç Duyduğunuz Özellikleri Konuşalım',
      },
      technologies: {
        hero: 'Altyapısı', intro: 'Uygulama yaklaşımını önermeden önce içerik ihtiyaçlarını, düzenleme iş akışlarını, esnekliği ve devam eden giderleri karşılaştırıyoruz.',
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
        cta: 'İşletmeniz İçin Uygun Altyapıyı Konuşalım',
      },
      process: {
        hero: 'Proje Süreci', intro: 'Kurumsal web sitesi projeleri, sorumluluklar ve onay adımları net olduğunda daha sağlıklı ilerler. Aşağıdaki aşamalar kararlaştırılan kapsama göre düzenlenir.',
        title: 'Birlikte Nasıl Çalışacağız?',
        stages: [
          { title: 'Keşif ve kapsam', paksoft: 'Hedefleri, kitleyi, mevcut sistemleri ve gereksinimleri inceler; kapsam dışı işleri belgeleriz.', client: 'İş önceliklerini, paydaşları ve mevcut materyalleri paylaşır.', approval: 'Teklif ve proje kapsamı üzerinde anlaşılır.' },
          { title: 'Site haritası ve içerik planı', paksoft: 'Sayfa yapısını, dil sürümlerini ve içerik gereksinimlerini taslak haline getiririz.', client: 'Sayfa sorumlularını belirler; mevcut metin, görsel ve belgeleri sağlar.', approval: 'Site haritası ve içerik sorumlulukları onaylanır.' },
          { title: 'Tasarım ve onay', paksoft: 'Anlaşılan arayüz yaklaşımını ve sayfa taslaklarını hazırlarız.', client: 'Tasarımı ihtiyaçlara göre inceler ve geri bildirimleri bir araya getirir.', approval: 'Geliştirme öncesinde kararlaştırılan tasarımlar onaylanır.' },
          { title: 'Geliştirme ve CMS kurulumu', paksoft: 'Onaylı şablonları, kararlaştırılan işlevleri ve içerik yönetimi yapısını geliştiririz.', client: 'Uygulama sorularını yanıtlar; gerekli hesap ve erişimleri sağlar.', approval: 'Çalışan ön izleme anlaşılan kapsamla karşılaştırılır.' },
          { title: 'İçerik hazırlığı veya aktarımı', paksoft: 'Kapsama alınan içerikleri ekler ya da taşır; kararlaştırılan dil bağlantılarını kurarız.', client: 'Son metinleri, çevirileri, görselleri ve kayıtları sağlar veya onaylar.', approval: 'İçeriklerin son testlere hazır olduğu onaylanır.' },
          { title: 'Test', paksoft: 'Kararlaştırılan formları, mobil düzeni, bağlantıları, tarayıcıları ve teknik gereksinimleri kontrol ederiz.', client: 'İş açısından kritik akışları test eder, bulguları tek bir incelemede iletir.', approval: 'Onay veya üzerinde anlaşılan düzeltmeler kaydedilir.' },
          { title: 'Yayın ve devir', paksoft: 'Kararlaştırılan yayını hazırlar; erişimleri ve devir kalemlerini belgeleriz.', client: 'Alan adı, hosting ve yayın onaylarının hazır olduğunu doğrular.', approval: 'Yayın yetkisi verilir ve devir teslimi teyit edilir.' },
          { title: 'Yayın sonrası destek', paksoft: 'Yalnızca sözleşmede tanımlanan izleme veya bakım hizmetini sunarız.', client: 'Yeni talepleri üzerinde anlaşılan destek kanalından iletir.', approval: 'Devam eden bakım hizmeti ayrıca kararlaştırılır.' },
        ] as ProcessStage[],
        timingTitle: 'Takvim ve Kapsam Değişiklikleri', timing: 'Takvim; proje kapsamına, içeriklerin hazır olmasına, üçüncü taraf erişimlerine ve inceleme adımlarına bağlıdır. Yeni bir talep onaylanan sayfa ya da işlevleri değiştiriyorsa etkisini belgeler, ek çalışmaya başlamadan önce yeni kapsam üzerinde anlaşırız.',
        cta: 'Proje Sürecini Konuşalım',
      },
      portfolio: {
        hero: 'Proje Örneği', intro: 'Burada belgelenmiş bir kurumsal web sitesi projesi yer alıyor. Örnek, şirket büyüklüğü veya performans iddiası için değil; işletme ihtiyacı ve teslim edilen işlevler için gösterilmiştir.',
        title: 'İhtiyacınıza Yakın Bir Web Sitesi Projesi', project: 'Sun Container GmbH', sector: 'Modüler konteyner ve inşaat', needTitle: 'İşletme ihtiyacı', need: 'Modüler konteyner çözümlerini, ürün bilgilerini ve kullanım örneklerini Almanya’daki işletme ve tüketicilere tanıtmak.',
        contributionTitle: 'PakSoft katkısı', contribution: 'Ürün ve kullanım alanlarını tanıtan, referansları ve konfigüratöre geçişi sunan; ayrıca ayrı bir sipariş takip portalıyla desteklenen web sitesi.',
        deliveredTitle: 'Belgelenmiş işlevler', delivered: ['Ürün ve kullanım alanı sayfaları', 'Referanslar ve konfigüratöre geçiş', 'Ayrı sipariş takip portalı'],
        imageAlt: 'Sun Container web sitesi ana sayfasında konteyner çözümleri tanıtılıyor', viewProject: 'Sun Container projesini inceleyin', moreTitle: 'Benzer Projelerde Nelere Bakabilirsiniz?', more: 'Bir web sitesi projesini incelerken işletme ihtiyacını, kararlaştırılan kapsamı, içerik modelini ve teslim edilen işlevleri karşılaştırın. Benzer görünen bir tasarım, başka bir işletmenin süreçlerine veya altyapısına doğrudan uymayabilir.',
        cta: 'Benzer Bir Projeyi Konuşalım',
      },
      pricing: {
        hero: 'Proje Fiyatlandırması', intro: 'Sayfaları, işlevleri, içerik sorumluluklarını ve teknik gereksinimleri anladıktan sonra projeye özel teklif hazırlarız.',
        title: 'Proje Yatırımını Neler Belirler?',
        optionsTitle: 'Yaygın Kapsam Örnekleri', optionsIntro: 'Bunlar sabit paket veya fiyat basamağı değil, projelerin ele alınabileceği kapsam türleridir.',
        options: [
          { title: 'Kurumsal web sitesi', detail: 'Anlaşılan sayfa planına göre kurumsal sayfalar, hizmet bilgileri ve talep yolları.' },
          { title: 'Çok dilli web sitesi', detail: 'Ek dil yapıları, yerelleştirilmiş içerik alanları ve dile özel meta veriler.' },
          { title: 'Özel kurumsal çözüm', detail: 'Belirli bir işletme ihtiyacına göre tanımlanan kataloglar, portallar, iş akışları veya entegrasyonlar.' },
        ] as Fact[],
        driversTitle: 'Kapsamı ve Fiyatı Etkileyenler', drivers: ['Özel sayfa şablonları ve modül sayısı', 'Dil sayısı ve RTL gereksinimleri', 'CMS, kullanıcı rolleri ve düzenleme akışları', 'İçerik yazımı, çeviri veya aktarımı', 'Formlar, katalog karmaşıklığı ve entegrasyonlar', 'Test, yayın ve devir gereksinimleri'],
        optionalTitle: 'İsteğe Bağlı Hizmetler', optional: ['Metin yazımı ve içerik hazırlığı', 'Çeviri ve editoryal kontrol', 'Fotoğraf veya illüstrasyon', 'Üçüncü taraf entegrasyonları', 'Hosting kurulumu ve devam eden bakım'],
        costsTitle: 'Devam Eden ve Üçüncü Taraf Giderleri', costs: 'Alan adı, hosting, CMS planları, ücretli eklentiler, dış servisler, bakım ve devam eden SEO ayrı gider kalemleridir. Tutarlar sağlayıcılara, seçilen planlara ve proje tercihine bağlıdır; geçerli kalemler biliniyorsa ayrıca belirtilir.',
        quoteTitle: 'Sağlıklı Bir Teklif İçin Gerekenler', quote: ['İşletme hedefleriniz ve hedef kitleler', 'Yaklaşık sayfa ve dil listesi', 'Gerekli formlar, kataloglar veya entegrasyonlar', 'Mevcut içerik ve aktarım ihtiyaçları', 'Kullanılan altyapı, hosting ve alan adı bilgileri'],
        commercialTitle: 'Ticari Koşullar', commercial: 'Ödeme aşamaları, revizyon sınırları, değişiklik yönetimi ve devam eden hizmetler teklif ve sözleşmede kararlaştırılır. Burada sabit fiyat veya standart ticari taahhüt yayınlamıyoruz.',
        cta: 'Proje Teklifi İsteyin',
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
        hero: 'Hakkında Sık Sorulanlar', intro: 'Kurumsal web sitesi projelerinde kapsam, içerik, sahiplik, teslimat ve devam eden giderlerle ilgili yanıtlar.',
        title: 'Web Sitesi Ekibiyle Çalışmadan Önce Bilmeniz Gerekenler',
        groups: [
          { title: 'Kapsam', items: [['Tasarım ve geliştirmeyi birlikte yapıyor musunuz?', 'Evet. Planlama, arayüz tasarımı ve web sitesi geliştirme tek bir proje kapsamında ele alınabilir. Teklifte projeniz için kararlaştırılan sayfalar, işlevler, teslimatlar ve sorumluluklar listelenir.'], ['Yeni site yapabilir veya mevcut sitemizi yenileyebilir misiniz?', 'Her iki çalışma da değerlendirilebilir. Yenileme öncesinde mevcut içerikleri, kullanılabilirliği, teknik kısıtları ve URL değişikliklerini inceler, ardından iyileştirme ve geçiş kapsamını belirleriz.']] },
          { title: 'İçerik ve diller', items: [['Metin ve görselleri kim sağlar?', 'Son metin, görsel, belge ve içerik girişinin sorumluları teklifte kararlaştırılır. Metin yazımı veya aktarım yalnızca açıkça kapsamlandırıldıysa dahil edilir.'], ['Web sitesi birden fazla dili destekleyebilir mi?', 'Dillere özel sayfalar, menüler, formlar ve meta veriler planlanabilir. Çeviri, editoryal inceleme ve Arapça ya da Urduca RTL çalışmaları sorumlularıyla birlikte kapsamda belirlenir.']] },
          { title: 'Düzenleme ve sahiplik', items: [['Ekibimiz web sitesini düzenleyebilir mi?', 'Seçilen CMS gerekli içerikleri destekliyorsa düzenleme iş akışı projeye eklenebilir. Düzenlenebilir alanlar, roller ve erişim proje için netleştirilir.'], ['Hangi erişim ve dosyaları teslim alacağız?', 'Hesap erişimleri, kod ve tasarım teslimatları, içerik sahipliği ve üçüncü taraf lisans kısıtları teklif ve sözleşmede belgelenir.']] },
          { title: 'Takvim ve revizyonlar', items: [['Takvimi neler etkiler?', 'Kapsam, içeriklerin hazır olması, entegrasyonlar, üçüncü taraf erişimi ve inceleme döngüleri takvimi etkiler. Gereksinimler anlaşıldıktan sonra proje takvimi kararlaştırılır.'], ['Tasarım değişiklikleri nasıl ele alınır?', 'Geri bildirim ve onay aşamaları teklifte belirlenir. Onaylı kapsamı değiştiren talepler incelenir, belgelenir ve ek çalışmaya başlamadan önce kararlaştırılır.']] },
          { title: 'SEO ve site geçişi', items: [['Hangi SEO çalışmaları dahil?', 'Web sitesinde açıklayıcı sayfa yapısı, meta veriler, taranabilir navigasyon ve mobil uyum gibi teknik temeller uygulanabilir. Sürekli SEO kampanyaları ayrı bir hizmettir.'], ['Değişen URL’leri nasıl ele alıyorsunuz?', 'URL’ler değişiyorsa yönlendirmeler hazırlanabilir ve anlaşılan geçiş kapsamına yayın sonrası izleme eklenebilir. Arama görünürlüğü değişebilir; sıfır kayıp garantisi verilmez.']] },
          { title: 'Giderler ve destek', items: [['Yayın sonrasında hangi giderler olabilir?', 'Alan adı, hosting, CMS planı, ücretli eklentiler, üçüncü taraf servisleri ve isteğe bağlı bakım yinelenen giderler olabilir. Bilinen sağlayıcı ve kalemler ayrıca belirtilir.'], ['Yayın sonrası hangi destek veriliyor?', 'Yalnızca teklif ve sözleşmede yazılı destek veya bakım dahildir. Devam eden hizmetler ayrıca kapsamlandırılır.']] },
          { title: 'Uluslararası çalışma', items: [['Uzaktan birlikte çalışabilir miyiz?', 'İletişim, inceleme sorumluları ve onay noktaları ekibinizin çalışma düzenine göre kararlaştırılabilir.'], ['Web sitesi hangi dilleri destekleyebilir?', 'İhtiyaca göre Türkçe, İngilizce, Almanca, Arapça ve Urduca sürümler planlanabilir. Çeviri sorumlulukları ile Arapça ve Urduca RTL kontrolleri kapsamda belirlenir.']] },
        ] as FaqGroup[],
        cta: 'Web Sitesi Projenizi Konuşalım',
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
    features: 'Kurumsal Web Sitesi Özellikleri | PakSoft', technologies: 'Kurumsal Web Sitesi Altyapısı ve CMS Seçenekleri | PakSoft', process: 'Kurumsal Web Sitesi Tasarım ve Geliştirme Süreci | PakSoft', portfolio: 'Kurumsal Web Sitesi Projeleri | PakSoft', pricing: 'Kurumsal Web Sitesi Proje Fiyatını Belirleyenler | PakSoft', blog: 'Kurumsal Web Sitesi Planlama Rehberleri | PakSoft', faq: 'Kurumsal Web Sitesi Proje Soruları | PakSoft',
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
    features: 'Kurumsal web sitesi sayfalarını, katalogları, talep araçlarını, içerik yönetimini, dilleri ve entegrasyonları inceleyin.',
    technologies: 'WordPress, Webflow, React/Next.js ve headless CMS yaklaşımlarını düzenleme ihtiyacı, esneklik, hosting ve giderler açısından karşılaştırın.',
    process: 'Kurumsal web sitesi projesinin keşif, planlama, tasarım, geliştirme, içerik, test, yayın ve devir aşamalarını inceleyin.',
    portfolio: 'Sun Container kurumsal web sitesi projesinin belgelenmiş ihtiyacını, PakSoft katkısını ve teslim edilen işlevleri inceleyin.',
    pricing: 'Kurumsal web sitesi teklifinde kapsamı, isteğe bağlı çalışmaları ve devam eden sağlayıcı giderlerini etkileyen unsurları öğrenin.',
    blog: 'Kurumsal web sitesi planlama, fiyatlandırma, yenileme, CMS, çok dilli içerik ve devir konularında rehberler.',
    faq: 'Kurumsal web sitesi kapsamı, içerik, sahiplik, takvim, SEO geçişi, giderler ve destek hakkında yanıtlar.',
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

function CallToAction({ locale, label }: { locale: SupportedLocale; label: string }) {
  const c = content[locale];
  return (
    <section className="bg-gray-950 section-compact">
      <div className="container mx-auto max-w-[1200px] px-4 text-center">
        <h2 className="text-headline font-medium text-white">{label}</h2>
        <p className="text-body mx-auto mt-3 max-w-2xl text-gray-300">{c.labels.ctaIntro}</p>
        <Link href={localizedHref('/start-project?service=corporate-website-design', locale)} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 motion-reduce:transition-none">
          {label}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
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
      <InternalPageHero serviceName={locale === 'tr' ? 'Kurumsal Web Sitesi' : 'Corporate Website'} accentWord={p.hero} subtitle={p.intro} accentHex="#0e7c7b" crumbs={crumbs} scene={sceneFor(page)} />

      {page === 'features' && <>
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

      {page === 'technologies' && <>
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

      {page === 'process' && <>
        <PageSection title={p.title} tone="gray">
          <ol className="space-y-3">{p.stages.map((stage: ProcessStage, i: number) => <li key={stage.title} style={{ animationDelay: `${i * 65}ms` }} className="corporate-info-card animate-fade-in grid gap-x-5 gap-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:grid-cols-[3.5rem_1fr_1fr] lg:grid-cols-[3.5rem_1fr_1fr_1fr] md:p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-heritage-turquoise-light text-sm font-semibold text-heritage-turquoise-deep">{String(i + 1).padStart(2, '0')}</span><div className="self-center"><h3 className="text-lg font-semibold text-gray-900">{stage.title}</h3></div><div><h4 className="text-overline text-heritage-turquoise-deep">{c.labels.paksoft}</h4><p className="mt-2 text-sm leading-6 text-gray-700">{stage.paksoft}</p></div><div><h4 className="text-overline text-heritage-turquoise-deep">{c.labels.client}</h4><p className="mt-2 text-sm leading-6 text-gray-700">{stage.client}</p></div><div className="rounded-lg bg-heritage-ivory p-3 sm:col-start-2 sm:col-span-2 lg:col-span-3"><h4 className="text-overline text-gray-600">{c.labels.approval}</h4><p className="mt-1 text-sm leading-6 text-gray-700">{stage.approval}</p></div>
          </li>)}</ol>
        </PageSection>
        <PageSection title={p.timingTitle}><p className="max-w-4xl text-body text-gray-600">{p.timing}</p></PageSection>
      </>}

      {page === 'portfolio' && <>
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

      {page === 'pricing' && <>
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
          <nav aria-label={locale === 'tr' ? 'Rehber kategorileri' : 'Guide categories'} className="mt-4 flex flex-wrap gap-2">{p.categories.map((x: string) => <span key={x} className="rounded-full border border-heritage-sand bg-white px-3 py-1.5 text-sm text-gray-700">{x}</span>)}</nav>
          <Link href={localizedHref(`/services/corporate-website-design/blog/${guideSlugs[1]}`, locale)} className="mt-5 block rounded-xl border border-heritage-sand bg-white p-5 transition-colors hover:border-heritage-turquoise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise motion-reduce:transition-none"><span className="text-overline text-heritage-turquoise-deep">{locale === 'tr' ? 'Öne çıkan rehber · Planlama' : 'Featured guide · Planning'}</span><h3 className="mt-2 font-semibold text-gray-900">{p.articles[1].title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{p.articles[1].lead}</p><span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep">{c.labels.readGuide}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></span></Link>
          <ol className="mt-6 grid gap-3 border-y border-gray-200 py-5 sm:grid-cols-2 lg:grid-cols-3">{p.articles.map((article: Article, i: number) => <li key={article.title}><Link href={localizedHref(`/services/corporate-website-design/blog/${guideSlugs[i]}`, locale)} className="block h-full rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-heritage-turquoise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise motion-reduce:transition-none"><span className="text-xs text-gray-500">{article.category}</span><h3 className="mt-2 text-sm font-semibold leading-6 text-gray-900">{article.title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{article.lead}</p><span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep">{c.labels.readGuide}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></span></Link></li>)}</ol>
        </PageSection>
      </>}

      {page === 'faq' && <>
        {p.groups.map((group: FaqGroup, i: number) => <PageSection key={group.title} title={group.title} tone={i % 2 ? 'white' : 'gray'}>
          <dl className="grid max-w-5xl gap-3 md:grid-cols-2">{group.items.map(([question, answer], j) => <div key={question} style={{ animationDelay: `${j * 80}ms` }} className="corporate-info-card animate-fade-in rounded-xl border border-gray-200 bg-white p-5 md:p-6"><dt className="flex items-start gap-3 font-semibold leading-snug text-gray-900"><span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-heritage-turquoise-light text-sm text-heritage-turquoise-deep">?</span>{question}</dt><dd className="mt-3 ps-10 text-sm leading-6 text-gray-600">{answer}</dd></div>)}</dl>
        </PageSection>)}
        <FAQJsonLd faqs={p.groups.flatMap((group: FaqGroup) => group.items.map(([question, answer]) => ({ question, answer })))} />
      </>}

      {page === 'technologies' && <PageSection title={locale === 'tr' ? 'Kurumsal Web Tasarım Özellikleri' : 'Corporate Website Design Features'} tone="gray"><p className="text-body text-gray-600">{locale === 'tr' ? 'Sayfa ve işlev seçeneklerini inceleyerek projenizin kapsamını belirleyin.' : 'Explore page and functionality options when defining your project scope.'}</p><Link href={localizedHref('/services/corporate-website-design/features', locale)} className="mt-4 inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{locale === 'tr' ? 'Web sitesi özelliklerini inceleyin' : 'Explore website features'}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true"/></Link></PageSection>}

      <CallToAction locale={locale} label={p.cta} />
      <div className="bg-background-gray py-4"><div className="container mx-auto max-w-[1200px] px-4"><Link href={overviewHref} className="text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise"><ArrowRightIcon className="me-1 inline h-4 w-4 rotate-180 rtl:rotate-0" aria-hidden="true"/>{locale === 'tr' ? 'Kurumsal web tasarım genel bakışına dönün' : 'Back to the corporate website overview'}</Link></div></div>
    </main>
  );
}
