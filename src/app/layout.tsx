import './globals.css'
import { ReactNode } from 'react'
import { Noto_Nastaliq_Urdu, Amiri } from 'next/font/google'
import Analytics from '@/components/Analytics'
import SecurityGuard from '@/components/SecurityGuard'
import ReCaptcha from '@/components/ReCaptcha'
import { ClientProviders } from '@/components/ClientProviders'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { defaultLocale } from '@/lib/i18n'
import { SITE_URL } from '@/config/site'

// Heritage display type for RTL locales — exposed as CSS variables,
// consumed by globals.css heading rules. preload:false keeps them off
// the critical path for en/tr/de visitors.
const nastaliq = Noto_Nastaliq_Urdu({
    subsets: ['arabic'],
    weight: ['400', '700'],
    variable: '--font-nastaliq',
    display: 'swap',
    preload: false,
})
const amiri = Amiri({
    subsets: ['arabic'],
    weight: ['400', '700'],
    variable: '--font-arabic-display',
    display: 'swap',
    preload: false,
})

export const metadata = {
    metadataBase: new URL(SITE_URL),
    // Plain default (no `template`): pages already append "| PakSoft" in their
    // own titles, so a template caused doubled "| PakSoft | PakSoft" titles.
    title: 'PakSoft – Modern Digital Solutions',
    description: 'Enterprise web development, e-commerce, automation bots and digital marketing solutions',
    keywords: ['Web Development', 'Mobile Apps', 'AI Solutions', 'Automation', 'Digital Marketing', 'E-commerce'],
    authors: [{ name: 'PakSoft Team' }],
    creator: 'PakSoft',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: SITE_URL,
        title: 'PakSoft – Modern Digital Solutions',
        description: 'Enterprise web development, e-commerce, automation bots and digital marketing solutions',
        siteName: 'PakSoft',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'PakSoft Digital Solutions',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PakSoft – Modern Digital Solutions',
        description: 'Enterprise web development, e-commerce, automation bots and digital marketing solutions',
        creator: '@paksoft3',
        images: ['/images/twitter-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: '5r6FVNc5T7Y3Fig1PQvnfB4UtoDO9RGMSqWLZANzcdQ',
    },
    icons: {
        icon: '/images/logo/rounded.svg',
        shortcut: '/images/logo/rounded.svg',
        apple: '/images/logo/rounded.svg',
    },
}

interface RootLayoutProps {
    children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    // NOTE: Do NOT read cookies()/headers() here. Reading a dynamic API in the
    // ROOT layout opts the ENTIRE app into per-request dynamic rendering (every
    // page became `ƒ` and re-queried the DB on every visit). The correct
    // per-locale <lang>/<dir> is applied by the nested [locale] layout on its
    // wrapper element; the root <html> just carries a static default so the
    // whole tree stays statically prerenderable.
    return (
        <html lang={defaultLocale} suppressHydrationWarning>
            <head>
                <Analytics />
                <ReCaptcha />
            </head>
            <body className={`${nastaliq.variable} ${amiri.variable} flex flex-col min-h-screen`} suppressHydrationWarning>
                <SecurityGuard />
                <ClientProviders>
                    {children}
                </ClientProviders>
                <VercelAnalytics />
            </body>
        </html>
    )
}
