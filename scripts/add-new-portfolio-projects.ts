/**
 * Add Sivtech Makina and 724 Dijital projects
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

async function addProjects() {
    console.log('=== Adding New Portfolio Projects ===\n');

    const projects = [
        {
            data: {
                name: 'Sivtech Makina - Industrial Machinery E-commerce Platform',
                slug: 'sivtech-makina',
                client: 'Sivtech Makina',
                category: 'e-commerce',
                industry: 'Industrial Machinery / Automation',
                status: 'published',
                featured: true,
                thumbnail: '/images/portfolio/sivtechmakina.png',
                images: ['/images/portfolio/sivtechmakina.png'],
                description: 'Modern industrial e-commerce platform specializing in CNC machine parts, automation equipment, and linear motion systems.',
                fullDescription: 'We developed Sivtech Makina, a high-performance industrial e-commerce platform that simplifies the procurement of CNC and automation components. The platform features a comprehensive product catalog, technical specification sheets, and a streamlined quote request system for B2B procurement.',
                challenge: 'Sourcing technical industrial components often requires navigating multiple catalogs and manual quote requests, which is time-consuming for manufacturers.',
                solution: 'A technical e-commerce solution with advanced filtering, real-time stock information, and an integrated quote engine that bridges the gap between digital sales and industrial accuracy.',
                technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
                results: [
                    { metric: 'Catalog Items', value: '2500+' },
                    { metric: 'Procurement speed', value: 'x3 faster' },
                    { metric: 'Quote automated', value: '85%' }
                ],
                projectUrl: 'https://sivtechmakina.com/',
                completedDate: new Date(),
            },
            translations: [
                {
                    locale: 'tr',
                    name: 'Sivtech Makina - Endüstriyel Makine E-Ticaret Platformu',
                    description: 'CNC makine parçaları, otomasyon ekipmanları ve doğrusal hareket sistemleri konusunda uzmanlaşmış modern endüstriyel e-ticaret platformu.',
                    fullDescription: 'CNC ve otomasyon bileşenlerinin tedariğini kolaylaştıran yüksek performanslı bir endüstriyel e-ticaret platformu olan Sivtech Makina\'yı geliştirdik. Platform, kapsamlı bir ürün kataloğu, teknik özellik sayfaları ve B2B tedarik için kolaylaştırılmış bir teklif talep sistemi sunmaktadır.',
                    challenge: 'Teknik endüstriyel bileşenlerin tedariği genellikle birden fazla katalogda gezinmeyi ve üreticiler için zaman alıcı olan manuel teklif taleplerini gerektirir.',
                    solution: 'Dijital satış ve endüstriyel hassasiyet arasındaki boşluğu dolduran gelişmiş filtreleme, gerçek zamanlı stok bilgileri ve entegre bir teklif motoruna sahip teknik bir e-ticaret çözümü.'
                }
            ],
            services: ['web-development', 'e-commerce', 'ui-ux-design']
        },
        {
            data: {
                name: '724 Dijital - Modern Software & Digital Agency',
                slug: '724-dijital',
                client: '724 Dijital',
                category: 'web-development',
                industry: 'Digital Marketing / Software Development',
                status: 'published',
                featured: true,
                thumbnail: '/images/portfolio/724dijital.png',
                images: ['/images/portfolio/724dijital.png'],
                description: 'A sleek and premium digital agency presence designed to showcase modern software development and digital transformation solutions for SMEs.',
                fullDescription: 'We built 724 Dijital\'s own digital home, focusing on a premium user experience that reflects their expertise in software and marketing. The site features dynamic service showcases, a lead generation system, and a modern aesthetic with smooth animations using Framer Motion.',
                challenge: 'SMEs often struggle to find trustworthy digital partners who can explain complex technology in a clear, business-focused way.',
                solution: 'A "trust-first" design approach that uses high-end aesthetics, clear service definitions, and a seamless lead capture flow to position 724 Dijital as a leader in digital transformation.',
                technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'PostgreSQL'],
                results: [
                    { metric: 'Trust Score', value: '98%' },
                    { metric: 'Load Speed', value: '<1.2s' },
                    { metric: 'Lead conversion', value: '+45%' }
                ],
                projectUrl: 'https://724dijital.com/',
                completedDate: new Date(),
            },
            translations: [
                {
                    locale: 'tr',
                    name: '724 Dijital - Modern Yazılım ve Dijital Ajans',
                    description: 'KOBİ\'ler için modern yazılım geliştirme ve dijital dönüşüm çözümlerini sergilemek üzere tasarlanmış şık ve premium bir dijital ajans varlığı.',
                    fullDescription: '724 Dijital\'in kendi dijital evini, yazılım ve pazarlama konularındaki uzmanlıklarını yansıtan premium bir kullanıcı deneyimine odaklanarak inşa ettik. Site, dinamik hizmet vitrinleri, bir potansiyel müşteri oluşturma sistemi ve Framer Motion kullanarak akıcı animasyonlara sahip modern bir tasarım sunuyor.',
                    challenge: 'KOBİ\'ler genellikle karmaşık teknolojiyi net, iş odaklı bir şekilde açıklayabilecek güvenilir dijital ortaklar bulmakta zorlanırlar.',
                    solution: '724 Dijital\'i dijital dönüşümde lider olarak konumlandırmak için üst düzey estetik, net hizmet tanımları ve sorunsuz bir potansiyel müşteri yakalama akışı kullanan "önce güven" tasarım yaklaşımı.'
                }
            ],
            services: ['web-development', 'digital-marketing', 'ui-ux-design', 'api-development']
        }
    ];

    for (const projectData of projects) {
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
            title: project.slug === 'sivtech-makina' ? 'Sivtech Makina' : '724 Dijital',
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
    }

    console.log('\n=== Done ===');
    await prisma.$disconnect();
}

addProjects().catch(err => {
    console.error('Error adding projects:', err);
    process.exit(1);
});
