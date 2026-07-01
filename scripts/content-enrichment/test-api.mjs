import fs from 'node:fs';
import path from 'node:path';
import { resolve } from 'node:path';

const envPath = resolve(process.cwd(), '.env.local');
let apiKey = process.env.GEMINI_API_KEY;
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
  if (match) {
    apiKey = match[1].trim();
  }
}

try {
  console.log('Testing gemini-2.5-flash with structured JSON output...');
  const start = Date.now();
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Return a JSON object with key 'greeting' and value 'hello world'." }] }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    })
  });
  
  console.log('Response status:', response.status);
  const data = await response.json();
  if (response.ok) {
    console.log('Success!', Date.now() - start, 'ms');
    console.log('Text:', data.candidates?.[0]?.content?.parts?.[0]?.text);
  } else {
    console.log('Error:', JSON.stringify(data, null, 2));
  }
} catch (err) {
  console.error('Fetch error:', err.message);
}
