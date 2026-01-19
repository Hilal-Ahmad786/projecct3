import { CheckCircleIcon } from '@heroicons/react/24/solid';

const features = [
    {
        title: 'Custom Storefront Development',
        description: 'Build unique, branded shopping experiences with custom themes for Shopify, WooCommerce, or headless commerce solutions.'
    },
    {
        title: 'Shopping Cart & Checkout Optimization',
        description: 'Streamlined cart experiences with one-click checkout, guest checkout, and abandoned cart recovery to maximize conversions.'
    },
    {
        title: 'Payment Gateway Integration',
        description: 'Seamless integration with Stripe, PayPal, Square, Apple Pay, Google Pay, and regional payment methods worldwide.'
    },
    {
        title: 'Inventory Management System',
        description: 'Real-time stock tracking, multi-warehouse support, low-stock alerts, and automatic reorder notifications.'
    },
    {
        title: 'Order Processing & Fulfillment',
        description: 'Automated order workflows, shipping carrier integration, tracking updates, and returns management.'
    },
    {
        title: 'Customer Account & Loyalty Programs',
        description: 'Personalized customer portals, order history, wishlists, and points-based loyalty reward systems.'
    },
    {
        title: 'Product Search & Filtering',
        description: 'AI-powered search with Algolia or Elasticsearch, faceted filtering, and personalized product recommendations.'
    },
    {
        title: 'Multi-Currency & Multi-Language Support',
        description: 'Global commerce capabilities with automatic currency conversion, localized content, and regional tax compliance.'
    },
    {
        title: 'Mobile-First Responsive Design',
        description: 'Optimized mobile shopping experiences with PWA capabilities, touch-friendly interfaces, and fast load times.'
    },
    {
        title: 'Analytics & Conversion Tracking',
        description: 'Comprehensive dashboards with sales metrics, customer behavior insights, and integration with Google Analytics and Facebook Pixel.'
    }
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Capabilities
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        E-Commerce Features
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Comprehensive e-commerce solutions designed to maximize sales and deliver exceptional shopping experiences across Shopify, WooCommerce, and custom platforms.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 bg-emerald-50 rounded-xl border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 transition-colors">
                                    <CheckCircleIcon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto mt-16">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
                        <h2 className="text-2xl font-bold mb-4">Platform Expertise</h2>
                        <p className="text-emerald-100 mb-6">
                            We build on industry-leading platforms including Shopify, Shopify Plus, WooCommerce, Magento, and BigCommerce.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Custom Headless'].map((platform) => (
                                <span key={platform} className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                                    {platform}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
