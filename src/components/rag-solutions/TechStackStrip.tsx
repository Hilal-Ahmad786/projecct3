'use client';

import { motion } from 'framer-motion';

export default function TechStackStrip() {
    const technologies = [
        'LlamaIndex', 'LangChain', 'Pinecone', 'Weaviate', 'Chroma', 'Milvus',
        'Qdrant', 'FAISS', 'OpenAI Embeddings', 'Cohere Embeddings', 'Sentence Transformers', 'HuggingFace'
    ];

    return (
        <div className="w-full bg-gray-50 border-y border-gray-100 overflow-hidden py-8">
            <div className="relative flex">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />

                <motion.div
                    className="flex gap-12 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-400 font-medium text-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            {tech}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
