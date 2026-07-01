import fs from 'node:fs';
import path from 'node:path';
import { resolve, join } from 'node:path';

const LOCALES = ['en', 'tr', 'de', 'ur', 'ar'];

// ── args ─────────────────────────────────────────────────────────────
const category = process.argv[2]; // e.g. "infrastructure"
const batchName = process.argv[3]; // e.g. "part1"
const slugListStr = process.argv[4]; // comma-separated slugs to process, e.g. "big-data-etl,ci-cd-pipelines"

if (!category || !batchName || !slugListStr) {
  console.error('Usage: node enrich-by-api.mjs <category> <batchName> <comma-separated-slugs>');
  process.exit(1);
}

const targetSlugs = slugListStr.split(',').map(s => s.trim()).filter(Boolean);
const promptFile = resolve(process.cwd(), `scripts/content-enrichment/GEMINI_PROMPT_${category}.md`);

if (!fs.existsSync(promptFile)) {
  console.error(`Prompt file not found: ${promptFile}`);
  process.exit(1);
}

const promptContent = fs.readFileSync(promptFile, 'utf8');

// Load environment variables from .env.local
const envPath = resolve(process.cwd(), '.env.local');
let apiKey = process.env.GEMINI_API_KEY;
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
  if (match) {
    apiKey = match[1].trim();
  }
}

if (!apiKey) {
  console.error('Error: GEMINI_API_KEY not found in environment or .env.local');
  process.exit(1);
}

// Extract the SERVICES TO WRITE block to find seed info
const jsonMatch = promptContent.match(/```json\s*([\s\S]*?)\s*```/g);
if (!jsonMatch || jsonMatch.length < 2) {
  console.error('Could not find services JSON blocks in prompt markdown file.');
  process.exit(1);
}

const servicesJsonStr = jsonMatch[jsonMatch.length - 1].replace(/```json|```/g, '').trim();
let servicesToWrite = [];
try {
  servicesToWrite = JSON.parse(servicesJsonStr);
} catch (err) {
  console.error('Failed to parse services JSON from prompt.', err);
  process.exit(1);
}

const outDir = resolve(process.cwd(), `scripts/content-enrichment/batches/${category}-${batchName}`);
fs.mkdirSync(outDir, { recursive: true });

console.log(`Target slugs to process: ${targetSlugs.join(', ')}`);
console.log(`Writing output files to: ${outDir}`);

// ── Quality Bar Validation helper ────────────────────────────────────
function validateLocale(slug, locale, d, problems) {
  const p = (msg) => problems.push(`${slug} [${locale}] ${msg}`);
  if (!d.name) p('missing name');
  const words = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;
  if (words(d.shortDescription) < 12) p(`shortDescription too short (${words(d.shortDescription)} words)`);
  if (words(d.fullDescription) < 60) p(`fullDescription too short (${words(d.fullDescription)} words)`);
  if (!Array.isArray(d.features) || d.features.length < 6) p(`features < 6 (${d.features?.length ?? 0})`);
  if (!Array.isArray(d.benefits) || d.benefits.length < 5) p(`benefits < 5 (${d.benefits?.length ?? 0})`);
  if (!d.metaTitle || d.metaTitle.length > 70) p(`metaTitle missing or > 70 chars`);
  if (!d.metaDescription || d.metaDescription.length < 100) p(`metaDescription missing or < 100 chars`);
  const c = d.content || {};
  if (!Array.isArray(c.process) || c.process.length < 4) p(`process < 4 steps (${c.process?.length ?? 0})`);
  (c.process || []).forEach((s, i) => { if (words(s.description) < 10) p(`process step ${i + 1} description thin`); });
  if (!Array.isArray(c.faq) || c.faq.length < 6) p(`faq < 6 (${c.faq?.length ?? 0})`);
  (c.faq || []).forEach((f, i) => { if (words(f.answer) < 12) p(`faq ${i + 1} answer thin`); });
  if (!Array.isArray(c.technologies) || c.technologies.length < 4) p(`technologies < 4 (${c.technologies?.length ?? 0})`);
}

async function callGemini(slug, seedData) {
  let cleanPromptContent = promptContent;
  const servicesIdx = promptContent.indexOf('## SERVICES TO WRITE');
  if (servicesIdx !== -1) {
    cleanPromptContent = promptContent.substring(0, servicesIdx);
  }

  const specificPrompt = `${cleanPromptContent}

IMPORTANT INSTRUCTIONS FOR THIS BATCH:
Please generate the JSON response ONLY for the following single service:
${JSON.stringify(seedData, null, 2)}

Ensure:
- Exactly 8 features, 6 benefits, 6 process steps, 8 FAQs per EVERY locale (including Arabic and Urdu).
- Proper word counts: en fullDescription >= 90, trans >= 40.
- Output ONLY valid JSON inside markdown code fences. Example structure:
\`\`\`json
{
  "${slug}": {
    "en": { ... },
    "tr": { ... },
    "de": { ... },
    "ur": { ... },
    "ar": { ... }
  }
}
\`\`\``;

  let attempts = 0;
  while (attempts < 5) {
    attempts++;
    console.log(`Calling Gemini API for ${slug} (Attempt ${attempts})...`);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 180000);
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: specificPrompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json"
          }
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        console.error(`API Error for ${slug}: ${response.status} ${response.statusText}`);
        if (response.status === 429) {
          console.log('Rate limited. Waiting 60 seconds before retrying...');
          if (attempts >= 5) {
            throw new Error('API returned 429 on final attempt');
          }
          await new Promise(r => setTimeout(r, 60000));
          continue;
        } else {
          throw new Error(`API returned ${response.status}`);
        }
      }

      const responseData = await response.json();
      const generatedText = responseData.candidates[0].content.parts[0].text;
      
      let parsedData;
      try {
        parsedData = JSON.parse(generatedText);
      } catch (err) {
        // Try to clean markdown fences if any
        let cleanText = generatedText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
        parsedData = JSON.parse(cleanText);
      }

      const serviceData = parsedData[slug];
      if (!serviceData) {
        throw new Error(`Generated JSON did not contain key '${slug}'`);
      }

      // Check quality bar
      const problems = [];
      for (const locale of LOCALES) {
        if (!serviceData[locale]) {
          problems.push(`missing locale ${locale}`);
        } else {
          validateLocale(slug, locale, serviceData[locale], problems);
        }
      }

      if (problems.length > 0) {
        console.warn(`⚠️ Quality bar validation failed for ${slug} on attempt ${attempts}:`);
        problems.forEach(p => console.warn(`  - ${p}`));
        if (attempts < 5) {
          console.log('Retrying generation with lower temperature...');
          continue;
        } else {
          throw new Error(`Failed to satisfy quality bar after 5 attempts: ${problems.join(', ')}`);
        }
      }

      return serviceData;
    } catch (err) {
      console.error(`Error on attempt ${attempts} for ${slug}:`, err);
      if (attempts >= 5) throw err;
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

async function main() {
  const finalBatchData = {};
  for (const slug of targetSlugs) {
    const seedData = servicesToWrite.find(s => s.slug === slug);
    if (!seedData) {
      console.error(`Slug not found in seed contexts: ${slug}`);
      continue;
    }

    console.log(`\n--- Processing ${slug} ---`);
    try {
      const enriched = await callGemini(slug, seedData);
      
      // Save individual file
      const resultObj = { slug, ...enriched };
      fs.writeFileSync(join(outDir, `${slug}.json`), JSON.stringify(resultObj, null, 2), 'utf8');
      console.log(`✓ Saved individual file for ${slug}`);
      
      finalBatchData[slug] = enriched;
      
      // Wait to avoid rate limits
      await new Promise(r => setTimeout(r, 30000));
    } catch (err) {
      console.error(`❌ Failed to process ${slug}:`, err.message);
      process.exit(1);
    }
  }

  // Compile full batch file too
  const batchFile = resolve(process.cwd(), `scripts/content-enrichment/out_${category}_${batchName}.json`);
  fs.writeFileSync(batchFile, JSON.stringify(finalBatchData, null, 2), 'utf8');
  console.log(`\n✓ Compiled full batch file: ${batchFile}`);
  console.log(`\nNext steps:`);
  console.log(`  node --env-file=.env.local scripts/content-enrichment/apply.mjs batches/${category}-${batchName}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
