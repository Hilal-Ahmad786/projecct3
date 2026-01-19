'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
    {
        question: 'What is Conversational AI and how does it differ from traditional chatbots?',
        answer: 'Conversational AI uses advanced natural language processing (NLP) and large language models (LLMs) to understand context, intent, and sentiment in conversations. Unlike rule-based chatbots that follow scripted decision trees, conversational AI can handle complex queries, learn from interactions, remember context across multiple turns, and provide human-like responses. Our solutions leverage GPT-4, Claude, and custom-trained models to deliver intelligent, contextual conversations that feel natural.'
    },
    {
        question: 'How long does it take to build and deploy a custom AI chatbot?',
        answer: 'Timeline depends on complexity. A basic FAQ chatbot with standard integrations can be deployed in 2-4 weeks. More sophisticated solutions with custom NLP training, multiple system integrations, voice capabilities, and multi-channel deployment typically take 8-12 weeks. We follow an agile approach with bi-weekly demos so you can see progress and provide feedback throughout development. After initial deployment, we continue to optimize based on real conversation data.'
    },
    {
        question: 'Can the chatbot integrate with our existing CRM, helpdesk, and business systems?',
        answer: 'Absolutely. Integration is one of our core strengths. We have pre-built connectors for popular platforms like Salesforce, HubSpot, Zendesk, Intercom, ServiceNow, Slack, Microsoft Teams, and more. The chatbot can create support tickets, update customer records, fetch order information, schedule appointments, and hand off to human agents with full context. We also build custom API integrations for proprietary systems and can connect to any system with an API.'
    },
    {
        question: 'How do you ensure data privacy and security for chatbot conversations?',
        answer: 'Security is paramount in everything we build. We implement end-to-end encryption for all conversations, secure data storage following SOC 2 compliance standards, and can deploy entirely on-premise for highly sensitive industries. For healthcare clients, we ensure full HIPAA compliance. We provide granular data retention controls, conversation anonymization options, and audit logging to meet GDPR, CCPA, and other regulatory requirements. Our team holds security certifications and follows secure coding practices.'
    },
    {
        question: 'What languages does your conversational AI support?',
        answer: 'Our chatbots support 50+ languages out of the box using state-of-the-art multilingual NLP models. For optimal performance in specific markets, we can train custom models for particular languages, dialects, and industry terminology. The system can auto-detect user language and respond accordingly, making it ideal for global deployments. We also support code-switching (mixing languages) which is common in multilingual regions.'
    },
    {
        question: 'Can you build voice assistants and phone bots, not just text chatbots?',
        answer: 'Yes, we specialize in both text and voice conversational AI. For voice assistants, we use technologies like OpenAI Whisper, Azure Speech Services, and Google Speech-to-Text for accurate speech recognition, combined with natural-sounding text-to-speech from ElevenLabs or Azure Neural Voices. We build IVR replacements, phone bots that handle inbound calls, outbound calling agents, and voice skills for Alexa and Google Assistant. Voice AI requires additional considerations like handling interruptions, background noise, and natural turn-taking.'
    },
    {
        question: 'How do you train the AI to understand our specific industry and terminology?',
        answer: 'We use a combination of techniques: First, we fine-tune base models on your domain-specific data including product documentation, support tickets, call transcripts, and FAQs. Second, we implement Retrieval-Augmented Generation (RAG) to give the chatbot access to your knowledge base in real-time. Third, we create custom entity recognizers for your industry terminology. Throughout development, we work closely with your subject matter experts to validate accuracy and continuously improve the model based on real conversations.'
    },
    {
        question: 'What happens when the chatbot cannot answer a question?',
        answer: 'We design robust fallback strategies for every chatbot. When confidence is low, the bot can: ask clarifying questions to better understand the intent, search your knowledge base for related information, gracefully acknowledge limitations while offering alternatives, or escalate to a human agent with full conversation context preserved. We also track all fallback scenarios to identify gaps and continuously expand the bots capabilities. The goal is to never leave users frustrated.'
    },
    {
        question: 'How do you measure chatbot success and prove ROI?',
        answer: 'We provide comprehensive analytics dashboards tracking: conversation volume and trends, automated resolution rate, average handling time, customer satisfaction (CSAT) scores, Net Promoter Score (NPS), fallback and escalation rates, and goal completion rates. For business impact, we track metrics like support ticket reduction, lead qualification rate, cost per conversation, and revenue influenced. We provide monthly reports with insights and optimization recommendations to continuously improve ROI.'
    },
    {
        question: 'Do you provide ongoing support and maintenance after deployment?',
        answer: 'Yes, we offer flexible support packages. All deployments include a warranty period with bug fixes and minor adjustments. Our ongoing support plans include: 24/7 monitoring and incident response, regular model retraining based on new conversations, conversation analytics and optimization recommendations, new feature development, integration updates as your systems evolve, and dedicated account management. Most clients see continuous improvement in chatbot performance with ongoing optimization.'
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-amber-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        FAQ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Conversational AI Questions
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Everything you need to know about building intelligent chatbots and conversational AI solutions.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-amber-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
                                <ChevronDownIcon
                                    className={`w-5 h-5 text-amber-600 flex-shrink-0 transition-transform ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-white rounded-2xl p-10 max-w-2xl mx-auto border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Still Have Questions?</h3>
                    <p className="text-gray-600 mb-6">Our conversational AI experts are here to help you explore the possibilities.</p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                    >
                        Talk to an Expert
                    </a>
                </div>
            </div>
        </main>
    );
}
