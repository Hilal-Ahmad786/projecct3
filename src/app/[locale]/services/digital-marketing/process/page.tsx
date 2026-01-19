import { ClipboardDocumentCheckIcon, LightBulbIcon, RocketLaunchIcon, ChartBarSquareIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const processSteps = [
    {
        step: 1,
        title: 'Discovery & Audit',
        description: 'We start by conducting a comprehensive audit of your current marketing efforts, analyzing competitors, and understanding your target audience. This includes reviewing your website analytics, existing campaigns, brand positioning, and market opportunities.',
        icon: ClipboardDocumentCheckIcon,
        deliverables: ['Competitive analysis report', 'Audience persona development', 'Current performance audit', 'Opportunity identification']
    },
    {
        step: 2,
        title: 'Strategy Development',
        description: 'Based on our research, we create a customized marketing strategy aligned with your business objectives. This includes channel selection, budget allocation, messaging framework, and KPI definitions to measure success.',
        icon: LightBulbIcon,
        deliverables: ['Marketing strategy document', 'Channel recommendations', 'Content calendar', 'Budget allocation plan']
    },
    {
        step: 3,
        title: 'Campaign Execution',
        description: 'Our team implements the strategy across selected channels with creative excellence. From ad creative development to content production, we ensure every touchpoint reflects your brand and resonates with your audience.',
        icon: RocketLaunchIcon,
        deliverables: ['Ad creative production', 'Landing page optimization', 'Campaign setup & launch', 'Tracking implementation']
    },
    {
        step: 4,
        title: 'Analytics & Optimization',
        description: 'We continuously monitor campaign performance, run A/B tests, and make data-driven optimizations. Our team identifies what works and scales winning strategies while cutting underperforming elements.',
        icon: ChartBarSquareIcon,
        deliverables: ['Performance dashboards', 'A/B test results', 'Optimization recommendations', 'Weekly performance updates']
    },
    {
        step: 5,
        title: 'Reporting & Scaling',
        description: 'Regular comprehensive reports provide insights into ROI, learnings, and growth opportunities. We work with you to scale successful campaigns and expand into new channels and markets.',
        icon: ArrowTrendingUpIcon,
        deliverables: ['Monthly ROI reports', 'Strategic recommendations', 'Growth opportunity analysis', 'Quarterly business reviews']
    }
];

export default function ProcessPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-pink-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Methodology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our Marketing Process
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        A proven 5-step workflow that ensures data-driven decisions, creative excellence, and measurable results for every campaign we run.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {processSteps.map((item, index) => (
                        <div key={item.step} className="relative">
                            {index < processSteps.length - 1 && (
                                <div className="absolute left-6 top-24 w-0.5 h-full bg-pink-200" />
                            )}
                            <div className="flex gap-8 items-start mb-12">
                                <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 relative z-10">
                                    {item.step}
                                </div>
                                <div className="flex-1 bg-gray-50 rounded-xl p-8 border border-gray-100 hover:border-pink-200 transition-colors">
                                    <div className="flex items-center gap-3 mb-4">
                                        <item.icon className="w-6 h-6 text-pink-500" />
                                        <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 mb-3">Key Deliverables:</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {item.deliverables.map((deliverable, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                                                    {deliverable}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-pink-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                    >
                        Start Your Marketing Journey
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </main>
    );
}
