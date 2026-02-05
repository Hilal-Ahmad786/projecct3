/**
 * List all unique features, benefits, and process steps
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

async function listUniqueContent() {
  const services = await prisma.service.findMany({
    where: { status: { in: ['published', 'active'] } },
    select: { features: true, benefits: true, content: true }
  });

  const allFeatures = new Set<string>();
  const allBenefits = new Set<string>();
  const allProcessTitles = new Set<string>();
  const allFAQQuestions = new Set<string>();

  for (const s of services) {
    (s.features || []).forEach(f => allFeatures.add(f));
    (s.benefits || []).forEach(b => allBenefits.add(b));
    const content = s.content as any;
    if (content?.process) {
      content.process.forEach((p: any) => allProcessTitles.add(p.title));
    }
    if (content?.faq) {
      content.faq.forEach((f: any) => allFAQQuestions.add(f.question));
    }
  }

  console.log(`=== UNIQUE CONTENT SUMMARY ===`);
  console.log(`Unique features: ${allFeatures.size}`);
  console.log(`Unique benefits: ${allBenefits.size}`);
  console.log(`Unique process titles: ${allProcessTitles.size}`);
  console.log(`Unique FAQ questions: ${allFAQQuestions.size}`);

  console.log(`\n=== SAMPLE FEATURES (first 30) ===`);
  Array.from(allFeatures).sort().slice(0, 30).forEach(f => console.log(f));

  console.log(`\n=== SAMPLE BENEFITS (first 30) ===`);
  Array.from(allBenefits).sort().slice(0, 30).forEach(b => console.log(b));

  console.log(`\n=== ALL PROCESS TITLES ===`);
  Array.from(allProcessTitles).sort().forEach(t => console.log(t));

  console.log(`\n=== SAMPLE FAQ QUESTIONS (first 30) ===`);
  Array.from(allFAQQuestions).sort().slice(0, 30).forEach(q => console.log(q));

  await prisma.$disconnect();
}

listUniqueContent();
