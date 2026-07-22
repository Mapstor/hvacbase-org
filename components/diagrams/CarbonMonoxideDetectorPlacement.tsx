// Hand-authored SVG. 2-story home cross-section showing CO detector placement.
// Physics correctness is CRITICAL — CO has molecular weight 28 vs air's ~29,
// so CO does NOT rise. Ceiling placement is preferred because the warm
// combustion plume carries CO up initially + alarm audibility, not floatation.

interface CarbonMonoxideDetectorPlacementProps {
  caption?: string;
}

const PRIMARY = '#0891B2';
const DARK = '#164E63';
const REQUIRED = '#059669';
const AVOID = '#DC2626';
const WALL = '#4B5563';
const ROOM = '#F9FAFB';
const BASEMENT = '#F1F5F9';
const GARAGE = '#FEF3C7';
const AXIS = '#374151';
const FONT = 'Inter, system-ui, sans-serif';

function CoIcon({ cx, cy, r = 14, color = REQUIRED }: any) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={color} stroke="#fff" strokeWidth={2} />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill="#fff"
        fontFamily={FONT}
      >
        CO
      </text>
    </g>
  );
}

function AvoidIcon({ cx, cy, r = 12 }: any) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke={AVOID} strokeWidth={2.5} />
      <line x1={cx - 6} y1={cy - 6} x2={cx + 6} y2={cy + 6} stroke={AVOID} strokeWidth={2.5} />
      <line x1={cx - 6} y1={cy + 6} x2={cx + 6} y2={cy - 6} stroke={AVOID} strokeWidth={2.5} />
    </g>
  );
}

export default function CarbonMonoxideDetectorPlacement({
  caption,
}: CarbonMonoxideDetectorPlacementProps) {
  const title = 'CO Detector Placement — 2-Story, 3-Bedroom Home';
  const desc =
    'Cross-section of a typical two-story, three-bedroom home showing where carbon monoxide (CO) detectors should be installed and where they should not, per NFPA 720. ' +
    'REQUIRED per code: one detector on every habitable level (basement, main floor, upstairs) and one within 10 feet of each bedroom door (shown in the upstairs hallway). ' +
    'HIGH-VALUE additions: within 10 feet of the attached garage entry door on the main floor; within 15 feet of the furnace and near the gas water heater in the basement. ' +
    'MODERATE-VALUE: in the kitchen, but at least 10 feet from any gas cooking appliance. ' +
    'AVOID zones (red X markers): inside the garage (extreme temperatures and vehicle exhaust cause constant false alarms — place just inside the house near the entry instead), inside bathrooms (humidity damages sensors), within 5 feet of gas cooking appliances (normal cooking causes brief CO spikes that trigger nuisance alarms), near windows or HVAC vents (drafts dilute CO at the sensor before detection), and at floor level (slower response, not a floatation issue). ' +
    'MOUNTING PHYSICS — critical safety point: CO has a molecular weight of 28, essentially identical to air (average molecular weight 29). CO does NOT rise or sink through a room — it mixes thoroughly with room air through thermal convection. ' +
    'Ceiling placement is preferred not because CO "floats," but for two other reasons: (1) the warm convective plume from a combustion source (furnace, water heater, stove, running vehicle) initially carries CO upward before it mixes with room air, so ceiling-mounted detectors register the plume first; and (2) alarm audibility carries farther from a ceiling-mounted unit, which is critical for waking sleeping occupants. ' +
    'High-wall mounting within 12 inches of the ceiling is nearly as effective as ceiling placement. Any height is acceptable per UL 2034 — floor level is discouraged solely due to slightly slower response, not because CO stays elevated.';

  return (
    <figure className="my-8 not-prose">
      <svg
        viewBox="0 0 800 820"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
      >
        <title>{title}</title>
        <desc>{desc}</desc>

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

        <polygon points="80,110 400,50 720,110" fill={DARK} />

        <rect x={80} y={110} width={640} height={170} fill={ROOM} stroke={WALL} strokeWidth={2.5} />
        <text
          x={92}
          y={132}
          fontSize={13}
          fontWeight={700}
          fill={DARK}
          fontStyle="italic"
          fontFamily={FONT}
        >
          UPSTAIRS
        </text>

        <line x1={240} y1={110} x2={240} y2={240} stroke={WALL} strokeWidth={1.5} />
        <line x1={400} y1={110} x2={400} y2={240} stroke={WALL} strokeWidth={1.5} />
        <line x1={560} y1={110} x2={560} y2={240} stroke={WALL} strokeWidth={1.5} />
        <line x1={80} y1={240} x2={720} y2={240} stroke={WALL} strokeWidth={1.5} strokeDasharray="4 4" />
        <text x={160} y={185} textAnchor="middle" fontSize={13} fill={AXIS} fontFamily={FONT}>
          Bedroom 1
        </text>
        <text x={320} y={185} textAnchor="middle" fontSize={13} fill={AXIS} fontFamily={FONT}>
          Bedroom 2
        </text>
        <text x={480} y={185} textAnchor="middle" fontSize={13} fill={AXIS} fontFamily={FONT}>
          Bedroom 3
        </text>
        <text x={640} y={175} textAnchor="middle" fontSize={12} fill={AXIS} fontFamily={FONT}>
          Bathroom
        </text>
        <text
          x={640}
          y={192}
          textAnchor="middle"
          fontSize={10}
          fill={AXIS}
          fontStyle="italic"
          fontFamily={FONT}
        >
          (humidity)
        </text>
        <text x={140} y={262} textAnchor="middle" fontSize={11} fill={AXIS} fontStyle="italic" fontFamily={FONT}>
          Hallway
        </text>

        <CoIcon cx={260} cy={258} />
        <foreignObject x={290} y={244} width={420} height={40}>
          <div
            {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
            style={{
              fontFamily: FONT,
              fontSize: 12,
              color: REQUIRED,
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            REQUIRED — within 10 ft of each bedroom door
          </div>
        </foreignObject>

        <AvoidIcon cx={640} cy={148} />
        <text x={664} y={152} fontSize={11} fill={AVOID} fontWeight={600} fontFamily={FONT}>
          not in bathroom
        </text>

        <rect x={80} y={290} width={520} height={170} fill={ROOM} stroke={WALL} strokeWidth={2.5} />
        <rect
          x={600}
          y={290}
          width={120}
          height={170}
          fill={GARAGE}
          stroke={WALL}
          strokeWidth={2.5}
        />
        <text
          x={92}
          y={312}
          fontSize={13}
          fontWeight={700}
          fill={DARK}
          fontStyle="italic"
          fontFamily={FONT}
        >
          MAIN FLOOR
        </text>
        <text
          x={660}
          y={312}
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          fill={DARK}
          fontStyle="italic"
          fontFamily={FONT}
        >
          GARAGE
        </text>

        <line x1={280} y1={290} x2={280} y2={460} stroke={WALL} strokeWidth={1.5} />
        <line x1={440} y1={290} x2={440} y2={460} stroke={WALL} strokeWidth={1.5} />
        <rect x={597} y={370} width={6} height={40} fill="#fff" stroke={WALL} strokeWidth={1} />
        <text x={600} y={430} textAnchor="middle" fontSize={9} fill={AXIS} fontFamily={FONT}>
          entry
        </text>

        <text x={180} y={335} textAnchor="middle" fontSize={13} fill={AXIS} fontStyle="italic" fontFamily={FONT}>
          Living
        </text>
        <text x={360} y={335} textAnchor="middle" fontSize={13} fill={AXIS} fontStyle="italic" fontFamily={FONT}>
          Kitchen
        </text>
        <text x={520} y={442} textAnchor="middle" fontSize={12} fill={AXIS} fontStyle="italic" fontFamily={FONT}>
          Utility
        </text>
        <rect x={340} y={385} width={40} height={20} fill="#E5E7EB" stroke={WALL} strokeWidth={1} />
        <text x={360} y={399} textAnchor="middle" fontSize={9} fill={AXIS} fontFamily={FONT}>
          gas stove
        </text>

        <CoIcon cx={540} cy={325} />
        <foreignObject x={452} y={340} width={144} height={40}>
          <div
            {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
            style={{
              fontFamily: FONT,
              fontSize: 11,
              color: REQUIRED,
              fontWeight: 700,
              lineHeight: 1.25,
              textAlign: 'center',
            }}
          >
            HIGH — within 10 ft
            <br />
            of garage entry
          </div>
        </foreignObject>

        <AvoidIcon cx={360} cy={425} />
        <text
          x={360}
          y={452}
          textAnchor="middle"
          fontSize={10}
          fill={AVOID}
          fontWeight={600}
          fontFamily={FONT}
        >
          not within 5 ft of stove
        </text>

        <AvoidIcon cx={660} cy={425} />
        <text
          x={660}
          y={452}
          textAnchor="middle"
          fontSize={10}
          fill={AVOID}
          fontWeight={600}
          fontFamily={FONT}
        >
          not inside garage
        </text>

        <rect
          x={80}
          y={470}
          width={640}
          height={150}
          fill={BASEMENT}
          stroke={WALL}
          strokeWidth={2.5}
          strokeDasharray="6 3"
        />
        <text
          x={92}
          y={492}
          fontSize={13}
          fontWeight={700}
          fill={DARK}
          fontStyle="italic"
          fontFamily={FONT}
        >
          BASEMENT (below grade)
        </text>

        <rect x={200} y={520} width={80} height={70} fill="#DBEAFE" stroke={DARK} strokeWidth={1.5} />
        <text
          x={240}
          y={545}
          textAnchor="middle"
          fontSize={11}
          fontWeight={700}
          fill={DARK}
          fontFamily={FONT}
        >
          Furnace
        </text>
        <text x={240} y={562} textAnchor="middle" fontSize={9} fill={AXIS} fontFamily={FONT}>
          (gas/oil)
        </text>

        <rect x={340} y={520} width={80} height={70} fill="#DBEAFE" stroke={DARK} strokeWidth={1.5} />
        <text
          x={380}
          y={545}
          textAnchor="middle"
          fontSize={11}
          fontWeight={700}
          fill={DARK}
          fontFamily={FONT}
        >
          Water
        </text>
        <text
          x={380}
          y={562}
          textAnchor="middle"
          fontSize={11}
          fontWeight={700}
          fill={DARK}
          fontFamily={FONT}
        >
          heater
        </text>

        <CoIcon cx={310} cy={506} />
        <foreignObject x={342} y={488} width={370} height={40}>
          <div
            {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
            style={{
              fontFamily: FONT,
              fontSize: 12,
              color: REQUIRED,
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            REQUIRED (basement) + HIGH — within 15 ft of furnace &amp; near water heater
          </div>
        </foreignObject>

        <AvoidIcon cx={520} cy={605} />
        <text
          x={540}
          y={610}
          fontSize={11}
          fill={AVOID}
          fontWeight={600}
          fontFamily={FONT}
        >
          not at floor level (slower response)
        </text>

        <g transform="translate(40, 640)">
          <rect x={0} y={0} width={720} height={64} fill="#EFF6FF" stroke={PRIMARY} strokeWidth={1.5} rx={6} />
          <foreignObject x={12} y={6} width={696} height={54}>
            <div
              {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
              style={{
                fontFamily: FONT,
                fontSize: 12,
                color: DARK,
                lineHeight: 1.4,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 3 }}>
                Mounting-height physics — often misstated:
              </div>
              <div>
                CO has molecular weight 28, essentially identical to air (~29). CO does <strong>not</strong> rise or sink — it mixes with room air. Ceiling placement is preferred because (1) the warm combustion plume initially carries CO upward before it mixes, and (2) alarm audibility carries farther from a ceiling unit — critical for waking sleeping occupants. <strong>Not</strong> because CO floats.
              </div>
            </div>
          </foreignObject>
        </g>

        <g transform="translate(40, 720)">
          <rect x={0} y={0} width={720} height={78} fill="#F0FDFA" stroke={PRIMARY} strokeWidth={1} rx={6} />
          <foreignObject x={12} y={6} width={696} height={68}>
            <div
              {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
              style={{
                fontFamily: FONT,
                fontSize: 12,
                color: DARK,
                lineHeight: 1.5,
              }}
            >
              <span style={{ fontWeight: 700, color: REQUIRED }}>●</span>{' '}
              <strong>Green CO</strong>: required or high-value placement.{'  '}
              <span style={{ fontWeight: 700, color: AVOID }}>⊘</span>{' '}
              <strong>Red X</strong>: avoid.{' '}
              Minimum for this layout = 3 detectors (one per level); recommended = 4-5 (add garage-entry + near-furnace). Interconnected detectors (one triggers all) provide the best protection for sleeping occupants.
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

