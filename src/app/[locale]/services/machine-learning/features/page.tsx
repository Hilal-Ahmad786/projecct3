import { CheckCircleIcon } from '@heroicons/react/24/solid';

const features = [
    {
        title: 'Neural Networks & Deep Learning',
        description: 'Build sophisticated neural network architectures including CNNs, RNNs, LSTMs, and Transformers for complex pattern recognition and decision-making tasks.'
    },
    {
        title: 'Predictive Analytics',
        description: 'Forecast trends, customer behavior, and market changes using advanced statistical models and ML algorithms to drive data-informed business decisions.'
    },
    {
        title: 'Natural Language Processing',
        description: 'Text analysis, sentiment detection, named entity recognition, chatbots, and language understanding for enhanced human-computer communication.'
    },
    {
        title: 'Computer Vision',
        description: 'Image recognition, object detection, facial recognition, visual inspection automation, and video analytics powered by state-of-the-art deep learning models.'
    },
    {
        title: 'Recommendation Systems',
        description: 'Personalized product, content, and service recommendations using collaborative filtering, content-based, and hybrid approaches that drive engagement.'
    },
    {
        title: 'Anomaly Detection',
        description: 'Identify unusual patterns for fraud detection, cybersecurity threats, quality control, and predictive maintenance through intelligent monitoring systems.'
    },
    {
        title: 'Time Series Forecasting',
        description: 'Predict future values based on historical data for inventory optimization, sales forecasting, demand planning, and resource allocation.'
    },
    {
        title: 'AutoML Solutions',
        description: 'Automated machine learning pipelines that optimize model selection, feature engineering, and hyperparameter tuning for faster deployment.'
    },
    {
        title: 'MLOps & Model Management',
        description: 'End-to-end ML lifecycle management including versioning, continuous integration, deployment automation, and production monitoring.'
    },
    {
        title: 'Edge AI Deployment',
        description: 'Deploy optimized ML models on edge devices for real-time inference with minimal latency, enabling IoT and mobile AI applications.'
    },
    {
        title: 'Reinforcement Learning',
        description: 'Develop intelligent agents that learn optimal strategies through interaction with environments for robotics, gaming, and autonomous systems.'
    },
    {
        title: 'Transfer Learning',
        description: 'Leverage pre-trained models and adapt them to your specific use cases, reducing training time and data requirements significantly.'
    }
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-violet-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        ML Capabilities
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Machine Learning Features
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        From neural networks to computer vision, we deliver comprehensive machine learning solutions that transform your data into actionable intelligence and competitive advantage.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 bg-gray-50 rounded-xl border border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500 transition-colors">
                                    <CheckCircleIcon className="w-6 h-6 text-violet-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
