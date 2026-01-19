import { getTechIcon } from '@/components/icons/TechIcons';

export default function TechStackPage() {
    const techCategories = [
        {
            category: 'E-Commerce Platforms',
            items: [
                { name: 'Shopify', description: 'Hosted platform with quick setup and extensive app ecosystem' },
                { name: 'Shopify Plus', description: 'Enterprise solution with advanced customization and APIs' },
                { name: 'WooCommerce', description: 'WordPress-based solution with full code access' },
                { name: 'Magento', description: 'Enterprise-grade platform for large-scale operations' },
                { name: 'BigCommerce', description: 'SaaS platform with built-in B2B features' }
            ]
        },
        {
            category: 'Payment Gateways',
            items: [
                { name: 'Stripe', description: 'Developer-friendly with extensive API and global coverage' },
                { name: 'PayPal', description: 'Trusted worldwide with buyer protection features' },
                { name: 'Square', description: 'Unified online and in-person payment processing' },
                { name: 'Authorize.net', description: 'Enterprise payment gateway with fraud detection' },
                { name: 'Klarna', description: 'Buy now, pay later solution to boost conversions' }
            ]
        },
        {
            category: 'Frontend Technologies',
            items: [
                { name: 'Next.js', description: 'React framework for headless commerce storefronts' },
                { name: 'React', description: 'Component-based UI for dynamic shopping experiences' },
                { name: 'Tailwind CSS', description: 'Utility-first CSS for rapid custom styling' },
                { name: 'TypeScript', description: 'Type-safe code for maintainable applications' },
                { name: 'Hydrogen', description: 'Shopify framework for custom storefronts' }
            ]
        },
        {
            category: 'Backend & Infrastructure',
            items: [
                { name: 'Node.js', description: 'JavaScript runtime for scalable backend services' },
                { name: 'PostgreSQL', description: 'Relational database for order and inventory data' },
                { name: 'Redis', description: 'In-memory caching for fast product lookups' },
                { name: 'AWS', description: 'Cloud infrastructure for enterprise scalability' },
                { name: 'Vercel', description: 'Edge deployment for fastest page loads' }
            ]
        },
        {
            category: 'Search & Optimization',
            items: [
                { name: 'Algolia', description: 'AI-powered search with typo tolerance and filters' },
                { name: 'Elasticsearch', description: 'Open-source search for large product catalogs' },
                { name: 'Contentful', description: 'Headless CMS for product content management' },
                { name: 'Cloudinary', description: 'Image optimization and transformation CDN' },
                { name: 'Segment', description: 'Customer data platform for personalization' }
            ]
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-emerald-400 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Technology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        E-Commerce Tech Stack
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        We leverage industry-leading platforms and technologies to build scalable, high-converting online stores that grow with your business.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto space-y-12">
                    {techCategories.map((category) => (
                        <div key={category.category}>
                            <h2 className="text-2xl font-bold text-emerald-400 mb-6">{category.category}</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {category.items.map((tech) => {
                                    const Icon = getTechIcon(tech.name);
                                    return (
                                        <div key={tech.name} className="p-5 bg-gray-800 rounded-lg border border-gray-700 hover:border-emerald-500 transition-colors group flex items-start gap-4">
                                            <div className="w-10 h-10 text-emerald-400 flex-shrink-0">
                                                <Icon className="w-full h-full" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg group-hover:text-emerald-400 transition-colors mb-2">{tech.name}</h3>
                                                <p className="text-gray-400 text-sm">{tech.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-5xl mx-auto mt-16">
                    <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-8 text-center">Platform Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="py-4 px-4">Platform</th>
                                        <th className="py-4 px-4">Best For</th>
                                        <th className="py-4 px-4">Scalability</th>
                                        <th className="py-4 px-4">Customization</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-700/50">
                                        <td className="py-4 px-4 text-emerald-400 font-semibold">Shopify</td>
                                        <td className="py-4 px-4 text-gray-400">Quick launch, ease of use</td>
                                        <td className="py-4 px-4 text-gray-400">Medium</td>
                                        <td className="py-4 px-4 text-gray-400">Theme-based</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/50">
                                        <td className="py-4 px-4 text-emerald-400 font-semibold">WooCommerce</td>
                                        <td className="py-4 px-4 text-gray-400">WordPress integration</td>
                                        <td className="py-4 px-4 text-gray-400">Medium-High</td>
                                        <td className="py-4 px-4 text-gray-400">Full code access</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/50">
                                        <td className="py-4 px-4 text-emerald-400 font-semibold">Magento</td>
                                        <td className="py-4 px-4 text-gray-400">Enterprise, complex catalogs</td>
                                        <td className="py-4 px-4 text-gray-400">Very High</td>
                                        <td className="py-4 px-4 text-gray-400">Unlimited</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4 text-emerald-400 font-semibold">Headless</td>
                                        <td className="py-4 px-4 text-gray-400">Unique requirements, omnichannel</td>
                                        <td className="py-4 px-4 text-gray-400">Very High</td>
                                        <td className="py-4 px-4 text-gray-400">Unlimited</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
