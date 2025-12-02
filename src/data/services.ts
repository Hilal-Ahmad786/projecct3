import {
    ComputerDesktopIcon,
    CodeBracketSquareIcon,
    DevicePhoneMobileIcon,
    CpuChipIcon,
} from '@heroicons/react/24/outline';
import { Locale } from '@/lib/i18n';

export interface ServiceData {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: any;
    heroImage: string;
    features: string[];
    process: {
        title: string;
        description: string;
        step: number;
    }[];
    technologies: {
        name: string;
        icon: string;
    }[];
    benefits: string[];
    faq: {
        question: string;
        answer: string;
    }[];
    portfolio: {
        title: string;
        category: string;
        image: string;
    }[];
}

// Helper to get data for a specific locale
// In a real app, you might split this into separate files per locale
const servicesDataByLocale: Record<string, ServiceData[]> = {
    en: [
        {
            id: 'web-development',
            slug: 'web-development',
            title: 'Web Development',
            shortDescription: 'Custom, high-performance websites built with cutting-edge technology.',
            fullDescription: 'We build more than just websites; we build digital experiences. Our web development team leverages the latest frameworks like Next.js and React to create blazing-fast, SEO-optimized, and scalable web applications tailored to your business goals. Whether you need a corporate site, a complex SaaS platform, or a custom portal, we deliver code that performs.',
            icon: ComputerDesktopIcon,
            heroImage: '/images/services/web-dev-hero.jpg',
            features: [
                'Custom Next.js & React Development',
                'Progressive Web Apps (PWA)',
                'API Integration & Development',
                'Performance Optimization (Core Web Vitals)',
                'Headless CMS Solutions',
                'Responsive & Mobile-First Design'
            ],
            process: [
                {
                    step: 1,
                    title: 'Discovery & Strategy',
                    description: 'We start by understanding your business, your audience, and your goals to define the technical roadmap.'
                },
                {
                    step: 2,
                    title: 'UX/UI Design',
                    description: 'Our designers create intuitive, high-fidelity prototypes that align with your brand identity.'
                },
                {
                    step: 3,
                    title: 'Development',
                    description: 'We write clean, semantic code using modern standards, ensuring scalability and security.'
                },
                {
                    step: 4,
                    title: 'Testing & Launch',
                    description: 'Rigorous testing across devices and browsers ensures a flawless launch day.'
                }
            ],
            technologies: [
                { name: 'Next.js', icon: 'nextjs' },
                { name: 'React', icon: 'react' },
                { name: 'TypeScript', icon: 'typescript' },
                { name: 'Tailwind CSS', icon: 'tailwind' },
                { name: 'Node.js', icon: 'nodejs' },
                { name: 'PostgreSQL', icon: 'postgresql' }
            ],
            benefits: [
                'Lightning-fast load times',
                'Superior SEO ranking potential',
                'Scalable architecture for growth',
                'Secure and maintainable code'
            ],
            faq: [
                {
                    question: 'How long does it take to build a website?',
                    answer: 'A standard corporate website typically takes 4-6 weeks, while more complex web applications can take 3-6 months depending on the scope and features.'
                },
                {
                    question: 'Do you provide hosting and maintenance?',
                    answer: 'Yes, we offer comprehensive maintenance packages that include secure hosting, daily backups, and regular security updates.'
                },
                {
                    question: 'Will my website be mobile-friendly?',
                    answer: 'Absolutely. We take a mobile-first approach, ensuring your site looks and performs perfectly on smartphones, tablets, and desktops.'
                },
                {
                    question: 'Can I update the content myself?',
                    answer: 'Yes, we integrate user-friendly Content Management Systems (CMS) that allow you to easily update text, images, and blog posts without coding.'
                }
            ],
            portfolio: [
                { title: 'E-Commerce Platform', category: 'Retail', image: '/images/portfolio/project1.jpg' },
                { title: 'Corporate Portal', category: 'Finance', image: '/images/portfolio/project2.jpg' },
                { title: 'SaaS Dashboard', category: 'Tech', image: '/images/portfolio/project3.jpg' }
            ]
        },
        {
            id: 'ai-solutions',
            slug: 'ai-solutions',
            title: 'AI Solutions',
            shortDescription: 'Intelligent automation and machine learning models.',
            fullDescription: 'Unlock the power of Artificial Intelligence. From predictive analytics to natural language processing chatbots, we integrate state-of-the-art AI models into your workflows.',
            icon: CpuChipIcon,
            heroImage: '/images/services/ai-hero.jpg',
            features: ['Custom ML Models', 'NLP & Chatbots', 'Predictive Analytics'],
            process: [],
            technologies: [],
            benefits: [],
            faq: [],
            portfolio: []
        },
        {
            id: 'mobile-development',
            slug: 'mobile-development',
            title: 'Mobile Development',
            shortDescription: 'Native and cross-platform mobile apps.',
            fullDescription: 'Reach your customers wherever they are. We design and develop beautiful, user-friendly mobile applications for iOS and Android.',
            icon: DevicePhoneMobileIcon,
            heroImage: '/images/services/mobile-hero.jpg',
            features: ['iOS & Android', 'React Native', 'Flutter'],
            process: [],
            technologies: [],
            benefits: [],
            faq: [],
            portfolio: []
        }
    ],
    // Fallback for other languages (clone EN for now, can be translated later)
    tr: [],
    de: [],
    ur: [],
    ar: []
};

// Populate other locales with EN data for prototype purposes
// In production, these would be actual translations
['tr', 'de', 'ur', 'ar'].forEach(locale => {
    servicesDataByLocale[locale] = servicesDataByLocale['en'].map(service => ({
        ...service,
        title: locale === 'tr' && service.id === 'web-development' ? 'Web Geliştirme' : service.title, // Simple example
        fullDescription: locale === 'tr' ? '[TR] ' + service.fullDescription : service.fullDescription
    }));
});

export function getServiceBySlug(slug: string, locale: string = 'en'): ServiceData | undefined {
    const localeData = servicesDataByLocale[locale] || servicesDataByLocale['en'];
    return localeData.find(service => service.slug === slug);
}
