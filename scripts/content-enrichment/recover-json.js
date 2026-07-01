import fs from 'node:fs';
import path from 'node:path';

const transcriptPath = '/Users/hilalahamd/.gemini/antigravity-ide/brain/60e50b1a-ce26-4d8d-962e-b577b6aeeaf5/.system_generated/logs/transcript.jsonl';
const outputDir = '/Users/hilalahamd/MyRestProjects/Paksoft/projecct3/scripts/content-enrichment';

const TARGET_SLUGS = [
  'custom-llm-development', 'customer-service-ai', 'data-pipeline-automation',
  'data-visualization', 'document-qa', 'enterprise-search-ai', 'etl-pipelines',
  'fraud-detection-systems', 'gpt-claude-api-integration', 'image-recognition',
  'knowledge-base-ai', 'llm-finetuning', 'mlops-model-deployment', 'multi-agent-systems',
  'natural-language-processing', 'nlp-text-processing', 'object-detection',
  'ocr-document-processing', 'predictive-analytics', 'prompt-engineering', 'rag-solutions',
  'recommendation-systems', 'rpa-solutions', 'time-series-forecasting', 'video-analytics',
  'voice-assistant-development', 'whatsapp-bots'
];

try {
  const content = fs.readFileSync(transcriptPath, 'utf8');
  const lines = content.split('\n').filter(Boolean);
  
  const recoveredData = {};

  function tryParseObject(parsed) {
    if (parsed && typeof parsed === 'object') {
      for (const key of Object.keys(parsed)) {
        if (TARGET_SLUGS.includes(key)) {
          recoveredData[key] = parsed[key];
        }
      }
    }
  }

  for (const line of lines) {
    const entry = JSON.parse(line);
    if (entry.source === 'MODEL' && entry.content) {
      const text = entry.content.trim();

      // 1. Try parsing full text
      try {
        const parsed = JSON.parse(text);
        tryParseObject(parsed);
        continue;
      } catch (e) {}

      // 2. Try matching code blocks
      const regex = /```json\s*([\s\S]*?)\s*```/g;
      let match;
      let matchedCodeBlock = false;
      while ((match = regex.exec(text)) !== null) {
        matchedCodeBlock = true;
        try {
          const parsed = JSON.parse(match[1].trim());
          tryParseObject(parsed);
        } catch (e) {}
      }

      if (matchedCodeBlock) continue;

      // 3. Try finding substring from first '{' to last '}'
      const startIdx = text.indexOf('{');
      const endIdx = text.lastIndexOf('}');
      if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        try {
          const jsonSub = text.substring(startIdx, endIdx + 1);
          const parsed = JSON.parse(jsonSub);
          tryParseObject(parsed);
        } catch (e) {
          // If it fails to parse because of truncation or partial data, we can try to fix it or just ignore
        }
      }
    }
  }

  console.log(`Recovered ${Object.keys(recoveredData).length} of ${TARGET_SLUGS.length} slugs from logs.`);
  console.log('Slugs recovered:', Object.keys(recoveredData));

  if (Object.keys(recoveredData).length > 0) {
    // Save to batches or output files in chunks or single file
    const recoveredFile = path.join(outputDir, 'ai_ml_recovered.json');
    fs.writeFileSync(recoveredFile, JSON.stringify(recoveredData, null, 2));
    console.log(`Saved recovered slugs to: ${recoveredFile}`);
  }
} catch (err) {
  console.error('Error recovering JSON:', err);
}
