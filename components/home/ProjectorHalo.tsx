'use client';

import { useEffect, useRef } from 'react';

/**
 * Halo radial safran qui suit le curseur.
 * À placer dans un parent `position: relative`.
 */
export function ProjectorHalo({
  size = 360,
  color = 'rgba(232,160,32,0.10)',
}: {
  size?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const reduce = window.matchMedia('(pointer: coarse)').matches;
    if (reduce) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    function loop() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el!.style.setProperty('--x', `${cx}px`);
      el!.style.setProperty('--y', `${cy}px`);
      raf = requestAnimationFrame(loop);
    }

    function move(e: MouseEvent) {
      const r = parent!.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    }

    parent.addEventListener('mousemove', move);
    raf = requestAnimationFrame(loop);
    return () => {
      parent.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `radial-gradient(circle ${size}px at var(--x,50%) var(--y,50%), ${color}, transparent 65%)`,
        zIndex: 2,
      }}
    />
  );
}
