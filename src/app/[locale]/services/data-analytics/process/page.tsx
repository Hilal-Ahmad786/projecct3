export default function ProcessPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Methodology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our Analytics Process
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        A proven data-driven workflow that ensures accurate insights and measurable business impact.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-12">
                    {[
                        { step: 1, title: 'Data Discovery', desc: 'We assess your data sources, quality, and identify key business questions to answer.' },
                        { step: 2, title: 'Data Integration', desc: 'Connecting and consolidating data from multiple sources into a unified data warehouse.' },
                        { step: 3, title: 'Analysis & Modeling', desc: 'Applying statistical analysis and machine learning to uncover patterns and insights.' },
                        { step: 4, title: 'Visualization', desc: 'Creating interactive dashboards and reports that make data accessible to all stakeholders.' },
                        { step: 5, title: 'Deployment & Training', desc: 'Implementing solutions and empowering your team to make data-driven decisions.' }
                    ].map((item) => (
                        <div key={item.step} className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
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
