# TASK — Write enriched, multilingual content for PakSoft Infrastructure & DevOps services

You are an expert B2B technology copywriter AND a professional translator working for **PakSoft** (paksoft.com.tr), a software development agency based in Türkiye with Pakistani/South-Asian roots, serving clients in **5 languages**.

Your job: write deep, specific, conversion-focused content for each Infrastructure & DevOps service listed in the **SERVICES TO WRITE** section at the bottom. Every service must be written in ALL FIVE languages: English (`en`), Turkish (`tr`), German (`de`), Urdu (`ur`), Arabic (`ar`).

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

This is one finished Infrastructure & DevOps service (`ci-cd-pipelines`), straight from our database. Your output for every service must reach this level in all five languages.

```json
{
  "slug": "ci-cd-pipelines",
  "en": {
    "name": "CI/CD Pipelines",
    "shortDescription": "Automate your build, test, and deployment process for faster, reliable releases.",
    "fullDescription": "Ship code faster with automated CI/CD pipelines that build, test, and deploy automatically.",
    "features": [
      "Pipeline Design",
      "Automated Testing",
      "Multi-Environment Deploys",
      "Rollback Strategies",
      "Security Scanning",
      "Monitoring"
    ],
    "benefits": [
      "Faster releases",
      "Fewer failures",
      "Consistent deploys",
      "Early bug detection"
    ],
    "content": {
      "process": [
        {
          "step": 1,
          "title": "Assessment",
          "description": "Evaluate current process and bottlenecks."
        },
        {
          "step": 2,
          "title": "Design",
          "description": "Design pipeline stages with proper gates."
        },
        {
          "step": 3,
          "title": "Implementation",
          "description": "Build with tests, security, and deployments."
        },
        {
          "step": 4,
          "title": "Optimization",
          "description": "Optimize speed and add monitoring."
        }
      ],
      "faq": [
        {
          "answer": "GitHub Actions, GitLab CI, or Jenkins based on your ecosystem.",
          "question": "Which CI/CD tool?"
        },
        {
          "answer": "Target under 15 minutes commit to production.",
          "question": "Deploy speed?"
        },
        {
          "answer": "Blue-green, canary, automated rollback on errors.",
          "question": "Rollbacks?"
        },
        {
          "answer": "Yes, incrementally add CI/CD without disruption.",
          "question": "Existing projects?"
        }
      ],
      "technologies": [
        {
          "icon": "github",
          "name": "GitHub Actions"
        },
        {
          "icon": "gitlab",
          "name": "GitLab CI"
        },
        {
          "icon": "jenkins",
          "name": "Jenkins"
        },
        {
          "icon": "argocd",
          "name": "ArgoCD"
        },
        {
          "icon": "docker",
          "name": "Docker"
        },
        {
          "icon": "terraform",
          "name": "Terraform"
        }
      ]
    }
  },
  "tr": {
    "name": "CI/CD Boru Hatları",
    "shortDescription": "Son teknoloji çözümlerle işletmenizi güçlendirin. Uzman ekibimiz, ihtiyaçlarınıza özel yenilikçi sonuçlar sunar.",
    "fullDescription": "Otomatik derleme, test ve dağıtım süreçleriyle sürekli entegrasyon ve dağıtım kurun.",
    "features": [
      "Pipeline Tasarım",
      "Otomatik Test",
      "Multi-Environment Deploys",
      "Rollback Strategies",
      "Güvenlik Scanning",
      "İzleme"
    ],
    "benefits": [
      "Hızlıer releases",
      "Fewer failures",
      "Consistent deploys",
      "Early bug detection"
    ],
    "metaTitle": "CI/CD Boru Hatları | PakSoft",
    "metaDescription": "Son teknoloji çözümlerle işletmenizi güçlendirin. Uzman ekibimiz, ihtiyaçlarınıza özel yenilikçi sonuçlar sunar.",
    "content": {
      "process": [
        {
          "step": 1,
          "title": "Değerlendirme",
          "description": "Evaluate current process and bottlenecks."
        },
        {
          "step": 2,
          "title": "Tasarım",
          "description": "Kullanıcı merkezli tasarımlar oluşturuyoruz."
        },
        {
          "step": 3,
          "title": "Uygulama",
          "description": "Çözümü sistematik olarak uyguluyoruz."
        },
        {
          "step": 4,
          "title": "Optimizasyon",
          "description": "Optimize speed and add monitoring."
        }
      ],
      "faq": [
        {
          "answer": "GitHub Actions, GitLab CI, or Jenkins based on your ecosystem.",
          "question": "Which CI/CD tool?"
        },
        {
          "answer": "Target under 15 minutes commit to production.",
          "question": "Deploy speed?"
        },
        {
          "answer": "Blue-green, canary, automated rollback on errors.",
          "question": "Rollbacks?"
        },
        {
          "answer": "Yes, incrementally add CI/CD without disruption.",
          "question": "Existing projects?"
        }
      ],
      "technologies": [
        {
          "icon": "github",
          "name": "GitHub Actions"
        },
        {
          "icon": "gitlab",
          "name": "GitLab CI"
        },
        {
          "icon": "jenkins",
          "name": "Jenkins"
        },
        {
          "icon": "argocd",
          "name": "ArgoCD"
        },
        {
          "icon": "docker",
          "name": "Docker"
        },
        {
          "icon": "terraform",
          "name": "Terraform"
        }
      ]
    }
  },
  "de": {
    "name": "CI/CD-Pipelines",
    "shortDescription": "Stärken Sie Ihr Unternehmen mit modernsten Lösungen. Unser Expertenteam liefert innovative Ergebnisse, die auf Ihre Bedürfnisse zugeschnitten sind.",
    "fullDescription": "Richten Sie kontinuierliche Integration und Bereitstellung mit automatisierten Build-, Test- und Deployment-Pipelines ein.",
    "features": [
      "Pipeline Design",
      "Automatisiert Testen",
      "Multi-Environment Deploys",
      "Rollback Strategies",
      "Sicherheit Scanning",
      "Überwachung"
    ],
    "benefits": [
      "Schneller releases",
      "Fewer failures",
      "Consistent deploys",
      "Early bug detection"
    ],
    "metaTitle": "CI/CD-Pipelines | PakSoft",
    "metaDescription": "Stärken Sie Ihr Unternehmen mit modernsten Lösungen. Unser Expertenteam liefert innovative Ergebnisse, die auf Ihre Bedürfnisse zugeschnitten sind.",
    "content": {
      "process": [
        {
          "step": 1,
          "title": "Bewertung",
          "description": "Evaluate current process and bottlenecks."
        },
        {
          "step": 2,
          "title": "Design",
          "description": "Wir erstellen benutzerorientierte Designs."
        },
        {
          "step": 3,
          "title": "Implementierung",
          "description": "Wir implementieren die Lösung systematisch."
        },
        {
          "step": 4,
          "title": "Optimierung",
          "description": "Optimize speed and add monitoring."
        }
      ],
      "faq": [
        {
          "answer": "GitHub Actions, GitLab CI, or Jenkins based on your ecosystem.",
          "question": "Which CI/CD tool?"
        },
        {
          "answer": "Target under 15 minutes commit to production.",
          "question": "Deploy speed?"
        },
        {
          "answer": "Blue-green, canary, automated rollback on errors.",
          "question": "Rollbacks?"
        },
        {
          "answer": "Yes, incrementally add CI/CD without disruption.",
          "question": "Existing projects?"
        }
      ],
      "technologies": [
        {
          "icon": "github",
          "name": "GitHub Actions"
        },
        {
          "icon": "gitlab",
          "name": "GitLab CI"
        },
        {
          "icon": "jenkins",
          "name": "Jenkins"
        },
        {
          "icon": "argocd",
          "name": "ArgoCD"
        },
        {
          "icon": "docker",
          "name": "Docker"
        },
        {
          "icon": "terraform",
          "name": "Terraform"
        }
      ]
    }
  },
  "ur": {
    "name": "سی آئی/سی ڈی پائپ لائنز",
    "shortDescription": "جدید ترین حل کے ساتھ اپنے کاروبار کو بااختیار بنائیں۔ ہماری ماہر ٹیم آپ کی ضروریات کے مطابق جدید نتائج فراہم کرتی ہے۔",
    "fullDescription": "خودکار بلڈ، ٹیسٹ اور ڈیپلائمنٹ پائپ لائنز کے ساتھ مسلسل انٹیگریشن اور ڈیلیوری قائم کریں۔",
    "features": [
      "پائپ لائن ڈیزائن",
      "خودکار ٹیسٹنگ",
      "Multi-Environment Deploys",
      "Rollback Strategies",
      "سیکیورٹی Scanning",
      "مانیٹرنگ"
    ],
    "benefits": [
      "تیزer releases",
      "Fewer failures",
      "Consistent deploys",
      "Early bug detection"
    ],
    "metaTitle": "سی آئی/سی ڈی پائپ لائنز | PakSoft",
    "metaDescription": "جدید ترین حل کے ساتھ اپنے کاروبار کو بااختیار بنائیں۔ ہماری ماہر ٹیم آپ کی ضروریات کے مطابق جدید نتائج فراہم کرتی ہے۔",
    "content": {
      "process": [
        {
          "step": 1,
          "title": "تشخیص",
          "description": "Evaluate current process and bottlenecks."
        },
        {
          "step": 2,
          "title": "ڈیزائن",
          "description": "ہم صارف پر مرکوز ڈیزائن بناتے ہیں۔"
        },
        {
          "step": 3,
          "title": "نفاذ",
          "description": "ہم منظم طریقے سے حل کو نافذ کرتے ہیں۔"
        },
        {
          "step": 4,
          "title": "آپٹیمائزیشن",
          "description": "Optimize speed and add monitoring."
        }
      ],
      "faq": [
        {
          "answer": "GitHub Actions, GitLab CI, or Jenkins based on your ecosystem.",
          "question": "Which CI/CD tool?"
        },
        {
          "answer": "Target under 15 minutes commit to production.",
          "question": "Deploy speed?"
        },
        {
          "answer": "Blue-green, canary, automated rollback on errors.",
          "question": "Rollbacks?"
        },
        {
          "answer": "Yes, incrementally add CI/CD without disruption.",
          "question": "Existing projects?"
        }
      ],
      "technologies": [
        {
          "icon": "github",
          "name": "GitHub Actions"
        },
        {
          "icon": "gitlab",
          "name": "GitLab CI"
        },
        {
          "icon": "jenkins",
          "name": "Jenkins"
        },
        {
          "icon": "argocd",
          "name": "ArgoCD"
        },
        {
          "icon": "docker",
          "name": "Docker"
        },
        {
          "icon": "terraform",
          "name": "Terraform"
        }
      ]
    }
  },
  "ar": {
    "name": "خطوط CI/CD",
    "shortDescription": "قم بتمكين عملك بأحدث الحلول. فريق خبرائنا يقدم نتائج مبتكرة مصممة خصيصًا لاحتياجاتك.",
    "fullDescription": "أنشئ التكامل والنشر المستمر مع خطوط البناء والاختبار والنشر الآلية.",
    "features": [
      "خط الأنابيب التصميم",
      "آلي الاختبار",
      "Multi-Environment Deploys",
      "Rollback Strategies",
      "الأمان Scanning",
      "المراقبة"
    ],
    "benefits": [
      "سريعer releases",
      "Fewer failures",
      "Consistent deploys",
      "Early bug detection"
    ],
    "metaTitle": "خطوط CI/CD | PakSoft",
    "metaDescription": "قم بتمكين عملك بأحدث الحلول. فريق خبرائنا يقدم نتائج مبتكرة مصممة خصيصًا لاحتياجاتك.",
    "content": {
      "process": [
        {
          "step": 1,
          "title": "التقييم",
          "description": "Evaluate current process and bottlenecks."
        },
        {
          "step": 2,
          "title": "التصميم",
          "description": "نصمم تصاميم تركز على المستخدم."
        },
        {
          "step": 3,
          "title": "التنفيذ",
          "description": "ننفذ الحل بشكل منهجي."
        },
        {
          "step": 4,
          "title": "التحسين",
          "description": "Optimize speed and add monitoring."
        }
      ],
      "faq": [
        {
          "answer": "GitHub Actions, GitLab CI, or Jenkins based on your ecosystem.",
          "question": "Which CI/CD tool?"
        },
        {
          "answer": "Target under 15 minutes commit to production.",
          "question": "Deploy speed?"
        },
        {
          "answer": "Blue-green, canary, automated rollback on errors.",
          "question": "Rollbacks?"
        },
        {
          "answer": "Yes, incrementally add CI/CD without disruption.",
          "question": "Existing projects?"
        }
      ],
      "technologies": [
        {
          "icon": "github",
          "name": "GitHub Actions"
        },
        {
          "icon": "gitlab",
          "name": "GitLab CI"
        },
        {
          "icon": "jenkins",
          "name": "Jenkins"
        },
        {
          "icon": "argocd",
          "name": "ArgoCD"
        },
        {
          "icon": "docker",
          "name": "Docker"
        },
        {
          "icon": "terraform",
          "name": "Terraform"
        }
      ]
    }
  }
}
```

---

## SERVICES TO WRITE

There are 34 Infrastructure & DevOps services. For each, the `slug` is the object key you must use. `name` is the current service name (translate/keep as appropriate). `currentShort`, `currentFeatures`, `currentTech` are the existing skeletal data — expand and improve on them, do not contradict. `parent` is the parent service for context only.

```json
[
 {
  "slug": "big-data-etl",
  "name": "Big Data & ETL",
  "parent": "data-analytics",
  "currentShort": "Build scalable data pipelines that extract, transform, and load data from any source.",
  "currentFeatures": [
   "ETL Pipeline Development",
   "Data Warehouse Design",
   "Real-Time Streaming",
   "Data Quality",
   "Schema Evolution",
   "Pipeline Orchestration"
  ],
  "currentTech": [
   "Apache Spark",
   "Airflow",
   "dbt",
   "Snowflake",
   "Kafka",
   "BigQuery"
  ]
 },
 {
  "slug": "business-intelligence",
  "name": "Business Intelligence",
  "parent": "data-analytics",
  "currentShort": "Transform data into interactive dashboards and reports that drive decisions.",
  "currentFeatures": [
   "Interactive Dashboards",
   "Automated Reporting",
   "KPI Tracking",
   "Self-Service Analytics",
   "Data Modeling",
   "Executive Scorecards"
  ],
  "currentTech": [
   "Tableau",
   "Power BI",
   "Looker",
   "Metabase",
   "dbt",
   "Snowflake"
  ]
 },
 {
  "slug": "ci-cd-pipelines",
  "name": "CI/CD Pipelines",
  "parent": "devops-cloud",
  "currentShort": "Automate your build, test, and deployment process for faster, reliable releases.",
  "currentFeatures": [
   "Pipeline Design",
   "Automated Testing",
   "Multi-Environment Deploys",
   "Rollback Strategies",
   "Security Scanning",
   "Monitoring"
  ],
  "currentTech": [
   "GitHub Actions",
   "GitLab CI",
   "Jenkins",
   "ArgoCD",
   "Docker",
   "Terraform"
  ]
 },
 {
  "slug": "cloud-cost-optimization",
  "name": "Cloud Cost Optimization",
  "parent": "devops-cloud",
  "currentShort": "Analyze and optimize AWS, Azure, or GCP costs with FinOps practices.",
  "currentFeatures": [
   "Cost Analysis & Attribution",
   "Rightsizing Recommendations",
   "Reserved Instance Planning",
   "Spot Instance Strategies",
   "Idle Resource Detection",
   "Architecture Optimization",
   "Cost Allocation Tags",
   "Budget Alerts & Governance"
  ],
  "currentTech": [
   "AWS Cost Explorer",
   "Kubecost",
   "Infracost",
   "CloudHealth"
  ]
 },
 {
  "slug": "cloud-management",
  "name": "Cloud Management",
  "parent": "devops-cloud",
  "currentShort": "Optimize and manage your cloud for performance, cost, and security.",
  "currentFeatures": [
   "Cost Optimization",
   "Performance Monitoring",
   "Security Management",
   "Resource Right-Sizing",
   "Multi-Cloud",
   "Compliance"
  ],
  "currentTech": [
   "AWS",
   "Azure",
   "Google Cloud",
   "Terraform",
   "CloudHealth",
   "Datadog"
  ]
 },
 {
  "slug": "continuous-monitoring",
  "name": "Continuous Monitoring",
  "parent": "managed-services",
  "currentShort": "24/7 infrastructure and application monitoring.",
  "currentFeatures": [
   "Infrastructure Monitoring",
   "APM",
   "Log Management",
   "Alerting",
   "Dashboards",
   "On-call Support"
  ],
  "currentTech": [
   "Datadog",
   "Prometheus",
   "Grafana"
  ]
 },
 {
  "slug": "core-web-vitals",
  "name": "Core Web Vitals",
  "parent": "performance-optimization",
  "currentShort": "Improve Core Web Vitals for better SEO and user experience.",
  "currentFeatures": [
   "LCP Optimization",
   "FID/INP Fix",
   "CLS Prevention",
   "Real User Monitoring",
   "Lab Testing",
   "Continuous Tracking"
  ],
  "currentTech": [
   "PageSpeed Insights",
   "Web Vitals",
   "RUM"
  ]
 },
 {
  "slug": "cybersecurity-auditing",
  "name": "Cybersecurity Auditing",
  "parent": "cybersecurity",
  "currentShort": "Identify security vulnerabilities before attackers do with thorough security audits.",
  "currentFeatures": [
   "Application Security Audit",
   "Infrastructure Assessment",
   "Cloud Security Review",
   "Code Security Review",
   "Compliance Gap Analysis",
   "Social Engineering Assessment",
   "Third-Party Risk Assessment",
   "Executive Risk Report"
  ],
  "currentTech": [
   "Burp Suite",
   "Nessus",
   "OWASP ZAP",
   "Semgrep",
   "ScoutSuite",
   "Trivy"
  ]
 },
 {
  "slug": "database-design",
  "name": "Database Design",
  "parent": "database-services",
  "currentShort": "Design scalable, efficient database schemas for your applications.",
  "currentFeatures": [
   "Schema Design",
   "Data Modeling",
   "Normalization",
   "Index Strategy",
   "Relationship Design",
   "Documentation"
  ],
  "currentTech": [
   "PostgreSQL",
   "ERD Tools",
   "Prisma"
  ]
 },
 {
  "slug": "database-design-optimization",
  "name": "Database Design & Optimization",
  "parent": "data-analytics",
  "currentShort": "Design efficient database schemas and optimize query performance for scalable, fast applications.",
  "currentFeatures": [
   "Schema Design & Modeling",
   "Index Optimization",
   "Query Performance Tuning",
   "Database Migration",
   "Replication & Sharding",
   "Caching Strategies",
   "Backup & Recovery",
   "Database Monitoring"
  ],
  "currentTech": [
   "PostgreSQL",
   "MySQL",
   "MongoDB",
   "Redis",
   "Prisma",
   "PgBouncer"
  ]
 },
 {
  "slug": "database-migration",
  "name": "Database Migration",
  "parent": "database-services",
  "currentShort": "Migrate databases between platforms with zero data loss.",
  "currentFeatures": [
   "Platform Migration",
   "Version Upgrades",
   "Cloud Migration",
   "Data Validation",
   "Cutover Planning",
   "Rollback Strategy"
  ],
  "currentTech": [
   "AWS DMS",
   "pgloader",
   "Migration Tools"
  ]
 },
 {
  "slug": "database-optimization",
  "name": "Database Optimization",
  "parent": "database-services",
  "currentShort": "Optimize database performance for faster queries and lower costs.",
  "currentFeatures": [
   "Query Analysis",
   "Index Optimization",
   "Configuration Tuning",
   "Caching Strategy",
   "Connection Pooling",
   "Performance Monitoring"
  ],
  "currentTech": [
   "EXPLAIN",
   "pg_stat",
   "Redis"
  ]
 },
 {
  "slug": "disaster-recovery",
  "name": "Disaster Recovery",
  "parent": "managed-services",
  "currentShort": "Plan and implement disaster recovery for business continuity.",
  "currentFeatures": [
   "DR Planning",
   "Backup Strategy",
   "Failover Setup",
   "Testing",
   "Documentation",
   "Recovery Automation"
  ],
  "currentTech": [
   "AWS Backup",
   "Azure Site Recovery",
   "Veeam"
  ]
 },
 {
  "slug": "disaster-recovery-planning",
  "name": "Disaster Recovery Planning",
  "parent": "devops-cloud",
  "currentShort": "Design and implement DR strategies for cloud and on-premise infrastructure.",
  "currentFeatures": [
   "DR Strategy & Planning",
   "Backup Architecture",
   "Multi-Region Failover",
   "RTO/RPO Definition",
   "Automated Recovery",
   "DR Testing & Drills",
   "Runbook Development",
   "Ransomware Recovery"
  ],
  "currentTech": [
   "AWS Backup",
   "Azure Site Recovery",
   "Veeam",
   "Terraform"
  ]
 },
 {
  "slug": "docker-kubernetes",
  "name": "Docker & Kubernetes",
  "parent": "devops-cloud",
  "currentShort": "Containerize applications and orchestrate deployments with Docker and Kubernetes.",
  "currentFeatures": [
   "Containerization",
   "Kubernetes Clusters",
   "Helm Charts",
   "Service Mesh",
   "Auto-Scaling",
   "Container Security"
  ],
  "currentTech": [
   "Docker",
   "Kubernetes",
   "Helm",
   "Istio",
   "Prometheus",
   "Grafana"
  ]
 },
 {
  "slug": "gdpr-compliance",
  "name": "GDPR Compliance",
  "parent": "cybersecurity",
  "currentShort": "Achieve and maintain GDPR compliance for your organization.",
  "currentFeatures": [
   "Gap Analysis",
   "Policy Development",
   "Technical Implementation",
   "Training",
   "DPO Support",
   "Audit Support"
  ],
  "currentTech": [
   "Privacy Tools",
   "Documentation"
  ]
 },
 {
  "slug": "google-cloud-migration",
  "name": "Google Cloud Migration",
  "parent": "cloud-migration",
  "currentShort": "Migrate to Google Cloud Platform for data and AI-ready infrastructure.",
  "currentFeatures": [
   "GCP Assessment",
   "Anthos Migration",
   "BigQuery Migration",
   "GKE Deployment",
   "Cloud SQL",
   "Data Migration"
  ],
  "currentTech": [
   "Migrate for Compute",
   "Anthos",
   "BigQuery"
  ]
 },
 {
  "slug": "identity-access-management",
  "name": "Identity & Access Management",
  "parent": "cybersecurity",
  "currentShort": "Build robust IAM solutions with SSO, MFA, RBAC, and identity federation.",
  "currentFeatures": [
   "Single Sign-On (SSO)",
   "Multi-Factor Authentication",
   "Role-Based Access Control",
   "Identity Federation",
   "OAuth 2.0 / OpenID Connect",
   "Directory Integration",
   "Privileged Access Management",
   "Audit Logging"
  ],
  "currentTech": [
   "Auth0",
   "Okta",
   "Keycloak",
   "Azure AD",
   "AWS Cognito"
  ]
 },
 {
  "slug": "infrastructure-as-code",
  "name": "Infrastructure as Code",
  "parent": "devops-cloud",
  "currentShort": "Manage infrastructure with code for consistency and automation.",
  "currentFeatures": [
   "Terraform",
   "CloudFormation",
   "Pulumi",
   "GitOps",
   "Module Development",
   "State Management"
  ],
  "currentTech": [
   "Terraform",
   "AWS CDK",
   "Pulumi"
  ]
 },
 {
  "slug": "kubernetes-orchestration",
  "name": "Kubernetes Orchestration",
  "parent": "devops-cloud",
  "currentShort": "Orchestrate containers with Kubernetes for scalable, resilient microservices deployments.",
  "currentFeatures": [
   "Cluster Architecture & Setup",
   "Workload Migration",
   "Helm Chart Development",
   "Service Mesh (Istio/Linkerd)",
   "GitOps with ArgoCD/Flux",
   "Monitoring & Observability",
   "Security & RBAC",
   "Cost Optimization"
  ],
  "currentTech": [
   "Kubernetes",
   "Helm",
   "ArgoCD",
   "Prometheus",
   "Istio",
   "Rancher"
  ]
 },
 {
  "slug": "maintenance-support",
  "name": "Maintenance & Support",
  "parent": "managed-services",
  "currentShort": "Ongoing maintenance and support for your applications.",
  "currentFeatures": [
   "Bug Fixes",
   "Security Updates",
   "Feature Updates",
   "Performance Tuning",
   "Technical Support",
   "Documentation"
  ],
  "currentTech": [
   "Version Control",
   "CI/CD",
   "Ticketing"
  ]
 },
 {
  "slug": "ml-pipelines",
  "name": "ML Pipelines",
  "parent": "mlops-deployment",
  "currentShort": "Build automated ML pipelines for training and deployment.",
  "currentFeatures": [
   "Data Pipelines",
   "Feature Engineering",
   "Training Automation",
   "Validation Gates",
   "Deployment Automation",
   "Experiment Tracking"
  ],
  "currentTech": [
   "Kubeflow",
   "Airflow",
   "MLflow",
   "DVC"
  ]
 },
 {
  "slug": "mlops-deployment",
  "name": "MLOps Deployment",
  "parent": null,
  "currentShort": "Deploy, monitor, and scale ML models in production with confidence.",
  "currentFeatures": [
   "Model Serving & Inference APIs",
   "Automated Training Pipelines",
   "Model Versioning & Registry",
   "Performance Monitoring & Drift Detection",
   "A/B Testing & Canary Deployments",
   "GPU Infrastructure Management"
  ],
  "currentTech": [
   "MLflow",
   "Kubeflow",
   "Kubernetes",
   "Docker",
   "Seldon Core",
   "Weights & Biases"
  ]
 },
 {
  "slug": "model-deployment",
  "name": "Model Deployment",
  "parent": "mlops-deployment",
  "currentShort": "Deploy machine learning models to production reliably.",
  "currentFeatures": [
   "Model Serving",
   "API Development",
   "Auto-scaling",
   "A/B Testing",
   "Versioning",
   "Rollback"
  ],
  "currentTech": [
   "Docker",
   "Kubernetes",
   "FastAPI",
   "MLflow"
  ]
 },
 {
  "slug": "model-monitoring",
  "name": "Model Monitoring",
  "parent": "mlops-deployment",
  "currentShort": "Monitor ML models in production for drift and performance.",
  "currentFeatures": [
   "Drift Detection",
   "Performance Tracking",
   "Alerting",
   "Dashboard",
   "Retraining Triggers",
   "Data Quality"
  ],
  "currentTech": [
   "Evidently",
   "Prometheus",
   "Grafana",
   "MLflow"
  ]
 },
 {
  "slug": "penetration-testing",
  "name": "Penetration Testing",
  "parent": "cybersecurity",
  "currentShort": "Ethical hacking to find vulnerabilities attackers would exploit, before they do.",
  "currentFeatures": [
   "Web Application Pentesting",
   "API Security Testing",
   "Network Penetration Testing",
   "Cloud Infrastructure Testing",
   "Mobile App Pentesting",
   "Red Team Exercises",
   "Phishing Simulations",
   "Physical Security Testing"
  ],
  "currentTech": [
   "Metasploit",
   "Cobalt Strike",
   "Kali Linux",
   "Burp Suite",
   "BloodHound",
   "Nuclei"
  ]
 },
 {
  "slug": "performance-testing-optimization",
  "name": "Performance Testing & Optimization",
  "parent": "devops-cloud",
  "currentShort": "Load testing, stress testing, and performance optimization for scalable apps.",
  "currentFeatures": [
   "Load Testing",
   "Stress Testing",
   "Capacity Planning",
   "APM Implementation",
   "Database Optimization",
   "Caching Strategies",
   "CDN Configuration",
   "Performance Monitoring"
  ],
  "currentTech": [
   "k6",
   "Locust",
   "Grafana",
   "Datadog"
  ]
 },
 {
  "slug": "real-time-analytics",
  "name": "Real-time Analytics",
  "parent": "data-analytics",
  "currentShort": "Process and analyze data in real-time for instant insights.",
  "currentFeatures": [
   "Stream Processing",
   "Real-time Dashboards",
   "Instant Alerts",
   "Event Detection",
   "Time Series",
   "Scalability"
  ],
  "currentTech": [
   "Kafka",
   "Flink",
   "ClickHouse"
  ]
 },
 {
  "slug": "security-audits-compliance",
  "name": "Security Audits & Compliance",
  "parent": "cybersecurity",
  "currentShort": "Achieve and maintain security compliance with thorough audits and remediation.",
  "currentFeatures": [
   "SOC 2 Compliance",
   "ISO 27001",
   "GDPR Compliance",
   "PCI DSS",
   "Security Policies",
   "Risk Assessment"
  ],
  "currentTech": [
   "Vanta",
   "Drata",
   "AWS Config",
   "Qualys",
   "Nessus",
   "Splunk"
  ]
 },
 {
  "slug": "serverless-architecture",
  "name": "Serverless Architecture",
  "parent": "devops-cloud",
  "currentShort": "Build scalable, cost-effective applications using serverless architecture with AWS Lambda, Vercel, and edge computing.",
  "currentFeatures": [
   "AWS Lambda & API Gateway",
   "Vercel & Cloudflare Workers",
   "Event-Driven Architecture",
   "Serverless Databases",
   "Edge Computing",
   "Auto-Scaling & Cost Optimization",
   "Monitoring & Observability",
   "Cold Start Optimization"
  ],
  "currentTech": [
   "AWS Lambda",
   "Vercel",
   "Cloudflare Workers",
   "DynamoDB",
   "Terraform",
   "SST"
  ]
 },
 {
  "slug": "terraform-infrastructure",
  "name": "Terraform Infrastructure",
  "parent": "devops-cloud",
  "currentShort": "Define and provision cloud infrastructure with Terraform for consistency and automation.",
  "currentFeatures": [
   "Terraform Module Development",
   "Multi-Cloud Infrastructure",
   "State Management & Backends",
   "CI/CD Pipeline Integration",
   "Drift Detection & Remediation",
   "Security & Compliance as Code",
   "Cost Estimation & Optimization",
   "Migration from Manual Infrastructure"
  ],
  "currentTech": [
   "Terraform",
   "Terraform Cloud",
   "Terragrunt",
   "tfsec",
   "Checkov",
   "Atlantis"
  ]
 },
 {
  "slug": "web-scraping",
  "name": "Web Scraping",
  "parent": "python-automation",
  "currentShort": "Extract valuable data from websites at scale with reliable web scraping solutions.",
  "currentFeatures": [
   "Custom Scraper Development",
   "Anti-Bot Strategies",
   "Scheduled Collection",
   "Data Cleaning",
   "API Delivery",
   "Proxy Management"
  ],
  "currentTech": [
   "Python",
   "Scrapy",
   "Selenium",
   "Beautiful Soup",
   "Playwright",
   "PostgreSQL"
  ]
 },
 {
  "slug": "website-speed-optimization",
  "name": "Website Speed Optimization",
  "parent": "performance-optimization",
  "currentShort": "Make your website lightning fast with comprehensive optimization.",
  "currentFeatures": [
   "Image Optimization",
   "Code Minification",
   "Lazy Loading",
   "CDN Setup",
   "Browser Caching",
   "Resource Hints"
  ],
  "currentTech": [
   "PageSpeed",
   "Cloudflare",
   "webpack"
  ]
 },
 {
  "slug": "workflow-automation",
  "name": "Workflow Automation",
  "parent": "python-automation",
  "currentShort": "Automate repetitive business workflows to save time and reduce errors.",
  "currentFeatures": [
   "Process Optimization",
   "Script Development",
   "Scheduling",
   "Cross-System Integration",
   "Error Handling",
   "Dashboard"
  ],
  "currentTech": [
   "Python",
   "Apache Airflow",
   "Celery",
   "n8n",
   "Zapier",
   "Make"
  ]
 }
]
```

