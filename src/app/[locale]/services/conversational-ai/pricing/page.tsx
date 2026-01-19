import { CheckIcon } from '@heroicons/react/24/solid';

const pricingTiers = [
    {
        name: 'Starter',
        price: '$2,500',
        period: '/month',
        description: 'Perfect for small businesses getting started with conversational AI.',
        features: [
            'Single channel deployment (Web or WhatsApp)',
            'Up to 1,000 conversations/month',
            'Basic intent recognition (20 intents)',
            'Standard NLP model',
            'Email support',
            'Basic analytics dashboard'
        ],
        cta: 'Get Started',
        popular: false
    },
    {
        name: 'Professional',
        price: '$7,500',
        period: '/month',
        description: 'For growing businesses needing advanced chatbot capabilities.',
        features: [
            'Multi-channel deployment (Web, Mobile, Social)',
            'Up to 10,000 conversations/month',
            'Advanced NLP with custom training',
            'Sentiment analysis',
            'CRM & helpdesk integration',
            'Priority support with SLA',
            'Advanced analytics & reporting',
            'A/B testing capabilities'
        ],
        cta: 'Contact Sales',
        popular: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'Full-scale conversational AI for large organizations.',
        features: [
            'Unlimited channels & conversations',
            'Custom LLM fine-tuning',
            'On-premise deployment option',
            'Advanced security & compliance',
            'Dedicated success manager',
            '24/7 premium support',
            'Custom integrations',
            'White-label solution',
            'Multi-language support (50+ languages)'
        ],
        cta: 'Contact Sales',
        popular: false
    }
];

export default function PricingPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-violet-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Chatbot Solutions for Every Scale
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Transparent pricing with no hidden fees. Choose the plan that fits your needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-2xl border ${tier.popular ? 'border-violet-500 shadow-xl scale-105' : 'border-gray-200'} overflow-hidden`}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 left-0 right-0 bg-violet-600 text-white text-center py-2 text-sm font-medium">
                                    Most Popular
                                </div>
                            )}
                            <div className={`p-8 ${tier.popular ? 'pt-14' : ''}`}>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                                    <span className="text-gray-500">{tier.period}</span>
                                </div>
                                <p className="text-gray-600 mb-6">{tier.description}</p>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-3">
                                            <CheckIcon className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-600 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                                        tier.popular
                                            ? 'bg-violet-600 text-white hover:bg-violet-700'
                                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                    }`}
                                >
                                    {tier.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-4">Need a custom solution? Let&apos;s discuss your specific requirements.</p>
                    <a href="/contact" className="text-violet-600 font-medium hover:underline">
                        Schedule a consultation
                    </a>
                </div>
            </div>
        </main>
    );
}
