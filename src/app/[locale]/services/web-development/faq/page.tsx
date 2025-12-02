export default function FAQPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        FAQ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Common Questions
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Answers to frequently asked questions about our web development services.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                    {[
                        'How long does a typical project take?',
                        'Do you provide ongoing support?',
                        'What technologies do you specialize in?',
                        'Can you help with legacy code migration?'
                    ].map((question, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">{question}</h3>
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
