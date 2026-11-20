# Brief: write a service spec file for the PakSoft engine generator

PakSoft (paksofts.com) is a software and digital agency in Türkiye. Turkish service pages are generated from compact Python spec files by `scripts/engine-services/generate.py`.
Your job: WRITE ONE SPEC FILE (named in your task). Do not touch any other file, do not run git or npm, and run `generate.py` ONLY with `--check`
(without it the script writes content files and edits a shared registry that other agents use).

READ FIRST: `scripts/engine-services/specs/batch2_marketing.py` (complete, correct example — copy its structure; every field is required) and, for a software
service example, the first spec in `scripts/engine-services/specs/batch3_web_a.py`. Also read the top docstring and `validate()` in `generate.py`.

## Hard rules
- Turkish, clear and concrete; "biz" for PakSoft, "siz" for the reader. Use the typographic apostrophe ’ (never ') inside strings so Python quoting never breaks.
  Each service must be genuinely specific (own tools, steps, risks, scenarios) — not another service with words swapped.
- NO prices or amounts. NO guarantees (sales, rankings, ROAS, accuracy %, savings, delivery dates, uplift). NO invented statistics, percentages, client names, reviews,
  awards, certifications or partner claims (never claim PakSoft is a Meta/Google/WhatsApp/AWS/OpenAI/etc. partner). Scenarios are generic; the generator labels them
  "temsili" itself; give them no result numbers. Be honest about limits and legal duties (KVKK, ticari ileti izni, platform policies) without giving legal advice.
- The generator concatenates `short` into fixed sentences, e.g. "{short} hizmetinden hangi sonucu bekliyorsunuz?", "{short} fiyatını neler etkiler?",
  "{short} için sağlayıcı seçerken…", and the hero heading is `short` + one of `words`. Choose `short` and `words` so these read naturally (no "Geliştirme Geliştirme").
  Do not rely on Turkish case suffixes attached to the name.
- Field meanings: `outcomes` 3×(title,text); `scope` 6×(work,output); `deep` 3×(heading,text ~45 words); `cardsH` + `cards` 4×(title,text ~25 words);
  `tools` 5×(tool, question it answers) + `toolsText`; `metrics` 3×(metric,meaning,caution); `steps` 5×(action-phrase title like "…tanıyalım", text);
  `needs`; `scen` 2×(title ending "için örnek çalışma senaryosu", ~60-word text); `costRows` 4×(item, who pays, depends on) — the FIRST row must be the main third-party /
  pass-through cost of THIS service (platform fees, licence, hosting, API usage, store fees…) and who pays it; `factors` 5×(label,text);
  `faq` 8×(question,answer) — first three questions ≤44 chars, answers 1–2 honest sentences; `related` 3×[label, one-sentence description, href].
- Adapt generic fields to the service type. Software/engineering: no advertising wording ("reklam bütçesi"); `bars` = three labels ≤6 chars; `meas3` = [tool A, tool B, report name].
- Scene-label fields (`items4, chips3, meas3, plan4, sc2, bitems3, bars, search, ans2, test`, optional `planName` ≤19 chars) are drawn in small SVG boxes: keep them SHORT and
  within `validate()` limits (e.g. `bars` ≤6 chars each, `sc2` ≤24, `chips3` ≤20, `meas3` ≤22/22/20, `bitems3` ≤20). `words` = 3 rotating hero words.
- `mdesc` ≤155 characters with the service keyword; `intro` 1–2 sentences; `eyebrow`, `keywordLine` (· separated), `cta` ("… Teklifi Al").
- `related` hrefs may ONLY be `/tr/hizmetler/<slug>` with a slug from this list (never the service itself):
  meta-ads, instagram-ads, facebook-ads, tiktok-ads, youtube-ads, google-ads, google-search-ads, google-shopping, google-display-ads, performance-max, linkedin-ads,
  seo, ecommerce-seo, technical-seo, local-seo, link-building, content-marketing, email-marketing, social-media-management, social-media-marketing,
  whatsapp-business-api, whatsapp-marketing, conversion-rate-optimization, influencer-marketing, trendyol-ads, e-commerce, shopify-development, ikas-development,
  custom-ecommerce, marketplace-development, corporate-website-design, web-development, mobile-development, woocommerce-development, wordpress-development,
  saas-development, api-development, crm-development, erp-development, hrms-development, custom-business-software, ui-ux-design, flutter-development, web-design,
  landing-page-design, graphic-design, logo-brand-identity, ecommerce-design, startup-mvp-development, digital-transformation, chatbot-development, whatsapp-bots,
  ai-agents, llm-services, rag-solutions, ai-workflow-automation, website-speed-optimization, devops-cloud, cybersecurity, web-scraping, python-automation, workflow-automation,
  advantage-plus-campaigns, international-seo, geo-ai-search-optimization, email-automation, video-production-marketing, landing-page-optimization, linkedin-marketing,
  tiktok-shop, whatsapp-commerce, affiliate-marketing-systems, payment-gateway-integration, third-party-api-integration, android-development, ios-development,
  react-native-development, full-stack-development, headless-cms-development, progressive-web-apps, ai-solutions, machine-learning, custom-ai-development, computer-vision,
  predictive-analytics, ocr-document-processing, cloud-migration, database-services, maintenance-support, data-analytics, penetration-testing,
  business-intelligence-solutions, mobile-app-design, brand-strategy, staff-augmentation, developer-outsourcing, dedicated-teams, ai-strategy, process-digitization.

## Verify and report
Run `cd /Users/hilalahamd/MyRestProjects/Paksoft/projecct3 && python3 scripts/engine-services/generate.py <your file> --check` and fix until there are NO `WARN` lines and every slug
prints `check-ok` (≈1,900+ words each). Finally reply with ONE line per service (slug + word count) and anything you were unsure about (keep it short).
