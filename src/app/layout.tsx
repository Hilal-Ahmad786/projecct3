// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { I18nProvider } from '@/hooks/useTranslations'
import Analytics from '@/components/Analytics'
import SecurityGuard from '@/components/SecurityGuard'
import ReCaptcha from '@/components/ReCaptcha'
import { cookies } from 'next/headers'

export const metadata = {
    title: 'PakSoft – Modern Digital Solutions',
    description: 'Enterprise web development, e-commerce, automation bots and digital marketing solutions',
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
                <I18nProvider>
                    {children}
                </I18nProvider>
            </body>
        </html>
    )
}
