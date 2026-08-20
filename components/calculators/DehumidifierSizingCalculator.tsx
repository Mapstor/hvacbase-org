'use client';

import { useState, useMemo } from 'react';
import {
  Droplets,
  Home,
  TrendingUp,
  Bed,
  Bath,
  Shirt,
} from 'lucide-react';
import {
  fmt,
  CalcShell,
  SectionHeader,
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

const ACCENT = 'emerald' as const;

const spaceTypes = [
  { value: 'basement', name: 'Basement', summary: 'Damp by default', moistureFactor: 1.3, Icon: Home },
  { value: 'living', name: 'Living areas', summary: 'Standard residential', moistureFactor: 1.0, Icon: Home },
  { value: 'bedroom', name: 'Bedroom', summary: 'Quiet, lower load', moistureFactor: 0.9, Icon: Bed },
  { value: 'bathroom', name: 'Bathroom', summary: 'Showers + tub', moistureFactor: 1.5, Icon: Bath },
  { value: 'laundry', name: 'Laundry', summary: 'Wet clothes evap.', moistureFactor: 1.4, Icon: Shirt },
  { value: 'crawlspace', name: 'Crawlspace', summary: 'Ground moisture', moistureFactor: 1.2, Icon: Home },
  { value: 'garage', name: 'Garage', summary: 'Mixed humidity', moistureFactor: 1.1, Icon: Home },
];

const moistureConditions = [
  { value: 'moderate', name: 'Moderately damp', summary: 'Musty odor, damp feel', factor: 1.0 },
  { value: 'very', name: 'Very damp', summary: 'Occasional water stains', factor: 1.2 },
  { value: 'wet', name: 'Wet', summary: 'Stains + mold spots', factor: 1.4 },
  { value: 'extremely', name: 'Extremely wet', summary: 'Standing water / severe mold', factor: 1.6 },
];

const sqftPresets = [500, 1000, 1500, 2000, 3000];

const DEFAULTS = {
  squareFeet: '1000',
  spaceType: 'basement',
  moistureLevel: 'moderate',
  currentHumidity: '65',
  targetHumidity: '45',
};

export default function DehumidifierSizingCalculator() {
  const [squareFeet, setSquareFeet] = useState(DEFAULTS.squareFeet);
  const [spaceType, setSpaceType] = useState(DEFAULTS.spaceType);
  const [moistureLevel, setMoistureLevel] = useState(DEFAULTS.moistureLevel);
  const [currentHumidity, setCurrentHumidity] = useState(DEFAULTS.currentHumidity);
  const [targetHumidity, setTargetHumidity] = useState(DEFAULTS.targetHumidity);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    squareFeet, spaceType, moistureLevel, currentHumidity, targetHumidity,
  });

  const space = spaceTypes.find((s) => s.value === src.spaceType)!;
  const moisture = moistureConditions.find((m) => m.value === src.moistureLevel)!;
  const sqft = Math.max(parseFloat(src.squareFeet) || 0, 0);
  const cur = Math.max(parseFloat(src.currentHumidity) || 0, 0);
  const tgt = Math.max(parseFloat(src.targetHumidity) || 0, 0);

  const handleReset = () => {
    setSquareFeet(DEFAULTS.squareFeet);
    setSpaceType(DEFAULTS.spaceType);
    setMoistureLevel(DEFAULTS.moistureLevel);
    setCurrentHumidity(DEFAULTS.currentHumidity);
    setTargetHumidity(DEFAULTS.targetHumidity);
    clear();
  };

  const calc = useMemo(() => {
    const baseCapacity = sqft / 150;
    const adjustedCapacity = baseCapacity * space.moistureFactor * moisture.factor;
    const humidityDiff = cur - tgt;
    const humidityFactor = Math.max(0.5, 1 + (humidityDiff - 20) * 0.02);
    const totalCapacity = adjustedCapacity * humidityFactor;
    const standardSizes = [30, 35, 50, 70, 95, 110, 130];
    const ideal = standardSizes.find((s) => s >= totalCapacity) || 130;
    const idx = standardSizes.indexOf(ideal);
    const minimum = standardSizes[Math.max(0, idx - 1)] || ideal;
    const maximum = standardSizes[Math.min(standardSizes.length - 1, idx + 1)] || ideal;
    const dailyRuntime = ideal > 0 ? Math.min(24, (totalCapacity / ideal) * 12) : 0;
    const dailyEnergyUse = (ideal * 8 * dailyRuntime) / 1000;
    const monthlyEnergyUse = dailyEnergyUse * 30;
    return { baseCapacity, adjustedCapacity, humidityFactor, totalCapacity, ideal, minimum, maximum, dailyRuntime, dailyEnergyUse, monthlyEnergyUse };
  }, [sqft, space, moisture, cur, tgt]);

  const fit =
    sqft === 0 ? { tone: 'warn' as const, text: 'Enter space size' } :
    calc.ideal === 130 && calc.totalCapacity > 110 ? { tone: 'warn' as const, text: 'Above 110 pints — consider whole-house unit' } :
    { tone: 'good' as const, text: `${calc.ideal}-pint unit covers your load` };

  return (
    <CalcShell
      Icon={Droplets}
      title="Dehumidifier Sizing Calculator"
      subtitle="Right pint-per-day capacity for your space + moisture level."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      <section>
        <SectionHeader step={1} title="Space" subtitle="Size and what kind of room" Icon={Home} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Floor area</label>
            <div className="mb-2">
              <PresetChips value={squareFeet} onChange={setSquareFeet} presets={sqftPresets} accent={ACCENT} />
            </div>
            <NumberInput value={squareFeet} onChange={setSquareFeet} min={100} max={5000} suffix="sq ft" ariaLabel="Square feet" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Space type</label>
            <CardChoice value={spaceType} onChange={setSpaceType} options={spaceTypes} ariaLabel="Space type" accent={ACCENT} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Moisture conditions" subtitle="How damp does it feel today?" Icon={Droplets} accent={ACCENT} />
        <div className="space-y-5">
          <CardChoice value={moistureLevel} onChange={setMoistureLevel} options={moistureConditions} ariaLabel="Moisture level" accent={ACCENT} />
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Current humidity
                <InfoTip label="current humidity">Measure with a $15 hygrometer. Anything above 60% RH in summer or 50% RH year-round is too high.</InfoTip>
                <span className="ml-auto text-sm font-semibold text-emerald-700">{cur}%</span>
              </label>
              <input type="range" min={30} max={95} step={1} value={currentHumidity} onChange={(e) => setCurrentHumidity(e.target.value)} className="w-full accent-emerald-600" aria-label="Current humidity" />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Target humidity
                <InfoTip label="target humidity">Target 30–50% for basements, 40–50% for living spaces. Below 30% feels dry; above 60% encourages mold.</InfoTip>
                <span className="ml-auto text-sm font-semibold text-emerald-700">{tgt}%</span>
              </label>
              <input type="range" min={30} max={60} step={1} value={targetHumidity} onChange={(e) => setTargetHumidity(e.target.value)} className="w-full accent-emerald-600" aria-label="Target humidity" />
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
          eyebrow="Recommended dehumidifier capacity"
          value={`${calc.ideal}`}
          unit="pints/day"
          secondaryText={
            <>
              Your {fmt(sqft)} sq ft {space.name.toLowerCase()} at {moisture.name.toLowerCase()} levels needs roughly{' '}
              <strong>{calc.totalCapacity.toFixed(0)} pints/day</strong> of moisture removal.
              The closest standard size is <strong>{calc.ideal} pints</strong>.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Minimum', value: `${calc.minimum} pint` },
            { label: 'Maximum', value: `${calc.maximum} pint` },
            { label: 'Est. runtime', value: `${calc.dailyRuntime.toFixed(1)} hr/day` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Droplets className="w-4 h-4 text-emerald-600" />
              Calculation breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Base capacity', detail: `${fmt(sqft)} sq ft ÷ 150`, factor: `${calc.baseCapacity.toFixed(1)} pints` },
                { label: 'Space factor', detail: space.name, factor: `× ${space.moistureFactor.toFixed(1)}` },
                { label: 'Moisture factor', detail: moisture.name, factor: `× ${moisture.factor.toFixed(1)}` },
                { label: 'Humidity factor', detail: `Δ${cur - tgt}% RH`, factor: `× ${calc.humidityFactor.toFixed(2)}` },
              ]}
              totals={[
                { label: 'Required capacity', value: `${calc.totalCapacity.toFixed(0)} pints/day`, valueClass: 'text-emerald-700' },
                { label: 'Standard size match', value: `${calc.ideal} pint`, valueClass: 'text-emerald-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Operating estimate
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Daily runtime', detail: 'Auto-cycles on humidistat', factor: `${calc.dailyRuntime.toFixed(1)} hr` },
                { label: 'Daily energy', detail: `${calc.ideal} pint × ~8W per pint`, factor: `${calc.dailyEnergyUse.toFixed(1)} kWh` },
                { label: 'Monthly energy', detail: '30 days × daily', factor: `${calc.monthlyEnergyUse.toFixed(0)} kWh` },
                { label: 'Monthly cost', detail: '@ $0.16/kWh', factor: `$${(calc.monthlyEnergyUse * 0.16).toFixed(2)}` },
              ]}
              totals={[]}
            />
            <div className="mt-3 bg-emerald-50 rounded-lg p-3 text-xs text-emerald-900">
              <div className="font-semibold mb-1">Standard size guide</div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px]">
                <div className="flex justify-between"><span>30-pint</span><span>≤1,500 sq ft</span></div>
                <div className="flex justify-between"><span>50-pint</span><span>≤2,500 sq ft</span></div>
                <div className="flex justify-between"><span>70-pint</span><span>≤3,500 sq ft</span></div>
                <div className="flex justify-between"><span>95-pint</span><span>≤4,500 sq ft</span></div>
              </div>
            </div>
          </div>
        </div>

        <DisclaimerBox title="Why proper sizing matters">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Undersized: runs continuously, never reaches target — wears out fast</li>
            <li>Oversized: short-cycles, doesn't actually remove much moisture, wastes capacity</li>
            <li>For severe moisture (visible mold, standing water), <strong>address the source first</strong> — dehumidifier alone won't solve it</li>
            <li>Whole-house dehumidifiers (90+ pints) are usually a better long-term answer for full basements or whole-home humidity</li>
            <li>Set + leave at 45–50% RH — chasing 30% wastes energy without health benefit</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
