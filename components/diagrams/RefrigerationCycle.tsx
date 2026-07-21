// Hand-authored SVG diagram of the vapor-compression refrigeration cycle.
// Server component — no state, no props beyond optional caption.
//
// Correct physical flow (counter-clockwise from bottom-left):
//   1. Evaporator (indoor)   → 2. Compressor (outdoor)     [low-P cool gas]
//   2. Compressor            → 3. Condenser (outdoor)       [high-P hot gas]
//   3. Condenser             → 4. Expansion valve (indoor)  [high-P warm liquid]
//   4. Expansion valve       → 1. Evaporator                [low-P cold liquid/vapor mix]
//
// Common residential refrigerants that follow this cycle: R-410A, R-32, R-454B.
// All internal text uses foreignObject with HTML wrapping so labels can never
// overflow their container regardless of length or breakpoint.

interface RefrigerationCycleProps {
  caption?: string;
}

const PRIMARY = '#0891B2';
const DARK = '#164E63';
const HOT = '#DC2626';
const HOT_BG = '#FEF2F2';
const COLD = '#2563EB';
const COLD_BG = '#EFF6FF';
const AXIS = '#374151';

const FONT = 'Inter, system-ui, sans-serif';

function BoxLabel({
  number,
  name,
  role,
  outputLabel,
  outputColor,
}: {
  number: number;
  name: string;
  role: string;
  outputLabel: string;
  outputColor: string;
}) {
  return (
    <div
      {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
      style={{
        fontFamily: FONT,
        color: DARK,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8px 12px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, lineHeight: 1.2 }}>
        {number}. {name}
      </div>
      <div style={{ fontSize: 13, color: AXIS, marginBottom: 6, lineHeight: 1.3 }}>{role}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: outputColor, lineHeight: 1.3 }}>
        output: {outputLabel}
      </div>
    </div>
  );
}

export default function RefrigerationCycle({ caption }: RefrigerationCycleProps) {
  const title = 'Vapor-Compression Refrigeration Cycle';
  const desc =
    'A closed loop showing the four stages of vapor-compression refrigeration in the physical order the refrigerant flows: ' +
    '(1) the evaporator coil (indoor, bottom-left) absorbs heat from indoor air, evaporating the low-pressure refrigerant into a cool gas. ' +
    '(2) The compressor (outdoor, bottom-right) then pressurizes that gas into a high-pressure, high-temperature gas. ' +
    '(3) The condenser coil (outdoor, top-right) releases the absorbed heat to outdoor air, condensing the refrigerant into a high-pressure warm liquid. ' +
    '(4) The expansion valve (indoor, top-left) drops the pressure sharply, cooling the refrigerant back into a low-pressure cold liquid/vapor mixture, which returns to the evaporator to repeat the cycle. ' +
    'Common residential refrigerants following this cycle: R-410A (phase-down 2023+, GWP 2088), R-32 (single-component, GWP 675), R-454B (R-410A successor for 2025+ equipment, GWP 466).';

  return (
    <figure className="my-8 not-prose">
      <svg
        viewBox="0 0 800 600"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
      >
        <title>{title}</title>
        <desc>{desc}</desc>

        <defs>
          <marker
            id="rc-arrow-hot"
            viewBox="0 0 12 12"
            refX="10"
            refY="6"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <path d="M0,0 L12,6 L0,12 z" fill={HOT} />
          </marker>
          <marker
            id="rc-arrow-cold"
            viewBox="0 0 12 12"
            refX="10"
            refY="6"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <path d="M0,0 L12,6 L0,12 z" fill={COLD} />
          </marker>
        </defs>

        <text
          x={400}
          y={26}
          textAnchor="middle"
          fontSize={20}
          fontWeight={700}
          fill={DARK}
          fontFamily={FONT}
        >
          {title}
        </text>

        <text
          x={200}
          y={72}
          textAnchor="middle"
          fontSize={14}
          fontStyle="italic"
          fill={AXIS}
          fontFamily={FONT}
        >
          INDOOR
        </text>
        <text
          x={600}
          y={72}
          textAnchor="middle"
          fontSize={14}
          fontStyle="italic"
          fill={AXIS}
          fontFamily={FONT}
        >
          OUTDOOR
        </text>
        <line
          x1={400}
          x2={400}
          y1={82}
          y2={470}
          stroke={AXIS}
          strokeWidth={1.5}
          strokeDasharray="6 6"
        />

        <rect
          x={80}
          y={90}
          width={240}
          height={130}
          rx={10}
          fill={COLD_BG}
          stroke={COLD}
          strokeWidth={2}
        />
        <foreignObject x={80} y={90} width={240} height={130}>
          <BoxLabel
            number={4}
            name="Expansion Valve"
            role="Sudden pressure drop cools the refrigerant"
            outputLabel="low-pressure cold liquid/vapor mix"
            outputColor={COLD}
          />
        </foreignObject>

        <rect
          x={480}
          y={90}
          width={240}
          height={130}
          rx={10}
          fill={HOT_BG}
          stroke={HOT}
          strokeWidth={2}
        />
        <foreignObject x={480} y={90} width={240} height={130}>
          <BoxLabel
            number={3}
            name="Condenser Coil"
            role="Releases absorbed heat to outdoor air"
            outputLabel="high-pressure warm liquid"
            outputColor={HOT}
          />
        </foreignObject>

        <rect
          x={80}
          y={340}
          width={240}
          height={130}
          rx={10}
          fill={COLD_BG}
          stroke={COLD}
          strokeWidth={2}
        />
        <foreignObject x={80} y={340} width={240} height={130}>
          <BoxLabel
            number={1}
            name="Evaporator Coil"
            role="Absorbs heat from indoor air"
            outputLabel="low-pressure cool gas"
            outputColor={COLD}
          />
        </foreignObject>

        <rect
          x={480}
          y={340}
          width={240}
          height={130}
          rx={10}
          fill={HOT_BG}
          stroke={HOT}
          strokeWidth={2}
        />
        <foreignObject x={480} y={340} width={240} height={130}>
          <BoxLabel
            number={2}
            name="Compressor"
            role="Pressurizes vapor, raising pressure and temperature"
            outputLabel="high-pressure hot gas"
            outputColor={HOT}
          />
        </foreignObject>

        {/* 1 → 2 : bottom, going RIGHT (Evaporator → Compressor), COLD */}
        <line
          x1={324}
          y1={405}
          x2={476}
          y2={405}
          stroke={COLD}
          strokeWidth={3}
          markerEnd="url(#rc-arrow-cold)"
        />
        <text
          x={400}
          y={430}
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={COLD}
          fontFamily={FONT}
        >
          low-pressure cool gas
        </text>

        {/* 2 → 3 : right side, going UP (Compressor → Condenser), HOT */}
        <line
          x1={600}
          y1={336}
          x2={600}
          y2={224}
          stroke={HOT}
          strokeWidth={3}
          markerEnd="url(#rc-arrow-hot)"
        />
        <text
          x={620}
          y={276}
          fontSize={13}
          fontWeight={700}
          fill={HOT}
          fontFamily={FONT}
        >
          high-pressure
        </text>
        <text
          x={620}
          y={294}
          fontSize={13}
          fontWeight={700}
          fill={HOT}
          fontFamily={FONT}
        >
          hot gas
        </text>

        {/* 3 → 4 : top, going LEFT (Condenser → Expansion Valve), HOT (still warm high-P side) */}
        <line
          x1={476}
          y1={155}
          x2={324}
          y2={155}
          stroke={HOT}
          strokeWidth={3}
          markerEnd="url(#rc-arrow-hot)"
        />
        <text
          x={400}
          y={140}
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={HOT}
          fontFamily={FONT}
        >
          high-pressure warm liquid
        </text>

        {/* 4 → 1 : left side, going DOWN (Expansion Valve → Evaporator), COLD */}
        <line
          x1={200}
          y1={224}
          x2={200}
          y2={336}
          stroke={COLD}
          strokeWidth={3}
          markerEnd="url(#rc-arrow-cold)"
        />
        <text
          x={100}
          y={276}
          fontSize={13}
          fontWeight={700}
          fill={COLD}
          fontFamily={FONT}
        >
          low-pressure
        </text>
        <text
          x={100}
          y={294}
          fontSize={13}
          fontWeight={700}
          fill={COLD}
          fontFamily={FONT}
        >
          cold mix
        </text>

        <foreignObject x={80} y={498} width={640} height={90}>
          <div
            {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
            style={{
              fontFamily: FONT,
              color: DARK,
              background: '#F0FDFA',
              border: `1px solid ${PRIMARY}`,
              borderRadius: 6,
              padding: '10px 14px',
              boxSizing: 'border-box',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>
              Common residential refrigerants following this cycle:
            </div>
            <div style={{ fontSize: 12, color: AXIS, lineHeight: 1.5 }}>
              <strong style={{ color: DARK }}>R-410A</strong> (phase-down 2023+, GWP 2088) ·{' '}
              <strong style={{ color: DARK }}>R-32</strong> (single-component, GWP 675) ·{' '}
              <strong style={{ color: DARK }}>R-454B</strong> (R-410A successor, GWP 466)
            </div>
          </div>
        </foreignObject>
      </svg>
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
