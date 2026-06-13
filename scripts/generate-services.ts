import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { prisma } from '../src/lib/db/prisma';

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY environment variable is not set.');
    console.error('Please add it to your .env.local file or export it before running this script.');
    process.exit(1);
  }

  const promptPath = path.join(process.cwd(), 'GEMINI-PROMPT.md');
  if (!fs.existsSync(promptPath)) {
    console.error(`Error: Could not find GEMINI-PROMPT.md at ${promptPath}`);
    process.exit(1);
  }

  const promptContent = fs.readFileSync(promptPath, 'utf8');

  // Extract the JSON block at the end that contains the services to write
  const jsonMatch = promptContent.match(/```json\s*([\s\S]*?)\s*```/g);
  if (!jsonMatch || jsonMatch.length < 2) {
    console.error('Could not find the target JSON array of services in GEMINI-PROMPT.md');
    process.exit(1);
  }

  // The last block is the services to write
  const servicesJsonStr = jsonMatch[jsonMatch.length - 1].replace(/```json|```/g, '').trim();
  let servicesToWrite: any[];
  try {
    servicesToWrite = JSON.parse(servicesJsonStr);
  } catch (err) {
    console.error('Failed to parse the target services JSON.', err);
    process.exit(1);
  }

  console.log(`Found ${servicesToWrite.length} services to process.`);

  // Process each service one by one
  for (const service of servicesToWrite) {
    console.log(`\n--- Processing service: ${service.slug} (${service.name}) ---`);

    const specificPrompt = `${promptContent}

IMPORTANT INSTRUCTIONS FOR THIS BATCH:
Please generate the JSON response ONLY for the following single service:
${JSON.stringify(service, null, 2)}

Output only valid JSON as specified.`;

    let success = false;
    let attempts = 0;
    while (!success && attempts < 5) {
      try {
        attempts++;
        console.log(`Calling Gemini API for ${service.slug} (Attempt ${attempts})...`);
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: specificPrompt }] }],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: "application/json"
            }
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error(`API Error for ${service.slug}: ${response.status} ${response.statusText}`);
          if (response.status === 429) {
             console.log('Rate limited. Waiting 60 seconds before retrying...');
             await new Promise(r => setTimeout(r, 60000));
             continue; // Retry
          } else {
             console.error(errText);
             break; // Break loop on non-429 error
          }
        }

        const responseData = await response.json();
        const generatedText = responseData.candidates[0].content.parts[0].text;
        
        let parsedData;
        try {
          parsedData = JSON.parse(generatedText);
        } catch (err) {
          console.error(`Failed to parse generated JSON for ${service.slug}. Skipping...`);
          console.error(generatedText);
          break;
        }

        const serviceData = parsedData[service.slug];
        if (!serviceData) {
          console.error(`Generated JSON did not contain the slug key '${service.slug}'. Keys found: ${Object.keys(parsedData).join(', ')}`);
          break;
        }

        console.log(`Saving ${service.slug} to the database...`);

        // Upsert the main English Service
        const en = serviceData['en'];
        if (!en) {
          console.error(`No English (en) data found for ${service.slug}. Skipping database upsert.`);
          break;
        }

        const upsertedService = await prisma.service.upsert({
          where: { slug: service.slug },
          update: {
            name: en.name,
            shortDescription: en.shortDescription,
            fullDescription: en.fullDescription,
            features: en.features || [],
            benefits: en.benefits || [],
            content: en.content as any,
            parentSlug: service.parent
          },
          create: {
            slug: service.slug,
            name: en.name,
            shortDescription: en.shortDescription,
            fullDescription: en.fullDescription,
            features: en.features || [],
            benefits: en.benefits || [],
            content: en.content as any,
            parentSlug: service.parent,
            status: 'published'
          }
        });

        // Upsert the translations
        const locales = ['en', 'tr', 'de', 'ur', 'ar'];
        for (const locale of locales) {
          const locData = serviceData[locale];
          if (!locData) continue;

          await prisma.serviceTranslation.upsert({
            where: {
              serviceId_locale: {
                serviceId: upsertedService.id,
                locale: locale
              }
            },
            update: {
              name: locData.name,
              shortDescription: locData.shortDescription,
              fullDescription: locData.fullDescription,
              features: locData.features || [],
              benefits: locData.benefits || [],
              content: locData.content as any,
              metaTitle: locData.metaTitle,
              metaDescription: locData.metaDescription
            },
            create: {
              serviceId: upsertedService.id,
              locale: locale,
              name: locData.name,
              shortDescription: locData.shortDescription,
              fullDescription: locData.fullDescription,
              features: locData.features || [],
              benefits: locData.benefits || [],
              content: locData.content as any,
              metaTitle: locData.metaTitle,
              metaDescription: locData.metaDescription
            }
          });
        }

        console.log(`Successfully generated and saved content for ${service.slug}.`);
        success = true;
        
        // Base delay between requests to avoid hitting RPM limits early
        await new Promise(resolve => setTimeout(resolve, 5000));

      } catch (error) {
        console.error(`Exception occurred processing ${service.slug}:`, error);
        break;
      }
    }
  }

  console.log('--- Completed processing all services ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
