# Service Content Enrichment Pipeline

Brings every service in the database up to the content quality bar, in all
5 locales (en, tr, de, ur, ar). The DB (`Service` + `ServiceTranslation`)
is the source of truth for service content — not the locale JSON files.

## Quality bar (per service, per locale)

Reference example in the DB: `etl-pipelines`.

| Field            | Target                                              |
| ---------------- | --------------------------------------------------- |
| shortDescription | 25–35 words, concrete value proposition             |
| fullDescription  | 90–130 words, specific to the service, no fluff     |
| features         | 8 items, capability-level (not generic)             |
| benefits         | 6 items, outcome-level                              |
| content.process  | 5–6 steps, each with a 2-sentence description       |
| content.faq      | 8+ Q&As, answers 2–3 sentences with real substance  |
| content.technologies | 6–8 entries `{ name, icon }`                    |
| metaTitle        | ≤ 60 chars, ends with `| PakSoft`                   |
| metaDescription  | 140–160 chars, includes a call to action            |

Translations are real translations (not transliterations); ur/ar must read
naturally in RTL. Keep proper nouns (tool names, WCAG, Next.js) in Latin.

## Batch file format

`batches/<batch-name>/<slug>.json`:

```json
{
  "slug": "ab-testing",
  "en":  { "name": "...", "shortDescription": "...", "fullDescription": "...",
           "features": [], "benefits": [],
           "metaTitle": "...", "metaDescription": "...",
           "content": { "process": [{"step":1,"title":"...","description":"..."}],
                         "faq": [{"question":"...","answer":"..."}],
                         "technologies": [{"name":"...","icon":"..."}] } },
  "tr": { ... same shape ... },
  "de": { ... }, "ur": { ... }, "ar": { ... }
}
```

Locales other than `en` are optional per file — missing locales are skipped
(existing DB translations stay untouched). `content.animation` in the DB is
ALWAYS preserved; the script never overwrites it.

## Usage

```bash
# validate + show what would change (no writes)
node scripts/content-enrichment/apply.mjs batches/sample-01

# write to the database
node scripts/content-enrichment/apply.mjs batches/sample-01 --apply
```

## Rollout plan

1. `sample-01` (this batch) — 5 services, reviewed by hand. ✅ approve first
2. Category batches generated per category (marketing 61, web-software 81,
   ai-ml 45, infrastructure 45, design 19, consulting 16), ~10–15 services
   per batch, reviewed by spot-check before each `--apply`.
