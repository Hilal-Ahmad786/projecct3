import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { getPrisma } from '../src/lib/db/prisma';
import fs from 'fs';
import path from 'path';

const prisma = getPrisma();

async function main() {
    console.log('Starting Blog Import Process...');

    const dataDir = path.join(process.cwd(), 'src/data/blogs');
    const metadataPath = path.join(dataDir, 'metadata.json');
    const markdownDir = path.join(dataDir, 'markdown');

    // Read metadata
    const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
    const blogs = JSON.parse(metadataContent);

    for (const blog of blogs) {
        console.log(`Processing blog: ${blog.slug}`);

        // Read markdown content
        const mdPath = path.join(markdownDir, blog.markdownFile);
        if (!fs.existsSync(mdPath)) {
            console.warn(`Warning: Markdown file ${blog.markdownFile} not found for ${blog.slug}`);
            continue;
        }
        const content = fs.readFileSync(mdPath, 'utf-8');

        // Check if blog post already exists
        const existingPost = await prisma.blogPost.findUnique({
            where: { slug: blog.slug }
        });

        const postData = {
            slug: blog.slug,
            title: blog.title,
            excerpt: blog.excerpt,
            content: content,
            featuredImage: blog.featuredImage,
            metaTitle: blog.metaTitle,
            metaDescription: blog.metaDescription,
            category: blog.category || 'technology',
            tags: blog.tags || [],
            status: blog.status || 'PUBLISHED',
            publishedAt: new Date(),
        };

        let postId;

        if (existingPost) {
            console.log(`Updating existing post: ${blog.slug}`);
            const updated = await prisma.blogPost.update({
                where: { id: existingPost.id },
                data: postData
            });
            postId = updated.id;
        } else {
            console.log(`Creating new post: ${blog.slug}`);
            const created = await prisma.blogPost.create({
                data: postData
            });
            postId = created.id;
        }

        // Handle translations if any
        for (const trans of blog.translations || []) {
            const transData = {
                postId: postId,
                locale: trans.locale,
                title: trans.title,
                excerpt: trans.excerpt,
                content: trans.content,
                metaTitle: trans.metaTitle,
                metaDescription: trans.metaDescription,
            };

            await prisma.blogTranslation.upsert({
                where: {
                    postId_locale: {
                        postId: postId,
                        locale: trans.locale
                    }
                },
                update: transData,
                create: transData
            });
            console.log(`Upserted translation for ${trans.locale}`);
        }

        // Auto-map primary content as a translation if it's not English
        if (blog.locale && blog.locale !== 'en') {
            const transData = {
                postId: postId,
                locale: blog.locale,
                title: blog.title,
                excerpt: blog.excerpt,
                content: content,
                metaTitle: blog.metaTitle,
                metaDescription: blog.metaDescription,
            };

            await prisma.blogTranslation.upsert({
                where: {
                    postId_locale: {
                        postId: postId,
                        locale: blog.locale
                    }
                },
                update: transData,
                create: transData
            });
            console.log(`Auto-mapped primary content as translation for ${blog.locale}`);
        }

        console.log(`Successfully imported: ${blog.title}\n`);
    }

    console.log('Blog Import Process Completed Successfully.');
}

main()
    .catch((e) => {
        console.error('Error during import:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
