import { CheckCircleIcon, MagnifyingGlassIcon, CursorArrowRaysIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, EnvelopeIcon, ChartBarIcon, SparklesIcon, UserGroupIcon, VideoCameraIcon } from '@heroicons/react/24/solid';

const features = [
    {
        title: 'Search Engine Optimization (SEO)',
        description: 'Boost your organic visibility with comprehensive on-page, off-page, and technical SEO strategies that drive sustainable traffic growth.',
        icon: MagnifyingGlassIcon
    },
    {
        title: 'Pay-Per-Click Advertising (PPC)',
        description: 'Maximize ROI with data-driven Google Ads, Bing Ads, and display campaigns that target high-intent audiences at every funnel stage.',
        icon: CursorArrowRaysIcon
    },
    {
        title: 'Social Media Marketing',
        description: 'Build brand awareness and engagement across Facebook, Instagram, LinkedIn, TikTok, and emerging platforms with strategic content.',
        icon: ChatBubbleLeftRightIcon
    },
    {
        title: 'Content Marketing Strategy',
        description: 'Create compelling blogs, whitepapers, infographics, and multimedia content that attracts, educates, and converts your target audience.',
        icon: DocumentTextIcon
    },
    {
        title: 'Email Marketing Campaigns',
        description: 'Design automated email sequences, newsletters, and promotional campaigns that nurture leads and drive customer retention.',
        icon: EnvelopeIcon
    },
    {
        title: 'Conversion Rate Optimization',
        description: 'Improve website performance with A/B testing, heatmap analysis, and UX improvements that turn visitors into customers.',
        icon: ChartBarIcon
    },
    {
        title: 'Marketing Analytics & Reporting',
        description: 'Track, measure, and analyze campaign performance with comprehensive dashboards and actionable insights for continuous improvement.',
        icon: ChartBarIcon
    },
    {
        title: 'Brand Strategy & Positioning',
        description: 'Define your unique value proposition, brand voice, and market positioning to stand out in competitive landscapes.',
        icon: SparklesIcon
    },
    {
        title: 'Influencer Marketing',
        description: 'Partner with relevant influencers and content creators to amplify your brand reach and build authentic connections.',
        icon: UserGroupIcon
    },
    {
        title: 'Video Marketing & Production',
        description: 'Produce engaging video content for YouTube, social media, and ads that captures attention and drives engagement.',
        icon: VideoCameraIcon
    }
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-pink-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Capabilities
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Comprehensive Digital Marketing Solutions
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        We deliver end-to-end digital marketing services designed to grow your brand, generate qualified leads, and drive measurable business results across all channels.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:border-pink-200">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500 transition-colors">
                                    <feature.icon className="w-6 h-6 text-pink-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-4 p-6 bg-pink-50 rounded-xl border border-pink-100">
                        <CheckCircleIcon className="w-8 h-8 text-pink-500" />
                        <div className="text-left">
                            <p className="font-semibold text-gray-900">Need a Custom Marketing Strategy?</p>
                            <p className="text-gray-600 text-sm">Our team will create a tailored plan based on your unique business goals and budget.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
