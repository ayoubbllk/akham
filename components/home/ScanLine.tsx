interface Props {
  speed?: number; // seconds
  opacity?: number;
}

export function ScanLine({ speed = 8, opacity = 0.6 }: Props) {
  return (
    <div
      aria-hidden
      className="scan-line"
      style={{
        animationDuration: `${speed}s`,
        opacity,
      }}
    />
  );
}
