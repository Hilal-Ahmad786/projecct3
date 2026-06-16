# TASK — Write enriched, multilingual content for PakSoft Marketing services

You are an expert B2B technology copywriter AND a professional translator working for **PakSoft** (paksoft.com.tr), a software development agency based in Türkiye with Pakistani/South-Asian roots, serving clients in **5 languages**.

Your job: write deep, specific, conversion-focused content for each Marketing service listed in the **SERVICES TO WRITE** section at the bottom. Every service must be written in ALL FIVE languages: English (`en`), Turkish (`tr`), German (`de`), Urdu (`ur`), Arabic (`ar`).

---

## OUTPUT FORMAT — STRICT

Return **ONE JSON object**. Keys are the service slugs (exactly as given). Each value is an object with the five locale keys. Output **ONLY the JSON** — no preamble, no commentary, no markdown code fences.

```
{
  "<slug>": {
    "en": { ...all fields... },
    "tr": { ...all fields... },
    "de": { ...all fields... },
    "ur": { ...all fields... },
    "ar": { ...all fields... }
  },
  "<next-slug>": { ... }
}
```

Hard output rules:
- **Output COMPLETE services only.** Never cut a service off mid-way. If you are running low on space, STOP after the last fully-finished service — do not emit a partial one.
- Do as many services as comfortably fit in one response. The user will say "continue" to get the rest, and will tell you which slugs are already done so you skip them.
- Strictly valid, parseable JSON: double quotes only, no trailing commas, no comments, no `...` placeholders.
- Use the EXACT slug strings provided as the object keys.

---

## REQUIRED FIELDS (per locale) — content failing these is auto-rejected by our validator

| field | requirement |
|---|---|
| `name` | the service name in that language |
| `shortDescription` | 25–35 words, concrete value proposition (hard min: 12 words) |
| `fullDescription` | 90–130 words, specific to THIS service, no fluff (hard min: 60 words) |
| `features` | exactly **8** capability-level items (hard min: 6) |
| `benefits` | exactly **6** outcome-level items (hard min: 5) |
| `metaTitle` | **≤ 60 characters**, MUST end with `" | PakSoft"` |
| `metaDescription` | 140–160 characters, include a call to action (hard min: 100, keep ≤ 160) |
| `content.process` | **6** steps; each `{ "step": <n>, "title": "...", "description": "..." }`; description = 2 full sentences (hard min: 10 words) |
| `content.faq` | **8** Q&As; each `{ "question": "...", "answer": "..." }`; answer = 2–3 substantive sentences (hard min: 12 words) |
| `content.technologies` | **6–8** items; each `{ "name": "...", "icon": "..." }`; `icon` = lowercase tool slug, e.g. `"react"`, `"postgresql"` (hard min: 4) |

The top-level shape of each locale object is EXACTLY the gold example below: `name`, `shortDescription`, `fullDescription`, `features`, `benefits`, `metaTitle`, `metaDescription`, then `content` with `process`, `faq`, `technologies`.

---

## CONTENT QUALITY RULES

- **Real substance.** Realistic timelines, budget guidance, framework/architecture tradeoffs, performance numbers.
- **FAQ answers must TEACH something true** about the domain — e.g. for Google Ads: Quality Score vs. bid tradeoffs and realistic CPC ranges; for SEO: how long indexing/ranking actually takes; for email: deliverability, warm-up, and list hygiene; for paid social: iOS 14.5 attribution limits and creative-testing cadence. No generic filler ("we provide quality service", "our expert team delivers excellence").
- **Never invent** client names, case studies, or fake statistics about PakSoft. Industry-typical ranges ("4–6 weeks", "95+ Lighthouse", "30–50% faster", "$8–15k") are encouraged.
- **Build on each service's current data** (provided in SERVICES TO WRITE) — improve and expand it; do not contradict the existing name/positioning.
- Distinct per service: a payment-gateway page and an inventory-system page must not share boilerplate.

## TRANSLATION RULES

- `tr`/`de`/`ur`/`ar` are REAL translations that read naturally to native speakers — NOT transliterations of English.
- Urdu and Arabic must read naturally in RTL.
- Keep proper nouns and technical terms in **Latin script**: tool/framework/product names (Next.js, React, Kubernetes, Stripe, Shopify, API, CMS, SaaS, GraphQL, etc.) and established acronyms.
- Match the register, depth, sentence structure, and quality of the GOLD EXAMPLE below — in every language.

---


## GOLD EXAMPLE — match this structure, depth, and 5-language translation quality EXACTLY

This is one finished Marketing service (`linkedin-ads`), straight from our database. Your output for every service must reach this level in all five languages.

```json
{
  "slug": "linkedin-ads",
  "en": {
    "name": "LinkedIn Ads",
    "shortDescription": "Reach decision-makers where they already think about work. We build LinkedIn campaigns that turn precise B2B targeting into qualified pipeline — not just impressions and vanity clicks.",
    "fullDescription": "LinkedIn is the only platform where you can target a VP of Engineering at a 200-person fintech by job title, seniority, and company — but that precision comes at premium CPCs, and wasted spend hurts twice as much. We run LinkedIn Ads with B2B discipline: tight audience definitions matched to your ICP, offers that respect where the buyer is in their journey, creative built for a professional feed, and conversion tracking wired through to your CRM so we optimize for pipeline and revenue, not click-through rate. From Lead Gen Forms and document ads to retargeting and Account-Based Marketing plays for named target accounts, every campaign is structured to be measured — and killed or scaled based on what your sales team actually receives.",
    "features": [
      "ICP Definition & Audience Architecture",
      "Account-Based Marketing (ABM) Campaigns",
      "Lead Gen Forms & Landing Page Funnels",
      "Sponsored Content, Document & Video Ads",
      "Retargeting & Lookalike Audiences",
      "CRM Integration & Offline Conversion Tracking",
      "Creative Production & Ad Copywriting",
      "Budget Pacing, Bidding & A/B Testing"
    ],
    "benefits": [
      "Pipeline from decision-makers, not junior clicks",
      "Lower cost-per-qualified-lead through tight ICP targeting",
      "Sales and marketing aligned on one lead definition",
      "Full-funnel visibility from impression to closed deal",
      "Creative that earns attention in a professional feed",
      "Spend that scales only when the numbers prove it"
    ],
    "content": {
      "process": [
        {
          "step": 1,
          "title": "ICP & Offer Strategy",
          "description": "We define exactly who we're targeting — titles, seniority, industries, company sizes, named accounts — and match each audience to an offer appropriate for its stage: insight content for cold audiences, demos and trials for warm ones. B2B campaigns fail on mismatched offers more than on targeting."
        },
        {
          "step": 2,
          "title": "Tracking & CRM Foundation",
          "description": "Before spending a lira, we install the Insight Tag, configure conversions API, and connect LinkedIn to your CRM so leads carry campaign data into the pipeline. This lets us optimize toward qualified opportunities instead of raw form fills."
        },
        {
          "step": 3,
          "title": "Campaign & Audience Build",
          "description": "Campaigns are structured by funnel stage and audience, with exclusions to prevent overlap and frequency caps to protect your brand. For ABM, we sync named account lists and build per-segment messaging."
        },
        {
          "step": 4,
          "title": "Creative Production",
          "description": "We produce the ad creative — copy, static visuals, documents, and short video — designed for how people actually scroll LinkedIn. Each concept ships in multiple variants so testing starts from day one."
        },
        {
          "step": 5,
          "title": "Launch & Optimization",
          "description": "After launch we manage bids, budgets, and rotation weekly, cutting what underperforms and feeding winners. Optimization decisions use CRM-stage data — an ad with cheap leads that never become opportunities gets killed regardless of its CTR."
        },
        {
          "step": 6,
          "title": "Reporting & Scaling",
          "description": "Monthly reports show spend against pipeline and revenue contribution, by audience and creative — in language your leadership reads. Once cost-per-opportunity is stable and acceptable, we scale budgets deliberately and expand to new segments."
        }
      ],
      "faq": [
        {
          "answer": "For B2B with deal sizes above roughly $5k, usually yes — you're paying more per click for dramatically better audience quality, reaching specific titles at specific companies. The math is simple: a $15 CPC that produces real pipeline beats a $2 CPC that produces students and job seekers. We model break-even cost-per-opportunity with you before launching.",
          "question": "Is LinkedIn worth the high CPCs compared to Google or Meta?"
        },
        {
          "answer": "We recommend at least $2,500–4,000/month in ad spend for a meaningful test — enough for LinkedIn's delivery system to exit the learning phase and for statistically useful lead volume. Below that, budget concentrates on one tight audience and a single offer rather than spreading thin.",
          "question": "What budget do we need to start?"
        },
        {
          "answer": "Lead Gen Forms typically convert 2–4x better because they pre-fill profile data, making them ideal for top-of-funnel offers like guides and webinars. Landing pages produce higher-intent leads for demo and pricing requests. We usually run both, matched to funnel stage, and let your CRM data decide the mix.",
          "question": "Lead Gen Forms or landing pages — which is better?"
        },
        {
          "answer": "First leads typically arrive within 1–2 weeks of launch; judging lead quality through your sales process takes 4–8 weeks depending on your sales cycle. We set this expectation up front: LinkedIn is a pipeline-building channel, not a same-week-revenue channel.",
          "question": "How quickly will we see qualified leads?"
        },
        {
          "answer": "Yes — named account lists are LinkedIn's standout capability. We upload your target accounts, layer title and seniority filters on top, and run per-segment messaging. Combined with retargeting, this keeps your solution in front of a buying committee throughout long deal cycles.",
          "question": "Can you target specific companies on our wishlist (ABM)?"
        },
        {
          "answer": "Both. Creative is included: copywriting, static design, document ads, and short video edits — produced for a professional feed where useful insight outperforms hard selling. Client-supplied creative is welcome too; we'll tell you honestly what we expect to work and test it against ours.",
          "question": "Do you create the ad creative or just manage the campaigns?"
        },
        {
          "answer": "We track leads into your CRM and report on what matters commercially: marketing-qualified leads, opportunities created, pipeline value, and closed revenue per campaign. Offline conversion uploads feed deal outcomes back into LinkedIn, which improves its optimization too.",
          "question": "How do you measure success beyond clicks and form fills?"
        },
        {
          "answer": "Junk leads usually trace to three causes: audiences too broad, offers misaligned with funnel stage, and optimizing for cheap form fills instead of CRM outcomes. We fix the audience definition first, match offers to intent, add qualifying friction where needed, and judge every ad by what your sales team reports back.",
          "question": "Our previous LinkedIn campaigns produced junk leads. What would you do differently?"
        }
      ],
      "technologies": [
        {
          "icon": "linkedin",
          "name": "LinkedIn Campaign Manager"
        },
        {
          "icon": "linkedin",
          "name": "LinkedIn Insight Tag"
        },
        {
          "icon": "hubspot",
          "name": "HubSpot"
        },
        {
          "icon": "salesforce",
          "name": "Salesforce"
        },
        {
          "icon": "ga4",
          "name": "Google Analytics 4"
        },
        {
          "icon": "zapier",
          "name": "Zapier"
        },
        {
          "icon": "figma",
          "name": "Figma"
        },
        {
          "icon": "looker",
          "name": "Looker Studio"
        }
      ]
    }
  },
  "tr": {
    "name": "LinkedIn Ads",
    "shortDescription": "Karar vericilere tam iş hakkında düşündükleri yerde ulaşın. Sadece gösterim veya tıklamalardan ibaret olmayan, hassas B2B hedeflemesini nitelikli satış fırsatlarına dönüştüren LinkedIn kampanyaları oluşturuyoruz.",
    "fullDescription": "LinkedIn, 200 kişilik bir finans teknolojisi şirketindeki Mühendislikten Sorumlu Başkan Yardımcısını (VP) iş unvanı, kıdemi ve şirketine göre hedefleyebileceğiniz tek platformdur. Ancak bu hassasiyet yüksek tıklama başı maliyet (CPC) gerektirir ve boşa harcanan bütçe iki kat zarar verir. LinkedIn Ads kampanyalarını tam bir B2B disipliniyle yönetiyoruz: İdeal Müşteri Profilinize (ICP) uygun kesin kitle tanımları, alıcının yolculuğuna uygun teklifler, profesyonel bir akış için tasarlanmış yaratıcı içerikler ve sadece tıklama oranını değil satış hattını ve geliri optimize edebilmemiz için CRM'inize entegre edilmiş dönüşüm izleme sistemi. Potansiyel Müşteri Formlarından (Lead Gen Forms) belge reklamlarına, yeniden hedeflemeye ve belirlenmiş hesaplar için Hesap Bazlı Pazarlamaya (ABM) kadar her kampanya ölçülebilir olarak yapılandırılır — ve satış ekibinizin gerçekten elde ettiği fırsatlara göre sonlandırılır veya ölçeklendirilir.",
    "features": [
      "ICP Tanımı ve Kitle Mimarisi",
      "Hesap Bazlı Pazarlama (ABM) Kampanyaları",
      "Lead Gen Formları ve Açılış Sayfası Hunileri",
      "Sponsorlu İçerik, Belge ve Video Reklamları",
      "Yeniden Hedefleme ve Benzer Kitleler (Lookalike)",
      "CRM Entegrasyonu ve Çevrimdışı Dönüşüm İzleme",
      "Yaratıcı Prodüksiyon ve Reklam Metin Yazarlığı",
      "Bütçe Hızı, Teklif Verme ve A/B Testleri"
    ],
    "benefits": [
      "Düşük seviyeli tıklamalar değil, karar vericilerden gelen satış hattı",
      "Sıkı ICP hedeflemesi ile daha düşük nitelikli müşteri edinme maliyeti",
      "Satış ve pazarlamanın tek bir lead tanımında hizalanması",
      "Gösterimden kapanan anlaşmaya kadar tüm hunide görünürlük",
      "Profesyonel bir akışta dikkat çeken yaratıcı tasarımlar",
      "Bütçenin yalnızca rakamlar kanıtlandığında ölçeklendirilmesi"
    ],
    "metaTitle": "LinkedIn Ads Ajansı | B2B Reklam Yönetimi | PakSoft",
    "metaDescription": "Hassas B2B hedeflemesini nitelikli satış fırsatlarına dönüştüren LinkedIn Ads yönetimi. Sadece tıklamaları değil, satış hattını ve geliri optimize ediyoruz.",
    "content": {
      "process": [
        {
          "step": 1,
          "title": "ICP ve Teklif Stratejisi",
          "description": "Tam olarak kimi hedeflediğimizi belirliyoruz — unvanlar, kıdem, sektörler, şirket boyutları, isimli hesaplar — ve her kitleyi aşamasına uygun bir teklifle eşleştiriyoruz: soğuk kitleler için içgörü içeriği, sıcak kitleler için demo ve denemeler. B2B kampanyaları hedeflemeden çok uyumsuz teklifler nedeniyle başarısız olur."
        },
        {
          "step": 2,
          "title": "İzleme ve CRM Temeli",
          "description": "Tek bir lira harcamadan önce Insight Tag'i kurar, dönüşüm API'sini yapılandırır ve potansiyel müşterilerin kampanya verilerini satış hattına taşıması için LinkedIn'i CRM'inize bağlarız. Bu sayede ham form doldurma işlemleri yerine nitelikli fırsatlara göre optimizasyon yaparız."
        },
        {
          "step": 3,
          "title": "Kampanya ve Kitle Oluşturma",
          "description": "Kampanyalar, huni aşamasına ve kitleye göre yapılandırılır. Çakışmayı önlemek için hariç tutmalar ve markanızı korumak için frekans sınırları belirlenir. ABM için hedef hesap listelerini eşitler ve her segmente özel mesajlaşma oluştururuz."
        },
        {
          "step": 4,
          "title": "Yaratıcı Prodüksiyon",
          "description": "İnsanların LinkedIn'de nasıl gezindiklerini göz önünde bulundurarak reklam öğeleri — metin, statik görseller, belgeler ve kısa videolar — üretiyoruz. Her konsept, testlerin ilk günden itibaren başlaması için birden fazla varyantla sunulur."
        },
        {
          "step": 5,
          "title": "Lansman ve Optimizasyon",
          "description": "Lansmandan sonra, performans göstermeyenleri kesip kazananları besleyerek teklifleri, bütçeleri ve rotasyonu haftalık olarak yönetiriz. Optimizasyon kararlarında CRM verileri kullanılır — fırsata dönüşmeyen ucuz potansiyel müşteriler getiren bir reklam, tıklama oranı ne olursa olsun durdurulur."
        },
        {
          "step": 6,
          "title": "Raporlama ve Ölçeklendirme",
          "description": "Aylık raporlar, bütçenin satış hattına ve gelir katkısına olan etkisini kitle ve yaratıcı bazında, liderlerinizin okuyabileceği bir dilde gösterir. Fırsat başına maliyet istikrarlı hale geldiğinde, bütçeleri bilinçli olarak ölçeklendirir ve yeni segmentlere genişleriz."
        }
      ],
      "faq": [
        {
          "answer": "Yaklaşık 5 bin doların üzerindeki B2B anlaşmaları için genellikle evet — belirli şirketlerdeki belirli unvanlara ulaşarak inanılmaz derecede daha iyi bir kitle kalitesi için tıklama başına daha fazla ödeme yapıyorsunuz. Matematik basittir: Gerçek bir satış fırsatı yaratan 15 dolarlık bir CPC, öğrenci ve iş arayanları getiren 2 dolarlık bir CPC'den daha iyidir.",
          "question": "LinkedIn, Google veya Meta'ya kıyasla yüksek tıklama maliyetlerine (CPC) değer mi?"
        },
        {
          "answer": "Anlamlı bir test için aylık en az 2.500–4.000$ reklam harcaması öneriyoruz; bu miktar, LinkedIn'in yayın sisteminin öğrenme aşamasından çıkması ve istatistiksel olarak yararlı bir hacim için yeterlidir. Bunun altındaki bütçeler geniş çapta yayılmak yerine tek bir sıkı kitleye odaklanmalıdır.",
          "question": "Başlamak için ne kadar bütçeye ihtiyacımız var?"
        },
        {
          "answer": "Lead Gen Formları profil verilerini otomatik doldurduğu için genellikle 2-4 kat daha iyi dönüşüm sağlar; rehberler ve webinarlar gibi huni üstü teklifler için idealdir. Açılış sayfaları ise demo ve fiyatlandırma talepleri için daha yüksek niyetli müşteriler üretir. Genellikle huni aşamasına uygun olarak her ikisini de kullanırız.",
          "question": "Lead Gen Formları mı yoksa açılış sayfaları mı (Landing Pages) daha iyi?"
        },
        {
          "answer": "İlk potansiyel müşteriler lansmandan sonra 1-2 hafta içinde gelir; kalitelerini satış süreciniz üzerinden değerlendirmek satış döngünüze bağlı olarak 4-8 hafta sürer. Beklentileri en başından belirliyoruz: LinkedIn, aynı hafta gelir elde etme kanalı değil, satış hattı (pipeline) oluşturma kanalıdır.",
          "question": "Ne kadar sürede nitelikli potansiyel müşteriler göreceğiz?"
        },
        {
          "answer": "Evet — isimlendirilmiş hesap listeleri LinkedIn'in öne çıkan özelliğidir. Hedef hesaplarınızı sisteme yüklüyor, üzerine unvan ve kıdem filtreleri ekliyor ve her segmente özel mesajlaşma yayınlıyoruz. Yeniden hedefleme ile birleştirildiğinde, uzun anlaşma döngüleri boyunca akıllarda kalırsınız.",
          "question": "İstek listemizdeki belirli şirketleri (ABM) hedefleyebilir misiniz?"
        },
        {
          "answer": "Her ikisi de. Yaratıcı prodüksiyon hizmete dahildir: profesyonel bir akış için metin yazarlığı, statik tasarım, belge reklamları ve kısa video düzenlemeleri. Müşterinin sağladığı içeriklere de açığız; neyin işe yarayacağı konusunda dürüst fikirlerimizi belirtir ve test ederiz.",
          "question": "Reklam öğelerini siz mi yaratıyorsunuz yoksa sadece kampanyaları mı yönetiyorsunuz?"
        },
        {
          "answer": "Potansiyel müşterileri CRM'inize kadar izliyor ve ticari olarak önemli olan metrikleri raporluyoruz: pazarlama nitelikli müşteri (MQL), yaratılan fırsatlar, satış hattı değeri ve kampanya başına kapanan gelir. Çevrimdışı dönüşüm yüklemeleri, LinkedIn'e anlaşma sonuçlarını geri besleyerek optimizasyonunu geliştirir.",
          "question": "Başarıyı tıklama ve form doldurmaların ötesinde nasıl ölçüyorsunuz?"
        },
        {
          "answer": "Çöp potansiyel müşteriler genelde üç nedene dayanır: Çok geniş kitleler, huni aşamasıyla uyumsuz teklifler ve CRM sonuçları yerine ucuz form doldurma işlemlerine yönelik optimizasyon. Önce kitle tanımını düzeltiyor, teklifleri niyete göre eşleştiriyor ve reklamları satış ekibinizin raporlarına göre değerlendiriyoruz.",
          "question": "Önceki LinkedIn kampanyalarımız çöp potansiyel müşteriler üretti. Siz farklı olarak ne yapacaksınız?"
        }
      ],
      "technologies": [
        {
          "icon": "linkedin",
          "name": "LinkedIn Campaign Manager"
        },
        {
          "icon": "linkedin",
          "name": "LinkedIn Insight Tag"
        },
        {
          "icon": "hubspot",
          "name": "HubSpot"
        },
        {
          "icon": "salesforce",
          "name": "Salesforce"
        },
        {
          "icon": "ga4",
          "name": "Google Analytics 4"
        },
        {
          "icon": "zapier",
          "name": "Zapier"
        },
        {
          "icon": "figma",
          "name": "Figma"
        },
        {
          "icon": "looker",
          "name": "Looker Studio"
        }
      ]
    }
  },
  "de": {
    "name": "LinkedIn Ads",
    "shortDescription": "Erreichen Sie Entscheidungsträger dort, wo sie bereits über die Arbeit nachdenken. Wir erstellen LinkedIn-Kampagnen, die präzises B2B-Targeting in qualifizierte Pipelines verwandeln — nicht nur in Impressionen und bedeutungslose Klicks.",
    "fullDescription": "LinkedIn ist die einzige Plattform, auf der Sie einen VP of Engineering bei einem 200-Personen-Fintech-Unternehmen nach Jobtitel, Dienstalter und Unternehmen gezielt ansprechen können — aber diese Präzision hat bei den CPCs ihren Preis, und verschwendetes Budget schmerzt doppelt. Wir betreiben LinkedIn Ads mit B2B-Disziplin: genaue Zielgruppendefinitionen, die auf Ihr ICP abgestimmt sind, Angebote, die den Käufer an seinem aktuellen Punkt der Customer Journey abholen, Creatives für einen professionellen Feed und Conversion-Tracking, das direkt mit Ihrem CRM verbunden ist. So optimieren wir auf Pipeline und Umsatz, nicht auf die Klickrate. Von Lead Gen Forms und Dokument-Anzeigen bis hin zu Retargeting und Account-Based Marketing (ABM) für benannte Zielkonten wird jede Kampagne so strukturiert, dass sie messbar ist — und basierend auf dem, was Ihr Vertriebsteam tatsächlich erhält, skaliert oder gestoppt.",
    "features": [
      "ICP-Definition & Zielgruppenarchitektur",
      "Account-Based Marketing (ABM) Kampagnen",
      "Lead Gen Forms & Landing Page Funnels",
      "Sponsored Content, Dokument- & Video-Anzeigen",
      "Retargeting & Lookalike Audiences",
      "CRM-Integration & Offline Conversion Tracking",
      "Creative-Produktion & Anzeigentexte",
      "Budget-Pacing, Bidding & A/B-Testing"
    ],
    "benefits": [
      "Pipeline von Entscheidungsträgern, keine minderwertigen Klicks",
      "Niedrigere Kosten pro qualifiziertem Lead durch enges ICP-Targeting",
      "Vertrieb und Marketing auf eine gemeinsame Lead-Definition abgestimmt",
      "Full-Funnel-Sichtbarkeit von der Impression bis zum Geschäftsabschluss",
      "Creatives, die im professionellen Feed Aufmerksamkeit erregen",
      "Ausgaben, die nur skaliert werden, wenn die Zahlen es belegen"
    ],
    "metaTitle": "LinkedIn Ads Agentur | B2B Kampagnen-Management | PakSoft",
    "metaDescription": "LinkedIn Ads Management, das präzises B2B-Targeting in qualifizierte Vertriebspipelines verwandelt. Wir optimieren auf Umsatz, nicht nur auf Klicks.",
    "content": {
      "process": [
        {
          "step": 1,
          "title": "ICP & Angebotsstrategie",
          "description": "Wir definieren genau, wen wir ansprechen — Titel, Dienstalter, Branchen, Unternehmensgrößen, spezifische Accounts — und passen jede Zielgruppe an ein für ihre Phase geeignetes Angebot an: Insight-Content für kalte Zielgruppen, Demos für warme. B2B-Kampagnen scheitern häufiger an unpassenden Angeboten als am Targeting."
        },
        {
          "step": 2,
          "title": "Tracking & CRM-Fundament",
          "description": "Bevor wir einen Cent ausgeben, installieren wir das Insight Tag, konfigurieren die Conversions API und verbinden LinkedIn mit Ihrem CRM. So können wir auf qualifizierte Chancen statt auf bloße Formularausfüllungen optimieren."
        },
        {
          "step": 3,
          "title": "Kampagnen- & Zielgruppenaufbau",
          "description": "Die Kampagnen werden nach Funnel-Phase und Zielgruppe strukturiert. Ausschlüsse verhindern Überschneidungen und Frequency Caps schützen Ihre Marke. Für ABM synchronisieren wir Account-Listen und erstellen segmentspezifische Botschaften."
        },
        {
          "step": 4,
          "title": "Creative-Produktion",
          "description": "Wir produzieren die Anzeigen-Creatives — Texte, statische Bilder, Dokumente und kurze Videos —, die darauf ausgelegt sind, wie Menschen tatsächlich auf LinkedIn scrollen. Jedes Konzept geht in mehreren Varianten an den Start, um ab Tag 1 testen zu können."
        },
        {
          "step": 5,
          "title": "Launch & Optimierung",
          "description": "Nach dem Start verwalten wir Gebote, Budgets und Rotationen wöchentlich. Optimierungsentscheidungen basieren auf CRM-Daten — eine Anzeige mit billigen Leads, die nie zu Chancen werden, wird gestoppt, unabhängig von ihrer CTR."
        },
        {
          "step": 6,
          "title": "Reporting & Skalierung",
          "description": "Monatliche Berichte zeigen die Ausgaben im Verhältnis zu Pipeline und Umsatzbeitrag — in einer Sprache, die Ihr Management versteht. Sobald die Kosten pro Opportunity stabil sind, skalieren wir die Budgets bewusst."
        }
      ],
      "faq": [
        {
          "answer": "Für B2B mit Dealgrößen über etwa 5.000 US-Dollar meistens ja — Sie zahlen mehr pro Klick, erhalten aber eine dramatisch bessere Zielgruppenqualität und erreichen spezifische Titel in spezifischen Unternehmen. Die Mathematik ist einfach: Ein 15-Dollar-CPC, der eine echte Pipeline generiert, schlägt einen 2-Dollar-CPC, der nur Studenten anzieht.",
          "question": "Lohnen sich die hohen CPCs auf LinkedIn im Vergleich zu Google oder Meta?"
        },
        {
          "answer": "Wir empfehlen mindestens 2.500–4.000 US-Dollar/Monat an Werbeausgaben für einen aussagekräftigen Test — genug für das Auslieferungssystem, um die Lernphase zu verlassen. Darunter konzentriert sich das Budget besser auf eine enge Zielgruppe und ein einziges Angebot.",
          "question": "Welches Budget benötigen wir für den Start?"
        },
        {
          "answer": "Lead Gen Forms konvertieren in der Regel 2–4x besser, da sie Profildaten vorausfüllen, ideal für Top-of-Funnel-Angebote wie Guides. Landing Pages produzieren Leads mit höherer Absicht für Demos. Wir nutzen meist beides, passend zur Funnel-Phase.",
          "question": "Lead Gen Forms oder Landing Pages — was ist besser?"
        },
        {
          "answer": "Die ersten Leads treffen in der Regel 1–2 Wochen nach dem Start ein. Die Beurteilung der Lead-Qualität durch Ihren Vertriebsprozess dauert je nach Verkaufszyklus 4–8 Wochen. LinkedIn ist ein Pipeline-Aufbau-Kanal, kein Sofort-Umsatz-Kanal.",
          "question": "Wie schnell werden wir qualifizierte Leads sehen?"
        },
        {
          "answer": "Ja — benannte Account-Listen sind die herausragende Fähigkeit von LinkedIn. Wir laden Ihre Zielkonten hoch, legen Titel- und Dienstalter-Filter darüber und führen pro Segment spezifische Botschaften aus.",
          "question": "Können Sie bestimmte Unternehmen auf unserer Wunschliste gezielt ansprechen (ABM)?"
        },
        {
          "answer": "Beides. Creatives sind inbegriffen: Copywriting, statisches Design, Dokument-Anzeigen und kurze Videos — produziert für einen professionellen Feed. Von Kunden bereitgestellte Creatives sind ebenfalls willkommen; wir testen sie gegen unsere.",
          "question": "Erstellen Sie auch die Anzeigen-Creatives oder verwalten Sie nur die Kampagnen?"
        },
        {
          "answer": "Wir verfolgen Leads bis in Ihr CRM und berichten über das, was kommerziell zählt: MQLs, generierte Chancen, Pipeline-Wert und abgeschlossener Umsatz pro Kampagne. Offline-Conversion-Uploads füttern Deal-Ergebnisse in LinkedIn zurück.",
          "question": "Wie messen Sie den Erfolg jenseits von Klicks und ausgefüllten Formularen?"
        },
        {
          "answer": "Minderwertige Leads haben meist drei Ursachen: zu breite Zielgruppen, falsch abgestimmte Angebote und Optimierung auf billige Formularausfüllungen statt auf CRM-Ergebnisse. Wir beheben zuerst die Zielgruppendefinition und bewerten jede Anzeige nach dem Feedback Ihres Vertriebsteams.",
          "question": "Unsere bisherigen LinkedIn-Kampagnen haben nur minderwertige Leads gebracht. Was würden Sie anders machen?"
        }
      ],
      "technologies": [
        {
          "icon": "linkedin",
          "name": "LinkedIn Campaign Manager"
        },
        {
          "icon": "linkedin",
          "name": "LinkedIn Insight Tag"
        },
        {
          "icon": "hubspot",
          "name": "HubSpot"
        },
        {
          "icon": "salesforce",
          "name": "Salesforce"
        },
        {
          "icon": "ga4",
          "name": "Google Analytics 4"
        },
        {
          "icon": "zapier",
          "name": "Zapier"
        },
        {
          "icon": "figma",
          "name": "Figma"
        },
        {
          "icon": "looker",
          "name": "Looker Studio"
        }
      ]
    }
  },
  "ur": {
    "name": "لنکڈان ایڈز (LinkedIn Ads)",
    "shortDescription": "فیصلہ سازوں تک وہاں پہنچیں جہاں وہ پہلے ہی کام کے بارے میں سوچ رہے ہوں۔ ہم ایسی لنکڈان (LinkedIn) مہمات بناتے ہیں جو درست B2B ہدف بندی کو کوالیفائیڈ پائپ لائن میں بدل دیتی ہیں — نہ کہ صرف امپریشنز اور بے مقصد کلکس میں۔",
    "fullDescription": "لنکڈان (LinkedIn) واحد پلیٹ فارم ہے جہاں آپ 200 افراد کی فنٹیک کمپنی کے VP of Engineering کو ان کے عہدے، سینیارٹی اور کمپنی کے لحاظ سے ہدف بنا سکتے ہیں — لیکن یہ درستگی مہنگے CPCs کی قیمت پر آتی ہے، اور ضائع ہونے والا بجٹ دوگنا تکلیف دیتا ہے۔ ہم لنکڈان ایڈز کو B2B نظم و ضبط کے ساتھ چلاتے ہیں: آپ کے ICP کے مطابق سامعین کی سخت تعریفیں، ایسی آفرز جو خریدار کے سفر کا احترام کرتی ہوں، پروفیشنل فیڈ کے لیے تیار کردہ کریٹیو، اور آپ کے CRM سے جڑا ہوا کنورژن ٹریکنگ سسٹم تاکہ ہم کلک تھرو ریٹ کے بجائے پائپ لائن اور ریونیو کو بہتر بنا سکیں۔ Lead Gen Forms اور ڈاکومنٹ اشتہارات سے لے کر ری ٹارگٹنگ اور نامزد ٹارگٹ اکاؤنٹس کے لیے Account-Based Marketing (ABM) تک، ہر مہم کو اس طرح تشکیل دیا جاتا ہے کہ اس کی پیمائش کی جا سکے — اور اسے آپ کی سیلز ٹیم کو ملنے والے حقیقی مواقع کی بنیاد پر بند کیا جائے یا بڑھایا جائے۔",
    "features": [
      "ICP کی تعریف اور سامعین کا فن تعمیر",
      "اکاؤنٹ پر مبنی مارکیٹنگ (ABM) مہمات",
      "لیڈ جین فارمز (Lead Gen Forms) اور لینڈنگ پیج فنلز",
      "اسپانسر شدہ مواد، ڈاکومنٹ اور ویڈیو اشتہارات",
      "ری ٹارگٹنگ اور ایک جیسے سامعین (Lookalike Audiences)",
      "CRM انٹیگریشن اور آف لائن کنورژن ٹریکنگ",
      "کریٹیو پروڈکشن اور اشتہارات کی کاپی رائٹنگ",
      "بجٹ پیسنگ، بڈنگ اور A/B ٹیسٹنگ"
    ],
    "benefits": [
      "جونیئر کلکس کے بجائے فیصلہ سازوں سے پائپ لائن",
      "سخت ICP ہدف بندی کے ذریعے کم قیمت پر کوالیفائیڈ لیڈز",
      "سیلز اور مارکیٹنگ کی ایک ہی لیڈ تعریف پر ہم آہنگی",
      "امپریشن سے لے کر ڈیل کلوز ہونے تک مکمل فنل ویزیبلٹی",
      "ایسے کریٹیو ڈیزائن جو پروفیشنل فیڈ میں توجہ حاصل کریں",
      "اخراجات میں صرف اس وقت اضافہ جب نتائج ثابت ہو جائیں"
    ],
    "metaTitle": "لنکڈان ایڈز ایجنسی | B2B مہم مینجمنٹ | PakSoft",
    "metaDescription": "لنکڈان (LinkedIn) ایڈز مینجمنٹ جو درست B2B ہدف بندی کو کوالیفائیڈ سیلز پائپ لائن میں بدل دیتی ہے۔ ہم صرف کلکس نہیں بلکہ ریونیو کو بہتر بناتے ہیں۔",
    "content": {
      "process": [
        {
          "step": 1,
          "title": "ICP اور آفر اسٹریٹجی",
          "description": "ہم بالکل درست تعین کرتے ہیں کہ ہم کسے ہدف بنا رہے ہیں — عہدے، سینیارٹی، صنعتیں، کمپنیوں کے سائز — اور ہر سامعین کو ان کے مرحلے کے مطابق ایک آفر کے ساتھ ملاتے ہیں: سرد سامعین کے لیے بصیرت افروز مواد، گرم سامعین کے لیے ڈیمو اور ٹرائلز۔ B2B مہمات ہدف بندی سے زیادہ غیر موزوں آفرز کی وجہ سے ناکام ہوتی ہیں۔"
        },
        {
          "step": 2,
          "title": "ٹریکنگ اور CRM کی بنیاد",
          "description": "ایک روپیہ خرچ کرنے سے پہلے، ہم Insight Tag انسٹال کرتے ہیں، conversions API کنفیگر کرتے ہیں، اور لنکڈان کو آپ کے CRM سے جوڑتے ہیں تاکہ لیڈز مہم کا ڈیٹا پائپ لائن میں لے جائیں۔ اس سے ہم صرف فارم بھرنے کے بجائے کوالیفائیڈ مواقع کی طرف بہتری لا سکتے ہیں۔"
        },
        {
          "step": 3,
          "title": "مہم اور سامعین کی تشکیل",
          "description": "مہمات فنل کے مرحلے اور سامعین کی بنیاد پر تشکیل دی جاتی ہیں، جس میں اوورلیپ کو روکنے اور برانڈ کی حفاظت کے لیے فریکوئنسی کیپس شامل ہوتے ہیں۔ ABM کے لیے، ہم نامزد اکاؤنٹ کی فہرستوں کو ہم آہنگ کرتے ہیں اور مخصوص پیغام رسانی بناتے ہیں۔"
        },
        {
          "step": 4,
          "title": "کریٹیو پروڈکشن",
          "description": "ہم اشتہارات کے کریٹیو — کاپی، جامد بصری، دستاویزات، اور مختصر ویڈیو — تیار کرتے ہیں جو اس بات کو ذہن میں رکھ کر بنائے جاتے ہیں کہ لوگ دراصل لنکڈان کو کیسے اسکرول کرتے ہیں۔ ہر تصور کے متعدد ورژن لانچ کیے جاتے ہیں تاکہ ٹیسٹنگ پہلے دن سے شروع ہو سکے۔"
        },
        {
          "step": 5,
          "title": "لانچ اور آپٹیمائزیشن",
          "description": "لانچ کے بعد، ہم ہفتہ وار بڈز اور بجٹ کا انتظام کرتے ہیں، خراب کارکردگی والے اشتہارات کو بند کرتے ہیں اور کامیاب اشتہارات کو بڑھاتے ہیں۔ آپٹیمائزیشن کے فیصلے CRM کے ڈیٹا پر مبنی ہوتے ہیں — ایک اشتہار جو سستے لیڈز لاتا ہے لیکن مواقع نہیں، اسے بند کر دیا جاتا ہے قطع نظر اس کے CTR کے۔"
        },
        {
          "step": 6,
          "title": "رپورٹنگ اور اسکیلنگ",
          "description": "ماہانہ رپورٹس پائپ لائن اور ریونیو میں بجٹ کے اثرات کو ظاہر کرتی ہیں، سامعین اور کریٹیو کے لحاظ سے — ایسی زبان میں جو آپ کی قیادت پڑھ سکے۔ جب قیمت فی موقع مستحکم اور قابل قبول ہو جاتی ہے، تو ہم بجٹ کو بڑھاتے ہیں اور نئے حصوں تک پھیلاتے ہیں۔"
        }
      ],
      "faq": [
        {
          "answer": "تقریباً 5 ہزار ڈالر سے زیادہ کی B2B ڈیلز کے لیے عام طور پر ہاں — آپ نمایاں طور پر بہتر سامعین کے معیار کے لیے فی کلک زیادہ ادائیگی کر رہے ہیں، مخصوص کمپنیوں میں مخصوص عہدوں تک پہنچ رہے ہیں۔ اگر $15 کا CPC حقیقی پائپ لائن تیار کرتا ہے، تو یہ $2 کے CPC سے بہتر ہے جو صرف طلباء لاتا ہے۔",
          "question": "کیا گوگل یا میٹا کے مقابلے میں لنکڈان کے اعلیٰ CPCs کی کوئی قدر ہے؟"
        },
        {
          "answer": "ہم ایک بامعنی ٹیسٹ کے لیے ماہانہ کم از کم $2,500–$4,000 اشتہاری اخراجات کی سفارش کرتے ہیں — یہ لنکڈان کے ڈیلیوری سسٹم کو سیکھنے کے مرحلے سے باہر نکلنے کے لیے کافی ہے۔ اس سے کم بجٹ ایک ہی سامعین اور ایک ہی آفر پر مرکوز ہونا چاہیے۔",
          "question": "شروع کرنے کے لیے ہمیں کتنا بجٹ درکار ہے؟"
        },
        {
          "answer": "لیڈ جین فارمز عام طور پر 2–4 گنا بہتر کنورٹ ہوتے ہیں کیونکہ وہ پروفائل کا ڈیٹا پہلے سے بھر دیتے ہیں، جو گائیڈز جیسی آفرز کے لیے بہترین ہے۔ لینڈنگ پیجز ڈیمو کے لیے اعلیٰ نیت والے لیڈز تیار کرتے ہیں۔ ہم عام طور پر فنل کے مرحلے کے مطابق دونوں چلاتے ہیں۔",
          "question": "لیڈ جین فارمز (Lead Gen Forms) یا لینڈنگ پیجز — کون سا بہتر ہے؟"
        },
        {
          "answer": "پہلے لیڈز عام طور پر لانچ کے 1–2 ہفتوں کے اندر آجاتے ہیں؛ آپ کے سیلز سائیکل پر منحصر ہے، کوالٹی جانچنے میں 4–8 ہفتے لگتے ہیں۔ ہم یہ توقع شروع میں ہی واضح کر دیتے ہیں: لنکڈان پائپ لائن بنانے والا چینل ہے، فوری ریونیو کا چینل نہیں۔",
          "question": "ہمیں کوالیفائیڈ لیڈز کتنی جلدی ملیں گی؟"
        },
        {
          "answer": "ہاں — نامزد اکاؤنٹ کی فہرستیں لنکڈان کی نمایاں صلاحیت ہیں۔ ہم آپ کے ٹارگٹ اکاؤنٹس کو اپ لوڈ کرتے ہیں، ان پر ٹائٹل اور سینیارٹی فلٹرز لگاتے ہیں، اور متعلقہ پیغام رسانی چلاتے ہیں۔",
          "question": "کیا آپ ہماری خواہش کی فہرست (ABM) میں مخصوص کمپنیوں کو ہدف بنا سکتے ہیں؟"
        },
        {
          "answer": "دونوں۔ کریٹیو شامل ہے: کاپی رائٹنگ، جامد ڈیزائن، ڈاکومنٹ اشتہارات، اور مختصر ویڈیو — جو پیشہ ورانہ فیڈ کے لیے تیار کیے جاتے ہیں۔ اگر آپ کا اپنا کریٹیو ہے، تو ہم اسے بھی ٹیسٹ کر سکتے ہیں۔",
          "question": "کیا آپ اشتہاری کریٹیو بناتے ہیں یا صرف مہمات کا انتظام کرتے ہیں؟"
        },
        {
          "answer": "ہم لیڈز کو آپ کے CRM میں ٹریک کرتے ہیں اور ان چیزوں پر رپورٹ کرتے ہیں جو تجارتی اہمیت رکھتی ہیں: MQLs، پیدا کردہ مواقع، پائپ لائن کی قدر، اور فی مہم ریونیو۔ آف لائن کنورژن اپ لوڈز لنکڈان کو دوبارہ ڈیٹا فراہم کرتے ہیں۔",
          "question": "آپ کلکس اور فارم بھرنے سے ہٹ کر کامیابی کی پیمائش کیسے کرتے ہیں؟"
        },
        {
          "answer": "فضول لیڈز کی عموماً تین وجوہات ہوتی ہیں: سامعین کا بہت وسیع ہونا، آفرز کا فنل کے مرحلے سے مطابقت نہ رکھنا، اور سستے فارم بھرنے کی طرف آپٹیمائز کرنا۔ ہم پہلے سامعین کی تعریف کو ٹھیک کرتے ہیں اور ہر اشتہار کا فیصلہ آپ کی سیلز ٹیم کی رپورٹ پر کرتے ہیں۔",
          "question": "ہماری پچھلی لنکڈان مہمات نے فضول لیڈز پیدا کیں۔ آپ مختلف کیا کریں گے؟"
        }
      ],
      "technologies": [
        {
          "icon": "linkedin",
          "name": "LinkedIn Campaign Manager"
        },
        {
          "icon": "linkedin",
          "name": "LinkedIn Insight Tag"
        },
        {
          "icon": "hubspot",
          "name": "HubSpot"
        },
        {
          "icon": "salesforce",
          "name": "Salesforce"
        },
        {
          "icon": "ga4",
          "name": "Google Analytics 4"
        },
        {
          "icon": "zapier",
          "name": "Zapier"
        },
        {
          "icon": "figma",
          "name": "Figma"
        },
        {
          "icon": "looker",
          "name": "Looker Studio"
        }
      ]
    }
  },
  "ar": {
    "name": "إعلانات لينكد إن (LinkedIn Ads)",
    "shortDescription": "صِل إلى صناع القرار في المكان الذي يفكرون فيه بالعمل بالفعل. نحن نبني حملات لينكد إن (LinkedIn) تحول الاستهداف الدقيق للشركات (B2B) إلى خط أنابيب مبيعات مؤهل — وليس مجرد انطباعات ونقرات بلا قيمة.",
    "fullDescription": "لينكد إن (LinkedIn) هي المنصة الوحيدة التي تتيح لك استهداف نائب رئيس الهندسة في شركة تكنولوجيا مالية مكونة من 200 شخص بناءً على المسمى الوظيفي والأقدمية والشركة — لكن هذه الدقة تأتي بتكلفة عالية للنقرة (CPC)، والإنفاق المهدر يؤلم مرتين. نحن ندير إعلانات لينكد إن بانضباط يخص قطاع الشركات (B2B): تحديد دقيق للجمهور يتطابق مع ملف العميل المثالي (ICP) الخاص بك، وعروض تحترم المرحلة التي يمر بها المشتري، وتصميمات إبداعية مبنية لبيئة عمل احترافية، وتتبع للتحويلات مرتبط بنظام إدارة علاقات العملاء (CRM) الخاص بك بحيث نقوم بالتحسين من أجل خطوط الأنابيب والإيرادات. بدءًا من نماذج جذب العملاء المحتملين (Lead Gen Forms) وإعلانات المستندات، وصولاً إلى التسويق القائم على الحسابات (ABM) للحسابات المستهدفة، يتم تصميم كل حملة بحيث تكون قابلة للقياس — ويتم إيقافها أو توسيعها بناءً على ما يتلقاه فريق المبيعات الخاص بك بالفعل.",
    "features": [
      "تحديد ICP وهيكلة الجمهور",
      "حملات التسويق القائم على الحسابات (ABM)",
      "نماذج جذب العملاء (Lead Gen Forms) ومسارات الهبوط",
      "المحتوى الممول، إعلانات المستندات والفيديو",
      "إعادة الاستهداف والجمهور المشابه (Lookalike)",
      "دمج CRM وتتبع التحويلات دون اتصال",
      "الإنتاج الإبداعي وكتابة الإعلانات",
      "توزيع الميزانية والمزايدة واختبار A/B"
    ],
    "benefits": [
      "خط أنابيب مبيعات من صناع القرار، وليس نقرات المبتدئين",
      "تكلفة أقل لكل عميل مؤهل عبر استهداف ICP دقيق",
      "توافق المبيعات والتسويق على تعريف واحد للعميل المحتمل",
      "رؤية شاملة لمسار التحويل من الانطباع إلى إتمام الصفقة",
      "تصميمات إبداعية تجذب الانتباه في بيئة احترافية",
      "نفقات تتوسع فقط عندما تثبت الأرقام نجاحها"
    ],
    "metaTitle": "وكالة إعلانات لينكد إن | إدارة حملات B2B | PakSoft",
    "metaDescription": "إدارة إعلانات لينكد إن (LinkedIn Ads) التي تحول الاستهداف الدقيق للشركات إلى خطوط مبيعات مؤهلة. نقوم بالتحسين من أجل الإيرادات وليس النقرات فقط.",
    "content": {
      "process": [
        {
          "step": 1,
          "title": "استراتيجية ICP والعروض",
          "description": "نحدد بدقة من نستهدف — المسميات، الأقدمية، الصناعات، أحجام الشركات — ونطابق كل جمهور بعرض مناسب لمرحلته: محتوى رؤى للجماهير الباردة، وعروض توضيحية للجماهير الدافئة. تفشل حملات B2B بسبب العروض غير المتطابقة أكثر من الاستهداف."
        },
        {
          "step": 2,
          "title": "أساس التتبع ونظام CRM",
          "description": "قبل إنفاق أي مبلغ، نقوم بتثبيت Insight Tag وتهيئة واجهة برمجة تطبيقات التحويلات وربط لينكد إن بنظام CRM الخاص بك حتى تنقل بيانات الحملة إلى خط المبيعات. يتيح لنا هذا التحسين نحو الفرص المؤهلة بدلاً من تعبئة النماذج العشوائية."
        },
        {
          "step": 3,
          "title": "بناء الحملات والجمهور",
          "description": "يتم تنظيم الحملات حسب مرحلة مسار التحويل والجمهور، مع استبعادات لمنع التداخل وحماية علامتك التجارية. بالنسبة لـ ABM، نقوم بمزامنة قوائم الحسابات المستهدفة وبناء رسائل مخصصة لكل شريحة."
        },
        {
          "step": 4,
          "title": "الإنتاج الإبداعي",
          "description": "نحن ننتج تصميمات الإعلانات — النصوص، الصور الثابتة، المستندات، ومقاطع الفيديو القصيرة — المصممة لطريقة تصفح الأشخاص الفعلية على لينكد إن. يتم إطلاق عدة متغيرات لكل مفهوم لاختبارها منذ اليوم الأول."
        },
        {
          "step": 5,
          "title": "الإطلاق والتحسين",
          "description": "بعد الإطلاق، ندير المزايدات والميزانيات أسبوعياً، ونستبعد ما لا يعمل وندعم الإعلانات الناجحة. تُتخذ قرارات التحسين باستخدام بيانات مرحلة CRM — الإعلان الذي يجلب عملاء رخيصين لا يتحولون لفرص يتم إيقافه بغض النظر عن نسبة النقر (CTR)."
        },
        {
          "step": 6,
          "title": "إعداد التقارير والتوسع",
          "description": "تُظهر التقارير الشهرية الإنفاق مقابل مساهمة خطوط الأنابيب والإيرادات، بلغة تفهمها إدارتك. بمجرد أن تصبح التكلفة لكل فرصة مستقرة ومقبولة، نقوم بزيادة الميزانيات وتوسيع نطاق العمل إلى شرائح جديدة."
        }
      ],
      "faq": [
        {
          "answer": "بالنسبة للشركات (B2B) التي يزيد حجم صفقاتها عن 5 آلاف دولار، عادةً نعم — أنت تدفع أكثر مقابل جودة جمهور أفضل بكثير. الرياضيات بسيطة: نقرة بـ 15 دولارًا تنتج خط مبيعات حقيقي تتفوق على نقرة بـ 2 دولار تنتج طلابًا وباحثين عن عمل.",
          "question": "هل تستحق إعلانات لينكد إن التكلفة العالية للنقرة (CPC) مقارنة بـ جوجل أو ميتا؟"
        },
        {
          "answer": "نوصي بإنفاق ما لا يقل عن 2500 دولار إلى 4000 دولار شهريًا كحد أدنى لاختبار ذي مغزى — وهو ما يكفي لخروج نظام التسليم في لينكد إن من مرحلة التعلم. أقل من ذلك يجب التركيز على جمهور ضيق واحد.",
          "question": "ما هي الميزانية التي نحتاجها للبدء؟"
        },
        {
          "answer": "عادةً ما تحقق نماذج Lead Gen تحويلات أفضل بمقدار 2 إلى 4 مرات لأنها تعبئ بيانات الملف الشخصي مسبقًا، مما يجعلها مثالية لعروض قمة مسار التحويل. صفحات الهبوط تنتج عملاء بنوايا أعلى. نحن ندير كليهما حسب المرحلة.",
          "question": "نماذج Lead Gen أم صفحات الهبوط — أيهما أفضل؟"
        },
        {
          "answer": "عادة ما يصل العملاء الأوائل خلال أسبوع إلى أسبوعين؛ يستغرق تقييم الجودة من خلال عملية المبيعات الخاصة بك من 4 إلى 8 أسابيع حسب دورة المبيعات. لينكد إن قناة لبناء خطوط الأنابيب، وليست قناة لإيرادات نفس الأسبوع.",
          "question": "متى سنبدأ في رؤية عملاء محتملين مؤهلين؟"
        },
        {
          "answer": "نعم — قوائم الحسابات المستهدفة هي الميزة الأبرز في لينكد إن. نحن نقوم بتحميل حساباتك المستهدفة، وتطبيق عوامل تصفية العناوين والأقدمية، وتشغيل رسائل مخصصة لتظل حاضراً أمام لجان الشراء.",
          "question": "هل يمكنك استهداف شركات معينة في قائمة رغباتنا (ABM)؟"
        },
        {
          "answer": "كلاهما. يشمل الإبداع: كتابة النصوص، التصميم الثابت، إعلانات المستندات، وتحرير الفيديو. نحن نرحب أيضًا بتصميمات العملاء ونختبرها مقابل تصميماتنا لنرى أيهما يعمل بشكل أفضل.",
          "question": "هل تقومون بإنشاء التصميم الإبداعي أم تكتفون بإدارة الحملات؟"
        },
        {
          "answer": "نتتبع العملاء المحتملين في نظام CRM الخاص بك ونقدم تقارير عما يهم تجارياً: العملاء المؤهلون، الفرص التي تم إنشاؤها، قيمة خط الأنابيب، والإيرادات المغلقة. عمليات التحويل دون اتصال تحسن من تحسينات لينكد إن.",
          "question": "كيف تقيسون النجاح بعيداً عن النقرات وتعبئة النماذج؟"
        },
        {
          "answer": "العملاء غير المؤهلين يرجعون لثلاثة أسباب: جماهير واسعة جداً، عروض غير متوافقة، والتحسين للحصول على نماذج رخيصة بدلاً من نتائج CRM. نحن نصلح تعريف الجمهور ونقيم كل إعلان بما يبلغ عنه فريق المبيعات.",
          "question": "حملاتنا السابقة على لينكد إن أنتجت عملاء غير مؤهلين. ماذا ستفعلون بشكل مختلف؟"
        }
      ],
      "technologies": [
        {
          "icon": "linkedin",
          "name": "LinkedIn Campaign Manager"
        },
        {
          "icon": "linkedin",
          "name": "LinkedIn Insight Tag"
        },
        {
          "icon": "hubspot",
          "name": "HubSpot"
        },
        {
          "icon": "salesforce",
          "name": "Salesforce"
        },
        {
          "icon": "ga4",
          "name": "Google Analytics 4"
        },
        {
          "icon": "zapier",
          "name": "Zapier"
        },
        {
          "icon": "figma",
          "name": "Figma"
        },
        {
          "icon": "looker",
          "name": "Looker Studio"
        }
      ]
    }
  }
}
```

---

## SERVICES TO WRITE

There are 43 Marketing services. For each, the `slug` is the object key you must use. `name` is the current service name (translate/keep as appropriate). `currentShort`, `currentFeatures`, `currentTech` are the existing skeletal data — expand and improve on them, do not contradict. `parent` is the parent service for context only.

```json
[
 {
  "slug": "blog-copywriting",
  "name": "Blog & Copywriting",
  "parent": "content-marketing",
  "currentShort": "Create SEO-optimized blog content and persuasive copy that ranks and converts.",
  "currentFeatures": [
   "SEO Blog Articles",
   "Landing Page Copy",
   "Product Descriptions",
   "Case Studies",
   "Whitepapers",
   "Content Refresh"
  ],
  "currentTech": [
   "Ahrefs",
   "Surfer SEO",
   "Clearscope",
   "Grammarly",
   "WordPress",
   "Google Docs"
  ]
 },
 {
  "slug": "community-management",
  "name": "Community Management",
  "parent": "social-media-marketing",
  "currentShort": "Build and manage engaged online communities around your brand.",
  "currentFeatures": [
   "Community Building",
   "Engagement Management",
   "Moderation",
   "User Generated Content",
   "Crisis Management",
   "Community Analytics"
  ],
  "currentTech": [
   "Discord",
   "Facebook Groups",
   "Slack"
  ]
 },
 {
  "slug": "company-page-management",
  "name": "Company Page Management",
  "parent": "linkedin-marketing",
  "currentShort": "Grow your LinkedIn company page with strategic content and engagement.",
  "currentFeatures": [
   "Content Calendar",
   "Post Creation",
   "Engagement Management",
   "Employee Advocacy",
   "Analytics Reports",
   "Competitor Analysis"
  ],
  "currentTech": [
   "LinkedIn",
   "Hootsuite",
   "Canva"
  ]
 },
 {
  "slug": "content-strategy",
  "name": "Content Strategy",
  "parent": "content-marketing",
  "currentShort": "Develop a content strategy that drives traffic and conversions.",
  "currentFeatures": [
   "Content Audit",
   "Audience Research",
   "Topic Strategy",
   "Content Calendar",
   "Distribution Plan",
   "Performance Metrics"
  ],
  "currentTech": [
   "SEMrush",
   "Ahrefs",
   "BuzzSumo"
  ]
 },
 {
  "slug": "conversion-rate-optimization",
  "name": "Conversion Rate Optimization",
  "parent": "seo",
  "currentShort": "Increase conversions with data-driven A/B testing, UX improvements, and landing page optimization.",
  "currentFeatures": [
   "Conversion Audit & Analysis",
   "A/B & Multivariate Testing",
   "Heatmap & Session Recording Analysis",
   "Landing Page Optimization",
   "Form Optimization",
   "Checkout Flow Improvement",
   "Personalization Strategies",
   "Statistical Analysis & Reporting"
  ],
  "currentTech": [
   "Google Optimize",
   "VWO",
   "Optimizely",
   "Hotjar",
   "Google Analytics",
   "Mixpanel"
  ]
 },
 {
  "slug": "custom-marketing-automation",
  "name": "Custom Marketing Automation",
  "parent": "marketing-automation",
  "currentShort": "Build custom marketing automation solutions for unique requirements.",
  "currentFeatures": [
   "Custom Workflows",
   "API Integrations",
   "Data Pipelines",
   "Custom Reporting",
   "Multi-platform Sync",
   "Automation Scripts"
  ],
  "currentTech": [
   "Python",
   "Node.js",
   "APIs",
   "Webhooks"
  ]
 },
 {
  "slug": "ecommerce-seo",
  "name": "E-commerce SEO",
  "parent": "seo",
  "currentShort": "Optimize your e-commerce store for search engine visibility.",
  "currentFeatures": [
   "Product Page SEO",
   "Category Optimization",
   "Schema Markup",
   "Site Architecture",
   "Content Strategy",
   "Competitor Analysis"
  ],
  "currentTech": [
   "Ahrefs",
   "Screaming Frog",
   "Google Search Console"
  ]
 },
 {
  "slug": "email-automation",
  "name": "Email Automation",
  "parent": "email-marketing",
  "currentShort": "Build automated email sequences that nurture leads and drive conversions on autopilot.",
  "currentFeatures": [
   "Welcome Series",
   "Abandoned Cart Recovery",
   "Post-Purchase Flows",
   "Win-Back Campaigns",
   "Lead Nurture",
   "Trigger-Based Emails"
  ],
  "currentTech": [
   "Klaviyo",
   "ActiveCampaign",
   "HubSpot",
   "Mailchimp",
   "Customer.io",
   "Litmus"
  ]
 },
 {
  "slug": "email-deliverability",
  "name": "Email Deliverability",
  "parent": "email-marketing",
  "currentShort": "Ensure your emails reach the inbox with deliverability optimization.",
  "currentFeatures": [
   "Authentication Setup",
   "Reputation Monitoring",
   "List Hygiene",
   "Content Analysis",
   "Warmup Strategy",
   "Deliverability Reports"
  ],
  "currentTech": [
   "SPF/DKIM/DMARC",
   "Postmaster Tools",
   "Sender Score"
  ]
 },
 {
  "slug": "email-marketing-automation",
  "name": "Email Marketing Automation",
  "parent": "digital-marketing",
  "currentShort": "Build sophisticated email automation flows that convert and retain at scale.",
  "currentFeatures": [
   "Drip Campaign Design",
   "Behavioral Triggers",
   "Segmentation Strategy",
   "A/B Testing Frameworks",
   "Email Template Design",
   "Deliverability Optimization",
   "Analytics & Reporting",
   "Platform Integration"
  ],
  "currentTech": [
   "Klaviyo",
   "Mailchimp",
   "SendGrid",
   "Customer.io",
   "Segment",
   "Postmark"
  ]
 },
 {
  "slug": "facebook-ads",
  "name": "Facebook Ads",
  "parent": "meta-ads",
  "currentShort": "Drive leads and sales with targeted Facebook ad campaigns.",
  "currentFeatures": [
   "Custom Audience Creation",
   "Lookalike Audiences",
   "Lead Generation Ads",
   "Conversion Campaigns",
   "Catalog Sales",
   "Retargeting Funnels"
  ],
  "currentTech": [
   "Meta Ads Manager",
   "Meta Pixel",
   "Conversion API",
   "Canva",
   "Triple Whale",
   "Hyros"
  ]
 },
 {
  "slug": "funnel-optimization",
  "name": "Funnel Optimization",
  "parent": "cro",
  "currentShort": "Optimize every step of your conversion funnel for better results.",
  "currentFeatures": [
   "Funnel Analysis",
   "Drop-off Identification",
   "Journey Mapping",
   "Stage Optimization",
   "Retargeting Strategy",
   "Attribution"
  ],
  "currentTech": [
   "Google Analytics",
   "Mixpanel",
   "Amplitude"
  ]
 },
 {
  "slug": "geo-ai-search-optimization",
  "name": "GEO & AI Search Optimization",
  "parent": "seo",
  "currentShort": "Optimize for AI search engines and generative search results.",
  "currentFeatures": [
   "AI Search Optimization",
   "Featured Snippets",
   "Conversational Queries",
   "Entity Optimization",
   "Structured Data",
   "Content Formatting"
  ],
  "currentTech": [
   "Schema.org",
   "Knowledge Graphs",
   "NLP Tools"
  ]
 },
 {
  "slug": "google-display-ads",
  "name": "Google Display Ads",
  "parent": "google-ads",
  "currentShort": "Build brand awareness and retarget visitors across millions of websites with display ads.",
  "currentFeatures": [
   "Responsive Display Ads",
   "Remarketing Campaigns",
   "Audience Targeting",
   "Placement Optimization",
   "Creative A/B Testing",
   "Brand Awareness"
  ],
  "currentTech": [
   "Google Ads",
   "Google Analytics",
   "Canva",
   "Adobe Creative Suite",
   "Google Tag Manager",
   "Looker Studio"
  ]
 },
 {
  "slug": "google-search-ads",
  "name": "Google Search Ads",
  "parent": "google-ads",
  "currentShort": "Capture high-intent search traffic with expertly managed Google Search campaigns.",
  "currentFeatures": [
   "Keyword Research & Strategy",
   "Ad Copy Optimization",
   "Smart Bidding",
   "Negative Keyword Management",
   "Ad Extensions",
   "Quality Score Optimization"
  ],
  "currentTech": [
   "Google Ads",
   "Google Analytics",
   "Google Tag Manager",
   "Optmyzr",
   "SpyFu",
   "Unbounce"
  ]
 },
 {
  "slug": "google-shopping",
  "name": "Google Shopping",
  "parent": "google-ads",
  "currentShort": "Sell products directly through Google Shopping campaigns.",
  "currentFeatures": [
   "Product Feed Optimization",
   "Smart Shopping",
   "Merchant Center",
   "Bidding Strategy",
   "Audience Targeting",
   "Performance Analytics"
  ],
  "currentTech": [
   "Google Merchant Center",
   "Google Ads",
   "Feedonomics"
  ]
 },
 {
  "slug": "hubspot-implementation",
  "name": "HubSpot Implementation",
  "parent": "marketing-automation",
  "currentShort": "Implement and optimize HubSpot for marketing, sales, and service.",
  "currentFeatures": [
   "CRM Setup",
   "Marketing Hub",
   "Sales Hub",
   "Service Hub",
   "Integrations",
   "Team Training"
  ],
  "currentTech": [
   "HubSpot",
   "APIs",
   "Zapier"
  ]
 },
 {
  "slug": "influencer-marketing",
  "name": "Influencer Marketing",
  "parent": "social-media-marketing",
  "currentShort": "Partner with the right influencers to amplify your brand reach and credibility.",
  "currentFeatures": [
   "Influencer Discovery & Vetting",
   "Campaign Strategy",
   "Contract & Negotiation",
   "Content Collaboration",
   "Performance Tracking",
   "UGC Licensing"
  ],
  "currentTech": [
   "CreatorIQ",
   "AspireIQ",
   "Grin",
   "HypeAuditor",
   "Upfluence",
   "Traackr"
  ]
 },
 {
  "slug": "instagram-ads",
  "name": "Instagram Ads",
  "parent": "meta-ads",
  "currentShort": "Create visually stunning Instagram ad campaigns that drive engagement and conversions.",
  "currentFeatures": [
   "Stories & Reels Ads",
   "Feed & Explore Ads",
   "Shopping Ads",
   "Influencer Whitelisting",
   "Creative Testing",
   "Instagram Shop"
  ],
  "currentTech": [
   "Meta Ads Manager",
   "Instagram Insights",
   "Canva",
   "Adobe Creative Suite",
   "Later",
   "Dash Hudson"
  ]
 },
 {
  "slug": "international-seo",
  "name": "International SEO",
  "parent": "seo",
  "currentShort": "Expand your global reach with multi-language and multi-region SEO.",
  "currentFeatures": [
   "Hreflang Implementation",
   "Geo-targeting",
   "Multi-language SEO",
   "Local Search",
   "International Link Building",
   "Market Research"
  ],
  "currentTech": [
   "SEMrush",
   "Ahrefs",
   "Google Search Console"
  ]
 },
 {
  "slug": "landing-page-optimization",
  "name": "Landing Page Optimization",
  "parent": "cro",
  "currentShort": "Optimize landing pages for maximum conversion rates.",
  "currentFeatures": [
   "Page Analysis",
   "Copy Optimization",
   "Design Improvement",
   "Speed Optimization",
   "Form Optimization",
   "Trust Signals"
  ],
  "currentTech": [
   "Unbounce",
   "Instapage",
   "Hotjar"
  ]
 },
 {
  "slug": "link-building",
  "name": "Link Building",
  "parent": "seo",
  "currentShort": "Build high-quality backlinks that boost your domain authority and search rankings.",
  "currentFeatures": [
   "Digital PR & Outreach",
   "Guest Posting",
   "Broken Link Building",
   "Resource Page Links",
   "Competitor Analysis",
   "Link Disavow & Cleanup"
  ],
  "currentTech": [
   "Ahrefs",
   "Pitchbox",
   "BuzzStream",
   "Hunter.io",
   "SEMrush",
   "Majestic"
  ]
 },
 {
  "slug": "linkedin-lead-gen",
  "name": "LinkedIn Lead Gen",
  "parent": "linkedin-marketing",
  "currentShort": "Generate qualified B2B leads through LinkedIn outreach and ads.",
  "currentFeatures": [
   "Lead Gen Forms",
   "Targeted Outreach",
   "InMail Sequences",
   "Audience Building",
   "CRM Integration",
   "Lead Scoring"
  ],
  "currentTech": [
   "LinkedIn Sales Navigator",
   "HubSpot",
   "Lemlist"
  ]
 },
 {
  "slug": "local-seo",
  "name": "Local SEO",
  "parent": "seo",
  "currentShort": "Dominate local search results and Google Maps to drive foot traffic and local leads.",
  "currentFeatures": [
   "Google Business Profile Optimization",
   "Local Citation Building",
   "Review Management",
   "Local Keyword Targeting",
   "Map Pack Optimization",
   "Local Content Strategy"
  ],
  "currentTech": [
   "Google Business",
   "BrightLocal",
   "Moz Local",
   "Yext",
   "Google Maps",
   "Whitespark"
  ]
 },
 {
  "slug": "newsletter-design",
  "name": "Newsletter Design",
  "parent": "email-marketing",
  "currentShort": "Design beautiful, engaging email newsletters that keep your audience connected.",
  "currentFeatures": [
   "Newsletter Template Design",
   "Content Writing",
   "Responsive Design",
   "Subscriber Growth",
   "Analytics",
   "A/B Testing"
  ],
  "currentTech": [
   "Mailchimp",
   "Substack",
   "ConvertKit",
   "Beehiiv",
   "Litmus",
   "Canva"
  ]
 },
 {
  "slug": "performance-max",
  "name": "Performance Max",
  "parent": "google-ads",
  "currentShort": "Maximize conversions across all Google channels with Performance Max.",
  "currentFeatures": [
   "Cross-channel Reach",
   "AI Optimization",
   "Asset Groups",
   "Audience Signals",
   "Conversion Tracking",
   "Insights Reports"
  ],
  "currentTech": [
   "Google Ads",
   "Google Analytics",
   "Conversion Tracking"
  ]
 },
 {
  "slug": "podcast-production",
  "name": "Podcast Production",
  "parent": "content-marketing",
  "currentShort": "Create engaging podcasts with professional production, editing, and distribution.",
  "currentFeatures": [
   "Podcast Strategy & Concept",
   "Equipment & Studio Setup",
   "Recording & Remote Interviews",
   "Audio Editing & Mixing",
   "Show Notes & Transcription",
   "Distribution to All Platforms",
   "Cover Art & Branding",
   "Growth & Promotion"
  ],
  "currentTech": [
   "Riverside.fm",
   "Descript",
   "Adobe Audition",
   "Spotify for Podcasters",
   "Transistor",
   "Podbean"
  ]
 },
 {
  "slug": "salesforce-marketing-cloud",
  "name": "Salesforce Marketing Cloud",
  "parent": "marketing-automation",
  "currentShort": "Implement enterprise marketing automation with Salesforce Marketing Cloud.",
  "currentFeatures": [
   "Journey Builder",
   "Email Studio",
   "Mobile Studio",
   "Advertising Studio",
   "Data Extensions",
   "Personalization"
  ],
  "currentTech": [
   "Salesforce Marketing Cloud",
   "AMPscript",
   "SQL"
  ]
 },
 {
  "slug": "social-commerce",
  "name": "Social Commerce",
  "parent": "social-media-marketing",
  "currentShort": "Sell products directly through social media platforms.",
  "currentFeatures": [
   "Shop Setup",
   "Product Tagging",
   "Shoppable Posts",
   "Live Shopping",
   "Checkout Integration",
   "Performance Analytics"
  ],
  "currentTech": [
   "Instagram Shop",
   "Facebook Shop",
   "TikTok Shop"
  ]
 },
 {
  "slug": "social-media-integration",
  "name": "Social Media Integration",
  "parent": "digital-marketing",
  "currentShort": "Integrate social login, sharing, and APIs from major social platforms.",
  "currentFeatures": [
   "Social Login (OAuth)",
   "Share Buttons & Cards",
   "Content Publishing APIs",
   "Social Analytics",
   "User Profile Import",
   "Comments Integration",
   "Social Proof Widgets",
   "Influencer Tools"
  ],
  "currentTech": [
   "Facebook Graph API",
   "Twitter API",
   "Instagram API",
   "OAuth 2.0"
  ]
 },
 {
  "slug": "social-media-management",
  "name": "Social Media Management",
  "parent": "social-media-marketing",
  "currentShort": "Full-service social media management with content creation, scheduling, and community engagement.",
  "currentFeatures": [
   "Content Calendar Management",
   "Post Creation & Scheduling",
   "Community Engagement",
   "Brand Voice Consistency",
   "Monthly Analytics",
   "Crisis Management"
  ],
  "currentTech": [
   "Hootsuite",
   "Buffer",
   "Canva",
   "Later",
   "Sprout Social",
   "Notion"
  ]
 },
 {
  "slug": "technical-seo",
  "name": "Technical SEO",
  "parent": "seo",
  "currentShort": "Fix technical issues that prevent search engines from crawling and indexing your site effectively.",
  "currentFeatures": [
   "Site Speed Optimization",
   "Crawl Budget Optimization",
   "Structured Data/Schema",
   "Core Web Vitals",
   "XML Sitemap Management",
   "Canonical & Redirect Audits"
  ],
  "currentTech": [
   "Screaming Frog",
   "Google Search Console",
   "PageSpeed Insights",
   "Ahrefs",
   "Schema.org",
   "GTmetrix"
  ]
 },
 {
  "slug": "tiktok-ads",
  "name": "TikTok Ads",
  "parent": null,
  "currentShort": "Reach Gen Z and Millennials with viral TikTok ad campaigns.",
  "currentFeatures": [
   "In-Feed & Spark Ads",
   "Branded Hashtag Challenges",
   "TikTok Shop Integration",
   "Creator Partnerships",
   "Video Creative Production",
   "Audience Targeting & Optimization"
  ],
  "currentTech": [
   "TikTok Ads Manager",
   "CapCut",
   "TikTok Creative Center",
   "Adobe Premiere",
   "TikTok Pixel",
   "Pentos"
  ]
 },
 {
  "slug": "tiktok-content",
  "name": "TikTok Content",
  "parent": "tiktok-marketing",
  "currentShort": "Create engaging TikTok content that resonates with your audience.",
  "currentFeatures": [
   "Trend Research",
   "Video Production",
   "Sound Selection",
   "Caption Writing",
   "Hashtag Strategy",
   "Posting Schedule"
  ],
  "currentTech": [
   "CapCut",
   "TikTok",
   "Canva"
  ]
 },
 {
  "slug": "tiktok-shop",
  "name": "TikTok Shop",
  "parent": "tiktok-marketing",
  "currentShort": "Sell products directly on TikTok with TikTok Shop integration.",
  "currentFeatures": [
   "Shop Setup",
   "Product Listings",
   "Live Shopping",
   "Affiliate Program",
   "Order Management",
   "Performance Analytics"
  ],
  "currentTech": [
   "TikTok Shop",
   "E-commerce",
   "Analytics"
  ]
 },
 {
  "slug": "trendyol-ads",
  "name": "Trendyol Ads",
  "parent": "marketplace-ads",
  "currentShort": "Advertise on Trendyol to reach millions of Turkish shoppers.",
  "currentFeatures": [
   "Sponsored Products",
   "Brand Campaigns",
   "Keyword Optimization",
   "Budget Management",
   "Performance Tracking",
   "Competitor Analysis"
  ],
  "currentTech": [
   "Trendyol Seller Center",
   "Analytics"
  ]
 },
 {
  "slug": "ux-analytics",
  "name": "UX Analytics",
  "parent": "cro",
  "currentShort": "Understand user behavior with heatmaps, recordings, and analytics.",
  "currentFeatures": [
   "Heatmaps",
   "Session Recordings",
   "Click Analysis",
   "Scroll Depth",
   "Form Analytics",
   "User Surveys"
  ],
  "currentTech": [
   "Hotjar",
   "FullStory",
   "Clarity",
   "Heap"
  ]
 },
 {
  "slug": "video-marketing",
  "name": "Video Marketing",
  "parent": "content-marketing",
  "currentShort": "Produce compelling video content for marketing, training, and brand storytelling.",
  "currentFeatures": [
   "Video Strategy & Planning",
   "Explainer Video Production",
   "Product Demo Videos",
   "Social Media Video Content",
   "Brand Documentaries",
   "Video SEO & YouTube Optimization",
   "Video Advertising",
   "Analytics & Performance Tracking"
  ],
  "currentTech": [
   "Adobe Premiere",
   "After Effects",
   "DaVinci Resolve",
   "YouTube Studio",
   "Vimeo",
   "Wistia"
  ]
 },
 {
  "slug": "video-production-marketing",
  "name": "Video Production & Marketing",
  "parent": "content-marketing",
  "currentShort": "Produce professional marketing videos that tell your story and drive engagement.",
  "currentFeatures": [
   "Brand Videos",
   "Product Demos",
   "Testimonials",
   "Social Media Clips",
   "Educational Content",
   "Video SEO"
  ],
  "currentTech": [
   "Adobe Premiere",
   "After Effects",
   "DaVinci Resolve",
   "Final Cut Pro",
   "YouTube Studio",
   "Wistia"
  ]
 },
 {
  "slug": "whatsapp-business-api",
  "name": "WhatsApp Business API",
  "parent": "whatsapp-marketing",
  "currentShort": "Integrate WhatsApp Business API for automated messaging at scale.",
  "currentFeatures": [
   "API Integration",
   "Template Approval",
   "Webhook Setup",
   "Multi-agent Support",
   "Message Queuing",
   "Delivery Reports"
  ],
  "currentTech": [
   "WhatsApp Cloud API",
   "Meta Business",
   "Node.js",
   "REST APIs"
  ]
 },
 {
  "slug": "whatsapp-campaigns",
  "name": "WhatsApp Campaigns",
  "parent": "whatsapp-marketing",
  "currentShort": "Create and manage WhatsApp broadcast campaigns for maximum engagement.",
  "currentFeatures": [
   "Broadcast Lists",
   "Template Design",
   "Audience Segmentation",
   "A/B Testing",
   "Scheduling",
   "Performance Analytics"
  ],
  "currentTech": [
   "WhatsApp API",
   "Analytics",
   "CRM"
  ]
 },
 {
  "slug": "whatsapp-commerce",
  "name": "WhatsApp Commerce",
  "parent": "whatsapp-marketing",
  "currentShort": "Enable shopping and transactions directly within WhatsApp.",
  "currentFeatures": [
   "Product Catalogs",
   "In-Chat Checkout",
   "Payment Integration",
   "Order Tracking",
   "Cart Abandonment",
   "Upselling Automation"
  ],
  "currentTech": [
   "WhatsApp Catalog",
   "Stripe",
   "Shopify"
  ]
 },
 {
  "slug": "youtube-ads",
  "name": "YouTube Ads",
  "parent": "google-ads",
  "currentShort": "Reach engaged audiences with compelling YouTube video ad campaigns.",
  "currentFeatures": [
   "TrueView In-Stream Ads",
   "Bumper Ads",
   "Discovery Ads",
   "Video Creative Production",
   "Audience Targeting",
   "Conversion Tracking"
  ],
  "currentTech": [
   "Google Ads",
   "YouTube Studio",
   "Adobe Premiere",
   "Google Analytics",
   "TubeBuddy",
   "VidIQ"
  ]
 }
]
```

