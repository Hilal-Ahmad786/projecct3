'use client';

import { motion } from 'framer-motion';

export default function TechStackStrip() {
    const tools = [
        'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects',
        'InVision', 'Principle', 'Framer', 'Zeplin', 'Abstract', 'Miro'
    ];

    return (
        <div className="w-full bg-pink-50 border-y border-pink-100 overflow-hidden py-8">
            <div className="relative flex">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-pink-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-pink-50 to-transparent z-10" />

                {/* Scrolling Content */}
                <motion.div
                    className="flex gap-12 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {/* Repeat list 3 times for seamless loop */}
                    {[...tools, ...tools, ...tools].map((tool, index) => (
                        <div key={index} className="flex items-center gap-2 text-pink-400 font-medium text-lg">
                            {/* Simple dot separator */}
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-300" />
                            {tool}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
