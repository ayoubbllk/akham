'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ZelligeFragment } from './ZelligeFragment';
import { CalligraphyTexture } from './CalligraphyTexture';
import { ScanLine } from './ScanLine';
import { FilmGrain } from './FilmGrain';

/**
 * Closing shot — l'invitation finale à pitcher.
 * Conservé sous le nom ShowreelCTA pour ne pas casser app/page.tsx.
 */
export function ShowreelCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#060606', padding: '160px 0 180px' }}
    >
      <CalligraphyTexture
        words={[
          { text: 'حكاية', x: '78%', y: '12%', size: 220, rotate: 6, opacity: 0.045 },
          { text: 'الجزائر', x: '4%', y: '70%', size: 280, rotate: -4, opacity: 0.04 },
        ]}
      />
      <ZelligeFragment x="6%" y="14%" size={140} color="terracotta" opacity={0.3} rotation={-12} animated />
      <ZelligeFragment x="86%" y="74%" size={160} color="safran" opacity={0.25} rotation={18} shape="hexagon" animated />
      <ZelligeFragment x="50%" y="6%" size={70} color="ocre" opacity={0.4} rotation={28} shape="triangle" />

      <FilmGrain opacity={0.1} />
      <ScanLine speed={6} opacity={0.5} />

      <div className="relative z-10 max-w-[1500px] mx-auto px-8 md:px-14 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block"
          style={{
            fontFamily: 'var(--font-dmsans)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#E8A020',
          }}
        >
          <span style={{ color: '#A63D2F' }}>—</span> Acte final
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-8"
          style={{
            fontSize: 'clamp(56px, 7vw, 144px)',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            color: '#F5EDD8',
          }}
        >
          <span className="block">Votre histoire</span>
          <span className="block">mérite d&apos;être</span>
          <span
            className="block text-zellige-fill"
            style={{
              filter: 'drop-shadow(0 0 60px rgba(232,160,32,0.25))',
            }}
          >
            racontée.
          </span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            transformOrigin: 'center',
            width: 100,
            height: 2,
            background: '#A63D2F',
            margin: '40px auto 0',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-5 mt-12"
        >
          <Link href="/pitch" className="cta-primary" data-cursor="cta">
            Pitcher votre projet <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </motion.div>

        <p
          className="mt-16 max-w-md mx-auto"
          style={{
            fontFamily: 'var(--font-dmsans)',
            fontSize: 13,
            fontWeight: 300,
            color: '#7A6A52',
            lineHeight: 1.7,
          }}
        >
          Akham Films <span style={{ color: '#A63D2F' }}>·</span> Alger, Algérie
          <br />
          Réponse sous 48 h ouvrées.
        </p>
      </div>
    </section>
  );
}
