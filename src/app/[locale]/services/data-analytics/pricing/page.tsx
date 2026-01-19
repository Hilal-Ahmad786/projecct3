import { CheckIcon } from '@heroicons/react/24/solid';

export default function PricingPage() {
    const tiers = [
        {
            name: 'Starter',
            price: '$5,000',
            description: 'Perfect for small businesses getting started with data analytics.',
            features: [
                'Up to 3 data source connections',
                '5 custom dashboard views',
                'Basic KPI tracking',
                'Monthly performance reports',
                'Email support',
                '30-day training included'
            ],
            highlighted: false,
            cta: 'Get Started'
        },
        {
            name: 'Professional',
            price: '$12,000',
            description: 'Comprehensive analytics solution for growing organizations.',
            features: [
                'Unlimited data source connections',
                '15 custom dashboard views',
                'Advanced predictive analytics',
                'Real-time data refresh',
                'Custom report builder',
                'Priority support',
                '60-day training & onboarding',
                'Mobile dashboard access'
            ],
            highlighted: true,
            cta: 'Most Popular'
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            description: 'Tailored analytics platform for large-scale enterprise needs.',
            features: [
                'Everything in Professional',
                'Dedicated data warehouse setup',
                'Custom ML model development',
                'White-label dashboards',
                'API access & integrations',
                'Dedicated account manager',
                'On-site training sessions',
                'SLA guarantee (99.9% uptime)'
            ],
            highlighted: false,
            cta: 'Contact Sales'
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Analytics Solutions Pricing
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Transparent pricing for data analytics services tailored to your business needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-2xl border p-8 ${
                                tier.highlighted
                                    ? 'border-cyan-500 shadow-xl scale-105'
                                    : 'border-gray-200 hover:border-cyan-200'
                            } transition-all duration-300`}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                                <div className="text-4xl font-bold text-cyan-600 mb-2">{tier.price}</div>
                                <p className="text-gray-600">{tier.description}</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3">
                                        <CheckIcon className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    tier.highlighted
                                        ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                }`}
                            >
                                {tier.cta}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto text-center mt-16">
                    <p className="text-gray-600">
                        All pricing is project-based. Monthly retainer options available for ongoing analytics support.
                        <br />
                        <a href="/contact" className="text-cyan-600 hover:text-cyan-700 font-medium">Contact us</a> for a custom quote tailored to your specific requirements.
                    </p>
                </div>
            </div>
        </main>
    );
}
