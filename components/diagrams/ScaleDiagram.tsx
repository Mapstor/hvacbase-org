// Server-rendered SVG scale — labeled range segments (e.g. MERV 1-4 → 5-8 → 9-12 → 13-16).
// Each segment has a range label, a category name, and a description of what it captures.

interface ScaleTier {
  range: string;
  label: string;
  description: string;
  color?: string;
}

interface ScaleDiagramProps {
  tiers: ScaleTier[];
  title: string;
  desc: string;
  axisLabel?: string;
  caption?: string;
}

const DEFAULT_COLORS = ['#E0F7FA', '#A5F3FC', '#67E8F9', '#22D3EE', '#0891B2', '#0E7490'];
const DARK = '#164E63';
const AXIS = '#374151';

export default function ScaleDiagram({
  tiers,
  title,
  desc,
  axisLabel,
  caption,
}: ScaleDiagramProps) {
  if (!tiers || tiers.length === 0) return null;

  const W = 800;
  const H = 320;
  const PAD_L = 20;
  const PAD_R = 20;
  const PAD_T = 44;
  const barY = PAD_T + 8;
  const barH = 60;
  const trackW = W - PAD_L - PAD_R;
  const segW = trackW / tiers.length;

  return (
    <figure className="my-8 not-prose">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
      >
        <desc>{desc}</desc>

        <text
          x={PAD_L}
          y={26}
          fontSize={17}
          fontWeight={700}
          fill={DARK}
          fontFamily="Inter, system-ui, sans-serif"
        >
          {title}
        </text>

        {tiers.map((t, i) => {
          const x = PAD_L + i * segW;
          const fill = t.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
          const isLight = i < 3;
          const textColor = isLight ? DARK : '#ffffff';

          return (
            <g key={`t-${i}`}>
              <rect
                x={x}
                y={barY}
                width={segW - 2}
                height={barH}
                fill={fill}
                stroke={DARK}
                strokeWidth={0.5}
              />
              <text
                x={x + segW / 2}
                y={barY + 26}
                textAnchor="middle"
                fontSize={16}
                fontWeight={700}
                fill={textColor}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {t.range}
              </text>
              <text
                x={x + segW / 2}
                y={barY + 46}
                textAnchor="middle"
                fontSize={12}
                fill={textColor}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {t.label}
              </text>

              <foreignObject
                x={x + 2}
                y={barY + barH + 12}
                width={segW - 4}
                height={H - (barY + barH + 20)}
              >
                <div
                  {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: 12,
                    color: AXIS,
                    lineHeight: 1.35,
                    textAlign: 'center',
                    padding: '0 4px',
                  }}
                >
                  {t.description}
                </div>
              </foreignObject>
            </g>
          );
        })}

        {axisLabel && (
          <text
            x={W / 2}
            y={H - 4}
            textAnchor="middle"
            fontSize={13}
            fill={AXIS}
            fontStyle="italic"
            fontFamily="Inter, system-ui, sans-serif"
          >
            {axisLabel}
          </text>
        )}
      </svg>
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
