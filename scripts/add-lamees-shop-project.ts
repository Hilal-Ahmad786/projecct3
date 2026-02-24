/**
 * Add Shop Lamees project
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

async function addProject() {
    console.log('=== Adding Shop Lamees Project ===\n');

    const projectData = {
        data: {
            name: 'Shop Lamees - Luxury Abayas E-commerce',
            slug: 'shop-lamees',
            client: 'Shop Lamees',
            category: 'e-commerce',
            industry: 'Luxury Fashion / Traditional Arabic Apparel',
            status: 'published',
            featured: true,
            thumbnail: '/images/portfolio/shop-lamees.png',
            images: ['/images/portfolio/shop-lamees.png'],
            description: 'A premium fashion brand based in Saudi Arabia, specializing in luxury Abayas that blend traditional elegance with modern sophistication.',
            fullDescription: 'We developed Shop Lamees, a minimalist yet rich visual e-commerce platform for a high-end Abaya brand in Saudi Arabia. The platform focuses on high-quality photography, a seamless bilingual experience (AR/EN), and optimized regional logistics across the Gulf countries.',
            challenge: 'Creating a digital experience that conveys luxury and exclusivity while maintaining high performance and ease of use for a high-expectation audience in the Gulf.',
            solution: 'A modern, image-centric design with integrated WhatsApp support, a "Golden Guarantee" trust system, and a streamlined bilingual checkout process.',
            technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel'],
            results: [
                { metric: 'Regional Reach', value: 'KSA & GCC' },
                { metric: 'Load Performance', value: '98/100' },
                { metric: 'Return Rate', value: '<2%' }
            ],
            projectUrl: 'https://shop-lamees.vercel.app/',
            completedDate: new Date(),
        },
        translations: [
            {
                locale: 'tr',
                name: 'Shop Lamees - Lüks Abaya E-Ticaret',
                description: 'Suudi Arabistan merkezli, geleneksel zarafeti modern sofistike detaylarla harmanlayan lüks Abaya markası.',
                fullDescription: 'Suudi Arabistan\'daki üst düzey bir Abaya markası için minimalist ama görsel olarak zengin bir e-ticaret platformu olan Shop Lamees\'i geliştirdik. Platform, yüksek kaliteli fotoğrafçılığa, sorunsuz bir çift dilli deneyime (AR/EN) ve Körfez ülkeleri genelinde optimize edilmiş bölgesel lojistiğe odaklanmaktadır.',
                challenge: 'Körfez bölgesindeki yüksek beklentili bir kitle için lüks ve ayrıcalığı yansıtan, aynı zamanda yüksek performanslı ve kullanımı kolay bir dijital deneyim oluşturmak.',
                solution: 'Entegre WhatsApp desteği, "Altın Garanti" güven sistemi ve sadeleştirilmiş çift dilli ödeme süreci ile modern, görsel odaklı bir tasarım.'
            },
            {
                locale: 'ar',
                name: 'شوب لاميس - متجر عبايات فاخرة',
                description: 'علامة تجارية فاخرة للأزياء مقرها المملكة العربية السعودية، متخصصة في العبايات الفاخرة التي تمزج بين الأناقة التقليدية والتفاصيل الحديثة المتطورة.',
                fullDescription: 'قمنا بتطوير "شوب لاميس"، وهي منصة تجارة إلكترونية مرئية غنية وبسيطة لعلامة تجارية راقية للعبايات في المملكة العربية السعودية. تركز المنصة على التصوير الفوتوغرافي عالي الجودة، وتجربة ثنائية اللغة سلسة (AR/EN)، ولوجستيات إقليمية محسنة عبر دول الخليج.',
                challenge: 'خلق تجربة رقمية تنقل الرفاهية والحصرية مع الحفاظ على الأداء العالي وسهولة الاستخدام لجمهور ذوي توقعات عالية في الخليج.',
                solution: 'تصميم حديث يركز على الصور مع دعم واتساب مدمج، ونظام ثقة "الضمان الذهبي"، وعملية دفع ثنائية اللغة مبسطة.'
            }
        ],
        services: ['web-development', 'e-commerce', 'ui-ux-design']
    };

    const existing = await prisma.project.findUnique({
        where: { slug: projectData.data.slug }
    });

    let project;
    if (existing) {
        console.log(`⏩ Project ${projectData.data.slug} already exists, updating...`);
        project = await prisma.project.update({
            where: { id: existing.id },
            data: projectData.data
        });
    } else {
        project = await prisma.project.create({
            data: projectData.data
        });
        console.log(`✅ Created project: ${project.name}`);
    }

    // Add Translations
    for (const t of projectData.translations) {
        const existingTranslation = await prisma.projectTranslation.findUnique({
            where: { projectId_locale: { projectId: project.id, locale: t.locale } }
        });

        if (existingTranslation) {
            await prisma.projectTranslation.update({
                where: { id: existingTranslation.id },
                data: t
            });
        } else {
            await prisma.projectTranslation.create({
                data: { projectId: project.id, ...t }
            });
        }
    }
    console.log(`✅ Added translations for: ${project.slug}`);

    // Link to Services
    const portfolioItem = {
        title: 'Shop Lamees',
        category: projectData.data.industry,
        image: projectData.data.thumbnail,
        url: projectData.data.projectUrl
    };

    for (const serviceSlug of projectData.services) {
        const service = await prisma.service.findFirst({ where: { slug: serviceSlug } });
        if (!service) {
            console.log(`⚠️  Service ${serviceSlug} not found`);
            continue;
        }

        const content = (service.content as any) || {};
        const existingPortfolio = content.portfolio || [];

        if (existingPortfolio.some((p: any) => p.url === portfolioItem.url)) {
            console.log(`⏭️  ${serviceSlug}: already has this project`);
            continue;
        }

        await prisma.service.update({
            where: { id: service.id },
            data: { content: { ...content, portfolio: [...existingPortfolio, portfolioItem] } }
        });
        console.log(`✅ ${serviceSlug}: added project to service portfolio`);
    }

    console.log('\n=== Done ===');
    await prisma.$disconnect();
}

addProject().catch(err => {
    console.error('Error adding project:', err);
    process.exit(1);
});
