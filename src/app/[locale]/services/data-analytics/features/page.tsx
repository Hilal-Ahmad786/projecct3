import { CheckCircleIcon } from '@heroicons/react/24/solid';

const features = [
    'Interactive Dashboard Development',
    'Real-time Data Visualization',
    'Predictive Analytics & Forecasting',
    'KPI Tracking & Monitoring',
    'Custom Report Generation',
    'Data Warehouse Integration',
    'ETL Pipeline Development',
    'Self-Service BI Solutions',
    'Mobile Analytics Dashboards',
    'Automated Data Alerts'
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Capabilities
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Comprehensive Analytics Solutions
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        We deliver end-to-end data analytics services that transform raw data into actionable business intelligence.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500 transition-colors">
                                    <CheckCircleIcon className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Built with precision to deliver accurate insights and drive data-informed decisions.
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
