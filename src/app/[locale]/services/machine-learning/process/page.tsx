export default function ProcessPage() {
    const steps = [
        {
            step: 1,
            title: 'Discovery & Data Assessment',
            desc: 'We begin by understanding your business objectives, analyzing your data landscape, and identifying ML opportunities. Our team conducts thorough feasibility studies and defines success metrics aligned with your goals.',
            details: ['Business goal alignment', 'Data quality audit', 'Use case prioritization', 'Feasibility analysis', 'ROI estimation']
        },
        {
            step: 2,
            title: 'Data Engineering & Preparation',
            desc: 'Transform raw data into ML-ready datasets through comprehensive data pipelines, cleaning, and feature engineering. We ensure data quality and create robust preprocessing workflows.',
            details: ['ETL pipeline development', 'Data cleaning & validation', 'Feature engineering', 'Data augmentation', 'Version control']
        },
        {
            step: 3,
            title: 'Model Development & Training',
            desc: 'Design and train custom ML models using state-of-the-art algorithms and frameworks. We experiment with multiple approaches to find the optimal solution for your specific use case.',
            details: ['Algorithm selection', 'Model architecture design', 'Hyperparameter optimization', 'Cross-validation', 'Ensemble methods']
        },
        {
            step: 4,
            title: 'Evaluation & Validation',
            desc: 'Rigorous testing to ensure model accuracy, fairness, and robustness across diverse scenarios. We implement comprehensive evaluation frameworks and bias detection mechanisms.',
            details: ['Performance benchmarking', 'A/B testing', 'Bias & fairness analysis', 'Edge case testing', 'Explainability assessment']
        },
        {
            step: 5,
            title: 'Deployment & Integration',
            desc: 'Seamless deployment to production environments with proper API design, containerization, and integration with your existing systems. We ensure scalability and reliability.',
            details: ['API development', 'Containerization (Docker/K8s)', 'CI/CD pipelines', 'System integration', 'Auto-scaling setup']
        },
        {
            step: 6,
            title: 'Monitoring & Continuous Improvement',
            desc: 'Ongoing monitoring for model drift, performance degradation, and automated retraining pipelines. We provide comprehensive dashboards and alerting systems.',
            details: ['Real-time monitoring', 'Model drift detection', 'Automated retraining', 'Performance dashboards', 'Incident response']
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-violet-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Our Methodology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        ML Development Process
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        A structured, proven methodology that ensures successful machine learning deployment from initial concept to production-ready solutions with measurable business impact.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {steps.map((item) => (
                        <div key={item.step} className="flex gap-6 items-start p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all duration-300">
                            <div className="w-14 h-14 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                                {item.step}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 mb-4">{item.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {item.details.map((detail, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-violet-100 text-violet-700 text-sm rounded-full">
                                            {detail}
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
