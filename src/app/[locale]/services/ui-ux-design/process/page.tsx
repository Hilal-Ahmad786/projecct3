export default function ProcessPage() {
    const steps = [
        {
            step: 1,
            title: 'Discovery & Research',
            desc: 'We start by understanding your business goals, target audience, and competitive landscape through stakeholder interviews, user research, and market analysis.',
            details: ['Stakeholder interviews', 'User surveys & interviews', 'Competitive analysis', 'Analytics review']
        },
        {
            step: 2,
            title: 'Strategy & Planning',
            desc: 'We define the product vision, create user personas, map user journeys, and establish information architecture to guide the design direction.',
            details: ['User personas', 'Journey mapping', 'Information architecture', 'Feature prioritization']
        },
        {
            step: 3,
            title: 'Design & Prototyping',
            desc: 'We create wireframes, visual designs, and interactive prototypes that bring your product to life with pixel-perfect attention to detail.',
            details: ['Wireframes', 'Visual design', 'Interactive prototypes', 'Design system']
        },
        {
            step: 4,
            title: 'Testing & Validation',
            desc: 'We validate our designs through usability testing, gather user feedback, and iterate to ensure the best possible user experience.',
            details: ['Usability testing', 'A/B testing', 'User feedback sessions', 'Accessibility audit']
        },
        {
            step: 5,
            title: 'Handoff & Support',
            desc: 'We deliver comprehensive design specifications, assets, and ongoing support to ensure seamless implementation by your development team.',
            details: ['Design specifications', 'Asset delivery', 'Developer support', 'Implementation QA']
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-indigo-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Methodology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our Design Process
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        A proven workflow that ensures transparency, collaboration, and exceptional results.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {steps.map((item, index) => (
                        <div key={item.step} className="relative">
                            {/* Connecting Line */}
                            {index < steps.length - 1 && (
                                <div className="absolute left-6 top-16 w-0.5 h-full bg-indigo-100" />
                            )}

                            <div className="flex gap-8 items-start mb-12">
                                <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 relative z-10">
                                    {item.step}
                                </div>
                                <div className="flex-1 pb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">{item.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.details.map((detail, i) => (
                                            <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
                                                {detail}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
