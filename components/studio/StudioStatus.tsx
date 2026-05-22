'use client';

import { useStudioLive } from '@/components/providers/StudioLiveProvider';

export function StudioStatus() {
  const { active } = useStudioLive();

  return (
    <section className="relative bg-noir-surface py-20 border-y border-terracotta/30 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div>
          <p className="meta flex items-center gap-2">
            <span className="diamond" aria-hidden style={{ margin: 0 }} />
            Studio en direct
          </p>
          <h3 className="h-display text-ivoire-pur text-3xl md:text-5xl mt-3">
            {active ? (
              <>Tournage <span className="text-zellige-fill">en cours</span></>
            ) : (
              <>Studio <span className="text-zellige-fill">disponible</span></>
            )}
          </h3>
          <p className="text-ivoire-warm text-sm mt-3 max-w-xl">
            {active
              ? 'Le studio est actuellement utilisé pour un tournage. Réservations possibles à partir de la semaine prochaine.'
              : 'Aucune production en cours — créneau disponible immédiatement.'}
          </p>
        </div>
        <div
          className={`flex items-center gap-3 px-5 py-3 border ${
            active ? 'border-orange-brule text-orange-brule' : 'border-ocre text-ocre'
          }`}
          style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              active
                ? 'bg-orange-brule animate-blink shadow-[0_0_14px_rgba(201,75,26,0.85)]'
                : 'bg-ocre shadow-[0_0_10px_rgba(212,118,44,0.55)]'
            }`}
          />
          <span className="meta">{active ? 'Live · Plateau actif' : 'Disponible'}</span>
        </div>
      </div>
    </section>
  );
}
