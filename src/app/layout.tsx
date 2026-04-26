import './globals.css'
import { ReactNode } from 'react'
import Analytics from '@/components/Analytics'
import SecurityGuard from '@/components/SecurityGuard'
import ReCaptcha from '@/components/ReCaptcha'
import { cookies } from 'next/headers'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'

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
        creator: '@paktechnology',
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
            <body className="flex flex-col min-h-screen" suppressHydrationWarning>
                <SecurityGuard />
                {children}
                <VercelAnalytics />
            </body>
        </html>
    )
}
