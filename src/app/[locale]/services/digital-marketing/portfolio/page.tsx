export default function PortfolioPage() {
    const projects = [
        {
            title: 'E-Commerce Revenue Explosion',
            industry: 'Fashion & Apparel',
            type: 'Full-Funnel Paid Media',
            result: '450% ROAS',
            metrics: [
                { label: 'Revenue Increase', value: '$2.4M' },
                { label: 'Customer Acquisition Cost', value: '-45%' },
                { label: 'Conversion Rate', value: '+180%' }
            ],
            description: 'Launched comprehensive paid media strategy for D2C fashion brand including Google Shopping, Meta dynamic ads, and influencer partnerships. Implemented advanced audience segmentation and creative testing framework.',
            services: ['Google Ads', 'Meta Ads', 'Influencer Marketing', 'Email Marketing']
        },
        {
            title: 'B2B SaaS Lead Generation Machine',
            industry: 'Enterprise Software',
            type: 'LinkedIn & Google Ads',
            result: '200+ MQLs/month',
            metrics: [
                { label: 'Cost Per Lead', value: '-62%' },
                { label: 'Lead Quality Score', value: '+85%' },
                { label: 'Sales Pipeline', value: '$4.2M' }
            ],
            description: 'Developed multi-channel ABM strategy targeting enterprise decision-makers. Combined LinkedIn advertising with Google search campaigns and gated content marketing to fill sales pipeline.',
            services: ['LinkedIn Ads', 'Google Ads', 'Content Marketing', 'Marketing Automation']
        },
        {
            title: 'Healthcare Practice SEO Domination',
            industry: 'Medical & Healthcare',
            type: 'SEO & Content Marketing',
            result: '#1 for 75+ keywords',
            metrics: [
                { label: 'Organic Traffic', value: '+340%' },
                { label: 'New Patient Inquiries', value: '+210%' },
                { label: 'Local Pack Rankings', value: '15 locations' }
            ],
            description: 'Transformed local visibility for multi-location medical practice with comprehensive local SEO strategy, content hub development, and reputation management across Google Business profiles.',
            services: ['Local SEO', 'Content Marketing', 'Reputation Management', 'Technical SEO']
        },
        {
            title: 'Viral Social Media Growth Campaign',
            industry: 'Beauty & Cosmetics',
            type: 'Social Media Marketing',
            result: '500K+ followers',
            metrics: [
                { label: 'Engagement Rate', value: '8.5%' },
                { label: 'User-Generated Content', value: '10K+ posts' },
                { label: 'Brand Awareness', value: '+320%' }
            ],
            description: 'Built explosive social presence through strategic influencer partnerships, viral content creation, and community management. Launched successful TikTok strategy generating millions of organic views.',
            services: ['Social Media Strategy', 'Influencer Marketing', 'Content Creation', 'Community Management']
        },
        {
            title: 'Subscription Box Customer Retention',
            industry: 'Consumer Products',
            type: 'Email & CRM Marketing',
            result: '35% churn reduction',
            metrics: [
                { label: 'Email Revenue', value: '+280%' },
                { label: 'Customer LTV', value: '+65%' },
                { label: 'Reactivation Rate', value: '22%' }
            ],
            description: 'Implemented sophisticated email marketing automation with personalized customer journeys, win-back campaigns, and loyalty program integration that dramatically improved retention metrics.',
            services: ['Email Marketing', 'Marketing Automation', 'CRM Strategy', 'Customer Segmentation']
        },
        {
            title: 'Restaurant Chain Local Marketing',
            industry: 'Food & Beverage',
            type: 'Local Digital Marketing',
            result: '45% foot traffic increase',
            metrics: [
                { label: 'Google Maps Views', value: '+520%' },
                { label: 'Online Orders', value: '+180%' },
                { label: 'Review Rating', value: '4.8 stars' }
            ],
            description: 'Executed hyperlocal marketing strategy for 25-location restaurant chain including local SEO, geotargeted ads, social media management, and online ordering integration.',
            services: ['Local SEO', 'Geo-targeted Ads', 'Social Media', 'Reputation Management']
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-pink-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Case Studies
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Marketing Success Stories
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Explore our portfolio of successful digital marketing campaigns with measurable results across diverse industries and marketing channels.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <div key={index} className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-pink-200 hover:shadow-xl transition-all duration-300">
                            <div className="aspect-[16/9] bg-gradient-to-br from-pink-100 via-pink-50 to-purple-50 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center p-6">
                                        <div className="text-pink-600 font-bold text-4xl mb-2">{project.result}</div>
                                        <div className="text-gray-500 text-sm font-medium">{project.type}</div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-pink-600/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-center text-white p-6">
                                        <p className="font-semibold mb-4">Key Metrics</p>
                                        <div className="space-y-2">
                                            {project.metrics.map((metric, i) => (
                                                <div key={i} className="flex justify-between gap-4 text-sm">
                                                    <span className="text-pink-200">{metric.label}</span>
                                                    <span className="font-bold">{metric.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-3 py-1 bg-pink-100 text-pink-600 text-xs font-medium rounded-full">
                                        {project.industry}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.services.map((service, i) => (
                                        <span key={i} className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 max-w-3xl mx-auto border border-pink-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Be Our Next Success Story?</h3>
                        <p className="text-gray-600 mb-6">
                            Let us show you how our data-driven marketing strategies can transform your business results.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-pink-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                        >
                            Get Your Free Marketing Audit
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
