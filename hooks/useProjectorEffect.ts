'use client';

import { useEffect, useRef } from 'react';

/**
 * Halo projecteur : suit le curseur via les CSS custom props --x / --y
 * Appliquer la classe `projector-halo` sur l'élément cible.
 */
export function useProjectorEffect<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--y', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return ref;
}
