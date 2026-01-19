export default function MobilePortfolioPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-blue-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Our Work
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Mobile App Portfolio
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Discover the mobile applications we&apos;ve built for businesses across industries.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {[
                        { title: 'FitTrack Pro', industry: 'Health & Fitness', result: '50K+ downloads' },
                        { title: 'QuickOrder B2B', industry: 'E-commerce', result: '70% faster ordering' },
                        { title: 'FinServe Mobile', industry: 'Finance', result: '4.8★ App Store rating' },
                        { title: 'TravelMate', industry: 'Travel', result: '100K+ active users' }
                    ].map((item, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl overflow-hidden mb-4 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-blue-600 font-medium">
                                    {item.title}
                                </div>
                                <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
