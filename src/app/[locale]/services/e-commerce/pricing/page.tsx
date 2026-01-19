import { CheckIcon } from '@heroicons/react/24/solid';

export default function PricingPage() {
    const pricingTiers = [
        {
            name: 'Starter Store',
            price: '$8,000 - $15,000',
            description: 'Perfect for small businesses launching their first online store.',
            features: [
                'Shopify or WooCommerce setup',
                'Custom theme customization',
                'Up to 100 products',
                'Payment gateway integration',
                'Basic SEO optimization',
                'Mobile responsive design',
                '2 weeks of post-launch support',
                'Training documentation'
            ],
            popular: false,
            cta: 'Get Started'
        },
        {
            name: 'Growth Store',
            price: '$15,000 - $35,000',
            description: 'For growing businesses that need advanced features and integrations.',
            features: [
                'Everything in Starter, plus:',
                'Custom design & development',
                'Up to 1,000 products',
                'Inventory management system',
                'Multi-currency support',
                'Advanced analytics dashboard',
                'Email marketing integration',
                'Loyalty program setup',
                '1 month of post-launch support',
                'Priority support channel'
            ],
            popular: true,
            cta: 'Most Popular'
        },
        {
            name: 'Enterprise',
            price: '$35,000+',
            description: 'Custom enterprise solutions for large-scale e-commerce operations.',
            features: [
                'Everything in Growth, plus:',
                'Unlimited products',
                'Custom platform development',
                'ERP/CRM integration',
                'B2B portal & pricing',
                'Multi-warehouse support',
                'Advanced personalization',
                'Headless commerce option',
                '3 months of support',
                'Dedicated account manager',
                'SLA guarantee'
            ],
            popular: false,
            cta: 'Contact Us'
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-amber-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        E-Commerce Packages
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Transparent pricing for every stage of your e-commerce journey. All packages include our proven development process.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-2xl p-8 ${
                                tier.popular
                                    ? 'border-2 border-amber-500 shadow-xl scale-105'
                                    : 'border border-gray-200'
                            }`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-amber-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                                <div className="text-3xl font-bold text-amber-600 mb-3">{tier.price}</div>
                                <p className="text-gray-500 text-sm">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                    tier.popular
                                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                }`}
                            >
                                {tier.cta}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto mt-16 text-center">
                    <div className="bg-white rounded-2xl p-8 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
                        <p className="text-gray-600 mb-6">
                            Every business is unique. Contact us for a personalized quote tailored to your specific requirements and goals.
                        </p>
                        <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                            Schedule a Consultation
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
