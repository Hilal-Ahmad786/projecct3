'use client'
import dynamic from 'next/dynamic'

const LenisProvider = dynamic(
  () => import('@/components/LenisProvider'),
  { ssr: false }
)

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>
}
