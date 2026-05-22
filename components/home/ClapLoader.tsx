'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onComplete?: () => void;
  duration?: number;
}

export function ClapLoader({ onComplete, duration = 2600 }: Props) {
  const [phase, setPhase] = useState<'open' | 'closing' | 'closed' | 'done'>('open');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(reduce);
    if (reduce) {
      setPhase('closed');
      const t = window.setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 1600);
      return () => clearTimeout(t);
    }

    setPhase('open');
    const t1 = window.setTimeout(() => setPhase('closing'), 480);
    const t2 = window.setTimeout(() => setPhase('closed'), 1050);
    const t3 = window.setTimeout(() => setPhase('done'), duration);
    const t4 = window.setTimeout(() => onComplete?.(), duration + 60);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [duration, onComplete]);

  if (phase === 'done') return null;

  const armPhase = reducedMotion ? 'closed' : phase;
  const armTransform = armPhase === 'open' ? 'rotate(-32deg)' : 'rotate(0deg)';
  const armTransition =
    armPhase === 'closed'
      ? 'transform 220ms ease-out'
      : 'transform 480ms cubic-bezier(0.7, 0, 0.2, 1)';
  const textVisible = armPhase === 'closed';
  const impact = armPhase === 'closed';

  return (
    <div
      role="presentation"
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 12000,
        background: '#0F0A06',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 20,
          opacity: 0.4,
          backgroundImage: 'radial-gradient(circle, rgba(245,237,216,0.22) 30%, transparent 31%)',
          backgroundSize: '28px 100%',
          backgroundRepeat: 'repeat-x',
        }}
        animate={reducedMotion ? undefined : { x: [0, 14, 0] }}
        transition={{ duration: 1.8, ease: 'linear', repeat: Infinity }}
      />

      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 20,
          opacity: 0.32,
          backgroundImage: 'radial-gradient(circle, rgba(245,237,216,0.18) 30%, transparent 31%)',
          backgroundSize: '28px 100%',
          backgroundRepeat: 'repeat-x',
        }}
        animate={reducedMotion ? undefined : { x: [0, -14, 0] }}
        transition={{ duration: 1.8, ease: 'linear', repeat: Infinity }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(232,160,32,0.09), transparent 62%)',
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          inset: '-10% 0',
          background:
            'linear-gradient(110deg, transparent 20%, rgba(232,160,32,0.08) 44%, rgba(232,160,32,0.16) 50%, transparent 62%)',
          mixBlendMode: 'screen',
        }}
        animate={reducedMotion ? undefined : { x: ['-40%', '40%'] }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(560px, 84vw)',
          height: 'min(420px, 68vw)',
          borderRadius: 20,
          background: 'linear-gradient(180deg, rgba(30,18,8,0.92), rgba(12,8,6,0.98))',
          border: '1px solid rgba(232,160,32,0.18)',
          boxShadow: '0 18px 60px rgba(0,0,0,0.45), inset 0 0 80px rgba(232,160,32,0.05)',
          zIndex: 2,
        }}
      />

      <motion.div
        style={{
          position: 'relative',
          zIndex: 5,
          width: 'min(520px, 78vw)',
          height: 'min(360px, 58vw)',
          minWidth: 280,
          minHeight: 210,
          filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.55))',
        }}
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, -1.5, 1.2, -0.6, 0],
                y: [0, 0.8, -0.4, 0.3, 0],
              }
        }
        transition={{ duration: 0.42, ease: 'easeOut', delay: 0.42 }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '62%',
            background: 'linear-gradient(180deg, #23170d 0%, #120c07 100%)',
            border: '2px solid rgba(232,160,32,0.9)',
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '18px 24px',
            gap: 10,
            boxShadow: '0 12px 28px rgba(0,0,0,0.35)',
          }}
        >
          <Row label="PROD." value="AKHAM FILMS" />
          <Row label="SCENE" value="01" />
          <Row label="TAKE" value="001" />
          <Row label="DIR." value="AKHAM FILMS" />

          <div
            style={{
              position: 'absolute',
              right: 14,
              bottom: 12,
              padding: '2px 8px',
              background: '#E8A020',
              color: '#0F0A06',
              fontFamily: 'var(--font-jetbrains, monospace), monospace',
              fontSize: 10,
              letterSpacing: '0.18em',
              fontWeight: 700,
            }}
          >
            DZ 2026
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '42%',
            transformOrigin: '8% 100%',
            transform: armTransform,
            transition: armTransition,
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              left: 24,
              right: 24,
              top: 10,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(232,160,32,0.65), transparent)',
              zIndex: 9,
            }}
            animate={reducedMotion ? undefined : { opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(135deg, #0F0A06 0 28px, #FFFDF5 28px 56px)',
              border: '2px solid rgba(232,160,32,0.9)',
              borderRadius: 10,
              boxShadow: armPhase === 'closed' ? '0 0 24px rgba(232,160,32,0.16)' : 'none',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 'calc(8% - 8px)',
              bottom: -8,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: '#E8A020',
              boxShadow: '0 0 0 3px #1a120a, 0 0 12px rgba(232,160,32,0.6)',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '40%',
            transform: textVisible
              ? 'translate(-50%, -50%) scale(1.08) rotate(-4deg)'
              : 'translate(-50%, -50%) scale(0.85) rotate(-12deg)',
            fontFamily: 'var(--font-bebas, "Bebas Neue"), "Arial Black", sans-serif',
            fontSize: 'clamp(52px, 8vw, 110px)',
            color: '#E8A020',
            letterSpacing: '0.08em',
            textShadow:
              '-3px 0 0 rgba(201,75,26,0.9), 3px 0 0 rgba(255,253,245,0.9), 0 0 24px rgba(232,160,32,0.22)',
            opacity: textVisible ? 1 : 0,
            transition: 'opacity 160ms ease-out, transform 220ms ease-out',
            zIndex: 8,
          }}
        >
          CLAP!
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9,
          background:
            'radial-gradient(circle at 50% 46%, rgba(255,189,94,0.34), rgba(255,189,94,0.12) 20%, transparent 56%)',
          mixBlendMode: 'screen',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: impact ? 1 : 0 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      />

      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 8,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(245,237,216,0.06) 0 1px, transparent 1px 3px)',
          mixBlendMode: 'overlay',
        }}
        animate={reducedMotion ? undefined : { opacity: [0.05, 0.12, 0.06] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '6%',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'var(--font-dmsans), sans-serif',
          fontSize: 11,
          color: 'rgba(245,237,216,0.78)',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          zIndex: 6,
        }}
      >
        Akham Films <span style={{ color: '#E8A020' }}>*</span> rolling
      </div>

      <motion.div
        style={{
          position: 'absolute',
          top: '6.5%',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'var(--font-jetbrains, monospace), monospace',
          fontSize: 10,
          letterSpacing: '0.24em',
          color: 'rgba(245,237,216,0.62)',
          zIndex: 7,
        }}
        animate={reducedMotion ? undefined : { opacity: [0.6, 1, 0.45, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        REEL 01 <span style={{ color: '#E8A020' }}>*</span> TC 00:00:00:00
      </motion.div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderBottom: '1px dashed rgba(232,160,32,0.25)',
        paddingBottom: 4,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-jetbrains, monospace), monospace',
          fontSize: 10,
          color: 'rgba(200,184,152,0.7)',
          letterSpacing: '0.18em',
          minWidth: 56,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-bebas, "Bebas Neue"), sans-serif',
          fontSize: 18,
          color: '#F5EDD8',
          letterSpacing: '0.08em',
        }}
      >
        {value}
      </span>
    </div>
  );
}
