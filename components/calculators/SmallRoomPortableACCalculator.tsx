'use client';

import { useState, useMemo } from 'react';
import {
  Wind,
  Package,
  Zap,
  Volume2,
  Bed,
  Briefcase,
  Home,
  ChefHat,
  Sun,
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

const compactUnits: Record<string, { btu: number; coverage: { min: number; max: number }; power: number; noise: number; weight: number; dimensions: { w: number; d: number; h: number }; price: { min: number; max: number }; pros: string[]; cons: string[] }> = {
  '5000': { btu: 5000, coverage: { min: 100, max: 150 }, power: 450, noise: 48, weight: 45, dimensions: { w: 16, d: 13, h: 26 }, price: { min: 200, max: 350 }, pros: ['Very compact', 'Low power draw', 'Quiet operation'], cons: ['Limited cooling', 'Single-speed only'] },
  '6000': { btu: 6000, coverage: { min: 150, max: 200 }, power: 520, noise: 50, weight: 50, dimensions: { w: 17, d: 14, h: 27 }, price: { min: 250, max: 400 }, pros: ['Good for bedrooms', 'Affordable', 'Energy efficient'], cons: ['Basic features', 'Manual drainage'] },
  '8000': { btu: 8000, coverage: { min: 200, max: 300 }, power: 700, noise: 52, weight: 58, dimensions: { w: 18, d: 15, h: 29 }, price: { min: 300, max: 500 }, pros: ['Versatile size', 'Remote control', 'Multiple fan speeds'], cons: ['Getting bulky', 'Moderate noise'] },
  '10000': { btu: 10000, coverage: { min: 300, max: 450 }, power: 900, noise: 54, weight: 65, dimensions: { w: 19, d: 16, h: 31 }, price: { min: 350, max: 600 }, pros: ['Strong cooling', 'Multi-speed', 'Timer + sleep mode'], cons: ['Not truly compact', 'Higher power use'] },
};

const roomTypeOptions = [
  { value: 'bedroom', name: 'Bedroom', summary: 'Quiet matters · 8 hr/day', Icon: Bed },
  { value: 'office', name: 'Home office', summary: 'PC + monitor heat · +15%', Icon: Briefcase },
  { value: 'dorm', name: 'Dorm room', summary: 'Compact + portable', Icon: Home },
  { value: 'studio', name: 'Studio apartment', summary: 'Whole-space cooling', Icon: Home },
  { value: 'kitchen', name: 'Kitchen', summary: 'Stove heat · +25%', Icon: ChefHat },
  { value: 'sunroom', name: 'Sunroom', summary: 'Heavy solar gain · +30%', Icon: Sun },
];

const priorityOptions = [
  { value: 'size', name: 'Smallest size' },
  { value: 'quiet', name: 'Quietest' },
  { value: 'efficiency', name: 'Most efficient' },
  { value: 'price', name: 'Lowest price' },
];

const noiseOptions = [
  { value: 'critical', name: 'Critical', sub: 'Sleep / focus work', cap: 50 },
  { value: 'important', name: 'Important', sub: 'TV / conversation', cap: 53 },
  { value: 'moderate', name: 'Moderate', sub: 'Background OK', cap: 55 },
  { value: 'low', name: 'Not important', sub: 'No limit', cap: 99 },
];

const powerLimitOptions = [
  { value: 'standard', name: 'Standard 15A', sub: 'Most outlets' },
  { value: 'low', name: 'Limited', sub: 'Old wiring / shared', cap: 600 },
];

const roomTypeMultiplier: Record<string, number> = { bedroom: 1.0, office: 1.15, dorm: 1.0, studio: 1.0, kitchen: 1.25, sunroom: 1.3 };

const DEFAULTS = {
  roomSize: '150',
  roomType: 'bedroom',
  priority: 'size',
  noiseImportance: 'important',
  budget: '400',
  powerLimit: 'standard',
};

export default function SmallRoomPortableACCalculator() {
  const [roomSize, setRoomSize] = useState(DEFAULTS.roomSize);
  const [roomType, setRoomType] = useState(DEFAULTS.roomType);
  const [priority, setPriority] = useState(DEFAULTS.priority);
  const [noiseImportance, setNoiseImportance] = useState(DEFAULTS.noiseImportance);
  const [budget, setBudget] = useState(DEFAULTS.budget);
  const [powerLimit, setPowerLimit] = useState(DEFAULTS.powerLimit);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    roomSize, roomType, priority, noiseImportance, budget, powerLimit,
  });

  const sqft = Math.max(parseFloat(src.roomSize) || 0, 1);
  const rType = src.roomType;
  const pri = src.priority;
  const maxBudget = Math.max(parseFloat(src.budget) || 0, 1);
  const noiseCap = noiseOptions.find((n) => n.value === src.noiseImportance)?.cap || 99;
  const powerCap = src.powerLimit === 'low' ? 600 : Infinity;

  const handleReset = () => {
    setRoomSize(DEFAULTS.roomSize);
    setRoomType(DEFAULTS.roomType);
    setPriority(DEFAULTS.priority);
    setNoiseImportance(DEFAULTS.noiseImportance);
    setBudget(DEFAULTS.budget);
    setPowerLimit(DEFAULTS.powerLimit);
    clear();
  };

  const calc = useMemo(() => {
    const baseBTU = sqft * 20;
    const requiredBTU = baseBTU * (roomTypeMultiplier[rType] || 1) * 1.2;
    const suitable = Object.entries(compactUnits).filter(([, u]) =>
      u.btu >= requiredBTU * 0.85 && u.price.min <= maxBudget && u.power <= powerCap && u.noise <= noiseCap
    );
    const scored = suitable.map(([key, unit]) => {
      let score = 100;
      if (pri === 'size') score -= (unit.dimensions.w * unit.dimensions.d * unit.dimensions.h) / 100;
      else if (pri === 'quiet') score -= unit.noise * 2;
      else if (pri === 'efficiency') score -= (unit.power / unit.btu) * 1000;
      else if (pri === 'price') score -= unit.price.min / 10;
      return { key, unit, score };
    });
    scored.sort((a, b) => b.score - a.score);
    const recommended = scored[0] || { key: '6000', unit: compactUnits['6000'], score: 0 };
    const dailyHours = rType === 'bedroom' ? 8 : 6;
    const kwhPerDay = (recommended.unit.power / 1000) * dailyHours;
    const dailyCost = kwhPerDay * 0.14;
    const monthlyCost = dailyCost * 30;
    const volumeCubicInches = recommended.unit.dimensions.w * recommended.unit.dimensions.d * recommended.unit.dimensions.h;
    const isUltraCompact = volumeCubicInches < 6000;
    const fitsDormRoom = recommended.unit.dimensions.w <= 18 && recommended.unit.weight <= 60;
    return { baseBTU, requiredBTU, suitable, recommended, dailyHours, kwhPerDay, dailyCost, monthlyCost, isUltraCompact, fitsDormRoom };
  }, [sqft, rType, pri, maxBudget, powerCap, noiseCap]);

  const fit =
    calc.suitable.length === 0 ? { tone: 'bad' as const, text: 'No unit matches all constraints — relax budget/noise/power' } :
    calc.isUltraCompact ? { tone: 'good' as const, text: 'Ultra-compact — fits anywhere' } :
    { tone: 'good' as const, text: `${calc.suitable.length} suitable models match constraints` };

  const r = calc.recommended.unit;
  const efficiency = r.btu / r.power;

  return (
    <CalcShell
      Icon={Package}
      title="Small Room Portable AC Calculator"
      subtitle="Compact AC for spaces under 300 sq ft."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      <section>
        <SectionHeader step={1} title="Room" subtitle="Size + type" Icon={Home} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Room size</label>
            <NumberInput value={roomSize} onChange={setRoomSize} min={50} max={300} suffix="sq ft" ariaLabel="Room size" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Room type</label>
            <CardChoice value={roomType} onChange={setRoomType} options={roomTypeOptions} ariaLabel="Room type" accent={ACCENT} columns={3} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Constraints" subtitle="Priority + noise + budget" Icon={Volume2} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Top priority
              <InfoTip label="priority">Determines which model wins when multiple meet your constraints — most-compact, quietest, most-efficient, or cheapest.</InfoTip>
            </label>
            <Segmented value={priority} onChange={setPriority} options={priorityOptions} ariaLabel="Priority" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Noise level importance</label>
            <CardChoice value={noiseImportance} onChange={setNoiseImportance} options={noiseOptions} ariaLabel="Noise" accent={ACCENT} columns={4} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Max budget</label>
              <NumberInput value={budget} onChange={setBudget} min={100} max={2000} suffix="$" ariaLabel="Budget" accent={ACCENT} />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Power limit
                <InfoTip label="power">If your circuit is shared with other appliances or old wiring, limit to 600W draw.</InfoTip>
              </label>
              <Segmented value={powerLimit} onChange={setPowerLimit} options={powerLimitOptions} ariaLabel="Power limit" accent={ACCENT} />
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
          eyebrow="Recommended compact AC"
          value={`${calc.recommended.key}`}
          unit={`BTU · ${r.dimensions.w}″ × ${r.dimensions.d}″ × ${r.dimensions.h}″`}
          secondaryText={
            calc.suitable.length === 0 ? (
              <>No suitable unit fits your constraints. Try raising budget above ${fmtMoney(maxBudget)} or relaxing noise/power limits.</>
            ) : (
              <>
                Sized for your {fmt(sqft)} sq ft {rType} requiring <strong>{fmt(Math.round(calc.requiredBTU))} BTU</strong>{' '}
                (after +20% portable penalty).
                {calc.isUltraCompact && <> <strong>Ultra-compact</strong> design fits tight spaces.</>}
                {calc.fitsDormRoom && <> Dorm-friendly size + weight ({r.weight} lbs).</>}
              </>
            )
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Power', value: `${r.power}W` },
            { label: 'Noise', value: `${r.noise} dB` },
            { label: 'Price', value: `$${fmtMoney(r.price.min)}–$${fmtMoney(r.price.max)}` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-blue-600" />
              Physical + performance specs
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Dimensions', detail: 'W × D × H', factor: `${r.dimensions.w}″ × ${r.dimensions.d}″ × ${r.dimensions.h}″` },
                { label: 'Weight', detail: r.weight < 50 ? 'Easy lift' : r.weight < 60 ? 'Moderate' : 'Challenging', factor: `${r.weight} lbs` },
                { label: 'Coverage', detail: 'Rated room range', factor: `${r.coverage.min}–${r.coverage.max} sq ft` },
                { label: 'Power draw', detail: 'At running load', factor: `${r.power}W` },
                { label: 'Noise', detail: r.noise <= 50 ? 'Quiet (library/refrig.)' : 'Conversational background', factor: `${r.noise} dB` },
                { label: 'Efficiency', detail: 'BTU per watt', factor: `${efficiency.toFixed(1)} BTU/W` },
              ]}
              totals={[
                { label: 'Price range', value: `$${fmtMoney(r.price.min)}–$${fmtMoney(r.price.max)}`, valueClass: 'text-blue-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-blue-600" />
              Operating cost ({rType})
            </h4>
            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Daily runtime ({rType})</span><strong>{calc.dailyHours} hr</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Daily energy</span><strong>{calc.kwhPerDay.toFixed(2)} kWh</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Daily cost @ $0.14/kWh</span><strong>${calc.dailyCost.toFixed(2)}</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Monthly cost</span><strong>${fmtMoney(calc.monthlyCost)}</strong></div>
              <div className="flex justify-between py-1.5"><span>vs window AC</span><strong className="text-amber-700">~30% higher</strong></div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 rounded p-2 text-xs">
                <div className="font-semibold text-emerald-900 mb-0.5">Pros</div>
                <ul className="text-emerald-800 space-y-0.5 list-disc list-outside ml-3">
                  {r.pros.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div className="bg-amber-50 rounded p-2 text-xs">
                <div className="font-semibold text-amber-900 mb-0.5">Cons</div>
                <ul className="text-amber-800 space-y-0.5 list-disc list-outside ml-3">
                  {r.cons.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Volume2 className="w-4 h-4 text-blue-700" />
              Noise context · {r.noise} dB
            </h4>
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-700">
              <div className="flex justify-between"><span>Library</span><span>40 dB</span></div>
              <div className="flex justify-between"><span>Refrigerator hum</span><span>50 dB</span></div>
              <div className="flex justify-between"><span>Normal conversation</span><span>60 dB</span></div>
              <div className="flex justify-between font-semibold text-blue-900"><span>Your unit</span><span>{r.noise} dB</span></div>
            </div>
            {r.noise <= 50 && <p className="text-[11px] text-blue-800 mt-2">Quiet enough for sleeping or focus work.</p>}
            {r.noise > 50 && r.noise <= 55 && <p className="text-[11px] text-amber-800 mt-2">Noticeable background — fine for TV rooms, may bother light sleepers.</p>}
          </div>
        </div>

        <DisclaimerBox title="Small-room cooling tips">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Position near a window for the shortest exhaust hose run — every foot of hose loses cooling</li>
            <li>Use blackout curtains during peak sun hours — solar gain through windows = 20–40% of cooling load</li>
            <li>Run a small fan to circulate cool air — feels 4–6°F cooler at the same temperature</li>
            <li>For bedrooms: set a timer to start 30 min before bedtime so the room is pre-cooled</li>
            <li>For dorms: check policies — some ban portable ACs entirely or require window-AC permits</li>
            <li>If you have window-AC option, take it — window units are 30–40% more efficient + quieter for the same BTU</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
