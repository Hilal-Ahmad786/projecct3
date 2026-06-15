# TASK — Translate 4 PakSoft services into 4 languages (tr, de, ur, ar)

You are a professional translator and B2B technology copywriter for **PakSoft** (paksoft.com.tr). These 4 services have complete ENGLISH content but are missing their translations. Translate EACH service's full content into **Turkish (tr), German (de), Urdu (ur), Arabic (ar)** — 4 languages. (English already exists; do NOT output English.)

## OUTPUT FORMAT — STRICT
Return ONE JSON object. Keys = the exact slugs. Each value has the 4 locale keys, each a full content object mirroring the English structure:

```
{
  "<slug>": {
    "tr": { "name","shortDescription","fullDescription","features":[8],"benefits":[6],
            "metaTitle","metaDescription",
            "content": { "process":[6 {step,title,description}], "faq":[8 {question,answer}], "technologies":[{name,icon}] } },
    "de": { ...same... }, "ur": { ...same... }, "ar": { ...same... }
  }
}
```

Rules:
- Translate ALL fields: name, shortDescription, fullDescription, every feature (8), every benefit (6), metaTitle (≤60 chars, end "| PakSoft"), metaDescription (140-160 chars), all 6 process steps (title + description), all 8 FAQ Q&As, and technologies (copy `name`/`icon` unchanged — tool names stay as-is).
- Real, natural translations that read fluently to native speakers — NOT transliteration. Urdu and Arabic must read naturally in RTL.
- Keep tool/framework/product names and acronyms in Latin script (Stripe, LinkedIn, WCAG, nginx, PCI, API, SEO, etc.).
- Preserve meaning, numbers, and technical accuracy exactly. Keep the same number of items per array.
- Output COMPLETE services only; do as many as fit, I'll say "continue" for the rest. Valid JSON only — double quotes, no trailing commas, no markdown fences.

## SOURCE — English content to translate (4 services)
```json
{
 "linkedin-ads": {
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
    "question": "Is LinkedIn worth the high CPCs compared to Google or Meta?",
    "answer": "For B2B with deal sizes above roughly $5k, usually yes — you're paying more per click for dramatically better audience quality, reaching specific titles at specific companies. The math is simple: a $15 CPC that produces real pipeline beats a $2 CPC that produces students and job seekers. We model break-even cost-per-opportunity with you before launching."
   },
   {
    "question": "What budget do we need to start?",
    "answer": "We recommend at least $2,500–4,000/month in ad spend for a meaningful test — enough for LinkedIn's delivery system to exit the learning phase and for statistically useful lead volume. Below that, budget concentrates on one tight audience and a single offer rather than spreading thin."
   },
   {
    "question": "Lead Gen Forms or landing pages — which is better?",
    "answer": "Lead Gen Forms typically convert 2–4x better because they pre-fill profile data, making them ideal for top-of-funnel offers like guides and webinars. Landing pages produce higher-intent leads for demo and pricing requests. We usually run both, matched to funnel stage, and let your CRM data decide the mix."
   },
   {
    "question": "How quickly will we see qualified leads?",
    "answer": "First leads typically arrive within 1–2 weeks of launch; judging lead quality through your sales process takes 4–8 weeks depending on your sales cycle. We set this expectation up front: LinkedIn is a pipeline-building channel, not a same-week-revenue channel."
   },
   {
    "question": "Can you target specific companies on our wishlist (ABM)?",
    "answer": "Yes — named account lists are LinkedIn's standout capability. We upload your target accounts, layer title and seniority filters on top, and run per-segment messaging. Combined with retargeting, this keeps your solution in front of a buying committee throughout long deal cycles."
   },
   {
    "question": "Do you create the ad creative or just manage the campaigns?",
    "answer": "Both. Creative is included: copywriting, static design, document ads, and short video edits — produced for a professional feed where useful insight outperforms hard selling. Client-supplied creative is welcome too; we'll tell you honestly what we expect to work and test it against ours."
   },
   {
    "question": "How do you measure success beyond clicks and form fills?",
    "answer": "We track leads into your CRM and report on what matters commercially: marketing-qualified leads, opportunities created, pipeline value, and closed revenue per campaign. Offline conversion uploads feed deal outcomes back into LinkedIn, which improves its optimization too."
   },
   {
    "question": "Our previous LinkedIn campaigns produced junk leads. What would you do differently?",
    "answer": "Junk leads usually trace to three causes: audiences too broad, offers misaligned with funnel stage, and optimizing for cheap form fills instead of CRM outcomes. We fix the audience definition first, match offers to intent, add qualifying friction where needed, and judge every ad by what your sales team reports back."
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
 },
 "presentation-design": {
  "name": "Presentation Design",
  "shortDescription": "Decks that win the room. We turn dense content into clear, branded, visually compelling presentations for investor pitches, enterprise sales, conferences, and internal communication.",
  "fullDescription": "A great idea presented badly loses to a mediocre idea presented well — investors, buyers, and executives decide in minutes. We design presentations the way product teams design interfaces: starting from the audience and the single action you want them to take, then structuring the narrative, visualizing the data, and crafting slides that look unmistakably like your brand. The deliverable isn't just a finished deck; it's a fully editable master file with a reusable template system, so your team can produce on-brand presentations for months without a designer. From a 10-slide seed pitch to a 120-slide enterprise sales library, we make complex stories effortless to follow.",
  "features": [
   "Investor Pitch Decks (Pre-seed to Series C)",
   "Enterprise Sales & Proposal Decks",
   "Conference Keynotes & Webinar Slides",
   "Narrative Structure & Storyboarding",
   "Data Visualization & Infographics",
   "Branded Master Templates & Slide Libraries",
   "Motion & Slide Transitions (Keynote/PPT)",
   "Speaker Notes & Delivery Coaching Support"
  ],
  "benefits": [
   "Higher close rates in pitches and sales meetings",
   "A clear story instead of a wall of bullet points",
   "Data that audiences understand at a glance",
   "Consistent branding across every team's decks",
   "Editable templates that save hours every week",
   "Confidence on stage — the slides carry their weight"
  ],
  "process": [
   {
    "step": 1,
    "title": "Audience & Goal Briefing",
    "description": "We start with who is in the room and what decision you need from them — an investment, a contract, an approval. That single goal becomes the filter for every slide that follows; anything that doesn't serve it gets cut."
   },
   {
    "step": 2,
    "title": "Content Audit & Narrative",
    "description": "We review your existing material and restructure it into a storyline with a clear arc: problem, stakes, solution, proof, ask. You approve the storyboard as plain text before any visual work begins, which keeps revisions cheap."
   },
   {
    "step": 3,
    "title": "Visual Concept",
    "description": "We design 3–5 concept slides that establish the visual language — typography, color usage, image style, and chart system — aligned with your brand guidelines. One round of feedback locks the direction before full production."
   },
   {
    "step": 4,
    "title": "Full Deck Production",
    "description": "Every slide is designed by hand: data turned into honest, readable charts, dense paragraphs into visual frameworks, and key moments given room to breathe. We design for the back row, not the laptop screen."
   },
   {
    "step": 5,
    "title": "Revisions & Polish",
    "description": "Two structured revision rounds are included, with consolidated feedback to keep momentum. We fine-tune pacing, transitions, and builds so the deck supports a live speaker rather than competing with one."
   },
   {
    "step": 6,
    "title": "Handover & Template System",
    "description": "You receive fully editable source files plus a master template with reusable layouts, chart styles, and icon library. Your team can extend the deck for months while staying perfectly on-brand."
   }
  ],
  "faq": [
   {
    "question": "Can you work from our rough notes, or do we need finished content?",
    "answer": "Rough notes are fine — most clients hand us a messy draft, a recording, or bullet points. We help structure the messaging as part of the narrative phase. What we don't do is invent your business facts: numbers, claims, and strategy come from you, clarity comes from us."
   },
   {
    "question": "Which tools do you deliver in — PowerPoint, Keynote, or Google Slides?",
    "answer": "All three, plus Figma for design-stage review. We build in the tool your team actually presents and edits in, with fonts and masters set up correctly so nothing breaks on another machine. Canva templates are available on request."
   },
   {
    "question": "How long does a typical deck take?",
    "answer": "A 10–15 slide investor deck typically takes 1–2 weeks including two revision rounds. Larger sales libraries or conference keynotes run 3–4 weeks. Rush delivery within 3–4 business days is possible for an expedite fee, subject to availability."
   },
   {
    "question": "What does a pitch deck cost?",
    "answer": "Pricing depends on slide count, data-visualization density, and whether a reusable template system is included. A focused investor deck starts in the low four figures; enterprise template systems are quoted per scope. Every quote is fixed-price after the briefing — no hourly surprises."
   },
   {
    "question": "Do you design the charts from our raw data?",
    "answer": "Yes — send us the spreadsheet. We choose the right chart for the point being made, strip the clutter, and highlight the takeaway. Honest visualization matters: we make your numbers clear and compelling without distorting them."
   },
   {
    "question": "Can you match our existing brand guidelines?",
    "answer": "Strictly. We work from your brand book — typography, color, logo usage, photography style — and extend it where presentation-specific rules are missing. If you have no guidelines yet, we establish a lightweight presentation style that won't conflict with future branding."
   },
   {
    "question": "Do you also create reusable templates our team can use?",
    "answer": "Yes, and we recommend it. The master template includes layout variants, pre-styled charts, icon libraries, and editing guidance, so non-designers produce consistent decks. Teams typically save several hours per presentation after the handover."
   },
   {
    "question": "Is our confidential information safe with you?",
    "answer": "We sign NDAs before seeing any material and work under strict access control — pitch decks routinely contain unreleased financials and strategy. Files are exchanged through a private workspace, and we never reference confidential work in our portfolio without written permission."
   }
  ],
  "technologies": [
   {
    "icon": "powerpoint",
    "name": "PowerPoint"
   },
   {
    "icon": "keynote",
    "name": "Keynote"
   },
   {
    "icon": "googleslides",
    "name": "Google Slides"
   },
   {
    "icon": "figma",
    "name": "Figma"
   },
   {
    "icon": "illustrator",
    "name": "Illustrator"
   },
   {
    "icon": "canva",
    "name": "Canva"
   },
   {
    "icon": "flourish",
    "name": "Flourish"
   },
   {
    "icon": "aftereffects",
    "name": "After Effects"
   }
  ]
 },
 "accessibility-compliance": {
  "name": "Accessibility Compliance",
  "shortDescription": "Make your product usable by everyone and defensible in court. We audit against WCAG 2.1/2.2, remediate issues at the code level, and build accessibility into your team's workflow.",
  "fullDescription": "Over a billion people live with a disability, and regulators have caught up: the ADA in the US, the European Accessibility Act, and equivalent laws worldwide now make inaccessible websites a legal liability as well as a lost market. We run combined automated and manual audits against WCAG 2.1/2.2 — including real screen-reader and keyboard-only testing — then fix the issues in your actual codebase rather than handing you a PDF of problems. Beyond remediation, we set up automated accessibility checks in your CI pipeline and train your team, so the product you ship next quarter doesn't regress to where it started. Accessible products are also simply better products: clearer structure, better SEO, and improved usability for every user.",
  "features": [
   "WCAG 2.1 / 2.2 AA & AAA Audits",
   "Screen Reader Testing (NVDA, JAWS, VoiceOver)",
   "Keyboard-Only Navigation Review",
   "Color Contrast & Visual Design Analysis",
   "Semantic HTML & ARIA Remediation",
   "Accessible Forms, Modals & Live Regions",
   "CI-Integrated Automated Testing",
   "VPAT / Conformance Reporting & Team Training"
  ],
  "benefits": [
   "Legal protection under ADA, EAA, and Section 508",
   "Access to the 1+ billion users with disabilities",
   "Better SEO — semantic structure helps crawlers too",
   "Improved usability and conversions for all users",
   "Documented conformance for enterprise procurement",
   "A team that ships accessible features by default"
  ],
  "process": [
   {
    "step": 1,
    "title": "Automated & Manual Audit",
    "description": "We scan every template with axe and Lighthouse, then go far beyond the ~30% of issues automation can catch: manual testing with NVDA, VoiceOver, keyboard-only navigation, and zoom up to 400%. Every issue is logged with its WCAG criterion, severity, and affected user group."
   },
   {
    "step": 2,
    "title": "Prioritization & Plan",
    "description": "Issues are ranked by user impact and legal risk — blockers that prevent task completion come first, cosmetic contrast issues later. You get a remediation roadmap your team can budget against, not an undifferentiated list of 400 violations."
   },
   {
    "step": 3,
    "title": "Code-Level Remediation",
    "description": "We fix issues in your repository: semantic HTML structure, correct ARIA usage, focus management, skip links, and accessible form patterns. Where a design itself is the barrier, we propose accessible alternatives that preserve the visual intent."
   },
   {
    "step": 4,
    "title": "Assistive Technology Verification",
    "description": "Every fix is re-tested with real assistive technologies across browser/screen-reader combinations, not just automated scanners. We verify complete user journeys — register, search, purchase — not isolated components."
   },
   {
    "step": 5,
    "title": "Automation & CI Integration",
    "description": "We wire axe-core checks into your CI pipeline and pull-request workflow so new code is tested before it merges. Regressions get caught in review, not in a lawsuit."
   },
   {
    "step": 6,
    "title": "Training & Conformance Docs",
    "description": "Your designers and developers get hands-on training with the patterns that matter for your product. We deliver a VPAT or conformance statement suitable for enterprise procurement and legal review."
   }
  ],
  "faq": [
   {
    "question": "What WCAG level do I actually need?",
    "answer": "WCAG 2.1 Level AA is the standard referenced by the ADA, the European Accessibility Act, and Section 508 — it's the right target for almost every organization. Level AAA is stricter and typically applied selectively to critical flows rather than entire sites."
   },
   {
    "question": "Is an automated scan enough for compliance?",
    "answer": "No. Automated tools catch roughly 30% of WCAG issues — they can't judge whether alt text is meaningful, whether focus order makes sense, or whether a screen-reader user can complete checkout. Real compliance requires manual testing with assistive technologies, which is the core of our audits."
   },
   {
    "question": "How long does remediation take?",
    "answer": "A typical marketing site takes 2–4 weeks from audit to verified fixes; complex web applications run 6–12 weeks depending on the issue count and your release process. We can also work incrementally alongside your team's normal sprint cycle."
   },
   {
    "question": "Will accessibility changes affect my design?",
    "answer": "Mostly no — the majority of fixes are structural (semantic HTML, ARIA, focus management) and invisible. Where visual changes are needed, usually color contrast, we adjust within your brand palette and bring options to your designers rather than imposing changes."
   },
   {
    "question": "What is the European Accessibility Act and does it apply to me?",
    "answer": "The EAA has applied since June 2025 to e-commerce, banking, transport, and other consumer-facing digital services sold in the EU — regardless of where your company is based. If EU customers can buy from you online, it almost certainly applies to you."
   },
   {
    "question": "Can you provide a VPAT for enterprise sales?",
    "answer": "Yes. We produce VPAT 2.x / ACR documents based on actual test results, which enterprise and government buyers increasingly require during procurement. An honest, detailed VPAT is also a sales asset — it shows buyers you take conformance seriously."
   },
   {
    "question": "How do we keep the site accessible after the project?",
    "answer": "Three mechanisms: automated checks in your CI pipeline that block regressions, team training so accessible patterns become the default, and an optional quarterly re-audit covering new features. Accessibility is a practice, not a one-time certificate."
   },
   {
    "question": "Does accessibility really help SEO?",
    "answer": "Yes, substantially. Semantic headings, descriptive alt text, proper landmarks, and clean link text are exactly what search crawlers use to understand your pages. Accessibility work routinely improves Lighthouse SEO scores and rich-result eligibility as a side effect."
   }
  ],
  "technologies": [
   {
    "icon": "axe",
    "name": "axe-core"
   },
   {
    "icon": "lighthouse",
    "name": "Lighthouse"
   },
   {
    "icon": "nvda",
    "name": "NVDA"
   },
   {
    "icon": "voiceover",
    "name": "VoiceOver"
   },
   {
    "icon": "jaws",
    "name": "JAWS"
   },
   {
    "icon": "wave",
    "name": "WAVE"
   },
   {
    "icon": "pa11y",
    "name": "Pa11y CI"
   },
   {
    "icon": "storybook",
    "name": "Storybook a11y"
   }
  ]
 },
 "server-optimization": {
  "name": "Server Optimization",
  "shortDescription": "Faster responses from the servers you already pay for. We profile, tune, and re-architect server infrastructure to cut latency and cloud spend — often 30–50% of both — without buying bigger machines.",
  "fullDescription": "Most servers run at a fraction of their potential: default configurations, missing caches, unindexed queries, and oversized instances quietly burn money and milliseconds. We start by measuring — profiling your stack under real load to find where time and budget actually go — then tune in order of impact: web server and kernel configuration, database queries and connection pooling, caching layers from Redis to CDN, and finally right-sizing and autoscaling policies. The result is a system that responds faster under heavier load while costing less to run. Everything we change is benchmarked before and after, documented, and load-tested, so you get verified numbers rather than promises — and a runbook your team can operate confidently.",
  "features": [
   "Full-Stack Performance Profiling",
   "Web Server & Kernel Tuning (nginx, Linux)",
   "Database Query & Index Optimization",
   "Caching Architecture (Redis, Varnish, CDN)",
   "Load Balancing & Connection Pooling",
   "Autoscaling & Instance Right-Sizing",
   "Load Testing & Capacity Planning",
   "Monitoring, Alerting & Runbooks"
  ],
  "benefits": [
   "30–50% lower response times on typical workloads",
   "Cloud bills cut by removing oversized resources",
   "Survives traffic spikes that used to cause outages",
   "Verified before/after benchmarks, not estimates",
   "Capacity planning grounded in real load data",
   "A documented setup your team can maintain"
  ],
  "process": [
   {
    "step": 1,
    "title": "Baseline & Profiling",
    "description": "We instrument your stack and measure real traffic: response-time percentiles, slow queries, cache hit rates, CPU/memory/IO saturation, and cost per request. This baseline is the contract every later change is judged against."
   },
   {
    "step": 2,
    "title": "Bottleneck Analysis",
    "description": "Profiling data tells us where the time actually goes — it's rarely where teams assume. We rank findings by impact-per-effort, so a missing database index gets fixed before anyone debates a re-architecture."
   },
   {
    "step": 3,
    "title": "Configuration Tuning",
    "description": "We tune the layers you already run: nginx workers and buffers, kernel network parameters, PHP-FPM/Node pools, database memory and connection settings. These zero-cost changes often deliver the largest single gains."
   },
   {
    "step": 4,
    "title": "Caching & Architecture",
    "description": "We add or repair caching at the right layers — Redis for hot data, Varnish or CDN for full pages, HTTP cache headers done correctly. Where architecture is the limit, we introduce load balancing, read replicas, or queue-based offloading."
   },
   {
    "step": 5,
    "title": "Load Testing & Validation",
    "description": "Every change is validated under simulated production load with k6 or Locust, against the original baseline. You get a before/after report with the exact latency, throughput, and cost numbers achieved."
   },
   {
    "step": 6,
    "title": "Monitoring & Handover",
    "description": "We leave you with dashboards, alert thresholds tied to user experience, autoscaling policies, and runbooks for the most likely incidents. Optional quarterly reviews keep performance from drifting as the product grows."
   }
  ],
  "faq": [
   {
    "question": "How much improvement can we realistically expect?",
    "answer": "Typical engagements cut p95 response times by 30–50% and reduce infrastructure spend meaningfully, because most systems run on defaults with key caches missing. We profile first; if your stack is already well-tuned and gains would be small, we tell you that before you commit."
   },
   {
    "question": "Do you work with cloud, on-premise, or both?",
    "answer": "Both. We optimize AWS, Google Cloud, Azure, and Hetzner setups as well as traditional dedicated servers and VPS hosts. On cloud, cost optimization (right-sizing, reserved capacity, storage tiers) is part of the engagement; on-premise, the focus shifts to squeezing maximum throughput from fixed hardware."
   },
   {
    "question": "Will there be downtime during optimization?",
    "answer": "Configuration changes are applied with rolling restarts or during agreed low-traffic windows, and every change has a tested rollback. Riskier architectural changes are rehearsed on a staging replica first. In practice, engagements complete with zero unplanned downtime."
   },
   {
    "question": "Our database is the slow part — is that in scope?",
    "answer": "Yes, the database is usually the main event: slow-query analysis, indexing strategy, connection pooling, memory configuration, and read replicas for PostgreSQL, MySQL, and MongoDB. Many 'server' problems turn out to be one unindexed query that profiling exposes in the first week."
   },
   {
    "question": "Can you reduce our cloud bill without hurting performance?",
    "answer": "Usually we improve both at once: oversized instances get right-sized, idle resources removed, storage moved to appropriate tiers, and caching reduces the compute you need at all. Verified results across engagements commonly land at 20–40% cost reduction with equal or better latency."
   },
   {
    "question": "How do you prove the improvements are real?",
    "answer": "With identical load tests run against the pre-change baseline and the final system, plus production monitoring over an agreed verification window. The final report shows latency percentiles, throughput, error rates, and monthly cost side by side — numbers your CFO and CTO can both read."
   },
   {
    "question": "What access do you need, and how is it secured?",
    "answer": "Read-only monitoring access for profiling, then scoped deployment access for the changes we agree on — via your VPN, bastion host, or temporary IAM roles that you control and revoke. All changes go through your review process; nothing lands on production unilaterally."
   },
   {
    "question": "How do we keep performance from degrading again?",
    "answer": "The handover includes dashboards and alerts tied to user-facing thresholds, capacity projections, and runbooks. Performance budgets in CI can block regressions before deploy, and optional quarterly reviews re-check the system as traffic and features grow."
   }
  ],
  "technologies": [
   {
    "icon": "nginx",
    "name": "nginx"
   },
   {
    "icon": "redis",
    "name": "Redis"
   },
   {
    "icon": "varnish",
    "name": "Varnish"
   },
   {
    "icon": "postgresql",
    "name": "PostgreSQL"
   },
   {
    "icon": "cloudflare",
    "name": "Cloudflare"
   },
   {
    "icon": "grafana",
    "name": "Grafana"
   },
   {
    "icon": "prometheus",
    "name": "Prometheus"
   },
   {
    "icon": "k6",
    "name": "k6"
   }
  ]
 }
}
```

Begin. Output only the JSON object of translations.
