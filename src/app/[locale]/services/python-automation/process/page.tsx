'use client';

import { motion } from 'framer-motion';

const processSteps = [
    {
        step: 1,
        title: 'Discovery & Analysis',
        description: 'We analyze your current workflows, identify repetitive tasks, and document automation opportunities that will deliver the highest ROI.',
        details: ['Process mapping', 'Pain point identification', 'ROI assessment', 'Feasibility study']
    },
    {
        step: 2,
        title: 'Solution Design',
        description: 'Our team designs a custom automation architecture tailored to your specific needs, selecting the optimal Python tools and frameworks.',
        details: ['Technology selection', 'Architecture planning', 'Integration mapping', 'Security planning']
    },
    {
        step: 3,
        title: 'Development & Testing',
        description: 'We build your automation scripts with clean, maintainable code, testing thoroughly to ensure reliability and error handling.',
        details: ['Agile development', 'Unit testing', 'Integration testing', 'Error handling']
    },
    {
        step: 4,
        title: 'Deployment & Training',
        description: 'We deploy your automation solution, set up scheduling, and train your team on how to monitor and manage the system.',
        details: ['Production deployment', 'Task scheduling', 'Team training', 'Documentation']
    },
    {
        step: 5,
        title: 'Monitoring & Optimization',
        description: 'Ongoing monitoring ensures your automations run smoothly, with continuous optimization to improve performance and handle edge cases.',
        details: ['Performance monitoring', 'Error alerts', 'Continuous improvement', 'Support & maintenance']
    }
];

export default function ProcessPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <span className="text-orange-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Methodology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our Automation Process
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        A proven 5-step methodology that ensures your automation project succeeds from discovery to deployment.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {processSteps.map((item, index) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex gap-6 items-start bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                                {item.step}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {item.details.map((detail, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full"
                                        >
                                            {detail}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
