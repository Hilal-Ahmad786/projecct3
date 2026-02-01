export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
  details: string[];
}

export interface ServiceProcessStep {
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface ServiceTechItem {
  name: string;
  description: string;
}

export interface ServiceTechCategory {
  category: string;
  items: ServiceTechItem[];
}

export interface ServicePortfolioItem {
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  stats: { label: string; value: string }[];
}

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface ServiceFAQCategory {
  category: string;
  items: ServiceFAQItem[];
}

export interface ServiceSubpageData {
  slug: string;
  serviceName: string;
  accentColor: string;
  features: {
    headline: string;
    subtitle: string;
    description: string;
    items: ServiceFeature[];
    stats: { label: string; value: string }[];
  };
  process: {
    headline: string;
    subtitle: string;
    description: string;
    steps: ServiceProcessStep[];
  };
  techStack: {
    headline: string;
    subtitle: string;
    description: string;
    categories: ServiceTechCategory[];
  };
  portfolio: {
    headline: string;
    subtitle: string;
    description: string;
    items: ServicePortfolioItem[];
    aggregateStats: { label: string; value: string }[];
  };
  faq: {
    headline: string;
    subtitle: string;
    description: string;
    categories: ServiceFAQCategory[];
  };
}

export const serviceSubpageData: Record<string, ServiceSubpageData> = {
  'ai-solutions': {
    slug: 'ai-solutions',
    serviceName: 'AI Solutions',
    accentColor: 'purple',
    features: {
      headline: 'Enterprise AI That Delivers Measurable ROI',
      subtitle: 'Intelligent Automation & Predictive Analytics',
      description: 'We build production-grade AI systems that integrate seamlessly into your existing infrastructure, turning raw data into actionable insights and automating complex decision-making workflows.',
      items: [
        {
          icon: 'brain',
          title: 'Custom Machine Learning Models',
          description: 'Purpose-built ML models trained on your proprietary data to solve domain-specific challenges with high accuracy.',
          details: [
            'Supervised and unsupervised learning pipelines tailored to your industry vertical',
            'Continuous model retraining with automated drift detection and performance monitoring',
            'Explainable AI outputs with SHAP and LIME interpretability layers',
          ],
        },
        {
          icon: 'chat',
          title: 'Conversational AI & NLP',
          description: 'Deploy intelligent chatbots and natural language processing systems that understand context, sentiment, and intent.',
          details: [
            'Multi-turn dialogue management with memory and context retention across sessions',
            'Multilingual support covering 40+ languages with dialect-aware processing',
            'Integration with CRM, helpdesk, and knowledge base platforms for grounded responses',
          ],
        },
        {
          icon: 'eye',
          title: 'Computer Vision Systems',
          description: 'Automated visual inspection, object detection, and image classification for manufacturing, retail, and healthcare.',
          details: [
            'Real-time video stream analysis with sub-100ms inference latency',
            'Custom-trained detection models for defect identification and quality assurance',
            'Edge deployment optimization for on-premises cameras and IoT devices',
          ],
        },
        {
          icon: 'chart',
          title: 'Predictive Analytics & Forecasting',
          description: 'Time-series forecasting and predictive models that anticipate demand, churn, and market shifts before they happen.',
          details: [
            'Ensemble forecasting combining statistical and deep learning approaches',
            'Scenario modeling with Monte Carlo simulations for risk assessment',
            'Automated feature engineering from structured and unstructured data sources',
          ],
        },
        {
          icon: 'search',
          title: 'Intelligent Document Processing',
          description: 'Extract, classify, and route information from invoices, contracts, and forms with AI-powered document understanding.',
          details: [
            'OCR with layout-aware extraction for tables, headers, and nested structures',
            'Custom entity recognition for domain-specific terminology and codes',
            'Automated validation rules with human-in-the-loop escalation workflows',
          ],
        },
        {
          icon: 'sparkles',
          title: 'Generative AI Integration',
          description: 'Harness the power of large language models with secure, enterprise-grade generative AI applications.',
          details: [
            'RAG pipelines with vector databases for accurate, citation-backed responses',
            'Fine-tuned foundation models on proprietary datasets with data privacy guarantees',
            'Content generation workflows for marketing, documentation, and reporting',
          ],
        },
        {
          icon: 'lightning',
          title: 'MLOps & Model Lifecycle Management',
          description: 'End-to-end infrastructure for training, deploying, monitoring, and versioning ML models in production.',
          details: [
            'CI/CD pipelines for model deployment with automated A/B testing and canary rollouts',
            'Real-time performance dashboards tracking accuracy, latency, and resource usage',
            'Model registry with full lineage tracking from training data to production endpoint',
          ],
        },
        {
          icon: 'shield',
          title: 'AI Governance & Compliance',
          description: 'Ensure your AI systems meet regulatory requirements with built-in bias detection, audit trails, and transparency.',
          details: [
            'Fairness metrics and bias auditing across protected demographic attributes',
            'Comprehensive audit logging for every prediction with full reproducibility',
          ],
        },
      ],
      stats: [
        { label: 'Models Deployed', value: '200+' },
        { label: 'Avg. Accuracy Improvement', value: '34%' },
        { label: 'Processing Speed Gain', value: '12x' },
        { label: 'Client Retention Rate', value: '96%' },
      ],
    },
    process: {
      headline: 'From Data Strategy to Production AI',
      subtitle: 'Our Proven AI Development Process',
      description: 'We follow a structured, iterative approach that reduces risk and accelerates time-to-value for every AI initiative.',
      steps: [
        {
          title: 'Discovery & Data Assessment',
          description: 'We audit your existing data assets, identify high-impact use cases, and define success metrics aligned with business KPIs.',
          icon: 'search',
          details: [
            'Stakeholder interviews and process mapping to uncover automation opportunities',
            'Data quality assessment covering completeness, consistency, and labeling readiness',
            'ROI projection with implementation roadmap and resource planning',
          ],
        },
        {
          title: 'Data Engineering & Preparation',
          description: 'Build robust data pipelines that clean, transform, and enrich your data for model training and inference.',
          icon: 'database',
          details: [
            'ETL pipeline construction with schema validation and anomaly detection',
            'Feature store development for reusable, versioned feature sets across projects',
            'Data augmentation strategies to address class imbalance and sparse datasets',
          ],
        },
        {
          title: 'Model Development & Training',
          description: 'Iterative experimentation with rigorous evaluation to select the best-performing architecture for your use case.',
          icon: 'brain',
          details: [
            'Hyperparameter optimization using Bayesian search and neural architecture search',
            'Cross-validation with stratified sampling to ensure generalization',
            'Benchmark comparison against baseline models and industry standards',
          ],
        },
        {
          title: 'Integration & Deployment',
          description: 'Production-grade deployment with API endpoints, batch processing, or edge inference depending on your requirements.',
          icon: 'rocket',
          details: [
            'Containerized model serving with auto-scaling and load balancing',
            'REST and gRPC API endpoints with authentication and rate limiting',
            'Shadow deployment and gradual rollout to minimize production risk',
          ],
        },
        {
          title: 'Monitoring & Optimization',
          description: 'Continuous performance tracking with automated retraining triggers and proactive alerting on model degradation.',
          icon: 'chart',
          details: [
            'Real-time drift detection on input distributions and prediction outputs',
            'Automated retraining pipelines triggered by performance threshold breaches',
            'Monthly performance reviews with optimization recommendations',
          ],
        },
      ],
    },
    techStack: {
      headline: 'State-of-the-Art AI Technology Stack',
      subtitle: 'Tools & Frameworks We Use',
      description: 'We leverage the most mature and performant AI frameworks to build solutions that scale reliably in production environments.',
      categories: [
        {
          category: 'ML & Deep Learning Frameworks',
          items: [
            { name: 'TensorFlow', description: 'Production-grade deep learning with TF Serving for scalable model deployment' },
            { name: 'PyTorch', description: 'Research-to-production framework for custom model architectures and rapid prototyping' },
            { name: 'scikit-learn', description: 'Classical ML algorithms for tabular data, feature engineering, and baseline models' },
            { name: 'Keras', description: 'High-level API for fast experimentation with neural network architectures' },
          ],
        },
        {
          category: 'LLM & NLP Platforms',
          items: [
            { name: 'OpenAI', description: 'GPT-4 integration for content generation, summarization, and reasoning tasks' },
            { name: 'Hugging Face', description: 'Open-source transformer models for NER, classification, and embedding generation' },
            { name: 'LangChain', description: 'Orchestration framework for building RAG pipelines and multi-agent systems' },
          ],
        },
        {
          category: 'Infrastructure & MLOps',
          items: [
            { name: 'AWS', description: 'SageMaker, Bedrock, and Lambda for end-to-end ML lifecycle management' },
            { name: 'Docker', description: 'Containerized model serving for consistent deployment across environments' },
            { name: 'Kubernetes', description: 'Orchestration for auto-scaling inference workloads under variable demand' },
            { name: 'PostgreSQL', description: 'Structured data storage with pgvector for hybrid search and embeddings' },
          ],
        },
      ],
    },
    portfolio: {
      headline: 'AI Solutions That Drive Real Business Outcomes',
      subtitle: 'Selected Case Studies',
      description: 'See how our AI implementations have transformed operations and created competitive advantages across industries.',
      items: [
        {
          title: 'Predictive Maintenance Platform for Fleet Management',
          industry: 'Transportation & Logistics',
          challenge: 'A national logistics company was losing $2.3M annually to unplanned vehicle breakdowns, causing delivery delays and emergency repair costs.',
          solution: 'We built a predictive maintenance system using sensor telemetry from 1,200 vehicles, training gradient-boosted models to predict component failures 14 days in advance.',
          results: [
            'Reduced unplanned downtime by 73% within the first six months of deployment',
            'Saved $1.8M annually in emergency repair and towing costs',
            'Improved on-time delivery rate from 84% to 96%',
          ],
          stats: [
            { label: 'Downtime Reduction', value: '73%' },
            { label: 'Annual Savings', value: '$1.8M' },
          ],
        },
        {
          title: 'AI-Powered Claims Processing for Insurance',
          industry: 'Insurance & Financial Services',
          challenge: 'Manual claims review was taking an average of 12 business days, leading to customer dissatisfaction and a 22% abandonment rate on complex claims.',
          solution: 'Deployed an intelligent document processing pipeline with NLP-based damage assessment and fraud detection, automating 68% of routine claims end-to-end.',
          results: [
            'Reduced average claims processing time from 12 days to 2.4 days',
            'Detected $4.2M in potentially fraudulent claims in the first year',
            'Improved customer satisfaction scores by 41 points (NPS)',
          ],
          stats: [
            { label: 'Processing Speed', value: '5x Faster' },
            { label: 'Fraud Detected', value: '$4.2M' },
          ],
        },
        {
          title: 'Demand Forecasting Engine for Retail Chain',
          industry: 'Retail & E-Commerce',
          challenge: 'A 200-store retail chain struggled with inventory imbalances, resulting in $6M in annual markdowns and frequent stockouts on high-demand products.',
          solution: 'Built an ensemble forecasting engine combining LSTM networks with external signals (weather, events, promotions) to predict SKU-level demand at each store.',
          results: [
            'Reduced overstock markdowns by 38%, recovering $2.3M in margin',
            'Decreased stockout incidents by 52% across top-performing categories',
          ],
          stats: [
            { label: 'Markdown Reduction', value: '38%' },
            { label: 'Stockout Decrease', value: '52%' },
          ],
        },
        {
          title: 'Conversational AI for Healthcare Patient Intake',
          industry: 'Healthcare',
          challenge: 'A hospital network processed 15,000 patient intake forms monthly, requiring 22 FTEs for manual data entry and verification with a 7% error rate.',
          solution: 'Implemented a conversational AI system with voice-to-text and NLP entity extraction, enabling patients to complete intake digitally with real-time validation.',
          results: [
            'Automated 81% of patient intake workflows with 99.2% data accuracy',
            'Reduced staffing needs from 22 to 6 FTEs, reallocating resources to patient care',
            'Cut average intake time from 25 minutes to 8 minutes per patient',
          ],
          stats: [
            { label: 'Automation Rate', value: '81%' },
            { label: 'Accuracy', value: '99.2%' },
          ],
        },
      ],
      aggregateStats: [
        { label: 'AI Projects Delivered', value: '120+' },
        { label: 'Combined Client Savings', value: '$48M+' },
        { label: 'Average ROI', value: '340%' },
        { label: 'Industries Served', value: '18' },
      ],
    },
    faq: {
      headline: 'AI Solutions FAQ',
      subtitle: 'Common Questions',
      description: 'Answers to the most frequent questions we receive about our AI development services and engagement process.',
      categories: [
        {
          category: 'Getting Started',
          items: [
            {
              question: 'How much data do we need to start an AI project?',
              answer: 'It depends on the complexity of the problem. For many classification and prediction tasks, a few thousand labeled examples can produce strong results. For computer vision, we typically recommend at least 1,000 annotated images per class. We also offer data augmentation and transfer learning strategies that can significantly reduce data requirements. During our discovery phase, we assess your existing data and provide a clear recommendation.',
            },
            {
              question: 'What if our data is messy or incomplete?',
              answer: 'Most real-world data is messy -- that is completely normal. Our data engineering phase includes comprehensive cleaning, deduplication, imputation, and validation steps. We build automated data quality pipelines that continue to improve data integrity over time. In cases where data gaps exist, we design collection strategies and synthetic data approaches to fill them.',
            },
            {
              question: 'How long does a typical AI project take from kickoff to production?',
              answer: 'A focused proof-of-concept can be delivered in 4-6 weeks. A full production deployment with integration, monitoring, and optimization typically takes 3-5 months depending on data readiness and system complexity. We use an agile approach with bi-weekly demos so you see progress continuously.',
            },
          ],
        },
        {
          category: 'Technical & Security',
          items: [
            {
              question: 'Can you work with our existing cloud infrastructure?',
              answer: 'Absolutely. We deploy on AWS, Google Cloud, and Azure, and we have deep experience with on-premises deployments for organizations with strict data residency requirements. We design our solutions to integrate with your existing CI/CD pipelines, data warehouses, and monitoring tools.',
            },
            {
              question: 'How do you ensure AI model security and data privacy?',
              answer: 'Security is built into every layer. We use encrypted data pipelines, role-based access controls, and private VPC deployments. For sensitive industries, we support federated learning and differential privacy techniques that train models without exposing raw data. All our processes are SOC 2 and GDPR compliant.',
            },
            {
              question: 'What happens when model performance degrades over time?',
              answer: 'We implement comprehensive monitoring that tracks prediction accuracy, data drift, and feature importance in real time. When performance drops below configured thresholds, automated retraining pipelines kick in using the latest data. We also conduct quarterly model reviews to proactively identify optimization opportunities.',
            },
          ],
        },
        {
          category: 'Cost & Engagement',
          items: [
            {
              question: 'What does an AI project typically cost?',
              answer: 'AI projects vary widely based on scope. A focused NLP or classification solution might start at $40,000-$80,000, while enterprise-scale predictive platforms with multiple models and integrations can range from $150,000-$500,000+. We provide detailed estimates after our discovery phase and offer phased delivery to manage budget exposure.',
            },
            {
              question: 'Do you offer ongoing support after deployment?',
              answer: 'Yes. We offer tiered support plans that include model monitoring, retraining, performance optimization, and priority bug fixes. Most clients opt for our managed AI service where we handle the full MLOps lifecycle, allowing your team to focus on business outcomes rather than infrastructure.',
            },
            {
              question: 'Can you train our internal team to manage the AI systems?',
              answer: 'Absolutely. Knowledge transfer is a core part of our engagement. We provide hands-on training sessions, detailed documentation, and recorded walkthroughs covering model architecture, monitoring dashboards, and retraining procedures. Our goal is to make your team self-sufficient while remaining available for advanced support.',
            },
          ],
        },
      ],
    },
  },

  'api-development': {
    slug: 'api-development',
    serviceName: 'API Development',
    accentColor: 'teal',
    features: {
      headline: 'APIs Built for Scale, Security, and Speed',
      subtitle: 'Enterprise-Grade API Engineering',
      description: 'We design and build robust APIs that serve as the backbone of modern digital ecosystems, enabling seamless integration between services, partners, and platforms.',
      items: [
        {
          icon: 'code',
          title: 'RESTful API Design & Development',
          description: 'Standards-compliant REST APIs with clean resource modeling, versioning, and comprehensive documentation.',
          details: [
            'OpenAPI 3.1 specification-first design with automated code generation and validation',
            'HATEOAS-compliant responses with pagination, filtering, and field selection',
            'Semantic versioning with backward-compatible evolution strategies',
          ],
        },
        {
          icon: 'lightning',
          title: 'GraphQL API Implementation',
          description: 'Flexible, client-driven APIs that eliminate over-fetching and reduce the number of round trips for complex data queries.',
          details: [
            'Schema-first design with strong typing and introspection capabilities',
            'DataLoader pattern implementation for efficient N+1 query resolution',
            'Subscription support for real-time data streaming via WebSockets',
          ],
        },
        {
          icon: 'shield',
          title: 'API Security & Authentication',
          description: 'Multi-layered security with OAuth 2.0, JWT, API keys, and rate limiting to protect your endpoints and data.',
          details: [
            'OAuth 2.0 and OpenID Connect flows for secure third-party authorization',
            'JWT-based stateless authentication with refresh token rotation',
            'IP whitelisting, CORS configuration, and request signature verification',
          ],
        },
        {
          icon: 'server',
          title: 'Microservices Architecture',
          description: 'Decompose monoliths into independently deployable microservices connected through well-defined API contracts.',
          details: [
            'Domain-driven design for service boundary identification and bounded contexts',
            'Event-driven communication with message queues for loose coupling',
            'Service mesh implementation with circuit breakers and retry policies',
          ],
        },
        {
          icon: 'database',
          title: 'API Gateway & Management',
          description: 'Centralized API gateway for traffic management, analytics, rate limiting, and developer portal provisioning.',
          details: [
            'Request routing, load balancing, and traffic shaping across service clusters',
            'Real-time analytics dashboards tracking latency, error rates, and usage patterns',
            'Developer portal with interactive documentation, sandbox environments, and API key management',
          ],
        },
        {
          icon: 'globe',
          title: 'Third-Party API Integration',
          description: 'Connect your systems with payment processors, CRMs, ERPs, and SaaS platforms through reliable API integrations.',
          details: [
            'Adapter pattern implementation for vendor-agnostic integration layers',
            'Webhook handling with idempotency, retry logic, and dead-letter queues',
            'Data transformation and mapping between incompatible schemas',
          ],
        },
        {
          icon: 'chart',
          title: 'API Performance Optimization',
          description: 'Achieve sub-50ms response times with caching strategies, query optimization, and efficient serialization.',
          details: [
            'Multi-tier caching with Redis, CDN edge caching, and ETag-based conditional requests',
            'Database query optimization with connection pooling and read replicas',
            'Response compression and payload minimization with field-level selection',
          ],
        },
        {
          icon: 'document',
          title: 'API Documentation & Testing',
          description: 'Auto-generated, interactive documentation with comprehensive test suites ensuring reliability across deployments.',
          details: [
            'Swagger UI and Redoc integration with live request execution from documentation',
            'Contract testing with Pact to prevent breaking changes across service boundaries',
          ],
        },
      ],
      stats: [
        { label: 'APIs Delivered', value: '500+' },
        { label: 'Avg. Response Time', value: '<45ms' },
        { label: 'Uptime Guarantee', value: '99.99%' },
        { label: 'Requests Processed Daily', value: '2B+' },
      ],
    },
    process: {
      headline: 'API Development Done Right',
      subtitle: 'Our Structured API Engineering Process',
      description: 'Every API we build follows a rigorous process that ensures consistency, reliability, and developer experience excellence.',
      steps: [
        {
          title: 'API Strategy & Contract Design',
          description: 'Define resource models, endpoint structures, and data contracts collaboratively with stakeholders before writing any code.',
          icon: 'document',
          details: [
            'Stakeholder workshops to map business capabilities to API resources',
            'OpenAPI specification drafting with review cycles and schema validation',
            'Consumer-driven contract negotiation for multi-team environments',
          ],
        },
        {
          title: 'Architecture & Infrastructure Planning',
          description: 'Select the right architectural patterns, protocols, and infrastructure to meet your scalability and latency requirements.',
          icon: 'server',
          details: [
            'Technology selection based on throughput, latency, and team expertise requirements',
            'Infrastructure-as-code templates for reproducible, version-controlled environments',
            'Capacity planning with load modeling and auto-scaling threshold configuration',
          ],
        },
        {
          title: 'Iterative Development & Testing',
          description: 'Build APIs in focused sprints with continuous integration, automated testing, and stakeholder review at every iteration.',
          icon: 'code',
          details: [
            'Test-driven development with unit, integration, and end-to-end test coverage',
            'Automated contract validation ensuring backward compatibility on every commit',
            'Performance benchmarking integrated into CI pipeline with regression alerts',
          ],
        },
        {
          title: 'Security Hardening & Compliance',
          description: 'Comprehensive security review with penetration testing, vulnerability scanning, and compliance verification.',
          icon: 'shield',
          details: [
            'OWASP API Security Top 10 assessment and remediation',
            'Automated dependency scanning and secret detection in CI/CD pipeline',
            'Compliance documentation for SOC 2, HIPAA, and PCI-DSS requirements',
          ],
        },
        {
          title: 'Deployment & Observability Setup',
          description: 'Zero-downtime deployment with comprehensive monitoring, alerting, and distributed tracing across all endpoints.',
          icon: 'rocket',
          details: [
            'Blue-green and canary deployment strategies for risk-free rollouts',
            'Distributed tracing with correlation IDs across microservice boundaries',
            'Custom alerting rules for error rate spikes, latency degradation, and quota breaches',
          ],
        },
      ],
    },
    techStack: {
      headline: 'Battle-Tested API Technology Stack',
      subtitle: 'Frameworks & Tools We Rely On',
      description: 'We use proven technologies that handle billions of requests daily across industries worldwide.',
      categories: [
        {
          category: 'API Frameworks & Languages',
          items: [
            { name: 'NodeJS', description: 'Express and Fastify for high-throughput, non-blocking API servers' },
            { name: 'Python', description: 'FastAPI and Django REST Framework for rapid, type-safe API development' },
            { name: 'GraphQL', description: 'Apollo Server and Hasura for flexible, schema-driven query APIs' },
            { name: 'TypeScript', description: 'End-to-end type safety from API contracts to client SDKs' },
          ],
        },
        {
          category: 'Infrastructure & Deployment',
          items: [
            { name: 'Docker', description: 'Containerized services for consistent deployment across all environments' },
            { name: 'Kubernetes', description: 'Orchestration with horizontal pod autoscaling and rolling updates' },
            { name: 'Nginx', description: 'Reverse proxy and load balancing with rate limiting and SSL termination' },
            { name: 'Terraform', description: 'Infrastructure-as-code for reproducible multi-cloud API deployments' },
          ],
        },
        {
          category: 'Data & Caching',
          items: [
            { name: 'PostgreSQL', description: 'Primary relational data store with advanced indexing and partitioning' },
            { name: 'Redis', description: 'In-memory caching, session storage, and rate limiting backend' },
            { name: 'MongoDB', description: 'Document storage for flexible schemas and high-write workloads' },
          ],
        },
      ],
    },
    portfolio: {
      headline: 'APIs Powering Real Business at Scale',
      subtitle: 'Selected Case Studies',
      description: 'Explore how our API engineering has enabled digital transformation and new revenue streams for our clients.',
      items: [
        {
          title: 'Open Banking API Platform for Fintech',
          industry: 'Financial Services',
          challenge: 'A mid-size bank needed to comply with PSD2 open banking regulations while also creating a developer ecosystem around its financial data and payment services.',
          solution: 'Built a PSD2-compliant API platform with OAuth 2.0, consent management, and a developer portal. Implemented rate limiting, audit logging, and sandbox environments for third-party testing.',
          results: [
            'Onboarded 85 third-party fintech partners within 12 months of launch',
            'Processed over 12 million API calls per day with 99.99% uptime',
            'Generated $3.2M in new API monetization revenue in the first year',
          ],
          stats: [
            { label: 'Partner Integrations', value: '85' },
            { label: 'Daily API Calls', value: '12M+' },
          ],
        },
        {
          title: 'Real-Time Inventory Sync API for Omnichannel Retail',
          industry: 'Retail & E-Commerce',
          challenge: 'A retailer with 340 stores and an e-commerce platform had inventory discrepancies causing overselling and customer complaints due to siloed systems.',
          solution: 'Designed an event-driven inventory API using webhooks and message queues to synchronize stock levels across POS, warehouse, and e-commerce systems in near real-time.',
          results: [
            'Reduced inventory discrepancies by 94% across all channels',
            'Eliminated overselling incidents that previously affected 8% of online orders',
            'Enabled ship-from-store fulfillment, reducing average delivery time by 1.4 days',
          ],
          stats: [
            { label: 'Sync Accuracy', value: '99.7%' },
            { label: 'Overselling Reduction', value: '100%' },
          ],
        },
        {
          title: 'Healthcare Data Exchange API for EHR Integration',
          industry: 'Healthcare',
          challenge: 'A healthcare network with 14 hospitals needed to exchange patient records across different EHR systems while maintaining HIPAA compliance and data integrity.',
          solution: 'Built a FHIR-compliant API gateway that normalized data from Epic, Cerner, and Allscripts into a unified patient record API with granular consent management.',
          results: [
            'Connected 14 hospitals and 2,300 physicians to a unified patient data API',
            'Reduced duplicate patient records by 67% through intelligent matching algorithms',
            'Cut average referral processing time from 4 days to 6 hours',
          ],
          stats: [
            { label: 'Systems Connected', value: '14' },
            { label: 'Referral Speed', value: '16x Faster' },
          ],
        },
      ],
      aggregateStats: [
        { label: 'APIs in Production', value: '500+' },
        { label: 'Total Requests Served', value: '850B+' },
        { label: 'Average Uptime', value: '99.98%' },
        { label: 'Enterprise Clients', value: '75+' },
      ],
    },
    faq: {
      headline: 'API Development FAQ',
      subtitle: 'Common Questions',
      description: 'Everything you need to know about our API development services, from architecture decisions to ongoing maintenance.',
      categories: [
        {
          category: 'Architecture & Design',
          items: [
            {
              question: 'Should we choose REST or GraphQL for our API?',
              answer: 'It depends on your use case. REST is ideal for simple, resource-oriented APIs with predictable access patterns and strong caching needs. GraphQL excels when clients need flexibility to request varying data shapes, especially for mobile apps or complex frontend dashboards. We often recommend a hybrid approach: REST for public-facing APIs and GraphQL for internal frontend consumption.',
            },
            {
              question: 'How do you handle API versioning?',
              answer: 'We use URL-based versioning (e.g., /v1/, /v2/) for public APIs because it is explicit and easy for consumers to understand. For internal APIs, we prefer header-based versioning to keep URLs clean. We maintain backward compatibility within major versions and provide deprecation timelines of at least 6 months for breaking changes.',
            },
            {
              question: 'Can you migrate our existing monolithic API to microservices?',
              answer: 'Yes. We use the strangler fig pattern to incrementally decompose monoliths without disrupting existing consumers. We start by identifying bounded contexts, then extract services one at a time while maintaining API compatibility. Most migrations are completed in 4-8 months depending on the monolith size.',
            },
          ],
        },
        {
          category: 'Performance & Reliability',
          items: [
            {
              question: 'What response times can we expect?',
              answer: 'For typical CRUD operations, our APIs consistently achieve sub-50ms response times at the 95th percentile. Complex aggregation queries typically respond within 100-200ms. We achieve this through multi-layer caching, optimized database queries, and efficient serialization. We set SLA targets during the planning phase and validate them through continuous load testing.',
            },
            {
              question: 'How do you ensure API reliability and uptime?',
              answer: 'We implement multiple reliability patterns: circuit breakers to prevent cascade failures, retry logic with exponential backoff, health check endpoints for load balancer integration, and graceful degradation for non-critical dependencies. Combined with multi-AZ deployments and auto-scaling, our APIs consistently achieve 99.99% uptime.',
            },
            {
              question: 'How do you handle traffic spikes?',
              answer: 'Our APIs are deployed on auto-scaling infrastructure that responds to traffic patterns in under 60 seconds. We implement request queuing, rate limiting with token bucket algorithms, and CDN caching for read-heavy endpoints. For anticipated events like product launches, we run pre-scaling and load tests to validate capacity.',
            },
          ],
        },
        {
          category: 'Integration & Support',
          items: [
            {
              question: 'Do you provide SDKs for API consumers?',
              answer: 'Yes. We auto-generate client SDKs in TypeScript, Python, Java, and Go from the OpenAPI specification. These SDKs include type definitions, error handling, retry logic, and authentication helpers. We also provide Postman collections and interactive documentation for manual testing.',
            },
            {
              question: 'How do you handle breaking changes for existing consumers?',
              answer: 'We follow a strict deprecation policy: announce changes at least 6 months in advance, provide migration guides, and offer parallel running of old and new versions. We use API analytics to identify which consumers use deprecated endpoints and proactively reach out to help them migrate.',
            },
            {
              question: 'What ongoing support do you provide?',
              answer: 'Our API support tiers include 24/7 monitoring with automated incident response, quarterly performance reviews, security patching, and dependency updates. Enterprise clients receive a dedicated API reliability engineer who manages SLA compliance and proactively optimizes performance.',
            },
          ],
        },
      ],
    },
  },

  'web-development': {
    slug: 'web-development',
    serviceName: 'Web Development',
    accentColor: 'blue',
    features: {
      headline: 'Web Applications That Convert and Scale',
      subtitle: 'Modern Full-Stack Web Engineering',
      description: 'We build performant, accessible web applications using modern frameworks and best practices that deliver exceptional user experiences and measurable business results.',
      items: [
        {
          icon: 'globe',
          title: 'Progressive Web Applications',
          description: 'App-like web experiences with offline support, push notifications, and instant loading that work across all devices.',
          details: [
            'Service worker implementation for offline-first functionality and background sync',
            'App manifest configuration for home screen installation and splash screens',
            'Lighthouse score optimization targeting 90+ across all performance categories',
          ],
        },
        {
          icon: 'rocket',
          title: 'Server-Side Rendering & Static Generation',
          description: 'Blazing-fast page loads with SSR and SSG strategies that boost SEO rankings and Core Web Vitals scores.',
          details: [
            'Next.js ISR for dynamic content with CDN-level caching and instant invalidation',
            'Streaming SSR for progressive page rendering and improved Time to First Byte',
            'Automatic static optimization for pages that do not require server-side data',
          ],
        },
        {
          icon: 'palette',
          title: 'UI/UX Design & Design Systems',
          description: 'Cohesive design systems with reusable component libraries that ensure brand consistency and accelerate development.',
          details: [
            'Figma-to-code pipeline with automated component generation and design token sync',
            'Accessibility-first design meeting WCAG 2.2 AA standards across all interactions',
            'Motion design and micro-interactions that enhance usability without compromising performance',
          ],
        },
        {
          icon: 'cart',
          title: 'E-Commerce & Marketplace Development',
          description: 'High-converting online stores with seamless checkout, inventory management, and payment processing.',
          details: [
            'Headless commerce architecture with Shopify, Medusa, or custom backends',
            'One-click checkout optimization with Stripe, PayPal, and Apple Pay integration',
            'Product recommendation engines and dynamic pricing based on user behavior',
          ],
        },
        {
          icon: 'chart',
          title: 'Analytics Dashboards & Data Visualization',
          description: 'Interactive dashboards that transform complex datasets into actionable insights with real-time updates.',
          details: [
            'Custom chart components with D3.js and Recharts for domain-specific visualizations',
            'Real-time data streaming via WebSockets for live monitoring dashboards',
            'Export functionality with PDF, CSV, and scheduled email report generation',
          ],
        },
        {
          icon: 'lock',
          title: 'Authentication & User Management',
          description: 'Secure, frictionless authentication flows with SSO, MFA, and role-based access control.',
          details: [
            'OAuth 2.0 and SAML integration for enterprise SSO with major identity providers',
            'Passwordless authentication via magic links, biometrics, and passkeys',
            'Granular role-based and attribute-based access control for multi-tenant applications',
          ],
        },
        {
          icon: 'search',
          title: 'SEO & Performance Optimization',
          description: 'Technical SEO implementation and performance tuning that drives organic traffic growth and user engagement.',
          details: [
            'Core Web Vitals optimization: LCP under 2.5s, FID under 100ms, CLS under 0.1',
            'Structured data markup for rich search results and knowledge panel eligibility',
            'Image optimization with next-gen formats, lazy loading, and responsive srcsets',
          ],
        },
        {
          icon: 'cog',
          title: 'CMS Integration & Content Management',
          description: 'Flexible content management with headless CMS platforms that empower marketing teams to publish independently.',
          details: [
            'Headless CMS integration with Sanity, Contentful, or Strapi for structured content',
            'Visual editing and live preview capabilities for non-technical content authors',
          ],
        },
      ],
      stats: [
        { label: 'Web Apps Launched', value: '350+' },
        { label: 'Avg. Performance Score', value: '94/100' },
        { label: 'Combined Monthly Users', value: '28M+' },
        { label: 'Conversion Rate Lift', value: '47%' },
      ],
    },
    process: {
      headline: 'End-to-End Web Development Process',
      subtitle: 'From Concept to Launch and Beyond',
      description: 'Our structured development process ensures every web project is delivered on time, on budget, and exceeds expectations.',
      steps: [
        {
          title: 'Discovery & UX Research',
          description: 'Deep-dive into your users, market, and business goals to define a web strategy grounded in real data.',
          icon: 'search',
          details: [
            'User interviews, journey mapping, and competitive analysis to identify opportunities',
            'Information architecture and content strategy development with card sorting exercises',
            'Technical feasibility assessment and performance budget definition',
          ],
        },
        {
          title: 'Design & Prototyping',
          description: 'High-fidelity designs and interactive prototypes validated through user testing before development begins.',
          icon: 'palette',
          details: [
            'Wireframing and rapid prototyping in Figma with stakeholder review cycles',
            'Usability testing with target users to validate navigation and conversion flows',
            'Design system creation with component specifications and interaction patterns',
          ],
        },
        {
          title: 'Frontend & Backend Development',
          description: 'Parallel frontend and backend development with continuous integration and automated quality gates.',
          icon: 'code',
          details: [
            'Component-driven development with Storybook for isolated UI building and testing',
            'API integration with type-safe contracts ensuring frontend-backend alignment',
            'Automated testing at unit, integration, and E2E levels with 85%+ code coverage',
          ],
        },
        {
          title: 'QA, Performance & Accessibility Audit',
          description: 'Comprehensive quality assurance covering cross-browser testing, performance validation, and accessibility compliance.',
          icon: 'check',
          details: [
            'Cross-browser and cross-device testing across 20+ browser-device combinations',
            'Lighthouse CI with performance budgets enforced on every pull request',
            'WCAG 2.2 AA compliance audit with screen reader testing and keyboard navigation validation',
          ],
        },
        {
          title: 'Launch & Growth Optimization',
          description: 'Smooth production deployment followed by data-driven optimization to continuously improve key metrics.',
          icon: 'rocket',
          details: [
            'Zero-downtime deployment with CDN configuration, DNS cutover, and SSL provisioning',
            'Analytics setup with conversion tracking, heatmaps, and session recording',
            'A/B testing framework for ongoing CRO experiments on key landing pages',
          ],
        },
      ],
    },
    techStack: {
      headline: 'Modern Web Technology Stack',
      subtitle: 'Frameworks & Tools We Master',
      description: 'We use the most productive and performant web technologies to deliver exceptional digital experiences.',
      categories: [
        {
          category: 'Frontend Frameworks',
          items: [
            { name: 'React', description: 'Component-based UI development with hooks, context, and concurrent rendering' },
            { name: 'NextJS', description: 'Full-stack React framework with SSR, SSG, ISR, and API routes' },
            { name: 'TypeScript', description: 'End-to-end type safety reducing runtime errors and improving developer velocity' },
            { name: 'TailwindCSS', description: 'Utility-first CSS for rapid, consistent UI development with minimal bundle size' },
          ],
        },
        {
          category: 'Backend & Data',
          items: [
            { name: 'NodeJS', description: 'Event-driven server runtime for high-concurrency web applications' },
            { name: 'PostgreSQL', description: 'Primary relational database with full-text search and JSON support' },
            { name: 'Redis', description: 'Session management, caching, and real-time pub/sub messaging' },
            { name: 'Stripe', description: 'Payment processing with subscriptions, invoicing, and marketplace payouts' },
          ],
        },
        {
          category: 'DevOps & Hosting',
          items: [
            { name: 'Docker', description: 'Containerized development and deployment for environment consistency' },
            { name: 'AWS', description: 'CloudFront, S3, ECS, and RDS for scalable, globally distributed hosting' },
            { name: 'GitHub', description: 'Version control with Actions CI/CD, code review, and automated releases' },
          ],
        },
      ],
    },
    portfolio: {
      headline: 'Web Projects That Drive Business Growth',
      subtitle: 'Selected Case Studies',
      description: 'See how our web development expertise has helped companies increase revenue, improve engagement, and scale operations.',
      items: [
        {
          title: 'B2B SaaS Platform for Supply Chain Management',
          industry: 'Logistics & Supply Chain',
          challenge: 'A supply chain startup needed a web platform that could handle complex multi-step workflows, real-time tracking, and collaboration between shippers, carriers, and warehouses.',
          solution: 'Built a Next.js application with real-time WebSocket updates, role-based dashboards, and a drag-and-drop workflow builder. Implemented Stripe billing with usage-based pricing.',
          results: [
            'Scaled from 0 to 2,400 active business users within 8 months of launch',
            'Achieved 94 Lighthouse performance score with sub-2-second page loads globally',
            'Reduced customer onboarding time from 3 days to 4 hours with self-serve flows',
          ],
          stats: [
            { label: 'Active Users', value: '2,400+' },
            { label: 'Performance Score', value: '94/100' },
          ],
        },
        {
          title: 'E-Commerce Platform Rebuild for Fashion Brand',
          industry: 'Fashion & Retail',
          challenge: 'A DTC fashion brand with $18M in annual online revenue was losing customers due to slow page loads (6.2s average), poor mobile UX, and a 74% cart abandonment rate.',
          solution: 'Rebuilt the storefront on Next.js with headless Shopify, implemented one-click checkout, AI-powered size recommendations, and optimized all Core Web Vitals.',
          results: [
            'Increased conversion rate from 1.8% to 3.4%, driving $6.2M in incremental revenue',
            'Reduced page load time from 6.2s to 1.4s, improving bounce rate by 38%',
            'Decreased cart abandonment from 74% to 51% with optimized checkout flow',
          ],
          stats: [
            { label: 'Revenue Increase', value: '$6.2M' },
            { label: 'Page Load Time', value: '1.4s' },
          ],
        },
        {
          title: 'Patient Portal for Telehealth Platform',
          industry: 'Healthcare',
          challenge: 'A telehealth company needed a HIPAA-compliant patient portal supporting video consultations, prescription management, and medical record access across all devices.',
          solution: 'Developed a PWA with WebRTC video calling, end-to-end encryption, and an accessible UI meeting WCAG 2.2 AA. Integrated with Epic EHR through FHIR APIs.',
          results: [
            'Enabled 45,000 video consultations per month with 99.7% connection success rate',
            'Achieved WCAG 2.2 AA compliance with a perfect accessibility audit score',
            'Reduced patient no-show rate from 23% to 8% with automated reminders and easy rescheduling',
          ],
          stats: [
            { label: 'Monthly Consultations', value: '45K' },
            { label: 'No-Show Reduction', value: '65%' },
          ],
        },
        {
          title: 'Real Estate Marketplace with Virtual Tours',
          industry: 'Real Estate',
          challenge: 'A real estate firm wanted a modern listing marketplace with 3D virtual tours, mortgage calculators, and neighborhood analytics to differentiate from Zillow and Redfin.',
          solution: 'Built a Next.js platform with Three.js virtual tour integration, server-side rendered listing pages for SEO, and real-time market data dashboards with D3.js visualizations.',
          results: [
            'Ranked on page 1 of Google for 340+ local real estate keywords within 6 months',
            'Increased average session duration by 4.2x compared to the previous website',
            'Generated 1,200 qualified leads per month through the platform',
          ],
          stats: [
            { label: 'SEO Keywords (Page 1)', value: '340+' },
            { label: 'Monthly Leads', value: '1,200' },
          ],
        },
      ],
      aggregateStats: [
        { label: 'Web Apps Delivered', value: '350+' },
        { label: 'Combined Monthly Traffic', value: '28M+' },
        { label: 'Avg. Performance Score', value: '94' },
        { label: 'Client Satisfaction', value: '4.9/5' },
      ],
    },
    faq: {
      headline: 'Web Development FAQ',
      subtitle: 'Common Questions',
      description: 'Answers to frequently asked questions about our web development process, technology choices, and engagement models.',
      categories: [
        {
          category: 'Technology & Architecture',
          items: [
            {
              question: 'Why do you recommend Next.js for most web projects?',
              answer: 'Next.js provides the best balance of developer experience, performance, and flexibility. It supports server-side rendering for SEO, static generation for speed, and client-side rendering for interactivity -- all in one framework. Its built-in image optimization, code splitting, and API routes reduce the need for additional tools. For projects that need a different approach, we also work with Remix, Astro, and custom React setups.',
            },
            {
              question: 'Can you work with our existing backend or CMS?',
              answer: 'Absolutely. We frequently build frontends that connect to existing backends via REST or GraphQL APIs. We have deep integration experience with headless CMS platforms (Sanity, Contentful, Strapi), e-commerce backends (Shopify, Medusa), and custom APIs built in Node.js, Python, Java, or .NET.',
            },
            {
              question: 'How do you handle responsive design across devices?',
              answer: 'We follow a mobile-first approach, designing and building for mobile screens first and then enhancing for tablets and desktops. We use CSS Grid, Flexbox, and container queries to create fluid layouts. Every project is tested across 20+ device-browser combinations including iOS Safari, Android Chrome, and desktop browsers.',
            },
          ],
        },
        {
          category: 'Performance & SEO',
          items: [
            {
              question: 'What Core Web Vitals scores can we expect?',
              answer: 'We target and consistently achieve Lighthouse scores of 90+ across Performance, Accessibility, Best Practices, and SEO. Specifically: LCP under 2.5 seconds, FID under 100ms, and CLS under 0.1. We enforce performance budgets in our CI pipeline, so regressions are caught before deployment.',
            },
            {
              question: 'How do you approach SEO for web applications?',
              answer: 'Our SEO strategy covers three pillars: technical SEO (SSR, structured data, sitemap generation, Core Web Vitals), on-page optimization (semantic HTML, heading hierarchy, meta tags), and crawlability (proper internal linking, canonical URLs, robots.txt configuration). For SPAs, we ensure all content is server-rendered for search engine indexing.',
            },
            {
              question: 'Can you help us migrate from an existing platform without losing SEO rankings?',
              answer: 'Yes, platform migrations are one of our specialties. We create comprehensive redirect maps, preserve URL structures where possible, transfer all metadata, and monitor Search Console for crawl errors post-migration. We have completed over 40 migrations with zero ranking loss for high-priority keywords.',
            },
          ],
        },
        {
          category: 'Timeline & Budget',
          items: [
            {
              question: 'How long does a typical web development project take?',
              answer: 'A marketing website or landing page typically takes 4-8 weeks. A full-featured web application with authentication, dashboards, and integrations takes 3-6 months. Complex platforms like marketplaces or SaaS products may take 6-12 months for the initial launch, followed by ongoing iteration. We provide detailed timelines after our discovery phase.',
            },
            {
              question: 'What does web development typically cost?',
              answer: 'Marketing websites and corporate sites range from $25,000-$75,000. Web applications with custom functionality range from $75,000-$250,000. Enterprise SaaS platforms typically start at $200,000+. We offer fixed-price engagements for well-defined scopes and time-and-materials for evolving projects. All estimates are provided after a thorough discovery phase.',
            },
            {
              question: 'Do you provide ongoing maintenance and support?',
              answer: 'Yes. We offer monthly retainer packages that include security updates, dependency maintenance, performance monitoring, bug fixes, and feature enhancements. Most clients invest 15-20% of the initial build cost annually in maintenance to keep their applications secure, fast, and up-to-date.',
            },
          ],
        },
      ],
    },
  },

  'mobile-development': {
    slug: 'mobile-development',
    serviceName: 'Mobile Development',
    accentColor: 'indigo',
    features: {
      headline: 'Native-Quality Mobile Apps, Delivered Fast',
      subtitle: 'Cross-Platform & Native Mobile Engineering',
      description: 'We build high-performance mobile applications that users love, leveraging cross-platform efficiency without sacrificing native feel, speed, or platform-specific capabilities.',
      items: [
        {
          icon: 'mobile',
          title: 'Cross-Platform Development with Flutter',
          description: 'Single codebase apps for iOS and Android with pixel-perfect UI, native performance, and 95%+ code sharing.',
          details: [
            'Custom widget development for brand-specific design systems and interactions',
            'Platform channel integration for accessing native APIs and device capabilities',
            'Hot reload development workflow reducing iteration cycles by 10x versus native',
          ],
        },
        {
          icon: 'lightning',
          title: 'Native iOS & Android Development',
          description: 'Fully native apps for maximum performance, platform integration, and access to the latest OS features.',
          details: [
            'Swift and SwiftUI for iOS with modern concurrency and Combine reactive patterns',
            'Kotlin with Jetpack Compose for Android with Material Design 3 compliance',
            'Platform-specific optimizations for camera, GPU, ARKit, and ML Kit features',
          ],
        },
        {
          icon: 'cloud',
          title: 'Offline-First Architecture',
          description: 'Apps that work flawlessly without internet, syncing seamlessly when connectivity is restored.',
          details: [
            'Local database implementation with SQLite and Hive for structured offline storage',
            'Conflict resolution strategies for multi-device sync with eventual consistency',
            'Background sync with intelligent retry and bandwidth-aware data transfer',
          ],
        },
        {
          icon: 'lock',
          title: 'Mobile Security & Compliance',
          description: 'Enterprise-grade security with biometric authentication, certificate pinning, and encrypted local storage.',
          details: [
            'Biometric authentication with Face ID, Touch ID, and Android BiometricPrompt',
            'SSL certificate pinning and runtime integrity checks to prevent MITM attacks',
            'Encrypted keychain and keystore storage for sensitive credentials and tokens',
          ],
        },
        {
          icon: 'chart',
          title: 'Analytics & User Engagement',
          description: 'In-app analytics, push notifications, and engagement tools that drive retention and lifetime value.',
          details: [
            'Event tracking with Firebase Analytics, Mixpanel, or Amplitude for behavioral insights',
            'Push notification orchestration with segmentation, A/B testing, and deep linking',
            'In-app messaging and feature announcement overlays for user onboarding',
          ],
        },
        {
          icon: 'cog',
          title: 'App Store Optimization & Deployment',
          description: 'Streamlined release management with automated builds, beta testing, and app store listing optimization.',
          details: [
            'CI/CD pipelines with Fastlane for automated signing, building, and store submission',
            'TestFlight and Google Play internal testing tracks for structured beta programs',
            'ASO with keyword optimization, screenshot design, and A/B tested descriptions',
          ],
        },
        {
          icon: 'globe',
          title: 'Backend & API Integration',
          description: 'Seamless integration with REST APIs, GraphQL, WebSockets, and real-time databases for connected experiences.',
          details: [
            'Typed API client generation from OpenAPI specs for compile-time safety',
            'Real-time features with WebSocket and Firebase Realtime Database integration',
            'Efficient data loading with pagination, caching, and optimistic UI updates',
          ],
        },
        {
          icon: 'users',
          title: 'Accessibility & Internationalization',
          description: 'Inclusive apps that reach global audiences with full accessibility support and multi-language capabilities.',
          details: [
            'VoiceOver and TalkBack optimization with semantic tree customization',
            'RTL layout support and locale-aware formatting for dates, numbers, and currencies',
          ],
        },
      ],
      stats: [
        { label: 'Apps Launched', value: '180+' },
        { label: 'Combined Downloads', value: '12M+' },
        { label: 'Avg. Store Rating', value: '4.8' },
        { label: 'Crash-Free Rate', value: '99.7%' },
      ],
    },
    process: {
      headline: 'Mobile Development Process Built for Quality',
      subtitle: 'From Concept to App Store Success',
      description: 'Our mobile development process ensures every app is fast, stable, and delightful to use from day one.',
      steps: [
        {
          title: 'Product Strategy & Platform Assessment',
          description: 'Define your mobile strategy including platform choice, feature prioritization, and go-to-market timeline.',
          icon: 'search',
          details: [
            'User persona development and competitive app analysis across both platforms',
            'Platform recommendation based on target audience, features, and budget constraints',
            'MVP feature scoping with MoSCoW prioritization for phased delivery',
          ],
        },
        {
          title: 'UI/UX Design for Mobile',
          description: 'Platform-native design that follows iOS Human Interface Guidelines and Material Design principles.',
          icon: 'palette',
          details: [
            'Touch-optimized interfaces with gesture navigation and haptic feedback design',
            'Platform-adaptive components that feel native on both iOS and Android',
            'Interactive prototypes tested with real users on physical devices',
          ],
        },
        {
          title: 'Agile Development & Iteration',
          description: 'Two-week sprints with regular beta releases, allowing stakeholders to test on real devices throughout development.',
          icon: 'code',
          details: [
            'Feature branching with automated builds distributed to testers via TestFlight and Firebase App Distribution',
            'Widget and integration testing with 80%+ code coverage requirements',
            'Weekly stakeholder demos with real device testing and feedback integration',
          ],
        },
        {
          title: 'Quality Assurance & Device Testing',
          description: 'Rigorous testing across a matrix of devices, OS versions, and network conditions to ensure reliability.',
          icon: 'check',
          details: [
            'Manual testing on 30+ physical devices covering top 95% of market share',
            'Automated UI testing with integration and end-to-end test suites',
            'Performance profiling for memory leaks, battery drain, and startup time optimization',
          ],
        },
        {
          title: 'Launch & Post-Launch Optimization',
          description: 'Managed app store submission with ongoing monitoring, crash reporting, and iterative improvements.',
          icon: 'rocket',
          details: [
            'App store submission management including review guideline compliance checks',
            'Crashlytics and performance monitoring setup with automated alerting',
            'Post-launch analytics review with data-driven feature roadmap planning',
          ],
        },
      ],
    },
    techStack: {
      headline: 'Mobile Technology Stack',
      subtitle: 'Frameworks & Tools We Use',
      description: 'We choose technologies that deliver the best user experience while maintaining development efficiency and long-term maintainability.',
      categories: [
        {
          category: 'Mobile Frameworks',
          items: [
            { name: 'Flutter', description: 'Cross-platform framework with custom rendering engine for consistent 60fps UI' },
            { name: 'Swift', description: 'Native iOS development with SwiftUI for modern, declarative interfaces' },
            { name: 'Kotlin', description: 'Native Android development with Jetpack Compose and Coroutines' },
            { name: 'React', description: 'React Native for projects requiring deep JavaScript ecosystem integration' },
          ],
        },
        {
          category: 'Backend & Services',
          items: [
            { name: 'NodeJS', description: 'Real-time API servers with WebSocket support for chat and live features' },
            { name: 'FastAPI', description: 'High-performance Python APIs for ML model serving and data processing' },
            { name: 'PostgreSQL', description: 'Primary data storage with row-level security for multi-tenant apps' },
            { name: 'Redis', description: 'Real-time caching, session management, and pub/sub for live features' },
          ],
        },
        {
          category: 'DevOps & Distribution',
          items: [
            { name: 'GitHub', description: 'Version control with Actions for automated builds and code review' },
            { name: 'Google Cloud', description: 'Firebase suite for authentication, analytics, crashlytics, and push notifications' },
            { name: 'Docker', description: 'Containerized backend services for consistent staging and production environments' },
          ],
        },
      ],
    },
    portfolio: {
      headline: 'Mobile Apps Users Love to Use',
      subtitle: 'Selected Case Studies',
      description: 'Explore how our mobile development expertise has helped businesses engage users, streamline operations, and generate revenue.',
      items: [
        {
          title: 'On-Demand Delivery App for Urban Grocery Chain',
          industry: 'Food & Grocery',
          challenge: 'A regional grocery chain with 45 locations needed a mobile ordering app to compete with Instacart and DoorDash, requiring real-time inventory, delivery tracking, and loyalty integration.',
          solution: 'Built a Flutter app with real-time order tracking via WebSockets, barcode scanning for in-store pickup, and a loyalty points system integrated with their existing POS.',
          results: [
            'Achieved 85,000 downloads in the first 3 months with a 4.8-star average rating',
            'Drove 23% of total revenue through mobile orders within 6 months',
            'Increased customer repeat purchase rate by 34% through personalized push offers',
          ],
          stats: [
            { label: 'Downloads (3 months)', value: '85K' },
            { label: 'Mobile Revenue Share', value: '23%' },
          ],
        },
        {
          title: 'Field Service Management App for Utilities',
          industry: 'Energy & Utilities',
          challenge: 'A utility company with 800 field technicians relied on paper forms and phone calls, causing scheduling inefficiencies, missed appointments, and a 6-day average ticket resolution time.',
          solution: 'Developed an offline-first Flutter app with GPS routing, digital work orders, photo documentation, and real-time dispatch integration syncing with their SAP backend.',
          results: [
            'Reduced average ticket resolution time from 6 days to 1.8 days',
            'Eliminated paper-based workflows, saving $420K annually in printing and processing',
            'Improved first-time fix rate from 62% to 89% with mobile access to equipment history',
          ],
          stats: [
            { label: 'Resolution Time', value: '70% Faster' },
            { label: 'Annual Savings', value: '$420K' },
          ],
        },
        {
          title: 'Fitness & Wellness App with Wearable Integration',
          industry: 'Health & Fitness',
          challenge: 'A fitness startup needed a mobile app that integrated with Apple Watch, Fitbit, and Garmin to deliver personalized workout plans, nutrition tracking, and social challenges.',
          solution: 'Built native iOS (Swift) and Android (Kotlin) apps with HealthKit and Google Fit integration, real-time leaderboards, and an ML-powered workout recommendation engine.',
          results: [
            'Reached 200,000 active users with 68% monthly retention rate',
            'Maintained a 4.9-star rating on App Store and 4.7 on Google Play',
            'Users completed 3.2x more workouts per week compared to the previous app version',
          ],
          stats: [
            { label: 'Active Users', value: '200K' },
            { label: 'Monthly Retention', value: '68%' },
          ],
        },
        {
          title: 'Banking App for Digital-First Credit Union',
          industry: 'Financial Services',
          challenge: 'A credit union serving 120,000 members needed a modern mobile banking app with check deposit, P2P transfers, budgeting tools, and biometric login to compete with neobanks.',
          solution: 'Developed a Flutter app with biometric authentication, real-time transaction notifications, Plaid integration for account aggregation, and an AI-powered spending insights dashboard.',
          results: [
            'Achieved 78% member adoption within 12 months, up from 31% on the previous app',
            'Reduced branch visits by 45% as members shifted to self-service mobile banking',
            'Received "Best Credit Union App" recognition from Finovate in 2024',
          ],
          stats: [
            { label: 'Member Adoption', value: '78%' },
            { label: 'Branch Visit Reduction', value: '45%' },
          ],
        },
      ],
      aggregateStats: [
        { label: 'Apps Delivered', value: '180+' },
        { label: 'Total Downloads', value: '12M+' },
        { label: 'Average Rating', value: '4.8/5' },
        { label: 'Platforms Supported', value: 'iOS & Android' },
      ],
    },
    faq: {
      headline: 'Mobile Development FAQ',
      subtitle: 'Common Questions',
      description: 'Answers to frequently asked questions about our mobile app development services, technology choices, and delivery process.',
      categories: [
        {
          category: 'Platform & Technology',
          items: [
            {
              question: 'Should we build a native or cross-platform app?',
              answer: 'For most business applications, we recommend Flutter for cross-platform development. It delivers native-level performance with 95%+ code sharing between iOS and Android, cutting development time and cost by 40-50%. We recommend native development (Swift/Kotlin) when your app requires deep platform integration like AR, advanced camera features, or Bluetooth hardware communication where platform-specific APIs are essential.',
            },
            {
              question: 'Can you convert our existing website into a mobile app?',
              answer: 'We can, but we recommend against simply wrapping a website in a WebView. Instead, we build a purpose-designed mobile experience that leverages native capabilities like push notifications, offline access, biometrics, and camera. We reuse your existing backend APIs and business logic while creating a mobile-optimized UI. This approach typically takes 60-70% of the time of building from scratch.',
            },
            {
              question: 'How do you handle app updates and new OS versions?',
              answer: 'We monitor Apple and Google developer betas starting from their annual conferences (WWDC and Google I/O) and proactively identify breaking changes or new opportunities. Our maintenance plans include OS compatibility updates within 2 weeks of major releases, ensuring your app works perfectly on day one of any new iOS or Android version.',
            },
          ],
        },
        {
          category: 'Development & Testing',
          items: [
            {
              question: 'How long does it take to build a mobile app?',
              answer: 'A focused MVP with core features typically takes 3-4 months. A feature-rich app with authentication, payments, real-time features, and offline support takes 5-8 months. Complex enterprise apps with integrations to multiple backend systems may take 8-12 months. We deliver working builds every 2 weeks so you can test and provide feedback throughout development.',
            },
            {
              question: 'How do you test on different devices?',
              answer: 'We maintain a device lab with 30+ physical devices covering the top 95% of market share for both iOS and Android. We test across multiple OS versions (current and two previous major versions), screen sizes, and network conditions. We also use cloud-based device farms for extended compatibility testing across hundreds of device-OS combinations.',
            },
            {
              question: 'What about app store review and approval?',
              answer: 'We manage the entire submission process including app store listing creation, screenshot design, metadata optimization, and compliance with Apple App Store Review Guidelines and Google Play policies. Our first-submission approval rate is 94%, and we handle any rejection responses promptly. Typical review times are 24-48 hours for both stores.',
            },
          ],
        },
        {
          category: 'Cost & Maintenance',
          items: [
            {
              question: 'What does mobile app development cost?',
              answer: 'A cross-platform MVP starts at $50,000-$100,000. A full-featured app with backend development ranges from $100,000-$300,000. Enterprise apps with complex integrations, compliance requirements, and advanced features typically range from $250,000-$600,000+. Cross-platform development with Flutter typically saves 40-50% compared to building separate native apps.',
            },
            {
              question: 'What ongoing costs should we budget for?',
              answer: 'Plan for Apple Developer ($99/year) and Google Play ($25 one-time) accounts, hosting costs for your backend ($200-$2,000/month depending on scale), push notification services, analytics tools, and maintenance development. Most clients budget 15-20% of the initial build cost annually for updates, OS compatibility, and feature improvements.',
            },
            {
              question: 'Do you offer post-launch support?',
              answer: 'Yes. Our mobile support plans include crash monitoring and bug fixes, OS compatibility updates, performance optimization, security patches, and feature development hours. We offer three tiers: Essential (monitoring and critical fixes), Growth (includes monthly feature development), and Enterprise (dedicated mobile team with SLA guarantees).',
            },
          ],
        },
      ],
    },
  },
  'data-analytics': {
    slug: 'data-analytics',
    serviceName: 'Data Analytics',
    accentColor: 'emerald',
    features: {
      headline: 'Transform Raw Data Into Strategic Insights',
      subtitle: 'Advanced Analytics Solutions',
      description: 'We help organizations unlock the full potential of their data through modern analytics platforms, predictive modeling, and intuitive visualization dashboards that drive informed decision-making at every level.',
      items: [
        {
          icon: 'chart',
          title: 'Business Intelligence Dashboards',
          description: 'Interactive, real-time dashboards that consolidate data from multiple sources into a single pane of glass for executive and operational stakeholders.',
          details: [
            'Drag-and-drop dashboard builder with role-based access controls',
            'Real-time data refresh with sub-second query performance',
            'Embedded analytics with white-label options for client-facing portals',
          ],
        },
        {
          icon: 'brain',
          title: 'Predictive Analytics & Forecasting',
          description: 'Machine learning models that identify trends, forecast demand, and predict customer behavior with measurable accuracy improvements.',
          details: [
            'Time-series forecasting for revenue, inventory, and resource planning',
            'Churn prediction models with actionable retention triggers',
            'Anomaly detection pipelines for fraud and quality assurance',
          ],
        },
        {
          icon: 'database',
          title: 'Data Warehouse Architecture',
          description: 'Scalable, cloud-native data warehouse solutions that centralize structured and unstructured data for fast, reliable querying.',
          details: [
            'Star and snowflake schema design optimized for analytical workloads',
            'Incremental ETL pipelines with data quality validation gates',
          ],
        },
        {
          icon: 'search',
          title: 'Customer Analytics & Segmentation',
          description: 'Deep-dive customer analysis that uncovers behavioral patterns, lifetime value predictions, and micro-segment opportunities.',
          details: [
            'RFM scoring and cohort analysis across acquisition channels',
            'Lookalike audience modeling for targeted marketing campaigns',
            'Attribution modeling across multi-touch customer journeys',
          ],
        },
        {
          icon: 'lightning',
          title: 'Real-Time Stream Processing',
          description: 'Event-driven analytics pipelines that process millions of events per second for time-sensitive business decisions.',
          details: [
            'Apache Kafka and Flink-based streaming architectures',
            'Complex event processing for IoT and clickstream data',
          ],
        },
        {
          icon: 'cog',
          title: 'Data Governance & Quality',
          description: 'Comprehensive data governance frameworks that ensure accuracy, consistency, and compliance across the entire data lifecycle.',
          details: [
            'Automated data cataloging with lineage tracking',
            'Data quality scorecards with threshold-based alerting',
            'GDPR and CCPA compliance automation for PII handling',
          ],
        },
        {
          icon: 'eye',
          title: 'Advanced Data Visualization',
          description: 'Compelling visual narratives that make complex datasets accessible to technical and non-technical audiences alike.',
          details: [
            'Custom D3.js and Plotly visualizations for specialized use cases',
            'Geospatial analytics with interactive map-based dashboards',
          ],
        },
        {
          icon: 'users',
          title: 'Self-Service Analytics Enablement',
          description: 'Empower business users to explore data independently with governed, user-friendly tools and curated datasets.',
          details: [
            'Semantic layer abstraction for business-friendly data exploration',
            'Guided analytics templates for common business questions',
            'Training programs and documentation for analytics adoption',
          ],
        },
      ],
      stats: [
        { label: 'Faster Insights', value: '10x' },
        { label: 'Data Sources Integrated', value: '200+' },
        { label: 'Query Performance Gain', value: '85%' },
        { label: 'Forecast Accuracy', value: '94%' },
      ],
    },
    process: {
      headline: 'Our Data Analytics Process',
      subtitle: 'From Raw Data to Actionable Intelligence',
      description: 'A structured methodology that transforms fragmented data landscapes into unified analytics ecosystems, delivering measurable business outcomes at every stage.',
      steps: [
        {
          title: 'Data Audit & Strategy',
          description: 'We assess your current data infrastructure, identify gaps, and define a roadmap aligned with your business objectives and KPIs.',
          icon: 'search',
          details: [
            'Inventory existing data sources, pipelines, and reporting tools',
            'Stakeholder interviews to map analytics requirements to business goals',
            'Maturity assessment with prioritized recommendations',
          ],
        },
        {
          title: 'Architecture & Pipeline Design',
          description: 'Design a scalable data architecture with automated ingestion, transformation, and storage pipelines built for growth.',
          icon: 'database',
          details: [
            'Cloud-native warehouse and lakehouse architecture design',
            'ETL/ELT pipeline blueprints with error handling and monitoring',
          ],
        },
        {
          title: 'Model Development & Validation',
          description: 'Build and validate predictive models, scoring algorithms, and statistical frameworks using your historical data.',
          icon: 'brain',
          details: [
            'Feature engineering and model training with cross-validation',
            'A/B testing frameworks for model performance comparison',
            'Bias detection and fairness auditing for regulated industries',
          ],
        },
        {
          title: 'Dashboard & Reporting Deployment',
          description: 'Deploy interactive dashboards and automated reports tailored to each stakeholder group within your organization.',
          icon: 'chart',
          details: [
            'Role-based dashboard deployment with SSO integration',
            'Scheduled report generation and distribution automation',
          ],
        },
        {
          title: 'Optimization & Knowledge Transfer',
          description: 'Continuously refine models, optimize query performance, and train your team to maintain and extend the analytics platform.',
          icon: 'rocket',
          details: [
            'Quarterly model retraining and performance benchmarking',
            'Query optimization and cost management for cloud workloads',
            'Hands-on training workshops for analysts and business users',
          ],
        },
      ],
    },
    techStack: {
      headline: 'Analytics Technology Stack',
      subtitle: 'Enterprise-Grade Tools & Platforms',
      description: 'We leverage industry-leading technologies to build analytics solutions that scale with your data volumes and business complexity.',
      categories: [
        {
          category: 'Data Processing & ML',
          items: [
            { name: 'Python', description: 'Primary language for data transformation, statistical analysis, and machine learning workflows' },
            { name: 'scikit-learn', description: 'Classical ML algorithms for classification, regression, and clustering tasks' },
            { name: 'TensorFlow', description: 'Deep learning framework for advanced predictive models and neural network architectures' },
            { name: 'Kafka', description: 'Distributed event streaming for real-time data ingestion and processing pipelines' },
          ],
        },
        {
          category: 'Storage & Databases',
          items: [
            { name: 'PostgreSQL', description: 'Relational database for structured analytical workloads and complex queries' },
            { name: 'MongoDB', description: 'Document store for semi-structured data from APIs, logs, and IoT devices' },
            { name: 'Redis', description: 'In-memory cache layer for dashboard query acceleration and session management' },
            { name: 'Elasticsearch', description: 'Full-text search and log analytics for operational intelligence dashboards' },
          ],
        },
        {
          category: 'Cloud & Infrastructure',
          items: [
            { name: 'AWS', description: 'Redshift, Glue, and Athena for serverless data warehousing and ETL orchestration' },
            { name: 'Google Cloud', description: 'BigQuery and Dataflow for petabyte-scale analytics and stream processing' },
            { name: 'Docker', description: 'Containerized analytics environments for reproducible model training and deployment' },
          ],
        },
      ],
    },
    portfolio: {
      headline: 'Analytics Success Stories',
      subtitle: 'Measurable Impact Across Industries',
      description: 'Real-world examples of how our data analytics solutions have transformed decision-making and driven significant business outcomes for our clients.',
      items: [
        {
          title: 'Retail Demand Forecasting Platform',
          industry: 'Retail & E-Commerce',
          challenge: 'A multi-channel retailer with 400+ SKUs was experiencing chronic overstock and stockout issues, leading to $2.3M in annual waste and lost sales due to inaccurate manual demand forecasting.',
          solution: 'Built an ML-driven demand forecasting platform integrating POS data, weather patterns, promotional calendars, and regional demographics into a unified prediction engine with automated replenishment triggers.',
          results: [
            'Reduced stockout incidents by 62% within the first quarter',
            'Decreased excess inventory carrying costs by $1.1M annually',
            'Achieved 94% forecast accuracy across seasonal and non-seasonal categories',
          ],
          stats: [
            { label: 'Forecast Accuracy', value: '94%' },
            { label: 'Annual Savings', value: '$1.1M' },
          ],
        },
        {
          title: 'Healthcare Patient Flow Analytics',
          industry: 'Healthcare',
          challenge: 'A regional hospital network struggled with emergency department overcrowding and inconsistent patient wait times, resulting in declining patient satisfaction scores and staff burnout.',
          solution: 'Deployed a real-time patient flow analytics dashboard integrating EHR data, staffing schedules, and historical admission patterns to predict surge periods and optimize resource allocation dynamically.',
          results: [
            'Reduced average ED wait times by 34% across three facilities',
            'Improved patient satisfaction scores from 3.2 to 4.5 out of 5',
          ],
          stats: [
            { label: 'Wait Time Reduction', value: '34%' },
            { label: 'Patient Satisfaction', value: '4.5/5' },
          ],
        },
        {
          title: 'Financial Risk Scoring Engine',
          industry: 'Financial Services',
          challenge: 'A mid-size lending institution relied on outdated credit scoring models that produced high false-positive rates, rejecting qualified applicants while approving risky borrowers at unacceptable rates.',
          solution: 'Developed an ensemble ML risk scoring engine combining gradient boosting, logistic regression, and behavioral analytics with explainable AI outputs for regulatory compliance.',
          results: [
            'Reduced default rates by 28% while increasing approval volume by 15%',
            'Decreased manual review queue by 40% through automated risk tiering',
            'Achieved full regulatory compliance with explainable model outputs',
          ],
          stats: [
            { label: 'Default Reduction', value: '28%' },
            { label: 'Approval Increase', value: '15%' },
          ],
        },
      ],
      aggregateStats: [
        { label: 'Analytics Projects Delivered', value: '120+' },
        { label: 'Data Points Processed Daily', value: '5B+' },
        { label: 'Average ROI for Clients', value: '340%' },
        { label: 'Industries Served', value: '18' },
      ],
    },
    faq: {
      headline: 'Data Analytics FAQ',
      subtitle: 'Common Questions Answered',
      description: 'Answers to the most frequently asked questions about our data analytics services, implementation approach, and expected outcomes.',
      categories: [
        {
          category: 'Getting Started',
          items: [
            {
              question: 'How long does a typical analytics project take from kickoff to deployment?',
              answer: 'Most analytics projects follow a phased approach. A focused dashboard or reporting project typically takes 6-8 weeks, while a comprehensive data warehouse and predictive analytics platform ranges from 3-6 months. We deliver incremental value at each phase so you see results early.',
            },
            {
              question: 'What data do we need to have ready before starting?',
              answer: 'You do not need perfectly clean data to begin. Our discovery phase includes a thorough data audit where we assess available sources, identify quality issues, and build remediation plans. We work with whatever data you have, whether it lives in spreadsheets, databases, SaaS platforms, or legacy systems.',
            },
            {
              question: 'Can you work with our existing BI tools like Tableau or Power BI?',
              answer: 'Absolutely. We are tool-agnostic and frequently integrate with existing BI platforms. Whether you use Tableau, Power BI, Looker, or Metabase, we can enhance your current setup or recommend migrations when the business case supports it.',
            },
          ],
        },
        {
          category: 'Technical Implementation',
          items: [
            {
              question: 'How do you handle data from multiple sources with different formats?',
              answer: 'We build robust ETL/ELT pipelines with schema validation, data type normalization, and deduplication logic. Our pipelines handle structured databases, semi-structured APIs, flat files, and streaming data, unifying everything into a consistent analytical model.',
            },
            {
              question: 'What measures do you take to ensure data security and privacy?',
              answer: 'Security is embedded in every layer. We implement encryption at rest and in transit, role-based access controls, data masking for PII, and full audit logging. For regulated industries, we ensure compliance with HIPAA, GDPR, SOC 2, and other relevant frameworks.',
            },
            {
              question: 'How do your predictive models stay accurate over time?',
              answer: 'We implement model monitoring pipelines that track prediction drift, feature distribution changes, and accuracy metrics in production. When performance degrades beyond defined thresholds, automated retraining workflows are triggered using the latest data.',
            },
          ],
        },
        {
          category: 'ROI & Business Impact',
          items: [
            {
              question: 'What kind of ROI can we expect from a data analytics investment?',
              answer: 'ROI varies by use case, but our clients typically see 3-5x return within the first year. Common value drivers include reduced operational costs through process optimization, increased revenue through better customer targeting, and risk reduction through predictive alerting.',
            },
            {
              question: 'How do you measure the success of an analytics project?',
              answer: 'We define success metrics during the strategy phase, aligned with your business KPIs. These might include forecast accuracy improvements, dashboard adoption rates, query performance benchmarks, cost savings, or revenue lift from data-driven decisions.',
            },
            {
              question: 'Do you provide ongoing support after the initial deployment?',
              answer: 'Yes. We offer flexible support tiers that include model retraining, dashboard updates, pipeline monitoring, performance optimization, and ad-hoc analytics requests. Many clients retain us for quarterly business reviews and continuous improvement sprints.',
            },
          ],
        },
      ],
    },
  },
  'conversational-ai': {
    slug: 'conversational-ai',
    serviceName: 'Conversational AI',
    accentColor: 'violet',
    features: {
      headline: 'Intelligent Conversations That Drive Results',
      subtitle: 'Next-Generation AI Communication',
      description: 'We design and deploy conversational AI systems that understand context, remember history, and resolve complex queries, transforming customer interactions from frustrating scripts into natural, productive dialogues.',
      items: [
        {
          icon: 'chat',
          title: 'Enterprise Chatbot Development',
          description: 'Custom-built chatbots powered by large language models that handle complex, multi-turn conversations with human-like understanding and accuracy.',
          details: [
            'Multi-turn dialogue management with context retention across sessions',
            'Intent classification with confidence scoring and graceful fallback routing',
            'Seamless handoff to human agents with full conversation context transfer',
          ],
        },
        {
          icon: 'brain',
          title: 'RAG-Powered Knowledge Assistants',
          description: 'Retrieval-Augmented Generation systems that ground AI responses in your proprietary documents, policies, and knowledge bases for factually accurate answers.',
          details: [
            'Vector embedding pipelines for documents, FAQs, and knowledge articles',
            'Hybrid search combining semantic and keyword retrieval for precision',
            'Source citation and confidence scoring for every generated response',
          ],
        },
        {
          icon: 'globe',
          title: 'Multilingual Conversation Support',
          description: 'AI assistants that fluently communicate in 50+ languages with automatic language detection and culturally appropriate response generation.',
          details: [
            'Real-time language detection and seamless mid-conversation switching',
            'Culturally adapted responses respecting regional communication norms',
          ],
        },
        {
          icon: 'cog',
          title: 'Workflow Automation Agents',
          description: 'AI agents that go beyond answering questions by executing actions, booking appointments, processing orders, and updating records through natural conversation.',
          details: [
            'API-connected agents that perform CRUD operations via conversational commands',
            'Multi-step workflow orchestration with confirmation and rollback capabilities',
            'Integration with CRM, ERP, and ticketing systems for end-to-end automation',
          ],
        },
        {
          icon: 'sparkles',
          title: 'Voice AI & Speech Interfaces',
          description: 'Voice-enabled AI solutions for IVR systems, voice assistants, and speech-to-action interfaces with natural language understanding.',
          details: [
            'Speech-to-text with domain-specific vocabulary fine-tuning',
            'Natural text-to-speech with emotion-aware voice synthesis',
            'Voice biometric authentication for secure self-service interactions',
          ],
        },
        {
          icon: 'search',
          title: 'Conversational Search & Discovery',
          description: 'Replace traditional keyword search with natural language querying that understands user intent and delivers precise, contextual results.',
          details: [
            'Natural language to structured query translation for databases and catalogs',
            'Faceted conversation flows that narrow results through dialogue',
          ],
        },
        {
          icon: 'chart',
          title: 'Analytics & Conversation Intelligence',
          description: 'Deep analytics on conversation patterns, sentiment trends, and resolution rates to continuously optimize AI performance and customer satisfaction.',
          details: [
            'Real-time sentiment analysis and escalation trigger detection',
            'Conversation funnel analytics with drop-off and resolution tracking',
            'Topic clustering to identify emerging customer concerns proactively',
          ],
        },
        {
          icon: 'shield',
          title: 'Safety & Compliance Guardrails',
          description: 'Enterprise-grade safety layers that prevent hallucinations, enforce brand guidelines, and ensure regulatory compliance in every interaction.',
          details: [
            'Content filtering and toxicity detection with configurable thresholds',
            'Brand voice enforcement and off-topic conversation redirection',
          ],
        },
      ],
      stats: [
        { label: 'Resolution Rate', value: '87%' },
        { label: 'Languages Supported', value: '50+' },
        { label: 'Avg Response Time', value: '<2s' },
        { label: 'Customer Satisfaction', value: '4.6/5' },
      ],
    },
    process: {
      headline: 'Our Conversational AI Process',
      subtitle: 'From Concept to Intelligent Assistant',
      description: 'A proven methodology for building conversational AI systems that delight users, reduce operational costs, and scale effortlessly across channels and languages.',
      steps: [
        {
          title: 'Conversation Design & Scoping',
          description: 'We analyze your customer interactions, map conversation flows, and define the AI assistant personality, capabilities, and success metrics.',
          icon: 'chat',
          details: [
            'Audit existing support tickets, chat logs, and call recordings for pattern analysis',
            'Design conversation flow diagrams covering happy paths and edge cases',
            'Define persona, tone of voice, and escalation policies',
          ],
        },
        {
          title: 'Knowledge Base & Data Preparation',
          description: 'Curate, structure, and embed your organizational knowledge into vector stores optimized for fast, accurate retrieval.',
          icon: 'database',
          details: [
            'Document ingestion pipeline with chunking and metadata enrichment',
            'Knowledge gap analysis and content creation for missing coverage areas',
          ],
        },
        {
          title: 'Model Fine-Tuning & Integration',
          description: 'Configure and fine-tune language models on your domain data, then integrate with your existing tech stack and business systems.',
          icon: 'brain',
          details: [
            'Prompt engineering and few-shot optimization for domain accuracy',
            'API integration with CRM, ticketing, and backend business systems',
            'Webhook and event-driven triggers for proactive conversation initiation',
          ],
        },
        {
          title: 'Testing & Safety Validation',
          description: 'Rigorous testing across thousands of conversation scenarios to ensure accuracy, safety, and consistent performance before launch.',
          icon: 'shield',
          details: [
            'Automated test suites covering intent recognition and entity extraction',
            'Red-team testing for adversarial inputs and edge case handling',
          ],
        },
        {
          title: 'Deployment & Continuous Learning',
          description: 'Launch across your chosen channels and implement feedback loops that make the AI smarter with every conversation.',
          icon: 'rocket',
          details: [
            'Phased rollout with A/B testing against existing support channels',
            'Human-in-the-loop review workflows for low-confidence responses',
            'Weekly performance reports with actionable optimization recommendations',
          ],
        },
      ],
    },
    techStack: {
      headline: 'Conversational AI Technology Stack',
      subtitle: 'State-of-the-Art Language Technologies',
      description: 'We combine the most powerful language models with robust engineering frameworks to build conversational AI that is fast, accurate, and enterprise-ready.',
      categories: [
        {
          category: 'AI & Language Models',
          items: [
            { name: 'OpenAI', description: 'GPT-4 and embedding models for high-quality natural language understanding and generation' },
            { name: 'Hugging Face', description: 'Open-source transformer models for domain-specific fine-tuning and on-premise deployments' },
            { name: 'LangChain', description: 'Orchestration framework for building complex, multi-step AI agent workflows with tool calling' },
            { name: 'Python', description: 'Core development language for ML pipelines, API services, and prompt engineering workflows' },
          ],
        },
        {
          category: 'Infrastructure & Data',
          items: [
            { name: 'Redis', description: 'Session and conversation state caching for sub-millisecond context retrieval' },
            { name: 'PostgreSQL', description: 'Persistent storage for conversation history, user profiles, and analytics data' },
            { name: 'Elasticsearch', description: 'Hybrid keyword and vector search for RAG knowledge base retrieval' },
          ],
        },
        {
          category: 'Deployment & Monitoring',
          items: [
            { name: 'Docker', description: 'Containerized microservices for model serving, API gateway, and conversation management' },
            { name: 'Kubernetes', description: 'Auto-scaling orchestration for handling variable conversation volumes' },
            { name: 'AWS', description: 'SageMaker for model hosting, Lambda for serverless processing, and CloudWatch for monitoring' },
            { name: 'Grafana', description: 'Real-time dashboards tracking latency, resolution rates, and conversation quality metrics' },
          ],
        },
      ],
    },
    portfolio: {
      headline: 'Conversational AI Case Studies',
      subtitle: 'AI Assistants Delivering Real Business Value',
      description: 'Explore how our conversational AI solutions have transformed customer support, streamlined operations, and created new engagement channels for organizations across industries.',
      items: [
        {
          title: 'Insurance Claims Virtual Assistant',
          industry: 'Insurance',
          challenge: 'A national insurance provider was losing customers due to slow claims processing, with average handling times exceeding 15 minutes per call and a 35% call abandonment rate during peak periods.',
          solution: 'Deployed a RAG-powered virtual assistant integrated with the claims management system, capable of guiding customers through the entire claims process, uploading documents, checking status, and escalating complex cases to specialists.',
          results: [
            'Reduced average claims handling time from 15 minutes to 4 minutes',
            'Achieved 78% first-contact resolution without human agent involvement',
            'Decreased call abandonment rate from 35% to 8%',
          ],
          stats: [
            { label: 'Handling Time Reduction', value: '73%' },
            { label: 'First-Contact Resolution', value: '78%' },
          ],
        },
        {
          title: 'E-Commerce Shopping Concierge',
          industry: 'Retail & E-Commerce',
          challenge: 'An online fashion retailer struggled with high cart abandonment rates and low product discovery, as customers could not find items matching their preferences among a catalog of 50,000+ products.',
          solution: 'Built a conversational shopping concierge that understands style preferences through natural dialogue, recommends products with visual previews, handles sizing questions, and processes orders directly within the chat interface.',
          results: [
            'Increased average order value by 28% for concierge-assisted purchases',
            'Reduced cart abandonment rate by 19% through proactive conversation triggers',
          ],
          stats: [
            { label: 'AOV Increase', value: '28%' },
            { label: 'Cart Abandonment Drop', value: '19%' },
          ],
        },
        {
          title: 'Internal IT Helpdesk Automation',
          industry: 'Technology',
          challenge: 'A 5,000-employee enterprise was overwhelmed with repetitive IT support tickets for password resets, VPN issues, and software access requests, consuming 60% of helpdesk bandwidth and creating 48-hour resolution backlogs.',
          solution: 'Implemented an AI-powered IT helpdesk bot integrated with Active Directory, ServiceNow, and Okta, automating password resets, access provisioning, and common troubleshooting procedures with full audit trails.',
          results: [
            'Automated 65% of all IT support tickets without human intervention',
            'Reduced average resolution time from 48 hours to 3 minutes for automated requests',
            'Freed 2,400 helpdesk hours annually for complex infrastructure projects',
          ],
          stats: [
            { label: 'Tickets Automated', value: '65%' },
            { label: 'Hours Saved Yearly', value: '2,400' },
          ],
        },
      ],
      aggregateStats: [
        { label: 'Conversations Handled Monthly', value: '2M+' },
        { label: 'AI Assistants Deployed', value: '85+' },
        { label: 'Average CSAT Score', value: '4.6/5' },
        { label: 'Support Cost Reduction', value: '55%' },
      ],
    },
    faq: {
      headline: 'Conversational AI FAQ',
      subtitle: 'Your Questions Answered',
      description: 'Everything you need to know about implementing conversational AI for your business, from technical requirements to expected outcomes and timelines.',
      categories: [
        {
          category: 'Technology & Capabilities',
          items: [
            {
              question: 'What is the difference between a rule-based chatbot and a conversational AI assistant?',
              answer: 'Rule-based chatbots follow pre-defined decision trees and can only handle anticipated questions. Our conversational AI assistants use large language models to understand natural language, handle unexpected queries, maintain context across multi-turn conversations, and generate human-like responses grounded in your knowledge base.',
            },
            {
              question: 'Can the AI assistant access and update data in our existing systems?',
              answer: 'Yes. We build AI agents with tool-calling capabilities that can read and write to your CRM, ticketing system, databases, and third-party APIs. Every action is authenticated, logged, and can require user confirmation before execution for sensitive operations.',
            },
            {
              question: 'How do you prevent the AI from generating incorrect or hallucinated responses?',
              answer: 'We implement multiple safety layers including RAG grounding in your verified knowledge base, confidence thresholds that trigger human handoff, content filtering guardrails, and continuous monitoring with human review of flagged conversations. This layered approach typically achieves over 95% factual accuracy.',
            },
          ],
        },
        {
          category: 'Implementation & Integration',
          items: [
            {
              question: 'Which channels can the conversational AI be deployed on?',
              answer: 'Our solutions support web chat widgets, mobile apps, WhatsApp, Facebook Messenger, Slack, Microsoft Teams, SMS, voice IVR systems, and custom API endpoints. We can deploy across multiple channels simultaneously with a unified conversation history.',
            },
            {
              question: 'How long does it take to build and deploy a conversational AI assistant?',
              answer: 'A focused chatbot with RAG capabilities typically takes 6-10 weeks. More complex deployments involving multiple system integrations, voice capabilities, and multi-language support range from 3-5 months. We deliver a functional MVP within the first 4 weeks.',
            },
            {
              question: 'What happens when the AI cannot answer a question?',
              answer: 'We design graceful escalation paths. When the AI detects low confidence or out-of-scope queries, it seamlessly transfers the conversation to a human agent with full context, including the conversation history, detected intent, and any relevant customer data pulled during the interaction.',
            },
          ],
        },
        {
          category: 'Costs & Maintenance',
          items: [
            {
              question: 'What are the ongoing costs of running a conversational AI system?',
              answer: 'Ongoing costs include LLM API usage (typically $0.01-0.05 per conversation), cloud infrastructure hosting, and optional support retainer. Most clients see a net cost reduction of 40-60% compared to fully human-staffed support operations within the first year.',
            },
            {
              question: 'How do you keep the AI up to date with new products and policy changes?',
              answer: 'We build automated knowledge ingestion pipelines that sync with your content management systems, knowledge bases, and document repositories. When you update a product page or policy document, the AI knowledge base refreshes automatically within hours.',
            },
            {
              question: 'Can we manage and update the AI assistant ourselves after deployment?',
              answer: 'Absolutely. We provide a management dashboard where your team can update knowledge bases, adjust conversation flows, review flagged interactions, and monitor performance metrics. We also offer training sessions to ensure your team is fully self-sufficient.',
            },
          ],
        },
      ],
    },
  },
  'cybersecurity': {
    slug: 'cybersecurity',
    serviceName: 'Cybersecurity',
    accentColor: 'red',
    features: {
      headline: 'Defend Your Digital Assets With Confidence',
      subtitle: 'Comprehensive Security Solutions',
      description: 'We protect organizations from evolving cyber threats through proactive security assessments, robust defense architectures, and 24/7 monitoring, ensuring your data, systems, and reputation remain secure.',
      items: [
        {
          icon: 'shield',
          title: 'Penetration Testing & Vulnerability Assessment',
          description: 'Simulated real-world attacks that identify vulnerabilities in your applications, networks, and infrastructure before malicious actors do.',
          details: [
            'OWASP Top 10 and SANS 25 coverage for web and API penetration testing',
            'Network and infrastructure testing including wireless and cloud environments',
            'Detailed remediation reports with severity-ranked findings and fix guidance',
          ],
        },
        {
          icon: 'eye',
          title: 'Security Operations Center (SOC)',
          description: '24/7 threat monitoring, detection, and incident response powered by AI-enhanced SIEM platforms and experienced security analysts.',
          details: [
            'Real-time log aggregation and correlation across all network endpoints',
            'AI-driven anomaly detection reducing false positives by 70%',
            'Incident response playbooks with automated containment actions',
          ],
        },
        {
          icon: 'lock',
          title: 'Zero Trust Architecture',
          description: 'Design and implement zero trust security frameworks that verify every user, device, and connection regardless of network location.',
          details: [
            'Micro-segmentation strategies isolating workloads and limiting lateral movement',
            'Identity-aware proxy and continuous authentication enforcement',
          ],
        },
        {
          icon: 'cloud',
          title: 'Cloud Security & Compliance',
          description: 'Secure your cloud infrastructure across AWS, Azure, and GCP with misconfig detection, access controls, and compliance automation.',
          details: [
            'Cloud Security Posture Management with automated remediation workflows',
            'IAM policy auditing and least-privilege access enforcement',
            'Compliance mapping for SOC 2, ISO 27001, HIPAA, and PCI DSS frameworks',
          ],
        },
        {
          icon: 'code',
          title: 'Application Security (DevSecOps)',
          description: 'Embed security into every phase of your software development lifecycle with automated scanning, code review, and secure coding practices.',
          details: [
            'SAST and DAST integration into CI/CD pipelines for shift-left security',
            'Dependency vulnerability scanning and software composition analysis',
            'Secure code review and threat modeling for critical application features',
          ],
        },
        {
          icon: 'users',
          title: 'Security Awareness Training',
          description: 'Reduce human-factor risk with engaging, scenario-based security training and realistic phishing simulations for your entire workforce.',
          details: [
            'Customized phishing simulation campaigns with click-rate tracking',
            'Role-based training modules for executives, developers, and general staff',
          ],
        },
        {
          icon: 'document',
          title: 'Compliance & Risk Management',
          description: 'Comprehensive governance, risk, and compliance programs that satisfy regulatory requirements while strengthening your overall security posture.',
          details: [
            'Risk assessment frameworks aligned with NIST, ISO 27001, and CIS Controls',
            'Policy development covering data handling, incident response, and business continuity',
            'Audit preparation and evidence collection automation',
          ],
        },
        {
          icon: 'lightning',
          title: 'Incident Response & Forensics',
          description: 'Rapid incident response capabilities and digital forensics expertise to contain breaches, recover operations, and preserve evidence.',
          details: [
            'Emergency response within 1 hour of incident notification',
            'Digital forensics with chain-of-custody evidence preservation',
            'Post-incident analysis and security improvement roadmaps',
          ],
        },
      ],
      stats: [
        { label: 'Threats Blocked Monthly', value: '15M+' },
        { label: 'Avg Incident Response', value: '<1hr' },
        { label: 'Compliance Frameworks', value: '12+' },
        { label: 'Vulnerabilities Found', value: '50K+' },
      ],
    },
    process: {
      headline: 'Our Cybersecurity Process',
      subtitle: 'Systematic Defense in Depth',
      description: 'A comprehensive security methodology that assesses your risk posture, implements layered defenses, and establishes continuous monitoring to protect your organization against evolving threats.',
      steps: [
        {
          title: 'Security Assessment & Risk Analysis',
          description: 'Conduct thorough evaluation of your current security posture including network architecture, access controls, data flows, and threat exposure.',
          icon: 'search',
          details: [
            'Asset inventory and attack surface mapping across on-premise and cloud environments',
            'Risk scoring based on likelihood, impact, and current control effectiveness',
            'Gap analysis against industry frameworks and regulatory requirements',
          ],
        },
        {
          title: 'Architecture & Policy Design',
          description: 'Design a layered security architecture with policies, procedures, and technical controls tailored to your risk profile and business requirements.',
          icon: 'shield',
          details: [
            'Network segmentation and zero trust architecture blueprints',
            'Security policy suite covering access management, data protection, and incident response',
          ],
        },
        {
          title: 'Implementation & Hardening',
          description: 'Deploy security tools, harden configurations, and establish monitoring infrastructure across your entire technology stack.',
          icon: 'wrench',
          details: [
            'SIEM deployment with custom detection rules and correlation logic',
            'Endpoint protection rollout with EDR and application whitelisting',
            'Network firewall, WAF, and DDoS protection configuration',
          ],
        },
        {
          title: 'Testing & Validation',
          description: 'Validate every control through penetration testing, red team exercises, and tabletop simulations to ensure real-world effectiveness.',
          icon: 'check',
          details: [
            'Full-scope penetration testing covering external, internal, and social engineering vectors',
            'Tabletop exercises simulating ransomware, data breach, and insider threat scenarios',
          ],
        },
        {
          title: 'Continuous Monitoring & Response',
          description: 'Establish ongoing security operations with 24/7 monitoring, regular assessments, and adaptive threat intelligence updates.',
          icon: 'eye',
          details: [
            'SOC monitoring with tiered escalation and automated containment playbooks',
            'Quarterly vulnerability scanning and annual penetration test cycles',
            'Threat intelligence feeds integrated into detection rules for emerging attack patterns',
          ],
        },
      ],
    },
    techStack: {
      headline: 'Security Technology Stack',
      subtitle: 'Defense-Grade Tools & Platforms',
      description: 'We deploy and manage industry-leading security technologies to build resilient defense systems that adapt to the evolving threat landscape.',
      categories: [
        {
          category: 'Monitoring & Detection',
          items: [
            { name: 'Elasticsearch', description: 'Core SIEM data store for log aggregation, threat correlation, and security analytics' },
            { name: 'Grafana', description: 'Security operations dashboards for real-time visibility into threat activity and system health' },
            { name: 'Prometheus', description: 'Infrastructure monitoring and alerting for security-critical systems and network devices' },
            { name: 'Kafka', description: 'High-throughput event streaming for real-time security log processing and threat detection pipelines' },
          ],
        },
        {
          category: 'Infrastructure & Cloud Security',
          items: [
            { name: 'AWS', description: 'GuardDuty, Security Hub, and WAF for comprehensive AWS environment protection' },
            { name: 'Azure', description: 'Sentinel SIEM and Defender for Cloud for Microsoft ecosystem security orchestration' },
            { name: 'Terraform', description: 'Infrastructure-as-code with security policy enforcement and drift detection' },
            { name: 'Docker', description: 'Container security scanning and runtime protection for containerized workloads' },
          ],
        },
        {
          category: 'Application & Code Security',
          items: [
            { name: 'Python', description: 'Custom security automation scripts, vulnerability scanners, and incident response tools' },
            { name: 'Jenkins', description: 'CI/CD pipeline integration for automated SAST, DAST, and dependency scanning' },
            { name: 'Nginx', description: 'Reverse proxy with WAF rules, rate limiting, and TLS termination for application protection' },
          ],
        },
      ],
    },
    portfolio: {
      headline: 'Cybersecurity Case Studies',
      subtitle: 'Protecting Organizations That Matter',
      description: 'Real examples of how our cybersecurity solutions have prevented breaches, achieved compliance, and built resilient security programs for organizations handling sensitive data.',
      items: [
        {
          title: 'Financial Services Security Overhaul',
          industry: 'Financial Services',
          challenge: 'A fintech company processing $2B in annual transactions had no formal security program, outdated firewalls, and had already experienced two minor data incidents that put their banking partnerships at risk.',
          solution: 'Designed and implemented a comprehensive security program including zero trust network architecture, SOC-as-a-Service with 24/7 monitoring, DevSecOps pipeline integration, and SOC 2 Type II compliance framework.',
          results: [
            'Achieved SOC 2 Type II certification within 8 months',
            'Zero security incidents in the 18 months following implementation',
            'Reduced attack surface by 75% through network segmentation and access controls',
          ],
          stats: [
            { label: 'Time to SOC 2', value: '8 months' },
            { label: 'Security Incidents', value: '0' },
          ],
        },
        {
          title: 'Healthcare Data Protection Program',
          industry: 'Healthcare',
          challenge: 'A multi-site healthcare provider storing 3 million patient records needed to achieve HIPAA compliance while modernizing legacy systems that had known vulnerabilities and no centralized security monitoring.',
          solution: 'Implemented end-to-end security controls including encrypted data storage, network micro-segmentation, privileged access management, SIEM deployment with healthcare-specific detection rules, and comprehensive staff security training.',
          results: [
            'Passed HIPAA audit with zero critical findings',
            'Reduced phishing susceptibility from 32% to 4% click rate through training',
          ],
          stats: [
            { label: 'HIPAA Compliance', value: '100%' },
            { label: 'Phishing Click Rate', value: '4%' },
          ],
        },
        {
          title: 'E-Commerce Platform Hardening',
          industry: 'Retail & E-Commerce',
          challenge: 'An e-commerce platform with 500,000 active users was targeted by sophisticated bot attacks, credential stuffing campaigns, and DDoS attempts that caused recurring outages and eroded customer trust.',
          solution: 'Deployed a multi-layered defense including advanced WAF with bot detection, DDoS mitigation, rate limiting, credential stuffing protection, and real-time threat intelligence integration with automated blocking rules.',
          results: [
            'Blocked 99.7% of malicious bot traffic while maintaining legitimate user experience',
            'Eliminated DDoS-related downtime, achieving 99.99% uptime',
            'Reduced fraudulent account creation by 94% through behavioral analysis',
          ],
          stats: [
            { label: 'Bot Traffic Blocked', value: '99.7%' },
            { label: 'Platform Uptime', value: '99.99%' },
          ],
        },
      ],
      aggregateStats: [
        { label: 'Security Assessments Completed', value: '300+' },
        { label: 'Incidents Responded To', value: '1,200+' },
        { label: 'Compliance Certifications Achieved', value: '85+' },
        { label: 'Endpoints Protected', value: '50K+' },
      ],
    },
    faq: {
      headline: 'Cybersecurity FAQ',
      subtitle: 'Security Questions Answered',
      description: 'Common questions about our cybersecurity services, methodologies, and how we help organizations build and maintain strong security postures.',
      categories: [
        {
          category: 'Assessments & Testing',
          items: [
            {
              question: 'How often should we conduct penetration testing?',
              answer: 'We recommend at least annual penetration testing, with quarterly assessments for high-risk environments such as financial services, healthcare, and e-commerce. Additionally, testing should be performed after major infrastructure changes, application releases, or security incidents.',
            },
            {
              question: 'What is the difference between a vulnerability scan and a penetration test?',
              answer: 'A vulnerability scan is an automated tool-based assessment that identifies known vulnerabilities. A penetration test goes further by having skilled security professionals actively attempt to exploit vulnerabilities, chain findings together, and simulate real attacker behavior to assess actual business impact.',
            },
            {
              question: 'Will penetration testing disrupt our production systems?',
              answer: 'We conduct testing with careful scoping and rules of engagement designed to minimize disruption. For production environments, we use non-destructive techniques and schedule intensive testing during maintenance windows. We maintain constant communication and can pause testing immediately if any impact is detected.',
            },
          ],
        },
        {
          category: 'Compliance & Governance',
          items: [
            {
              question: 'Which compliance frameworks do you support?',
              answer: 'We have deep expertise in SOC 2 Type I and II, ISO 27001, HIPAA, PCI DSS, GDPR, NIST Cybersecurity Framework, CIS Controls, and FedRAMP. We also support industry-specific regulations and can map controls across multiple frameworks to reduce audit fatigue.',
            },
            {
              question: 'How long does it take to achieve SOC 2 compliance from scratch?',
              answer: 'For organizations starting without a formal security program, SOC 2 Type I typically takes 4-6 months and Type II requires an additional 6-12 month observation period. We accelerate this timeline by implementing controls in parallel and using automation to reduce manual evidence collection.',
            },
            {
              question: 'Do you help with ongoing compliance maintenance after certification?',
              answer: 'Yes. We provide continuous compliance monitoring that automates evidence collection, tracks control effectiveness, and alerts you to policy deviations. This ensures you remain audit-ready year-round rather than scrambling before annual assessments.',
            },
          ],
        },
        {
          category: 'Managed Security Services',
          items: [
            {
              question: 'What does your SOC-as-a-Service include?',
              answer: 'Our SOC-as-a-Service provides 24/7 threat monitoring, log management, incident detection and response, threat hunting, monthly security reports, and quarterly security reviews. We act as an extension of your team with dedicated analysts who understand your environment.',
            },
            {
              question: 'How do you handle a security incident when detected?',
              answer: 'We follow a structured incident response process: detect and validate the threat, contain it to prevent spread, eradicate the root cause, recover affected systems, and conduct post-incident analysis. We communicate with your team throughout and provide a detailed incident report with improvement recommendations.',
            },
            {
              question: 'Can you integrate with our existing security tools?',
              answer: 'Absolutely. We integrate with all major security platforms including CrowdStrike, SentinelOne, Palo Alto, Fortinet, Okta, and more. Our SIEM can ingest logs from virtually any source, and we build custom detection rules specific to your technology stack and threat profile.',
            },
          ],
        },
      ],
    },
  },
  'devops-cloud': {
    slug: 'devops-cloud',
    serviceName: 'DevOps & Cloud',
    accentColor: 'orange',
    features: {
      headline: 'Accelerate Delivery With Modern Infrastructure',
      subtitle: 'DevOps & Cloud Engineering',
      description: 'We design, build, and manage cloud infrastructure and DevOps pipelines that enable your engineering teams to ship faster, scale effortlessly, and operate with confidence.',
      items: [
        {
          icon: 'cloud',
          title: 'Cloud Architecture & Migration',
          description: 'Strategic cloud migration and architecture design that minimizes risk, reduces costs, and positions your infrastructure for scalable growth.',
          details: [
            'Cloud readiness assessment with workload-by-workload migration planning',
            'Lift-and-shift, re-platforming, and cloud-native refactoring strategies',
            'Multi-cloud and hybrid architecture designs for redundancy and vendor flexibility',
          ],
        },
        {
          icon: 'rocket',
          title: 'CI/CD Pipeline Engineering',
          description: 'Automated build, test, and deployment pipelines that reduce release cycles from weeks to minutes with built-in quality gates.',
          details: [
            'Multi-stage pipelines with automated testing, security scanning, and approval gates',
            'Blue-green and canary deployment strategies for zero-downtime releases',
          ],
        },
        {
          icon: 'server',
          title: 'Infrastructure as Code',
          description: 'Fully codified infrastructure that is version-controlled, peer-reviewed, and reproducible across environments.',
          details: [
            'Terraform and Pulumi modules for reusable, composable infrastructure components',
            'GitOps workflows where infrastructure changes follow the same review process as application code',
            'Environment parity enforcement ensuring dev, staging, and production consistency',
          ],
        },
        {
          icon: 'cog',
          title: 'Container Orchestration',
          description: 'Production-grade Kubernetes clusters and container management platforms that handle scaling, networking, and service discovery automatically.',
          details: [
            'Kubernetes cluster design with multi-tenancy, RBAC, and network policies',
            'Helm chart development and management for standardized application deployments',
            'Service mesh implementation for secure inter-service communication and observability',
          ],
        },
        {
          icon: 'chart',
          title: 'Observability & Monitoring',
          description: 'Comprehensive monitoring, logging, and tracing platforms that give your teams full visibility into system health and performance.',
          details: [
            'Metrics, logs, and traces correlated in unified observability dashboards',
            'Custom alerting with intelligent noise reduction and escalation routing',
          ],
        },
        {
          icon: 'lightning',
          title: 'Performance & Cost Optimization',
          description: 'Continuous infrastructure optimization that balances performance requirements with cloud spending efficiency.',
          details: [
            'Right-sizing analysis for compute, storage, and database instances',
            'Reserved instance and savings plan strategies reducing cloud spend by 30-50%',
            'Auto-scaling policies tuned to actual demand patterns',
          ],
        },
        {
          icon: 'wrench',
          title: 'Site Reliability Engineering',
          description: 'SRE practices and tooling that ensure your systems meet availability targets through error budgets, SLOs, and automated remediation.',
          details: [
            'SLI/SLO definition and error budget tracking for critical services',
            'Automated runbooks for common incident types reducing MTTR',
            'Chaos engineering experiments that validate resilience under failure conditions',
          ],
        },
        {
          icon: 'database',
          title: 'Database Operations & Scaling',
          description: 'Managed database operations including provisioning, replication, backup, disaster recovery, and performance tuning for production workloads.',
          details: [
            'Read replica and sharding strategies for horizontal database scaling',
            'Automated backup schedules with point-in-time recovery and cross-region replication',
          ],
        },
      ],
      stats: [
        { label: 'Deployment Frequency', value: '50x' },
        { label: 'Infrastructure Uptime', value: '99.99%' },
        { label: 'Cloud Cost Savings', value: '40%' },
        { label: 'Deploy Time Reduction', value: '90%' },
      ],
    },
    process: {
      headline: 'Our DevOps & Cloud Process',
      subtitle: 'From Legacy to Modern Infrastructure',
      description: 'A proven methodology that transforms manual, fragile infrastructure into automated, resilient cloud platforms, delivering measurable improvements in speed, reliability, and cost efficiency.',
      steps: [
        {
          title: 'Infrastructure Assessment',
          description: 'Evaluate your current infrastructure, deployment processes, and operational practices to identify bottlenecks and improvement opportunities.',
          icon: 'search',
          details: [
            'Architecture review covering compute, networking, storage, and security layers',
            'CI/CD maturity assessment benchmarked against industry best practices',
            'Cloud cost analysis with waste identification and optimization opportunities',
          ],
        },
        {
          title: 'Architecture & Roadmap Design',
          description: 'Design a target-state cloud architecture and phased migration roadmap that balances speed, risk, and business continuity.',
          icon: 'document',
          details: [
            'Target architecture diagrams with network topology and security boundaries',
            'Migration wave planning prioritizing workloads by complexity and business impact',
          ],
        },
        {
          title: 'Pipeline & Infrastructure Build',
          description: 'Implement CI/CD pipelines, provision cloud infrastructure through code, and set up container orchestration platforms.',
          icon: 'wrench',
          details: [
            'CI/CD pipeline construction with automated testing and deployment stages',
            'Terraform module development for all infrastructure components',
            'Kubernetes cluster provisioning with production-ready configurations',
          ],
        },
        {
          title: 'Migration & Deployment',
          description: 'Execute the migration plan with minimal downtime, validate each workload, and establish monitoring before cutting over production traffic.',
          icon: 'rocket',
          details: [
            'Rolling migration execution with rollback procedures at every stage',
            'Performance benchmarking and load testing in the new environment',
          ],
        },
        {
          title: 'Optimization & Handover',
          description: 'Fine-tune performance, optimize costs, document everything, and train your team to operate and extend the platform independently.',
          icon: 'check',
          details: [
            'Cost optimization pass reducing cloud spending by an average of 35%',
            'Comprehensive runbook and architecture documentation',
            'Team training on IaC workflows, monitoring tools, and incident response procedures',
          ],
        },
      ],
    },
    techStack: {
      headline: 'DevOps & Cloud Technology Stack',
      subtitle: 'Production-Proven Infrastructure Tools',
      description: 'We use battle-tested tools and platforms to build infrastructure that is automated, observable, and resilient at any scale.',
      categories: [
        {
          category: 'Cloud Platforms & IaC',
          items: [
            { name: 'AWS', description: 'Primary cloud platform for compute, networking, storage, and managed services' },
            { name: 'Google Cloud', description: 'GKE, BigQuery, and Cloud Run for Kubernetes and serverless workloads' },
            { name: 'Azure', description: 'AKS, Azure DevOps, and managed database services for Microsoft-centric environments' },
            { name: 'Terraform', description: 'Infrastructure as Code for multi-cloud provisioning with state management and drift detection' },
          ],
        },
        {
          category: 'Containers & Orchestration',
          items: [
            { name: 'Docker', description: 'Container runtime and image building for consistent application packaging' },
            { name: 'Kubernetes', description: 'Production-grade container orchestration with auto-scaling and self-healing' },
            { name: 'Nginx', description: 'Ingress controller and reverse proxy for traffic management and TLS termination' },
            { name: 'Jenkins', description: 'CI/CD automation server for complex build and deployment pipeline orchestration' },
          ],
        },
        {
          category: 'Monitoring & Observability',
          items: [
            { name: 'Prometheus', description: 'Metrics collection and alerting for infrastructure and application monitoring' },
            { name: 'Grafana', description: 'Visualization platform for metrics, logs, and traces in unified dashboards' },
            { name: 'Elasticsearch', description: 'Centralized log management and analysis for troubleshooting and auditing' },
          ],
        },
      ],
    },
    portfolio: {
      headline: 'DevOps & Cloud Case Studies',
      subtitle: 'Infrastructure Transformations That Deliver',
      description: 'See how we have helped organizations modernize their infrastructure, accelerate deployments, and achieve the reliability their customers expect.',
      items: [
        {
          title: 'SaaS Platform Cloud Migration',
          industry: 'Technology (SaaS)',
          challenge: 'A B2B SaaS company with 10,000 customers was running on a single bare-metal server with manual deployments, experiencing monthly outages and unable to scale for a major enterprise contract that required 99.95% SLA.',
          solution: 'Migrated the entire platform to AWS with auto-scaling ECS clusters, RDS Multi-AZ databases, CloudFront CDN, and a fully automated CI/CD pipeline with blue-green deployments and automated rollback capabilities.',
          results: [
            'Achieved 99.99% uptime over 12 months, exceeding the enterprise SLA requirement',
            'Reduced deployment time from 4 hours of manual work to 8 minutes fully automated',
            'Scaled to handle 5x traffic spikes during product launches without intervention',
          ],
          stats: [
            { label: 'Uptime Achieved', value: '99.99%' },
            { label: 'Deploy Time', value: '8 min' },
          ],
        },
        {
          title: 'Fintech Kubernetes Platform',
          industry: 'Financial Services',
          challenge: 'A growing fintech startup had 30 microservices deployed manually across VMs with no standardization, inconsistent environments, and 2-week release cycles that were limiting their ability to compete.',
          solution: 'Built a production Kubernetes platform with Terraform-managed infrastructure, Helm-based deployments, service mesh for secure inter-service communication, and GitOps workflows enabling developers to self-service deploy with confidence.',
          results: [
            'Reduced release cycle from 2 weeks to multiple daily deployments',
            'Decreased infrastructure costs by 42% through efficient container packing and auto-scaling',
          ],
          stats: [
            { label: 'Release Frequency', value: 'Daily' },
            { label: 'Cost Reduction', value: '42%' },
          ],
        },
        {
          title: 'Media Streaming Infrastructure Scaling',
          industry: 'Media & Entertainment',
          challenge: 'A live streaming platform experienced catastrophic failures during peak events with 100,000+ concurrent viewers, resulting in buffering, dropped connections, and significant revenue loss from advertiser churn.',
          solution: 'Re-architected the streaming infrastructure with multi-region CDN distribution, auto-scaling transcoding clusters, Redis-based session management, and comprehensive observability with real-time capacity forecasting.',
          results: [
            'Successfully handled 500,000 concurrent viewers during a major live event with zero buffering',
            'Reduced infrastructure cost per viewer by 60% through intelligent scaling and CDN optimization',
            'Achieved P99 latency under 200ms globally across 12 CDN edge locations',
          ],
          stats: [
            { label: 'Peak Concurrent Users', value: '500K' },
            { label: 'Cost Per Viewer Drop', value: '60%' },
          ],
        },
      ],
      aggregateStats: [
        { label: 'Cloud Migrations Completed', value: '75+' },
        { label: 'Containers in Production', value: '10K+' },
        { label: 'Average Uptime Achieved', value: '99.97%' },
        { label: 'CI/CD Pipelines Built', value: '200+' },
      ],
    },
    faq: {
      headline: 'DevOps & Cloud FAQ',
      subtitle: 'Infrastructure Questions Answered',
      description: 'Common questions about cloud migration, DevOps practices, and how we help engineering teams build and operate modern infrastructure.',
      categories: [
        {
          category: 'Cloud Migration',
          items: [
            {
              question: 'How do you minimize downtime during cloud migrations?',
              answer: 'We use a phased migration approach with parallel environments. Your existing systems continue running while we build and validate the cloud environment. Database migrations use replication-based approaches for near-zero downtime cutover. We always maintain rollback capabilities at every stage.',
            },
            {
              question: 'Which cloud provider do you recommend: AWS, Azure, or Google Cloud?',
              answer: 'The best choice depends on your existing technology stack, team expertise, compliance requirements, and specific workload characteristics. We are multi-cloud experts and will recommend the platform that best fits your needs. Many clients benefit from a primary cloud with specific services from secondary providers.',
            },
            {
              question: 'How long does a typical cloud migration take?',
              answer: 'A focused migration of 5-10 workloads typically takes 2-4 months. Larger enterprise migrations with 50+ workloads, complex dependencies, and compliance requirements range from 6-12 months. We deliver in waves so you see benefits incrementally rather than waiting for a big-bang cutover.',
            },
          ],
        },
        {
          category: 'DevOps Practices',
          items: [
            {
              question: 'What if our team has limited DevOps experience?',
              answer: 'We meet you where you are. Our engagements include hands-on knowledge transfer and pair-programming sessions. We build the initial pipelines and infrastructure, then progressively hand ownership to your team with documentation, training, and transitional support.',
            },
            {
              question: 'How do you handle secrets and sensitive configuration in CI/CD pipelines?',
              answer: 'We implement dedicated secret management using tools like AWS Secrets Manager, HashiCorp Vault, or Azure Key Vault. Secrets are never stored in code repositories. Pipelines access secrets at runtime through secure injection, and all access is audited and role-controlled.',
            },
            {
              question: 'Can you work with our existing CI/CD tools?',
              answer: 'Yes. We have experience with Jenkins, GitHub Actions, GitLab CI, CircleCI, Azure DevOps, and many others. We can optimize your existing pipelines or recommend migrations when the benefits justify the effort. Our focus is on outcomes, not specific tools.',
            },
          ],
        },
        {
          category: 'Cost & Operations',
          items: [
            {
              question: 'How much can we save by migrating to the cloud?',
              answer: 'Cost outcomes vary. Some clients reduce infrastructure costs by 30-50% through right-sizing and reserved capacity. Others see costs increase slightly but gain dramatically in deployment speed, reliability, and scalability. We provide detailed cost projections during the assessment phase.',
            },
            {
              question: 'Do you provide ongoing infrastructure management after migration?',
              answer: 'Yes. We offer managed DevOps services including 24/7 monitoring, incident response, security patching, cost optimization, and infrastructure updates. Many clients start with full management and gradually transition to self-management as their team builds capability.',
            },
            {
              question: 'How do you prevent cloud cost surprises?',
              answer: 'We implement budget alerts, tagging policies for cost allocation, automated reports, and regular cost review sessions. Our infrastructure code includes resource limits and scaling boundaries. We also set up anomaly detection to catch unexpected spend increases before they become significant.',
            },
          ],
        },
      ],
    },
  },
  'digital-marketing': {
    slug: 'digital-marketing',
    serviceName: 'Digital Marketing',
    accentColor: 'pink',
    features: {
      headline: 'Data-Driven Marketing That Converts',
      subtitle: 'Full-Funnel Digital Marketing',
      description: 'We combine creative strategy with analytical rigor to build digital marketing programs that attract qualified leads, nurture prospects, and drive measurable revenue growth across every channel.',
      items: [
        {
          icon: 'search',
          title: 'SEO & Organic Growth',
          description: 'Technical and content SEO strategies that improve search visibility, drive qualified organic traffic, and build sustainable long-term audience acquisition channels.',
          details: [
            'Technical SEO audits covering site speed, crawlability, schema markup, and Core Web Vitals',
            'Keyword research and content strategy aligned with search intent and buyer journey stages',
            'Link building campaigns through digital PR, guest content, and resource-based outreach',
          ],
        },
        {
          icon: 'megaphone',
          title: 'Paid Advertising & PPC',
          description: 'High-performance paid campaigns across Google, Meta, LinkedIn, and programmatic networks with continuous optimization for maximum ROAS.',
          details: [
            'Search, display, and shopping campaign management with audience segmentation',
            'Conversion tracking setup with multi-touch attribution modeling',
          ],
        },
        {
          icon: 'chart',
          title: 'Marketing Analytics & Attribution',
          description: 'Comprehensive analytics infrastructure that tracks every touchpoint and attributes revenue to the channels and campaigns that actually drive results.',
          details: [
            'Cross-channel attribution modeling replacing last-click with data-driven models',
            'Custom dashboard development connecting ad platforms, CRM, and revenue data',
            'Cohort analysis and customer journey mapping for lifecycle optimization',
          ],
        },
        {
          icon: 'cursor',
          title: 'Conversion Rate Optimization',
          description: 'Systematic testing and optimization of landing pages, funnels, and user experiences to maximize the percentage of visitors who become customers.',
          details: [
            'A/B and multivariate testing programs for landing pages and key conversion flows',
            'Heatmap and session recording analysis to identify friction points',
            'Personalization engines delivering tailored experiences based on traffic source and behavior',
          ],
        },
        {
          icon: 'chat',
          title: 'Content Marketing & Strategy',
          description: 'Strategic content programs that establish thought leadership, drive organic traffic, and nurture prospects through the buying journey with valuable, targeted content.',
          details: [
            'Content audits and gap analysis mapped to buyer personas and funnel stages',
            'Blog, whitepaper, case study, and video content production and distribution',
          ],
        },
        {
          icon: 'users',
          title: 'Social Media Marketing',
          description: 'Organic and paid social strategies that build brand awareness, engage communities, and drive qualified traffic from the platforms where your audience spends time.',
          details: [
            'Platform-specific content strategies for LinkedIn, Instagram, Twitter, and TikTok',
            'Community management and social listening for brand sentiment monitoring',
            'Influencer identification and partnership management for expanded reach',
          ],
        },
        {
          icon: 'mobile',
          title: 'Email & Marketing Automation',
          description: 'Automated email and nurture campaigns that deliver the right message to the right person at the right time, driving engagement and conversion throughout the customer lifecycle.',
          details: [
            'Lead scoring and segmentation models for personalized nurture sequences',
            'Behavioral trigger campaigns for cart abandonment, onboarding, and re-engagement',
            'Deliverability optimization ensuring inbox placement rates above 95%',
          ],
        },
        {
          icon: 'globe',
          title: 'International & Multilingual Marketing',
          description: 'Localized marketing strategies for global expansion, including multilingual SEO, culturally adapted campaigns, and region-specific channel optimization.',
          details: [
            'Multilingual keyword research and hreflang implementation for international SEO',
            'Culturally adapted ad creative and landing page localization',
          ],
        },
      ],
      stats: [
        { label: 'Average ROAS', value: '5.2x' },
        { label: 'Organic Traffic Growth', value: '180%' },
        { label: 'Leads Generated', value: '50K+' },
        { label: 'Conversion Rate Lift', value: '65%' },
      ],
    },
    process: {
      headline: 'Our Digital Marketing Process',
      subtitle: 'Strategy-First, Data-Driven Execution',
      description: 'A systematic marketing methodology that starts with deep audience understanding, builds multi-channel strategies, and continuously optimizes based on performance data to maximize your marketing ROI.',
      steps: [
        {
          title: 'Audit & Market Analysis',
          description: 'Comprehensive review of your current marketing performance, competitive landscape, and audience behavior to identify gaps and high-impact opportunities.',
          icon: 'search',
          details: [
            'Channel-by-channel performance audit with benchmarking against industry standards',
            'Competitive analysis covering keywords, ad strategies, content, and market positioning',
            'Audience research including persona development and customer journey mapping',
          ],
        },
        {
          title: 'Strategy & Channel Planning',
          description: 'Develop a data-informed marketing strategy with channel mix, budget allocation, content calendar, and measurable KPIs tied to business objectives.',
          icon: 'document',
          details: [
            'Channel mix optimization based on audience presence and cost-efficiency analysis',
            'Budget allocation model with projected ROI scenarios for each channel',
          ],
        },
        {
          title: 'Campaign Build & Launch',
          description: 'Build campaigns with compelling creative, precise targeting, proper tracking, and quality landing pages optimized for conversion.',
          icon: 'rocket',
          details: [
            'Ad creative development with platform-specific formats and messaging variations',
            'Landing page design and development with conversion-optimized layouts',
            'Tracking and analytics setup with UTM frameworks and conversion event configuration',
          ],
        },
        {
          title: 'Optimization & Testing',
          description: 'Continuous performance optimization through A/B testing, bid management, audience refinement, and creative iteration based on real data.',
          icon: 'chart',
          details: [
            'Weekly bid and budget optimization across all paid channels',
            'Systematic A/B testing roadmap for ads, landing pages, and email campaigns',
          ],
        },
        {
          title: 'Reporting & Scale',
          description: 'Transparent performance reporting with actionable insights, and strategic scaling of winning campaigns and channels for compounding growth.',
          icon: 'lightning',
          details: [
            'Monthly performance reports with executive summaries and channel deep-dives',
            'Quarterly strategy reviews with updated competitive analysis and roadmap adjustments',
            'Budget reallocation recommendations based on marginal ROAS analysis',
          ],
        },
      ],
    },
    techStack: {
      headline: 'Marketing Technology Stack',
      subtitle: 'Integrated Marketing Platforms',
      description: 'We leverage best-in-class marketing technologies to execute, measure, and optimize campaigns across every digital channel.',
      categories: [
        {
          category: 'Web & Content Platforms',
          items: [
            { name: 'WordPress', description: 'Content management for blogs, landing pages, and SEO-optimized web properties' },
            { name: 'Shopify', description: 'E-commerce platform integration for product marketing, cart optimization, and conversion tracking' },
            { name: 'React', description: 'Custom landing page and web application development for high-performance marketing experiences' },
            { name: 'TypeScript', description: 'Type-safe development for marketing automation scripts and analytics integrations' },
          ],
        },
        {
          category: 'Analytics & Data',
          items: [
            { name: 'Python', description: 'Marketing data analysis, attribution modeling, and automated reporting scripts' },
            { name: 'PostgreSQL', description: 'Central marketing data warehouse for cross-channel performance analytics' },
            { name: 'Redis', description: 'Real-time personalization engine caching user segments and behavioral data' },
            { name: 'Figma', description: 'Collaborative design platform for ad creatives, landing pages, and brand assets' },
          ],
        },
        {
          category: 'Automation & AI',
          items: [
            { name: 'NodeJS', description: 'Marketing automation backends, webhook handlers, and API integrations' },
            { name: 'OpenAI', description: 'AI-powered content generation, ad copy optimization, and audience insight extraction' },
            { name: 'Elasticsearch', description: 'Site search optimization and content discovery enhancement for marketing websites' },
          ],
        },
      ],
    },
    portfolio: {
      headline: 'Digital Marketing Success Stories',
      subtitle: 'Campaigns That Drive Real Growth',
      description: 'Examples of how our data-driven marketing strategies have generated leads, increased revenue, and built lasting competitive advantages for businesses across industries.',
      items: [
        {
          title: 'B2B SaaS Lead Generation Engine',
          industry: 'Technology (SaaS)',
          challenge: 'A B2B project management SaaS was relying entirely on outbound sales, spending $180 per lead with low conversion rates, and had virtually no organic search presence despite strong product-market fit.',
          solution: 'Built a full-funnel inbound marketing engine combining SEO-optimized content targeting high-intent keywords, LinkedIn ads with ABM targeting, an automated email nurture sequence, and conversion-optimized landing pages with lead magnets.',
          results: [
            'Reduced cost per qualified lead from $180 to $42 within 6 months',
            'Grew organic search traffic by 320% with 45 first-page keyword rankings',
            'Generated 1,200 marketing-qualified leads per month, up from 150',
          ],
          stats: [
            { label: 'Cost Per Lead Reduction', value: '77%' },
            { label: 'Monthly MQLs', value: '1,200' },
          ],
        },
        {
          title: 'E-Commerce Revenue Scaling Campaign',
          industry: 'Retail & E-Commerce',
          challenge: 'A direct-to-consumer home goods brand was plateauing at $1.2M monthly revenue with rising customer acquisition costs and a 1.8x ROAS on paid advertising that was unsustainable at scale.',
          solution: 'Restructured the entire paid media strategy with improved audience segmentation, dynamic product ads, a robust retargeting funnel, email automation for cart recovery and post-purchase upsells, and a content-driven SEO strategy for organic growth.',
          results: [
            'Scaled monthly revenue from $1.2M to $3.1M within 8 months',
            'Improved paid advertising ROAS from 1.8x to 4.6x across all channels',
          ],
          stats: [
            { label: 'Revenue Growth', value: '158%' },
            { label: 'ROAS Improvement', value: '4.6x' },
          ],
        },
        {
          title: 'Healthcare Patient Acquisition Program',
          industry: 'Healthcare',
          challenge: 'A multi-location dental practice group needed to fill appointment slots across 8 locations in a competitive market, with Google Ads costs rising 40% year-over-year and declining returns from traditional marketing channels.',
          solution: 'Implemented a local SEO strategy for all 8 locations, launched Google Ads with location-specific landing pages, built a review generation system, and created an automated appointment reminder and follow-up email sequence.',
          results: [
            'Increased new patient appointments by 85% across all locations',
            'Reduced cost per appointment booking from $95 to $31',
            'Achieved top-3 Google Map Pack ranking for all 8 locations',
          ],
          stats: [
            { label: 'New Patients Increase', value: '85%' },
            { label: 'Cost Per Booking', value: '$31' },
          ],
        },
      ],
      aggregateStats: [
        { label: 'Ad Spend Managed Annually', value: '$25M+' },
        { label: 'Leads Generated for Clients', value: '150K+' },
        { label: 'Average Client ROAS', value: '5.2x' },
        { label: 'Marketing Campaigns Launched', value: '500+' },
      ],
    },
    faq: {
      headline: 'Digital Marketing FAQ',
      subtitle: 'Marketing Questions Answered',
      description: 'Answers to common questions about our digital marketing services, pricing, timelines, and how we measure and deliver results.',
      categories: [
        {
          category: 'Strategy & Planning',
          items: [
            {
              question: 'How do you determine the right marketing channels for our business?',
              answer: 'We analyze your target audience demographics and behavior, competitive landscape, industry benchmarks, and budget constraints. We then recommend a channel mix based on where your audience is most active and where we can achieve the best cost-efficiency. We validate with small test budgets before scaling.',
            },
            {
              question: 'How long does it take to see results from digital marketing?',
              answer: 'Paid advertising typically delivers measurable results within 2-4 weeks of launch. SEO and content marketing are longer-term investments that usually show significant traction in 3-6 months. We set realistic timelines during strategy development and focus on quick wins while building sustainable growth channels.',
            },
            {
              question: 'What budget do we need to get started with digital marketing?',
              answer: 'Effective campaigns can start with budgets as low as $3,000-5,000 per month for focused single-channel efforts. Multi-channel programs typically require $10,000-25,000 per month for meaningful scale. We design strategies that fit your budget and scale up as we demonstrate ROI.',
            },
          ],
        },
        {
          category: 'Execution & Reporting',
          items: [
            {
              question: 'How do you measure marketing ROI and attribution?',
              answer: 'We implement multi-touch attribution models that track every customer touchpoint from first interaction to closed deal. Our reporting connects ad spend data with CRM revenue data to calculate true ROI by channel, campaign, and content piece. We move beyond vanity metrics to focus on pipeline and revenue impact.',
            },
            {
              question: 'How often do we receive performance reports?',
              answer: 'You receive monthly comprehensive reports with executive summaries, channel-by-channel breakdowns, and actionable recommendations. We also provide real-time dashboard access for day-to-day monitoring. Quarterly strategic reviews include competitive analysis updates and roadmap adjustments.',
            },
            {
              question: 'Do you create the ad creative and content, or do we need to provide it?',
              answer: 'We handle everything in-house including copywriting, graphic design, video editing, and landing page development. Our team includes specialists in ad creative, SEO content writing, and conversion-focused design. We collaborate with your team on brand guidelines and approval workflows.',
            },
          ],
        },
        {
          category: 'Working Together',
          items: [
            {
              question: 'How involved do we need to be in the day-to-day marketing execution?',
              answer: 'We operate as an extension of your team and handle all execution. We typically need your involvement for initial strategy alignment, content approvals, and monthly review meetings. Most clients spend 2-4 hours per month on collaboration. We proactively communicate results and recommendations without requiring micromanagement.',
            },
            {
              question: 'Can you work alongside our internal marketing team?',
              answer: 'Absolutely. Many of our clients have internal marketing resources. We integrate seamlessly, handling specialized channels or overflow work while your team focuses on brand, product marketing, or other priorities. We use shared project management tools and communication channels for full transparency.',
            },
            {
              question: 'What happens if a campaign is not performing well?',
              answer: 'Underperformance triggers our optimization protocol. We analyze the data to diagnose the issue, whether it is targeting, creative, landing page, or offer-related. We then implement rapid tests to course-correct. If a channel consistently underperforms after optimization, we reallocate budget to higher-performing channels and recommend strategic pivots.',
            },
          ],
        },
      ],
    },
  },
  'e-commerce': {
    slug: 'e-commerce',
    serviceName: 'E-Commerce Development',
    accentColor: 'amber',
    features: {
      headline: 'Powerful E-Commerce Solutions',
      subtitle: 'Build Stores That Convert',
      description: 'We design and develop high-performance online stores that turn browsers into buyers, combining stunning design with seamless checkout experiences.',
      items: [
        {
          icon: 'cart',
          title: 'Custom Storefront Design',
          description: 'Beautifully crafted storefronts tailored to your brand identity and optimized for maximum conversions.',
          details: [
            'Responsive product catalogs with advanced filtering and search',
            'Brand-aligned visual design with conversion-focused layouts',
            'A/B tested landing pages for seasonal campaigns',
          ],
        },
        {
          icon: 'lock',
          title: 'Secure Payment Integration',
          description: 'PCI-compliant payment processing with support for multiple gateways and global currencies.',
          details: [
            'Stripe, PayPal, and regional payment gateway integration',
            'Multi-currency support with automatic exchange rate updates',
            'Fraud detection and chargeback prevention systems',
          ],
        },
        {
          icon: 'database',
          title: 'Inventory Management',
          description: 'Real-time inventory tracking across multiple warehouses and sales channels with automated restocking alerts.',
          details: [
            'Multi-warehouse stock synchronization in real time',
            'Automated low-stock alerts and purchase order generation',
            'Variant and bundle management with SKU tracking',
          ],
        },
        {
          icon: 'globe',
          title: 'Multi-Channel Selling',
          description: 'Sell seamlessly across your website, marketplaces, and social media from a single unified dashboard.',
          details: [
            'Amazon, eBay, and Walmart marketplace integrations',
            'Social commerce on Instagram, Facebook, and TikTok',
          ],
        },
        {
          icon: 'chart',
          title: 'Analytics & Reporting',
          description: 'Comprehensive sales analytics with customer behavior tracking and revenue forecasting dashboards.',
          details: [
            'Real-time revenue, AOV, and conversion rate dashboards',
            'Customer lifetime value and cohort analysis',
            'Funnel drop-off analysis with actionable recommendations',
          ],
        },
        {
          icon: 'users',
          title: 'Customer Account Portals',
          description: 'Self-service customer portals with order history, wishlists, loyalty programs, and subscription management.',
          details: [
            'Order tracking with real-time shipping updates',
            'Wishlist, saved carts, and product comparison features',
            'Loyalty points and referral reward systems',
          ],
        },
        {
          icon: 'lightning',
          title: 'Performance Optimization',
          description: 'Blazing-fast page loads and smooth interactions to reduce bounce rates and boost search rankings.',
          details: [
            'Image optimization with lazy loading and CDN delivery',
            'Server-side rendering for instant product page loads',
          ],
        },
        {
          icon: 'search',
          title: 'SEO & Product Discovery',
          description: 'Search engine optimized product pages with intelligent site search and personalized recommendations.',
          details: [
            'Schema markup for rich snippets in search results',
            'AI-powered on-site search with typo tolerance',
            'Personalized product recommendations based on browsing history',
          ],
        },
      ],
      stats: [
        { label: 'Average Conversion Lift', value: '67%' },
        { label: 'Stores Launched', value: '180+' },
        { label: 'Total GMV Processed', value: '$50M+' },
        { label: 'Avg Page Load Time', value: '1.2s' },
      ],
    },
    process: {
      headline: 'Our E-Commerce Development Process',
      subtitle: 'From Concept to Conversions',
      description: 'A proven methodology that transforms your product catalog into a revenue-generating machine, carefully optimized at every stage.',
      steps: [
        {
          title: 'Market & Competitor Analysis',
          description: 'We research your industry, competitors, and target audience to define a winning e-commerce strategy.',
          icon: 'search',
          details: [
            'Competitive landscape audit with pricing and UX benchmarking',
            'Target customer persona development and journey mapping',
            'Platform and technology stack recommendation',
          ],
        },
        {
          title: 'UX Design & Prototyping',
          description: 'Conversion-focused wireframes and high-fidelity mockups tested with real users before development begins.',
          icon: 'palette',
          details: [
            'Mobile-first wireframes for all key shopping flows',
            'Interactive prototypes with user testing sessions',
            'Design system creation for consistent brand presentation',
          ],
        },
        {
          title: 'Storefront Development',
          description: 'Full-stack build of your store with custom features, third-party integrations, and performance optimization.',
          icon: 'code',
          details: [
            'Component-based frontend with headless CMS integration',
            'Payment gateway, shipping, and tax engine setup',
          ],
        },
        {
          title: 'Testing & Quality Assurance',
          description: 'Rigorous testing of the entire shopping experience from browsing to checkout across all devices.',
          icon: 'check',
          details: [
            'Cross-browser and cross-device checkout flow testing',
            'Load testing to handle traffic spikes during sales events',
            'Security audit and PCI compliance verification',
          ],
        },
        {
          title: 'Launch & Growth Optimization',
          description: 'Strategic launch followed by continuous conversion rate optimization and feature enhancements.',
          icon: 'rocket',
          details: [
            'Phased rollout with real-time monitoring dashboards',
            'Post-launch A/B testing on product pages and checkout',
            'Monthly performance reviews with growth recommendations',
          ],
        },
      ],
    },
    techStack: {
      headline: 'E-Commerce Technology Stack',
      subtitle: 'Built on Proven Platforms',
      description: 'We leverage industry-leading e-commerce platforms and tools to build scalable, secure, and feature-rich online stores.',
      categories: [
        {
          category: 'Frontend & Frameworks',
          items: [
            { name: 'NextJS', description: 'Server-rendered React storefronts for lightning-fast page loads and SEO.' },
            { name: 'React', description: 'Dynamic, component-based UI for interactive product browsing experiences.' },
            { name: 'TailwindCSS', description: 'Utility-first CSS for rapidly building custom, responsive store designs.' },
            { name: 'TypeScript', description: 'Type-safe codebase ensuring reliability across complex commerce logic.' },
          ],
        },
        {
          category: 'Commerce & Payments',
          items: [
            { name: 'Shopify', description: 'Enterprise-grade commerce platform with extensive app ecosystem.' },
            { name: 'Stripe', description: 'Flexible payment processing with support for subscriptions and global payments.' },
            { name: 'WordPress', description: 'WooCommerce-powered stores for content-rich commerce experiences.' },
          ],
        },
        {
          category: 'Backend & Infrastructure',
          items: [
            { name: 'NodeJS', description: 'High-performance backend for real-time inventory and order processing.' },
            { name: 'PostgreSQL', description: 'Relational database for complex product catalogs and order management.' },
            { name: 'Redis', description: 'In-memory caching for fast cart operations and session management.' },
            { name: 'AWS', description: 'Scalable cloud hosting with auto-scaling for peak traffic periods.' },
          ],
        },
      ],
    },
    portfolio: {
      headline: 'E-Commerce Success Stories',
      subtitle: 'Stores That Deliver Results',
      description: 'See how we have helped brands across industries launch and scale profitable online stores.',
      items: [
        {
          title: 'Premium Fashion Marketplace',
          industry: 'Fashion & Apparel',
          challenge: 'A luxury fashion brand needed a multi-vendor marketplace that maintained their premium brand experience while scaling to hundreds of independent sellers.',
          solution: 'We built a headless commerce platform on NextJS with Stripe Connect for seller payouts, advanced size filtering, and a virtual try-on integration.',
          results: [
            'Achieved $2.4M in GMV within the first six months',
            'Cart abandonment rate reduced from 78% to 34%',
            'Onboarded 120 independent sellers in the first quarter',
          ],
          stats: [
            { label: 'Revenue Growth', value: '340%' },
            { label: 'Conversion Rate', value: '4.8%' },
          ],
        },
        {
          title: 'Organic Grocery Delivery Platform',
          industry: 'Food & Beverage',
          challenge: 'A regional organic grocery chain wanted to launch same-day delivery with subscription boxes and real-time inventory synced across 12 store locations.',
          solution: 'We developed a custom e-commerce platform with real-time inventory sync, route-optimized delivery scheduling, and a subscription management engine.',
          results: [
            'Processed 8,000+ orders per week within three months',
            'Subscription box retention rate of 82% after six months',
          ],
          stats: [
            { label: 'Weekly Orders', value: '8,000+' },
            { label: 'Retention Rate', value: '82%' },
          ],
        },
        {
          title: 'B2B Industrial Parts Store',
          industry: 'Manufacturing & Industrial',
          challenge: 'A wholesale distributor needed a B2B portal with tiered pricing, bulk ordering, quote requests, and integration with their legacy ERP system.',
          solution: 'We built a custom B2B storefront with role-based pricing, RFQ workflows, net-30 payment terms, and a bi-directional ERP sync using custom APIs.',
          results: [
            'Online orders increased from 5% to 62% of total revenue',
            'Average order processing time reduced from 48 hours to 15 minutes',
            'Customer support tickets decreased by 45% through self-service',
          ],
          stats: [
            { label: 'Online Revenue Share', value: '62%' },
            { label: 'Processing Time', value: '-97%' },
          ],
        },
      ],
      aggregateStats: [
        { label: 'Stores Launched', value: '180+' },
        { label: 'Combined GMV', value: '$50M+' },
        { label: 'Average ROI', value: '420%' },
        { label: 'Client Satisfaction', value: '97%' },
      ],
    },
    faq: {
      headline: 'E-Commerce FAQ',
      subtitle: 'Common Questions Answered',
      description: 'Everything you need to know about our e-commerce development services and how we can help grow your online business.',
      categories: [
        {
          category: 'Platform & Technology',
          items: [
            {
              question: 'Which e-commerce platform is best for my business?',
              answer: 'The ideal platform depends on your scale, budget, and requirements. We typically recommend Shopify for fast launches, WooCommerce for content-heavy stores, and custom headless solutions for high-traffic brands needing maximum flexibility and performance.',
            },
            {
              question: 'Can you migrate my existing store to a new platform?',
              answer: 'Yes, we handle full-service migrations including product data, customer accounts, order history, and SEO redirects. We ensure zero downtime during the transition and verify all data integrity post-migration.',
            },
            {
              question: 'Do you support headless commerce architectures?',
              answer: 'Absolutely. We specialize in headless builds using NextJS as the frontend with Shopify, Medusa, or custom backends. This gives you maximum control over the shopping experience with best-in-class performance.',
            },
          ],
        },
        {
          category: 'Payments & Security',
          items: [
            {
              question: 'What payment methods can you integrate?',
              answer: 'We integrate all major payment processors including Stripe, PayPal, Square, and Authorize.net. We also support Apple Pay, Google Pay, buy-now-pay-later services like Klarna, and cryptocurrency payments.',
            },
            {
              question: 'How do you ensure PCI compliance?',
              answer: 'We use tokenized payment processing through certified gateways, never storing card data on your servers. We implement SSL encryption, secure authentication, and conduct regular security audits to maintain full PCI DSS compliance.',
            },
            {
              question: 'Can you set up international payments and multi-currency?',
              answer: 'Yes, we configure multi-currency storefronts with automatic exchange rate updates, localized pricing, and region-specific payment methods to maximize global conversion rates.',
            },
          ],
        },
        {
          category: 'Growth & Optimization',
          items: [
            {
              question: 'How do you optimize conversion rates?',
              answer: 'We use data-driven A/B testing, heatmap analysis, and funnel optimization to continuously improve your store. Common wins include streamlined checkout flows, better product photography layouts, and personalized recommendations.',
            },
            {
              question: 'Do you offer ongoing support after launch?',
              answer: 'Yes, we provide monthly retainer plans that include performance monitoring, bug fixes, feature enhancements, conversion optimization, and regular security updates to keep your store running smoothly.',
            },
            {
              question: 'Can you integrate with my existing ERP or CRM?',
              answer: 'We build custom integrations with popular ERPs like SAP, NetSuite, and Odoo, as well as CRMs like Salesforce and HubSpot. We ensure bi-directional data sync for orders, inventory, and customer records.',
            },
          ],
        },
      ],
    },
  },
  'machine-learning': {
    slug: 'machine-learning',
    serviceName: 'Machine Learning Solutions',
    accentColor: 'cyan',
    features: {
      headline: 'Intelligent Machine Learning Solutions',
      subtitle: 'AI That Drives Real Business Value',
      description: 'We build and deploy production-grade machine learning systems that automate decisions, uncover insights, and create competitive advantages for your business.',
      items: [
        {
          icon: 'brain',
          title: 'Predictive Analytics',
          description: 'Forecast demand, churn, revenue, and market trends with custom-trained models tailored to your specific business data.',
          details: [
            'Time-series forecasting for demand planning and inventory optimization',
            'Customer churn prediction with actionable retention triggers',
            'Revenue and growth projections with confidence intervals',
          ],
        },
        {
          icon: 'search',
          title: 'Natural Language Processing',
          description: 'Extract meaning from text data with sentiment analysis, entity recognition, document classification, and conversational AI.',
          details: [
            'Sentiment analysis for customer reviews and social media monitoring',
            'Named entity recognition for automated document processing',
            'Custom chatbots and question-answering systems using LLMs',
          ],
        },
        {
          icon: 'eye',
          title: 'Computer Vision',
          description: 'Automated visual inspection, object detection, and image classification for manufacturing, retail, and healthcare applications.',
          details: [
            'Defect detection for manufacturing quality control pipelines',
            'Product recognition and shelf analysis for retail analytics',
          ],
        },
        {
          icon: 'chart',
          title: 'Recommendation Engines',
          description: 'Personalized recommendation systems that increase engagement, cross-sell opportunities, and customer lifetime value.',
          details: [
            'Collaborative and content-based filtering algorithms',
            'Real-time recommendation serving with sub-50ms latency',
            'Continuous model retraining on user interaction data',
          ],
        },
        {
          icon: 'sparkles',
          title: 'Anomaly Detection',
          description: 'Identify fraud, system failures, and unusual patterns in real time across financial, operational, and security data.',
          details: [
            'Transaction fraud detection with real-time scoring',
            'Infrastructure anomaly detection for proactive incident response',
            'Statistical process control for manufacturing quality assurance',
          ],
        },
        {
          icon: 'cog',
          title: 'MLOps & Model Management',
          description: 'End-to-end ML infrastructure for training, versioning, deploying, and monitoring models in production environments.',
          details: [
            'Automated model training pipelines with experiment tracking',
            'A/B testing framework for safe model rollouts',
            'Model performance monitoring with drift detection alerts',
          ],
        },
        {
          icon: 'database',
          title: 'Data Pipeline Engineering',
          description: 'Robust data pipelines that collect, clean, transform, and deliver training data at scale for continuous model improvement.',
          details: [
            'ETL pipelines for structured and unstructured data sources',
            'Feature stores for consistent feature engineering across models',
          ],
        },
        {
          icon: 'shield',
          title: 'Responsible AI & Governance',
          description: 'Bias auditing, explainability tools, and governance frameworks that ensure your AI systems are fair, transparent, and compliant.',
          details: [
            'Model explainability dashboards with SHAP and LIME',
            'Bias detection and mitigation across protected attributes',
            'Regulatory compliance documentation for GDPR and industry standards',
          ],
        },
      ],
      stats: [
        { label: 'Models Deployed', value: '200+' },
        { label: 'Prediction Accuracy', value: '94%+' },
        { label: 'Data Points Processed', value: '5B+' },
        { label: 'Cost Savings Delivered', value: '$30M+' },
      ],
    },
    process: {
      headline: 'Our Machine Learning Process',
      subtitle: 'From Raw Data to Production Models',
      description: 'A rigorous, iterative methodology that ensures your ML investment delivers measurable business outcomes, not just impressive demos.',
      steps: [
        {
          title: 'Problem Framing & Data Audit',
          description: 'We work with stakeholders to define the business problem as a machine learning task and audit available data assets.',
          icon: 'search',
          details: [
            'Business objective translation into measurable ML metrics',
            'Data availability assessment and gap analysis',
            'Feasibility study with expected ROI projections',
          ],
        },
        {
          title: 'Data Engineering & Feature Development',
          description: 'We build data pipelines, clean and transform raw data, and engineer predictive features that power accurate models.',
          icon: 'database',
          details: [
            'Data cleaning, deduplication, and quality validation',
            'Feature engineering with domain-specific transformations',
            'Training and evaluation dataset creation with proper splits',
          ],
        },
        {
          title: 'Model Development & Experimentation',
          description: 'We train and evaluate multiple model architectures, optimize hyperparameters, and select the best performer.',
          icon: 'brain',
          details: [
            'Systematic experimentation across algorithm families',
            'Hyperparameter tuning with Bayesian optimization',
          ],
        },
        {
          title: 'Production Deployment',
          description: 'We deploy models as scalable APIs or embedded systems with monitoring, logging, and automated rollback capabilities.',
          icon: 'rocket',
          details: [
            'Containerized model serving with auto-scaling infrastructure',
            'CI/CD pipelines for automated model validation and deployment',
            'Real-time and batch prediction endpoint configuration',
          ],
        },
        {
          title: 'Monitoring & Continuous Improvement',
          description: 'We monitor model performance in production and retrain on fresh data to maintain accuracy as conditions change.',
          icon: 'chart',
          details: [
            'Automated drift detection with alerting thresholds',
            'Scheduled model retraining on updated data',
            'Performance dashboards with business impact tracking',
          ],
        },
      ],
    },
    techStack: {
      headline: 'Machine Learning Technology Stack',
      subtitle: 'Industry-Leading ML Frameworks',
      description: 'We use best-in-class tools and frameworks to build, train, and deploy machine learning models at production scale.',
      categories: [
        {
          category: 'ML Frameworks',
          items: [
            { name: 'TensorFlow', description: 'End-to-end ML platform for building and deploying deep learning models at scale.' },
            { name: 'PyTorch', description: 'Flexible deep learning framework preferred for research and rapid prototyping.' },
            { name: 'scikit-learn', description: 'Comprehensive library for classical ML algorithms and data preprocessing.' },
            { name: 'Keras', description: 'High-level API for fast neural network experimentation and prototyping.' },
          ],
        },
        {
          category: 'NLP & Specialized',
          items: [
            { name: 'Hugging Face', description: 'State-of-the-art transformer models for NLP, vision, and multi-modal tasks.' },
            { name: 'Python', description: 'The foundational language for data science and machine learning workflows.' },
            { name: 'FastAPI', description: 'High-performance API framework for serving ML model predictions.' },
          ],
        },
        {
          category: 'Infrastructure & Data',
          items: [
            { name: 'AWS', description: 'Cloud infrastructure with SageMaker for managed ML training and deployment.' },
            { name: 'Docker', description: 'Containerized model environments for reproducible training and serving.' },
            { name: 'PostgreSQL', description: 'Feature store and metadata management for ML experiment tracking.' },
            { name: 'Redis', description: 'Low-latency feature serving and model prediction caching.' },
          ],
        },
      ],
    },
    portfolio: {
      headline: 'Machine Learning Case Studies',
      subtitle: 'AI Solutions in Production',
      description: 'Explore how our ML solutions are driving measurable business impact across industries.',
      items: [
        {
          title: 'Predictive Maintenance for Fleet Management',
          industry: 'Logistics & Transportation',
          challenge: 'A logistics company with 2,000+ vehicles was losing $4M annually to unplanned breakdowns and reactive maintenance schedules.',
          solution: 'We built a predictive maintenance system using sensor telemetry data and gradient-boosted models to forecast component failures 2-4 weeks in advance.',
          results: [
            'Reduced unplanned downtime by 73% in the first year',
            'Annual maintenance cost savings of $2.8M',
            'Vehicle availability increased from 84% to 96%',
          ],
          stats: [
            { label: 'Downtime Reduction', value: '73%' },
            { label: 'Annual Savings', value: '$2.8M' },
          ],
        },
        {
          title: 'Real-Time Fraud Detection System',
          industry: 'Financial Services',
          challenge: 'A fintech processing 500K daily transactions needed to reduce fraud losses while maintaining a sub-100ms approval latency.',
          solution: 'We developed an ensemble model combining gradient boosting and neural networks, deployed on a streaming architecture with real-time feature computation.',
          results: [
            'Fraud detection rate improved from 67% to 94%',
            'False positive rate reduced by 58%, improving customer experience',
          ],
          stats: [
            { label: 'Detection Rate', value: '94%' },
            { label: 'Latency', value: '<50ms' },
          ],
        },
        {
          title: 'Customer Churn Prediction Platform',
          industry: 'SaaS & Technology',
          challenge: 'A B2B SaaS company with 15,000 accounts had an annual churn rate of 18% and no systematic way to identify at-risk customers.',
          solution: 'We built a churn prediction model using product usage data, support tickets, and billing patterns, integrated directly into their CRM with automated alerts.',
          results: [
            'Identified 82% of churning customers 60+ days before cancellation',
            'Targeted retention campaigns reduced churn from 18% to 11%',
            'Saved an estimated $3.2M in annual recurring revenue',
          ],
          stats: [
            { label: 'Churn Reduction', value: '39%' },
            { label: 'ARR Saved', value: '$3.2M' },
          ],
        },
      ],
      aggregateStats: [
        { label: 'Models in Production', value: '200+' },
        { label: 'Avg Accuracy', value: '94%+' },
        { label: 'Client Cost Savings', value: '$30M+' },
        { label: 'Industries Served', value: '15+' },
      ],
    },
    faq: {
      headline: 'Machine Learning FAQ',
      subtitle: 'Your ML Questions Answered',
      description: 'Common questions about our machine learning services, from feasibility to deployment and ongoing maintenance.',
      categories: [
        {
          category: 'Getting Started',
          items: [
            {
              question: 'How do I know if my business problem is a good fit for machine learning?',
              answer: 'Good ML candidates involve repetitive decisions, large data volumes, and clear success metrics. We offer a free feasibility assessment where we evaluate your data assets, define the problem as an ML task, and estimate potential ROI before any commitment.',
            },
            {
              question: 'How much data do I need to get started?',
              answer: 'It depends on the problem complexity. Simple classification tasks may need a few thousand labeled examples, while deep learning models require much more. We can also use transfer learning and data augmentation techniques to work effectively with smaller datasets.',
            },
            {
              question: 'How long does a typical ML project take?',
              answer: 'A proof-of-concept typically takes 4-8 weeks, while a full production deployment ranges from 3-6 months. Timeline depends on data readiness, problem complexity, and integration requirements. We deliver in iterative milestones so you see progress early.',
            },
          ],
        },
        {
          category: 'Technical & Deployment',
          items: [
            {
              question: 'Can ML models run in real time for our application?',
              answer: 'Yes, we specialize in low-latency model serving. Most of our production models respond in under 50ms. We use optimized inference frameworks, model distillation, and caching strategies to meet even the most demanding latency requirements.',
            },
            {
              question: 'How do you handle model accuracy degradation over time?',
              answer: 'We implement automated monitoring that tracks prediction accuracy, data drift, and concept drift. When performance drops below thresholds, our pipelines automatically trigger retraining on fresh data and validate the new model before promoting it to production.',
            },
            {
              question: 'Can you integrate ML models with our existing systems?',
              answer: 'Absolutely. We deploy models as REST APIs, embed them in batch processing pipelines, or integrate directly into your application code. We work with your engineering team to ensure seamless integration with existing databases, CRMs, and business tools.',
            },
          ],
        },
        {
          category: 'Cost & ROI',
          items: [
            {
              question: 'What is the typical ROI of an ML project?',
              answer: 'Our clients typically see 3-10x ROI within the first year. Returns come from cost savings through automation, revenue increases from personalization, and loss prevention through fraud and anomaly detection. We define ROI metrics upfront during project scoping.',
            },
            {
              question: 'What are the ongoing costs of running ML in production?',
              answer: 'Ongoing costs include cloud compute for model serving, data storage, and periodic retraining. We optimize infrastructure costs through efficient model architectures and auto-scaling. Most clients spend $500-5,000 monthly on ML infrastructure depending on scale.',
            },
            {
              question: 'Do you offer a proof-of-concept phase before full investment?',
              answer: 'Yes, we always recommend starting with a focused POC that validates the approach on a subset of data. This typically takes 4-8 weeks and gives you confidence in the model performance before committing to full production deployment.',
            },
          ],
        },
      ],
    },
  },
  'python-automation': {
    slug: 'python-automation',
    serviceName: 'Python Automation',
    accentColor: 'emerald',
    features: {
      headline: 'Intelligent Python Automation',
      subtitle: 'Automate Everything That Slows You Down',
      description: 'We build custom Python automation solutions that eliminate manual tasks, streamline operations, and free your team to focus on high-value work.',
      items: [
        {
          icon: 'cog',
          title: 'Workflow Automation',
          description: 'End-to-end automation of repetitive business processes from data entry to report generation and beyond.',
          details: [
            'Multi-step workflow orchestration with error handling and retries',
            'Email parsing, document processing, and automated responses',
            'Scheduled and event-triggered automation pipelines',
          ],
        },
        {
          icon: 'database',
          title: 'Data Pipeline Automation',
          description: 'Automated ETL pipelines that collect, clean, transform, and deliver data from any source to any destination.',
          details: [
            'API, database, and file-based data extraction from 100+ sources',
            'Data validation, deduplication, and quality checks',
            'Automated loading into data warehouses and analytics platforms',
          ],
        },
        {
          icon: 'document',
          title: 'Report Generation',
          description: 'Automated creation of business reports, dashboards, and executive summaries from raw data sources.',
          details: [
            'PDF, Excel, and HTML report generation with custom branding',
            'Automated chart and visualization creation from live data',
          ],
        },
        {
          icon: 'globe',
          title: 'Web Scraping & Data Collection',
          description: 'Reliable web scraping solutions that collect structured data from websites, APIs, and online platforms at scale.',
          details: [
            'Anti-detection scraping with proxy rotation and rate limiting',
            'Dynamic page rendering for JavaScript-heavy websites',
            'Structured data extraction with validation and deduplication',
          ],
        },
        {
          icon: 'cloud',
          title: 'Cloud & Infrastructure Automation',
          description: 'Automated provisioning, deployment, and management of cloud resources and development infrastructure.',
          details: [
            'Infrastructure-as-code with automated provisioning scripts',
            'CI/CD pipeline automation for testing and deployment',
            'Automated backup, monitoring, and scaling operations',
          ],
        },
        {
          icon: 'lightning',
          title: 'System Integration',
          description: 'Connect disparate systems with custom API integrations that keep your tools and data in perfect sync.',
          details: [
            'REST and GraphQL API integration with authentication handling',
            'Bi-directional data sync between SaaS platforms',
            'Webhook listeners and event-driven processing pipelines',
          ],
        },
        {
          icon: 'chat',
          title: 'Bot & Notification Automation',
          description: 'Custom bots for Slack, Teams, Discord, and email that automate notifications, approvals, and routine tasks.',
          details: [
            'Slack and Teams bots for automated alerts and approvals',
            'Email automation with smart templates and conditional logic',
          ],
        },
        {
          icon: 'wrench',
          title: 'Testing Automation',
          description: 'Automated testing frameworks for web applications, APIs, and data pipelines to ensure quality at every release.',
          details: [
            'End-to-end browser testing with Selenium and Playwright',
            'API contract testing and integration test suites',
            'Data pipeline validation and regression testing frameworks',
          ],
        },
      ],
      stats: [
        { label: 'Hours Saved Monthly', value: '50K+' },
        { label: 'Automations Built', value: '500+' },
        { label: 'Avg Time Savings', value: '85%' },
        { label: 'Error Rate Reduction', value: '96%' },
      ],
    },
    process: {
      headline: 'Our Automation Process',
      subtitle: 'From Manual Pain to Automated Gain',
      description: 'A structured approach to identifying, building, and scaling automation that delivers immediate time savings and long-term operational efficiency.',
      steps: [
        {
          title: 'Process Discovery & Audit',
          description: 'We map your current workflows, identify automation opportunities, and quantify the time and cost savings for each.',
          icon: 'search',
          details: [
            'Stakeholder interviews to document manual workflows',
            'Time-and-motion analysis to quantify automation ROI',
            'Priority matrix ranking opportunities by impact and feasibility',
          ],
        },
        {
          title: 'Solution Architecture',
          description: 'We design the automation architecture including data flows, error handling, scheduling, and integration points.',
          icon: 'code',
          details: [
            'System integration mapping and API documentation review',
            'Error handling and retry strategy design',
          ],
        },
        {
          title: 'Development & Integration',
          description: 'We build the automation scripts, connect to your systems, and implement comprehensive error handling and logging.',
          icon: 'wrench',
          details: [
            'Modular Python scripts with clean, maintainable architecture',
            'API integrations with authentication and rate limit handling',
            'Comprehensive logging and error notification setup',
          ],
        },
        {
          title: 'Testing & Validation',
          description: 'We rigorously test every automation path including edge cases, failure scenarios, and data validation rules.',
          icon: 'check',
          details: [
            'Unit and integration testing for all automation components',
            'Edge case and failure scenario testing with rollback verification',
            'Parallel run with manual process to validate accuracy',
          ],
        },
        {
          title: 'Deployment & Monitoring',
          description: 'We deploy automations to production with monitoring dashboards and handoff documentation for your team.',
          icon: 'rocket',
          details: [
            'Production deployment with scheduled execution setup',
            'Monitoring dashboards with success rates and error tracking',
            'Team training and comprehensive runbook documentation',
          ],
        },
      ],
    },
    techStack: {
      headline: 'Python Automation Tech Stack',
      subtitle: 'Battle-Tested Python Tools',
      description: 'We use the most reliable Python libraries and frameworks to build automations that run flawlessly in production.',
      categories: [
        {
          category: 'Core Python & Frameworks',
          items: [
            { name: 'Python', description: 'The backbone of all our automation solutions with a rich standard library.' },
            { name: 'FastAPI', description: 'High-performance API framework for building automation service endpoints.' },
            { name: 'Django', description: 'Full-featured web framework for automation dashboards and admin interfaces.' },
            { name: 'Flask', description: 'Lightweight framework for simple webhook receivers and microservices.' },
          ],
        },
        {
          category: 'Data & Processing',
          items: [
            { name: 'PostgreSQL', description: 'Reliable database for automation state management and audit logging.' },
            { name: 'MongoDB', description: 'Flexible document storage for unstructured automation data.' },
            { name: 'Redis', description: 'Task queuing and caching for high-throughput automation pipelines.' },
          ],
        },
        {
          category: 'Infrastructure',
          items: [
            { name: 'Docker', description: 'Containerized automation environments for consistent execution everywhere.' },
            { name: 'AWS', description: 'Cloud functions and scheduled tasks for serverless automation hosting.' },
            { name: 'NodeJS', description: 'Event-driven services for webhook processing and real-time integrations.' },
          ],
        },
      ],
    },
    portfolio: {
      headline: 'Automation Success Stories',
      subtitle: 'Real Results From Real Automations',
      description: 'See how our Python automation solutions have transformed operations for businesses across industries.',
      items: [
        {
          title: 'Financial Reporting Automation',
          industry: 'Accounting & Finance',
          challenge: 'A mid-size accounting firm spent 200+ hours monthly manually compiling financial reports from five different data sources for 80 clients.',
          solution: 'We built an automated pipeline that pulls data from QuickBooks, bank APIs, and spreadsheets, reconciles transactions, and generates branded PDF reports with variance analysis.',
          results: [
            'Report generation time reduced from 2.5 hours to 4 minutes per client',
            'Monthly time savings of 190 hours across the team',
            'Data accuracy improved from 94% to 99.8%',
          ],
          stats: [
            { label: 'Time Savings', value: '97%' },
            { label: 'Accuracy', value: '99.8%' },
          ],
        },
        {
          title: 'E-Commerce Inventory Sync',
          industry: 'Retail & E-Commerce',
          challenge: 'A multi-channel retailer selling on Amazon, Shopify, and eBay had constant overselling issues due to inventory counts being updated manually across platforms.',
          solution: 'We developed a real-time inventory synchronization system that monitors stock levels across all channels and updates quantities within seconds of each sale.',
          results: [
            'Overselling incidents dropped from 45 per month to zero',
            'Inventory update latency reduced from 4 hours to under 10 seconds',
          ],
          stats: [
            { label: 'Overselling', value: '0/month' },
            { label: 'Sync Latency', value: '<10s' },
          ],
        },
        {
          title: 'HR Onboarding Automation',
          industry: 'Human Resources',
          challenge: 'A growing tech company onboarding 30+ employees monthly was drowning in manual tasks across six different HR, IT, and communication platforms.',
          solution: 'We automated the entire onboarding workflow from offer acceptance to day-one readiness, including account provisioning, equipment requests, training assignments, and welcome communications.',
          results: [
            'Onboarding setup time reduced from 3 hours to 8 minutes per hire',
            'New hire satisfaction scores increased by 34%',
            'Zero missed onboarding steps since automation deployment',
          ],
          stats: [
            { label: 'Setup Time', value: '-96%' },
            { label: 'Completion Rate', value: '100%' },
          ],
        },
      ],
      aggregateStats: [
        { label: 'Automations Deployed', value: '500+' },
        { label: 'Hours Saved Monthly', value: '50K+' },
        { label: 'Error Reduction', value: '96%' },
        { label: 'Client Retention', value: '98%' },
      ],
    },
    faq: {
      headline: 'Python Automation FAQ',
      subtitle: 'Automation Questions Answered',
      description: 'Everything you need to know about our Python automation services and how they can transform your operations.',
      categories: [
        {
          category: 'Feasibility & Scope',
          items: [
            {
              question: 'What kinds of tasks can be automated with Python?',
              answer: 'Nearly any repetitive digital task can be automated including data entry, file processing, report generation, email handling, web scraping, API integrations, testing, and system administration. If a human does it on a computer repeatedly, we can likely automate it.',
            },
            {
              question: 'How do you determine which processes to automate first?',
              answer: 'We use a priority matrix that evaluates each process based on time spent, frequency, error rate, and complexity. We start with high-frequency, rule-based tasks that deliver the fastest ROI, then progressively tackle more complex workflows.',
            },
            {
              question: 'Can you automate processes that involve multiple systems?',
              answer: 'Yes, cross-system automation is our specialty. We connect any combination of APIs, databases, spreadsheets, email, web applications, and desktop software into unified automated workflows with proper error handling at every integration point.',
            },
          ],
        },
        {
          category: 'Reliability & Maintenance',
          items: [
            {
              question: 'What happens when an automation fails?',
              answer: 'Every automation we build includes comprehensive error handling with automatic retries, fallback procedures, and instant notification to your team via Slack, email, or SMS. We also maintain detailed logs for rapid troubleshooting.',
            },
            {
              question: 'How do you handle changes in third-party APIs or websites?',
              answer: 'We build our automations with resilience in mind, using version-pinned API clients and adaptive scraping strategies. Our monitoring detects breaking changes immediately, and we provide maintenance plans that include prompt updates when external services change.',
            },
            {
              question: 'Do automations need ongoing maintenance?',
              answer: 'Well-built automations require minimal maintenance, but external dependencies can change. We offer monthly maintenance plans that include monitoring, dependency updates, and adjustments when connected systems evolve. Most automations run autonomously for months between updates.',
            },
          ],
        },
        {
          category: 'Cost & Timeline',
          items: [
            {
              question: 'How long does it take to build a custom automation?',
              answer: 'Simple single-system automations take 1-2 weeks. Multi-system workflows with complex business logic typically take 3-6 weeks. Large-scale automation platforms with dashboards and reporting take 2-3 months. We deliver in weekly sprints so you see progress immediately.',
            },
            {
              question: 'What is the typical ROI of automation projects?',
              answer: 'Most clients achieve full ROI within 2-4 months. A typical automation saving 20 hours per week pays for itself within the first month. We provide detailed ROI projections during the discovery phase so you can make informed investment decisions.',
            },
            {
              question: 'Can my team maintain the automations after handoff?',
              answer: 'Absolutely. We write clean, well-documented Python code and provide comprehensive runbooks. We also offer optional training sessions to upskill your team on maintaining and extending the automations independently.',
            },
          ],
        },
      ],
    },
  },
  'ui-ux-design': {
    slug: 'ui-ux-design',
    serviceName: 'UI/UX Design',
    accentColor: 'rose',
    features: {
      headline: 'Human-Centered UI/UX Design',
      subtitle: 'Design That Delights and Converts',
      description: 'We create intuitive, beautiful digital experiences grounded in user research and validated through testing, ensuring every pixel serves a purpose.',
      items: [
        {
          icon: 'users',
          title: 'User Research & Discovery',
          description: 'Deep qualitative and quantitative research to understand your users, their goals, frustrations, and decision-making patterns.',
          details: [
            'User interviews, surveys, and contextual inquiry sessions',
            'Persona development with behavioral archetypes',
            'Competitive UX audits and heuristic evaluations',
          ],
        },
        {
          icon: 'cursor',
          title: 'Wireframing & Information Architecture',
          description: 'Structured layouts and navigation systems that organize content logically and guide users toward their goals effortlessly.',
          details: [
            'Low-fidelity wireframes for rapid concept validation',
            'Site maps and user flow diagrams for complex applications',
            'Card sorting and tree testing for optimal information hierarchy',
          ],
        },
        {
          icon: 'palette',
          title: 'Visual Design & Branding',
          description: 'Stunning visual designs that reinforce brand identity while maintaining usability and accessibility standards.',
          details: [
            'High-fidelity mockups with pixel-perfect design execution',
            'Color theory, typography, and iconography systems',
          ],
        },
        {
          icon: 'mobile',
          title: 'Responsive & Mobile Design',
          description: 'Adaptive designs that provide exceptional experiences across all devices from mobile phones to large desktop displays.',
          details: [
            'Mobile-first design methodology with progressive enhancement',
            'Touch-optimized interactions and gesture-based navigation',
            'Device-specific layout optimization for key breakpoints',
          ],
        },
        {
          icon: 'sparkles',
          title: 'Interactive Prototyping',
          description: 'Fully interactive prototypes that simulate the real product experience for stakeholder buy-in and user testing.',
          details: [
            'Clickable prototypes with realistic transitions and micro-interactions',
            'User testing sessions with task completion analysis',
            'Iterative refinement based on testing feedback',
          ],
        },
        {
          icon: 'code',
          title: 'Design System Development',
          description: 'Comprehensive component libraries and design tokens that ensure consistency across your entire product ecosystem.',
          details: [
            'Reusable component libraries with usage guidelines',
            'Design tokens for colors, spacing, typography, and elevation',
            'Developer handoff documentation with coded specifications',
          ],
        },
        {
          icon: 'eye',
          title: 'Usability Testing & Optimization',
          description: 'Data-driven design validation through moderated testing, A/B experiments, and analytics-based iteration.',
          details: [
            'Moderated and unmoderated usability testing sessions',
            'A/B and multivariate testing for design decisions',
          ],
        },
        {
          icon: 'shield',
          title: 'Accessibility & Inclusive Design',
          description: 'WCAG-compliant designs that ensure your product is usable by everyone regardless of ability or assistive technology.',
          details: [
            'WCAG 2.1 AA compliance audits and remediation',
            'Screen reader testing and keyboard navigation optimization',
            'Color contrast verification and alternative text strategies',
          ],
        },
      ],
      stats: [
        { label: 'Products Designed', value: '300+' },
        { label: 'Avg Usability Score Increase', value: '62%' },
        { label: 'User Satisfaction Rating', value: '4.8/5' },
        { label: 'Design Systems Built', value: '85+' },
      ],
    },
    process: {
      headline: 'Our Design Process',
      subtitle: 'Research-Driven, User-Validated',
      description: 'A design thinking methodology that starts with empathy, iterates through prototyping, and validates through real user feedback at every stage.',
      steps: [
        {
          title: 'Discover & Empathize',
          description: 'We immerse ourselves in your users world through interviews, observation, and data analysis to deeply understand their needs.',
          icon: 'users',
          details: [
            'Stakeholder workshops to align on business goals and constraints',
            'User research sessions including interviews and contextual inquiry',
            'Analytics review and existing experience audit',
          ],
        },
        {
          title: 'Define & Architect',
          description: 'We synthesize research into actionable insights, define the information architecture, and map out user journeys.',
          icon: 'document',
          details: [
            'Insight synthesis with affinity mapping and journey maps',
            'Information architecture with site maps and content models',
          ],
        },
        {
          title: 'Design & Prototype',
          description: 'We create wireframes, visual designs, and interactive prototypes that bring the product vision to life.',
          icon: 'palette',
          details: [
            'Wireframes progressing from low to high fidelity',
            'Visual design with brand-aligned UI components',
            'Interactive prototypes with realistic interactions and flows',
          ],
        },
        {
          title: 'Test & Validate',
          description: 'We test designs with real users, gather feedback, and iterate until usability metrics meet our quality benchmarks.',
          icon: 'check',
          details: [
            'Moderated usability testing with think-aloud protocols',
            'Task success rate and time-on-task measurement',
            'Iterative design refinement based on testing insights',
          ],
        },
        {
          title: 'Handoff & Support',
          description: 'We deliver production-ready designs with detailed specifications and support your development team through implementation.',
          icon: 'code',
          details: [
            'Developer-ready design specs with redlines and assets',
            'Design system documentation and component guidelines',
            'Implementation support and design QA during development',
          ],
        },
      ],
    },
    techStack: {
      headline: 'Design Tools & Technology',
      subtitle: 'Industry-Standard Design Tools',
      description: 'We use the most powerful design and prototyping tools to create exceptional user experiences efficiently.',
      categories: [
        {
          category: 'Design & Prototyping',
          items: [
            { name: 'Figma', description: 'Collaborative interface design tool for wireframes, mockups, and design systems.' },
            { name: 'Adobe XD', description: 'Vector-based design and prototyping for web and mobile applications.' },
            { name: 'Sketch', description: 'Precision UI design tool with extensive plugin ecosystem.' },
            { name: 'InVision', description: 'Interactive prototyping and design collaboration platform.' },
          ],
        },
        {
          category: 'Motion & Interaction',
          items: [
            { name: 'Framer', description: 'Advanced interactive prototyping with production-quality animations.' },
            { name: 'TailwindCSS', description: 'Utility-first CSS framework for rapid design-to-code implementation.' },
            { name: 'React', description: 'Component-based development for building interactive design system implementations.' },
          ],
        },
        {
          category: 'Development Handoff',
          items: [
            { name: 'TypeScript', description: 'Type-safe component development ensuring design system reliability.' },
            { name: 'NextJS', description: 'Production framework for implementing designed experiences with optimal performance.' },
            { name: 'NodeJS', description: 'Backend services for design token management and asset delivery.' },
          ],
        },
      ],
    },
    portfolio: {
      headline: 'Design Portfolio',
      subtitle: 'Experiences That Make an Impact',
      description: 'See how our design work has transformed digital products and delivered measurable business results.',
      items: [
        {
          title: 'Healthcare Patient Portal Redesign',
          industry: 'Healthcare & MedTech',
          challenge: 'A healthcare provider patient portal had a 23% task completion rate and generated 400+ support calls weekly due to confusing navigation and outdated interface.',
          solution: 'We conducted extensive user research with patients and staff, redesigned the entire experience with simplified navigation, clear visual hierarchy, and WCAG AA accessibility compliance.',
          results: [
            'Task completion rate increased from 23% to 89%',
            'Support calls reduced by 67% within the first month',
            'Patient satisfaction scores improved from 2.1 to 4.6 out of 5',
          ],
          stats: [
            { label: 'Task Completion', value: '89%' },
            { label: 'Support Calls', value: '-67%' },
          ],
        },
        {
          title: 'Fintech Mobile Banking App',
          industry: 'Financial Services',
          challenge: 'A digital bank needed a mobile app that could compete with established banking apps while serving an underbanked demographic with varying levels of digital literacy.',
          solution: 'We designed an inclusive mobile experience with progressive disclosure, plain language, contextual help, and a simplified transaction flow tested with 50+ users across literacy levels.',
          results: [
            'App store rating of 4.8 stars within three months of launch',
            'User onboarding completion rate of 91%',
          ],
          stats: [
            { label: 'App Rating', value: '4.8★' },
            { label: 'Onboarding Rate', value: '91%' },
          ],
        },
        {
          title: 'Enterprise SaaS Dashboard',
          industry: 'B2B Software',
          challenge: 'A data analytics SaaS product had a steep learning curve with an average time-to-value of 6 weeks, causing 40% of trial users to churn before seeing results.',
          solution: 'We redesigned the dashboard with guided onboarding, progressive feature revelation, customizable widgets, and contextual tooltips. We also built a comprehensive design system with 120+ components.',
          results: [
            'Time-to-value reduced from 6 weeks to 3 days',
            'Trial-to-paid conversion rate increased from 12% to 34%',
            'Feature adoption across the product increased by 85%',
          ],
          stats: [
            { label: 'Time-to-Value', value: '-93%' },
            { label: 'Conversion Rate', value: '34%' },
          ],
        },
      ],
      aggregateStats: [
        { label: 'Products Designed', value: '300+' },
        { label: 'Usability Improvement', value: '62%' },
        { label: 'Avg Satisfaction', value: '4.8/5' },
        { label: 'Design Systems', value: '85+' },
      ],
    },
    faq: {
      headline: 'UI/UX Design FAQ',
      subtitle: 'Design Questions Answered',
      description: 'Common questions about our design process, deliverables, and how we collaborate with your team.',
      categories: [
        {
          category: 'Process & Approach',
          items: [
            {
              question: 'What is the difference between UI and UX design?',
              answer: 'UX design focuses on the overall experience, including research, information architecture, and interaction flows. UI design focuses on the visual presentation, including colors, typography, icons, and layout. We provide both as an integrated service because great products require both to work in harmony.',
            },
            {
              question: 'How long does a typical design project take?',
              answer: 'A focused UX audit takes 2-3 weeks. A full product design from research to handoff typically takes 8-16 weeks depending on complexity. Design system projects range from 6-12 weeks. We work in weekly sprints with regular check-ins so you can track progress throughout.',
            },
            {
              question: 'Do you conduct user research for every project?',
              answer: 'Yes, some level of user research is part of every engagement. For smaller projects, this might be a heuristic evaluation and stakeholder interviews. For larger projects, we conduct full user research including interviews, surveys, usability testing, and analytics analysis.',
            },
          ],
        },
        {
          category: 'Deliverables & Handoff',
          items: [
            {
              question: 'What design tools do you use?',
              answer: 'We primarily use Figma for UI design, prototyping, and design systems due to its collaborative features. We also use Adobe XD, Sketch, and Framer depending on project needs. All deliverables are provided in formats your development team can easily work with.',
            },
            {
              question: 'How do you hand off designs to developers?',
              answer: 'We provide comprehensive handoff packages including annotated designs with specifications, exported assets in all required formats, interactive prototypes, and design system documentation. We also remain available during development to answer questions and review implementation.',
            },
            {
              question: 'Do you build design systems?',
              answer: 'Yes, design systems are one of our core offerings. We create comprehensive component libraries with usage guidelines, design tokens, accessibility documentation, and coded component references. Design systems ensure consistency as your product and team scale.',
            },
          ],
        },
        {
          category: 'Collaboration & Support',
          items: [
            {
              question: 'How do you collaborate with our existing team?',
              answer: 'We integrate seamlessly with your team through shared Figma workspaces, regular design reviews, and asynchronous feedback loops. We can work alongside your in-house designers or serve as your dedicated design team, adapting to your preferred communication tools and workflows.',
            },
            {
              question: 'Can you redesign an existing product without starting from scratch?',
              answer: 'Absolutely. We often do iterative redesigns that improve the experience progressively. We start with a UX audit to identify the highest-impact improvements, then redesign in phases so your users can adapt gradually and you can measure the impact of each change.',
            },
            {
              question: 'Do you offer ongoing design support after the project?',
              answer: 'Yes, we offer flexible retainer arrangements for ongoing design needs including new feature design, design QA during development, usability testing, and design system maintenance. This ensures your product continues to evolve with consistent quality.',
            },
          ],
        },
      ],
    },
  },
};
