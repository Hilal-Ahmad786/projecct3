import Link from 'next/link';

export default function PricingPage() {
    const tiers = [
        {
            name: 'Essential',
            price: '$2,500',
            period: '/month',
            description: 'For small businesses needing foundational security coverage.',
            features: [
                'Vulnerability scanning (monthly)',
                'Firewall management',
                'Basic SIEM monitoring',
                'Email security',
                'Security awareness training',
                'Business hours support'
            ],
            highlighted: false,
            cta: 'Get Started'
        },
        {
            name: 'Professional',
            price: '$7,500',
            period: '/month',
            description: 'Comprehensive security for growing organizations.',
            features: [
                'Everything in Essential',
                'Continuous vulnerability management',
                '24/7 SOC monitoring',
                'Endpoint detection & response (EDR)',
                'Quarterly penetration testing',
                'Incident response planning',
                'Compliance support (SOC 2, ISO 27001)',
                'Priority support with 4-hour SLA'
            ],
            highlighted: true,
            cta: 'Most Popular'
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            description: 'Tailored security solutions for large enterprises.',
            features: [
                'Everything in Professional',
                'Dedicated security team',
                'Custom threat intelligence',
                'Red team exercises',
                'Executive security briefings',
                'Full compliance management',
                '24/7 dedicated support',
                'On-site security consulting'
            ],
            highlighted: false,
            cta: 'Contact Sales'
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-red-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Security Packages
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Flexible security solutions designed to fit your organization's needs and budget.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl p-8 ${tier.highlighted
                                    ? 'bg-red-600 text-white ring-4 ring-red-600 ring-offset-4'
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
                                <span className={tier.highlighted ? 'text-red-100' : 'text-gray-500'}>
                                    {tier.period}
                                </span>
                            </div>
                            <p className={`mb-6 ${tier.highlighted ? 'text-red-100' : 'text-gray-600'}`}>
                                {tier.description}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <svg
                                            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-red-200' : 'text-red-500'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className={tier.highlighted ? 'text-white' : 'text-gray-600'}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/contact"
                                className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${tier.highlighted
                                        ? 'bg-white text-red-600 hover:bg-gray-100'
                                        : 'bg-red-600 text-white hover:bg-red-700'
                                    }`}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto mt-16 text-center">
                    <p className="text-gray-600">
                        All packages include initial security assessment and onboarding.
                        <br />
                        Need a custom solution?{' '}
                        <Link href="/contact" className="text-red-600 font-medium hover:underline">
                            Contact us
                        </Link>{' '}
                        for a tailored security proposal.
                    </p>
                </div>
            </div>
        </main>
    );
}
