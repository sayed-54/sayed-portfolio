import type { CSSProperties } from "react";

interface AuroraProps {
  colorStops: string[];
  amplitude?: number;
  blend?: number;
  className?: string;
}

export default function Aurora({
  colorStops,
  amplitude = 1.7,
  blend = 0.55,
  className = "",
}: AuroraProps) {
  const gradient = colorStops
    .map((color, index) => {
      const x = 15 + index * 18;
      const y = index % 2 === 0 ? 25 : 70;
      return `radial-gradient(55% 55% at ${x}% ${y}%, ${color} 0%, transparent 62%)`;
    })
    .join(", ");

  const style: CSSProperties = {
    backgroundImage: gradient,
    opacity: blend,
    "--aurora-amplitude": `${amplitude}`,
  } as CSSProperties;

  return (
    <div className={`aurora ${className}`}>
      <div className="aurora-layer" style={style} />
      <div className="aurora-layer aurora-layer--secondary" style={style} />
    </div>
  );
}
