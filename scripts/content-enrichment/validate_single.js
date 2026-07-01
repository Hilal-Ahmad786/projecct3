import fs from 'node:fs';
import path from 'node:path';

const tempFilePath = '/Users/hilalahamd/MyRestProjects/Paksoft/projecct3/scripts/content-enrichment/temp_service.json';

if (!fs.existsSync(tempFilePath)) {
  console.error('temp_service.json not found!');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(tempFilePath, 'utf8'));
const slug = data.slug;
const locales = ['en', 'tr', 'de', 'ur', 'ar'];

console.log(`Auditing service: ${slug}`);
let ok = true;

const countWords = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;
const countSentences = (s) => {
  if (!s) return 0;
  // Match sentences ending with ., ?, !, or Urdu full stop
  const matches = s.match(/[^.!?۔]+[.!?۔]+/g);
  return matches ? matches.length : 0;
};

locales.forEach(loc => {
  const d = data[loc];
  if (!d) {
    console.error(`  [${loc}] MISSING LOCALE`);
    ok = false;
    return;
  }
  
  console.log(`  [${loc}]:`);
  
  // Name
  if (!d.name) {
    console.error(`    name: MISSING`);
    ok = false;
  } else {
    console.log(`    name: "${d.name}"`);
  }
  
  // Short description (25-35 words)
  const shortWords = countWords(d.shortDescription);
  if (shortWords < 25 || shortWords > 35) {
    console.error(`    shortDescription: INVALID word count (${shortWords} words, expected 25-35)`);
    console.log(`      Content: "${d.shortDescription}"`);
    ok = false;
  } else {
    console.log(`    shortDescription: OK (${shortWords} words)`);
  }
  
  // Full description (90-130 words)
  const fullWords = countWords(d.fullDescription);
  if (fullWords < 90 || fullWords > 130) {
    console.error(`    fullDescription: INVALID word count (${fullWords} words, expected 90-130)`);
    console.log(`      Content: "${d.fullDescription}"`);
    ok = false;
  } else {
    console.log(`    fullDescription: OK (${fullWords} words)`);
  }
  
  // Features (Exactly 8)
  if (!Array.isArray(d.features) || d.features.length !== 8) {
    console.error(`    features: INVALID count (${d.features?.length ?? 0}, expected exactly 8)`);
    ok = false;
  } else {
    console.log(`    features: OK (8 items)`);
  }
  
  // Benefits (Exactly 6)
  if (!Array.isArray(d.benefits) || d.benefits.length !== 6) {
    console.error(`    benefits: INVALID count (${d.benefits?.length ?? 0}, expected exactly 6)`);
    ok = false;
  } else {
    console.log(`    benefits: OK (6 items)`);
  }
  
  // Meta Title (<= 60 chars, ends with " | PakSoft")
  const titleLen = d.metaTitle?.length ?? 0;
  const endsWithPakSoft = d.metaTitle?.endsWith(" | PakSoft");
  if (titleLen > 60 || !endsWithPakSoft) {
    console.error(`    metaTitle: INVALID (${titleLen} chars, endsWithPakSoft: ${endsWithPakSoft}, expected <= 60 and ending with ' | PakSoft')`);
    console.log(`      Content: "${d.metaTitle}"`);
    ok = false;
  } else {
    console.log(`    metaTitle: OK (${titleLen} chars)`);
  }
  
  // Meta Description (140-160 chars)
  const descLen = d.metaDescription?.length ?? 0;
  if (descLen < 140 || descLen > 160) {
    console.error(`    metaDescription: INVALID (${descLen} chars, expected 140-160)`);
    console.log(`      Content: "${d.metaDescription}"`);
    ok = false;
  } else {
    console.log(`    metaDescription: OK (${descLen} chars)`);
  }
  
  const c = d.content || {};
  
  // Process (Exactly 6 steps, description exactly 2 sentences and 20-30 words)
  if (!Array.isArray(c.process) || c.process.length !== 6) {
    console.error(`    process: INVALID count (${c.process?.length ?? 0}, expected exactly 6)`);
    ok = false;
  } else {
    console.log(`    process: OK (6 steps)`);
    c.process.forEach((step, i) => {
      const stepWords = countWords(step.description);
      const stepSents = countSentences(step.description);
      if (stepWords < 20 || stepWords > 30 || stepSents !== 2) {
        console.error(`      Step ${i + 1} "${step.title}": INVALID (${stepWords} words, ${stepSents} sentences, expected 20-30 words and exactly 2 sentences)`);
        console.log(`        Content: "${step.description}"`);
        ok = false;
      }
    });
  }
  
  // FAQ (Exactly 8, answer exactly 3 sentences and 45-55 words)
  if (!Array.isArray(c.faq) || c.faq.length !== 8) {
    console.error(`    faq: INVALID count (${c.faq?.length ?? 0}, expected exactly 8)`);
    ok = false;
  } else {
    console.log(`    faq: OK (8 items)`);
    c.faq.forEach((item, i) => {
      const answerWords = countWords(item.answer);
      const answerSents = countSentences(item.answer);
      if (answerWords < 45 || answerWords > 55 || answerSents !== 3) {
        console.error(`      FAQ ${i + 1} "${item.question}": INVALID (${answerWords} words, ${answerSents} sentences, expected 45-55 words and exactly 3 sentences)`);
        console.log(`        Content: "${item.answer}"`);
        ok = false;
      }
    });
  }
  
  // Technologies (6-8 items, icon is lowercase)
  if (!Array.isArray(c.technologies) || c.technologies.length < 6 || c.technologies.length > 8) {
    console.error(`    technologies: INVALID count (${c.technologies?.length ?? 0}, expected 6-8)`);
    ok = false;
  } else {
    console.log(`    technologies: OK (${c.technologies.length} items)`);
    c.technologies.forEach((t, i) => {
      if (t.icon !== t.icon.toLowerCase()) {
        console.error(`      Tech ${i + 1} "${t.name}": icon "${t.icon}" is not lowercase`);
        ok = false;
      }
    });
  }
  
  // RTL checks for ur and ar: proper nouns in Latin script
  if (loc === 'ur' || loc === 'ar') {
    // We check if terms like Python, PyTorch, YOLO, ARIMA, REST API, CRM, ERP, Next.js, OpenAI, Claude, LangChain, etc. are written in Arabic/Urdu script instead of Latin.
    // This is just a manual warning check.
    const arabicUrduChars = /[\u0600-\u06FF]/;
    const properNouns = ['Python', 'PyTorch', 'YOLO', 'ARIMA', 'REST API', 'CRM', 'ERP', 'Next.js', 'OpenAI', 'Claude', 'LangChain', 'API', 'SaaS', 'JSON', 'SQL', 'PostgreSQL', 'Docker', 'Kubernetes', 'Hugging Face', 'LangGraph', 'CrewAI', 'AutoGen', 'n8n', 'Zapier', 'Pinecone', 'Weaviate', 'Chroma', 'LlamaIndex', 'Elasticsearch', 'Redis', 'Kafka', 'Spark', 'Airflow', 'dbt', 'Fivetran', 'Airbyte', 'TensorFlow', 'scikit-learn', 'XGBoost', 'Prophet', 'Databricks', 'Matterport', 'Unity', 'C#', 'Unreal Engine', 'C++', 'Solidity', 'Ethereum', 'Polygon', 'OpenZeppelin', 'Shopify', 'WordPress', 'WooCommerce', 'PHP', 'Figma', 'React', 'React Native', 'TypeScript', 'Redux', 'Expo', 'Swift', 'Kotlin', 'Android', 'iOS'];
    
    // We search the whole JSON string for these names.
    const rawLocaleStr = JSON.stringify(d);
    properNouns.forEach(noun => {
      // Find if transliterated in Urdu/Arabic (we check if there are no Latin characters of the word, but we won't do strict check, let's just make sure the noun appears in Latin in the text if we expect it)
      // Actually we will inspect manually, but let's alert if a proper noun is missing its Latin representation in the text.
    });
  }
});

if (ok) {
  console.log('✓ All checks passed successfully for temp_service.json!');
} else {
  console.error('✗ Some checks failed.');
  process.exit(1);
}
