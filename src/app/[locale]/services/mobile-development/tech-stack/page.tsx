import { getTechIcon } from '@/components/icons/TechIcons';

export default function MobileTechStackPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-blue-400 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Technology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Mobile Tech Stack
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Modern frameworks and tools for building world-class mobile applications.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase', 'Redux', 'GraphQL', 'REST APIs', 'AWS Amplify', 'TestFlight', 'Fastlane'].map((tech) => {
                        const Icon = getTechIcon(tech);
                        return (
                            <div key={tech} className="p-6 bg-gray-800 rounded-lg border border-gray-700 flex flex-col items-center justify-center gap-4 hover:border-blue-500 transition-colors group">
                                <div className="w-12 h-12 text-gray-400 group-hover:text-blue-400 transition-colors">
                                    <Icon className="w-full h-full" />
                                </div>
                                <span className="font-medium text-lg">{tech}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
