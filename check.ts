import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
import { prisma } from './src/lib/db/prisma';

async function main() {
  const trans = await prisma.serviceTranslation.findMany({ select: { serviceId: true, locale: true } });
  const services = await prisma.service.findMany({ select: { id: true, slug: true } });
  const map = new Map(services.map(s => [s.id, s.slug]));
  console.log(trans.map(t => ({ slug: map.get(t.serviceId), locale: t.locale })).filter(t => t.slug?.includes('wordpress')));
}
main().catch(console.error).finally(() => prisma.$disconnect());
