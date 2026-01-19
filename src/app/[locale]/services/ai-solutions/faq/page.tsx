export default function AIFAQPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-purple-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        FAQ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        AI Questions Answered
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Everything you need to know about implementing AI solutions for your business.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                    {[
                        { question: 'How much data do I need to get started with AI?', answer: 'It depends on the use case. Some solutions work with hundreds of examples, while others may need thousands. We assess your data during our discovery phase and recommend the best approach, including data augmentation strategies if needed.' },
                        { question: 'How long does it take to develop an AI solution?', answer: 'A proof of concept typically takes 4-8 weeks. Production-ready solutions range from 2-6 months depending on complexity, data quality, and integration requirements.' },
                        { question: 'Can AI integrate with our existing systems?', answer: 'Yes. We design AI solutions with integration in mind, providing REST APIs, webhooks, and connectors for popular platforms. We work with your existing tech stack and data infrastructure.' },
                        { question: 'What about data privacy and security?', answer: 'Data security is paramount. We implement encryption, access controls, and can deploy solutions on-premise or in private cloud environments. We are experienced with GDPR, HIPAA, and other compliance requirements.' },
                        { question: 'Do we need specialized hardware for AI?', answer: 'Not necessarily. Many AI solutions run efficiently on standard cloud infrastructure. For intensive workloads, we can leverage GPU instances from AWS, Google Cloud, or Azure as needed.' },
                        { question: 'How do you ensure AI model accuracy?', answer: 'We use rigorous testing methodologies including cross-validation, A/B testing, and continuous monitoring in production. Models are retrained periodically with new data to maintain and improve accuracy.' }
                    ].map((faq, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">{faq.question}</h3>
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
