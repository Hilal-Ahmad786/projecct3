import { CheckCircleIcon } from '@heroicons/react/24/solid';

const features = [
    'User Research & Persona Development',
    'Wireframing & Prototyping',
    'Visual Design & Branding',
    'Interaction Design & Micro-animations',
    'Responsive & Adaptive Design',
    'Design System Creation',
    'Usability Testing & Iteration',
    'Accessibility Compliance (WCAG)',
    'Cross-Platform Design Consistency',
    'Design Handoff & Developer Support'
];

const featureDescriptions = [
    'Deep understanding of your users through interviews, surveys, and behavioral analysis.',
    'Rapid visualization of ideas from low-fidelity sketches to interactive prototypes.',
    'Stunning visual identities that communicate your brand story effectively.',
    'Delightful micro-interactions that enhance user engagement and feedback.',
    'Seamless experiences across all screen sizes and device types.',
    'Scalable component libraries ensuring consistency across your product.',
    'Data-driven refinements based on real user feedback and testing.',
    'Inclusive designs that work for users of all abilities.',
    'Unified experience whether on web, iOS, Android, or desktop.',
    'Detailed specifications and assets for smooth developer implementation.'
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-indigo-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Capabilities
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Comprehensive Design Solutions
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        We deliver end-to-end UI/UX design services tailored to create exceptional user experiences.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500 transition-colors">
                                    <CheckCircleIcon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {featureDescriptions[index]}
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
