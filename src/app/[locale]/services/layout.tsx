// The full dictionary (heavy `serviceSubpages` / `servicePages` namespaces) is
// provided one level down — in [slug]/layout.tsx and web-development/layout.tsx —
// so routes that never read it (the services index, the code-driven Turkish
// ikas pages) don't serialize ~165KB of extra translations into every payload.
import { ReactNode } from 'react'

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children
}
