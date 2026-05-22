'use client';

import Image from 'next/image';
import { useMakingOf } from '@/components/providers/MakingOfProvider';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FilmImageProps {
  src: string;
  makingOfSrc?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

/**
 * Image cinématographique : révélation argentique au scroll + bascule making-of.
 */
export function FilmImage({
  src,
  makingOfSrc,
  alt,
  className,
  fill,
  width,
  height,
  priority,
  sizes,
}: FilmImageProps) {
  const { active } = useMakingOf();
  const [loaded, setLoaded] = useState(false);
  const finalSrc = active && makingOfSrc ? makingOfSrc : src;

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden bg-anthracite',
        fill ? 'absolute inset-0 w-full h-full' : '',
        className
      )}
      initial={{ clipPath: 'inset(100% 0 0 0)', filter: 'brightness(0)' }}
      whileInView={{
        clipPath: 'inset(0% 0 0 0)',
        filter: 'brightness(1)',
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
      }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <Image
        key={finalSrc}
        src={finalSrc}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        priority={priority}
        sizes={sizes || '(min-width: 1024px) 50vw, 100vw'}
        onLoad={() => setLoaded(true)}
        className={cn(
          'object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
      />
      {active && makingOfSrc && (
        <span className="absolute top-3 left-3 meta bg-noir-salle/70 px-2 py-1 z-10">
          Making-of
        </span>
      )}
    </motion.div>
  );
}
