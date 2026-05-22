'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { tournages, type Tournage } from '@/data/tournages';
import { WILAYAS, ALGERIA_VIEWBOX } from '@/data/algeria-wilayas';
import { TournagePin } from './TournagePin';
import { TournagePannel } from './TournagePannel';

const CAT_LABEL: Record<Tournage['categorie'], string> = {
  fiction: 'Fiction',
  documentaire: 'Documentaire',
  publicite: 'Publicite',
};
const CAT_COLOR: Record<Tournage['categorie'], string> = {
  fiction: '#C94B1A',
  documentaire: '#E8A020',
  publicite: '#A63D2F',
};

const AUTOPLAY_INTERVAL = 4000;
const RESUME_DELAY = 10000;

export function TournagesMap() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeTournage = tournages[activeIndex];

  // Autoplay
  useEffect(() => {
    if (!isPlaying || reduceMotion) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % tournages.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [isPlaying, reduceMotion]);

  const pauseAndScheduleResume = () => {
    setIsPlaying(false);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsPlaying(true), RESUME_DELAY);
  };

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [],
  );

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    pauseAndScheduleResume();
  };

  const stats = useMemo(() => {
    const wilayasUniques = new Set(tournages.map((t) => t.wilayaKey)).size;
    const oeuvres = new Set(tournages.map((t) => t.film)).size;
    return { lieux: tournages.length, wilayas: wilayasUniques, oeuvres };
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
      {/* CARTE */}
      <div className="relative">
        <div
          className="relative overflow-hidden border border-text-secondary/10 bg-[#0B0704]"
          style={{ aspectRatio: '963.5 / 964' }}
        >
          {/* Grille topo de fond */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(232,160,32,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(232,160,32,0.6) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <svg
            viewBox={ALGERIA_VIEWBOX}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Carte des tournages Akham en Algerie"
          >
            <defs>
              <filter id="algeriaGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(232,160,32,0.4)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Halo derriere le pays */}
            <g opacity="0.25">
              {WILAYAS.map((w) => (
                <path
                  key={`halo-${w.name}`}
                  d={w.d}
                  fill="rgba(232,160,32,0.08)"
                  stroke="none"
                  transform="translate(4 6)"
                />
              ))}
            </g>

            {/* Wilayas */}
            <g>
              {WILAYAS.map((w) => {
                const isActive = w.name === activeTournage.wilayaKey;
                return (
                  <path
                    key={w.name}
                    d={w.d}
                    fill={isActive ? 'url(#hatch)' : 'rgba(232,160,32,0.035)'}
                    stroke={isActive ? '#E8A020' : 'rgba(232,160,32,0.22)'}
                    strokeWidth={isActive ? 1.4 : 0.55}
                    style={{ transition: 'fill 350ms ease, stroke 350ms ease, stroke-width 350ms ease' }}
                  />
                );
              })}
            </g>

            {/* Liseret cotier sous-jacent */}
            <g opacity="0.3" pointerEvents="none">
              {WILAYAS.map((w) => (
                <path
                  key={`coast-${w.name}`}
                  d={w.d}
                  fill="none"
                  stroke="rgba(245,237,216,0.25)"
                  strokeWidth="0.3"
                />
              ))}
            </g>

            {/* Pins */}
            <g filter="url(#algeriaGlow)">
              {tournages.map((t, i) => (
                <TournagePin
                  key={t.id}
                  tournage={t}
                  isActive={i === activeIndex}
                  onClick={() => handleSelect(i)}
                />
              ))}
            </g>
          </svg>

          {/* Coordonnees deco coin haut gauche */}
          <div className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary/50">
            <div>28&deg;N &middot; 2&deg;E</div>
            <div className="text-action/60">DZA / 2 381 741 km&sup2;</div>
          </div>

          {/* Boussole coin haut droit */}
          <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary/50">
            <span>N</span>
            <span className="block h-3 w-px bg-action/40" />
          </div>

          {/* Compteur indice tournage */}
          <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[11px] uppercase tracking-[0.2em] text-action">
            {String(activeIndex + 1).padStart(2, '0')} / {String(tournages.length).padStart(2, '0')}
          </div>
        </div>

        {/* Legende + Stats */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border-l-2 border-action/40 px-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary/60">Categories</div>
            <ul className="mt-2 space-y-1">
              {(Object.keys(CAT_LABEL) as Tournage['categorie'][]).map((c) => (
                <li key={c} className="flex items-center gap-2 text-[12px] text-text-secondary">
                  <span
                    aria-hidden
                    className="inline-block h-[6px] w-[6px]"
                    style={{ background: CAT_COLOR[c], borderRadius: '50%' }}
                  />
                  {CAT_LABEL[c]}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-l-2 border-action/40 px-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary/60">Reseau</div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-text-primary">
              <div>
                <div className="font-display text-2xl text-action">{stats.lieux}</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-secondary/60">Lieux</div>
              </div>
              <div>
                <div className="font-display text-2xl text-action">{stats.wilayas}</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-secondary/60">Wilayas</div>
              </div>
              <div>
                <div className="font-display text-2xl text-action">{stats.oeuvres}</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-secondary/60">Oeuvres</div>
              </div>
            </div>
          </div>

          <div className="border-l-2 border-action/40 px-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary/60">Lecture</div>
            <button
              type="button"
              onClick={() => {
                if (isPlaying) {
                  pauseAndScheduleResume();
                } else {
                  if (resumeTimer.current) clearTimeout(resumeTimer.current);
                  setIsPlaying(true);
                }
              }}
              className="mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text-primary transition-colors hover:text-action"
            >
              <span
                aria-hidden
                className="inline-block h-2 w-2"
                style={{ background: isPlaying ? '#E8A020' : '#7A6A52' }}
              />
              {isPlaying ? 'Auto' : 'Pause'}
            </button>
          </div>
        </div>
      </div>

      {/* PANNEAU */}
      <motion.div
        key={activeTournage.id}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <TournagePannel
          tournage={activeTournage}
          currentIndex={activeIndex}
          total={tournages.length}
          isAutoPlaying={isPlaying}
          progressKey={activeIndex}
          onPrev={() =>
            handleSelect((activeIndex - 1 + tournages.length) % tournages.length)
          }
          onNext={() => handleSelect((activeIndex + 1) % tournages.length)}
        />
      </motion.div>
    </div>
  );
}
