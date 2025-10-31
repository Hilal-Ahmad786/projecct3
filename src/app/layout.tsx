// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { I18nProvider } from '@/hooks/useTranslations'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import Analytics from '@/components/Analytics'
import SecurityGuard from '@/components/SecurityGuard'
import ReCaptcha from '@/components/ReCaptcha'




export const metadata = {
  title: 'PakSoft – Modern Digital Solutions',
  description: 'Enterprise web development, e-commerce, automation bots and digital marketing solutions',
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Analytics />
        <ReCaptcha />
      </head>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <SecurityGuard />
        <I18nProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingButtons />
        </I18nProvider>
      </body>
    </html>
  )
}