'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ClapLoader } from '@/components/home/ClapLoader';

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);
  const fallbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const key = 'akham-loader-v2-seen';
    const seen = window.sessionStorage.getItem(key);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seen || reduce) {
      setShowLoader(false);
      return;
    }

    setShowLoader(true);
    fallbackTimerRef.current = window.setTimeout(() => {
      setShowLoader(false);
      window.sessionStorage.setItem(key, '1');
    }, 3400);

    return () => {
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
      }
    };
  }, [pathname]);

  return (
    <>
      {showLoader && (
        <ClapLoader
          duration={2300}
          onComplete={() => {
            setShowLoader(false);
            if (typeof window !== 'undefined') {
              window.sessionStorage.setItem('akham-loader-v2-seen', '1');
              if (fallbackTimerRef.current) {
                window.clearTimeout(fallbackTimerRef.current);
              }
            }
          }}
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
