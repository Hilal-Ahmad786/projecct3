// src/components/Footer.tsx
'use client';
import Image from "next/image";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { 
  FaLinkedin, 
  FaTwitter, 
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaYoutube,
  FaDribbble,
  FaBehance,
  FaMedium,
  FaDiscord
} from 'react-icons/fa';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

export default function Footer() {
  const { dir } = useTranslations();
  const t = useSectionTranslations('footer');
  const tCommon = useSectionTranslations('common');

  const quickLinks = [
    { label: t('quickLinks.home'), href: '/' },
    { label: t('quickLinks.services'), href: '/services' },
    { label: t('quickLinks.projects'), href: '/projects' },
    { label: t('quickLinks.blog'), href: '/blog' },
    { label: t('quickLinks.about'), href: '/about' },
    { label: t('quickLinks.contact'), href: '/contact' },
  ];

  const services = [
    { label: t('servicesList.webDevelopment'), href: '/services#web' },
    { label: t('servicesList.mobileApps'), href: '/services#mobile' },
    { label: t('servicesList.aiSolutions'), href: '/services#ai' },
    { label: t('servicesList.automation'), href: '/services#automation' },
    { label: t('servicesList.digitalMarketing'), href: '/services#marketing' },
    { label: t('servicesList.devops'), href: '/services#devops' },
  ];

  const socialLinks = [
    { 
      icon: FaLinkedin, 
      href: 'https://linkedin.com/company/paktechnology',
      label: t('socialMedia.linkedin')
    },
    { 
      icon: FaTwitter, 
      href: 'https://twitter.com/paktechnology',
      label: t('socialMedia.twitter')
    },
    { 
      icon: FaGithub, 
      href: 'https://github.com/paktechnology',
      label: t('socialMedia.github')
    },
    { 
      icon: FaInstagram, 
      href: 'https://instagram.com/paktechnology',
      label: t('socialMedia.instagram')
    },
    { 
      icon: FaYoutube, 
      href: 'https://youtube.com/@paktechnology',
      label: t('socialMedia.youtube')
    },
    { 
      icon: FaDribbble, 
      href: 'https://dribbble.com/paktechnology',
      label: t('socialMedia.dribbble')
    },
    { 
      icon: FaBehance, 
      href: 'https://behance.net/paktechnology',
      label: t('socialMedia.behance')
    },
    { 
      icon: FaMedium, 
      href: 'https://medium.com/@paktechnology',
      label: t('socialMedia.medium')
    },
    { 
      icon: FaDiscord, 
      href: 'https://discord.gg/paktechnology',
      label: t('socialMedia.discord')
    }
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: t('contactInfo.email.label'),
      value: t('contactInfo.email.value'),
      href: 'mailto:info@paktechnology.com'
    },
    {
      icon: FaPhone,
      label: t('contactInfo.phone.label'),
      value: t('contactInfo.phone.value'),
      href: 'tel:+905525677164'
    },
    {
      icon: FaMapMarkerAlt,
      label: t('contactInfo.location.label'),
      value: t('contactInfo.location.value'),
      href: 'https://maps.google.com/maps?q=Yozgat,Turkey'
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden pt-16" dir={dir}>
      {/* Swiss Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      {/* Subtle geometric background */}
      <div className={`absolute top-8 w-20 h-20 opacity-[0.03] ${dir === 'rtl' ? 'left-8' : 'right-8'}`}>
        <div 
          className="w-full h-full border border-white"
          style={{ clipPath: 'circle(40% at 70% 30%)' }}
        />
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
            <Link href="/" className="flex items-center gap-3 group">
  <div className="relative">
    <Image
      src="/images/logo/PSlogo11.png"
      alt="PakSoft Logo"
      width={160}
      height={160}
      className="rounded-sm"
      priority
    />
  </div>

</Link>
            </div>
            
            <p className="text-body text-gray-300 mb-6 leading-relaxed max-w-xs">
              {t('description')}
            </p>

            {/* Social Links Grid */}
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-sm flex items-center justify-center hover:bg-gray-700 hover:border-gray-600 transition-colors group"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-medium mb-6 text-gray-300 uppercase tracking-wide text-overline">
              {t('navigation')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="text-body text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className={`w-0 group-hover:w-2 h-px bg-white transition-all duration-250 ${dir === 'rtl' ? 'ml-0 group-hover:ml-3' : 'mr-0 group-hover:mr-3'}`} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-medium mb-6 text-gray-300 uppercase tracking-wide text-overline">
              {t('services')}
            </h4>
            <ul className="space-y-3">
              {services.map(({ label, href }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="text-body text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className={`w-0 group-hover:w-2 h-px bg-white transition-all duration-250 ${dir === 'rtl' ? 'ml-0 group-hover:ml-3' : 'mr-0 group-hover:mr-3'}`} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-medium mb-6 text-gray-300 uppercase tracking-wide text-overline">
              {t('contact')}
            </h4>
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-3 text-body text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-800 border border-gray-700 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-gray-700 group-hover:border-gray-600 transition-colors">
                    <Icon className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-caption text-gray-500 uppercase tracking-wide">{label}</p>
                    <p className="text-body">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-12 mb-12"
        >
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-title text-white mb-4">{t('stayUpdated')}</h3>
            <p className="text-body text-gray-400 mb-6">
              {t('stayUpdatedDescription')}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
              />
              <button className="px-6 py-3 bg-white text-gray-900 rounded-sm text-sm font-medium hover:bg-gray-100 transition-colors">
                {t('subscribe')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-body text-gray-400"
          >
            © {new Date().getFullYear()} PakTechnology. {t('allRightsReserved')}
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-body text-gray-400 hover:text-white transition-colors group"
            aria-label={tCommon('backToTop')}
          >
            <span>{tCommon('backToTop')}</span>
            <ChevronUpIcon className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}