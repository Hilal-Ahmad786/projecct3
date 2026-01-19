export default function MobileFAQPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-blue-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        FAQ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Mobile Development FAQ
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Common questions about building mobile applications.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                    {[
                        { question: 'Should I build native or cross-platform?', answer: 'For most apps, cross-platform (React Native or Flutter) offers the best balance of cost, development speed, and quality. We recommend native when you need deep platform integration, demanding 3D graphics, or specific native APIs.' },
                        { question: 'How long does it take to build a mobile app?', answer: 'A typical MVP takes 3-4 months. More complex apps with custom backends, integrations, and advanced features can take 4-8 months. We provide detailed timelines during our discovery phase.' },
                        { question: 'What about app store approval?', answer: 'We handle the entire submission process for both App Store and Play Store, ensuring compliance with guidelines. We also optimize your listing for discoverability with ASO best practices.' },
                        { question: 'Do you provide post-launch support?', answer: 'Yes. We offer maintenance packages that include bug fixes, OS updates, performance monitoring, and feature enhancements. We are committed to your app\'s long-term success.' },
                        { question: 'Can you integrate with our existing backend?', answer: 'Absolutely. We have extensive experience integrating mobile apps with existing APIs, databases, and third-party services. We can also build a custom backend if needed.' },
                        { question: 'How do you handle app security?', answer: 'We implement industry best practices including secure authentication, encrypted data storage, certificate pinning, and protection against common vulnerabilities. Security audits are part of our process.' }
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
