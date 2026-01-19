'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface BackgroundBlobsProps {
    className?: string;
    variant?: 'neutral' | 'subtle';
}

export default function BackgroundBlobs({ className = '', variant = 'neutral' }: BackgroundBlobsProps) {
    const prefersReducedMotion = useReducedMotion();

    // Static blobs for reduced motion preference
    if (prefersReducedMotion) {
        return (
            <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gray-400/10 rounded-full blur-[64px] opacity-40" />
                <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-gray-500/10 rounded-full blur-[64px] opacity-40" />
                <div className="absolute bottom-0 left-[20%] w-[600px] h-[600px] bg-gray-300/10 rounded-full blur-[64px] opacity-40" />
            </div>
        );
    }

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Blob 1 - Neutral Gray */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-0 left-0 w-[500px] h-[500px] bg-gray-400/10 rounded-full blur-[64px] mix-blend-multiply filter opacity-40 will-change-transform"
            />

            {/* Blob 2 - Medium Gray */}
            <motion.div
                animate={{
                    x: [0, -50, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-gray-500/10 rounded-full blur-[64px] mix-blend-multiply filter opacity-40 will-change-transform"
            />

            {/* Blob 3 - Light Gray */}
            <motion.div
                animate={{
                    x: [0, 30, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4
                }}
                className="absolute bottom-0 left-[20%] w-[600px] h-[600px] bg-gray-300/10 rounded-full blur-[64px] mix-blend-multiply filter opacity-40 will-change-transform"
            />
        </div>
    );
}
