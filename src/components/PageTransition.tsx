'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { lenisRef } from '@/lib/lenis';

interface Props {
  children: React.ReactNode;
}

export default function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  if (prefersReducedMotion) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
