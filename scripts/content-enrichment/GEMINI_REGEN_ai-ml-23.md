# Regenerate the 23 lost ai-ml services — Option B

The 23 services you generated "in chat" were never written to a file and are
gone (you confirmed this by grepping the logs). I do not have them either.
**Regenerate all 23 from scratch**, following `GEMINI_PROMPT_ai-ml.md` (rules,
quality bar, `ai-agents` gold example).

## CRITICAL — the rule you broke last time
Generate in small batches of **3–4 services**, and **WRITE EACH BATCH TO A FILE
IMMEDIATELY** — before you generate the next batch. Do NOT hold services in chat
and write them "at the end." That is exactly how the 23 were lost.

Write the files here, named sequentially so they don't collide:
`scripts/content-enrichment/ai_ml_output_part5.json`,
`ai_ml_output_part6.json`, `part7.json`, … (part4 is already taken).

## The 23 services to regenerate
custom-llm-development, customer-service-ai, data-pipeline-automation,
data-visualization, document-qa, enterprise-search-ai, etl-pipelines,
fraud-detection-systems, gpt-claude-api-integration, image-recognition,
knowledge-base-ai, llm-finetuning, mlops-model-deployment, multi-agent-systems,
natural-language-processing, nlp-text-processing, object-detection,
ocr-document-processing, predictive-analytics, prompt-engineering, rag-solutions,
recommendation-systems, rpa-solutions

## Format (per `GEMINI_PROMPT_ai-ml.md`)
- Each file: one JSON object keyed by slug → `{ "slug": { "en":{…}, "tr":{…}, "de":{…}, "ur":{…}, "ar":{…} } }`.
- All 5 locales, full Urdu + Arabic (no English placeholders).
- Per locale: rich `fullDescription`, 6+ features, 5+ benefits, 5-step process, **8 FAQs**.
- `metaTitle`: **≤ 60 chars**, ending `| PakSoft`. Keep it short — over-length titles get rejected (6 of the last 11 had to be hand-trimmed; don't repeat that).

## After you finish all 23
Tell me which `partN.json` files you wrote. I'll split → validate → apply → re-audit.
That completes ai-ml (41/41); next is web-software using `GEMINI_PROMPT_web-software.md`.
