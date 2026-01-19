import { CheckCircleIcon } from '@heroicons/react/24/solid';

const features = [
    {
        title: 'Penetration Testing',
        description: 'Comprehensive ethical hacking to identify vulnerabilities before attackers do.'
    },
    {
        title: 'Vulnerability Assessment',
        description: 'Systematic scanning and analysis to detect security weaknesses across your infrastructure.'
    },
    {
        title: 'Security Information & Event Management (SIEM)',
        description: 'Real-time monitoring and analysis of security events across your entire organization.'
    },
    {
        title: 'Incident Response Planning',
        description: 'Develop and test response procedures to minimize damage from security incidents.'
    },
    {
        title: 'Identity & Access Management',
        description: 'Implement robust authentication and authorization controls to protect sensitive resources.'
    },
    {
        title: 'Cloud Security',
        description: 'Secure your AWS, Azure, and GCP environments with best-practice configurations.'
    },
    {
        title: 'Network Security',
        description: 'Firewall management, intrusion detection, and network segmentation solutions.'
    },
    {
        title: 'Data Loss Prevention',
        description: 'Protect sensitive data from unauthorized access, leakage, or theft.'
    },
    {
        title: 'Security Awareness Training',
        description: 'Educate employees to recognize and prevent social engineering attacks.'
    },
    {
        title: 'Compliance & Audit Support',
        description: 'Achieve and maintain compliance with ISO 27001, SOC 2, GDPR, HIPAA, and PCI-DSS.'
    }
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-red-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Security Capabilities
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Comprehensive Cybersecurity Solutions
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Enterprise-grade security services designed to protect your organization from evolving threats.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg hover:border-red-100 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500 transition-colors">
                                    <CheckCircleIcon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
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
