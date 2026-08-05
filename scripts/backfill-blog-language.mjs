// One-off: backfill BlogPost.language for existing single-language posts.
// Heuristics: '-ar' slug suffix or Arabic script → ar; Urdu script → ur;
// Turkish-specific chars/words → tr; German keywords → de; else en.
// Run: node scripts/backfill-blog-language.mjs
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL,
  max: 2,
});
const prisma = new PrismaClient({ adapter });

function detect(post) {
  const text = `${post.title} ${post.excerpt || ''}`;
  if (post.slug.endsWith('-ar') || /[؀-ۿ]/.test(text)) {
    // Arabic block covers Urdu too — distinguish by Urdu-specific letters.
    return /[ٹڈڑںھےۓ]/.test(text) ? 'ur' : 'ar';
  }
  if (/[ğışİĞ]|Türkiye|yapay zeka|dijital dönüşüm/i.test(text)) return 'tr';
  if (/\b(und|für|der|die|das|mit|Datenschutz|KI)\b/.test(text)) return 'de';
  return 'en';
}

const posts = await prisma.blogPost.findMany({
  select: { id: true, slug: true, title: true, excerpt: true, language: true },
});
for (const p of posts) {
  const lang = detect(p);
  if (lang !== p.language) {
    await prisma.blogPost.update({ where: { id: p.id }, data: { language: lang } });
    console.log(`${p.slug}: ${p.language} -> ${lang}`);
  } else {
    console.log(`${p.slug}: ${p.language} (unchanged)`);
  }
}
await prisma.$disconnect();
