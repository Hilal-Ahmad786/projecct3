import { CheckCircleIcon } from '@heroicons/react/24/solid';

const features = [
    'Custom Next.js & React Development',
    'Progressive Web Apps (PWA)',
    'API Integration & Development',
    'Performance Optimization (Core Web Vitals)',
    'Headless CMS Solutions',
    'Responsive & Mobile-First Design',
    'E-commerce Solutions',
    'Real-time Applications',
    'Cloud Infrastructure Setup',
    'Automated Testing & QA'
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Capabilities
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Comprehensive Web Solutions
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        We deliver end-to-end development services tailored to your specific business needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 transition-colors">
                                    <CheckCircleIcon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Built with precision and scalability in mind to ensure long-term success.
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
