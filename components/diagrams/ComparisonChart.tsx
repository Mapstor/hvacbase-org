// Server-rendered SVG grouped bar chart: two options across N metrics.
// Each metric is scaled independently (currency vs SEER vs count don't share a Y axis).

interface Metric {
  label: string;
  a: number;
  b: number;
  unit?: string;
  format?: 'currency' | 'number' | 'range';
  aNote?: string;
  bNote?: string;
}

interface Option {
  name: string;
  color?: string;
}

interface ComparisonChartProps {
  optionA: Option;
  optionB: Option;
  metrics: Metric[];
  title: string;
  desc: string;
  caption?: string;
}

const PRIMARY = '#0891B2';
const DARK = '#164E63';
const AXIS = '#374151';
const GRID = '#E5E7EB';

function fmtVal(v: number, format?: string): string {
  if (format === 'currency') {
    if (v >= 1000) return `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k`;
    return `$${v.toLocaleString('en-US')}`;
  }
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

export default function ComparisonChart({
  optionA,
  optionB,
  metrics,
  title,
  desc,
  caption,
}: ComparisonChartProps) {
  if (!metrics || metrics.length === 0) return null;

  const colorA = optionA.color || PRIMARY;
  const colorB = optionB.color || DARK;

  const W = 800;
  const rowH = 108;
  const headH = 108;
  const footH = 44;
  const H = headH + metrics.length * rowH + footH;
  const PAD_L = 220;
  const PAD_R = 40;
  const barTrack = W - PAD_L - PAD_R;
  const BAR_SCALE = 0.6;

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
          x={W / 2}
          y={28}
          textAnchor="middle"
          fontSize={20}
          fontWeight={700}
          fill={DARK}
          fontFamily="Inter, system-ui, sans-serif"
        >
          {title}
        </text>

        <g transform={`translate(0, 50)`}>
          <rect x={PAD_L} y={0} width={14} height={14} fill={colorA} />
          <text
            x={PAD_L + 20}
            y={12}
            fontSize={15}
            fontWeight={600}
            fill={AXIS}
            fontFamily="Inter, system-ui, sans-serif"
          >
            {optionA.name}
          </text>

          <rect x={PAD_L} y={22} width={14} height={14} fill={colorB} />
          <text
            x={PAD_L + 20}
            y={34}
            fontSize={15}
            fontWeight={600}
            fill={AXIS}
            fontFamily="Inter, system-ui, sans-serif"
          >
            {optionB.name}
          </text>
        </g>

        {metrics.map((m, i) => {
          const rowY = headH + i * rowH;
          const rowMax = Math.max(m.a, m.b);
          const aFrac = rowMax > 0 ? (m.a / rowMax) * BAR_SCALE : 0;
          const bFrac = rowMax > 0 ? (m.b / rowMax) * BAR_SCALE : 0;
          const barH = 22;
          const aEnd = PAD_L + aFrac * barTrack;
          const bEnd = PAD_L + bFrac * barTrack;

          return (
            <g key={`m-${i}`}>
              <foreignObject x={8} y={rowY + 18} width={PAD_L - 16} height={rowH - 24}>
                <div
                  {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: 16,
                    fontWeight: 600,
                    color: DARK,
                    lineHeight: 1.25,
                    textAlign: 'right',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingRight: 4,
                    boxSizing: 'border-box',
                    wordBreak: 'normal',
                    overflowWrap: 'break-word',
                  }}
                >
                  {m.label}
                </div>
              </foreignObject>

              <line
                x1={PAD_L}
                x2={PAD_L + barTrack}
                y1={rowY + 100}
                y2={rowY + 100}
                stroke={GRID}
                strokeWidth={1}
              />

              <rect
                x={PAD_L}
                y={rowY + 20}
                width={aFrac * barTrack}
                height={barH}
                fill={colorA}
                rx={2}
              />
              <text
                x={aEnd + 8}
                y={rowY + 34}
                fontSize={15}
                fontWeight={700}
                fill={DARK}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {fmtVal(m.a, m.format)}
                {m.unit || ''}
              </text>
              {m.aNote && (
                <text
                  x={aEnd + 8}
                  y={rowY + 49}
                  fontSize={11}
                  fontStyle="italic"
                  fill={AXIS}
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  ({m.aNote})
                </text>
              )}

              <rect
                x={PAD_L}
                y={rowY + 60}
                width={bFrac * barTrack}
                height={barH}
                fill={colorB}
                rx={2}
              />
              <text
                x={bEnd + 8}
                y={rowY + 74}
                fontSize={15}
                fontWeight={700}
                fill={DARK}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {fmtVal(m.b, m.format)}
                {m.unit || ''}
              </text>
              {m.bNote && (
                <text
                  x={bEnd + 8}
                  y={rowY + 89}
                  fontSize={11}
                  fontStyle="italic"
                  fill={AXIS}
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  ({m.bNote})
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
