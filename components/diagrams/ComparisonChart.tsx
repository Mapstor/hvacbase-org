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
  const rowH = 78;
  const headH = 74;
  const footH = 44;
  const H = headH + metrics.length * rowH + footH;
  const PAD_L = 200;
  const PAD_R = 120;
  const barTrack = W - PAD_L - PAD_R;

  return (
    <figure className="my-8 not-prose">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
      >
        <title>{title}</title>
        <desc>{desc}</desc>

        <text
          x={16}
          y={24}
          fontSize={17}
          fontWeight={700}
          fill={DARK}
          fontFamily="Inter, system-ui, sans-serif"
        >
          {title}
        </text>

        <g transform={`translate(0, 44)`}>
          <rect x={PAD_L} y={0} width={12} height={12} fill={colorA} />
          <text
            x={PAD_L + 18}
            y={11}
            fontSize={13}
            fill={AXIS}
            fontFamily="Inter, system-ui, sans-serif"
          >
            {optionA.name}
          </text>
          <rect x={PAD_L + 160} y={0} width={12} height={12} fill={colorB} />
          <text
            x={PAD_L + 178}
            y={11}
            fontSize={13}
            fill={AXIS}
            fontFamily="Inter, system-ui, sans-serif"
          >
            {optionB.name}
          </text>
        </g>

        {metrics.map((m, i) => {
          const rowY = headH + i * rowH;
          const rowMax = Math.max(m.a, m.b);
          const aFrac = rowMax > 0 ? m.a / rowMax : 0;
          const bFrac = rowMax > 0 ? m.b / rowMax : 0;
          const barH = 20;

          return (
            <g key={`m-${i}`}>
              <text
                x={PAD_L - 12}
                y={rowY + 34}
                textAnchor="end"
                fontSize={14}
                fontWeight={600}
                fill={DARK}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {m.label}
              </text>

              <line
                x1={PAD_L}
                x2={PAD_L + barTrack}
                y1={rowY + 66}
                y2={rowY + 66}
                stroke={GRID}
                strokeWidth={1}
              />

              <rect
                x={PAD_L}
                y={rowY + 14}
                width={aFrac * barTrack}
                height={barH}
                fill={colorA}
                rx={2}
              />
              <text
                x={PAD_L + aFrac * barTrack + 8}
                y={rowY + 28}
                fontSize={13}
                fontWeight={600}
                fill={DARK}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {fmtVal(m.a, m.format)}
                {m.unit || ''}
                {m.aNote ? ` (${m.aNote})` : ''}
              </text>

              <rect
                x={PAD_L}
                y={rowY + 40}
                width={bFrac * barTrack}
                height={barH}
                fill={colorB}
                rx={2}
              />
              <text
                x={PAD_L + bFrac * barTrack + 8}
                y={rowY + 54}
                fontSize={13}
                fontWeight={600}
                fill={DARK}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {fmtVal(m.b, m.format)}
                {m.unit || ''}
                {m.bNote ? ` (${m.bNote})` : ''}
              </text>
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
