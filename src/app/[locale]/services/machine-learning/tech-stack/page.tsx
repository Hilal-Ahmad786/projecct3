export default function TechStackPage() {
    const categories = [
        {
            title: 'Deep Learning Frameworks',
            description: 'Industry-leading frameworks for building neural networks',
            items: ['TensorFlow', 'PyTorch', 'Keras', 'JAX', 'MXNet', 'ONNX']
        },
        {
            title: 'ML Libraries',
            description: 'Core libraries for classical machine learning',
            items: ['scikit-learn', 'XGBoost', 'LightGBM', 'CatBoost', 'Optuna', 'H2O.ai']
        },
        {
            title: 'NLP & LLMs',
            description: 'Natural language processing and large language models',
            items: ['Hugging Face Transformers', 'spaCy', 'NLTK', 'OpenAI API', 'LangChain', 'LlamaIndex']
        },
        {
            title: 'Computer Vision',
            description: 'Image and video processing technologies',
            items: ['OpenCV', 'YOLO', 'Detectron2', 'MediaPipe', 'TensorRT', 'Ultralytics']
        },
        {
            title: 'Data Processing',
            description: 'Data manipulation and processing tools',
            items: ['Pandas', 'NumPy', 'Apache Spark', 'Dask', 'Polars', 'Ray']
        },
        {
            title: 'MLOps & Deployment',
            description: 'Tools for model lifecycle management',
            items: ['MLflow', 'Kubeflow', 'Weights & Biases', 'DVC', 'BentoML', 'Seldon']
        },
        {
            title: 'Cloud ML Platforms',
            description: 'Enterprise-grade cloud ML services',
            items: ['AWS SageMaker', 'Google Vertex AI', 'Azure ML', 'Databricks', 'Snowflake ML', 'Modal']
        },
        {
            title: 'Hardware Acceleration',
            description: 'GPU and specialized hardware support',
            items: ['NVIDIA CUDA', 'cuDNN', 'TensorRT', 'Intel oneAPI', 'Apple Metal', 'TPU']
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-violet-900 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-violet-300 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Technology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Machine Learning Tech Stack
                    </h1>
                    <p className="text-xl text-violet-200 leading-relaxed">
                        We leverage industry-leading tools, frameworks, and platforms to build production-ready machine learning solutions that scale with your business needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {categories.map((category, catIndex) => (
                        <div key={catIndex} className="space-y-4">
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-violet-300 mb-2">{category.title}</h3>
                                <p className="text-sm text-violet-400">{category.description}</p>
                            </div>
                            <div className="space-y-2">
                                {category.items.map((tech, techIndex) => (
                                    <div
                                        key={techIndex}
                                        className="p-4 bg-violet-800/50 rounded-lg border border-violet-700 text-center hover:border-violet-400 hover:bg-violet-800 transition-all duration-300"
                                    >
                                        <span className="font-medium">{tech}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info Section */}
                <div className="max-w-4xl mx-auto mt-20 text-center">
                    <div className="p-8 bg-violet-800/30 rounded-2xl border border-violet-700">
                        <h3 className="text-2xl font-bold mb-4">Continuously Evolving Stack</h3>
                        <p className="text-violet-200 leading-relaxed">
                            The ML landscape evolves rapidly. Our team stays at the cutting edge, continuously evaluating and adopting new tools and frameworks that can deliver better results for your projects. We select technologies based on your specific requirements, scalability needs, and long-term maintainability.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
