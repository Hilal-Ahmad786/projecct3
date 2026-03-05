const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.blogPost.count();
    const published = await prisma.blogPost.count({ where: { status: 'PUBLISHED' } });

    if (published > 0) {
        const latest = await prisma.blogPost.findFirst({
            where: { status: 'PUBLISHED' },
            orderBy: { createdAt: 'desc' }
        });
        console.log("Latest post publishedAt:", latest.publishedAt, "status:", latest.status);
    }

    console.log(`Total: ${count}, Published: ${published}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
