'use client';

import { motion } from 'framer-motion';
import { useSectionTranslations } from '@/hooks/useTranslations';
import {
    PaintBrushIcon,
    DevicePhoneMobileIcon,
    CursorArrowRaysIcon,
    SparklesIcon,
    RectangleGroupIcon,
    DocumentDuplicateIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

export default function DesignServices() {
    const t = useSectionTranslations('serviceSubpages.ui-ux-design');
    const features = t('features.items') as unknown as Array<{
        icon: string;
        title: string;
        description: string;
    }>;

    const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
        users: UserGroupIcon,
        cursor: CursorArrowRaysIcon,
        palette: PaintBrushIcon,
        mobile: DevicePhoneMobileIcon,
        sparkles: SparklesIcon,
        // Fallbacks
        layers: RectangleGroupIcon,
        documents: DocumentDuplicateIcon
    };

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        {t('features.headline')}
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        {t('features.description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = iconMap[feature.icon] || PaintBrushIcon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pink-500 transition-colors duration-300">
                                    <Icon className="w-6 h-6 text-pink-500 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
