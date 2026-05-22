'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { ScanLine } from '@/components/home/ScanLine';
import { FilmGrain } from '@/components/home/FilmGrain';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
  title?: string;
}

function getVimeoEmbed(url: string) {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (!match) return null;
  return `https://player.vimeo.com/video/${match[1]}`;
}

export function VideoModal({ open, onClose, src, title }: VideoModalProps) {
  const vimeoEmbed = getVimeoEmbed(src);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-noir-absolu/95 flex items-center justify-center p-6 overflow-hidden"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Lecteur vidéo'}
        >
          <FilmGrain opacity={0.18} />
          <ScanLine speed={9} opacity={0.25} />
          <div aria-hidden className="absolute top-10 left-10 pointer-events-none">
            <ZelligeFragment size={120} color="terracotta" opacity={0.3} rotation={20} shape="hexagon" x="0" y="0" />
          </div>
          <div aria-hidden className="absolute bottom-10 right-10 pointer-events-none">
            <ZelligeFragment size={100} color="ocre" opacity={0.25} rotation={-10} shape="diamond" x="0" y="0" />
          </div>

          {/* Top-left meta */}
          <div className="absolute top-6 left-6 flex items-center gap-2 text-ivoire-warm/85 z-10">
            <span className="block w-2 h-2 bg-orange-brule rounded-full animate-blink shadow-[0_0_10px_rgba(201,75,26,0.85)]" />
            <span className="counter-mono text-[10px]">PLAYBACK · TC 00:00:00:00</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-6 right-6 text-ivoire-pur hover:text-safran p-2 z-10 border border-safran/30 hover:border-safran transition-colors"
            style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
          >
            <X size={22} />
          </button>
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="relative w-full max-w-[90vw] aspect-video bg-black border-l-4 border-terracotta border-y border-r border-safran/40 shadow-[0_0_60px_rgba(232,160,32,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            {vimeoEmbed ? (
              <iframe
                src={`${vimeoEmbed}?title=0&byline=0&portrait=0&autoplay=1`}
                title={title || 'Lecteur vidéo'}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <video
                src={src}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            )}
            {title && (
              <p className="absolute -bottom-7 left-0 counter-mono text-[10px] text-safran/85 flex items-center gap-2">
                <span className="diamond" aria-hidden style={{ margin: 0 }} />
                {title}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
