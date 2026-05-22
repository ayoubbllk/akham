interface Word {
  text: string;
  x: string;
  y: string;
  size: number;
  rotate: number;
  opacity?: number;
}

const DEFAULTS: Word[] = [
  { text: 'ضوء', x: '-2%', y: '8%', size: 180, rotate: -6, opacity: 0.045 },
  { text: 'حكاية', x: '62%', y: '34%', size: 220, rotate: 4, opacity: 0.04 },
  { text: 'أحلام', x: '14%', y: '64%', size: 200, rotate: -3, opacity: 0.035 },
  { text: 'الجزائر', x: '50%', y: '82%', size: 260, rotate: 7, opacity: 0.04 },
  { text: 'نور', x: '78%', y: '6%', size: 150, rotate: -10, opacity: 0.05 },
  { text: 'فن', x: '38%', y: '20%', size: 130, rotate: 8, opacity: 0.045 },
];

export function CalligraphyTexture({ words = DEFAULTS }: { words?: Word[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {words.map((w, i) => (
        <span
          key={i}
          className="calligraphy-word"
          dir="rtl"
          style={{
            left: w.x,
            top: w.y,
            fontSize: w.size,
            opacity: w.opacity,
            transform: `rotate(${w.rotate}deg)`,
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}
