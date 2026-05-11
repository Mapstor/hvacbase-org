'use client';

import { useState, useMemo } from 'react';
import {
  Droplets,
  DollarSign,
  TrendingUp,
  Clock,
  Zap,
  Leaf,
} from 'lucide-react';
import {
  fmt,
  fmtMoney,
  CalcShell,
  SectionHeader,
  CardChoice,
  NumberInput,
  InfoTip,
  ResultHero,
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
} from './_shared';

const ACCENT = 'emerald' as const;

const dehumidifierSizes = [
  { value: '30', name: '30-pint', summary: '~300W, ≤1,500 sq ft', watts: 300, price: 200, pints: 30 },
  { value: '50', name: '50-pint', summary: '~590W, ≤3,000 sq ft', watts: 590, price: 280, pints: 50 },
  { value: '70', name: '70-pint', summary: '~700W, ≤4,500 sq ft', watts: 700, price: 350, pints: 70 },
  { value: '95', name: '95-pint', summary: '~800W, ≤6,000 sq ft', watts: 800, price: 450, pints: 95 },
  { value: '110', name: '110-pint', summary: '~900W, ≤7,000 sq ft', watts: 900, price: 550, pints: 110 },
];

const climateZones = [
  { value: 'dry', name: 'Dry', summary: 'Desert / SW', humidityFactor: 0.7 },
  { value: 'moderate', name: 'Moderate', summary: 'Temperate', humidityFactor: 1.0 },
  { value: 'humid', name: 'Humid', summary: 'SE coastal', humidityFactor: 1.3 },
  { value: 'very-humid', name: 'Very humid', summary: 'Tropical / bayou', humidityFactor: 1.5 },
];

const usagePatterns = [
  { value: 'seasonal', name: 'Seasonal', sub: '4 months (summer)', monthsPerYear: 4 },
  { value: 'extended', name: 'Extended', sub: '7 months (spring–fall)', monthsPerYear: 7 },
  { value: 'year-round', name: 'Year-round', sub: '12 months', monthsPerYear: 12 },
];

export default function DehumidifierCostCalculator() {
  const [dehumidifierSize, setDehumidifierSize] = useState('50');
  const [spaceSize, setSpaceSize] = useState('1200');
  const [climateZone, setClimateZone] = useState('moderate');
  const [currentHumidity, setCurrentHumidity] = useState('65');
  const [targetHumidity, setTargetHumidity] = useState('45');
  const [electricRate, setElectricRate] = useState('0.16');
  const [usagePattern, setUsagePattern] = useState('seasonal');
  const [hoursPerDay, setHoursPerDay] = useState('12');

  const selected = dehumidifierSizes.find((d) => d.value === dehumidifierSize)!;
  const climate = climateZones.find((c) => c.value === climateZone)!;
  const usage = usagePatterns.find((u) => u.value === usagePattern)!;

  const sqft = Math.max(parseFloat(spaceSize) || 0, 0);
  const cur = Math.max(parseFloat(currentHumidity) || 0, 0);
  const tgt = Math.max(parseFloat(targetHumidity) || 0, 0);
  const rate = Math.max(parseFloat(electricRate) || 0, 0);
  const maxHr = Math.max(parseFloat(hoursPerDay) || 0, 0);

  const calc = useMemo(() => {
    const watts = selected.watts;
    const price = selected.price;
    const humidityDiff = cur - tgt;
    const baseRuntime = Math.min(24, Math.max(4, humidityDiff * 0.6));
    const climateAdjustedRuntime = baseRuntime * climate.humidityFactor;
    const actualRuntime = Math.min(maxHr, climateAdjustedRuntime);
    const dailyKwh = (watts * actualRuntime) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const seasonalKwh = monthlyKwh * usage.monthsPerYear;
    const yearlyKwh = dailyKwh * 365;
    const dailyCost = dailyKwh * rate;
    const monthlyCost = monthlyKwh * rate;
    const seasonalCost = seasonalKwh * rate;
    const yearlyCost = yearlyKwh * rate;
    const dailyMoistureRemoval = selected.pints * (actualRuntime / 24);
    const monthlyMoistureRemoval = dailyMoistureRemoval * 30;
    const energyPerPint = selected.pints > 0 ? watts / selected.pints : 0;
    const costPerPint = dailyMoistureRemoval > 0 ? dailyCost / dailyMoistureRemoval : 0;
    const fiveYearEnergyCost = seasonalCost * 5;
    const maintenanceCost = 50 * 5;
    const totalCostOfOwnership = price + fiveYearEnergyCost + maintenanceCost;
    const efficientWatts = watts * 0.75;
    const efficientPrice = price * 1.3;
    const energySavingsPerYear = ((watts - efficientWatts) * actualRuntime * 365 / 1000) * rate;
    const paybackYears = energySavingsPerYear > 0 ? (efficientPrice - price) / energySavingsPerYear : 999;
    const annualCO2 = yearlyKwh * 0.92;
    const fiveYearCO2 = annualCO2 * 5;
    const recommendedCapacity = (sqft / 150) * climate.humidityFactor;
    const adequateSize = selected.pints >= recommendedCapacity;
    return { watts, price, actualRuntime, dailyKwh, monthlyKwh, seasonalKwh, yearlyKwh, dailyCost, monthlyCost, seasonalCost, yearlyCost, dailyMoistureRemoval, monthlyMoistureRemoval, energyPerPint, costPerPint, fiveYearEnergyCost, maintenanceCost, totalCostOfOwnership, efficientPrice, energySavingsPerYear, paybackYears, annualCO2, fiveYearCO2, recommendedCapacity, adequateSize };
  }, [selected, sqft, climate, cur, tgt, rate, maxHr, usage]);

  const fit =
    !calc.adequateSize ? { tone: 'warn' as const, text: `Undersized — recommend ${Math.ceil(calc.recommendedCapacity)}+ pint` } :
    calc.actualRuntime >= 20 ? { tone: 'warn' as const, text: 'High runtime — address moisture source' } :
    calc.seasonalCost < 100 ? { tone: 'good' as const, text: 'Low operating cost — strong value' } :
    { tone: 'ok' as const, text: 'Reasonable cost for capacity' };

  return (
    <CalcShell
      Icon={Droplets}
      title="Dehumidifier Cost Calculator"
      subtitle="Operating cost + 5-year cost of ownership. Updates live."
      accent={ACCENT}
    >
      <section>
        <SectionHeader step={1} title="Unit & space" subtitle="Dehumidifier size and area" Icon={Droplets} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Dehumidifier size</label>
            <CardChoice value={dehumidifierSize} onChange={setDehumidifierSize} options={dehumidifierSizes} ariaLabel="Dehumidifier size" accent={ACCENT} columns={5} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Space size</label>
              <NumberInput value={spaceSize} onChange={setSpaceSize} min={100} max={10000} suffix="sq ft" ariaLabel="Space size" accent={ACCENT} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Max hours/day</label>
              <NumberInput value={hoursPerDay} onChange={setHoursPerDay} min={1} max={24} suffix="hr" ariaLabel="Max hours per day" accent={ACCENT} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Climate & usage" subtitle="Local humidity load + how long you run it" Icon={Clock} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Climate zone</label>
            <CardChoice value={climateZone} onChange={setClimateZone} options={climateZones} ariaLabel="Climate zone" accent={ACCENT} columns={4} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Usage pattern</label>
            <CardChoice value={usagePattern} onChange={setUsagePattern} options={usagePatterns} ariaLabel="Usage pattern" accent={ACCENT} columns={3} />
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Current humidity
                <span className="ml-auto text-sm font-semibold text-emerald-700">{cur}%</span>
              </label>
              <input type="range" min={30} max={95} step={1} value={currentHumidity} onChange={(e) => setCurrentHumidity(e.target.value)} className="w-full accent-emerald-600" aria-label="Current humidity" />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Target humidity
                <span className="ml-auto text-sm font-semibold text-emerald-700">{tgt}%</span>
              </label>
              <input type="range" min={30} max={60} step={1} value={targetHumidity} onChange={(e) => setTargetHumidity(e.target.value)} className="w-full accent-emerald-600" aria-label="Target humidity" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Electric rate</label>
              <NumberInput value={electricRate} onChange={setElectricRate} min={0.05} max={0.5} suffix="$/kWh" ariaLabel="Electric rate" accent={ACCENT} />
            </div>
          </div>
        </div>
      </section>

      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow="Seasonal operating cost"
          value={`$${fmtMoney(calc.seasonalCost)}`}
          unit={`/${usage.name.toLowerCase()} (${fmt(Math.round(calc.seasonalKwh))} kWh)`}
          secondaryText={
            <>
              {selected.name} runs ~{calc.actualRuntime.toFixed(1)} hr/day in your {climate.name.toLowerCase()} climate, removing{' '}
              <strong>{calc.dailyMoistureRemoval.toFixed(0)} pints/day</strong>.
              Monthly cost: <strong>${fmtMoney(calc.monthlyCost)}</strong>; yearly (if continuous): <strong>${fmtMoney(calc.yearlyCost)}</strong>.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Daily cost', value: `$${calc.dailyCost.toFixed(2)}` },
            { label: 'Monthly cost', value: `$${fmtMoney(calc.monthlyCost)}` },
            { label: 'Cost per pint', value: `$${calc.costPerPint.toFixed(3)}` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              5-year cost of ownership
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Unit price', detail: selected.name, factor: `$${fmtMoney(calc.price)}` },
                { label: 'Energy (5 yr)', detail: `${usage.name} use × 5`, factor: `$${fmtMoney(calc.fiveYearEnergyCost)}` },
                { label: 'Maintenance', detail: '~$50/yr × 5', factor: `$${fmtMoney(calc.maintenanceCost)}` },
              ]}
              totals={[
                { label: 'Total 5-yr cost', value: `$${fmtMoney(calc.totalCostOfOwnership)}`, valueClass: 'text-emerald-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-emerald-600" />
              Efficiency metrics
            </h4>
            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Watts per pint</span><strong>{calc.energyPerPint.toFixed(1)}W</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>kWh per pint</span><strong>{(calc.energyPerPint / 1000).toFixed(3)}</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Capacity utilization</span><strong>{((calc.actualRuntime / 24) * 100).toFixed(0)}%</strong></div>
              <div className="flex justify-between py-1.5"><span>Moisture removed/mo</span><strong>{fmt(Math.round(calc.monthlyMoistureRemoval))} pints</strong></div>
            </div>
            {calc.paybackYears < 10 && (
              <div className="mt-3 p-3 bg-emerald-50 rounded text-xs text-emerald-900">
                <strong>ENERGY STAR upgrade:</strong> A 25%-more-efficient model (${fmtMoney(calc.efficientPrice)}) saves <strong>${fmtMoney(calc.energySavingsPerYear)}/yr</strong> — pays back in <strong>{calc.paybackYears.toFixed(1)} yrs</strong>.
              </div>
            )}
          </div>

          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4 text-emerald-700" />
              Environmental impact
            </h4>
            <div className="space-y-1 text-xs text-gray-700">
              <div className="flex justify-between"><span>Annual CO₂</span><strong>{fmt(Math.round(calc.annualCO2))} lbs ({(calc.annualCO2 / 2000).toFixed(2)} tons)</strong></div>
              <div className="flex justify-between"><span>5-year CO₂</span><strong>{fmt(Math.round(calc.fiveYearCO2 / 1000))}k lbs</strong></div>
            </div>
            <p className="text-[11px] text-gray-600 mt-2 leading-snug">Based on US grid average (0.92 lbs CO₂/kWh). Renewable-heavy grids cut this 30–60%.</p>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-amber-700" />
              Sizing check
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              {calc.adequateSize ? (
                <>
                  <strong>Adequate.</strong> {selected.name} handles {selected.pints} pints/day; your space needs ~{Math.ceil(calc.recommendedCapacity)} pints/day adjusted for {climate.name.toLowerCase()} climate.
                </>
              ) : (
                <>
                  <strong>Undersized.</strong> {selected.name} only handles {selected.pints} pints/day, but your {fmt(sqft)} sq ft space in a {climate.name.toLowerCase()} climate needs ~{Math.ceil(calc.recommendedCapacity)} pints/day. Bump up one size.
                </>
              )}
            </p>
          </div>
        </div>

        <DisclaimerBox title="Notes on dehumidifier economics">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>ENERGY STAR units use ~25% less power than standard models — usually worth the upcharge for year-round use</li>
            <li>Auto-defrost-equipped models work below 65°F (cold basements) without ice-up; standard models stall</li>
            <li>Pump-equipped units drain to a sink/upstairs; gravity drain limits placement</li>
            <li>For continuous-runtime applications (whole basement), consider a whole-house dehumidifier ducted to the HVAC system — lower lifetime cost</li>
          </ul>
        </DisclaimerBox>
      </section>
    </CalcShell>
  );
}
