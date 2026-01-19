'use client';

import { motion } from 'framer-motion';

export default function TechStackStrip() {
    // DevOps and Cloud technologies
    const technologies = [
        'AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions',
        'Azure', 'GCP', 'Ansible', 'Prometheus', 'Grafana', 'ArgoCD'
    ];

    return (
        <div className="w-full bg-sky-50 border-y border-sky-100 overflow-hidden py-8">
            <div className="relative flex">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-sky-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-sky-50 to-transparent z-10" />

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
                    {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                        <div key={index} className="flex items-center gap-2 text-sky-600 font-medium text-lg">
                            {/* Simple dot separator */}
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                            {tech}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
