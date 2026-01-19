export default function PortfolioPage() {
    const projects = [
        {
            title: 'E-Commerce Customer Support Bot',
            industry: 'Retail',
            type: 'Customer Service',
            description: 'Built an AI-powered chatbot for a major online retailer handling 15,000+ daily customer inquiries. The bot manages order tracking, returns processing, product recommendations, and FAQ responses with natural language understanding.',
            technologies: ['GPT-4', 'LangChain', 'Pinecone', 'Shopify API'],
            results: [
                '85% automated resolution rate',
                '60% reduction in support tickets',
                '4.7/5 customer satisfaction score'
            ]
        },
        {
            title: 'Healthcare Virtual Assistant',
            industry: 'Healthcare',
            type: 'Patient Engagement',
            description: 'Developed a HIPAA-compliant conversational AI for a hospital network. The assistant handles appointment scheduling, symptom pre-screening, medication reminders, and post-visit follow-ups across web and mobile channels.',
            technologies: ['Dialogflow', 'Azure Health Bot', 'Epic EHR Integration'],
            results: [
                '40% increase in patient engagement',
                '30% reduction in no-shows',
                '24/7 availability for patients'
            ]
        },
        {
            title: 'Banking Conversational AI',
            industry: 'Finance',
            type: 'Financial Services',
            description: 'Created a secure, multi-channel chatbot for a regional bank. Customers can check balances, view transaction history, transfer funds, report lost cards, and receive fraud alerts through natural conversations.',
            technologies: ['Microsoft Bot Framework', 'Azure Cognitive Services', 'Plaid API'],
            results: [
                '35% cost savings in call center',
                '50,000+ monthly active users',
                'SOC 2 Type II certified'
            ]
        },
        {
            title: 'HR Onboarding Assistant',
            industry: 'Enterprise',
            type: 'Internal Operations',
            description: 'Built an employee-facing chatbot for a Fortune 500 company to streamline HR processes. The assistant handles onboarding questions, policy lookups, leave requests, benefits enrollment, and IT support tickets.',
            technologies: ['Rasa', 'Workday API', 'ServiceNow Integration'],
            results: [
                '50% faster employee onboarding',
                '70% reduction in HR inquiry volume',
                'Available in 12 languages'
            ]
        },
        {
            title: 'Travel Booking Voice Assistant',
            industry: 'Travel & Hospitality',
            type: 'Voice AI',
            description: 'Developed a voice-enabled booking assistant for a travel agency. Customers can search flights, book hotels, get destination recommendations, and manage itineraries through natural voice conversations on phone and smart speakers.',
            technologies: ['Whisper', 'ElevenLabs', 'Amadeus API', 'Alexa Skills Kit'],
            results: [
                '25% increase in bookings',
                '90% speech recognition accuracy',
                'Supports 8 languages'
            ]
        },
        {
            title: 'Real Estate Lead Qualification Bot',
            industry: 'Real Estate',
            type: 'Sales Automation',
            description: 'Created an intelligent chatbot for a real estate company to qualify leads 24/7. The bot engages website visitors, understands their property requirements, schedules viewings, and seamlessly hands off to agents.',
            technologies: ['Claude API', 'Calendly Integration', 'Salesforce CRM'],
            results: [
                '3x increase in qualified leads',
                '80% lead response time reduction',
                '$2M attributed pipeline'
            ]
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-amber-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Case Studies
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Chatbot Success Stories
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Real-world conversational AI implementations delivering measurable business results across industries.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <div key={index} className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300">
                            <div className="aspect-video bg-gradient-to-br from-amber-100 to-amber-50 relative flex items-center justify-center">
                                <div className="text-amber-300 text-7xl font-bold opacity-40">0{index + 1}</div>
                                <div className="absolute inset-0 bg-amber-500/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white border-2 border-white px-6 py-2 rounded-full font-medium">View Case Study</span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex gap-2 mb-4">
                                    <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-700 rounded-full">{project.industry}</span>
                                    <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{project.type}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                                <div className="mb-4">
                                    <span className="text-sm font-medium text-gray-500 block mb-2">Technologies Used:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <span className="text-sm font-medium text-gray-500 block mb-2">Key Results:</span>
                                    <ul className="space-y-1">
                                        {project.results.map((result, i) => (
                                            <li key={i} className="text-sm text-amber-600 font-medium flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                                                {result}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-gray-600 mb-6">Want to see how conversational AI can transform your business?</p>
                    <a href="/contact" className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
                        Get a Free Consultation
                    </a>
                </div>
            </div>
        </main>
    );
}
