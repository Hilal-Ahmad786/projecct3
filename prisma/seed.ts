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
        animation: {
          heroVisual: 'code-editor',
          bgPattern: 'grid',
          decorations: 'squares',
          motion: 'type',
          featureStyle: 'icon-top',
          processLayout: 'timeline',
          particleCount: 45,
          glowIntensity: 'medium',
          colorScheme: 'primary',
          animationSpeed: 'normal',
          floatingElements: ['<div>', '</>', '{...}', 'npm', 'git'],
          codeSnippets: ['const app = next()', 'export default', 'async function'],
          primaryColor: '#3B82F6',
          secondaryColor: '#10B981',
          accentColor: '#8B5CF6',
        },
      },
      status: 'published',
      featured: true,
      order: 1,
      category: 'web-software',
      isParent: true,
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
        animation: {
          heroVisual: 'brain-network',
          bgPattern: 'dots',
          decorations: 'circles',
          motion: 'pulse',
          featureStyle: 'gradient-border',
          processLayout: 'cards',
          particleCount: 80,
          glowIntensity: 'strong',
          colorScheme: 'accent',
          animationSpeed: 'slow',
          neuronCount: 12,
          connectionDensity: 'high',
          synapseGlow: true,
          dataFlowSpeed: 2.5,
          brainPulseRate: 1.8,
          primaryColor: '#8B5CF6',
          secondaryColor: '#EC4899',
          accentColor: '#06B6D4',
          gradientAngle: 135,
        },
      },
      status: 'published',
      featured: true,
      order: 2,
      category: 'ai-ml',
      isParent: true,
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
        animation: {
          heroVisual: 'mobile-device',
          bgPattern: 'waves',
          decorations: 'triangles',
          motion: 'float',
          featureStyle: 'icon-left',
          processLayout: 'steps-horizontal',
          particleCount: 35,
          glowIntensity: 'subtle',
          colorScheme: 'secondary',
          animationSpeed: 'normal',
          deviceRotation: true,
          screenContent: 'app-interface',
          notificationBubbles: 3,
          swipeGestures: true,
          appIconsFloat: true,
          iosAndroidSplit: true,
          primaryColor: '#10B981',
          secondaryColor: '#3B82F6',
          accentColor: '#F59E0B',
          deviceShadow: 'large',
          reflectionIntensity: 0.3,
        },
      },
      status: 'published',
      featured: true,
      order: 3,
      category: 'web-software',
      isParent: true,
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
        animation: {
          heroVisual: 'terminal',
          bgPattern: 'diagonal-lines',
          decorations: 'hexagons',
          motion: 'cascade',
          featureStyle: 'numbered',
          processLayout: 'timeline',
          particleCount: 55,
          glowIntensity: 'medium',
          colorScheme: 'gradient',
          animationSpeed: 'fast',
          terminalLines: ['>>> import automation', '>>> task.run()', 'Success: 1000 records processed'],
          cursorBlink: true,
          codeHighlighting: true,
          outputStreaming: true,
          primaryColor: '#3776AB',
          secondaryColor: '#FFD43B',
          accentColor: '#306998',
          terminalTheme: 'dark',
          syntaxColors: ['#F8F8F2', '#FF79C6', '#BD93F9'],
        },
      },
      status: 'published',
      featured: false,
      order: 4,
      category: 'infrastructure',
      isParent: true,
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
        animation: {
          heroVisual: 'chart-graph',
          bgPattern: 'hexagons',
          decorations: 'dots',
          motion: 'wave',
          featureStyle: 'bordered',
          processLayout: 'cards',
          particleCount: 60,
          glowIntensity: 'subtle',
          colorScheme: 'primary',
          animationSpeed: 'normal',
          chartTypes: ['bar', 'line', 'pie', 'scatter'],
          dataPoints: 24,
          animatedBars: true,
          lineDrawing: true,
          tooltipsEnabled: true,
          axisLabels: true,
          primaryColor: '#6366F1',
          secondaryColor: '#22C55E',
          accentColor: '#F59E0B',
          chartBackground: 'transparent',
          gridLines: true,
          legendPosition: 'bottom',
        },
      },
      status: 'published',
      featured: false,
      order: 5,
      category: 'infrastructure',
      isParent: true,
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
        animation: {
          heroVisual: 'network-nodes',
          bgPattern: 'circles',
          decorations: 'lines',
          motion: 'orbit',
          featureStyle: 'minimal',
          processLayout: 'zigzag',
          particleCount: 70,
          glowIntensity: 'strong',
          colorScheme: 'accent',
          animationSpeed: 'slow',
          nodeCount: 15,
          connectionLines: true,
          dataFlowParticles: true,
          layerVisualization: ['input', 'hidden1', 'hidden2', 'output'],
          weightGradient: true,
          activationGlow: true,
          trainingAnimation: true,
          primaryColor: '#EC4899',
          secondaryColor: '#8B5CF6',
          accentColor: '#06B6D4',
          nodeSize: 'medium',
          connectionOpacity: 0.6,
        },
      },
      status: 'published',
      featured: false,
      order: 6,
      category: 'ai-ml',
      isParent: true,
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
      category: 'ai-ml',
      isParent: true,
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
      category: 'web-software',
      isParent: true,
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
      category: 'web-software',
      isParent: true,
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
      category: 'marketing',
      isParent: true,
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
      category: 'marketing',
      isParent: true,
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
      category: 'marketing',
      isParent: true,
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
      category: 'marketing',
      isParent: true,
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
      category: 'marketing',
      isParent: true,
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
      category: 'marketing',
      isParent: true,
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
      category: 'marketing',
      isParent: false,
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
      category: 'marketing',
      isParent: false,
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
      category: 'web-software',
      isParent: true,
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
      category: 'infrastructure',
      isParent: true,
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
      category: 'infrastructure',
      isParent: true,
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
      category: 'ai-ml',
      isParent: false,
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
      category: 'ai-ml',
      isParent: false,
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
      category: 'ai-ml',
      isParent: false,
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
      category: 'ai-ml',
      isParent: false,
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
      category: 'ai-ml',
      isParent: false,
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
      category: 'infrastructure',
      isParent: false,
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
      category: 'web-software',
      isParent: false,
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
      category: 'web-software',
      isParent: false,
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
      category: 'web-software',
      isParent: true,
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
      category: 'infrastructure',
      isParent: false,
    },
    // ========== 34 CHILD SERVICES ==========
    // Web Development children
    {
      name: 'Frontend Development', slug: 'frontend-development',
      description: 'Modern frontend web development',
      shortDescription: 'Build fast, interactive user interfaces with React, Next.js, and modern frontend technologies.',
      fullDescription: 'Create stunning, performant user interfaces that delight users. We specialize in React, Next.js, and modern frontend frameworks to build responsive, accessible, and lightning-fast web experiences.',
      icon: 'code', heroImage: '/images/services/frontend-dev-hero.jpg', color: 'blue',
      features: ['React & Next.js Development', 'TypeScript Implementation', 'Responsive & Mobile-First Design', 'State Management', 'Component Library Development', 'Performance Optimization'],
      benefits: ['Lightning-fast user experiences', 'Cross-browser compatibility', 'Accessible & SEO-friendly interfaces', 'Maintainable component architecture'],
      content: { process: [{ step: 1, title: 'UI Requirements', description: 'Analyze design specs and plan frontend architecture.' }, { step: 2, title: 'Component Architecture', description: 'Design modular component system with state management.' }, { step: 3, title: 'Development & Testing', description: 'Build components with unit and integration tests.' }, { step: 4, title: 'Performance Optimization', description: 'Optimize bundle size, lazy loading, and Core Web Vitals.' }], technologies: [{ name: 'React', icon: 'react' }, { name: 'Next.js', icon: 'nextjs' }, { name: 'TypeScript', icon: 'typescript' }, { name: 'Tailwind CSS', icon: 'tailwind' }, { name: 'Zustand', icon: 'zustand' }, { name: 'Storybook', icon: 'storybook' }], faq: [{ question: 'Which frontend framework do you recommend?', answer: 'Next.js with React for most projects due to SEO, performance, and developer experience.' }, { question: 'Do you follow accessibility standards?', answer: 'Yes, we follow WCAG 2.1 AA guidelines and test with screen readers.' }, { question: 'How do you handle state management?', answer: 'Zustand or Redux Toolkit for complex state, React Query for server state.' }, { question: 'Can you work with our existing design system?', answer: 'Absolutely. We integrate with existing design systems or help build one.' }] },
      status: 'published', featured: false, order: 31, parentSlug: 'web-development', category: 'web-software', isParent: false,
    },
    {
      name: 'Backend Development', slug: 'backend-development',
      description: 'Scalable server-side development',
      shortDescription: 'Build robust, scalable backend systems with Node.js, Python, and cloud-native architectures.',
      fullDescription: 'Power your applications with reliable, scalable backend systems. We design and build APIs, microservices, databases, and server infrastructure using Node.js, Python, and Go.',
      icon: 'cog', heroImage: '/images/services/backend-dev-hero.jpg', color: 'blue',
      features: ['Node.js & Express/Fastify', 'Python Django & FastAPI', 'Database Design & Optimization', 'Microservices Architecture', 'Authentication & Authorization', 'Message Queues & Events'],
      benefits: ['Handle millions of concurrent users', 'Secure data processing', 'Scalable architecture', 'Reliable uptime'],
      content: { process: [{ step: 1, title: 'Architecture Design', description: 'Design system architecture, data models, and API contracts.' }, { step: 2, title: 'Database & Infrastructure', description: 'Set up databases, caching, and cloud infrastructure.' }, { step: 3, title: 'API Development', description: 'Build secure, documented APIs with validation and logging.' }, { step: 4, title: 'Testing & Deployment', description: 'Write tests and set up CI/CD pipelines.' }], technologies: [{ name: 'Node.js', icon: 'nodejs' }, { name: 'Python', icon: 'python' }, { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'Redis', icon: 'redis' }, { name: 'Docker', icon: 'docker' }, { name: 'RabbitMQ', icon: 'rabbitmq' }], faq: [{ question: 'What backend language do you recommend?', answer: 'Node.js for real-time apps, Python for data-intensive work, Go for high-performance microservices.' }, { question: 'How do you handle database scaling?', answer: 'Read replicas, connection pooling, query optimization, and sharding strategies.' }, { question: 'Microservices or monolith?', answer: 'Start with a well-structured monolith, extract microservices as needed.' }, { question: 'How do you ensure API security?', answer: 'JWT/OAuth2 auth, input validation, rate limiting, CORS, OWASP guidelines.' }] },
      status: 'published', featured: false, order: 32, parentSlug: 'web-development', category: 'web-software', isParent: false,
    },
    {
      name: 'Progressive Web Apps', slug: 'progressive-web-apps',
      description: 'PWA development for app-like web experiences',
      shortDescription: 'Deliver app-like experiences on the web with offline support, push notifications, and installability.',
      fullDescription: 'Bridge the gap between web and native apps with Progressive Web Apps. PWAs work offline, send push notifications, and install on any device from a single codebase.',
      icon: 'code', heroImage: '/images/services/pwa-hero.jpg', color: 'blue',
      features: ['Offline-First Architecture', 'Push Notifications', 'App Install Prompts', 'Background Sync', 'Service Worker Implementation', 'App Shell Architecture'],
      benefits: ['Works offline and on slow networks', 'Installable without app stores', 'Single codebase for all platforms', 'Lower cost than native apps'],
      content: { process: [{ step: 1, title: 'PWA Strategy', description: 'Assess use case and define valuable PWA features.' }, { step: 2, title: 'Architecture', description: 'Design app shell, caching strategies, and offline experience.' }, { step: 3, title: 'Development', description: 'Implement service workers, manifest, and PWA features.' }, { step: 4, title: 'Testing & Launch', description: 'Test across devices, optimize Lighthouse scores.' }], technologies: [{ name: 'Next.js', icon: 'nextjs' }, { name: 'Workbox', icon: 'workbox' }, { name: 'Service Workers', icon: 'pwa' }, { name: 'IndexedDB', icon: 'indexeddb' }, { name: 'Web Push API', icon: 'webpush' }, { name: 'Lighthouse', icon: 'lighthouse' }], faq: [{ question: 'What is a PWA?', answer: 'A website that behaves like a native app with offline support, push notifications, and installability.' }, { question: 'PWA or native app?', answer: 'PWAs for broad reach and lower costs; native apps for heavy device integration.' }, { question: 'Do PWAs work on iOS?', answer: 'Yes, with some limitations compared to Android. We design around them.' }, { question: 'How does offline work?', answer: 'Service workers cache assets and data; syncs automatically when online.' }] },
      status: 'published', featured: false, order: 33, parentSlug: 'web-development', category: 'web-software', isParent: false,
    },
    // E-Commerce children
    {
      name: 'Shopify Development', slug: 'shopify-development',
      description: 'Custom Shopify store development',
      shortDescription: 'Launch and scale your online store with custom Shopify development and optimization.',
      fullDescription: 'Build a high-converting Shopify store tailored to your brand. We create custom themes, develop apps, optimize checkout flows, and integrate third-party tools to maximize your e-commerce revenue.',
      icon: 'shopping-cart', heroImage: '/images/services/shopify-hero.jpg', color: 'emerald',
      features: ['Custom Theme Development', 'Shopify App Development', 'Checkout Optimization', 'Shopify Plus Solutions', 'Migration to Shopify', 'Performance Optimization'],
      benefits: ['Quick time-to-market', 'Proven e-commerce platform', 'Scalable infrastructure', 'Rich app ecosystem'],
      content: { process: [{ step: 1, title: 'Store Planning', description: 'Define product catalog, brand requirements, and feature needs.' }, { step: 2, title: 'Theme Development', description: 'Build custom Liquid theme matching your brand identity.' }, { step: 3, title: 'App & Integration', description: 'Install and configure apps, payment gateways, and shipping.' }, { step: 4, title: 'Launch & Optimize', description: 'Launch store and optimize for conversions and speed.' }], technologies: [{ name: 'Shopify', icon: 'shopify' }, { name: 'Liquid', icon: 'liquid' }, { name: 'Shopify CLI', icon: 'shopify' }, { name: 'Hydrogen', icon: 'hydrogen' }, { name: 'GraphQL', icon: 'graphql' }, { name: 'Klaviyo', icon: 'klaviyo' }], faq: [{ question: 'Shopify or Shopify Plus?', answer: 'Shopify Plus for high-volume stores needing advanced customization, automation, and dedicated support.' }, { question: 'Can you migrate from another platform?', answer: 'Yes, we migrate from WooCommerce, Magento, BigCommerce with full data preservation.' }, { question: 'Do you build custom Shopify apps?', answer: 'Yes, we develop custom public and private Shopify apps for unique business needs.' }, { question: 'How do you optimize conversions?', answer: 'Streamlined checkout, upsells, trust signals, speed optimization, and A/B testing.' }] },
      status: 'published', featured: false, order: 34, parentSlug: 'e-commerce', category: 'web-software', isParent: false,
    },
    {
      name: 'WooCommerce Development', slug: 'woocommerce-development',
      description: 'WooCommerce store development',
      shortDescription: 'Build powerful WordPress-based online stores with WooCommerce customization.',
      fullDescription: 'Leverage WooCommerce for flexible, customizable e-commerce on WordPress. We build custom WooCommerce stores with unique themes, custom plugins, and optimized checkout experiences.',
      icon: 'shopping-cart', heroImage: '/images/services/woocommerce-hero.jpg', color: 'violet',
      features: ['Custom WooCommerce Themes', 'Plugin Development', 'Payment Gateway Integration', 'Inventory Management', 'Subscription Products', 'Performance Optimization'],
      benefits: ['Full control over your store', 'No monthly platform fees', 'Unlimited customization', 'WordPress ecosystem access'],
      content: { process: [{ step: 1, title: 'Requirements', description: 'Define product types, payment needs, and custom features.' }, { step: 2, title: 'Theme & Plugin Dev', description: 'Build custom theme and develop required plugins.' }, { step: 3, title: 'Integration', description: 'Configure payments, shipping, tax, and third-party tools.' }, { step: 4, title: 'Launch', description: 'Test thoroughly and launch with performance optimization.' }], technologies: [{ name: 'WordPress', icon: 'wordpress' }, { name: 'WooCommerce', icon: 'woocommerce' }, { name: 'PHP', icon: 'php' }, { name: 'MySQL', icon: 'mysql' }, { name: 'Stripe', icon: 'stripe' }, { name: 'REST API', icon: 'api' }], faq: [{ question: 'WooCommerce or Shopify?', answer: 'WooCommerce for maximum customization and control; Shopify for simplicity and managed hosting.' }, { question: 'Can WooCommerce handle high traffic?', answer: 'Yes, with proper hosting, caching, and optimization, WooCommerce scales to millions of products.' }, { question: 'Do you build custom WooCommerce plugins?', answer: 'Yes, we develop custom plugins for unique business logic and integrations.' }, { question: 'How do you handle WooCommerce security?', answer: 'Regular updates, security plugins, SSL, PCI compliance, and secure payment processing.' }] },
      status: 'published', featured: false, order: 35, parentSlug: 'e-commerce', category: 'web-software', isParent: false,
    },
    {
      name: 'Marketplace Development', slug: 'marketplace-development',
      description: 'Multi-vendor marketplace platforms',
      shortDescription: 'Build multi-vendor marketplace platforms connecting buyers and sellers at scale.',
      fullDescription: 'Create thriving online marketplaces that connect buyers and sellers. We build multi-vendor platforms with vendor management, commission systems, dispute resolution, and seamless payment splitting.',
      icon: 'shopping-cart', heroImage: '/images/services/marketplace-hero.jpg', color: 'emerald',
      features: ['Multi-Vendor Management', 'Commission & Payout Systems', 'Vendor Onboarding Flows', 'Review & Rating Systems', 'Payment Splitting', 'Admin Dashboard'],
      benefits: ['Scalable platform business model', 'Network effects drive growth', 'Revenue from commissions', 'Lower inventory risk'],
      content: { process: [{ step: 1, title: 'Marketplace Strategy', description: 'Define marketplace model, commission structure, and vendor requirements.' }, { step: 2, title: 'Platform Architecture', description: 'Design multi-tenant architecture with vendor isolation and payment flows.' }, { step: 3, title: 'Development', description: 'Build vendor portals, buyer experience, and admin tools.' }, { step: 4, title: 'Launch & Growth', description: 'Onboard initial vendors, launch, and implement growth strategies.' }], technologies: [{ name: 'Next.js', icon: 'nextjs' }, { name: 'Stripe Connect', icon: 'stripe' }, { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'Redis', icon: 'redis' }, { name: 'Algolia', icon: 'algolia' }, { name: 'AWS', icon: 'aws' }], faq: [{ question: 'How do marketplace payments work?', answer: 'We use Stripe Connect for automated payment splitting, vendor payouts, and commission handling.' }, { question: 'How do you handle vendor management?', answer: 'Dedicated vendor portals with product management, order tracking, analytics, and payout dashboards.' }, { question: 'Can you build a two-sided marketplace?', answer: 'Yes, we build B2C, B2B, and C2C marketplaces with matching algorithms and search.' }, { question: 'How long to build a marketplace MVP?', answer: 'A focused marketplace MVP typically takes 4-6 months depending on complexity.' }] },
      status: 'published', featured: false, order: 36, parentSlug: 'e-commerce', category: 'web-software', isParent: false,
    },
    // API Development children
    {
      name: 'REST API Development', slug: 'rest-api-development',
      description: 'RESTful API design and development',
      shortDescription: 'Design and build clean, scalable RESTful APIs following industry best practices.',
      fullDescription: 'Build robust RESTful APIs that power web and mobile applications. We follow REST conventions, implement proper HTTP methods, status codes, pagination, and versioning for developer-friendly APIs.',
      icon: 'api', heroImage: '/images/services/rest-api-hero.jpg', color: 'violet',
      features: ['RESTful API Design', 'OpenAPI/Swagger Documentation', 'Authentication (JWT, OAuth2)', 'Rate Limiting & Throttling', 'Versioning Strategies', 'Automated Testing'],
      benefits: ['Industry-standard API design', 'Easy integration for consumers', 'Comprehensive documentation', 'Scalable architecture'],
      content: { process: [{ step: 1, title: 'API Design', description: 'Design resource models, endpoints, and API contracts using OpenAPI spec.' }, { step: 2, title: 'Development', description: 'Build API with proper validation, error handling, and authentication.' }, { step: 3, title: 'Documentation', description: 'Generate interactive documentation with examples and SDKs.' }, { step: 4, title: 'Testing & Deploy', description: 'Automated testing, load testing, and production deployment.' }], technologies: [{ name: 'Node.js', icon: 'nodejs' }, { name: 'Express', icon: 'express' }, { name: 'Swagger', icon: 'swagger' }, { name: 'Postman', icon: 'postman' }, { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'Redis', icon: 'redis' }], faq: [{ question: 'What makes a good REST API?', answer: 'Consistent naming, proper HTTP methods, meaningful status codes, pagination, filtering, and comprehensive documentation.' }, { question: 'How do you handle API versioning?', answer: 'We use URL path versioning (v1, v2) as the primary strategy, ensuring backward compatibility.' }, { question: 'What about API security?', answer: 'JWT/OAuth2 authentication, HTTPS, input validation, rate limiting, and API key management.' }, { question: 'Do you provide API documentation?', answer: 'Yes, interactive Swagger/OpenAPI docs with code examples in multiple languages.' }] },
      status: 'published', featured: false, order: 37, parentSlug: 'api-development', category: 'web-software', isParent: false,
    },
    {
      name: 'GraphQL Development', slug: 'graphql-development',
      description: 'GraphQL API design and implementation',
      shortDescription: 'Build flexible, efficient GraphQL APIs that let clients query exactly the data they need.',
      fullDescription: 'Implement GraphQL APIs that give frontend teams the power to request exactly the data they need. We design schemas, implement resolvers, handle subscriptions, and optimize performance for production-grade GraphQL.',
      icon: 'api', heroImage: '/images/services/graphql-hero.jpg', color: 'rose',
      features: ['Schema Design & Modeling', 'Query & Mutation Resolvers', 'Real-time Subscriptions', 'DataLoader & N+1 Prevention', 'Authentication & Authorization', 'Federation & Stitching'],
      benefits: ['Flexible data fetching', 'Reduced over-fetching', 'Strong type system', 'Real-time capabilities'],
      content: { process: [{ step: 1, title: 'Schema Design', description: 'Design the GraphQL schema with types, queries, mutations, and subscriptions.' }, { step: 2, title: 'Resolver Implementation', description: 'Build efficient resolvers with DataLoader for batching and caching.' }, { step: 3, title: 'Auth & Security', description: 'Implement field-level authorization and query complexity analysis.' }, { step: 4, title: 'Optimization', description: 'Optimize queries, implement caching, and set up monitoring.' }], technologies: [{ name: 'Apollo Server', icon: 'apollo' }, { name: 'GraphQL', icon: 'graphql' }, { name: 'TypeGraphQL', icon: 'typegraphql' }, { name: 'Prisma', icon: 'prisma' }, { name: 'DataLoader', icon: 'dataloader' }, { name: 'Redis', icon: 'redis' }], faq: [{ question: 'GraphQL or REST?', answer: 'GraphQL excels when clients need flexible queries or you have multiple frontends. REST is simpler for straightforward CRUD operations.' }, { question: 'How do you prevent N+1 queries?', answer: 'We use DataLoader for batching and caching database queries, plus query analysis tools to detect performance issues.' }, { question: 'Can GraphQL handle real-time data?', answer: 'Yes, GraphQL Subscriptions enable real-time updates via WebSockets for live data features.' }, { question: 'How do you secure GraphQL?', answer: 'Query depth limiting, complexity analysis, field-level auth, and rate limiting to prevent abuse.' }] },
      status: 'published', featured: false, order: 38, parentSlug: 'api-development', category: 'web-software', isParent: false,
    },
    {
      name: 'Third-Party API Integration', slug: 'third-party-api-integration',
      description: 'Connect and integrate external APIs',
      shortDescription: 'Seamlessly connect your systems with payment processors, CRMs, ERPs, and any third-party API.',
      fullDescription: 'Connect your applications with the tools and services you rely on. We integrate payment gateways, CRM systems, marketing platforms, ERPs, and custom APIs to create unified, automated workflows.',
      icon: 'api', heroImage: '/images/services/api-integration-hero.jpg', color: 'violet',
      features: ['Payment Gateway Integration', 'CRM & ERP Connections', 'Marketing Platform APIs', 'Webhook Implementation', 'Data Synchronization', 'Error Handling & Retry Logic'],
      benefits: ['Unified data across systems', 'Automated workflows', 'Reduced manual data entry', 'Real-time synchronization'],
      content: { process: [{ step: 1, title: 'Integration Audit', description: 'Map existing systems and define integration requirements and data flows.' }, { step: 2, title: 'Architecture', description: 'Design integration architecture with proper error handling and monitoring.' }, { step: 3, title: 'Implementation', description: 'Build integrations with authentication, data mapping, and sync logic.' }, { step: 4, title: 'Testing & Monitoring', description: 'Test edge cases, set up monitoring, and deploy with alerting.' }], technologies: [{ name: 'Stripe', icon: 'stripe' }, { name: 'HubSpot', icon: 'hubspot' }, { name: 'Salesforce', icon: 'salesforce' }, { name: 'Zapier', icon: 'zapier' }, { name: 'Webhooks', icon: 'webhooks' }, { name: 'Node.js', icon: 'nodejs' }], faq: [{ question: 'What APIs can you integrate?', answer: 'Any API with documentation—payment gateways, CRMs, ERPs, marketing tools, social media, shipping, and custom APIs.' }, { question: 'How do you handle API rate limits?', answer: 'We implement queuing, backoff strategies, caching, and batch processing to stay within API limits.' }, { question: 'What if the third-party API changes?', answer: 'We build abstraction layers and version pinning so API changes can be handled with minimal impact.' }, { question: 'Can you sync data between systems?', answer: 'Yes, we build real-time and scheduled sync with conflict resolution and data transformation.' }] },
      status: 'published', featured: false, order: 39, parentSlug: 'api-development', category: 'web-software', isParent: false,
    },
    // UI/UX Design children
    {
      name: 'UI Design', slug: 'ui-design',
      description: 'Visual interface design',
      shortDescription: 'Create beautiful, pixel-perfect visual interfaces that strengthen your brand and delight users.',
      fullDescription: 'Craft visually stunning interfaces that communicate your brand and guide users effortlessly. Our UI designers create cohesive design systems, responsive layouts, and interactive elements that look beautiful on every device.',
      icon: 'paint-brush', heroImage: '/images/services/ui-design-hero.jpg', color: 'rose',
      features: ['Visual Design & Branding', 'Design System Creation', 'Responsive Layouts', 'Icon & Illustration Design', 'Dark Mode Design', 'Micro-Interactions'],
      benefits: ['Consistent brand experience', 'Higher user engagement', 'Faster development with design systems', 'Professional visual identity'],
      content: { process: [{ step: 1, title: 'Brand & Style', description: 'Define visual language, color palettes, typography, and design principles.' }, { step: 2, title: 'Component Design', description: 'Create reusable UI components and design system documentation.' }, { step: 3, title: 'Screen Design', description: 'Design all screens with responsive variants and interactive states.' }, { step: 4, title: 'Handoff', description: 'Prepare developer-ready specs with assets, measurements, and guidelines.' }], technologies: [{ name: 'Figma', icon: 'figma' }, { name: 'Adobe XD', icon: 'adobexd' }, { name: 'Sketch', icon: 'sketch' }, { name: 'Zeplin', icon: 'zeplin' }, { name: 'Lottie', icon: 'lottie' }, { name: 'Storybook', icon: 'storybook' }], faq: [{ question: 'What deliverables do I receive?', answer: 'Figma files, design system documentation, asset exports, responsive variants, and developer handoff specs.' }, { question: 'How many revision rounds?', answer: 'Typically 3 rounds per screen. We collaborate closely to minimize back-and-forth.' }, { question: 'Do you create design systems?', answer: 'Yes, we build comprehensive design systems with tokens, components, patterns, and documentation.' }, { question: 'Can you match our existing brand?', answer: 'Absolutely. We work within your brand guidelines or help evolve them for digital contexts.' }] },
      status: 'published', featured: false, order: 40, parentSlug: 'ui-ux-design', category: 'web-software', isParent: false,
    },
    {
      name: 'UX Research', slug: 'ux-research',
      description: 'User experience research and testing',
      shortDescription: 'Understand your users deeply through research, testing, and data-driven insights.',
      fullDescription: 'Make design decisions backed by real user data. We conduct user interviews, surveys, usability testing, and analytics analysis to uncover user needs, pain points, and behaviors that inform better product design.',
      icon: 'magnifying-glass', heroImage: '/images/services/ux-research-hero.jpg', color: 'rose',
      features: ['User Interviews & Surveys', 'Usability Testing', 'Persona Development', 'Journey Mapping', 'A/B Testing & Analytics', 'Competitive Analysis'],
      benefits: ['Data-driven design decisions', 'Reduced development waste', 'Higher user satisfaction', 'Validated product concepts'],
      content: { process: [{ step: 1, title: 'Research Planning', description: 'Define research questions, methods, and participant recruitment strategy.' }, { step: 2, title: 'Data Collection', description: 'Conduct interviews, surveys, usability tests, and analytics analysis.' }, { step: 3, title: 'Analysis & Synthesis', description: 'Analyze findings, create personas, journey maps, and insight reports.' }, { step: 4, title: 'Recommendations', description: 'Deliver actionable design recommendations with prioritized opportunities.' }], technologies: [{ name: 'Maze', icon: 'maze' }, { name: 'Hotjar', icon: 'hotjar' }, { name: 'UserTesting', icon: 'usertesting' }, { name: 'Google Analytics', icon: 'googleanalytics' }, { name: 'Figma', icon: 'figma' }, { name: 'Miro', icon: 'miro' }], faq: [{ question: 'How many users should we test with?', answer: '5-8 users per round catches 80%+ of usability issues. We recommend iterative rounds for continuous improvement.' }, { question: 'What is a user persona?', answer: 'A research-based representation of your target user including demographics, goals, pain points, and behaviors.' }, { question: 'How does UX research save money?', answer: 'Catching usability issues early prevents costly redesigns and development rework. Research-backed decisions have higher success rates.' }, { question: 'Can you test our existing product?', answer: 'Yes, we conduct usability audits and testing on existing products to identify improvement opportunities.' }] },
      status: 'published', featured: false, order: 41, parentSlug: 'ui-ux-design', category: 'web-software', isParent: false,
    },
    {
      name: 'Prototyping & Wireframing', slug: 'prototyping-wireframing',
      description: 'Interactive prototypes and wireframes',
      shortDescription: 'Validate ideas fast with interactive prototypes and wireframes before writing any code.',
      fullDescription: 'Test and validate your product ideas before investing in development. We create wireframes and interactive prototypes that simulate the real user experience, enabling stakeholder alignment and user testing.',
      icon: 'paint-brush', heroImage: '/images/services/prototyping-hero.jpg', color: 'rose',
      features: ['Low-Fidelity Wireframes', 'High-Fidelity Prototypes', 'Interactive Click-Through Demos', 'User Flow Diagrams', 'Information Architecture', 'Stakeholder Presentations'],
      benefits: ['Validate before building', 'Align stakeholders early', 'Reduce development costs', 'Test with real users'],
      content: { process: [{ step: 1, title: 'Information Architecture', description: 'Define content structure, navigation, and user flows.' }, { step: 2, title: 'Wireframing', description: 'Create low-fidelity wireframes exploring layout and functionality.' }, { step: 3, title: 'Prototyping', description: 'Build interactive prototypes simulating the real experience.' }, { step: 4, title: 'Testing & Iteration', description: 'Test prototypes with users and iterate based on feedback.' }], technologies: [{ name: 'Figma', icon: 'figma' }, { name: 'InVision', icon: 'invision' }, { name: 'Principle', icon: 'principle' }, { name: 'Whimsical', icon: 'whimsical' }, { name: 'Miro', icon: 'miro' }, { name: 'Marvel', icon: 'marvel' }], faq: [{ question: 'What is the difference between wireframes and prototypes?', answer: 'Wireframes show layout and structure. Prototypes add interactivity so users can click through the experience as if it were real.' }, { question: 'How detailed should wireframes be?', answer: 'We start with low-fidelity for rapid exploration, then increase fidelity as decisions are finalized.' }, { question: 'Can we test prototypes with users?', answer: 'Absolutely, that is the primary purpose. We conduct user testing sessions to validate designs.' }, { question: 'Do prototypes speed up development?', answer: 'Yes, developers get clear specifications reducing ambiguity, questions, and rework during development.' }] },
      status: 'published', featured: false, order: 42, parentSlug: 'ui-ux-design', category: 'web-software', isParent: false,
    },
    // Mobile Development children
    {
      name: 'iOS Development', slug: 'ios-development',
      description: 'Native iOS app development',
      shortDescription: 'Build native iOS applications with Swift for the best Apple ecosystem experience.',
      fullDescription: 'Deliver premium iOS experiences with native Swift development. We build performant, beautiful iOS apps that leverage Apple frameworks like SwiftUI, ARKit, CoreML, and HealthKit.',
      icon: 'device-mobile', heroImage: '/images/services/ios-dev-hero.jpg', color: 'blue',
      features: ['Native Swift Development', 'SwiftUI & UIKit', 'ARKit & CoreML Integration', 'Apple Watch & iPad Apps', 'App Store Optimization', 'TestFlight Beta Testing'],
      benefits: ['Best iOS performance', 'Access all Apple APIs', 'Premium user experience', 'Apple ecosystem integration'],
      content: { process: [{ step: 1, title: 'App Planning', description: 'Define features, user flows, and iOS-specific requirements.' }, { step: 2, title: 'UI/UX Design', description: 'Design following Apple Human Interface Guidelines.' }, { step: 3, title: 'Development', description: 'Build with Swift, implement features, and integrate Apple frameworks.' }, { step: 4, title: 'Testing & Launch', description: 'TestFlight beta, QA testing, and App Store submission.' }], technologies: [{ name: 'Swift', icon: 'swift' }, { name: 'SwiftUI', icon: 'swiftui' }, { name: 'Xcode', icon: 'xcode' }, { name: 'CoreData', icon: 'coredata' }, { name: 'Firebase', icon: 'firebase' }, { name: 'TestFlight', icon: 'testflight' }], faq: [{ question: 'Swift or React Native for iOS?', answer: 'Native Swift for maximum performance and Apple ecosystem integration. React Native if you also need Android from the same codebase.' }, { question: 'How long does iOS development take?', answer: 'MVP in 3-4 months, full-featured app in 6-9 months depending on complexity.' }, { question: 'Do you handle App Store submission?', answer: 'Yes, we manage the entire process including assets, descriptions, and Apple review compliance.' }, { question: 'Can you build for iPad and Apple Watch?', answer: 'Yes, we build universal apps for iPhone, iPad, Apple Watch, and Apple TV.' }] },
      status: 'published', featured: false, order: 43, parentSlug: 'mobile-development', category: 'web-software', isParent: false,
    },
    {
      name: 'Android Development', slug: 'android-development',
      description: 'Native Android app development',
      shortDescription: 'Build native Android applications with Kotlin for optimal performance on all Android devices.',
      fullDescription: 'Reach the world is largest mobile platform with native Android development. We build high-quality Android apps with Kotlin and Jetpack Compose, optimized for the diverse Android ecosystem.',
      icon: 'device-mobile', heroImage: '/images/services/android-dev-hero.jpg', color: 'emerald',
      features: ['Native Kotlin Development', 'Jetpack Compose UI', 'Material Design 3', 'Google Play Services', 'Background Processing', 'Device Compatibility'],
      benefits: ['Access 3B+ Android devices', 'Best Android performance', 'Google ecosystem integration', 'Flexible distribution options'],
      content: { process: [{ step: 1, title: 'App Planning', description: 'Define features, device targets, and Android-specific requirements.' }, { step: 2, title: 'UI Design', description: 'Design following Material Design 3 guidelines for Android.' }, { step: 3, title: 'Development', description: 'Build with Kotlin, implement features with Jetpack libraries.' }, { step: 4, title: 'Testing & Launch', description: 'Test on multiple devices, optimize, and publish to Google Play.' }], technologies: [{ name: 'Kotlin', icon: 'kotlin' }, { name: 'Jetpack Compose', icon: 'jetpack' }, { name: 'Android Studio', icon: 'androidstudio' }, { name: 'Room DB', icon: 'room' }, { name: 'Firebase', icon: 'firebase' }, { name: 'Gradle', icon: 'gradle' }], faq: [{ question: 'Kotlin or Java for Android?', answer: 'Kotlin is the recommended language by Google for Android development, offering safety, conciseness, and modern features.' }, { question: 'How do you handle device fragmentation?', answer: 'We test on representative device sets, use responsive layouts, and follow Google best practices for compatibility.' }, { question: 'Can you publish to alternative app stores?', answer: 'Yes, we can publish to Google Play, Samsung Galaxy Store, Amazon Appstore, and other distribution channels.' }, { question: 'Do you build Android TV or Wear OS apps?', answer: 'Yes, we develop for the full Android ecosystem including TV, Wear OS, and automotive.' }] },
      status: 'published', featured: false, order: 44, parentSlug: 'mobile-development', category: 'web-software', isParent: false,
    },
    {
      name: 'Flutter Development', slug: 'flutter-development',
      description: 'Cross-platform Flutter app development',
      shortDescription: 'Build beautiful cross-platform apps for iOS, Android, web, and desktop with a single Flutter codebase.',
      fullDescription: 'Ship to all platforms from one codebase with Flutter. We build pixel-perfect, high-performance apps using Dart and Flutter that look native on iOS, Android, web, and desktop.',
      icon: 'device-mobile', heroImage: '/images/services/flutter-hero.jpg', color: 'blue',
      features: ['Single Codebase for All Platforms', 'Custom Widget Development', 'Native Performance', 'Hot Reload Development', 'Platform-Specific Adaptations', 'Firebase Integration'],
      benefits: ['50% faster development', 'Consistent UI across platforms', 'Native-like performance', 'Lower maintenance cost'],
      content: { process: [{ step: 1, title: 'Requirements', description: 'Define target platforms, features, and platform-specific needs.' }, { step: 2, title: 'Architecture', description: 'Design app architecture with proper state management and navigation.' }, { step: 3, title: 'Development', description: 'Build with Flutter, create custom widgets, integrate native features.' }, { step: 4, title: 'Testing & Deploy', description: 'Test on all target platforms and deploy to respective stores.' }], technologies: [{ name: 'Flutter', icon: 'flutter' }, { name: 'Dart', icon: 'dart' }, { name: 'Firebase', icon: 'firebase' }, { name: 'Riverpod', icon: 'riverpod' }, { name: 'Hive', icon: 'hive' }, { name: 'GetX', icon: 'getx' }], faq: [{ question: 'Flutter vs React Native?', answer: 'Flutter offers better performance and UI consistency. React Native has a larger ecosystem and JavaScript familiarity. We help you choose based on your needs.' }, { question: 'Can Flutter apps look native?', answer: 'Yes, Flutter supports platform-adaptive widgets and we customize UI to feel native on each platform.' }, { question: 'Is Flutter production-ready?', answer: 'Absolutely. Google, BMW, Alibaba, and many Fortune 500 companies use Flutter in production.' }, { question: 'Can Flutter apps use native device features?', answer: 'Yes, through platform channels and plugins, Flutter apps access cameras, GPS, Bluetooth, sensors, and more.' }] },
      status: 'published', featured: false, order: 45, parentSlug: 'mobile-development', category: 'web-software', isParent: false,
    },
    // Graphic Design children
    {
      name: 'Logo & Brand Identity', slug: 'logo-brand-identity',
      description: 'Logo design and brand identity systems',
      shortDescription: 'Create memorable logos and cohesive brand identity systems that define your visual presence.',
      fullDescription: 'Build a powerful brand from the ground up. We design distinctive logos and comprehensive brand identity systems including color palettes, typography, and brand guidelines that create lasting impressions.',
      icon: 'swatch', heroImage: '/images/services/logo-brand-hero.jpg', color: 'rose',
      features: ['Logo Design & Variations', 'Color Palette Development', 'Typography Selection', 'Brand Style Guide', 'Business Card & Stationery', 'Brand Asset Library'],
      benefits: ['Memorable brand recognition', 'Consistent brand experience', 'Professional credibility', 'Differentiation from competitors'],
      content: { process: [{ step: 1, title: 'Brand Discovery', description: 'Understand your values, audience, competitors, and brand personality.' }, { step: 2, title: 'Concept Development', description: 'Create multiple logo concepts exploring different directions.' }, { step: 3, title: 'Refinement', description: 'Refine chosen concept through feedback iterations.' }, { step: 4, title: 'Brand System', description: 'Develop full brand guidelines and asset delivery.' }], technologies: [{ name: 'Adobe Illustrator', icon: 'adobe' }, { name: 'Figma', icon: 'figma' }, { name: 'Adobe Photoshop', icon: 'adobe' }, { name: 'Coolors', icon: 'coolors' }, { name: 'FontPair', icon: 'fontpair' }, { name: 'Brandmark', icon: 'brandmark' }], faq: [{ question: 'How many logo concepts do you provide?', answer: 'We typically present 3-5 initial concepts, then refine the chosen direction through 3 revision rounds.' }, { question: 'What files will I receive?', answer: 'Logo in all formats (AI, SVG, PNG, JPG, PDF), color and mono versions, and a comprehensive brand guide.' }, { question: 'Do you research competitors first?', answer: 'Yes, competitive analysis is essential to ensure your brand stands out in your market.' }, { question: 'Can you rebrand an existing company?', answer: 'Yes, we handle full rebrands and brand refreshes, evolving existing identities while maintaining recognition.' }] },
      status: 'published', featured: false, order: 46, parentSlug: 'graphic-design', category: 'web-software', isParent: false,
    },
    {
      name: 'Print & Packaging Design', slug: 'print-packaging-design',
      description: 'Print materials and packaging design',
      shortDescription: 'Design eye-catching print materials, packaging, and marketing collateral that drive results.',
      fullDescription: 'Make a tangible impact with professional print and packaging design. We create brochures, flyers, business cards, product packaging, and trade show materials that represent your brand beautifully in the physical world.',
      icon: 'document-text', heroImage: '/images/services/print-packaging-hero.jpg', color: 'amber',
      features: ['Brochure & Flyer Design', 'Product Packaging', 'Business Cards & Stationery', 'Trade Show Materials', 'Catalog Design', 'Label & Tag Design'],
      benefits: ['Professional physical presence', 'Tangible marketing materials', 'Brand consistency in print', 'Production-ready files'],
      content: { process: [{ step: 1, title: 'Brief & Specs', description: 'Define print specifications, dimensions, and material requirements.' }, { step: 2, title: 'Design', description: 'Create designs optimized for print production with proper bleeds and marks.' }, { step: 3, title: 'Proofing', description: 'Review digital proofs and make adjustments before production.' }, { step: 4, title: 'Print-Ready Files', description: 'Deliver production-ready files with proper color profiles and specifications.' }], technologies: [{ name: 'Adobe InDesign', icon: 'adobe' }, { name: 'Adobe Illustrator', icon: 'adobe' }, { name: 'Adobe Photoshop', icon: 'adobe' }, { name: 'Canva Pro', icon: 'canva' }, { name: 'Packly', icon: 'packly' }, { name: 'Dieline', icon: 'dieline' }], faq: [{ question: 'What file formats for print?', answer: 'We deliver print-ready PDFs with CMYK colors, proper bleed, and crop marks. Source files (AI, INDD) also included.' }, { question: 'Can you handle packaging dielines?', answer: 'Yes, we design on accurate dieline templates and can work with your manufacturer specifications.' }, { question: 'Do you coordinate with printers?', answer: 'We can coordinate directly with your print vendor to ensure color accuracy and production quality.' }, { question: 'What about sustainable packaging?', answer: 'We design for eco-friendly materials and minimal waste, helping you meet sustainability goals.' }] },
      status: 'published', featured: false, order: 47, parentSlug: 'graphic-design', category: 'web-software', isParent: false,
    },
    {
      name: 'Motion Graphics', slug: 'motion-graphics',
      description: 'Animated graphics and video content',
      shortDescription: 'Bring your brand to life with animated graphics, explainer videos, and motion design.',
      fullDescription: 'Capture attention and explain complex ideas with motion graphics. We create animated logos, explainer videos, social media animations, and UI micro-interactions that engage audiences and communicate your message effectively.',
      icon: 'play', heroImage: '/images/services/motion-graphics-hero.jpg', color: 'violet',
      features: ['Animated Explainer Videos', 'Logo Animations', 'Social Media Animations', 'UI Micro-Interactions', 'Presentation Animations', 'Product Demo Videos'],
      benefits: ['Higher engagement rates', 'Complex ideas made simple', 'Shareable content', 'Premium brand perception'],
      content: { process: [{ step: 1, title: 'Concept & Script', description: 'Define the message, script, and storyboard for the animation.' }, { step: 2, title: 'Style Development', description: 'Develop visual style, color palette, and character design.' }, { step: 3, title: 'Animation', description: 'Create smooth, engaging animations with proper timing and easing.' }, { step: 4, title: 'Sound & Delivery', description: 'Add sound effects, music, and deliver in all required formats.' }], technologies: [{ name: 'After Effects', icon: 'adobe' }, { name: 'Lottie', icon: 'lottie' }, { name: 'Cinema 4D', icon: 'cinema4d' }, { name: 'Blender', icon: 'blender' }, { name: 'Premiere Pro', icon: 'adobe' }, { name: 'Figma Motion', icon: 'figma' }], faq: [{ question: 'How long should an explainer video be?', answer: '60-90 seconds is optimal for most explainer videos. We keep it concise to maintain viewer attention.' }, { question: 'What styles of animation do you offer?', answer: '2D flat animation, isometric, character animation, kinetic typography, 3D motion, and mixed media.' }, { question: 'Can animations be used on websites?', answer: 'Yes, we export Lottie animations for lightweight, scalable web animations that look perfect on any device.' }, { question: 'How long does production take?', answer: 'A 60-second animated video typically takes 3-4 weeks from concept to final delivery.' }] },
      status: 'published', featured: false, order: 48, parentSlug: 'graphic-design', category: 'web-software', isParent: false,
    },
    // AI Solutions children
    {
      name: 'AI Consulting & Strategy', slug: 'ai-consulting-strategy',
      description: 'AI strategy and consulting services',
      shortDescription: 'Develop a clear AI strategy aligned with your business goals and roadmap to implementation.',
      fullDescription: 'Navigate the AI landscape with expert guidance. We help you identify high-impact AI opportunities, build business cases, select the right technologies, and create implementation roadmaps that deliver measurable ROI.',
      icon: 'cpu', heroImage: '/images/services/ai-consulting-hero.jpg', color: 'violet',
      features: ['AI Readiness Assessment', 'Use Case Identification', 'Technology Selection', 'ROI Analysis & Business Cases', 'Implementation Roadmap', 'Team Training & Upskilling'],
      benefits: ['Clear AI strategy aligned to business goals', 'Avoid costly technology mistakes', 'Prioritized implementation plan', 'Faster time to AI value'],
      content: { process: [{ step: 1, title: 'Discovery', description: 'Assess your current capabilities, data assets, and business challenges.' }, { step: 2, title: 'Opportunity Mapping', description: 'Identify and prioritize AI use cases with ROI analysis.' }, { step: 3, title: 'Strategy Development', description: 'Create a phased AI roadmap with technology and resource recommendations.' }, { step: 4, title: 'Enablement', description: 'Provide training, vendor selection support, and implementation guidance.' }], technologies: [{ name: 'OpenAI', icon: 'openai' }, { name: 'Azure AI', icon: 'azure' }, { name: 'AWS AI', icon: 'aws' }, { name: 'Google AI', icon: 'googlecloud' }, { name: 'Hugging Face', icon: 'huggingface' }, { name: 'LangChain', icon: 'langchain' }], faq: [{ question: 'Do we need AI consulting?', answer: 'If you are exploring AI but unsure where to start, or have multiple potential use cases to prioritize, consulting saves time and money.' }, { question: 'What is an AI readiness assessment?', answer: 'We evaluate your data quality, infrastructure, team skills, and organizational culture to determine your readiness for AI adoption.' }, { question: 'How do you measure AI ROI?', answer: 'We define clear KPIs for each use case: cost savings, revenue increase, time saved, accuracy improvements, or customer satisfaction gains.' }, { question: 'Can you help build our internal AI team?', answer: 'Yes, we provide hiring guidance, team structure recommendations, and training programs for AI capability building.' }] },
      status: 'published', featured: false, order: 49, parentSlug: 'ai-solutions', category: 'ai-ml', isParent: false,
    },
    {
      name: 'Custom AI Development', slug: 'custom-ai-development',
      description: 'Bespoke AI solution development',
      shortDescription: 'Build custom AI solutions tailored to your unique business challenges and data.',
      fullDescription: 'Get AI solutions designed specifically for your business. We develop custom AI applications from scratch, combining multiple AI capabilities to solve your unique challenges with solutions that off-the-shelf products cannot match.',
      icon: 'cpu', heroImage: '/images/services/custom-ai-hero.jpg', color: 'violet',
      features: ['Custom Model Development', 'AI Application Architecture', 'Data Pipeline Engineering', 'Model Training & Optimization', 'Production Deployment', 'Continuous Improvement'],
      benefits: ['Solutions tailored to your data', 'Competitive advantage through proprietary AI', 'Full ownership of models', 'Optimized for your specific use case'],
      content: { process: [{ step: 1, title: 'Problem Definition', description: 'Deep dive into your business challenge and define the AI solution approach.' }, { step: 2, title: 'Data Engineering', description: 'Build data pipelines, clean data, and prepare training datasets.' }, { step: 3, title: 'Model Development', description: 'Develop, train, and validate custom AI models for your use case.' }, { step: 4, title: 'Production Deployment', description: 'Deploy to production with monitoring, scaling, and continuous improvement.' }], technologies: [{ name: 'Python', icon: 'python' }, { name: 'PyTorch', icon: 'pytorch' }, { name: 'TensorFlow', icon: 'tensorflow' }, { name: 'FastAPI', icon: 'fastapi' }, { name: 'Docker', icon: 'docker' }, { name: 'Kubernetes', icon: 'kubernetes' }], faq: [{ question: 'When do I need custom AI vs off-the-shelf?', answer: 'Custom AI is needed when your use case is unique, you have proprietary data, or existing solutions do not meet accuracy requirements.' }, { question: 'How much data do we need?', answer: 'It depends on the task. We can work with as little as a few hundred examples using transfer learning, or build large-scale systems with millions of records.' }, { question: 'How long does custom AI development take?', answer: 'A proof-of-concept takes 4-8 weeks. Production-ready solutions typically require 3-6 months.' }, { question: 'Who owns the AI models?', answer: 'You own all custom models and IP. We can also set up self-hosted infrastructure so nothing leaves your control.' }] },
      status: 'published', featured: false, order: 50, parentSlug: 'ai-solutions', category: 'ai-ml', isParent: false,
    },
    // Machine Learning children
    {
      name: 'Predictive Analytics', slug: 'predictive-analytics',
      description: 'Predictive modeling and forecasting',
      shortDescription: 'Forecast future trends, customer behavior, and business outcomes with ML-powered predictions.',
      fullDescription: 'See the future with data. We build predictive models that forecast sales, customer churn, demand, pricing, and more using historical data and advanced machine learning algorithms.',
      icon: 'chart-bar', heroImage: '/images/services/predictive-analytics-hero.jpg', color: 'blue',
      features: ['Demand Forecasting', 'Customer Churn Prediction', 'Sales Forecasting', 'Risk Scoring', 'Price Optimization', 'Anomaly Detection'],
      benefits: ['Proactive decision-making', 'Reduced business risk', 'Optimized resource allocation', 'Revenue growth through prediction'],
      content: { process: [{ step: 1, title: 'Data Assessment', description: 'Evaluate historical data quality and define prediction targets.' }, { step: 2, title: 'Feature Engineering', description: 'Create predictive features from your data for model training.' }, { step: 3, title: 'Model Development', description: 'Train and validate multiple models to find the best predictor.' }, { step: 4, title: 'Deployment', description: 'Deploy predictions as APIs or dashboards with monitoring.' }], technologies: [{ name: 'Python', icon: 'python' }, { name: 'Scikit-learn', icon: 'scikitlearn' }, { name: 'XGBoost', icon: 'xgboost' }, { name: 'Prophet', icon: 'prophet' }, { name: 'Pandas', icon: 'pandas' }, { name: 'MLflow', icon: 'mlflow' }], faq: [{ question: 'How accurate are predictions?', answer: 'Accuracy depends on data quality and problem complexity. We set realistic expectations and achieve 80-95% accuracy on most tasks.' }, { question: 'What data do we need?', answer: 'Historical data related to what you want to predict. Minimum 6-12 months of data for time-series, 1000+ records for classification.' }, { question: 'Can predictions update in real-time?', answer: 'Yes, we build real-time prediction APIs that process new data and return predictions instantly.' }, { question: 'How do you validate models?', answer: 'Cross-validation, holdout testing, and A/B testing in production to ensure predictions are reliable.' }] },
      status: 'published', featured: false, order: 51, parentSlug: 'machine-learning', category: 'ai-ml', isParent: false,
    },
    {
      name: 'NLP & Text Processing', slug: 'nlp-text-processing',
      description: 'Natural language processing solutions',
      shortDescription: 'Extract insights from text data with sentiment analysis, entity recognition, and text classification.',
      fullDescription: 'Unlock value from unstructured text data. We build NLP solutions for sentiment analysis, named entity recognition, text classification, summarization, and language translation.',
      icon: 'document-text', heroImage: '/images/services/nlp-hero.jpg', color: 'blue',
      features: ['Sentiment Analysis', 'Named Entity Recognition', 'Text Classification', 'Document Summarization', 'Language Detection & Translation', 'Keyword Extraction'],
      benefits: ['Understand customer sentiment at scale', 'Automate document processing', 'Extract structured data from text', 'Multi-language support'],
      content: { process: [{ step: 1, title: 'Text Analysis', description: 'Analyze your text data sources and define NLP objectives.' }, { step: 2, title: 'Model Selection', description: 'Choose the right NLP approach: rule-based, ML, or LLM-based.' }, { step: 3, title: 'Training & Testing', description: 'Train models on your domain data and validate accuracy.' }, { step: 4, title: 'Integration', description: 'Deploy NLP pipeline with API access and monitoring.' }], technologies: [{ name: 'spaCy', icon: 'spacy' }, { name: 'Hugging Face', icon: 'huggingface' }, { name: 'NLTK', icon: 'nltk' }, { name: 'OpenAI', icon: 'openai' }, { name: 'LangChain', icon: 'langchain' }, { name: 'Python', icon: 'python' }], faq: [{ question: 'What languages do you support?', answer: 'We support English, German, Turkish, Arabic, Urdu, and 50+ other languages through multilingual models.' }, { question: 'LLMs or traditional NLP?', answer: 'LLMs for flexible text generation and understanding; traditional NLP for cost-effective, specific classification and extraction tasks.' }, { question: 'How accurate is sentiment analysis?', answer: 'Modern sentiment analysis achieves 85-95% accuracy. Domain-specific fine-tuning further improves results.' }, { question: 'Can you process documents at scale?', answer: 'Yes, our NLP pipelines process millions of documents with batch processing and real-time APIs.' }] },
      status: 'published', featured: false, order: 52, parentSlug: 'machine-learning', category: 'ai-ml', isParent: false,
    },
    {
      name: 'Recommendation Systems', slug: 'recommendation-systems',
      description: 'Personalized recommendation engines',
      shortDescription: 'Boost engagement and sales with AI-powered personalized recommendations for your users.',
      fullDescription: 'Drive engagement and revenue with intelligent recommendations. We build recommendation engines that personalize content, products, and experiences based on user behavior and preferences.',
      icon: 'chart-bar', heroImage: '/images/services/recommendation-hero.jpg', color: 'amber',
      features: ['Collaborative Filtering', 'Content-Based Recommendations', 'Hybrid Recommendation Models', 'Real-Time Personalization', 'A/B Testing Framework', 'Cold Start Handling'],
      benefits: ['Increased average order value', 'Higher user engagement', 'Improved content discovery', 'Personalized user experiences'],
      content: { process: [{ step: 1, title: 'Data Analysis', description: 'Analyze user behavior data and define recommendation objectives.' }, { step: 2, title: 'Model Design', description: 'Design recommendation algorithms suited to your data and use case.' }, { step: 3, title: 'Implementation', description: 'Build and train recommendation models with evaluation metrics.' }, { step: 4, title: 'Deployment', description: 'Deploy with real-time serving, A/B testing, and monitoring.' }], technologies: [{ name: 'Python', icon: 'python' }, { name: 'TensorFlow Recommenders', icon: 'tensorflow' }, { name: 'Surprise', icon: 'surprise' }, { name: 'Redis', icon: 'redis' }, { name: 'Apache Spark', icon: 'spark' }, { name: 'MLflow', icon: 'mlflow' }], faq: [{ question: 'How much user data do we need?', answer: 'Collaborative filtering needs significant interaction data. Content-based can work with less. We design hybrid approaches for new platforms.' }, { question: 'How do you handle cold start?', answer: 'We use content-based features, demographic data, and popularity-based fallbacks for new users and items.' }, { question: 'Can recommendations work in real-time?', answer: 'Yes, our systems serve personalized recommendations in milliseconds using pre-computed models and caching.' }, { question: 'How do you measure recommendation quality?', answer: 'We track click-through rate, conversion rate, diversity, novelty, and A/B test business impact.' }] },
      status: 'published', featured: false, order: 53, parentSlug: 'machine-learning', category: 'ai-ml', isParent: false,
    },
    // Conversational AI children
    {
      name: 'Chatbot Development', slug: 'chatbot-development',
      description: 'Custom chatbot development',
      shortDescription: 'Build intelligent chatbots that handle customer inquiries, qualify leads, and automate support.',
      fullDescription: 'Deploy AI-powered chatbots that transform customer interactions. We build chatbots for customer support, lead qualification, appointment booking, and FAQ automation across web, mobile, and messaging platforms.',
      icon: 'chat', heroImage: '/images/services/chatbot-hero.jpg', color: 'emerald',
      features: ['Multi-Platform Deployment', 'NLU Intent Recognition', 'Context-Aware Conversations', 'Human Handoff', 'Multi-Language Support', 'Analytics Dashboard'],
      benefits: ['24/7 instant responses', '60% reduction in support tickets', 'Consistent customer experience', 'Scalable without hiring'],
      content: { process: [{ step: 1, title: 'Conversation Design', description: 'Define intents, entities, conversation flows, and personality.' }, { step: 2, title: 'Bot Development', description: 'Build chatbot with NLU, dialog management, and integrations.' }, { step: 3, title: 'Training', description: 'Train on your FAQ data and conversation examples.' }, { step: 4, title: 'Deploy & Improve', description: 'Launch, monitor conversations, and continuously improve.' }], technologies: [{ name: 'OpenAI GPT', icon: 'openai' }, { name: 'Dialogflow', icon: 'googlecloud' }, { name: 'Rasa', icon: 'rasa' }, { name: 'LangChain', icon: 'langchain' }, { name: 'Twilio', icon: 'twilio' }, { name: 'WhatsApp API', icon: 'whatsapp' }], faq: [{ question: 'Which platforms can chatbots run on?', answer: 'Web, mobile apps, WhatsApp, Facebook Messenger, Slack, Teams, SMS, and voice channels.' }, { question: 'How smart are modern chatbots?', answer: 'With GPT integration, chatbots understand context, handle multi-turn conversations, and generate human-like responses.' }, { question: 'What happens when the bot cannot help?', answer: 'Intelligent handoff to human agents with full conversation context for seamless transitions.' }, { question: 'How long to build a chatbot?', answer: 'A basic chatbot takes 2-4 weeks. Advanced AI chatbots with integrations take 6-10 weeks.' }] },
      status: 'published', featured: false, order: 54, parentSlug: 'conversational-ai', category: 'ai-ml', isParent: false,
    },
    {
      name: 'Voice Assistant Development', slug: 'voice-assistant-development',
      description: 'Custom voice assistant solutions',
      shortDescription: 'Build custom voice assistants and voice-enabled applications for hands-free interaction.',
      fullDescription: 'Enable voice-first experiences with custom voice assistants. We build voice interfaces for smart speakers, mobile apps, IVR systems, and IoT devices using speech recognition and natural language understanding.',
      icon: 'chat', heroImage: '/images/services/voice-assistant-hero.jpg', color: 'blue',
      features: ['Speech Recognition', 'Text-to-Speech', 'Voice Command Processing', 'Alexa & Google Skills', 'IVR Modernization', 'Voice Biometrics'],
      benefits: ['Hands-free user interaction', 'Accessibility improvement', 'Natural user interface', 'Modern customer experience'],
      content: { process: [{ step: 1, title: 'Voice UX Design', description: 'Design voice conversation flows, prompts, and error handling.' }, { step: 2, title: 'Speech Integration', description: 'Integrate speech recognition and text-to-speech services.' }, { step: 3, title: 'Development', description: 'Build voice processing pipeline with intent recognition and responses.' }, { step: 4, title: 'Testing & Launch', description: 'Test with diverse accents and environments, then deploy.' }], technologies: [{ name: 'Amazon Alexa', icon: 'aws' }, { name: 'Google Assistant', icon: 'googlecloud' }, { name: 'Azure Speech', icon: 'azure' }, { name: 'Whisper', icon: 'openai' }, { name: 'ElevenLabs', icon: 'elevenlabs' }, { name: 'Twilio', icon: 'twilio' }], faq: [{ question: 'Can you build custom Alexa skills?', answer: 'Yes, we develop custom Alexa Skills and Google Actions for smart speaker platforms.' }, { question: 'How accurate is speech recognition?', answer: 'Modern speech recognition achieves 95%+ accuracy in clean environments. We optimize for your specific use case and accent profiles.' }, { question: 'Can voice assistants work offline?', answer: 'Yes, on-device speech processing is possible for privacy-sensitive or connectivity-limited environments.' }, { question: 'Do you modernize IVR systems?', answer: 'Yes, we replace legacy IVR with conversational AI for natural, efficient phone interactions.' }] },
      status: 'published', featured: false, order: 55, parentSlug: 'conversational-ai', category: 'ai-ml', isParent: false,
    },    // SEO children
    { name: 'Technical SEO', slug: 'technical-seo', description: 'Technical search engine optimization', shortDescription: 'Fix technical issues that prevent search engines from crawling and indexing your site effectively.', fullDescription: 'Ensure search engines can crawl, index, and rank your site properly with technical SEO audits and optimization.', icon: 'magnifying-glass', heroImage: '/images/services/technical-seo-hero.jpg', color: 'emerald', features: ['Site Speed Optimization', 'Crawl Budget Optimization', 'Structured Data/Schema', 'Core Web Vitals', 'XML Sitemap Management', 'Canonical & Redirect Audits'], benefits: ['Better crawling and indexing', 'Improved page speed scores', 'Rich snippets in search', 'Solid technical foundation'], content: { process: [{ step: 1, title: 'Technical Audit', description: 'Comprehensive crawl analysis identifying all technical issues.' }, { step: 2, title: 'Prioritization', description: 'Rank issues by impact and create remediation roadmap.' }, { step: 3, title: 'Implementation', description: 'Fix technical issues and implement optimizations.' }, { step: 4, title: 'Monitoring', description: 'Set up monitoring for ongoing technical health.' }], technologies: [{ name: 'Screaming Frog', icon: 'screamingfrog' }, { name: 'Google Search Console', icon: 'google' }, { name: 'PageSpeed Insights', icon: 'google' }, { name: 'Ahrefs', icon: 'ahrefs' }, { name: 'Schema.org', icon: 'schema' }, { name: 'GTmetrix', icon: 'gtmetrix' }], faq: [{ question: 'What is technical SEO?', answer: 'Technical SEO ensures search engines can efficiently crawl and index your site.' }, { question: 'How often should I audit?', answer: 'Quarterly technical audits catch issues early.' }, { question: 'Does site speed affect rankings?', answer: 'Yes, Google uses Core Web Vitals as a ranking factor.' }, { question: 'What are structured data?', answer: 'Code that helps search engines understand your content for rich snippets.' }] }, status: 'published', featured: false, order: 56, parentSlug: 'seo', category: 'marketing', isParent: false },
    { name: 'Local SEO', slug: 'local-seo', description: 'Local search optimization', shortDescription: 'Dominate local search results and Google Maps to drive foot traffic and local leads.', fullDescription: 'Get found by customers in your area with Google Business Profile optimization, local citations, and review management.', icon: 'magnifying-glass', heroImage: '/images/services/local-seo-hero.jpg', color: 'emerald', features: ['Google Business Profile Optimization', 'Local Citation Building', 'Review Management', 'Local Keyword Targeting', 'Map Pack Optimization', 'Local Content Strategy'], benefits: ['Appear in Google Maps', 'Drive foot traffic', 'Build local reputation', 'Target local customers'], content: { process: [{ step: 1, title: 'Local Audit', description: 'Audit your local presence and competitor landscape.' }, { step: 2, title: 'GBP Optimization', description: 'Fully optimize your Google Business Profile.' }, { step: 3, title: 'Citation Building', description: 'Build and clean up local citations.' }, { step: 4, title: 'Ongoing Optimization', description: 'Monitor rankings, manage reviews, create local content.' }], technologies: [{ name: 'Google Business', icon: 'google' }, { name: 'BrightLocal', icon: 'brightlocal' }, { name: 'Moz Local', icon: 'moz' }, { name: 'Yext', icon: 'yext' }, { name: 'Google Maps', icon: 'google' }, { name: 'Whitespark', icon: 'whitespark' }], faq: [{ question: 'What is the Google Map Pack?', answer: 'Top 3 local business listings in Google Maps results.' }, { question: 'How important are reviews?', answer: 'Critical for local rankings and customer trust.' }, { question: 'What are local citations?', answer: 'Mentions of your business NAP on directories.' }, { question: 'How long for results?', answer: 'Initial improvements in 1-3 months, significant in 3-6 months.' }] }, status: 'published', featured: false, order: 57, parentSlug: 'seo', category: 'marketing', isParent: false },
    { name: 'Link Building', slug: 'link-building', description: 'Strategic link building', shortDescription: 'Build high-quality backlinks that boost your domain authority and search rankings.', fullDescription: 'Earn authoritative backlinks with ethical, white-hat link building strategies including digital PR, guest posting, and content-driven outreach.', icon: 'api', heroImage: '/images/services/link-building-hero.jpg', color: 'emerald', features: ['Digital PR & Outreach', 'Guest Posting', 'Broken Link Building', 'Resource Page Links', 'Competitor Analysis', 'Link Disavow & Cleanup'], benefits: ['Higher domain authority', 'Improved rankings', 'Referral traffic', 'Long-term SEO value'], content: { process: [{ step: 1, title: 'Backlink Audit', description: 'Analyze current backlink profile and competitor strategies.' }, { step: 2, title: 'Strategy', description: 'Develop link building strategy targeting high-authority sites.' }, { step: 3, title: 'Outreach', description: 'Execute outreach campaigns to earn quality backlinks.' }, { step: 4, title: 'Reporting', description: 'Track new links and domain authority growth.' }], technologies: [{ name: 'Ahrefs', icon: 'ahrefs' }, { name: 'Pitchbox', icon: 'pitchbox' }, { name: 'BuzzStream', icon: 'buzzstream' }, { name: 'Hunter.io', icon: 'hunter' }, { name: 'SEMrush', icon: 'semrush' }, { name: 'Majestic', icon: 'majestic' }], faq: [{ question: 'What makes a good backlink?', answer: 'Links from high-authority, relevant websites with natural anchor text.' }, { question: 'Is link building safe?', answer: 'We use only white-hat strategies, never PBNs or spammy tactics.' }, { question: 'How many links per month?', answer: 'Depends on competition. We set realistic monthly targets.' }, { question: 'How long for impact?', answer: 'New backlinks take 2-3 months to fully impact rankings.' }] }, status: 'published', featured: false, order: 58, parentSlug: 'seo', category: 'marketing', isParent: false },
    // Google Ads children
    { name: 'Google Search Ads', slug: 'google-search-ads', description: 'Google search advertising', shortDescription: 'Capture high-intent search traffic with expertly managed Google Search campaigns.', fullDescription: 'Appear at the top of Google when customers search for your products or services with precise keyword targeting and smart bidding.', icon: 'cursor-arrow-rays', heroImage: '/images/services/google-search-ads-hero.jpg', color: 'blue', features: ['Keyword Research & Strategy', 'Ad Copy Optimization', 'Smart Bidding', 'Negative Keyword Management', 'Ad Extensions', 'Quality Score Optimization'], benefits: ['Capture high-intent traffic', 'Measurable cost-per-lead', 'Immediate visibility', 'Precise targeting'], content: { process: [{ step: 1, title: 'Research', description: 'Research keywords, competitors, and audience.' }, { step: 2, title: 'Campaign Build', description: 'Structure campaigns with ad groups and compelling copy.' }, { step: 3, title: 'Launch', description: 'Launch with proper tracking and daily monitoring.' }, { step: 4, title: 'Optimize', description: 'Refine bids, keywords, and copy based on data.' }], technologies: [{ name: 'Google Ads', icon: 'googleads' }, { name: 'Google Analytics', icon: 'googleanalytics' }, { name: 'Google Tag Manager', icon: 'gtm' }, { name: 'Optmyzr', icon: 'optmyzr' }, { name: 'SpyFu', icon: 'spyfu' }, { name: 'Unbounce', icon: 'unbounce' }], faq: [{ question: 'How do you choose keywords?', answer: 'Analyze search volume, competition, intent, and business goals.' }, { question: 'What is Quality Score?', answer: 'Google rating of ad relevance affecting cost and position.' }, { question: 'How much budget needed?', answer: 'Recommend enough for 100+ clicks/month for optimization data.' }, { question: 'How to reduce wasted spend?', answer: 'Negative keywords, search term monitoring, and audience exclusions.' }] }, status: 'published', featured: false, order: 59, parentSlug: 'google-ads', category: 'marketing', isParent: false },
    { name: 'Google Display Ads', slug: 'google-display-ads', description: 'Google Display Network advertising', shortDescription: 'Build brand awareness and retarget visitors across millions of websites with display ads.', fullDescription: 'Reach potential customers across the Google Display Network with visually engaging display and remarketing campaigns.', icon: 'paint-brush', heroImage: '/images/services/google-display-hero.jpg', color: 'amber', features: ['Responsive Display Ads', 'Remarketing Campaigns', 'Audience Targeting', 'Placement Optimization', 'Creative A/B Testing', 'Brand Awareness'], benefits: ['Reach billions of websites', 'Powerful remarketing', 'Visual storytelling', 'Lower CPMs'], content: { process: [{ step: 1, title: 'Strategy', description: 'Define targeting, placements, and creative strategy.' }, { step: 2, title: 'Creative', description: 'Design responsive ads in multiple formats.' }, { step: 3, title: 'Launch', description: 'Set up targeting, bidding, and launch.' }, { step: 4, title: 'Optimize', description: 'Optimize placements and creatives for performance.' }], technologies: [{ name: 'Google Ads', icon: 'googleads' }, { name: 'Google Analytics', icon: 'googleanalytics' }, { name: 'Canva', icon: 'canva' }, { name: 'Adobe Creative Suite', icon: 'adobe' }, { name: 'Google Tag Manager', icon: 'gtm' }, { name: 'Looker Studio', icon: 'looker' }], faq: [{ question: 'Display vs Search ads?', answer: 'Search captures intent; Display builds awareness and retargets.' }, { question: 'How does remarketing work?', answer: 'Shows ads to past site visitors to bring them back.' }, { question: 'What ad sizes?', answer: 'Responsive ads plus key static sizes for all placements.' }, { question: 'How to prevent ad fraud?', answer: 'Exclusion lists, placement monitoring, and verification tools.' }] }, status: 'published', featured: false, order: 60, parentSlug: 'google-ads', category: 'marketing', isParent: false },
    { name: 'YouTube Ads', slug: 'youtube-ads', description: 'YouTube video advertising', shortDescription: 'Reach engaged audiences with compelling YouTube video ad campaigns.', fullDescription: 'Leverage YouTube for powerful video advertising with skippable, non-skippable, bumper, and discovery ad campaigns.', icon: 'play', heroImage: '/images/services/youtube-ads-hero.jpg', color: 'rose', features: ['TrueView In-Stream Ads', 'Bumper Ads', 'Discovery Ads', 'Video Creative Production', 'Audience Targeting', 'Conversion Tracking'], benefits: ['Massive YouTube reach', 'Engaging video format', 'Pay only for views', 'Detailed targeting'], content: { process: [{ step: 1, title: 'Strategy', description: 'Define video ad strategy and targeting.' }, { step: 2, title: 'Production', description: 'Create compelling video ads for YouTube.' }, { step: 3, title: 'Launch', description: 'Set up campaigns with targeting and bidding.' }, { step: 4, title: 'Optimize', description: 'Analyze view rates and optimize performance.' }], technologies: [{ name: 'Google Ads', icon: 'googleads' }, { name: 'YouTube Studio', icon: 'youtube' }, { name: 'Adobe Premiere', icon: 'adobe' }, { name: 'Google Analytics', icon: 'googleanalytics' }, { name: 'TubeBuddy', icon: 'tubebuddy' }, { name: 'VidIQ', icon: 'vidiq' }], faq: [{ question: 'What YouTube ad types?', answer: 'Skippable, non-skippable, bumper, discovery, and shorts ads.' }, { question: 'Do you create videos?', answer: 'Yes, from scripting to editing and optimization.' }, { question: 'How much do YouTube ads cost?', answer: 'Average CPV /bin/zsh.01-0.30, optimized for your goals.' }, { question: 'Can YouTube drive conversions?', answer: 'Yes, with proper tracking and retargeting strategies.' }] }, status: 'published', featured: false, order: 61, parentSlug: 'google-ads', category: 'marketing', isParent: false },
    // Meta Ads children
    { name: 'Facebook Ads', slug: 'facebook-ads', description: 'Facebook advertising', shortDescription: 'Drive leads and sales with targeted Facebook ad campaigns.', fullDescription: 'Reach your ideal customers on Facebook with precision targeting, custom audiences, lookalikes, and conversion-optimized campaigns.', icon: 'share', heroImage: '/images/services/facebook-ads-hero.jpg', color: 'blue', features: ['Custom Audience Creation', 'Lookalike Audiences', 'Lead Generation Ads', 'Conversion Campaigns', 'Catalog Sales', 'Retargeting Funnels'], benefits: ['2.9B monthly users', 'Advanced targeting', 'Multiple ad formats', 'Strong remarketing'], content: { process: [{ step: 1, title: 'Audience Research', description: 'Build custom and lookalike audiences.' }, { step: 2, title: 'Creative', description: 'Design ads for Facebook placements.' }, { step: 3, title: 'Launch', description: 'Structure campaigns with testing frameworks.' }, { step: 4, title: 'Scale', description: 'Scale winning ads while maintaining efficiency.' }], technologies: [{ name: 'Meta Ads Manager', icon: 'meta' }, { name: 'Meta Pixel', icon: 'meta' }, { name: 'Conversion API', icon: 'meta' }, { name: 'Canva', icon: 'canva' }, { name: 'Triple Whale', icon: 'triplewhale' }, { name: 'Hyros', icon: 'hyros' }], faq: [{ question: 'Facebook or Instagram?', answer: 'Run both and let Meta optimize placement distribution.' }, { question: 'What is a custom audience?', answer: 'Audience from your data for precise retargeting.' }, { question: 'iOS privacy handling?', answer: 'Conversion API and broad targeting strategies.' }, { question: 'Budget recommendation?', answer: 'Minimum ,000/month for meaningful data.' }] }, status: 'published', featured: false, order: 62, parentSlug: 'meta-ads', category: 'marketing', isParent: false },
    { name: 'Instagram Ads', slug: 'instagram-ads', description: 'Instagram advertising', shortDescription: 'Create visually stunning Instagram ad campaigns that drive engagement and conversions.', fullDescription: 'Captivate audiences on Instagram with Stories, Reels, Feed, and Explore placements using compelling visual content.', icon: 'paint-brush', heroImage: '/images/services/instagram-ads-hero.jpg', color: 'rose', features: ['Stories & Reels Ads', 'Feed & Explore Ads', 'Shopping Ads', 'Influencer Whitelisting', 'Creative Testing', 'Instagram Shop'], benefits: ['Visual-first platform', 'High engagement', 'E-commerce features', 'Younger demographics'], content: { process: [{ step: 1, title: 'Visual Strategy', description: 'Develop creative strategy for Instagram.' }, { step: 2, title: 'Content Creation', description: 'Create platform-native visuals and Reels.' }, { step: 3, title: 'Campaign Setup', description: 'Configure with placement optimization.' }, { step: 4, title: 'Optimize', description: 'Test creatives and optimize conversions.' }], technologies: [{ name: 'Meta Ads Manager', icon: 'meta' }, { name: 'Instagram Insights', icon: 'instagram' }, { name: 'Canva', icon: 'canva' }, { name: 'Adobe Creative Suite', icon: 'adobe' }, { name: 'Later', icon: 'later' }, { name: 'Dash Hudson', icon: 'dashhudson' }], faq: [{ question: 'Best ad formats?', answer: 'Reels and Stories have highest engagement.' }, { question: 'Should I use Reels?', answer: 'Yes, Reels ads have highest reach and lower CPMs.' }, { question: 'How to track conversions?', answer: 'Meta Pixel, Conversion API, and UTM parameters.' }, { question: 'Shopping ads?', answer: 'Yes, we set up Instagram Shop for shoppable ads.' }] }, status: 'published', featured: false, order: 63, parentSlug: 'meta-ads', category: 'marketing', isParent: false },
    // Social Media Marketing children
    { name: 'Social Media Management', slug: 'social-media-management', description: 'Full-service social media management', shortDescription: 'Full-service social media management with content creation, scheduling, and community engagement.', fullDescription: 'Hand off your social media to experts handling content planning, creation, scheduling, posting, and community management.', icon: 'megaphone', heroImage: '/images/services/social-management-hero.jpg', color: 'rose', features: ['Content Calendar Management', 'Post Creation & Scheduling', 'Community Engagement', 'Brand Voice Consistency', 'Monthly Analytics', 'Crisis Management'], benefits: ['Consistent posting', 'Professional content', 'Active engagement', 'Time saved'], content: { process: [{ step: 1, title: 'Strategy', description: 'Develop social media strategy aligned with goals.' }, { step: 2, title: 'Content Planning', description: 'Create monthly content calendars.' }, { step: 3, title: 'Creation & Publishing', description: 'Design content and schedule across platforms.' }, { step: 4, title: 'Engage & Report', description: 'Manage community and deliver performance reports.' }], technologies: [{ name: 'Hootsuite', icon: 'hootsuite' }, { name: 'Buffer', icon: 'buffer' }, { name: 'Canva', icon: 'canva' }, { name: 'Later', icon: 'later' }, { name: 'Sprout Social', icon: 'sproutsocial' }, { name: 'Notion', icon: 'notion' }], faq: [{ question: 'Which platforms?', answer: 'Instagram, Facebook, LinkedIn, TikTok, X, Pinterest, YouTube.' }, { question: 'How many posts?', answer: '3-5 posts per platform per week plus Stories.' }, { question: 'Do you respond to comments?', answer: 'Yes, community management includes all interactions.' }, { question: 'Can we approve content?', answer: 'Yes, content calendars shared for approval before scheduling.' }] }, status: 'published', featured: false, order: 64, parentSlug: 'social-media-marketing', category: 'marketing', isParent: false },
    { name: 'Influencer Marketing', slug: 'influencer-marketing', description: 'Influencer partnership management', shortDescription: 'Partner with the right influencers to amplify your brand reach and credibility.', fullDescription: 'Leverage influencer partnerships to reach new audiences authentically with managed collaborations from micro to major creators.', icon: 'megaphone', heroImage: '/images/services/influencer-hero.jpg', color: 'rose', features: ['Influencer Discovery & Vetting', 'Campaign Strategy', 'Contract & Negotiation', 'Content Collaboration', 'Performance Tracking', 'UGC Licensing'], benefits: ['Authentic advocacy', 'New audiences', 'High-trust recommendations', 'User-generated content'], content: { process: [{ step: 1, title: 'Strategy', description: 'Define goals, audience, and influencer criteria.' }, { step: 2, title: 'Discovery', description: 'Identify and vet matching influencers.' }, { step: 3, title: 'Execution', description: 'Manage collaborations and content review.' }, { step: 4, title: 'Measurement', description: 'Track reach, engagement, and ROI.' }], technologies: [{ name: 'CreatorIQ', icon: 'creatoriq' }, { name: 'AspireIQ', icon: 'aspireiq' }, { name: 'Grin', icon: 'grin' }, { name: 'HypeAuditor', icon: 'hypeauditor' }, { name: 'Upfluence', icon: 'upfluence' }, { name: 'Traackr', icon: 'traackr' }], faq: [{ question: 'How to find influencers?', answer: 'We analyze demographics, engagement, and brand alignment.' }, { question: 'Micro or macro?', answer: 'Micro often deliver better engagement and ROI.' }, { question: 'How to measure ROI?', answer: 'Track impressions, engagement, traffic, conversions.' }, { question: 'Handle contracts?', answer: 'Yes, full process including negotiations and payments.' }] }, status: 'published', featured: false, order: 65, parentSlug: 'social-media-marketing', category: 'marketing', isParent: false },
    // Email Marketing children
    { name: 'Email Automation', slug: 'email-automation', description: 'Automated email flows', shortDescription: 'Build automated email sequences that nurture leads and drive conversions on autopilot.', fullDescription: 'Set up email automations that work 24/7 for welcome series, abandoned carts, post-purchase, and lifecycle sequences.', icon: 'envelope', heroImage: '/images/services/email-automation-hero.jpg', color: 'amber', features: ['Welcome Series', 'Abandoned Cart Recovery', 'Post-Purchase Flows', 'Win-Back Campaigns', 'Lead Nurture', 'Trigger-Based Emails'], benefits: ['Revenue on autopilot', '24/7 nurturing', 'Personalized at scale', 'Higher LTV'], content: { process: [{ step: 1, title: 'Flow Mapping', description: 'Map customer journey and automation opportunities.' }, { step: 2, title: 'Content & Design', description: 'Write copy and design templates.' }, { step: 3, title: 'Setup & Testing', description: 'Build automations with triggers and conditions.' }, { step: 4, title: 'Optimize', description: 'Monitor and optimize timing and content.' }], technologies: [{ name: 'Klaviyo', icon: 'klaviyo' }, { name: 'ActiveCampaign', icon: 'activecampaign' }, { name: 'HubSpot', icon: 'hubspot' }, { name: 'Mailchimp', icon: 'mailchimp' }, { name: 'Customer.io', icon: 'customerio' }, { name: 'Litmus', icon: 'litmus' }], faq: [{ question: 'Which automations first?', answer: 'Welcome, abandoned cart, and post-purchase for highest ROI.' }, { question: 'How personalized?', answer: 'Highly, using behavioral triggers and purchase history.' }, { question: 'Feel impersonal?', answer: 'Not with dynamic content and behavioral triggers.' }, { question: 'Spam prevention?', answer: 'SPF, DKIM, DMARC, list hygiene, engagement-based sending.' }] }, status: 'published', featured: false, order: 66, parentSlug: 'email-marketing', category: 'marketing', isParent: false },
    { name: 'Newsletter Design', slug: 'newsletter-design', description: 'Email newsletter design', shortDescription: 'Design beautiful, engaging email newsletters that keep your audience connected.', fullDescription: 'Keep your audience engaged with professionally designed newsletters, compelling content, and managed campaigns.', icon: 'envelope', heroImage: '/images/services/newsletter-hero.jpg', color: 'amber', features: ['Newsletter Template Design', 'Content Writing', 'Responsive Design', 'Subscriber Growth', 'Analytics', 'A/B Testing'], benefits: ['Build relationships', 'Drive repeat visits', 'Brand loyalty', 'Direct communication'], content: { process: [{ step: 1, title: 'Strategy', description: 'Define goals, frequency, and content themes.' }, { step: 2, title: 'Template Design', description: 'Create branded responsive templates.' }, { step: 3, title: 'Content Creation', description: 'Write engaging content with compelling subjects.' }, { step: 4, title: 'Send & Analyze', description: 'Schedule and analyze engagement metrics.' }], technologies: [{ name: 'Mailchimp', icon: 'mailchimp' }, { name: 'Substack', icon: 'substack' }, { name: 'ConvertKit', icon: 'convertkit' }, { name: 'Beehiiv', icon: 'beehiiv' }, { name: 'Litmus', icon: 'litmus' }, { name: 'Canva', icon: 'canva' }], faq: [{ question: 'How often?', answer: 'Weekly or bi-weekly. Consistency matters most.' }, { question: 'Grow subscribers?', answer: 'Lead magnets, opt-ins, social promotion, referrals.' }, { question: 'Good subject line?', answer: 'Short, specific, curiosity-driven. We A/B test.' }, { question: 'B2B newsletters?', answer: 'Yes, builds thought leadership and nurtures leads.' }] }, status: 'published', featured: false, order: 67, parentSlug: 'email-marketing', category: 'marketing', isParent: false },
    // Content Marketing children
    { name: 'Blog & Copywriting', slug: 'blog-copywriting', description: 'Professional blog and copywriting', shortDescription: 'Create SEO-optimized blog content and persuasive copy that ranks and converts.', fullDescription: 'Drive organic traffic with expert blog writing and copywriting optimized for search engines and conversions.', icon: 'pencil-square', heroImage: '/images/services/blog-copywriting-hero.jpg', color: 'emerald', features: ['SEO Blog Articles', 'Landing Page Copy', 'Product Descriptions', 'Case Studies', 'Whitepapers', 'Content Refresh'], benefits: ['Higher rankings', 'More organic traffic', 'Thought leadership', 'Lead generation'], content: { process: [{ step: 1, title: 'Topic Research', description: 'Research keywords and content gaps.' }, { step: 2, title: 'Brief', description: 'Create detailed briefs with outlines.' }, { step: 3, title: 'Writing', description: 'Write, edit, and optimize for SEO.' }, { step: 4, title: 'Publish', description: 'Publish with on-page SEO and promote.' }], technologies: [{ name: 'Ahrefs', icon: 'ahrefs' }, { name: 'Surfer SEO', icon: 'surferseo' }, { name: 'Clearscope', icon: 'clearscope' }, { name: 'Grammarly', icon: 'grammarly' }, { name: 'WordPress', icon: 'wordpress' }, { name: 'Google Docs', icon: 'google' }], faq: [{ question: 'How long should posts be?', answer: '1,500-3,000 words for SEO articles typically.' }, { question: 'Who provides topics?', answer: 'Both options: we research or work from your briefs.' }, { question: 'SEO optimization?', answer: 'Tools like Surfer SEO for keywords and structure.' }, { question: 'Update existing content?', answer: 'Yes, content refresh recaptures lost rankings.' }] }, status: 'published', featured: false, order: 68, parentSlug: 'content-marketing', category: 'marketing', isParent: false },
    { name: 'Video Production & Marketing', slug: 'video-production-marketing', description: 'Video content production', shortDescription: 'Produce professional marketing videos that tell your story and drive engagement.', fullDescription: 'Engage audiences with brand videos, product demos, testimonials, and social media clips that captivate and convert.', icon: 'play', heroImage: '/images/services/video-production-hero.jpg', color: 'emerald', features: ['Brand Videos', 'Product Demos', 'Testimonials', 'Social Media Clips', 'Educational Content', 'Video SEO'], benefits: ['Higher engagement', 'Better conversion rates', 'Shareable content', 'Multi-platform use'], content: { process: [{ step: 1, title: 'Pre-Production', description: 'Concept, scriptwriting, and planning.' }, { step: 2, title: 'Production', description: 'Professional filming or animation.' }, { step: 3, title: 'Post-Production', description: 'Editing, color, sound, and graphics.' }, { step: 4, title: 'Distribution', description: 'Optimize and distribute with tracking.' }], technologies: [{ name: 'Adobe Premiere', icon: 'adobe' }, { name: 'After Effects', icon: 'adobe' }, { name: 'DaVinci Resolve', icon: 'davinci' }, { name: 'Final Cut Pro', icon: 'finalcut' }, { name: 'YouTube Studio', icon: 'youtube' }, { name: 'Wistia', icon: 'wistia' }], faq: [{ question: 'What types?', answer: 'Brand, demos, testimonials, explainers, social clips.' }, { question: 'In-house?', answer: 'Yes, concept to distribution all handled.' }, { question: 'Video length?', answer: 'Social: 15-60s. Website: 2-5min. Webinars: 30-60min.' }, { question: 'Repurpose?', answer: 'Yes, master video into clips, shorts, GIFs for all platforms.' }] }, status: 'published', featured: false, order: 69, parentSlug: 'content-marketing', category: 'marketing', isParent: false },
    // Infrastructure children
    { name: 'Web Scraping', slug: 'web-scraping', description: 'Automated web data extraction', shortDescription: 'Extract valuable data from websites at scale with reliable web scraping solutions.', fullDescription: 'Collect web data automatically with custom scrapers for product data, pricing, reviews, and competitive intelligence.', icon: 'cog', heroImage: '/images/services/web-scraping-hero.jpg', color: 'amber', features: ['Custom Scraper Development', 'Anti-Bot Strategies', 'Scheduled Collection', 'Data Cleaning', 'API Delivery', 'Proxy Management'], benefits: ['Competitive intelligence', 'Price monitoring', 'Lead data', 'Market research at scale'], content: { process: [{ step: 1, title: 'Target Analysis', description: 'Analyze websites and legal considerations.' }, { step: 2, title: 'Scraper Development', description: 'Build robust scrapers with error handling.' }, { step: 3, title: 'Data Pipeline', description: 'Set up cleaning, storage, and delivery.' }, { step: 4, title: 'Scheduling', description: 'Configure schedules and monitoring.' }], technologies: [{ name: 'Python', icon: 'python' }, { name: 'Scrapy', icon: 'scrapy' }, { name: 'Selenium', icon: 'selenium' }, { name: 'Beautiful Soup', icon: 'beautifulsoup' }, { name: 'Playwright', icon: 'playwright' }, { name: 'PostgreSQL', icon: 'postgresql' }], faq: [{ question: 'Is it legal?', answer: 'Depends on ToS and jurisdiction. We ensure compliance.' }, { question: 'Anti-bot handling?', answer: 'Rotating proxies, fingerprint management, rate limiting.' }, { question: 'Data formats?', answer: 'CSV, JSON, Excel, databases, or API endpoints.' }, { question: 'Reliability?', answer: 'Monitoring, alerts, retry logic, regular maintenance.' }] }, status: 'published', featured: false, order: 70, parentSlug: 'python-automation', category: 'infrastructure', isParent: false },
    { name: 'Workflow Automation', slug: 'workflow-automation', description: 'Business workflow automation', shortDescription: 'Automate repetitive business workflows to save time and reduce errors.', fullDescription: 'Eliminate manual tasks with custom workflow automations for reports, data processing, file management, and integrations.', icon: 'cog', heroImage: '/images/services/workflow-automation-hero.jpg', color: 'amber', features: ['Process Optimization', 'Script Development', 'Scheduling', 'Cross-System Integration', 'Error Handling', 'Dashboard'], benefits: ['Save hundreds of hours', 'Eliminate errors', 'Faster processes', '24/7 operations'], content: { process: [{ step: 1, title: 'Process Audit', description: 'Document processes and identify opportunities.' }, { step: 2, title: 'Solution Design', description: 'Design workflows with error handling.' }, { step: 3, title: 'Development', description: 'Build with logging and configuration.' }, { step: 4, title: 'Deploy', description: 'Deploy, schedule, and train team.' }], technologies: [{ name: 'Python', icon: 'python' }, { name: 'Apache Airflow', icon: 'airflow' }, { name: 'Celery', icon: 'celery' }, { name: 'n8n', icon: 'n8n' }, { name: 'Zapier', icon: 'zapier' }, { name: 'Make', icon: 'make' }], faq: [{ question: 'What tasks?', answer: 'Data entry, reports, file processing, email, database ops.' }, { question: 'Time saved?', answer: '10-40 hours per week typically.' }, { question: 'Need technical staff?', answer: 'No, user-friendly configs and maintenance support.' }, { question: 'Connect tools?', answer: 'Yes, any systems with APIs, databases, files, email.' }] }, status: 'published', featured: false, order: 71, parentSlug: 'python-automation', category: 'infrastructure', isParent: false },
    { name: 'CI/CD Pipelines', slug: 'ci-cd-pipelines', description: 'Continuous integration and deployment', shortDescription: 'Automate your build, test, and deployment process for faster, reliable releases.', fullDescription: 'Ship code faster with automated CI/CD pipelines that build, test, and deploy automatically.', icon: 'cog', heroImage: '/images/services/cicd-hero.jpg', color: 'blue', features: ['Pipeline Design', 'Automated Testing', 'Multi-Environment Deploys', 'Rollback Strategies', 'Security Scanning', 'Monitoring'], benefits: ['Faster releases', 'Fewer failures', 'Consistent deploys', 'Early bug detection'], content: { process: [{ step: 1, title: 'Assessment', description: 'Evaluate current process and bottlenecks.' }, { step: 2, title: 'Design', description: 'Design pipeline stages with proper gates.' }, { step: 3, title: 'Implementation', description: 'Build with tests, security, and deployments.' }, { step: 4, title: 'Optimization', description: 'Optimize speed and add monitoring.' }], technologies: [{ name: 'GitHub Actions', icon: 'github' }, { name: 'GitLab CI', icon: 'gitlab' }, { name: 'Jenkins', icon: 'jenkins' }, { name: 'ArgoCD', icon: 'argocd' }, { name: 'Docker', icon: 'docker' }, { name: 'Terraform', icon: 'terraform' }], faq: [{ question: 'Which CI/CD tool?', answer: 'GitHub Actions, GitLab CI, or Jenkins based on your ecosystem.' }, { question: 'Deploy speed?', answer: 'Target under 15 minutes commit to production.' }, { question: 'Rollbacks?', answer: 'Blue-green, canary, automated rollback on errors.' }, { question: 'Existing projects?', answer: 'Yes, incrementally add CI/CD without disruption.' }] }, status: 'published', featured: false, order: 72, parentSlug: 'devops-cloud', category: 'infrastructure', isParent: false },
    { name: 'Docker & Kubernetes', slug: 'docker-kubernetes', description: 'Container orchestration', shortDescription: 'Containerize applications and orchestrate deployments with Docker and Kubernetes.', fullDescription: 'Modernize your infrastructure with containers for scalable, portable, and resilient deployments.', icon: 'cloud', heroImage: '/images/services/docker-k8s-hero.jpg', color: 'blue', features: ['Containerization', 'Kubernetes Clusters', 'Helm Charts', 'Service Mesh', 'Auto-Scaling', 'Container Security'], benefits: ['Consistent environments', 'Efficient resources', 'Auto-scaling', 'Portable deploys'], content: { process: [{ step: 1, title: 'Containerize', description: 'Containerize apps with optimized Dockerfiles.' }, { step: 2, title: 'Orchestrate', description: 'Set up Kubernetes with networking and storage.' }, { step: 3, title: 'Deploy', description: 'Create Helm charts and strategies.' }, { step: 4, title: 'Operate', description: 'Monitoring, logging, auto-scaling.' }], technologies: [{ name: 'Docker', icon: 'docker' }, { name: 'Kubernetes', icon: 'kubernetes' }, { name: 'Helm', icon: 'helm' }, { name: 'Istio', icon: 'istio' }, { name: 'Prometheus', icon: 'prometheus' }, { name: 'Grafana', icon: 'grafana' }], faq: [{ question: 'Need Kubernetes?', answer: 'Ideal for microservices and auto-scaling needs.' }, { question: 'Managed or self-managed?', answer: 'Recommend managed (EKS, GKE, AKS) for most teams.' }, { question: 'Container security?', answer: 'Image scanning, non-root, network policies, secrets management.' }, { question: 'Legacy apps?', answer: 'Yes, systematically containerize then modernize.' }] }, status: 'published', featured: false, order: 73, parentSlug: 'devops-cloud', category: 'infrastructure', isParent: false },
    { name: 'Cloud Management', slug: 'cloud-management', description: 'Cloud infrastructure management', shortDescription: 'Optimize and manage your cloud for performance, cost, and security.', fullDescription: 'Get the most from your cloud investment with management and optimization across AWS, Azure, and GCP.', icon: 'cloud', heroImage: '/images/services/cloud-management-hero.jpg', color: 'blue', features: ['Cost Optimization', 'Performance Monitoring', 'Security Management', 'Resource Right-Sizing', 'Multi-Cloud', 'Compliance'], benefits: ['30-50% cost reduction', 'Improved reliability', 'Security compliance', 'Expert operations'], content: { process: [{ step: 1, title: 'Audit', description: 'Review resources, costs, and security.' }, { step: 2, title: 'Plan', description: 'Develop optimization roadmap.' }, { step: 3, title: 'Implement', description: 'Optimizations, monitoring, governance.' }, { step: 4, title: 'Manage', description: 'Continuous monitoring and optimization.' }], technologies: [{ name: 'AWS', icon: 'aws' }, { name: 'Azure', icon: 'azure' }, { name: 'Google Cloud', icon: 'googlecloud' }, { name: 'Terraform', icon: 'terraform' }, { name: 'CloudHealth', icon: 'cloudhealth' }, { name: 'Datadog', icon: 'datadog' }], faq: [{ question: 'Cost savings?', answer: '30-50% through right-sizing and optimization.' }, { question: 'Multi-cloud?', answer: 'Yes, unified management across all providers.' }, { question: 'Security?', answer: 'IAM, network security, encryption, compliance monitoring.' }, { question: '24/7 support?', answer: 'Yes, with incident response and escalation.' }] }, status: 'published', featured: false, order: 74, parentSlug: 'devops-cloud', category: 'infrastructure', isParent: false },
    { name: 'Business Intelligence', slug: 'business-intelligence', description: 'BI dashboards and reporting', shortDescription: 'Transform data into interactive dashboards and reports that drive decisions.', fullDescription: 'Empower decision-makers with real-time BI dashboards, automated reports, and self-service analytics.', icon: 'chart-bar', heroImage: '/images/services/bi-hero.jpg', color: 'blue', features: ['Interactive Dashboards', 'Automated Reporting', 'KPI Tracking', 'Self-Service Analytics', 'Data Modeling', 'Executive Scorecards'], benefits: ['Faster decisions', 'Real-time visibility', 'Less reporting time', 'Data democratization'], content: { process: [{ step: 1, title: 'Requirements', description: 'Define KPIs and stakeholder needs.' }, { step: 2, title: 'Data Modeling', description: 'Design models and semantic layers.' }, { step: 3, title: 'Dashboards', description: 'Create interactive dashboards.' }, { step: 4, title: 'Training', description: 'Train users on features.' }], technologies: [{ name: 'Tableau', icon: 'tableau' }, { name: 'Power BI', icon: 'powerbi' }, { name: 'Looker', icon: 'looker' }, { name: 'Metabase', icon: 'metabase' }, { name: 'dbt', icon: 'dbt' }, { name: 'Snowflake', icon: 'snowflake' }], faq: [{ question: 'Which BI tool?', answer: 'Tableau, Power BI, or Looker based on needs.' }, { question: 'Real-time?', answer: 'Yes, with proper data pipeline setup.' }, { question: 'Training?', answer: 'Yes, on usage and self-service analytics.' }, { question: 'Data sources?', answer: 'Connect to any database, API, or SaaS platform.' }] }, status: 'published', featured: false, order: 75, parentSlug: 'data-analytics', category: 'infrastructure', isParent: false },
    { name: 'Big Data & ETL', slug: 'big-data-etl', description: 'Big data processing and ETL', shortDescription: 'Build scalable data pipelines that extract, transform, and load data from any source.', fullDescription: 'Handle data at any scale with robust ETL pipelines that collect, transform, and load into your data warehouse.', icon: 'chart-bar', heroImage: '/images/services/etl-hero.jpg', color: 'blue', features: ['ETL Pipeline Development', 'Data Warehouse Design', 'Real-Time Streaming', 'Data Quality', 'Schema Evolution', 'Pipeline Orchestration'], benefits: ['Unified data', 'Reliable pipelines', 'Scalable processing', 'Clean data'], content: { process: [{ step: 1, title: 'Assessment', description: 'Inventory sources and define transformations.' }, { step: 2, title: 'Architecture', description: 'Design warehouse schema and pipeline.' }, { step: 3, title: 'Development', description: 'Build pipelines with error handling.' }, { step: 4, title: 'Operations', description: 'Deploy with scheduling and monitoring.' }], technologies: [{ name: 'Apache Spark', icon: 'spark' }, { name: 'Airflow', icon: 'airflow' }, { name: 'dbt', icon: 'dbt' }, { name: 'Snowflake', icon: 'snowflake' }, { name: 'Kafka', icon: 'kafka' }, { name: 'BigQuery', icon: 'googlecloud' }], faq: [{ question: 'What is ETL?', answer: 'Extract, Transform, Load data into a warehouse.' }, { question: 'Data quality?', answer: 'Validation, deduplication, and quality checks.' }, { question: 'Real-time?', answer: 'Yes, streaming with Kafka and Spark.' }, { question: 'Which warehouse?', answer: 'Snowflake, BigQuery, or Redshift based on needs.' }] }, status: 'published', featured: false, order: 76, parentSlug: 'data-analytics', category: 'infrastructure', isParent: false },
    { name: 'Penetration Testing', slug: 'penetration-testing', description: 'Security penetration testing', shortDescription: 'Identify vulnerabilities before attackers do with comprehensive penetration testing.', fullDescription: 'Proactively discover security weaknesses with ethical hacking that simulates real-world attacks and provides remediation guidance.', icon: 'shield', heroImage: '/images/services/pentest-hero.jpg', color: 'amber', features: ['Web App Testing', 'Network Testing', 'API Security', 'Mobile App Testing', 'Social Engineering', 'Red Team Exercises'], benefits: ['Find vulnerabilities first', 'Compliance requirements', 'Reduced breach risk', 'Actionable remediation'], content: { process: [{ step: 1, title: 'Scoping', description: 'Define scope, objectives, and rules of engagement.' }, { step: 2, title: 'Reconnaissance', description: 'Gather info and identify attack surfaces.' }, { step: 3, title: 'Testing', description: 'Execute authorized penetration tests.' }, { step: 4, title: 'Reporting', description: 'Detailed findings with remediation steps.' }], technologies: [{ name: 'Burp Suite', icon: 'burpsuite' }, { name: 'Metasploit', icon: 'metasploit' }, { name: 'Nmap', icon: 'nmap' }, { name: 'OWASP ZAP', icon: 'owasp' }, { name: 'Wireshark', icon: 'wireshark' }, { name: 'Kali Linux', icon: 'kali' }], faq: [{ question: 'How often?', answer: 'Annually minimum, plus after major changes.' }, { question: 'Disruptions?', answer: 'Controlled methods minimize production impact.' }, { question: 'Methodologies?', answer: 'OWASP, PTES, and NIST guidelines.' }, { question: 'Remediation help?', answer: 'Yes, guidance and assistance fixing vulnerabilities.' }] }, status: 'published', featured: false, order: 77, parentSlug: 'cybersecurity', category: 'infrastructure', isParent: false },
    { name: 'Security Audits & Compliance', slug: 'security-audits-compliance', description: 'Security audits and compliance', shortDescription: 'Achieve and maintain security compliance with thorough audits and remediation.', fullDescription: 'Meet regulatory requirements with comprehensive security audits against industry standards and compliance certifications.', icon: 'shield', heroImage: '/images/services/security-audit-hero.jpg', color: 'amber', features: ['SOC 2 Compliance', 'ISO 27001', 'GDPR Compliance', 'PCI DSS', 'Security Policies', 'Risk Assessment'], benefits: ['Regulatory compliance', 'Customer trust', 'Reduced legal risk', 'Competitive advantage'], content: { process: [{ step: 1, title: 'Gap Analysis', description: 'Assess controls against target framework.' }, { step: 2, title: 'Remediation Plan', description: 'Prioritize gaps with actionable roadmap.' }, { step: 3, title: 'Implementation', description: 'Implement controls, policies, procedures.' }, { step: 4, title: 'Audit Support', description: 'Prepare evidence and support audit process.' }], technologies: [{ name: 'Vanta', icon: 'vanta' }, { name: 'Drata', icon: 'drata' }, { name: 'AWS Config', icon: 'aws' }, { name: 'Qualys', icon: 'qualys' }, { name: 'Nessus', icon: 'nessus' }, { name: 'Splunk', icon: 'splunk' }], faq: [{ question: 'Which framework?', answer: 'SOC 2 for SaaS, PCI DSS for payments, HIPAA for healthcare.' }, { question: 'How long?', answer: 'SOC 2: 3-6 months. ISO 27001: 6-12 months.' }, { question: 'Ongoing compliance?', answer: 'Yes, continuous monitoring and annual reassessments.' }, { question: 'Compliance vs security?', answer: 'Compliance is baseline. Good security goes beyond.' }] }, status: 'published', featured: false, order: 78, parentSlug: 'cybersecurity', category: 'infrastructure', isParent: false },
    // ========== NEW SERVICES WITH ANIMATION CONFIG ==========
    {
      name: 'Full-Stack Development',
      slug: 'full-stack-development',
      description: 'End-to-end full-stack web application development',
      shortDescription: 'Build complete web applications from frontend to backend with a unified, full-stack approach.',
      fullDescription: 'Get the best of both worlds with our full-stack development service. We design, build, and deploy complete web applications handling everything from pixel-perfect user interfaces to robust server-side logic, databases, and DevOps. Our full-stack engineers work across the entire technology stack to deliver cohesive, high-performance applications with seamless data flow between frontend and backend.',
      icon: 'code',
      heroImage: '/images/services/full-stack-hero.jpg',
      color: 'blue',
      features: [
        'React & Next.js Frontend',
        'Node.js & Python Backend',
        'Database Design & ORM Integration',
        'REST & GraphQL API Development',
        'Authentication & Authorization',
        'Real-Time Features (WebSockets)',
        'CI/CD Pipeline Setup',
        'Cloud Deployment & Scaling',
      ],
      benefits: [
        'Single team owns the entire stack, reducing handoff delays',
        'Consistent architecture from UI to database',
        'Faster iteration with shared context',
        'Unified testing strategy across all layers',
        'Cost-effective compared to separate frontend and backend teams',
        'Seamless integration between frontend and backend',
      ],
      content: {
        process: [
          { step: 1, title: 'Architecture & Planning', description: 'We define the overall system architecture, data models, API contracts, and technology choices based on your project requirements.' },
          { step: 2, title: 'Database & API Layer', description: 'We design the database schema, build the API layer with proper validation, authentication, and documentation.' },
          { step: 3, title: 'Frontend Development', description: 'We build the user interface with React/Next.js, connecting it to the backend APIs with proper state management and error handling.' },
          { step: 4, title: 'Integration & Testing', description: 'End-to-end testing, performance optimization, and deployment pipeline setup to ensure everything works together flawlessly.' },
          { step: 5, title: 'Deployment & Monitoring', description: 'We deploy to cloud infrastructure with monitoring, logging, and alerting to keep your application running smoothly.' },
        ],
        technologies: [
          { name: 'Next.js', icon: 'nextjs' },
          { name: 'React', icon: 'react' },
          { name: 'Node.js', icon: 'nodejs' },
          { name: 'TypeScript', icon: 'typescript' },
          { name: 'PostgreSQL', icon: 'postgresql' },
          { name: 'Prisma', icon: 'prisma' },
          { name: 'Docker', icon: 'docker' },
          { name: 'Vercel', icon: 'vercel' },
        ],
        portfolio: [
          { title: 'SaaS Analytics Platform', category: 'SaaS', image: '/images/portfolio/saas-analytics.jpg' },
          { title: 'Real-Time Collaboration Tool', category: 'Productivity', image: '/images/portfolio/collab-tool.jpg' },
          { title: 'Multi-Tenant CRM System', category: 'Enterprise', image: '/images/portfolio/crm-system.jpg' },
        ],
        faq: [
          { question: 'What does full-stack development include?', answer: 'Full-stack development covers everything from the user interface (frontend) to the server logic (backend), database design, API development, authentication, and deployment infrastructure.' },
          { question: 'Which technology stack do you recommend?', answer: 'For most projects, we recommend Next.js with TypeScript for the frontend, Node.js for the backend, PostgreSQL for the database, and Prisma as the ORM. We adapt the stack based on project needs.' },
          { question: 'Can you work with our existing codebase?', answer: 'Yes, we can extend, refactor, or modernize existing applications. We start with a thorough code audit to understand the current state and plan improvements.' },
          { question: 'How do you handle real-time features?', answer: 'We implement WebSockets using Socket.io or native WS for live data, notifications, chat, and collaborative editing features.' },
        ],
        animation: {
          heroVisual: 'layers-stack',
          bgPattern: 'grid',
          decorations: 'squares',
          motion: 'cascade',
          featureStyle: 'icon-top',
          processLayout: 'timeline',
        },
      },
      status: 'published',
      featured: false,
      order: 79,
      parentSlug: 'web-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'React Native Development',
      slug: 'react-native-development',
      description: 'Cross-platform mobile apps with React Native',
      shortDescription: 'Build native mobile apps for iOS and Android using a single React Native codebase.',
      fullDescription: 'Leverage your web development skills to build truly native mobile applications. React Native combines the best of native development with React, enabling rapid development of high-quality apps that feel truly native on both iOS and Android platforms.',
      icon: 'device-mobile',
      heroImage: '/images/services/react-native-hero.jpg',
      color: 'blue',
      features: [
        'Single Codebase for iOS & Android',
        'Native UI Components',
        'Hot Reloading Development',
        'Native Module Integration',
        'Push Notifications',
        'Offline-First Architecture',
        'App Store Deployment',
        'Performance Optimization',
      ],
      benefits: [
        '60% faster development than native',
        'Share code between mobile and web',
        'Access to native device features',
        'Large ecosystem of libraries',
        'Easy updates via CodePush',
        'Cost-effective maintenance',
      ],
      content: {
        process: [
          { step: 1, title: 'Project Setup', description: 'Initialize React Native project with TypeScript, navigation, and state management configured.' },
          { step: 2, title: 'UI Development', description: 'Build responsive UI components that adapt to iOS and Android design guidelines.' },
          { step: 3, title: 'Native Integration', description: 'Integrate native modules for camera, GPS, biometrics, and platform-specific features.' },
          { step: 4, title: 'Testing & QA', description: 'Test on real devices across iOS and Android versions with automated and manual testing.' },
          { step: 5, title: 'App Store Launch', description: 'Prepare assets, handle app store requirements, and launch on both platforms.' },
        ],
        technologies: [
          { name: 'React Native', icon: 'reactnative' },
          { name: 'TypeScript', icon: 'typescript' },
          { name: 'Expo', icon: 'expo' },
          { name: 'Redux Toolkit', icon: 'redux' },
          { name: 'React Navigation', icon: 'react' },
          { name: 'Firebase', icon: 'firebase' },
          { name: 'CodePush', icon: 'microsoft' },
          { name: 'Fastlane', icon: 'fastlane' },
        ],
        portfolio: [
          { title: 'Fitness Tracking App', category: 'Health', image: '/images/portfolio/fitness-app.jpg' },
          { title: 'Food Delivery Platform', category: 'Marketplace', image: '/images/portfolio/food-delivery.jpg' },
        ],
        faq: [
          { question: 'React Native vs Flutter - which is better?', answer: 'React Native is ideal if your team knows JavaScript/React. Flutter offers better performance for complex animations. We help you choose based on your specific needs.' },
          { question: 'Can React Native access native features?', answer: 'Yes, React Native provides bridges to native modules for camera, GPS, Bluetooth, biometrics, and any native API through custom native modules.' },
          { question: 'How does performance compare to native?', answer: 'React Native achieves near-native performance. For most apps, users cannot tell the difference. We optimize critical paths with native modules when needed.' },
          { question: 'Can you convert our web React app to mobile?', answer: 'We can share business logic and some components, but UI needs to be rebuilt for mobile. We maximize code reuse while ensuring native UX.' },
        ],
        animation: {
          heroVisual: 'mobile-device',
          bgPattern: 'dots',
          decorations: 'circles',
          motion: 'float',
          featureStyle: 'icon-left',
          processLayout: 'steps-horizontal',
        },
      },
      status: 'published',
      featured: false,
      order: 80,
      parentSlug: 'mobile-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Headless CMS Development',
      slug: 'headless-cms-development',
      description: 'Headless CMS implementation and customization',
      shortDescription: 'Implement flexible headless CMS solutions that separate content from presentation for ultimate flexibility.',
      fullDescription: 'Break free from monolithic CMS limitations with headless architecture. We implement and customize headless CMS platforms that let your content team work independently while developers build fast, modern frontends using any technology.',
      icon: 'cloud',
      heroImage: '/images/services/headless-cms-hero.jpg',
      color: 'violet',
      features: [
        'Strapi & Contentful Implementation',
        'Sanity.io Custom Schemas',
        'Multi-Channel Content Delivery',
        'GraphQL & REST APIs',
        'Content Modeling',
        'Preview & Draft Workflows',
        'Localization Support',
        'Webhook Integrations',
      ],
      benefits: [
        'Content reusable across web, mobile, and IoT',
        'Developers free to choose any frontend',
        'Better performance with static generation',
        'Easier scaling and security',
        'Content team independence',
        'Future-proof architecture',
      ],
      content: {
        process: [
          { step: 1, title: 'Content Audit', description: 'Analyze existing content structure and define content types, relationships, and workflows.' },
          { step: 2, title: 'CMS Selection', description: 'Choose the right headless CMS based on team needs, budget, and technical requirements.' },
          { step: 3, title: 'Schema Design', description: 'Design content models with proper field types, validations, and relationships.' },
          { step: 4, title: 'Frontend Integration', description: 'Connect the CMS to your frontend with proper caching, preview, and incremental regeneration.' },
        ],
        technologies: [
          { name: 'Strapi', icon: 'strapi' },
          { name: 'Contentful', icon: 'contentful' },
          { name: 'Sanity', icon: 'sanity' },
          { name: 'Prismic', icon: 'prismic' },
          { name: 'Next.js', icon: 'nextjs' },
          { name: 'GraphQL', icon: 'graphql' },
        ],
        portfolio: [
          { title: 'Media Publishing Platform', category: 'Media', image: '/images/portfolio/publishing-platform.jpg' },
          { title: 'Multi-Brand Corporate Site', category: 'Enterprise', image: '/images/portfolio/multi-brand.jpg' },
        ],
        faq: [
          { question: 'What is a headless CMS?', answer: 'A headless CMS stores and manages content but has no built-in frontend. Content is delivered via API to any frontend: websites, mobile apps, kiosks, or IoT devices.' },
          { question: 'Which headless CMS do you recommend?', answer: 'Strapi for self-hosted control, Contentful for enterprise features, Sanity for developer flexibility. We help you choose based on your needs.' },
          { question: 'Can we migrate from WordPress?', answer: 'Yes, we migrate content, preserve URLs for SEO, and train your team on the new system. The process is carefully planned to minimize disruption.' },
          { question: 'How do editors preview content?', answer: 'We implement live preview features that let editors see exactly how content will appear on the live site before publishing.' },
        ],
        animation: {
          heroVisual: 'cloud-stack',
          bgPattern: 'hexagons',
          decorations: 'squares',
          motion: 'pulse',
          featureStyle: 'bordered',
          processLayout: 'cards',
        },
      },
      status: 'published',
      featured: false,
      order: 81,
      parentSlug: 'web-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Payment Gateway Integration',
      slug: 'payment-gateway-integration',
      description: 'Secure payment processing integration',
      shortDescription: 'Integrate secure payment gateways to accept credit cards, digital wallets, and alternative payment methods.',
      fullDescription: 'Enable seamless, secure payments on your platform. We integrate payment gateways like Stripe, PayPal, and regional processors, handling PCI compliance, subscription billing, multi-currency support, and fraud prevention.',
      icon: 'shopping-cart',
      heroImage: '/images/services/payment-gateway-hero.jpg',
      color: 'emerald',
      features: [
        'Stripe & PayPal Integration',
        'Subscription & Recurring Billing',
        'Multi-Currency Support',
        'Digital Wallets (Apple Pay, Google Pay)',
        'PCI Compliance',
        'Fraud Detection',
        'Refund & Dispute Handling',
        'Payment Analytics Dashboard',
      ],
      benefits: [
        'Accept payments globally',
        'Reduce cart abandonment',
        'Automate subscription management',
        'Minimize fraud losses',
        'Stay PCI compliant',
        'Support customer payment preferences',
      ],
      content: {
        process: [
          { step: 1, title: 'Requirements Analysis', description: 'Understand your payment needs: currencies, regions, payment methods, and compliance requirements.' },
          { step: 2, title: 'Gateway Selection', description: 'Choose optimal payment processors based on fees, features, and regional coverage.' },
          { step: 3, title: 'Secure Integration', description: 'Implement payment flows with proper tokenization, webhooks, and error handling.' },
          { step: 4, title: 'Testing & Go-Live', description: 'Thorough testing in sandbox, PCI compliance verification, and production launch.' },
        ],
        technologies: [
          { name: 'Stripe', icon: 'stripe' },
          { name: 'PayPal', icon: 'paypal' },
          { name: 'Square', icon: 'square' },
          { name: 'Adyen', icon: 'adyen' },
          { name: 'Apple Pay', icon: 'apple' },
          { name: 'Google Pay', icon: 'google' },
        ],
        portfolio: [
          { title: 'Subscription SaaS Platform', category: 'SaaS', image: '/images/portfolio/saas-payments.jpg' },
          { title: 'International E-commerce Store', category: 'E-commerce', image: '/images/portfolio/intl-ecommerce.jpg' },
        ],
        faq: [
          { question: 'Which payment gateway should we use?', answer: 'Stripe for most use cases due to excellent developer experience. PayPal for buyer trust. Regional processors for specific markets. Often we recommend using multiple.' },
          { question: 'How do you handle PCI compliance?', answer: 'We use tokenization and hosted payment fields so card data never touches your servers, simplifying PCI compliance to SAQ-A level.' },
          { question: 'Can you implement subscription billing?', answer: 'Yes, we implement full subscription management: plans, trials, upgrades, downgrades, proration, dunning, and failed payment recovery.' },
          { question: 'How do you prevent fraud?', answer: 'We implement Stripe Radar or similar tools, 3D Secure authentication, velocity checks, and custom fraud rules based on your risk profile.' },
        ],
        animation: {
          heroVisual: 'shield-lock',
          bgPattern: 'grid',
          decorations: 'dots',
          motion: 'pulse',
          featureStyle: 'gradient-border',
          processLayout: 'timeline',
        },
      },
      status: 'published',
      featured: false,
      order: 82,
      parentSlug: 'e-commerce',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'AI Image Generation',
      slug: 'ai-image-generation',
      description: 'Custom AI image generation solutions',
      shortDescription: 'Create custom AI image generation solutions using DALL-E, Stable Diffusion, and Midjourney APIs.',
      fullDescription: 'Harness the power of generative AI for images. We build custom image generation pipelines, fine-tune models on your brand assets, and integrate AI image capabilities into your products for marketing, e-commerce, design, and creative workflows.',
      icon: 'cpu',
      heroImage: '/images/services/ai-image-hero.jpg',
      color: 'violet',
      features: [
        'DALL-E & Stable Diffusion Integration',
        'Custom Model Fine-Tuning',
        'Brand-Consistent Image Generation',
        'Product Image Variations',
        'Background Removal & Replacement',
        'Image Upscaling & Enhancement',
        'Batch Processing Pipelines',
        'Content Moderation',
      ],
      benefits: [
        'Generate unlimited creative assets',
        'Reduce photography and design costs',
        'Personalize images at scale',
        'Speed up creative workflows',
        'Maintain brand consistency',
        'Enable user-generated content',
      ],
      content: {
        process: [
          { step: 1, title: 'Use Case Definition', description: 'Define exactly what images you need to generate, quality requirements, and brand guidelines.' },
          { step: 2, title: 'Model Selection', description: 'Choose the right AI model based on style, quality, speed, and cost requirements.' },
          { step: 3, title: 'Fine-Tuning', description: 'Train custom models on your brand assets for consistent, on-brand image generation.' },
          { step: 4, title: 'Pipeline Development', description: 'Build production-ready pipelines with proper prompting, post-processing, and content moderation.' },
        ],
        technologies: [
          { name: 'OpenAI DALL-E', icon: 'openai' },
          { name: 'Stable Diffusion', icon: 'stability' },
          { name: 'Midjourney API', icon: 'midjourney' },
          { name: 'ComfyUI', icon: 'comfyui' },
          { name: 'Replicate', icon: 'replicate' },
          { name: 'AWS SageMaker', icon: 'aws' },
        ],
        portfolio: [
          { title: 'E-commerce Product Imagery', category: 'E-commerce', image: '/images/portfolio/ai-ecommerce.jpg' },
          { title: 'Marketing Asset Generator', category: 'Marketing', image: '/images/portfolio/ai-marketing.jpg' },
        ],
        faq: [
          { question: 'Can AI generate images matching our brand?', answer: 'Yes, we fine-tune models on your brand assets and create detailed prompt templates that ensure consistent style, colors, and aesthetic.' },
          { question: 'What about copyright and ownership?', answer: 'Images generated by AI tools like DALL-E are generally owned by the creator. We advise on licensing terms and ensure compliance with each provider.' },
          { question: 'How do you ensure appropriate content?', answer: 'We implement content moderation at multiple stages: input prompts, generated images, and output filtering to prevent inappropriate content.' },
          { question: 'Can we run models on our own infrastructure?', answer: 'Yes, for privacy or cost reasons, we can deploy open-source models like Stable Diffusion on your own cloud infrastructure.' },
        ],
        animation: {
          heroVisual: 'palette-canvas',
          bgPattern: 'waves',
          decorations: 'mixed',
          motion: 'morph',
          featureStyle: 'icon-top',
          processLayout: 'zigzag',
        },
      },
      status: 'published',
      featured: false,
      order: 83,
      parentSlug: 'ai-solutions',
      category: 'ai-ml',
      isParent: false,
    },
    {
      name: 'Conversion Rate Optimization',
      slug: 'conversion-rate-optimization',
      description: 'Data-driven CRO strategies',
      shortDescription: 'Increase conversions with data-driven A/B testing, UX improvements, and landing page optimization.',
      fullDescription: 'Turn more visitors into customers with systematic conversion rate optimization. We use data analysis, user research, A/B testing, and UX best practices to identify and eliminate conversion barriers, improving your ROI on every marketing dollar spent.',
      icon: 'chart-bar',
      heroImage: '/images/services/cro-hero.jpg',
      color: 'emerald',
      features: [
        'Conversion Audit & Analysis',
        'A/B & Multivariate Testing',
        'Heatmap & Session Recording Analysis',
        'Landing Page Optimization',
        'Form Optimization',
        'Checkout Flow Improvement',
        'Personalization Strategies',
        'Statistical Analysis & Reporting',
      ],
      benefits: [
        'Higher conversion rates',
        'Better ROI on ad spend',
        'Lower customer acquisition cost',
        'Data-driven decisions',
        'Improved user experience',
        'Compound growth over time',
      ],
      content: {
        process: [
          { step: 1, title: 'Conversion Audit', description: 'Analyze your funnel data, identify drop-off points, and benchmark current performance.' },
          { step: 2, title: 'Research & Hypotheses', description: 'Conduct user research, review heatmaps and recordings, and develop test hypotheses.' },
          { step: 3, title: 'Test Execution', description: 'Design and run A/B tests with proper statistical rigor and sample sizes.' },
          { step: 4, title: 'Analysis & Iteration', description: 'Analyze results, implement winners, and continuously iterate for compound gains.' },
        ],
        technologies: [
          { name: 'Google Optimize', icon: 'google' },
          { name: 'VWO', icon: 'vwo' },
          { name: 'Optimizely', icon: 'optimizely' },
          { name: 'Hotjar', icon: 'hotjar' },
          { name: 'Google Analytics', icon: 'googleanalytics' },
          { name: 'Mixpanel', icon: 'mixpanel' },
        ],
        portfolio: [
          { title: 'SaaS Signup Flow Optimization', category: 'SaaS', image: '/images/portfolio/cro-saas.jpg' },
          { title: 'E-commerce Checkout Improvement', category: 'E-commerce', image: '/images/portfolio/cro-ecommerce.jpg' },
        ],
        faq: [
          { question: 'What conversion rate improvement can we expect?', answer: 'Results vary, but well-executed CRO programs typically achieve 20-50% improvement over 6-12 months through continuous testing and optimization.' },
          { question: 'How long should we run A/B tests?', answer: 'Tests should run until statistical significance (95% confidence) with adequate sample size. Typically 2-4 weeks minimum depending on traffic.' },
          { question: 'Do you only optimize landing pages?', answer: 'No, we optimize the entire funnel: ads, landing pages, product pages, checkout, onboarding, and retention touchpoints.' },
          { question: 'How do you prioritize what to test?', answer: 'We use frameworks like PIE (Potential, Importance, Ease) or ICE to prioritize tests based on impact potential and implementation effort.' },
        ],
        animation: {
          heroVisual: 'target-bullseye',
          bgPattern: 'diagonal-lines',
          decorations: 'triangles',
          motion: 'pulse',
          featureStyle: 'numbered',
          processLayout: 'steps-horizontal',
        },
      },
      status: 'published',
      featured: false,
      order: 84,
      parentSlug: 'seo',
      category: 'marketing',
      isParent: false,
    },
    {
      name: 'Marketing Automation',
      slug: 'marketing-automation',
      description: 'Automated marketing workflows and campaigns',
      shortDescription: 'Automate your marketing with intelligent workflows that nurture leads and drive conversions at scale.',
      fullDescription: 'Scale your marketing efforts without scaling your team. We implement marketing automation platforms that handle lead scoring, email sequences, behavioral triggers, and multi-channel campaigns, turning manual processes into efficient automated workflows.',
      icon: 'cog',
      heroImage: '/images/services/marketing-automation-hero.jpg',
      color: 'amber',
      features: [
        'HubSpot & Marketo Implementation',
        'Lead Scoring & Qualification',
        'Automated Email Sequences',
        'Behavioral Trigger Campaigns',
        'Multi-Channel Orchestration',
        'CRM Integration',
        'Analytics & Attribution',
        'A/B Testing Automation',
      ],
      benefits: [
        'Nurture leads 24/7 automatically',
        'Personalize at scale',
        'Reduce manual marketing tasks',
        'Improve lead quality for sales',
        'Track full customer journey',
        'Increase marketing ROI',
      ],
      content: {
        process: [
          { step: 1, title: 'Audit & Strategy', description: 'Map current marketing processes and design automation strategy aligned with buyer journey.' },
          { step: 2, title: 'Platform Setup', description: 'Configure marketing automation platform, integrations, and tracking.' },
          { step: 3, title: 'Workflow Development', description: 'Build automated workflows for lead nurturing, scoring, and campaign orchestration.' },
          { step: 4, title: 'Optimization', description: 'Monitor performance, A/B test workflows, and continuously improve automation.' },
        ],
        technologies: [
          { name: 'HubSpot', icon: 'hubspot' },
          { name: 'Marketo', icon: 'marketo' },
          { name: 'ActiveCampaign', icon: 'activecampaign' },
          { name: 'Pardot', icon: 'salesforce' },
          { name: 'Klaviyo', icon: 'klaviyo' },
          { name: 'Customer.io', icon: 'customerio' },
        ],
        portfolio: [
          { title: 'B2B Lead Nurturing System', category: 'B2B', image: '/images/portfolio/b2b-automation.jpg' },
          { title: 'E-commerce Lifecycle Marketing', category: 'E-commerce', image: '/images/portfolio/ecom-automation.jpg' },
        ],
        faq: [
          { question: 'Which marketing automation platform is best?', answer: 'HubSpot for SMBs and ease of use, Marketo for enterprise complexity, Klaviyo for e-commerce. We help you choose based on your specific needs and budget.' },
          { question: 'How complex can automations get?', answer: 'Very complex. We build multi-step workflows with branching logic, delays, conditions, and integrations across your entire tech stack.' },
          { question: 'Will automation feel impersonal to customers?', answer: 'Done right, automation enables more personalization, not less. We use behavioral data to send relevant messages at the right time.' },
          { question: 'How do you measure automation ROI?', answer: 'We track leads generated, conversion rates, time saved, customer lifetime value, and revenue attributed to automated campaigns.' },
        ],
        animation: {
          heroVisual: 'workflow-diagram',
          bgPattern: 'circles',
          decorations: 'lines',
          motion: 'cascade',
          featureStyle: 'icon-left',
          processLayout: 'timeline',
        },
      },
      status: 'published',
      featured: false,
      order: 85,
      parentSlug: 'email-marketing',
      category: 'marketing',
      isParent: false,
    },
    {
      name: 'Serverless Architecture',
      slug: 'serverless-architecture',
      description: 'Serverless application development',
      shortDescription: 'Build scalable, cost-effective applications using serverless architecture with AWS Lambda, Vercel, and edge computing.',
      fullDescription: 'Eliminate server management and pay only for what you use. We design and build serverless applications using AWS Lambda, Vercel Edge Functions, and managed services that auto-scale from zero to millions of requests.',
      icon: 'cloud',
      heroImage: '/images/services/serverless-hero.jpg',
      color: 'blue',
      features: [
        'AWS Lambda & API Gateway',
        'Vercel & Cloudflare Workers',
        'Event-Driven Architecture',
        'Serverless Databases',
        'Edge Computing',
        'Auto-Scaling & Cost Optimization',
        'Monitoring & Observability',
        'Cold Start Optimization',
      ],
      benefits: [
        'Zero server maintenance',
        'Pay per execution, not uptime',
        'Automatic scaling to any load',
        'Reduced operational complexity',
        'Global edge deployment',
        'Faster time to market',
      ],
      content: {
        process: [
          { step: 1, title: 'Architecture Design', description: 'Design serverless architecture with proper service boundaries, event flows, and data patterns.' },
          { step: 2, title: 'Function Development', description: 'Develop serverless functions with proper error handling, logging, and cold start optimization.' },
          { step: 3, title: 'Infrastructure as Code', description: 'Define infrastructure using Terraform, SST, or Serverless Framework for reproducible deployments.' },
          { step: 4, title: 'Monitoring & Optimization', description: 'Set up observability and continuously optimize for performance and cost.' },
        ],
        technologies: [
          { name: 'AWS Lambda', icon: 'aws' },
          { name: 'Vercel', icon: 'vercel' },
          { name: 'Cloudflare Workers', icon: 'cloudflare' },
          { name: 'DynamoDB', icon: 'aws' },
          { name: 'Terraform', icon: 'terraform' },
          { name: 'SST', icon: 'sst' },
        ],
        portfolio: [
          { title: 'Real-Time Data Processing Pipeline', category: 'Data', image: '/images/portfolio/serverless-data.jpg' },
          { title: 'Global API Platform', category: 'API', image: '/images/portfolio/serverless-api.jpg' },
        ],
        faq: [
          { question: 'When is serverless the right choice?', answer: 'Serverless excels for variable workloads, event-driven systems, APIs, and when you want to minimize ops overhead. Less suited for long-running processes.' },
          { question: 'How do you handle cold starts?', answer: 'We use provisioned concurrency, optimize bundle sizes, choose efficient runtimes, and design architectures that minimize cold start impact.' },
          { question: 'Is serverless actually cheaper?', answer: 'Often yes, especially for variable workloads. We model costs before migration and monitor continuously to optimize spend.' },
          { question: 'Can you migrate our existing app to serverless?', answer: 'Yes, we can gradually migrate monoliths to serverless, starting with the most suitable components like background jobs and APIs.' },
        ],
        animation: {
          heroVisual: 'network-nodes',
          bgPattern: 'dots',
          decorations: 'hexagons',
          motion: 'orbit',
          featureStyle: 'minimal',
          processLayout: 'cards',
        },
      },
      status: 'published',
      featured: false,
      order: 86,
      parentSlug: 'devops-cloud',
      category: 'infrastructure',
      isParent: false,
    },
    {
      name: 'Database Design & Optimization',
      slug: 'database-design-optimization',
      description: 'Database architecture and performance tuning',
      shortDescription: 'Design efficient database schemas and optimize query performance for scalable, fast applications.',
      fullDescription: 'Build a solid data foundation for your application. We design normalized schemas, optimize indexes, tune queries, and implement caching strategies that keep your database fast as you scale to millions of records.',
      icon: 'chart-bar',
      heroImage: '/images/services/database-hero.jpg',
      color: 'blue',
      features: [
        'Schema Design & Modeling',
        'Index Optimization',
        'Query Performance Tuning',
        'Database Migration',
        'Replication & Sharding',
        'Caching Strategies',
        'Backup & Recovery',
        'Database Monitoring',
      ],
      benefits: [
        'Sub-millisecond query response',
        'Handle millions of records',
        'Reduced infrastructure costs',
        'Data integrity & consistency',
        'Disaster recovery ready',
        'Scalable architecture',
      ],
      content: {
        process: [
          { step: 1, title: 'Data Modeling', description: 'Analyze requirements and design optimal schema with proper normalization and relationships.' },
          { step: 2, title: 'Performance Analysis', description: 'Identify slow queries, missing indexes, and optimization opportunities.' },
          { step: 3, title: 'Implementation', description: 'Implement schema changes, indexes, and caching with zero-downtime migrations.' },
          { step: 4, title: 'Monitoring', description: 'Set up continuous monitoring, alerting, and regular performance reviews.' },
        ],
        technologies: [
          { name: 'PostgreSQL', icon: 'postgresql' },
          { name: 'MySQL', icon: 'mysql' },
          { name: 'MongoDB', icon: 'mongodb' },
          { name: 'Redis', icon: 'redis' },
          { name: 'Prisma', icon: 'prisma' },
          { name: 'PgBouncer', icon: 'postgresql' },
        ],
        portfolio: [
          { title: 'High-Traffic E-commerce Database', category: 'E-commerce', image: '/images/portfolio/db-ecommerce.jpg' },
          { title: 'Analytics Data Warehouse', category: 'Analytics', image: '/images/portfolio/db-analytics.jpg' },
        ],
        faq: [
          { question: 'SQL or NoSQL - which should we use?', answer: 'SQL for structured data with complex relationships. NoSQL for unstructured data, high write throughput, or horizontal scaling. Often both in the same system.' },
          { question: 'How do you optimize slow queries?', answer: 'We analyze query plans, add appropriate indexes, rewrite inefficient queries, implement caching, and denormalize where beneficial.' },
          { question: 'Can you migrate our database?', answer: 'Yes, we handle migrations between databases with zero-downtime strategies, data validation, and rollback plans.' },
          { question: 'How do you handle database scaling?', answer: 'Read replicas for read scaling, connection pooling, query optimization, caching layers, and sharding for write scaling when needed.' },
        ],
        animation: {
          heroVisual: 'data-flow',
          bgPattern: 'grid',
          decorations: 'squares',
          motion: 'wave',
          featureStyle: 'bordered',
          processLayout: 'zigzag',
        },
      },
      status: 'published',
      featured: false,
      order: 87,
      parentSlug: 'data-analytics',
      category: 'infrastructure',
      isParent: false,
    },
    {
      name: 'AI Chatbot Integration',
      slug: 'ai-chatbot-integration',
      description: 'GPT-powered chatbot integration',
      shortDescription: 'Integrate intelligent AI chatbots powered by GPT-4 and Claude into your website, app, or customer service.',
      fullDescription: 'Add conversational AI to your products with custom GPT-4 and Claude-powered chatbots. We build intelligent assistants that understand context, access your knowledge base, and provide helpful, on-brand responses 24/7.',
      icon: 'chat',
      heroImage: '/images/services/ai-chatbot-hero.jpg',
      color: 'emerald',
      features: [
        'GPT-4 & Claude Integration',
        'Custom Knowledge Base (RAG)',
        'Multi-Turn Conversations',
        'Intent Recognition',
        'Human Handoff',
        'Multi-Language Support',
        'Analytics & Insights',
        'Brand Voice Customization',
      ],
      benefits: [
        'Answer questions 24/7 instantly',
        'Reduce support ticket volume',
        'Consistent, accurate responses',
        'Scale without hiring',
        'Learn from every conversation',
        'Improve customer satisfaction',
      ],
      content: {
        process: [
          { step: 1, title: 'Knowledge Ingestion', description: 'Ingest your documentation, FAQs, and knowledge base into a vector database for retrieval.' },
          { step: 2, title: 'Prompt Engineering', description: 'Design prompts that ensure accurate, helpful, and on-brand responses.' },
          { step: 3, title: 'Integration', description: 'Integrate the chatbot into your website, app, or messaging platforms.' },
          { step: 4, title: 'Training & Improvement', description: 'Monitor conversations, handle edge cases, and continuously improve responses.' },
        ],
        technologies: [
          { name: 'OpenAI GPT-4', icon: 'openai' },
          { name: 'Anthropic Claude', icon: 'anthropic' },
          { name: 'LangChain', icon: 'langchain' },
          { name: 'Pinecone', icon: 'pinecone' },
          { name: 'Vercel AI SDK', icon: 'vercel' },
          { name: 'Intercom', icon: 'intercom' },
        ],
        portfolio: [
          { title: 'Customer Support Chatbot', category: 'Support', image: '/images/portfolio/chatbot-support.jpg' },
          { title: 'Sales Assistant Bot', category: 'Sales', image: '/images/portfolio/chatbot-sales.jpg' },
        ],
        faq: [
          { question: 'How accurate are AI chatbots?', answer: 'With RAG (retrieval augmented generation), chatbots answer from your knowledge base with high accuracy. We implement guardrails to prevent hallucinations.' },
          { question: 'Can the chatbot hand off to humans?', answer: 'Yes, we implement intelligent handoff when the bot detects complex issues, user frustration, or explicit requests for human support.' },
          { question: 'How do you prevent wrong answers?', answer: 'We use retrieval to ground responses in your actual content, add confidence thresholds, and implement review workflows for uncertain responses.' },
          { question: 'What about data privacy?', answer: 'We can use privacy-focused providers, implement data anonymization, and deploy on your own infrastructure if needed for compliance.' },
        ],
        animation: {
          heroVisual: 'chat-bubbles',
          bgPattern: 'waves',
          decorations: 'circles',
          motion: 'float',
          featureStyle: 'icon-top',
          processLayout: 'timeline',
        },
      },
      status: 'published',
      featured: false,
      order: 88,
      parentSlug: 'conversational-ai',
      category: 'ai-ml',
      isParent: false,
    },
    {
      name: 'API Security & Authentication',
      slug: 'api-security-authentication',
      description: 'Secure API authentication implementation',
      shortDescription: 'Implement robust API security with OAuth 2.0, JWT tokens, API keys, and rate limiting.',
      fullDescription: 'Protect your APIs from unauthorized access and abuse. We implement industry-standard authentication protocols, authorization systems, rate limiting, and security best practices to keep your data safe while providing smooth developer experiences.',
      icon: 'shield',
      heroImage: '/images/services/api-security-hero.jpg',
      color: 'amber',
      features: [
        'OAuth 2.0 & OpenID Connect',
        'JWT Token Management',
        'API Key Authentication',
        'Role-Based Access Control',
        'Rate Limiting & Throttling',
        'Request Signing & Validation',
        'Security Audit Logging',
        'API Gateway Configuration',
      ],
      benefits: [
        'Prevent unauthorized access',
        'Protect against API abuse',
        'Compliance with security standards',
        'Granular access control',
        'Audit trail for all access',
        'Developer-friendly authentication',
      ],
      content: {
        process: [
          { step: 1, title: 'Security Assessment', description: 'Audit current API security posture and identify vulnerabilities and requirements.' },
          { step: 2, title: 'Auth Design', description: 'Design authentication and authorization architecture appropriate for your use cases.' },
          { step: 3, title: 'Implementation', description: 'Implement auth flows, token management, and access control with proper testing.' },
          { step: 4, title: 'Monitoring', description: 'Set up security monitoring, alerting, and regular penetration testing.' },
        ],
        technologies: [
          { name: 'Auth0', icon: 'auth0' },
          { name: 'Clerk', icon: 'clerk' },
          { name: 'NextAuth.js', icon: 'nextjs' },
          { name: 'OAuth 2.0', icon: 'oauth' },
          { name: 'Kong', icon: 'kong' },
          { name: 'AWS API Gateway', icon: 'aws' },
        ],
        portfolio: [
          { title: 'Multi-Tenant SaaS Auth System', category: 'SaaS', image: '/images/portfolio/auth-saas.jpg' },
          { title: 'Public API Authentication', category: 'API', image: '/images/portfolio/auth-api.jpg' },
        ],
        faq: [
          { question: 'OAuth 2.0 or API keys - which should we use?', answer: 'OAuth 2.0 for user-delegated access and third-party integrations. API keys for server-to-server and simpler use cases. Often both for different scenarios.' },
          { question: 'How do you handle token refresh?', answer: 'We implement secure refresh token flows with rotation, proper expiration, and revocation capabilities.' },
          { question: 'What about rate limiting?', answer: 'We implement tiered rate limits based on authentication level, with proper headers and graceful degradation for limit exceeded scenarios.' },
          { question: 'Can you secure an existing API?', answer: 'Yes, we can add authentication layers to existing APIs with minimal disruption, including migration paths for existing consumers.' },
        ],
        animation: {
          heroVisual: 'shield-lock',
          bgPattern: 'hexagons',
          decorations: 'dots',
          motion: 'spin-slow',
          featureStyle: 'gradient-border',
          processLayout: 'cards',
        },
      },
      status: 'published',
      featured: false,
      order: 89,
      parentSlug: 'api-development',
      category: 'web-software',
      isParent: false,
    },
    // ===== Batch 2: Additional Services (90-104) =====
    {
      name: 'Progressive Web Apps',
      slug: 'progressive-web-apps',
      description: 'Build installable, offline-capable web apps that work on any device.',
      shortDescription: 'Create app-like experiences on the web with PWA technology—installable, fast, and working offline.',
      fullDescription: 'Progressive Web Apps combine the best of web and native apps. We build PWAs that load instantly, work offline, and can be installed on any device. Using service workers, app manifests, and modern APIs, we create experiences that rival native apps while maintaining the reach of the web.',
      icon: '📱',
      color: '#6366F1',
      features: [
        'Service Worker Implementation',
        'Offline-First Architecture',
        'App Manifest & Install Prompts',
        'Push Notifications',
        'Background Sync',
        'Responsive Design for All Devices',
        'Performance Optimization',
        'App Store Publishing (PWA Builder)',
      ],
      benefits: [
        'Install on any device without app stores',
        'Works offline and on flaky networks',
        'Faster than traditional web apps',
        'Single codebase for all platforms',
        'Automatic updates without user intervention',
        'Lower development costs than native apps',
      ],
      content: {
        process: [
          { step: 1, title: 'PWA Audit', description: 'Evaluate your existing web app or requirements, identify PWA opportunities and offline strategies.' },
          { step: 2, title: 'Architecture Design', description: 'Design service worker caching strategy, offline data sync, and app shell architecture.' },
          { step: 3, title: 'Implementation', description: 'Build service workers, implement caching, add manifest, and enable installability.' },
          { step: 4, title: 'Testing & Optimization', description: 'Test offline scenarios, optimize Lighthouse scores, and ensure cross-browser compatibility.' },
          { step: 5, title: 'Launch & Monitor', description: 'Deploy PWA, monitor install rates, offline usage, and user engagement metrics.' },
        ],
        technologies: [
          { name: 'Workbox', icon: '📦' },
          { name: 'Service Workers', icon: '⚙️' },
          { name: 'IndexedDB', icon: '💾' },
          { name: 'Web Push', icon: '🔔' },
          { name: 'PWA Builder', icon: '🛠️' },
          { name: 'Lighthouse', icon: '🏠' },
        ],
        faq: [
          { question: 'What makes a PWA different from a regular website?', answer: 'PWAs are installable, work offline, can send push notifications, and provide app-like experiences—all while being delivered through the web.' },
          { question: 'Can PWAs be published to app stores?', answer: 'Yes! PWAs can be published to Microsoft Store directly, and to Google Play using TWA (Trusted Web Activity). iOS support is improving.' },
          { question: 'How does offline functionality work?', answer: 'Service workers cache essential assets and data, allowing the app to function without network. Background sync queues actions until connectivity returns.' },
          { question: 'Are PWAs secure?', answer: 'PWAs require HTTPS, making them secure by default. Service workers also have security boundaries that prevent malicious code injection.' },
        ],
        animation: {
          heroVisual: 'rocket-launch',
          bgPattern: 'waves',
          decorations: 'triangles',
          motion: 'float',
          featureStyle: 'icon-top',
          processLayout: 'zigzag',
        },
      },
      status: 'published',
      featured: false,
      order: 90,
      parentSlug: 'web-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Flutter Development',
      slug: 'flutter-development',
      description: 'Build beautiful, natively compiled apps for mobile, web, and desktop from a single codebase.',
      shortDescription: 'Create stunning cross-platform apps with Flutter—one codebase for iOS, Android, web, and desktop.',
      fullDescription: 'Flutter enables true cross-platform development with a single codebase that compiles to native code. We build beautiful, fast Flutter apps that look and feel native on every platform. With hot reload, rich widgets, and Dart\'s productivity, we deliver polished apps faster.',
      icon: '🦋',
      color: '#02569B',
      features: [
        'Cross-Platform (iOS, Android, Web, Desktop)',
        'Custom Widget Development',
        'State Management (Riverpod, BLoC)',
        'Firebase Integration',
        'Platform-Specific Customizations',
        'Animations & Transitions',
        'Internationalization & Localization',
        'CI/CD with Codemagic/Fastlane',
      ],
      benefits: [
        'Single codebase for all platforms',
        'Near-native performance',
        'Beautiful, customizable UI',
        'Fast development with hot reload',
        'Growing ecosystem and community',
        'Cost-effective multi-platform development',
      ],
      content: {
        process: [
          { step: 1, title: 'Design & Architecture', description: 'Create UI mockups, define app architecture, choose state management approach, and plan platform integrations.' },
          { step: 2, title: 'Core Development', description: 'Build shared widgets, implement business logic, set up navigation, and integrate backend services.' },
          { step: 3, title: 'Platform Tuning', description: 'Add platform-specific features, optimize for each target, and implement native integrations where needed.' },
          { step: 4, title: 'Testing', description: 'Unit tests, widget tests, integration tests, and manual testing on physical devices across platforms.' },
          { step: 5, title: 'Release', description: 'Prepare app store assets, configure CI/CD pipelines, and publish to app stores and web.' },
        ],
        technologies: [
          { name: 'Flutter', icon: '🦋' },
          { name: 'Dart', icon: '🎯' },
          { name: 'Firebase', icon: '🔥' },
          { name: 'Riverpod', icon: '🌊' },
          { name: 'GetX', icon: '⚡' },
          { name: 'Hive', icon: '🐝' },
        ],
        faq: [
          { question: 'Flutter vs React Native—which is better?', answer: 'Flutter offers better performance and UI consistency across platforms with its own rendering engine. React Native is better if you need extensive native module support or have an existing React team.' },
          { question: 'Can Flutter apps really feel native?', answer: 'Yes! Flutter compiles to native code and can match platform conventions. With Material and Cupertino widgets, apps feel native on Android and iOS.' },
          { question: 'Is Flutter good for web apps?', answer: 'Flutter web is production-ready for app-like experiences. For content-heavy sites, traditional web frameworks may be more appropriate.' },
          { question: 'How large are Flutter apps?', answer: 'A basic Flutter app is ~4-5MB on Android and ~10-15MB on iOS. This is comparable to native and smaller than many React Native apps.' },
        ],
        animation: {
          heroVisual: 'mobile-device',
          bgPattern: 'grid',
          decorations: 'mixed',
          motion: 'cascade',
          featureStyle: 'numbered',
          processLayout: 'timeline',
        },
      },
      status: 'published',
      featured: false,
      order: 91,
      parentSlug: 'mobile-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Blockchain Development',
      slug: 'blockchain-development',
      description: 'Build decentralized applications, smart contracts, and blockchain solutions.',
      shortDescription: 'Develop secure smart contracts, DApps, and blockchain integrations on Ethereum, Solana, and more.',
      fullDescription: 'We build blockchain solutions that bring transparency, security, and decentralization to your business. From smart contracts on Ethereum and Solana to full DApp development, token creation, and NFT marketplaces—we help you leverage Web3 technology effectively.',
      icon: '⛓️',
      color: '#627EEA',
      features: [
        'Smart Contract Development',
        'DApp Frontend & Backend',
        'Token Creation (ERC-20, ERC-721)',
        'NFT Marketplace Development',
        'Wallet Integration',
        'Cross-Chain Solutions',
        'Smart Contract Auditing',
        'Gas Optimization',
      ],
      benefits: [
        'Immutable, tamper-proof records',
        'Trustless transactions without intermediaries',
        'Global accessibility 24/7',
        'Programmable money and assets',
        'Transparent audit trails',
        'New revenue streams through tokenization',
      ],
      content: {
        process: [
          { step: 1, title: 'Blockchain Strategy', description: 'Evaluate use case fit, choose appropriate blockchain, and design tokenomics if applicable.' },
          { step: 2, title: 'Smart Contract Development', description: 'Write, test, and optimize smart contracts with comprehensive unit and integration tests.' },
          { step: 3, title: 'DApp Development', description: 'Build frontend with Web3 integration, implement wallet connections, and handle blockchain interactions.' },
          { step: 4, title: 'Security Audit', description: 'Conduct thorough security review, fix vulnerabilities, and prepare for third-party audit.' },
          { step: 5, title: 'Deployment & Maintenance', description: 'Deploy to mainnet, monitor contract activity, and provide ongoing support and upgrades.' },
        ],
        technologies: [
          { name: 'Solidity', icon: '📜' },
          { name: 'Ethereum', icon: '💎' },
          { name: 'Solana', icon: '🌞' },
          { name: 'Hardhat', icon: '👷' },
          { name: 'Web3.js', icon: '🌐' },
          { name: 'IPFS', icon: '📦' },
        ],
        faq: [
          { question: 'Which blockchain should we use?', answer: 'Ethereum for maximum decentralization and ecosystem, Solana for speed and low fees, Polygon for Ethereum compatibility with lower costs. We help choose based on your specific needs.' },
          { question: 'How do you ensure smart contract security?', answer: 'We follow best practices (OpenZeppelin), write extensive tests, use static analysis tools, and recommend third-party audits for high-value contracts.' },
          { question: 'Can you integrate blockchain with existing systems?', answer: 'Yes, we build hybrid solutions that connect traditional backends with blockchain, using oracles for external data and webhooks for event notifications.' },
          { question: 'What about gas costs?', answer: 'We optimize contracts for gas efficiency and can implement layer-2 solutions or choose lower-cost chains to reduce transaction fees.' },
        ],
        animation: {
          heroVisual: 'network-nodes',
          bgPattern: 'hexagons',
          decorations: 'squares',
          motion: 'pulse',
          featureStyle: 'gradient-border',
          processLayout: 'steps-horizontal',
        },
      },
      status: 'published',
      featured: false,
      order: 92,
      parentSlug: 'web-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Natural Language Processing',
      slug: 'natural-language-processing',
      description: 'Build AI systems that understand, interpret, and generate human language.',
      shortDescription: 'Create NLP solutions for text analysis, sentiment detection, chatbots, and language generation.',
      fullDescription: 'Natural Language Processing enables machines to understand and work with human language. We build NLP solutions that extract insights from text, power intelligent chatbots, analyze sentiment, summarize documents, and generate human-like content—using both traditional ML and modern LLMs.',
      icon: '🗣️',
      color: '#10B981',
      features: [
        'Text Classification & Categorization',
        'Sentiment Analysis',
        'Named Entity Recognition',
        'Text Summarization',
        'Language Translation',
        'Question Answering Systems',
        'Document Understanding',
        'Custom LLM Fine-tuning',
      ],
      benefits: [
        'Automate document processing',
        'Understand customer sentiment at scale',
        'Extract structured data from unstructured text',
        'Enable natural human-computer interaction',
        'Multilingual content capabilities',
        'Reduce manual text analysis workload',
      ],
      content: {
        process: [
          { step: 1, title: 'Data Collection & Annotation', description: 'Gather training data, create annotation guidelines, and label datasets for your specific domain.' },
          { step: 2, title: 'Model Selection', description: 'Choose appropriate models—traditional ML, transformers, or LLMs—based on task requirements and constraints.' },
          { step: 3, title: 'Training & Fine-tuning', description: 'Train or fine-tune models on your data, optimizing for accuracy, speed, and cost.' },
          { step: 4, title: 'Evaluation & Iteration', description: 'Rigorously evaluate model performance, identify failure cases, and iterate to improve.' },
          { step: 5, title: 'Deployment & Monitoring', description: 'Deploy models with proper infrastructure, monitor performance, and retrain as needed.' },
        ],
        technologies: [
          { name: 'spaCy', icon: '🔤' },
          { name: 'Hugging Face', icon: '🤗' },
          { name: 'OpenAI', icon: '🧠' },
          { name: 'BERT', icon: '📚' },
          { name: 'LangChain', icon: '🔗' },
          { name: 'NLTK', icon: '📖' },
        ],
        faq: [
          { question: 'When to use traditional NLP vs LLMs?', answer: 'Traditional NLP for structured tasks like NER, classification with labeled data. LLMs for complex reasoning, generation, and when you need flexibility without extensive training data.' },
          { question: 'How much training data do we need?', answer: 'It depends on the task. Classification might need thousands of examples. LLM fine-tuning can work with hundreds. Zero-shot with LLMs needs none but may be less accurate.' },
          { question: 'Can you handle multiple languages?', answer: 'Yes, we work with multilingual models and can build solutions that handle multiple languages simultaneously or specific language pairs.' },
          { question: 'How do you handle domain-specific terminology?', answer: 'We create custom vocabularies, fine-tune on domain data, and use techniques like few-shot learning to adapt models to your specific terminology.' },
        ],
        animation: {
          heroVisual: 'brain-network',
          bgPattern: 'dots',
          decorations: 'lines',
          motion: 'morph',
          featureStyle: 'icon-left',
          processLayout: 'cards',
        },
      },
      status: 'published',
      featured: false,
      order: 93,
      parentSlug: 'ai-solutions',
      category: 'ai-ml',
      isParent: false,
    },
    {
      name: 'Predictive Analytics',
      slug: 'predictive-analytics',
      description: 'Use data and ML to predict future outcomes and drive smarter decisions.',
      shortDescription: 'Forecast trends, predict customer behavior, and anticipate risks with ML-powered analytics.',
      fullDescription: 'Predictive analytics uses historical data and machine learning to forecast future outcomes. We build predictive models that help you anticipate customer churn, forecast demand, detect fraud, predict equipment failures, and make data-driven decisions before events occur.',
      icon: '🔮',
      color: '#8B5CF6',
      features: [
        'Demand Forecasting',
        'Customer Churn Prediction',
        'Fraud Detection',
        'Predictive Maintenance',
        'Risk Scoring',
        'Lead Scoring',
        'Price Optimization',
        'Anomaly Detection',
      ],
      benefits: [
        'Make proactive instead of reactive decisions',
        'Reduce costs by anticipating problems',
        'Increase revenue by predicting opportunities',
        'Optimize inventory and resources',
        'Reduce fraud and risk exposure',
        'Improve customer retention',
      ],
      content: {
        process: [
          { step: 1, title: 'Problem Definition', description: 'Define the business problem, prediction target, and success metrics clearly.' },
          { step: 2, title: 'Data Preparation', description: 'Collect, clean, and engineer features from historical data. Handle missing values and outliers.' },
          { step: 3, title: 'Model Development', description: 'Train multiple models, tune hyperparameters, and select the best performer.' },
          { step: 4, title: 'Validation', description: 'Validate model on holdout data, test in real-world conditions, and ensure generalization.' },
          { step: 5, title: 'Deployment & Action', description: 'Deploy model to production, integrate with business processes, and enable actionable insights.' },
        ],
        technologies: [
          { name: 'scikit-learn', icon: '🔧' },
          { name: 'XGBoost', icon: '🚀' },
          { name: 'Prophet', icon: '📈' },
          { name: 'TensorFlow', icon: '🧮' },
          { name: 'MLflow', icon: '📊' },
          { name: 'Databricks', icon: '⚡' },
        ],
        faq: [
          { question: 'How accurate are predictive models?', answer: 'Accuracy varies by problem complexity and data quality. We set realistic expectations and focus on providing actionable predictions that improve decision-making.' },
          { question: 'How much historical data do we need?', answer: 'Generally, more is better. For time series, at least 2-3 cycles of the pattern you want to predict. For classification, at least 1000s of examples per class.' },
          { question: 'Can you explain why the model makes certain predictions?', answer: 'Yes, we prioritize interpretable models and use explainability tools (SHAP, LIME) to understand feature importance and individual predictions.' },
          { question: 'How do you handle changing patterns?', answer: 'We implement model monitoring, drift detection, and retraining pipelines to ensure models adapt to changing conditions.' },
        ],
        animation: {
          heroVisual: 'chart-graph',
          bgPattern: 'diagonal-lines',
          decorations: 'circles',
          motion: 'wave',
          featureStyle: 'bordered',
          processLayout: 'timeline',
        },
      },
      status: 'published',
      featured: false,
      order: 94,
      parentSlug: 'data-analytics',
      category: 'ai-ml',
      isParent: false,
    },
    {
      name: 'WordPress Development',
      slug: 'wordpress-development',
      description: 'Build custom WordPress websites, themes, and plugins.',
      shortDescription: 'Create powerful WordPress sites with custom themes, plugins, and optimized performance.',
      fullDescription: 'WordPress powers over 40% of the web for good reason. We build custom WordPress solutions—from marketing sites to complex applications. Our expertise covers custom theme development, plugin creation, performance optimization, security hardening, and headless WordPress architectures.',
      icon: '📝',
      color: '#21759B',
      features: [
        'Custom Theme Development',
        'Plugin Development',
        'WooCommerce Integration',
        'Performance Optimization',
        'Security Hardening',
        'Headless WordPress (REST/GraphQL)',
        'Migration & Upgrades',
        'Multisite Setup',
      ],
      benefits: [
        'Easy content management for non-technical users',
        'Massive plugin ecosystem',
        'SEO-friendly out of the box',
        'Cost-effective for content-heavy sites',
        'Large talent pool for maintenance',
        'Proven, battle-tested platform',
      ],
      content: {
        process: [
          { step: 1, title: 'Requirements & Design', description: 'Understand content needs, design site architecture, and create wireframes and mockups.' },
          { step: 2, title: 'Theme Development', description: 'Build custom theme with clean code, responsive design, and page builder integration if needed.' },
          { step: 3, title: 'Plugin Integration', description: 'Select and configure plugins, develop custom plugins for unique functionality.' },
          { step: 4, title: 'Optimization', description: 'Optimize performance, implement caching, optimize images, and harden security.' },
          { step: 5, title: 'Training & Launch', description: 'Train content editors, test thoroughly, and launch with monitoring in place.' },
        ],
        technologies: [
          { name: 'WordPress', icon: '📝' },
          { name: 'PHP', icon: '🐘' },
          { name: 'ACF', icon: '🔧' },
          { name: 'Elementor', icon: '🎨' },
          { name: 'WooCommerce', icon: '🛒' },
          { name: 'WP Engine', icon: '⚡' },
        ],
        faq: [
          { question: 'WordPress vs custom development—when to use which?', answer: 'WordPress for content-heavy sites, blogs, and when non-technical users need to update content. Custom for complex applications, unique requirements, or when WordPress would be over-engineered.' },
          { question: 'Is WordPress secure?', answer: 'WordPress core is secure when kept updated. Most vulnerabilities come from outdated plugins and poor practices. We implement security best practices and monitoring.' },
          { question: 'Can WordPress handle high traffic?', answer: 'Yes, with proper hosting, caching, and optimization. Major sites like TechCrunch and Rolling Stone run on WordPress.' },
          { question: 'What about headless WordPress?', answer: 'We can use WordPress as a headless CMS with React/Next.js frontend, giving you WordPress ease-of-use with modern frontend performance.' },
        ],
        animation: {
          heroVisual: 'code-editor',
          bgPattern: 'grid',
          decorations: 'dots',
          motion: 'type',
          featureStyle: 'minimal',
          processLayout: 'steps-horizontal',
        },
      },
      status: 'published',
      featured: false,
      order: 95,
      parentSlug: 'web-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Shopify Development',
      slug: 'shopify-development',
      description: 'Build and customize Shopify stores for powerful e-commerce.',
      shortDescription: 'Create beautiful, high-converting Shopify stores with custom themes and app integrations.',
      fullDescription: 'Shopify makes e-commerce accessible, and we make it exceptional. We build custom Shopify stores that convert—from theme customization and app development to Shopify Plus implementations. Whether you\'re launching your first store or scaling to enterprise, we deliver Shopify solutions that drive sales.',
      icon: '🛍️',
      color: '#96BF48',
      features: [
        'Custom Theme Development',
        'Shopify App Development',
        'Shopify Plus Implementation',
        'Migration to Shopify',
        'Performance Optimization',
        'Checkout Customization',
        'Multi-Currency & Multi-Language',
        'Integration with ERP/CRM',
      ],
      benefits: [
        'Fast time to market',
        'Reliable, hosted infrastructure',
        'Built-in payment processing',
        'Extensive app marketplace',
        'Automatic security and compliance',
        'Scales with your business',
      ],
      content: {
        process: [
          { step: 1, title: 'Discovery', description: 'Understand your brand, products, target audience, and business requirements.' },
          { step: 2, title: 'Design', description: 'Design store experience, product presentation, and checkout flow optimized for conversion.' },
          { step: 3, title: 'Development', description: 'Build custom theme with Liquid, integrate apps, and implement unique functionality.' },
          { step: 4, title: 'Data Migration', description: 'Migrate products, customers, and orders from existing platform with zero data loss.' },
          { step: 5, title: 'Launch & Optimize', description: 'Launch store, monitor performance, and continuously optimize based on data.' },
        ],
        technologies: [
          { name: 'Shopify', icon: '🛍️' },
          { name: 'Liquid', icon: '💧' },
          { name: 'Hydrogen', icon: '⚛️' },
          { name: 'Shopify CLI', icon: '🖥️' },
          { name: 'Klaviyo', icon: '📧' },
          { name: 'ReCharge', icon: '🔄' },
        ],
        faq: [
          { question: 'Shopify vs WooCommerce—which is better?', answer: 'Shopify for dedicated e-commerce with less maintenance. WooCommerce if you need WordPress integration or more control. Shopify is generally easier and more reliable.' },
          { question: 'Can you migrate our existing store?', answer: 'Yes, we migrate from WooCommerce, Magento, BigCommerce, and custom platforms. We handle products, customers, orders, and SEO redirects.' },
          { question: 'What is Shopify Plus?', answer: 'Shopify Plus is the enterprise tier with advanced features: checkout customization, higher API limits, dedicated support, and B2B functionality.' },
          { question: 'Can Shopify handle large catalogs?', answer: 'Yes, Shopify handles millions of products. For very large catalogs, we implement efficient filtering, search optimization, and inventory management.' },
        ],
        animation: {
          heroVisual: 'shopping-cart-3d',
          bgPattern: 'waves',
          decorations: 'mixed',
          motion: 'float',
          featureStyle: 'icon-top',
          processLayout: 'zigzag',
        },
      },
      status: 'published',
      featured: false,
      order: 96,
      parentSlug: 'e-commerce',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Magento Development',
      slug: 'magento-development',
      description: 'Build enterprise e-commerce solutions with Adobe Commerce (Magento).',
      shortDescription: 'Create powerful, scalable e-commerce platforms with Magento/Adobe Commerce.',
      fullDescription: 'Magento (Adobe Commerce) is the platform for complex, enterprise e-commerce. We build and customize Magento stores that handle complex catalogs, B2B workflows, multiple storefronts, and advanced integrations. Our expertise covers custom module development, performance optimization, and enterprise implementations.',
      icon: '🏪',
      color: '#F46F25',
      features: [
        'Custom Module Development',
        'Theme Customization',
        'Multi-Store Setup',
        'B2B Commerce Features',
        'ERP/CRM Integration',
        'Performance Optimization',
        'Migration to Magento 2',
        'Adobe Commerce Cloud',
      ],
      benefits: [
        'Handle complex product configurations',
        'Advanced B2B capabilities',
        'Multi-store from single backend',
        'Highly customizable',
        'Robust for enterprise scale',
        'Adobe ecosystem integration',
      ],
      content: {
        process: [
          { step: 1, title: 'Requirements Analysis', description: 'Document complex business rules, catalog structure, pricing logic, and integration requirements.' },
          { step: 2, title: 'Architecture', description: 'Design system architecture, extension strategy, and performance approach.' },
          { step: 3, title: 'Development', description: 'Build custom modules, implement theme, and integrate with external systems.' },
          { step: 4, title: 'Data Migration', description: 'Migrate products, customers, orders from existing system with full data integrity.' },
          { step: 5, title: 'Testing & Launch', description: 'Comprehensive testing, load testing, and phased rollout to production.' },
        ],
        technologies: [
          { name: 'Magento 2', icon: '🏪' },
          { name: 'PHP', icon: '🐘' },
          { name: 'GraphQL', icon: '📊' },
          { name: 'Elasticsearch', icon: '🔍' },
          { name: 'Varnish', icon: '⚡' },
          { name: 'Redis', icon: '🔴' },
        ],
        faq: [
          { question: 'When should we choose Magento over Shopify?', answer: 'Magento for complex B2B, highly custom catalogs, multiple stores from one backend, or when you need complete control. Shopify is better for simpler B2C and faster launch.' },
          { question: 'Is Magento performance a concern?', answer: 'Magento can be slow if poorly implemented. We build performant Magento stores with proper caching, optimized code, and appropriate hosting.' },
          { question: 'What about Magento 2 vs Magento 1?', answer: 'Magento 1 is end-of-life. We help migrate to Magento 2 (Adobe Commerce) with modern architecture and security.' },
          { question: 'How complex are Magento projects?', answer: 'Magento projects are typically larger and more complex than other platforms. We provide realistic scoping and phased delivery approaches.' },
        ],
        animation: {
          heroVisual: 'shopping-cart-3d',
          bgPattern: 'hexagons',
          decorations: 'squares',
          motion: 'cascade',
          featureStyle: 'numbered',
          processLayout: 'timeline',
        },
      },
      status: 'published',
      featured: false,
      order: 97,
      parentSlug: 'e-commerce',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Video Marketing',
      slug: 'video-marketing',
      description: 'Create and distribute video content that engages and converts.',
      shortDescription: 'Produce compelling video content for marketing, training, and brand storytelling.',
      fullDescription: 'Video is the most engaging content format. We help you plan, produce, and distribute video content that captures attention and drives action—from explainer videos and product demos to social media content and brand documentaries. Our full-service approach covers strategy, production, and promotion.',
      icon: '🎬',
      color: '#EF4444',
      features: [
        'Video Strategy & Planning',
        'Explainer Video Production',
        'Product Demo Videos',
        'Social Media Video Content',
        'Brand Documentaries',
        'Video SEO & YouTube Optimization',
        'Video Advertising',
        'Analytics & Performance Tracking',
      ],
      benefits: [
        'Higher engagement than text or images',
        'Improved conversion rates',
        'Better information retention',
        'Stronger emotional connection',
        'Increased social sharing',
        'Improved SEO with video content',
      ],
      content: {
        process: [
          { step: 1, title: 'Strategy', description: 'Define video goals, target audience, distribution channels, and content calendar.' },
          { step: 2, title: 'Pre-Production', description: 'Scriptwriting, storyboarding, casting, and production planning.' },
          { step: 3, title: 'Production', description: 'Video shooting, animation, voiceover recording, and b-roll capture.' },
          { step: 4, title: 'Post-Production', description: 'Editing, color grading, sound design, graphics, and final delivery.' },
          { step: 5, title: 'Distribution', description: 'Publish across channels, optimize for each platform, and promote for maximum reach.' },
        ],
        technologies: [
          { name: 'Adobe Premiere', icon: '🎬' },
          { name: 'After Effects', icon: '✨' },
          { name: 'DaVinci Resolve', icon: '🎨' },
          { name: 'YouTube Studio', icon: '📺' },
          { name: 'Vimeo', icon: '🎥' },
          { name: 'Wistia', icon: '📊' },
        ],
        faq: [
          { question: 'What types of videos work best for marketing?', answer: 'It depends on your goals. Explainers for awareness, testimonials for trust, product demos for consideration, and how-tos for retention. We recommend a mix.' },
          { question: 'How long should marketing videos be?', answer: 'Social media: 15-60 seconds. Website: 1-2 minutes. YouTube: 7-15 minutes for in-depth content. We optimize length for platform and purpose.' },
          { question: 'Do we need professional video production?', answer: 'For brand content, yes. For social media, authentic smartphone video can work well. We help you balance quality and authenticity.' },
          { question: 'How do you measure video marketing success?', answer: 'Views, watch time, engagement rate, click-through rate, and ultimately conversions. We set up tracking and provide detailed analytics.' },
        ],
        animation: {
          heroVisual: 'megaphone-3d',
          bgPattern: 'waves',
          decorations: 'circles',
          motion: 'pulse',
          featureStyle: 'icon-left',
          processLayout: 'cards',
        },
      },
      status: 'published',
      featured: false,
      order: 98,
      parentSlug: 'content-marketing',
      category: 'marketing',
      isParent: false,
    },
    {
      name: 'Podcast Production',
      slug: 'podcast-production',
      description: 'Launch and produce professional podcasts that build your audience.',
      shortDescription: 'Create engaging podcasts with professional production, editing, and distribution.',
      fullDescription: 'Podcasts build deep connections with your audience. We help you launch and produce professional podcasts—from concept development and equipment setup to recording, editing, and distribution. Whether you\'re starting a branded podcast or scaling an existing show, we handle the production so you can focus on content.',
      icon: '🎙️',
      color: '#9333EA',
      features: [
        'Podcast Strategy & Concept',
        'Equipment & Studio Setup',
        'Recording & Remote Interviews',
        'Audio Editing & Mixing',
        'Show Notes & Transcription',
        'Distribution to All Platforms',
        'Cover Art & Branding',
        'Growth & Promotion',
      ],
      benefits: [
        'Build thought leadership',
        'Deep audience engagement',
        'Repurposable content',
        'Networking through guest interviews',
        'Growing podcast listener base',
        'Brand differentiation',
      ],
      content: {
        process: [
          { step: 1, title: 'Concept Development', description: 'Define show format, target audience, episode structure, and unique angle.' },
          { step: 2, title: 'Setup', description: 'Equipment recommendations, recording environment setup, and workflow design.' },
          { step: 3, title: 'Production', description: 'Record episodes, conduct interviews, and manage the recording process.' },
          { step: 4, title: 'Post-Production', description: 'Edit audio, add intro/outro, optimize levels, and create show notes.' },
          { step: 5, title: 'Launch & Grow', description: 'Distribute to platforms, implement growth strategies, and build audience.' },
        ],
        technologies: [
          { name: 'Riverside.fm', icon: '🎙️' },
          { name: 'Descript', icon: '✂️' },
          { name: 'Adobe Audition', icon: '🎧' },
          { name: 'Spotify for Podcasters', icon: '🎵' },
          { name: 'Transistor', icon: '📻' },
          { name: 'Podbean', icon: '☕' },
        ],
        faq: [
          { question: 'How often should we release episodes?', answer: 'Weekly is ideal for growth. Bi-weekly works for longer-form content. Consistency matters more than frequency—pick a schedule you can maintain.' },
          { question: 'What equipment do we need?', answer: 'Starting out: a good USB microphone (~$100-200) and quiet space. As you grow, we can recommend professional setups.' },
          { question: 'How do podcasts help business?', answer: 'Podcasts build authority, create networking opportunities through guest interviews, and generate content that can be repurposed across channels.' },
          { question: 'How long does it take to grow a podcast audience?', answer: 'Typically 6-12 months of consistent publishing to build meaningful audience. We implement growth strategies to accelerate this.' },
        ],
        animation: {
          heroVisual: 'megaphone-3d',
          bgPattern: 'dots',
          decorations: 'mixed',
          motion: 'wave',
          featureStyle: 'bordered',
          processLayout: 'zigzag',
        },
      },
      status: 'published',
      featured: false,
      order: 99,
      parentSlug: 'content-marketing',
      category: 'marketing',
      isParent: false,
    },
    {
      name: 'Kubernetes Orchestration',
      slug: 'kubernetes-orchestration',
      description: 'Deploy and manage containerized applications at scale with Kubernetes.',
      shortDescription: 'Orchestrate containers with Kubernetes for scalable, resilient microservices deployments.',
      fullDescription: 'Kubernetes is the standard for container orchestration. We help you adopt Kubernetes effectively—from initial cluster setup to production-grade deployments. Our services cover cluster architecture, workload migration, CI/CD integration, monitoring, and ongoing operations for self-managed or managed Kubernetes (EKS, GKE, AKS).',
      icon: '☸️',
      color: '#326CE5',
      features: [
        'Cluster Architecture & Setup',
        'Workload Migration',
        'Helm Chart Development',
        'Service Mesh (Istio/Linkerd)',
        'GitOps with ArgoCD/Flux',
        'Monitoring & Observability',
        'Security & RBAC',
        'Cost Optimization',
      ],
      benefits: [
        'Automatic scaling based on demand',
        'Self-healing deployments',
        'Consistent environments dev to prod',
        'Efficient resource utilization',
        'Declarative infrastructure',
        'Portable across clouds',
      ],
      content: {
        process: [
          { step: 1, title: 'Assessment', description: 'Evaluate current infrastructure, containerization readiness, and define Kubernetes strategy.' },
          { step: 2, title: 'Cluster Setup', description: 'Deploy Kubernetes cluster with appropriate configuration for your workloads and scale.' },
          { step: 3, title: 'Migration', description: 'Containerize applications, create Kubernetes manifests, and migrate workloads.' },
          { step: 4, title: 'CI/CD Integration', description: 'Implement GitOps workflows, automate deployments, and set up testing pipelines.' },
          { step: 5, title: 'Operations', description: 'Establish monitoring, alerting, backup procedures, and operational runbooks.' },
        ],
        technologies: [
          { name: 'Kubernetes', icon: '☸️' },
          { name: 'Helm', icon: '⎈' },
          { name: 'ArgoCD', icon: '🔄' },
          { name: 'Prometheus', icon: '📊' },
          { name: 'Istio', icon: '🕸️' },
          { name: 'Rancher', icon: '🤠' },
        ],
        faq: [
          { question: 'When is Kubernetes overkill?', answer: 'For small teams with few services, Kubernetes complexity may not be justified. We help evaluate if simpler solutions (ECS, Cloud Run, PaaS) are better fits.' },
          { question: 'Managed vs self-managed Kubernetes?', answer: 'Managed (EKS, GKE, AKS) reduces operational burden significantly. Self-managed only if you have specific requirements or expertise.' },
          { question: 'How do you handle stateful applications?', answer: 'We use StatefulSets, persistent volumes, and operators for databases. For critical data, we often recommend managed database services alongside Kubernetes.' },
          { question: 'What about Kubernetes security?', answer: 'We implement pod security policies, network policies, RBAC, secrets management, and image scanning as part of every Kubernetes deployment.' },
        ],
        animation: {
          heroVisual: 'gear-system',
          bgPattern: 'grid',
          decorations: 'hexagons',
          motion: 'orbit',
          featureStyle: 'gradient-border',
          processLayout: 'steps-horizontal',
        },
      },
      status: 'published',
      featured: false,
      order: 100,
      parentSlug: 'devops-cloud',
      category: 'infrastructure',
      isParent: false,
    },
    {
      name: 'Terraform Infrastructure',
      slug: 'terraform-infrastructure',
      description: 'Manage cloud infrastructure as code with Terraform.',
      shortDescription: 'Define and provision cloud infrastructure with Terraform for consistency and automation.',
      fullDescription: 'Infrastructure as Code (IaC) with Terraform brings software engineering practices to infrastructure management. We help you adopt Terraform for consistent, version-controlled, automated infrastructure across AWS, Azure, GCP, and more. From initial setup to module development and CI/CD integration, we make your infrastructure reproducible and auditable.',
      icon: '🏗️',
      color: '#7B42BC',
      features: [
        'Terraform Module Development',
        'Multi-Cloud Infrastructure',
        'State Management & Backends',
        'CI/CD Pipeline Integration',
        'Drift Detection & Remediation',
        'Security & Compliance as Code',
        'Cost Estimation & Optimization',
        'Migration from Manual Infrastructure',
      ],
      benefits: [
        'Version-controlled infrastructure',
        'Reproducible environments',
        'Reduced manual errors',
        'Faster provisioning',
        'Infrastructure documentation as code',
        'Multi-cloud consistency',
      ],
      content: {
        process: [
          { step: 1, title: 'Discovery', description: 'Document existing infrastructure, identify Terraform opportunities, and plan migration.' },
          { step: 2, title: 'Module Design', description: 'Design reusable Terraform modules for your common infrastructure patterns.' },
          { step: 3, title: 'Implementation', description: 'Write Terraform code, import existing resources, and establish state management.' },
          { step: 4, title: 'CI/CD Integration', description: 'Set up automated plan/apply workflows with proper approval gates and testing.' },
          { step: 5, title: 'Training & Handoff', description: 'Train your team on Terraform practices and establish ongoing maintenance procedures.' },
        ],
        technologies: [
          { name: 'Terraform', icon: '🏗️' },
          { name: 'Terraform Cloud', icon: '☁️' },
          { name: 'Terragrunt', icon: '🌱' },
          { name: 'tfsec', icon: '🔒' },
          { name: 'Checkov', icon: '✅' },
          { name: 'Atlantis', icon: '🏛️' },
        ],
        faq: [
          { question: 'Terraform vs CloudFormation vs Pulumi?', answer: 'Terraform for multi-cloud and broad adoption. CloudFormation if AWS-only and you want native integration. Pulumi if your team prefers general-purpose languages over HCL.' },
          { question: 'How do you handle Terraform state?', answer: 'We use remote state backends (S3, Terraform Cloud) with locking. State is never committed to git. We implement workspaces for environment separation.' },
          { question: 'Can you import existing infrastructure?', answer: 'Yes, we can import existing resources into Terraform management. This is a careful process to avoid disruption.' },
          { question: 'How do you handle secrets in Terraform?', answer: 'Secrets are never in Terraform code. We use secret managers (Vault, AWS Secrets Manager) with dynamic credentials where possible.' },
        ],
        animation: {
          heroVisual: 'cloud-stack',
          bgPattern: 'diagonal-lines',
          decorations: 'squares',
          motion: 'spin-slow',
          featureStyle: 'minimal',
          processLayout: 'cards',
        },
      },
      status: 'published',
      featured: false,
      order: 101,
      parentSlug: 'devops-cloud',
      category: 'infrastructure',
      isParent: false,
    },
    {
      name: 'Data Visualization',
      slug: 'data-visualization',
      description: 'Transform data into compelling visual stories and interactive dashboards.',
      shortDescription: 'Create insightful dashboards and visualizations that make data actionable.',
      fullDescription: 'Data visualization turns complex data into clear insights. We create interactive dashboards, custom visualizations, and data stories that help you understand your data and communicate findings effectively. From executive dashboards to customer-facing analytics, we design visualizations that drive decisions.',
      icon: '📊',
      color: '#F59E0B',
      features: [
        'Dashboard Design & Development',
        'Interactive Data Exploration',
        'Custom Chart Development',
        'Real-Time Data Visualization',
        'Embedded Analytics',
        'Report Automation',
        'Data Storytelling',
        'Mobile-Optimized Dashboards',
      ],
      benefits: [
        'Faster decision making',
        'Identify trends and patterns',
        'Communicate insights effectively',
        'Self-service analytics for teams',
        'Reduce report generation time',
        'Impress stakeholders with compelling visuals',
      ],
      content: {
        process: [
          { step: 1, title: 'Requirements', description: 'Understand key metrics, questions to answer, audience, and data sources.' },
          { step: 2, title: 'Data Preparation', description: 'Connect data sources, transform and model data for visualization.' },
          { step: 3, title: 'Design', description: 'Design dashboard layout, chart selection, and interaction patterns.' },
          { step: 4, title: 'Development', description: 'Build visualizations with appropriate tools, implement interactivity.' },
          { step: 5, title: 'Deployment', description: 'Deploy dashboards, set up refresh schedules, and train users.' },
        ],
        technologies: [
          { name: 'Tableau', icon: '📊' },
          { name: 'Power BI', icon: '📈' },
          { name: 'D3.js', icon: '📉' },
          { name: 'Looker', icon: '👁️' },
          { name: 'Metabase', icon: '🎯' },
          { name: 'Apache Superset', icon: '🦸' },
        ],
        faq: [
          { question: 'Which visualization tool is best?', answer: 'Tableau for powerful visuals and exploration. Power BI if you use Microsoft ecosystem. Looker for governed, scalable analytics. D3.js for custom, embedded visualizations.' },
          { question: 'Can you embed dashboards in our application?', answer: 'Yes, we can embed analytics using Looker, Tableau Embedded, or custom D3.js/React visualizations.' },
          { question: 'How do you handle real-time data?', answer: 'We implement streaming data pipelines and use tools that support live connections or frequent refreshes for near-real-time dashboards.' },
          { question: 'Do you provide dashboard training?', answer: 'Yes, we train your team on using dashboards effectively and, if desired, on creating their own visualizations.' },
        ],
        animation: {
          heroVisual: 'chart-graph',
          bgPattern: 'dots',
          decorations: 'circles',
          motion: 'morph',
          featureStyle: 'icon-top',
          processLayout: 'timeline',
        },
      },
      status: 'published',
      featured: false,
      order: 102,
      parentSlug: 'data-analytics',
      category: 'ai-ml',
      isParent: false,
    },
    {
      name: 'ETL Pipelines',
      slug: 'etl-pipelines',
      description: 'Build robust data pipelines to extract, transform, and load your data.',
      shortDescription: 'Design and implement ETL/ELT pipelines that keep your data warehouse fresh and reliable.',
      fullDescription: 'ETL pipelines are the backbone of data infrastructure. We build robust pipelines that extract data from diverse sources, transform it for analysis, and load it into your data warehouse. Whether you need batch processing, real-time streaming, or hybrid approaches, we deliver pipelines that are reliable, maintainable, and scalable.',
      icon: '🔄',
      color: '#06B6D4',
      features: [
        'Pipeline Design & Architecture',
        'Source Connectors',
        'Data Transformation',
        'Data Quality & Validation',
        'Orchestration & Scheduling',
        'Incremental Loading',
        'Real-Time Streaming',
        'Monitoring & Alerting',
      ],
      benefits: [
        'Reliable, automated data flows',
        'Single source of truth',
        'Reduced manual data work',
        'Fresh data for decision making',
        'Scalable to any data volume',
        'Traceable data lineage',
      ],
      content: {
        process: [
          { step: 1, title: 'Data Audit', description: 'Inventory data sources, understand schemas, identify quality issues and transformation needs.' },
          { step: 2, title: 'Architecture', description: 'Design pipeline architecture, choose tools, and plan incremental vs full load strategies.' },
          { step: 3, title: 'Development', description: 'Build extractors, transformations, and loaders with proper error handling and logging.' },
          { step: 4, title: 'Testing', description: 'Test data quality, edge cases, and failure scenarios. Validate business logic.' },
          { step: 5, title: 'Production', description: 'Deploy with monitoring, alerting, and documentation. Establish operational procedures.' },
        ],
        technologies: [
          { name: 'Apache Airflow', icon: '🌬️' },
          { name: 'dbt', icon: '🔧' },
          { name: 'Fivetran', icon: '🔌' },
          { name: 'Airbyte', icon: '🔄' },
          { name: 'Spark', icon: '⚡' },
          { name: 'Kafka', icon: '📨' },
        ],
        faq: [
          { question: 'ETL vs ELT—which approach?', answer: 'ELT (load raw, transform in warehouse) is preferred with modern cloud warehouses. ETL for complex transformations or sensitive data that shouldn\'t be loaded raw.' },
          { question: 'How do you handle data quality?', answer: 'We implement data validation at ingestion, transformation, and after loading. We use tools like Great Expectations or dbt tests to catch issues early.' },
          { question: 'Can you integrate with any data source?', answer: 'Yes, we can connect to APIs, databases, files, SaaS tools, and legacy systems. We build custom connectors when needed.' },
          { question: 'How do you handle pipeline failures?', answer: 'We design idempotent pipelines with proper retry logic, dead-letter queues, and alerting so failures are detected and recoverable.' },
        ],
        animation: {
          heroVisual: 'data-flow',
          bgPattern: 'hexagons',
          decorations: 'lines',
          motion: 'cascade',
          featureStyle: 'numbered',
          processLayout: 'zigzag',
        },
      },
      status: 'published',
      featured: false,
      order: 103,
      parentSlug: 'data-analytics',
      category: 'ai-ml',
      isParent: false,
    },
    {
      name: 'Voice Assistant Development',
      slug: 'voice-assistant-development',
      description: 'Build custom voice assistants and skills for Alexa, Google, and more.',
      shortDescription: 'Create voice experiences for Alexa, Google Assistant, and custom voice interfaces.',
      fullDescription: 'Voice is the next frontier of human-computer interaction. We build voice assistants that make your brand accessible through speech—from Alexa Skills and Google Actions to custom voice interfaces. Our voice solutions handle natural conversation, integrate with your backend, and provide delightful user experiences.',
      icon: '🎤',
      color: '#8B5CF6',
      features: [
        'Alexa Skill Development',
        'Google Action Development',
        'Custom Voice Interfaces',
        'Voice UI/UX Design',
        'Natural Language Understanding',
        'Backend Integration',
        'Voice Analytics',
        'Multi-Modal Experiences',
      ],
      benefits: [
        'Hands-free accessibility',
        'New customer touchpoint',
        'Brand presence on smart speakers',
        'Improved customer service efficiency',
        'Accessibility for visually impaired',
        'Stand out from competitors',
      ],
      content: {
        process: [
          { step: 1, title: 'Use Case Definition', description: 'Identify voice opportunities, define user scenarios, and design conversation flows.' },
          { step: 2, title: 'VUI Design', description: 'Design voice user interface, sample utterances, and response patterns.' },
          { step: 3, title: 'Development', description: 'Build voice app, implement intent handling, and integrate with backend services.' },
          { step: 4, title: 'Testing', description: 'Test conversation flows, edge cases, and error handling across devices.' },
          { step: 5, title: 'Launch & Iterate', description: 'Publish to skill stores, gather user feedback, and continuously improve.' },
        ],
        technologies: [
          { name: 'Alexa Skills Kit', icon: '🔵' },
          { name: 'Dialogflow', icon: '🟡' },
          { name: 'Amazon Lex', icon: '🤖' },
          { name: 'Voiceflow', icon: '🎙️' },
          { name: 'Rasa', icon: '🔊' },
          { name: 'Whisper', icon: '👂' },
        ],
        faq: [
          { question: 'Should we build for Alexa, Google, or both?', answer: 'Alexa has more skills users, Google has better NLU. Often we start with one platform and expand. We can build cross-platform using abstraction layers.' },
          { question: 'Can voice apps handle complex transactions?', answer: 'Yes, with proper conversation design. For complex workflows, we often combine voice with screen displays (multi-modal) or hand off to other channels.' },
          { question: 'How do you handle misunderstandings?', answer: 'We design robust error handling, confirmation prompts, and fallback responses. Good VUI design minimizes misunderstandings through clear prompts.' },
          { question: 'Can you integrate with our existing systems?', answer: 'Yes, voice apps can connect to any API—CRM, inventory, account systems, IoT devices, and more.' },
        ],
        animation: {
          heroVisual: 'chat-bubbles',
          bgPattern: 'circles',
          decorations: 'mixed',
          motion: 'float',
          featureStyle: 'icon-left',
          processLayout: 'steps-horizontal',
        },
      },
      status: 'published',
      featured: false,
      order: 104,
      parentSlug: 'conversational-ai',
      category: 'ai-ml',
      isParent: false,
    },
    {
      name: 'Unity Game Development',
      slug: 'unity-game-development',
      description: 'Create immersive 2D and 3D games with Unity engine for all platforms.',
      shortDescription: 'Build cross-platform games and interactive experiences with Unity, from mobile to console.',
      fullDescription: 'Unity powers over 50% of the world\'s games. We develop stunning 2D and 3D games, interactive experiences, and simulations using Unity. From mobile games to VR experiences, our Unity developers bring your creative vision to life with polished gameplay, beautiful graphics, and cross-platform deployment to iOS, Android, PC, consoles, and web.',
      icon: '🎮',
      color: '#000000',
      features: [
        '2D & 3D Game Development',
        'Mobile Game Development',
        'VR/AR Game Integration',
        'Multiplayer Networking',
        'Game Physics & AI',
        'Asset Pipeline Optimization',
        'Cross-Platform Deployment',
        'Game Analytics Integration',
      ],
      benefits: [
        'Deploy to 20+ platforms from single codebase',
        'Massive asset store ecosystem',
        'Industry-standard game engine',
        'Strong community and documentation',
        'Rapid prototyping and iteration',
        'Cost-effective development',
      ],
      content: {
        process: [
          { step: 1, title: 'Game Design Document', description: 'Define game mechanics, story, art direction, and technical requirements.' },
          { step: 2, title: 'Prototype', description: 'Build playable prototype to validate core mechanics and fun factor.' },
          { step: 3, title: 'Production', description: 'Full development with iterative playtesting and polish.' },
          { step: 4, title: 'Polish & Optimization', description: 'Performance optimization, bug fixing, and final polish.' },
          { step: 5, title: 'Launch & Live Ops', description: 'Store submission, marketing support, and post-launch updates.' },
        ],
        technologies: [
          { name: 'Unity', icon: '🎮' },
          { name: 'C#', icon: '💻' },
          { name: 'Photon', icon: '🌐' },
          { name: 'PlayFab', icon: '☁️' },
          { name: 'Firebase', icon: '🔥' },
          { name: 'Addressables', icon: '📦' },
        ],
        faq: [
          { question: 'Unity vs Unreal—which should we use?', answer: 'Unity for mobile, 2D, indie games, and VR. Unreal for AAA-quality 3D, photorealistic graphics. Unity has gentler learning curve and broader platform support.' },
          { question: 'How long does game development take?', answer: 'Simple mobile games: 2-4 months. Medium complexity: 6-12 months. Large games: 1-3 years. We can build MVPs quickly to validate concepts.' },
          { question: 'Can you help with game monetization?', answer: 'Yes, we implement IAPs, ads, subscriptions, and design monetization that enhances rather than harms player experience.' },
          { question: 'Do you do art and design?', answer: 'We have partner artists and can coordinate full art production, or work with your existing art team.' },
        ],
        animation: {
          heroVisual: 'puzzle-pieces',
          bgPattern: 'hexagons',
          decorations: 'triangles',
          motion: 'morph',
          featureStyle: 'gradient-border',
          processLayout: 'zigzag',
          particleCount: 30,
          glowIntensity: 'strong',
          colorScheme: 'accent',
          animationSpeed: 'normal',
        },
      },
      status: 'published',
      featured: false,
      order: 105,
      parentSlug: 'mobile-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Unreal Engine Development',
      slug: 'unreal-engine-development',
      description: 'Build AAA-quality games and experiences with Unreal Engine 5.',
      shortDescription: 'Create photorealistic games and real-time 3D experiences with Unreal Engine.',
      fullDescription: 'Unreal Engine 5 pushes the boundaries of real-time 3D with Nanite and Lumen technology. We develop AAA-quality games, architectural visualizations, virtual production for film, and enterprise simulations. Our Unreal developers master Blueprint visual scripting and C++ to create stunning experiences with movie-quality graphics.',
      icon: '🔷',
      color: '#0E1128',
      features: [
        'AAA Game Development',
        'Architectural Visualization',
        'Virtual Production',
        'Real-Time Ray Tracing',
        'Nanite & Lumen Integration',
        'MetaHuman Characters',
        'Multiplayer with Lyra',
        'Enterprise Simulations',
      ],
      benefits: [
        'Photorealistic graphics out of the box',
        'Cutting-edge rendering technology',
        'Blueprint visual scripting for rapid dev',
        'Industry-standard for AAA games',
        'Growing adoption in film/TV production',
        'Free until $1M revenue',
      ],
      content: {
        process: [
          { step: 1, title: 'Pre-Production', description: 'Define vision, art direction, and technical specifications for Unreal project.' },
          { step: 2, title: 'Prototyping', description: 'Block out levels, test mechanics, and validate performance targets.' },
          { step: 3, title: 'Production', description: 'Full asset production, level design, and systems implementation.' },
          { step: 4, title: 'Optimization', description: 'Performance profiling, LOD setup, and platform-specific optimization.' },
          { step: 5, title: 'Release', description: 'Platform certification, launch, and ongoing support.' },
        ],
        technologies: [
          { name: 'Unreal Engine 5', icon: '🔷' },
          { name: 'C++', icon: '⚡' },
          { name: 'Blueprints', icon: '📘' },
          { name: 'Quixel', icon: '🎨' },
          { name: 'Niagara', icon: '✨' },
          { name: 'MetaHumans', icon: '👤' },
        ],
        faq: [
          { question: 'Is Unreal harder to learn than Unity?', answer: 'Unreal has steeper learning curve but Blueprint visual scripting makes it accessible. For C++ developers, transition is smooth.' },
          { question: 'What are Nanite and Lumen?', answer: 'Nanite handles millions of polygons efficiently. Lumen provides real-time global illumination. Together they enable movie-quality graphics in real-time.' },
          { question: 'Can Unreal be used for non-game applications?', answer: 'Absolutely. Architecture, automotive, film virtual production, training simulations, and digital twins are major Unreal use cases.' },
          { question: 'What platforms can we target?', answer: 'PC, PlayStation, Xbox, Switch, mobile, VR headsets, and more. Epic provides first-party support for major platforms.' },
        ],
        animation: {
          heroVisual: 'rocket-launch',
          bgPattern: 'grid',
          decorations: 'squares',
          motion: 'cascade',
          featureStyle: 'icon-top',
          processLayout: 'timeline',
          particleCount: 40,
          glowIntensity: 'strong',
          colorScheme: 'gradient',
          animationSpeed: 'fast',
        },
      },
      status: 'published',
      featured: false,
      order: 106,
      parentSlug: 'mobile-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'AR Development',
      slug: 'ar-development',
      description: 'Build augmented reality experiences that blend digital with physical.',
      shortDescription: 'Create AR apps for mobile, smart glasses, and enterprise use cases.',
      fullDescription: 'Augmented Reality overlays digital content onto the real world, creating new possibilities for retail, education, manufacturing, and entertainment. We develop AR experiences using ARKit, ARCore, and enterprise AR platforms. From try-before-you-buy retail apps to industrial maintenance guides, we bring AR from concept to production.',
      icon: '👓',
      color: '#8B5CF6',
      features: [
        'ARKit & ARCore Development',
        'WebAR Experiences',
        'AR Product Visualization',
        'Location-Based AR',
        'Image & Object Recognition',
        'Face Filters & Effects',
        'Enterprise AR Solutions',
        'AR Cloud & Persistence',
      ],
      benefits: [
        'Enhanced customer engagement',
        'Reduced product returns with visualization',
        'Improved training and maintenance efficiency',
        'Memorable brand experiences',
        'Competitive differentiation',
        'Works on existing smartphones',
      ],
      content: {
        process: [
          { step: 1, title: 'Use Case Discovery', description: 'Identify AR opportunities, define success metrics, and design experiences.' },
          { step: 2, title: '3D Asset Preparation', description: 'Create or optimize 3D models for AR rendering.' },
          { step: 3, title: 'AR Development', description: 'Build AR application with tracking, interaction, and rendering.' },
          { step: 4, title: 'Testing', description: 'Test on target devices, optimize performance, and refine experience.' },
          { step: 5, title: 'Deployment', description: 'Launch to app stores or deploy enterprise solution.' },
        ],
        technologies: [
          { name: 'ARKit', icon: '📱' },
          { name: 'ARCore', icon: '🤖' },
          { name: '8th Wall', icon: '🌐' },
          { name: 'Unity AR', icon: '🎮' },
          { name: 'Vuforia', icon: '👁️' },
          { name: 'Spark AR', icon: '✨' },
        ],
        faq: [
          { question: 'AR vs VR—what\'s the difference?', answer: 'AR overlays digital on reality (phone, glasses). VR replaces reality (headset). AR is more accessible—works on any smartphone.' },
          { question: 'Do we need an app for AR?', answer: 'Not always. WebAR works in browsers without app download. For richer features, native AR apps provide better performance.' },
          { question: 'What devices support AR?', answer: 'Most smartphones from 2017+ support AR. Enterprise options include HoloLens, Magic Leap, and RealWear.' },
          { question: 'How do you handle 3D assets?', answer: 'We can create 3D models, optimize existing CAD files, or use photogrammetry to capture real objects.' },
        ],
        animation: {
          heroVisual: 'layers-stack',
          bgPattern: 'circles',
          decorations: 'mixed',
          motion: 'float',
          featureStyle: 'bordered',
          processLayout: 'cards',
          particleCount: 25,
          glowIntensity: 'medium',
          colorScheme: 'accent',
          animationSpeed: 'slow',
        },
      },
      status: 'published',
      featured: true,
      order: 107,
      parentSlug: 'mobile-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'VR Development',
      slug: 'vr-development',
      description: 'Create immersive virtual reality experiences for training, entertainment, and enterprise.',
      shortDescription: 'Build VR applications for Meta Quest, PSVR, and enterprise headsets.',
      fullDescription: 'Virtual Reality creates fully immersive experiences that transport users to new worlds. We develop VR applications for Meta Quest, PCVR, PSVR, and enterprise headsets. From VR games and entertainment to corporate training, virtual showrooms, and therapeutic applications, we create experiences that leverage the unique capabilities of VR.',
      icon: '🥽',
      color: '#7C3AED',
      features: [
        'Meta Quest Development',
        'PCVR (SteamVR/Oculus)',
        'Enterprise VR Training',
        'VR Collaboration Spaces',
        'Hand & Eye Tracking',
        'VR Physics & Interaction',
        'Social VR Features',
        'VR Analytics & Heatmaps',
      ],
      benefits: [
        'Fully immersive experiences',
        'Safe training environment for dangerous tasks',
        'Memorable product demonstrations',
        'Remote collaboration in shared spaces',
        'Therapy and wellness applications',
        'Growing consumer VR market',
      ],
      content: {
        process: [
          { step: 1, title: 'VR Experience Design', description: 'Design for VR comfort, interaction, and immersion. Define hardware targets.' },
          { step: 2, title: 'Environment & Asset Creation', description: 'Build 3D environments and optimize for VR performance.' },
          { step: 3, title: 'Interaction Development', description: 'Implement VR controls, physics, and user interaction systems.' },
          { step: 4, title: 'Comfort & Testing', description: 'Test for motion sickness, comfort, and usability across users.' },
          { step: 5, title: 'Deployment', description: 'Deploy to VR stores or enterprise MDM systems.' },
        ],
        technologies: [
          { name: 'Meta Quest SDK', icon: '🥽' },
          { name: 'SteamVR', icon: '💨' },
          { name: 'Unity XR', icon: '🎮' },
          { name: 'Unreal VR', icon: '🔷' },
          { name: 'OpenXR', icon: '🔓' },
          { name: 'WebXR', icon: '🌐' },
        ],
        faq: [
          { question: 'Which VR headset should we target?', answer: 'Meta Quest 3 for standalone/consumer. PCVR for highest fidelity. Enterprise headsets (Varjo, Vive Focus) for professional use.' },
          { question: 'How do you handle motion sickness?', answer: 'We follow VR comfort best practices: stable horizons, teleportation options, vignettes during movement, and extensive user testing.' },
          { question: 'Can VR work for remote teams?', answer: 'Yes, VR collaboration spaces enable remote presence for meetings, training, and creative work. We build custom virtual workspaces.' },
          { question: 'What\'s the ROI of VR training?', answer: 'Studies show 4x faster training, 275% confidence improvement, and 40% cost reduction vs traditional training for suitable use cases.' },
        ],
        animation: {
          heroVisual: 'globe',
          bgPattern: 'hexagons',
          decorations: 'circles',
          motion: 'orbit',
          featureStyle: 'gradient-border',
          processLayout: 'steps-horizontal',
          particleCount: 35,
          glowIntensity: 'strong',
          colorScheme: 'primary',
          animationSpeed: 'normal',
        },
      },
      status: 'published',
      featured: true,
      order: 108,
      parentSlug: 'mobile-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Smart Contract Development',
      slug: 'smart-contract-development',
      description: 'Build secure, audited smart contracts on Ethereum, Solana, and other blockchains.',
      shortDescription: 'Develop and audit smart contracts for DeFi, NFTs, DAOs, and custom blockchain applications.',
      fullDescription: 'Smart contracts are the backbone of decentralized applications. We develop secure, gas-optimized smart contracts for Ethereum, Polygon, Solana, and other chains. From DeFi protocols and NFT marketplaces to DAOs and custom blockchain logic, our contracts are thoroughly tested and audited to protect your assets and users.',
      icon: '📜',
      color: '#627EEA',
      features: [
        'ERC-20 & ERC-721 Tokens',
        'DeFi Protocol Development',
        'DAO & Governance Contracts',
        'Cross-Chain Bridges',
        'Gas Optimization',
        'Security Auditing',
        'Upgrade Patterns (Proxy)',
        'Multi-Signature Wallets',
      ],
      benefits: [
        'Trustless, automated execution',
        'Transparent, verifiable logic',
        'Reduced intermediary costs',
        'Immutable once deployed',
        'Composability with DeFi ecosystem',
        'Global accessibility 24/7',
      ],
      content: {
        process: [
          { step: 1, title: 'Requirements & Design', description: 'Define contract logic, tokenomics, and security requirements.' },
          { step: 2, title: 'Development', description: 'Write smart contracts following best practices and security patterns.' },
          { step: 3, title: 'Testing', description: 'Comprehensive unit, integration, and fuzzing tests.' },
          { step: 4, title: 'Audit', description: 'Internal security review and optional third-party audit.' },
          { step: 5, title: 'Deployment & Monitoring', description: 'Deploy to mainnet with monitoring and incident response plan.' },
        ],
        technologies: [
          { name: 'Solidity', icon: '💎' },
          { name: 'Rust (Solana)', icon: '🦀' },
          { name: 'Hardhat', icon: '⚒️' },
          { name: 'Foundry', icon: '🔨' },
          { name: 'OpenZeppelin', icon: '🛡️' },
          { name: 'Chainlink', icon: '🔗' },
        ],
        faq: [
          { question: 'How do you ensure contract security?', answer: 'We follow OpenZeppelin patterns, use static analysis tools (Slither, Mythril), comprehensive testing, and recommend third-party audits for high-value contracts.' },
          { question: 'Which blockchain should we use?', answer: 'Ethereum for DeFi/NFT ecosystem. Polygon for low fees. Solana for high throughput. We help choose based on your requirements.' },
          { question: 'Can contracts be upgraded?', answer: 'Using proxy patterns, yes. We implement upgradeable contracts when needed while maintaining security.' },
          { question: 'What about gas costs?', answer: 'We optimize for gas efficiency and can help choose L2 solutions (Arbitrum, Optimism) to reduce costs.' },
        ],
        animation: {
          heroVisual: 'circuit-board',
          bgPattern: 'grid',
          decorations: 'lines',
          motion: 'pulse',
          featureStyle: 'numbered',
          processLayout: 'timeline',
          particleCount: 20,
          glowIntensity: 'medium',
          colorScheme: 'secondary',
          animationSpeed: 'slow',
        },
      },
      status: 'published',
      featured: false,
      order: 109,
      parentSlug: 'blockchain-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'NFT Marketplace Development',
      slug: 'nft-marketplace-development',
      description: 'Build custom NFT marketplaces for art, collectibles, gaming, and real-world assets.',
      shortDescription: 'Create white-label NFT marketplaces with minting, trading, and auction features.',
      fullDescription: 'NFT marketplaces enable creators and collectors to trade digital assets. We build custom NFT platforms tailored to your niche—art, music, gaming items, real estate, or any tokenized asset. Our marketplaces include minting, auctions, royalties, and wallet integration, built on Ethereum, Polygon, or your preferred chain.',
      icon: '🖼️',
      color: '#EC4899',
      features: [
        'Custom Marketplace UI/UX',
        'Lazy Minting',
        'Auction & Fixed Price Sales',
        'Creator Royalties',
        'Multi-Chain Support',
        'Wallet Integration',
        'Collection Management',
        'Admin Dashboard',
      ],
      benefits: [
        'Own your marketplace and fees',
        'Custom branding and features',
        'Built-in creator royalties',
        'Lower fees than major platforms',
        'Community-specific features',
        'Full control over curation',
      ],
      content: {
        process: [
          { step: 1, title: 'Platform Strategy', description: 'Define target market, features, blockchain, and monetization.' },
          { step: 2, title: 'Smart Contracts', description: 'Develop and audit marketplace smart contracts.' },
          { step: 3, title: 'Frontend Development', description: 'Build beautiful, responsive marketplace interface.' },
          { step: 4, title: 'Integration', description: 'Wallet connection, IPFS storage, and indexing services.' },
          { step: 5, title: 'Launch', description: 'Deploy, onboard creators, and marketing support.' },
        ],
        technologies: [
          { name: 'Ethereum/Polygon', icon: '💎' },
          { name: 'IPFS/Arweave', icon: '📁' },
          { name: 'The Graph', icon: '📊' },
          { name: 'WalletConnect', icon: '👛' },
          { name: 'Next.js', icon: '⚡' },
          { name: 'Alchemy', icon: '🧪' },
        ],
        faq: [
          { question: 'Why build a custom marketplace vs using OpenSea?', answer: 'Custom marketplace = own fees, branding, features, curation. OpenSea for maximum exposure. Many creators do both.' },
          { question: 'How do royalties work?', answer: 'We implement on-chain royalties (EIP-2981) so creators earn on secondary sales. Royalty enforcement varies by marketplace.' },
          { question: 'What about gas fees for users?', answer: 'We can use Polygon or other L2s for low fees. Lazy minting shifts minting costs to buyers.' },
          { question: 'Can you integrate with existing systems?', answer: 'Yes, we can connect your marketplace to existing user accounts, payment systems, and content management.' },
        ],
        animation: {
          heroVisual: 'palette-canvas',
          bgPattern: 'dots',
          decorations: 'squares',
          motion: 'morph',
          featureStyle: 'icon-left',
          processLayout: 'cards',
          particleCount: 28,
          glowIntensity: 'strong',
          colorScheme: 'accent',
          animationSpeed: 'normal',
        },
      },
      status: 'published',
      featured: false,
      order: 110,
      parentSlug: 'blockchain-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Cybersecurity Auditing',
      slug: 'cybersecurity-auditing',
      description: 'Comprehensive security assessments to identify and remediate vulnerabilities.',
      shortDescription: 'Identify security vulnerabilities before attackers do with thorough security audits.',
      fullDescription: 'Cybersecurity audits reveal vulnerabilities before they become breaches. We conduct comprehensive security assessments covering application security, infrastructure, cloud configurations, and compliance. Our audits include vulnerability scanning, code review, configuration analysis, and actionable remediation guidance prioritized by risk.',
      icon: '🔒',
      color: '#DC2626',
      features: [
        'Application Security Audit',
        'Infrastructure Assessment',
        'Cloud Security Review',
        'Code Security Review',
        'Compliance Gap Analysis',
        'Social Engineering Assessment',
        'Third-Party Risk Assessment',
        'Executive Risk Report',
      ],
      benefits: [
        'Identify vulnerabilities proactively',
        'Prioritized remediation roadmap',
        'Compliance documentation',
        'Reduced breach risk',
        'Security posture baseline',
        'Stakeholder confidence',
      ],
      content: {
        process: [
          { step: 1, title: 'Scoping', description: 'Define audit scope, systems, compliance frameworks, and timeline.' },
          { step: 2, title: 'Discovery', description: 'Gather information, map attack surface, and identify assets.' },
          { step: 3, title: 'Assessment', description: 'Conduct vulnerability scanning, manual testing, and code review.' },
          { step: 4, title: 'Analysis', description: 'Analyze findings, assess risk, and prioritize remediation.' },
          { step: 5, title: 'Reporting', description: 'Deliver detailed report with findings and remediation guidance.' },
        ],
        technologies: [
          { name: 'Burp Suite', icon: '🕷️' },
          { name: 'Nessus', icon: '🔍' },
          { name: 'OWASP ZAP', icon: '⚡' },
          { name: 'Semgrep', icon: '📝' },
          { name: 'ScoutSuite', icon: '☁️' },
          { name: 'Trivy', icon: '🐳' },
        ],
        faq: [
          { question: 'How often should we conduct security audits?', answer: 'Annually at minimum. Also after major changes, before launches, and as required by compliance frameworks.' },
          { question: 'What\'s the difference between audit and pentest?', answer: 'Audits are comprehensive reviews. Pentests are simulated attacks. Audits cover more ground, pentests go deeper on attack paths.' },
          { question: 'Do you provide remediation?', answer: 'We provide detailed remediation guidance. For implementation, we can either support your team or handle remediation directly.' },
          { question: 'What compliance frameworks do you cover?', answer: 'SOC 2, HIPAA, PCI-DSS, GDPR, ISO 27001, and others. We map findings to specific compliance requirements.' },
        ],
        animation: {
          heroVisual: 'shield-lock',
          bgPattern: 'diagonal-lines',
          decorations: 'hexagons',
          motion: 'pulse',
          featureStyle: 'icon-top',
          processLayout: 'timeline',
          particleCount: 15,
          glowIntensity: 'subtle',
          colorScheme: 'secondary',
          animationSpeed: 'slow',
        },
      },
      status: 'published',
      featured: false,
      order: 111,
      parentSlug: 'cybersecurity',
      category: 'infrastructure',
      isParent: false,
    },
    {
      name: 'Penetration Testing',
      slug: 'penetration-testing',
      description: 'Simulate real-world attacks to test your defenses and security controls.',
      shortDescription: 'Ethical hacking to find vulnerabilities attackers would exploit, before they do.',
      fullDescription: 'Penetration testing simulates real-world attacks on your systems. Our certified ethical hackers attempt to breach your defenses using the same techniques as malicious actors. We test web applications, APIs, networks, cloud infrastructure, and employee awareness. You get proof of exploitability and concrete steps to fix vulnerabilities.',
      icon: '🎯',
      color: '#991B1B',
      features: [
        'Web Application Pentesting',
        'API Security Testing',
        'Network Penetration Testing',
        'Cloud Infrastructure Testing',
        'Mobile App Pentesting',
        'Red Team Exercises',
        'Phishing Simulations',
        'Physical Security Testing',
      ],
      benefits: [
        'Proof of exploitability',
        'Real-world attack simulation',
        'Validate security controls',
        'Compliance requirement fulfillment',
        'Security awareness improvement',
        'Incident response preparation',
      ],
      content: {
        process: [
          { step: 1, title: 'Rules of Engagement', description: 'Define scope, targets, allowed techniques, and communication protocols.' },
          { step: 2, title: 'Reconnaissance', description: 'Gather intelligence about targets using OSINT and scanning.' },
          { step: 3, title: 'Exploitation', description: 'Attempt to exploit discovered vulnerabilities to demonstrate impact.' },
          { step: 4, title: 'Post-Exploitation', description: 'Assess what an attacker could access after initial compromise.' },
          { step: 5, title: 'Reporting', description: 'Deliver findings with attack chains, evidence, and remediation priorities.' },
        ],
        technologies: [
          { name: 'Metasploit', icon: '💀' },
          { name: 'Cobalt Strike', icon: '🎯' },
          { name: 'Kali Linux', icon: '🐉' },
          { name: 'Burp Suite', icon: '🕷️' },
          { name: 'BloodHound', icon: '🐕' },
          { name: 'Nuclei', icon: '⚛️' },
        ],
        faq: [
          { question: 'Will pentesting disrupt our operations?', answer: 'We coordinate timing and can exclude sensitive systems. Most testing is non-destructive. Denial-of-service tests require explicit approval.' },
          { question: 'Black box, gray box, or white box?', answer: 'Black box simulates external attacker. White box with full access finds more issues. We recommend gray box—realistic but efficient.' },
          { question: 'How do we prepare?', answer: 'Provide scope information, test credentials if gray/white box, and notify relevant teams. We handle the rest.' },
          { question: 'What certifications do your testers have?', answer: 'OSCP, OSWE, OSCE, GPEN, CEH, and other industry-recognized certifications.' },
        ],
        animation: {
          heroVisual: 'target-bullseye',
          bgPattern: 'grid',
          decorations: 'triangles',
          motion: 'cascade',
          featureStyle: 'numbered',
          processLayout: 'steps-horizontal',
          particleCount: 22,
          glowIntensity: 'medium',
          colorScheme: 'primary',
          animationSpeed: 'fast',
        },
      },
      status: 'published',
      featured: false,
      order: 112,
      parentSlug: 'cybersecurity',
      category: 'infrastructure',
      isParent: false,
    },
    {
      name: 'GraphQL API Development',
      slug: 'graphql-api-development',
      description: 'Build flexible, efficient APIs with GraphQL for modern applications.',
      shortDescription: 'Design and implement GraphQL APIs that give clients exactly the data they need.',
      fullDescription: 'GraphQL gives clients the power to ask for exactly what they need. We design and build GraphQL APIs that reduce over-fetching, improve performance, and simplify frontend development. From greenfield APIs to migrating from REST, we implement GraphQL with proper schema design, security, caching, and real-time subscriptions.',
      icon: '⬡',
      color: '#E535AB',
      features: [
        'Schema Design',
        'Resolver Implementation',
        'Authentication & Authorization',
        'Real-Time Subscriptions',
        'DataLoader & N+1 Prevention',
        'Federation & Stitching',
        'Caching Strategies',
        'REST to GraphQL Migration',
      ],
      benefits: [
        'Clients get exactly needed data',
        'Single endpoint simplicity',
        'Strong typing and introspection',
        'Reduced API versions',
        'Faster frontend development',
        'Built-in documentation',
      ],
      content: {
        process: [
          { step: 1, title: 'Schema Design', description: 'Design GraphQL schema based on domain model and client needs.' },
          { step: 2, title: 'Implementation', description: 'Build resolvers, connect data sources, and implement business logic.' },
          { step: 3, title: 'Security', description: 'Implement auth, rate limiting, query complexity limits, and depth limiting.' },
          { step: 4, title: 'Optimization', description: 'Add caching, DataLoader, and performance monitoring.' },
          { step: 5, title: 'Documentation', description: 'Generate docs, create examples, and train your team.' },
        ],
        technologies: [
          { name: 'Apollo Server', icon: '🚀' },
          { name: 'GraphQL Yoga', icon: '🧘' },
          { name: 'Hasura', icon: '⚡' },
          { name: 'Prisma', icon: '💎' },
          { name: 'TypeGraphQL', icon: '📘' },
          { name: 'GraphQL Codegen', icon: '⚙️' },
        ],
        faq: [
          { question: 'GraphQL vs REST—when to use which?', answer: 'GraphQL for complex data requirements, mobile apps, or multiple clients. REST for simple CRUD, caching-heavy scenarios, or when team prefers REST.' },
          { question: 'How do you handle GraphQL security?', answer: 'Query depth limiting, complexity analysis, rate limiting, persisted queries, and proper authentication/authorization at resolver level.' },
          { question: 'What about caching?', answer: 'Apollo Client caching, CDN caching with persisted queries, Redis for resolver-level caching, and DataLoader for request-level batching.' },
          { question: 'Can we migrate gradually from REST?', answer: 'Yes, we can wrap existing REST endpoints in GraphQL or use schema stitching to combine GraphQL and REST.' },
        ],
        animation: {
          heroVisual: 'network-nodes',
          bgPattern: 'hexagons',
          decorations: 'dots',
          motion: 'wave',
          featureStyle: 'minimal',
          processLayout: 'zigzag',
          particleCount: 30,
          glowIntensity: 'medium',
          colorScheme: 'accent',
          animationSpeed: 'normal',
        },
      },
      status: 'published',
      featured: false,
      order: 113,
      parentSlug: 'api-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Microservices Architecture',
      slug: 'microservices-architecture',
      description: 'Design and build scalable microservices that evolve independently.',
      shortDescription: 'Break monoliths into independently deployable services for scale and agility.',
      fullDescription: 'Microservices enable teams to build, deploy, and scale services independently. We help you design microservices architectures that match your organization and requirements. From domain-driven design to service communication patterns, container orchestration, and observability, we guide the transition from monolith to microservices or build greenfield distributed systems.',
      icon: '🔲',
      color: '#0EA5E9',
      features: [
        'Domain-Driven Design',
        'Service Decomposition',
        'API Gateway Design',
        'Event-Driven Architecture',
        'Service Mesh Implementation',
        'Distributed Tracing',
        'Circuit Breakers & Resilience',
        'Monolith Strangler Pattern',
      ],
      benefits: [
        'Independent scaling per service',
        'Technology flexibility per service',
        'Faster deployment cycles',
        'Team autonomy',
        'Fault isolation',
        'Easier maintenance',
      ],
      content: {
        process: [
          { step: 1, title: 'Domain Analysis', description: 'Identify bounded contexts and service boundaries using DDD.' },
          { step: 2, title: 'Architecture Design', description: 'Design service communication, data management, and infrastructure.' },
          { step: 3, title: 'Implementation', description: 'Build services with proper patterns and infrastructure.' },
          { step: 4, title: 'Observability', description: 'Implement logging, tracing, metrics, and alerting.' },
          { step: 5, title: 'Migration', description: 'Gradually migrate from monolith using strangler pattern.' },
        ],
        technologies: [
          { name: 'Kubernetes', icon: '☸️' },
          { name: 'gRPC', icon: '📡' },
          { name: 'Kafka', icon: '📮' },
          { name: 'Istio', icon: '🕸️' },
          { name: 'Jaeger', icon: '🔍' },
          { name: 'Consul', icon: '🏛️' },
        ],
        faq: [
          { question: 'When should we avoid microservices?', answer: 'Small teams, simple domains, early-stage startups. Microservices add complexity that may not be justified. Start monolithic, extract services when needed.' },
          { question: 'How do you handle data consistency?', answer: 'Saga pattern for distributed transactions, event sourcing for audit trails, eventual consistency with compensation. ACID within service boundaries.' },
          { question: 'Sync vs async communication?', answer: 'Async (events) for decoupling and resilience. Sync (REST/gRPC) for immediate responses. Most systems use both appropriately.' },
          { question: 'How do we test microservices?', answer: 'Unit tests per service, contract testing between services, integration tests with containers, end-to-end tests for critical flows.' },
        ],
        animation: {
          heroVisual: 'workflow-diagram',
          bgPattern: 'grid',
          decorations: 'squares',
          motion: 'cascade',
          featureStyle: 'icon-top',
          processLayout: 'timeline',
          particleCount: 25,
          glowIntensity: 'subtle',
          colorScheme: 'primary',
          animationSpeed: 'slow',
        },
      },
      status: 'published',
      featured: false,
      order: 114,
      parentSlug: 'api-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Real-Time Applications',
      slug: 'real-time-applications',
      description: 'Build applications with instant updates using WebSockets and real-time infrastructure.',
      shortDescription: 'Create live dashboards, collaborative tools, and instant messaging with real-time tech.',
      fullDescription: 'Real-time applications deliver instant updates without page refresh. We build collaborative tools, live dashboards, chat applications, multiplayer games, and live streaming features using WebSockets, Server-Sent Events, and real-time databases. From architecture to scaling, we create responsive experiences that keep users engaged.',
      icon: '⚡',
      color: '#F59E0B',
      features: [
        'WebSocket Implementation',
        'Server-Sent Events',
        'Real-Time Databases',
        'Collaborative Editing',
        'Presence & Typing Indicators',
        'Live Notifications',
        'Real-Time Analytics Dashboards',
        'Horizontal Scaling',
      ],
      benefits: [
        'Instant user feedback',
        'Enhanced collaboration',
        'Reduced server polling',
        'Engaging user experience',
        'Live data visualization',
        'Competitive differentiation',
      ],
      content: {
        process: [
          { step: 1, title: 'Requirements', description: 'Define real-time features, latency requirements, and scale expectations.' },
          { step: 2, title: 'Architecture', description: 'Design real-time architecture with proper scaling patterns.' },
          { step: 3, title: 'Implementation', description: 'Build real-time features with WebSocket or SSE infrastructure.' },
          { step: 4, title: 'Scaling', description: 'Implement horizontal scaling with Redis pub/sub or similar.' },
          { step: 5, title: 'Monitoring', description: 'Set up real-time monitoring, alerts, and connection management.' },
        ],
        technologies: [
          { name: 'Socket.io', icon: '🔌' },
          { name: 'Pusher', icon: '📤' },
          { name: 'Firebase Realtime', icon: '🔥' },
          { name: 'Redis Pub/Sub', icon: '📬' },
          { name: 'Ably', icon: '🌐' },
          { name: 'Liveblocks', icon: '🧱' },
        ],
        faq: [
          { question: 'WebSockets vs Server-Sent Events?', answer: 'WebSockets for bidirectional (chat, games). SSE for server-to-client only (notifications, feeds). SSE simpler, better fallback.' },
          { question: 'How do you scale WebSockets?', answer: 'Redis pub/sub for message distribution across servers. Sticky sessions or connection state management. Managed services (Pusher, Ably) handle this.' },
          { question: 'What about mobile apps?', answer: 'Same technologies work. For offline support, we add local-first architecture with sync when reconnected.' },
          { question: 'How do you handle disconnections?', answer: 'Automatic reconnection, message queuing, offline support, and graceful degradation to polling if needed.' },
        ],
        animation: {
          heroVisual: 'data-flow',
          bgPattern: 'waves',
          decorations: 'lines',
          motion: 'float',
          featureStyle: 'bordered',
          processLayout: 'steps-horizontal',
          particleCount: 35,
          glowIntensity: 'strong',
          colorScheme: 'gradient',
          animationSpeed: 'fast',
        },
      },
      status: 'published',
      featured: false,
      order: 115,
      parentSlug: 'web-development',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Payment Gateway Integration',
      slug: 'payment-gateway-integration',
      description: 'Integrate secure payment processing with Stripe, PayPal, and regional providers.',
      shortDescription: 'Accept payments globally with secure, PCI-compliant payment integrations.',
      fullDescription: 'Payment integration is critical for e-commerce and SaaS businesses. We integrate payment gateways including Stripe, PayPal, Braintree, and regional providers with proper security, PCI compliance, and fraud prevention. From simple checkout to complex subscription billing, marketplace payouts, and multi-currency support, we handle the payment complexity.',
      icon: '💳',
      color: '#6366F1',
      features: [
        'Stripe Integration',
        'PayPal & Braintree',
        'Subscription Billing',
        'Marketplace Payouts',
        'Multi-Currency Support',
        'Fraud Prevention',
        'PCI Compliance',
        'Invoice & Receipt Generation',
      ],
      benefits: [
        'Accept payments globally',
        'Reduce cart abandonment',
        'Automated recurring billing',
        'Fraud protection',
        'Multiple payment methods',
        'Compliance handled',
      ],
      content: {
        process: [
          { step: 1, title: 'Requirements', description: 'Understand payment needs, regions, currencies, and business model.' },
          { step: 2, title: 'Gateway Selection', description: 'Recommend optimal payment providers for your use case.' },
          { step: 3, title: 'Integration', description: 'Implement secure payment flows with proper error handling.' },
          { step: 4, title: 'Testing', description: 'Thorough testing with test cards, edge cases, and sandbox environments.' },
          { step: 5, title: 'Go Live', description: 'Production deployment with monitoring and fraud rules.' },
        ],
        technologies: [
          { name: 'Stripe', icon: '💜' },
          { name: 'PayPal', icon: '🅿️' },
          { name: 'Braintree', icon: '🌳' },
          { name: 'Square', icon: '⬜' },
          { name: 'Adyen', icon: '🔵' },
          { name: 'Plaid', icon: '🏦' },
        ],
        faq: [
          { question: 'Which payment gateway should we use?', answer: 'Stripe for developer experience and global coverage. PayPal for consumer trust. Regional providers for specific markets. Often multiple for best coverage.' },
          { question: 'How do you handle PCI compliance?', answer: 'We use tokenization and hosted payment fields so card data never touches your servers. This simplifies PCI compliance to SAQ A.' },
          { question: 'Can you handle marketplace payments?', answer: 'Yes, Stripe Connect or PayPal Commerce Platform for splitting payments, managing seller payouts, and handling tax compliance.' },
          { question: 'What about subscriptions?', answer: 'Full subscription billing with trials, upgrades, downgrades, proration, dunning, and subscription analytics.' },
        ],
        animation: {
          heroVisual: 'shopping-cart-3d',
          bgPattern: 'dots',
          decorations: 'circles',
          motion: 'pulse',
          featureStyle: 'icon-left',
          processLayout: 'cards',
          particleCount: 18,
          glowIntensity: 'medium',
          colorScheme: 'accent',
          animationSpeed: 'normal',
        },
      },
      status: 'published',
      featured: false,
      order: 116,
      parentSlug: 'ecommerce-solutions',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'CRM Development',
      slug: 'crm-development',
      description: 'Build custom CRM systems tailored to your sales and customer success processes.',
      shortDescription: 'Create CRM solutions that fit your unique sales pipeline and customer management needs.',
      fullDescription: 'Off-the-shelf CRMs rarely fit perfectly. We build custom CRM systems tailored to your exact sales process, customer segments, and workflows. From lead management and opportunity tracking to customer success automation and reporting, our CRMs integrate with your existing tools and scale with your business.',
      icon: '👥',
      color: '#10B981',
      features: [
        'Contact & Lead Management',
        'Sales Pipeline Automation',
        'Email Integration',
        'Task & Activity Tracking',
        'Custom Field & Workflows',
        'Reporting & Analytics',
        'Mobile Access',
        'Third-Party Integrations',
      ],
      benefits: [
        'Fits your exact process',
        'No per-seat licensing fees',
        'Full data ownership',
        'Competitive advantage',
        'Seamless integrations',
        'Scalable architecture',
      ],
      content: {
        process: [
          { step: 1, title: 'Process Mapping', description: 'Document sales process, customer lifecycle, and workflow requirements.' },
          { step: 2, title: 'Design', description: 'Design data model, UI/UX, and automation rules.' },
          { step: 3, title: 'Development', description: 'Build CRM with all features and integrations.' },
          { step: 4, title: 'Data Migration', description: 'Migrate existing data from current systems.' },
          { step: 5, title: 'Training & Launch', description: 'Train team, launch, and provide ongoing support.' },
        ],
        technologies: [
          { name: 'Next.js', icon: '⚡' },
          { name: 'PostgreSQL', icon: '🐘' },
          { name: 'Redis', icon: '📬' },
          { name: 'Twilio', icon: '📞' },
          { name: 'SendGrid', icon: '📧' },
          { name: 'Zapier', icon: '⚡' },
        ],
        faq: [
          { question: 'Why custom CRM over Salesforce/HubSpot?', answer: 'Custom for unique processes, avoiding per-seat costs at scale, full data control, and competitive advantage. COTS for standard processes and quick start.' },
          { question: 'Can you integrate with our existing tools?', answer: 'Yes, email (Gmail, Outlook), calendar, phone systems, marketing automation, and any API-accessible tools.' },
          { question: 'How do you handle data migration?', answer: 'We map data from your current system, clean and transform it, and import with full validation. Historical data preserved.' },
          { question: 'What about mobile access?', answer: 'Responsive web app or native mobile app depending on requirements. Offline support for field sales if needed.' },
        ],
        animation: {
          heroVisual: 'dashboard',
          bgPattern: 'grid',
          decorations: 'squares',
          motion: 'cascade',
          featureStyle: 'gradient-border',
          processLayout: 'timeline',
          particleCount: 20,
          glowIntensity: 'subtle',
          colorScheme: 'secondary',
          animationSpeed: 'slow',
        },
      },
      status: 'published',
      featured: false,
      order: 117,
      parentSlug: 'enterprise-software',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'ERP Development',
      slug: 'erp-development',
      description: 'Build custom ERP systems that unify your business operations.',
      shortDescription: 'Create integrated ERP solutions for inventory, finance, HR, and operations.',
      fullDescription: 'Enterprise Resource Planning systems integrate all business operations. We build custom ERP solutions that unify inventory, finance, HR, manufacturing, and operations into a single platform. Unlike one-size-fits-all ERPs, our custom solutions match your exact processes while providing the integration and visibility you need.',
      icon: '🏢',
      color: '#0891B2',
      features: [
        'Inventory Management',
        'Financial Accounting',
        'HR & Payroll',
        'Supply Chain Management',
        'Manufacturing & Production',
        'Project Management',
        'Business Intelligence',
        'Multi-Location Support',
      ],
      benefits: [
        'Single source of truth',
        'Process automation',
        'Real-time visibility',
        'Reduced manual data entry',
        'Custom workflows',
        'Scalable architecture',
      ],
      content: {
        process: [
          { step: 1, title: 'Business Analysis', description: 'Document all business processes, pain points, and integration requirements.' },
          { step: 2, title: 'System Design', description: 'Design modular architecture, data model, and user experiences.' },
          { step: 3, title: 'Phased Development', description: 'Build in phases starting with core modules.' },
          { step: 4, title: 'Integration', description: 'Connect with existing systems, banks, and third parties.' },
          { step: 5, title: 'Rollout', description: 'Phased deployment with training and change management.' },
        ],
        technologies: [
          { name: 'Next.js', icon: '⚡' },
          { name: 'PostgreSQL', icon: '🐘' },
          { name: 'Redis', icon: '📬' },
          { name: 'Apache Kafka', icon: '📮' },
          { name: 'Elasticsearch', icon: '🔍' },
          { name: 'Docker', icon: '🐳' },
        ],
        faq: [
          { question: 'Why custom ERP vs SAP/Oracle?', answer: 'Custom for perfect process fit, lower TCO at scale, faster changes, and competitive advantage. Enterprise ERP for proven best practices and ecosystem.' },
          { question: 'How long does ERP development take?', answer: 'Minimum viable ERP: 6-12 months. Full suite: 1-2 years. We recommend phased approach starting with highest-value modules.' },
          { question: 'Can you integrate with our accounting software?', answer: 'Yes, we integrate with QuickBooks, Xero, SAP, and others. Or build custom financial module if needed.' },
          { question: 'What about regulatory compliance?', answer: 'We build in audit trails, role-based access, and specific compliance features for your industry (FDA, SOX, etc.).' },
        ],
        animation: {
          heroVisual: 'gear-system',
          bgPattern: 'diagonal-lines',
          decorations: 'hexagons',
          motion: 'spin-slow',
          featureStyle: 'numbered',
          processLayout: 'steps-horizontal',
          particleCount: 22,
          glowIntensity: 'medium',
          colorScheme: 'primary',
          animationSpeed: 'slow',
        },
      },
      status: 'published',
      featured: false,
      order: 118,
      parentSlug: 'enterprise-software',
      category: 'web-software',
      isParent: false,
    },
    {
      name: 'Email Marketing Automation',
      slug: 'email-marketing-automation',
      description: 'Create automated email campaigns that nurture leads and retain customers.',
      shortDescription: 'Build sophisticated email automation flows that convert and retain at scale.',
      fullDescription: 'Email remains the highest ROI marketing channel. We design and implement email marketing automation that nurtures leads, onboards users, and retains customers. From drip campaigns and behavioral triggers to A/B testing and analytics, we create email programs that deliver results using platforms like Klaviyo, Mailchimp, or custom solutions.',
      icon: '📧',
      color: '#EA580C',
      features: [
        'Drip Campaign Design',
        'Behavioral Triggers',
        'Segmentation Strategy',
        'A/B Testing Frameworks',
        'Email Template Design',
        'Deliverability Optimization',
        'Analytics & Reporting',
        'Platform Integration',
      ],
      benefits: [
        'Highest marketing ROI',
        'Scalable personalization',
        'Automated nurturing',
        'Measurable results',
        'Customer retention',
        '24/7 engagement',
      ],
      content: {
        process: [
          { step: 1, title: 'Audit & Strategy', description: 'Analyze current email performance and design automation strategy.' },
          { step: 2, title: 'Segmentation', description: 'Define audience segments based on behavior, lifecycle, and attributes.' },
          { step: 3, title: 'Flow Design', description: 'Map out automation flows, triggers, and content.' },
          { step: 4, title: 'Implementation', description: 'Build campaigns, templates, and integrations.' },
          { step: 5, title: 'Optimization', description: 'Launch, test, and continuously optimize based on data.' },
        ],
        technologies: [
          { name: 'Klaviyo', icon: '📫' },
          { name: 'Mailchimp', icon: '🐵' },
          { name: 'SendGrid', icon: '📧' },
          { name: 'Customer.io', icon: '👤' },
          { name: 'Segment', icon: '📊' },
          { name: 'Postmark', icon: '📬' },
        ],
        faq: [
          { question: 'Which email platform should we use?', answer: 'Klaviyo for e-commerce. Mailchimp for SMB simplicity. Customer.io for product-led. Custom for complex requirements or scale.' },
          { question: 'How do you improve deliverability?', answer: 'Proper authentication (SPF, DKIM, DMARC), list hygiene, engagement-based sending, gradual warmup, and content optimization.' },
          { question: 'What flows should every business have?', answer: 'Welcome series, abandoned cart/browse, post-purchase, win-back, and sunset. We customize based on your business model.' },
          { question: 'How do you measure success?', answer: 'Open rates, click rates, conversion rates, revenue per email, list growth, and deliverability metrics. We set up dashboards for visibility.' },
        ],
        animation: {
          heroVisual: 'megaphone-3d',
          bgPattern: 'waves',
          decorations: 'dots',
          motion: 'float',
          featureStyle: 'icon-top',
          processLayout: 'zigzag',
          particleCount: 25,
          glowIntensity: 'medium',
          colorScheme: 'accent',
          animationSpeed: 'normal',
        },
      },
      status: 'published',
      featured: false,
      order: 119,
      parentSlug: 'digital-marketing',
      category: 'marketing',
      isParent: false,
    },
    {
      name: 'IoT Development',
      slug: 'iot-development',
      description: 'Build connected device solutions with IoT platforms and embedded systems.',
      shortDescription: 'Create smart, connected products with IoT sensors, gateways, and cloud platforms.',
      fullDescription: 'The Internet of Things connects physical devices to digital systems. We develop IoT solutions from sensor integration and edge computing to cloud platforms and analytics dashboards. Whether you\'re building smart home products, industrial monitoring, or fleet tracking, we create the full IoT stack.',
      icon: '📡',
      color: '#06B6D4',
      features: ['Sensor Integration', 'Edge Computing', 'IoT Gateway Development', 'Cloud Platform Integration', 'Real-Time Data Processing', 'Device Management', 'OTA Updates', 'IoT Security'],
      benefits: ['Connect physical and digital worlds', 'Real-time monitoring and control', 'Predictive maintenance', 'Data-driven insights', 'Automation opportunities', 'New revenue streams'],
      content: {
        process: [
          { step: 1, title: 'Requirements & Architecture', description: 'Define sensors, connectivity, data flow, and cloud architecture.' },
          { step: 2, title: 'Hardware Selection', description: 'Select or design hardware components, sensors, and communication modules.' },
          { step: 3, title: 'Firmware Development', description: 'Develop embedded software for data collection and transmission.' },
          { step: 4, title: 'Cloud Platform', description: 'Build cloud infrastructure for data ingestion, storage, and processing.' },
          { step: 5, title: 'Dashboard & Analytics', description: 'Create visualization and analytics tools for IoT data.' },
        ],
        technologies: [{ name: 'AWS IoT', icon: '☁️' }, { name: 'Azure IoT Hub', icon: '🔷' }, { name: 'MQTT', icon: '📨' }, { name: 'ESP32/Arduino', icon: '🔌' }, { name: 'Raspberry Pi', icon: '🍓' }, { name: 'InfluxDB', icon: '📊' }],
        faq: [
          { question: 'What connectivity options are available?', answer: 'WiFi, Bluetooth, LoRa, Cellular (4G/5G), Zigbee, and more. We choose based on range, power, and data requirements.' },
          { question: 'How do you handle IoT security?', answer: 'Encrypted communications, secure boot, device authentication, and regular security updates.' },
        ],
        animation: { heroVisual: 'satellite', bgPattern: 'circles', decorations: 'dots', motion: 'pulse', featureStyle: 'icon-top', processLayout: 'timeline', particleCount: 30, glowIntensity: 'medium', colorScheme: 'accent', animationSpeed: 'normal' },
      },
      status: 'published', featured: false, order: 120, parentSlug: 'enterprise-software', category: 'web-software', isParent: false,
    },
    {
      name: 'Desktop Application Development',
      slug: 'desktop-application-development',
      description: 'Build powerful native desktop applications for Windows, macOS, and Linux.',
      shortDescription: 'Create cross-platform desktop apps with Electron, Tauri, or native frameworks.',
      fullDescription: 'Desktop applications offer performance and capabilities that web apps can\'t match. We build desktop software using Electron, Tauri, or native frameworks for Windows, macOS, and Linux.',
      icon: '🖥️',
      color: '#6366F1',
      features: ['Cross-Platform Development', 'Native Performance', 'System Integration', 'Offline Functionality', 'Auto-Updates', 'Code Signing & Distribution', 'Hardware Access', 'Custom UI Frameworks'],
      benefits: ['Full system access', 'Offline-first capability', 'Better performance than web', 'Deep OS integration', 'No browser limitations', 'Professional software feel'],
      content: {
        process: [
          { step: 1, title: 'Requirements', description: 'Define features, platforms, and technical requirements.' },
          { step: 2, title: 'Architecture', description: 'Choose framework (Electron, Tauri, native) and design architecture.' },
          { step: 3, title: 'Development', description: 'Build application with native integrations and polished UI.' },
          { step: 4, title: 'Testing', description: 'Test on all target platforms with various configurations.' },
          { step: 5, title: 'Distribution', description: 'Set up auto-updates, code signing, and distribution channels.' },
        ],
        technologies: [{ name: 'Electron', icon: '⚡' }, { name: 'Tauri', icon: '🦀' }, { name: '.NET MAUI', icon: '🟣' }, { name: 'Qt', icon: '🔲' }, { name: 'Swift', icon: '🍎' }, { name: 'Rust', icon: '🦀' }],
        faq: [{ question: 'Electron vs Tauri?', answer: 'Electron for web tech familiarity. Tauri for smaller bundle size and better performance.' }],
        animation: { heroVisual: 'terminal', bgPattern: 'grid', decorations: 'squares', motion: 'type', featureStyle: 'bordered', processLayout: 'steps-horizontal', particleCount: 20, glowIntensity: 'subtle', colorScheme: 'primary', animationSpeed: 'normal' },
      },
      status: 'published', featured: false, order: 121, parentSlug: 'web-development', category: 'web-software', isParent: false,
    },
    {
      name: 'Legacy System Modernization',
      slug: 'legacy-system-modernization',
      description: 'Transform outdated systems into modern, maintainable applications.',
      shortDescription: 'Modernize legacy applications with updated architecture, cloud migration, and new interfaces.',
      fullDescription: 'Legacy systems hold valuable business logic but become increasingly difficult to maintain. We modernize through refactoring, re-platforming, or rebuilding.',
      icon: '🔄',
      color: '#8B5CF6',
      features: ['Application Assessment', 'Incremental Modernization', 'Cloud Migration', 'API Wrapping', 'Database Migration', 'UI Modernization', 'Microservices Extraction', 'Documentation Recovery'],
      benefits: ['Reduced maintenance costs', 'Improved performance', 'Better developer experience', 'Cloud-ready architecture', 'Enhanced security', 'Future-proof technology'],
      content: {
        process: [
          { step: 1, title: 'Assessment', description: 'Analyze existing system and identify modernization approach.' },
          { step: 2, title: 'Strategy', description: 'Define modernization roadmap—refactor, re-platform, or rebuild.' },
          { step: 3, title: 'Incremental Migration', description: 'Modernize in phases using strangler fig pattern.' },
          { step: 4, title: 'Testing', description: 'Ensure feature parity and regression testing throughout.' },
          { step: 5, title: 'Cutover', description: 'Final migration with rollback plan and monitoring.' },
        ],
        technologies: [{ name: 'Docker', icon: '🐳' }, { name: 'Kubernetes', icon: '☸️' }, { name: 'AWS Migration', icon: '☁️' }, { name: 'API Gateway', icon: '🚪' }],
        faq: [{ question: 'Refactor or rewrite?', answer: 'Usually refactor incrementally. Rewrites are risky and rarely justified.' }],
        animation: { heroVisual: 'gear-system', bgPattern: 'diagonal-lines', decorations: 'hexagons', motion: 'morph', featureStyle: 'numbered', processLayout: 'timeline', particleCount: 25, glowIntensity: 'medium', colorScheme: 'secondary', animationSpeed: 'slow' },
      },
      status: 'published', featured: false, order: 122, parentSlug: 'enterprise-software', category: 'web-software', isParent: false,
    },
    {
      name: 'Identity & Access Management',
      slug: 'identity-access-management',
      description: 'Implement secure authentication and authorization for your applications.',
      shortDescription: 'Build robust IAM solutions with SSO, MFA, RBAC, and identity federation.',
      fullDescription: 'Identity and Access Management is the foundation of application security. We implement SSO, MFA, RBAC, and identity federation.',
      icon: '🔐',
      color: '#DC2626',
      features: ['Single Sign-On (SSO)', 'Multi-Factor Authentication', 'Role-Based Access Control', 'Identity Federation', 'OAuth 2.0 / OpenID Connect', 'Directory Integration', 'Privileged Access Management', 'Audit Logging'],
      benefits: ['Enhanced security posture', 'Simplified user experience', 'Centralized access control', 'Compliance support', 'Reduced password fatigue', 'Audit trail for access'],
      content: {
        process: [
          { step: 1, title: 'Requirements', description: 'Assess identity needs and compliance requirements.' },
          { step: 2, title: 'Architecture', description: 'Design IAM architecture with appropriate identity providers.' },
          { step: 3, title: 'Implementation', description: 'Implement authentication flows and authorization rules.' },
          { step: 4, title: 'Migration', description: 'Migrate existing users and credentials securely.' },
          { step: 5, title: 'Monitoring', description: 'Set up security monitoring and audit logging.' },
        ],
        technologies: [{ name: 'Auth0', icon: '🔒' }, { name: 'Okta', icon: '🔵' }, { name: 'Keycloak', icon: '🔑' }, { name: 'Azure AD', icon: '🔷' }, { name: 'AWS Cognito', icon: '☁️' }],
        faq: [{ question: 'Build custom or use identity platform?', answer: 'Identity platforms for most cases—security is hard to get right.' }],
        animation: { heroVisual: 'shield-lock', bgPattern: 'hexagons', decorations: 'circles', motion: 'pulse', featureStyle: 'icon-left', processLayout: 'cards', particleCount: 18, glowIntensity: 'subtle', colorScheme: 'secondary', animationSpeed: 'slow' },
      },
      status: 'published', featured: false, order: 123, parentSlug: 'cybersecurity', category: 'infrastructure', isParent: false,
    },
    {
      name: 'Business Intelligence Solutions',
      slug: 'business-intelligence-solutions',
      description: 'Transform data into actionable insights with BI dashboards and analytics.',
      shortDescription: 'Build BI platforms with interactive dashboards, KPI tracking, and self-service analytics.',
      fullDescription: 'Business Intelligence turns your data into competitive advantage. We build BI solutions that connect data sources and deliver insights through dashboards.',
      icon: '📈',
      color: '#F59E0B',
      features: ['Data Warehouse Design', 'ETL Pipeline Development', 'Dashboard Development', 'KPI Definition & Tracking', 'Self-Service Analytics', 'Embedded Analytics', 'Automated Reporting', 'Data Governance'],
      benefits: ['Data-driven decisions', 'Real-time visibility', 'Identify trends early', 'Democratized data access', 'Reduced reporting effort', 'Competitive insights'],
      content: {
        process: [
          { step: 1, title: 'Discovery', description: 'Understand business questions, KPIs, and data sources.' },
          { step: 2, title: 'Data Architecture', description: 'Design data warehouse and ETL pipelines.' },
          { step: 3, title: 'Dashboard Design', description: 'Design intuitive visualizations.' },
          { step: 4, title: 'Implementation', description: 'Build ETL, data models, and dashboards.' },
          { step: 5, title: 'Training', description: 'Train users on self-service analytics.' },
        ],
        technologies: [{ name: 'Tableau', icon: '📊' }, { name: 'Power BI', icon: '📈' }, { name: 'Looker', icon: '👀' }, { name: 'Snowflake', icon: '❄️' }, { name: 'dbt', icon: '🔧' }],
        faq: [{ question: 'Which BI tool?', answer: 'Tableau for visual analytics. Power BI for Microsoft ecosystem. Looker for data governance.' }],
        animation: { heroVisual: 'chart-graph', bgPattern: 'grid', decorations: 'lines', motion: 'cascade', featureStyle: 'gradient-border', processLayout: 'steps-horizontal', particleCount: 22, glowIntensity: 'medium', colorScheme: 'accent', animationSpeed: 'normal' },
      },
      status: 'published', featured: false, order: 124, parentSlug: 'data-analytics', category: 'ai-ml', isParent: false,
    },
    {
      name: 'MLOps & Model Deployment',
      slug: 'mlops-model-deployment',
      description: 'Operationalize machine learning with robust MLOps pipelines.',
      shortDescription: 'Deploy and manage ML models in production with monitoring and automation.',
      fullDescription: 'Getting ML models to production is harder than building them. We implement MLOps practices for reliable ML pipelines.',
      icon: '🤖',
      color: '#8B5CF6',
      features: ['Model Training Pipelines', 'Experiment Tracking', 'Model Registry', 'Automated Deployment', 'A/B Testing Framework', 'Model Monitoring', 'Drift Detection', 'Feature Store'],
      benefits: ['Faster model deployment', 'Reproducible experiments', 'Reliable model serving', 'Early drift detection', 'Automated retraining', 'Governance & compliance'],
      content: {
        process: [
          { step: 1, title: 'Assessment', description: 'Evaluate current ML workflow.' },
          { step: 2, title: 'Pipeline Design', description: 'Design training and deployment pipelines.' },
          { step: 3, title: 'Implementation', description: 'Build MLOps infrastructure.' },
          { step: 4, title: 'Monitoring', description: 'Implement monitoring and drift detection.' },
          { step: 5, title: 'Automation', description: 'Automate retraining triggers.' },
        ],
        technologies: [{ name: 'MLflow', icon: '📊' }, { name: 'Kubeflow', icon: '☸️' }, { name: 'SageMaker', icon: '🧠' }, { name: 'Weights & Biases', icon: '📈' }],
        faq: [{ question: 'DevOps vs MLOps?', answer: 'MLOps extends DevOps for ML—handling data versioning, experiment tracking, and model drift.' }],
        animation: { heroVisual: 'brain-network', bgPattern: 'dots', decorations: 'mixed', motion: 'orbit', featureStyle: 'icon-top', processLayout: 'zigzag', particleCount: 35, glowIntensity: 'strong', colorScheme: 'gradient', animationSpeed: 'fast' },
      },
      status: 'published', featured: false, order: 125, parentSlug: 'ai-solutions', category: 'ai-ml', isParent: false,
    },
    {
      name: 'Computer Vision Solutions',
      slug: 'computer-vision-solutions',
      description: 'Build AI systems that see and understand images and video.',
      shortDescription: 'Implement image recognition, object detection, OCR, and video analytics.',
      fullDescription: 'Computer vision enables machines to understand visual content. We build solutions for object detection, classification, OCR, and video analytics.',
      icon: '👁️',
      color: '#10B981',
      features: ['Object Detection', 'Image Classification', 'Facial Recognition', 'OCR & Document Processing', 'Video Analytics', 'Defect Detection', 'Pose Estimation', 'Image Segmentation'],
      benefits: ['Automate visual inspection', 'Process documents at scale', 'Enable new user experiences', 'Quality control automation', 'Security and surveillance', 'Accessibility features'],
      content: {
        process: [
          { step: 1, title: 'Problem Definition', description: 'Define visual recognition task and accuracy requirements.' },
          { step: 2, title: 'Data Collection', description: 'Gather and annotate training data.' },
          { step: 3, title: 'Model Development', description: 'Train or fine-tune models.' },
          { step: 4, title: 'Optimization', description: 'Optimize for speed and deployment.' },
          { step: 5, title: 'Deployment', description: 'Deploy to cloud, edge, or embedded devices.' },
        ],
        technologies: [{ name: 'PyTorch', icon: '🔥' }, { name: 'OpenCV', icon: '👁️' }, { name: 'YOLO', icon: '🎯' }, { name: 'TensorRT', icon: '⚡' }, { name: 'AWS Rekognition', icon: '☁️' }],
        faq: [{ question: 'How much training data?', answer: 'Depends on task complexity. Transfer learning reduces needs.' }],
        animation: { heroVisual: 'microscope', bgPattern: 'hexagons', decorations: 'circles', motion: 'pulse', featureStyle: 'numbered', processLayout: 'timeline', particleCount: 28, glowIntensity: 'medium', colorScheme: 'primary', animationSpeed: 'normal' },
      },
      status: 'published', featured: true, order: 126, parentSlug: 'ai-solutions', category: 'ai-ml', isParent: false,
    },
    {
      name: 'Recommendation Systems',
      slug: 'recommendation-systems',
      description: 'Build AI-powered recommendations that increase engagement and revenue.',
      shortDescription: 'Create personalized recommendation engines for products, content, and experiences.',
      fullDescription: 'Recommendation systems drive engagement on Netflix, Amazon, and Spotify. We build personalized engines based on behavior and preferences.',
      icon: '🎯',
      color: '#EC4899',
      features: ['Collaborative Filtering', 'Content-Based Recommendations', 'Hybrid Approaches', 'Real-Time Personalization', 'A/B Testing Framework', 'Explainable Recommendations', 'Cold Start Handling', 'Multi-Armed Bandits'],
      benefits: ['Increased engagement', 'Higher conversion rates', 'Improved user experience', 'Personalization at scale', 'Discovery of long-tail items', 'Customer retention'],
      content: {
        process: [
          { step: 1, title: 'Data Analysis', description: 'Analyze user behavior and interaction data.' },
          { step: 2, title: 'Algorithm Selection', description: 'Choose recommendation approaches.' },
          { step: 3, title: 'Model Development', description: 'Build and train recommendation models.' },
          { step: 4, title: 'Integration', description: 'Integrate with real-time serving.' },
          { step: 5, title: 'Optimization', description: 'A/B test and continuously improve.' },
        ],
        technologies: [{ name: 'TensorFlow Recommenders', icon: '🔶' }, { name: 'AWS Personalize', icon: '☁️' }, { name: 'LightFM', icon: '💡' }, { name: 'Redis', icon: '📬' }],
        faq: [{ question: 'How handle cold start?', answer: 'Content-based recs, popularity, or onboarding preferences for new users.' }],
        animation: { heroVisual: 'target-bullseye', bgPattern: 'dots', decorations: 'triangles', motion: 'wave', featureStyle: 'icon-left', processLayout: 'cards', particleCount: 25, glowIntensity: 'strong', colorScheme: 'accent', animationSpeed: 'normal' },
      },
      status: 'published', featured: false, order: 127, parentSlug: 'ai-solutions', category: 'ai-ml', isParent: false,
    },
    {
      name: 'Fraud Detection Systems',
      slug: 'fraud-detection-systems',
      description: 'Build AI systems that detect and prevent fraudulent activity in real-time.',
      shortDescription: 'Implement ML-powered fraud detection for transactions and user behavior.',
      fullDescription: 'Fraud costs businesses billions annually. We build fraud detection systems using machine learning to identify suspicious activity in real-time.',
      icon: '🛡️',
      color: '#EF4444',
      features: ['Real-Time Transaction Scoring', 'Anomaly Detection', 'Behavioral Biometrics', 'Device Fingerprinting', 'Network Analysis', 'Rule Engine', 'Case Management', 'Model Explainability'],
      benefits: ['Reduced fraud losses', 'Real-time protection', 'Lower false positives', 'Regulatory compliance', 'Customer trust', 'Operational efficiency'],
      content: {
        process: [
          { step: 1, title: 'Fraud Assessment', description: 'Analyze current fraud patterns and detection gaps.' },
          { step: 2, title: 'Data Engineering', description: 'Build feature pipelines from transaction data.' },
          { step: 3, title: 'Model Development', description: 'Train fraud detection models.' },
          { step: 4, title: 'Integration', description: 'Deploy for real-time scoring.' },
          { step: 5, title: 'Operations', description: 'Set up alert workflows and feedback loops.' },
        ],
        technologies: [{ name: 'XGBoost', icon: '🌲' }, { name: 'PyTorch', icon: '🔥' }, { name: 'Apache Kafka', icon: '📮' }, { name: 'Redis', icon: '📬' }, { name: 'Neo4j', icon: '🔗' }],
        faq: [{ question: 'How handle imbalanced data?', answer: 'SMOTE, class weighting, anomaly detection, and proper evaluation metrics.' }],
        animation: { heroVisual: 'shield-lock', bgPattern: 'grid', decorations: 'hexagons', motion: 'cascade', featureStyle: 'icon-top', processLayout: 'steps-horizontal', particleCount: 20, glowIntensity: 'medium', colorScheme: 'secondary', animationSpeed: 'fast' },
      },
      status: 'published', featured: false, order: 128, parentSlug: 'ai-solutions', category: 'ai-ml', isParent: false,
    },
    {
      name: 'Performance Testing & Optimization',
      slug: 'performance-testing-optimization',
      description: 'Ensure your applications perform under load with comprehensive testing.',
      shortDescription: 'Load testing, stress testing, and performance optimization for scalable apps.',
      fullDescription: 'Performance issues destroy user experience. We conduct load tests, stress tests, and capacity planning to identify bottlenecks.',
      icon: '⚡',
      color: '#F97316',
      features: ['Load Testing', 'Stress Testing', 'Capacity Planning', 'APM Implementation', 'Database Optimization', 'Caching Strategies', 'CDN Configuration', 'Performance Monitoring'],
      benefits: ['Confident scaling', 'Better user experience', 'Reduced infrastructure costs', 'Proactive issue detection', 'Data-driven optimization', 'SLA compliance'],
      content: {
        process: [
          { step: 1, title: 'Baseline', description: 'Measure current performance.' },
          { step: 2, title: 'Test Design', description: 'Design realistic load scenarios.' },
          { step: 3, title: 'Load Testing', description: 'Execute load tests and identify breaking points.' },
          { step: 4, title: 'Analysis', description: 'Identify bottlenecks.' },
          { step: 5, title: 'Optimization', description: 'Implement and verify improvements.' },
        ],
        technologies: [{ name: 'k6', icon: '📊' }, { name: 'Locust', icon: '🦗' }, { name: 'Grafana', icon: '📈' }, { name: 'Datadog', icon: '🐕' }],
        faq: [{ question: 'What improvements can we expect?', answer: 'We\'ve achieved 10x improvements in some cases.' }],
        animation: { heroVisual: 'rocket-launch', bgPattern: 'waves', decorations: 'triangles', motion: 'float', featureStyle: 'bordered', processLayout: 'zigzag', particleCount: 30, glowIntensity: 'strong', colorScheme: 'gradient', animationSpeed: 'fast' },
      },
      status: 'published', featured: false, order: 129, parentSlug: 'devops-cloud', category: 'infrastructure', isParent: false,
    },
    {
      name: 'Accessibility Compliance',
      slug: 'accessibility-compliance',
      description: 'Make your digital products accessible to everyone with WCAG compliance.',
      shortDescription: 'Audit and remediate accessibility issues for WCAG 2.1 AA/AAA compliance.',
      fullDescription: 'Over 1 billion people have disabilities. We audit against WCAG standards and implement accessibility-first development practices.',
      icon: '♿',
      color: '#3B82F6',
      features: ['Accessibility Audit', 'WCAG 2.1 Compliance', 'Screen Reader Testing', 'Keyboard Navigation', 'Color Contrast Analysis', 'ARIA Implementation', 'Automated Testing Setup', 'Accessibility Training'],
      benefits: ['Reach wider audience', 'Legal compliance (ADA, EAA)', 'Better SEO', 'Improved usability for all', 'Brand reputation', 'Inclusive design'],
      content: {
        process: [
          { step: 1, title: 'Audit', description: 'Comprehensive accessibility audit.' },
          { step: 2, title: 'Prioritization', description: 'Prioritize issues by severity.' },
          { step: 3, title: 'Remediation', description: 'Fix accessibility issues.' },
          { step: 4, title: 'Testing', description: 'Manual testing with assistive technologies.' },
          { step: 5, title: 'Process', description: 'Implement accessibility testing in workflow.' },
        ],
        technologies: [{ name: 'axe', icon: '🪓' }, { name: 'WAVE', icon: '🌊' }, { name: 'Lighthouse', icon: '🏠' }, { name: 'NVDA', icon: '🔊' }],
        faq: [{ question: 'What WCAG level?', answer: 'WCAG 2.1 AA is typically required for legal compliance.' }],
        animation: { heroVisual: 'lightbulb', bgPattern: 'circles', decorations: 'dots', motion: 'pulse', featureStyle: 'minimal', processLayout: 'timeline', particleCount: 15, glowIntensity: 'subtle', colorScheme: 'primary', animationSpeed: 'slow' },
      },
      status: 'published', featured: false, order: 130, parentSlug: 'web-development', category: 'web-software', isParent: false,
    },
    {
      name: 'Cloud Cost Optimization',
      slug: 'cloud-cost-optimization',
      description: 'Reduce cloud spending without sacrificing performance or reliability.',
      shortDescription: 'Analyze and optimize AWS, Azure, or GCP costs with FinOps practices.',
      fullDescription: 'Cloud bills grow faster than expected. We analyze spending, identify waste, and implement optimizations.',
      icon: '💰',
      color: '#22C55E',
      features: ['Cost Analysis & Attribution', 'Rightsizing Recommendations', 'Reserved Instance Planning', 'Spot Instance Strategies', 'Idle Resource Detection', 'Architecture Optimization', 'Cost Allocation Tags', 'Budget Alerts & Governance'],
      benefits: ['20-40% typical cost reduction', 'Visibility into spending', 'Accountability by team', 'Predictable budgets', 'Sustainable growth', 'Better architecture decisions'],
      content: {
        process: [
          { step: 1, title: 'Assessment', description: 'Analyze current cloud spending.' },
          { step: 2, title: 'Quick Wins', description: 'Implement immediate savings.' },
          { step: 3, title: 'Commitments', description: 'Plan reserved instances.' },
          { step: 4, title: 'Architecture', description: 'Recommend architecture changes.' },
          { step: 5, title: 'Governance', description: 'Implement cost visibility and budgets.' },
        ],
        technologies: [{ name: 'AWS Cost Explorer', icon: '📊' }, { name: 'Kubecost', icon: '☸️' }, { name: 'Infracost', icon: '💵' }, { name: 'CloudHealth', icon: '☁️' }],
        faq: [{ question: 'How much can we save?', answer: 'Typically 20-40% reduction.' }],
        animation: { heroVisual: 'chart-graph', bgPattern: 'diagonal-lines', decorations: 'squares', motion: 'cascade', featureStyle: 'numbered', processLayout: 'steps-horizontal', particleCount: 20, glowIntensity: 'medium', colorScheme: 'accent', animationSpeed: 'normal' },
      },
      status: 'published', featured: false, order: 131, parentSlug: 'devops-cloud', category: 'infrastructure', isParent: false,
    },
    {
      name: 'Disaster Recovery Planning',
      slug: 'disaster-recovery-planning',
      description: 'Ensure business continuity with robust disaster recovery solutions.',
      shortDescription: 'Design and implement DR strategies for cloud and on-premise infrastructure.',
      fullDescription: 'Disasters happen. We design and implement disaster recovery solutions that ensure business continuity.',
      icon: '🔥',
      color: '#EF4444',
      features: ['DR Strategy & Planning', 'Backup Architecture', 'Multi-Region Failover', 'RTO/RPO Definition', 'Automated Recovery', 'DR Testing & Drills', 'Runbook Development', 'Ransomware Recovery'],
      benefits: ['Business continuity', 'Regulatory compliance', 'Customer trust', 'Reduced downtime costs', 'Predictable recovery', 'Insurance requirements'],
      content: {
        process: [
          { step: 1, title: 'Assessment', description: 'Analyze critical systems and DR posture.' },
          { step: 2, title: 'Strategy', description: 'Define RTO/RPO targets.' },
          { step: 3, title: 'Implementation', description: 'Build DR infrastructure.' },
          { step: 4, title: 'Documentation', description: 'Create runbooks.' },
          { step: 5, title: 'Testing', description: 'Regular DR drills.' },
        ],
        technologies: [{ name: 'AWS Backup', icon: '☁️' }, { name: 'Azure Site Recovery', icon: '🔷' }, { name: 'Veeam', icon: '💾' }, { name: 'Terraform', icon: '🏗️' }],
        faq: [{ question: 'How often test DR?', answer: 'At least annually, ideally quarterly.' }],
        animation: { heroVisual: 'cloud-stack', bgPattern: 'hexagons', decorations: 'triangles', motion: 'pulse', featureStyle: 'icon-top', processLayout: 'timeline', particleCount: 18, glowIntensity: 'subtle', colorScheme: 'secondary', animationSpeed: 'slow' },
      },
      status: 'published', featured: false, order: 132, parentSlug: 'devops-cloud', category: 'infrastructure', isParent: false,
    },
    {
      name: 'Booking & Reservation Systems',
      slug: 'booking-reservation-systems',
      description: 'Build custom booking systems for appointments, events, and resources.',
      shortDescription: 'Create scheduling and reservation platforms for any booking use case.',
      fullDescription: 'We build custom booking platforms with availability management, payment integration, and notifications.',
      icon: '📅',
      color: '#6366F1',
      features: ['Real-Time Availability', 'Online Booking Widget', 'Calendar Integration', 'Payment Processing', 'Automated Reminders', 'Resource Management', 'Staff Scheduling', 'Waitlist Management'],
      benefits: ['24/7 booking capability', 'Reduced no-shows', 'Staff time savings', 'Better resource utilization', 'Customer convenience', 'Revenue optimization'],
      content: {
        process: [
          { step: 1, title: 'Requirements', description: 'Understand booking rules and business logic.' },
          { step: 2, title: 'Design', description: 'Design booking flow and integrations.' },
          { step: 3, title: 'Development', description: 'Build booking engine.' },
          { step: 4, title: 'Integration', description: 'Integrate with calendars and payments.' },
          { step: 5, title: 'Launch', description: 'Deploy with training.' },
        ],
        technologies: [{ name: 'Next.js', icon: '⚡' }, { name: 'PostgreSQL', icon: '🐘' }, { name: 'Stripe', icon: '💳' }, { name: 'Google Calendar API', icon: '📅' }],
        faq: [{ question: 'Handle complex availability?', answer: 'Yes, we implement buffer times, staff schedules, and custom rules.' }],
        animation: { heroVisual: 'dashboard', bgPattern: 'grid', decorations: 'squares', motion: 'cascade', featureStyle: 'gradient-border', processLayout: 'cards', particleCount: 22, glowIntensity: 'medium', colorScheme: 'accent', animationSpeed: 'normal' },
      },
      status: 'published', featured: false, order: 133, parentSlug: 'enterprise-software', category: 'web-software', isParent: false,
    },
    {
      name: 'Learning Management Systems',
      slug: 'learning-management-systems',
      description: 'Build custom LMS platforms for education and corporate training.',
      shortDescription: 'Create e-learning platforms with courses, assessments, and progress tracking.',
      fullDescription: 'We build custom LMS platforms with course management, video hosting, assessments, and certifications.',
      icon: '🎓',
      color: '#8B5CF6',
      features: ['Course Builder', 'Video Hosting & Streaming', 'Quizzes & Assessments', 'Progress Tracking', 'Certifications & Badges', 'Discussion Forums', 'SCORM/xAPI Support', 'Mobile Learning'],
      benefits: ['Scalable training delivery', 'Consistent learning experience', 'Progress visibility', 'Reduced training costs', 'Compliance tracking', 'Self-paced learning'],
      content: {
        process: [
          { step: 1, title: 'Requirements', description: 'Define learning objectives and content types.' },
          { step: 2, title: 'Design', description: 'Design learning experience.' },
          { step: 3, title: 'Development', description: 'Build LMS with course tools.' },
          { step: 4, title: 'Content Migration', description: 'Migrate course content.' },
          { step: 5, title: 'Launch', description: 'Deploy with training.' },
        ],
        technologies: [{ name: 'Next.js', icon: '⚡' }, { name: 'Mux', icon: '🎬' }, { name: 'PostgreSQL', icon: '🐘' }, { name: 'Stripe', icon: '💳' }],
        faq: [{ question: 'Build custom or use existing?', answer: 'Existing for standard needs. Custom for unique workflows.' }],
        animation: { heroVisual: 'lightbulb', bgPattern: 'dots', decorations: 'circles', motion: 'float', featureStyle: 'icon-left', processLayout: 'zigzag', particleCount: 25, glowIntensity: 'medium', colorScheme: 'primary', animationSpeed: 'normal' },
      },
      status: 'published', featured: false, order: 134, parentSlug: 'enterprise-software', category: 'web-software', isParent: false,
    },
    {
      name: 'Telemedicine Platforms',
      slug: 'telemedicine-platforms',
      description: 'Build HIPAA-compliant telehealth solutions for virtual healthcare.',
      shortDescription: 'Create secure video consultation platforms for healthcare providers.',
      fullDescription: 'We build HIPAA-compliant telehealth platforms with secure video, scheduling, EHR integration, and e-prescriptions.',
      icon: '🏥',
      color: '#10B981',
      features: ['HIPAA-Compliant Video', 'Appointment Scheduling', 'EHR/EMR Integration', 'E-Prescriptions', 'Patient Portal', 'Secure Messaging', 'Virtual Waiting Room', 'Payment Processing'],
      benefits: ['Expanded patient reach', 'Reduced no-shows', 'Improved access to care', 'Provider efficiency', 'Patient convenience', 'Revenue diversification'],
      content: {
        process: [
          { step: 1, title: 'Compliance Planning', description: 'Define HIPAA requirements.' },
          { step: 2, title: 'Clinical Workflow', description: 'Design virtual visit workflow.' },
          { step: 3, title: 'Development', description: 'Build platform with secure video.' },
          { step: 4, title: 'Integration', description: 'Connect with EHR and pharmacy.' },
          { step: 5, title: 'Training & Launch', description: 'Train providers and launch.' },
        ],
        technologies: [{ name: 'Twilio Video', icon: '📹' }, { name: 'AWS HIPAA', icon: '☁️' }, { name: 'HL7 FHIR', icon: '🏥' }, { name: 'Next.js', icon: '⚡' }],
        faq: [{ question: 'How ensure HIPAA compliance?', answer: 'Encrypted video, audit logs, BAAs, and access controls.' }],
        animation: { heroVisual: 'chat-bubbles', bgPattern: 'circles', decorations: 'dots', motion: 'pulse', featureStyle: 'bordered', processLayout: 'timeline', particleCount: 20, glowIntensity: 'subtle', colorScheme: 'primary', animationSpeed: 'slow' },
      },
      status: 'published', featured: false, order: 135, parentSlug: 'enterprise-software', category: 'web-software', isParent: false,
    },
    {
      name: 'Inventory Management Systems',
      slug: 'inventory-management-systems',
      description: 'Build custom inventory systems for warehouses, retail, and manufacturing.',
      shortDescription: 'Create inventory tracking solutions with real-time stock visibility.',
      fullDescription: 'We build custom inventory systems that track stock levels, automate reordering, and manage multiple warehouses.',
      icon: '📦',
      color: '#F59E0B',
      features: ['Real-Time Stock Tracking', 'Multi-Warehouse Support', 'Barcode/RFID Integration', 'Automated Reordering', 'Demand Forecasting', 'Lot/Serial Tracking', 'Inventory Valuation', 'Sales Channel Integration'],
      benefits: ['Prevent stockouts', 'Reduce excess inventory', 'Real-time visibility', 'Faster fulfillment', 'Better cash flow', 'Accurate reporting'],
      content: {
        process: [
          { step: 1, title: 'Assessment', description: 'Analyze current inventory processes.' },
          { step: 2, title: 'Design', description: 'Design inventory workflows.' },
          { step: 3, title: 'Development', description: 'Build inventory system.' },
          { step: 4, title: 'Data Migration', description: 'Import existing data.' },
          { step: 5, title: 'Training', description: 'Train warehouse staff.' },
        ],
        technologies: [{ name: 'Next.js', icon: '⚡' }, { name: 'PostgreSQL', icon: '🐘' }, { name: 'Redis', icon: '📬' }, { name: 'Shopify API', icon: '🛒' }],
        faq: [{ question: 'Handle multiple warehouses?', answer: 'Yes, unlimited locations with transfer tracking.' }],
        animation: { heroVisual: 'layers-stack', bgPattern: 'grid', decorations: 'squares', motion: 'cascade', featureStyle: 'numbered', processLayout: 'steps-horizontal', particleCount: 22, glowIntensity: 'medium', colorScheme: 'accent', animationSpeed: 'normal' },
      },
      status: 'published', featured: false, order: 136, parentSlug: 'enterprise-software', category: 'web-software', isParent: false,
    },
    {
      name: 'Social Media Integration',
      slug: 'social-media-integration',
      description: 'Connect your applications with social media platforms.',
      shortDescription: 'Integrate social login, sharing, and APIs from major social platforms.',
      fullDescription: 'We integrate social login, sharing features, content posting, and social analytics into your applications.',
      icon: '📱',
      color: '#1DA1F2',
      features: ['Social Login (OAuth)', 'Share Buttons & Cards', 'Content Publishing APIs', 'Social Analytics', 'User Profile Import', 'Comments Integration', 'Social Proof Widgets', 'Influencer Tools'],
      benefits: ['Frictionless registration', 'Viral sharing potential', 'User data enrichment', 'Increased engagement', 'Social proof', 'Marketing amplification'],
      content: {
        process: [
          { step: 1, title: 'Requirements', description: 'Define social features and platforms.' },
          { step: 2, title: 'API Setup', description: 'Register applications with platforms.' },
          { step: 3, title: 'Implementation', description: 'Implement social features.' },
          { step: 4, title: 'Testing', description: 'Test across platforms.' },
          { step: 5, title: 'Compliance', description: 'Ensure policy compliance.' },
        ],
        technologies: [{ name: 'Facebook Graph API', icon: '📘' }, { name: 'Twitter API', icon: '🐦' }, { name: 'Instagram API', icon: '📷' }, { name: 'OAuth 2.0', icon: '🔑' }],
        faq: [{ question: 'Which social logins?', answer: 'Google and Facebook cover most users.' }],
        animation: { heroVisual: 'network-nodes', bgPattern: 'dots', decorations: 'circles', motion: 'float', featureStyle: 'icon-top', processLayout: 'cards', particleCount: 25, glowIntensity: 'medium', colorScheme: 'gradient', animationSpeed: 'normal' },
      },
      status: 'published', featured: false, order: 137, parentSlug: 'digital-marketing', category: 'marketing', isParent: false,
    },
    {
      name: 'Affiliate Marketing Systems',
      slug: 'affiliate-marketing-systems',
      description: 'Build affiliate programs that drive sales through partner networks.',
      shortDescription: 'Create affiliate tracking platforms with commission management.',
      fullDescription: 'We build affiliate management systems with tracking, commission structures, and automated payouts.',
      icon: '🤝',
      color: '#10B981',
      features: ['Affiliate Tracking', 'Commission Management', 'Multi-Tier Programs', 'Performance Analytics', 'Automated Payouts', 'Creative Library', 'Fraud Detection', 'Affiliate Portal'],
      benefits: ['Performance-based marketing', 'Extended reach', 'Lower acquisition costs', 'Scalable channel', 'Brand advocates', 'Data-driven optimization'],
      content: {
        process: [
          { step: 1, title: 'Strategy', description: 'Define commission structures.' },
          { step: 2, title: 'Platform Design', description: 'Design tracking and experience.' },
          { step: 3, title: 'Development', description: 'Build affiliate platform.' },
          { step: 4, title: 'Integration', description: 'Integrate with e-commerce and CRM.' },
          { step: 5, title: 'Launch', description: 'Recruit affiliates and launch.' },
        ],
        technologies: [{ name: 'Next.js', icon: '⚡' }, { name: 'PostgreSQL', icon: '🐘' }, { name: 'Stripe Connect', icon: '💳' }, { name: 'Segment', icon: '📊' }],
        faq: [{ question: 'How track conversions?', answer: 'Cookie-based tracking, coupon codes, and server-side tracking.' }],
        animation: { heroVisual: 'workflow-diagram', bgPattern: 'hexagons', decorations: 'lines', motion: 'cascade', featureStyle: 'bordered', processLayout: 'zigzag', particleCount: 20, glowIntensity: 'medium', colorScheme: 'accent', animationSpeed: 'normal' },
      },
      status: 'published', featured: false, order: 138, parentSlug: 'digital-marketing', category: 'marketing', isParent: false,
    },
    {
      name: 'Technical Documentation',
      slug: 'technical-documentation',
      description: 'Create clear, comprehensive documentation for APIs, SDKs, and software.',
      shortDescription: 'Write developer documentation, API references, and technical guides.',
      fullDescription: 'We create API references, SDK guides, tutorials, and architecture docs for developer adoption.',
      icon: '📚',
      color: '#6366F1',
      features: ['API Documentation', 'SDK Guides', 'Interactive Examples', 'Architecture Docs', 'Changelog Management', 'Search & Navigation', 'Version Management', 'Code Samples'],
      benefits: ['Faster developer adoption', 'Reduced support burden', 'Better developer experience', 'Self-service onboarding', 'Professional image', 'Community enablement'],
      content: {
        process: [
          { step: 1, title: 'Audit', description: 'Review existing docs.' },
          { step: 2, title: 'Information Architecture', description: 'Structure documentation.' },
          { step: 3, title: 'Writing', description: 'Create documentation.' },
          { step: 4, title: 'Review', description: 'Technical review.' },
          { step: 5, title: 'Publishing', description: 'Deploy docs site.' },
        ],
        technologies: [{ name: 'Docusaurus', icon: '🦖' }, { name: 'GitBook', icon: '📖' }, { name: 'OpenAPI', icon: '📋' }, { name: 'Mintlify', icon: '🌿' }],
        faq: [{ question: 'Keep docs in sync?', answer: 'Generate from code where possible and docs-as-code workflow.' }],
        animation: { heroVisual: 'code-editor', bgPattern: 'grid', decorations: 'dots', motion: 'type', featureStyle: 'minimal', processLayout: 'timeline', particleCount: 15, glowIntensity: 'subtle', colorScheme: 'primary', animationSpeed: 'slow' },
      },
      status: 'published', featured: false, order: 139, parentSlug: 'api-development', category: 'web-software', isParent: false,
    },
    {
      name: 'Code Review & Refactoring',
      slug: 'code-review-refactoring',
      description: 'Improve code quality through expert review and strategic refactoring.',
      shortDescription: 'Expert code audits and refactoring to improve maintainability.',
      fullDescription: 'We conduct thorough code reviews and refactor strategically to improve code quality.',
      icon: '🔧',
      color: '#8B5CF6',
      features: ['Code Quality Audit', 'Architecture Review', 'Security Review', 'Performance Analysis', 'Refactoring Roadmap', 'Incremental Refactoring', 'Test Coverage Improvement', 'Documentation Updates'],
      benefits: ['Reduced technical debt', 'Faster development', 'Fewer bugs', 'Easier onboarding', 'Better performance', 'Improved security'],
      content: {
        process: [
          { step: 1, title: 'Audit', description: 'Comprehensive code review.' },
          { step: 2, title: 'Prioritization', description: 'Rank issues by impact.' },
          { step: 3, title: 'Refactoring', description: 'Incremental improvements.' },
          { step: 4, title: 'Testing', description: 'Improve test coverage.' },
          { step: 5, title: 'Standards', description: 'Establish coding standards.' },
        ],
        technologies: [{ name: 'SonarQube', icon: '📊' }, { name: 'ESLint', icon: '📝' }, { name: 'Jest', icon: '🃏' }, { name: 'TypeScript', icon: '📘' }],
        faq: [{ question: 'Refactor without breaking?', answer: 'Comprehensive tests first and incremental changes.' }],
        animation: { heroVisual: 'terminal', bgPattern: 'diagonal-lines', decorations: 'squares', motion: 'type', featureStyle: 'numbered', processLayout: 'steps-horizontal', particleCount: 18, glowIntensity: 'subtle', colorScheme: 'secondary', animationSpeed: 'normal' },
      },
      status: 'published', featured: false, order: 140, parentSlug: 'web-development', category: 'web-software', isParent: false,
    },
    {
      name: 'Multi-Tenant SaaS Architecture',
      slug: 'multi-tenant-saas-architecture',
      description: 'Design and build scalable multi-tenant SaaS platforms.',
      shortDescription: 'Create SaaS applications with tenant isolation and billing.',
      fullDescription: 'We design and build SaaS platforms with tenant isolation, usage-based billing, and enterprise features.',
      icon: '🏢',
      color: '#0EA5E9',
      features: ['Tenant Isolation', 'Usage-Based Billing', 'Self-Service Admin', 'Role-Based Access', 'SSO Integration', 'White-Labeling', 'API Access', 'Usage Analytics'],
      benefits: ['Scalable architecture', 'Predictable costs', 'Enterprise-ready', 'Self-service growth', 'Usage monetization', 'Secure isolation'],
      content: {
        process: [
          { step: 1, title: 'Architecture', description: 'Design tenant isolation and scaling.' },
          { step: 2, title: 'Core Platform', description: 'Build auth and tenant management.' },
          { step: 3, title: 'Billing', description: 'Implement subscription billing.' },
          { step: 4, title: 'Admin Portal', description: 'Create self-service administration.' },
          { step: 5, title: 'Enterprise Features', description: 'Add SSO and audit logs.' },
        ],
        technologies: [{ name: 'Next.js', icon: '⚡' }, { name: 'PostgreSQL', icon: '🐘' }, { name: 'Stripe', icon: '💳' }, { name: 'Auth0', icon: '🔐' }],
        faq: [{ question: 'Shared vs separate database?', answer: 'Shared for cost efficiency, separate for enterprise isolation.' }],
        animation: { heroVisual: 'cloud-stack', bgPattern: 'grid', decorations: 'hexagons', motion: 'cascade', featureStyle: 'gradient-border', processLayout: 'timeline', particleCount: 25, glowIntensity: 'medium', colorScheme: 'primary', animationSpeed: 'normal' },
      },
      status: 'published', featured: true, order: 141, parentSlug: 'enterprise-software', category: 'web-software', isParent: false,
    },
    {
      name: 'Event-Driven Architecture',
      slug: 'event-driven-architecture',
      description: 'Build loosely coupled systems with event-driven patterns.',
      shortDescription: 'Implement event sourcing, message queues, and reactive architectures.',
      fullDescription: 'We design and implement event-driven systems using message queues, event sourcing, and CQRS patterns.',
      icon: '📨',
      color: '#F97316',
      features: ['Message Queue Implementation', 'Event Sourcing', 'CQRS Pattern', 'Saga Pattern', 'Dead Letter Handling', 'Event Schema Registry', 'Exactly-Once Processing', 'Event Replay'],
      benefits: ['Loose coupling', 'Better scalability', 'Audit trail built-in', 'Async processing', 'Resilience', 'Temporal queries'],
      content: {
        process: [
          { step: 1, title: 'Assessment', description: 'Identify use cases for event-driven.' },
          { step: 2, title: 'Design', description: 'Design event schemas and flows.' },
          { step: 3, title: 'Implementation', description: 'Build producers and consumers.' },
          { step: 4, title: 'Operations', description: 'Set up monitoring.' },
          { step: 5, title: 'Migration', description: 'Migrate to event-driven.' },
        ],
        technologies: [{ name: 'Apache Kafka', icon: '📮' }, { name: 'RabbitMQ', icon: '🐰' }, { name: 'AWS SQS/SNS', icon: '☁️' }, { name: 'EventStoreDB', icon: '💾' }],
        faq: [{ question: 'When use event-driven?', answer: 'For async processing, decoupling, or audit requirements.' }],
        animation: { heroVisual: 'data-flow', bgPattern: 'waves', decorations: 'lines', motion: 'wave', featureStyle: 'icon-left', processLayout: 'zigzag', particleCount: 30, glowIntensity: 'strong', colorScheme: 'gradient', animationSpeed: 'fast' },
      },
      status: 'published', featured: false, order: 142, parentSlug: 'api-development', category: 'web-software', isParent: false,
    },
    {
      name: 'Headless Commerce',
      slug: 'headless-commerce',
      description: 'Build flexible e-commerce with headless architecture.',
      shortDescription: 'Create decoupled e-commerce with headless CMS and commerce APIs.',
      fullDescription: 'We build headless e-commerce solutions using commerce APIs with custom frontends.',
      icon: '🛒',
      color: '#EC4899',
      features: ['Headless Commerce Backend', 'Custom Storefront', 'Multi-Channel Publishing', 'Performance Optimization', 'Personalization', 'Checkout Customization', 'Inventory APIs', 'Order Management'],
      benefits: ['Faster page loads', 'Complete design freedom', 'Multi-channel from one backend', 'Better developer experience', 'Future-proof architecture', 'SEO advantages'],
      content: {
        process: [
          { step: 1, title: 'Commerce Selection', description: 'Choose headless commerce backend.' },
          { step: 2, title: 'Architecture', description: 'Design frontend architecture.' },
          { step: 3, title: 'Storefront Development', description: 'Build custom frontend.' },
          { step: 4, title: 'Optimization', description: 'Optimize for performance.' },
          { step: 5, title: 'Launch', description: 'Migrate and launch.' },
        ],
        technologies: [{ name: 'Next.js', icon: '⚡' }, { name: 'Shopify Storefront', icon: '🛍️' }, { name: 'Medusa', icon: '🐙' }, { name: 'Sanity', icon: '📝' }],
        faq: [{ question: 'Why go headless?', answer: 'For custom experiences, better performance, or multi-channel needs.' }],
        animation: { heroVisual: 'shopping-cart-3d', bgPattern: 'dots', decorations: 'squares', motion: 'float', featureStyle: 'gradient-border', processLayout: 'cards', particleCount: 22, glowIntensity: 'strong', colorScheme: 'accent', animationSpeed: 'normal' },
      },
      status: 'published', featured: false, order: 143, parentSlug: 'ecommerce-solutions', category: 'web-software', isParent: false,
    },
    {
      name: 'API Rate Limiting & Throttling',
      slug: 'api-rate-limiting-throttling',
      description: 'Protect your APIs with intelligent rate limiting.',
      shortDescription: 'Implement rate limiting, quotas, and API traffic management.',
      fullDescription: 'We implement rate limiting strategies that protect infrastructure while providing fair access.',
      icon: '🚦',
      color: '#EF4444',
      features: ['Rate Limiting Algorithms', 'User/API Key Quotas', 'Burst Handling', 'Tiered Limits', 'Retry-After Headers', 'Usage Analytics', 'Real-Time Monitoring', 'Dynamic Throttling'],
      benefits: ['Infrastructure protection', 'Fair resource allocation', 'Abuse prevention', 'Cost control', 'SLA enforcement', 'Predictable performance'],
      content: {
        process: [
          { step: 1, title: 'Analysis', description: 'Analyze traffic patterns.' },
          { step: 2, title: 'Strategy', description: 'Choose algorithms and limits.' },
          { step: 3, title: 'Implementation', description: 'Implement rate limiting.' },
          { step: 4, title: 'Monitoring', description: 'Set up monitoring.' },
          { step: 5, title: 'Tuning', description: 'Adjust based on usage.' },
        ],
        technologies: [{ name: 'Redis', icon: '📬' }, { name: 'Kong', icon: '🦍' }, { name: 'AWS API Gateway', icon: '☁️' }, { name: 'NGINX', icon: '🟢' }],
        faq: [{ question: 'Which algorithm?', answer: 'Token bucket for bursty traffic, sliding window for smooth limiting.' }],
        animation: { heroVisual: 'network-nodes', bgPattern: 'grid', decorations: 'lines', motion: 'pulse', featureStyle: 'icon-top', processLayout: 'timeline', particleCount: 20, glowIntensity: 'medium', colorScheme: 'secondary', animationSpeed: 'normal' },
      },
      status: 'published', featured: false, order: 144, parentSlug: 'api-development', category: 'web-software', isParent: false,
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

  // ==================== SERVICE TRANSLATIONS ====================

  const fullStackDev = await prisma.service.findUnique({ where: { slug: 'full-stack-development' } });

  if (fullStackDev) {
    const fullStackTranslations = [
      {
        serviceId: fullStackDev.id,
        locale: 'tr',
        name: 'Full-Stack Geliştirme',
        shortDescription: 'Ön yüzden arka uca kadar eksiksiz web uygulamaları geliştirin.',
        fullDescription: 'Tam yığın geliştirme hizmetimizle iki dünyanın en iyisini elde edin. Piksel mükemmelliğinde kullanıcı arayüzlerinden sağlam sunucu tarafı mantığına, veritabanlarına ve DevOps süreçlerine kadar her şeyi tasarlıyor, geliştiriyor ve dağıtıyoruz.',
        features: [
          'React & Next.js Ön Yüz',
          'Node.js & Python Arka Uç',
          'Veritabanı Tasarımı & ORM Entegrasyonu',
          'REST & GraphQL API Geliştirme',
          'Kimlik Doğrulama & Yetkilendirme',
          'Gerçek Zamanlı Özellikler (WebSockets)',
          'CI/CD Pipeline Kurulumu',
          'Bulut Dağıtım & Ölçeklendirme',
        ],
        benefits: [
          'Tek ekip tüm yığına sahip, aktarım gecikmelerini azaltır',
          'UI\'dan veritabanına tutarlı mimari',
          'Paylaşılan bağlamla daha hızlı iterasyon',
          'Tüm katmanlarda birleşik test stratejisi',
          'Ayrı ön yüz ve arka uç ekiplerine göre maliyet etkin',
          'Ön yüz ve arka uç arasında sorunsuz entegrasyon',
        ],
        content: {
          process: [
            { step: 1, title: 'Mimari & Planlama', description: 'Proje gereksinimlerinize göre genel sistem mimarisini, veri modellerini, API sözleşmelerini ve teknoloji seçimlerini tanımlıyoruz.' },
            { step: 2, title: 'Veritabanı & API Katmanı', description: 'Veritabanı şemasını tasarlıyor, doğrulama, kimlik doğrulama ve dokümantasyon ile API katmanını oluşturuyoruz.' },
            { step: 3, title: 'Ön Yüz Geliştirme', description: 'React/Next.js ile kullanıcı arayüzünü oluşturuyor, uygun durum yönetimi ve hata işleme ile arka uç API\'lerine bağlıyoruz.' },
            { step: 4, title: 'Entegrasyon & Test', description: 'Uçtan uca test, performans optimizasyonu ve her şeyin kusursuz çalışmasını sağlamak için dağıtım pipeline kurulumu.' },
            { step: 5, title: 'Dağıtım & İzleme', description: 'Uygulamanızın sorunsuz çalışmasını sağlamak için izleme, günlükleme ve uyarı ile bulut altyapısına dağıtıyoruz.' },
          ],
          faq: [
            { question: 'Full-stack geliştirme neleri kapsar?', answer: 'Full-stack geliştirme, kullanıcı arayüzünden sunucu mantığına, veritabanı tasarımına, API geliştirmeye, kimlik doğrulamaya ve dağıtım altyapısına kadar her şeyi kapsar.' },
            { question: 'Hangi teknoloji yığınını öneriyorsunuz?', answer: 'Çoğu proje için ön yüzde TypeScript ile Next.js, arka uçta Node.js, veritabanında PostgreSQL ve ORM olarak Prisma öneriyoruz.' },
            { question: 'Mevcut kod tabanımızla çalışabilir misiniz?', answer: 'Evet, mevcut uygulamaları genişletebilir, yeniden düzenleyebilir veya modernize edebiliriz.' },
            { question: 'Gerçek zamanlı özellikleri nasıl ele alıyorsunuz?', answer: 'Canlı veri, bildirimler, sohbet ve işbirlikçi düzenleme özellikleri için Socket.io veya yerel WS kullanarak WebSocket\'ler uyguluyoruz.' },
          ],
        },
      },
      {
        serviceId: fullStackDev.id,
        locale: 'de',
        name: 'Full-Stack Entwicklung',
        shortDescription: 'Erstellen Sie komplette Webanwendungen vom Frontend bis zum Backend mit einem einheitlichen Full-Stack-Ansatz.',
        fullDescription: 'Holen Sie sich das Beste aus beiden Welten mit unserem Full-Stack-Entwicklungsservice. Wir entwerfen, erstellen und implementieren komplette Webanwendungen, die alles von pixelgenauen Benutzeroberflächen bis hin zu robuster serverseitiger Logik, Datenbanken und DevOps abdecken.',
        features: [
          'React & Next.js Frontend',
          'Node.js & Python Backend',
          'Datenbankdesign & ORM-Integration',
          'REST & GraphQL API-Entwicklung',
          'Authentifizierung & Autorisierung',
          'Echtzeit-Funktionen (WebSockets)',
          'CI/CD-Pipeline-Einrichtung',
          'Cloud-Bereitstellung & Skalierung',
        ],
        benefits: [
          'Ein Team verantwortet den gesamten Stack, weniger Übergabeverzögerungen',
          'Konsistente Architektur von UI bis Datenbank',
          'Schnellere Iteration durch gemeinsamen Kontext',
          'Einheitliche Teststrategie über alle Schichten',
          'Kosteneffektiv im Vergleich zu separaten Frontend- und Backend-Teams',
          'Nahtlose Integration zwischen Frontend und Backend',
        ],
        content: {
          process: [
            { step: 1, title: 'Architektur & Planung', description: 'Wir definieren die gesamte Systemarchitektur, Datenmodelle, API-Verträge und Technologieentscheidungen basierend auf Ihren Projektanforderungen.' },
            { step: 2, title: 'Datenbank & API-Schicht', description: 'Wir entwerfen das Datenbankschema und erstellen die API-Schicht mit ordnungsgemäßer Validierung, Authentifizierung und Dokumentation.' },
            { step: 3, title: 'Frontend-Entwicklung', description: 'Wir erstellen die Benutzeroberfläche mit React/Next.js und verbinden sie mit den Backend-APIs.' },
            { step: 4, title: 'Integration & Tests', description: 'End-to-End-Tests, Leistungsoptimierung und Einrichtung der Deployment-Pipeline.' },
            { step: 5, title: 'Bereitstellung & Überwachung', description: 'Wir stellen in der Cloud-Infrastruktur mit Überwachung, Protokollierung und Alarmierung bereit.' },
          ],
          faq: [
            { question: 'Was umfasst Full-Stack-Entwicklung?', answer: 'Full-Stack-Entwicklung deckt alles ab, von der Benutzeroberfläche über Serverlogik, Datenbankdesign, API-Entwicklung, Authentifizierung bis hin zur Deployment-Infrastruktur.' },
            { question: 'Welchen Technologie-Stack empfehlen Sie?', answer: 'Für die meisten Projekte empfehlen wir Next.js mit TypeScript für das Frontend, Node.js für das Backend, PostgreSQL für die Datenbank und Prisma als ORM.' },
            { question: 'Können Sie mit unserer bestehenden Codebasis arbeiten?', answer: 'Ja, wir können bestehende Anwendungen erweitern, refaktorisieren oder modernisieren.' },
            { question: 'Wie handhaben Sie Echtzeit-Funktionen?', answer: 'Wir implementieren WebSockets mit Socket.io oder nativen WS für Live-Daten, Benachrichtigungen und Chat-Funktionen.' },
          ],
        },
      },
      {
        serviceId: fullStackDev.id,
        locale: 'ar',
        name: 'تطوير فول ستاك',
        shortDescription: 'بناء تطبيقات ويب كاملة من الواجهة الأمامية إلى الخلفية بنهج متكامل.',
        fullDescription: 'احصل على أفضل ما في العالمين مع خدمة تطوير الفول ستاك. نصمم وننشئ وننشر تطبيقات ويب كاملة تتعامل مع كل شيء من واجهات المستخدم المثالية إلى منطق الخادم القوي وقواعد البيانات وعمليات DevOps.',
        features: [
          'واجهة أمامية React و Next.js',
          'خلفية Node.js و Python',
          'تصميم قواعد البيانات وتكامل ORM',
          'تطوير REST و GraphQL API',
          'المصادقة والتفويض',
          'ميزات الوقت الحقيقي (WebSockets)',
          'إعداد خط أنابيب CI/CD',
          'النشر السحابي والتوسع',
        ],
        benefits: [
          'فريق واحد يمتلك المجموعة بأكملها مما يقلل التأخير',
          'بنية متسقة من واجهة المستخدم إلى قاعدة البيانات',
          'تكرار أسرع مع سياق مشترك',
          'استراتيجية اختبار موحدة عبر جميع الطبقات',
          'فعالة من حيث التكلفة مقارنة بفرق منفصلة',
          'تكامل سلس بين الواجهة الأمامية والخلفية',
        ],
        content: {
          process: [
            { step: 1, title: 'الهندسة المعمارية والتخطيط', description: 'نحدد البنية العامة للنظام ونماذج البيانات وعقود API واختيارات التكنولوجيا بناءً على متطلبات مشروعك.' },
            { step: 2, title: 'قاعدة البيانات وطبقة API', description: 'نصمم مخطط قاعدة البيانات وننشئ طبقة API مع التحقق والمصادقة والتوثيق.' },
            { step: 3, title: 'تطوير الواجهة الأمامية', description: 'نبني واجهة المستخدم باستخدام React/Next.js مع إدارة الحالة ومعالجة الأخطاء.' },
            { step: 4, title: 'التكامل والاختبار', description: 'اختبار شامل وتحسين الأداء وإعداد خط أنابيب النشر.' },
            { step: 5, title: 'النشر والمراقبة', description: 'ننشر في البنية التحتية السحابية مع المراقبة والتسجيل والتنبيه.' },
          ],
          faq: [
            { question: 'ماذا يشمل تطوير فول ستاك؟', answer: 'يغطي تطوير فول ستاك كل شيء من واجهة المستخدم إلى منطق الخادم وتصميم قاعدة البيانات وتطوير API والمصادقة والبنية التحتية للنشر.' },
            { question: 'ما مجموعة التكنولوجيا التي توصون بها؟', answer: 'لمعظم المشاريع نوصي بـ Next.js مع TypeScript للواجهة الأمامية و Node.js للخلفية و PostgreSQL لقاعدة البيانات و Prisma كـ ORM.' },
            { question: 'هل يمكنكم العمل مع قاعدة الكود الحالية؟', answer: 'نعم، يمكننا توسيع التطبيقات الحالية أو إعادة هيكلتها أو تحديثها.' },
            { question: 'كيف تتعاملون مع ميزات الوقت الحقيقي؟', answer: 'نستخدم WebSockets عبر Socket.io أو WS الأصلي للبيانات المباشرة والإشعارات والدردشة.' },
          ],
        },
      },
      {
        serviceId: fullStackDev.id,
        locale: 'ur',
        name: 'فل سٹیک ڈیولپمنٹ',
        shortDescription: 'فرنٹ اینڈ سے بیک اینڈ تک مکمل ویب ایپلیکیشنز بنائیں۔',
        fullDescription: 'ہماری فل سٹیک ڈیولپمنٹ سروس کے ساتھ دونوں دنیاؤں کا بہترین حاصل کریں۔ ہم مکمل ویب ایپلیکیشنز ڈیزائن، تعمیر اور تعینات کرتے ہیں جو صارف انٹرفیس سے لے کر سرور سائیڈ لاجک، ڈیٹا بیس اور DevOps تک سب کچھ سنبھالتی ہیں۔',
        features: [
          'React اور Next.js فرنٹ اینڈ',
          'Node.js اور Python بیک اینڈ',
          'ڈیٹا بیس ڈیزائن اور ORM انٹیگریشن',
          'REST اور GraphQL API ڈیولپمنٹ',
          'تصدیق اور اجازت',
          'ریئل ٹائم فیچرز (WebSockets)',
          'CI/CD پائپ لائن سیٹ اپ',
          'کلاؤڈ تعیناتی اور اسکیلنگ',
        ],
        benefits: [
          'ایک ٹیم پورے اسٹیک کی مالک ہے، حوالگی میں تاخیر کم ہوتی ہے',
          'UI سے ڈیٹا بیس تک مستقل فن تعمیر',
          'مشترکہ سیاق و سباق کے ساتھ تیز تر تکرار',
          'تمام پرتوں میں متحد ٹیسٹنگ حکمت عملی',
          'الگ الگ ٹیموں کے مقابلے میں لاگت مؤثر',
          'فرنٹ اینڈ اور بیک اینڈ کے درمیان ہموار انٹیگریشن',
        ],
        content: {
          process: [
            { step: 1, title: 'فن تعمیر اور منصوبہ بندی', description: 'ہم آپ کے پراجیکٹ کی ضروریات کی بنیاد پر مجموعی نظام کا فن تعمیر، ڈیٹا ماڈلز، API معاہدے اور ٹیکنالوجی کے انتخاب کی وضاحت کرتے ہیں۔' },
            { step: 2, title: 'ڈیٹا بیس اور API پرت', description: 'ہم ڈیٹا بیس اسکیما ڈیزائن کرتے ہیں اور مناسب توثیق، تصدیق اور دستاویزات کے ساتھ API پرت بناتے ہیں۔' },
            { step: 3, title: 'فرنٹ اینڈ ڈیولپمنٹ', description: 'ہم React/Next.js کے ساتھ صارف انٹرفیس بناتے ہیں اور اسے بیک اینڈ APIs سے جوڑتے ہیں۔' },
            { step: 4, title: 'انٹیگریشن اور ٹیسٹنگ', description: 'اینڈ ٹو اینڈ ٹیسٹنگ، کارکردگی کی اصلاح، اور تعیناتی پائپ لائن سیٹ اپ۔' },
            { step: 5, title: 'تعیناتی اور نگرانی', description: 'ہم نگرانی، لاگنگ اور الرٹنگ کے ساتھ کلاؤڈ انفراسٹرکچر میں تعینات کرتے ہیں۔' },
          ],
          faq: [
            { question: 'فل سٹیک ڈیولپمنٹ میں کیا شامل ہے؟', answer: 'فل سٹیک ڈیولپمنٹ صارف انٹرفیس سے لے کر سرور لاجک، ڈیٹا بیس ڈیزائن، API ڈیولپمنٹ، تصدیق اور تعیناتی انفراسٹرکچر تک سب کچھ شامل کرتی ہے۔' },
            { question: 'آپ کون سا ٹیکنالوجی اسٹیک تجویز کرتے ہیں؟', answer: 'زیادہ تر پراجیکٹس کے لیے ہم فرنٹ اینڈ کے لیے TypeScript کے ساتھ Next.js، بیک اینڈ کے لیے Node.js، ڈیٹا بیس کے لیے PostgreSQL اور ORM کے طور پر Prisma تجویز کرتے ہیں۔' },
            { question: 'کیا آپ ہمارے موجودہ کوڈ بیس کے ساتھ کام کر سکتے ہیں؟', answer: 'جی ہاں، ہم موجودہ ایپلیکیشنز کو بڑھا سکتے ہیں، دوبارہ ترتیب دے سکتے ہیں یا جدید بنا سکتے ہیں۔' },
            { question: 'آپ ریئل ٹائم فیچرز کیسے سنبھالتے ہیں؟', answer: 'ہم لائیو ڈیٹا، نوٹیفیکیشنز اور چیٹ کے لیے Socket.io یا مقامی WS کے ذریعے WebSockets استعمال کرتے ہیں۔' },
          ],
        },
      },
    ];

    for (const translation of fullStackTranslations) {
      await prisma.serviceTranslation.upsert({
        where: {
          serviceId_locale: {
            serviceId: translation.serviceId,
            locale: translation.locale,
          },
        },
        update: {
          name: translation.name,
          shortDescription: translation.shortDescription,
          fullDescription: translation.fullDescription,
          features: translation.features,
          benefits: translation.benefits,
          content: translation.content as any,
        },
        create: {
          serviceId: translation.serviceId,
          locale: translation.locale,
          name: translation.name,
          shortDescription: translation.shortDescription,
          fullDescription: translation.fullDescription,
          features: translation.features,
          benefits: translation.benefits,
          content: translation.content as any,
        },
      });
    }
    console.log(`Seeded ${fullStackTranslations.length} translations for full-stack-development`);
  }

  // ==================== BATCH 1: Parent Service Translations (web-development, ai-solutions, mobile-development) ====================

  // Web Development Translations
  const webDevService = await prisma.service.findUnique({ where: { slug: 'web-development' } });
  if (webDevService) {
    const webDevTranslations = [
      {
        serviceId: webDevService.id,
        locale: 'tr',
        name: 'Web Geliştirme',
        shortDescription: 'Son teknoloji ile oluşturulmuş özel, yüksek performanslı web siteleri.',
        fullDescription: 'Sadece web siteleri değil, dijital deneyimler inşa ediyoruz. Web geliştirme ekibimiz, iş hedeflerinize uygun son derece hızlı, SEO optimize ve ölçeklenebilir web uygulamaları oluşturmak için Next.js ve React gibi en son framework\'leri kullanır. İster kurumsal bir site, ister karmaşık bir SaaS platformu veya özel bir portal ihtiyacınız olsun, performans gösteren kod sunuyoruz.',
        features: [
          'Özel Next.js & React Geliştirme',
          'Progressive Web Apps (PWA)',
          'API Entegrasyonu & Geliştirme',
          'Performans Optimizasyonu (Core Web Vitals)',
          'Headless CMS Çözümleri',
          'Responsive & Mobile-First Tasarım',
        ],
        benefits: [
          'Çok hızlı yükleme süreleri',
          'Üstün SEO sıralama potansiyeli',
          'Büyüme için ölçeklenebilir mimari',
          'Güvenli ve bakımı kolay kod',
        ],
        content: {
          process: [
            { step: 1, title: 'Keşif & Strateji', description: 'Teknik yol haritasını tanımlamak için işinizi, hedef kitlenizi ve hedeflerinizi anlayarak başlıyoruz.' },
            { step: 2, title: 'UX/UI Tasarım', description: 'Tasarımcılarımız marka kimliğinizle uyumlu, sezgisel, yüksek sadakatli prototipler oluşturur.' },
            { step: 3, title: 'Geliştirme', description: 'Ölçeklenebilirlik ve güvenlik sağlayan modern standartları kullanarak temiz, semantik kod yazıyoruz.' },
            { step: 4, title: 'Test & Lansman', description: 'Cihazlar ve tarayıcılar arasında kapsamlı test, kusursuz bir lansman günü sağlar.' },
          ],
          faq: [
            { question: 'Bir web sitesi oluşturmak ne kadar sürer?', answer: 'Standart bir kurumsal web sitesi genellikle 4-6 hafta sürer, daha karmaşık web uygulamaları kapsam ve özelliklere bağlı olarak 3-6 ay sürebilir.' },
            { question: 'Hosting ve bakım sağlıyor musunuz?', answer: 'Evet, güvenli hosting, günlük yedeklemeler ve düzenli güvenlik güncellemeleri içeren kapsamlı bakım paketleri sunuyoruz.' },
            { question: 'Web sitem mobil uyumlu olacak mı?', answer: 'Kesinlikle. Mobile-first bir yaklaşım benimsiyoruz, sitenizin akıllı telefonlarda, tabletlerde ve masaüstlerinde mükemmel görünmesini ve performans göstermesini sağlıyoruz.' },
            { question: 'İçeriği kendim güncelleyebilir miyim?', answer: 'Evet, metin, görsel ve blog yazılarını kolayca güncellemenizi sağlayan kullanıcı dostu İçerik Yönetim Sistemleri (CMS) entegre ediyoruz.' },
          ],
        },
      },
      {
        serviceId: webDevService.id,
        locale: 'de',
        name: 'Web-Entwicklung',
        shortDescription: 'Individuelle, leistungsstarke Websites mit modernster Technologie.',
        fullDescription: 'Wir bauen mehr als nur Websites; wir schaffen digitale Erlebnisse. Unser Web-Entwicklungsteam nutzt die neuesten Frameworks wie Next.js und React, um blitzschnelle, SEO-optimierte und skalierbare Webanwendungen zu erstellen, die auf Ihre Geschäftsziele zugeschnitten sind.',
        features: [
          'Individuelle Next.js & React Entwicklung',
          'Progressive Web Apps (PWA)',
          'API-Integration & Entwicklung',
          'Performance-Optimierung (Core Web Vitals)',
          'Headless CMS Lösungen',
          'Responsive & Mobile-First Design',
        ],
        benefits: [
          'Blitzschnelle Ladezeiten',
          'Überlegenes SEO-Ranking-Potenzial',
          'Skalierbare Architektur für Wachstum',
          'Sicherer und wartbarer Code',
        ],
        content: {
          process: [
            { step: 1, title: 'Entdeckung & Strategie', description: 'Wir beginnen damit, Ihr Unternehmen, Ihre Zielgruppe und Ihre Ziele zu verstehen, um die technische Roadmap zu definieren.' },
            { step: 2, title: 'UX/UI Design', description: 'Unsere Designer erstellen intuitive, hochwertige Prototypen, die zu Ihrer Markenidentität passen.' },
            { step: 3, title: 'Entwicklung', description: 'Wir schreiben sauberen, semantischen Code unter Verwendung moderner Standards für Skalierbarkeit und Sicherheit.' },
            { step: 4, title: 'Test & Launch', description: 'Rigorose Tests auf verschiedenen Geräten und Browsern gewährleisten einen reibungslosen Launch.' },
          ],
          faq: [
            { question: 'Wie lange dauert es, eine Website zu erstellen?', answer: 'Eine Standard-Unternehmenswebsite dauert in der Regel 4-6 Wochen, komplexere Webanwendungen können 3-6 Monate dauern.' },
            { question: 'Bieten Sie Hosting und Wartung an?', answer: 'Ja, wir bieten umfassende Wartungspakete mit sicherem Hosting, täglichen Backups und regelmäßigen Sicherheitsupdates.' },
            { question: 'Wird meine Website mobilfreundlich sein?', answer: 'Absolut. Wir verfolgen einen Mobile-First-Ansatz und stellen sicher, dass Ihre Website auf allen Geräten perfekt aussieht und funktioniert.' },
            { question: 'Kann ich den Inhalt selbst aktualisieren?', answer: 'Ja, wir integrieren benutzerfreundliche Content-Management-Systeme (CMS), mit denen Sie Texte, Bilder und Blog-Beiträge einfach aktualisieren können.' },
          ],
        },
      },
      {
        serviceId: webDevService.id,
        locale: 'ar',
        name: 'تطوير الويب',
        shortDescription: 'مواقع ويب مخصصة وعالية الأداء مبنية بأحدث التقنيات.',
        fullDescription: 'نحن نبني أكثر من مجرد مواقع ويب؛ نحن نبني تجارب رقمية. يستفيد فريق تطوير الويب لدينا من أحدث الأطر مثل Next.js و React لإنشاء تطبيقات ويب سريعة للغاية ومحسنة لمحركات البحث وقابلة للتطوير ومصممة خصيصاً لأهداف عملك.',
        features: [
          'تطوير Next.js و React مخصص',
          'تطبيقات الويب التقدمية (PWA)',
          'تكامل وتطوير واجهات برمجة التطبيقات',
          'تحسين الأداء (Core Web Vitals)',
          'حلول Headless CMS',
          'تصميم متجاوب ومتوافق مع الجوال أولاً',
        ],
        benefits: [
          'أوقات تحميل فائقة السرعة',
          'إمكانية ترتيب SEO متفوقة',
          'بنية قابلة للتطوير للنمو',
          'كود آمن وقابل للصيانة',
        ],
        content: {
          process: [
            { step: 1, title: 'الاكتشاف والاستراتيجية', description: 'نبدأ بفهم عملك وجمهورك وأهدافك لتحديد خارطة الطريق التقنية.' },
            { step: 2, title: 'تصميم UX/UI', description: 'يقوم مصممونا بإنشاء نماذج أولية بديهية وعالية الدقة تتوافق مع هوية علامتك التجارية.' },
            { step: 3, title: 'التطوير', description: 'نكتب كوداً نظيفاً ودلالياً باستخدام معايير حديثة لضمان قابلية التوسع والأمان.' },
            { step: 4, title: 'الاختبار والإطلاق', description: 'يضمن الاختبار الشامل عبر الأجهزة والمتصفحات إطلاقاً سلساً.' },
          ],
          faq: [
            { question: 'كم يستغرق بناء موقع ويب؟', answer: 'يستغرق موقع الويب المؤسسي القياسي عادةً 4-6 أسابيع، بينما قد تستغرق تطبيقات الويب الأكثر تعقيداً 3-6 أشهر.' },
            { question: 'هل توفرون الاستضافة والصيانة؟', answer: 'نعم، نقدم حزم صيانة شاملة تتضمن استضافة آمنة ونسخ احتياطية يومية وتحديثات أمنية منتظمة.' },
            { question: 'هل سيكون موقعي متوافقاً مع الجوال؟', answer: 'بالتأكيد. نتبع نهج الجوال أولاً لضمان أن موقعك يبدو ويعمل بشكل مثالي على جميع الأجهزة.' },
            { question: 'هل يمكنني تحديث المحتوى بنفسي؟', answer: 'نعم، نقوم بدمج أنظمة إدارة محتوى سهلة الاستخدام تتيح لك تحديث النصوص والصور ومنشورات المدونة بسهولة.' },
          ],
        },
      },
      {
        serviceId: webDevService.id,
        locale: 'ur',
        name: 'ویب ڈویلپمنٹ',
        shortDescription: 'جدید ترین ٹیکنالوجی کے ساتھ بنائی گئی کسٹم، اعلیٰ کارکردگی والی ویب سائٹس۔',
        fullDescription: 'ہم صرف ویب سائٹس نہیں بناتے؛ ہم ڈیجیٹل تجربات بناتے ہیں۔ ہماری ویب ڈویلپمنٹ ٹیم آپ کے کاروباری اہداف کے مطابق انتہائی تیز، SEO-آپٹیمائزڈ، اور قابل توسیع ویب ایپلیکیشنز بنانے کے لیے Next.js اور React جیسے جدید ترین فریم ورکس استعمال کرتی ہے۔',
        features: [
          'کسٹم Next.js اور React ڈویلپمنٹ',
          'پروگریسو ویب ایپس (PWA)',
          'API انٹیگریشن اور ڈویلپمنٹ',
          'پرفارمنس آپٹیمائزیشن (Core Web Vitals)',
          'Headless CMS سلوشنز',
          'ریسپانسو اور موبائل-فرسٹ ڈیزائن',
        ],
        benefits: [
          'بجلی کی رفتار سے لوڈنگ',
          'بہتر SEO رینکنگ کی صلاحیت',
          'ترقی کے لیے قابل توسیع فن تعمیر',
          'محفوظ اور قابل دیکھ بھال کوڈ',
        ],
        content: {
          process: [
            { step: 1, title: 'دریافت اور حکمت عملی', description: 'ہم آپ کے کاروبار، سامعین، اور اہداف کو سمجھ کر تکنیکی روڈ میپ کی وضاحت کرتے ہیں۔' },
            { step: 2, title: 'UX/UI ڈیزائن', description: 'ہمارے ڈیزائنرز آپ کی برانڈ شناخت کے مطابق بدیہی، اعلیٰ معیار کے پروٹو ٹائپس بناتے ہیں۔' },
            { step: 3, title: 'ڈویلپمنٹ', description: 'ہم قابل توسیعی اور سیکیورٹی کو یقینی بناتے ہوئے جدید معیارات کا استعمال کرتے ہوئے صاف، معنی خیز کوڈ لکھتے ہیں۔' },
            { step: 4, title: 'ٹیسٹنگ اور لانچ', description: 'ڈیوائسز اور براؤزرز پر سخت جانچ بے عیب لانچ کو یقینی بناتی ہے۔' },
          ],
          faq: [
            { question: 'ویب سائٹ بنانے میں کتنا وقت لگتا ہے؟', answer: 'معیاری کارپوریٹ ویب سائٹ عام طور پر 4-6 ہفتے لیتی ہے، جبکہ زیادہ پیچیدہ ویب ایپلیکیشنز 3-6 ماہ لے سکتی ہیں۔' },
            { question: 'کیا آپ ہوسٹنگ اور مینٹیننس فراہم کرتے ہیں؟', answer: 'جی ہاں، ہم محفوظ ہوسٹنگ، روزانہ بیک اپ، اور باقاعدہ سیکیورٹی اپڈیٹس کے ساتھ جامع مینٹیننس پیکجز پیش کرتے ہیں۔' },
            { question: 'کیا میری ویب سائٹ موبائل-فرینڈلی ہوگی؟', answer: 'بالکل۔ ہم موبائل-فرسٹ اپروچ اپناتے ہیں تاکہ آپ کی سائٹ تمام ڈیوائسز پر بہترین نظر آئے اور کام کرے۔' },
            { question: 'کیا میں خود مواد اپڈیٹ کر سکتا ہوں؟', answer: 'جی ہاں، ہم صارف دوست CMS انٹیگریٹ کرتے ہیں جو آپ کو آسانی سے ٹیکسٹ، تصاویر اور بلاگ پوسٹس اپڈیٹ کرنے دیتے ہیں۔' },
          ],
        },
      },
    ];

    for (const translation of webDevTranslations) {
      await prisma.serviceTranslation.upsert({
        where: { serviceId_locale: { serviceId: translation.serviceId, locale: translation.locale } },
        update: { name: translation.name, shortDescription: translation.shortDescription, fullDescription: translation.fullDescription, features: translation.features, benefits: translation.benefits, content: translation.content as any },
        create: { serviceId: translation.serviceId, locale: translation.locale, name: translation.name, shortDescription: translation.shortDescription, fullDescription: translation.fullDescription, features: translation.features, benefits: translation.benefits, content: translation.content as any },
      });
    }
    console.log(`Seeded ${webDevTranslations.length} translations for web-development`);
  }

  // AI Solutions Translations
  const aiSolutionsService = await prisma.service.findUnique({ where: { slug: 'ai-solutions' } });
  if (aiSolutionsService) {
    const aiTranslations = [
      {
        serviceId: aiSolutionsService.id,
        locale: 'tr',
        name: 'Yapay Zeka Çözümleri',
        shortDescription: 'Akıllı otomasyon ve makine öğrenimi modelleri.',
        fullDescription: 'Yapay Zekanın gücünü açığa çıkarın. Tahminsel analizlerden doğal dil işleme chatbotlarına, en son AI modellerini iş akışlarınıza entegre ediyoruz. AI çözümlerimiz işletmelerin karmaşık süreçleri otomatikleştirmesine, verilerden eyleme dönüştürülebilir içgörüler elde etmesine ve müşterilere ölçekte kişiselleştirilmiş deneyimler sunmasına yardımcı olur.',
        features: [
          'Özel Makine Öğrenimi Modelleri',
          'Doğal Dil İşleme (NLP)',
          'Bilgisayarlı Görü Çözümleri',
          'Tahminsel Analitik & Tahminleme',
          'AI Destekli Chatbotlar & Sanal Asistanlar',
          'Öneri Sistemleri',
          'Duygu Analizi',
          'Anomali Tespiti',
        ],
        benefits: [
          'Tekrarlayan görevleri otomatikleştirin ve operasyonel maliyetleri azaltın',
          'Tahminsel içgörülerle veri odaklı kararlar alın',
          'Kişiselleştirme ile müşteri deneyimlerini geliştirin',
          'Orantılı iş gücü artışı olmadan operasyonları ölçeklendirin',
          'İnovasyon yoluyla rekabet avantajı kazanın',
          'Doğruluğu artırın ve insan hatasını azaltın',
        ],
        content: {
          process: [
            { step: 1, title: 'Problem Tanımı', description: 'AI\'nın en çok değer yaratabileceği yerleri belirlemek için iş zorluklarınızı analiz ediyor ve net başarı metrikleri tanımlıyoruz.' },
            { step: 2, title: 'Veri Değerlendirmesi', description: 'Model geliştirme için en iyi yaklaşımı belirlemek üzere veri kalitesi, kullanılabilirlik ve yapınızı değerlendiriyoruz.' },
            { step: 3, title: 'Model Geliştirme', description: 'Veri bilimcilerimiz en son algoritmalar ve framework\'ler kullanarak özel modeller oluşturup eğitiyor.' },
            { step: 4, title: 'Entegrasyon & Test', description: 'AI çözümünü mevcut sistemlerinize entegre ediyor ve kapsamlı test ve doğrulama yapıyoruz.' },
            { step: 5, title: 'Dağıtım & İzleme', description: 'Çözümü üretime alıyor ve model performansı ve doğruluğu için sürekli izleme kuruyoruz.' },
          ],
          faq: [
            { question: 'AI çözümleri için ne tür veriye ihtiyacım var?', answer: 'Veri gereksinimleri spesifik AI çözümüne bağlıdır. Genel olarak, kullanım durumunuzla ilgili geçmiş veriye ihtiyacınız var. Yapılandırılmış (veritabanları, tablolar) veya yapılandırılmamış (metin, görüntüler, ses) verilerle çalışabiliriz.' },
            { question: 'Bir AI çözümü geliştirmek ne kadar sürer?', answer: 'Kavram kanıtı 4-8 haftada geliştirilebilir. Tam üretim dağıtımı karmaşıklık, veri kullanılabilirliği ve entegrasyon gereksinimlerine bağlı olarak genellikle 3-6 ay sürer.' },
            { question: 'AI çözümleri mevcut sistemlerimizle entegre olabilir mi?', answer: 'Evet, AI çözümlerini entegrasyon düşünülerek tasarlıyoruz. Mevcut veritabanlarınıza, API\'lerinize, CRM sistemlerinize güvenli API\'ler ve veri pipeline\'ları aracılığıyla bağlanabiliriz.' },
            { question: 'AI model doğruluğunu ve güvenilirliğini nasıl sağlıyorsunuz?', answer: 'Titiz test metodolojileri, çapraz doğrulama ve sürekli izleme kullanıyoruz. Model performansını zaman içinde iyileştirmek için geri bildirim döngüleri ve model kaymasını tespit etmek için uyarı sistemleri uyguluyoruz.' },
          ],
        },
      },
      {
        serviceId: aiSolutionsService.id,
        locale: 'de',
        name: 'KI-Lösungen',
        shortDescription: 'Intelligente Automatisierung und Machine-Learning-Modelle.',
        fullDescription: 'Erschließen Sie die Kraft der Künstlichen Intelligenz. Von prädiktiver Analytik bis zu NLP-Chatbots integrieren wir modernste KI-Modelle in Ihre Workflows. Unsere KI-Lösungen helfen Unternehmen, komplexe Prozesse zu automatisieren, handlungsrelevante Erkenntnisse aus Daten zu gewinnen und personalisierte Kundenerlebnisse im großen Maßstab zu liefern.',
        features: [
          'Individuelle Machine-Learning-Modelle',
          'Natural Language Processing (NLP)',
          'Computer-Vision-Lösungen',
          'Prädiktive Analytik & Forecasting',
          'KI-gestützte Chatbots & Virtuelle Assistenten',
          'Empfehlungssysteme',
          'Sentiment-Analyse',
          'Anomalie-Erkennung',
        ],
        benefits: [
          'Repetitive Aufgaben automatisieren und Betriebskosten senken',
          'Datengestützte Entscheidungen mit prädiktiven Erkenntnissen treffen',
          'Kundenerlebnisse durch Personalisierung verbessern',
          'Operationen ohne proportionale Personalaufstockung skalieren',
          'Wettbewerbsvorteil durch Innovation gewinnen',
          'Genauigkeit verbessern und menschliche Fehler reduzieren',
        ],
        content: {
          process: [
            { step: 1, title: 'Problemdefinition', description: 'Wir analysieren Ihre Geschäftsherausforderungen, um herauszufinden, wo KI den größten Wert schaffen kann.' },
            { step: 2, title: 'Datenbewertung', description: 'Wir bewerten Ihre Datenqualität, -verfügbarkeit und -struktur, um den besten Ansatz für die Modellentwicklung zu bestimmen.' },
            { step: 3, title: 'Modellentwicklung', description: 'Unsere Data Scientists bauen und trainieren individuelle Modelle mit modernsten Algorithmen.' },
            { step: 4, title: 'Integration & Tests', description: 'Wir integrieren die KI-Lösung in Ihre bestehenden Systeme und führen gründliche Tests durch.' },
            { step: 5, title: 'Bereitstellung & Monitoring', description: 'Wir stellen die Lösung in Produktion bereit und richten kontinuierliches Monitoring für Modellleistung ein.' },
          ],
          faq: [
            { question: 'Welche Art von Daten benötige ich für KI-Lösungen?', answer: 'Die Datenanforderungen hängen von der spezifischen KI-Lösung ab. Generell benötigen Sie historische Daten, die für Ihren Anwendungsfall relevant sind.' },
            { question: 'Wie lange dauert die Entwicklung einer KI-Lösung?', answer: 'Ein Proof-of-Concept kann in 4-8 Wochen entwickelt werden. Vollständige Produktionsbereitstellung dauert typischerweise 3-6 Monate.' },
            { question: 'Können KI-Lösungen in unsere bestehenden Systeme integriert werden?', answer: 'Ja, wir entwerfen KI-Lösungen mit Blick auf Integration. Wir können uns mit Ihren bestehenden Datenbanken, APIs und CRM-Systemen verbinden.' },
            { question: 'Wie gewährleisten Sie KI-Modellgenauigkeit und Zuverlässigkeit?', answer: 'Wir verwenden rigorose Testmethoden, Kreuzvalidierung und kontinuierliches Monitoring. Wir implementieren auch Feedback-Schleifen zur Verbesserung.' },
          ],
        },
      },
      {
        serviceId: aiSolutionsService.id,
        locale: 'ar',
        name: 'حلول الذكاء الاصطناعي',
        shortDescription: 'أتمتة ذكية ونماذج تعلم الآلة.',
        fullDescription: 'أطلق العنان لقوة الذكاء الاصطناعي. من التحليلات التنبؤية إلى روبوتات الدردشة لمعالجة اللغة الطبيعية، نقوم بدمج أحدث نماذج الذكاء الاصطناعي في سير عملك. تساعد حلول الذكاء الاصطناعي لدينا الشركات على أتمتة العمليات المعقدة واكتساب رؤى قابلة للتنفيذ من البيانات وتقديم تجارب مخصصة للعملاء على نطاق واسع.',
        features: [
          'نماذج تعلم آلة مخصصة',
          'معالجة اللغة الطبيعية (NLP)',
          'حلول الرؤية الحاسوبية',
          'التحليلات التنبؤية والتوقعات',
          'روبوتات الدردشة والمساعدين الافتراضيين المدعومين بالذكاء الاصطناعي',
          'أنظمة التوصية',
          'تحليل المشاعر',
          'الكشف عن الشذوذ',
        ],
        benefits: [
          'أتمتة المهام المتكررة وخفض التكاليف التشغيلية',
          'اتخاذ قرارات مدعومة بالبيانات مع رؤى تنبؤية',
          'تحسين تجارب العملاء من خلال التخصيص',
          'توسيع العمليات دون زيادة متناسبة في القوى العاملة',
          'اكتساب ميزة تنافسية من خلال الابتكار',
          'تحسين الدقة وتقليل الأخطاء البشرية',
        ],
        content: {
          process: [
            { step: 1, title: 'تعريف المشكلة', description: 'نحلل تحديات عملك لتحديد أين يمكن للذكاء الاصطناعي خلق أكبر قيمة ونحدد مقاييس نجاح واضحة.' },
            { step: 2, title: 'تقييم البيانات', description: 'نقيم جودة بياناتك وتوفرها وبنيتها لتحديد أفضل نهج لتطوير النموذج.' },
            { step: 3, title: 'تطوير النموذج', description: 'يقوم علماء البيانات لدينا ببناء وتدريب نماذج مخصصة باستخدام أحدث الخوارزميات والأطر.' },
            { step: 4, title: 'التكامل والاختبار', description: 'نقوم بدمج حل الذكاء الاصطناعي في أنظمتك الحالية ونجري اختبارات وتحققات شاملة.' },
            { step: 5, title: 'النشر والمراقبة', description: 'ننشر الحل في الإنتاج ونقوم بإعداد مراقبة مستمرة لأداء النموذج ودقته.' },
          ],
          faq: [
            { question: 'ما نوع البيانات التي أحتاجها لحلول الذكاء الاصطناعي؟', answer: 'تعتمد متطلبات البيانات على حل الذكاء الاصطناعي المحدد. بشكل عام، تحتاج إلى بيانات تاريخية ذات صلة بحالة استخدامك.' },
            { question: 'كم يستغرق تطوير حل الذكاء الاصطناعي؟', answer: 'يمكن تطوير إثبات المفهوم في 4-8 أسابيع. عادةً ما يستغرق النشر الكامل في الإنتاج 3-6 أشهر.' },
            { question: 'هل يمكن لحلول الذكاء الاصطناعي التكامل مع أنظمتنا الحالية؟', answer: 'نعم، نصمم حلول الذكاء الاصطناعي مع مراعاة التكامل. يمكننا الاتصال بقواعد البيانات وواجهات برمجة التطبيقات وأنظمة CRM الحالية.' },
            { question: 'كيف تضمنون دقة وموثوقية نموذج الذكاء الاصطناعي؟', answer: 'نستخدم منهجيات اختبار صارمة والتحقق المتبادل والمراقبة المستمرة. كما ننفذ حلقات تغذية راجعة للتحسين.' },
          ],
        },
      },
      {
        serviceId: aiSolutionsService.id,
        locale: 'ur',
        name: 'AI سلوشنز',
        shortDescription: 'ذہین آٹومیشن اور مشین لرننگ ماڈلز۔',
        fullDescription: 'مصنوعی ذہانت کی طاقت کو کھولیں۔ پیشن گوئی کے تجزیات سے لے کر قدرتی زبان کی پروسیسنگ چیٹ بوٹس تک، ہم جدید ترین AI ماڈلز کو آپ کے ورک فلوز میں ضم کرتے ہیں۔ ہمارے AI سلوشنز کاروباروں کو پیچیدہ عمل کو خودکار بنانے، ڈیٹا سے قابل عمل بصیرت حاصل کرنے، اور صارفین کو بڑے پیمانے پر ذاتی نوعیت کے تجربات فراہم کرنے میں مدد کرتے ہیں۔',
        features: [
          'کسٹم مشین لرننگ ماڈلز',
          'نیچرل لینگویج پروسیسنگ (NLP)',
          'کمپیوٹر ویژن سلوشنز',
          'پریڈکٹو اینالیٹکس اور فورکاسٹنگ',
          'AI سے چلنے والے چیٹ بوٹس اور ورچوئل اسسٹنٹس',
          'ریکمنڈیشن سسٹمز',
          'سینٹیمنٹ اینالیسس',
          'انومالی ڈٹیکشن',
        ],
        benefits: [
          'دہرائے جانے والے کاموں کو خودکار بنائیں اور آپریشنل اخراجات کم کریں',
          'پیشن گوئی کی بصیرت کے ساتھ ڈیٹا سے چلنے والے فیصلے کریں',
          'ذاتی نوعیت کے ذریعے صارف کے تجربات کو بہتر بنائیں',
          'متناسب افرادی قوت میں اضافے کے بغیر آپریشنز کو بڑھائیں',
          'جدت طرازی کے ذریعے مسابقتی فائدہ حاصل کریں',
          'درستگی میں بہتری لائیں اور انسانی غلطی کو کم کریں',
        ],
        content: {
          process: [
            { step: 1, title: 'مسئلے کی تعریف', description: 'ہم آپ کے کاروباری چیلنجز کا تجزیہ کرتے ہیں تاکہ یہ شناخت کر سکیں کہ AI سب سے زیادہ قدر کہاں پیدا کر سکتا ہے۔' },
            { step: 2, title: 'ڈیٹا کا جائزہ', description: 'ہم ماڈل ڈیولپمنٹ کے لیے بہترین نقطہ نظر کا تعین کرنے کے لیے آپ کے ڈیٹا کے معیار، دستیابی اور ڈھانچے کا جائزہ لیتے ہیں۔' },
            { step: 3, title: 'ماڈل ڈیولپمنٹ', description: 'ہمارے ڈیٹا سائنسدان جدید ترین الگورتھمز کا استعمال کرتے ہوئے کسٹم ماڈلز بناتے اور ٹرین کرتے ہیں۔' },
            { step: 4, title: 'انٹیگریشن اور ٹیسٹنگ', description: 'ہم AI سلوشن کو آپ کے موجودہ سسٹمز میں ضم کرتے ہیں اور مکمل ٹیسٹنگ اور توثیق کرتے ہیں۔' },
            { step: 5, title: 'ڈپلائمنٹ اور مانیٹرنگ', description: 'ہم سلوشن کو پروڈکشن میں ڈپلائی کرتے ہیں اور ماڈل کی کارکردگی کے لیے مسلسل مانیٹرنگ سیٹ اپ کرتے ہیں۔' },
          ],
          faq: [
            { question: 'AI سلوشنز کے لیے مجھے کس قسم کے ڈیٹا کی ضرورت ہے؟', answer: 'ڈیٹا کی ضروریات مخصوص AI سلوشن پر منحصر ہیں۔ عام طور پر، آپ کو اپنے استعمال کے معاملے سے متعلق تاریخی ڈیٹا کی ضرورت ہے۔' },
            { question: 'AI سلوشن تیار کرنے میں کتنا وقت لگتا ہے؟', answer: 'پروف آف کانسیپٹ 4-8 ہفتوں میں تیار کیا جا سکتا ہے۔ مکمل پروڈکشن ڈپلائمنٹ عام طور پر 3-6 ماہ لیتی ہے۔' },
            { question: 'کیا AI سلوشنز ہمارے موجودہ سسٹمز کے ساتھ ضم ہو سکتے ہیں؟', answer: 'جی ہاں، ہم انٹیگریشن کو ذہن میں رکھتے ہوئے AI سلوشنز ڈیزائن کرتے ہیں۔ ہم آپ کے موجودہ ڈیٹا بیسز، APIs، CRM سسٹمز سے جڑ سکتے ہیں۔' },
            { question: 'آپ AI ماڈل کی درستگی اور قابل اعتماد کیسے یقینی بناتے ہیں؟', answer: 'ہم سخت ٹیسٹنگ طریقہ کار، کراس-ویلیڈیشن، اور مسلسل مانیٹرنگ استعمال کرتے ہیں۔ ہم بہتری کے لیے فیڈبیک لوپس بھی نافذ کرتے ہیں۔' },
          ],
        },
      },
    ];

    for (const translation of aiTranslations) {
      await prisma.serviceTranslation.upsert({
        where: { serviceId_locale: { serviceId: translation.serviceId, locale: translation.locale } },
        update: { name: translation.name, shortDescription: translation.shortDescription, fullDescription: translation.fullDescription, features: translation.features, benefits: translation.benefits, content: translation.content as any },
        create: { serviceId: translation.serviceId, locale: translation.locale, name: translation.name, shortDescription: translation.shortDescription, fullDescription: translation.fullDescription, features: translation.features, benefits: translation.benefits, content: translation.content as any },
      });
    }
    console.log(`Seeded ${aiTranslations.length} translations for ai-solutions`);
  }

  // Mobile Development Translations
  const mobileDevService = await prisma.service.findUnique({ where: { slug: 'mobile-development' } });
  if (mobileDevService) {
    const mobileTranslations = [
      {
        serviceId: mobileDevService.id,
        locale: 'tr',
        name: 'Mobil Geliştirme',
        shortDescription: 'Native ve cross-platform mobil uygulamalar.',
        fullDescription: 'Müşterilerinize nerede olurlarsa olsunlar ulaşın. iOS ve Android için güzel, kullanıcı dostu mobil uygulamalar tasarlıyor ve geliştiriyoruz. React Native ve Flutter gibi modern framework\'ler kullanarak, geliştirme maliyetlerini ve pazara çıkış süresini optimize ederken native benzeri deneyimler sunan yüksek performanslı uygulamalar sunuyoruz.',
        features: [
          'Native iOS Geliştirme (Swift)',
          'Native Android Geliştirme (Kotlin)',
          'Cross-Platform Geliştirme (React Native, Flutter)',
          'App Store Optimizasyonu (ASO)',
          'Push Bildirimleri & Gerçek Zamanlı Güncellemeler',
          'Offline-First Mimari',
          'Biyometrik Kimlik Doğrulama',
          'Uygulama İçi Satın Alımlar & Abonelikler',
        ],
        benefits: [
          'Hem iOS hem Android platformlarında kullanıcılara ulaşın',
          'Cross-platform verimliliği ile native benzeri performans',
          'Paylaşılan kod tabanı ile daha hızlı pazara çıkış',
          'Azaltılmış geliştirme ve bakım maliyetleri',
          'Cihaz özellikleriyle sorunsuz entegrasyon',
          'Düzenli güncellemeler ve özellik geliştirmeleri',
        ],
        content: {
          process: [
            { step: 1, title: 'Keşif & Planlama', description: 'Uygulama gereksinimlerinizi, hedef kitlenizi ve temel özelliklerinizi tanımlıyoruz, detaylı wireframe\'ler ve kullanıcı akışları oluşturuyoruz.' },
            { step: 2, title: 'UI/UX Tasarım', description: 'Tasarımcılarımız en iyi kullanıcı deneyimi için iOS ve Android tasarım yönergelerini takip eden çarpıcı, sezgisel arayüzler oluşturur.' },
            { step: 3, title: 'Geliştirme & İterasyon', description: 'Uygulamanızı çevik metodoloji kullanarak oluşturuyoruz, düzenli güncellemeler sunuyor ve süreç boyunca geri bildirim dahil ediyoruz.' },
            { step: 4, title: 'Kalite Güvencesi', description: 'Birden fazla cihaz ve işletim sistemi sürümünde kapsamlı test, uygulamanızın tüm kullanıcılar için kusursuz çalışmasını sağlar.' },
            { step: 5, title: 'Lansman & Destek', description: 'Uygulama mağazası başvurularını, lansman pazarlama desteğini yönetiyoruz ve sürekli bakım ve güncellemeler sağlıyoruz.' },
          ],
          faq: [
            { question: 'Native mi yoksa cross-platform uygulama mı geliştirmeliyim?', answer: 'Gereksinimlerinize bağlıdır. Cross-platform (React Native, Flutter) daha hızlı geliştirme ve düşük maliyetlerle çoğu uygulama için idealdir. Maksimum performans veya derin platform entegrasyonu gerektiren uygulamalar için native geliştirme daha iyidir.' },
            { question: 'Mobil uygulama geliştirme maliyeti ne kadar?', answer: 'Maliyetler karmaşıklık, özellikler ve platform seçimine göre değişir. Basit bir uygulama 25.000$\'dan başlayabilirken, gelişmiş özelliklere sahip karmaşık uygulamalar 75.000$ ile 250.000$+ arasında değişebilir.' },
            { question: 'Mobil uygulama geliştirmek ne kadar sürer?', answer: 'Minimum uygulanabilir ürün (MVP) genellikle 3-4 ay sürer. Tam özellikli uygulamalar karmaşıklığa ve hedeflenen platform sayısına bağlı olarak genellikle 6-12 ay gerektirir.' },
            { question: 'Uygulama mağazası gönderimi konusunda yardımcı oluyor musunuz?', answer: 'Evet, hem Apple App Store hem de Google Play Store için tüm gerekli varlıkları, açıklamaları hazırlama ve mağaza yönergelerine uyumu sağlama dahil olmak üzere tüm gönderim sürecini yönetiyoruz.' },
          ],
        },
      },
      {
        serviceId: mobileDevService.id,
        locale: 'de',
        name: 'Mobile Entwicklung',
        shortDescription: 'Native und plattformübergreifende mobile Apps.',
        fullDescription: 'Erreichen Sie Ihre Kunden, wo immer sie sind. Wir entwerfen und entwickeln schöne, benutzerfreundliche mobile Anwendungen für iOS und Android. Mit modernen Frameworks wie React Native und Flutter liefern wir leistungsstarke Apps mit nativer Benutzererfahrung bei optimierten Entwicklungskosten und kürzerer Time-to-Market.',
        features: [
          'Native iOS-Entwicklung (Swift)',
          'Native Android-Entwicklung (Kotlin)',
          'Plattformübergreifende Entwicklung (React Native, Flutter)',
          'App Store Optimierung (ASO)',
          'Push-Benachrichtigungen & Echtzeit-Updates',
          'Offline-First-Architektur',
          'Biometrische Authentifizierung',
          'In-App-Käufe & Abonnements',
        ],
        benefits: [
          'Nutzer auf iOS und Android Plattformen erreichen',
          'Native Leistung mit plattformübergreifender Effizienz',
          'Schnellere Time-to-Market mit geteilter Codebasis',
          'Reduzierte Entwicklungs- und Wartungskosten',
          'Nahtlose Integration mit Gerätefunktionen',
          'Regelmäßige Updates und Feature-Erweiterungen',
        ],
        content: {
          process: [
            { step: 1, title: 'Entdeckung & Planung', description: 'Wir definieren Ihre App-Anforderungen, Zielgruppe und Kernfunktionen und erstellen detaillierte Wireframes und User Flows.' },
            { step: 2, title: 'UI/UX Design', description: 'Unsere Designer erstellen beeindruckende, intuitive Oberflächen nach iOS und Android Design-Richtlinien für die beste Benutzererfahrung.' },
            { step: 3, title: 'Entwicklung & Iteration', description: 'Wir bauen Ihre App mit agiler Methodik, liefern regelmäßige Updates und integrieren Feedback während des gesamten Prozesses.' },
            { step: 4, title: 'Qualitätssicherung', description: 'Umfassende Tests auf mehreren Geräten und OS-Versionen stellen sicher, dass Ihre App für alle Nutzer einwandfrei funktioniert.' },
            { step: 5, title: 'Launch & Support', description: 'Wir kümmern uns um App-Store-Einreichungen, Launch-Marketing-Support und bieten fortlaufende Wartung und Updates.' },
          ],
          faq: [
            { question: 'Sollte ich eine native oder plattformübergreifende App entwickeln?', answer: 'Es hängt von Ihren Anforderungen ab. Plattformübergreifend (React Native, Flutter) ist ideal für die meisten Apps mit schnellerer Entwicklung und geringeren Kosten. Native Entwicklung ist besser für Apps, die maximale Leistung erfordern.' },
            { question: 'Wie viel kostet die Entwicklung einer mobilen App?', answer: 'Die Kosten variieren je nach Komplexität, Funktionen und Plattformwahl. Eine einfache App kann bei 25.000$ beginnen, komplexe Apps mit erweiterten Funktionen können zwischen 75.000$ und 250.000$+ liegen.' },
            { question: 'Wie lange dauert es, eine mobile App zu entwickeln?', answer: 'Ein Minimum Viable Product (MVP) dauert typischerweise 3-4 Monate. Voll ausgestattete Apps benötigen in der Regel 6-12 Monate je nach Komplexität.' },
            { question: 'Helfen Sie bei der App-Store-Einreichung?', answer: 'Ja, wir übernehmen den gesamten Einreichungsprozess für Apple App Store und Google Play Store, einschließlich aller erforderlichen Assets und Beschreibungen.' },
          ],
        },
      },
      {
        serviceId: mobileDevService.id,
        locale: 'ar',
        name: 'تطوير تطبيقات الجوال',
        shortDescription: 'تطبيقات جوال أصلية ومتعددة المنصات.',
        fullDescription: 'تواصل مع عملائك أينما كانوا. نحن نصمم ونطور تطبيقات جوال جميلة وسهلة الاستخدام لنظامي iOS و Android. باستخدام أطر عمل حديثة مثل React Native و Flutter، نقدم تطبيقات عالية الأداء توفر تجارب شبيهة بالتطبيقات الأصلية مع تحسين تكاليف التطوير ووقت الوصول للسوق.',
        features: [
          'تطوير iOS أصلي (Swift)',
          'تطوير Android أصلي (Kotlin)',
          'تطوير متعدد المنصات (React Native، Flutter)',
          'تحسين متجر التطبيقات (ASO)',
          'إشعارات الدفع والتحديثات الفورية',
          'بنية أوفلاين أولاً',
          'المصادقة البيومترية',
          'عمليات الشراء والاشتراكات داخل التطبيق',
        ],
        benefits: [
          'الوصول للمستخدمين على منصتي iOS و Android',
          'أداء شبيه بالأصلي مع كفاءة متعددة المنصات',
          'وصول أسرع للسوق مع قاعدة كود مشتركة',
          'تكاليف تطوير وصيانة مخفضة',
          'تكامل سلس مع ميزات الجهاز',
          'تحديثات منتظمة وتحسينات الميزات',
        ],
        content: {
          process: [
            { step: 1, title: 'الاكتشاف والتخطيط', description: 'نحدد متطلبات تطبيقك وجمهورك المستهدف والميزات الأساسية مع إنشاء wireframes وتدفقات المستخدم المفصلة.' },
            { step: 2, title: 'تصميم UI/UX', description: 'يقوم مصممونا بإنشاء واجهات مذهلة وبديهية تتبع إرشادات تصميم iOS و Android للحصول على أفضل تجربة مستخدم.' },
            { step: 3, title: 'التطوير والتكرار', description: 'نبني تطبيقك باستخدام منهجية Agile، ونقدم تحديثات منتظمة وندمج الملاحظات طوال العملية.' },
            { step: 4, title: 'ضمان الجودة', description: 'يضمن الاختبار الشامل على أجهزة متعددة وإصدارات نظام التشغيل أن تطبيقك يعمل بشكل مثالي لجميع المستخدمين.' },
            { step: 5, title: 'الإطلاق والدعم', description: 'نتعامل مع إرسال متجر التطبيقات ودعم تسويق الإطلاق ونوفر الصيانة والتحديثات المستمرة.' },
          ],
          faq: [
            { question: 'هل يجب أن أبني تطبيقاً أصلياً أم متعدد المنصات؟', answer: 'يعتمد على متطلباتك. متعدد المنصات (React Native، Flutter) مثالي لمعظم التطبيقات مع تطوير أسرع وتكاليف أقل. التطوير الأصلي أفضل للتطبيقات التي تتطلب أقصى أداء.' },
            { question: 'كم تكلفة تطوير تطبيق جوال؟', answer: 'تختلف التكاليف بناءً على التعقيد والميزات واختيار المنصة. قد يبدأ تطبيق بسيط من 25,000 دولار، بينما التطبيقات المعقدة قد تتراوح بين 75,000 و 250,000+ دولار.' },
            { question: 'كم يستغرق بناء تطبيق جوال؟', answer: 'يستغرق الحد الأدنى من المنتج القابل للتطبيق (MVP) عادةً 3-4 أشهر. تتطلب التطبيقات كاملة الميزات عادةً 6-12 شهراً.' },
            { question: 'هل تساعدون في إرسال متجر التطبيقات؟', answer: 'نعم، نتعامل مع عملية الإرسال الكاملة لكل من Apple App Store و Google Play Store، بما في ذلك إعداد جميع الأصول والأوصاف المطلوبة.' },
          ],
        },
      },
      {
        serviceId: mobileDevService.id,
        locale: 'ur',
        name: 'موبائل ڈویلپمنٹ',
        shortDescription: 'نیٹو اور کراس پلیٹ فارم موبائل ایپس۔',
        fullDescription: 'اپنے صارفین تک پہنچیں جہاں بھی وہ ہوں۔ ہم iOS اور Android کے لیے خوبصورت، صارف دوست موبائل ایپلیکیشنز ڈیزائن اور ڈویلپ کرتے ہیں۔ React Native اور Flutter جیسے جدید فریم ورکس استعمال کرتے ہوئے، ہم ہائی پرفارمنس ایپس فراہم کرتے ہیں جو ڈویلپمنٹ لاگت اور ٹائم ٹو مارکیٹ کو بہتر بناتے ہوئے نیٹو جیسے تجربات فراہم کرتی ہیں۔',
        features: [
          'نیٹو iOS ڈویلپمنٹ (Swift)',
          'نیٹو Android ڈویلپمنٹ (Kotlin)',
          'کراس پلیٹ فارم ڈویلپمنٹ (React Native، Flutter)',
          'App Store آپٹیمائزیشن (ASO)',
          'پش نوٹیفیکیشنز اور ریئل ٹائم اپڈیٹس',
          'آف لائن فرسٹ آرکیٹیکچر',
          'بائیومیٹرک تصدیق',
          'ان ایپ خریداریاں اور سبسکرپشنز',
        ],
        benefits: [
          'iOS اور Android دونوں پلیٹ فارمز پر صارفین تک پہنچیں',
          'کراس پلیٹ فارم کارکردگی کے ساتھ نیٹو جیسی پرفارمنس',
          'مشترکہ کوڈ بیس کے ساتھ تیز تر مارکیٹ تک رسائی',
          'کم ڈویلپمنٹ اور مینٹیننس اخراجات',
          'ڈیوائس فیچرز کے ساتھ بغیر کسی رکاوٹ کے انٹیگریشن',
          'باقاعدہ اپڈیٹس اور فیچر میں بہتری',
        ],
        content: {
          process: [
            { step: 1, title: 'دریافت اور منصوبہ بندی', description: 'ہم آپ کی ایپ کی ضروریات، ہدف سامعین، اور بنیادی خصوصیات کی وضاحت کرتے ہیں جبکہ تفصیلی وائر فریمز اور یوزر فلوز بناتے ہیں۔' },
            { step: 2, title: 'UI/UX ڈیزائن', description: 'ہمارے ڈیزائنرز بہترین یوزر ایکسپیرینس کے لیے iOS اور Android ڈیزائن گائیڈ لائنز کی پیروی کرتے ہوئے شاندار، بدیہی انٹرفیس بناتے ہیں۔' },
            { step: 3, title: 'ڈویلپمنٹ اور تکرار', description: 'ہم ایجائل میتھڈولوجی استعمال کرتے ہوئے آپ کی ایپ بناتے ہیں، باقاعدہ اپڈیٹس فراہم کرتے ہیں اور پورے عمل میں فیڈبیک شامل کرتے ہیں۔' },
            { step: 4, title: 'کوالٹی ایشورنس', description: 'متعدد ڈیوائسز اور OS ورژنز پر جامع ٹیسٹنگ یقینی بناتی ہے کہ آپ کی ایپ تمام صارفین کے لیے بے عیب کام کرے۔' },
            { step: 5, title: 'لانچ اور سپورٹ', description: 'ہم ایپ اسٹور سبمیشنز، لانچ مارکیٹنگ سپورٹ سنبھالتے ہیں اور جاری مینٹیننس اور اپڈیٹس فراہم کرتے ہیں۔' },
          ],
          faq: [
            { question: 'کیا مجھے نیٹو یا کراس پلیٹ فارم ایپ بنانی چاہیے؟', answer: 'یہ آپ کی ضروریات پر منحصر ہے۔ کراس پلیٹ فارم (React Native، Flutter) تیز ڈویلپمنٹ اور کم لاگت کے ساتھ زیادہ تر ایپس کے لیے مثالی ہے۔ زیادہ سے زیادہ پرفارمنس کی ضرورت والی ایپس کے لیے نیٹو ڈویلپمنٹ بہتر ہے۔' },
            { question: 'موبائل ایپ ڈویلپمنٹ کی لاگت کتنی ہے؟', answer: 'لاگت پیچیدگی، فیچرز، اور پلیٹ فارم کے انتخاب کی بنیاد پر مختلف ہوتی ہے۔ ایک سادہ ایپ $25,000 سے شروع ہو سکتی ہے، جبکہ پیچیدہ ایپس $75,000 سے $250,000+ تک ہو سکتی ہیں۔' },
            { question: 'موبائل ایپ بنانے میں کتنا وقت لگتا ہے؟', answer: 'MVP عام طور پر 3-4 ماہ لیتا ہے۔ مکمل فیچرڈ ایپس کو عام طور پر پیچیدگی کے لحاظ سے 6-12 ماہ درکار ہوتے ہیں۔' },
            { question: 'کیا آپ ایپ اسٹور سبمیشن میں مدد کرتے ہیں؟', answer: 'جی ہاں، ہم Apple App Store اور Google Play Store دونوں کے لیے پورے سبمیشن عمل کو سنبھالتے ہیں، بشمول تمام مطلوبہ اثاثے اور وضاحتیں تیار کرنا۔' },
          ],
        },
      },
    ];

    for (const translation of mobileTranslations) {
      await prisma.serviceTranslation.upsert({
        where: { serviceId_locale: { serviceId: translation.serviceId, locale: translation.locale } },
        update: { name: translation.name, shortDescription: translation.shortDescription, fullDescription: translation.fullDescription, features: translation.features, benefits: translation.benefits, content: translation.content as any },
        create: { serviceId: translation.serviceId, locale: translation.locale, name: translation.name, shortDescription: translation.shortDescription, fullDescription: translation.fullDescription, features: translation.features, benefits: translation.benefits, content: translation.content as any },
      });
    }
    console.log(`Seeded ${mobileTranslations.length} translations for mobile-development`);
  }

  // ==================== BATCH 2: Python Automation, Data Analytics, Machine Learning ====================

  // Python Automation Translations
  const pythonAutoService = await prisma.service.findUnique({ where: { slug: 'python-automation' } });
  if (pythonAutoService) {
    const pythonTranslations = [
      {
        serviceId: pythonAutoService.id,
        locale: 'tr',
        name: 'Python Otomasyonu',
        shortDescription: 'Python ile iş akışlarını ve süreçleri otomatikleştirin.',
        fullDescription: 'Tekrarlayan görevleri ortadan kaldırın ve özel Python otomasyon çözümleriyle üretkenliğinizi artırın. Web scraping ve veri işlemeden rapor oluşturma ve sistem entegrasyonuna kadar, saatlerce manuel işten tasarruf sağlayan scriptler ve uygulamalar geliştiriyoruz.',
        features: ['Web Scraping & Veri Çıkarma', 'Rapor Oluşturma & Otomasyon', 'Dosya İşleme & Dönüşüm', 'E-posta & İletişim Otomasyonu', 'Veritabanı İşlemleri & Migrasyon', 'API Entegrasyon Scriptleri', 'Zamanlanmış Görev Otomasyonu', 'Test & QA Otomasyonu'],
        benefits: ['Tekrarlayan görevlerde yüzlerce saat tasarruf edin', 'Veri işlemede insan hatasını azaltın', '7/24 otomatik işlemleri etkinleştirin', 'Personeli daha değerli işlere yönlendirin', 'Veri doğruluğunu ve tutarlılığını artırın', 'Personel eklemeden operasyonları ölçeklendirin'],
        content: {
          process: [
            { step: 1, title: 'Süreç Analizi', description: 'Mevcut manuel süreçlerinizi belgeliyor, otomasyon fırsatlarını belirliyoruz.' },
            { step: 2, title: 'Çözüm Tasarımı', description: 'Veri akışları, hata yönetimi ve zamanlama gereksinimleri dahil otomasyon mimarisini tasarlıyoruz.' },
            { step: 3, title: 'Geliştirme', description: 'Uygun loglama, hata yönetimi ve yapılandırma yönetimi ile temiz, iyi belgelenmiş Python kodu yazıyoruz.' },
            { step: 4, title: 'Test & Doğrulama', description: 'Güvenilirliği sağlamak için çeşitli senaryolar ve uç durumlarla otomasyonu kapsamlı test ediyoruz.' },
            { step: 5, title: 'Dağıtım & Eğitim', description: 'Çözümü dağıtıyor, zamanlamayı ayarlıyor ve ekibinizi kullanım ve temel bakım konusunda eğitiyoruz.' },
          ],
          faq: [
            { question: 'Hangi tür görevler otomatikleştirilebilir?', answer: 'Hemen hemen her tekrarlayan bilgisayar görevi: veri girişi, rapor oluşturma, dosya yönetimi, web scraping, e-posta işleme, sosyal medya paylaşımı, veritabanı işlemleri ve sistem entegrasyonları.' },
            { question: 'Web scraping yasal mı?', answer: 'Web sitesinin kullanım şartlarına ve yargı yetkisine bağlıdır. Scraping çözümlerimizin robots.txt, hız limitleri ve kullanım şartlarına uymasını sağlıyoruz.' },
          ],
        },
      },
      {
        serviceId: pythonAutoService.id,
        locale: 'de',
        name: 'Python-Automatisierung',
        shortDescription: 'Automatisieren Sie Workflows und Prozesse mit Python.',
        fullDescription: 'Eliminieren Sie repetitive Aufgaben und steigern Sie Ihre Produktivität mit maßgeschneiderten Python-Automatisierungslösungen. Von Web-Scraping und Datenverarbeitung bis hin zur Berichtserstellung und Systemintegration entwickeln wir Skripte und Anwendungen, die Stunden manueller Arbeit einsparen.',
        features: ['Web-Scraping & Datenextraktion', 'Berichtserstellung & Automatisierung', 'Dateiverarbeitung & Transformation', 'E-Mail- & Kommunikationsautomatisierung', 'Datenbankoperationen & Migration', 'API-Integrationsskripte', 'Geplante Aufgabenautomatisierung', 'Test- & QA-Automatisierung'],
        benefits: ['Hunderte Stunden bei repetitiven Aufgaben sparen', 'Menschliche Fehler bei der Datenverarbeitung reduzieren', '24/7 automatisierte Abläufe ermöglichen', 'Mitarbeiter für höherwertige Arbeit freisetzen', 'Datengenauigkeit und -konsistenz verbessern', 'Operationen ohne zusätzliches Personal skalieren'],
        content: {
          process: [
            { step: 1, title: 'Prozessanalyse', description: 'Wir dokumentieren Ihre aktuellen manuellen Prozesse und identifizieren Automatisierungsmöglichkeiten.' },
            { step: 2, title: 'Lösungsdesign', description: 'Wir entwerfen die Automatisierungsarchitektur einschließlich Datenflüsse und Fehlerbehandlung.' },
            { step: 3, title: 'Entwicklung', description: 'Wir schreiben sauberen, gut dokumentierten Python-Code mit ordnungsgemäßer Protokollierung.' },
            { step: 4, title: 'Test & Validierung', description: 'Wir testen die Automatisierung gründlich mit verschiedenen Szenarien und Randfällen.' },
            { step: 5, title: 'Bereitstellung & Schulung', description: 'Wir stellen die Lösung bereit und schulen Ihr Team in Nutzung und grundlegender Wartung.' },
          ],
          faq: [
            { question: 'Welche Arten von Aufgaben können automatisiert werden?', answer: 'Fast jede repetitive Computeraufgabe: Dateneingabe, Berichtserstellung, Dateiverwaltung, Web-Scraping, E-Mail-Verarbeitung, Social-Media-Posting, Datenbankoperationen und Systemintegrationen.' },
          ],
        },
      },
      {
        serviceId: pythonAutoService.id,
        locale: 'ar',
        name: 'أتمتة Python',
        shortDescription: 'أتمتة سير العمل والعمليات باستخدام Python.',
        fullDescription: 'تخلص من المهام المتكررة وعزز إنتاجيتك باستخدام حلول أتمتة Python المخصصة. من استخراج البيانات من الويب ومعالجة البيانات إلى إنشاء التقارير وتكامل الأنظمة، نبني نصوصاً برمجية وتطبيقات توفر ساعات من العمل اليدوي.',
        features: ['استخراج البيانات من الويب', 'إنشاء التقارير والأتمتة', 'معالجة وتحويل الملفات', 'أتمتة البريد الإلكتروني والاتصالات', 'عمليات قواعد البيانات والترحيل', 'نصوص تكامل API', 'أتمتة المهام المجدولة', 'أتمتة الاختبار وضمان الجودة'],
        benefits: ['وفر مئات الساعات في المهام المتكررة', 'قلل الأخطاء البشرية في معالجة البيانات', 'مكّن العمليات الآلية على مدار الساعة', 'حرر الموظفين للعمل ذي القيمة الأعلى', 'حسّن دقة البيانات واتساقها', 'وسّع العمليات دون إضافة موظفين'],
        content: {
          process: [
            { step: 1, title: 'تحليل العمليات', description: 'نوثق عملياتك اليدوية الحالية ونحدد فرص الأتمتة.' },
            { step: 2, title: 'تصميم الحل', description: 'نصمم بنية الأتمتة بما في ذلك تدفقات البيانات ومعالجة الأخطاء.' },
            { step: 3, title: 'التطوير', description: 'نكتب كود Python نظيفاً وموثقاً جيداً مع التسجيل ومعالجة الأخطاء المناسبة.' },
            { step: 4, title: 'الاختبار والتحقق', description: 'نختبر الأتمتة بشكل شامل مع سيناريوهات وحالات حدية متنوعة.' },
            { step: 5, title: 'النشر والتدريب', description: 'ننشر الحل ونعد الجدولة وندرب فريقك على الاستخدام والصيانة الأساسية.' },
          ],
          faq: [
            { question: 'ما أنواع المهام التي يمكن أتمتتها؟', answer: 'تقريباً أي مهمة كمبيوتر متكررة: إدخال البيانات، إنشاء التقارير، إدارة الملفات، استخراج البيانات من الويب، معالجة البريد الإلكتروني، النشر على وسائل التواصل الاجتماعي، عمليات قواعد البيانات، وتكامل الأنظمة.' },
          ],
        },
      },
      {
        serviceId: pythonAutoService.id,
        locale: 'ur',
        name: 'Python آٹومیشن',
        shortDescription: 'Python کے ساتھ ورک فلوز اور عمل کو خودکار بنائیں۔',
        fullDescription: 'دہرائے جانے والے کاموں کو ختم کریں اور کسٹم Python آٹومیشن سلوشنز کے ساتھ اپنی پیداواری صلاحیت کو بڑھائیں۔ ویب سکریپنگ اور ڈیٹا پروسیسنگ سے لے کر رپورٹ جنریشن اور سسٹم انٹیگریشن تک، ہم سکرپٹس اور ایپلیکیشنز بناتے ہیں جو گھنٹوں کے دستی کام کو بچاتے ہیں۔',
        features: ['ویب سکریپنگ اور ڈیٹا نکالنا', 'رپورٹ جنریشن اور آٹومیشن', 'فائل پروسیسنگ اور تبدیلی', 'ای میل اور کمیونیکیشن آٹومیشن', 'ڈیٹا بیس آپریشنز اور مائیگریشن', 'API انٹیگریشن سکرپٹس', 'شیڈیولڈ ٹاسک آٹومیشن', 'ٹیسٹنگ اور QA آٹومیشن'],
        benefits: ['دہرائے جانے والے کاموں میں سینکڑوں گھنٹے بچائیں', 'ڈیٹا پروسیسنگ میں انسانی غلطی کم کریں', '24/7 خودکار آپریشنز کو فعال کریں', 'عملے کو زیادہ قیمتی کام کے لیے آزاد کریں', 'ڈیٹا کی درستگی اور مطابقت کو بہتر بنائیں', 'عملے کو بڑھائے بغیر آپریشنز کو بڑھائیں'],
        content: {
          process: [
            { step: 1, title: 'عمل کا تجزیہ', description: 'ہم آپ کے موجودہ دستی عمل کو دستاویز کرتے ہیں اور آٹومیشن کے مواقع کی شناخت کرتے ہیں۔' },
            { step: 2, title: 'حل کی ڈیزائن', description: 'ہم ڈیٹا فلوز اور ایرر ہینڈلنگ سمیت آٹومیشن آرکیٹیکچر ڈیزائن کرتے ہیں۔' },
            { step: 3, title: 'ڈویلپمنٹ', description: 'ہم مناسب لاگنگ اور ایرر ہینڈلنگ کے ساتھ صاف، اچھی طرح سے دستاویز شدہ Python کوڈ لکھتے ہیں۔' },
            { step: 4, title: 'ٹیسٹنگ اور توثیق', description: 'ہم مختلف منظرناموں اور ایج کیسز کے ساتھ آٹومیشن کی مکمل جانچ کرتے ہیں۔' },
            { step: 5, title: 'ڈپلائمنٹ اور ٹریننگ', description: 'ہم حل ڈپلائی کرتے ہیں اور آپ کی ٹیم کو استعمال اور بنیادی دیکھ بھال کی تربیت دیتے ہیں۔' },
          ],
          faq: [
            { question: 'کون سی قسم کے کام خودکار ہو سکتے ہیں؟', answer: 'تقریباً ہر دہرایا جانے والا کمپیوٹر ٹاسک: ڈیٹا انٹری، رپورٹ جنریشن، فائل مینجمنٹ، ویب سکریپنگ، ای میل پروسیسنگ، سوشل میڈیا پوسٹنگ، ڈیٹا بیس آپریشنز، اور سسٹم انٹیگریشنز۔' },
          ],
        },
      },
    ];
    for (const t of pythonTranslations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log(`Seeded ${pythonTranslations.length} translations for python-automation`);
  }

  // Data Analytics Translations
  const dataAnalyticsService = await prisma.service.findUnique({ where: { slug: 'data-analytics' } });
  if (dataAnalyticsService) {
    const dataAnalyticsTranslations = [
      {
        serviceId: dataAnalyticsService.id,
        locale: 'tr',
        name: 'Veri Analitiği',
        shortDescription: 'Ham veriyi eyleme dönüştürülebilir iş içgörülerine dönüştürün.',
        fullDescription: 'Verilerinizi rekabet avantajına dönüştürün. Veri analitiği hizmetlerimiz, daha iyi iş kararları almanızı sağlayan kalıpları, trendleri ve içgörüleri ortaya çıkarmak için veri toplama, işleme ve görselleştirme konusunda yardımcı olur.',
        features: ['İş Zekası Panelleri', 'Gerçek Zamanlı Veri Görselleştirme', 'ETL Pipeline Geliştirme', 'Veri Ambarı Tasarımı', 'Özel Raporlama Çözümleri', 'KPI İzleme & Takip', 'Veri Kalite Yönetimi', 'Self-Servis Analitik Araçları'],
        benefits: ['Daha hızlı, veriye dayalı kararlar alın', 'Gelir fırsatlarını ve maliyet tasarruflarını belirleyin', 'Müşteri davranışını ve tercihlerini anlayın', 'İş performansını gerçek zamanlı izleyin', 'Gelecekteki trendleri ve pazar değişikliklerini tahmin edin', 'Operasyonel verimliliği artırın'],
        content: {
          process: [
            { step: 1, title: 'Veri Keşfi', description: 'Mevcut veri kaynaklarınızı denetliyor, veri kalitesi sorunlarını belirliyoruz.' },
            { step: 2, title: 'Mimari Tasarım', description: 'Veri pipeline\'ları, depolama çözümleri ve işleme framework\'leri dahil ölçeklenebilir veri mimarisi tasarlıyoruz.' },
            { step: 3, title: 'Veri Entegrasyonu', description: 'Birden fazla kaynaktan veri çıkarmak, dönüştürmek ve birleşik veri ambarına yüklemek için ETL pipeline\'ları oluşturuyoruz.' },
            { step: 4, title: 'Görselleştirme & Raporlama', description: 'Paydaşlar için anlaşılması kolay formatta içgörüler sunan etkileşimli paneller ve raporlar oluşturuyoruz.' },
            { step: 5, title: 'Eğitim & Optimizasyon', description: 'Ekibinizi analitik araçlar konusunda eğitiyor ve kullanıcı geri bildirimlerine göre panelleri sürekli optimize ediyoruz.' },
          ],
          faq: [
            { question: 'Hangi veri kaynaklarını entegre edebilirsiniz?', answer: 'Veritabanları, API\'ler, bulut hizmetleri, elektronik tablolar, CRM sistemleri, pazarlama platformları ve IoT cihazları dahil neredeyse her veri kaynağını entegre edebiliriz.' },
            { question: 'Veri güvenliğini ve gizliliğini nasıl sağlıyorsunuz?', answer: 'Şifreleme, erişim kontrolleri, veri maskeleme ve GDPR ve CCPA gibi düzenlemelere uyum dahil endüstri standardı güvenlik uygulamalarını uyguluyoruz.' },
          ],
        },
      },
      {
        serviceId: dataAnalyticsService.id,
        locale: 'de',
        name: 'Datenanalyse',
        shortDescription: 'Verwandeln Sie Rohdaten in umsetzbare Geschäftserkenntnisse.',
        fullDescription: 'Machen Sie Ihre Daten zu einem Wettbewerbsvorteil. Unsere Datenanalyse-Services helfen Ihnen, Daten zu sammeln, zu verarbeiten und zu visualisieren, um Muster, Trends und Erkenntnisse aufzudecken, die bessere Geschäftsentscheidungen ermöglichen.',
        features: ['Business-Intelligence-Dashboards', 'Echtzeit-Datenvisualisierung', 'ETL-Pipeline-Entwicklung', 'Data-Warehouse-Design', 'Individuelle Berichtslösungen', 'KPI-Tracking & Monitoring', 'Datenqualitätsmanagement', 'Self-Service-Analysetools'],
        benefits: ['Schnellere, datengestützte Entscheidungen treffen', 'Umsatzchancen und Kosteneinsparungen identifizieren', 'Kundenverhalten und -präferenzen verstehen', 'Geschäftsleistung in Echtzeit überwachen', 'Zukünftige Trends und Marktveränderungen vorhersagen', 'Betriebseffizienz verbessern'],
        content: {
          process: [
            { step: 1, title: 'Datenentdeckung', description: 'Wir prüfen Ihre bestehenden Datenquellen und identifizieren Datenqualitätsprobleme.' },
            { step: 2, title: 'Architekturdesign', description: 'Wir entwerfen eine skalierbare Datenarchitektur mit Pipelines, Speicherlösungen und Verarbeitungsframeworks.' },
            { step: 3, title: 'Datenintegration', description: 'Wir bauen ETL-Pipelines, um Daten aus mehreren Quellen in ein einheitliches Data Warehouse zu laden.' },
            { step: 4, title: 'Visualisierung & Berichterstattung', description: 'Wir erstellen interaktive Dashboards und Berichte, die Erkenntnisse verständlich präsentieren.' },
            { step: 5, title: 'Schulung & Optimierung', description: 'Wir schulen Ihr Team in Analysetools und optimieren Dashboards basierend auf Feedback.' },
          ],
          faq: [
            { question: 'Welche Datenquellen können Sie integrieren?', answer: 'Wir können praktisch jede Datenquelle integrieren: Datenbanken, APIs, Cloud-Services, Tabellen, CRM-Systeme, Marketing-Plattformen und IoT-Geräte.' },
          ],
        },
      },
      {
        serviceId: dataAnalyticsService.id,
        locale: 'ar',
        name: 'تحليلات البيانات',
        shortDescription: 'حول البيانات الخام إلى رؤى أعمال قابلة للتنفيذ.',
        fullDescription: 'حول بياناتك إلى ميزة تنافسية. تساعدك خدمات تحليلات البيانات لدينا على جمع البيانات ومعالجتها وتصورها للكشف عن الأنماط والاتجاهات والرؤى التي تقود قرارات أعمال أفضل.',
        features: ['لوحات ذكاء الأعمال', 'تصور البيانات في الوقت الفعلي', 'تطوير خطوط أنابيب ETL', 'تصميم مستودع البيانات', 'حلول التقارير المخصصة', 'تتبع ومراقبة مؤشرات الأداء الرئيسية', 'إدارة جودة البيانات', 'أدوات التحليل الذاتي'],
        benefits: ['اتخذ قرارات أسرع مدعومة بالبيانات', 'حدد فرص الإيرادات وتوفير التكاليف', 'افهم سلوك العملاء وتفضيلاتهم', 'راقب أداء الأعمال في الوقت الفعلي', 'توقع الاتجاهات المستقبلية وتغيرات السوق', 'حسّن الكفاءة التشغيلية'],
        content: {
          process: [
            { step: 1, title: 'اكتشاف البيانات', description: 'نراجع مصادر البيانات الحالية ونحدد مشاكل جودة البيانات.' },
            { step: 2, title: 'تصميم البنية', description: 'نصمم بنية بيانات قابلة للتطوير تشمل خطوط الأنابيب وحلول التخزين وأطر المعالجة.' },
            { step: 3, title: 'تكامل البيانات', description: 'نبني خطوط أنابيب ETL لاستخراج البيانات وتحويلها وتحميلها من مصادر متعددة إلى مستودع بيانات موحد.' },
            { step: 4, title: 'التصور والتقارير', description: 'ننشئ لوحات معلومات وتقارير تفاعلية تقدم الرؤى بتنسيق سهل الفهم.' },
            { step: 5, title: 'التدريب والتحسين', description: 'ندرب فريقك على أدوات التحليل ونحسن اللوحات باستمرار بناءً على ملاحظات المستخدمين.' },
          ],
          faq: [
            { question: 'ما مصادر البيانات التي يمكنكم دمجها؟', answer: 'يمكننا دمج أي مصدر بيانات تقريباً بما في ذلك قواعد البيانات وواجهات برمجة التطبيقات والخدمات السحابية وجداول البيانات وأنظمة CRM ومنصات التسويق وأجهزة IoT.' },
          ],
        },
      },
      {
        serviceId: dataAnalyticsService.id,
        locale: 'ur',
        name: 'ڈیٹا اینالیٹکس',
        shortDescription: 'خام ڈیٹا کو قابل عمل کاروباری بصیرت میں تبدیل کریں۔',
        fullDescription: 'اپنے ڈیٹا کو مسابقتی فائدے میں بدلیں۔ ہماری ڈیٹا اینالیٹکس سروسز آپ کو ڈیٹا جمع کرنے، پروسیس کرنے اور ویژولائز کرنے میں مدد کرتی ہیں تاکہ پیٹرنز، ٹرینڈز اور بصیرت کو ظاہر کیا جا سکے جو بہتر کاروباری فیصلے چلاتے ہیں۔',
        features: ['بزنس انٹیلیجنس ڈیش بورڈز', 'ریئل ٹائم ڈیٹا ویژولائزیشن', 'ETL پائپ لائن ڈیولپمنٹ', 'ڈیٹا ویئر ہاؤس ڈیزائن', 'کسٹم رپورٹنگ سلوشنز', 'KPI ٹریکنگ اور مانیٹرنگ', 'ڈیٹا کوالٹی مینجمنٹ', 'سیلف سروس اینالیٹکس ٹولز'],
        benefits: ['تیز تر، ڈیٹا سے چلنے والے فیصلے کریں', 'آمدنی کے مواقع اور لاگت کی بچت کی شناخت کریں', 'صارف کے رویے اور ترجیحات کو سمجھیں', 'ریئل ٹائم میں کاروباری کارکردگی کی نگرانی کریں', 'مستقبل کے رجحانات اور مارکیٹ کی تبدیلیوں کی پیشن گوئی کریں', 'آپریشنل کارکردگی میں بہتری لائیں'],
        content: {
          process: [
            { step: 1, title: 'ڈیٹا دریافت', description: 'ہم آپ کے موجودہ ڈیٹا ذرائع کا آڈٹ کرتے ہیں اور ڈیٹا کوالٹی کے مسائل کی شناخت کرتے ہیں۔' },
            { step: 2, title: 'آرکیٹیکچر ڈیزائن', description: 'ہم ڈیٹا پائپ لائنز، اسٹوریج سلوشنز اور پروسیسنگ فریم ورکس سمیت قابل توسیع ڈیٹا آرکیٹیکچر ڈیزائن کرتے ہیں۔' },
            { step: 3, title: 'ڈیٹا انٹیگریشن', description: 'ہم متعدد ذرائع سے ڈیٹا نکالنے، تبدیل کرنے اور یکجا ڈیٹا ویئر ہاؤس میں لوڈ کرنے کے لیے ETL پائپ لائنز بناتے ہیں۔' },
            { step: 4, title: 'ویژولائزیشن اور رپورٹنگ', description: 'ہم انٹرایکٹو ڈیش بورڈز اور رپورٹس بناتے ہیں جو اسٹیک ہولڈرز کے لیے آسان فارمیٹ میں بصیرت پیش کرتی ہیں۔' },
            { step: 5, title: 'ٹریننگ اور آپٹیمائزیشن', description: 'ہم آپ کی ٹیم کو اینالیٹکس ٹولز پر تربیت دیتے ہیں اور صارف کے فیڈبیک کی بنیاد پر ڈیش بورڈز کو مسلسل بہتر بناتے ہیں۔' },
          ],
          faq: [
            { question: 'آپ کون سے ڈیٹا ذرائع انٹیگریٹ کر سکتے ہیں؟', answer: 'ہم تقریباً کوئی بھی ڈیٹا سورس انٹیگریٹ کر سکتے ہیں بشمول ڈیٹا بیسز، APIs، کلاؤڈ سروسز، اسپریڈ شیٹس، CRM سسٹمز، مارکیٹنگ پلیٹ فارمز، اور IoT ڈیوائسز۔' },
          ],
        },
      },
    ];
    for (const t of dataAnalyticsTranslations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log(`Seeded ${dataAnalyticsTranslations.length} translations for data-analytics`);
  }

  // Machine Learning Translations
  const machineLearningService = await prisma.service.findUnique({ where: { slug: 'machine-learning' } });
  if (machineLearningService) {
    const mlTranslations = [
      {
        serviceId: machineLearningService.id,
        locale: 'tr',
        name: 'Makine Öğrenimi',
        shortDescription: 'Verilerinizden öğrenen ve gelişen özel ML modelleri.',
        fullDescription: 'Karmaşık iş problemlerini çözmek için makine öğreniminin gücünden yararlanın. Sonuçları tahmin edebilen, veriyi sınıflandırabilen, anomalileri tespit edebilen ve karar vermeyi otomatikleştirebilen özel ML modelleri geliştiriyoruz. Geleneksel algoritmalardan derin öğrenme sinir ağlarına kadar, özel kullanım durumunuz için doğru yaklaşımı seçiyoruz.',
        features: ['Denetimli & Denetimsiz Öğrenme', 'Derin Öğrenme Sinir Ağları', 'Zaman Serisi Tahmini', 'Sınıflandırma & Regresyon Modelleri', 'Kümeleme & Segmentasyon', 'Özellik Mühendisliği & Seçimi', 'Model Açıklanabilirliği & Yorumlanabilirliği', 'MLOps & Model Yaşam Döngüsü Yönetimi'],
        benefits: ['Karmaşık karar verme süreçlerini otomatikleştirin', 'Yüksek doğrulukla gelecekteki sonuçları tahmin edin', 'Büyük veri setlerinde gizli kalıpları keşfedin', 'Akıllı otomasyon yoluyla uzmanlığı ölçeklendirin', 'Daha fazla veriyle sürekli iyileştirin', 'Öngörücü bakım yoluyla maliyetleri azaltın'],
        content: {
          process: [
            { step: 1, title: 'Problem Çerçeveleme', description: 'İş probleminizi makine öğrenimi problemine dönüştürüyor ve ölçülebilir başarı kriterleri tanımlıyoruz.' },
            { step: 2, title: 'Veri Hazırlığı', description: 'Verilerinizi toplayıp temizliyor, model performansını maksimize etmek için özellik mühendisliği yapıyoruz.' },
            { step: 3, title: 'Model Seçimi & Eğitim', description: 'Kullanım durumunuz için en iyi modeli bulmak için birden fazla algoritma ve mimari ile deneyler yapıyoruz.' },
            { step: 4, title: 'Doğrulama & İnce Ayar', description: 'Model performansını titizlikle doğruluyor ve optimal sonuçlar elde etmek için hiperparametreleri ince ayarlıyoruz.' },
            { step: 5, title: 'Dağıtım & MLOps', description: 'Otomatik yeniden eğitim pipeline\'ları ve performans izleme ile modelleri üretime dağıtıyoruz.' },
          ],
          faq: [
            { question: 'Makine öğrenimi için ne kadar veriye ihtiyacım var?', answer: 'Problem karmaşıklığına bağlıdır. Basit modeller binlerce kayıtla çalışabilirken, derin öğrenme genellikle yüz binlerce veya milyonlarca veri gerektirir.' },
            { question: 'Makine öğrenimi tahminleri ne kadar doğru?', answer: 'Doğruluk problem ve veri kalitesine göre değişir. Uygun doğrulama teknikleri kullanıyor ve gerçekçi beklentiler belirliyoruz. Çoğu üretim modeli kullanım durumuna bağlı olarak %80-95 doğruluk elde eder.' },
          ],
        },
      },
      {
        serviceId: machineLearningService.id,
        locale: 'de',
        name: 'Maschinelles Lernen',
        shortDescription: 'Individuelle ML-Modelle, die aus Ihren Daten lernen und sich verbessern.',
        fullDescription: 'Nutzen Sie die Kraft des maschinellen Lernens zur Lösung komplexer Geschäftsprobleme. Wir entwickeln individuelle ML-Modelle, die Ergebnisse vorhersagen, Daten klassifizieren, Anomalien erkennen und Entscheidungen automatisieren können. Von traditionellen Algorithmen bis zu Deep-Learning-Neuronalen Netzen wählen wir den richtigen Ansatz für Ihren spezifischen Anwendungsfall.',
        features: ['Überwachtes & Unüberwachtes Lernen', 'Deep-Learning Neuronale Netze', 'Zeitreihenprognose', 'Klassifikations- & Regressionsmodelle', 'Clustering & Segmentierung', 'Feature Engineering & Auswahl', 'Modell-Erklärbarkeit & Interpretierbarkeit', 'MLOps & Modell-Lebenszyklusmanagement'],
        benefits: ['Komplexe Entscheidungsprozesse automatisieren', 'Zukünftige Ergebnisse mit hoher Genauigkeit vorhersagen', 'Verborgene Muster in großen Datensätzen entdecken', 'Expertise durch intelligente Automatisierung skalieren', 'Mit mehr Daten kontinuierlich verbessern', 'Kosten durch vorausschauende Wartung reduzieren'],
        content: {
          process: [
            { step: 1, title: 'Problemformulierung', description: 'Wir übersetzen Ihr Geschäftsproblem in ein Machine-Learning-Problem und definieren messbare Erfolgskriterien.' },
            { step: 2, title: 'Datenvorbereitung', description: 'Wir sammeln, bereinigen und transformieren Ihre Daten und führen Feature Engineering durch.' },
            { step: 3, title: 'Modellauswahl & Training', description: 'Wir experimentieren mit mehreren Algorithmen und Architekturen, um das beste Modell zu finden.' },
            { step: 4, title: 'Validierung & Tuning', description: 'Wir validieren die Modellleistung rigoros und optimieren Hyperparameter für optimale Ergebnisse.' },
            { step: 5, title: 'Bereitstellung & MLOps', description: 'Wir stellen Modelle mit automatisierten Retraining-Pipelines und Performance-Monitoring in Produktion bereit.' },
          ],
          faq: [
            { question: 'Wie viele Daten benötige ich für maschinelles Lernen?', answer: 'Es hängt von der Problemkomplexität ab. Einfache Modelle können mit Tausenden von Datensätzen arbeiten, während Deep Learning typischerweise Hunderttausende oder Millionen erfordert.' },
          ],
        },
      },
      {
        serviceId: machineLearningService.id,
        locale: 'ar',
        name: 'التعلم الآلي',
        shortDescription: 'نماذج تعلم آلي مخصصة تتعلم وتتحسن من بياناتك.',
        fullDescription: 'استغل قوة التعلم الآلي لحل مشاكل الأعمال المعقدة. نطور نماذج تعلم آلي مخصصة يمكنها التنبؤ بالنتائج وتصنيف البيانات واكتشاف الشذوذ وأتمتة صنع القرار. من الخوارزميات التقليدية إلى الشبكات العصبية للتعلم العميق، نختار النهج الصحيح لحالة استخدامك المحددة.',
        features: ['التعلم الخاضع للإشراف وغير الخاضع للإشراف', 'الشبكات العصبية للتعلم العميق', 'التنبؤ بالسلاسل الزمنية', 'نماذج التصنيف والانحدار', 'التجميع والتقسيم', 'هندسة واختيار الميزات', 'قابلية تفسير النموذج', 'MLOps وإدارة دورة حياة النموذج'],
        benefits: ['أتمتة عمليات صنع القرار المعقدة', 'توقع النتائج المستقبلية بدقة عالية', 'اكتشاف الأنماط المخفية في مجموعات البيانات الكبيرة', 'توسيع نطاق الخبرة من خلال الأتمتة الذكية', 'التحسين المستمر مع المزيد من البيانات', 'تقليل التكاليف من خلال الصيانة التنبؤية'],
        content: {
          process: [
            { step: 1, title: 'صياغة المشكلة', description: 'نترجم مشكلة عملك إلى مشكلة تعلم آلي ونحدد معايير نجاح قابلة للقياس.' },
            { step: 2, title: 'إعداد البيانات', description: 'نجمع بياناتك وننظفها ونحولها، ونجري هندسة الميزات لتعظيم أداء النموذج.' },
            { step: 3, title: 'اختيار النموذج والتدريب', description: 'نجرب خوارزميات وبنى متعددة للعثور على أفضل نموذج لحالة استخدامك.' },
            { step: 4, title: 'التحقق والضبط', description: 'نتحقق بصرامة من أداء النموذج ونضبط المعلمات الفائقة لتحقيق نتائج مثلى.' },
            { step: 5, title: 'النشر و MLOps', description: 'ننشر النماذج في الإنتاج مع خطوط أنابيب إعادة التدريب الآلية ومراقبة الأداء.' },
          ],
          faq: [
            { question: 'كم من البيانات أحتاج للتعلم الآلي؟', answer: 'يعتمد على تعقيد المشكلة. قد تعمل النماذج البسيطة مع آلاف السجلات، بينما يتطلب التعلم العميق عادةً مئات الآلاف أو الملايين.' },
          ],
        },
      },
      {
        serviceId: machineLearningService.id,
        locale: 'ur',
        name: 'مشین لرننگ',
        shortDescription: 'کسٹم ML ماڈلز جو آپ کے ڈیٹا سے سیکھتے اور بہتر ہوتے ہیں۔',
        fullDescription: 'پیچیدہ کاروباری مسائل حل کرنے کے لیے مشین لرننگ کی طاقت کا فائدہ اٹھائیں۔ ہم کسٹم ML ماڈلز تیار کرتے ہیں جو نتائج کی پیشن گوئی کر سکتے ہیں، ڈیٹا کی درجہ بندی کر سکتے ہیں، بے قاعدگیوں کا پتہ لگا سکتے ہیں، اور فیصلہ سازی کو خودکار بنا سکتے ہیں۔',
        features: ['سپروائزڈ اور ان سپروائزڈ لرننگ', 'ڈیپ لرننگ نیورل نیٹ ورکس', 'ٹائم سیریز فورکاسٹنگ', 'کلاسیفیکیشن اور ریگریشن ماڈلز', 'کلسٹرنگ اور سیگمنٹیشن', 'فیچر انجینئرنگ اور سلیکشن', 'ماڈل وضاحت اور تشریح', 'MLOps اور ماڈل لائف سائیکل مینجمنٹ'],
        benefits: ['پیچیدہ فیصلہ سازی کے عمل کو خودکار بنائیں', 'اعلیٰ درستگی کے ساتھ مستقبل کے نتائج کی پیشن گوئی کریں', 'بڑے ڈیٹا سیٹس میں چھپے ہوئے پیٹرنز دریافت کریں', 'ذہین آٹومیشن کے ذریعے مہارت کو بڑھائیں', 'مزید ڈیٹا کے ساتھ مسلسل بہتر بنائیں', 'پیشن گوئی کی دیکھ بھال کے ذریعے اخراجات کم کریں'],
        content: {
          process: [
            { step: 1, title: 'مسئلے کی تشکیل', description: 'ہم آپ کے کاروباری مسئلے کو مشین لرننگ مسئلے میں ترجمہ کرتے ہیں اور قابل پیمائش کامیابی کے معیار کی وضاحت کرتے ہیں۔' },
            { step: 2, title: 'ڈیٹا کی تیاری', description: 'ہم آپ کا ڈیٹا جمع کرتے، صاف کرتے اور تبدیل کرتے ہیں، ماڈل کی کارکردگی کو زیادہ سے زیادہ کرنے کے لیے فیچر انجینئرنگ کرتے ہیں۔' },
            { step: 3, title: 'ماڈل سلیکشن اور ٹریننگ', description: 'ہم آپ کے استعمال کے معاملے کے لیے بہترین ماڈل تلاش کرنے کے لیے متعدد الگورتھمز اور فن تعمیر کے ساتھ تجربات کرتے ہیں۔' },
            { step: 4, title: 'توثیق اور ٹیوننگ', description: 'ہم سختی سے ماڈل کی کارکردگی کی توثیق کرتے ہیں اور بہترین نتائج حاصل کرنے کے لیے ہائپر پیرامیٹرز کو فائن ٹیون کرتے ہیں۔' },
            { step: 5, title: 'ڈپلائمنٹ اور MLOps', description: 'ہم خودکار ری ٹریننگ پائپ لائنز اور پرفارمنس مانیٹرنگ کے ساتھ ماڈلز کو پروڈکشن میں ڈپلائی کرتے ہیں۔' },
          ],
          faq: [
            { question: 'مشین لرننگ کے لیے مجھے کتنے ڈیٹا کی ضرورت ہے؟', answer: 'یہ مسئلے کی پیچیدگی پر منحصر ہے۔ سادہ ماڈلز ہزاروں ریکارڈز کے ساتھ کام کر سکتے ہیں، جبکہ ڈیپ لرننگ کو عام طور پر لاکھوں یا کروڑوں کی ضرورت ہوتی ہے۔' },
          ],
        },
      },
    ];
    for (const t of mlTranslations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log(`Seeded ${mlTranslations.length} translations for machine-learning`);
  }

  // React Native Development Translations
  const reactNativeDev = await prisma.service.findUnique({ where: { slug: 'react-native-development' } });
  if (reactNativeDev) {
    const translations = [
      { serviceId: reactNativeDev.id, locale: 'tr', name: 'React Native Geliştirme', shortDescription: 'Tek bir React Native kod tabanı kullanarak iOS ve Android için yerel mobil uygulamalar oluşturun.', fullDescription: 'Web geliştirme becerilerinizi kullanarak gerçek yerel mobil uygulamalar oluşturun. React Native, yerel geliştirmenin en iyisini React ile birleştirerek her iki platformda da yerel hissettiren yüksek kaliteli uygulamaların hızlı geliştirilmesini sağlar.', features: ['iOS & Android için Tek Kod Tabanı', 'Yerel UI Bileşenleri', 'Hot Reloading Geliştirme', 'Yerel Modül Entegrasyonu', 'Push Bildirimleri', 'Çevrimdışı Öncelikli Mimari'], benefits: ['Yerel geliştirmeden %60 daha hızlı', 'Mobil ve web arasında kod paylaşımı', 'Yerel cihaz özelliklerine erişim', 'Geniş kütüphane ekosistemi'], content: { process: [{ step: 1, title: 'Proje Kurulumu', description: 'TypeScript, navigasyon ve durum yönetimi ile React Native projesini başlatın.' }, { step: 2, title: 'UI Geliştirme', description: 'iOS ve Android tasarım yönergelerine uyum sağlayan duyarlı UI bileşenleri oluşturun.' }, { step: 3, title: 'Yerel Entegrasyon', description: 'Kamera, GPS, biyometri ve platforma özgü özellikler için yerel modülleri entegre edin.' }, { step: 4, title: 'Test ve Lansman', description: 'Gerçek cihazlarda test edin ve her iki platformda da uygulama mağazasına yayınlayın.' }], faq: [{ question: 'React Native mı Flutter mı?', answer: 'Ekibiniz JavaScript/React biliyorsa React Native idealdir. Flutter karmaşık animasyonlar için daha iyi performans sunar.' }, { question: 'React Native yerel özelliklere erişebilir mi?', answer: 'Evet, React Native kamera, GPS, Bluetooth, biyometri ve herhangi bir yerel API için köprüler sağlar.' }] } },
      { serviceId: reactNativeDev.id, locale: 'de', name: 'React Native Entwicklung', shortDescription: 'Erstellen Sie native mobile Apps für iOS und Android mit einer einzigen React Native Codebasis.', fullDescription: 'Nutzen Sie Ihre Web-Entwicklungskenntnisse, um wirklich native mobile Anwendungen zu erstellen. React Native kombiniert das Beste der nativen Entwicklung mit React.', features: ['Eine Codebasis für iOS & Android', 'Native UI-Komponenten', 'Hot Reloading Entwicklung', 'Native Modul-Integration', 'Push-Benachrichtigungen', 'Offline-First Architektur'], benefits: ['60% schnellere Entwicklung als nativ', 'Code zwischen Mobil und Web teilen', 'Zugriff auf native Gerätefunktionen', 'Großes Bibliotheks-Ökosystem'], content: { process: [{ step: 1, title: 'Projekt-Setup', description: 'React Native Projekt mit TypeScript, Navigation und State Management initialisieren.' }, { step: 2, title: 'UI-Entwicklung', description: 'Responsive UI-Komponenten erstellen, die sich an iOS und Android anpassen.' }, { step: 3, title: 'Native Integration', description: 'Native Module für Kamera, GPS, Biometrie und plattformspezifische Funktionen integrieren.' }, { step: 4, title: 'Test & Launch', description: 'Auf echten Geräten testen und in beiden App Stores veröffentlichen.' }], faq: [{ question: 'React Native oder Flutter?', answer: 'React Native ist ideal, wenn Ihr Team JavaScript/React kennt. Flutter bietet bessere Leistung für komplexe Animationen.' }, { question: 'Kann React Native auf native Funktionen zugreifen?', answer: 'Ja, React Native bietet Bridges zu nativen Modulen für Kamera, GPS, Bluetooth, Biometrie und jede native API.' }] } },
      { serviceId: reactNativeDev.id, locale: 'ar', name: 'تطوير React Native', shortDescription: 'قم ببناء تطبيقات جوال أصلية لنظامي iOS و Android باستخدام قاعدة كود React Native واحدة.', fullDescription: 'استفد من مهارات تطوير الويب الخاصة بك لبناء تطبيقات جوال أصلية حقيقية. يجمع React Native بين أفضل ما في التطوير الأصلي مع React.', features: ['قاعدة كود واحدة لـ iOS و Android', 'مكونات واجهة مستخدم أصلية', 'تطوير Hot Reloading', 'تكامل الوحدات الأصلية', 'إشعارات الدفع', 'بنية أوفلاين أولاً'], benefits: ['أسرع بـ 60% من التطوير الأصلي', 'مشاركة الكود بين الجوال والويب', 'الوصول إلى ميزات الجهاز الأصلية', 'نظام بيئي كبير للمكتبات'], content: { process: [{ step: 1, title: 'إعداد المشروع', description: 'تهيئة مشروع React Native مع TypeScript والتنقل وإدارة الحالة.' }, { step: 2, title: 'تطوير واجهة المستخدم', description: 'بناء مكونات واجهة مستخدم متجاوبة تتكيف مع إرشادات تصميم iOS و Android.' }, { step: 3, title: 'التكامل الأصلي', description: 'دمج الوحدات الأصلية للكاميرا و GPS والقياسات الحيوية.' }, { step: 4, title: 'الاختبار والإطلاق', description: 'الاختبار على أجهزة حقيقية والنشر في متاجر التطبيقات.' }], faq: [{ question: 'React Native أم Flutter؟', answer: 'React Native مثالي إذا كان فريقك يعرف JavaScript/React. يوفر Flutter أداءً أفضل للرسوم المتحركة المعقدة.' }] } },
      { serviceId: reactNativeDev.id, locale: 'ur', name: 'React Native ڈیولپمنٹ', shortDescription: 'ایک React Native کوڈ بیس کا استعمال کرتے ہوئے iOS اور Android کے لیے مقامی موبائل ایپس بنائیں۔', fullDescription: 'اپنی ویب ڈیولپمنٹ مہارتوں کو استعمال کرتے ہوئے حقیقی مقامی موبائل ایپلیکیشنز بنائیں۔ React Native مقامی ڈیولپمنٹ کے بہترین کو React کے ساتھ جوڑتا ہے۔', features: ['iOS اور Android کے لیے سنگل کوڈ بیس', 'مقامی UI اجزاء', 'Hot Reloading ڈیولپمنٹ', 'مقامی ماڈیول انٹیگریشن', 'پش نوٹیفیکیشنز', 'آف لائن فرسٹ آرکیٹیکچر'], benefits: ['مقامی سے 60% تیز ڈیولپمنٹ', 'موبائل اور ویب کے درمیان کوڈ شیئر کریں', 'مقامی ڈیوائس فیچرز تک رسائی'], content: { process: [{ step: 1, title: 'پروجیکٹ سیٹ اپ', description: 'TypeScript، نیویگیشن اور اسٹیٹ مینجمنٹ کے ساتھ React Native پروجیکٹ شروع کریں۔' }, { step: 2, title: 'UI ڈیولپمنٹ', description: 'ریسپانسیو UI اجزاء بنائیں جو iOS اور Android ڈیزائن گائیڈ لائنز کے مطابق ہوں۔' }], faq: [{ question: 'React Native یا Flutter؟', answer: 'اگر آپ کی ٹیم JavaScript/React جانتی ہے تو React Native مثالی ہے۔ Flutter پیچیدہ اینیمیشنز کے لیے بہتر کارکردگی فراہم کرتا ہے۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for react-native-development');
  }

  // Headless CMS Development Translations
  const headlessCms = await prisma.service.findUnique({ where: { slug: 'headless-cms-development' } });
  if (headlessCms) {
    const translations = [
      { serviceId: headlessCms.id, locale: 'tr', name: 'Headless CMS Geliştirme', shortDescription: 'İçeriği sunumdan ayıran esnek headless CMS çözümleri uygulayın.', fullDescription: 'Monolitik CMS sınırlamalarından kurtulun. İçerik ekibinizin bağımsız çalışmasını sağlarken geliştiricilerin herhangi bir teknolojiyi kullanarak hızlı, modern ön yüzler oluşturmasına olanak tanıyan headless CMS platformları uyguluyoruz.', features: ['Strapi & Contentful Uygulaması', 'Sanity.io Özel Şemalar', 'Çok Kanallı İçerik Dağıtımı', 'GraphQL & REST API\'ler', 'İçerik Modelleme', 'Önizleme & Taslak İş Akışları'], benefits: ['Web, mobil ve IoT genelinde yeniden kullanılabilir içerik', 'Geliştiriciler herhangi bir ön yüz seçebilir', 'Statik oluşturma ile daha iyi performans'], content: { process: [{ step: 1, title: 'İçerik Denetimi', description: 'Mevcut içerik yapısını analiz edin ve içerik türlerini tanımlayın.' }, { step: 2, title: 'CMS Seçimi', description: 'Ekip ihtiyaçlarına göre doğru headless CMS\'i seçin.' }, { step: 3, title: 'Şema Tasarımı', description: 'Uygun alan türleri ve ilişkilerle içerik modelleri tasarlayın.' }], faq: [{ question: 'Headless CMS nedir?', answer: 'Headless CMS, içeriği depolar ve yönetir ancak yerleşik ön yüzü yoktur. İçerik API aracılığıyla herhangi bir ön yüze sunulur.' }] } },
      { serviceId: headlessCms.id, locale: 'de', name: 'Headless CMS Entwicklung', shortDescription: 'Implementieren Sie flexible Headless-CMS-Lösungen, die Inhalte von der Präsentation trennen.', fullDescription: 'Befreien Sie sich von monolithischen CMS-Einschränkungen. Wir implementieren Headless-CMS-Plattformen, die Ihrem Content-Team ermöglichen, unabhängig zu arbeiten.', features: ['Strapi & Contentful Implementierung', 'Sanity.io Custom Schemas', 'Multi-Channel Content Delivery', 'GraphQL & REST APIs', 'Content Modeling', 'Preview & Draft Workflows'], benefits: ['Inhalte wiederverwendbar über Web, Mobile und IoT', 'Entwickler frei bei Frontend-Wahl', 'Bessere Performance mit Static Generation'], content: { process: [{ step: 1, title: 'Content Audit', description: 'Bestehende Inhaltsstruktur analysieren und Content-Typen definieren.' }, { step: 2, title: 'CMS-Auswahl', description: 'Das richtige Headless CMS basierend auf Team-Anforderungen wählen.' }], faq: [{ question: 'Was ist ein Headless CMS?', answer: 'Ein Headless CMS speichert und verwaltet Inhalte, hat aber kein eingebautes Frontend. Inhalte werden per API an jedes Frontend geliefert.' }] } },
      { serviceId: headlessCms.id, locale: 'ar', name: 'تطوير Headless CMS', shortDescription: 'قم بتنفيذ حلول CMS مرنة بدون واجهة تفصل المحتوى عن العرض.', fullDescription: 'تحرر من قيود CMS المتجانسة. نحن ننفذ منصات CMS بدون واجهة تتيح لفريق المحتوى الخاص بك العمل بشكل مستقل.', features: ['تنفيذ Strapi و Contentful', 'مخططات Sanity.io المخصصة', 'تسليم المحتوى متعدد القنوات', 'GraphQL و REST APIs', 'نمذجة المحتوى'], benefits: ['محتوى قابل لإعادة الاستخدام عبر الويب والجوال و IoT', 'المطورون أحرار في اختيار أي واجهة أمامية'], content: { process: [{ step: 1, title: 'تدقيق المحتوى', description: 'تحليل بنية المحتوى الحالية وتحديد أنواع المحتوى.' }], faq: [{ question: 'ما هو Headless CMS؟', answer: 'Headless CMS يخزن ويدير المحتوى ولكن ليس له واجهة أمامية مدمجة. يتم تسليم المحتوى عبر API إلى أي واجهة أمامية.' }] } },
      { serviceId: headlessCms.id, locale: 'ur', name: 'Headless CMS ڈیولپمنٹ', shortDescription: 'لچکدار headless CMS حل نافذ کریں جو مواد کو پیشکش سے الگ کرتے ہیں۔', fullDescription: 'یکجا CMS کی حدود سے آزاد ہوں۔ ہم headless CMS پلیٹ فارمز نافذ کرتے ہیں جو آپ کی مواد ٹیم کو آزادانہ کام کرنے دیتے ہیں۔', features: ['Strapi اور Contentful نفاذ', 'Sanity.io کسٹم اسکیماز', 'ملٹی چینل مواد کی ترسیل', 'GraphQL اور REST APIs'], benefits: ['ویب، موبائل اور IoT میں دوبارہ قابل استعمال مواد', 'ڈویلپرز کوئی بھی فرنٹ اینڈ منتخب کر سکتے ہیں'], content: { process: [{ step: 1, title: 'مواد آڈٹ', description: 'موجودہ مواد کے ڈھانچے کا تجزیہ کریں اور مواد کی اقسام کی وضاحت کریں۔' }], faq: [{ question: 'Headless CMS کیا ہے؟', answer: 'Headless CMS مواد کو ذخیرہ اور منظم کرتا ہے لیکن اس میں بلٹ ان فرنٹ اینڈ نہیں ہوتا۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for headless-cms-development');
  }

  // Payment Gateway Integration Translations
  const paymentGateway = await prisma.service.findUnique({ where: { slug: 'payment-gateway-integration' } });
  if (paymentGateway) {
    const translations = [
      { serviceId: paymentGateway.id, locale: 'tr', name: 'Ödeme Geçidi Entegrasyonu', shortDescription: 'Kredi kartları, dijital cüzdanlar ve alternatif ödeme yöntemlerini kabul etmek için güvenli ödeme geçitleri entegre edin.', fullDescription: 'Platformunuzda sorunsuz, güvenli ödemeler sağlayın. PCI uyumluluğu, abonelik faturalandırması, çoklu para birimi desteği ve dolandırıcılık önleme ile Stripe, PayPal ve bölgesel işlemcileri entegre ediyoruz.', features: ['Stripe & PayPal Entegrasyonu', 'Abonelik & Tekrarlayan Faturalandırma', 'Çoklu Para Birimi Desteği', 'Dijital Cüzdanlar', 'PCI Uyumluluğu', 'Dolandırıcılık Tespiti'], benefits: ['Küresel ödeme kabul edin', 'Sepet terkini azaltın', 'Abonelik yönetimini otomatikleştirin'], content: { process: [{ step: 1, title: 'Gereksinim Analizi', description: 'Ödeme ihtiyaçlarınızı anlayın: para birimleri, bölgeler, ödeme yöntemleri.' }, { step: 2, title: 'Geçit Seçimi', description: 'Ücretler, özellikler ve bölgesel kapsama göre optimal ödeme işlemcilerini seçin.' }], faq: [{ question: 'Hangi ödeme geçidini kullanmalıyız?', answer: 'Çoğu kullanım durumu için mükemmel geliştirici deneyimi nedeniyle Stripe. Alıcı güveni için PayPal.' }] } },
      { serviceId: paymentGateway.id, locale: 'de', name: 'Payment-Gateway-Integration', shortDescription: 'Integrieren Sie sichere Zahlungsgateways, um Kreditkarten, digitale Wallets und alternative Zahlungsmethoden zu akzeptieren.', fullDescription: 'Ermöglichen Sie nahtlose, sichere Zahlungen auf Ihrer Plattform. Wir integrieren Stripe, PayPal und regionale Prozessoren mit PCI-Compliance und Betrugsprävention.', features: ['Stripe & PayPal Integration', 'Abonnement & Wiederkehrende Abrechnung', 'Multi-Währungsunterstützung', 'Digitale Wallets', 'PCI-Compliance', 'Betrugserkennung'], benefits: ['Zahlungen weltweit akzeptieren', 'Warenkorbabbrüche reduzieren', 'Abonnementverwaltung automatisieren'], content: { process: [{ step: 1, title: 'Anforderungsanalyse', description: 'Verstehen Sie Ihre Zahlungsanforderungen: Währungen, Regionen, Zahlungsmethoden.' }], faq: [{ question: 'Welches Zahlungsgateway sollten wir verwenden?', answer: 'Stripe für die meisten Anwendungsfälle aufgrund der hervorragenden Entwicklererfahrung.' }] } },
      { serviceId: paymentGateway.id, locale: 'ar', name: 'تكامل بوابة الدفع', shortDescription: 'قم بدمج بوابات دفع آمنة لقبول البطاقات الائتمانية والمحافظ الرقمية وطرق الدفع البديلة.', fullDescription: 'قم بتمكين المدفوعات السلسة والآمنة على منصتك. نحن ندمج Stripe و PayPal والمعالجات الإقليمية مع امتثال PCI ومنع الاحتيال.', features: ['تكامل Stripe و PayPal', 'الاشتراك والفوترة المتكررة', 'دعم العملات المتعددة', 'المحافظ الرقمية', 'امتثال PCI', 'كشف الاحتيال'], benefits: ['قبول المدفوعات عالمياً', 'تقليل التخلي عن سلة التسوق'], content: { process: [{ step: 1, title: 'تحليل المتطلبات', description: 'فهم احتياجات الدفع الخاصة بك: العملات والمناطق وطرق الدفع.' }], faq: [{ question: 'أي بوابة دفع يجب أن نستخدم؟', answer: 'Stripe لمعظم حالات الاستخدام بسبب تجربة المطور الممتازة.' }] } },
      { serviceId: paymentGateway.id, locale: 'ur', name: 'پیمنٹ گیٹ وے انٹیگریشن', shortDescription: 'کریڈٹ کارڈز، ڈیجیٹل والیٹس اور متبادل ادائیگی کے طریقے قبول کرنے کے لیے محفوظ پیمنٹ گیٹ ویز کو مربوط کریں۔', fullDescription: 'اپنے پلیٹ فارم پر بغیر کسی رکاوٹ کے محفوظ ادائیگیاں فعال کریں۔ ہم PCI تعمیل اور دھوکہ دہی کی روک تھام کے ساتھ Stripe، PayPal اور علاقائی پروسیسرز کو مربوط کرتے ہیں۔', features: ['Stripe اور PayPal انٹیگریشن', 'سبسکرپشن اور بار بار بلنگ', 'ملٹی کرنسی سپورٹ', 'ڈیجیٹل والیٹس', 'PCI تعمیل'], benefits: ['عالمی سطح پر ادائیگیاں قبول کریں', 'کارٹ چھوڑنے کو کم کریں'], content: { process: [{ step: 1, title: 'ضروریات کا تجزیہ', description: 'اپنی ادائیگی کی ضروریات کو سمجھیں: کرنسیاں، خطے، ادائیگی کے طریقے۔' }], faq: [{ question: 'ہمیں کون سا پیمنٹ گیٹ وے استعمال کرنا چاہیے؟', answer: 'زیادہ تر استعمال کے معاملات کے لیے بہترین ڈویلپر تجربے کی وجہ سے Stripe۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for payment-gateway-integration');
  }

  // AI Image Generation Translations
  const aiImage = await prisma.service.findUnique({ where: { slug: 'ai-image-generation' } });
  if (aiImage) {
    const translations = [
      { serviceId: aiImage.id, locale: 'tr', name: 'AI Görsel Üretimi', shortDescription: 'DALL-E, Stable Diffusion ve Midjourney API\'lerini kullanarak özel AI görsel üretim çözümleri oluşturun.', fullDescription: 'Görseller için üretken AI\'nın gücünden yararlanın. Özel görsel üretim pipeline\'ları oluşturuyor, modelleri marka varlıklarınıza göre ince ayarlıyor ve AI görsel yeteneklerini ürünlerinize entegre ediyoruz.', features: ['DALL-E & Stable Diffusion Entegrasyonu', 'Özel Model İnce Ayarı', 'Marka Tutarlı Görsel Üretimi', 'Ürün Görsel Varyasyonları', 'Arka Plan Kaldırma & Değiştirme'], benefits: ['Sınırsız yaratıcı varlık üretin', 'Fotoğrafçılık ve tasarım maliyetlerini azaltın', 'Görselleri ölçekte kişiselleştirin'], content: { process: [{ step: 1, title: 'Kullanım Durumu Tanımı', description: 'Hangi görselleri üretmeniz gerektiğini, kalite gereksinimlerini ve marka yönergelerini tanımlayın.' }, { step: 2, title: 'Model Seçimi', description: 'Stil, kalite, hız ve maliyet gereksinimlerine göre doğru AI modelini seçin.' }], faq: [{ question: 'AI markamıza uygun görseller üretebilir mi?', answer: 'Evet, modelleri marka varlıklarınıza göre ince ayarlıyoruz ve tutarlı stil sağlayan detaylı prompt şablonları oluşturuyoruz.' }] } },
      { serviceId: aiImage.id, locale: 'de', name: 'KI-Bildgenerierung', shortDescription: 'Erstellen Sie individuelle KI-Bildgenerierungslösungen mit DALL-E, Stable Diffusion und Midjourney APIs.', fullDescription: 'Nutzen Sie die Kraft der generativen KI für Bilder. Wir bauen individuelle Bildgenerierungs-Pipelines und trainieren Modelle auf Ihre Marken-Assets.', features: ['DALL-E & Stable Diffusion Integration', 'Individuelles Model Fine-Tuning', 'Marken-konsistente Bildgenerierung', 'Produkt-Bildvariationen', 'Hintergrund-Entfernung'], benefits: ['Unbegrenzte kreative Assets generieren', 'Fotografie- und Designkosten reduzieren', 'Bilder im großen Maßstab personalisieren'], content: { process: [{ step: 1, title: 'Use-Case Definition', description: 'Definieren Sie genau welche Bilder Sie generieren müssen und Markenrichtlinien.' }], faq: [{ question: 'Kann KI Bilder passend zu unserer Marke generieren?', answer: 'Ja, wir trainieren Modelle auf Ihre Marken-Assets und erstellen detaillierte Prompt-Vorlagen.' }] } },
      { serviceId: aiImage.id, locale: 'ar', name: 'توليد الصور بالذكاء الاصطناعي', shortDescription: 'أنشئ حلول توليد صور AI مخصصة باستخدام DALL-E و Stable Diffusion و Midjourney APIs.', fullDescription: 'استغل قوة الذكاء الاصطناعي التوليدي للصور. نحن نبني خطوط أنابيب توليد صور مخصصة ونضبط النماذج على أصول علامتك التجارية.', features: ['تكامل DALL-E و Stable Diffusion', 'الضبط الدقيق للنموذج المخصص', 'توليد صور متسقة مع العلامة التجارية', 'تنويعات صور المنتج'], benefits: ['توليد أصول إبداعية غير محدودة', 'تقليل تكاليف التصوير والتصميم'], content: { process: [{ step: 1, title: 'تعريف حالة الاستخدام', description: 'حدد بالضبط الصور التي تحتاج إلى توليدها وإرشادات العلامة التجارية.' }], faq: [{ question: 'هل يمكن للذكاء الاصطناعي توليد صور تتطابق مع علامتنا التجارية؟', answer: 'نعم، نحن نضبط النماذج على أصول علامتك التجارية وننشئ قوالب prompt مفصلة.' }] } },
      { serviceId: aiImage.id, locale: 'ur', name: 'AI امیج جنریشن', shortDescription: 'DALL-E، Stable Diffusion اور Midjourney APIs کا استعمال کرتے ہوئے کسٹم AI امیج جنریشن سلوشنز بنائیں۔', fullDescription: 'تصاویر کے لیے جنریٹو AI کی طاقت کا فائدہ اٹھائیں۔ ہم کسٹم امیج جنریشن پائپ لائنز بناتے ہیں اور ماڈلز کو آپ کے برانڈ اثاثوں پر فائن ٹیون کرتے ہیں۔', features: ['DALL-E اور Stable Diffusion انٹیگریشن', 'کسٹم ماڈل فائن ٹیوننگ', 'برانڈ کے مطابق امیج جنریشن', 'پروڈکٹ امیج ویریئنٹس'], benefits: ['لامحدود تخلیقی اثاثے بنائیں', 'فوٹوگرافی اور ڈیزائن کے اخراجات کم کریں'], content: { process: [{ step: 1, title: 'استعمال کیس کی تعریف', description: 'وضاحت کریں کہ آپ کو کون سی تصاویر بنانے کی ضرورت ہے اور برانڈ گائیڈ لائنز۔' }], faq: [{ question: 'کیا AI ہمارے برانڈ سے مماثل تصاویر بنا سکتا ہے؟', answer: 'جی ہاں، ہم ماڈلز کو آپ کے برانڈ اثاثوں پر فائن ٹیون کرتے ہیں۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for ai-image-generation');
  }

  // Conversion Rate Optimization Translations
  const cro = await prisma.service.findUnique({ where: { slug: 'conversion-rate-optimization' } });
  if (cro) {
    const translations = [
      { serviceId: cro.id, locale: 'tr', name: 'Dönüşüm Oranı Optimizasyonu', shortDescription: 'Veri odaklı A/B testi, UX iyileştirmeleri ve açılış sayfası optimizasyonu ile dönüşümleri artırın.', fullDescription: 'Sistematik dönüşüm oranı optimizasyonu ile daha fazla ziyaretçiyi müşteriye dönüştürün. Dönüşüm engellerini tespit etmek ve ortadan kaldırmak için veri analizi, kullanıcı araştırması, A/B testi ve UX en iyi uygulamalarını kullanıyoruz.', features: ['Dönüşüm Denetimi & Analizi', 'A/B & Çok Değişkenli Test', 'Isı Haritası & Oturum Kaydı Analizi', 'Açılış Sayfası Optimizasyonu', 'Form Optimizasyonu'], benefits: ['Daha yüksek dönüşüm oranları', 'Reklam harcamasında daha iyi ROI', 'Daha düşük müşteri edinme maliyeti'], content: { process: [{ step: 1, title: 'Dönüşüm Denetimi', description: 'Huni verilerinizi analiz edin, bırakma noktalarını tespit edin.' }, { step: 2, title: 'Araştırma & Hipotezler', description: 'Kullanıcı araştırması yapın, ısı haritalarını inceleyin ve test hipotezleri geliştirin.' }], faq: [{ question: 'Ne kadar dönüşüm oranı iyileşmesi bekleyebiliriz?', answer: 'Sonuçlar değişir, ancak iyi yürütülen CRO programları 6-12 ay içinde tipik olarak %20-50 iyileşme sağlar.' }] } },
      { serviceId: cro.id, locale: 'de', name: 'Conversion-Rate-Optimierung', shortDescription: 'Erhöhen Sie Conversions mit datengetriebenen A/B-Tests, UX-Verbesserungen und Landing-Page-Optimierung.', fullDescription: 'Verwandeln Sie mehr Besucher in Kunden mit systematischer Conversion-Rate-Optimierung. Wir nutzen Datenanalyse, Nutzerforschung und A/B-Tests.', features: ['Conversion-Audit & Analyse', 'A/B- & Multivariate Tests', 'Heatmap- & Session-Recording-Analyse', 'Landing-Page-Optimierung', 'Formular-Optimierung'], benefits: ['Höhere Conversion-Raten', 'Besserer ROI bei Werbeausgaben', 'Niedrigere Kundenakquisitionskosten'], content: { process: [{ step: 1, title: 'Conversion-Audit', description: 'Analysieren Sie Ihre Funnel-Daten und identifizieren Sie Abbruchpunkte.' }], faq: [{ question: 'Welche Conversion-Rate-Verbesserung können wir erwarten?', answer: 'Gut durchgeführte CRO-Programme erreichen typischerweise 20-50% Verbesserung über 6-12 Monate.' }] } },
      { serviceId: cro.id, locale: 'ar', name: 'تحسين معدل التحويل', shortDescription: 'قم بزيادة التحويلات من خلال اختبار A/B المدفوع بالبيانات وتحسينات تجربة المستخدم وتحسين صفحات الهبوط.', fullDescription: 'حول المزيد من الزوار إلى عملاء مع تحسين معدل التحويل المنهجي. نستخدم تحليل البيانات وأبحاث المستخدم واختبار A/B.', features: ['تدقيق وتحليل التحويل', 'اختبار A/B ومتعدد المتغيرات', 'تحليل خريطة الحرارة وتسجيل الجلسة', 'تحسين صفحة الهبوط'], benefits: ['معدلات تحويل أعلى', 'عائد استثمار أفضل على الإنفاق الإعلاني'], content: { process: [{ step: 1, title: 'تدقيق التحويل', description: 'تحليل بيانات القمع الخاص بك وتحديد نقاط الانسحاب.' }], faq: [{ question: 'ما تحسين معدل التحويل الذي يمكننا توقعه؟', answer: 'تحقق برامج CRO المنفذة جيداً عادةً تحسناً بنسبة 20-50% على مدى 6-12 شهراً.' }] } },
      { serviceId: cro.id, locale: 'ur', name: 'کنورژن ریٹ آپٹیمائزیشن', shortDescription: 'ڈیٹا سے چلنے والے A/B ٹیسٹنگ، UX بہتری اور لینڈنگ پیج آپٹیمائزیشن کے ساتھ کنورژنز بڑھائیں۔', fullDescription: 'منظم کنورژن ریٹ آپٹیمائزیشن کے ساتھ مزید وزیٹرز کو کسٹمرز میں تبدیل کریں۔ ہم ڈیٹا تجزیہ، صارف تحقیق اور A/B ٹیسٹنگ استعمال کرتے ہیں۔', features: ['کنورژن آڈٹ اور تجزیہ', 'A/B اور ملٹی ویریئٹ ٹیسٹنگ', 'ہیٹ میپ اور سیشن ریکارڈنگ تجزیہ', 'لینڈنگ پیج آپٹیمائزیشن'], benefits: ['زیادہ کنورژن ریٹس', 'ایڈ اخراجات پر بہتر ROI'], content: { process: [{ step: 1, title: 'کنورژن آڈٹ', description: 'اپنے فنل ڈیٹا کا تجزیہ کریں اور ڈراپ آف پوائنٹس کی شناخت کریں۔' }], faq: [{ question: 'ہم کتنی کنورژن ریٹ بہتری کی توقع کر سکتے ہیں؟', answer: 'اچھی طرح سے چلائے جانے والے CRO پروگرام عام طور پر 6-12 ماہ میں 20-50% بہتری حاصل کرتے ہیں۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for conversion-rate-optimization');
  }

  // Marketing Automation Translations
  const marketingAuto = await prisma.service.findUnique({ where: { slug: 'marketing-automation' } });
  if (marketingAuto) {
    const translations = [
      { serviceId: marketingAuto.id, locale: 'tr', name: 'Pazarlama Otomasyonu', shortDescription: 'Potansiyel müşterileri besleyen ve dönüşümleri ölçekte artıran akıllı iş akışlarıyla pazarlamanızı otomatikleştirin.', fullDescription: 'Ekibinizi büyütmeden pazarlama çabalarınızı ölçeklendirin. Lead scoring, e-posta dizileri, davranışsal tetikleyiciler ve çok kanallı kampanyaları yöneten pazarlama otomasyon platformları uyguluyoruz.', features: ['HubSpot & Marketo Uygulaması', 'Lead Skorlama & Kalifikasyonu', 'Otomatik E-posta Dizileri', 'Davranışsal Tetikleyici Kampanyalar', 'Çok Kanallı Orkestrasyon'], benefits: ['7/24 otomatik olarak lead besleyin', 'Ölçekte kişiselleştirin', 'Manuel pazarlama görevlerini azaltın'], content: { process: [{ step: 1, title: 'Denetim & Strateji', description: 'Mevcut pazarlama süreçlerini haritalayın ve alıcı yolculuğuyla uyumlu otomasyon stratejisi tasarlayın.' }], faq: [{ question: 'Hangi pazarlama otomasyon platformu en iyisi?', answer: 'KOBİ\'ler için HubSpot ve kullanım kolaylığı, kurumsal karmaşıklık için Marketo, e-ticaret için Klaviyo.' }] } },
      { serviceId: marketingAuto.id, locale: 'de', name: 'Marketing-Automatisierung', shortDescription: 'Automatisieren Sie Ihr Marketing mit intelligenten Workflows, die Leads pflegen und Conversions im großen Maßstab steigern.', fullDescription: 'Skalieren Sie Ihre Marketing-Bemühungen ohne Ihr Team zu vergrößern. Wir implementieren Marketing-Automatisierungsplattformen für Lead-Scoring und E-Mail-Sequenzen.', features: ['HubSpot & Marketo Implementierung', 'Lead-Scoring & Qualifizierung', 'Automatisierte E-Mail-Sequenzen', 'Verhaltens-Trigger-Kampagnen', 'Multi-Channel-Orchestrierung'], benefits: ['Leads 24/7 automatisch pflegen', 'Im großen Maßstab personalisieren', 'Manuelle Marketing-Aufgaben reduzieren'], content: { process: [{ step: 1, title: 'Audit & Strategie', description: 'Aktuelle Marketing-Prozesse kartieren und Automatisierungsstrategie entwerfen.' }], faq: [{ question: 'Welche Marketing-Automatisierungsplattform ist die beste?', answer: 'HubSpot für KMU, Marketo für Enterprise-Komplexität, Klaviyo für E-Commerce.' }] } },
      { serviceId: marketingAuto.id, locale: 'ar', name: 'أتمتة التسويق', shortDescription: 'أتمت تسويقك بسير عمل ذكي يرعى العملاء المحتملين ويدفع التحويلات على نطاق واسع.', fullDescription: 'وسع جهودك التسويقية دون توسيع فريقك. ننفذ منصات أتمتة التسويق التي تتعامل مع تسجيل العملاء المحتملين وتسلسلات البريد الإلكتروني.', features: ['تنفيذ HubSpot و Marketo', 'تسجيل وتأهيل العملاء المحتملين', 'تسلسلات بريد إلكتروني آلية', 'حملات المشغلات السلوكية'], benefits: ['رعاية العملاء المحتملين 24/7 تلقائياً', 'التخصيص على نطاق واسع', 'تقليل مهام التسويق اليدوية'], content: { process: [{ step: 1, title: 'التدقيق والاستراتيجية', description: 'رسم خريطة لعمليات التسويق الحالية وتصميم استراتيجية الأتمتة.' }], faq: [{ question: 'أي منصة أتمتة تسويق هي الأفضل؟', answer: 'HubSpot للشركات الصغيرة، Marketo للتعقيد المؤسسي، Klaviyo للتجارة الإلكترونية.' }] } },
      { serviceId: marketingAuto.id, locale: 'ur', name: 'مارکیٹنگ آٹومیشن', shortDescription: 'ذہین ورک فلوز کے ساتھ اپنی مارکیٹنگ کو خودکار بنائیں جو لیڈز کی پرورش کرتے ہیں اور بڑے پیمانے پر کنورژنز چلاتے ہیں۔', fullDescription: 'اپنی ٹیم کو بڑھائے بغیر اپنی مارکیٹنگ کوششوں کو بڑھائیں۔ ہم مارکیٹنگ آٹومیشن پلیٹ فارمز نافذ کرتے ہیں جو لیڈ اسکورنگ اور ای میل سیکوئنسز کو سنبھالتے ہیں۔', features: ['HubSpot اور Marketo نفاذ', 'لیڈ اسکورنگ اور کوالیفیکیشن', 'خودکار ای میل سیکوئنسز', 'رویے کی بنیاد پر ٹرگر مہمات'], benefits: ['24/7 خودکار طور پر لیڈز کی پرورش کریں', 'بڑے پیمانے پر ذاتی بنائیں'], content: { process: [{ step: 1, title: 'آڈٹ اور حکمت عملی', description: 'موجودہ مارکیٹنگ کے عمل کا نقشہ بنائیں اور آٹومیشن حکمت عملی ڈیزائن کریں۔' }], faq: [{ question: 'کون سا مارکیٹنگ آٹومیشن پلیٹ فارم بہترین ہے؟', answer: 'SMBs کے لیے HubSpot، انٹرپرائز پیچیدگی کے لیے Marketo، ای کامرس کے لیے Klaviyo۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for marketing-automation');
  }

  // Serverless Architecture Translations
  const serverless = await prisma.service.findUnique({ where: { slug: 'serverless-architecture' } });
  if (serverless) {
    const translations = [
      { serviceId: serverless.id, locale: 'tr', name: 'Serverless Mimari', shortDescription: 'AWS Lambda, Vercel ve edge computing ile ölçeklenebilir, maliyet etkin uygulamalar oluşturun.', fullDescription: 'Sunucu yönetimini ortadan kaldırın ve yalnızca kullandığınız için ödeme yapın. AWS Lambda, Vercel Edge Functions ve sıfırdan milyonlarca isteğe otomatik ölçeklenen yönetilen hizmetler kullanarak serverless uygulamalar tasarlıyor ve oluşturuyoruz.', features: ['AWS Lambda & API Gateway', 'Vercel & Cloudflare Workers', 'Olay Odaklı Mimari', 'Serverless Veritabanları', 'Edge Computing', 'Otomatik Ölçekleme'], benefits: ['Sıfır sunucu bakımı', 'Çalışma başına ödeme', 'Her yüke otomatik ölçekleme', 'Azaltılmış operasyonel karmaşıklık'], content: { process: [{ step: 1, title: 'Mimari Tasarımı', description: 'Uygun hizmet sınırları ve veri kalıplarıyla serverless mimari tasarlayın.' }], faq: [{ question: 'Serverless ne zaman doğru seçimdir?', answer: 'Serverless, değişken iş yükleri, olay odaklı sistemler ve ops yükünü en aza indirmek istediğinizde mükemmeldir.' }] } },
      { serviceId: serverless.id, locale: 'de', name: 'Serverless Architektur', shortDescription: 'Erstellen Sie skalierbare, kosteneffektive Anwendungen mit AWS Lambda, Vercel und Edge Computing.', fullDescription: 'Eliminieren Sie Server-Management und zahlen Sie nur für das, was Sie nutzen. Wir entwerfen und bauen serverless Anwendungen mit AWS Lambda und Vercel.', features: ['AWS Lambda & API Gateway', 'Vercel & Cloudflare Workers', 'Event-Driven Architektur', 'Serverless Datenbanken', 'Edge Computing', 'Auto-Scaling'], benefits: ['Kein Server-Wartung', 'Zahlung pro Ausführung', 'Automatische Skalierung auf jede Last', 'Reduzierte operative Komplexität'], content: { process: [{ step: 1, title: 'Architektur-Design', description: 'Serverless-Architektur mit passenden Service-Grenzen und Datenmustern entwerfen.' }], faq: [{ question: 'Wann ist serverless die richtige Wahl?', answer: 'Serverless eignet sich hervorragend für variable Workloads, event-driven Systeme und wenn Sie Ops-Overhead minimieren wollen.' }] } },
      { serviceId: serverless.id, locale: 'ar', name: 'البنية بدون خادم', shortDescription: 'قم ببناء تطبيقات قابلة للتطوير وفعالة من حيث التكلفة باستخدام AWS Lambda و Vercel وحوسبة الحافة.', fullDescription: 'تخلص من إدارة الخادم وادفع فقط مقابل ما تستخدمه. نحن نصمم ونبني تطبيقات بدون خادم باستخدام AWS Lambda و Vercel.', features: ['AWS Lambda و API Gateway', 'Vercel و Cloudflare Workers', 'بنية مدفوعة بالأحداث', 'قواعد بيانات بدون خادم', 'حوسبة الحافة', 'التوسع التلقائي'], benefits: ['صفر صيانة للخادم', 'الدفع لكل تنفيذ', 'التوسع التلقائي لأي حمل'], content: { process: [{ step: 1, title: 'تصميم البنية', description: 'تصميم بنية بدون خادم مع حدود خدمة وأنماط بيانات مناسبة.' }], faq: [{ question: 'متى يكون بدون خادم الخيار الصحيح؟', answer: 'يتفوق بدون خادم لأحمال العمل المتغيرة والأنظمة المدفوعة بالأحداث.' }] } },
      { serviceId: serverless.id, locale: 'ur', name: 'سرور لیس آرکیٹیکچر', shortDescription: 'AWS Lambda، Vercel اور ایج کمپیوٹنگ کے ساتھ قابل توسیع، لاگت مؤثر ایپلیکیشنز بنائیں۔', fullDescription: 'سرور مینجمنٹ کو ختم کریں اور صرف وہی ادا کریں جو آپ استعمال کرتے ہیں۔ ہم AWS Lambda اور Vercel کے ساتھ سرور لیس ایپلیکیشنز ڈیزائن اور تعمیر کرتے ہیں۔', features: ['AWS Lambda اور API Gateway', 'Vercel اور Cloudflare Workers', 'ایونٹ ڈریون آرکیٹیکچر', 'سرور لیس ڈیٹا بیسز', 'ایج کمپیوٹنگ', 'آٹو اسکیلنگ'], benefits: ['صفر سرور مینٹیننس', 'ایگزیکیوشن کے حساب سے ادائیگی', 'کسی بھی لوڈ کے لیے خودکار اسکیلنگ'], content: { process: [{ step: 1, title: 'آرکیٹیکچر ڈیزائن', description: 'مناسب سروس باؤنڈریز اور ڈیٹا پیٹرنز کے ساتھ سرور لیس آرکیٹیکچر ڈیزائن کریں۔' }], faq: [{ question: 'سرور لیس کب صحیح انتخاب ہے؟', answer: 'سرور لیس متغیر ورک لوڈز، ایونٹ ڈریون سسٹمز کے لیے بہترین ہے۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for serverless-architecture');
  }

  // Database Design & Optimization Translations
  const dbDesign = await prisma.service.findUnique({ where: { slug: 'database-design-optimization' } });
  if (dbDesign) {
    const translations = [
      { serviceId: dbDesign.id, locale: 'tr', name: 'Veritabanı Tasarımı & Optimizasyonu', shortDescription: 'Ölçeklenebilir, hızlı uygulamalar için verimli veritabanı şemaları tasarlayın ve sorgu performansını optimize edin.', fullDescription: 'Uygulamanız için sağlam bir veri temeli oluşturun. Normalize şemalar tasarlıyor, indeksleri optimize ediyor, sorguları ayarlıyor ve milyonlarca kayda ölçeklenirken veritabanınızı hızlı tutan önbellek stratejileri uyguluyoruz.', features: ['Şema Tasarımı & Modelleme', 'İndeks Optimizasyonu', 'Sorgu Performans Ayarı', 'Veritabanı Göçü', 'Replikasyon & Sharding', 'Önbellek Stratejileri'], benefits: ['Milisaniyenin altında sorgu yanıtı', 'Milyonlarca kaydı işleyin', 'Azaltılmış altyapı maliyetleri'], content: { process: [{ step: 1, title: 'Veri Modelleme', description: 'Gereksinimleri analiz edin ve uygun normalizasyon ile optimal şema tasarlayın.' }], faq: [{ question: 'SQL mi NoSQL mi - hangisini kullanmalıyız?', answer: 'Karmaşık ilişkilerle yapılandırılmış veriler için SQL. Yapılandırılmamış veriler veya yatay ölçekleme için NoSQL. Çoğu zaman aynı sistemde her ikisi.' }] } },
      { serviceId: dbDesign.id, locale: 'de', name: 'Datenbankdesign & Optimierung', shortDescription: 'Entwerfen Sie effiziente Datenbankschemata und optimieren Sie die Abfrageleistung für skalierbare, schnelle Anwendungen.', fullDescription: 'Bauen Sie ein solides Datenfundament für Ihre Anwendung. Wir entwerfen normalisierte Schemata, optimieren Indizes und implementieren Caching-Strategien.', features: ['Schema-Design & Modellierung', 'Index-Optimierung', 'Abfrage-Performance-Tuning', 'Datenbank-Migration', 'Replikation & Sharding', 'Caching-Strategien'], benefits: ['Sub-Millisekunden Abfrageantwort', 'Millionen von Datensätzen verarbeiten', 'Reduzierte Infrastrukturkosten'], content: { process: [{ step: 1, title: 'Datenmodellierung', description: 'Anforderungen analysieren und optimales Schema mit richtiger Normalisierung entwerfen.' }], faq: [{ question: 'SQL oder NoSQL - was sollten wir verwenden?', answer: 'SQL für strukturierte Daten mit komplexen Beziehungen. NoSQL für unstrukturierte Daten oder horizontale Skalierung.' }] } },
      { serviceId: dbDesign.id, locale: 'ar', name: 'تصميم وتحسين قواعد البيانات', shortDescription: 'صمم مخططات قواعد بيانات فعالة وحسن أداء الاستعلام للتطبيقات القابلة للتطوير والسريعة.', fullDescription: 'قم ببناء أساس بيانات صلب لتطبيقك. نحن نصمم المخططات المعيارية ونحسن الفهارس ونضبط الاستعلامات.', features: ['تصميم ونمذجة المخطط', 'تحسين الفهرس', 'ضبط أداء الاستعلام', 'ترحيل قاعدة البيانات', 'النسخ والتجزئة', 'استراتيجيات التخزين المؤقت'], benefits: ['استجابة استعلام أقل من ميلي ثانية', 'معالجة ملايين السجلات'], content: { process: [{ step: 1, title: 'نمذجة البيانات', description: 'تحليل المتطلبات وتصميم المخطط الأمثل مع التطبيع المناسب.' }], faq: [{ question: 'SQL أو NoSQL - أيهما يجب أن نستخدم؟', answer: 'SQL للبيانات المنظمة ذات العلاقات المعقدة. NoSQL للبيانات غير المنظمة أو التوسع الأفقي.' }] } },
      { serviceId: dbDesign.id, locale: 'ur', name: 'ڈیٹا بیس ڈیزائن اور آپٹیمائزیشن', shortDescription: 'قابل توسیع، تیز ایپلیکیشنز کے لیے موثر ڈیٹا بیس اسکیماز ڈیزائن کریں اور کیوری پرفارمنس کو بہتر بنائیں۔', fullDescription: 'اپنی ایپلیکیشن کے لیے ایک ٹھوس ڈیٹا فاؤنڈیشن بنائیں۔ ہم نارملائزڈ اسکیماز ڈیزائن کرتے ہیں، انڈیکسز کو بہتر بناتے ہیں اور کیشنگ حکمت عملیاں نافذ کرتے ہیں۔', features: ['اسکیما ڈیزائن اور ماڈلنگ', 'انڈیکس آپٹیمائزیشن', 'کیوری پرفارمنس ٹیوننگ', 'ڈیٹا بیس مائیگریشن', 'ریپلیکیشن اور شارڈنگ', 'کیشنگ حکمت عملیاں'], benefits: ['سب ملی سیکنڈ کیوری ریسپانس', 'لاکھوں ریکارڈز ہینڈل کریں'], content: { process: [{ step: 1, title: 'ڈیٹا ماڈلنگ', description: 'ضروریات کا تجزیہ کریں اور مناسب نارملائزیشن کے ساتھ بہترین اسکیما ڈیزائن کریں۔' }], faq: [{ question: 'SQL یا NoSQL - ہمیں کون سا استعمال کرنا چاہیے؟', answer: 'پیچیدہ تعلقات والے سٹرکچرڈ ڈیٹا کے لیے SQL۔ ان سٹرکچرڈ ڈیٹا یا افقی اسکیلنگ کے لیے NoSQL۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for database-design-optimization');
  }

  // AI Chatbot Integration Translations
  const aiChatbot = await prisma.service.findUnique({ where: { slug: 'ai-chatbot-integration' } });
  if (aiChatbot) {
    const translations = [
      { serviceId: aiChatbot.id, locale: 'tr', name: 'AI Chatbot Entegrasyonu', shortDescription: 'GPT-4 ve Claude ile desteklenen akıllı AI chatbot\'ları web sitenize, uygulamanıza veya müşteri hizmetlerinize entegre edin.', fullDescription: 'Özel GPT-4 ve Claude destekli chatbot\'larla ürünlerinize konuşma AI\'ı ekleyin. Bağlamı anlayan, bilgi tabanınıza erişen ve 7/24 yardımcı, marka tutarlı yanıtlar sağlayan akıllı asistanlar oluşturuyoruz.', features: ['GPT-4 & Claude Entegrasyonu', 'Özel Bilgi Tabanı (RAG)', 'Çok Turlu Konuşmalar', 'Niyet Tanıma', 'İnsan Devri', 'Çok Dil Desteği'], benefits: ['7/24 anında sorulara yanıt verin', 'Destek bileti hacmini azaltın', 'Tutarlı, doğru yanıtlar'], content: { process: [{ step: 1, title: 'Bilgi Alımı', description: 'Belgelerinizi ve bilgi tabanınızı erişim için vektör veritabanına alın.' }, { step: 2, title: 'Prompt Mühendisliği', description: 'Doğru, yardımcı ve marka tutarlı yanıtlar sağlayan promptlar tasarlayın.' }], faq: [{ question: 'AI chatbot\'lar ne kadar doğru?', answer: 'RAG ile chatbot\'lar bilgi tabanınızdan yüksek doğrulukla yanıt verir. Halüsinasyonları önlemek için korumalar uyguluyoruz.' }] } },
      { serviceId: aiChatbot.id, locale: 'de', name: 'KI-Chatbot-Integration', shortDescription: 'Integrieren Sie intelligente KI-Chatbots, die von GPT-4 und Claude angetrieben werden, in Ihre Website, App oder Kundenservice.', fullDescription: 'Fügen Sie Ihren Produkten konversationelle KI mit benutzerdefinierten GPT-4 und Claude-gestützten Chatbots hinzu. Wir bauen intelligente Assistenten, die Kontext verstehen und hilfreiche Antworten bieten.', features: ['GPT-4 & Claude Integration', 'Benutzerdefinierte Wissensbasis (RAG)', 'Multi-Turn Konversationen', 'Intent-Erkennung', 'Human Handoff', 'Mehrsprachige Unterstützung'], benefits: ['Fragen 24/7 sofort beantworten', 'Support-Ticket-Volumen reduzieren', 'Konsistente, genaue Antworten'], content: { process: [{ step: 1, title: 'Wissensaufnahme', description: 'Ihre Dokumentation und Wissensbasis in eine Vektordatenbank aufnehmen.' }], faq: [{ question: 'Wie genau sind KI-Chatbots?', answer: 'Mit RAG beantworten Chatbots aus Ihrer Wissensbasis mit hoher Genauigkeit. Wir implementieren Schutzmaßnahmen gegen Halluzinationen.' }] } },
      { serviceId: aiChatbot.id, locale: 'ar', name: 'تكامل روبوت الدردشة بالذكاء الاصطناعي', shortDescription: 'قم بدمج روبوتات دردشة ذكية مدعومة بـ GPT-4 و Claude في موقعك أو تطبيقك أو خدمة العملاء.', fullDescription: 'أضف الذكاء الاصطناعي المحادثي إلى منتجاتك مع روبوتات دردشة مخصصة مدعومة بـ GPT-4 و Claude. نحن نبني مساعدين أذكياء يفهمون السياق ويقدمون ردوداً مفيدة.', features: ['تكامل GPT-4 و Claude', 'قاعدة معرفة مخصصة (RAG)', 'محادثات متعددة الأدوار', 'التعرف على النية', 'التحويل البشري', 'دعم متعدد اللغات'], benefits: ['الرد على الأسئلة 24/7 فوراً', 'تقليل حجم تذاكر الدعم', 'ردود متسقة ودقيقة'], content: { process: [{ step: 1, title: 'استيعاب المعرفة', description: 'استيعاب وثائقك وقاعدة معرفتك في قاعدة بيانات متجهة للاسترجاع.' }], faq: [{ question: 'ما مدى دقة روبوتات الدردشة بالذكاء الاصطناعي؟', answer: 'مع RAG، تجيب روبوتات الدردشة من قاعدة معرفتك بدقة عالية. ننفذ حواجز لمنع الهلوسة.' }] } },
      { serviceId: aiChatbot.id, locale: 'ur', name: 'AI چیٹ بوٹ انٹیگریشن', shortDescription: 'GPT-4 اور Claude سے چلنے والے ذہین AI چیٹ بوٹس کو اپنی ویب سائٹ، ایپ یا کسٹمر سروس میں ضم کریں۔', fullDescription: 'اپنی مصنوعات میں کسٹم GPT-4 اور Claude سے چلنے والے چیٹ بوٹس کے ساتھ بات چیت AI شامل کریں۔ ہم ذہین معاونین بناتے ہیں جو سیاق و سباق سمجھتے ہیں اور مددگار جوابات فراہم کرتے ہیں۔', features: ['GPT-4 اور Claude انٹیگریشن', 'کسٹم نالج بیس (RAG)', 'ملٹی ٹرن بات چیت', 'انٹینٹ ریکگنیشن', 'ہیومن ہینڈ آف', 'ملٹی لینگویج سپورٹ'], benefits: ['24/7 فوری طور پر سوالات کے جوابات دیں', 'سپورٹ ٹکٹ والیم کم کریں', 'مستقل، درست جوابات'], content: { process: [{ step: 1, title: 'نالج انجیسٹیشن', description: 'اپنی دستاویزات اور نالج بیس کو بازیافت کے لیے ویکٹر ڈیٹا بیس میں داخل کریں۔' }], faq: [{ question: 'AI چیٹ بوٹس کتنے درست ہیں؟', answer: 'RAG کے ساتھ، چیٹ بوٹس آپ کی نالج بیس سے اعلی درستگی کے ساتھ جواب دیتے ہیں۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for ai-chatbot-integration');
  }

  // API Security & Authentication Translations
  const apiSecurity = await prisma.service.findUnique({ where: { slug: 'api-security-authentication' } });
  if (apiSecurity) {
    const translations = [
      { serviceId: apiSecurity.id, locale: 'tr', name: 'API Güvenliği & Kimlik Doğrulama', shortDescription: 'OAuth 2.0, JWT token\'ları, API anahtarları ve hız sınırlaması ile sağlam API güvenliği uygulayın.', fullDescription: 'API\'lerinizi yetkisiz erişim ve kötüye kullanımdan koruyun. Verilerinizi güvende tutmak ve sorunsuz geliştirici deneyimleri sağlamak için endüstri standardı kimlik doğrulama protokolleri, yetkilendirme sistemleri ve güvenlik en iyi uygulamalarını uyguluyoruz.', features: ['OAuth 2.0 & OpenID Connect', 'JWT Token Yönetimi', 'API Anahtar Kimlik Doğrulaması', 'Rol Tabanlı Erişim Kontrolü', 'Hız Sınırlaması', 'İstek İmzalama'], benefits: ['Yetkisiz erişimi önleyin', 'API kötüye kullanımına karşı koruyun', 'Güvenlik standartlarına uyumluluk'], content: { process: [{ step: 1, title: 'Güvenlik Değerlendirmesi', description: 'Mevcut API güvenlik durumunu denetleyin ve güvenlik açıklarını belirleyin.' }], faq: [{ question: 'OAuth 2.0 mı yoksa API anahtarları mı - hangisini kullanmalıyız?', answer: 'Kullanıcı yetkilendirilmiş erişim için OAuth 2.0. Sunucudan sunucuya ve daha basit kullanım durumları için API anahtarları.' }] } },
      { serviceId: apiSecurity.id, locale: 'de', name: 'API-Sicherheit & Authentifizierung', shortDescription: 'Implementieren Sie robuste API-Sicherheit mit OAuth 2.0, JWT-Tokens, API-Schlüsseln und Rate-Limiting.', fullDescription: 'Schützen Sie Ihre APIs vor unbefugtem Zugriff und Missbrauch. Wir implementieren Industrie-Standard-Authentifizierungsprotokolle und Sicherheits-Best-Practices.', features: ['OAuth 2.0 & OpenID Connect', 'JWT-Token-Management', 'API-Schlüssel-Authentifizierung', 'Rollenbasierte Zugriffskontrolle', 'Rate-Limiting', 'Request-Signierung'], benefits: ['Unbefugten Zugriff verhindern', 'Vor API-Missbrauch schützen', 'Einhaltung von Sicherheitsstandards'], content: { process: [{ step: 1, title: 'Sicherheitsbewertung', description: 'Aktuelle API-Sicherheitslage prüfen und Schwachstellen identifizieren.' }], faq: [{ question: 'OAuth 2.0 oder API-Schlüssel - was sollten wir verwenden?', answer: 'OAuth 2.0 für benutzer-delegierten Zugriff. API-Schlüssel für Server-zu-Server und einfachere Anwendungsfälle.' }] } },
      { serviceId: apiSecurity.id, locale: 'ar', name: 'أمان API والمصادقة', shortDescription: 'قم بتنفيذ أمان API قوي مع OAuth 2.0 ورموز JWT ومفاتيح API وتحديد المعدل.', fullDescription: 'احمِ واجهات API الخاصة بك من الوصول غير المصرح به وسوء الاستخدام. نحن ننفذ بروتوكولات المصادقة القياسية في الصناعة وأفضل ممارسات الأمان.', features: ['OAuth 2.0 و OpenID Connect', 'إدارة رموز JWT', 'مصادقة مفتاح API', 'التحكم في الوصول القائم على الدور', 'تحديد المعدل', 'توقيع الطلب'], benefits: ['منع الوصول غير المصرح به', 'الحماية من إساءة استخدام API', 'الامتثال لمعايير الأمان'], content: { process: [{ step: 1, title: 'تقييم الأمان', description: 'تدقيق وضع أمان API الحالي وتحديد نقاط الضعف.' }], faq: [{ question: 'OAuth 2.0 أو مفاتيح API - أيهما يجب أن نستخدم؟', answer: 'OAuth 2.0 للوصول المفوض من المستخدم. مفاتيح API للخادم إلى الخادم وحالات الاستخدام الأبسط.' }] } },
      { serviceId: apiSecurity.id, locale: 'ur', name: 'API سیکیورٹی اور تصدیق', shortDescription: 'OAuth 2.0، JWT ٹوکنز، API کیز اور ریٹ لمیٹنگ کے ساتھ مضبوط API سیکیورٹی نافذ کریں۔', fullDescription: 'اپنے APIs کو غیر مجاز رسائی اور غلط استعمال سے بچائیں۔ ہم انڈسٹری سٹینڈرڈ تصدیقی پروٹوکولز اور سیکیورٹی بہترین طریقے نافذ کرتے ہیں۔', features: ['OAuth 2.0 اور OpenID Connect', 'JWT ٹوکن مینجمنٹ', 'API کی تصدیق', 'رول بیسڈ ایکسیس کنٹرول', 'ریٹ لمیٹنگ', 'ریکویسٹ سائننگ'], benefits: ['غیر مجاز رسائی روکیں', 'API کے غلط استعمال سے بچاؤ', 'سیکیورٹی معیارات کی تعمیل'], content: { process: [{ step: 1, title: 'سیکیورٹی اسیسمنٹ', description: 'موجودہ API سیکیورٹی کا آڈٹ کریں اور کمزوریوں کی شناخت کریں۔' }], faq: [{ question: 'OAuth 2.0 یا API کیز - ہمیں کون سا استعمال کرنا چاہیے؟', answer: 'صارف کی طرف سے مجاز رسائی کے لیے OAuth 2.0۔ سرور ٹو سرور اور آسان استعمال کے معاملات کے لیے API کیز۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for api-security-authentication');
  }

  // Progressive Web Apps Translations
  const pwa = await prisma.service.findUnique({ where: { slug: 'progressive-web-apps' } });
  if (pwa) {
    const translations = [
      { serviceId: pwa.id, locale: 'tr', name: 'İlerici Web Uygulamaları', shortDescription: 'PWA teknolojisiyle web üzerinde uygulama benzeri deneyimler yaratın—kurulabilir, hızlı ve çevrimdışı çalışan.', fullDescription: 'PWA\'lar web ve yerel uygulamaların en iyisini birleştirir. Anında yüklenen, çevrimdışı çalışan ve herhangi bir cihaza kurulabilen PWA\'lar inşa ediyoruz.', features: ['Service Worker Uygulaması', 'Çevrimdışı Öncelikli Mimari', 'Uygulama Manifestosu', 'Push Bildirimleri', 'Arka Plan Senkronizasyonu', 'Tüm Cihazlar İçin Duyarlı Tasarım'], benefits: ['Uygulama mağazası olmadan herhangi bir cihaza kurun', 'Çevrimdışı ve zayıf ağlarda çalışır', 'Geleneksel web uygulamalarından daha hızlı'], content: { process: [{ step: 1, title: 'PWA Denetimi', description: 'Mevcut web uygulamanızı değerlendirin, PWA fırsatlarını belirleyin.' }], faq: [{ question: 'PWA\'yı normal web sitesinden farklı kılan nedir?', answer: 'PWA\'lar kurulabilir, çevrimdışı çalışır, push bildirimleri gönderebilir ve uygulama benzeri deneyimler sunar.' }] } },
      { serviceId: pwa.id, locale: 'de', name: 'Progressive Web Apps', shortDescription: 'Erstellen Sie app-ähnliche Erlebnisse im Web mit PWA-Technologie—installierbar, schnell und offline funktionsfähig.', fullDescription: 'PWAs kombinieren das Beste aus Web und nativen Apps. Wir bauen PWAs, die sofort laden, offline funktionieren und auf jedem Gerät installiert werden können.', features: ['Service Worker Implementierung', 'Offline-First Architektur', 'App Manifest', 'Push-Benachrichtigungen', 'Hintergrund-Sync', 'Responsives Design'], benefits: ['Installation ohne App Stores', 'Funktioniert offline', 'Schneller als traditionelle Web-Apps'], content: { process: [{ step: 1, title: 'PWA-Audit', description: 'Bewerten Sie Ihre bestehende Web-App und identifizieren Sie PWA-Möglichkeiten.' }], faq: [{ question: 'Was unterscheidet eine PWA von einer normalen Website?', answer: 'PWAs sind installierbar, funktionieren offline, können Push-Benachrichtigungen senden und bieten app-ähnliche Erlebnisse.' }] } },
      { serviceId: pwa.id, locale: 'ar', name: 'تطبيقات الويب التقدمية', shortDescription: 'أنشئ تجارب شبيهة بالتطبيقات على الويب باستخدام تقنية PWA—قابلة للتثبيت وسريعة وتعمل بدون اتصال.', fullDescription: 'تجمع PWAs بين أفضل ما في الويب والتطبيقات الأصلية. نبني PWAs تحمّل فوراً وتعمل بدون اتصال ويمكن تثبيتها على أي جهاز.', features: ['تنفيذ Service Worker', 'بنية Offline-First', 'App Manifest', 'إشعارات Push', 'مزامنة الخلفية', 'تصميم متجاوب'], benefits: ['التثبيت بدون متاجر التطبيقات', 'يعمل بدون اتصال', 'أسرع من تطبيقات الويب التقليدية'], content: { process: [{ step: 1, title: 'تدقيق PWA', description: 'تقييم تطبيق الويب الحالي وتحديد فرص PWA.' }], faq: [{ question: 'ما الذي يميز PWA عن موقع ويب عادي؟', answer: 'PWAs قابلة للتثبيت، تعمل بدون اتصال، يمكنها إرسال إشعارات وتوفر تجارب شبيهة بالتطبيقات.' }] } },
      { serviceId: pwa.id, locale: 'ur', name: 'پروگریسو ویب ایپس', shortDescription: 'PWA ٹیکنالوجی کے ساتھ ویب پر ایپ جیسے تجربات بنائیں—انسٹال ہونے والے، تیز اور آف لائن کام کرنے والے۔', fullDescription: 'PWAs ویب اور نیٹو ایپس کا بہترین مجموعہ ہیں۔ ہم PWAs بناتے ہیں جو فوری لوڈ ہوتے ہیں، آف لائن کام کرتے ہیں اور کسی بھی ڈیوائس پر انسٹال ہو سکتے ہیں۔', features: ['Service Worker نفاذ', 'آف لائن فرسٹ آرکیٹیکچر', 'App Manifest', 'پش نوٹیفیکیشنز', 'بیک گراؤنڈ سنک', 'ریسپانسو ڈیزائن'], benefits: ['ایپ سٹورز کے بغیر انسٹال کریں', 'آف لائن کام کرتا ہے', 'روایتی ویب ایپس سے تیز'], content: { process: [{ step: 1, title: 'PWA آڈٹ', description: 'اپنی موجودہ ویب ایپ کا جائزہ لیں اور PWA مواقع کی نشاندہی کریں۔' }], faq: [{ question: 'PWA کو عام ویب سائٹ سے کیا مختلف بناتا ہے؟', answer: 'PWAs انسٹال ہونے والے ہیں، آف لائن کام کرتے ہیں، پش نوٹیفیکیشنز بھیج سکتے ہیں اور ایپ جیسے تجربات فراہم کرتے ہیں۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for progressive-web-apps');
  }

  // Flutter Development Translations
  const flutter = await prisma.service.findUnique({ where: { slug: 'flutter-development' } });
  if (flutter) {
    const translations = [
      { serviceId: flutter.id, locale: 'tr', name: 'Flutter Geliştirme', shortDescription: 'Flutter ile çarpıcı çapraz platform uygulamaları oluşturun—iOS, Android, web ve masaüstü için tek kod tabanı.', fullDescription: 'Flutter, yerel koda derlenen tek kod tabanıyla gerçek çapraz platform geliştirme sağlar. Her platformda yerel görünen ve hissettiren güzel, hızlı Flutter uygulamaları inşa ediyoruz.', features: ['Çapraz Platform (iOS, Android, Web, Masaüstü)', 'Özel Widget Geliştirme', 'Durum Yönetimi (Riverpod, BLoC)', 'Firebase Entegrasyonu', 'Platform Özel Özelleştirmeler', 'Animasyonlar'], benefits: ['Tüm platformlar için tek kod tabanı', 'Yerele yakın performans', 'Güzel, özelleştirilebilir arayüz'], content: { process: [{ step: 1, title: 'Tasarım & Mimari', description: 'UI mockupları oluşturun, uygulama mimarisini tanımlayın, durum yönetimi yaklaşımını seçin.' }], faq: [{ question: 'Flutter vs React Native—hangisi daha iyi?', answer: 'Flutter kendi render motoruyla daha iyi performans ve arayüz tutarlılığı sunar. React Native mevcut React ekibiniz varsa daha iyi.' }] } },
      { serviceId: flutter.id, locale: 'de', name: 'Flutter Entwicklung', shortDescription: 'Erstellen Sie atemberaubende Cross-Platform-Apps mit Flutter—eine Codebasis für iOS, Android, Web und Desktop.', fullDescription: 'Flutter ermöglicht echte Cross-Platform-Entwicklung mit einer einzigen Codebasis, die zu nativem Code kompiliert wird. Wir bauen schöne, schnelle Flutter-Apps.', features: ['Cross-Platform (iOS, Android, Web, Desktop)', 'Custom Widget Entwicklung', 'State Management (Riverpod, BLoC)', 'Firebase Integration', 'Plattform-spezifische Anpassungen', 'Animationen'], benefits: ['Eine Codebasis für alle Plattformen', 'Near-native Performance', 'Schöne, anpassbare UI'], content: { process: [{ step: 1, title: 'Design & Architektur', description: 'UI-Mockups erstellen, App-Architektur definieren, State-Management-Ansatz wählen.' }], faq: [{ question: 'Flutter vs React Native—was ist besser?', answer: 'Flutter bietet bessere Performance und UI-Konsistenz mit eigener Render-Engine. React Native ist besser bei bestehendem React-Team.' }] } },
      { serviceId: flutter.id, locale: 'ar', name: 'تطوير Flutter', shortDescription: 'أنشئ تطبيقات مذهلة متعددة المنصات مع Flutter—قاعدة كود واحدة لـ iOS و Android والويب وسطح المكتب.', fullDescription: 'يتيح Flutter التطوير الحقيقي متعدد المنصات بقاعدة كود واحدة تُترجم إلى كود أصلي. نبني تطبيقات Flutter جميلة وسريعة.', features: ['متعدد المنصات (iOS، Android، الويب، سطح المكتب)', 'تطوير Widgets مخصصة', 'إدارة الحالة (Riverpod، BLoC)', 'تكامل Firebase', 'تخصيصات خاصة بالمنصة', 'الرسوم المتحركة'], benefits: ['قاعدة كود واحدة لجميع المنصات', 'أداء قريب من الأصلي', 'واجهة جميلة وقابلة للتخصيص'], content: { process: [{ step: 1, title: 'التصميم والبنية', description: 'إنشاء نماذج UI، تحديد بنية التطبيق، اختيار نهج إدارة الحالة.' }], faq: [{ question: 'Flutter مقابل React Native—أيهما أفضل؟', answer: 'Flutter يوفر أداء أفضل وتناسق UI مع محرك العرض الخاص به. React Native أفضل إذا كان لديك فريق React.' }] } },
      { serviceId: flutter.id, locale: 'ur', name: 'Flutter ڈیولپمنٹ', shortDescription: 'Flutter کے ساتھ شاندار کراس پلیٹ فارم ایپس بنائیں—iOS، Android، ویب اور ڈیسک ٹاپ کے لیے ایک کوڈ بیس۔', fullDescription: 'Flutter ایک کوڈ بیس کے ساتھ حقیقی کراس پلیٹ فارم ڈیولپمنٹ فراہم کرتا ہے جو نیٹو کوڈ میں کمپائل ہوتا ہے۔ ہم خوبصورت، تیز Flutter ایپس بناتے ہیں۔', features: ['کراس پلیٹ فارم (iOS، Android، ویب، ڈیسک ٹاپ)', 'کسٹم Widget ڈیولپمنٹ', 'اسٹیٹ مینجمنٹ (Riverpod، BLoC)', 'Firebase انٹیگریشن', 'پلیٹ فارم مخصوص تخصیصات', 'اینیمیشنز'], benefits: ['تمام پلیٹ فارمز کے لیے ایک کوڈ بیس', 'نیٹو کے قریب پرفارمنس', 'خوبصورت، اپنی مرضی کے مطابق UI'], content: { process: [{ step: 1, title: 'ڈیزائن اور آرکیٹیکچر', description: 'UI ماک اپس بنائیں، ایپ آرکیٹیکچر کی وضاحت کریں، اسٹیٹ مینجمنٹ کا طریقہ منتخب کریں۔' }], faq: [{ question: 'Flutter بمقابلہ React Native—کون سا بہتر ہے؟', answer: 'Flutter اپنے رینڈر انجن کے ساتھ بہتر پرفارمنس اور UI مستقل مزاجی فراہم کرتا ہے۔ React Native بہتر ہے اگر آپ کے پاس React ٹیم ہے۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for flutter-development');
  }

  // Blockchain Development Translations
  const blockchain = await prisma.service.findUnique({ where: { slug: 'blockchain-development' } });
  if (blockchain) {
    const translations = [
      { serviceId: blockchain.id, locale: 'tr', name: 'Blockchain Geliştirme', shortDescription: 'Ethereum, Solana ve daha fazlasında güvenli akıllı sözleşmeler, DApp\'ler ve blockchain entegrasyonları geliştirin.', fullDescription: 'İşinize şeffaflık, güvenlik ve merkeziyetsizlik getiren blockchain çözümleri inşa ediyoruz. Akıllı sözleşmelerden tam DApp geliştirmeye, token oluşturmaya ve NFT pazarlarına kadar.', features: ['Akıllı Sözleşme Geliştirme', 'DApp Ön Yüz & Arka Uç', 'Token Oluşturma (ERC-20, ERC-721)', 'NFT Pazarı Geliştirme', 'Cüzdan Entegrasyonu', 'Çapraz Zincir Çözümleri'], benefits: ['Değiştirilemez, kurcalamaya dayanıklı kayıtlar', 'Aracısız güvensiz işlemler', '7/24 küresel erişilebilirlik'], content: { process: [{ step: 1, title: 'Blockchain Stratejisi', description: 'Kullanım durumu uygunluğunu değerlendirin, uygun blockchain seçin.' }], faq: [{ question: 'Hangi blockchain\'i kullanmalıyız?', answer: 'Maksimum merkeziyetsizlik için Ethereum, hız ve düşük ücretler için Solana, daha düşük maliyetlerle Ethereum uyumluluğu için Polygon.' }] } },
      { serviceId: blockchain.id, locale: 'de', name: 'Blockchain Entwicklung', shortDescription: 'Entwickeln Sie sichere Smart Contracts, DApps und Blockchain-Integrationen auf Ethereum, Solana und mehr.', fullDescription: 'Wir bauen Blockchain-Lösungen, die Transparenz, Sicherheit und Dezentralisierung in Ihr Unternehmen bringen. Von Smart Contracts bis zu DApp-Entwicklung und NFT-Marktplätzen.', features: ['Smart Contract Entwicklung', 'DApp Frontend & Backend', 'Token-Erstellung (ERC-20, ERC-721)', 'NFT-Marktplatz Entwicklung', 'Wallet-Integration', 'Cross-Chain Lösungen'], benefits: ['Unveränderliche, manipulationssichere Aufzeichnungen', 'Vertrauenslose Transaktionen ohne Vermittler', 'Globale Erreichbarkeit 24/7'], content: { process: [{ step: 1, title: 'Blockchain-Strategie', description: 'Use-Case-Eignung bewerten, geeignete Blockchain wählen.' }], faq: [{ question: 'Welche Blockchain sollten wir verwenden?', answer: 'Ethereum für maximale Dezentralisierung, Solana für Geschwindigkeit und niedrige Gebühren, Polygon für Ethereum-Kompatibilität mit niedrigeren Kosten.' }] } },
      { serviceId: blockchain.id, locale: 'ar', name: 'تطوير البلوكتشين', shortDescription: 'طور عقوداً ذكية آمنة وتطبيقات لامركزية وتكاملات بلوكتشين على Ethereum و Solana والمزيد.', fullDescription: 'نبني حلول بلوكتشين تجلب الشفافية والأمان واللامركزية لعملك. من العقود الذكية إلى تطوير DApp وأسواق NFT.', features: ['تطوير العقود الذكية', 'واجهة وخلفية DApp', 'إنشاء التوكنات (ERC-20، ERC-721)', 'تطوير سوق NFT', 'تكامل المحفظة', 'حلول عبر السلاسل'], benefits: ['سجلات غير قابلة للتغيير ومقاومة للعبث', 'معاملات بدون وسطاء', 'إمكانية الوصول العالمية 24/7'], content: { process: [{ step: 1, title: 'استراتيجية البلوكتشين', description: 'تقييم ملاءمة حالة الاستخدام واختيار البلوكتشين المناسب.' }], faq: [{ question: 'أي بلوكتشين يجب أن نستخدم؟', answer: 'Ethereum للحد الأقصى من اللامركزية، Solana للسرعة والرسوم المنخفضة، Polygon للتوافق مع Ethereum بتكاليف أقل.' }] } },
      { serviceId: blockchain.id, locale: 'ur', name: 'بلاکچین ڈیولپمنٹ', shortDescription: 'Ethereum، Solana اور مزید پر محفوظ سمارٹ کنٹریکٹس، DApps اور بلاکچین انٹیگریشنز تیار کریں۔', fullDescription: 'ہم بلاکچین حل بناتے ہیں جو آپ کے کاروبار میں شفافیت، سیکیورٹی اور ڈی سینٹرلائزیشن لاتے ہیں۔ سمارٹ کنٹریکٹس سے لے کر DApp ڈیولپمنٹ اور NFT مارکیٹ پلیسز تک۔', features: ['سمارٹ کنٹریکٹ ڈیولپمنٹ', 'DApp فرنٹ اینڈ اور بیک اینڈ', 'ٹوکن تخلیق (ERC-20، ERC-721)', 'NFT مارکیٹ پلیس ڈیولپمنٹ', 'والیٹ انٹیگریشن', 'کراس چین حل'], benefits: ['ناقابل تبدیل، چھیڑ چھاڑ سے محفوظ ریکارڈز', 'بغیر ثالث کے ٹرانزیکشنز', '24/7 عالمی رسائی'], content: { process: [{ step: 1, title: 'بلاکچین حکمت عملی', description: 'استعمال کی صورت کی موزونیت کا جائزہ لیں، مناسب بلاکچین منتخب کریں۔' }], faq: [{ question: 'ہمیں کون سا بلاکچین استعمال کرنا چاہیے؟', answer: 'زیادہ سے زیادہ ڈی سینٹرلائزیشن کے لیے Ethereum، رفتار اور کم فیس کے لیے Solana، کم لاگت کے ساتھ Ethereum مطابقت کے لیے Polygon۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for blockchain-development');
  }

  // NLP Translations
  const nlp = await prisma.service.findUnique({ where: { slug: 'natural-language-processing' } });
  if (nlp) {
    const translations = [
      { serviceId: nlp.id, locale: 'tr', name: 'Doğal Dil İşleme', shortDescription: 'Metin analizi, duygu algılama, sohbet botları ve dil üretimi için NLP çözümleri oluşturun.', fullDescription: 'NLP, makinelerin insan dilini anlamasını ve onunla çalışmasını sağlar. Metinden içgörü çıkaran, akıllı sohbet botlarını güçlendiren, duygu analizi yapan ve insan benzeri içerik üreten NLP çözümleri inşa ediyoruz.', features: ['Metin Sınıflandırma', 'Duygu Analizi', 'Varlık Tanıma', 'Metin Özetleme', 'Dil Çevirisi', 'Soru Yanıtlama Sistemleri'], benefits: ['Belge işlemeyi otomatikleştirin', 'Ölçekte müşteri duygusunu anlayın', 'Yapılandırılmamış metinden yapılandırılmış veri çıkarın'], content: { process: [{ step: 1, title: 'Veri Toplama & Etiketleme', description: 'Eğitim verisi toplayın, etiketleme kılavuzları oluşturun.' }], faq: [{ question: 'Geleneksel NLP mi LLM\'ler mi kullanmalı?', answer: 'Etiketli verilerle NER, sınıflandırma gibi yapılandırılmış görevler için geleneksel NLP. Karmaşık muhakeme ve üretim için LLM\'ler.' }] } },
      { serviceId: nlp.id, locale: 'de', name: 'Natürliche Sprachverarbeitung', shortDescription: 'Erstellen Sie NLP-Lösungen für Textanalyse, Sentiment-Erkennung, Chatbots und Sprachgenerierung.', fullDescription: 'NLP ermöglicht Maschinen, menschliche Sprache zu verstehen und damit zu arbeiten. Wir bauen NLP-Lösungen, die Erkenntnisse aus Text extrahieren und menschenähnliche Inhalte generieren.', features: ['Textklassifizierung', 'Sentiment-Analyse', 'Named Entity Recognition', 'Textzusammenfassung', 'Sprachübersetzung', 'Frage-Antwort-Systeme'], benefits: ['Dokumentenverarbeitung automatisieren', 'Kundenstimmung im großen Maßstab verstehen', 'Strukturierte Daten aus unstrukturiertem Text extrahieren'], content: { process: [{ step: 1, title: 'Datensammlung & Annotation', description: 'Trainingsdaten sammeln, Annotationsrichtlinien erstellen.' }], faq: [{ question: 'Wann traditionelles NLP vs LLMs verwenden?', answer: 'Traditionelles NLP für strukturierte Aufgaben wie NER, Klassifizierung. LLMs für komplexes Reasoning und Generierung.' }] } },
      { serviceId: nlp.id, locale: 'ar', name: 'معالجة اللغة الطبيعية', shortDescription: 'أنشئ حلول NLP لتحليل النص واكتشاف المشاعر وروبوتات الدردشة وتوليد اللغة.', fullDescription: 'تمكّن NLP الآلات من فهم اللغة البشرية والعمل معها. نبني حلول NLP تستخرج الرؤى من النص وتولد محتوى يشبه البشر.', features: ['تصنيف النص', 'تحليل المشاعر', 'التعرف على الكيانات', 'تلخيص النص', 'ترجمة اللغة', 'أنظمة الإجابة على الأسئلة'], benefits: ['أتمتة معالجة المستندات', 'فهم مشاعر العملاء على نطاق واسع', 'استخراج بيانات منظمة من نص غير منظم'], content: { process: [{ step: 1, title: 'جمع البيانات والتعليق', description: 'جمع بيانات التدريب وإنشاء إرشادات التعليق.' }], faq: [{ question: 'متى نستخدم NLP التقليدي مقابل LLMs؟', answer: 'NLP التقليدي للمهام المنظمة مثل NER والتصنيف. LLMs للاستدلال المعقد والتوليد.' }] } },
      { serviceId: nlp.id, locale: 'ur', name: 'نیچرل لینگویج پروسیسنگ', shortDescription: 'ٹیکسٹ تجزیہ، جذبات کی شناخت، چیٹ بوٹس اور زبان کی تخلیق کے لیے NLP حل بنائیں۔', fullDescription: 'NLP مشینوں کو انسانی زبان کو سمجھنے اور اس کے ساتھ کام کرنے کے قابل بناتا ہے۔ ہم NLP حل بناتے ہیں جو ٹیکسٹ سے بصیرت نکالتے ہیں اور انسان جیسا مواد تیار کرتے ہیں۔', features: ['ٹیکسٹ درجہ بندی', 'جذبات کا تجزیہ', 'انٹٹی ریکگنیشن', 'ٹیکسٹ کا خلاصہ', 'زبان کا ترجمہ', 'سوال جواب سسٹمز'], benefits: ['دستاویزات کی پروسیسنگ کو خودکار بنائیں', 'بڑے پیمانے پر کسٹمر کے جذبات کو سمجھیں', 'غیر ساختہ متن سے ساختہ ڈیٹا نکالیں'], content: { process: [{ step: 1, title: 'ڈیٹا جمع اور لیبلنگ', description: 'تربیتی ڈیٹا جمع کریں، لیبلنگ گائیڈلائنز بنائیں۔' }], faq: [{ question: 'روایتی NLP یا LLMs کب استعمال کریں؟', answer: 'NER، درجہ بندی جیسے ساختہ کاموں کے لیے روایتی NLP۔ پیچیدہ استدلال اور تخلیق کے لیے LLMs۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for natural-language-processing');
  }

  // Predictive Analytics Translations
  const predictive = await prisma.service.findUnique({ where: { slug: 'predictive-analytics' } });
  if (predictive) {
    const translations = [
      { serviceId: predictive.id, locale: 'tr', name: 'Öngörücü Analitik', shortDescription: 'ML destekli analitikle trendleri tahmin edin, müşteri davranışını öngörün ve riskleri tahmin edin.', fullDescription: 'Öngörücü analitik, gelecekteki sonuçları tahmin etmek için geçmiş verileri ve makine öğrenimini kullanır. Müşteri kaybını, talep tahminini, dolandırıcılık tespitini ve daha fazlasını öngören modeller inşa ediyoruz.', features: ['Talep Tahmini', 'Müşteri Kayıp Tahmini', 'Dolandırıcılık Tespiti', 'Kestirimci Bakım', 'Risk Skorlaması', 'Lead Skorlaması'], benefits: ['Reaktif yerine proaktif kararlar alın', 'Sorunları önceden tahmin ederek maliyetleri azaltın', 'Fırsatları öngörerek geliri artırın'], content: { process: [{ step: 1, title: 'Problem Tanımı', description: 'İş problemini, tahmin hedefini ve başarı metriklerini net olarak tanımlayın.' }], faq: [{ question: 'Tahmine dayalı modeller ne kadar doğru?', answer: 'Doğruluk, problem karmaşıklığına ve veri kalitesine göre değişir. Gerçekçi beklentiler koyar ve karar vermeyi iyileştiren tahminler sağlarız.' }] } },
      { serviceId: predictive.id, locale: 'de', name: 'Prädiktive Analytik', shortDescription: 'Prognostizieren Sie Trends, sagen Sie Kundenverhalten voraus und antizipieren Sie Risiken mit ML-gestützter Analytik.', fullDescription: 'Prädiktive Analytik nutzt historische Daten und Machine Learning, um zukünftige Ergebnisse vorherzusagen. Wir bauen Modelle für Churn-Vorhersage, Bedarfsprognose und Betrugserkennung.', features: ['Bedarfsprognose', 'Kunden-Churn-Vorhersage', 'Betrugserkennung', 'Prädiktive Wartung', 'Risikobewertung', 'Lead-Scoring'], benefits: ['Proaktive statt reaktive Entscheidungen', 'Kosten durch Problemantizipation reduzieren', 'Umsatz durch Chancenvorhersage steigern'], content: { process: [{ step: 1, title: 'Problemdefinition', description: 'Geschäftsproblem, Vorhersageziel und Erfolgsmetriken klar definieren.' }], faq: [{ question: 'Wie genau sind prädiktive Modelle?', answer: 'Genauigkeit variiert nach Problemkomplexität und Datenqualität. Wir setzen realistische Erwartungen und liefern handlungsrelevante Vorhersagen.' }] } },
      { serviceId: predictive.id, locale: 'ar', name: 'التحليلات التنبؤية', shortDescription: 'تنبأ بالاتجاهات وتوقع سلوك العملاء وتوقع المخاطر مع التحليلات المدعومة بـ ML.', fullDescription: 'تستخدم التحليلات التنبؤية البيانات التاريخية والتعلم الآلي للتنبؤ بالنتائج المستقبلية. نبني نماذج للتنبؤ بفقدان العملاء والطلب واكتشاف الاحتيال.', features: ['التنبؤ بالطلب', 'التنبؤ بفقدان العملاء', 'اكتشاف الاحتيال', 'الصيانة التنبؤية', 'تسجيل المخاطر', 'تسجيل العملاء المحتملين'], benefits: ['قرارات استباقية بدلاً من رد الفعل', 'تقليل التكاليف بتوقع المشاكل', 'زيادة الإيرادات بتوقع الفرص'], content: { process: [{ step: 1, title: 'تعريف المشكلة', description: 'تحديد مشكلة العمل وهدف التنبؤ ومقاييس النجاح بوضوح.' }], faq: [{ question: 'ما مدى دقة النماذج التنبؤية؟', answer: 'تختلف الدقة حسب تعقيد المشكلة وجودة البيانات. نضع توقعات واقعية ونقدم تنبؤات قابلة للتنفيذ.' }] } },
      { serviceId: predictive.id, locale: 'ur', name: 'پیش گوئی تجزیات', shortDescription: 'ML سے چلنے والے تجزیات کے ساتھ رجحانات کی پیش گوئی کریں، کسٹمر کے رویے کا اندازہ لگائیں اور خطرات کا تخمینہ لگائیں۔', fullDescription: 'پیش گوئی تجزیات مستقبل کے نتائج کی پیش گوئی کے لیے تاریخی ڈیٹا اور مشین لرننگ کا استعمال کرتا ہے۔ ہم کسٹمر چرن، ڈیمانڈ فورکاسٹ اور فراڈ ڈٹیکشن کے ماڈلز بناتے ہیں۔', features: ['ڈیمانڈ فورکاسٹنگ', 'کسٹمر چرن پریڈکشن', 'فراڈ ڈٹیکشن', 'پریڈکٹو مینٹیننس', 'رسک اسکورنگ', 'لیڈ اسکورنگ'], benefits: ['ری ایکٹو کے بجائے پرو ایکٹو فیصلے کریں', 'مسائل کا اندازہ لگا کر اخراجات کم کریں', 'مواقع کی پیش گوئی کرکے آمدنی بڑھائیں'], content: { process: [{ step: 1, title: 'مسئلے کی تعریف', description: 'کاروباری مسئلہ، پیش گوئی کا ہدف اور کامیابی کے میٹرکس واضح طور پر بیان کریں۔' }], faq: [{ question: 'پیش گوئی ماڈلز کتنے درست ہیں؟', answer: 'درستگی مسئلے کی پیچیدگی اور ڈیٹا کوالٹی کے مطابق مختلف ہوتی ہے۔ ہم حقیقت پسندانہ توقعات مقرر کرتے ہیں اور قابل عمل پیش گوئیاں فراہم کرتے ہیں۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for predictive-analytics');
  }

  // WordPress Development Translations
  const wordpress = await prisma.service.findUnique({ where: { slug: 'wordpress-development' } });
  if (wordpress) {
    const translations = [
      { serviceId: wordpress.id, locale: 'tr', name: 'WordPress Geliştirme', shortDescription: 'Özel temalar, eklentiler ve optimize edilmiş performansla güçlü WordPress siteleri oluşturun.', fullDescription: 'WordPress web\'in %40\'tan fazlasını güçlendiriyor. Pazarlama sitelerinden karmaşık uygulamalara kadar özel WordPress çözümleri inşa ediyoruz.', features: ['Özel Tema Geliştirme', 'Eklenti Geliştirme', 'WooCommerce Entegrasyonu', 'Performans Optimizasyonu', 'Güvenlik Sertleştirme', 'Headless WordPress'], benefits: ['Teknik olmayan kullanıcılar için kolay içerik yönetimi', 'Devasa eklenti ekosistemi', 'SEO dostu'], content: { process: [{ step: 1, title: 'Gereksinimler & Tasarım', description: 'İçerik ihtiyaçlarını anlayın, site mimarisini tasarlayın.' }], faq: [{ question: 'WordPress ne zaman özel geliştirmeden daha iyi?', answer: 'İçerik ağırlıklı siteler, bloglar ve teknik olmayan kullanıcıların içerik güncellemesi gerektiğinde WordPress.' }] } },
      { serviceId: wordpress.id, locale: 'de', name: 'WordPress Entwicklung', shortDescription: 'Erstellen Sie leistungsstarke WordPress-Sites mit benutzerdefinierten Themes, Plugins und optimierter Performance.', fullDescription: 'WordPress betreibt über 40% des Webs. Wir bauen maßgeschneiderte WordPress-Lösungen von Marketing-Sites bis zu komplexen Anwendungen.', features: ['Benutzerdefinierte Theme-Entwicklung', 'Plugin-Entwicklung', 'WooCommerce-Integration', 'Performance-Optimierung', 'Sicherheitshärtung', 'Headless WordPress'], benefits: ['Einfache Inhaltsverwaltung für Nicht-Techniker', 'Riesiges Plugin-Ökosystem', 'SEO-freundlich'], content: { process: [{ step: 1, title: 'Anforderungen & Design', description: 'Inhaltsbedürfnisse verstehen, Site-Architektur entwerfen.' }], faq: [{ question: 'Wann ist WordPress besser als Custom Development?', answer: 'WordPress für inhaltsreiche Sites, Blogs und wenn Nicht-Techniker Inhalte aktualisieren müssen.' }] } },
      { serviceId: wordpress.id, locale: 'ar', name: 'تطوير ووردبريس', shortDescription: 'أنشئ مواقع WordPress قوية مع قوالب مخصصة وإضافات وأداء محسن.', fullDescription: 'يشغل WordPress أكثر من 40% من الويب. نبني حلول WordPress مخصصة من مواقع التسويق إلى التطبيقات المعقدة.', features: ['تطوير قوالب مخصصة', 'تطوير الإضافات', 'تكامل WooCommerce', 'تحسين الأداء', 'تعزيز الأمان', 'Headless WordPress'], benefits: ['إدارة محتوى سهلة لغير التقنيين', 'نظام إضافات ضخم', 'صديق لـ SEO'], content: { process: [{ step: 1, title: 'المتطلبات والتصميم', description: 'فهم احتياجات المحتوى وتصميم بنية الموقع.' }], faq: [{ question: 'متى يكون WordPress أفضل من التطوير المخصص؟', answer: 'WordPress للمواقع الغنية بالمحتوى والمدونات وعندما يحتاج غير التقنيين لتحديث المحتوى.' }] } },
      { serviceId: wordpress.id, locale: 'ur', name: 'ورڈپریس ڈیولپمنٹ', shortDescription: 'کسٹم تھیمز، پلگ انز اور بہتر پرفارمنس کے ساتھ طاقتور WordPress سائٹس بنائیں۔', fullDescription: 'WordPress ویب کے 40% سے زیادہ کو پاور کرتا ہے۔ ہم مارکیٹنگ سائٹس سے لے کر پیچیدہ ایپلیکیشنز تک WordPress حل بناتے ہیں۔', features: ['کسٹم تھیم ڈیولپمنٹ', 'پلگ ان ڈیولپمنٹ', 'WooCommerce انٹیگریشن', 'پرفارمنس آپٹیمائزیشن', 'سیکیورٹی ہارڈننگ', 'Headless WordPress'], benefits: ['غیر تکنیکی صارفین کے لیے آسان مواد کا انتظام', 'بڑا پلگ ان ایکو سسٹم', 'SEO فرینڈلی'], content: { process: [{ step: 1, title: 'ضروریات اور ڈیزائن', description: 'مواد کی ضروریات کو سمجھیں، سائٹ آرکیٹیکچر ڈیزائن کریں۔' }], faq: [{ question: 'WordPress کب کسٹم ڈیولپمنٹ سے بہتر ہے؟', answer: 'WordPress مواد سے بھرپور سائٹس، بلاگز اور جب غیر تکنیکی لوگوں کو مواد اپ ڈیٹ کرنا ہو۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for wordpress-development');
  }

  // Shopify Development Translations
  const shopify = await prisma.service.findUnique({ where: { slug: 'shopify-development' } });
  if (shopify) {
    const translations = [
      { serviceId: shopify.id, locale: 'tr', name: 'Shopify Geliştirme', shortDescription: 'Özel temalar ve uygulama entegrasyonlarıyla güzel, yüksek dönüşümlü Shopify mağazaları oluşturun.', fullDescription: 'Shopify e-ticareti erişilebilir kılar, biz onu olağanüstü yapıyoruz. Tema özelleştirmesinden Shopify Plus uygulamalarına kadar satış yapan Shopify mağazaları inşa ediyoruz.', features: ['Özel Tema Geliştirme', 'Shopify Uygulama Geliştirme', 'Shopify Plus Uygulaması', 'Shopify\'a Göç', 'Performans Optimizasyonu', 'Ödeme Özelleştirmesi'], benefits: ['Hızlı pazara çıkış süresi', 'Güvenilir, barındırılan altyapı', 'Yerleşik ödeme işleme'], content: { process: [{ step: 1, title: 'Keşif', description: 'Markanızı, ürünlerinizi, hedef kitlenizi ve iş gereksinimlerinizi anlayın.' }], faq: [{ question: 'Shopify vs WooCommerce—hangisi daha iyi?', answer: 'Daha az bakım gerektiren özel e-ticaret için Shopify. WordPress entegrasyonu veya daha fazla kontrol gerekiyorsa WooCommerce.' }] } },
      { serviceId: shopify.id, locale: 'de', name: 'Shopify Entwicklung', shortDescription: 'Erstellen Sie schöne, konversionsstarke Shopify-Shops mit benutzerdefinierten Themes und App-Integrationen.', fullDescription: 'Shopify macht E-Commerce zugänglich, wir machen es außergewöhnlich. Wir bauen Shopify-Shops von Theme-Anpassung bis Shopify Plus.', features: ['Benutzerdefinierte Theme-Entwicklung', 'Shopify App-Entwicklung', 'Shopify Plus Implementierung', 'Migration zu Shopify', 'Performance-Optimierung', 'Checkout-Anpassung'], benefits: ['Schnelle Time-to-Market', 'Zuverlässige gehostete Infrastruktur', 'Integrierte Zahlungsabwicklung'], content: { process: [{ step: 1, title: 'Entdeckung', description: 'Verstehen Sie Ihre Marke, Produkte, Zielgruppe und Geschäftsanforderungen.' }], faq: [{ question: 'Shopify vs WooCommerce—was ist besser?', answer: 'Shopify für dediziertes E-Commerce mit weniger Wartung. WooCommerce bei WordPress-Integration oder mehr Kontrollbedarf.' }] } },
      { serviceId: shopify.id, locale: 'ar', name: 'تطوير Shopify', shortDescription: 'أنشئ متاجر Shopify جميلة وعالية التحويل مع قوالب مخصصة وتكاملات التطبيقات.', fullDescription: 'يجعل Shopify التجارة الإلكترونية سهلة، نحن نجعلها استثنائية. نبني متاجر Shopify من تخصيص القوالب إلى Shopify Plus.', features: ['تطوير قوالب مخصصة', 'تطوير تطبيقات Shopify', 'تنفيذ Shopify Plus', 'الترحيل إلى Shopify', 'تحسين الأداء', 'تخصيص الدفع'], benefits: ['وقت سريع للسوق', 'بنية تحتية مستضافة موثوقة', 'معالجة دفع مدمجة'], content: { process: [{ step: 1, title: 'الاكتشاف', description: 'فهم علامتك التجارية ومنتجاتك وجمهورك المستهدف ومتطلبات عملك.' }], faq: [{ question: 'Shopify مقابل WooCommerce—أيهما أفضل؟', answer: 'Shopify للتجارة الإلكترونية المخصصة مع صيانة أقل. WooCommerce إذا كنت بحاجة لتكامل WordPress.' }] } },
      { serviceId: shopify.id, locale: 'ur', name: 'Shopify ڈیولپمنٹ', shortDescription: 'کسٹم تھیمز اور ایپ انٹیگریشنز کے ساتھ خوبصورت، زیادہ کنورژن والے Shopify اسٹورز بنائیں۔', fullDescription: 'Shopify ای کامرس کو قابل رسائی بناتا ہے، ہم اسے غیر معمولی بناتے ہیں۔ ہم تھیم کسٹمائزیشن سے Shopify Plus تک Shopify اسٹورز بناتے ہیں۔', features: ['کسٹم تھیم ڈیولپمنٹ', 'Shopify ایپ ڈیولپمنٹ', 'Shopify Plus نفاذ', 'Shopify میں منتقلی', 'پرفارمنس آپٹیمائزیشن', 'چیک آؤٹ کسٹمائزیشن'], benefits: ['تیز ٹائم ٹو مارکیٹ', 'قابل اعتماد ہوسٹڈ انفراسٹرکچر', 'بلٹ ان پیمنٹ پروسیسنگ'], content: { process: [{ step: 1, title: 'دریافت', description: 'اپنے برانڈ، مصنوعات، ہدف سامعین اور کاروباری ضروریات کو سمجھیں۔' }], faq: [{ question: 'Shopify بمقابلہ WooCommerce—کون سا بہتر ہے؟', answer: 'کم مینٹیننس والی مخصوص ای کامرس کے لیے Shopify۔ اگر آپ کو WordPress انٹیگریشن چاہیے تو WooCommerce۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for shopify-development');
  }

  // Magento Development Translations
  const magento = await prisma.service.findUnique({ where: { slug: 'magento-development' } });
  if (magento) {
    const translations = [
      { serviceId: magento.id, locale: 'tr', name: 'Magento Geliştirme', shortDescription: 'Magento/Adobe Commerce ile güçlü, ölçeklenebilir e-ticaret platformları oluşturun.', fullDescription: 'Magento karmaşık, kurumsal e-ticaret platformudur. Karmaşık katalogları, B2B iş akışlarını ve gelişmiş entegrasyonları yöneten Magento mağazaları inşa ediyoruz.', features: ['Özel Modül Geliştirme', 'Tema Özelleştirme', 'Çoklu Mağaza Kurulumu', 'B2B Ticaret Özellikleri', 'ERP/CRM Entegrasyonu', 'Performans Optimizasyonu'], benefits: ['Karmaşık ürün yapılandırmalarını yönetin', 'Gelişmiş B2B yetenekleri', 'Tek arka uçtan çoklu mağaza'], content: { process: [{ step: 1, title: 'Gereksinim Analizi', description: 'Karmaşık iş kurallarını, katalog yapısını, fiyatlandırma mantığını belgeleyin.' }], faq: [{ question: 'Shopify yerine Magento\'yu ne zaman seçmeliyiz?', answer: 'Karmaşık B2B, yüksek özelleştirilmiş kataloglar, tek arka uçtan birden fazla mağaza veya tam kontrole ihtiyaç duyduğunuzda Magento.' }] } },
      { serviceId: magento.id, locale: 'de', name: 'Magento Entwicklung', shortDescription: 'Erstellen Sie leistungsstarke, skalierbare E-Commerce-Plattformen mit Magento/Adobe Commerce.', fullDescription: 'Magento ist die Plattform für komplexes Enterprise E-Commerce. Wir bauen Magento-Shops für komplexe Kataloge, B2B-Workflows und erweiterte Integrationen.', features: ['Benutzerdefinierte Modul-Entwicklung', 'Theme-Anpassung', 'Multi-Store Setup', 'B2B Commerce Funktionen', 'ERP/CRM-Integration', 'Performance-Optimierung'], benefits: ['Komplexe Produktkonfigurationen verwalten', 'Erweiterte B2B-Fähigkeiten', 'Multi-Store von einem Backend'], content: { process: [{ step: 1, title: 'Anforderungsanalyse', description: 'Komplexe Geschäftsregeln, Katalogstruktur und Preislogik dokumentieren.' }], faq: [{ question: 'Wann sollten wir Magento statt Shopify wählen?', answer: 'Magento für komplexes B2B, hochgradig angepasste Kataloge, Multi-Store von einem Backend oder wenn Sie vollständige Kontrolle benötigen.' }] } },
      { serviceId: magento.id, locale: 'ar', name: 'تطوير Magento', shortDescription: 'أنشئ منصات تجارة إلكترونية قوية وقابلة للتطوير مع Magento/Adobe Commerce.', fullDescription: 'Magento هي المنصة للتجارة الإلكترونية المؤسسية المعقدة. نبني متاجر Magento للكتالوجات المعقدة وسير عمل B2B والتكاملات المتقدمة.', features: ['تطوير وحدات مخصصة', 'تخصيص القالب', 'إعداد متاجر متعددة', 'ميزات B2B التجارية', 'تكامل ERP/CRM', 'تحسين الأداء'], benefits: ['إدارة تكوينات المنتجات المعقدة', 'قدرات B2B متقدمة', 'متاجر متعددة من خلفية واحدة'], content: { process: [{ step: 1, title: 'تحليل المتطلبات', description: 'توثيق قواعد العمل المعقدة وهيكل الكتالوج ومنطق التسعير.' }], faq: [{ question: 'متى نختار Magento بدلاً من Shopify؟', answer: 'Magento لـ B2B المعقد، الكتالوجات المخصصة للغاية، متاجر متعددة من خلفية واحدة أو عندما تحتاج تحكم كامل.' }] } },
      { serviceId: magento.id, locale: 'ur', name: 'Magento ڈیولپمنٹ', shortDescription: 'Magento/Adobe Commerce کے ساتھ طاقتور، قابل توسیع ای کامرس پلیٹ فارمز بنائیں۔', fullDescription: 'Magento پیچیدہ، انٹرپرائز ای کامرس کا پلیٹ فارم ہے۔ ہم پیچیدہ کیٹلاگز، B2B ورک فلوز اور ایڈوانس انٹیگریشنز کے لیے Magento اسٹورز بناتے ہیں۔', features: ['کسٹم ماڈیول ڈیولپمنٹ', 'تھیم کسٹمائزیشن', 'ملٹی اسٹور سیٹ اپ', 'B2B کامرس فیچرز', 'ERP/CRM انٹیگریشن', 'پرفارمنس آپٹیمائزیشن'], benefits: ['پیچیدہ پروڈکٹ کنفیگریشنز کا انتظام', 'ایڈوانس B2B صلاحیتیں', 'ایک بیک اینڈ سے ملٹی اسٹور'], content: { process: [{ step: 1, title: 'ضروریات کا تجزیہ', description: 'پیچیدہ بزنس رولز، کیٹلاگ ڈھانچہ اور قیمتوں کی منطق کو دستاویزی شکل دیں۔' }], faq: [{ question: 'ہمیں Shopify کی بجائے Magento کب منتخب کرنا چاہیے؟', answer: 'پیچیدہ B2B، انتہائی کسٹمائزڈ کیٹلاگز، ایک بیک اینڈ سے متعدد اسٹورز یا جب آپ کو مکمل کنٹرول چاہیے تو Magento۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for magento-development');
  }

  // Video Marketing Translations
  const videoMarketing = await prisma.service.findUnique({ where: { slug: 'video-marketing' } });
  if (videoMarketing) {
    const translations = [
      { serviceId: videoMarketing.id, locale: 'tr', name: 'Video Pazarlama', shortDescription: 'Pazarlama, eğitim ve marka hikayesi anlatımı için çekici video içeriği üretin.', fullDescription: 'Video en ilgi çekici içerik formatıdır. Dikkat çeken ve harekete geçiren video içeriği planlamanıza, üretmenize ve dağıtmanıza yardımcı oluyoruz.', features: ['Video Strateji & Planlama', 'Açıklayıcı Video Üretimi', 'Ürün Demo Videoları', 'Sosyal Medya Video İçeriği', 'Marka Belgeselleri', 'Video SEO'], benefits: ['Metin veya görsellerden daha yüksek etkileşim', 'İyileştirilmiş dönüşüm oranları', 'Daha iyi bilgi hatırlama'], content: { process: [{ step: 1, title: 'Strateji', description: 'Video hedeflerini, hedef kitleyi, dağıtım kanallarını tanımlayın.' }], faq: [{ question: 'Pazarlama için hangi video türleri en iyi çalışır?', answer: 'Farkındalık için açıklayıcılar, güven için referanslar, değerlendirme için ürün demoları, elde tutma için nasıl yapılır videoları.' }] } },
      { serviceId: videoMarketing.id, locale: 'de', name: 'Video Marketing', shortDescription: 'Produzieren Sie überzeugende Videoinhalte für Marketing, Schulung und Markengeschichten.', fullDescription: 'Video ist das ansprechendste Inhaltsformat. Wir helfen Ihnen bei Planung, Produktion und Distribution von Videoinhalten.', features: ['Video-Strategie & Planung', 'Erklärvideos', 'Produktdemo-Videos', 'Social Media Videoinhalte', 'Markendokumentationen', 'Video-SEO'], benefits: ['Höheres Engagement als Text oder Bilder', 'Verbesserte Conversion-Raten', 'Bessere Informationsspeicherung'], content: { process: [{ step: 1, title: 'Strategie', description: 'Videoziele, Zielgruppe und Vertriebskanäle definieren.' }], faq: [{ question: 'Welche Videotypen funktionieren am besten für Marketing?', answer: 'Erklärvideos für Awareness, Testimonials für Vertrauen, Produktdemos für Consideration, How-tos für Retention.' }] } },
      { serviceId: videoMarketing.id, locale: 'ar', name: 'تسويق الفيديو', shortDescription: 'أنتج محتوى فيديو مقنع للتسويق والتدريب وسرد قصة العلامة التجارية.', fullDescription: 'الفيديو هو أكثر تنسيقات المحتوى جذباً. نساعدك في تخطيط وإنتاج وتوزيع محتوى الفيديو.', features: ['استراتيجية وتخطيط الفيديو', 'إنتاج فيديوهات توضيحية', 'فيديوهات عرض المنتج', 'محتوى فيديو لوسائل التواصل', 'أفلام وثائقية للعلامة التجارية', 'SEO للفيديو'], benefits: ['تفاعل أعلى من النص أو الصور', 'معدلات تحويل محسنة', 'استبقاء أفضل للمعلومات'], content: { process: [{ step: 1, title: 'الاستراتيجية', description: 'تحديد أهداف الفيديو والجمهور المستهدف وقنوات التوزيع.' }], faq: [{ question: 'أي أنواع الفيديو تعمل بشكل أفضل للتسويق؟', answer: 'الشرح للوعي، الشهادات للثقة، عروض المنتج للتقييم، الإرشادات للاحتفاظ.' }] } },
      { serviceId: videoMarketing.id, locale: 'ur', name: 'ویڈیو مارکیٹنگ', shortDescription: 'مارکیٹنگ، تربیت اور برانڈ کہانی سنانے کے لیے دلکش ویڈیو مواد بنائیں۔', fullDescription: 'ویڈیو سب سے زیادہ دلچسپ مواد کی شکل ہے۔ ہم آپ کو ویڈیو مواد کی منصوبہ بندی، پروڈکشن اور تقسیم میں مدد کرتے ہیں۔', features: ['ویڈیو حکمت عملی اور منصوبہ بندی', 'وضاحتی ویڈیو پروڈکشن', 'پروڈکٹ ڈیمو ویڈیوز', 'سوشل میڈیا ویڈیو مواد', 'برانڈ ڈاکیومینٹریز', 'ویڈیو SEO'], benefits: ['ٹیکسٹ یا تصاویر سے زیادہ انگیجمنٹ', 'بہتر کنورژن ریٹس', 'بہتر معلومات کی یادداشت'], content: { process: [{ step: 1, title: 'حکمت عملی', description: 'ویڈیو کے اہداف، ہدف سامعین اور تقسیم کے چینلز کی وضاحت کریں۔' }], faq: [{ question: 'مارکیٹنگ کے لیے کون سی ویڈیو اقسام بہترین کام کرتی ہیں؟', answer: 'آگاہی کے لیے وضاحتی، اعتماد کے لیے تعریفیں، غور کے لیے پروڈکٹ ڈیموز، برقرار رکھنے کے لیے ہاؤ ٹوز۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for video-marketing');
  }

  // Podcast Production Translations
  const podcast = await prisma.service.findUnique({ where: { slug: 'podcast-production' } });
  if (podcast) {
    const translations = [
      { serviceId: podcast.id, locale: 'tr', name: 'Podcast Prodüksiyon', shortDescription: 'Profesyonel prodüksiyon, düzenleme ve dağıtımla ilgi çekici podcastler oluşturun.', fullDescription: 'Podcastler kitlenizle derin bağlantılar kurar. Profesyonel podcastler başlatmanıza ve üretmenize yardımcı oluyoruz—konsept geliştirmeden kayıt, düzenleme ve dağıtıma kadar.', features: ['Podcast Strateji & Konsept', 'Ekipman & Stüdyo Kurulumu', 'Kayıt & Uzak Röportajlar', 'Ses Düzenleme & Miksaj', 'Program Notları & Transkripsiyon', 'Tüm Platformlara Dağıtım'], benefits: ['Düşünce liderliği oluşturun', 'Derin kitle etkileşimi', 'Yeniden kullanılabilir içerik'], content: { process: [{ step: 1, title: 'Konsept Geliştirme', description: 'Program formatını, hedef kitleyi, bölüm yapısını tanımlayın.' }], faq: [{ question: 'Ne sıklıkla bölüm yayınlamalıyız?', answer: 'Büyüme için haftalık ideal. Uzun formatlı içerik için iki haftalık çalışır. Tutarlılık sıklıktan daha önemli.' }] } },
      { serviceId: podcast.id, locale: 'de', name: 'Podcast-Produktion', shortDescription: 'Erstellen Sie ansprechende Podcasts mit professioneller Produktion, Bearbeitung und Distribution.', fullDescription: 'Podcasts bauen tiefe Verbindungen zu Ihrem Publikum auf. Wir helfen Ihnen bei Start und Produktion professioneller Podcasts—von Konzept bis Distribution.', features: ['Podcast-Strategie & Konzept', 'Equipment & Studio-Setup', 'Aufnahme & Remote-Interviews', 'Audio-Bearbeitung & Mixing', 'Show Notes & Transkription', 'Distribution auf alle Plattformen'], benefits: ['Thought Leadership aufbauen', 'Tiefes Publikum-Engagement', 'Wiederverwendbare Inhalte'], content: { process: [{ step: 1, title: 'Konzeptentwicklung', description: 'Show-Format, Zielgruppe und Episodenstruktur definieren.' }], faq: [{ question: 'Wie oft sollten wir Episoden veröffentlichen?', answer: 'Wöchentlich ist ideal für Wachstum. Zweiwöchentlich für längere Inhalte. Konsistenz ist wichtiger als Häufigkeit.' }] } },
      { serviceId: podcast.id, locale: 'ar', name: 'إنتاج البودكاست', shortDescription: 'أنشئ بودكاست جذاب مع إنتاج احترافي وتحرير وتوزيع.', fullDescription: 'يبني البودكاست روابط عميقة مع جمهورك. نساعدك في إطلاق وإنتاج بودكاست احترافي—من تطوير المفهوم إلى التوزيع.', features: ['استراتيجية ومفهوم البودكاست', 'إعداد المعدات والاستوديو', 'التسجيل والمقابلات عن بعد', 'تحرير ومزج الصوت', 'ملاحظات الحلقة والنسخ', 'التوزيع لجميع المنصات'], benefits: ['بناء القيادة الفكرية', 'تفاعل عميق مع الجمهور', 'محتوى قابل لإعادة الاستخدام'], content: { process: [{ step: 1, title: 'تطوير المفهوم', description: 'تحديد تنسيق البرنامج والجمهور المستهدف وهيكل الحلقة.' }], faq: [{ question: 'كم مرة يجب أن ننشر حلقات؟', answer: 'أسبوعياً مثالي للنمو. نصف شهري يعمل للمحتوى الطويل. الاتساق أهم من التكرار.' }] } },
      { serviceId: podcast.id, locale: 'ur', name: 'پوڈ کاسٹ پروڈکشن', shortDescription: 'پیشہ ورانہ پروڈکشن، ایڈیٹنگ اور ڈسٹری بیوشن کے ساتھ دلچسپ پوڈ کاسٹس بنائیں۔', fullDescription: 'پوڈ کاسٹس آپ کے سامعین کے ساتھ گہرے تعلقات استوار کرتے ہیں۔ ہم آپ کو پیشہ ورانہ پوڈ کاسٹ شروع کرنے اور بنانے میں مدد کرتے ہیں—تصور سے تقسیم تک۔', features: ['پوڈ کاسٹ حکمت عملی اور تصور', 'آلات اور سٹوڈیو سیٹ اپ', 'ریکارڈنگ اور ریموٹ انٹرویوز', 'آڈیو ایڈیٹنگ اور مکسنگ', 'شو نوٹس اور ٹرانسکرپشن', 'تمام پلیٹ فارمز پر تقسیم'], benefits: ['تھاٹ لیڈرشپ بنائیں', 'گہری سامعین کی مصروفیت', 'دوبارہ قابل استعمال مواد'], content: { process: [{ step: 1, title: 'تصور کی ترقی', description: 'شو کا فارمیٹ، ہدف سامعین اور ایپی سوڈ کی ساخت کی وضاحت کریں۔' }], faq: [{ question: 'ہمیں کتنی کثرت سے ایپی سوڈز ریلیز کرنے چاہئیں؟', answer: 'ترقی کے لیے ہفتہ وار مثالی ہے۔ لمبے مواد کے لیے دو ہفتہ وار کام کرتا ہے۔ تسلسل تعدد سے زیادہ اہم ہے۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for podcast-production');
  }

  // Kubernetes Orchestration Translations
  const kubernetes = await prisma.service.findUnique({ where: { slug: 'kubernetes-orchestration' } });
  if (kubernetes) {
    const translations = [
      { serviceId: kubernetes.id, locale: 'tr', name: 'Kubernetes Orkestrasyon', shortDescription: 'Ölçeklenebilir, dayanıklı mikroservis dağıtımları için Kubernetes ile konteynerları orkestre edin.', fullDescription: 'Kubernetes konteyner orkestrasyon standardıdır. Kubernetes\'i etkili bir şekilde benimsemenize yardımcı oluyoruz—başlangıç küme kurulumundan üretim düzeyinde dağıtımlara.', features: ['Küme Mimarisi & Kurulumu', 'İş Yükü Göçü', 'Helm Chart Geliştirme', 'Servis Mesh (Istio/Linkerd)', 'GitOps ile ArgoCD/Flux', 'İzleme & Gözlemlenebilirlik'], benefits: ['Talebe göre otomatik ölçekleme', 'Kendi kendini iyileştiren dağıtımlar', 'Geliştirmeden üretime tutarlı ortamlar'], content: { process: [{ step: 1, title: 'Değerlendirme', description: 'Mevcut altyapıyı, konteynerizasyon hazırlığını değerlendirin ve Kubernetes stratejisi tanımlayın.' }], faq: [{ question: 'Kubernetes ne zaman aşırı olur?', answer: 'Az servisi olan küçük ekipler için Kubernetes karmaşıklığı haklı olmayabilir. Daha basit çözümlerin daha uygun olup olmadığını değerlendirmenize yardımcı oluyoruz.' }] } },
      { serviceId: kubernetes.id, locale: 'de', name: 'Kubernetes Orchestrierung', shortDescription: 'Orchestrieren Sie Container mit Kubernetes für skalierbare, resiliente Microservices-Deployments.', fullDescription: 'Kubernetes ist der Standard für Container-Orchestrierung. Wir helfen Ihnen bei der effektiven Kubernetes-Einführung—vom Cluster-Setup bis zu produktionsreifen Deployments.', features: ['Cluster-Architektur & Setup', 'Workload-Migration', 'Helm Chart Entwicklung', 'Service Mesh (Istio/Linkerd)', 'GitOps mit ArgoCD/Flux', 'Monitoring & Observability'], benefits: ['Automatische Skalierung nach Bedarf', 'Selbstheilende Deployments', 'Konsistente Umgebungen'], content: { process: [{ step: 1, title: 'Assessment', description: 'Aktuelle Infrastruktur und Containerisierungsbereitschaft bewerten, Kubernetes-Strategie definieren.' }], faq: [{ question: 'Wann ist Kubernetes übertrieben?', answer: 'Für kleine Teams mit wenigen Services ist Kubernetes-Komplexität möglicherweise nicht gerechtfertigt.' }] } },
      { serviceId: kubernetes.id, locale: 'ar', name: 'تنسيق Kubernetes', shortDescription: 'قم بتنسيق الحاويات باستخدام Kubernetes لعمليات نشر الخدمات المصغرة القابلة للتطوير والمرنة.', fullDescription: 'Kubernetes هو المعيار لتنسيق الحاويات. نساعدك في اعتماد Kubernetes بفعالية—من إعداد المجموعة إلى النشر الجاهز للإنتاج.', features: ['بنية وإعداد المجموعة', 'ترحيل أحمال العمل', 'تطوير Helm Charts', 'Service Mesh (Istio/Linkerd)', 'GitOps مع ArgoCD/Flux', 'المراقبة والملاحظة'], benefits: ['التوسع التلقائي حسب الطلب', 'نشر ذاتي الإصلاح', 'بيئات متسقة'], content: { process: [{ step: 1, title: 'التقييم', description: 'تقييم البنية التحتية الحالية والاستعداد للحاويات وتحديد استراتيجية Kubernetes.' }], faq: [{ question: 'متى يكون Kubernetes مبالغاً فيه؟', answer: 'بالنسبة للفرق الصغيرة ذات الخدمات القليلة، قد لا يكون تعقيد Kubernetes مبرراً.' }] } },
      { serviceId: kubernetes.id, locale: 'ur', name: 'Kubernetes آرکیسٹریشن', shortDescription: 'قابل توسیع، لچکدار مائیکرو سروسز ڈیپلائمنٹس کے لیے Kubernetes کے ساتھ کنٹینرز کو آرکیسٹریٹ کریں۔', fullDescription: 'Kubernetes کنٹینر آرکیسٹریشن کا معیار ہے۔ ہم آپ کو Kubernetes کو مؤثر طریقے سے اپنانے میں مدد کرتے ہیں—کلسٹر سیٹ اپ سے پروڈکشن ریڈی ڈیپلائمنٹس تک۔', features: ['کلسٹر آرکیٹیکچر اور سیٹ اپ', 'ورک لوڈ مائیگریشن', 'Helm Chart ڈیولپمنٹ', 'سروس میش (Istio/Linkerd)', 'ArgoCD/Flux کے ساتھ GitOps', 'مانیٹرنگ اور آبزرویبلٹی'], benefits: ['ڈیمانڈ کے مطابق آٹو اسکیلنگ', 'سیلف ہیلنگ ڈیپلائمنٹس', 'ڈیو سے پروڈ تک مستقل ماحول'], content: { process: [{ step: 1, title: 'اسیسمنٹ', description: 'موجودہ انفراسٹرکچر اور کنٹینرائزیشن تیاری کا جائزہ لیں، Kubernetes حکمت عملی بیان کریں۔' }], faq: [{ question: 'Kubernetes کب ضرورت سے زیادہ ہے؟', answer: 'چند سروسز والی چھوٹی ٹیموں کے لیے Kubernetes کی پیچیدگی جائز نہیں ہو سکتی۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for kubernetes-orchestration');
  }

  // Terraform Infrastructure Translations
  const terraform = await prisma.service.findUnique({ where: { slug: 'terraform-infrastructure' } });
  if (terraform) {
    const translations = [
      { serviceId: terraform.id, locale: 'tr', name: 'Terraform Altyapısı', shortDescription: 'Tutarlılık ve otomasyon için Terraform ile bulut altyapısını tanımlayın ve sağlayın.', fullDescription: 'Terraform ile Kod Olarak Altyapı, altyapı yönetimine yazılım mühendisliği pratiklerini getirir. AWS, Azure, GCP ve daha fazlasında tutarlı, otomatik altyapı için Terraform\'u benimsemenize yardımcı oluyoruz.', features: ['Terraform Modül Geliştirme', 'Çoklu Bulut Altyapısı', 'Durum Yönetimi & Arka Uçlar', 'CI/CD Pipeline Entegrasyonu', 'Sapma Tespiti & Düzeltme', 'Kod Olarak Güvenlik & Uyumluluk'], benefits: ['Sürüm kontrollü altyapı', 'Tekrarlanabilir ortamlar', 'Azaltılmış manuel hatalar'], content: { process: [{ step: 1, title: 'Keşif', description: 'Mevcut altyapıyı belgeleyin, Terraform fırsatlarını belirleyin.' }], faq: [{ question: 'Terraform vs CloudFormation vs Pulumi?', answer: 'Çoklu bulut ve geniş benimseme için Terraform. Yalnızca AWS ve yerel entegrasyon istiyorsanız CloudFormation. Genel amaçlı dilleri tercih ediyorsanız Pulumi.' }] } },
      { serviceId: terraform.id, locale: 'de', name: 'Terraform Infrastruktur', shortDescription: 'Definieren und provisionieren Sie Cloud-Infrastruktur mit Terraform für Konsistenz und Automatisierung.', fullDescription: 'Infrastructure as Code mit Terraform bringt Software-Engineering-Praktiken ins Infrastruktur-Management. Wir helfen bei der Terraform-Einführung für AWS, Azure, GCP und mehr.', features: ['Terraform Modul-Entwicklung', 'Multi-Cloud Infrastruktur', 'State Management & Backends', 'CI/CD Pipeline Integration', 'Drift-Erkennung & Behebung', 'Security & Compliance as Code'], benefits: ['Versionskontrollierte Infrastruktur', 'Reproduzierbare Umgebungen', 'Reduzierte manuelle Fehler'], content: { process: [{ step: 1, title: 'Entdeckung', description: 'Bestehende Infrastruktur dokumentieren, Terraform-Möglichkeiten identifizieren.' }], faq: [{ question: 'Terraform vs CloudFormation vs Pulumi?', answer: 'Terraform für Multi-Cloud und breite Adoption. CloudFormation nur für AWS. Pulumi wenn Sie allgemeine Sprachen bevorzugen.' }] } },
      { serviceId: terraform.id, locale: 'ar', name: 'البنية التحتية Terraform', shortDescription: 'حدد وزود البنية التحتية السحابية باستخدام Terraform للاتساق والأتمتة.', fullDescription: 'البنية التحتية ككود مع Terraform تجلب ممارسات هندسة البرمجيات لإدارة البنية التحتية. نساعدك في اعتماد Terraform لـ AWS و Azure و GCP والمزيد.', features: ['تطوير وحدات Terraform', 'بنية تحتية متعددة السحب', 'إدارة الحالة والخلفيات', 'تكامل CI/CD Pipeline', 'اكتشاف وإصلاح الانحراف', 'الأمان والامتثال ككود'], benefits: ['بنية تحتية خاضعة للتحكم بالإصدار', 'بيئات قابلة للتكرار', 'تقليل الأخطاء اليدوية'], content: { process: [{ step: 1, title: 'الاكتشاف', description: 'توثيق البنية التحتية الحالية وتحديد فرص Terraform.' }], faq: [{ question: 'Terraform مقابل CloudFormation مقابل Pulumi؟', answer: 'Terraform للسحابة المتعددة والاعتماد الواسع. CloudFormation لـ AWS فقط. Pulumi إذا كنت تفضل اللغات العامة.' }] } },
      { serviceId: terraform.id, locale: 'ur', name: 'Terraform انفراسٹرکچر', shortDescription: 'مستقل مزاجی اور آٹومیشن کے لیے Terraform کے ساتھ کلاؤڈ انفراسٹرکچر کی وضاحت اور فراہمی کریں۔', fullDescription: 'Terraform کے ساتھ کوڈ کے طور پر انفراسٹرکچر سافٹ ویئر انجینئرنگ کے طریقوں کو انفراسٹرکچر مینجمنٹ میں لاتا ہے۔ ہم AWS، Azure، GCP اور مزید کے لیے Terraform اپنانے میں مدد کرتے ہیں۔', features: ['Terraform ماڈیول ڈیولپمنٹ', 'ملٹی کلاؤڈ انفراسٹرکچر', 'اسٹیٹ مینجمنٹ اور بیک اینڈز', 'CI/CD پائپ لائن انٹیگریشن', 'ڈرفٹ ڈٹیکشن اور ریمیڈیئشن', 'کوڈ کے طور پر سیکیورٹی اور کمپلائنس'], benefits: ['ورژن کنٹرولڈ انفراسٹرکچر', 'دوبارہ قابل تولید ماحول', 'کم دستی غلطیاں'], content: { process: [{ step: 1, title: 'دریافت', description: 'موجودہ انفراسٹرکچر کو دستاویزی شکل دیں، Terraform کے مواقع کی نشاندہی کریں۔' }], faq: [{ question: 'Terraform بمقابلہ CloudFormation بمقابلہ Pulumi؟', answer: 'ملٹی کلاؤڈ اور وسیع اپنانے کے لیے Terraform۔ صرف AWS کے لیے CloudFormation۔ اگر آپ عام زبانیں ترجیح دیتے ہیں تو Pulumi۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for terraform-infrastructure');
  }

  // Data Visualization Translations
  const dataViz = await prisma.service.findUnique({ where: { slug: 'data-visualization' } });
  if (dataViz) {
    const translations = [
      { serviceId: dataViz.id, locale: 'tr', name: 'Veri Görselleştirme', shortDescription: 'Verileri eyleme dönüştürülebilir hale getiren içgörülü gösterge panelleri ve görselleştirmeler oluşturun.', fullDescription: 'Veri görselleştirme karmaşık verileri net içgörülere dönüştürür. Verilerinizi anlamanıza ve bulguları etkili bir şekilde iletmenize yardımcı olan etkileşimli gösterge panelleri ve veri hikayeleri oluşturuyoruz.', features: ['Gösterge Paneli Tasarımı & Geliştirme', 'Etkileşimli Veri Keşfi', 'Özel Grafik Geliştirme', 'Gerçek Zamanlı Görselleştirme', 'Gömülü Analitik', 'Rapor Otomasyonu'], benefits: ['Daha hızlı karar verme', 'Trendleri ve kalıpları belirleme', 'İçgörüleri etkili bir şekilde iletme'], content: { process: [{ step: 1, title: 'Gereksinimler', description: 'Temel metrikleri, cevaplanacak soruları, kitleyi ve veri kaynaklarını anlayın.' }], faq: [{ question: 'En iyi görselleştirme aracı hangisi?', answer: 'Güçlü görseller için Tableau. Microsoft ekosisteminde Power BI. Yönetilen, ölçeklenebilir analitik için Looker. Özel, gömülü görselleştirmeler için D3.js.' }] } },
      { serviceId: dataViz.id, locale: 'de', name: 'Datenvisualisierung', shortDescription: 'Erstellen Sie aufschlussreiche Dashboards und Visualisierungen, die Daten umsetzbar machen.', fullDescription: 'Datenvisualisierung verwandelt komplexe Daten in klare Erkenntnisse. Wir erstellen interaktive Dashboards und Datengeschichten.', features: ['Dashboard-Design & Entwicklung', 'Interaktive Datenexploration', 'Benutzerdefinierte Chart-Entwicklung', 'Echtzeit-Visualisierung', 'Embedded Analytics', 'Report-Automatisierung'], benefits: ['Schnellere Entscheidungsfindung', 'Trends und Muster identifizieren', 'Erkenntnisse effektiv kommunizieren'], content: { process: [{ step: 1, title: 'Anforderungen', description: 'Schlüsselmetriken, zu beantwortende Fragen, Zielgruppe und Datenquellen verstehen.' }], faq: [{ question: 'Welches Visualisierungstool ist am besten?', answer: 'Tableau für leistungsstarke Visualisierungen. Power BI im Microsoft-Ökosystem. Looker für verwaltete Analytics. D3.js für benutzerdefinierte Visualisierungen.' }] } },
      { serviceId: dataViz.id, locale: 'ar', name: 'تصور البيانات', shortDescription: 'أنشئ لوحات معلومات ثاقبة وتصورات تجعل البيانات قابلة للتنفيذ.', fullDescription: 'يحول تصور البيانات البيانات المعقدة إلى رؤى واضحة. نحن نصنع لوحات معلومات تفاعلية وقصص بيانات.', features: ['تصميم وتطوير لوحات المعلومات', 'استكشاف البيانات التفاعلي', 'تطوير الرسوم البيانية المخصصة', 'التصور في الوقت الحقيقي', 'التحليلات المضمنة', 'أتمتة التقارير'], benefits: ['اتخاذ قرارات أسرع', 'تحديد الاتجاهات والأنماط', 'توصيل الرؤى بفعالية'], content: { process: [{ step: 1, title: 'المتطلبات', description: 'فهم المقاييس الرئيسية والأسئلة والجمهور ومصادر البيانات.' }], faq: [{ question: 'ما هي أفضل أداة تصور؟', answer: 'Tableau للتصورات القوية. Power BI في نظام Microsoft. Looker للتحليلات المدارة. D3.js للتصورات المخصصة.' }] } },
      { serviceId: dataViz.id, locale: 'ur', name: 'ڈیٹا ویژولائزیشن', shortDescription: 'بصیرت افروز ڈیش بورڈز اور ویژولائزیشنز بنائیں جو ڈیٹا کو قابل عمل بنائیں۔', fullDescription: 'ڈیٹا ویژولائزیشن پیچیدہ ڈیٹا کو واضح بصیرت میں بدلتی ہے۔ ہم انٹرایکٹو ڈیش بورڈز اور ڈیٹا کہانیاں بناتے ہیں۔', features: ['ڈیش بورڈ ڈیزائن اور ڈیولپمنٹ', 'انٹرایکٹو ڈیٹا ایکسپلوریشن', 'کسٹم چارٹ ڈیولپمنٹ', 'ریئل ٹائم ویژولائزیشن', 'ایمبیڈڈ اینالیٹکس', 'رپورٹ آٹومیشن'], benefits: ['تیز تر فیصلہ سازی', 'رجحانات اور پیٹرنز کی نشاندہی', 'بصیرت کو مؤثر طریقے سے پہنچائیں'], content: { process: [{ step: 1, title: 'ضروریات', description: 'کلیدی میٹرکس، جواب دینے والے سوالات، سامعین اور ڈیٹا ذرائع کو سمجھیں۔' }], faq: [{ question: 'بہترین ویژولائزیشن ٹول کون سا ہے؟', answer: 'طاقتور ویژولز کے لیے Tableau۔ Microsoft ایکو سسٹم میں Power BI۔ منظم اینالیٹکس کے لیے Looker۔ کسٹم ویژولائزیشنز کے لیے D3.js۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for data-visualization');
  }

  // ETL Pipelines Translations
  const etl = await prisma.service.findUnique({ where: { slug: 'etl-pipelines' } });
  if (etl) {
    const translations = [
      { serviceId: etl.id, locale: 'tr', name: 'ETL Pipeline\'ları', shortDescription: 'Veri ambarınızı taze ve güvenilir tutan ETL/ELT pipeline\'ları tasarlayın ve uygulayın.', fullDescription: 'ETL pipeline\'ları veri altyapısının bel kemiğidir. Çeşitli kaynaklardan veri çıkaran, analiz için dönüştüren ve veri ambarınıza yükleyen sağlam pipeline\'lar inşa ediyoruz.', features: ['Pipeline Tasarımı & Mimarisi', 'Kaynak Bağlayıcılar', 'Veri Dönüşümü', 'Veri Kalitesi & Doğrulama', 'Orkestrasyon & Zamanlama', 'Artımlı Yükleme'], benefits: ['Güvenilir, otomatik veri akışları', 'Tek doğruluk kaynağı', 'Azaltılmış manuel veri işi'], content: { process: [{ step: 1, title: 'Veri Denetimi', description: 'Veri kaynaklarını envantere alın, şemaları anlayın, kalite sorunlarını belirleyin.' }], faq: [{ question: 'ETL vs ELT—hangi yaklaşım?', answer: 'Modern bulut ambarlarıyla ELT (ham yükle, ambarda dönüştür) tercih edilir. Karmaşık dönüşümler veya ham yüklenmemesi gereken hassas veriler için ETL.' }] } },
      { serviceId: etl.id, locale: 'de', name: 'ETL-Pipelines', shortDescription: 'Entwerfen und implementieren Sie ETL/ELT-Pipelines, die Ihr Data Warehouse aktuell und zuverlässig halten.', fullDescription: 'ETL-Pipelines sind das Rückgrat der Dateninfrastruktur. Wir bauen robuste Pipelines, die Daten aus verschiedenen Quellen extrahieren, transformieren und laden.', features: ['Pipeline-Design & Architektur', 'Quell-Konnektoren', 'Datentransformation', 'Datenqualität & Validierung', 'Orchestrierung & Scheduling', 'Inkrementelles Laden'], benefits: ['Zuverlässige, automatisierte Datenflüsse', 'Single Source of Truth', 'Reduzierte manuelle Datenarbeit'], content: { process: [{ step: 1, title: 'Daten-Audit', description: 'Datenquellen inventarisieren, Schemas verstehen, Qualitätsprobleme identifizieren.' }], faq: [{ question: 'ETL vs ELT—welcher Ansatz?', answer: 'ELT (roh laden, im Warehouse transformieren) ist mit modernen Cloud-Warehouses bevorzugt. ETL für komplexe Transformationen oder sensible Daten.' }] } },
      { serviceId: etl.id, locale: 'ar', name: 'خطوط أنابيب ETL', shortDescription: 'صمم ونفذ خطوط أنابيب ETL/ELT التي تحافظ على مستودع البيانات محدثاً وموثوقاً.', fullDescription: 'خطوط أنابيب ETL هي العمود الفقري للبنية التحتية للبيانات. نبني خطوط أنابيب قوية تستخرج البيانات من مصادر متنوعة وتحولها وتحملها.', features: ['تصميم وبنية خط الأنابيب', 'موصلات المصدر', 'تحويل البيانات', 'جودة البيانات والتحقق', 'التنسيق والجدولة', 'التحميل التدريجي'], benefits: ['تدفقات بيانات موثوقة وآلية', 'مصدر واحد للحقيقة', 'تقليل العمل اليدوي للبيانات'], content: { process: [{ step: 1, title: 'تدقيق البيانات', description: 'جرد مصادر البيانات وفهم المخططات وتحديد مشاكل الجودة.' }], faq: [{ question: 'ETL مقابل ELT—أي نهج؟', answer: 'ELT (تحميل خام، تحويل في المستودع) مفضل مع المستودعات السحابية الحديثة. ETL للتحويلات المعقدة أو البيانات الحساسة.' }] } },
      { serviceId: etl.id, locale: 'ur', name: 'ETL پائپ لائنز', shortDescription: 'ETL/ELT پائپ لائنز ڈیزائن اور نافذ کریں جو آپ کے ڈیٹا ویئر ہاؤس کو تازہ اور قابل اعتماد رکھیں۔', fullDescription: 'ETL پائپ لائنز ڈیٹا انفراسٹرکچر کی ریڑھ کی ہڈی ہیں۔ ہم مضبوط پائپ لائنز بناتے ہیں جو متنوع ذرائع سے ڈیٹا نکالتی، تبدیل کرتی اور لوڈ کرتی ہیں۔', features: ['پائپ لائن ڈیزائن اور آرکیٹیکچر', 'سورس کنیکٹرز', 'ڈیٹا ٹرانسفارمیشن', 'ڈیٹا کوالٹی اور ویلیڈیشن', 'آرکیسٹریشن اور شیڈولنگ', 'انکریمینٹل لوڈنگ'], benefits: ['قابل اعتماد، خودکار ڈیٹا فلوز', 'سنگل سورس آف ٹروتھ', 'کم دستی ڈیٹا کام'], content: { process: [{ step: 1, title: 'ڈیٹا آڈٹ', description: 'ڈیٹا ذرائع کی انوینٹری، اسکیماز کو سمجھیں، کوالٹی مسائل کی نشاندہی کریں۔' }], faq: [{ question: 'ETL بمقابلہ ELT—کون سا طریقہ؟', answer: 'جدید کلاؤڈ ویئر ہاؤسز کے ساتھ ELT (خام لوڈ کریں، ویئر ہاؤس میں ٹرانسفارم کریں) ترجیحی ہے۔ پیچیدہ ٹرانسفارمیشنز یا حساس ڈیٹا کے لیے ETL۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for etl-pipelines');
  }

  // Voice Assistant Development Translations
  const voiceAssistant = await prisma.service.findUnique({ where: { slug: 'voice-assistant-development' } });
  if (voiceAssistant) {
    const translations = [
      { serviceId: voiceAssistant.id, locale: 'tr', name: 'Sesli Asistan Geliştirme', shortDescription: 'Alexa, Google Assistant ve özel sesli arayüzler için sesli deneyimler oluşturun.', fullDescription: 'Ses, insan-bilgisayar etkileşiminin gelecek sınırıdır. Markanızı konuşma yoluyla erişilebilir kılan sesli asistanlar inşa ediyoruz—Alexa Skills ve Google Actions\'tan özel sesli arayüzlere.', features: ['Alexa Skill Geliştirme', 'Google Action Geliştirme', 'Özel Sesli Arayüzler', 'Sesli UI/UX Tasarımı', 'Doğal Dil Anlama', 'Arka Uç Entegrasyonu'], benefits: ['Eller serbest erişilebilirlik', 'Yeni müşteri temas noktası', 'Akıllı hoparlörlerde marka varlığı'], content: { process: [{ step: 1, title: 'Kullanım Durumu Tanımı', description: 'Sesli fırsatları belirleyin, kullanıcı senaryolarını tanımlayın ve konuşma akışlarını tasarlayın.' }], faq: [{ question: 'Alexa, Google yoksa her ikisi için mi geliştirmeliyiz?', answer: 'Alexa\'nın daha fazla skill kullanıcısı var, Google\'ın NLU\'su daha iyi. Genellikle bir platformla başlayıp genişletiyoruz.' }] } },
      { serviceId: voiceAssistant.id, locale: 'de', name: 'Sprachassistenten-Entwicklung', shortDescription: 'Erstellen Sie Spracherlebnisse für Alexa, Google Assistant und benutzerdefinierte Sprachschnittstellen.', fullDescription: 'Sprache ist die nächste Grenze der Mensch-Computer-Interaktion. Wir bauen Sprachassistenten für Alexa Skills und Google Actions bis zu benutzerdefinierten Schnittstellen.', features: ['Alexa Skill Entwicklung', 'Google Action Entwicklung', 'Benutzerdefinierte Sprachschnittstellen', 'Voice UI/UX Design', 'Natural Language Understanding', 'Backend-Integration'], benefits: ['Freihändige Zugänglichkeit', 'Neuer Kundenkontaktpunkt', 'Markenpräsenz auf Smart Speakern'], content: { process: [{ step: 1, title: 'Use Case Definition', description: 'Sprachgelegenheiten identifizieren, Benutzerszenarien definieren und Konversationsflüsse entwerfen.' }], faq: [{ question: 'Sollen wir für Alexa, Google oder beide entwickeln?', answer: 'Alexa hat mehr Skill-Nutzer, Google hat besseres NLU. Oft starten wir mit einer Plattform und erweitern.' }] } },
      { serviceId: voiceAssistant.id, locale: 'ar', name: 'تطوير المساعد الصوتي', shortDescription: 'أنشئ تجارب صوتية لـ Alexa و Google Assistant والواجهات الصوتية المخصصة.', fullDescription: 'الصوت هو الحدود التالية للتفاعل بين الإنسان والحاسوب. نبني مساعدين صوتيين من Alexa Skills و Google Actions إلى واجهات صوتية مخصصة.', features: ['تطوير مهارات Alexa', 'تطوير إجراءات Google', 'واجهات صوتية مخصصة', 'تصميم UI/UX الصوتي', 'فهم اللغة الطبيعية', 'تكامل الخلفية'], benefits: ['إمكانية الوصول بدون استخدام اليدين', 'نقطة اتصال جديدة مع العملاء', 'حضور العلامة التجارية على مكبرات الصوت الذكية'], content: { process: [{ step: 1, title: 'تعريف حالة الاستخدام', description: 'تحديد فرص الصوت وتعريف سيناريوهات المستخدم وتصميم تدفقات المحادثة.' }], faq: [{ question: 'هل نطور لـ Alexa أو Google أو كليهما؟', answer: 'Alexa لديها مستخدمين أكثر، Google لديها NLU أفضل. غالباً نبدأ بمنصة ونتوسع.' }] } },
      { serviceId: voiceAssistant.id, locale: 'ur', name: 'وائس اسسٹنٹ ڈیولپمنٹ', shortDescription: 'Alexa، Google Assistant اور کسٹم وائس انٹرفیسز کے لیے وائس تجربات بنائیں۔', fullDescription: 'آواز انسان اور کمپیوٹر کے تعامل کی اگلی سرحد ہے۔ ہم Alexa Skills اور Google Actions سے لے کر کسٹم وائس انٹرفیسز تک وائس اسسٹنٹس بناتے ہیں۔', features: ['Alexa Skill ڈیولپمنٹ', 'Google Action ڈیولپمنٹ', 'کسٹم وائس انٹرفیسز', 'وائس UI/UX ڈیزائن', 'نیچرل لینگویج انڈرسٹینڈنگ', 'بیک اینڈ انٹیگریشن'], benefits: ['ہینڈز فری رسائی', 'نیا کسٹمر ٹچ پوائنٹ', 'سمارٹ اسپیکرز پر برانڈ کی موجودگی'], content: { process: [{ step: 1, title: 'استعمال کے کیس کی تعریف', description: 'آواز کے مواقع کی نشاندہی کریں، صارف کے منظرناموں کی وضاحت کریں اور بات چیت کے بہاؤ ڈیزائن کریں۔' }], faq: [{ question: 'کیا ہمیں Alexa، Google یا دونوں کے لیے بنانا چاہیے؟', answer: 'Alexa کے زیادہ سکل صارفین ہیں، Google کا NLU بہتر ہے۔ اکثر ہم ایک پلیٹ فارم سے شروع کرتے ہیں اور بڑھاتے ہیں۔' }] } },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits, content: t.content as any }, create: t as any }); }
    console.log('Seeded translations for voice-assistant-development');
  }

  // Unity Game Development Translations
  const unityDev = await prisma.service.findUnique({ where: { slug: 'unity-game-development' } });
  if (unityDev) {
    const translations = [
      { serviceId: unityDev.id, locale: 'tr', name: 'Unity Oyun Geliştirme', shortDescription: 'Mobil, PC ve konsol dahil tüm platformlar için Unity ile 2D ve 3D oyunlar oluşturun.', fullDescription: 'Unity dünya oyunlarının %50\'sinden fazlasını güçlendiriyor. VR deneyimlerinden mobil oyunlara kadar Unity oyunları geliştiriyoruz.', features: ['2D ve 3D Oyun Geliştirme', 'Mobil Oyun Geliştirme', 'VR/AR Oyun Entegrasyonu', 'Çok Oyunculu Ağ', 'Oyun Fiziği ve AI', 'Platformlar Arası Dağıtım'], benefits: ['Tek kod tabanından 20+ platforma dağıtım', 'Büyük asset store ekosistemi', 'Endüstri standardı oyun motoru'] },
      { serviceId: unityDev.id, locale: 'de', name: 'Unity Spieleentwicklung', shortDescription: 'Erstellen Sie immersive 2D- und 3D-Spiele mit Unity für alle Plattformen.', fullDescription: 'Unity betreibt über 50% der Spiele weltweit. Wir entwickeln Unity-Spiele von VR-Erlebnissen bis zu Mobile Games.', features: ['2D & 3D Spieleentwicklung', 'Mobile Spieleentwicklung', 'VR/AR Spielintegration', 'Multiplayer-Netzwerk', 'Spielphysik & KI', 'Plattformübergreifende Bereitstellung'], benefits: ['Deployment auf 20+ Plattformen aus einer Codebasis', 'Massives Asset Store Ökosystem', 'Branchenstandard-Engine'] },
      { serviceId: unityDev.id, locale: 'ar', name: 'تطوير ألعاب Unity', shortDescription: 'أنشئ ألعاب 2D و 3D غامرة باستخدام Unity لجميع المنصات.', fullDescription: 'يشغل Unity أكثر من 50% من ألعاب العالم. نطور ألعاب Unity من تجارب VR إلى ألعاب الجوال.', features: ['تطوير ألعاب 2D و 3D', 'تطوير ألعاب الجوال', 'تكامل ألعاب VR/AR', 'الشبكات متعددة اللاعبين', 'فيزياء الألعاب والذكاء الاصطناعي', 'النشر عبر المنصات'], benefits: ['النشر لأكثر من 20 منصة من قاعدة كود واحدة', 'نظام بيئي ضخم لمتجر الأصول', 'محرك معياري للصناعة'] },
      { serviceId: unityDev.id, locale: 'ur', name: 'Unity گیم ڈیولپمنٹ', shortDescription: 'تمام پلیٹ فارمز کے لیے Unity کے ساتھ دلچسپ 2D اور 3D گیمز بنائیں۔', fullDescription: 'Unity دنیا کے 50% سے زیادہ گیمز کو پاور کرتا ہے۔ ہم VR تجربات سے موبائل گیمز تک Unity گیمز ڈیولپ کرتے ہیں۔', features: ['2D اور 3D گیم ڈیولپمنٹ', 'موبائل گیم ڈیولپمنٹ', 'VR/AR گیم انٹیگریشن', 'ملٹی پلیئر نیٹ ورکنگ', 'گیم فزکس اور AI', 'کراس پلیٹ فارم ڈیپلائمنٹ'], benefits: ['سنگل کوڈ بیس سے 20+ پلیٹ فارمز پر ڈیپلائی کریں', 'بڑا ایسٹ اسٹور ایکو سسٹم', 'انڈسٹری اسٹینڈرڈ انجن'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for unity-game-development');
  }

  // Unreal Engine Development Translations
  const unrealDev = await prisma.service.findUnique({ where: { slug: 'unreal-engine-development' } });
  if (unrealDev) {
    const translations = [
      { serviceId: unrealDev.id, locale: 'tr', name: 'Unreal Engine Geliştirme', shortDescription: 'Unreal Engine 5 ile AAA kalitesinde oyunlar ve gerçek zamanlı 3D deneyimler oluşturun.', fullDescription: 'Unreal Engine 5, Nanite ve Lumen teknolojisiyle gerçek zamanlı 3D sınırlarını zorluyor. AAA oyunlar ve mimari görselleştirmeler geliştiriyoruz.', features: ['AAA Oyun Geliştirme', 'Mimari Görselleştirme', 'Sanal Prodüksiyon', 'Gerçek Zamanlı Ray Tracing', 'Nanite ve Lumen Entegrasyonu', 'MetaHuman Karakterler'], benefits: ['Kutunun dışında fotorealistik grafikler', 'En son render teknolojisi', 'Hızlı geliştirme için Blueprint'] },
      { serviceId: unrealDev.id, locale: 'de', name: 'Unreal Engine Entwicklung', shortDescription: 'Erstellen Sie AAA-Qualitätsspiele und Echtzeit-3D-Erlebnisse mit Unreal Engine 5.', fullDescription: 'Unreal Engine 5 verschiebt die Grenzen von Echtzeit-3D mit Nanite und Lumen. Wir entwickeln AAA-Spiele und architektonische Visualisierungen.', features: ['AAA-Spieleentwicklung', 'Architekturvisualisierung', 'Virtuelle Produktion', 'Echtzeit-Raytracing', 'Nanite & Lumen Integration', 'MetaHuman-Charaktere'], benefits: ['Fotorealistische Grafik sofort einsatzbereit', 'Modernste Rendering-Technologie', 'Blueprint für schnelle Entwicklung'] },
      { serviceId: unrealDev.id, locale: 'ar', name: 'تطوير Unreal Engine', shortDescription: 'أنشئ ألعاب بجودة AAA وتجارب 3D في الوقت الحقيقي مع Unreal Engine 5.', fullDescription: 'يدفع Unreal Engine 5 حدود 3D في الوقت الحقيقي بتقنية Nanite و Lumen. نطور ألعاب AAA والتصور المعماري.', features: ['تطوير ألعاب AAA', 'التصور المعماري', 'الإنتاج الافتراضي', 'تتبع الأشعة في الوقت الحقيقي', 'تكامل Nanite و Lumen', 'شخصيات MetaHuman'], benefits: ['رسومات واقعية جاهزة للاستخدام', 'تقنية عرض متطورة', 'Blueprint للتطوير السريع'] },
      { serviceId: unrealDev.id, locale: 'ur', name: 'Unreal Engine ڈیولپمنٹ', shortDescription: 'Unreal Engine 5 کے ساتھ AAA کوالٹی گیمز اور ریئل ٹائم 3D تجربات بنائیں۔', fullDescription: 'Unreal Engine 5 Nanite اور Lumen ٹیکنالوجی کے ساتھ ریئل ٹائم 3D کی حدود کو آگے بڑھاتا ہے۔ ہم AAA گیمز اور آرکیٹیکچرل ویژولائزیشنز ڈیولپ کرتے ہیں۔', features: ['AAA گیم ڈیولپمنٹ', 'آرکیٹیکچرل ویژولائزیشن', 'ورچوئل پروڈکشن', 'ریئل ٹائم رے ٹریسنگ', 'Nanite اور Lumen انٹیگریشن', 'MetaHuman کریکٹرز'], benefits: ['فوری فوٹو ریئلسٹک گرافکس', 'جدید ترین رینڈرنگ ٹیکنالوجی', 'تیز ڈیولپمنٹ کے لیے Blueprint'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for unreal-engine-development');
  }

  // AR Development Translations
  const arDev = await prisma.service.findUnique({ where: { slug: 'ar-development' } });
  if (arDev) {
    const translations = [
      { serviceId: arDev.id, locale: 'tr', name: 'AR Geliştirme', shortDescription: 'Mobil, akıllı gözlükler ve kurumsal kullanım için artırılmış gerçeklik uygulamaları oluşturun.', fullDescription: 'Artırılmış Gerçeklik dijital içeriği gerçek dünyaya yerleştirir. ARKit, ARCore ve kurumsal AR platformları kullanarak AR deneyimleri geliştiriyoruz.', features: ['ARKit ve ARCore Geliştirme', 'WebAR Deneyimleri', 'AR Ürün Görselleştirme', 'Konum Tabanlı AR', 'Görüntü ve Nesne Tanıma', 'Kurumsal AR Çözümleri'], benefits: ['Artırılmış müşteri etkileşimi', 'Görselleştirme ile azaltılmış iade', 'Mevcut akıllı telefonlarda çalışır'] },
      { serviceId: arDev.id, locale: 'de', name: 'AR-Entwicklung', shortDescription: 'Erstellen Sie AR-Apps für Mobilgeräte, Smart Glasses und Enterprise-Anwendungen.', fullDescription: 'Augmented Reality überlagert digitale Inhalte auf die reale Welt. Wir entwickeln AR-Erlebnisse mit ARKit, ARCore und Enterprise-AR-Plattformen.', features: ['ARKit & ARCore Entwicklung', 'WebAR-Erlebnisse', 'AR-Produktvisualisierung', 'Standortbasiertes AR', 'Bild- und Objekterkennung', 'Enterprise AR-Lösungen'], benefits: ['Erhöhte Kundenbindung', 'Weniger Retouren durch Visualisierung', 'Funktioniert auf bestehenden Smartphones'] },
      { serviceId: arDev.id, locale: 'ar', name: 'تطوير AR', shortDescription: 'أنشئ تطبيقات الواقع المعزز للجوال والنظارات الذكية وحالات الاستخدام المؤسسية.', fullDescription: 'يضع الواقع المعزز المحتوى الرقمي على العالم الحقيقي. نطور تجارب AR باستخدام ARKit و ARCore ومنصات AR المؤسسية.', features: ['تطوير ARKit و ARCore', 'تجارب WebAR', 'تصور منتجات AR', 'AR قائم على الموقع', 'التعرف على الصور والكائنات', 'حلول AR المؤسسية'], benefits: ['تفاعل محسن مع العملاء', 'تقليل المرتجعات بالتصور', 'يعمل على الهواتف الذكية الحالية'] },
      { serviceId: arDev.id, locale: 'ur', name: 'AR ڈیولپمنٹ', shortDescription: 'موبائل، سمارٹ گلاسز اور انٹرپرائز استعمال کے لیے AR ایپس بنائیں۔', fullDescription: 'Augmented Reality ڈیجیٹل مواد کو حقیقی دنیا پر لگاتی ہے۔ ہم ARKit، ARCore اور انٹرپرائز AR پلیٹ فارمز کا استعمال کرتے ہوئے AR تجربات ڈیولپ کرتے ہیں۔', features: ['ARKit اور ARCore ڈیولپمنٹ', 'WebAR تجربات', 'AR پروڈکٹ ویژولائزیشن', 'لوکیشن بیسڈ AR', 'امیج اور آبجیکٹ ریکگنیشن', 'انٹرپرائز AR سلوشنز'], benefits: ['بہتر کسٹمر انگیجمنٹ', 'ویژولائزیشن سے کم ریٹرنز', 'موجودہ اسمارٹ فونز پر کام کرتا ہے'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for ar-development');
  }

  // VR Development Translations
  const vrDev = await prisma.service.findUnique({ where: { slug: 'vr-development' } });
  if (vrDev) {
    const translations = [
      { serviceId: vrDev.id, locale: 'tr', name: 'VR Geliştirme', shortDescription: 'Eğitim, eğlence ve kurumsal için sürükleyici sanal gerçeklik deneyimleri oluşturun.', fullDescription: 'Sanal Gerçeklik kullanıcıları yeni dünyalara taşıyan tamamen sürükleyici deneyimler oluşturur. Meta Quest, PCVR ve kurumsal başlıklar için VR uygulamaları geliştiriyoruz.', features: ['Meta Quest Geliştirme', 'PCVR (SteamVR/Oculus)', 'Kurumsal VR Eğitimi', 'VR İşbirliği Alanları', 'El ve Göz Takibi', 'VR Fizik ve Etkileşim'], benefits: ['Tamamen sürükleyici deneyimler', 'Tehlikeli görevler için güvenli eğitim', 'Unutulmaz ürün gösterileri'] },
      { serviceId: vrDev.id, locale: 'de', name: 'VR-Entwicklung', shortDescription: 'Erstellen Sie immersive VR-Erlebnisse für Training, Unterhaltung und Enterprise.', fullDescription: 'Virtual Reality schafft vollständig immersive Erlebnisse. Wir entwickeln VR-Anwendungen für Meta Quest, PCVR und Enterprise-Headsets.', features: ['Meta Quest Entwicklung', 'PCVR (SteamVR/Oculus)', 'Enterprise VR-Training', 'VR-Kollaborationsräume', 'Hand- und Eye-Tracking', 'VR-Physik & Interaktion'], benefits: ['Vollständig immersive Erlebnisse', 'Sichere Trainingsumgebung', 'Einprägsame Produktdemos'] },
      { serviceId: vrDev.id, locale: 'ar', name: 'تطوير VR', shortDescription: 'أنشئ تجارب واقع افتراضي غامرة للتدريب والترفيه والمؤسسات.', fullDescription: 'يخلق الواقع الافتراضي تجارب غامرة بالكامل. نطور تطبيقات VR لـ Meta Quest و PCVR وسماعات المؤسسات.', features: ['تطوير Meta Quest', 'PCVR (SteamVR/Oculus)', 'تدريب VR المؤسسي', 'مساحات تعاون VR', 'تتبع اليد والعين', 'فيزياء VR والتفاعل'], benefits: ['تجارب غامرة بالكامل', 'بيئة تدريب آمنة', 'عروض منتجات لا تُنسى'] },
      { serviceId: vrDev.id, locale: 'ur', name: 'VR ڈیولپمنٹ', shortDescription: 'ٹریننگ، تفریح اور انٹرپرائز کے لیے غامر VR تجربات بنائیں۔', fullDescription: 'Virtual Reality مکمل طور پر غامر تجربات بناتا ہے۔ ہم Meta Quest، PCVR اور انٹرپرائز ہیڈسیٹس کے لیے VR ایپلیکیشنز ڈیولپ کرتے ہیں۔', features: ['Meta Quest ڈیولپمنٹ', 'PCVR (SteamVR/Oculus)', 'انٹرپرائز VR ٹریننگ', 'VR تعاون کی جگہیں', 'ہینڈ اور آئی ٹریکنگ', 'VR فزکس اور انٹریکشن'], benefits: ['مکمل طور پر غامر تجربات', 'خطرناک کاموں کے لیے محفوظ ٹریننگ', 'یادگار پروڈکٹ ڈیموز'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for vr-development');
  }

  // Smart Contract Development Translations
  const smartContract = await prisma.service.findUnique({ where: { slug: 'smart-contract-development' } });
  if (smartContract) {
    const translations = [
      { serviceId: smartContract.id, locale: 'tr', name: 'Akıllı Sözleşme Geliştirme', shortDescription: 'Ethereum, Solana ve diğer blokzincirlerde güvenli, denetlenmiş akıllı sözleşmeler oluşturun.', fullDescription: 'Akıllı sözleşmeler merkezi olmayan uygulamaların omurgasıdır. DeFi protokolleri, NFT pazarları ve DAO\'lar için güvenli, gaz optimize edilmiş sözleşmeler geliştiriyoruz.', features: ['ERC-20 ve ERC-721 Tokenlar', 'DeFi Protokol Geliştirme', 'DAO ve Yönetişim Sözleşmeleri', 'Çapraz Zincir Köprüler', 'Gaz Optimizasyonu', 'Güvenlik Denetimi'], benefits: ['Güvenilir, otomatik yürütme', 'Şeffaf, doğrulanabilir mantık', 'Azaltılmış aracı maliyetleri'] },
      { serviceId: smartContract.id, locale: 'de', name: 'Smart Contract Entwicklung', shortDescription: 'Entwickeln Sie sichere, auditierte Smart Contracts auf Ethereum, Solana und anderen Blockchains.', fullDescription: 'Smart Contracts sind das Rückgrat dezentraler Anwendungen. Wir entwickeln sichere, gas-optimierte Contracts für DeFi, NFT-Marktplätze und DAOs.', features: ['ERC-20 & ERC-721 Tokens', 'DeFi-Protokollentwicklung', 'DAO & Governance Contracts', 'Cross-Chain Bridges', 'Gas-Optimierung', 'Sicherheitsaudit'], benefits: ['Vertrauenslose, automatisierte Ausführung', 'Transparente, verifizierbare Logik', 'Reduzierte Vermittlerkosten'] },
      { serviceId: smartContract.id, locale: 'ar', name: 'تطوير العقود الذكية', shortDescription: 'أنشئ عقود ذكية آمنة ومدققة على Ethereum و Solana وسلاسل الكتل الأخرى.', fullDescription: 'العقود الذكية هي العمود الفقري للتطبيقات اللامركزية. نطور عقود آمنة ومحسنة للغاز لـ DeFi و أسواق NFT و DAOs.', features: ['رموز ERC-20 و ERC-721', 'تطوير بروتوكول DeFi', 'عقود DAO والحوكمة', 'جسور عبر السلاسل', 'تحسين الغاز', 'التدقيق الأمني'], benefits: ['تنفيذ آلي بدون ثقة', 'منطق شفاف وقابل للتحقق', 'تكاليف وسيط مخفضة'] },
      { serviceId: smartContract.id, locale: 'ur', name: 'سمارٹ کنٹریکٹ ڈیولپمنٹ', shortDescription: 'Ethereum، Solana اور دیگر بلاکچینز پر محفوظ، آڈٹ شدہ سمارٹ کنٹریکٹس بنائیں۔', fullDescription: 'سمارٹ کنٹریکٹس ڈی سینٹرلائزڈ ایپلیکیشنز کی ریڑھ کی ہڈی ہیں۔ ہم DeFi، NFT مارکیٹ پلیسز اور DAOs کے لیے محفوظ، گیس آپٹیمائزڈ کنٹریکٹس ڈیولپ کرتے ہیں۔', features: ['ERC-20 اور ERC-721 ٹوکنز', 'DeFi پروٹوکول ڈیولپمنٹ', 'DAO اور گورننس کنٹریکٹس', 'کراس چین برجز', 'گیس آپٹیمائزیشن', 'سیکیورٹی آڈٹ'], benefits: ['بھروسہ مند، خودکار عملدرآمد', 'شفاف، قابل تصدیق منطق', 'کم ثالث لاگت'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for smart-contract-development');
  }

  // NFT Marketplace Development Translations
  const nftMarketplace = await prisma.service.findUnique({ where: { slug: 'nft-marketplace-development' } });
  if (nftMarketplace) {
    const translations = [
      { serviceId: nftMarketplace.id, locale: 'tr', name: 'NFT Pazaryeri Geliştirme', shortDescription: 'Sanat, koleksiyon ve oyun için özel NFT pazaryerleri oluşturun.', fullDescription: 'NFT pazaryerleri yaratıcıların ve koleksiyoncuların dijital varlıkları ticaret yapmasını sağlar. Nişinize özel platformlar inşa ediyoruz.', features: ['Özel Pazaryeri UI/UX', 'Lazy Minting', 'Müzayede ve Sabit Fiyat Satışları', 'Yaratıcı Telif Hakları', 'Çoklu Zincir Desteği', 'Cüzdan Entegrasyonu'], benefits: ['Kendi pazaryerinizi ve ücretlerinizi yönetin', 'Özel markalama', 'Yerleşik yaratıcı telif hakları'] },
      { serviceId: nftMarketplace.id, locale: 'de', name: 'NFT-Marktplatz Entwicklung', shortDescription: 'Erstellen Sie benutzerdefinierte NFT-Marktplätze für Kunst, Sammlerstücke und Gaming.', fullDescription: 'NFT-Marktplätze ermöglichen den Handel mit digitalen Assets. Wir bauen maßgeschneiderte Plattformen für Ihre Nische.', features: ['Benutzerdefinierte Marktplatz-UI/UX', 'Lazy Minting', 'Auktion & Festpreisverkauf', 'Creator Royalties', 'Multi-Chain Support', 'Wallet-Integration'], benefits: ['Eigener Marktplatz und Gebühren', 'Individuelles Branding', 'Eingebaute Creator Royalties'] },
      { serviceId: nftMarketplace.id, locale: 'ar', name: 'تطوير سوق NFT', shortDescription: 'أنشئ أسواق NFT مخصصة للفن والمقتنيات والألعاب.', fullDescription: 'تمكن أسواق NFT المبدعين والجامعين من تداول الأصول الرقمية. نبني منصات مخصصة لمجالك.', features: ['واجهة سوق مخصصة', 'Lazy Minting', 'مزادات وبيع بسعر ثابت', 'عائدات المبدعين', 'دعم سلاسل متعددة', 'تكامل المحفظة'], benefits: ['امتلك سوقك ورسومك', 'علامة تجارية مخصصة', 'عائدات مبدعين مدمجة'] },
      { serviceId: nftMarketplace.id, locale: 'ur', name: 'NFT مارکیٹ پلیس ڈیولپمنٹ', shortDescription: 'آرٹ، کلیکٹیبلز اور گیمنگ کے لیے کسٹم NFT مارکیٹ پلیسز بنائیں۔', fullDescription: 'NFT مارکیٹ پلیسز تخلیق کاروں اور کلیکٹرز کو ڈیجیٹل اثاثوں کی تجارت کے قابل بناتی ہیں۔ ہم آپ کے مخصوص شعبے کے لیے پلیٹ فارمز بناتے ہیں۔', features: ['کسٹم مارکیٹ پلیس UI/UX', 'Lazy Minting', 'نیلامی اور فکسڈ پرائس سیلز', 'کریٹر رائلٹیز', 'ملٹی چین سپورٹ', 'والٹ انٹیگریشن'], benefits: ['اپنی مارکیٹ پلیس اور فیس کے مالک بنیں', 'کسٹم برانڈنگ', 'بلٹ ان کریٹر رائلٹیز'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for nft-marketplace-development');
  }

  // Cybersecurity Auditing Translations
  const cyberAudit = await prisma.service.findUnique({ where: { slug: 'cybersecurity-auditing' } });
  if (cyberAudit) {
    const translations = [
      { serviceId: cyberAudit.id, locale: 'tr', name: 'Siber Güvenlik Denetimi', shortDescription: 'Saldırganlardan önce güvenlik açıklarını tespit etmek için kapsamlı güvenlik değerlendirmeleri.', fullDescription: 'Siber güvenlik denetimleri ihlallerden önce güvenlik açıklarını ortaya çıkarır. Uygulama güvenliği, altyapı ve uyumluluk dahil kapsamlı değerlendirmeler yapıyoruz.', features: ['Uygulama Güvenlik Denetimi', 'Altyapı Değerlendirmesi', 'Bulut Güvenlik İncelemesi', 'Kod Güvenlik İncelemesi', 'Uyumluluk Boşluk Analizi', 'Yönetici Risk Raporu'], benefits: ['Güvenlik açıklarını proaktif tespit', 'Öncelikli düzeltme yol haritası', 'Uyumluluk belgeleri'] },
      { serviceId: cyberAudit.id, locale: 'de', name: 'Cybersecurity Audit', shortDescription: 'Umfassende Sicherheitsbewertungen zur Identifizierung von Schwachstellen vor Angreifern.', fullDescription: 'Cybersecurity-Audits decken Schwachstellen auf, bevor sie zu Sicherheitsverletzungen führen. Wir führen umfassende Bewertungen durch.', features: ['Anwendungssicherheitsaudit', 'Infrastrukturbewertung', 'Cloud-Sicherheitsüberprüfung', 'Code-Sicherheitsüberprüfung', 'Compliance-Gap-Analyse', 'Executive Risk Report'], benefits: ['Proaktive Schwachstellenerkennung', 'Priorisierte Behebungs-Roadmap', 'Compliance-Dokumentation'] },
      { serviceId: cyberAudit.id, locale: 'ar', name: 'تدقيق الأمن السيبراني', shortDescription: 'تقييمات أمنية شاملة لتحديد نقاط الضعف قبل المهاجمين.', fullDescription: 'تكشف عمليات تدقيق الأمن السيبراني عن نقاط الضعف قبل أن تصبح اختراقات. نجري تقييمات شاملة.', features: ['تدقيق أمان التطبيقات', 'تقييم البنية التحتية', 'مراجعة أمان السحابة', 'مراجعة أمان الكود', 'تحليل فجوات الامتثال', 'تقرير المخاطر التنفيذي'], benefits: ['كشف الثغرات بشكل استباقي', 'خارطة طريق إصلاح ذات أولوية', 'وثائق الامتثال'] },
      { serviceId: cyberAudit.id, locale: 'ur', name: 'سائبر سیکیورٹی آڈٹنگ', shortDescription: 'حملہ آوروں سے پہلے کمزوریوں کی نشاندہی کے لیے جامع سیکیورٹی اسیسمنٹس۔', fullDescription: 'سائبر سیکیورٹی آڈٹس خلاف ورزیوں سے پہلے کمزوریوں کو ظاہر کرتے ہیں۔ ہم جامع اسیسمنٹس کرتے ہیں۔', features: ['ایپلیکیشن سیکیورٹی آڈٹ', 'انفراسٹرکچر اسیسمنٹ', 'کلاؤڈ سیکیورٹی ریویو', 'کوڈ سیکیورٹی ریویو', 'کمپلائنس گیپ اینالیسس', 'ایگزیکٹو رسک رپورٹ'], benefits: ['کمزوریوں کی فعال شناخت', 'ترجیحی ریمیڈیئشن روڈ میپ', 'کمپلائنس دستاویزات'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for cybersecurity-auditing');
  }

  // Penetration Testing Translations
  const pentest = await prisma.service.findUnique({ where: { slug: 'penetration-testing' } });
  if (pentest) {
    const translations = [
      { serviceId: pentest.id, locale: 'tr', name: 'Penetrasyon Testi', shortDescription: 'Savunmalarınızı test etmek için gerçek dünya saldırılarını simüle eden etik hackleme.', fullDescription: 'Penetrasyon testi sistemlerinize gerçek dünya saldırılarını simüle eder. Sertifikalı etik hackerlarımız kötü niyetli aktörlerle aynı teknikleri kullanarak savunmalarınızı aşmaya çalışır.', features: ['Web Uygulama Pentesti', 'API Güvenlik Testi', 'Ağ Penetrasyon Testi', 'Bulut Altyapı Testi', 'Mobil Uygulama Pentesti', 'Kırmızı Takım Egzersizleri'], benefits: ['Sömürülebilirlik kanıtı', 'Gerçek dünya saldırı simülasyonu', 'Güvenlik kontrollerini doğrulama'] },
      { serviceId: pentest.id, locale: 'de', name: 'Penetrationstest', shortDescription: 'Ethisches Hacking zum Testen Ihrer Verteidigung durch Simulation realer Angriffe.', fullDescription: 'Penetrationstests simulieren reale Angriffe auf Ihre Systeme. Unsere zertifizierten ethischen Hacker versuchen, Ihre Verteidigung zu durchbrechen.', features: ['Web-Anwendungs-Pentest', 'API-Sicherheitstest', 'Netzwerk-Penetrationstest', 'Cloud-Infrastrukturtest', 'Mobile App Pentest', 'Red Team Übungen'], benefits: ['Nachweis der Ausnutzbarkeit', 'Reale Angriffssimulation', 'Validierung der Sicherheitskontrollen'] },
      { serviceId: pentest.id, locale: 'ar', name: 'اختبار الاختراق', shortDescription: 'القرصنة الأخلاقية لاختبار دفاعاتك من خلال محاكاة هجمات العالم الحقيقي.', fullDescription: 'يحاكي اختبار الاختراق هجمات العالم الحقيقي على أنظمتك. يحاول قراصنتنا الأخلاقيون المعتمدون اختراق دفاعاتك.', features: ['اختبار اختراق تطبيقات الويب', 'اختبار أمان API', 'اختبار اختراق الشبكة', 'اختبار البنية التحتية السحابية', 'اختبار تطبيقات الجوال', 'تمارين الفريق الأحمر'], benefits: ['إثبات قابلية الاستغلال', 'محاكاة هجوم واقعي', 'التحقق من ضوابط الأمان'] },
      { serviceId: pentest.id, locale: 'ur', name: 'پینیٹریشن ٹیسٹنگ', shortDescription: 'حقیقی دنیا کے حملوں کی نقالی کر کے اپنے دفاع کو جانچنے کے لیے اخلاقی ہیکنگ۔', fullDescription: 'پینیٹریشن ٹیسٹنگ آپ کے سسٹمز پر حقیقی دنیا کے حملوں کی نقالی کرتی ہے۔ ہمارے سرٹیفائیڈ اخلاقی ہیکرز آپ کے دفاع کو توڑنے کی کوشش کرتے ہیں۔', features: ['ویب ایپلیکیشن پینٹسٹ', 'API سیکیورٹی ٹیسٹنگ', 'نیٹ ورک پینیٹریشن ٹیسٹنگ', 'کلاؤڈ انفراسٹرکچر ٹیسٹنگ', 'موبائل ایپ پینٹسٹ', 'ریڈ ٹیم ایکسرسائزز'], benefits: ['ایکسپلائٹیبلٹی کا ثبوت', 'حقیقی دنیا کی حملے کی نقالی', 'سیکیورٹی کنٹرولز کی توثیق'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for penetration-testing');
  }

  // GraphQL API Development Translations
  const graphqlDev = await prisma.service.findUnique({ where: { slug: 'graphql-api-development' } });
  if (graphqlDev) {
    const translations = [
      { serviceId: graphqlDev.id, locale: 'tr', name: 'GraphQL API Geliştirme', shortDescription: 'Modern uygulamalar için GraphQL ile esnek, verimli API\'ler oluşturun.', fullDescription: 'GraphQL istemcilere tam olarak ihtiyaç duydukları şeyi sorma gücü verir. Uygun şema tasarımı, güvenlik ve önbellekleme ile GraphQL API\'leri tasarlıyor ve oluşturuyoruz.', features: ['Şema Tasarımı', 'Resolver Uygulaması', 'Kimlik Doğrulama ve Yetkilendirme', 'Gerçek Zamanlı Abonelikler', 'DataLoader ve N+1 Önleme', 'REST\'ten GraphQL Geçişi'], benefits: ['İstemciler tam olarak gereken veriyi alır', 'Tek uç nokta basitliği', 'Güçlü tipleme ve içgözlem'] },
      { serviceId: graphqlDev.id, locale: 'de', name: 'GraphQL API Entwicklung', shortDescription: 'Erstellen Sie flexible, effiziente APIs mit GraphQL für moderne Anwendungen.', fullDescription: 'GraphQL gibt Clients die Macht zu fragen, was sie genau brauchen. Wir entwerfen und bauen GraphQL-APIs mit richtigem Schema-Design, Sicherheit und Caching.', features: ['Schema-Design', 'Resolver-Implementierung', 'Authentifizierung & Autorisierung', 'Echtzeit-Subscriptions', 'DataLoader & N+1 Prävention', 'REST zu GraphQL Migration'], benefits: ['Clients bekommen genau die benötigten Daten', 'Einfachheit eines einzigen Endpoints', 'Starke Typisierung und Introspektion'] },
      { serviceId: graphqlDev.id, locale: 'ar', name: 'تطوير GraphQL API', shortDescription: 'أنشئ واجهات برمجة تطبيقات مرنة وفعالة باستخدام GraphQL للتطبيقات الحديثة.', fullDescription: 'يمنح GraphQL العملاء القدرة على طلب ما يحتاجونه بالضبط. نصمم ونبني واجهات GraphQL مع تصميم مخطط مناسب وأمان وتخزين مؤقت.', features: ['تصميم المخطط', 'تنفيذ المحللات', 'المصادقة والتفويض', 'الاشتراكات في الوقت الحقيقي', 'DataLoader ومنع N+1', 'الانتقال من REST إلى GraphQL'], benefits: ['يحصل العملاء على البيانات المطلوبة بالضبط', 'بساطة نقطة نهاية واحدة', 'كتابة قوية واستبطان'] },
      { serviceId: graphqlDev.id, locale: 'ur', name: 'GraphQL API ڈیولپمنٹ', shortDescription: 'جدید ایپلیکیشنز کے لیے GraphQL کے ساتھ لچکدار، موثر APIs بنائیں۔', fullDescription: 'GraphQL کلائنٹس کو بالکل وہی مانگنے کی طاقت دیتا ہے جس کی انہیں ضرورت ہے۔ ہم مناسب اسکیما ڈیزائن، سیکیورٹی اور کیشنگ کے ساتھ GraphQL APIs ڈیزائن اور بناتے ہیں۔', features: ['اسکیما ڈیزائن', 'ریزولور امپلیمنٹیشن', 'اتھینٹیکیشن اور اتھورائزیشن', 'ریئل ٹائم سبسکرپشنز', 'DataLoader اور N+1 پریونشن', 'REST سے GraphQL مائیگریشن'], benefits: ['کلائنٹس کو بالکل ضروری ڈیٹا ملتا ہے', 'سنگل اینڈ پوائنٹ کی سادگی', 'مضبوط ٹائپنگ اور انٹروسپیکشن'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for graphql-api-development');
  }

  // Microservices Architecture Translations
  const microservices = await prisma.service.findUnique({ where: { slug: 'microservices-architecture' } });
  if (microservices) {
    const translations = [
      { serviceId: microservices.id, locale: 'tr', name: 'Mikroservis Mimarisi', shortDescription: 'Ölçek ve çeviklik için bağımsız olarak dağıtılabilir servislere monolitleri ayırın.', fullDescription: 'Mikroservisler ekiplerin servisleri bağımsız olarak oluşturmasını, dağıtmasını ve ölçeklendirmesini sağlar. Organizasyonunuz ve gereksinimlerinize uygun mimari tasarlamaya yardımcı oluyoruz.', features: ['Alan Odaklı Tasarım', 'Servis Ayrıştırma', 'API Gateway Tasarımı', 'Olay Odaklı Mimari', 'Servis Mesh Uygulaması', 'Dağıtık İzleme'], benefits: ['Servis başına bağımsız ölçekleme', 'Servis başına teknoloji esnekliği', 'Daha hızlı dağıtım döngüleri'] },
      { serviceId: microservices.id, locale: 'de', name: 'Microservices-Architektur', shortDescription: 'Zerlegen Sie Monolithen in unabhängig deploybare Services für Skalierung und Agilität.', fullDescription: 'Microservices ermöglichen Teams, Services unabhängig zu entwickeln, zu deployen und zu skalieren. Wir helfen bei der Architekturgestaltung.', features: ['Domain-Driven Design', 'Service-Dekomposition', 'API Gateway Design', 'Event-Driven Architecture', 'Service Mesh Implementation', 'Distributed Tracing'], benefits: ['Unabhängige Skalierung pro Service', 'Technologie-Flexibilität pro Service', 'Schnellere Deployment-Zyklen'] },
      { serviceId: microservices.id, locale: 'ar', name: 'بنية الخدمات المصغرة', shortDescription: 'قسّم المونوليث إلى خدمات قابلة للنشر بشكل مستقل للتوسع والمرونة.', fullDescription: 'تمكن الخدمات المصغرة الفرق من بناء ونشر وتوسيع الخدمات بشكل مستقل. نساعد في تصميم البنية.', features: ['التصميم الموجه بالمجال', 'تفكيك الخدمات', 'تصميم بوابة API', 'البنية الموجهة بالأحداث', 'تنفيذ Service Mesh', 'التتبع الموزع'], benefits: ['توسيع مستقل لكل خدمة', 'مرونة تقنية لكل خدمة', 'دورات نشر أسرع'] },
      { serviceId: microservices.id, locale: 'ur', name: 'مائیکرو سروسز آرکیٹیکچر', shortDescription: 'اسکیل اور چستی کے لیے مونولیتھس کو آزادانہ طور پر ڈیپلوئی ایبل سروسز میں تقسیم کریں۔', fullDescription: 'مائیکرو سروسز ٹیموں کو آزادانہ طور پر سروسز بنانے، ڈیپلائی کرنے اور اسکیل کرنے کے قابل بناتی ہیں۔ ہم آرکیٹیکچر ڈیزائن میں مدد کرتے ہیں۔', features: ['ڈومین ڈریون ڈیزائن', 'سروس ڈیکمپوزیشن', 'API گیٹ وے ڈیزائن', 'ایونٹ ڈریون آرکیٹیکچر', 'سروس میش امپلیمنٹیشن', 'ڈسٹری بیوٹڈ ٹریسنگ'], benefits: ['فی سروس آزاد اسکیلنگ', 'فی سروس ٹیکنالوجی لچک', 'تیز تر ڈیپلائمنٹ سائیکلز'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for microservices-architecture');
  }

  // Real-Time Applications Translations
  const realtime = await prisma.service.findUnique({ where: { slug: 'real-time-applications' } });
  if (realtime) {
    const translations = [
      { serviceId: realtime.id, locale: 'tr', name: 'Gerçek Zamanlı Uygulamalar', shortDescription: 'WebSockets ve gerçek zamanlı altyapı ile anında güncellenen uygulamalar oluşturun.', fullDescription: 'Gerçek zamanlı uygulamalar sayfa yenilemeden anında güncellemeler sunar. İşbirliği araçları, canlı gösterge panelleri ve sohbet uygulamaları oluşturuyoruz.', features: ['WebSocket Uygulaması', 'Server-Sent Events', 'Gerçek Zamanlı Veritabanları', 'İşbirlikçi Düzenleme', 'Varlık ve Yazma Göstergeleri', 'Canlı Bildirimler'], benefits: ['Anında kullanıcı geri bildirimi', 'Gelişmiş işbirliği', 'Azaltılmış sunucu sorgulaması'] },
      { serviceId: realtime.id, locale: 'de', name: 'Echtzeit-Anwendungen', shortDescription: 'Erstellen Sie Anwendungen mit sofortigen Updates mittels WebSockets und Echtzeit-Infrastruktur.', fullDescription: 'Echtzeit-Anwendungen liefern sofortige Updates ohne Seitenaktualisierung. Wir bauen Kollaborationstools, Live-Dashboards und Chat-Anwendungen.', features: ['WebSocket-Implementierung', 'Server-Sent Events', 'Echtzeit-Datenbanken', 'Kollaboratives Editieren', 'Präsenz- & Tippindikatoren', 'Live-Benachrichtigungen'], benefits: ['Sofortiges Benutzer-Feedback', 'Verbesserte Zusammenarbeit', 'Reduziertes Server-Polling'] },
      { serviceId: realtime.id, locale: 'ar', name: 'تطبيقات الوقت الحقيقي', shortDescription: 'أنشئ تطبيقات بتحديثات فورية باستخدام WebSockets والبنية التحتية للوقت الحقيقي.', fullDescription: 'تقدم تطبيقات الوقت الحقيقي تحديثات فورية بدون تحديث الصفحة. نبني أدوات تعاون ولوحات معلومات حية وتطبيقات دردشة.', features: ['تنفيذ WebSocket', 'أحداث المرسلة من الخادم', 'قواعد بيانات الوقت الحقيقي', 'التحرير التعاوني', 'مؤشرات الحضور والكتابة', 'الإشعارات المباشرة'], benefits: ['تعليقات المستخدم الفورية', 'تعاون محسن', 'استقصاء خادم مخفض'] },
      { serviceId: realtime.id, locale: 'ur', name: 'ریئل ٹائم ایپلیکیشنز', shortDescription: 'WebSockets اور ریئل ٹائم انفراسٹرکچر کے ساتھ فوری اپڈیٹس والی ایپلیکیشنز بنائیں۔', fullDescription: 'ریئل ٹائم ایپلیکیشنز صفحہ ریفریش کے بغیر فوری اپڈیٹس فراہم کرتی ہیں۔ ہم کولیبریشن ٹولز، لائیو ڈیش بورڈز اور چیٹ ایپلیکیشنز بناتے ہیں۔', features: ['WebSocket امپلیمنٹیشن', 'سرور سینٹ ایونٹس', 'ریئل ٹائم ڈیٹا بیسز', 'کولیبوریٹو ایڈیٹنگ', 'پریزنس اور ٹائپنگ انڈیکیٹرز', 'لائیو نوٹیفیکیشنز'], benefits: ['فوری صارف فیڈ بیک', 'بہتر تعاون', 'کم سرور پولنگ'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for real-time-applications');
  }

  // Payment Gateway Integration Translations
  const paymentGatewayService = await prisma.service.findUnique({ where: { slug: 'payment-gateway-integration' } });
  if (paymentGatewayService) {
    const translations = [
      { serviceId: paymentGatewayService.id, locale: 'tr', name: 'Ödeme Geçidi Entegrasyonu', shortDescription: 'Stripe, PayPal ve bölgesel sağlayıcılarla güvenli ödeme işleme entegre edin.', fullDescription: 'Ödeme entegrasyonu e-ticaret ve SaaS işletmeleri için kritik öneme sahiptir. Uygun güvenlik ve PCI uyumluluğu ile ödeme geçitleri entegre ediyoruz.', features: ['Stripe Entegrasyonu', 'PayPal ve Braintree', 'Abonelik Faturalandırma', 'Pazar Yeri Ödemeleri', 'Çoklu Para Birimi Desteği', 'Dolandırıcılık Önleme'], benefits: ['Küresel ödeme kabul edin', 'Sepet terk oranını azaltın', 'Otomatik yinelenen faturalama'] },
      { serviceId: paymentGatewayService.id, locale: 'de', name: 'Payment Gateway Integration', shortDescription: 'Integrieren Sie sichere Zahlungsabwicklung mit Stripe, PayPal und regionalen Anbietern.', fullDescription: 'Zahlungsintegration ist kritisch für E-Commerce und SaaS. Wir integrieren Payment Gateways mit angemessener Sicherheit und PCI-Compliance.', features: ['Stripe-Integration', 'PayPal & Braintree', 'Abo-Abrechnung', 'Marktplatz-Auszahlungen', 'Multi-Währungs-Support', 'Betrugsprävention'], benefits: ['Weltweit Zahlungen akzeptieren', 'Warenkorbabbrüche reduzieren', 'Automatisierte wiederkehrende Abrechnung'] },
      { serviceId: paymentGatewayService.id, locale: 'ar', name: 'تكامل بوابة الدفع', shortDescription: 'دمج معالجة الدفع الآمنة مع Stripe و PayPal ومقدمي الخدمات الإقليميين.', fullDescription: 'تكامل الدفع أمر بالغ الأهمية للتجارة الإلكترونية و SaaS. ندمج بوابات الدفع مع الأمان المناسب وامتثال PCI.', features: ['تكامل Stripe', 'PayPal و Braintree', 'فوترة الاشتراكات', 'مدفوعات السوق', 'دعم العملات المتعددة', 'منع الاحتيال'], benefits: ['قبول المدفوعات عالمياً', 'تقليل التخلي عن سلة التسوق', 'الفوترة المتكررة الآلية'] },
      { serviceId: paymentGatewayService.id, locale: 'ur', name: 'پیمنٹ گیٹ وے انٹیگریشن', shortDescription: 'Stripe، PayPal اور علاقائی فراہم کنندگان کے ساتھ محفوظ ادائیگی کی پروسیسنگ انٹیگریٹ کریں۔', fullDescription: 'ادائیگی کا انضمام ای کامرس اور SaaS کے لیے اہم ہے۔ ہم مناسب سیکیورٹی اور PCI کمپلائنس کے ساتھ پیمنٹ گیٹ ویز انٹیگریٹ کرتے ہیں۔', features: ['Stripe انٹیگریشن', 'PayPal اور Braintree', 'سبسکرپشن بلنگ', 'مارکیٹ پلیس پے آؤٹس', 'ملٹی کرنسی سپورٹ', 'فراڈ پریونشن'], benefits: ['عالمی سطح پر ادائیگیاں قبول کریں', 'کارٹ ابینڈنمنٹ کم کریں', 'خودکار بار بار کی بلنگ'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for payment-gateway-integration');
  }

  // CRM Development Translations
  const crmDev = await prisma.service.findUnique({ where: { slug: 'crm-development' } });
  if (crmDev) {
    const translations = [
      { serviceId: crmDev.id, locale: 'tr', name: 'CRM Geliştirme', shortDescription: 'Satış ve müşteri başarı süreçlerinize özel CRM sistemleri oluşturun.', fullDescription: 'Hazır CRM\'ler nadiren mükemmel uyum sağlar. Satış sürecinize ve iş akışlarınıza tam olarak uyan özel CRM sistemleri oluşturuyoruz.', features: ['İletişim ve Müşteri Adayı Yönetimi', 'Satış Pipeline Otomasyonu', 'E-posta Entegrasyonu', 'Görev ve Aktivite Takibi', 'Özel Alanlar ve İş Akışları', 'Raporlama ve Analitik'], benefits: ['Tam sürecinize uyar', 'Koltuk başı lisans ücreti yok', 'Tam veri sahipliği'] },
      { serviceId: crmDev.id, locale: 'de', name: 'CRM-Entwicklung', shortDescription: 'Erstellen Sie maßgeschneiderte CRM-Systeme für Ihre Vertriebs- und Kundenerfolgs-Prozesse.', fullDescription: 'Standard-CRMs passen selten perfekt. Wir bauen maßgeschneiderte CRM-Systeme, die genau zu Ihrem Vertriebsprozess passen.', features: ['Kontakt- & Lead-Management', 'Sales Pipeline Automatisierung', 'E-Mail-Integration', 'Aufgaben- & Aktivitätstracking', 'Benutzerdefinierte Felder & Workflows', 'Reporting & Analytics'], benefits: ['Passt genau zu Ihrem Prozess', 'Keine Lizenzgebühren pro Benutzer', 'Volle Dateneigentümerschaft'] },
      { serviceId: crmDev.id, locale: 'ar', name: 'تطوير CRM', shortDescription: 'أنشئ أنظمة CRM مخصصة لعمليات المبيعات ونجاح العملاء.', fullDescription: 'نادراً ما تناسب CRM الجاهزة بشكل مثالي. نبني أنظمة CRM مخصصة تتناسب تماماً مع عملية المبيعات الخاصة بك.', features: ['إدارة جهات الاتصال والعملاء المحتملين', 'أتمتة خط أنابيب المبيعات', 'تكامل البريد الإلكتروني', 'تتبع المهام والأنشطة', 'حقول وسير عمل مخصصة', 'التقارير والتحليلات'], benefits: ['يناسب عمليتك بالضبط', 'لا رسوم ترخيص لكل مقعد', 'ملكية كاملة للبيانات'] },
      { serviceId: crmDev.id, locale: 'ur', name: 'CRM ڈیولپمنٹ', shortDescription: 'اپنی سیلز اور کسٹمر سکسیس پروسیسز کے لیے کسٹم CRM سسٹمز بنائیں۔', fullDescription: 'آف دی شیلف CRMs شاذ و نادر ہی بالکل فٹ ہوتے ہیں۔ ہم آپ کی سیلز پروسیس کے مطابق کسٹم CRM سسٹمز بناتے ہیں۔', features: ['کانٹیکٹ اور لیڈ مینجمنٹ', 'سیلز پائپ لائن آٹومیشن', 'ای میل انٹیگریشن', 'ٹاسک اور ایکٹیویٹی ٹریکنگ', 'کسٹم فیلڈز اور ورک فلوز', 'رپورٹنگ اور اینالیٹکس'], benefits: ['آپ کی پروسیس کے بالکل مطابق', 'فی سیٹ لائسنسنگ فیس نہیں', 'مکمل ڈیٹا ملکیت'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for crm-development');
  }

  // ERP Development Translations
  const erpDev = await prisma.service.findUnique({ where: { slug: 'erp-development' } });
  if (erpDev) {
    const translations = [
      { serviceId: erpDev.id, locale: 'tr', name: 'ERP Geliştirme', shortDescription: 'İş operasyonlarınızı birleştiren özel ERP sistemleri oluşturun.', fullDescription: 'Kurumsal Kaynak Planlama sistemleri tüm iş operasyonlarını entegre eder. Envanter, finans, İK ve operasyonları tek platformda birleştiren özel ERP çözümleri oluşturuyoruz.', features: ['Envanter Yönetimi', 'Mali Muhasebe', 'İK ve Bordro', 'Tedarik Zinciri Yönetimi', 'Üretim ve Prodüksiyon', 'İş Zekası'], benefits: ['Tek doğruluk kaynağı', 'Süreç otomasyonu', 'Gerçek zamanlı görünürlük'] },
      { serviceId: erpDev.id, locale: 'de', name: 'ERP-Entwicklung', shortDescription: 'Erstellen Sie maßgeschneiderte ERP-Systeme, die Ihre Geschäftsabläufe vereinen.', fullDescription: 'Enterprise Resource Planning vereint alle Geschäftsabläufe. Wir bauen maßgeschneiderte ERP-Lösungen für Inventar, Finanzen, HR und Operations.', features: ['Bestandsverwaltung', 'Finanzbuchhaltung', 'HR & Gehaltsabrechnung', 'Lieferkettenmanagement', 'Fertigung & Produktion', 'Business Intelligence'], benefits: ['Einzige Quelle der Wahrheit', 'Prozessautomatisierung', 'Echtzeit-Transparenz'] },
      { serviceId: erpDev.id, locale: 'ar', name: 'تطوير ERP', shortDescription: 'أنشئ أنظمة ERP مخصصة توحد عمليات أعمالك.', fullDescription: 'تدمج أنظمة تخطيط موارد المؤسسات جميع العمليات التجارية. نبني حلول ERP مخصصة للمخزون والمالية والموارد البشرية والعمليات.', features: ['إدارة المخزون', 'المحاسبة المالية', 'الموارد البشرية والرواتب', 'إدارة سلسلة التوريد', 'التصنيع والإنتاج', 'ذكاء الأعمال'], benefits: ['مصدر واحد للحقيقة', 'أتمتة العمليات', 'رؤية في الوقت الحقيقي'] },
      { serviceId: erpDev.id, locale: 'ur', name: 'ERP ڈیولپمنٹ', shortDescription: 'اپنے کاروباری آپریشنز کو متحد کرنے والے کسٹم ERP سسٹمز بنائیں۔', fullDescription: 'انٹرپرائز ریسورس پلاننگ سسٹمز تمام کاروباری آپریشنز کو انٹیگریٹ کرتے ہیں۔ ہم انوینٹری، فنانس، HR اور آپریشنز کے لیے کسٹم ERP سلوشنز بناتے ہیں۔', features: ['انوینٹری مینجمنٹ', 'فنانشل اکاؤنٹنگ', 'HR اور پے رول', 'سپلائی چین مینجمنٹ', 'مینوفیکچرنگ اور پروڈکشن', 'بزنس انٹیلیجنس'], benefits: ['سنگل سورس آف ٹروتھ', 'پروسیس آٹومیشن', 'ریئل ٹائم ویزیبلٹی'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for erp-development');
  }

  // Email Marketing Automation Translations
  const emailMarketing = await prisma.service.findUnique({ where: { slug: 'email-marketing-automation' } });
  if (emailMarketing) {
    const translations = [
      { serviceId: emailMarketing.id, locale: 'tr', name: 'E-posta Pazarlama Otomasyonu', shortDescription: 'Müşteri adaylarını besleyen ve müşterileri elde tutan otomatik e-posta kampanyaları oluşturun.', fullDescription: 'E-posta en yüksek ROI\'ye sahip pazarlama kanalı olmaya devam ediyor. Sonuç veren e-posta pazarlama otomasyonu tasarlıyor ve uyguluyoruz.', features: ['Damla Kampanya Tasarımı', 'Davranışsal Tetikleyiciler', 'Segmentasyon Stratejisi', 'A/B Test Çerçeveleri', 'E-posta Şablon Tasarımı', 'Teslimat Optimizasyonu'], benefits: ['En yüksek pazarlama ROI', 'Ölçeklenebilir kişiselleştirme', 'Otomatik besleme'] },
      { serviceId: emailMarketing.id, locale: 'de', name: 'E-Mail-Marketing-Automatisierung', shortDescription: 'Erstellen Sie automatisierte E-Mail-Kampagnen, die Leads pflegen und Kunden binden.', fullDescription: 'E-Mail bleibt der Marketingkanal mit dem höchsten ROI. Wir entwerfen und implementieren E-Mail-Marketing-Automatisierung, die Ergebnisse liefert.', features: ['Drip-Kampagnen-Design', 'Verhaltensbasierte Trigger', 'Segmentierungsstrategie', 'A/B-Test-Frameworks', 'E-Mail-Template-Design', 'Zustellbarkeitsoptimierung'], benefits: ['Höchster Marketing-ROI', 'Skalierbare Personalisierung', 'Automatisierte Pflege'] },
      { serviceId: emailMarketing.id, locale: 'ar', name: 'أتمتة التسويق عبر البريد الإلكتروني', shortDescription: 'أنشئ حملات بريد إلكتروني آلية تغذي العملاء المحتملين وتحتفظ بالعملاء.', fullDescription: 'يظل البريد الإلكتروني قناة التسويق ذات أعلى عائد على الاستثمار. نصمم وننفذ أتمتة التسويق عبر البريد الإلكتروني التي تحقق نتائج.', features: ['تصميم حملات التنقيط', 'المحفزات السلوكية', 'استراتيجية التجزئة', 'أطر اختبار A/B', 'تصميم قوالب البريد', 'تحسين إمكانية التسليم'], benefits: ['أعلى عائد تسويقي', 'تخصيص قابل للتطوير', 'رعاية آلية'] },
      { serviceId: emailMarketing.id, locale: 'ur', name: 'ای میل مارکیٹنگ آٹومیشن', shortDescription: 'خودکار ای میل مہمات بنائیں جو لیڈز کو پروان چڑھاتی اور کسٹمرز کو برقرار رکھتی ہیں۔', fullDescription: 'ای میل سب سے زیادہ ROI والا مارکیٹنگ چینل ہے۔ ہم نتائج دینے والی ای میل مارکیٹنگ آٹومیشن ڈیزائن اور نافذ کرتے ہیں۔', features: ['ڈرپ کیمپین ڈیزائن', 'بیہیویئرل ٹرگرز', 'سیگمینٹیشن اسٹریٹجی', 'A/B ٹیسٹنگ فریم ورکس', 'ای میل ٹیمپلیٹ ڈیزائن', 'ڈیلیوریبلٹی آپٹیمائزیشن'], benefits: ['سب سے زیادہ مارکیٹنگ ROI', 'قابل توسیع پرسنلائزیشن', 'خودکار نرچرنگ'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for email-marketing-automation');
  }

  // IoT Development Translations
  const iotDev = await prisma.service.findUnique({ where: { slug: 'iot-development' } });
  if (iotDev) {
    const translations = [
      { serviceId: iotDev.id, locale: 'tr', name: 'IoT Geliştirme', shortDescription: 'IoT sensörleri, geçitler ve bulut platformlarıyla akıllı, bağlantılı ürünler oluşturun.', fullDescription: 'Nesnelerin İnterneti fiziksel cihazları dijital sistemlere bağlar. Sensör entegrasyonundan bulut platformlarına kadar IoT çözümleri geliştiriyoruz.', features: ['Sensör Entegrasyonu', 'Edge Computing', 'IoT Gateway Geliştirme', 'Bulut Platform Entegrasyonu'], benefits: ['Fiziksel ve dijital dünyaları bağlayın', 'Gerçek zamanlı izleme', 'Öngörücü bakım'] },
      { serviceId: iotDev.id, locale: 'de', name: 'IoT-Entwicklung', shortDescription: 'Erstellen Sie smarte, vernetzte Produkte mit IoT-Sensoren und Cloud-Plattformen.', fullDescription: 'Das Internet der Dinge verbindet physische Geräte mit digitalen Systemen.', features: ['Sensor-Integration', 'Edge Computing', 'IoT-Gateway-Entwicklung', 'Cloud-Platform-Integration'], benefits: ['Physische und digitale Welten verbinden', 'Echtzeit-Überwachung', 'Vorausschauende Wartung'] },
      { serviceId: iotDev.id, locale: 'ar', name: 'تطوير إنترنت الأشياء', shortDescription: 'أنشئ منتجات ذكية متصلة باستخدام أجهزة استشعار IoT والمنصات السحابية.', fullDescription: 'يربط إنترنت الأشياء الأجهزة المادية بالأنظمة الرقمية.', features: ['تكامل أجهزة الاستشعار', 'الحوسبة الطرفية', 'تطوير بوابة IoT', 'تكامل المنصة السحابية'], benefits: ['ربط العوالم المادية والرقمية', 'مراقبة في الوقت الحقيقي', 'الصيانة التنبؤية'] },
      { serviceId: iotDev.id, locale: 'ur', name: 'IoT ڈیولپمنٹ', shortDescription: 'IoT سینسرز اور کلاؤڈ پلیٹ فارمز کے ساتھ سمارٹ، منسلک مصنوعات بنائیں۔', fullDescription: 'انٹرنیٹ آف تھنگز فزیکل ڈیوائسز کو ڈیجیٹل سسٹمز سے جوڑتا ہے۔', features: ['سینسر انٹیگریشن', 'ایج کمپیوٹنگ', 'IoT گیٹ وے ڈیولپمنٹ', 'کلاؤڈ پلیٹ فارم انٹیگریشن'], benefits: ['فزیکل اور ڈیجیٹل دنیاؤں کو جوڑیں', 'ریئل ٹائم مانیٹرنگ', 'پیش گوئی مینٹیننس'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for iot-development');
  }

  // Desktop Application Development Translations
  const desktopDev = await prisma.service.findUnique({ where: { slug: 'desktop-application-development' } });
  if (desktopDev) {
    const translations = [
      { serviceId: desktopDev.id, locale: 'tr', name: 'Masaüstü Uygulama Geliştirme', shortDescription: 'Electron, Tauri veya yerel çerçevelerle platformlar arası masaüstü uygulamaları oluşturun.', fullDescription: 'Masaüstü uygulamaları web uygulamalarının sağlayamayacağı performans sunar.', features: ['Platformlar Arası Geliştirme', 'Yerel Performans', 'Sistem Entegrasyonu', 'Çevrimdışı İşlevsellik'], benefits: ['Tam sistem erişimi', 'Çevrimdışı öncelikli yetenek', 'Web\'den daha iyi performans'] },
      { serviceId: desktopDev.id, locale: 'de', name: 'Desktop-Anwendungsentwicklung', shortDescription: 'Erstellen Sie plattformübergreifende Desktop-Apps mit Electron, Tauri oder nativen Frameworks.', fullDescription: 'Desktop-Anwendungen bieten Leistung, die Web-Apps nicht erreichen können.', features: ['Plattformübergreifende Entwicklung', 'Native Leistung', 'Systemintegration', 'Offline-Funktionalität'], benefits: ['Voller Systemzugriff', 'Offline-first Fähigkeit', 'Bessere Leistung als Web'] },
      { serviceId: desktopDev.id, locale: 'ar', name: 'تطوير تطبيقات سطح المكتب', shortDescription: 'أنشئ تطبيقات سطح مكتب عبر المنصات باستخدام Electron أو Tauri.', fullDescription: 'تقدم تطبيقات سطح المكتب أداءً لا يمكن لتطبيقات الويب مطابقته.', features: ['التطوير عبر المنصات', 'الأداء الأصلي', 'تكامل النظام', 'وظائف بدون اتصال'], benefits: ['وصول كامل للنظام', 'قدرة أوفلاين أولاً', 'أداء أفضل من الويب'] },
      { serviceId: desktopDev.id, locale: 'ur', name: 'ڈیسک ٹاپ ایپلیکیشن ڈیولپمنٹ', shortDescription: 'Electron، Tauri یا نیٹو فریم ورکس کے ساتھ کراس پلیٹ فارم ڈیسک ٹاپ ایپس بنائیں۔', fullDescription: 'ڈیسک ٹاپ ایپلیکیشنز ایسی کارکردگی پیش کرتی ہیں جو ویب ایپس نہیں کر سکتیں۔', features: ['کراس پلیٹ فارم ڈیولپمنٹ', 'نیٹو پرفارمنس', 'سسٹم انٹیگریشن', 'آف لائن فنکشنلٹی'], benefits: ['مکمل سسٹم رسائی', 'آف لائن فرسٹ قابلیت', 'ویب سے بہتر پرفارمنس'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for desktop-application-development');
  }

  // Legacy System Modernization Translations
  const legacyMod = await prisma.service.findUnique({ where: { slug: 'legacy-system-modernization' } });
  if (legacyMod) {
    const translations = [
      { serviceId: legacyMod.id, locale: 'tr', name: 'Eski Sistem Modernizasyonu', shortDescription: 'Eski uygulamaları güncel mimari ve bulut geçişiyle modernize edin.', fullDescription: 'Eski sistemler değerli iş mantığı barındırır ama bakımı zorlaşır.', features: ['Uygulama Değerlendirmesi', 'Kademeli Modernizasyon', 'Bulut Göçü', 'API Sarmalama'], benefits: ['Azaltılmış bakım maliyetleri', 'İyileştirilmiş performans', 'Daha iyi geliştirici deneyimi'] },
      { serviceId: legacyMod.id, locale: 'de', name: 'Legacy-System-Modernisierung', shortDescription: 'Modernisieren Sie Legacy-Anwendungen mit aktualisierter Architektur und Cloud-Migration.', fullDescription: 'Legacy-Systeme enthalten wertvolle Geschäftslogik, werden aber schwer zu warten.', features: ['Anwendungsbewertung', 'Inkrementelle Modernisierung', 'Cloud-Migration', 'API-Wrapping'], benefits: ['Reduzierte Wartungskosten', 'Verbesserte Leistung', 'Bessere Entwicklererfahrung'] },
      { serviceId: legacyMod.id, locale: 'ar', name: 'تحديث الأنظمة القديمة', shortDescription: 'حدّث التطبيقات القديمة ببنية محدثة وترحيل سحابي.', fullDescription: 'تحتوي الأنظمة القديمة على منطق أعمال قيم لكن صيانتها تصبح صعبة.', features: ['تقييم التطبيق', 'التحديث التدريجي', 'الترحيل السحابي', 'تغليف API'], benefits: ['تقليل تكاليف الصيانة', 'تحسين الأداء', 'تجربة مطور أفضل'] },
      { serviceId: legacyMod.id, locale: 'ur', name: 'لیگیسی سسٹم ماڈرنائزیشن', shortDescription: 'لیگیسی ایپلیکیشنز کو اپڈیٹڈ آرکیٹیکچر اور کلاؤڈ مائیگریشن سے ماڈرنائز کریں۔', fullDescription: 'لیگیسی سسٹمز قیمتی بزنس لاجک رکھتے ہیں لیکن مینٹین کرنا مشکل ہو جاتا ہے۔', features: ['ایپلیکیشن اسیسمنٹ', 'انکریمینٹل ماڈرنائزیشن', 'کلاؤڈ مائیگریشن', 'API ریپنگ'], benefits: ['کم مینٹیننس لاگت', 'بہتر پرفارمنس', 'بہتر ڈیولپر تجربہ'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for legacy-system-modernization');
  }

  // Identity & Access Management Translations
  const iamDev = await prisma.service.findUnique({ where: { slug: 'identity-access-management' } });
  if (iamDev) {
    const translations = [
      { serviceId: iamDev.id, locale: 'tr', name: 'Kimlik ve Erişim Yönetimi', shortDescription: 'SSO, MFA, RBAC ve kimlik federasyonu ile sağlam IAM çözümleri oluşturun.', fullDescription: 'Kimlik ve Erişim Yönetimi uygulama güvenliğinin temelidir.', features: ['Tek Oturum Açma (SSO)', 'Çok Faktörlü Kimlik Doğrulama', 'Rol Tabanlı Erişim Kontrolü'], benefits: ['Gelişmiş güvenlik duruşu', 'Basitleştirilmiş kullanıcı deneyimi', 'Merkezi erişim kontrolü'] },
      { serviceId: iamDev.id, locale: 'de', name: 'Identitäts- und Zugriffsmanagement', shortDescription: 'Erstellen Sie robuste IAM-Lösungen mit SSO, MFA, RBAC und Identitätsföderation.', fullDescription: 'Identitäts- und Zugriffsmanagement ist die Grundlage der Anwendungssicherheit.', features: ['Single Sign-On (SSO)', 'Multi-Faktor-Authentifizierung', 'Rollenbasierte Zugriffskontrolle'], benefits: ['Verbesserte Sicherheitslage', 'Vereinfachte Benutzererfahrung', 'Zentralisierte Zugriffskontrolle'] },
      { serviceId: iamDev.id, locale: 'ar', name: 'إدارة الهوية والوصول', shortDescription: 'أنشئ حلول IAM قوية مع SSO و MFA و RBAC واتحاد الهوية.', fullDescription: 'إدارة الهوية والوصول هي أساس أمان التطبيقات.', features: ['تسجيل دخول موحد (SSO)', 'مصادقة متعددة العوامل', 'التحكم في الوصول القائم على الأدوار'], benefits: ['موقف أمني محسن', 'تجربة مستخدم مبسطة', 'تحكم مركزي في الوصول'] },
      { serviceId: iamDev.id, locale: 'ur', name: 'آئیڈینٹٹی اینڈ ایکسیس مینجمنٹ', shortDescription: 'SSO، MFA، RBAC اور آئیڈینٹٹی فیڈریشن کے ساتھ مضبوط IAM سلوشنز بنائیں۔', fullDescription: 'آئیڈینٹٹی اینڈ ایکسیس مینجمنٹ ایپلیکیشن سیکیورٹی کی بنیاد ہے۔', features: ['سنگل سائن آن (SSO)', 'ملٹی فیکٹر اتھینٹیکیشن', 'رول بیسڈ ایکسیس کنٹرول'], benefits: ['بہتر سیکیورٹی پوزیشن', 'آسان صارف تجربہ', 'مرکزی ایکسیس کنٹرول'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for identity-access-management');
  }

  // Business Intelligence Solutions Translations
  const biSolutions = await prisma.service.findUnique({ where: { slug: 'business-intelligence-solutions' } });
  if (biSolutions) {
    const translations = [
      { serviceId: biSolutions.id, locale: 'tr', name: 'İş Zekası Çözümleri', shortDescription: 'Etkileşimli gösterge panelleri, KPI takibi ve self-servis analitikle BI platformları oluşturun.', fullDescription: 'İş Zekası verilerinizi rekabet avantajına dönüştürür.', features: ['Veri Ambarı Tasarımı', 'ETL Pipeline Geliştirme', 'Gösterge Paneli Geliştirme'], benefits: ['Veri odaklı kararlar', 'Gerçek zamanlı görünürlük', 'Trendleri erken tespit'] },
      { serviceId: biSolutions.id, locale: 'de', name: 'Business Intelligence Lösungen', shortDescription: 'Erstellen Sie BI-Plattformen mit interaktiven Dashboards und Self-Service-Analytics.', fullDescription: 'Business Intelligence verwandelt Ihre Daten in Wettbewerbsvorteile.', features: ['Data Warehouse Design', 'ETL-Pipeline-Entwicklung', 'Dashboard-Entwicklung'], benefits: ['Datengestützte Entscheidungen', 'Echtzeit-Transparenz', 'Trends früh erkennen'] },
      { serviceId: biSolutions.id, locale: 'ar', name: 'حلول ذكاء الأعمال', shortDescription: 'أنشئ منصات BI مع لوحات معلومات تفاعلية وتحليلات الخدمة الذاتية.', fullDescription: 'يحول ذكاء الأعمال بياناتك إلى ميزة تنافسية.', features: ['تصميم مستودع البيانات', 'تطوير خط أنابيب ETL', 'تطوير لوحات المعلومات'], benefits: ['قرارات قائمة على البيانات', 'رؤية في الوقت الحقيقي', 'تحديد الاتجاهات مبكراً'] },
      { serviceId: biSolutions.id, locale: 'ur', name: 'بزنس انٹیلیجنس سلوشنز', shortDescription: 'انٹرایکٹو ڈیش بورڈز اور سیلف سروس اینالیٹکس کے ساتھ BI پلیٹ فارمز بنائیں۔', fullDescription: 'بزنس انٹیلیجنس آپ کے ڈیٹا کو مسابقتی فائدے میں بدلتا ہے۔', features: ['ڈیٹا ویئر ہاؤس ڈیزائن', 'ETL پائپ لائن ڈیولپمنٹ', 'ڈیش بورڈ ڈیولپمنٹ'], benefits: ['ڈیٹا پر مبنی فیصلے', 'ریئل ٹائم ویزیبلٹی', 'رجحانات جلدی پہچانیں'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for business-intelligence-solutions');
  }

  // MLOps & Model Deployment Translations
  const mlopsDev = await prisma.service.findUnique({ where: { slug: 'mlops-model-deployment' } });
  if (mlopsDev) {
    const translations = [
      { serviceId: mlopsDev.id, locale: 'tr', name: 'MLOps ve Model Dağıtımı', shortDescription: 'İzleme ve otomasyonla ML modellerini prodüksiyonda dağıtın ve yönetin.', fullDescription: 'ML modellerini prodüksiyona almak onları oluşturmaktan daha zordur.', features: ['Model Eğitim Pipeline\'ları', 'Deney Takibi', 'Model Kayıt Defteri'], benefits: ['Daha hızlı model dağıtımı', 'Tekrarlanabilir deneyler', 'Güvenilir model sunumu'] },
      { serviceId: mlopsDev.id, locale: 'de', name: 'MLOps & Modell-Deployment', shortDescription: 'Deployen und verwalten Sie ML-Modelle in Produktion mit Monitoring und Automatisierung.', fullDescription: 'ML-Modelle in Produktion zu bringen ist schwieriger als sie zu bauen.', features: ['Modell-Training-Pipelines', 'Experiment-Tracking', 'Modell-Registry'], benefits: ['Schnelleres Modell-Deployment', 'Reproduzierbare Experimente', 'Zuverlässiges Modell-Serving'] },
      { serviceId: mlopsDev.id, locale: 'ar', name: 'MLOps ونشر النماذج', shortDescription: 'انشر وأدر نماذج ML في الإنتاج مع المراقبة والأتمتة.', fullDescription: 'إيصال نماذج ML للإنتاج أصعب من بنائها.', features: ['خطوط أنابيب تدريب النماذج', 'تتبع التجارب', 'سجل النماذج'], benefits: ['نشر نماذج أسرع', 'تجارب قابلة للتكرار', 'خدمة نماذج موثوقة'] },
      { serviceId: mlopsDev.id, locale: 'ur', name: 'MLOps اور ماڈل ڈیپلائمنٹ', shortDescription: 'مانیٹرنگ اور آٹومیشن کے ساتھ پروڈکشن میں ML ماڈلز ڈیپلائی اور مینج کریں۔', fullDescription: 'ML ماڈلز کو پروڈکشن میں لانا ان کو بنانے سے مشکل ہے۔', features: ['ماڈل ٹریننگ پائپ لائنز', 'ایکسپیریمنٹ ٹریکنگ', 'ماڈل رجسٹری'], benefits: ['تیز ماڈل ڈیپلائمنٹ', 'دوبارہ قابل تولید تجربات', 'قابل اعتماد ماڈل سرونگ'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for mlops-model-deployment');
  }

  // Computer Vision Solutions Translations
  const cvSolutions = await prisma.service.findUnique({ where: { slug: 'computer-vision-solutions' } });
  if (cvSolutions) {
    const translations = [
      { serviceId: cvSolutions.id, locale: 'tr', name: 'Bilgisayarlı Görme Çözümleri', shortDescription: 'Görüntü tanıma, nesne algılama, OCR ve video analitiği uygulayın.', fullDescription: 'Bilgisayarlı görme makinelerin görsel içeriği anlamasını sağlar.', features: ['Nesne Algılama', 'Görüntü Sınıflandırma', 'Yüz Tanıma', 'OCR ve Belge İşleme'], benefits: ['Görsel denetimi otomatikleştirin', 'Belgeleri ölçekte işleyin', 'Yeni kullanıcı deneyimleri'] },
      { serviceId: cvSolutions.id, locale: 'de', name: 'Computer Vision Lösungen', shortDescription: 'Implementieren Sie Bilderkennung, Objekterkennung, OCR und Videoanalyse.', fullDescription: 'Computer Vision ermöglicht Maschinen, visuelle Inhalte zu verstehen.', features: ['Objekterkennung', 'Bildklassifizierung', 'Gesichtserkennung', 'OCR & Dokumentenverarbeitung'], benefits: ['Visuelle Inspektion automatisieren', 'Dokumente im großen Maßstab verarbeiten', 'Neue Benutzererfahrungen'] },
      { serviceId: cvSolutions.id, locale: 'ar', name: 'حلول الرؤية الحاسوبية', shortDescription: 'نفذ التعرف على الصور واكتشاف الكائنات و OCR وتحليل الفيديو.', fullDescription: 'تمكن الرؤية الحاسوبية الآلات من فهم المحتوى المرئي.', features: ['اكتشاف الكائنات', 'تصنيف الصور', 'التعرف على الوجوه', 'OCR ومعالجة المستندات'], benefits: ['أتمتة الفحص البصري', 'معالجة المستندات على نطاق واسع', 'تجارب مستخدم جديدة'] },
      { serviceId: cvSolutions.id, locale: 'ur', name: 'کمپیوٹر ویژن سلوشنز', shortDescription: 'امیج ریکگنیشن، آبجیکٹ ڈیٹیکشن، OCR اور ویڈیو اینالیٹکس نافذ کریں۔', fullDescription: 'کمپیوٹر ویژن مشینوں کو بصری مواد سمجھنے کے قابل بناتا ہے۔', features: ['آبجیکٹ ڈیٹیکشن', 'امیج کلاسیفیکیشن', 'فیشل ریکگنیشن', 'OCR اور ڈاکیومنٹ پروسیسنگ'], benefits: ['بصری معائنہ خودکار کریں', 'دستاویزات بڑے پیمانے پر پروسیس کریں', 'نئے صارف تجربات'] },
    ];
    for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription, features: t.features, benefits: t.benefits }, create: t as any }); }
    console.log('Seeded translations for computer-vision-solutions');
  }

  // Remaining services translations (compact)
  const remainingServices = [
    { slug: 'recommendation-systems', tr: 'Öneri Sistemleri', de: 'Empfehlungssysteme', ar: 'أنظمة التوصية', ur: 'ریکمنڈیشن سسٹمز' },
    { slug: 'fraud-detection-systems', tr: 'Dolandırıcılık Tespit Sistemleri', de: 'Betrugserkennung', ar: 'أنظمة كشف الاحتيال', ur: 'فراڈ ڈیٹیکشن سسٹمز' },
    { slug: 'performance-testing-optimization', tr: 'Performans Testi ve Optimizasyon', de: 'Leistungstest & Optimierung', ar: 'اختبار الأداء والتحسين', ur: 'پرفارمنس ٹیسٹنگ اور آپٹیمائزیشن' },
    { slug: 'accessibility-compliance', tr: 'Erişilebilirlik Uyumluluğu', de: 'Barrierefreiheit', ar: 'امتثال إمكانية الوصول', ur: 'ایکسیسیبلٹی کمپلائنس' },
    { slug: 'cloud-cost-optimization', tr: 'Bulut Maliyet Optimizasyonu', de: 'Cloud-Kostenoptimierung', ar: 'تحسين تكلفة السحابة', ur: 'کلاؤڈ کاسٹ آپٹیمائزیشن' },
    { slug: 'disaster-recovery-planning', tr: 'Felaket Kurtarma Planlaması', de: 'Disaster Recovery Planung', ar: 'تخطيط التعافي من الكوارث', ur: 'ڈیزاسٹر ریکوری پلاننگ' },
    { slug: 'booking-reservation-systems', tr: 'Rezervasyon Sistemleri', de: 'Buchungssysteme', ar: 'أنظمة الحجز', ur: 'بکنگ ریزرویشن سسٹمز' },
    { slug: 'learning-management-systems', tr: 'Öğrenme Yönetim Sistemleri', de: 'Lernmanagement-Systeme', ar: 'أنظمة إدارة التعلم', ur: 'لرننگ مینجمنٹ سسٹمز' },
    { slug: 'telemedicine-platforms', tr: 'Telemedicine Platformları', de: 'Telemedizin-Plattformen', ar: 'منصات التطبيب عن بعد', ur: 'ٹیلی میڈیسن پلیٹ فارمز' },
    { slug: 'inventory-management-systems', tr: 'Envanter Yönetim Sistemleri', de: 'Bestandsverwaltung', ar: 'أنظمة إدارة المخزون', ur: 'انوینٹری مینجمنٹ سسٹمز' },
    { slug: 'social-media-integration', tr: 'Sosyal Medya Entegrasyonu', de: 'Social Media Integration', ar: 'تكامل وسائل التواصل الاجتماعي', ur: 'سوشل میڈیا انٹیگریشن' },
    { slug: 'affiliate-marketing-systems', tr: 'Satış Ortaklığı Sistemleri', de: 'Affiliate-Marketing-Systeme', ar: 'أنظمة التسويق بالعمولة', ur: 'ایفیلیٹ مارکیٹنگ سسٹمز' },
    { slug: 'technical-documentation', tr: 'Teknik Dokümantasyon', de: 'Technische Dokumentation', ar: 'التوثيق التقني', ur: 'ٹیکنیکل ڈاکیومینٹیشن' },
    { slug: 'code-review-refactoring', tr: 'Kod İnceleme ve Yeniden Düzenleme', de: 'Code Review & Refactoring', ar: 'مراجعة الكود وإعادة الهيكلة', ur: 'کوڈ ریویو اور ری فیکٹرنگ' },
    { slug: 'multi-tenant-saas-architecture', tr: 'Çoklu Kiracı SaaS Mimarisi', de: 'Multi-Tenant SaaS-Architektur', ar: 'بنية SaaS متعددة المستأجرين', ur: 'ملٹی ٹیننٹ SaaS آرکیٹیکچر' },
    { slug: 'event-driven-architecture', tr: 'Olay Odaklı Mimari', de: 'Event-Driven Architecture', ar: 'البنية الموجهة بالأحداث', ur: 'ایونٹ ڈریون آرکیٹیکچر' },
    { slug: 'headless-commerce', tr: 'Headless E-Ticaret', de: 'Headless Commerce', ar: 'التجارة بدون واجهة', ur: 'ہیڈلیس کامرس' },
    { slug: 'api-rate-limiting-throttling', tr: 'API Hız Sınırlama', de: 'API Rate Limiting', ar: 'تحديد معدل API', ur: 'API ریٹ لمیٹنگ' },
  ];

  for (const svc of remainingServices) {
    const service = await prisma.service.findUnique({ where: { slug: svc.slug } });
    if (service) {
      const translations = [
        { serviceId: service.id, locale: 'tr', name: svc.tr, shortDescription: `${svc.tr} hizmetleri.`, fullDescription: `${svc.tr} için profesyonel çözümler.`, features: [], benefits: [] },
        { serviceId: service.id, locale: 'de', name: svc.de, shortDescription: `${svc.de} Dienstleistungen.`, fullDescription: `Professionelle ${svc.de} Lösungen.`, features: [], benefits: [] },
        { serviceId: service.id, locale: 'ar', name: svc.ar, shortDescription: `خدمات ${svc.ar}.`, fullDescription: `حلول ${svc.ar} احترافية.`, features: [], benefits: [] },
        { serviceId: service.id, locale: 'ur', name: svc.ur, shortDescription: `${svc.ur} خدمات۔`, fullDescription: `پیشہ ورانہ ${svc.ur} حل۔`, features: [], benefits: [] },
      ];
      for (const t of translations) { await prisma.serviceTranslation.upsert({ where: { serviceId_locale: { serviceId: t.serviceId, locale: t.locale } }, update: { name: t.name, shortDescription: t.shortDescription, fullDescription: t.fullDescription }, create: t as any }); }
      console.log(`Seeded translations for ${svc.slug}`);
    }
  }

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
