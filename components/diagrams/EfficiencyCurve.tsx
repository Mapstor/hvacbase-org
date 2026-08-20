// Server-rendered SVG. No 'use client'. No hooks. Pure props → SVG.
// Renders a line-plus-markers plot of x→y data (e.g. EER rating vs cost).

interface Point {
  x: number;
  y: number;
  label?: string;
}

interface EfficiencyCurveProps {
  data: Point[];
  xLabel: string;
  yLabel: string;
  title: string;
  desc: string;
  xUnit?: string;
  yUnit?: string;
  caption?: string;
}

const PRIMARY = '#0891B2';
const DARK = '#164E63';
const AXIS = '#6B7280';
const GRID = '#E5E7EB';
const BG = '#F9FAFB';

function fmt(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(1);
}

// Round `value` up to a "nice" ceiling — 1/2/5 × 10ⁿ — so axis ticks land on
// clean numbers and the data doesn't crowd the top of the plot.
function niceCeil(value: number): number {
  if (value <= 0) return 1;
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  const normalized = value / magnitude;
  let niceStep: number;
  if (normalized <= 1) niceStep = 1;
  else if (normalized <= 2) niceStep = 2;
  else if (normalized <= 5) niceStep = 5;
  else niceStep = 10;
  return niceStep * magnitude;
}

export default function EfficiencyCurve({
  data,
  xLabel,
  yLabel,
  title,
  desc,
  xUnit = '',
  yUnit = '',
  caption,
}: EfficiencyCurveProps) {
  if (!data || data.length < 2) return null;

  const W = 800;
  const H = 420;
  const PAD_L = 84;
  const PAD_R = 32;
  const PAD_T = 44;
  const PAD_B = 68;
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;

  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = 0;
  // Give the highest data point ≥15% headroom, then round to a nice ceiling
  // so the top point sits well below the top tick and its label can't collide
  // with the axis label.
  const yMax = niceCeil(Math.max(...ys) * 1.15);

  const sx = (x: number) => PAD_L + ((x - xMin) / (xMax - xMin || 1)) * plotW;
  const sy = (y: number) => PAD_T + plotH - ((y - yMin) / (yMax - yMin || 1)) * plotH;

  const yTicks = 5;
  const xTicks = data.length;

  const path = data.map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(p.x)},${sy(p.y)}`).join(' ');

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

        <rect x={PAD_L} y={PAD_T} width={plotW} height={plotH} fill={BG} />

        {Array.from({ length: yTicks + 1 }, (_, i) => {
          const y = PAD_T + (plotH * i) / yTicks;
          const val = yMax - ((yMax - yMin) * i) / yTicks;
          return (
            <g key={`yg-${i}`}>
              <line x1={PAD_L} x2={PAD_L + plotW} y1={y} y2={y} stroke={GRID} strokeWidth={1} />
              <text
                x={PAD_L - 10}
                y={y + 5}
                textAnchor="end"
                fontSize={14}
                fill={AXIS}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {yUnit === '$' ? `$${fmt(val)}` : `${fmt(val)}${yUnit}`}
              </text>
            </g>
          );
        })}

        {data.map((p, i) => {
          const x = sx(p.x);
          // Edge x-tick labels use "start"/"end" so they don't overlap the
          // y-tick gutter (leftmost) or extend past the plot's right margin
          // (rightmost). Middle ticks stay centered.
          const anchor =
            i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle';
          return (
            <g key={`xg-${i}`}>
              <line
                x1={x}
                x2={x}
                y1={PAD_T + plotH}
                y2={PAD_T + plotH + 6}
                stroke={AXIS}
                strokeWidth={1}
              />
              <text
                x={x}
                y={PAD_T + plotH + 24}
                textAnchor={anchor}
                fontSize={14}
                fill={AXIS}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {fmt(p.x)}
                {xUnit}
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

        <path d={path} fill="none" stroke={PRIMARY} strokeWidth={3} strokeLinejoin="round" />

        {data.map((p, i) => {
          // Edge data-point labels use "start"/"end" to avoid the leftmost
          // label extending into the y-tick gutter (where it would visually
          // overlap y-tick labels) and the rightmost label sliding past the
          // plot's right margin.
          const anchor =
            i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle';
          return (
            <g key={`pt-${i}`}>
              <circle cx={sx(p.x)} cy={sy(p.y)} r={6} fill={DARK} stroke="#fff" strokeWidth={2} />
              <text
                x={sx(p.x)}
                y={sy(p.y) - 14}
                textAnchor={anchor}
                fontSize={13}
                fontWeight={600}
                fill={DARK}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {yUnit === '$' ? `$${fmt(p.y)}` : `${fmt(p.y)}${yUnit}`}
              </text>
            </g>
          );
        })}

        <text
          x={PAD_L + plotW / 2}
          y={PAD_T + plotH + 56}
          textAnchor="middle"
          fontSize={15}
          fill={DARK}
          fontWeight={600}
          fontFamily="Inter, system-ui, sans-serif"
        >
          {xLabel}
        </text>

        <text
          x={20}
          y={PAD_T + plotH / 2}
          textAnchor="middle"
          fontSize={15}
          fill={DARK}
          fontWeight={600}
          fontFamily="Inter, system-ui, sans-serif"
          transform={`rotate(-90, 20, ${PAD_T + plotH / 2})`}
        >
          {yLabel}
        </text>

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
      </svg>
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
