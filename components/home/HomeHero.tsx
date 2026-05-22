'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ZelligeBackground } from './ZelligeBackground';
import { CalligraphyTexture } from './CalligraphyTexture';
import { FilmGrain } from './FilmGrain';
import { ScanLine } from './ScanLine';
import { ProjectorHalo } from './ProjectorHalo';
import { ZelligeFragment } from './ZelligeFragment';

const LINES = ['DES', 'HISTOIRES', 'QUI', 'BRÛLENT'];

export function HomeHero() {
  const introDone = true;

  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: '100vh', backgroundColor: '#0F0A06' }}
      >
        {/* Photo de fond hero */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero1.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.42) saturate(1.02) contrast(1.04)',
            zIndex: 0,
          }}
        />

        {/* Vignette safran */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, rgba(15,10,6,0.35) 50%, rgba(15,10,6,0.95) 100%), linear-gradient(180deg, rgba(15,10,6,0.6), transparent 30%, transparent 70%, rgba(15,10,6,0.95))',
          }}
        />

        <CalligraphyTexture />
        <ZelligeBackground />
        <ProjectorHalo size={420} color="rgba(232,160,32,0.10)" />
        <FilmGrain opacity={0.07} />
        <ScanLine speed={9} opacity={0.45} />

        <div className="relative z-20 max-w-[1400px] mx-auto px-8 md:px-14 pt-40 pb-32 min-h-screen flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={introDone ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3 mb-12"
          >
            <span className="block w-10 h-px bg-safran" />
            <span
              className="text-safran"
              style={{
                fontFamily: 'var(--font-dmsans)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Algérie <span className="diamond" /> Production <span className="diamond" /> Depuis 2019
            </span>
          </motion.div>

          <h1
            className="font-display text-ivoire-pur"
            style={{
              fontSize: 'clamp(64px, 11vw, 168px)',
              lineHeight: 0.92,
              letterSpacing: '0.06em',
            }}
          >
            {LINES.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, x: -80, filter: 'blur(8px)' }}
                animate={introDone ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'block',
                  color: word === 'BRÛLENT' ? '#E8A020' : undefined,
                  textShadow: word === 'BRÛLENT' ? '0 0 40px rgba(232,160,32,0.25)' : undefined,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={introDone ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 1.0, duration: 0.6, ease: 'easeOut' }}
            style={{
              transformOrigin: 'left',
              width: 80,
              height: 3,
              background: '#A63D2F',
              marginTop: 32,
              marginBottom: 24,
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="font-body text-ivoire-warm max-w-xl"
            style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.6 }}
          >
            Akham Films · Société de production algérienne. Fictions, documentaires
            et services audiovisuels haut de gamme — d&apos;Alger au monde.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.35, duration: 0.6 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Link href="/films" className="cta-primary" data-cursor="cta">
              Voir nos films <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
            <Link href="/pitch" className="cta-secondary" data-cursor="cta">
              Pitcher un projet <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : {}}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="absolute bottom-10 left-8 md:left-14 flex items-center gap-3"
          >
            <div
              className="relative w-px h-12 overflow-hidden"
              style={{ background: 'rgba(232,160,32,0.2)' }}
            >
              <span
                className="absolute left-0 right-0 h-1/3 bg-safran"
                style={{ animation: 'scroll-down 2.2s ease-in-out infinite' }}
              />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-dmsans)',
                fontSize: 10,
                color: 'rgba(200,184,152,0.6)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Plan suivant
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 0.5 } : {}}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="absolute top-28 right-8 md:right-14 counter-mono"
            style={{ fontSize: 11, color: '#C8B898', letterSpacing: '0.15em' }}
          >
            REEL 01 · TC 00:00:00:00
          </motion.div>
        </div>

        <div className="absolute bottom-0 right-0 z-10 pointer-events-none">
          <ZelligeFragment size={140} color="terracotta" opacity={0.5} rotation={20} shape="diamond" />
        </div>
      </section>
    </>
  );
}
