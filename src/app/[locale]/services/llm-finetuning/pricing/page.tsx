import { CheckIcon } from '@heroicons/react/24/solid';

const packages = [
    {
        name: 'Starter',
        price: '$12,999',
        description: 'Basic fine-tuning for single model',
        features: [
            'Single model fine-tuning',
            'Up to 10K training examples',
            'Basic hyperparameter tuning',
            'Evaluation report',
            'Model deployment',
            '2-3 weeks delivery',
            '1 month support'
        ],
        highlighted: false
    },
    {
        name: 'Professional',
        price: '$29,999',
        description: 'Advanced fine-tuning with optimization',
        features: [
            'Multiple model experiments',
            'Up to 100K training examples',
            'Advanced optimization (LoRA/QLoRA)',
            'Custom evaluation metrics',
            'A/B testing setup',
            'API deployment',
            'Training pipeline',
            '3 months support'
        ],
        highlighted: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Enterprise-scale model customization',
        features: [
            'Unlimited training data',
            'Multi-model orchestration',
            'RLHF implementation',
            'Safety & alignment tuning',
            'Private infrastructure',
            'Continuous fine-tuning pipeline',
            'Dedicated ML team',
            'Ongoing optimization'
        ],
        highlighted: false
    }
];

export default function LLMFinetuningPricingPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-orange-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        LLM Fine-tuning Packages
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Customize foundation models to your specific needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-2xl ${pkg.highlighted ? 'bg-orange-600 text-white ring-4 ring-orange-300' : 'bg-white border border-gray-200'}`}
                        >
                            <h3 className={`text-2xl font-bold mb-2 ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                {pkg.name}
                            </h3>
                            <div className={`text-4xl font-bold mb-4 ${pkg.highlighted ? 'text-white' : 'text-orange-600'}`}>
                                {pkg.price}
                            </div>
                            <p className={`mb-6 ${pkg.highlighted ? 'text-orange-100' : 'text-gray-600'}`}>
                                {pkg.description}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <CheckIcon className={`w-5 h-5 flex-shrink-0 ${pkg.highlighted ? 'text-orange-200' : 'text-orange-600'}`} />
                                        <span className={pkg.highlighted ? 'text-orange-50' : 'text-gray-700'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    pkg.highlighted
                                        ? 'bg-white text-orange-600 hover:bg-orange-50'
                                        : 'bg-orange-600 text-white hover:bg-orange-700'
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
