import { CheckIcon } from '@heroicons/react/24/solid';

const packages = [
    {
        name: 'Starter',
        price: '$5,999',
        description: 'Basic MLOps setup for single model deployment',
        features: [
            'Single model deployment',
            'Basic CI/CD pipeline',
            'Model monitoring',
            'API endpoint setup',
            'Documentation',
            '2 weeks delivery',
            '1 month support'
        ],
        highlighted: false
    },
    {
        name: 'Professional',
        price: '$14,999',
        description: 'Complete MLOps infrastructure for teams',
        features: [
            'Multi-model management',
            'Automated training pipelines',
            'A/B testing infrastructure',
            'Model versioning & registry',
            'Performance monitoring dashboard',
            'Alerting & notifications',
            'Team training',
            '3 months support'
        ],
        highlighted: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Enterprise-scale ML infrastructure',
        features: [
            'Unlimited models',
            'Custom orchestration',
            'Multi-cloud deployment',
            'Feature store integration',
            'Experiment tracking',
            'Governance & compliance',
            'On-premise support',
            'Dedicated ML engineer'
        ],
        highlighted: false
    }
];

export default function MLOpsDeploymentPricingPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-red-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        MLOps Deployment Packages
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Production-ready ML infrastructure for your models.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-2xl ${pkg.highlighted ? 'bg-red-600 text-white ring-4 ring-red-300' : 'bg-white border border-gray-200'}`}
                        >
                            <h3 className={`text-2xl font-bold mb-2 ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                {pkg.name}
                            </h3>
                            <div className={`text-4xl font-bold mb-4 ${pkg.highlighted ? 'text-white' : 'text-red-600'}`}>
                                {pkg.price}
                            </div>
                            <p className={`mb-6 ${pkg.highlighted ? 'text-red-100' : 'text-gray-600'}`}>
                                {pkg.description}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <CheckIcon className={`w-5 h-5 flex-shrink-0 ${pkg.highlighted ? 'text-red-200' : 'text-red-600'}`} />
                                        <span className={pkg.highlighted ? 'text-red-50' : 'text-gray-700'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    pkg.highlighted
                                        ? 'bg-white text-red-600 hover:bg-red-50'
                                        : 'bg-red-600 text-white hover:bg-red-700'
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
