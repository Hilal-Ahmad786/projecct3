'use client';

import { motion } from 'framer-motion';

interface BackgroundBlobsProps {
    className?: string;
}

export default function BackgroundBlobs({ className = '' }: BackgroundBlobsProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Blob 1 - Emerald */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[64px] mix-blend-multiply filter opacity-70 will-change-transform"
            />

            {/* Blob 2 - Purple */}
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2
                }}
                className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-[64px] mix-blend-multiply filter opacity-70 will-change-transform"
            />

            {/* Blob 3 - Orange */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 4
                }}
                className="absolute bottom-0 left-[20%] w-[600px] h-[600px] bg-orange-400/20 rounded-full blur-[64px] mix-blend-multiply filter opacity-70 will-change-transform"
            />
        </div>
    );
}
