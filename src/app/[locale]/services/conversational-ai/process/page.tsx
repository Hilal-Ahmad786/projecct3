export default function ProcessPage() {
    const steps = [
        {
            step: 1,
            title: 'Discovery & Use Case Analysis',
            description: 'We begin by understanding your business goals, target audience, and key conversation scenarios. Our team identifies the most impactful use cases and defines success metrics to ensure your chatbot delivers measurable ROI.'
        },
        {
            step: 2,
            title: 'Conversation Design & UX',
            description: 'Our conversation designers craft natural dialogue flows, define the chatbot personality, and map out user journeys. We create detailed conversation scripts with fallback strategies and edge case handling.'
        },
        {
            step: 3,
            title: 'NLP Model Training',
            description: 'We train custom intent classifiers and entity extractors using your domain-specific data. Our AI engineers fine-tune language models to understand your industry terminology and customer language patterns.'
        },
        {
            step: 4,
            title: 'Integration & Development',
            description: 'We build robust integrations with your existing systems including CRM, helpdesk, databases, and APIs. The chatbot is developed with scalable architecture to handle enterprise-level traffic.'
        },
        {
            step: 5,
            title: 'Testing & Quality Assurance',
            description: 'Rigorous testing across thousands of conversation scenarios ensures accuracy and reliability. We test edge cases, security vulnerabilities, and performance under load before deployment.'
        },
        {
            step: 6,
            title: 'Launch & Continuous Optimization',
            description: 'After deployment, we monitor conversations, analyze performance metrics, and continuously improve the AI models. Regular optimization ensures your chatbot gets smarter over time.'
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-amber-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Methodology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        AI Chatbot Development Process
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        A proven 6-step methodology that ensures your conversational AI delivers real business value from day one.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-12">
                    {steps.map((item) => (
                        <div key={item.step} className="flex gap-6 items-start">
                            <div className="w-14 h-14 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg">
                                {item.step}
                            </div>
                            <div className="pt-2">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build Your AI Chatbot?</h3>
                    <p className="text-gray-600 mb-6">Let us help you create intelligent conversational experiences that delight your customers.</p>
                    <a href="/contact" className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors">
                        Start Your Project
                    </a>
                </div>
            </div>
        </main>
    );
}
