'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { useMakingOf } from '@/components/providers/MakingOfProvider';
import type { Film } from '@/lib/types';
import { VideoModal } from '@/components/VideoModal';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { CalligraphyTexture } from '@/components/home/CalligraphyTexture';
import { ScanLine } from '@/components/home/ScanLine';
import { FilmGrain } from '@/components/home/FilmGrain';

export function FilmDetail({ film }: { film: Film }) {
  const { active, toggle } = useMakingOf();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [trailer, setTrailer] = useState(false);

  return (
    <article>
      {/* Hero CinemaScope */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src={film.poster}
          alt={`Affiche ${film.title}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: 'brightness(0.62) contrast(1.04)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir-chaud/55 via-noir-chaud/35 to-noir-chaud" />
        <FilmGrain opacity={0.18} />
        <ScanLine speed={9} opacity={0.4} />
        <div aria-hidden className="absolute top-32 right-12 z-[5]">
          <ZelligeFragment size={140} color="terracotta" opacity={0.32} rotation={18} shape="hexagon" x="0" y="0" />
        </div>

        {/* Top corner timecode */}
        <div className="absolute top-24 right-10 counter-mono text-[10px] text-safran/80 z-10">
          REEL 02 · TC 00:00:00:00
        </div>

        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-20">
          <p className="meta flex items-center gap-3 flex-wrap">
            <span className="counter-mono">{film.year}</span>
            <span className="diamond" aria-hidden style={{ margin: 0 }} />
            <span>{film.category}</span>
            <span className="diamond" aria-hidden style={{ margin: 0 }} />
            <span className="counter-mono">{film.duration}′</span>
            <span className="diamond" aria-hidden style={{ margin: 0 }} />
            <span>Réalisation {film.director}</span>
          </p>
          <h1
            className="h-display text-ivoire-pur mt-6"
            style={{ fontSize: 'clamp(56px, 11vw, 160px)', lineHeight: 0.92 }}
          >
            {film.title.split('').map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.03 * i, duration: 0.6, ease: 'easeOut' }}
                className="inline-block"
              >
                {c === ' ' ? '\u00A0' : c}
              </motion.span>
            ))}
          </h1>
          {film.titleFr && (
            <p className="meta text-ivoire-warm mt-4">{film.titleFr}</p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {film.trailerUrl && (
              <button
                type="button"
                data-cursor="video"
                onClick={() => setTrailer(true)}
                className="cta-primary"
              >
                <Play size={14} fill="currentColor" /> Voir la bande-annonce
              </button>
            )}
            <button
              type="button"
              onClick={toggle}
              aria-pressed={active}
              className="cta-secondary"
              style={active ? { borderColor: 'var(--safran)', color: 'var(--safran)' } : undefined}
            >
              {active ? 'Quitter le making-of' : 'Mode making-of'}
            </button>
          </div>
        </div>
      </section>

      {/* Synopsis */}
      <Reveal>
        <section className="relative bg-noir-chaud py-24 overflow-hidden">
          <div aria-hidden className="absolute top-10 left-6 calligraphy-word text-terracotta" dir="rtl" style={{ position: 'absolute', opacity: 0.07, fontSize: 200, lineHeight: 1, transform: 'rotate(-8deg)' }}>
            ضوء
          </div>
          <div className="relative max-w-3xl mx-auto px-6 md:px-10">
            <p className="meta flex items-center gap-2">
              <span className="diamond" aria-hidden style={{ margin: 0 }} />
              Synopsis
            </p>
            <span className="block w-12 h-[2px] bg-terracotta mt-4 mb-8" />
            {film.synopsis.split('\n\n').map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="text-ivoire-pur text-lg leading-relaxed mb-6"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Galerie */}
      {film.gallery.length > 0 && (
        <Reveal>
          <section className="relative bg-noir-surface py-24 overflow-hidden">
            <div aria-hidden className="absolute top-12 right-10">
              <ZelligeFragment size={90} color="ocre" opacity={0.25} rotation={15} shape="diamond" x="0" y="0" />
            </div>
            <ScanLine speed={16} opacity={0.18} />
            <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative">
              <p className="meta flex items-center gap-2">
                <span className="diamond" aria-hidden style={{ margin: 0 }} />
                Galerie
              </p>
              <h2 className="h-display text-ivoire-pur text-4xl md:text-6xl mt-3 mb-12">
                <span className="text-zellige-fill">Images</span>
              </h2>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
                {film.gallery.map((img, i) => {
                  const src = active && img.makingOf ? img.makingOf : img.src;
                  return (
                    <button
                      type="button"
                      key={i}
                      data-cursor="image"
                      onClick={() => setLightbox(src)}
                      className="block w-full mb-4 overflow-hidden bg-noir-relief group break-inside-avoid"
                    >
                      <div className="relative w-full h-auto">
                        <Image
                          src={src}
                          alt={img.alt}
                          width={1200}
                          height={800}
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                          style={{ filter: 'brightness(0.86)' }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* Équipe */}
      <Reveal>
        <section className="relative bg-noir-chaud py-24 overflow-hidden">
          <div aria-hidden className="absolute bottom-10 left-6 calligraphy-word text-safran" dir="rtl" style={{ position: 'absolute', opacity: 0.06, fontSize: 220, lineHeight: 1, transform: 'rotate(5deg)' }}>
            حكاية
          </div>
          <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">
            <p className="meta flex items-center gap-2">
              <span className="diamond" aria-hidden style={{ margin: 0 }} />
              Équipe du film
            </p>
            <span className="block w-12 h-[2px] bg-terracotta mt-4 mb-12" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
              {film.crew.map((c) => (
                <div key={c.role + c.name} className="border-l-2 border-safran/50 hover:border-safran pl-4 transition-colors">
                  <p className="meta text-ivoire-warm">{c.role}</p>
                  <p className="text-ivoire-pur text-lg mt-1">{c.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Fiche technique */}
      <Reveal>
        <section className="bg-noir-surface py-24">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <p className="meta flex items-center gap-2">
              <span className="diamond" aria-hidden style={{ margin: 0 }} />
              Fiche technique
            </p>
            <span className="block w-12 h-[2px] bg-terracotta mt-4 mb-8" />
            <table className="w-full counter-mono text-sm">
              <tbody>
                <Row label="Titre" value={film.title} />
                {film.titleFr && <Row label="Titre français" value={film.titleFr} />}
                <Row label="Année" value={String(film.year)} />
                <Row label="Catégorie" value={film.category} />
                <Row label="Durée" value={`${film.duration} minutes`} />
                <Row label="Réalisation" value={film.director} />
                <Row label="Production" value="Akham Films" />
                <Row label="Statut" value={film.status} />
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      {/* Festivals */}
      {film.festivals && film.festivals.length > 0 && (
        <Reveal>
          <section className="relative bg-noir-chaud py-24 overflow-hidden">
            <div aria-hidden className="absolute top-12 right-10 calligraphy-word text-orange-brule" dir="rtl" style={{ position: 'absolute', opacity: 0.08, fontSize: 160, lineHeight: 1, transform: 'rotate(-6deg)' }}>
              فن
            </div>
            <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">
              <p className="meta flex items-center gap-2">
                <span className="diamond" aria-hidden style={{ margin: 0 }} />
                Festivals & prix
              </p>
              <span className="block w-12 h-[2px] bg-terracotta mt-4 mb-12" />
              <div className="overflow-x-auto no-scrollbar">
                <ol className="flex gap-6 min-w-max">
                  {film.festivals.map((f, i) => (
                    <li
                      key={i}
                      className="w-72 shrink-0 border border-safran/25 p-6 bg-noir-relief relative"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
                    >
                      <div className="counter-mono text-safran text-lg">{f.year}</div>
                      <h4 className="font-display text-ivoire-pur text-2xl mt-3">
                        {f.name}
                      </h4>
                      {f.award && (
                        <p className="text-sm text-ivoire-warm mt-3">{f.award}</p>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {film.trailerUrl && (
        <VideoModal
          open={trailer}
          onClose={() => setTrailer(false)}
          src={film.trailerUrl}
          title={`${film.title} — bande-annonce`}
        />
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-noir-absolu/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-ivoire-pur hover:text-safran"
          >
            <X size={28} />
          </button>
          <div className="relative max-w-[90vw] max-h-[85vh]">
            <Image
              src={lightbox}
              alt=""
              width={1920}
              height={1280}
              className="object-contain max-h-[85vh] w-auto"
            />
          </div>
        </div>
      )}
    </article>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-safran/15">
      <td className="py-3 pr-4 text-ivoire-warm uppercase tracking-wider text-xs w-1/3">
        {label}
      </td>
      <td className="py-3 text-safran">{value}</td>
    </tr>
  );
}
