// Single source of truth for the service hierarchy.
// Used by the Navbar mega menu and the homepage ServicesSection so
// every published service stays reachable from both.

export type ServiceEntry = { slug: string; children?: string[] };

export const servicesByCategory: Record<string, ServiceEntry[]> = {
  web: [
    { slug: 'web-development', children: ['frontend-development', 'backend-development', 'full-stack-development', 'progressive-web-apps', 'headless-cms-development', 'jamstack-development', 'accessibility-compliance', 'blockchain-development', 'code-review-refactoring', 'desktop-application-development', 'real-time-applications'] },
    { slug: 'e-commerce', children: ['shopify-development', 'woocommerce-development', 'magento-development', 'custom-ecommerce', 'marketplace-development', 'b2b-ecommerce', 'headless-commerce', 'payment-gateway-integration'] },
    { slug: 'mobile-development', children: ['ios-development', 'android-development', 'flutter-development', 'react-native-development', 'cross-platform-apps', 'ar-development', 'unity-game-development', 'unreal-engine-development', 'vr-development', 'ar-experiences', 'virtual-tours'] },
    { slug: 'api-development', children: ['rest-api-development', 'graphql-development', 'third-party-api-integration', 'api-gateway', 'api-rate-limiting-throttling', 'api-security-authentication', 'event-driven-architecture', 'graphql-api-development', 'microservices-architecture', 'technical-documentation'] },
    { slug: 'saas-development', children: ['mvp-development', 'multi-tenant-architecture', 'saas-migration'] },
    { slug: 'wordpress-development', children: ['custom-wordpress-themes', 'wordpress-plugin-development', 'wordpress-optimization'] },
    { slug: 'enterprise-software', children: ['crm-development', 'erp-development', 'hrms-development', 'custom-business-software', 'booking-reservation-systems', 'inventory-management-systems', 'iot-development', 'learning-management-systems', 'legacy-system-modernization', 'multi-tenant-saas-architecture', 'telemedicine-platforms'] },
    { slug: 'web3-blockchain', children: ['smart-contracts', 'dapp-development', 'nft-marketplace', 'defi-solutions', 'tokenization', 'nft-marketplace-development', 'smart-contract-development'] },
    { slug: 'no-code-low-code', children: ['bubble-development', 'webflow-development', 'airtable-solutions', 'zapier-automation'] },
  ],
  ai: [
    { slug: 'ai-solutions', children: ['ai-consulting-strategy', 'custom-ai-development', 'ai-integration', 'ai-poc-mvp', 'ai-image-generation', 'computer-vision-solutions', 'fraud-detection-systems', 'mlops-model-deployment', 'natural-language-processing'] },
    { slug: 'machine-learning', children: ['predictive-analytics', 'nlp-text-processing', 'recommendation-systems', 'anomaly-detection', 'time-series-forecasting'] },
    { slug: 'conversational-ai', children: ['chatbot-development', 'voice-assistant-development', 'whatsapp-bots', 'customer-service-ai', 'ai-chatbot-integration'] },
    { slug: 'computer-vision', children: ['image-recognition', 'object-detection', 'video-analytics', 'ocr-document-processing'] },
    { slug: 'llm-finetuning' },
    { slug: 'prompt-engineering' },
    { slug: 'llm-services', children: ['gpt-claude-api-integration', 'custom-llm-development'] },
    { slug: 'ai-agents', children: ['autonomous-agents', 'multi-agent-systems', 'ai-workflow-automation'] },
    { slug: 'rag-solutions', children: ['knowledge-base-ai', 'document-qa', 'enterprise-search-ai'] },
    { slug: 'python-automation', children: ['web-scraping', 'workflow-automation', 'data-pipeline-automation', 'rpa-solutions'] },
  ],
  marketing: [
    { slug: 'digital-marketing', children: ['affiliate-marketing-systems', 'email-marketing-automation', 'social-media-integration'] },
    { slug: 'seo', children: ['technical-seo', 'local-seo', 'international-seo', 'link-building', 'ecommerce-seo', 'geo-ai-search-optimization', 'conversion-rate-optimization'] },
    { slug: 'google-ads', children: ['google-search-ads', 'google-display-ads', 'youtube-ads', 'google-shopping', 'performance-max'] },
    { slug: 'meta-ads', children: ['facebook-ads', 'instagram-ads', 'advantage-plus-campaigns'] },
    { slug: 'social-media-marketing', children: ['social-media-management', 'influencer-marketing', 'community-management', 'social-commerce'] },
    { slug: 'tiktok-marketing', children: ['tiktok-ads', 'tiktok-shop', 'tiktok-content'] },
    { slug: 'linkedin-marketing', children: ['linkedin-ads', 'linkedin-lead-gen', 'company-page-management'] },
    { slug: 'whatsapp-marketing', children: ['whatsapp-business-api', 'whatsapp-campaigns', 'whatsapp-commerce'] },
    { slug: 'email-marketing', children: ['email-automation', 'newsletter-design', 'email-deliverability'] },
    { slug: 'content-marketing', children: ['blog-copywriting', 'video-production-marketing', 'content-strategy', 'podcast-production', 'video-marketing'] },
    { slug: 'cro', children: ['ab-testing', 'landing-page-optimization', 'funnel-optimization', 'ux-analytics'] },
    { slug: 'marketing-automation', children: ['hubspot-implementation', 'salesforce-marketing-cloud', 'custom-marketing-automation'] },
    { slug: 'marketplace-ads', children: ['amazon-ppc', 'trendyol-ads', 'app-store-optimization'] },
  ],
  design: [
    { slug: 'ui-ux-design', children: ['ui-design', 'ux-research', 'prototyping-wireframing', 'design-systems', 'mobile-app-design'] },
    { slug: 'graphic-design', children: ['logo-brand-identity', 'print-packaging-design', 'social-media-graphics', 'presentation-design'] },
    { slug: 'motion-graphics', children: ['explainer-videos', 'social-animations', 'product-animations'] },
    { slug: 'web-design', children: ['corporate-website-design', 'landing-page-design', 'ecommerce-design'] },
    { slug: 'brand-strategy', children: ['brand-positioning', 'brand-guidelines', 'rebranding'] },
  ],
  infrastructure: [
    { slug: 'devops-cloud', children: ['ci-cd-pipelines', 'docker-kubernetes', 'cloud-management', 'infrastructure-as-code', 'cloud-cost-optimization', 'disaster-recovery-planning', 'kubernetes-orchestration', 'performance-testing-optimization', 'serverless-architecture', 'terraform-infrastructure'] },
    { slug: 'cybersecurity', children: ['penetration-testing', 'security-audits-compliance', 'gdpr-compliance', 'cybersecurity-auditing', 'identity-access-management'] },
    { slug: 'managed-services', children: ['continuous-monitoring', 'maintenance-support', 'disaster-recovery'] },
    { slug: 'data-analytics', children: ['business-intelligence', 'big-data-etl', 'data-visualization', 'real-time-analytics', 'business-intelligence-solutions', 'database-design-optimization', 'etl-pipelines'] },
    { slug: 'cloud-migration', children: ['aws-migration', 'azure-migration', 'google-cloud-migration'] },
    { slug: 'mlops-deployment', children: ['model-deployment', 'model-monitoring', 'ml-pipelines'] },
    { slug: 'database-services', children: ['database-design', 'database-optimization', 'database-migration'] },
    { slug: 'performance-optimization', children: ['website-speed-optimization', 'core-web-vitals', 'server-optimization'] },
  ],
  consulting: [
    { slug: 'digital-transformation', children: ['digital-strategy', 'process-digitization'] },
    { slug: 'technology-consulting', children: ['tech-stack-assessment', 'architecture-design'] },
    { slug: 'ai-strategy', children: ['ai-readiness-assessment', 'ai-roi-analysis'] },
    { slug: 'growth-strategy' },
    { slug: 'startup-services', children: ['startup-mvp-development', 'technical-cto'] },
    { slug: 'staff-augmentation', children: ['developer-outsourcing', 'dedicated-teams'] },
  ],
};

// Navbar mega-menu category keys map onto the same data
export const navCategoryMap: Record<string, string> = {
  webSoftware: 'web', aiData: 'ai', marketing: 'marketing',
  design: 'design', infrastructure: 'infrastructure', consulting: 'consulting',
};
