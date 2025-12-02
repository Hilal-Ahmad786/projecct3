export default function TechStackPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-emerald-400 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Technology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Our Tech Stack
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        We use the latest and most reliable tools to build your digital products.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'GraphQL', 'AWS'].map((tech) => (
                        <div key={tech} className="p-6 bg-gray-800 rounded-lg border border-gray-700 text-center hover:border-emerald-500 transition-colors">
                            <span className="font-medium text-lg">{tech}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
