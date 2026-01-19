export default function PortfolioPage() {
    const projects = [
        {
            title: 'Financial Services Security Overhaul',
            industry: 'Banking & Finance',
            type: 'Enterprise Security',
            description: 'Implemented comprehensive security infrastructure for a mid-sized bank, including SIEM deployment, network segmentation, and 24/7 SOC monitoring.',
            results: ['70% reduction in security incidents', 'PCI-DSS compliance achieved', 'Mean detection time reduced to 15 minutes']
        },
        {
            title: 'Healthcare Data Protection',
            industry: 'Healthcare',
            type: 'Data Security & Compliance',
            description: 'Designed and deployed HIPAA-compliant security architecture protecting 2M+ patient records across multiple healthcare facilities.',
            results: ['Zero data breaches post-implementation', 'HIPAA compliance maintained', '99.9% system availability']
        },
        {
            title: 'E-Commerce Threat Response',
            industry: 'Retail',
            type: 'Incident Response',
            description: 'Led incident response and recovery for a major e-commerce platform following a sophisticated ransomware attack.',
            results: ['Full recovery in 48 hours', 'No customer data compromised', 'Implemented advanced threat detection']
        },
        {
            title: 'Manufacturing OT Security',
            industry: 'Manufacturing',
            type: 'Industrial Security',
            description: 'Secured operational technology (OT) environment for a large manufacturing company, protecting critical infrastructure from cyber threats.',
            results: ['Secured 500+ industrial endpoints', 'Zero production downtime from cyber incidents', 'Network segmentation between IT and OT']
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-red-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Case Studies
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Security Success Stories
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Real-world examples of how we've helped organizations strengthen their security posture.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto space-y-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:border-red-100 transition-all duration-300">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                    {project.industry}
                                </span>
                                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                                    {project.type}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                            <div className="border-t border-gray-200 pt-4">
                                <h4 className="font-medium text-gray-900 mb-2">Key Results:</h4>
                                <ul className="space-y-1">
                                    {project.results.map((result, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {result}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
