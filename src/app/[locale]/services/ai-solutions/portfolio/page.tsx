export default function AIPortfolioPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-purple-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Case Studies
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        AI Projects
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Explore how we&apos;ve helped businesses transform with AI-powered solutions.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {[
                        { title: 'Customer Service Chatbot', industry: 'E-commerce', result: '60% ticket reduction' },
                        { title: 'Predictive Maintenance System', industry: 'Manufacturing', result: '40% downtime reduction' },
                        { title: 'Fraud Detection Engine', industry: 'Finance', result: '95% accuracy rate' },
                        { title: 'Document Classification AI', industry: 'Legal', result: '80% processing speedup' }
                    ].map((item, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl overflow-hidden mb-4 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-purple-600 font-medium">
                                    {item.title}
                                </div>
                                <div className="absolute inset-0 bg-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white border border-white px-6 py-2 rounded-full">View Case Study</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                            <p className="text-gray-500">{item.industry} • {item.result}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
