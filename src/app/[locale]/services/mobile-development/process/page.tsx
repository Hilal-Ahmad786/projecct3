export default function MobileProcessPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-blue-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Methodology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Mobile Development Process
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        A proven methodology to deliver mobile apps that users love and businesses rely on.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-12">
                    {[
                        { step: 1, title: 'Discovery & Strategy', desc: 'Understanding your users, market, and business goals to define the perfect app strategy.' },
                        { step: 2, title: 'UI/UX Design', desc: 'Creating intuitive, beautiful interfaces with wireframes, prototypes, and user testing.' },
                        { step: 3, title: 'Development', desc: 'Agile development with regular builds, code reviews, and continuous integration.' },
                        { step: 4, title: 'Quality Assurance', desc: 'Comprehensive testing across devices, OS versions, and edge cases.' },
                        { step: 5, title: 'Launch & Growth', desc: 'App store submission, ASO optimization, and post-launch analytics.' }
                    ].map((item) => (
                        <div key={item.step} className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                                {item.step}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
