export default function ProcessPage() {
    const steps = [
        {
            step: 1,
            title: 'Assessment',
            desc: 'We conduct thorough security assessments to understand your current posture, identify vulnerabilities, and map your attack surface.'
        },
        {
            step: 2,
            title: 'Strategy',
            desc: 'Based on findings, we develop a comprehensive security strategy aligned with your business objectives and compliance requirements.'
        },
        {
            step: 3,
            title: 'Implementation',
            desc: 'Our experts deploy security solutions, configure defenses, and integrate monitoring systems across your infrastructure.'
        },
        {
            step: 4,
            title: 'Monitoring',
            desc: 'We provide 24/7 security operations center (SOC) monitoring to detect and respond to threats in real-time.'
        },
        {
            step: 5,
            title: 'Continuous Improvement',
            desc: 'Regular assessments, threat intelligence updates, and security posture reviews ensure your defenses evolve with emerging threats.'
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-red-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Methodology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our Security Process
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        A proven five-step approach that ensures comprehensive protection and continuous security improvement.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-12">
                    {steps.map((item) => (
                        <div key={item.step} className="flex gap-6 items-start group">
                            <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 group-hover:bg-red-700 transition-colors">
                                {item.step}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
