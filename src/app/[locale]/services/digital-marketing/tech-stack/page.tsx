import { getTechIcon } from '@/components/icons/TechIcons';

export default function TechStackPage() {
    const techCategories = [
        {
            title: 'Analytics & Tracking',
            description: 'Tools to measure, analyze, and understand user behavior and campaign performance',
            tools: [
                { name: 'Google Analytics 4', description: 'Web analytics and reporting' },
                { name: 'Google Search Console', description: 'SEO performance monitoring' },
                { name: 'Hotjar', description: 'Heatmaps and session recordings' },
                { name: 'Mixpanel', description: 'Product and user analytics' },
                { name: 'Looker Studio', description: 'Data visualization dashboards' },
                { name: 'Google Tag Manager', description: 'Tag management system' }
            ]
        },
        {
            title: 'SEO & Research Tools',
            description: 'Comprehensive SEO analysis, keyword research, and competitive intelligence',
            tools: [
                { name: 'SEMrush', description: 'All-in-one SEO toolkit' },
                { name: 'Ahrefs', description: 'Backlink analysis and research' },
                { name: 'Moz Pro', description: 'SEO software and metrics' },
                { name: 'Screaming Frog', description: 'Technical SEO crawler' },
                { name: 'Surfer SEO', description: 'Content optimization' },
                { name: 'BrightLocal', description: 'Local SEO management' }
            ]
        },
        {
            title: 'Advertising Platforms',
            description: 'Paid media platforms for reaching your target audience at scale',
            tools: [
                { name: 'Google Ads', description: 'Search, display, and YouTube ads' },
                { name: 'Meta Ads Manager', description: 'Facebook and Instagram advertising' },
                { name: 'LinkedIn Campaign Manager', description: 'B2B advertising platform' },
                { name: 'TikTok Ads Manager', description: 'Short-form video advertising' },
                { name: 'Microsoft Advertising', description: 'Bing and partner network ads' },
                { name: 'The Trade Desk', description: 'Programmatic advertising DSP' }
            ]
        },
        {
            title: 'Marketing Automation',
            description: 'Platforms for automating marketing workflows and customer journeys',
            tools: [
                { name: 'HubSpot', description: 'Inbound marketing and CRM' },
                { name: 'Klaviyo', description: 'E-commerce email and SMS' },
                { name: 'ActiveCampaign', description: 'Email marketing automation' },
                { name: 'Mailchimp', description: 'Email campaigns and automation' },
                { name: 'Customer.io', description: 'Behavioral messaging platform' },
                { name: 'Zapier', description: 'Workflow automation' }
            ]
        },
        {
            title: 'Social Media Management',
            description: 'Tools for scheduling, publishing, and managing social media presence',
            tools: [
                { name: 'Hootsuite', description: 'Social media management' },
                { name: 'Sprout Social', description: 'Social publishing and analytics' },
                { name: 'Buffer', description: 'Social scheduling tool' },
                { name: 'Later', description: 'Visual content planner' },
                { name: 'Brandwatch', description: 'Social listening and analytics' },
                { name: 'Canva', description: 'Design and content creation' }
            ]
        },
        {
            title: 'CRO & Testing',
            description: 'Conversion optimization and experimentation tools',
            tools: [
                { name: 'Google Optimize', description: 'A/B testing platform' },
                { name: 'VWO', description: 'Conversion optimization suite' },
                { name: 'Optimizely', description: 'Experimentation platform' },
                { name: 'Unbounce', description: 'Landing page builder' },
                { name: 'Crazy Egg', description: 'Visual analytics and testing' },
                { name: 'FullStory', description: 'Digital experience analytics' }
            ]
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-pink-400 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Marketing Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Our Marketing Technology Stack
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        We leverage industry-leading tools and platforms to deliver data-driven marketing campaigns that maximize your ROI and business growth.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto space-y-12">
                    {techCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-pink-400 mb-2">{category.title}</h2>
                                <p className="text-gray-500">{category.description}</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {category.tools.map((tool, toolIndex) => {
                                    const Icon = getTechIcon(tool.name);
                                    return (
                                        <div
                                            key={toolIndex}
                                            className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-pink-500 transition-colors group"
                                        >
                                            <div className="text-center">
                                                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gray-700 group-hover:bg-pink-500/20 transition-colors flex items-center justify-center p-2 text-pink-400">
                                                    <Icon className="w-full h-full" />
                                                </div>
                                                <h3 className="font-medium text-sm mb-1">{tool.name}</h3>
                                                <p className="text-gray-500 text-xs">{tool.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-8 border border-pink-500/30 text-center">
                        <h3 className="text-2xl font-bold mb-4">Always Learning, Always Improving</h3>
                        <p className="text-gray-400 mb-6">
                            The digital marketing landscape evolves rapidly. Our team continuously evaluates and adopts new tools and technologies to ensure your campaigns leverage the best solutions available.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="px-4 py-2 bg-gray-800 rounded-full text-sm">
                                <span className="text-pink-400">50+</span> Tools in our stack
                            </div>
                            <div className="px-4 py-2 bg-gray-800 rounded-full text-sm">
                                <span className="text-pink-400">100%</span> Data-driven approach
                            </div>
                            <div className="px-4 py-2 bg-gray-800 rounded-full text-sm">
                                <span className="text-pink-400">24/7</span> Campaign monitoring
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
