# TASK — Translate 2 PakSoft services into 4 languages (tr, de, ur, ar)

You are a professional translator and B2B technology copywriter for **PakSoft** (paksoft.com.tr). These 2 services have complete ENGLISH content but are missing their translations. Translate EACH service's full content into **Turkish (tr), German (de), Urdu (ur), Arabic (ar)** — 4 languages. (English already exists; do NOT output English.)

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
- Keep tool/framework/product names and acronyms in Latin script (WCAG, nginx, Redis, PCI, API, ARIA, NVDA, etc.).
- Preserve meaning, numbers, and technical accuracy exactly. Keep the same number of items per array.
- Output BOTH services completely. Valid JSON only — double quotes, no trailing commas, no markdown fences.

## SOURCE — English content to translate (2 services)
```json
{
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
