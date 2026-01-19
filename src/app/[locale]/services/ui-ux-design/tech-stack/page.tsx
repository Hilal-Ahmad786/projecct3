const toolCategories = [
    {
        category: 'Design Tools',
        tools: ['Figma', 'Sketch', 'Adobe XD', 'Photoshop']
    },
    {
        category: 'Prototyping',
        tools: ['Figma Prototypes', 'InVision', 'Principle', 'Framer']
    },
    {
        category: 'Collaboration',
        tools: ['Miro', 'FigJam', 'Notion', 'Slack']
    },
    {
        category: 'Design Systems',
        tools: ['Storybook', 'Zeroheight', 'Abstract', 'Zeplin']
    },
    {
        category: 'User Research',
        tools: ['Hotjar', 'Maze', 'UserTesting', 'Dovetail']
    },
    {
        category: 'Graphics & Animation',
        tools: ['Illustrator', 'After Effects', 'Lottie', 'Rive']
    }
];

import { getTechIcon } from '@/components/icons/TechIcons';

export default function TechStackPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-indigo-400 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Design Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Our Design Stack
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        We use industry-leading tools to create stunning, functional designs.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto space-y-12">
                    {toolCategories.map((category) => (
                        <div key={category.category}>
                            <h2 className="text-lg font-medium text-indigo-400 mb-4">{category.category}</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {category.tools.map((tool) => {
                                    const Icon = getTechIcon(tool);
                                    return (
                                        <div
                                            key={tool}
                                            className="p-6 bg-gray-800 rounded-lg border border-gray-700 flex flex-col items-center justify-center gap-4 hover:border-indigo-500 hover:bg-gray-800/80 transition-all duration-300 group"
                                        >
                                            <div className="w-12 h-12 text-gray-400 group-hover:text-white transition-colors">
                                                <Icon className="w-full h-full" />
                                            </div>
                                            <span className="font-medium text-lg text-gray-200 group-hover:text-white transition-colors">{tool}</span>
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
