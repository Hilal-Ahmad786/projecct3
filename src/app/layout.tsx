import './globals.css'
import { ReactNode } from 'react'
import { Noto_Nastaliq_Urdu, Amiri } from 'next/font/google'
import Analytics from '@/components/Analytics'
import SecurityGuard from '@/components/SecurityGuard'
import ReCaptcha from '@/components/ReCaptcha'
import { ClientProviders } from '@/components/ClientProviders'
import { cookies } from 'next/headers'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'

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
    metadataBase: new URL('https://www.paksoft.com.tr'),
    title: {
        default: 'PakSoft – Modern Digital Solutions',
        template: '%s | PakSoft'
    },
    description: 'Enterprise web development, e-commerce, automation bots and digital marketing solutions',
    keywords: ['Web Development', 'Mobile Apps', 'AI Solutions', 'Automation', 'Digital Marketing', 'E-commerce'],
    authors: [{ name: 'PakSoft Team' }],
    creator: 'PakSoft',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.paksoft.com.tr',
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

export default async function RootLayout({ children }: RootLayoutProps) {
    const cookieStore = await cookies()
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en'

    return (
        <html lang={locale} suppressHydrationWarning>
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
