import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { prisma } from '../src/lib/db/prisma';

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Please provide a path to the JSON file. Example: npm run seed-faq-manual data/faqs/batch1.json');
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), args[0]);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  let data;
  try {
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error('Invalid JSON file.');
    process.exit(1);
  }

  console.log(`--- Processing FAQ batch file: ${path.basename(filePath)} ---`);

  for (const [slug, localesData] of Object.entries(data)) {
    console.log(`Adding FAQs to ${slug}...`);
    
    // Find the parent service
    const service = await prisma.service.findUnique({
      where: { slug }
    });

    if (!service) {
      console.warn(`Service ${slug} not found in database! Skipping...`);
      continue;
    }

    // Process each locale
    for (const [locale, faqs] of Object.entries(localesData as any)) {
      const translation = await prisma.serviceTranslation.findUnique({
        where: {
          serviceId_locale: {
            serviceId: service.id,
            locale: locale,
          }
        }
      });

      if (!translation) {
        console.warn(`Translation for ${slug} (${locale}) not found! Skipping...`);
        continue;
      }

      // Parse existing content
      let content = translation.content as Record<string, any> || {};
      
      // Ensure faq array exists
      if (!Array.isArray(content.faq)) {
        content.faq = [];
      }

      // We have new FAQs to append. 
      // To ensure idempotency, we can check if the question already exists, or just append
      const existingQuestions = new Set(content.faq.map((q: any) => q.question));
      
      for (const newFaq of (faqs as any[])) {
        if (!existingQuestions.has(newFaq.question)) {
          content.faq.push(newFaq);
        }
      }

      // Update the translation
      await prisma.serviceTranslation.update({
        where: { id: translation.id },
        data: { content }
      });
    }

    console.log(`Successfully added FAQs for ${slug}.`);
  }

  console.log('--- Completed seeding FAQs ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
