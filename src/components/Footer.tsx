'use client';

import Image from 'next/image';
import LocalizedLink from '@/components/LocalizedLink';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FaLinkedin, FaXTwitter, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa6';
import { useTranslations } from '@/hooks/useTranslations';

// ── Site theme tokens ─────────────────────────────────────────────────
// footer bg   : gray-900  (#111827)
// bottom strip: gray-950  (#030712)
// accent      : #16a085   (accent-emerald)
// desktop margin: 40px

// ── Service columns ────────────────────────────────────────────────────
const SERVICE_COLS = [
  {
    heading: 'Web Development',
    href: '/services/web-development',
    links: [
      { label: 'Frontend Development',    href: '/services/frontend-development'    },
      { label: 'Backend Development',     href: '/services/backend-development'     },
      { label: 'Full-Stack Development',  href: '/services/full-stack-development'  },
      { label: 'E-Commerce Solutions',    href: '/services/e-commerce'              },
      { label: 'SaaS Development',        href: '/services/saas-development'        },
      { label: 'API Development',         href: '/services/api-development'         },
      { label: 'WordPress Development',   href: '/services/wordpress-development'   },
      { label: 'Progressive Web Apps',    href: '/services/progressive-web-apps'    },
      { label: 'Web3 & Blockchain',       href: '/services/web3-blockchain'         },
      { label: 'Enterprise Software',     href: '/services/enterprise-software'     },
    ],
  },
  {
    heading: 'Mobile & Apps',
    href: '/services/mobile-development',
    links: [
      { label: 'iOS Development',         href: '/services/ios-development'         },
      { label: 'Android Development',     href: '/services/android-development'     },
      { label: 'Flutter Development',     href: '/services/flutter-development'     },
      { label: 'React Native Apps',       href: '/services/react-native-development'},
      { label: 'Cross-Platform Apps',     href: '/services/cross-platform-apps'     },
      { label: 'MVP Development',         href: '/services/mvp-development'         },
      { label: 'No-Code / Low-Code',      href: '/services/no-code-low-code'        },
    ],
  },
  {
    heading: 'AI & Machine Learning',
    href: '/services/ai-solutions',
    links: [
      { label: 'AI Consulting & Strategy',href: '/services/ai-consulting-strategy'  },
      { label: 'Machine Learning',        href: '/services/machine-learning'        },
      { label: 'Chatbot Development',     href: '/services/chatbot-development'     },
      { label: 'LLM Fine-Tuning',         href: '/services/llm-finetuning'          },
      { label: 'Prompt Engineering',      href: '/services/prompt-engineering'      },
      { label: 'RAG Solutions',           href: '/services/rag-solutions'           },
      { label: 'AI Agents',               href: '/services/ai-agents'               },
      { label: 'Computer Vision',         href: '/services/computer-vision'         },
      { label: 'Python Automation',       href: '/services/python-automation'       },
      { label: 'MLOps Deployment',        href: '/services/mlops-deployment'        },
    ],
  },
  {
    heading: 'Digital Marketing',
    href: '/services/seo',
    links: [
      { label: 'SEO Services',            href: '/services/seo'                     },
      { label: 'Google Ads',              href: '/services/google-ads'              },
      { label: 'Meta Ads',                href: '/services/meta-ads'                },
      { label: 'Social Media Marketing',  href: '/services/social-media-marketing'  },
      { label: 'TikTok Marketing',        href: '/services/tiktok-marketing'        },
      { label: 'LinkedIn Marketing',      href: '/services/linkedin-marketing'      },
      { label: 'WhatsApp Marketing',      href: '/services/whatsapp-marketing'      },
      { label: 'Email Marketing',         href: '/services/email-marketing'         },
      { label: 'Content Marketing',       href: '/services/content-marketing'       },
      { label: 'Marketing Automation',    href: '/services/marketing-automation'    },
    ],
  },
  {
    heading: 'Design & Creative',
    href: '/services/ui-ux-design',
    links: [
      { label: 'UI/UX Design',            href: '/services/ui-ux-design'            },
      { label: 'Web Design',              href: '/services/web-design'              },
      { label: 'Graphic Design',          href: '/services/graphic-design'          },
      { label: 'Logo & Brand Identity',   href: '/services/logo-brand-identity'     },
      { label: 'Brand Strategy',          href: '/services/brand-strategy'          },
      { label: 'Motion Graphics',         href: '/services/motion-graphics'         },
      { label: '3D / AR / VR',            href: '/services/3d-ar-vr'                },
      { label: 'CRO & A/B Testing',       href: '/services/cro'                     },
    ],
  },
  {
    heading: 'DevOps & Infrastructure',
    href: '/services/devops-cloud',
    links: [
      { label: 'DevOps & CI/CD',          href: '/services/ci-cd-pipelines'         },
      { label: 'Cloud Migration',         href: '/services/cloud-migration'         },
      { label: 'Data Analytics & BI',     href: '/services/data-analytics'          },
      { label: 'Cybersecurity',           href: '/services/cybersecurity'           },
      { label: 'Database Services',       href: '/services/database-services'       },
      { label: 'Performance Optimization',href: '/services/performance-optimization'},
      { label: 'Managed Services',        href: '/services/managed-services'        },
      { label: 'Tech Consulting',         href: '/services/technology-consulting'   },
    ],
  },
];

const SOCIAL = [
  { Icon: FaLinkedin,  href: 'https://linkedin.com/company/paktechnology', label: 'LinkedIn'  },
  { Icon: FaXTwitter,  href: 'https://twitter.com/paktechnology',          label: 'X'         },
  { Icon: FaGithub,    href: 'https://github.com/paktechnology',           label: 'GitHub'    },
  { Icon: FaInstagram, href: 'https://instagram.com/paktechnology',        label: 'Instagram' },
  { Icon: FaYoutube,   href: 'https://youtube.com/@paktechnology',         label: 'YouTube'   },
];

const NAV_LINKS = [
  { label: 'Home',       href: '/'         },
  { label: 'About Us',   href: '/about'    },
  { label: 'Services',   href: '/services' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Blog',       href: '/blog'     },
  { label: 'Contact',    href: '/contact'  },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   href: '/privacy-policy'   },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Cookie Policy',    href: '/cookie-policy'    },
  { label: 'Sitemap',          href: '/sitemap.xml', external: true },
];

// ── Wrapper keeps the 40px desktop margin from DESIGN.md ──────────────
function FooterWrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
export default function Footer() {
  const { dir } = useTranslations();

  return (
    <footer
      className="bg-gray-900 text-white"
      dir={dir}
      aria-label="Site footer"
    >

      {/* ══ 1. CTA STRIP ═════════════════════════════════════════════ */}
      <div className="border-t-[3px] border-accent-emerald">
        <FooterWrap className="py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-emerald mb-2"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Ready to build?
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight">
                Turn your idea into a{' '}
                <span className="font-semibold text-accent-emerald">digital product</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <LocalizedLink
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-emerald text-white text-sm font-bold rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Start a Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </LocalizedLink>
              <LocalizedLink
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-600 text-gray-400 text-sm font-medium rounded-lg hover:border-accent-emerald hover:text-accent-emerald transition-colors"
              >
                View Services
              </LocalizedLink>
            </div>
          </div>
        </FooterWrap>
      </div>

      {/* ══ 2. BRAND + NEWSLETTER ════════════════════════════════════ */}
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
                Full-service digital agency delivering Web Development, Mobile Apps, AI Solutions,
                and Digital Marketing from Turkey — trusted by teams in 30+ countries.
              </p>

              {/* Contact */}
              <address className="not-italic space-y-3.5 mb-8">
                {[
                  { Icon: EnvelopeIcon, label: 'info@paksoft.com.tr',  href: 'mailto:info@paksoft.com.tr' },
                  { Icon: PhoneIcon,    label: '+90 552 567 71 64',     href: 'tel:+905525677164' },
                  { Icon: MapPinIcon,   label: 'Yozgat, Turkey',        href: 'https://maps.google.com/maps?q=Yozgat,Turkey', external: true },
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
            <div className="bg-white/[0.03] border border-gray-800/70 rounded-3xl p-8 lg:p-10 self-start">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-emerald mb-3"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Newsletter
              </p>
              <h3 className="text-xl font-semibold text-white mb-3">
                Stay ahead of the curve
              </h3>
              <p className="text-[14px] text-gray-400 leading-relaxed mb-6">
                Weekly insights on AI, web development, and digital growth strategies — straight to your inbox.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter signup"
                className="space-y-3"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 text-[14px] bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-emerald transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-[14px] font-semibold bg-accent-emerald text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-[12px] text-gray-500 mt-4">
                No spam · Unsubscribe anytime · GDPR compliant
              </p>
            </div>
          </div>
        </FooterWrap>
      </div>

      {/* ══ 3. ALL SERVICES GRID ════════════════════════════════════ */}
      <div className="border-t border-gray-800/70">
        <FooterWrap className="py-16">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-12">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-emerald flex-shrink-0"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              All Services
            </p>
            <div className="h-px bg-gray-700/50 flex-1" />
            <LocalizedLink
              href="/services"
              className="text-[12px] text-gray-400 hover:text-accent-emerald transition-colors flex-shrink-0"
            >
              View all →
            </LocalizedLink>
          </div>

          {/* 6-column bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
            {SERVICE_COLS.map(({ heading, href, links }) => (
              <nav
                key={heading}
                className="bg-white/[0.03] border border-gray-800/70 rounded-2xl p-5 hover:border-accent-emerald/25 transition-colors"
                aria-label={`${heading} services`}
              >
                <LocalizedLink
                  href={href}
                  className="block text-[11px] font-bold uppercase tracking-[0.14em] text-accent-emerald hover:text-emerald-400 mb-4 transition-colors leading-tight"
                >
                  {heading}
                </LocalizedLink>
                <ul className="space-y-2.5">
                  {links.map(({ label, href: lhref }) => (
                    <li key={lhref}>
                      <LocalizedLink
                        href={lhref}
                        className="text-[13px] text-gray-400 hover:text-white transition-colors leading-snug block"
                      >
                        {label}
                      </LocalizedLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </FooterWrap>
      </div>

      {/* ══ 4. COMPANY NAV ROW ══════════════════════════════════════ */}
      <div className="border-t border-gray-800/70">
        <FooterWrap className="py-6">
          <nav
            aria-label="Company navigation"
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <LocalizedLink
                key={href}
                href={href}
                className="text-[14px] text-gray-300 hover:text-white transition-colors"
              >
                {label}
              </LocalizedLink>
            ))}
          </nav>
        </FooterWrap>
      </div>

      {/* ══ 5. DEVELOPED BY — centred, prominent ════════════════════ */}
      <div className="border-t border-gray-800/70 relative py-10">
        {/* Full-width rule behind text */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent" />
        <div className="relative flex justify-center">
          <a
            href="https://paksoft.com.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gray-900 px-10 flex items-center gap-3"
          >
            <span className="text-[14px] text-gray-400 group-hover:text-gray-300 transition-colors">
              Developed by
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

      {/* ══ 6. BOTTOM BAR ═══════════════════════════════════════════ */}
      <div className="border-t border-gray-800/70 bg-gray-950">
        <FooterWrap className="py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <span
              className="text-[12px] text-gray-400"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              © {new Date().getFullYear()} PakSoft Technology. All rights reserved.
            </span>

            <nav aria-label="Legal pages" className="flex items-center gap-6 flex-wrap justify-center">
              {LEGAL_LINKS.map(({ label, href, external }) =>
                external ? (
                  <a key={href} href={href} className="text-[12px] text-gray-400 hover:text-gray-200 transition-colors">
                    {label}
                  </a>
                ) : (
                  <LocalizedLink key={href} href={href} className="text-[12px] text-gray-400 hover:text-gray-200 transition-colors">
                    {label}
                  </LocalizedLink>
                )
              )}
            </nav>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[12px] text-gray-400 hover:text-accent-emerald transition-colors flex items-center gap-1.5 group"
            >
              Back to top
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
