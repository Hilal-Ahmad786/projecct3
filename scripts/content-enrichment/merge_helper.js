import fs from 'node:fs';
import path from 'node:path';

const finalFilePath = '/Users/hilalahamd/MyRestProjects/Paksoft/projecct3/scripts/content-enrichment/ai_ml_FINAL.json';
const tempFilePath = '/Users/hilalahamd/MyRestProjects/Paksoft/projecct3/scripts/content-enrichment/temp_service.json';

if (!fs.existsSync(tempFilePath)) {
  console.error('temp_service.json not found!');
  process.exit(1);
}

const serviceData = JSON.parse(fs.readFileSync(tempFilePath, 'utf8'));
const slug = serviceData.slug;
delete serviceData.slug;

let fileData = {};
if (fs.existsSync(finalFilePath)) {
  const raw = fs.readFileSync(finalFilePath, 'utf8');
  if (raw.trim()) {
    try {
      fileData = JSON.parse(raw);
    } catch (e) {
      console.error('Error parsing existing ai_ml_FINAL.json:', e.message);
      process.exit(1);
    }
  }
}

fileData[slug] = serviceData;
fs.writeFileSync(finalFilePath, JSON.stringify(fileData, null, 2), 'utf8');
console.log(`Successfully added ${slug} to ${finalFilePath}. Total services in file: ${Object.keys(fileData).length}`);

