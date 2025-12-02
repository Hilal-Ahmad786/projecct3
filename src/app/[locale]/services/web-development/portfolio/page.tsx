export default function PortfolioPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Our Work
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Selected Projects
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Explore a collection of our recent web development work.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="group cursor-pointer">
                            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    Project Screenshot {item}
                                </div>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white border border-white px-6 py-2 rounded-full">View Case Study</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Project Name {item}</h3>
                            <p className="text-gray-500">Industry • Web App</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
