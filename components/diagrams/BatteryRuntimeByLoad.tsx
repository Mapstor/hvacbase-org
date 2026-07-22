// Hand-authored SVG. Battery capacity → runtime by load-level scenario.
// Uses Tesla Powerwall 3 (13.5 kWh) as the reference battery per the
// article's headline example. Peak output caveat (11.5 kW continuous /
// 18.5 kW peak enables central-AC startup) is shown ON the diagram, not
// only in the caption.

interface BatteryRuntimeByLoadProps {
  caption?: string;
}

const PRIMARY = '#0891B2';
const DARK = '#164E63';
const ACCENT = '#67E8F9';
const WARN = '#F59E0B';
const WARN_BG = '#FEF3C7';
const AXIS = '#374151';
const PANEL_BG = '#F9FAFB';
const FONT = 'Inter, system-ui, sans-serif';

const MAX_HOURS = 60;

function BatteryIcon() {
  return (
    <g transform="translate(80, 68)">
      <rect x={0} y={0} width={640} height={80} rx={10} fill={PANEL_BG} stroke={DARK} strokeWidth={2} />
      <rect x={640} y={22} width={16} height={36} rx={2} fill={DARK} />

      {Array.from({ length: 10 }, (_, i) => (
        <rect
          key={i}
          x={12 + i * 62}
          y={10}
          width={58}
          height={60}
          fill={i < 9 ? PRIMARY : ACCENT}
          rx={2}
        />
      ))}

      <foreignObject x={16} y={12} width={620} height={56}>
        <div
          {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
          style={{
            fontFamily: FONT,
            color: '#fff',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.35)' }}>
            Tesla Powerwall 3 — 13.5 kWh usable capacity
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.35)', marginTop: 2 }}>
            11.5 kW continuous · 18.5 kW peak (enables central-AC compressor startup)
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

interface ScenarioRow {
  y: number;
  label: string;
  loads: string;
  dailyKwh: string;
  hoursLow: number;
  hoursHigh: number;
  articleQuote: string;
  derived?: string;
  color: string;
  bgColor: string;
}

function Scenario({ row }: { row: ScenarioRow }) {
  const {
    y,
    label,
    loads,
    dailyKwh,
    hoursLow,
    hoursHigh,
    articleQuote,
    derived,
    color,
    bgColor,
  } = row;

  const barX = 320;
  const barW = 400;
  const barY = y + 46;
  const barH = 20;

  const lowX = barX + (hoursLow / MAX_HOURS) * barW;
  const highX = barX + (hoursHigh / MAX_HOURS) * barW;

  return (
    <g>
      <foreignObject x={16} y={y} width={296} height={90}>
        <div
          {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
          style={{
            fontFamily: FONT,
            color: DARK,
            padding: '6px 8px',
            background: bgColor,
            border: `1px solid ${color}`,
            borderRadius: 6,
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>{label}</div>
          <div style={{ fontSize: 11, color: AXIS, marginTop: 3, lineHeight: 1.3 }}>{loads}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: color, marginTop: 4 }}>
            {dailyKwh}
          </div>
        </div>
      </foreignObject>

      <line x1={barX} y1={barY + barH / 2} x2={barX + barW} y2={barY + barH / 2} stroke="#E5E7EB" strokeWidth={1} />

      <rect x={lowX} y={barY} width={highX - lowX} height={barH} fill={color} rx={2} />
      <line
        x1={lowX}
        y1={barY - 4}
        x2={lowX}
        y2={barY + barH + 4}
        stroke={DARK}
        strokeWidth={1.5}
      />
      <line
        x1={highX}
        y1={barY - 4}
        x2={highX}
        y2={barY + barH + 4}
        stroke={DARK}
        strokeWidth={1.5}
      />
      <text
        x={(lowX + highX) / 2}
        y={barY - 6}
        textAnchor="middle"
        fontSize={13}
        fontWeight={700}
        fill={DARK}
        fontFamily={FONT}
      >
        {hoursLow}-{hoursHigh} hrs
      </text>

      <foreignObject x={barX} y={barY + barH + 6} width={barW} height={38}>
        <div
          {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
          style={{
            fontFamily: FONT,
            fontSize: 10.5,
            color: AXIS,
            lineHeight: 1.3,
          }}
        >
          <div style={{ fontWeight: 700, color: DARK }}>
            Article: <span style={{ fontStyle: 'italic' }}>{articleQuote}</span>
          </div>
          {derived && (
            <div style={{ fontStyle: 'italic', color: '#6B7280', marginTop: 1 }}>
              Derived: {derived}
            </div>
          )}
        </div>
      </foreignObject>
    </g>
  );
}

export default function BatteryRuntimeByLoad({ caption }: BatteryRuntimeByLoadProps) {
  const title = 'Home Battery Runtime by Load Level — Tesla Powerwall 3 (13.5 kWh)';
  const desc =
    'How long a single Tesla Powerwall 3 (13.5 kWh usable capacity, 11.5 kW continuous / 18.5 kW peak output) sustains three common backup-load scenarios, per the article. ' +
    'ESSENTIAL LOADS ONLY (refrigerator, LED lighting, Wi-Fi, sump pump, phone charging — no HVAC): 5-8 kWh/day, article states 1.5-2.5 days of runtime (36-60 hours). ' +
    'ESSENTIAL + WINDOW AC: 10-15 kWh/day, article states approximately 1 day of runtime (~24 hours). ' +
    'WHOLE HOME INCLUDING CENTRAL AC: 25-40 kWh/day. Article states a single Powerwall is insufficient — you need 2-3 batteries or battery+solar to sustain a whole home. As a rough sanity check, a single 13.5 kWh battery divided by the article-cited 25-40 kWh/day daily load equals about 8-13 hours — shown as a derived secondary reference; the article-cited "need 2-3 batteries" is the primary guidance. ' +
    'Continuous and peak output matter as much as capacity. A central AC compressor draws 3,000 watts running and 9,000-12,000 watts at startup — batteries with only 5 kW continuous output cannot start a central AC. The Powerwall 3\'s 11.5 kW continuous / 18.5 kW peak spec is what enables the whole-home-plus-central-AC scenario at all.';

  return (
    <figure className="my-8 not-prose">
      <svg
        viewBox="0 0 800 640"
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
          fontSize={19}
          fontWeight={700}
          fill={DARK}
          fontFamily={FONT}
        >
          Home Battery Runtime by Load — Tesla Powerwall 3 (13.5 kWh)
        </text>

        <BatteryIcon />

        <text
          x={16}
          y={190}
          fontSize={13}
          fontWeight={700}
          fill={DARK}
          fontStyle="italic"
          fontFamily={FONT}
        >
          Scenario / daily load
        </text>
        <text
          x={520}
          y={190}
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={DARK}
          fontStyle="italic"
          fontFamily={FONT}
        >
          Runtime on one 13.5 kWh battery
        </text>

        {[0, 12, 24, 36, 48, 60].map((tick) => {
          const x = 320 + (tick / MAX_HOURS) * 400;
          return (
            <g key={`tick-${tick}`}>
              <line x1={x} y1={200} x2={x} y2={205} stroke={AXIS} strokeWidth={1} />
              <text
                x={x}
                y={216}
                textAnchor="middle"
                fontSize={11}
                fill={AXIS}
                fontFamily={FONT}
              >
                {tick}h
              </text>
            </g>
          );
        })}
        <line x1={320} y1={205} x2={720} y2={205} stroke={AXIS} strokeWidth={1.5} />

        <Scenario
          row={{
            y: 230,
            label: 'Essential loads only',
            loads: 'Fridge · LEDs · Wi-Fi · sump · chargers · gas-furnace blower',
            dailyKwh: '5-8 kWh / day',
            hoursLow: 36,
            hoursHigh: 60,
            articleQuote: '1.5-2.5 days',
            color: '#059669',
            bgColor: '#ECFDF5',
          }}
        />

        <Scenario
          row={{
            y: 340,
            label: 'Essential + window AC',
            loads: 'Above + one window AC unit',
            dailyKwh: '10-15 kWh / day',
            hoursLow: 20,
            hoursHigh: 28,
            articleQuote: '~1 day',
            color: PRIMARY,
            bgColor: '#EFF6FF',
          }}
        />

        <Scenario
          row={{
            y: 450,
            label: 'Whole home + central AC',
            loads: 'All above + central AC + electric range + dryer + EV charger',
            dailyKwh: '25-40 kWh / day',
            hoursLow: 8,
            hoursHigh: 13,
            articleQuote: 'Need 2-3 batteries or battery + solar',
            derived: 'single 13.5 kWh ≈ 8-13 hrs (13.5 ÷ 25-40)',
            color: WARN,
            bgColor: WARN_BG,
          }}
        />

        <g transform="translate(40, 550)">
          <rect x={0} y={0} width={720} height={76} fill={WARN_BG} stroke={WARN} strokeWidth={1.5} rx={6} />
          <foreignObject x={12} y={6} width={696} height={64}>
            <div
              {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
              style={{
                fontFamily: FONT,
                fontSize: 12,
                color: DARK,
                lineHeight: 1.4,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 4 }}>
                Continuous kW output matters as much as capacity kWh
              </div>
              <div>
                Central AC draws ~3,000 W running and 9,000-12,000 W at startup. Batteries rated at only 5 kW continuous output <strong>cannot start a central AC</strong>. Powerwall 3&#x27;s 11.5 kW continuous / 18.5 kW peak is what enables the whole-home + central-AC scenario at all — not just its 13.5 kWh capacity.
              </div>
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
