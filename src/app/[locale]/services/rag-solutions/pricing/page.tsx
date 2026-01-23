import { CheckIcon } from '@heroicons/react/24/solid';

const packages = [
    {
        name: 'Starter',
        price: '$9,999',
        description: 'Basic RAG system for document Q&A',
        features: [
            'Vector database setup',
            'Up to 1000 documents',
            'Basic semantic search',
            'API endpoint',
            'Simple UI interface',
            '3 weeks delivery',
            '1 month support'
        ],
        highlighted: false
    },
    {
        name: 'Professional',
        price: '$24,999',
        description: 'Advanced RAG with multi-source retrieval',
        features: [
            'Multi-source ingestion',
            'Up to 10,000 documents',
            'Hybrid search (semantic + keyword)',
            'Custom chunking strategies',
            'Citation & source tracking',
            'Admin dashboard',
            'Analytics & metrics',
            '3 months support'
        ],
        highlighted: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Enterprise-grade knowledge infrastructure',
        features: [
            'Unlimited documents',
            'Multi-tenant architecture',
            'Custom embedding models',
            'Real-time sync pipelines',
            'Access control & permissions',
            'Compliance & audit logs',
            'On-premise deployment',
            'Dedicated support team'
        ],
        highlighted: false
    }
];

export default function RAGSolutionsPricingPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-lime-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        RAG Solution Packages
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Turn your knowledge base into an intelligent AI assistant.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-2xl ${pkg.highlighted ? 'bg-lime-600 text-white ring-4 ring-lime-300' : 'bg-white border border-gray-200'}`}
                        >
                            <h3 className={`text-2xl font-bold mb-2 ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                {pkg.name}
                            </h3>
                            <div className={`text-4xl font-bold mb-4 ${pkg.highlighted ? 'text-white' : 'text-lime-600'}`}>
                                {pkg.price}
                            </div>
                            <p className={`mb-6 ${pkg.highlighted ? 'text-lime-100' : 'text-gray-600'}`}>
                                {pkg.description}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <CheckIcon className={`w-5 h-5 flex-shrink-0 ${pkg.highlighted ? 'text-lime-200' : 'text-lime-600'}`} />
                                        <span className={pkg.highlighted ? 'text-lime-50' : 'text-gray-700'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    pkg.highlighted
                                        ? 'bg-white text-lime-600 hover:bg-lime-50'
                                        : 'bg-lime-600 text-white hover:bg-lime-700'
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
