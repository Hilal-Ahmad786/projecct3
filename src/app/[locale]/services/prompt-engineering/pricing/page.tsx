import { CheckIcon } from '@heroicons/react/24/solid';

const packages = [
    {
        name: 'Starter',
        price: '$2,499',
        description: 'Perfect for single-use case prompt optimization',
        features: [
            'Up to 10 prompt templates',
            'Basic prompt optimization',
            'Performance testing',
            'Documentation',
            '1 week delivery',
            'Email support'
        ],
        highlighted: false
    },
    {
        name: 'Professional',
        price: '$6,999',
        description: 'Comprehensive prompt library for your team',
        features: [
            'Up to 50 prompt templates',
            'Advanced chain-of-thought prompts',
            'Multi-model optimization',
            'A/B testing framework',
            'Custom prompt management tool',
            'Training workshop',
            '2-3 weeks delivery',
            '2 months support'
        ],
        highlighted: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Full-scale prompt engineering infrastructure',
        features: [
            'Unlimited prompt templates',
            'Custom prompt orchestration',
            'Multi-agent prompt systems',
            'Automated testing pipeline',
            'Version control integration',
            'Team training program',
            'Ongoing optimization',
            'Dedicated engineer'
        ],
        highlighted: false
    }
];

export default function PromptEngineeringPricingPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-rose-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Prompt Engineering Packages
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Maximize AI potential with expertly crafted prompts.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-2xl ${pkg.highlighted ? 'bg-rose-600 text-white ring-4 ring-rose-300' : 'bg-white border border-gray-200'}`}
                        >
                            <h3 className={`text-2xl font-bold mb-2 ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                {pkg.name}
                            </h3>
                            <div className={`text-4xl font-bold mb-4 ${pkg.highlighted ? 'text-white' : 'text-rose-600'}`}>
                                {pkg.price}
                            </div>
                            <p className={`mb-6 ${pkg.highlighted ? 'text-rose-100' : 'text-gray-600'}`}>
                                {pkg.description}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <CheckIcon className={`w-5 h-5 flex-shrink-0 ${pkg.highlighted ? 'text-rose-200' : 'text-rose-600'}`} />
                                        <span className={pkg.highlighted ? 'text-rose-50' : 'text-gray-700'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    pkg.highlighted
                                        ? 'bg-white text-rose-600 hover:bg-rose-50'
                                        : 'bg-rose-600 text-white hover:bg-rose-700'
                                }`}
                            >
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
