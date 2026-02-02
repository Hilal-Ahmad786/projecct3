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
    {
      name: 'Digital Marketing',
      slug: 'digital-marketing',
      description: 'SEO, PPC, and social media',
      shortDescription: 'Grow your online presence and reach more customers.',
      fullDescription: 'Drive traffic, generate leads, and grow your business with our data-driven digital marketing services. We combine creative strategy with technical expertise to deliver measurable results across search, social, email, and paid advertising. Our approach is focused on ROI, using analytics to continuously optimize campaigns.',
      icon: 'megaphone',
      heroImage: '/images/services/digital-marketing-hero.jpg',
      features: ['Search Engine Optimization (SEO)', 'Pay-Per-Click Advertising (PPC)', 'Social Media Marketing', 'Content Marketing Strategy', 'Email Marketing Automation', 'Conversion Rate Optimization', 'Marketing Analytics & Reporting', 'Influencer Marketing'],
      benefits: ['Increase website traffic and visibility', 'Generate more qualified leads', 'Improve brand awareness and reach', 'Achieve measurable ROI on marketing spend', 'Build engaged customer communities', 'Outperform competitors in search results'],
      content: {
        process: [
          { step: 1, title: 'Audit & Analysis', description: 'We analyze your current digital presence, competitors, and market to identify opportunities and gaps.' },
          { step: 2, title: 'Strategy Development', description: 'We create a comprehensive marketing strategy with clear goals, target audiences, and channel mix.' },
          { step: 3, title: 'Campaign Execution', description: 'We implement campaigns across chosen channels with compelling creative and targeted messaging.' },
          { step: 4, title: 'Optimization', description: 'We continuously monitor performance and optimize campaigns based on data and testing results.' },
          { step: 5, title: 'Reporting & Insights', description: 'We provide regular reports with actionable insights and recommendations for continuous improvement.' },
        ],
        technologies: [
          { name: 'Google Analytics', icon: 'googleanalytics' }, { name: 'Google Ads', icon: 'googleads' }, { name: 'Meta Ads', icon: 'meta' },
          { name: 'HubSpot', icon: 'hubspot' }, { name: 'Mailchimp', icon: 'mailchimp' }, { name: 'SEMrush', icon: 'semrush' },
          { name: 'Ahrefs', icon: 'ahrefs' }, { name: 'Hootsuite', icon: 'hootsuite' },
        ],
        portfolio: [
          { title: 'SaaS Lead Generation Campaign', category: 'Tech', image: '/images/portfolio/marketing-project1.jpg' },
          { title: 'E-commerce SEO Transformation', category: 'Retail', image: '/images/portfolio/marketing-project2.jpg' },
          { title: 'B2B Content Marketing', category: 'Professional Services', image: '/images/portfolio/marketing-project3.jpg' },
        ],
        faq: [
          { question: 'How long until I see results from SEO?', answer: 'SEO is a long-term investment. You may see initial improvements in 3-6 months, with significant results typically appearing after 6-12 months. We provide monthly progress reports to track improvements.' },
          { question: 'What is your approach to paid advertising?', answer: 'We start with thorough research, create targeted campaigns with compelling ads, and continuously optimize based on performance data. We focus on maximizing ROI rather than just clicks.' },
          { question: 'Do you create content for marketing campaigns?', answer: 'Yes, we have content creators who produce blog posts, social media content, email newsletters, videos, and other marketing materials aligned with your brand and strategy.' },
          { question: 'How do you measure marketing success?', answer: 'We define KPIs upfront based on your goals: traffic, leads, conversions, revenue, engagement rates, etc. We provide transparent reporting dashboards and regular performance reviews.' },
        ],
      },
      status: 'published',
      featured: false,
      order: 10,
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
      order: 13,
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
