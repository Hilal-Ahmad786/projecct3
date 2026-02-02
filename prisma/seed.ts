import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || '';

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // ==================== SERVICES WITH RICH CONTENT ====================

  const servicesData = [
    {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Custom web applications and websites',
      shortDescription: 'Custom, high-performance websites built with cutting-edge technology.',
      fullDescription: 'We build more than just websites; we build digital experiences. Our web development team leverages the latest frameworks like Next.js and React to create blazing-fast, SEO-optimized, and scalable web applications tailored to your business goals. Whether you need a corporate site, a complex SaaS platform, or a custom portal, we deliver code that performs.',
      icon: 'code',
      heroImage: '/images/services/web-dev-hero.jpg',
      features: [
        'Custom Next.js & React Development',
        'Progressive Web Apps (PWA)',
        'API Integration & Development',
        'Performance Optimization (Core Web Vitals)',
        'Headless CMS Solutions',
        'Responsive & Mobile-First Design',
      ],
      benefits: [
        'Lightning-fast load times',
        'Superior SEO ranking potential',
        'Scalable architecture for growth',
        'Secure and maintainable code',
      ],
      content: {
        process: [
          { step: 1, title: 'Discovery & Strategy', description: 'We start by understanding your business, your audience, and your goals to define the technical roadmap.' },
          { step: 2, title: 'UX/UI Design', description: 'Our designers create intuitive, high-fidelity prototypes that align with your brand identity.' },
          { step: 3, title: 'Development', description: 'We write clean, semantic code using modern standards, ensuring scalability and security.' },
          { step: 4, title: 'Testing & Launch', description: 'Rigorous testing across devices and browsers ensures a flawless launch day.' },
        ],
        technologies: [
          { name: 'Next.js', icon: 'nextjs' },
          { name: 'React', icon: 'react' },
          { name: 'TypeScript', icon: 'typescript' },
          { name: 'Tailwind CSS', icon: 'tailwind' },
          { name: 'Node.js', icon: 'nodejs' },
          { name: 'PostgreSQL', icon: 'postgresql' },
        ],
        portfolio: [
          { title: 'E-Commerce Platform', category: 'Retail', image: '/images/portfolio/project1.jpg' },
          { title: 'Corporate Portal', category: 'Finance', image: '/images/portfolio/project2.jpg' },
          { title: 'SaaS Dashboard', category: 'Tech', image: '/images/portfolio/project3.jpg' },
        ],
        faq: [
          { question: 'How long does it take to build a website?', answer: 'A standard corporate website typically takes 4-6 weeks, while more complex web applications can take 3-6 months depending on the scope and features.' },
          { question: 'Do you provide hosting and maintenance?', answer: 'Yes, we offer comprehensive maintenance packages that include secure hosting, daily backups, and regular security updates.' },
          { question: 'Will my website be mobile-friendly?', answer: 'Absolutely. We take a mobile-first approach, ensuring your site looks and performs perfectly on smartphones, tablets, and desktops.' },
          { question: 'Can I update the content myself?', answer: 'Yes, we integrate user-friendly Content Management Systems (CMS) that allow you to easily update text, images, and blog posts without coding.' },
        ],
      },
      status: 'published',
      featured: true,
      order: 1,
    },
    {
      name: 'AI Solutions',
      slug: 'ai-solutions',
      description: 'Intelligent AI-powered solutions',
      shortDescription: 'Intelligent automation and machine learning models.',
      fullDescription: 'Unlock the power of Artificial Intelligence. From predictive analytics to natural language processing chatbots, we integrate state-of-the-art AI models into your workflows. Our AI solutions help businesses automate complex processes, gain actionable insights from data, and deliver personalized experiences to customers at scale.',
      icon: 'cpu',
      heroImage: '/images/services/ai-hero.jpg',
      features: [
        'Custom Machine Learning Models',
        'Natural Language Processing (NLP)',
        'Computer Vision Solutions',
        'Predictive Analytics & Forecasting',
        'AI-Powered Chatbots & Virtual Assistants',
        'Recommendation Systems',
        'Sentiment Analysis',
        'Anomaly Detection',
      ],
      benefits: [
        'Automate repetitive tasks and reduce operational costs',
        'Make data-driven decisions with predictive insights',
        'Enhance customer experiences with personalization',
        'Scale operations without proportional workforce increases',
        'Gain competitive advantage through innovation',
        'Improve accuracy and reduce human error',
      ],
      content: {
        process: [
          { step: 1, title: 'Problem Definition', description: 'We analyze your business challenges to identify where AI can create the most value and define clear success metrics.' },
          { step: 2, title: 'Data Assessment', description: 'We evaluate your data quality, availability, and structure to determine the best approach for model development.' },
          { step: 3, title: 'Model Development', description: 'Our data scientists build and train custom models using cutting-edge algorithms and frameworks.' },
          { step: 4, title: 'Integration & Testing', description: 'We integrate the AI solution into your existing systems and conduct thorough testing and validation.' },
          { step: 5, title: 'Deployment & Monitoring', description: 'We deploy the solution to production and set up continuous monitoring for model performance and accuracy.' },
        ],
        technologies: [
          { name: 'Python', icon: 'python' },
          { name: 'TensorFlow', icon: 'tensorflow' },
          { name: 'PyTorch', icon: 'pytorch' },
          { name: 'OpenAI', icon: 'openai' },
          { name: 'Hugging Face', icon: 'huggingface' },
          { name: 'Scikit-learn', icon: 'scikitlearn' },
          { name: 'AWS SageMaker', icon: 'aws' },
          { name: 'Google Cloud AI', icon: 'googlecloud' },
        ],
        portfolio: [
          { title: 'Predictive Maintenance System', category: 'Manufacturing', image: '/images/portfolio/ai-project1.jpg' },
          { title: 'Customer Service Chatbot', category: 'Retail', image: '/images/portfolio/ai-project2.jpg' },
          { title: 'Fraud Detection Platform', category: 'Finance', image: '/images/portfolio/ai-project3.jpg' },
        ],
        faq: [
          { question: 'What kind of data do I need for AI solutions?', answer: 'The data requirements depend on the specific AI solution. Generally, you need historical data relevant to your use case. We can work with structured data (databases, spreadsheets) or unstructured data (text, images, audio).' },
          { question: 'How long does it take to develop an AI solution?', answer: 'A proof-of-concept can be developed in 4-8 weeks. Full production deployment typically takes 3-6 months depending on complexity, data availability, and integration requirements.' },
          { question: 'Can AI solutions integrate with our existing systems?', answer: 'Yes, we design AI solutions with integration in mind. We can connect to your existing databases, APIs, CRM systems, and other business tools through secure APIs and data pipelines.' },
          { question: 'How do you ensure AI model accuracy and reliability?', answer: 'We use rigorous testing methodologies, cross-validation, and continuous monitoring. We also implement feedback loops to improve model performance over time and alert systems for detecting model drift.' },
        ],
      },
      status: 'published',
      featured: true,
      order: 2,
    },
    {
      name: 'Mobile Development',
      slug: 'mobile-development',
      description: 'iOS and Android app development',
      shortDescription: 'Native and cross-platform mobile apps.',
      fullDescription: 'Reach your customers wherever they are. We design and develop beautiful, user-friendly mobile applications for iOS and Android. Using modern frameworks like React Native and Flutter, we deliver high-performance apps that provide native-like experiences while optimizing development costs and time-to-market.',
      icon: 'device-mobile',
      heroImage: '/images/services/mobile-hero.jpg',
      features: [
        'Native iOS Development (Swift)',
        'Native Android Development (Kotlin)',
        'Cross-Platform Development (React Native, Flutter)',
        'App Store Optimization (ASO)',
        'Push Notifications & Real-time Updates',
        'Offline-First Architecture',
        'Biometric Authentication',
        'In-App Purchases & Subscriptions',
      ],
      benefits: [
        'Reach users on both iOS and Android platforms',
        'Native-like performance with cross-platform efficiency',
        'Faster time-to-market with shared codebase',
        'Reduced development and maintenance costs',
        'Seamless integration with device features',
        'Regular updates and feature enhancements',
      ],
      content: {
        process: [
          { step: 1, title: 'Discovery & Planning', description: 'We define your app requirements, target audience, and core features while creating detailed wireframes and user flows.' },
          { step: 2, title: 'UI/UX Design', description: 'Our designers create stunning, intuitive interfaces following iOS and Android design guidelines for the best user experience.' },
          { step: 3, title: 'Development & Iteration', description: 'We build your app using agile methodology, delivering regular updates and incorporating feedback throughout the process.' },
          { step: 4, title: 'Quality Assurance', description: 'Comprehensive testing on multiple devices and OS versions ensures your app works flawlessly for all users.' },
          { step: 5, title: 'Launch & Support', description: 'We handle app store submissions, launch marketing support, and provide ongoing maintenance and updates.' },
        ],
        technologies: [
          { name: 'React Native', icon: 'react' },
          { name: 'Flutter', icon: 'flutter' },
          { name: 'Swift', icon: 'swift' },
          { name: 'Kotlin', icon: 'kotlin' },
          { name: 'Firebase', icon: 'firebase' },
          { name: 'GraphQL', icon: 'graphql' },
          { name: 'Redux', icon: 'redux' },
          { name: 'Expo', icon: 'expo' },
        ],
        portfolio: [
          { title: 'Fitness Tracking App', category: 'Health & Wellness', image: '/images/portfolio/mobile-project1.jpg' },
          { title: 'Food Delivery Platform', category: 'Food & Beverage', image: '/images/portfolio/mobile-project2.jpg' },
          { title: 'Banking Mobile App', category: 'Finance', image: '/images/portfolio/mobile-project3.jpg' },
        ],
        faq: [
          { question: 'Should I build a native or cross-platform app?', answer: 'It depends on your requirements. Cross-platform (React Native, Flutter) is ideal for most apps with faster development and lower costs. Native development is better for apps requiring maximum performance or deep platform integration.' },
          { question: 'How much does mobile app development cost?', answer: 'Costs vary based on complexity, features, and platform choice. A simple app might start at $25,000, while complex apps with advanced features can range from $75,000 to $250,000+.' },
          { question: 'How long does it take to build a mobile app?', answer: 'A minimum viable product (MVP) typically takes 3-4 months. Full-featured apps usually require 6-12 months depending on complexity and the number of platforms targeted.' },
          { question: 'Do you help with app store submission?', answer: 'Yes, we handle the entire submission process for both Apple App Store and Google Play Store, including preparing all required assets, descriptions, and ensuring compliance with store guidelines.' },
        ],
      },
      status: 'published',
      featured: true,
      order: 3,
    },
    {
      name: 'Python Automation',
      slug: 'python-automation',
      description: 'Automate workflows with Python',
      shortDescription: 'Automate workflows and processes with Python.',
      fullDescription: 'Eliminate repetitive tasks and supercharge your productivity with custom Python automation solutions. From web scraping and data processing to report generation and system integration, we build scripts and applications that save hours of manual work. Our Python solutions are reliable, maintainable, and designed to scale with your needs.',
      icon: 'cog',
      heroImage: '/images/services/python-automation-hero.jpg',
      features: ['Web Scraping & Data Extraction', 'Report Generation & Automation', 'File Processing & Transformation', 'Email & Communication Automation', 'Database Operations & Migration', 'API Integration Scripts', 'Scheduled Task Automation', 'Testing & QA Automation'],
      benefits: ['Save hundreds of hours on repetitive tasks', 'Reduce human error in data processing', 'Enable 24/7 automated operations', 'Free up staff for higher-value work', 'Improve data accuracy and consistency', 'Scale operations without adding headcount'],
      content: {
        process: [
          { step: 1, title: 'Process Analysis', description: 'We document your current manual processes, identify automation opportunities, and calculate potential time savings.' },
          { step: 2, title: 'Solution Design', description: 'We design the automation architecture, including data flows, error handling, and scheduling requirements.' },
          { step: 3, title: 'Development', description: 'We write clean, well-documented Python code with proper logging, error handling, and configuration management.' },
          { step: 4, title: 'Testing & Validation', description: 'We thoroughly test the automation with various scenarios and edge cases to ensure reliability.' },
          { step: 5, title: 'Deployment & Training', description: 'We deploy the solution, set up scheduling, and train your team on usage and basic maintenance.' },
        ],
        technologies: [
          { name: 'Python', icon: 'python' }, { name: 'Selenium', icon: 'selenium' }, { name: 'Beautiful Soup', icon: 'beautifulsoup' },
          { name: 'Pandas', icon: 'pandas' }, { name: 'Celery', icon: 'celery' }, { name: 'Apache Airflow', icon: 'airflow' },
          { name: 'FastAPI', icon: 'fastapi' }, { name: 'Pytest', icon: 'pytest' },
        ],
        portfolio: [
          { title: 'Financial Report Automation', category: 'Finance', image: '/images/portfolio/python-project1.jpg' },
          { title: 'E-commerce Data Scraper', category: 'Retail', image: '/images/portfolio/python-project2.jpg' },
          { title: 'HR Onboarding Automation', category: 'Human Resources', image: '/images/portfolio/python-project3.jpg' },
        ],
        faq: [
          { question: 'What types of tasks can be automated?', answer: 'Almost any repetitive computer task: data entry, report generation, file management, web scraping, email processing, social media posting, database operations, and system integrations.' },
          { question: 'Is web scraping legal?', answer: 'It depends on the website terms of service and jurisdiction. We ensure our scraping solutions respect robots.txt, rate limits, and terms of service. We also advise on legal considerations.' },
          { question: 'How do you handle errors and failures?', answer: 'We implement comprehensive error handling with retries, logging, and alerting. Failed tasks can be automatically retried, and you receive notifications for issues requiring attention.' },
          { question: 'Can automations run on our existing systems?', answer: 'Yes, Python automation can run on Windows, Mac, or Linux servers, in the cloud, or even on your existing computers. We recommend the best deployment approach for your situation.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 4,
    },
    {
      name: 'Data Analytics',
      slug: 'data-analytics',
      description: 'Data-driven insights and analytics',
      shortDescription: 'Transform raw data into actionable business insights.',
      fullDescription: 'Turn your data into a competitive advantage. Our data analytics services help you collect, process, and visualize data to uncover patterns, trends, and insights that drive better business decisions. From real-time dashboards to comprehensive reporting solutions, we empower your organization to become truly data-driven.',
      icon: 'chart-bar',
      heroImage: '/images/services/data-analytics-hero.jpg',
      features: ['Business Intelligence Dashboards', 'Real-time Data Visualization', 'ETL Pipeline Development', 'Data Warehouse Design', 'Custom Reporting Solutions', 'KPI Tracking & Monitoring', 'Data Quality Management', 'Self-Service Analytics Tools'],
      benefits: ['Make faster, data-driven decisions', 'Identify revenue opportunities and cost savings', 'Understand customer behavior and preferences', 'Monitor business performance in real-time', 'Predict future trends and market changes', 'Improve operational efficiency'],
      content: {
        process: [
          { step: 1, title: 'Data Discovery', description: 'We audit your existing data sources, identify data quality issues, and understand your business questions and KPIs.' },
          { step: 2, title: 'Architecture Design', description: 'We design a scalable data architecture including data pipelines, storage solutions, and processing frameworks.' },
          { step: 3, title: 'Data Integration', description: 'We build ETL pipelines to extract, transform, and load data from multiple sources into a unified data warehouse.' },
          { step: 4, title: 'Visualization & Reporting', description: 'We create interactive dashboards and reports that present insights in an easy-to-understand format for stakeholders.' },
          { step: 5, title: 'Training & Optimization', description: 'We train your team on analytics tools and continuously optimize dashboards based on user feedback.' },
        ],
        technologies: [
          { name: 'Tableau', icon: 'tableau' }, { name: 'Power BI', icon: 'powerbi' }, { name: 'Apache Spark', icon: 'spark' },
          { name: 'Snowflake', icon: 'snowflake' }, { name: 'BigQuery', icon: 'googlecloud' }, { name: 'Looker', icon: 'looker' },
          { name: 'dbt', icon: 'dbt' }, { name: 'Airflow', icon: 'airflow' },
        ],
        portfolio: [
          { title: 'Sales Performance Dashboard', category: 'Retail', image: '/images/portfolio/analytics-project1.jpg' },
          { title: 'Supply Chain Analytics', category: 'Logistics', image: '/images/portfolio/analytics-project2.jpg' },
          { title: 'Marketing ROI Platform', category: 'Marketing', image: '/images/portfolio/analytics-project3.jpg' },
        ],
        faq: [
          { question: 'What data sources can you integrate?', answer: 'We can integrate virtually any data source including databases, APIs, cloud services, spreadsheets, CRM systems, marketing platforms, and IoT devices.' },
          { question: 'How do you ensure data security and privacy?', answer: 'We implement industry-standard security practices including encryption, access controls, data masking, and compliance with regulations like GDPR and CCPA.' },
          { question: 'Can our team access and modify the dashboards?', answer: 'Yes, we design self-service analytics solutions that allow your team to explore data, create custom reports, and modify dashboards without technical expertise.' },
          { question: 'How long does it take to implement a data analytics solution?', answer: 'A basic dashboard can be delivered in 2-4 weeks. Comprehensive data warehouse and analytics platform implementations typically take 2-4 months.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 5,
    },
    {
      name: 'Machine Learning',
      slug: 'machine-learning',
      description: 'ML models and predictions',
      shortDescription: 'Custom ML models that learn and improve from your data.',
      fullDescription: 'Harness the power of machine learning to solve complex business problems. We develop custom ML models that can predict outcomes, classify data, detect anomalies, and automate decision-making. From traditional algorithms to deep learning neural networks, we select the right approach for your specific use case.',
      icon: 'brain',
      heroImage: '/images/services/machine-learning-hero.jpg',
      features: ['Supervised & Unsupervised Learning', 'Deep Learning Neural Networks', 'Time Series Forecasting', 'Classification & Regression Models', 'Clustering & Segmentation', 'Feature Engineering & Selection', 'Model Explainability & Interpretability', 'MLOps & Model Lifecycle Management'],
      benefits: ['Automate complex decision-making processes', 'Predict future outcomes with high accuracy', 'Discover hidden patterns in large datasets', 'Scale expertise through intelligent automation', 'Continuously improve with more data', 'Reduce costs through predictive maintenance'],
      content: {
        process: [
          { step: 1, title: 'Problem Framing', description: 'We translate your business problem into a machine learning problem and define measurable success criteria.' },
          { step: 2, title: 'Data Preparation', description: 'We collect, clean, and transform your data, performing feature engineering to maximize model performance.' },
          { step: 3, title: 'Model Selection & Training', description: 'We experiment with multiple algorithms and architectures to find the best model for your use case.' },
          { step: 4, title: 'Validation & Tuning', description: 'We rigorously validate model performance and fine-tune hyperparameters to achieve optimal results.' },
          { step: 5, title: 'Deployment & MLOps', description: 'We deploy models to production with automated retraining pipelines and performance monitoring.' },
        ],
        technologies: [
          { name: 'Python', icon: 'python' }, { name: 'TensorFlow', icon: 'tensorflow' }, { name: 'PyTorch', icon: 'pytorch' },
          { name: 'Scikit-learn', icon: 'scikitlearn' }, { name: 'Keras', icon: 'keras' }, { name: 'MLflow', icon: 'mlflow' },
          { name: 'Kubeflow', icon: 'kubeflow' }, { name: 'Jupyter', icon: 'jupyter' },
        ],
        portfolio: [
          { title: 'Demand Forecasting System', category: 'Supply Chain', image: '/images/portfolio/ml-project1.jpg' },
          { title: 'Customer Churn Predictor', category: 'Telecom', image: '/images/portfolio/ml-project2.jpg' },
          { title: 'Image Recognition Platform', category: 'Healthcare', image: '/images/portfolio/ml-project3.jpg' },
        ],
        faq: [
          { question: 'How much data do I need for machine learning?', answer: 'It depends on the problem complexity. Simple models may work with thousands of records, while deep learning typically requires hundreds of thousands or millions. We can also use techniques like transfer learning to work with smaller datasets.' },
          { question: 'How accurate are machine learning predictions?', answer: 'Accuracy varies by problem and data quality. We set realistic expectations upfront and use proper validation techniques. Most production models achieve 80-95% accuracy depending on the use case.' },
          { question: 'Can you explain how the model makes decisions?', answer: 'Yes, we prioritize model interpretability. We use explainable AI techniques like SHAP values, feature importance, and attention visualization to understand and explain model decisions.' },
          { question: 'How do you handle model updates and retraining?', answer: 'We implement MLOps pipelines that automatically monitor model performance, detect drift, and trigger retraining when needed. This ensures your models stay accurate over time.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 6,
    },
    {
      name: 'Conversational AI',
      slug: 'conversational-ai',
      description: 'Chatbots and virtual assistants',
      shortDescription: 'Build intelligent chatbots and virtual assistants.',
      fullDescription: 'Transform customer interactions with AI-powered conversational interfaces. We build intelligent chatbots and virtual assistants that understand natural language, handle complex queries, and provide personalized experiences. From customer support automation to sales assistance, our conversational AI solutions operate 24/7 and scale effortlessly.',
      icon: 'chat',
      heroImage: '/images/services/conversational-ai-hero.jpg',
      features: ['Custom Chatbot Development', 'Natural Language Understanding (NLU)', 'Multi-Channel Deployment', 'Sentiment Analysis', 'Intent Recognition & Entity Extraction', 'Human Handoff Integration', 'Multilingual Support', 'Analytics & Conversation Insights'],
      benefits: ['Provide 24/7 instant customer support', 'Reduce support costs by 40-60%', 'Handle unlimited simultaneous conversations', 'Improve customer satisfaction with fast responses', 'Free human agents for complex issues', 'Gather valuable customer insights'],
      content: {
        process: [
          { step: 1, title: 'Use Case Definition', description: 'We identify the conversations you want to automate and define the scope, personas, and success metrics.' },
          { step: 2, title: 'Conversation Design', description: 'We design conversation flows, write dialogue scripts, and define intents, entities, and fallback behaviors.' },
          { step: 3, title: 'AI Model Training', description: 'We train NLU models on your data and domain vocabulary to ensure accurate understanding of user messages.' },
          { step: 4, title: 'Integration & Development', description: 'We build the chatbot, integrate with your systems (CRM, databases, APIs), and deploy to your channels.' },
          { step: 5, title: 'Testing & Improvement', description: 'We test extensively, launch with monitoring, and continuously improve based on conversation analytics.' },
        ],
        technologies: [
          { name: 'OpenAI GPT', icon: 'openai' }, { name: 'Google Dialogflow', icon: 'googlecloud' }, { name: 'Amazon Lex', icon: 'aws' },
          { name: 'Microsoft Bot Framework', icon: 'azure' }, { name: 'Rasa', icon: 'rasa' }, { name: 'LangChain', icon: 'langchain' },
          { name: 'Twilio', icon: 'twilio' }, { name: 'Intercom', icon: 'intercom' },
        ],
        portfolio: [
          { title: 'Customer Support Chatbot', category: 'E-commerce', image: '/images/portfolio/chatbot-project1.jpg' },
          { title: 'Healthcare Virtual Assistant', category: 'Healthcare', image: '/images/portfolio/chatbot-project2.jpg' },
          { title: 'Sales Qualification Bot', category: 'SaaS', image: '/images/portfolio/chatbot-project3.jpg' },
        ],
        faq: [
          { question: 'How intelligent are these chatbots?', answer: 'Modern conversational AI can understand context, handle multi-turn conversations, recognize intent variations, and provide relevant responses. With GPT integration, they can even generate human-like creative responses.' },
          { question: 'What happens when the bot cannot answer?', answer: 'We implement intelligent handoff to human agents when needed. The bot recognizes complex queries or frustrated users and seamlessly transfers the conversation with full context to your team.' },
          { question: 'Which channels can the chatbot work on?', answer: 'We deploy chatbots across web, mobile apps, Facebook Messenger, WhatsApp, Slack, Microsoft Teams, SMS, and voice assistants like Alexa. Multi-channel deployment uses a single conversation logic.' },
          { question: 'How do you train the bot on our specific domain?', answer: 'We train on your existing data: FAQs, support tickets, product documentation, and conversation logs. We also create synthetic training data and fine-tune models on your specific terminology and use cases.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 7,
    },
    {
      name: 'API Development',
      slug: 'api-development',
      description: 'RESTful and GraphQL APIs',
      shortDescription: 'Build robust APIs that power your applications.',
      fullDescription: 'APIs are the backbone of modern software. We design and develop scalable, secure, and well-documented APIs that enable seamless integration between systems. Whether you need REST APIs, GraphQL endpoints, or real-time WebSocket connections, we build interfaces that developers love to use.',
      icon: 'api',
      heroImage: '/images/services/api-development-hero.jpg',
      features: ['RESTful API Design & Development', 'GraphQL API Implementation', 'API Gateway & Management', 'Authentication & Authorization', 'API Documentation (OpenAPI/Swagger)', 'Rate Limiting & Throttling', 'Versioning & Backward Compatibility', 'Real-time APIs (WebSockets, SSE)'],
      benefits: ['Enable seamless system integration', 'Provide consistent interfaces for multiple clients', 'Scale independently from frontend applications', 'Monetize data and services through API products', 'Accelerate partner and third-party integrations', 'Future-proof your architecture'],
      content: {
        process: [
          { step: 1, title: 'Requirements Analysis', description: 'We understand your integration needs, data models, and consumer requirements to design the right API strategy.' },
          { step: 2, title: 'API Design', description: 'We create detailed API specifications following REST or GraphQL best practices, ensuring consistency and usability.' },
          { step: 3, title: 'Development', description: 'We build the API with proper error handling, validation, authentication, and comprehensive logging.' },
          { step: 4, title: 'Testing & Documentation', description: 'We write automated tests for all endpoints and create developer-friendly documentation with examples.' },
          { step: 5, title: 'Deployment & Monitoring', description: 'We deploy with proper security, set up monitoring, and provide ongoing support and maintenance.' },
        ],
        technologies: [
          { name: 'Node.js', icon: 'nodejs' }, { name: 'Python', icon: 'python' }, { name: 'GraphQL', icon: 'graphql' },
          { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'Redis', icon: 'redis' }, { name: 'Kong', icon: 'kong' },
          { name: 'Swagger', icon: 'swagger' }, { name: 'Postman', icon: 'postman' },
        ],
        portfolio: [
          { title: 'Payment Processing API', category: 'Fintech', image: '/images/portfolio/api-project1.jpg' },
          { title: 'Healthcare Data Exchange', category: 'Healthcare', image: '/images/portfolio/api-project2.jpg' },
          { title: 'IoT Device Management API', category: 'IoT', image: '/images/portfolio/api-project3.jpg' },
        ],
        faq: [
          { question: 'Should I use REST or GraphQL?', answer: 'REST is simpler and widely understood, ideal for straightforward CRUD operations. GraphQL is better when clients need flexible queries or you want to reduce over-fetching. We help you choose based on your use case.' },
          { question: 'How do you handle API security?', answer: 'We implement industry-standard security: OAuth 2.0/JWT authentication, HTTPS encryption, input validation, rate limiting, and API key management. We also conduct security testing.' },
          { question: 'What about API versioning?', answer: 'We implement versioning strategies (URL path, headers, or query params) that allow API evolution without breaking existing consumers. We plan for backward compatibility from the start.' },
          { question: 'Do you provide API documentation?', answer: 'Yes, comprehensive documentation is essential. We use OpenAPI/Swagger for REST APIs and generate interactive documentation with code examples in multiple languages.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 8,
    },
    {
      name: 'UI/UX Design',
      slug: 'ui-ux-design',
      description: 'User-centered design solutions',
      shortDescription: 'Create beautiful, intuitive user experiences.',
      fullDescription: 'Design is not just how it looks, but how it works. Our UI/UX design services combine aesthetic beauty with functional excellence. We conduct user research, create wireframes and prototypes, and deliver pixel-perfect designs that delight users and achieve business goals. Great design drives engagement, conversions, and customer loyalty.',
      icon: 'paint-brush',
      heroImage: '/images/services/ui-ux-hero.jpg',
      features: ['User Research & Persona Development', 'Information Architecture', 'Wireframing & Prototyping', 'Visual Design & Branding', 'Interaction Design', 'Usability Testing', 'Design System Creation', 'Accessibility (WCAG) Compliance'],
      benefits: ['Increase user engagement and retention', 'Improve conversion rates', 'Reduce development costs with clear specifications', 'Build brand consistency across touchpoints', 'Reduce support costs with intuitive design', 'Achieve accessibility compliance'],
      content: {
        process: [
          { step: 1, title: 'Research & Discovery', description: 'We conduct user research, competitive analysis, and stakeholder interviews to understand the problem space.' },
          { step: 2, title: 'Information Architecture', description: 'We organize content and define user flows to create logical, intuitive navigation structures.' },
          { step: 3, title: 'Wireframing', description: 'We create low-fidelity wireframes to explore solutions and validate concepts before visual design.' },
          { step: 4, title: 'Visual Design', description: 'We craft high-fidelity designs with your brand identity, creating beautiful and consistent interfaces.' },
          { step: 5, title: 'Prototyping & Testing', description: 'We build interactive prototypes and conduct usability testing to validate and refine the design.' },
        ],
        technologies: [
          { name: 'Figma', icon: 'figma' }, { name: 'Sketch', icon: 'sketch' }, { name: 'Adobe XD', icon: 'adobexd' },
          { name: 'InVision', icon: 'invision' }, { name: 'Principle', icon: 'principle' }, { name: 'Zeplin', icon: 'zeplin' },
          { name: 'Maze', icon: 'maze' }, { name: 'Hotjar', icon: 'hotjar' },
        ],
        portfolio: [
          { title: 'Banking App Redesign', category: 'Finance', image: '/images/portfolio/uiux-project1.jpg' },
          { title: 'Healthcare Patient Portal', category: 'Healthcare', image: '/images/portfolio/uiux-project2.jpg' },
          { title: 'SaaS Dashboard Design', category: 'Tech', image: '/images/portfolio/uiux-project3.jpg' },
        ],
        faq: [
          { question: 'What is the difference between UI and UX design?', answer: 'UX (User Experience) focuses on the overall feel and functionality - how users accomplish tasks. UI (User Interface) focuses on the visual elements - how the product looks. Both are essential for great products.' },
          { question: 'Do you conduct user research?', answer: 'Yes, user research is fundamental to our process. We conduct interviews, surveys, usability testing, and analytics analysis to understand user needs and validate design decisions.' },
          { question: 'What deliverables will we receive?', answer: 'Deliverables typically include user personas, user flows, wireframes, high-fidelity mockups, interactive prototypes, design systems, and developer handoff documentation.' },
          { question: 'How do you ensure designs are accessible?', answer: 'We follow WCAG guidelines and design for accessibility from the start. This includes proper color contrast, keyboard navigation, screen reader support, and clear visual hierarchy.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 9,
    },
    // ========== 8 MARKETING SERVICES (replacing digital-marketing) ==========
    {
      name: 'SEO',
      slug: 'seo',
      description: 'Search engine optimization for organic growth',
      shortDescription: 'Dominate search results with data-driven SEO strategies.',
      fullDescription: 'Increase your organic visibility and drive qualified traffic with our comprehensive SEO services. We combine technical optimization, content strategy, and link building to help your website rank higher on Google and other search engines. Our data-driven approach delivers sustainable, long-term growth.',
      icon: 'magnifying-glass',
      heroImage: '/images/services/seo-hero.jpg',
      features: ['Technical SEO Audits', 'On-Page Optimization', 'Keyword Research & Strategy', 'Link Building & Outreach', 'Local SEO & Google Business', 'Content Strategy & Optimization'],
      benefits: ['Increase organic traffic by 200-500%', 'Lower customer acquisition costs', 'Build long-term brand authority', 'Outrank competitors in search results'],
      content: {
        process: [
          { step: 1, title: 'SEO Audit', description: 'We conduct a comprehensive audit of your site\'s technical health, content, and backlink profile.' },
          { step: 2, title: 'Keyword Strategy', description: 'We research and prioritize high-value keywords aligned with your business goals and search intent.' },
          { step: 3, title: 'On-Page Optimization', description: 'We optimize meta tags, content structure, internal linking, and schema markup for maximum relevance.' },
          { step: 4, title: 'Off-Page & Link Building', description: 'We build high-quality backlinks through outreach, guest posting, and digital PR campaigns.' },
          { step: 5, title: 'Monitoring & Reporting', description: 'We track rankings, traffic, and conversions, providing monthly reports with actionable insights.' },
        ],
        technologies: [
          { name: 'Ahrefs', icon: 'ahrefs' }, { name: 'SEMrush', icon: 'semrush' }, { name: 'Google Search Console', icon: 'google' },
          { name: 'Screaming Frog', icon: 'screamingfrog' }, { name: 'Surfer SEO', icon: 'surferseo' }, { name: 'Google Analytics', icon: 'googleanalytics' },
        ],
        portfolio: [
          { title: 'E-commerce SEO Growth', category: 'Retail', image: '/images/portfolio/seo-project1.jpg' },
          { title: 'SaaS Organic Traffic 5x', category: 'Tech', image: '/images/portfolio/seo-project2.jpg' },
        ],
        faq: [
          { question: 'How long until I see SEO results?', answer: 'Initial improvements appear in 3-6 months, with significant results in 6-12 months. SEO is a long-term investment that compounds over time.' },
          { question: 'Do you guarantee first-page rankings?', answer: 'No ethical SEO agency can guarantee specific rankings. We guarantee a data-driven strategy, transparent reporting, and continuous optimization to maximize your organic growth.' },
          { question: 'What is the difference between on-page and off-page SEO?', answer: 'On-page SEO optimizes elements on your website (content, meta tags, structure). Off-page SEO builds authority through external signals like backlinks and brand mentions.' },
          { question: 'Do you handle local SEO?', answer: 'Yes, we optimize Google Business profiles, build local citations, manage reviews, and target location-based keywords for businesses serving specific areas.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 10,
    },
    {
      name: 'Google Ads (PPC)',
      slug: 'google-ads',
      description: 'Pay-per-click advertising on Google',
      shortDescription: 'Drive instant qualified traffic with expertly managed Google Ads campaigns.',
      fullDescription: 'Maximize your ROI with professionally managed Google Ads campaigns. We create highly targeted search, display, and shopping campaigns that put your brand in front of the right audience at the right moment. Our PPC specialists continuously optimize bids, ad copy, and landing pages for peak performance.',
      icon: 'cursor-arrow-rays',
      heroImage: '/images/services/google-ads-hero.jpg',
      features: ['Search Campaign Management', 'Display & Remarketing Ads', 'Shopping & Performance Max', 'Conversion Tracking Setup', 'Landing Page Optimization', 'A/B Testing & Ad Copy'],
      benefits: ['Instant visibility on Google', 'Precise audience targeting', 'Measurable ROI on every dollar', 'Scale campaigns quickly based on results'],
      content: {
        process: [
          { step: 1, title: 'Account Audit & Setup', description: 'We audit your existing account or set up a new one with proper conversion tracking and attribution.' },
          { step: 2, title: 'Keyword & Audience Research', description: 'We identify high-intent keywords, negative keywords, and audience segments for precise targeting.' },
          { step: 3, title: 'Campaign Creation', description: 'We build structured campaigns with compelling ad copy, extensions, and optimized bidding strategies.' },
          { step: 4, title: 'Optimization & Scaling', description: 'We continuously test, refine, and scale winning campaigns while pausing underperformers.' },
        ],
        technologies: [
          { name: 'Google Ads', icon: 'googleads' }, { name: 'Google Analytics', icon: 'googleanalytics' }, { name: 'Google Tag Manager', icon: 'gtm' },
          { name: 'Unbounce', icon: 'unbounce' }, { name: 'Optmyzr', icon: 'optmyzr' }, { name: 'Google Looker Studio', icon: 'looker' },
        ],
        portfolio: [
          { title: 'Lead Gen Campaign 400% ROAS', category: 'B2B', image: '/images/portfolio/google-ads-project1.jpg' },
          { title: 'E-commerce Shopping Ads Scale', category: 'Retail', image: '/images/portfolio/google-ads-project2.jpg' },
        ],
        faq: [
          { question: 'How much should I budget for Google Ads?', answer: 'Budgets vary by industry and goals. We recommend starting with at least $2,000/month for meaningful data. We help you determine the optimal budget based on your market and targets.' },
          { question: 'How quickly will I see results?', answer: 'Unlike SEO, PPC delivers almost immediate traffic. You can start seeing clicks within hours. Campaign optimization for best ROI typically takes 2-4 weeks of data collection.' },
          { question: 'What is a good ROAS?', answer: 'A healthy ROAS varies by industry, typically 3:1 to 8:1. We set ROAS targets based on your margins and continuously optimize to exceed them.' },
          { question: 'Do you manage Google Shopping campaigns?', answer: 'Yes, we manage Shopping and Performance Max campaigns including product feed optimization, bid management, and audience segmentation.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 11,
    },
    {
      name: 'Meta Ads',
      slug: 'meta-ads',
      description: 'Facebook & Instagram advertising',
      shortDescription: 'Reach billions of users with targeted Facebook & Instagram ad campaigns.',
      fullDescription: 'Leverage the power of Meta\'s advertising platform to reach your ideal customers on Facebook and Instagram. We create visually compelling ad campaigns with advanced targeting, custom audiences, and lookalike modeling to drive awareness, engagement, and conversions at scale.',
      icon: 'share',
      heroImage: '/images/services/meta-ads-hero.jpg',
      features: ['Facebook & Instagram Ad Management', 'Custom & Lookalike Audiences', 'Pixel & Conversion API Setup', 'Creative Design & Video Ads', 'Retargeting Campaigns', 'Catalog & Dynamic Ads'],
      benefits: ['Access 3+ billion monthly active users', 'Advanced demographic and interest targeting', 'Visual storytelling for brand awareness', 'Lower cost-per-acquisition vs search ads'],
      content: {
        process: [
          { step: 1, title: 'Audience & Pixel Setup', description: 'We configure Meta Pixel, Conversion API, and build custom audience segments based on your customer data.' },
          { step: 2, title: 'Creative Development', description: 'We design scroll-stopping visuals, videos, and ad copy tailored for Facebook and Instagram placements.' },
          { step: 3, title: 'Campaign Launch', description: 'We structure campaigns with proper testing frameworks, audience splits, and budget allocation.' },
          { step: 4, title: 'Scale & Optimize', description: 'We scale winning creatives and audiences while maintaining cost efficiency through bid optimization.' },
        ],
        technologies: [
          { name: 'Meta Ads Manager', icon: 'meta' }, { name: 'Meta Business Suite', icon: 'meta' }, { name: 'Canva', icon: 'canva' },
          { name: 'Adobe Creative Suite', icon: 'adobe' }, { name: 'Triple Whale', icon: 'triplewhale' }, { name: 'Hyros', icon: 'hyros' },
        ],
        portfolio: [
          { title: 'DTC Brand 6x ROAS Campaign', category: 'E-commerce', image: '/images/portfolio/meta-ads-project1.jpg' },
          { title: 'App Install Campaign', category: 'Mobile', image: '/images/portfolio/meta-ads-project2.jpg' },
        ],
        faq: [
          { question: 'What types of Meta ad campaigns do you run?', answer: 'We run awareness, traffic, engagement, lead generation, conversions, and catalog sales campaigns depending on your goals and funnel stage.' },
          { question: 'How do you handle iOS privacy changes?', answer: 'We implement Conversion API alongside Pixel for accurate tracking, use broad targeting strategies, and optimize for first-party data to maintain campaign effectiveness.' },
          { question: 'What ad formats work best?', answer: 'Video ads and carousel formats typically outperform static images. We test multiple formats including Reels, Stories, and collection ads to find what resonates with your audience.' },
          { question: 'How much budget do I need?', answer: 'We recommend a minimum of $1,500/month to generate meaningful data. Higher budgets allow faster optimization and scaling of winning campaigns.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 12,
    },
    {
      name: 'Social Media Marketing',
      slug: 'social-media-marketing',
      description: 'Organic social media growth and management',
      shortDescription: 'Build engaged communities and grow your brand across social platforms.',
      fullDescription: 'Transform your social media presence with strategic content creation, community management, and growth tactics. We develop platform-specific strategies for Instagram, LinkedIn, TikTok, X, and more to build authentic connections with your audience and drive measurable business outcomes.',
      icon: 'users',
      heroImage: '/images/services/social-media-hero.jpg',
      features: ['Content Calendar & Strategy', 'Community Management', 'Influencer Partnerships', 'Social Listening & Analytics', 'Brand Voice Development', 'Platform-Specific Content'],
      benefits: ['Build authentic brand community', 'Increase brand awareness organically', 'Drive website traffic from social', 'Improve customer loyalty and retention'],
      content: {
        process: [
          { step: 1, title: 'Social Audit', description: 'We analyze your current social presence, competitors, and audience to identify opportunities.' },
          { step: 2, title: 'Strategy & Content Plan', description: 'We develop a content strategy with themes, posting schedule, and platform-specific tactics.' },
          { step: 3, title: 'Content Creation', description: 'We produce engaging posts, stories, reels, and videos aligned with your brand voice.' },
          { step: 4, title: 'Engagement & Growth', description: 'We manage community interactions, run growth campaigns, and adapt strategy based on analytics.' },
        ],
        technologies: [
          { name: 'Hootsuite', icon: 'hootsuite' }, { name: 'Buffer', icon: 'buffer' }, { name: 'Canva', icon: 'canva' },
          { name: 'Sprout Social', icon: 'sproutsocial' }, { name: 'Later', icon: 'later' }, { name: 'Brandwatch', icon: 'brandwatch' },
        ],
        portfolio: [
          { title: 'Brand Community Growth 10x', category: 'Lifestyle', image: '/images/portfolio/social-project1.jpg' },
          { title: 'B2B LinkedIn Strategy', category: 'Tech', image: '/images/portfolio/social-project2.jpg' },
        ],
        faq: [
          { question: 'Which social platforms should my business be on?', answer: 'It depends on your audience. B2B companies should focus on LinkedIn, B2C on Instagram and TikTok. We help you prioritize platforms where your audience is most active.' },
          { question: 'How often should we post?', answer: 'Consistency matters more than frequency. We typically recommend 3-5 posts per week per platform, plus daily stories and community engagement.' },
          { question: 'Do you create the content?', answer: 'Yes, we handle everything from strategy to creation—graphics, captions, hashtags, and video content tailored for each platform.' },
          { question: 'How do you measure social media ROI?', answer: 'We track engagement rate, follower growth, website traffic from social, lead generation, and conversion attribution to demonstrate clear business impact.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 13,
    },
    {
      name: 'Email Marketing',
      slug: 'email-marketing',
      description: 'Email campaigns and automation',
      shortDescription: 'Nurture leads and drive conversions with personalized email campaigns.',
      fullDescription: 'Email marketing remains the highest-ROI digital channel. We design and automate email campaigns that nurture leads, convert prospects, and retain customers. From welcome sequences to abandoned cart recovery, our email strategies combine compelling copy with smart segmentation and automation.',
      icon: 'envelope',
      heroImage: '/images/services/email-marketing-hero.jpg',
      features: ['Email Campaign Design & Copywriting', 'Marketing Automation Flows', 'List Segmentation & Personalization', 'A/B Testing & Optimization', 'Deliverability Management', 'Analytics & Revenue Attribution'],
      benefits: ['Average 42:1 ROI on email marketing', 'Automate lead nurturing 24/7', 'Personalize at scale with segmentation', 'Own your audience (no algorithm changes)'],
      content: {
        process: [
          { step: 1, title: 'Audit & Strategy', description: 'We audit your current email setup, list health, and define a strategy aligned with your customer journey.' },
          { step: 2, title: 'Setup & Segmentation', description: 'We set up or migrate your email platform, build segments, and configure tracking and automation triggers.' },
          { step: 3, title: 'Content & Automation', description: 'We design email templates, write copy, and build automated flows for key lifecycle stages.' },
          { step: 4, title: 'Optimize & Scale', description: 'We A/B test subject lines, content, and send times to continuously improve open rates and conversions.' },
        ],
        technologies: [
          { name: 'Klaviyo', icon: 'klaviyo' }, { name: 'Mailchimp', icon: 'mailchimp' }, { name: 'HubSpot', icon: 'hubspot' },
          { name: 'SendGrid', icon: 'sendgrid' }, { name: 'ActiveCampaign', icon: 'activecampaign' }, { name: 'Litmus', icon: 'litmus' },
        ],
        portfolio: [
          { title: 'E-commerce Email Revenue 3x', category: 'Retail', image: '/images/portfolio/email-project1.jpg' },
          { title: 'SaaS Onboarding Flow', category: 'Tech', image: '/images/portfolio/email-project2.jpg' },
        ],
        faq: [
          { question: 'Which email platform do you recommend?', answer: 'It depends on your needs. Klaviyo is best for e-commerce, HubSpot for B2B, and Mailchimp for small businesses. We help you choose and set up the right platform.' },
          { question: 'How do you improve email deliverability?', answer: 'We implement proper authentication (SPF, DKIM, DMARC), maintain list hygiene, warm up sending domains, and follow best practices to maximize inbox placement.' },
          { question: 'What email automations should I have?', answer: 'Essential automations include welcome series, abandoned cart, post-purchase, win-back, and re-engagement flows. We build custom flows based on your customer journey.' },
          { question: 'How often should I send emails?', answer: 'Frequency depends on your audience and content. Most brands do well with 2-4 emails per week. We monitor engagement metrics to find the optimal frequency.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 14,
    },
    {
      name: 'Content Marketing',
      slug: 'content-marketing',
      description: 'Strategic content creation and distribution',
      shortDescription: 'Attract and engage your audience with valuable, strategic content.',
      fullDescription: 'Build authority and drive organic growth through strategic content marketing. We develop comprehensive content strategies that attract, educate, and convert your target audience. From blog posts and whitepapers to video scripts and infographics, we create content that ranks, resonates, and drives revenue.',
      icon: 'document-text',
      heroImage: '/images/services/content-marketing-hero.jpg',
      features: ['Content Strategy & Planning', 'Blog Post & Article Writing', 'Whitepapers & Case Studies', 'Video Script & Production', 'Infographic Design', 'Content Distribution & Promotion'],
      benefits: ['Build thought leadership and trust', 'Drive organic traffic long-term', 'Support SEO with quality content', 'Generate leads through gated content'],
      content: {
        process: [
          { step: 1, title: 'Content Audit & Strategy', description: 'We analyze your existing content, competitor landscape, and audience needs to define a content roadmap.' },
          { step: 2, title: 'Topic & Keyword Research', description: 'We identify high-value topics that align with search intent and your business objectives.' },
          { step: 3, title: 'Content Creation', description: 'Our writers and designers produce high-quality, SEO-optimized content tailored for each channel.' },
          { step: 4, title: 'Distribution & Amplification', description: 'We distribute content across channels and amplify reach through promotion, syndication, and repurposing.' },
        ],
        technologies: [
          { name: 'WordPress', icon: 'wordpress' }, { name: 'Ahrefs', icon: 'ahrefs' }, { name: 'Clearscope', icon: 'clearscope' },
          { name: 'Grammarly', icon: 'grammarly' }, { name: 'Canva', icon: 'canva' }, { name: 'Notion', icon: 'notion' },
        ],
        portfolio: [
          { title: 'SaaS Blog Traffic 400% Growth', category: 'Tech', image: '/images/portfolio/content-project1.jpg' },
          { title: 'B2B Thought Leadership Campaign', category: 'Finance', image: '/images/portfolio/content-project2.jpg' },
        ],
        faq: [
          { question: 'What types of content do you create?', answer: 'We produce blog posts, articles, whitepapers, case studies, ebooks, infographics, video scripts, social media content, and email newsletters.' },
          { question: 'How do you ensure content quality?', answer: 'Every piece goes through research, writing, editing, and SEO optimization. We use subject matter experts and follow your brand guidelines for consistency.' },
          { question: 'How does content marketing support SEO?', answer: 'Quality content targets specific keywords, earns backlinks, increases dwell time, and establishes topical authority—all critical ranking factors for search engines.' },
          { question: 'How do you measure content performance?', answer: 'We track organic traffic, rankings, engagement metrics, lead generation, social shares, and conversion attribution to measure content ROI.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 15,
    },
    {
      name: 'TikTok Ads',
      slug: 'tiktok-ads',
      description: 'TikTok advertising and growth',
      shortDescription: 'Reach Gen Z and Millennials with viral TikTok ad campaigns.',
      fullDescription: 'Tap into TikTok\'s explosive growth with creative, native-feeling ad campaigns. We help brands create authentic video content that resonates with TikTok\'s unique audience. From spark ads to branded hashtag challenges, we leverage TikTok\'s powerful algorithm to drive awareness, engagement, and conversions.',
      icon: 'play',
      heroImage: '/images/services/tiktok-ads-hero.jpg',
      features: ['In-Feed & Spark Ads', 'Branded Hashtag Challenges', 'TikTok Shop Integration', 'Creator Partnerships', 'Video Creative Production', 'Audience Targeting & Optimization'],
      benefits: ['Reach younger demographics at scale', 'Lower CPM compared to other platforms', 'Viral potential with organic amplification', 'High engagement rates with native content'],
      content: {
        process: [
          { step: 1, title: 'Platform Strategy', description: 'We analyze your brand fit for TikTok and develop a strategy aligned with platform trends and audience behavior.' },
          { step: 2, title: 'Creative Production', description: 'We produce authentic, native-feeling video ads that blend with organic TikTok content.' },
          { step: 3, title: 'Campaign Launch', description: 'We set up campaigns with precise targeting, budget allocation, and A/B testing frameworks.' },
          { step: 4, title: 'Optimize & Scale', description: 'We analyze performance data, iterate on creatives, and scale winning campaigns for maximum reach.' },
        ],
        technologies: [
          { name: 'TikTok Ads Manager', icon: 'tiktok' }, { name: 'CapCut', icon: 'capcut' }, { name: 'TikTok Creative Center', icon: 'tiktok' },
          { name: 'Adobe Premiere', icon: 'adobe' }, { name: 'TikTok Pixel', icon: 'tiktok' }, { name: 'Pentos', icon: 'pentos' },
        ],
        portfolio: [
          { title: 'DTC Brand Viral Campaign', category: 'E-commerce', image: '/images/portfolio/tiktok-project1.jpg' },
          { title: 'App Downloads Campaign', category: 'Mobile', image: '/images/portfolio/tiktok-project2.jpg' },
        ],
        faq: [
          { question: 'Is TikTok right for my business?', answer: 'TikTok is ideal for brands targeting users aged 16-45. Even B2B companies are finding success. We assess your audience and recommend whether TikTok fits your marketing mix.' },
          { question: 'How much does TikTok advertising cost?', answer: 'TikTok typically offers lower CPMs than Meta or Google. We recommend starting with $1,000-3,000/month and scaling based on performance.' },
          { question: 'Do you create the video content?', answer: 'Yes, we produce all creative including UGC-style content, product demos, and branded videos optimized for TikTok\'s format and trends.' },
          { question: 'Can TikTok drive actual sales?', answer: 'Absolutely. With TikTok Shop integration and proper conversion tracking, many brands see strong ROAS. We optimize campaigns for conversions, not just views.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 16,
    },
    {
      name: 'LinkedIn Ads',
      slug: 'linkedin-ads',
      description: 'LinkedIn advertising for B2B',
      shortDescription: 'Generate high-quality B2B leads with precision LinkedIn advertising.',
      fullDescription: 'LinkedIn is the premier platform for B2B marketing. We create targeted LinkedIn ad campaigns that reach decision-makers by job title, company, industry, and seniority. From sponsored content to InMail campaigns, we help you generate qualified leads and build thought leadership in your industry.',
      icon: 'briefcase',
      heroImage: '/images/services/linkedin-ads-hero.jpg',
      features: ['Sponsored Content & Carousel Ads', 'Message & InMail Campaigns', 'Lead Gen Form Ads', 'Account-Based Marketing (ABM)', 'LinkedIn Audience Network', 'Conversion Tracking & Analytics'],
      benefits: ['Target by job title, company, industry', 'Reach B2B decision-makers directly', 'Higher lead quality vs other platforms', 'Build professional brand credibility'],
      content: {
        process: [
          { step: 1, title: 'Audience Building', description: 'We build precision B2B audiences using LinkedIn\'s firmographic and demographic targeting options.' },
          { step: 2, title: 'Campaign Strategy', description: 'We select the right ad formats and objectives based on your funnel stage and lead goals.' },
          { step: 3, title: 'Creative & Copy', description: 'We create professional, compelling ad creatives with clear value propositions for B2B audiences.' },
          { step: 4, title: 'Optimize & Report', description: 'We optimize bids, audiences, and creatives based on lead quality metrics, not just clicks.' },
        ],
        technologies: [
          { name: 'LinkedIn Campaign Manager', icon: 'linkedin' }, { name: 'LinkedIn Sales Navigator', icon: 'linkedin' },
          { name: 'HubSpot', icon: 'hubspot' }, { name: 'Salesforce', icon: 'salesforce' },
          { name: 'LinkedIn Insight Tag', icon: 'linkedin' }, { name: 'Metadata.io', icon: 'metadata' },
        ],
        portfolio: [
          { title: 'SaaS Lead Gen 300% MQL Growth', category: 'Tech', image: '/images/portfolio/linkedin-project1.jpg' },
          { title: 'ABM Campaign for Enterprise', category: 'Finance', image: '/images/portfolio/linkedin-project2.jpg' },
        ],
        faq: [
          { question: 'Why are LinkedIn Ads more expensive?', answer: 'LinkedIn\'s higher CPCs reflect the quality of B2B targeting. You can reach specific job titles at specific companies. The cost-per-qualified-lead is often competitive with other platforms.' },
          { question: 'What ad formats work best on LinkedIn?', answer: 'Single image and carousel sponsored content typically drive the best engagement. Lead Gen Forms reduce friction and improve conversion rates. Message Ads work well for high-value offers.' },
          { question: 'How do you measure LinkedIn ad success?', answer: 'Beyond clicks and impressions, we track lead quality, cost-per-MQL, pipeline generated, and ultimately revenue attributed to LinkedIn campaigns.' },
          { question: 'What budget do you recommend?', answer: 'LinkedIn has higher minimum spends. We recommend at least $3,000/month for meaningful results. This allows proper testing of audiences and creatives.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 17,
    },
    {
      name: 'E-Commerce',
      slug: 'e-commerce',
      description: 'Online store solutions',
      shortDescription: 'Build powerful online stores that drive sales.',
      fullDescription: 'Launch and scale your online business with our comprehensive e-commerce solutions. We build custom e-commerce platforms, integrate with major marketplaces, and optimize for conversions. From product catalogs to payment processing, inventory management to order fulfillment, we deliver complete solutions that help you sell more.',
      icon: 'shopping-cart',
      heroImage: '/images/services/e-commerce-hero.jpg',
      features: ['Custom E-Commerce Development', 'Shopify & WooCommerce Solutions', 'Payment Gateway Integration', 'Inventory & Order Management', 'Multi-Channel Selling', 'Shopping Cart Optimization', 'Product Information Management', 'Subscription & Recurring Billing'],
      benefits: ['Increase online sales and revenue', 'Reach customers globally 24/7', 'Reduce operational costs with automation', 'Gain insights with sales analytics', 'Scale easily during peak seasons', 'Build customer loyalty with great experiences'],
      content: {
        process: [
          { step: 1, title: 'Business Analysis', description: 'We understand your products, target market, and business model to recommend the best e-commerce approach.' },
          { step: 2, title: 'Platform Selection', description: 'We help you choose between custom development, Shopify, WooCommerce, or other platforms based on your needs.' },
          { step: 3, title: 'Design & Development', description: 'We create a conversion-optimized store with beautiful design, fast performance, and seamless checkout.' },
          { step: 4, title: 'Integration & Testing', description: 'We integrate payment gateways, shipping providers, and third-party tools, then thoroughly test all functionality.' },
          { step: 5, title: 'Launch & Growth', description: 'We launch your store and provide ongoing support, analytics, and optimization to drive continuous growth.' },
        ],
        technologies: [
          { name: 'Shopify', icon: 'shopify' }, { name: 'WooCommerce', icon: 'woocommerce' }, { name: 'Magento', icon: 'magento' },
          { name: 'Stripe', icon: 'stripe' }, { name: 'PayPal', icon: 'paypal' }, { name: 'Contentful', icon: 'contentful' },
          { name: 'Algolia', icon: 'algolia' }, { name: 'Klaviyo', icon: 'klaviyo' },
        ],
        portfolio: [
          { title: 'Fashion Brand Store', category: 'Retail', image: '/images/portfolio/ecommerce-project1.jpg' },
          { title: 'B2B Wholesale Platform', category: 'Manufacturing', image: '/images/portfolio/ecommerce-project2.jpg' },
          { title: 'Subscription Box Service', category: 'Consumer Goods', image: '/images/portfolio/ecommerce-project3.jpg' },
        ],
        faq: [
          { question: 'Should I use Shopify or build a custom store?', answer: 'Shopify is excellent for most businesses with faster launch time and lower initial costs. Custom development is better for unique requirements, complex integrations, or high-volume stores needing maximum flexibility.' },
          { question: 'What payment methods can you integrate?', answer: 'We integrate all major payment gateways including Stripe, PayPal, Square, Apple Pay, Google Pay, and buy-now-pay-later options like Klarna and Affirm.' },
          { question: 'How do you optimize for conversions?', answer: 'We apply proven conversion optimization techniques: fast loading, mobile-first design, streamlined checkout, trust signals, product recommendations, abandoned cart recovery, and A/B testing.' },
          { question: 'Can you help with marketplace selling?', answer: 'Yes, we help you sell on Amazon, eBay, Walmart, and other marketplaces. We integrate inventory management across channels to prevent overselling and streamline operations.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 11,
    },
    {
      name: 'DevOps & Cloud',
      slug: 'devops-cloud',
      description: 'Cloud infrastructure and CI/CD',
      shortDescription: 'Streamline development and scale with cloud infrastructure.',
      fullDescription: 'Accelerate your software delivery with modern DevOps practices and cloud-native architecture. We help you build automated CI/CD pipelines, implement infrastructure as code, and migrate to cloud platforms. Our DevOps services reduce deployment time, improve reliability, and enable your team to ship faster with confidence.',
      icon: 'cloud',
      heroImage: '/images/services/devops-cloud-hero.jpg',
      features: ['CI/CD Pipeline Automation', 'Infrastructure as Code (IaC)', 'Cloud Migration & Architecture', 'Kubernetes & Container Orchestration', 'Monitoring & Observability', 'Cost Optimization', 'Disaster Recovery & Backup', 'Site Reliability Engineering (SRE)'],
      benefits: ['Deploy updates faster with automated pipelines', 'Reduce infrastructure costs with optimization', 'Scale automatically based on demand', 'Improve system reliability and uptime', 'Enable faster recovery from failures', 'Empower developers with self-service infrastructure'],
      content: {
        process: [
          { step: 1, title: 'Assessment & Planning', description: 'We evaluate your current infrastructure and development processes to identify improvement opportunities.' },
          { step: 2, title: 'Architecture Design', description: 'We design a scalable, resilient cloud architecture and define the DevOps toolchain for your needs.' },
          { step: 3, title: 'Pipeline Implementation', description: 'We build automated CI/CD pipelines that enable fast, reliable deployments with proper testing and security checks.' },
          { step: 4, title: 'Infrastructure Deployment', description: 'We provision infrastructure using code, ensuring consistency and enabling easy replication across environments.' },
          { step: 5, title: 'Operations & Optimization', description: 'We implement monitoring, alerting, and continuously optimize for performance and cost efficiency.' },
        ],
        technologies: [
          { name: 'AWS', icon: 'aws' }, { name: 'Azure', icon: 'azure' }, { name: 'Google Cloud', icon: 'googlecloud' },
          { name: 'Kubernetes', icon: 'kubernetes' }, { name: 'Docker', icon: 'docker' }, { name: 'Terraform', icon: 'terraform' },
          { name: 'GitHub Actions', icon: 'github' }, { name: 'Jenkins', icon: 'jenkins' },
        ],
        portfolio: [
          { title: 'Multi-Cloud Migration', category: 'Enterprise', image: '/images/portfolio/devops-project1.jpg' },
          { title: 'Kubernetes Platform', category: 'Tech Startup', image: '/images/portfolio/devops-project2.jpg' },
          { title: 'CI/CD Transformation', category: 'Finance', image: '/images/portfolio/devops-project3.jpg' },
        ],
        faq: [
          { question: 'Which cloud provider should we choose?', answer: 'The choice depends on your specific needs, existing technology stack, and budget. AWS offers the broadest services, Azure integrates well with Microsoft products, and GCP excels in data and ML. We help you evaluate and choose.' },
          { question: 'How do you handle cloud migration?', answer: 'We follow a proven migration methodology: assess, plan, migrate, and optimize. We can do lift-and-shift for quick migrations or re-architect applications for cloud-native benefits.' },
          { question: 'Can you help reduce our cloud costs?', answer: 'Yes, cloud cost optimization is a core service. We implement right-sizing, reserved instances, spot instances, and automated scaling to typically reduce costs by 30-50%.' },
          { question: 'How do you ensure high availability?', answer: 'We design multi-region, fault-tolerant architectures with automated failover, load balancing, and disaster recovery. We target 99.9% or higher uptime based on your requirements.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 12,
    },
    {
      name: 'Cybersecurity',
      slug: 'cybersecurity',
      description: 'Security audits and protection',
      shortDescription: 'Protect your digital assets with enterprise-grade security.',
      fullDescription: 'Safeguard your business from cyber threats with our comprehensive security solutions. We provide end-to-end cybersecurity services including vulnerability assessments, penetration testing, security architecture design, and incident response. Our team helps you build a robust security posture that protects your data, systems, and reputation.',
      icon: 'shield',
      heroImage: '/images/services/cybersecurity-hero.jpg',
      features: ['Vulnerability Assessment & Penetration Testing', 'Security Architecture Design', 'Cloud Security Solutions', 'Identity & Access Management (IAM)', 'Security Information & Event Management (SIEM)', 'Incident Response & Recovery', 'Compliance & Regulatory Support', 'Security Awareness Training'],
      benefits: ['Protect sensitive data and customer information', 'Maintain compliance with industry regulations', 'Reduce risk of costly data breaches', 'Build customer trust and confidence', 'Enable secure digital transformation', 'Minimize business disruption from incidents'],
      content: {
        process: [
          { step: 1, title: 'Security Assessment', description: 'We conduct a comprehensive assessment of your current security posture, identifying vulnerabilities and risks.' },
          { step: 2, title: 'Strategy Development', description: 'We create a tailored security strategy aligned with your business objectives and compliance requirements.' },
          { step: 3, title: 'Implementation', description: 'We deploy security controls, tools, and processes to protect your infrastructure and data.' },
          { step: 4, title: 'Monitoring & Detection', description: 'We set up continuous monitoring and threat detection systems to identify and respond to incidents quickly.' },
          { step: 5, title: 'Continuous Improvement', description: 'We regularly review and update security measures to address evolving threats and maintain compliance.' },
        ],
        technologies: [
          { name: 'AWS Security', icon: 'aws' }, { name: 'Azure Security', icon: 'azure' }, { name: 'Splunk', icon: 'splunk' },
          { name: 'CrowdStrike', icon: 'crowdstrike' }, { name: 'Okta', icon: 'okta' }, { name: 'Palo Alto', icon: 'paloalto' },
          { name: 'Qualys', icon: 'qualys' }, { name: 'HashiCorp Vault', icon: 'hashicorp' },
        ],
        portfolio: [
          { title: 'Enterprise Security Overhaul', category: 'Finance', image: '/images/portfolio/security-project1.jpg' },
          { title: 'Healthcare HIPAA Compliance', category: 'Healthcare', image: '/images/portfolio/security-project2.jpg' },
          { title: 'E-commerce Security Audit', category: 'Retail', image: '/images/portfolio/security-project3.jpg' },
        ],
        faq: [
          { question: 'How often should we conduct security assessments?', answer: 'We recommend comprehensive assessments annually, with quarterly vulnerability scans and continuous monitoring. Critical systems may require more frequent testing.' },
          { question: 'What compliance standards do you support?', answer: 'We support major compliance frameworks including SOC 2, ISO 27001, GDPR, HIPAA, PCI DSS, and NIST. We help you achieve and maintain certification.' },
          { question: 'How do you handle a security incident?', answer: 'We follow a structured incident response process: detection, containment, eradication, recovery, and post-incident analysis. We also provide 24/7 incident response services.' },
          { question: 'Can you secure our cloud infrastructure?', answer: 'Yes, we specialize in cloud security for AWS, Azure, and Google Cloud. We implement security best practices, configure access controls, and monitor for threats.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 18,
    },
    // ========== 6 MISSING AI SERVICES ==========
    {
      name: 'Computer Vision',
      slug: 'computer-vision',
      description: 'Image and video analysis with AI',
      shortDescription: 'Extract insights from images and video with advanced computer vision.',
      fullDescription: 'Transform visual data into actionable intelligence with our computer vision solutions. We build custom models for object detection, image classification, facial recognition, OCR, and video analytics. From quality inspection in manufacturing to medical imaging analysis, our CV solutions automate visual tasks with superhuman accuracy.',
      icon: 'eye',
      heroImage: '/images/services/computer-vision-hero.jpg',
      features: ['Object Detection & Recognition', 'Image Classification & Segmentation', 'OCR & Document Processing', 'Video Analytics & Tracking', 'Facial Recognition Systems', 'Quality Inspection Automation'],
      benefits: ['Automate visual inspection tasks', 'Process thousands of images per second', 'Reduce human error in visual analysis', 'Enable real-time video monitoring', 'Extract data from unstructured visual content'],
      content: {
        process: [
          { step: 1, title: 'Use Case Analysis', description: 'We analyze your visual data challenges and define the optimal computer vision approach.' },
          { step: 2, title: 'Data Collection & Annotation', description: 'We gather, clean, and annotate training data with precise labels for model training.' },
          { step: 3, title: 'Model Development', description: 'We train and fine-tune state-of-the-art CV models on your specific visual data.' },
          { step: 4, title: 'Integration & Deployment', description: 'We deploy models to edge devices, cloud, or on-premise infrastructure with real-time inference.' },
        ],
        technologies: [
          { name: 'OpenCV', icon: 'opencv' }, { name: 'YOLO', icon: 'yolo' }, { name: 'TensorFlow', icon: 'tensorflow' },
          { name: 'PyTorch Vision', icon: 'pytorch' }, { name: 'AWS Rekognition', icon: 'aws' }, { name: 'Google Vision AI', icon: 'googlecloud' },
        ],
        portfolio: [
          { title: 'Manufacturing Quality Inspection', category: 'Manufacturing', image: '/images/portfolio/cv-project1.jpg' },
          { title: 'Retail Shelf Analytics', category: 'Retail', image: '/images/portfolio/cv-project2.jpg' },
        ],
        faq: [
          { question: 'What types of visual data can you process?', answer: 'We process images, video streams, satellite imagery, medical scans, documents, and any visual data format. Solutions work in real-time or batch processing modes.' },
          { question: 'How accurate are computer vision models?', answer: 'Modern CV models achieve 95-99% accuracy on well-defined tasks. Accuracy depends on data quality, task complexity, and training data volume.' },
          { question: 'Can models run on edge devices?', answer: 'Yes, we optimize models for edge deployment on devices like NVIDIA Jetson, Raspberry Pi, and mobile phones for real-time inference without cloud dependency.' },
          { question: 'How much training data do I need?', answer: 'It varies by task complexity. Simple classification may need hundreds of images; complex detection may need thousands. We also use transfer learning and data augmentation to work with smaller datasets.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 19,
    },
    {
      name: 'LLM Fine-tuning',
      slug: 'llm-finetuning',
      description: 'Custom language model training',
      shortDescription: 'Adapt large language models to your specific domain and use cases.',
      fullDescription: 'Unlock the full potential of large language models by fine-tuning them on your domain data. We specialize in adapting models like GPT, Llama, and Mistral to understand your industry terminology, follow your guidelines, and produce outputs tailored to your specific business needs. From instruction tuning to RLHF, we make AI speak your language.',
      icon: 'adjustments',
      heroImage: '/images/services/llm-finetuning-hero.jpg',
      features: ['Domain-Specific Fine-tuning', 'Instruction Tuning & Alignment', 'LoRA & QLoRA Efficient Training', 'RLHF Implementation', 'Custom Dataset Curation', 'Model Evaluation & Benchmarking'],
      benefits: ['Models that understand your domain', 'Improved accuracy on specific tasks', 'Reduced hallucination with domain knowledge', 'Cost-effective vs training from scratch', 'Maintain data privacy with self-hosted models'],
      content: {
        process: [
          { step: 1, title: 'Requirements & Data Audit', description: 'We assess your use case, available data, and define the fine-tuning strategy and success metrics.' },
          { step: 2, title: 'Dataset Preparation', description: 'We curate, clean, and format training data including instruction-response pairs and preference data.' },
          { step: 3, title: 'Fine-tuning & Training', description: 'We fine-tune the base model using efficient techniques like LoRA, monitoring training metrics closely.' },
          { step: 4, title: 'Evaluation & Deployment', description: 'We benchmark the model against baselines and deploy with inference optimization for production use.' },
        ],
        technologies: [
          { name: 'Hugging Face', icon: 'huggingface' }, { name: 'PyTorch', icon: 'pytorch' }, { name: 'LoRA/QLoRA', icon: 'lora' },
          { name: 'Weights & Biases', icon: 'wandb' }, { name: 'vLLM', icon: 'vllm' }, { name: 'Axolotl', icon: 'axolotl' },
        ],
        portfolio: [
          { title: 'Legal Document AI Model', category: 'Legal', image: '/images/portfolio/llm-project1.jpg' },
          { title: 'Healthcare Clinical NLP', category: 'Healthcare', image: '/images/portfolio/llm-project2.jpg' },
        ],
        faq: [
          { question: 'Which base model should I fine-tune?', answer: 'It depends on your requirements. GPT-4 via OpenAI API for highest quality, Llama/Mistral for self-hosted control. We evaluate options based on cost, performance, and privacy needs.' },
          { question: 'How much data do I need for fine-tuning?', answer: 'Quality matters more than quantity. As few as 500-1,000 high-quality instruction-response pairs can significantly improve model performance for specific tasks.' },
          { question: 'What is LoRA and why use it?', answer: 'LoRA (Low-Rank Adaptation) is an efficient fine-tuning technique that trains only a small fraction of model parameters, reducing compute costs by 90% while maintaining quality.' },
          { question: 'Can I keep my data private?', answer: 'Yes. We offer on-premise fine-tuning and deployment options. With open-source models like Llama, your data never leaves your infrastructure.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 20,
    },
    {
      name: 'Prompt Engineering',
      slug: 'prompt-engineering',
      description: 'Expert prompt design and optimization',
      shortDescription: 'Maximize AI output quality with expertly crafted prompt systems.',
      fullDescription: 'Get the most out of large language models with professional prompt engineering. We design, test, and optimize prompt systems that deliver consistent, high-quality AI outputs for your specific workflows. From chain-of-thought reasoning to few-shot learning, we build prompt architectures that make AI reliable and production-ready.',
      icon: 'pencil-square',
      heroImage: '/images/services/prompt-engineering-hero.jpg',
      features: ['Prompt System Architecture', 'Chain-of-Thought Design', 'Few-Shot & Zero-Shot Optimization', 'Output Validation & Guardrails', 'Prompt Testing & Evaluation', 'Production Prompt Pipelines'],
      benefits: ['Improve AI output quality by 50-300%', 'Reduce hallucination and errors', 'Create reusable prompt templates', 'Save on API costs with efficient prompts', 'Build reliable AI-powered workflows'],
      content: {
        process: [
          { step: 1, title: 'Use Case Analysis', description: 'We understand your AI workflows, desired outputs, and current prompt challenges.' },
          { step: 2, title: 'Prompt Design', description: 'We architect prompt systems using advanced techniques like chain-of-thought, few-shot examples, and structured outputs.' },
          { step: 3, title: 'Testing & Iteration', description: 'We systematically test prompts against edge cases, measuring quality, consistency, and cost efficiency.' },
          { step: 4, title: 'Deployment & Documentation', description: 'We deliver production-ready prompt systems with documentation, evaluation metrics, and maintenance guidelines.' },
        ],
        technologies: [
          { name: 'OpenAI API', icon: 'openai' }, { name: 'Anthropic Claude', icon: 'anthropic' }, { name: 'LangChain', icon: 'langchain' },
          { name: 'PromptFoo', icon: 'promptfoo' }, { name: 'LangSmith', icon: 'langsmith' }, { name: 'Guardrails AI', icon: 'guardrails' },
        ],
        portfolio: [
          { title: 'Customer Support AI Pipeline', category: 'SaaS', image: '/images/portfolio/prompt-project1.jpg' },
          { title: 'Content Generation System', category: 'Media', image: '/images/portfolio/prompt-project2.jpg' },
        ],
        faq: [
          { question: 'Why do I need professional prompt engineering?', answer: 'Well-engineered prompts can improve AI output quality by 50-300%, reduce errors, and cut API costs. The difference between a basic prompt and an optimized one is dramatic.' },
          { question: 'Do prompts work across different AI models?', answer: 'Prompts often need adaptation between models (GPT-4, Claude, Llama). We design model-agnostic prompt systems and adapt them for your chosen models.' },
          { question: 'How do you test prompt quality?', answer: 'We use automated evaluation frameworks with test suites, scoring rubrics, and regression testing to ensure prompts perform consistently at scale.' },
          { question: 'Can you optimize our existing prompts?', answer: 'Yes, prompt optimization is one of our most common engagements. We audit existing prompts and typically achieve significant quality improvements with lower token usage.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 21,
    },
    {
      name: 'AI Agents',
      slug: 'ai-agents',
      description: 'Autonomous AI agent development',
      shortDescription: 'Build autonomous AI agents that handle complex multi-step tasks.',
      fullDescription: 'Create intelligent AI agents that autonomously execute complex workflows, make decisions, and interact with tools and APIs. We build multi-agent systems that can research, analyze, plan, and act on your behalf. From customer service agents to data analysis assistants, our AI agents work tirelessly to augment your team.',
      icon: 'user-group',
      heroImage: '/images/services/ai-agents-hero.jpg',
      features: ['Multi-Agent Orchestration', 'Tool & API Integration', 'Memory & Context Management', 'Decision-Making Frameworks', 'Human-in-the-Loop Workflows', 'Agent Monitoring & Logging'],
      benefits: ['Automate complex multi-step workflows', 'Scale operations without human bottlenecks', '24/7 autonomous task execution', 'Reduce operational costs significantly', 'Handle tasks too complex for simple automation'],
      content: {
        process: [
          { step: 1, title: 'Workflow Analysis', description: 'We map your complex workflows and identify which tasks are suitable for AI agent automation.' },
          { step: 2, title: 'Agent Architecture', description: 'We design the agent system including tools, memory, decision logic, and human oversight points.' },
          { step: 3, title: 'Development & Integration', description: 'We build agents with proper tool access, error handling, and integration with your existing systems.' },
          { step: 4, title: 'Testing & Deployment', description: 'We rigorously test agent behavior in sandbox environments before deploying to production with monitoring.' },
        ],
        technologies: [
          { name: 'LangChain', icon: 'langchain' }, { name: 'CrewAI', icon: 'crewai' }, { name: 'AutoGen', icon: 'autogen' },
          { name: 'OpenAI Assistants', icon: 'openai' }, { name: 'LangGraph', icon: 'langgraph' }, { name: 'Anthropic Claude', icon: 'anthropic' },
        ],
        portfolio: [
          { title: 'Research & Analysis Agent', category: 'Finance', image: '/images/portfolio/agent-project1.jpg' },
          { title: 'Customer Onboarding Agent', category: 'SaaS', image: '/images/portfolio/agent-project2.jpg' },
        ],
        faq: [
          { question: 'What is the difference between a chatbot and an AI agent?', answer: 'Chatbots respond to queries conversationally. AI agents autonomously plan, use tools, make decisions, and execute multi-step tasks with minimal human intervention.' },
          { question: 'How reliable are AI agents?', answer: 'Reliability depends on the task complexity and guardrails. We implement human-in-the-loop checkpoints, error handling, and monitoring to ensure agents operate safely.' },
          { question: 'Can agents access our internal tools?', answer: 'Yes, we build custom tool integrations allowing agents to interact with your databases, APIs, CRM, file systems, and other business tools securely.' },
          { question: 'What tasks are best suited for AI agents?', answer: 'Research and analysis, data processing, customer support triage, content workflows, report generation, and any multi-step task with clear inputs and outputs.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 22,
    },
    {
      name: 'RAG Solutions',
      slug: 'rag-solutions',
      description: 'Retrieval-augmented generation systems',
      shortDescription: 'Build AI that answers accurately using your own data and knowledge base.',
      fullDescription: 'Retrieval-Augmented Generation (RAG) combines the power of large language models with your proprietary data. We build enterprise RAG systems that let your team ask questions in natural language and get accurate, sourced answers from your documents, databases, and knowledge bases. Eliminate hallucination and unlock your institutional knowledge.',
      icon: 'book-open',
      heroImage: '/images/services/rag-solutions-hero.jpg',
      features: ['Document Ingestion & Processing', 'Vector Database Architecture', 'Semantic Search & Retrieval', 'Multi-Source Knowledge Bases', 'Citation & Source Tracking', 'Hybrid Search (Semantic + Keyword)'],
      benefits: ['Accurate AI answers from your data', 'Eliminate LLM hallucination', 'Unlock institutional knowledge', 'Reduce time spent searching for information', 'Keep sensitive data in your infrastructure'],
      content: {
        process: [
          { step: 1, title: 'Knowledge Audit', description: 'We catalog your data sources, document types, and information architecture to design the optimal RAG pipeline.' },
          { step: 2, title: 'Data Pipeline Setup', description: 'We build ingestion pipelines that chunk, embed, and index your documents in a vector database.' },
          { step: 3, title: 'RAG Architecture', description: 'We implement retrieval strategies, re-ranking, and prompt engineering for accurate, contextual responses.' },
          { step: 4, title: 'Interface & Deployment', description: 'We build user interfaces (chat, search, API) and deploy with monitoring for retrieval quality and accuracy.' },
        ],
        technologies: [
          { name: 'Pinecone', icon: 'pinecone' }, { name: 'Weaviate', icon: 'weaviate' }, { name: 'LangChain', icon: 'langchain' },
          { name: 'LlamaIndex', icon: 'llamaindex' }, { name: 'OpenAI Embeddings', icon: 'openai' }, { name: 'Chroma', icon: 'chroma' },
        ],
        portfolio: [
          { title: 'Enterprise Knowledge Assistant', category: 'Corporate', image: '/images/portfolio/rag-project1.jpg' },
          { title: 'Legal Document Search AI', category: 'Legal', image: '/images/portfolio/rag-project2.jpg' },
        ],
        faq: [
          { question: 'What is RAG and how does it work?', answer: 'RAG retrieves relevant documents from your knowledge base and provides them as context to an LLM, enabling accurate, sourced answers instead of relying solely on the model\'s training data.' },
          { question: 'What types of documents can you process?', answer: 'We process PDFs, Word docs, web pages, Confluence pages, Notion databases, Slack messages, emails, spreadsheets, and structured database records.' },
          { question: 'How do you prevent hallucination?', answer: 'RAG inherently reduces hallucination by grounding responses in retrieved data. We also implement citation tracking, confidence scoring, and answer verification layers.' },
          { question: 'Can this work with private/sensitive data?', answer: 'Yes, we deploy RAG systems on-premise or in your private cloud. Your data stays in your infrastructure and is never sent to third-party training sets.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 23,
    },
    {
      name: 'MLOps Deployment',
      slug: 'mlops-deployment',
      description: 'ML model deployment and operations',
      shortDescription: 'Deploy, monitor, and scale ML models in production with confidence.',
      fullDescription: 'Bridge the gap between ML experimentation and production with our MLOps services. We build automated pipelines for model training, testing, deployment, and monitoring. Our MLOps practices ensure your models are reproducible, scalable, and continuously improving in production environments.',
      icon: 'rocket',
      heroImage: '/images/services/mlops-hero.jpg',
      features: ['Model Serving & Inference APIs', 'Automated Training Pipelines', 'Model Versioning & Registry', 'Performance Monitoring & Drift Detection', 'A/B Testing & Canary Deployments', 'GPU Infrastructure Management'],
      benefits: ['Deploy models to production faster', 'Ensure model reproducibility', 'Detect and respond to model drift', 'Scale inference based on demand', 'Reduce ML infrastructure costs'],
      content: {
        process: [
          { step: 1, title: 'ML Infrastructure Assessment', description: 'We evaluate your current ML workflow and infrastructure to identify MLOps gaps and opportunities.' },
          { step: 2, title: 'Pipeline Design', description: 'We design end-to-end ML pipelines covering data, training, evaluation, and deployment stages.' },
          { step: 3, title: 'Implementation', description: 'We build automated pipelines with proper versioning, testing, and deployment strategies.' },
          { step: 4, title: 'Monitoring & Optimization', description: 'We set up production monitoring for model performance, data drift, and resource utilization.' },
        ],
        technologies: [
          { name: 'MLflow', icon: 'mlflow' }, { name: 'Kubeflow', icon: 'kubeflow' }, { name: 'Kubernetes', icon: 'kubernetes' },
          { name: 'Docker', icon: 'docker' }, { name: 'Seldon Core', icon: 'seldon' }, { name: 'Weights & Biases', icon: 'wandb' },
        ],
        portfolio: [
          { title: 'Real-time ML Inference Platform', category: 'Tech', image: '/images/portfolio/mlops-project1.jpg' },
          { title: 'Automated Retraining Pipeline', category: 'Finance', image: '/images/portfolio/mlops-project2.jpg' },
        ],
        faq: [
          { question: 'What is MLOps?', answer: 'MLOps (Machine Learning Operations) applies DevOps practices to ML workflows—automating model training, testing, deployment, and monitoring for reliable production ML systems.' },
          { question: 'Why do ML models degrade in production?', answer: 'Models degrade due to data drift (input data changing over time), concept drift (relationship changes), and feedback loops. MLOps monitoring detects these issues early.' },
          { question: 'Which MLOps tools do you use?', answer: 'We use MLflow for experiment tracking, Kubeflow for pipelines, Kubernetes for scaling, and custom monitoring solutions. Tool selection depends on your existing infrastructure.' },
          { question: 'Can you improve our existing ML deployment?', answer: 'Yes, we frequently audit and improve existing ML systems—adding monitoring, automating retraining, improving inference performance, and reducing costs.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 24,
    },
    // ========== 4 NEW SERVICES ==========
    {
      name: 'SaaS Development',
      slug: 'saas-development',
      description: 'Custom SaaS platform development',
      shortDescription: 'Build scalable, multi-tenant SaaS platforms from concept to launch.',
      fullDescription: 'Turn your software idea into a profitable SaaS business. We design and develop cloud-native, multi-tenant SaaS platforms with subscription billing, user management, analytics dashboards, and API access. Our SaaS solutions are built for scale from day one, with the architecture to support millions of users.',
      icon: 'cloud',
      heroImage: '/images/services/saas-development-hero.jpg',
      features: ['Multi-Tenant Architecture', 'Subscription Billing & Payments', 'Role-Based Access Control', 'API-First Development', 'Admin Dashboard & Analytics', 'White-Label & Customization'],
      benefits: ['Recurring revenue business model', 'Scale to millions of users', 'Reduce per-customer costs', 'Faster time-to-market', 'Built-in analytics and insights'],
      content: {
        process: [
          { step: 1, title: 'Product Strategy', description: 'We define your MVP features, pricing model, and technical architecture for a successful SaaS launch.' },
          { step: 2, title: 'Architecture & Design', description: 'We design a multi-tenant architecture with proper data isolation, security, and scalability patterns.' },
          { step: 3, title: 'Development', description: 'We build the platform iteratively with subscription management, user auth, and core features.' },
          { step: 4, title: 'Launch & Iterate', description: 'We launch your MVP, set up analytics, and iterate based on user feedback and usage data.' },
        ],
        technologies: [
          { name: 'Next.js', icon: 'nextjs' }, { name: 'Node.js', icon: 'nodejs' }, { name: 'PostgreSQL', icon: 'postgresql' },
          { name: 'Stripe', icon: 'stripe' }, { name: 'Redis', icon: 'redis' }, { name: 'AWS', icon: 'aws' },
        ],
        portfolio: [
          { title: 'HR Management SaaS Platform', category: 'HR Tech', image: '/images/portfolio/saas-project1.jpg' },
          { title: 'Project Management Tool', category: 'Productivity', image: '/images/portfolio/saas-project2.jpg' },
        ],
        faq: [
          { question: 'How long does it take to build a SaaS MVP?', answer: 'A focused MVP typically takes 3-5 months. We prioritize core features that validate your business model and add complexity in subsequent iterations.' },
          { question: 'How do you handle multi-tenancy?', answer: 'We implement multi-tenant architecture with proper data isolation (shared database with row-level security or separate schemas) based on your security and compliance needs.' },
          { question: 'Can you integrate subscription billing?', answer: 'Yes, we integrate Stripe, Paddle, or other billing providers with support for multiple plans, trials, upgrades, proration, and invoicing.' },
          { question: 'How do you ensure SaaS scalability?', answer: 'We use cloud-native architecture with auto-scaling, CDN, caching layers, database optimization, and queue-based processing to handle growth seamlessly.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 25,
    },
    {
      name: 'WordPress Development',
      slug: 'wordpress-development',
      description: 'WordPress & CMS development',
      shortDescription: 'Professional WordPress websites and custom CMS solutions.',
      fullDescription: 'Leverage the world\'s most popular CMS with our professional WordPress development services. We build custom themes, plugins, and WooCommerce stores that are fast, secure, and easy to manage. Whether you need a corporate site, blog, membership platform, or headless WordPress setup, we deliver solutions that empower your content team.',
      icon: 'globe',
      heroImage: '/images/services/wordpress-hero.jpg',
      features: ['Custom Theme Development', 'Plugin Development & Customization', 'WooCommerce Store Setup', 'Headless WordPress (WP + Next.js)', 'Site Speed Optimization', 'Security Hardening & Maintenance'],
      benefits: ['Easy content management for non-technical teams', 'Huge ecosystem of plugins and integrations', 'Cost-effective for content-heavy sites', 'SEO-friendly architecture', 'Quick launch timelines'],
      content: {
        process: [
          { step: 1, title: 'Requirements & Design', description: 'We define your content structure, design requirements, and select the right WordPress approach.' },
          { step: 2, title: 'Theme & Plugin Development', description: 'We build custom themes and plugins following WordPress coding standards and best practices.' },
          { step: 3, title: 'Content Migration & Setup', description: 'We migrate existing content, set up SEO plugins, forms, and all required integrations.' },
          { step: 4, title: 'Launch & Training', description: 'We launch the site, optimize performance, and train your team on content management.' },
        ],
        technologies: [
          { name: 'WordPress', icon: 'wordpress' }, { name: 'PHP', icon: 'php' }, { name: 'WooCommerce', icon: 'woocommerce' },
          { name: 'ACF Pro', icon: 'acf' }, { name: 'Elementor', icon: 'elementor' }, { name: 'WP Engine', icon: 'wpengine' },
        ],
        portfolio: [
          { title: 'Corporate Website Redesign', category: 'Enterprise', image: '/images/portfolio/wordpress-project1.jpg' },
          { title: 'Membership Platform', category: 'Education', image: '/images/portfolio/wordpress-project2.jpg' },
        ],
        faq: [
          { question: 'Is WordPress still relevant?', answer: 'WordPress powers 43% of all websites. It\'s ideal for content-heavy sites, blogs, and e-commerce. With headless setups, it can power modern frontend frameworks too.' },
          { question: 'How do you ensure WordPress security?', answer: 'We implement security headers, limit login attempts, use security plugins, keep everything updated, configure proper file permissions, and set up automated backups.' },
          { question: 'Can you speed up my slow WordPress site?', answer: 'Yes, we optimize images, implement caching, minimize plugins, optimize database queries, and configure CDN for dramatically faster load times.' },
          { question: 'Do you offer WordPress maintenance?', answer: 'Yes, we offer monthly maintenance plans covering updates, backups, security monitoring, performance optimization, and content support.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 26,
    },
    {
      name: 'Graphic Design',
      slug: 'graphic-design',
      description: 'Graphic design and branding',
      shortDescription: 'Create stunning visual identities and marketing materials.',
      fullDescription: 'Elevate your brand with professional graphic design that captures attention and communicates your message. We create cohesive visual identities, marketing collateral, social media assets, and presentation designs that set you apart from the competition. From logo design to complete brand systems, we deliver designs that resonate.',
      icon: 'swatch',
      heroImage: '/images/services/graphic-design-hero.jpg',
      features: ['Logo & Brand Identity Design', 'Marketing Collateral & Print', 'Social Media Graphics & Templates', 'Presentation & Pitch Deck Design', 'Packaging Design', 'Brand Style Guides'],
      benefits: ['Professional brand image', 'Consistent visual identity across channels', 'Higher engagement with quality visuals', 'Save time with reusable templates', 'Stand out from competitors'],
      content: {
        process: [
          { step: 1, title: 'Brand Discovery', description: 'We understand your brand values, target audience, competitors, and design preferences.' },
          { step: 2, title: 'Concept Development', description: 'We create multiple design concepts and mood boards for your review and feedback.' },
          { step: 3, title: 'Design Refinement', description: 'We refine the chosen direction through iterative feedback rounds until it\'s perfect.' },
          { step: 4, title: 'Delivery & Guidelines', description: 'We deliver final files in all formats and create brand guidelines for consistent application.' },
        ],
        technologies: [
          { name: 'Adobe Illustrator', icon: 'adobe' }, { name: 'Adobe Photoshop', icon: 'adobe' }, { name: 'Figma', icon: 'figma' },
          { name: 'Adobe InDesign', icon: 'adobe' }, { name: 'Canva Pro', icon: 'canva' }, { name: 'After Effects', icon: 'adobe' },
        ],
        portfolio: [
          { title: 'Tech Startup Brand Identity', category: 'Tech', image: '/images/portfolio/design-project1.jpg' },
          { title: 'Restaurant Brand Overhaul', category: 'Food & Beverage', image: '/images/portfolio/design-project2.jpg' },
        ],
        faq: [
          { question: 'What file formats will I receive?', answer: 'We deliver source files (AI, PSD, Figma), plus export formats (SVG, PNG, JPG, PDF) optimized for both web and print use.' },
          { question: 'How many revision rounds are included?', answer: 'Our packages typically include 3 revision rounds. We work closely with you throughout the process to ensure the final design exceeds expectations.' },
          { question: 'Do you create brand guidelines?', answer: 'Yes, we create comprehensive brand style guides covering logo usage, color palettes, typography, imagery style, and application examples.' },
          { question: 'Can you design for both digital and print?', answer: 'Absolutely. We design for all mediums—web, social media, email, print, packaging, signage, and merchandise.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 27,
    },
    {
      name: 'Cloud Migration',
      slug: 'cloud-migration',
      description: 'Cloud migration and modernization',
      shortDescription: 'Seamlessly migrate your infrastructure to the cloud for better performance and cost.',
      fullDescription: 'Modernize your IT infrastructure with a smooth, secure cloud migration. We help businesses move from on-premise servers, legacy systems, or between cloud providers with minimal downtime and zero data loss. Our migration experts handle everything from assessment and planning to execution and optimization.',
      icon: 'cloud-arrow-up',
      heroImage: '/images/services/cloud-migration-hero.jpg',
      features: ['Cloud Readiness Assessment', 'Migration Strategy & Planning', 'Application Refactoring', 'Database Migration', 'Hybrid & Multi-Cloud Setup', 'Post-Migration Optimization'],
      benefits: ['Reduce infrastructure costs by 30-50%', 'Improve performance and reliability', 'Enable auto-scaling for growth', 'Enhance disaster recovery', 'Modernize legacy applications'],
      content: {
        process: [
          { step: 1, title: 'Assessment', description: 'We inventory your infrastructure, applications, and dependencies to create a migration roadmap.' },
          { step: 2, title: 'Strategy & Planning', description: 'We choose the right migration strategy (lift-and-shift, re-platform, re-architect) for each workload.' },
          { step: 3, title: 'Migration Execution', description: 'We execute the migration in phases with proper testing, rollback plans, and minimal downtime.' },
          { step: 4, title: 'Optimization', description: 'We optimize cloud resources, implement monitoring, and train your team on cloud operations.' },
        ],
        technologies: [
          { name: 'AWS Migration Hub', icon: 'aws' }, { name: 'Azure Migrate', icon: 'azure' }, { name: 'Google Cloud Migrate', icon: 'googlecloud' },
          { name: 'Terraform', icon: 'terraform' }, { name: 'Docker', icon: 'docker' }, { name: 'Kubernetes', icon: 'kubernetes' },
        ],
        portfolio: [
          { title: 'Enterprise On-Prem to AWS', category: 'Enterprise', image: '/images/portfolio/migration-project1.jpg' },
          { title: 'Multi-Cloud Strategy', category: 'Finance', image: '/images/portfolio/migration-project2.jpg' },
        ],
        faq: [
          { question: 'How long does cloud migration take?', answer: 'Simple migrations take 2-4 weeks, while complex enterprise migrations can take 3-12 months. We phase migrations to deliver value incrementally.' },
          { question: 'Will there be downtime during migration?', answer: 'We plan migrations to minimize downtime, often achieving zero-downtime using blue-green deployments and database replication strategies.' },
          { question: 'Which cloud provider should I choose?', answer: 'AWS has the broadest services, Azure integrates well with Microsoft ecosystems, and GCP excels in data/ML. We help you evaluate based on your specific needs.' },
          { question: 'How much can I save by moving to the cloud?', answer: 'Most organizations save 30-50% on infrastructure costs through right-sizing, reserved instances, and auto-scaling. We provide a TCO analysis before migration.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 28,
    },
  ];

  for (const serviceData of servicesData) {
    const { features, benefits, content, ...baseData } = serviceData;
    await prisma.service.upsert({
      where: { slug: serviceData.slug },
      update: {
        ...baseData,
        features,
        benefits,
        content: content as any,
      },
      create: {
        ...baseData,
        features,
        benefits,
        content: content as any,
      },
    });
  }
  console.log(`Seeded ${servicesData.length} services with rich content`);

  // ==================== PRICING PACKAGES ====================

  const webDev = await prisma.service.findUnique({ where: { slug: 'web-development' } });
  const aiSolutions = await prisma.service.findUnique({ where: { slug: 'ai-solutions' } });
  const mobileDev = await prisma.service.findUnique({ where: { slug: 'mobile-development' } });
  const pythonAuto = await prisma.service.findUnique({ where: { slug: 'python-automation' } });

  if (webDev && aiSolutions && mobileDev && pythonAuto) {
    const pricingPackages = [
      { serviceId: webDev.id, tier: 'starter', name: 'Starter', price: '$4,999', description: 'Perfect for small businesses', features: ['Single-page website', 'Responsive design', 'SEO optimization', '2 weeks delivery'], highlighted: false },
      { serviceId: webDev.id, tier: 'professional', name: 'Professional', price: '$12,999', description: 'Ideal for growing businesses', features: ['Multi-page website', 'Custom design', 'CMS integration', '3 months support'], highlighted: true },
      { serviceId: webDev.id, tier: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'Full-scale applications', features: ['Unlimited pages', 'Custom web app', 'API development', '6+ months support'], highlighted: false },
      { serviceId: aiSolutions.id, tier: 'starter', name: 'Starter', price: '$4,999', description: 'Single AI model', features: ['Single AI model', 'Basic preprocessing', 'API integration', '1 month maintenance'], highlighted: false },
      { serviceId: aiSolutions.id, tier: 'professional', name: 'Professional', price: '$12,999', description: 'Multiple AI models', features: ['Multiple models', 'Advanced pipeline', 'Custom API', '3 months support'], highlighted: true },
      { serviceId: aiSolutions.id, tier: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'Enterprise AI', features: ['Unlimited models', 'End-to-end MLOps', 'Dedicated team', '24/7 support'], highlighted: false },
      { serviceId: mobileDev.id, tier: 'starter', name: 'Starter', price: '$9,999', description: 'Single platform app', features: ['iOS or Android', 'Basic features', 'App store submission', '1 month support'], highlighted: false },
      { serviceId: mobileDev.id, tier: 'professional', name: 'Professional', price: '$24,999', description: 'Cross-platform app', features: ['iOS & Android', 'Advanced features', 'Push notifications', '3 months support'], highlighted: true },
      { serviceId: mobileDev.id, tier: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'Enterprise mobile', features: ['Multiple apps', 'Backend integration', 'Analytics', '12 months support'], highlighted: false },
      { serviceId: pythonAuto.id, tier: 'starter', name: 'Starter', price: '$2,499', description: 'Basic automation scripts', features: ['Up to 10 scripts', 'Basic optimization', 'Documentation'], highlighted: false },
      { serviceId: pythonAuto.id, tier: 'professional', name: 'Professional', price: '$6,999', description: 'Comprehensive automation', features: ['Up to 50 scripts', 'Advanced workflows', 'Training workshop'], highlighted: true },
      { serviceId: pythonAuto.id, tier: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'Full infrastructure', features: ['Unlimited scripts', 'Custom orchestration', 'Dedicated engineer'], highlighted: false },
    ];

    await prisma.pricingPackage.deleteMany({});
    for (const pkg of pricingPackages) {
      await prisma.pricingPackage.create({ data: pkg });
    }
    console.log(`Seeded ${pricingPackages.length} pricing packages`);
  }

  // ==================== SAMPLE PROJECTS ====================

  const projectsData = [
    {
      name: 'E-commerce Platform Transformation',
      slug: 'ecommerce-platform-transformation',
      client: 'RetailTech Co.',
      category: 'E-Commerce',
      industry: 'E-commerce',
      description: 'Complete digital transformation of a legacy e-commerce platform to a modern, scalable solution.',
      fullDescription: 'The client was struggling with a slow, outdated e-commerce platform. We rebuilt their entire platform using Next.js and headless commerce architecture.',
      challenge: 'The client was struggling with a slow, outdated e-commerce platform that couldn\'t handle peak traffic and provided a poor mobile experience, leading to high cart abandonment rates.',
      solution: 'We rebuilt their entire platform using Next.js and headless commerce architecture, implementing advanced caching, CDN optimization, and a mobile-first design approach.',
      technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
      results: [
        { metric: 'Page Load Time', value: '-65%' },
        { metric: 'Conversion Rate', value: '+40%' },
        { metric: 'Mobile Sales', value: '+85%' },
        { metric: 'Uptime', value: '99.99%' },
      ],
      duration: '4 months',
      teamSize: '5 developers',
      thumbnail: '/images/projects/ecommerce.jpg',
      status: 'published',
      featured: true,
    },
    {
      name: 'AI Customer Service Chatbot',
      slug: 'ai-customer-service-chatbot',
      client: 'FinServ Inc.',
      category: 'AI',
      industry: 'Financial Services',
      description: 'Intelligent chatbot that handles 80% of customer inquiries automatically.',
      fullDescription: 'We developed an AI-powered chatbot using GPT-4 and RAG technology, integrated with their knowledge base and CRM system for personalized responses.',
      challenge: 'The client\'s customer service team was overwhelmed with routine inquiries, leading to long wait times and customer dissatisfaction.',
      solution: 'We developed an AI-powered chatbot using GPT-4 and RAG technology, integrated with their knowledge base and CRM system for personalized responses.',
      technologies: ['Python', 'OpenAI GPT-4', 'LangChain', 'Pinecone', 'FastAPI', 'React'],
      results: [
        { metric: 'Query Resolution', value: '80%' },
        { metric: 'Response Time', value: '-90%' },
        { metric: 'Customer Satisfaction', value: '+35%' },
        { metric: 'Cost Savings', value: '$2M/year' },
      ],
      duration: '3 months',
      teamSize: '4 developers',
      thumbnail: '/images/projects/chatbot.jpg',
      status: 'published',
      featured: true,
    },
  ];

  for (const projectData of projectsData) {
    const { results, ...baseData } = projectData;
    await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: { ...baseData, results: results as any },
      create: { ...baseData, results: results as any },
    });
  }
  console.log(`Seeded ${projectsData.length} projects`);

  // ==================== DEFAULT SETTINGS ====================

  const defaultSettings = [
    { key: 'siteName', value: JSON.stringify('PakSoft'), category: 'general' },
    { key: 'siteUrl', value: JSON.stringify('https://paksoft.com'), category: 'general' },
    { key: 'adminEmail', value: JSON.stringify('admin@paksoft.com'), category: 'general' },
    { key: 'timezone', value: JSON.stringify('Europe/Istanbul'), category: 'general' },
    { key: 'language', value: JSON.stringify('en'), category: 'general' },
    { key: 'emailNotifications', value: JSON.stringify(true), category: 'notifications' },
    { key: 'pushNotifications', value: JSON.stringify(false), category: 'notifications' },
    { key: 'weeklyReports', value: JSON.stringify(true), category: 'notifications' },
    { key: 'twoFactor', value: JSON.stringify(true), category: 'security' },
    { key: 'sessionTimeout', value: JSON.stringify('30'), category: 'security' },
    { key: 'theme', value: JSON.stringify('light'), category: 'appearance' },
    { key: 'blocked_ips', value: JSON.stringify([]), category: 'security' },
    { key: 'security_checklist', value: JSON.stringify([
      { name: 'SSL/TLS Certificate', status: true },
      { name: 'Firewall Active', status: true },
      { name: 'DDoS Protection', status: true },
      { name: 'Two-Factor Authentication', status: true },
      { name: 'Rate Limiting', status: true },
      { name: 'Input Validation', status: true },
      { name: 'CORS Configuration', status: true },
      { name: 'Security Headers', status: false },
    ]), category: 'security' },
  ];

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value, category: setting.category },
      create: setting,
    });
  }
  console.log(`Seeded ${defaultSettings.length} settings`);

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
