import { CheckIcon } from '@heroicons/react/24/solid';

const packages = [
    {
        name: 'Starter',
        price: '$7,999',
        description: 'Single-purpose AI agent for specific tasks',
        features: [
            'Single AI agent development',
            'Up to 5 tool integrations',
            'Basic memory system',
            'API endpoint',
            'Documentation',
            '3 weeks delivery',
            '1 month support'
        ],
        highlighted: false
    },
    {
        name: 'Professional',
        price: '$18,999',
        description: 'Multi-agent system for complex workflows',
        features: [
            'Multi-agent architecture',
            'Up to 15 tool integrations',
            'Advanced memory & context',
            'Human-in-the-loop workflows',
            'Custom UI dashboard',
            'Conversation analytics',
            '6-8 weeks delivery',
            '3 months support'
        ],
        highlighted: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Autonomous AI workforce for your organization',
        features: [
            'Unlimited agents',
            'Custom tool development',
            'Enterprise integrations',
            'Multi-tenant architecture',
            'Audit & compliance logs',
            'On-premise deployment',
            'Dedicated team',
            '24/7 support'
        ],
        highlighted: false
    }
];

export default function AIAgentsPricingPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-fuchsia-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        AI Agent Packages
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Deploy intelligent agents that work autonomously.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-2xl ${pkg.highlighted ? 'bg-fuchsia-600 text-white ring-4 ring-fuchsia-300' : 'bg-white border border-gray-200'}`}
                        >
                            <h3 className={`text-2xl font-bold mb-2 ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                {pkg.name}
                            </h3>
                            <div className={`text-4xl font-bold mb-4 ${pkg.highlighted ? 'text-white' : 'text-fuchsia-600'}`}>
                                {pkg.price}
                            </div>
                            <p className={`mb-6 ${pkg.highlighted ? 'text-fuchsia-100' : 'text-gray-600'}`}>
                                {pkg.description}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <CheckIcon className={`w-5 h-5 flex-shrink-0 ${pkg.highlighted ? 'text-fuchsia-200' : 'text-fuchsia-600'}`} />
                                        <span className={pkg.highlighted ? 'text-fuchsia-50' : 'text-gray-700'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    pkg.highlighted
                                        ? 'bg-white text-fuchsia-600 hover:bg-fuchsia-50'
                                        : 'bg-fuchsia-600 text-white hover:bg-fuchsia-700'
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
