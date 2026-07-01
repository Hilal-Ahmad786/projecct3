# Continuation brief — PakSoft AI/ML content enrichment

## Context
We are enriching PakSoft's service catalog (270 services) with rich, 5-language
content. You (Gemini) already started the **ai-ml** batch from
`GEMINI_PROMPT_ai-ml.md`. That file is the source of truth — re-read it for the
full rules, the quality bar, and the `ai-agents` gold example. This note only
tells you what's already done and what's left.

## What you already produced (11 of 38 — DONE, applied to our DB, do NOT redo)
ai-image-generation, ai-integration, ai-poc-mvp, ai-workflow-automation,
anomaly-detection, autonomous-agents, business-intelligence-solutions,
chatbot-development, computer-vision, computer-vision-solutions,
custom-ai-development

## What remains — generate these 27 now (and ONLY these)
custom-llm-development, customer-service-ai, data-pipeline-automation,
data-visualization, document-qa, enterprise-search-ai, etl-pipelines,
fraud-detection-systems, gpt-claude-api-integration, image-recognition,
knowledge-base-ai, llm-finetuning, mlops-model-deployment, multi-agent-systems,
natural-language-processing, nlp-text-processing, object-detection,
ocr-document-processing, predictive-analytics, prompt-engineering, rag-solutions,
recommendation-systems, rpa-solutions, time-series-forecasting, video-analytics,
voice-assistant-development, whatsapp-bots

## Rules (must match GEMINI_PROMPT_ai-ml.md exactly)
- Output ONE JSON object keyed by slug: `{ "slug": { "en":{…}, "tr":{…}, "de":{…}, "ur":{…}, "ar":{…} }, … }`
- ALL 5 locales per service: **en, tr, de, ur, ar** (ur = full Urdu, ar = full Arabic — never English placeholders).
- Each locale: rich `fullDescription`, **6+ features**, **5+ benefits**, **5-step process**, and **8 FAQs**.
- `metaTitle`: **≤ 60 characters**, must end with `| PakSoft`. (Keep it short — long titles get rejected.)
- Match the depth and tone of the `ai-agents` gold example in the prompt file.
- Chunk your output: produce as many complete services as fit, then I'll say
  **"continue"** for the next chunk. Never emit a half-finished service —
  finish each slug's 5 locales before starting the next.

## Our pipeline (what happens after you reply — for your awareness, you don't run it)
1. I save your JSON chunks as `ai_ml_output_partN.json`.
2. `split-gemini.mjs` splits them into one file per slug.
3. `apply.mjs` (dry-run) validates against the quality bar (locales, FAQ count,
   word counts, metaTitle length). If anything fails, I fix or send it back to you.
4. `apply.mjs --apply` writes to the DB. It **preserves each service's
   `content.animation`** — so you never need to touch animation; just give content.
5. I re-audit to confirm the thin-count dropped.

## Where to continue
Start at the top of the 27-slug list above (`custom-llm-development`) and work
down. When all 27 are done, the ai-ml category is complete and we move to the
next batch (web-software, 42 remaining).
