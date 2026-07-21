// Hand-authored SVG diagram of the vapor-compression refrigeration cycle.
// Four stages arranged as a loop with flow arrows and phase labels.
// Server component — no state, no props needed beyond optional caption.
// Common refrigerants (R-410A, R-32, R-454B) all run through this same cycle.

interface RefrigerationCycleProps {
  caption?: string;
}

const PRIMARY = '#0891B2';
const DARK = '#164E63';
const HOT = '#DC2626';
const COLD = '#2563EB';
const AXIS = '#374151';
const LIGHT = '#F0F9FF';

export default function RefrigerationCycle({ caption }: RefrigerationCycleProps) {
  const title = 'Vapor-Compression Refrigeration Cycle';
  const desc =
    'A closed loop showing the four stages of vapor-compression refrigeration. ' +
    'The compressor (bottom-right, indoor unit) pressurizes low-pressure gaseous refrigerant into high-pressure hot gas. ' +
    'The condenser coil (top-right, outdoor unit) releases the absorbed heat to outdoor air, and the refrigerant condenses to a high-pressure warm liquid. ' +
    'The expansion valve (top-left) drops pressure sharply, cooling the refrigerant to a low-pressure liquid-vapor mixture. ' +
    'The evaporator coil (bottom-left, indoor unit) absorbs heat from indoor air, evaporating the refrigerant back to a low-pressure cool gas that returns to the compressor. ' +
    'Common residential refrigerants that follow this cycle include R-410A (being phased down), R-32 (single-component alternative), and R-454B (R-410A replacement in 2025+ equipment).';

  return (
    <figure className="my-8 not-prose">
      <svg
        viewBox="0 0 800 520"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
      >
        <title>{title}</title>
        <desc>{desc}</desc>

        <defs>
          <marker
            id="arrow-hot"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill={HOT} />
          </marker>
          <marker
            id="arrow-cold"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill={COLD} />
          </marker>
        </defs>

        <text
          x={400}
          y={24}
          textAnchor="middle"
          fontSize={18}
          fontWeight={700}
          fill={DARK}
          fontFamily="Inter, system-ui, sans-serif"
        >
          {title}
        </text>

        <text
          x={200}
          y={68}
          textAnchor="middle"
          fontSize={13}
          fontStyle="italic"
          fill={AXIS}
          fontFamily="Inter, system-ui, sans-serif"
        >
          INDOOR
        </text>
        <text
          x={600}
          y={68}
          textAnchor="middle"
          fontSize={13}
          fontStyle="italic"
          fill={AXIS}
          fontFamily="Inter, system-ui, sans-serif"
        >
          OUTDOOR
        </text>
        <line
          x1={400}
          x2={400}
          y1={80}
          y2={460}
          stroke={AXIS}
          strokeWidth={1.5}
          strokeDasharray="6 6"
        />

        <g>
          <rect x={80} y={90} width={240} height={110} rx={10} fill={LIGHT} stroke={COLD} strokeWidth={2} />
          <text x={200} y={122} textAnchor="middle" fontSize={16} fontWeight={700} fill={DARK} fontFamily="Inter, system-ui, sans-serif">
            1. Expansion Valve
          </text>
          <text x={200} y={148} textAnchor="middle" fontSize={13} fill={AXIS} fontFamily="Inter, system-ui, sans-serif">
            Pressure drop
          </text>
          <text x={200} y={172} textAnchor="middle" fontSize={12} fontWeight={600} fill={COLD} fontFamily="Inter, system-ui, sans-serif">
            → low-pressure
          </text>
          <text x={200} y={190} textAnchor="middle" fontSize={12} fontWeight={600} fill={COLD} fontFamily="Inter, system-ui, sans-serif">
            cold liquid/vapor mix
          </text>
        </g>

        <g>
          <rect x={480} y={90} width={240} height={110} rx={10} fill="#FEF2F2" stroke={HOT} strokeWidth={2} />
          <text x={600} y={122} textAnchor="middle" fontSize={16} fontWeight={700} fill={DARK} fontFamily="Inter, system-ui, sans-serif">
            4. Condenser Coil
          </text>
          <text x={600} y={148} textAnchor="middle" fontSize={13} fill={AXIS} fontFamily="Inter, system-ui, sans-serif">
            Releases heat outdoors
          </text>
          <text x={600} y={172} textAnchor="middle" fontSize={12} fontWeight={600} fill={HOT} fontFamily="Inter, system-ui, sans-serif">
            → high-pressure
          </text>
          <text x={600} y={190} textAnchor="middle" fontSize={12} fontWeight={600} fill={HOT} fontFamily="Inter, system-ui, sans-serif">
            hot liquid
          </text>
        </g>

        <g>
          <rect x={80} y={320} width={240} height={110} rx={10} fill={LIGHT} stroke={COLD} strokeWidth={2} />
          <text x={200} y={352} textAnchor="middle" fontSize={16} fontWeight={700} fill={DARK} fontFamily="Inter, system-ui, sans-serif">
            2. Evaporator Coil
          </text>
          <text x={200} y={378} textAnchor="middle" fontSize={13} fill={AXIS} fontFamily="Inter, system-ui, sans-serif">
            Absorbs heat indoors
          </text>
          <text x={200} y={402} textAnchor="middle" fontSize={12} fontWeight={600} fill={COLD} fontFamily="Inter, system-ui, sans-serif">
            → low-pressure
          </text>
          <text x={200} y={420} textAnchor="middle" fontSize={12} fontWeight={600} fill={COLD} fontFamily="Inter, system-ui, sans-serif">
            cool gas
          </text>
        </g>

        <g>
          <rect x={480} y={320} width={240} height={110} rx={10} fill="#FEF2F2" stroke={HOT} strokeWidth={2} />
          <text x={600} y={352} textAnchor="middle" fontSize={16} fontWeight={700} fill={DARK} fontFamily="Inter, system-ui, sans-serif">
            3. Compressor
          </text>
          <text x={600} y={378} textAnchor="middle" fontSize={13} fill={AXIS} fontFamily="Inter, system-ui, sans-serif">
            Raises pressure/temperature
          </text>
          <text x={600} y={402} textAnchor="middle" fontSize={12} fontWeight={600} fill={HOT} fontFamily="Inter, system-ui, sans-serif">
            → high-pressure
          </text>
          <text x={600} y={420} textAnchor="middle" fontSize={12} fontWeight={600} fill={HOT} fontFamily="Inter, system-ui, sans-serif">
            hot gas
          </text>
        </g>

        <line x1={320} y1={145} x2={480} y2={145} stroke={HOT} strokeWidth={2.5} markerStart="url(#arrow-hot)" />

        <line x1={600} y1={200} x2={600} y2={320} stroke={HOT} strokeWidth={2.5} markerEnd="url(#arrow-hot)" />
        <text x={620} y={264} fontSize={12} fontWeight={600} fill={HOT} fontFamily="Inter, system-ui, sans-serif">
          hot gas
        </text>
        <text x={620} y={280} fontSize={12} fill={AXIS} fontFamily="Inter, system-ui, sans-serif">
          → condenses
        </text>

        <line x1={480} y1={375} x2={320} y2={375} stroke={COLD} strokeWidth={2.5} markerEnd="url(#arrow-cold)" />

        <line x1={200} y1={320} x2={200} y2={200} stroke={COLD} strokeWidth={2.5} markerEnd="url(#arrow-cold)" />
        <text x={95} y={264} fontSize={12} fontWeight={600} fill={COLD} fontFamily="Inter, system-ui, sans-serif">
          cool gas
        </text>
        <text x={95} y={280} fontSize={12} fill={AXIS} fontFamily="Inter, system-ui, sans-serif">
          → repeats loop
        </text>

        <g transform="translate(80, 460)">
          <rect x={0} y={0} width={640} height={44} rx={6} fill="#F0FDFA" stroke={PRIMARY} strokeWidth={1} />
          <text x={12} y={22} fontSize={13} fontWeight={700} fill={DARK} fontFamily="Inter, system-ui, sans-serif">
            Common residential refrigerants using this cycle:
          </text>
          <text x={12} y={38} fontSize={12} fill={AXIS} fontFamily="Inter, system-ui, sans-serif">
            R-410A (phase-down 2023+, GWP 2088) · R-32 (single-component, GWP 675) · R-454B (R-410A successor, GWP 466)
          </text>
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
