'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useStudioLive } from '@/components/providers/StudioLiveProvider';
import { cn } from '@/lib/utils';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { CalligraphyTexture } from '@/components/home/CalligraphyTexture';

const NAV = [
  { href: '/films', label: 'Films' },
  { href: '/services', label: 'Services' },
  { href: '/studio', label: 'Studio' },
  { href: '/equipe', label: 'Équipe' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { active: studioLive } = useStudioLive();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-noir-chaud/92 backdrop-blur-md border-b border-safran/20'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-[1600px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between relative">
          <Link href="/" className="flex items-center gap-3 relative" aria-label="Akham Films — accueil">
            <div className="relative w-5 h-5 hidden sm:block" aria-hidden>
              <ZelligeFragment
                size={20}
                color="terracotta"
                opacity={0.65}
                rotation={-12}
                shape="diamond"
                x="0"
                y="0"
              />
            </div>
            <span className="font-display text-3xl tracking-wider text-safran leading-none">
              AKHAM
            </span>
            <span className="font-display text-3xl tracking-wider text-ivoire-pur leading-none">
              FILMS
            </span>
            {studioLive && (
              <span className="hidden md:flex items-center gap-2 ml-4 meta text-orange-brule">
                <span className="w-2 h-2 rounded-full bg-orange-brule shadow-[0_0_10px_rgba(201,75,26,0.9)] animate-blink" />
                STUDIO ACTIF
              </span>
            )}
          </Link>

          <ul className="hidden lg:flex items-center">
            {NAV.map((item, i) => (
              <li key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  className="link-or text-[12px] tracking-[0.16em] uppercase font-medium px-2"
                >
                  {item.label}
                </Link>
                {i < NAV.length - 1 && (
                  <span className="diamond opacity-50" aria-hidden style={{ margin: '0 6px' }} />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href="/pitch"
              data-cursor="cta"
              className="hidden lg:inline-flex cta-primary"
              aria-label="Pitcher un projet"
            >
              Collaborer <ArrowUpRight size={14} />
            </Link>
            <button
              type="button"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 text-ivoire-pur"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Scroll progress bar */}
        <div
          aria-hidden
          className="h-px bg-safran/80 origin-left"
          style={{ transform: `scaleX(${progress})`, transition: 'transform 120ms linear' }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-noir-chaud lg:hidden overflow-hidden"
          >
            <CalligraphyTexture />
            <div aria-hidden className="absolute top-10 right-6">
              <ZelligeFragment size={120} color="safran" opacity={0.18} rotation={20} shape="hexagon" x="0" y="0" />
            </div>
            <div aria-hidden className="absolute bottom-20 left-4">
              <ZelligeFragment size={90} color="terracotta" opacity={0.22} rotation={-15} shape="diamond" x="0" y="0" />
            </div>

            <div className="h-20" />
            <ul className="flex flex-col gap-3 p-10 relative z-10">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                  className="flex items-baseline gap-3"
                >
                  <span className="diamond" aria-hidden />
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-5xl tracking-wider text-ivoire-pur hover:text-safran transition-colors"
                  >
                    {item.label}
                  </Link>
                  <span className="counter-mono text-[10px] text-ivoire-low ml-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
