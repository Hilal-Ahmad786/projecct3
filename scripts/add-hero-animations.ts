/**
 * Add advanced multi-layer animations to services missing them
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

// Animation configurations by service slug
const animationConfigs: Record<string, {
  heroVisual: string;
  bgPattern: string;
  decorations: string;
  motion: string;
  featureStyle: string;
  processLayout: string;
}> = {
  // AI & ML Services
  'ai-consulting-strategy': {
    heroVisual: 'brain-network',
    bgPattern: 'hexagons',
    decorations: 'circles',
    motion: 'pulse',
    featureStyle: 'gradient-border',
    processLayout: 'timeline'
  },
  'chatbot-development': {
    heroVisual: 'chat-bubbles',
    bgPattern: 'dots',
    decorations: 'circles',
    motion: 'float',
    featureStyle: 'icon-top',
    processLayout: 'cards'
  },
  'custom-ai-development': {
    heroVisual: 'brain-network',
    bgPattern: 'hexagons',
    decorations: 'mixed',
    motion: 'orbit',
    featureStyle: 'gradient-border',
    processLayout: 'timeline'
  },
  'nlp-text-processing': {
    heroVisual: 'code-editor',
    bgPattern: 'grid',
    decorations: 'dots',
    motion: 'type',
    featureStyle: 'icon-left',
    processLayout: 'cards'
  },

  // Mobile Development
  'android-development': {
    heroVisual: 'mobile-device',
    bgPattern: 'dots',
    decorations: 'squares',
    motion: 'float',
    featureStyle: 'icon-top',
    processLayout: 'timeline'
  },
  'ios-development': {
    heroVisual: 'mobile-device',
    bgPattern: 'circles',
    decorations: 'dots',
    motion: 'float',
    featureStyle: 'icon-top',
    processLayout: 'timeline'
  },

  // API & Backend Development
  'graphql-development': {
    heroVisual: 'network-nodes',
    bgPattern: 'hexagons',
    decorations: 'lines',
    motion: 'orbit',
    featureStyle: 'bordered',
    processLayout: 'cards'
  },
  'rest-api-development': {
    heroVisual: 'data-flow',
    bgPattern: 'grid',
    decorations: 'dots',
    motion: 'cascade',
    featureStyle: 'icon-left',
    processLayout: 'steps-horizontal'
  },
  'third-party-api-integration': {
    heroVisual: 'puzzle-pieces',
    bgPattern: 'dots',
    decorations: 'squares',
    motion: 'float',
    featureStyle: 'icon-top',
    processLayout: 'cards'
  },

  // SaaS & E-commerce
  'saas-development': {
    heroVisual: 'dashboard',
    bgPattern: 'grid',
    decorations: 'circles',
    motion: 'pulse',
    featureStyle: 'gradient-border',
    processLayout: 'timeline'
  },
  'e-commerce': {
    heroVisual: 'shopping-cart-3d',
    bgPattern: 'dots',
    decorations: 'circles',
    motion: 'float',
    featureStyle: 'icon-top',
    processLayout: 'cards'
  },
  'woocommerce-development': {
    heroVisual: 'shopping-cart-3d',
    bgPattern: 'grid',
    decorations: 'squares',
    motion: 'float',
    featureStyle: 'icon-left',
    processLayout: 'cards'
  },
  'marketplace-development': {
    heroVisual: 'layers-stack',
    bgPattern: 'hexagons',
    decorations: 'circles',
    motion: 'cascade',
    featureStyle: 'bordered',
    processLayout: 'timeline'
  },

  // Marketing & Advertising
  'digital-marketing': {
    heroVisual: 'megaphone-3d',
    bgPattern: 'waves',
    decorations: 'circles',
    motion: 'pulse',
    featureStyle: 'gradient-border',
    processLayout: 'cards'
  },
  'facebook-ads': {
    heroVisual: 'target-bullseye',
    bgPattern: 'circles',
    decorations: 'dots',
    motion: 'pulse',
    featureStyle: 'icon-top',
    processLayout: 'steps-horizontal'
  },
  'instagram-ads': {
    heroVisual: 'palette-canvas',
    bgPattern: 'dots',
    decorations: 'squares',
    motion: 'float',
    featureStyle: 'icon-top',
    processLayout: 'cards'
  },
  'google-search-ads': {
    heroVisual: 'target-bullseye',
    bgPattern: 'grid',
    decorations: 'circles',
    motion: 'pulse',
    featureStyle: 'numbered',
    processLayout: 'steps-horizontal'
  },
  'google-display-ads': {
    heroVisual: 'layers-stack',
    bgPattern: 'dots',
    decorations: 'squares',
    motion: 'cascade',
    featureStyle: 'icon-top',
    processLayout: 'cards'
  },
  'youtube-ads': {
    heroVisual: 'megaphone-3d',
    bgPattern: 'waves',
    decorations: 'triangles',
    motion: 'pulse',
    featureStyle: 'gradient-border',
    processLayout: 'timeline'
  },
  'influencer-marketing': {
    heroVisual: 'globe',
    bgPattern: 'circles',
    decorations: 'dots',
    motion: 'orbit',
    featureStyle: 'icon-top',
    processLayout: 'cards'
  },
  'social-media-management': {
    heroVisual: 'chat-bubbles',
    bgPattern: 'dots',
    decorations: 'circles',
    motion: 'float',
    featureStyle: 'icon-left',
    processLayout: 'cards'
  },
  'video-production-marketing': {
    heroVisual: 'palette-canvas',
    bgPattern: 'waves',
    decorations: 'triangles',
    motion: 'wave',
    featureStyle: 'bordered',
    processLayout: 'timeline'
  },

  // SEO & Content
  'link-building': {
    heroVisual: 'network-nodes',
    bgPattern: 'hexagons',
    decorations: 'lines',
    motion: 'orbit',
    featureStyle: 'icon-top',
    processLayout: 'steps-horizontal'
  },
  'local-seo': {
    heroVisual: 'globe',
    bgPattern: 'dots',
    decorations: 'circles',
    motion: 'pulse',
    featureStyle: 'numbered',
    processLayout: 'cards'
  },
  'technical-seo': {
    heroVisual: 'gear-system',
    bgPattern: 'grid',
    decorations: 'dots',
    motion: 'spin-slow',
    featureStyle: 'bordered',
    processLayout: 'timeline'
  },
  'blog-copywriting': {
    heroVisual: 'code-editor',
    bgPattern: 'dots',
    decorations: 'circles',
    motion: 'type',
    featureStyle: 'icon-left',
    processLayout: 'cards'
  },

  // Design & UX
  'ui-design': {
    heroVisual: 'palette-canvas',
    bgPattern: 'dots',
    decorations: 'squares',
    motion: 'float',
    featureStyle: 'gradient-border',
    processLayout: 'zigzag'
  },
  'ux-research': {
    heroVisual: 'microscope',
    bgPattern: 'circles',
    decorations: 'dots',
    motion: 'pulse',
    featureStyle: 'icon-top',
    processLayout: 'timeline'
  },
  'prototyping-wireframing': {
    heroVisual: 'layers-stack',
    bgPattern: 'grid',
    decorations: 'squares',
    motion: 'cascade',
    featureStyle: 'bordered',
    processLayout: 'cards'
  },
  'newsletter-design': {
    heroVisual: 'code-editor',
    bgPattern: 'dots',
    decorations: 'circles',
    motion: 'float',
    featureStyle: 'icon-top',
    processLayout: 'cards'
  },

  // DevOps & Cloud
  'devops-cloud': {
    heroVisual: 'cloud-stack',
    bgPattern: 'hexagons',
    decorations: 'circles',
    motion: 'float',
    featureStyle: 'gradient-border',
    processLayout: 'timeline'
  },
  'ci-cd-pipelines': {
    heroVisual: 'data-flow',
    bgPattern: 'grid',
    decorations: 'lines',
    motion: 'cascade',
    featureStyle: 'numbered',
    processLayout: 'steps-horizontal'
  },
  'docker-kubernetes': {
    heroVisual: 'layers-stack',
    bgPattern: 'hexagons',
    decorations: 'squares',
    motion: 'orbit',
    featureStyle: 'bordered',
    processLayout: 'cards'
  },
  'cloud-management': {
    heroVisual: 'cloud-stack',
    bgPattern: 'dots',
    decorations: 'circles',
    motion: 'float',
    featureStyle: 'icon-top',
    processLayout: 'timeline'
  },

  // Data & Analytics
  'big-data-etl': {
    heroVisual: 'data-flow',
    bgPattern: 'hexagons',
    decorations: 'dots',
    motion: 'cascade',
    featureStyle: 'bordered',
    processLayout: 'timeline'
  },
  'business-intelligence': {
    heroVisual: 'chart-graph',
    bgPattern: 'grid',
    decorations: 'circles',
    motion: 'pulse',
    featureStyle: 'gradient-border',
    processLayout: 'cards'
  },

  // Testing & Security
  'testing': {
    heroVisual: 'shield-lock',
    bgPattern: 'grid',
    decorations: 'dots',
    motion: 'pulse',
    featureStyle: 'numbered',
    processLayout: 'steps-horizontal'
  },
  'security-audits-compliance': {
    heroVisual: 'shield-lock',
    bgPattern: 'hexagons',
    decorations: 'circles',
    motion: 'pulse',
    featureStyle: 'bordered',
    processLayout: 'timeline'
  },

  // Email & Automation
  'email-automation': {
    heroVisual: 'data-flow',
    bgPattern: 'dots',
    decorations: 'circles',
    motion: 'cascade',
    featureStyle: 'icon-top',
    processLayout: 'cards'
  },
  'workflow-automation': {
    heroVisual: 'gear-system',
    bgPattern: 'hexagons',
    decorations: 'lines',
    motion: 'spin-slow',
    featureStyle: 'icon-left',
    processLayout: 'timeline'
  },

  // Web Scraping
  'web-scraping': {
    heroVisual: 'terminal',
    bgPattern: 'grid',
    decorations: 'dots',
    motion: 'type',
    featureStyle: 'bordered',
    processLayout: 'cards'
  },
};

async function addHeroAnimations() {
  console.log('🎨 Adding hero animations to services...\n');

  try {
    const services = await prisma.service.findMany({
      where: { status: { in: ['published', 'active'] } }
    });

    let updated = 0;
    let skipped = 0;

    for (const service of services) {
      const content = service.content as any || {};
      const hasAnimation = content.animation?.heroVisual;

      // Skip if already has animation
      if (hasAnimation) {
        skipped++;
        continue;
      }

      // Get animation config for this service
      const animConfig = animationConfigs[service.slug];

      if (animConfig) {
        // Update service with animation
        const newContent = {
          ...content,
          animation: animConfig
        };

        await prisma.service.update({
          where: { id: service.id },
          data: { content: newContent }
        });

        console.log(`✅ ${service.slug}: ${animConfig.heroVisual} + ${animConfig.bgPattern} + ${animConfig.motion}`);
        updated++;
      } else {
        console.log(`⚠️  ${service.slug}: No animation config defined`);
      }
    }

    console.log(`\n=== Summary ===`);
    console.log(`Updated: ${updated}`);
    console.log(`Skipped (already had): ${skipped}`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

addHeroAnimations();
