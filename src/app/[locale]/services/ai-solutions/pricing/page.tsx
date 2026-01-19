import { CheckIcon } from '@heroicons/react/24/solid';

const packages = [
    {
        name: 'Starter',
        price: '$4,999',
        description: 'Perfect for small projects and proof of concepts',
        features: [
            'Single AI model development',
            'Basic data preprocessing',
            'API integration',
            'Email support',
            '1 month maintenance',
            'Documentation'
        ],
        highlighted: false
    },
    {
        name: 'Professional',
        price: '$12,999',
        description: 'Ideal for growing businesses with complex needs',
        features: [
            'Multiple AI models',
            'Advanced data pipeline',
            'Custom API development',
            'Priority support',
            '3 months maintenance',
            'Training sessions',
            'Performance monitoring',
            'Model retraining'
        ],
        highlighted: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Comprehensive AI transformation for large organizations',
        features: [
            'Unlimited AI models',
            'End-to-end MLOps',
            'Dedicated AI team',
            '24/7 support',
            'Ongoing maintenance',
            'On-site training',
            'Custom integrations',
            'SLA guarantees',
            'Strategy consulting'
        ],
        highlighted: false
    }
];

export default function AIPricingPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-purple-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        AI Solution Packages
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Transparent pricing for AI solutions that deliver measurable ROI.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-2xl ${pkg.highlighted ? 'bg-purple-600 text-white ring-4 ring-purple-300' : 'bg-white border border-gray-200'}`}
                        >
                            <h3 className={`text-2xl font-bold mb-2 ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                {pkg.name}
                            </h3>
                            <div className={`text-4xl font-bold mb-4 ${pkg.highlighted ? 'text-white' : 'text-purple-600'}`}>
                                {pkg.price}
                            </div>
                            <p className={`mb-6 ${pkg.highlighted ? 'text-purple-100' : 'text-gray-600'}`}>
                                {pkg.description}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <CheckIcon className={`w-5 h-5 flex-shrink-0 ${pkg.highlighted ? 'text-purple-200' : 'text-purple-600'}`} />
                                        <span className={pkg.highlighted ? 'text-purple-50' : 'text-gray-700'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    pkg.highlighted
                                        ? 'bg-white text-purple-600 hover:bg-purple-50'
                                        : 'bg-purple-600 text-white hover:bg-purple-700'
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
