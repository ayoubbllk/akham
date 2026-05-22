'use client';

import { motion } from 'framer-motion';
import { ZelligeFragment } from './ZelligeFragment';
import { CalligraphyTexture } from './CalligraphyTexture';
import { ScanLine } from './ScanLine';

export function Manifesto() {
  return (
    <section
      className="relative overflow-hidden zellige-grid"
      style={{ background: '#0F0A06', padding: '160px 0 180px' }}
    >
      <CalligraphyTexture
        words={[
          { text: 'ضوء', x: '40%', y: '12%', size: 280, rotate: -4, opacity: 0.05 },
          { text: 'حكاية', x: '8%', y: '70%', size: 200, rotate: 6, opacity: 0.04 },
        ]}
      />
      <ZelligeFragment x="84%" y="14%" size={120} color="terracotta" opacity={0.45} rotation={18} animated />
      <ZelligeFragment x="6%" y="22%" size={70} color="safran" opacity={0.4} rotation={-12} shape="triangle" />
      <ZelligeFragment x="88%" y="80%" size={150} color="carmin" opacity={0.3} rotation={9} shape="hexagon" animated />
      <ScanLine speed={11} opacity={0.35} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-14 grid grid-cols-1 md:grid-cols-[30%_1fr] gap-12 md:gap-20 items-center">
        {/* Colonne gauche — mot arabe vertical */}
        <div className="relative" dir="rtl">
          <div
            className="font-arabic"
            style={{
              fontSize: 'clamp(80px, 8vw, 140px)',
              color: '#A63D2F',
              lineHeight: 0.9,
              writingMode: 'vertical-rl',
              fontWeight: 700,
              textShadow: '0 0 60px rgba(166,61,47,0.25)',
            }}
          >
            ض و ء
          </div>
          <span
            className="block mt-6 counter-mono"
            style={{
              color: '#7A6A52',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            ḌAW · LUMIÈRE
          </span>
        </div>

        {/* Colonne droite — citation */}
        <div>
          <span
            style={{
              fontFamily: 'var(--font-dmsans)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#E8A020',
            }}
          >
            Manifeste <span className="diamond" /> Note d&apos;intention
          </span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-ivoire-pur mt-6"
            style={{
              fontSize: 'clamp(40px, 3.6vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            }}
          >
            <span className="block">Nous ne faisons pas</span>
            <span className="block">des films.</span>
            <span className="block mt-3">Nous allumons</span>
            <span className="block">
              des <span style={{ color: '#E8A020' }}>lumières</span>{' '}
              <span style={{ color: '#C94B1A' }}>algériennes</span>.
            </span>
          </motion.h2>

          <div className="mt-10 flex items-center gap-5">
            <span style={{ width: 60, height: 2, background: '#A63D2F', display: 'block' }} />
            <span
              style={{
                fontFamily: 'var(--font-dmsans)',
                fontSize: 13,
                color: '#E8A020',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Fondateur <span style={{ color: '#7A6A52' }}>·</span> Akham Films
            </span>
          </div>

          <p
            className="font-body mt-8 max-w-xl"
            style={{ color: '#C8B898', fontSize: 16, lineHeight: 1.8, fontWeight: 300 }}
          >
            Akham — <em>la maison</em>, en kabyle. Un toit pour les histoires algériennes,
            un atelier pour celles et ceux qui croient encore au pouvoir d&apos;un cadre
            tenu juste, d&apos;un silence bien placé, d&apos;un visage qui regarde droit.
          </p>
        </div>
      </div>
    </section>
  );
}
