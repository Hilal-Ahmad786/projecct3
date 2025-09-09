// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { XMarkIcon, Bars3Icon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { locales, localeNames, type Locale } from '@/lib/i18n';
import Image from "next/image";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const pathname = usePathname();
  
  const { locale, setLocale, isLoading, dir } = useTranslations();
  const t = useSectionTranslations('navbar');
  const tCommon = useSectionTranslations('common');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: t('home'), href: '/' },
    { label: t('services'), href: '/services' },
    { label: t('projects'), href: '/projects' },
    { label: t('blog'), href: '/blog' },
    { label: t('about'), href: '/about' },
    { label: t('contact'), href: '/contact' },
  ];

  const handleLanguageChange = async (newLocale: Locale) => {
    setLanguageOpen(false);
    if (newLocale !== locale) {
      await setLocale(newLocale);
      // Optionally redirect to the same page with new locale
      // window.location.reload();
    }
  };

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-white border-b border-gray-200 shadow-sm py-3'
            : 'bg-white/95 backdrop-blur-sm py-4'
          }
        `}
        dir={dir}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo - Clean and Minimal */}
<Link href="/" className="flex items-center gap-3 group">
  <div className="relative">
    <Image
      src="/images/logo/PSlogo1.png"
      alt="PakSoft Logo"
      width={160}
      height={160}
      className="rounded-sm"
      priority
    />
  </div>

</Link>
          {/* Navigation - Swiss Typography */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-8">
              {links.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <li key={href} className="relative">
                    <Link
                      href={href}
                      className={`
                        text-sm font-medium tracking-wide transition-colors duration-250
                        ${isActive 
                          ? 'text-gray-900' 
                          : 'text-gray-600 hover:text-gray-900'
                        }
                      `}
                    >
                      {label}
                    </Link>
                    
                    {/* Minimal active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-900" />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                disabled={isLoading}
                className={`
                  flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 
                  transition-colors border border-gray-200 rounded-sm hover:border-gray-300
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <GlobeAltIcon className="h-4 w-4" />
                <span className="font-medium">
                  {localeNames[locale].flag} {locale.toUpperCase()}
                </span>
                <svg 
                  className={`h-3 w-3 transition-transform duration-250 ${languageOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Language Dropdown */}
              {languageOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-sm shadow-soft py-1 z-50">
                  {locales.map((lang) => (
                    <button
                      key={lang}
                      className={`
                        w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors
                        ${lang === locale 
                          ? 'text-gray-900 bg-gray-50' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => handleLanguageChange(lang)}
                      disabled={isLoading}
                    >
                      <span>{localeNames[lang].flag}</span>
                      <span className="font-medium">{localeNames[lang].nativeName}</span>
                      {lang === locale && (
                        <svg className="h-4 w-4 ml-auto text-green-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium
                         bg-gray-900 text-white border border-gray-900 rounded-sm
                         hover:bg-gray-700 hover:border-gray-700 transition-all duration-250
                         hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              <span>{t('getQuote')}</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors"
              aria-label={`${tCommon('menu')}`}
            >
              {open ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" dir={dir}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/20"
            onClick={() => setOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} top-0 h-full w-80 bg-white border-l border-gray-200 shadow-medium`}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">{tCommon('menu')}</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-sm hover:border-gray-300"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 px-6 py-6">
                <ul className="space-y-4">
                  {links.map(({ label, href }) => {
                    const isActive = pathname === href;
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className={`
                            block px-4 py-3 text-sm font-medium transition-colors border-l-2
                            ${isActive 
                              ? 'text-gray-900 border-gray-900 bg-gray-50' 
                              : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                            }
                          `}
                          onClick={() => setOpen(false)}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Mobile Language Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
                    {t('language')}
                  </h3>
                  <div className="space-y-2">
                    {locales.map((lang) => (
                      <button
                        key={lang}
                        className={`
                          flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors rounded-sm
                          ${lang === locale 
                            ? 'text-gray-900 bg-gray-50' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }
                        `}
                        onClick={() => {
                          handleLanguageChange(lang);
                          setOpen(false);
                        }}
                        disabled={isLoading}
                      >
                        <span>{localeNames[lang].flag}</span>
                        <span className="font-medium">{localeNames[lang].nativeName}</span>
                        {lang === locale && (
                          <svg className="h-4 w-4 ml-auto text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="p-6 border-t border-gray-200">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-medium
                             bg-gray-900 text-white border border-gray-900 rounded-sm
                             hover:bg-gray-700 hover:border-gray-700 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <span>{t('getQuote')}</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Close language dropdown on outside click */}
      {languageOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setLanguageOpen(false)}
        />
      )}
    </>
  );
}