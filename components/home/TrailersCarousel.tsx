'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Image from 'next/image';
import { films } from '@/data/films';

function getVimeoEmbed(url: string) {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (!match) return null;
  return `https://player.vimeo.com/video/${match[1]}`;
}

export function TrailersCarousel() {
  const slides = useMemo(
    () =>
      films
        .filter((film) => !!film.trailerUrl)
        .map((film) => ({
          ...film,
          embedUrl: getVimeoEmbed(film.trailerUrl as string),
        }))
        .filter((film) => !!film.embedUrl),
    []
  );

  const [index, setIndex] = useState(0);
  const [playingSlug, setPlayingSlug] = useState<string | null>(null);

  if (slides.length === 0) {
    return null;
  }

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  const startTrailer = (slug: string) => setPlayingSlug(slug);

  return (
    <section className="relative bg-noir-chaud py-16 md:py-20 border-y border-safran/15 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="meta text-safran">Bandes-annonces</p>
            <h2 className="font-display text-ivoire-pur mt-3" style={{ fontSize: 'clamp(36px, 5vw, 70px)', lineHeight: 0.95 }}>
              Réalisations en
              <span className="text-safran"> mouvement</span>
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Bande-annonce précédente"
              className="w-11 h-11 grid place-items-center border border-safran/40 text-ivoire-pur hover:text-safran hover:border-safran transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Bande-annonce suivante"
              className="w-11 h-11 grid place-items-center border border-safran/40 text-ivoire-pur hover:text-safran hover:border-safran transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => {
              const isActive = i === index;
              const isPlaying = isActive && playingSlug === slide.slug;

              return (
              <article key={slide.slug} className="w-full shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  <div className="lg:col-span-8 relative aspect-video bg-noir-relief border border-safran/20 overflow-hidden">
                    {isPlaying ? (
                      <iframe
                        src={`${slide.embedUrl}?title=0&byline=0&portrait=0&autoplay=1`}
                        title={`Bande-annonce ${slide.title}`}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => startTrailer(slide.slug)}
                        className="relative block w-full h-full"
                        aria-label={`Lire la bande-annonce de ${slide.title}`}
                      >
                        <Image
                          src={slide.still}
                          alt={`Aperçu ${slide.title}`}
                          fill
                          sizes="(min-width: 1024px) 66vw, 100vw"
                          className="object-cover"
                          style={{ filter: 'brightness(0.78)' }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: 'linear-gradient(180deg, rgba(6,6,6,0.15), rgba(6,6,6,0.45))' }}
                        />
                        <span className="absolute inset-0 grid place-items-center">
                          <span className="w-16 h-16 grid place-items-center bg-safran text-noir-absolu">
                            <Play size={24} fill="currentColor" />
                          </span>
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="lg:col-span-4 border border-safran/20 bg-noir-surface p-5 md:p-6 flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden mb-5">
                      <Image
                        src={slide.poster}
                        alt={slide.title}
                        fill
                        sizes="(min-width: 1024px) 24vw, 70vw"
                        className="object-cover"
                      />
                    </div>

                    <p className="meta text-safran flex items-center gap-2">
                      <Play size={12} />
                      {slide.year} · {slide.duration} min
                    </p>
                    <h3 className="font-display text-ivoire-pur text-3xl mt-3">{slide.title}</h3>
                    <p className="text-ivoire-warm text-sm mt-3 leading-relaxed">{slide.synopsisShort}</p>
                    <p className="text-ivoire-low text-xs mt-4">Réalisation: {slide.director}</p>
                  </div>
                </div>
              </article>
            )})}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-7">
          {slides.map((slide, i) => (
            <button
              key={slide.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Aller à ${slide.title}`}
              className={`h-2 transition-all ${i === index ? 'w-10 bg-safran' : 'w-2 bg-ivoire-low/30 hover:bg-ivoire-low/50'}`}
            />
          ))}
        </div>

        <div className="md:hidden mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Bande-annonce précédente"
            className="w-11 h-11 grid place-items-center border border-safran/40 text-ivoire-pur"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Bande-annonce suivante"
            className="w-11 h-11 grid place-items-center border border-safran/40 text-ivoire-pur"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
