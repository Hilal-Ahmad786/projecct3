import { CheckCircleIcon } from '@heroicons/react/24/solid';

const features = [
    'Cross-Platform Development (React Native, Flutter)',
    'Native iOS Development (Swift)',
    'Native Android Development (Kotlin)',
    'Push Notifications & Real-time Updates',
    'Offline-First Architecture',
    'Biometric Authentication',
    'In-App Purchases & Subscriptions',
    'AR/VR Integration',
    'GPS & Location Services',
    'App Store Optimization (ASO)'
];

export default function MobileFeaturesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-blue-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Capabilities
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Mobile App Features
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Build powerful mobile applications with cutting-edge features that users love.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors">
                                    <CheckCircleIcon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Implemented with best practices for optimal performance and user experience.
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
