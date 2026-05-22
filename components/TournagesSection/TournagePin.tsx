'use client';

import type { Tournage } from '@/data/tournages';

interface TournagePinProps {
  tournage: Tournage;
  isActive: boolean;
  onClick: () => void;
}

const CAT_COLOR: Record<Tournage['categorie'], string> = {
  fiction: '#C94B1A',
  documentaire: '#E8A020',
  publicite: '#A63D2F',
};

/**
 * Pin SVG positionne directement dans la carte (meme viewBox).
 * Trace en SVG natif pour que la position colle pixel-perfect a la wilaya.
 */
export function TournagePin({ tournage, isActive, onClick }: TournagePinProps) {
  const { cx, cy } = tournage.coords;
  const color = CAT_COLOR[tournage.categorie];

  return (
    <g
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${tournage.lieu} - ${tournage.film}`}
      style={{ cursor: 'pointer' }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {isActive && (
        <>
          <circle cx={cx} cy={cy} r={28} fill={color} fillOpacity={0.08}>
            <animate attributeName="r" values="20;36;20" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" values="0.18;0;0.18" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy={cy} r={18} fill="none" stroke={color} strokeWidth={1.5} strokeOpacity={0.9} />
        </>
      )}
      <circle cx={cx} cy={cy} r={11} fill="none" stroke="#E8A020" strokeWidth={1} strokeOpacity={isActive ? 0.9 : 0.45} />
      <circle cx={cx} cy={cy} r={6} fill={color} fillOpacity={isActive ? 1 : 0.85} />
      <title>{`${tournage.lieu} — ${tournage.film}`}</title>
    </g>
  );
}
