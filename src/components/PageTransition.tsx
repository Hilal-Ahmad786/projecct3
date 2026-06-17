'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  // NOTE: do NOT wrap this in <AnimatePresence mode="wait">. Under Next 16 +
  // React 19 + framer-motion 12, mode="wait" keeps the exiting route's tree
  // mounted while the new route's RSC payload streams in, which throws a
  // client-side exception on soft navigation (crashes on <Link> nav but works
  // on hard refresh). A plain keyed motion.div fades the new page in on mount
  // without holding two route trees alive — same effect, no crash.
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: 'linear' }}
    >
      {children}
    </motion.div>
  );
}
