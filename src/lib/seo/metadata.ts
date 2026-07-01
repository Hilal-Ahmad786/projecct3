import { Metadata } from 'next';

import { SITE_URL as baseUrl } from '@/config/site';

// Service metadata configurations
export const serviceMetadata: Record<string, {
  title: string;
  description: string;
  keywords: string[];
}> = {
  'web-development': {
    title: 'Web Development Services | Next.js, React, TypeScript',
    description: 'Custom web development services using Next.js, React, and TypeScript. We build high-performance, SEO-optimized websites and web applications.',
    keywords: ['web development', 'Next.js', 'React', 'TypeScript', 'web applications', 'responsive design'],
  },
  'mobile-development': {
    title: 'Mobile App Development | React Native, Flutter, iOS, Android',
    description: 'Cross-platform and native mobile app development for iOS and Android. Build beautiful, high-performance apps with React Native or Flutter.',
    keywords: ['mobile app development', 'React Native', 'Flutter', 'iOS', 'Android', 'cross-platform'],
  },
  'ai-solutions': {
    title: 'AI Solutions | Machine Learning, NLP, Predictive Analytics',
    description: 'Custom AI solutions including machine learning models, natural language processing, and predictive analytics to transform your business.',
    keywords: ['AI solutions', 'artificial intelligence', 'machine learning', 'NLP', 'predictive analytics'],
  },
  'machine-learning': {
    title: 'Machine Learning Services | Custom ML Models, Deep Learning',
    description: 'Custom machine learning solutions from predictive models to deep learning neural networks. We build ML systems that drive real business outcomes.',
    keywords: ['machine learning', 'ML models', 'deep learning', 'neural networks', 'predictive modeling'],
  },
  'data-analytics': {
    title: 'Data Analytics Services | BI Dashboards, Data Visualization',
    description: 'Transform your data into actionable insights with business intelligence dashboards, data visualization, and advanced analytics solutions.',
    keywords: ['data analytics', 'business intelligence', 'BI dashboards', 'data visualization', 'analytics'],
  },
  'python-automation': {
    title: 'Python Automation Services | Workflow Automation, Scripting',
    description: 'Custom Python automation solutions for workflow optimization, web scraping, data processing, and business process automation.',
    keywords: ['Python automation', 'workflow automation', 'scripting', 'web scraping', 'process automation'],
  },
  'digital-marketing': {
    title: 'Digital Marketing Services | SEO, PPC, Social Media Marketing',
    description: 'Data-driven digital marketing services including SEO, PPC advertising, social media marketing, and content strategy.',
    keywords: ['digital marketing', 'SEO', 'PPC', 'social media marketing', 'content marketing'],
  },
  'ui-ux-design': {
    title: 'UI/UX Design Services | User Research, Prototyping, Design Systems',
    description: 'User-centered UI/UX design services including user research, wireframing, prototyping, and design system creation.',
    keywords: ['UI design', 'UX design', 'user experience', 'prototyping', 'design systems'],
  },
  'api-development': {
    title: 'API Development Services | REST, GraphQL, Microservices',
    description: 'Build robust, scalable APIs with REST, GraphQL, or microservices architecture. Secure, documented, and production-ready.',
    keywords: ['API development', 'REST API', 'GraphQL', 'microservices', 'API design'],
  },
  'e-commerce': {
    title: 'E-Commerce Solutions | Online Stores, Shopify, WooCommerce',
    description: 'Build powerful e-commerce platforms with Shopify, WooCommerce, or custom solutions. Payment integration, inventory management, and more.',
    keywords: ['e-commerce', 'online store', 'Shopify', 'WooCommerce', 'e-commerce development'],
  },
  'devops-cloud': {
    title: 'DevOps & Cloud Services | AWS, Azure, GCP, Kubernetes',
    description: 'Streamline development with DevOps practices and cloud infrastructure. CI/CD pipelines, Kubernetes, and cloud migration services.',
    keywords: ['DevOps', 'cloud services', 'AWS', 'Azure', 'GCP', 'Kubernetes', 'CI/CD'],
  },
  'cybersecurity': {
    title: 'Cybersecurity Services | Penetration Testing, Security Audits',
    description: 'Protect your digital assets with comprehensive cybersecurity services including penetration testing, security audits, and compliance.',
    keywords: ['cybersecurity', 'penetration testing', 'security audit', 'compliance', 'data security'],
  },
  'conversational-ai': {
    title: 'Conversational AI | Chatbots, Virtual Assistants, NLP',
    description: 'Build intelligent chatbots and virtual assistants powered by NLP and LLM technology. 24/7 customer support automation.',
    keywords: ['conversational AI', 'chatbots', 'virtual assistants', 'NLP', 'customer support AI'],
  },
  'prompt-engineering': {
    title: 'Prompt Engineering Services | LLM Optimization, AI Communication',
    description: 'Expert prompt engineering services to optimize LLM outputs. Design, test, and deploy prompts that deliver reliable, high-quality results.',
    keywords: ['prompt engineering', 'LLM optimization', 'GPT', 'Claude', 'AI prompts', 'prompt design'],
  },
  'ai-agents': {
    title: 'AI Agents Development | Autonomous AI, Multi-Agent Systems',
    description: 'Build autonomous AI agents that reason, plan, and execute complex tasks. Multi-agent orchestration and tool integration.',
    keywords: ['AI agents', 'autonomous AI', 'multi-agent systems', 'LangGraph', 'AutoGPT', 'CrewAI'],
  },
  'rag-solutions': {
    title: 'RAG Solutions | Enterprise Knowledge Bases, Semantic Search',
    description: 'Retrieval-Augmented Generation systems that leverage your data. Build intelligent knowledge bases with accurate, cited responses.',
    keywords: ['RAG', 'retrieval augmented generation', 'knowledge base', 'semantic search', 'vector database'],
  },
  'mlops-deployment': {
    title: 'MLOps & Deployment | ML Pipelines, Model Serving, Monitoring',
    description: 'Operationalize machine learning with MLOps pipelines, model serving infrastructure, and comprehensive monitoring systems.',
    keywords: ['MLOps', 'ML deployment', 'model serving', 'ML pipelines', 'model monitoring'],
  },
  'computer-vision': {
    title: 'Computer Vision Services | Object Detection, Image Recognition',
    description: 'Custom computer vision solutions including object detection, image classification, facial recognition, and video analytics.',
    keywords: ['computer vision', 'object detection', 'image recognition', 'facial recognition', 'video analytics'],
  },
  'llm-finetuning': {
    title: 'LLM Fine-tuning Services | Custom AI Models, Domain Adaptation',
    description: 'Fine-tune large language models on your domain data. Create specialized AI that understands your industry and requirements.',
    keywords: ['LLM fine-tuning', 'custom AI models', 'domain adaptation', 'LoRA', 'model training'],
  },
};

// Generate metadata for a service page
export function generateServiceMetadata(
  slug: string,
  locale: string = 'en'
): Metadata {
  const service = serviceMetadata[slug];

  if (!service) {
    return {
      title: 'Service | PakSoft',
      description: 'Professional digital services by PakSoft',
    };
  }

  const title = `${service.title} | PakSoft`;
  const url = `${baseUrl}/${locale}/services/${slug}`;

  return {
    title,
    description: service.description,
    keywords: service.keywords,
    openGraph: {
      title,
      description: service.description,
      url,
      siteName: 'PakSoft',
      locale: locale === 'en' ? 'en_US' : locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/services/${slug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: service.description,
      images: [`${baseUrl}/images/services/${slug}-og.jpg`],
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en/services/${slug}`,
        'tr': `${baseUrl}/tr/services/${slug}`,
        'de': `${baseUrl}/de/services/${slug}`,
        'ur': `${baseUrl}/ur/services/${slug}`,
        'ar': `${baseUrl}/ar/services/${slug}`,
      },
    },
  };
}

// Generate metadata for a generic page
export function generatePageMetadata(
  page: string,
  customMeta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  },
  locale: string = 'en'
): Metadata {
  const defaultMeta: Record<string, { title: string; description: string }> = {
    home: {
      title: 'PakSoft | Modern Digital Solutions',
      description: 'Enterprise web development, AI solutions, e-commerce, automation and digital marketing services.',
    },
    about: {
      title: 'About Us | PakSoft',
      description: 'Learn about PakSoft - a team of passionate technologists dedicated to creating exceptional digital experiences.',
    },
    services: {
      title: 'Services | PakSoft',
      description: 'Explore our comprehensive digital services including web development, AI solutions, mobile apps, and more.',
    },
    projects: {
      title: 'Projects | PakSoft',
      description: 'Explore our portfolio of successful digital solutions across various industries.',
    },
    blog: {
      title: 'Blog | PakSoft',
      description: 'Stay updated with the latest trends in technology, best practices, and insights from our team.',
    },
    contact: {
      title: 'Contact Us | PakSoft',
      description: 'Get in touch with PakSoft. We are here to help with your digital transformation needs.',
    },
  };

  const pageMeta = defaultMeta[page] || {
    title: 'PakSoft',
    description: 'Modern digital solutions by PakSoft',
  };

  const title = customMeta?.title || pageMeta.title;
  const description = customMeta?.description || pageMeta.description;
  const url = `${baseUrl}/${locale}${page === 'home' ? '' : `/${page}`}`;

  return {
    title,
    description,
    keywords: customMeta?.keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: 'PakSoft',
      locale: locale === 'en' ? 'en_US' : locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}
