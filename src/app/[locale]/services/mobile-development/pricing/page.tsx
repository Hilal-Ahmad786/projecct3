import { CheckIcon } from '@heroicons/react/24/solid';

const packages = [
    {
        name: 'MVP',
        price: '$9,999',
        description: 'Launch your idea quickly with essential features',
        features: [
            'Single platform (iOS or Android)',
            'Core feature set',
            'Basic UI design',
            'Push notifications',
            'Email support',
            '1 month bug fixes',
            'App store submission'
        ],
        highlighted: false
    },
    {
        name: 'Professional',
        price: '$24,999',
        description: 'Full-featured app for growing businesses',
        features: [
            'Cross-platform (iOS & Android)',
            'Custom UI/UX design',
            'Backend development',
            'User authentication',
            'Analytics integration',
            '3 months support',
            'ASO optimization',
            'Performance monitoring'
        ],
        highlighted: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Complex apps with advanced requirements',
        features: [
            'All platforms',
            'Advanced features',
            'Custom integrations',
            'Dedicated team',
            '24/7 support',
            'Ongoing maintenance',
            'Security audits',
            'SLA guarantees',
            'White-label options'
        ],
        highlighted: false
    }
];

export default function MobilePricingPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-blue-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Mobile App Packages
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Flexible pricing options for mobile apps of any scale.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-2xl ${pkg.highlighted ? 'bg-blue-600 text-white ring-4 ring-blue-300' : 'bg-white border border-gray-200'}`}
                        >
                            <h3 className={`text-2xl font-bold mb-2 ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                {pkg.name}
                            </h3>
                            <div className={`text-4xl font-bold mb-4 ${pkg.highlighted ? 'text-white' : 'text-blue-600'}`}>
                                {pkg.price}
                            </div>
                            <p className={`mb-6 ${pkg.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                                {pkg.description}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <CheckIcon className={`w-5 h-5 flex-shrink-0 ${pkg.highlighted ? 'text-blue-200' : 'text-blue-600'}`} />
                                        <span className={pkg.highlighted ? 'text-blue-50' : 'text-gray-700'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    pkg.highlighted
                                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
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
