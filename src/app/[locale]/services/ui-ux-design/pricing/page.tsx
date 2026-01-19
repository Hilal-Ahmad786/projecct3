import { CheckIcon } from '@heroicons/react/24/solid';

const pricingTiers = [
    {
        name: 'Starter',
        price: '$2,500',
        period: 'starting at',
        description: 'Perfect for startups and small projects needing essential design work.',
        features: [
            'Up to 5 screens/pages',
            'Mobile-first responsive design',
            'Basic wireframes',
            'Visual design mockups',
            'One revision round',
            '2-week delivery',
            'Figma file handoff'
        ],
        cta: 'Get Started',
        highlighted: false
    },
    {
        name: 'Professional',
        price: '$7,500',
        period: 'starting at',
        description: 'Comprehensive design for growing businesses with complex requirements.',
        features: [
            'Up to 15 screens/pages',
            'User research & personas',
            'Detailed wireframes',
            'High-fidelity prototypes',
            'Interactive animations',
            'Design system basics',
            'Three revision rounds',
            '4-week delivery',
            'Developer support session'
        ],
        cta: 'Most Popular',
        highlighted: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: 'tailored solution',
        description: 'Full-scale design partnership for large organizations and complex products.',
        features: [
            'Unlimited screens/pages',
            'In-depth user research',
            'Usability testing',
            'Complete design system',
            'Advanced prototyping',
            'Accessibility compliance',
            'Unlimited revisions',
            'Dedicated design team',
            'Ongoing support & maintenance',
            'Priority communication'
        ],
        cta: 'Contact Us',
        highlighted: false
    }
];

export default function PricingPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-pink-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Transparent Design Pricing
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Choose the package that fits your project needs. All prices are starting points and can be customized.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`rounded-2xl p-8 ${
                                tier.highlighted
                                    ? 'bg-pink-600 text-white ring-4 ring-pink-600 ring-offset-4'
                                    : 'bg-white border border-gray-200'
                            }`}
                        >
                            <div className="text-center mb-8">
                                <h3 className={`text-xl font-bold mb-2 ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                    {tier.name}
                                </h3>
                                <div className="mb-2">
                                    <span className={`text-4xl font-bold ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                        {tier.price}
                                    </span>
                                </div>
                                <p className={`text-sm ${tier.highlighted ? 'text-pink-100' : 'text-gray-500'}`}>
                                    {tier.period}
                                </p>
                                <p className={`mt-4 text-sm ${tier.highlighted ? 'text-pink-100' : 'text-gray-600'}`}>
                                    {tier.description}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-pink-200' : 'text-pink-500'}`} />
                                        <span className={tier.highlighted ? 'text-white' : 'text-gray-600'}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                                    tier.highlighted
                                        ? 'bg-white text-pink-600 hover:bg-pink-50'
                                        : 'bg-pink-600 text-white hover:bg-pink-700'
                                }`}
                            >
                                {tier.cta}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto mt-16 text-center">
                    <p className="text-gray-600">
                        Need something different? <a href="/contact" className="text-pink-600 font-medium hover:underline">Contact us</a> for a custom quote tailored to your specific requirements.
                    </p>
                </div>
            </div>
        </main>
    );
}
