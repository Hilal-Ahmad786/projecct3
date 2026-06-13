'use client';

import Image from 'next/image';
import LocalizedLink from '@/components/LocalizedLink';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FaLinkedin, FaXTwitter, FaGithub, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa6';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

// ── Service columns ─────────────────────────────────────────────────────
const SERVICE_COLS = [
  {
    colKey: 'webDev',
    heading: 'Web Development',
    href: '/services/web-development',
    links: [
      { linkKey: 'frontendDevelopment',   label: 'Frontend Development',    href: '/services/frontend-development'    },
      { linkKey: 'backendDevelopment',    label: 'Backend Development',     href: '/services/backend-development'     },
      { linkKey: 'fullStackDevelopment',  label: 'Full-Stack Development',  href: '/services/full-stack-development'  },
      { linkKey: 'eCommerceSolutions',    label: 'E-Commerce Solutions',    href: '/services/e-commerce'              },
      { linkKey: 'saasDevelopment',       label: 'SaaS Development',        href: '/services/saas-development'        },
      { linkKey: 'apiDevelopment',        label: 'API Development',         href: '/services/api-development'         },
      { linkKey: 'wordPressDevelopment',  label: 'WordPress Development',   href: '/services/wordpress-development'   },
      { linkKey: 'progressiveWebApps',    label: 'Progressive Web Apps',    href: '/services/progressive-web-apps'    },
      { linkKey: 'web3Blockchain',        label: 'Web3 & Blockchain',       href: '/services/web3-blockchain'         },
      { linkKey: 'enterpriseSoftware',    label: 'Enterprise Software',     href: '/services/enterprise-software'     },
    ],
  },
  {
    colKey: 'mobile',
    heading: 'Mobile & Apps',
    href: '/services/mobile-development',
    links: [
      { linkKey: 'iosDevelopment',        label: 'iOS Development',         href: '/services/ios-development'         },
      { linkKey: 'androidDevelopment',    label: 'Android Development',     href: '/services/android-development'     },
      { linkKey: 'flutterDevelopment',    label: 'Flutter Development',     href: '/services/flutter-development'     },
      { linkKey: 'reactNativeApps',       label: 'React Native Apps',       href: '/services/react-native-development'},
      { linkKey: 'crossPlatformApps',     label: 'Cross-Platform Apps',     href: '/services/cross-platform-apps'     },
      { linkKey: 'mvpDevelopment',        label: 'MVP Development',         href: '/services/mvp-development'         },
      { linkKey: 'noCodeLowCode',         label: 'No-Code / Low-Code',      href: '/services/no-code-low-code'        },
    ],
  },
  {
    colKey: 'ai',
    heading: 'AI & Machine Learning',
    href: '/services/ai-solutions',
    links: [
      { linkKey: 'aiConsultingStrategy',  label: 'AI Consulting & Strategy',href: '/services/ai-consulting-strategy'  },
      { linkKey: 'machineLearning',       label: 'Machine Learning',        href: '/services/machine-learning'        },
      { linkKey: 'chatbotDevelopment',    label: 'Chatbot Development',     href: '/services/chatbot-development'     },
      { linkKey: 'llmFineTuning',         label: 'LLM Fine-Tuning',         href: '/services/llm-finetuning'          },
      { linkKey: 'promptEngineering',     label: 'Prompt Engineering',      href: '/services/prompt-engineering'      },
      { linkKey: 'ragSolutions',          label: 'RAG Solutions',           href: '/services/rag-solutions'           },
      { linkKey: 'aiAgents',              label: 'AI Agents',               href: '/services/ai-agents'               },
      { linkKey: 'computerVision',        label: 'Computer Vision',         href: '/services/computer-vision'         },
      { linkKey: 'pythonAutomation',      label: 'Python Automation',       href: '/services/python-automation'       },
      { linkKey: 'mlopsDeployment',       label: 'MLOps Deployment',        href: '/services/mlops-deployment'        },
      { linkKey: 'conversationalAi', label: 'Conversational AI', href: '/services/conversational-ai' },
      { linkKey: 'llmServices', label: 'LLM Services', href: '/services/llm-services' },
    ],
  },
  {
    colKey: 'marketing',
    heading: 'Digital Marketing',
    href: '/services/seo',
    links: [
      { linkKey: 'seoServices',           label: 'SEO Services',            href: '/services/seo'                     },
      { linkKey: 'googleAds',             label: 'Google Ads',              href: '/services/google-ads'              },
      { linkKey: 'metaAds',               label: 'Meta Ads',                href: '/services/meta-ads'                },
      { linkKey: 'socialMediaMarketing',  label: 'Social Media Marketing',  href: '/services/social-media-marketing'  },
      { linkKey: 'tikTokMarketing',       label: 'TikTok Marketing',        href: '/services/tiktok-marketing'        },
      { linkKey: 'linkedInMarketing',     label: 'LinkedIn Marketing',      href: '/services/linkedin-marketing'      },
      { linkKey: 'whatsAppMarketing',     label: 'WhatsApp Marketing',      href: '/services/whatsapp-marketing'      },
      { linkKey: 'emailMarketing',        label: 'Email Marketing',         href: '/services/email-marketing'         },
      { linkKey: 'contentMarketing',      label: 'Content Marketing',       href: '/services/content-marketing'       },
      { linkKey: 'marketingAutomation',   label: 'Marketing Automation',    href: '/services/marketing-automation'    },
      { linkKey: 'digitalMarketing', label: 'Digital Marketing', href: '/services/digital-marketing' },
      { linkKey: 'marketplaceAds', label: 'Marketplace Ads', href: '/services/marketplace-ads' },
    ],
  },
  {
    colKey: 'design',
    heading: 'Design & Creative',
    href: '/services/ui-ux-design',
    links: [
      { linkKey: 'uiUxDesign',            label: 'UI/UX Design',            href: '/services/ui-ux-design'            },
      { linkKey: 'webDesign',             label: 'Web Design',              href: '/services/web-design'              },
      { linkKey: 'graphicDesign',         label: 'Graphic Design',          href: '/services/graphic-design'          },
      { linkKey: 'logoBrandIdentity',     label: 'Logo & Brand Identity',   href: '/services/logo-brand-identity'     },
      { linkKey: 'brandStrategy',         label: 'Brand Strategy',          href: '/services/brand-strategy'          },
      { linkKey: 'motionGraphics',        label: 'Motion Graphics',         href: '/services/motion-graphics'         },
      { linkKey: '3dArVr',               label: 'AR / VR Development',     href: '/services/ar-development'          },
      { linkKey: 'croAbTesting',          label: 'CRO & A/B Testing',       href: '/services/cro'                     },
    ],
  },
  {
    colKey: 'devops',
    heading: 'DevOps & Infrastructure',
    href: '/services/devops-cloud',
    links: [
      { linkKey: 'devOpsCiCd',            label: 'DevOps & CI/CD',          href: '/services/ci-cd-pipelines'         },
      { linkKey: 'cloudMigration',        label: 'Cloud Migration',         href: '/services/cloud-migration'         },
      { linkKey: 'dataAnalyticsBi',       label: 'Data Analytics & BI',     href: '/services/data-analytics'          },
      { linkKey: 'cybersecurity',         label: 'Cybersecurity',           href: '/services/cybersecurity'           },
      { linkKey: 'databaseServices',      label: 'Database Services',       href: '/services/database-services'       },
      { linkKey: 'performanceOptimization',label:'Performance Optimization', href: '/services/performance-optimization'},
      { linkKey: 'managedServices',       label: 'Managed Services',        href: '/services/managed-services'        },
      { linkKey: 'techConsulting',        label: 'Tech Consulting',         href: '/services/technology-consulting'   },
      { linkKey: 'digitalTransformation', label: 'Digital Transformation', href: '/services/digital-transformation' },
      { linkKey: 'aiStrategy', label: 'AI Strategy', href: '/services/ai-strategy' },
      { linkKey: 'growthStrategy', label: 'Growth Strategy', href: '/services/growth-strategy' },
      { linkKey: 'startupServices', label: 'Startup Services', href: '/services/startup-services' },
      { linkKey: 'staffAugmentation', label: 'Staff Augmentation', href: '/services/staff-augmentation' },
    ],
  },
];

const SOCIAL = [
  { Icon: FaLinkedin,  href: 'https://linkedin.com/company/paksoft',  label: 'LinkedIn'  },
  { Icon: FaFacebook,  href: 'https://facebook.com/Paksoft',          label: 'Facebook'  },
  { Icon: FaInstagram, href: 'https://instagram.com/paksoft3',        label: 'Instagram' },
  { Icon: FaXTwitter,  href: 'https://twitter.com/paksoft3',          label: 'X'         },
  { Icon: FaGithub,    href: 'https://github.com/paksoft',            label: 'GitHub'    },
  { Icon: FaYoutube,   href: 'https://youtube.com/@paksoft3',         label: 'YouTube'   },
];

const NAV_LINKS = [
  { key: 'home',     href: '/'         },
  { key: 'about',    href: '/about'    },
  { key: 'services', href: '/services' },
  { key: 'projects', href: '/projects' },
  { key: 'blog',     href: '/blog'     },
  { key: 'contact',  href: '/contact'  },
];

const LEGAL_LINKS = [
  { key: 'privacy',  href: '/privacy-policy'   },
  { key: 'terms',    href: '/terms-of-service' },
  { key: 'cookies',  href: '/cookie-policy'    },
  { key: 'sitemap',  href: '/sitemap.xml', external: true },
];

function FooterWrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

export default function Footer() {
  const { dir } = useTranslations();
  const t = useSectionTranslations('footer');

  const year = new Date().getFullYear();
  const copyright = (t('copyright') as string).replace('{year}', String(year));

  const tagline = t('cta.tagline') as string;
  const taglineHighlight = t('cta.taglineHighlight') as string;
  const taglineParts = tagline.split(taglineHighlight);

  return (
    <footer className="bg-gray-900 text-white" dir={dir} aria-label="Site footer">

      {/* ══ 1. CTA STRIP ══════════════════════════════════════════════ */}
      <div className="border-t-[3px] border-accent-emerald">
        <FooterWrap className="py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-emerald mb-2"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {t('cta.readyToBuild') as string}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight">
                {taglineParts[0]}
                <span className="font-semibold text-accent-emerald">{taglineHighlight}</span>
                {taglineParts[1]}
              </h2>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <LocalizedLink
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-emerald text-white text-sm font-bold rounded-lg hover:bg-emerald-600 transition-colors"
              >
                {t('cta.startProject') as string}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d={dir === 'rtl' ? 'M11 17l-5-5m0 0l5-5m-5 5h12' : 'M13 7l5 5m0 0l-5 5m5-5H6'} />
                </svg>
              </LocalizedLink>
              <LocalizedLink
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-600 text-gray-400 text-sm font-medium rounded-lg hover:border-accent-emerald hover:text-accent-emerald transition-colors"
              >
                {t('cta.viewServices') as string}
              </LocalizedLink>
            </div>
          </div>
        </FooterWrap>
      </div>

      {/* ══ 2. BRAND + NEWSLETTER ═════════════════════════════════════ */}
      <div className="border-t border-gray-800/70">
        <FooterWrap className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16">

            {/* Brand */}
            <div>
              <LocalizedLink href="/" aria-label="PakSoft home">
                <Image
                  src="/images/logo/logowhite.png"
                  alt="PakSoft — Full-Service Digital Agency"
                  width={148}
                  height={48}
                  className="mb-6"
                  priority
                />
              </LocalizedLink>

              <p className="text-[15px] text-gray-400 leading-relaxed max-w-[420px] mb-8">
                {t('brand.description') as string}
              </p>

              {/* Contact */}
              <address className="not-italic space-y-3.5 mb-8">
                {[
                  { Icon: EnvelopeIcon, label: 'paksoft3@gmail.com', href: 'mailto:paksoft3@gmail.com' },
                  { Icon: PhoneIcon,    label: '+90 552 567 71 64',   href: 'tel:+905525677164' },
                  { Icon: MapPinIcon,   label: dir === 'rtl' ? (t('contactInfo.location.value') as string) || 'Yozgat, Turkey' : 'Yozgat, Turkey',
                    href: 'https://maps.google.com/maps?q=Yozgat,Turkey', external: true },
                ].map(({ Icon, label, href, external }) => (
                  <a
                    key={href}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 text-[14px] text-gray-400 hover:text-accent-emerald transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-white/5 border border-gray-700/50 group-hover:border-accent-emerald/40 group-hover:bg-accent-emerald/10 flex items-center justify-center flex-shrink-0 transition-colors">
                      <Icon className="w-4 h-4" />
                    </span>
                    {label}
                  </a>
                ))}
              </address>

              {/* Social */}
              <div className="flex items-center gap-2.5">
                {SOCIAL.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-gray-700/50 hover:bg-accent-emerald/20 hover:border-accent-emerald/50 flex items-center justify-center transition-colors duration-200 text-gray-400 hover:text-accent-emerald"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white/[0.03] border border-gray-800/70 rounded-xl p-8 lg:p-10 self-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-emerald mb-3"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {t('newsletter.label') as string}
              </p>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('newsletter.title') as string}
              </h3>
              <p className="text-[14px] text-gray-400 leading-relaxed mb-6">
                {t('newsletter.description') as string}
              </p>
              <form onSubmit={(e) => e.preventDefault()} aria-label="Newsletter signup" className="space-y-3">
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder') as string}
                  required
                  className="w-full px-4 py-3 text-[14px] bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-emerald transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-[14px] font-semibold bg-accent-emerald text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  {t('newsletter.submit') as string}
                </button>
              </form>
              <p className="text-[12px] text-gray-500 mt-4">
                {t('newsletter.disclaimer') as string}
              </p>
            </div>
          </div>
        </FooterWrap>
      </div>

      {/* ══ 3. ALL SERVICES GRID ══════════════════════════════════════ */}
      <div className="border-t border-gray-800/70">
        <FooterWrap className="py-16">
          <div className="flex items-center gap-4 mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-emerald flex-shrink-0"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {t('servicesSection.heading') as string}
            </p>
            <div className="h-px bg-gray-700/50 flex-1" />
            <LocalizedLink
              href="/services"
              className="text-[12px] text-gray-400 hover:text-accent-emerald transition-colors flex-shrink-0"
            >
              {t('servicesSection.viewAll') as string}
            </LocalizedLink>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
            {SERVICE_COLS.map(({ colKey, heading, href, links }) => {
              const translatedHeading = (t(`servicesSection.cols.${colKey}`) as string) || heading;
              return (
                <nav
                  key={colKey}
                  className="bg-white/[0.03] border border-gray-800/70 rounded-lg p-5 hover:border-accent-emerald/25 transition-colors"
                  aria-label={`${translatedHeading} services`}
                >
                  <LocalizedLink
                    href={href}
                    className="block text-[11px] font-bold uppercase tracking-[0.14em] text-accent-emerald hover:text-emerald-400 mb-4 transition-colors leading-tight"
                  >
                    {translatedHeading}
                  </LocalizedLink>
                  <ul className="space-y-2.5">
                    {links.map(({ linkKey, label, href: lhref }) => {
                      const raw = t(`serviceLinks.${linkKey}`) as string;
                      // translator returns the key path when missing — fall back to the hardcoded label
                      const translatedLabel = raw && !raw.includes('serviceLinks.') ? raw : label;
                      return (
                        <li key={lhref}>
                          <LocalizedLink
                            href={lhref}
                            className="text-[13px] text-gray-400 hover:text-white transition-colors leading-snug block"
                          >
                            {translatedLabel}
                          </LocalizedLink>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              );
            })}
          </div>
        </FooterWrap>
      </div>

      {/* ══ 4. COMPANY NAV ROW ════════════════════════════════════════ */}
      <div className="border-t border-gray-800/70">
        <FooterWrap className="py-6">
          <nav aria-label="Company navigation" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5">
            {NAV_LINKS.map(({ key, href }) => (
              <LocalizedLink
                key={href}
                href={href}
                className="text-[14px] text-gray-300 hover:text-white transition-colors"
              >
                {(t(`nav.${key}`) as string)}
              </LocalizedLink>
            ))}
          </nav>
        </FooterWrap>
      </div>

      {/* ══ 5. DEVELOPED BY ═══════════════════════════════════════════ */}
      <div className="border-t border-gray-800/70 relative py-10">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent" />
        <div className="relative flex justify-center">
          <a
            href="https://paksoft.com.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gray-900 px-10 flex items-center gap-3"
          >
            <span className="text-[14px] text-gray-400 group-hover:text-gray-300 transition-colors">
              {t('developedBy') as string}
            </span>
            <span className="flex items-center gap-2 text-accent-emerald group-hover:text-emerald-400 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 -rotate-12 flex-shrink-0">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.5 5.08-1.38-.7.13-1.42.21-2.16.21-5.52 0-10-4.48-10-10S9.42 2.83 14.92 2.83c.74 0 1.46.08 2.16.21C15.58 2.5 13.85 2 12 2z" />
              </svg>
              <span className="text-[22px] font-bold tracking-wide">PakSoft</span>
            </span>
          </a>
        </div>
      </div>

      {/* ══ 6. BOTTOM BAR ═════════════════════════════════════════════ */}
      <div className="border-t border-gray-800/70 bg-gray-950">
        <FooterWrap className="py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <span className="text-[12px] text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {copyright}
            </span>

            <nav aria-label="Legal pages" className="flex items-center gap-6 flex-wrap justify-center">
              {LEGAL_LINKS.map(({ key, href, external }) =>
                external ? (
                  <a key={href} href={href} className="text-[12px] text-gray-400 hover:text-gray-200 transition-colors">
                    {t(`legal.${key}`) as string}
                  </a>
                ) : (
                  <LocalizedLink key={href} href={href} className="text-[12px] text-gray-400 hover:text-gray-200 transition-colors">
                    {t(`legal.${key}`) as string}
                  </LocalizedLink>
                )
              )}
            </nav>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[12px] text-gray-400 hover:text-accent-emerald transition-colors flex items-center gap-1.5 group"
            >
              {t('backToTop') as string}
              <svg className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>

          </div>
        </FooterWrap>
      </div>

    </footer>
  );
}
