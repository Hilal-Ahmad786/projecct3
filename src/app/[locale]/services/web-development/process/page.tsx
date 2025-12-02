export default function ProcessPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Methodology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our Development Process
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        A proven workflow that ensures transparency, quality, and timely delivery.
                    </p>
                </div>

                {/* Placeholder content - can be expanded later */}
                <div className="max-w-3xl mx-auto space-y-12">
                    {[
                        { step: 1, title: 'Discovery', desc: 'We start by understanding your goals.' },
                        { step: 2, title: 'Design', desc: 'Creating intuitive and beautiful interfaces.' },
                        { step: 3, title: 'Development', desc: 'Writing clean, scalable code.' },
                        { step: 4, title: 'Launch', desc: 'Deploying your solution to the world.' }
                    ].map((item) => (
                        <div key={item.step} className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
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
