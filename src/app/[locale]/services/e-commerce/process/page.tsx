export default function ProcessPage() {
    const steps = [
        {
            step: 1,
            title: 'Discovery & Strategy',
            desc: 'We analyze your target market, competitors, and business goals to create a comprehensive e-commerce strategy. This includes platform selection, feature prioritization, and a roadmap for success.',
            deliverables: ['Market analysis report', 'Platform recommendation', 'Feature requirements document', 'Project timeline']
        },
        {
            step: 2,
            title: 'UX Design & Prototyping',
            desc: 'Creating intuitive shopping experiences with wireframes and interactive prototypes. We focus on conversion optimization, mobile-first design, and seamless checkout flows.',
            deliverables: ['User journey maps', 'Wireframes', 'Interactive prototype', 'Design system']
        },
        {
            step: 3,
            title: 'Development & Integration',
            desc: 'Building your store with modern technologies and integrating payment gateways (Stripe, PayPal), shipping providers, inventory systems, and third-party tools.',
            deliverables: ['Responsive storefront', 'Admin dashboard', 'Payment integration', 'API connections']
        },
        {
            step: 4,
            title: 'Testing & Optimization',
            desc: 'Rigorous testing across devices and browsers, load testing for peak traffic, security audits, and conversion rate optimization before launch.',
            deliverables: ['QA test results', 'Performance report', 'Security audit', 'Optimization recommendations']
        },
        {
            step: 5,
            title: 'Launch & Growth',
            desc: 'Seamless deployment followed by ongoing optimization, A/B testing, analytics monitoring, and scaling strategies to grow your online business.',
            deliverables: ['Launch checklist', 'Training documentation', 'Analytics setup', 'Support plan']
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Methodology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our E-Commerce Development Process
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        A proven 5-step approach to building successful online stores that convert visitors into loyal customers.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {steps.map((item) => (
                        <div key={item.step} className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow">
                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 mb-4">{item.desc}</p>
                                    <div className="bg-emerald-50 rounded-lg p-4">
                                        <h4 className="text-sm font-semibold text-emerald-700 mb-2">Key Deliverables:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {item.deliverables.map((deliverable, idx) => (
                                                <span key={idx} className="text-sm bg-white text-emerald-600 px-3 py-1 rounded-full border border-emerald-200">
                                                    {deliverable}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto mt-16">
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Typical Project Timeline</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center p-4">
                                <div className="text-3xl font-bold text-emerald-500 mb-2">4-6 Weeks</div>
                                <h3 className="font-semibold text-gray-900 mb-1">Shopify Store</h3>
                                <p className="text-gray-500 text-sm">Theme customization with standard integrations</p>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-3xl font-bold text-emerald-500 mb-2">8-12 Weeks</div>
                                <h3 className="font-semibold text-gray-900 mb-1">WooCommerce / Custom</h3>
                                <p className="text-gray-500 text-sm">Full custom development with complex features</p>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-3xl font-bold text-emerald-500 mb-2">3-6 Months</div>
                                <h3 className="font-semibold text-gray-900 mb-1">Enterprise Platform</h3>
                                <p className="text-gray-500 text-sm">Magento or headless commerce solutions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
