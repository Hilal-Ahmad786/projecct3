const projects = [
    {
        id: 1,
        name: 'FinTech Mobile Banking App',
        industry: 'Finance',
        type: 'Mobile App Design',
        description: 'Complete redesign of a mobile banking experience serving 2M+ users. Improved task completion rate by 45% and reduced support tickets by 30%.',
        metrics: ['45% faster task completion', '30% fewer support tickets', '4.8 App Store rating'],
        color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    },
    {
        id: 2,
        name: 'Healthcare Patient Portal',
        industry: 'Healthcare',
        type: 'Web Application',
        description: 'User-centered design for a patient management system. Streamlined appointment booking and medical records access for better patient engagement.',
        metrics: ['60% increase in portal usage', '50% faster appointment booking', 'WCAG 2.1 AA compliant'],
        color: 'bg-gradient-to-br from-indigo-400 to-purple-500'
    },
    {
        id: 3,
        name: 'E-commerce Fashion Platform',
        industry: 'Retail',
        type: 'E-commerce Design',
        description: 'End-to-end design for a luxury fashion marketplace. Created immersive shopping experiences that increased conversion rates significantly.',
        metrics: ['35% conversion increase', '25% higher AOV', '40% mobile engagement boost'],
        color: 'bg-gradient-to-br from-indigo-600 to-indigo-400'
    },
    {
        id: 4,
        name: 'SaaS Analytics Dashboard',
        industry: 'Technology',
        type: 'Dashboard Design',
        description: 'Complex data visualization simplified. Designed intuitive dashboards that make data-driven decisions accessible to non-technical users.',
        metrics: ['70% faster insights', '85% user satisfaction', 'Enterprise adoption tripled'],
        color: 'bg-gradient-to-br from-violet-500 to-indigo-600'
    }
];

export default function PortfolioPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-indigo-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Our Work
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Design Case Studies
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Explore how we have helped brands create exceptional user experiences.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projects.map((project) => (
                        <div key={project.id} className="group cursor-pointer">
                            <div className={`aspect-video ${project.color} rounded-xl overflow-hidden mb-6 relative`}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-white/30 text-6xl font-bold">{project.id.toString().padStart(2, '0')}</div>
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white border border-white px-6 py-2 rounded-full font-medium">View Case Study</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>{project.industry}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span>{project.type}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                    {project.name}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {project.metrics.map((metric, i) => (
                                        <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
                                            {metric}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
