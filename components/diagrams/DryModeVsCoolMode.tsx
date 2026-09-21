// Hand-authored SVG. Side-by-side comparison of AC cool mode vs dry mode.
// Core physics: same evaporator coil below dew point in both modes; the
// difference is fan speed. Cool mode = high-volume airflow, fast temperature
// drop, moderate humidity removal per cubic foot. Dry mode = low-volume
// airflow, maximizes air/coil contact time, high humidity removal per cubic
// foot, minimal temperature drop.

interface DryModeVsCoolModeProps {
  caption?: string;
}

const PRIMARY = '#0891B2';
const DARK = '#164E63';
const HOT = '#DC2626';
const COLD = '#2563EB';
const DROP = '#3B82F6';
const AXIS = '#374151';
const PANEL_BG = '#F9FAFB';
const FONT = 'Inter, system-ui, sans-serif';

function AirflowArrows({ startX, startY, count, spacing }: any) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <g key={i} transform={`translate(${startX}, ${startY + i * spacing})`}>
          <line x1={0} y1={0} x2={40} y2={0} stroke={COLD} strokeWidth={2.5} />
          <polygon points="40,-4 48,0 40,4" fill={COLD} />
        </g>
      ))}
    </g>
  );
}

function Droplet({ cx, cy, size = 6 }: any) {
  return (
    <path
      d={`M${cx},${cy - size} C${cx - size * 0.8},${cy - size * 0.3} ${cx - size * 0.8},${cy + size} ${cx},${cy + size} C${cx + size * 0.8},${cy + size} ${cx + size * 0.8},${cy - size * 0.3} ${cx},${cy - size} Z`}
      fill={DROP}
    />
  );
}

function CompressorGauge({ cx, cy, r, percent, label }: any) {
  const startAngle = Math.PI * 0.75;
  const endAngle = Math.PI * 0.25;
  const rangeAngle = 2 * Math.PI - (startAngle - endAngle);
  const currentAngle = startAngle + rangeAngle * (percent / 100);
  const arcX = cx + r * Math.cos(currentAngle);
  const arcY = cy + r * Math.sin(currentAngle);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke={DARK} strokeWidth={2} />
      <path
        d={`M ${cx + r * Math.cos(startAngle)} ${cy + r * Math.sin(startAngle)} A ${r} ${r} 0 1 1 ${cx + r * Math.cos(endAngle)} ${cy + r * Math.sin(endAngle)}`}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth={4}
      />
      <path
        d={`M ${cx + r * Math.cos(startAngle)} ${cy + r * Math.sin(startAngle)} A ${r} ${r} 0 ${rangeAngle * (percent / 100) > Math.PI ? 1 : 0} 1 ${arcX} ${arcY}`}
        fill="none"
        stroke={percent > 50 ? HOT : PRIMARY}
        strokeWidth={4}
      />
      <line x1={cx} y1={cy} x2={arcX} y2={arcY} stroke={DARK} strokeWidth={2} />
      <circle cx={cx} cy={cy} r={3} fill={DARK} />
      <text
        x={cx}
        y={cy + r + 16}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill={DARK}
        fontFamily={FONT}
      >
        {label}
      </text>
    </g>
  );
}

function Thermometer({ cx, cy, tempIn, tempOut, delta }: any) {
  return (
    <g>
      <rect
        x={cx - 22}
        y={cy - 42}
        width={44}
        height={100}
        rx={22}
        fill="#fff"
        stroke={DARK}
        strokeWidth={1.5}
      />
      <text
        x={cx}
        y={cy - 22}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill={HOT}
        fontFamily={FONT}
      >
        {tempIn}
      </text>
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fontSize={12}
        fill={AXIS}
        fontFamily={FONT}
      >
        ↓
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill={COLD}
        fontFamily={FONT}
      >
        {tempOut}
      </text>
      <text
        x={cx}
        y={cy + 40}
        textAnchor="middle"
        fontSize={11}
        fill={DARK}
        fontWeight={700}
        fontFamily={FONT}
      >
        {delta}
      </text>
    </g>
  );
}

export default function DryModeVsCoolMode({ caption }: DryModeVsCoolModeProps) {
  const title = 'AC Cool Mode vs Dry Mode | Same Coil, Different Airflow Strategy';
  const desc =
    'Side-by-side comparison of an air conditioner running in cool mode versus dry mode. Both modes cool the evaporator coil below the dew point so water vapor from the room air condenses on the coil, that is what removes moisture. ' +
    'The physical difference between the two modes is airflow rate. ' +
    'COOL MODE (left panel): the compressor runs at high capacity and the fan pushes a large volume of air across the cold coil. Temperature drops quickly, and humidity removal happens as a byproduct. ' +
    'DRY MODE (right panel): the compressor cycles at a low speed and the fan is held at its lowest setting, moving as little air across the coil as possible. This gives each bit of air more contact time with the cold coil, condensing out more moisture while the temperature barely changes. Because the compressor runs less than in cool mode, dry mode uses less power. Exact figures vary by unit, since manufacturers do not publish standardized specs for the mode. ' +
    'Analogy from the article: cool mode is a fire hose blasting cold air to knock down heat quickly; dry mode is a squeegee carefully removing moisture with less overall airflow. Both remove water, but dry mode is optimized for dehumidification without the temperature crash. Use cool mode when the room is genuinely hot; use dry mode when the room is a comfortable temperature but feels sticky.';

  return (
    <figure className="my-8 not-prose">
      <svg
        viewBox="0 0 800 600"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
      >
        <desc>{desc}</desc>

        <text
          x={400}
          y={26}
          textAnchor="middle"
          fontSize={19}
          fontWeight={700}
          fill={DARK}
          fontFamily={FONT}
        >
          Cool Mode vs Dry Mode, same coil, different airflow
        </text>

        <text
          x={200}
          y={60}
          textAnchor="middle"
          fontSize={17}
          fontWeight={700}
          fill={HOT}
          fontFamily={FONT}
        >
          COOL MODE
        </text>
        <rect
          x={40}
          y={72}
          width={320}
          height={300}
          fill={PANEL_BG}
          stroke={HOT}
          strokeWidth={2}
          rx={8}
        />

        <text
          x={600}
          y={60}
          textAnchor="middle"
          fontSize={17}
          fontWeight={700}
          fill={PRIMARY}
          fontFamily={FONT}
        >
          DRY MODE
        </text>
        <rect
          x={440}
          y={72}
          width={320}
          height={300}
          fill={PANEL_BG}
          stroke={PRIMARY}
          strokeWidth={2}
          rx={8}
        />

        <g>
          <rect x={60} y={92} width={80} height={30} fill={DARK} stroke={DARK} rx={2} />
          <text
            x={100}
            y={112}
            textAnchor="middle"
            fontSize={12}
            fill="#fff"
            fontFamily={FONT}
            fontWeight={700}
          >
            indoor unit
          </text>
          <AirflowArrows startX={144} startY={100} count={7} spacing={11} />
          <text
            x={200}
            y={92}
            textAnchor="middle"
            fontSize={11}
            fill={COLD}
            fontStyle="italic"
            fontFamily={FONT}
          >
            HIGH airflow (fan variable, high volume)
          </text>
          <Thermometer cx={230} cy={200} tempIn="Room" tempOut="Cooler" delta="Big temp drop" />
          <CompressorGauge cx={300} cy={135} r={22} percent={60} label="High / variable" />
          {Array.from({ length: 5 }, (_, i) => (
            <Droplet key={i} cx={310 + (i % 3) * 8} cy={280 + Math.floor(i / 3) * 12} size={5} />
          ))}
          <text
            x={330}
            y={295}
            fontSize={10}
            fill={COLD}
            fontFamily={FONT}
          >
            humidity out
          </text>
          <text
            x={330}
            y={308}
            fontSize={9}
            fill={AXIS}
            fontFamily={FONT}
            fontStyle="italic"
          >
            (moderate/CF)
          </text>
          <rect x={60} y={330} width={280} height={32} fill="#FEF2F2" stroke={HOT} strokeWidth={1} rx={4} />
          <foreignObject x={68} y={334} width={264} height={26}>
            <div
              {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
              style={{
                fontFamily: FONT,
                fontSize: 12,
                color: DARK,
                lineHeight: 1.25,
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              Compressor runs hard · higher power draw
            </div>
          </foreignObject>
        </g>

        <g>
          <rect x={460} y={92} width={80} height={30} fill={DARK} stroke={DARK} rx={2} />
          <text
            x={500}
            y={112}
            textAnchor="middle"
            fontSize={12}
            fill="#fff"
            fontFamily={FONT}
            fontWeight={700}
          >
            indoor unit
          </text>
          <AirflowArrows startX={544} startY={110} count={2} spacing={20} />
          <text
            x={620}
            y={92}
            textAnchor="middle"
            fontSize={11}
            fill={COLD}
            fontStyle="italic"
            fontFamily={FONT}
          >
            LOW airflow (fan locked at min)
          </text>
          <Thermometer cx={620} cy={200} tempIn="Room" tempOut="≈ Same" delta="Barely changes" />
          <CompressorGauge cx={710} cy={135} r={22} percent={15} label="Low / cycling" />
          {Array.from({ length: 9 }, (_, i) => (
            <Droplet key={i} cx={700 + (i % 3) * 8} cy={270 + Math.floor(i / 3) * 10} size={5} />
          ))}
          <text
            x={720}
            y={310}
            fontSize={10}
            fill={COLD}
            fontFamily={FONT}
          >
            humidity out
          </text>
          <text
            x={720}
            y={323}
            fontSize={9}
            fill={AXIS}
            fontFamily={FONT}
            fontStyle="italic"
          >
            (high/CF)
          </text>
          <rect x={460} y={330} width={280} height={32} fill="#EFF6FF" stroke={PRIMARY} strokeWidth={1} rx={4} />
          <foreignObject x={468} y={334} width={264} height={26}>
            <div
              {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
              style={{
                fontFamily: FONT,
                fontSize: 12,
                color: DARK,
                lineHeight: 1.25,
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              Compressor cycles low · lower power draw
            </div>
          </foreignObject>
        </g>

        <g transform="translate(40, 396)">
          <rect x={0} y={0} width={720} height={92} fill="#F0FDFA" stroke={PRIMARY} strokeWidth={1.5} rx={6} />
          <foreignObject x={12} y={6} width={696} height={82}>
            <div
              {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
              style={{
                fontFamily: FONT,
                fontSize: 12,
                color: DARK,
                lineHeight: 1.4,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Same coil in both modes, the trick is airflow rate</div>
              <div>
                Both modes cool the evaporator coil below the dew point; that's what condenses water out of room air. Cool mode = <strong>fire hose</strong>, high fan speed, high air volume, fast temperature drop. Dry mode = <strong>squeegee</strong>, low fan speed maximizes air-coil contact time, wringing out more moisture per cubic foot of air processed. Article physics: line 45.
              </div>
            </div>
          </foreignObject>
        </g>

        <g transform="translate(40, 508)">
          <rect x={0} y={0} width={720} height={72} fill="#FEF9C3" stroke="#CA8A04" strokeWidth={1} rx={6} />
          <foreignObject x={12} y={6} width={696} height={62}>
            <div
              {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
              style={{
                fontFamily: FONT,
                fontSize: 12,
                color: DARK,
                lineHeight: 1.4,
              }}
            >
              <strong>When to use which:</strong> COOL mode when the room is genuinely hot (and humid). DRY mode when the room is a comfortable temperature but feels sticky or muggy. Dry mode takes the edge off humidity but removes moisture slowly and cannot cool a hot room, for a serious moisture problem, use a dehumidifier.
            </div>
          </foreignObject>
        </g>
      </svg>
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
