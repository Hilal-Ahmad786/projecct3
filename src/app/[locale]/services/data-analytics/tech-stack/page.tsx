import { getTechIcon } from '@/components/icons/TechIcons';

export default function TechStackPage() {
    const techCategories = [
        {
            category: 'BI Platforms',
            items: ['Power BI', 'Tableau', 'Looker', 'Qlik']
        },
        {
            category: 'Data Processing',
            items: ['Python', 'R', 'SQL', 'Apache Spark']
        },
        {
            category: 'Cloud & Warehousing',
            items: ['Snowflake', 'BigQuery', 'Databricks', 'AWS Redshift']
        },
        {
            category: 'Libraries & Tools',
            items: ['Pandas', 'NumPy', 'Scikit-learn', 'dbt']
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Technology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Our Analytics Tech Stack
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        We leverage industry-leading tools and platforms to deliver powerful analytics solutions.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto space-y-12">
                    {techCategories.map((category, catIndex) => (
                        <div key={catIndex}>
                            <h3 className="text-cyan-400 font-semibold text-lg mb-4">{category.category}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {category.items.map((tech) => {
                                    const Icon = getTechIcon(tech);
                                    return (
                                        <div key={tech} className="p-6 bg-gray-800 rounded-lg border border-gray-700 flex flex-col items-center justify-center gap-4 hover:border-cyan-500 transition-colors group">
                                            <div className="w-12 h-12 text-gray-400 group-hover:text-cyan-400 transition-colors">
                                                <Icon className="w-full h-full" />
                                            </div>
                                            <span className="font-medium text-lg">{tech}</span>
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
