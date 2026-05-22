'use client';

import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useCursor, type CursorVariant } from '@/components/providers/CursorProvider';
import { Play, Eye, ArrowUpRight } from 'lucide-react';

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const { variant, setVariant } = useCursor();
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  // Detect fine pointer
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const apply = () => {
      const v = mq.matches;
      setEnabled(v);
      document.body.classList.toggle('cursor-custom', v);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => {
      mq.removeEventListener('change', apply);
      document.body.classList.remove('cursor-custom');
    };
  }, []);

  // Smooth follow with lerp
  useEffect(() => {
    if (!enabled) return;
    const tick = () => {
      pos.current.x += (x - pos.current.x) * 0.18;
      pos.current.y += (y - pos.current.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [x, y, enabled]);

  // Detect hover on data-cursor elements
  useEffect(() => {
    if (!enabled) return;
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const node = t.closest('[data-cursor]') as HTMLElement | null;
      if (node) {
        setVariant((node.dataset.cursor || 'default') as CursorVariant);
      } else if (t.closest('a, button, [role="button"]')) {
        setVariant('link');
      } else {
        setVariant('default');
      }
    };
    document.addEventListener('mouseover', onOver);
    return () => document.removeEventListener('mouseover', onOver);
  }, [enabled, setVariant]);

  if (!enabled) return null;

  const sizeMap: Record<CursorVariant, string> = {
    default: 'w-7 h-7',
    link: 'w-10 h-10',
    cta: 'w-12 h-12',
    video: 'w-16 h-16',
    image: 'w-14 h-14',
  };

  const filled = variant === 'cta' || variant === 'video' || variant === 'image';

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ mixBlendMode: 'difference' }}
    >
      <div
        className={`flex items-center justify-center border transition-[width,height,background,border-color,clip-path] duration-200 ease-out ${sizeMap[variant]}`}
        style={{
          borderColor: 'rgba(232,160,32,0.95)',
          borderWidth: '1.5px',
          background: filled ? 'rgba(232,160,32,0.9)' : 'transparent',
          color: filled ? '#0F0A06' : '#E8A020',
          borderRadius: filled ? 0 : '50%',
          clipPath: filled
            ? 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)'
            : 'none',
          boxShadow: filled
            ? '0 0 18px rgba(232,160,32,0.45), 0 0 4px rgba(166,61,47,0.4)'
            : '0 0 10px rgba(232,160,32,0.25)',
        }}
      >
        {variant === 'default' && <Crosshair />}
        {variant === 'link' && <Crosshair />}
        {variant === 'video' && <Play size={18} fill="currentColor" />}
        {variant === 'image' && <Eye size={16} />}
        {variant === 'cta' && <ArrowUpRight size={20} />}
      </div>
    </div>
  );
}

function Crosshair() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <line x1="7" y1="0" x2="7" y2="4" stroke="currentColor" strokeWidth="1" />
      <line x1="7" y1="10" x2="7" y2="14" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="7" x2="4" y2="7" stroke="currentColor" strokeWidth="1" />
      <line x1="10" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
