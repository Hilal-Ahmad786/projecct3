// src/components/Footer.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { 
  FaLinkedin, 
  FaTwitter, 
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const services = [
    { label: 'Web Development', href: '/services#web' },
    { label: 'Mobile Apps', href: '/services#mobile' },
    { label: 'AI Solutions', href: '/services#ai' },
    { label: 'Automation', href: '/services#automation' },
    { label: 'Digital Marketing', href: '/services#marketing' },
    { label: 'DevOps', href: '/services#devops' },
  ];

  const socialLinks = [
    { 
      icon: FaLinkedin, 
      href: 'https://linkedin.com/company/paktechnology',
      label: 'LinkedIn'
    },
    { 
      icon: FaTwitter, 
      href: 'https://twitter.com/paktechnology',
      label: 'Twitter'
    },
    { 
      icon: FaGithub, 
      href: 'https://github.com/paktechnology',
      label: 'GitHub'
    },
    { 
      icon: FaEnvelope, 
      href: 'mailto:info@paktechnology.com',
      label: 'Email'
    },
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'info@paktechnology.com',
      href: 'mailto:info@paktechnology.com'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+90 552 567 71 64',
      href: 'tel:+905525677164'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Yozgat, Turkey',
      href: 'https://maps.google.com/maps?q=Yozgat,Turkey'
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute top-8 right-8 w-24 h-24 opacity-[0.03]">
        <div 
          className="w-full h-full border border-white"
          style={{ clipPath: 'circle(40% at 70% 30%)' }}
        />
      </div>

      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
              <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                <span className="text-gray-900 text-lg font-bold">P</span>
              </div>
              <span className="text-lg font-medium">PakTechnology</span>
            </div>
            
            <p className="text-sm text-gray-300 mb-6 leading-relaxed max-w-xs">
              Creating exceptional digital experiences through clean code, thoughtful design, and strategic thinking.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-sm flex items-center justify-center hover:bg-gray-700 hover:border-gray-600 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
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
            <h4 className="text-sm font-medium mb-6 text-gray-300 uppercase tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-white transition-all duration-250 mr-0 group-hover:mr-3" />
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
            <h4 className="text-sm font-medium mb-6 text-gray-300 uppercase tracking-wide">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map(({ label, href }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-white transition-all duration-250 mr-0 group-hover:mr-3" />
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
            <h4 className="text-sm font-medium mb-6 text-gray-300 uppercase tracking-wide">
              Contact
            </h4>
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-800 border border-gray-700 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-gray-700 group-hover:border-gray-600 transition-colors">
                    <Icon className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
                    <p className="text-sm">{value}</p>
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
          className="border-t border-gray-800 pt-12 mt-12"
        >
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-medium mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-6">
              Get the latest insights on technology and digital transformation.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
              />
              <button className="px-6 py-3 bg-white text-gray-900 rounded-sm text-sm font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-sm text-gray-400"
          >
            © {new Date().getFullYear()} PakTechnology. All rights reserved.
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
            aria-label="Scroll to top"
          >
            <span>Back to Top</span>
            <ChevronUpIcon className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}