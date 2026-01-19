import Link from 'next/link';

export default function PricingPage() {
    const tiers = [
        {
            name: 'Starter',
            price: '$1,500',
            period: '/month',
            description: 'Perfect for small businesses starting their digital marketing journey.',
            features: [
                'SEO audit & basic optimization',
                'Google Ads management (up to $2K spend)',
                'Social media management (2 platforms)',
                'Monthly performance reports',
                'Email marketing (up to 5K subscribers)',
                '2 blog posts per month'
            ],
            cta: 'Get Started',
            highlighted: false
        },
        {
            name: 'Growth',
            price: '$3,500',
            period: '/month',
            description: 'Ideal for growing businesses ready to scale their marketing efforts.',
            features: [
                'Advanced SEO strategy & implementation',
                'Google & Meta Ads management (up to $10K spend)',
                'Social media management (4 platforms)',
                'Weekly performance reports',
                'Email marketing automation',
                '4 blog posts per month',
                'Conversion rate optimization',
                'A/B testing & analytics'
            ],
            cta: 'Scale Up',
            highlighted: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            description: 'Full-service marketing for established brands with ambitious goals.',
            features: [
                'Full-funnel marketing strategy',
                'Unlimited ad spend management',
                'All social platforms',
                'Real-time dashboards & reporting',
                'Advanced marketing automation',
                'Content strategy & production',
                'Influencer partnership management',
                'Dedicated account team',
                'Quarterly strategy reviews'
            ],
            cta: 'Contact Sales',
            highlighted: false
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-rose-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Marketing Plans That Scale
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Transparent pricing with no hidden fees. Choose the plan that fits your business goals.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl p-8 ${
                                tier.highlighted
                                    ? 'bg-rose-600 text-white ring-4 ring-rose-600 ring-offset-2'
                                    : 'bg-white border border-gray-200'
                            }`}
                        >
                            <h3 className={`text-xl font-bold mb-2 ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                {tier.name}
                            </h3>
                            <div className="mb-4">
                                <span className={`text-4xl font-bold ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                    {tier.price}
                                </span>
                                <span className={tier.highlighted ? 'text-rose-100' : 'text-gray-500'}>
                                    {tier.period}
                                </span>
                            </div>
                            <p className={`mb-6 ${tier.highlighted ? 'text-rose-100' : 'text-gray-600'}`}>
                                {tier.description}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <svg
                                            className={`w-5 h-5 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-rose-200' : 'text-rose-500'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className={tier.highlighted ? 'text-rose-50' : 'text-gray-600'}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/contact"
                                className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                                    tier.highlighted
                                        ? 'bg-white text-rose-600 hover:bg-rose-50'
                                        : 'bg-rose-600 text-white hover:bg-rose-700'
                                }`}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-4">
                        All plans include a 14-day money-back guarantee. Cancel anytime.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Need a custom solution? <Link href="/contact" className="text-rose-600 hover:underline">Contact us</Link> for a tailored proposal.
                    </p>
                </div>
            </div>
        </main>
    );
}
