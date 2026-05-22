'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const KEY = 'akham-countdown-played';

export function HeroCountdown({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<'idle' | 'count' | 'flash' | 'done'>('idle');
  const [n, setN] = useState(3);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(KEY) === '1') {
      setStep('done');
      onDone();
      return;
    }
    const t0 = setTimeout(() => setStep('count'), 500);
    return () => clearTimeout(t0);
  }, [onDone]);

  useEffect(() => {
    if (step !== 'count') return;
    if (n === 0) {
      const t = setTimeout(() => setStep('flash'), 100);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN((v) => v - 1), 700);
    return () => clearTimeout(t);
  }, [step, n]);

  useEffect(() => {
    if (step !== 'flash') return;
    const t = setTimeout(() => {
      sessionStorage.setItem(KEY, '1');
      setStep('done');
      onDone();
    }, 80);
    return () => clearTimeout(t);
  }, [step, onDone]);

  return (
    <AnimatePresence>
      {step !== 'done' && (
        <motion.div
          key="overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-[9000] bg-noir-salle flex items-center justify-center"
        >
          {step === 'flash' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08 }}
              className="absolute inset-0 bg-ivoire"
            />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={n}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.25 } }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                className="font-display text-or-akham select-none"
                style={{ fontSize: 'clamp(120px, 18vw, 240px)', lineHeight: 1 }}
              >
                {n > 0 ? n : ''}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
