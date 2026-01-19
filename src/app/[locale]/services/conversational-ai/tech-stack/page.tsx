export default function TechStackPage() {
    const techCategories = [
        {
            category: 'Large Language Models (LLMs)',
            description: 'State-of-the-art foundation models for intelligent conversations',
            items: [
                { name: 'OpenAI GPT-4', detail: 'Advanced reasoning & generation' },
                { name: 'Claude', detail: 'Safe, helpful AI assistant' },
                { name: 'LLaMA 2', detail: 'Open-source LLM for custom deployments' },
                { name: 'PaLM 2', detail: 'Google\'s flagship language model' }
            ]
        },
        {
            category: 'NLP & AI Frameworks',
            description: 'Tools for building sophisticated language understanding',
            items: [
                { name: 'LangChain', detail: 'LLM application framework' },
                { name: 'Hugging Face', detail: 'Transformers & model hub' },
                { name: 'spaCy', detail: 'Industrial NLP library' },
                { name: 'NLTK', detail: 'Natural language toolkit' }
            ]
        },
        {
            category: 'Chatbot Platforms',
            description: 'Enterprise-grade conversational AI platforms',
            items: [
                { name: 'Dialogflow', detail: 'Google Cloud chatbot platform' },
                { name: 'Rasa', detail: 'Open-source chatbot framework' },
                { name: 'Microsoft Bot Framework', detail: 'Azure-powered bot SDK' },
                { name: 'Amazon Lex', detail: 'AWS conversational interfaces' }
            ]
        },
        {
            category: 'Voice & Speech Technology',
            description: 'Convert speech to text and text to natural speech',
            items: [
                { name: 'Whisper', detail: 'OpenAI speech recognition' },
                { name: 'Azure Speech Services', detail: 'Microsoft speech platform' },
                { name: 'Google Speech-to-Text', detail: 'Cloud speech recognition' },
                { name: 'ElevenLabs', detail: 'AI voice synthesis' }
            ]
        },
        {
            category: 'Vector Databases & RAG',
            description: 'Knowledge retrieval for accurate, grounded responses',
            items: [
                { name: 'Pinecone', detail: 'Managed vector database' },
                { name: 'Weaviate', detail: 'Open-source vector search' },
                { name: 'ChromaDB', detail: 'Embedding database' },
                { name: 'Redis Vector', detail: 'In-memory vector search' }
            ]
        },
        {
            category: 'Integration & APIs',
            description: 'Connect your chatbot to any system',
            items: [
                { name: 'FastAPI', detail: 'High-performance Python API' },
                { name: 'WebSocket', detail: 'Real-time communication' },
                { name: 'Twilio', detail: 'SMS & voice channels' },
                { name: 'Slack/Teams APIs', detail: 'Workspace integrations' }
            ]
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-amber-400 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Technology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Conversational AI Tech Stack
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        We leverage the most advanced AI, NLP, and machine learning technologies to build intelligent chatbots and voice assistants.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto space-y-16">
                    {techCategories.map((cat, catIndex) => (
                        <div key={catIndex}>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-amber-400 mb-2">{cat.category}</h3>
                                <p className="text-gray-500">{cat.description}</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {cat.items.map((tech) => (
                                    <div key={tech.name} className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-amber-500 transition-colors group">
                                        <span className="font-semibold text-lg block mb-1 group-hover:text-amber-400 transition-colors">{tech.name}</span>
                                        <span className="text-sm text-gray-500">{tech.detail}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-gray-400 mb-6">Need a custom technology solution for your chatbot project?</p>
                    <a href="/contact" className="inline-flex items-center gap-2 bg-amber-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
                        Discuss Your Requirements
                    </a>
                </div>
            </div>
        </main>
    );
}
