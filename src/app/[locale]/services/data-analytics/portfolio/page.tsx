export default function PortfolioPage() {
    const projects = [
        {
            id: 1,
            title: 'Retail Sales Analytics Platform',
            industry: 'Retail',
            type: 'BI Dashboard',
            description: 'Comprehensive sales analytics solution with real-time inventory tracking and demand forecasting.',
            result: '35% improvement in inventory turnover'
        },
        {
            id: 2,
            title: 'Healthcare Performance Dashboard',
            industry: 'Healthcare',
            type: 'Analytics Platform',
            description: 'Patient flow optimization and resource allocation dashboard for a regional hospital network.',
            result: '25% reduction in wait times'
        },
        {
            id: 3,
            title: 'Financial Risk Analytics',
            industry: 'Finance',
            type: 'Predictive Analytics',
            description: 'Machine learning-powered risk assessment and fraud detection system for a fintech company.',
            result: '60% faster fraud detection'
        },
        {
            id: 4,
            title: 'Manufacturing IoT Analytics',
            industry: 'Manufacturing',
            type: 'Real-time Dashboard',
            description: 'IoT sensor data analytics platform for predictive maintenance and production optimization.',
            result: '40% reduction in downtime'
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Case Studies
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Analytics Projects
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Explore how we have helped organizations unlock the power of their data.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {projects.map((project) => (
                        <div key={project.id} className="group cursor-pointer bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="aspect-video bg-gradient-to-br from-cyan-500 to-cyan-700 relative flex items-center justify-center">
                                <svg className="w-20 h-20 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white border border-white px-6 py-2 rounded-full">View Case Study</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-1 rounded">{project.industry}</span>
                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{project.type}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-semibold text-cyan-600">Key Result:</span>
                                    <span className="text-gray-700">{project.result}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
