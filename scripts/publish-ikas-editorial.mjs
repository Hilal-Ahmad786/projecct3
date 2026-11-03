import { config } from 'dotenv';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
config({ path: resolve(projectRoot, '.env.local'), override: true, quiet: true });
config({ path: resolve(projectRoot, '.env'), quiet: true });

const articlesDir = resolve(projectRoot, 'content/blog/ikas');
const manifest = JSON.parse(await readFile(resolve(articlesDir, 'manifest.json'), 'utf8'));
const isDryRun = process.argv.includes('--dry-run');
const articles = await Promise.all(manifest.map(async (article) => {
  const content = (await readFile(resolve(articlesDir, `${article.slug}.md`), 'utf8')).trim();
  if (!content || content.startsWith('# ')) throw new Error(`Article ${article.slug} must have a body without a repeated H1.`);
  if (!content.includes('## ')) throw new Error(`Article ${article.slug} has no section headings.`);
  for (const href of [...content.matchAll(/\]\((\/[^)]+)\)/g)].map((match) => match[1])) {
    if (href.startsWith('/downloads/')) {
      try { await readFile(resolve(projectRoot, 'public', href.slice(1))); }
      catch { throw new Error(`Download referenced by ${article.slug} is missing: ${href}`); }
    }
  }
  return { ...article, content };
}));

if (isDryRun) {
  for (const { slug, title, category, featuredImage, content, readingMinutes } of articles) {
    console.log(`READY ${slug} | ${category} | ${content.split(/\s+/).length} words | ${readingMinutes} min | image=${featuredImage ?? 'none'} | ${title}`);
  }
  process.exit(0);
}

const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
if (!connectionString) throw new Error('Set POSTGRES_PRISMA_URL or DATABASE_URL to publish the articles.');
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString, max: 2, connectionTimeoutMillis: 10000 }) });
try {
  await prisma.$transaction(async (tx) => {
    for (const article of articles) {
      const existing = await tx.blogPost.findUnique({ where: { slug: article.slug }, select: { id: true, category: true, language: true, status: true, publishedAt: true } });
      if (existing && (existing.category !== 'ikas-development' || existing.language !== 'tr')) {
        throw new Error(`Refusing to overwrite ${article.slug}: it belongs to ${existing.category}/${existing.language}.`);
      }
      const publishedAt = existing?.status === 'PUBLISHED' && existing.publishedAt ? existing.publishedAt : new Date();
      await tx.blogPost.upsert({
        where: { slug: article.slug },
        create: { slug: article.slug, language: 'tr', title: article.title, excerpt: article.excerpt, content: article.content, featuredImage: article.featuredImage, metaTitle: article.metaTitle, metaDescription: article.metaDescription, category: 'ikas-development', tags: article.tags, status: 'PUBLISHED', featured: false, publishedAt },
        update: { language: 'tr', title: article.title, excerpt: article.excerpt, content: article.content, featuredImage: article.featuredImage, metaTitle: article.metaTitle, metaDescription: article.metaDescription, category: 'ikas-development', tags: article.tags, status: 'PUBLISHED', publishedAt },
      });
      console.log(`Published ${article.slug}`);
    }
  });
} finally {
  await prisma.$disconnect();
}
