// Server-rendered SVG categorical bar chart — one bar per label.

interface Datum {
  label: string;
  value: number;
  note?: string;
  color?: string;
}

interface DataChartProps {
  data: Datum[];
  title: string;
  desc: string;
  yLabel?: string;
  unit?: string;
  format?: 'currency' | 'number' | 'percent';
  caption?: string;
}

const PRIMARY = '#0891B2';
const DARK = '#164E63';
const AXIS = '#6B7280';
const GRID = '#E5E7EB';

function fmt(v: number, format?: string): string {
  if (format === 'currency') {
    if (v >= 1000) return `$${v.toLocaleString('en-US')}`;
    return `$${v}`;
  }
  if (format === 'percent') return `${v}%`;
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

export default function DataChart({
  data,
  title,
  desc,
  yLabel,
  unit = '',
  format,
  caption,
}: DataChartProps) {
  if (!data || data.length === 0) return null;

  const W = 800;
  const H = 460;
  const PAD_L = 96;
  const PAD_R = 32;
  const PAD_T = 48;
  const PAD_B = 108;
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;

  const maxV = Math.max(...data.map((d) => d.value));
  const yMax = maxV * 1.15 || 1;
  const yTicks = 5;

  const barGap = 20;
  const barW = (plotW - barGap * (data.length + 1)) / data.length;

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
          x={PAD_L}
          y={26}
          fontSize={17}
          fontWeight={700}
          fill={DARK}
          fontFamily="Inter, system-ui, sans-serif"
        >
          {title}
        </text>

        {Array.from({ length: yTicks + 1 }, (_, i) => {
          const y = PAD_T + (plotH * i) / yTicks;
          const val = yMax - (yMax * i) / yTicks;
          return (
            <g key={`g-${i}`}>
              <line x1={PAD_L} x2={PAD_L + plotW} y1={y} y2={y} stroke={GRID} strokeWidth={1} />
              <text
                x={PAD_L - 10}
                y={y + 5}
                textAnchor="end"
                fontSize={13}
                fill={AXIS}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {fmt(Math.round(val), format)}
                {unit}
              </text>
            </g>
          );
        })}

        <line
          x1={PAD_L}
          x2={PAD_L}
          y1={PAD_T}
          y2={PAD_T + plotH}
          stroke={AXIS}
          strokeWidth={1.5}
        />
        <line
          x1={PAD_L}
          x2={PAD_L + plotW}
          y1={PAD_T + plotH}
          y2={PAD_T + plotH}
          stroke={AXIS}
          strokeWidth={1.5}
        />

        {data.map((d, i) => {
          const x = PAD_L + barGap + i * (barW + barGap);
          const h = (d.value / yMax) * plotH;
          const y = PAD_T + plotH - h;
          const color = d.color || PRIMARY;
          return (
            <g key={`b-${i}`}>
              <rect x={x} y={y} width={barW} height={h} fill={color} rx={2} />
              <text
                x={x + barW / 2}
                y={y - 8}
                textAnchor="middle"
                fontSize={14}
                fontWeight={700}
                fill={DARK}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {fmt(d.value, format)}
                {unit}
              </text>

              <foreignObject
                x={x - barGap / 2}
                y={PAD_T + plotH + 8}
                width={barW + barGap}
                height={PAD_B - 20}
              >
                <div
                  {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: 12,
                    color: DARK,
                    lineHeight: 1.3,
                    textAlign: 'center',
                    padding: '0 4px',
                    fontWeight: 600,
                  }}
                >
                  {d.label}
                  {d.note && (
                    <div style={{ fontWeight: 400, color: AXIS, marginTop: 2, fontSize: 11 }}>
                      {d.note}
                    </div>
                  )}
                </div>
              </foreignObject>
            </g>
          );
        })}

        {yLabel && (
          <text
            x={20}
            y={PAD_T + plotH / 2}
            textAnchor="middle"
            fontSize={14}
            fontWeight={600}
            fill={DARK}
            fontFamily="Inter, system-ui, sans-serif"
            transform={`rotate(-90, 20, ${PAD_T + plotH / 2})`}
          >
            {yLabel}
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
