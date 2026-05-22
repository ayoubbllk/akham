'use client';

type ColorKey = 'safran' | 'orange' | 'terracotta' | 'ocre' | 'carmin';

const COLOR: Record<ColorKey, string> = {
  safran: '#E8A020',
  orange: '#C94B1A',
  terracotta: '#A63D2F',
  ocre: '#D4762C',
  carmin: '#8B1A1A',
};

interface Props {
  size?: number;
  color?: ColorKey;
  opacity?: number;
  rotation?: number;
  x?: string;
  y?: string;
  animated?: boolean;
  shape?: 'diamond' | 'hexagon' | 'triangle';
  className?: string;
  style?: React.CSSProperties;
}

export function ZelligeFragment({
  size = 120,
  color = 'safran',
  opacity = 0.35,
  rotation = 0,
  x,
  y,
  animated = false,
  shape = 'diamond',
  className,
  style,
}: Props) {
  const c = COLOR[color];
  const id = `zlg-${color}-${size}-${Math.round(rotation * 100)}`;

  const path =
    shape === 'hexagon'
      ? 'M50 4 L92 27 L92 73 L50 96 L8 73 L8 27 Z'
      : shape === 'triangle'
        ? 'M50 6 L94 90 L6 90 Z'
        : 'M50 4 L96 50 L50 96 L4 50 Z';

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center',
        pointerEvents: 'none',
        ['--rot' as string]: `${rotation}deg`,
        animation: animated ? 'fragmentFloat 9s ease-in-out infinite' : undefined,
        ...style,
      }}
    >
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={c} strokeWidth="0.4" opacity="0.5" />
        </pattern>
      </defs>
      <path d={path} fill={c} fillOpacity={opacity} stroke={c} strokeOpacity={0.45} strokeWidth={0.5} />
      <path d={path} fill={`url(#${id})`} />
    </svg>
  );
}
