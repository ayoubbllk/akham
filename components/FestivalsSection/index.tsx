'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FestivalWall } from './FestivalWall';

export function FestivalsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#0F0A06', padding: '140px 0 170px' }}
    >
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{ opacity: 0.08 }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-8 md:px-14">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduceMotion ? undefined : { duration: 0.45, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-dmsans)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#E8A020',
          }}
        >
          Reconnaissance internationale
        </motion.span>

        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={reduceMotion ? undefined : { duration: 0.55, ease: 'easeOut' }}
          className="font-display mt-4"
          style={{ fontSize: 'clamp(56px, 5vw, 92px)', lineHeight: 0.9 }}
        >
          <span className="block text-ivoire-pur">Le mur</span>
          <span className="block text-safran">des honneurs</span>
        </motion.h2>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={reduceMotion ? undefined : { duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          style={{
            marginTop: 22,
            maxWidth: 560,
            fontFamily: 'var(--font-dmsans)',
            fontSize: 15,
            fontWeight: 300,
            lineHeight: 1.6,
            color: '#c8b898',
          }}
        >
          Chaque laurier est une rencontre, une projection, une voix qui a porté
          nos films au-delà des frontières. Voici, dans l'ordre du temps, ce que
          le monde a bien voulu reconnaître.
        </motion.p>

        <FestivalWall />
      </div>
    </section>
  );
}
