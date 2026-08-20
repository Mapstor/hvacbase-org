'use client';

import { useState, useMemo } from 'react';
import {
  Wind,
  Thermometer,
  Home,
  AlertTriangle,
  Sun,
  CloudSun,
  Cloud,
} from 'lucide-react';
import {
  fmt,
  fmtMoney,
  CalcShell,
  SectionHeader,
  CardChoice,
  Segmented,
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

const portableACUnits: Record<string, { btu: number; coverage: { min: number; max: number }; power: number; amps: number; price: { min: number; max: number } }> = {
  '10000': { btu: 10000, coverage: { min: 250, max: 450 }, power: 900, amps: 8.5, price: { min: 300, max: 500 } },
  '12000': { btu: 12000, coverage: { min: 350, max: 550 }, power: 1100, amps: 10, price: { min: 400, max: 600 } },
  '14000': { btu: 14000, coverage: { min: 450, max: 700 }, power: 1300, amps: 11.5, price: { min: 500, max: 800 } },
  '15000': { btu: 15000, coverage: { min: 500, max: 800 }, power: 1400, amps: 12.5, price: { min: 600, max: 900 } },
  '18000': { btu: 18000, coverage: { min: 700, max: 1000 }, power: 1700, amps: 15, price: { min: 800, max: 1200 } },
};

const ceilingOptions = [
  { value: '8', name: '8 ft', sub: 'Standard' },
  { value: '9', name: '9 ft', sub: 'Tall' },
  { value: '10', name: '10 ft', sub: 'Extra tall' },
  { value: '12', name: '12 ft+', sub: 'Vaulted' },
];

const sunOptions = [
  { value: 'low', name: 'Shaded', sub: 'North-facing', factor: 0.9, Icon: Cloud },
  { value: 'moderate', name: 'Moderate', sub: 'Mixed', factor: 1.0, Icon: CloudSun },
  { value: 'high', name: 'Full sun', sub: 'South/West', factor: 1.15, Icon: Sun },
];

const insulationOptions = [
  { value: 'poor', name: 'Poor', sub: 'Old, drafty', factor: 1.2 },
  { value: 'average', name: 'Average', sub: 'Standard', factor: 1.0 },
  { value: 'excellent', name: 'Excellent', sub: 'New/sealed', factor: 0.85 },
];

const windowOptions = [
  { value: 'minimal', name: 'Minimal', sub: 'Few/small', factor: 0.95 },
  { value: 'standard', name: 'Standard', sub: 'Typical', factor: 1.0 },
  { value: 'large', name: 'Large', sub: 'Many/glass walls', factor: 1.15 },
];

const climateOptions = [
  { value: 'mild', name: 'Mild', sub: '70–80°F summers', factor: 0.85, hours: 4, days: 90 },
  { value: 'moderate', name: 'Moderate', sub: '80–90°F summers', factor: 1.0, hours: 6, days: 120 },
  { value: 'hot', name: 'Hot', sub: '90°F+ summers', factor: 1.2, hours: 10, days: 180 },
];

const DEFAULTS = {
  roomSize: '600',
  ceilingHeight: '8',
  sunExposure: 'moderate',
  insulation: 'average',
  windows: 'standard',
  occupants: '2',
  appliances: '1',
  climate: 'moderate',
};

export default function LargeRoomPortableACCalculator() {
  const [roomSize, setRoomSize] = useState(DEFAULTS.roomSize);
  const [ceilingHeight, setCeilingHeight] = useState(DEFAULTS.ceilingHeight);
  const [sunExposure, setSunExposure] = useState(DEFAULTS.sunExposure);
  const [insulation, setInsulation] = useState(DEFAULTS.insulation);
  const [windows, setWindows] = useState(DEFAULTS.windows);
  const [occupants, setOccupants] = useState(DEFAULTS.occupants);
  const [appliances, setAppliances] = useState(DEFAULTS.appliances);
  const [climate, setClimate] = useState(DEFAULTS.climate);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    roomSize, ceilingHeight, sunExposure, insulation, windows, occupants, appliances, climate,
  });

  const sqft = Math.max(parseFloat(src.roomSize) || 0, 0);
  const ceiling = Math.max(parseFloat(src.ceilingHeight) || 8, 8);
  const people = Math.max(parseInt(src.occupants) || 0, 0);
  const heatSources = Math.max(parseInt(src.appliances) || 0, 0);
  const sun = sunOptions.find((s) => s.value === src.sunExposure)!;
  const ins = insulationOptions.find((i) => i.value === src.insulation)!;
  const win = windowOptions.find((w) => w.value === src.windows)!;
  const clm = climateOptions.find((c) => c.value === src.climate)!;

  const handleReset = () => {
    setRoomSize(DEFAULTS.roomSize);
    setCeilingHeight(DEFAULTS.ceilingHeight);
    setSunExposure(DEFAULTS.sunExposure);
    setInsulation(DEFAULTS.insulation);
    setWindows(DEFAULTS.windows);
    setOccupants(DEFAULTS.occupants);
    setAppliances(DEFAULTS.appliances);
    setClimate(DEFAULTS.climate);
    clear();
  };

  const calc = useMemo(() => {
    let baseBTU = sqft * 20;
    if (ceiling > 8) baseBTU *= ceiling / 8;
    const ceilingFactor = ceiling > 8 ? ceiling / 8 : 1;
    let adjustedBTU = baseBTU * sun.factor * ins.factor * win.factor * clm.factor;
    const occupantBTU = Math.max(0, people - 2) * 600;
    const applianceBTU = heatSources * 400;
    adjustedBTU += occupantBTU + applianceBTU;
    const portableAdjusted = adjustedBTU * 1.3;
    const candidates = Object.entries(portableACUnits).filter(([, u]) => u.btu >= portableAdjusted * 0.9);
    const idealKey = candidates.length > 0 ? candidates[0][0] : '18000';
    const idealUnit = portableACUnits[idealKey];
    const tooLarge = portableAdjusted > 18000;
    const needsMultiple = portableAdjusted > 15000;
    const kwhPerDay = (idealUnit.power / 1000) * clm.hours;
    const seasonalKwh = kwhPerDay * clm.days;
    const dailyCost = kwhPerDay * 0.14;
    const monthlyCost = dailyCost * 30;
    const seasonalCost = seasonalKwh * 0.14;
    const requiresDedicated = idealUnit.amps > 12;
    return { baseBTU, ceilingFactor, adjustedBTU, occupantBTU, applianceBTU, portableAdjusted, idealKey, idealUnit, tooLarge, needsMultiple, kwhPerDay, seasonalKwh, dailyCost, monthlyCost, seasonalCost, requiresDedicated };
  }, [sqft, ceiling, sun, ins, win, clm, people, heatSources]);

  const fit =
    calc.tooLarge ? { tone: 'bad' as const, text: 'Above 18,000 BTU — go window or mini-split' } :
    sqft >= 700 ? { tone: 'warn' as const, text: 'Large for portable — mini-split may be better long-term' } :
    calc.needsMultiple ? { tone: 'ok' as const, text: 'Dual-hose recommended for efficiency' } :
    { tone: 'good' as const, text: 'Portable AC works for this size' };

  return (
    <CalcShell
      Icon={Wind}
      title="Large Room Portable AC Calculator"
      subtitle="Right BTU for 500+ sq ft spaces."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      <section>
        <SectionHeader step={1} title="Room" subtitle="Size + ceiling" Icon={Home} accent={ACCENT} />
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Room size</label>
            <NumberInput value={roomSize} onChange={setRoomSize} min={300} max={2000} suffix="sq ft" ariaLabel="Room size" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Ceiling height</label>
            <Segmented value={ceilingHeight} onChange={setCeilingHeight} options={ceilingOptions} ariaLabel="Ceiling height" accent={ACCENT} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Climate & exposure" subtitle="Affects cooling load" Icon={Sun} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Climate zone</label>
            <CardChoice value={climate} onChange={setClimate} options={climateOptions} ariaLabel="Climate" accent={ACCENT} columns={3} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Sun exposure</label>
            <CardChoice value={sunExposure} onChange={setSunExposure} options={sunOptions} ariaLabel="Sun exposure" accent={ACCENT} columns={3} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={3} title="Construction & loads" subtitle="Windows, insulation, occupants" Icon={Thermometer} accent={ACCENT} />
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Insulation</label>
              <CardChoice value={insulation} onChange={setInsulation} options={insulationOptions} ariaLabel="Insulation" accent={ACCENT} columns={3} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Window size</label>
              <CardChoice value={windows} onChange={setWindows} options={windowOptions} ariaLabel="Windows" accent={ACCENT} columns={3} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Regular occupants</label>
              <NumberInput value={occupants} onChange={setOccupants} min={1} max={20} suffix="people" ariaLabel="Occupants" accent={ACCENT} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Heat-generating appliances</label>
              <NumberInput value={appliances} onChange={setAppliances} min={0} max={10} suffix="items" ariaLabel="Appliances" accent={ACCENT} />
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

      {hasResult && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow={calc.tooLarge ? 'Room too large for single portable' : 'Recommended portable AC'}
          value={calc.tooLarge ? '> 18,000' : calc.idealKey}
          unit="BTU"
          secondaryText={
            calc.tooLarge ? (
              <>
                Your {fmt(sqft)} sq ft room needs <strong>{fmt(Math.round(calc.portableAdjusted))} BTU</strong> after the +30% portable penalty.
                Recommend: window AC, mini-split, or 2 portable units.
              </>
            ) : (
              <>
                Sized for <strong>{fmt(Math.round(calc.portableAdjusted))} BTU</strong> after the +30% portable-AC efficiency penalty.
                Pulls <strong>{calc.idealUnit.power}W</strong> ({calc.idealUnit.amps}A){calc.requiresDedicated && ' — dedicated 15A circuit'}.
                {calc.needsMultiple && ' Choose a dual-hose model for 40% better efficiency.'}
              </>
            )
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Power draw', value: `${calc.idealUnit.power}W` },
            { label: 'Equipment cost', value: `$${fmtMoney(calc.idealUnit.price.min)}–$${fmtMoney(calc.idealUnit.price.max)}` },
            { label: 'Season cost', value: `$${fmtMoney(calc.seasonalCost)}` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Wind className="w-4 h-4 text-blue-600" />
              BTU breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Base load', detail: `${fmt(sqft)} sq ft × 20 BTU`, factor: `${fmt(Math.round(sqft * 20))} BTU` },
                { label: 'Ceiling', detail: `${ceiling} ft`, factor: `× ${calc.ceilingFactor.toFixed(2)}` },
                { label: 'Sun', detail: sun.name, factor: `× ${sun.factor.toFixed(2)}` },
                { label: 'Insulation', detail: ins.name, factor: `× ${ins.factor.toFixed(2)}` },
                { label: 'Windows', detail: win.name, factor: `× ${win.factor.toFixed(2)}` },
                { label: 'Climate', detail: clm.name, factor: `× ${clm.factor.toFixed(2)}` },
                { label: 'Occupants (>2)', detail: `${Math.max(0, people - 2)} × 600 BTU`, factor: `+ ${fmt(calc.occupantBTU)} BTU` },
                { label: 'Appliances', detail: `${heatSources} × 400 BTU`, factor: `+ ${fmt(calc.applianceBTU)} BTU` },
                { label: 'Portable penalty', detail: '+30% for hose losses', factor: `× 1.30` },
              ]}
              totals={[
                { label: 'Total cooling needed', value: `${fmt(Math.round(calc.portableAdjusted))} BTU`, valueClass: 'text-blue-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Thermometer className="w-4 h-4 text-blue-600" />
              Unit specs + operating cost
            </h4>
            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Recommended BTU</span><strong>{calc.tooLarge ? 'N/A (too large)' : calc.idealKey}</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Coverage</span><strong>{calc.idealUnit.coverage.min}–{calc.idealUnit.coverage.max} sq ft</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Power draw</span><strong>{calc.idealUnit.power}W</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Amperage</span><strong>{calc.idealUnit.amps}A</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Circuit</span><strong>{calc.requiresDedicated ? 'Dedicated 15A' : 'Standard outlet OK'}</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Equipment cost</span><strong>${fmtMoney(calc.idealUnit.price.min)}–${fmtMoney(calc.idealUnit.price.max)}</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Daily energy</span><strong>{calc.kwhPerDay.toFixed(1)} kWh</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Monthly cost</span><strong>${fmtMoney(calc.monthlyCost)}</strong></div>
              <div className="flex justify-between py-1.5"><span>Season cost ({clm.days} days)</span><strong>${fmtMoney(calc.seasonalCost)}</strong></div>
            </div>
            {sqft >= 700 && (
              <div className="mt-3 p-3 bg-amber-50 rounded text-xs text-amber-900">
                ⚠ For rooms ≥ 700 sq ft, a <strong>mini-split</strong> ($1,500–$4,000 installed) is 30–40% more efficient and quieter than a portable.
              </div>
            )}
          </div>
        </div>

        <DisclaimerBox title="Portable AC reality checks">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Portable ACs lose 30% of their nameplate cooling to hose heat reintroducing warm air — built into calc</li>
            <li>Dual-hose units (one in, one out) eliminate this and gain 40% efficiency, but cost $200–$300 more</li>
            <li>Above 700 sq ft, a window AC or mini-split is dramatically better — portable struggles to keep up</li>
            <li>Position centrally, use ceiling fans, seal the window kit completely, and clean filters weekly</li>
            <li>Empty the condensate tank daily in humid climates — auto-evaporation models avoid this</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
