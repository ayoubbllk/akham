'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Tournage } from '@/data/tournages';

interface TournagePannelProps {
  tournage: Tournage;
  currentIndex: number;
  total: number;
  isAutoPlaying: boolean;
  progressKey: number;
  onPrev: () => void;
  onNext: () => void;
}

const CATEGORY_LABEL: Record<Tournage['categorie'], string> = {
  fiction: 'FICTION',
  documentaire: 'DOCUMENTAIRE',
  publicite: 'PUBLICITE',
};

const CATEGORY_COLOR: Record<Tournage['categorie'], string> = {
  fiction: '#C94B1A',
  documentaire: '#E8A020',
  publicite: '#A63D2F',
};

export function TournagePannel({
  tournage,
  currentIndex,
  total,
  isAutoPlaying,
  progressKey,
  onPrev,
  onNext,
}: TournagePannelProps) {
  return (
    <motion.aside
      key={tournage.id}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        background: '#160E08',
        border: '1px solid rgba(232,160,32,0.16)',
        minHeight: '100%',
      }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={tournage.image}
          alt={tournage.lieu}
          fill
          sizes="(min-width: 1024px) 36vw, 100vw"
          style={{ objectFit: 'cover' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(15,10,6,0) 46%, rgba(15,10,6,0.88) 100%)',
          }}
        />
        <span
          className="absolute left-4 top-4"
          style={{
            background: 'rgba(15,10,6,0.85)',
            border: `0.5px solid ${CATEGORY_COLOR[tournage.categorie]}`,
            color: CATEGORY_COLOR[tournage.categorie],
            fontFamily: 'var(--font-dmsans)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '6px 10px',
          }}
        >
          {CATEGORY_LABEL[tournage.categorie]}
        </span>
      </div>

      <div className="p-5 md:p-6">
        <span
          style={{
            fontFamily: 'var(--font-dmsans)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#E8A020',
          }}
        >
          {tournage.wilaya} · {tournage.annee}
        </span>

        <h3
          className="font-display mt-2"
          style={{
            fontSize: 'clamp(28px, 2.5vw, 34px)',
            lineHeight: 0.95,
            color: '#F5EDD8',
          }}
        >
          {tournage.lieu}
        </h3>

        <p
          className="mt-3"
          style={{
            fontFamily: 'var(--font-dmsans)',
            fontSize: 14,
            fontWeight: 500,
            color: '#E8A020',
            letterSpacing: '0.04em',
          }}
        >
          {tournage.film}
        </p>

        <div className="mt-4 flex items-start gap-3">
          <span
            style={{
              width: 24,
              height: 1,
              marginTop: 8,
              background: '#A63D2F',
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-dmsans)',
              fontSize: 13,
              fontWeight: 300,
              lineHeight: 1.65,
              color: '#C8B898',
            }}
          >
            {tournage.anecdote}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onPrev}
            style={{
              fontFamily: 'var(--font-dmsans)',
              fontSize: 12,
              fontWeight: 500,
              color: '#7A6A52',
              transition: 'color 200ms ease',
            }}
            className="hover:text-safran"
          >
            ← Precedent
          </button>
          <span
            style={{
              fontFamily: 'var(--font-dmsans)',
              fontSize: 11,
              color: '#7A6A52',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {currentIndex + 1} / {total}
          </span>
          <button
            type="button"
            onClick={onNext}
            style={{
              fontFamily: 'var(--font-dmsans)',
              fontSize: 12,
              fontWeight: 500,
              color: '#7A6A52',
              transition: 'color 200ms ease',
            }}
            className="hover:text-safran"
          >
            Suivant →
          </button>
        </div>
      </div>

      <div
        key={progressKey}
        style={{
          height: 1,
          width: '100%',
          background: 'rgba(232,160,32,0.12)',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            display: 'block',
            height: '100%',
            width: isAutoPlaying ? '100%' : '0%',
            background: '#E8A020',
            transformOrigin: 'left',
            animation: isAutoPlaying ? 'panelProgress 4s linear forwards' : 'none',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes panelProgress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          aside,
          span {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </motion.aside>
  );
}
