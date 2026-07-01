# Antigravity Task — Enrich the remaining 97 PakSoft services

You are working inside the repo at:
`/Users/hilalahamd/MyRestProjects/Paksoft/projecct3`

The database (Postgres via Prisma) is the **source of truth** for service content.
Your job is to bring the **97 remaining "thin" services** (categories: consulting,
design, infrastructure, web-software) up to the content quality bar in all
**5 languages** (en, tr, de, ur, ar), then apply them to the database.

---

## STEP 1 — Read the content spec (this is your instruction set)

Open and fully read:
`scripts/content-enrichment/GEMINI_PROMPT_remaining-97.md`

That file is the authoritative spec. It contains:
- the **exact JSON output format** (one object keyed by slug, 5 locales each),
- the **required fields + quality bar** (word counts, FAQ/feature/step counts),
- the **translation rules** (real translations, RTL for ur/ar, Latin proper nouns),
- a **GOLD EXAMPLE** (`android-development`) to match in depth and quality,
- the **SERVICES TO WRITE** section: all 97 slugs grouped by category, each with
  its current name + description as seed context. Use the EXACT slug strings.

> ⚠️ NON-NEGOTIABLE: every locale (including Urdu and Arabic) must have
> **exactly 8 FAQs, 8 features, 6 benefits, and 6 process steps**. The previous
> batch was rejected for shipping 4–6 FAQs in ur/ar. Count FAQs in EVERY
> language before you move on from a service.

---

## STEP 2 — Generate, in batches by category

Work through the 97 services **category by category**, ~8–12 services per batch.
For each batch, write a single JSON file (object keyed by slug, the format from
the spec) into:
`scripts/content-enrichment/` — name it `out_<category>_partN.json`
(e.g. `out_consulting_part1.json`, `out_infrastructure_part2.json`).

Rules:
- Output COMPLETE services only — never a half-finished slug.
- Strictly valid JSON: double quotes, no trailing commas, no comments, no `...`.
- Do NOT touch `content.animation` — the apply script preserves it automatically;
  you only produce content fields.

---

## STEP 3 — Split each batch into per-slug files

```bash
cd /Users/hilalahamd/MyRestProjects/Paksoft/projecct3
node scripts/content-enrichment/split-gemini.mjs \
  scripts/content-enrichment/out_<category>_partN.json \
  scripts/content-enrichment/batches/<category>-partN
```
This writes one `<slug>.json` per service and skips any that don't have all 5
locales (those are incomplete — go back and finish them).

---

## STEP 4 — Validate (dry run) — MUST pass before applying

```bash
node --env-file=.env scripts/content-enrichment/apply.mjs \
  scripts/content-enrichment/batches/<category>-partN
```
If it prints `✗ Validation failed`, FIX the listed problems (short FAQ counts,
metaTitle > 70 chars, thin answers, etc.) in the batch files and re-run until you
see `✓ N file(s) validated against the quality bar`.

---

## STEP 5 — Apply to the database

```bash
node --env-file=.env scripts/content-enrichment/apply.mjs \
  scripts/content-enrichment/batches/<category>-partN --apply
```

---

## STEP 6 — Audit to confirm

```bash
node --env-file=.env scripts/content-enrichment/audit-category.mjs <category>
```
Goal: `Thin (need work): 0/<total>` for each category. Repeat steps 2–6 until
all four categories report 0 thin.

---

## Working style (important)

- **Do NOT report each service individually.** Generate a full batch, run the
  validate→apply→audit loop, then report once per batch with the audit's thin
  count (e.g. "consulting part1 applied — consulting now 0/11").
- Track which slugs are done so you never redo one.
- Final definition of done: `audit-category.mjs` shows **0 thin** for
  consulting, design, infrastructure, AND web-software.

## The 97 services (counts)
- consulting — 9
- design — 12
- infrastructure — 34
- web-software — 42

The exact slug list + per-service context is in
`scripts/content-enrichment/GEMINI_PROMPT_remaining-97.md` → SERVICES TO WRITE.
