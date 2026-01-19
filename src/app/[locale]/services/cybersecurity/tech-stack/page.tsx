import { getTechIcon } from '@/components/icons/TechIcons';

export default function TechStackPage() {
    const categories = [
        {
            name: 'SIEM & Monitoring',
            tools: ['Splunk', 'IBM QRadar', 'Azure Sentinel', 'Elastic SIEM']
        },
        {
            name: 'Endpoint Protection',
            tools: ['CrowdStrike', 'Carbon Black', 'SentinelOne', 'Microsoft Defender']
        },
        {
            name: 'Firewalls & Network',
            tools: ['Palo Alto', 'Fortinet', 'Cisco ASA', 'pfSense']
        },
        {
            name: 'Vulnerability Scanning',
            tools: ['Nessus', 'Qualys', 'OpenVAS', 'Rapid7']
        },
        {
            name: 'Penetration Testing',
            tools: ['Metasploit', 'Burp Suite', 'Kali Linux', 'Cobalt Strike']
        },
        {
            name: 'Identity & Access',
            tools: ['Okta', 'Azure AD', 'HashiCorp Vault', 'CyberArk']
        },
        {
            name: 'Cloud Security',
            tools: ['AWS Security Hub', 'Prisma Cloud', 'CloudGuard', 'Lacework']
        },
        {
            name: 'Threat Intelligence',
            tools: ['Recorded Future', 'VirusTotal', 'AlienVault', 'MISP']
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-red-400 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Technology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Security Tech Stack
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Industry-leading security tools and platforms we use to protect your organization.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto space-y-12">
                    {categories.map((category, idx) => (
                        <div key={idx}>
                            <h3 className="text-red-400 font-medium mb-4">{category.name}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {category.tools.map((tech) => {
                                    const Icon = getTechIcon(tech);
                                    return (
                                        <div key={tech} className="p-6 bg-gray-800 rounded-lg border border-gray-700 flex flex-col items-center justify-center gap-4 hover:border-red-500 transition-colors group">
                                            <div className="w-12 h-12 text-gray-400 group-hover:text-red-400 transition-colors">
                                                <Icon className="w-full h-full" />
                                            </div>
                                            <span className="font-medium text-lg">{tech}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
