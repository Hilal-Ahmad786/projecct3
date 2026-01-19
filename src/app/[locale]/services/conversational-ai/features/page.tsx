import { CheckCircleIcon } from '@heroicons/react/24/solid';

const features = [
    {
        title: 'Natural Language Processing (NLP)',
        description: 'Advanced NLP engines that understand context, nuance, and user intent with human-like comprehension.'
    },
    {
        title: 'Intent Recognition & Classification',
        description: 'AI-powered intent detection that accurately identifies what users want, even from ambiguous queries.'
    },
    {
        title: 'Entity Extraction & Slot Filling',
        description: 'Automatically extract key information like names, dates, and custom entities from conversations.'
    },
    {
        title: 'Multi-turn Conversation Management',
        description: 'Handle complex, multi-step dialogues while maintaining context throughout the conversation.'
    },
    {
        title: 'Sentiment Analysis & Emotion Detection',
        description: 'Real-time analysis of user emotions to adapt responses and escalate when necessary.'
    },
    {
        title: 'Multi-Language Support',
        description: 'Deploy chatbots in 50+ languages with automatic language detection and seamless switching.'
    },
    {
        title: 'Knowledge Base Integration',
        description: 'Connect to your existing documentation, FAQs, and databases for accurate, up-to-date responses.'
    },
    {
        title: 'Contextual Memory & Personalization',
        description: 'Remember user preferences and history to deliver personalized, relevant interactions.'
    },
    {
        title: 'Voice & Speech Recognition',
        description: 'Build voice assistants with cutting-edge speech-to-text and text-to-speech capabilities.'
    },
    {
        title: 'Seamless Human Handoff',
        description: 'Intelligent escalation to human agents with full conversation context preserved.'
    }
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-amber-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Capabilities
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Conversational AI Features
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Cutting-edge chatbot and NLP capabilities that deliver intelligent, human-like conversations at scale.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 transition-colors">
                                    <CheckCircleIcon className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
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
