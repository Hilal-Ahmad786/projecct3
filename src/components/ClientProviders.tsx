'use client'
import dynamic from 'next/dynamic'

// ScrollProgressBar is a purely visual client widget; it does NOT wrap the page
// children, so loading it client-only doesn't affect SSR of the content.
const ScrollProgressBar = dynamic(
  () => import('@/components/ScrollProgressBar'),
  { ssr: false }
)

// IMPORTANT: do NOT wrap `children` in any `dynamic(..., { ssr: false })`
// component. Doing so disables server-rendering for the ENTIRE site body
// (no content/links/JSON-LD in server HTML → bad for SEO). The previous
// LenisProvider wrapper did exactly that, and Lenis is now a no-op anyway.
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      {children}
    </>
  )
}
