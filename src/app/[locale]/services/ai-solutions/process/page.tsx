export default function AIProcessPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-purple-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Methodology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our AI Development Process
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        A systematic approach to delivering AI solutions that create real business value.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-12">
                    {[
                        { step: 1, title: 'Data Assessment', desc: 'We evaluate your data landscape, quality, and identify opportunities for AI implementation.' },
                        { step: 2, title: 'Model Design', desc: 'Selecting the right algorithms and architecture based on your specific use case and requirements.' },
                        { step: 3, title: 'Training & Testing', desc: 'Iterative model training with rigorous testing to ensure accuracy and reliability.' },
                        { step: 4, title: 'Integration', desc: 'Seamless deployment into your existing systems with APIs and monitoring.' },
                        { step: 5, title: 'Optimization', desc: 'Continuous improvement based on real-world performance and feedback.' }
                    ].map((item) => (
                        <div key={item.step} className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                                {item.step}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
