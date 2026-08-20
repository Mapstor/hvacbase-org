'use client';

import { useState, useMemo } from 'react';
import {
  Home,
  Snowflake,
  Sun,
  CloudSun,
  Cloud,
  Ruler,
  Users,
  CheckCircle,
  Gauge,
  TrendingUp,
} from 'lucide-react';
import {
  fmt,
  CalcShell,
  SectionHeader,
  Segmented,
  CardChoice,
  PresetChips,
  NumberInput,
  InfoTip,
  ResultHero,
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
  CalculateResetBar,
  useCalculatorSubmit,
} from './_shared';

const ACCENT = 'blue' as const;

const climateZones = [
  { value: '1', short: 'Z1', label: 'Very Hot', factor: 0.9, description: 'Miami, Houston' },
  { value: '2', short: 'Z2', label: 'Hot', factor: 1.0, description: 'Phoenix, Las Vegas' },
  { value: '3', short: 'Z3', label: 'Warm', factor: 1.1, description: 'Atlanta, Los Angeles' },
  { value: '4', short: 'Z4', label: 'Mixed', factor: 1.2, description: 'Washington DC, Kansas City' },
  { value: '5', short: 'Z5', label: 'Cool', factor: 1.3, description: 'Chicago, Boston' },
  { value: '6', short: 'Z6', label: 'Cold', factor: 1.4, description: 'Minneapolis, Denver' },
  { value: '7', short: 'Z7', label: 'Very Cold', factor: 1.5, description: 'Fargo, Anchorage' },
];

const insulationOptions = [
  { value: 'poor', name: 'Poor', factor: 1.3, summary: 'Old build, single-pane, little wall insulation' },
  { value: 'average', name: 'Average', factor: 1.0, summary: 'Code-built walls, double-pane windows' },
  { value: 'good', name: 'Good', factor: 0.9, summary: 'Modern, above-code envelope' },
  { value: 'excellent', name: 'Excellent', factor: 0.8, summary: 'ENERGY STAR / spray-foam tightness' },
];

const ceilingHeights = [
  { value: '8', name: '8 ft', sub: 'Standard', factor: 1.0 },
  { value: '9', name: '9 ft', sub: 'Tall', factor: 1.1 },
  { value: '10', name: '10 ft', sub: 'Extra tall', factor: 1.2 },
  { value: '12', name: '12 ft+', sub: 'Vaulted', factor: 1.4 },
];

const sunExposureOptions = [
  { value: 'low', name: 'Shaded', sub: 'Heavy tree cover / north-facing', factor: 0.9, Icon: Cloud },
  { value: 'average', name: 'Average', sub: 'Mixed sun and shade', factor: 1.0, Icon: CloudSun },
  { value: 'high', name: 'Full sun', sub: 'Open exposure', factor: 1.1, Icon: Sun },
  { value: 'extreme', name: 'Heavy sun', sub: 'South/SW, all-day glare', factor: 1.2, Icon: Sun },
];

const squareFootPresets = [1000, 1500, 2000, 2500, 3000, 4000];

const DEFAULTS = {
  squareFeet: '2000',
  zone: '4',
  insulation: 'average',
  ceiling: '8',
  exposure: 'average',
  windows: '15',
  occupants: '4',
};

export default function ACTonnageCalculator() {
  const [squareFeet, setSquareFeet] = useState(DEFAULTS.squareFeet);
  const [zone, setZone] = useState(DEFAULTS.zone);
  const [insulation, setInsulation] = useState(DEFAULTS.insulation);
  const [ceiling, setCeiling] = useState(DEFAULTS.ceiling);
  const [exposure, setExposure] = useState(DEFAULTS.exposure);
  const [windows, setWindows] = useState(DEFAULTS.windows);
  const [occupants, setOccupants] = useState(DEFAULTS.occupants);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    squareFeet, zone, insulation, ceiling, exposure, windows, occupants,
  });

  const selectedZone = climateZones.find((z) => z.value === src.zone)!;
  const selectedIns = insulationOptions.find((i) => i.value === src.insulation)!;
  const selectedCeiling = ceilingHeights.find((c) => c.value === src.ceiling)!;
  const selectedSun = sunExposureOptions.find((s) => s.value === src.exposure)!;

  const sqFt = Math.max(parseFloat(src.squareFeet) || 0, 0);
  const winN = Math.max(parseInt(src.windows) || 15, 0);
  const occN = Math.max(parseInt(src.occupants) || 0, 0);

  const handleReset = () => {
    setSquareFeet(DEFAULTS.squareFeet);
    setZone(DEFAULTS.zone);
    setInsulation(DEFAULTS.insulation);
    setCeiling(DEFAULTS.ceiling);
    setExposure(DEFAULTS.exposure);
    setWindows(DEFAULTS.windows);
    setOccupants(DEFAULTS.occupants);
    clear();
  };

  const calc = useMemo(() => {
    const baseBTU = sqFt * 20;
    const windowFactor = 1 + (winN - 15) * 0.01;
    const occupantFactor = 1 + Math.max(0, occN - 2) * 0.02;
    const totalBTU = Math.max(
      baseBTU * selectedZone.factor * selectedIns.factor * selectedCeiling.factor *
      selectedSun.factor * windowFactor * occupantFactor,
      0
    );
    const tons = totalBTU / 12000;
    const sizes = [1.5, 2, 2.5, 3, 3.5, 4, 5];
    const ideal = sizes.find((s) => s >= tons) || 5;
    const min = Math.max(1.5, ideal - 0.5);
    const max = Math.min(5, ideal + 0.5);
    return {
      baseBTU: Math.round(baseBTU),
      windowFactor,
      occupantFactor,
      totalBTU: Math.round(totalBTU),
      tons,
      ideal,
      min,
      max,
    };
  }, [sqFt, winN, occN, selectedZone, selectedIns, selectedCeiling, selectedSun]);

  const fit =
    calc.tons === 0 ? { tone: 'warn' as const, text: 'Enter square footage' } :
    calc.ideal - calc.tons < 0.25 ? { tone: 'good' as const, text: 'Exact size match' } :
    calc.ideal - calc.tons < 0.5  ? { tone: 'ok' as const, text: 'Good fit' } :
                                    { tone: 'warn' as const, text: 'Rounding up by half-ton' };

  return (
    <CalcShell
      Icon={Gauge}
      title="AC Tonnage Calculator"
      subtitle="The right central AC size for your home."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Home basics */}
      <section>
        <SectionHeader step={1} title="Your home" subtitle="Floor area, ceiling, occupants" Icon={Home} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Conditioned floor area (sq ft)
              <InfoTip label="square footage">
                Total area the central AC cools. Exclude unconditioned garage, attic, or unfinished basement.
              </InfoTip>
            </label>
            <div className="mb-2">
              <PresetChips value={squareFeet} onChange={setSquareFeet} presets={squareFootPresets} accent={ACCENT} />
            </div>
            <NumberInput
              value={squareFeet}
              onChange={setSquareFeet}
              min={400}
              max={10000}
              suffix="sq ft"
              ariaLabel="Custom square footage"
              accent={ACCENT}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Ruler className="w-4 h-4 mr-1.5 text-gray-500" />
                Ceiling height
              </label>
              <Segmented
                value={ceiling}
                onChange={setCeiling}
                options={ceilingHeights.map((c) => ({ value: c.value, name: c.name, sub: c.sub }))}
                ariaLabel="Ceiling height"
                accent={ACCENT}
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 mr-1.5 text-gray-500" />
                Regular occupants
                <InfoTip label="occupants">
                  Each person beyond 2 adds ~2% to the load (body heat + humidity). First 2 are baked into the base.
                </InfoTip>
              </label>
              <NumberInput
                value={occupants}
                onChange={setOccupants}
                min={1}
                max={10}
                suffix="people"
                ariaLabel="Number of occupants"
                accent={ACCENT}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Climate & exposure */}
      <section>
        <SectionHeader step={2} title="Climate & sun" subtitle="Where your home sits and how the sun hits it" Icon={Snowflake} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Climate zone
              <InfoTip label="climate zone">
                US DOE climate zones 1 (Miami) to 7 (Alaska). Heating-dominated zones (5–7) actually need more total HVAC tonnage because the dual cooling+heating swing is larger.
              </InfoTip>
            </label>
            <div role="radiogroup" aria-label="Climate zone" className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
              {climateZones.map((z) => {
                const active = z.value === zone;
                return (
                  <button
                    key={z.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setZone(z.value)}
                    title={z.description}
                    className={`px-2 py-2 rounded-lg border text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <div className="font-bold text-sm">{z.short}</div>
                    <div className={`text-[10px] mt-0.5 ${active ? 'text-blue-100' : 'text-gray-500'}`}>
                      {z.label}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              <span className="font-medium text-gray-800">Zone {zone} – {selectedZone.label}:</span> {selectedZone.description}
            </p>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Sun className="w-4 h-4 mr-1.5 text-gray-500" />
              Sun exposure
            </label>
            <CardChoice
              value={exposure}
              onChange={setExposure}
              options={sunExposureOptions}
              ariaLabel="Sun exposure"
              columns={4}
              accent={ACCENT}
            />
          </div>
        </div>
      </section>

      {/* Section 3 — Construction */}
      <section>
        <SectionHeader step={3} title="Construction quality" subtitle="Envelope insulation and windows" Icon={TrendingUp} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Insulation quality</label>
            <CardChoice
              value={insulation}
              onChange={setInsulation}
              options={insulationOptions}
              ariaLabel="Insulation quality"
              accent={ACCENT}
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Number of windows
              <InfoTip label="windows">
                Count every window in the conditioned space. Each window past 15 adds ~1% to the cooling load.
              </InfoTip>
              <span className="ml-auto text-sm font-semibold text-blue-700">{winN}</span>
            </label>
            <input
              type="range"
              min={5}
              max={50}
              step={1}
              value={windows}
              onChange={(e) => setWindows(e.target.value)}
              className="w-full accent-blue-600"
              aria-label="Number of windows"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>5 (compact)</span>
              <span>15 (typical)</span>
              <span>50 (lots of glass)</span>
            </div>
          </div>
        </div>
      </section>

      <CalculateResetBar
        onCalculate={calculate}
        onReset={handleReset}
        dirty={dirty}
        hasResult={hasResult}
        accent={ACCENT}
      />

      {/* Results */}
      {hasResult && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow="Recommended AC size"
          value={`${calc.ideal}`}
          unit="tons"
          secondaryText={
            <>
              That's <strong>{fmt(calc.ideal * 12000)} BTU/hr</strong> of cooling capacity.
              Your calculated need is <strong>{calc.tons.toFixed(2)} tons</strong> ({fmt(calc.totalBTU)} BTU/hr).
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Calculated tons', value: calc.tons.toFixed(2) },
            { label: 'Available range', value: `${calc.min}–${calc.max} ton` },
            { label: 'BTU per sq ft', value: sqFt > 0 ? (calc.totalBTU / sqFt).toFixed(0) : '0' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Gauge className="w-4 h-4 text-blue-600" />
              Sizing breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Base load', detail: `${fmt(sqFt)} sq ft × 20 BTU`, factor: `${fmt(calc.baseBTU)} BTU` },
                { label: 'Climate', detail: `${selectedZone.label} (Z${zone})`, factor: `× ${selectedZone.factor.toFixed(2)}` },
                { label: 'Insulation', detail: selectedIns.name, factor: `× ${selectedIns.factor.toFixed(2)}` },
                { label: 'Ceiling', detail: selectedCeiling.name, factor: `× ${selectedCeiling.factor.toFixed(2)}` },
                { label: 'Sun', detail: selectedSun.name, factor: `× ${selectedSun.factor.toFixed(2)}` },
                { label: 'Windows', detail: `${winN} windows`, factor: `× ${calc.windowFactor.toFixed(2)}` },
                { label: 'Occupants', detail: `${occN} (× 2% over 2)`, factor: `× ${calc.occupantFactor.toFixed(2)}` },
              ]}
              totals={[
                { label: 'Total cooling load', value: `${fmt(calc.totalBTU)} BTU/hr`, valueClass: 'text-blue-700' },
                { label: 'Equivalent tonnage', value: `${calc.tons.toFixed(2)} tons`, valueClass: 'text-blue-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Size options around your load
            </h4>
            <div className="space-y-1.5">
              {[calc.min, calc.ideal, calc.max].filter((v, i, a) => a.indexOf(v) === i).map((size) => {
                const isIdeal = size === calc.ideal;
                return (
                  <div
                    key={size}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-xs ${
                      isIdeal ? 'bg-blue-50 ring-1 ring-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className={`font-semibold ${isIdeal ? 'text-blue-900' : 'text-gray-900'}`}>
                        {size} ton {isIdeal && <span className="ml-1 text-[10px] uppercase tracking-wider text-blue-700 font-bold">Recommended</span>}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">{fmt(size * 12000)} BTU/hr capacity</div>
                    </div>
                    <div className="text-right">
                      <div className={`tabular-nums text-[11px] ${isIdeal ? 'text-blue-700 font-bold' : 'text-gray-600'}`}>
                        {size < calc.tons ? 'Undersized' : size === calc.ideal ? 'Best match' : 'Some headroom'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {calc.tons > 4.5 && (
              <p className="text-[11px] text-gray-600 mt-3 leading-snug">
                For loads above 4.5 tons, a <strong>zoned or multi-stage system</strong> often delivers better comfort and humidity control than a single large unit.
              </p>
            )}
          </div>
        </div>

        <DisclaimerBox title="Use this for budgeting, not contract specs.">
          <p>
            A licensed HVAC contractor should run a full ACCA Manual J load calculation before
            purchase — it measures each room, window orientation, duct leakage, and your local 99%
            design temperature. Oversized AC short-cycles and leaves rooms cold and clammy; undersized
            can't keep up on the hottest 1% of hours.
          </p>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
