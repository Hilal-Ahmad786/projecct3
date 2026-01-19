export default function PortfolioPage() {
    const projects = [
        {
            id: 1,
            name: 'LuxeStyle Fashion',
            industry: 'Fashion & Apparel',
            type: 'Shopify Plus',
            description: 'High-end fashion retailer with multi-currency support, AR virtual try-on features, and a custom loyalty program that increased repeat purchases by 65%.',
            results: '280% increase in online sales',
            challenge: 'Needed a premium shopping experience that matched their luxury brand positioning while handling high-volume flash sales.',
            solution: 'Built a custom Shopify Plus theme with AR integration, implemented Stripe for global payments, and created a points-based loyalty system.',
            features: ['Custom Shopify theme', 'AR try-on integration', 'Multi-currency (12 currencies)', 'VIP loyalty program', 'Flash sale infrastructure']
        },
        {
            id: 2,
            name: 'TechGear Pro',
            industry: 'Electronics & Gadgets',
            type: 'WooCommerce',
            description: 'Electronics superstore with complex product configurations, B2B wholesale portal, and real-time inventory sync across 3 warehouses.',
            results: '150% conversion rate improvement',
            challenge: 'Required advanced product configuration options and separate B2B pricing while maintaining a seamless B2C experience.',
            solution: 'Custom WooCommerce build with product configurator, wholesale pricing tiers, and ERP integration for real-time inventory.',
            features: ['Product configurator', 'B2B wholesale portal', 'Multi-warehouse inventory', 'Reviews & Q&A system', 'Trade-in program']
        },
        {
            id: 3,
            name: 'Organic Harvest',
            industry: 'Food & Beverage',
            type: 'Custom Next.js + Shopify',
            description: 'Subscription-based organic food delivery service with route optimization, recipe integration, and a mobile app for customer convenience.',
            results: '45% reduction in customer churn',
            challenge: 'Needed flexible subscription management with delivery zone restrictions and integration with their recipe blog.',
            solution: 'Headless commerce with Next.js frontend, Shopify backend, custom subscription engine, and route optimization API.',
            features: ['Flexible subscriptions', 'Delivery zone management', 'Recipe meal planning', 'Mobile app (iOS/Android)', 'Nutrition tracking']
        },
        {
            id: 4,
            name: 'HomeDecor Plus',
            industry: 'Home & Living',
            type: 'Magento Commerce',
            description: 'Large catalog home goods retailer with 3D room visualization, allowing customers to see furniture in their space before purchasing.',
            results: '200% increase in average order value',
            challenge: 'Managing 50,000+ SKUs with complex product relationships while providing immersive shopping experiences.',
            solution: 'Magento Commerce with Algolia search, custom 3D room planner, and advanced product recommendations.',
            features: ['3D room visualization', '50K+ product catalog', 'AR furniture preview', 'Design consultation booking', 'Saved room projects']
        },
        {
            id: 5,
            name: 'FitLife Supplements',
            industry: 'Health & Wellness',
            type: 'Shopify',
            description: 'Sports nutrition brand with subscription bundles, personalized product recommendations based on fitness goals, and influencer storefront system.',
            results: '320% growth in subscription revenue',
            challenge: 'Creating personalized shopping experiences for different customer segments (bodybuilders, runners, casual fitness).',
            solution: 'Shopify with custom quiz-based recommendations, subscription bundles, and white-label influencer storefronts.',
            features: ['Quiz-based recommendations', 'Subscription bundles', 'Influencer storefronts', 'Goal tracking integration', 'Rewards program']
        },
        {
            id: 6,
            name: 'Global Artisan Marketplace',
            industry: 'Multi-Vendor Marketplace',
            type: 'Custom Platform',
            description: 'International marketplace connecting artisan sellers with global buyers, featuring multi-vendor management and cross-border payments.',
            results: '500+ active sellers onboarded in 6 months',
            challenge: 'Building a scalable multi-vendor platform with international payment splits and seller analytics dashboards.',
            solution: 'Custom Next.js platform with Stripe Connect for split payments, seller dashboards, and automated payout systems.',
            features: ['Multi-vendor management', 'Stripe Connect payouts', 'Seller analytics', 'Cross-border shipping', 'Dispute resolution']
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Our Work
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        E-Commerce Success Stories
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Explore our portfolio of successful e-commerce projects across Shopify, WooCommerce, Magento, and custom platforms that have driven real business results.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projects.map((project) => (
                        <div key={project.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="aspect-video bg-gradient-to-br from-emerald-100 to-emerald-50 relative flex items-center justify-center">
                                <div className="text-emerald-500 font-bold text-7xl opacity-20">{project.id}</div>
                                <div className="absolute inset-0 bg-emerald-500/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white border-2 border-white px-6 py-2 rounded-full font-medium">View Case Study</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                                    <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">{project.type}</span>
                                </div>
                                <p className="text-emerald-600 text-sm font-medium mb-3">{project.industry}</p>
                                <p className="text-gray-600 mb-4">{project.description}</p>

                                <div className="bg-emerald-50 rounded-lg p-4 mb-4">
                                    <div className="text-emerald-700 font-bold text-lg">{project.results}</div>
                                </div>

                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Challenge:</h4>
                                    <p className="text-gray-500 text-sm">{project.challenge}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {project.features.map((feature, idx) => (
                                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto mt-16 text-center">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">Ready to Build Your Online Store?</h2>
                        <p className="text-emerald-100 mb-6">
                            Let us help you create an e-commerce experience that converts visitors into loyal customers.
                        </p>
                        <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
                            Start Your Project
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
