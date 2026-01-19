export default function PortfolioPage() {
    const projects = [
        {
            title: 'Predictive Maintenance System',
            industry: 'Manufacturing',
            type: 'Time Series / IoT',
            description: 'ML-powered system that predicts equipment failures before they occur using sensor data and advanced time series analysis. Integrates with existing SCADA systems for real-time monitoring.',
            results: ['45% downtime reduction', '30% maintenance cost savings', '95% prediction accuracy', '2-week failure prediction window'],
            tech: ['TensorFlow', 'Apache Kafka', 'AWS IoT', 'LSTM Networks']
        },
        {
            title: 'Customer Churn Prediction',
            industry: 'SaaS / Fintech',
            type: 'Classification',
            description: 'Advanced churn prediction model using ensemble methods that identifies at-risk customers with actionable insights, enabling proactive retention strategies.',
            results: ['35% churn reduction', '$2.5M annual revenue saved', '89% model accuracy', '30-day early warning system'],
            tech: ['XGBoost', 'scikit-learn', 'MLflow', 'Python']
        },
        {
            title: 'Visual Quality Inspection',
            industry: 'Automotive',
            type: 'Computer Vision',
            description: 'Automated defect detection system using deep learning that inspects products on production lines in real-time, identifying surface defects, assembly errors, and quality issues.',
            results: ['10x faster inspection', '99.2% defect detection rate', '60% labor cost reduction', '50K units/day processed'],
            tech: ['PyTorch', 'YOLO v8', 'OpenCV', 'TensorRT']
        },
        {
            title: 'Intelligent Document Processing',
            industry: 'Financial Services',
            type: 'NLP / OCR',
            description: 'AI system that extracts, classifies, and processes financial documents automatically. Handles invoices, contracts, and compliance documents with high accuracy.',
            results: ['80% processing time reduction', '95% extraction accuracy', '50K documents/day', '99.5% classification accuracy'],
            tech: ['Hugging Face Transformers', 'spaCy', 'Tesseract OCR', 'AWS Textract']
        },
        {
            title: 'Fraud Detection Platform',
            industry: 'Banking',
            type: 'Anomaly Detection',
            description: 'Real-time fraud detection system that analyzes transaction patterns and identifies suspicious activities using advanced anomaly detection algorithms and graph neural networks.',
            results: ['78% fraud detection improvement', '$15M fraud prevented annually', '<100ms response time', '0.01% false positive rate'],
            tech: ['PyTorch Geometric', 'Apache Flink', 'Redis', 'Kubernetes']
        },
        {
            title: 'Personalized Recommendation Engine',
            industry: 'E-commerce',
            type: 'Recommendation Systems',
            description: 'Hybrid recommendation system combining collaborative filtering, content-based filtering, and deep learning to deliver personalized product recommendations at scale.',
            results: ['25% increase in conversion', '40% higher average order value', '3x click-through rate', '10M+ users served'],
            tech: ['TensorFlow Recommenders', 'Apache Spark', 'Redis', 'AWS SageMaker']
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-violet-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Case Studies
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Machine Learning Portfolio
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Real-world machine learning solutions delivering measurable business impact across industries. From predictive analytics to computer vision, see how we transform data into competitive advantage.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                        <div key={index} className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-violet-200 hover:shadow-xl transition-all duration-300">
                            {/* Project Header */}
                            <div className="p-8 pb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-violet-100 text-violet-700 text-sm font-medium rounded-full">
                                        {project.industry}
                                    </span>
                                    <span className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-full">
                                        {project.type}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {/* Results */}
                            <div className="px-8 pb-6">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Key Results</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.results.map((result, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-lg">
                                            {result}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="px-8 pb-8">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Technology Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-violet-50 text-violet-600 text-sm rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="max-w-4xl mx-auto mt-16 text-center p-8 bg-violet-50 rounded-2xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Have a Similar Challenge?</h3>
                    <p className="text-gray-600 mb-6">Let us show you how machine learning can transform your business operations and drive measurable results.</p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors"
                    >
                        Discuss Your Project
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </main>
    );
}
